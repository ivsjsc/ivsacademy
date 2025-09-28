#!/usr/bin/env python3
"""Comprehensive asset checker for this static site.
Scans all top-level HTML files and all files under `pages/` and requests each referenced asset.
Writes a brief report to reports/asset-check-latest.txt and prints a summary of failing assets.
"""
from pathlib import Path
import re
import requests
from urllib.parse import urljoin
import json
import datetime

BASE = 'http://127.0.0.1:8000'
ROOT = Path(__file__).resolve().parents[1]
PAGES_DIR = ROOT / 'pages'
REPORTS_DIR = ROOT / 'reports'
REPORTS_DIR.mkdir(exist_ok=True)

# find all html files to scan: root-level *.html and pages/*.html
html_files = []
for p in sorted(ROOT.glob('*.html')):
    html_files.append(p.relative_to(ROOT).as_posix())
for p in sorted(PAGES_DIR.glob('*.html')):
    html_files.append(p.relative_to(ROOT).as_posix())

# pattern to extract src/href values
attr_re = re.compile(r'(?:src|href)=(?:(?:"|)|(?:\'))([^"\']+)(?:"|\')', re.I)

# ignore schemes
IGNORED_SCHEMES = ('mailto:', 'tel:', 'data:', 'javascript:')

# file extensions we will always check
CHECK_EXTS = ('.css', '.js', '.json', '.html', '.ico', '.png', '.jpg', '.jpeg', '.gif', '.svg', '.mp4', '.webm', '.webp')

results = {}

session = requests.Session()
session.headers.update({'User-Agent': 'ivs-site-checker/1.0'})

for page in html_files:
    url = f"{BASE}/{page}"
    print('\n---')
    print('Checking page:', page, '->', url)
    try:
        r = session.get(url, timeout=6)
        print('  Page status:', r.status_code)
        text = r.text
    except Exception as e:
        print('  Failed to fetch page:', e)
        results[page] = {'page_status': None, 'error': str(e)}
        continue

    found = []
    for m in attr_re.finditer(text):
        src = m.group(1).strip()
        if not src:
            continue
        low = src.lower()
        if low.startswith(IGNORED_SCHEMES):
            continue
        # skip anchors
        if src.startswith('#'):
            continue
        found.append(src)

    # de-duplicate while preserving order
    assets = []
    for s in found:
        if s in assets:
            continue
        # decide if we care about this asset
        if s.startswith('http://') or s.startswith('https://') or any(s.endswith(ext) for ext in CHECK_EXTS) or s.startswith('components') or s.startswith('/components') or s.startswith('lang') or 'favicon' in s or s.endswith('.mp3'):
            assets.append(s)

    print(f'  Found {len(assets)} assets to check')
    asset_status = []
    for a in assets:
        # normalize to absolute URL
        if a.startswith('http://') or a.startswith('https://'):
            full = a
        elif a.startswith('//'):
            full = 'http:' + a
        elif a.startswith('/'):
            full = BASE + a
        else:
            # relative to page
            page_dir = page.rpartition('/')[0]
            full = urljoin(f"{BASE}/{page_dir}/", a)
        try:
            rr = session.get(full, timeout=6)
            status = rr.status_code
        except Exception as e:
            status = str(e)
        asset_status.append({'ref': a, 'url': full, 'status': status})
        print('   ', a, '->', status)

    results[page] = {'page_status': r.status_code, 'assets': asset_status}

# Summarize and write report
now = datetime.datetime.utcnow().isoformat() + 'Z'
report = {'generated': now, 'base': BASE, 'results': results}
outf = REPORTS_DIR / 'asset-check-latest.json'
outf.write_text(json.dumps(report, indent=2), encoding='utf-8')

# Print concise failing list
print('\n\nFAILURES SUMMARY:')
fail_count = 0
for p,info in results.items():
    fails = [a for a in info.get('assets',[]) if a.get('status') != 200]
    if fails:
        print('\nPage:', p, 'page_status:', info.get('page_status'))
        for a in fails:
            print(' ', a['status'], a['ref'], '->', a['url'])
            fail_count += 1

print('\nTotal failing asset references:', fail_count)
if fail_count == 0:
    print('All assets returned 200.')
else:
    print('See', outf)

# Exit code like behaviour: print final status
if fail_count:
    raise SystemExit(2)
else:
    raise SystemExit(0)
