import { VercelRequest, VercelResponse } from '@vercel/node';
import { connectToDatabase } from '../_lib/db';
import { generateAccessToken, getUserFromToken } from '../../server/middleware/auth';
import User, { IUser } from '../../server/models/User';
import * as bcrypt from 'bcryptjs';

interface LoginRequest {
  email: string;
  password: string;
}

interface RegisterRequest extends LoginRequest {
  name: string;
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
  await connectToDatabase();
  
  const { route } = req.query;
  
  try {
    switch (route) {
      case 'login':
        return await handleLogin(req, res);
      case 'register':
        return await handleRegister(req, res);
      case 'me':
        return await handleGetCurrentUser(req, res);
      default:
        return res.status(404).json({ message: 'Not found' });
    }
  } catch (error) {
    console.error('Auth error:', error);
    return res.status(500).json({ message: 'Internal server error' });
  }
}

async function handleLogin(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  try {
    const { email, password } = req.body as LoginRequest;

    if (!email || !password) {
      return res.status(400).json({ message: 'Email and password are required' });
    }

    const user = await User.findOne({ email }).select('+password').lean() as (IUser & { password: string }) | null;
    if (!user) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    const token = generateAccessToken({
      userId: user._id.toString(),
      role: user.role
    });
    
    const userData = user;
    delete (userData as any).password;
    
    return res.json({
      token,
      user: userData
    });
  } catch (error) {
    console.error('Login error:', error);
    return res.status(500).json({ message: 'Error during login' });
  }
}

async function handleRegister(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  try {
    const { name, email, password } = req.body as RegisterRequest;

    if (!name || !email || !password) {
      return res.status(400).json({ 
        message: 'Name, email and password are required' 
      });
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'User already exists' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({
      name,
      email,
      password: hashedPassword,
      role: 'user'
    });

    await newUser.save();

    const token = generateAccessToken({
      userId: (newUser as IUser)._id.toString(),
      role: newUser.role
    });
    
    const userData = newUser.toObject();
    delete (userData as any).password;
    
    return res.status(201).json({
      token,
      user: userData
    });
  } catch (error) {
    console.error('Registration error:', error);
    return res.status(500).json({ message: 'Error during registration' });
  }
}

async function handleGetCurrentUser(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'GET') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  try {
    const authHeader = req.headers.authorization;
    const token = authHeader?.split(' ')[1];
    
    if (!token) {
      return res.status(401).json({ message: 'No token provided' });
    }

    const user = getUserFromToken(token);
    if (!user) {
      return res.status(401).json({ message: 'Invalid token' });
    }

    const userData = await User.findById(user.userId).select('-password');
    if (!userData) {
      return res.status(404).json({ message: 'User not found' });
    }

    return res.json(userData);
  } catch (error) {
    console.error('Get current user error:', error);
    return res.status(500).json({ message: 'Error getting user data' });
  }
}
