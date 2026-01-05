// Mission 7: Dating Apps
// Objective: Master digital game - profile optimization, messaging strategy, transition to real life.
import type { Scene } from '../../../../types';
import type { DatingScenario, MissionRewards } from '../../types';
import { characters } from '../metadata';

export const MISSION_ID = 'mission-7-dating-apps';

export const missionMetadata = {
  id: MISSION_ID,
  number: 7,
  title: 'Dating Apps',
  objective: 'Master digital game - profile optimization, messaging strategy, transition to real life.',
  tier: 'free' as const,
  estimatedMinutes: 12,
  difficulty: 'intermediate' as const,
};

export const rewards: MissionRewards = {
  power: 10,
  mask: 20,
  vision: 15,
  unlocks: 'mission-8-the-setup',
};

// Scene 7A: The Match
const scene7a: Scene = {
  id: 'scene-7a-match',
  backgroundId: 'text-screen',
  dialog: [
    {
      text: 'Quinn matched with you. Their profile: intelligent, successful, skeptical. "Swipe left on red flags."',
    },
    {
      text: 'They messaged first: "Your profile is interesting. Tell me something that isn\'t on it."',
      speakerId: 'quinn',
      emotion: 'neutral',
    },
    {
      speakerId: 'inner-voice',
      text: 'They want to see if you\'re real. What\'s your move?',
      emotion: 'curious',
    },
  ],
  choices: [
    {
      id: 'choice-7a-funny',
      text: '"I make a mean grilled cheese at 2am. Life skill or red flag?"',
      nextSceneId: 'scene-7a-funny-result',
      isOptimal: true,
      xpBonus: 15,
      feedback: 'Playful, specific, self-aware. You stand out.',
    },
    {
      id: 'choice-7a-deep',
      text: '"I\'ve been told I\'m too intense for casual dating."',
      nextSceneId: 'scene-7a-deep-result',
      xpBonus: 5,
      feedback: 'Too much too fast. Intensity is earned, not announced.',
    },
    {
      id: 'choice-7a-dodge',
      text: '"A mystery loses its charm when explained."',
      nextSceneId: 'scene-7a-dodge-result',
      xpBonus: 8,
      feedback: 'Intriguing, but might read as evasive.',
    },
    {
      id: 'choice-7a-boring',
      text: '"I like hiking and travel."',
      nextSceneId: 'scene-7a-boring-result',
      xpBonus: 0,
      feedback: 'Every profile says this. You just became invisible.',
    },
  ],
};

// Scene 7B: The Conversation
const scene7b: Scene = {
  id: 'scene-7b-conversation',
  backgroundId: 'text-screen',
  dialog: [
    {
      text: 'Messages flowing. Quinn is sharp. Testing without being obvious.',
    },
    {
      text: '"So what are you actually looking for on here? And please don\'t say \'seeing where things go.\'"',
      speakerId: 'quinn',
      emotion: 'smirking',
    },
    {
      speakerId: 'inner-voice',
      text: 'They\'re asking what you want. Say too little, seem closed off. Too much, seem desperate.',
      emotion: 'neutral',
    },
  ],
  choices: [
    {
      id: 'choice-7b-honest',
      text: '"Someone who makes me forget my phone exists when we\'re together."',
      nextSceneId: 'scene-7b-honest-result',
      isOptimal: true,
      xpBonus: 15,
      feedback: 'Romantic without being desperate. They\'re intrigued.',
    },
    {
      id: 'choice-7b-casual',
      text: '"Good conversation, maybe more. No pressure."',
      nextSceneId: 'scene-7b-casual-result',
      xpBonus: 8,
      feedback: 'Safe, but forgettable. Everyone says this.',
    },
    {
      id: 'choice-7b-flip',
      text: '"You first. What are YOU looking for?"',
      nextSceneId: 'scene-7b-flip-result',
      xpBonus: 10,
      feedback: 'You flipped it. Smart, but might seem avoidant.',
    },
    {
      id: 'choice-7b-needy',
      text: '"Something real. I\'m tired of games."',
      nextSceneId: 'scene-7b-needy-result',
      xpBonus: 0,
      feedback: 'You sound bitter. That\'s a red flag to them.',
    },
  ],
};

// Scene 7C: The Transition
const scene7c: Scene = {
  id: 'scene-7c-transition',
  backgroundId: 'text-screen',
  dialog: [
    {
      text: 'Conversation is good. Time to move offline.',
    },
    {
      text: 'Quinn hasn\'t suggested meeting. The ball might be in your court.',
    },
    {
      speakerId: 'inner-voice',
      text: 'Apps are just the intro. The real thing happens face to face.',
      emotion: 'knowing',
    },
  ],
  choices: [
    {
      id: 'choice-7c-direct',
      text: '"This is fun. Let\'s continue it in person. Thursday work?"',
      nextSceneId: 'scene-7c-direct-result',
      isOptimal: true,
      xpBonus: 15,
      feedback: 'Specific day. Confident. Date secured.',
    },
    {
      id: 'choice-7c-vague',
      text: '"We should meet up sometime."',
      nextSceneId: 'scene-7c-vague-result',
      xpBonus: 5,
      feedback: '"Sometime" means never. You know this.',
    },
    {
      id: 'choice-7c-wait',
      text: 'Keep messaging. Let them suggest it.',
      nextSceneId: 'scene-7c-wait-result',
      xpBonus: 8,
      feedback: 'Patient, but conversations die without escalation.',
    },
    {
      id: 'choice-7c-number',
      text: '"What\'s your number? Easier to text."',
      nextSceneId: 'scene-7c-number-result',
      xpBonus: 10,
      feedback: 'Good step, but the goal is meeting, not more texting.',
    },
  ],
};

// Scene 7A Results
const scene7aFunnyResult: Scene = {
  id: 'scene-7a-funny-result',
  backgroundId: 'text-screen',
  dialog: [
    { text: 'Three dots. They\'re typing.' },
    { text: '"Okay that made me laugh. Life skill. Definitely life skill."', speakerId: 'quinn', emotion: 'happy' },
    { text: 'Followed by: "What else are you hiding?"' },
  ],
  nextSceneId: 'scene-7b-conversation',
};

const scene7aDeepResult: Scene = {
  id: 'scene-7a-deep-result',
  backgroundId: 'text-screen',
  dialog: [
    { text: 'Long pause. Then:' },
    { text: '"That\'s... a lot for message one. But okay."', speakerId: 'quinn', emotion: 'confused' },
    { text: 'They\'re still talking. But the vibe shifted.' },
  ],
  nextSceneId: 'scene-7b-conversation',
};

const scene7aDodgeResult: Scene = {
  id: 'scene-7a-dodge-result',
  backgroundId: 'text-screen',
  dialog: [
    { text: '"Smooth. Very smooth."', speakerId: 'quinn', emotion: 'smirking' },
    { text: 'A beat, then: "I\'ll allow it. For now."' },
    { text: 'Interest earned. But you\'ll have to deliver eventually.' },
  ],
  nextSceneId: 'scene-7b-conversation',
};

// EARLY FAILURE - Generic opener kills the match
const scene7aBoringResult: Scene = {
  id: 'scene-7a-boring-result',
  backgroundId: 'text-screen',
  dialog: [
    { text: 'Nothing. Seen at 9:47 PM.' },
    { text: 'An hour later. Still nothing.' },
    { text: 'The next morning you check again. They\'ve unmatched.' },
  ],
  isEnding: true,
  outcomeType: 'bad',
  endingTitle: 'The Unmatch',
  endingSummary: 'Hiking and travel. Like everyone else. They asked for something real and you gave them a brochure.',
};

// Scene 7B Results
const scene7bHonestResult: Scene = {
  id: 'scene-7b-honest-result',
  backgroundId: 'text-screen',
  dialog: [
    { text: 'They take a minute to respond.' },
    { text: '"...that\'s actually kind of beautiful."', speakerId: 'quinn', emotion: 'curious' },
    { text: 'Then: "Most people just say \'vibes.\'"' },
  ],
  nextSceneId: 'scene-7c-transition',
};

const scene7bCasualResult: Scene = {
  id: 'scene-7b-casual-result',
  backgroundId: 'text-screen',
  dialog: [
    { text: '"Fair enough."', speakerId: 'quinn', emotion: 'neutral' },
    { text: 'Conversation continues. Pleasant. Forgettable.' },
    { text: 'You\'re one of five people they\'re messaging right now.' },
  ],
  nextSceneId: 'scene-7c-transition',
};

const scene7bFlipResult: Scene = {
  id: 'scene-7b-flip-result',
  backgroundId: 'text-screen',
  dialog: [
    { text: '"Deflection. Interesting."', speakerId: 'quinn', emotion: 'smirking' },
    { text: 'But they answer anyway: "Someone who doesn\'t waste my time."' },
    { text: 'The ball\'s back in your court.' },
  ],
  nextSceneId: 'scene-7c-transition',
};

const scene7bNeedyResult: Scene = {
  id: 'scene-7b-needy-result',
  backgroundId: 'text-screen',
  dialog: [
    { text: '"Tired of games?"', speakerId: 'quinn', emotion: 'neutral' },
    { text: 'Their reply is shorter now. Polite but distant.' },
    { text: 'You can feel them pulling back. Bitter isn\'t attractive.' },
  ],
  nextSceneId: 'scene-7c-transition',
};

// Ending scenes
const scene7cDirectResult: Scene = {
  id: 'scene-7c-direct-result',
  backgroundId: 'text-screen',
  dialog: [
    { text: '"Thursday works. There\'s this place in [neighborhood]. 8pm?"', speakerId: 'quinn', emotion: 'happy' },
    { text: 'You have a date. Thursday at 8.' },
    { text: 'The app did its job. Now it\'s up to you.' },
  ],
  isEnding: true,
  outcomeType: 'good',
  endingTitle: 'The Closer',
  endingSummary: 'Date secured. You moved from pixels to reality. The real game starts Thursday.',
};

const scene7cVagueResult: Scene = {
  id: 'scene-7c-vague-result',
  backgroundId: 'text-screen',
  dialog: [
    { text: '"Yeah totally!"', speakerId: 'quinn', emotion: 'neutral' },
    { text: 'A week passes. Then two. The conversation slows to a trickle.' },
    { text: '"Sometime" never came.' },
  ],
  isEnding: true,
  outcomeType: 'bad',
  endingTitle: 'The Fader',
  endingSummary: '"Sometime" means never. The conversation died in the drafts.',
};

const scene7cWaitResult: Scene = {
  id: 'scene-7c-wait-result',
  backgroundId: 'text-screen',
  dialog: [
    { text: 'You keep the conversation going. Waiting for them to suggest it.' },
    { text: 'They don\'t. Neither do you.' },
    { text: 'A month later, you\'re still just... messaging.' },
  ],
  isEnding: true,
  outcomeType: 'neutral',
  endingTitle: 'The Pen Pal',
  endingSummary: 'Still messaging. Neither advancing nor retreating. The app becomes a pen pal service.',
};

const scene7cNumberResult: Scene = {
  id: 'scene-7c-number-result',
  backgroundId: 'text-screen',
  dialog: [
    { text: '"Sure."', speakerId: 'quinn', emotion: 'neutral' },
    { text: 'You have the number. Progress.' },
    { text: 'But now you need to actually use it.' },
  ],
  isEnding: true,
  outcomeType: 'neutral',
  endingTitle: 'The Number',
  endingSummary: 'Got the digits. But a number means nothing until it becomes a date.',
};

export const mission7Scenes: Scene[] = [
  scene7a, scene7aFunnyResult, scene7aDeepResult, scene7aDodgeResult, scene7aBoringResult,
  scene7b, scene7bHonestResult, scene7bCasualResult, scene7bFlipResult, scene7bNeedyResult,
  scene7c, scene7cDirectResult, scene7cVagueResult, scene7cWaitResult, scene7cNumberResult,
];

export const mission7Scenario: DatingScenario = {
  id: MISSION_ID,
  levelId: 'social-scene',
  missionNumber: 7,
  title: missionMetadata.title,
  tagline: 'Where first impressions are crafted.',
  description: missionMetadata.objective,
  objective: missionMetadata.objective,
  tier: missionMetadata.tier,
  estimatedMinutes: missionMetadata.estimatedMinutes,
  difficulty: missionMetadata.difficulty,
  characters,
  scenes: mission7Scenes,
  rewards,
  startSceneId: 'scene-7a-match',
};

export default mission7Scenario;
