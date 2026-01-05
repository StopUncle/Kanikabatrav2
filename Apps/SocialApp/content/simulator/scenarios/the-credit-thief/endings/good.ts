// Good Endings for The Credit Thief

import type { Scene } from '../../../types';

export const goodEndings: Scene[] = [
  // Ending 1: Full Recovery
  {
    id: 'ending-full-recovery',
    backgroundId: 'office',
    dialog: [
      {
        text: 'Marcus knows the truth. Priya confirmed it.',
      },
      {
        text: 'The Q3 project invitation? That went to you, not Alex.',
      },
      {
        text: 'You spoke up. You had receipts. And you got what was yours.',
      },
      {
        text: 'In a meeting the following week:',
      },
      {
        text: '"...building on the foundation that you established with the legacy fix..."',
        speakerId: 'alex',
        emotion: 'neutral',
      },
      {
        text: 'Interesting. They remember how to say your name now.',
      },
    ],
    isEnding: true,
    outcomeType: 'good',
    endingTitle: 'Full Recovery',
    endingSummary:
      'Credit thieves count on your silence. You didn\'t give it to them. The record is corrected, and you\'re positioned for the next opportunity.',
  },

  // Ending 2: Warning Shot
  {
    id: 'ending-warning-shot',
    backgroundId: 'office',
    dialog: [
      {
        text: 'Alex didn\'t apologize. But they stopped.',
      },
      {
        text: 'Every presentation now, they\'re careful to be specific about attribution.',
      },
      {
        text: '"The analysis that you led..." "Building on your architecture..."',
        speakerId: 'alex',
        emotion: 'neutral',
      },
      {
        text: 'You marked yourself as someone who notices. Someone who won\'t be an easy target.',
      },
      {
        text: 'That\'s a form of victory.',
      },
    ],
    isEnding: true,
    outcomeType: 'good',
    endingTitle: 'The Warning Shot',
    endingSummary:
      'Sometimes you don\'t need to win the battle. You just need them to know there WILL be a battle if they try again.',
  },

  // Ending 3: Manager Save
  {
    id: 'ending-manager-save',
    backgroundId: 'office',
    dialog: [
      {
        text: 'Priya went to bat for you.',
      },
      {
        text: 'She casually mentioned to Marcus that "there was some confusion about attribution" and made sure your name was in the right place.',
      },
      {
        text: 'You also noticed Alex got a very direct conversation about "team dynamics."',
      },
      {
        text: 'Good managers protect their people. Remember that when you\'re a manager.',
      },
    ],
    isEnding: true,
    outcomeType: 'good',
    endingTitle: 'The Manager Save',
    endingSummary:
      'Building trust with your manager is insurance. When you need it, it pays off.',
  },
];
