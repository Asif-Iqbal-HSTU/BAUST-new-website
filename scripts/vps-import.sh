#!/usr/bin/env bash
# First-time setup on the VPS, run from the cloned repo root:
#   bash scripts/vps-import.sh /tmp/vps-bundle
# Puts .env and backup.sql in place, starts the stack (MySQL bootstraps itself
# from backup.sql on its first boot) and restores the uploaded files.
set -euo pipefail

BUNDLE=${1:?usage: vps-import.sh <path-to-vps-bundle>}
BUNDLE=$(cd "$BUNDLE" && pwd)

for f in .env backup.sql storage-public.tgz; do
  [ -f "$BUNDLE/$f" ] || { echo "missing $BUNDLE/$f" >&2; exit 1; }
done

cp "$BUNDLE/.env" .env
cp "$BUNDLE/backup.sql" backup.sql

docker compose up -d --build

echo "Restoring uploads..."
docker run --rm -v baust_website_app_storage:/s -v "$BUNDLE":/in alpine \
  sh -c 'tar xzf /in/storage-public.tgz -C /s && chown -R 82:82 /s/app/public'

for i in $(seq 1 30); do
  if curl -fsS http://127.0.0.1:8086/up > /dev/null; then
    echo "Site is up on http://127.0.0.1:8086"
    exit 0
  fi
  sleep 5
done
echo "App did not become healthy; check: docker compose logs app" >&2
exit 1
