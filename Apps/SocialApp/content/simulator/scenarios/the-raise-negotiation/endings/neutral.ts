// Neutral Endings for The Raise Negotiation

import type { Scene } from '../../../types';

export const neutralEndings: Scene[] = [
  // Partial Win - Took first offer
  {
    id: 'ending-partial',
    backgroundId: 'office',
    dialog: [
      {
        text: '$87K. A 6% bump. You said yes immediately.',
      },
      {
        text: 'It\'s more than you had. But market rate is $95K. You left $8K on the table.',
      },
      {
        text: 'Never take the first offer. They always have more.',
      },
    ],
    isEnding: true,
    outcomeType: 'neutral',
    endingTitle: 'The Partial Win',
    endingSummary: 'You got a raise, but left money on the table by accepting the first offer. They had room to go higher - they always do. Next time, counter. The discomfort of asking is worth thousands.',
  },

  // Delay Ending - Kicked to annual review
  {
    id: 'ending-delay',
    backgroundId: 'office',
    dialog: [
      {
        text: '"Let\'s revisit at annual review." You agreed.',
      },
      {
        text: 'They\'ll set the agenda. They\'ll control the timeline. You just gave up your leverage.',
      },
      {
        text: 'Waiting for annual review means playing their game by their rules.',
      },
    ],
    isEnding: true,
    outcomeType: 'neutral',
    endingTitle: 'The Delay',
    endingSummary: 'You accepted "later" without getting anything in writing. Annual review comes, the "budget is tight," you\'re still at $82K. Verbal promises are wind. Next time, document everything or don\'t leave the room.',
  },
];
