import { Journey } from "./Journey";
import { Icon } from '@mui/material';
import { Entity, Column, CreateDateColumn, PrimaryGeneratedColumn, ManyToMany, JoinTable} from 'typeorm';

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