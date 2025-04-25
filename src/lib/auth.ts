import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET || 'tu_clave_secreta';

export function verifyToken(token: string) {
  try {
    return jwt.verify(token, JWT_SECRET);
  } catch (error) {
    return null;
  }
}
