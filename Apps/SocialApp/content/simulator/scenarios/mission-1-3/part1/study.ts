import type { ForkScene } from '../../../types';

export const studyScenes: ForkScene[] = [
  {
    id: 'library-invite',
    backgroundId: 'office',
    dialog: [
      { speakerId: null, text: 'The library study room is booked. Casey texted you the details.', emotion: 'neutral' },
      { speakerId: 'casey', text: '"Hey! Glad you could make it. I invited a few others too."', emotion: 'happy' },
      { speakerId: null, text: 'Around the table: Marcus, charming and confident. Lisa, studying you more than her notes.', emotion: 'neutral' },
      { speakerId: 'inner-voice', text: 'One genuine ally. Two wildcards.', emotion: 'knowing' },
    ],
    nextSceneId: 'group-dynamics',
  },
  {
    id: 'group-dynamics',
    backgroundId: 'office',
    dialog: [
      { speakerId: 'marcus', text: '"So you\'re the one who was at the Caldwell Gala? Must be nice having connections."', emotion: 'smirking' },
      { speakerId: 'lisa', text: '"Speaking of connections... do you think Maris would ever come to a study group?"', emotion: 'curious' },
      { speakerId: 'inner-voice', text: 'And there it is. The real agenda surfaces fast.', emotion: 'knowing' },
    ],
    choices: [
      { id: 'shut-it-down', text: '"We\'re here to study, right?"', nextSceneId: 'study-refocus', feedback: 'Redirect. Keep focus on the actual goal.', isOptimal: true },
      { id: 'play-along', text: '"Maybe. She\'s pretty busy though."', nextSceneId: 'lisa-pushes', feedback: 'Giving them hope keeps them circling.' },
    ],
  },
  {
    id: 'study-refocus',
    backgroundId: 'office',
    dialog: [
      { speakerId: 'casey', text: '"Yeah, exactly. We have midterms next week."', emotion: 'serious' },
      { speakerId: 'marcus', text: '"Right, right. So who did the reading for chapter 7?"', emotion: 'neutral' },
      { speakerId: null, text: 'For a while, it actually feels like a study group.', emotion: 'neutral' },
    ],
    nextSceneId: 'marcus-move',
  },
  {
    id: 'lisa-pushes',
    backgroundId: 'office',
    dialog: [
      { speakerId: 'lisa', text: '"Busy with what though? I could help her with something..."', emotion: 'hopeful' },
      { speakerId: 'inner-voice', text: 'She wants you to open the door. Don\'t.', emotion: 'concerned' },
    ],
    choices: [
      { id: 'redirect-lisa', text: '"Let\'s focus on the midterm right now"', nextSceneId: 'study-refocus', feedback: 'Pull back. Limit the access she thinks she\'s getting.' },
      { id: 'promise-lisa', text: '"I\'ll introduce you sometime"', nextSceneId: 'promise-regret', feedback: 'A promise you can\'t keep. She\'ll hold you to it.', isOptimal: false },
    ],
  },
  {
    id: 'marcus-move',
    backgroundId: 'office',
    dialog: [
      { speakerId: 'marcus', text: '"Hey, can I see your notes on the economic theory section? Mine are... incomplete."', emotion: 'happy' },
      { speakerId: null, text: 'He leans in, phone out. Ready to photograph.', emotion: 'neutral' },
      { speakerId: 'inner-voice', text: 'His notes aren\'t incomplete. They\'re nonexistent.', emotion: 'knowing' },
    ],
    choices: [
      { id: 'share-notes', text: 'Share your notes', nextSceneId: 'notes-stolen', feedback: 'He\'ll photograph every page. Your exam prep is now his.', isOptimal: false },
      { id: 'summarize', text: '"Let me just explain the key points"', nextSceneId: 'verbal-only', feedback: 'Smart. Give concepts, not content.', isOptimal: true },
      { id: 'decline', text: '"Sorry, I don\'t share notes"', nextSceneId: 'marcus-annoyed', feedback: 'Direct. He won\'t like it.' },
    ],
  },
  {
    id: 'verbal-only',
    backgroundId: 'office',
    dialog: [
      { speakerId: null, text: 'You explain the concepts verbally. Marcus puts his phone away, disappointed.', emotion: 'neutral' },
      { speakerId: 'marcus', text: '"Thanks... I guess."', emotion: 'neutral' },
      { speakerId: 'casey', text: '"That was actually a great explanation. Thanks!"', emotion: 'happy' },
    ],
    nextSceneId: 'break-time',
  },
  {
    id: 'marcus-annoyed',
    backgroundId: 'office',
    dialog: [
      { speakerId: 'marcus', text: '"Seriously? We\'re supposed to be helping each other."', emotion: 'angry' },
      { speakerId: 'casey', text: '"She\'s allowed to have boundaries, Marcus."', emotion: 'serious' },
      { speakerId: 'marcus', text: '"Whatever."', emotion: 'cold' },
    ],
    nextSceneId: 'break-time',
  },
  {
    id: 'notes-stolen',
    backgroundId: 'office',
    dialog: [
      { speakerId: null, text: 'Marcus photographs every page. His smile is too wide.', emotion: 'neutral' },
      { speakerId: 'marcus', text: '"Thanks! You\'re a lifesaver."', emotion: 'happy' },
      { speakerId: 'inner-voice', text: 'You just gave him your exam prep. For free.', emotion: 'sad' },
    ],
    nextSceneId: 'ending-stolen',
  },
  {
    id: 'promise-regret',
    backgroundId: 'office',
    dialog: [
      { speakerId: 'lisa', text: '"Really? That would be amazing! When?"', emotion: 'happy' },
      { speakerId: null, text: 'Her eyes are hungry. You promised something you shouldn\'t have.', emotion: 'neutral' },
      { speakerId: 'inner-voice', text: 'You just promised something that doesn\'t exist.', emotion: 'concerned' },
    ],
    nextSceneId: 'ending-promise',
  },
  {
    id: 'break-time',
    backgroundId: 'coffee-shop',
    dialog: [
      { speakerId: null, text: 'Coffee break. Casey pulls you aside.', emotion: 'neutral' },
      { speakerId: 'casey', text: '"Hey, thanks for coming. I know these people are... a lot."', emotion: 'neutral' },
      { speakerId: 'casey', text: '"Marcus has a reputation. And Lisa\'s been asking everyone about Maris connections."', emotion: 'concerned' },
    ],
    choices: [
      { id: 'appreciate', text: '"Thanks for the heads up"', nextSceneId: 'casey-bond', feedback: 'Strengthen the genuine alliance.' },
      { id: 'play-dumb', text: '"I hadn\'t noticed anything weird"', nextSceneId: 'casey-worried', feedback: 'She knows you\'re smarter than that.' },
    ],
  },
  {
    id: 'casey-bond',
    backgroundId: 'coffee-shop',
    dialog: [
      { speakerId: 'casey', text: '"Of course. We look out for each other, right?"', emotion: 'happy' },
      { speakerId: null, text: 'There\'s genuine warmth here. A real ally.', emotion: 'neutral' },
      { speakerId: 'inner-voice', text: 'Not everyone has an angle. Remember that.', emotion: 'knowing' },
    ],
    nextSceneId: 'ending-success',
  },
  {
    id: 'casey-worried',
    backgroundId: 'coffee-shop',
    dialog: [
      { speakerId: 'casey', text: '"Really? Because I saw Marcus with his phone out..."', emotion: 'concerned' },
      { speakerId: 'casey', text: '"Just... be careful, okay?"', emotion: 'serious' },
    ],
    nextSceneId: 'ending-success',
  },
];
