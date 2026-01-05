import type { ForkScene } from '../../../types';
export const favorScenes: ForkScene[] = [
  { id: 'dana-call', backgroundId: 'text-screen', dialog: [
    { speakerId: null, text: 'DANA: "Hey! I need your help with something. Can we meet?"', emotion: 'neutral' },
    { speakerId: null, text: 'DANA: "It\'s really important. I wouldn\'t ask if it wasn\'t."', emotion: 'neutral' },
    { speakerId: 'inner-voice', text: 'Dana needs something. The question is what—and what it will cost you.', emotion: 'concerned' },
  ], choices: [
    { id: 'meet-dana', text: 'Agree to meet', nextSceneId: 'dana-meet', feedback: 'Hear her out. Stay guarded.' },
    { id: 'ask-first', text: '"What\'s this about?"', nextSceneId: 'dana-vague', feedback: 'Get info before committing.', isOptimal: true },
  ]},
  { id: 'dana-vague', backgroundId: 'text-screen', dialog: [
    { speakerId: null, text: 'DANA: "I\'d rather explain in person. It\'s a bit sensitive."', emotion: 'neutral' },
    { speakerId: null, text: 'DANA: "Please? I really need someone I can trust."', emotion: 'neutral' },
    { speakerId: 'inner-voice', text: 'She won\'t say over text. That alone is information.', emotion: 'knowing' },
  ], nextSceneId: 'dana-meet' },
  { id: 'dana-meet', backgroundId: 'coffee-shop', dialog: [
    { speakerId: 'dana', text: '"Thanks for coming. Look, I need you to pass a message to someone at the next Caldwell event."', emotion: 'serious' },
    { speakerId: 'dana', text: '"It\'s nothing bad! Just... I can\'t be the one to deliver it. Long story."', emotion: 'neutral' },
    { speakerId: 'inner-voice', text: 'If it\'s nothing bad, why can\'t she do it herself?', emotion: 'concerned' },
  ], choices: [
    { id: 'ask-details', text: '"What\'s in the message?"', nextSceneId: 'dana-reveals', feedback: 'Don\'t agree blind.', isOptimal: true },
    { id: 'agree-blind', text: '"Sure, I can do that"', nextSceneId: 'ending-tool', feedback: 'TRAP: You just agreed to something unknown.', isOptimal: false },
  ]},
  { id: 'dana-reveals', backgroundId: 'coffee-shop', dialog: [
    { speakerId: 'dana', text: '"It\'s about... some information I have. About Victoria Sterling."', emotion: 'neutral' },
    { speakerId: 'dana', text: '"I need it to reach certain people. Through you, it looks innocent."', emotion: 'smirking' },
    { speakerId: 'inner-voice', text: 'You\'d be her messenger. Her deniable courier. Her tool.', emotion: 'concerned' },
  ], choices: [
    { id: 'refuse', text: '"I\'m not comfortable being in the middle of this"', nextSceneId: 'dana-pushes', feedback: 'Clear boundary. Watch her reaction.', isOptimal: true },
    { id: 'negotiate', text: '"What\'s in it for me?"', nextSceneId: 'dana-offers', feedback: 'Transactional frame. Dangerous ground.' },
  ]},
  { id: 'dana-pushes', backgroundId: 'coffee-shop', dialog: [
    { speakerId: 'dana', text: '"After everything I\'ve done for you?"', emotion: 'angry' },
    { speakerId: 'dana', text: '"I got you on Tyler\'s list. I\'ve been a good friend. And this is one small thing."', emotion: 'sad' },
    { speakerId: 'inner-voice', text: 'She got you on a list. Now you owe her forever? That math doesn\'t work.', emotion: 'knowing' },
  ], choices: [
    { id: 'hold-firm', text: '"I appreciate that. But the answer is still no."', nextSceneId: 'dana-shows-true', feedback: 'Steel spine. Good.', isOptimal: true },
    { id: 'cave', text: '"...Fine. What do I need to do?"', nextSceneId: 'ending-tool', feedback: 'TRAP: Guilt won.', isOptimal: false },
  ]},
  { id: 'dana-shows-true', backgroundId: 'coffee-shop', dialog: [
    { speakerId: 'dana', text: '"Fine. I\'ll remember this."', emotion: 'cold' },
    { speakerId: null, text: 'The mask drops. Cold calculation behind the smile.', emotion: 'neutral' },
    { speakerId: 'inner-voice', text: 'There she is. The real Dana. Now you know.', emotion: 'knowing' },
  ], nextSceneId: 'ending-escaped' },
  { id: 'dana-offers', backgroundId: 'coffee-shop', dialog: [
    { speakerId: 'dana', text: '"What do you want? Access? Information? I can make things happen."', emotion: 'seductive' },
    { speakerId: 'inner-voice', text: 'She\'s trying to buy you. The price is becoming her tool.', emotion: 'concerned' },
  ], choices: [
    { id: 'walk-away', text: '"Nothing you\'re offering is worth this"', nextSceneId: 'dana-shows-true', feedback: 'Exit the negotiation.', isOptimal: true },
    { id: 'take-deal', text: '"What kind of access?"', nextSceneId: 'ending-bought', feedback: 'TRAP: You\'re negotiating your own capture.' },
  ]},
];
