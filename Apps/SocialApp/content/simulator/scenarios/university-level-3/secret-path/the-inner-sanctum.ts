import type { ForkScene } from '../../../types';

/**
 * Secret Mission: The Architect's Gambit - The Inner Sanctum
 * The real game revealed. What the network actually is.
 */
export const innerSanctumScenes: ForkScene[] = [
  {
    id: 'secret-inner-sanctum-intro',
    backgroundId: 'restaurant',
    sceneType: 'dialogue',
    pathId: 'secret',
    mood: 'cold',
    dialog: [
      {
        text: '"The gala wasn\'t a party. It was a test. Every guest was being evaluated."',
        speakerId: 'maris',
        emotion: 'neutral',
      },
      {
        text: '"Not by me. Not by Harrison. By everyone. Constantly."',
        speakerId: 'maris',
        emotion: 'knowing',
      },
      {
        text: 'She moves to a laptop. Opens files. Photos. Profiles.',
      },
      {
        text: '"The network isn\'t local. It\'s global. Every city. Every industry. Connected."',
        speakerId: 'maris',
        emotion: 'cold',
      },
    ],
    nextSceneId: 'secret-truth-revealed',
  },
  {
    id: 'secret-truth-revealed',
    backgroundId: 'restaurant',
    sceneType: 'dialogue',
    pathId: 'secret',
    mood: 'mysterious',
    dialog: [
      {
        text: '"Harrison isn\'t the top. He\'s a lieutenant. Like me. Like Victoria, though she pretends otherwise."',
        speakerId: 'maris',
        emotion: 'neutral',
      },
      {
        text: '"Above us... there are people you\'ll never meet. People who make decisions."',
        speakerId: 'maris',
        emotion: 'cold',
      },
      {
        text: 'She turns. Direct.',
      },
      {
        text: '"The Island isn\'t a networking event. It\'s where they watch us. Evaluate us."',
        speakerId: 'maris',
        emotion: 'knowing',
      },
      {
        text: 'Tiers within tiers. How deep does this go?',
        speakerId: 'inner-voice',
        emotion: 'concerned',
      },
    ],
    dialogueChoices: [
      {
        id: 'truth-trap',
        text: '"This sounds... insane. Are you saying there\'s some secret society controlling everything?"',
        nextSceneId: 'secret-maris-explains',
        isOptimal: false,
        tactic: 'skeptical',
        reaction: {
          text: '"Not controlling. Influencing. There\'s a difference. And it\'s not insane. It\'s efficient."',
          emotion: 'cold',
          bodyLanguage: 'Your skepticism disappointed her.',
          scoreImpact: -10,
        },
      },
      {
        id: 'truth-subtle',
        text: '"Why are you telling me this? What do you want from me?"',
        nextSceneId: 'secret-maris-explains',
        isOptimal: false,
        tactic: 'suspicious',
        reaction: {
          text: '"Finally, the right question. You\'re learning."',
          emotion: 'knowing',
          bodyLanguage: 'Suspicion is smart. She expected it.',
          scoreImpact: 5,
        },
      },
      {
        id: 'truth-close',
        text: '"You\'re being evaluated too. Right now. Showing me this."',
        nextSceneId: 'secret-maris-explains',
        isOptimal: false,
        tactic: 'observant',
        reaction: {
          text: 'She pauses. "Yes. I am. This is my test too."',
          emotion: 'neutral',
          bodyLanguage: 'You saw through it. She respects that.',
          scoreImpact: 15,
        },
      },
      {
        id: 'truth-optimal',
        text: '"You\'re not just recruiting me. You\'re building your own network within the network."',
        nextSceneId: 'secret-maris-explains',
        isOptimal: true,
        tactic: 'see-strategy',
        reaction: {
          text: 'For the first time, she looks genuinely surprised. "...Yes. That\'s exactly what I\'m doing."',
          emotion: 'curious',
          bodyLanguage: 'You saw her long game. No one else has.',
          scoreImpact: 25,
        },
      },
    ],
  },
  {
    id: 'secret-maris-explains',
    backgroundId: 'restaurant',
    sceneType: 'dialogue',
    pathId: 'secret',
    mood: 'cold',
    dialog: [
      {
        text: '"The people above Harrison... they\'re getting old. Comfortable. Static."',
        speakerId: 'maris',
        emotion: 'knowing',
      },
      {
        text: '"In ten years, there will be a transition. New leadership. New structure."',
        speakerId: 'maris',
        emotion: 'neutral',
      },
      {
        text: '"I intend to be ready. With people I\'ve chosen. People who understand."',
        speakerId: 'maris',
        emotion: 'cold',
      },
      {
        text: 'She looks at you. Evaluating one final time.',
      },
      {
        text: '"I\'m asking if you want to be part of that. Not the current network. The next one."',
        speakerId: 'maris',
        emotion: 'seductive',
      },
    ],
    nextSceneId: 'secret-final-test-intro',
  },
];
