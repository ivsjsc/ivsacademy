Backups handling
================

This repository previously used `.bak` sidecar files when running scripts that modified HTML files. To keep the workspace clean and make it simple to restore any previous content, we centralize backups under the `.backups/` folder.

Rules
- Scripts that previously created `.bak` files now write timestamped backups to `.backups/`.
- `.backups/` is ignored by git by default; this prevents accidental commits of backups.
- To restore a file from `.backups/`, copy the desired timestamped file back to the original location.

Example:
- Original file: `pages/letstalkdongnai.html`
- Backup created: `.backups/pages/letstalkdongnai.html.backup.20250928T134339Z.orig`

To restore:
- Copy the backup file back to its original path and commit the change.

