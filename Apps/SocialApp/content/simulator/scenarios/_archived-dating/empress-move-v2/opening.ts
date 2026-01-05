import type { Scene } from '../../types';

export const openingScenes: Scene[] = [
  {
    id: 'opening-1',
    backgroundId: 'coffee-shop',
    dialog: [
      {
        text: "Cate slides into the booth, eyes sharp as ever. 'You texted 911. This better be good.' She's been married five years, runs a consulting firm, still looks at her husband like they just met.",
        speakerId: 'cate',
        emotion: 'neutral',
      },
      {
        text: "You take a breath. The situation is clearer in your head than you expected. You know what you need to do. You just need to hear someone say you're not crazy.",
      },
      {
        speakerId: 'inner-voice',
        text: "She's seen you through every bad decision. Time for a good one.",
        emotion: 'neutral',
      },
    ],
    choices: [
      {
        id: 'fork-walkaway',
        text: '"He hasn\'t proposed in four years. I\'m done waiting."',
        nextSceneId: 'walk-1',
        xpBonus: 10,
        feedback: 'The Walk Away. Sometimes power means knowing when to leave.',
      },
      {
        id: 'fork-ultimatum',
        text: '"He forgot our anniversary. Again. Something has to change."',
        nextSceneId: 'ultimatum-1',
        xpBonus: 10,
        feedback: 'The Ultimatum. Demanding what you deserve without begging.',
      },
      {
        id: 'fork-upgrade',
        text: '"I got the promotion. He\'s acting weird about it."',
        nextSceneId: 'upgrade-1',
        xpBonus: 10,
        feedback: 'The Upgrade. When you level up and he can\'t handle it.',
      },
    ],
  },
];
