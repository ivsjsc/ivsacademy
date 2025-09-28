#!/usr/bin/env python3
"""
Simple local HTML link checker.
Scans all .html files in the repository for href/src attributes and checks existence of local files.
Writes report to reports/link-check-YYYYMMDD.txt
"""
import os
import re
from urllib.parse import urlparse
from datetime import datetime

ROOT = os.path.abspath(os.path.join(os.path.dirname(__file__), '..'))
REPORTS_DIR = os.path.join(ROOT, 'reports')
if not os.path.isdir(REPORTS_DIR):
    os.makedirs(REPORTS_DIR)

pattern = re.compile(r"(?:href|src)=[\"']([^\"'#]+)[\"']", re.IGNORECASE)

results = []
files_checked = 0
for dirpath, dirnames, filenames in os.walk(ROOT):
    for fn in filenames:
        if not fn.lower().endswith('.html'):
            continue
        fp = os.path.join(dirpath, fn)
        files_checked += 1
        rel_dir = os.path.relpath(dirpath, ROOT)
        with open(fp, 'r', encoding='utf-8', errors='ignore') as f:
            text = f.read()
        for m in pattern.finditer(text):
            link = m.group(1).strip()
            # skip absolute http(s) URLs and mailto/tel and anchors
            p = urlparse(link)
            if p.scheme in ('http', 'https', 'mailto', 'tel'):
                continue
            # skip data URLs
            if link.startswith('data:'):
                continue
            # normalize
            target = os.path.normpath(os.path.join(dirpath, link))
            exists = os.path.exists(target)
            results.append((os.path.relpath(fp, ROOT), link, os.path.relpath(target, ROOT), exists))

now = datetime.utcnow().strftime('%Y%m%d')
report_path = os.path.join(REPORTS_DIR, f'link-check-{now}.txt')
with open(report_path, 'w', encoding='utf-8') as out:
    out.write(f'Link check report for repository root: {ROOT}\n')
    out.write(f'Files scanned: {files_checked}\n')
    out.write('\n')
    for src, link, target, exists in results:
        out.write(f'{src} -> {link} -> {target} -> {"OK" if exists else "MISSING"}\n')

print('Report written to', report_path)
