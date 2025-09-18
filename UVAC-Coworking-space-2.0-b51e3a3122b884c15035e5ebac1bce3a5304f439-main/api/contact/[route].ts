import { VercelRequest, VercelResponse } from '@vercel/node';
import { connectToDatabase } from '../_lib/db';
import { authenticateToken, getUserFromToken } from '../../server/middleware/auth';
import Contact from '../../server/models/Contact';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  await connectToDatabase();
  
  const { route } = req.query;
  
  try {
    switch (route) {
      case 'submit':
        return await handleSubmitContact(req, res);
      case 'list':
        return await handleListContacts(req, res);
      case 'status':
        return await handleUpdateStatus(req, res);
      default:
        return res.status(404).json({ message: 'Not found' });
    }
  } catch (error) {
    console.error('Contact error:', error);
    return res.status(500).json({ message: 'Internal server error' });
  }
}

async function handleSubmitContact(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  try {
    const { name, email, subject, message } = req.body;
    
    if (!name || !email || !message) {
      return res.status(400).json({ 
        message: 'Name, email, and message are required' 
      });
    }

    // Basic email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({ message: 'Invalid email format' });
    }

    const contact = new Contact({
      name,
      email,
      subject: subject || 'No subject',
      message,
      status: 'new',
      submittedAt: new Date()
    });

    await contact.save();
    
    // Here you would typically send an email notification
    // await sendContactEmail(contact);
    
    return res.status(201).json({ 
      message: 'Thank you for your message. We will get back to you soon!',
      contact
    });
  } catch (error) {
    console.error('Submit contact error:', error);
    return res.status(500).json({ 
      message: 'Error submitting your message. Please try again later.' 
    });
  }
}

async function handleListContacts(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'GET') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  try {
    // Authenticate admin
    const authHeader = req.headers.authorization;
    const token = authHeader && authHeader.split(' ')[1];
    
    if (!token) {
      return res.status(401).json({ message: 'No token provided' });
    }
    
    const user = getUserFromToken(token);
    if (!user || user.role !== 'admin') {
      return res.status(403).json({ message: 'Forbidden' });
    }

    const { status, startDate, endDate } = req.query;
    const query: any = {};
    
    if (status) query.status = status;
    if (startDate || endDate) {
      query.submittedAt = {};
      if (startDate) query.submittedAt.$gte = new Date(startDate as string);
      if (endDate) query.submittedAt.$lte = new Date(endDate as string);
    }

    const contacts = await Contact.find(query)
      .sort({ submittedAt: -1 });
    
    return res.json(contacts);
  } catch (error: any) {
    if (error.message === 'No token provided' || error.message === 'Invalid token') {
      return res.status(401).json({ message: error.message });
    }
    console.error('List contacts error:', error);
    return res.status(500).json({ message: 'Error fetching contacts' });
  }
}

async function handleUpdateStatus(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'PUT') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  try {
    // Authenticate admin
    const authHeader = req.headers.authorization;
    const token = authHeader && authHeader.split(' ')[1];
    
    if (!token) {
      return res.status(401).json({ message: 'No token provided' });
    }
    
    const user = getUserFromToken(token);
    if (!user || user.role !== 'admin') {
      return res.status(403).json({ message: 'Forbidden' });
    }

    const { contactId } = req.query;
    const { status, adminNotes } = req.body;
    
    if (!contactId) {
      return res.status(400).json({ message: 'Contact ID is required' });
    }
    
    if (!status || !['new', 'in_progress', 'resolved', 'spam'].includes(status)) {
      return res.status(400).json({ 
        message: 'Valid status is required (new, in_progress, resolved, spam)' 
      });
    }

    const updateData: any = { status };
    if (adminNotes) updateData.adminNotes = adminNotes;
    
    const contact = await Contact.findByIdAndUpdate(
      contactId,
      updateData,
      { new: true }
    );
    
    if (!contact) {
      return res.status(404).json({ message: 'Contact not found' });
    }
    
    return res.json(contact);
  } catch (error: any) {
    if (error.message === 'No token provided' || error.message === 'Invalid token') {
      return res.status(401).json({ message: error.message });
    }
    console.error('Update contact status error:', error);
    return res.status(500).json({ message: 'Error updating contact status' });
  }
}
