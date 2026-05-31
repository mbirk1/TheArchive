import { MixedList } from 'typeorm';
import { Migration1779993617040 } from './1779993617040-migration';
import { Migration1780179834131 } from './1780179834131-migration';

export const allMigrations: MixedList<string | Function> = [
  Migration1779993617040,
  Migration1780179834131
];
