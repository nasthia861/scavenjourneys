import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { Step } from './Step'
import { JourneyProgress } from './JourneyProgress'

@Entity()
export class StepProgress {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => JourneyProgress, (journeyProgress: JourneyProgress) => journeyProgress.id)
  journey_progress_id: JourneyProgress;

  @ManyToOne(() => Step, (step: Step) => step.id)
  step_id: Step;

  @Column()
  in_progress: boolean;

  @Column()
  image_url: string;

  @Column()
  focus: boolean;

  @Column()
  started_at: Date;
}

module.exports = {
  StepProgress
}