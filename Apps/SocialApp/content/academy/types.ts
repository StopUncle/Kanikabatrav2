// Empress Academy Types
// The progression system from Peasant to Empress

export type AcademyLevel =
  | 'peasant'
  | 'apprentice'
  | 'strategist'
  | 'manipulatrix'
  | 'empress';

export type SkillTreeId =
  | 'psychology'
  | 'communication'
  | 'emotional_armor'
  | 'influence'
  | 'strategy';

export interface LevelDefinition {
  id: AcademyLevel;
  name: string;
  title: string;
  description: string;
  minXp: number;
  maxXp: number;
  color: string;
  icon: string; // Lucide icon name
  perks: string[];
}

export interface Skill {
  id: string;
  treeId: SkillTreeId;
  name: string;
  description: string;
  icon: string;
  tier: 1 | 2 | 3 | 4 | 5; // Depth in tree
  xpCost: number;
  prerequisites: string[]; // Skill IDs
  effects: string[];
  tier_required: 'free' | 'premium' | 'vip';
}

export interface SkillTree {
  id: SkillTreeId;
  name: string;
  description: string;
  icon: string;
  color: string;
  skills: Skill[];
  tier_required: 'free' | 'premium' | 'vip';
}

export interface Quest {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  icon: string;
  category: 'foundation' | 'intermediate' | 'advanced' | 'mastery';
  xpReward: number;
  skillPointsReward: number;
  objectives: QuestObjective[];
  requirements: {
    minLevel?: AcademyLevel;
    completedQuests?: string[];
    unlockedSkills?: string[];
  };
  tier_required: 'free' | 'premium' | 'vip';
}

export interface QuestObjective {
  id: string;
  text: string;
  type: 'lesson' | 'practice' | 'reflection' | 'field_work';
  verificationMethod?: 'self_report' | 'streak' | 'quiz' | 'manual';
}

export interface DailyChallenge {
  id: string;
  title: string;
  description: string;
  icon: string;
  xpReward: number;
  category: 'mindset' | 'social' | 'observation' | 'practice';
  difficulty: 'easy' | 'medium' | 'hard';
  tier_required: 'free' | 'premium' | 'vip';
}

// Progress tracking
export interface UserAcademyProgress {
  currentLevel: AcademyLevel;
  totalXp: number;
  skillPoints: number;
  unlockedSkills: string[];
  completedQuests: string[];
  activeQuests: string[];
  questProgress: Record<string, QuestProgress>;
  dailyChallengesCompleted: string[]; // Today's completed challenges
  lastDailyChallengeDate: string;
  streakDays: number;
}

export interface QuestProgress {
  questId: string;
  startedAt: string;
  completedObjectives: string[];
  notes?: string;
}

export interface SkillUnlockResult {
  success: boolean;
  skill?: Skill;
  error?: string;
  newEffects?: string[];
}
