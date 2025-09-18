import express from 'express';
import mongoose from 'mongoose';
import UserModel from '../db/models/user';

const router = express.Router();
const User = mongoose.models.User;

// Get all users (admin only)
router.get('/', async (req, res) => {
  try {
    console.log('Fetching users...');
    
    // In a real app, you should verify the user is an admin here
    // const isAdmin = req.user?.role === 'admin';
    // if (!isAdmin) {
    //   return res.status(403).json({ error: 'Unauthorized' });
    // }

    // Check if User model exists
    if (!mongoose.models.User) {
      console.error('User model is not registered');
      return res.status(500).json({ error: 'Server configuration error' });
    }

    const users = await User.find(
      {},
      { password: 0, __v: 0 } // Exclude password and version key
    ).sort({ createdAt: -1 }).lean();

    console.log(`Found ${users.length} users`);
    res.json(users);
  } catch (error) {
    console.error('Error fetching users:', error);
    const message = error instanceof Error ? error.message : 'An unknown error occurred';
    res.status(500).json({ 
      error: 'Failed to fetch users',
      details: process.env.NODE_ENV === 'development' ? message : undefined
    });
  }
});

// Update admin email
router.put('/admin/email', async (req, res) => {
  try {
    const { email } = req.body;
    
    if (!email) {
      return res.status(400).json({ error: 'Email is required' });
    }

    // Find and update admin user
    const adminUser = await User.findOneAndUpdate(
      { role: 'admin' },
      { $set: { email } },
      { new: true, upsert: true }
    );

    if (!adminUser) {
      // If no admin exists, create one
      const newAdmin = new User({
        username: 'admin',
        firstName: 'Admin',
        lastName: 'User',
        email,
        password: 'admin123', // Default password, should be changed after first login
        role: 'admin'
      });
      await newAdmin.save();
      return res.json({ message: 'New admin user created', email });
    }

    res.json({ message: 'Admin email updated successfully', email });
  } catch (error) {
    console.error('Error updating admin email:', error);
    res.status(500).json({ error: 'Failed to update admin email' });
  }
});

export default router;
