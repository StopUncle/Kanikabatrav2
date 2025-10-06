# Production Deployment Guide - kanikarose.com

## Pre-Deployment Checklist

### 1. Environment Configuration
- [ ] Copy `.env.production` and fill in all production values
- [ ] Generate secure JWT secrets: `openssl rand -base64 64`
- [ ] Get PayPal live credentials from https://developer.paypal.com
- [ ] Set up production database (PostgreSQL recommended)
- [ ] Configure email service (SendGrid or SMTP)
- [ ] Set up AWS S3 for book downloads (optional but recommended)

### 2. Domain Setup
- [ ] Purchase domain: kanikarose.com (already owned)
- [ ] Point DNS to Vercel:
  - A record: `@` → Vercel IP (automatic in Vercel)
  - CNAME: `www` → `cname.vercel-dns.com`
- [ ] Configure email DNS records for Kanika@kanikarose.com:
  - MX records for email provider
  - SPF record: `v=spf1 include:_spf.google.com ~all` (for Gmail)
  - DKIM record from email provider

### 3. Vercel Deployment

#### Initial Setup
```bash
# Install Vercel CLI
npm i -g vercel

# Login to Vercel
vercel login

# Deploy to production
vercel --prod
```

#### Environment Variables in Vercel Dashboard
Go to Project Settings → Environment Variables and add:

**General**
- `NEXT_PUBLIC_BASE_URL` = `https://kanikarose.com`
- `NODE_ENV` = `production`

**PayPal**
- `NEXT_PUBLIC_PAYPAL_CLIENT_ID` = Your live client ID
- `PAYPAL_CLIENT_ID` = Your live client ID
- `PAYPAL_CLIENT_SECRET` = Your live client secret (encrypted)
- `PAYPAL_ENVIRONMENT` = `live`
- `PAYPAL_WEBHOOK_ID` = Your webhook ID

**Database**
- `DATABASE_URL` = Your PostgreSQL connection string (encrypted)

**Authentication**
- `JWT_SECRET` = Your production JWT secret (encrypted)
- `JWT_REFRESH_SECRET` = Your production refresh secret (encrypted)
- `ADMIN_SECRET` = Your admin secret for presale API (encrypted)

**Email**
- `EMAIL_FROM` = `"Kanika Batra <Kanika@kanikarose.com>"`
- `ADMIN_EMAIL` = `Kanika@kanikarose.com`
- `SENDGRID_API_KEY` = Your SendGrid API key (encrypted)

### 4. Database Migration
```bash
# Run Prisma migrations
npx prisma migrate deploy

# Generate Prisma client
npx prisma generate
```

### 5. PayPal Configuration

#### Live App Setup
1. Go to https://developer.paypal.com/dashboard/applications/live
2. Create new app or use existing
3. Copy Client ID and Secret to Vercel environment variables
4. Configure return URLs:
   - Success: `https://kanikarose.com/success`
   - Cancel: `https://kanikarose.com/cancel`

#### Webhook Setup
1. In PayPal dashboard, go to Webhooks
2. Create webhook: `https://kanikarose.com/api/webhooks/paypal`
3. Select events:
   - `PAYMENT.CAPTURE.COMPLETED`
   - `PAYMENT.CAPTURE.DENIED`
   - `PAYMENT.CAPTURE.REFUNDED`
4. Copy Webhook ID to environment variables

### 6. Testing Checklist

#### Pre-Launch Testing
- [ ] Test book purchase flow (use real PayPal account)
- [ ] Test coaching purchase flow (all 3 tiers)
- [ ] Verify success page redirects correctly
- [ ] Check email delivery (book download, coaching confirmation)
- [ ] Test presale modal and email collection
- [ ] Verify contact form sends emails
- [ ] Test on mobile devices
- [ ] Test on different browsers (Chrome, Safari, Firefox)
- [ ] Check all social media links
- [ ] Verify countdown timer accuracy
- [ ] Test PayPal sandbox first, then switch to live

#### Performance Testing
- [ ] Run Lighthouse audit (aim for 90+ performance)
- [ ] Test page load times
- [ ] Verify images are optimized
- [ ] Check for console errors
- [ ] Test under slow network conditions

### 7. Security Checklist
- [ ] Enable HTTPS (automatic with Vercel)
- [ ] Verify CSP headers in production
- [ ] Test rate limiting on contact form
- [ ] Secure all API endpoints
- [ ] Verify JWT token expiration
- [ ] Test CORS configuration
- [ ] Enable Vercel DDoS protection
- [ ] Set up Vercel password protection during testing

### 8. Monitoring Setup

#### Error Tracking (Sentry)
```bash
npm install @sentry/nextjs
npx @sentry/wizard@latest -i nextjs
```

#### Analytics
- [ ] Set up Google Analytics (GA4)
- [ ] Configure Facebook Pixel
- [ ] Enable Vercel Analytics
- [ ] Set up conversion tracking for purchases

### 9. Launch Sequence

#### Day Before Launch
1. Final test of all payment flows in production
2. Verify email delivery is working
3. Check database backups are configured
4. Review all environment variables
5. Test presale modal functionality

#### Launch Day
1. Remove Vercel password protection
2. Update DNS to point to production
3. Monitor error logs closely
4. Test live payment with small amount
5. Verify success/cancel redirects
6. Monitor server performance

#### Post-Launch (First 24 Hours)
- [ ] Monitor error rates in Sentry
- [ ] Check payment success rate
- [ ] Verify email delivery rate
- [ ] Monitor server response times
- [ ] Check for broken links
- [ ] Review user feedback

### 10. Backup Strategy

#### Database Backups
- [ ] Enable automatic PostgreSQL backups
- [ ] Set up daily snapshots
- [ ] Test restore procedure
- [ ] Store backups in separate region

#### File Backups
- [ ] Back up S3 bucket (if using)
- [ ] Version control for code (already on Git)
- [ ] Export presale email list regularly

### 11. Post-Deployment Configuration

#### Email Warmup
1. Start with low volume test emails
2. Gradually increase sending volume
3. Monitor spam complaints
4. Verify SPF/DKIM are working

#### PayPal Live Verification
1. Make test purchase with real PayPal account
2. Verify funds appear in business account
3. Test refund process
4. Verify webhook events are received

### 12. Troubleshooting

#### Common Issues

**PayPal Authentication Failed**
- Verify `PAYPAL_ENVIRONMENT=live` matches credentials
- Check Client ID and Secret are correct
- Ensure no extra whitespace in environment variables

**Emails Not Sending**
- Verify SendGrid API key is active
- Check email FROM address is verified
- Review SendGrid sending limits
- Check spam folder for test emails

**Database Connection Failed**
- Verify DATABASE_URL format is correct
- Ensure SSL is enabled: `?sslmode=require`
- Check database firewall allows Vercel IPs
- Run `npx prisma migrate deploy`

**Redirect URLs Not Working**
- Verify `NEXT_PUBLIC_BASE_URL` has no trailing slash
- Check PayPal return URLs match exactly
- Clear browser cache and test

### 13. Performance Optimization

#### Before Launch
```bash
# Build and analyze bundle size
npm run build

# Run type checking
npm run type-check

# Run linting
npm run lint
```

#### Vercel Settings
- [ ] Enable Edge Network
- [ ] Configure caching headers
- [ ] Enable automatic static optimization
- [ ] Set up incremental static regeneration (ISR)

### 14. Book Launch Preparation

#### Presale Setup
- [ ] Verify presale modal works
- [ ] Test email collection API
- [ ] Export presale list regularly
- [ ] Create email templates for launch

#### Launch Day (October 7, 2025)
- [ ] Disable presale modal
- [ ] Enable direct purchase buttons
- [ ] Update countdown to show "Available Now"
- [ ] Send launch emails to presale list

### 15. Support & Maintenance

#### Daily
- [ ] Check error logs
- [ ] Monitor payment success rate
- [ ] Review customer emails

#### Weekly
- [ ] Database performance check
- [ ] Backup verification
- [ ] Security updates

#### Monthly
- [ ] Review analytics
- [ ] Optimize slow pages
- [ ] Update dependencies
- [ ] Rotate JWT secrets (if compromised)

## Emergency Contacts

- **Vercel Support**: https://vercel.com/support
- **PayPal Support**: https://developer.paypal.com/support
- **DNS Provider**: (your registrar)
- **Email Provider**: SendGrid or your SMTP provider

## Rollback Plan

If critical issues occur:

1. **Immediate Rollback**
   ```bash
   # Revert to previous deployment
   vercel rollback
   ```

2. **Enable Maintenance Mode**
   - Add password protection in Vercel
   - Display maintenance message

3. **Fix Issues Locally**
   - Test fixes in development
   - Deploy to preview environment first
   - Test thoroughly before production deploy

## Success Metrics

Track these after launch:
- Payment success rate (target: >95%)
- Email delivery rate (target: >98%)
- Page load time (target: <2s)
- Error rate (target: <0.1%)
- Presale conversion rate
- Customer support tickets

## Final Notes

- Keep all credentials secure and encrypted
- Never commit .env files to Git
- Test payment flows regularly
- Monitor costs (Vercel, database, email, S3)
- Have a backup plan for all critical services
- Document any custom configurations

**You're ready to dominate. Launch with precision.**
