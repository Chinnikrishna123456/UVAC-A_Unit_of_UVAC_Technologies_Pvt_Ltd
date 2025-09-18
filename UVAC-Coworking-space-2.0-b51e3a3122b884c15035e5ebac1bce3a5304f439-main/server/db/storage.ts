import { type User, type InsertUser, type Inquiry, type InsertInquiry } from "@shared/schema";
import { IStorage } from "../storage";
import { Inquiry as InquiryModel } from "./models";
import UserModel from "./models/user";
import bcrypt from 'bcrypt';

export class MongoStorage implements IStorage {
  private userIdCounter: number = 1;
  private inquiryIdCounter: number = 1;

  constructor() {
    this.initCounters();
  }

  // Initialize ID counters from existing data
  private async initCounters() {
    try {
      // Find highest user ID
      const highestUserIdDoc = await UserModel.findOne().sort('-id').limit(1);
      if (highestUserIdDoc) {
        this.userIdCounter = highestUserIdDoc.id + 1;
      }

      // Find highest inquiry ID
      const highestInquiryIdDoc = await InquiryModel.findOne().sort('-id').limit(1);
      if (highestInquiryIdDoc) {
        this.inquiryIdCounter = highestInquiryIdDoc.id + 1;
      }
    } catch (error) {
      console.error('Error initializing counters:', error);
    }
  }

  async getUser(id: string): Promise<User | undefined> {
    try {
      const user = await UserModel.findOne({ id });
      if (!user) return undefined;

      return {
        id: user.id,
        username: user.username,
        password_hash: user.password,
        first_name: user.firstName,
        last_name: user.lastName,
        email: user.email,
        company: user.company === undefined ? null : user.company,
        role: user.role || null,
        profile_image: null,
        created_at: user.createdAt || new Date()
      };
    } catch (error) {
      console.error('MongoDB getUser error:', error);
      return undefined;
    }
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    try {
      const user = await UserModel.findOne({ username });
      if (!user) return undefined;

      return {
        id: user.id,
        username: user.username,
        password_hash: user.password,
        first_name: user.firstName,
        last_name: user.lastName,
        email: user.email,
        company: user.company === undefined ? null : user.company,
        role: user.role || null,
        profile_image: null,
        created_at: user.createdAt || new Date()
      };
    } catch (error) {
      console.error('MongoDB getUserByUsername error:', error);
      return undefined;
    }
  }

  async getUserByEmail(email: string): Promise<User | undefined> {
    try {
      const user = await UserModel.findOne({ email });
      if (!user) return undefined;

      return {
        id: user.id,
        username: user.username,
        password_hash: user.password,
        first_name: user.firstName,
        last_name: user.lastName,
        email: user.email,
        company: user.company === undefined ? null : user.company,
        role: user.role || null,
        profile_image: null,
        created_at: user.createdAt || new Date()
      };
    } catch (error) {
      console.error('MongoDB getUserByEmail error:', error);
      return undefined;
    }
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    try {
      const id = this.userIdCounter++;
      
      const newUser = new UserModel({
        id,
        username: insertUser.username,
        password: insertUser.password_hash,
        firstName: insertUser.first_name,
        lastName: insertUser.last_name,
        email: insertUser.email,
        company: insertUser.company || '',
        role: insertUser.role || 'user'
      });

      await newUser.save();

      return {
        id: newUser.id,
        username: newUser.username,
        password_hash: newUser.password,
        first_name: newUser.firstName,
        last_name: newUser.lastName,
        email: newUser.email,
        company: newUser.company === undefined ? null : newUser.company,
        role: newUser.role,
        profile_image: null,
        created_at: newUser.createdAt || new Date()
      };
    } catch (error) {
      console.error('MongoDB createUser error:', error);
      throw error;
    }
  }

  async updateUserProfile(userId: string, updateData: any): Promise<void> {
    try {
      const update: any = {};
      
      // Map snake_case to camelCase for MongoDB
      if (updateData.first_name !== undefined) update.firstName = updateData.first_name;
      if (updateData.last_name !== undefined) update.lastName = updateData.last_name;
      if (updateData.email !== undefined) update.email = updateData.email;
      if (updateData.company !== undefined) update.company = updateData.company;
      if (updateData.role !== undefined) update.role = updateData.role;
      if (updateData.profile_image !== undefined) update.profileImage = updateData.profile_image;

      await UserModel.findOneAndUpdate({ id: parseInt(userId) }, update);
    } catch (error) {
      console.error('MongoDB updateUserProfile error:', error);
      throw error;
    }
  }

  async createInquiry(insertInquiry: InsertInquiry): Promise<Inquiry> {
    try {
      const id = this.inquiryIdCounter++;
      
      const newInquiry = new InquiryModel({
        id,
        name: insertInquiry.name,
        email: insertInquiry.email,
        phone: insertInquiry.phone || null,
        service: insertInquiry.service || null,
        message: insertInquiry.message,
        subscribe: insertInquiry.subscribe || false
      });

      await newInquiry.save();

      return {
        id: newInquiry.id,
        user_id: null,
        name: newInquiry.name,
        email: newInquiry.email,
        phone: newInquiry.phone,
        service: newInquiry.service,
        message: newInquiry.message,
        subscribe: newInquiry.subscribe ?? false,
        created_at: newInquiry.createdAt || new Date()
      };
    } catch (error) {
      console.error('MongoDB createInquiry error:', error);
      throw error;
    }
  }

  async getAllInquiries(): Promise<Inquiry[]> {
    try {
      const inquiries = await InquiryModel.find().sort('-id');
      
      return inquiries.map(inquiry => ({
        id: inquiry.id,
        user_id: null,
        name: inquiry.name,
        email: inquiry.email,
        phone: inquiry.phone,
        service: inquiry.service,
        message: inquiry.message,
        subscribe: inquiry.subscribe ?? false,
        created_at: inquiry.createdAt || new Date()
      }));
    } catch (error) {
      console.error('MongoDB getAllInquiries error:', error);
      return [];
    }
  }

  async getAllUsers(): Promise<User[]> {
    try {
      const users = await UserModel.find().sort('-id');
      
      return users.map(user => ({
        id: user.id,
        username: user.username,
        password_hash: user.password,
        first_name: user.firstName,
        last_name: user.lastName,
        email: user.email,
        company: user.company === undefined ? null : user.company,
        role: user.role || null,
        profile_image: null,
        created_at: user.createdAt || new Date()
      }));
    } catch (error) {
      console.error('MongoDB getAllUsers error:', error);
      return [];
    }
  }

  async initDatabase(): Promise<void> {
    try {
      // Check if admin user exists, if not create one
      const admin = await UserModel.findOne({ username: 'admin' });
      if (!admin) {
        const hashedPassword = await bcrypt.hash('admin123', 10);
        await this.createUser({
          username: 'admin',
          password_hash: hashedPassword,
          first_name: 'Admin',
          last_name: 'User',
          email: 'admin@example.com',
          role: 'admin'
        });
        console.log('Admin user created');
      }
    } catch (error) {
      console.error('Error initializing database:', error);
      throw error;
    }
  }
}