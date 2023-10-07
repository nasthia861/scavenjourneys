//Journey interface used to access Journey props
export type JourneyType = {
  id: number;
  name: string;
  description: string;
  location: Location;
  user_id: number;
  img_url: string;
  user: {username: string};
  tag: {name: string}
  created_at: string;
  last_modified_at: string;
}
