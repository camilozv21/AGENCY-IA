import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '@/lib/dbConnect';
import User from '@/models/User';
import bcrypt from 'bcrypt';
import { z } from 'zod';
import { getSession } from '@/lib/session'; 

export async function PUT(request: NextRequest) {
  await dbConnect();

  const changePasswordSchema = z.object({
    currentPassword: z.string().min(8),
    newPassword: z.string()
      .min(8, { message: 'Debe tener al menos 8 caracteres' })
      .refine(p => /[A-Z]/.test(p), { message: 'Debe contener al menos una mayúscula' })
      .refine(p => /[^A-Za-z0-9]/.test(p), { message: 'Debe contener al menos un carácter especial' })
      .refine(p => !/0123|1234|2345|3456|4567|5678|6789/.test(p), { message: 'No debe contener secuencias numéricas consecutivas' })
  });

  try {
    const session = await getSession(request);
    if (!session) {
        return new Response('Unauthorized', { status: 401 })
    }

    const body = await request.json();
    const parsed = changePasswordSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json({ error: parsed.error.errors[0].message }, { status: 400 });
    }

    const { currentPassword, newPassword } = parsed.data;
    const email = session.email.toLowerCase().trim();

    const user = await User.findOne({ email });
    if (!user) {
      return NextResponse.json({ error: 'Usuario no encontrado' }, { status: 404 });
    }

    const isMatch = await bcrypt.compare(currentPassword, user.password);
    if (!isMatch) {
      return NextResponse.json({ error: 'La contraseña actual es incorrecta' }, { status: 401 });
    }

    const isSamePassword = await bcrypt.compare(newPassword, user.password);
    if (isSamePassword) {
      return NextResponse.json({ error: 'La nueva contraseña no puede ser igual a la actual' }, { status: 400 });
    }

    const hashedNewPassword = await bcrypt.hash(newPassword, 10);
    user.password = hashedNewPassword;
    await user.save();

    return NextResponse.json({ message: 'Contraseña actualizada correctamente' }, { status: 200 });

  } catch (err) {
    console.error('Error en cambio de contraseña:', err);
    return NextResponse.json({ error: 'Error interno al cambiar la contraseña' }, { status: 500 });
  }
}
