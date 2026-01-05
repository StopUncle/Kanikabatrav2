// Relationship Engine Types
// Core type definitions for the relationship/randomization system

// ============================================
// RELATIONSHIP TRACKING
// ============================================

/**
 * Visible stats - player can see these
 */
export interface VisibleRelationship {
  rapport: number;    // 0-100: How much they like you
  respect: number;    // 0-100: Do they take you seriously
}

/**
 * Hidden stats - player cannot see, creates drama
 */
export interface HiddenRelationship {
  trueLoyalty: number;  // 0-100: Would they betray you when stakes are high?
}

/**
 * Full relationship state for a character
 */
export interface RelationshipState {
  characterId: string;
  visible: VisibleRelationship;
  hidden: HiddenRelationship;
  // Foreshadowing events that have occurred
  foreshadowingTriggered: string[];
  // History of key interactions
  interactionHistory: InteractionRecord[];
}

/**
 * Record of a meaningful interaction
 */
export interface InteractionRecord {
  sceneId: string;
  choiceId: string;
  timestamp: number;
  rapportDelta: number;
  respectDelta: number;
  loyaltyDelta: number;
  // What happened - for post-betrayal teaching
  description: string;
}

// ============================================
// RELATIONSHIP THRESHOLDS
// ============================================

/**
 * Three-state threshold system
 * Not smooth curves - discrete behavioral states
 */
export type RelationshipTier = 'high' | 'medium' | 'low';

export const RELATIONSHIP_THRESHOLDS = {
  high: 70,    // 70+ = favorable
  medium: 30,  // 30-69 = neutral
  low: 0,      // 0-29 = hostile
} as const;

export function getRelationshipTier(value: number): RelationshipTier {
  if (value >= RELATIONSHIP_THRESHOLDS.high) return 'high';
  if (value >= RELATIONSHIP_THRESHOLDS.medium) return 'medium';
  return 'low';
}

// ============================================
// CHARACTER MOOD/STATE
// ============================================

/**
 * Emotional presentation states
 * Same character, different mask each playthrough
 */
export type EmotionalPresentation =
  | 'cold'          // Dismissive, subtle superiority
  | 'warm'          // Overly complimentary, love bombing
  | 'vulnerable'    // Stressed, apologetic, self-deprecating
  | 'neutral'       // Default, observing
  | 'aggressive'    // Confrontational, challenging
  | 'charming';     // Smooth, calculated charisma

/**
 * Character mood state - affects dialogue variations
 */
export interface CharacterMoodState {
  characterId: string;
  currentPresentation: EmotionalPresentation;
  // Stability: how likely mood is to shift
  stability: number; // 0-100
  // Triggers that would shift mood
  moodTriggers: MoodTrigger[];
}

export interface MoodTrigger {
  condition: string;  // e.g., 'rapport_drop_10', 'embarrassed_public'
  resultMood: EmotionalPresentation;
  probability: number; // 0-1
}

// ============================================
// CHARACTER ARCHETYPE
// ============================================

/**
 * Base character type + secondary traits
 * Characters are NOT single archetypes
 */
export type CharacterArchetype =
  | 'narcissist'
  | 'avoidant'
  | 'anxious'
  | 'secure'
  | 'manipulator'
  | 'genuine';

export type SecondaryTrait =
  | 'insecure'
  | 'smart'
  | 'vindictive'
  | 'loyal'
  | 'ambitious'
  | 'charismatic'
  | 'passive'
  | 'aggressive';

/**
 * Full character definition for relationship system
 */
export interface RelationshipCharacter {
  id: string;
  name: string;
  archetype: CharacterArchetype;
  secondaryTraits: SecondaryTrait[];
  // Connections to other characters
  relationships: CharacterConnection[];
  // Default emotional presentation options (randomized per playthrough)
  possiblePresentations: EmotionalPresentation[];
  // What makes them remember you (positive or negative)
  memoryTriggers: {
    positive: string[];  // e.g., 'helped_them', 'kept_secret'
    negative: string[];  // e.g., 'took_credit', 'embarrassed_public'
  };
}

export interface CharacterConnection {
  targetCharacterId: string;
  relationshipType: 'dating' | 'friend' | 'rival' | 'enemy' | 'acquaintance';
  // How actions with this character affect the connected one
  rippleEffect: number; // -1 to 1 multiplier
}

// ============================================
// SCENE VARIANTS
// ============================================

/**
 * Scene variant based on relationship state
 */
export interface SceneVariant {
  tier: RelationshipTier;
  dialogOverrides: DialogOverride[];
  choiceModifiers: ChoiceModifier[];
  // Additional foreshadowing to inject
  foreshadowing?: string;
}

export interface DialogOverride {
  originalLineIndex: number;
  variantText: string;
  variantEmotion?: string;
}

export interface ChoiceModifier {
  choiceId: string;
  // Make choice unavailable in this tier
  disabled?: boolean;
  // Modified feedback based on relationship
  feedbackOverride?: string;
  // Different consequences
  rapportDeltaOverride?: number;
  respectDeltaOverride?: number;
  loyaltyDeltaOverride?: number;
}

// ============================================
// BETRAYAL MECHANIC
// ============================================

/**
 * Betrayal configuration for a character
 */
export interface BetrayalConfig {
  characterId: string;
  // Loyalty threshold that triggers betrayal
  loyaltyThreshold: number; // Below this = betrayal
  // Scene where betrayal/warning occurs
  climaxSceneId: string;
  // What happens at low loyalty
  betrayalOutcome: {
    sceneId: string;
    description: string;
  };
  // What happens at high loyalty
  warningOutcome: {
    sceneId: string;
    description: string;
  };
  // Foreshadowing messages based on loyalty trends
  foreshadowingMessages: {
    dropping: string[];   // Loyalty decreasing
    rising: string[];     // Loyalty increasing
    critical: string[];   // Loyalty near threshold
  };
}

// ============================================
// STORY CONVERGENCE
// ============================================

/**
 * Key story beat that multiple paths converge to
 */
export interface ConvergencePoint {
  id: string;
  sceneId: string;
  // All paths must reach this point
  required: boolean;
  // Conditions that determine HOW you arrive
  entryConditions: EntryCondition[];
}

export interface EntryCondition {
  // Path identifier (e.g., 'manipulated_weak_guy', 'built_alliance')
  pathId: string;
  // Requirements to take this path
  requirements: {
    minRapport?: { characterId: string; value: number };
    maxRapport?: { characterId: string; value: number };
    flagsSet?: string[];
    flagsNotSet?: string[];
  };
  // Flavor text/consequences for this entry
  entryFlavor: string;
}

// ============================================
// GAME SESSION STATE
// ============================================

/**
 * Complete state for a playthrough
 */
export interface RelationshipGameState {
  sessionId: string;
  scenarioId: string;
  // All character relationships
  relationships: Map<string, RelationshipState>;
  // All character moods (randomized at session start)
  characterMoods: Map<string, CharacterMoodState>;
  // Story flags
  flags: Set<string>;
  // Current convergence progress
  convergenceProgress: Map<string, boolean>;
  // Randomization seed for this playthrough
  seed: number;
}
