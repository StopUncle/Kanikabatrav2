// Stripe webhook handler for subscription events
import { serve } from 'https://deno.land/std@0.168.0/http/server.ts';
import Stripe from 'https://esm.sh/stripe@14.21.0?target=deno';
import { stripe, webhookSecret } from '../_shared/stripe.ts';
import { supabaseAdmin } from '../_shared/supabase.ts';
import { corsHeaders } from '../_shared/cors.ts';
import { sendEmail, emailTemplates } from '../_shared/email.ts';

// Map Stripe subscription status to our status
function mapSubscriptionStatus(stripeStatus: string): string {
  switch (stripeStatus) {
    case 'active':
    case 'trialing':
      return 'active';
    case 'canceled':
      return 'cancelled';
    case 'past_due':
    case 'unpaid':
      return 'past_due';
    case 'incomplete':
    case 'incomplete_expired':
      return 'pending';
    default:
      return 'inactive';
  }
}

// Map price ID to tier
async function getTierFromPriceId(priceId: string): Promise<string> {
  // Get price to find product metadata
  const price = await stripe.prices.retrieve(priceId, {
    expand: ['product'],
  });

  const product = price.product as Stripe.Product;
  return product?.metadata?.tier || 'premium';
}

serve(async (req) => {
  // Only allow POST for webhooks
  if (req.method !== 'POST') {
    return new Response('Method not allowed', { status: 405 });
  }

  const signature = req.headers.get('stripe-signature');
  const body = await req.text();

  let event;

  try {
    // Verify webhook signature
    if (webhookSecret && signature) {
      event = stripe.webhooks.constructEvent(body, signature, webhookSecret);
    } else {
      // For testing without signature verification
      event = JSON.parse(body);
      console.warn('Webhook signature not verified - only use in development');
    }
  } catch (err) {
    console.error('Webhook signature verification failed:', err.message);
    return new Response(`Webhook Error: ${err.message}`, { status: 400 });
  }

  console.log('Processing webhook event:', event.type);

  try {
    switch (event.type) {
      // Subscription created or updated
      case 'customer.subscription.created':
      case 'customer.subscription.updated': {
        const subscription = event.data.object;
        const customerId = subscription.customer;
        const status = mapSubscriptionStatus(subscription.status);
        const priceId = subscription.items.data[0]?.price?.id;
        const tier = priceId ? await getTierFromPriceId(priceId) : 'premium';

        // Find user by Stripe customer ID
        const { data: profile } = await supabaseAdmin
          .from('profiles')
          .select('id')
          .eq('stripe_customer_id', customerId)
          .single();

        if (profile) {
          await supabaseAdmin
            .from('profiles')
            .update({
              subscription_tier: status === 'active' ? tier : 'free',
              subscription_status: status,
              stripe_subscription_id: subscription.id,
              subscription_end_date: subscription.cancel_at
                ? new Date(subscription.cancel_at * 1000).toISOString()
                : null,
              updated_at: new Date().toISOString(),
            })
            .eq('id', profile.id);

          console.log(`Updated subscription for user ${profile.id}: ${tier} (${status})`);
        }
        break;
      }

      // Subscription deleted/cancelled
      case 'customer.subscription.deleted': {
        const subscription = event.data.object;
        const customerId = subscription.customer;

        const { data: profile } = await supabaseAdmin
          .from('profiles')
          .select('id')
          .eq('stripe_customer_id', customerId)
          .single();

        if (profile) {
          await supabaseAdmin
            .from('profiles')
            .update({
              subscription_tier: 'free',
              subscription_status: 'expired',
              updated_at: new Date().toISOString(),
            })
            .eq('id', profile.id);

          console.log(`Subscription expired for user ${profile.id}`);
        }
        break;
      }

      // Payment succeeded (for one-time purchases)
      case 'payment_intent.succeeded': {
        const paymentIntent = event.data.object;
        const metadata = paymentIntent.metadata;

        if (metadata?.product_type === 'quiz' && metadata?.product_id && metadata?.supabase_user_id) {
          // Record quiz purchase
          await supabaseAdmin
            .from('quiz_purchases')
            .upsert({
              user_id: metadata.supabase_user_id,
              quiz_id: metadata.product_id,
              stripe_payment_intent_id: paymentIntent.id,
              amount_cents: paymentIntent.amount,
              purchased_at: new Date().toISOString(),
            });

          console.log(`Quiz ${metadata.product_id} purchased by user ${metadata.supabase_user_id}`);
        }
        break;
      }

      // Payment failed
      case 'invoice.payment_failed': {
        const invoice = event.data.object;
        const customerId = invoice.customer;

        const { data: profile } = await supabaseAdmin
          .from('profiles')
          .select('id, email')
          .eq('stripe_customer_id', customerId)
          .single();

        if (profile) {
          // Update status to past_due
          await supabaseAdmin
            .from('profiles')
            .update({
              subscription_status: 'past_due',
              updated_at: new Date().toISOString(),
            })
            .eq('id', profile.id);

          console.log(`Payment failed for user ${profile.id}`);

          // Send email notification about failed payment
          if (profile.email) {
            const emailPayload = emailTemplates.paymentFailed(profile.email);
            await sendEmail(emailPayload);
          }
        }
        break;
      }

      default:
        console.log(`Unhandled event type: ${event.type}`);
    }

    return new Response(JSON.stringify({ received: true }), {
      status: 200,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error('Error processing webhook:', error);
    return new Response(`Webhook handler error: ${error.message}`, { status: 500 });
  }
});
