# Vercel Deployment Guide

This guide explains how to deploy the ADmyBRAND Insights analytics dashboard to Vercel from GitHub.

## Prerequisites

1. A GitHub repository containing this project
2. A Vercel account (free tier works)
3. Optional: PostgreSQL database (Neon, PlanetScale, or Supabase)

## Deployment Steps

### 1. Push to GitHub

```bash
git init
git add .
git commit -m "Initial commit - ADmyBRAND Insights"
git branch -M main
git remote add origin https://github.com/yourusername/admybrand-insights.git
git push -u origin main
```

### 2. Connect to Vercel

1. Go to [vercel.com](https://vercel.com) and sign in
2. Click "New Project"
3. Import your GitHub repository
4. Vercel will automatically detect it as a Vite project

### 3. Configure Build Settings

Vercel should automatically detect the configuration from `vercel.json`, but verify:

- **Framework Preset**: Vite
- **Build Command**: `npm run build`
- **Output Directory**: `dist`
- **Install Command**: `npm install`

### 4. Environment Variables (Optional)

If you want to use a PostgreSQL database instead of in-memory storage:

1. In your Vercel project dashboard, go to Settings > Environment Variables
2. Add these variables:
   ```
   NODE_ENV=production
   DATABASE_URL=your_postgresql_connection_string
   USE_DATABASE=true
   ```

### 5. Deploy

Click "Deploy" and Vercel will:
- Install dependencies
- Build the Vite frontend
- Deploy the serverless API functions
- Provide you with a live URL

## Project Structure for Vercel

```
├── api/                    # Vercel serverless functions
│   ├── metrics.ts         # GET /api/metrics
│   ├── campaigns.ts       # GET/POST /api/campaigns  
│   └── campaigns/[id].ts  # GET/PUT/DELETE /api/campaigns/[id]
├── client/                # React frontend
├── server/                # Shared server logic
├── shared/                # Shared types and schemas
├── vercel.json           # Vercel configuration
└── vite.config.production.ts
```

## API Endpoints

The following API endpoints will be available:

- `GET /api/metrics` - Get dashboard metrics
- `GET /api/campaigns` - Get all campaigns
- `POST /api/campaigns` - Create new campaign
- `GET /api/campaigns/[id]` - Get specific campaign
- `PUT /api/campaigns/[id]` - Update campaign
- `DELETE /api/campaigns/[id]` - Delete campaign

## Features in Production

✅ **Analytics Dashboard** - Complete dashboard with charts and metrics
✅ **Campaign Management** - Full CRUD operations for campaigns
✅ **Product Management** - Product catalog with inventory tracking
✅ **Performance Analytics** - Detailed performance metrics and trends
✅ **Responsive Design** - Mobile-optimized interface
✅ **Dark/Light Mode** - Theme switching capability
✅ **Real-time Updates** - Dynamic data updates
✅ **Export Functionality** - PDF and CSV export capabilities

## Technical Stack

- **Frontend**: React 18, TypeScript, Tailwind CSS, Vite
- **Backend**: Vercel Serverless Functions, Express.js patterns
- **Database**: In-memory storage (upgradeable to PostgreSQL)
- **Charts**: Recharts for data visualization
- **UI Components**: shadcn/ui with Radix UI primitives

## Domain Configuration

To use a custom domain:

1. In Vercel dashboard, go to Settings > Domains
2. Add your custom domain
3. Configure DNS records as instructed
4. SSL certificates are automatically provisioned

## Environment Setup

The application works out of the box with in-memory storage. For production with persistent data:

1. Set up a PostgreSQL database (recommended: Neon, Supabase, or PlanetScale)
2. Add `DATABASE_URL` environment variable in Vercel
3. Set `USE_DATABASE=true`
4. The app will automatically switch to database storage

## Monitoring and Analytics

Vercel provides built-in:
- Performance monitoring
- Error tracking
- Usage analytics
- Function logs

Access these in your Vercel dashboard under the "Analytics" and "Functions" tabs.

## Troubleshooting

**Build fails**: Check that all dependencies are in `package.json`
**API not working**: Verify `vercel.json` configuration and API file structure
**Environment variables**: Make sure they're set in Vercel dashboard, not just locally

## Support

For deployment issues:
- Check Vercel deployment logs
- Verify environment variables
- Ensure GitHub repository is up to date
- Check API function responses in Network tab