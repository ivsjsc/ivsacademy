#!/usr/bin/env bash
set -euo pipefail
KEY_FILE="${KEY_FILE:-ci-deploy-sa-key.json}"
PROJECT_ID="${PROJECT_ID:-}"

if [ ! -f "$KEY_FILE" ]; then
  echo "ERROR: key file not found: $KEY_FILE"
  exit 2
fi
if ! command -v gh >/dev/null; then
  echo "ERROR: gh CLI not found. Install and run 'gh auth login' first."
  exit 2
fi
if [ -z "$PROJECT_ID" ]; then
  echo "ERROR: set PROJECT_ID environment variable"
  exit 2
fi

echo "Uploading $KEY_FILE to GitHub Secrets as GCP_SA_KEY..."
gh secret set GCP_SA_KEY --body "$(cat "$KEY_FILE")"
echo "Uploading GCP_PROJECT=$PROJECT_ID to GitHub Secrets..."
gh secret set GCP_PROJECT --body "$PROJECT_ID"

echo "Done. Delete local key file: rm -f $KEY_FILE"
