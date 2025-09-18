import express from 'express';
import db from '../db';
import jwt from 'jsonwebtoken';
import Booking from '../db/models/booking'; 
import { Service } from '../models/service.model';

const router = express.Router();

// Helper function to get user ID from token
const getUserIdFromToken = (req: express.Request) => {
  const authHeader = req.headers.authorization;
  if (!authHeader) {
    throw new Error('No token provided');
  }
  const token = authHeader.split(' ')[1];
  return jwt.verify(token, process.env.JWT_SECRET || 'your-secret-key') as { userId: number };
};

// Get all bookings for a user
router.get('/', async (req, res) => {
  try {
    const { userId } = getUserIdFromToken(req);
    
    const result = await Booking.find()
      .populate('service', 'name type')
      .where('userId').equals(userId);
    
    res.json(result);
  } catch (error) {
    console.error('Error fetching bookings:', error);
    res.status(500).json({ error: 'Failed to fetch bookings' });
  }
});

// Create a new booking
router.post('/', async (req, res) => {
  try {
    const { userId } = getUserIdFromToken(req);
    const { serviceId, startDate, endDate, totalAmount } = req.body;
    
    // Check if service exists
    const service = await Service.findOne({ _id: serviceId });
    if (!service) {
      return res.status(404).json({ error: 'Service not found' });
    }
    
    // Create booking
    const result = await Booking.create({
      userId: userId,
      service: serviceId,
      startDate,
      endDate,
      totalAmount,
    });
    
    res.status(201).json({ bookingId: result.id });
  } catch (error) {
    console.error('Error creating booking:', error);
    res.status(500).json({ error: 'Failed to create booking' });
  }
});

// Update booking status
router.put('/:id/status', async (req, res) => {
  try {
    const { userId } = getUserIdFromToken(req);
    const { id } = req.params;
    const { status } = req.body;
    
    // Check if booking belongs to user
    const bookingResult = await Booking.findById(id);
    
    if (!bookingResult || bookingResult.userId.toString() !== userId.toString()) {
      return res.status(404).json({ error: 'Booking not found' });
    }
    
    // Update status
    bookingResult.status = status;
    await bookingResult.save();
    
    res.json({ bookingId: bookingResult.id });
  } catch (error) {
    console.error('Error updating booking status:', error);
    res.status(500).json({ error: 'Failed to update booking status' });
  }
});

// Get booking details
router.get('/:id', async (req, res) => {
  try {
    const { userId } = getUserIdFromToken(req);
    const { id } = req.params;
    
    const result = await Booking.findById(id)
      .populate('service', 'name type')
      .where('userId').equals(userId);
    
    if (!result) {
      return res.status(404).json({ error: 'Booking not found' });
    }
    
    res.json(result);
  } catch (error) {
    console.error('Error fetching booking:', error);
    res.status(500).json({ error: 'Failed to fetch booking' });
  }
});

export default router;
