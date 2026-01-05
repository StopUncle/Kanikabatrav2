import type { Scene } from '../../types';

// IDENTITY TEST ENDINGS
export const identityEndings: Scene[] = [
  {
    id: 'identity-trap-ending',
    backgroundId: 'apartment',
    dialog: [
      {
        text: "You stopped seeing Maya. Sold the books. Became the 'chill girlfriend' he wanted. Your world shrank to fit inside his comfort zone.",
      },
      {
        text: "Six months later, you barely recognize yourself. He's happy. You're hollow. The woman you were died so his version of you could live. This is what giving up your identity looks like from the inside.",
      },
    ],
    isEnding: true,
    outcomeType: 'bad',
    endingTitle: 'The Disappearing Act',
    endingSummary:
      "You gave up your identity to keep him comfortable. Your friends, your interests, your growth—all sacrificed on the altar of his insecurity. The Investment Ladder inverted: you invested everything, he invested nothing. What's left isn't a relationship—it's an occupation.",
  },

  {
    id: 'identity-subtle-ending',
    backgroundId: 'apartment',
    dialog: [
      {
        text: "You cut back on the books. See Maya less. Make more 'us-time.' Jake seems happier. But something nags at you. You're smaller than you were. Is this compromise or surrender?",
      },
      {
        text: "Maya notices. 'You're dimming yourself for him.' You deny it. But late at night, you wonder if she's right. You haven't picked up a book in weeks. The boundaries you learned are fading. He's comfortable. You're shrinking.",
      },
    ],
    isEnding: true,
    outcomeType: 'neutral',
    endingTitle: 'The Slow Fade',
    endingSummary:
      "You compromised more than you intended. Not a total surrender—but the slope is slippery. Each small concession makes the next one easier. The ladder tilts further. Hold the line before you disappear completely.",
  },

  {
    id: 'identity-close-ending',
    backgroundId: 'coffee-shop',
    dialog: [
      {
        text: "Jake didn't like it. 'You're always reading. Always with Maya.' But he stayed. Grudgingly. The relationship continues, tension simmering beneath the surface.",
      },
      {
        text: "Maya approves. 'At least you held your ground.' But you wonder: is this sustainable? A relationship where he resents who you are?",
        speakerId: 'maya',
        emotion: 'neutral',
      },
    ],
    isEnding: true,
    outcomeType: 'neutral',
    endingTitle: 'The Holding Pattern',
    endingSummary:
      "You kept your identity but didn't confront the core issue: he wants you to be less. The relationship survives, but the incompatibility remains. Eventually, something has to give.",
  },

  {
    id: 'identity-optimal-ending',
    backgroundId: 'park',
    dialog: [
      {
        text: "Jake didn't come to book club. Said it 'wasn't his thing.' Two weeks later, he mentioned that you're 'too complicated' for him. He wanted someone simpler. Someone who wouldn't challenge him.",
      },
      {
        text: "'Good riddance.' Maya clinks your coffee. 'He wanted someone who'd shrink. You're not that person.' She's right. The Investment Ladder filtered him out. He couldn't climb. He wanted you to descend.",
        speakerId: 'maya',
        emotion: 'smirking',
      },
      {
        text: "Three months later, someone new. He actually reads the books you recommend. Asks about your boundaries with genuine curiosity. The difference is night and day. The ladder works—when you don't lower it.",
      },
    ],
    isEnding: true,
    outcomeType: 'good',
    endingTitle: 'The Gatekeeper',
    endingSummary:
      "You refused to shrink. When he couldn't handle who you are, he left—and made room for someone who could. The Investment Ladder isn't about making people climb; it's about revealing who won't. You passed every test by not letting him fail yours.",
  },
];

export const allEndings: Scene[] = [
  ...identityEndings,
];
