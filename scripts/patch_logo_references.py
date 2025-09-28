#!/usr/bin/env python3
"""
Safely replace occurrences of 'logo-192.png' with 'logo-192.jpg' in .html files
within the ivs.github.io repo. Skips files inside scripts/seo_backups and
files ending with .backup. Creates a .bak backup for each changed file.

Usage: python scripts/patch_logo_references.py
"""
import sys
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
SKIP_PART = 'scripts/seo_backups'

def main():
    changed = []
    for p in ROOT.rglob('*.html'):
        sp = str(p)
        if SKIP_PART in sp or sp.endswith('.backup'):
            continue
        try:
            text = p.read_text(encoding='utf-8')
        except Exception:
            # skip binary or unreadable
            continue
        if 'logo-192.png' in text:
            new_text = text.replace('logo-192.png', 'logo-192.jpg')
            if new_text != text:
                bak = p.with_suffix(p.suffix + '.bak')
                bak.write_text(text, encoding='utf-8')
                p.write_text(new_text, encoding='utf-8')
                changed.append(str(p.relative_to(ROOT)))
    if changed:
        print('Updated files:')
        for c in changed:
            print(' -', c)
        print('\nTotal files changed:', len(changed))
        sys.exit(0)
    else:
        print('No files needed updating')
        sys.exit(0)

if __name__ == '__main__':
    main()
