import { NextRequest, NextResponse } from 'next/server';
import dbConnect from "@/lib/dbConnect";
import User from '@/models/User';
import jwt from 'jsonwebtoken';
import sanitize from 'mongo-sanitize';
import { z } from 'zod';
import bcrypt from 'bcrypt';
const JWT_SECRET = process.env.JWT_SECRET || 'tu_clave_secreta';

export async function POST(req: NextRequest) {
  await dbConnect();

  const loginSchema = z.object({
    email: z.string().email(),
    password: z.string().min(8),
  });

  try {
    console.log("Inicio de la función de login");

    const body = await req.json();
    const parsed = loginSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json({ error: 'Datos inválidos' }, { status: 400 });
    }

    // Sanitizar y normalizar
    const email = sanitize(parsed.data.email.trim().toLowerCase());
    const password = parsed.data.password;
    console.log("Email recibido:", email);

    // Buscar usuario
    const user = await User.findOne({ email });
    if (!user) {
      return NextResponse.json({ error: 'Usuario no encontrado' }, { status: 404 });
    }

    console.log("Contraseña recibida en login:", password);
    console.log("Contraseña almacenada (hash) en la base de datos:", user.password);

    // Comparar contraseña con bcrypt (asegúrate de tener user.comparePassword implementado)
    console.log(`Contraseña recibida: "${password}"`);
    console.log(`Hash almacenado: "${user.password}"`);
    const isMatch = await bcrypt.compare(password, user.password);
    console.log(`¿Las contraseñas coinciden?: ${isMatch}`);
    if (!isMatch) {
      return NextResponse.json({ error: 'Contraseña incorrecta' }, { status: 401 });
    }

    // Crear token
    const token = jwt.sign(
      { id: user._id, email: user.email, role: user.role },
      JWT_SECRET,
      { expiresIn: '1h' }
    );

    // Configurar cookie segura
    const response = NextResponse.json({ message: 'Login exitoso', token }, { status: 200 });
    response.cookies.set('token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      maxAge: 60 * 60,
      path: '/',
      sameSite: 'lax',
    });

    return response;

  } catch (err) {
    console.error("Error en login:", err);
    return NextResponse.json({ error: 'Error en login', details: err}, { status: 500 });
  }
}
