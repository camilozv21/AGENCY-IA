import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import { sendMail } from '@/lib/mailer';

const emailSchema = z.object({
  to: z.string().email(),
  subject: z.string().min(1),
  message: z.string().min(1),
});

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const parsed = emailSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        { error: parsed.error.errors[0].message },
        { status: 400 }
      );
    }

    const { to, subject, message } = parsed.data;

    await sendMail({
      to,
      subject,
      html: message,
    });

    return NextResponse.json(
      { message: 'Correo enviado exitosamente' },
      { status: 200 }
    );
  } catch (err) {
    console.error('Error al enviar el correo:', err);
    return NextResponse.json(
      { error: 'Error al enviar el correo' },
      { status: 500 }
    );
  }
}
