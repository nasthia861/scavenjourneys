import { UserType } from "./User";
import { TagType } from "./Tag";
//Journey interface used to access Journey props
export type JourneyType = {
  id: number;
  name: string;
  description: string;
  location: Location;
  img_url: string;
  user: UserType;
  tag: TagType
  created_at: string;
  last_modified_at: string;
}
