// Week 5: The Rotation
// Master the art of managing multiple prospects

import type { WeeklyMission } from './types';

export const week05Mission: WeeklyMission = {
  id: 'week-05-the-rotation',
  week: 5,
  title: 'The Rotation',
  subtitle: 'Never put all your eggs in one basket. Never.',
  description: 'The single greatest vulnerability in any romantic pursuit is tunnel vision—becoming so fixated on one person that you lose all leverage. This week, you learn the Rotation: the strategic management of multiple options that keeps you grounded, attractive, and impossible to manipulate.',
  icon: 'RefreshCw',
  color: '#F59E0B',
  tier: 'premium',

  tacticalBrief: {
    opening: 'The person who has options cannot be desperate. The person who cannot be desperate cannot be manipulated. The Rotation is not about being unfaithful—it is about never becoming so invested in one outcome that you lose yourself. When you have multiple people interested in you, you walk differently. You speak differently. You radiate the confidence that comes from abundance.',

    concepts: [
      {
        title: 'The Power of Alternatives',
        content: 'A negotiator with no alternatives has no power. The same applies to romance. When you have only one prospect, every interaction carries catastrophic weight. Will they text back? Did they like me? Am I enough? But when you have three prospects, no single interaction can devastate you. This is not manipulation—it is sanity.',
      },
      {
        title: 'The Three-Minimum Rule',
        content: 'Never have fewer than three active options until you have consciously chosen exclusivity. This does not require physical intimacy with all three—it requires genuine options for your time, attention, and romantic energy. Three prospects means you can lose one and still have two. You can never be left with nothing.',
      },
      {
        title: 'The Comparison Advantage',
        content: 'When you only know one person, you have no reference point. Their treatment of you becomes your baseline. But when you are dating multiple people, you see variation. One texts thoughtfully; another is inconsistent. One plans dates; another expects you to. The rotation provides clarity that monogamous focus cannot.',
      },
      {
        title: 'Rotation Ethics',
        content: 'The rotation is ethical when you have not agreed to exclusivity. You owe no one exclusivity they have not earned and you have not granted. Until someone has demonstrated consistent value, invested substantially, and explicitly committed—your attention remains distributed. This protects you from over-investing in the unworthy.',
      },
    ],

    keyTakeaways: [
      'Options eliminate desperation—desperation repels',
      'Never fewer than three until you consciously choose one',
      'Comparison provides clarity unavailable to tunnel vision',
      'You owe exclusivity only after it is earned and granted',
      'The rotation is self-protection, not deception',
    ],
  },

  objectives: [
    {
      id: 'w5-obj-1',
      text: 'Understand the strategic logic of the Rotation',
      type: 'learn',
    },
    {
      id: 'w5-obj-2',
      text: 'Audit your current romantic attention distribution',
      type: 'practice',
    },
    {
      id: 'w5-obj-3',
      text: 'Expand your options to meet the three-minimum standard',
      type: 'practice',
    },
    {
      id: 'w5-obj-4',
      text: 'Practice the comparison framework on current prospects',
      type: 'practice',
    },
    {
      id: 'w5-obj-5',
      text: 'Complete the end-of-week reflection',
      type: 'reflect',
    },
  ],

  fieldExercises: [
    {
      id: 'w5-ex-1',
      task: 'The Options Audit',
      context: 'Honestly assess your current romantic landscape.',
      successCriteria: 'List everyone currently showing romantic interest or who you are pursuing. Be honest—acquaintances who might be interested do not count. Only active, demonstrable interest. How many genuine options do you have?',
      difficulty: 'beginner',
    },
    {
      id: 'w5-ex-2',
      task: 'The Expansion Initiative',
      context: 'If you have fewer than three options.',
      successCriteria: 'Take concrete action to expand: restart conversations that faded, accept invitations you would normally decline, initiate contact with someone new. Document what you did and any responses received.',
      difficulty: 'intermediate',
    },
    {
      id: 'w5-ex-3',
      task: 'The Comparison Matrix',
      context: 'If you have multiple prospects.',
      successCriteria: 'Create a comparison document: Who initiates more? Who plans dates? Who is more consistent? Who makes you feel most valued? Use the rotation for clarity, not just abundance.',
      difficulty: 'intermediate',
    },
    {
      id: 'w5-ex-4',
      task: 'The Detachment Test',
      context: 'With your most fixated-upon prospect.',
      successCriteria: 'Deliberately delay responding to them for 24 hours while actively engaging with other options. Document: How anxious were you? Did focusing on others reduce fixation? How did your prospect respond to the delay?',
      difficulty: 'intermediate',
    },
    {
      id: 'w5-ex-5',
      task: 'The Mental Shift',
      context: 'When you notice fixation on one person building.',
      successCriteria: 'Catch the tunnel vision forming, consciously redirect attention to other options or to expanding your options. Document: What triggered the fixation? How did redirecting feel? Did it reduce anxiety?',
      difficulty: 'advanced',
    },
  ],

  reflectionPrompts: [
    'How many genuine options do you currently have? What does this number reveal about your vulnerability?',
    'When have you suffered because you had no alternatives? What would have been different with options?',
    'What resistance do you feel to the Rotation concept? Where does that resistance come from?',
    'How did comparing prospects provide clarity you did not have before?',
    'What specific actions will you take to maintain at least three options going forward?',
  ],

  quiz: {
    questions: [
      {
        id: 'w5-q1',
        question: 'Why does having only one romantic prospect make you vulnerable?',
        options: [
          'They might reject you',
          'Every interaction carries catastrophic weight, enabling manipulation',
          'You might get bored with them',
          'Your friends will judge you',
        ],
        correctIndex: 1,
        explanation: 'When you have only one prospect, every interaction becomes high-stakes. This desperation is visible and makes you susceptible to manipulation. Options eliminate this vulnerability.',
      },
      {
        id: 'w5-q2',
        question: 'What is the Three-Minimum Rule?',
        options: [
          'Wait at least three dates before physical intimacy',
          'Have at least three conversations before deciding interest',
          'Never have fewer than three active options until consciously choosing exclusivity',
          'Give someone three chances before ending things',
        ],
        correctIndex: 2,
        explanation: 'The Three-Minimum Rule states you should never have fewer than three active options until you have consciously chosen exclusivity. This means you can lose one and still have two—never left with nothing.',
      },
      {
        id: 'w5-q3',
        question: 'The Comparison Advantage of the Rotation provides:',
        options: [
          'A way to make partners jealous',
          'More people to date at once',
          'Clarity about how different people treat you that tunnel vision cannot provide',
          'Backup options in case you get dumped',
        ],
        correctIndex: 2,
        explanation: 'When dating multiple people, you see variation in treatment—who initiates, who plans, who is consistent. This comparison provides clarity impossible when focused on only one person.',
      },
      {
        id: 'w5-q4',
        question: 'According to Rotation Ethics, when do you owe someone exclusivity?',
        options: [
          'After the third date',
          'When you start having feelings for them',
          'After they have demonstrated value, invested substantially, and explicitly committed',
          'When they ask you to be exclusive',
        ],
        correctIndex: 2,
        explanation: 'You owe no one exclusivity they have not earned and you have not granted. Until someone demonstrates consistent value, invests substantially, and explicitly commits—your attention remains distributed.',
      },
    ],
  },

  requirements: {
    minExercisesCompleted: 3,
    reflectionRequired: true,
  },
};
