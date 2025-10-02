#!/usr/bin/env python3
"""
Extract text for data-lang-key attributes from HTML/MD/templated files,
detect source language heuristically (vi/en/zh), and update lang JSON files
for keys where the current translation appears missing or placeholder-like.

Creates backups of the three lang files and writes a report to
scripts/extracted_lang_report.txt
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

# regex to find opening tag with data-lang-key and its inner html up to matching close tag
TAG_RE = re.compile(r'(<[^>]*\bdata-lang-key\s*=\s*"([^"]+)"[^>]*>)(.*?)</[^>]+>', re.DOTALL | re.IGNORECASE)
# for self-closing tags or tags without inner text (img, input), capture alt/title/placeholder/value
ATTR_VALUE_RE = re.compile(r'\b(?:alt|title|placeholder|value)\s*=\s*"([^"]+)"', re.IGNORECASE)

# Detect CJK
# Vietnamese accented chars set heuristic
VI_RE = re.compile(r'[\u00C0-\u017F]|đ|Đ')
VI_RE = re.compile(r'[\u00C0-\u017F]|đ|Đ')
VI_RE = re.compile(r'[\u00C0-\u017F]|đ|Đ')

TEXT_TAG_RE = re.compile(r'<[^>]+>')

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
    # fallback: if many ASCII letters and common english words
    lower = sample.lower()
    english_signals = ['the ', 'and ', 'of ', 'iv', 'contact', 'learn', 'academy', 'education']
    score = sum(1 for t in english_signals if t in lower)
    if score >= 1:
        return 'en'
    return 'en'


# placeholder-like detection (decide whether to overwrite existing translation)
PLACEHOLDER_RE = re.compile(r'^(?:""|\s*$|ai guide|desc|title|ct[ao]|placeholder|revised|example|demo|app_|app |app[ _]|btn_|btn |bio_|Bscn|BSCN|App |New Application|Coming Soon|App all|App all cta)', re.IGNORECASE)

extracted = {}  # key -> list of (lang, text, srcfile)
scanned_files = 0
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
    scanned_files += 1
    for m in TAG_RE.finditer(txt):
        opening = m.group(1)
        key = m.group(2).strip()
        inner = m.group(3)
        text = strip_tags(inner)
        if not text:
            # try to find alt/title in opening tag
            av = ATTR_VALUE_RE.search(opening)
            if av:
                text = av.group(1).strip()
        if not text:
            # try to look ahead for next text node (simple heuristic)
            continue
        lang = detect_lang(text)
        extracted.setdefault(key, []).append((lang, text, str(p)))

# Also catch data-lang-key appearing on self-closing tags without closing tag,
# like <img data-lang-key="foo" alt="text" /> - handle with a simpler regex
SELF_RE = re.compile(r'<[^>]*\bdata-lang-key\s*=\s*"([^"]+)"[^>]*>', re.IGNORECASE)
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
    for m in SELF_RE.finditer(txt):
        key = m.group(1).strip()
        opening = m.group(0)
        av = ATTR_VALUE_RE.search(opening)
        if av:
            text = av.group(1).strip()
            lang = detect_lang(text)
            extracted.setdefault(key, []).append((lang, text, str(p)))

# summarize and update language files
report_lines = []
now = datetime.utcnow().strftime('%Y%m%d%H%M%S')
backup_paths = {}
for code, path in LANG_FILES.items():
    if path.exists():
        bak = path.with_suffix(path.suffix + f'.bak.{now}')
        bak.write_bytes(path.read_bytes())
        backup_paths[code] = str(bak)

changes = { 'en':0, 'vi':0, 'zh':0 }
for key, occurrences in extracted.items():
    # pick the best occurrence per language: prefer first
    # We'll apply occurrences to their detected language entry
    for lang, text, src in occurrences:
        lf = LANG_FILES.get(lang)
        if not lf or not lf.exists():
            continue
        try:
            data = json.loads(lf.read_text(encoding='utf-8'))
        except Exception:
            data = {}
        cur = data.get(key, '')
        should_replace = False
        if not cur or PLACEHOLDER_RE.search(cur):
            should_replace = True
        if should_replace and text and text != cur:
            data[key] = text
            # write back sorted
            newobj = {k: data[k] for k in sorted(data.keys())}
            lf.write_text(json.dumps(newobj, ensure_ascii=False, indent=2) + '\n', encoding='utf-8')
            changes[lang] += 1
            report_lines.append(f"Updated {lf.name}: {key} <= {text!r}  (source: {src})")

# write report
report = ROOT / 'scripts' / 'extracted_lang_report.txt'
report.write_text('\n'.join([
    f"Extracted translations from ~{scanned_files} files",
    f"Backups: {backup_paths}",
    "",
] + report_lines + ["", f"Summary: {changes}"]), encoding='utf-8')

print('Done. Wrote report to', report)
print('Summary:', changes)
