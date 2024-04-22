import { Document } from 'mongoose';
import { Types } from 'mongoose';

export class IUser extends Document {
  _id: Types.ObjectId;
  password: string;
  email: string;
  createdAt: Date;
}
