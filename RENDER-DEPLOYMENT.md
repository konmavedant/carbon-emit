# Render Deployment Guide for Carbon Emission Calculator

## Why Render?
Render is perfect for full-stack applications like yours because it:
- Handles both frontend and backend in one service
- Automatically detects Node.js projects
- Provides free tier hosting
- Has simpler configuration than Vercel for full-stack apps

## Step-by-Step Deployment

### Step 1: Prepare Your Code

1. **Download the codebase** from Replit
2. **Extract** to your local computer
3. **Navigate** to the project directory

### Step 2: Push to GitHub

```bash
# Initialize git repository
git init

# Add all files
git add .

# Commit your code
git commit -m "Initial commit: Carbon Emission Calculator"

# Create a new repository on GitHub and push
git remote add origin https://github.com/yourusername/carbon-emission-calculator.git
git branch -M main
git push -u origin main
```

### Step 3: Deploy on Render

1. **Go to [render.com](https://render.com)** and sign up/login
2. **Click "New +"** → **"Web Service"**
3. **Connect your GitHub repository**
4. **Configure the service**:

#### Basic Settings:
- **Name**: `carbon-emission-calculator`
- **Region**: Choose closest to your users
- **Branch**: `main`
- **Runtime**: `Node`

#### Build & Deploy Settings:
- **Build Command**: `npm install && npm run build`
- **Start Command**: `npm start`
- **Instance Type**: `Free` (for testing)

#### Advanced Settings:
- **Auto-Deploy**: Yes (deploys on every push)

5. **Click "Create Web Service"**

### Step 4: Environment Variables (Optional)

In your Render dashboard:
1. Go to **"Environment"** tab
2. Add these variables:
   - `NODE_ENV` = `production`

### Step 5: Custom Domain (Optional)

1. In your service dashboard, go to **"Settings"**
2. Scroll to **"Custom Domains"**
3. Add your domain and follow DNS instructions

## Expected Build Output

Your Render service will:
1. Install dependencies (`npm install`)
2. Build the frontend (`vite build`) 
3. Start the server (`npm start`)
4. Serve both frontend and API on the same URL

## Service URLs

After deployment:
- **Main App**: `https://your-app-name.onrender.com`
- **API Endpoints**: `https://your-app-name.onrender.com/api/*`

## Testing Your Deployment

1. **Visit your app URL**
2. **Test Personal Calculator**:
   - Fill out the form
   - Submit and check results page
   - Verify charts and recommendations

3. **Test Industrial Calculator**:
   - Select industry type and company size
   - Enter emission data
   - Verify calculations and visualizations

## Render vs Other Platforms

### ✅ Advantages of Render:
- **Easier setup** for full-stack apps
- **Automatic SSL** certificates
- **Built-in monitoring** and logs
- **Free tier** available
- **No complex configuration** files needed

### 📝 Render Configuration Summary:
```yaml
# render.yaml (auto-generated)
services:
  - type: web
    name: carbon-emission-calculator
    env: node
    buildCommand: npm install && npm run build
    startCommand: npm start
    plan: free
```

## Troubleshooting

### Build Fails:
- Check build logs in Render dashboard
- Ensure `npm run build` works locally
- Verify all dependencies are in package.json

### App Doesn't Load:
- Check if start command is correct
- Verify port configuration (Render uses PORT environment variable)
- Check application logs for errors

### API Routes Don't Work:
- Ensure server is set up to handle API routes
- Check that both frontend and backend are served from same domain
- Verify CORS settings if needed

## Production Considerations

1. **Performance**: Upgrade to paid plan for better performance
2. **Database**: Consider adding PostgreSQL service on Render
3. **Monitoring**: Use Render's built-in monitoring
4. **Backups**: Set up regular backups if using database
5. **Scaling**: Configure auto-scaling for high traffic

## Cost Estimation

- **Free Tier**: Perfect for testing and small projects
- **Paid Plans**: Start at $7/month for production apps
- **Database**: PostgreSQL starts at $7/month

## Support Resources

- **Render Docs**: [render.com/docs](https://render.com/docs)
- **Community**: Render Discord community
- **Support**: Email support for paid plans

Your Carbon Emission Calculator will be live and accessible worldwide once deployed on Render!