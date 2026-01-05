// Dating Simulator Types - Progressive Level System
import type {
  Scene,
  Character,
  SubscriptionTier,
  Difficulty,
  TacticType,
  TacticChoice,
  YourRead,
  CharacterProfile,
} from '../../types';

// Stats tracked throughout the game
export interface PlayerStats {
  power: number;      // Status + Control (0-100)
  mask: number;       // Charm + Manipulation (0-100)
  vision: number;     // Observation + Intelligence (0-100)
}

// Level definitions
export type LevelId =
  | 'university'
  | 'social-scene'
  | 'gala'
  | 'escalation'
  | 'private-island';

export interface Level {
  id: LevelId;
  name: string;
  description: string;
  unlockCondition: string;
  missions: Mission[];
  secretMission?: Mission;
}

// Mission within a level
export interface Mission {
  id: string;
  number: number;
  title: string;
  objective: string;
  scenes: Scene[];
  rewards: MissionRewards;
  unlockCondition?: string;
  isSecret?: boolean;
}

// Rewards for completing a mission
export interface MissionRewards {
  power: number;
  mask: number;
  vision: number;
  unlocks?: string;  // What completing this mission unlocks
}

// Choice outcome types for the 4-choice system
export type ChoiceType = 'optimal' | 'close' | 'subtle' | 'trap';

// Extended choice with dating-specific fields
export interface DatingChoice {
  id: string;
  text: string;
  type: ChoiceType;
  nextSceneId: string;
  feedback: string;
  statChanges?: Partial<PlayerStats>;
  isOptimal?: boolean;
  xpBonus?: number;
}

// Dating scenario extends base scenario
export interface DatingScenario {
  id: string;
  levelId: LevelId;
  missionNumber: number;
  title: string;
  tagline: string;
  description: string;
  objective: string;
  tier: SubscriptionTier;
  estimatedMinutes: number;
  difficulty: Difficulty;
  characters: Character[];
  scenes: Scene[];
  rewards: MissionRewards;
  startSceneId: string;
  isSecret?: boolean;
  secretUnlockCondition?: string;
}

// Progress tracking
export interface LevelProgress {
  levelId: LevelId;
  missionsCompleted: string[];
  secretUnlocked: boolean;
  bestStats: PlayerStats;
}

export interface GameProgress {
  currentLevel: LevelId;
  levels: Record<LevelId, LevelProgress>;
  totalStats: PlayerStats;
  endingsUnlocked: string[];
}

// ============================================
// TACTIC-BASED SCENE SYSTEM
// ============================================

/**
 * Extended scene for tactic-based UI
 * Adds YourRead panel, character profiles, and tactic choices
 */
export interface TacticScene extends Omit<Scene, 'choices'> {
  // Flag to use tactic-based UI
  useTacticUI: true;

  // "Your Read" panel - intelligence on the NPC
  yourRead?: YourRead;

  // Active character profile for this scene
  activeCharacterId?: string;

  // Control score at start of scene (-100 to +100)
  controlScore?: number;

  // Tactic choices (replaces standard choices)
  tacticChoices?: TacticChoice[];

  // Standard choices still available for hybrid scenes
  choices?: never; // Explicitly disallow mixing
}

/**
 * Union type for scenes - can be standard or tactic-based
 */
export type AnyScene = Scene | TacticScene;

/**
 * Helper to check if scene uses tactic UI
 */
export function isTacticScene(scene: AnyScene): scene is TacticScene {
  return 'useTacticUI' in scene && scene.useTacticUI === true;
}

/**
 * Extended dating scenario with tactic support
 */
export interface TacticDatingScenario extends Omit<DatingScenario, 'scenes'> {
  // Can contain mixed scene types
  scenes: AnyScene[];

  // Character profiles for tactic UI
  characterProfiles?: Record<string, CharacterProfile>;

  // Initial control score
  initialControlScore?: number;
}
