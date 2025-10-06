#!/usr/bin/env python3
"""
Deduplicate lang/zh.json by loading with json (which keeps the last occurrence of duplicate keys)
and writing back a pretty-printed JSON file. Creates a backup zh.json.bak first.
"""
import json
import shutil
from pathlib import Path

ROOT = Path(r"e:/IVS/Website/ivs.github.io")
ZH = ROOT / "lang" / "zh.json"
BACKUP = ROOT / "lang" / "zh.json.bak"

if not ZH.exists():
    print("zh.json not found at:", ZH)
    raise SystemExit(1)

shutil.copy2(ZH, BACKUP)
print(f"Backup created: {BACKUP}")

with ZH.open("r", encoding="utf-8") as f:
    data = json.load(f)

# Write back with consistent formatting, preserving unicode characters (ensure_ascii=False)
with ZH.open("w", encoding="utf-8") as f:
    json.dump(data, f, ensure_ascii=False, indent=2)

print(f"Rewrote deduplicated file: {ZH}")
