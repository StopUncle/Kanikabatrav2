// SECRET LEVEL 1: The Predator's Circle
// Unlock: Complete Mission 5 with OPTIMAL choices at Scene 5B and 5C
// Objective: Discover a hidden network of psychopaths on campus and join their circle.
import type { Scene } from '../../../../types';
import type { DatingScenario, MissionRewards } from '../../types';
import { characters as baseCharacters } from '../metadata';
import type { Character } from '../../../../types';

export const MISSION_ID = 'secret-predators-circle';

// Add secret level characters
const secretCharacters: Character[] = [
  {
    id: 'phoenix',
    name: 'Phoenix',
    description: 'The recruiter. They found you. They see what you are.',
    traits: ['calculating', 'charismatic', 'dangerous'],
    defaultEmotion: 'smirking',
  },
  {
    id: 'raven',
    name: 'Raven',
    description: 'Senior member of the circle. Tests everyone.',
    traits: ['cold', 'intelligent', 'ruthless'],
    defaultEmotion: 'cold',
  },
  {
    id: 'cipher',
    name: 'Cipher',
    description: 'The gatekeeper. Decides who enters.',
    traits: ['mysterious', 'powerful', 'observant'],
    defaultEmotion: 'neutral',
  },
];

const characters = [...baseCharacters, ...secretCharacters];

export const missionMetadata = {
  id: MISSION_ID,
  number: 6, // Secret level
  title: 'The Predator\'s Circle',
  objective: 'Discover a hidden network on campus and decide if you want to join.',
  tier: 'premium' as const,
  estimatedMinutes: 15,
  difficulty: 'advanced' as const,
  isSecret: true,
  secretUnlockCondition: 'Complete Mission 5 with OPTIMAL at Scene 5B (indifference) and Scene 5C (both)',
};

export const rewards: MissionRewards = {
  power: 50,
  mask: 30,
  vision: 25,
  unlocks: 'level-2-social-scene-advantage',
};

// Scene S1A: The Invitation
const sceneS1a: Scene = {
  id: 'scene-s1a-invitation',
  backgroundId: 'apartment',
  dialog: [
    {
      text: 'A week after the party. A note under your door. No name. Just an address and a time.',
    },
    {
      text: 'That night. An unmarked building at the edge of campus.',
    },
    {
      text: 'A figure emerges from the shadows.',
      speakerId: 'phoenix',
      emotion: 'smirking',
    },
    {
      text: '"You came. We\'ve been watching you."',
      speakerId: 'phoenix',
      emotion: 'smirking',
    },
    {
      speakerId: 'inner-voice',
      text: 'They recognize something in you. What do you do?',
      emotion: 'neutral',
    },
  ],
  choices: [
    {
      id: 'choice-s1a-curious',
      text: '"Who is \'we\'?"',
      nextSceneId: 'scene-s1a-curious-result',
      xpBonus: 10,
      feedback: 'Information gathering. Smart, but shows you\'re not in control.',
    },
    {
      id: 'choice-s1a-confident',
      text: '"I know. I let you watch."',
      nextSceneId: 'scene-s1a-confident-result',
      isOptimal: true,
      xpBonus: 20,
      feedback: 'OPTIMAL: You knew. You\'re not prey. You\'re being evaluated as an equal.',
    },
    {
      id: 'choice-s1a-cautious',
      text: '"What do you want?"',
      nextSceneId: 'scene-s1a-cautious-result',
      xpBonus: 8,
      feedback: 'Close. Direct, but defensive posture.',
    },
    {
      id: 'choice-s1a-leave',
      text: 'Turn around and leave.',
      nextSceneId: 'scene-s1a-leave-result',
      xpBonus: 0,
      feedback: 'TRAP: Fear. They\'ll never invite you again.',
    },
  ],
};

// Scene S1B: The Underground Party
const sceneS1b: Scene = {
  id: 'scene-s1b-underground',
  backgroundId: 'bar',
  dialog: [
    {
      text: 'Inside. A private gathering. Expensive clothes. Dangerous eyes.',
    },
    {
      text: 'These people aren\'t students. They\'re players. Each one radiates control.',
    },
    {
      text: 'Raven approaches. Cold assessment.',
      speakerId: 'raven',
      emotion: 'cold',
    },
    {
      text: '"Fresh meat. Phoenix thinks you\'re special. I\'m not convinced."',
      speakerId: 'raven',
      emotion: 'cold',
    },
    {
      speakerId: 'inner-voice',
      text: 'These people are like you. How do you position yourself?',
      emotion: 'neutral',
    },
  ],
  choices: [
    {
      id: 'choice-s1b-prove',
      text: '"I don\'t need to convince you of anything."',
      nextSceneId: 'scene-s1b-prove-result',
      isOptimal: true,
      xpBonus: 20,
      feedback: 'OPTIMAL: No validation seeking. If you have to prove yourself, you\'ve already lost.',
    },
    {
      id: 'choice-s1b-curious',
      text: '"What would convince you?"',
      nextSceneId: 'scene-s1b-curious-result',
      xpBonus: 5,
      feedback: 'You just gave them power. Now they set the test.',
    },
    {
      id: 'choice-s1b-challenge',
      text: '"Convince me YOU\'RE worth my time."',
      nextSceneId: 'scene-s1b-challenge-result',
      xpBonus: 10,
      feedback: 'Close. Flip the frame, but might come off as posturing.',
    },
    {
      id: 'choice-s1b-observe',
      text: 'Say nothing. Let silence speak.',
      nextSceneId: 'scene-s1b-observe-result',
      xpBonus: 15,
      feedback: 'Close. Mysterious and unreadable. They\'ll probe more.',
    },
  ],
};

// Scene S1C: The Initiation
const sceneS1c: Scene = {
  id: 'scene-s1c-initiation',
  backgroundId: 'bar',
  dialog: [
    {
      text: 'Cipher appears. The room goes quiet.',
    },
    {
      text: '"We\'ve watched you play the game. You have potential. But potential is worthless without commitment."',
      speakerId: 'cipher',
      emotion: 'neutral',
    },
    {
      text: '"Join us, and you\'ll learn things most people never know. Power, influence, control. But once you\'re in, you\'re in."',
      speakerId: 'cipher',
      emotion: 'cold',
    },
    {
      speakerId: 'inner-voice',
      text: 'Power or freedom? Which matters more?',
      emotion: 'neutral',
    },
  ],
  choices: [
    {
      id: 'choice-s1c-accept',
      text: '"I\'m in."',
      nextSceneId: 'scene-s1c-accept-result',
      xpBonus: 15,
      feedback: 'Committed. The network is yours. New doors open.',
    },
    {
      id: 'choice-s1c-negotiate',
      text: '"What do I get? Specifically."',
      nextSceneId: 'scene-s1c-negotiate-result',
      isOptimal: true,
      xpBonus: 25,
      feedback: 'OPTIMAL: Even in recruitment, you negotiate. They respect that.',
    },
    {
      id: 'choice-s1c-decline',
      text: '"I work alone."',
      nextSceneId: 'scene-s1c-decline-result',
      xpBonus: 10,
      feedback: 'Independence preserved, but you\'ve declined real power.',
    },
    {
      id: 'choice-s1c-delay',
      text: '"I\'ll think about it."',
      nextSceneId: 'scene-s1c-delay-result',
      xpBonus: 5,
      feedback: 'Weak. They needed decisiveness. You showed hesitation.',
    },
  ],
};

// Transition scenes
const sceneS1aCuriousResult: Scene = {
  id: 'scene-s1a-curious-result',
  backgroundId: 'apartment',
  dialog: [{ text: '[Scene content to be written]' }],
  nextSceneId: 'scene-s1b-underground',
};

const sceneS1aConfidentResult: Scene = {
  id: 'scene-s1a-confident-result',
  backgroundId: 'apartment',
  dialog: [{ text: '[Scene content to be written]' }],
  nextSceneId: 'scene-s1b-underground',
};

const sceneS1aCautiousResult: Scene = {
  id: 'scene-s1a-cautious-result',
  backgroundId: 'apartment',
  dialog: [{ text: '[Scene content to be written]' }],
  nextSceneId: 'scene-s1b-underground',
};

const sceneS1aLeaveResult: Scene = {
  id: 'scene-s1a-leave-result',
  backgroundId: 'apartment',
  dialog: [{ text: '[Scene content to be written]' }],
  isEnding: true,
  outcomeType: 'bad',
  endingTitle: 'The One That Got Away',
  endingSummary: 'You fled. The circle won\'t forget. Secret level failed.',
};

const sceneS1bProveResult: Scene = {
  id: 'scene-s1b-prove-result',
  backgroundId: 'bar',
  dialog: [{ text: '[Scene content to be written]' }],
  nextSceneId: 'scene-s1c-initiation',
};

const sceneS1bCuriousResult: Scene = {
  id: 'scene-s1b-curious-result',
  backgroundId: 'bar',
  dialog: [{ text: '[Scene content to be written]' }],
  nextSceneId: 'scene-s1c-initiation',
};

const sceneS1bChallengeResult: Scene = {
  id: 'scene-s1b-challenge-result',
  backgroundId: 'bar',
  dialog: [{ text: '[Scene content to be written]' }],
  nextSceneId: 'scene-s1c-initiation',
};

const sceneS1bObserveResult: Scene = {
  id: 'scene-s1b-observe-result',
  backgroundId: 'bar',
  dialog: [{ text: '[Scene content to be written]' }],
  nextSceneId: 'scene-s1c-initiation',
};

// Ending scenes
const sceneS1cAcceptResult: Scene = {
  id: 'scene-s1c-accept-result',
  backgroundId: 'bar',
  dialog: [{ text: '[Scene content to be written]' }],
  isEnding: true,
  outcomeType: 'good',
  endingTitle: 'Welcome to the Circle',
  endingSummary: 'You\'re in. The Predator Network is yours. +50 Power. Advantage unlocked in Level 2.',
};

const sceneS1cNegotiateResult: Scene = {
  id: 'scene-s1c-negotiate-result',
  backgroundId: 'bar',
  dialog: [{ text: '[Scene content to be written]' }],
  isEnding: true,
  outcomeType: 'good',
  endingTitle: 'The Deal Maker',
  endingSummary: 'You negotiated your terms. They respect power. +60 Power. Premium advantage unlocked in Level 2.',
};

const sceneS1cDeclineResult: Scene = {
  id: 'scene-s1c-decline-result',
  backgroundId: 'bar',
  dialog: [{ text: '[Scene content to be written]' }],
  isEnding: true,
  outcomeType: 'neutral',
  endingTitle: 'The Lone Wolf',
  endingSummary: 'Independence preserved. You walk your own path. No network bonus, but no obligations either.',
};

const sceneS1cDelayResult: Scene = {
  id: 'scene-s1c-delay-result',
  backgroundId: 'bar',
  dialog: [{ text: '[Scene content to be written]' }],
  isEnding: true,
  outcomeType: 'bad',
  endingTitle: 'The Hesitant',
  endingSummary: 'Indecision is decision. They\'ll remember. No invitation extended again.',
};

export const secretScenes: Scene[] = [
  sceneS1a,
  sceneS1aCuriousResult,
  sceneS1aConfidentResult,
  sceneS1aCautiousResult,
  sceneS1aLeaveResult,
  sceneS1b,
  sceneS1bProveResult,
  sceneS1bCuriousResult,
  sceneS1bChallengeResult,
  sceneS1bObserveResult,
  sceneS1c,
  sceneS1cAcceptResult,
  sceneS1cNegotiateResult,
  sceneS1cDeclineResult,
  sceneS1cDelayResult,
];

export const secretScenario: DatingScenario = {
  id: MISSION_ID,
  levelId: 'university',
  missionNumber: 6,
  title: missionMetadata.title,
  tagline: 'They see what you are.',
  description: missionMetadata.objective,
  objective: missionMetadata.objective,
  tier: missionMetadata.tier,
  estimatedMinutes: missionMetadata.estimatedMinutes,
  difficulty: missionMetadata.difficulty,
  characters,
  scenes: secretScenes,
  rewards,
  startSceneId: 'scene-s1a-invitation',
  isSecret: true,
  secretUnlockCondition: missionMetadata.secretUnlockCondition,
};

export default secretScenario;
