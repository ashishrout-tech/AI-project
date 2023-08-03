import {auth} from '@clerk/nextjs';

import UserSubscription from "@/model/user-subscription"
import { connectToDatabase } from '@/middleware/mongodb';

const DAY_IN_MS = 86_400_000;

export const checkSubscription = async () => {

    try {
        connectToDatabase();
    } catch (error) {
        console.log("DATABASE CONNECTION ERROR")
    }

    const {userId} = auth ();

    if(!userId) {
        return false;
    }

    const userSubscription = await UserSubscription.findOne({userId});
    if(!userSubscription){
        return false;
    }
    if(!userSubscription.stripeSubscriptionId || !userSubscription.stripeCurrentPeriodEnd || !userSubscription.stripeCustomerId || !userSubscription.stripePriceId){
        return false;
    }

    const isValid = 
        userSubscription.stripePriceId &&
        userSubscription.stripeCurrentPeriodEnd?.getTime() + DAY_IN_MS > Date.now();

    return !!isValid;
};