import type { ForkScene } from '../../../types';

export const tylerSuccessEnding: ForkScene = {
  id: 'ending-tyler-success',
  backgroundId: 'bar',
  isEnding: true,
  outcomeType: 'good',
  endingTitle: 'On The List',
  endingSummary: 'You navigated Tyler\'s ego and got on the list. The party awaits. Level 2 unlocked.',
  dialog: [
    { speakerId: null, text: 'Friday night. The party. You\'re in.', emotion: 'neutral' },
    { speakerId: 'inner-voice', text: 'The game is about to get more interesting.', emotion: 'knowing' },
  ],
};

export const blakeSuccessEnding: ForkScene = {
  id: 'ending-blake-success',
  backgroundId: 'coffee-shop',
  isEnding: true,
  outcomeType: 'good',
  endingTitle: 'Unexpected Ally',
  endingSummary: 'Blake helped without strings. You might have found a genuine ally. Or a very good actor. Time will tell. Either way, you\'re on the list.',
  dialog: [
    { speakerId: null, text: 'Your phone buzzes. Tyler\'s list. Your name\'s on it.', emotion: 'neutral' },
    { speakerId: 'inner-voice', text: 'Blake came through. Keep watching. But maybe... trust a little.', emotion: 'hopeful' },
  ],
};

export const blakeCautiousEnding: ForkScene = {
  id: 'ending-blake-cautious',
  backgroundId: 'coffee-shop',
  isEnding: true,
  outcomeType: 'good',
  endingTitle: 'Cautious Progress',
  endingSummary: 'You\'re on the list. Blake helped. You kept your guard up. Smart. The party awaits.',
  dialog: [
    { speakerId: 'blake', text: '"Done. You\'re in. See you there."', emotion: 'neutral' },
    { speakerId: 'inner-voice', text: 'Trust is earned. He\'s earning it. Slowly.', emotion: 'knowing' },
  ],
};

export const danaDebtEnding: ForkScene = {
  id: 'ending-dana-debt',
  backgroundId: 'park',
  isEnding: true,
  outcomeType: 'good',
  endingTitle: 'Future Favor',
  endingSummary: 'You\'re on the list. But you owe Dana a favor. She\'ll collect eventually. For now, the party awaits.',
  dialog: [
    { speakerId: 'dana', text: '"All done. You\'re in. Remember—you owe me."', emotion: 'smirking' },
    { speakerId: 'inner-voice', text: 'Debt is currency too. You traded one for the other.', emotion: 'concerned' },
  ],
};

export const danaTrapEnding: ForkScene = {
  id: 'ending-dana-trap',
  backgroundId: 'text-screen',
  isEnding: true,
  outcomeType: 'bad',
  endingTitle: 'Information Extracted',
  endingSummary: 'Dana got what she wanted. Your information is now her currency. By the party, everyone knows what you shared. You\'re on the list—but marked as someone who talks.',
  dialog: [
    { speakerId: null, text: 'At the party, whispers follow you.', emotion: 'neutral' },
    { speakerId: 'inner-voice', text: 'Dana traded your information for her status. You were the product.', emotion: 'sad' },
  ],
};

export const overpromiseEnding: ForkScene = {
  id: 'ending-overpromise',
  backgroundId: 'bar',
  isEnding: true,
  outcomeType: 'bad',
  endingTitle: 'Promise You Can\'t Keep',
  endingSummary: 'You promised Tyler access to Maris. Maris doesn\'t respond to requests. When Tyler figures this out, you\'ll be blacklisted. The party might happen—but your reputation won\'t survive it.',
  dialog: [
    { speakerId: 'tyler', text: '"So when do I meet Maris? You said..."', emotion: 'angry' },
    { speakerId: 'inner-voice', text: 'Promises are contracts. You just defaulted.', emotion: 'sad' },
  ],
};

export const allEndings: ForkScene[] = [tylerSuccessEnding, blakeSuccessEnding, blakeCautiousEnding, danaDebtEnding, danaTrapEnding, overpromiseEnding];
