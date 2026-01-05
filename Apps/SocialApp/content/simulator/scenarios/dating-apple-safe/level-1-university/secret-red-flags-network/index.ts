// SECRET LEVEL 1: Recognizing Dangerous Networks (Apple-Safe Version)
// Unlock: Complete Mission 5 with OPTIMAL choices at Scene 5B and 5C
// Objective: Recognize a dangerous social network and decide how to protect yourself.
import type { Scene } from '../../../../types';
import type { DatingScenario, MissionRewards } from '../../types';
import { characters as baseCharacters } from '../metadata';
import type { Character } from '../../../../types';

export const MISSION_ID = 'secret-red-flags-network';

// Add secret level characters - Reframed as dangerous people to RECOGNIZE
const secretCharacters: Character[] = [
  {
    id: 'phoenix',
    name: 'Phoenix',
    description: 'The recruiter. They approach newcomers quickly. A pattern to recognize.',
    traits: ['manipulative', 'charismatic', 'concerning'],
    defaultEmotion: 'smirking',
  },
  {
    id: 'raven',
    name: 'Raven',
    description: 'Senior member. Tests everyone for weaknesses.',
    traits: ['cold', 'assessing', 'dangerous'],
    defaultEmotion: 'cold',
  },
  {
    id: 'cipher',
    name: 'Cipher',
    description: 'The gatekeeper. Controls who enters their circle.',
    traits: ['mysterious', 'controlling', 'watchful'],
    defaultEmotion: 'neutral',
  },
];

const characters = [...baseCharacters, ...secretCharacters];

export const missionMetadata = {
  id: MISSION_ID,
  number: 6, // Secret level
  title: 'Recognizing Dangerous Networks',
  objective: 'Recognize a harmful social network and decide how to protect yourself.',
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

// Scene S1A: The Red Flag Invitation
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
      text: 'Red flag: unsolicited recruitment. What do you do?',
      emotion: 'concerned',
    },
  ],
  choices: [
    {
      id: 'choice-s1a-curious',
      text: '"Who is \'we\'?"',
      nextSceneId: 'scene-s1a-curious-result',
      xpBonus: 10,
      feedback: 'Gathering information. Good instinct.',
    },
    {
      id: 'choice-s1a-boundary',
      text: '"Watching me? That\'s concerning."',
      nextSceneId: 'scene-s1a-boundary-result',
      isOptimal: true,
      xpBonus: 20,
      feedback: 'OPTIMAL: You recognized the red flag and called it out.',
    },
    {
      id: 'choice-s1a-cautious',
      text: '"What do you want?"',
      nextSceneId: 'scene-s1a-cautious-result',
      xpBonus: 8,
      feedback: 'Direct. Getting to their agenda.',
    },
    {
      id: 'choice-s1a-leave',
      text: 'Trust your instincts and leave.',
      nextSceneId: 'scene-s1a-leave-result',
      xpBonus: 15,
      feedback: 'Smart. You recognized danger and protected yourself.',
    },
  ],
};

// Scene S1B: Recognizing the Pattern
const sceneS1b: Scene = {
  id: 'scene-s1b-underground',
  backgroundId: 'bar',
  dialog: [
    {
      text: 'Inside. A private gathering. Expensive clothes. Calculated smiles.',
    },
    {
      text: 'These people aren\'t friendly. They\'re assessing. Each one watching for weakness.',
    },
    {
      text: 'Raven approaches. Cold assessment.',
      speakerId: 'raven',
      emotion: 'cold',
    },
    {
      text: '"Fresh face. Phoenix thinks you\'re useful. I\'m not convinced."',
      speakerId: 'raven',
      emotion: 'cold',
    },
    {
      speakerId: 'inner-voice',
      text: 'Love-bombing, then testing. Classic manipulation pattern.',
      emotion: 'knowing',
    },
  ],
  choices: [
    {
      id: 'choice-s1b-recognize',
      text: '"I see what this is."',
      nextSceneId: 'scene-s1b-recognize-result',
      isOptimal: true,
      xpBonus: 20,
      feedback: 'OPTIMAL: You recognized the manipulation pattern.',
    },
    {
      id: 'choice-s1b-curious',
      text: '"What would convince you?"',
      nextSceneId: 'scene-s1b-curious-result',
      xpBonus: 5,
      feedback: 'Careful. You just gave them power over you.',
    },
    {
      id: 'choice-s1b-challenge',
      text: '"I\'m not here to prove anything."',
      nextSceneId: 'scene-s1b-challenge-result',
      xpBonus: 15,
      feedback: 'Strong boundaries. They didn\'t expect that.',
    },
    {
      id: 'choice-s1b-observe',
      text: 'Stay quiet and observe their tactics.',
      nextSceneId: 'scene-s1b-observe-result',
      xpBonus: 10,
      feedback: 'Learning their patterns. Educational.',
    },
  ],
};

// Scene S1C: The Decision
const sceneS1c: Scene = {
  id: 'scene-s1c-initiation',
  backgroundId: 'bar',
  dialog: [
    {
      text: 'Cipher appears. The room goes quiet.',
    },
    {
      text: '"We\'ve watched you. You have potential. But potential is worthless without commitment."',
      speakerId: 'cipher',
      emotion: 'neutral',
    },
    {
      text: '"Join us, and you\'ll learn things. Influence, connections. But once you\'re in, you\'re in."',
      speakerId: 'cipher',
      emotion: 'cold',
    },
    {
      speakerId: 'inner-voice',
      text: 'Pressure to commit. No exit. Classic coercive group tactic.',
      emotion: 'concerned',
    },
  ],
  choices: [
    {
      id: 'choice-s1c-decline',
      text: '"I\'m not interested in groups that operate like this."',
      nextSceneId: 'scene-s1c-decline-result',
      isOptimal: true,
      xpBonus: 25,
      feedback: 'OPTIMAL: You recognized the danger and protected yourself.',
    },
    {
      id: 'choice-s1c-investigate',
      text: '"Tell me more about what this really is."',
      nextSceneId: 'scene-s1c-investigate-result',
      xpBonus: 15,
      feedback: 'Gathering intel. Just don\'t get pulled in.',
    },
    {
      id: 'choice-s1c-accept',
      text: '"I\'ll consider it."',
      nextSceneId: 'scene-s1c-accept-result',
      xpBonus: 5,
      feedback: 'Vague response. They\'ll keep pursuing you.',
    },
    {
      id: 'choice-s1c-expose',
      text: '"I should report this."',
      nextSceneId: 'scene-s1c-expose-result',
      xpBonus: 20,
      feedback: 'Protective instinct. Looking out for others too.',
    },
  ],
};

// Transition scenes
const sceneS1aCuriousResult: Scene = {
  id: 'scene-s1a-curious-result',
  backgroundId: 'apartment',
  dialog: [{ text: 'Phoenix smiles. They like questions. It means engagement.' }],
  nextSceneId: 'scene-s1b-underground',
};

const sceneS1aBoundaryResult: Scene = {
  id: 'scene-s1a-boundary-result',
  backgroundId: 'apartment',
  dialog: [{ text: 'Phoenix\'s smile flickers. They didn\'t expect pushback. Red flag recognized.' }],
  nextSceneId: 'scene-s1b-underground',
};

const sceneS1aCautiousResult: Scene = {
  id: 'scene-s1a-cautious-result',
  backgroundId: 'apartment',
  dialog: [{ text: 'They deflect. Manipulators never answer direct questions directly.' }],
  nextSceneId: 'scene-s1b-underground',
};

const sceneS1aLeaveResult: Scene = {
  id: 'scene-s1a-leave-result',
  backgroundId: 'apartment',
  dialog: [{ text: 'You leave. Your instincts protected you. This was a dangerous situation.' }],
  isEnding: true,
  outcomeType: 'good',
  endingTitle: 'Trusted Your Instincts',
  endingSummary: 'You recognized the danger and walked away. That took courage. Your gut was right.',
};

const sceneS1bRecognizeResult: Scene = {
  id: 'scene-s1b-recognize-result',
  backgroundId: 'bar',
  dialog: [{ text: 'Raven\'s eyes narrow. You saw through the facade.' }],
  nextSceneId: 'scene-s1c-initiation',
};

const sceneS1bCuriousResult: Scene = {
  id: 'scene-s1b-curious-result',
  backgroundId: 'bar',
  dialog: [{ text: 'Raven smiles. You just handed them leverage.' }],
  nextSceneId: 'scene-s1c-initiation',
};

const sceneS1bChallengeResult: Scene = {
  id: 'scene-s1b-challenge-result',
  backgroundId: 'bar',
  dialog: [{ text: 'Raven reassesses. You\'re not an easy mark.' }],
  nextSceneId: 'scene-s1c-initiation',
};

const sceneS1bObserveResult: Scene = {
  id: 'scene-s1b-observe-result',
  backgroundId: 'bar',
  dialog: [{ text: 'You watch. Learning their patterns for future protection.' }],
  nextSceneId: 'scene-s1c-initiation',
};

// Ending scenes - Reframed for Apple safety
const sceneS1cDeclineResult: Scene = {
  id: 'scene-s1c-decline-result',
  backgroundId: 'bar',
  dialog: [{ text: 'You walk away. They can\'t recruit what won\'t be recruited.' }],
  isEnding: true,
  outcomeType: 'good',
  endingTitle: 'Pattern Recognition Master',
  endingSummary: 'You recognized the manipulation tactics and protected yourself. +50 Awareness. You\'ll never fall for this pattern again.',
};

const sceneS1cInvestigateResult: Scene = {
  id: 'scene-s1c-investigate-result',
  backgroundId: 'bar',
  dialog: [{ text: 'You learn their methods. Knowledge for future protection.' }],
  isEnding: true,
  outcomeType: 'good',
  endingTitle: 'The Observer',
  endingSummary: 'You gathered intel without committing. Now you know how these groups operate. +40 Awareness.',
};

const sceneS1cAcceptResult: Scene = {
  id: 'scene-s1c-accept-result',
  backgroundId: 'bar',
  dialog: [{ text: 'You didn\'t commit, but you didn\'t leave. They\'ll be back.' }],
  isEnding: true,
  outcomeType: 'neutral',
  endingTitle: 'The Undecided',
  endingSummary: 'You didn\'t protect yourself clearly. They see hesitation as opportunity. Stay vigilant.',
};

const sceneS1cExposeResult: Scene = {
  id: 'scene-s1c-expose-result',
  backgroundId: 'bar',
  dialog: [{ text: 'You report what you saw. Protecting others from the same trap.' }],
  isEnding: true,
  outcomeType: 'good',
  endingTitle: 'The Protector',
  endingSummary: 'You protected yourself AND warned others. True strength is looking out for your community. +60 Awareness.',
};

export const secretScenes: Scene[] = [
  sceneS1a,
  sceneS1aCuriousResult,
  sceneS1aBoundaryResult,
  sceneS1aCautiousResult,
  sceneS1aLeaveResult,
  sceneS1b,
  sceneS1bRecognizeResult,
  sceneS1bCuriousResult,
  sceneS1bChallengeResult,
  sceneS1bObserveResult,
  sceneS1c,
  sceneS1cDeclineResult,
  sceneS1cInvestigateResult,
  sceneS1cAcceptResult,
  sceneS1cExposeResult,
];

export const secretScenario: DatingScenario = {
  id: MISSION_ID,
  levelId: 'university',
  missionNumber: 6,
  title: missionMetadata.title,
  tagline: 'Learn to recognize dangerous patterns.',
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
