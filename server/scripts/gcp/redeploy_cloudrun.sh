#!/usr/bin/env bash
# Build the repo and deploy to Cloud Run.
# Required env: PROJECT_ID, CLOUD_RUN_SERVICE, REGION (default us-east4)
set -euo pipefail
PROJECT_ID="${PROJECT_ID:-}"
CLOUD_RUN_SERVICE="${CLOUD_RUN_SERVICE:-}"
REGION="${REGION:-us-east4}"
GIT_SHA="${GIT_SHA:-$(git rev-parse --short HEAD)}"

if [ -z "$PROJECT_ID" ] || [ -z "$CLOUD_RUN_SERVICE" ]; then
  echo "Usage: PROJECT_ID=... CLOUD_RUN_SERVICE=... ./redeploy_cloudrun.sh"
  exit 2
fi

# Build & push (Cloud Build picks up Dockerfile / buildpack)
gcloud builds submit --project "$PROJECT_ID" --timeout=30m --substitutions=_SERVICE="$CLOUD_RUN_SERVICE" -q

# Deploy (assumes image name match or build step publishes expected image)
# If you publish an image explicitly, replace image reference below.
gcloud run deploy "$CLOUD_RUN_SERVICE" \
  --image "gcr.io/$PROJECT_ID/$CLOUD_RUN_SERVICE" \
  --region "$REGION" \
  --platform managed \
  --project "$PROJECT_ID" \
  --allow-unauthenticated
echo "Deployed $CLOUD_RUN_SERVICE to $REGION in $PROJECT_ID"
