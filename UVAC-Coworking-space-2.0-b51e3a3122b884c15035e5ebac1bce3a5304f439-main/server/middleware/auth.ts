import jwt from 'jsonwebtoken';
import { Request, Response, NextFunction } from 'express';

export interface JwtPayload {
  userId: string;
  role: string;
  iat?: number;
  exp?: number;
}

declare global {
  namespace Express {
    interface Request {
      user?: JwtPayload;
    }
  }
}

export const generateAccessToken = (payload: Omit<JwtPayload, 'iat' | 'exp'>): string => {
  const jwtSecret = process.env.JWT_SECRET;
  if (!jwtSecret) {
    throw new Error('JWT_SECRET is not defined in environment variables');
  }
  
  return jwt.sign(payload, jwtSecret, { expiresIn: '1d' });
};

export const authenticateToken = (req: Request, res: Response, next: NextFunction) => {
  try {
    const authHeader = req.headers.authorization;
    
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      console.log('No or invalid Bearer token provided:', authHeader);
      return res.status(401).json({ 
        error: 'No token provided',
        details: 'Authorization header must contain Bearer token'
      });
    }
    
    const token = authHeader.split(' ')[1];
    
    if (!token) {
      console.log('Invalid token format');
      return res.status(401).json({ 
        error: 'Invalid token format',
        details: 'Token not found after Bearer prefix'
      });
    }

    const jwtSecret = process.env.JWT_SECRET;
    if (!jwtSecret) {
      console.error('JWT_SECRET not set in environment variables');
      return res.status(500).json({ 
        error: 'Internal server error',
        details: 'JWT_SECRET environment variable is not set'
      });
    }

    try {
      const decoded = jwt.verify(token, jwtSecret) as JwtPayload;
      req.user = {
        userId: decoded.userId,
        role: decoded.role
      };
      next();
    } catch (error) {
      console.error('Token verification failed:', error);
      if (error instanceof jwt.TokenExpiredError) {
        return res.status(401).json({
          error: 'Token expired',
          details: 'The provided token has expired. Please log in again.'
        });
      }
      return res.status(403).json({
        error: 'Invalid token',
        details: 'Failed to authenticate token. It may be invalid or tampered with.'
      });
    }
  } catch (error) {
    console.error('Authentication error:', error);
    return res.status(500).json({
      error: 'Authentication failed',
      details: 'An error occurred during authentication'
    });
  }
};

// Helper function to extract user from token (for use in API routes)
export const getUserFromToken = (token: string): JwtPayload | null => {
  try {
    const jwtSecret = process.env.JWT_SECRET;
    if (!jwtSecret) {
      throw new Error('JWT_SECRET is not defined in environment variables');
    }
    
    const decoded = jwt.verify(token, jwtSecret) as JwtPayload;
    return {
      userId: decoded.userId,
      role: decoded.role
    };
  } catch (error) {
    console.error('Error getting user from token:', error);
    return null;
  }
};
