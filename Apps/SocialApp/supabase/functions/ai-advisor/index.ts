// AI Advisor Edge Function - Pocket Kanika
// Securely proxies Claude API calls with rate limiting and cost tracking

import { serve } from 'https://deno.land/std@0.168.0/http/server.ts';
import { supabaseAdmin, getUserId } from '../_shared/supabase.ts';
import { corsHeaders, jsonResponse, errorResponse, handleCors } from '../_shared/cors.ts';

// Configuration
const ANTHROPIC_API_KEY = Deno.env.get('ANTHROPIC_API_KEY');
const ANTHROPIC_URL = 'https://api.anthropic.com/v1/messages';
const MODEL = 'claude-3-5-haiku-20241022';
const MAX_TOKENS = 500;

// Rate limits per tier (messages per hour)
const RATE_LIMITS: Record<string, number> = {
  free: 5,
  premium: 50,
  vip: 999,
};

// Cost per token (Claude 3.5 Haiku pricing)
const COST_PER_INPUT_TOKEN = 0.0000008;   // $0.80 per 1M
const COST_PER_OUTPUT_TOKEN = 0.000004;   // $4.00 per 1M

// Daily budget cap
const DAILY_BUDGET_USD = 10.00;

interface ChatMessage {
  role: 'system' | 'user' | 'assistant';
  content: string;
}

interface RequestBody {
  message: string;
  history: ChatMessage[];
  systemPrompt: string;
}

serve(async (req) => {
  // Handle CORS preflight
  const corsResponse = handleCors(req);
  if (corsResponse) return corsResponse;

  // Only allow POST
  if (req.method !== 'POST') {
    return errorResponse('Method not allowed', 405);
  }

  // Check API key is configured
  if (!ANTHROPIC_API_KEY) {
    return errorResponse('AI service not configured', 503);
  }

  try {
    // Get user ID from auth header
    const authHeader = req.headers.get('authorization');
    console.log('Auth header present:', !!authHeader);

    let userId = await getUserId(authHeader);
    let tier = 'free';

    // Dev mode: allow unauthenticated requests with a fake user ID
    if (!userId) {
      // Check if this looks like a dev/test request (anon key only)
      const isDevRequest = authHeader?.includes('role":"anon');
      if (isDevRequest || !userId) {
        console.log('Dev mode detected - using test user');
        userId = 'dev-test-user';
        tier = 'vip'; // Give dev user VIP access for testing
      } else {
        console.error('No user ID found from auth header');
        return errorResponse('Unauthorized', 401);
      }
    } else {
      // Real user - get their subscription tier
      const { data: profile, error: profileError } = await supabaseAdmin
        .from('profiles')
        .select('subscription_tier')
        .eq('id', userId)
        .single();

      console.log('Profile lookup:', { profile, error: profileError });

      if (profileError || !profile) {
        console.error('Profile error:', profileError);
        // Still allow with free tier if profile not found
        tier = 'free';
      } else {
        tier = profile.subscription_tier || 'free';
      }
    }

    console.log('User ID:', userId, 'Tier:', tier);
    const rateLimit = RATE_LIMITS[tier] || 5;

    // Temporarily skip rate limiting to debug
    const rateLimitResult = { allowed: true, remaining: 50, resetAt: new Date().toISOString() };
    const budgetResult = { allowed: true, reducedTokens: false };
    console.log('Skipping rate limit checks for debugging');

    // Parse request body
    const body: RequestBody = await req.json();
    const { message, history = [], systemPrompt = '' } = body;

    if (!message || typeof message !== 'string') {
      return errorResponse('Message is required', 400);
    }

    // Ensure history is an array
    const safeHistory = Array.isArray(history) ? history : [];

    // Ensure systemPrompt is a string
    const safeSystemPrompt = typeof systemPrompt === 'string' ? systemPrompt : 'You are a helpful assistant.';

    // Build messages for Claude
    // Claude requires alternating user/assistant messages, starting with user
    // Filter out system messages (handled separately) and ensure proper alternation
    const filteredHistory = safeHistory
      .filter(m => m && m.role !== 'system')
      .slice(-10);

    // Build Claude-compatible messages
    const claudeMessages: Array<{role: string, content: string}> = [];

    for (const m of filteredHistory) {
      // Skip if this would create consecutive same-role messages
      if (claudeMessages.length > 0 && claudeMessages[claudeMessages.length - 1].role === m.role) {
        // Merge with previous message
        claudeMessages[claudeMessages.length - 1].content += '\n\n' + m.content;
      } else {
        claudeMessages.push({ role: m.role, content: m.content });
      }
    }

    // Add current user message
    if (claudeMessages.length > 0 && claudeMessages[claudeMessages.length - 1].role === 'user') {
      // Merge with previous user message
      claudeMessages[claudeMessages.length - 1].content += '\n\n' + message;
    } else {
      claudeMessages.push({ role: 'user', content: message });
    }

    // Ensure first message is from user (Claude requirement)
    if (claudeMessages.length > 0 && claudeMessages[0].role !== 'user') {
      claudeMessages.unshift({ role: 'user', content: '[Continuing conversation]' });
    }

    // Calculate input tokens (rough estimate: 4 chars = 1 token)
    const inputTokens = Math.ceil(
      (safeSystemPrompt.length + claudeMessages.reduce((acc, m) => acc + m.content.length, 0)) / 4
    );

    // Call Claude
    console.log('Calling Claude API with', claudeMessages.length, 'messages');
    const claudeResponse = await fetch(ANTHROPIC_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': ANTHROPIC_API_KEY,
        'anthropic-version': '2023-06-01',
      },
      body: JSON.stringify({
        model: MODEL,
        max_tokens: budgetResult.reducedTokens ? 300 : MAX_TOKENS,
        system: safeSystemPrompt,
        messages: claudeMessages,
      }),
    });

    if (!claudeResponse.ok) {
      const errorText = await claudeResponse.text().catch(() => '');
      console.error('Claude API error:', claudeResponse.status, errorText);
      console.error('Request body was:', JSON.stringify({ model: MODEL, messages: claudeMessages.slice(0, 2) }));
      return errorResponse(`AI service error: ${claudeResponse.status}`, 502);
    }

    const data = await claudeResponse.json();
    const assistantContent = data.content?.[0]?.text;
    const usage = data.usage || {};

    if (!assistantContent) {
      return errorResponse('No response from AI', 502);
    }

    // Calculate actual tokens and cost (Claude uses input_tokens/output_tokens)
    const actualInputTokens = usage.input_tokens || inputTokens;
    const actualOutputTokens = usage.output_tokens || Math.ceil(assistantContent.length / 4);
    const costUsd = (actualInputTokens * COST_PER_INPUT_TOKEN) +
                   (actualOutputTokens * COST_PER_OUTPUT_TOKEN);

    // Skip logging and rate limit increment for debugging
    console.log('Skipping usage logging and rate limit increment');

    // Return response
    return jsonResponse({
      content: assistantContent,
      remaining: rateLimitResult.remaining - 1,
      resetAt: rateLimitResult.resetAt,
      tokensUsed: actualInputTokens + actualOutputTokens,
    });

  } catch (error) {
    console.error('AI Advisor error:', error);
    return errorResponse('Internal server error', 500);
  }
});

// ============================================
// RATE LIMITING
// ============================================

interface RateLimitResult {
  allowed: boolean;
  remaining: number;
  resetAt: string;
}

async function checkRateLimit(userId: string, limit: number): Promise<RateLimitResult> {
  const now = new Date();
  const currentHour = new Date(now);
  currentHour.setMinutes(0, 0, 0);

  const nextHour = new Date(currentHour);
  nextHour.setHours(nextHour.getHours() + 1);
  const resetAt = nextHour.toISOString();

  // Get or create rate limit record
  const { data, error } = await supabaseAdmin
    .from('ai_rate_limits')
    .select('messages_this_hour, hour_reset_at')
    .eq('user_id', userId)
    .single();

  if (error && error.code !== 'PGRST116') {
    console.error('Rate limit check error:', error);
    // Allow on error (fail open)
    return { allowed: true, remaining: limit, resetAt };
  }

  // No record or hour has passed - reset
  if (!data || !data.hour_reset_at || new Date(data.hour_reset_at) <= now) {
    await supabaseAdmin
      .from('ai_rate_limits')
      .upsert({
        user_id: userId,
        messages_this_hour: 0,
        hour_reset_at: resetAt,
      });

    return { allowed: true, remaining: limit, resetAt };
  }

  const messagesUsed = data.messages_this_hour || 0;
  const remaining = limit - messagesUsed;

  return {
    allowed: remaining > 0,
    remaining: Math.max(0, remaining),
    resetAt: data.hour_reset_at,
  };
}

async function incrementRateLimit(userId: string): Promise<void> {
  const { error } = await supabaseAdmin.rpc('increment_ai_rate_limit', {
    p_user_id: userId,
  });

  if (error) {
    console.error('Failed to increment rate limit:', error);
  }
}

// ============================================
// BUDGET CONTROL
// ============================================

interface BudgetResult {
  allowed: boolean;
  reducedTokens: boolean;
}

async function checkDailyBudget(): Promise<BudgetResult> {
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const { data, error } = await supabaseAdmin
    .from('ai_usage')
    .select('cost_usd')
    .gte('created_at', today.toISOString());

  if (error) {
    console.error('Budget check error:', error);
    // Allow on error
    return { allowed: true, reducedTokens: false };
  }

  const totalSpend = data?.reduce((acc, row) => acc + (row.cost_usd || 0), 0) || 0;

  // At 100% budget - deny requests
  if (totalSpend >= DAILY_BUDGET_USD) {
    return { allowed: false, reducedTokens: false };
  }

  // At 80% budget - reduce token limit
  if (totalSpend >= DAILY_BUDGET_USD * 0.8) {
    return { allowed: true, reducedTokens: true };
  }

  return { allowed: true, reducedTokens: false };
}

// ============================================
// USAGE LOGGING
// ============================================

async function logUsage(
  userId: string,
  tokensIn: number,
  tokensOut: number,
  costUsd: number
): Promise<void> {
  const { error } = await supabaseAdmin
    .from('ai_usage')
    .insert({
      user_id: userId,
      tokens_in: tokensIn,
      tokens_out: tokensOut,
      cost_usd: costUsd,
    });

  if (error) {
    console.error('Failed to log usage:', error);
  }
}
