import type { ForkScene } from '../../../types';
export const conversationScenes: ForkScene[] = [
  { id: 'after-dinner', backgroundId: 'restaurant', mood: 'mysterious', dialog: [
    { speakerId: null, text: 'The formal dinner disperses. Small groups form. Terrace lights glow.', emotion: 'neutral' },
    { speakerId: null, text: 'This is when the real conversations happen.', emotion: 'neutral' },
    { speakerId: 'inner-voice', text: 'Be careful who you talk to. And what you say.', emotion: 'knowing' },
  ], choices: [
    { id: 'find-quiet', text: 'Find a quiet corner. Let others approach.', nextSceneId: 'millicent-approaches', feedback: 'Patient. Let the dynamics come to you.', isOptimal: true },
    { id: 'join-group', text: 'Join the largest group', nextSceneId: 'crowd-approach', feedback: 'Visible. But conversations there are surface level.' },
    { id: 'seek-harrison', text: 'Look for Harrison', nextSceneId: 'harrison-occupied', feedback: 'He\'s occupied. And being too eager shows.' },
  ]},
  { id: 'crowd-approach', backgroundId: 'restaurant', dialog: [
    { speakerId: null, text: 'Surface conversation. Weather. Sports. Nothing real.', emotion: 'neutral' },
    { speakerId: 'inner-voice', text: 'The serious talks are elsewhere. You\'re missing them.', emotion: 'concerned' },
  ], nextSceneId: 'millicent-later' },
  { id: 'harrison-occupied', backgroundId: 'restaurant', dialog: [
    { speakerId: null, text: 'Harrison is in deep conversation with Victor. They notice your approach.', emotion: 'neutral' },
    { speakerId: 'inner-voice', text: 'Bad timing. You look like you\'re trying too hard.', emotion: 'sad' },
  ], nextSceneId: 'millicent-later' },
  { id: 'millicent-later', backgroundId: 'park', dialog: [
    { speakerId: 'millicent', text: '"Not enjoying the circus?"', emotion: 'knowing' },
    { speakerId: null, text: 'Millicent appears beside you. Different energy than the others.', emotion: 'neutral' },
  ], nextSceneId: 'millicent-talk' },
  { id: 'millicent-approaches', backgroundId: 'park', dialog: [
    { speakerId: 'millicent', text: '"The quiet ones are always the smart ones."', emotion: 'neutral' },
    { speakerId: null, text: 'She joins you. No agenda in her posture.', emotion: 'neutral' },
    { speakerId: 'inner-voice', text: 'Something different about her. Less... calculating.', emotion: 'curious' },
  ], nextSceneId: 'millicent-talk' },
  { id: 'millicent-talk', backgroundId: 'park', dialog: [
    { speakerId: 'millicent', text: '"I\'ve been watching you navigate tonight. You\'re careful."', emotion: 'neutral' },
    { speakerId: 'millicent', text: '"That\'s good. Most people here will use everything against you."', emotion: 'serious' },
    { speakerId: 'inner-voice', text: 'Warning or test? Hard to tell.', emotion: 'knowing' },
  ], choices: [
    { id: 'appreciate-honesty', text: '"I appreciate the directness."', nextSceneId: 'millicent-opens', feedback: 'Acknowledging without over-committing.', isOptimal: true },
    { id: 'suspicious', text: '"Why are you telling me this?"', nextSceneId: 'millicent-closes', feedback: 'Too suspicious. She\'s actually genuine.' },
    { id: 'overshare', text: 'Tell her about your concerns', nextSceneId: 'millicent-warned', feedback: 'Too much too fast. Even allies can be overwhelmed.' },
  ]},
  { id: 'millicent-opens', backgroundId: 'park', dialog: [
    { speakerId: 'millicent', text: '"I was where you are. Five years ago. Wish someone had warned me."', emotion: 'sad' },
    { speakerId: 'millicent', text: '"Elena will approach you tonight. Don\'t give her anything real."', emotion: 'serious' },
    { speakerId: 'inner-voice', text: 'An actual ally. Rare in this world.', emotion: 'hopeful' },
  ], nextSceneId: 'elena-appears' },
  { id: 'millicent-closes', backgroundId: 'park', dialog: [
    { speakerId: 'millicent', text: '"I understand. Trust is earned here."', emotion: 'neutral' },
    { speakerId: null, text: 'She nods and walks away. Opportunity lost.', emotion: 'neutral' },
    { speakerId: 'inner-voice', text: 'She was genuine. You pushed her away.', emotion: 'sad' },
  ], nextSceneId: 'elena-appears' },
  { id: 'millicent-warned', backgroundId: 'park', dialog: [
    { speakerId: 'millicent', text: '"That\'s... a lot. Be careful who you share that with."', emotion: 'concerned' },
    { speakerId: null, text: 'She glances around. Nervous now.', emotion: 'neutral' },
    { speakerId: 'inner-voice', text: 'Too much. She\'s retreating.', emotion: 'sad' },
  ], nextSceneId: 'elena-appears' },
  { id: 'elena-appears', backgroundId: 'restaurant', dialog: [
    { speakerId: 'elena', text: '"There you are. I\'ve been looking for you."', emotion: 'knowing' },
    { speakerId: null, text: 'Elena. The information broker. Everything about her is intentional.', emotion: 'neutral' },
    { speakerId: 'elena', text: '"I have something that might interest you. About Harrison\'s plans."', emotion: 'seductive' },
    { speakerId: 'inner-voice', text: 'Nothing is free with Elena. What\'s her price?', emotion: 'concerned' },
  ], choices: [
    { id: 'decline-politely', text: '"I prefer to learn things directly."', nextSceneId: 'elena-respects', feedback: 'No debt created. Clean exit.', isOptimal: true },
    { id: 'ask-price', text: '"What would that cost me?"', nextSceneId: 'elena-negotiates', feedback: 'Engaging means she has leverage now.' },
    { id: 'accept-freely', text: '"Tell me."', nextSceneId: 'ending-elena-owns', feedback: 'TRAP: Now you owe her. She\'ll collect.' },
  ]},
  { id: 'elena-respects', backgroundId: 'restaurant', dialog: [
    { speakerId: 'elena', text: '"Smart. Most people take the bait."', emotion: 'smirking' },
    { speakerId: 'elena', text: '"We\'ll talk again. When you want something."', emotion: 'knowing' },
  ], nextSceneId: 'dominic-offer' },
  { id: 'elena-negotiates', backgroundId: 'restaurant', dialog: [
    { speakerId: 'elena', text: '"Just a small thing. Tell me who Kai is really working with."', emotion: 'knowing' },
    { speakerId: 'inner-voice', text: 'Trading information about your sponsor. Dangerous.', emotion: 'concerned' },
  ], choices: [
    { id: 'back-out', text: '"On second thought, I\'ll pass."', nextSceneId: 'elena-notes', feedback: 'Smart exit. She notes your caution.' },
    { id: 'trade', text: 'Share what you know about Kai', nextSceneId: 'ending-betrayed-kai', feedback: 'You just betrayed your sponsor for gossip.' },
  ]},
  { id: 'elena-notes', backgroundId: 'restaurant', dialog: [
    { speakerId: 'elena', text: '"Loyal. How quaint."', emotion: 'cold' },
    { speakerId: null, text: 'She glides away. You\'ve made her list. Good or bad, unclear.', emotion: 'neutral' },
  ], nextSceneId: 'dominic-offer' },
  { id: 'dominic-offer', backgroundId: 'park', dialog: [
    { speakerId: 'dominic', text: '"Walk with me."', emotion: 'neutral' },
    { speakerId: null, text: 'Dominic appears. Direct as always.', emotion: 'neutral' },
    { speakerId: 'dominic', text: '"I\'m building something. I need people outside the old guard."', emotion: 'serious' },
    { speakerId: 'inner-voice', text: 'A faction offer. Choose sides or stay neutral?', emotion: 'knowing' },
  ], choices: [
    { id: 'interested-cautious', text: '"I\'m listening. But I don\'t commit quickly."', nextSceneId: 'dominic-respects', feedback: 'Interest without commitment. Perfect balance.', isOptimal: true },
    { id: 'commit-early', text: '"I\'m in. What do you need?"', nextSceneId: 'ending-faction-locked', feedback: 'Too fast. You don\'t know his enemies yet.' },
    { id: 'refuse-flat', text: '"I work alone."', nextSceneId: 'dominic-dismisses', feedback: 'No one works alone here. Now he\'s suspicious.' },
  ]},
  { id: 'dominic-respects', backgroundId: 'park', dialog: [
    { speakerId: 'dominic', text: '"Good. Think about it. We\'ll talk again."', emotion: 'neutral' },
    { speakerId: null, text: 'He hands you a card. Old school. Intentional.', emotion: 'neutral' },
  ], nextSceneId: 'harrison-moment' },
  { id: 'dominic-dismisses', backgroundId: 'park', dialog: [
    { speakerId: 'dominic', text: '"Lone wolves don\'t last here. Your choice."', emotion: 'cold' },
    { speakerId: null, text: 'He walks away. Door closed.', emotion: 'neutral' },
    { speakerId: 'inner-voice', text: 'Burned a bridge. Hope you don\'t need it.', emotion: 'concerned' },
  ], nextSceneId: 'harrison-moment' },
  { id: 'harrison-moment', backgroundId: 'park', dialog: [
    { speakerId: null, text: 'Late now. Most guests gone. Harrison alone on the terrace.', emotion: 'neutral' },
    { speakerId: 'harrison', text: '"Still here. Interesting."', emotion: 'neutral' },
    { speakerId: 'inner-voice', text: 'A moment alone with the architect. Be careful.', emotion: 'knowing' },
  ], choices: [
    { id: 'brief-honest', text: '"Learning the landscape."', nextSceneId: 'ending-harrison-notes', feedback: 'Brief. Honest. Leaves him curious.', isOptimal: true },
    { id: 'try-impress', text: 'Try to demonstrate your value', nextSceneId: 'harrison-bored', feedback: 'He\'s seen every pitch. Trying to impress bores him.' },
  ]},
  { id: 'harrison-bored', backgroundId: 'park', dialog: [
    { speakerId: 'harrison', text: '"Mm."', emotion: 'cold' },
    { speakerId: null, text: 'One syllable. Dismissal.', emotion: 'neutral' },
  ], nextSceneId: 'ending-harrison-notes' },
];
