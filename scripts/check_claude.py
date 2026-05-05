"""Diagnostic: test claude.exe invocation."""
import subprocess
import sys
import os

sys.path.insert(0, os.path.join(os.path.dirname(os.path.abspath(__file__)), ".."))
sys.stdout.reconfigure(encoding='utf-8')

from database import find_claude

claude_cmd = find_claude()
print(f"Resolved command: {claude_cmd}")
try:
    result = subprocess.run(
        claude_cmd + ["--version"],
        capture_output=True, text=True, timeout=30,
        encoding="utf-8",
    )
    print(f"returncode: {result.returncode}")
    print(f"stdout: {result.stdout[:500]}")
    print(f"stderr: {result.stderr[:500]}")
except FileNotFoundError as e:
    print(f"FileNotFoundError: {e}")
except Exception as e:
    print(f"Error: {type(e).__name__}: {e}")
