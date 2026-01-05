// Immersion Toolkit - Central exports
// All tools for creating immersive dating simulator experience

// Character theming
export {
  CHARACTER_THEMES,
  getCharacterTheme,
  getThemeByCategory,
  isThemeDangerous,
  getThemeGradient,
  getContrastTextColor,
} from './characterThemes';
export type { PersonalityCategory, CharacterTheme } from './characterThemes';

// Haptic patterns
export {
  immersiveHaptics,
  triggerHaptic,
  isHapticsSupported,
} from './hapticPatterns';
export type { HapticPattern } from './hapticPatterns';

// Typing patterns
export {
  TYPING_PATTERNS,
  getTypingPattern,
  getTypingPatternByType,
  getCharacterDelay,
  estimateTypingDuration,
} from './typingPatterns';
export type { TypingPatternType, TypingPattern } from './typingPatterns';

// Character animations
export {
  CHARACTER_ANIMATIONS,
  getCharacterAnimation,
  ENTRY_TRANSFORMS,
  EXIT_TRANSFORMS,
} from './characterAnimations';
export type {
  EntryAnimation,
  ExitAnimation,
  CharacterAnimation,
} from './characterAnimations';

// Master hook
export { useImmersion } from './useImmersion';
export type { ImmersionState, UseImmersionReturn } from './useImmersion';
