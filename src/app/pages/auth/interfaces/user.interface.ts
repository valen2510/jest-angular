export interface UserCheck {
  exists: boolean;
}

export interface UserInfo {
  name: string;
  email: string;
  password: string;
  category: number[];
}

export interface User {
  username: string;
  userId?: string;
  password?: string;
}
