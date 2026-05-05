"""
PDF scanning and database indexing service.
"""

import logging
import os
import time

import library_core as lc
from database import get_db

logger = logging.getLogger(__name__)


def scan_and_index(root_dir: str) -> dict:
    """
    Scan the filesystem for PDFs, upsert into the database, index MD content for FTS.
    Returns stats dict: {added, updated, removed, total}.
    """
    docs = lc.scan_pdfs(root_dir)
    stats = {"added": 0, "updated": 0, "removed": 0, "total": len(docs)}

    with get_db() as db:
        existing_paths = {
            row[0] for row in db.execute("SELECT pdf_path FROM papers").fetchall()
        }
        scanned_paths = set()

        for doc in docs:
            scanned_paths.add(doc.path)
            if doc.path in existing_paths:
                _update_paper(db, doc)
                stats["updated"] += 1
            else:
                _insert_paper(db, doc)
                stats["added"] += 1
            logger.info("已索引: %s", doc.name)

        # Remove papers whose PDFs no longer exist
        removed_paths = existing_paths - scanned_paths
        for path in removed_paths:
            db.execute("DELETE FROM papers WHERE pdf_path = ?", (path,))
            stats["removed"] += 1
            logger.info("已移除: %s", os.path.basename(path))

    return stats


def _insert_paper(db, doc: lc.PdfDocument):
    now = _now()
    db.execute(
        """INSERT INTO papers
           (pdf_path, folder_path, folder_name, title,
            has_md, has_chinese, folder_is_chinese,
            md_path, chinese_pdf_path, has_paper_analysis,
            created_at, updated_at)
           VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)""",
        (
            doc.path, doc.folder_path, doc.folder, doc.name,
            int(doc.has_md), int(doc.has_chinese), int(doc.folder_is_chinese),
            doc.md_path or None, doc.chinese_pdf_path or None,
            int(_has_analysis_dir(doc.folder_path)),
            now, now,
        ),
    )
    _index_content(db, doc)


def _update_paper(db, doc: lc.PdfDocument):
    now = _now()
    db.execute(
        """UPDATE papers SET
           folder_name=?, title=?,
           has_md=?, has_chinese=?, folder_is_chinese=?,
           md_path=?, chinese_pdf_path=?,
           has_paper_analysis=?, updated_at=?
           WHERE pdf_path=?""",
        (
            doc.folder, doc.name,
            int(doc.has_md), int(doc.has_chinese), int(doc.folder_is_chinese),
            doc.md_path or None, doc.chinese_pdf_path or None,
            int(_has_analysis_dir(doc.folder_path)),
            now, doc.path,
        ),
    )
    _index_content(db, doc)


def _index_content(db, doc: lc.PdfDocument):
    """Read MD file content and upsert into paper_content for FTS5 indexing."""
    row = db.execute(
        "SELECT id FROM papers WHERE pdf_path = ?", (doc.path,)
    ).fetchone()
    if not row:
        return  # Paper was not inserted — shouldn't happen, but be safe
    paper_id = row[0]

    content = ""
    if doc.md_path and os.path.exists(lc._longpath(doc.md_path)):
        try:
            with open(lc._longpath(doc.md_path), "r", encoding="utf-8") as f:
                content = f.read()
        except Exception:
            logger.warning("无法读取 MD 文件: %s", doc.md_path)

    # Count Chinese characters + English words
    cjk = sum(1 for c in content if '一' <= c <= '鿿' or '㐀' <= c <= '䶿')
    english_words = len([w for w in content.split() if w and not any('一' <= c <= '鿿' for c in w)])
    word_count = cjk + english_words
    now = _now()

    existing = db.execute(
        "SELECT paper_id FROM paper_content WHERE paper_id = ?", (paper_id,)
    ).fetchone()

    if existing:
        db.execute(
            "UPDATE paper_content SET content=?, word_count=?, indexed_at=? WHERE paper_id=?",
            (content, word_count, now, paper_id),
        )
    else:
        db.execute(
            "INSERT INTO paper_content (paper_id, content, word_count, indexed_at) VALUES (?, ?, ?, ?)",
            (paper_id, content, word_count, now),
        )

    # Extract references from content for bibliographic coupling graph
    if content.strip():
        from services.reference_extractor import extract_and_save
        try:
            extract_and_save(paper_id, content)
        except Exception:
            logger.warning("引用提取失败 paper_id=%d", paper_id)


def _has_analysis_dir(folder_path: str) -> bool:
    return os.path.isdir(os.path.join(folder_path, "paper-analysis"))


def _now() -> str:
    return time.strftime("%Y-%m-%d %H:%M:%S")
