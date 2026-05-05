"""Tag management endpoints."""

from fastapi import APIRouter, HTTPException
from database import get_db
from models import TagCreate, TagUpdate, TagResponse, PaperTagRequest

router = APIRouter(tags=["Tags"])


@router.get("/tags", response_model=list[TagResponse])
def list_tags():
    with get_db() as db:
        rows = db.execute(
            """SELECT t.*, COUNT(pt.paper_id) AS paper_count
               FROM tags t
               LEFT JOIN paper_tags pt ON t.id = pt.tag_id
               GROUP BY t.id
               ORDER BY t.name"""
        ).fetchall()
    return [
        TagResponse(
            id=r["id"], name=r["name"], color=r["color"],
            paper_count=r["paper_count"], created_at=r["created_at"] or "",
        )
        for r in rows
    ]


@router.post("/tags", response_model=TagResponse, status_code=201)
def create_tag(body: TagCreate):
    with get_db() as db:
        existing = db.execute(
            "SELECT id FROM tags WHERE name = ? COLLATE NOCASE", (body.name,)
        ).fetchone()
        if existing:
            raise HTTPException(409, f"Tag '{body.name}' already exists")
        cur = db.execute(
            "INSERT INTO tags (name, color) VALUES (?, ?)",
            (body.name, body.color),
        )
        row = db.execute("SELECT * FROM tags WHERE id = ?", (cur.lastrowid,)).fetchone()
    return TagResponse(
        id=row["id"], name=row["name"], color=row["color"],
        paper_count=0, created_at=row["created_at"] or "",
    )


@router.patch("/tags/{tag_id}", response_model=TagResponse)
def update_tag(tag_id: int, body: TagUpdate):
    with get_db() as db:
        row = db.execute("SELECT * FROM tags WHERE id = ?", (tag_id,)).fetchone()
        if not row:
            raise HTTPException(404, "Tag not found")
        if body.name is not None:
            conflict = db.execute(
                "SELECT id FROM tags WHERE name = ? COLLATE NOCASE AND id != ?",
                (body.name, tag_id),
            ).fetchone()
            if conflict:
                raise HTTPException(409, f"Tag '{body.name}' already exists")
            db.execute("UPDATE tags SET name = ? WHERE id = ?", (body.name, tag_id))
        if body.color is not None:
            db.execute("UPDATE tags SET color = ? WHERE id = ?", (body.color, tag_id))
        row = db.execute("SELECT * FROM tags WHERE id = ?", (tag_id,)).fetchone()
        count = db.execute(
            "SELECT COUNT(*) FROM paper_tags WHERE tag_id = ?", (tag_id,)
        ).fetchone()[0]
    return TagResponse(
        id=row["id"], name=row["name"], color=row["color"],
        paper_count=count, created_at=row["created_at"] or "",
    )


@router.delete("/tags/{tag_id}")
def delete_tag(tag_id: int):
    with get_db() as db:
        row = db.execute("SELECT id FROM tags WHERE id = ?", (tag_id,)).fetchone()
        if not row:
            raise HTTPException(404, "Tag not found")
        db.execute("DELETE FROM tags WHERE id = ?", (tag_id,))
    return {"ok": True}


@router.post("/papers/{paper_id}/tags")
def add_tag_to_paper(paper_id: int, body: PaperTagRequest):
    with get_db() as db:
        paper = db.execute("SELECT id FROM papers WHERE id = ?", (paper_id,)).fetchone()
        if not paper:
            raise HTTPException(404, "Paper not found")
        tag = db.execute("SELECT id FROM tags WHERE id = ?", (body.tag_id,)).fetchone()
        if not tag:
            raise HTTPException(404, "Tag not found")
        db.execute(
            "INSERT OR IGNORE INTO paper_tags (paper_id, tag_id) VALUES (?, ?)",
            (paper_id, body.tag_id),
        )
    return {"ok": True}


@router.delete("/papers/{paper_id}/tags/{tag_id}")
def remove_tag_from_paper(paper_id: int, tag_id: int):
    with get_db() as db:
        db.execute(
            "DELETE FROM paper_tags WHERE paper_id = ? AND tag_id = ?",
            (paper_id, tag_id),
        )
    return {"ok": True}
