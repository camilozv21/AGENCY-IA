import mongoose, { Schema, Document } from 'mongoose';
import bcrypt from 'bcrypt';

interface User extends Document {
  email: string;
  password: string;
  role: string;  
  tokensQuantity: number;
  tokensExpDate: Date | null;
  comparePassword: (candidatePassword: string) => Promise<boolean>;
}

const UserSchema: Schema = new Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, required: true, default: 'user' },
  tokensQuantity: { type: Number, default: 10 },
  tokensExpDate: { type: Date, default: null }
});

UserSchema.methods.comparePassword = async function (candidatePassword: string) {
  const isMatch = await bcrypt.compare(candidatePassword, this.password);
  return isMatch;
};

// Método para comparar contraseñas
UserSchema.methods.comparePassword = async function (candidatePassword: string) {
  return bcrypt.compare(candidatePassword, this.password); // Compara la contraseña enviada con el hash
};



export default mongoose.models.User || mongoose.model<User>('User', UserSchema, 'users');
