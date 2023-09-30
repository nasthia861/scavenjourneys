import { Entity, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { User } from './User'
import { Journey } from './Journey'

@Entity()
export class Likes {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => User, (user: User) => user.id)
  user_id: User;

  @ManyToOne(() => Journey, (journey: Journey) => journey.id)
  journey_id: Journey;
}

module.exports = {
  Likes
}