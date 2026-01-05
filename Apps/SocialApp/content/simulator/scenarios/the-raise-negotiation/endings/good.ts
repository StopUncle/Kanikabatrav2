// Good Endings for The Raise Negotiation

import type { Scene } from '../../../types';

export const goodEndings: Scene[] = [
  // Full Win - Got everything
  {
    id: 'ending-full-win',
    backgroundId: 'office',
    dialog: [
      {
        text: '$98K. Higher than you asked for. They were always able to pay this. They just didn\'t want to.',
      },
      {
        text: 'You sign the paperwork. HR confirms in writing. It\'s official.',
      },
      {
        text: 'You\'re not paid what you\'re worth. You\'re paid what you negotiate.',
      },
    ],
    isEnding: true,
    outcomeType: 'good',
    endingTitle: 'The Full Win',
    endingSummary: 'You got everything you asked for - and more. BATNA deployed, leverage maximized. The conversation took 30 minutes. The preparation took a week. The positioning took months. This is how compensation works. Not fairness. Not loyalty. Leverage.',
  },

  // Strong Win - Got most of it
  {
    id: 'ending-strong-win',
    backgroundId: 'office',
    dialog: [
      {
        text: '$92K. Not everything you asked for. But $10K more than yesterday.',
      },
      {
        text: 'And more importantly: you\'ve established yourself as someone who negotiates. Next time, they\'ll remember.',
      },
      {
        text: 'Every negotiation sets the baseline for the next one. You just raised yours.',
      },
    ],
    isEnding: true,
    outcomeType: 'good',
    endingTitle: 'The Strong Win',
    endingSummary: 'You pushed back on the first offer and won. Not the full ask, but significant movement. You\'ve established that you negotiate, you know your worth, and you have options. That reputation pays dividends in every future conversation.',
  },

  // Creative Win - Non-salary compensation
  {
    id: 'ending-creative-win',
    backgroundId: 'office',
    dialog: [
      {
        text: '$89K base. "Senior" in front of your title. An extra week of PTO.',
      },
      {
        text: 'They couldn\'t move much on base. So you got creative.',
      },
      {
        text: 'Compensation isn\'t just salary. The title opens doors. Time has real value. You negotiated the whole picture.',
      },
    ],
    isEnding: true,
    outcomeType: 'good',
    endingTitle: 'The Creative Win',
    endingSummary: 'When base salary hit its limit, you expanded the negotiation. Title, PTO, equity - the total package matters more than any single number. Smart negotiators think beyond the obvious. You played the full board.',
  },

  // Escalation Win - Went above manager
  {
    id: 'ending-escalation-win',
    backgroundId: 'office',
    dialog: [
      {
        text: 'The VP approved $94K. Your manager was bypassed, but the money is real.',
      },
      {
        text: 'Derek\'s handshake is a little colder now. But $12K a year buys a lot of awkward silences.',
      },
      {
        text: 'Sometimes the bridge needs burning. You made the call and it worked.',
      },
    ],
    isEnding: true,
    outcomeType: 'good',
    endingTitle: 'The Escalation Win',
    endingSummary: 'You went nuclear - above your manager\'s head to the VP. The risk paid off. The relationship with Derek is strained, but you got paid. Some victories come with scars. Collect the check and watch your back.',
  },

  // HR Win
  {
    id: 'ending-hr-win',
    backgroundId: 'office',
    dialog: [
      {
        text: '$90K. HR came through. Not because they like you - because retention is their metric.',
      },
      {
        text: 'You framed it as their problem. They solved it.',
      },
      {
        text: 'HR doesn\'t fight for employees. HR fights for the company. You just made your fight their fight.',
      },
    ],
    isEnding: true,
    outcomeType: 'good',
    endingTitle: 'The HR Win',
    endingSummary: 'You took your case to HR as a retention risk. They ran the numbers: replacing you costs more than paying you. Pure economics. You understood the game and played it their way.',
  },

  // Exit Win - Left for better offer
  {
    id: 'ending-exit-win',
    backgroundId: 'office',
    dialog: [
      {
        text: 'Two weeks notice. Professional handoff. No drama.',
      },
      {
        text: 'New job at $100K. That\'s 22% more than you were making.',
      },
      {
        text: 'You didn\'t get a raise. You got something better: a reminder that you don\'t need permission to be paid what you\'re worth.',
      },
    ],
    isEnding: true,
    outcomeType: 'good',
    endingTitle: 'The Exit Win',
    endingSummary: 'They didn\'t value you. The market did. Sometimes the best negotiation outcome is learning you should have left sooner. New company, new title, new money. No regrets.',
  },
];
