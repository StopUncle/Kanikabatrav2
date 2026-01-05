// Empress Academy Quests
// Story-driven progression with practical exercises

import { Quest } from './types';

export const QUESTS: Quest[] = [
  // Foundation Quests (Available to all)
  {
    id: 'q_001',
    title: 'The Awakening',
    subtitle: 'Your journey begins',
    description: 'Every empress was once unaware. This quest opens your eyes to the hidden dynamics that govern all relationships.',
    icon: 'Eye',
    category: 'foundation',
    xpReward: 100,
    skillPointsReward: 2,
    objectives: [
      {
        id: 'q_001_obj_1',
        text: 'Read the introduction to dark psychology',
        type: 'lesson',
        verificationMethod: 'manual',
      },
      {
        id: 'q_001_obj_2',
        text: 'Identify 3 manipulation tactics you\'ve experienced',
        type: 'reflection',
        verificationMethod: 'self_report',
      },
      {
        id: 'q_001_obj_3',
        text: 'Complete your first text analysis',
        type: 'practice',
        verificationMethod: 'manual',
      },
    ],
    requirements: {},
    tier_required: 'free',
  },
  {
    id: 'q_002',
    title: 'Mirror, Mirror',
    subtitle: 'Know thyself',
    description: 'Before you can read others, you must understand your own patterns, triggers, and vulnerabilities.',
    icon: 'Mirror',
    category: 'foundation',
    xpReward: 120,
    skillPointsReward: 2,
    objectives: [
      {
        id: 'q_002_obj_1',
        text: 'Complete the attachment style assessment',
        type: 'lesson',
        verificationMethod: 'quiz',
      },
      {
        id: 'q_002_obj_2',
        text: 'List your 5 biggest emotional triggers',
        type: 'reflection',
        verificationMethod: 'self_report',
      },
      {
        id: 'q_002_obj_3',
        text: 'Identify a past relationship pattern',
        type: 'reflection',
        verificationMethod: 'self_report',
      },
    ],
    requirements: {
      completedQuests: ['q_001'],
    },
    tier_required: 'free',
  },
  {
    id: 'q_003',
    title: 'The Observer',
    subtitle: 'Watch without judgment',
    description: 'Learn to observe human behavior with detached precision, like a scientist studying fascinating specimens.',
    icon: 'Binoculars',
    category: 'foundation',
    xpReward: 150,
    skillPointsReward: 3,
    objectives: [
      {
        id: 'q_003_obj_1',
        text: 'Study body language basics',
        type: 'lesson',
        verificationMethod: 'manual',
      },
      {
        id: 'q_003_obj_2',
        text: 'Observe 3 conversations and note power dynamics',
        type: 'field_work',
        verificationMethod: 'self_report',
      },
      {
        id: 'q_003_obj_3',
        text: 'Document micro-expressions in a real interaction',
        type: 'practice',
        verificationMethod: 'self_report',
      },
    ],
    requirements: {
      completedQuests: ['q_002'],
    },
    tier_required: 'free',
  },

  // Intermediate Quests
  {
    id: 'q_101',
    title: 'The Art of Questions',
    subtitle: 'Information extraction',
    description: 'Questions are your scalpel. Learn to cut through facades and extract the truth people try to hide.',
    icon: 'MessageCircle',
    category: 'intermediate',
    xpReward: 200,
    skillPointsReward: 4,
    objectives: [
      {
        id: 'q_101_obj_1',
        text: 'Master the 5 types of strategic questions',
        type: 'lesson',
        verificationMethod: 'quiz',
      },
      {
        id: 'q_101_obj_2',
        text: 'Practice active listening in 3 conversations',
        type: 'field_work',
        verificationMethod: 'self_report',
      },
      {
        id: 'q_101_obj_3',
        text: 'Use silence to extract additional information',
        type: 'practice',
        verificationMethod: 'self_report',
      },
      {
        id: 'q_101_obj_4',
        text: 'Analyze a conversation for hidden subtext',
        type: 'reflection',
        verificationMethod: 'self_report',
      },
    ],
    requirements: {
      completedQuests: ['q_003'],
      minLevel: 'apprentice',
    },
    tier_required: 'premium',
  },
  {
    id: 'q_102',
    title: 'Shield Protocol',
    subtitle: 'Defend your mind',
    description: 'Build an impenetrable psychological shield. Learn to recognize and deflect manipulation attempts.',
    icon: 'Shield',
    category: 'intermediate',
    xpReward: 200,
    skillPointsReward: 4,
    objectives: [
      {
        id: 'q_102_obj_1',
        text: 'Learn the 12 common manipulation tactics',
        type: 'lesson',
        verificationMethod: 'quiz',
      },
      {
        id: 'q_102_obj_2',
        text: 'Set 3 new boundaries this week',
        type: 'field_work',
        verificationMethod: 'self_report',
      },
      {
        id: 'q_102_obj_3',
        text: 'Practice gray rocking in a challenging situation',
        type: 'practice',
        verificationMethod: 'self_report',
      },
    ],
    requirements: {
      completedQuests: ['q_003'],
      minLevel: 'apprentice',
    },
    tier_required: 'premium',
  },
  {
    id: 'q_103',
    title: 'The Push-Pull',
    subtitle: 'Create magnetic tension',
    description: 'Master the dance of attraction through strategic engagement and withdrawal.',
    icon: 'Magnet',
    category: 'intermediate',
    xpReward: 250,
    skillPointsReward: 5,
    objectives: [
      {
        id: 'q_103_obj_1',
        text: 'Study the scarcity principle in dating',
        type: 'lesson',
        verificationMethod: 'manual',
      },
      {
        id: 'q_103_obj_2',
        text: 'Analyze 5 text conversations for chase dynamics',
        type: 'practice',
        verificationMethod: 'manual',
      },
      {
        id: 'q_103_obj_3',
        text: 'Implement strategic response timing for 1 week',
        type: 'field_work',
        verificationMethod: 'streak',
      },
      {
        id: 'q_103_obj_4',
        text: 'Document the results of your push-pull experiment',
        type: 'reflection',
        verificationMethod: 'self_report',
      },
    ],
    requirements: {
      completedQuests: ['q_101'],
      minLevel: 'apprentice',
    },
    tier_required: 'premium',
  },

  // Advanced Quests
  {
    id: 'q_201',
    title: 'Frame Control',
    subtitle: 'Define reality',
    description: 'The one who controls the frame controls the interaction. Learn to set and maintain your reality.',
    icon: 'Frame',
    category: 'advanced',
    xpReward: 300,
    skillPointsReward: 6,
    objectives: [
      {
        id: 'q_201_obj_1',
        text: 'Understand frame theory and its applications',
        type: 'lesson',
        verificationMethod: 'quiz',
      },
      {
        id: 'q_201_obj_2',
        text: 'Identify frame grabs in 5 real interactions',
        type: 'practice',
        verificationMethod: 'self_report',
      },
      {
        id: 'q_201_obj_3',
        text: 'Successfully maintain your frame under pressure',
        type: 'field_work',
        verificationMethod: 'self_report',
      },
      {
        id: 'q_201_obj_4',
        text: 'Reframe a negative situation into opportunity',
        type: 'practice',
        verificationMethod: 'self_report',
      },
    ],
    requirements: {
      completedQuests: ['q_102', 'q_103'],
      minLevel: 'strategist',
    },
    tier_required: 'premium',
  },
  {
    id: 'q_202',
    title: 'Power Dynamics',
    subtitle: 'Master the hierarchy',
    description: 'Every interaction has a power dynamic. Learn to read, influence, and control the balance.',
    icon: 'Crown',
    category: 'advanced',
    xpReward: 350,
    skillPointsReward: 7,
    objectives: [
      {
        id: 'q_202_obj_1',
        text: 'Study the 5 sources of interpersonal power',
        type: 'lesson',
        verificationMethod: 'quiz',
      },
      {
        id: 'q_202_obj_2',
        text: 'Map power dynamics in your social circle',
        type: 'practice',
        verificationMethod: 'self_report',
      },
      {
        id: 'q_202_obj_3',
        text: 'Shift power in your favor in 3 interactions',
        type: 'field_work',
        verificationMethod: 'self_report',
      },
      {
        id: 'q_202_obj_4',
        text: 'Use power analysis in your rotation tracker',
        type: 'practice',
        verificationMethod: 'manual',
      },
    ],
    requirements: {
      completedQuests: ['q_201'],
      minLevel: 'strategist',
    },
    tier_required: 'premium',
  },

  // Mastery Quests
  {
    id: 'q_301',
    title: 'The Dark Triad',
    subtitle: 'Know your adversaries',
    description: 'Study the psychology of narcissism, Machiavellianism, and psychopathy to recognize and defend against them.',
    icon: 'AlertTriangle',
    category: 'mastery',
    xpReward: 400,
    skillPointsReward: 8,
    objectives: [
      {
        id: 'q_301_obj_1',
        text: 'Deep dive into narcissistic personality patterns',
        type: 'lesson',
        verificationMethod: 'quiz',
      },
      {
        id: 'q_301_obj_2',
        text: 'Learn Machiavellian strategic thinking',
        type: 'lesson',
        verificationMethod: 'quiz',
      },
      {
        id: 'q_301_obj_3',
        text: 'Understand psychopathic manipulation techniques',
        type: 'lesson',
        verificationMethod: 'quiz',
      },
      {
        id: 'q_301_obj_4',
        text: 'Identify a dark triad individual in your past',
        type: 'reflection',
        verificationMethod: 'self_report',
      },
      {
        id: 'q_301_obj_5',
        text: 'Build your defense protocol against each type',
        type: 'practice',
        verificationMethod: 'self_report',
      },
    ],
    requirements: {
      completedQuests: ['q_202'],
      minLevel: 'manipulatrix',
    },
    tier_required: 'vip',
  },
  {
    id: 'q_302',
    title: 'The Empress Protocol',
    subtitle: 'Final ascension',
    description: 'The ultimate test. Demonstrate mastery across all domains to claim your crown.',
    icon: 'Gem',
    category: 'mastery',
    xpReward: 500,
    skillPointsReward: 10,
    objectives: [
      {
        id: 'q_302_obj_1',
        text: 'Complete all skill trees to tier 3',
        type: 'practice',
        verificationMethod: 'manual',
      },
      {
        id: 'q_302_obj_2',
        text: 'Maintain a 30-day streak',
        type: 'practice',
        verificationMethod: 'streak',
      },
      {
        id: 'q_302_obj_3',
        text: 'Successfully manage 5+ prospects in rotation',
        type: 'practice',
        verificationMethod: 'manual',
      },
      {
        id: 'q_302_obj_4',
        text: 'Write your personal doctrine',
        type: 'reflection',
        verificationMethod: 'self_report',
      },
      {
        id: 'q_302_obj_5',
        text: 'Mentor another student for 2 weeks',
        type: 'field_work',
        verificationMethod: 'self_report',
      },
    ],
    requirements: {
      completedQuests: ['q_301'],
      minLevel: 'manipulatrix',
    },
    tier_required: 'vip',
  },
];

// Quest categories info
export const QUEST_CATEGORIES = {
  foundation: {
    label: 'Foundation',
    description: 'Essential concepts for beginners',
    color: '#22C55E',
  },
  intermediate: {
    label: 'Intermediate',
    description: 'Building practical skills',
    color: '#0EA5E9',
  },
  advanced: {
    label: 'Advanced',
    description: 'Complex strategies and techniques',
    color: '#8B5CF6',
  },
  mastery: {
    label: 'Mastery',
    description: 'Final challenges for the dedicated',
    color: '#D4AF37',
  },
};

// Helper functions
export function getQuestById(id: string): Quest | undefined {
  return QUESTS.find(q => q.id === id);
}

export function getQuestsByCategory(category: Quest['category']): Quest[] {
  return QUESTS.filter(q => q.category === category);
}

export function getAvailableQuests(
  completedQuests: string[],
  currentLevel: string,
  tier: 'free' | 'premium' | 'vip'
): Quest[] {
  const tierOrder = { free: 0, premium: 1, vip: 2 };
  const userTierLevel = tierOrder[tier];

  return QUESTS.filter(quest => {
    // Check tier access
    const questTierLevel = tierOrder[quest.tier_required];
    if (questTierLevel > userTierLevel) return false;

    // Check if already completed
    if (completedQuests.includes(quest.id)) return false;

    // Check quest requirements
    const { requirements } = quest;

    // Check required quests
    if (requirements.completedQuests) {
      const hasAllRequired = requirements.completedQuests.every(
        qId => completedQuests.includes(qId)
      );
      if (!hasAllRequired) return false;
    }

    return true;
  });
}

export function getQuestProgress(
  questId: string,
  completedObjectives: string[]
): number {
  const quest = getQuestById(questId);
  if (!quest) return 0;

  const totalObjectives = quest.objectives.length;
  const completed = quest.objectives.filter(
    obj => completedObjectives.includes(obj.id)
  ).length;

  return (completed / totalObjectives) * 100;
}
