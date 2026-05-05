import os, sqlite3
PROJECT_DIR = os.path.dirname(os.path.abspath(__file__))
conn = sqlite3.connect(os.path.join(PROJECT_DIR, "..", "library.db"))
conn.row_factory = sqlite3.Row
p = conn.execute("SELECT id, title, md_path, has_md, folder_path FROM papers WHERE title LIKE '%bap%' OR title LIKE '%BAP%'").fetchone()
if p:
    print(f"Paper #{p['id']}: {p['title']}")
    print(f"  md_path: {p['md_path']}")
    print(f"  has_md: {p['has_md']}")
    print(f"  folder_path: {p['folder_path']}")
    folder = p["folder_path"]
    if os.path.isdir(folder):
        mds = [f for f in os.listdir(folder) if f.endswith('.md')]
        print(f"  .md files in folder: {mds}")
conn.close()
