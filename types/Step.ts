
export type StepType = {
  journeyId: number;
  id: number;
  name: string;
  hint: string;
  location: {
    latitude: string,
    longitude: string
  };
  user_id: number;
  created_at: string;
}