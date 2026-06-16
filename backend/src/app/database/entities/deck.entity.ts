import {
  Entity,
  JoinTable,
  ManyToMany,
  ManyToOne,
  PrimaryColumn, PrimaryGeneratedColumn
} from 'typeorm';
import { ICard, IDeck } from 'lib';
import { Card } from './card.entity';
import { User } from './user.entity';

@Entity('deck', { schema: 'archive' })
export class Deck implements IDeck {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => User, (user) => user.decks)
  user: User;

  @ManyToMany((type) => Card, (card) => card.decks)
  @JoinTable()
  cards: ICard[];
}
