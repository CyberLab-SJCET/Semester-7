CREATE TABLE IF NOT EXISTS "users" (
    "id" serial PRIMARY KEY,
    "username" varchar(255),
    "password" text,
    "email" varchar(255),
    "role" varchar(50) DEFAULT 'user',
    "created_at" timestamp DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS "roles" (
    "id" serial PRIMARY KEY,
    "name" varchar(50),
    "permissions" text,
    "description" text
);

INSERT INTO "roles" ("name", "permissions", "description") VALUES
('admin', '["all"]', 'Administrator with full access'),
('manager', '["read", "write", "manage_users"]', 'Manager with user management access'),
('user', '["read"]', 'Regular user with basic access');