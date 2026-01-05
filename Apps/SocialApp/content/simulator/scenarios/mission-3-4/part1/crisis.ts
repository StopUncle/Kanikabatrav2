import type { ForkScene } from '../../../types';
export const crisisScenes: ForkScene[] = [
  { id: 'kai-call', backgroundId: 'text-screen', dialog: [
    { speakerId: null, text: 'KAI: "I need you. Now. Please."', emotion: 'neutral' },
    { speakerId: null, text: 'Three missed calls. Ten texts. Something is wrong.', emotion: 'neutral' },
    { speakerId: 'inner-voice', text: 'Kai doesn\'t ask like this. This is serious.', emotion: 'concerned' },
  ], choices: [
    { id: 'go-now', text: 'Go immediately', nextSceneId: 'kai-apartment', feedback: 'She needs someone. Be there.' },
    { id: 'call-first', text: 'Call first to assess', nextSceneId: 'kai-phone', feedback: 'Gather info before diving in.', isOptimal: true },
  ]},
  { id: 'kai-phone', backgroundId: 'apartment', dialog: [
    { speakerId: 'kai', text: '"Everyone leaves. Everyone. I thought you were different."', emotion: 'sad' },
    { speakerId: 'kai', text: '"Victoria said things. About me. About you leaving me like everyone else."', emotion: 'angry' },
    { speakerId: 'inner-voice', text: 'Victoria knew exactly where to hit. And she didn\'t hesitate.', emotion: 'knowing' },
  ], choices: [
    { id: 'reassure', text: '"I\'m not going anywhere. Tell me what happened."', nextSceneId: 'kai-calms', feedback: 'Validate feelings without overcommitting.', isOptimal: true },
    { id: 'promise-forever', text: '"I\'ll never leave you"', nextSceneId: 'kai-clings', feedback: 'TRAP: Promises you can\'t keep trap you both.' },
  ]},
  { id: 'kai-apartment', backgroundId: 'apartment', dialog: [
    { speakerId: 'kai', text: '"You came. You actually came."', emotion: 'happy' },
    { speakerId: null, text: 'Her eyes are red. The intensity is palpable.', emotion: 'neutral' },
    { speakerId: 'kai', text: '"Everyone said you\'d abandon me too. But you didn\'t."', emotion: 'hopeful' },
    { speakerId: 'inner-voice', text: 'She\'s putting you in the \'good\' category. For now.', emotion: 'concerned' },
  ], nextSceneId: 'kai-explains' },
  { id: 'kai-calms', backgroundId: 'apartment', dialog: [
    { speakerId: 'kai', text: '"Victoria cornered me. Said you were using me for access. That once you got in, you\'d drop me."', emotion: 'sad' },
    { speakerId: 'kai', text: '"She does this. I know she does. But what if she\'s right?"', emotion: 'concerned' },
    { speakerId: 'inner-voice', text: 'Victoria is deliberately destabilizing her. Using you as the weapon.', emotion: 'angry' },
  ], choices: [
    { id: 'validate-fear', text: '"Your fear makes sense. Victoria manipulates. But I\'m here."', nextSceneId: 'kai-stabilizes', feedback: 'Acknowledge the fear without feeding it.', isOptimal: true },
    { id: 'attack-victoria', text: '"Victoria is a snake. Don\'t believe anything she says."', nextSceneId: 'kai-splits', feedback: 'Now you\'re triangulating. Risky.' },
  ]},
  { id: 'kai-clings', backgroundId: 'apartment', dialog: [
    { speakerId: 'kai', text: '"Never? You promise? Say it again."', emotion: 'hopeful' },
    { speakerId: null, text: 'The intensity in her eyes is almost frightening.', emotion: 'neutral' },
    { speakerId: 'inner-voice', text: 'She\'s locking you into a promise no one can keep. You just became responsible for her stability.', emotion: 'concerned' },
  ], nextSceneId: 'ending-trapped' },
  { id: 'kai-explains', backgroundId: 'apartment', dialog: [
    { speakerId: 'kai', text: '"Victoria played me. She knew exactly what to say."', emotion: 'angry' },
    { speakerId: 'kai', text: '"I should have seen it coming. But when she mentioned you leaving..."', emotion: 'sad' },
    { speakerId: 'inner-voice', text: 'Victoria found her weak spot. "You\'ll leave." Three words. That\'s all it took.', emotion: 'knowing' },
  ], choices: [
    { id: 'be-present', text: '"I\'m here now. That\'s what matters."', nextSceneId: 'kai-stabilizes', feedback: 'Present moment, not forever promises.', isOptimal: true },
    { id: 'analyze', text: '"You need to build defenses against Victoria."', nextSceneId: 'kai-defensive', feedback: 'Logical when she needs emotional.' },
  ]},
  { id: 'kai-stabilizes', backgroundId: 'apartment', dialog: [
    { speakerId: 'kai', text: '"...Right. You\'re here. That\'s... that\'s real."', emotion: 'neutral' },
    { speakerId: null, text: 'Her breathing slows. The crisis peak passes.', emotion: 'neutral' },
    { speakerId: 'kai', text: '"Thank you. I just needed someone to not run."', emotion: 'hopeful' },
  ], nextSceneId: 'maris-reveal' },
  { id: 'maris-reveal', backgroundId: 'apartment', dialog: [
    { speakerId: null, text: 'As Kai scrolls her phone, you see a text chain. Victoria... forwarded by Maris.', emotion: 'neutral' },
    { speakerId: 'inner-voice', text: 'Wait. Maris SENT Victoria\'s words to Kai? She lit this fuse.', emotion: 'angry' },
    { speakerId: 'kai', text: '"What?"', emotion: 'confused' },
    { speakerId: null, text: 'Kai catches your expression. Looks at her phone. Then at you.', emotion: 'neutral' },
  ], choices: [
    { id: 'tell-kai', text: '"Look at who forwarded that message"', nextSceneId: 'kai-sees-truth', feedback: 'Show her the manipulation. Risky.' },
    { id: 'protect-kai', text: '"Nothing. I\'m just glad you\'re okay."', nextSceneId: 'ending-maintained', feedback: 'Protect her from more pain. She might find out later.', isOptimal: true },
  ]},
  { id: 'kai-sees-truth', backgroundId: 'apartment', dialog: [
    { speakerId: null, text: 'Kai scrolls. Stops. Her face changes.', emotion: 'neutral' },
    { speakerId: 'kai', text: '"Maris. Maris forwarded this. She knew it would..."', emotion: 'angry' },
    { speakerId: 'kai', text: '"She did this to me. On purpose."', emotion: 'sad' },
    { speakerId: 'inner-voice', text: 'Now Kai knows. The question is what she does with it.', emotion: 'concerned' },
  ], nextSceneId: 'ending-truth-revealed' },
  { id: 'kai-splits', backgroundId: 'apartment', dialog: [
    { speakerId: 'kai', text: '"So you hate her too? Good. We\'ll destroy her together."', emotion: 'angry' },
    { speakerId: 'inner-voice', text: 'You just got recruited into a war. That wasn\'t the plan.', emotion: 'concerned' },
  ], nextSceneId: 'ending-war' },
  { id: 'kai-defensive', backgroundId: 'apartment', dialog: [
    { speakerId: 'kai', text: '"Defenses? You think I don\'t try?"', emotion: 'angry' },
    { speakerId: 'kai', text: '"You don\'t understand. No one does."', emotion: 'cold' },
    { speakerId: 'inner-voice', text: 'Wrong approach. She needed validation, not solutions.', emotion: 'sad' },
  ], nextSceneId: 'ending-distant' },
];
