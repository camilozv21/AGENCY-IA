import { NextRequest, NextResponse } from 'next/server';
import dbConnect from "@/lib/dbConnect";
import User from '@/models/User';
import jwt from 'jsonwebtoken';
import sanitize from 'mongo-sanitize';
import { z } from 'zod';
import bcrypt from 'bcrypt';

// Verificar que exista la variable secreta
if (!process.env.JWT_SECRET) {
  throw new Error('JWT_SECRET no está definida');
}
const JWT_SECRET = process.env.JWT_SECRET;

export async function POST(req: NextRequest) {
  await dbConnect();

  const loginSchema = z.object({
    email: z.string().email(),
    password: z.string().min(8),
  });

  try {
    const body = await req.json();
    const parsed = loginSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json({ error: 'Credenciales inválidas' }, { status: 400 });
    }

    const email = sanitize(parsed.data.email.trim().toLowerCase());
    const password = parsed.data.password;

    const user = await User.findOne({ email });
    if (!user) {
      return NextResponse.json({ error: 'Credenciales inválidas' }, { status: 401 });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return NextResponse.json({ error: 'Credenciales inválidas' }, { status: 401 });
    }

    const token = jwt.sign(
      { id: user._id, email: user.email, role: user.role },
      JWT_SECRET,
      { expiresIn: '1h' }
    );

    const response = NextResponse.json({ message: 'Login exitoso' }, { status: 200 });
    response.cookies.set('token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      maxAge: 60 * 60, // 1 hora
      path: '/',
      sameSite: 'lax',
    });

    return response;

  } catch (err) {
    console.error("Error en login:", err);
    return NextResponse.json({ error: 'Error interno en login' }, { status: 500 });
  }
}
