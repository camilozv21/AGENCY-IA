import User from '@/models/User';
import dbConnect from '@/lib/dbConnect';
import crypto from 'crypto';

export async function POST(request: Request) {
    try {
        await dbConnect();
        const body = await request.json();
        const { email } = body;

        if (!email) {
            return new Response(
                JSON.stringify({ message: 'Falta el email' }),
                { status: 400 }
            );
        }

        const user = await User.findOne({ email });
        if (!user) {
            return new Response(
                JSON.stringify({ message: 'Usuario no encontrado' }),
                { status: 404 }
            );
        }

        // Generar nuevo token y expiración
        const token = crypto.randomBytes(32).toString('hex');
        const tokenHash = crypto.createHash('sha256').update(token).digest('hex');
        user.passwordResetToken = tokenHash;
        user.passwordResetExpires = new Date(Date.now() + 10800000); // 3 horas

        await user.save();

        await fetch(`${process.env.API_BASE_URL}/send-email`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
              to: email,
              subject: 'Establece tu nueva contraseña',
              message: `
              <html lang="es">
                <head>
                  <meta charset="UTF-8" />
                  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
                  <title>Correo automático</title>
                </head>
                <body style="margin: 0; padding: 0; font-family: Arial, sans-serif;">
                  <div style="max-width: 600px; margin: 30px auto; background-color: #ffffff; border-radius: 8px; box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1); overflow: hidden;">
                    <div style="background-color: #F3C96B; color: #1E1E2D; padding: 20px; text-align: center;">
                      <h2>¡Establece tu nueva contraseña!</h2>
                    </div>
                    <div style="max-width: 600px; padding: 30px 20px; color: #333333; font-size: 16px; text-align: center; margin: 0 auto;">
                      <p style="max-width: 600px; margin: 0 auto; text-align: center; font-weight: bold; font-size: 16px;">Hola <strong id="user-name">${user.name ? user.name : 'Usuario'}</strong>,</p>
                      <p style="max-width: 600px; margin: 0 auto; text-align: center;">Activa tu contraseña y accede a todos nuestros servicios.</p>
                      <p style="max-width: 600px; margin: 0 auto; text-align: center;">Tienes 3 horas para activar tu contraseña de lo contrario debes de contactar a soporte contia@contia.io</p>
                      <p style="max-width: 600px; margin: 0 auto; text-align: center;">Síguenos en redes:</p>
                      <div style="text-align: center;">
                        <a id="cta-link" href="${process.env.NEXT_PUBLIC_BASE_URL}/auth/changepassword?token=${token}" style="display: inline-block; background-color: #F3C96B; color: #1E1E2D; padding: 12px 24px; margin-top: 20px; border-radius: 5px; text-decoration: none; font-weight: bold;">Activar contraseña</a>
                      </div>
                    </div>
                    <p style="font-size: 10px; color: rgb(146, 146, 146);">
                      Si el botón de arriba no funciona copia este link en tu navegador <a href="${process.env.NEXT_PUBLIC_BASE_URL}/auth/changepassword?token=${token}">${process.env.NEXT_PUBLIC_BASE_URL}/auth/changepassword?token=${token}</a>.
                    </p>
                    <div style="font-size: 13px; color: #777; text-align: center; padding: 20px;">
                      Este es un correo automático, por favor no respondas directamente.<br />
                      © 2025 Contia. Todos los derechos reservados.
                    </div>
                  </div>
                </body>
              </html>`
            })
          });

        return new Response(
            JSON.stringify({ token }),
            { status: 200 }
        );
    } catch (error) {
        console.error("Error al refrescar token:", error);
        return new Response(
            JSON.stringify({ message: "Error al refrescar token" }),
            { status: 500 }
        );
    }
}