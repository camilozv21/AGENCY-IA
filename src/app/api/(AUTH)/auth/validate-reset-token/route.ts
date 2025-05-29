import { NextResponse } from 'next/server';
import dbConnect from '@/lib/dbConnect';
import User from '@/models/User';
import crypto from 'crypto';

export async function GET(req: Request) {
    await dbConnect();
    const { searchParams } = new URL(req.url);
    const token = searchParams.get('token');

    if (!token) {
        return NextResponse.json({ valid: false, error: 'No token provided' }, { status: 400 });
    }

    // Hashear el token recibido
    const tokenHash = crypto.createHash('sha256').update(token).digest('hex');

    // Buscar usuario con ese token y que no haya expirado
    const user = await User.findOne({
        passwordResetToken: tokenHash,
        passwordResetExpires: { $gt: new Date() }
    });

    if (user) {
        return NextResponse.json({ valid: true });
    } else {
        return NextResponse.json({ valid: false, error: 'Token inválido o expirado' });
    }
}