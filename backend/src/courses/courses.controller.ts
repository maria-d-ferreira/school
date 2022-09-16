import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Patch,
  UseGuards,
} from '@nestjs/common';

import { CreateCourseRequest } from './dto/create-course-request.dto';
import { CreateCourseResponse } from './dto/create-course-response.dto';
import { CoursesService } from './courses.service';

import { CourseDto } from './dto/course.dto';

@Controller('courses')
export class CoursesController {
  constructor(private readonly coursesService: CoursesService) {}

  @Post('/create')
  async createCourse(
    @Body() createCourseRequest: CreateCourseRequest,
  ): Promise<CreateCourseResponse> {
    return this.coursesService.createCourse(createCourseRequest);
  }

  @Get('/courses')
  async getCourses(): Promise<any> {
    return this.coursesService.getCourses();
  }

  // @Patch('/course/:id')
  // update(@Param('id') id: string, @Body() updateCourseDto: UpdateCourse) {
  //   return this.coursesService.updateCourse(id, updateCourseDto);
  // }

  // @Delete('/course/:id')
  // remove(@Param('id') id: string) {
  //   return this.coursesService.removeCourse(id);
  // }
}
