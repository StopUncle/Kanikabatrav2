import type { ForkScene } from '../../../types';
export const dinnerScenes: ForkScene[] = [
  { id: 'approaching-dining', backgroundId: 'restaurant', mood: 'professional', dialog: [
    { speakerId: null, text: 'The dining room. Crystal. Candlelight. Unspoken rules.', emotion: 'neutral' },
    { speakerId: null, text: 'Three tables. Each a different power constellation.', emotion: 'neutral' },
    { speakerId: 'inner-voice', text: 'Where you sit defines who you are. Choose carefully.', emotion: 'knowing' },
  ], choices: [
    { id: 'wait-direction', text: 'Wait for someone to indicate seating', nextSceneId: 'harrison-seats', feedback: 'Smart. Let the power structure reveal itself.', isOptimal: true },
    { id: 'join-victor', text: 'Head toward Victor\'s table', nextSceneId: 'victor-table-wrong', feedback: 'Bold. But uninvited boldness reads as presumption.' },
    { id: 'join-isabelle', text: 'Accept Isabelle\'s beckoning smile', nextSceneId: 'isabelle-claims-dinner', feedback: 'Her territory now.' },
  ]},
  { id: 'harrison-seats', backgroundId: 'restaurant', dialog: [
    { speakerId: 'harrison', text: '"There\'s a seat at my table. If you\'re interested."', emotion: 'neutral' },
    { speakerId: null, text: 'Casual words. Not casual invitation.', emotion: 'neutral' },
  ], nextSceneId: 'harrison-table' },
  { id: 'victor-table-wrong', backgroundId: 'restaurant', dialog: [
    { speakerId: 'victor', text: '"This seat is reserved."', emotion: 'cold' },
    { speakerId: null, text: 'Eyes around the room catch the rejection.', emotion: 'neutral' },
    { speakerId: 'inner-voice', text: 'Public dismissal. Everyone noted it.', emotion: 'sad' },
  ], nextSceneId: 'ending-wrong-seat' },
  { id: 'isabelle-claims-dinner', backgroundId: 'restaurant', dialog: [
    { speakerId: 'isabelle', text: '"I saved you a seat. Right next to me."', emotion: 'seductive' },
    { speakerId: null, text: 'Her hand on your chair. Possessive.', emotion: 'neutral' },
    { speakerId: 'inner-voice', text: 'You\'re being displayed. Her acquisition.', emotion: 'concerned' },
  ], nextSceneId: 'ending-isabelle-property' },
  { id: 'harrison-table', backgroundId: 'restaurant', dialog: [
    { speakerId: null, text: 'Harrison\'s table. Three others. Serious faces.', emotion: 'neutral' },
    { speakerId: 'harrison', text: '"We were discussing expansion into new markets."', emotion: 'neutral' },
    { speakerId: 'inner-voice', text: 'A test. Does he mean business or people?', emotion: 'knowing' },
  ], choices: [
    { id: 'listen-first', text: 'Listen. Observe who speaks and when.', nextSceneId: 'reading-table', feedback: 'Wisdom. Learn the room before contributing.', isOptimal: true },
    { id: 'offer-insight', text: 'Share your perspective on expansion', nextSceneId: 'spoke-too-soon', feedback: 'Too early. You don\'t know the context yet.' },
  ]},
  { id: 'spoke-too-soon', backgroundId: 'restaurant', dialog: [
    { speakerId: null, text: 'Silence. Then someone changes the subject.', emotion: 'neutral' },
    { speakerId: 'inner-voice', text: 'Spoke before understanding. Noted as eager.', emotion: 'sad' },
  ], nextSceneId: 'victor-approaches' },
  { id: 'reading-table', backgroundId: 'restaurant', dialog: [
    { speakerId: null, text: 'The dynamic becomes clear. Harrison leads. Others orbit.', emotion: 'neutral' },
    { speakerId: 'harrison', text: '"Interesting that you listen first. Rare quality."', emotion: 'neutral' },
  ], nextSceneId: 'victor-approaches' },
  { id: 'victor-approaches', backgroundId: 'restaurant', dialog: [
    { speakerId: 'victor', text: '"Harrison, I need to borrow your guest."', emotion: 'cold' },
    { speakerId: null, text: 'Victor stands behind your chair. Power move.', emotion: 'neutral' },
    { speakerId: 'victor', text: '"Tell me about your family. Old money or... recent acquisition?"', emotion: 'smirking' },
    { speakerId: 'inner-voice', text: 'The pedigree test. He\'s looking for weakness.', emotion: 'knowing' },
  ], choices: [
    { id: 'honest-background', text: '"Self-made. Like everyone who matters."', nextSceneId: 'victor-impressed', feedback: 'Confident. Doesn\'t apologize for origins.', isOptimal: true },
    { id: 'defensive', text: '"Does it matter where someone comes from?"', nextSceneId: 'victor-blood', feedback: 'Defensive is weakness to his eyes.' },
    { id: 'fabricate', text: 'Hint at old family connections', nextSceneId: 'victor-catches', feedback: 'He knows everyone. Lies get caught.' },
  ]},
  { id: 'victor-impressed', backgroundId: 'restaurant', dialog: [
    { speakerId: 'victor', text: '"Hmm. At least you don\'t pretend."', emotion: 'neutral' },
    { speakerId: null, text: 'Not approval. But not contempt either.', emotion: 'neutral' },
  ], nextSceneId: 'main-course' },
  { id: 'victor-blood', backgroundId: 'restaurant', dialog: [
    { speakerId: 'victor', text: '"It matters to those who have it."', emotion: 'cold' },
    { speakerId: null, text: 'He walks away. Dismissed.', emotion: 'neutral' },
    { speakerId: 'inner-voice', text: 'You\'ve been categorized. Outsider.', emotion: 'sad' },
  ], nextSceneId: 'main-course' },
  { id: 'victor-catches', backgroundId: 'restaurant', dialog: [
    { speakerId: 'victor', text: '"Interesting. I know the family you mentioned. They don\'t know you."', emotion: 'smirking' },
    { speakerId: null, text: 'Laughter nearby. Word spreads fast.', emotion: 'neutral' },
  ], nextSceneId: 'ending-caught-lying' },
  { id: 'main-course', backgroundId: 'restaurant', dialog: [
    { speakerId: null, text: 'Main course arrives. Isabelle slides into the chair beside you.', emotion: 'neutral' },
    { speakerId: 'isabelle', text: '"You intrigue me. What are you really doing here?"', emotion: 'seductive' },
    { speakerId: 'inner-voice', text: 'Intelligence gathering dressed as flirtation.', emotion: 'concerned' },
  ], choices: [
    { id: 'deflect-charm', text: '"Learning. Observing. Like everyone else."', nextSceneId: 'isabelle-respects', feedback: 'Generic but safe. No ammunition given.', isOptimal: true },
    { id: 'flirt-back', text: '"Maybe I\'m here for you."', nextSceneId: 'isabelle-files', feedback: 'She stores that. Leverage for later.' },
    { id: 'too-honest', text: 'Share your actual ambitions', nextSceneId: 'isabelle-weaponizes', feedback: 'Information is currency. You just gave away value.' },
  ]},
  { id: 'isabelle-respects', backgroundId: 'restaurant', dialog: [
    { speakerId: 'isabelle', text: '"Careful one. I like that."', emotion: 'knowing' },
    { speakerId: null, text: 'She moves on. Mission incomplete for her.', emotion: 'neutral' },
  ], nextSceneId: 'maris-signal' },
  { id: 'isabelle-files', backgroundId: 'restaurant', dialog: [
    { speakerId: 'isabelle', text: '"How charming."', emotion: 'seductive' },
    { speakerId: null, text: 'She touches your hand. Claiming gesture for the room to see.', emotion: 'neutral' },
    { speakerId: 'inner-voice', text: 'Now you\'re linked to her in everyone\'s mind.', emotion: 'concerned' },
  ], nextSceneId: 'maris-signal' },
  { id: 'isabelle-weaponizes', backgroundId: 'restaurant', dialog: [
    { speakerId: 'isabelle', text: '"Such ambition. I\'ll remember that."', emotion: 'knowing' },
    { speakerId: 'inner-voice', text: 'She will. And she\'ll use it.', emotion: 'sad' },
  ], nextSceneId: 'maris-signal' },
  { id: 'maris-signal', backgroundId: 'restaurant', dialog: [
    { speakerId: null, text: 'Across the room, Maris catches your eye. Slight nod toward the terrace.', emotion: 'neutral' },
    { speakerId: 'inner-voice', text: 'Your sponsor wants a word. But leaving now is visible.', emotion: 'knowing' },
  ], choices: [
    { id: 'subtle-exit', text: 'Wait for natural break, then slip away', nextSceneId: 'maris-terrace', feedback: 'Patient. No one notices your exit.', isOptimal: true },
    { id: 'immediate', text: 'Go now while you remember', nextSceneId: 'visible-exit', feedback: 'Harrison notices. Files it away.' },
    { id: 'ignore-maris', text: 'Stay engaged at the table', nextSceneId: 'ending-missed-signal', feedback: 'She was trying to help. You missed it.' },
  ]},
  { id: 'visible-exit', backgroundId: 'restaurant', dialog: [
    { speakerId: null, text: 'Harrison\'s eyes follow you to the terrace.', emotion: 'neutral' },
    { speakerId: 'inner-voice', text: 'Noted. He\'ll wonder what was said.', emotion: 'concerned' },
  ], nextSceneId: 'maris-terrace' },
  { id: 'maris-terrace', backgroundId: 'park', dialog: [
    { speakerId: 'maris', text: '"You\'re doing well. But careful with Isabelle."', emotion: 'serious' },
    { speakerId: 'maris', text: '"She collected three people at the last gathering. None recovered."', emotion: 'cold' },
    { speakerId: 'inner-voice', text: 'A warning. From someone who knows this world.', emotion: 'knowing' },
  ], nextSceneId: 'return-to-table' },
  { id: 'return-to-table', backgroundId: 'restaurant', dialog: [
    { speakerId: null, text: 'Dessert. The conversation shifts to tomorrow\'s activities.', emotion: 'neutral' },
    { speakerId: 'harrison', text: '"There\'s a morning discussion. You should attend."', emotion: 'neutral' },
    { speakerId: 'inner-voice', text: 'An invitation. From Harrison himself. You\'re still in the game.', emotion: 'hopeful' },
  ], nextSceneId: 'ending-survived-dinner' },
];
