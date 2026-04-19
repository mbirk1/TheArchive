import { Card } from './card.entity';
import { EntitySchema, MixedList } from 'typeorm';
import { User } from './user.entity';

export const allEntities: MixedList<string | Function | EntitySchema<any>> = [
  Card,
  User
];
