import type { ForkScene } from '../../../types';

/**
 * Secret Mission: The Architect's Gambit - The Invitation
 * Maris's private summons. The real game begins.
 * Unlock: Optimal choices + high Maris approval
 */
export const secretInvitationScenes: ForkScene[] = [
  {
    id: 'secret-invitation-intro',
    backgroundId: 'restaurant',
    sceneType: 'dialogue',
    pathId: 'secret',
    chapter: { name: 'Secret: The Architect\'s Gambit', index: 1, total: 4 },
    mood: 'mysterious',
    dialog: [
      {
        text: 'Later. The party winding down. Most guests have left.',
      },
      {
        text: 'A server approaches. Discrete. Professional.',
      },
      {
        text: '"Ms. Caldwell requests your presence. Private room. Third floor."',
      },
      {
        text: 'Blake looks at you. "Is this... normal?"',
        speakerId: 'blake',
        emotion: 'concerned',
      },
      {
        text: 'Nothing about tonight has been normal.',
        speakerId: 'inner-voice',
        emotion: 'knowing',
      },
    ],
    nextSceneId: 'secret-ascent',
  },
  {
    id: 'secret-ascent',
    backgroundId: 'restaurant',
    sceneType: 'dialogue',
    pathId: 'secret',
    mood: 'mysterious',
    dialog: [
      {
        text: 'You climb. Each floor more private. More exclusive.',
      },
      {
        text: 'Security nods you through without checking. Expected.',
      },
      {
        text: 'The third floor is a different world. Darker. Quieter. Expensive.',
      },
      {
        text: 'A door at the end of the hall. Open. Waiting.',
      },
    ],
    nextSceneId: 'secret-maris-private',
  },
  {
    id: 'secret-maris-private',
    backgroundId: 'restaurant',
    sceneType: 'dialogue',
    pathId: 'secret',
    mood: 'cold',
    dialog: [
      {
        text: 'Maris. Alone. The mask finally off.',
      },
      {
        text: 'She looks... tired. Not physically. Something deeper.',
        speakerId: 'maris',
        emotion: 'sad',
      },
      {
        text: '"Close the door. What I\'m about to show you doesn\'t leave this room."',
        speakerId: 'maris',
        emotion: 'cold',
      },
      {
        text: 'You close the door. Blake remains outside. This is just you.',
      },
      {
        text: 'Private Maris is different. Dangerous in a different way.',
        speakerId: 'inner-voice',
        emotion: 'knowing',
      },
    ],
    nextSceneId: 'secret-inner-sanctum-intro',
  },
];
