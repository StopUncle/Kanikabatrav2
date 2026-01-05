// Part 3: The Aftermath - Feedback and outcome

import type { Scene } from '../../../types';

export const aftermathScenes: Scene[] = [
  // Scene 16: The Room Empties
  {
    id: 'exec-16-aftermath',
    backgroundId: 'meeting-room',
    dialog: [
      {
        text: 'They thank you. Start to leave.',
      },
      {
        text: 'Victoria pauses at the door.',
      },
    ],
    nextSceneId: 'exec-16b-aftermath',
  },
  {
    id: 'exec-16b-aftermath',
    backgroundId: 'meeting-room',
    dialog: [
      {
        text: 'Good work.',
        speakerId: 'victoria',
        emotion: 'neutral',
      },
      {
        text: 'Two words. She leaves.',
      },
      {
        text: '"Good work." From Victoria, that\'s a lot.',
        
      },
    ],
    nextSceneId: 'exec-17-debrief',
  },

  // Scene 17: Chen's Debrief
  {
    id: 'exec-17-debrief',
    backgroundId: 'office',
    dialog: [
      {
        text: 'Chen catches you in the hallway afterward.',
      },
      {
        text: 'How do you feel about that?',
        speakerId: 'chen',
        emotion: 'neutral',
      },
      {
        text: 'Be honest. How did it go?',
        
      },
    ],
    choices: [
      {
        id: 'exec-17-a',
        text: '"I think it went well. I held my ground."',
        nextSceneId: 'ending-star',
        feedback: 'Confident assessment. Let\'s see if it matches reality.',
        xpBonus: 10,
      },
      {
        id: 'exec-17-b',
        text: '"The Victoria question was rough. But I recovered."',
        nextSceneId: 'ending-breakthrough',
        feedback: 'Honest. Recovery matters.',
        xpBonus: 12,
      },
      {
        id: 'exec-17-c',
        text: '"It was fine. Professional."',
        nextSceneId: 'ending-solid',
        feedback: 'Modest assessment. Probably accurate.',
        xpBonus: 8,
      },
      {
        id: 'exec-17-d',
        text: '"I think I blew it."',
        nextSceneId: 'ending-missed',
        feedback: 'If you think you blew it, you probably did.',
        xpBonus: 5,
      },
    ],
  },
];
