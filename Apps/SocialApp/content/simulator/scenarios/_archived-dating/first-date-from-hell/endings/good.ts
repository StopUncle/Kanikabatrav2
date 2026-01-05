// Good Endings (3)
// Trusted Your Gut, Direct and Done, The Support System

import type { Scene } from '../../../types';

export const goodEndings: Scene[] = [
  {
    id: 'ending-trusted-gut',
    backgroundId: 'park',
    dialog: [
      {
        text: "Twenty minutes. That's all it took. You saw the interrupting, felt the uninvited touch, heard the comment about your body, and you knew.",
      },
      {
        text: "You didn't need more data. You didn't need to 'give them a chance.' Your gut said go, and you went.",
      },
      {
        text: "Later, you'll think about all the times you overrode that feeling. Not tonight. Tonight you listened.",
      },
    ],
    isEnding: true,
    outcomeType: 'good',
    endingTitle: 'Trusted Your Gut',
    endingSummary: "Your discomfort was data. You recognized the red flags early and got out before it escalated. That intuition? It's not paranoia. It's pattern recognition. Keep listening to it.",
  },
  {
    id: 'ending-direct-done',
    backgroundId: 'restaurant',
    dialog: [
      {
        text: "No fake emergency. No excuses. Just: 'This isn't working for me.'",
      },
      {
        text: "Their face was priceless - they really thought you were going to sit there and take it. You didn't explain. You didn't negotiate. You just left.",
      },
      {
        text: "They can think whatever they want. You know what you saw. You know why you left. And you'd do it again.",
      },
    ],
    isEnding: true,
    outcomeType: 'good',
    endingTitle: 'Direct and Done',
    endingSummary: "You didn't need an excuse to leave an uncomfortable situation. 'This isn't working for me' is a complete sentence. Their reaction proved you were right to go.",
  },
  {
    id: 'ending-support-system',
    backgroundId: 'apartment',
    dialog: [
      {
        text: "That phone call from the bathroom saved you. {friend} didn't ask questions, didn't judge, just said 'I'm on my way.'",
        speakerId: 'friend',
        emotion: 'happy',
      },
      {
        text: "By the time you got back to the table, you knew exactly what you were doing. Twenty minutes later, you were in their car, driving away, laughing and shaking with relief.",
      },
      {
        text: "That's what friends are for.",
      },
    ],
    isEnding: true,
    outcomeType: 'good',
    endingTitle: 'The Support System',
    endingSummary: "You had a plan. You had backup. When things went wrong, you used both. That's not weakness - that's smart. Keep {friend}'s number on speed dial.",
  },
];
