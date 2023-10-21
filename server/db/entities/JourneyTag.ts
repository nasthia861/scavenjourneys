import { Entity, CreateDateColumn, PrimaryGeneratedColumn, ManyToOne, JoinColumn } from 'typeorm';
import { Journey } from './Journey'
import { Tag } from './Tag'

@Entity()
export class JourneyTag {
  @PrimaryGeneratedColumn()
  id: number;

  @CreateDateColumn()
  createdAt: Date;

  @ManyToOne(() => Journey, (journey: Journey) => journey.id)
  @JoinColumn()
  journey: Journey;

  @ManyToOne(() => Tag, (tag: Tag) => tag.id)
  @JoinColumn()
  tag: Tag;

}

module.exports = {
  JourneyTag
}