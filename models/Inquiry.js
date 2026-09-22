import mongoose from 'mongoose';

const inquirySchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  company: { type: String },
  projectType: { type: String, required: true },
  budgetRange: { type: String, required: true },
  message: { type: String, required: true },
  createdAt: { type: Date, default: Date.now }
});

export const Inquiry = mongoose.model('Inquiry', inquirySchema);
