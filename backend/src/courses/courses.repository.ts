import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { Course } from './courses.schema';

@Injectable()
export class CoursesRepository {
  constructor(
    @InjectModel(Course.name)
    private readonly course: Model<Course>,
  ) {}

  async insertOne(data: Partial<Course>): Promise<Course> {
    const course = new this.course(data);
    return course.save();
  }

  async findOne(title: string): Promise<Course> {
    return this.course.findOne({ title: title });
  }

  async findAll(): Promise<Course[]> {
    return this.course.find().exec();
  }
}

// async findOneById(courseId: string): Promise<Course> {
//   return this.course.findById(courseId);
// }

// async updateOne(courseId: string, data: Partial<Course>): Promise<Course> {
//   return this.user.findByIdAndUpdate(userId, data, { new: true });
// }

// async removeOne(courseId: string): Promise<Course> {
//   return this.course.findByIdAndRemove(courseId);
// }
