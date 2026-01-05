import type { ForkScene } from '../../../types';

/**
 * Good Endings - Success outcomes
 */
export const goodEndings: ForkScene[] = [
  {
    id: 'ending-good-caldwell',
    backgroundId: 'restaurant',
    sceneType: 'dialogue',
    pathId: 'ending',
    mood: 'professional',
    dialog: [
      {
        text: 'Two weeks later. Maris\'s private office.',
      },
      {
        text: '"You performed well at the gala. Mother was impressed."',
        speakerId: 'maris',
        emotion: 'neutral',
      },
      {
        text: '"Impressed enough to...?"',
      },
      {
        text: '"Welcome to the inner circle."',
        speakerId: 'maris',
        emotion: 'smirking',
      },
      {
        text: 'The door opens. Millicent enters.',
      },
      {
        text: '"Time for your real education to begin."',
        speakerId: 'millicent',
        emotion: 'knowing',
      },
    ],
    isEnding: true,
    outcomeType: 'good',
    endingTitle: 'The Caldwell Path',
    endingSummary: 'You chose power. The Caldwell inner circle embraces you. Millicent herself will guide your ascent. The price? Total loyalty. The reward? Everything.',
  },
  {
    id: 'ending-good-victoria',
    backgroundId: 'office',
    sceneType: 'dialogue',
    pathId: 'ending',
    mood: 'professional',
    dialog: [
      {
        text: 'One month later. Victoria\'s private residence.',
      },
      {
        text: '"The Caldwells are weakened. Not defeated. But weakened."',
        speakerId: 'victoria',
        emotion: 'neutral',
      },
      {
        text: '"And that\'s because of you. In part."',
        speakerId: 'victoria',
        emotion: 'knowing',
      },
      {
        text: '"What now?"',
      },
      {
        text: '"Now we build. An alternative network. With you at its center."',
        speakerId: 'victoria',
        emotion: 'smirking',
      },
      {
        text: 'The underdog path. Harder. But potentially more rewarding.',
        speakerId: 'inner-voice',
        emotion: 'knowing',
      },
    ],
    isEnding: true,
    outcomeType: 'good',
    endingTitle: 'The Insurgent Path',
    endingSummary: 'You chose the challenger. Victoria\'s network becomes yours to help build. The Caldwells are watching. But so is everyone else. In the shadows, empires can grow.',
  },
  {
    id: 'ending-good-independent',
    backgroundId: 'office',
    sceneType: 'dialogue',
    pathId: 'ending',
    mood: 'professional',
    dialog: [
      {
        text: 'Three months later. Your own office. Your own network.',
      },
      {
        text: 'Kai calls. Maris calls. Victoria calls. Harrison calls.',
      },
      {
        text: 'Everyone wants you. Nobody owns you.',
      },
      {
        text: 'Blake walks in. "The Whitmore Foundation invitation arrived. They want you to speak."',
        speakerId: 'blake',
        emotion: 'happy',
      },
      {
        text: '"Tell them yes."',
      },
      {
        text: 'The hardest path. The best outcome. Independence.',
        speakerId: 'inner-voice',
        emotion: 'knowing',
      },
    ],
    isEnding: true,
    outcomeType: 'good',
    endingTitle: 'The Architect',
    endingSummary: 'You chose yourself. Neither faction owns you. Both factions need you. You\'ve become what Harrison always was: the bridge between worlds. The future is yours to build.',
  },
];
