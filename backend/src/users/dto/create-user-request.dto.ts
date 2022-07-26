import { IsEmail, IsString, IsNotEmpty } from 'class-validator';

export class CreateUserRequest {
  @IsString()
  name: string;

  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsString()
  @IsNotEmpty()
  password: string;
}
