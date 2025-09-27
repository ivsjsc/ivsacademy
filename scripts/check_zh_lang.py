import json
import re
from pathlib import Path

root = Path(r"e:\IVS\Website\ivs\ivs.github.io")
lang_dir = root / 'lang'
vi_path = lang_dir / 'vi.json'
en_path = lang_dir / 'en.json'
zh_path = lang_dir / 'zh.json'
report_path = lang_dir / 'zh_check_report.json'

cjk_re = re.compile(r'[\u4e00-\u9fff\u3400-\u4dbf\uf900-\ufaff]')
latin_re = re.compile(r'[A-Za-z]')

def load(path):
    try:
        return json.loads(path.read_text(encoding='utf-8'))
    except Exception as e:
        print(f"Failed to load {path}: {e}")
        return {}

vi = load(vi_path)
en = load(en_path)
zh = load(zh_path)

all_keys = set(vi.keys()) | set(en.keys()) | set(zh.keys())

report = {
    'counts': {
        'vi_keys': len(vi),
        'en_keys': len(en),
        'zh_keys': len(zh),
        'union_keys': len(all_keys)
    },
    'missing_in_zh': [],
    'extra_in_zh': [],
    'zh_values_non_cjk': [],
    'samples': {}
}

for k in sorted(all_keys):
    in_vi = k in vi
    in_zh = k in zh
    if in_vi and not in_zh:
        report['missing_in_zh'].append(k)
    if in_zh and not in_vi:
        report['extra_in_zh'].append(k)
    if in_zh:
        val = zh.get(k,'')
        has_cjk = bool(cjk_re.search(val))
        has_latin = bool(latin_re.search(val))
        if not has_cjk:
            report['zh_values_non_cjk'].append({'key':k, 'value': val, 'has_latin': has_latin})

# add samples
report['samples']['non_cjk_first_30'] = report['zh_values_non_cjk'][:30]
report['samples']['missing_in_zh_first_30'] = report['missing_in_zh'][:30]
report['samples']['extra_in_zh_first_30'] = report['extra_in_zh'][:30]

report_path.write_text(json.dumps(report, ensure_ascii=False, indent=2), encoding='utf-8')
print('Wrote report to', report_path)
print('Summary:')
print(json.dumps(report['counts'], ensure_ascii=False, indent=2))
print('non-CJK values:', len(report['zh_values_non_cjk']))
print('missing in zh:', len(report['missing_in_zh']))
print('extra in zh:', len(report['extra_in_zh']))

# print a small textual sample
print('\nSample non-CJK (first 10):')
for item in report['zh_values_non_cjk'][:10]:
    print('-', item['key'], '->', item['value'][:80].replace('\n',' '))
