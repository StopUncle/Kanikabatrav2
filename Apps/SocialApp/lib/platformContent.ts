// Platform-aware content loader
// Determines which content version to use based on platform (iOS vs Android)
import { Platform } from 'react-native';

/**
 * Platform content configuration
 *
 * Android (Play Store): Full dating game content with original framing
 * iOS (Apple Store): Apple-safe version with educational framing
 */
export const APPLE_SAFE = Platform.OS === 'ios';

/**
 * Get the appropriate dating scenarios directory
 * Used when importing dating content
 */
export function getDatingContentPath(): 'dating' | 'dating-apple-safe' {
  return APPLE_SAFE ? 'dating-apple-safe' : 'dating';
}

/**
 * Check if we should use Apple-safe content
 */
export function useAppleSafeContent(): boolean {
  return APPLE_SAFE;
}

/**
 * Content terminology mapping for Apple-safe mode
 * Use these replacements when displaying text in iOS builds
 */
export const appleSafeTerminology = {
  // Labels
  'target': 'connection',
  'Target': 'Connection',
  'targets': 'connections',
  'Targets': 'Connections',

  // Victory language
  'apex predator': 'pattern master',
  'Apex Predator': 'Pattern Master',
  'predator': 'observer',
  'Predator': 'Observer',

  // Control language
  'seize control': 'set boundaries',
  'Seize Control': 'Set Boundaries',
  'control': 'boundaries',
  'Control': 'Boundaries',

  // Network language
  'predator network': 'awareness network',
  'Predator Network': 'Awareness Network',
  'predators circle': 'red flags network',

  // Stat names (if displayed)
  'Power': 'Confidence',
  'Mask': 'Awareness',
  'Vision': 'Insight',
};

/**
 * Apply Apple-safe terminology to text
 * Only transforms text on iOS, returns original on Android
 */
export function applySafeTerminology(text: string): string {
  if (!APPLE_SAFE) return text;

  let result = text;
  for (const [original, safe] of Object.entries(appleSafeTerminology)) {
    result = result.replace(new RegExp(original, 'g'), safe);
  }
  return result;
}

/**
 * Get secret scenario ID based on platform
 * Apple uses reframed secret scenarios
 */
export function getSecretScenarioId(levelNumber: number): string {
  const baseIds: Record<number, { android: string; ios: string }> = {
    1: { android: 'secret-predators-circle', ios: 'secret-red-flags-network' },
    5: { android: 'secret-throne', ios: 'secret-pattern-mastery' },
  };

  const ids = baseIds[levelNumber];
  if (!ids) return `secret-level-${levelNumber}`;

  return APPLE_SAFE ? ids.ios : ids.android;
}
