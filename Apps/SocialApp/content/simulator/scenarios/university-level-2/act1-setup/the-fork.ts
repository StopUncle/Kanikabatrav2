import type { ForkScene } from '../../../types';

/**
 * The Fork - Mission selection scene
 * Player chooses which social challenge to tackle first
 */
export const forkScenes: ForkScene[] = [
  {
    id: 'level-2-fork',
    backgroundId: 'apartment',
    sceneType: 'action',
    pathId: 'setup',
    dialog: [
      {
        text: 'Tonight. You have options.',
      },
      {
        text: 'Tyler\'s party at the Velvet Room. High status, high risk. One wrong move and you\'re blacklisted.',
      },
      {
        text: 'The dating apps are buzzing. Someone\'s hiding something. Time to find out who.',
      },
      {
        text: 'Dana\'s offer sits in your messages. Sweet on the surface. But what\'s underneath?',
      },
      {
        text: 'Choose your battlefield.',
        speakerId: 'inner-voice',
        emotion: 'neutral',
      },
    ],
    actionChoices: [
      {
        id: 'action-club',
        text: 'Hit the Velvet Room',
        subtext: 'Tyler\'s party. VIP access awaits... if you play it right.',
        nextSceneId: 'club-arrival',
        difficulty: 'medium',
        pathId: 'club',
      },
      {
        id: 'action-apps',
        text: 'Work the dating apps',
        subtext: 'Someone\'s not who they claim. Time to investigate.',
        nextSceneId: 'app-matches-intro',
        difficulty: 'medium',
        pathId: 'app',
      },
      {
        id: 'action-dana',
        text: 'Take Dana\'s offer',
        subtext: 'She\'s "just trying to help." Right?',
        nextSceneId: 'setup-dana-coffee',
        difficulty: 'hard',
        pathId: 'setup',
      },
    ],
  },
];
