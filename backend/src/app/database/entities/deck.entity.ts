import { Entity, ManyToMany, ManyToOne, PrimaryColumn } from 'typeorm';
import { ICard, IDeck } from 'lib';
import { Card } from './card.entity';
import { User } from './user.entity';

@Entity('deck', { schema: 'sideboard' })
export class Deck implements IDeck {
  @PrimaryColumn({ type: 'uuid' })
  id: string;

  @ManyToOne(() => User, (user) => user.decks)
  user: User;

  @ManyToMany((type) => Card, (card) => card.decks)
  cards: ICard[];
}
