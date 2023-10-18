import { Entity, Column, CreateDateColumn, PrimaryGeneratedColumn, ManyToOne, JoinColumn } from 'typeorm';
import { User } from './User'
import { Journey } from './Journey'

@Entity()
export class Step {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column({ default: "no hint, figure it out" })
  hint: string;

  @Column('json', { nullable: true })
  latitude: number;

  @Column('json', { nullable: true })
  longitude: number;

  @Column({ nullable: true })
  journeyId: number

  @ManyToOne(() => User, (user: User) => user.id)
  @JoinColumn()
  user: User;

  @ManyToOne(() => Journey, (journey: Journey) => journey.id)
  @JoinColumn()
  journey: Journey;

  @CreateDateColumn()
  created_at: Date;
}

module.exports = {
  Step
}