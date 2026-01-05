// Bad Endings (1)
// The Car Ride

import type { Scene } from '../../../types';

export const badEndings: Scene[] = [
  {
    id: 'ending-car-ride',
    backgroundId: 'apartment',
    dialog: [
      {
        text: "You knew it was wrong. You got in anyway.",
        speakerId: 'blake',
        emotion: 'smirking',
      },
      {
        text: "The drive home was silent except for your pounding heart. They knew where you lived now. When you got out, they said 'I'll text you.' It wasn't a question.",
      },
      {
        text: "For the next two weeks, you'll be checking your locks, screening your calls, wondering if they're outside. Some lessons cost more than others.",
      },
    ],
    isEnding: true,
    outcomeType: 'bad',
    endingTitle: 'The Car Ride',
    endingSummary: "You overrode every instinct telling you not to. They know where you live now. The follow-up texts won't stop easily. Next time, trust your gut over convenience.",
  },
];
