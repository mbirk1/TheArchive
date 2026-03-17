import { DataSource } from 'typeorm';
import { join } from 'path';
import { allMigrations } from './migrations';

console.log(__dirname + '/migrations')
export const AppDataSource = new DataSource({
  synchronize: false,
  migrations: allMigrations,
  type: 'postgres',
  migrationsRun: false,
  migrationsTableName: 'migrations',
  migrationsTransactionMode: 'all',
  host: process.env.DB_HOST,
  port: parseInt(process.env.DB_PORT ?? '5432'),
  username: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: "postgres",
  entities: [join(__dirname, 'entities', '*.entity.{ts,js}')],
})