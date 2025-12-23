#!/usr/bin/env bash
set -euo pipefail
# Usage:
#   PROJECT_ID=my-project SA_NAME=ci-deploy-sa ./server/scripts/gcp/create_service_account.sh
PROJECT_ID="${PROJECT_ID:-}"
SA_NAME="${SA_NAME:-ci-deploy-sa}"
if [ -z "$PROJECT_ID" ]; then
  echo "ERROR: set PROJECT_ID env var"
  exit 2
fi
echo "Creating service account: $SA_NAME in project $PROJECT_ID"
gcloud iam service-accounts create "$SA_NAME" --display-name="$SA_NAME" --project="$PROJECT_ID"

ROLES=(
  "roles/run.admin"
  "roles/cloudbuild.builds.editor"
  "roles/artifactregistry.writer"
  "roles/iam.serviceAccountUser"
)
for r in "${ROLES[@]}"; do
  echo "Granting $r to $SA_NAME"
  gcloud projects add-iam-policy-binding "$PROJECT_ID" \
    --member="serviceAccount:${SA_NAME}@${PROJECT_ID}.iam.gserviceaccount.com" \
    --role="$r" --quiet
done

KEY_FILE="${SA_NAME}-key.json"
echo "Creating key file: $KEY_FILE (store securely and upload to GitHub Secrets as GCP_SA_KEY)"
gcloud iam service-accounts keys create "$KEY_FILE" \
  --iam-account="${SA_NAME}@${PROJECT_ID}.iam.gserviceaccount.com" \
  --project="$PROJECT_ID"

if ! grep -qxF "$KEY_FILE" .gitignore 2>/dev/null; then
  echo "$KEY_FILE" >> .gitignore
  echo "Added $KEY_FILE to .gitignore"
fi

echo "DONE. Upload $KEY_FILE to GitHub Secret GCP_SA_KEY and set GCP_PROJECT secret."
echo "After upload, delete the local key file: rm -f $KEY_FILE"
