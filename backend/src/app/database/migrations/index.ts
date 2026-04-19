import { MixedList } from 'typeorm';
import { Migration1771710854528 } from './1771710854528-migration';
import { Migration1776605335575 } from './1776605335575-migration';

export const allMigrations: MixedList<string | Function> = [
  Migration1771710854528,
  Migration1776605335575
];
