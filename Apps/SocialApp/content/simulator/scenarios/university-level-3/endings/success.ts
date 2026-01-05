import type { ForkScene } from '../../../types';

/**
 * Level 3 Ending: Success
 * Accepted into The Circle. Level 4 bridge established.
 */
export const successEndings: ForkScene[] = [
  {
    id: 'ending-success-intro',
    backgroundId: 'restaurant',
    sceneType: 'dialogue',
    pathId: 'endings',
    mood: 'professional',
    dialog: [
      {
        text: 'The gala ends. The crowd thins. You remain.',
      },
      {
        text: 'Harrison Cole approaches one final time.',
      },
      {
        text: '"You did well tonight. Better than most."',
        speakerId: 'harrison',
        emotion: 'neutral',
      },
      {
        text: '"Instructions will follow. Welcome to the network."',
        speakerId: 'harrison',
        emotion: 'knowing',
      },
    ],
    nextSceneId: 'ending-success-maris',
  },
  {
    id: 'ending-success-maris',
    backgroundId: 'restaurant',
    sceneType: 'dialogue',
    pathId: 'endings',
    mood: 'mysterious',
    dialog: [
      {
        text: 'Maris finds you as you\'re leaving.',
      },
      {
        text: '"The Island invitation. It\'s coming. I made sure of it."',
        speakerId: 'maris',
        emotion: 'knowing',
      },
      {
        text: '"Whatever you think this was... the real game is just starting."',
        speakerId: 'maris',
        emotion: 'cold',
      },
      {
        text: 'She disappears into a waiting car. Gone.',
      },
    ],
    nextSceneId: 'ending-success-final',
  },
  {
    id: 'ending-success-final',
    backgroundId: 'restaurant',
    sceneType: 'dialogue',
    pathId: 'endings',
    isEnding: true,
    outcomeType: 'good',
    endingTitle: 'Gala Survivor',
    endingSummary: 'You navigated the gala successfully. Harrison Cole has accepted you into the network. Maris Caldwell has taken personal interest. The Island awaits. Level 4 unlocked.',
    mood: 'professional',
    dialog: [
      {
        text: 'Blake drives you home. Silent. Processing.',
      },
      {
        text: '"I don\'t know what you got yourself into tonight."',
        speakerId: 'blake',
        emotion: 'concerned',
      },
      {
        text: '"Neither do I. But I\'m in it now."',
      },
      {
        text: 'Your phone buzzes. Unknown number. A single word:',
      },
      {
        text: '"Congratulations."',
      },
      {
        text: 'The game continues. But now you\'re a player, not a piece.',
        speakerId: 'inner-voice',
        emotion: 'knowing',
      },
    ],
  },
];
