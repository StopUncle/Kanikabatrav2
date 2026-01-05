import type { Scene } from '../../types';

export const openingScenes: Scene[] = [
  {
    id: 'opening-1',
    backgroundId: 'coffee-shop',
    dialog: [
      {
        text: "You're telling Maya about Michael. Third date coming up. He texts back consistently. Plans real dates. Remembers details. It's... unfamiliar.",
      },
      {
        text: "'And? What's the problem?'",
        speakerId: 'maya',
        emotion: 'neutral',
      },
      {
        speakerId: 'inner-voice',
        text: "Why does 'no problem' feel like a problem?",
        emotion: 'confused',
      },
    ],
    choices: [
      {
        id: 'fork-early',
        text: '"I don\'t know if I\'m attracted enough. It\'s not... exciting."',
        nextSceneId: 'early-1',
        xpBonus: 5,
        feedback: 'Mistaking stability for boredom. Common after chaos.',
      },
      {
        id: 'fork-conflict',
        text: '"We had our first disagreement. I\'m not sure how to read it."',
        nextSceneId: 'conflict-1',
        xpBonus: 5,
        feedback: 'First conflict is data. Watch how he handles it.',
      },
      {
        id: 'fork-family',
        text: '"He wants me to meet his friends. Feels fast?"',
        nextSceneId: 'family-1',
        xpBonus: 5,
        feedback: 'Integration is normal in healthy relationships. The question is how.',
      },
    ],
  },
];
