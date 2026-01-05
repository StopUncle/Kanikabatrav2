import type { ForkScene } from '../../../types';

/**
 * Mission 15: The Final Choice - The Bridge
 * Connection to Level 4: The Island. What comes next.
 */
export const bridgeScenes: ForkScene[] = [
  {
    id: 'climax-bridge-intro',
    backgroundId: 'restaurant',
    sceneType: 'dialogue',
    pathId: 'climax',
    mood: 'mysterious',
    dialog: [
      {
        text: 'The party continues around you. But everything feels different now.',
      },
      {
        text: 'Maris guides you toward a private alcove. Away from the crowd.',
      },
      {
        text: '"Now that formalities are handled... there\'s something else."',
        speakerId: 'maris',
        emotion: 'knowing',
      },
      {
        text: '"Something that isn\'t discussed in public. Ever."',
        speakerId: 'maris',
        emotion: 'cold',
      },
    ],
    nextSceneId: 'climax-island-tease',
  },
  {
    id: 'climax-island-tease',
    backgroundId: 'restaurant',
    sceneType: 'dialogue',
    pathId: 'climax',
    mood: 'cold',
    dialog: [
      {
        text: '"Harrison has an estate. Private island. Very exclusive."',
        speakerId: 'maris',
        emotion: 'neutral',
      },
      {
        text: '"Once a year, a select group is invited. The real inner circle."',
        speakerId: 'maris',
        emotion: 'knowing',
      },
      {
        text: 'She watches your reaction.',
      },
      {
        text: '"This year, I\'ve been asked to bring someone new. Someone promising."',
        speakerId: 'maris',
        emotion: 'seductive',
      },
      {
        text: 'The Island. There\'s another level beyond this.',
        speakerId: 'inner-voice',
        emotion: 'knowing',
      },
    ],
    nextSceneId: 'climax-invitation-extended',
  },
  {
    id: 'climax-invitation-extended',
    backgroundId: 'restaurant',
    sceneType: 'dialogue',
    pathId: 'climax',
    mood: 'mysterious',
    dialog: [
      {
        text: '"You\'ve proven you can play at this level. The question is: can you play higher?"',
        speakerId: 'maris',
        emotion: 'cold',
      },
      {
        text: '"The Island isn\'t networking. It isn\'t politics. It\'s... something else."',
        speakerId: 'maris',
        emotion: 'knowing',
      },
      {
        text: 'For the first time tonight, she looks almost... uncertain.',
      },
      {
        text: '"Think about it. The invitation will come. If it does... don\'t say no."',
        speakerId: 'maris',
        emotion: 'serious',
      },
    ],
    nextSceneId: 'climax-maris-personal',
  },
  {
    id: 'climax-maris-personal',
    backgroundId: 'restaurant',
    sceneType: 'dialogue',
    pathId: 'climax',
    mood: 'cold',
    dialog: [
      {
        text: 'She pauses at the edge of the alcove. Turns back.',
      },
      {
        text: '"You remind me of someone. Not sure if that\'s good or bad yet."',
        speakerId: 'maris',
        emotion: 'neutral',
      },
      {
        text: '"My sister warned you about me. I know she did."',
        speakerId: 'maris',
        emotion: 'cold',
      },
      {
        text: '"She\'s not wrong. But she doesn\'t understand what I understand."',
        speakerId: 'maris',
        emotion: 'knowing',
      },
      {
        text: 'Something genuine. Hidden under layers of ice.',
        speakerId: 'inner-voice',
        emotion: 'knowing',
      },
    ],
    nextSceneId: 'climax-final-exchange',
  },
  {
    id: 'climax-final-exchange',
    backgroundId: 'restaurant',
    sceneType: 'dialogue',
    pathId: 'climax',
    mood: 'mysterious',
    dialog: [
      {
        text: '"People think power is about control. It\'s not."',
        speakerId: 'maris',
        emotion: 'neutral',
      },
      {
        text: '"It\'s about understanding what everyone wants and being the one who can give it to them."',
        speakerId: 'maris',
        emotion: 'knowing',
      },
      {
        text: '"Or take it away."',
        speakerId: 'maris',
        emotion: 'cold',
      },
      {
        text: 'She extends her hand. Not a handshake. Something more formal.',
      },
      {
        text: '"Until the Island."',
        speakerId: 'maris',
        emotion: 'seductive',
      },
      {
        text: 'You shake. A pact. A promise. A threat.',
        speakerId: 'inner-voice',
        emotion: 'knowing',
      },
    ],
    nextSceneId: 'ending-success-intro',
  },
];
