import { connectDB } from './index';
import fs from 'fs';
import path from 'path';
import mongoose from 'mongoose';

const migrate = async () => {
  try {
    console.log('Starting database migration...');
    
    // Create indexes or perform other MongoDB operations
    if (!mongoose.connection.db) {
      throw new Error('MongoDB connection not established');
    }
    
    // Now we can safely access mongoose.connection.db
    await mongoose.connection.db.createCollection('users', {
      validator: {
        $jsonSchema: {
          bsonType: "object",
          required: [ "email", "password" ],
          properties: {
            email: {
              bsonType: "string",
              description: "must be a string and is required"
            },
            password: {
              bsonType: "string",
              description: "must be a string and is required"
            }
          }
        }
      }
    });
    
    console.log('Database migration completed successfully!');
  } catch (error) {
    console.error('Error during database migration:', error);
    process.exit(1);
  }
};

migrate();
