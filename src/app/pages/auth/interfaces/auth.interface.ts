export interface UserCheck {
  exists: boolean;
}

export interface User {
  name: string;
  email: string;
  password: string;
  category: number[];
}