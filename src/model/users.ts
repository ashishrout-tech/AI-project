import mongoose, { Document, Model } from 'mongoose';

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

let model: Model<Document>

try {
    model = mongoose.model('User') as Model<Document>;
} catch {
    // If the model doesn't exist, create it
    model = mongoose.model<Document>('User', userSchema);
}
export default model;
