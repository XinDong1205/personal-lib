"""Diagnose database paths."""
import os
import sqlite3

PROJECT_DIR = os.path.dirname(os.path.abspath(__file__))
DB_PATH = os.path.join(PROJECT_DIR, "..", "library.db")

conn = sqlite3.connect(DB_PATH)
conn.row_factory = sqlite3.Row

# Check root_dir
row = conn.execute("SELECT value FROM app_settings WHERE key='root_dir'").fetchone()
print(f"root_dir = {row['value']}")
print(f"  exists: {os.path.isdir(row['value'])}")

# Check a few paper paths
papers = conn.execute("SELECT id, title, pdf_path, folder_path FROM papers LIMIT 3").fetchall()
for p in papers:
    print(f"\n--- Paper {p['id']}: {p['title']}")
    print(f"  pdf_path    = {p['pdf_path']}")
    print(f"  exists      = {os.path.exists(p['pdf_path'])}")
    print(f"  folder_path = {p['folder_path']}")
    print(f"  exists      = {os.path.isdir(p['folder_path'])}")
    analysis_dir = os.path.join(p['folder_path'], "paper-analysis")
    print(f"  analysis_dir = {analysis_dir}")
    print(f"  exists       = {os.path.isdir(analysis_dir)}")
    if os.path.isdir(analysis_dir):
        files = os.listdir(analysis_dir)
        print(f"  files        = {files}")

conn.close()
