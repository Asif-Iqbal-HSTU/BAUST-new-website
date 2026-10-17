#!/usr/bin/env bash
# Collects everything the VPS needs that git deliberately does not carry:
#   .env                  production secrets
#   backup.sql            live database dump
#   storage-public.tgz    uploaded files from the app_storage volume
# into ./vps-bundle/. Run from the repo root while the stack is up, then copy
# the folder to the server:  scp -r vps-bundle user@VPS:/tmp/
set -euo pipefail
export MSYS_NO_PATHCONV=1   # Git Bash on Windows: don't rewrite container paths

OUT=vps-bundle
mkdir -p "$OUT"
HOST_OUT=$(cd "$OUT" && (pwd -W 2>/dev/null || pwd))

echo "Dumping database..."
docker compose exec -T mysql sh -c 'mysqldump -uroot -p"$MYSQL_ROOT_PASSWORD" --no-tablespaces --single-transaction baust_website > /tmp/dump.sql'
docker cp baust_web_mysql:/tmp/dump.sql "$OUT/backup.sql"
docker compose exec -T mysql rm -f /tmp/dump.sql

echo "Archiving uploads..."
docker run --rm -v baust_website_app_storage:/s -v "$HOST_OUT":/out alpine \
  tar czf /out/storage-public.tgz -C /s app/public

cp .env "$OUT/.env"

ls -lh "$OUT"
echo "Done. Next: scp -r $OUT user@VPS:/tmp/"
