#!/usr/bin/env python3
from pathlib import Path
import re

root = Path(__file__).resolve().parent.parent
html_files = list(root.glob('*.html'))
# also look into some top-level dirs that may contain html
for d in ['components','apps','templates']:
    p = root / d
    if p.exists():
        html_files += list(p.rglob('*.html'))

print(f'Found {len(html_files)} HTML files to scan (root+components/apps/templates)')
changed=[]
for f in html_files:
    # Skip pages folder
    try:
        rel = f.relative_to(root)
    except Exception:
        rel = f
    if str(rel).startswith('pages'):
        continue
    text = f.read_text(encoding='utf-8')
    orig = text
    # Common wrong patterns from pages -> root should remove ../ prefix
    text = re.sub(r"\.\./css/", 'css/', text)
    text = re.sub(r"\.\./js/", 'js/', text)
    text = re.sub(r"\.\./components/", 'components/', text)
    text = re.sub(r"\.\./lang/", 'lang/', text)
    text = re.sub(r"\.\./images/", 'images/', text)
    text = re.sub(r"\.\./favicon.ico", 'favicon.ico', text)
    if text != orig:
        f.write_text(text, encoding='utf-8')
        changed.append(str(rel))

print('Modified', len(changed), 'files:')
for c in changed:
    print(' -', c)
