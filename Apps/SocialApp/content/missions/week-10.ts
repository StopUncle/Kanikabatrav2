// Week 10: The Ghost Protocol
// The art of the perfect exit

import type { WeeklyMission } from './types';

export const week10Mission: WeeklyMission = {
  id: 'week-10-ghost-protocol',
  week: 10,
  title: 'The Ghost Protocol',
  subtitle: 'Leave like smoke. Leave them wondering.',
  description: 'Every relationship ends eventually—by choice or by circumstance. This week, you master the exit. Not the messy, emotional, closure-seeking departure, but the clean cut that leaves you as a beautiful mystery rather than a resolved chapter. The Ghost Protocol is the art of leaving perfectly.',
  icon: 'Ghost',
  color: '#64748B',
  tier: 'vip',

  tacticalBrief: {
    opening: 'Most people exit poorly. They explain, argue, seek closure, cry, and leave their former partner with a complete narrative that allows them to move on. The Ghost Protocol is different. You leave as a question mark, not an answer. You become the one who got away, the mystery never solved, the presence that lingers precisely because it was never properly concluded.',

    concepts: [
      {
        title: 'The Clean Cut Principle',
        content: 'Explanations are a gift to the person you are leaving. They provide closure, which allows them to heal and move on. If you want to be remembered—and regretted—provide no such gift. A clean cut with minimal explanation leaves an open wound that never fully heals. They will wonder for years.',
      },
      {
        title: 'Exit at Peak',
        content: 'The time to leave is NOT when things are bad—that exit is expected, narratable, forgettable. Leave when things are good. When they are confused by your departure. When the only explanation is "they could have had me, and they somehow lost me." This exit haunts.',
      },
      {
        title: 'The Dignity Preservation',
        content: 'Never exit with emotion, accusations, or scenes. Your departure should be calm, almost gentle, and completely inexplicable. Crying says "I am hurt." Anger says "You got to me." Graceful departure says "You simply no longer qualified for access to me."',
      },
      {
        title: 'Post-Exit Silence',
        content: 'After the Ghost Protocol, you disappear. No responding to messages. No social media engagement. No mutual friend updates. You become unreachable. This silence is not cruelty—it is the final brush stroke that completes the masterpiece. Presence can be replaced. Absence echoes forever.',
      },
    ],

    keyTakeaways: [
      'Explanations are gifts that allow closure—deny them',
      'Exit at peak, not at collapse—confusion haunts more than anger',
      'Dignity in departure signals you were never truly theirs',
      'Post-exit silence completes the transformation into myth',
      'The goal is not to hurt—it is to be unforgettable',
    ],
  },

  objectives: [
    {
      id: 'w10-obj-1',
      text: 'Master the principles of the Ghost Protocol',
      type: 'learn',
    },
    {
      id: 'w10-obj-2',
      text: 'Assess any current relationships that may require exit planning',
      type: 'practice',
    },
    {
      id: 'w10-obj-3',
      text: 'Practice clean cut communication in a low-stakes situation',
      type: 'practice',
    },
    {
      id: 'w10-obj-4',
      text: 'Develop your personal exit protocol',
      type: 'practice',
    },
    {
      id: 'w10-obj-5',
      text: 'Complete the end-of-week reflection',
      type: 'reflect',
    },
  ],

  fieldExercises: [
    {
      id: 'w10-ex-1',
      task: 'The Exit Assessment',
      context: 'Review any relationships that may be approaching their end.',
      successCriteria: 'For each relationship nearing conclusion: Are you at peak or decline? What would a clean cut look like? What explanations are you tempted to give that would only provide closure to them?',
      difficulty: 'beginner',
    },
    {
      id: 'w10-ex-2',
      task: 'The Low-Stakes Practice',
      context: 'End a minor commitment or casual connection.',
      successCriteria: 'Execute a clean exit from something small: a group, an activity, a loose friendship. Provide minimal explanation. Document: How hard was it to resist explaining? How did they respond to the mystery?',
      difficulty: 'intermediate',
    },
    {
      id: 'w10-ex-3',
      task: 'The Retrospective Analysis',
      context: 'Review your past relationship exits.',
      successCriteria: 'For your last 3 relationship endings: How did you exit? What did you explain that you did not need to? What closure did you provide that only helped them? Grade each exit A-F.',
      difficulty: 'beginner',
    },
    {
      id: 'w10-ex-4',
      task: 'The Protocol Document',
      context: 'Create your personal Ghost Protocol.',
      successCriteria: 'Write your exit playbook: What will you say (minimal)? What will you not say (everything else)? How will you handle the post-exit period? What is your disappearance timeline? Make it specific.',
      difficulty: 'intermediate',
    },
    {
      id: 'w10-ex-5',
      task: 'The Dignity Drill',
      context: 'Emotional preparation for future exits.',
      successCriteria: 'Practice the emotional state of graceful departure: calm, collected, slightly sad but resolved. Rehearse what you would say. Rehearse not crying, not explaining, not engaging with their protests. Build the muscle.',
      difficulty: 'advanced',
    },
  ],

  reflectionPrompts: [
    'In past exits, what explanations did you provide that only served their closure, not yours?',
    'What makes the Ghost Protocol difficult for you emotionally? What need does explaining serve?',
    'How would your most significant relationship ending have been different with the Ghost Protocol?',
    'When is the Ghost Protocol NOT appropriate? What are the ethical boundaries?',
    'If you had to execute the Ghost Protocol tomorrow, could you? What would stop you?',
  ],

  quiz: {
    questions: [
      {
        id: 'w10-q1',
        question: 'According to the Clean Cut Principle, why should you avoid giving explanations when leaving?',
        options: [
          'Explanations take too much time',
          'Explanations provide closure, which helps them heal and move on',
          'Explanations make you look weak',
          'Explanations can be used against you legally',
        ],
        correctIndex: 1,
        explanation: 'Explanations are a gift to the person you are leaving. They provide closure, which allows them to heal and move on. A clean cut with minimal explanation leaves an open wound—they will wonder for years.',
      },
      {
        id: 'w10-q2',
        question: 'When is the optimal time to execute the Ghost Protocol?',
        options: [
          'When the relationship is clearly failing',
          'After a major fight or disagreement',
          'When things are good and they would be confused by your departure',
          'When you have found someone new',
        ],
        correctIndex: 2,
        explanation: 'Leave when things are good, when they are confused by your departure. The only explanation becomes "they could have had me, and they somehow lost me." This exit haunts more than an expected departure during bad times.',
      },
      {
        id: 'w10-q3',
        question: 'What does a graceful departure signal according to the Dignity Preservation concept?',
        options: [
          'That you still have feelings for them',
          'That you are sad but moving on',
          'That you simply no longer qualified for access to you',
          'That you want them to fight for the relationship',
        ],
        correctIndex: 2,
        explanation: 'Crying says "I am hurt." Anger says "You got to me." Graceful departure says "You simply no longer qualified for access to me." This is the most powerful positioning in an exit.',
      },
      {
        id: 'w10-q4',
        question: 'Why is post-exit silence so powerful?',
        options: [
          'It saves you from awkward conversations',
          'Presence can be replaced, but absence echoes forever',
          'It helps you move on faster',
          'It prevents them from talking badly about you',
        ],
        correctIndex: 1,
        explanation: 'After the Ghost Protocol, you disappear completely. This silence is the final brush stroke that completes the masterpiece. Presence can be replaced. Absence echoes forever.',
      },
    ],
  },

  requirements: {
    minExercisesCompleted: 3,
    reflectionRequired: true,
  },
};
