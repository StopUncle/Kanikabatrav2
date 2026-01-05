// Mission 4: The Study Group
// Objective: Deepen your connection with your target and establish yourself as valuable.
import type { Scene } from '../../../../types';
import type { DatingScenario, MissionRewards } from '../../types';
import { characters } from '../metadata';

export const MISSION_ID = 'mission-4-study-group';

export const missionMetadata = {
  id: MISSION_ID,
  number: 4,
  title: 'The Study Group',
  objective: 'Deepen your connection with your primary target and establish yourself as valuable.',
  tier: 'free' as const,
  estimatedMinutes: 12,
  difficulty: 'intermediate' as const,
};

export const rewards: MissionRewards = {
  power: 18,
  mask: 25,
  vision: 20,
  unlocks: 'mission-5-love-triangle',
};

// Scene 4A: The Coincidental Meeting
const scene4a: Scene = {
  id: 'scene-4a-coincidental-meeting',
  backgroundId: 'coffee-shop',
  dialog: [
    {
      text: 'A few days later. You\'re at the library. Your target (Morgan) is there studying.',
    },
    {
      text: '"Oh hey! I didn\'t expect to see you here. What are you studying?"',
      speakerId: 'morgan',
      emotion: 'happy',
    },
    {
      speakerId: 'inner-voice',
      text: 'Coincidence or intention? Make it feel natural.',
      emotion: 'neutral',
    },
  ],
  choices: [
    {
      id: 'choice-4a-optimal',
      text: '"Oh, hey! I didn\'t expect to see you. How\'s it going?"',
      nextSceneId: 'scene-4a-optimal-result',
      isOptimal: true,
      xpBonus: 15,
      feedback: 'OPTIMAL: You acted genuinely surprised, which made the encounter feel natural. They now feel like they\'re the one pursuing you.',
    },
    {
      id: 'choice-4a-close',
      text: '"Hey! Good to see you. I\'m glad we ran into each other. How\'s your week been?"',
      nextSceneId: 'scene-4a-close-result',
      xpBonus: 10,
      feedback: 'CLOSE: You were warm but not desperate. They\'re happy to see you.',
    },
    {
      id: 'choice-4a-subtle',
      text: '"Oh, hey! I\'m just here to study. What are you working on?"',
      nextSceneId: 'scene-4a-subtle-result',
      xpBonus: 5,
      feedback: 'You played it cool. They see it as genuine coincidence.',
    },
    {
      id: 'choice-4a-trap',
      text: '"I was actually hoping I might run into you. I\'ve been thinking about you since the party."',
      nextSceneId: 'scene-4a-trap-result',
      xpBonus: 0,
      feedback: 'TRAP: You revealed your intention too obviously. They see you as pursuing them too hard.',
    },
  ],
};

// Scene 4A Results
const scene4aOptimalResult: Scene = {
  id: 'scene-4a-optimal-result',
  backgroundId: 'coffee-shop',
  dialog: [
    {
      text: 'Morgan smiles, genuinely pleased.',
    },
    {
      text: '"Good! I was actually just thinking about you. Want to study together?"',
      speakerId: 'morgan',
      emotion: 'happy',
    },
    {
      text: 'You acted surprised. They initiated. The power dynamic is in your favor.',
    },
  ],
  nextSceneId: 'scene-4b-study-session',
};

const scene4aCloseResult: Scene = {
  id: 'scene-4a-close-result',
  backgroundId: 'coffee-shop',
  dialog: [
    {
      text: 'Morgan\'s face lights up.',
    },
    {
      text: '"Good, good. Yeah, I\'m glad too. Want to grab coffee after this?"',
      speakerId: 'morgan',
      emotion: 'happy',
    },
    {
      text: 'You were warm but not desperate. They\'re happy to see you.',
    },
  ],
  nextSceneId: 'scene-4b-study-session',
};

const scene4aSubtleResult: Scene = {
  id: 'scene-4a-subtle-result',
  backgroundId: 'coffee-shop',
  dialog: [
    {
      text: 'Morgan nods.',
    },
    {
      text: '"I\'m preparing for a midterm. Want to study together?"',
      speakerId: 'morgan',
      emotion: 'neutral',
    },
    {
      text: 'You played it cool. They see it as genuine coincidence.',
    },
  ],
  nextSceneId: 'scene-4b-study-session',
};

const scene4aTrapResult: Scene = {
  id: 'scene-4a-trap-result',
  backgroundId: 'coffee-shop',
  dialog: [
    {
      text: 'Morgan\'s expression shifts. A slight step back.',
    },
    {
      text: '"Oh... that\'s... nice. I\'m just studying for a midterm right now."',
      speakerId: 'morgan',
      emotion: 'neutral',
    },
    {
      text: 'You revealed your intention too obviously. They\'re now on guard.',
    },
  ],
  nextSceneId: 'scene-4b-study-session',
};

// Scene 4B: The Study Session
const scene4b: Scene = {
  id: 'scene-4b-study-session',
  backgroundId: 'coffee-shop',
  dialog: [
    {
      text: 'You\'re studying together at the library. The conversation is flowing naturally.',
    },
    {
      text: '"You\'re really smart. I like studying with you. Most people are so competitive."',
      speakerId: 'morgan',
      emotion: 'happy',
    },
    {
      speakerId: 'inner-voice',
      text: 'Show them you\'re smart but not threatening. Interested but not needy.',
      emotion: 'neutral',
    },
  ],
  choices: [
    {
      id: 'choice-4b-optimal',
      text: '"Thanks. You\'re interesting to study with. You actually think about things instead of just memorizing."',
      nextSceneId: 'scene-4b-optimal-result',
      isOptimal: true,
      xpBonus: 15,
      feedback: 'OPTIMAL: You complimented their thinking, not just their intelligence. They see you as someone who understands them.',
    },
    {
      id: 'choice-4b-close',
      text: '"I appreciate that. I like studying with you too. You make it fun instead of stressful."',
      nextSceneId: 'scene-4b-close-result',
      xpBonus: 10,
      feedback: 'CLOSE: You complimented them back genuinely. They\'re now interested in spending more time with you.',
    },
    {
      id: 'choice-4b-subtle',
      text: '"Thanks. You\'re smart too. We should study together again."',
      nextSceneId: 'scene-4b-subtle-result',
      xpBonus: 5,
      feedback: 'You accepted the compliment gracefully. They see you as confident.',
    },
    {
      id: 'choice-4b-trap',
      text: '"Oh, I\'m not that smart. You\'re the smart one. I\'m just trying to keep up."',
      nextSceneId: 'scene-4b-trap-result',
      xpBonus: 0,
      feedback: 'TRAP: You put yourself down. They lose respect for you.',
    },
  ],
};

// Scene 4B Results
const scene4bOptimalResult: Scene = {
  id: 'scene-4b-optimal-result',
  backgroundId: 'coffee-shop',
  dialog: [
    {
      text: 'Morgan looks genuinely impressed.',
    },
    {
      text: '"Exactly. Most people don\'t get that. I really like talking to you. Want to make this a regular thing?"',
      speakerId: 'morgan',
      emotion: 'happy',
    },
    {
      text: 'You complimented their thinking. They see you as someone who truly understands them.',
    },
  ],
  nextSceneId: 'scene-4c-coffee-invite',
};

const scene4bCloseResult: Scene = {
  id: 'scene-4b-close-result',
  backgroundId: 'coffee-shop',
  dialog: [
    {
      text: 'Morgan smiles warmly.',
    },
    {
      text: '"That\'s sweet. You know what? I\'m really enjoying this. Want to grab dinner after we\'re done?"',
      speakerId: 'morgan',
      emotion: 'happy',
    },
    {
      text: 'You complimented them genuinely. They\'re invested in spending more time with you.',
    },
  ],
  nextSceneId: 'scene-4c-coffee-invite',
};

const scene4bSubtleResult: Scene = {
  id: 'scene-4b-subtle-result',
  backgroundId: 'coffee-shop',
  dialog: [
    {
      text: 'Morgan nods.',
    },
    {
      text: '"Yeah, for sure. Let\'s do this regularly."',
      speakerId: 'morgan',
      emotion: 'neutral',
    },
    {
      text: 'You accepted the compliment gracefully. They see you as confident but not remarkable.',
    },
  ],
  nextSceneId: 'scene-4c-coffee-invite',
};

const scene4bTrapResult: Scene = {
  id: 'scene-4b-trap-result',
  backgroundId: 'coffee-shop',
  dialog: [
    {
      text: 'Morgan\'s expression shifts. Something lost.',
    },
    {
      text: '"Well, you\'re doing fine. I should probably focus on studying now."',
      speakerId: 'morgan',
      emotion: 'neutral',
    },
    {
      text: 'You put yourself down. They lost respect for you.',
    },
  ],
  nextSceneId: 'scene-4c-coffee-invite',
};

// Scene 4C: The Coffee Invite
const scene4c: Scene = {
  id: 'scene-4c-coffee-invite',
  backgroundId: 'coffee-shop',
  dialog: [
    {
      text: 'After studying, Morgan suggests getting coffee. You\'re now sitting at a coffee shop together.',
    },
    {
      text: '"I\'m really glad we\'re spending time together. I feel like I can be myself around you."',
      speakerId: 'morgan',
      emotion: 'happy',
    },
    {
      speakerId: 'inner-voice',
      text: 'This is a one-on-one moment. Deepen the connection or maintain mystery?',
      emotion: 'neutral',
    },
  ],
  choices: [
    {
      id: 'choice-4c-optimal',
      text: '"Yeah, I like being around you. You\'re easy to talk to. But I should probably head back and finish some work. Want to grab coffee again next week?"',
      nextSceneId: 'scene-4c-optimal-result',
      isOptimal: true,
      xpBonus: 15,
      feedback: 'OPTIMAL: You didn\'t overstay your welcome. Your willingness to leave made you more valuable. They\'re now curious about you.',
    },
    {
      id: 'choice-4c-close',
      text: '"I feel the same way. There\'s something real about this. I\'d like to keep getting to know you."',
      nextSceneId: 'scene-4c-close-result',
      xpBonus: 10,
      feedback: 'CLOSE: You expressed genuine interest without being overwhelming. They\'re now invested in you.',
    },
    {
      id: 'choice-4c-subtle',
      text: '"Yeah, me too. You\'re a great friend. I\'m glad we met."',
      nextSceneId: 'scene-4c-subtle-result',
      xpBonus: 5,
      feedback: 'You established friendship but nothing more. They see you as a friend, not a romantic interest.',
    },
    {
      id: 'choice-4c-trap',
      text: '"Me too. I feel like we have a real connection. I think I might be developing feelings for you."',
      nextSceneId: 'scene-4c-trap-result',
      xpBonus: 0,
      feedback: 'TRAP: You moved too fast emotionally. They\'re now uncomfortable and pulling away.',
    },
  ],
};

// Scene 4C Results - Endings
const scene4cOptimalResult: Scene = {
  id: 'scene-4c-optimal-result',
  backgroundId: 'coffee-shop',
  dialog: [
    {
      text: 'Morgan looks slightly intrigued by your willingness to leave.',
    },
    {
      text: '"Yeah, definitely. I\'m actually really looking forward to it."',
      speakerId: 'morgan',
      emotion: 'happy',
    },
    {
      text: 'You didn\'t overstay. Your willingness to leave made you more valuable. They\'re now curious about you.',
    },
  ],
  isEnding: true,
  outcomeType: 'good',
  endingTitle: 'Leave Them Wanting More',
  endingSummary: 'You didn\'t cling. You didn\'t overshare. You left at the peak of interest. They\'ll be thinking about you all week. Connection deepened, mystery maintained. Mission complete.',
};

const scene4cCloseResult: Scene = {
  id: 'scene-4c-close-result',
  backgroundId: 'coffee-shop',
  dialog: [
    {
      text: 'Morgan smiles, genuinely warm.',
    },
    {
      text: '"I\'d like that too. This is nice. Want to do something fun this weekend?"',
      speakerId: 'morgan',
      emotion: 'happy',
    },
    {
      text: 'You expressed genuine interest. They\'re now invested in you.',
    },
  ],
  isEnding: true,
  outcomeType: 'good',
  endingTitle: 'The Real Connection',
  endingSummary: 'You showed authentic interest without being needy. They reciprocated. A solid foundation built on genuine connection. Mission complete.',
};

const scene4cSubtleResult: Scene = {
  id: 'scene-4c-subtle-result',
  backgroundId: 'coffee-shop',
  dialog: [
    {
      text: 'Morgan nods, smile slightly dimming.',
    },
    {
      text: '"Yeah, me too. Friends for sure."',
      speakerId: 'morgan',
      emotion: 'neutral',
    },
    {
      text: 'You established friendship. That might be all it ever becomes.',
    },
  ],
  isEnding: true,
  outcomeType: 'neutral',
  endingTitle: 'The Friend Zone',
  endingSummary: 'You played it safe and got filed as a friend. Nothing wrong with that—unless you wanted more. You\'ll need to shift the dynamic if you want to change this. Mission complete.',
};

const scene4cTrapResult: Scene = {
  id: 'scene-4c-trap-result',
  backgroundId: 'coffee-shop',
  dialog: [
    {
      text: 'Morgan\'s face shifts. Panic in their eyes.',
    },
    {
      text: '"Oh... um... that\'s... I need to think about this. I should probably go."',
      speakerId: 'morgan',
      emotion: 'neutral',
    },
    {
      text: 'You moved too fast. They\'re uncomfortable. They\'re pulling away.',
    },
  ],
  isEnding: true,
  outcomeType: 'bad',
  endingTitle: 'Too Much Too Soon',
  endingSummary: 'You dropped the L-bomb before they were ready. They\'re now questioning whether to keep seeing you. Major damage to undo. Mission complete.',
};

export const mission4Scenes: Scene[] = [
  scene4a,
  scene4aOptimalResult,
  scene4aCloseResult,
  scene4aSubtleResult,
  scene4aTrapResult,
  scene4b,
  scene4bOptimalResult,
  scene4bCloseResult,
  scene4bSubtleResult,
  scene4bTrapResult,
  scene4c,
  scene4cOptimalResult,
  scene4cCloseResult,
  scene4cSubtleResult,
  scene4cTrapResult,
];

export const mission4Scenario: DatingScenario = {
  id: MISSION_ID,
  levelId: 'university',
  missionNumber: 4,
  title: missionMetadata.title,
  tagline: 'From acquaintance to interest.',
  description: missionMetadata.objective,
  objective: missionMetadata.objective,
  tier: missionMetadata.tier,
  estimatedMinutes: missionMetadata.estimatedMinutes,
  difficulty: missionMetadata.difficulty,
  characters,
  scenes: mission4Scenes,
  rewards,
  startSceneId: 'scene-4a-coincidental-meeting',
};

export default mission4Scenario;
