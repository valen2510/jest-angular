import { User } from "./user.interface";

export interface Login {
  user:         User;
  access_token: string;
  tokenType:    string;
}
