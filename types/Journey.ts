import { UserType } from "./User";
import { TagType } from "./Tag";
//Journey interface used to access Journey props
export type JourneyType = {
  id: number;
  name: string;
  description: string;
  latitude: number;
  longitude: number
  img_url: string;
  user: UserType;
  tags: TagType[];
  created_at: string;
  last_modified_at: string;
}
