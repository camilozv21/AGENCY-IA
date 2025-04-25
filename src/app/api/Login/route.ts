import { NextRequest, NextResponse } from 'next/server';
import dbConnect from "@/lib/dbConnect";
import User from '@/models/User';
import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET || 'tu_clave_secreta';

export async function POST(req: NextRequest) {
  await dbConnect();
  try {
    const { email, password } = await req.json();
    const user = await User.findOne({ email });

    if (!user) {
      return NextResponse.json({ error: 'Usuario no encontrado' }, { status: 404 });
    }

    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      return NextResponse.json({ error: 'Contraseña incorrecta' }, { status: 401 });
    }

    const token = jwt.sign(
      { id: user._id, email: user.email, role: user.role },
      JWT_SECRET,
      { expiresIn: '1h' }
    );

    const response = NextResponse.json({ message: 'Login exitoso' ,token: token }, { status: 200 });
    response.cookies.set('token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      maxAge: 60 * 60, 
      path: '/',
      sameSite: 'lax',
    });

    return response;

  } catch (err) {
    return NextResponse.json({ error: 'Error en login' }, { status: 500 });
  }
}
