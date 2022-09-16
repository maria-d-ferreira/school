import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';

import { CreateCourseRequest } from './dto/create-course-request.dto';
import { CreateCourseResponse } from './dto/create-course-response.dto';

import { Course } from './courses.schema';
import { CoursesRepository } from './courses.repository';

@Injectable()
export class CoursesService {
  constructor(private readonly coursesRepository: CoursesRepository) {}

  async createCourse(
    createCourseRequest: CreateCourseRequest,
  ): Promise<CreateCourseResponse> {
    await this.validateCreateCourseRequest(createCourseRequest);
    const course = await this.coursesRepository.insertOne({
      ...createCourseRequest,
    });
    return course;
  }

  private async validateCreateCourseRequest(
    createCourseRequest: CreateCourseRequest,
  ): Promise<Course> {
    const course = await this.coursesRepository.findOne(
      createCourseRequest.title,
    );
    if (course) {
      throw new BadRequestException('Course already exits!');
    }
    return course;
  }

  async getCourses(): Promise<Course[]> {
    const courses = await this.coursesRepository.findAll();
    if (courses.length === 0) {
      throw new NotFoundException(`No courses found `);
    }
    return courses;
  }
}

//   async getCourseById(courseId: string): Promise<CreateCourseResponse> {
//     const user = await this.usersRepository.findOneById(userId);
//     if (!user) {
//       throw new NotFoundException(`User not found by _id: '${userId}'.`);
//     }
//     return this.buildResponse(user);
//   }

//   async updateUser(userId: string, data: Partial<User>): Promise<UserResponse> {
//     const user = await this.usersRepository.updateOne(userId, data);
//     if (!user) {
//       throw new NotFoundException(`User not found by _id: '${userId}'.`);
//     }
//     return this.buildResponse(user);
//   }

//   async removeUser(userId: string): Promise<UserResponse> {
//     const user = await this.usersRepository.removeOne(userId);
//     if (!user) {
//       throw new NotFoundException(`User not found by _id: '${userId}'.`);
//     }
//     return this.buildResponse(user);
//   }

//   private buildResponse(course: Course): CreateCourseResponse {
//     return {
//       //id: course.id,
//       title: course.title,
//       teacher: course.teacher.name,
//       start: course.start,
//       end: course.end,
//       url: course.url,
//     };
//   }
// }
