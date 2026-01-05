// Good Endings for The CEO Dinner

import type { Scene } from '../../../types';

export const goodEndings: Scene[] = [
  // The Memorable Guest
  {
    id: 'ending-memorable',
    backgroundId: 'restaurant',
    dialog: [
      {
        text: 'Marcus emails the next morning. Direct. Personal.',
      },
      {
        text: '"Enjoyed our conversation. Let\'s continue it."',
      },
    ],
    nextSceneId: 'ending-memorable-b',
  },
  {
    id: 'ending-memorable-b',
    backgroundId: 'office',
    dialog: [
      {
        text: 'Victor mentions the dinner in passing. "Marcus asked about you."',
      },
      {
        text: 'Alexandra sends a LinkedIn connection. No message needed.',
      },
    ],
    nextSceneId: 'ending-memorable-c',
  },
  {
    id: 'ending-memorable-c',
    backgroundId: 'office',
    isEnding: true,
    outcomeType: 'good',
    endingTitle: 'The Memorable Guest',
    endingSummary: 'You entered a room of giants and left with relationships. The dinner was the door. You walked through it.',
    dialog: [
      {
        text: 'You entered a room of giants. You left with relationships.',
      },
      {
        text: 'The dinner was the door. You walked through it.',
        
      },
    ],
  },

  // The Natural
  {
    id: 'ending-natural',
    backgroundId: 'restaurant',
    dialog: [
      {
        text: 'You didn\'t try to impress. You just... were.',
      },
      {
        text: 'And somehow, that was more impressive than anything calculated.',
      },
    ],
    nextSceneId: 'ending-natural-b',
  },
  {
    id: 'ending-natural-b',
    backgroundId: 'office',
    dialog: [
      {
        text: 'Victor pulls you aside Monday. "You handled that room well."',
      },
      {
        text: '"The next dinner, you\'re seated closer to Marcus."',
      },
    ],
    nextSceneId: 'ending-natural-c',
  },
  {
    id: 'ending-natural-c',
    backgroundId: 'office',
    isEnding: true,
    outcomeType: 'good',
    endingTitle: 'The Natural',
    endingSummary: 'Authenticity, properly calibrated, beats performance every time. They saw someone worth knowing.',
    dialog: [
      {
        text: 'Authenticity, properly calibrated, beats performance.',
      },
      {
        text: 'They saw someone worth knowing.',
        
      },
    ],
  },

  // The Door Opener
  {
    id: 'ending-door-opener',
    backgroundId: 'restaurant',
    dialog: [
      {
        text: 'Three follow-up meetings scheduled within the week.',
      },
      {
        text: 'Each one opens another door. Each door reveals a room.',
      },
    ],
    nextSceneId: 'ending-door-opener-b',
  },
  {
    id: 'ending-door-opener-b',
    backgroundId: 'office',
    isEnding: true,
    outcomeType: 'good',
    endingTitle: 'The Door Opener',
    endingSummary: 'One dinner. Three relationships. Infinite possibilities. This is how networks become empires.',
    dialog: [
      {
        text: 'One dinner. Three relationships. Infinite possibilities.',
      },
      {
        text: 'This is how networks become empires.',
        
      },
    ],
  },
];
