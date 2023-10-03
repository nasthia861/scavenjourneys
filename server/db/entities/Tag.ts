import { Journey } from "./Journey";
import { Entity, Column, CreateDateColumn, PrimaryGeneratedColumn, ManyToMany} from 'typeorm';

@Entity()
export class Tag {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @CreateDateColumn()
  created_at: Date;
}

module.exports = {
  Tag
}