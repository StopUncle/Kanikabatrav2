// Mission 8: The Setup
// Objective: Navigate a friend-of-friend introduction. Social proof meets scrutiny.
import type { Scene } from '../../../../types';
import type { DatingScenario, MissionRewards } from '../../types';
import { characters } from '../metadata';

export const MISSION_ID = 'mission-8-the-setup';

export const missionMetadata = {
  id: MISSION_ID,
  number: 8,
  title: 'The Setup',
  objective: 'Navigate a friend-of-friend introduction. Social proof meets scrutiny.',
  tier: 'premium' as const,
  estimatedMinutes: 12,
  difficulty: 'intermediate' as const,
};

export const rewards: MissionRewards = {
  power: 15,
  mask: 20,
  vision: 15,
  unlocks: 'mission-9-the-ex',
};

// Scene 8A: The Introduction
const scene8a: Scene = {
  id: 'scene-8a-introduction',
  backgroundId: 'restaurant',
  dialog: [
    {
      text: 'Dinner party. Blake brought you to meet Avery - "perfect for you" they said.',
    },
    {
      text: 'Avery is across the table. Attractive, successful, clearly briefed on you.',
      speakerId: 'avery',
      emotion: 'happy',
    },
    {
      speakerId: 'inner-voice',
      text: 'A setup. They\'re not just sizing you up - they\'re judging if Blake has good taste.',
      emotion: 'knowing',
    },
  ],
  choices: [
    {
      id: 'choice-8a-acknowledge',
      text: '"So you\'re the famous Avery. Blake won\'t shut up about you."',
      nextSceneId: 'scene-8a-acknowledge-result',
      isOptimal: true,
      xpBonus: 15,
      feedback: 'Acknowledges the setup without making it weird. Flattering but light.',
    },
    {
      id: 'choice-8a-ignore',
      text: 'Ignore the setup. Talk to them like you would anyone.',
      nextSceneId: 'scene-8a-ignore-result',
      xpBonus: 10,
      feedback: 'Natural. But you\'re pretending the elephant isn\'t in the room.',
    },
    {
      id: 'choice-8a-eager',
      text: '"I\'ve been looking forward to meeting you."',
      nextSceneId: 'scene-8a-eager-result',
      xpBonus: 5,
      feedback: 'You just told them they\'re the prize. Now they know.',
    },
    {
      id: 'choice-8a-dismissive',
      text: 'Be polite but clearly disinterested.',
      nextSceneId: 'scene-8a-dismissive-result',
      xpBonus: 0,
      feedback: 'Rude to Blake who set this up. Your social circle will hear about this.',
    },
  ],
};

// Scene 8B: The Test
const scene8b: Scene = {
  id: 'scene-8b-test',
  backgroundId: 'restaurant',
  dialog: [
    {
      text: 'Conversation is flowing. Avery leans in.',
    },
    {
      text: '"So what did Blake actually tell you about me? I\'m curious."',
      speakerId: 'avery',
      emotion: 'curious',
    },
    {
      speakerId: 'inner-voice',
      text: 'Whatever you say reflects on Blake. And reveals how much you were briefed.',
      emotion: 'concerned',
    },
  ],
  choices: [
    {
      id: 'choice-8b-honest',
      text: '"That you\'re smart, picky, and don\'t waste time. So far accurate."',
      nextSceneId: 'scene-8b-honest-result',
      isOptimal: true,
      xpBonus: 15,
      feedback: 'Honest. Flattering. Shows you listened. Perfect.',
    },
    {
      id: 'choice-8b-tease',
      text: '"Nothing you\'d want repeated. Don\'t worry, I\'ll form my own opinions."',
      nextSceneId: 'scene-8b-tease-result',
      xpBonus: 10,
      feedback: 'Playful. But now they might wonder what Blake said.',
    },
    {
      id: 'choice-8b-deflect',
      text: '"Enough to be curious. Why don\'t you tell me the real version?"',
      nextSceneId: 'scene-8b-deflect-result',
      xpBonus: 8,
      feedback: 'You flipped the question. Smart, but a bit evasive.',
    },
    {
      id: 'choice-8b-oversell',
      text: '"All amazing things. They talked you up a lot."',
      nextSceneId: 'scene-8b-oversell-result',
      xpBonus: 0,
      feedback: 'You just admitted you were prepped to like them. They noticed.',
    },
  ],
};

// Scene 8C: The After
const scene8c: Scene = {
  id: 'scene-8c-after',
  backgroundId: 'restaurant',
  dialog: [
    {
      text: 'Dinner ending. Avery touches your arm.',
    },
    {
      text: '"This was better than I expected. We should do this again. Just us."',
      speakerId: 'avery',
      emotion: 'seductive',
    },
    {
      speakerId: 'inner-voice',
      text: 'They made the move. Now it\'s about how you receive it.',
      emotion: 'knowing',
    },
  ],
  choices: [
    {
      id: 'choice-8c-accept',
      text: '"I\'d like that. I\'ll text you."',
      nextSceneId: 'scene-8c-accept-result',
      isOptimal: true,
      xpBonus: 15,
      feedback: 'Interested, but you control when and where.',
    },
    {
      id: 'choice-8c-keen',
      text: '"Yes! When are you free?"',
      nextSceneId: 'scene-8c-keen-result',
      xpBonus: 5,
      feedback: 'Eager. You just handed them the scheduling power.',
    },
    {
      id: 'choice-8c-cool',
      text: '"Maybe. Let me think about it."',
      nextSceneId: 'scene-8c-cool-result',
      xpBonus: 8,
      feedback: 'Intrigue, but you might be pushing it too far.',
    },
    {
      id: 'choice-8c-friends',
      text: '"As friends? Sure."',
      nextSceneId: 'scene-8c-friends-result',
      xpBonus: 0,
      feedback: 'You just friendzoned a setup. Blake will hear about this.',
    },
  ],
};

// Scene 8A Results
const scene8aAcknowledgeResult: Scene = {
  id: 'scene-8a-acknowledge-result',
  backgroundId: 'restaurant',
  dialog: [
    { text: 'Avery laughs. Genuine.', speakerId: 'avery', emotion: 'happy' },
    { text: '"Famous? I like that. Blake does talk a lot."' },
    { text: 'Blake raises a glass from across the table. Mission accomplished.', speakerId: 'blake', emotion: 'happy' },
  ],
  nextSceneId: 'scene-8b-test',
};

const scene8aIgnoreResult: Scene = {
  id: 'scene-8a-ignore-result',
  backgroundId: 'restaurant',
  dialog: [
    { text: 'You talk about normal things. The restaurant. The wine.' },
    { text: 'Avery seems... slightly thrown. They expected you to acknowledge the setup.' },
    { text: 'But the conversation flows anyway.' },
  ],
  nextSceneId: 'scene-8b-test',
};

const scene8aEagerResult: Scene = {
  id: 'scene-8a-eager-result',
  backgroundId: 'restaurant',
  dialog: [
    { text: '"Have you? That\'s sweet."', speakerId: 'avery', emotion: 'smirking' },
    { text: 'A flash of something in their eyes. You just gave them the upper hand.' },
    { text: 'Blake watches, slightly uncomfortable.' },
  ],
  nextSceneId: 'scene-8b-test',
};

// EARLY FAILURE - Being dismissive tanks the setup AND your friendship
const scene8aDismissiveResult: Scene = {
  id: 'scene-8a-dismissive-result',
  backgroundId: 'restaurant',
  dialog: [
    { text: 'You give polite, distant answers. Not rude. Just clearly... elsewhere.' },
    { text: 'Avery\'s smile fades. They get it.', speakerId: 'avery', emotion: 'cold' },
    { text: 'Blake catches your eye from across the table. They\'re not happy.' },
    { text: 'The rest of dinner is awkward. You\'ve made Blake look bad.' },
  ],
  isEnding: true,
  outcomeType: 'bad',
  endingTitle: 'The Sabotage',
  endingSummary: 'You embarrassed Blake in front of their friend. Word spreads. Your social circle shrinks.',
};

// Scene 8B Results
const scene8bHonestResult: Scene = {
  id: 'scene-8b-honest-result',
  backgroundId: 'restaurant',
  dialog: [
    { text: 'Avery\'s eyes light up.', speakerId: 'avery', emotion: 'happy' },
    { text: '"Smart and picky? That tracks. I don\'t waste time either."' },
    { text: 'They lean closer. The energy shifts.' },
  ],
  nextSceneId: 'scene-8c-after',
};

const scene8bTeaseResult: Scene = {
  id: 'scene-8b-tease-result',
  backgroundId: 'restaurant',
  dialog: [
    { text: 'Avery narrows their eyes. Playfully.', speakerId: 'avery', emotion: 'smirking' },
    { text: '"Now I have to know what they said."' },
    { text: 'You shrug. "Buy me dinner sometime and maybe I\'ll tell you."' },
  ],
  nextSceneId: 'scene-8c-after',
};

const scene8bDeflectResult: Scene = {
  id: 'scene-8b-deflect-result',
  backgroundId: 'restaurant',
  dialog: [
    { text: '"Smooth deflection."', speakerId: 'avery', emotion: 'smirking' },
    { text: 'They consider for a moment, then shrug.' },
    { text: '"Fine. The real version is... I\'m here because Blake has good taste. Usually."' },
  ],
  nextSceneId: 'scene-8c-after',
};

const scene8bOversellResult: Scene = {
  id: 'scene-8b-oversell-result',
  backgroundId: 'restaurant',
  dialog: [
    { text: '"All amazing things?"', speakerId: 'avery', emotion: 'smirking' },
    { text: 'Something shifts in their posture. They know you came here primed to like them.' },
    { text: 'The dynamic just changed. You\'re the one who was sold on this.' },
  ],
  nextSceneId: 'scene-8c-after',
};

// Ending scenes
const scene8cAcceptResult: Scene = {
  id: 'scene-8c-accept-result',
  backgroundId: 'restaurant',
  dialog: [
    { text: 'Avery smiles. Real this time.', speakerId: 'avery', emotion: 'happy' },
    { text: '"Looking forward to it."' },
    { text: 'You have their number. Blake is beaming across the table.' },
  ],
  isEnding: true,
  outcomeType: 'good',
  endingTitle: 'The Connection',
  endingSummary: 'Setup successful. You left interested, in control, and with a date pending.',
};

const scene8cKeenResult: Scene = {
  id: 'scene-8c-keen-result',
  backgroundId: 'restaurant',
  dialog: [
    { text: '"Eager."', speakerId: 'avery', emotion: 'smirking' },
    { text: 'They pull out their phone. "Let me check my calendar..."' },
    { text: 'You wait while they decide when you\'ll see them next.' },
  ],
  isEnding: true,
  outcomeType: 'neutral',
  endingTitle: 'The Eager One',
  endingSummary: 'Date secured, but you\'re waiting on their schedule. They know you\'re more interested than them.',
};

const scene8cCoolResult: Scene = {
  id: 'scene-8c-cool-result',
  backgroundId: 'restaurant',
  dialog: [
    { text: 'Avery blinks. Not the response they expected.', speakerId: 'avery', emotion: 'confused' },
    { text: '"Okay then."' },
    { text: 'They pull back slightly. Intrigued or offended? Hard to tell.' },
  ],
  isEnding: true,
  outcomeType: 'neutral',
  endingTitle: 'The Gamble',
  endingSummary: 'You played it cool. Maybe too cool. They\'re either fascinated or moving on.',
};

const scene8cFriendsResult: Scene = {
  id: 'scene-8c-friends-result',
  backgroundId: 'restaurant',
  dialog: [
    { text: 'The word hangs in the air. "Friends."' },
    { text: 'Avery\'s face goes carefully neutral.', speakerId: 'avery', emotion: 'cold' },
    { text: 'Blake is staring at you from across the table. They worked for this. And you just torpedoed it.' },
  ],
  isEnding: true,
  outcomeType: 'bad',
  endingTitle: 'The Friendzone',
  endingSummary: 'You friendzoned Blake\'s pick. They won\'t set you up again.',
};

export const mission8Scenes: Scene[] = [
  scene8a, scene8aAcknowledgeResult, scene8aIgnoreResult, scene8aEagerResult, scene8aDismissiveResult,
  scene8b, scene8bHonestResult, scene8bTeaseResult, scene8bDeflectResult, scene8bOversellResult,
  scene8c, scene8cAcceptResult, scene8cKeenResult, scene8cCoolResult, scene8cFriendsResult,
];

export const mission8Scenario: DatingScenario = {
  id: MISSION_ID,
  levelId: 'social-scene',
  missionNumber: 8,
  title: missionMetadata.title,
  tagline: 'When friends become wingmen.',
  description: missionMetadata.objective,
  objective: missionMetadata.objective,
  tier: missionMetadata.tier,
  estimatedMinutes: missionMetadata.estimatedMinutes,
  difficulty: missionMetadata.difficulty,
  characters,
  scenes: mission8Scenes,
  rewards,
  startSceneId: 'scene-8a-introduction',
};

export default mission8Scenario;
