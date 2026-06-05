import { MixedList } from 'typeorm';
import { Migration1779993617040 } from './1779993617040-migration';
import { Migration1780179834131 } from './1780179834131-migration';
import { Migration1780655304161 } from './1780655304161-migration';
import { Migration1780658731443 } from './1780658731443-migration';
import { Migration1780659883636 } from './1780659883636-migration';

export const allMigrations: MixedList<string | Function> = [
  Migration1779993617040,
  Migration1780179834131,
  Migration1780655304161,
  Migration1780658731443,
  Migration1780659883636,
];
