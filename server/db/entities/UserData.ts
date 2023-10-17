import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn } from 'typeorm';
import { User } from './User'

@Entity()
export class UserData {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => User, (user: User) => user.id)
  @JoinColumn()
  user: User;

  @Column()
  journeysCreated: number;

  @Column()
  stepsCreated: number;

  @Column()
  journeysTaken: number;

  @Column()
  stepsTaken: number;
}

module.exports = {
  UserData
}