#!/usr/bin/env bash
set -e

if [ -n "$URL" ]
then
  PG_URL="${URL/DB_PASSWORD/$DB_PASSWORD}"
  pg_dump -v "$PG_URL" > /usr/src/app/backup.sql

  echo "Dump created ($(du -h /usr/src/app/backup.sql | cut -f1))"
  echo "Uploading the bucket bucket ..."

  curl -v -X PUT \
         --upload-file /usr/src/app/backup.sql \
         -H "Content-Type: application/sql" \
         "$SIGNED_UPLOAD_URL"

  echo "Upload finished (check bucket manually)"
fi
