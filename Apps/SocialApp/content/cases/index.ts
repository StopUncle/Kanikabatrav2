// Case Files Registry
// Organized progression through dating simulation scenarios

import type { CaseFile, CaseProgress, CaseSummary, CaseStatus } from './types';

/**
 * Case 1: The Narcissist Trap (FREE - intro case)
 * Learn to recognize narcissistic manipulation patterns
 */
export const narcissistTrapCase: CaseFile = {
  id: 'narcissist-trap',
  caseNumber: 1,
  title: 'The Narcissist Trap',
  subtitle: 'Charm that hides the chaos',
  description: 'Navigate a relationship with a charming narcissist. Learn to spot love bombing, recognize manipulation tactics, and protect yourself from emotional exploitation.',
  tier: 'free',
  chapters: [
    {
      chapterNumber: 1,
      scenarioId: 'narcissist-trap',
      title: 'The Charming Stranger',
      lessonOnFail: 'dark-psychology-101',
    },
  ],
  unlockRequirement: undefined,
  badgeId: 'narcissist-survivor',
  accentColor: '#E91E63',
  iconEmoji: '🎭',
};

/**
 * Case 2: The Ghost Protocol (Premium)
 * Master the art of strategic withdrawal
 */
export const ghostProtocolCase: CaseFile = {
  id: 'ghost-protocol',
  caseNumber: 2,
  title: 'The Ghost Protocol',
  subtitle: 'When silence speaks volumes',
  description: 'Experience being ghosted and learn how to handle it with dignity. Understand the psychology behind disappearing acts and how to respond strategically.',
  tier: 'premium',
  chapters: [
    {
      chapterNumber: 1,
      scenarioId: 'the-ghost',
      title: 'The Vanishing Act',
      lessonOnFail: 'emotional-armor',
    },
  ],
  unlockRequirement: 'narcissist-trap',
  badgeId: 'ghost-master',
  accentColor: '#6366F1',
  iconEmoji: '👻',
};

/**
 * Case 3: The Rotation Master (Premium)
 * Strategic dating and maintaining options
 */
export const rotationMasterCase: CaseFile = {
  id: 'rotation-master',
  caseNumber: 3,
  title: 'The Rotation Master',
  subtitle: 'Never put all eggs in one basket',
  description: 'Learn the art of strategic dating. Handle multiple prospects, maintain your power, and never let one person have too much control over your emotions.',
  tier: 'premium',
  chapters: [
    {
      chapterNumber: 1,
      scenarioId: 'rotation-master',
      title: 'The Options Game',
      lessonOnFail: 'advanced-power-dynamics',
    },
  ],
  unlockRequirement: 'ghost-protocol',
  badgeId: 'rotation-expert',
  accentColor: '#F59E0B',
  iconEmoji: '🔄',
};

/**
 * Case 4: The Empress Endgame (VIP - Boss Level)
 * Ultimate power dynamics mastery
 */
export const empressEndgameCase: CaseFile = {
  id: 'empress-endgame',
  caseNumber: 4,
  title: 'The Empress Endgame',
  subtitle: 'Rule or be ruled',
  description: 'The ultimate test. Navigate complex power dynamics, maintain frame under pressure, and emerge as the one in control. For those who have mastered the basics.',
  tier: 'vip',
  chapters: [
    {
      chapterNumber: 1,
      scenarioId: 'empress-move',
      title: 'The Crown Awaits',
      lessonOnFail: 'empress-endgame',
    },
  ],
  unlockRequirement: 'rotation-master',
  badgeId: 'empress-crowned',
  accentColor: '#C9A961',
  iconEmoji: '👑',
};

// All cases in order
export const caseFiles: CaseFile[] = [
  narcissistTrapCase,
  ghostProtocolCase,
  rotationMasterCase,
  empressEndgameCase,
];

// Case registry for lookup
export const cases: Record<string, CaseFile> = {
  'narcissist-trap': narcissistTrapCase,
  'ghost-protocol': ghostProtocolCase,
  'rotation-master': rotationMasterCase,
  'empress-endgame': empressEndgameCase,
};

// Helper functions
export function getCaseFile(caseId: string): CaseFile | null {
  return cases[caseId] || null;
}

export function getAllCases(): CaseFile[] {
  return caseFiles;
}

export function getCasesByTier(tier: 'free' | 'premium' | 'vip'): CaseFile[] {
  const tierHierarchy = { free: 0, premium: 1, vip: 2 };
  const userLevel = tierHierarchy[tier];

  return caseFiles.filter((caseFile) => {
    const caseLevel = tierHierarchy[caseFile.tier];
    return caseLevel <= userLevel;
  });
}

export function getNextCase(caseId: string): CaseFile | null {
  const currentCase = getCaseFile(caseId);
  if (!currentCase) return null;

  const nextCaseNumber = currentCase.caseNumber + 1;
  return caseFiles.find((c) => c.caseNumber === nextCaseNumber) || null;
}

export function isCaseUnlocked(
  caseFile: CaseFile,
  completedCases: string[]
): boolean {
  if (!caseFile.unlockRequirement) return true;
  return completedCases.includes(caseFile.unlockRequirement);
}

export function getCaseSummary(
  caseFile: CaseFile,
  progress: CaseProgress | null,
  completedCases: string[]
): CaseSummary {
  const isUnlocked = isCaseUnlocked(caseFile, completedCases);

  const defaultProgress: CaseProgress = {
    caseId: caseFile.id,
    status: isUnlocked ? 'available' : 'locked',
    currentChapter: 1,
    chapterOutcomes: {},
  };

  const actualProgress = progress || defaultProgress;

  // Count completed chapters
  const chaptersCompleted = Object.keys(actualProgress.chapterOutcomes).length;

  return {
    caseFile,
    progress: actualProgress,
    isUnlocked,
    chaptersCompleted,
    totalChapters: caseFile.chapters.length,
  };
}

// Export types
export type { CaseFile, CaseProgress, CaseSummary, CaseStatus, ChapterInfo, ChapterResult } from './types';
