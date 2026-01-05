// Neutral Endings for The Hostile Offer

import type { Scene } from '../../../types';

export const neutralEndings: Scene[] = [
  // The Standoff - neither side won, fight continues
  {
    id: 'ending-standoff',
    backgroundId: 'office',
    dialog: [
      {
        text: 'The proxy fight ends in a stalemate. Sterling holds 35% but can\'t get control.',
      },
      {
        text: 'You\'re still CEO. But they\'re still circling.',
      },
    ],
    nextSceneId: 'ending-standoff-b',
  },
  {
    id: 'ending-standoff-b',
    backgroundId: 'office',
    isEnding: true,
    outcomeType: 'neutral',
    endingTitle: 'The Standoff',
    endingSummary: 'Neither side won. Sterling is wounded but not gone. You survived but you\'re weakened. The war isn\'t over—it\'s just paused.',
    endingLearnReference: 'part2/defense',
    dialog: [
      {
        text: 'Neither side won. Neither side lost. The war continues.',
      },
      {
        text: 'Sometimes survival is the only victory available.',
      },
    ],
  },

  // The Expensive Draw - fought but no clear winner
  {
    id: 'ending-expensive-draw',
    backgroundId: 'office',
    dialog: [
      {
        text: 'Legal fees: $45 million. Investor relations damage: incalculable.',
      },
      {
        text: 'Sterling withdraws. But the fight cost you both.',
        speakerId: 'advisor',
        emotion: 'neutral',
      },
    ],
    nextSceneId: 'ending-expensive-draw-b',
  },
  {
    id: 'ending-expensive-draw-b',
    backgroundId: 'office',
    isEnding: true,
    outcomeType: 'neutral',
    endingTitle: 'The Expensive Draw',
    endingSummary: 'You didn\'t lose the company, but you didn\'t exactly win either. The fight drained resources and distracted from growth. Sometimes there are no clean victories.',
    endingLearnReference: 'part3/resolution',
    dialog: [
      {
        text: 'You\'re still standing. Barely.',
      },
      {
        text: 'Victory by exhaustion isn\'t really victory. But it\'s not defeat either.',
      },
    ],
  },
];
