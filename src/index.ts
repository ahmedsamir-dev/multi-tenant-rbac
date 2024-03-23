import env from './modules/shared/env';
import database from './connections/postgre.connections';
import { migrateDatabase } from './orm/migrate';
import { logger } from './modules/shared/logger';
import controllers from './modules/shared/utils/controllersBuilder';
import App from './app';
async function main() {
  const app = new App(controllers, env.PORT);
  app.listen();

  migrateDatabase(database).then(() => {
    logger.info('Database migrated successfully');
  });
}

main().then(() => {});
