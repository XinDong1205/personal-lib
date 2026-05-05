"""
Parse paper-analysis/ directories into structured metadata.
"""

import os
import re
from typing import Optional

from database import get_db


ANALYSIS_FILES = {
    "abstract_text": "01-核心研究目标.md",
    "innovation":    "01-核心研究目标.md",
    "architecture":  "03-系统架构.md",
    "strengths":     "06-优缺点分析.md",
    "weaknesses":    "06-优缺点分析.md",
    "future_work":   "07-未来研究方向.md",
}


def extract_metadata(paper_id: int, folder_path: str) -> Optional[dict]:
    """
    Parse paper-analysis/ in folder_path and return metadata dict,
    or None if no analysis directory exists.
    """
    analysis_dir = os.path.join(folder_path, "paper-analysis")
    if not os.path.isdir(analysis_dir):
        return None

    meta = _parse_info_file(analysis_dir)
    if meta is None:
        # Still try to create partial metadata from other analysis files
        meta = {"paper_id": paper_id}

    meta["paper_id"] = paper_id
    _extract_content_fields(analysis_dir, meta)
    return meta if len(meta) > 1 else None  # Only paper_id → nothing useful


def extract_and_save(paper_id: int, folder_path: str) -> bool:
    """Extract metadata and upsert into the database. Returns True on success."""
    meta = extract_metadata(paper_id, folder_path)
    if meta is None:
        return False

    with get_db() as db:
        existing = db.execute(
            "SELECT id FROM paper_metadata WHERE paper_id = ?", (paper_id,)
        ).fetchone()

        fields = [
            "title_en", "title_cn", "authors", "institution", "year",
            "venue", "field", "keywords", "doi", "page_count",
            "abstract_text", "innovation", "architecture",
            "strengths", "weaknesses", "future_work",
        ]
        if existing:
            set_clause = ", ".join(f"{f}=?" for f in fields)
            values = [meta.get(f) for f in fields] + [paper_id]
            db.execute(
                f"UPDATE paper_metadata SET {set_clause} WHERE paper_id=?",
                values,
            )
        else:
            all_fields = ["paper_id"] + fields
            placeholders = ", ".join("?" for _ in all_fields)
            values = [paper_id] + [meta.get(f) for f in fields]
            db.execute(
                f"INSERT INTO paper_metadata ({', '.join(all_fields)}) VALUES ({placeholders})",
                values,
            )

    return True


def _parse_info_file(analysis_dir: str) -> Optional[dict]:
    """Parse 00-论文信息.md into structured dict."""
    info_path = os.path.join(analysis_dir, "00-论文信息.md")
    if not os.path.isfile(info_path):
        return None

    with open(info_path, "r", encoding="utf-8") as f:
        text = f.read()

    meta = {}

    # Title: "**标题** | Chinese Title (English Title)"
    m = re.search(r"\*\*标题\*\*\s*\|\s*(.+?)\s*$", text, re.MULTILINE)
    if m:
        title_raw = m.group(1).strip()
        # Split Chinese title and English title in parentheses
        cn_match = re.match(r"(.+?)\s*\(([^)]+)\)\s*$", title_raw)
        if cn_match:
            meta["title_cn"] = cn_match.group(1).strip()
            meta["title_en"] = cn_match.group(2).strip()
        else:
            meta["title_cn"] = title_raw
            meta["title_en"] = None

    m = re.search(r"\*\*作者\*\*\s*\|\s*(.+?)\s*$", text, re.MULTILINE)
    if m:
        meta["authors"] = m.group(1).strip()

    m = re.search(r"\*\*机构\*\*\s*\|\s*(.+?)\s*$", text, re.MULTILINE)
    if m:
        meta["institution"] = m.group(1).strip()

    m = re.search(r"\*\*发表年份\*\*\s*\|\s*(\d{4})", text)
    if m:
        meta["year"] = int(m.group(1))

    m = re.search(r"\*\*会议/期刊\*\*\s*\|\s*(.+?)\s*$", text, re.MULTILINE)
    if m:
        meta["venue"] = m.group(1).strip()

    m = re.search(r"\*\*领域\*\*\s*\|\s*(.+?)\s*$", text, re.MULTILINE)
    if m:
        meta["field"] = m.group(1).strip()

    m = re.search(r"\*\*关键词\*\*\s*\|\s*(.+?)\s*$", text, re.MULTILINE)
    if m:
        meta["keywords"] = m.group(1).strip()

    m = re.search(r"\*\*DOI\*\*\s*\|\s*(.+?)\s*$", text, re.MULTILINE)
    if m:
        meta["doi"] = m.group(1).strip()

    m = re.search(r"\*\*页数\*\*\s*\|\s*(\d+)", text)
    if m:
        meta["page_count"] = int(m.group(1))

    return meta


def _extract_content_fields(analysis_dir: str, meta: dict):
    """Extract summary content from analysis files."""
    for field, filename in ANALYSIS_FILES.items():
        filepath = os.path.join(analysis_dir, filename)
        if not os.path.isfile(filepath):
            continue
        with open(filepath, "r", encoding="utf-8") as f:
            content = f.read()

        if field == "abstract_text":
            meta[field] = _extract_section(content, r"##\s+(?:核心问题（)?一句话概括", r"##\s+问题的重要性")
        elif field == "innovation":
            meta[field] = _extract_section(content, r"##\s+论文的主要贡献", None)
        elif field == "architecture":
            # Take first 2000 chars of architecture description
            meta[field] = content[:2000] if len(content) > 2000 else content
        elif field == "strengths":
            meta[field] = _extract_section(content, r"##\s+(?:优点|优势|Strengths)", r"##\s+(?:缺点|劣势|Weaknesses|不足)")
        elif field == "weaknesses":
            meta[field] = _extract_section(content, r"##\s+(?:缺点|劣势|Weaknesses|不足)", None)
        elif field == "future_work":
            meta[field] = content[:2000] if len(content) > 2000 else content


def _extract_section(text: str, start_pat: str, end_pat: str | None) -> str:
    """Extract text between two heading patterns."""
    start_m = re.search(start_pat, text)
    if not start_m:
        return ""
    start_idx = start_m.end()
    if end_pat:
        end_m = re.search(end_pat, text[start_idx:])
        if end_m:
            return text[start_idx:start_idx + end_m.start()].strip()
    return text[start_idx:].strip()[:3000]
