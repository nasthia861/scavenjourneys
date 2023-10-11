import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, Index } from 'typeorm';
import { User } from './User'
import { Journey } from './Journey'

@Entity()
@Index(['id', 'journey'], { unique: true })
export class JourneyProgress {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: true})
  difficulty: number;

  @Column({ default: true})
  in_progress: boolean;

  @Column({ default: () => "NOW()"})
  started_at: Date;

  @Column({ default: () => "NOW()"})
  last_progress_at: Date;

  @ManyToOne(() => User, (user: User) => user.id)
  user: User;

  @ManyToOne(() => Journey, (journey: Journey) => journey.id)
  journey: Journey;
}

module.exports = {
  JourneyProgress
}