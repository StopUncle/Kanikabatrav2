// Bad Endings (3)
// The Cycle, The Lingering, The Flying Monkey Victory

import type { Scene } from '../../../types';

export const badEndings: Scene[] = [
  {
    id: 'ending-cycle',
    backgroundId: 'apartment',
    dialog: [
      {
        text: "Coffee turned into dinner. Dinner turned into \"let's try again.\" Three months later, you're back in the same patterns, having the same fights, feeling the same emptiness.",
        speakerId: 'drew',
        emotion: 'happy',
      },
      {
        text: "They changed just long enough to get you back. Now you're trapped again - except this time you know exactly what's happening.",
      },
      {
        text: "That makes it worse. You'll try to leave again someday. Maybe next time you'll make it.",
      },
    ],
    isEnding: true,
    outcomeType: 'bad',
    endingTitle: 'The Cycle',
    endingSummary: "The hoover worked. Three months of good behavior, then the same patterns. Knowing you've done this before makes it harder, not easier. Breaking the cycle means actually leaving - and staying gone.",
  },
  {
    id: 'ending-lingering',
    backgroundId: 'apartment',
    dialog: [
      {
        text: "They still have your things. Your books. That hoodie. The photos. Every few weeks, they text about it - an excuse to reach out, a tether they refuse to release.",
      },
      {
        text: "You could demand it back. You could write it off. Instead, you exist in this limbo, still connected, still entangled, still not free.",
        speakerId: 'drew',
        emotion: 'smirking',
      },
      {
        text: "It's been six months. The stuff isn't coming back. But you can't let go of what it represents.",
      },
    ],
    isEnding: true,
    outcomeType: 'bad',
    endingTitle: 'The Lingering',
    endingSummary: "Your belongings became hostages. Every text about them is a hook back in. Sometimes the stuff isn't worth it. Sometimes you have to let go completely to actually be free.",
  },
  {
    id: 'ending-flying-monkey',
    backgroundId: 'coffee-shop',
    dialog: [
      {
        text: "{flyingmonkey} was just the beginning. Then it was {ex}'s mother. Then mutual friends who \"just wanted to help.\" Everyone has an opinion. Everyone has {ex}'s side of the story.",
        speakerId: 'quinn',
        emotion: 'concerned',
      },
      {
        text: "You've spent so much energy fighting the narrative that you've forgotten to just live your life.",
      },
      {
        text: "{ex} doesn't need to contact you anymore. Their army does it for them. You're not in a relationship anymore, but you're still trapped in their orbit.",
      },
    ],
    isEnding: true,
    outcomeType: 'bad',
    endingTitle: 'The Flying Monkey Victory',
    endingSummary: "You got pulled into the narrative war. Defending yourself to third parties who report back to {ex}. You're free of the relationship but trapped in the drama. Boundaries aren't just for exes - they're for their messengers too.",
  },
];
