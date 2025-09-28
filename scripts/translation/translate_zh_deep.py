#!/usr/bin/env python3
"""
translate_zh_deep.py

Translate missing keys using deep-translator providers (MyMemory or LibreTranslate).
This is a free / low-cost alternative to paid services. Quality varies and you must
review translations before applying to production.

Usage (PowerShell):
  py -3 .\translate_zh_deep.py --source ../../lang/en.json --target ../../lang/zh.json --output ../../lang/candidates/zh.translated_deep.json --provider mymemory --limit 10

Notes:
- Requires `deep-translator` (already in requirements.txt).
- LibreTranslate: you can point to a public instance or self-host via Docker (recommended for privacy/throughput).
"""
import argparse
import json
import os
import re
from typing import Dict, Tuple

try:
    from deep_translator import MyMemoryTranslator, LibreTranslator
except Exception as e:
    raise SystemExit('deep-translator is required. Install with: pip install -r requirements.txt')

PLACEHOLDER_RE = re.compile(r"(\{\d+\}|%s|%d|%\([^)]+\)s|\{\{[^}]+\}\})")


def timestamp():
    import datetime
    return datetime.datetime.now().strftime('%Y%m%d_%H%M%S')


def protect_placeholders(text: str) -> Tuple[str, Dict[str, str]]:
    mapping = {}

    def repl(m):
        ph = m.group(0)
        key = f"__PH_{len(mapping)}__"
        mapping[key] = ph
        return key

    protected = PLACEHOLDER_RE.sub(repl, text)
    return protected, mapping


def restore_placeholders(text: str, mapping: Dict[str, str]) -> str:
    for k, v in mapping.items():
        text = text.replace(k, v)
    return text


def is_chinese(text: str) -> bool:
    if not text:
        return False
    return any('\u4e00' <= ch <= '\u9fff' for ch in text)


def translate_text(translator, text: str) -> str:
    if text is None:
        return ''
    protected, mapping = protect_placeholders(text)
    translated = translator.translate(protected)
    restored = restore_placeholders(translated, mapping)
    return restored


def load_json(path: str) -> Dict[str, str]:
    with open(path, 'r', encoding='utf-8') as f:
        return json.load(f)


def save_json(path: str, data: Dict[str, str]):
    os.makedirs(os.path.dirname(path), exist_ok=True)
    with open(path, 'w', encoding='utf-8') as f:
        json.dump(data, f, ensure_ascii=False, indent=2)


def main():
    ap = argparse.ArgumentParser()
    ap.add_argument('--source', default='../../lang/en.json')
    ap.add_argument('--target', default='../../lang/zh.json')
    ap.add_argument('--output', default='../../lang/candidates/zh.translated_deep.json')
    ap.add_argument('--provider', choices=['mymemory', 'libre'], default='mymemory')
    ap.add_argument('--limit', type=int, default=0)
    ap.add_argument('--libre-url', default='https://libretranslate.com')
    args = ap.parse_args()

    src = os.path.abspath(os.path.join(os.path.dirname(__file__), args.source))
    tgt = os.path.abspath(os.path.join(os.path.dirname(__file__), args.target))
    out = os.path.abspath(os.path.join(os.path.dirname(__file__), args.output))

    en = load_json(src)
    zh = load_json(tgt)

    # Collect untranslated keys (no Chinese characters)
    untranslated = [k for k, v in zh.items() if not is_chinese(v)]
    print(f'Found {len(untranslated)} keys that appear not to be Chinese in target file.')

    to_translate = untranslated[:args.limit] if args.limit and args.limit > 0 else untranslated

    print(f'Using provider: {args.provider}. Translating {len(to_translate)} keys...')

    if args.provider == 'mymemory':
        translator = MyMemoryTranslator(source='en', target='zh')
    else:
        translator = LibreTranslator(source='en', target='zh', api_url=args.libre_url)

    translated = {k: zh.get(k, '') for k in en.keys()}

    for i, key in enumerate(to_translate, 1):
        source_text = en.get(key, '')
        try:
            tr = translate_text(translator, source_text)
            translated[key] = tr
            if i % 10 == 0 or i == len(to_translate):
                print(f'Translated {i}/{len(to_translate)}')
        except Exception as e:
            print(f'Error translating key {key}: {e}')

    save_json(out, translated)
    print(f'Done. Output written to {out}')


if __name__ == '__main__':
    main()
