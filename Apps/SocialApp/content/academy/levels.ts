// Empress Academy Levels
// The 5-tier progression from Peasant to Empress

import { LevelDefinition, AcademyLevel } from './types';

export const ACADEMY_LEVELS: Record<AcademyLevel, LevelDefinition> = {
  peasant: {
    id: 'peasant',
    name: 'Peasant',
    title: 'The Unaware',
    description: 'Just beginning to see the hidden dynamics at play in relationships and social interactions.',
    minXp: 0,
    maxXp: 499,
    color: '#78716C', // Stone gray
    icon: 'Sprout',
    perks: [
      'Access to foundational lessons',
      'Basic psychology concepts',
      '1 daily challenge',
    ],
  },
  apprentice: {
    id: 'apprentice',
    name: 'Apprentice',
    title: 'The Student',
    description: 'Learning to recognize patterns and beginning to understand the art of influence.',
    minXp: 500,
    maxXp: 1499,
    color: '#0EA5E9', // Sky blue
    icon: 'BookOpen',
    perks: [
      'Access to core skill trees',
      'Intermediate quests unlock',
      '2 daily challenges',
      'Pattern recognition training',
    ],
  },
  strategist: {
    id: 'strategist',
    name: 'Strategist',
    title: 'The Calculator',
    description: 'Able to see multiple moves ahead and plan interactions with precision.',
    minXp: 1500,
    maxXp: 3499,
    color: '#8B5CF6', // Violet
    icon: 'Target',
    perks: [
      'Advanced skill trees unlock',
      'Strategic quest chains',
      '3 daily challenges',
      'Manipulation detection mastery',
      'Counter-tactics training',
    ],
  },
  manipulatrix: {
    id: 'manipulatrix',
    name: 'Manipulatrix',
    title: 'The Controller',
    description: 'Masters the dark arts of influence while maintaining ethical boundaries.',
    minXp: 3500,
    maxXp: 7499,
    color: '#EC4899', // Pink
    icon: 'Crown',
    perks: [
      'Master skill trees unlock',
      'Expert quest chains',
      'All daily challenges',
      'Advanced power dynamics',
      'Frame control mastery',
      'Exclusive community access',
    ],
  },
  empress: {
    id: 'empress',
    name: 'Empress',
    title: 'The Sovereign',
    description: 'Complete mastery over self and understanding of others. Rules with wisdom and precision.',
    minXp: 7500,
    maxXp: Infinity,
    color: '#D4AF37', // Gold
    icon: 'Gem',
    perks: [
      'All content unlocked',
      'Empress-only quests',
      'Unlimited challenges',
      'Legacy badge',
      'Early access to new features',
      'Direct mentor access',
    ],
  },
};

// Ordered array for iteration
export const LEVEL_ORDER: AcademyLevel[] = [
  'peasant',
  'apprentice',
  'strategist',
  'manipulatrix',
  'empress',
];

/**
 * Get level from XP amount
 */
export function getLevelFromXp(xp: number): LevelDefinition {
  for (let i = LEVEL_ORDER.length - 1; i >= 0; i--) {
    const level = ACADEMY_LEVELS[LEVEL_ORDER[i]];
    if (xp >= level.minXp) {
      return level;
    }
  }
  return ACADEMY_LEVELS.peasant;
}

/**
 * Get progress percentage within current level
 */
export function getLevelProgress(xp: number): number {
  const level = getLevelFromXp(xp);
  if (level.id === 'empress') return 100; // Max level

  const xpInLevel = xp - level.minXp;
  const levelRange = level.maxXp - level.minXp + 1;
  return Math.min((xpInLevel / levelRange) * 100, 100);
}

/**
 * Get XP needed for next level
 */
export function getXpToNextLevel(xp: number): number {
  const level = getLevelFromXp(xp);
  if (level.id === 'empress') return 0;
  return level.maxXp - xp + 1;
}

/**
 * Get the next level definition
 */
export function getNextLevel(currentLevel: AcademyLevel): LevelDefinition | null {
  const currentIndex = LEVEL_ORDER.indexOf(currentLevel);
  if (currentIndex === -1 || currentIndex === LEVEL_ORDER.length - 1) {
    return null;
  }
  return ACADEMY_LEVELS[LEVEL_ORDER[currentIndex + 1]];
}

// XP rewards for various actions
export const XP_REWARDS = {
  complete_lesson: 25,
  complete_quest: 100,
  complete_quest_objective: 15,
  complete_daily_challenge: 50,
  unlock_skill: 30,
  daily_login: 10,
  streak_bonus_7: 50,
  streak_bonus_30: 200,
  text_analysis: 10,
  rotation_update: 5,
};
