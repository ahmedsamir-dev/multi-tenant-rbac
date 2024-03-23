import { Pool } from 'pg';
import { drizzle } from 'drizzle-orm/node-postgres';
import env from '../modules/shared/env';
import { logger } from '../modules/shared/logger';

const poolConnection = new Pool({
  connectionString: env.POSTGRES_URL,
});

poolConnection.on('error', (err) => {
  logger.error('Unexpected error on idle client', err);
  process.exit(-1);
});

poolConnection.on('connect', () => {
  logger.info('PostgreSQL connected');
});

const database = drizzle(poolConnection);

export default database;
