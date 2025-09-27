# IVS Website - Translation System Documentation

This document describes the translation system used by the IVS website, how files are organized, and recommended workflows for creating and applying translations.

## Directory layout

- `lang/` - Primary language files loaded by the client-side code. These should be the authoritative files used in production.
  - `en.json` - English source (master key list)
  - `vi.json` - Vietnamese translations
  - `zh.json` - Chinese translations (production)
  - `backups/` - Timestamped backups created by scripts
  - `candidates/` - Candidate translation files produced by auto-translate scripts (do not deploy these directly)
  - `reports/` - Reports produced by validation scripts

- `scripts/translation/` - Utilities and scripts for translation workflows
  - `check_translations_status.js` - Reports translation coverage and quality metrics
  - `create_full_zh_candidate.js` - Produces a full candidate file by merging existing candidates with the key list
  - `translate_zh_auto.js` - Auto-translation helper (mock mode by default; supports Google Translate REST via `--api=google` and `GOOGLE_API_KEY` env var)
  - `apply_zh_translation.js` - Apply a translated candidate file into `lang/zh.json` (review before applying)
  - `merge_translate_locales.py` - Python utility to auto-translate with more controls (uses deep-translator)
  - `commit_translations.ps1` - Helper to create a branch and commit translation artifacts

## Basic workflow

1. Run `node scripts/translation/check_translations_status.js` to see current coverage.
2. Create/update a candidate:
   - Use `node scripts/translation/create_full_zh_candidate.js` to produce `lang/candidates/zh.candidate.full.json` (fills with placeholders from `en.json`).
   - Use `node scripts/translation/translate_zh_auto.js --api=google --auto` with `GOOGLE_API_KEY` set to auto-translate missing keys into `lang/candidates/zh.translated_full.json`. Without a key the script runs in mock mode.
3. Review candidate translations manually for quality and placeholders.
4. Use `node scripts/translation/apply_zh_translation.js` to merge approved translations into `lang/zh.json`. Backups will be created prior to applying.
5. Commit translation artifacts to a new branch using `scripts/translation/commit_translations.ps1` and open a pull request.

## Notes and best practices

- Always review machine translations before applying to production. Machine translations can mistranslate technical terms or placeholders.
- Use `lang/backups` to restore previous versions if needed.
- Keep `en.json` as the canonical key list. Do not add keys directly to `zh.json` or `vi.json` without adding them to `en.json` first.
- If you need higher quality automated translations, consider using the `merge_translate_locales.py` script with `deep-translator` and a paid translation API.

## Quick commands (PowerShell)

```powershell
# Check status
node .\scripts\translation\check_translations_status.js

# Generate full candidate
node .\scripts\translation\create_full_zh_candidate.js

# Auto-translate (mock mode)
node .\scripts\translation\translate_zh_auto.js --auto

# Auto-translate (Google API, requires GOOGLE_API_KEY env var)
$env:GOOGLE_API_KEY = 'YOUR_KEY'
node .\scripts\translation\translate_zh_auto.js --api=google --auto

# Commit candidate files to a new branch
.\scripts\translation\commit_translations.ps1 -BranchName translations/zh-update -Message "Add Chinese candidate translations" -Push
```

## Troubleshooting

- If scripts can't find `lang/` files, confirm you're running commands from the repository root or pass explicit `--source`/`--target` paths to the scripts.
- If Google Translate returns errors, verify your `GOOGLE_API_KEY` and that billing/APIs are enabled in your Google Cloud project.

---
Generated on: 2025-09-28
