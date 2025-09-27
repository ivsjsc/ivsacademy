#!/usr/bin/env python3
"""
merge_translate_locales.py

Create timestamped backups of locale files, compare keys between en.json and zh.json,
and optionally auto-translate missing or non-Chinese zh.json values using Deep Translator
GoogleTranslator. The script preserves placeholders like {0}, %s and restores them
after translation. It also writes a change report and a list of keys flagged for manual review.

Usage (PowerShell):
  py -3 .\merge_translate_locales.py --lang-dir . --dry-run
  py -3 .\merge_translate_locales.py --lang-dir . --apply --batch-size 100

Notes:
 - This script requires network access for translation and the package deep-translator.
 - It will NOT modify your locale files unless --apply is passed.
 - Backups are always created when --apply is used.
"""
import argparse
import json
import os
import re
import shutil
from datetime import datetime
from typing import Dict, Tuple

try:
    from deep_translator import GoogleTranslator
except Exception:
    GoogleTranslator = None

PLACEHOLDER_RE = re.compile(r"(\{\d+\}|%s|%d|%\([^)]+\)s)")


def timestamp() -> str:
    return datetime.now().strftime("%Y%m%d_%H%M%S")


def is_chinese(text: str) -> bool:
    if not text:
        return False
    # return True if contains CJK unified ideographs
    return any('\u4e00' <= ch <= '\u9fff' for ch in text)


def make_backup(path: str) -> str:
    ts = timestamp()
    dst = f"{path}.bak_auto_{ts}"
    shutil.copy2(path, dst)
    return dst


def protect_placeholders(text: str) -> Tuple[str, Dict[str, str]]:
    """Replace placeholders with tokens and return mapping to restore later."""
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


def translate_text(text: str, translator) -> str:
    if not translator:
        raise RuntimeError("Translator not available. Install deep-translator and ensure network access.")
    protected, mapping = protect_placeholders(text)
    translated = translator.translate(protected)
    restored = restore_placeholders(translated, mapping)
    return restored


def load_json(path: str) -> Dict[str, str]:
    with open(path, 'r', encoding='utf-8') as f:
        return json.load(f)


def save_json(path: str, data: Dict[str, str]):
    with open(path, 'w', encoding='utf-8') as f:
        json.dump(data, f, ensure_ascii=False, indent=2)


def main():
    ap = argparse.ArgumentParser()
    ap.add_argument('--lang-dir', required=True, help='Path to lang/ directory')
    ap.add_argument('--source', default='en.json')
    ap.add_argument('--target', default='zh.json')
    ap.add_argument('--ref', default='vi.json', help='Reference translations for nuance')
    ap.add_argument('--apply', action='store_true', help='Apply changes to target file')
    ap.add_argument('--dry-run', action='store_true', help='Do not write changes, only simulate')
    ap.add_argument('--batch-size', type=int, default=200, help='Translate in batches to avoid rate limits')
    ap.add_argument('--flag-length', type=int, default=200, help='Flag strings longer than this for manual review')
    args = ap.parse_args()

    lang_dir = args.lang_dir
    src_path = os.path.join(lang_dir, args.source)
    tgt_path = os.path.join(lang_dir, args.target)
    ref_path = os.path.join(lang_dir, args.ref)

    if not os.path.exists(src_path):
        print(f"Source not found: {src_path}")
        return
    if not os.path.exists(tgt_path):
        print(f"Target not found: {tgt_path}")
        return

    en = load_json(src_path)
    zh = load_json(tgt_path)
    vi = load_json(ref_path) if os.path.exists(ref_path) else {}

    translator = None
    if GoogleTranslator:
        translator = GoogleTranslator(source='en', target='zh-CN')
    else:
        print("deep-translator not available. Install with: pip install deep-translator")

    keys = sorted(en.keys())
    total = len(keys)
    changed = []
    manual_review = []
    to_translate = []

    for k in keys:
        src_text = en.get(k, '')
        cur = zh.get(k, '')
        # if target is empty or not Chinese, schedule translation
        if not cur or not is_chinese(cur):
            to_translate.append(k)
        # flag long marketing/seo/legal copy for manual review
        if len(src_text) >= args.flag_length or any(token in k.lower() for token in ('meta','og_','description','about_','hero','intro','cta','title')):
            manual_review.append(k)

    print(f"Found {total} keys in source. {len(to_translate)} keys need translation or review.")

    # translate in batches
    results = {}
    if translator and args.apply and not args.dry_run:
        # create backups
        print("Creating backups...")
        b1 = make_backup(src_path)
        b2 = make_backup(tgt_path)
        if os.path.exists(ref_path):
            b3 = make_backup(ref_path)
        print(f"Backups created: {b1}, {b2}")

    if not translator:
        print("Translator missing: will only produce reports and not perform translations.")

    # handle translation loop
    for i in range(0, len(to_translate), args.batch_size):
        batch = to_translate[i:i+args.batch_size]
        print(f"Processing batch {i//args.batch_size + 1}: {len(batch)} keys")
        for k in batch:
            src_text = en.get(k, '')
            ref_text = vi.get(k, '')
            # prefer en as source; we could combine en + vi for context but deep_translator takes text only
            text_to_translate = src_text or ref_text or ''
            if not text_to_translate:
                continue
            if translator and args.apply and not args.dry_run:
                try:
                    translated = translate_text(text_to_translate, translator)
                except Exception as e:
                    print(f"Translation failed for {k}: {e}")
                    translated = zh.get(k, '') or ''
                old = zh.get(k, '')
                if translated and translated != old:
                    zh[k] = translated
                    changed.append({'key': k, 'old': old, 'new': translated})
            else:
                # simulation: include the English source in results for offline translation
                results[k] = text_to_translate

    # write outputs
    ts = timestamp()
    report = {
        'timestamp': ts,
        'source': src_path,
        'target': tgt_path,
        'total_keys': total,
        'to_translate_count': len(to_translate),
        'changed_count': len(changed),
        'manual_review_count': len(manual_review),
        'changed': changed[:500],
        'manual_review_keys': manual_review,
    }

    report_path = os.path.join(lang_dir, f'change_report_{ts}.json')
    with open(report_path, 'w', encoding='utf-8') as f:
        json.dump(report, f, ensure_ascii=False, indent=2)

    if not args.apply or args.dry_run:
        # write suggestion file with English source for offline translation
        suggestion_path = os.path.join(lang_dir, f'en_to_translate_{ts}.json')
        with open(suggestion_path, 'w', encoding='utf-8') as f:
            json.dump(results, f, ensure_ascii=False, indent=2)
        print(f"Dry run / no-apply mode: suggestions written to {suggestion_path}")
    else:
        # save modified zh.json
        save_json(tgt_path, zh)
        print(f"Applied {len(changed)} changes to {tgt_path}")

    print(f"Report written to {report_path}")
    print("Done.")


if __name__ == '__main__':
    main()
