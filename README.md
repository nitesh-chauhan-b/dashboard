# Dashboard

A modern, responsive analytics dashboard built with React, TypeScript, and Tailwind CSS. This application provides comprehensive insights into advertising campaigns, performance metrics, and data visualization.

## 🚀 Live Demo

**Deployed on Vercel:** [https://dashboard-rouge-beta-qw10397zlx.vercel.app/](https://dashboard-rouge-beta-qw10397zlx.vercel.app/)

## ✨ Features

- **Real-time Metrics**: Revenue tracking, user analytics, and conversion metrics
- **Interactive Charts**: Line charts, pie charts, radar charts with hover effects
- **Campaign Management**: Complete CRUD operations for advertising campaigns
- **Data Export**: PDF and CSV export functionality

### 🎨 Design & UX
- **Dark/Light Mode**: Seamless theme switching with persistent preferences
- **Responsive Design**: Mobile-first approach with optimized layouts
- **Modern UI**: Built with shadcn/ui components and Tailwind CSS
- **Smooth Animations**: Enhanced user experience with Framer Motion

### 📈 Analytics Features
- **Performance Tracking**: Campaign performance metrics and trends
- **Revenue Analysis**: Monthly revenue tracking with targets
- **User Segmentation**: Premium vs Basic plan user analytics
- **Regional Sales**: Geographic distribution of sales data
- **Platform Analytics**: E-commerce platform performance comparison

### 🛠 Technical Features
- **TypeScript**: Full type safety across the application
- **Modular Architecture**: Component-based design for maintainability
- **State Management**: React Query for server state management
- **Form Validation**: React Hook Form with Zod schemas
- **Data Persistence**: localStorage-based data management

## 🏗 Tech Stack

### Frontend
- **React 18** - Modern React with hooks and concurrent features
- **TypeScript** - Type-safe development
- **Vite** - Fast build tool and development server
- **Tailwind CSS** - Utility-first CSS framework
- **shadcn/ui** - High-quality UI components
- **Recharts** - Data visualization library
- **React Query** - Server state management
- **React Hook Form** - Form handling and validation
- **Wouter** - Lightweight routing

### Backend
- **Express.js** - Node.js web framework
- **TypeScript** - Type-safe backend development
- **Drizzle ORM** - Type-safe database operations
- **PostgreSQL** - Primary database (configured for production)
- **Vercel Functions** - Serverless API endpoints

### Development Tools
- **ESLint** - Code linting
- **Prettier** - Code formatting
- **PostCSS** - CSS processing
- **Autoprefixer** - CSS vendor prefixes

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ 
- npm or yarn package manager

### Installation

1. **Clone and enter the repository**

   ```bash
   git clone https://github.com/nitesh-chauhan-b/dashboard.git
   cd dashboard
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Environment Setup**
   ```bash
   cp .env.example .env
   ```
   Update the `.env` file with your configuration values.

4. **To Start Project**
   ```bash
   npm start
   ```

5. **Open your browser**
   Navigate to `http://localhost:5000`

##

## 📁 Project Structure

```
admybrand-insights/
├── api/                    # Vercel serverless functions
│   ├── campaigns.ts       # Campaign management API
│   ├── metrics.ts         # Analytics metrics API
│   ├── products.ts        # Product management API
│   └── orders.ts          # Order management API
├── client/                # Frontend application
│   ├── src/
│   │   ├── components/    # Reusable UI components
│   │   ├── pages/         # Application pages
│   │   ├── lib/           # Utility functions
│   │   └── hooks/         # Custom React hooks
├── server/                # Backend server (development)
├── shared/                # Shared types and schemas
├── public/                # Static assets
└── docs/                  # Documentation
```

## 🎯 Key Features Walkthrough

### Dashboard Overview
- **Metrics Cards**: Key performance indicators with trend indicators
- **Revenue Chart**: Monthly revenue vs targets with interactive tooltips
- **Regional Analysis**: Sales performance across different regions
- **User Analytics**: Premium vs Basic plan user distribution

### Campaign Management
- **Campaign List**: Sortable and filterable campaign table
- **CRUD Operations**: Create, read, update, delete campaigns
- **Performance Metrics**: CTR, conversions, budget tracking
- **Status Management**: Active, paused, and completed campaigns

### Performance Analytics
- **Trend Analysis**: Performance metrics over time
- **Channel Distribution**: Marketing channel effectiveness
- **Cost Analysis**: Budget allocation and spending patterns

## 🚀 Deployment

### Vercel Deployment (Recommended)

1. **Connect to GitHub**
   - Import your repository to Vercel
   - Vercel will auto-detect the Vite framework

2. **Environment Variables**
   - Add your environment variables in Vercel dashboard
   - Ensure all `VITE_` prefixed variables are set

3. **Deploy**
   - Vercel will automatically build and deploy
   - Your app will be available at `your-app.vercel.app`

### Manual Deployment

1. **Build the application**
   ```bash
   npm run build
   ```

2. **Deploy the `dist` folder**
   Upload the contents of the `dist` folder to your hosting provider.

## 🔧 Configuration

### Environment Variables

```env
# Development
NODE_ENV=development
VITE_API_URL=http://localhost:5000/api

# Database (Production)
DATABASE_URL=your_postgresql_connection_string

# Optional: Analytics
VITE_ANALYTICS_ID=your_analytics_id
```

## 📊 Performance

### Lighthouse Scores
- **Performance**: 95+
- **Accessibility**: 100
- **Best Practices**: 100
- **SEO**: 95+

### Optimization Features
- **Code Splitting**: Automatic route-based code splitting
- **Image Optimization**: Responsive images with lazy loading
- **Bundle Analysis**: Webpack bundle analyzer integration
- **Caching**: Strategic caching for optimal performance

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

### Development Guidelines
- Follow TypeScript best practices
- Use semantic commit messages
- Ensure all tests pass
- Update documentation as needed

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- **shadcn/ui** for the excellent component library
- **Recharts** for beautiful and responsive charts
- **Tailwind CSS** for the utility-first CSS framework
- **React Query** for powerful data fetching and caching
