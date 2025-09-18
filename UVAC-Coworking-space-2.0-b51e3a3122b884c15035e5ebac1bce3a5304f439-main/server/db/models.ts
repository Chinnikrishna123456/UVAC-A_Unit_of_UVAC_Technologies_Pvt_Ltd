import mongoose from 'mongoose';

// Define interfaces
export interface IInquiry {
  _id: mongoose.Types.ObjectId;
  name: string;
  email: string;
  phone: string | null;
  service: string | null;
  message: string;
  subscribe: boolean;
  createdAt: Date;
}

export interface IService {
  _id: mongoose.Types.ObjectId;
  name: string;
  description: string;
  price: number;
  duration: number;
  createdAt: Date;
  updatedAt: Date;
}

// Define schemas
const inquirySchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  phone: { type: String, default: null },
  service: { type: String, default: null },
  message: { type: String, required: true },
  subscribe: { type: Boolean, default: false },
  createdAt: { type: Date, default: Date.now }
});

const serviceSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  price: { type: Number, required: true },
  duration: { type: Number, required: true },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
}, {
  timestamps: true
});

// Create models
export const Inquiry = mongoose.model<IInquiry>('Inquiry', inquirySchema);
export const Service = mongoose.model<IService>('Service', serviceSchema);

export default {
  Inquiry,
  Service
};