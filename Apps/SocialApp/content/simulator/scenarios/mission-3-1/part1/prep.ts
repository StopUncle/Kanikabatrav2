import type { ForkScene } from '../../../types';
export const prepScenes: ForkScene[] = [
  { id: 'prep-begin', backgroundId: 'apartment', dialog: [
    { speakerId: null, text: 'The gala is in three days. You need to look the part.', emotion: 'neutral' },
    { speakerId: null, text: 'Two texts arrive almost simultaneously.', emotion: 'neutral' },
    { speakerId: null, text: 'KAI: "Meet me at Laurent\'s. I\'ll show you what works."', emotion: 'neutral' },
    { speakerId: null, text: 'VICTORIA: "I hear you need an outfit! I know the PERFECT place."', emotion: 'neutral' },
    { speakerId: 'inner-voice', text: 'Kai is direct. Victoria is... too helpful.', emotion: 'knowing' },
  ], choices: [
    { id: 'go-kai', text: 'Go with Kai', nextSceneId: 'kai-guidance', feedback: 'Your sponsor. Trust her judgment.', isOptimal: true },
    { id: 'go-victoria', text: 'Go with Victoria', nextSceneId: 'victoria-trap', feedback: 'Victoria offering help? Suspicious.' },
  ]},
  { id: 'kai-guidance', backgroundId: 'office', dialog: [
    { speakerId: 'kai', text: '"The rule is simple. Elegant, not flashy. Expensive, not obvious."', emotion: 'serious' },
    { speakerId: 'kai', text: '"You want them to remember you, not your outfit."', emotion: 'knowing' },
    { speakerId: 'inner-voice', text: 'She knows this world. Listen.', emotion: 'hopeful' },
  ], nextSceneId: 'kai-selection' },
  { id: 'kai-selection', backgroundId: 'office', dialog: [
    { speakerId: 'kai', text: '"This one. Classic lines. Quality fabric. Says \'I belong\' without screaming it."', emotion: 'neutral' },
    { speakerId: null, text: 'The price tag makes you blink. But she\'s right—it\'s perfect.', emotion: 'neutral' },
    { speakerId: 'inner-voice', text: 'Investment, not expense. There\'s a difference.', emotion: 'knowing' },
  ], choices: [
    { id: 'buy-it', text: 'Buy it', nextSceneId: 'ending-prepared', feedback: 'Trust Kai\'s judgment. Worth it.', isOptimal: true },
    { id: 'hesitate-price', text: '"That\'s a lot..."', nextSceneId: 'kai-advice', feedback: 'She\'ll have thoughts on that.' },
  ]},
  { id: 'kai-advice', backgroundId: 'office', dialog: [
    { speakerId: 'kai', text: '"You want to play in this world, you invest in the uniform."', emotion: 'serious' },
    { speakerId: 'kai', text: '"Cheap at the gala means invisible. Or worse—mockable."', emotion: 'cold' },
    { speakerId: 'inner-voice', text: 'Harsh but true. This is the game.', emotion: 'knowing' },
  ], nextSceneId: 'ending-prepared' },
  { id: 'victoria-trap', backgroundId: 'office', dialog: [
    { speakerId: 'victoria', text: '"This! This is SO you!"', emotion: 'happy' },
    { speakerId: null, text: 'She holds up something bright. Bold. Very bold.', emotion: 'neutral' },
    { speakerId: 'inner-voice', text: 'That would make you stand out—in the worst way.', emotion: 'concerned' },
  ], choices: [
    { id: 'accept-victoria', text: '"You think so?"', nextSceneId: 'victoria-pushes', feedback: 'She\'s steering you wrong.' },
    { id: 'doubt-victoria', text: '"I was thinking something more understated"', nextSceneId: 'victoria-pivots', feedback: 'Good instinct. See her reaction.', isOptimal: true },
  ]},
  { id: 'victoria-pushes', backgroundId: 'office', dialog: [
    { speakerId: 'victoria', text: '"Trust me, everyone will notice you! That\'s the point, right?"', emotion: 'seductive' },
    { speakerId: 'inner-voice', text: 'Notice. Whisper. Laugh. That\'s her plan.', emotion: 'concerned' },
  ], choices: [
    { id: 'buy-wrong', text: 'Buy what Victoria suggests', nextSceneId: 'ending-sabotaged', feedback: 'TRAP: You\'ll be a joke at the gala.', isOptimal: false },
    { id: 'walk-away', text: '"I need to think about it"', nextSceneId: 'escape-victoria', feedback: 'Exit. Regroup.', isOptimal: true },
  ]},
  { id: 'victoria-pivots', backgroundId: 'office', dialog: [
    { speakerId: 'victoria', text: '"Understated? That\'s so... safe."', emotion: 'neutral' },
    { speakerId: null, text: 'Her smile tightens. She didn\'t expect pushback.', emotion: 'neutral' },
    { speakerId: 'victoria', text: '"But sure. Your call."', emotion: 'cold' },
  ], nextSceneId: 'escape-victoria' },
  { id: 'escape-victoria', backgroundId: 'park', dialog: [
    { speakerId: null, text: 'You leave without buying. Message Kai.', emotion: 'neutral' },
    { speakerId: null, text: 'KAI: "Victoria tried to help? Smart to decline. Come to Laurent\'s."', emotion: 'neutral' },
    { speakerId: 'inner-voice', text: 'Kai knew. Victoria\'s reputation precedes her.', emotion: 'knowing' },
  ], nextSceneId: 'kai-guidance' },
];
