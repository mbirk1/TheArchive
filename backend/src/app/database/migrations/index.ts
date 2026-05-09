import { MixedList } from 'typeorm';
import { Migration1776974964877 } from './1776974964877-migration';
import { Migration1778364681598 } from './1778364681598-migration';

export const allMigrations: MixedList<string | Function> = [
  Migration1776974964877,
  Migration1778364681598,
];
