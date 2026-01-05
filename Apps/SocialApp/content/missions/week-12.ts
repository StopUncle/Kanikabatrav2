// Week 12: The Empress Endgame
// Ascend to your throne

import type { WeeklyMission } from './types';

export const week12Mission: WeeklyMission = {
  id: 'week-12-empress-endgame',
  week: 12,
  title: 'The Empress Endgame',
  subtitle: 'Stop surviving. Start reigning.',
  description: 'You have learned the tactics, practiced the techniques, developed the mindset. Now comes the integration—the transformation from student to sovereign. This final week is not about learning new skills. It is about becoming the person who naturally commands every room, relationship, and opportunity.',
  icon: 'Crown',
  color: '#C9A961',
  tier: 'vip',

  tacticalBrief: {
    opening: 'The Empress does not manipulate—she positions. She does not chase—she selects. She does not beg for commitment—she grants access to her world. This is not about becoming someone else. It is about fully becoming who you were always meant to be: sovereign over your own life, architect of your own destiny, ruler of your own domain.',

    concepts: [
      {
        title: 'The Five Pillars of the Empress',
        content: 'Financial Sovereignty: Never depend on anyone for survival. Physical Dominion: Your body as a temple of strength and beauty. Emotional Fortress: Unshakeable core, impervious to manipulation. Social Kingdom: A court of loyal allies and valuable connections. Strategic Mind: The ability to see three moves ahead in any situation.',
      },
      {
        title: 'The Granting Position',
        content: 'The Empress is always granting, never seeking. She grants access to her time. She grants presence at her events. She grants consideration for commitment. This is not arrogance—it is accurate positioning. You are the prize. Act accordingly.',
      },
      {
        title: 'The Selection Mindset',
        content: 'You do not hope to be chosen. You choose. Every person in your life—romantic, professional, social—is there because you selected them. You can un-select them at any moment. This awareness changes everything about how you carry yourself.',
      },
      {
        title: 'The Eternal Reign',
        content: 'The Empress Endgame is not a destination—it is a way of being. Not something you achieve once, but something you practice daily. The tactics become instincts. The strategies become nature. The mindset becomes identity. This is not the end. This is the beginning of your reign.',
      },
    ],

    keyTakeaways: [
      'Build the Five Pillars: Financial, Physical, Emotional, Social, Strategic',
      'Position yourself as granting access, not seeking acceptance',
      'You select—you do not hope to be selected',
      'The Empress Endgame is a daily practice, not a one-time achievement',
      'This is not who you become. This is who you finally allow yourself to be.',
    ],
  },

  objectives: [
    {
      id: 'w12-obj-1',
      text: 'Assess your current strength across the Five Pillars',
      type: 'practice',
    },
    {
      id: 'w12-obj-2',
      text: 'Create a development plan for your weakest pillars',
      type: 'practice',
    },
    {
      id: 'w12-obj-3',
      text: 'Practice the granting position in all interactions for one week',
      type: 'practice',
    },
    {
      id: 'w12-obj-4',
      text: 'Execute a selection decision—add or remove someone from your life',
      type: 'practice',
    },
    {
      id: 'w12-obj-5',
      text: 'Complete the final reflection and coronation ritual',
      type: 'reflect',
    },
  ],

  fieldExercises: [
    {
      id: 'w12-ex-1',
      task: 'The Five Pillars Audit',
      context: 'Comprehensive self-assessment.',
      successCriteria: 'Rate yourself 1-10 on each pillar: Financial (income, savings, independence), Physical (fitness, appearance, health), Emotional (stability, boundaries, resilience), Social (network quality, allies, influence), Strategic (planning ability, pattern recognition, tactical thinking).',
      difficulty: 'beginner',
    },
    {
      id: 'w12-ex-2',
      task: 'The Pillar Development Plan',
      context: 'For your two weakest pillars.',
      successCriteria: 'Create specific, actionable 90-day plans to strengthen your weakest pillars. Not vague goals—concrete actions with timelines. What will you do this month? This week? Tomorrow?',
      difficulty: 'intermediate',
    },
    {
      id: 'w12-ex-3',
      task: 'The Granting Week',
      context: 'All interactions for seven days.',
      successCriteria: 'Enter every interaction from the granting position. You are not seeking their approval—you are evaluating whether they qualify for yours. Document: How did this shift change the dynamics? How did others respond differently?',
      difficulty: 'intermediate',
    },
    {
      id: 'w12-ex-4',
      task: 'The Selection Execution',
      context: 'Someone who has been taking up space in your life without earning it.',
      successCriteria: 'Make a selection decision: Either elevate someone who deserves more access, or remove someone who does not deserve their current access. Execute the decision cleanly. Document the impact.',
      difficulty: 'advanced',
    },
    {
      id: 'w12-ex-5',
      task: 'The Coronation Ritual',
      context: 'Private ceremony of self-recognition.',
      successCriteria: 'Create a personal ritual acknowledging your transformation: Write a declaration of who you now are. State your non-negotiables. Define your reign. This is your coronation—make it meaningful.',
      difficulty: 'advanced',
    },
  ],

  reflectionPrompts: [
    'Who were you when you started this program? Who are you now?',
    'Which pillar showed the most growth? Which still needs the most work?',
    'What old patterns of seeking have you released? What granting energy have you claimed?',
    'Who no longer belongs in your life? Who deserves elevation?',
    'What does your reign look like? What kind of Empress will you be?',
  ],

  quiz: {
    questions: [
      {
        id: 'w12-q1',
        question: 'What are the Five Pillars of the Empress?',
        options: [
          'Beauty, Wealth, Fame, Power, Connections',
          'Financial, Physical, Emotional, Social, Strategic',
          'Confidence, Intelligence, Charm, Mystery, Independence',
          'Career, Family, Health, Spirituality, Relationships',
        ],
        correctIndex: 1,
        explanation: 'The Five Pillars are: Financial Sovereignty, Physical Dominion, Emotional Fortress, Social Kingdom, and Strategic Mind. These form the foundation of your reign.',
      },
      {
        id: 'w12-q2',
        question: 'The Granting Position means:',
        options: [
          'Being generous with your time and attention',
          'Always granting, never seeking—you grant access, consideration, and presence',
          'Giving people what they ask for',
          'Being forgiving of others\' mistakes',
        ],
        correctIndex: 1,
        explanation: 'The Empress is always granting, never seeking. She grants access to her time, grants presence at her events, grants consideration for commitment. You are the prize. Act accordingly.',
      },
      {
        id: 'w12-q3',
        question: 'The Selection Mindset is about:',
        options: [
          'Being picky about dates',
          'Hoping to be chosen by the right person',
          'You choose—every person in your life is there because you selected them',
          'Making lists of what you want in a partner',
        ],
        correctIndex: 2,
        explanation: 'You do not hope to be chosen. You choose. Every person in your life is there because you selected them, and you can un-select them at any moment. This awareness changes how you carry yourself.',
      },
      {
        id: 'w12-q4',
        question: 'The Empress Endgame is:',
        options: [
          'A final destination to reach',
          'A one-time achievement when you complete the program',
          'A daily practice and way of being, not a destination',
          'Something only a few people can achieve',
        ],
        correctIndex: 2,
        explanation: 'The Empress Endgame is not a destination—it is a way of being. The tactics become instincts. The strategies become nature. The mindset becomes identity. This is not the end—this is the beginning of your reign.',
      },
    ],
  },

  requirements: {
    minExercisesCompleted: 4,
    reflectionRequired: true,
  },
};
