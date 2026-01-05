// Case Files Types
// Progression system with story chapters and failure handling

import type { SubscriptionTier, OutcomeType } from '../simulator/types';

/**
 * Status of a case in user's progress
 */
export type CaseStatus = 'locked' | 'available' | 'in_progress' | 'stalled' | 'completed';

/**
 * A chapter within a case file
 */
export interface ChapterInfo {
  chapterNumber: number;
  scenarioId: string;         // References existing scenario
  title: string;              // "First Contact"
  lessonOnFail: string;       // Lesson ID required on failure
}

/**
 * A case file containing connected story chapters
 */
export interface CaseFile {
  id: string;                 // 'narcissist-trap', 'ghost-protocol'
  caseNumber: number;         // Display order (1, 2, 3...)
  title: string;              // "The Narcissist Trap"
  subtitle: string;           // "Charm that hides the chaos"
  description: string;        // Longer description for detail view
  tier: SubscriptionTier;     // 'free' | 'premium' | 'vip'

  chapters: ChapterInfo[];    // Connected scenarios
  unlockRequirement?: string; // Case ID that must be completed first
  badgeId: string;            // Badge earned on case completion

  // Visual theming
  accentColor?: string;       // Optional custom color for case card
  iconEmoji?: string;         // Icon for the case (e.g., "🎭", "👻")
}

/**
 * User's progress through a specific case
 */
export interface CaseProgress {
  caseId: string;
  status: CaseStatus;
  currentChapter: number;     // 1-indexed
  stalledAt?: number;         // Chapter number where they failed
  requiredLesson?: string;    // Lesson ID they need to complete
  lessonCompleted?: boolean;  // Has the required lesson been completed
  chapterOutcomes: Record<number, OutcomeType>; // Outcome per chapter
  startedAt?: string;
  completedAt?: string;
}

/**
 * Summary view for case cards
 */
export interface CaseSummary {
  caseFile: CaseFile;
  progress: CaseProgress;
  isUnlocked: boolean;
  chaptersCompleted: number;
  totalChapters: number;
}

/**
 * Result when completing a chapter
 */
export interface ChapterResult {
  caseId: string;
  chapterNumber: number;
  outcome: OutcomeType;
  passed: boolean;            // Outcome was 'good' or 'neutral'
  xpEarned: number;
  lessonRequired?: string;    // If failed, lesson to complete
  nextChapter?: number;       // Next chapter number if passed
  caseCompleted?: boolean;    // True if this was the final chapter
}
