import { drizzle } from 'drizzle-orm/node-postgres';
import { migrate } from 'drizzle-orm/node-postgres/migrator';
import { Pool } from 'pg';
import * as schema from './schema';

const pool = new Pool({
  connectionString: process.env.DATABASE_URL || 'postgresql://admin:admin123@localhost:5432/vulnerable_dashboard'
});

const db = drizzle(pool, { schema });

async function main() {
  console.log('Migration started...');
  await migrate(db, { migrationsFolder: 'drizzle/migrations' });
  console.log('Migration completed.');
  await pool.end();
}

main().catch((err) => {
  console.error('Migration failed:', err);
  process.exit(1);
});