import { StepType } from "./Step";
import { JourneyProgressType } from "./JourneyProgress";

export type StepProgressType = {
  id: number;
  in_progress: boolean;
  started_at: string;
  image_url: string;
  journey_progress: JourneyProgressType
  step: StepType
}