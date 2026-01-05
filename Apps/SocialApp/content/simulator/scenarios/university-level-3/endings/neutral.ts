import type { ForkScene } from '../../../types';

/**
 * Neutral Endings - Mixed outcomes
 */
export const neutralEndings: ForkScene[] = [
  {
    id: 'ending-neutral-observer',
    backgroundId: 'coffee-shop',
    sceneType: 'dialogue',
    pathId: 'ending',
    mood: 'peaceful',
    dialog: [
      {
        text: 'One month later. A quiet coffee shop.',
      },
      {
        text: 'Kai sits across from you. The war continues without you.',
      },
      {
        text: '"You could have been at the center of it all."',
        speakerId: 'kai',
        emotion: 'neutral',
      },
      {
        text: '"I know."',
      },
      {
        text: '"And you chose to watch instead."',
        speakerId: 'kai',
        emotion: 'knowing',
      },
      {
        text: '"Watching has value. You learn things. Patterns."',
      },
      {
        text: 'Safe. But limited. The observer sees everything. Changes nothing.',
        speakerId: 'inner-voice',
        emotion: 'neutral',
      },
    ],
    isEnding: true,
    outcomeType: 'neutral',
    endingTitle: 'The Observer',
    endingSummary: 'You stepped back. The factions continue their war without you. You\'re safe. You\'re informed. But you\'re not in the game. Sometimes that\'s the right choice. Sometimes it\'s just the safe one.',
  },
  {
    id: 'ending-neutral-pawn',
    backgroundId: 'office',
    sceneType: 'dialogue',
    pathId: 'ending',
    mood: 'professional',
    dialog: [
      {
        text: 'Two months later. Maris\'s outer office. Waiting.',
      },
      {
        text: 'You have access. Sort of. You\'re trusted. Sort of.',
      },
      {
        text: 'An assistant calls your name. "She\'ll see you now. Five minutes."',
      },
      {
        text: 'Five minutes. Not the inner circle. But not exile either.',
      },
      {
        text: 'Middle ground. Better than nothing. Less than everything.',
        speakerId: 'inner-voice',
        emotion: 'neutral',
      },
    ],
    isEnding: true,
    outcomeType: 'neutral',
    endingTitle: 'The Promising Asset',
    endingSummary: 'You\'re in. Partially. The Caldwells see your value but don\'t fully trust you yet. More tests await. More opportunities. More chances to prove yourself. Or fail.',
  },
  {
    id: 'ending-neutral-blake',
    backgroundId: 'apartment',
    sceneType: 'dialogue',
    pathId: 'ending',
    mood: 'peaceful',
    dialog: [
      {
        text: 'Three weeks later. Your apartment. Blake on the couch.',
      },
      {
        text: '"So that\'s it? We just... go back to normal?"',
        speakerId: 'blake',
        emotion: 'curious',
      },
      {
        text: '"Normal with a few more contacts. A few more doors."',
      },
      {
        text: '"But not the big leagues."',
        speakerId: 'blake',
        emotion: 'neutral',
      },
      {
        text: '"Not yet. But soon."',
      },
      {
        text: 'Progress. Slow but steady. The foundation is built.',
        speakerId: 'inner-voice',
        emotion: 'knowing',
      },
    ],
    isEnding: true,
    outcomeType: 'neutral',
    endingTitle: 'The Foundation',
    endingSummary: 'You survived the gala. Made connections. Learned lessons. You\'re not at the top. But you\'re no longer at the bottom. The next level awaits.',
  },
];
