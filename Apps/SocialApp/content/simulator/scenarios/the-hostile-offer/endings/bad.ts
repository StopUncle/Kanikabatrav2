// Bad Endings for The Hostile Offer

import type { Scene } from '../../../types';

export const badEndings: Scene[] = [
  // Hostile Success - Sterling won proxy fight
  {
    id: 'ending-hostile-loss',
    backgroundId: 'meeting-room',
    dialog: [
      {
        text: 'Sterling\'s slate takes the board seats. They accept their own offer.',
      },
      {
        text: 'Acquisition closes 90 days later.',
      },
    ],
    nextSceneId: 'ending-hostile-loss-b',
  },
  {
    id: 'ending-hostile-loss-b',
    backgroundId: 'apartment',
    dialog: [
      {
        text: 'You receive your $85 million. And a non-compete. And a lot of time to think.',
      },
    ],
    nextSceneId: 'ending-hostile-loss-c',
  },
  {
    id: 'ending-hostile-loss-c',
    backgroundId: 'apartment',
    isEnding: true,
    outcomeType: 'bad',
    endingTitle: 'Hostile Success',
    endingSummary: 'They took what you built. You got paid. Money is not the same as victory. Sometimes you lose even when the check clears.',
    dialog: [
      {
        text: 'They took what you built. You got paid. It doesn\'t feel like winning.',
      },
      {
        text: 'Money is not the same as victory.',
        
      },
    ],
  },

  // Sold - accepted Sterling offer
  {
    id: 'ending-sold',
    backgroundId: 'meeting-room',
    dialog: [
      {
        text: 'The board accepts your recommendation. Sterling gets their deal.',
      },
      {
        text: 'The announcement goes out. Markets react positively.',
      },
    ],
    nextSceneId: 'ending-sold-b',
  },
  {
    id: 'ending-sold-b',
    backgroundId: 'apartment',
    dialog: [
      {
        text: 'Three months later. You watch from the outside as Sterling restructures.',
      },
      {
        text: '30% of employees gone. The culture you built—erased.',
      },
    ],
    nextSceneId: 'ending-sold-c',
  },
  {
    id: 'ending-sold-c',
    backgroundId: 'apartment',
    isEnding: true,
    outcomeType: 'bad',
    endingTitle: 'The Surrender',
    endingSummary: 'You read the room and surrendered. Maybe that was wisdom. But the company you built is gone.',
    dialog: [
      {
        text: 'You didn\'t fight. You calculated the odds and folded.',
      },
      {
        text: 'Some people will call it wisdom. Some will call it cowardice. Only you know which.',
        
      },
    ],
  },
];
