import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config(); // Load variables from .env if running locally

const MONGODB_URI = process.env.MONGO_URI;

const connectDB = async (): Promise<boolean> => {
  if (!MONGODB_URI) {
    console.error("❌ Missing MONGO_URI environment variable");
    return false;
  }

  try {
    await mongoose.connect(MONGODB_URI);
    console.log('✅ MongoDB connected successfully');
    return true;
  } catch (error) {
    console.error('❌ MongoDB connection error:', error);
    return false;
  }
};

export default connectDB;
