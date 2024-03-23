import { migrate } from 'drizzle-orm/node-postgres/migrator';

export const migrateDatabase = async (database: any) => {
  await migrate(database, { migrationsFolder: './migrations' });
};
