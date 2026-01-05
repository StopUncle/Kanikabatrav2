import type { ForkScene } from '../../../types';
export const clubScenes: ForkScene[] = [
  { id: 'club-entrance', backgroundId: 'bar', mood: 'party', dialog: [
    { speakerId: null, text: 'The club pulses with music and power. Tyler waves you through the main door.', emotion: 'neutral' },
    { speakerId: 'tyler', text: '"VIP is upstairs. But that\'s... invitation only."', emotion: 'smirking' },
    { speakerId: 'inner-voice', text: 'He\'s dangling access. Playing his game.', emotion: 'knowing' },
  ], choices: [
    { id: 'ask-vip', text: '"How do I get an invitation?"', nextSceneId: 'tyler-power', feedback: 'Playing into his need to feel important.' },
    { id: 'dont-need', text: '"I\'m good down here"', nextSceneId: 'kai-descends', feedback: 'Not playing. Interesting.', isOptimal: true },
  ]},
  { id: 'tyler-power', backgroundId: 'bar', dialog: [
    { speakerId: 'tyler', text: '"Well, you\'d need someone to vouch for you. Someone important."', emotion: 'happy' },
    { speakerId: 'tyler', text: '"I could maybe put in a word. If you make tonight worth my while."', emotion: 'seductive' },
    { speakerId: 'inner-voice', text: 'Always a transaction with Tyler. Always.', emotion: 'knowing' },
  ], choices: [
    { id: 'play-along', text: '"What did you have in mind?"', nextSceneId: 'tyler-request', feedback: 'Engaging with his terms.' },
    { id: 'walk-away', text: '"I think I\'ll just enjoy the music"', nextSceneId: 'kai-descends', feedback: 'Exit his frame. Good.', isOptimal: true },
  ]},
  { id: 'tyler-request', backgroundId: 'bar', dialog: [
    { speakerId: 'tyler', text: '"There\'s someone I want to impress. Help me look good in front of them."', emotion: 'serious' },
    { speakerId: 'inner-voice', text: 'He wants to use you as a social prop. Again.', emotion: 'concerned' },
  ], choices: [
    { id: 'agree', text: 'Agree to help Tyler', nextSceneId: 'ending-tylers-prop', feedback: 'TRAP: You\'re his tool now.', isOptimal: false },
    { id: 'decline-polite', text: '"I\'m here for my own thing tonight"', nextSceneId: 'kai-descends', feedback: 'Boundaries. Even with gatekeepers.' },
  ]},
  { id: 'kai-descends', backgroundId: 'bar', dialog: [
    { speakerId: null, text: 'A woman descends from VIP. Elegant. Intense. Eyes locked on you.', emotion: 'neutral' },
    { speakerId: 'kai', text: '"You\'re the one from the gala. I\'ve been watching."', emotion: 'knowing' },
    { speakerId: 'inner-voice', text: 'Kai Chen. Old money. Unpredictable. This is significant.', emotion: 'concerned' },
  ], choices: [
    { id: 'play-cool', text: '"Watching what exactly?"', nextSceneId: 'kai-explains', feedback: 'Match her intensity. Don\'t flinch.', isOptimal: true },
    { id: 'flattered', text: '"That\'s flattering"', nextSceneId: 'kai-tests', feedback: 'She\'s not giving compliments. She\'s evaluating.' },
  ]},
  { id: 'kai-explains', backgroundId: 'bar', dialog: [
    { speakerId: 'kai', text: '"How you handle Tyler. How you don\'t chase. How you see things."', emotion: 'knowing' },
    { speakerId: 'kai', text: '"Most people are transparent. You\'re not."', emotion: 'curious' },
    { speakerId: 'inner-voice', text: 'She\'s been studying you. This could be opportunity or danger.', emotion: 'concerned' },
  ], nextSceneId: 'kai-offer' },
  { id: 'kai-tests', backgroundId: 'bar', dialog: [
    { speakerId: 'kai', text: '"Flattering? I don\'t do flattery."', emotion: 'cold' },
    { speakerId: null, text: 'Her eyes narrow. You misread her.', emotion: 'neutral' },
    { speakerId: 'kai', text: '"I thought you might be interesting. Disappointing."', emotion: 'neutral' },
  ], nextSceneId: 'ending-kai-dismissed' },
  { id: 'kai-offer', backgroundId: 'bar', dialog: [
    { speakerId: 'kai', text: '"There\'s a private event next month. The real players. I could sponsor you."', emotion: 'neutral' },
    { speakerId: 'kai', text: '"But I need to know you\'re worth the investment."', emotion: 'serious' },
    { speakerId: 'inner-voice', text: 'This is the door to Level 3. But what\'s the cost?', emotion: 'knowing' },
  ], choices: [
    { id: 'ask-cost', text: '"What would I need to do?"', nextSceneId: 'kai-terms', feedback: 'Understand the deal before agreeing.', isOptimal: true },
    { id: 'agree-fast', text: '"I\'m in"', nextSceneId: 'kai-concerned', feedback: 'Too eager. She notices.' },
  ]},
  { id: 'kai-terms', backgroundId: 'bar', dialog: [
    { speakerId: 'kai', text: '"Be yourself. Don\'t play games with me. And when I need something, you show up."', emotion: 'serious' },
    { speakerId: 'kai', text: '"Simple terms. But I hold people to them."', emotion: 'cold' },
    { speakerId: 'inner-voice', text: 'Clear terms. Intense expectations. This is real.', emotion: 'knowing' },
  ], choices: [
    { id: 'accept-terms', text: '"I can do that"', nextSceneId: 'ending-kai-sponsor', feedback: 'Deal made. Level 3 unlocked.', isOptimal: true },
    { id: 'hesitate', text: '"Let me think about it"', nextSceneId: 'kai-respects', feedback: 'Caution. She might respect it.' },
  ]},
  { id: 'kai-concerned', backgroundId: 'bar', dialog: [
    { speakerId: 'kai', text: '"You said yes too fast. People who say yes that fast usually disappoint."', emotion: 'concerned' },
    { speakerId: 'kai', text: '"I\'ll watch a bit longer before I decide."', emotion: 'neutral' },
    { speakerId: 'inner-voice', text: 'Eagerness read as desperation. Noted.', emotion: 'sad' },
  ], nextSceneId: 'ending-kai-watching' },
  { id: 'kai-respects', backgroundId: 'bar', dialog: [
    { speakerId: 'kai', text: '"Think about it."', emotion: 'neutral' },
    { speakerId: null, text: 'Something like respect flickers in her eyes.', emotion: 'neutral' },
    { speakerId: 'kai', text: '"Not many people make me wait. I\'ll find you when you\'re ready."', emotion: 'knowing' },
  ], nextSceneId: 'ending-kai-intrigued' },
];
