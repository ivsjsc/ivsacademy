#!/usr/bin/env python3
import json
import os
from pathlib import Path
from bs4 import BeautifulSoup

ROOT = Path(__file__).resolve().parents[1]

vi_file = ROOT / 'lang' / 'vi.json'

with open(vi_file, 'r', encoding='utf-8') as f:
    vi_data = json.load(f)

html_glob = '**/*.html'
added = 0

for p in ROOT.glob(html_glob):
    try:
        with open(p, 'r', encoding='utf-8') as f:
            soup = BeautifulSoup(f, 'html.parser')
        for elem in soup.find_all(attrs={'data-lang-key': True}):
            key = elem.get('data-lang-key')
            if key and key not in vi_data:
                text = elem.get_text(strip=True)
                if text:
                    vi_data[key] = text
                    added += 1
                    print(f"Added {key}: {text}")
    except Exception as e:
        print(f"Error processing {p}: {e}")

with open(vi_file, 'w', encoding='utf-8') as f:
    json.dump(vi_data, f, ensure_ascii=False, indent=2)

print(f"Added {added} keys to vi.json")