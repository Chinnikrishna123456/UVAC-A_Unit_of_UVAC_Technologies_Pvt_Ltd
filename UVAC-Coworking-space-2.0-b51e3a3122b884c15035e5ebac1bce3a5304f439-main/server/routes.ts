import type { Express } from "express";
import { createServer, type Server } from "http";
import mongoose from "mongoose";
import cors from 'cors';
import { getStorage } from "./storage";
import { insertUserSchema, insertInquirySchema } from "@shared/schema";
import { ZodError } from "zod";
import { fromZodError } from 'zod-validation-error';
import express from "express";
import session from "express-session";
import MemoryStore from "memorystore";
import jwt from 'jsonwebtoken';
import usersRouter from './routes/users';
import { sendContactFormEmail } from './utils/email';

interface InquiryDocument extends mongoose.Document {
  createdAt: Date;
  updatedAt: Date;
}

interface LeanInquiryDocument {
  _id: mongoose.Types.ObjectId;
  createdAt: Date;
  updatedAt: Date;
  name: string;
  email: string;
  phone: string;
  service: string;
  message: string;
  subscribe: boolean;
  preferredDate: string | null;
}

export async function registerRoutes(app: Express): Promise<Server> {
  // Add CORS middleware at the start
  app.use(cors({
    origin: process.env.FRONTEND_URL || 'http://localhost:3000',
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization']
  }));

  // Session setup
  const SessionStore = MemoryStore(session);
  
  app.use(
    session({
      secret: process.env.SESSION_SECRET || "cowolocation-secret",
      resave: false,
      saveUninitialized: false,
      cookie: { secure: process.env.NODE_ENV === "production", maxAge: 24 * 60 * 60 * 1000 }, // 1 day
      store: new SessionStore({
        checkPeriod: 86400000 // prune expired entries every 24h
      }),
    })
  );

  // API Routes
  // Note: Auth routes are handled in auth.ts
  
  // Users routes
  app.use('/api/users', usersRouter);

  app.post("/api/contact", async (req, res) => {
    try {
      console.log('=== CONTACT FORM SUBMISSION ===');
      console.log('Raw request body:', JSON.stringify(req.body, null, 2));
      console.log('MongoDB connection status:', mongoose.connection.readyState);
      
      // Verify database connection
      if (mongoose.connection.readyState !== 1) {
        console.error('MongoDB connection is not ready');
        return res.status(500).json({
          success: false,
          message: 'Database connection not ready'
        });
      }

      try {
        // Extract preferred_date and transform it to ISO format if needed
        const { preferred_date, ...inquiryData } = req.body;
        
        console.log('Raw inquiry data:', JSON.stringify(inquiryData, null, 2));
        
        const transformedData = {
          ...inquiryData,
          name: inquiryData.name?.trim() || undefined,
          email: inquiryData.email?.trim() || undefined,
          phone: inquiryData.phone?.trim() || undefined,
          service: inquiryData.service?.trim() || undefined,
          message: inquiryData.message?.trim() || undefined,
          subscribe: Boolean(inquiryData.subscribe),
          preferredDate: preferred_date ? new Date(preferred_date).toISOString() : undefined
        };

        console.log('Transformed inquiry data:', JSON.stringify(transformedData, null, 2));

        // Validate the data
        const parsedInquiryData = insertInquirySchema.parse(transformedData);
        console.log('Validated inquiry data:', JSON.stringify(parsedInquiryData, null, 2));

        try {
          // Store inquiry in the database
          console.log('Attempting to create inquiry in database...');
          const storageInstance = getStorage();
          console.log('Storage instance:', storageInstance);
          
          const newInquiry = await storageInstance.createInquiry(parsedInquiryData);
          console.log('Inquiry created successfully:', newInquiry._id);

          // Send email notification
          await sendContactFormEmail({
            name: parsedInquiryData.name,
            email: parsedInquiryData.email,
            phone: parsedInquiryData.phone || undefined,
            service: parsedInquiryData.service ?? "",
            message: parsedInquiryData.message,
            preferred_date: preferred_date || 'Not specified'
          });

          return res.status(201).json({ 
            success: true, 
            message: 'Thank you for your inquiry! We will get back to you soon.',
            data: newInquiry 
          });
        } catch (dbError) {
          console.error('Database error:', dbError);
          return res.status(500).json({
            success: false,
            message: 'Failed to save inquiry to database',
            error: dbError instanceof Error ? dbError.message : 'Unknown error occurred'
          });
        }
      } catch (validationError) {
        console.error('Validation error:', validationError);
        if (validationError instanceof ZodError) {
          const validationErrorDetails = fromZodError(validationError as any);
          console.error('Validation error details:', validationErrorDetails);
          return res.status(400).json({
            success: false,
            message: 'Invalid form data',
            errors: validationErrorDetails.message
          });
        }
        return res.status(400).json({
          success: false,
          message: 'Invalid form data',
          error: validationError instanceof Error ? validationError.message : 'Unknown validation error'
        });
      }
    } catch (error) {
      console.error('=== CONTACT FORM ERROR ===');
      console.error('Full error stack:', error);
      
      if (error instanceof Error) {
        console.error('Error message:', error.message);
        console.error('Error stack:', error.stack);
      }
      
      return res.status(500).json({
        success: false,
        message: 'An unexpected error occurred',
        error: error instanceof Error ? error.message : 'Unknown error'
      });
    }
  });
  
  // Dashboard API Routes - Protected by authentication
  app.get("/api/dashboard/inquiries", async (req, res) => {
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) {
      return res.status(401).json({ message: "Not authenticated" });
    }
    
    try {
      // Verify the JWT token
      const decoded = jwt.verify(token, process.env.JWT_SECRET || 'your-secret-key') as { userId: string; email: string; role: string };
      
      // Get the current user from the database
      const currentUser = await getStorage().getUser(decoded.userId);
      if (!currentUser) {
        return res.status(404).json({ message: "User not found" });
      }
      
      // Only admin users can see all inquiries
      if (currentUser.role !== 'admin') {
        return res.status(403).json({ message: "Access denied" });
      }

      const storageInstance = getStorage();
      
      // Get all inquiries
      const inquiries = await storageInstance.getAllInquiries();
      
      // Format the data
      const formattedInquiries = inquiries.map((inquiry: LeanInquiryDocument) => ({
        id: inquiry._id.toString(),
        name: inquiry.name,
        email: inquiry.email,
        phone: inquiry.phone,
        service: inquiry.service,
        message: inquiry.message,
        subscribe: inquiry.subscribe,
        createdAt: inquiry.createdAt.toISOString()
      }));
      
      res.json({
        success: true,
        data: formattedInquiries
      });
    } catch (error) {
      console.error('Error fetching dashboard inquiries:', error);
      res.status(500).json({
        success: false,
        message: 'Failed to fetch inquiries'
      });
    }
  });


  app.get("/api/dashboard/users", async (req, res) => {
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) {
      return res.status(401).json({ message: "Not authenticated" });
    }
    
    try {
      // Verify the JWT token
      const decoded = jwt.verify(token, process.env.JWT_SECRET || 'your-secret-key') as { userId: string; email: string; role: string };
      
      // Get the current user from the database
      const currentUser = await getStorage().getUser(decoded.userId);
      if (!currentUser) {
        return res.status(404).json({ message: "User not found" });
      }
      
      // Only admin users can see all users
      if (currentUser.role === 'admin') {
        const users = await getStorage().getAllUsers();
        // Remove passwords from response
        const sanitizedUsers = users.map(user => {
          const { password_hash, ...userWithoutPassword } = user;
          return userWithoutPassword;
        });
        
        return res.json(sanitizedUsers);
      } else {
        // Regular users can only see their own information
        const { password_hash, ...userWithoutPassword } = currentUser;
        return res.json([userWithoutPassword]);
      }
    } catch (error) {
      console.error('Error in /api/dashboard/users:', error);
      if (error instanceof jwt.JsonWebTokenError) {
        return res.status(401).json({ message: "Invalid token" });
      }
      res.status(500).json({ message: "Failed to fetch users" });
    }
  });

  app.post("/api/upload-profile-image", async (req, res) => {
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) {
      return res.status(401).json({ message: "Not authenticated" });
    }

    try {
      const { file } = req.body;
      if (!file) {
        return res.status(400).json({ message: "No file provided" });
      }

      // In a real app, you would:
      // 1. Save the file to a storage service (like AWS S3)
      // 2. Generate a secure URL for the image
      // 3. Update the user's profile_image field
      
      // For now, we'll just store a mock URL
      const userId = "user-id";
      const profileImageUrl = `https://example.com/profile-images/${userId}.jpg`;
      
      await getStorage().updateUserProfile(userId, { profile_image: profileImageUrl });
      
      return res.json({ message: "Profile image updated successfully", profile_image: profileImageUrl });
    } catch (error) {
      console.error("Error updating profile image:", error);
      return res.status(500).json({ message: "Failed to update profile image" });
    }
  });

  app.put("/api/update-profile", async (req, res) => {
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) {
      return res.status(401).json({ message: "Not authenticated" });
    }

    try {
      const userId = "user-id";
      const { first_name, last_name, email, company } = req.body;

      // Validate the data
      const updateData = {
        first_name,
        last_name,
        email,
        company
      };

      await getStorage().updateUserProfile(userId, updateData);
      
      return res.json({ message: "Profile updated successfully" });
    } catch (error) {
      console.error("Error updating profile:", error);
      return res.status(500).json({ message: "Failed to update profile" });
    }
  });

  app.post("/api/auth/login", async (req, res) => {
    try {
      const { email, password } = req.body;
      
      // Get storage instance
      const storage = await getStorage();
      
      // Find user by email
      const user = await storage.getUserByEmail(email);
      
      if (!user) {
        return res.status(401).json({ success: false, message: "Invalid credentials" });
      }
      
      // In a real app, you would verify the password hash here
      // For now, we'll just check if the password matches (not secure!)
      if (password !== user.password_hash) {
        return res.status(401).json({ success: false, message: "Invalid credentials" });
      }
      
      // Generate JWT token
      const token = jwt.sign(
        { userId: user.id },
        process.env.JWT_SECRET || "your-secret-key",
        { expiresIn: "24h" }
      );
      
      // Return success response with token and user data
      return res.json({
        success: true,
        data: {
          token,
          user: {
            id: user.id,
            email: user.email,
            firstName: user.first_name,
            lastName: user.last_name,
            role: user.role
          }
        }
      });
    } catch (error) {
      console.error("Login error:", error);
      return res.status(500).json({ success: false, message: "Internal server error" });
    }
  });

  app.get("/api/auth/test", (req, res) => {
    res.json({ success: true, message: "Server is running" });
  });

  // Handle all other routes
  app.use((req, res) => {
    res.status(404).json({ error: "Not found" });
  });

  // Create HTTP server
  const server = createServer(app);
  
  return server;
}
