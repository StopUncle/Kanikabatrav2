import type { ForkScene } from '../../../types';
export const finaleScenes: ForkScene[] = [
  { id: 'final-morning', backgroundId: 'apartment', mood: 'mysterious', dialog: [
    { speakerId: null, text: 'Last morning on the island. Jets leaving at noon.', emotion: 'neutral' },
    { speakerId: null, text: 'A knock at your door. Harrison Cole.', emotion: 'neutral' },
    { speakerId: 'inner-voice', text: 'He doesn\'t knock. Something important.', emotion: 'knowing' },
  ], nextSceneId: 'harrison-offer' },
  { id: 'harrison-offer', backgroundId: 'apartment', dialog: [
    { speakerId: 'harrison', text: '"You\'ve impressed me. That\'s rare."', emotion: 'neutral' },
    { speakerId: 'harrison', text: '"I\'m offering you a position. Direct access to my network."', emotion: 'cold' },
    { speakerId: null, text: 'The offer. What you came here for. But at what cost?', emotion: 'neutral' },
    { speakerId: 'inner-voice', text: 'He doesn\'t give. He invests. What does he expect back?', emotion: 'concerned' },
  ], choices: [
    { id: 'clarify-terms', text: '"What would that look like, specifically?"', nextSceneId: 'harrison-specifics', feedback: 'Get details before committing.', isOptimal: true },
    { id: 'accept-fast', text: '"Yes. I\'m in."', nextSceneId: 'harrison-owns', feedback: 'Too eager. He likes hungry. He uses hungry.' },
    { id: 'decline-fast', text: '"Thank you, but I need to think."', nextSceneId: 'harrison-intrigued', feedback: 'Walking away from power. Dangerous but interesting.' },
  ]},
  { id: 'harrison-specifics', backgroundId: 'apartment', dialog: [
    { speakerId: 'harrison', text: '"Quarterly gatherings. Introductions that matter. In exchange..."', emotion: 'neutral' },
    { speakerId: 'harrison', text: '"You become available when I call. Projects I choose. People I direct you toward."', emotion: 'cold' },
    { speakerId: 'inner-voice', text: 'Availability. His puppet when needed. Golden cage.', emotion: 'knowing' },
  ], choices: [
    { id: 'negotiate', text: '"I\'m interested in access, not ownership."', nextSceneId: 'harrison-respects', feedback: 'Defining your terms.', isOptimal: true },
    { id: 'accept-terms', text: '"Those terms work."', nextSceneId: 'harrison-owns', feedback: 'You just sold yourself.' },
  ]},
  { id: 'harrison-owns', backgroundId: 'apartment', dialog: [
    { speakerId: 'harrison', text: '"Excellent. You\'ll receive instructions."', emotion: 'smirking' },
    { speakerId: null, text: 'He shakes your hand. Something transferred. Your freedom, perhaps.', emotion: 'neutral' },
    { speakerId: 'inner-voice', text: 'You have access. He has you.', emotion: 'sad' },
  ], nextSceneId: 'ending-golden-cage' },
  { id: 'harrison-intrigued', backgroundId: 'apartment', dialog: [
    { speakerId: 'harrison', text: '"Think. Interesting."', emotion: 'neutral' },
    { speakerId: 'harrison', text: '"Most people leap at offers. You pause."', emotion: 'knowing' },
  ], nextSceneId: 'victor-judgment' },
  { id: 'harrison-respects', backgroundId: 'apartment', dialog: [
    { speakerId: 'harrison', text: '"Access without ownership."', emotion: 'smirking' },
    { speakerId: 'harrison', text: '"You\'re negotiating with me. Bold."', emotion: 'cold' },
    { speakerId: 'harrison', text: '"We\'ll discuss. You\'re worth the conversation."', emotion: 'neutral' },
    { speakerId: 'inner-voice', text: 'Respect earned. Not submission given.', emotion: 'hopeful' },
  ], nextSceneId: 'victor-judgment' },
  { id: 'victor-judgment', backgroundId: 'restaurant', dialog: [
    { speakerId: null, text: 'Final breakfast. Victor Ashworth approaches.', emotion: 'neutral' },
    { speakerId: 'victor', text: '"I underestimated you. Kai chose well."', emotion: 'neutral' },
    { speakerId: null, text: 'From Victor, that\'s practically a standing ovation.', emotion: 'neutral' },
    { speakerId: 'inner-voice', text: 'Old money approval. Doors open.', emotion: 'knowing' },
  ], nextSceneId: 'isabelle-farewell' },
  { id: 'isabelle-farewell', backgroundId: 'restaurant', dialog: [
    { speakerId: 'isabelle', text: '"Leaving without saying goodbye?"', emotion: 'seductive' },
    { speakerId: 'isabelle', text: '"You\'re not like the others. They\'re either too hungry or too scared."', emotion: 'knowing' },
    { speakerId: 'inner-voice', text: 'She\'s still assessing. Always assessing.', emotion: 'concerned' },
  ], choices: [
    { id: 'honest-isabelle', text: '"I\'m still figuring out what I want."', nextSceneId: 'isabelle-respects', feedback: 'Honesty from a position of strength.', isOptimal: true },
    { id: 'play-game', text: '"Maybe I\'ll be hungry for the right thing."', nextSceneId: 'isabelle-notes', feedback: 'Playing her game back. Risky.' },
  ]},
  { id: 'isabelle-respects', backgroundId: 'restaurant', dialog: [
    { speakerId: 'isabelle', text: '"Uncertainty from confidence. Rare combination."', emotion: 'knowing' },
    { speakerId: 'isabelle', text: '"Call me when you know."', emotion: 'seductive' },
    { speakerId: null, text: 'She presses a card into your hand. Paris number.', emotion: 'neutral' },
  ], nextSceneId: 'kai-final' },
  { id: 'isabelle-notes', backgroundId: 'restaurant', dialog: [
    { speakerId: 'isabelle', text: '"We\'ll see. Hunger can be useful."', emotion: 'smirking' },
    { speakerId: null, text: 'She walks away. You\'re filed somewhere in her mind.', emotion: 'neutral' },
  ], nextSceneId: 'kai-final' },
  { id: 'kai-final', backgroundId: 'park', dialog: [
    { speakerId: 'kai', text: '"So? How was it?"', emotion: 'concerned' },
    { speakerId: null, text: 'Kai. Waiting by the helipad. The one who brought you here.', emotion: 'neutral' },
    { speakerId: 'inner-voice', text: 'Tell her the truth or the performance?', emotion: 'knowing' },
  ], choices: [
    { id: 'truth-kai', text: '"Eye-opening. I learned who I don\'t want to become."', nextSceneId: 'ending-self-defined', feedback: 'Authentic. The real lesson.', isOptimal: true },
    { id: 'performance', text: '"Perfect. Made valuable connections."', nextSceneId: 'kai-sad', feedback: 'She sees through it. Worries more.' },
  ]},
  { id: 'kai-sad', backgroundId: 'park', dialog: [
    { speakerId: 'kai', text: '"That\'s... good."', emotion: 'sad' },
    { speakerId: null, text: 'She doesn\'t believe you. Or worse—she does.', emotion: 'neutral' },
    { speakerId: 'inner-voice', text: 'She sees you changing. Into them.', emotion: 'sad' },
  ], nextSceneId: 'ending-connections-cost' },
];
