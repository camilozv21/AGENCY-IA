import { NextResponse } from 'next/server';
import dbConnect from '@/lib/dbConnect';
import User from '@/models/User';
import crypto from 'crypto';
import { saltAndHashPassword } from '@/helpers/authUtils';

export async function POST(req: Request) {
  try {
    await dbConnect();
    const { token, password } = await req.json();

    if (!token || !password) {
      return NextResponse.json({ error: 'Token y password son requeridos' }, { status: 400 });
    }

    // Hashear el token recibido para compararlo
    const tokenHash = crypto.createHash('sha256').update(token).digest('hex');

    // Buscar usuario que tenga el token y que no haya expirado
    const user = await User.findOne({
      passwordResetToken: tokenHash,
      passwordResetExpires: { $gt: new Date() }
    });

    if (!user) {
      return NextResponse.json({ error: 'Token inválido o expirado' }, { status: 400 });
    }

    const hashedPassword = await saltAndHashPassword(password);

    // Actualizar la contraseña y borrar el token de reseteo
    user.password = hashedPassword;
    user.passwordResetToken = undefined;
    user.passwordResetExpires = undefined;

    await user.save();

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error en reset-password:', error);
    return NextResponse.json({ error: 'Error al procesar la solicitud' }, { status: 500 });
  }
}