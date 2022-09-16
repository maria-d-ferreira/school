import { IsString, IsDate, IsNotEmpty } from 'class-validator';

export class CreateCourseRequest {
  @IsString()
  @IsNotEmpty()
  title: string;

  @IsNotEmpty()
  teacher: string;

  // @IsNotEmpty()
  start: Date;

  // @IsNotEmpty()
  end: Date;

  //@IsString()
  url: string;
}
