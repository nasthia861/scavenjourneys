import { JourneyType } from "./Journey";
import { UserType } from "./User";

export type JourneyProgressType = {
  id: number;
  difficulty: number
  in_progress: boolean;
  started_at: string;
  last_progress_at: string;
  journey: JourneyType;
  user: UserType;
}