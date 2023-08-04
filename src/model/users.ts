import mongoose, { Document, Model } from 'mongoose';

interface UserDocument extends Document {
    _id: mongoose.Types.ObjectId;
    userId: String;
    count: number;
    createdAt: Date;
    updatedAt: Date;
}

const userSchema = new mongoose.Schema({
    userId: {
        type: String,
        unique: true
    },
    count: {
        type: Number,
        default: 0
    },
    createdAt: {
        type: Date,
        default: () => new Date(),
        immutable: true
    },
    updatedAt: {
        type: Date,
        default: () => new Date()
    }
})

let model: Model<UserDocument>

try {
    model = mongoose.model('User') as Model<UserDocument>;
} catch {
    // If the model doesn't exist, create it
    model = mongoose.model<UserDocument>('User', userSchema);
}
export default model;
