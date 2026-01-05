// Typing Patterns - Character-specific text reveal speeds
// Makes each character feel distinct through how they "speak"

export type TypingPatternType =
  | 'confident'
  | 'nervous'
  | 'calculated'
  | 'avoidant'
  | 'seductive'
  | 'cold'
  | 'friendly'
  | 'aggressive'
  | 'instant';

export interface TypingPattern {
  id: TypingPatternType;
  baseSpeed: number; // ms between characters (lower = faster)
  variance: number; // random variance in speed
  pauseOnPunctuation: number; // extra pause after . , ! ? etc
  pauseOnEllipsis: number; // pause for ...
  pauseOnDash: number; // pause for —
  stutterChance: number; // 0-1, chance of slight pause mid-word
  longPauseChance: number; // 0-1, chance of longer pause
  longPauseDuration: number; // how long the long pause is
  drawlOnVowels: boolean; // slow down on vowels for seductive effect
}

export const TYPING_PATTERNS: Record<TypingPatternType, TypingPattern> = {
  confident: {
    id: 'confident',
    baseSpeed: 25,
    variance: 5,
    pauseOnPunctuation: 80,
    pauseOnEllipsis: 150,
    pauseOnDash: 100,
    stutterChance: 0,
    longPauseChance: 0,
    longPauseDuration: 0,
    drawlOnVowels: false,
  },
  nervous: {
    id: 'nervous',
    baseSpeed: 35,
    variance: 25, // High variance = inconsistent typing
    pauseOnPunctuation: 40,
    pauseOnEllipsis: 200,
    pauseOnDash: 80,
    stutterChance: 0.15, // Sometimes pauses mid-word
    longPauseChance: 0.1,
    longPauseDuration: 300,
    drawlOnVowels: false,
  },
  calculated: {
    id: 'calculated',
    baseSpeed: 45,
    variance: 0, // No variance = perfectly measured
    pauseOnPunctuation: 200, // Deliberate pauses
    pauseOnEllipsis: 400,
    pauseOnDash: 300,
    stutterChance: 0,
    longPauseChance: 0.05,
    longPauseDuration: 500, // When they pause, it's intentional
    drawlOnVowels: false,
  },
  avoidant: {
    id: 'avoidant',
    baseSpeed: 55, // Slow overall
    variance: 15,
    pauseOnPunctuation: 300, // Long pauses
    pauseOnEllipsis: 600, // Very long on ...
    pauseOnDash: 400,
    stutterChance: 0.05,
    longPauseChance: 0.2, // Frequent long pauses
    longPauseDuration: 500,
    drawlOnVowels: false,
  },
  seductive: {
    id: 'seductive',
    baseSpeed: 40,
    variance: 10,
    pauseOnPunctuation: 250,
    pauseOnEllipsis: 350,
    pauseOnDash: 200,
    stutterChance: 0,
    longPauseChance: 0.1,
    longPauseDuration: 400,
    drawlOnVowels: true, // Slower on vowels for drawl effect
  },
  cold: {
    id: 'cold',
    baseSpeed: 30,
    variance: 0, // Mechanical precision
    pauseOnPunctuation: 100,
    pauseOnEllipsis: 200,
    pauseOnDash: 150,
    stutterChance: 0,
    longPauseChance: 0,
    longPauseDuration: 0,
    drawlOnVowels: false,
  },
  friendly: {
    id: 'friendly',
    baseSpeed: 28,
    variance: 8,
    pauseOnPunctuation: 100,
    pauseOnEllipsis: 200,
    pauseOnDash: 120,
    stutterChance: 0,
    longPauseChance: 0,
    longPauseDuration: 0,
    drawlOnVowels: false,
  },
  aggressive: {
    id: 'aggressive',
    baseSpeed: 20, // Very fast
    variance: 5,
    pauseOnPunctuation: 50, // Short, punchy
    pauseOnEllipsis: 100,
    pauseOnDash: 80,
    stutterChance: 0,
    longPauseChance: 0,
    longPauseDuration: 0,
    drawlOnVowels: false,
  },
  instant: {
    id: 'instant',
    baseSpeed: 0, // No animation - text appears instantly
    variance: 0,
    pauseOnPunctuation: 0,
    pauseOnEllipsis: 0,
    pauseOnDash: 0,
    stutterChance: 0,
    longPauseChance: 0,
    longPauseDuration: 0,
    drawlOnVowels: false,
  },
};

// Personality type keywords to typing pattern mapping
const PERSONALITY_TO_TYPING: Record<string, TypingPatternType> = {
  // Narcissist = confident/calculated
  narcissist: 'confident',
  grandiose: 'confident',
  covert: 'calculated',
  malignant: 'cold',
  communal: 'friendly',
  strategist: 'calculated',

  // Avoidant = avoidant pattern
  avoidant: 'avoidant',
  dismissive: 'cold',
  fearful: 'nervous',
  wallflower: 'nervous',

  // Predator = cold/calculated
  predator: 'cold',
  manipulator: 'calculated',
  dangerous: 'cold',

  // Healthy = friendly
  healthy: 'friendly',
  secure: 'friendly',
  balanced: 'friendly',

  // Friend = friendly
  friend: 'friendly',
  ally: 'friendly',
  supportive: 'friendly',

  // Authority = calculated
  authority: 'calculated',
  gatekeeper: 'calculated',
  leader: 'confident',

  // Competitor = confident/aggressive
  competitor: 'confident',
  rival: 'aggressive',
  eager: 'nervous',
  ambitious: 'confident',
  magnet: 'seductive',
  prize: 'seductive',
};

/**
 * Get typing pattern from personality type
 */
export function getTypingPattern(personalityType: string): TypingPattern {
  const lowerType = personalityType.toLowerCase();

  for (const [keyword, patternType] of Object.entries(PERSONALITY_TO_TYPING)) {
    if (lowerType.includes(keyword)) {
      return TYPING_PATTERNS[patternType];
    }
  }

  return TYPING_PATTERNS.friendly; // Default
}

/**
 * Get typing pattern by type directly
 */
export function getTypingPatternByType(type: TypingPatternType): TypingPattern {
  return TYPING_PATTERNS[type];
}

/**
 * Calculate delay for a specific character
 */
export function getCharacterDelay(
  char: string,
  prevChar: string,
  pattern: TypingPattern
): number {
  // Instant pattern = no delay
  if (pattern.baseSpeed === 0) return 0;

  let delay = pattern.baseSpeed;

  // Add variance
  if (pattern.variance > 0) {
    delay += Math.random() * pattern.variance * 2 - pattern.variance;
  }

  // Drawl on vowels
  if (pattern.drawlOnVowels && 'aeiouAEIOU'.includes(char)) {
    delay *= 1.3;
  }

  // Punctuation pauses
  if ('.!?'.includes(prevChar)) {
    delay += pattern.pauseOnPunctuation;
  } else if (prevChar === ',') {
    delay += pattern.pauseOnPunctuation * 0.5;
  }

  // Ellipsis
  if (prevChar === '.' && char === '.') {
    delay += pattern.pauseOnEllipsis / 3;
  }

  // Dash
  if (prevChar === '—' || prevChar === '-') {
    delay += pattern.pauseOnDash;
  }

  // Random stutter
  if (pattern.stutterChance > 0 && Math.random() < pattern.stutterChance) {
    delay += 150;
  }

  // Random long pause
  if (pattern.longPauseChance > 0 && Math.random() < pattern.longPauseChance) {
    delay += pattern.longPauseDuration;
  }

  return Math.max(0, delay);
}

/**
 * Get total estimated duration for text
 */
export function estimateTypingDuration(text: string, pattern: TypingPattern): number {
  if (pattern.baseSpeed === 0) return 0;

  let total = text.length * pattern.baseSpeed;

  // Add punctuation pauses
  const punctuationCount = (text.match(/[.!?,]/g) || []).length;
  total += punctuationCount * pattern.pauseOnPunctuation;

  return total;
}

export default TYPING_PATTERNS;
