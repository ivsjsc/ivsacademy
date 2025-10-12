#!/usr/bin/env bash
# Template script to help remove a leaked secret from git history using git-filter-repo.
# NOTE: This script rewrites history and force-pushes; use with extreme caution.
# Run locally and review each step before executing.

set -euo pipefail

if [ "$#" -lt 3 ]; then
  echo "Usage: $0 <repo-url> <secret-to-remove> <replacement>"
  echo "Example: $0 git@github.com:ivsjsc/ivs.github.io.git 'abY8Q~E2Z...' '***REMOVED***'"
  exit 1
fi

REPO_URL="$1"
SECRET_TO_REMOVE="$2"
REPLACEMENT="$3"

TMPDIR=$(mktemp -d)
echo "Cloning mirror into $TMPDIR"

git clone --mirror "$REPO_URL" "$TMPDIR/repo.git"
cd "$TMPDIR/repo.git"

echo "Creating replacements.txt"
echo "${SECRET_TO_REMOVE}==>${REPLACEMENT}" > ../replacements.txt

# Run git-filter-repo
if ! command -v git-filter-repo >/dev/null 2>&1; then
  echo "git-filter-repo not found. Install it first (pip install git-filter-repo)"
  exit 1
fi

git filter-repo --replace-text ../replacements.txt

# Cleanup
git reflog expire --expire=now --all
git gc --prune=now --aggressive

# Push back (WARNING: destructive)
read -p "About to force-push rewritten history to origin. Continue? (yes/no) " yn
if [ "$yn" != "yes" ]; then
  echo "Aborting. Local mirror remains in $TMPDIR"
  exit 0
fi

# You might need to set up credentials (SSH agent / token)
GIT_SSH_COMMAND='ssh -o StrictHostKeyChecking=no' git push --force --all
GIT_SSH_COMMAND='ssh -o StrictHostKeyChecking=no' git push --force --tags

echo "Done. Remember to inform your team and rotate any remaining secrets."
