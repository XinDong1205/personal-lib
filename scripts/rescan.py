"""Re-scan library directory to update DB with current md_path values."""
import os, sys
sys.path.insert(0, os.path.join(os.path.dirname(os.path.abspath(__file__)), ".."))

from services.indexer import scan_and_index
from database import get_db

PROJECT_DIR = os.path.dirname(os.path.abspath(__file__))

# Get root_dir from settings
with get_db() as db:
    row = db.execute("SELECT value FROM app_settings WHERE key='root_dir'").fetchone()
    root_dir = row["value"] if row else os.path.join(PROJECT_DIR, "..", "library")

print(f"正在扫描: {root_dir}")
stats = scan_and_index(root_dir)
print(f"完成: 新增 {stats['added']}, 更新 {stats['updated']}, 移除 {stats['removed']}, 总计 {stats['total']}")
