import type { ForkScene } from '../../../../types';

/**
 * Study Path - Scene 1: Arrival at the Study Hall
 * Quieter environment, different dynamic than the party
 * DEFENSIVE VERSION: Learning to recognize healthy vs. anxious attachment patterns
 */
export const arrivalScenes: ForkScene[] = [
  {
    id: 'study-hall-arrival',
    backgroundId: 'coffee-shop',
    sceneType: 'dialogue',
    pathId: 'study',
    mood: 'peaceful',
    chapter: {
      name: 'The Study Hall',
      index: 1,
      total: 5,
    },
    dialog: [
      {
        text: 'The library\'s study lounge is the opposite of Maris\'s party. Soft lighting. Quiet conversation. The smell of coffee and old books.',
      },
      {
        text: 'A handful of students scattered at tables. Some alone, some in pairs. No one performing. Just people actually working.',
      },
      {
        text: 'You spot an empty table near the window. A girl at the next table glances up, then quickly looks away.',
      },
      {
        text: 'Nervous. Self-conscious. Not used to being noticed.',
        speakerId: 'inner-voice',
        emotion: 'neutral',
      },
    ],
    dialogueChoices: [
      {
        id: 'arrival-settle',
        text: 'Take the window seat. Get comfortable.',
        reaction: {
          text: 'You set up at the table. Laptop, notes, coffee. The girl at the next table keeps sneaking glances, then looking away when you might notice.',
          emotion: 'neutral',
          bodyLanguage: 'She wants to connect but doesn\'t know how to start.',
          scoreImpact: 10,
        },
        nextSceneId: 'study-observation',
        isOptimal: true,
      },
      {
        id: 'arrival-approach',
        text: 'Approach the girl\'s table directly.',
        reaction: {
          text: 'Her eyes go wide. "Oh! I—sorry, is this your spot? I can move—" She\'s already gathering her things.',
          emotion: 'confused',
          bodyLanguage: 'Too fast. She assumed she was in the way.',
          scoreImpact: -5,
        },
        nextSceneId: 'study-meeting-casey-awkward',
      },
      {
        id: 'arrival-smile',
        text: 'Catch her eye. Give a small nod.',
        reaction: {
          text: 'She freezes for a moment, then offers a tentative smile back. She doesn\'t look away this time.',
          emotion: 'hopeful',
          bodyLanguage: 'Small acknowledgment. Not threatening. Good start.',
          scoreImpact: 15,
        },
        nextSceneId: 'study-meeting-casey',
        isOptimal: true,
      },
    ],
  },
  {
    id: 'study-observation',
    backgroundId: 'coffee-shop',
    sceneType: 'dialogue',
    pathId: 'study',
    mood: 'peaceful',
    dialog: [
      {
        text: 'From your table, you can observe the dynamics of the room. The girl at the next table has a mountain of textbooks but keeps looking at her phone. Waiting for something.',
      },
      {
        text: 'Her posture is defensive. Shoulders hunched. Takes up as little space as possible.',
      },
      {
        text: 'Someone who\'s used to being invisible. Not sure she wants to be seen, but definitely wants to be noticed.',
        speakerId: 'inner-voice',
        emotion: 'neutral',
      },
    ],
    nextSceneId: 'study-meeting-casey',
  },
  {
    id: 'study-meeting-casey-awkward',
    backgroundId: 'coffee-shop',
    sceneType: 'dialogue',
    pathId: 'study',
    mood: 'peaceful',
    dialog: [
      {
        text: '"No, no—you don\'t have to move." You gesture for her to stay.',
      },
      {
        text: 'She hesitates, books half-gathered. "Are you sure? I don\'t want to be in the way. I\'m always in the way."',
        speakerId: 'casey',
        emotion: 'confused',
      },
      {
        text: 'She said that like it\'s a fact. Like being in the way is her default state.',
        speakerId: 'inner-voice',
        emotion: 'concerned',
      },
    ],
    dialogueChoices: [
      {
        id: 'awkward-reassure',
        text: '"You\'re not in the way. I just thought I\'d say hi."',
        reaction: {
          text: 'She blinks. "Oh." The tension leaves her shoulders slightly. "That\'s... that\'s nice. People don\'t usually..." She trails off.',
          emotion: 'hopeful',
          bodyLanguage: 'She\'s not used to casual friendliness. Note that.',
          scoreImpact: 10,
        },
        nextSceneId: 'study-meeting-casey',
        isOptimal: true,
      },
      {
        id: 'awkward-joke',
        text: '"You look like you need a coffee break more than more studying."',
        reaction: {
          text: 'She laughs—surprised, genuine. "God, yes. I\'ve been here for four hours and I can\'t remember what I read."',
          emotion: 'happy',
          bodyLanguage: 'Laughter breaks tension. Good instinct.',
          scoreImpact: 15,
        },
        nextSceneId: 'study-meeting-casey',
        isOptimal: true,
      },
      {
        id: 'awkward-retreat',
        text: '"Never mind, sorry to bother you."',
        reaction: {
          text: 'Her face falls. "Oh. Okay." She goes back to her books, but her posture is even more closed off now.',
          emotion: 'sad',
          bodyLanguage: 'She was hopeful. Now she\'s confirmed her fear: she\'s not worth talking to.',
          scoreImpact: -15,
        },
        nextSceneId: 'study-solo-path',
      },
    ],
  },
];
