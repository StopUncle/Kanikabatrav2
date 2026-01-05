// Mission 6: The Club
// Objective: Navigate a nightclub environment and establish yourself as high-value.
import type { Scene } from '../../../../types';
import type { DatingScenario, MissionRewards } from '../../types';
import { characters } from '../metadata';

export const MISSION_ID = 'mission-6-the-club';

export const missionMetadata = {
  id: MISSION_ID,
  number: 6,
  title: 'The Club',
  objective: 'Navigate a nightclub environment and establish yourself as high-value.',
  tier: 'free' as const,
  estimatedMinutes: 10,
  difficulty: 'intermediate' as const,
};

export const rewards: MissionRewards = {
  power: 15,
  mask: 15,
  vision: 10,
  unlocks: 'mission-7-dating-apps',
};

// Scene 6A: The Entrance
const scene6a: Scene = {
  id: 'scene-6a-entrance',
  backgroundId: 'bar',
  dialog: [
    {
      text: 'Upscale club. Velvet rope. Line around the block.',
    },
    {
      text: 'You could wait in line. You could try to talk your way in. You could arrive with Blake who has a connection.',
    },
    {
      speakerId: 'inner-voice',
      text: 'First impressions stick. How do you want to be seen tonight?',
      emotion: 'knowing',
    },
  ],
  choices: [
    {
      id: 'choice-6a-line',
      text: 'Wait in line like everyone else.',
      nextSceneId: 'scene-6a-line-result',
      xpBonus: 0,
      feedback: 'An hour later, you\'re still outside. The night\'s already over.',
    },
    {
      id: 'choice-6a-talk',
      text: 'Approach the bouncer directly. Confident eye contact.',
      nextSceneId: 'scene-6a-talk-result',
      xpBonus: 10,
      feedback: 'Bold move. He\'s sizing you up.',
    },
    {
      id: 'choice-6a-blake',
      text: 'Arrive with Blake. Let him handle it.',
      nextSceneId: 'scene-6a-blake-result',
      xpBonus: 8,
      feedback: 'You\'re in, but you\'re Blake\'s plus-one tonight.',
    },
    {
      id: 'choice-6a-late',
      text: 'Arrive late when the line is gone. Walk straight in.',
      nextSceneId: 'scene-6a-late-result',
      isOptimal: true,
      xpBonus: 15,
      feedback: 'No waiting. No begging. Just walked in like you owned it.',
    },
  ],
};

// Scene 6B: The Floor
const scene6b: Scene = {
  id: 'scene-6b-floor',
  backgroundId: 'bar',
  dialog: [
    {
      text: 'Inside. Bass vibrating through your chest. Beautiful people everywhere, all pretending not to notice each other.',
    },
    {
      text: 'Jamie catches your eye from across the room. They nod. They remember you.',
      speakerId: 'jamie',
      emotion: 'smirking',
    },
    {
      speakerId: 'inner-voice',
      text: 'Where do you plant yourself?',
      emotion: 'curious',
    },
  ],
  choices: [
    {
      id: 'choice-6b-dance',
      text: 'Hit the dance floor. Own the space.',
      nextSceneId: 'scene-6b-dance-result',
      xpBonus: 8,
      feedback: 'You\'re visible. Maybe too visible.',
    },
    {
      id: 'choice-6b-bar',
      text: 'Claim a spot at the bar. Central. Relaxed.',
      nextSceneId: 'scene-6b-bar-result',
      isOptimal: true,
      xpBonus: 15,
      feedback: 'Prime real estate. People naturally gravitate here.',
    },
    {
      id: 'choice-6b-vip',
      text: 'Hover near VIP. Look like you belong.',
      nextSceneId: 'scene-6b-vip-result',
      xpBonus: 5,
      feedback: 'Security gives you a look. You\'re not fooling anyone.',
    },
    {
      id: 'choice-6b-corner',
      text: 'Find a corner. Watch first.',
      nextSceneId: 'scene-6b-corner-result',
      xpBonus: 10,
      feedback: 'Safe. Strategic. But nobody notices you.',
    },
  ],
};

// Scene 6C: The Approach
const scene6c: Scene = {
  id: 'scene-6c-approach',
  backgroundId: 'bar',
  dialog: [
    {
      text: 'Skyler is nearby. The most attractive person in the room. Everyone steals glances at them.',
    },
    {
      text: 'They catch you NOT looking. Their eyes linger a moment longer.',
      speakerId: 'skyler',
      emotion: 'neutral',
    },
    {
      speakerId: 'inner-voice',
      text: 'They noticed you. What now?',
      emotion: 'curious',
    },
  ],
  choices: [
    {
      id: 'choice-6c-direct',
      text: 'Walk straight over. Introduce yourself.',
      nextSceneId: 'scene-6c-direct-result',
      xpBonus: 8,
      feedback: 'You\'re the fifth person to do this tonight. But you did it better.',
    },
    {
      id: 'choice-6c-proximity',
      text: 'Move nearby but don\'t approach. Let them come to you.',
      nextSceneId: 'scene-6c-proximity-result',
      isOptimal: true,
      xpBonus: 15,
      feedback: 'You\'re close. Accessible. But you\'re not chasing.',
    },
    {
      id: 'choice-6c-ignore',
      text: 'Turn and start talking to someone else entirely.',
      nextSceneId: 'scene-6c-ignore-result',
      xpBonus: 10,
      feedback: 'Risky. They might forget about you. Or they might be intrigued.',
    },
    {
      id: 'choice-6c-drink',
      text: 'Send them a drink with a smile.',
      nextSceneId: 'scene-6c-drink-result',
      xpBonus: 0,
      feedback: 'The bartender delivers it. Skyler glances at you, accepts it politely, turns away.',
    },
  ],
};

// Scene 6A Results - EARLY FAILURE for line choice
const scene6aLineResult: Scene = {
  id: 'scene-6a-line-result',
  backgroundId: 'bar',
  dialog: [
    { text: 'Forty-five minutes. The line barely moved.' },
    { text: 'A group behind you gets waved in. "VIP list." The bouncer doesn\'t even look at you.' },
    { text: 'By the time you get in, your energy is shot. You spend the night in a corner, nursing one drink.', speakerId: null, emotion: 'neutral' },
  ],
  isEnding: true,
  outcomeType: 'bad',
  endingTitle: 'The Wait',
  endingSummary: 'You waited like everyone else. You were treated like everyone else. The night was dead before it started.',
};

const scene6aTalkResult: Scene = {
  id: 'scene-6a-talk-result',
  backgroundId: 'bar',
  dialog: [
    { text: 'The bouncer looks you up and down.' },
    { text: '"You on the list?"', speakerId: null, emotion: 'neutral' },
    { text: 'You hold his gaze. "I should be."' },
    { text: 'A beat. Then he unclips the rope. "Don\'t make me regret it."' },
  ],
  nextSceneId: 'scene-6b-floor',
};

const scene6aBlakeResult: Scene = {
  id: 'scene-6a-blake-result',
  backgroundId: 'bar',
  dialog: [
    { text: 'Blake walks up like he owns the place. Handshake with the bouncer. You\'re in.' },
    { text: '"This is my friend," Blake says. The bouncer nods at you. An afterthought.', speakerId: 'blake', emotion: 'happy' },
    { speakerId: 'inner-voice', text: 'You\'re in. But you\'re Blake\'s shadow right now.', emotion: 'neutral' },
  ],
  nextSceneId: 'scene-6b-floor',
};

const scene6aLateResult: Scene = {
  id: 'scene-6a-late-result',
  backgroundId: 'bar',
  dialog: [
    { text: '11:30 PM. Line is gone. You walk past the rope like you\'ve done it a thousand times.' },
    { text: 'The bouncer gives you a nod. Respect for the move.' },
    { speakerId: 'inner-voice', text: 'No waiting. No pleading. Just walked in.', emotion: 'knowing' },
  ],
  nextSceneId: 'scene-6b-floor',
};

// Scene 6B Results
const scene6bDanceResult: Scene = {
  id: 'scene-6b-dance-result',
  backgroundId: 'bar',
  dialog: [
    { text: 'You hit the floor. Moving with the music, not against it.' },
    { text: 'A few people notice. A woman smiles. A guy nods appreciation.' },
    { speakerId: 'inner-voice', text: 'You\'re visible. Everyone can see you. Including the ones you want to see you.', emotion: 'knowing' },
  ],
  nextSceneId: 'scene-6c-approach',
};

const scene6bBarResult: Scene = {
  id: 'scene-6b-bar-result',
  backgroundId: 'bar',
  dialog: [
    { text: 'You claim a spot at the bar. Order something that says "I\'m staying."' },
    { text: 'The bartender remembers your face. People flow past you. Some linger.', speakerId: null, emotion: 'neutral' },
    { speakerId: 'inner-voice', text: 'Central. Accessible. But not chasing anyone.', emotion: 'knowing' },
  ],
  nextSceneId: 'scene-6c-approach',
};

const scene6bVipResult: Scene = {
  id: 'scene-6b-vip-result',
  backgroundId: 'bar',
  dialog: [
    { text: 'You drift toward the VIP section. Trying to look like you belong.' },
    { text: 'Security clocks you immediately. One of them shifts his weight. A warning.' },
    { speakerId: 'inner-voice', text: 'You\'re not fooling anyone. People who belong don\'t hover.', emotion: 'concerned' },
  ],
  nextSceneId: 'scene-6c-approach',
};

const scene6bCornerResult: Scene = {
  id: 'scene-6b-corner-result',
  backgroundId: 'bar',
  dialog: [
    { text: 'You find a spot with a good view. Watching the room. Learning the dynamics.' },
    { text: 'Nobody approaches. Nobody notices. You\'re invisible.' },
    { speakerId: 'inner-voice', text: 'Safe. But you didn\'t come here to be safe.', emotion: 'neutral' },
  ],
  nextSceneId: 'scene-6c-approach',
};

// Ending scenes
const scene6cDirectResult: Scene = {
  id: 'scene-6c-direct-result',
  backgroundId: 'bar',
  dialog: [
    { text: 'You walk over. Confident stride. Stop just inside their space.' },
    { text: '"I\'m not going to use a line. I just wanted to meet you."' },
    { text: 'Skyler looks amused. "That was a line."', speakerId: 'skyler', emotion: 'smirking' },
    { text: 'But they\'re smiling. And they don\'t walk away.' },
  ],
  isEnding: true,
  outcomeType: 'neutral',
  endingTitle: 'The Bold Move',
  endingSummary: 'Direct approach worked. You\'re talking. But you came to them—they know they\'re the prize.',
};

const scene6cProximityResult: Scene = {
  id: 'scene-6c-proximity-result',
  backgroundId: 'bar',
  dialog: [
    { text: 'You position yourself nearby. Close enough to notice. Not close enough to seem eager.' },
    { text: 'A minute passes. Two. Then Skyler turns.' },
    { text: '"You\'re the only person who hasn\'t tried to talk to me tonight."', speakerId: 'skyler', emotion: 'curious' },
    { text: '"Night\'s young."' },
    { text: 'They laugh. Step closer.', speakerId: 'skyler', emotion: 'happy' },
  ],
  isEnding: true,
  outcomeType: 'good',
  endingTitle: 'The Magnet',
  endingSummary: 'They came to you. You stood out by not chasing. Now they\'re curious.',
};

const scene6cIgnoreResult: Scene = {
  id: 'scene-6c-ignore-result',
  backgroundId: 'bar',
  dialog: [
    { text: 'You turn and start a conversation with someone else entirely. Genuine. Engaged.' },
    { text: 'From the corner of your eye, you see Skyler glance your way. Once. Twice.' },
    { text: 'But you\'re genuinely interested in this new conversation now.' },
    { speakerId: 'inner-voice', text: 'You might have just found someone more interesting anyway.', emotion: 'knowing' },
  ],
  isEnding: true,
  outcomeType: 'neutral',
  endingTitle: 'The Pivot',
  endingSummary: 'You didn\'t chase the obvious choice. You might have found something better. Or you might have missed your shot.',
};

const scene6cDrinkResult: Scene = {
  id: 'scene-6c-drink-result',
  backgroundId: 'bar',
  dialog: [
    { text: 'You flag the bartender. Send over something expensive.' },
    { text: 'Skyler receives it. Looks over. Polite smile. Raises the glass.' },
    { text: 'Then turns back to their friends. The conversation doesn\'t include you.' },
    { speakerId: 'inner-voice', text: 'You bought a thank-you wave. Not interest.', emotion: 'sad' },
  ],
  isEnding: true,
  outcomeType: 'bad',
  endingTitle: 'The Provider',
  endingSummary: 'You bought attention, not attraction. Skyler was polite. That\'s all you got.',
};

export const mission6Scenes: Scene[] = [
  scene6a, scene6aLineResult, scene6aTalkResult, scene6aBlakeResult, scene6aLateResult,
  scene6b, scene6bDanceResult, scene6bBarResult, scene6bVipResult, scene6bCornerResult,
  scene6c, scene6cDirectResult, scene6cProximityResult, scene6cIgnoreResult, scene6cDrinkResult,
];

export const mission6Scenario: DatingScenario = {
  id: MISSION_ID,
  levelId: 'social-scene',
  missionNumber: 6,
  title: missionMetadata.title,
  tagline: 'Where status is displayed and tested.',
  description: missionMetadata.objective,
  objective: missionMetadata.objective,
  tier: missionMetadata.tier,
  estimatedMinutes: missionMetadata.estimatedMinutes,
  difficulty: missionMetadata.difficulty,
  characters,
  scenes: mission6Scenes,
  rewards,
  startSceneId: 'scene-6a-entrance',
};

export default mission6Scenario;
