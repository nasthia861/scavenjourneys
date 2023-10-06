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

  @CreateDateColumn()
  created_at: Date;

  @OneToMany(() => Journey, (journey: Journey) => journey.id)
  journey: Journey;

}


module.exports = {
  User
}