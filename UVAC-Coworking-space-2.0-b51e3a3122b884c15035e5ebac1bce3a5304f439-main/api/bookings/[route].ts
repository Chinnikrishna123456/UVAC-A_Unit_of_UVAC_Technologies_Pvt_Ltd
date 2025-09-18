import { VercelRequest, VercelResponse } from '@vercel/node';
import { connectToDatabase } from '../_lib/db';
import { getUserFromToken } from '../../server/middleware/auth';
import Booking from '../../server/models/Booking';

interface AuthenticatedRequest extends VercelRequest {
  user?: {
    userId: string;
    role: string;
  };
}

export default async function handler(req: AuthenticatedRequest, res: VercelResponse) {
  await connectToDatabase();
  
  const { route } = req.query;
  
  // Authenticate user
  const token = req.headers.authorization?.split(' ')[1];
  if (!token) {
    return res.status(401).json({ error: 'No token provided' });
  }

  const user = getUserFromToken(token);
  if (!user) {
    return res.status(401).json({ error: 'Invalid token' });
  }
  
  req.user = user;
  
  try {
    switch (route) {
      case 'create': return await handleCreateBooking(req, res);
      case 'list': return await handleListBookings(req, res);
      case 'my-bookings': return await handleMyBookings(req, res);
      case 'update': return await handleUpdateBooking(req, res);
      case 'delete': return await handleDeleteBooking(req, res);
      default: return res.status(400).json({ error: 'Invalid route' });
    }
  } catch (error) {
    console.error('Error in bookings API:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
}

async function handleCreateBooking(req: AuthenticatedRequest, res: VercelResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { serviceId, date, timeSlot, notes } = req.body;

    if (!serviceId || !date || !timeSlot) {
      return res.status(400).json({ error: 'Service ID, date, and time slot are required' });
    }

    if (!req.user) {
      return res.status(401).json({ error: 'User not authenticated' });
    }

    const booking = new Booking({
      user: req.user.userId,
      service: serviceId,
      date,
      timeSlot,
      notes: notes || '',
      status: 'pending'
    });

    await booking.save();
    await booking.populate('service');
    
    return res.status(201).json(booking);
  } catch (error) {
    console.error('Create booking error:', error);
    return res.status(500).json({ error: 'Error creating booking' });
  }
}

async function handleListBookings(req: AuthenticatedRequest, res: VercelResponse) {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    if (!req.user) {
      return res.status(401).json({ error: 'User not authenticated' });
    }
    
    // Only admin can list all bookings
    if (req.user.role !== 'admin') {
      return res.status(403).json({ error: 'Forbidden' });
    }

    const { status, startDate, endDate } = req.query;
    const query: any = {};
    
    if (status) query.status = status;
    if (startDate || endDate) {
      query.date = {};
      if (startDate) query.date.$gte = new Date(startDate as string);
      if (endDate) query.date.$lte = new Date(endDate as string);
    }

    const bookings = await Booking.find(query)
      .populate('user', 'name email')
      .populate('service')
      .sort({ date: 1, 'timeSlot.start': 1 });
    
    return res.json(bookings);
  } catch (error) {
    console.error('List bookings error:', error);
    return res.status(500).json({ error: 'Error fetching bookings' });
  }
}

async function handleMyBookings(req: AuthenticatedRequest, res: VercelResponse) {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    if (!req.user) {
      return res.status(401).json({ error: 'User not authenticated' });
    }

    const bookings = await Booking.find({ user: req.user.userId })
      .populate('service')
      .sort({ date: -1, 'timeSlot.start': -1 });
    
    return res.json(bookings);
  } catch (error) {
    console.error('My bookings error:', error);
    return res.status(500).json({ error: 'Error fetching your bookings' });
  }
}

async function handleUpdateBooking(req: AuthenticatedRequest, res: VercelResponse) {
  if (req.method !== 'PUT') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { bookingId } = req.query;
    const { status, date, timeSlot, notes } = req.body;

    if (!bookingId) {
      return res.status(400).json({ error: 'Booking ID is required' });
    }

    if (!req.user) {
      return res.status(401).json({ error: 'User not authenticated' });
    }

    const updateData: any = {};
    if (status) updateData.status = status;
    if (date) updateData.date = date;
    if (timeSlot) updateData.timeSlot = timeSlot;
    if (notes !== undefined) updateData.notes = notes;

    const booking = await Booking.findOne({
      _id: bookingId,
      ...(req.user.role !== 'admin' ? { user: req.user.userId } : {})
    });

    if (!booking) {
      return res.status(404).json({ error: 'Booking not found' });
    }

    Object.assign(booking, updateData);
    await booking.save();
    await booking.populate('service');
    
    return res.json(booking);
  } catch (error) {
    console.error('Update booking error:', error);
    return res.status(500).json({ error: 'Error updating booking' });
  }
}

async function handleDeleteBooking(req: AuthenticatedRequest, res: VercelResponse) {
  if (req.method !== 'DELETE') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { bookingId } = req.query;

    if (!bookingId) {
      return res.status(400).json({ error: 'Booking ID is required' });
    }

    if (!req.user) {
      return res.status(401).json({ error: 'User not authenticated' });
    }

    const booking = await Booking.findOne({
      _id: bookingId,
      ...(req.user.role !== 'admin' ? { user: req.user.userId } : {})
    });

    if (!booking) {
      return res.status(404).json({ error: 'Booking not found' });
    }

    await Booking.deleteOne({ _id: booking._id });
    
    return res.status(204).end();
  } catch (error) {
    console.error('Delete booking error:', error);
    return res.status(500).json({ error: 'Error deleting booking' });
  }
}
