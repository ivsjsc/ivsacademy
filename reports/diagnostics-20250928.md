## Diagnostics summary - 2025-09-28

This report summarizes immediate issues observed from console logs, the link-check report `link-check-20250927.txt`, and quick repository checks.

1) JS initialization error (TypeError)
- Error: `Uncaught TypeError: window.componentLog is not a function` (seen in `language.js` and console screenshots)
- Likely cause: `utils.js` not available or `window.componentLog` not defined before other scripts run.
- Mitigation applied: added a safe fallback in `js/language.js` to avoid hard crash and schedule initialization shortly if utils.js hasn't replaced the fallback.

2) Missing / 404 assets (top examples)
- `images/banners/solutions_hero_banner.jpg` (404 in `solutions.html` screenshot)
- `images/banners/education_hero.jpg` (education page)
- `images/logo/webbannermo.png` (404)
- `images/icons/icon-144x144.png` (manifest icon; causes manifest icon load error)
- `images/flags/zh.png` (404 for language flag)
- `images/favicon.ico` (many pages)

3) Link-check highlights
- Many pages reference `/js/utils.js`, `/js/loadComponents.js`, `/js/language.js`, and styles under `/css/` that the link-check report marked as missing. See `reports/link-check-20250927.txt` for full list.

4) Translation issues
- `lang/vi.json` exists and loads, but several keys contained English placeholders. I updated common nav and library keys to Vietnamese in `lang/vi.json`.

5) Next recommended actions
- Restore/upload the missing image assets or fix the referenced paths.
- Ensure `utils.js` is present at `/js/utils.js` on the deployed site and that server serves it with correct path.
- Optionally harden `fabController.js` and other controllers to wait for `window.componentLog` (I left an existing fallback in `fabController.js` since it had one already).
- Complete translation for the remaining keys in `lang/vi.json` (run `scripts/translation/generate_lang_keys.js` if used) and verify by starting the dev static server.

Files changed in this quick patch:
- `js/language.js` — added a safe fallback for `window.componentLog` and small initialization delay to mitigate TypeError.
- `lang/vi.json` — updated several nav & library keys to Vietnamese.
- `reports/diagnostics-20250928.md` — this file (you are reading it now).

If you'd like, I can now:
- (A) Add defensive wait logic to `js/fabController.js` and `js/loadComponents.js` as well.
- (B) Bulk-translate remaining English strings in `lang/vi.json` from `lang/en.json`.
- (C) Try to start the local dev static server and perform a smoke test (requires dev server scripts). 

Tell me which of (A)/(B)/(C) to run next or if you'd like me to open a PR with these patches.
