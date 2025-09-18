import express, { Request } from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import mongoose from 'mongoose';
import { connectDB } from '../db';
import User, { IUser } from '../db/models/user';

// Extend Express Request type to include userId
declare global {
  namespace Express {
    interface Request {
      userId?: string;
    }
  }
}

interface JwtPayload {
  userId: string;
}

// Create a new router instance
const router = express.Router();

// Simple test route
router.get('/test', (req, res) => {
  console.log('Auth test route hit!');
  res.json({ message: 'Auth routes are working!', timestamp: new Date().toISOString() });
});

// Test endpoint
router.get('/test', (req: Request, res) => {
  console.log('Auth test endpoint hit');
  res.json({ message: 'Auth routes are working!', timestamp: new Date().toISOString() });
});

// Login route
router.post('/login', async (req: Request, res) => {
  try {
    console.log('Login request received:', req.body);
    const { login, password } = req.body;
    
    // Validate login field
    if (!login) {
      console.error('Missing login field in request');
      return res.status(400).json({
        success: false,
        error: 'Missing credentials',
        details: 'Login field is required'
      });
    }

    // Validate password
    if (!password) {
      console.error('Missing password in request');
      return res.status(400).json({
        success: false,
        error: 'Missing credentials',
        details: 'Password is required'
      });
    }

    // Clean and normalize fields
    const cleanLogin = login.trim().toLowerCase();
    const normalizedPassword = password.trim();

    // Validate cleaned fields
    if (!cleanLogin) {
      console.error('Invalid login field:', login);
      return res.status(400).json({
        success: false,
        error: 'Invalid login',
        details: 'Please provide a valid login field'
      });
    }

    if (!normalizedPassword) {
      console.error('Invalid password:', password);
      return res.status(400).json({
        success: false,
        error: 'Invalid password',
        details: 'Password cannot be empty'
      });
    }

    // Find user by email or username
    const user = await User.findOne({ $or: [{ username: cleanLogin }, { email: cleanLogin }] }) as IUser;
    if (!user) {
      console.error('User not found for credentials:', cleanLogin);
      return res.status(401).json({
        success: false,
        error: 'Invalid credentials'
      });
    }

    console.error('Found user:', {
      id: user._id,
      username: user.username,
      email: user.email,
      role: user.role
    });

    // Debug password comparison
    const storedPassword = user.password;
    console.error('Stored password:', storedPassword);
    console.error('Stored password length:', storedPassword.length);
    console.error('Stored password starts with $2b$', storedPassword.startsWith('$2b$'));
    console.error('Candidate password:', normalizedPassword);
    console.error('Candidate password length:', normalizedPassword.length);

    // Check password using the model's comparePassword method
    const validPassword = await user.comparePassword(normalizedPassword);
    console.error('Password comparison result:', validPassword);

    if (!validPassword) {
      console.log('Password comparison failed for user:', user._id);
      console.log('Candidate password:', password);
      return res.status(401).json({
        success: false,
        error: 'Invalid credentials'
      });
    }

    // Generate JWT token with user role
    const token = jwt.sign({ 
      userId: user._id.toString(),
      role: user.role
    }, process.env.JWT_SECRET || 'your-secret-key', {
      expiresIn: '24h'
    });

    // Return success response with token and user data
    return res.json({
      success: true,
      data: {
        token,
        user: {
          id: user._id.toString(),
          username: user.username,
          firstName: user.firstName,
          lastName: user.lastName,
          email: user.email,
          role: user.role,
          company: user.company
        }
      }
    });
  } catch (error) {
    console.error('Login error:', error);
    
    // Determine error type and provide appropriate message
    let errorMessage = 'Server error';
    if (error instanceof Error) {
      errorMessage = error.message;
      
      // Add specific error details for debugging
      if (error.name === 'ValidationError') {
        errorMessage = 'Invalid credentials';
      } else if (error.name === 'JsonWebTokenError') {
        errorMessage = 'Invalid token';
      } else if (error.name === 'TokenExpiredError') {
        errorMessage = 'Token expired';
      }
    }

    res.status(500).json({
      success: false,
      error: errorMessage,
      details: error instanceof Error ? error.message : 'An unexpected error occurred'
    });
  }
});

// Register new user
router.post('/register', async (req: Request, res) => {
  try {
    console.log('Received registration request:', req.body);
    
    // Get required fields from request body
    const { username = req.body.email, password, firstName, lastName, email, company, role } = req.body;
    
    console.log('Raw request body:', req.body);
    console.log('Extracted fields:', { username, password: '***', firstName, lastName, email, company, role });
    
    // Basic validation
    if (!password || !firstName || !lastName || !email || !role) {
      console.error('Missing required fields:', { password: !!password, firstName, lastName, email, role });
      return res.status(400).json({ 
        error: 'Missing required fields',
        details: 'Please provide all required fields: password, firstName, lastName, email, role'
      });
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      console.error('Invalid email format:', email);
      return res.status(400).json({ 
        error: 'Invalid email',
        details: 'Please provide a valid email address'
      });
    }

    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      console.log('User already exists:', email);
      return res.status(400).json({ 
        error: 'User already exists',
        details: 'A user with this email already exists'
      });
    }

    // Create new user
    const newUser = new User({
      username: username || email, // Use email as username if not provided
      password,
      firstName,
      lastName,
      email,
      company,
      role,
      createdAt: new Date()
    });

    console.log('New user data before save:', {
      id: newUser._id,
      username: newUser.username,
      email: newUser.email,
      firstName: newUser.firstName,
      lastName: newUser.lastName,
      company: newUser.company,
      role: newUser.role,
      rawCompany: newUser.get('company') // Log raw value before save
    });

    // Validate company field
    if (company) {
      console.log('Company field provided:', company);
    } else {
      console.log('No company field provided');
    }

    // Validate username format
    if (!newUser.username) {
      console.error('Username is required');
      return res.status(400).json({ 
        error: 'Invalid username',
        details: 'Username cannot be empty'
      });
    }

    // Save user
    await newUser.save();
    console.log('User saved successfully:', {
      id: newUser._id,
      username: newUser.username,
      email: newUser.email,
      firstName: newUser.firstName,
      lastName: newUser.lastName,
      company: newUser.company,
      role: newUser.role,
      rawCompany: newUser.get('company') // Log raw value after save
    });

    // Create JWT token
    const token = jwt.sign({ userId: newUser._id.toString() }, process.env.JWT_SECRET || 'your-secret-key', {
      expiresIn: '24h'
    });

    // Return success response
    res.status(201).json({
      message: 'User registered successfully',
      user: {
        id: newUser._id,
        username: newUser.username,
        firstName: newUser.firstName,
        lastName: newUser.lastName,
        email: newUser.email,
        role: newUser.role,
        company: newUser.company
      },
      token
    });

  } catch (error) {
    console.error('Registration error:', error);
    
    // Determine error type and provide appropriate message
    let errorMessage = 'Server error';
    if (error instanceof Error) {
      errorMessage = error.message;
      
      // Add specific error details for debugging
      if (error.name === 'ValidationError') {
        errorMessage = 'Invalid credentials';
      } else if (error.name === 'JsonWebTokenError') {
        errorMessage = 'Invalid token';
      } else if (error.name === 'TokenExpiredError') {
        errorMessage = 'Token expired';
      }
    }

    res.status(500).json({ 
      error: errorMessage,
      details: error instanceof Error ? error.message : 'An unexpected error occurred'
    });
  }
});

// Get current user data
router.get('/api/user', async (req: Request, res) => {
  try {
    // Get user ID from JWT token
    const authHeader = req.headers.authorization;
    if (!authHeader) {
      return res.status(401).json({ error: 'No authorization token provided' });
    }

    const token = authHeader.split(' ')[1];
    if (!token) {
      return res.status(401).json({ error: 'Invalid token format' });
    }

    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET || 'your-secret-key') as JwtPayload;
      const user = await User.findById(decoded.userId);
      
      if (!user) {
        return res.status(404).json({ error: 'User not found' });
      }

      // Return user data without sensitive information
      return res.json({
        id: user._id.toString(),
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        company: user.company,
        role: user.role
      });
    } catch (err) {
      return res.status(401).json({ error: 'Invalid or expired token' });
    }
  } catch (error) {
    console.error('Error fetching user data:', error);
    return res.status(500).json({ error: 'Server error' });
  }
});

// JWT authentication middleware
const authenticateToken = (req: Request, res: express.Response, next: express.NextFunction) => {
  try {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    if (!token) {
      return res.status(401).json({ error: 'No token provided' });
    }

    jwt.verify(token, process.env.JWT_SECRET || 'your-secret-key', (err, decoded) => {
      if (err || !decoded || typeof decoded !== 'object' || !('userId' in decoded)) {
        console.error('Token verification failed:', err);
        
        // Determine error type and provide appropriate message
        let errorMessage = 'Server error';
        if (err instanceof Error) {
          errorMessage = err.message;
          
          // Add specific error details for debugging
          if (err.name === 'ValidationError') {
            errorMessage = 'Invalid credentials';
          } else if (err.name === 'JsonWebTokenError') {
            errorMessage = 'Invalid token';
          } else if (err.name === 'TokenExpiredError') {
            errorMessage = 'Token expired';
          }
        }

        return res.status(403).json({ error: errorMessage });
      }

      // Set userId in request object
      req.userId = decoded.userId;
      next();
    });
  } catch (error) {
    console.error('Auth middleware error:', error);
    
    // Determine error type and provide appropriate message
    let errorMessage = 'Server error';
    if (error instanceof Error) {
      errorMessage = error.message;
      
      // Add specific error details for debugging
      if (error.name === 'ValidationError') {
        errorMessage = 'Invalid credentials';
      } else if (error.name === 'JsonWebTokenError') {
        errorMessage = 'Invalid token';
      } else if (error.name === 'TokenExpiredError') {
        errorMessage = 'Token expired';
      }
    }

    res.status(500).json({ error: errorMessage });
  }
};

// Get user info endpoint
router.get('/user', authenticateToken, async (req: Request, res) => {
  try {
    const userId = req.userId as string;
    if (!userId) {
      return res.status(401).json({ error: 'User ID not found' });
    }

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    // Return user data without sensitive information
    return res.json({
      user: {
        id: user._id.toString(),
        username: user.username,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        company: user.company,
        role: user.role
      }
    });
  } catch (error) {
    console.error('Get user info error:', error);
    
    // Determine error type and provide appropriate message
    let errorMessage = 'Server error';
    if (error instanceof Error) {
      errorMessage = error.message;
      
      // Add specific error details for debugging
      if (error.name === 'ValidationError') {
        errorMessage = 'Invalid credentials';
      } else if (error.name === 'JsonWebTokenError') {
        errorMessage = 'Invalid token';
      } else if (error.name === 'TokenExpiredError') {
        errorMessage = 'Token expired';
      }
    }

    res.status(500).json({ error: errorMessage });
  }
});

// Export router
export default router;
