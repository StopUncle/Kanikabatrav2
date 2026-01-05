// SECRET LEVEL 2: The Inner Circle
// Unlock: Complete Mission 10 with OPTIMAL choices at Scene 10B and 10C
// Objective: Access to exclusive social networks reserved for the elite.
import type { Scene } from '../../../../types';
import type { DatingScenario, MissionRewards } from '../../types';
import { characters as baseCharacters } from '../metadata';
import type { Character } from '../../../../types';

export const MISSION_ID = 'secret-inner-circle';

const secretCharacters: Character[] = [
  {
    id: 'aristocrat',
    name: 'The Aristocrat',
    description: 'Old money. Gatekeepers to real power.',
    traits: ['refined', 'discerning', 'influential'],
    defaultEmotion: 'neutral',
  },
  {
    id: 'connector',
    name: 'The Connector',
    description: 'Knows everyone. Opens every door.',
    traits: ['social', 'strategic', 'invaluable'],
    defaultEmotion: 'happy',
  },
];

const characters = [...baseCharacters, ...secretCharacters];

export const missionMetadata = {
  id: MISSION_ID,
  number: 11,
  title: 'The Inner Circle',
  objective: 'Access exclusive social networks reserved for the elite.',
  tier: 'vip' as const,
  estimatedMinutes: 15,
  difficulty: 'advanced' as const,
  isSecret: true,
  secretUnlockCondition: 'Complete Mission 10 with OPTIMAL at Scene 10B (preselection) and Scene 10C (scarcity)',
};

export const rewards: MissionRewards = {
  power: 60,
  mask: 40,
  vision: 35,
  unlocks: 'level-3-gala-advantage',
};

// Scene S2A: The Invitation
const sceneS2a: Scene = {
  id: 'scene-s2a-invitation',
  backgroundId: 'restaurant',
  dialog: [
    {
      text: 'A week after the networking event. Private message from Skyler.',
    },
    {
      text: '"There\'s a private gathering this weekend. Very select. I think you should come."',
      speakerId: 'skyler',
      emotion: 'curious',
    },
    {
      speakerId: 'inner-voice',
      text: 'They\'re inviting you somewhere private. What do they want?',
      emotion: 'knowing',
    },
  ],
  choices: [
    {
      id: 'choice-s2a-accept',
      text: '"I\'ll be there."',
      nextSceneId: 'scene-s2a-accept-result',
      xpBonus: 10,
      feedback: 'You\'re in. But you don\'t know what you\'re in for.',
    },
    {
      id: 'choice-s2a-curious',
      text: '"Tell me more. What am I walking into?"',
      nextSceneId: 'scene-s2a-curious-result',
      isOptimal: true,
      xpBonus: 20,
      feedback: 'Information first. Smart move.',
    },
    {
      id: 'choice-s2a-conditional',
      text: '"Depends. What\'s in it for me?"',
      nextSceneId: 'scene-s2a-conditional-result',
      xpBonus: 8,
      feedback: 'Transactional. Might seem ungracious here.',
    },
    {
      id: 'choice-s2a-decline',
      text: '"I don\'t do exclusive gatherings."',
      nextSceneId: 'scene-s2a-decline-result',
      xpBonus: 0,
      feedback: 'You just closed a door that doesn\'t open twice.',
    },
  ],
};

// Scene S2B: The Gathering
const sceneS2b: Scene = {
  id: 'scene-s2b-gathering',
  backgroundId: 'restaurant',
  dialog: [
    {
      text: 'Private residence. Wealth beyond display. Conversations that matter.',
    },
    {
      text: 'The Aristocrat approaches. Assessing.',
    },
    {
      text: '"Skyler speaks highly of you. That\'s rare. What do you bring to our circle?"',
      speakerId: 'aristocrat',
      emotion: 'neutral',
    },
    {
      speakerId: 'inner-voice',
      text: 'This is the gatekeeper. Wrong answer and you\'re just a visitor.',
      emotion: 'concerned',
    },
  ],
  choices: [
    {
      id: 'choice-s2b-value',
      text: '"Fresh perspective. New connections. Energy that doesn\'t bore."',
      nextSceneId: 'scene-s2b-value-result',
      isOptimal: true,
      xpBonus: 20,
      feedback: 'Value without desperation. They nod, considering.',
    },
    {
      id: 'choice-s2b-humble',
      text: '"I\'m here to learn. You all clearly know things I don\'t."',
      nextSceneId: 'scene-s2b-humble-result',
      xpBonus: 5,
      feedback: 'Submissive. They\'ll treat you like a student.',
    },
    {
      id: 'choice-s2b-challenge',
      text: '"What do any of us bring? Isn\'t that for time to reveal?"',
      nextSceneId: 'scene-s2b-challenge-result',
      xpBonus: 10,
      feedback: 'Philosophical. Could intrigue them. Or annoy them.',
    },
    {
      id: 'choice-s2b-joke',
      text: '"Great taste in wine and terrible taste in everything else."',
      nextSceneId: 'scene-s2b-joke-result',
      xpBonus: 8,
      feedback: 'Risky humor. Old money doesn\'t always laugh.',
    },
  ],
};

// Scene S2C: The Offer
const sceneS2c: Scene = {
  id: 'scene-s2c-offer',
  backgroundId: 'restaurant',
  dialog: [
    {
      text: 'The Connector pulls you aside.',
    },
    {
      text: '"You impressed them. They want you at the Gala. Not as a guest. As one of us."',
      speakerId: 'connector',
      emotion: 'happy',
    },
    {
      text: '"The Gala is where real connections happen. Where futures are shaped."',
      speakerId: 'connector',
      emotion: 'serious',
    },
    {
      speakerId: 'inner-voice',
      text: 'This is the inner circle. But what do they expect in return?',
      emotion: 'concerned',
    },
  ],
  choices: [
    {
      id: 'choice-s2c-accept',
      text: '"I\'m honored. Count me in."',
      nextSceneId: 'scene-s2c-accept-result',
      xpBonus: 15,
      feedback: 'You\'re in. Full access. And full obligations.',
    },
    {
      id: 'choice-s2c-terms',
      text: '"What exactly does \'one of us\' mean?"',
      nextSceneId: 'scene-s2c-terms-result',
      isOptimal: true,
      xpBonus: 25,
      feedback: 'Know the deal before you sign. Always.',
    },
    {
      id: 'choice-s2c-solo',
      text: '"I prefer to attend as myself. Not as anything else."',
      nextSceneId: 'scene-s2c-solo-result',
      xpBonus: 10,
      feedback: 'Independence preserved. But access limited.',
    },
    {
      id: 'choice-s2c-doubt',
      text: '"This sounds like a lot. I need to think."',
      nextSceneId: 'scene-s2c-doubt-result',
      xpBonus: 0,
      feedback: 'Hesitation reads as weakness. They noticed.',
    },
  ],
};

// Scene S2A Results
const sceneS2aAcceptResult: Scene = {
  id: 'scene-s2a-accept-result',
  backgroundId: 'restaurant',
  dialog: [
    { text: '"Perfect. I\'ll send you the address."', speakerId: 'skyler', emotion: 'happy' },
    { text: 'The message disappears. End-to-end encrypted.' },
    { text: 'This is real. Whatever "this" is.' },
  ],
  nextSceneId: 'scene-s2b-gathering',
};

const sceneS2aCuriousResult: Scene = {
  id: 'scene-s2a-curious-result',
  backgroundId: 'restaurant',
  dialog: [
    { text: 'Skyler pauses before responding.', speakerId: 'skyler', emotion: 'smirking' },
    { text: '"Smart. It\'s a gathering of people who make things happen. No tourists. No posers."' },
    { text: '"If you come, you come as someone with value. Not a spectator."' },
  ],
  nextSceneId: 'scene-s2b-gathering',
};

const sceneS2aConditionalResult: Scene = {
  id: 'scene-s2a-conditional-result',
  backgroundId: 'restaurant',
  dialog: [
    { text: '"Direct. I like that."', speakerId: 'skyler', emotion: 'smirking' },
    { text: '"What\'s in it for you is access. To people. To opportunities. To rooms you didn\'t know existed."' },
    { text: '"The question is whether you\'re worth the invitation."' },
  ],
  nextSceneId: 'scene-s2b-gathering',
};

// EARLY FAILURE - Declining the invitation
const sceneS2aDeclineResult: Scene = {
  id: 'scene-s2a-decline-result',
  backgroundId: 'restaurant',
  dialog: [
    { text: '"Your choice."', speakerId: 'skyler', emotion: 'cold' },
    { text: 'The message thread ends there. No follow-up.' },
    { text: 'Some doors only open once. You just watched one close.' },
  ],
  isEnding: true,
  outcomeType: 'bad',
  endingTitle: 'The Closed Door',
  endingSummary: 'You declined access to real power. Skyler won\'t ask twice.',
};

// Scene S2B Results
const sceneS2bValueResult: Scene = {
  id: 'scene-s2b-value-result',
  backgroundId: 'restaurant',
  dialog: [
    { text: 'The Aristocrat considers this. A hint of approval.', speakerId: 'aristocrat', emotion: 'neutral' },
    { text: '"Energy that doesn\'t bore. We could use more of that."' },
    { text: 'They move on, but you notice others looking at you differently now.' },
  ],
  nextSceneId: 'scene-s2c-offer',
};

const sceneS2bHumbleResult: Scene = {
  id: 'scene-s2b-humble-result',
  backgroundId: 'restaurant',
  dialog: [
    { text: '"Humble." The word isn\'t a compliment.', speakerId: 'aristocrat', emotion: 'cold' },
    { text: '"We have enough learners. We need contributors."' },
    { text: 'They move on. You feel yourself shrink in the room.' },
  ],
  nextSceneId: 'scene-s2c-offer',
};

const sceneS2bChallengeResult: Scene = {
  id: 'scene-s2b-challenge-result',
  backgroundId: 'restaurant',
  dialog: [
    { text: 'The Aristocrat\'s eyes narrow. Then a small smile.', speakerId: 'aristocrat', emotion: 'smirking' },
    { text: '"Philosophy. Interesting deflection."' },
    { text: '"Time will reveal, you say. We\'ll see."' },
  ],
  nextSceneId: 'scene-s2c-offer',
};

const sceneS2bJokeResult: Scene = {
  id: 'scene-s2b-joke-result',
  backgroundId: 'restaurant',
  dialog: [
    { text: 'A beat of silence. Then the Aristocrat laughs.', speakerId: 'aristocrat', emotion: 'happy' },
    { text: '"Self-deprecating. Unexpected from Skyler\'s pick."' },
    { text: 'The ice cracks. You\'re in the conversation now.' },
  ],
  nextSceneId: 'scene-s2c-offer',
};

// Ending scenes
const sceneS2cAcceptResult: Scene = {
  id: 'scene-s2c-accept-result',
  backgroundId: 'restaurant',
  dialog: [
    { text: 'The Connector smiles. Genuine warmth.', speakerId: 'connector', emotion: 'happy' },
    { text: '"Welcome to the circle. The Gala will be... educational."' },
    { text: 'You have full access now. And full obligations.' },
  ],
  isEnding: true,
  outcomeType: 'good',
  endingTitle: 'The Insider',
  endingSummary: 'You\'re part of the circle. The Gala awaits with full access and full expectations.',
};

const sceneS2cTermsResult: Scene = {
  id: 'scene-s2c-terms-result',
  backgroundId: 'restaurant',
  dialog: [
    { text: 'The Connector nods, impressed.', speakerId: 'connector', emotion: 'smirking' },
    { text: '"It means you\'re expected to contribute. Connections, insights, opportunities."' },
    { text: '"In return, you get the same. Fair trade?"' },
    { text: 'You shake hands. Terms clear. Power balanced.' },
  ],
  isEnding: true,
  outcomeType: 'good',
  endingTitle: 'The Negotiator',
  endingSummary: 'You know exactly what you signed up for. Full access, eyes wide open.',
};

const sceneS2cSoloResult: Scene = {
  id: 'scene-s2c-solo-result',
  backgroundId: 'restaurant',
  dialog: [
    { text: 'The Connector shrugs.', speakerId: 'connector', emotion: 'neutral' },
    { text: '"Suit yourself. You\'ll have access, but not support."' },
    { text: '"Some people prefer it that way."' },
  ],
  isEnding: true,
  outcomeType: 'neutral',
  endingTitle: 'The Independent',
  endingSummary: 'You preserved your independence. Standard access. No obligations, no backup.',
};

const sceneS2cDoubtResult: Scene = {
  id: 'scene-s2c-doubt-result',
  backgroundId: 'restaurant',
  dialog: [
    { text: 'The Connector\'s smile fades slightly.', speakerId: 'connector', emotion: 'cold' },
    { text: '"Of course. Think about it."' },
    { text: 'But you both know what hesitation means here. The offer won\'t come again.' },
  ],
  isEnding: true,
  outcomeType: 'bad',
  endingTitle: 'The Hesitant',
  endingSummary: 'Hesitation cost you. Still invited to the Gala, but as a guest, not a member.',
};

export const secretScenes: Scene[] = [
  sceneS2a, sceneS2aAcceptResult, sceneS2aCuriousResult, sceneS2aConditionalResult, sceneS2aDeclineResult,
  sceneS2b, sceneS2bValueResult, sceneS2bHumbleResult, sceneS2bChallengeResult, sceneS2bJokeResult,
  sceneS2c, sceneS2cAcceptResult, sceneS2cTermsResult, sceneS2cSoloResult, sceneS2cDoubtResult,
];

export const secretScenario: DatingScenario = {
  id: MISSION_ID,
  levelId: 'social-scene',
  missionNumber: 11,
  title: missionMetadata.title,
  tagline: 'Where real power networks.',
  description: missionMetadata.objective,
  objective: missionMetadata.objective,
  tier: missionMetadata.tier,
  estimatedMinutes: missionMetadata.estimatedMinutes,
  difficulty: missionMetadata.difficulty,
  characters,
  scenes: secretScenes,
  rewards,
  startSceneId: 'scene-s2a-invitation',
  isSecret: true,
  secretUnlockCondition: missionMetadata.secretUnlockCondition,
};

export default secretScenario;
