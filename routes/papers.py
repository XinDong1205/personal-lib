"""Paper CRUD and content endpoints."""

import math
import os
import subprocess
import sys

from fastapi import APIRouter, HTTPException
from pydantic import BaseModel
from database import get_db
from models import (
    PaperResponse, PaperListResponse, PaperUpdate,
    PaperContentResponse, PaperMetadataResponse,
    AnalysisFileResponse, ReferenceResponse,
    BatchStatusRequest, BatchTagRequest, BatchDeleteRequest,
)


class OpenFileRequest(BaseModel):
    path: str

router = APIRouter(tags=["Papers"])


def _row_to_response(row, tag_ids=None, tag_names=None, similarity=None) -> PaperResponse:
    def _opt(key):
        if key not in row.keys():
            return None
        val = row[key]
        return val if val else None

    return PaperResponse(
        id=row["id"],
        pdf_path=row["pdf_path"],
        folder_path=row["folder_path"],
        folder_name=row["folder_name"],
        title=row["title"],
        title_cn=(
            row["title_cn"] if (
                "title_cn" in row.keys()
                and row["title_cn"]
                and row["title_cn"].strip() != row["title"].strip()
            ) else None
        ),
        authors=_opt("authors"),
        year=_opt("year"),
        venue=_opt("venue"),
        has_md=bool(row["has_md"]),
        has_chinese=bool(row["has_chinese"]),
        folder_is_chinese=bool(row["folder_is_chinese"]),
        md_path=row["md_path"],
        chinese_pdf_path=row["chinese_pdf_path"],
        reading_status=row["reading_status"],
        has_paper_analysis=bool(row["has_paper_analysis"]),
        tag_ids=tag_ids or [],
        tag_names=tag_names or [],
        similarity=similarity,
        created_at=row["created_at"] or "",
        updated_at=row["updated_at"] or "",
    )


def _get_tags_for_paper(db, paper_id: int) -> tuple[list[int], list[str]]:
    rows = db.execute(
        """SELECT t.id, t.name FROM tags t
           JOIN paper_tags pt ON t.id = pt.tag_id
           WHERE pt.paper_id = ?""",
        (paper_id,),
    ).fetchall()
    return [r["id"] for r in rows], [r["name"] for r in rows]


def _batch_get_tags(db, paper_ids: list[int]) -> dict[int, tuple[list[int], list[str]]]:
    """Load tags for multiple papers in a single query. Returns {paper_id: (ids, names)}."""
    if not paper_ids:
        return {}
    placeholders = ",".join("?" for _ in paper_ids)
    rows = db.execute(
        f"""SELECT pt.paper_id, t.id, t.name FROM tags t
            JOIN paper_tags pt ON t.id = pt.tag_id
            WHERE pt.paper_id IN ({placeholders})""",
        paper_ids,
    ).fetchall()
    result: dict[int, tuple[list[int], list[str]]] = {pid: ([], []) for pid in paper_ids}
    for r in rows:
        result[r["paper_id"]][0].append(r["id"])
        result[r["paper_id"]][1].append(r["name"])
    return result


def _escape_fts5(query: str) -> str:
    """Escape special FTS5 characters and prepare query for unicode61 tokenizer."""
    # Remove FTS5 syntax characters
    cleaned = query.replace('"', '').replace('*', '').replace('-', '')
    cleaned = cleaned.replace('(', '').replace(')', '').replace('AND', '').replace('OR', '').replace('NOT', '')
    cleaned = cleaned.strip()
    if not cleaned:
        return ""
    # Quote the whole phrase for exact matching, fallback to AND of words
    return f'"{cleaned}"'


@router.get("/papers", response_model=PaperListResponse)
def list_papers(
    q: str = "",
    tag: str = "",
    status: str = "",
    page: int = 1,
    per_page: int = 50,
    sort: str = "folder",
):
    with get_db() as db:
        where = []
        params = []
        fts_ids = None
        snippets = {}

        if q:
            fts_query = _escape_fts5(q)
            if fts_query:
                try:
                    fts_rows = db.execute(
                        "SELECT paper_id, snippet(fts_search, 1, '<mark>', '</mark>', '…', 40) as snippet "
                        "FROM fts_search WHERE fts_search MATCH ?",
                        (fts_query,),
                    ).fetchall()
                    if fts_rows:
                        fts_ids = [r[0] for r in fts_rows]
                        snippets = {r[0]: r[1] for r in fts_rows if r[1]}
                    else:
                        fts_ids = []  # FTS returned nothing
                except Exception:
                    pass  # FTS query failed, fall back to LIKE

            if fts_ids is None:
                # FTS failed or was skipped — use LIKE as fallback
                where.append("(p.title LIKE ? OR p.folder_name LIKE ? OR pm.title_cn LIKE ?)")
                params.extend([f"%{q}%", f"%{q}%", f"%{q}%"])
            elif fts_ids == []:
                # FTS matched nothing, short-circuit
                return PaperListResponse(
                    papers=[], total=0, page=1,
                    per_page=per_page, total_pages=0,
                )
            else:
                where.append(f"p.id IN ({','.join('?' for _ in fts_ids)})")
                params.extend(fts_ids)

        if tag:
            where.append("p.id IN (SELECT pt.paper_id FROM paper_tags pt JOIN tags t ON pt.tag_id = t.id WHERE t.name = ?)")
            params.append(tag)

        if status:
            where.append("p.reading_status = ?")
            params.append(status)

        where_clause = " AND ".join(where) if where else "1=1"

        count = db.execute(
            f"SELECT COUNT(*) FROM papers p LEFT JOIN paper_metadata pm ON p.id = pm.paper_id WHERE {where_clause}", params
        ).fetchone()[0]

        total_pages = max(1, math.ceil(count / per_page))
        offset = (page - 1) * per_page

        order_map = {
            "title": "p.title",
            "folder": "p.folder_is_chinese, p.folder_name",
            "created": "p.created_at DESC",
            "updated": "p.updated_at DESC",
            "status": "p.reading_status, p.folder_name",
        }
        order = order_map.get(sort, order_map["folder"])

        rows = db.execute(
            f"""SELECT p.*, pm.title_cn, pm.authors, pm.year, pm.venue
               FROM papers p
               LEFT JOIN paper_metadata pm ON p.id = pm.paper_id
               WHERE {where_clause}
               ORDER BY {order}
               LIMIT ? OFFSET ?""",
            params + [per_page, offset],
        ).fetchall()

        # Batch-load tags for all papers in one query
        paper_ids = [r["id"] for r in rows]
        tag_map = _batch_get_tags(db, paper_ids) if paper_ids else {}

        papers = []
        for row in rows:
            pid = row["id"]
            tag_info = tag_map.get(pid, ([], []))
            resp = _row_to_response(row, tag_info[0], tag_info[1])
            if pid in snippets:
                resp.snippet = snippets[pid]
            # Determine match source
            if q and fts_ids is not None:
                in_fts = pid in (fts_ids or [])
                in_like = False
                q_lower = q.lower()
                for field in [row["title"] or "", row["folder_name"] or "", row["title_cn"] or ""]:
                    if q_lower in (field or "").lower():
                        in_like = True
                        break
                if in_fts and in_like:
                    resp.match_source = "both"
                elif in_fts:
                    resp.match_source = "content"
                elif in_like:
                    resp.match_source = "title"
            papers.append(resp)

    return PaperListResponse(
        papers=papers, total=count, page=page,
        per_page=per_page, total_pages=total_pages,
    )


@router.get("/papers/{paper_id}", response_model=PaperResponse)
def get_paper(paper_id: int):
    with get_db() as db:
        row = db.execute(
            """SELECT p.*, pm.title_cn, pm.authors, pm.year, pm.venue
               FROM papers p
               LEFT JOIN paper_metadata pm ON p.id = pm.paper_id
               WHERE p.id = ?""",
            (paper_id,),
        ).fetchone()
        if not row:
            raise HTTPException(404, "Paper not found")
        tag_ids, tag_names = _get_tags_for_paper(db, paper_id)
    return _row_to_response(row, tag_ids, tag_names)


@router.patch("/papers/{paper_id}", response_model=PaperResponse)
def update_paper(paper_id: int, body: PaperUpdate):
    with get_db() as db:
        row = db.execute("SELECT * FROM papers WHERE id = ?", (paper_id,)).fetchone()
        if not row:
            raise HTTPException(404, "Paper not found")
        if body.reading_status is not None:
            db.execute(
                "UPDATE papers SET reading_status=?, updated_at=datetime('now') WHERE id=?",
                (body.reading_status, paper_id),
            )
        row = db.execute("SELECT * FROM papers WHERE id = ?", (paper_id,)).fetchone()
        tag_ids, tag_names = _get_tags_for_paper(db, paper_id)
    return _row_to_response(row, tag_ids, tag_names)


@router.delete("/papers/{paper_id}")
def delete_paper(paper_id: int):
    with get_db() as db:
        row = db.execute("SELECT id FROM papers WHERE id = ?", (paper_id,)).fetchone()
        if not row:
            raise HTTPException(404, "Paper not found")
        db.execute("DELETE FROM papers WHERE id = ?", (paper_id,))
    return {"ok": True}


@router.get("/papers/{paper_id}/content", response_model=PaperContentResponse)
def get_paper_content(paper_id: int):
    with get_db() as db:
        row = db.execute(
            "SELECT * FROM paper_content WHERE paper_id = ?", (paper_id,)
        ).fetchone()
        if not row:
            raise HTTPException(404, "Content not found")
    return PaperContentResponse(
        paper_id=row["paper_id"],
        content=row["content"],
        word_count=row["word_count"],
        indexed_at=row["indexed_at"] or "",
    )


@router.get("/papers/{paper_id}/metadata", response_model=PaperMetadataResponse)
def get_paper_metadata(paper_id: int):
    with get_db() as db:
        row = db.execute(
            "SELECT * FROM paper_metadata WHERE paper_id = ?", (paper_id,)
        ).fetchone()
        if not row:
            raise HTTPException(404, "Metadata not found")
    return PaperMetadataResponse(**dict(row))


@router.post("/papers/{paper_id}/metadata/refresh", response_model=PaperMetadataResponse)
def refresh_metadata(paper_id: int):
    from services.metadata_extractor import extract_and_save

    with get_db() as db:
        paper = db.execute(
            "SELECT folder_path FROM papers WHERE id = ?", (paper_id,)
        ).fetchone()
        if not paper:
            raise HTTPException(404, "Paper not found")

    ok = extract_and_save(paper_id, paper["folder_path"])
    if not ok:
        raise HTTPException(400, "No paper-analysis directory found")

    with get_db() as db:
        row = db.execute(
            "SELECT * FROM paper_metadata WHERE paper_id = ?", (paper_id,)
        ).fetchone()
    return PaperMetadataResponse(**dict(row))


@router.post("/papers/open-file")
def open_file(body: OpenFileRequest):
    """Open a file with the OS default application.
    Only allows paths within the library root directory."""
    path = os.path.realpath(body.path)
    if not os.path.exists(path):
        raise HTTPException(404, f"File not found: {path}")

    # Restrict to root_dir
    with get_db() as db:
        row = db.execute(
            "SELECT value FROM app_settings WHERE key='root_dir'"
        ).fetchone()
    root_dir = os.path.realpath(row["value"]) if row else os.path.dirname(os.path.abspath(__file__))

    if not path.startswith(root_dir + os.sep) and path != root_dir:
        raise HTTPException(403, "Access denied: path outside library root")

    try:
        if sys.platform == "win32":
            os.startfile(path)
        elif sys.platform == "darwin":
            subprocess.Popen(["open", path])
        else:
            subprocess.Popen(["xdg-open", path])
        return {"ok": True}
    except Exception as e:
        raise HTTPException(500, str(e))


@router.get("/papers/{paper_id}/analysis-files", response_model=list[AnalysisFileResponse])
def get_analysis_files(paper_id: int):
    """Read all .md files from the paper's paper-analysis/ directory."""
    with get_db() as db:
        paper = db.execute(
            "SELECT folder_path FROM papers WHERE id = ?", (paper_id,)
        ).fetchone()
        if not paper:
            raise HTTPException(404, "Paper not found")

    analysis_dir = os.path.join(paper["folder_path"], "paper-analysis")
    if not os.path.isdir(analysis_dir):
        return []

    files = sorted(
        f for f in os.listdir(analysis_dir)
        if f.endswith(".md") and os.path.isfile(os.path.join(analysis_dir, f))
    )

    results = []
    for filename in files:
        filepath = os.path.join(analysis_dir, filename)
        try:
            with open(filepath, "r", encoding="utf-8") as f:
                content = f.read()
        except Exception:
            content = f"[读取失败: {filename}]"
        results.append(AnalysisFileResponse(filename=filename, content=content))

    return results


@router.get("/papers/{paper_id}/references", response_model=list[ReferenceResponse])
def get_paper_references(paper_id: int):
    """Return the extracted references (bibliography) of a paper."""
    with get_db() as db:
        paper = db.execute("SELECT id FROM papers WHERE id = ?", (paper_id,)).fetchone()
        if not paper:
            raise HTTPException(404, "Paper not found")

        rows = db.execute(
            "SELECT id, paper_id, ref_text FROM paper_references WHERE paper_id = ? ORDER BY id",
            (paper_id,),
        ).fetchall()

        return [ReferenceResponse(id=r["id"], paper_id=r["paper_id"], ref_text=r["ref_text"]) for r in rows]


@router.get("/papers/{paper_id}/related", response_model=list[PaperResponse])
def get_related_papers(paper_id: int):
    """Get related papers by bibliographic coupling (shared references, Jaccard).
    Falls back to title/keyword overlap, then shared tags."""
    with get_db() as db:
        paper = db.execute("SELECT id FROM papers WHERE id = ?", (paper_id,)).fetchone()
        if not paper:
            raise HTTPException(404, "Paper not found")

        # ── Helper: build response from scored paper IDs ───────────────────
        def _build_response(scored: list[tuple[int, float]]) -> list[PaperResponse]:
            if not scored:
                return []
            top_ids = [pid for pid, _ in scored[:5]]
            score_map = {pid: score for pid, score in scored[:5]}
            placeholders = ",".join("?" for _ in top_ids)
            rows = db.execute(
                f"""SELECT p.*, pm.title_cn, pm.authors, pm.year, pm.venue
                    FROM papers p
                    LEFT JOIN paper_metadata pm ON p.id = pm.paper_id
                    WHERE p.id IN ({placeholders})""",
                top_ids,
            ).fetchall()
            rows_by_id = {r["id"]: r for r in rows}
            tag_map = _batch_get_tags(db, top_ids)
            results = []
            for pid in top_ids:
                row = rows_by_id.get(pid)
                if not row:
                    continue
                tag_info = tag_map.get(pid, ([], []))
                results.append(_row_to_response(
                    row, tag_info[0], tag_info[1],
                    similarity=score_map.get(pid),
                ))
            return results

        # ── Tier 1: bibliographic coupling (shared references) ─────────────
        target_refs = db.execute(
            "SELECT ref_norm FROM paper_references WHERE paper_id = ?", (paper_id,)
        ).fetchall()
        target_set = {r["ref_norm"] for r in target_refs}

        if target_set:
            all_refs = db.execute(
                """SELECT paper_id, ref_norm FROM paper_references
                   WHERE paper_id != ?""", (paper_id,)
            ).fetchall()
            other_refs: dict[int, set] = {}
            for r in all_refs:
                other_refs.setdefault(r["paper_id"], set()).add(r["ref_norm"])

            scored = []
            for pid, refs in other_refs.items():
                intersection = len(target_set & refs)
                union = len(target_set | refs)
                if union == 0:
                    continue
                jaccard = intersection / union
                if jaccard >= 0.015:
                    scored.append((pid, round(jaccard, 4)))
            scored.sort(key=lambda x: x[1], reverse=True)
            result = _build_response(scored)
            if result:
                return result

        # ── Tier 2: keyword + title word Jaccard ──────────────────────────
        import re as _re
        kw_rows = db.execute(
            """SELECT p.id, p.title, pm.keywords
               FROM papers p
               LEFT JOIN paper_metadata pm ON p.id = pm.paper_id"""
        ).fetchall()

        paper_terms: dict[int, set] = {}
        target_terms: set = set()
        for r in kw_rows:
            terms: set = set()
            if r["keywords"]:
                for kw in _re.split(r"[,;，；、\s]+", r["keywords"]):
                    kw = kw.strip().lower()
                    if len(kw) >= 2:
                        terms.add(kw)
            for w in _re.findall(r"[a-zA-Z]{3,}|[一-鿿]{2,}", r["title"] or ""):
                terms.add(w.lower())
            paper_terms[r["id"]] = terms
            if r["id"] == paper_id:
                target_terms = terms

        if target_terms:
            kw_scored = []
            for pid, terms in paper_terms.items():
                if pid == paper_id or not terms:
                    continue
                shared = len(target_terms & terms)
                union = len(target_terms | terms)
                if union > 0 and shared > 0:
                    j = shared / union
                    if j >= 0.06:
                        kw_scored.append((pid, round(j, 4)))
            kw_scored.sort(key=lambda x: x[1], reverse=True)
            result = _build_response(kw_scored)
            if result:
                return result

        # ── Tier 3: shared tags ────────────────────────────────────────────
        rows = db.execute(
            """SELECT p.*, pm.title_cn, pm.authors, pm.year, pm.venue,
                      COUNT(pt2.tag_id) as shared_tags
               FROM papers p
               JOIN paper_tags pt2 ON p.id = pt2.paper_id
               LEFT JOIN paper_metadata pm ON p.id = pm.paper_id
               WHERE pt2.tag_id IN (
                   SELECT tag_id FROM paper_tags WHERE paper_id = ?
               )
               AND p.id != ?
               GROUP BY p.id
               ORDER BY shared_tags DESC
               LIMIT 5""",
            (paper_id, paper_id),
        ).fetchall()

        ids = [r["id"] for r in rows]
        tag_map = _batch_get_tags(db, ids) if ids else {}
        results = []
        for row in rows:
            pid = row["id"]
            tag_info = tag_map.get(pid, ([], []))
            results.append(_row_to_response(row, tag_info[0], tag_info[1]))
        return results


# ── Batch Operations ─────────────────────────────────────────────────────

@router.post("/papers/batch/status")
def batch_update_status(body: BatchStatusRequest):
    """Update reading status for multiple papers at once."""
    with get_db() as db:
        placeholders = ",".join("?" for _ in body.paper_ids)
        db.execute(
            f"UPDATE papers SET reading_status=?, updated_at=datetime('now') "
            f"WHERE id IN ({placeholders})",
            [body.reading_status] + body.paper_ids,
        )
    return {"ok": True, "updated": len(body.paper_ids)}


@router.post("/papers/batch/tags")
def batch_add_tag(body: BatchTagRequest):
    """Add a tag to multiple papers at once."""
    with get_db() as db:
        # Verify tag exists
        tag = db.execute("SELECT id, name FROM tags WHERE id = ?", (body.tag_id,)).fetchone()
        if not tag:
            raise HTTPException(404, "Tag not found")
        added = 0
        for pid in body.paper_ids:
            # Verify paper exists
            if not db.execute("SELECT id FROM papers WHERE id = ?", (pid,)).fetchone():
                continue
            try:
                db.execute(
                    "INSERT OR IGNORE INTO paper_tags (paper_id, tag_id) VALUES (?, ?)",
                    (pid, body.tag_id),
                )
                if db.total_changes > 0:
                    added += 1
            except Exception:
                pass
    return {"ok": True, "tag_name": tag["name"], "added": added}


@router.post("/papers/batch/delete")
def batch_delete_papers(body: BatchDeleteRequest):
    """Delete multiple papers at once."""
    with get_db() as db:
        placeholders = ",".join("?" for _ in body.paper_ids)
        db.execute(
            f"DELETE FROM papers WHERE id IN ({placeholders})",
            body.paper_ids,
        )
    return {"ok": True, "deleted": len(body.paper_ids)}