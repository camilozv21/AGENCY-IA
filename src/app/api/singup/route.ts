import User from '@/models/User';
import dbConnect from '@/lib/dbConnect';
import bcrypt from 'bcrypt';
import { z } from 'zod';

export async function POST(request: Request) {
  await dbConnect();

  // Validación con Zod
  const userSchema = z.object({
    email: z.string().email(),
    password: z.string().min(8),
  });

  try {
    const body = await request.json();
    const parsed = userSchema.safeParse(body);

    if (!parsed.success) {
      return new Response(JSON.stringify({ error: "Datos inválidos" }), {
        status: 400,
        headers: { "Content-Type": "application/json" },
      });
    }

    // Sanitización y limpieza del email
    const sanitize = (str: string) => str.replace(/[^\w.@+-]/g, '');
    const email = sanitize(parsed.data.email.trim().toLowerCase());
    const password = parsed.data.password;
    const emailUsername = email.split('@')[0];

    const emailRegex = /^(?!.*\.\.)([a-zA-Z0-9._%+-]{1,64})@([a-zA-Z0-9.-]{1,255})\.[a-zA-Z]{2,}$/;
    const tempDomains = [
      "example.com", "0mail.xyz", "10mail.org", "10minutemail.com", "10minutemail.net", "20minutemail.com",
      "30minutemail.com", "anonbox.net", "anonmails.de", "binkmail.com", "burnermail.io",
      "byom.de", "chammy.info", "cool.fr.nf", "courrieltemporaire.com", "cryptogmail.com",
      "deadaddress.com", "despam.it", "disposablemail.com", "dispostable.com", "dudmail.com",
      "e4ward.com", "email60.com", "email-fake.com", "emailondeck.com", "emailtemporario.com.br",
      "emailtemporar.ro", "emailtemporario.com.br", "eyepaste.com", "fakebox.org", "fakeinbox.com",
      "fakemailgenerator.com", "filzmail.com", "getairmail.com", "getnada.com", "gishpuppy.com",
      "guerrillamail.biz", "guerrillamail.com", "guerrillamail.de", "guerrillamail.net",
      "guerrillamail.org", "guerrillamailblock.com", "inboxalias.com", "inboxbear.com", "inboxkitten.com",
      "instantemailaddress.com", "ipoo.org", "kasmail.com", "kuaiipmail.com", "mail1.io", "mail2run.com",
      "mailcatch.com", "maildrop.cc", "mailexpire.com", "mailimate.com", "mailin8r.com", "mailinator.com",
      "mailnesia.com", "mailnull.com", "mailsac.com", "mailtemp.net", "mailtothis.com", "mailzilla.com",
      "my10minutemail.com", "mytrashmail.com", "noclickemail.com", "nowmymail.com", "objectmail.com",
      "onewaymail.com", "openmailbox.org", "privaterelay.appleid.com", "proxymail.eu", "qq.com", 
      "sharklasers.com", "shortmail.com", "sogetthis.com", "spam4.me", "spamavert.com", "spambob.com",
      "spamex.com", "spamfree24.com", "spamgourmet.com", "spamhole.com", "spaminator.de", "spamobox.com",
      "spamspot.com", "superrito.com", "teleworm.us", "temp-mail.io", "temp-mail.org", "tempe-mail.com",
      "tempmail.net", "tempmail.org", "tempmailbox.com", "temporary-email.com", "temporarymail.com",
      "throwawayemail.com", "throwawaymail.com", "trashmail.com", "trashmail.de", "trashmailer.com",
      "trashymail.com", "trbvm.com", "twinmail.de", "usedemail.com", "wegwerfmail.de", "yep.it", "yopmail.com",
      "zippymail.info"
    ];    
    const existingUser = await User.findOne({ email });
    // Validaciones
    if (!email || !password) {
      return new Response(JSON.stringify({ error: "Email y contraseña requeridos" }), { status: 400 });
    }
    if (!emailRegex.test(email)) {
      return new Response(JSON.stringify({ error: "Email inválido" }), { status: 400 });
    }
    const domain = email.split("@")[1].toLowerCase();
    if (tempDomains.includes(domain)) {
      return new Response(JSON.stringify({ error: "Dominios temporales no permitidos" }), { status: 400 });
    }
    if (password.length < 8) {
      return new Response(JSON.stringify({ error: "La contraseña debe tener al menos 8 caracteres" }), { status: 400 });
    }
    if (password.toLowerCase() === emailUsername.toLowerCase()) {
      return new Response(JSON.stringify({ error: "La contraseña no puede ser igual al nombre de usuario del correo electrónico" }), { status: 400 });
    }
    if (!/[A-Z]/.test(password)) {
      return new Response(JSON.stringify({ error: "La contraseña debe incluir al menos una letra mayúscula" }), { status: 400 });
    }  
    if (!/[^A-Za-z0-9]/.test(password)) {
      return new Response(JSON.stringify({ error: "La contraseña debe incluir al menos un carácter especial" }), { status: 400 });
    }
    if (/\d{4,}/.test(password)) {
      const digits = password.match(/\d{4,}/g);
      if (digits?.some((seq: string) => {
        for (let i = 0; i < seq.length - 3; i++) {
          const a = parseInt(seq[i]);
          const b = parseInt(seq[i + 1]);
          const c = parseInt(seq[i + 2]);
          const d = parseInt(seq[i + 3]);
          if (b === a + 1 && c === b + 1 && d === c + 1) return true;
        }
        return false;
      })) {
        return new Response(JSON.stringify({ error: "La contraseña no debe contener 4 o más números consecutivos" }), { status: 400 });
      }
    }
    if (existingUser) {
      return new Response(JSON.stringify({ error: "El usuario ya existe" }), { status: 409 });
    }
    // Hash de la contraseña antes de guardarla
    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({ email, password: hashedPassword });
    await newUser.save();
    return Response.json({
      message: 'Usuario creado',
      user: {
        id: newUser._id,
        email: newUser.email,
      },
    }, { status: 201 });

  } catch (error) {
    return new Response(
      JSON.stringify({ error: (error as Error).message }),
      {
        status: 500,
        headers: { "Content-Type": "application/json" },
      }
    );
  }
}
