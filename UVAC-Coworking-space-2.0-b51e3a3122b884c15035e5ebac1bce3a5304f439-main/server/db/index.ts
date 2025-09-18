import mongoose from 'mongoose';
import dotenv from 'dotenv';
import User from './models/user';
import Inquiry from './models/inquiry';
// import { Service } from '../models/service.model';

dotenv.config();

export const connectDB = async () => {
  try {
    const mongoUri = process.env.MONGO_URI;
    if (!mongoUri) {
      throw new Error('MONGO_URI is not defined in environment variables');
    }

    await mongoose.connect(mongoUri);
    console.log('MongoDB connected successfully');
  } catch (error) {
    console.error('MongoDB connection error:', error);
    process.exit(1);
  }
};

// Connection will be initiated from server/index.ts

// Monitor connection events
mongoose.connection.on('connected', () => {
  console.log('MongoDB connection established');
});

mongoose.connection.on('disconnected', () => {
  console.log('MongoDB disconnected');
});

mongoose.connection.on('error', (error) => {
  console.error('MongoDB connection error:', error);
});

// Reconnect on error
mongoose.connection.on('reconnected', () => {
  console.log('MongoDB reconnected');
});

// Handle graceful shutdown
process.on('SIGTERM', async () => {
  await mongoose.connection.close();
  console.log('MongoDB connection closed');
  process.exit(0);
});

// Export mongoose and connection
export { mongoose };
export default mongoose.connection;
