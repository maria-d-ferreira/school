import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Exclude, Transform } from 'class-transformer';

import { Document, ObjectId } from 'mongoose';

export type Role = 'admin' | 'teacher' | 'student';

@Schema({ versionKey: false })
export class User extends Document {
  @Prop({ required: true })
  name: string;

  @Prop({ required: true, unique: true, lowercase: true })
  email: string;

  @Prop({ required: true })
  @Exclude()
  password: string;

  @Prop()
  role: Role;

  @Prop()
  enable: boolean;
}

export const UserSchema = SchemaFactory.createForClass(User);
