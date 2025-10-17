CREATE TABLE IF NOT EXISTS "labs" (
    "id" serial PRIMARY KEY,
    "name" varchar(255),
    "status" varchar(50) DEFAULT 'available',
    "capacity" integer,
    "current_occupancy" integer DEFAULT 0,
    "equipment" json,
    "last_maintenance" timestamp,
    "next_maintenance" timestamp,
    "department" varchar(100),
    "created_at" timestamp DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS "lab_bookings" (
    "id" serial PRIMARY KEY,
    "lab_id" integer,
    "user_id" integer,
    "start_time" timestamp,
    "end_time" timestamp,
    "purpose" text,
    "status" varchar(50) DEFAULT 'pending',
    "created_at" timestamp DEFAULT NOW()
);

-- Initial lab data
INSERT INTO "labs" ("name", "status", "capacity", "equipment", "last_maintenance", "next_maintenance", "department") VALUES
('Computer Science Lab 101', 'available', 30, '["Desktop Computers", "Projector", "Whiteboard"]', NOW() - INTERVAL '30 days', NOW() + INTERVAL '60 days', 'Computer Science'),
('Electronics Lab 201', 'in-use', 25, '["Oscilloscopes", "Function Generators", "Circuit Boards"]', NOW() - INTERVAL '15 days', NOW() + INTERVAL '45 days', 'Electronics'),
('Physics Lab 301', 'maintenance', 20, '["Microscopes", "Spectrometers", "Lab Equipment"]', NOW() - INTERVAL '45 days', NOW() + INTERVAL '15 days', 'Physics'),
('Chemistry Lab 401', 'available', 24, '["Chemical Hood", "Glassware", "Centrifuge"]', NOW() - INTERVAL '20 days', NOW() + INTERVAL '40 days', 'Chemistry');

-- Sample bookings
INSERT INTO "lab_bookings" ("lab_id", "user_id", "start_time", "end_time", "purpose", "status") VALUES
(1, 1, NOW() + INTERVAL '1 day', NOW() + INTERVAL '2 days', 'Programming Workshop', 'approved'),
(2, 2, NOW() + INTERVAL '3 days', NOW() + INTERVAL '4 days', 'Circuit Design Lab', 'pending'),
(3, 3, NOW() + INTERVAL '5 days', NOW() + INTERVAL '6 days', 'Physics Experiment', 'rejected'),
(4, 4, NOW() + INTERVAL '7 days', NOW() + INTERVAL '8 days', 'Chemical Analysis', 'approved');