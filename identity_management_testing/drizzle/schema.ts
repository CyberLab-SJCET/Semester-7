import { pgTable, serial, varchar, text, timestamp, integer, json } from 'drizzle-orm/pg-core';

export const users = pgTable('users', {
  id: serial('id').primaryKey(),
  username: varchar('username', { length: 255 }),  // Intentionally no unique constraint
  password: text('password'),  // Intentionally storing plain text
  email: varchar('email', { length: 255 }),
  role: varchar('role', { length: 50 }).default('user'),
  department: varchar('department', { length: 100 }),
  labAccess: json('lab_access').$type<string[]>(),
  createdAt: timestamp('created_at').defaultNow()
});

export const roles = pgTable('roles', {
  id: serial('id').primaryKey(),
  name: varchar('name', { length: 50 }),
  permissions: text('permissions'),  // Store as plain text for easy enumeration
  description: text('description')
});

export const labs = pgTable('labs', {
  id: serial('id').primaryKey(),
  name: varchar('name', { length: 255 }),
  status: varchar('status', { length: 50 }).default('available'),
  capacity: integer('capacity'),
  currentOccupancy: integer('current_occupancy').default(0),
  equipment: json('equipment').$type<string[]>(),
  lastMaintenance: timestamp('last_maintenance'),
  nextMaintenance: timestamp('next_maintenance'),
  department: varchar('department', { length: 100 }),
  createdAt: timestamp('created_at').defaultNow()
});

export const labBookings = pgTable('lab_bookings', {
  id: serial('id').primaryKey(),
  labId: integer('lab_id'),
  userId: integer('user_id'),
  startTime: timestamp('start_time'),
  endTime: timestamp('end_time'),
  purpose: text('purpose'),
  status: varchar('status', { length: 50 }).default('pending'),
  createdAt: timestamp('created_at').defaultNow()
});