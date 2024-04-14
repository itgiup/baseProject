import { Schema, Document, model, Model } from "mongoose";

enum Role {
  ADMIN = 'admin',
  USER = 'user'
}

interface IUser {
  username: string,
  password: string,
  role: Role,
  createdAt: Date,
  updatedAt: Date
}
interface IUserDocument extends Document, IUser {

}
interface IUserModel extends Model<IUserDocument> {

}

const schema = new Schema<IUser>({
  username: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    enum: Role,
    required: true,
    default: Role.USER,
  }
}, {
  timestamps: true
});

const User = model<IUser, IUserModel>("User", schema);

export {
  User,
  IUserDocument,
  IUserModel,
  IUser,
  Role
}
export default User;