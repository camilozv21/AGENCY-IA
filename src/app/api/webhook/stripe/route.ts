import { NextResponse } from 'next/server';
import { headers } from 'next/headers';
import Stripe from 'stripe';
import User from '@/models/User';
import dbConnect from '@/lib/dbConnect';
import crypto from 'crypto';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || '');
const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET || '';

export async function POST(req: Request) {
    await dbConnect();

    const body = await req.text();

    const signature = (await headers()).get('stripe-signature') || '';

    let event;

    // verify Stripe event is legit
    try {
        event = stripe.webhooks.constructEvent(body, signature, webhookSecret);
    } catch (err: unknown) {
        console.error(`Webhook signature verification failed. ${err instanceof Error ? err.message : 'Unknown error'}`);
        return NextResponse.json({ error: err instanceof Error ? err.message : 'Unknown error' }, { status: 400 });
    }

    const data = event.data;
    const eventType = event.type;

    try {
        switch (eventType) {
            case 'checkout.session.completed': {
                // First payment is successful and a subscription is created (if mode was set to "subscription" in ButtonCheckout)
                // ✅ Grant access to the product
                let user;
                const session = await stripe.checkout.sessions.retrieve(
                    (data.object as Stripe.Checkout.Session).id,
                    {
                        expand: ['line_items']
                    }
                );
                const customerId = session?.customer;
                if (typeof customerId !== 'string') {
                    throw new Error('Invalid customerId');
                }
                const customer = await stripe.customers.retrieve(customerId) as Stripe.Customer;
                const priceId = session?.line_items?.data[0]?.price?.id || '';

                if (customer.email) {
                    user = await User.findOne({ email: customer.email });

                    if (!user) {
                        user = await User.create({
                            email: customer.email,
                            name: customer.name,
                            customerId
                        });

                        const token = crypto.randomBytes(32).toString('hex');
                        const tokenHash = crypto.createHash('sha256').update(token).digest('hex');
                        user.passwordResetToken = tokenHash;
                        user.passwordResetExpires = new Date(Date.now() + 10800000);
                        await user.save();

                        // Extra: >>>>> send email to dashboard <<<<<
                        await fetch(`${process.env.API_BASE_URL}/send-email`, {
                            method: 'POST',
                            headers: { 'Content-Type': 'application/json' },
                            body: JSON.stringify({
                                to: customer.email,
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
                          <p style="max-width: 600px; margin: 0 auto; text-align: center; font-weight: bold; font-size: 16px;">Hola <strong id="user-name">${customer.name ? customer.name : 'Usuario'}</strong>,</p>
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
                    }
                } else {
                    console.error('No user found');
                    throw new Error('No user found');
                }

                switch (priceId) {
                    case 'price_1RVbRrGPNJsUq7ASQXbL5kLj': // Basic Plan monthly
                        user.tokensQuantity = 4500;
                        break;
                    
                    case 'price_1RVbWKGPNJsUq7ASwi0NWDTA': // Basic Plan yearly
                        user.tokensQuantity = 54000;
                        break;

                    case 'price_1RVbScGPNJsUq7AST3bPpgm3': // Enterprise Plan monthly
                        user.tokensQuantity = 13500;
                        break;

                    case 'price_1RVbX5GPNJsUq7ASb2Nt3hjo': // Enterprise Plan yearly
                        user.tokensQuantity = 162000;
                        break;

                    case 'price_1RXtL2GPNJsUq7ASYuKjuprm': // Premium Plan monthly
                        user.tokensQuantity = 22500;
                        break;

                    case 'price_1RXtMOGPNJsUq7ASgzfra8pl': // Premium Plan yearly
                        user.tokensQuantity = 270000;
                        break;

                    default:
                        break;
                }

                // Update user data + Grant user access to your product. It's a boolean in the database, but could be a number of credits, etc...
                user.priceId = priceId;
                user.hasAccess = true;
                user.customerId = customerId;
                await user.save();
                break;
            }

            case 'customer.subscription.deleted': {
                // ❌ Revoke access to the product
                // The customer might have changed the plan (higher or lower plan, cancel soon etc...)
                const subscription = await stripe.subscriptions.retrieve(
                    (data.object as Stripe.Subscription).id
                );
                const user = await User.findOne({
                    customerId: subscription.customer
                });

                // Revoke access to your product
                user.hasAccess = false;
                await user.save();

                break;
            }

            default:
            // Unhandled event type
        }
    } catch (e: unknown) {
        console.error(
            'stripe error: ' + (e instanceof Error ? e.message : 'Unknown error') + ' | EVENT TYPE: ' + eventType
        );
    }

    return NextResponse.json({});
}