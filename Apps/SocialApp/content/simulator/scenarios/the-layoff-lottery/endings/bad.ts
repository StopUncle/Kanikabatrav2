// Bad Endings for The Layoff Lottery

import type { Scene } from '../../../types';

export const badEndings: Scene[] = [
  // The Burned Bridge - cut and handled poorly
  {
    id: 'ending-burned',
    backgroundId: 'meeting-room',
    dialog: [
      {
        text: 'This is ridiculous. I delivered more than anyone on this team.',
      },
      {
        text: 'Jordan\'s face goes flat. The security person shifts.',
      },
      {
        text: 'I understand you\'re upset. We should wrap this up.',
        speakerId: 'jordan',
        emotion: 'cold',
      },
    ],
    nextSceneId: 'ending-burned-b',
  },
  {
    id: 'ending-burned-b',
    backgroundId: 'apartment',
    dialog: [
      {
        text: 'Weeks later. The job search is harder than expected.',
      },
      {
        text: 'Back-channel reference: "They didn\'t handle the exit well. Became combative. Not recommended."',
      },
    ],
    nextSceneId: 'ending-burned-c',
  },
  {
    id: 'ending-burned-c',
    backgroundId: 'apartment',
    isEnding: true,
    outcomeType: 'bad',
    endingTitle: 'The Burned Bridge',
    endingSummary: 'Your reaction to the cut mattered more than the cut itself. How you lose is remembered longer than that you lost.',
    dialog: [
      {
        text: 'Your reaction to the cut mattered more than the cut itself.',
      },
      {
        text: 'How you lose is remembered longer than that you lost.',
        
      },
    ],
  },
];
