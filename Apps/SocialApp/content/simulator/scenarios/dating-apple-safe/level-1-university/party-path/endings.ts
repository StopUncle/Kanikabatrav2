import type { ForkScene } from '../../../../types';

/**
 * Party Path - Endings
 * Various outcomes based on player choices and awareness
 * DEFENSIVE VERSION: Focus on pattern recognition and boundary-setting
 */
export const partyEndingScenes: ForkScene[] = [
  {
    id: 'ending-party-aware',
    backgroundId: 'apartment',
    sceneType: 'dialogue',
    pathId: 'party',
    mood: 'peaceful',
    isEnding: true,
    outcomeType: 'good',
    endingTitle: 'Pattern Recognition',
    endingSummary: 'You saw through the charm. The love-bombing, the calculated intensity, the way she treats people as supply—you recognized it all. This awareness is your armor.',
    dialog: [
      {
        text: 'You leave the party with something more valuable than an invitation to Maris\'s inner circle.',
      },
      {
        text: 'Knowledge.',
      },
      {
        text: 'The signs were there. The too-fast intimacy. The way Caleb hovered like a trained pet. The mask slipping when Maris\'s ego was bruised.',
      },
      {
        text: 'Now you know what to look for. Not just with Maris—everywhere.',
      },
    ],
  },
  {
    id: 'ending-party-cautious',
    backgroundId: 'apartment',
    sceneType: 'dialogue',
    pathId: 'party',
    mood: 'peaceful',
    isEnding: true,
    outcomeType: 'neutral',
    endingTitle: 'Eyes Open',
    endingSummary: 'You see the opportunity and the danger. Proceeding carefully isn\'t naive—it\'s strategic. Just don\'t forget what you observed tonight.',
    dialog: [
      {
        text: 'Maris could be useful. Her connections are real. Her access is real.',
      },
      {
        text: 'But so are the warning signs.',
      },
      {
        text: 'You\'re going in with eyes open. That\'s more than Caleb ever had.',
      },
      {
        text: 'The question is: can you take what you need without becoming what Caleb became?',
      },
    ],
  },
  {
    id: 'ending-party-hopeful',
    backgroundId: 'apartment',
    sceneType: 'dialogue',
    pathId: 'party',
    mood: 'mysterious',
    isEnding: true,
    outcomeType: 'bad',
    endingTitle: 'Hope vs. Pattern',
    endingSummary: 'You\'re hoping Maris is different. Hoping the genuine moments were real. Hope is beautiful. It\'s also how Caleb got where he is.',
    dialog: [
      {
        text: 'Maybe you\'re wrong about Maris. Maybe the charm was real. Maybe everyone deserves a chance.',
      },
      {
        text: 'That\'s what Caleb probably thought.',
      },
      {
        text: 'The signs were there. You saw them. You chose to hope instead of observe.',
      },
      {
        text: 'Hope isn\'t a strategy. Pattern recognition is.',
      },
    ],
  },
  {
    id: 'ending-left-early',
    backgroundId: 'park',
    sceneType: 'dialogue',
    pathId: 'party',
    mood: 'peaceful',
    isEnding: true,
    outcomeType: 'good',
    endingTitle: 'Strategic Exit',
    endingSummary: 'You left before getting entangled. Sometimes the winning move is not to play. You can find connections elsewhere—healthier ones.',
    dialog: [
      {
        text: 'Fresh air. Quiet streets. No bass rattling your chest.',
      },
      {
        text: 'You didn\'t get the golden ticket. You didn\'t crack Maris\'s inner circle.',
      },
      {
        text: 'But you also didn\'t become another Caleb, hovering at the edge, waiting to be useful.',
      },
      {
        text: 'There are other parties. Other connections. Other paths that don\'t require selling pieces of yourself.',
      },
    ],
  },
];
