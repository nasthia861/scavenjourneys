import { Entity, Column, CreateDateColumn, PrimaryGeneratedColumn, UpdateDateColumn, ManyToOne, ManyToMany, JoinTable } from 'typeorm';
import { User } from './User'
import { Tag } from './Tag';

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

  @Column()
  img_url: string;

  @ManyToOne(() => User, (user: User) => user.id)
  user: number;
  
  @ManyToOne(() => Tag, (tag: Tag) => tag.id)
  tag: number;

  // @ManyToMany(() => Tag
  // , (tag) => tag.journeys, {
  //   cascade: true,}
  // )
  // @JoinTable()
  // tags: Tag[]

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  last_modified_at: Date;
}

module.exports = {
  Journey
}