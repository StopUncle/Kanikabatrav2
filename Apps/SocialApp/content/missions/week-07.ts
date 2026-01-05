// Week 7: The Transformation Protocol
// Rebuild yourself as the weapon

import type { WeeklyMission } from './types';

export const week07Mission: WeeklyMission = {
  id: 'week-07-transformation-protocol',
  week: 7,
  title: 'The Transformation Protocol',
  subtitle: 'You are not who you were born. You are who you build.',
  description: 'Every aspect of how you present yourself—appearance, voice, presence, energy—was either chosen or defaulted to. Most people default. This week, you begin deliberate construction. You audit every element of your external presentation and begin rebuilding yourself as the person who commands the room.',
  icon: 'Sparkles',
  color: '#14B8A6',
  tier: 'premium',

  tacticalBrief: {
    opening: 'The person you present to the world is a construction, whether you built it deliberately or let it form by accident. Those who achieve power choose every element with intention—their appearance, their voice, their mannerisms, the energy they project. The Transformation Protocol is the systematic reconstruction of your external self to match your ambitions.',

    concepts: [
      {
        title: 'The Mask Collection',
        content: 'Every social situation calls for a different version of you. The boardroom you is not the first-date you is not the friend-group you. These are not deceptions—they are strategic adaptations. The master operator has a collection of well-developed masks and deploys each one deliberately. Start building your collection.',
      },
      {
        title: 'Physical Presence Overhaul',
        content: 'Your body communicates before you speak. Posture signals confidence or defeat. Movement signals grace or clumsiness. Space occupancy signals power or submission. Audit your physical presence: Do you take up space or minimize yourself? Do you move with intention or drift? Every element can be trained.',
      },
      {
        title: 'Voice as Instrument',
        content: 'The voice is an instrument most people never learn to play. Pace: The fast speaker seems nervous; the measured speaker seems powerful. Pitch: Lower registers convey authority. Volume: Quiet forces attention; loud loses it. Learn to modulate. Record yourself. Eliminate verbal fillers. Develop your instrument.',
      },
      {
        title: 'The Energy Audit',
        content: 'You project an energy field that others perceive before any words are exchanged. What energy do you project? Anxious? Eager? Desperate? Calm? Confident? Magnetic? This energy is readable and trainable. The goal is to project an energy that draws others toward you rather than pushing them away.',
      },
    ],

    keyTakeaways: [
      'Your presentation is a construction—build it deliberately',
      'Different situations require different masks',
      'Physical presence communicates before words do',
      'Voice is a trainable instrument of influence',
      'Your energy field is readable—make it magnetic',
    ],
  },

  objectives: [
    {
      id: 'w7-obj-1',
      text: 'Complete the presentation audit across all domains',
      type: 'practice',
    },
    {
      id: 'w7-obj-2',
      text: 'Identify 3 masks you need to develop or refine',
      type: 'practice',
    },
    {
      id: 'w7-obj-3',
      text: 'Practice voice modulation exercises daily',
      type: 'practice',
    },
    {
      id: 'w7-obj-4',
      text: 'Implement one physical presence upgrade',
      type: 'practice',
    },
    {
      id: 'w7-obj-5',
      text: 'Complete the end-of-week reflection',
      type: 'reflect',
    },
  ],

  fieldExercises: [
    {
      id: 'w7-ex-1',
      task: 'The Presentation Audit',
      context: 'Comprehensive self-assessment.',
      successCriteria: 'Rate yourself 1-10 on: Posture, eye contact, facial expressions, grooming, wardrobe, voice pace, voice pitch, verbal fillers, space occupancy, energy projection. Identify your three weakest areas for improvement.',
      difficulty: 'beginner',
    },
    {
      id: 'w7-ex-2',
      task: 'The Mask Inventory',
      context: 'Map your required personas.',
      successCriteria: 'List the 5 most common social situations you encounter. For each: What energy is optimal? What behaviors serve you? Do you have this mask developed or are you defaulting? Identify gaps to build.',
      difficulty: 'beginner',
    },
    {
      id: 'w7-ex-3',
      task: 'Voice Training Week',
      context: 'Daily practice.',
      successCriteria: 'Record yourself speaking for 2 minutes daily. Listen back. Eliminate one filler word ("um," "like," "you know"). Slow your pace by 10%. Lower your ending pitch on statements. Document progress throughout the week.',
      difficulty: 'intermediate',
    },
    {
      id: 'w7-ex-4',
      task: 'The Posture Reset',
      context: 'For the entire week.',
      successCriteria: 'Set hourly reminders to check posture. Shoulders back, chin level, spine straight, weight balanced. Take up 10% more physical space than feels natural. Document: How did others respond differently when your presence was larger?',
      difficulty: 'intermediate',
    },
    {
      id: 'w7-ex-5',
      task: 'The New Mask Test',
      context: 'A social situation where you want to project differently.',
      successCriteria: 'Deliberately deploy a mask you are developing. Choose every element: energy, posture, voice, eye contact. Stay in character for the entire interaction. Document: How did it feel? How did others respond? What needs refinement?',
      difficulty: 'advanced',
    },
  ],

  reflectionPrompts: [
    'What elements of your presentation have you been defaulting on rather than choosing?',
    'Which mask do you need most urgently to develop? For what situations?',
    'What did you notice when you recorded and listened to your voice? What needs work?',
    'How did increasing your physical presence change others\' treatment of you?',
    'Who do you want to become? What transformation steps will get you there?',
  ],

  quiz: {
    questions: [
      {
        id: 'w7-q1',
        question: 'What is "The Mask Collection" concept about?',
        options: [
          'Hiding your true self from everyone',
          'Developing different personas optimized for different social situations',
          'Being fake and manipulative',
          'Never showing vulnerability',
        ],
        correctIndex: 1,
        explanation: 'Every social situation calls for a different version of you. These are not deceptions—they are strategic adaptations. The boardroom you is not the first-date you. The master operator develops and deploys different masks deliberately.',
      },
      {
        id: 'w7-q2',
        question: 'According to Physical Presence Overhaul, your body communicates:',
        options: [
          'Only when you speak',
          'Through conscious gestures only',
          'Before you ever say a word',
          'After people get to know you',
        ],
        correctIndex: 2,
        explanation: 'Your body communicates before you speak. Posture signals confidence or defeat. Movement signals grace or clumsiness. Space occupancy signals power or submission. Every element can be trained.',
      },
      {
        id: 'w7-q3',
        question: 'Which voice characteristic conveys the most authority?',
        options: [
          'Fast-paced speaking',
          'Loud volume',
          'Measured pace with lower registers',
          'High-pitched enthusiasm',
        ],
        correctIndex: 2,
        explanation: 'The fast speaker seems nervous; the measured speaker seems powerful. Lower registers convey authority. Quiet forces attention; loud loses it. The voice is an instrument most people never learn to play.',
      },
      {
        id: 'w7-q4',
        question: 'The Energy Audit focuses on:',
        options: [
          'How much physical energy you have',
          'The invisible energy field you project that others perceive before any words are exchanged',
          'Your caffeine consumption',
          'How tired you feel during conversations',
        ],
        correctIndex: 1,
        explanation: 'You project an energy field that others perceive before any words are exchanged. This energy—anxious, eager, desperate, calm, confident, magnetic—is readable and trainable. The goal is to project energy that draws others toward you.',
      },
    ],
  },

  requirements: {
    minExercisesCompleted: 3,
    reflectionRequired: true,
  },
};
