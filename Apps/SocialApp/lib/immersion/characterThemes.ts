// Character Themes - Color palettes for each personality type
// Creates instant visual differentiation between characters

export type PersonalityCategory =
  // Cluster B (Dramatic/Erratic)
  | 'narcissist'      // NPD
  | 'borderline'      // BPD
  | 'histrionic'      // HPD
  | 'antisocial'      // ASPD (generic)
  | 'psychopath'      // ASPD Factor 1
  | 'sociopath'       // ASPD Factor 2
  // Cluster A (Odd/Eccentric)
  | 'paranoid'        // PPD
  | 'schizoid'        // SPD
  | 'schizotypal'     // STPD
  // Cluster C (Anxious/Fearful)
  | 'avoidant'        // AvPD
  | 'dependent'       // DPD
  | 'obsessive'       // OCPD
  // Mood Disorders
  | 'bipolar'         // BD
  | 'depressive'      // MDD
  // Attachment Styles
  | 'anxious-attached'    // AP
  | 'fearful-avoidant'    // FA
  | 'dismissive-avoidant' // DA
  | 'secure'              // Secure
  // Non-Clinical Roles
  | 'predator'        // Dangerous (legacy)
  | 'healthy'         // Ally
  | 'friend'          // Friend
  | 'authority'       // Authority figure
  | 'competitor'      // Rival
  | 'neutral';        // Unknown

export interface CharacterTheme {
  id: PersonalityCategory;
  primary: string;
  secondary: string;
  glow: string;
  textColor: string;
  danger: boolean;
  intensity: number; // 0-1, how strong the theme tints the UI
}

export const CHARACTER_THEMES: Record<PersonalityCategory, CharacterTheme> = {
  // ============================================
  // CLUSTER B - Dramatic/Erratic
  // ============================================
  narcissist: {
    id: 'narcissist',
    primary: '#8B5CF6', // Purple - grandiosity, manipulation
    secondary: '#C9A961',
    glow: 'rgba(139, 92, 246, 0.3)',
    textColor: '#DDD6FE',
    danger: true,
    intensity: 0.8,
  },
  borderline: {
    id: 'borderline',
    primary: '#EC4899', // Pink/Magenta - emotional intensity, instability
    secondary: '#BE185D',
    glow: 'rgba(236, 72, 153, 0.35)',
    textColor: '#FBCFE8',
    danger: true,
    intensity: 0.85,
  },
  histrionic: {
    id: 'histrionic',
    primary: '#F472B6', // Light pink - attention-seeking, theatrical
    secondary: '#DB2777',
    glow: 'rgba(244, 114, 182, 0.3)',
    textColor: '#FCE7F3',
    danger: false,
    intensity: 0.7,
  },
  antisocial: {
    id: 'antisocial',
    primary: '#991B1B', // Dark red - disregard for others
    secondary: '#450A0A',
    glow: 'rgba(153, 27, 27, 0.4)',
    textColor: '#FECACA',
    danger: true,
    intensity: 0.9,
  },
  psychopath: {
    id: 'psychopath',
    primary: '#7F1D1D', // Darker red - cold, calculating (Factor 1)
    secondary: '#1C1917',
    glow: 'rgba(127, 29, 29, 0.45)',
    textColor: '#FCA5A5',
    danger: true,
    intensity: 1.0,
  },
  sociopath: {
    id: 'sociopath',
    primary: '#B91C1C', // Brighter red - impulsive, volatile (Factor 2)
    secondary: '#292524',
    glow: 'rgba(185, 28, 28, 0.4)',
    textColor: '#FECACA',
    danger: true,
    intensity: 0.95,
  },

  // ============================================
  // CLUSTER A - Odd/Eccentric
  // ============================================
  paranoid: {
    id: 'paranoid',
    primary: '#854D0E', // Dark amber - suspicion, distrust
    secondary: '#451A03',
    glow: 'rgba(133, 77, 14, 0.3)',
    textColor: '#FDE68A',
    danger: false,
    intensity: 0.6,
  },
  schizoid: {
    id: 'schizoid',
    primary: '#475569', // Cool gray - detachment, isolation
    secondary: '#1E293B',
    glow: 'rgba(71, 85, 105, 0.2)',
    textColor: '#CBD5E1',
    danger: false,
    intensity: 0.4,
  },
  schizotypal: {
    id: 'schizotypal',
    primary: '#6366F1', // Indigo - eccentric, unusual
    secondary: '#3730A3',
    glow: 'rgba(99, 102, 241, 0.3)',
    textColor: '#C7D2FE',
    danger: false,
    intensity: 0.55,
  },

  // ============================================
  // CLUSTER C - Anxious/Fearful
  // ============================================
  avoidant: {
    id: 'avoidant',
    primary: '#64748B', // Slate - detachment, walls
    secondary: '#94A3B8',
    glow: 'rgba(100, 116, 139, 0.2)',
    textColor: '#CBD5E1',
    danger: false,
    intensity: 0.5,
  },
  dependent: {
    id: 'dependent',
    primary: '#0891B2', // Cyan - clinginess, neediness
    secondary: '#155E75',
    glow: 'rgba(8, 145, 178, 0.25)',
    textColor: '#A5F3FC',
    danger: false,
    intensity: 0.5,
  },
  obsessive: {
    id: 'obsessive',
    primary: '#0F766E', // Teal - rigidity, perfectionism
    secondary: '#134E4A',
    glow: 'rgba(15, 118, 110, 0.25)',
    textColor: '#99F6E4',
    danger: false,
    intensity: 0.55,
  },

  // ============================================
  // MOOD DISORDERS
  // ============================================
  bipolar: {
    id: 'bipolar',
    primary: '#FBBF24', // Amber/Yellow - mood swings, energy
    secondary: '#D97706',
    glow: 'rgba(251, 191, 36, 0.3)',
    textColor: '#FEF3C7',
    danger: false,
    intensity: 0.7,
  },
  depressive: {
    id: 'depressive',
    primary: '#4B5563', // Dark gray - low mood, withdrawal
    secondary: '#1F2937',
    glow: 'rgba(75, 85, 99, 0.2)',
    textColor: '#D1D5DB',
    danger: false,
    intensity: 0.4,
  },

  // ============================================
  // ATTACHMENT STYLES
  // ============================================
  'anxious-attached': {
    id: 'anxious-attached',
    primary: '#F59E0B', // Amber - anxiety, need for reassurance
    secondary: '#B45309',
    glow: 'rgba(245, 158, 11, 0.25)',
    textColor: '#FDE68A',
    danger: false,
    intensity: 0.55,
  },
  'fearful-avoidant': {
    id: 'fearful-avoidant',
    primary: '#78716C', // Stone - push-pull, confusion
    secondary: '#44403C',
    glow: 'rgba(120, 113, 108, 0.2)',
    textColor: '#D6D3D1',
    danger: false,
    intensity: 0.5,
  },
  'dismissive-avoidant': {
    id: 'dismissive-avoidant',
    primary: '#57534E', // Darker stone - walls, independence
    secondary: '#292524',
    glow: 'rgba(87, 83, 78, 0.2)',
    textColor: '#E7E5E4',
    danger: false,
    intensity: 0.45,
  },
  secure: {
    id: 'secure',
    primary: '#16A34A', // Green - healthy, balanced
    secondary: '#15803D',
    glow: 'rgba(22, 163, 74, 0.2)',
    textColor: '#BBF7D0',
    danger: false,
    intensity: 0.35,
  },

  // ============================================
  // NON-CLINICAL ROLES
  // ============================================
  predator: {
    id: 'predator',
    primary: '#DC2626', // Deep red - danger (legacy)
    secondary: '#1F1F1F',
    glow: 'rgba(220, 38, 38, 0.4)',
    textColor: '#FCA5A5',
    danger: true,
    intensity: 1.0,
  },
  healthy: {
    id: 'healthy',
    primary: '#22C55E', // Green - safety, growth
    secondary: '#C9A961',
    glow: 'rgba(34, 197, 94, 0.2)',
    textColor: '#BBF7D0',
    danger: false,
    intensity: 0.4,
  },
  friend: {
    id: 'friend',
    primary: '#C9A961', // Gold - warmth, trust
    secondary: '#F5F5F5',
    glow: 'rgba(201, 169, 97, 0.2)',
    textColor: '#FEF3C7',
    danger: false,
    intensity: 0.3,
  },
  authority: {
    id: 'authority',
    primary: '#3B82F6', // Blue - control, respect
    secondary: '#1E40AF',
    glow: 'rgba(59, 130, 246, 0.25)',
    textColor: '#BFDBFE',
    danger: false,
    intensity: 0.5,
  },
  competitor: {
    id: 'competitor',
    primary: '#F97316', // Orange - energy, rivalry
    secondary: '#EA580C',
    glow: 'rgba(249, 115, 22, 0.25)',
    textColor: '#FED7AA',
    danger: false,
    intensity: 0.6,
  },
  neutral: {
    id: 'neutral',
    primary: '#A1A1AA', // Gray - unknown
    secondary: '#71717A',
    glow: 'rgba(161, 161, 170, 0.15)',
    textColor: '#E4E4E7',
    danger: false,
    intensity: 0.2,
  },
};

// Personality type keywords to theme mapping
const PERSONALITY_KEYWORDS: Record<string, PersonalityCategory> = {
  // ============================================
  // CLUSTER B - Dramatic/Erratic
  // ============================================
  // NPD - Narcissistic Personality Disorder
  narcissist: 'narcissist',
  npd: 'narcissist',
  covert: 'narcissist',
  grandiose: 'narcissist',
  malignant: 'narcissist',
  communal: 'narcissist',

  // BPD - Borderline Personality Disorder
  borderline: 'borderline',
  bpd: 'borderline',

  // HPD - Histrionic Personality Disorder
  histrionic: 'histrionic',
  hpd: 'histrionic',
  theatrical: 'histrionic',

  // ASPD - Antisocial Personality Disorder
  antisocial: 'antisocial',
  aspd: 'antisocial',

  // ASPD Factor 1 - Psychopathy
  psychopath: 'psychopath',
  'aspd-1': 'psychopath',
  'factor-1': 'psychopath',
  'primary-psychopath': 'psychopath',

  // ASPD Factor 2 - Sociopathy
  sociopath: 'sociopath',
  'aspd-2': 'sociopath',
  'factor-2': 'sociopath',
  'secondary-psychopath': 'sociopath',

  // ============================================
  // CLUSTER A - Odd/Eccentric
  // ============================================
  // PPD - Paranoid Personality Disorder
  paranoid: 'paranoid',
  ppd: 'paranoid',
  suspicious: 'paranoid',

  // SPD - Schizoid Personality Disorder
  schizoid: 'schizoid',
  spd: 'schizoid',

  // STPD - Schizotypal Personality Disorder
  schizotypal: 'schizotypal',
  stpd: 'schizotypal',
  eccentric: 'schizotypal',

  // ============================================
  // CLUSTER C - Anxious/Fearful
  // ============================================
  // AvPD - Avoidant Personality Disorder
  avoidant: 'avoidant',
  avpd: 'avoidant',
  wallflower: 'avoidant',
  withdrawn: 'avoidant',

  // DPD - Dependent Personality Disorder
  dependent: 'dependent',
  dpd: 'dependent',
  clingy: 'dependent',
  needy: 'dependent',

  // OCPD - Obsessive-Compulsive Personality Disorder
  obsessive: 'obsessive',
  ocpd: 'obsessive',
  perfectionist: 'obsessive',
  rigid: 'obsessive',

  // ============================================
  // MOOD DISORDERS
  // ============================================
  bipolar: 'bipolar',
  bd: 'bipolar',
  manic: 'bipolar',

  depressive: 'depressive',
  mdd: 'depressive',
  depressed: 'depressive',

  // ============================================
  // ATTACHMENT STYLES
  // ============================================
  'anxious-attached': 'anxious-attached',
  'anxious-preoccupied': 'anxious-attached',
  ap: 'anxious-attached',

  'fearful-avoidant': 'fearful-avoidant',
  fa: 'fearful-avoidant',
  disorganized: 'fearful-avoidant',

  'dismissive-avoidant': 'dismissive-avoidant',
  da: 'dismissive-avoidant',
  dismissive: 'dismissive-avoidant',

  secure: 'secure',
  'securely-attached': 'secure',

  // ============================================
  // NON-CLINICAL ROLES
  // ============================================
  predator: 'predator',
  dangerous: 'predator',

  healthy: 'healthy',
  balanced: 'healthy',
  grounded: 'healthy',

  friend: 'friend',
  ally: 'friend',
  supportive: 'friend',
  loyal: 'friend',
  genuine: 'friend',

  authority: 'authority',
  gatekeeper: 'authority',
  leader: 'authority',
  boss: 'authority',

  competitor: 'competitor',
  rival: 'competitor',
  ambitious: 'competitor',
  networker: 'competitor',
  chameleon: 'competitor',
  magnet: 'competitor',
};

/**
 * Get character theme from personality type string
 * Matches keywords in the personality description
 */
export function getCharacterTheme(personalityType: string): CharacterTheme {
  const lowerType = personalityType.toLowerCase();

  // Check for keyword matches
  for (const [keyword, category] of Object.entries(PERSONALITY_KEYWORDS)) {
    if (lowerType.includes(keyword)) {
      return CHARACTER_THEMES[category];
    }
  }

  // Default to neutral if no match
  return CHARACTER_THEMES.neutral;
}

/**
 * Get theme by category directly
 */
export function getThemeByCategory(category: PersonalityCategory): CharacterTheme {
  return CHARACTER_THEMES[category];
}

/**
 * Check if a theme represents danger
 */
export function isThemeDangerous(theme: CharacterTheme): boolean {
  return theme.danger;
}

/**
 * Get CSS-like gradient for theme
 */
export function getThemeGradient(theme: CharacterTheme, direction: 'vertical' | 'horizontal' = 'vertical'): string[] {
  return [
    theme.primary,
    theme.secondary,
  ];
}

/**
 * Get appropriate text color for theme background
 */
export function getContrastTextColor(theme: CharacterTheme): string {
  return theme.textColor;
}

/**
 * Display labels for personality categories (clinical terms)
 */
export const PERSONALITY_LABELS: Record<PersonalityCategory, string> = {
  // Cluster B
  narcissist: 'NPD',
  borderline: 'BPD',
  histrionic: 'HPD',
  antisocial: 'ASPD',
  psychopath: 'ASPD (Factor 1)',
  sociopath: 'ASPD (Factor 2)',
  // Cluster A
  paranoid: 'PPD',
  schizoid: 'SPD',
  schizotypal: 'STPD',
  // Cluster C
  avoidant: 'AvPD',
  dependent: 'DPD',
  obsessive: 'OCPD',
  // Mood Disorders
  bipolar: 'Bipolar',
  depressive: 'MDD',
  // Attachment Styles
  'anxious-attached': 'Anxious Attachment',
  'fearful-avoidant': 'Fearful Avoidant',
  'dismissive-avoidant': 'Dismissive Avoidant',
  secure: 'Secure',
  // Non-Clinical
  predator: 'Predator',
  healthy: 'Ally',
  friend: 'Friend',
  authority: 'Authority',
  competitor: 'Rival',
  neutral: 'Unknown',
};

/**
 * Short codes for compact UI (presence strip)
 */
export const PERSONALITY_SHORT_CODES: Record<PersonalityCategory, string> = {
  // Cluster B
  narcissist: 'NPD',
  borderline: 'BPD',
  histrionic: 'HPD',
  antisocial: 'ASPD',
  psychopath: 'ASPD-1',
  sociopath: 'ASPD-2',
  // Cluster A
  paranoid: 'PPD',
  schizoid: 'SPD',
  schizotypal: 'STPD',
  // Cluster C
  avoidant: 'AvPD',
  dependent: 'DPD',
  obsessive: 'OCPD',
  // Mood Disorders
  bipolar: 'BD',
  depressive: 'MDD',
  // Attachment Styles
  'anxious-attached': 'AP',
  'fearful-avoidant': 'FA',
  'dismissive-avoidant': 'DA',
  secure: 'SECURE',
  // Non-Clinical
  predator: 'PRED',
  healthy: 'ALLY',
  friend: 'FRIEND',
  authority: 'AUTH',
  competitor: 'RIVAL',
  neutral: '???',
};

/**
 * Get display label from personality type string
 * Returns clinical term for UI display
 */
export function getDisplayLabel(personalityType?: string): string {
  if (!personalityType) return PERSONALITY_LABELS.neutral;

  const lowerType = personalityType.toLowerCase();

  // Check for keyword matches
  for (const [keyword, category] of Object.entries(PERSONALITY_KEYWORDS)) {
    if (lowerType.includes(keyword)) {
      return PERSONALITY_LABELS[category];
    }
  }

  return PERSONALITY_LABELS.neutral;
}

/**
 * Get short code from personality type string
 * Returns compact code for small UI elements (presence strip)
 */
export function getShortLabel(personalityType?: string): string {
  if (!personalityType) return PERSONALITY_SHORT_CODES.neutral;

  const lowerType = personalityType.toLowerCase();

  // Check for keyword matches
  for (const [keyword, category] of Object.entries(PERSONALITY_KEYWORDS)) {
    if (lowerType.includes(keyword)) {
      return PERSONALITY_SHORT_CODES[category];
    }
  }

  return PERSONALITY_SHORT_CODES.neutral;
}

export default CHARACTER_THEMES;
