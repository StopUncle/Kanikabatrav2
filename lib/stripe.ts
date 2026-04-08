import Stripe from "stripe";

export const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: "2025-04-30.basil",
});

// Product prices — create these in Stripe Dashboard with clean names
// After creating, fill in the price IDs (starts with price_)
export const STRIPE_PRICES: Record<string, string> = {
  BOOK: "", // Dating Psychology Masterclass — $24.99
  QUIZ: "", // Personality Type Assessment — $9.99
  INNER_CIRCLE: "", // Premium Membership — $29/mo recurring
  COACHING_SINGLE: "", // Psychology Consultation Single — $297
  COACHING_INTENSIVE: "", // Psychology Consultation Intensive — $1,497
  COACHING_CAREER: "", // Career Strategy Consultation — $2,997
  COACHING_RETAINER: "", // Consultation Retainer — $4,997
  ASK_WRITTEN_1Q: "", // Written Q&A 1 Question — $39.99
  ASK_WRITTEN_3Q: "", // Written Q&A 3 Questions — $99
  ASK_VOICE_1Q: "", // Voice Q&A 1 Question — $59.99
  ASK_VOICE_3Q: "", // Voice Q&A 3 Questions — $129
};

export const STRIPE_PUBLISHABLE_KEY = process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!;

/**
 * Create a Stripe Checkout Session
 */
export async function createCheckoutSession(options: {
  priceId: string;
  mode: "payment" | "subscription";
  successUrl: string;
  cancelUrl: string;
  customerEmail?: string;
  metadata?: Record<string, string>;
}) {
  const session = await stripe.checkout.sessions.create({
    payment_method_types: ["card"],
    line_items: [{ price: options.priceId, quantity: 1 }],
    mode: options.mode,
    success_url: options.successUrl,
    cancel_url: options.cancelUrl,
    customer_email: options.customerEmail,
    metadata: options.metadata,
    allow_promotion_codes: true,
  });

  return session;
}

/**
 * Cancel a Stripe subscription
 */
export async function cancelStripeSubscription(subscriptionId: string) {
  return await stripe.subscriptions.cancel(subscriptionId);
}

/**
 * Get a Stripe subscription
 */
export async function getStripeSubscription(subscriptionId: string) {
  return await stripe.subscriptions.retrieve(subscriptionId);
}
