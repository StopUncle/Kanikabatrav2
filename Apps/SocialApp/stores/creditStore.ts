// Credit Store - Manages credits and scenario cooldowns
// Credits can be used to reset scenario cooldowns

import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { supabase, isSupabaseConfigured } from '../lib/supabase';
import { useAuthStore, type SubscriptionTier } from './authStore';
import { logger } from '../lib/logger';

// Cooldown durations by tier (in milliseconds)
const COOLDOWN_DURATIONS: Record<SubscriptionTier, number> = {
  free: 2 * 60 * 60 * 1000,    // 2 hours
  premium: 1 * 60 * 60 * 1000, // 1 hour
  vip: 0,                       // No cooldown
};

// Daily credit allowance by tier
const DAILY_CREDITS: Record<SubscriptionTier, number> = {
  free: 1,
  premium: 2,
  vip: 3,
};

// Credit cap
const MAX_CREDITS = 50;

interface CreditState {
  // Credits
  credits: number;
  lastDailyClaimDate: string; // ISO date string (YYYY-MM-DD)

  // Scenario cooldowns: scenarioId -> timestamp when playable again
  scenarioCooldowns: Record<string, number>;

  // Actions
  claimDailyCredits: () => Promise<{ claimed: boolean; amount: number }>;
  addCredits: (amount: number, reason?: string) => Promise<void>;
  spendCredit: (scenarioId: string) => boolean;
  checkCooldown: (scenarioId: string) => { canPlay: boolean; remainingMs: number };
  setCooldown: (scenarioId: string) => void;
  clearCooldown: (scenarioId: string) => void;
  loadFromDatabase: () => Promise<void>;
  syncToDatabase: () => Promise<void>;
  reset: () => void;
}

export const useCreditStore = create<CreditState>()(
  persist(
    (set, get) => ({
      // Initial state
      credits: 0,
      lastDailyClaimDate: '',
      scenarioCooldowns: {},

      // Claim daily credits based on subscription tier
      claimDailyCredits: async () => {
        const today = new Date().toISOString().split('T')[0];
        const { lastDailyClaimDate, credits } = get();

        // Already claimed today
        if (lastDailyClaimDate === today) {
          return { claimed: false, amount: 0 };
        }

        const tier = useAuthStore.getState().tier;
        const amount = DAILY_CREDITS[tier];
        const newCredits = Math.min(credits + amount, MAX_CREDITS);

        set({
          credits: newCredits,
          lastDailyClaimDate: today,
        });

        // Sync to database
        await get().syncToDatabase();

        return { claimed: true, amount };
      },

      // Add credits (from achievements, streaks, etc.)
      addCredits: async (amount: number, reason?: string) => {
        const { credits } = get();
        const newCredits = Math.min(credits + amount, MAX_CREDITS);

        if (newCredits === credits) {
          // Already at cap
          return;
        }

        set({ credits: newCredits });

        if (reason) {
          logger.info(`Credits earned: +${amount} (${reason})`);
        }

        // Sync to database
        await get().syncToDatabase();
      },

      // Spend a credit to reset a scenario cooldown
      spendCredit: (scenarioId: string) => {
        const { credits, scenarioCooldowns } = get();

        if (credits < 1) {
          return false;
        }

        const newCooldowns = { ...scenarioCooldowns };
        delete newCooldowns[scenarioId];

        set({
          credits: credits - 1,
          scenarioCooldowns: newCooldowns,
        });

        // Fire and forget database sync
        get().syncToDatabase();

        return true;
      },

      // Check if a scenario is on cooldown
      checkCooldown: (scenarioId: string) => {
        const tier = useAuthStore.getState().tier;

        // VIP has no cooldown
        if (tier === 'vip') {
          return { canPlay: true, remainingMs: 0 };
        }

        const { scenarioCooldowns } = get();
        const cooldownEnd = scenarioCooldowns[scenarioId];

        if (!cooldownEnd) {
          return { canPlay: true, remainingMs: 0 };
        }

        const now = Date.now();
        if (now >= cooldownEnd) {
          // Cooldown expired, clean it up
          const newCooldowns = { ...scenarioCooldowns };
          delete newCooldowns[scenarioId];
          set({ scenarioCooldowns: newCooldowns });
          return { canPlay: true, remainingMs: 0 };
        }

        return {
          canPlay: false,
          remainingMs: cooldownEnd - now,
        };
      },

      // Set cooldown after completing a scenario
      setCooldown: (scenarioId: string) => {
        const tier = useAuthStore.getState().tier;
        const duration = COOLDOWN_DURATIONS[tier];

        // VIP has no cooldown
        if (duration === 0) {
          return;
        }

        const cooldownEnd = Date.now() + duration;
        const { scenarioCooldowns } = get();

        set({
          scenarioCooldowns: {
            ...scenarioCooldowns,
            [scenarioId]: cooldownEnd,
          },
        });

        // Fire and forget database sync
        get().syncToDatabase();
      },

      // Clear cooldown for a scenario (used when spending credits)
      clearCooldown: (scenarioId: string) => {
        const { scenarioCooldowns } = get();
        const newCooldowns = { ...scenarioCooldowns };
        delete newCooldowns[scenarioId];
        set({ scenarioCooldowns: newCooldowns });
      },

      // Load from database
      loadFromDatabase: async () => {
        const { user, isGuest } = useAuthStore.getState();
        if (!user?.id || !isSupabaseConfigured || isGuest) return;

        try {
          const { data, error } = await supabase
            .from('profiles')
            .select('credits, last_daily_claim, scenario_cooldowns')
            .eq('id', user.id)
            .single();

          if (error || !data) return;

          set({
            credits: data.credits || 0,
            lastDailyClaimDate: data.last_daily_claim || '',
            scenarioCooldowns: data.scenario_cooldowns || {},
          });
        } catch (error) {
          logger.error('Failed to load credit data:', error);
        }
      },

      // Sync to database
      syncToDatabase: async () => {
        const { user, isGuest } = useAuthStore.getState();
        if (!user?.id || !isSupabaseConfigured || isGuest) return;

        const { credits, lastDailyClaimDate, scenarioCooldowns } = get();

        try {
          await supabase
            .from('profiles')
            .update({
              credits,
              last_daily_claim: lastDailyClaimDate || null,
              scenario_cooldowns: scenarioCooldowns,
            })
            .eq('id', user.id);
        } catch (error) {
          logger.error('Failed to sync credits to database:', error);
        }
      },

      // Reset (for logout)
      reset: () => {
        set({
          credits: 0,
          lastDailyClaimDate: '',
          scenarioCooldowns: {},
        });
      },
    }),
    {
      name: 'credit-storage',
      storage: createJSONStorage(() => AsyncStorage),
      partialize: (state) => ({
        credits: state.credits,
        lastDailyClaimDate: state.lastDailyClaimDate,
        scenarioCooldowns: state.scenarioCooldowns,
      }),
    }
  )
);

// Helper to format remaining cooldown time
export function formatCooldownTime(remainingMs: number): string {
  if (remainingMs <= 0) return '';

  const totalSeconds = Math.ceil(remainingMs / 1000);
  const hours = Math.floor(totalSeconds / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);

  if (hours > 0) {
    return `${hours}h ${minutes}m`;
  }
  return `${minutes}m`;
}

// Credit reward amounts for achievements
export const CREDIT_REWARDS = {
  STREAK_7_DAYS: 2,
  STREAK_30_DAYS: 5,
  EARN_BADGE: 1,
  MASTER_SCENARIO: 2, // 100% accuracy
} as const;
