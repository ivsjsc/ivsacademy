Branching and Pull Request Guidelines
====================================

This repository uses Git for source control. Follow these simple rules to collaborate safely.

Branching
- Use feature branches named like `feat/<short-desc>` or `fix/<short-desc>`.
- Create a branch off `main` for each feature or bugfix.

Pull Requests
- Push your branch to the remote and open a Pull Request (PR) targeting `main`.
- Include a short description of your changes and any manual steps to verify.
- Request at least one reviewer before merging.

Reverting and Rollback
- To revert a commit locally: `git revert <commit>`
- To reset your branch to a previous commit (dangerous for shared branches): `git reset --hard <commit>`
- If you need a deleted file from before this cleanup, check the `.backups/` directory added to the repo root (ignored by git). Files moved there during cleanup are timestamped and can be copied back.

Good practices
- Keep commits small and focused.
- Run `npm run build` (or other relevant checks) before opening a PR.
- Avoid committing large generated files; use `.gitignore` when appropriate.
