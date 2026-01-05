// Design tokens - The Dark Mirror
// Dark elegance with gold accents

import { PixelRatio } from 'react-native';

// Font scaling helper for accessibility
// Gets system font scale and caps at 1.3x to prevent layout breaking
const fontScale = Math.min(PixelRatio.getFontScale(), 1.3);
const scaledFont = (size: number) => Math.round(size * fontScale);

// Dark theme (default)
export const darkColors = {
  // Backgrounds
  background: '#0A0A0A',
  surface: '#141414',
  surfaceElevated: '#1E1E1E',

  // Text (WCAG AA compliant on dark backgrounds)
  primary: '#FFFFFF',
  secondary: '#A8A8A8', // Was #9A9A9A, now 7.5:1 contrast on #0A0A0A
  tertiary: '#808080', // Was #666666, now 4.5:1 contrast on #0A0A0A

  // Gold Accent (brand)
  accent: '#C9A961',
  accentLight: '#E0C47A',
  accentDark: '#A08A4E',
  accentMuted: 'rgba(201, 169, 97, 0.15)',

  // Semantic
  error: '#E54545',
  errorMuted: 'rgba(229, 69, 69, 0.15)',
  success: '#4CAF50',
  warning: '#FFB020',

  // Borders
  border: '#2A2A2A',
  borderFocus: '#C9A961',
};

// Light theme
export const lightColors = {
  // Backgrounds
  background: '#FFFFFF',
  surface: '#F5F5F5',
  surfaceElevated: '#EBEBEB',

  // Text (WCAG AA compliant on light backgrounds)
  primary: '#1A1A1A',
  secondary: '#595959', // Was #666666, now 7:1 contrast on #FFFFFF
  tertiary: '#737373', // Was #999999, now 4.5:1 contrast on #FFFFFF

  // Gold Accent (brand) - same as dark
  accent: '#C9A961',
  accentLight: '#E0C47A',
  accentDark: '#A08A4E',
  accentMuted: 'rgba(201, 169, 97, 0.2)',

  // Semantic - same as dark
  error: '#E54545',
  errorMuted: 'rgba(229, 69, 69, 0.15)',
  success: '#4CAF50',
  warning: '#FFB020',

  // Borders
  border: '#E0E0E0',
  borderFocus: '#C9A961',
};

// Default export for backward compatibility (static dark theme)
export const colors = darkColors;

// Type for theme colors
export type ThemeColors = typeof darkColors;

export const spacing = {
  xs: 4,
  sm: 8,
  md: 16,
  lg: 24,
  xl: 32,
  xxl: 48,
};

// Layout constants for consistent screen structure
export const layout = {
  screenPadding: 16,    // Horizontal padding for screens
  sectionGap: 32,       // Gap between major sections (more breathing room)
  cardGap: 16,          // Gap between cards in same section
  internalGap: 8,       // Gap within cards
};

export const borderRadius = {
  sm: 8,
  md: 12,
  lg: 16,
  xl: 24,
  full: 9999,
};

export const typography = {
  // Scaled font sizes (respects system accessibility settings)
  xs: scaledFont(12),
  sm: scaledFont(14),
  md: scaledFont(16),
  lg: scaledFont(18),
  xl: scaledFont(24),
  xxl: scaledFont(32),

  // Font weights (as strings for RN)
  regular: '400' as const,
  medium: '500' as const,
  semibold: '600' as const,
  bold: '700' as const,
};

// Unscaled typography for components that need fixed sizes
export const typographyFixed = {
  xs: 12,
  sm: 14,
  md: 16,
  lg: 18,
  xl: 24,
  xxl: 32,
};

export const shadows = {
  sm: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 4,
    elevation: 2,
  },
  md: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 4,
  },
  lg: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.25,
    shadowRadius: 16,
    elevation: 8,
  },
  glow: {
    shadowColor: '#C9A961',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.3,
    shadowRadius: 12,
    elevation: 4,
  },
  glowMedium: {
    shadowColor: '#C9A961',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.4,
    shadowRadius: 16,
    elevation: 5,
  },
  glowIntense: {
    shadowColor: '#C9A961',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.5,
    shadowRadius: 20,
    elevation: 6,
  },
};

// Gradient presets for LinearGradient
export const gradients = {
  // Primary gold gradient for CTAs
  goldPrimary: ['#C9A961', '#E0C47A', '#C9A961'] as const,
  // Vertical gold gradient
  goldVertical: ['#E0C47A', '#C9A961', '#A08A4E'] as const,
  // Subtle gold for backgrounds
  goldSubtle: ['rgba(201, 169, 97, 0.3)', 'rgba(201, 169, 97, 0.1)'] as const,
  // Aurora effect for hero sections
  aurora: ['rgba(201, 169, 97, 0.15)', 'rgba(201, 169, 97, 0.05)', 'transparent'] as const,
  // Dark fade for overlays
  darkFade: ['transparent', 'rgba(10, 10, 10, 0.8)', '#0A0A0A'] as const,
  // Card highlight
  cardHighlight: ['rgba(255, 255, 255, 0.05)', 'transparent'] as const,
};

// Glassmorphism presets
export const glass = {
  light: {
    backgroundColor: 'rgba(30, 30, 30, 0.6)',
    borderColor: 'rgba(255, 255, 255, 0.08)',
    borderWidth: 1,
  },
  medium: {
    backgroundColor: 'rgba(20, 20, 20, 0.7)',
    borderColor: 'rgba(255, 255, 255, 0.1)',
    borderWidth: 1,
  },
  dark: {
    backgroundColor: 'rgba(10, 10, 10, 0.8)',
    borderColor: 'rgba(255, 255, 255, 0.05)',
    borderWidth: 1,
  },
  gold: {
    backgroundColor: 'rgba(201, 169, 97, 0.1)',
    borderColor: 'rgba(201, 169, 97, 0.2)',
    borderWidth: 1,
  },
};

// Emotion colors for simulator character states
export const emotionColors = {
  neutral: '#4A4A4A',
  happy: '#4CAF50',
  angry: '#E54545',
  sad: '#5B9BD5',
  seductive: '#E91E63',
  cold: '#607D8B',
  confused: '#FFB020',
  smirking: '#C9A961',
  concerned: '#7A8BA8',
  knowing: '#9370DB',
  serious: '#4A5568',
  pleading: '#5B9BD5',
  curious: '#F59E0B',
  hopeful: '#10B981',
} as const;

// Emotion glow effects (rgba for shadow/overlay use)
export const emotionGlows = {
  neutral: 'rgba(74, 74, 74, 0.6)',
  happy: 'rgba(76, 175, 80, 0.6)',
  angry: 'rgba(229, 69, 69, 0.7)',
  sad: 'rgba(91, 155, 213, 0.5)',
  seductive: 'rgba(233, 30, 99, 0.6)',
  cold: 'rgba(96, 125, 139, 0.5)',
  confused: 'rgba(255, 176, 32, 0.6)',
  smirking: 'rgba(201, 169, 97, 0.6)',
  concerned: 'rgba(122, 139, 168, 0.5)',
  knowing: 'rgba(147, 112, 219, 0.6)',
  serious: 'rgba(74, 85, 104, 0.5)',
  pleading: 'rgba(91, 155, 213, 0.6)',
  curious: 'rgba(245, 158, 11, 0.6)',
  hopeful: 'rgba(16, 185, 129, 0.6)',
} as const;

// Location-specific ambient colors for scene backgrounds
export const locationAmbient = {
  'coffee-shop': { particle: '#E8C078', accent: '#8B5E3C' },
  'restaurant': { particle: '#FFD700', accent: '#8B0000' },
  'bar': { particle: '#FF1493', accent: '#4B0082' },
  'park': { particle: '#90EE90', accent: '#228B22' },
  'apartment': { particle: '#FFE4B5', accent: '#8B7355' },
  'text-screen': { particle: '#00BFFF', accent: '#1E90FF' },
  'office': { particle: '#B0C4DE', accent: '#708090' },
  // University backgrounds
  'dorm-room': { particle: '#FFE4B5', accent: '#8B7355' },
  'party': { particle: '#FF69B4', accent: '#9400D3' },
  'study-hall': { particle: '#D4AF37', accent: '#8B4513' },
  'campus-quad': { particle: '#98FB98', accent: '#2E8B57' },
  'hallway': { particle: '#C0C0C0', accent: '#696969' },
  'common-room': { particle: '#FFDEAD', accent: '#A0522D' },
} as const;

// Category-specific accent colors for scenario theming
export const categoryColors = {
  narcissist: { accent: '#E91E63', glow: 'rgba(233, 30, 99, 0.25)' },
  avoidant: { accent: '#607D8B', glow: 'rgba(96, 125, 139, 0.25)' },
  gaslighter: { accent: '#9C27B0', glow: 'rgba(156, 39, 176, 0.25)' },
  healthy: { accent: '#4CAF50', glow: 'rgba(76, 175, 80, 0.25)' },
  professional: { accent: '#2196F3', glow: 'rgba(33, 150, 243, 0.25)' },
  'dating-tactics': { accent: '#FF9800', glow: 'rgba(255, 152, 0, 0.25)' },
} as const;

// Animation timing presets
export const animations = {
  // Durations in ms
  fast: 150,
  normal: 250,
  slow: 400,

  // Spring config for Reanimated
  spring: {
    damping: 15,
    stiffness: 150,
    mass: 1,
  },
  springBouncy: {
    damping: 10,
    stiffness: 180,
    mass: 0.8,
  },
  springGentle: {
    damping: 20,
    stiffness: 100,
    mass: 1,
  },
};
