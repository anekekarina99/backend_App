import { Document } from 'mongoose';
import { Types } from 'mongoose';

export class IProfile extends Document {
  id: Types.ObjectId; // Assuming _id is stored as a string representation of ObjectId
  displayName: string;
  gender: string;
  birthday: Date;
  horoscope: string;
  zodiac: string;
  height: string;
  weight: string;
  interest: string[];
  profilePictureURL: string;

}

