#!/usr/bin/env python3
import json
from pathlib import Path
ROOT = Path(__file__).resolve().parents[1]
lang_en = ROOT / 'lang' / 'en.json'
lang_zh = ROOT / 'lang' / 'zh.json'
missing_en = ROOT / 'tools' / 'missing_en.json.json'
missing_zh = ROOT / 'tools' / 'missing_zh.json.json'

def load_json(p: Path):
    return json.loads(p.read_text(encoding='utf-8')) if p.exists() else {}

def write_json(p: Path, data):
    p.write_text(json.dumps(data, ensure_ascii=False, indent=2), encoding='utf-8')


en = load_json(lang_en)
zh = load_json(lang_zh)
men = json.loads(missing_en.read_text(encoding='utf-8')) if missing_en.exists() else []
men_set = set(men)

mzh = json.loads(missing_zh.read_text(encoding='utf-8')) if missing_zh.exists() else []
mzh_set = set(mzh)

# Append placeholders where missing
added_en = 0
for k in sorted(men_set):
    if k not in en:
        en[k] = f"TODO: translate (en): {k}"
        added_en += 1

added_zh = 0
for k in sorted(mzh_set):
    if k not in zh:
        zh[k] = f"TODO: translate (zh): {k}"
        added_zh += 1

write_json(lang_en, en)
write_json(lang_zh, zh)
print(f"Added {added_en} placeholders to {lang_en.name}")
print(f"Added {added_zh} placeholders to {lang_zh.name}")
