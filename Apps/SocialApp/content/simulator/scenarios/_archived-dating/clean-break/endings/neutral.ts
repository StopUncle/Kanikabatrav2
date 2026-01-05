// Neutral Endings (2)
// The Long Goodbye, The Open Window

import type { Scene } from '../../../types';

export const neutralEndings: Scene[] = [
  {
    id: 'ending-long-goodbye',
    backgroundId: 'apartment',
    dialog: [
      {
        text: "It wasn't clean. You responded to texts you shouldn't have. You almost met them for coffee. You spent too many nights reading old messages.",
      },
      {
        text: "But eventually, finally, you stopped. Not because you stopped caring, but because you started caring about yourself more.",
      },
      {
        text: "The wound is still healing. But at least you stopped reopening it.",
      },
    ],
    isEnding: true,
    outcomeType: 'neutral',
    endingTitle: 'The Long Goodbye',
    endingSummary: "You took the scenic route to freedom. More painful than it needed to be. But you got there. Some people need to touch the stove to believe it's hot. You're one of them. That's okay.",
  },
  {
    id: 'ending-open-window',
    backgroundId: 'apartment',
    dialog: [
      {
        text: "You didn't go back. But you didn't fully close the door either. Their messages still reach you, even if you don't respond.",
      },
      {
        text: "Part of you wants to keep that window cracked. Just in case. Just to know you could.",
      },
      {
        text: "It's not freedom, not really. But it's not captivity either. Somewhere in between. You'll need to close that window eventually. You're just not ready yet.",
      },
    ],
    isEnding: true,
    outcomeType: 'neutral',
    endingTitle: 'The Open Window',
    endingSummary: "You're out, but not completely. The connection lingers. Their messages still reach you. You don't respond, but you read. That's a tie that needs cutting eventually.",
  },
];
