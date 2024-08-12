// Dans feedbackSchema.js
import mongoose from "mongoose";
const { Schema } = mongoose;

const feedbackModel = new Schema({
    userId: { type: String, required: true },
    rating: { type: Number, required: true },
    createdAt: { type: Date, default: Date.now }
});

export default mongoose.model('Feedback', feedbackModel);