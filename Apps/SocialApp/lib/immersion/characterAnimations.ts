// Character Animations - Entry/exit animations per personality
// Makes each character feel distinct through how they appear

import { Easing } from 'react-native-reanimated';

export type EntryAnimation =
  | 'fade-center'
  | 'slide-left'
  | 'slide-right'
  | 'instant'
  | 'bounce'
  | 'rise'
  | 'fade-slow'
  | 'zoom-in';

export type ExitAnimation =
  | 'fade'
  | 'slide-out'
  | 'instant'
  | 'sink'
  | 'fade-slow'
  | 'zoom-out';

export interface CharacterAnimation {
  entry: EntryAnimation;
  exit: ExitAnimation;
  entryDuration: number;
  exitDuration: number;
  entryEasing: typeof Easing.ease;
}

export const CHARACTER_ANIMATIONS: Record<string, CharacterAnimation> = {
  // Narcissists - They're always the center of attention
  narcissist: {
    entry: 'fade-center',
    exit: 'fade',
    entryDuration: 400,
    exitDuration: 300,
    entryEasing: Easing.out(Easing.cubic),
  },
  grandiose: {
    entry: 'zoom-in',
    exit: 'fade',
    entryDuration: 350,
    exitDuration: 250,
    entryEasing: Easing.out(Easing.back(1.1)),
  },
  covert: {
    entry: 'fade-slow',
    exit: 'fade-slow',
    entryDuration: 600,
    exitDuration: 500,
    entryEasing: Easing.inOut(Easing.ease),
  },

  // Avoidants - Keep their distance
  avoidant: {
    entry: 'slide-left',
    exit: 'slide-out',
    entryDuration: 500,
    exitDuration: 400,
    entryEasing: Easing.out(Easing.ease),
  },
  dismissive: {
    entry: 'slide-left',
    exit: 'instant',
    entryDuration: 400,
    exitDuration: 0,
    entryEasing: Easing.out(Easing.ease),
  },
  fearful: {
    entry: 'fade-slow',
    exit: 'slide-out',
    entryDuration: 600,
    exitDuration: 500,
    entryEasing: Easing.out(Easing.ease),
  },

  // Predators - Suddenly there, unnerving
  predator: {
    entry: 'instant',
    exit: 'instant',
    entryDuration: 0,
    exitDuration: 0,
    entryEasing: Easing.linear,
  },
  manipulator: {
    entry: 'fade-center',
    exit: 'fade',
    entryDuration: 300,
    exitDuration: 200,
    entryEasing: Easing.out(Easing.ease),
  },
  dangerous: {
    entry: 'instant',
    exit: 'fade',
    entryDuration: 0,
    exitDuration: 400,
    entryEasing: Easing.linear,
  },

  // Friends - Warm, bouncy energy
  friend: {
    entry: 'bounce',
    exit: 'fade',
    entryDuration: 500,
    exitDuration: 300,
    entryEasing: Easing.out(Easing.back(1.2)),
  },
  ally: {
    entry: 'bounce',
    exit: 'fade',
    entryDuration: 450,
    exitDuration: 300,
    entryEasing: Easing.out(Easing.back(1.15)),
  },
  supportive: {
    entry: 'rise',
    exit: 'fade',
    entryDuration: 400,
    exitDuration: 300,
    entryEasing: Easing.out(Easing.ease),
  },

  // Healthy - Grounded, stable
  healthy: {
    entry: 'rise',
    exit: 'fade',
    entryDuration: 400,
    exitDuration: 350,
    entryEasing: Easing.out(Easing.ease),
  },
  secure: {
    entry: 'rise',
    exit: 'sink',
    entryDuration: 450,
    exitDuration: 400,
    entryEasing: Easing.out(Easing.ease),
  },

  // Authority - Professional, commanding
  authority: {
    entry: 'fade-center',
    exit: 'fade',
    entryDuration: 350,
    exitDuration: 250,
    entryEasing: Easing.out(Easing.ease),
  },
  gatekeeper: {
    entry: 'rise',
    exit: 'fade',
    entryDuration: 400,
    exitDuration: 300,
    entryEasing: Easing.out(Easing.ease),
  },
  leader: {
    entry: 'fade-center',
    exit: 'fade',
    entryDuration: 300,
    exitDuration: 250,
    entryEasing: Easing.out(Easing.cubic),
  },

  // Competitors - Dynamic, energetic
  competitor: {
    entry: 'slide-right',
    exit: 'slide-out',
    entryDuration: 350,
    exitDuration: 300,
    entryEasing: Easing.out(Easing.ease),
  },
  rival: {
    entry: 'zoom-in',
    exit: 'zoom-out',
    entryDuration: 300,
    exitDuration: 250,
    entryEasing: Easing.out(Easing.back(1.1)),
  },
  eager: {
    entry: 'bounce',
    exit: 'fade',
    entryDuration: 400,
    exitDuration: 300,
    entryEasing: Easing.out(Easing.back(1.3)),
  },

  // Special types
  magnet: {
    entry: 'fade-slow',
    exit: 'fade-slow',
    entryDuration: 500,
    exitDuration: 400,
    entryEasing: Easing.inOut(Easing.ease),
  },
  prize: {
    entry: 'fade-center',
    exit: 'fade-slow',
    entryDuration: 600,
    exitDuration: 500,
    entryEasing: Easing.out(Easing.ease),
  },

  // Default
  neutral: {
    entry: 'fade-center',
    exit: 'fade',
    entryDuration: 300,
    exitDuration: 250,
    entryEasing: Easing.out(Easing.ease),
  },
};

/**
 * Get animation config from personality type
 */
export function getCharacterAnimation(personalityType: string): CharacterAnimation {
  const lowerType = personalityType.toLowerCase();

  for (const [keyword, animation] of Object.entries(CHARACTER_ANIMATIONS)) {
    if (lowerType.includes(keyword)) {
      return animation;
    }
  }

  return CHARACTER_ANIMATIONS.neutral;
}

/**
 * Animation transform values for each entry type
 */
export const ENTRY_TRANSFORMS: Record<EntryAnimation, {
  initialTranslateX: number;
  initialTranslateY: number;
  initialScale: number;
  initialOpacity: number;
}> = {
  'fade-center': {
    initialTranslateX: 0,
    initialTranslateY: 0,
    initialScale: 1,
    initialOpacity: 0,
  },
  'slide-left': {
    initialTranslateX: -100,
    initialTranslateY: 0,
    initialScale: 1,
    initialOpacity: 0,
  },
  'slide-right': {
    initialTranslateX: 100,
    initialTranslateY: 0,
    initialScale: 1,
    initialOpacity: 0,
  },
  'instant': {
    initialTranslateX: 0,
    initialTranslateY: 0,
    initialScale: 1,
    initialOpacity: 1,
  },
  'bounce': {
    initialTranslateX: 0,
    initialTranslateY: 30,
    initialScale: 0.9,
    initialOpacity: 0,
  },
  'rise': {
    initialTranslateX: 0,
    initialTranslateY: 50,
    initialScale: 1,
    initialOpacity: 0,
  },
  'fade-slow': {
    initialTranslateX: 0,
    initialTranslateY: 0,
    initialScale: 1,
    initialOpacity: 0,
  },
  'zoom-in': {
    initialTranslateX: 0,
    initialTranslateY: 0,
    initialScale: 0.8,
    initialOpacity: 0,
  },
};

/**
 * Animation transform values for each exit type
 */
export const EXIT_TRANSFORMS: Record<ExitAnimation, {
  finalTranslateX: number;
  finalTranslateY: number;
  finalScale: number;
  finalOpacity: number;
}> = {
  'fade': {
    finalTranslateX: 0,
    finalTranslateY: 0,
    finalScale: 1,
    finalOpacity: 0,
  },
  'slide-out': {
    finalTranslateX: -100,
    finalTranslateY: 0,
    finalScale: 1,
    finalOpacity: 0,
  },
  'instant': {
    finalTranslateX: 0,
    finalTranslateY: 0,
    finalScale: 1,
    finalOpacity: 0,
  },
  'sink': {
    finalTranslateX: 0,
    finalTranslateY: 30,
    finalScale: 0.95,
    finalOpacity: 0,
  },
  'fade-slow': {
    finalTranslateX: 0,
    finalTranslateY: 0,
    finalScale: 1,
    finalOpacity: 0,
  },
  'zoom-out': {
    finalTranslateX: 0,
    finalTranslateY: 0,
    finalScale: 0.9,
    finalOpacity: 0,
  },
};

export default CHARACTER_ANIMATIONS;
