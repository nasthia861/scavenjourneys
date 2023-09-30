import { Entity, Column, CreateDateColumn, PrimaryGeneratedColumn, UpdateDateColumn, ManyToOne } from 'typeorm';
import { User } from './User'

@Entity()
export class Journey {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  description: string;

  @Column('json', { nullable: true })
  location: { latitude: number; longitude: number };

  @ManyToOne(() => User, (user: User) => user.id)
  user_id: User;

  @Column()
  img_url: string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  last_modified_at: Date;
}

module.exports = {
  Journey
}