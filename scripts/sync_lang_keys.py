#!/usr/bin/env python3
import re
import json
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
PAT = re.compile(r'data-lang-key\s*=\s*"([^"]+)"')
EXCLUDE_DIRS = {'.git','node_modules','.github','lang/backups','_backups'}

keys = set()
for p in ROOT.rglob('*'):
    if p.is_dir():
        if p.name in EXCLUDE_DIRS:
            # skip
            continue
        else:
            continue
    # only text files
    if p.suffix.lower() not in {'.html','.htm','.md','.njk','.js','.jsx','.json'}:
        continue
    try:
        txt = p.read_text(encoding='utf-8')
    except Exception:
        try:
            txt = p.read_text(encoding='latin-1')
        except Exception:
            continue
    for m in PAT.finditer(txt):
        keys.add(m.group(1))

keys = sorted(keys)
# write keys list
out_keys = ROOT / 'scripts' / 'lang_keys.txt'
out_keys.write_text('\n'.join(keys) + '\n', encoding='utf-8')

lang_dir = ROOT / 'lang'
langs = ['en.json','vi.json','zh.json']
updated = {}
for ln in langs:
    path = lang_dir / ln
    if not path.exists():
        print(f"Warning: {path} missing")
        continue
    try:
        data = json.loads(path.read_text(encoding='utf-8'))
    except Exception as e:
        print(f"Failed to load {path}: {e}")
        data = {}
    missing = 0
    for k in keys:
        if k not in data:
            data[k] = ""
            missing += 1
    # sort keys for stable output
    newobj = {k: data[k] for k in sorted(data.keys())}
    path.write_text(json.dumps(newobj, ensure_ascii=False, indent=2) + '\n', encoding='utf-8')
    updated[ln] = missing

print("Scanned files for data-lang-key and synchronized language files.")
print(f"Total keys found: {len(keys)}")
for ln, miss in updated.items():
    print(f"{ln}: added {miss} missing keys")
print(f"Wrote keys to: {out_keys}")
