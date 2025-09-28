import re
import json
from pathlib import Path
import os

ROOT = Path(__file__).resolve().parents[1]
LANG_DIR = ROOT / 'lang'
BACKUP_SUFFIX = '.bak_auto'

# Find data-lang-key in files
pattern = re.compile(r'data-lang-key\s*=\s*["\']([^"\']+)["\']')

found = set()
for dirpath, dirnames, filenames in os.walk(ROOT):
    # skip node_modules, .git, .vs, and lang folder scanning again
    if any(skip in dirpath for skip in ('\\.git', '\\node_modules', '\\.vs')):
        continue
    for fname in filenames:
        if fname.lower().endswith(('.html', '.htm', '.js', '.jsx', '.ts', '.tsx')):
            p = Path(dirpath) / fname
            try:
                text = p.read_text(encoding='utf-8')
            except Exception:
                continue
            for m in pattern.finditer(text):
                found.add(m.group(1))

# Also include keys appearing in lang files already
vi_path = LANG_DIR / 'vi.json'
en_path = LANG_DIR / 'en.json'
zh_path = LANG_DIR / 'zh.json'

def load_json(p):
    if not p.exists():
        return {}
    try:
        return json.loads(p.read_text(encoding='utf-8'))
    except Exception as e:
        print('Failed to load', p, e)
        return {}

vi = load_json(vi_path)
en = load_json(en_path)
zh = load_json(zh_path)

# union keys
all_keys = set(found) | set(vi.keys()) | set(en.keys()) | set(zh.keys())

print(f'Found {len(found)} data-lang-key occurrences in source files.')
print(f'Total distinct language keys after union with existing lang files: {len(all_keys)}')

# Backup originals
for p in (vi_path, en_path, zh_path):
    if p.exists():
        b = p.with_suffix(p.suffix + BACKUP_SUFFIX)
        if not b.exists():
            b.write_text(p.read_text(encoding='utf-8'), encoding='utf-8')
            print('Backed up', p, '->', b)

# Helper to make a reasonable fallback string
def fallback_display(key):
    # Convert snake_case or kebab to Title Case as placeholder
    s = key.replace('_', ' ').replace('-', ' ')
    s = re.sub(r'\s+', ' ', s).strip()
    return s[0].upper() + s[1:] if s else key

# Build complete dicts
new_vi = {}
new_en = {}
new_zh = {}

for k in sorted(all_keys):
    vi_val = vi.get(k)
    en_val = en.get(k)
    zh_val = zh.get(k)

    # VI: prefer existing vi; else if en given, use en as placeholder; else zh; else fallback_display
    if vi_val is not None:
        new_vi[k] = vi_val
    elif en_val is not None:
        new_vi[k] = en_val
    elif zh_val is not None:
        new_vi[k] = zh_val
    else:
        new_vi[k] = fallback_display(k)

    # EN: prefer existing en; else try to use vi (not ideal but keeps coverage); else zh; else fallback
    if en_val is not None:
        new_en[k] = en_val
    elif vi_val is not None:
        new_en[k] = vi_val
    elif zh_val is not None:
        new_en[k] = zh_val
    else:
        new_en[k] = fallback_display(k)

    # ZH: prefer existing zh; else try to use vi; else en; else fallback
    if zh_val is not None:
        new_zh[k] = zh_val
    elif vi_val is not None:
        new_zh[k] = vi_val
    elif en_val is not None:
        new_zh[k] = en_val
    else:
        new_zh[k] = fallback_display(k)

# Write files
LANG_DIR.mkdir(parents=True, exist_ok=True)
vi_path.write_text(json.dumps(new_vi, ensure_ascii=False, indent=2), encoding='utf-8')
en_path.write_text(json.dumps(new_en, ensure_ascii=False, indent=2), encoding='utf-8')
zh_path.write_text(json.dumps(new_zh, ensure_ascii=False, indent=2), encoding='utf-8')

print('Wrote completed language files:')
print(' -', vi_path, '(', len(new_vi), 'keys )')
print(' -', en_path, '(', len(new_en), 'keys )')
print(' -', zh_path, '(', len(new_zh), 'keys )')

# Also write a small report
report = {
    'found_in_source': len(found),
    'total_keys': len(all_keys),
    'vi_keys': len(new_vi),
    'en_keys': len(new_en),
    'zh_keys': len(new_zh),
}
(LANG_DIR / 'gather_complete_report.json').write_text(json.dumps(report, ensure_ascii=False, indent=2), encoding='utf-8')
print('Wrote report to lang/gather_complete_report.json')
