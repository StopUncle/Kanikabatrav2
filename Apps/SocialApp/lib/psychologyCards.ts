// Psychology Cards - Collectible Trading Cards from Simulator Scenarios
// Earned on good outcomes (70%+ accuracy)

// Card rarity tiers based on scenario difficulty
export type CardRarity = 'common' | 'rare' | 'epic' | 'legendary';

// Card visual themes
export type CardTheme = 'defense' | 'awareness' | 'power' | 'balance' | 'mastery';

// Card stats (trading card game style)
export interface CardStats {
  manipulation_resistance: number;  // 1-10
  pattern_recognition: number;      // 1-10
  emotional_armor: number;          // 1-10
  strategic_thinking: number;       // 1-10
}

// Static card definition
export interface PsychologyCardDefinition {
  id: string;
  name: string;
  subtitle: string;
  rarity: CardRarity;
  theme: CardTheme;
  iconName: string;
  primaryColor: string;
  stats: CardStats;
  flavorText: string;
  scenarioId: string;
}

// User's earned card data
export interface EarnedCard {
  cardId: string;
  earnedAt: string;
  accuracy: number;
  isPerfect: boolean;
}

// Rarity visual configuration
export const RARITY_CONFIG: Record<CardRarity, {
  borderGradient: readonly string[];
  glowColor: string;
  glowIntensity: number;
  labelColor: string;
  badgeText: string;
}> = {
  common: {
    borderGradient: ['#4A5568', '#2D3748'],
    glowColor: 'transparent',
    glowIntensity: 0,
    labelColor: '#718096',
    badgeText: 'COMMON',
  },
  rare: {
    borderGradient: ['#3182CE', '#2B6CB0'],
    glowColor: 'rgba(49, 130, 206, 0.4)',
    glowIntensity: 0.3,
    labelColor: '#4299E1',
    badgeText: 'RARE',
  },
  epic: {
    borderGradient: ['#9F7AEA', '#805AD5'],
    glowColor: 'rgba(159, 122, 234, 0.5)',
    glowIntensity: 0.5,
    labelColor: '#B794F4',
    badgeText: 'EPIC',
  },
  legendary: {
    borderGradient: ['#F6E05E', '#D69E2E', '#C9A961'],
    glowColor: 'rgba(201, 169, 97, 0.6)',
    glowIntensity: 0.7,
    labelColor: '#F6E05E',
    badgeText: 'LEGENDARY',
  },
};

// Theme color configuration
export const THEME_COLORS: Record<CardTheme, {
  primary: string;
  secondary: string;
  icon: string;
}> = {
  defense: {
    primary: '#E91E63',
    secondary: '#FCE4EC',
    icon: 'Shield',
  },
  awareness: {
    primary: '#2196F3',
    secondary: '#E3F2FD',
    icon: 'Eye',
  },
  power: {
    primary: '#FF9800',
    secondary: '#FFF3E0',
    icon: 'Zap',
  },
  balance: {
    primary: '#4CAF50',
    secondary: '#E8F5E9',
    icon: 'Scale',
  },
  mastery: {
    primary: '#C9A961',
    secondary: '#FFF8E1',
    icon: 'Crown',
  },
};

// All psychology card definitions
export const PSYCHOLOGY_CARDS: PsychologyCardDefinition[] = [
  // Common cards (beginner scenarios)
  {
    id: 'love-bomb-defuser',
    name: 'Love Bomb Defuser',
    subtitle: 'Shield against false affection',
    rarity: 'common',
    theme: 'defense',
    iconName: 'HeartOff',
    primaryColor: '#E91E63',
    stats: {
      manipulation_resistance: 8,
      pattern_recognition: 6,
      emotional_armor: 5,
      strategic_thinking: 4,
    },
    flavorText: '"When the love feels too fast, the trap is already set."',
    scenarioId: 'narcissist-trap',
  },
  {
    id: 'green-flag-beacon',
    name: 'Green Flag Beacon',
    subtitle: 'Light in the darkness',
    rarity: 'common',
    theme: 'balance',
    iconName: 'Flag',
    primaryColor: '#4CAF50',
    stats: {
      manipulation_resistance: 4,
      pattern_recognition: 7,
      emotional_armor: 5,
      strategic_thinking: 5,
    },
    flavorText: '"Recognizing health is as important as spotting danger."',
    scenarioId: 'healthy-connection',
  },

  // Rare cards (intermediate scenarios)
  {
    id: 'push-pull-master',
    name: 'Push-Pull Master',
    subtitle: 'Dance of distance',
    rarity: 'rare',
    theme: 'awareness',
    iconName: 'RefreshCw',
    primaryColor: '#2196F3',
    stats: {
      manipulation_resistance: 6,
      pattern_recognition: 7,
      emotional_armor: 8,
      strategic_thinking: 6,
    },
    flavorText: '"They push you away to pull you closer. See the pattern."',
    scenarioId: 'avoidant-dance',
  },
  {
    id: 'reality-anchor',
    name: 'Reality Anchor',
    subtitle: 'Ground yourself in truth',
    rarity: 'rare',
    theme: 'defense',
    iconName: 'Anchor',
    primaryColor: '#E91E63',
    stats: {
      manipulation_resistance: 9,
      pattern_recognition: 7,
      emotional_armor: 6,
      strategic_thinking: 5,
    },
    flavorText: '"Your reality is valid. Never let them convince you otherwise."',
    scenarioId: 'gaslighter-escape',
  },
  {
    id: 'value-vault',
    name: 'Value Vault',
    subtitle: 'Guard your worth',
    rarity: 'rare',
    theme: 'power',
    iconName: 'Vault',
    primaryColor: '#FF9800',
    stats: {
      manipulation_resistance: 5,
      pattern_recognition: 6,
      emotional_armor: 6,
      strategic_thinking: 7,
    },
    flavorText: '"Investment should flow both ways. Demand reciprocity."',
    scenarioId: 'investment-test',
  },
  {
    id: 'silent-exit',
    name: 'Silent Exit',
    subtitle: 'Leave without a trace',
    rarity: 'rare',
    theme: 'power',
    iconName: 'DoorOpen',
    primaryColor: '#FF9800',
    stats: {
      manipulation_resistance: 5,
      pattern_recognition: 6,
      emotional_armor: 7,
      strategic_thinking: 9,
    },
    flavorText: '"Sometimes the most powerful move is simply walking away."',
    scenarioId: 'beige-escape',
  },

  // Epic cards (advanced scenarios)
  {
    id: 'corporate-shield',
    name: 'Corporate Shield',
    subtitle: 'Office warfare defense',
    rarity: 'epic',
    theme: 'power',
    iconName: 'Briefcase',
    primaryColor: '#FF9800',
    stats: {
      manipulation_resistance: 7,
      pattern_recognition: 7,
      emotional_armor: 6,
      strategic_thinking: 8,
    },
    flavorText: '"Power plays happen everywhere. Be ready."',
    scenarioId: 'power-play',
  },
  {
    id: 'options-oracle',
    name: 'Options Oracle',
    subtitle: 'Never put all eggs in one basket',
    rarity: 'epic',
    theme: 'mastery',
    iconName: 'GitBranch',
    primaryColor: '#C9A961',
    stats: {
      manipulation_resistance: 6,
      pattern_recognition: 7,
      emotional_armor: 8,
      strategic_thinking: 8,
    },
    flavorText: '"Abundance mentality is the foundation of power."',
    scenarioId: 'rotation-master',
  },
  {
    id: 'dynasty-navigator',
    name: 'Dynasty Navigator',
    subtitle: 'Master the inner circle',
    rarity: 'epic',
    theme: 'awareness',
    iconName: 'Users',
    primaryColor: '#2196F3',
    stats: {
      manipulation_resistance: 6,
      pattern_recognition: 8,
      emotional_armor: 7,
      strategic_thinking: 7,
    },
    flavorText: '"Family dynamics reveal everything. Watch closely."',
    scenarioId: 'family-introduction',
  },

  // Legendary cards (VIP/boss scenarios)
  {
    id: 'phantom-protocol',
    name: 'Phantom Protocol',
    subtitle: 'Silence is power',
    rarity: 'legendary',
    theme: 'mastery',
    iconName: 'Ghost',
    primaryColor: '#C9A961',
    stats: {
      manipulation_resistance: 7,
      pattern_recognition: 8,
      emotional_armor: 10,
      strategic_thinking: 9,
    },
    flavorText: '"When they disappear, you become the ghost."',
    scenarioId: 'the-ghost',
  },
  {
    id: 'crown-keeper',
    name: 'Crown Keeper',
    subtitle: 'Rule or be ruled',
    rarity: 'legendary',
    theme: 'mastery',
    iconName: 'Crown',
    primaryColor: '#C9A961',
    stats: {
      manipulation_resistance: 8,
      pattern_recognition: 9,
      emotional_armor: 9,
      strategic_thinking: 10,
    },
    flavorText: '"The throne belongs to those who claim it."',
    scenarioId: 'empress-move',
  },

  // ============================================
  // POWER PLAYS CARDS (Corporate/Professional)
  // ============================================

  // Rare Power Plays
  {
    id: 'territory-mapper',
    name: 'Territory Mapper',
    subtitle: 'Chart the political landscape',
    rarity: 'rare',
    theme: 'awareness',
    iconName: 'Map',
    primaryColor: '#2196F3',
    stats: {
      manipulation_resistance: 5,
      pattern_recognition: 8,
      emotional_armor: 6,
      strategic_thinking: 7,
    },
    flavorText: '"The first 90 days reveal who holds real power."',
    scenarioId: 'the-first-90-days',
  },
  {
    id: 'survivors-instinct',
    name: "Survivor's Instinct",
    subtitle: 'Sense danger before it strikes',
    rarity: 'rare',
    theme: 'defense',
    iconName: 'AlertTriangle',
    primaryColor: '#E91E63',
    stats: {
      manipulation_resistance: 7,
      pattern_recognition: 8,
      emotional_armor: 6,
      strategic_thinking: 6,
    },
    flavorText: '"When layoffs loom, survival favors the prepared."',
    scenarioId: 'the-layoff-lottery',
  },
  {
    id: 'evidence-keeper',
    name: 'Evidence Keeper',
    subtitle: 'Document everything',
    rarity: 'rare',
    theme: 'awareness',
    iconName: 'FileText',
    primaryColor: '#2196F3',
    stats: {
      manipulation_resistance: 6,
      pattern_recognition: 9,
      emotional_armor: 5,
      strategic_thinking: 7,
    },
    flavorText: '"The paper trail is your shield against stolen glory."',
    scenarioId: 'the-credit-thief',
  },

  // Epic Power Plays
  {
    id: 'the-closer',
    name: 'The Closer',
    subtitle: 'Seal the deal',
    rarity: 'epic',
    theme: 'power',
    iconName: 'Target',
    primaryColor: '#FF9800',
    stats: {
      manipulation_resistance: 6,
      pattern_recognition: 7,
      emotional_armor: 7,
      strategic_thinking: 9,
    },
    flavorText: '"Every interview is a negotiation. Close it."',
    scenarioId: 'the-interview',
  },
  {
    id: 'value-architect',
    name: 'Value Architect',
    subtitle: 'Build your worth',
    rarity: 'epic',
    theme: 'power',
    iconName: 'TrendingUp',
    primaryColor: '#FF9800',
    stats: {
      manipulation_resistance: 5,
      pattern_recognition: 7,
      emotional_armor: 8,
      strategic_thinking: 9,
    },
    flavorText: '"Never ask for what you deserve. Make them offer it."',
    scenarioId: 'the-raise-negotiation',
  },
  {
    id: 'silent-surgeon',
    name: 'Silent Surgeon',
    subtitle: 'Cut with precision',
    rarity: 'epic',
    theme: 'mastery',
    iconName: 'Scissors',
    primaryColor: '#C9A961',
    stats: {
      manipulation_resistance: 8,
      pattern_recognition: 7,
      emotional_armor: 8,
      strategic_thinking: 8,
    },
    flavorText: '"Managing down requires removing the tumor without killing the patient."',
    scenarioId: 'the-problem-employee',
  },
  {
    id: 'boardroom-sovereign',
    name: 'Boardroom Sovereign',
    subtitle: 'Command the room',
    rarity: 'epic',
    theme: 'power',
    iconName: 'Presentation',
    primaryColor: '#FF9800',
    stats: {
      manipulation_resistance: 6,
      pattern_recognition: 7,
      emotional_armor: 9,
      strategic_thinking: 8,
    },
    flavorText: '"Executive presence isn\'t born. It\'s performed."',
    scenarioId: 'the-executive-presentation',
  },

  // Legendary Power Plays
  {
    id: 'pressure-alchemist',
    name: 'Pressure Alchemist',
    subtitle: 'Turn heat into gold',
    rarity: 'legendary',
    theme: 'defense',
    iconName: 'Flame',
    primaryColor: '#E91E63',
    stats: {
      manipulation_resistance: 9,
      pattern_recognition: 8,
      emotional_armor: 10,
      strategic_thinking: 8,
    },
    flavorText: '"The impossible boss teaches you to thrive in fire."',
    scenarioId: 'the-impossible-boss',
  },
  {
    id: 'fortress-mind',
    name: 'Fortress Mind',
    subtitle: 'Impenetrable defenses',
    rarity: 'legendary',
    theme: 'defense',
    iconName: 'Castle',
    primaryColor: '#E91E63',
    stats: {
      manipulation_resistance: 10,
      pattern_recognition: 8,
      emotional_armor: 9,
      strategic_thinking: 9,
    },
    flavorText: '"When they come for your company, your mind is the last fortress."',
    scenarioId: 'the-hostile-offer',
  },
  {
    id: 'inner-circle',
    name: 'Inner Circle',
    subtitle: 'Access the elite',
    rarity: 'legendary',
    theme: 'mastery',
    iconName: 'Users',
    primaryColor: '#C9A961',
    stats: {
      manipulation_resistance: 8,
      pattern_recognition: 9,
      emotional_armor: 9,
      strategic_thinking: 10,
    },
    flavorText: '"The CEO dinner separates players from pieces."',
    scenarioId: 'the-ceo-dinner',
  },
  {
    id: 'chaos-commander',
    name: 'Chaos Commander',
    subtitle: 'Order from disorder',
    rarity: 'legendary',
    theme: 'power',
    iconName: 'AlertOctagon',
    primaryColor: '#FF9800',
    stats: {
      manipulation_resistance: 8,
      pattern_recognition: 9,
      emotional_armor: 10,
      strategic_thinking: 10,
    },
    flavorText: '"In crisis, the calm one controls the room."',
    scenarioId: 'the-crisis',
  },

  // ============================================
  // MALE VARIANT CARDS
  // ============================================

  // Common Male Cards
  {
    id: 'ego-shield',
    name: 'Ego Shield',
    subtitle: 'Protect your core',
    rarity: 'common',
    theme: 'defense',
    iconName: 'Shield',
    primaryColor: '#E91E63',
    stats: {
      manipulation_resistance: 7,
      pattern_recognition: 6,
      emotional_armor: 6,
      strategic_thinking: 4,
    },
    flavorText: '"Her admiration is a weapon. Your ego is the target."',
    scenarioId: 'male-narcissist-trap',
  },
  {
    id: 'standard-bearer',
    name: 'Standard Bearer',
    subtitle: 'Hold the line',
    rarity: 'common',
    theme: 'balance',
    iconName: 'Flag',
    primaryColor: '#4CAF50',
    stats: {
      manipulation_resistance: 5,
      pattern_recognition: 7,
      emotional_armor: 5,
      strategic_thinking: 5,
    },
    flavorText: '"Know what green flags look like before you chase red ones."',
    scenarioId: 'male-healthy-connection',
  },

  // Rare Male Cards
  {
    id: 'ice-walker',
    name: 'Ice Walker',
    subtitle: 'Navigate the cold',
    rarity: 'rare',
    theme: 'awareness',
    iconName: 'Snowflake',
    primaryColor: '#2196F3',
    stats: {
      manipulation_resistance: 6,
      pattern_recognition: 8,
      emotional_armor: 7,
      strategic_thinking: 6,
    },
    flavorText: '"She runs hot and cold. Learn to walk on ice."',
    scenarioId: 'male-avoidant-dance',
  },
  {
    id: 'truth-anchor',
    name: 'Truth Anchor',
    subtitle: 'Hold your reality',
    rarity: 'rare',
    theme: 'defense',
    iconName: 'Anchor',
    primaryColor: '#E91E63',
    stats: {
      manipulation_resistance: 9,
      pattern_recognition: 7,
      emotional_armor: 7,
      strategic_thinking: 5,
    },
    flavorText: '"She says you\'re crazy. Your memory says otherwise."',
    scenarioId: 'male-gaslighter-escape',
  },
  {
    id: 'field-general',
    name: 'Field General',
    subtitle: 'Command the field',
    rarity: 'rare',
    theme: 'power',
    iconName: 'Crosshair',
    primaryColor: '#FF9800',
    stats: {
      manipulation_resistance: 5,
      pattern_recognition: 7,
      emotional_armor: 7,
      strategic_thinking: 8,
    },
    flavorText: '"Options aren\'t backup plans. They\'re leverage."',
    scenarioId: 'male-rotation-master',
  },

  // Epic Male Cards
  {
    id: 'suit-of-armor',
    name: 'Suit of Armor',
    subtitle: 'Office battleready',
    rarity: 'epic',
    theme: 'power',
    iconName: 'Briefcase',
    primaryColor: '#FF9800',
    stats: {
      manipulation_resistance: 7,
      pattern_recognition: 7,
      emotional_armor: 8,
      strategic_thinking: 8,
    },
    flavorText: '"Corporate manipulation doesn\'t discriminate."',
    scenarioId: 'male-power-play',
  },
  {
    id: 'shadow-king',
    name: 'Shadow King',
    subtitle: 'Rule from silence',
    rarity: 'epic',
    theme: 'mastery',
    iconName: 'Moon',
    primaryColor: '#C9A961',
    stats: {
      manipulation_resistance: 7,
      pattern_recognition: 8,
      emotional_armor: 9,
      strategic_thinking: 8,
    },
    flavorText: '"When she ghosts, become the shadow she can\'t escape."',
    scenarioId: 'male-the-ghost',
  },

  // Legendary Male Cards
  {
    id: 'crown-prince',
    name: 'Crown Prince',
    subtitle: 'Claim your throne',
    rarity: 'legendary',
    theme: 'mastery',
    iconName: 'Crown',
    primaryColor: '#C9A961',
    stats: {
      manipulation_resistance: 8,
      pattern_recognition: 9,
      emotional_armor: 9,
      strategic_thinking: 10,
    },
    flavorText: '"The emperor doesn\'t chase. He attracts."',
    scenarioId: 'male-emperor-move',
  },

  // ============================================
  // MULTI-PART / EXTENDED SCENARIO CARDS
  // ============================================

  // Rare Extended Cards
  {
    id: 'red-flag-radar',
    name: 'Red Flag Radar',
    subtitle: 'Detect danger early',
    rarity: 'rare',
    theme: 'awareness',
    iconName: 'Radio',
    primaryColor: '#2196F3',
    stats: {
      manipulation_resistance: 7,
      pattern_recognition: 9,
      emotional_armor: 5,
      strategic_thinking: 6,
    },
    flavorText: '"First dates reveal everything. If you know what to look for."',
    scenarioId: 'first-date-from-hell',
  },
  {
    id: 'wall-climber',
    name: 'Wall Climber',
    subtitle: 'Scale their defenses',
    rarity: 'rare',
    theme: 'balance',
    iconName: 'Mountain',
    primaryColor: '#4CAF50',
    stats: {
      manipulation_resistance: 5,
      pattern_recognition: 8,
      emotional_armor: 7,
      strategic_thinking: 7,
    },
    flavorText: '"Dismissive walls weren\'t built in a day. Patience climbs them."',
    scenarioId: 'dismissive-avoidant',
  },
  {
    id: 'promise-auditor',
    name: 'Promise Auditor',
    subtitle: 'Words vs. actions',
    rarity: 'rare',
    theme: 'awareness',
    iconName: 'ClipboardCheck',
    primaryColor: '#2196F3',
    stats: {
      manipulation_resistance: 8,
      pattern_recognition: 9,
      emotional_armor: 5,
      strategic_thinking: 6,
    },
    flavorText: '"Beautiful futures cost nothing to promise. Watch the present."',
    scenarioId: 'future-faker',
  },
  {
    id: 'crumb-crusher',
    name: 'Crumb Crusher',
    subtitle: 'Demand the whole loaf',
    rarity: 'rare',
    theme: 'defense',
    iconName: 'Cookie',
    primaryColor: '#E91E63',
    stats: {
      manipulation_resistance: 8,
      pattern_recognition: 7,
      emotional_armor: 6,
      strategic_thinking: 6,
    },
    flavorText: '"Breadcrumbs aren\'t a meal. Stop accepting scraps."',
    scenarioId: 'breadcrumber',
  },

  // Epic Extended Cards
  {
    id: 'social-fortress',
    name: 'Social Fortress',
    subtitle: 'Survive the gauntlet',
    rarity: 'epic',
    theme: 'defense',
    iconName: 'Castle',
    primaryColor: '#E91E63',
    stats: {
      manipulation_resistance: 8,
      pattern_recognition: 8,
      emotional_armor: 9,
      strategic_thinking: 7,
    },
    flavorText: '"Wedding weekends expose every crack. Build your fortress."',
    scenarioId: 'wedding-weekend',
  },
  {
    id: 'clean-cut',
    name: 'Clean Cut',
    subtitle: 'Sever completely',
    rarity: 'epic',
    theme: 'mastery',
    iconName: 'Scissors',
    primaryColor: '#C9A961',
    stats: {
      manipulation_resistance: 9,
      pattern_recognition: 7,
      emotional_armor: 9,
      strategic_thinking: 8,
    },
    flavorText: '"A clean break hurts once. A messy one hurts forever."',
    scenarioId: 'clean-break',
  },
  {
    id: 'mask-detector',
    name: 'Mask Detector',
    subtitle: 'See through the victim',
    rarity: 'epic',
    theme: 'awareness',
    iconName: 'Search',
    primaryColor: '#2196F3',
    stats: {
      manipulation_resistance: 9,
      pattern_recognition: 10,
      emotional_armor: 6,
      strategic_thinking: 7,
    },
    flavorText: '"The covert narcissist hides in plain sight. Learn to see."',
    scenarioId: 'covert-narcissist',
  },
];

// Card registry by ID
export const cardsById: Record<string, PsychologyCardDefinition> =
  PSYCHOLOGY_CARDS.reduce((acc, card) => {
    acc[card.id] = card;
    return acc;
  }, {} as Record<string, PsychologyCardDefinition>);

// Card registry by scenario ID
export const cardsByScenarioId: Record<string, PsychologyCardDefinition> =
  PSYCHOLOGY_CARDS.reduce((acc, card) => {
    acc[card.scenarioId] = card;
    return acc;
  }, {} as Record<string, PsychologyCardDefinition>);

// Helper functions
export function getCardById(cardId: string): PsychologyCardDefinition | null {
  return cardsById[cardId] || null;
}

export function getCardByScenarioId(scenarioId: string): PsychologyCardDefinition | null {
  return cardsByScenarioId[scenarioId] || null;
}

export function getAllCards(): PsychologyCardDefinition[] {
  return PSYCHOLOGY_CARDS;
}

export function getCardsByRarity(rarity: CardRarity): PsychologyCardDefinition[] {
  return PSYCHOLOGY_CARDS.filter(card => card.rarity === rarity);
}

export function getCardsByTheme(theme: CardTheme): PsychologyCardDefinition[] {
  return PSYCHOLOGY_CARDS.filter(card => card.theme === theme);
}

// Calculate total stats from earned cards
export function calculateTotalStats(earnedCardIds: string[]): CardStats {
  const total: CardStats = {
    manipulation_resistance: 0,
    pattern_recognition: 0,
    emotional_armor: 0,
    strategic_thinking: 0,
  };

  for (const cardId of earnedCardIds) {
    const card = getCardById(cardId);
    if (card) {
      total.manipulation_resistance += card.stats.manipulation_resistance;
      total.pattern_recognition += card.stats.pattern_recognition;
      total.emotional_armor += card.stats.emotional_armor;
      total.strategic_thinking += card.stats.strategic_thinking;
    }
  }

  return total;
}

// Collection statistics
export interface CollectionStats {
  total: number;
  earned: number;
  percentage: number;
  byRarity: Record<CardRarity, { total: number; earned: number }>;
  totalStats: CardStats;
}

export function getCollectionStats(earnedCardIds: string[]): CollectionStats {
  const earnedSet = new Set(earnedCardIds);
  const byRarity: Record<CardRarity, { total: number; earned: number }> = {
    common: { total: 0, earned: 0 },
    rare: { total: 0, earned: 0 },
    epic: { total: 0, earned: 0 },
    legendary: { total: 0, earned: 0 },
  };

  for (const card of PSYCHOLOGY_CARDS) {
    byRarity[card.rarity].total++;
    if (earnedSet.has(card.id)) {
      byRarity[card.rarity].earned++;
    }
  }

  const total = PSYCHOLOGY_CARDS.length;
  const earned = earnedCardIds.length;

  return {
    total,
    earned,
    percentage: total > 0 ? Math.round((earned / total) * 100) : 0,
    byRarity,
    totalStats: calculateTotalStats(earnedCardIds),
  };
}
