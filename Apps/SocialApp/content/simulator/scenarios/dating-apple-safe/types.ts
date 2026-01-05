// Dating Simulator Types - Progressive Level System (Apple-Safe Version)
// Identical to original - no terminology issues in type definitions
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
  power: number;      // Status + Confidence (0-100)
  mask: number;       // Social Skills + Awareness (0-100)
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
  unlocks?: string;
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

export interface TacticScene extends Omit<Scene, 'choices'> {
  useTacticUI: true;
  yourRead?: YourRead;
  activeCharacterId?: string;
  controlScore?: number;
  tacticChoices?: TacticChoice[];
  choices?: never;
}

export type AnyScene = Scene | TacticScene;

export function isTacticScene(scene: AnyScene): scene is TacticScene {
  return 'useTacticUI' in scene && scene.useTacticUI === true;
}

export interface TacticDatingScenario extends Omit<DatingScenario, 'scenes'> {
  scenes: AnyScene[];
  characterProfiles?: Record<string, CharacterProfile>;
  initialControlScore?: number;
}
