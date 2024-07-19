import mongoose from 'mongoose';

const QuestionSchema = new mongoose.Schema({
    id: { type: String, required: true },
    question: { type: String, required: true },
    options: { type: [String], required: true }
});

export default mongoose.model('Question', QuestionSchema);
