import { User } from 'src/users';

export interface LoginResponse {
  user: User;
  token: string;
}
