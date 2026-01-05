// Bad Endings for The Credit Thief

import type { Scene } from '../../../types';

export const badEndings: Scene[] = [
  // Ending: Silent Treatment
  {
    id: 'ending-silent-treatment',
    backgroundId: 'office',
    dialog: [
      {
        text: 'Alex got the credit. And the Q3 project. And the promotion conversation with Marcus.',
      },
      {
        text: 'You watched it happen. You said nothing.',
      },
      {
        text: 'Silence is acceptance. You accepted being stolen from.',
      },
      {
        text: 'And now they know you\'ll accept it again.',
      },
    ],
    isEnding: true,
    outcomeType: 'bad',
    endingTitle: 'The Silent Treatment',
    endingSummary:
      'The first theft sets the pattern. If you don\'t fight the first one, expect more.',
  },

  // Ending: Petty Look
  {
    id: 'ending-petty-look',
    backgroundId: 'office',
    dialog: [
      {
        text: 'Later, you hear through the grapevine:',
      },
      {
        text: '"Is [your name] okay? They seemed really focused on getting credit for that project. Kind of territorial."',
        speakerId: 'marcus',
        emotion: 'neutral',
      },
      {
        text: 'You fought for credit. And now you look petty.',
      },
      {
        text: 'Not because you were wrong. Because you did it wrong.',
      },
    ],
    isEnding: true,
    outcomeType: 'bad',
    endingTitle: 'The Petty Look',
    endingSummary:
      'How you reclaim matters as much as whether you reclaim. Proof + diplomacy. Not emotion.',
  },

  // Ending: Ongoing War
  {
    id: 'ending-ongoing-war',
    backgroundId: 'office',
    dialog: [
      {
        text: 'You and Alex are now in an undeclared war.',
      },
      {
        text: 'Every meeting is a battlefield. Every project is a competition. Every email is carefully worded.',
      },
      {
        text: 'You won the credit fight. Lost the working relationship.',
      },
      {
        text: 'Was it worth it?',
      },
    ],
    isEnding: true,
    outcomeType: 'bad',
    endingTitle: 'The Ongoing War',
    endingSummary:
      'Sometimes the cost of recovery is higher than the theft. Know when to fight and when to leave.',
  },
];
