import { Journey } from "./Journey";
import { Entity, Column, CreateDateColumn, PrimaryGeneratedColumn, ManyToMany} from 'typeorm';

@Entity()
export class JourneyTag {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  // @Column()
  // tag_id: number;
  // @ManyToMany(() => Journey, (journey) => journey.tags)
  // journeys: Journey[]

  @CreateDateColumn()
  created_at: Date;
}

module.exports = {
  JourneyTag
}