import { Entity, PrimaryColumn, JoinTable, OneToOne } from 'typeorm';
import { Journey } from './Journey'
import { Tag } from './Tag';

@Entity("journey_tag")
export class JourneyTag {

  @PrimaryColumn()
  journeyId: number;

    //delete and switch to Manytomany once done with fake data
  @PrimaryColumn()
  tagId: number;

  @OneToOne(() => Journey)
  @JoinTable()
  journey: Journey;

  @OneToOne(() => Tag)
  @JoinTable()
  tag: Tag;
}

module.exports = {
  JourneyTag
}