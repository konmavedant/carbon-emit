# Vercel Deployment Guide

## Prerequisites
- Node.js 18+ installed
- Vercel CLI installed: `npm install -g vercel`
- GitHub account
- Vercel account

## Step 1: Download and Setup

1. Download the complete codebase from Replit
2. Extract to a local directory
3. Navigate to the project directory:
   ```bash
   cd carbon-emission-calculator
   ```

4. Install dependencies:
   ```bash
   npm install
   ```

## Step 2: Database Setup

Since this application uses in-memory storage, you have two options:

### Option A: Keep In-Memory Storage (Recommended for demo)
- No additional setup required
- Data will reset on each deployment
- Perfect for demonstration purposes

### Option B: Add Database (For production)
1. Create a Neon database account
2. Get your connection string
3. Add to Vercel environment variables

## Step 3: Push to GitHub

1. Initialize git repository:
   ```bash
   git init
   git add .
   git commit -m "Initial commit: Carbon Emission Calculator"
   ```

2. Create a new repository on GitHub
3. Push your code:
   ```bash
   git remote add origin https://github.com/yourusername/carbon-emission-calculator.git
   git branch -M main
   git push -u origin main
   ```

## Step 4: Deploy to Vercel

### Method 1: Using Vercel Dashboard (Recommended)

1. Go to [vercel.com](https://vercel.com)
2. Sign in with your GitHub account
3. Click "New Project"
4. Select your repository
5. Configure build settings:
   - **Framework Preset**: Vite
   - **Build Command**: `npm run build`
   - **Output Directory**: `client/dist`
   - **Install Command**: `npm install`

6. Click "Deploy"

### Method 2: Using Vercel CLI

1. Login to Vercel:
   ```bash
   vercel login
   ```

2. Deploy:
   ```bash
   vercel --prod
   ```

## Step 5: Environment Variables (Optional)

If you added a database, set these in Vercel dashboard:
- `DATABASE_URL`: Your database connection string
- `NODE_ENV`: `production`

## Step 6: Custom Domain (Optional)

1. Go to your project settings in Vercel
2. Navigate to "Domains"
3. Add your custom domain

## Deployment Structure

```
├── client/              # Frontend React app
│   ├── src/
│   └── dist/           # Built files (auto-generated)
├── server/             # Backend API
├── shared/             # Shared types and schemas
├── api/                # Vercel serverless functions
└── vercel.json         # Vercel configuration
```

## Troubleshooting

### Build Errors
- Ensure all dependencies are installed
- Check TypeScript errors: `npm run check`
- Verify build command works locally: `npm run build`

### API Routes Not Working
- Check that `api/index.ts` is properly configured
- Verify API routes in `server/routes.ts`
- Check Vercel function logs in dashboard

### Frontend Not Loading
- Ensure `client/dist` directory exists after build
- Check if `client/index.html` is present
- Verify build output directory in Vercel settings

## Production Considerations

1. **Database**: Consider upgrading to PostgreSQL for production
2. **Environment Variables**: Set all required secrets in Vercel
3. **Monitoring**: Enable Vercel Analytics
4. **Performance**: Consider adding caching strategies
5. **Security**: Implement rate limiting and input validation

## Support

For deployment issues:
- Check Vercel documentation
- Review build logs in Vercel dashboard
- Ensure all files are committed to Git