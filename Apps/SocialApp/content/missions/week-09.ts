// Week 9: Family Colonization
// Infiltrate and embed in his world

import type { WeeklyMission } from './types';

export const week09Mission: WeeklyMission = {
  id: 'week-09-family-colonization',
  week: 9,
  title: 'Family Colonization',
  subtitle: 'Win the family, and you win the war.',
  description: 'The relationship is not just between two people—it exists within an ecosystem of family, friends, and social networks. This week, you learn the art of strategic integration: how to embed yourself so deeply into his world that extraction becomes unthinkable.',
  icon: 'Users',
  color: '#7C3AED',
  tier: 'vip',

  tacticalBrief: {
    opening: 'Amateur operators focus only on their target. Masters understand that the target exists within systems—family, friends, social circles. Win the family, and you gain powerful allies who will advocate for you, apply pressure for commitment, and make leaving you feel like betraying everyone he loves. This is not manipulation—it is strategic integration.',

    concepts: [
      {
        title: 'The Mother Strategy',
        content: 'In most cases, the mother is the emotional center of the family. Win her, and you win a permanent advocate. Mothers respond to respect (asking her advice), attentiveness (remembering details), and the impression that you are good for her child. Never compete with her—position yourself as her ally in caring for him.',
      },
      {
        title: 'The Sibling Alliance',
        content: 'Siblings are gatekeepers to family history and dynamics. They know his patterns, his previous relationships, his weaknesses. Win siblings by treating them as individuals, not extensions of your target. Show genuine interest in their lives. They become your intelligence network and advocacy corps.',
      },
      {
        title: 'Friend Group Integration',
        content: 'His friends will either facilitate or sabotage your relationship. The goal is making them like you independently—not just as "his girlfriend." Become someone they enjoy, respect, and want around. When friends advocate for you, their opinion carries weight he cannot dismiss.',
      },
      {
        title: 'The Extraction Cost',
        content: 'Strategic integration raises the cost of leaving you. It is no longer just losing you—it is disappointing his mother, losing his friends\' respect, disrupting family holidays. This is not trapping him; it is making the relationship valuable across multiple dimensions of his life.',
      },
    ],

    keyTakeaways: [
      'Relationships exist within systems—master the system',
      'The mother is often the key alliance to secure',
      'Siblings provide intelligence and advocacy',
      'Friend group approval creates independent pressure for commitment',
      'Strategic integration raises the cost of departure',
    ],
  },

  objectives: [
    {
      id: 'w9-obj-1',
      text: 'Map the key players in your target\'s ecosystem',
      type: 'practice',
    },
    {
      id: 'w9-obj-2',
      text: 'Execute the Mother Strategy or equivalent family approach',
      type: 'practice',
    },
    {
      id: 'w9-obj-3',
      text: 'Build independent rapport with at least one friend',
      type: 'practice',
    },
    {
      id: 'w9-obj-4',
      text: 'Assess your current integration depth',
      type: 'practice',
    },
    {
      id: 'w9-obj-5',
      text: 'Complete the end-of-week reflection',
      type: 'reflect',
    },
  ],

  fieldExercises: [
    {
      id: 'w9-ex-1',
      task: 'The Ecosystem Map',
      context: 'Analyze your target\'s social world.',
      successCriteria: 'Create a map of key relationships: parents, siblings, close friends, extended family. For each person: How much influence do they have? What is your current relationship with them? What is the strategic priority?',
      difficulty: 'beginner',
    },
    {
      id: 'w9-ex-2',
      task: 'The Mother Initiative',
      context: 'If you have access to his mother.',
      successCriteria: 'Execute a specific mother-winning action: Ask for her recipe, her advice on something, remember and reference something she mentioned previously. Document: How did she respond? Did she mention it to him?',
      difficulty: 'intermediate',
    },
    {
      id: 'w9-ex-3',
      task: 'The Friend Cultivation',
      context: 'His friend group.',
      successCriteria: 'Build rapport with at least one friend that exists independent of your target—a conversation, shared interest, or inside joke that is yours with them. Document: Did your target notice? How did the friend respond to direct engagement?',
      difficulty: 'intermediate',
    },
    {
      id: 'w9-ex-4',
      task: 'The Integration Audit',
      context: 'Assess your current position.',
      successCriteria: 'Rate your integration 1-10 with: Mother, Father, Siblings, Best Friend, Friend Group, Extended Family. For low scores, create specific action items to deepen integration.',
      difficulty: 'intermediate',
    },
    {
      id: 'w9-ex-5',
      task: 'The Advocate Test',
      context: 'Subtle assessment of your allies.',
      successCriteria: 'Create a situation where family or friends could advocate for you (mentioning future plans, asking their opinion of your relationship). Document: Who spoke up for you? Who stayed neutral? This reveals your true allies.',
      difficulty: 'advanced',
    },
  ],

  reflectionPrompts: [
    'Which relationships in his ecosystem have you been neglecting? Why?',
    'How did the Mother Strategy (or equivalent) change the family dynamic?',
    'Which friend became your strongest independent ally? How did that happen?',
    'If you left tomorrow, who in his world would advocate for reconciliation?',
    'What is your integration plan for the relationships still underdeveloped?',
  ],

  quiz: {
    questions: [
      {
        id: 'w9-q1',
        question: 'Why is the mother often the key alliance to secure in Family Colonization?',
        options: [
          'Mothers control the family finances',
          'She is typically the emotional center who can advocate for you permanently',
          'Mothers always approve of their children\'s partners',
          'She decides who gets invited to family events',
        ],
        correctIndex: 1,
        explanation: 'The mother is often the emotional center of the family. Win her, and you gain a permanent advocate who will apply pressure for commitment and make leaving you feel like betraying everyone.',
      },
      {
        id: 'w9-q2',
        question: 'Why are siblings valuable in the strategic integration process?',
        options: [
          'They can lend you money',
          'They are gatekeepers to family history, patterns, and serve as your intelligence network',
          'They have the most influence on family decisions',
          'They are usually easier to impress than parents',
        ],
        correctIndex: 1,
        explanation: 'Siblings know his patterns, his previous relationships, his weaknesses. Win them by treating them as individuals, and they become your intelligence network and advocacy corps.',
      },
      {
        id: 'w9-q3',
        question: 'The goal of friend group integration is:',
        options: [
          'Making his friends jealous',
          'Proving you are better than his exes',
          'Making them like you independently, not just as his partner',
          'Getting them to report on his behavior',
        ],
        correctIndex: 2,
        explanation: 'Become someone they enjoy, respect, and want around independently. When friends advocate for you, their opinion carries weight he cannot dismiss.',
      },
      {
        id: 'w9-q4',
        question: 'What is "The Extraction Cost" concept?',
        options: [
          'The financial cost of ending a relationship',
          'Strategic integration raises the cost of leaving—disappointing family, losing friends\' respect',
          'The emotional pain of a breakup',
          'The time it takes to move on after an exit',
        ],
        correctIndex: 1,
        explanation: 'Strategic integration raises the cost of leaving you. It is no longer just losing you—it is disappointing his mother, losing friends\' respect, disrupting family holidays. This makes the relationship valuable across multiple dimensions.',
      },
    ],
  },

  requirements: {
    minExercisesCompleted: 3,
    reflectionRequired: true,
  },
};
