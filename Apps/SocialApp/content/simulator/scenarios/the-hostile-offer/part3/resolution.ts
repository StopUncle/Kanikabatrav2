// Part 3: The Resolution - Final decision and outcome

import type { Scene } from '../../../types';

export const resolutionScenes: Scene[] = [
  // Scene 9: Final Board Meeting
  {
    id: 'hostile-9-final',
    backgroundId: 'meeting-room',
    dialog: [
      {
        text: '60 days later. Proxy deadline approaching.',
      },
      {
        text: 'We need to make a final recommendation.',
        speakerId: 'victoria',
        emotion: 'neutral',
      },
    ],
    nextSceneId: 'hostile-9b-final',
  },
  {
    id: 'hostile-9b-final',
    backgroundId: 'meeting-room',
    dialog: [
      {
        text: 'Sterling\'s proxy campaign is gaining support. Latest shareholder polling shows: 45% support Sterling, 35% support management, 20% undecided.',
        speakerId: 'victoria',
        emotion: 'concerned',
      },
      {
        text: 'The math is tight.',
        
      },
    ],
    nextSceneId: 'hostile-9c-final',
  },
  {
    id: 'hostile-9c-final',
    backgroundId: 'meeting-room',
    dialog: [
      {
        text: 'If we recommend rejection and shareholders override us, this entire board will be replaced.',
        speakerId: 'victoria',
        emotion: 'neutral',
      },
      {
        text: 'If we recommend acceptance, we\'re selling the company.',
        speakerId: 'victoria',
        emotion: 'neutral',
      },
      {
        text: 'The choice is yours.',
        speakerId: 'victoria',
        emotion: 'neutral',
      },
      {
        text: 'Final decision. Everything rides on this.',
        
      },
    ],
    choices: [
      {
        id: 'hostile-9-a',
        text: 'Fight to the end: "We recommend rejection. Let shareholders decide."',
        nextSceneId: 'hostile-10-vote-fight',
        feedback: 'ALL IN: You\'re betting everything on shareholder support.',
        xpBonus: 20,
      },
      {
        id: 'hostile-9-b',
        text: 'Negotiate: "Let\'s re-engage Sterling. See if we can get better terms."',
        nextSceneId: 'hostile-10-negotiate',
        feedback: 'PRAGMATIC: You\'re trying to get more while accepting reality.',
        xpBonus: 15,
      },
      {
        id: 'hostile-9-c',
        text: 'White knight: "Alexandra\'s offer at $4.5B is the recommendation."',
        nextSceneId: 'ending-white-knight',
        feedback: 'STRATEGIC: You chose your buyer. Better terms, less destruction.',
        xpBonus: 15,
      },
      {
        id: 'hostile-9-d',
        text: 'Accept Sterling: "The shareholder support isn\'t there. We recommend acceptance."',
        nextSceneId: 'ending-sold',
        feedback: 'SURRENDER: You read the room. Sometimes that\'s wisdom.',
        xpBonus: 10,
      },
    ],
  },

  // Scene 10: The Vote - Fight Path
  {
    id: 'hostile-10-vote-fight',
    backgroundId: 'meeting-room',
    dialog: [
      {
        text: 'The proxy vote is counted. Shareholders have decided.',
      },
      {
        text: 'Every fraction of a percent matters now.',
        
      },
    ],
    choices: [
      {
        id: 'hostile-10-a',
        text: 'The results are in... 53% support the board.',
        nextSceneId: 'ending-independence',
        feedback: 'You won. Against a hostile acquirer with billions.',
        xpBonus: 25,
        isOptimal: true,
      },
      {
        id: 'hostile-10-b',
        text: 'The results are in... 57% support Sterling.',
        nextSceneId: 'ending-hostile-loss',
        feedback: 'You lost. The shareholders chose the premium.',
        xpBonus: 10,
      },
    ],
  },

  // Scene 10: Negotiate Final
  {
    id: 'hostile-10-negotiate',
    backgroundId: 'office',
    dialog: [
      {
        text: 'Victor Sterling takes one more call.',
      },
      {
        text: 'Final offer. $4.5 billion. 18-month employment protection. Golden parachute for executives.',
        speakerId: 'victor',
        emotion: 'neutral',
      },
      {
        text: 'Take it or we go to the shareholders.',
        speakerId: 'victor',
        emotion: 'cold',
      },
      {
        text: 'He\'s giving you something. Is it enough?',
        
      },
    ],
    choices: [
      {
        id: 'hostile-10n-a',
        text: '"Deal. We\'ll recommend."',
        nextSceneId: 'ending-golden-parachute',
        feedback: 'You got better terms. That\'s something.',
        xpBonus: 15,
      },
      {
        id: 'hostile-10n-b',
        text: '"Not enough. We\'ll take our chances with shareholders."',
        nextSceneId: 'hostile-10-vote-fight',
        feedback: 'Last stand. Bold.',
        xpBonus: 10,
      },
    ],
  },

  // Quick accept ending scene
  {
    id: 'ending-quick-accept',
    backgroundId: 'meeting-room',
    dialog: [
      {
        text: 'The board accepts your recommendation. Sterling gets their deal.',
      },
      {
        text: 'The deal closes in 90 days. You receive your $85 million. And a lot of time to think.',
      },
    ],
    nextSceneId: 'ending-quick-accept-b',
  },
  {
    id: 'ending-quick-accept-b',
    backgroundId: 'apartment',
    isEnding: true,
    outcomeType: 'neutral',
    endingTitle: 'The Quick Surrender',
    endingSummary: 'You didn\'t fight. Maybe that was wise. Maybe it was fear. Only time will tell which.',
    dialog: [
      {
        text: 'You got paid. The company you built will be dismantled.',
      },
      {
        text: 'Some fights aren\'t worth having. Was this one of them?',
        
      },
    ],
  },
];
