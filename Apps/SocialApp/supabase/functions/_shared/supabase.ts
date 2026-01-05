// Shared Supabase client for Edge Functions
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.39.0';

const supabaseUrl = Deno.env.get('SUPABASE_URL')!;
const supabaseServiceKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;

// Service role client for admin operations (bypasses RLS)
export const supabaseAdmin = createClient(supabaseUrl, supabaseServiceKey);

// Create a client with the user's JWT for authenticated operations
export function createUserClient(authHeader: string) {
  const token = authHeader.replace('Bearer ', '');
  return createClient(supabaseUrl, Deno.env.get('SUPABASE_ANON_KEY')!, {
    global: {
      headers: { Authorization: `Bearer ${token}` },
    },
  });
}

// Get user ID from auth header by decoding JWT
export async function getUserId(authHeader: string | null): Promise<string | null> {
  if (!authHeader) return null;

  try {
    // Extract token from "Bearer <token>"
    const token = authHeader.replace('Bearer ', '');
    if (!token) return null;

    // Decode JWT payload (base64url encoded)
    const parts = token.split('.');
    if (parts.length !== 3) {
      console.error('Invalid JWT format');
      return null;
    }

    // Decode the payload (second part)
    const payload = parts[1];
    // Handle base64url encoding
    const base64 = payload.replace(/-/g, '+').replace(/_/g, '/');
    const jsonPayload = atob(base64);
    const decoded = JSON.parse(jsonPayload);

    // Log JWT claims for debugging
    console.log('JWT claims:', JSON.stringify({
      sub: decoded.sub,
      role: decoded.role,
      iss: decoded.iss,
      aud: decoded.aud
    }));

    // Get user ID from 'sub' claim
    const userId = decoded.sub;
    if (!userId) {
      console.error('No sub claim in JWT - this might be the anon key, not a user token');
      return null;
    }

    // Check if token is expired
    const exp = decoded.exp;
    if (exp && Date.now() >= exp * 1000) {
      console.error('JWT expired');
      return null;
    }

    console.log('Decoded user ID:', userId);
    return userId;
  } catch (e) {
    console.error('getUserId exception:', e);
    return null;
  }
}
