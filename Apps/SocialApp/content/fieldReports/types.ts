// Field Report Types
// Tactical debriefs for real-world application of psychological tactics

export type ReportSituation =
  | 'work'
  | 'relationship'
  | 'social'
  | 'negotiation'
  | 'conflict'
  | 'family'
  | 'other';

export type SuccessRating = 1 | 2 | 3 | 4 | 5;

export interface FieldReport {
  id: string;
  userId: string;
  missionId?: string;              // Optional link to mission
  missionWeek?: number;            // For display
  tacticUsed: string;              // Which tactic they applied
  situation: ReportSituation;      // Context category
  whatHappened: string;            // The outcome/story
  lessonsLearned: string;          // Reflection
  successRating: SuccessRating;    // Self-assessed success (1-5)
  isPublic: boolean;               // Share with community?
  isAnonymous: boolean;            // If public, hide identity?
  createdAt: string;
  updatedAt?: string;
}

export interface FieldReportDraft {
  missionId?: string;
  tacticUsed: string;
  situation: ReportSituation;
  whatHappened: string;
  lessonsLearned: string;
  successRating: SuccessRating;
  isPublic: boolean;
  isAnonymous: boolean;
}

// Predefined tactics for quick selection
export const COMMON_TACTICS = [
  'Strategic Silence',
  'Emotional Detachment',
  'Boundary Setting',
  'Mirroring',
  'The Pause',
  'Frame Control',
  'Scarcity Play',
  'Social Audit',
  'Strategic Withdrawal',
  'Calm Under Pressure',
  'Reading Body Language',
  'Manipulation Detection',
  'Other',
] as const;

export const SITUATION_LABELS: Record<ReportSituation, string> = {
  work: 'Work / Professional',
  relationship: 'Romantic Relationship',
  social: 'Social Situation',
  negotiation: 'Negotiation',
  conflict: 'Conflict Resolution',
  family: 'Family',
  other: 'Other',
};

export const RATING_LABELS: Record<SuccessRating, string> = {
  1: 'Failed - Backfired',
  2: 'Poor - Needs Work',
  3: 'Okay - Mixed Results',
  4: 'Good - Mostly Effective',
  5: 'Excellent - Perfect Execution',
};
