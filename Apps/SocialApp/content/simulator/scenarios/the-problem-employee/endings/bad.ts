// Bad Endings for The Problem Employee

import type { Scene } from '../../../types';

export const badEndings: Scene[] = [
  // The Botched Exit
  {
    id: 'ending-botched-exit',
    backgroundId: 'office',
    dialog: [
      {
        text: 'Email from HR Legal:',
      },
      {
        text: '"Casey has filed a complaint alleging wrongful termination. We need to review your documentation."',
      },
      {
        text: 'The paper trail wasn\'t strong enough. Or the process wasn\'t clean enough. Or both.',
        
      },
      {
        text: 'Months of legal review ahead. Your credibility with leadership is damaged.',
      },
    ],
    isEnding: true,
    outcomeType: 'bad',
    endingTitle: 'The Botched Exit',
    endingSummary: 'Document everything. Follow the process. HR and lawyers exist for a reason. You moved too fast without the paper trail to support it. Now Casey has leverage, and you have a legal headache that will define your year.',
  },

  // Team Exodus
  {
    id: 'ending-team-exodus',
    backgroundId: 'office',
    dialog: [
      {
        text: 'Morgan\'s resignation letter lands in your inbox.',
      },
      {
        text: 'I\'ve enjoyed working here, but I\'ve accepted another opportunity. I hope the situation improves.',
        speakerId: 'morgan',
        emotion: 'neutral',
      },
      {
        text: 'They were waiting to see if you\'d act. You didn\'t act fast enough. Now you\'ve lost someone good to keep someone bad.',
        
      },
    ],
    isEnding: true,
    outcomeType: 'bad',
    endingTitle: 'Team Exodus',
    endingSummary: 'Inaction has a cost. Your best people won\'t wait forever. Morgan left because you tolerated mediocrity—or toxicity—for too long. Your A-players left before your problem employee did. That\'s the price of avoidance.',
  },

  // The Retaliation
  {
    id: 'ending-retaliation',
    backgroundId: 'office',
    dialog: [
      {
        text: 'Casey\'s LinkedIn post goes viral.',
      },
      {
        text: '"Just got let go after 5 years at [Company]. My crime? Being \'too direct.\' Amazing how top performers get punished for having standards."',
      },
      {
        text: 'The narrative war begins. They\'re positioning themselves as the victim.',
        
      },
    ],
    isEnding: true,
    outcomeType: 'bad',
    endingTitle: 'The Retaliation',
    endingSummary: 'Toxic stars don\'t go quietly. Be prepared for the aftermath. Casey is spinning the story publicly, and some people will believe them. Your documentation protects you legally, but the reputation damage is already happening.',
  },
];
