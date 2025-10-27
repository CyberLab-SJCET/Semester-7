#!/bin/bash

echo "Starting database container..."
sudo docker compose up db -d

echo "Waiting for database to be ready..."
until sudo docker compose logs db | grep -q "database system is ready to accept connections"; do
    echo "Waiting for database to start..."
    sleep 2
done
echo "Database is ready!"

echo "Installing dependencies..."
npm i

echo "Pushing database schema..."
npx drizzle-kit push

echo "Did the database schema push successfully? (Y/N): "
read answer

if [ "$answer" = "Y" ] || [ "$answer" = "y" ]; then
    sudo docker compose down
fi
