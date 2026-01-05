// Good Endings for The First 90 Days

import type { Scene } from '../../../types';

export const goodEndings: Scene[] = [
  // Ending 1: Rising Star
  {
    id: 'ending-rising-star',
    backgroundId: 'office',
    dialog: [
      {
        text: 'Ninety days. You\'ve arrived.',
      },
      {
        text: 'Victor mentions you in leadership meetings. Harper trusts you with the hard projects.',
      },
      {
        text: 'Your peers see you as someone going places.',
      },
      {
        text: 'The first 90 days set the trajectory. You set it upward.',
      },
    ],
    isEnding: true,
    outcomeType: 'good',
    endingTitle: 'Rising Star',
    endingSummary:
      'You mapped the politics, delivered early wins, and positioned yourself for growth. First impressions don\'t just matter—they compound.',
  },

  // Ending 2: The Strategic Player
  {
    id: 'ending-strategic-player',
    backgroundId: 'office',
    dialog: [
      {
        text: 'You know things. Who\'s rising. Who\'s falling. Where the real power flows.',
      },
      {
        text: 'Morgan tips you off before problems hit. Devon watches your back.',
      },
      {
        text: 'When the next reorg happens—and it will—you\'ll be ready.',
      },
      {
        text: 'Everyone sees the org chart. You see the actual map.',
      },
    ],
    isEnding: true,
    outcomeType: 'good',
    endingTitle: 'The Strategic Player',
    endingSummary:
      'You built the intelligence network that others ignore. Information is power—and you have it.',
  },

  // Ending 3: The Ally Network
  {
    id: 'ending-ally-network',
    backgroundId: 'office',
    dialog: [
      {
        text: 'You might not have the flashiest wins. But you have something better.',
      },
      {
        text: 'Devon tips you off before problems hit. Morgan protects your calendar.',
      },
      {
        text: 'Even Cameron respects you—or at least fears crossing you.',
      },
      {
        text: 'Projects come and go. Relationships compound.',
      },
    ],
    isEnding: true,
    outcomeType: 'good',
    endingTitle: 'The Ally Network',
    endingSummary:
      'In corporate, you don\'t rise alone. You rise with the people who pull you up.',
  },
];
