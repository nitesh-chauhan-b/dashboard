# Overview

This is an analytics dashboard application called "ADmyBRAND Insights" that provides comprehensive insights into advertising campaigns and performance metrics. The application displays key performance indicators, revenue tracking, campaign management, and data visualization through interactive charts and tables. It's built as a full-stack web application with a modern React frontend and Express.js backend, designed for marketing teams to monitor and analyze their advertising performance.

## Recent Changes (January 2025)

- ✅ **Complete CRUD Implementation**: Added full create, read, update, delete functionality for campaigns, orders, and products with modal interfaces
- ✅ **Data Persistence**: Implemented localStorage-based data persistence with 100+ sample entries across all entities
- ✅ **UI/UX Improvements**: Removed date filters from dashboard header and dark/light mode toggle from overview page per user requirements
- ✅ **Mobile Optimization**: Fixed mobile menu positioning to stay at top corner only
- ✅ **Brand Integration**: Properly sized ADmyBRAND logo and integrated brand styling throughout
- ✅ **Documentation**: Created comprehensive README.md with installation, setup, and architecture documentation

# User Preferences

Preferred communication style: Simple, everyday language.

# System Architecture

## Frontend Architecture

The client-side is built with **React 18** using TypeScript and follows a component-based architecture:

- **UI Framework**: Uses shadcn/ui components built on top of Radix UI primitives for consistent, accessible UI components
- **Styling**: Tailwind CSS with CSS variables for theming, supporting both light and dark modes
- **State Management**: React Query (@tanstack/react-query) for server state management and caching
- **Routing**: Wouter for lightweight client-side routing
- **Form Handling**: React Hook Form with Zod validation schemas
- **Charts & Visualization**: Recharts library for data visualization (line charts, pie charts, radar charts)
- **Build Tool**: Vite for fast development and optimized production builds

The frontend follows a modular structure with reusable UI components, hooks, and utility functions. The design system is centralized through shadcn/ui components with consistent theming.

## Backend Architecture

The server-side uses **Express.js** with TypeScript in a RESTful API pattern:

- **Runtime**: Node.js with ES modules
- **Framework**: Express.js with middleware for JSON parsing, request logging, and error handling
- **API Design**: RESTful endpoints for campaigns, metrics, and user management
- **Development**: Hot reloading with Vite integration for seamless full-stack development

The backend serves both API routes and static assets, with development-specific middleware for enhanced debugging and error reporting.

## Data Storage Solutions

The application uses a **PostgreSQL** database with Drizzle ORM:

- **Database**: PostgreSQL as the primary database
- **ORM**: Drizzle ORM for type-safe database operations
- **Schema**: Centralized schema definitions in TypeScript with Zod validation
- **Migrations**: Drizzle Kit for database migrations and schema management
- **Connection**: Neon Database serverless driver for PostgreSQL connections

For development and demonstration purposes, the application includes an in-memory storage implementation that mimics the database structure with mock data.

## Authentication and Authorization

The current implementation includes user schema definitions but authentication is not yet fully implemented. The schema supports:

- User management with username/password fields
- Session-based authentication patterns (connect-pg-simple dependency suggests PostgreSQL session store)

## Data Models

The application manages three core entities:

1. **Users**: Basic user authentication with username/password
2. **Campaigns**: Advertising campaigns with budget, spending, conversions, and performance metrics
3. **Metrics**: Overall business metrics including revenue, user counts, and growth rates

All schemas are defined with Drizzle ORM and include Zod validation for type safety across the full stack.

# External Dependencies

## Database Services
- **Neon Database**: Serverless PostgreSQL database hosting
- **Drizzle ORM**: TypeScript ORM for database operations
- **Drizzle Kit**: Database migration and management tools

## Frontend Libraries
- **Radix UI**: Headless UI component primitives for accessibility
- **Tailwind CSS**: Utility-first CSS framework
- **React Query**: Server state management and caching
- **Recharts**: Chart and data visualization library
- **React Hook Form**: Form state management
- **Zod**: Schema validation library
- **Wouter**: Lightweight React router

## Development Tools
- **Vite**: Build tool and development server
- **TypeScript**: Type system for JavaScript
- **ESBuild**: JavaScript bundler for production builds
- **PostCSS**: CSS processing with Autoprefixer

## Utility Libraries
- **clsx**: Conditional CSS class utilities
- **class-variance-authority**: Component variant utilities
- **date-fns**: Date manipulation library
- **nanoid**: Unique ID generation

The application is designed to be deployed on platforms that support Node.js applications with PostgreSQL databases, with specific optimizations for Replit's development environment.