import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { User } from './User'
import { Journey } from './Journey'

@Entity()
export class JourneyProgress {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  difficulty: number;

  @Column()
  in_progress: boolean;

  @Column()
  started_at: Date;

  @Column()
  last_progress_at: Date;

  @ManyToOne(() => User, (user: User) => user.id )
  user: User;

  @ManyToOne(() => Journey, (journey: Journey) => journey.id)
  journey: Journey;
}

module.exports = {
  JourneyProgress
}