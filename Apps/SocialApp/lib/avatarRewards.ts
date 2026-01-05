// Avatar Reward System - Frames and Character Avatars earned through simulator mastery

export type AvatarRewardTier = 'common' | 'rare' | 'epic' | 'legendary';
export type AvatarRewardType = 'frame' | 'character';
export type AvatarRewardCategory = 'scenario' | 'accuracy'; // scenario-specific vs global accuracy

export interface UnlockRequirement {
  minAccuracy: number;     // 70, 80, 90, or 100
  perfectRequired: boolean; // Must complete with no mistakes
}

export interface AvatarReward {
  id: string;
  name: string;
  description: string;
  tier: AvatarRewardTier;
  type: AvatarRewardType;
  category: AvatarRewardCategory;
  unlockScenarioId?: string;  // For scenario-specific rewards
  unlockRequirement: UnlockRequirement;
  assetPath: string;       // Path to image/animation asset
  previewColor: string;    // Color for preview UI before asset loads
}

// Global accuracy rewards - unlocked when achieving accuracy on ANY scenario
export interface AccuracyMilestone {
  id: string;
  name: string;
  description: string;
  minAccuracy: number;
  tier: AvatarRewardTier;
  type: AvatarRewardType;
  assetPath: string;
  previewColor: string;
}

// Global accuracy milestones (unlock on ANY scenario)
export const accuracyMilestones: AccuracyMilestone[] = [
  {
    id: 'frame-keen-eye',
    name: 'Keen Eye',
    description: 'First time achieving 70%+ accuracy',
    minAccuracy: 70,
    tier: 'common',
    type: 'frame',
    assetPath: '/assets/frames/keen-eye.png',
    previewColor: '#22C55E',
  },
  {
    id: 'frame-sharp-mind',
    name: 'Sharp Mind',
    description: 'First time achieving 80%+ accuracy',
    minAccuracy: 80,
    tier: 'rare',
    type: 'frame',
    assetPath: '/assets/frames/sharp-mind.png',
    previewColor: '#3B82F6',
  },
  {
    id: 'frame-master-reader',
    name: 'Master Reader',
    description: 'First time achieving 90%+ accuracy',
    minAccuracy: 90,
    tier: 'epic',
    type: 'frame',
    assetPath: '/assets/frames/master-reader.png',
    previewColor: '#A855F7',
  },
  {
    id: 'frame-oracle',
    name: 'The Oracle',
    description: 'First time achieving 95%+ accuracy',
    minAccuracy: 95,
    tier: 'epic',
    type: 'frame',
    assetPath: '/assets/frames/oracle.png',
    previewColor: '#EC4899',
  },
  {
    id: 'frame-perfect-sight',
    name: 'Perfect Sight',
    description: 'First time achieving 100% accuracy',
    minAccuracy: 100,
    tier: 'legendary',
    type: 'frame',
    assetPath: '/assets/frames/perfect-sight.png',
    previewColor: '#F59E0B',
  },
];

export interface UserAvatarConfig {
  baseAvatar: string;      // 'photo' | 'default' | character reward ID
  activeFrame?: string;    // Frame reward ID
  activeCharacter?: string; // Character reward ID (overrides base when set)
}

// Tier visual properties for UI rendering
export const tierStyles: Record<AvatarRewardTier, {
  borderColor: string;
  glowColor: string;
  badgeColor: string;
  label: string;
}> = {
  common: {
    borderColor: '#94A3B8',
    glowColor: 'rgba(148, 163, 184, 0.3)',
    badgeColor: '#64748B',
    label: 'Common',
  },
  rare: {
    borderColor: '#3B82F6',
    glowColor: 'rgba(59, 130, 246, 0.4)',
    badgeColor: '#2563EB',
    label: 'Rare',
  },
  epic: {
    borderColor: '#A855F7',
    glowColor: 'rgba(168, 85, 247, 0.5)',
    badgeColor: '#9333EA',
    label: 'Epic',
  },
  legendary: {
    borderColor: '#F59E0B',
    glowColor: 'rgba(245, 158, 11, 0.6)',
    badgeColor: '#D97706',
    label: 'Legendary',
  },
};

// All avatar rewards
export const avatarRewards: AvatarReward[] = [
  // ========== COMMON FRAMES (70%+ accuracy on beginner scenarios) ==========
  {
    id: 'frame-silver-basic',
    name: 'Silver Ring',
    description: 'A simple silver frame showing your first steps',
    tier: 'common',
    type: 'frame',
    category: 'scenario',
    unlockScenarioId: 'narcissist-trap',
    unlockRequirement: { minAccuracy: 70, perfectRequired: false },
    assetPath: '/assets/frames/silver-basic.png',
    previewColor: '#94A3B8',
  },
  {
    id: 'frame-green-glow',
    name: 'Green Flag Glow',
    description: 'A gentle green aura for recognizing healthy patterns',
    tier: 'common',
    type: 'frame',
    category: 'scenario',
    unlockScenarioId: 'healthy-connection',
    unlockRequirement: { minAccuracy: 70, perfectRequired: false },
    assetPath: '/assets/frames/green-glow.png',
    previewColor: '#4CAF50',
  },
  {
    id: 'frame-starter-shield',
    name: 'Starter Shield',
    description: 'Your first line of defense against manipulation',
    tier: 'common',
    type: 'frame',
    category: 'scenario',
    unlockScenarioId: 'first-date-from-hell',
    unlockRequirement: { minAccuracy: 70, perfectRequired: false },
    assetPath: '/assets/frames/starter-shield.png',
    previewColor: '#EF4444',
  },

  // ========== RARE FRAMES (80%+ accuracy on intermediate scenarios) ==========
  {
    id: 'frame-blue-frost',
    name: 'Frost Ring',
    description: 'Cool composure against hot-cold dynamics',
    tier: 'rare',
    type: 'frame',
    category: 'scenario',
    unlockScenarioId: 'avoidant-dance',
    unlockRequirement: { minAccuracy: 80, perfectRequired: false },
    assetPath: '/assets/frames/blue-frost.png',
    previewColor: '#3B82F6',
  },
  {
    id: 'frame-purple-mist',
    name: 'Reality Anchor',
    description: 'A grounding presence against gaslighting fog',
    tier: 'rare',
    type: 'frame',
    category: 'scenario',
    unlockScenarioId: 'gaslighter-escape',
    unlockRequirement: { minAccuracy: 80, perfectRequired: false },
    assetPath: '/assets/frames/purple-mist.png',
    previewColor: '#9C27B0',
  },
  {
    id: 'frame-ghost-fade',
    name: 'Ghost Fade',
    description: 'Embrace the fade without losing yourself',
    tier: 'rare',
    type: 'frame',
    category: 'scenario',
    unlockScenarioId: 'the-ghost',
    unlockRequirement: { minAccuracy: 80, perfectRequired: false },
    assetPath: '/assets/frames/ghost-fade.png',
    previewColor: '#6366F1',
  },
  {
    id: 'frame-breadcrumb-trail',
    name: 'Crumb Trail',
    description: 'Follow no more breadcrumbs',
    tier: 'rare',
    type: 'frame',
    category: 'scenario',
    unlockScenarioId: 'breadcrumber',
    unlockRequirement: { minAccuracy: 80, perfectRequired: false },
    assetPath: '/assets/frames/breadcrumb-trail.png',
    previewColor: '#F59E0B',
  },
  {
    id: 'frame-investment-gold',
    name: 'Investment Ring',
    description: 'Earned through climbing the investment ladder',
    tier: 'rare',
    type: 'frame',
    category: 'scenario',
    unlockScenarioId: 'investment-test',
    unlockRequirement: { minAccuracy: 80, perfectRequired: false },
    assetPath: '/assets/frames/investment-gold.png',
    previewColor: '#C9A961',
  },
  {
    id: 'frame-rotation-orbit',
    name: 'Orbital Ring',
    description: 'Multiple options, one center: you',
    tier: 'rare',
    type: 'frame',
    category: 'scenario',
    unlockScenarioId: 'rotation-master',
    unlockRequirement: { minAccuracy: 80, perfectRequired: false },
    assetPath: '/assets/frames/rotation-orbit.png',
    previewColor: '#F59E0B',
  },

  // ========== EPIC FRAMES (90%+ accuracy on advanced scenarios) ==========
  {
    id: 'frame-corporate-shield',
    name: 'Corporate Shield',
    description: 'Executive-level protection in the corporate arena',
    tier: 'epic',
    type: 'frame',
    category: 'scenario',
    unlockScenarioId: 'the-interview',
    unlockRequirement: { minAccuracy: 90, perfectRequired: false },
    assetPath: '/assets/frames/corporate-shield.png',
    previewColor: '#1E40AF',
  },
  {
    id: 'frame-power-surge',
    name: 'Power Surge',
    description: 'Electrical energy of corporate dominance',
    tier: 'epic',
    type: 'frame',
    category: 'scenario',
    unlockScenarioId: 'power-play',
    unlockRequirement: { minAccuracy: 90, perfectRequired: false },
    assetPath: '/assets/frames/power-surge.png',
    previewColor: '#FF9800',
  },
  {
    id: 'frame-dynasty-ring',
    name: 'Dynasty Ring',
    description: 'Navigate family politics with royal grace',
    tier: 'epic',
    type: 'frame',
    category: 'scenario',
    unlockScenarioId: 'family-introduction',
    unlockRequirement: { minAccuracy: 90, perfectRequired: false },
    assetPath: '/assets/frames/dynasty-ring.png',
    previewColor: '#7C3AED',
  },
  {
    id: 'frame-covert-detector',
    name: 'Mask Seer',
    description: 'See through every covert mask',
    tier: 'epic',
    type: 'frame',
    category: 'scenario',
    unlockScenarioId: 'covert-narcissist',
    unlockRequirement: { minAccuracy: 90, perfectRequired: false },
    assetPath: '/assets/frames/covert-detector.png',
    previewColor: '#8B5CF6',
  },
  {
    id: 'frame-future-shield',
    name: 'Present Moment',
    description: 'Immune to future-faking promises',
    tier: 'epic',
    type: 'frame',
    category: 'scenario',
    unlockScenarioId: 'future-faker',
    unlockRequirement: { minAccuracy: 90, perfectRequired: false },
    assetPath: '/assets/frames/future-shield.png',
    previewColor: '#EC4899',
  },
  {
    id: 'frame-negotiator-edge',
    name: 'Negotiator\'s Edge',
    description: 'The sharp edge of knowing your worth',
    tier: 'epic',
    type: 'frame',
    category: 'scenario',
    unlockScenarioId: 'the-raise-negotiation',
    unlockRequirement: { minAccuracy: 90, perfectRequired: false },
    assetPath: '/assets/frames/negotiator-edge.png',
    previewColor: '#22C55E',
  },
  {
    id: 'frame-crisis-halo',
    name: 'Crisis Halo',
    description: 'Calm in the center of chaos',
    tier: 'epic',
    type: 'frame',
    category: 'scenario',
    unlockScenarioId: 'the-crisis',
    unlockRequirement: { minAccuracy: 90, perfectRequired: false },
    assetPath: '/assets/frames/crisis-halo.png',
    previewColor: '#DC2626',
  },
  {
    id: 'frame-boardroom-aura',
    name: 'Boardroom Aura',
    description: 'Command attention at the executive level',
    tier: 'epic',
    type: 'frame',
    category: 'scenario',
    unlockScenarioId: 'the-executive-presentation',
    unlockRequirement: { minAccuracy: 90, perfectRequired: false },
    assetPath: '/assets/frames/boardroom-aura.png',
    previewColor: '#4F46E5',
  },
  {
    id: 'frame-wedding-veil',
    name: 'Social Veil',
    description: 'Grace under social fire',
    tier: 'epic',
    type: 'frame',
    category: 'scenario',
    unlockScenarioId: 'wedding-weekend',
    unlockRequirement: { minAccuracy: 90, perfectRequired: false },
    assetPath: '/assets/frames/wedding-veil.png',
    previewColor: '#F472B6',
  },
  {
    id: 'frame-clean-break',
    name: 'Clean Edge',
    description: 'Surgical precision in exits',
    tier: 'epic',
    type: 'frame',
    category: 'scenario',
    unlockScenarioId: 'clean-break',
    unlockRequirement: { minAccuracy: 90, perfectRequired: false },
    assetPath: '/assets/frames/clean-edge.png',
    previewColor: '#10B981',
  },

  // ========== LEGENDARY FRAMES (100% perfect on hardest scenarios) ==========
  {
    id: 'frame-impossible-conqueror',
    name: 'Impossible Conqueror',
    description: 'Tamed the untamable boss',
    tier: 'legendary',
    type: 'frame',
    category: 'scenario',
    unlockScenarioId: 'the-impossible-boss',
    unlockRequirement: { minAccuracy: 100, perfectRequired: true },
    assetPath: '/assets/frames/impossible-conqueror.png',
    previewColor: '#DC2626',
  },
  {
    id: 'frame-fortress-wall',
    name: 'Fortress Wall',
    description: 'Impenetrable defense against hostile takeovers',
    tier: 'legendary',
    type: 'frame',
    category: 'scenario',
    unlockScenarioId: 'the-hostile-offer',
    unlockRequirement: { minAccuracy: 100, perfectRequired: true },
    assetPath: '/assets/frames/fortress-wall.png',
    previewColor: '#B91C1C',
  },

  // ========== LEGENDARY CHARACTER AVATARS (100% perfect on ultimate scenarios) ==========
  {
    id: 'char-the-empress',
    name: 'The Empress',
    description: 'Ultimate feminine power - secured commitment from absolute strength',
    tier: 'legendary',
    type: 'character',
    category: 'scenario',
    unlockScenarioId: 'empress-move',
    unlockRequirement: { minAccuracy: 100, perfectRequired: true },
    assetPath: '/assets/characters/the-empress.png',
    previewColor: '#C9A961',
  },
  {
    id: 'char-the-phoenix',
    name: 'The Phoenix',
    description: 'Risen from the ashes of a perfect clean break',
    tier: 'legendary',
    type: 'character',
    category: 'scenario',
    unlockScenarioId: 'clean-break',
    unlockRequirement: { minAccuracy: 100, perfectRequired: true },
    assetPath: '/assets/characters/the-phoenix.png',
    previewColor: '#F97316',
  },
  {
    id: 'char-the-wolf',
    name: 'The Wolf',
    description: 'Apex predator of executive networking',
    tier: 'legendary',
    type: 'character',
    category: 'scenario',
    unlockScenarioId: 'the-ceo-dinner',
    unlockRequirement: { minAccuracy: 100, perfectRequired: true },
    assetPath: '/assets/characters/the-wolf.png',
    previewColor: '#64748B',
  },
  {
    id: 'char-the-shadow',
    name: 'The Shadow',
    description: 'Master of disappearing without a trace',
    tier: 'legendary',
    type: 'character',
    category: 'scenario',
    unlockScenarioId: 'the-ghost',
    unlockRequirement: { minAccuracy: 100, perfectRequired: true },
    assetPath: '/assets/characters/the-shadow.png',
    previewColor: '#1E1B4B',
  },
  {
    id: 'char-the-crown',
    name: 'The Crown',
    description: 'Ultimate masculine power - the prize that was worth the wait',
    tier: 'legendary',
    type: 'character',
    category: 'scenario',
    unlockScenarioId: 'male-emperor-move',
    unlockRequirement: { minAccuracy: 100, perfectRequired: true },
    assetPath: '/assets/characters/the-crown.png',
    previewColor: '#C9A961',
  },
  {
    id: 'char-the-fortress',
    name: 'The Fortress',
    description: 'Unbreakable defender against hostile forces',
    tier: 'legendary',
    type: 'character',
    category: 'scenario',
    unlockScenarioId: 'the-hostile-offer',
    unlockRequirement: { minAccuracy: 100, perfectRequired: true },
    assetPath: '/assets/characters/the-fortress.png',
    previewColor: '#B91C1C',
  },
  {
    id: 'char-chaos-master',
    name: 'Chaos Master',
    description: 'Commanding presence that turns crisis into opportunity',
    tier: 'legendary',
    type: 'character',
    category: 'scenario',
    unlockScenarioId: 'the-crisis',
    unlockRequirement: { minAccuracy: 100, perfectRequired: true },
    assetPath: '/assets/characters/chaos-master.png',
    previewColor: '#DC2626',
  },
];

// Helper functions
export function getRewardById(id: string): AvatarReward | undefined {
  return avatarRewards.find(r => r.id === id);
}

export function getRewardsByTier(tier: AvatarRewardTier): AvatarReward[] {
  return avatarRewards.filter(r => r.tier === tier);
}

export function getRewardsByType(type: AvatarRewardType): AvatarReward[] {
  return avatarRewards.filter(r => r.type === type);
}

export function getFrames(): AvatarReward[] {
  return avatarRewards.filter(r => r.type === 'frame');
}

export function getCharacters(): AvatarReward[] {
  return avatarRewards.filter(r => r.type === 'character');
}

export function getRewardForScenario(scenarioId: string): AvatarReward | undefined {
  return avatarRewards.find(r => r.unlockScenarioId === scenarioId);
}

export function canUnlockReward(
  reward: AvatarReward,
  accuracy: number,
  isPerfect: boolean
): boolean {
  if (accuracy < reward.unlockRequirement.minAccuracy) {
    return false;
  }
  if (reward.unlockRequirement.perfectRequired && !isPerfect) {
    return false;
  }
  return true;
}

// Get all rewards a user could potentially unlock based on completed scenarios
export function getUnlockableRewards(
  completedScenarios: { scenarioId: string; accuracy: number; isPerfect: boolean }[]
): AvatarReward[] {
  return avatarRewards.filter(reward => {
    const completion = completedScenarios.find(
      c => c.scenarioId === reward.unlockScenarioId
    );
    if (!completion) return false;
    return canUnlockReward(reward, completion.accuracy, completion.isPerfect);
  });
}

// Default avatar config for new users
export const defaultAvatarConfig: UserAvatarConfig = {
  baseAvatar: 'default',
  activeFrame: undefined,
  activeCharacter: undefined,
};

// ============================================
// ACCURACY MILESTONE HELPERS
// ============================================

export function getAccuracyMilestoneById(id: string): AccuracyMilestone | undefined {
  return accuracyMilestones.find(m => m.id === id);
}

// Check which accuracy milestones can be unlocked based on current accuracy
export function checkAccuracyMilestones(
  accuracyPercent: number,
  alreadyUnlockedIds: string[]
): AccuracyMilestone[] {
  return accuracyMilestones.filter(
    milestone =>
      accuracyPercent >= milestone.minAccuracy &&
      !alreadyUnlockedIds.includes(milestone.id)
  );
}

// Get all milestone IDs for easy reference
export function getAllAccuracyMilestoneIds(): string[] {
  return accuracyMilestones.map(m => m.id);
}

// Convert accuracy milestone to AvatarReward format for unified handling
export function milestoneToReward(milestone: AccuracyMilestone): AvatarReward {
  return {
    id: milestone.id,
    name: milestone.name,
    description: milestone.description,
    tier: milestone.tier,
    type: milestone.type,
    category: 'accuracy',
    unlockRequirement: { minAccuracy: milestone.minAccuracy, perfectRequired: false },
    assetPath: milestone.assetPath,
    previewColor: milestone.previewColor,
  };
}
