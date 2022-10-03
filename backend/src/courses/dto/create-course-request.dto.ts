import { Transform } from 'class-transformer';
import { IsString, IsDate, MinDate, IsNotEmpty } from 'class-validator';

const validDate = new Date();
validDate.setDate(validDate.getDate() + 1);
validDate.toLocaleString();
export class CreateCourseRequest {
  @IsString()
  @IsNotEmpty()
  title: string;

  @IsString()
  @IsNotEmpty()
  description: string;

  @Transform(({ value }) => new Date(value))
  @IsDate()
  @MinDate(validDate)
  @IsNotEmpty()
  start: Date;

  @Transform(({ value }) => new Date(value))
  @IsDate()
  @MinDate(validDate)
  @IsNotEmpty()
  end: Date;
}
