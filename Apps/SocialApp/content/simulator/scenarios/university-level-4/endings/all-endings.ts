import type { ForkScene } from '../../../types';

/**
 * Level 4 Endings
 * Four paths, four outcomes
 */
export const endingScenes: ForkScene[] = [
  // Dark Network Ending - Revenge Path
  {
    id: 'ending-dark-network',
    backgroundId: 'office',
    sceneType: 'dialogue',
    pathId: 'endings',
    chapter: { name: 'The Invitation', index: 6, total: 6 },
    mood: 'cold',
    dialog: [
      {
        text: 'The jet takes you home. Alone.',
      },
      {
        text: 'Blake is gone. Somewhere. You don\'t know where.',
      },
      {
        text: 'Your phone buzzes. Maris.',
      },
      {
        text: '"First assignment incoming. Don\'t disappoint."',
      },
      {
        text: 'The network has you now. And it never lets go.',
      },
      {
        text: 'You got what you wanted. Was it worth what you became?',
        speakerId: 'inner-voice',
        emotion: 'concerned',
      },
    ],
    isEnding: true,
    outcomeType: 'bad',
    endingTitle: 'The Dark Network',
    endingSummary:
      'You chose power over loyalty. Blake is gone—destroyed by your words. Harrison welcomed you into the network, but at the cost of your humanity. Maris will mentor you now, shaping you into what she became. The game never ends... and neither do the demands.',
  },

  // Observer Ending - Moral Path
  {
    id: 'ending-observer',
    backgroundId: 'apartment',
    sceneType: 'dialogue',
    pathId: 'endings',
    chapter: { name: 'The Invitation', index: 6, total: 6 },
    mood: 'mysterious',
    dialog: [
      {
        text: 'The jet takes you home. Blake sits across from you. Silent.',
      },
      {
        text: 'Neither in nor out. Watchers on the edge.',
      },
      {
        text: '"What happens now?" Blake asks.',
        speakerId: 'blake',
        emotion: 'neutral',
      },
      {
        text: '"We watch. We learn. We wait."',
      },
      {
        text: '"For what?"',
        speakerId: 'blake',
        emotion: 'curious',
      },
      {
        text: '"For the right moment to choose again."',
      },
      {
        text: 'You held your principles. Time will tell if that was wisdom or foolishness.',
        speakerId: 'inner-voice',
        emotion: 'neutral',
      },
    ],
    isEnding: true,
    outcomeType: 'neutral',
    endingTitle: 'The Observer',
    endingSummary:
      'You refused to play Harrison\'s game. Blake betrayed you, but you didn\'t retaliate. Now you exist in the space between—not part of the network, but not forgotten either. Harrison will keep watching. The question remains: will you eventually step inside, or build something of your own?',
  },

  // Unity Ending - Alliance Path
  {
    id: 'ending-unity',
    backgroundId: 'apartment',
    sceneType: 'dialogue',
    pathId: 'endings',
    chapter: { name: 'The Invitation', index: 6, total: 6 },
    mood: 'peaceful',
    dialog: [
      {
        text: 'The jet takes you home. Blake sits beside you. Closer than before.',
      },
      {
        text: '"I still don\'t understand why you forgave me."',
        speakerId: 'blake',
        emotion: 'sad',
      },
      {
        text: '"Because Harrison wanted me to destroy you. That would have been letting him win."',
      },
      {
        text: 'Blake nods slowly. Understanding dawning.',
        speakerId: 'blake',
        emotion: 'neutral',
      },
      {
        text: '"So... we\'re partners now. Working for Millicent."',
        speakerId: 'blake',
        emotion: 'neutral',
      },
      {
        text: '"Partners. Building something different."',
      },
      {
        text: 'Millicent wants to reform the system. With you, she might actually do it.',
        speakerId: 'inner-voice',
        emotion: 'knowing',
      },
    ],
    isEnding: true,
    outcomeType: 'good',
    endingTitle: 'The Alliance',
    endingSummary:
      'You chose loyalty over power, forgiveness over revenge. Blake betrayed you in a moment of weakness, but you saw past it to the friend underneath. Together, you\'ll work under Millicent—the reformer—trying to change the network from within. The path is harder, but you\'re not walking it alone.',
  },

  // Architect Ending - Creative Path
  {
    id: 'ending-architect',
    backgroundId: 'office',
    sceneType: 'dialogue',
    pathId: 'endings',
    chapter: { name: 'The Invitation', index: 6, total: 6 },
    mood: 'professional',
    dialog: [
      {
        text: 'The jet takes you home. Blake reviews documents beside you.',
      },
      {
        text: '"Direct reports to Harrison Cole." He shakes his head.',
        speakerId: 'blake',
        emotion: 'happy',
      },
      {
        text: '"Two months ago, I was invisible. Now I\'m in the inner circle."',
        speakerId: 'blake',
        emotion: 'knowing',
      },
      {
        text: '"We built something new. That\'s what architects do."',
      },
      {
        text: 'Blake smiles. Real. "Partners."',
        speakerId: 'blake',
        emotion: 'happy',
      },
      {
        text: '"Partners. Now let\'s figure out what kind of empire we\'re going to build."',
      },
      {
        text: 'The Architect saw himself in you. Now it\'s time to prove you\'re not just a copy—you\'re an evolution.',
        speakerId: 'inner-voice',
        emotion: 'knowing',
      },
    ],
    isEnding: true,
    outcomeType: 'good',
    endingTitle: 'The Architect\'s Heir',
    endingSummary:
      'You didn\'t play Harrison\'s game—you rewrote it. When he demanded you choose between revenge and mercy, you offered partnership. When he expected destruction, you proposed construction. Harrison saw what you did and recognized the architecture. Now you report directly to him, not as a pawn, but as a potential successor. The question is: what kind of empire will you build?',
  },
];
