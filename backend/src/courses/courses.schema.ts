import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';
import { Document, ObjectId } from 'mongoose';

@Schema({ versionKey: false })
export class Course extends Document {
  @Prop()
  id: string;

  @Prop({ required: true, unique: true })
  title: string;

  @Prop({ required: true })
  description: string;

  @Prop({ required: true })
  @Prop()
  start: Date;

  @Prop({ required: true })
  @Prop()
  end: Date;

  @Prop({ type: {} })
  teacher: { id: string; name: string };

  @Prop({ type: [] })
  classwork: [string];

  @Prop({ type: [{}] })
  students: [
    { id?: string; name?: string; grade?: number; classwork?: [string] },
  ];
}

export const CourseSchema = SchemaFactory.createForClass(Course);

// @Prop(({ type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Users' }] }))
// students: Users[];
