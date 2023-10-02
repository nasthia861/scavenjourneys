import { Entity, Column, CreateDateColumn, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
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
  
  @ManyToOne(() => User, (user: User) => user.id)
  user: number;

  @ManyToOne(() => Journey, (journey: Journey) => journey.id)
  journey: number;


  @CreateDateColumn()
  created_at: Date;
}

module.exports = {
  Step
}