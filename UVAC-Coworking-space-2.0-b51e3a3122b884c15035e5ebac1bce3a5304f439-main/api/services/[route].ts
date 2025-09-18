import { VercelRequest, VercelResponse } from '@vercel/node';
import { connectToDatabase } from '../_lib/db';
import { getUserFromToken } from '../../server/middleware/auth';
import { Service } from '../../server/models/service.model';
import Booking from '../../server/models/Booking';
import mongoose from 'mongoose';

type ServiceRequest = VercelRequest & {
  query: {
    route?: string;
    serviceId?: string;
  };
};

export default async function handler(req: ServiceRequest, res: VercelResponse) {
  await connectToDatabase();
  
  const { route } = req.query;
  
  try {
    switch (route) {
      case 'list':
        return await handleListServices(req, res);
      case 'create':
        return await handleCreateService(req, res);
      case 'update':
        return await handleUpdateService(req, res);
      case 'delete':
        return await handleDeleteService(req, res);
      default:
        return res.status(404).json({ message: 'Not found' });
    }
  } catch (error) {
    console.error('Services error:', error);
    return res.status(500).json({ message: 'Internal server error' });
  }
}

// Middleware to authenticate admin
async function authenticateAdmin(req: ServiceRequest) {
  const authHeader = req.headers.authorization;
  const token = authHeader && authHeader.split(' ')[1];
  
  if (!token) {
    throw new Error('No token provided');
  }
  
  const user = await getUserFromToken(token);
  if (!user || user.role !== 'admin') {
    throw new Error('Unauthorized');
  }
  
  return user;
}

async function handleListServices(req: ServiceRequest, res: VercelResponse) {
  if (req.method !== 'GET') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  try {
    const { active } = req.query as { active?: string };
    const query: any = {};
    
    if (active === 'true') {
      query.isActive = true;
    } else if (active === 'false') {
      query.isActive = false;
    }

    const services = await Service.find(query).sort({ name: 1 });
    return res.json(services);
  } catch (error) {
    console.error('List services error:', error);
    return res.status(500).json({ message: 'Error fetching services' });
  }
}

async function handleCreateService(req: ServiceRequest, res: VercelResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  try {
    await authenticateAdmin(req);
    
    const { name, description, price, duration, isActive = true } = req.body as {
      name: string;
      description: string;
      price: number;
      duration: number;
      isActive?: boolean;
    };
    
    if (!name || !description || price === undefined || duration === undefined) {
      return res.status(400).json({ 
        message: 'Name, description, price, and duration are required' 
      });
    }

    const service = new Service({
      name,
      description,
      price: Number(price),
      duration: Number(duration),
      isActive: Boolean(isActive)
    });

    await service.save();
    
    return res.status(201).json(service);
  } catch (error: any) {
    if (error.message === 'No token provided' || error.message === 'Unauthorized') {
      return res.status(401).json({ message: error.message });
    }
    console.error('Create service error:', error);
    return res.status(500).json({ message: 'Error creating service' });
  }
}

async function handleUpdateService(req: ServiceRequest, res: VercelResponse) {
  if (req.method !== 'PUT') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  try {
    await authenticateAdmin(req);
    
    const { serviceId } = req.query;
    const { name, description, price, duration, isActive } = req.body as {
      name?: string;
      description?: string;
      price?: number;
      duration?: number;
      isActive?: boolean;
    };
    
    if (!serviceId) {
      return res.status(400).json({ message: 'Service ID is required' });
    }

    const service = await Service.findById(serviceId);
    if (!service) {
      return res.status(404).json({ message: 'Service not found' });
    }

    if (name) service.name = name;
    if (description) service.description = description;
    if (price !== undefined) service.price = Number(price);
    if (duration !== undefined) service.duration = Number(duration);
    if (isActive !== undefined) service.isActive = Boolean(isActive);

    await service.save();
    
    return res.json(service);
  } catch (error: any) {
    if (error.message === 'No token provided' || error.message === 'Unauthorized') {
      return res.status(401).json({ message: error.message });
    }
    console.error('Update service error:', error);
    return res.status(500).json({ message: 'Error updating service' });
  }
}

async function handleDeleteService(req: ServiceRequest, res: VercelResponse) {
  if (req.method !== 'DELETE') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  try {
    await authenticateAdmin(req);
    
    const { serviceId } = req.query;
    
    if (!serviceId) {
      return res.status(400).json({ message: 'Service ID is required' });
    }

    // Check if there are any bookings for this service
    const bookingCount = await Booking.countDocuments({ 
      service: new mongoose.Types.ObjectId(serviceId as string) 
    });
    if (bookingCount > 0) {
      return res.status(400).json({ 
        message: 'Cannot delete service with existing bookings. Deactivate it instead.' 
      });
    }

    const service = await Service.findByIdAndDelete(new mongoose.Types.ObjectId(serviceId as string));
    
    if (!service) {
      return res.status(404).json({ message: 'Service not found' });
    }
    
    return res.status(204).end();
  } catch (error: any) {
    if (error.message === 'No token provided' || error.message === 'Unauthorized') {
      return res.status(401).json({ message: error.message });
    }
    console.error('Delete service error:', error);
    return res.status(500).json({ message: 'Error deleting service' });
  }
}
