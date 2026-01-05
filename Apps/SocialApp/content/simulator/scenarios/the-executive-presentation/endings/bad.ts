// Bad Endings for The Executive Presentation

import type { Scene } from '../../../types';

export const badEndings: Scene[] = [
  // The Missed Opportunity
  {
    id: 'ending-missed',
    backgroundId: 'office',
    dialog: [
      {
        text: 'The project is on hold.',
      },
      {
        text: 'Officially, it\'s about "timing and priorities."',
      },
      {
        text: 'Unofficially, it\'s about you.',
        
      },
    ],
    nextSceneId: 'ending-missed-b',
  },
  {
    id: 'ending-missed-b',
    backgroundId: 'office',
    dialog: [
      {
        text: 'I\'m going to level with you.',
        speakerId: 'chen',
        emotion: 'concerned',
      },
      {
        text: 'The Victoria question sunk you. You had a chance to show composure, and instead...',
        speakerId: 'chen',
        emotion: 'sad',
      },
    ],
    nextSceneId: 'ending-missed-c',
  },
  {
    id: 'ending-missed-c',
    backgroundId: 'office',
    isEnding: true,
    outcomeType: 'bad',
    endingTitle: 'The Missed Opportunity',
    endingSummary: 'Fifteen minutes can close doors as fast as open them. Preparation includes the questions you don\'t expect.',
    dialog: [
      {
        text: 'You\'ll get another shot. But not soon.',
        speakerId: 'chen',
        emotion: 'neutral',
      },
      {
        text: 'Fifteen minutes can close doors as fast as open them.',
        
      },
    ],
  },

  // The Credibility Hit
  {
    id: 'ending-credibility',
    backgroundId: 'office',
    dialog: [
      {
        text: 'Word gets back to you.',
      },
      {
        text: 'Marcus told his team the projections were "optimistic at best." That\'s not great for future proposals.',
        speakerId: 'colleague',
        emotion: 'concerned',
      },
    ],
    nextSceneId: 'ending-credibility-b',
  },
  {
    id: 'ending-credibility-b',
    backgroundId: 'office',
    isEnding: true,
    outcomeType: 'bad',
    endingTitle: 'The Credibility Hit',
    endingSummary: 'The CFO doesn\'t trust your numbers. That sticks. That follows you.',
    dialog: [
      {
        text: 'The CFO doesn\'t trust your numbers. That sticks.',
      },
      {
        text: 'Executives talk to each other. A credibility hit in one room spreads to every room.',
        
      },
    ],
  },
];
