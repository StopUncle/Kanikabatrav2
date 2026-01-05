import type { ForkScene } from '../../../types';
export const intelScenes: ForkScene[] = [
  { id: 'elena-meet', backgroundId: 'restaurant', dialog: [
    { speakerId: 'elena', text: '"So. You want to survive the gala. You need to know who matters."', emotion: 'knowing' },
    { speakerId: 'elena', text: '"Harrison Cole. Victoria Sterling. Millicent Caldwell. I can tell you everything."', emotion: 'neutral' },
    { speakerId: 'inner-voice', text: 'Elena deals in information. Nothing is free.', emotion: 'knowing' },
  ], choices: [
    { id: 'ask-price', text: '"What\'s your price?"', nextSceneId: 'elena-terms', feedback: 'Direct. She respects that.', isOptimal: true },
    { id: 'try-free', text: '"Can\'t you just tell me the basics?"', nextSceneId: 'elena-laughs', feedback: 'Naive. She won\'t respect that.' },
  ]},
  { id: 'elena-laughs', backgroundId: 'restaurant', dialog: [
    { speakerId: 'elena', text: '"Free? Darling, information is currency. I don\'t give currency away."', emotion: 'smirking' },
    { speakerId: 'elena', text: '"What do you have that I want?"', emotion: 'knowing' },
    { speakerId: 'inner-voice', text: 'She\'s evaluating you now. Careful what you offer.', emotion: 'concerned' },
  ], nextSceneId: 'elena-terms' },
  { id: 'elena-terms', backgroundId: 'restaurant', dialog: [
    { speakerId: 'elena', text: '"I want to know what Maris said to you at the first gala. Specifically."', emotion: 'serious' },
    { speakerId: 'elena', text: '"Maris is a closed book. You cracked it. That\'s valuable."', emotion: 'curious' },
    { speakerId: 'inner-voice', text: 'Trading Maris intel. That could be dangerous.', emotion: 'concerned' },
  ], choices: [
    { id: 'trade-maris', text: 'Share what Maris said', nextSceneId: 'ending-traded', feedback: 'Fair trade. But now Elena has leverage.' },
    { id: 'offer-else', text: '"I can offer something else"', nextSceneId: 'elena-counter', feedback: 'Negotiate. See what else works.', isOptimal: true },
    { id: 'decline', text: '"That\'s not for sale"', nextSceneId: 'elena-respects', feedback: 'Some things are worth protecting.' },
  ]},
  { id: 'elena-counter', backgroundId: 'restaurant', dialog: [
    { speakerId: 'elena', text: '"Such as?"', emotion: 'curious' },
    { speakerId: 'inner-voice', text: 'What do you have that she might want?', emotion: 'knowing' },
  ], choices: [
    { id: 'offer-access', text: '"Access to Kai\'s next event"', nextSceneId: 'elena-interested', feedback: 'Kai is valuable currency.', isOptimal: true },
    { id: 'offer-dana', text: '"Information about Dana Morrison"', nextSceneId: 'elena-dismisses', feedback: 'Dana is small fish to Elena.' },
  ]},
  { id: 'elena-interested', backgroundId: 'restaurant', dialog: [
    { speakerId: 'elena', text: '"Kai Chen? Hmm. She\'s selective. You can get me in?"', emotion: 'curious' },
    { speakerId: 'elena', text: '"If you can deliver that... we have a deal."', emotion: 'neutral' },
    { speakerId: 'inner-voice', text: 'You\'ll need to ask Kai. But this protects the Maris intel.', emotion: 'knowing' },
  ], nextSceneId: 'ending-negotiated' },
  { id: 'elena-dismisses', backgroundId: 'restaurant', dialog: [
    { speakerId: 'elena', text: '"Dana? She\'s amateur hour. I already know everything about her."', emotion: 'smirking' },
    { speakerId: 'elena', text: '"Try again."', emotion: 'cold' },
  ], choices: [
    { id: 'give-maris', text: 'Share Maris intel after all', nextSceneId: 'ending-traded', feedback: 'Backed into a corner.' },
    { id: 'walk-away', text: '"Then we don\'t have a deal"', nextSceneId: 'ending-blind', feedback: 'Going in blind. Risky.' },
  ]},
  { id: 'elena-respects', backgroundId: 'restaurant', dialog: [
    { speakerId: 'elena', text: '"Interesting. You protect your sources."', emotion: 'knowing' },
    { speakerId: 'elena', text: '"I\'ll give you the basics—as a courtesy. But next time, you owe me."', emotion: 'serious' },
    { speakerId: 'inner-voice', text: 'A debt to Elena. That\'s not nothing.', emotion: 'concerned' },
  ], nextSceneId: 'ending-debt' },
];
