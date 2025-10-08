# Railway Deployment Guide

This guide will help you deploy the Kanika Batra website to Railway.

## Prerequisites

1. A Railway account (https://railway.app/)
2. A GitHub account with this repository
3. PayPal production credentials
4. Email service credentials (SendGrid recommended)

## Deployment Steps

### 1. Create a New Project on Railway

1. Go to https://railway.app/ and sign in
2. Click "New Project"
3. Select "Deploy from GitHub repo"
4. Choose this repository

### 2. Configure Environment Variables

Railway will automatically detect that this is a Next.js application. You'll need to set the following environment variables in the Railway dashboard:

1. Go to your project in the Railway dashboard
2. Click on "Variables"
3. Add the following variables:

```
# General Configuration
NODE_ENV=production
NEXT_PUBLIC_BASE_URL=https://your-app-name.up.railway.app
PORT=3000

# PayPal Configuration (get from PayPal Developer Dashboard)
NEXT_PUBLIC_PAYPAL_CLIENT_ID=your_live_client_id
PAYPAL_CLIENT_ID=your_live_client_id
PAYPAL_CLIENT_SECRET=your_live_secret
PAYPAL_ENVIRONMENT=live

# Authentication Secrets (generate strong random strings)
JWT_SECRET=your_strong_jwt_secret_at_least_64_characters
JWT_REFRESH_SECRET=your_strong_refresh_token_secret

# Email Configuration (example with SendGrid)
SMTP_HOST=smtp.sendgrid.net
SMTP_PORT=587
SMTP_USER=apikey
SMTP_PASS=your_sendgrid_api_key
FROM_EMAIL="Kanika Batra <Kanika@kanikarose.com>"
ADMIN_EMAIL=Kanika@kanikarose.com
```

### 3. Add PostgreSQL Database

1. In your Railway project, click "+ New"
2. Select "Database"
3. Choose "PostgreSQL"
4. Railway will automatically set the `DATABASE_URL` environment variable

### 4. Configure Build and Deploy Settings

Railway will automatically detect the Next.js project and use the correct build settings. The configuration in `railway.json` will be used:

```json
{
  "$schema": "https://railway.app/railway.schema.json",
  "build": {
    "builder": "NIXPACKS"
  },
  "deploy": {
    "startCommand": "next start",
    "restartPolicyType": "ON_FAILURE",
    "restartPolicyMaxRetries": 10
  }
}
```

### 5. Add Domain (Optional)

1. Go to your project in the Railway dashboard
2. Click on "Settings"
3. Under "Domains", click "+ Add Domain"
4. Enter your custom domain (e.g., kanikarose.com)
5. Follow Railway's instructions to configure DNS

### 6. Enable Automatic Deployments (Optional)

1. Go to your project in the Railway dashboard
2. Click on "Settings"
3. Under "Deploy", enable "Automatic Deploys"

## Troubleshooting

### Build Issues

If you encounter build issues:

1. Check that all environment variables are properly set
2. Ensure your PayPal credentials are correct
3. Verify that your secrets are strong enough (at least 64 characters for JWT)

### Runtime Issues

If the application fails to start:

1. Check the logs in the Railway dashboard
2. Ensure the PORT variable is set to 3000
3. Verify database connection with the DATABASE_URL variable

### Common Fixes

1. **Dynamic Server Usage Errors**: Fixed by adding `export const dynamic = 'force-dynamic'` to API routes
2. **useContext Errors**: Fixed by ensuring client components are properly marked with `'use client'`
3. **Document Import Errors**: Fixed by creating a proper `_document.tsx` file

## Custom Domain Setup

To set up a custom domain:

1. In Railway, go to your project settings
2. Under "Domains", add your domain
3. Configure DNS records as instructed by Railway:
   - Add an A record pointing to Railway's IP
   - Add a CNAME record for www subdomain

## Monitoring

Railway provides built-in monitoring:

1. Check the "Deployments" tab for build logs
2. Check the "Logs" tab for runtime logs
3. Set up alerts in the "Settings" tab

## Updating the Application

To update the application:

1. Push changes to your GitHub repository
2. If automatic deployments are enabled, Railway will automatically deploy
3. If not, click "Deploy" in the Railway dashboard