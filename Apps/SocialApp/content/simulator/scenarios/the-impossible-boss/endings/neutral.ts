// Neutral Endings for The Impossible Boss

import type { Scene } from '../../../types';

export const neutralEndings: Scene[] = [
  // Protected but Stagnant
  {
    id: 'ending-protected-stagnant',
    backgroundId: 'office',
    dialog: [
      {
        text: 'You\'re safe. Not happy. Not growing. But safe.',
      },
      {
        text: 'The documentation protects you. The skip-level gave you visibility. But Jordan still blocks your path.',
      },
      {
        text: 'Survival mode has limits. How long can you stay here?',
        
      },
    ],
    isEnding: true,
    outcomeType: 'neutral',
    endingTitle: 'Protected but Stagnant',
    endingSummary: 'Protection is necessary. But it\'s not success. You built armor against Jordan, but you\'re still stuck behind them. At some point, you need to move—either up, around, or out.',
  },
];
