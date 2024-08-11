import mongoose from 'mongoose';
const { Schema } = mongoose;

const feedbackSchema = new Schema({
    userId: { type: String, required: true },
    rating: { type: Number, required: true },
    createdAt: { type: Date, default: Date.now }
});

export default mongoose.model('Feedback', feedbackSchema);
