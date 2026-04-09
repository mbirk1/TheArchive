import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'user' })
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'varchar', length: 500 })
  name: string;

  @Column({ type: 'varchar', length: 500 })
  mail: string;

  @Column({ type: 'varchar' })
  password: string;

  @Column()
  createdAt: Date;

  @Column()
  lastActiveAt: Date;
}
