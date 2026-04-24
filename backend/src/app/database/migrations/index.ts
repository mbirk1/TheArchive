import { MixedList } from 'typeorm';
import { Migration1776974964877 } from './1776974964877-migration';

export const allMigrations: MixedList<string | Function> = [
  Migration1776974964877,
];
