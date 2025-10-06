# Production Deployment Checklist

## Pre-Deployment Steps

### 1. Environment Variables ✅
- [ ] Copy `.env.production.example` to `.env.production`
- [ ] Set production database URL (PostgreSQL)
- [ ] Generate new JWT secrets (64+ characters)
- [ ] Add PayPal live credentials
- [ ] Configure production email service (SendGrid/AWS SES)
- [ ] Set correct production URL

### 2. Security Keys 🔐
```bash
# Generate JWT Secret
openssl rand -base64 64

# Generate Refresh Token Secret
openssl rand -base64 64
```

### 3. Database Setup 🗄️
```bash
# Run Prisma migrations
npx prisma migrate deploy

# Generate Prisma client
npx prisma generate
```

### 4. Code Quality ✨
```bash
# Type checking
npm run type-check

# Linting
npm run lint

# Build test
npm run build
```

### 5. PayPal Configuration 💳
- [ ] Create PayPal Live App at https://developer.paypal.com
- [ ] Add webhook endpoint: `https://yourdomain.com/api/webhooks/paypal`
- [ ] Subscribe to events:
  - `PAYMENT.CAPTURE.COMPLETED`
  - `PAYMENT.CAPTURE.DENIED`
  - `CHECKOUT.ORDER.COMPLETED`
  - `CHECKOUT.ORDER.APPROVED`

### 6. Email Service Setup 📧
- [ ] Configure SendGrid/AWS SES account
- [ ] Verify domain for sending emails
- [ ] Set up SPF/DKIM records
- [ ] Test email delivery

## Deployment Steps

### Option 1: Vercel (Recommended)
```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel --prod

# Set environment variables in Vercel dashboard
```

### Option 2: Traditional VPS
```bash
# Build application
npm run build

# Start with PM2
pm2 start npm --name "kanikabatra" -- start
pm2 save
pm2 startup
```

## Post-Deployment

### 1. SSL Certificate
- [ ] Ensure HTTPS is working
- [ ] Force redirect HTTP to HTTPS
- [ ] Test SSL with SSL Labs

### 2. Testing
- [ ] Test payment flow with real card
- [ ] Test email notifications
- [ ] Test authentication flow
- [ ] Check mobile responsiveness
- [ ] Test download functionality

### 3. Monitoring
- [ ] Set up error tracking (Sentry)
- [ ] Configure analytics (Google Analytics)
- [ ] Set up uptime monitoring
- [ ] Configure log aggregation

### 4. Security Headers
- [ ] Content Security Policy
- [ ] X-Frame-Options
- [ ] X-Content-Type-Options
- [ ] Strict-Transport-Security

### 5. Performance
- [ ] Enable CDN for assets
- [ ] Configure caching headers
- [ ] Optimize images
- [ ] Enable compression

## Database Backup

### Automated Backup Script
```bash
#!/bin/bash
# backup.sh
DATE=$(date +%Y%m%d_%H%M%S)
pg_dump $DATABASE_URL > backup_$DATE.sql
# Upload to S3 or secure storage
```

### Restore Command
```bash
psql $DATABASE_URL < backup_file.sql
```

## Rollback Plan

1. Keep previous build artifacts
2. Database migration rollback scripts ready
3. DNS failover configured
4. Previous environment variables backed up

## Health Checks

### API Endpoint
```javascript
// app/api/health/route.ts
export async function GET() {
  return Response.json({
    status: 'ok',
    timestamp: new Date().toISOString(),
    version: process.env.npm_package_version
  })
}
```

## Support Contacts

- Hosting Support: [Your hosting provider]
- Domain Registrar: [Your domain provider]
- Email Service: [SendGrid/AWS SES support]
- Payment Processing: PayPal Business Support

## Final Checks

- [ ] All environment variables set
- [ ] Database migrations complete
- [ ] SSL certificate active
- [ ] Monitoring active
- [ ] Backup system tested
- [ ] Support team notified
- [ ] DNS propagated
- [ ] Load testing completed
- [ ] Security scan passed
- [ ] Documentation updated