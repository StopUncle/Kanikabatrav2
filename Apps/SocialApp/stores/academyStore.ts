// Academy Store
// Zustand state management for Empress Academy

import { create } from 'zustand';
import {
  UserAcademyProgress,
  AcademyLevel,
  Skill,
  Quest,
  QuestProgress,
  DailyChallenge,
  LevelDefinition,
  SkillTreeId,
} from '../content/academy/types';
import { SKILL_TREES, getTreeProgress } from '../content/academy/skills';
import { getLevelFromXp, getLevelProgress, getXpToNextLevel } from '../content/academy/levels';
import { academyService } from '../services/academyService';

interface AcademyState {
  // Data
  progress: UserAcademyProgress | null;
  currentLevel: LevelDefinition | null;
  levelProgress: number;
  xpToNext: number;

  // UI State
  isLoading: boolean;
  isInitialized: boolean;
  error: string | null;
  selectedTreeId: SkillTreeId | null;

  // Actions
  initialize: () => Promise<void>;
  refreshProgress: () => void;

  // XP & Levels
  addXp: (amount: number, source: string) => Promise<{
    leveledUp: boolean;
    newLevel?: AcademyLevel;
  }>;

  // Skills
  unlockSkill: (skillId: string) => Promise<{
    success: boolean;
    error?: string;
    newEffects?: string[];
  }>;
  getUnlockedSkills: () => Skill[];
  getTreeProgress: (treeId: SkillTreeId) => number;
  selectTree: (treeId: SkillTreeId | null) => void;

  // Quests
  startQuest: (questId: string) => Promise<{ success: boolean; error?: string }>;
  completeObjective: (questId: string, objectiveId: string) => Promise<{
    success: boolean;
    questCompleted: boolean;
    xpGained?: number;
    skillPointsGained?: number;
  }>;
  getActiveQuests: () => Array<{ quest: Quest; progress: QuestProgress }>;
  getAvailableQuests: (tier: 'free' | 'premium' | 'vip') => Quest[];

  // Daily Challenges
  getDailyChallenges: (tier: 'free' | 'premium' | 'vip') => DailyChallenge[];
  completeDailyChallenge: (challengeId: string) => Promise<{
    success: boolean;
    xpGained?: number;
    streakDays?: number;
  }>;
  getStreakInfo: () => { currentStreak: number; completedToday: number };

  // Utilities
  hasEffect: (keyword: string) => boolean;
  setError: (error: string | null) => void;
}

export const useAcademyStore = create<AcademyState>((set, get) => ({
  // Initial state
  progress: null,
  currentLevel: null,
  levelProgress: 0,
  xpToNext: 0,
  isLoading: false,
  isInitialized: false,
  error: null,
  selectedTreeId: null,

  // Initialize
  initialize: async () => {
    if (get().isInitialized) return;

    set({ isLoading: true });

    try {
      await academyService.initialize();
      const progress = academyService.getProgress();
      const level = getLevelFromXp(progress.totalXp);

      set({
        progress,
        currentLevel: level,
        levelProgress: getLevelProgress(progress.totalXp),
        xpToNext: getXpToNextLevel(progress.totalXp),
        isInitialized: true,
        isLoading: false,
      });
    } catch (error: unknown) {
      set({
        error: error instanceof Error ? error.message : 'Failed to initialize academy',
        isLoading: false,
        // Don't set isInitialized=true on error - allow retry
      });
    }
  },

  // Refresh progress from service
  refreshProgress: () => {
    const progress = academyService.getProgress();
    const level = getLevelFromXp(progress.totalXp);

    set({
      progress,
      currentLevel: level,
      levelProgress: getLevelProgress(progress.totalXp),
      xpToNext: getXpToNextLevel(progress.totalXp),
    });
  },

  // Add XP
  addXp: async (amount, source) => {
    const result = await academyService.addXp(amount, source);
    get().refreshProgress();
    return {
      leveledUp: result.leveledUp,
      newLevel: result.newLevel,
    };
  },

  // Unlock skill
  unlockSkill: async (skillId) => {
    set({ isLoading: true });

    try {
      const result = await academyService.unlockSkill(skillId);
      get().refreshProgress();
      set({ isLoading: false });

      return {
        success: result.success,
        error: result.error,
        newEffects: result.newEffects,
      };
    } catch (error: unknown) {
      const message = error instanceof Error ? error.message : 'Failed to unlock skill';
      set({ isLoading: false, error: message });
      return { success: false, error: message };
    }
  },

  // Get unlocked skills
  getUnlockedSkills: () => {
    return academyService.getUnlockedSkills();
  },

  // Get tree progress
  getTreeProgress: (treeId) => {
    const progress = get().progress;
    if (!progress) return 0;
    return getTreeProgress(treeId, progress.unlockedSkills);
  },

  // Select tree
  selectTree: (treeId) => {
    set({ selectedTreeId: treeId });
  },

  // Start quest
  startQuest: async (questId) => {
    const result = await academyService.startQuest(questId);
    get().refreshProgress();
    return result;
  },

  // Complete objective
  completeObjective: async (questId, objectiveId) => {
    const result = await academyService.completeObjective(questId, objectiveId);
    get().refreshProgress();
    return result;
  },

  // Get active quests
  getActiveQuests: () => {
    return academyService.getActiveQuests();
  },

  // Get available quests
  getAvailableQuests: (tier) => {
    return academyService.getAvailableQuests(tier);
  },

  // Get daily challenges
  getDailyChallenges: (tier) => {
    return academyService.getDailyChallenges(tier);
  },

  // Complete daily challenge
  completeDailyChallenge: async (challengeId) => {
    const result = await academyService.completeDailyChallenge(challengeId);
    get().refreshProgress();
    return result;
  },

  // Get streak info
  getStreakInfo: () => {
    return academyService.getStreakInfo();
  },

  // Check effect
  hasEffect: (keyword) => {
    return academyService.hasEffect(keyword);
  },

  // Set error
  setError: (error) => {
    set({ error });
  },
}));

// Selector hooks
export const useAcademyProgress = () => useAcademyStore((s) => s.progress);
export const useCurrentLevel = () => useAcademyStore((s) => s.currentLevel);
export const useLevelProgress = () => useAcademyStore((s) => ({
  progress: s.levelProgress,
  xpToNext: s.xpToNext,
  totalXp: s.progress?.totalXp ?? 0,
}));
export const useSkillPoints = () => useAcademyStore((s) => s.progress?.skillPoints ?? 0);
export const useActiveQuests = () => useAcademyStore((s) => s.getActiveQuests());
export const useStreak = () => useAcademyStore((s) => s.getStreakInfo());
