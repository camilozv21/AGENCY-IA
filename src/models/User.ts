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
  name: { type: String, trim: true },
  email: { type: String, required: true, unique: true, lowercase: true },
  image: { type: String },
  password: { type: String, required: false },
  passwordResetToken: { type: String },
  passwordResetExpires: { type: Date },
  role: { type: String, required: true, default: "user" },
  tokensQuantity: { type: Number, default: 10 },
  tokensExpDate: { type: Date, default: null },
  // stripe
  customerId: {
      type: String,
      validate(value: string): boolean {
        return value.includes("cus_");
      },
    },
    // Used in the Stripe webhook. should match a plan in config.js file.
    priceId: {
      type: String,
      validate(value: string): boolean {
        return value.includes("price_");
      },
    },
    // Used to determine if the user has access to the product—it's turn on/off by the Stripe webhook
    hasAccess: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

UserSchema.methods.comparePassword = async function (candidatePassword: string) {
  const isMatch = await bcrypt.compare(candidatePassword, this.password);
  return isMatch;
};

// Método para comparar contraseñas
UserSchema.methods.comparePassword = async function (candidatePassword: string) {
  return bcrypt.compare(candidatePassword, this.password); // Compara la contraseña enviada con el hash
};



export default mongoose.models.User || mongoose.model<User>('User', UserSchema, 'users');
