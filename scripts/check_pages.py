#!/usr/bin/env python3
import urllib.request
import urllib.error
from urllib.parse import urljoin

base = 'http://localhost:8000'
pages = [
    '/index.html',
    '/contact.html',
    '/gallery.html',
    '/pages/webdesign.html',
    '/pages/bang-gia-tham-khao-gvnn-ivs.html',
    '/layout.html'
]

for p in pages:
    url = urljoin(base, p)
    try:
        with urllib.request.urlopen(url, timeout=5) as resp:
            code = resp.getcode()
            b = resp.read()
            try:
                txt = b.decode('utf-8')
            except:
                txt = b.decode('latin-1', errors='replace')
            found = []
            if 'tailwind.config' in txt:
                found.append('tailwind.config')
            if '/js/tailwind.config.js' in txt:
                found.append('/js/tailwind.config.js')
            print(f"{p}: {code}, found: {', '.join(found) if found else 'none'}")
    except urllib.error.HTTPError as he:
        print(f"{p}: HTTPError {he.code}")
    except Exception as e:
        print(f"{p}: ERROR {e}")
