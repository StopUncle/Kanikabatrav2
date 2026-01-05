// Neutral Endings for The Crisis

import type { Scene } from '../../../types';

export const neutralEndings: Scene[] = [
  // Scarred but Standing
  {
    id: 'ending-scarred',
    backgroundId: 'office',
    dialog: [
      {
        text: 'You survive. Diminished, perhaps. Watched more closely. But still here.',
      },
      {
        text: 'The crisis taught you: everyone is a threat. Everything must be documented. Trust is a luxury.',
      },
    ],
    nextSceneId: 'ending-scarred-b',
  },
  {
    id: 'ending-scarred-b',
    backgroundId: 'office',
    isEnding: true,
    outcomeType: 'neutral',
    endingTitle: 'Scarred but Standing',
    endingSummary: 'You learned what this place really is. And what you really are. Survival isn\'t victory—but it\'s better than the alternative.',
    dialog: [
      {
        text: 'Survival isn\'t victory. But it\'s better than the alternative.',
      },
      {
        text: 'You learned what this place really is.',
        
      },
    ],
  },

  // The Golden Parachute
  {
    id: 'ending-parachute',
    backgroundId: 'office',
    dialog: [
      {
        text: 'You leave. The severance is standard. The announcement is neutral.',
      },
      {
        text: 'Six months later, you\'re somewhere else. The crisis fades.',
      },
    ],
    nextSceneId: 'ending-parachute-b',
  },
  {
    id: 'ending-parachute-b',
    backgroundId: 'office',
    isEnding: true,
    outcomeType: 'neutral',
    endingTitle: 'The Golden Parachute',
    endingSummary: 'You left. Not a victory, not a defeat. Sometimes leaving well is winning.',
    dialog: [
      {
        text: 'You didn\'t fight. But you didn\'t lose everything either.',
      },
      {
        text: 'Know when the fight isn\'t worth it. Exit with your options intact.',
        
      },
    ],
  },

  // Resignation
  {
    id: 'ending-resignation',
    backgroundId: 'office',
    dialog: [
      {
        text: 'You resign before the vote. Dignity intact. Record clean enough.',
      },
      {
        text: 'The board accepts. Victor looks relieved.',
      },
    ],
    nextSceneId: 'ending-resignation-b',
  },
  {
    id: 'ending-resignation-b',
    backgroundId: 'office',
    isEnding: true,
    outcomeType: 'neutral',
    endingTitle: 'The Dignified Exit',
    endingSummary: 'You chose to leave rather than be pushed. There\'s wisdom in knowing when to walk away.',
    dialog: [
      {
        text: 'You surrendered. With dignity, but still surrendered.',
      },
      {
        text: 'Sometimes the only winning move is not to play.',
        
      },
    ],
  },
];
