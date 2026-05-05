import os, sqlite3
PROJECT_DIR = os.path.dirname(os.path.abspath(__file__))
conn = sqlite3.connect(os.path.join(PROJECT_DIR, "..", "library.db"))
conn.row_factory = sqlite3.Row

# Find papers where md_path doesn't match actual .md files in folder
rows = conn.execute("SELECT id, title, md_path, folder_path, has_md FROM papers WHERE has_md = 1").fetchall()

fixed = 0
for p in rows:
    folder = p["folder_path"]
    if not os.path.isdir(folder):
        continue
    actual_mds = [f for f in os.listdir(folder) if f.endswith('.md')]
    if not actual_mds:
        conn.execute("UPDATE papers SET has_md=0, md_path=NULL WHERE id=?", (p["id"],))
        print(f"#{p['id']} {p['title']}: has_md → 0 (no .md in folder)")
        fixed += 1
    elif p["md_path"] and not os.path.exists(p["md_path"]):
        # md_path is wrong — find the actual file
        correct = os.path.join(folder, actual_mds[0])
        conn.execute("UPDATE papers SET md_path=? WHERE id=?", (correct, p["id"]))
        print(f"#{p['id']} {p['title']}: md_path → {actual_mds[0]}")
        fixed += 1

conn.commit()
conn.close()
print(f"\nFixed {fixed} records")
