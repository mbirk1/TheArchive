/**
 * This is not a production server yet!
 * This is only a minimal backend to get started.
 */

import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app/app.module';
import { AppDataSource } from './app/database/datasource';

async function bootstrap() {
  try {
    const dataSource = await AppDataSource.initialize();
    console.log('DataSource initialized.');

    const pendingMigrations = await dataSource.showMigrations();

    if (pendingMigrations) {
      console.log('Pending migrations found. Running migrations...');
      const migrations = await dataSource.runMigrations();
      migrations.forEach(m => console.log(`Migration executed: ${m.name}`));
    } else {
      console.log('No pending migrations.');
    }

    const app = await NestFactory.create(AppModule);
    const globalPrefix = 'api';
    app.setGlobalPrefix(globalPrefix);
    const port = process.env.PORT || 3000;
    await app.listen(port);

    Logger.log(
      `🚀 Application is running on: http://localhost:${port}/${globalPrefix}`,
    );
  } catch (err) {
    console.error('Error during bootstrap', err);
    process.exit(1);
  }
}

bootstrap().catch(err => {
  console.error(err);
});;
