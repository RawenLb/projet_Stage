import mongoose from "mongoose";
const { Schema } = mongoose;

const resultModel = new Schema({
    username: { type: String },
    answers: { type: Array, default: [] },
    
    createdAt: { type: Date, default: Date.now }
});

export default mongoose.model('Result', resultModel);
