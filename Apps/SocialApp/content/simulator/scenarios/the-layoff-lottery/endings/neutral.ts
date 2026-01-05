// Neutral Endings for The Layoff Lottery

import type { Scene } from '../../../types';

export const neutralEndings: Scene[] = [
  // The Survivor - survived but just maintained
  {
    id: 'ending-survivor',
    backgroundId: 'office',
    dialog: [
      {
        text: 'The weeks after are strange. Quieter. More work, fewer people.',
      },
      {
        text: 'You survived. But you didn\'t capitalize.',
      },
      {
        text: 'The opportunities went to others who moved faster.',
        
      },
    ],
    nextSceneId: 'ending-survivor-b',
  },
  {
    id: 'ending-survivor-b',
    backgroundId: 'office',
    isEnding: true,
    outcomeType: 'neutral',
    endingTitle: 'The Survivor',
    endingSummary: 'You made it through. But survival alone isn\'t success. Next time, think about what comes after.',
    dialog: [
      {
        text: 'Survival is step one. What you do after determines the rest.',
      },
      {
        text: 'You made it through. But next time, think about what comes after.',
        
      },
    ],
  },

  // The Lesson - cut, but learned from it
  {
    id: 'ending-lesson',
    backgroundId: 'apartment',
    dialog: [
      {
        text: 'Looking back, the signs were clear.',
      },
      {
        text: 'You weren\'t positioned. You didn\'t have sponsors. You weren\'t attached to anything critical.',
      },
    ],
    nextSceneId: 'ending-lesson-b',
  },
  {
    id: 'ending-lesson-b',
    backgroundId: 'apartment',
    isEnding: true,
    outcomeType: 'neutral',
    endingTitle: 'The Lesson',
    endingSummary: 'Layoffs reveal who was prepared. Next time, you\'ll build protection before you need it.',
    dialog: [
      {
        text: 'Next time, you\'ll know.',
      },
      {
        text: 'Build protection before you need it. Make yourself indispensable always—not just when scared. Have a sponsor, not just a manager.',
        
      },
      {
        text: 'Layoffs reveal who was prepared. Next time, be prepared.',
        
      },
    ],
  },
];
