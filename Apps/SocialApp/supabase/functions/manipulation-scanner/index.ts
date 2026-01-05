// Manipulation Scanner Edge Function
// Uses Claude 3.5 Haiku for psychological manipulation detection

import { serve } from 'https://deno.land/std@0.168.0/http/server.ts';
import { supabaseAdmin, getUserId } from '../_shared/supabase.ts';
import { corsHeaders, jsonResponse, errorResponse, handleCors } from '../_shared/cors.ts';

// Configuration
const ANTHROPIC_API_KEY = Deno.env.get('ANTHROPIC_API_KEY');
const ANTHROPIC_URL = 'https://api.anthropic.com/v1/messages';
const MODEL = 'claude-3-5-haiku-20241022';
const MAX_TOKENS = 1024;

// Cost per token (Claude 3.5 Haiku pricing)
const COST_PER_INPUT_TOKEN = 0.0000008;   // $0.80 per 1M
const COST_PER_OUTPUT_TOKEN = 0.000004;   // $4.00 per 1M

// System prompt for manipulation detection
const SCANNER_SYSTEM_PROMPT = `You are an expert psychologist specializing in identifying manipulation tactics in communication. Your role is to analyze text for psychological manipulation patterns with precision and nuance.

Analyze the provided text for manipulation tactics. Be thorough but avoid false positives - only flag genuine manipulation attempts, not normal communication patterns.

Respond ONLY with valid JSON in this exact format (no markdown, no explanation):
{
  "tactics": [
    {
      "id": "unique_id",
      "name": "Tactic Name",
      "category": "emotional|logical|social|covert",
      "confidence": 0-100,
      "severity": "low|medium|high",
      "excerpts": ["exact quote from text showing this tactic"],
      "explanation": "Brief explanation of why this is manipulation"
    }
  ],
  "riskLevel": "low|medium|high|critical",
  "riskScore": 0-100,
  "summary": "2-3 sentence summary of findings",
  "recommendation": "Specific actionable advice"
}

Tactics to check for:
- Gaslighting: Making someone question their reality
- Guilt-tripping: Using guilt to control behavior
- Love-bombing: Excessive flattery to create obligation
- Future-faking: Making promises with no intention to keep
- Triangulation: Using third parties to create jealousy/insecurity
- Silent treatment: Withdrawal as punishment
- Intermittent reinforcement: Unpredictable rewards/punishments
- Projection: Accusing others of one's own behavior
- Minimization: Downplaying concerns or feelings
- Fear-mongering: Using fear to control
- False dichotomy: Presenting only extreme options
- Moving goalposts: Constantly changing expectations
- DARVO: Deny, Attack, Reverse Victim and Offender
- Hoovering: Attempting to suck someone back into a relationship

If no manipulation is detected, return an empty tactics array with riskLevel "low" and riskScore 0.`;

interface RequestBody {
  text: string;
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
    console.error('ANTHROPIC_API_KEY not configured');
    return errorResponse('AI service not configured', 503);
  }

  try {
    // Get user ID from auth header
    const authHeader = req.headers.get('authorization');
    let userId = await getUserId(authHeader);
    let tier = 'free';

    // Dev mode: allow unauthenticated requests
    if (!userId) {
      console.log('Dev mode detected - using test user');
      userId = 'dev-test-user';
      tier = 'vip'; // Give dev user VIP access for testing
    } else {
      // Real user - get their subscription tier
      const { data: profile, error: profileError } = await supabaseAdmin
        .from('profiles')
        .select('subscription_tier')
        .eq('id', userId)
        .single();

      if (profileError || !profile) {
        tier = 'free';
      } else {
        tier = profile.subscription_tier || 'free';
      }
    }

    console.log('User ID:', userId, 'Tier:', tier);

    // Only premium and VIP can use AI scanner
    if (tier === 'free') {
      return errorResponse('Premium subscription required for AI analysis', 403);
    }

    // Parse request body
    const body: RequestBody = await req.json();
    const { text } = body;

    if (!text || typeof text !== 'string') {
      return errorResponse('Text is required', 400);
    }

    // Limit text length (roughly 4000 tokens max input)
    const truncatedText = text.slice(0, 16000);

    // Calculate input tokens (rough estimate: 4 chars = 1 token)
    const inputTokens = Math.ceil((SCANNER_SYSTEM_PROMPT.length + truncatedText.length) / 4);

    // Call Anthropic API
    const anthropicResponse = await fetch(ANTHROPIC_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': ANTHROPIC_API_KEY,
        'anthropic-version': '2023-06-01',
      },
      body: JSON.stringify({
        model: MODEL,
        max_tokens: MAX_TOKENS,
        system: SCANNER_SYSTEM_PROMPT,
        messages: [
          {
            role: 'user',
            content: `Analyze this text for manipulation tactics:\n\n${truncatedText}`,
          },
        ],
      }),
    });

    if (!anthropicResponse.ok) {
      const errorData = await anthropicResponse.json().catch(() => ({}));
      console.error('Anthropic API error:', anthropicResponse.status, errorData);
      return errorResponse('AI service error', 502);
    }

    const data = await anthropicResponse.json();
    const assistantContent = data.content?.[0]?.text;
    const usage = data.usage || {};

    if (!assistantContent) {
      console.error('No content in Anthropic response:', data);
      return errorResponse('No response from AI', 502);
    }

    // Calculate actual tokens and cost
    const actualInputTokens = usage.input_tokens || inputTokens;
    const actualOutputTokens = usage.output_tokens || Math.ceil(assistantContent.length / 4);
    const costUsd = (actualInputTokens * COST_PER_INPUT_TOKEN) +
                   (actualOutputTokens * COST_PER_OUTPUT_TOKEN);

    // Log usage (fire and forget)
    logUsage(userId, actualInputTokens, actualOutputTokens, costUsd, 'manipulation-scanner').catch(console.error);

    // Return the raw AI response (should be JSON)
    return jsonResponse({
      content: assistantContent,
      tokensUsed: actualInputTokens + actualOutputTokens,
      costUsd,
    });

  } catch (error) {
    console.error('Manipulation Scanner error:', error);
    return errorResponse('Internal server error', 500);
  }
});

// ============================================
// USAGE LOGGING
// ============================================

async function logUsage(
  userId: string,
  tokensIn: number,
  tokensOut: number,
  costUsd: number,
  source: string
): Promise<void> {
  const { error } = await supabaseAdmin
    .from('ai_usage')
    .insert({
      user_id: userId,
      tokens_in: tokensIn,
      tokens_out: tokensOut,
      cost_usd: costUsd,
      source,
    });

  if (error) {
    console.error('Failed to log usage:', error);
  }
}
