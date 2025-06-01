import bcrypt from 'bcrypt';

export async function saltAndHashPassword(password: string): Promise<string> {
  const roundsStr = process.env.SALT_ROUNDS;
  if (!roundsStr) {
    throw new Error("La variable de entorno SALT_ROUNDS no está definida");
  }
  const saltRounds = parseInt(roundsStr, 10);
  const salt = await bcrypt.genSalt(saltRounds);
  return await bcrypt.hash(password, salt);
}