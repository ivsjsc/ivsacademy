#!/usr/bin/env python3
"""Normalize image path references inside pages/*.html

Replacements:
 - ../pages/images/  -> ../images/pages/
 - ../pages/images/logo/ -> ../images/logo/
 - ../pages/images/favicon.ico -> ../images/favicon.ico

This script writes changes in-place and prints files modified.
"""
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
PAGES = ROOT / 'pages'

replacements = [
    ('../pages/images/logo/', '../images/logo/'),
    ('../pages/images/favicon.ico', '../images/favicon.ico'),
    ('../pages/images/', '../images/pages/'),
]

modified = []
for f in sorted(PAGES.glob('*.html')):
    txt = f.read_text(encoding='utf-8')
    new = txt
    for a,b in replacements:
        new = new.replace(a,b)
    if new != txt:
        f.write_text(new, encoding='utf-8')
        modified.append(str(f.relative_to(ROOT)))

print('Modified files:')
for m in modified:
    print(' ', m)
