import { Role } from '../users.schema';

export interface UserResponse {
  id: string;
  name: string;
  email: string;
  role: Role;
  enable: boolean;
}
