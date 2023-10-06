import { Entity, Column, CreateDateColumn, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { Journey } from './entities/Journey'

@Entity()
export class JourneyTag {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  tag_id: number;

  @CreateDateColumn()
  created_at: Date;

  @ManyToOne(() => Journey, (journey: Journey) => journey.id)
  journey: Journey;

}

module.exports = {
  JourneyTag
}