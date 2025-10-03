#!/usr/bin/env python3
import json
import re
from pathlib import Path
ROOT = Path(__file__).resolve().parents[1]
HTML_GLOB = '**/*.html'
LANG_FILES = [ROOT / 'lang' / 'en.json', ROOT / 'lang' / 'vi.json', ROOT / 'lang' / 'zh.json']

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
        return set()
    try:
        data = json.loads(path.read_text(encoding='utf-8'))
    except Exception:
        return set()
    if all(not isinstance(v, dict) for v in data.values()):
        return set(data.keys())
    return flatten_json(data)


def main():
    html_keys, files_map = find_keys_in_html()
    out = {}
    for lf in LANG_FILES:
        ks = load_lang_keys(lf)
        missing = sorted(html_keys - ks)
        out[lf.name] = missing
        (ROOT / 'tools' / f'missing_{lf.name}.json').write_text(json.dumps(missing, ensure_ascii=False, indent=2), encoding='utf-8')
    print(f"Wrote missing keys for: {', '.join(p.name for p in LANG_FILES)} to tools/missing_*.json")

if __name__ == '__main__':
    main()
