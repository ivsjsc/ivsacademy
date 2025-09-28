#!/usr/bin/env python3
import re
from pathlib import Path

pages_dir = Path(__file__).resolve().parent.parent / 'pages'
if not pages_dir.exists():
    print('Pages folder not found:', pages_dir)
    raise SystemExit(1)

html_files = list(pages_dir.glob('*.html'))
print(f'Found {len(html_files)} HTML files in', pages_dir)

changed = []

for f in html_files:
    text = f.read_text(encoding='utf-8')
    orig = text

    # Replace href="css/..." but avoid already ../css/
    text = re.sub(r'href=(\"|\')css/', r'href=\1../css/', text)
    # Replace href="../..../css/" double protections not necessary

    # Replace src="js/..."
    text = re.sub(r'src=(\"|\')js/', r'src=\1../js/', text)

    # Also handle link as="style" href=... patterns
    text = re.sub(r'href=(\"|\')\.\./\.\./css/', r'href=\1../css/', text)

    if text != orig:
        f.write_text(text, encoding='utf-8')
        changed.append(str(f.relative_to(pages_dir.parent)))

print('Modified files:', len(changed))
for c in changed:
    print(' -', c)
