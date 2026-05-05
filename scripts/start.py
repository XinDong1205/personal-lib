"""
图书馆 — 一键启动脚本
自动安装依赖并启动 Web 服务器。
运行: python scripts/start.py
"""
import subprocess, sys, os

PROJECT_DIR = os.path.join(os.path.dirname(os.path.abspath(__file__)), "..")

def install_deps():
    deps = ["fastapi", "uvicorn"]
    for pkg in deps:
        print(f"正在安装 {pkg}...")
        subprocess.check_call(
            [sys.executable, "-m", "pip", "install", pkg, "--quiet"]
        )
    print("依赖安装完成。\n")

def start_server():
    print("正在启动 个人图书馆...")
    print("浏览器将自动打开 http://127.0.0.1:8000")
    print("按 Ctrl+C 停止服务器\n")
    subprocess.run([sys.executable, os.path.join(PROJECT_DIR, "web_server.py")], cwd=PROJECT_DIR)

if __name__ == "__main__":
    try:
        import fastapi, uvicorn
    except ImportError:
        install_deps()
    start_server()
