// Neutral Endings (2)
// Stayed Too Long, The Awkward Exit

import type { Scene } from '../../../types';

export const neutralEndings: Scene[] = [
  {
    id: 'ending-stayed-too-long',
    backgroundId: 'apartment',
    dialog: [
      {
        text: "You made it out. But not before the hand on your knee, the comment about going back to their place, the feeling of being hunted across a dinner table.",
      },
      {
        text: "You should have left earlier. You knew twenty minutes in. You stayed for ninety.",
      },
      {
        text: "Next time, you'll listen sooner. The discomfort was trying to tell you something. Trust it faster.",
      },
    ],
    isEnding: true,
    outcomeType: 'neutral',
    endingTitle: 'Stayed Too Long',
    endingSummary: "You got out, but not before absorbing more than you needed to. The signs were there early. Next time, don't wait for proof. Your first instinct was right.",
  },
  {
    id: 'ending-awkward-exit',
    backgroundId: 'restaurant',
    dialog: [
      {
        text: "You got out, but it wasn't clean. Over-apologizing. Making excuses. Leaving a door open for a 'reschedule' you know you'll never take.",
      },
      {
        text: "{date} will probably text you tomorrow, and you'll have to do this all over again.",
      },
      {
        text: "But for tonight - you're out. That's what matters. Next time, no maybe. Just no.",
      },
    ],
    isEnding: true,
    outcomeType: 'neutral',
    endingTitle: 'The Awkward Exit',
    endingSummary: "You escaped, but you left loose ends. The apologies, the 'let's do this again' you didn't mean - now you'll have to handle the follow-up. A cleaner break saves future headaches.",
  },
];
