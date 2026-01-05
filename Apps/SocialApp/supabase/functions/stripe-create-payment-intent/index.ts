// Create Stripe payment intent for one-time purchases (quiz, course, etc.)
import { serve } from 'https://deno.land/std@0.168.0/http/server.ts';
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

    const { amount, productType, productId } = await req.json();

    if (!amount || amount <= 0) {
      return errorResponse('Valid amount is required');
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

    // Create the payment intent
    const paymentIntent = await stripe.paymentIntents.create({
      amount: amount, // Amount in cents
      currency: 'usd',
      customer: customerId,
      automatic_payment_methods: {
        enabled: true,
      },
      metadata: {
        supabase_user_id: userId,
        product_type: productType,
        product_id: productId,
      },
    });

    return jsonResponse({
      paymentIntentId: paymentIntent.id,
      clientSecret: paymentIntent.client_secret,
      ephemeralKey: ephemeralKey.secret,
      customerId: customerId,
    });
  } catch (error) {
    console.error('Error creating payment intent:', error);
    return errorResponse(error.message || 'Failed to create payment intent', 500);
  }
});
