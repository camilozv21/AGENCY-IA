import mongoose, { Schema, Document } from 'mongoose';

interface User extends Document {
  email: string;
  password: string;
}

const UserSchema: Schema = new Schema(
  {
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: { type: String, required: true, default: 'user' },
  }
);

export default mongoose.models.User || mongoose.model<User>('User', UserSchema, 'users');