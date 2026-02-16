import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'card' })
export class Card {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 500 })
  name: string;

  @Column()
  dump: string;
}
