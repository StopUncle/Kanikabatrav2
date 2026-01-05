/**
 * Obsession Tracker
 * Tracks and manages NPC obsession states based on player behavior.
 * Different personality types become obsessed for different reasons
 * and exhibit different obsession behaviors.
 */

import type { DialogLine, EmotionType } from '../../content/simulator/types';
import type { NPCMemory } from '../../stores/npcMemoryStore';
import { useNPCMemoryStore } from '../../stores/npcMemoryStore';
import {
  type PersonalityBehavior,
  type ObsessionBehavior,
  isObsessed,
} from './personalityBehaviors';

// ============================================
// TYPES
// ============================================

/**
 * Obsession event that can be triggered
 */
export interface ObsessionEvent {
  /** Type of obsession behavior exhibited */
  behaviorType: ObsessionBehavior;
  /** Dialogue injection for this behavior */
  dialogueInjection: string;
  /** Suggested emotion */
  emotion: EmotionType;
  /** Intensity level (1-3) */
  intensity: 1 | 2 | 3;
  /** Whether this is escalating from previous behavior */
  isEscalation: boolean;
}

/**
 * Obsession state summary
 */
export interface ObsessionState {
  isObsessed: boolean;
  obsessionLevel: number;
  primaryBehavior: ObsessionBehavior | null;
  intensity: 1 | 2 | 3;
  triggers: string[];
  isEscalating: boolean;
}

/**
 * Actions that affect obsession level
 */
export interface ObsessionTriggerAction {
  type: 'validation' | 'rejection' | 'attention' | 'withdrawal' | 'supply' | 'boundary';
  /** How much to change obsession level */
  impact: number;
  /** Context of the action */
  context?: string;
}

// ============================================
// OBSESSION BEHAVIOR TEMPLATES
// ============================================

const OBSESSION_DIALOGUES: Record<ObsessionBehavior, { low: string[]; medium: string[]; high: string[] }> = {
  'possessive-language': {
    low: [
      "I was hoping you'd be here.",
      "I've been thinking about you.",
      "You're different from everyone else.",
    ],
    medium: [
      "I don't like sharing your attention.",
      "You're mine. In a way.",
      "I get jealous easily. Just so you know.",
    ],
    high: [
      "You belong with me.",
      "I need to know where you are.",
      "Don't talk to them. Talk to me.",
    ],
  },

  tracking: {
    low: [
      "I noticed you weren't at the usual place today.",
      "I saw you earlier. You seemed busy.",
      "Your schedule seems different lately.",
    ],
    medium: [
      "I know where you were last night.",
      "I've been... keeping track.",
      "You left at 10:47. I noticed.",
    ],
    high: [
      "I always know where you are.",
      "You can't hide from me.",
      "I've been watching. More than you know.",
    ],
  },

  'jealousy-probing': {
    low: [
      "Who was that you were talking to?",
      "Do you have plans with anyone else?",
      "Are you seeing other people?",
    ],
    medium: [
      "You seem awfully friendly with them.",
      "Is there something going on I should know about?",
      "I don't like how they look at you.",
    ],
    high: [
      "Are you trying to make me jealous?",
      "I need you to stop talking to them.",
      "It's me or them. Choose.",
    ],
  },

  'future-faking': {
    low: [
      "I can see us together for a long time.",
      "We have such potential.",
      "I have big plans for us.",
    ],
    medium: [
      "We're going to do amazing things together.",
      "I'm going to give you everything you've ever wanted.",
      "Just wait until you see what I have planned.",
    ],
    high: [
      "We'll be together forever.",
      "I'm never letting you go.",
      "Our future is already written.",
    ],
  },

  'isolation-attempts': {
    low: [
      "I'd rather it just be us tonight.",
      "Your friends don't really get you like I do.",
      "Let's skip the group thing.",
    ],
    medium: [
      "They're not good for you.",
      "I'm all you need.",
      "You don't need anyone else.",
    ],
    high: [
      "Cut them off. For me.",
      "It's us against the world.",
      "They're trying to turn you against me.",
    ],
  },

  'intensity-escalation': {
    low: [
      "I feel so strongly about this.",
      "This matters more than you know.",
      "I can't stop thinking about it.",
    ],
    medium: [
      "I've never felt this way before.",
      "This is consuming me.",
      "I need you to understand how important this is.",
    ],
    high: [
      "I can't live without this.",
      "You don't understand. This is everything.",
      "I'll do anything. Anything.",
    ],
  },

  'abandonment-panic': {
    low: [
      "You're not leaving, are you?",
      "Promise you'll stay.",
      "I get nervous when you're not around.",
    ],
    medium: [
      "Please don't go. Please.",
      "I can't do this alone.",
      "If you leave, I don't know what I'll do.",
    ],
    high: [
      "DON'T LEAVE ME!",
      "I'll die if you go.",
      "You can't abandon me like everyone else!",
    ],
  },

  'predatory-focus': {
    low: [
      "I've been studying you.",
      "You're very... interesting to me.",
      "I know more about you than you think.",
    ],
    medium: [
      "I've learned everything about you.",
      "I know your patterns. Your weaknesses.",
      "You're becoming my favorite project.",
    ],
    high: [
      "You have no idea what I'm capable of.",
      "I always get what I want. Always.",
      "This was never your choice.",
    ],
  },
};

// ============================================
// CORE FUNCTIONS
// ============================================

/**
 * Get current obsession state for an NPC
 */
export function getObsessionState(
  characterId: string,
  behavior: PersonalityBehavior
): ObsessionState {
  const memory = useNPCMemoryStore.getState().getMemory(characterId);

  if (!memory) {
    return {
      isObsessed: false,
      obsessionLevel: 0,
      primaryBehavior: null,
      intensity: 1,
      triggers: [],
      isEscalating: false,
    };
  }

  const obsessed = isObsessed(behavior, memory.obsessionLevel);
  const primaryBehavior = obsessed && behavior.obsessionBehaviors.length > 0
    ? behavior.obsessionBehaviors[0]
    : null;

  // Calculate intensity based on obsession level above threshold
  let intensity: 1 | 2 | 3 = 1;
  if (memory.obsessionLevel >= behavior.obsessionThreshold + 20) {
    intensity = 2;
  }
  if (memory.obsessionLevel >= behavior.obsessionThreshold + 40) {
    intensity = 3;
  }

  return {
    isObsessed: obsessed,
    obsessionLevel: memory.obsessionLevel,
    primaryBehavior,
    intensity,
    triggers: memory.obsessionTriggers,
    isEscalating: memory.obsessionLevel > (behavior.obsessionThreshold + 30),
  };
}

/**
 * Process a player action and update obsession accordingly
 */
export function processObsessionTrigger(
  characterId: string,
  action: ObsessionTriggerAction,
  behavior: PersonalityBehavior
): { triggered: boolean; newLevel: number } {
  const memoryStore = useNPCMemoryStore.getState();
  let impact = action.impact;

  // Modify impact based on personality
  switch (action.type) {
    case 'validation':
      // NPD loves validation
      if (behavior.id === 'narcissist') impact *= 1.5;
      break;

    case 'rejection':
      // BPD spirals on rejection
      if (behavior.id === 'borderline') impact *= 2;
      break;

    case 'attention':
      // All cluster B types respond to attention
      if (['narcissist', 'borderline', 'histrionic'].includes(behavior.id)) {
        impact *= 1.3;
      }
      break;

    case 'withdrawal':
      // Triggers abandonment-focused types
      if (behavior.obsessionBehaviors.includes('abandonment-panic')) {
        impact *= 1.8;
      }
      break;

    case 'supply':
      // NPD and histrionic thrive on supply
      if (['narcissist', 'histrionic'].includes(behavior.id)) {
        impact *= 1.4;
      }
      break;

    case 'boundary':
      // Some types increase obsession when boundaries set
      if (behavior.obsessionBehaviors.includes('predatory-focus')) {
        impact = Math.abs(impact); // Boundaries become challenge
      }
      break;
  }

  // Apply the impact
  memoryStore.adjustObsession(characterId, impact);

  const updatedMemory = memoryStore.getMemory(characterId);
  const newLevel = updatedMemory?.obsessionLevel || 0;

  // Check if obsession was triggered
  const wasObsessed = (updatedMemory?.obsessionLevel || 0) - impact < behavior.obsessionThreshold;
  const isNowObsessed = newLevel >= behavior.obsessionThreshold;
  const triggered = !wasObsessed && isNowObsessed && behavior.obsessionEnabled;

  if (triggered && action.context) {
    memoryStore.triggerObsession(characterId, action.context);
  }

  return {
    triggered,
    newLevel,
  };
}

/**
 * Generate an obsession event for dialogue injection
 */
export function generateObsessionEvent(
  behavior: PersonalityBehavior,
  memory: NPCMemory
): ObsessionEvent | null {
  if (!memory.isObsessed || behavior.obsessionBehaviors.length === 0) {
    return null;
  }

  // Pick a behavior based on personality priority
  const behaviorType = pickObsessionBehavior(behavior, memory);
  if (!behaviorType) {
    return null;
  }

  // Determine intensity
  const excessLevel = memory.obsessionLevel - behavior.obsessionThreshold;
  let intensity: 1 | 2 | 3 = 1;
  if (excessLevel >= 20) intensity = 2;
  if (excessLevel >= 40) intensity = 3;

  // Get dialogue for this behavior and intensity
  const dialoguePool = OBSESSION_DIALOGUES[behaviorType];
  const intensityKey = intensity === 1 ? 'low' : intensity === 2 ? 'medium' : 'high';
  const dialogues = dialoguePool[intensityKey];

  if (!dialogues || dialogues.length === 0) {
    return null;
  }

  const dialogue = dialogues[Math.floor(Math.random() * dialogues.length)];

  return {
    behaviorType,
    dialogueInjection: dialogue,
    emotion: getObsessionEmotion(behaviorType, intensity),
    intensity,
    isEscalation: intensity === 3,
  };
}

/**
 * Inject obsession behavior into a dialogue line
 */
export function injectObsessionIntoDialogue(
  line: DialogLine,
  event: ObsessionEvent
): DialogLine {
  // Determine injection position based on behavior type
  let modifiedText: string;

  switch (event.behaviorType) {
    case 'abandonment-panic':
    case 'intensity-escalation':
      // These interrupt - prepend
      modifiedText = `${event.dialogueInjection} ${line.text}`;
      break;

    case 'jealousy-probing':
    case 'tracking':
      // These come as afterthoughts - append
      modifiedText = `${line.text} ${event.dialogueInjection}`;
      break;

    case 'possessive-language':
    case 'future-faking':
      // These weave in naturally
      if (line.text.endsWith('.')) {
        modifiedText = `${line.text.slice(0, -1)}. ${event.dialogueInjection}`;
      } else {
        modifiedText = `${line.text} ${event.dialogueInjection}`;
      }
      break;

    case 'isolation-attempts':
    case 'predatory-focus':
      // These can replace entirely at high intensity
      if (event.intensity === 3) {
        modifiedText = event.dialogueInjection;
      } else {
        modifiedText = `${line.text} ${event.dialogueInjection}`;
      }
      break;

    default:
      modifiedText = `${line.text} ${event.dialogueInjection}`;
  }

  return {
    ...line,
    text: modifiedText,
    emotion: event.emotion,
  };
}

/**
 * Get inner voice warning about obsession
 */
export function getObsessionWarning(
  state: ObsessionState,
  behavior: PersonalityBehavior
): string | null {
  if (!state.isObsessed) {
    return null;
  }

  const warnings: Record<ObsessionBehavior, string[]> = {
    'possessive-language': [
      "The possessiveness is showing.",
      "They're getting territorial.",
      "This feels... clingy.",
    ],
    tracking: [
      "How do they know that?",
      "That's oddly specific.",
      "They've been watching.",
    ],
    'jealousy-probing': [
      "They're fishing for something.",
      "The jealousy is palpable.",
      "Red flag: possessive questioning.",
    ],
    'future-faking': [
      "Lots of promises. No delivery.",
      "That's moving fast. Too fast.",
      "Beautiful words. But are they real?",
    ],
    'isolation-attempts': [
      "They're trying to cut you off.",
      "Notice the pattern: just you and them.",
      "Isolation tactic detected.",
    ],
    'intensity-escalation': [
      "The intensity is overwhelming.",
      "This is escalating.",
      "Something's not right about this energy.",
    ],
    'abandonment-panic': [
      "The fear is controlling them.",
      "Walking on eggshells.",
      "Their panic isn't your responsibility.",
    ],
    'predatory-focus': [
      "You're being hunted.",
      "This isn't attraction. It's calculation.",
      "Trust your instincts. Leave.",
    ],
  };

  if (!state.primaryBehavior) {
    return "Something feels off. They're too focused on you.";
  }

  const behaviorWarnings = warnings[state.primaryBehavior];
  if (!behaviorWarnings || behaviorWarnings.length === 0) {
    return null;
  }

  // Higher intensity = more likely to warn
  const warningChance = state.intensity * 0.3;
  if (Math.random() > warningChance) {
    return null;
  }

  return behaviorWarnings[Math.floor(Math.random() * behaviorWarnings.length)];
}

/**
 * Calculate obsession impact for a given choice
 */
export function calculateObsessionImpact(
  choiceText: string,
  behavior: PersonalityBehavior
): number {
  const text = choiceText.toLowerCase();
  let impact = 0;

  // Validation increases obsession for most types
  if (text.includes('you\'re right') || text.includes('amazing') || text.includes('impressive')) {
    impact += 10;
  }

  // Exclusive attention increases obsession
  if (text.includes('just you') || text.includes('only you') || text.includes('all yours')) {
    impact += 15;
  }

  // Rejection increases obsession for BPD, decreases for others
  if (text.includes('no') || text.includes('leave') || text.includes('stop')) {
    if (behavior.id === 'borderline') {
      impact += 20; // BPD paradox
    } else if (behavior.id === 'narcissist') {
      impact += 5; // Narcissistic injury can create fixation
    } else {
      impact -= 10;
    }
  }

  // Showing interest increases obsession
  if (text.includes('tell me more') || text.includes('interested') || text.includes('fascinating')) {
    impact += 8;
  }

  // Setting boundaries
  if (text.includes('boundary') || text.includes('need space') || text.includes('too much')) {
    if (behavior.obsessionBehaviors.includes('predatory-focus')) {
      impact += 15; // Challenge accepted
    } else {
      impact -= 5;
    }
  }

  return impact;
}

// ============================================
// HELPER FUNCTIONS
// ============================================

/**
 * Pick the most appropriate obsession behavior to display
 */
function pickObsessionBehavior(
  behavior: PersonalityBehavior,
  memory: NPCMemory
): ObsessionBehavior | null {
  const available = behavior.obsessionBehaviors;
  if (available.length === 0) return null;

  // Weight behaviors based on memory state
  const weights: Record<string, number> = {};

  for (const b of available) {
    weights[b] = 1;

    // Increase weight for abandonment panic if player showed withdrawal
    if (b === 'abandonment-panic' && memory.lastInteraction === 'boundary') {
      weights[b] = 3;
    }

    // Increase weight for jealousy probing after validation
    if (b === 'jealousy-probing' && memory.validationCount > 2) {
      weights[b] = 2;
    }

    // Increase weight for possessive language as obsession grows
    if (b === 'possessive-language' && memory.obsessionLevel > 70) {
      weights[b] = 2.5;
    }
  }

  // Weighted random selection
  const totalWeight = Object.values(weights).reduce((a, b) => a + b, 0);
  let random = Math.random() * totalWeight;

  for (const [b, weight] of Object.entries(weights)) {
    random -= weight;
    if (random <= 0) {
      return b as ObsessionBehavior;
    }
  }

  return available[0];
}

/**
 * Get emotion for obsession behavior
 */
function getObsessionEmotion(
  behaviorType: ObsessionBehavior,
  intensity: 1 | 2 | 3
): EmotionType {
  switch (behaviorType) {
    case 'possessive-language':
      return intensity === 3 ? 'cold' : 'seductive';

    case 'tracking':
      return 'neutral';

    case 'jealousy-probing':
      return intensity === 3 ? 'cold' : 'curious';

    case 'future-faking':
      return 'seductive';

    case 'isolation-attempts':
      return intensity === 3 ? 'cold' : 'concerned';

    case 'intensity-escalation':
      return intensity === 3 ? 'pleading' : 'serious';

    case 'abandonment-panic':
      return 'pleading';

    case 'predatory-focus':
      return 'cold';

    default:
      return 'neutral';
  }
}

/**
 * Check if obsession level warrants player escape option
 */
export function shouldOfferEscapeOption(
  state: ObsessionState,
  behavior: PersonalityBehavior
): boolean {
  // Always offer escape at high intensity
  if (state.intensity === 3) {
    return true;
  }

  // Predatory focus is always dangerous
  if (state.primaryBehavior === 'predatory-focus' && state.intensity >= 2) {
    return true;
  }

  // High obsession level overall
  if (state.obsessionLevel >= 80) {
    return true;
  }

  return false;
}
