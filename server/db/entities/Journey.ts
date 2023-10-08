import { Entity, Column, CreateDateColumn, PrimaryGeneratedColumn, UpdateDateColumn, ManyToOne, ManyToMany, JoinTable, JoinColumn, OneToMany } from 'typeorm';
import { User } from './User';
import { Tag } from './Tag';
import { Step } from './Step';

@Entity()
export class Journey {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  description: string;

  @Column('json', { nullable: true })
  latitude: number;

  @Column('json', { nullable: true })
  longitude: number;

  @Column()
  img_url: string;

  @Column({ nullable: true })
  userId: number

  @ManyToOne(() => User, (user: User) => user.id)
  @JoinColumn()
  user: User;

  //switch to Manytomany once done with fake data
  @Column({ nullable: true })
  tagId: number

  @ManyToOne(() => Tag, (tag: Tag) => tag.id)
  @JoinColumn()
  tag: Tag;

  //jointable once we are no longer using fake data
  // @ManyToMany(() => Tag)
  // @JoinTable({
  //   name: "journey_tag"
  // })
  // tags: Tag[]

  @OneToMany(() => Step, (step: Step) => step.id)
  step: Step;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  last_modified_at: Date;
}

module.exports = {
  Journey
}