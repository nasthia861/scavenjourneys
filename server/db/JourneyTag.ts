import { Entity, Column, CreateDateColumn, PrimaryGeneratedColumn} from 'typeorm';

@Entity()
export class JourneyTag {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  // @Column()
  // tag_id: number;

  @CreateDateColumn()
  created_at: Date;
}

module.exports = {
  JourneyTag
}