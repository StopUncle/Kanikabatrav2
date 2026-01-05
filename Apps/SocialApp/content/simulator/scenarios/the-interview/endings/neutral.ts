// Neutral Endings
// Mixed results

import type { Scene } from '../../../types';

export const neutralEndings: Scene[] = [
  // Neutral: The Waitlist
  {
    id: 'ending-waitlist',
    backgroundId: 'text-message',
    dialog: [
      {
        text: 'Email notification.',
      },
      {
        text: '"Thank you for your time. We\'ve decided to move forward with another candidate for this role. However, we were impressed with your background and would like to keep you in mind for future opportunities."',
      },
      {
        text: 'Second place. The first loser.',
        
        emotion: 'concerned',
      },
      {
        text: 'You made the final round. But someone else made a stronger impression.',
      },
    ],
    isEnding: true,
    outcomeType: 'neutral',
    endingTitle: 'The Waitlist',
    endingSummary: 'Close doesn\'t count. Next time, anchor earlier. Dominate the hostile moments. Leave nothing to chance. You have the skills—now refine the performance.',
  },

  // Neutral: The Basic Offer
  {
    id: 'ending-basic-offer',
    backgroundId: 'text-message',
    dialog: [
      {
        text: 'The offer email arrives. Their original number. No negotiation.',
      },
      {
        text: 'You got the job. At their price, not yours.',
      },
      {
        text: 'Not a win. Not a loss. You could have pushed harder.',
        
        emotion: 'neutral',
      },
      {
        text: 'But you\'re in. That\'s what matters for now.',
      },
    ],
    isEnding: true,
    outcomeType: 'neutral',
    endingTitle: 'The Offer',
    endingSummary: 'The interview is just the beginning. The real negotiation happens once you\'ve proven yourself. Use the next review cycle to correct the gap.',
  },
];
