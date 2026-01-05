import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { supabase, isSupabaseConfigured } from '../lib/supabase';
import { DEEP_LINKS } from '../lib/constants';
import { logger } from '../lib/logger';
import { getErrorMessage } from '../lib/errors';
import type { Session, Subscription } from '@supabase/supabase-js';

// Store auth subscription reference to prevent memory leaks
let authSubscription: Subscription | null = null;

export type SubscriptionTier = 'free' | 'premium' | 'vip';

export interface UserProfile {
  id: string;
  email: string;
  full_name: string | null;
  avatar_url: string | null;
  bio: string | null;
  instagram_handle: string | null;
  twitter_handle: string | null;
  tiktok_handle: string | null;
  website_url: string | null;
  subscription_tier: SubscriptionTier;
  subscription_status: 'active' | 'cancelled' | 'expired' | null;
  created_at: string;
}

interface AuthState {
  user: UserProfile | null;
  session: Session | null;
  isLoading: boolean;
  isInitialized: boolean;
  isGuest: boolean;
  guestEmail: string | null;
  hasSeenWelcome: boolean;

  // Computed
  isAuthenticated: boolean;
  tier: SubscriptionTier;

  // Actions
  initialize: () => Promise<void>;
  signIn: (email: string, password: string) => Promise<{ error: string | null }>;
  signUp: (email: string, password: string, fullName: string) => Promise<{ error: string | null }>;
  signOut: () => Promise<void>;
  resetPassword: (email: string) => Promise<{ error: string | null }>;
  updateProfile: (updates: Partial<Pick<UserProfile, 'full_name' | 'avatar_url' | 'bio' | 'instagram_handle' | 'twitter_handle' | 'tiktok_handle' | 'website_url'>>) => Promise<{ error: string | null }>;
  refreshProfile: () => Promise<void>;
  continueAsGuest: () => void;
  captureGuestEmail: (email: string) => void;
  convertGuestToUser: (email: string, password: string) => Promise<{ error: string | null }>;
  markWelcomeSeen: () => void;
  deleteAccount: () => Promise<{ success: boolean; error?: string }>;
  exportUserData: () => Promise<{ success: boolean; data?: Record<string, unknown>; error?: string }>;
}

// Safely extract username from email
function getNameFromEmail(email: string): string {
  if (!email || !email.includes('@')) {
    return 'User';
  }
  const username = email.split('@')[0];
  return username || 'User';
}

// Guest user factory for anonymous quiz taking
function createGuestUser(): UserProfile {
  return {
    id: 'guest-' + Date.now(),
    email: '',
    full_name: 'Guest',
    avatar_url: null,
    bio: null,
    instagram_handle: null,
    twitter_handle: null,
    tiktok_handle: null,
    website_url: null,
    subscription_tier: 'free',
    subscription_status: null,
    created_at: new Date().toISOString(),
  };
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => ({
      user: null,
      session: null,
      isLoading: false,
      isInitialized: false,
      isGuest: false,
      guestEmail: null,
      hasSeenWelcome: false,
      isAuthenticated: false,
      tier: 'free' as SubscriptionTier,

      initialize: async () => {
        // Dev mode - auto login as dev user
        const isDevMode = process.env.EXPO_PUBLIC_DEV_MODE === 'true';
        if (isDevMode) {
          set({
            user: {
              id: '00000000-0000-0000-0000-000000000001',
              email: 'dev@darkmirror.app',
              full_name: 'Dev User',
              avatar_url: null,
              bio: 'Development account',
              instagram_handle: null,
              twitter_handle: null,
              tiktok_handle: null,
              website_url: null,
              subscription_tier: 'vip',
              subscription_status: 'active',
              created_at: new Date().toISOString(),
            },
            session: null,
            isInitialized: true,
            isAuthenticated: true,
            isGuest: false,
            tier: 'vip',
          });
          return;
        }

        if (!isSupabaseConfigured) {
          // No Supabase - user must sign in when configured
          set({
            user: null,
            isInitialized: true,
            isAuthenticated: false,
            tier: 'free',
          });
          return;
        }

        try {
          const { data: { session } } = await supabase.auth.getSession();

          if (session?.user) {
            // Fetch profile
            const { data: profile } = await supabase
              .from('profiles')
              .select('*')
              .eq('id', session.user.id)
              .single();

            if (profile) {
              const userProfile = {
                id: session.user.id,
                email: session.user.email ?? '',
                full_name: profile.full_name,
                avatar_url: profile.avatar_url,
                bio: profile.bio || null,
                instagram_handle: profile.instagram_handle || null,
                twitter_handle: profile.twitter_handle || null,
                tiktok_handle: profile.tiktok_handle || null,
                website_url: profile.website_url || null,
                subscription_tier: profile.subscription_tier || 'free',
                subscription_status: profile.subscription_status,
                created_at: profile.created_at,
              };
              set({
                user: userProfile,
                session,
                isInitialized: true,
                isAuthenticated: true,
                tier: userProfile.subscription_tier,
              });

              // Clean up existing subscription to prevent memory leaks
              if (authSubscription) {
                authSubscription.unsubscribe();
                authSubscription = null;
              }

              // Listen for auth changes
              const { data: { subscription } } = supabase.auth.onAuthStateChange(async (_event, newSession) => {
                if (newSession?.user) {
                  await get().refreshProfile();
                } else {
                  set({ user: null, session: null, isAuthenticated: false, tier: 'free' });
                }
              });
              authSubscription = subscription;
              return;
            }
          }

          set({ user: null, session: null, isInitialized: true, isAuthenticated: false, tier: 'free' });
        } catch (error) {
          logger.error('Auth initialization error:', error);
          set({ user: null, isInitialized: true, isAuthenticated: false, tier: 'free' });
        }
      },

      signIn: async (email, password) => {
        set({ isLoading: true });

        if (!isSupabaseConfigured) {
          set({ isLoading: false });
          return { error: 'Authentication is not configured. Please contact support.' };
        }

        try {
          const { data, error } = await supabase.auth.signInWithPassword({
            email,
            password,
          });

          if (error) {
            set({ isLoading: false });
            return { error: error.message };
          }

          if (data.session) {
            await get().refreshProfile();
            set({ session: data.session });
          }

          set({ isLoading: false });
          return { error: null };
        } catch (error) {
          set({ isLoading: false });
          return { error: getErrorMessage(error) };
        }
      },

      signUp: async (email, password, fullName) => {
        set({ isLoading: true });

        if (!isSupabaseConfigured) {
          set({ isLoading: false });
          return { error: 'Registration is not configured. Please contact support.' };
        }

        try {
          const { data, error } = await supabase.auth.signUp({
            email,
            password,
            options: {
              data: { full_name: fullName },
            },
          });

          if (error) {
            set({ isLoading: false });
            return { error: error.message };
          }

          // Create profile
          if (data.user) {
            const { error: profileError } = await supabase.from('profiles').upsert({
              id: data.user.id,
              email,
              full_name: fullName,
              subscription_tier: 'free',
            });

            if (profileError) {
              // Profile creation failed - don't mark as authenticated
              set({ isLoading: false });
              return { error: 'Failed to create user profile. Please try again.' };
            }

            set({
              user: {
                id: data.user.id,
                email,
                full_name: fullName,
                avatar_url: null,
                bio: null,
                instagram_handle: null,
                twitter_handle: null,
                tiktok_handle: null,
                website_url: null,
                subscription_tier: 'free',
                subscription_status: null,
                created_at: new Date().toISOString(),
              },
              session: data.session,
              isAuthenticated: true,
              tier: 'free',
            });
          }

          set({ isLoading: false });
          return { error: null };
        } catch (error) {
          set({ isLoading: false });
          return { error: getErrorMessage(error) };
        }
      },

      signOut: async () => {
        set({ isLoading: true });

        // Clean up auth subscription to prevent memory leaks
        if (authSubscription) {
          authSubscription.unsubscribe();
          authSubscription = null;
        }

        if (isSupabaseConfigured) {
          await supabase.auth.signOut();
        }

        set({ user: null, session: null, isLoading: false, isAuthenticated: false, tier: 'free' });
      },

      resetPassword: async (email) => {
        if (!isSupabaseConfigured) {
          return { error: null };
        }

        try {
          const { error } = await supabase.auth.resetPasswordForEmail(email, {
            redirectTo: DEEP_LINKS.resetPassword,
          });

          return { error: error?.message || null };
        } catch (error) {
          return { error: getErrorMessage(error) };
        }
      },

      updateProfile: async (updates) => {
        const { user } = get();
        if (!user) return { error: 'Not authenticated' };

        if (!isSupabaseConfigured) {
          set({ user: { ...user, ...updates } });
          return { error: null };
        }

        try {
          const { error } = await supabase
            .from('profiles')
            .update({ ...updates, updated_at: new Date().toISOString() })
            .eq('id', user.id);

          if (error) {
            return { error: error.message };
          }

          set({ user: { ...user, ...updates } });
          return { error: null };
        } catch (error) {
          return { error: getErrorMessage(error) };
        }
      },

      refreshProfile: async () => {
        if (!isSupabaseConfigured) return;

        try {
          const { data: { user: authUser } } = await supabase.auth.getUser();

          if (!authUser) {
            set({ user: null, session: null, isAuthenticated: false, tier: 'free' });
            return;
          }

          const { data: profile } = await supabase
            .from('profiles')
            .select('*')
            .eq('id', authUser.id)
            .single();

          if (profile) {
            const tier = profile.subscription_tier || 'free';
            set({
              user: {
                id: authUser.id,
                email: authUser.email ?? '',
                full_name: profile.full_name,
                avatar_url: profile.avatar_url,
                bio: profile.bio || null,
                instagram_handle: profile.instagram_handle || null,
                twitter_handle: profile.twitter_handle || null,
                tiktok_handle: profile.tiktok_handle || null,
                website_url: profile.website_url || null,
                subscription_tier: tier,
                subscription_status: profile.subscription_status,
                created_at: profile.created_at,
              },
              isAuthenticated: true,
              tier,
            });
          }
        } catch (error) {
          logger.error('Error refreshing profile:', error);
        }
      },

      continueAsGuest: () => {
        set({
          user: createGuestUser(),
          isGuest: true,
          isInitialized: true,
          isAuthenticated: true,
          tier: 'free',
        });
      },

      captureGuestEmail: (email: string) => {
        set({ guestEmail: email });
      },

      convertGuestToUser: async (email: string, password: string) => {
        set({ isLoading: true });

        if (!isSupabaseConfigured) {
          set({ isLoading: false });
          return { error: 'Registration is not configured. Please contact support.' };
        }

        try {
          const { data, error } = await supabase.auth.signUp({
            email,
            password,
            options: {
              data: { full_name: getNameFromEmail(email) },
            },
          });

          if (error) {
            set({ isLoading: false });
            return { error: error.message };
          }

          if (data.user) {
            const { error: profileError } = await supabase.from('profiles').upsert({
              id: data.user.id,
              email,
              full_name: getNameFromEmail(email),
              subscription_tier: 'free',
            });

            if (profileError) {
              // Profile creation failed - don't mark as authenticated
              set({ isLoading: false });
              return { error: 'Failed to create user profile. Please try again.' };
            }

            set({
              user: {
                id: data.user.id,
                email,
                full_name: getNameFromEmail(email),
                avatar_url: null,
                bio: null,
                instagram_handle: null,
                twitter_handle: null,
                tiktok_handle: null,
                website_url: null,
                subscription_tier: 'free',
                subscription_status: null,
                created_at: new Date().toISOString(),
              },
              session: data.session,
              isGuest: false,
              guestEmail: null,
              isAuthenticated: true,
              tier: 'free',
            });
          }

          set({ isLoading: false });
          return { error: null };
        } catch (error) {
          set({ isLoading: false });
          return { error: getErrorMessage(error) };
        }
      },

      markWelcomeSeen: () => {
        set({ hasSeenWelcome: true });
      },

      deleteAccount: async () => {
        const { user } = get();
        if (!user) return { success: false, error: 'Not authenticated' };

        if (!isSupabaseConfigured) {
          return { success: true };
        }

        try {
          // Delete user data from tables (cascade handles most)
          await Promise.all([
            supabase.from('course_progress').delete().eq('user_id', user.id),
            supabase.from('quiz_results').delete().eq('user_id', user.id),
            supabase.from('chat_messages').delete().eq('user_id', user.id),
            supabase.from('coaching_bookings').delete().eq('user_id', user.id),
            supabase.from('payments').delete().eq('user_id', user.id),
          ]);

          // Delete profile
          await supabase.from('profiles').delete().eq('id', user.id);

          // Sign out (auth user deletion requires admin or edge function)
          await supabase.auth.signOut();

          set({ user: null, session: null, isAuthenticated: false, tier: 'free' });
          return { success: true };
        } catch (error) {
          logger.error('Error deleting account:', error);
          return { success: false, error: getErrorMessage(error) };
        }
      },

      exportUserData: async () => {
        const { user } = get();
        if (!user) return { success: false, error: 'Not authenticated' };

        if (!isSupabaseConfigured) {
          return { success: true, data: { message: 'No data to export' } };
        }

        try {
          const [profile, progress, quizResults, bookings, payments] = await Promise.allSettled([
            supabase.from('profiles').select('*').eq('id', user.id).single(),
            supabase.from('course_progress').select('*').eq('user_id', user.id),
            supabase.from('quiz_results').select('*').eq('user_id', user.id),
            supabase.from('coaching_bookings').select('*').eq('user_id', user.id),
            supabase.from('payments').select('*').eq('user_id', user.id),
          ]);

          return {
            success: true,
            data: {
              exportDate: new Date().toISOString(),
              profile: profile.status === 'fulfilled' ? profile.value.data : null,
              courseProgress: progress.status === 'fulfilled' ? progress.value.data : [],
              quizResults: quizResults.status === 'fulfilled' ? quizResults.value.data : [],
              bookings: bookings.status === 'fulfilled' ? bookings.value.data : [],
              payments: payments.status === 'fulfilled' ? payments.value.data : [],
            },
          };
        } catch (error) {
          return { success: false, error: getErrorMessage(error) };
        }
      },
    }),
    {
      name: 'auth-storage',
      storage: createJSONStorage(() => AsyncStorage),
      partialize: (state) => ({
        user: state.user,
        isGuest: state.isGuest,
        guestEmail: state.guestEmail,
        hasSeenWelcome: state.hasSeenWelcome,
        isAuthenticated: state.isAuthenticated,
        tier: state.tier,
      }),
    }
  )
);

// Helper hook to check tier access
export function useHasAccess(requiredTier: SubscriptionTier): boolean {
  const tier = useAuthStore((state) => state.user?.subscription_tier ?? 'free');
  const tierOrder = { free: 0, premium: 1, vip: 2 };
  return tierOrder[tier] >= tierOrder[requiredTier];
}
