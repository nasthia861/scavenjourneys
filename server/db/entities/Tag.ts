import { Journey } from "./Journey";
import { Entity, Column, CreateDateColumn, PrimaryGeneratedColumn, OneToMany} from 'typeorm';

@Entity()
export class Tag {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @OneToMany(() => Journey, (journey: Journey) => journey.id)
  journey: Journey;

  @CreateDateColumn()
  created_at: Date;
}

module.exports = {
  Tag
}