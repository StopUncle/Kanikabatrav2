/**
 * Simulator types — ported from SocialApp/content/simulator/types.ts,
 * trimmed to what the web runtime actually needs. Keeps the same shape
 * so scenario .ts files can be copy-pasted without edits.
 */

export type SubscriptionTier = "free" | "premium" | "vip";
export type Difficulty = "beginner" | "intermediate" | "advanced";
export type ScenarioCategory =
  | "narcissist"
  | "avoidant"
  | "gaslighter"
  | "healthy"
  | "professional"
  | "dating-tactics"
  | "social-dynamics";

export type EmotionType =
  | "neutral"
  | "happy"
  | "angry"
  | "sad"
  | "seductive"
  | "cold"
  | "confused"
  | "smirking"
  | "concerned"
  | "knowing"
  | "serious"
  | "pleading"
  | "curious"
  | "hopeful";

export type MoodType =
  | "romantic"
  | "danger"
  | "party"
  | "cold"
  | "peaceful"
  | "tense"
  | "mysterious"
  | "professional";

export type OutcomeType = "good" | "neutral" | "bad" | "passed" | "failed";
export type Gender = "male" | "female" | "non-binary";

export interface Character {
  id: string;
  name: string;
  description: string;
  traits: string[];
  defaultEmotion: EmotionType;
  gender?: Gender;
  personalityType?: string;
  silhouetteType?: string;
  /** Optional portrait image path — set when AI-generated portraits ship. */
  portraitUrl?: string;
}

export interface DialogLine {
  text: string;
  speakerId?: string | null;
  emotion?: EmotionType;
  delay?: number;
}

export interface Choice {
  id: string;
  text: string;
  nextSceneId: string;
  xpBonus?: number;
  isOptimal?: boolean;
  tactic?: string;
  feedback?: string;
}

export interface Scene {
  id: string;
  backgroundId?: string;
  mood?: MoodType;
  dialog: DialogLine[];
  choices?: Choice[];
  nextSceneId?: string;
  // Ending fields
  isEnding?: boolean;
  outcomeType?: OutcomeType;
  endingTitle?: string;
  endingSummary?: string;
  endingLearnReference?: string;
  endingLearnPrompt?: string;
}

/** Alias — scenario files from the Expo port use `ForkScene`. */
export type ForkScene = Scene;

export interface ScenarioReward {
  id: string;
  name: string;
  description: string;
  unlocksScenarioId?: string;
}

export interface Scenario {
  id: string;
  title: string;
  tagline: string;
  description: string;
  tier: SubscriptionTier;
  estimatedMinutes: number;
  difficulty: Difficulty;
  category: ScenarioCategory;
  xpReward: number;
  badgeId?: string;
  startSceneId: string;

  characters: Character[];
  scenes: Scene[];

  prerequisites?: string[];
  tacticsLearned: string[];
  redFlagsTaught: string[];
  reward?: ScenarioReward;
}

/** A player's choice recorded in a run. */
export interface ChoiceRecord {
  sceneId: string;
  choiceId: string;
  wasOptimal: boolean;
  timestamp: string;
}

/** Runtime state machine state. */
export interface SimulatorState {
  scenarioId: string;
  currentSceneId: string;
  choicesMade: ChoiceRecord[];
  outcome?: OutcomeType;
  endedAt?: string;
  xpEarned: number;
}
