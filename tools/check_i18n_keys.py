#!/usr/bin/env python3
"""
Scan the workspace for data-lang-key attributes and compare against language JSON files.

Usage: python tools/check_i18n_keys.py

Outputs a simple report to stdout listing keys found, missing per language, and files where missing keys are used.
"""
import re
import json
import sys
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
HTML_GLOB = '**/*.html'
LANG_FILES = [ROOT / 'lang' / 'en.json', ROOT / 'lang' / 'vi.json']

def find_keys_in_html():
    pattern = re.compile(r'data-lang-key\s*=\s*"([^"]+)"')
    keys = set()
    files_map = {}
    for p in ROOT.glob(HTML_GLOB):
        try:
            text = p.read_text(encoding='utf-8')
        except Exception:
            continue
        for m in pattern.finditer(text):
            key = m.group(1)
            keys.add(key)
            files_map.setdefault(key, set()).add(str(p.relative_to(ROOT)))
    return keys, files_map

def flatten_json(d, prefix=''):
    keys = set()
    if isinstance(d, dict):
        for k, v in d.items():
            full = f"{prefix}{k}" if not prefix else f"{prefix}.{k}"
            keys.add(full)
            keys.update(flatten_json(v, full))
    return keys

def load_lang_keys(path: Path):
    if not path.exists():
        return None
    try:
        data = json.loads(path.read_text(encoding='utf-8'))
    except Exception as e:
        print(f"Failed to parse {path}: {e}")
        return None
    # If file is a flat mapping, just return keys; else flatten nested
    if all(not isinstance(v, dict) for v in data.values()):
        return set(data.keys())
    return flatten_json(data)

def main():
    html_keys, files_map = find_keys_in_html()
    print(f"Found {len(html_keys)} unique data-lang-key entries in HTML files.")

    lang_key_sets = {}
    for lf in LANG_FILES:
        ks = load_lang_keys(lf)
        lang_key_sets[lf.name] = ks
        if ks is None:
            print(f"Warning: language file missing or invalid: {lf}")
        else:
            print(f"Loaded {len(ks)} keys from {lf.name}")

    print('\nMissing keys per language:')
    any_missing = False
    for name, ks in lang_key_sets.items():
        if ks is None:
            continue
        missing = sorted(html_keys - ks)
        if missing:
            any_missing = True
            print(f"\n{name}: {len(missing)} missing keys")
            for k in missing:
                files = ', '.join(sorted(files_map.get(k, [])))
                print(f" - {k}  (used in: {files})")
        else:
            print(f"{name}: OK - no missing keys")

    if not any_missing:
        print('\nAll keys present in available language files.')

if __name__ == '__main__':
    main()
