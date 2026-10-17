#!/bin/sh
set -e

echo "=========================================="
echo "  BAUST Website - Starting Up..."
echo "=========================================="

# Set system timezone if TZ is provided
if [ -n "$TZ" ] && [ -f "/usr/share/zoneinfo/$TZ" ]; then
    echo "[entrypoint] Setting system timezone to $TZ..."
    ln -snf "/usr/share/zoneinfo/$TZ" /etc/localtime
    echo "$TZ" > /etc/timezone
fi

# Require the secrets that must never fall back to a weak default.
: "${APP_KEY:?APP_KEY must be set (compose reads it from .env)}"
: "${DB_DATABASE:?DB_DATABASE must be set}"
: "${DB_USERNAME:?DB_USERNAME must be set}"
: "${DB_PASSWORD:?DB_PASSWORD must be set}"

# Create .env file from environment variables if it doesn't exist
if [ ! -f /var/www/html/.env ]; then
    echo "[entrypoint] Creating .env file from environment variables..."
    cat > /var/www/html/.env << EOF
APP_NAME="${APP_NAME:-BAUST}"
APP_ENV=${APP_ENV:-production}
APP_KEY=${APP_KEY}
APP_DEBUG=${APP_DEBUG:-false}
APP_URL=${APP_URL:-http://localhost}

APP_LOCALE=en
APP_FALLBACK_LOCALE=en
APP_FAKER_LOCALE=en_US

APP_MAINTENANCE_DRIVER=file

PHP_CLI_SERVER_WORKERS=4

BCRYPT_ROUNDS=12

LOG_CHANNEL=stack
LOG_STACK=single
LOG_DEPRECATIONS_CHANNEL=null
LOG_LEVEL=${LOG_LEVEL:-warning}

DB_CONNECTION=${DB_CONNECTION:-mysql}
DB_HOST=${DB_HOST:-mysql}
DB_PORT=${DB_PORT:-3306}
DB_DATABASE=${DB_DATABASE}
DB_USERNAME=${DB_USERNAME}
DB_PASSWORD=${DB_PASSWORD}

SESSION_DRIVER=${SESSION_DRIVER:-database}
SESSION_LIFETIME=120
SESSION_ENCRYPT=false
SESSION_PATH=/
SESSION_DOMAIN=null
SESSION_SECURE_COOKIE=${SESSION_SECURE_COOKIE:-true}

BROADCAST_CONNECTION=${BROADCAST_CONNECTION:-log}
FILESYSTEM_DISK=${FILESYSTEM_DISK:-local}
QUEUE_CONNECTION=${QUEUE_CONNECTION:-database}

CACHE_STORE=${CACHE_STORE:-database}

MAIL_MAILER=${MAIL_MAILER:-log}
MAIL_SCHEME=null
MAIL_HOST=${MAIL_HOST:-127.0.0.1}
MAIL_PORT=${MAIL_PORT:-2525}
MAIL_USERNAME=${MAIL_USERNAME:-null}
MAIL_PASSWORD=${MAIL_PASSWORD:-null}
MAIL_FROM_ADDRESS="${MAIL_FROM_ADDRESS:-hello@baust.edu.bd}"
MAIL_FROM_NAME="\${APP_NAME}"

TRUSTED_PROXIES=${TRUSTED_PROXIES:-*}

VITE_APP_NAME="\${APP_NAME}"
EOF
    chown www-data:www-data /var/www/html/.env
fi

# Generate app key if not set
if ! grep -q "^APP_KEY=base64:" /var/www/html/.env 2>/dev/null; then
    echo "[entrypoint] Generating application key..."
    php artisan key:generate --force
fi

# Wait for MySQL to be ready
echo "[entrypoint] Waiting for MySQL to be ready..."
MAX_RETRIES=30
RETRY_COUNT=0
until php -r "
    try {
        new PDO(
            'mysql:host=' . getenv('DB_HOST') . ';port=' . getenv('DB_PORT'),
            getenv('DB_USERNAME'),
            getenv('DB_PASSWORD')
        );
        exit(0);
    } catch (Exception \$e) {
        exit(1);
    }
" 2>/dev/null || [ $RETRY_COUNT -eq $MAX_RETRIES ]; do
    echo "[entrypoint] MySQL not ready yet... retrying ($((RETRY_COUNT+1))/$MAX_RETRIES)"
    RETRY_COUNT=$((RETRY_COUNT+1))
    sleep 2
done

if [ $RETRY_COUNT -eq $MAX_RETRIES ]; then
    echo "[entrypoint] WARNING: MySQL may not be fully ready, proceeding anyway..."
fi

# Run database migrations
echo "[entrypoint] Running database migrations..."
php artisan migrate --force || echo "[entrypoint] WARNING: migrate failed, continuing..."

# Seed the database ONCE (sentinel lives in the persistent storage volume)
SEED_SENTINEL=/var/www/html/storage/.seeded
if [ ! -f "$SEED_SENTINEL" ]; then
    # A volume bootstrapped from backup.sql already holds the real dataset, and
    # the sentinel is gone whenever the storage volume was recreated. Seeding on
    # top of real content would duplicate rows, so only seed an empty install.
    EXISTING_ROWS=$(php -r '
        try {
            $pdo = new PDO(
                "mysql:host=" . getenv("DB_HOST") . ";port=" . getenv("DB_PORT") . ";dbname=" . getenv("DB_DATABASE"),
                getenv("DB_USERNAME"),
                getenv("DB_PASSWORD")
            );
            echo (int) $pdo->query("SELECT COUNT(*) FROM users")->fetchColumn();
        } catch (Exception $e) {
            echo 0;
        }
    ' 2>/dev/null || echo 0)
fi

if [ ! -f "$SEED_SENTINEL" ] && [ "${EXISTING_ROWS:-0}" -gt 0 ]; then
    echo "[entrypoint] Database already populated (users=$EXISTING_ROWS) - skipping seeders."
    touch "$SEED_SENTINEL"
elif [ ! -f "$SEED_SENTINEL" ]; then
    echo "[entrypoint] First boot: seeding database..."
    if php artisan db:seed --force; then
        touch "$SEED_SENTINEL"
        echo "[entrypoint] Seeding complete."
    else
        echo "[entrypoint] WARNING: seeding failed, will retry on next boot."
    fi
else
    echo "[entrypoint] Database already seeded, skipping."
fi

# Cache configuration for performance
echo "[entrypoint] Caching configuration..."
php artisan config:cache || echo "[entrypoint] WARNING: config:cache failed, continuing..."
php artisan route:cache || echo "[entrypoint] WARNING: route:cache failed, continuing..."
php artisan view:cache || echo "[entrypoint] WARNING: view:cache failed, continuing..."

# Ensure public/storage is a symlink to storage/app/public
if [ -d /var/www/html/public/storage ] && [ ! -L /var/www/html/public/storage ]; then
    echo "[entrypoint] Migrating public/storage directory to persistent storage..."
    cp -rn /var/www/html/public/storage/* /var/www/html/storage/app/public/ 2>/dev/null || true
    rm -rf /var/www/html/public/storage
fi
php artisan storage:link || true

# Fix ownership of files created by root during entrypoint
chown -R www-data:www-data /var/www/html/storage /var/www/html/bootstrap/cache

echo "=========================================="
echo "  Application is ready!"
echo "  URL: ${APP_URL:-http://localhost}"
echo "=========================================="

# Execute the main process (supervisord)
exec "$@"
