# Kape X Buhat Spa - Vercel Deployment Guide

## 🚀 Quick Deployment Steps

### 1. Prerequisites
- [ ] Vercel account (sign up at [vercel.com](https://vercel.com))
- [ ] GitHub account
- [ ] Your project code pushed to GitHub

### 2. Prepare Your Project

#### Option A: Deploy from GitHub (Recommended)
1. **Push your code to GitHub:**
   ```bash
   git init
   git add .
   git commit -m "Initial commit for Vercel deployment"
   git branch -M main
   git remote add origin https://github.com/YOUR_USERNAME/kape-x-buhat-spa.git
   git push -u origin main
   ```

2. **Connect to Vercel:**
   - Go to [vercel.com](https://vercel.com)
   - Click "New Project"
   - Import your GitHub repository
   - Vercel will auto-detect it's a Vite React app

#### Option B: Deploy with Vercel CLI
1. **Install Vercel CLI:**
   ```bash
   npm i -g vercel
   ```

2. **Login to Vercel:**
   ```bash
   vercel login
   ```

3. **Deploy:**
   ```bash
   cd kape-x-buhat-spa
   vercel
   ```

### 3. Vercel Configuration

#### Build Settings (Auto-detected)
- **Framework Preset:** Vite
- **Build Command:** `npm run build`
- **Output Directory:** `dist`
- **Install Command:** `npm install`

#### Environment Variables (Optional for now)
Add these in Vercel Dashboard → Project Settings → Environment Variables:
```
NODE_ENV=production
VITE_APP_NAME=Kape X Buhat Spa
VITE_APP_VERSION=1.0.0
```

### 4. Domain Configuration
- **Automatic:** Vercel provides `your-project.vercel.app`
- **Custom Domain:** Add your own domain in Project Settings

### 5. Database Setup (Future Enhancement)
For full functionality, you'll need to set up a database:

#### Option A: PlanetScale (MySQL)
1. Create account at [planetscale.com](https://planetscale.com)
2. Create database from your `database/kape_x_buhat_spa.sql`
3. Add connection string to Vercel environment variables

#### Option B: Supabase (PostgreSQL)
1. Create account at [supabase.com](https://supabase.com)
2. Convert SQL schema to PostgreSQL
3. Add connection string to Vercel environment variables

#### Option C: MongoDB Atlas
1. Create account at [mongodb.com/atlas](https://mongodb.com/atlas)
2. Create cluster and database
3. Add connection string to Vercel environment variables

### 6. Post-Deployment Checklist

#### ✅ Test Your Deployment
- [ ] Homepage loads correctly
- [ ] Navigation works
- [ ] Login/Register functionality
- [ ] Menu displays properly
- [ ] Cart functionality
- [ ] Checkout process
- [ ] Profile page
- [ ] Order history
- [ ] Amenities booking
- [ ] Gallery page

#### ✅ Performance Optimization
- [ ] Images are optimized
- [ ] Build size is reasonable
- [ ] Loading times are acceptable
- [ ] Mobile responsiveness works

#### ✅ Security
- [ ] Environment variables are secure
- [ ] No sensitive data in client code
- [ ] HTTPS is enabled (automatic with Vercel)

### 7. Troubleshooting

#### Common Issues:
1. **Build Fails:**
   - Check `package.json` scripts
   - Ensure all dependencies are in `dependencies` not `devDependencies`
   - Verify TypeScript compilation

2. **404 Errors:**
   - Ensure `vercel.json` is configured correctly
   - Check routing configuration

3. **Images Not Loading:**
   - Verify image paths are correct
   - Check if images are in `public` folder

4. **Environment Variables:**
   - Ensure variables start with `VITE_` for client-side access
   - Check Vercel environment variable settings

### 8. Advanced Configuration

#### Custom Headers (vercel.json)
```json
{
  "headers": [
    {
      "source": "/(.*)",
      "headers": [
        {
          "key": "X-Content-Type-Options",
          "value": "nosniff"
        },
        {
          "key": "X-Frame-Options",
          "value": "DENY"
        }
      ]
    }
  ]
}
```

#### Redirects (vercel.json)
```json
{
  "redirects": [
    {
      "source": "/home",
      "destination": "/",
      "permanent": true
    }
  ]
}
```

### 9. Monitoring & Analytics

#### Vercel Analytics
- Enable in Project Settings
- Track performance metrics
- Monitor user behavior

#### Error Tracking
- Consider adding Sentry for error monitoring
- Use Vercel's built-in error logs

### 10. Future Enhancements

#### Backend API
- Create API routes in `/api` folder
- Use Vercel Serverless Functions
- Connect to database

#### Authentication
- Implement JWT tokens
- Add social login (Google, Facebook)
- Password reset functionality

#### Payment Integration
- Stripe integration
- PayPal integration
- Local payment methods (GCash, PayMaya)

---

## 🎉 Success!

Your Kape X Buhat Spa application should now be live on Vercel!

**Next Steps:**
1. Share your Vercel URL
2. Set up custom domain (optional)
3. Configure database for full functionality
4. Add backend API endpoints
5. Implement payment processing

**Support:**
- Vercel Documentation: [vercel.com/docs](https://vercel.com/docs)
- Vite Documentation: [vitejs.dev](https://vitejs.dev)
- React Documentation: [react.dev](https://react.dev)
