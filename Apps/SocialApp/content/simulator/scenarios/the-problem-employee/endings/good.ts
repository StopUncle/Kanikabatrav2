// Good Endings for The Problem Employee

import type { Scene } from '../../../types';

export const goodEndings: Scene[] = [
  // Successful Rehabilitation
  {
    id: 'ending-rehabilitation',
    backgroundId: 'office',
    dialog: [
      {
        text: 'Six months later. Casey is hitting their targets. The team has stabilized.',
      },
      {
        text: 'I know things were rough. Thank you for not giving up on me.',
        speakerId: 'casey',
        emotion: 'happy',
      },
      {
        text: 'Sometimes coaching works. Sometimes people just need clarity and support.',
        
      },
    ],
    isEnding: true,
    outcomeType: 'good',
    endingTitle: 'Successful Rehabilitation',
    endingSummary: 'Not every problem employee is a termination. Some just need direction they never got before. You diagnosed the issue, provided clear expectations and coaching, and Casey turned it around. Leadership is knowing when to coach and when to cut.',
  },

  // Clean Exit
  {
    id: 'ending-clean-exit',
    backgroundId: 'office',
    dialog: [
      {
        text: 'Casey is gone. The team is relieved. No legal issues. No drama.',
      },
      {
        text: 'You handled that well. It\'s not easy, but it\'s one of the most important parts of the job.',
        speakerId: 'alex',
        emotion: 'happy',
      },
      {
        text: 'Firing someone with dignity and documentation. That\'s leadership.',
        
      },
    ],
    isEnding: true,
    outcomeType: 'good',
    endingTitle: 'The Clean Exit',
    endingSummary: 'Sometimes the kindest thing is a clean ending—for them and for everyone around them. You built the documentation, followed the process, and executed the termination professionally. Your A-players are still here because they saw you take action.',
  },

  // The Resignation
  {
    id: 'ending-resignation',
    backgroundId: 'meeting-room',
    dialog: [
      {
        text: 'Casey resigned before the PIP concluded.',
      },
      {
        text: 'I think this isn\'t the right fit. I\'m going to try something else.',
        speakerId: 'casey',
        emotion: 'neutral',
      },
      {
        text: 'They made the choice themselves. That\'s often the best outcome for everyone.',
        
      },
    ],
    isEnding: true,
    outcomeType: 'good',
    endingTitle: 'The Resignation',
    endingSummary: 'Sometimes people just need permission to leave. A hard conversation can give them that. Casey read the writing on the wall and chose to exit on their own terms. No termination, no drama, no legal risk. Clean.',
  },
];
