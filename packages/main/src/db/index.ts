import { drizzle } from 'drizzle-orm/tidb-serverless';
import { schema } from './schema';

export const db = drizzle(process.env.DATABASE_URL ?? '', {
    schema,
});
