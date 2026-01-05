import type { ForkScene } from '../../../types';

export const goodEnding: ForkScene = {
  id: 'ending-success',
  backgroundId: 'coffee-shop',
  isEnding: true,
  outcomeType: 'good',
  endingTitle: 'Reputation Intact',
  endingSummary: 'You navigated the post-gala attention without self-sabotage. You didn\'t brag, didn\'t leak information, and made a genuine ally in Priya. Dana Morrison has you on her radar—but you gave her nothing to use.',
  dialog: [
    {
      speakerId: null,
      text: 'You walk back to your dorm, mind clear.',
      emotion: 'neutral',
    },
    {
      speakerId: null,
      text: 'The gala opened doors. Today, you learned which ones lead somewhere—and which ones are traps.',
      emotion: 'neutral',
    },
    {
      speakerId: 'inner-voice',
      text: 'Information is currency. You didn\'t spend any today. Wise.',
      emotion: 'knowing',
    },
  ],
};
