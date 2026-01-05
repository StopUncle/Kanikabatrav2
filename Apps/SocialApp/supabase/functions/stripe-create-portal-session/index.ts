// Create Stripe Customer Portal session for self-service subscription management
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

    const { returnUrl } = await req.json();

    // Get user's Stripe customer ID
    const { data: profile } = await supabaseAdmin
      .from('profiles')
      .select('stripe_customer_id')
      .eq('id', userId)
      .single();

    if (!profile?.stripe_customer_id) {
      return errorResponse('No Stripe customer found');
    }

    // Create portal session
    const session = await stripe.billingPortal.sessions.create({
      customer: profile.stripe_customer_id,
      return_url: returnUrl || 'darkmirror://settings/subscription',
    });

    return jsonResponse({ url: session.url });
  } catch (error) {
    console.error('Error creating portal session:', error);
    return errorResponse(error.message || 'Failed to create portal session', 500);
  }
});
