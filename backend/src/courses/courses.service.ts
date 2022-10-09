import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';

import { CreateCourseRequest } from './dto/create-course-request.dto';
import { CreateCourseResponse } from './dto/create-course-response.dto';

import { Course } from './courses.schema';
import { CoursesRepository } from './courses.repository';

import { UsersRepository } from 'src/users/users.repository';
import { AssignTeacherDto } from './dto/assign-teacher.dto';

@Injectable()
export class CoursesService {
  constructor(
    private readonly coursesRepository: CoursesRepository,
    private readonly usersRepository: UsersRepository,
  ) {}

  async create(
    createCourseRequest: CreateCourseRequest,
  ): Promise<CreateCourseResponse> {
    await this.validateCreateCourse(createCourseRequest);

    const course = await this.coursesRepository.insertOne({
      title: createCourseRequest.title,
      description: createCourseRequest.description,
      start: createCourseRequest.start,
      end: createCourseRequest.start,
    });
    return course;
  }
  // ---------------------------------------------------------------
  private async validateCreateCourse(
    createCourseRequest: CreateCourseRequest,
  ): Promise<CreateCourseResponse> {
    const course = await this.coursesRepository.findOne(
      createCourseRequest.title,
    );

    if (course) {
      throw new BadRequestException('Course already exits !');
    }
    return course;
  }

  // ---------------------------------------------------------------

  async getCourses(): Promise<Course[]> {
    const courses = await this.coursesRepository.findAll();

    return courses;
  }

  // ---------------------------------------------------------------

  async deleteCourse(id: string): Promise<Course> {
    const course = await this.coursesRepository.removeOne(id);
    if (!course) {
      throw new NotFoundException(`Course not Found !`);
    }
    return course;
  }

  // ---------------------------------------------------------------

  async assignTeacher(teacherId: string, course: string): Promise<any> {
    let name = '';
    try {
      const findTeacher = await this.usersRepository.findOneById(teacherId);
      name = findTeacher.name;

      if (!findTeacher) {
        throw new NotFoundException('User not found !');
      }

      const res = await this.coursesRepository.findById(course);
      if (!res) {
        throw new NotFoundException('Class not found !');
      }
    } catch (error) {
      throw new NotFoundException(error.message);
    }
    const data = { id: teacherId, name: name };
    const res = await this.coursesRepository.addTeacher(course, data);
  }

  async removeTeacher(course: string): Promise<any> {
    const res = await this.coursesRepository.removeTeacher(course);
  }

  async addStudent(student: string, course: string): Promise<any> {
    let name = '';
    try {
      const findStudent = await this.usersRepository.findOneById(student);
      name = findStudent.name;

      if (!findStudent) {
        throw new NotFoundException('Student not found !');
      }

      const findCourse = await this.coursesRepository.findById(course);
      if (!findCourse) {
        throw new NotFoundException('Class not found!');
      }
    } catch (error) {
      throw new NotFoundException(error.message);
    }
    const data = { id: student, name: name };
    const res = await this.coursesRepository.addStudent(data, course);
  }

  async removeStudent(student: string, course: string): Promise<any> {
    const res = await this.coursesRepository.removeStudent(student, course);
  }
}
