import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { Course } from './courses.schema';
import { CreateCourseRequest } from './dto/create-course-request.dto';

@Injectable()
export class CoursesRepository {
  constructor(
    @InjectModel(Course.name)
    private readonly course: Model<Course>,
  ) {}

  async insertOne(data: CreateCourseRequest): Promise<Course> {
    const course = new this.course(data);
    return course.save();
  }

  async findOne(title: string): Promise<Course> {
    return this.course.findOne({ title: title });
  }

  async findById(id: string): Promise<Course> {
    return this.course.findById(id);
  }

  async findAll(): Promise<Course[]> {
    return this.course.find().exec();
  }

  async updateOne(id: string, data: Partial<Course>): Promise<Course> {
    return this.course.findByIdAndUpdate(id, data, { new: true });
  }

  async removeOne(id: string): Promise<Course> {
    return this.course.findByIdAndRemove(id);
  }

  async addTeacher(id: string, data: Partial<Course>): Promise<Course> {
    return this.course.findByIdAndUpdate(id, { teacher: data }, { new: true });
  }

  async removeTeacher(course: string): Promise<Course> {
    return this.course.findByIdAndUpdate(
      course,
      { teacher: {} },
      { new: true },
    );
  }

  async addStudent(data: Partial<Course>, course: string): Promise<any> {
    return this.course.findByIdAndUpdate(
      course,
      { $addToSet: { students: data } },
      {
        new: true,
      },
    );
  }

  async removeStudent(student: string, course: string): Promise<Course> {
    return this.course.findByIdAndUpdate(
      course,
      { $pull: { students: { id: student } } },
      { new: true },
    );
  }
}
