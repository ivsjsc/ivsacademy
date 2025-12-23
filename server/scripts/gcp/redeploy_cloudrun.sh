#!/usr/bin/env bash
# Build the repo and deploy to Cloud Run.
# Required env: PROJECT_ID, CLOUD_RUN_SERVICE, REGION (default us-east4)
set -euo pipefail
PROJECT_ID="${PROJECT_ID:-}"
CLOUD_RUN_SERVICE="${CLOUD_RUN_SERVICE:-}"
REGION="${REGION:-us-east4}"

if [ -z "$PROJECT_ID" ] || [ -z "$CLOUD_RUN_SERVICE" ]; then
  echo "Usage: PROJECT_ID=... CLOUD_RUN_SERVICE=... ./redeploy_cloudrun.sh"
  exit 2
fi

echo "Submitting Cloud Build for project $PROJECT_ID..."
# You can adapt substitutions to your cloudbuild.yaml if needed
gcloud builds submit --project "$PROJECT_ID" --timeout=30m -q

echo "Deploying service $CLOUD_RUN_SERVICE to Cloud Run..."
gcloud run deploy "$CLOUD_RUN_SERVICE" \
  --image "gcr.io/$PROJECT_ID/$CLOUD_RUN_SERVICE" \
  --region "$REGION" \
  --platform managed \
  --project "$PROJECT_ID" \
  --allow-unauthenticated

echo "Deployed $CLOUD_RUN_SERVICE to $REGION in $PROJECT_ID"
