import { IsEmail, IsString, IsNotEmpty } from 'class-validator';

export class UpdateUser {
  @IsString()
  name: string;

  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsString()
  @IsNotEmpty()
  password: string;
}
