import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { supabase, isSupabaseConfigured } from '../lib/supabase';
import { useAuthStore } from './authStore';
import { logger } from '../lib/logger';
import { UserAvatarConfig, defaultAvatarConfig, getRewardById } from '../lib/avatarRewards';
import { creditService } from '../services/creditService';

interface GamificationState {
  // Streak data
  currentStreak: number;
  maxStreak: number;
  lastStreakCheck: string; // ISO date
  streakJustIncreased: boolean;
  streakMilestone: string | null;

  // XP data
  totalXp: number;
  currentLevel: number;
  xpToNextLevel: number;

  // Badges
  earnedBadges: string[];

  // Psychology Cards (collectibles from simulator)
  earnedCards: string[];

  // Avatar Rewards (frames and character avatars)
  earnedAvatarRewards: string[];
  avatarConfig: UserAvatarConfig;

  // Actions
  checkStreak: () => Promise<void>;
  addXp: (amount: number) => Promise<void>;
  earnBadge: (badgeId: string) => Promise<void>;
  earnCard: (cardId: string) => Promise<void>;
  earnAvatarReward: (rewardId: string) => Promise<boolean>;
  updateAvatarConfig: (updates: Partial<UserAvatarConfig>) => Promise<void>;
  loadFromDatabase: () => Promise<void>;
  reset: () => void;
}

// XP thresholds for levels
const LEVEL_THRESHOLDS = [
  0,      // Level 1
  100,    // Level 2
  250,    // Level 3
  500,    // Level 4
  1000,   // Level 5
  2000,   // Level 6
  3500,   // Level 7
  5500,   // Level 8
  8000,   // Level 9
  12000,  // Level 10
];

// Streak milestones
const STREAK_MILESTONES: Record<number, string> = {
  3: 'Warming Up',
  7: 'Week Warrior',
  14: 'Two-Week Titan',
  30: 'Monthly Master',
  60: 'Consistency Champion',
  100: 'Century Streak',
  365: 'Year of Growth',
};

function calculateLevel(xp: number): { level: number; xpToNext: number } {
  let level = 1;
  for (let i = 1; i < LEVEL_THRESHOLDS.length; i++) {
    if (xp >= LEVEL_THRESHOLDS[i]) {
      level = i + 1;
    } else {
      break;
    }
  }

  const nextThreshold = LEVEL_THRESHOLDS[level] || LEVEL_THRESHOLDS[LEVEL_THRESHOLDS.length - 1] * 2;
  const xpToNext = nextThreshold - xp;

  return { level, xpToNext };
}

function getStreakMilestone(streak: number): string | null {
  const milestones = Object.keys(STREAK_MILESTONES).map(Number).sort((a, b) => b - a);
  for (const milestone of milestones) {
    if (streak >= milestone) {
      return STREAK_MILESTONES[milestone];
    }
  }
  return null;
}

export const useGamificationStore = create<GamificationState>()(
  persist(
    (set, get) => ({
      // Initial state
      currentStreak: 0,
      maxStreak: 0,
      lastStreakCheck: '',
      streakJustIncreased: false,
      streakMilestone: null,
      totalXp: 0,
      currentLevel: 1,
      xpToNextLevel: 100,
      earnedBadges: [],
      earnedCards: [],
      earnedAvatarRewards: [],
      avatarConfig: defaultAvatarConfig,

      // Load gamification data from database
      loadFromDatabase: async () => {
        const { user, isGuest } = useAuthStore.getState();
        const userId = user?.id;
        if (!userId || !isSupabaseConfigured || isGuest) return;

        try {
          const { data, error } = await supabase
            .from('profiles')
            .select('total_xp, current_level, current_streak, max_streak, last_streak_date, badges_earned, cards_earned, avatar_rewards, avatar_config')
            .eq('id', userId)
            .single();

          if (error || !data) return;

          const { level, xpToNext } = calculateLevel(data.total_xp || 0);
          const milestone = getStreakMilestone(data.current_streak || 0);

          set({
            totalXp: data.total_xp || 0,
            currentLevel: level,
            xpToNextLevel: xpToNext,
            currentStreak: data.current_streak || 0,
            maxStreak: data.max_streak || 0,
            lastStreakCheck: data.last_streak_date || '',
            streakMilestone: milestone,
            earnedBadges: data.badges_earned || [],
            earnedCards: data.cards_earned || [],
            earnedAvatarRewards: data.avatar_rewards || [],
            avatarConfig: data.avatar_config || defaultAvatarConfig,
          });
        } catch (error) {
          logger.error('Failed to load gamification data:', error);
        }
      },

      // Check and update streak
      checkStreak: async () => {
        const today = new Date().toISOString().split('T')[0];
        const { lastStreakCheck } = get();

        // Don't check more than once per day locally
        if (lastStreakCheck === today) {
          return;
        }

        const { user: authUser, isGuest: isGuestUser } = useAuthStore.getState();
        if (!authUser?.id || !isSupabaseConfigured || isGuestUser) {
          // Local-only streak calculation for guests or when no database
          const yesterday = new Date();
          yesterday.setDate(yesterday.getDate() - 1);
          const yesterdayStr = yesterday.toISOString().split('T')[0];

          const { currentStreak, maxStreak } = get();
          let newStreak = currentStreak;
          let justIncreased = false;

          if (lastStreakCheck === yesterdayStr) {
            newStreak = currentStreak + 1;
            justIncreased = true;
          } else if (lastStreakCheck !== today) {
            newStreak = 1;
            justIncreased = true;
          }

          const newMax = Math.max(maxStreak, newStreak);
          const milestone = justIncreased ? getStreakMilestone(newStreak) : null;

          set({
            currentStreak: newStreak,
            maxStreak: newMax,
            lastStreakCheck: today,
            streakJustIncreased: justIncreased,
            streakMilestone: milestone,
          });

          // Award credits for streak milestones (7 and 30 days)
          if (justIncreased && (newStreak === 7 || newStreak === 30)) {
            creditService.awardStreakCredits(newStreak);
          }
          return;
        }

        try {
          // Use database function for streak update
          const { data, error } = await supabase.rpc('update_user_streak', {
            user_id: authUser.id,
          });

          if (error || !data || data.length === 0) {
            logger.error('Streak update failed:', error);
            return;
          }

          const result = data[0];
          const milestone = result.just_increased ? getStreakMilestone(result.streak) : null;

          set({
            currentStreak: result.streak,
            maxStreak: result.max_streak,
            lastStreakCheck: today,
            streakJustIncreased: result.just_increased,
            streakMilestone: milestone,
          });

          // Award credits for streak milestones (7 and 30 days)
          if (result.just_increased && (result.streak === 7 || result.streak === 30)) {
            creditService.awardStreakCredits(result.streak);
          }
        } catch (error) {
          logger.error('Streak check failed:', error);
        }
      },

      // Add XP and update level
      addXp: async (amount: number) => {
        const { totalXp } = get();
        const newXp = totalXp + amount;
        const { level, xpToNext } = calculateLevel(newXp);

        // Update local state immediately for responsive UI
        set({
          totalXp: newXp,
          currentLevel: level,
          xpToNextLevel: xpToNext,
        });

        // Sync to database
        const { user: authUser, isGuest: isGuestUser } = useAuthStore.getState();
        if (!authUser?.id || !isSupabaseConfigured || isGuestUser) return;

        try {
          await supabase.rpc('update_user_xp', {
            user_id: authUser.id,
            xp_to_add: amount,
          });
        } catch (error) {
          logger.error('Failed to sync XP to database:', error);
        }
      },

      // Earn a badge
      earnBadge: async (badgeId: string) => {
        const { earnedBadges } = get();
        if (earnedBadges.includes(badgeId)) return;

        const newBadges = [...earnedBadges, badgeId];
        set({ earnedBadges: newBadges });

        // Award credit for earning a badge
        creditService.awardBadgeCredits(badgeId);

        // Sync to database
        const { user: authUser, isGuest: isGuestUser } = useAuthStore.getState();
        if (!authUser?.id || !isSupabaseConfigured || isGuestUser) return;

        try {
          await supabase
            .from('profiles')
            .update({ badges_earned: newBadges })
            .eq('id', authUser.id);
        } catch (error) {
          logger.error('Failed to sync badge to database:', error);
        }
      },

      // Earn a psychology card
      earnCard: async (cardId: string) => {
        const { earnedCards } = get();
        if (earnedCards.includes(cardId)) return;

        const newCards = [...earnedCards, cardId];
        set({ earnedCards: newCards });

        // Sync to database
        const { user: authUser, isGuest: isGuestUser } = useAuthStore.getState();
        if (!authUser?.id || !isSupabaseConfigured || isGuestUser) return;

        try {
          await supabase
            .from('profiles')
            .update({ cards_earned: newCards })
            .eq('id', authUser.id);
        } catch (error) {
          logger.error('Failed to sync card to database:', error);
        }
      },

      // Earn an avatar reward (frame or character)
      earnAvatarReward: async (rewardId: string) => {
        const { earnedAvatarRewards } = get();
        if (earnedAvatarRewards.includes(rewardId)) return false;

        // Verify the reward exists
        const reward = getRewardById(rewardId);
        if (!reward) {
          logger.error('Invalid avatar reward ID:', rewardId);
          return false;
        }

        const newRewards = [...earnedAvatarRewards, rewardId];
        set({ earnedAvatarRewards: newRewards });

        // Sync to database
        const { user: authUser, isGuest: isGuestUser } = useAuthStore.getState();
        if (!authUser?.id || !isSupabaseConfigured || isGuestUser) return true;

        try {
          await supabase
            .from('profiles')
            .update({ avatar_rewards: newRewards })
            .eq('id', authUser.id);
        } catch (error) {
          logger.error('Failed to sync avatar reward to database:', error);
        }

        return true;
      },

      // Update avatar configuration
      updateAvatarConfig: async (updates: Partial<UserAvatarConfig>) => {
        const { avatarConfig, earnedAvatarRewards } = get();

        // Validate that user has earned the rewards they're trying to use
        if (updates.activeFrame && !earnedAvatarRewards.includes(updates.activeFrame)) {
          logger.error('Cannot use unearned frame:', updates.activeFrame);
          return;
        }
        if (updates.activeCharacter && !earnedAvatarRewards.includes(updates.activeCharacter)) {
          logger.error('Cannot use unearned character:', updates.activeCharacter);
          return;
        }

        const newConfig: UserAvatarConfig = { ...avatarConfig, ...updates };
        set({ avatarConfig: newConfig });

        // Sync to database
        const { user: authUser, isGuest: isGuestUser } = useAuthStore.getState();
        if (!authUser?.id || !isSupabaseConfigured || isGuestUser) return;

        try {
          await supabase
            .from('profiles')
            .update({ avatar_config: newConfig })
            .eq('id', authUser.id);
        } catch (error) {
          logger.error('Failed to sync avatar config to database:', error);
        }
      },

      // Reset (for logout)
      reset: () => {
        set({
          currentStreak: 0,
          maxStreak: 0,
          lastStreakCheck: '',
          streakJustIncreased: false,
          streakMilestone: null,
          totalXp: 0,
          currentLevel: 1,
          xpToNextLevel: 100,
          earnedBadges: [],
          earnedCards: [],
          earnedAvatarRewards: [],
          avatarConfig: defaultAvatarConfig,
        });
      },
    }),
    {
      name: 'gamification-storage',
      storage: createJSONStorage(() => AsyncStorage),
      partialize: (state) => ({
        currentStreak: state.currentStreak,
        maxStreak: state.maxStreak,
        lastStreakCheck: state.lastStreakCheck,
        totalXp: state.totalXp,
        currentLevel: state.currentLevel,
        earnedBadges: state.earnedBadges,
        earnedCards: state.earnedCards,
        earnedAvatarRewards: state.earnedAvatarRewards,
        avatarConfig: state.avatarConfig,
      }),
    }
  )
);
