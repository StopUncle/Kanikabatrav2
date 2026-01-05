// Good Endings for The Executive Presentation

import type { Scene } from '../../../types';

export const goodEndings: Scene[] = [
  // The Star Turn - exceptional performance
  {
    id: 'ending-star',
    backgroundId: 'office',
    dialog: [
      {
        text: 'Two days later. Email from Victoria.',
      },
      {
        text: '"I was impressed with your presentation. Let\'s schedule time to discuss your role in leading this initiative—and your career trajectory."',
        speakerId: 'victoria',
        emotion: 'neutral',
      },
    ],
    nextSceneId: 'ending-star-b',
  },
  {
    id: 'ending-star-b',
    backgroundId: 'office',
    isEnding: true,
    outcomeType: 'good',
    endingTitle: 'The Star Turn',
    endingSummary: 'Fifteen minutes changed everything. You walked in as a manager. You walked out as a future executive.',
    dialog: [
      {
        text: 'Fifteen minutes changed everything.',
      },
      {
        text: 'At this level, content is expected. Presence is the differentiator. You showed both.',
        
      },
    ],
  },

  // The Breakthrough - stumbled but recovered
  {
    id: 'ending-breakthrough',
    backgroundId: 'office',
    dialog: [
      {
        text: 'The project got approved. More importantly, YOU got noticed.',
      },
      {
        text: 'Victoria asked me about your potential. I told her you\'re ready for more.',
        speakerId: 'chen',
        emotion: 'happy',
      },
    ],
    nextSceneId: 'ending-breakthrough-b',
  },
  {
    id: 'ending-breakthrough-b',
    backgroundId: 'office',
    isEnding: true,
    outcomeType: 'good',
    endingTitle: 'The Breakthrough',
    endingSummary: 'The stumble might have helped. It showed you could handle pressure. Anyone can present when everything goes right.',
    dialog: [
      {
        text: 'How you handle the unexpected matters more than how you handle the expected.',
      },
      {
        text: 'Not everyone can recover. You did.',
        
      },
    ],
  },

  // Solid Performance - professional, not flashy
  {
    id: 'ending-solid',
    backgroundId: 'office',
    dialog: [
      {
        text: 'They\'re moving forward. You did your job.',
        speakerId: 'chen',
        emotion: 'neutral',
      },
      {
        text: 'Not flashy, but effective.',
        speakerId: 'chen',
        emotion: 'neutral',
      },
    ],
    nextSceneId: 'ending-solid-b',
  },
  {
    id: 'ending-solid-b',
    backgroundId: 'office',
    isEnding: true,
    outcomeType: 'good',
    endingTitle: 'The Solid Performance',
    endingSummary: 'You didn\'t change your career. But you didn\'t hurt it either. Another chance will come.',
    dialog: [
      {
        text: 'Not every presentation is a breakthrough moment.',
      },
      {
        text: 'Some are just building blocks.',
        
      },
    ],
  },
];
