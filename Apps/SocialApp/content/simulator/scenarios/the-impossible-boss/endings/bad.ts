// Bad Endings for The Impossible Boss

import type { Scene } from '../../../types';

export const badEndings: Scene[] = [
  // The Burnout
  {
    id: 'ending-burnout',
    backgroundId: 'apartment',
    dialog: [
      {
        text: 'Every day is a battle you\'re losing.',
      },
      {
        text: 'The micromanaging hasn\'t stopped. The credit keeps being stolen. The hostility keeps escalating.',
      },
      {
        text: 'And you\'re exhausted.',
      },
      {
        text: 'You fought the current. It won.',
        
      },
    ],
    isEnding: true,
    outcomeType: 'bad',
    endingTitle: 'The Burnout',
    endingSummary: 'Not every boss can be managed. Sometimes the only move is to leave. You tried to fight without adapting, and the daily grind wore you down. Burnout is the price of fighting unwinnable battles.',
  },

  // The Trap
  {
    id: 'ending-trap',
    backgroundId: 'apartment',
    dialog: [
      {
        text: 'Jordan is still here. So are you.',
      },
      {
        text: 'But you never updated your resume. Never took recruiter calls. Never built the network.',
      },
      {
        text: 'Now leaving is harder than staying. And staying is destroying you.',
      },
      {
        text: 'You waited too long to prepare. The trap closed slowly.',
        
      },
    ],
    isEnding: true,
    outcomeType: 'bad',
    endingTitle: 'The Trap',
    endingSummary: 'Always have an exit. Even if you never use it. The option to leave is power. You stayed because you had nowhere to go, and now you\'re stuck. Golden handcuffs are still handcuffs.',
  },

  // The Retaliation
  {
    id: 'ending-retaliation',
    backgroundId: 'office',
    dialog: [
      {
        text: 'You went to HR. Jordan found out.',
      },
      {
        text: 'Now every interaction is ice. Every assignment is designed to fail you. Every review is carefully weaponized.',
      },
      {
        text: 'Escalation without protection is suicide. You had the right complaint. Wrong execution.',
        
      },
    ],
    isEnding: true,
    outcomeType: 'bad',
    endingTitle: 'The Retaliation',
    endingSummary: 'HR protects the company, not you. Never escalate without documentation, witnesses, and an exit plan. You went in unprepared, and now you\'re paying for it. The complaint is on file—but so is your target status.',
  },
];
