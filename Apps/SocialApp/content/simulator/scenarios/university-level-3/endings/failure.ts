import type { ForkScene } from '../../../types';

/**
 * Level 3 Ending: Failure
 * Exposed/rejected/destroyed. The game played you.
 */
export const failureEndings: ForkScene[] = [
  {
    id: 'ending-failure-intro',
    backgroundId: 'restaurant',
    sceneType: 'dialogue',
    pathId: 'endings',
    mood: 'tense',
    dialog: [
      {
        text: 'It happened fast. One wrong move. One weak moment.',
      },
      {
        text: 'Victoria\'s information spread. Maris withdrew her support. Harrison lost interest.',
      },
      {
        text: 'By the time you realized what was happening, it was over.',
      },
      {
        text: 'Security approaches. Polite. Firm.',
      },
      {
        text: '"We\'ve been asked to escort you out."',
        speakerId: 'security',
        emotion: 'neutral',
      },
    ],
    nextSceneId: 'ending-failure-exit',
  },
  {
    id: 'ending-failure-exit',
    backgroundId: 'restaurant',
    sceneType: 'dialogue',
    pathId: 'endings',
    mood: 'cold',
    dialog: [
      {
        text: 'The walk to the exit takes forever. Every eye on you.',
      },
      {
        text: 'Victoria raises her glass as you pass. A toast to your failure.',
        speakerId: 'victoria',
        emotion: 'smirking',
      },
      {
        text: 'Maris doesn\'t even look up. You\'re already forgotten.',
      },
      {
        text: 'Blake waits at the door. Face pale.',
        speakerId: 'blake',
        emotion: 'concerned',
      },
      {
        text: '"What happened? One minute you were up there, then—"',
        speakerId: 'blake',
        emotion: 'confused',
      },
    ],
    nextSceneId: 'ending-failure-final',
  },
  {
    id: 'ending-failure-final',
    backgroundId: 'restaurant',
    sceneType: 'dialogue',
    pathId: 'endings',
    isEnding: true,
    outcomeType: 'bad',
    endingTitle: 'Burned',
    endingSummary: 'The gala destroyed you. Your mistakes were exposed, your allies abandoned you, and the network decided you weren\'t worth the risk. The door is closed. But lessons were learned. Perhaps there\'s another path forward.',
    mood: 'cold',
    dialog: [
      {
        text: 'Outside. The cold air hits like a slap.',
      },
      {
        text: '"I underestimated them. Or overestimated myself."',
      },
      {
        text: '"It\'s just a party. It\'s not the end of the world."',
        speakerId: 'blake',
        emotion: 'concerned',
      },
      {
        text: '"No. But it might be the end of this world. For me."',
      },
      {
        text: 'The valet brings your car. The last courtesy they\'ll extend.',
      },
      {
        text: 'You played the game. The game won. This time.',
        speakerId: 'inner-voice',
        emotion: 'knowing',
      },
    ],
  },
];
