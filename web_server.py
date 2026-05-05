"""
FastAPI web server for the Personal Library.
Serves the API and static frontend files.
"""

import logging
import os
import sys
import threading
import time
import webbrowser

from contextlib import asynccontextmanager
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import FileResponse
from fastapi.staticfiles import StaticFiles

from database import init_db
from routes import papers, search, tags, notes, ai, scan, settings

logging.basicConfig(
    level=logging.INFO,
    format="%(asctime)s [%(levelname)s] %(name)s: %(message)s",
    datefmt="%H:%M:%S",
)


def get_static_dir() -> str:
    if getattr(sys, 'frozen', False):
        return os.path.join(sys._MEIPASS, 'static')
    return os.path.join(os.path.dirname(os.path.abspath(__file__)), 'static')


@asynccontextmanager
async def lifespan(app: FastAPI):
    # Startup
    init_db()
    # Run scan + reference extraction in background thread (non-blocking)
    threading.Thread(target=_background_scan, daemon=True).start()
    yield
    # Shutdown: nothing to do


def _background_scan():
    """Scan library and extract references in background (non-blocking)."""
    try:
        from services.indexer import scan_and_index
        from database import get_db
        with get_db() as db:
            row = db.execute(
                "SELECT value FROM app_settings WHERE key='root_dir'"
            ).fetchone()
        root_dir = row["value"] if row else os.path.dirname(os.path.abspath(__file__))
        scan_and_index(root_dir)
    except Exception:
        import traceback
        traceback.print_exc()


app = FastAPI(
    title="个人图书馆 API",
    description="Personal Library for Academic PDF Management",
    version="2.0.0",
    lifespan=lifespan,
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://127.0.0.1:8000", "http://localhost:8000"],
    allow_methods=["*"],
    allow_headers=["*"],
)

# API routes
app.include_router(scan.router, prefix="/api/v1")
app.include_router(papers.router, prefix="/api/v1")
app.include_router(search.router, prefix="/api/v1")
app.include_router(tags.router, prefix="/api/v1")
app.include_router(notes.router, prefix="/api/v1")
app.include_router(ai.router, prefix="/api/v1")
app.include_router(settings.router, prefix="/api/v1")

# Static files
static_dir = get_static_dir()
if os.path.isdir(static_dir):
    app.mount("/static", StaticFiles(directory=static_dir, html=False), name="static")


@app.get("/")
async def index():
    index_path = os.path.join(static_dir, "index.html")
    if os.path.isfile(index_path):
        return FileResponse(index_path)
    return {"message": "Personal Library API is running. Static files not found."}


def open_browser(port: int):
    time.sleep(1.0)
    webbrowser.open(f"http://127.0.0.1:{port}")


if __name__ == "__main__":
    import uvicorn
    port = int(os.environ.get("LIBRARY_PORT", "8000"))
    threading.Thread(target=open_browser, args=(port,), daemon=True).start()
    uvicorn.run(app, host="127.0.0.1", port=port, log_level="info")
