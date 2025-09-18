# Cowolocation - Workspace Rental Platform

## Overview

This is a fullstack web application for a workspace rental service called "Cowolocation". The application allows users to browse different workspace services like office spaces, coworking spaces, virtual offices, and more. Users can register accounts, login, and contact the business through a contact form.

The application follows a client-server architecture with a React frontend and Express backend. It uses Drizzle ORM with Postgres for data persistence and features user authentication via Passport.js.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend

- **Framework**: React with TypeScript
- **Routing**: Wouter for lightweight client-side routing
- **Styling**: Tailwind CSS with shadcn/ui component library
- **State Management**: React Query for server state management
- **Theme Support**: Light/dark mode with theme persistence

The frontend is organized using a feature-based architecture with pages, components, and shared utilities. Components are categorized as either UI components (generic, reusable) or domain-specific (like auth forms, layout elements).

### Backend

- **Framework**: Express.js with TypeScript
- **API Style**: RESTful API endpoints
- **Authentication**: Passport.js with local strategy
- **Session Management**: Express-session with MemoryStore (would need migration to a persistent store for production)

The backend serves both the API and the static frontend assets in production mode, with middleware for logging API requests.

### Database

- **ORM**: Drizzle ORM
- **Schema**: Defined in shared/schema.ts with users and inquiries tables
- **Schema Validation**: Integration with Zod for type-safe validation

### Data Flow

1. Client makes requests to the Express backend
2. Express routes handle the requests
3. Business logic interacts with the Drizzle ORM storage layer
4. Data is returned to the client through the API

## Key Components

### Frontend Components

1. **Pages**: Home, About, Contact, Login, Register, and various service pages
2. **Layout**: Header and Footer components for consistent navigation
3. **UI Components**: Shadcn/ui based components for consistent design
4. **Forms**: Login, Register, and Contact forms with validation

### Backend Components

1. **Server**: Express application with middleware setup
2. **Routes**: API endpoints for authentication and data access
3. **Storage**: Currently using an in-memory storage implementation, prepared for database integration
4. **Authentication**: Passport.js based user authentication

### Data Models

1. **User**: User account information with username, password, name, email
2. **Inquiry**: Contact form submissions with name, email, phone, message

## External Dependencies

### Frontend Dependencies

- **UI Libraries**: shadcn/ui, Radix UI components
- **Data Fetching**: TanStack React Query
- **Routing**: Wouter
- **Form Handling**: React Hook Form with Zod validation

### Backend Dependencies

- **Web Framework**: Express.js
- **Authentication**: Passport.js with local strategy
- **Session Management**: express-session
- **Database**: Drizzle ORM (configured for PostgreSQL)

## Deployment Strategy

The application is configured for deployment on Replit with:

1. **Development**: `npm run dev` for local development with hot-reloading
2. **Build**: `npm run build` compiles frontend and backend for production
3. **Start**: `npm run start` runs the production build

The project includes a `.replit` configuration that sets up:
- Node.js 20 and PostgreSQL 16 environment
- Appropriate port forwarding (5000 → 80)
- Build and run commands for deployment

## Development Workflow

1. Database schema is defined in `shared/schema.ts`
2. API endpoints are added to the Express server in `server/routes.ts`
3. Frontend components interact with the API using React Query
4. Styling is done via Tailwind CSS classes with shadcn/ui components

## Next Steps for Implementation

1. Complete the API endpoints in `server/routes.ts`
2. Implement proper database integration with PostgreSQL
3. Add proper password hashing for user authentication
4. Implement the missing backend routes for inquiries and other features
5. Add user profile functionality and service booking features
6. Set up proper error handling and validation

## Notes

- The application currently uses an in-memory storage implementation that will need to be replaced with a proper PostgreSQL implementation.
- Authentication is implemented with plain text passwords which should be replaced with proper password hashing for security.
- The Drizzle ORM is configured but not fully implemented in storage operations yet.