#!/usr/bin/env python3
"""
Fix internal HTML links inside files under pages/ so they work from that subfolder.

Rules implemented:
- For href/src values that are relative page filenames (e.g. "contact.html", "about.html")
  and do NOT already start with "../", 
  prefix them with "../" so they point to the root-level pages.
- For paths that include a folder (e.g. "Pages/ivslifeminds.html" or "pages/ivslifeminds.html"),
  normalize to "../pages/<name>.html".
- Ignore absolute URLs (http://, https://, //) and already-correct ../ or root-absolute (/).

This is conservative: it only changes links that look like plain relative HTML filenames
or simple folder paths and leaves other references alone.
"""
import re
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
PAGES_DIR = ROOT / 'pages'

link_re = re.compile(r'(href|src)=("|\')(?!(?:https?:|//|/|\.\./))([^"\']+?)("|\')', re.IGNORECASE)

def fix_target(target: str) -> str:
    # If target already contains a slash, assume it's a folder path like Pages/foo.html
    if '/' in target:
        # Normalize leading "Pages/" (case-insensitive) to pages/
        parts = target.split('/')
        # If there are multiple path segments, preserve the tail and map to ../pages/<tail...>
        tail = '/'.join(parts[1:]) if parts[0].lower() == 'pages' else '/'.join(parts)
        return f"../pages/{tail}"
    else:
        # Bare filename like contact.html -> ../contact.html
        return f"../{target}"

def process_file(path: Path) -> bool:
    text = path.read_text(encoding='utf-8')
    changed = False

    def repl(m: re.Match) -> str:
        nonlocal changed
        attr, quote1, target, quote2 = m.group(1), m.group(2), m.group(3), m.group(4)
        new_target = fix_target(target)
        if new_target != target:
            changed = True
            return f'{attr}={quote1}{new_target}{quote2}'
        return m.group(0)

    new_text = link_re.sub(repl, text)
    if changed:
        path.write_text(new_text, encoding='utf-8')
    return changed

def main():
    html_files = sorted(PAGES_DIR.glob('*.html'))
    print(f'Found {len(html_files)} HTML files in {PAGES_DIR}')
    modified = []
    for f in html_files:
        try:
            if process_file(f):
                modified.append(str(f.relative_to(ROOT)))
        except Exception as e:
            print(f'Error processing {f}: {e}')

    print('\nModified files:')
    for m in modified:
        print('  ', m)

if __name__ == '__main__':
    main()
