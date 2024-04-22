import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Types } from 'mongoose';

@Schema()
export class Profile {
  @Prop({ type: Types.ObjectId, ref: 'User', required: true })
  _id: Types.ObjectId;

  @Prop({ required: true })
  displayName: string;

  @Prop({ required: true })
  gender: string;

  @Prop({ required: true })
  birthday: Date;

  @Prop({ required: true })
  horoscope: string;

  @Prop({ required: true })
  zodiac: string;

  @Prop({ required: true })
  height: string;

  @Prop({ required: true })
  weight: string;

  @Prop({ type: [String] })
  interest: string[];

  @Prop({ required: true })
  profilePictureURL: string;
}

export const ProfileSchema = SchemaFactory.createForClass(Profile);
