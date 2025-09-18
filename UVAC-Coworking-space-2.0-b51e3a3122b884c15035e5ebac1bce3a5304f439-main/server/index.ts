import { EventEmitter } from 'events';
import dotenv from 'dotenv';
import express, { type Request, Response, NextFunction, static as serveStatic } from "express";
import cors from 'cors';
import { setupVite, log } from "./vite";
import { initStorage } from "./storage";
import authRoutes from './routes/auth';
import servicesRoutes from './routes/services';
import bookingsRoutes from './routes/bookings';
import usersRoutes from './routes/users';
import contactRoutes from './routes/contact';
import { authenticateToken } from './middleware/auth';
import { connectDB } from './db';
import { registerRoutes } from './routes';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';
import mimeTypes from 'mime-types';
import mongoose from 'mongoose';
import { createServer } from 'http';
import net from 'net';

// Get the directory name from the current file URL
const __dirname = path.dirname(fileURLToPath(import.meta.url));

// Load environment variables
dotenv.config();

// Function to check if port is available
const isPortAvailable = (port: number): Promise<boolean> => {
  return new Promise((resolve) => {
    const server = net.createServer();
    server.listen(port, () => {
      server.once('close', () => resolve(true));
      server.close();
    });
    server.on('error', () => resolve(false));
  });
};

// Function to find an available port
const findAvailablePort = async (startPort: number): Promise<number> => {
  let port = startPort;
  while (port < startPort + 100) { // Try up to 100 ports
    if (await isPortAvailable(port)) {
      return port;
    }
    port++;
  }
  throw new Error(`No available port found starting from ${startPort}`);
};

// Set default port if not defined in environment
const PREFERRED_PORT = parseInt(process.env.PORT || '3001', 10);

// Set environment if not defined
if (!process.env.NODE_ENV) {
  process.env.NODE_ENV = 'development';
}

console.log('Server starting...');
console.log('Preferred Port:', PREFERRED_PORT);
console.log('Environment:', process.env.NODE_ENV);

// Increase the maximum number of event listeners for the server
EventEmitter.defaultMaxListeners = 15;

// Create Express app
const app = express();

// Enable CORS
app.use(cors({
  origin: ['http://localhost:5173', 'http://localhost:5183', 'http://localhost:5185', 'http://127.0.0.1:5173'],
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true
}));

// Handle preflight requests
app.options('*', cors());

// Body parsing middleware with increased limits and better error handling
app.use(express.json({ 
  limit: '50mb',
  verify: (req: any, res, buf) => {
    req.rawBody = buf.toString();
  }
}));

app.use(express.urlencoded({ 
  limit: '50mb', 
  extended: true,
  parameterLimit: 50000,
  verify: (req: any, res, buf) => {
    req.rawBody = buf.toString();
  }
}));

// Request timeout middleware
app.use((req, res, next) => {
  // Set timeout to 30 seconds
  res.setTimeout(30000, () => {
    if (!res.headersSent) {
      res.status(408).json({ message: 'Request timeout' });
    }
  });
  next();
});

// Error handling for body parser
type ErrorWithStatus = Error & { status?: number };

app.use((err: ErrorWithStatus, req: Request, res: Response, next: NextFunction) => {
  if (err instanceof SyntaxError && 'body' in err && err.status === 400 && 'type' in err) {
    return res.status(400).json({ message: 'Invalid JSON' });
  }
  next();
});

// Request logging middleware
app.use((req, res, next) => {
  const start = Date.now();
  
  // Log the request
  console.log(`[${new Date().toISOString()}] ${req.method} ${req.url}`);
  
  // Capture the original end function
  const originalEnd = res.end;
  res.end = function(
    chunk?: any,
    encodingOrCb?: BufferEncoding | (() => void),
    cb?: (() => void)
  ): Response {
    const responseTime = Date.now() - start;
    console.log(`[${new Date().toISOString()}] Response: ${res.statusCode} in ${responseTime}ms`);
    
    if (chunk) {
      console.log('Response body:', chunk.toString().substring(0, 500)); // Log first 500 chars
    }
    
    // Handle different function signatures
    if (typeof encodingOrCb === 'function') {
      return (originalEnd as Function).call(res, chunk, encodingOrCb);
    }
    if (typeof cb === 'function') {
      return (originalEnd as Function).call(res, chunk, encodingOrCb, cb);
    }
    return (originalEnd as Function).call(res, chunk, encodingOrCb);
  };
  
  next();
});

// Test route to verify the server is working
app.get('/api/test', (req, res) => {
  console.log('Test route hit!');
  res.json({ message: 'Test route is working!' });
});

// API Routes
console.log('Registering auth routes at /api/auth');
app.use('/api/auth', authRoutes);

// Register additional routes
app.use('/api/services', servicesRoutes);
app.use('/api/bookings', bookingsRoutes);
app.use('/api/users', usersRoutes);
app.use('/api/contact', contactRoutes);

// Debug: Log all registered routes
const printRoutes = (router: any, prefix = '') => {
  router.stack.forEach((middleware: any) => {
    if (middleware.route) { // Routes registered directly on the app
      const methods = Object.keys(middleware.route.methods).join(',').toUpperCase();
      console.log(`${methods.padEnd(7)} ${prefix}${middleware.route.path}`);
    } else if (middleware.name === 'router') { // Router middleware
      const path = middleware.regexp.toString()
        .replace('/^\\', '')
        .replace('\\/?', '')
        .replace('(?=\\/|$)', '')
        .replace('/i', '');
      printRoutes(middleware.handle, prefix + path);
    }
  });
};

// Log all registered routes after they're set up
setImmediate(() => {
  console.log('\n=== Registered Routes ===');
  printRoutes(app._router);
  console.log('=========================\n');
});

// Serve static files
const staticOptions = {
  setHeaders: (res: Response, path: string, stat: fs.Stats) => {
    const mimeType = mimeTypes.lookup(path);
    if (mimeType) {
      res.setHeader('Content-Type', mimeType);
    }
  }
};
app.use(express.static(path.join(__dirname, '../dist/public'), staticOptions));

// Error handling middleware
app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  console.error('Server error:', err);
  res.status(500).json({
    error: 'Internal server error',
    details: err.message
  });
});

// Handle all other non-API routes by serving the React app
app.get('*', (req, res) => {
  if (!req.url.startsWith('/api')) {
    res.sendFile(path.join(__dirname, '../dist/public/index.html'));
  } else {
    res.status(404).json({ error: 'Not Found' });
  }
});

// Start the server
async function startServer() {
  try {
    // Find an available port
    const PORT = await findAvailablePort(PREFERRED_PORT);
    console.log(`Using port: ${PORT}`);
    
    // Wait for database connection to be ready
    await connectDB();
    
    // Register routes after database connection is established
    await registerRoutes(app);

    // Start the server
    const server = app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
      console.log(`API available at: http://localhost:${PORT}/api`);
      console.log(`Frontend should connect to: http://localhost:${PORT}`);
    });

    // Handle graceful shutdown
    process.on('SIGTERM', async () => {
      await mongoose.connection.close();
      server.close(() => {
        console.log('Server and MongoDB connection closed');
        process.exit(0);
      });
    });

    return server;
  } catch (error) {
    console.error('Failed to start server:', error);
    process.exit(1);
  }
}

// Start the server
startServer();
