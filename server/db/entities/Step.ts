import { Entity, Column, CreateDateColumn, PrimaryGeneratedColumn, ManyToOne, JoinColumn } from 'typeorm';
import { User } from './User'
import { Journey } from './Journey'

@Entity()
export class Step {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column('json', { nullable: true })
  location: { latitude: number; longitude: number };

  @Column({ nullable: true })
  userId: number

  @ManyToOne(() => User, (user: User) => user.id)
  @JoinColumn()
  user: User;

  @Column({ nullable: true })
  journeyId: number

  @ManyToOne(() => Journey, (journey: Journey) => journey.id)
  @JoinColumn()
  journey: Journey;

  @CreateDateColumn()
  created_at: Date;
}

module.exports = {
  Step
}