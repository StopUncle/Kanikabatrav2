// Good Endings for The Impossible Boss

import type { Scene } from '../../../types';

export const goodEndings: Scene[] = [
  // Excellent: Boss Changed
  {
    id: 'ending-boss-changed',
    backgroundId: 'office',
    dialog: [
      {
        text: 'Jordan changed. Not completely, but enough.',
      },
      {
        text: 'The micromanaging eased when trust built. The credit stealing stopped when you built visibility. The absence reduced when you proved structure.',
      },
      {
        text: 'Not every impossible boss is permanent. Some just need to be managed.',
        
      },
    ],
    isEnding: true,
    outcomeType: 'good',
    endingTitle: 'The Boss Changed',
    endingSummary: 'Managing up is a skill. And like any skill, it gets better with practice. You diagnosed the problem, adapted your approach, and built a workable relationship. Not every boss can change—but some will, if you give them the right incentives.',
  },

  // Excellent: Outlasted Them
  {
    id: 'ending-outlasted',
    backgroundId: 'office',
    dialog: [
      {
        text: 'Jordan is gone. Transferred. Or "transitioned."',
      },
      {
        text: 'The skip-level with Casey paid off. The documentation proved a pattern. The alliances made the decision easier.',
      },
      {
        text: 'You didn\'t quit. They did. Or they were helped to quit.',
        
      },
    ],
    isEnding: true,
    outcomeType: 'good',
    endingTitle: 'Outlasted Them',
    endingSummary: 'Sometimes the best strategy is survival. Toxic managers don\'t last forever. You just need to last longer. You built relationships above them, documented the pattern, and waited. The system eventually did what it does to bad managers.',
  },

  // Excellent: Clean Exit
  {
    id: 'ending-clean-exit',
    backgroundId: 'apartment',
    dialog: [
      {
        text: 'The new job offer came through. 40% raise. Better title. Better manager.',
      },
      {
        text: 'You gave professional notice. No drama. No burning bridges.',
      },
      {
        text: 'You couldn\'t fix Jordan. So you fixed your situation. That\'s not failure. That\'s strategy.',
        
      },
    ],
    isEnding: true,
    outcomeType: 'good',
    endingTitle: 'The Clean Exit',
    endingSummary: 'Not every battle is worth fighting. Sometimes the win is a clean exit. You built your options while managing the situation, and when the right opportunity came, you took it. Leaving well is its own kind of victory.',
  },

  // Good: Survived and Learned
  {
    id: 'ending-survived-learned',
    backgroundId: 'office',
    dialog: [
      {
        text: 'Jordan is still Jordan. But you\'re different now.',
      },
      {
        text: 'You learned to manage up. You learned to document. You learned to build relationships above and around.',
      },
      {
        text: 'They didn\'t break you. And you picked up skills you\'ll use forever.',
        
      },
    ],
    isEnding: true,
    outcomeType: 'good',
    endingTitle: 'Survived and Learned',
    endingSummary: 'Bad bosses are expensive tuition. Make sure you learn something for the price. You developed resilience, political skills, and the ability to navigate difficult people. These skills will serve you everywhere you go.',
  },
];
