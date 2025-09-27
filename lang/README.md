IVS lang/ tools
=================

This folder contains a helper script to create backups and assist with translating/merging locale files.

Files:
- merge_translate_locales.py  -- script to compare en.json -> zh.json, optionally auto-translate missing/wrong-language values.
- requirements.txt           -- Python dependencies (deep-translator)

Quick PowerShell usage (Windows):

# create a venv and install requirements
py -3 -m venv .venv
.\.venv\Scripts\Activate.ps1
pip install -r requirements.txt

# Dry run (will not change files, will create en_to_translate_xxx.json suggestions and a change report)
py -3 .\merge_translate_locales.py --lang-dir . --dry-run

# Apply changes (will create backups zh.json.bak_auto_YYYYMMDD_HHMMSS and update zh.json)
py -3 .\merge_translate_locales.py --lang-dir . --apply --batch-size 200

Notes & safety:
- The script preserves placeholders like {0}, %s by protecting them during translation.
- Long marketing/SEO/OG/meta strings are flagged for manual review and included in the generated report.
- The script uses GoogleTranslator from deep-translator; network access is required.
