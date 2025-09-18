import dotenv from 'dotenv';
import mongoose from 'mongoose';
import path from 'path';
import { fileURLToPath } from 'url';

// Load environment variables from .env file
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
dotenv.config({ path: path.resolve(__dirname, '../.env') });

/**
 * Safely gets an environment variable and ensures it exists
 * @param varName Name of the environment variable
 * @returns The environment variable value as string
 * @throws Error if the environment variable is not defined
 */
function getRequiredEnvVar(varName: string): string {
  const value = process.env[varName];
  if (!value) {
    console.error(`❌ Error: ${varName} is not defined in the environment variables`);
    process.exit(1);
  }
  return value;
}

// Get MongoDB URI from environment variables
const MONGODB_URI = getRequiredEnvVar('MONGO_URI');

// Connect to MongoDB
async function testConnection() {
  try {
    console.log('🔌 Attempting to connect to MongoDB...');
    await mongoose.connect(MONGODB_URI);
    
    // Wait for the connection to be established
    await new Promise<void>((resolve, reject) => {
      if (mongoose.connection.readyState === 1) {
        resolve();
      } else {
        mongoose.connection.once('connected', resolve);
        mongoose.connection.on('error', reject);
      }
    });

    console.log('✅ Successfully connected to MongoDB!');

    // Check if connection and db are available
    if (!mongoose.connection.db) {
      throw new Error('MongoDB connection is not established properly');
    }

    // Now it's safe to access mongoose.connection.db
    const db = mongoose.connection.db;
    const collections = await db.listCollections().toArray();
    console.log('\n📂 Collections in the database:');
    collections.forEach((collection, index) => {
      console.log(`${index + 1}. ${collection.name}`);
    });

  } catch (error) {
    console.error('❌ Error connecting to MongoDB:', error);
    process.exit(1);
  } finally {
    // Close the connection when done
    await mongoose.connection.close();
    console.log('\n🔌 MongoDB connection closed.');
  }
}

// Run the test
testConnection();
