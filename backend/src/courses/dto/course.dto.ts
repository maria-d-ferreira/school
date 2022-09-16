import { Expose, Exclude } from 'class-transformer';

export class CourseDto {
  title: string;
  teacher: string;
  start: string;
  end: string;
  url: string;
}
