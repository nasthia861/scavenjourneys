import { Entity, Column, CreateDateColumn, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { Journey } from './Journey'

@Entity()
export class JourneyTag {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  tag_id: number;

  @ManyToOne(() => Journey, (journey: Journey) => journey.id)
  journey_id: Journey;

  @CreateDateColumn()
  created_at: Date;
}

module.exports = {
  JourneyTag
}