import type { ForkScene } from '../../../types';

/**
 * Secret Path - Scene 1: The Notice Board
 * Player noticed something during a previous playthrough - a note on the board.
 * This path is only available after learning about Maris's victims.
 */
export const noticeBoardScenes: ForkScene[] = [
  {
    id: 'secret-path-start',
    backgroundId: 'hallway',
    sceneType: 'dialogue',
    pathId: 'secret',
    mood: 'mysterious',
    chapter: {
      name: 'The Notice Board',
      index: 1,
      total: 3,
    },
    dialog: [
      {
        text: 'The hallway is empty. Everyone\'s already at the party or hiding in their rooms.',
      },
      {
        text: 'You approach the notice board. Among the flyers for tutoring and lost earbuds, there\'s something different. A small card, hand-written.',
      },
      {
        text: '"If you\'ve seen her true face, text this number. We meet at 9."',
      },
      {
        text: 'No name. No context. Just a number.',
        speakerId: 'inner-voice',
        emotion: 'knowing',
      },
    ],
    dialogueChoices: [
      {
        id: 'notice-text-now',
        text: 'Send a message. "I\'ve seen it."',
        reaction: {
          text: 'The reply comes in seconds. "Common room. Back corner. Come alone."',
          emotion: 'neutral',
          bodyLanguage: 'Quick. Efficient. Whoever this is, they\'ve done this before.',
          scoreImpact: 15,
        },
        nextSceneId: 'secret-common-room',
        isOptimal: true,
        interactionType: 'neutral',
      },
      {
        id: 'notice-investigate',
        text: 'Check who posted this. Look for fingerprints, anything.',
        reaction: {
          text: 'The card is pristine. Professional. But you notice it\'s pinned at exactly the height an RA would use.',
          emotion: 'neutral',
          bodyLanguage: 'Jordan. Has to be.',
          scoreImpact: 10,
        },
        nextSceneId: 'secret-common-room',
        tactic: 'gather-intel',
      },
      {
        id: 'notice-ignore',
        text: 'This is a trap. Head to the party instead.',
        reaction: {
          text: 'Maybe. Or maybe you just missed the only shortcut that exists. Your call.',
          emotion: 'neutral',
          bodyLanguage: 'The card stays on the board. Waiting.',
          scoreImpact: -20,
        },
        nextSceneId: 'party-arrival',
      },
    ],
  },
  {
    id: 'secret-common-room',
    backgroundId: 'common-room',
    sceneType: 'dialogue',
    pathId: 'secret',
    mood: 'tense',
    chapter: {
      name: 'The Notice Board',
      index: 2,
      total: 3,
    },
    dialog: [
      {
        text: 'The common room is dim. One lamp on in the corner. Three people sit in a tight circle, speaking in low voices.',
      },
      {
        text: 'You recognize Jordan, the RA. The other two are strangers.',
      },
      {
        text: 'Jordan spots you. Nods once. "Close the door."',
        speakerId: 'jordan',
        emotion: 'serious',
      },
    ],
    dialogueChoices: [
      {
        id: 'common-comply',
        text: 'Close it. Step inside.',
        reaction: {
          text: '"Good. Sit." Jordan gestures to an empty chair. The others watch you with careful, evaluating eyes.',
          emotion: 'neutral',
          bodyLanguage: 'No hostility. But no warmth either. You\'re being assessed.',
          scoreImpact: 10,
        },
        nextSceneId: 'secret-the-circle',
        isOptimal: true,
      },
      {
        id: 'common-demand',
        text: '"First tell me what this is about."',
        reaction: {
          text: 'Jordan\'s expression doesn\'t change. "We don\'t explain to people who haven\'t committed. Close the door or leave."',
          emotion: 'cold',
          bodyLanguage: 'Not a threat. A boundary.',
          scoreImpact: -5,
        },
        nextSceneId: 'secret-the-circle',
        tactic: 'boundary-test',
      },
      {
        id: 'common-bail',
        text: '"Actually, I think I made a mistake." Back out.',
        reaction: {
          text: 'Jordan sighs. "They always do." The door closes behind you. Whatever that was, you\'ll never know.',
          emotion: 'neutral',
          bodyLanguage: 'Opportunity gone.',
          scoreImpact: -50,
        },
        nextSceneId: 'party-arrival',
      },
    ],
  },
];
