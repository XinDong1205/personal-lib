"""Scan and stats endpoints."""

import os
import re
import shutil

from fastapi import APIRouter
from database import get_db
from models import ScanResponse, StatsResponse, ExtendedStatsResponse, InitResponse, InitResult, GraphResponse, GraphNode, GraphLink

router = APIRouter(tags=["Scan"])

ROOT_CHINESE = re.compile(r"[一-鿿]")


@router.post("/scan", response_model=ScanResponse)
def trigger_scan():
    from services.indexer import scan_and_index

    with get_db() as db:
        row = db.execute(
            "SELECT value FROM app_settings WHERE key='root_dir'"
        ).fetchone()
    root_dir = row["value"] if row else os.path.join(os.path.dirname(os.path.abspath(__file__)), "..", "library")
    root_dir = os.path.normpath(os.path.abspath(root_dir))

    if not os.path.isdir(root_dir):
        from fastapi import HTTPException
        raise HTTPException(400, f"扫描根目录不存在: {root_dir}")

    try:
        stats = scan_and_index(root_dir)
        return ScanResponse(**stats)
    except Exception as e:
        from fastapi import HTTPException
        import traceback
        raise HTTPException(500, f"扫描失败: {e}\n{traceback.format_exc()}")


@router.get("/stats", response_model=StatsResponse)
def get_stats():
    with get_db() as db:
        total = db.execute("SELECT COUNT(*) FROM papers").fetchone()[0]
        unread = db.execute(
            "SELECT COUNT(*) FROM papers WHERE reading_status='unread'"
        ).fetchone()[0]
        reading = db.execute(
            "SELECT COUNT(*) FROM papers WHERE reading_status='reading'"
        ).fetchone()[0]
        read = db.execute(
            "SELECT COUNT(*) FROM papers WHERE reading_status='read'"
        ).fetchone()[0]
        cn = db.execute(
            "SELECT COUNT(*) FROM papers WHERE folder_is_chinese=1"
        ).fetchone()[0]
        en = total - cn
        with_md = db.execute(
            "SELECT COUNT(*) FROM papers WHERE has_md=1"
        ).fetchone()[0]
        with_chinese = db.execute(
            "SELECT COUNT(*) FROM papers WHERE has_chinese=1"
        ).fetchone()[0]
        with_analysis = db.execute(
            "SELECT COUNT(*) FROM papers WHERE has_paper_analysis=1"
        ).fetchone()[0]
        total_tags = db.execute("SELECT COUNT(*) FROM tags").fetchone()[0]
        total_notes = db.execute("SELECT COUNT(*) FROM notes").fetchone()[0]

    return StatsResponse(
        total_papers=total,
        unread=unread, reading=reading, read=read,
        chinese_folders=cn, english_folders=en,
        with_md=with_md, with_chinese=with_chinese,
        with_analysis=with_analysis,
        total_tags=total_tags, total_notes=total_notes,
    )


@router.post("/initialize", response_model=InitResponse)
def initialize_papers():
    """Find loose PDFs in root_dir, create Chinese-named folders, move PDFs,
    and generate .md files. Then re-scan the library."""
    from services.indexer import scan_and_index

    with get_db() as db:
        row = db.execute(
            "SELECT value FROM app_settings WHERE key='root_dir'"
        ).fetchone()
    root_dir = row["value"] if row else os.path.dirname(os.path.abspath(__file__))

    results = []
    try:
        items = os.listdir(root_dir)
    except Exception:
        return InitResponse(processed=0, results=[])

    # Find loose PDFs (direct children of root_dir, not in subfolders)
    loose_pdfs = []
    for f in items:
        fpath = os.path.join(root_dir, f)
        if os.path.isfile(fpath) and f.lower().endswith(".pdf"):
            loose_pdfs.append(f)

    for pdf_file in loose_pdfs:
        fpath = os.path.join(root_dir, pdf_file)
        name = os.path.splitext(pdf_file)[0]

        try:
            # Determine folder name: use Chinese if already, else translate
            if ROOT_CHINESE.search(name):
                folder_name = name
            else:
                folder_name = _translate_title(name)

            # Sanitize folder name
            folder_name = _sanitize_folder_name(folder_name)
            if not folder_name:
                results.append(InitResult(
                    filename=pdf_file, folder_name="", status="error",
                    message="无法生成有效的文件夹名",
                ))
                continue

            folder_path = os.path.join(root_dir, folder_name)

            # Skip if folder already exists
            if os.path.exists(folder_path):
                results.append(InitResult(
                    filename=pdf_file, folder_name=folder_name, status="skipped",
                    message="文件夹已存在",
                ))
                continue

            # Create folder
            os.makedirs(folder_path, exist_ok=True)

            # Move PDF
            dest_pdf = os.path.join(folder_path, pdf_file)
            shutil.move(fpath, dest_pdf)

            # Generate .md file
            md_path = os.path.join(folder_path, f"{name}.md")
            try:
                import fitz
                parts = []
                with fitz.open(dest_pdf) as pdf_doc:
                    for page_num, page in enumerate(pdf_doc, start=1):
                        text = page.get_text("text")
                        if text.strip():
                            parts.append(f"\n\n# Page {page_num}\n")
                            parts.append(text)
                if parts:
                    with open(md_path, "w", encoding="utf-8") as f:
                        f.write("\n".join(parts))
            except Exception as e:
                results.append(InitResult(
                    filename=pdf_file, folder_name=folder_name, status="error",
                    message=f"MD 生成失败: {e}",
                ))
                continue

            results.append(InitResult(
                filename=pdf_file, folder_name=folder_name, status="ok",
                message=f"已创建文件夹并生成 MD",
            ))

        except Exception as e:
            results.append(InitResult(
                filename=pdf_file, folder_name="", status="error",
                message=str(e),
            ))

    # Re-scan to index new papers
    if any(r.status == "ok" for r in results):
        try:
            scan_and_index(root_dir)
        except Exception:
            import logging
            logging.getLogger(__name__).exception("初始化后重新扫描失败")

    return InitResponse(processed=len(results), results=results)


def _translate_title(name: str) -> str:
    """Translate an English filename to Chinese."""
    try:
        from deep_translator import GoogleTranslator
        translator = GoogleTranslator(source="auto", target="zh-CN")
        result = translator.translate(name)
        if result:
            return result
    except Exception:
        pass
    return name


@router.get("/stats/extended", response_model=ExtendedStatsResponse)
def get_extended_stats():
    import re
    with get_db() as db:
        total = db.execute("SELECT COUNT(*) FROM papers").fetchone()[0]
        unread = db.execute(
            "SELECT COUNT(*) FROM papers WHERE reading_status='unread'"
        ).fetchone()[0]
        reading = db.execute(
            "SELECT COUNT(*) FROM papers WHERE reading_status='reading'"
        ).fetchone()[0]
        read = db.execute(
            "SELECT COUNT(*) FROM papers WHERE reading_status='read'"
        ).fetchone()[0]
        with_md = db.execute(
            "SELECT COUNT(*) FROM papers WHERE has_md=1"
        ).fetchone()[0]
        with_chinese = db.execute(
            "SELECT COUNT(*) FROM papers WHERE has_chinese=1"
        ).fetchone()[0]
        with_analysis = db.execute(
            "SELECT COUNT(*) FROM papers WHERE has_paper_analysis=1"
        ).fetchone()[0]
        total_tags = db.execute("SELECT COUNT(*) FROM tags").fetchone()[0]
        total_notes = db.execute("SELECT COUNT(*) FROM notes").fetchone()[0]

        # Year distribution — from metadata, fallback to title/folder/content
        year_rows = db.execute(
            "SELECT year, COUNT(*) as cnt FROM paper_metadata WHERE year IS NOT NULL AND year > 1900 GROUP BY year ORDER BY year"
        ).fetchall()
        year_distribution = {r["year"]: r["cnt"] for r in year_rows}

        # Papers with known year from metadata
        has_year = {r["paper_id"] for r in db.execute(
            "SELECT paper_id FROM paper_metadata WHERE year IS NOT NULL AND year > 1900"
        ).fetchall()}

        # For papers without metadata year, try extracting from content header.
        # Use header-pattern match to find the publication year reliably,
        # avoiding years from body text / reference lists.
        YEAR_RE = re.compile(r"\b((?:19|20)\d{2})\b")
        HEADER_YEAR_RE = re.compile(
            r"(?:IEEE\s|ACM\s|Springer|Elsevier|TRANSACTIONS|PROCEEDINGS|CONFERENCE|SYMPOSIUM|"
            r"VOL\.?\s*\d+|NO\.?\s*\d+|"
            r"Received|Accepted|Published|Manuscript|Date of publication|current version|"
            r"©\s*)"
            r".{0,60}?\b((?:19|20)\d{2})\b",
            re.IGNORECASE,
        )

        missing = db.execute(
            """SELECT p.id, p.title, p.folder_name, pc.content
               FROM papers p LEFT JOIN paper_content pc ON p.id = pc.paper_id
               WHERE p.id NOT IN (SELECT paper_id FROM paper_metadata WHERE year IS NOT NULL AND year > 1900)"""
        ).fetchall()
        for r in missing:
            y = None
            text = (r["title"] or "") + " " + (r["folder_name"] or "")
            # 1) Try title/folder first
            m = YEAR_RE.search(text)
            if m:
                y = int(m.group(1))
            # 2) Try header-pattern match in first 8000 chars
            if y is None and r["content"]:
                hm = HEADER_YEAR_RE.search(r["content"][:8000])
                if hm:
                    y = int(hm.group(1))
            # 3) Fallback: any year in first 4000 chars
            if y is None and r["content"]:
                m = YEAR_RE.search(r["content"][:4000])
                if m:
                    y = int(m.group(1))
            if y is not None:
                year_distribution[y] = year_distribution.get(y, 0) + 1
                has_year.add(r["id"])
                if m:
                    y = int(m.group(1))
            if y is not None:
                year_distribution[y] = year_distribution.get(y, 0) + 1
                has_year.add(r["id"])

        years = sorted(year_distribution.keys())
        year_span = f"{years[0]}-{years[-1]}" if len(years) >= 2 else (
            str(years[0]) if len(years) == 1 else None
        )
        unknown_year_count = total - len(has_year)

        # Tag distribution
        tag_rows = db.execute(
            """SELECT t.name, t.color, COUNT(pt.paper_id) as cnt
               FROM tags t LEFT JOIN paper_tags pt ON t.id = pt.tag_id
               GROUP BY t.id ORDER BY cnt DESC"""
        ).fetchall()
        tag_distribution = [{"name": r["name"], "color": r["color"], "count": r["cnt"]} for r in tag_rows]

        # Venue distribution — from metadata first, then extract from content.
        VENUE_PAT = re.compile(
            r"(?:IEEE|ACM)\s+(?:TRANSACTIONS\s+ON\s+[\w\s,\-]+?|"
            r"INTERNET\s+OF\s+THINGS\s+JOURNAL|ACCESS\b|"
            r"INTERNATIONAL\s+(?:CONFERENCE|SYMPOSIUM|WORKSHOP)[\w\s,\-]+?|"
            r"CONFERENCE\s+ON\s+[\w\s,\-]+?|"
            r"JOURNAL\s+ON\s+[\w\s,\-]+?)"
            r"(?=\s*,?\s*(?:VOL|PP|NO|\d{4}))",
            re.IGNORECASE,
        )

        venue_count: dict[str, int] = {}
        # 1) Venues from paper_metadata
        meta_venue_rows = db.execute(
            "SELECT venue FROM paper_metadata WHERE venue IS NOT NULL AND venue != ''"
        ).fetchall()
        for r in meta_venue_rows:
            v = r["venue"].strip()
            if len(v) > 80:
                v = re.split(r"\s+(?:and|&)\s+", v)[0].strip()
            if len(v) >= 8:
                venue_count[v] = venue_count.get(v, 0) + 1

        # 2) For papers without metadata venue, extract from content
        VENUE_PAT2 = re.compile(
            r"(?:Frontiers\s+(?:in|of)\s+[\w\s,\-]+?|"
            r"Springer[\w\s,\-]+?|"
            r"Elsevier[\w\s,\-]+?|"
            r"Journal\s+of\s+[\w\s,\-]{5,60}?)"
            r"(?=\s*,?\s*(?:VOL|PP|NO|\d{4}|$|\.))",
            re.IGNORECASE,
        )

        missing_venue = db.execute(
            """SELECT p.id, pc.content
               FROM papers p JOIN paper_content pc ON p.id = pc.paper_id
               WHERE p.id NOT IN (
                   SELECT paper_id FROM paper_metadata
                   WHERE venue IS NOT NULL AND venue != ''
               )"""
        ).fetchall()
        for r in missing_venue:
            content = r["content"] or ""
            v = None
            # Try IEEE/ACM patterns first (up to 15000 chars)
            m = VENUE_PAT.search(content[:15000])
            if m:
                v = re.sub(r"\s+", " ", m.group(0).strip())
            # Then try non-IEEE venues (search header only, to avoid references)
            if not v:
                m = VENUE_PAT2.search(content[:5000])
                if m:
                    v = re.sub(r"\s+", " ", m.group(0).strip())
            if v:
                v = re.sub(r"[,;:.\s]+$", "", v)
                if len(v) >= 10:
                    venue_count[v] = venue_count.get(v, 0) + 1

        # Top 8 sorted by count
        venue_distribution = sorted(
            [{"name": k, "count": v} for k, v in venue_count.items()],
            key=lambda x: x["count"], reverse=True,
        )[:8]

        # Keyword frequency (from metadata keywords field)
        kw_rows = db.execute(
            "SELECT keywords FROM paper_metadata WHERE keywords IS NOT NULL AND keywords != ''"
        ).fetchall()
        kw_count = {}
        for r in kw_rows:
            for kw in re.split(r"[,;，；、\s]+", r["keywords"]):
                kw = kw.strip()
                if len(kw) >= 2:
                    kw_count[kw] = kw_count.get(kw, 0) + 1
        keyword_distribution = sorted(
            [{"name": k, "count": v} for k, v in kw_count.items()],
            key=lambda x: x["count"], reverse=True
        )[:12]

        # Recent papers (last 5 updated, with status)
        recent_rows = db.execute(
            """SELECT id, title, reading_status, updated_at
               FROM papers ORDER BY updated_at DESC LIMIT 5"""
        ).fetchall()
        recent_papers = [
            {"id": r["id"], "title": r["title"],
             "reading_status": r["reading_status"],
             "updated_at": r["updated_at"] or ""}
            for r in recent_rows
        ]

    return ExtendedStatsResponse(
        total_papers=total, unread=unread, reading=reading, read=read,
        with_md=with_md, with_chinese=with_chinese, with_analysis=with_analysis,
        total_tags=total_tags, total_notes=total_notes,
        year_distribution=year_distribution, tag_distribution=tag_distribution,
        venue_distribution=venue_distribution, keyword_distribution=keyword_distribution,
        recent_papers=recent_papers, year_span=year_span,
        unknown_year_count=unknown_year_count,
    )


@router.get("/graph", response_model=GraphResponse)
def get_graph():
    import re
    from services.reference_extractor import compute_graph_edges

    nodes, edges = compute_graph_edges()

    # Fallback: if no reference-based edges yet, use keyword + title words
    if len(edges) == 0 and len(nodes) > 0:
        # Build keyword-based edges as fallback
        with get_db() as db:
            kw_rows = db.execute(
                """SELECT p.id, p.title, pm.keywords
                   FROM papers p
                   LEFT JOIN paper_metadata pm ON p.id = pm.paper_id"""
            ).fetchall()

        paper_terms = {}
        for r in kw_rows:
            terms = set()
            # Keywords
            if r["keywords"]:
                for kw in re.split(r"[,;，；、\s]+", r["keywords"]):
                    kw = kw.strip().lower()
                    if len(kw) >= 2:
                        terms.add(kw)
            # Title words (3+ char English or 2+ char CJK)
            for w in re.findall(r"[a-zA-Z]{3,}|[一-鿿]{2,}", r["title"]):
                terms.add(w.lower())
            paper_terms[r["id"]] = terms

        existing_pairs = {(min(e["source"], e["target"]), max(e["source"], e["target"])) for e in edges}

        for i, id_a in enumerate(sorted(paper_terms.keys())):
            for id_b in sorted(paper_terms.keys()):
                if id_b <= id_a:
                    continue
                pair = (id_a, id_b)
                if pair in existing_pairs:
                    continue
                terms_a = paper_terms.get(id_a, set())
                terms_b = paper_terms.get(id_b, set())
                if not terms_a or not terms_b:
                    continue
                shared = len(terms_a & terms_b)
                union = len(terms_a | terms_b)
                if union > 0 and shared > 0:
                    jaccard = shared / union
                    if jaccard >= 0.08:
                        edges.append({"source": id_a, "target": id_b, "weight": int(jaccard * 100)})

    return GraphResponse(
        nodes=[GraphNode(**n) for n in nodes],
        links=[GraphLink(**l) for l in edges],
    )


def _sanitize_folder_name(name: str) -> str:
    """Remove characters that are unsafe for folder names."""
    name = name.strip()
    # Remove characters not allowed in Windows folder names
    name = re.sub(r'[<>:"/\\|?*]', "", name)
    # Collapse multiple spaces
    name = re.sub(r"\s+", " ", name)
    # Limit length
    if len(name) > 120:
        name = name[:120]
    return name
