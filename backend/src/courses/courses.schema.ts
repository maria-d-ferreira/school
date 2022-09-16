import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ObjectID } from 'bson';
import { Exclude, Transform } from 'class-transformer';

import { Document, ObjectId } from 'mongoose';

@Schema({ versionKey: false })
export class Course extends Document {
  @Prop({ required: true, unique: true, lowercase: true })
  title: string;

  // @Prop({ required: true, lowercase: true })
  // teacher: { id: ObjectId; name: string };

  @Prop({ required: true, lowercase: true })
  teacher: string;

  //@Prop({ required: true })
  @Prop()
  start: Date;

  //@Prop({ required: true })
  @Prop()
  end: Date;

  @Prop()
  url: string;

  @Prop()
  classwork: [string];

  @Prop()
  students: [{ id: ObjectId; grade: number; classwork: [string] }];
}

export const CoursesSchema = SchemaFactory.createForClass(Course);
