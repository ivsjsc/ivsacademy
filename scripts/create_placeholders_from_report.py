#!/usr/bin/env python3
"""
Create placeholder files for local assets that were reported missing in
reports/asset-check-latest.json. This helps clear 404 noise during local
testing. Placeholders are minimal text/SVG files (served with correct
path/extension) so requests return 200.

Usage: python scripts/create_placeholders_from_report.py
"""
import json
from pathlib import Path
from typing import Set

ROOT = Path(__file__).resolve().parents[1]
REPORT = ROOT / 'reports' / 'asset-check-latest.json'

IMAGE_EXTS = ('.png', '.jpg', '.jpeg', '.webp', '.gif', '.ico')
VIDEO_EXTS = ('.mp4', '.webm', '.ogg')
JS_EXTS = ('.js',)
CSS_EXTS = ('.css',)

def ensure_parent(p: Path):
    p.parent.mkdir(parents=True, exist_ok=True)

def write_placeholder(path: Path):
    ext = path.suffix.lower()
    if ext in IMAGE_EXTS:
        # simple SVG text saved under any image extension — server will return 200
        svg = f'<svg xmlns="http://www.w3.org/2000/svg" width="200" height="120"><rect width="100%" height="100%" fill="#ddd"/><text x="50%" y="50%" dominant-baseline="middle" text-anchor="middle" fill="#666" font-family="Arial" font-size="14">Placeholder</text></svg>'
        path.write_text(svg, encoding='utf-8')
    elif ext in VIDEO_EXTS:
        # small text placeholder
        path.write_text('placeholder video file (not a real video)\n', encoding='utf-8')
    elif ext in JS_EXTS:
        path.write_text('// placeholder js\nconsole.warn("placeholder: '+str(path.name)+'");\n', encoding='utf-8')
    elif ext in CSS_EXTS:
        path.write_text('/* placeholder css */\n', encoding='utf-8')
    else:
        # generic placeholder
        path.write_text('placeholder\n', encoding='utf-8')

def main():
    if not REPORT.exists():
        print('Report not found:', REPORT)
        return
    data = json.loads(REPORT.read_text(encoding='utf-8'))
    base = data.get('base', 'http://127.0.0.1:8000')
    created: Set[Path] = set()
    for page, info in data.get('results', {}).items():
        for asset in info.get('assets', []):
            status = asset.get('status')
            url = asset.get('url')
            ref = asset.get('ref')
            if not url or status == 200:
                continue
            if not url.startswith(base):
                # skip external
                continue
            # convert url -> repo relative path
            rel = url[len(base):].lstrip('/')
            target = ROOT / rel
            if target.exists():
                continue
            ensure_parent(target)
            write_placeholder(target)
            created.add(target.relative_to(ROOT))
    if created:
        print('Created placeholders for', len(created), 'files:')
        for c in sorted(created):
            print(' -', c)
    else:
        print('No placeholders created (no missing local assets found or all exist)')

if __name__ == '__main__':
    main()
