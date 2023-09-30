const { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, ManyToOne, OneToMany } = require('typeorm');

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  username: string;

  @Column()
  img_url: string;

  @CreateDateColumn()
  created_at: Date;

  @OneToMany(() => Journey, (journey: Journey) => journey.user)
  journeys: Journey[];

  @OneToMany(() => Like, (like: Like) => like.user)
  likes: Like[];

  @OneToMany(() => UserAchievement, (userAchievement: UserAchievement) => userAchievement.user)
  achievements: UserAchievement[];

  @OneToMany(() => Step, (step: Step) => step.user)
  steps: Step[];
}

@Entity()
export class Journey {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  description: string;

  @Column('json', { nullable: true })
  location: { latitude: number; longitude: number };

  @Column()
  user_id: number;

  @Column()
  img_url: string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  last_modified_at: Date;

  @ManyToOne(() => User, (user: User) => user.journeys)
  user: User;

  @OneToMany(() => Step, (step: Step) => step.journey)
  steps: Step[];

  @OneToMany(() => JourneyTag, (tag: JourneyTag) => tag.journey)
  tags: JourneyTag[];

  @OneToMany(() => Like, (like: Like) => like.journey)
  likes: Like[];
}

@Entity()
export class Step {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column('json', { nullable: true })
  location: { latitude: number; longitude: number };

  @Column()
  journey_id: number;

  @Column()
  user_id: number;

  @CreateDateColumn()
  created_at: Date;

  @ManyToOne(() => Journey, (journey: Journey) => journey.steps)
  journey: Journey;

  @ManyToOne(() => User, (user: User) => user.steps)
  user: User;

  @OneToMany(() => StepProgress, (stepProgress: StepProgress) => stepProgress.step)
  progress: StepProgress[];
}

@Entity()
export class JourneyProgress {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  user_id: number;

  @Column()
  journey_id: number;

  @Column()
  difficulty: number;

  @Column()
  in_progress: boolean;

  @Column()
  started_at: Date;

  @Column()
  last_progress_at: Date;

  @ManyToOne(() => User, (user: User) => user.id)
  user: User;

  @ManyToOne(() => Journey, (journey: Journey) => journey.id)
  journey: Journey;

  @OneToMany(() => StepProgress, (stepProgress: StepProgress) => stepProgress.progress)
  stepProgress: StepProgress[];
}

@Entity()
export class StepProgress {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  journey_progress_id: number;

  @Column()
  step_id: number;

  @Column()
  in_progress: boolean;

  @Column()
  image_url: string;

  @Column()
  focus: boolean;

  @Column()
  started_at: Date;

  @ManyToOne(() => JourneyProgress, (journeyProgress: JourneyProgress) => journeyProgress.stepProgress)
  progress: JourneyProgress;

  @ManyToOne(() => Step, (step: Step) => step.progress)
  step: Step;
}

@Entity()
export class JourneyTag {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  tag_id: number;

  @Column()
  journey_id: number;

  @CreateDateColumn()
  created_at: Date;

  @ManyToOne(() => Journey, (journey: Journey) => journey.tags)
  journey: Journey;
}

@Entity()
export class Like {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  user_id: number;

  @Column()
  journey_id: number;

  @ManyToOne(() => User, (user: User) => user.likes)
  user: User;

  @ManyToOne(() => Journey, (journey: Journey) => journey.likes)
  journey: Journey;
}

@Entity()
export class Achievement {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  icon_url: string;
}

@Entity()
export class UserAchievement {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  achievement_id: number;

  @Column()
  user_id: number;

  @CreateDateColumn()
  created_at: Date;

  @ManyToOne(() => Achievement, (achievement: Achievement) => achievement.id)
  achievement: Achievement;

  @ManyToOne(() => User, (user: User) => user.achievements)
  user: User;
}
