import type { Scene } from '../../types';

// Opening: Context setting + Weekend Favor (Scene 1.1)
export const openingScenes: Scene[] = [
  {
    id: 'opening-1',
    backgroundId: 'coffee-shop',
    dialog: [
      {
        text: "Three weeks with Jake. Chemistry. Long conversations. He texts good morning every day. Maya's skeptical: 'What has he actually DONE for you?' You're about to find out.",
        speakerId: 'maya',
        emotion: 'neutral',
      },
      {
        text: "Your phone buzzes. It's Jake. 'Babe, I know this is last minute, but my cousin's moving truck just broke down. I need someone with a car to help me move all day Saturday. You're the only person I trust who could handle this.'",
      },
      {
        speakerId: 'inner-voice',
        text: "Your whole Saturday. What has he done to earn it?",
        emotion: 'neutral',
      },
    ],
    choices: [
      {
        id: 'opening-trap',
        text: '"Of course! I\'ll cancel my plans. I\'ll be there at 8 AM sharp."',
        nextSceneId: 'time-trap-consequence',
        feedback: "You dropped everything for someone who's given you nothing but words. He now knows your boundaries are negotiable.",
      },
      {
        id: 'opening-subtle',
        text: '"I can be there from 1 PM to 5 PM. Happy to help."',
        nextSceneId: 'time-subtle-consequence',
        xpBonus: 5,
        feedback: "You gave in too easily. Your boundaries are seen as flexible. He'll push them again next time.",
      },
      {
        id: 'opening-close',
        text: '"I can\'t help with the move, but I can pay for a couple of movers."',
        nextSceneId: 'time-close-consequence',
        xpBonus: 10,
        feedback: "You protected your time but offered a resource. He accepts, but notes your reluctance.",
      },
      {
        id: 'opening-optimal',
        text: '"I\'m tied up Saturday. If you handle the move, I\'d love to take you out Sunday to celebrate."',
        nextSceneId: 'time-optimal-consequence',
        isOptimal: true,
        xpBonus: 20,
        tactic: 'boundary_pivot',
        feedback: "You refused the demand and forced him to invest in you instead. Sunday dinner is HIS reward for handling HIS problem.",
      },
    ],
  },
];
