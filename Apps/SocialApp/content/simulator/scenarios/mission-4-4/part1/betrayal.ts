import type { ForkScene } from '../../../types';
export const betrayalScenes: ForkScene[] = [
  { id: 'discovery', backgroundId: 'restaurant', mood: 'danger', dialog: [
    { speakerId: null, text: 'The email lands. Forwarded chain. Your private words—shared.', emotion: 'neutral' },
    { speakerId: null, text: 'Blake. Blake sent your confidences to Harrison.', emotion: 'neutral' },
    { speakerId: 'inner-voice', text: 'Betrayed. By someone you trusted.', emotion: 'sad' },
  ], nextSceneId: 'processing' },
  { id: 'processing', backgroundId: 'apartment', dialog: [
    { speakerId: null, text: 'Your hands shake. Rage. Hurt. Disbelief.', emotion: 'neutral' },
    { speakerId: 'inner-voice', text: 'Take a breath. React or respond. Choose.', emotion: 'knowing' },
  ], choices: [
    { id: 'pause', text: 'Take time to process before acting', nextSceneId: 'clarity', feedback: 'Wisdom. Emotion clouds judgment.', isOptimal: true },
    { id: 'confront-now', text: 'Find Blake immediately', nextSceneId: 'hot-confrontation', feedback: 'Anger-driven confrontation rarely ends well.' },
  ]},
  { id: 'hot-confrontation', backgroundId: 'restaurant', dialog: [
    { speakerId: null, text: 'You find Blake. Your voice louder than intended.', emotion: 'neutral' },
    { speakerId: 'blake', text: '"I can explain—"', emotion: 'pleading' },
    { speakerId: null, text: 'Heads turn. Harrison watches from across the room.', emotion: 'neutral' },
    { speakerId: 'inner-voice', text: 'Public scene. Exactly what Harrison wanted.', emotion: 'concerned' },
  ], nextSceneId: 'ending-lost-control' },
  { id: 'clarity', backgroundId: 'apartment', dialog: [
    { speakerId: null, text: 'Think. Why would Blake do this? Who benefits?', emotion: 'neutral' },
    { speakerId: 'inner-voice', text: 'Harrison orchestrated this. Blake was just the tool.', emotion: 'knowing' },
  ], nextSceneId: 'harrison-appears' },
  { id: 'harrison-appears', backgroundId: 'restaurant', dialog: [
    { speakerId: 'harrison', text: '"You\'ve seen the email."', emotion: 'neutral' },
    { speakerId: null, text: 'Not a question. He knows everything.', emotion: 'neutral' },
    { speakerId: 'harrison', text: '"Now the interesting part. What will you do about it?"', emotion: 'cold' },
    { speakerId: 'inner-voice', text: 'A test. He wants to see what you\'re made of.', emotion: 'knowing' },
  ], choices: [
    { id: 'see-game', text: '"You set this up. I\'m more interested in why."', nextSceneId: 'harrison-impressed', feedback: 'Seeing the game, not just the pieces.', isOptimal: true },
    { id: 'demand-blake', text: '"I want Blake ruined."', nextSceneId: 'harrison-notes-darkness', feedback: 'Darkness. He\'ll use that.' },
    { id: 'forgive-publicly', text: '"Blake made a mistake. I\'ll handle it privately."', nextSceneId: 'harrison-disappointed', feedback: 'Mercy reads as weakness to him.' },
  ]},
  { id: 'harrison-impressed', backgroundId: 'restaurant', dialog: [
    { speakerId: 'harrison', text: '"Most people see the betrayal. You see the architecture."', emotion: 'smirking' },
    { speakerId: 'harrison', text: '"That\'s rare. I test everyone. Most fail immediately."', emotion: 'neutral' },
  ], nextSceneId: 'blake-moment' },
  { id: 'harrison-notes-darkness', backgroundId: 'restaurant', dialog: [
    { speakerId: 'harrison', text: '"Good. Ruthlessness has its uses."', emotion: 'cold' },
    { speakerId: null, text: 'Something changes in his eyes. Approval? Or recognition?', emotion: 'neutral' },
    { speakerId: 'inner-voice', text: 'He sees someone like himself. Is that what you want?', emotion: 'concerned' },
  ], nextSceneId: 'blake-destroyed-path' },
  { id: 'harrison-disappointed', backgroundId: 'restaurant', dialog: [
    { speakerId: 'harrison', text: '"Hmm. Forgiveness."', emotion: 'cold' },
    { speakerId: null, text: 'He turns away. Interest fading.', emotion: 'neutral' },
    { speakerId: 'inner-voice', text: 'You kept your soul. Lost his interest. Trade-off.', emotion: 'sad' },
  ], nextSceneId: 'ending-mercy-cost' },
  { id: 'blake-destroyed-path', backgroundId: 'restaurant', dialog: [
    { speakerId: null, text: 'Harrison makes a call. Within hours, Blake is done.', emotion: 'neutral' },
    { speakerId: null, text: 'Funding pulled. Connections severed. Reputation ash.', emotion: 'neutral' },
    { speakerId: 'inner-voice', text: 'You destroyed a friend. For what?', emotion: 'sad' },
  ], nextSceneId: 'ending-became-them' },
  { id: 'blake-moment', backgroundId: 'park', dialog: [
    { speakerId: 'blake', text: '"I\'m sorry. He had leverage on me. My family\'s business—"', emotion: 'pleading' },
    { speakerId: 'blake', text: '"I know it doesn\'t matter. But I didn\'t want to."', emotion: 'sad' },
    { speakerId: 'inner-voice', text: 'He was used. Like you could have been.', emotion: 'knowing' },
  ], choices: [
    { id: 'strategic-forgive', text: '"I understand. We both learned something."', nextSceneId: 'alliance-formed', feedback: 'Turn a pawn into an ally.', isOptimal: true },
    { id: 'cold-cut', text: '"We\'re done. Don\'t speak to me again."', nextSceneId: 'blake-cut', feedback: 'Clean but costly. One less ally.' },
    { id: 'use-leverage', text: '"Now you owe me. I\'ll collect."', nextSceneId: 'ending-became-harrison', feedback: 'You\'ve become what you were fighting.' },
  ]},
  { id: 'alliance-formed', backgroundId: 'park', dialog: [
    { speakerId: 'blake', text: '"You\'re... forgiving me?"', emotion: 'confused' },
    { speakerId: null, text: 'Strategic forgiveness. Not weakness. Wisdom.', emotion: 'neutral' },
    { speakerId: 'inner-voice', text: 'He\'ll be loyal now. Harrison didn\'t expect this.', emotion: 'hopeful' },
  ], nextSceneId: 'kai-finds-you' },
  { id: 'blake-cut', backgroundId: 'park', dialog: [
    { speakerId: 'blake', text: '"I understand."', emotion: 'sad' },
    { speakerId: null, text: 'He walks away. Another connection severed.', emotion: 'neutral' },
  ], nextSceneId: 'kai-finds-you' },
  { id: 'kai-finds-you', backgroundId: 'park', dialog: [
    { speakerId: 'kai', text: '"I heard what happened. Are you okay?"', emotion: 'concerned' },
    { speakerId: null, text: 'Kai. Your original sponsor. Genuine concern in her eyes.', emotion: 'neutral' },
    { speakerId: 'kai', text: '"Harrison does this. Tests people. Breaks them."', emotion: 'angry' },
    { speakerId: 'inner-voice', text: 'She\'s warning you. About the path you\'re on.', emotion: 'knowing' },
  ], choices: [
    { id: 'appreciate-kai', text: '"Thanks for checking. I\'m processing."', nextSceneId: 'ending-humanity-intact', feedback: 'Keeping authentic connections.', isOptimal: true },
    { id: 'brush-off', text: '"I\'m fine. It\'s just business."', nextSceneId: 'kai-worried', feedback: 'She sees you changing. Worries.' },
  ]},
  { id: 'kai-worried', backgroundId: 'park', dialog: [
    { speakerId: 'kai', text: '"Don\'t lose yourself here. It\'s not worth it."', emotion: 'sad' },
    { speakerId: null, text: 'She touches your arm. Then leaves.', emotion: 'neutral' },
  ], nextSceneId: 'ending-humanity-intact' },
];
