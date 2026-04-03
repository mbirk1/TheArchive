import { MixedList } from 'typeorm';
import { Migration1771710854528 } from './1771710854528-migration';

export const allMigrations: MixedList<string | Function> = [
  Migration1771710854528,
];
