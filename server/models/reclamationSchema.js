import mongoose from 'mongoose';

const reclamationSchema = new mongoose.Schema({
    userId: { type: String, required: true },
    subject: { type: String, required: true },
    message: { type: String, required: true },
    createdAt: { type: Date, default: Date.now }
});

const Reclamation = mongoose.model('Reclamation', reclamationSchema);

export default Reclamation;
