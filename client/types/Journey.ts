import { User } from './User'
//Journey interface used to access Journey props
export type Journey = {
  id: number;
  name: string;
  description: string;
  location: {
    latitude: number;
    longitude: number;
  }
  ;
  user_id: number;
  img_url: string;
  created_at: string;
  last_modified_at: string;
}
