import type { ForkScene } from '../../../types';
export const exScenes: ForkScene[] = [
  { id: 'party-shock', backgroundId: 'bar', mood: 'tense', dialog: [
    { speakerId: null, text: 'You see him across the room. Marcus. Your stomach drops.', emotion: 'neutral' },
    { speakerId: null, text: 'He\'s with someone. Laughing. Looking good. Then he sees you.', emotion: 'neutral' },
    { speakerId: 'inner-voice', text: 'Breathe. You\'ve healed. You\'ve grown. This is just a test.', emotion: 'concerned' },
  ], choices: [
    { id: 'leave-party', text: 'Leave before things get complicated', nextSceneId: 'leaving-attempt', feedback: 'Strategic retreat. Valid choice.' },
    { id: 'stay-strong', text: 'Stay. Show him you\'re fine.', nextSceneId: 'marcus-approach', feedback: 'Stand your ground. But stay regulated.', isOptimal: true },
  ]},
  { id: 'leaving-attempt', backgroundId: 'bar', dialog: [
    { speakerId: null, text: 'You turn toward the exit. But he\'s already walking over.', emotion: 'neutral' },
    { speakerId: 'marcus-ex', text: '"Leaving so soon? We haven\'t even said hi."', emotion: 'smirking' },
    { speakerId: 'inner-voice', text: 'He noticed your retreat. Now he\'s interested.', emotion: 'concerned' },
  ], nextSceneId: 'marcus-convo' },
  { id: 'marcus-approach', backgroundId: 'bar', dialog: [
    { speakerId: 'marcus-ex', text: '"Hey stranger."', emotion: 'neutral' },
    { speakerId: null, text: 'His eyes find yours. That familiar pull.', emotion: 'neutral' },
    { speakerId: 'inner-voice', text: 'Match his energy. Don\'t give more than he does.', emotion: 'knowing' },
  ], nextSceneId: 'marcus-convo' },
  { id: 'marcus-convo', backgroundId: 'bar', dialog: [
    { speakerId: 'marcus-ex', text: '"You look good. Really good."', emotion: 'seductive' },
    { speakerId: 'marcus-ex', text: '"I\'ve been thinking about you. Maybe we should talk."', emotion: 'neutral' },
    { speakerId: 'inner-voice', text: 'When you were together, he never wanted to talk. Now he does?', emotion: 'knowing' },
  ], choices: [
    { id: 'chase', text: '"Really? I\'d like that"', nextSceneId: 'marcus-retreats', feedback: 'TRAP: You just showed your hand. He\'ll withdraw.', isOptimal: false },
    { id: 'mirror', text: '"Maybe. I\'m pretty busy these days."', nextSceneId: 'marcus-pursues', feedback: 'Mirror his energy. Don\'t over-invest.', isOptimal: true },
    { id: 'cold', text: '"We had our chance, Marcus."', nextSceneId: 'marcus-intrigued', feedback: 'Closure statement. He might push harder.' },
  ]},
  { id: 'marcus-retreats', backgroundId: 'bar', dialog: [
    { speakerId: 'marcus-ex', text: '"Oh. Cool. Well, maybe some other time."', emotion: 'cold' },
    { speakerId: null, text: 'And just like that, his attention shifts. The pull vanishes.', emotion: 'neutral' },
    { speakerId: 'inner-voice', text: 'You reached out. He pulled back. Same song, same ending.', emotion: 'sad' },
  ], nextSceneId: 'ending-chased' },
  { id: 'marcus-pursues', backgroundId: 'bar', dialog: [
    { speakerId: 'marcus-ex', text: '"Busy? That\'s new. What are you up to?"', emotion: 'curious' },
    { speakerId: null, text: 'Your indifference makes him lean in. There it is.', emotion: 'neutral' },
    { speakerId: 'inner-voice', text: 'Funny how that works. You stopped chasing. Now he\'s leaning in.', emotion: 'knowing' },
  ], choices: [
    { id: 'engage', text: 'Tell him about your life', nextSceneId: 'marcus-loses-interest', feedback: 'Giving him what he wants kills his interest.' },
    { id: 'stay-vague', text: '"This and that. You know how it is."', nextSceneId: 'ending-power', feedback: 'Keep the mystery. Maintain the position.', isOptimal: true },
  ]},
  { id: 'marcus-intrigued', backgroundId: 'bar', dialog: [
    { speakerId: 'marcus-ex', text: '"Had our chance? You\'ve changed."', emotion: 'smirking' },
    { speakerId: 'marcus-ex', text: '"I like it. The old you would have..."', emotion: 'neutral' },
    { speakerId: 'inner-voice', text: 'He\'s comparing. Measuring. Trying to find an opening.', emotion: 'knowing' },
  ], choices: [
    { id: 'dont-engage', text: '"The old me is gone. Nice seeing you, Marcus."', nextSceneId: 'ending-closure', feedback: 'Clean exit. He\'ll remember this.', isOptimal: true },
    { id: 'linger', text: 'Stay and see where this goes', nextSceneId: 'marcus-pulls', feedback: 'Curiosity can be a trap.' },
  ]},
  { id: 'marcus-loses-interest', backgroundId: 'bar', dialog: [
    { speakerId: null, text: 'You talk. He listens. Then something shifts.', emotion: 'neutral' },
    { speakerId: 'marcus-ex', text: '"Cool. Well, I should get back to my friends."', emotion: 'cold' },
    { speakerId: 'inner-voice', text: 'You gave him everything. He wanted the chase, not the catch.', emotion: 'sad' },
  ], nextSceneId: 'ending-pattern' },
  { id: 'marcus-pulls', backgroundId: 'bar', dialog: [
    { speakerId: 'marcus-ex', text: '"Let\'s get out of here. Just us. For old times."', emotion: 'seductive' },
    { speakerId: 'inner-voice', text: 'He\'ll take what he wants and disappear again. You know this.', emotion: 'concerned' },
  ], choices: [
    { id: 'go-with', text: 'Go with him', nextSceneId: 'ending-relapse', feedback: 'TRAP: History repeats.', isOptimal: false },
    { id: 'walk-away', text: '"I have to go. Take care, Marcus."', nextSceneId: 'ending-closure', feedback: 'Strongest choice. Walk away.', isOptimal: true },
  ]},
];
