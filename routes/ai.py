"""AI analysis endpoints."""

import os
import platform
import subprocess
import threading

from fastapi import APIRouter, HTTPException
from database import get_db, find_claude
from models import ChatRequest, ChatResponse

router = APIRouter(tags=["AI"])

# Background job tracker: {paper_id: {"status": "running"|"done"|"error", "result": ..., "error": ...}}
_jobs: dict[int, dict] = {}
_jobs_lock = threading.Lock()


def _run_analyzer(paper_id: int, md_path: str | None, folder_path: str):
    """Run academic-paper-analyzer in background thread."""
    from database import get_db
    from services.metadata_extractor import extract_and_save

    if not md_path or not os.path.exists(md_path):
        with _jobs_lock:
            _jobs[paper_id] = {
                "status": "error",
                "error": "该论文没有 .md 文件，无法运行 academic-paper-analyzer。请先生成 MD 文件。",
            }
        return

    analysis_dir = os.path.join(folder_path, "paper-analysis")
    prompt = f"/academic-paper-analyzer {md_path}"

    try:
        claude_cmd = find_claude()
        result = subprocess.run(
            claude_cmd + ["-p", prompt, "--permission-mode", "bypassPermissions"],
            capture_output=True, text=True, timeout=900,
            cwd=folder_path,
            encoding="utf-8",
        )
    except FileNotFoundError:
        with _jobs_lock:
            _jobs[paper_id] = {
                "status": "error",
                "error": "未找到 claude 命令。请确认 Claude Code 已安装并在 PATH 中。",
            }
        return
    except subprocess.TimeoutExpired:
        with _jobs_lock:
            _jobs[paper_id] = {
                "status": "error",
                "error": "分析超时（15分钟），论文可能过长或 API 响应缓慢。",
            }
        return

    if result.returncode != 0:
        stderr = result.stderr.strip() or "(无错误输出)"
        with _jobs_lock:
            _jobs[paper_id] = {
                "status": "error",
                "error": f"Claude Code 执行失败 (code={result.returncode}): {stderr}",
            }
        return

    if not os.path.isdir(analysis_dir):
        stdout_tail = result.stdout[-500:] if result.stdout else "(empty)"
        stderr_tail = result.stderr[-300:] if result.stderr else "(empty)"
        with _jobs_lock:
            _jobs[paper_id] = {
                "status": "error",
                "error": (
                    f"技能执行完成但未在预期位置生成 paper-analysis 目录。\n"
                    f"预期路径: {analysis_dir}\n"
                    f"stdout(末尾): {stdout_tail}\n"
                    f"stderr(末尾): {stderr_tail}"
                ),
            }
        return

    md_files = sorted(
        f for f in os.listdir(analysis_dir)
        if f.endswith(".md") and os.path.isfile(os.path.join(analysis_dir, f))
    )

    # Update DB
    with get_db() as db:
        db.execute(
            "UPDATE papers SET has_paper_analysis=1, updated_at=datetime('now') WHERE id=?",
            (paper_id,),
        )

    extract_and_save(paper_id, folder_path)

    with _jobs_lock:
        _jobs[paper_id] = {
            "status": "done",
            "result": {
                "files_generated": len(md_files),
                "files": md_files,
            },
        }


@router.post("/papers/{paper_id}/analyze")
def start_academic_analyzer(paper_id: int):
    """Start Claude Code's /academic-paper-analyzer skill in the background.
    Poll GET /papers/{paper_id}/analyze/status for progress."""
    from database import get_db

    with _jobs_lock:
        existing = _jobs.get(paper_id)
        if existing and existing["status"] == "running":
            return {"ok": True, "status": "already_running"}

    with get_db() as db:
        paper = db.execute(
            "SELECT id, folder_path, md_path FROM papers WHERE id = ?",
            (paper_id,),
        ).fetchone()
        if not paper:
            raise HTTPException(404, "Paper not found")

    with _jobs_lock:
        _jobs[paper_id] = {"status": "running"}

    thread = threading.Thread(
        target=_run_analyzer,
        args=(paper_id, paper["md_path"], paper["folder_path"]),
        daemon=True,
    )
    thread.start()

    return {"ok": True, "status": "started"}


@router.get("/papers/{paper_id}/analyze/status")
def get_analyze_status(paper_id: int):
    """Check the status of a running/finished analysis job."""
    with _jobs_lock:
        job = _jobs.get(paper_id)

    if not job:
        return {"status": "not_found"}

    return {
        "paper_id": paper_id,
        "status": job["status"],
        "result": job.get("result"),
        "error": job.get("error"),
    }


@router.post("/papers/{paper_id}/chat")
def open_paper_chat(paper_id: int):
    """Open a Claude Code terminal session in the paper's folder for interactive discussion."""
    from database import get_db

    with get_db() as db:
        paper = db.execute(
            "SELECT id, title, folder_path, md_path FROM papers WHERE id = ?",
            (paper_id,),
        ).fetchone()
        if not paper:
            raise HTTPException(404, "Paper not found")

    folder = paper["folder_path"]
    if not folder or not os.path.isdir(folder):
        raise HTTPException(400, "Paper folder not found on disk")

    system = platform.system()
    try:
        if system == "Windows":
            # CREATE_NEW_CONSOLE opens a new terminal window; cwd sets working dir
            subprocess.Popen(
                ["cmd", "/k", "claude"],
                cwd=folder,
                creationflags=subprocess.CREATE_NEW_CONSOLE,
            )
        elif system == "Darwin":
            # macOS: open Terminal with osascript
            script = (
                f'tell app "Terminal" to do script '
                f'"cd \\"{folder}\\" && claude"'
            )
            subprocess.Popen(["osascript", "-e", script])
        else:
            # Linux: try xterm, gnome-terminal, or fallback to konsole
            for term in [
                ["x-terminal-emulator", "-e", f"bash -c 'cd \"{folder}\" && claude; exec bash'"],
                ["gnome-terminal", "--", "bash", "-c", f"cd \"{folder}\" && claude; exec bash"],
                ["konsole", "-e", f"bash -c 'cd \"{folder}\" && claude; exec bash'"],
            ]:
                try:
                    subprocess.Popen(term, cwd=folder)
                    break
                except FileNotFoundError:
                    continue
            else:
                raise HTTPException(500, "No terminal emulator found. Please open a terminal manually and run 'claude' in the paper folder.")
    except Exception as e:
        raise HTTPException(500, f"Failed to open terminal: {e}")

    return {"ok": True, "folder": folder}


@router.post("/papers/{paper_id}/chat/send", response_model=ChatResponse)
def send_chat_message(paper_id: int, body: ChatRequest):
    """Send a question to Claude Code with paper content as context. Returns the reply."""
    from database import get_db

    with get_db() as db:
        paper = db.execute(
            "SELECT id, title, folder_path, md_path FROM papers WHERE id = ?",
            (paper_id,),
        ).fetchone()
        if not paper:
            raise HTTPException(404, "Paper not found")

    folder = paper["folder_path"]
    if not folder or not os.path.isdir(folder):
        raise HTTPException(400, "Paper folder not found on disk")

    # Build paper context — tell Claude to read the file directly, avoiding
    # Windows command-line length limit (32K chars).
    md_path = paper["md_path"]
    if md_path and os.path.isfile(md_path):
        md_basename = os.path.basename(md_path)
        context_block = f"""你正在与用户讨论一篇学术论文。

论文标题: "{paper['title']}"
论文 Markdown 文件位于当前目录: {md_basename}

请先使用 Read 工具读取该文件，完整理解论文内容后，再回答用户的问题。
如果论文内容中没有相关信息，请如实告知，不要编造。请用清晰的中文表达。"""
    else:
        context_block = f"""你正在与用户讨论一篇学术论文。

论文标题: "{paper['title']}"

（该论文的 Markdown 全文暂不可用，请基于你的训练数据和标题信息进行讨论。如不了解该论文请如实告知。）请用清晰的中文表达。"""

    # Build conversation history (keep brief to stay under command-line limit)
    history_parts = []
    for msg in body.history[-6:]:  # Only last 6 messages
        role_label = "用户" if msg.role == "user" else "Claude"
        content_short = msg.content[:300]
        history_parts.append(f"{role_label}: {content_short}")
    history_block = "\n".join(history_parts) if history_parts else "（这是对话的开始）"

    # Construct full prompt — deliberately short to avoid Win32 32K limit
    prompt = f"""{context_block}

=== 对话历史 ===
{history_block}

=== 用户最新问题 ===
用户: {body.message}

请直接回答用户的问题。结合论文中的具体段落和概念进行回答。"""

    # Call Claude Code
    claude_cmd = find_claude()
    try:
        result = subprocess.run(
            claude_cmd + ["-p", prompt, "--permission-mode", "bypassPermissions"],
            capture_output=True, text=True, timeout=120,
            cwd=folder,
            encoding="utf-8",
        )
    except FileNotFoundError:
        raise HTTPException(500, f"未找到 claude 命令 (尝试: {claude_cmd})。请确认 Claude Code 已安装并在 PATH 中。")
    except subprocess.TimeoutExpired:
        raise HTTPException(500, "Claude Code 响应超时（2分钟），请尝试简短问题后重试。")

    if result.returncode != 0:
        stderr = result.stderr.strip() or "(无错误输出)"
        raise HTTPException(500, f"Claude Code 执行失败 (code={result.returncode}): {stderr}")

    reply = result.stdout.strip()
    if not reply:
        raise HTTPException(500, "Claude Code 返回了空响应，请重试。")

    return ChatResponse(reply=reply)
