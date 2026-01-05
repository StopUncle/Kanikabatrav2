// Good Endings for The Crisis

import type { Scene } from '../../../types';

export const goodEndings: Scene[] = [
  // Vindicated
  {
    id: 'ending-vindicated',
    backgroundId: 'office',
    dialog: [
      {
        text: 'The investigation concludes. The data changes were documented corrections. The process was flawed, not the intent.',
      },
      {
        text: 'You keep your job. Elena\'s maneuvering is noted, if not punished.',
      },
    ],
    nextSceneId: 'ending-vindicated-b',
  },
  {
    id: 'ending-vindicated-b',
    backgroundId: 'office',
    isEnding: true,
    outcomeType: 'good',
    endingTitle: 'Vindicated',
    endingSummary: 'You won. Documentation saved you. The paper trail is the only truth that survives.',
    dialog: [
      {
        text: 'You won. But the scars remain. Trust is harder now.',
      },
      {
        text: 'Document everything. The paper trail is the only truth that survives.',
        
      },
    ],
  },

  // Golden Parachute Plus
  {
    id: 'ending-parachute-plus',
    backgroundId: 'office',
    dialog: [
      {
        text: 'You leave. Eighteen months severance. A neutral letter. Your reputation intact.',
      },
      {
        text: 'Six months later, you\'re running something else. The crisis becomes a line item, not a headline.',
      },
    ],
    nextSceneId: 'ending-parachute-plus-b',
  },
  {
    id: 'ending-parachute-plus-b',
    backgroundId: 'office',
    isEnding: true,
    outcomeType: 'good',
    endingTitle: 'The Strategic Exit',
    endingSummary: 'You negotiated your way out. Sometimes the best victory is knowing when to leave well.',
    dialog: [
      {
        text: 'You didn\'t fight. You didn\'t lose. You extracted maximum value and left.',
      },
      {
        text: 'Exit with your options intact. That\'s the real win.',
        
      },
    ],
  },
];
