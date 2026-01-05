// Bad Endings for The Crisis

import type { Scene } from '../../../types';

export const badEndings: Scene[] = [
  // The Scapegoat
  {
    id: 'ending-scapegoat',
    backgroundId: 'office',
    dialog: [
      {
        text: 'You were fired. "To restore stakeholder confidence."',
      },
      {
        text: 'The investigation cleared you months later. Too late.',
      },
    ],
    nextSceneId: 'ending-scapegoat-b',
  },
  {
    id: 'ending-scapegoat-b',
    backgroundId: 'office',
    isEnding: true,
    outcomeType: 'bad',
    endingTitle: 'The Scapegoat',
    endingSummary: 'You were sacrificed. Not for what you did. For what they needed. In crisis, organizations protect themselves.',
    dialog: [
      {
        text: 'You were sacrificed. Not for what you did. For what they needed.',
      },
      {
        text: 'If you don\'t document, you can\'t defend.',
        
      },
    ],
  },

  // Career Destroyed
  {
    id: 'ending-destroyed',
    backgroundId: 'office',
    dialog: [
      {
        text: 'The emails were clear. The context didn\'t matter. You knew. Or you should have.',
      },
      {
        text: 'Criminal charges weren\'t filed. But criminal was what people called you.',
      },
    ],
    nextSceneId: 'ending-destroyed-b',
  },
  {
    id: 'ending-destroyed-b',
    backgroundId: 'office',
    isEnding: true,
    outcomeType: 'bad',
    endingTitle: 'Career Destroyed',
    endingSummary: 'You built something. It\'s gone now. All of it. Some lines can\'t be uncrossed. The cover-up is always worse than the crime.',
    dialog: [
      {
        text: 'You built something. It\'s gone now. All of it.',
      },
      {
        text: 'Some lines can\'t be uncrossed.',
        
      },
    ],
  },

  // Fought and Lost
  {
    id: 'ending-fought-lost',
    backgroundId: 'office',
    dialog: [
      {
        text: 'You fought. The board voted. You lost.',
      },
      {
        text: 'Fired for cause. No severance. Public humiliation.',
      },
    ],
    nextSceneId: 'ending-fought-lost-b',
  },
  {
    id: 'ending-fought-lost-b',
    backgroundId: 'office',
    isEnding: true,
    outcomeType: 'bad',
    endingTitle: 'Fought and Lost',
    endingSummary: 'You chose to fight. You were right to fight. You still lost. Sometimes the fight is unwinnable. Knowing when is wisdom.',
    dialog: [
      {
        text: 'You chose to fight. You were right to fight. You still lost.',
      },
      {
        text: 'Sometimes the fight is unwinnable. Knowing when is wisdom. Refusing to accept it is pride.',
        
      },
    ],
  },

  // Threw Someone Under the Bus
  {
    id: 'ending-betrayer',
    backgroundId: 'office',
    dialog: [
      {
        text: 'Sarah was fired. You kept your job. The board was satisfied.',
      },
      {
        text: 'But your team saw. And they remember.',
      },
    ],
    nextSceneId: 'ending-betrayer-b',
  },
  {
    id: 'ending-betrayer-b',
    backgroundId: 'office',
    isEnding: true,
    outcomeType: 'bad',
    endingTitle: 'The Betrayer',
    endingSummary: 'You protected yourself by sacrificing someone else. You survived. Can you live with that? Some victories cost more than they\'re worth.',
    dialog: [
      {
        text: 'You protected yourself. By sacrificing someone else.',
      },
      {
        text: 'Some victories cost more than they\'re worth. You know what you are now.',
        
      },
    ],
  },
];
