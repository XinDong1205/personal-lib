"""
一次性配置脚本 — 配置 AI 后端凭据并初始化数据库。
运行: python scripts/setup_api.py
"""
import os, sys
sys.path.insert(0, os.path.join(os.path.dirname(os.path.abspath(__file__)), ".."))

from database import init_db, get_db, DB_PATH

# ── Database initialization ──────────────────────────────────────────────

if os.path.exists(DB_PATH):
    print(f"⚠ 数据库已存在: {DB_PATH}")
    answer = input("是否删除并重新初始化? [y/N]: ").strip().lower()
    if answer == "y":
        os.remove(DB_PATH)
        print("已删除旧数据库。")
    else:
        print("保留现有数据库，跳过初始化。")
        sys.exit(0)

init_db()
print("数据库已初始化（含 DeepSeek 默认配置）")

# ── API Key ──────────────────────────────────────────────────────────────

print("\n配置 AI 后端 API Key（DeepSeek Anthropic 兼容接口）")
print("输入 API Key，或直接回车跳过（后续可使用 claude_code 模式）:")
api_key = input("API Key: ").strip()

if api_key:
    with get_db() as db:
        db.execute(
            "INSERT OR REPLACE INTO app_settings (key, value) VALUES (?, ?)",
            ("anthropic_api_key", api_key),
        )
        db.execute(
            "INSERT OR REPLACE INTO app_settings (key, value) VALUES (?, ?)",
            ("ai_backend", "api"),
        )
    print("API Key 已保存，AI 后端已切换为 api 模式。")
else:
    print("未设置 API Key，AI 总结将使用 claude_code 模式。")

print("\n当前配置:")
with get_db() as db:
    rows = db.execute(
        "SELECT key, value FROM app_settings WHERE key LIKE 'anthropic%' OR key = 'ai_backend'"
    ).fetchall()
    for r in rows:
        val = r["value"]
        if "api_key" in r["key"] and val:
            val = val[:20] + "..." + val[-8:]
        print(f"  {r['key']} = {val}")

print("\n配置完成。运行 python start.py 启动应用。")
