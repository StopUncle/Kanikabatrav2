// Create Stripe subscription with Payment Sheet support
import { serve } from 'https://deno.land/std@0.168.0/http/server.ts';
import Stripe from 'https://esm.sh/stripe@14.21.0?target=deno';
import { stripe } from '../_shared/stripe.ts';
import { supabaseAdmin, getUserId } from '../_shared/supabase.ts';
import { handleCors, jsonResponse, errorResponse } from '../_shared/cors.ts';

serve(async (req) => {
  // Handle CORS preflight
  const corsResponse = handleCors(req);
  if (corsResponse) return corsResponse;

  try {
    // Verify user is authenticated
    const authHeader = req.headers.get('Authorization');
    const userId = await getUserId(authHeader);

    if (!userId) {
      return errorResponse('Unauthorized', 401);
    }

    const { priceId, tierId } = await req.json();

    if (!priceId) {
      return errorResponse('Price ID is required');
    }

    // Get user profile with Stripe customer ID
    const { data: profile } = await supabaseAdmin
      .from('profiles')
      .select('stripe_customer_id, email')
      .eq('id', userId)
      .single();

    let customerId = profile?.stripe_customer_id;

    // Create customer if doesn't exist
    if (!customerId) {
      const customer = await stripe.customers.create({
        email: profile?.email,
        metadata: {
          supabase_user_id: userId,
        },
      });
      customerId = customer.id;

      // Save customer ID to profile
      await supabaseAdmin
        .from('profiles')
        .update({ stripe_customer_id: customerId })
        .eq('id', userId);
    }

    // Create ephemeral key for the mobile SDK
    const ephemeralKey = await stripe.ephemeralKeys.create(
      { customer: customerId },
      { apiVersion: '2023-10-16' }
    );

    // Create the subscription with a pending setup
    const subscription = await stripe.subscriptions.create({
      customer: customerId,
      items: [{ price: priceId }],
      payment_behavior: 'default_incomplete',
      payment_settings: {
        save_default_payment_method: 'on_subscription',
      },
      expand: ['latest_invoice.payment_intent'],
      metadata: {
        supabase_user_id: userId,
        tier_id: tierId,
      },
    });

    // Get the client secret from the payment intent
    const invoice = subscription.latest_invoice as Stripe.Invoice;
    const paymentIntent = invoice?.payment_intent as Stripe.PaymentIntent | undefined;

    if (!paymentIntent?.client_secret) {
      throw new Error('Failed to create payment intent');
    }

    // Store subscription ID in profile for tracking
    await supabaseAdmin
      .from('profiles')
      .update({
        stripe_subscription_id: subscription.id,
        subscription_status: 'pending',
      })
      .eq('id', userId);

    return jsonResponse({
      subscriptionId: subscription.id,
      clientSecret: paymentIntent.client_secret,
      ephemeralKey: ephemeralKey.secret,
      customerId: customerId,
    });
  } catch (error) {
    console.error('Error creating subscription:', error);
    return errorResponse(error.message || 'Failed to create subscription', 500);
  }
});
