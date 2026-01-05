import AsyncStorage from '@react-native-async-storage/async-storage';
import { createClient } from '@supabase/supabase-js';

// The Dark Mirror - Supabase Configuration
// Project: cudqqtmdjgrjhxcxpsbl
const supabaseUrl = process.env.EXPO_PUBLIC_SUPABASE_URL || 'https://cudqqtmdjgrjhxcxpsbl.supabase.co';
const supabaseAnonKey = process.env.EXPO_PUBLIC_SUPABASE_ANON_KEY || '';

// Check if anon key is configured (URL is already set)
const isConfigured = supabaseAnonKey.length > 0;

console.log('[DEBUG supabase] URL:', supabaseUrl);
console.log('[DEBUG supabase] Anon key present:', supabaseAnonKey.length > 0);
console.log('[DEBUG supabase] isConfigured:', isConfigured);

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    storage: AsyncStorage,
    autoRefreshToken: isConfigured,
    persistSession: isConfigured,
    detectSessionInUrl: false,
  },
});

export const isSupabaseConfigured = isConfigured;
