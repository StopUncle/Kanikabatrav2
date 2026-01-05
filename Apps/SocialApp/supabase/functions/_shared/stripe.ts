// Shared Stripe utilities for Edge Functions
import Stripe from 'https://esm.sh/stripe@14.21.0?target=deno';

// Initialize Stripe with the secret key from environment
const stripeSecretKey = Deno.env.get('STRIPE_SECRET_KEY');

if (!stripeSecretKey) {
  console.error('STRIPE_SECRET_KEY is not set in environment variables');
}

export const stripe = new Stripe(stripeSecretKey || '', {
  apiVersion: '2023-10-16',
  httpClient: Stripe.createFetchHttpClient(),
});

// Stripe webhook secret for verifying webhook signatures
export const webhookSecret = Deno.env.get('STRIPE_WEBHOOK_SECRET') || '';
