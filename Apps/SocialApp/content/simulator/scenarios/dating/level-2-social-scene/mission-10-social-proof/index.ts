// Mission 10: Social Proof
// Objective: Master the art of preselection. Use social proof to elevate your value.
import type { Scene } from '../../../../types';
import type { DatingScenario, MissionRewards } from '../../types';
import { characters } from '../metadata';

export const MISSION_ID = 'mission-10-social-proof';

export const missionMetadata = {
  id: MISSION_ID,
  number: 10,
  title: 'Social Proof',
  objective: 'Master the art of preselection. Use social proof to elevate your value.',
  tier: 'premium' as const,
  estimatedMinutes: 15,
  difficulty: 'advanced' as const,
};

export const rewards: MissionRewards = {
  power: 25,
  mask: 30,
  vision: 25,
  unlocks: 'level-3-gala',
};

// Scene 10A: The Event
const scene10a: Scene = {
  id: 'scene-10a-event',
  backgroundId: 'bar',
  dialog: [
    {
      text: 'High-end networking event. Skyler is here. The one everyone wants.',
    },
    {
      text: 'You\'ve seen three people approach them directly. All three walked away empty-handed.',
    },
    {
      speakerId: 'inner-voice',
      text: 'Direct won\'t work here. How do you get them to notice you instead?',
      emotion: 'knowing',
    },
  ],
  choices: [
    {
      id: 'choice-10a-direct',
      text: 'Approach Skyler directly. Confidence wins.',
      nextSceneId: 'scene-10a-direct-result',
      xpBonus: 5,
      feedback: 'You\'re the 12th person to try this tonight. Not memorable.',
    },
    {
      id: 'choice-10a-orbit',
      text: 'Position yourself in their orbit. Let them notice you.',
      nextSceneId: 'scene-10a-orbit-result',
      xpBonus: 8,
      feedback: 'Proximity matters. But you\'re still just hovering.',
    },
    {
      id: 'choice-10a-preselect',
      text: 'Work the room. Be seen talking to other attractive people.',
      nextSceneId: 'scene-10a-preselect-result',
      isOptimal: true,
      xpBonus: 15,
      feedback: 'If others want you, you must be valuable. Let them see that.',
    },
    {
      id: 'choice-10a-wait',
      text: 'Wait for the perfect moment.',
      nextSceneId: 'scene-10a-wait-result',
      xpBonus: 0,
      feedback: 'You stood in the corner all night. The moment never came.',
    },
  ],
};

// Scene 10B: The Preselection (KEY SCENE FOR SECRET UNLOCK)
const scene10b: Scene = {
  id: 'scene-10b-preselection',
  backgroundId: 'bar',
  dialog: [
    {
      text: 'You\'ve been social. Laughing with groups. Multiple people have shown interest.',
    },
    {
      text: 'Skyler is watching now. They\'ve noticed you didn\'t approach them.',
      speakerId: 'skyler',
      emotion: 'curious',
    },
    {
      text: 'They start walking toward you.',
    },
    {
      speakerId: 'inner-voice',
      text: 'They came to you. Don\'t blow this by looking too available.',
      emotion: 'knowing',
    },
  ],
  choices: [
    {
      id: 'choice-10b-acknowledge',
      text: 'Turn and give them your full attention.',
      nextSceneId: 'scene-10b-acknowledge-result',
      xpBonus: 5,
      feedback: 'You dropped everyone to focus on them. They noticed.',
    },
    {
      id: 'choice-10b-brief',
      text: 'Brief acknowledgment. "Hey. Give me one second."',
      nextSceneId: 'scene-10b-brief-result',
      isOptimal: true,
      xpBonus: 20,
      feedback: 'They had to wait. For you. Perfect.',
      tactic: 'preselection',
    },
    {
      id: 'choice-10b-ignore',
      text: 'Continue your current conversation. Let them wait.',
      nextSceneId: 'scene-10b-ignore-result',
      xpBonus: 10,
      feedback: 'Strong. Maybe too strong. But they\'re definitely intrigued.',
    },
    {
      id: 'choice-10b-excited',
      text: '"Finally! I was hoping you\'d come over."',
      nextSceneId: 'scene-10b-excited-result',
      xpBonus: 0,
      feedback: 'You admitted you were waiting for them. Everything you built just collapsed.',
    },
  ],
};

// Scene 10C: The Close (KEY SCENE FOR SECRET UNLOCK)
const scene10c: Scene = {
  id: 'scene-10c-close',
  backgroundId: 'bar',
  dialog: [
    {
      text: 'Conversation with Skyler is going well. They\'re intrigued.',
    },
    {
      text: '"This is the most interesting conversation I\'ve had tonight. What are you doing after this?"',
      speakerId: 'skyler',
      emotion: 'seductive',
    },
    {
      speakerId: 'inner-voice',
      text: 'They\'re asking YOU out. This almost never happens to them. Don\'t fumble.',
      emotion: 'knowing',
    },
  ],
  choices: [
    {
      id: 'choice-10c-available',
      text: '"Nothing concrete. What did you have in mind?"',
      nextSceneId: 'scene-10c-available-result',
      xpBonus: 10,
      feedback: 'Open but not desperate. Solid.',
    },
    {
      id: 'choice-10c-busy',
      text: '"I have plans, but they\'re flexible."',
      nextSceneId: 'scene-10c-busy-result',
      isOptimal: true,
      xpBonus: 25,
      feedback: 'You have a life. But you\'ll make room. Perfect.',
      tactic: 'scarcity',
    },
    {
      id: 'choice-10c-eager',
      text: '"I\'m free! Whatever you want."',
      nextSceneId: 'scene-10c-eager-result',
      xpBonus: 0,
      feedback: 'All your mystique evaporated in one sentence.',
    },
    {
      id: 'choice-10c-raincheck',
      text: '"Not tonight, but I\'m intrigued. Let\'s exchange numbers."',
      nextSceneId: 'scene-10c-raincheck-result',
      xpBonus: 8,
      feedback: 'Strategic delay. Might work. Might lose momentum.',
    },
  ],
};

// Scene 10A Results
const scene10aDirectResult: Scene = {
  id: 'scene-10a-direct-result',
  backgroundId: 'bar',
  dialog: [
    { text: 'You walk over. Confident smile.' },
    { text: 'Skyler looks at you. Polite but distant.', speakerId: 'skyler', emotion: 'neutral' },
    { text: '"Hi. Do I know you?"' },
    { text: 'Same response they gave the last four people.' },
  ],
  nextSceneId: 'scene-10b-preselection',
};

const scene10aOrbitResult: Scene = {
  id: 'scene-10a-orbit-result',
  backgroundId: 'bar',
  dialog: [
    { text: 'You position yourself near their group. Close enough to join, if invited.' },
    { text: 'You\'re not. Ten minutes pass.' },
    { text: 'Eventually someone talks to you. Not Skyler.' },
  ],
  nextSceneId: 'scene-10b-preselection',
};

const scene10aPreselectResult: Scene = {
  id: 'scene-10a-preselect-result',
  backgroundId: 'bar',
  dialog: [
    { text: 'You work the room. Connect with interesting people. Laugh. Flirt.' },
    { text: 'A woman touches your arm. A guy laughs at your joke. You\'re in demand.' },
    { text: 'From across the room, you catch Skyler watching.', speakerId: 'skyler', emotion: 'curious' },
  ],
  nextSceneId: 'scene-10b-preselection',
};

// EARLY FAILURE - Waiting for the "perfect moment"
const scene10aWaitResult: Scene = {
  id: 'scene-10a-wait-result',
  backgroundId: 'bar',
  dialog: [
    { text: 'You find a spot with a good view. Wait for the right opening.' },
    { text: 'An hour passes. The event winds down.' },
    { text: 'Skyler leaves with someone else. The moment never came.' },
  ],
  isEnding: true,
  outcomeType: 'bad',
  endingTitle: 'The Wallflower',
  endingSummary: 'You waited for perfect. Perfect doesn\'t exist. The night ended without you in it.',
};

// Scene 10B Results
const scene10bAcknowledgeResult: Scene = {
  id: 'scene-10b-acknowledge-result',
  backgroundId: 'bar',
  dialog: [
    { text: 'You turn. Full attention on Skyler.' },
    { text: 'The people you were talking to drift away. Skyler noticed.', speakerId: 'skyler', emotion: 'smirking' },
    { text: 'They know they have your full focus now.' },
  ],
  nextSceneId: 'scene-10c-close',
};

const scene10bBriefResult: Scene = {
  id: 'scene-10b-brief-result',
  backgroundId: 'bar',
  dialog: [
    { text: '"Give me one second—" You finish your thought to the person you were talking to.' },
    { text: 'Skyler waits. For you.', speakerId: 'skyler', emotion: 'curious' },
    { text: 'When you turn to them, there\'s new respect in their eyes.' },
  ],
  nextSceneId: 'scene-10c-close',
};

const scene10bIgnoreResult: Scene = {
  id: 'scene-10b-ignore-result',
  backgroundId: 'bar',
  dialog: [
    { text: 'You continue your conversation. Let Skyler wait.' },
    { text: 'A full minute passes. They hover awkwardly.', speakerId: 'skyler', emotion: 'confused' },
    { text: 'When you finally turn, they look almost... off-balance.' },
  ],
  nextSceneId: 'scene-10c-close',
};

const scene10bExcitedResult: Scene = {
  id: 'scene-10b-excited-result',
  backgroundId: 'bar',
  dialog: [
    { text: 'Your face lights up. "Finally!"' },
    { text: 'Skyler blinks. Something shifts behind their eyes.', speakerId: 'skyler', emotion: 'cold' },
    { text: 'So you were waiting for them. All that social proof was an act. They see through it now.' },
  ],
  nextSceneId: 'scene-10c-close',
};

// Ending scenes
const scene10cAvailableResult: Scene = {
  id: 'scene-10c-available-result',
  backgroundId: 'bar',
  dialog: [
    { text: '"Nothing concrete." Skyler smiles.', speakerId: 'skyler', emotion: 'happy' },
    { text: '"Good. There\'s a place I know. Come on."' },
    { text: 'You leave together. Not desperate. Not aloof. Just... available.' },
  ],
  isEnding: true,
  outcomeType: 'neutral',
  endingTitle: 'The Open Door',
  endingSummary: 'Available without being desperate. Solid close. Level 2 complete.',
};

const scene10cBusyResult: Scene = {
  id: 'scene-10c-busy-result',
  backgroundId: 'bar',
  dialog: [
    { text: 'Skyler\'s eyebrows rise. Intrigued.', speakerId: 'skyler', emotion: 'curious' },
    { text: '"Cancel them."' },
    { text: 'You pretend to think about it. "For you? I suppose I could."' },
  ],
  isEnding: true,
  outcomeType: 'good',
  endingTitle: 'The Perfect Close',
  endingSummary: 'Skyler is hooked. You\'re the prize they won. Level 2 complete. SECRET UNLOCKED: The Inner Circle.',
};

const scene10cEagerResult: Scene = {
  id: 'scene-10c-eager-result',
  backgroundId: 'bar',
  dialog: [
    { text: 'Skyler\'s expression shifts. Just slightly.', speakerId: 'skyler', emotion: 'cold' },
    { text: '"Oh. Okay then."' },
    { text: 'The energy changes. You went from prize to available. Too available.' },
  ],
  isEnding: true,
  outcomeType: 'bad',
  endingTitle: 'The Crash',
  endingSummary: 'All your work undone by one eager sentence. They\'ll text. Maybe. Level 2 complete.',
};

const scene10cRaincheckResult: Scene = {
  id: 'scene-10c-raincheck-result',
  backgroundId: 'bar',
  dialog: [
    { text: 'Skyler considers.', speakerId: 'skyler', emotion: 'neutral' },
    { text: '"Playing hard to get?"' },
    { text: '"Playing smart." You exchange numbers. They\'ll text first. Probably.' },
  ],
  isEnding: true,
  outcomeType: 'neutral',
  endingTitle: 'The Slow Burn',
  endingSummary: 'You built intrigue but delayed the close. Strategic gamble. Level 2 complete.',
};

export const mission10Scenes: Scene[] = [
  scene10a, scene10aDirectResult, scene10aOrbitResult, scene10aPreselectResult, scene10aWaitResult,
  scene10b, scene10bAcknowledgeResult, scene10bBriefResult, scene10bIgnoreResult, scene10bExcitedResult,
  scene10c, scene10cAvailableResult, scene10cBusyResult, scene10cEagerResult, scene10cRaincheckResult,
];

export const mission10Scenario: DatingScenario = {
  id: MISSION_ID,
  levelId: 'social-scene',
  missionNumber: 10,
  title: missionMetadata.title,
  tagline: 'Make them come to you.',
  description: missionMetadata.objective,
  objective: missionMetadata.objective,
  tier: missionMetadata.tier,
  estimatedMinutes: missionMetadata.estimatedMinutes,
  difficulty: missionMetadata.difficulty,
  characters,
  scenes: mission10Scenes,
  rewards,
  startSceneId: 'scene-10a-event',
};

export default mission10Scenario;
