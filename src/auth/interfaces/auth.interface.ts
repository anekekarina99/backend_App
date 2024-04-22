import { Document } from 'mongoose';
import { Types } from 'mongoose';

export class IAuth extends Document {
  password: string;
  email: string;

}
