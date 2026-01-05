/**
 * Lie Injector
 * Generates and injects contextual lies into NPC dialogue based on personality type.
 * Different personalities lie in different ways and about different things.
 */

import type { DialogLine, EmotionType } from '../../content/simulator/types';
import type { PersonalityBehavior, LieType } from './personalityBehaviors';

// ============================================
// TYPES
// ============================================

/**
 * A lie that can be injected into dialogue
 */
export interface GeneratedLie {
  /** The lie text to inject */
  text: string;
  /** Type of lie */
  lieType: LieType;
  /** How this lie modifies the original text */
  injectionStyle: 'replace' | 'prepend' | 'append' | 'intersperse';
  /** Suggested emotion when delivering this lie */
  suggestedEmotion?: EmotionType;
  /** How convincing this lie is (0-1) */
  convincingness: number;
}

/**
 * Context for lie generation
 */
export interface LieContext {
  /** Current topic of conversation */
  topic?: string;
  /** Names/IDs of other characters present */
  otherCharacters?: string[];
  /** What the player just said/did */
  playerAction?: string;
  /** Whether this is a public or private setting */
  isPublic?: boolean;
}

// ============================================
// LIE TEMPLATES BY TYPE
// ============================================

const LIE_TEMPLATES: Record<LieType, string[]> = {
  'self-aggrandizement': [
    "I've done this a hundred times.",
    "Everyone knows me here.",
    "The dean personally asked for my input.",
    "I turned down better offers.",
    "I was the one who made this happen.",
    "People say I'm the best at this.",
    "I built all of this from nothing.",
  ],

  triangulation: [
    "{other} was just telling me about you. Interesting things.",
    "{other} didn't seem to think you could handle this.",
    "I heard {other} has been... talking.",
    "{other} agrees with me, you know.",
    "Funny, {other} said the exact opposite.",
    "Everyone was saying you weren't up for this.",
  ],

  'history-revision': [
    "That's not what happened.",
    "I never said that.",
    "You must be remembering wrong.",
    "That was your idea, not mine.",
    "I always told you this would happen.",
    "I tried to warn you.",
  ],

  'intention-hiding': [
    "I'm just here to help.",
    "I have no stake in this.",
    "This isn't about me.",
    "I'm doing this for your benefit.",
    "I don't want anything from you.",
    "I have nothing to gain from this.",
  ],

  'feeling-denial': [
    "I'm fine.",
    "It doesn't bother me.",
    "I don't care either way.",
    "It's whatever.",
    "I'm not upset.",
    "I'm over it.",
  ],

  'false-promise': [
    "I'll definitely be there.",
    "You can count on me.",
    "I'll never let you down.",
    "I promise things will be different.",
    "Just give me one more chance.",
    "I'll make it up to you.",
  ],

  gaslighting: [
    "That never happened.",
    "You're imagining things.",
    "I think you're confused.",
    "That's not what I meant.",
    "You're being too sensitive.",
    "No one else sees it that way.",
    "Are you sure you're remembering correctly?",
  ],

  'victim-playing': [
    "After everything I've done for you...",
    "I'm always the one who gets blamed.",
    "Nobody appreciates me.",
    "I'm the real victim here.",
    "You have no idea what I've been through.",
    "Everyone always abandons me.",
  ],

  flattery: [
    "You're so smart.",
    "I've never met anyone like you.",
    "You really get it.",
    "You're different from everyone else.",
    "You're the only one I trust.",
    "You're special.",
  ],

  minimization: [
    "It's not a big deal.",
    "You're overreacting.",
    "It was just a joke.",
    "I barely did anything.",
    "That was nothing.",
    "Why are you making this into something?",
  ],
};

// ============================================
// CORE FUNCTIONS
// ============================================

/**
 * Generate a lie based on personality and context
 */
export function generateLie(
  behavior: PersonalityBehavior,
  context: LieContext = {}
): GeneratedLie | null {
  // Check if NPC should lie at all
  if (Math.random() > behavior.lieProbability) {
    return null;
  }

  // Pick a lie type based on personality's tendencies
  const lieType = pickLieType(behavior, context);
  if (!lieType) {
    return null;
  }

  // Generate the lie text
  const templates = LIE_TEMPLATES[lieType];
  if (!templates || templates.length === 0) {
    return null;
  }

  let text = templates[Math.floor(Math.random() * templates.length)];

  // Fill in template variables
  if (context.otherCharacters && context.otherCharacters.length > 0) {
    const otherName = context.otherCharacters[Math.floor(Math.random() * context.otherCharacters.length)];
    text = text.replace(/{other}/g, otherName);
  } else {
    // Replace {other} with generic if no characters available
    text = text.replace(/{other}/g, 'someone');
  }

  return {
    text,
    lieType,
    injectionStyle: getInjectionStyle(lieType),
    suggestedEmotion: getSuggestedEmotion(lieType, behavior),
    convincingness: behavior.lieSkill,
  };
}

/**
 * Inject a lie into an existing dialogue line
 */
export function injectLieIntoDialogue(
  line: DialogLine,
  lie: GeneratedLie
): DialogLine {
  let modifiedText: string;

  switch (lie.injectionStyle) {
    case 'replace':
      modifiedText = lie.text;
      break;

    case 'prepend':
      modifiedText = `${lie.text} ${line.text}`;
      break;

    case 'append':
      modifiedText = `${line.text} ${lie.text}`;
      break;

    case 'intersperse':
      // Insert lie in the middle
      const sentences = line.text.split('. ');
      if (sentences.length >= 2) {
        const midpoint = Math.floor(sentences.length / 2);
        sentences.splice(midpoint, 0, lie.text);
        modifiedText = sentences.join('. ');
      } else {
        modifiedText = `${line.text} ${lie.text}`;
      }
      break;

    default:
      modifiedText = `${line.text} ${lie.text}`;
  }

  return {
    ...line,
    text: modifiedText,
    emotion: lie.suggestedEmotion || line.emotion,
  };
}

/**
 * Generate a triangulation lie specifically
 * Used when NPC mentions other people to manipulate
 */
export function generateTriangulationLie(
  behavior: PersonalityBehavior,
  targetName: string,
  otherPersonName: string
): string | null {
  if (!behavior.triangulationEnabled) {
    return null;
  }

  if (!behavior.lieTypes.includes('triangulation')) {
    return null;
  }

  const templates = [
    `${otherPersonName} was telling me they're worried about you.`,
    `Funny, ${otherPersonName} said the exact opposite about you.`,
    `${otherPersonName} didn't seem to think you were up for this.`,
    `I heard ${otherPersonName} has been... talking about you.`,
    `${otherPersonName} agrees with me about you.`,
    `${otherPersonName} warned me about you, actually.`,
  ];

  return templates[Math.floor(Math.random() * templates.length)];
}

/**
 * Generate a gaslighting response when player catches NPC in a lie
 */
export function generateGaslightingResponse(
  behavior: PersonalityBehavior,
  whatPlayerSaid: string
): string | null {
  if (!behavior.lieTypes.includes('gaslighting')) {
    return null;
  }

  const templates = [
    "That's not what I said. You must be confused.",
    "I think you're misremembering.",
    "That's... not how I remember it.",
    "Interesting interpretation. But no.",
    "You're putting words in my mouth.",
    "I never said that. Are you feeling okay?",
  ];

  // High functioning adds more subtlety
  if (behavior.functioningLevel === 'high') {
    templates.push(
      "Hmm, that's one way to hear it...",
      "I can see why you might think that, but no.",
      "Let's not get confused about what was actually said."
    );
  }

  return templates[Math.floor(Math.random() * templates.length)];
}

/**
 * Generate a victim-playing response when NPC is confronted
 */
export function generateVictimResponse(
  behavior: PersonalityBehavior
): string | null {
  if (!behavior.lieTypes.includes('victim-playing')) {
    return null;
  }

  const templates = [
    "After everything I've done for you...",
    "I can't believe you would say that to me.",
    "I'm the one who's been hurt here.",
    "Everyone always blames me.",
    "Do you have any idea how that makes me feel?",
    "I tried so hard, and this is what I get?",
  ];

  return templates[Math.floor(Math.random() * templates.length)];
}

/**
 * Check if a statement is likely a lie based on NPC behavior patterns
 * Useful for player-facing "lie detection" hints
 */
export function assessLieLikelihood(
  statement: string,
  behavior: PersonalityBehavior
): {
  isLikelyLie: boolean;
  confidence: number;
  likelyType: LieType | null;
} {
  const lowercaseStatement = statement.toLowerCase();

  // Check for common lie patterns
  let likelyType: LieType | null = null;
  let patternScore = 0;

  // Self-aggrandizement patterns
  if (lowercaseStatement.includes('everyone knows') ||
      lowercaseStatement.includes('i built') ||
      lowercaseStatement.includes('i made this')) {
    if (behavior.lieTypes.includes('self-aggrandizement')) {
      likelyType = 'self-aggrandizement';
      patternScore = 0.7;
    }
  }

  // Feeling denial patterns
  if (lowercaseStatement.includes("i'm fine") ||
      lowercaseStatement.includes("doesn't bother me") ||
      lowercaseStatement.includes("don't care")) {
    if (behavior.lieTypes.includes('feeling-denial')) {
      likelyType = 'feeling-denial';
      patternScore = 0.6;
    }
  }

  // Gaslighting patterns
  if (lowercaseStatement.includes('that never happened') ||
      lowercaseStatement.includes('you\'re imagining') ||
      lowercaseStatement.includes('you\'re confused')) {
    if (behavior.lieTypes.includes('gaslighting')) {
      likelyType = 'gaslighting';
      patternScore = 0.85;
    }
  }

  // False promise patterns
  if (lowercaseStatement.includes('i promise') ||
      lowercaseStatement.includes('i\'ll definitely') ||
      lowercaseStatement.includes('never let you down')) {
    if (behavior.lieTypes.includes('false-promise')) {
      likelyType = 'false-promise';
      patternScore = 0.5;
    }
  }

  // Calculate final probability
  const baseProbability = behavior.lieProbability;
  const adjustedProbability = patternScore > 0
    ? (baseProbability + patternScore) / 2
    : baseProbability * 0.5;

  return {
    isLikelyLie: adjustedProbability > 0.5,
    confidence: Math.min(1, adjustedProbability * behavior.lieSkill),
    likelyType,
  };
}

// ============================================
// HELPER FUNCTIONS
// ============================================

/**
 * Pick the most appropriate lie type based on personality and context
 */
function pickLieType(
  behavior: PersonalityBehavior,
  context: LieContext
): LieType | null {
  const availableTypes = behavior.lieTypes;

  if (availableTypes.length === 0) {
    return null;
  }

  // Weighted selection based on context
  const weights: Partial<Record<LieType, number>> = {};

  for (const type of availableTypes) {
    weights[type] = 1;

    // Increase weight for triangulation if other characters present
    if (type === 'triangulation' && context.otherCharacters?.length) {
      weights[type] = 3;
    }

    // Increase weight for self-aggrandizement in public
    if (type === 'self-aggrandizement' && context.isPublic) {
      weights[type] = 2;
    }

    // Increase weight for feeling-denial if player asked about feelings
    if (type === 'feeling-denial' && context.playerAction?.toLowerCase().includes('feel')) {
      weights[type] = 2.5;
    }
  }

  // Weighted random selection
  const totalWeight = Object.values(weights).reduce((a, b) => a + (b || 0), 0);
  let random = Math.random() * totalWeight;

  for (const [type, weight] of Object.entries(weights)) {
    random -= weight || 0;
    if (random <= 0) {
      return type as LieType;
    }
  }

  return availableTypes[0];
}

/**
 * Determine how to inject the lie into dialogue
 */
function getInjectionStyle(lieType: LieType): 'replace' | 'prepend' | 'append' | 'intersperse' {
  switch (lieType) {
    case 'gaslighting':
    case 'history-revision':
      return 'replace'; // Strong denial replaces

    case 'flattery':
    case 'self-aggrandizement':
      return 'prepend'; // Start with the manipulation

    case 'triangulation':
    case 'victim-playing':
      return 'append'; // Add at end

    default:
      return 'intersperse';
  }
}

/**
 * Suggest emotion when delivering a specific lie type
 */
function getSuggestedEmotion(
  lieType: LieType,
  behavior: PersonalityBehavior
): EmotionType {
  switch (lieType) {
    case 'flattery':
      return 'seductive';

    case 'victim-playing':
      return 'sad';

    case 'gaslighting':
      return behavior.functioningLevel === 'high' ? 'confused' : 'cold';

    case 'self-aggrandizement':
      return 'smirking';

    case 'feeling-denial':
      return 'neutral';

    case 'false-promise':
      return 'serious';

    case 'triangulation':
      return 'knowing';

    case 'history-revision':
      return behavior.functioningLevel === 'high' ? 'neutral' : 'angry';

    case 'intention-hiding':
      return 'neutral';

    case 'minimization':
      return 'neutral';

    default:
      return 'neutral';
  }
}

/**
 * Get inner voice hint about potential lie
 */
export function getInnerVoiceHint(
  lieType: LieType,
  convincingness: number
): string | null {
  // Only give hints if lie isn't too convincing
  if (convincingness > 0.8) {
    return null; // Too good a liar
  }

  const hints: Record<LieType, string[]> = {
    'self-aggrandizement': [
      "That sounds... exaggerated.",
      "Is that really true?",
      "Everyone says that about themselves.",
    ],
    triangulation: [
      "Why bring up someone else right now?",
      "That's oddly specific.",
      "Why does it feel like they're playing people against each other?",
    ],
    'history-revision': [
      "Wait, that's not how you remember it.",
      "Something doesn't match up.",
      "Your memory says different.",
    ],
    'intention-hiding': [
      "If they really had no stake, why are they here?",
      "Everyone wants something.",
      "Watch the actions, not the words.",
    ],
    'feeling-denial': [
      "Their eyes say different.",
      "The body language doesn't match.",
      "Fine doesn't look like that.",
    ],
    'false-promise': [
      "Promises are easy. Actions are hard.",
      "You've heard this before.",
      "What's their track record?",
    ],
    gaslighting: [
      "Trust your memory.",
      "You know what happened.",
      "They're trying to make you doubt yourself.",
    ],
    'victim-playing': [
      "Notice how the focus shifted.",
      "Who's the real victim here?",
      "Convenient timing for that.",
    ],
    flattery: [
      "That feels... excessive.",
      "What do they want?",
      "Flattery before the ask.",
    ],
    minimization: [
      "It felt bigger than that.",
      "They're downplaying it.",
      "Your feelings are valid.",
    ],
  };

  const typeHints = hints[lieType];
  if (!typeHints || typeHints.length === 0) {
    return null;
  }

  // 50% chance to give a hint for unconvincing lies
  if (convincingness < 0.5 || Math.random() < 0.5) {
    return typeHints[Math.floor(Math.random() * typeHints.length)];
  }

  return null;
}
