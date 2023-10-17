import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Achievement {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  conditionText: string;

  @Column()
  icon_url: string;
}

module.exports = {
  Achievement
}