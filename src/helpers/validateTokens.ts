import dbConnect from '@/lib/dbConnect';
import User from '@/models/User';

export const validateTokens = async (email: string, tokens: number) => {
  await dbConnect();

  const user = await User.findOne({ email: email });
  if (!user) {
    return false;
  }

  if (user.tokensExpDate < new Date()) {
    return false;
  }

  if (user.tokensQuantity <= tokens) {
    return false;
  }

  user.tokensQuantity -= tokens;

  await user.save();

  return true; 
}