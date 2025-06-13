import User from '@/models/User';
import dbConnect from '@/lib/dbConnect';
import crypto from 'crypto';

export async function POST(request: Request) {
    try {
        await dbConnect();
        const body = await request.json();
        const { email, name, image } = body;

        if (!email || !name || !image) {
            return new Response(
                JSON.stringify({ message: 'Faltan datos requeridos: email, name e image' }),
                { status: 400 }
            );
        }

          const newUser = new User({
            email,
            name,
            image,
            tokensQuantity: 0,
            tokensExpDate: null
          });

          const token = crypto.randomBytes(32).toString('hex');
          const tokenHash = crypto.createHash('sha256').update(token).digest('hex');
          newUser.passwordResetToken = tokenHash;
          newUser.passwordResetExpires = new Date(Date.now() + 10800000);

          await newUser.save();

          await fetch(`${process.env.API_BASE_URL}/send-email`, {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({
                  to: email,
                  subject: 'Establece tu nueva contraseña',
                  message: `Por favor, utiliza el siguiente enlace para establecer tu nueva contraseña:\n\n${process.env.NEXT_PUBLIC_BASE_URL}/auth/changepassword?token=${token}`
              })
          });

        return new Response(JSON.stringify(newUser), { status: 201 });
    } catch (error) {
        console.error("Error al crear usuario:", error);
        return new Response(
            JSON.stringify({ message: "Error al crear usuario" }),
            { status: 500 }
        );
    }
}

export async function GET(request: Request) {
  try {
    await dbConnect();
    const { searchParams } = new URL(request.url);
    const email = searchParams.get("email");

    if (!email) {
      return new Response(
        JSON.stringify({ message: "Email es requerido" }),
        { status: 400 }
      );
    }

    const user = await User.findOne({ email });

    if (!user) {
      return new Response(
        JSON.stringify({ message: "Usuario no encontrado" }),
        { status: 200 }
      );
    }

    return new Response(JSON.stringify(user), { status: 200 });
  } catch (error) {
      console.error("Error al obtener usuario:", error);
      return new Response(
        JSON.stringify({ message: "Error al obtener usuario" }),
        { status: 500 }
      );
  }
}