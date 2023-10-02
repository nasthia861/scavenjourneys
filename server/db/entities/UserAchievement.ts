import { Entity, CreateDateColumn, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { User } from './User'
import { Achievement } from './Achievement'

@Entity()
export class UserAchievement {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Achievement, (achievement: Achievement) => achievement.id)
  achievement_id: Achievement;

  @ManyToOne(() => User, (user: User) => user.id)
  user_id: User;

  @CreateDateColumn()
  created_at: Date;
}

module.exports = {
  UserAchievement
}