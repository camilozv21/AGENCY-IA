import dbConnect from '@/lib/dbConnect';
import User from '@/models/User';

export const subtractTokens = async (email: string, tokens: number) => {
  await dbConnect();

  const user = await User.findOne({ email: email });
  if (!user) {
    return false;
  }

  user.tokensQuantity -= tokens;

  await user.save();
}