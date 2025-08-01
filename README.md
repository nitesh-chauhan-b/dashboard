# ADmyBRAND Insights - Analytics Dashboard

A modern, responsive analytics dashboard for digital marketing agencies providing comprehensive campaign insights, performance metrics, and data visualization capabilities.

![ADmyBRAND Dashboard](./attached_assets/brand_logo_1754028925378.png)

## 🚀 Features

- **Real-time Analytics**: Live campaign performance tracking with dynamic updates
- **Interactive Charts**: Revenue tracking, conversion metrics, and performance visualization
- **Campaign Management**: Full CRUD operations for advertising campaigns
- **Order Tracking**: Complete order management with status tracking and customer details
- **Product Catalog**: Inventory management with stock levels and sales tracking
- **Data Export**: PDF and CSV export capabilities with branded styling
- **Responsive Design**: Mobile-first design that works seamlessly across all devices
- **Dark/Light Mode**: Theme switching with persistent user preferences
- **Brand Integration**: Custom branding with logo and styled components

## 📋 Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js** (version 18 or higher)
- **npm** (comes with Node.js)
- **Git** (for version control)

## 🛠️ Installation

### 1. Clone the Repository

```bash
git clone <repository-url>
cd admybrand-insights
```

### 2. Install Dependencies

The project uses npm for package management. Install all required dependencies:

```bash
npm install
```

This will install all packages listed in `package.json`, including:

#### Frontend Dependencies
- **React 18** - UI framework
- **TypeScript** - Type safety
- **Tailwind CSS** - Styling framework
- **shadcn/ui** - UI component library
- **React Query** - Server state management
- **Wouter** - Lightweight routing
- **Recharts** - Data visualization
- **React Hook Form** - Form management
- **Zod** - Schema validation

#### Backend Dependencies
- **Express.js** - Web server framework
- **Drizzle ORM** - Database operations
- **PostgreSQL** - Database (via Neon)
- **TypeScript** - Type safety

#### Development Tools
- **Vite** - Build tool and dev server
- **ESBuild** - JavaScript bundler
- **PostCSS** - CSS processing

### 3. Environment Setup

Create a `.env` file in the root directory (if not already present):

```bash
# Database Configuration
DATABASE_URL="your_postgresql_connection_string"

# Development Settings
NODE_ENV="development"
PORT=5000
```

## 🚀 Running the Project

### Development Mode

Start the development server with hot reloading:

```bash
npm run dev
```

This command:
- Starts the Express.js backend server on port 5000
- Launches the Vite development server for the frontend
- Enables hot module replacement (HMR) for instant updates
- Serves the application at `http://localhost:5000`

### Production Build

To build the project for production:

```bash
npm run build
```

### Preview Production Build

To preview the production build locally:

```bash
npm run preview
```

## 📁 Project Structure

```
admybrand-insights/
├── client/                          # Frontend React application
│   ├── src/
│   │   ├── components/              # Reusable UI components
│   │   │   ├── ui/                  # shadcn/ui components
│   │   │   ├── dashboard/           # Dashboard-specific components
│   │   │   └── modals/              # Modal dialog components
│   │   ├── hooks/                   # Custom React hooks
│   │   ├── lib/                     # Utility libraries
│   │   │   ├── queryClient.ts       # React Query configuration
│   │   │   ├── utils.ts             # General utilities
│   │   │   ├── local-storage.ts     # Data persistence
│   │   │   ├── pdf-generator.ts     # PDF export functionality
│   │   │   └── csv-exporter.ts      # CSV export functionality
│   │   ├── pages/                   # Page components
│   │   │   ├── dashboard.tsx        # Main dashboard overview
│   │   │   ├── campaigns.tsx        # Campaign management
│   │   │   ├── orders.tsx           # Order tracking
│   │   │   ├── products.tsx         # Product catalog
│   │   │   └── performance.tsx      # Performance analytics
│   │   ├── App.tsx                  # Main application component
│   │   ├── main.tsx                 # Application entry point
│   │   └── index.css                # Global styles and themes
│   └── index.html                   # HTML template
├── server/                          # Backend Express.js application
│   ├── index.ts                     # Server entry point
│   ├── routes.ts                    # API route definitions
│   ├── storage.ts                   # Data storage interface
│   └── vite.ts                      # Vite integration
├── shared/                          # Shared types and schemas
│   └── schema.ts                    # Database schemas and types
├── attached_assets/                 # Brand assets and images
│   ├── brand_logo_1754028925378.png # Company logo
│   └── brand_sample_text_1754028925379.png # Brand text
├── components.json                  # shadcn/ui configuration
├── drizzle.config.ts               # Database configuration
├── tailwind.config.ts              # Tailwind CSS configuration
├── tsconfig.json                   # TypeScript configuration
├── vite.config.ts                  # Vite build configuration
├── package.json                    # Dependencies and scripts
└── README.md                       # This file
```

## 🏗️ Architecture Overview

### Frontend Architecture

The client-side application is built with **React 18** and follows modern best practices:

- **Component-Based**: Modular, reusable components with clear separation of concerns
- **Type Safety**: Full TypeScript integration for enhanced developer experience
- **State Management**: React Query for server state, React hooks for local state
- **Styling**: Tailwind CSS with shadcn/ui components for consistent design
- **Routing**: Wouter for lightweight, efficient client-side routing

### Backend Architecture

The server-side uses **Express.js** with TypeScript:

- **RESTful API**: Clean, predictable endpoints for all data operations
- **Type-Safe ORM**: Drizzle ORM with PostgreSQL for robust data management
- **Middleware**: Request logging, JSON parsing, and error handling
- **Development Integration**: Seamless Vite integration for full-stack development

### Data Storage

- **Primary Database**: PostgreSQL via Neon Database (serverless)
- **Local Storage**: Browser localStorage for client-side data persistence
- **Schema Management**: Drizzle Kit for migrations and schema updates
- **Validation**: Zod schemas for runtime type checking

## 🎨 Customization

### Branding

The application supports custom branding through:

1. **Logo**: Replace `attached_assets/brand_logo_1754028925378.png`
2. **Brand Text**: Update `attached_assets/brand_sample_text_1754028925379.png`
3. **Colors**: Modify the color palette in `client/src/index.css`
4. **Themes**: Customize light/dark mode colors

### Styling

The project uses a design system based on:

- **Tailwind CSS**: Utility-first CSS framework
- **CSS Variables**: Theme colors defined in `:root` and `.dark`
- **shadcn/ui**: Consistent, accessible component library
- **Responsive Design**: Mobile-first approach with breakpoint utilities

## 📊 Data Management

### Mock Data

The application includes comprehensive mock data for demonstration:

- **100+ Campaigns**: Diverse advertising campaigns with realistic metrics
- **500+ Orders**: Customer orders with various statuses and tracking
- **200+ Products**: Product catalog with inventory and sales data

### Data Persistence

- **LocalStorage**: All data persists across browser sessions
- **Real-time Updates**: Simulated live data updates with notifications
- **Export Capabilities**: PDF and CSV export with branded styling

## 🔧 Development

### Adding New Pages

1. Create a new component in `client/src/pages/`
2. Add the route to `client/src/App.tsx`
3. Update navigation in `client/src/components/dashboard/sidebar.tsx`

### Adding New Components

1. Create component in appropriate `client/src/components/` subdirectory
2. Export from the component file
3. Import and use in parent components

### Database Schema Changes

1. Update schemas in `shared/schema.ts`
2. Run database migrations if using PostgreSQL
3. Update TypeScript types accordingly

## 🚀 Deployment

### Replit Deployment

This project is optimized for Replit deployment:

1. Push your code to the Replit repository
2. Ensure all environment variables are set
3. Use the "Deploy" button in Replit interface
4. Configure custom domain if needed

### Other Platforms

The application can be deployed to any Node.js hosting platform:

- **Vercel**: Zero-configuration deployment
- **Netlify**: JAMstack deployment with serverless functions
- **Heroku**: Traditional PaaS deployment
- **DigitalOcean**: VPS deployment with PM2

## 🐛 Troubleshooting

### Common Issues

1. **Port conflicts**: Change the port in server configuration
2. **Database connection**: Verify DATABASE_URL in environment variables
3. **Build errors**: Clear node_modules and reinstall dependencies
4. **Type errors**: Ensure all TypeScript configurations are correct

### Getting Help

- Check the console for error messages
- Verify all dependencies are installed correctly
- Ensure environment variables are properly configured
- Review the project structure and file paths

## 📝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🙏 Acknowledgments

- **shadcn/ui** for the excellent component library
- **Tailwind CSS** for the utility-first CSS framework
- **React Query** for powerful data fetching
- **Recharts** for beautiful data visualization
- **Replit** for the development and hosting platform