// Dans feedbackSchema.js
import mongoose from "mongoose";
const { Schema } = mongoose;

const feedbackModel = new Schema({
    userId: { type: String, required: true },
    rating: { type: Number, required: false }, // Optional for this schema
    feedback: { type: String, required: false }, // Optional for this schema
    type: { type: String, enum: ['Reclamation', 'Commentaire'], required: true },
    createdAt: { type: Date, default: Date.now }
});


export default mongoose.model('Feedback', feedbackModel);
