// Good Endings (3)
// The Clean Break, The Support System, The Closed Door

import type { Scene } from '../../../types';

export const goodEndings: Scene[] = [
  {
    id: 'ending-clean-break',
    backgroundId: 'park',
    dialog: [
      {
        text: "You did everything right. You said what needed to be said and didn't negotiate. You got your stuff, changed your locks, blocked their number.",
      },
      {
        text: "When the hoover came, you saw it for what it was. A performance. A manipulation. Not love. The silence feels strange at first - you're not used to a life without constant emotional chaos.",
      },
      {
        text: "Then you realize: this is what peace feels like. You'd forgotten.",
      },
    ],
    isEnding: true,
    outcomeType: 'good',
    endingTitle: 'The Clean Break',
    endingSummary: "You left cleanly, protected yourself completely, and recognized the hoover for what it was. This is what it looks like to leave someone who won't let go. Hard. Painful. But free.",
  },
  {
    id: 'ending-support-system',
    backgroundId: 'coffee-shop',
    dialog: [
      {
        text: "You couldn't have done it alone. Every time you wavered, {bestfriend} was there. Every time the guilt crept in, they reminded you why you left.",
        speakerId: 'morgan',
        emotion: 'happy',
      },
      {
        text: "The breakup was hard. The aftermath was harder. But you had someone in your corner who wouldn't let you backslide.",
      },
      {
        text: "That's not weakness. That's wisdom. Now you're ready to be that person for someone else someday.",
      },
    ],
    isEnding: true,
    outcomeType: 'good',
    endingTitle: 'The Support System',
    endingSummary: "{bestfriend} kept you grounded when everything tried to pull you back. Having people who see the situation clearly isn't a crutch - it's survival. Keep those friends close.",
  },
  {
    id: 'ending-closed-door',
    backgroundId: 'apartment',
    dialog: [
      {
        text: "You left nothing behind. No stuff at their place. No key in their pocket. No crack in the door for them to push through.",
      },
      {
        text: "When they try to hoover, they're reaching for a ghost. You've rebuilt your life without them in it. The door isn't just closed - it's sealed.",
      },
      {
        text: "There's no way back in. That's not cruel. That's self-preservation.",
      },
    ],
    isEnding: true,
    outcomeType: 'good',
    endingTitle: 'The Closed Door',
    endingSummary: "Every practical connection severed. Every emotional tie cut. You understood that leaving someone who won't let go requires total extraction. Nothing left to retrieve. No reason to return.",
  },
];
