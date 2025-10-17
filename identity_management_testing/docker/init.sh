#!/bin/sh
set -e

# Wait for the database to be ready
echo "Waiting for PostgreSQL to start..."
until PGPASSWORD=$POSTGRES_PASSWORD psql -h "$POSTGRES_HOST" -U "$POSTGRES_USER" -d "$POSTGRES_DB" -c '\q'; do
  echo "PostgreSQL is unavailable - sleeping"
  sleep 1
done

echo "PostgreSQL started"

# Check if our schema_version table exists
if PGPASSWORD=$POSTGRES_PASSWORD psql -h "$POSTGRES_HOST" -U "$POSTGRES_USER" -d "$POSTGRES_DB" -tc "SELECT to_regclass('public.schema_version')" | grep -q "schema_version"; then
  echo "Schema version table exists, checking migrations"
else
  echo "Creating schema version table..."
  PGPASSWORD=$POSTGRES_PASSWORD psql -h "$POSTGRES_HOST" -U "$POSTGRES_USER" -d "$POSTGRES_DB" -c "CREATE TABLE schema_version (version INTEGER PRIMARY KEY, applied_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP)"
fi

# Get the current schema version
CURRENT_VERSION=$(PGPASSWORD=$POSTGRES_PASSWORD psql -h "$POSTGRES_HOST" -U "$POSTGRES_USER" -d "$POSTGRES_DB" -tAc "SELECT COALESCE(MAX(version), -1) FROM schema_version")

# Apply migrations in order
for migration in /app/drizzle/migrations/[0-9]*.sql; do
  # Extract version number from filename (e.g., 0000 from 0000_initial.sql)
  VERSION=$(echo "$migration" | grep -o '[0-9]\{4\}')
  
  # Convert to integer by removing leading zeros
  VERSION_INT=$((10#$VERSION))
  
  if [ $VERSION_INT -gt $CURRENT_VERSION ]; then
    echo "Applying migration $migration..."
    PGPASSWORD=$POSTGRES_PASSWORD psql -h "$POSTGRES_HOST" -U "$POSTGRES_USER" -d "$POSTGRES_DB" -f "$migration"
    
    # Record the migration
    PGPASSWORD=$POSTGRES_PASSWORD psql -h "$POSTGRES_HOST" -U "$POSTGRES_USER" -d "$POSTGRES_DB" -c "INSERT INTO schema_version (version) VALUES ($VERSION_INT)"
    echo "Migration $migration applied successfully"
  fi
done

echo "Starting the application..."
exec "$@"