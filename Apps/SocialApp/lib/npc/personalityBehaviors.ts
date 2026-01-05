/**
 * Personality Behavior Definitions
 * Defines WHAT each personality type DOES - their behavioral patterns,
 * lying tendencies, obsession triggers, and mask slip conditions.
 */

import type { PersonalityCategory } from '../immersion/characterThemes';
import type { EmotionType } from '../../content/simulator/types';

// ============================================
// TYPES
// ============================================

/**
 * Types of lies NPCs can tell
 */
export type LieType =
  | 'self-aggrandizement'     // Exaggerating own achievements
  | 'triangulation'           // Lying about what others said/did
  | 'history-revision'        // Changing past events
  | 'intention-hiding'        // Lying about motives
  | 'feeling-denial'          // "I'm fine" when not
  | 'false-promise'           // Promises they won't keep
  | 'gaslighting'             // "That never happened"
  | 'victim-playing'          // False victimhood
  | 'flattery'                // Insincere compliments
  | 'minimization';           // Downplaying their actions

/**
 * Relationship phases (especially relevant for NPD/BPD)
 */
export type RelationshipPhase =
  | 'assessment'      // Initial evaluation
  | 'idealization'    // Love-bombing phase
  | 'devaluation'     // Mask slipping, putting down
  | 'discard'         // Cold, dismissive
  | 'hoover'          // Trying to pull back in
  | 'stable';         // For healthy types

/**
 * Functioning level (hidden from player)
 */
export type FunctioningLevel = 'high' | 'low';

/**
 * Obsession behaviors when threshold is met
 */
export type ObsessionBehavior =
  | 'possessive-language'     // "You're mine"
  | 'tracking'                // Mentions knowing where player was
  | 'jealousy-probing'        // Asks about other people
  | 'future-faking'           // Makes big promises
  | 'isolation-attempts'      // Tries to separate from others
  | 'intensity-escalation'    // Emotions become extreme
  | 'abandonment-panic'       // BPD-specific fear response
  | 'predatory-focus';        // ASPD calculating focus

/**
 * What triggers mask to slip
 */
export type MaskSlipTrigger =
  | 'narcissistic-injury'     // Ego wounded
  | 'supply-withdrawal'       // Attention cut off
  | 'boundary-setting'        // Player sets firm boundary
  | 'caught-lying'            // Player calls out a lie
  | 'rejection'               // Direct rejection
  | 'abandonment-cue'         // Signs player might leave
  | 'public-humiliation'      // Embarrassed in front of others
  | 'control-loss';           // Losing grip on situation

/**
 * Complete personality behavior definition
 */
export interface PersonalityBehavior {
  id: PersonalityCategory;
  displayName: string;

  // Deception tendencies
  lieProbability: number;           // 0-1, baseline chance of lying
  lieTypes: LieType[];              // What types of lies they tell
  lieSkill: number;                 // 0-1, how convincing (high functioning = high skill)

  // Love-bombing / idealization
  loveBombingEnabled: boolean;
  loveBombingPhrases: string[];     // Example phrases they might add
  loveBombingDuration: number;      // How many interactions before shifting

  // Devaluation
  devaluationTriggers: MaskSlipTrigger[];
  devaluationPhrases: string[];     // Subtle put-downs they might add

  // Obsession mechanics
  obsessionEnabled: boolean;
  obsessionThreshold: number;       // 0-100, when they become obsessed
  obsessionBehaviors: ObsessionBehavior[];

  // Mask / functioning
  functioningLevel: FunctioningLevel;
  maskSlipTriggers: MaskSlipTrigger[];
  maskSlipPhrases: string[];        // What they say when mask slips
  recoverySpeed: number;            // 0-1, how fast they regain composure

  // Social dynamics
  triangulationEnabled: boolean;
  publicVsPrivateBehavior: 'same' | 'different';

  // Emotion modifiers
  defaultEmotionOverride?: EmotionType;
  emotionVolatility: number;        // 0-1, how quickly emotions shift
}

// ============================================
// BEHAVIOR DEFINITIONS
// ============================================

export const PERSONALITY_BEHAVIORS: Partial<Record<PersonalityCategory, PersonalityBehavior>> = {
  // ============================================
  // CLUSTER B - DRAMATIC/ERRATIC
  // ============================================

  narcissist: {
    id: 'narcissist',
    displayName: 'Narcissistic (NPD)',

    // High probability of lies, especially self-aggrandizing
    lieProbability: 0.7,
    lieTypes: ['self-aggrandizement', 'triangulation', 'history-revision', 'victim-playing'],
    lieSkill: 0.8,  // High functioning default

    // Strong love-bombing phase
    loveBombingEnabled: true,
    loveBombingPhrases: [
      "You're not like the others.",
      "I've never felt this connection before.",
      "You really understand me.",
      "Most people are so boring. But you...",
      "I knew you were special the moment I saw you.",
    ],
    loveBombingDuration: 5,  // First 5 interactions

    // Devaluation when supply threatened
    devaluationTriggers: ['narcissistic-injury', 'supply-withdrawal', 'boundary-setting', 'public-humiliation'],
    devaluationPhrases: [
      "I thought you were different. Guess I was wrong.",
      "You wouldn't understand. Not everyone can.",
      "That's cute that you think that.",
      "I have people lining up. Remember that.",
      "Maybe you're not ready for someone like me.",
    ],

    // Obsession when supply cut
    obsessionEnabled: true,
    obsessionThreshold: 60,
    obsessionBehaviors: ['possessive-language', 'jealousy-probing', 'future-faking', 'isolation-attempts'],

    // High functioning - mask stays on
    functioningLevel: 'high',
    maskSlipTriggers: ['narcissistic-injury', 'public-humiliation', 'caught-lying'],
    maskSlipPhrases: [
      "Do you have any idea who I am?",
      "You'll regret that.",
      "Everyone will know what you did.",
      "I made you. I can unmake you.",
    ],
    recoverySpeed: 0.7,

    triangulationEnabled: true,
    publicVsPrivateBehavior: 'different',
    emotionVolatility: 0.4,
  },

  borderline: {
    id: 'borderline',
    displayName: 'Borderline (BPD)',

    // Lies often about feelings and needs
    lieProbability: 0.5,
    lieTypes: ['feeling-denial', 'history-revision', 'victim-playing', 'minimization'],
    lieSkill: 0.4,  // Often obvious

    // Intense idealization
    loveBombingEnabled: true,
    loveBombingPhrases: [
      "I've never felt this way about anyone.",
      "Please don't leave me.",
      "You're the only one who understands.",
      "I need you. I can't do this without you.",
      "Promise me you won't abandon me like everyone else.",
    ],
    loveBombingDuration: 3,  // Shifts faster

    // Quick to devalue
    devaluationTriggers: ['abandonment-cue', 'rejection', 'boundary-setting'],
    devaluationPhrases: [
      "I knew you'd leave eventually. They all do.",
      "You're just like everyone else.",
      "Fine. I don't need you anyway.",
      "I was stupid to trust you.",
      "You never really cared.",
    ],

    // Abandonment-triggered obsession
    obsessionEnabled: true,
    obsessionThreshold: 40,  // Lower threshold
    obsessionBehaviors: ['abandonment-panic', 'intensity-escalation', 'possessive-language', 'tracking'],

    // Lower functioning - volatile
    functioningLevel: 'low',
    maskSlipTriggers: ['abandonment-cue', 'rejection', 'control-loss'],
    maskSlipPhrases: [
      "You're leaving me, aren't you?",
      "I'll do anything. Please.",
      "If you go, I don't know what I'll do.",
      "You're the only good thing in my life.",
    ],
    recoverySpeed: 0.3,

    triangulationEnabled: false,
    publicVsPrivateBehavior: 'same',
    emotionVolatility: 0.9,  // Very volatile
  },

  psychopath: {
    id: 'psychopath',
    displayName: 'Psychopathic (ASPD-1)',

    // Lies constantly and skillfully
    lieProbability: 0.9,
    lieTypes: ['intention-hiding', 'history-revision', 'flattery', 'false-promise', 'gaslighting'],
    lieSkill: 0.95,  // Extremely convincing

    // Calculated charm phase
    loveBombingEnabled: true,
    loveBombingPhrases: [
      "You're fascinating. I want to know everything about you.",
      "I see something in you that others miss.",
      "We could do great things together.",
      "You remind me of myself in some ways.",
    ],
    loveBombingDuration: 10,  // Longer game

    // Cold when useful extraction done
    devaluationTriggers: ['caught-lying', 'control-loss'],
    devaluationPhrases: [
      "You served your purpose.",
      "Don't take it personally. It's just business.",
      "You were useful. For a time.",
    ],

    // Predatory obsession
    obsessionEnabled: true,
    obsessionThreshold: 70,  // Takes more
    obsessionBehaviors: ['predatory-focus', 'tracking', 'isolation-attempts'],

    // Very high functioning
    functioningLevel: 'high',
    maskSlipTriggers: ['control-loss'],  // Only loses control when cornered
    maskSlipPhrases: [
      "You have no idea what I'm capable of.",
      "This was a mistake. Yours.",
    ],
    recoverySpeed: 0.95,

    triangulationEnabled: true,
    publicVsPrivateBehavior: 'different',
    emotionVolatility: 0.1,  // Very controlled
    defaultEmotionOverride: 'neutral',
  },

  sociopath: {
    id: 'sociopath',
    displayName: 'Sociopathic (ASPD-2)',

    // Lies frequently but less skillfully
    lieProbability: 0.8,
    lieTypes: ['intention-hiding', 'history-revision', 'victim-playing', 'minimization'],
    lieSkill: 0.5,  // More impulsive, less polished

    // Brief charm
    loveBombingEnabled: true,
    loveBombingPhrases: [
      "You get it. Not many people do.",
      "We could have fun together.",
      "I like you. That's rare for me.",
    ],
    loveBombingDuration: 2,

    // Quick to anger
    devaluationTriggers: ['boundary-setting', 'rejection', 'caught-lying', 'control-loss'],
    devaluationPhrases: [
      "Don't tell me what to do.",
      "You think you're better than me?",
      "Watch yourself.",
    ],

    // Impulsive obsession
    obsessionEnabled: true,
    obsessionThreshold: 50,
    obsessionBehaviors: ['predatory-focus', 'intensity-escalation', 'possessive-language'],

    // Low functioning - poor impulse control
    functioningLevel: 'low',
    maskSlipTriggers: ['boundary-setting', 'rejection', 'caught-lying'],
    maskSlipPhrases: [
      "You don't want to make me angry.",
      "I warned you.",
      "This isn't over.",
    ],
    recoverySpeed: 0.3,

    triangulationEnabled: false,
    publicVsPrivateBehavior: 'same',
    emotionVolatility: 0.7,
  },

  histrionic: {
    id: 'histrionic',
    displayName: 'Histrionic (HPD)',

    // Exaggerates and dramatizes
    lieProbability: 0.4,
    lieTypes: ['self-aggrandizement', 'victim-playing', 'flattery'],
    lieSkill: 0.6,

    loveBombingEnabled: true,
    loveBombingPhrases: [
      "Oh my god, you're amazing!",
      "I've never met anyone like you!",
      "We have SO much in common!",
      "You're literally the best person here.",
    ],
    loveBombingDuration: 3,

    devaluationTriggers: ['supply-withdrawal'],
    devaluationPhrases: [
      "Fine, I'll find someone who appreciates me.",
      "You're so boring.",
      "I thought you were fun.",
    ],

    obsessionEnabled: false,  // Moves on quickly
    obsessionThreshold: 100,
    obsessionBehaviors: [],

    functioningLevel: 'low',  // Obvious
    maskSlipTriggers: ['supply-withdrawal'],
    maskSlipPhrases: [
      "Why isn't anyone paying attention to me?",
      "This is the worst night ever!",
    ],
    recoverySpeed: 0.8,

    triangulationEnabled: false,
    publicVsPrivateBehavior: 'same',
    emotionVolatility: 0.8,
  },

  // ============================================
  // CLUSTER C - ANXIOUS/FEARFUL
  // ============================================

  avoidant: {
    id: 'avoidant',
    displayName: 'Avoidant (AvPD)',

    // Lies about feelings
    lieProbability: 0.3,
    lieTypes: ['feeling-denial', 'minimization'],
    lieSkill: 0.3,

    // Intermittent warmth
    loveBombingEnabled: false,
    loveBombingPhrases: [],
    loveBombingDuration: 0,

    devaluationTriggers: [],
    devaluationPhrases: [
      "I need some space.",
      "This is moving too fast.",
      "I'm not sure I can do this.",
    ],

    obsessionEnabled: false,
    obsessionThreshold: 100,
    obsessionBehaviors: [],

    functioningLevel: 'high',  // Controlled withdrawal
    maskSlipTriggers: ['control-loss'],
    maskSlipPhrases: [
      "I can't do this.",
      "Just leave me alone.",
    ],
    recoverySpeed: 0.4,

    triangulationEnabled: false,
    publicVsPrivateBehavior: 'same',
    emotionVolatility: 0.2,
  },

  dependent: {
    id: 'dependent',
    displayName: 'Dependent (DPD)',

    // Lies to maintain attachment
    lieProbability: 0.4,
    lieTypes: ['feeling-denial', 'flattery'],
    lieSkill: 0.3,

    loveBombingEnabled: true,
    loveBombingPhrases: [
      "You're so smart. I wish I could be like you.",
      "I don't know what I'd do without you.",
      "You always know what to do.",
    ],
    loveBombingDuration: 20,  // Constant

    devaluationTriggers: [],
    devaluationPhrases: [],

    // Clings when threatened
    obsessionEnabled: true,
    obsessionThreshold: 30,  // Very low
    obsessionBehaviors: ['abandonment-panic', 'intensity-escalation'],

    functioningLevel: 'low',
    maskSlipTriggers: ['abandonment-cue'],
    maskSlipPhrases: [
      "Please don't leave me.",
      "I'll do anything you want.",
      "I need you.",
    ],
    recoverySpeed: 0.5,

    triangulationEnabled: false,
    publicVsPrivateBehavior: 'same',
    emotionVolatility: 0.6,
  },

  // ============================================
  // ATTACHMENT STYLES
  // ============================================

  'anxious-attached': {
    id: 'anxious-attached',
    displayName: 'Anxious Attachment',

    // Mostly honest but overshares
    lieProbability: 0.1,
    lieTypes: ['feeling-denial'],
    lieSkill: 0.2,

    loveBombingEnabled: false,
    loveBombingPhrases: [],
    loveBombingDuration: 0,

    devaluationTriggers: [],
    devaluationPhrases: [],

    // Fixates on attention
    obsessionEnabled: true,
    obsessionThreshold: 35,
    obsessionBehaviors: ['abandonment-panic', 'intensity-escalation'],

    functioningLevel: 'high',
    maskSlipTriggers: ['abandonment-cue', 'rejection'],
    maskSlipPhrases: [
      "Did I do something wrong?",
      "You seem distant. Is everything okay?",
      "I was just worried about you.",
    ],
    recoverySpeed: 0.6,

    triangulationEnabled: false,
    publicVsPrivateBehavior: 'same',
    emotionVolatility: 0.5,
  },

  'dismissive-avoidant': {
    id: 'dismissive-avoidant',
    displayName: 'Dismissive Avoidant',

    // Denies feelings constantly
    lieProbability: 0.5,
    lieTypes: ['feeling-denial', 'minimization'],
    lieSkill: 0.7,

    loveBombingEnabled: false,
    loveBombingPhrases: [],
    loveBombingDuration: 0,

    devaluationTriggers: ['control-loss'],
    devaluationPhrases: [
      "I don't need anyone.",
      "This isn't a big deal.",
      "You're being dramatic.",
    ],

    obsessionEnabled: false,
    obsessionThreshold: 100,
    obsessionBehaviors: [],

    functioningLevel: 'high',
    maskSlipTriggers: [],  // Rarely slips
    maskSlipPhrases: [],
    recoverySpeed: 0.9,

    triangulationEnabled: false,
    publicVsPrivateBehavior: 'same',
    emotionVolatility: 0.1,
    defaultEmotionOverride: 'neutral',
  },

  // ============================================
  // HEALTHY / NEUTRAL
  // ============================================

  healthy: {
    id: 'healthy',
    displayName: 'Healthy',

    lieProbability: 0.05,  // Rarely lies
    lieTypes: [],
    lieSkill: 0,

    loveBombingEnabled: false,
    loveBombingPhrases: [],
    loveBombingDuration: 0,

    devaluationTriggers: [],
    devaluationPhrases: [],

    obsessionEnabled: false,
    obsessionThreshold: 100,
    obsessionBehaviors: [],

    functioningLevel: 'high',
    maskSlipTriggers: [],
    maskSlipPhrases: [],
    recoverySpeed: 1.0,

    triangulationEnabled: false,
    publicVsPrivateBehavior: 'same',
    emotionVolatility: 0.2,
  },

  friend: {
    id: 'friend',
    displayName: 'Friend',

    lieProbability: 0.02,
    lieTypes: [],
    lieSkill: 0,

    loveBombingEnabled: false,
    loveBombingPhrases: [],
    loveBombingDuration: 0,

    devaluationTriggers: [],
    devaluationPhrases: [],

    obsessionEnabled: false,
    obsessionThreshold: 100,
    obsessionBehaviors: [],

    functioningLevel: 'high',
    maskSlipTriggers: [],
    maskSlipPhrases: [],
    recoverySpeed: 1.0,

    triangulationEnabled: false,
    publicVsPrivateBehavior: 'same',
    emotionVolatility: 0.1,
  },

  neutral: {
    id: 'neutral',
    displayName: 'Unknown',

    lieProbability: 0.2,
    lieTypes: ['intention-hiding'],
    lieSkill: 0.5,

    loveBombingEnabled: false,
    loveBombingPhrases: [],
    loveBombingDuration: 0,

    devaluationTriggers: [],
    devaluationPhrases: [],

    obsessionEnabled: false,
    obsessionThreshold: 100,
    obsessionBehaviors: [],

    functioningLevel: 'high',
    maskSlipTriggers: [],
    maskSlipPhrases: [],
    recoverySpeed: 0.5,

    triangulationEnabled: false,
    publicVsPrivateBehavior: 'same',
    emotionVolatility: 0.3,
  },
};

// ============================================
// HELPER FUNCTIONS
// ============================================

/**
 * Get behavior definition for a personality type
 */
export function getPersonalityBehavior(personalityType: string): PersonalityBehavior | null {
  const lowerType = personalityType.toLowerCase();

  // Direct match
  if (PERSONALITY_BEHAVIORS[lowerType as PersonalityCategory]) {
    return PERSONALITY_BEHAVIORS[lowerType as PersonalityCategory] || null;
  }

  // Keyword matching
  const keywords: Record<string, PersonalityCategory> = {
    npd: 'narcissist',
    narcissist: 'narcissist',
    covert: 'narcissist',
    grandiose: 'narcissist',
    bpd: 'borderline',
    borderline: 'borderline',
    aspd: 'psychopath',
    psychopath: 'psychopath',
    sociopath: 'sociopath',
    histrionic: 'histrionic',
    avoidant: 'avoidant',
    dependent: 'dependent',
    anxious: 'anxious-attached',
    dismissive: 'dismissive-avoidant',
  };

  for (const [keyword, category] of Object.entries(keywords)) {
    if (lowerType.includes(keyword)) {
      return PERSONALITY_BEHAVIORS[category] || null;
    }
  }

  return PERSONALITY_BEHAVIORS.neutral || null;
}

/**
 * Check if personality is in love-bombing phase
 */
export function isInLoveBombingPhase(
  behavior: PersonalityBehavior,
  interactionCount: number
): boolean {
  return behavior.loveBombingEnabled && interactionCount <= behavior.loveBombingDuration;
}

/**
 * Check if obsession threshold is met
 */
export function isObsessed(
  behavior: PersonalityBehavior,
  obsessionLevel: number
): boolean {
  return behavior.obsessionEnabled && obsessionLevel >= behavior.obsessionThreshold;
}

/**
 * Check if mask should slip based on trigger
 */
export function shouldMaskSlip(
  behavior: PersonalityBehavior,
  trigger: MaskSlipTrigger
): boolean {
  return behavior.maskSlipTriggers.includes(trigger);
}

/**
 * Get a random lie type for this personality
 */
export function getRandomLieType(behavior: PersonalityBehavior): LieType | null {
  if (behavior.lieTypes.length === 0) return null;
  if (Math.random() > behavior.lieProbability) return null;
  return behavior.lieTypes[Math.floor(Math.random() * behavior.lieTypes.length)];
}

/**
 * Get a random love-bombing phrase
 */
export function getLoveBombingPhrase(behavior: PersonalityBehavior): string | null {
  if (!behavior.loveBombingEnabled || behavior.loveBombingPhrases.length === 0) return null;
  return behavior.loveBombingPhrases[Math.floor(Math.random() * behavior.loveBombingPhrases.length)];
}

/**
 * Get a random devaluation phrase
 */
export function getDevaluationPhrase(behavior: PersonalityBehavior): string | null {
  if (behavior.devaluationPhrases.length === 0) return null;
  return behavior.devaluationPhrases[Math.floor(Math.random() * behavior.devaluationPhrases.length)];
}

/**
 * Get a random mask slip phrase
 */
export function getMaskSlipPhrase(behavior: PersonalityBehavior): string | null {
  if (behavior.maskSlipPhrases.length === 0) return null;
  return behavior.maskSlipPhrases[Math.floor(Math.random() * behavior.maskSlipPhrases.length)];
}
