// Week 2: The Investment Ladder
// Make them climb to earn access to you

import type { WeeklyMission } from './types';

export const week02Mission: WeeklyMission = {
  id: 'week-02-investment-ladder',
  week: 2,
  title: 'The Investment Ladder',
  subtitle: 'What is given freely is valued less.',
  description: 'Every successful business understands scarcity. Limited-time offers. Exclusive memberships. Waiting lists. The same principle applies to you. When you are too available, too eager, too accommodating—your value plummets. This week, you learn to make people earn their way to you.',
  icon: 'TrendingUp',
  color: '#C9A961',
  tier: 'free',

  tacticalBrief: {
    opening: 'The Holy Grail Doctrine: Your access is currency, not a gift. In any marketplace, value is determined by scarcity and demand. When something is abundant and easily accessible, its price drops. When something is rare and difficult to obtain, its price rises. The Investment Ladder ensures that anyone who wants access to you must demonstrate their worth first. Each rung requires more effort. Most will fall off. That is the point.',

    concepts: [
      {
        title: 'The Five Rungs of Investment',
        content: 'Rung 1 - Attention: Consistent pursuit—regular texts, calls, asking you out properly. Rung 2 - Financial: Real investment, not coffee dates. Thoughtful spending shows seriousness. Rung 3 - Time: Prioritizing you over friends, hobbies, other plans. Rung 4 - Social: Introducing you to friends, family, colleagues—claiming you publicly. Rung 5 - Future: Making plans that include you, discussing long-term goals together.',
      },
      {
        title: 'The Commitment Tests',
        content: 'Before granting access, run these tests: Financial Test—do they invest without complaint? Time Test—do they prioritize you in their schedule? Social Test—have they integrated you into their life publicly? Future Test—do they make long-term plans with you? Emotional Test—do they remember details, support you in hard times? Only after passing all tests should you consider advancement.',
      },
      {
        title: 'Never Let Them Skip Rungs',
        content: 'The person who gets commitment without investment will never value what they have. The person who climbs every rung will fight to protect their position. When someone rushes for intimacy, commitment, or access before earning it, they are revealing they want benefits without doing the work. This is a red flag, not flattery.',
      },
      {
        title: 'The Psychology of Withholding',
        content: 'The Zeigarnik Effect: People remember incomplete tasks—you become an unfinished puzzle in their mind. Loss Aversion: The more they invest, the more they fear losing their progress. Intermittent Reinforcement: Unpredictable rewards create stronger desire. Social Proof: When you are not easily accessible, others assume you must be valuable.',
      },
      {
        title: 'Scarcity Creates Value',
        content: 'Be scarce. Not artificially unavailable—genuinely selective. Your attention is a prize. Your time is currency. Your inner world is a vault. The busy person is always more attractive than the available one. Constant availability signals low self-worth. Strategic absence creates longing.',
      },
    ],

    keyTakeaways: [
      'The Holy Grail Doctrine: Your access is currency, not a gift',
      'Run the five Commitment Tests before granting advancement',
      'The Zeigarnik Effect makes you an unfinished puzzle in their mind',
      'Those who skip rungs will not value their position',
      'Loss Aversion: The more they invest, the more they fear losing progress',
      'Rushing is a red flag, not romance—filter ruthlessly',
    ],
  },

  objectives: [
    {
      id: 'w2-obj-1',
      text: 'Master the Five Rungs of Investment',
      type: 'learn',
    },
    {
      id: 'w2-obj-2',
      text: 'Complete the Investment Audit on a current pursuit',
      type: 'practice',
    },
    {
      id: 'w2-obj-3',
      text: 'Identify and address rung-skipping attempts',
      type: 'practice',
    },
    {
      id: 'w2-obj-4',
      text: 'Practice scarcity positioning in your availability',
      type: 'practice',
    },
    {
      id: 'w2-obj-5',
      text: 'Complete the end-of-week reflection',
      type: 'reflect',
    },
  ],

  fieldExercises: [
    {
      id: 'w2-ex-1',
      task: 'The Investment Audit',
      context: 'Think of someone currently pursuing your attention or interest.',
      successCriteria: 'Map them against the Five Rungs: Which rung are they actually on vs. which rung are they acting like they deserve? Identify any rungs they have tried to skip. Note specific behaviors showing investment vs. entitlement.',
      difficulty: 'beginner',
    },
    {
      id: 'w2-ex-2',
      task: 'The Scarcity Signal',
      context: 'When someone requests your time or attention this week.',
      successCriteria: 'Do not respond immediately. Wait at least 2-4 hours (or longer depending on their investment level). Note their response—do they double-text? Get anxious? Accept your pace? Their reaction reveals their position.',
      difficulty: 'beginner',
    },
    {
      id: 'w2-ex-3',
      task: 'The Rung Enforcement',
      context: 'When someone attempts to skip a rung (asking for too much access, pushing for commitment, demanding vulnerability).',
      successCriteria: 'Redirect without explaining: "We are not there yet" or simply change the subject. Do not justify your boundaries. Note: Did they respect the boundary or push harder?',
      difficulty: 'intermediate',
    },
    {
      id: 'w2-ex-4',
      task: 'The Value Test',
      context: 'With someone you are evaluating for potential relationship.',
      successCriteria: 'Make a small request that requires effort from them—not money, but time, attention, or inconvenience. Note: Do they meet it enthusiastically, reluctantly, or not at all? Their response indicates investment level.',
      difficulty: 'intermediate',
    },
    {
      id: 'w2-ex-5',
      task: 'The Scarcity Lifestyle',
      context: 'For the entire week.',
      successCriteria: 'Genuinely fill your schedule with your own priorities. When someone asks for time, you should authentically have to check your calendar. Document how this changes others\' pursuit behavior.',
      difficulty: 'advanced',
    },
  ],

  reflectionPrompts: [
    'Which rungs have you been giving away for free in past relationships?',
    'What did your Investment Audit reveal about someone\'s actual vs. claimed position?',
    'How did people respond differently when you practiced scarcity?',
    'What rung-skipping attempts did you identify? How did you handle them?',
    'How does it feel to have a structured framework for evaluating investment?',
  ],

  quiz: {
    questions: [
      {
        id: 'w2-q1',
        question: 'What is the Holy Grail Doctrine?',
        options: [
          'A religious approach to dating',
          'Your access is currency, not a gift—value is determined by scarcity',
          'Always be available to show you care',
          'Focus on spiritual connection first',
        ],
        correctIndex: 1,
        explanation: 'The Holy Grail Doctrine states that your access is currency, not a gift. In any marketplace, value is determined by scarcity and demand. When something is easily accessible, its value drops.',
      },
      {
        id: 'w2-q2',
        question: 'What are the Five Rungs of Investment in order?',
        options: [
          'Love, Trust, Time, Access, Commitment',
          'Attention, Financial, Time, Social, Future',
          'Interest, Dating, Exclusivity, Engagement, Marriage',
          'Flirting, Dating, Relationship, Moving In, Marriage',
        ],
        correctIndex: 1,
        explanation: 'The Five Rungs are: Attention (consistent pursuit), Financial (real investment), Time (prioritization), Social (public integration), and Future (long-term planning together).',
      },
      {
        id: 'w2-q3',
        question: 'The Zeigarnik Effect in dating means:',
        options: [
          'People forget about you if you are too available',
          'People remember incomplete tasks—you become an unfinished puzzle',
          'Playing hard to get always backfires',
          'Men prefer women who are direct',
        ],
        correctIndex: 1,
        explanation: 'The Zeigarnik Effect states that people remember incomplete or interrupted tasks better than completed ones. When you do not grant access immediately, you become an unfinished puzzle in their mind.',
      },
      {
        id: 'w2-q4',
        question: 'Which is NOT one of the five Commitment Tests?',
        options: [
          'Financial Test—do they invest without complaint?',
          'Social Test—have they integrated you publicly?',
          'Chemistry Test—do you feel butterflies?',
          'Future Test—do they make long-term plans with you?',
        ],
        correctIndex: 2,
        explanation: 'The five Commitment Tests are: Financial, Time, Social, Future, and Emotional. Chemistry or "butterflies" is not a test—it is an emotion that can be manufactured through manipulation.',
      },
    ],
  },

  requirements: {
    minExercisesCompleted: 3,
    reflectionRequired: true,
  },
};
