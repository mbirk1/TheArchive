import {
  Entity,
  JoinColumn,
  JoinTable,
  ManyToMany,
  OneToOne,
  PrimaryColumn,
} from 'typeorm';
import { User } from './user.entity';
import { Card } from './card.entity';
import { ICollection } from 'lib';

@Entity('collection', { schema: 'archive' })
export class Collection implements ICollection {
  @PrimaryColumn({ type: 'uuid' })
  id: string;

  @OneToOne(() => User, { cascade: true })
  @JoinColumn({ name: 'user_id' })
  user: User;

  @ManyToMany((type) => Card, (card) => card.collections, { cascade: true })
  @JoinTable()
  cards: Card[];
}
