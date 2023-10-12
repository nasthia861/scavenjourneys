import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { Step } from './Step'
import { JourneyProgress } from './JourneyProgress'

@Entity()
export class StepProgress {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ default: true })
  in_progress: boolean;

  @Column({ nullable: true })
  image_url: string ;

  @Column({ default: () => "NOW()"})
  started_at: Date;

  @ManyToOne(() => JourneyProgress, (journeyProgress: JourneyProgress) => journeyProgress.id)
  journey_progress: JourneyProgress;

  @ManyToOne(() => Step, (step: Step) => step.id)
  step: Step;
}

module.exports = {
  StepProgress
}