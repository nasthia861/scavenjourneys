import { Entity, Column, CreateDateColumn, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { Journey } from './Journey';
import { Step } from './Step';
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

  @OneToMany(() => Step, (step: Step) => step.id)
  step: Step;

  @CreateDateColumn()
  created_at: Date;

  @OneToMany(() => Journey, (journey: Journey) => journey.id)
  journey: Journey;
  static id: string;

}


module.exports = {
  User
}