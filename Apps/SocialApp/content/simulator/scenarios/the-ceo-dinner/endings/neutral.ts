import type { Scene } from '../../../types';

export const neutralEndings: Scene[] = [
  {
    id: 'ending-learning',
    backgroundId: 'restaurant',
    dialog: [
      {
        text: "The dinner winds down. You made some connections, but didn't quite break through to the inner circle.",
      },
      {
        text: "Victor gives you a polite nod as he leaves. Cordial, but not warm.",
      },
      {
        text: "You learned a lot tonight about how the other half operates. The subtle power plays, the unspoken hierarchies. Next time, you'll be ready.",
      },
    ],
    isEnding: true,
    outcomeType: 'neutral',
    endingTitle: 'The Learning Experience',
    endingSummary: "You navigated the dinner without major mistakes, but didn't make a lasting impression. The experience taught you valuable lessons about elite social dynamics that will serve you well in the future.",
  },
];
