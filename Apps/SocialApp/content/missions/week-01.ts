// Week 1: The Doctrine of Cold
// Foundation mission - emotional sovereignty and strategic detachment

import type { WeeklyMission } from './types';

export const week01Mission: WeeklyMission = {
  id: 'week-01-doctrine-of-cold',
  week: 1,
  title: 'The Doctrine of Cold',
  subtitle: 'Emotion clouds judgment. Strategy creates outcomes.',
  description: 'Most people navigate relationships in a fog of emotion—falling in love before assessing value, bonding before testing loyalty, giving everything before receiving anything. This week, you install a new operating system. You become the one who moves with intention.',
  icon: 'Snowflake',
  color: '#0EA5E9',
  tier: 'free',

  tacticalBrief: {
    opening: 'While others are blinded by neurochemical reactions—oxytocin, dopamine, the whole cocktail designed to bond them to someone before they know if that person deserves it—you will learn to assess before you invest. To calculate before you fall. To strategize before you hope. This is the Doctrine of Cold.',

    concepts: [
      {
        title: 'The Four Pillars of Cold',
        content: 'Emotional Independence: You do not need anyone to complete you. Relationships enhance your life—they do not define it. Strategic Thinking: Every interaction is evaluated for ROI. Your time and attention have value. Controlled Vulnerability: You reveal only what serves your purpose. Calculated Detachment: You can walk away from anyone, at any time, without looking back. This is not cruelty—this is freedom.',
      },
      {
        title: 'The Absence of Anxiety',
        content: 'The absence of anxiety is a superpower. While others agonize over what might go wrong, you act with precision. When others meet someone attractive, their internal monologue spirals: "Should I approach? What if they reject me?" Your monologue is different: "Target identified. Approach executed. If not receptive, move on—nothing lost."',
      },
      {
        title: 'Assessment Before Investment',
        content: 'The empath gives everything hoping to receive something. The strategist assesses value before investing anything. Before you invest emotional energy, time, or vulnerability, you must know: What is this person\'s value to me? What have they demonstrated—not promised? What is my return on this investment?',
      },
      {
        title: 'The Walking Away Power',
        content: 'The ability to walk away is the ultimate leverage. When you can genuinely walk away from anyone or anything, you hold all the power. This is not pretending to be detached—this is genuine emotional self-sufficiency. You do not need this person. You do not need this outcome. You are complete unto yourself.',
      },
    ],

    keyTakeaways: [
      'Emotion clouds judgment—strategy creates outcomes',
      'Emotional independence is the foundation of all power',
      'Your attention and energy are finite resources with real value',
      'Assessment before investment prevents regret',
      'The ability to walk away is the ultimate leverage',
    ],
  },

  objectives: [
    {
      id: 'w1-obj-1',
      text: 'Master the Four Pillars of Cold through the tactical brief',
      type: 'learn',
    },
    {
      id: 'w1-obj-2',
      text: 'Complete the Cold Audit on your current relationships',
      type: 'practice',
    },
    {
      id: 'w1-obj-3',
      text: 'Practice assessment before investment in 3 situations',
      type: 'practice',
    },
    {
      id: 'w1-obj-4',
      text: 'Identify your walking-away vulnerabilities',
      type: 'practice',
    },
    {
      id: 'w1-obj-5',
      text: 'Complete the end-of-week reflection',
      type: 'reflect',
    },
  ],

  fieldExercises: [
    {
      id: 'w1-ex-1',
      task: 'The Cold Audit',
      context: 'Review your five most significant relationships (romantic, family, friends).',
      successCriteria: 'For each, honestly answer: Am I investing more than I am receiving? Note which relationships make you feel anxious vs. valued. Identify relationships where you cannot imagine walking away—these are your vulnerabilities.',
      difficulty: 'beginner',
    },
    {
      id: 'w1-ex-2',
      task: 'The Value Assessment',
      context: 'Before your next significant interaction with someone seeking your time or attention.',
      successCriteria: 'Before responding or engaging, ask: What is their demonstrated value (not potential)? What do I gain from this interaction? Is this a good ROI for my energy?',
      difficulty: 'beginner',
    },
    {
      id: 'w1-ex-3',
      task: 'The Detachment Practice',
      context: 'Choose one relationship where you feel overly invested or anxious.',
      successCriteria: 'Practice strategic detachment for 48 hours: no initiating contact, no checking social media, no mental rehearsing. Note your emotional response and what it reveals about your dependency.',
      difficulty: 'intermediate',
    },
    {
      id: 'w1-ex-4',
      task: 'The Walking Away Drill',
      context: 'In a negotiation, request situation, or any interaction where you want something.',
      successCriteria: 'Go in with genuine willingness to walk away if terms are not met. Notice how this changes your energy, posture, and the other person\'s response to you.',
      difficulty: 'intermediate',
    },
    {
      id: 'w1-ex-5',
      task: 'The Anxiety Elimination',
      context: 'The next time you feel relationship anxiety (waiting for a text, worrying about their opinion).',
      successCriteria: 'Catch the anxiety, label it as "old programming," and redirect to productive activity. Document: What triggered it? How long before you redirected? What helped?',
      difficulty: 'advanced',
    },
  ],

  reflectionPrompts: [
    'Which of the Four Pillars is your weakest? What makes it difficult for you?',
    'What did your Cold Audit reveal about where you are over-investing?',
    'When you practiced walking-away energy, how did others respond differently to you?',
    'What anxieties arose during detachment practice? What do they reveal about your dependencies?',
    'How would your life change if you fully embodied the Doctrine of Cold?',
  ],

  quiz: {
    questions: [
      {
        id: 'w1-q1',
        question: 'According to the Doctrine of Cold, what is "Emotional Independence"?',
        options: [
          'Never having emotions',
          'Not needing anyone to complete, validate, or make you happy',
          'Being cold and cruel to others',
          'Hiding your true feelings',
        ],
        correctIndex: 1,
        explanation: 'Emotional Independence means you do not need anyone to complete you, validate you, or make you happy. Relationships enhance your life—they do not define it.',
      },
      {
        id: 'w1-q2',
        question: 'What does "Assessment Before Investment" mean?',
        options: [
          'Check their bank account before dating',
          'Evaluate what they have demonstrated (not promised) before investing emotional energy',
          'Get a background check on everyone',
          'Wait three months before any relationship',
        ],
        correctIndex: 1,
        explanation: 'Before you invest emotional energy, time, or vulnerability, you must know their demonstrated value—not their potential or promises.',
      },
      {
        id: 'w1-q3',
        question: 'Why is the ability to walk away considered "ultimate leverage"?',
        options: [
          'It makes you seem mysterious',
          'It creates drama in relationships',
          'When you can genuinely walk away, you hold all the power',
          'It punishes bad behavior',
        ],
        correctIndex: 2,
        explanation: 'When you can genuinely walk away from anyone or anything, you hold all the power. This is not pretending—it is genuine emotional self-sufficiency.',
      },
      {
        id: 'w1-q4',
        question: 'What is "Controlled Vulnerability" according to the Four Pillars?',
        options: [
          'Never showing any weakness',
          'Being completely open about everything',
          'Revealing only what serves your purpose',
          'Crying to manipulate others',
        ],
        correctIndex: 2,
        explanation: 'Controlled Vulnerability means you reveal only what serves your purpose. Your pain, fears, and insecurities are strategic tools, not conversation starters.',
      },
    ],
  },

  requirements: {
    minExercisesCompleted: 3,
    reflectionRequired: true,
  },
};
