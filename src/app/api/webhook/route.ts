import Stripe from 'stripe'
import { headers } from "next/headers";
import { NextResponse } from "next/server";

import { connectToDatabase } from '@/middleware/mongodb';
import UserSubscription from '@/model/user-subscription';
import { stripe } from "@/lib/stripe";

export async function POST(req: Request) {
    try {
        connectToDatabase();
    } catch (error) {
        console.log("DATABASE CONNECTION FAIL", (error as Error).message)
        return new NextResponse("Internal error", { status: 500 })
    }

    const body = await req.text();
    const signature = headers().get("Stripe-Signature") as string;

    let event: Stripe.Event;

    try {
        event = stripe.webhooks.constructEvent(
            body,
            signature,
            process.env.STRIPE_WEBHOOK_SECRET!
        )
    } catch (error) {
        return new NextResponse(`Webhook Error: ${(error as Error).message}`, { status: 400 });
    }

    const session = event.data.object as Stripe.Checkout.Session;

    if (event.type === "checkout.session.completed") {
        const subscription = await stripe.subscriptions.retrieve(
            session.subscription as string
        );

        if (!session?.metadata?.userId) {
            return new NextResponse("User Id is required", { status: 400 });
        }

        await UserSubscription.create({
            userId: session?.metadata?.userId,
            stripeSubscriptionId: subscription.id,
            stripeCustomerId: subscription.customer as string,
            stripePriceId: subscription.items.data[0].price.id,
            stripeCurrentPeriodEnd: new Date(
                subscription.current_period_end * 1000
            )
        });
    }

    if(event.type === "invoice.payment_succeeded") {
        const subscription = await stripe.subscriptions.retrieve(
            session.subscription as string
        );

        const userSubscription = await UserSubscription.findOne({stripeSubscriptionId: subscription.id})
        if(userSubscription){
            userSubscription.stripePriceId = subscription.items.data[0].price.id;
            userSubscription.stripeCurrentPeriodEnd = new Date(
                subscription.current_period_end * 1000
            )
            await userSubscription.save();
        }
    }

    return new NextResponse(null, { status: 200 });
}