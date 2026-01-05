// Create or retrieve Stripe customer for a user
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

    const { email } = await req.json();

    if (!email) {
      return errorResponse('Email is required');
    }

    // Check if user already has a Stripe customer ID
    const { data: profile } = await supabaseAdmin
      .from('profiles')
      .select('stripe_customer_id')
      .eq('id', userId)
      .single();

    if (profile?.stripe_customer_id) {
      // Return existing customer ID
      return jsonResponse({ customerId: profile.stripe_customer_id });
    }

    // Check if a Stripe customer already exists with this email
    const existingCustomers = await stripe.customers.list({
      email: email,
      limit: 1,
    });

    let customerId: string;

    if (existingCustomers.data.length > 0) {
      // Use existing customer
      customerId = existingCustomers.data[0].id;
    } else {
      // Create new Stripe customer
      const customer = await stripe.customers.create({
        email: email,
        metadata: {
          supabase_user_id: userId,
        },
      });
      customerId = customer.id;
    }

    // Save customer ID to user profile
    await supabaseAdmin
      .from('profiles')
      .update({ stripe_customer_id: customerId })
      .eq('id', userId);

    return jsonResponse({ customerId });
  } catch (error) {
    console.error('Error creating Stripe customer:', error);
    return errorResponse(error.message || 'Failed to create customer', 500);
  }
});
