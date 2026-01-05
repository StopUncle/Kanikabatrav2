import type { ForkScene } from '../../../types';
export const testScenes: ForkScene[] = [
  { id: 'harrison-summons', backgroundId: 'office', mood: 'professional', dialog: [
    { speakerId: null, text: 'His office is minimalist. Expensive. Every object chosen deliberately.', emotion: 'neutral' },
    { speakerId: 'harrison', text: '"Sit. Tell me why you\'re here."', emotion: 'neutral' },
    { speakerId: 'inner-voice', text: 'Simple question. Loaded with tests. Be careful.', emotion: 'concerned' },
  ], choices: [
    { id: 'honest-answer', text: '"Kai invited me into this world. I want to see where it leads."', nextSceneId: 'harrison-probes', feedback: 'Honest. Measured. Good start.', isOptimal: true },
    { id: 'ambitious-answer', text: '"I want power and access"', nextSceneId: 'harrison-skeptical', feedback: 'Too eager. He\'ll see through it.' },
    { id: 'humble-answer', text: '"I\'m just learning"', nextSceneId: 'harrison-bored', feedback: 'Too weak. He wants substance.' },
  ]},
  { id: 'harrison-probes', backgroundId: 'office', dialog: [
    { speakerId: 'harrison', text: '"Where it leads. Interesting phrasing."', emotion: 'knowing' },
    { speakerId: 'harrison', text: '"What did you think of Victoria\'s event?"', emotion: 'neutral' },
    { speakerId: 'inner-voice', text: 'He\'s checking if you\'ll talk badly about Victoria to him. Test.', emotion: 'knowing' },
  ], choices: [
    { id: 'neutral-victoria', text: '"Elegant event. She knows how to host."', nextSceneId: 'harrison-approves', feedback: 'Diplomatic. No ammunition given.', isOptimal: true },
    { id: 'honest-victoria', text: '"Victoria tried to use me. I navigated it."', nextSceneId: 'harrison-interested', feedback: 'Honest but risky. He knows Victoria.' },
  ]},
  { id: 'harrison-skeptical', backgroundId: 'office', dialog: [
    { speakerId: 'harrison', text: '"Power and access. Everyone wants that."', emotion: 'cold' },
    { speakerId: 'harrison', text: '"What makes you different from the hundred others who wanted the same?"', emotion: 'neutral' },
    { speakerId: 'inner-voice', text: 'He\'s not impressed. Recover.', emotion: 'concerned' },
  ], choices: [
    { id: 'recover', text: '"Nothing yet. I\'m here to prove it."', nextSceneId: 'harrison-probes', feedback: 'Humble recovery. Might work.' },
    { id: 'double-down', text: '"I see things others miss"', nextSceneId: 'harrison-dismisses', feedback: 'TRAP: Claims without proof.' },
  ]},
  { id: 'harrison-bored', backgroundId: 'office', dialog: [
    { speakerId: 'harrison', text: '"Just learning. Safe answer."', emotion: 'cold' },
    { speakerId: 'harrison', text: '"I don\'t invest in safe people."', emotion: 'neutral' },
    { speakerId: 'inner-voice', text: 'Lost his interest. Hard to recover now.', emotion: 'sad' },
  ], nextSceneId: 'ending-dismissed' },
  { id: 'harrison-approves', backgroundId: 'office', dialog: [
    { speakerId: 'harrison', text: '"Diplomatic. Not naive. You know Victoria can be... challenging."', emotion: 'knowing' },
    { speakerId: 'harrison', text: '"One more question. Kai—is she stable right now?"', emotion: 'serious' },
    { speakerId: 'inner-voice', text: 'He\'s asking about Kai\'s mental state. Protect her or be honest?', emotion: 'concerned' },
  ], choices: [
    { id: 'protect-kai', text: '"Kai is managing. That\'s between me and her."', nextSceneId: 'harrison-respects', feedback: 'Loyalty. He respects that.', isOptimal: true },
    { id: 'honest-kai', text: '"She had a rough week. Victoria triggered her."', nextSceneId: 'harrison-notes', feedback: 'Honest but you just gave him intel on your sponsor.' },
  ]},
  { id: 'harrison-interested', backgroundId: 'office', dialog: [
    { speakerId: 'harrison', text: '"Navigated. How exactly?"', emotion: 'curious' },
    { speakerId: 'inner-voice', text: 'He wants details. Give enough to show competence, not too much.', emotion: 'knowing' },
  ], choices: [
    { id: 'brief', text: '"Stayed neutral. Didn\'t give her ammunition."', nextSceneId: 'harrison-respects', feedback: 'Brief. Professional.', isOptimal: true },
    { id: 'detailed', text: 'Tell him the whole story', nextSceneId: 'harrison-notes', feedback: 'Too much. He\'s storing it all.' },
  ]},
  { id: 'harrison-respects', backgroundId: 'office', dialog: [
    { speakerId: 'harrison', text: '"You protect your people. Don\'t overshare. Navigate without drama."', emotion: 'knowing' },
    { speakerId: 'harrison', text: '"That\'s rare. Kai chose well."', emotion: 'neutral' },
    { speakerId: 'inner-voice', text: 'He\'s satisfied. You passed.', emotion: 'hopeful' },
  ], nextSceneId: 'maris-trap-question' },
  { id: 'maris-trap-question', backgroundId: 'office', dialog: [
    { speakerId: null, text: 'A door opens behind you. Maris enters silently.', emotion: 'neutral' },
    { speakerId: 'maris', text: '"One more thing, Harrison. May I?"', emotion: 'knowing' },
    { speakerId: 'harrison', text: '"Go ahead."', emotion: 'neutral' },
    { speakerId: 'maris', text: '"Last week. Kai had a... difficult moment. Tell me—who do you think caused it?"', emotion: 'seductive' },
    { speakerId: 'inner-voice', text: 'She\'s asking if you know she triggered Kai. This is a trap.', emotion: 'concerned' },
  ], choices: [
    { id: 'blame-victoria', text: '"Victoria, obviously"', nextSceneId: 'maris-pleased', feedback: 'The safe answer. She\'s off the hook.' },
    { id: 'say-nothing', text: '"I wasn\'t there for the whole thing"', nextSceneId: 'maris-accepts', feedback: 'Neutral. Gives nothing away.', isOptimal: true },
    { id: 'accuse-maris', text: '"Someone forwarded Victoria\'s words to Kai. Interesting timing."', nextSceneId: 'maris-caught', feedback: 'You just accused your sponsor in front of Harrison.' },
  ]},
  { id: 'maris-pleased', backgroundId: 'office', dialog: [
    { speakerId: 'maris', text: '"Victoria. Yes. Obviously."', emotion: 'happy' },
    { speakerId: null, text: 'Her smile sharpens. You gave her exactly what she wanted.', emotion: 'neutral' },
    { speakerId: 'inner-voice', text: 'She\'s satisfied. You protected her lie. Was that smart or stupid?', emotion: 'concerned' },
  ], nextSceneId: 'ending-passed' },
  { id: 'maris-accepts', backgroundId: 'office', dialog: [
    { speakerId: 'maris', text: '"Mm. Careful answer."', emotion: 'knowing' },
    { speakerId: 'harrison', text: '"Discretion. I approve."', emotion: 'neutral' },
    { speakerId: 'inner-voice', text: 'You gave nothing. She can\'t tell if you know. Good.', emotion: 'knowing' },
  ], nextSceneId: 'ending-passed' },
  { id: 'maris-caught', backgroundId: 'office', dialog: [
    { speakerId: null, text: 'The room freezes. Maris\'s eyes go flat. Cold.', emotion: 'neutral' },
    { speakerId: 'maris', text: '"Interesting timing. What exactly are you implying?"', emotion: 'cold' },
    { speakerId: 'harrison', text: '"This just got interesting."', emotion: 'knowing' },
    { speakerId: 'inner-voice', text: 'You just made an accusation you can\'t prove. In front of Harrison.', emotion: 'concerned' },
  ], choices: [
    { id: 'stand-ground', text: '"Just an observation"', nextSceneId: 'maris-enemy', feedback: 'You held your ground. She\'s now your enemy.' },
    { id: 'backpedal', text: '"I didn\'t mean anything by it"', nextSceneId: 'maris-contempt', feedback: 'TRAP: You accused then retreated. Weak.' },
  ]},
  { id: 'maris-enemy', backgroundId: 'office', dialog: [
    { speakerId: 'maris', text: '"An observation. I see."', emotion: 'cold' },
    { speakerId: null, text: 'She turns to Harrison, ignoring you completely now.', emotion: 'neutral' },
    { speakerId: 'maris', text: '"Interesting protégé. Very... observant."', emotion: 'knowing' },
    { speakerId: 'inner-voice', text: 'You just made a powerful enemy. But at least you didn\'t lie.', emotion: 'concerned' },
  ], nextSceneId: 'ending-maris-enemy' },
  { id: 'maris-contempt', backgroundId: 'office', dialog: [
    { speakerId: 'maris', text: '"Didn\'t mean anything. How reassuring."', emotion: 'smirking' },
    { speakerId: null, text: 'Contempt flickers across her face. Harrison watches, evaluating.', emotion: 'neutral' },
    { speakerId: 'inner-voice', text: 'You accused then crumbled. That was worse than silence.', emotion: 'sad' },
  ], nextSceneId: 'ending-maris-contempt' },
  { id: 'harrison-notes', backgroundId: 'office', dialog: [
    { speakerId: null, text: 'He makes a mental note. You can see him filing information.', emotion: 'neutral' },
    { speakerId: 'harrison', text: '"Thank you for your honesty. We\'ll be in touch."', emotion: 'neutral' },
    { speakerId: 'inner-voice', text: 'You gave too much. He now has leverage.', emotion: 'concerned' },
  ], nextSceneId: 'ending-leveraged' },
  { id: 'harrison-dismisses', backgroundId: 'office', dialog: [
    { speakerId: 'harrison', text: '"See things others miss. Bold claim."', emotion: 'cold' },
    { speakerId: 'harrison', text: '"I\'ll watch from a distance. Prove it."', emotion: 'neutral' },
    { speakerId: 'inner-voice', text: 'Conditional pass at best. He\'s not sold.', emotion: 'concerned' },
  ], nextSceneId: 'ending-probation' },
];
