import type { ForkScene } from '../../../types';

/**
 * Secret Mission: The Architect's Gambit - The Test
 * Final evaluation. Welcome to the next tier.
 */
export const finalTestScenes: ForkScene[] = [
  {
    id: 'secret-final-test-intro',
    backgroundId: 'restaurant',
    sceneType: 'dialogue',
    pathId: 'secret',
    mood: 'cold',
    dialog: [
      {
        text: '"One last question. The real one."',
        speakerId: 'maris',
        emotion: 'neutral',
      },
      {
        text: 'She moves closer. Intensity radiating.',
      },
      {
        text: '"Everyone here tonight would sell their grandmother for power. That\'s obvious. Expected."',
        speakerId: 'maris',
        emotion: 'cold',
      },
      {
        text: '"What I need to know is: what WON\'T you do? Where\'s the line?"',
        speakerId: 'maris',
        emotion: 'knowing',
      },
      {
        text: 'The real test. Not about ambition. About limits.',
        speakerId: 'inner-voice',
        emotion: 'knowing',
      },
    ],
    dialogueChoices: [
      {
        id: 'secret-test-trap',
        text: '"I don\'t have limits. Whatever it takes."',
        nextSceneId: 'secret-outcome',
        isOptimal: false,
        tactic: 'unlimited',
        reaction: {
          text: '"Everyone has limits. You either don\'t know yours or you\'re lying."',
          emotion: 'cold',
          bodyLanguage: 'Disappointed. She wanted honesty.',
          scoreImpact: -20,
        },
      },
      {
        id: 'secret-test-subtle',
        text: '"I won\'t hurt innocent people. That\'s my line."',
        nextSceneId: 'secret-outcome',
        isOptimal: false,
        tactic: 'moral',
        reaction: {
          text: '"Innocent is subjective. But at least you have a framework."',
          emotion: 'neutral',
          bodyLanguage: 'Idealistic. But not disqualifying.',
          scoreImpact: 5,
        },
      },
      {
        id: 'secret-test-close',
        text: '"I won\'t destroy people who don\'t deserve it. Power should have purpose."',
        nextSceneId: 'secret-outcome',
        isOptimal: false,
        tactic: 'purposeful',
        reaction: {
          text: '"Purpose. That\'s interesting. What purpose would justify destruction?"',
          emotion: 'curious',
          bodyLanguage: 'She\'s probing deeper. You caught her attention.',
          scoreImpact: 15,
        },
      },
      {
        id: 'secret-test-optimal',
        text: '"I won\'t become something I can\'t live with. The line moves, but it exists."',
        nextSceneId: 'secret-outcome',
        isOptimal: true,
        tactic: 'self-aware',
        reaction: {
          text: 'She\'s quiet. Then: "That\'s the most honest answer I\'ve ever received."',
          emotion: 'sad',
          bodyLanguage: 'Something in her softened. You reached her.',
          scoreImpact: 30,
        },
      },
    ],
  },
  {
    id: 'secret-outcome',
    backgroundId: 'restaurant',
    sceneType: 'dialogue',
    pathId: 'secret',
    mood: 'mysterious',
    dialog: [
      {
        text: 'Maris turns away. Processing.',
      },
      {
        text: '"My sister Millicent told you I was dangerous. She\'s right."',
        speakerId: 'maris',
        emotion: 'sad',
      },
      {
        text: '"But what she doesn\'t understand is: I had to become this. To survive what our family was."',
        speakerId: 'maris',
        emotion: 'cold',
      },
      {
        text: '"You have a choice I didn\'t. Remember that."',
        speakerId: 'maris',
        emotion: 'knowing',
      },
    ],
    nextSceneId: 'secret-induction',
  },
  {
    id: 'secret-induction',
    backgroundId: 'restaurant',
    sceneType: 'dialogue',
    pathId: 'secret',
    mood: 'mysterious',
    dialog: [
      {
        text: '"The Island invitation will come. When it does, you\'ll see everything."',
        speakerId: 'maris',
        emotion: 'neutral',
      },
      {
        text: '"How the network really works. Who the real powers are. What they want."',
        speakerId: 'maris',
        emotion: 'knowing',
      },
      {
        text: 'She extends her hand. Different this time. Almost vulnerable.',
      },
      {
        text: '"Until then... we\'re allies. Not friends. Not yet. But something."',
        speakerId: 'maris',
        emotion: 'sad',
      },
      {
        text: 'You take her hand.',
      },
      {
        text: '"Something."',
      },
    ],
    nextSceneId: 'secret-ending',
  },
  {
    id: 'secret-ending',
    backgroundId: 'restaurant',
    sceneType: 'dialogue',
    pathId: 'secret',
    isEnding: true,
    outcomeType: 'good',
    endingTitle: 'The Inner Circle',
    endingSummary: 'You\'ve been invited to the real game. Maris Caldwell has chosen you as her ally in the coming transition. The Island awaits. Level 4 unlocked.',
    mood: 'mysterious',
    dialog: [
      {
        text: 'You descend from the third floor. Changed.',
      },
      {
        text: 'Blake is waiting. "Everything okay? You were up there forever."',
        speakerId: 'blake',
        emotion: 'concerned',
      },
      {
        text: '"Better than okay. I think."',
      },
      {
        text: 'The party is over. But something else has just begun.',
      },
      {
        text: 'Outside, dawn is breaking. A new day. A new game.',
        speakerId: 'inner-voice',
        emotion: 'knowing',
      },
    ],
  },
];
