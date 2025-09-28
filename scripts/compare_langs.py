import json
from pathlib import Path

base = Path(__file__).resolve().parents[1] / 'lang'
files = {
    'vi': base / 'vi.json',
    'en': base / 'en.json',
    'zh': base / 'zh.json',
}

def load(p):
    try:
        return json.loads(p.read_text(encoding='utf-8'))
    except Exception as e:
        print(f'ERROR reading {p}:', e)
        return {}

vi = load(files['vi'])
en = load(files['en'])
zh = load(files['zh'])

vi_keys = set(vi.keys())
en_keys = set(en.keys())
zh_keys = set(zh.keys())

print('Counts:')
print('  vi keys:', len(vi_keys))
print('  en keys:', len(en_keys))
print('  zh keys:', len(zh_keys))

missing_in_en = sorted(list(vi_keys - en_keys))
missing_in_zh = sorted(list(vi_keys - zh_keys))
extra_in_en = sorted(list(en_keys - vi_keys))
extra_in_zh = sorted(list(zh_keys - vi_keys))

print('\nSummary:')
print(f'  Missing in en.json: {len(missing_in_en)}')
print(f'  Missing in zh.json: {len(missing_in_zh)}')
print(f'  Extra keys in en.json (not in vi.json): {len(extra_in_en)}')
print(f'  Extra keys in zh.json (not in vi.json): {len(extra_in_zh)}')

if missing_in_en:
    print('\nFirst 50 keys missing in en.json:')
    for k in missing_in_en[:50]:
        print('  ', k)

if missing_in_zh:
    print('\nFirst 50 keys missing in zh.json:')
    for k in missing_in_zh[:50]:
        print('  ', k)

if extra_in_en:
    print('\nFirst 50 extra keys in en.json:')
    for k in extra_in_en[:50]:
        print('  ', k)

if extra_in_zh:
    print('\nFirst 50 extra keys in zh.json:')
    for k in extra_in_zh[:50]:
        print('  ', k)

# Save a small report file
report = {
    'vi_count': len(vi_keys),
    'en_count': len(en_keys),
    'zh_count': len(zh_keys),
    'missing_in_en': missing_in_en,
    'missing_in_zh': missing_in_zh,
    'extra_in_en': extra_in_en,
    'extra_in_zh': extra_in_zh,
}
(Path(__file__).resolve().parents[1] / 'lang' / 'compare_report.json').write_text(json.dumps(report, ensure_ascii=False, indent=2), encoding='utf-8')
print('\nWrote JSON report to lang/compare_report.json')
