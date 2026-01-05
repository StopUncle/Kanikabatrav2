// Neutral Endings for The Problem Employee

import type { Scene } from '../../../types';

export const neutralEndings: Scene[] = [
  // The Unresolved
  {
    id: 'ending-unresolved',
    backgroundId: 'office',
    dialog: [
      {
        text: 'Casey improved. Slightly. Enough to stay. Not enough to thrive.',
      },
      {
        text: 'They\'re not a crisis anymore. But they\'re not a strength either.',
        
      },
      {
        text: 'Not every situation resolves cleanly. Some become managed problems, not solved ones.',
      },
    ],
    isEnding: true,
    outcomeType: 'neutral',
    endingTitle: 'The Unresolved',
    endingSummary: 'Casey is still here. Still marginal. Not bad enough to fire, not good enough to celebrate. You\'ll be managing this situation for a while longer. Sometimes that\'s the reality of leadership—ongoing maintenance, not clean resolutions.',
  },
];
