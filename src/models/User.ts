import mongoose, { Schema, Document } from 'mongoose';
import bcrypt from 'bcrypt';

interface User extends Document {
  email: string;
  password: string;
  role: string;
  comparePassword: (candidatePassword: string) => Promise<boolean>;
}

const UserSchema: Schema = new Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, required: true, default: 'user' },
});

// Middleware: hashear la contraseña antes de guardar
UserSchema.pre<User>('save', async function (next) {
  if (!this.isModified('password')) return next(); // Si no se modificó, continuar

  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);

  next();
});

// Método para comparar contraseñas
UserSchema.methods.comparePassword = async function (candidatePassword: string) {
  return bcrypt.compare(candidatePassword, this.password);
};

export default mongoose.models.User || mongoose.model<User>('User', UserSchema, 'users');
