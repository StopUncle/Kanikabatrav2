// Good Endings for The Hostile Offer

import type { Scene } from '../../../types';

export const goodEndings: Scene[] = [
  // Independence Preserved - fought and won
  {
    id: 'ending-independence',
    backgroundId: 'office',
    dialog: [
      {
        text: 'Six months later. Sterling has moved on to other targets.',
      },
      {
        text: 'Your stock is up 15% since the fight.',
      },
      {
        text: 'We heard what happened. Thank you for fighting.',
        speakerId: 'employee',
        emotion: 'happy',
      },
    ],
    nextSceneId: 'ending-independence-b',
  },
  {
    id: 'ending-independence-b',
    backgroundId: 'office',
    isEnding: true,
    outcomeType: 'good',
    endingTitle: 'Independence Preserved',
    endingSummary: 'You risked everything to keep the company independent. And it worked. Some things are worth fighting for.',
    dialog: [
      {
        text: 'You risked everything. And it worked.',
      },
      {
        text: 'Some things are worth fighting for. Even when the odds say you shouldn\'t.',
        
      },
    ],
  },

  // White Knight Save - sold but on your terms
  {
    id: 'ending-white-knight',
    backgroundId: 'office',
    dialog: [
      {
        text: 'TechCorp closes the acquisition at $4.5 billion. 10% more than Sterling offered.',
      },
      {
        text: 'Alexandra keeps most of the team. You become "President, Company Division."',
      },
    ],
    nextSceneId: 'ending-white-knight-b',
  },
  {
    id: 'ending-white-knight-b',
    backgroundId: 'office',
    isEnding: true,
    outcomeType: 'good',
    endingTitle: 'The White Knight Save',
    endingSummary: 'It\'s not independence. But it\'s not destruction either. A soft landing. Sometimes the best defense is choosing your own buyer.',
    dialog: [
      {
        text: 'It\'s not independence. But it\'s not destruction either. A soft landing.',
      },
      {
        text: 'Sometimes the best defense is choosing your own buyer.',
        
      },
    ],
  },

  // Golden Parachute - negotiated exit
  {
    id: 'ending-golden-parachute',
    backgroundId: 'apartment',
    dialog: [
      {
        text: 'Part of the deal: 24-month employment guarantee. Retention bonus. Advisory role.',
      },
      {
        text: 'You walk away with $100 million.',
      },
    ],
    nextSceneId: 'ending-golden-parachute-b',
  },
  {
    id: 'ending-golden-parachute-b',
    backgroundId: 'apartment',
    isEnding: true,
    outcomeType: 'good',
    endingTitle: 'The Golden Parachute',
    endingSummary: 'You couldn\'t stop the sale. But you maximized what you got. If you\'re going to lose, lose with the best terms possible.',
    dialog: [
      {
        text: 'You couldn\'t stop the sale. But you maximized what you got.',
      },
      {
        text: 'If you\'re going to lose, lose with the best terms possible.',
        
      },
    ],
  },
];
