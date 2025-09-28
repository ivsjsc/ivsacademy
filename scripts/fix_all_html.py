#!/usr/bin/env python3
"""
Ensure every HTML file in the site:
 - does NOT contain inline tailwind runtime (tailwind.config or window.tailwind.config)
 - does NOT include a <script src="/js/tailwind.config.js"> tag
 - DOES include a link to the compiled /css/tailwind.css in the <head>

Backs up files to .bak when modifying.
Prints a list of modified files.
"""
import re
from pathlib import Path

root = Path(__file__).resolve().parent.parent
html_files = list(root.rglob('*.html'))

script_block_re = re.compile(r"<script[^>]*>.*?tailwind\.config\s*=\s*\{.*?\}.*?</script>", re.IGNORECASE | re.DOTALL)
src_tag_re = re.compile(r"<script[^>]*src=[\"']/js/tailwind\.config\.js[\"'][^>]*>\s*</script>", re.IGNORECASE)
window_config_re = re.compile(r"<script[^>]*>.*?window\.tailwind\.config\s*=\s*\{.*?\}.*?</script>", re.IGNORECASE | re.DOTALL)

link_tag = '<link rel="stylesheet" href="/css/tailwind.css">'

modified = []
for f in html_files:
    txt = f.read_text(encoding='utf-8')
    orig = txt
    # Remove runtime script occurrences
    txt = src_tag_re.sub('', txt)
    txt = script_block_re.sub('', txt)
    txt = window_config_re.sub('', txt)
    # Also defensively remove any stray assignment lines
    txt = re.sub(r"(?:window\.)?tailwind\.config\s*=\s*\{[^\}]*\};?", '', txt, flags=re.IGNORECASE)

    # Ensure tailwind link exists in head (absolute path)
    if '/css/tailwind.css' not in txt:
        # Insert link before first existing stylesheet link or before </head>
        insert_pos = None
        # try to find first <link rel="stylesheet"
        m = re.search(r"<link[^>]+rel=[\"']stylesheet[\"'][^>]*>", txt, re.IGNORECASE)
        if m:
            insert_pos = m.start()
        else:
            m2 = re.search(r"</head>", txt, re.IGNORECASE)
            insert_pos = m2.start() if m2 else None
        if insert_pos is not None:
            # put it on its own line
            txt = txt[:insert_pos] + link_tag + '\n' + txt[insert_pos:]
        else:
            # fallback: append at start
            txt = link_tag + '\n' + txt

    if txt != orig:
        bak = f.with_suffix(f.suffix + '.bak')
        bak.write_text(orig, encoding='utf-8')
        f.write_text(txt, encoding='utf-8')
        modified.append(str(f.relative_to(root)))

print(f"Checked {len(html_files)} HTML files, modified {len(modified)} files:")
for m in modified:
    print(' -', m)

if not modified:
    print('No changes necessary.')
