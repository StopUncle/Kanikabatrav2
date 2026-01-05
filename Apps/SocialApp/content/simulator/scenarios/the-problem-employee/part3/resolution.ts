// Part 3: Resolution - Termination and Aftermath

import type { Scene } from '../../../types';

export const resolutionScenes: Scene[] = [
  // Scene 13: The Termination
  {
    id: 'emp-13-termination',
    backgroundId: 'meeting-room',
    dialog: [
      {
        text: 'Jordan from HR is present. This is the meeting.',
      },
      {
        text: 'Casey, thank you for joining us. Unfortunately, we\'re ending your employment effective today.',
        speakerId: 'jordan',
        emotion: 'neutral',
      },
    ],
    nextSceneId: 'emp-13-reaction',
  },
  {
    id: 'emp-13-reaction',
    backgroundId: 'meeting-room',
    dialog: [
      {
        text: 'Casey\'s reaction:',
      },
      {
        text: 'I knew this was coming. Thank you for giving me a chance.',
        speakerId: 'casey',
        emotion: 'sad',
      },
      {
        text: 'We\'ll provide your final paycheck and benefits information. Please return your equipment and badge by end of day.',
        speakerId: 'jordan',
        emotion: 'neutral',
      },
      {
        text: 'Casey leaves.',
      },
      {
        text: 'It\'s done. Not easy. But necessary.',
        
      },
    ],
    nextSceneId: 'emp-14-aftermath',
  },

  // Scene 14: Team Aftermath
  {
    id: 'emp-14-aftermath',
    backgroundId: 'office',
    dialog: [
      {
        text: 'The day after Casey\'s departure.',
      },
      {
        text: 'I heard about Casey.',
        speakerId: 'morgan',
        emotion: 'neutral',
      },
      {
        text: 'Morgan pauses.',
      },
      {
        text: 'Thank you. I know that wasn\'t easy.',
        speakerId: 'morgan',
        emotion: 'happy',
      },
      {
        text: 'They noticed. They appreciate it.',
        
      },
    ],
    nextSceneId: 'emp-14-respect',
  },
  {
    id: 'emp-14-respect',
    backgroundId: 'office',
    dialog: [
      {
        text: 'For what it\'s worth—the team respects you for handling it. Even if it took time.',
        speakerId: 'morgan',
        emotion: 'happy',
      },
      {
        text: 'The A-players were watching. And they\'re still here.',
        
      },
    ],
    nextSceneId: 'ending-clean-exit',
  },
];
