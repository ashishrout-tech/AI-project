import mongoose, { Document, Model } from 'mongoose'

interface UserSubscriptionDocument extends Document {
    _id: mongoose.Types.ObjectId,
    userId: string;
    stripeCustomerId?: string;
    stripeSubscriptionId?: string;
    stripePriceId?: string;
    stripeCurrentPeriodEnd?: Date;
  }

const userSubscriptionSchema = new mongoose.Schema({
    userId: {
        type: String,
        unique: true
    },
    stripeCustomerId: {
        type: String,
        alias: "stripe_customer_id",
        unique: true,
        required: false
    },
    stripeSubscriptionId: {
        type: String,
        alias: "stripe_subscription_id",
        unique: true,
        required: false
    },
    stripePriceId:{
        type: String,
        alias: "stripe_price_id",
        required: false
    },
    stripeCurrentPeriodEnd:{
        type: Date,
        alias: "stripe_current_period_end",
        required: false
    }
})

let model: Model<UserSubscriptionDocument>

try {
    model = mongoose.model("userSubscription") as Model<UserSubscriptionDocument>
} catch {
    model = mongoose.model<UserSubscriptionDocument>("userSubscription", userSubscriptionSchema)
}
export default model;