import { auth, currentUser } from "@clerk/nextjs";
import { NextResponse } from "next/server";


import { connectToDatabase } from "@/middleware/mongodb";
import UserSubscription from "@/model/user-subscription";
import { stripe } from "@/lib/stripe"
import { absoluteUrl } from "@/lib/utils";

const settingsUrl = absoluteUrl("/settings");

export async function GET() {
    try {
        connectToDatabase();
    } catch (error) {
        console.log("DATABASE ERROR", error)
        return new NextResponse("Internal error", { status: 500 });
    }

    try {
        const { userId } = auth();
        const user = await currentUser();

        if (!userId || !user) {
            return new NextResponse("Unauthorised", { status: 401 });
        }

        const userSubscription = await UserSubscription.findOne({ userId });

        if (userSubscription && userSubscription.stripeCustomerId) {
            const stripeSession = await stripe.billingPortal.sessions.create({
                customer: userSubscription.stripeCustomerId,
                return_url: settingsUrl,
            });
            return new NextResponse(JSON.stringify({ url: stripeSession.url }));
        }

        const stripeSession = await stripe.checkout.sessions.create({
            success_url: settingsUrl,
            cancel_url: settingsUrl,
            payment_method_types: ["card"],
            mode: "subscription",
            billing_address_collection: "auto",
            customer_email: user.emailAddresses[0].emailAddress,
            line_items: [
                {
                    price_data: {
                        currency: "USD",
                        product_data: {
                            name: "Genius Pro",
                            description: "Unlimited AI Generations"
                        },
                        unit_amount: 2000,
                        recurring: {
                            interval: "month"
                        }
                    },
                    quantity: 1
                }
            ],
            metadata: {
                userId,
            }
        });

        return new NextResponse(JSON.stringify({ url: stripeSession.url }));

    } catch (error) {
        console.log("[STRIPE ERROR]", error);
        return new NextResponse("Internal error", { status: 500 });
    }
}
