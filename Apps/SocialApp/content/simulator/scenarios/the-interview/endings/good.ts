// Good & Excellent Endings
// The wins

import type { Scene } from '../../../types';

export const goodEndings: Scene[] = [
  // Excellent: The Full Win
  {
    id: 'ending-full-win',
    backgroundId: 'text-message',
    dialog: [
      {
        text: 'Your phone rings. {director_name}\'s number.',
      },
      {
        text: '"We\'d like to offer you the position. At your number."',
        speakerId: 'diana',
        emotion: 'neutral',
      },
      {
        text: 'You named your price. They paid it.',
        
        emotion: 'happy',
      },
      {
        text: 'The offer is $20K above what you would have accepted. Sign-on bonus included. Start date: your choice.',
      },
      {
        text: 'You didn\'t just get the job. You got the job on your terms.',
      },
    ],
    isEnding: true,
    outcomeType: 'good',
    endingTitle: 'The Full Package',
    endingSummary: 'The interview isn\'t about proving yourself. It\'s about making them prove they deserve you. You anchored high, handled pressure with grace, and negotiated from strength. Welcome to your new role.',
  },

  // Good: Strong Offer
  {
    id: 'ending-strong-offer',
    backgroundId: 'text-message',
    dialog: [
      {
        text: 'Email notification: "We\'re pleased to extend an offer..."',
      },
      {
        text: 'They came up $15K from their first number. Not your maximum ask, but solid.',
      },
      {
        text: 'You have leverage for the next negotiation: the annual review.',
        
        emotion: 'neutral',
      },
      {
        text: 'Every negotiation sets the floor for the next one. You just raised your floor.',
      },
    ],
    isEnding: true,
    outcomeType: 'good',
    endingTitle: 'The Strong Offer',
    endingSummary: 'Not everything you asked for, but more than you had. You demonstrated your value and negotiated effectively. The foundation is set for future growth.',
  },
];
