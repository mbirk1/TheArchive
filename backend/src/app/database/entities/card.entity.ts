import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'card' })
export class Card {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'varchar', length: 500 })
  name: string;

  @Column({ type: 'varchar', length: 500 })
  test: string;

  @Column({ type: 'varchar' })
  dump: string;
}
