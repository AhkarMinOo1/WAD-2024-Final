import mongoose from 'mongoose';

const customerSchema = new mongoose.Schema({
    name: { type: String, required: true },
    dateOfBirth: { type: Date, required: true },
    memberNumber: { type: Number, required: true },
    interests: { type: [String], required: false } // Changed to an array of strings
});

export default mongoose.models.Customer || mongoose.model('Customer', customerSchema);
