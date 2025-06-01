import dbConnect from '@/lib/dbConnect';
import User from '@/models/User';
import { z } from 'zod';
import bcrypt from 'bcrypt';

export async function POST(request: Request) {
  try {
    await dbConnect();
    const body = await request.json();

    const schema = z.object({
      email: z.string().email(),
      password: z.string().min(8)
    });
    const { email, password } = schema.parse(body);

    // Buscar el usuario por email
    const user = await User.findOne({ email });
    if (!user) {
      return new Response(JSON.stringify({ message: "Usuario no encontrado o credenciales inválidas" }), { status: 404 });
    }
    // Comparar el password en texto plano con el hash almacenado
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return new Response(JSON.stringify({ message: "Usuario no encontrado o credenciales inválidas" }), { status: 404 });
    }
    
    return new Response(JSON.stringify(user), { status: 200 });
  } catch (error) {
    console.error("Error en verificación de usuario:", error);
    return new Response(JSON.stringify({ message: "Error interno" }), { status: 500 });
  }
}