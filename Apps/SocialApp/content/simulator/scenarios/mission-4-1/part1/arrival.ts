import type { ForkScene } from '../../../types';
export const arrivalScenes: ForkScene[] = [
  { id: 'jet-landing', backgroundId: 'park', mood: 'professional', dialog: [
    { speakerId: null, text: 'The private jet touches down. Crystal water. Private island. Real power.', emotion: 'neutral' },
    { speakerId: null, text: 'Other guests assess you as you disembark. You assess them.', emotion: 'neutral' },
    { speakerId: 'inner-voice', text: 'Every look is evaluation. Carry yourself accordingly.', emotion: 'knowing' },
  ], nextSceneId: 'first-contacts' },
  { id: 'first-contacts', backgroundId: 'restaurant', dialog: [
    { speakerId: 'victor', text: '"Ah. Kai\'s brought someone. How... resourceful of her."', emotion: 'cold' },
    { speakerId: null, text: 'His handshake lasts exactly one second. Eyes already past you.', emotion: 'neutral' },
    { speakerId: 'inner-voice', text: '"Someone." Not a name. Not a guest. Just... someone Kai brought.', emotion: 'knowing' },
  ], choices: [
    { id: 'confident-victor', text: '"Thank you. Kai speaks highly of this gathering."', nextSceneId: 'victor-notes', feedback: 'Confident without trying to prove.', isOptimal: true },
    { id: 'overcompensate', text: 'Try to impress him with what you know', nextSceneId: 'victor-dismisses', feedback: 'TRAP: Trying too hard confirms his bias.' },
  ]},
  { id: 'victor-notes', backgroundId: 'restaurant', dialog: [
    { speakerId: 'victor', text: '"Does she. I\'m sure she has her reasons."', emotion: 'neutral' },
    { speakerId: null, text: 'A micro-nod. You exist now. That\'s something.', emotion: 'neutral' },
    { speakerId: 'inner-voice', text: 'Acknowledgment without approval. Old money baseline.', emotion: 'knowing' },
  ], nextSceneId: 'dominic-approach' },
  { id: 'victor-dismisses', backgroundId: 'restaurant', dialog: [
    { speakerId: 'victor', text: '"How... enthusiastic."', emotion: 'smirking' },
    { speakerId: null, text: 'He turns to someone else. You\'ve been categorized. Not favorably.', emotion: 'neutral' },
    { speakerId: 'inner-voice', text: 'Marked as eager. That\'s a label that sticks.', emotion: 'sad' },
  ], nextSceneId: 'dominic-approach' },
  { id: 'dominic-approach', backgroundId: 'restaurant', dialog: [
    { speakerId: 'dominic', text: '"New face. What do you bring to the table?"', emotion: 'neutral' },
    { speakerId: null, text: 'Dominic is direct. Transactional. No pretense.', emotion: 'neutral' },
    { speakerId: 'inner-voice', text: 'He wants to know your value. Be honest about what you offer.', emotion: 'knowing' },
  ], choices: [
    { id: 'honest-value', text: '"Fresh perspective. Connections Kai trusts."', nextSceneId: 'dominic-accepts', feedback: 'Clear. Modest but not weak.', isOptimal: true },
    { id: 'oversell', text: '"I can open doors others can\'t."', nextSceneId: 'dominic-skeptical', feedback: 'Claims need proof. You have none yet.' },
  ]},
  { id: 'dominic-accepts', backgroundId: 'restaurant', dialog: [
    { speakerId: 'dominic', text: '"Fair enough. We\'ll see."', emotion: 'neutral' },
    { speakerId: null, text: 'He moves on. Not impressed, not dismissive. Waiting to see.', emotion: 'neutral' },
  ], nextSceneId: 'isabelle-charm' },
  { id: 'dominic-skeptical', backgroundId: 'restaurant', dialog: [
    { speakerId: 'dominic', text: '"Big promises. I\'ll hold you to that."', emotion: 'cold' },
    { speakerId: 'inner-voice', text: 'Now you\'re on a hook. Better deliver.', emotion: 'concerned' },
  ], nextSceneId: 'isabelle-charm' },
  { id: 'isabelle-charm', backgroundId: 'restaurant', dialog: [
    { speakerId: 'isabelle', text: '"Ignore them. They\'re always testing."', emotion: 'seductive' },
    { speakerId: 'isabelle', text: '"I find the new blood much more... interesting."', emotion: 'seductive' },
    { speakerId: 'inner-voice', text: 'Careful. Isabelle is dangerous. The charm is a tool.', emotion: 'concerned' },
  ], choices: [
    { id: 'guarded-polite', text: '"Thanks. Still finding my footing."', nextSceneId: 'isabelle-intrigued', feedback: 'Polite. Not falling into her frame.', isOptimal: true },
    { id: 'charmed', text: '"Interesting how?"', nextSceneId: 'isabelle-hooks', feedback: 'You\'re playing her game now.' },
  ]},
  { id: 'isabelle-intrigued', backgroundId: 'restaurant', dialog: [
    { speakerId: 'isabelle', text: '"Cautious. I like that."', emotion: 'knowing' },
    { speakerId: 'isabelle', text: '"We\'ll talk more at dinner."', emotion: 'neutral' },
    { speakerId: 'inner-voice', text: 'She\'s noted your resistance. Good sign.', emotion: 'hopeful' },
  ], nextSceneId: 'ending-arrived' },
  { id: 'isabelle-hooks', backgroundId: 'restaurant', dialog: [
    { speakerId: 'isabelle', text: '"You have a... rawness. It\'s refreshing."', emotion: 'seductive' },
    { speakerId: null, text: 'Her hand lingers on your arm. Calculated intimacy.', emotion: 'neutral' },
    { speakerId: 'inner-voice', text: 'She\'s establishing ownership. You\'re becoming hers.', emotion: 'concerned' },
  ], nextSceneId: 'ending-claimed' },
];
