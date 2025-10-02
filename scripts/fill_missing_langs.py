#!/usr/bin/env python3
"""
Fill missing entries in lang/en.json, lang/vi.json, lang/zh.json by extracting
visible text for each data-lang-key. Uses fallback policy 1:
  - When a language value is missing, copy English text (if present) and prefix
    with "TODO-TRANSLATE: " so translators can spot it.
Backups of JSON files are created.
Writes a report to scripts/fill_missing_report.txt
"""
import re
import json
from pathlib import Path
import html
from datetime import datetime

ROOT = Path(__file__).resolve().parents[1]
LANG_DIR = ROOT / 'lang'
LANG_FILES = {
    'en': LANG_DIR / 'en.json',
    'vi': LANG_DIR / 'vi.json',
    'zh': LANG_DIR / 'zh.json',
}

TAG_RE = re.compile(r'(<[^>]*\bdata-lang-key\s*=\s*"([^"]+)"[^>]*>)(.*?)</[^>]+>', re.DOTALL | re.IGNORECASE)
SELF_RE = re.compile(r'<[^>]*\bdata-lang-key\s*=\s*"([^"]+)"[^>]*>', re.IGNORECASE)
ATTR_VALUE_RE = re.compile(r'\b(?:alt|title|placeholder|value)\s*=\s*"([^"]+)"', re.IGNORECASE)
TEXT_TAG_RE = re.compile(r'<[^>]+>')
VI_RE = re.compile(r'[\u00C0-\u017F]|đ|Đ')


def strip_tags(s: str) -> str:
    s2 = TEXT_TAG_RE.sub('', s)
    return html.unescape(s2).strip()


def detect_lang(sample: str) -> str:
    if not sample:
        return 'en'
    if re.search(r'[\u4e00-\u9fff]', sample):
        return 'zh'
    if re.search(VI_RE, sample):
        return 'vi'
    lower = sample.lower()
    english_signals = ['the ', 'and ', 'of ', 'contact', 'learn', 'academy', 'education']
    if any(t in lower for t in english_signals):
        return 'en'
    return 'en'

# gather extracted texts per key per language
extracted = {}  # key -> {lang: text}
scanned = 0
for p in ROOT.rglob('*'):
    if p.is_dir():
        continue
    if p.suffix.lower() not in {'.html','.htm','.md','.njk','.js','.jsx','.json'}:
        continue
    try:
        txt = p.read_text(encoding='utf-8')
    except Exception:
        try:
            txt = p.read_text(encoding='latin-1')
        except Exception:
            continue
    scanned += 1
    for m in TAG_RE.finditer(txt):
        opening = m.group(1)
        key = m.group(2).strip()
        inner = m.group(3)
        text = strip_tags(inner)
        if not text:
            av = ATTR_VALUE_RE.search(opening)
            if av:
                text = av.group(1).strip()
        if not text:
            continue
        lang = detect_lang(text)
        extracted.setdefault(key, {})
        # prefer earlier detections only if not present for that lang
        if lang not in extracted[key]:
            extracted[key][lang] = text
    # self-closing tags
    for m in SELF_RE.finditer(txt):
        key = m.group(1).strip()
        opening = m.group(0)
        av = ATTR_VALUE_RE.search(opening)
        if av:
            text = av.group(1).strip()
            lang = detect_lang(text)
            extracted.setdefault(key, {})
            if lang not in extracted[key]:
                extracted[key][lang] = text

# load current JSONs
lang_data = {}
for code, path in LANG_FILES.items():
    if path.exists():
        try:
            lang_data[code] = json.loads(path.read_text(encoding='utf-8'))
        except Exception:
            lang_data[code] = {}
    else:
        lang_data[code] = {}

# backup
now = datetime.utcnow().strftime('%Y%m%d%H%M%S')
backups = {}
for code, path in LANG_FILES.items():
    if path.exists():
        bak = path.with_suffix(path.suffix + f'.bak.fill.{now}')
        bak.write_bytes(path.read_bytes())
        backups[code] = str(bak)

report_lines = [f'Fill missing langs run: {now}', f'scanned ~{scanned} files', f'backups: {backups}', '']
filled_counts = { 'en':0, 'vi':0, 'zh':0 }

all_keys = set()
# include keys found from extraction and existing keys in the JSONs
for d in lang_data.values():
    all_keys.update(d.keys())
all_keys.update(extracted.keys())

for key in sorted(all_keys):
    # ensure entries exist for en, vi, zh
    for code in ['en','vi','zh']:
        cur = lang_data.get(code, {}).get(key, '')
        if cur and str(cur).strip():
            continue
        # if extracted text for this language exists, use it
        src_text = None
        if key in extracted and code in extracted[key]:
            src_text = extracted[key][code]
            lang_data[code][key] = src_text
            filled_counts[code] += 1
            report_lines.append(f'Filled {code}: {key} <= {src_text!r}  (source detected {code})')
            continue
        # else prefer english extracted text
        en_text = None
        if key in extracted and 'en' in extracted[key]:
            en_text = extracted[key]['en']
        # else prefer vietnamese extracted text
        vi_text = None
        if key in extracted and 'vi' in extracted[key]:
            vi_text = extracted[key]['vi']
        # choose fallback policy 1: prefix TODO-TRANSLATE: when copying from another language
        chosen = None
        chosen_src = None
        if code == 'en':
            if vi_text:
                chosen = vi_text
                chosen_src = 'vi'
            elif en_text:
                chosen = en_text
                chosen_src = 'en'
        elif code == 'vi':
            if en_text:
                chosen = en_text
                chosen_src = 'en'
            elif vi_text:
                chosen = vi_text
                chosen_src = 'vi'
        elif code == 'zh':
            if en_text:
                chosen = 'TODO-TRANSLATE: ' + en_text
                chosen_src = 'en'
            elif vi_text:
                chosen = 'TODO-TRANSLATE: ' + vi_text
                chosen_src = 'vi'
        if chosen is not None:
            # only fill if non-empty
            if str(chosen).strip():
                lang_data[code][key] = chosen
                filled_counts[code] += 1
                report_lines.append(f'Filled {code}: {key} <= {chosen!r}  (from {chosen_src}, prefixed as TODO if zh)')

# write back JSONs sorted
for code, path in LANG_FILES.items():
    obj = {k: lang_data[code][k] for k in sorted(lang_data[code].keys())}
    path.write_text(json.dumps(obj, ensure_ascii=False, indent=2) + '\n', encoding='utf-8')

report_lines.append('')
report_lines.append(f'Summary filled: {filled_counts}')
report = ROOT / 'scripts' / 'fill_missing_report.txt'
report.write_text('\n'.join(report_lines), encoding='utf-8')
print('Done. Wrote report to', report)
print('Summary:', filled_counts)
