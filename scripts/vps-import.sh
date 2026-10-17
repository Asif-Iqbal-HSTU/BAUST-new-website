#!/usr/bin/env bash
# First-time setup on the VPS, run from the cloned repo root:
#   bash scripts/vps-import.sh /tmp/vps-bundle
# Puts .env and backup.sql in place, starts the stack (MySQL bootstraps itself
# from backup.sql on its first boot) and restores the uploaded files.
# Refuses to run if this host already has a baust_website stack, volumes or
# busy ports, since any of those would silently skip the fresh data.
set -euo pipefail

BUNDLE=${1:?usage: vps-import.sh <path-to-vps-bundle>}
BUNDLE=$(cd "$BUNDLE" && pwd)

for f in .env backup.sql storage-public.tgz; do
  [ -f "$BUNDLE/$f" ] || { echo "missing $BUNDLE/$f" >&2; exit 1; }
done

env_val() { grep -E "^$1=" "$BUNDLE/.env" | tail -1 | cut -d= -f2- | tr -d '"' || true; }
APP_PORT=$(env_val APP_PORT); APP_PORT=${APP_PORT:-8086}
DB_FORWARD_PORT=$(env_val DB_FORWARD_PORT); DB_FORWARD_PORT=${DB_FORWARD_PORT:-3309}

fail=0
for c in baust_web_app baust_web_mysql baust_web_tunnel; do
  if docker ps -a --format '{{.Names}}' | grep -qx "$c"; then
    echo "STOP: a container named $c already exists on this host." >&2; fail=1
  fi
done
for v in baust_website_mysql_data baust_website_app_storage; do
  if docker volume inspect "$v" > /dev/null 2>&1; then
    echo "STOP: volume $v already exists; its old data would be reused instead of the bundle." >&2; fail=1
  fi
done
for p in "$APP_PORT" "$DB_FORWARD_PORT"; do
  if ss -ltn 2>/dev/null | awk '{print $4}' | grep -qE "[:.]$p\$"; then
    echo "STOP: port $p is already in use; set APP_PORT / DB_FORWARD_PORT in $BUNDLE/.env to free ports." >&2; fail=1
  fi
done
[ "$fail" = 0 ] || { echo "Nothing was changed." >&2; exit 1; }

cp "$BUNDLE/.env" .env
cp "$BUNDLE/backup.sql" backup.sql

docker compose up -d --build

echo "Restoring uploads..."
docker run --rm -v baust_website_app_storage:/s -v "$BUNDLE":/in alpine \
  sh -c 'tar xzf /in/storage-public.tgz -C /s && chown -R 82:82 /s/app/public'

for i in $(seq 1 60); do
  if curl -fsS "http://127.0.0.1:$APP_PORT/up" > /dev/null; then
    echo "Site is up on http://127.0.0.1:$APP_PORT"
    exit 0
  fi
  sleep 5
done
echo "App did not become healthy; check: docker compose logs app" >&2
exit 1
