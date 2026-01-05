// Silhouette Configuration System
// Creates visually distinct character body shapes

export type SilhouetteType =
  | 'male-athletic'
  | 'male-lean'
  | 'male-imposing'
  | 'female-elegant'
  | 'female-athletic'
  | 'female-soft'
  | 'maris-caldwell'
  | 'authority-cap'
  | 'hair-styled'
  | 'hair-ponytail'
  | 'hair-short'
  | 'default';

export type HeadShape = 'circle' | 'oval' | 'square';
export type HairOverlay = 'cap' | 'styled' | 'ponytail' | 'short' | 'flowing' | null;

export interface SilhouetteConfig {
  // Base multipliers (1.0 = medium size default)
  headWidthMult: number;
  headHeightMult: number;
  shoulderWidthMult: number;
  neckWidthMult: number;
  neckHeightMult: number;
  torsoHeightMult: number;

  // Shape modifiers
  headShape: HeadShape;
  shoulderRounding: number; // 10-50 for border radius

  // Hair/hat overlay
  hairOverlay: HairOverlay;
}

// All silhouette configurations
export const SILHOUETTE_CONFIGS: Record<SilhouetteType, SilhouetteConfig> = {
  // Male body types
  'male-athletic': {
    headWidthMult: 1.1,
    headHeightMult: 1.0,
    shoulderWidthMult: 1.4,
    neckWidthMult: 1.25,
    neckHeightMult: 0.85,
    torsoHeightMult: 1.1,
    headShape: 'square',
    shoulderRounding: 30,
    hairOverlay: null,
  },
  'male-lean': {
    headWidthMult: 0.9,
    headHeightMult: 1.15,
    shoulderWidthMult: 0.9,
    neckWidthMult: 0.85,
    neckHeightMult: 1.2,
    torsoHeightMult: 1.15,
    headShape: 'oval',
    shoulderRounding: 35,
    hairOverlay: null,
  },
  'male-imposing': {
    headWidthMult: 1.2,
    headHeightMult: 1.05,
    shoulderWidthMult: 1.6,
    neckWidthMult: 1.4,
    neckHeightMult: 0.7,
    torsoHeightMult: 1.2,
    headShape: 'square',
    shoulderRounding: 25,
    hairOverlay: null,
  },

  // Female body types
  'female-elegant': {
    headWidthMult: 0.88,
    headHeightMult: 1.1,
    shoulderWidthMult: 0.82,
    neckWidthMult: 0.75,
    neckHeightMult: 1.35,
    torsoHeightMult: 0.92,
    headShape: 'oval',
    shoulderRounding: 42,
    hairOverlay: null,
  },
  'female-athletic': {
    headWidthMult: 0.95,
    headHeightMult: 1.0,
    shoulderWidthMult: 1.0,
    neckWidthMult: 0.9,
    neckHeightMult: 1.0,
    torsoHeightMult: 1.0,
    headShape: 'oval',
    shoulderRounding: 38,
    hairOverlay: null,
  },
  'female-soft': {
    headWidthMult: 0.95,
    headHeightMult: 0.95,
    shoulderWidthMult: 0.88,
    neckWidthMult: 0.85,
    neckHeightMult: 0.95,
    torsoHeightMult: 0.9,
    headShape: 'circle',
    shoulderRounding: 45,
    hairOverlay: null,
  },

  // Maris Caldwell - elite psychopath antagonist
  'maris-caldwell': {
    headWidthMult: 0.85, // Smaller head = appears taller
    headHeightMult: 1.15, // Elongated, refined
    shoulderWidthMult: 0.88, // Narrow but defined
    neckWidthMult: 0.68, // Very slender neck
    neckHeightMult: 1.5, // Dramatically long neck
    torsoHeightMult: 0.88, // Shorter torso (more elegant)
    headShape: 'oval', // Refined, aristocratic
    shoulderRounding: 45, // Smooth, feminine
    hairOverlay: null, // Clean silhouette - proportions are distinctive enough
  },

  // With hair/accessories
  'authority-cap': {
    headWidthMult: 1.0,
    headHeightMult: 1.0,
    shoulderWidthMult: 1.05,
    neckWidthMult: 1.0,
    neckHeightMult: 0.95,
    torsoHeightMult: 1.0,
    headShape: 'oval',
    shoulderRounding: 32,
    hairOverlay: 'cap',
  },
  'hair-styled': {
    headWidthMult: 0.92,
    headHeightMult: 1.05,
    shoulderWidthMult: 0.88,
    neckWidthMult: 0.82,
    neckHeightMult: 1.15,
    torsoHeightMult: 0.95,
    headShape: 'oval',
    shoulderRounding: 40,
    hairOverlay: 'styled',
  },
  'hair-ponytail': {
    headWidthMult: 0.9,
    headHeightMult: 1.08,
    shoulderWidthMult: 0.85,
    neckWidthMult: 0.78,
    neckHeightMult: 1.25,
    torsoHeightMult: 0.93,
    headShape: 'oval',
    shoulderRounding: 42,
    hairOverlay: 'ponytail',
  },
  'hair-short': {
    headWidthMult: 1.0,
    headHeightMult: 1.02,
    shoulderWidthMult: 0.95,
    neckWidthMult: 0.92,
    neckHeightMult: 1.0,
    torsoHeightMult: 0.98,
    headShape: 'oval',
    shoulderRounding: 36,
    hairOverlay: 'short',
  },

  // Default fallback
  default: {
    headWidthMult: 1.0,
    headHeightMult: 1.0,
    shoulderWidthMult: 1.0,
    neckWidthMult: 1.0,
    neckHeightMult: 1.0,
    torsoHeightMult: 1.0,
    headShape: 'oval',
    shoulderRounding: 35,
    hairOverlay: null,
  },
};

// Get silhouette config with fallback
export function getSilhouetteConfig(type?: SilhouetteType): SilhouetteConfig {
  if (!type || !(type in SILHOUETTE_CONFIGS)) {
    return SILHOUETTE_CONFIGS.default;
  }
  return SILHOUETTE_CONFIGS[type];
}

// Calculate head border radius based on shape and size
export function getHeadBorderRadius(shape: HeadShape, width: number, height: number): number {
  switch (shape) {
    case 'circle':
      return Math.max(width, height) / 2;
    case 'oval':
      return Math.min(width, height) / 2;
    case 'square':
      // Square jaw = less rounded bottom, more rounded top
      return width * 0.35;
    default:
      return width / 2;
  }
}

// Hair overlay dimensions based on head size
export interface HairDimensions {
  width: number;
  height: number;
  offsetX: number;
  offsetY: number;
}

export function getHairDimensions(
  overlay: HairOverlay,
  headWidth: number,
  headHeight: number
): HairDimensions | null {
  if (!overlay) return null;

  switch (overlay) {
    case 'cap':
      // Cap is wider than head - center it: offsetX = (headWidth - capWidth) / 2
      const capWidth = headWidth * 1.15;
      return {
        width: capWidth,
        height: headHeight * 0.35,
        offsetX: (headWidth - capWidth) / 2, // Negative value to center wider element
        offsetY: -headHeight * 0.25,
      };
    case 'styled':
      return {
        width: headWidth * 0.65,
        height: headHeight * 0.45,
        offsetX: headWidth * 0.3,
        offsetY: -headHeight * 0.2,
      };
    case 'ponytail':
      return {
        width: headWidth * 0.3,
        height: headHeight * 0.8,
        offsetX: -headWidth * 0.45,
        offsetY: headHeight * 0.15,
      };
    case 'short':
      // Short hair is slightly wider than head - center it
      const shortWidth = headWidth * 1.08;
      return {
        width: shortWidth,
        height: headHeight * 0.25,
        offsetX: (headWidth - shortWidth) / 2, // Negative value to center
        offsetY: -headHeight * 0.2,
      };
    case 'flowing':
      // Elegant side-swept hair - positioned above head
      return {
        width: headWidth * 0.7,
        height: headHeight * 0.5,
        offsetX: -headWidth * 0.15,
        offsetY: -headHeight * 0.3,
      };
    default:
      return null;
  }
}
