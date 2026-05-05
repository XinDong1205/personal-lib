"""Notes endpoints."""

from fastapi import APIRouter, HTTPException
from database import get_db
from models import NoteCreate, NoteUpdate, NoteResponse

router = APIRouter(tags=["Notes"])


@router.get("/papers/{paper_id}/notes", response_model=list[NoteResponse])
def list_notes(paper_id: int):
    with get_db() as db:
        rows = db.execute(
            """SELECT * FROM notes WHERE paper_id = ?
               ORDER BY created_at DESC""",
            (paper_id,),
        ).fetchall()
    return [
        NoteResponse(
            id=r["id"], paper_id=r["paper_id"],
            content=r["content"], note_type=r["note_type"],
            created_at=r["created_at"] or "",
            updated_at=r["updated_at"] or "",
        )
        for r in rows
    ]


@router.post("/papers/{paper_id}/notes", response_model=NoteResponse, status_code=201)
def create_note(paper_id: int, body: NoteCreate):
    with get_db() as db:
        paper = db.execute("SELECT id FROM papers WHERE id = ?", (paper_id,)).fetchone()
        if not paper:
            raise HTTPException(404, "Paper not found")
        cur = db.execute(
            "INSERT INTO notes (paper_id, content, note_type) VALUES (?, ?, 'user')",
            (paper_id, body.content),
        )
        row = db.execute("SELECT * FROM notes WHERE id = ?", (cur.lastrowid,)).fetchone()
    return NoteResponse(
        id=row["id"], paper_id=row["paper_id"],
        content=row["content"], note_type=row["note_type"],
        created_at=row["created_at"] or "",
        updated_at=row["updated_at"] or "",
    )


@router.patch("/notes/{note_id}", response_model=NoteResponse)
def update_note(note_id: int, body: NoteUpdate):
    with get_db() as db:
        row = db.execute("SELECT * FROM notes WHERE id = ?", (note_id,)).fetchone()
        if not row:
            raise HTTPException(404, "Note not found")
        db.execute(
            "UPDATE notes SET content=?, updated_at=datetime('now') WHERE id=?",
            (body.content, note_id),
        )
        row = db.execute("SELECT * FROM notes WHERE id = ?", (note_id,)).fetchone()
    return NoteResponse(
        id=row["id"], paper_id=row["paper_id"],
        content=row["content"], note_type=row["note_type"],
        created_at=row["created_at"] or "",
        updated_at=row["updated_at"] or "",
    )


@router.delete("/notes/{note_id}")
def delete_note(note_id: int):
    with get_db() as db:
        row = db.execute("SELECT id FROM notes WHERE id = ?", (note_id,)).fetchone()
        if not row:
            raise HTTPException(404, "Note not found")
        db.execute("DELETE FROM notes WHERE id = ?", (note_id,))
    return {"ok": True}
