import { User } from 'src/users';

export interface CheckTokenResponse {
  user: User;
  token: string;
}
