#!/usr/bin/env bash
set -euo pipefail
PROJECT_ID="${PROJECT_ID:-}"
if [ -z "$PROJECT_ID" ]; then
  echo "ERROR: set PROJECT_ID env var"
  exit 2
fi
echo "Enabling GCP APIs for project $PROJECT_ID..."
gcloud services enable \
  artifactregistry.googleapis.com \
  cloudbuild.googleapis.com \
  run.googleapis.com \
  containerregistry.googleapis.com \
  firebasehosting.googleapis.com \
  --project "$PROJECT_ID"
echo "APIs enabled for project $PROJECT_ID"
