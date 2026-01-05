import type { ForkScene } from '../../../types';

/**
 * Mission 14: The Ghost Returns - Tyler Variant
 * Tyler Vance - dramatic, unpredictable. Might help or destroy on a whim.
 * Triggered if: Player burned Tyler in L2 Club Path
 */
export const tylerGhostScenes: ForkScene[] = [
  {
    id: 'tyler-ghost-appearance',
    backgroundId: 'restaurant',
    sceneType: 'dialogue',
    pathId: 'ghost',
    chapter: { name: 'Mission 14: The Ghost Returns', index: 1, total: 4 },
    mood: 'party',
    dialog: [
      {
        text: 'Tyler Vance again. But this time his energy is different.',
      },
      {
        text: 'He\'s louder. More animated. Glass in hand, eyes a little too bright.',
        speakerId: 'tyler',
        emotion: 'happy',
      },
      {
        text: '"DARLING!" He practically shouts it across the room.',
        speakerId: 'tyler',
        emotion: 'happy',
      },
      {
        text: 'This could go very well or very badly.',
        speakerId: 'inner-voice',
        emotion: 'concerned',
      },
    ],
    nextSceneId: 'tyler-public-scene',
  },
  {
    id: 'tyler-public-scene',
    backgroundId: 'restaurant',
    sceneType: 'dialogue',
    pathId: 'ghost',
    mood: 'party',
    dialog: [
      {
        text: 'He descends on you like a hurricane. Everyone is watching.',
      },
      {
        text: '"Look who it is! My absolutely FAVORITE social climber!"',
        speakerId: 'tyler',
        emotion: 'happy',
      },
      {
        text: 'His voice carries. People turn. Victoria. Elena. Even Maris.',
      },
      {
        text: '"I was just telling everyone about that TIME we had. You remember."',
        speakerId: 'tyler',
        emotion: 'smirking',
      },
    ],
    nextSceneId: 'tyler-history',
  },
  {
    id: 'tyler-history',
    backgroundId: 'restaurant',
    sceneType: 'dialogue',
    pathId: 'ghost',
    mood: 'tense',
    dialog: [
      {
        text: '"The club. The contacts. How you used me to get to my sister\'s network."',
        speakerId: 'tyler',
        emotion: 'knowing',
      },
      {
        text: '"I mean, BRILLIANTLY done. Truly. I didn\'t even see it coming."',
        speakerId: 'tyler',
        emotion: 'smirking',
      },
      {
        text: 'He\'s smiling but his eyes are dangerous.',
      },
      {
        text: '"The question is: should I be impressed or offended?"',
        speakerId: 'tyler',
        emotion: 'neutral',
      },
      {
        text: 'Tyler unpredictable is Tyler dangerous. Choose carefully.',
        speakerId: 'inner-voice',
        emotion: 'knowing',
      },
    ],
    dialogueChoices: [
      {
        id: 'tyler-history-trap',
        text: '"Tyler, I didn\'t use you. We were friends. We ARE friends."',
        nextSceneId: 'tyler-leverage',
        isOptimal: false,
        tactic: 'denial',
        reaction: {
          text: '"FRIENDS!" He laughs too loud. "Did you hear that? We\'re FRIENDS."',
          emotion: 'angry',
          bodyLanguage: 'Denial set him off. He\'s performing now.',
          scoreImpact: -20,
        },
      },
      {
        id: 'tyler-history-subtle',
        text: '"Tyler, you\'re making a scene. Can we talk privately?"',
        nextSceneId: 'tyler-leverage',
        isOptimal: false,
        tactic: 'redirect',
        reaction: {
          text: '"Private? But darling, I LIVE for scenes." He gestures expansively.',
          emotion: 'smirking',
          bodyLanguage: 'He wants an audience. You played into it.',
          scoreImpact: -5,
        },
      },
      {
        id: 'tyler-history-close',
        text: '"Impressed, I hope. You\'re too smart to teach me nothing."',
        nextSceneId: 'tyler-leverage',
        isOptimal: false,
        tactic: 'flattery',
        reaction: {
          text: '"Flattery!" He preens. "Well. At least you learned something."',
          emotion: 'happy',
          bodyLanguage: 'Flattery works on Tyler. Temporarily.',
          scoreImpact: 10,
        },
      },
      {
        id: 'tyler-history-optimal',
        text: '"I learned from the best. And the best is standing right here."',
        nextSceneId: 'tyler-leverage',
        isOptimal: true,
        tactic: 'theatrical-surrender',
        reaction: {
          text: 'He pauses. Delighted. "Oh. OH. You ARE good. I forgot how good."',
          emotion: 'seductive',
          bodyLanguage: 'You played his game. He respects that.',
          scoreImpact: 20,
        },
      },
    ],
  },
  {
    id: 'tyler-leverage',
    backgroundId: 'restaurant',
    sceneType: 'dialogue',
    pathId: 'ghost',
    mood: 'party',
    dialog: [
      {
        text: '"Here\'s the delicious part."',
        speakerId: 'tyler',
        emotion: 'knowing',
      },
      {
        text: '"I know things. I know SO many things. About everyone here."',
        speakerId: 'tyler',
        emotion: 'smirking',
      },
      {
        text: '"Including you. Including what you did to get into Kai\'s good graces."',
        speakerId: 'tyler',
        emotion: 'seductive',
      },
      {
        text: 'His voice drops. Suddenly serious.',
      },
      {
        text: '"I could make this very uncomfortable. Or very fun. Your choice."',
        speakerId: 'tyler',
        emotion: 'cold',
      },
      {
        text: 'Tyler controls the narrative now. What do you offer?',
        speakerId: 'inner-voice',
        emotion: 'knowing',
      },
    ],
    dialogueChoices: [
      {
        id: 'tyler-leverage-trap',
        text: '"Tyler, please. Don\'t make a scene. Think about Elena."',
        nextSceneId: 'tyler-reckoning',
        isOptimal: false,
        tactic: 'family-card',
        reaction: {
          text: '"ELENA? You\'re using my sister against me?" He bristles.',
          emotion: 'angry',
          bodyLanguage: 'Wrong card. He\'s protective and resentful of her.',
          scoreImpact: -15,
        },
      },
      {
        id: 'tyler-leverage-subtle',
        text: '"What would make it fun? I\'m genuinely asking."',
        nextSceneId: 'tyler-reckoning',
        isOptimal: false,
        tactic: 'curiosity',
        reaction: {
          text: '"Fun?" He considers. "Entertainment. Drama. Something WORTH my time."',
          emotion: 'curious',
          bodyLanguage: 'He wants to be amused. You\'re offering.',
          scoreImpact: 5,
        },
      },
      {
        id: 'tyler-leverage-close',
        text: '"Information for information. What do you want to know?"',
        nextSceneId: 'tyler-reckoning',
        isOptimal: false,
        tactic: 'trade',
        reaction: {
          text: '"Oooh, a trade. Tell me about Maris. What did she REALLY say about me?"',
          emotion: 'seductive',
          bodyLanguage: 'He\'s obsessed with how people see him.',
          scoreImpact: 10,
        },
      },
      {
        id: 'tyler-leverage-optimal',
        text: '"I think you don\'t actually want to destroy me. I think you want to be in on whatever happens next."',
        nextSceneId: 'tyler-reckoning',
        isOptimal: true,
        tactic: 'include',
        reaction: {
          text: 'He goes still. "In on it." His eyes light up. "Go on."',
          emotion: 'happy',
          bodyLanguage: 'You read him. He wants to be part of the story.',
          scoreImpact: 25,
        },
      },
    ],
  },
  {
    id: 'tyler-reckoning',
    backgroundId: 'restaurant',
    sceneType: 'dialogue',
    pathId: 'ghost',
    mood: 'party',
    dialog: [
      {
        text: 'Tyler swirls his drink. Thinking. The dangerous energy shifts.',
      },
      {
        text: '"You know what? I\'m going to let this play out."',
        speakerId: 'tyler',
        emotion: 'happy',
      },
      {
        text: '"Not because I forgive you. Because watching you navigate Maris AND Victoria is going to be DELICIOUS."',
        speakerId: 'tyler',
        emotion: 'smirking',
      },
      {
        text: 'He leans in close. Whispers.',
      },
      {
        text: '"But darling? Next time you use someone? Make sure they stay used."',
        speakerId: 'tyler',
        emotion: 'cold',
      },
      {
        text: 'He sweeps away. Blake exhales.',
      },
      {
        text: '"Is everyone at this party completely insane?"',
        speakerId: 'blake',
        emotion: 'confused',
      },
      {
        text: 'Tyler wants entertainment. You just became his favorite show.',
        speakerId: 'inner-voice',
        emotion: 'knowing',
      },
    ],
    nextSceneId: 'climax-convergence-intro',
  },
];
