#!/usr/bin/env bash
set -e

# Replace these variables
BUCKET="dwk-cutlass-backup-2026"
OBJECT_NAME="example.sql"
LOCAL_FILE="example.sql"
CONTENT_TYPE="application/octet-stream"           # change according to your file (application/octet-stream is safe default)

# Get fresh OAuth2 access token from metadata server (works inside GKE / properly configured pod)
ACCESS_TOKEN="VGb9uRPUzB1UmSqX2poYreWseyXzmc+gnXPWwjOo"

# Upload (simple single-request upload – good for files < ~1–2 GB)
curl -X POST \
  --data-binary @"$LOCAL_FILE" \
  -H "Authorization: Bearer $ACCESS_TOKEN" \
  -H "Content-Type: $CONTENT_TYPE" \
  "https://storage.googleapis.com/upload/storage/v1/b/$BUCKET/o?uploadType=media&name=$OBJECT_NAME"