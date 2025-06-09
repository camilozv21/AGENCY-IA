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

                        await user.save();
                    }
                } else {
                    console.error('No user found');
                    throw new Error('No user found');
                }

                switch (priceId) {
                    case 'price_1RRwuPGPNJsUq7ASUIeO6HwE': // Basic Plan monthly
                        user.tokensQuantity += 4501;
                        break;
                    
                    case 'price_1RRxBCGPNJsUq7AScLclkeJ1': // Basic Plan yearly
                        user.tokensQuantity += 54012;
                        break;

                    case 'price_1RRww4GPNJsUq7ASIMbHJkBg': // Enterprise Plan monthly
                        user.tokensQuantity += 12001;
                        break;

                    case 'price_1RRxCAGPNJsUq7ASCAyBA6Lr': // Enterprise Plan yearly
                        user.tokensQuantity += 144012;
                        break;

                    case 'price_1RRwwqGPNJsUq7ASOFdZ3arj': // Premium Plan monthly
                        user.tokensQuantity += 20001;
                        break;

                    case 'price_1RRxCfGPNJsUq7ASwonRF3zg': // Premium Plan yearly
                        user.tokensQuantity += 240012;
                        break;

                    default:
                        break;
                }

                // Update user data + Grant user access to your product. It's a boolean in the database, but could be a number of credits, etc...
                user.priceId = priceId;
                user.hasAccess = true;
                user.customerId = customerId;

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
                        message: `Por favor, utiliza el siguiente enlace para establecer tu nueva contraseña:\n\n${process.env.NEXT_PUBLIC_BASE_URL}/auth/changepassword?token=${token}`
                    })
                });

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