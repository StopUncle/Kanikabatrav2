// Quiz Content Index
// All quiz content organized by tier

import {
  darkTriadQuiz,
  darkTriadOptions,
  calculateDarkTriadScores,
  darkTriadDescriptions,
  getTraitDescription,
} from './dark-triad';

import {
  manipulationIQQuiz,
  calculateManipulationIQ,
  manipulationIQInterpretations,
  getManipulationIQInterpretation,
} from './manipulation-iq';

import {
  emotionalArmorQuiz,
  armorOptions,
  calculateArmorScore,
  armorDimensions,
  getDimensionDescription,
  overallArmorInterpretations,
  getOverallInterpretation,
} from './emotional-armor';

import {
  attachmentStyleQuiz,
  attachmentOptions,
  calculateAttachmentStyle,
  attachmentStyles,
  getStyleDescription,
  relationshipPatterns,
} from './attachment-style';

// Re-export all quiz modules
export * from './dark-triad';
export * from './manipulation-iq';
export * from './emotional-armor';
export * from './attachment-style';

// Quiz Registry
export const quizzes = {
  'dark-triad': darkTriadQuiz,
  'manipulation-iq': manipulationIQQuiz,
  'emotional-armor': emotionalArmorQuiz,
  'attachment-style': attachmentStyleQuiz,
} as const;

export type QuizId = keyof typeof quizzes;

// Get quiz by ID
export function getQuiz(quizId: string) {
  return quizzes[quizId as QuizId] || null;
}

// Get quizzes by tier
export function getQuizzesByTier(tier: 'free' | 'premium' | 'vip') {
  return Object.values(quizzes).filter((quiz) => quiz.tier === tier);
}

// Get all quizzes available to a user based on their tier
export function getAvailableQuizzes(userTier: 'free' | 'premium' | 'vip') {
  const tierHierarchy = { free: 0, premium: 1, vip: 2 };
  const userLevel = tierHierarchy[userTier];

  return Object.values(quizzes).filter((quiz) => {
    const quizLevel = tierHierarchy[quiz.tier];
    return quizLevel <= userLevel;
  });
}

// Quiz metadata for UI display
export const quizMetadata = {
  'dark-triad': {
    icon: 'Triangle',
    color: '#8B5CF6',
    category: 'Personality',
    shortDescription: 'Measure your Machiavellianism, Narcissism, and Psychopathy',
  },
  'manipulation-iq': {
    icon: 'Eye',
    color: '#F59E0B',
    category: 'Detection',
    shortDescription: 'Test your ability to spot manipulation tactics',
  },
  'emotional-armor': {
    icon: 'Shield',
    color: '#10B981',
    category: 'Defense',
    shortDescription: 'Assess your psychological defense strength',
  },
  'attachment-style': {
    icon: 'Heart',
    color: '#EC4899',
    category: 'Relationships',
    shortDescription: 'Discover your relationship patterns and vulnerabilities',
  },
} as const;

// Scoring functions registry
export const quizScorers = {
  'dark-triad': calculateDarkTriadScores,
  'manipulation-iq': calculateManipulationIQ,
  'emotional-armor': calculateArmorScore,
  'attachment-style': calculateAttachmentStyle,
} as const;

// Get total quiz count
export function getTotalQuizCount(): number {
  return Object.keys(quizzes).length;
}

// Get quiz by category
export function getQuizzesByCategory(category: string) {
  return Object.entries(quizMetadata)
    .filter(([_, meta]) => meta.category === category)
    .map(([id]) => quizzes[id as QuizId]);
}
