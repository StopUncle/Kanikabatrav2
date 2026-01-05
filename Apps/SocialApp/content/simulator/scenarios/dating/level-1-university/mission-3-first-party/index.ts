// Mission 3: The First Party
// Objective: Navigate a high-stakes social environment and identify your first major target.
import type { Scene } from '../../../../types';
import type { DatingScenario, MissionRewards } from '../../types';
import { characters } from '../metadata';

export const MISSION_ID = 'mission-3-first-party';

export const missionMetadata = {
  id: MISSION_ID,
  number: 3,
  title: 'The First Party',
  objective: 'Navigate a high-stakes social environment and identify your first major target.',
  tier: 'free' as const,
  estimatedMinutes: 12,
  difficulty: 'beginner' as const,
};

export const rewards: MissionRewards = {
  power: 15,
  mask: 20,
  vision: 15,
  unlocks: 'mission-4-study-group',
};

// Scene 3A: The Party Entrance
const scene3a: Scene = {
  id: 'scene-3a-party-entrance',
  backgroundId: 'bar',
  dialog: [
    {
      text: 'Saturday night. An off-campus party at a house. About 50 people, music, drinks, chaotic energy.',
    },
    {
      text: 'You arrive at the party. Sam is at the center, surrounded by people. Casey is moving around the room, connecting people. Jordan is in a corner, talking to a few people. Alex is with a group of friends from the dorm.',
    },
    {
      speakerId: 'inner-voice',
      text: 'Big environment. Lots of targets. Who has real power here?',
      emotion: 'neutral',
    },
  ],
  choices: [
    {
      id: 'choice-3a-optimal',
      text: 'Arrive, grab a drink, and observe the room for a few minutes. Make brief eye contact with Sam. Then move to talk with Casey.',
      nextSceneId: 'scene-3a-optimal-result',
      isOptimal: true,
      xpBonus: 15,
      feedback: 'OPTIMAL: You didn\'t rush to attach yourself to anyone. Your confidence made you interesting. Casey is now actively pulling you into their circle.',
    },
    {
      id: 'choice-3a-close',
      text: 'Approach Jordan (who seems less intimidating) and have a genuine conversation.',
      nextSceneId: 'scene-3a-close-result',
      xpBonus: 10,
      feedback: 'CLOSE: You identified the person who needed connection and engaged authentically. Jordan is now grateful and will become an ally.',
    },
    {
      id: 'choice-3a-subtle',
      text: 'Grab a drink and stand near the wall, observing. Talk to people if they approach you.',
      nextSceneId: 'scene-3a-subtle-result',
      xpBonus: 5,
      feedback: 'You were safe but invisible. Casey had to pull you in.',
    },
    {
      id: 'choice-3a-trap',
      text: 'Immediately find Alex and stick with them the entire night.',
      nextSceneId: 'scene-3a-trap-result',
      xpBonus: 0,
      feedback: 'TRAP: You were dependent on your roommate. People see you as lacking confidence.',
    },
  ],
};

// Scene 3A Results
const scene3aOptimalResult: Scene = {
  id: 'scene-3a-optimal-result',
  backgroundId: 'bar',
  dialog: [
    {
      text: 'You arrive, grab a drink, and take in the room. You\'re relaxed. Observant. You make brief eye contact with Sam, then drift over to Casey.',
    },
    {
      text: 'Casey looks up, impressed.',
    },
    {
      text: '"I like your style. You came in cool and confident. Come meet some people I know."',
      speakerId: 'casey',
      emotion: 'happy',
    },
    {
      text: 'You didn\'t rush. Your confidence made you interesting. Casey is now actively pulling you into their circle.',
    },
  ],
  nextSceneId: 'scene-3b-target-selection',
};

const scene3aCloseResult: Scene = {
  id: 'scene-3a-close-result',
  backgroundId: 'bar',
  dialog: [
    {
      text: 'You spot Jordan looking a bit out of place and approach them.',
    },
    {
      text: 'Jordan\'s face lights up with relief.',
    },
    {
      text: '"Thanks for coming over. I was feeling a bit out of place. You\'re cool."',
      speakerId: 'jordan',
      emotion: 'happy',
    },
    {
      text: 'You identified the person who needed connection and engaged authentically. Jordan will become an ally.',
    },
  ],
  nextSceneId: 'scene-3b-target-selection',
};

const scene3aSubtleResult: Scene = {
  id: 'scene-3a-subtle-result',
  backgroundId: 'bar',
  dialog: [
    {
      text: 'You grab a drink and find a spot near the wall. Watching. Waiting.',
    },
    {
      text: 'After a while, Casey notices you and approaches.',
    },
    {
      text: '"Hey, you came! You should come meet some people."',
      speakerId: 'casey',
      emotion: 'neutral',
    },
    {
      text: 'You were safe but invisible. Casey had to pull you in. You\'re following, not leading.',
    },
  ],
  nextSceneId: 'scene-3b-target-selection',
};

const scene3aTrapResult: Scene = {
  id: 'scene-3a-trap-result',
  backgroundId: 'bar',
  dialog: [
    {
      text: 'You immediately find Alex and attach yourself to them for the night.',
    },
    {
      text: 'Alex glances at you after a while.',
    },
    {
      text: '"You\'re cool, but you should meet other people too."',
      speakerId: 'alex',
      emotion: 'neutral',
    },
    {
      text: 'You were dependent on your roommate. People noticed. You\'ve been mentally filed as someone who lacks confidence.',
    },
  ],
  nextSceneId: 'scene-3b-target-selection',
};

// Scene 3B: The Target Selection
const scene3b: Scene = {
  id: 'scene-3b-target-selection',
  backgroundId: 'bar',
  dialog: [
    {
      text: 'You\'re now at the party for a while. You\'ve observed the dynamics. Casey introduces you to three people who are potential long-term targets.',
    },
    {
      text: 'Morgan—ambitious, driven, studying business (high-value target). Taylor—insecure, seeking validation, studying psychology (vulnerable target). Riley—powerful, guarded, studying law (difficult target).',
    },
    {
      speakerId: 'inner-voice',
      text: 'Three targets. One is ambitious and driven. One is insecure and seeking validation. One is powerful but guarded. Who do you pursue?',
      emotion: 'neutral',
    },
  ],
  choices: [
    {
      id: 'choice-3b-optimal',
      text: 'Engage with all three equally, but be slightly more distant with Riley. Be warm with Morgan and Taylor, but don\'t chase anyone.',
      nextSceneId: 'scene-3b-optimal-result',
      isOptimal: true,
      xpBonus: 15,
      feedback: 'OPTIMAL: Your indifference to Riley made you interesting. Riley approached you—high value established.',
    },
    {
      id: 'choice-3b-close',
      text: 'Focus on Morgan (ambitious and driven) and have a genuine conversation about their goals and ambitions.',
      nextSceneId: 'scene-3b-close-result',
      xpBonus: 10,
      feedback: 'CLOSE: You identified the ambitious person and engaged authentically. Morgan is now interested in you.',
    },
    {
      id: 'choice-3b-subtle',
      text: 'Engage equally with all three, being friendly and asking questions.',
      nextSceneId: 'scene-3b-subtle-result',
      xpBonus: 5,
      feedback: 'You were safe but didn\'t stand out. Morgan sees you as a potential friend but not a priority.',
    },
    {
      id: 'choice-3b-trap',
      text: 'Immediately focus on Riley (the most powerful) and try to impress them with stories about yourself.',
      nextSceneId: 'scene-3b-trap-result',
      xpBonus: 0,
      feedback: 'TRAP: You chased the most powerful person and it was obvious. Riley saw through you.',
    },
  ],
};

// Scene 3B Results
const scene3bOptimalResult: Scene = {
  id: 'scene-3b-optimal-result',
  backgroundId: 'bar',
  dialog: [
    {
      text: 'You engage with all three—warm with Morgan and Taylor, slightly more reserved with Riley. You don\'t chase anyone.',
    },
    {
      text: 'Later in the night, Riley drifts over to you.',
    },
    {
      text: '"Hey, I noticed you earlier. You seem different from most people. Want to grab food sometime?"',
      speakerId: 'riley',
      emotion: 'neutral',
    },
    {
      text: 'Your indifference to Riley made you interesting. They approached you, which means you\'ve already established high value.',
    },
  ],
  nextSceneId: 'scene-3c-first-approach',
};

const scene3bCloseResult: Scene = {
  id: 'scene-3b-close-result',
  backgroundId: 'bar',
  dialog: [
    {
      text: 'You focus on Morgan, asking about their ambitions and actually listening.',
    },
    {
      text: 'Morgan leans in, engaged.',
    },
    {
      text: '"I like talking to you. You actually listen. Want to grab coffee this week?"',
      speakerId: 'morgan',
      emotion: 'happy',
    },
    {
      text: 'You identified the ambitious person and engaged authentically. Morgan is now interested in you.',
    },
  ],
  nextSceneId: 'scene-3c-first-approach',
};

const scene3bSubtleResult: Scene = {
  id: 'scene-3b-subtle-result',
  backgroundId: 'bar',
  dialog: [
    {
      text: 'You spread your attention evenly, being friendly with everyone.',
    },
    {
      text: 'Morgan shrugs.',
    },
    {
      text: '"You seem nice. We should study together sometime."',
      speakerId: 'morgan',
      emotion: 'neutral',
    },
    {
      text: 'You were safe but didn\'t stand out. Morgan sees you as a potential friend but not a priority.',
    },
  ],
  nextSceneId: 'scene-3c-first-approach',
};

const scene3bTrapResult: Scene = {
  id: 'scene-3b-trap-result',
  backgroundId: 'bar',
  dialog: [
    {
      text: 'You focus entirely on Riley, trying to impress them with stories about yourself.',
    },
    {
      text: 'Riley\'s expression becomes politely distant.',
    },
    {
      text: '"That\'s cool. Excuse me, I\'m going to grab another drink."',
      speakerId: 'riley',
      emotion: 'neutral',
    },
    {
      text: 'You chased the most powerful person and it was obvious. Riley saw through you and lost interest.',
    },
  ],
  nextSceneId: 'scene-3c-first-approach',
};

// Scene 3C: The First Approach
const scene3c: Scene = {
  id: 'scene-3c-first-approach',
  backgroundId: 'bar',
  dialog: [
    {
      text: 'You\'re talking with your chosen target. The conversation is flowing naturally.',
    },
    {
      text: '"I\'m really enjoying talking to you. Most people here are so surface-level. You\'re different."',
      speakerId: 'morgan',
      emotion: 'happy',
    },
    {
      speakerId: 'inner-voice',
      text: 'This is the moment. Do you charm them or do you intrigue them?',
      emotion: 'neutral',
    },
  ],
  choices: [
    {
      id: 'choice-3c-optimal',
      text: '"Yeah, I like talking to you too. But I should probably mingle a bit. Let\'s exchange numbers and catch up later."',
      nextSceneId: 'scene-3c-optimal-result',
      isOptimal: true,
      xpBonus: 15,
      feedback: 'OPTIMAL: You didn\'t cling to them. Your willingness to move on made you more valuable. They\'re now curious about you.',
    },
    {
      id: 'choice-3c-close',
      text: '"I feel the same way. There\'s something real about you. I\'d like to get to know you better."',
      nextSceneId: 'scene-3c-close-result',
      xpBonus: 10,
      feedback: 'CLOSE: You expressed genuine interest without being needy. They\'re now invested in knowing you better.',
    },
    {
      id: 'choice-3c-subtle',
      text: '"Thanks, I appreciate that. You\'re interesting too. I\'d like to stay in touch."',
      nextSceneId: 'scene-3c-subtle-result',
      xpBonus: 5,
      feedback: 'You were polite and reciprocal. They see you as a potential friend.',
    },
    {
      id: 'choice-3c-trap',
      text: '"I know, right? I feel like we really connect. I don\'t usually meet people like you. Can I get your number?"',
      nextSceneId: 'scene-3c-trap-result',
      xpBonus: 0,
      feedback: 'TRAP: You were too eager and needy. They see you as desperate.',
    },
  ],
};

// Scene 3C Results - Endings
const scene3cOptimalResult: Scene = {
  id: 'scene-3c-optimal-result',
  backgroundId: 'bar',
  dialog: [
    {
      text: 'Their eyes show a flicker of surprise—and interest.',
    },
    {
      text: '"I like that. Yeah, let\'s definitely stay in touch. I have a feeling we\'ll be friends."',
      speakerId: 'morgan',
      emotion: 'happy',
    },
    {
      text: 'You didn\'t cling. Your willingness to walk away made you more valuable. They\'re now curious about you.',
    },
  ],
  isEnding: true,
  outcomeType: 'good',
  endingTitle: 'The Art of Leaving',
  endingSummary: 'You left them wanting more. The party was a success—you\'ve established yourself as someone worth pursuing. Numbers exchanged, interest sparked, game on. Mission complete.',
};

const scene3cCloseResult: Scene = {
  id: 'scene-3c-close-result',
  backgroundId: 'bar',
  dialog: [
    {
      text: 'They smile, genuinely warm.',
    },
    {
      text: '"I\'d like that too. Let\'s definitely hang out soon."',
      speakerId: 'morgan',
      emotion: 'happy',
    },
    {
      text: 'You expressed genuine interest without being overwhelming. They\'re now invested in you.',
    },
  ],
  isEnding: true,
  outcomeType: 'good',
  endingTitle: 'Genuine Connection',
  endingSummary: 'You made a real connection. It\'s mutual interest, properly expressed. A solid foundation for whatever comes next. Mission complete.',
};

const scene3cSubtleResult: Scene = {
  id: 'scene-3c-subtle-result',
  backgroundId: 'bar',
  dialog: [
    {
      text: 'They nod.',
    },
    {
      text: '"Yeah, for sure. Let\'s exchange numbers."',
      speakerId: 'morgan',
      emotion: 'neutral',
    },
    {
      text: 'Polite and reciprocal. They see you as a potential friend—but not a priority.',
    },
  ],
  isEnding: true,
  outcomeType: 'neutral',
  endingTitle: 'The Exchange',
  endingSummary: 'Numbers exchanged, but without spark. You\'re on their radar as a potential friend. You\'ll need to create momentum from here. Mission complete.',
};

const scene3cTrapResult: Scene = {
  id: 'scene-3c-trap-result',
  backgroundId: 'bar',
  dialog: [
    {
      text: 'Their body language shifts. A small step back.',
    },
    {
      text: '"Uh, sure. But I\'m going to mingle a bit more."',
      speakerId: 'morgan',
      emotion: 'neutral',
    },
    {
      text: 'You were too eager. Too obvious. They gave you their number but they\'ve already mentally checked out.',
    },
  ],
  isEnding: true,
  outcomeType: 'bad',
  endingTitle: 'The Overstep',
  endingSummary: 'You came on too strong and they felt it. You got their number, but you\'ve already positioned yourself as the one who needs them more. Uphill climb from here. Mission complete.',
};

export const mission3Scenes: Scene[] = [
  scene3a,
  scene3aOptimalResult,
  scene3aCloseResult,
  scene3aSubtleResult,
  scene3aTrapResult,
  scene3b,
  scene3bOptimalResult,
  scene3bCloseResult,
  scene3bSubtleResult,
  scene3bTrapResult,
  scene3c,
  scene3cOptimalResult,
  scene3cCloseResult,
  scene3cSubtleResult,
  scene3cTrapResult,
];

export const mission3Scenario: DatingScenario = {
  id: MISSION_ID,
  levelId: 'university',
  missionNumber: 3,
  title: missionMetadata.title,
  tagline: 'The battlefield where reputations are made.',
  description: missionMetadata.objective,
  objective: missionMetadata.objective,
  tier: missionMetadata.tier,
  estimatedMinutes: missionMetadata.estimatedMinutes,
  difficulty: missionMetadata.difficulty,
  characters,
  scenes: mission3Scenes,
  rewards,
  startSceneId: 'scene-3a-party-entrance',
};

export default mission3Scenario;
