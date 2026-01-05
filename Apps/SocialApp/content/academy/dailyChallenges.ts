// Empress Academy Daily Challenges
// Short, actionable challenges that reinforce learning

import { DailyChallenge } from './types';

// Pool of daily challenges by category
export const DAILY_CHALLENGES: DailyChallenge[] = [
  // Mindset Challenges
  {
    id: 'dc_mind_001',
    title: 'Morning Power',
    description: 'Before checking your phone, spend 5 minutes visualizing yourself as confident and in control.',
    icon: 'Sun',
    xpReward: 30,
    category: 'mindset',
    difficulty: 'easy',
    tier_required: 'free',
  },
  {
    id: 'dc_mind_002',
    title: 'Trigger Journal',
    description: 'Write down one emotional trigger you experienced today and how you could have responded differently.',
    icon: 'BookOpen',
    xpReward: 40,
    category: 'mindset',
    difficulty: 'medium',
    tier_required: 'free',
  },
  {
    id: 'dc_mind_003',
    title: 'Ego Death',
    description: 'Notice 3 times today when your ego tried to protect itself. Don\'t react, just observe.',
    icon: 'Eye',
    xpReward: 50,
    category: 'mindset',
    difficulty: 'hard',
    tier_required: 'premium',
  },
  {
    id: 'dc_mind_004',
    title: 'Frame Flip',
    description: 'Reframe a negative situation from today into an opportunity. Write it down.',
    icon: 'RotateCcw',
    xpReward: 40,
    category: 'mindset',
    difficulty: 'medium',
    tier_required: 'premium',
  },
  {
    id: 'dc_mind_005',
    title: 'Power Posture',
    description: 'Spend 2 minutes in a power pose (hands on hips, chin up) before an important interaction.',
    icon: 'Zap',
    xpReward: 30,
    category: 'mindset',
    difficulty: 'easy',
    tier_required: 'free',
  },

  // Social Challenges
  {
    id: 'dc_social_001',
    title: 'Strategic Silence',
    description: 'In a conversation, pause for 3 seconds before responding at least once. Observe the effect.',
    icon: 'VolumeX',
    xpReward: 40,
    category: 'social',
    difficulty: 'medium',
    tier_required: 'free',
  },
  {
    id: 'dc_social_002',
    title: 'Name Power',
    description: 'Use someone\'s name three times in conversation today. Note how they respond.',
    icon: 'User',
    xpReward: 30,
    category: 'social',
    difficulty: 'easy',
    tier_required: 'free',
  },
  {
    id: 'dc_social_003',
    title: 'Question Master',
    description: 'Ask 3 open-ended questions that make someone reveal something personal.',
    icon: 'MessageCircle',
    xpReward: 50,
    category: 'social',
    difficulty: 'hard',
    tier_required: 'premium',
  },
  {
    id: 'dc_social_004',
    title: 'Mirror Game',
    description: 'Subtly mirror someone\'s body language for 5 minutes. Track rapport changes.',
    icon: 'Copy',
    xpReward: 40,
    category: 'social',
    difficulty: 'medium',
    tier_required: 'premium',
  },
  {
    id: 'dc_social_005',
    title: 'Compliment Strategy',
    description: 'Give one specific, unexpected compliment that makes someone\'s day.',
    icon: 'Heart',
    xpReward: 30,
    category: 'social',
    difficulty: 'easy',
    tier_required: 'free',
  },
  {
    id: 'dc_social_006',
    title: 'Frame Control',
    description: 'When someone tries to frame a conversation negatively, reframe it positively without arguing.',
    icon: 'Frame',
    xpReward: 60,
    category: 'social',
    difficulty: 'hard',
    tier_required: 'vip',
  },

  // Observation Challenges
  {
    id: 'dc_obs_001',
    title: 'Body Language Scout',
    description: 'Observe 5 strangers and note their dominant body language patterns.',
    icon: 'Scan',
    xpReward: 30,
    category: 'observation',
    difficulty: 'easy',
    tier_required: 'free',
  },
  {
    id: 'dc_obs_002',
    title: 'Power Dynamic Watch',
    description: 'Observe a group interaction. Identify who has the power and how they maintain it.',
    icon: 'Users',
    xpReward: 40,
    category: 'observation',
    difficulty: 'medium',
    tier_required: 'free',
  },
  {
    id: 'dc_obs_003',
    title: 'Micro-Expression Hunter',
    description: 'Catch 3 micro-expressions in conversations today. Note what triggered them.',
    icon: 'Eye',
    xpReward: 50,
    category: 'observation',
    difficulty: 'hard',
    tier_required: 'premium',
  },
  {
    id: 'dc_obs_004',
    title: 'Lie Detector',
    description: 'Look for incongruence between words and body language in 3 conversations.',
    icon: 'AlertCircle',
    xpReward: 50,
    category: 'observation',
    difficulty: 'hard',
    tier_required: 'premium',
  },
  {
    id: 'dc_obs_005',
    title: 'Status Signals',
    description: 'Identify 5 ways people signal their status in a social setting.',
    icon: 'Crown',
    xpReward: 40,
    category: 'observation',
    difficulty: 'medium',
    tier_required: 'premium',
  },

  // Practice Challenges
  {
    id: 'dc_prac_001',
    title: 'Text Analysis',
    description: 'Analyze a conversation using the Text Game Analyzer. Identify power balance.',
    icon: 'FileText',
    xpReward: 30,
    category: 'practice',
    difficulty: 'easy',
    tier_required: 'free',
  },
  {
    id: 'dc_prac_002',
    title: 'Rotation Update',
    description: 'Update your rotation tracker with new observations about a prospect.',
    icon: 'Users',
    xpReward: 30,
    category: 'practice',
    difficulty: 'easy',
    tier_required: 'free',
  },
  {
    id: 'dc_prac_003',
    title: 'Boundary Test',
    description: 'Set one clear boundary with someone today and maintain it.',
    icon: 'Shield',
    xpReward: 50,
    category: 'practice',
    difficulty: 'hard',
    tier_required: 'premium',
  },
  {
    id: 'dc_prac_004',
    title: 'Strategic Delay',
    description: 'Wait at least 2 hours before responding to a non-urgent message. Observe results.',
    icon: 'Clock',
    xpReward: 40,
    category: 'practice',
    difficulty: 'medium',
    tier_required: 'free',
  },
  {
    id: 'dc_prac_005',
    title: 'Reframe Practice',
    description: 'Write 3 ways to reframe rejection as redirection.',
    icon: 'RefreshCw',
    xpReward: 40,
    category: 'practice',
    difficulty: 'medium',
    tier_required: 'premium',
  },
  {
    id: 'dc_prac_006',
    title: 'Cold Read',
    description: 'Make 3 educated guesses about someone you just met. Test your accuracy.',
    icon: 'Sparkles',
    xpReward: 60,
    category: 'practice',
    difficulty: 'hard',
    tier_required: 'vip',
  },
];

// Category info
export const CHALLENGE_CATEGORIES = {
  mindset: {
    label: 'Mindset',
    description: 'Mental exercises and internal work',
    icon: 'Brain',
    color: '#8B5CF6',
  },
  social: {
    label: 'Social',
    description: 'Real-world interaction practice',
    icon: 'Users',
    color: '#0EA5E9',
  },
  observation: {
    label: 'Observation',
    description: 'Pattern recognition exercises',
    icon: 'Eye',
    color: '#22C55E',
  },
  practice: {
    label: 'Practice',
    description: 'Applied skill development',
    icon: 'Target',
    color: '#F59E0B',
  },
};

/**
 * Get daily challenges for a user based on tier and completed challenges
 */
export function getDailyChallenges(
  tier: 'free' | 'premium' | 'vip',
  completedToday: string[],
  seed?: number // Optional seed for consistent daily selection
): DailyChallenge[] {
  const tierOrder = { free: 0, premium: 1, vip: 2 };
  const userTierLevel = tierOrder[tier];

  // Filter by tier access
  const available = DAILY_CHALLENGES.filter(
    dc => tierOrder[dc.tier_required] <= userTierLevel && !completedToday.includes(dc.id)
  );

  // Determine how many challenges based on tier
  const maxChallenges = tier === 'free' ? 1 : tier === 'premium' ? 3 : available.length;

  // Use seed for consistent daily selection (or random)
  const today = seed || new Date().toDateString().split(' ').join('').charCodeAt(0);
  const shuffled = [...available].sort((a, b) => {
    const hashA = (a.id.charCodeAt(0) * today) % 100;
    const hashB = (b.id.charCodeAt(0) * today) % 100;
    return hashA - hashB;
  });

  // Ensure variety by picking from different categories
  const result: DailyChallenge[] = [];
  const categories = ['mindset', 'social', 'observation', 'practice'];

  for (const category of categories) {
    if (result.length >= maxChallenges) break;
    const fromCategory = shuffled.find(
      dc => dc.category === category && !result.includes(dc)
    );
    if (fromCategory) result.push(fromCategory);
  }

  // Fill remaining slots if needed
  for (const dc of shuffled) {
    if (result.length >= maxChallenges) break;
    if (!result.includes(dc)) result.push(dc);
  }

  return result.slice(0, maxChallenges);
}

/**
 * Get challenge by ID
 */
export function getChallengeById(id: string): DailyChallenge | undefined {
  return DAILY_CHALLENGES.find(dc => dc.id === id);
}

/**
 * Get challenges by category
 */
export function getChallengesByCategory(category: DailyChallenge['category']): DailyChallenge[] {
  return DAILY_CHALLENGES.filter(dc => dc.category === category);
}
