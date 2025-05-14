import { NextRequest, NextResponse } from 'next/server';
import dbConnect from "@/lib/dbConnect";
import User from '@/models/User';
import sanitize from 'mongo-sanitize';
import { z } from 'zod';
import bcrypt from 'bcrypt';
import { createSession } from '@/lib/session';

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

    const session = await createSession({ id: user._id.toString(), role: user.role });

    const response = new NextResponse(JSON.stringify({ message: "Login exitoso", session, tokenInfo: { tokensQuantity: user.tokensQuantity, tokensExpDate: user.tokensExpDate } }), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
        "Set-Cookie": `session=${session}; HttpOnly; Path=/; Max-Age=604800; SameSite=Lax; Secure`,
      },
    });

    return response;

  } catch (err) {
    console.error("Error en login:", err);
    return NextResponse.json({ error: 'Error interno en login' }, { status: 500 });
  }
}
