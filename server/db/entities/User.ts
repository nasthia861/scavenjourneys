import { Entity, Column, CreateDateColumn, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  username: string;

  @Column()
  img_url: string;

  @Column()
  google_id: string;

  @CreateDateColumn()
  created_at: Date;
}

module.exports = {
  User
}