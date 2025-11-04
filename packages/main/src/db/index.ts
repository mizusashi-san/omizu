import { drizzle } from 'drizzle-orm/mysql2';
import { createPool } from 'mysql2/promise';
import { schema } from '@/db/schema';

const pool = createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
  connectionLimit: 3,
  connectTimeout: 5000,
  enableKeepAlive: true,
  keepAliveInitialDelay: 0,
  ssl: process.env.DB_SSL_ENABLED?.toLowerCase() === 'true' ? {} : undefined,
});

const drizzleClient = drizzle(pool, { schema, mode: 'default' });

const db = globalThis._db || drizzleClient;

declare global {
  var _db: typeof drizzleClient | undefined;
}

if (process.env.NODE_ENV !== 'production') {
  globalThis._db = db;
}

export { db };
