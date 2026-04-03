import { Card } from './card.entity';
import { EntitySchema, MixedList } from 'typeorm';

export const allEntities: MixedList<string | Function | EntitySchema<any>> = [
  Card,
];
