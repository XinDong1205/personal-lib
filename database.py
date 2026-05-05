"""
SQLite database layer for the Personal Library.
Handles connection, schema creation, and migrations.
"""

import os
import sqlite3
import sys
from contextlib import contextmanager
from typing import Generator


def get_db_path() -> str:
    if getattr(sys, 'frozen', False):
        app_data = os.environ.get("APPDATA", os.path.expanduser("~"))
        db_dir = os.path.join(app_data, "个人图书馆")
        os.makedirs(db_dir, exist_ok=True)
        return os.path.join(db_dir, "library.db")
    return os.path.join(os.path.dirname(os.path.abspath(__file__)), 'library.db')


DB_PATH = get_db_path()


@contextmanager
def get_db() -> Generator[sqlite3.Connection, None, None]:
    conn = sqlite3.connect(DB_PATH)
    conn.row_factory = sqlite3.Row
    conn.execute("PRAGMA journal_mode=WAL")
    conn.execute("PRAGMA foreign_keys=ON")
    conn.execute("PRAGMA busy_timeout=5000")
    try:
        yield conn
        conn.commit()
    except Exception:
        conn.rollback()
        raise
    finally:
        conn.close()


def init_db():
    with get_db() as db:
        db.executescript(SCHEMA)
        _migrate_fts5(db)
        _seed_tags(db)
        _seed_settings(db)


def _migrate_fts5(db: sqlite3.Connection):
    """Drop and recreate FTS5 table if it has the old schema (title+body columns)."""
    cur = db.execute("SELECT sql FROM sqlite_master WHERE type='table' AND name='fts_search'")
    row = cur.fetchone()
    if not row:
        return  # Table doesn't exist yet — SCHEMA will create it correctly

    old_sql = row[0]
    # Check if this is the old schema (has 'title' column that doesn't exist in paper_content)
    if 'title' in old_sql.lower() and 'body' in old_sql.lower():
        db.execute("DROP TRIGGER IF EXISTS fts_content_ai")
        db.execute("DROP TRIGGER IF EXISTS fts_content_au")
        db.execute("DROP TRIGGER IF EXISTS fts_content_ad")
        db.execute("DROP TABLE IF EXISTS fts_search")
        db.execute("""
            CREATE VIRTUAL TABLE fts_search USING fts5(
                paper_id UNINDEXED,
                content,
                content='paper_content',
                content_rowid='paper_id',
                tokenize='unicode61'
            )
        """)
        db.execute("""
            CREATE TRIGGER fts_content_ai AFTER INSERT ON paper_content BEGIN
                INSERT INTO fts_search(fts_search) VALUES('rebuild');
            END
        """)
        db.execute("""
            CREATE TRIGGER fts_content_au AFTER UPDATE ON paper_content BEGIN
                INSERT INTO fts_search(fts_search) VALUES('rebuild');
            END
        """)
        db.execute("""
            CREATE TRIGGER fts_content_ad AFTER DELETE ON paper_content BEGIN
                INSERT INTO fts_search(fts_search) VALUES('rebuild');
            END
        """)
        # Rebuild index from existing content
        db.execute("INSERT INTO fts_search(fts_search) VALUES('rebuild')")


def _seed_tags(db: sqlite3.Connection):
    existing = db.execute("SELECT COUNT(*) FROM tags").fetchone()[0]
    if existing > 0:
        return
    defaults = [
        ('区块链', '#c77d20'),
        ('VANET', '#3b5998'),
        ('隐私保护', '#7b4b8a'),
        ('认证', '#2d8a3e'),
        ('共识机制', '#1a5c8a'),
        ('车联网', '#b85c3a'),
        ('工业物联网', '#5c7a5c'),
        ('密钥协商', '#8a5c3a'),
        ('数据共享', '#4a6fa5'),
        ('签名方案', '#a54a6f'),
    ]
    db.executemany("INSERT INTO tags (name, color) VALUES (?, ?)", defaults)


def _seed_settings(db: sqlite3.Connection):
    existing = db.execute("SELECT COUNT(*) FROM app_settings").fetchone()[0]
    if existing > 0:
        return
    library_dir = os.path.join(os.path.dirname(os.path.abspath(__file__)), "library")
    os.makedirs(library_dir, exist_ok=True)
    defaults = [
        ('root_dir', library_dir),
        ('anthropic_base_url', 'https://api.deepseek.com/anthropic'),
        ('anthropic_model', 'deepseek-v4-pro'),
        ('ai_backend', 'claude_code'),
        ('language', 'zh'),
        ('claude_exe_path', ''),
    ]
    db.executemany(
        "INSERT OR IGNORE INTO app_settings (key, value) VALUES (?, ?)",
        defaults,
    )


def find_claude() -> list[str]:
    """Return the command list to invoke claude.

    Resolves via: (1) app_settings 'claude_exe_path', (2) known install paths,
    (3) npm global wrapper, (4) bare 'claude' in PATH.
    """
    # 1) User-configured path in app_settings
    try:
        with get_db() as db:
            row = db.execute(
                "SELECT value FROM app_settings WHERE key='claude_exe_path'"
            ).fetchone()
        if row and row["value"]:
            path = os.path.expandvars(row["value"])
            if os.path.isfile(path):
                return [path]
    except Exception:
        pass

    # 2) Known install locations
    known = [
        os.path.expandvars(r"%USERPROFILE%\.local\bin\claude.exe"),
        os.path.expandvars(r"%APPDATA%\npm\node_modules\@anthropic-ai\claude-code\bin\claude.exe"),
        os.path.expandvars(r"%LOCALAPPDATA%\Programs\claude\claude.exe"),
    ]
    for p in known:
        if os.path.isfile(p):
            return [p]

    # 3) npm global .cmd wrapper (needs cmd /c on Windows)
    cmd_path = os.path.expandvars(r"%APPDATA%\npm\claude.cmd")
    if os.path.isfile(cmd_path):
        return ["cmd", "/c", cmd_path]

    # 4) Last resort: hope 'claude' is in PATH
    return ["claude"]


SCHEMA = """
CREATE TABLE IF NOT EXISTS papers (
    id                INTEGER PRIMARY KEY AUTOINCREMENT,
    pdf_path          TEXT NOT NULL UNIQUE,
    folder_path       TEXT NOT NULL,
    folder_name       TEXT NOT NULL,
    title             TEXT NOT NULL,
    has_md            INTEGER NOT NULL DEFAULT 0,
    has_chinese       INTEGER NOT NULL DEFAULT 0,
    folder_is_chinese INTEGER NOT NULL DEFAULT 0,
    md_path           TEXT,
    chinese_pdf_path  TEXT,
    reading_status    TEXT NOT NULL DEFAULT 'unread'
        CHECK (reading_status IN ('unread', 'reading', 'read')),
    has_paper_analysis INTEGER NOT NULL DEFAULT 0,
    created_at        TEXT NOT NULL DEFAULT (datetime('now')),
    updated_at        TEXT NOT NULL DEFAULT (datetime('now'))
);

CREATE INDEX IF NOT EXISTS idx_papers_folder ON papers(folder_path);
CREATE INDEX IF NOT EXISTS idx_papers_status ON papers(reading_status);
CREATE INDEX IF NOT EXISTS idx_papers_chinese ON papers(folder_is_chinese);

CREATE TABLE IF NOT EXISTS paper_content (
    paper_id    INTEGER PRIMARY KEY REFERENCES papers(id) ON DELETE CASCADE,
    content     TEXT NOT NULL,
    word_count  INTEGER NOT NULL DEFAULT 0,
    indexed_at  TEXT NOT NULL DEFAULT (datetime('now'))
);

CREATE VIRTUAL TABLE IF NOT EXISTS fts_search USING fts5(
    paper_id UNINDEXED,
    content,
    content='paper_content',
    content_rowid='paper_id',
    tokenize='unicode61'
);

-- Triggers to keep FTS5 external content index in sync
CREATE TRIGGER IF NOT EXISTS fts_content_ai AFTER INSERT ON paper_content BEGIN
    INSERT INTO fts_search(fts_search) VALUES('rebuild');
END;
CREATE TRIGGER IF NOT EXISTS fts_content_au AFTER UPDATE ON paper_content BEGIN
    INSERT INTO fts_search(fts_search) VALUES('rebuild');
END;
CREATE TRIGGER IF NOT EXISTS fts_content_ad AFTER DELETE ON paper_content BEGIN
    INSERT INTO fts_search(fts_search) VALUES('rebuild');
END;

CREATE TABLE IF NOT EXISTS paper_metadata (
    id            INTEGER PRIMARY KEY AUTOINCREMENT,
    paper_id      INTEGER NOT NULL UNIQUE REFERENCES papers(id) ON DELETE CASCADE,
    title_en      TEXT,
    title_cn      TEXT,
    authors       TEXT,
    institution   TEXT,
    year          INTEGER,
    venue         TEXT,
    field         TEXT,
    keywords      TEXT,
    doi           TEXT,
    page_count    INTEGER,
    abstract_text TEXT,
    innovation    TEXT,
    architecture  TEXT,
    strengths     TEXT,
    weaknesses    TEXT,
    future_work   TEXT,
    created_at    TEXT NOT NULL DEFAULT (datetime('now'))
);

CREATE TABLE IF NOT EXISTS tags (
    id         INTEGER PRIMARY KEY AUTOINCREMENT,
    name       TEXT NOT NULL UNIQUE COLLATE NOCASE,
    color      TEXT NOT NULL DEFAULT '#5e81ac',
    created_at TEXT NOT NULL DEFAULT (datetime('now'))
);

CREATE TABLE IF NOT EXISTS paper_tags (
    paper_id   INTEGER NOT NULL REFERENCES papers(id) ON DELETE CASCADE,
    tag_id     INTEGER NOT NULL REFERENCES tags(id) ON DELETE CASCADE,
    created_at TEXT NOT NULL DEFAULT (datetime('now')),
    PRIMARY KEY (paper_id, tag_id)
);

CREATE INDEX IF NOT EXISTS idx_paper_tags_tag ON paper_tags(tag_id);

CREATE TABLE IF NOT EXISTS notes (
    id         INTEGER PRIMARY KEY AUTOINCREMENT,
    paper_id   INTEGER NOT NULL REFERENCES papers(id) ON DELETE CASCADE,
    content    TEXT NOT NULL,
    note_type  TEXT NOT NULL DEFAULT 'user'
        CHECK (note_type IN ('user', 'ai_summary')),
    created_at TEXT NOT NULL DEFAULT (datetime('now')),
    updated_at TEXT NOT NULL DEFAULT (datetime('now'))
);

CREATE INDEX IF NOT EXISTS idx_notes_paper ON notes(paper_id);

CREATE TABLE IF NOT EXISTS paper_references (
    id        INTEGER PRIMARY KEY AUTOINCREMENT,
    paper_id  INTEGER NOT NULL REFERENCES papers(id) ON DELETE CASCADE,
    ref_text  TEXT NOT NULL,
    ref_norm  TEXT NOT NULL,
    UNIQUE(paper_id, ref_norm)
);

CREATE INDEX IF NOT EXISTS idx_paper_refs_paper ON paper_references(paper_id);

CREATE TABLE IF NOT EXISTS app_settings (
    key   TEXT PRIMARY KEY,
    value TEXT NOT NULL
);
"""
