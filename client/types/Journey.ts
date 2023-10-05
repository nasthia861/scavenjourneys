import { User } from './User'
//Journey interface used to access Journey props
 export interface Journey {
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
};

 export interface JourneyProgress {

  id: number;
  difficulty: number;
  in_progress: boolean;
  started_at: Date;
  last_progress_at: Date;
  user: User; 
  journey: Journey; 
};


