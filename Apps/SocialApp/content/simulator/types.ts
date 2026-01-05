// Relationship Simulator Types
// Visual novel style branching scenarios for psychology education

import type { SilhouetteType } from '../../lib/silhouettes';
export type { SilhouetteType };

export type SubscriptionTier = 'free' | 'premium' | 'vip';
export type Difficulty = 'beginner' | 'intermediate' | 'advanced';
export type ScenarioCategory = 'narcissist' | 'avoidant' | 'gaslighter' | 'healthy' | 'professional' | 'dating-tactics';
export type EmotionType = 'neutral' | 'happy' | 'angry' | 'sad' | 'seductive' | 'cold' | 'confused' | 'smirking' | 'concerned' | 'knowing' | 'serious' | 'pleading' | 'curious' | 'hopeful';
export type OutcomeType = 'passed' | 'failed';
// Scene ending types - 'bad' maps to 'failed', all others map to 'passed'
export type SceneEndingType = 'bad' | 'neutral' | 'good' | 'excellent' | 'outstanding' | 'master';
export type TargetGender = 'female' | 'male';

/**
 * Mood types for ambient particles
 */
export type MoodType = 'romantic' | 'danger' | 'party' | 'cold' | 'peaceful' | 'tense' | 'mysterious' | 'professional';

/**
 * Immersion triggers for special moments
 */
export type ImmersionTrigger =
  | 'manipulation-detected'
  | 'red-flag-revealed'
  | 'cold-moment'
  | 'intimate-moment'
  | 'shock'
  | 'victory'
  | 'defeat';

export type Gender = 'male' | 'female' | 'non-binary';

/**
 * A character in the scenario
 */
export interface Character {
  id: string;
  name: string;
  description: string;
  traits: string[];
  defaultEmotion: EmotionType;
  gender?: Gender; // For clarity with unisex names
  // Immersion toolkit fields
  personalityType?: string; // Maps to character theme (e.g., 'competitor', 'authority', 'narcissist')
  silhouetteType?: SilhouetteType; // Body shape/hair style for visual differentiation
}

/**
 * A single line of dialog
 */
export interface DialogLine {
  text: string;
  speakerId?: string | null; // Character speaking, undefined/null = narrator
  emotion?: EmotionType;
  delay?: number; // ms pause after this line
}

/**
 * A choice the player can make
 */
export interface Choice {
  id: string;
  text: string;
  nextSceneId: string;
  xpBonus?: number; // Bonus XP for this choice
  isOptimal?: boolean; // Is this the "best" choice?
  tactic?: string; // Psychology tactic involved (for learning)
  feedback?: string; // Shown after choice is made
}

/**
 * Chapter metadata for progress tracking
 */
export interface ChapterInfo {
  name: string;    // Display name (e.g., "Week One", "Day 2")
  index: number;   // Current chapter (1-based)
  total: number;   // Total chapters
}

/**
 * A goal/objective for a scenario section
 * Displayed on-screen to guide player decisions
 */
export interface SceneGoal {
  id: string;
  text: string;           // Display text (e.g., "Establish alliance with sister")
  completedBySceneId?: string; // Scene ID where this goal is considered complete
}

/**
 * Goals organized by scenario section
 * Keys are section identifiers (e.g., "day1", "day2", "phase1")
 */
export interface SectionGoals {
  [sectionId: string]: SceneGoal[];
}

/**
 * A scene in the scenario
 */
export interface Scene {
  id: string;
  backgroundId?: string; // Background image identifier
  dialog: DialogLine[];
  choices?: Choice[]; // If undefined, auto-advance to nextSceneId
  nextSceneId?: string; // For scenes without choices
  isEnding?: boolean;
  outcomeType?: SceneEndingType; // For ending scenes ('bad' = failed, others = passed)
  endingTitle?: string; // Title for ending screen
  endingSummary?: string; // Summary for ending screen
  endingLearnReference?: string; // Course/lesson ID to recommend on failure
  endingLearnPrompt?: string; // Prompt text for learn section link
  chapter?: ChapterInfo; // Chapter/part progress for breadcrumb display
  // Immersion toolkit fields
  mood?: MoodType; // Ambient particle effect for this scene
  immersionTrigger?: ImmersionTrigger; // Trigger special effect on scene entry
  shakeOnEntry?: 'shock' | 'threat' | 'revelation'; // Screen shake preset on entry
}

/**
 * A complete scenario
 */
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
  badgeId?: string; // Badge earned on good outcome
  targetGender?: TargetGender; // Who scenario is designed for (defaults to 'female')

  characters: Character[];
  scenes: Scene[];
  startSceneId: string;

  // Progression
  prerequisites?: string[]; // Scenario IDs that must be completed first (need 3+ of these)

  // Learning objectives
  tacticsLearned: string[];
  redFlagsTaught: string[];

  // Template system for dynamic wording
  templates?: TemplatePool;

  // Section-based goals for tracking progress
  sectionGoals?: SectionGoals;
}

/**
 * Player's progress in a scenario
 */
export interface ScenarioProgress {
  scenarioId: string;
  currentSceneId: string;
  choicesMade: ChoiceRecord[];
  startedAt: string;
  completedAt?: string;
  outcome?: OutcomeType;
  xpEarned: number;
  resolvedTemplates?: ResolvedTemplates; // Template values for this session
}

/**
 * Record of a choice made
 */
export interface ChoiceRecord {
  sceneId: string;
  choiceId: string;
  wasOptimal: boolean;
  timestamp: string;
}

/**
 * Outcome analysis after completing a scenario
 * Binary pass/fail based on ending scene type (no accuracy tracking)
 */
export interface OutcomeAnalysis {
  outcome: OutcomeType;
  xpEarned: number;
  badgeEarned?: string;
  cardEarned?: string; // Psychology card earned (id)
  avatarRewardEarned?: string; // Avatar frame or character earned (id)
  lessonsLearned: string[];
  endingTitle?: string; // From the ending scene
  endingSummary?: string; // From the ending scene
}

/**
 * Background images available
 */
export const BACKGROUNDS = {
  'coffee-shop': 'A cozy coffee shop with warm lighting',
  'restaurant': 'An upscale restaurant at night',
  'apartment': 'A modern apartment living room',
  'park': 'A sunny park with trees',
  'office': 'A corporate office environment',
  'bar': 'A dimly lit cocktail bar',
  'text-screen': 'Phone screen showing text messages',
  // University backgrounds
  'dorm-room': 'A college dorm room with twin beds and desks',
  'party': 'A crowded house party with dim lighting and music',
  'study-hall': 'A quiet university study hall with wooden tables',
  'campus-quad': 'An open campus quad with students walking',
  'hallway': 'A university hallway with lockers',
  'common-room': 'A dorm common room with couches and a TV',
} as const;

export type BackgroundId = keyof typeof BACKGROUNDS;

/**
 * Template pools for dynamic wording
 * Each key maps to an array of possible values
 * Values are selected randomly at scenario start and used consistently throughout
 */
export interface TemplatePool {
  [key: string]: string[];
}

/**
 * Resolved template values for a scenario session
 * Created by picking one value from each pool at scenario start
 */
export interface ResolvedTemplates {
  [key: string]: string;
}

// ============================================
// NEW: Tactic-Based UI Component Types
// ============================================

/**
 * Available tactics for the 2x2 choice grid
 */
export type TacticType =
  | 'strategic-empathy'
  | 'cold-withdrawal'
  | 'feigned-confusion'
  | 'deflect-flip';

/**
 * Threat level for character assessment
 */
export type ThreatLevel = 'low' | 'medium' | 'high';

/**
 * Current power dynamic state
 */
export type DynamicState = 'chasing' | 'balanced' | 'being-chased';

/**
 * Inner voice emotion variants
 */
export type InnerVoiceEmotion = 'neutral' | 'warning' | 'insight' | 'cold';

/**
 * Manipulation severity levels
 */
export type ManipulationSeverity = 'subtle' | 'moderate' | 'severe';

/**
 * Scene transition types
 */
export type TransitionType = 'time-skip' | 'location-change' | 'act-break';

/**
 * Intelligence briefing for "Your Read" panel
 * Shows player's analysis of the NPC
 */
export interface YourRead {
  personalityType: string;  // e.g., "Covert Narcissist (The Victim)"
  currentMove: string;      // e.g., "Guilt bait + cancellation test"
  theirGoal: string;        // e.g., "Extract reassurance"
  weakness: string;         // e.g., "Can't function without sympathy"
}

/**
 * Tactic choice for the 2x2 grid
 * Player selects tactic, then watches execution
 */
export interface TacticChoice {
  id: string;
  tactic: TacticType;
  label: string;           // Short label (e.g., "Mirror & redirect")
  description: string;     // When to use hint (e.g., "Use when they need sympathy supply")
  execution: string;       // What you actually say/do
  innerVoice: string;      // Your thought after execution
  feedback: string;        // Consequence explanation
  controlDelta: number;    // Power shift (+20 or -10 etc)
  nextSceneId: string;
  isOptimal?: boolean;
  xpBonus?: number;
}

/**
 * Character profile for CharacterCard component
 */
export interface CharacterProfile {
  id: string;
  name: string;
  age?: number;
  personalityType: string;  // e.g., "Covert Narcissist", "Dismissive Avoidant"
  threatLevel: ThreatLevel;
  weakness: string;
  avatarUrl?: string;
}

/**
 * Detected manipulation for alert display
 */
export interface DetectedManipulation {
  tacticName: string;       // e.g., "GUILT TRIP"
  description: string;      // e.g., "Making you feel bad for having boundaries"
  severity: ManipulationSeverity;
}

/**
 * Pattern recognition achievement
 */
export interface PatternRecognition {
  patternName: string;      // e.g., "GUILT EXTRACTION"
  description: string;      // What the pattern means
  xpReward: number;
}

/**
 * Tactic display info for TacticGrid
 */
export const TACTIC_INFO: Record<TacticType, {
  name: string;
  shortLabel: string;
  description: string;
  color: string;
}> = {
  'strategic-empathy': {
    name: 'Strategic Empathy',
    shortLabel: 'Mirror & redirect',
    description: 'Use when they need sympathy supply. Control without absorbing.',
    color: '#4CAF50',
  },
  'cold-withdrawal': {
    name: 'Cold Withdrawal',
    shortLabel: 'Deny the supply',
    description: 'Use when testing boundaries. Become boring. Gray rock.',
    color: '#607D8B',
  },
  'feigned-confusion': {
    name: 'Feigned Confusion',
    shortLabel: 'Play dumb, gather',
    description: 'Use for guilt trips. Make them spell it out explicitly.',
    color: '#FFB020',
  },
  'deflect-flip': {
    name: 'Deflect & Flip',
    shortLabel: 'Turn their frame',
    description: 'Use when framed as problem. Redirect back to them.',
    color: '#E91E63',
  },
};

// ============================================
// NEW: Fork-Based Branching System
// Actions (path choices) vs Dialogue (performance)
// ============================================

/**
 * Scene types for the fork-based system
 * - action: Branch point where player chooses a PATH (2-3 choices max)
 * - dialogue: Performance scene where player's choices affect score
 * - ending: Terminal scene with outcome
 */
export type SceneType = 'action' | 'dialogue' | 'ending';

/**
 * Difficulty level for a path
 * Affects NPC behavior and scoring thresholds
 */
export type PathDifficulty = 'easy' | 'medium' | 'hard';

/**
 * An action choice that leads to a different path/branch
 * These are DIRECTIONAL choices - no wrong answer, just different encounters
 */
export interface ActionChoice {
  id: string;
  text: string;              // "Go to Morgan's party"
  subtext?: string;          // "Everyone who matters will be there"
  nextSceneId: string;       // Scene ID this choice leads to
  difficulty: PathDifficulty; // How hard this path will be
  pathId?: string;           // Identifier for this path (e.g., 'party', 'study-hall')
  unlockCondition?: string;  // For secret paths - condition that must be met
  isLocked?: boolean;        // If true, show but don't allow selection
  lockedReason?: string;     // Why it's locked (e.g., "Requires prior intel")
}

/**
 * NPC reaction to player's dialogue choice
 * Replaces "optimal/trap" labels with observable behavior
 */
export interface NPCReaction {
  text: string;              // What the NPC says in response
  emotion: EmotionType;      // Their emotional state
  bodyLanguage?: string;     // Description of non-verbal cues
  // Hidden scoring (player doesn't see these)
  scoreImpact: number;       // How this affects cumulative score (+15, -10, etc.)
  relationshipImpact?: number; // How this affects relationship with this NPC
}

/**
 * A dialogue choice with NPC reaction instead of explicit feedback
 * Player must INTERPRET the reaction to know if they succeeded
 */
export interface DialogueChoice {
  id: string;
  text: string;              // What player says/does
  reaction: NPCReaction;     // How NPC responds (replaces feedback)
  nextSceneId: string;       // Next scene
  // Hidden - player doesn't see these, used internally
  isOptimal?: boolean;       // For analytics only
  tactic?: string;           // For learning tracking

  // ===== NPC Behavior Engine Fields =====
  /** What this choice claims (e.g., 'no-agenda', 'not-interested', 'promised-loyalty') */
  claimType?: string;
  /** Claim types this choice contradicts - triggers lie detection */
  contradicts?: string[];
  /** Impact on NPC obsession level (-10 to +30) */
  obsessionImpact?: number;
  /** If true, can cause NPC mask to slip */
  triggersMaskSlip?: boolean;
  /** If true, triggers love-bombing response from susceptible NPCs */
  triggersLoveBomb?: boolean;
  /** Interaction type for NPC memory tracking */
  interactionType?: 'validation' | 'rejection' | 'boundary' | 'supply' | 'neutral';
}

/**
 * Extended Scene interface with fork system support
 * Backward compatible - existing scenes still work
 */
export interface ForkScene extends Omit<Scene, 'choices'> {
  // Scene type determines rendering and behavior
  sceneType?: SceneType;     // Defaults to 'dialogue' for backward compat

  // For action scenes (branch points)
  actionChoices?: ActionChoice[];

  // For dialogue scenes (performance-based)
  dialogueChoices?: DialogueChoice[];

  // Legacy support - old Choice[] still works
  choices?: Choice[];

  // Path tracking
  pathId?: string;           // Which path this scene belongs to
}

/**
 * Player's progress through a fork-based scenario
 */
export interface ForkProgress {
  scenarioId: string;
  currentSceneId: string;
  currentPath: string;       // 'party' | 'study-hall' | 'secret' etc.
  dialogueScore: number;     // Cumulative performance score
  npcRelationships: Record<string, number>; // Character ID -> relationship value
  pathHistory: string[];     // Record of paths taken (for multi-fork scenarios)
  choicesMade: DialogueChoiceRecord[];
  startedAt: string;
  completedAt?: string;
  rewardObtained?: boolean;
  outcome?: OutcomeType;
}

/**
 * Record of a dialogue choice for analytics
 */
export interface DialogueChoiceRecord {
  sceneId: string;
  choiceId: string;
  scoreImpact: number;
  timestamp: string;
}

/**
 * Scenario with fork system support
 */
export interface ForkScenario extends Omit<Scenario, 'scenes'> {
  scenes: ForkScene[];

  // Fork-specific metadata (optional for simple mission scenarios)
  availablePaths?: PathInfo[];

  // Reward for completing the scenario
  reward?: ScenarioReward;
}

/**
 * Information about a path in a scenario
 */
export interface PathInfo {
  id: string;                // 'party' | 'study-hall' | 'secret'
  name: string;              // Display name
  difficulty: PathDifficulty;
  targetNpc: string;         // Character ID of main NPC on this path
  description?: string;      // Brief description
  isSecret?: boolean;        // If true, not shown until unlocked
}

/**
 * Reward for completing a scenario
 */
export interface ScenarioReward {
  id: string;                // e.g., 'gala-ticket'
  name: string;              // Display name
  description: string;       // What it unlocks
  unlocksScenarioId?: string; // If this unlocks another scenario
}
