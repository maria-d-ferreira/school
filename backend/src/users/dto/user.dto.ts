import { Expose, Exclude } from 'class-transformer';
import { Role } from '../users.schema';

export class UserDto {
  @Expose()
  id: string;
  @Expose()
  name: string;
  @Expose()
  email: string;
  @Expose()
  role: Role;
}
