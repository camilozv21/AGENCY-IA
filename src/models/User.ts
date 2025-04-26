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

UserSchema.methods.comparePassword = async function (candidatePassword: string) {
  console.log("Comparando contraseña:", candidatePassword);
  console.log("Con el hash almacenado:", this.password);
  const isMatch = await bcrypt.compare(candidatePassword, this.password);
  console.log("¿Las contraseñas coinciden?", isMatch);
  return isMatch;
};

// Método para comparar contraseñas
UserSchema.methods.comparePassword = async function (candidatePassword: string) {
  return bcrypt.compare(candidatePassword, this.password); // Compara la contraseña enviada con el hash
};



export default mongoose.models.User || mongoose.model<User>('User', UserSchema, 'users');
