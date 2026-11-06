# BAUST Website — Deployment

Containerised the same way as the other BAUST/HSTU apps: a single Laravel
`app` container (nginx + php-fpm + supervisor), a `mysql:8.4` database, and a
`cloudflared` tunnel that publishes the site at **https://baust.edu.bd**.

## Stack

| Service       | Container         | Purpose                                   |
|---------------|-------------------|-------------------------------------------|
| `app`         | `baust_web_app`   | Laravel 12 + Inertia/React (port 8086→80) |
| `mysql`       | `baust_web_mysql` | MySQL 8.4 (internal network only)         |
| `cloudflared` | `baust_web_tunnel`| Cloudflare tunnel → public hostname       |

Compose project name is fixed to `baust_website`, so `up`/`down` behave
identically from any checkout directory (shared named volumes & network).

## Run locally

No Cloudflare account or tunnel token is needed. `compose.local.yml` layers a
local profile on top of `compose.yml`: plain HTTP, debug on, and the
`cloudflared` service parked behind an unused profile so it never starts.

```bash
cp .env.docker.local.example .env       # throwaway local secrets, already filled in
docker compose -f compose.yml -f compose.local.yml up -d --build
```

> **Windows prerequisite:** Docker Desktop runs its Linux engine inside WSL2.
> If `docker info` fails with `500 Internal Server Error` / `dialing
> 192.168.65.7:2376`, WSL is missing — run `wsl --install` in an **elevated**
> PowerShell, reboot, start Docker Desktop, then retry the command above.

First build takes a few minutes (composer install + `npm run build` happen
inside the image). When it finishes the site is at **http://localhost:8086**
and MySQL is reachable on `127.0.0.1:3309` from the host.

```bash
docker compose -f compose.yml -f compose.local.yml ps
docker compose -f compose.yml -f compose.local.yml logs -f app
curl http://localhost:8086/up          # health check
docker compose -f compose.yml -f compose.local.yml down          # stop, keep data
docker compose -f compose.yml -f compose.local.yml down -v       # stop, wipe DB + storage
```

On Windows PowerShell the same commands work verbatim (use
`curl.exe http://localhost:8086/up` so it isn't aliased to `Invoke-WebRequest`).

Frontend assets are compiled into the image, so **after changing anything under
`resources/` rebuild**: `docker compose -f compose.yml -f compose.local.yml up -d --build`.
PHP-only changes still need a rebuild too, since the source is copied in rather
than bind-mounted.

To shorten the command, export it once per shell:

```bash
alias dcl='docker compose -f compose.yml -f compose.local.yml'    # bash/zsh
function dcl { docker compose -f compose.yml -f compose.local.yml @args }   # PowerShell
```

### Database contents

The real dataset lives in **`backup.sql`** at the repo root (a `mysqldump` of
`baust_website`: 43 tables, ~933 notices, 284 department members, 14 users).
It holds real user data, so it is **git-ignored** — copy it to each machine by
hand (see [Migrating to a VPS](#migrating-to-a-vps)). It must exist before the
first `docker compose up`, otherwise Docker creates an empty *directory* named
`backup.sql` and the MySQL init fails.
Compose mounts it into the MySQL container at
`/docker-entrypoint-initdb.d/01-baust_website.sql`, so **a brand-new `mysql_data`
volume is bootstrapped from it automatically** — local and production alike.
MySQL only runs that directory when its data dir is empty, so the mount is a
no-op on every later boot and cannot overwrite a live database.

The old demo seeders now only run on a genuinely empty install: the entrypoint
checks whether `users` already has rows and skips `db:seed` if so, which stops
it duplicating rows on top of restored data.

To refresh the dataset later, replace `backup.sql` and recreate the volume:

```bash
docker compose -f compose.yml -f compose.local.yml down -v
docker compose -f compose.yml -f compose.local.yml up -d --build
```

To import into an already-running stack without wiping the volume:

```bash
docker cp backup.sql baust_web_mysql:/tmp/backup.sql
docker compose exec mysql sh -c 'mysql -uroot -p"$MYSQL_ROOT_PASSWORD" baust_website < /tmp/backup.sql'
docker compose exec app php artisan cache:clear
```

Take a dump of the current database with:

```bash
docker compose exec mysql sh -c 'mysqldump -uroot -p"$MYSQL_ROOT_PASSWORD" --no-tablespaces baust_website > /tmp/dump.sql'
docker cp baust_web_mysql:/tmp/dump.sql ./backup.sql
```

> Copy dumps with `docker cp`, not shell redirection — piping them through
> PowerShell re-encodes the file and corrupts the non-ASCII content.

### Going from local to the Cloudflare production link

Local and production read the same `.env`, so keep two copies (e.g.
`.env.local` / `.env.production`) and swap the one at `.env`:

1. `cp .env.docker.example .env` and fill in the real `APP_KEY`,
   `DB_PASSWORD`, `MYSQL_ROOT_PASSWORD`, `IQAC_ADMIN_PASSWORD` and
   `CLOUDFLARE_TUNNEL_TOKEN`.
2. `docker compose up -d --build` — **without** the `-f` flags. That drops the
   local override, so `APP_ENV=production`, `APP_DEBUG=false`,
   secure cookies, and the `cloudflared` tunnel all come back.
3. Point the tunnel's public hostname at `http://baust_web_app:80` (below).

## First-time deploy

```bash
cp .env.docker.example .env      # then fill in the secrets
# APP_KEY:  php artisan key:generate --show   (or: openssl rand -base64 32, prefixed with base64:)
# DB_PASSWORD / MYSQL_ROOT_PASSWORD:  any strong random strings
# CLOUDFLARE_TUNNEL_TOKEN:  from the Zero Trust dashboard

docker compose up -d --build
```

The `app` entrypoint auto-creates its runtime `.env`, generates the app key
if absent, waits for MySQL, runs `migrate --force`, seeds **once** (guarded by
`storage/.seeded`), and caches config/routes/views.

## Cloudflare tunnel (one-time dashboard step)

The tunnel is token-managed, so its routing lives in the Cloudflare **Zero
Trust → Networks → Tunnels** dashboard, not in this repo. Add a Public
Hostname to the tunnel:

- **Subdomain/hostname:** `baust.edu.bd` (and `www.baust.edu.bd`)
- **Service:** `http://baust_web_app:80`

`cloudflared` and `app` share the `frontend` docker network, so the container
name resolves as the service host.

## Common commands

```bash
docker compose ps                       # status
docker compose logs -f app              # app logs
docker compose logs -f cloudflared      # tunnel logs
docker compose exec app php artisan migrate --force
docker compose down                     # stop (volumes preserved)
```

Local health check (bypassing the tunnel): `curl http://localhost:8086/up`.

## Migrating to a VPS

Git carries the code only. Three things travel separately because they are
data or secrets: **`.env`**, the **database**, and the **uploaded files**
(`storage/app/public`, ~2.6 GB, inside the `baust_website_app_storage` volume).
Everything else git ignores is either rebuilt inside the Docker image
(`vendor`, `node_modules`, `public/build`, `resources/js/{actions,routes,wayfinder}`)
or scraper/scratch material the app never reads.

Shortcut for steps 1–3:

```bash
bash scripts/vps-export.sh                 # current machine -> ./vps-bundle/
scp -r vps-bundle user@VPS:/tmp/
# on the VPS:
git clone git@github.com:<you>/<repo>.git /opt/baust-website && cd /opt/baust-website
bash scripts/vps-import.sh /tmp/vps-bundle
```

The manual equivalent:

**1. On the current machine**, export the live data (run from the repo root):

```bash
# database -> ./backup.sql
docker compose exec mysql sh -c 'mysqldump -uroot -p"$MYSQL_ROOT_PASSWORD" --no-tablespaces baust_website > /tmp/dump.sql'
docker cp baust_web_mysql:/tmp/dump.sql ./backup.sql

# uploads -> ./storage-public.tgz
docker run --rm -v baust_website_app_storage:/s -v "$(pwd)":/out alpine tar czf /out/storage-public.tgz -C /s app/public
```

(PowerShell: use `${PWD}` instead of `$(pwd)`.)

**2. Copy them to the VPS** together with your production `.env`:

```bash
scp backup.sql storage-public.tgz .env user@VPS:/tmp/
```

**3. On the VPS** (Docker + compose plugin installed):

```bash
git clone git@github.com:<you>/<repo>.git /opt/baust-website
cd /opt/baust-website
mv /tmp/backup.sql /tmp/.env .
docker compose up -d --build           # mysql bootstraps itself from backup.sql

# restore uploads into the storage volume (82 = www-data in the image)
docker run --rm -v baust_website_app_storage:/s -v /tmp:/in alpine \
  sh -c 'tar xzf /in/storage-public.tgz -C /s && chown -R 82:82 /s/app/public'
curl http://localhost:8086/up
```

**4. Switch traffic.** The tunnel is token-based, so the same
`CLOUDFLARE_TUNNEL_TOKEN` works on the VPS. Stop the old stack
(`docker compose down`) once the VPS is healthy, so only one connector serves
the site. Uploads made on the old server after step 1 are lost, so avoid admin
edits during the switch.

Back up the VPS the same way as step 1 (cron the two commands): uploads and the
database exist only in its Docker volumes.

## CI/CD

`.github/workflows/`:

| Workflow     | Runs on                         | Does                                              |
|--------------|---------------------------------|---------------------------------------------------|
| `tests.yml`  | push / PR to `main`, `develop`  | Pest test suite                                   |
| `lint.yml`   | push / PR to `main`, `develop`  | Pint, Prettier, ESLint                            |
| `deploy.yml` | manual only (Actions tab → deploy → Run workflow); pushes do not deploy | SSH to the VPS, `git reset --hard origin/main`, `docker compose up -d --build`, health check |

One-time setup for `deploy.yml`:

1. On the VPS, create a deploy key the server uses to pull the repo
   (`ssh-keygen -t ed25519`, add the `.pub` as a read-only **Deploy key** on
   GitHub) and clone over SSH as in step 3 above.
2. Create a second key pair for GitHub Actions to log in to the VPS: append its
   `.pub` to `~/.ssh/authorized_keys` of the deploy user (who must be in the
   `docker` group).
3. In GitHub → **Settings → Secrets and variables → Actions** add secrets
   `VPS_HOST`, `VPS_USER`, `VPS_SSH_KEY` (the private key from step 2) and
   optionally `VPS_PORT`; add the variable `APP_DIR` (e.g. `/opt/baust-website`).

The deploy only touches tracked files, so `.env`, `backup.sql` and the Docker
volumes on the server are left alone. Run it by hand from the **Actions** tab
(`deploy` → *Run workflow*).
