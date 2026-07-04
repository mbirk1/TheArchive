import { Card } from './card.entity';
import { EntitySchema, MixedList } from 'typeorm';
import { User } from './user.entity';
import { Deck } from './deck.entity';

// eslint-disable-next-line
export const allEntities: MixedList<string | Function | EntitySchema<any>> = [
  Card,
  User,
  Deck,
];
