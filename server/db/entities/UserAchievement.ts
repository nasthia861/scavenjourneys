import { Entity, CreateDateColumn, PrimaryGeneratedColumn, ManyToOne, JoinColumn, Column } from 'typeorm';
import { User } from './User'
import { Achievement } from './Achievement'

@Entity()
export class UserAchievement {
  @PrimaryGeneratedColumn()
  id: number;

  @CreateDateColumn()
  createdAt: Date;

  @ManyToOne(() => Achievement, (achievement: Achievement) => achievement.id)
  @JoinColumn()
  achievement: Achievement;

  @ManyToOne(() => User, (user: User) => user.id)
  @JoinColumn()
  user: User;

}

module.exports = {
  UserAchievement
}