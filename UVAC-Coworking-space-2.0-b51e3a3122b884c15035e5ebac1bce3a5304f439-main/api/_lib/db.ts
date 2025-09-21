import mongoose from 'mongoose';

const MONGO_URI = process.env.MONGO_URI;

if (!MONGO_URI) {
  throw new Error('Please define the MONGO_URI environment variable inside .env');
}

// 👇 Extend NodeJS global type to include mongooseCache
declare global {
  // eslint-disable-next-line no-var
  var mongooseCache: {
    conn: typeof mongoose | null;
    promise: Promise<typeof mongoose> | null;
  } | undefined;
}

// ✅ Initialize cache if it doesn't exist
if (!global.mongooseCache) {
  global.mongooseCache = { conn: null, promise: null };
}

// ✅ Now cached is guaranteed to be defined
const cached = global.mongooseCache!;

export async function connectToDatabase(): Promise<typeof mongoose> {
  if (cached.conn) {
    return cached.conn;
  }

  if (!cached.promise) {
    cached.promise = mongoose.connect(MONGO_URI!, {
      bufferCommands: false,
    });
  }

  try {
    cached.conn = await cached.promise;
  } catch (err) {
    cached.promise = null;
    throw err;
  }

  return cached.conn;
}

export const db = mongoose;

// Optional: Handle connection lifecycle events
mongoose.connection.on('connected', () => {
  console.log('[MongoDB] Connected successfully');
});

mongoose.connection.on('error', (err) => {
  console.error('[MongoDB] Connection error:', err);
});

mongoose.connection.on('disconnected', () => {
  console.log('[MongoDB] Disconnected');
});

// Close connection on app shutdown
process.on('SIGINT', async () => {
  await mongoose.connection.close();
  console.log('[MongoDB] Connection closed due to SIGINT');
  process.exit(0);
});
