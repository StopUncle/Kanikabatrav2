// Neutral Endings for The Executive Presentation

import type { Scene } from '../../../types';

export const neutralEndings: Scene[] = [
  // The Learning Curve - didn't fail, didn't shine
  {
    id: 'ending-learning',
    backgroundId: 'office',
    dialog: [
      {
        text: 'The meeting ends. No disaster, no triumph.',
      },
      {
        text: 'They\'ll review the proposal. Standard process.',
        speakerId: 'chen',
        emotion: 'neutral',
      },
    ],
    nextSceneId: 'ending-learning-b',
  },
  {
    id: 'ending-learning-b',
    backgroundId: 'office',
    isEnding: true,
    outcomeType: 'neutral',
    endingTitle: 'The Learning Curve',
    endingSummary: 'You survived your first executive presentation. Not every moment was perfect, but you learned what matters at this level. Next time, you\'ll be ready.',
    endingLearnReference: 'part2/presentation',
    dialog: [
      {
        text: 'Not every presentation is make-or-break.',
      },
      {
        text: 'Some are just practice for the ones that are.',
      },
    ],
  },

  // The Wait and See - decision postponed
  {
    id: 'ending-postponed',
    backgroundId: 'office',
    dialog: [
      {
        text: 'Victoria needs more data. The decision is tabled for now.',
      },
      {
        text: 'You made some points. Missed others. It\'s not a no—but it\'s not a yes either.',
        speakerId: 'chen',
        emotion: 'neutral',
      },
    ],
    nextSceneId: 'ending-postponed-b',
  },
  {
    id: 'ending-postponed-b',
    backgroundId: 'office',
    isEnding: true,
    outcomeType: 'neutral',
    endingTitle: 'The Wait and See',
    endingSummary: 'The proposal wasn\'t rejected—it was shelved. You have time to strengthen your case, but momentum is lost. The window may or may not reopen.',
    endingLearnReference: 'part3/aftermath',
    dialog: [
      {
        text: 'Sometimes "maybe" is worse than "no."',
      },
      {
        text: 'At least with "no," you know where you stand.',
      },
    ],
  },
];
