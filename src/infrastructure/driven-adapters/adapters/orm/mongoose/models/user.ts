import {model, Schema} from "mongoose";
import {UserModel} from '@/domain/models/user';

const schema = new Schema<UserModel>({
  id: String,
  firstName: String,
  lastName: String,
  email: String,
  password: String,
  roles: Array<String>
});

export const UserModelSchema = model<UserModel>('users', schema);