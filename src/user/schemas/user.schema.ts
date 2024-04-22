import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Types } from 'mongoose';

export type UserDocument = User & Document;

@Schema()
export class User {
  @Prop({ required: true })
  id: string;

  @Prop({ required: true })
  password: string; // Store hashed password securely

  @Prop({ required: true, unique: true })
  email: string;

  @Prop({ default: Date.now })
  createdAt: Date;

}

export const UserSchema = SchemaFactory.createForClass(User);
