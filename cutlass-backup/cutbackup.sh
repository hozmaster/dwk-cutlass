#!/usr/bin/env bash
set -e

if [ -n "$URL" ]
then
  PG_URL="${URL/DB_PASSWORD/$DB_PASSWORD}"
  pg_dump -v "$PG_URL" > /usr/src/app/backup.sql
  echo "Not sending the dump actually anywhere"
  # curl -F ‘data=@/usr/src/app/backup.sql’ https://somewhere
fi

