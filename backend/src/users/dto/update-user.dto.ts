import { Exclude } from 'class-transformer';
import {
  IsEmail,
  IsString,
  IsNotEmpty,
  IsBoolean,
  IsOptional,
} from 'class-validator';

export class UpdateUser {
  @Exclude()
  @IsOptional()
  _id?: string;

  @IsOptional()
  @IsString()
  name: string;

  @IsEmail()
  @IsOptional()
  @IsNotEmpty()
  email: string;

  @IsString()
  @IsNotEmpty()
  @IsOptional()
  password: string;

  @IsOptional()
  @IsBoolean()
  enable?: boolean;
}
