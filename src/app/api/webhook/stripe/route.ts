import { NextResponse } from 'next/server';
import { headers } from 'next/headers';
import Stripe from 'stripe';
import User from '@/models/User';
import dbConnect from '@/lib/dbConnect';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || '');
const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET || '';

export async function POST(req: Request) {
    await dbConnect();

    const body = await req.text();

    const signature = (await headers()).get('stripe-signature') || '';

    let data;
    let eventType;
    let event;

    // verify Stripe event is legit
    try {
        event = stripe.webhooks.constructEvent(body, signature, webhookSecret);
    } catch (err: unknown) {
        console.error(`Webhook signature verification failed. ${err instanceof Error ? err.message : 'Unknown error'}`);
        return NextResponse.json({ error: err instanceof Error ? err.message : 'Unknown error' }, { status: 400 });
    }

    data = event.data;
    eventType = event.type;

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

                // Update user data + Grant user access to your product. It's a boolean in the database, but could be a number of credits, etc...
                user.priceId = priceId;
                user.hasAccess = true;
                await user.save();

                // Extra: >>>>> send email to dashboard <<<<

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