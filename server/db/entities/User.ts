import { Entity, Column, CreateDateColumn, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { Journey } from './Journey';
@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  username: string;

  @Column()
  img_url: string;

  @Column()
  google_id: string;

  @OneToMany(() => Journey, (journey: Journey) => journey.id)
  journey: Journey;

  @CreateDateColumn()
  created_at: Date;
}

module.exports = {
  User
}