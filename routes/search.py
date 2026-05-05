"""FTS5 full-text search endpoint."""

import math
import re

from fastapi import APIRouter
from database import get_db
from models import SearchResult, SearchResponse

router = APIRouter(tags=["Search"])

# Characters that have special meaning in FTS5 query syntax
_FTS5_SPECIAL = re.compile(r'["*\-\(\)]')


def _sanitize_fts5(query: str) -> str:
    """Remove FTS5 syntax characters to prevent parse errors on user input."""
    cleaned = _FTS5_SPECIAL.sub(' ', query)
    cleaned = re.sub(r'\s+', ' ', cleaned).strip()
    if not cleaned:
        return ""
    return cleaned


@router.get("/search", response_model=SearchResponse)
def fulltext_search(q: str = "", page: int = 1, per_page: int = 20):
    if not q.strip():
        return SearchResponse(results=[], total=0, page=page, per_page=per_page, query=q)

    safe_q = _sanitize_fts5(q)
    if not safe_q:
        return SearchResponse(results=[], total=0, page=page, per_page=per_page, query=q)

    with get_db() as db:
        # Check if any content is indexed
        indexed = db.execute("SELECT COUNT(*) FROM paper_content").fetchone()[0]
        if indexed == 0:
            return SearchResponse(results=[], total=0, page=page, per_page=per_page, query=q)

        try:
            count_row = db.execute(
                """SELECT COUNT(*) FROM fts_search
                   WHERE fts_search MATCH ?""",
                (safe_q,),
            ).fetchone()
            total = count_row[0] if count_row else 0
        except Exception:
            return SearchResponse(results=[], total=0, page=page, per_page=per_page, query=q)

        total_pages = max(1, math.ceil(total / per_page))
        offset = (page - 1) * per_page

        try:
            rows = db.execute(
                """SELECT fts.rank, pc.paper_id, p.title, p.folder_name,
                   snippet(fts_search, 1, '<mark>', '</mark>', '...', 40) AS snippet
                   FROM fts_search fts
                   JOIN paper_content pc ON fts.rowid = pc.paper_id
                   JOIN papers p ON pc.paper_id = p.id
                   WHERE fts_search MATCH ?
                   ORDER BY rank
                   LIMIT ? OFFSET ?""",
                (safe_q, per_page, offset),
            ).fetchall()
        except Exception:
            rows = []

    results = [
        SearchResult(
            paper_id=r["paper_id"],
            title=r["title"],
            folder_name=r["folder_name"],
            snippet=r["snippet"] or "",
            rank=round(r["rank"], 4) if r["rank"] else 0,
        )
        for r in rows
    ]

    return SearchResponse(
        results=results, total=total,
        page=page, per_page=per_page, query=q,
    )
