// Neutral Endings for The First 90 Days

import type { Scene } from '../../../types';

export const neutralEndings: Scene[] = [
  // Ending 4: Solid Foundation
  {
    id: 'ending-solid-foundation',
    backgroundId: 'office',
    dialog: [
      {
        text: 'You\'re not a star yet. But you\'re not invisible.',
      },
      {
        text: 'Harper\'s happy. The team accepts you. You\'ve got a platform to build on.',
      },
      {
        text: 'Not every first 90 days is a rocket launch. Sometimes it\'s about not crashing.',
      },
      {
        text: 'Steady progress beats flashy mistakes. You\'re positioned for year one.',
      },
    ],
    isEnding: true,
    outcomeType: 'neutral',
    endingTitle: 'Solid Foundation',
    endingSummary:
      'You didn\'t break out, but you didn\'t break down either. Year one is your opportunity.',
  },

  // Ending 5: The Slow Burn
  {
    id: 'ending-slow-burn',
    backgroundId: 'office',
    dialog: [
      {
        text: 'Ninety days. You\'re... fine.',
      },
      {
        text: 'Not great, not terrible. Somewhere in the middle.',
      },
      {
        text: '"Good start. Let\'s see what year one brings."',
        speakerId: 'harper',
        emotion: 'neutral',
      },
      {
        text: 'You didn\'t fail. But you didn\'t ignite either. The window for first impressions is closing.',
      },
    ],
    isEnding: true,
    outcomeType: 'neutral',
    endingTitle: 'The Slow Burn',
    endingSummary:
      '"Fine" is the enemy of "great." Don\'t get comfortable being invisible.',
  },
];
