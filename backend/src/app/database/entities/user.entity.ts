import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { IUser } from 'lib';
import { Deck } from './deck.entity';

@Entity({ name: 'user' })
export class User implements IUser {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'varchar', length: 500, unique: true })
  userName: string;

  @Column({ type: 'varchar', length: 500, unique: true })
  email: string;

  @Column({ type: 'varchar' })
  password: string;

  @Column()
  createdAt: Date;

  @Column()
  lastActiveAt: Date;

  @OneToMany(() => Deck, (deck) => deck.user, {
    nullable: true,
    cascade: true,
  })
  decks: Deck[];

  @Column({ type: 'varchar', nullable: true })
  refreshToken: string;
}
