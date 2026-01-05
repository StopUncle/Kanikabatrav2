// Cancel Stripe subscription
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

    const { subscriptionId } = await req.json();

    // Get subscription ID from profile if not provided
    let subId = subscriptionId;
    if (!subId) {
      const { data: profile } = await supabaseAdmin
        .from('profiles')
        .select('stripe_subscription_id')
        .eq('id', userId)
        .single();

      subId = profile?.stripe_subscription_id;
    }

    if (!subId) {
      return errorResponse('No active subscription found');
    }

    // Cancel at period end (user keeps access until subscription ends)
    const subscription = await stripe.subscriptions.update(subId, {
      cancel_at_period_end: true,
    });

    // Update profile status
    await supabaseAdmin
      .from('profiles')
      .update({
        subscription_status: 'cancelled',
        subscription_end_date: new Date(subscription.current_period_end * 1000).toISOString(),
      })
      .eq('id', userId);

    return jsonResponse({
      success: true,
      cancelAt: new Date(subscription.current_period_end * 1000).toISOString(),
    });
  } catch (error) {
    console.error('Error cancelling subscription:', error);
    return errorResponse(error.message || 'Failed to cancel subscription', 500);
  }
});
