# UVAC Coworking Space

A modern coworking space management system with booking capabilities.

## Project Structure

- `/client` - Frontend React application
- `/api` - Serverless API endpoints
- `/server` - Backend models and utilities
- `/shared` - Shared TypeScript types and schemas

## Prerequisites

- Node.js 16+ and npm
- MongoDB Atlas account or local MongoDB instance
- Vercel account

## Environment Variables

Create a `.env` file in the root directory with the following variables:

```
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret_key
NODE_ENV=development
```

## Local Development

1. Install dependencies:
   ```bash
   npm install
   cd client && npm install
   cd ../server && npm install
   cd ..
   ```

2. Start the development server:
   ```bash
   # Start frontend
   cd client && npm run dev
   
   # In a separate terminal, start the API server
   cd server && npm run dev
   ```

## Deployment to Vercel

1. Push your code to a GitHub/GitLab/Bitbucket repository

2. Deploy to Vercel:
   - Go to [Vercel](https://vercel.com) and import your repository
   - In the project settings, add the following environment variables:
     - `MONGO_URI` - Your MongoDB connection string
     - `JWT_SECRET` - A secure secret for JWT token generation
   - Set the build command: `npm run build`
   - Set the output directory: `client/dist` (for the frontend)
   - Deploy!

## API Endpoints

### Authentication
- `POST /api/auth?route=login` - User login
- `POST /api/auth?route=register` - User registration
- `GET /api/auth?route=me` - Get current user

### Bookings
- `GET /api/bookings?route=list` - List all bookings (admin only)
- `GET /api/bookings?route=my-bookings` - Get user's bookings
- `POST /api/bookings?route=create` - Create a booking
- `PUT /api/bookings?route=update&bookingId=:id` - Update a booking
- `DELETE /api/bookings?route=delete&bookingId=:id` - Delete a booking

### Services
- `GET /api/services?route=list` - List all services
- `POST /api/services?route=create` - Create a service (admin only)
- `PUT /api/services?route=update&serviceId=:id` - Update a service (admin only)
- `DELETE /api/services?route=delete&serviceId=:id` - Delete a service (admin only)

### Contact
- `POST /api/contact?route=submit` - Submit a contact form
- `GET /api/contact?route=list` - List all contact submissions (admin only)
- `PUT /api/contact?route=status&contactId=:id` - Update contact status (admin only)

## License

MIT
