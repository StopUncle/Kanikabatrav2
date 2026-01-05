// Empress Academy Skill Trees
// 5 interconnected skill trees for mastery

import { SkillTree, Skill, SkillTreeId } from './types';

// Psychology Tree - Understanding human behavior
const PSYCHOLOGY_SKILLS: Skill[] = [
  // Tier 1
  {
    id: 'psy_001',
    treeId: 'psychology',
    name: 'Read the Room',
    description: 'Recognize emotional undercurrents in social situations',
    icon: 'Eye',
    tier: 1,
    xpCost: 0,
    prerequisites: [],
    effects: ['Unlock: Mood detection basics', 'Daily insight: Body language tip'],
    tier_required: 'free',
  },
  {
    id: 'psy_002',
    treeId: 'psychology',
    name: 'Ego Mapping',
    description: 'Identify what drives different personalities',
    icon: 'Brain',
    tier: 1,
    xpCost: 100,
    prerequisites: ['psy_001'],
    effects: ['Unlock: Personality profiling', 'Scanner bonus: Ego patterns'],
    tier_required: 'free',
  },
  // Tier 2
  {
    id: 'psy_003',
    treeId: 'psychology',
    name: 'Attachment Styles',
    description: 'Understand how people bond and why they pull away',
    icon: 'Heart',
    tier: 2,
    xpCost: 150,
    prerequisites: ['psy_002'],
    effects: ['Unlock: Attachment type quiz', 'Better relationship predictions'],
    tier_required: 'premium',
  },
  {
    id: 'psy_004',
    treeId: 'psychology',
    name: 'Defense Mechanisms',
    description: 'Recognize when others are protecting their ego',
    icon: 'Shield',
    tier: 2,
    xpCost: 150,
    prerequisites: ['psy_002'],
    effects: ['Unlock: Defense detection', 'Counter-manipulation awareness'],
    tier_required: 'premium',
  },
  // Tier 3
  {
    id: 'psy_005',
    treeId: 'psychology',
    name: 'Trauma Patterns',
    description: 'Understand how past wounds shape present behavior',
    icon: 'AlertTriangle',
    tier: 3,
    xpCost: 250,
    prerequisites: ['psy_003', 'psy_004'],
    effects: ['Deep pattern recognition', 'Empathy enhancement'],
    tier_required: 'premium',
  },
  // Tier 4
  {
    id: 'psy_006',
    treeId: 'psychology',
    name: 'Subconscious Signals',
    description: 'Read micro-expressions and hidden intentions',
    icon: 'Zap',
    tier: 4,
    xpCost: 400,
    prerequisites: ['psy_005'],
    effects: ['Advanced lie detection', 'Intent prediction'],
    tier_required: 'vip',
  },
  // Tier 5
  {
    id: 'psy_007',
    treeId: 'psychology',
    name: 'Psyche Master',
    description: 'Complete understanding of human psychological patterns',
    icon: 'Sparkles',
    tier: 5,
    xpCost: 500,
    prerequisites: ['psy_006'],
    effects: ['Master badge: Psychologist', 'All psychology bonuses doubled'],
    tier_required: 'vip',
  },
];

// Communication Tree - Words as weapons
const COMMUNICATION_SKILLS: Skill[] = [
  // Tier 1
  {
    id: 'com_001',
    treeId: 'communication',
    name: 'Active Listening',
    description: 'Hear what people really mean, not just what they say',
    icon: 'Ear',
    tier: 1,
    xpCost: 0,
    prerequisites: [],
    effects: ['Better conversation analysis', 'Unlock: Subtext detection'],
    tier_required: 'free',
  },
  {
    id: 'com_002',
    treeId: 'communication',
    name: 'Question Mastery',
    description: 'Ask questions that reveal true intentions',
    icon: 'HelpCircle',
    tier: 1,
    xpCost: 100,
    prerequisites: ['com_001'],
    effects: ['Strategic question templates', 'Information extraction +'],
    tier_required: 'free',
  },
  // Tier 2
  {
    id: 'com_003',
    treeId: 'communication',
    name: 'Silence as Power',
    description: 'Use strategic silence to create tension and extract truth',
    icon: 'VolumeX',
    tier: 2,
    xpCost: 150,
    prerequisites: ['com_002'],
    effects: ['Pause tactics unlocked', 'Pressure techniques'],
    tier_required: 'premium',
  },
  {
    id: 'com_004',
    treeId: 'communication',
    name: 'Mirroring',
    description: 'Build instant rapport through subtle mimicry',
    icon: 'Copy',
    tier: 2,
    xpCost: 150,
    prerequisites: ['com_002'],
    effects: ['Rapport building +50%', 'Trust acceleration'],
    tier_required: 'premium',
  },
  // Tier 3
  {
    id: 'com_005',
    treeId: 'communication',
    name: 'Reframing',
    description: 'Change how situations are perceived through language',
    icon: 'Frame',
    tier: 3,
    xpCost: 250,
    prerequisites: ['com_003', 'com_004'],
    effects: ['Narrative control', 'Perception shifting'],
    tier_required: 'premium',
  },
  // Tier 4
  {
    id: 'com_006',
    treeId: 'communication',
    name: 'Embedded Commands',
    description: 'Plant suggestions that bypass conscious resistance',
    icon: 'MessageCircle',
    tier: 4,
    xpCost: 400,
    prerequisites: ['com_005'],
    effects: ['Subtle influence mastery', 'Suggestion planting'],
    tier_required: 'vip',
  },
  // Tier 5
  {
    id: 'com_007',
    treeId: 'communication',
    name: 'Word Sorcerer',
    description: 'Complete mastery of linguistic influence',
    icon: 'Wand2',
    tier: 5,
    xpCost: 500,
    prerequisites: ['com_006'],
    effects: ['Master badge: Communicator', 'All text analysis bonuses doubled'],
    tier_required: 'vip',
  },
];

// Emotional Armor Tree - Self-protection
const EMOTIONAL_ARMOR_SKILLS: Skill[] = [
  // Tier 1
  {
    id: 'arm_001',
    treeId: 'emotional_armor',
    name: 'Emotional Awareness',
    description: 'Recognize your own emotional triggers before others exploit them',
    icon: 'Heart',
    tier: 1,
    xpCost: 0,
    prerequisites: [],
    effects: ['Trigger identification', 'Self-awareness +'],
    tier_required: 'free',
  },
  {
    id: 'arm_002',
    treeId: 'emotional_armor',
    name: 'Boundary Setting',
    description: 'Establish and maintain personal boundaries',
    icon: 'Shield',
    tier: 1,
    xpCost: 100,
    prerequisites: ['arm_001'],
    effects: ['Boundary templates', 'Resistance to guilt trips'],
    tier_required: 'free',
  },
  // Tier 2
  {
    id: 'arm_003',
    treeId: 'emotional_armor',
    name: 'Manipulation Detection',
    description: 'Spot manipulation tactics in real-time',
    icon: 'AlertCircle',
    tier: 2,
    xpCost: 150,
    prerequisites: ['arm_002'],
    effects: ['Scanner accuracy +25%', 'Red flag alerts'],
    tier_required: 'premium',
  },
  {
    id: 'arm_004',
    treeId: 'emotional_armor',
    name: 'Detachment Protocol',
    description: 'Maintain emotional distance when needed',
    icon: 'Unlink',
    tier: 2,
    xpCost: 150,
    prerequisites: ['arm_002'],
    effects: ['Emotional regulation', 'Cold response mode'],
    tier_required: 'premium',
  },
  // Tier 3
  {
    id: 'arm_005',
    treeId: 'emotional_armor',
    name: 'Counter-Tactics',
    description: 'Neutralize manipulation attempts with precision',
    icon: 'Swords',
    tier: 3,
    xpCost: 250,
    prerequisites: ['arm_003', 'arm_004'],
    effects: ['Counter-move library', 'Deflection mastery'],
    tier_required: 'premium',
  },
  // Tier 4
  {
    id: 'arm_006',
    treeId: 'emotional_armor',
    name: 'Unshakeable Core',
    description: 'Maintain composure under any psychological pressure',
    icon: 'Mountain',
    tier: 4,
    xpCost: 400,
    prerequisites: ['arm_005'],
    effects: ['Stress immunity +', 'Frame control under pressure'],
    tier_required: 'vip',
  },
  // Tier 5
  {
    id: 'arm_007',
    treeId: 'emotional_armor',
    name: 'Fortress Mind',
    description: 'Complete psychological invulnerability',
    icon: 'Castle',
    tier: 5,
    xpCost: 500,
    prerequisites: ['arm_006'],
    effects: ['Master badge: Guardian', 'Immune to common manipulation'],
    tier_required: 'vip',
  },
];

// Influence Tree - Shaping outcomes
const INFLUENCE_SKILLS: Skill[] = [
  // Tier 1
  {
    id: 'inf_001',
    treeId: 'influence',
    name: 'First Impressions',
    description: 'Control how you are perceived from the first moment',
    icon: 'Sparkle',
    tier: 1,
    xpCost: 0,
    prerequisites: [],
    effects: ['Presence enhancement', 'Initial attraction boost'],
    tier_required: 'free',
  },
  {
    id: 'inf_002',
    treeId: 'influence',
    name: 'Social Proof',
    description: 'Leverage the power of perceived popularity',
    icon: 'Users',
    tier: 1,
    xpCost: 100,
    prerequisites: ['inf_001'],
    effects: ['Status signaling', 'Value perception +'],
    tier_required: 'free',
  },
  // Tier 2
  {
    id: 'inf_003',
    treeId: 'influence',
    name: 'Scarcity Play',
    description: 'Create desire through strategic unavailability',
    icon: 'Clock',
    tier: 2,
    xpCost: 150,
    prerequisites: ['inf_002'],
    effects: ['Scarcity tactics', 'Value amplification'],
    tier_required: 'premium',
  },
  {
    id: 'inf_004',
    treeId: 'influence',
    name: 'Reciprocity Engine',
    description: 'Give strategically to receive exponentially',
    icon: 'Gift',
    tier: 2,
    xpCost: 150,
    prerequisites: ['inf_002'],
    effects: ['Obligation creation', 'Favor economy'],
    tier_required: 'premium',
  },
  // Tier 3
  {
    id: 'inf_005',
    treeId: 'influence',
    name: 'Authority Projection',
    description: 'Command respect and compliance naturally',
    icon: 'Crown',
    tier: 3,
    xpCost: 250,
    prerequisites: ['inf_003', 'inf_004'],
    effects: ['Leadership aura', 'Automatic deference'],
    tier_required: 'premium',
  },
  // Tier 4
  {
    id: 'inf_006',
    treeId: 'influence',
    name: 'Emotional Investment',
    description: 'Create deep bonds that inspire loyalty',
    icon: 'HeartHandshake',
    tier: 4,
    xpCost: 400,
    prerequisites: ['inf_005'],
    effects: ['Bond deepening', 'Loyalty cultivation'],
    tier_required: 'vip',
  },
  // Tier 5
  {
    id: 'inf_007',
    treeId: 'influence',
    name: 'Magnetism Master',
    description: 'Irresistible presence that draws people in',
    icon: 'Magnet',
    tier: 5,
    xpCost: 500,
    prerequisites: ['inf_006'],
    effects: ['Master badge: Influencer', 'Natural charisma maximum'],
    tier_required: 'vip',
  },
];

// Strategy Tree - Long-game thinking
const STRATEGY_SKILLS: Skill[] = [
  // Tier 1
  {
    id: 'str_001',
    treeId: 'strategy',
    name: 'Situation Analysis',
    description: 'Quickly assess power dynamics in any situation',
    icon: 'Scan',
    tier: 1,
    xpCost: 0,
    prerequisites: [],
    effects: ['Power mapping', 'Quick assessment mode'],
    tier_required: 'free',
  },
  {
    id: 'str_002',
    treeId: 'strategy',
    name: 'Pattern Recognition',
    description: 'Identify recurring behavioral patterns',
    icon: 'GitBranch',
    tier: 1,
    xpCost: 100,
    prerequisites: ['str_001'],
    effects: ['Behavior prediction', 'Pattern database'],
    tier_required: 'free',
  },
  // Tier 2
  {
    id: 'str_003',
    treeId: 'strategy',
    name: 'Multi-Move Planning',
    description: 'Think three moves ahead in any interaction',
    icon: 'Route',
    tier: 2,
    xpCost: 150,
    prerequisites: ['str_002'],
    effects: ['Scenario planning', 'Outcome prediction'],
    tier_required: 'premium',
  },
  {
    id: 'str_004',
    treeId: 'strategy',
    name: 'Exit Strategies',
    description: 'Always have a graceful way out',
    icon: 'DoorOpen',
    tier: 2,
    xpCost: 150,
    prerequisites: ['str_002'],
    effects: ['Escape routes', 'Damage control'],
    tier_required: 'premium',
  },
  // Tier 3
  {
    id: 'str_005',
    treeId: 'strategy',
    name: 'Frame Control',
    description: 'Define the reality of any interaction',
    icon: 'Frame',
    tier: 3,
    xpCost: 250,
    prerequisites: ['str_003', 'str_004'],
    effects: ['Reality framing', 'Narrative ownership'],
    tier_required: 'premium',
  },
  // Tier 4
  {
    id: 'str_006',
    treeId: 'strategy',
    name: 'Long Game',
    description: 'Plant seeds that bloom months or years later',
    icon: 'Timer',
    tier: 4,
    xpCost: 400,
    prerequisites: ['str_005'],
    effects: ['Delayed gratification', 'Strategic patience'],
    tier_required: 'vip',
  },
  // Tier 5
  {
    id: 'str_007',
    treeId: 'strategy',
    name: 'Grand Strategist',
    description: 'See the entire board and all the players',
    icon: 'Telescope',
    tier: 5,
    xpCost: 500,
    prerequisites: ['str_006'],
    effects: ['Master badge: Strategist', 'Complete situational awareness'],
    tier_required: 'vip',
  },
];

// Skill Trees
export const SKILL_TREES: Record<SkillTreeId, SkillTree> = {
  psychology: {
    id: 'psychology',
    name: 'Psychology',
    description: 'Understand the human mind and its hidden patterns',
    icon: 'Brain',
    color: '#8B5CF6', // Violet
    skills: PSYCHOLOGY_SKILLS,
    tier_required: 'free',
  },
  communication: {
    id: 'communication',
    name: 'Communication',
    description: 'Master the art of words and their hidden power',
    icon: 'MessageCircle',
    color: '#0EA5E9', // Blue
    skills: COMMUNICATION_SKILLS,
    tier_required: 'free',
  },
  emotional_armor: {
    id: 'emotional_armor',
    name: 'Emotional Armor',
    description: 'Protect yourself from manipulation and control',
    icon: 'Shield',
    color: '#22C55E', // Green
    skills: EMOTIONAL_ARMOR_SKILLS,
    tier_required: 'free',
  },
  influence: {
    id: 'influence',
    name: 'Influence',
    description: 'Shape outcomes and inspire desired behaviors',
    icon: 'Sparkles',
    color: '#EC4899', // Pink
    skills: INFLUENCE_SKILLS,
    tier_required: 'premium',
  },
  strategy: {
    id: 'strategy',
    name: 'Strategy',
    description: 'Think ahead and control the long game',
    icon: 'Target',
    color: '#F59E0B', // Amber
    skills: STRATEGY_SKILLS,
    tier_required: 'premium',
  },
};

// Helper to get all skills
export function getAllSkills(): Skill[] {
  return Object.values(SKILL_TREES).flatMap(tree => tree.skills);
}

// Helper to get skill by ID
export function getSkillById(id: string): Skill | undefined {
  return getAllSkills().find(skill => skill.id === id);
}

// Check if skill can be unlocked
export function canUnlockSkill(
  skillId: string,
  unlockedSkills: string[],
  skillPoints: number
): { canUnlock: boolean; reason?: string } {
  const skill = getSkillById(skillId);
  if (!skill) {
    return { canUnlock: false, reason: 'Skill not found' };
  }

  if (unlockedSkills.includes(skillId)) {
    return { canUnlock: false, reason: 'Already unlocked' };
  }

  // Check prerequisites
  const missingPrereqs = skill.prerequisites.filter(
    prereq => !unlockedSkills.includes(prereq)
  );
  if (missingPrereqs.length > 0) {
    return { canUnlock: false, reason: 'Prerequisites not met' };
  }

  if (skill.xpCost > skillPoints) {
    return { canUnlock: false, reason: `Need ${skill.xpCost} skill points` };
  }

  return { canUnlock: true };
}

// Get missing prerequisite names for a skill
export function getMissingPrerequisites(
  skillId: string,
  unlockedSkills: string[]
): string[] {
  const skill = getSkillById(skillId);
  if (!skill) return [];

  const missingIds = skill.prerequisites.filter(
    prereq => !unlockedSkills.includes(prereq)
  );

  return missingIds
    .map(id => getSkillById(id)?.name)
    .filter((name): name is string => !!name);
}

// Get tree completion percentage
export function getTreeProgress(treeId: SkillTreeId, unlockedSkills: string[]): number {
  const tree = SKILL_TREES[treeId];
  if (!tree) return 0;

  const treeSkillIds = tree.skills.map(s => s.id);
  const unlocked = unlockedSkills.filter(id => treeSkillIds.includes(id));
  return (unlocked.length / tree.skills.length) * 100;
}
