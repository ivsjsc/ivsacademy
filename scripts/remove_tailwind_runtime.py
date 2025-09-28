#!/usr/bin/env python3
"""
Scan all .html files under this workspace, back them up with .bak, and remove:
 - <script>...tailwind.config = { ... }</script>
 - <script src="/js/tailwind.config.js"></script>
 - any inline window.tailwind.config = { ... }

Print a summary of files changed.
"""
import re
from pathlib import Path

# site root is the parent of the scripts directory
root = Path(__file__).resolve().parent.parent
html_files = list(root.rglob('*.html'))

script_block_re = re.compile(r"<script[^>]*>.*?tailwind\.config\s*=\s*\{.*?\}.*?</script>", re.IGNORECASE | re.DOTALL)
src_tag_re = re.compile(r"<script[^>]*src=[\"']/js/tailwind\.config\.js[\"'][^>]*>\s*</script>", re.IGNORECASE)
window_config_re = re.compile(r"<script[^>]*>.*?window\.tailwind\.config\s*=\s*\{.*?\}.*?</script>", re.IGNORECASE | re.DOTALL)

changed = []
for f in html_files:
    text = f.read_text(encoding='utf-8')
    orig = text
    # Remove explicit src tag first
    text = src_tag_re.sub('', text)
    # Remove script blocks that set tailwind.config or window.tailwind.config
    text = script_block_re.sub('', text)
    text = window_config_re.sub('', text)
    # Additionally remove any stray single-line occurrences (defensive)
    text = re.sub(r"tailwind\.config\s*=\s*\{[^\}]*\};?", '', text, flags=re.IGNORECASE)
    text = re.sub(r"window\.tailwind\.config\s*=\s*\{[^\}]*\};?", '', text, flags=re.IGNORECASE)

    if text != orig:
        # centralized timestamped backup under .backups
        from datetime import datetime
        ts = datetime.utcnow().strftime('%Y%m%dT%H%M%SZ')
        backup_root = root / '.backups'
        backup_path = backup_root / f.with_suffix('').relative_to(root)
        backup_path = backup_path.with_suffix(f.name + f'.backup.{ts}.orig')
        backup_path.parent.mkdir(parents=True, exist_ok=True)
        backup_path.write_text(orig, encoding='utf-8')
        f.write_text(text, encoding='utf-8')
        changed.append(str(f.relative_to(root)))

print(f"Checked {len(html_files)} HTML files, modified {len(changed)} files:")
for c in changed:
    print(' -', c)

if not changed:
    print('No files needed changes.')
