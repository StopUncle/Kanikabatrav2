# Stripe Integration Setup Guide

## 1. Stripe Dashboard Setup

### Create Products & Prices

Go to [Stripe Dashboard → Products](https://dashboard.stripe.com/products) and create:

1. **Premium Monthly** - $19.99/month
   - Add metadata: `tier: premium`
   - Copy the price ID (e.g., `price_1ABC...`)

2. **Premium Annual** - $149.99/year
   - Add metadata: `tier: premium`
   - Copy the price ID

3. **VIP Monthly** - $49.99/month
   - Add metadata: `tier: vip`
   - Copy the price ID

4. **VIP Annual** - $399.99/year
   - Add metadata: `tier: vip`
   - Copy the price ID

5. **Quiz Purchase** - $9.99 one-time
   - Add metadata: `tier: quiz`
   - Copy the price ID

### Get API Keys

Go to [Stripe Dashboard → API Keys](https://dashboard.stripe.com/apikeys):

- **Publishable key** (`pk_test_...`) - Goes in your mobile app `.env`
- **Secret key** (`sk_test_...`) - Goes in Supabase secrets

### Set Up Customer Portal

Go to [Stripe Dashboard → Customer Portal](https://dashboard.stripe.com/settings/billing/portal):

1. Enable the customer portal
2. Configure which actions customers can take (update payment, cancel, etc.)
3. Set your return URL to `darkmirror://settings/subscription`

### Create Webhook Endpoint

Go to [Stripe Dashboard → Webhooks](https://dashboard.stripe.com/webhooks):

1. Add endpoint: `https://YOUR_PROJECT.supabase.co/functions/v1/stripe-webhook`
2. Select events:
   - `customer.subscription.created`
   - `customer.subscription.updated`
   - `customer.subscription.deleted`
   - `payment_intent.succeeded`
   - `invoice.payment_failed`
3. Copy the **Webhook signing secret** (`whsec_...`)

## 2. Supabase Setup

### Run Database Migration

In Supabase SQL Editor, run the contents of `stripe-migration.sql`.

### Set Environment Secrets

In Supabase Dashboard → Project Settings → Edge Functions → Secrets, add:

```
STRIPE_SECRET_KEY=sk_test_YOUR_SECRET_KEY
STRIPE_WEBHOOK_SECRET=whsec_YOUR_WEBHOOK_SECRET
```

### Deploy Edge Functions

From the `SocialApp` directory:

```bash
# Login to Supabase CLI
supabase login

# Link to your project
supabase link --project-ref YOUR_PROJECT_REF

# Deploy all functions
supabase functions deploy stripe-create-customer
supabase functions deploy stripe-create-subscription
supabase functions deploy stripe-create-payment-intent
supabase functions deploy stripe-cancel-subscription
supabase functions deploy stripe-create-portal-session
supabase functions deploy stripe-webhook
```

Or deploy all at once:
```bash
supabase functions deploy
```

## 3. Mobile App Setup

### Environment Variables

Add to your `.env` file:

```bash
# Stripe publishable key (safe for client)
EXPO_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_YOUR_PUBLISHABLE_KEY

# Price IDs from Stripe Dashboard
EXPO_PUBLIC_STRIPE_PRICE_PREMIUM_MONTHLY=price_xxx
EXPO_PUBLIC_STRIPE_PRICE_PREMIUM_ANNUAL=price_xxx
EXPO_PUBLIC_STRIPE_PRICE_VIP_MONTHLY=price_xxx
EXPO_PUBLIC_STRIPE_PRICE_VIP_ANNUAL=price_xxx
EXPO_PUBLIC_STRIPE_PRICE_QUIZ=price_xxx
```

### Build Configuration

For EAS builds, the Stripe plugin is already configured in `app.json`. For development builds:

```bash
npx expo prebuild
```

## 4. Testing

### Test Cards

Use these test card numbers:

- **Success**: `4242 4242 4242 4242`
- **Requires Auth**: `4000 0025 0000 3155`
- **Declined**: `4000 0000 0000 0002`

Expiry: Any future date
CVC: Any 3 digits
ZIP: Any 5 digits

### Test Webhooks Locally

```bash
# Install Stripe CLI
stripe login

# Forward webhooks to local function
stripe listen --forward-to localhost:54321/functions/v1/stripe-webhook
```

## 5. Go Live Checklist

1. [ ] Switch to live Stripe API keys
2. [ ] Update webhook endpoint to production URL
3. [ ] Create live products/prices in Stripe Dashboard
4. [ ] Update price IDs in `.env`
5. [ ] Test a real $1 transaction
6. [ ] Set up failed payment email notifications
7. [ ] Configure Customer Portal branding
