import type { ForkScene } from '../../../types';

/**
 * The Fork - Action scene where player chooses their path
 * This is the branching point between Party and Study Hall
 */
export const forkScenes: ForkScene[] = [
  {
    id: 'the-fork',
    backgroundId: 'dorm-room',
    sceneType: 'action',
    pathId: 'setup',
    dialog: [
      {
        text: 'The clock reads 8:47 PM. You have a decision to make.',
      },
      {
        text: 'Maris\'s party will be loud, seductive, and dangerous. The kind of place where one wrong word can end you socially. But the payoff? Direct access to the gatekeeper.',
      },
      {
        text: 'The common room is quieter. Casey is an unknown quantity. Easier to approach, but you\'ll need to extract what you need without burning the bridge.',
      },
      {
        text: 'Choose your battlefield.',
        speakerId: 'inner-voice',
        emotion: 'neutral',
      },
    ],
    actionChoices: [
      {
        id: 'action-party',
        text: 'Go to Maris\'s party',
        subtext: 'Everyone who matters will be there.',
        nextSceneId: 'party-arrival',
        difficulty: 'hard',
        pathId: 'party',
      },
      {
        id: 'action-study',
        text: 'Head to the common room',
        subtext: 'Sometimes the quiet path is the smartest one.',
        nextSceneId: 'study-hall-arrival',
        difficulty: 'easy',
        pathId: 'study-hall',
      },
      // Secret path will be added in a future update
      // {
      //   id: 'action-secret',
      //   text: 'Check the notice board first',
      //   subtext: 'You noticed something earlier...',
      //   nextSceneId: 'secret-path-start',
      //   difficulty: 'medium',
      //   pathId: 'secret',
      //   isLocked: true,
      //   lockedReason: 'Requires information from a previous playthrough.',
      // },
    ],
  },
];
