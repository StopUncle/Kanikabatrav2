// Bad Endings for The First 90 Days

import type { Scene } from '../../../types';

export const badEndings: Scene[] = [
  // Ending 6: The Overstepper
  {
    id: 'ending-overstepper',
    backgroundId: 'office',
    dialog: [
      {
        text: 'You tried to change too much, too fast. Without earning the right.',
      },
      {
        text: '"Talented. But needs to learn the culture."',
        speakerId: 'harper',
        emotion: 'neutral',
      },
      {
        text: 'Translation: Slow down or burn out.',
      },
      {
        text: 'Confidence is good. Arrogance is fatal. You came in too hot.',
      },
    ],
    isEnding: true,
    outcomeType: 'bad',
    endingTitle: 'The Overstepper',
    endingSummary:
      'The first 90 days are for listening, not revolutionizing. You learned that the hard way.',
  },

  // Ending 7: The Invisible One
  {
    id: 'ending-invisible',
    backgroundId: 'office',
    dialog: [
      {
        text: 'Ninety days. You\'re not sure anyone remembers your name.',
      },
      {
        text: 'No wins. No enemies. No presence.',
      },
      {
        text: 'When layoffs come—and they always come—invisible people go first.',
      },
      {
        text: 'You played it too safe. Safe is just slow failure.',
      },
    ],
    isEnding: true,
    outcomeType: 'bad',
    endingTitle: 'The Invisible One',
    endingSummary:
      'Humility is good. Invisibility is death. Speak up. Deliver something. Be seen.',
  },

  // Ending 8: The Cameron Situation
  {
    id: 'ending-cameron-trap',
    backgroundId: 'office',
    dialog: [
      {
        text: 'Cameron smiled and nodded for 90 days.',
      },
      {
        text: 'And quietly made sure your wins looked like failures.',
      },
      {
        text: '"Some concerns about the Mitchell execution."',
        speakerId: 'harper',
        emotion: 'concerned',
      },
      {
        text: 'You know exactly where those "concerns" came from. You saw the threat. You didn\'t neutralize it.',
      },
    ],
    isEnding: true,
    outcomeType: 'bad',
    endingTitle: 'The Cameron Situation',
    endingSummary:
      'When someone wanted your job and didn\'t get it, that\'s not "water under the bridge." That\'s a timer.',
  },
];
