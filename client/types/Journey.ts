//Journey interface used to access Journey props
export interface Journey {
  id: number;
  name: string;
  description: string;
  location: Location; 
  user_id: number;
  img_url: string;
  created_at: string; 
  last_modified_at: string;
}

