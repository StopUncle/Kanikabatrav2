// Bad Endings for The Raise Negotiation

import type { Scene } from '../../../types';

export const badEndings: Scene[] = [
  // Defeat - Got nothing
  {
    id: 'ending-defeat',
    backgroundId: 'apartment',
    dialog: [
      {
        text: 'They said no. And you accepted it.',
      },
      {
        text: 'You\'re still at $82K. Still underpaid. Now they know you\'ll accept it.',
      },
      {
        text: 'You asked without leverage. Asking isn\'t enough. You need options.',
      },
    ],
    isEnding: true,
    outcomeType: 'bad',
    endingTitle: 'The Defeat',
    endingSummary: 'No raise. No alternative. You stayed because you had nowhere else to go. Build your BATNA before you negotiate, not during. Loyalty without leverage is exploitation.',
  },

  // Burned Bridge - Escalated and lost
  {
    id: 'ending-burned-bridge',
    backgroundId: 'office',
    dialog: [
      {
        text: 'You went over Derek\'s head. It didn\'t work.',
      },
      {
        text: 'Every interaction is colder now. Your next project? Less visible. Your next review? "Meets expectations."',
      },
      {
        text: 'Escalation is a one-time weapon. Once fired, it doesn\'t reload.',
      },
    ],
    isEnding: true,
    outcomeType: 'bad',
    endingTitle: 'The Burned Bridge',
    endingSummary: 'You escalated and lost. Now you\'re at the same salary with a damaged relationship. Know when to escalate. And know when to walk instead. Some fights aren\'t worth winning from the inside.',
  },

  // Bluff Called
  {
    id: 'ending-bluff-called',
    backgroundId: 'office',
    dialog: [
      {
        text: '"If you have a better offer, you should take it. We can\'t match outside offers."',
        speakerId: 'derek',
        emotion: 'cold',
      },
      {
        text: 'They called your bluff. You don\'t have an offer.',
      },
      {
        text: 'You stay at $82K. Everyone knows you threatened to leave. And didn\'t.',
      },
    ],
    isEnding: true,
    outcomeType: 'bad',
    endingTitle: 'The Bluff Called',
    endingSummary: 'Never bluff with a BATNA you don\'t have. If you\'re going to threaten to leave, be ready to leave. Your credibility is gone. They know you\'ll stay no matter what.',
  },
];
