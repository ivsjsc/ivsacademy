#!/usr/bin/env python3
import re
import requests
from urllib.parse import urljoin, urlparse
from pathlib import Path

#!/usr/bin/env python3
import re
import requests
from urllib.parse import urljoin

BASE = 'http://127.0.0.1:8000'
PAGES = ['pages/careervn.html','pages/ivs-academy.html']

attr_re = re.compile(r'(?:src|href)=(?:"|\')([^"\']+)(?:"|\')', re.I)

results = {}

for page in PAGES:
    url = f"{BASE}/{page}"
    print('\n---')
    print('Checking page:', page, '->', url)
    try:
        r = requests.get(url, timeout=5)
        print('  Page status:', r.status_code)
        text = r.text
    except Exception as e:
        print('  Failed to fetch page:', e)
        results[page] = {'page_status': None, 'error': str(e)}
        continue

    found = []
    for m in attr_re.finditer(text):
        src = m.group(1).strip()
        # ignore mailto:, tel:, data:, javascript:
        if src.startswith('mailto:') or src.startswith('tel:') or src.startswith('data:') or src.startswith('javascript:'):
            continue
        found.append(src)

    # De-duplicate and filter typical assets we care about
    assets = []
    for s in found:
        if s in assets:
            continue
        # focus on CSS/JS/components/lang/favicon or files under css/js/components/lang/images
        if any(s.endswith(ext) for ext in ['.css','.js','.json','.html','.ico']) or s.startswith('../') or s.startswith('/components') or s.startswith('components') or s.startswith('lang') or 'favicon' in s:
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
            # if starts with ../ -> resolve from page directory
            page_dir = page.rpartition('/')[0]
            full = urljoin(f"{BASE}/{page_dir}/", a)
        try:
            rr = requests.get(full, timeout=5)
            status = rr.status_code
        except Exception as e:
            status = str(e)
        asset_status.append((a, full, status))
        print('   ', a, '->', status)

    results[page] = {'page_status': r.status_code, 'assets': asset_status}

# Summary
print('\nSUMMARY:')
for p,info in results.items():
    print('\nPage:', p, 'status:', info.get('page_status'))
    for a,full,status in info.get('assets',[]):
        print('  ', status, a)

# Exit code behaviour
bad = False
for info in results.values():
    for _,_,status in info.get('assets',[]):
        if status != 200:
            bad = True
if bad:
    print('\nSome assets failed (non-200).')
else:
    print('\nAll assets returned 200.')
