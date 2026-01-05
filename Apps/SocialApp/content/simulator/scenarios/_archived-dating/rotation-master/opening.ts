import type { Scene } from '../../types';

export const openingScenes: Scene[] = [
  {
    id: 'opening-1',
    backgroundId: 'coffee-shop',
    dialog: [
      {
        text: "You're meeting Sarah for brunch. Something's been bothering you about your dating life. Not sure how to name it.",
      },
      {
        text: "'Okay, spill. What's the situation?'",
        speakerId: 'sarah',
        emotion: 'neutral',
      },
      {
        speakerId: 'inner-voice',
        text: "She always sees right through you.",
        emotion: 'neutral',
      },
    ],
    choices: [
      {
        id: 'fork-fixated',
        text: '"I\'m completely fixated on one guy. He\'s hot and cold and I can\'t stop checking my phone."',
        nextSceneId: 'build-1',
        xpBonus: 5,
        feedback: 'Classic fixation. Time to build options.',
      },
      {
        id: 'fork-serious',
        text: '"I have options. But David wants to be exclusive. I\'m not ready."',
        nextSceneId: 'serious-1',
        xpBonus: 5,
        feedback: 'The exclusivity conversation. Delicate territory.',
      },
      {
        id: 'fork-caught',
        text: '"I was seeing a few guys. One of them found out. It\'s... messy."',
        nextSceneId: 'caught-1',
        xpBonus: 5,
        feedback: 'Discovery crisis. Time for damage control.',
      },
    ],
  },
];
