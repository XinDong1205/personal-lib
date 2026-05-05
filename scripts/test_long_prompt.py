"""Diagnostic: test 40K-character prompt limit with claude."""
import subprocess
import sys
import os

sys.path.insert(0, os.path.join(os.path.dirname(os.path.abspath(__file__)), ".."))
sys.stdout.reconfigure(encoding='utf-8')

from database import find_claude

claude_cmd = find_claude()
print(f"Resolved command: {claude_cmd}")

test_prompt = "Say 'hello' only." + "x" * 40000

cmd = claude_cmd + ["-p", test_prompt, "--permission-mode", "bypassPermissions"]
total = sum(len(a) for a in cmd)
print(f"Total chars: {total}")
print(f"list2cmdline: {len(subprocess.list2cmdline(cmd))}")

try:
    result = subprocess.run(
        cmd,
        capture_output=True, text=True, timeout=60,
        encoding="utf-8",
    )
    print(f"returncode: {result.returncode}")
    print(f"stdout[:200]: {result.stdout[:200]}")
    if result.stderr:
        print(f"stderr[:200]: {result.stderr[:200]}")
except FileNotFoundError as e:
    print(f"FileNotFoundError: {e}")
except Exception as e:
    print(f"Error: {type(e).__name__}: {e}")
