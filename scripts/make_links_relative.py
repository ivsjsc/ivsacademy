#!/usr/bin/env python3
"""
Convert internal absolute paths that start with a leading slash to relative paths across all HTML files.
Rules:
 - Only change attributes href/src/manifest/ poster that start with a single leading slash and are not external URLs.
 - Skip URLs that start with: //, http:, https:, data:, mailto:, tel:, javascript:
 - Backup each file to .bak before writing.

This addresses broken asset links like /css/style.css when the site is served from a subpath or opened locally.
"""
import re
from pathlib import Path

root = Path(__file__).resolve().parent.parent
html_files = list(root.rglob('*.html'))

# Pattern: capture attribute (href|src|poster|manifest) then = then quote then / then path not starting with http, //, data:, mailto:, tel:, javascript:
attr_re = re.compile(r'(?P<attr>\b(?:href|src|poster|manifest)\b)=(?P<quote>["\'])\/(?P<path>[^"\'>\s]+)\b', re.IGNORECASE)

def should_skip(path):
    low = path.lower()
    return low.startswith('//') or low.startswith('http:') or low.startswith('https:') or low.startswith('data:') or low.startswith('mailto:') or low.startswith('tel:') or low.startswith('javascript:')

modified = []
for f in html_files:
    txt = f.read_text(encoding='utf-8')
    orig = txt

    def repl(m):
        attr = m.group('attr')
        quote = m.group('quote')
        path = m.group('path')
        # don't change if path starts with a protocol or double slash
        if should_skip(path):
            return m.group(0)
        # Safety: if path begins with a single-letter drive or absolute Windows path, skip
        if re.match(r'[A-Za-z]:', path):
            return m.group(0)
        # Replace with relative (drop leading slash)
        return f"{attr}={quote}{path}"

    txt = attr_re.sub(repl, txt)

    if txt != orig:
        bak = f.with_suffix(f.suffix + '.bak')
        bak.write_text(orig, encoding='utf-8')
        f.write_text(txt, encoding='utf-8')
        modified.append(str(f.relative_to(root)))

print(f"Scanned {len(html_files)} HTML files, modified {len(modified)} files")
for m in modified:
    print(' -', m)
