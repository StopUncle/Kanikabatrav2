// Bad Endings
// The losses

import type { Scene } from '../../../types';

export const badEndings: Scene[] = [
  // Bad: The Rejection
  {
    id: 'ending-rejection',
    backgroundId: 'text-message',
    dialog: [
      {
        text: 'Form email.',
      },
      {
        text: '"Thank you for taking the time to interview with us. After careful consideration, we\'ve decided to move forward with other candidates whose experience more closely aligns..."',
      },
      {
        text: 'You know what you did. The fumbled answers. The weak moments. The desperation that crept in.',
        
        emotion: 'concerned',
      },
      {
        text: 'Every interview is a performance. You only get one take.',
      },
    ],
    isEnding: true,
    outcomeType: 'bad',
    endingTitle: 'The Rejection',
    endingSummary: 'Practice until the performance becomes natural. Prepare your answers. Research the company. Control your nerves. The next interview is a clean slate—use it.',
  },

  // Bad: The Lowball Acceptance
  {
    id: 'ending-lowball-accept',
    backgroundId: 'text-message',
    dialog: [
      {
        text: 'You accepted the first offer without negotiating.',
      },
      {
        text: 'You got the job. At $20K less than you could have gotten.',
        
        emotion: 'concerned',
      },
      {
        text: 'In year one, you\'ll leave $20K on the table. By year five, with raises building on that base? You\'ve lost six figures.',
      },
      {
        text: 'All because you didn\'t ask.',
      },
    ],
    isEnding: true,
    outcomeType: 'bad',
    endingTitle: 'The Lowball Acceptance',
    endingSummary: 'Silence after stating your number is the most powerful negotiation tool. They expected you to counter—they were prepared to go higher. Never accept a first offer.',
  },

  // Bad: The Overplay
  {
    id: 'ending-overplay',
    backgroundId: 'text-message',
    dialog: [
      {
        text: 'Phone silence. Then, a form email.',
      },
      {
        text: 'You pushed too hard. Asked for too much. Made them feel like they were being played.',
        
        emotion: 'concerned',
      },
      {
        text: 'There\'s a line between confidence and arrogance. You crossed it.',
      },
      {
        text: 'Read the room. Power moves only work when you\'ve earned the position to make them.',
      },
    ],
    isEnding: true,
    outcomeType: 'bad',
    endingTitle: 'The Overplay',
    endingSummary: 'Confidence must be calibrated. You read the room wrong or pushed before you\'d earned enough goodwill. Next time, match your aggression to your leverage.',
  },
];
