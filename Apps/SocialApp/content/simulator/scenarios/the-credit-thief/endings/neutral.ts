// Neutral Endings for The Credit Thief

import type { Scene } from '../../../types';

export const neutralEndings: Scene[] = [
  // Ending: Lesson Learned
  {
    id: 'ending-lesson-learned',
    backgroundId: 'office',
    dialog: [
      {
        text: 'You got some credit back. Not all of it.',
      },
      {
        text: 'Alex still got shine with Marcus. But you learned.',
      },
      {
        text: 'Now you document everything. Now your name is on everything before it leaves your hands.',
      },
      {
        text: 'Now you have direct relationships with the people who matter.',
      },
      {
        text: 'Expensive lesson. But you only pay it once.',
      },
    ],
    isEnding: true,
    outcomeType: 'neutral',
    endingTitle: 'The Lesson Learned',
    endingSummary:
      'Every theft is tuition for the next project. Just don\'t pay the same tuition twice.',
  },
];
