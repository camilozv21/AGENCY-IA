import User from '@/models/User';
import dbConnect from '@/lib/dbConnect';
import { z } from 'zod';
import { tempDomains } from '@/utils/tempDomains'; 
import { saltAndHashPassword } from '@/helpers/authUtils';

export async function POST(request: Request) {
  await dbConnect();

  const tempDomainSet = new Set(tempDomains);

  // Validación con Zod y refinamientos directamente aquí
  const userSchema = z.object({
    email: z.string().email().transform(val => val.trim().toLowerCase()),
    password: z.string()
      .min(8, { message: 'Debe tener al menos 8 caracteres' })
      .refine(p => /[A-Z]/.test(p), { message: 'Debe contener al menos una mayúscula' })
      .refine(p => /[^A-Za-z0-9]/.test(p), { message: 'Debe contener al menos un carácter especial' })
      .refine(p => !/0123|1234|2345|3456|4567|5678|6789/.test(p), { message: 'No debe contener secuencias numéricas consecutivas' })
  });

  let parsed;
  try {
    const body = await request.json();
    parsed = userSchema.safeParse(body);
  } catch {
    return new Response(JSON.stringify({ error: "JSON inválido" }), {
      status: 400,
      headers: { "Content-Type": "application/json" },
    });
  }

  if (!parsed.success) {
    return new Response(JSON.stringify({ error: parsed.error.errors[0].message }), {
      status: 400,
      headers: { "Content-Type": "application/json" },
    });
  }

  const { email, password } = parsed.data;
  const [emailUsername, domain] = email.split('@');

  if (tempDomainSet.has(domain)) {
    return new Response(JSON.stringify({ error: "Dominios temporales no permitidos" }), { status: 400 });
  }

  if (password.toLowerCase() === emailUsername.toLowerCase()) {
    return new Response(JSON.stringify({ error: "La contraseña no puede ser igual al nombre de usuario del correo electrónico" }), { status: 400 });
  }

  const existingUser = await User.findOne({ email });
  if (existingUser) {
    return new Response(JSON.stringify({ error: "El usuario ya existe" }), { status: 409 });
  }

  const hashedPassword = await saltAndHashPassword(password);

  const newUser = new User({
    email,
    password: hashedPassword,
    tokensQuantity: 0,
    tokensExpDate: null
  });

  await newUser.save();
  return new Response(
    JSON.stringify({
      message: 'Usuario creado',
      user: {
        id: newUser._id,
        email: newUser.email,
        tokensQuantity: newUser.tokensQuantity,
        tokensExpDate: newUser.tokensExpDate
      },
    }),
    {
      status: 201,
      headers: { "Content-Type": "application/json" },
    }
  );
}
