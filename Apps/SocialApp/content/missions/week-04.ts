// Week 4: Strategic Positioning
// Master power dynamics in every interaction

import type { WeeklyMission } from './types';

export const week04Mission: WeeklyMission = {
  id: 'week-04-strategic-positioning',
  week: 4,
  title: 'Strategic Positioning',
  subtitle: 'The less desperate party holds more power.',
  description: 'Every social interaction has an invisible power dynamic. Someone is seeking approval. Someone is granting it. Someone is leading. Someone is following. Most people float through these dynamics unconsciously. This week, you learn to position yourself deliberately in every exchange.',
  icon: 'Crown',
  color: '#7C3AED',
  tier: 'premium',

  tacticalBrief: {
    opening: 'The person who needs the interaction less controls the interaction more. This is not about manipulation—it is about not being desperate. Desperation is visible, and it repels. When you position yourself correctly, you are never chasing, never begging, never hoping. You are selecting.',

    concepts: [
      {
        title: 'The Seeking vs. Granting Position',
        content: 'Signs you are seeking: Excessive laughing at things that are not funny. Rapid speech, afraid of being interrupted. Constant eye contact seeking validation. Over-explaining choices. "Whatever you want is fine." Signs you are granting: Relaxed posture, measured speech. Comfortable with pauses. Making statements without qualifiers. Taking up physical and conversational space.',
      },
      {
        title: 'The Strategic Pause',
        content: 'Most people rush to fill silence because it makes them uncomfortable. Learn to be comfortable with silence. Count to three before responding. Let the pause stretch. The person who can hold silence holds power. This one technique alone will transform how others perceive you.',
      },
      {
        title: 'The Economics of Attention',
        content: 'Your attention operates like currency. What is given freely is valued less. What must be earned is treasured. Constant availability signals low self-worth. Strategic absence creates longing. The busy person is always more attractive than the available one.',
      },
      {
        title: 'Having Your Own Life',
        content: 'Your own goals, ambitions, and pursuits are the foundation of healthy power dynamics. You cannot position yourself as the prize if you have nothing else going on. Your life must be genuinely full and interesting—not manufactured scarcity, but authentic abundance of purpose.',
      },
    ],

    keyTakeaways: [
      'Power dynamics exist in every interaction—become aware of them',
      'The less desperate party has more influence',
      'Silence is a weapon—learn to wield it',
      'Your attention has value—spend it strategically',
      'Your own life is your greatest source of power',
    ],
  },

  objectives: [
    {
      id: 'w4-obj-1',
      text: 'Master the seeking vs. granting framework',
      type: 'learn',
    },
    {
      id: 'w4-obj-2',
      text: 'Practice the Strategic Pause in 5 conversations',
      type: 'practice',
    },
    {
      id: 'w4-obj-3',
      text: 'Map your default position in different relationships',
      type: 'practice',
    },
    {
      id: 'w4-obj-4',
      text: 'Consciously reposition in at least one interaction',
      type: 'practice',
    },
    {
      id: 'w4-obj-5',
      text: 'Complete the end-of-week reflection',
      type: 'reflect',
    },
  ],

  fieldExercises: [
    {
      id: 'w4-ex-1',
      task: 'Position Mapping',
      context: 'Review your last five significant conversations.',
      successCriteria: 'For each: Were you seeking or granting? Leading or following? Identify patterns—do you consistently end up in one position? Note which relationships put you in seeking mode.',
      difficulty: 'beginner',
    },
    {
      id: 'w4-ex-2',
      task: 'The Strategic Pause',
      context: 'In every significant conversation this week.',
      successCriteria: 'Wait three full seconds before responding to anything. Notice how this changes the dynamic. Document others\' reactions when you do not rush to respond.',
      difficulty: 'beginner',
    },
    {
      id: 'w4-ex-3',
      task: 'The Reposition',
      context: 'In one relationship where you are typically in the seeking position.',
      successCriteria: 'Consciously shift to granting position: slower speech, less availability, more pauses, fewer qualifiers. Note how the other person\'s behavior changes.',
      difficulty: 'intermediate',
    },
    {
      id: 'w4-ex-4',
      task: 'The Attention Audit',
      context: 'Track your attention allocation for three days.',
      successCriteria: 'Who gets your attention freely? Who earns it? Where are you over-investing attention relative to what you receive? Create a plan to reallocate.',
      difficulty: 'intermediate',
    },
    {
      id: 'w4-ex-5',
      task: 'The Life Audit',
      context: 'Evaluate your current "own life" foundation.',
      successCriteria: 'List your goals, ambitions, hobbies, and social activities outside of romantic interest. If this list is thin, create three specific actions to build a fuller life that makes you genuinely less available.',
      difficulty: 'advanced',
    },
  ],

  reflectionPrompts: [
    'In which relationships do you default to the seeking position? Why?',
    'How did the Strategic Pause change the dynamics of your conversations?',
    'What did the Attention Audit reveal about where you are over-investing?',
    'When you repositioned consciously, how did the other person respond?',
    'What do you need to build in your own life to naturally hold the granting position?',
  ],

  quiz: {
    questions: [
      {
        id: 'w4-q1',
        question: 'Which of the following is a sign you are in the "seeking" position?',
        options: [
          'Taking your time before responding',
          'Excessive laughing at things that are not funny',
          'Making statements without qualifiers',
          'Being comfortable with pauses in conversation',
        ],
        correctIndex: 1,
        explanation: 'Excessive laughing at unfunny things is a classic seeking behavior—trying too hard to please. Granting position involves measured responses and comfort with silence.',
      },
      {
        id: 'w4-q2',
        question: 'The Strategic Pause works because:',
        options: [
          'It makes you seem mysterious and interesting',
          'People assume you are thinking deeply',
          'Most people rush to fill silence—holding it shifts power to you',
          'It gives you time to think of clever responses',
        ],
        correctIndex: 2,
        explanation: 'The Strategic Pause works because silence makes most people uncomfortable. The person who can hold silence comfortably holds power in the interaction.',
      },
      {
        id: 'w4-q3',
        question: 'According to the Economics of Attention, constant availability signals:',
        options: [
          'That you are a caring and dedicated person',
          'High interest and investment in the relationship',
          'Low self-worth and desperation',
          'Emotional intelligence and maturity',
        ],
        correctIndex: 2,
        explanation: 'Constant availability signals low self-worth. The busy person with a full life is more attractive than the always-available one. Strategic absence creates longing.',
      },
      {
        id: 'w4-q4',
        question: 'Why is "having your own life" essential to strategic positioning?',
        options: [
          'It makes you seem more interesting on dates',
          'It gives you things to talk about',
          'You cannot position yourself as the prize if you have nothing else going on',
          'It provides backup options if a relationship fails',
        ],
        correctIndex: 2,
        explanation: 'Your own goals and pursuits are the foundation of healthy power dynamics. Without them, you cannot authentically hold the granting position—only manufactured scarcity, not genuine abundance.',
      },
    ],
  },

  requirements: {
    minExercisesCompleted: 3,
    reflectionRequired: true,
  },
};
