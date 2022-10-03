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
import { Course } from './courses.schema';

//@Roles(Role.Admin)
@Controller('courses')
export class CoursesController {
  constructor(private readonly coursesService: CoursesService) {}

  // -------------------------------------------------------------

  @Post('/create')
  async createCourse(
    @Body() createCourseRequest: CreateCourseRequest,
  ): Promise<CreateCourseResponse> {
    return await this.coursesService.create(createCourseRequest);
  }
  // -------------------------------------------------------------

  @Get('/courses')
  async getCourses(): Promise<any> {
    return await this.coursesService.getCourses();
  }

  // -------------------------------------------------------------

  //@Roles(Role.Admin)
  @Delete('/course/:id')
  async deleteCourse(@Param('id') id: string) {
    return await this.coursesService.deleteCourse(id);
  }

  // -------------------------------------------------------------

  //@Roles(Role.Admin)
  @Patch('/assign-teacher/:teacher/:course')
  async assignTeacher(
    @Param('teacher') teacher: string,
    @Param('course') course: string,
  ): Promise<any> {
    return await this.coursesService.assignTeacher(teacher, course);
  }

  // -------------------------------------------------------------

  //@Roles(Role.Admin)
  @Patch('/remove-teacher/:course')
  async removeTeacher(@Param('course') course: string): Promise<any> {
    return await this.coursesService.removeTeacher(course);
  }

  // -------------------------------------------------------------
  //@Roles(Role.Admin)
  @Patch('/add-student/:student/:course')
  async addStudent(
    @Param('student') student: string,
    @Param('course') course: string,
  ): Promise<any> {
    return await this.coursesService.addStudent(student, course);
  }
  // -------------------------------------------------------------

  //@Roles(Role.Admin)
  @Patch('/remove-student/:student/:course')
  async removeStudent(
    @Param('student') student: string,
    @Param('course') course: string,
  ): Promise<any> {
    return await this.coursesService.removeStudent(student, course);
  }
  // -------------------------------------------------------------
}
