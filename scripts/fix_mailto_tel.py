#!/usr/bin/env python3
"""
Remove accidental ../ prefix before mailto: and tel: in pages/*.html files.
"""
from pathlib import Path
import re

ROOT = Path(__file__).resolve().parents[1]
PAGES = ROOT / 'pages'

pattern = re.compile(r"\.{2}/(mailto:|tel:)", re.IGNORECASE)

def process(path: Path):
    text = path.read_text(encoding='utf-8')
    new_text, n = pattern.subn(lambda m: m.group(1), text)
    if n:
        path.write_text(new_text, encoding='utf-8')
        return True, n
    return False, 0

def main():
    modified = []
    for f in sorted(PAGES.glob('*.html')):
        try:
            ok, n = process(f)
            if ok:
                modified.append((str(f.relative_to(ROOT)), n))
        except Exception as e:
            print('Error', f, e)

    if modified:
        print('Fixed mailto/tel in:')
        for fn, n in modified:
            print(' ', fn, 'replacements:', n)
    else:
        print('No mailto/tel patterns found to fix.')

if __name__ == '__main__':
    main()
