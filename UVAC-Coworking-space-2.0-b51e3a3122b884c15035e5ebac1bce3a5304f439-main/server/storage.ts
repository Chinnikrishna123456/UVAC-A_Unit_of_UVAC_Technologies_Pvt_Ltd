import mongoose from 'mongoose';
import { Inquiry } from './db/models';
import User from './db/models/user';
import * as bcrypt from 'bcrypt';

export interface IStorage {
  getUser(id: string): Promise<any>;
  getUserByUsername(username: string): Promise<any>;
  getUserByEmail(email: string): Promise<any>;
  createUser(user: any): Promise<any>;
  createInquiry(inquiry: any): Promise<any>;
  getAllInquiries(): mongoose.Query<any, any>;
  getAllUsers(): Promise<any[]>;
  updateUserProfile(userId: string, updateData: any): Promise<void>;
  initDatabase(): Promise<void>;
}

export class Storage implements IStorage {
  async getUser(id: string): Promise<any> {
    return User.findById(id);
  }

  async getUserByUsername(username: string): Promise<any> {
    return User.findOne({ username });
  }

  async getUserByEmail(email: string): Promise<any> {
    return User.findOne({ email });
  }

  async createUser(user: any): Promise<any> {
    const newUser = new User(user);
    await newUser.save();
    return newUser;
  }

  async createInquiry(inquiry: any): Promise<any> {
    try {
      if (mongoose.connection.readyState !== 1) {
        throw new Error('MongoDB connection is not ready');
      }

      console.log('Creating new inquiry with data:', JSON.stringify(inquiry, null, 2));
      
      const newInquiry = new Inquiry(inquiry);
      const savedInquiry = await newInquiry.save();
      console.log('Inquiry saved successfully:', savedInquiry._id);
      return savedInquiry;
    } catch (error) {
      console.error('Error creating inquiry:', error);
      throw error;
    }
  }

  getAllInquiries(): mongoose.Query<any, any> {
    return Inquiry.find();
  }

  async getAllUsers(): Promise<any[]> {
    return User.find({});
  }

  async updateUserProfile(userId: string, updateData: any): Promise<void> {
    await User.findByIdAndUpdate(userId, updateData);
  }

  async initDatabase(): Promise<void> {
    // Database connection is handled in db/index.ts
    // This method is kept for interface compatibility
    if (mongoose.connection.readyState === 1) {
      console.log('Database already connected');
      return;
    }
    throw new Error('Database not connected. Check db/index.ts');
  }
}

export const storage = new Storage();

export async function initStorage(): Promise<void> {
  try {
    await storage.initDatabase();
    console.log('Storage initialized successfully');
  } catch (error) {
    console.error('Storage initialization failed:', error);
    throw error;
  }
}

export function getStorage(): IStorage {
  return storage;
}
