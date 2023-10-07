
export type StepType = {
  id: number;
  name: string;
  location: {
    latitude: string,
    longitude: string
  };
  journey_id: number;
  user_id: number;
  created_at: string;
}