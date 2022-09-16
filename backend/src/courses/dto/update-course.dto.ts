import { IsEmail, IsString, IsNotEmpty } from 'class-validator';

export class UpdateUser {
  @IsString()
  title: string;

  @IsNotEmpty()
  teacher: string;

  //@IsNotEmpty()
  start: Date;

  //@IsNotEmpty()
  end: Date;

  //@IsNotEmpty()
  url: Date;
}
