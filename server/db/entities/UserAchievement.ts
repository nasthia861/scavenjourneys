import { Entity, CreateDateColumn, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { User } from './User'
import { Achievement } from './Achievement'

@Entity()
export class UserAchievement {
  @PrimaryGeneratedColumn()
  id: number;

  @CreateDateColumn()
  created_at: Date;

  @ManyToOne(() => Achievement, (achievement: Achievement) => achievement.id)
  achievement: Achievement;

  @ManyToOne(() => User, (user: User) => user.id)
  user: User;

}

module.exports = {
  UserAchievement
}