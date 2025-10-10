#!/usr/bin/env python3
import json
from deep_translator import GoogleTranslator
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]

vi_file = ROOT / 'lang' / 'vi.json'
en_file = ROOT / 'lang' / 'en.json'
zh_file = ROOT / 'lang' / 'zh.json'

with open(vi_file, 'r', encoding='utf-8') as f:
    vi_data = json.load(f)

with open(en_file, 'r', encoding='utf-8') as f:
    en_data = json.load(f)

with open(zh_file, 'r', encoding='utf-8') as f:
    zh_data = json.load(f)

translator_en = GoogleTranslator(source='vi', target='en')
translator_zh = GoogleTranslator(source='vi', target='zh-CN')

for key, value in vi_data.items():
    if key in en_data and en_data[key].startswith('TODO: translate (en):'):
        try:
            translated = translator_en.translate(value)
            en_data[key] = translated
            print(f"Translated en: {key}")
        except Exception as e:
            print(f"Failed en: {key} - {e}")
    if key in zh_data and zh_data[key].startswith('TODO: translate (zh):'):
        try:
            translated = translator_zh.translate(value)
            zh_data[key] = translated
            print(f"Translated zh: {key}")
        except Exception as e:
            print(f"Failed zh: {key} - {e}")

with open(en_file, 'w', encoding='utf-8') as f:
    json.dump(en_data, f, ensure_ascii=False, indent=2)

with open(zh_file, 'w', encoding='utf-8') as f:
    json.dump(zh_data, f, ensure_ascii=False, indent=2)

print("Translation completed.")