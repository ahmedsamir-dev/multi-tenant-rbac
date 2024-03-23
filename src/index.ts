import env from './modules/shared/env';
import database from './connections/postgre.connections';
import { migrateDatabase } from './orm/migrate';
import App from './app';
import { logger } from './modules/shared/logger';
async function main() {
  const app = new App([], env.PORT);
  app.listen();

  migrateDatabase(database).then(() => {
    logger.info('Database migrated successfully');
  });
}

main().then(() => {});
