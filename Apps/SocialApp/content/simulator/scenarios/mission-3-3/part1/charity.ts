import type { ForkScene } from '../../../types';
export const charityScenes: ForkScene[] = [
  { id: 'charity-arrival', backgroundId: 'restaurant', mood: 'professional', dialog: [
    { speakerId: null, text: 'The charity gala gleams. Victoria holds court at the center.', emotion: 'neutral' },
    { speakerId: null, text: 'She spots you immediately. Smiles. Approaches.', emotion: 'neutral' },
    { speakerId: 'inner-voice', text: 'Here we go. Stay calm. Don\'t challenge. Don\'t grovel.', emotion: 'concerned' },
  ], nextSceneId: 'victoria-greet' },
  { id: 'victoria-greet', backgroundId: 'restaurant', dialog: [
    { speakerId: 'victoria', text: '"Oh, you made it! Kai\'s little project. How delightful."', emotion: 'happy' },
    { speakerId: 'victoria', text: '"Let me introduce you to everyone. I insist."', emotion: 'seductive' },
    { speakerId: 'inner-voice', text: 'She\'s framing you as Kai\'s pet. Strategic diminishment.', emotion: 'knowing' },
  ], choices: [
    { id: 'accept-intro', text: '"That\'s kind of you"', nextSceneId: 'victoria-parade', feedback: 'Playing along. See where it leads.' },
    { id: 'gentle-counter', text: '"Actually, I was hoping to thank you for hosting"', nextSceneId: 'victoria-surprised', feedback: 'Redirect to flattery. Clever.', isOptimal: true },
  ]},
  { id: 'victoria-surprised', backgroundId: 'restaurant', dialog: [
    { speakerId: 'victoria', text: '"Thank me? How... gracious."', emotion: 'confused' },
    { speakerId: null, text: 'She wasn\'t expecting deference. It throws her off slightly.', emotion: 'neutral' },
    { speakerId: 'victoria', text: '"Well. Welcome to my event."', emotion: 'neutral' },
  ], nextSceneId: 'millicent-approach' },
  { id: 'victoria-parade', backgroundId: 'restaurant', dialog: [
    { speakerId: 'victoria', text: '"Everyone, this is Kai\'s newest... acquisition."', emotion: 'smirking' },
    { speakerId: null, text: 'Polite laughter. You\'re being presented as a curiosity.', emotion: 'neutral' },
    { speakerId: 'inner-voice', text: 'She\'s marking territory. Making you smaller.', emotion: 'concerned' },
  ], choices: [
    { id: 'endure', text: 'Smile and endure it', nextSceneId: 'millicent-approach', feedback: 'Pick your battles.' },
    { id: 'pushback', text: '"I prefer \'guest\' actually"', nextSceneId: 'victoria-edge', feedback: 'Risky. But has self-respect.' },
  ]},
  { id: 'victoria-edge', backgroundId: 'restaurant', dialog: [
    { speakerId: 'victoria', text: '"Guest."', emotion: 'cold' },
    { speakerId: null, text: 'She blinks. Then the smile hardens.', emotion: 'neutral' },
    { speakerId: 'victoria', text: '"After I went out of my way to make you feel welcome. That\'s... hurtful, honestly."', emotion: 'sad' },
    { speakerId: 'victoria', text: '"But fine. Guest. I\'ll remember that."', emotion: 'cold' },
    { speakerId: 'inner-voice', text: 'She flipped it. YOU hurt HER by asking for basic respect.', emotion: 'angry' },
  ], nextSceneId: 'millicent-approach' },
  { id: 'millicent-approach', backgroundId: 'restaurant', dialog: [
    { speakerId: 'millicent', text: '"Victoria\'s being Victoria, I see."', emotion: 'knowing' },
    { speakerId: null, text: 'An older woman appears beside you. Millicent Caldwell. Maris\'s aunt.', emotion: 'neutral' },
    { speakerId: 'millicent', text: '"Let me show you the actual interesting people here."', emotion: 'neutral' },
    { speakerId: 'inner-voice', text: 'Millicent is offering cover. But is she safe?', emotion: 'curious' },
  ], choices: [
    { id: 'go-millicent', text: 'Go with Millicent', nextSceneId: 'millicent-guidance', feedback: 'Victoria\'s rival might be an ally.', isOptimal: true },
    { id: 'stay-victoria', text: 'Stay in Victoria\'s orbit', nextSceneId: 'victoria-tests', feedback: 'Playing it safe. Or trapped?' },
    { id: 'spot-maris', text: 'Wait—is that Maris across the room?', nextSceneId: 'maris-intercept', feedback: 'Your sponsor is here. Coincidence?' },
  ]},
  { id: 'maris-intercept', backgroundId: 'restaurant', dialog: [
    { speakerId: 'maris', text: '"There you are. I was wondering when you\'d notice me."', emotion: 'knowing' },
    { speakerId: null, text: 'She appears silently. Her smile doesn\'t reach her eyes.', emotion: 'neutral' },
    { speakerId: 'maris', text: '"Victoria\'s being territorial? I can help. I know exactly what she responds to."', emotion: 'seductive' },
    { speakerId: 'inner-voice', text: 'Maris offering to help with Victoria. That feels... convenient.', emotion: 'concerned' },
  ], choices: [
    { id: 'take-advice', text: '"What should I do?"', nextSceneId: 'maris-bad-intel', feedback: 'Trusting Maris. Bold move.' },
    { id: 'decline-politely', text: '"I think I\'ve got it handled"', nextSceneId: 'maris-disappointed', feedback: 'Declining your sponsor\'s help. Risky.', isOptimal: true },
  ]},
  { id: 'maris-bad-intel', backgroundId: 'restaurant', dialog: [
    { speakerId: 'maris', text: '"Victoria hates being ignored. So make her feel seen. Compliment her event specifically."', emotion: 'knowing' },
    { speakerId: 'maris', text: '"Say the decorations remind you of her mother\'s famous galas. She loves that."', emotion: 'seductive' },
    { speakerId: 'inner-voice', text: 'Something feels off. But Maris knows these people...', emotion: 'concerned' },
  ], nextSceneId: 'maris-trap-executed' },
  { id: 'maris-trap-executed', backgroundId: 'restaurant', dialog: [
    { speakerId: null, text: 'You approach Victoria. Use the line about her mother\'s galas.', emotion: 'neutral' },
    { speakerId: 'victoria', text: '"My mother? Who told you to say that?"', emotion: 'cold' },
    { speakerId: null, text: 'Ice. Pure ice. Victoria\'s mother disowned her at 22. You just touched the wound.', emotion: 'neutral' },
    { speakerId: 'inner-voice', text: 'Maris knew. She gave you the worst possible thing to say.', emotion: 'angry' },
  ], nextSceneId: 'ending-maris-sabotaged' },
  { id: 'maris-disappointed', backgroundId: 'restaurant', dialog: [
    { speakerId: 'maris', text: '"Handled. Sure."', emotion: 'cold' },
    { speakerId: null, text: 'Something flickers behind her eyes. Displeasure. Then gone.', emotion: 'neutral' },
    { speakerId: 'maris', text: '"I\'ll be watching then. Good luck."', emotion: 'knowing' },
    { speakerId: 'inner-voice', text: 'You just declined her "help." She\'ll remember that.', emotion: 'concerned' },
  ], nextSceneId: 'millicent-guidance' },
  { id: 'millicent-guidance', backgroundId: 'restaurant', dialog: [
    { speakerId: 'millicent', text: '"Victoria sees everyone as competition or tool. You\'re neither to me."', emotion: 'serious' },
    { speakerId: 'millicent', text: '"I\'m telling you this because Maris mentioned you. She rarely mentions anyone."', emotion: 'knowing' },
    { speakerId: 'inner-voice', text: 'Genuine intel. Millicent might be an actual ally.', emotion: 'hopeful' },
  ], nextSceneId: 'ending-ally' },
  { id: 'victoria-tests', backgroundId: 'restaurant', dialog: [
    { speakerId: 'victoria', text: '"So tell me. What do you think of Kai? Honestly."', emotion: 'curious' },
    { speakerId: 'inner-voice', text: 'Test. Anything you say can be weaponized.', emotion: 'concerned' },
  ], choices: [
    { id: 'praise-kai', text: '"Kai has been incredibly generous"', nextSceneId: 'victoria-uses', feedback: 'She\'ll tell Kai you called her generous. Sounds minor. Isn\'t.' },
    { id: 'deflect', text: '"I\'m still getting to know everyone here"', nextSceneId: 'ending-neutral', feedback: 'Give nothing. Safe.', isOptimal: true },
  ]},
  { id: 'victoria-uses', backgroundId: 'restaurant', dialog: [
    { speakerId: 'victoria', text: '"Generous! How interesting. I\'ll be sure to tell her you said that."', emotion: 'smirking' },
    { speakerId: null, text: 'You start to clarify—', emotion: 'neutral' },
    { speakerId: 'victoria', text: '"No, no, don\'t backtrack! I\'m just so happy you feel comfortable enough to be honest. That\'s what I\'ve always encouraged."', emotion: 'happy' },
    { speakerId: 'inner-voice', text: 'She\'ll tell Kai you called her charity case. And somehow she\'ll be the caring friend who "had to tell her."', emotion: 'angry' },
  ], nextSceneId: 'ending-used' },
];
