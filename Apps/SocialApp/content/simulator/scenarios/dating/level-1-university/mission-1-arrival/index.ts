// Mission 1: The Arrival
// Objective: Navigate your first day on campus and establish initial social positioning.
import type { Scene } from '../../../../types';
import type { DatingScenario, MissionRewards, TacticDatingScenario, AnyScene } from '../../types';
import { characters, characterProfiles } from '../metadata';
import { tacticScene1a, tacticScene1b, tacticScene1c, tacticScene1d, tacticScene1e, tacticScene1f } from './tactic-scenes';

export const MISSION_ID = 'mission-1-arrival';

export const missionMetadata = {
  id: MISSION_ID,
  number: 1,
  title: 'The Arrival',
  objective: 'Navigate your first day on campus and establish initial social positioning.',
  tier: 'free' as const,
  estimatedMinutes: 8,
  difficulty: 'beginner' as const,
};

export const rewards: MissionRewards = {
  power: 8,
  mask: 10,
  vision: 5,
  unlocks: 'mission-2-dorm',
};

// Scene 1A: The Dorm Check-In
const scene1a: Scene = {
  id: 'scene-1a-dorm-checkin',
  backgroundId: 'apartment',
  dialog: [
    {
      text: 'You\'re standing in the dorm lobby with your suitcases. The RA is checking students in at a desk—friendly but professional, mid-20s, clearly used to managing new students.',
    },
    {
      text: '"Hey, welcome! I\'m Jordan, the RA for this floor. Let me get you checked in. First time away from home?"',
      speakerId: 'jordan',
      emotion: 'happy',
    },
    {
      speakerId: 'inner-voice',
      text: 'First impression. They control the dorm. Make them like you or make them irrelevant.',
      emotion: 'neutral',
    },
  ],
  choices: [
    {
      id: 'choice-1a-optimal',
      text: '"Thanks. I\'ll read the rules and reach out if I have questions. I\'m sure I\'ll figure it out."',
      nextSceneId: 'scene-1a-optimal-result',
      isOptimal: true,
      xpBonus: 15,
      feedback: 'OPTIMAL: You demonstrated self-sufficiency and maturity. Jordan respects you. They\'ll actually help you if you ask.',
    },
    {
      id: 'choice-1a-close',
      text: '"Thanks for the welcome. I can tell you actually care about this job. That\'s rare. What\'s the vibe on this floor?"',
      nextSceneId: 'scene-1a-close-result',
      xpBonus: 10,
      feedback: 'CLOSE: You complimented them genuinely. Jordan now sees you as someone who pays attention. They\'ll remember you.',
    },
    {
      id: 'choice-1a-subtle',
      text: '"Thanks for the welcome. I\'m looking forward to meeting everyone. What should I know about the floor?"',
      nextSceneId: 'scene-1a-subtle-result',
      xpBonus: 5,
      feedback: 'You were polite and asked the right questions. Jordan sees you as responsible—not memorable, but not problematic.',
    },
    {
      id: 'choice-1a-trap',
      text: '"Yeah, I\'m so excited! This is going to be amazing. I\'m really nervous though. Do you think I\'ll fit in?"',
      nextSceneId: 'scene-1a-trap-result',
      xpBonus: 0,
      feedback: 'TRAP: You came across as needy and uncertain. Jordan will be friendly but won\'t go out of their way for you.',
    },
  ],
};

// Scene 1A Results
const scene1aOptimalResult: Scene = {
  id: 'scene-1a-optimal-result',
  backgroundId: 'apartment',
  dialog: [
    {
      text: 'Jordan pauses, slightly impressed.',
    },
    {
      text: '"I like that. Most people either panic or pretend they know everything. You seem grounded. If you need anything, I\'m in room 101."',
      speakerId: 'jordan',
      emotion: 'happy',
    },
    {
      text: 'You\'ve established yourself as mature and self-sufficient. Jordan respects you—they\'ll actually help if you ask, and they\'ll speak positively about you to others.',
    },
  ],
  nextSceneId: 'tactic-scene-1b-roommate',
};

const scene1aCloseResult: Scene = {
  id: 'scene-1a-close-result',
  backgroundId: 'apartment',
  dialog: [
    {
      text: 'Jordan\'s expression warms.',
    },
    {
      text: '"Ha, I appreciate that. Yeah, it\'s a pretty cool group. Lots of different people, but everyone\'s respectful. You\'ll like it here."',
      speakerId: 'jordan',
      emotion: 'happy',
    },
    {
      text: 'You made a genuine impression. Jordan sees you as someone who pays attention. They\'ll be slightly more helpful going forward.',
    },
  ],
  nextSceneId: 'tactic-scene-1b-roommate',
};

const scene1aSubtleResult: Scene = {
  id: 'scene-1a-subtle-result',
  backgroundId: 'apartment',
  dialog: [
    {
      text: 'Jordan nods, professional.',
    },
    {
      text: '"Good question. We have floor events on Thursdays, quiet hours after 10pm, and we all respect each other\'s space. You\'ll fit right in."',
      speakerId: 'jordan',
      emotion: 'neutral',
    },
    {
      text: 'You were polite and asked the right questions. You\'re neutral in their mind—not memorable, but not problematic.',
    },
  ],
  nextSceneId: 'tactic-scene-1b-roommate',
};

const scene1aTrapResult: Scene = {
  id: 'scene-1a-trap-result',
  backgroundId: 'apartment',
  dialog: [
    {
      text: 'Jordan\'s smile becomes slightly fixed.',
    },
    {
      text: '"That\'s great energy. Most people settle in pretty quick. Here\'s your key and the floor rules. If you need anything, my door is always open."',
      speakerId: 'jordan',
      emotion: 'neutral',
    },
    {
      text: 'You came across as needy and uncertain. Jordan filed you as "just another freshman." They\'ll be friendly but won\'t invest in you.',
    },
  ],
  nextSceneId: 'tactic-scene-1b-roommate',
};

// Scene 1B: The Roommate
const scene1b: Scene = {
  id: 'scene-1b-roommate',
  backgroundId: 'apartment',
  dialog: [
    {
      text: 'You enter your dorm room. Your roommate is already there, unpacking. Friendly-looking, athletic build, seems confident.',
    },
    {
      text: '"Hey! You must be my roommate. I\'m Alex. I got here early to grab the better desk. Hope you don\'t mind."',
      speakerId: 'alex',
      emotion: 'happy',
    },
    {
      speakerId: 'inner-voice',
      text: 'This person will be in your space every day. Establish the dynamic now.',
      emotion: 'neutral',
    },
  ],
  choices: [
    {
      id: 'choice-1b-optimal',
      text: '"Looks good. I\'m not picky about desks. Where should I put my stuff?"',
      nextSceneId: 'scene-1b-optimal-result',
      isOptimal: true,
      xpBonus: 15,
      feedback: 'OPTIMAL: You demonstrated you\'re not petty or territorial. Alex sees you as mature and easy to live with. They\'ll like and respect you.',
    },
    {
      id: 'choice-1b-close',
      text: '"Ha, nice try. But I like your confidence. Tell you what—we can rotate who gets the better desk each semester. Fair?"',
      nextSceneId: 'scene-1b-close-result',
      xpBonus: 10,
      feedback: 'CLOSE: You acknowledged their move, showed you weren\'t intimidated, and proposed a fair solution. Alex respects you.',
    },
    {
      id: 'choice-1b-subtle',
      text: '"No problem at all. Thanks for unpacking. Which side do you prefer for the room setup?"',
      nextSceneId: 'scene-1b-subtle-result',
      xpBonus: 5,
      feedback: 'You were accommodating, but you didn\'t establish any real dynamic. Alex will see you as easy to push around.',
    },
    {
      id: 'choice-1b-trap',
      text: '"Actually, I do mind. I got here first in terms of the room assignment. That\'s my desk."',
      nextSceneId: 'scene-1b-trap-result',
      xpBonus: 0,
      feedback: 'TRAP: You won the battle but lost the war. Alex will be distant and awkward. Living with them will be uncomfortable.',
    },
  ],
};

// Scene 1B Results
const scene1bOptimalResult: Scene = {
  id: 'scene-1b-optimal-result',
  backgroundId: 'apartment',
  dialog: [
    {
      text: 'Alex looks slightly surprised.',
    },
    {
      text: '"Really? Most people would fight me on that. Cool. You can have the other desk, and we can figure out the rest as we go."',
      speakerId: 'alex',
      emotion: 'happy',
    },
    {
      text: 'You demonstrated maturity. Alex sees you as easy to live with. They\'ll like you and respect you—and feel slightly in your debt for not making it a thing.',
    },
  ],
  nextSceneId: 'tactic-scene-1c-hallway',
};

const scene1bCloseResult: Scene = {
  id: 'scene-1b-close-result',
  backgroundId: 'apartment',
  dialog: [
    {
      text: 'Alex grins.',
    },
    {
      text: '"I like that. You seem cool. Yeah, let\'s do that."',
      speakerId: 'alex',
      emotion: 'happy',
    },
    {
      text: 'You showed you\'re not a pushover while keeping it friendly. Alex respects you as an equal.',
    },
  ],
  nextSceneId: 'tactic-scene-1c-hallway',
};

const scene1bSubtleResult: Scene = {
  id: 'scene-1b-subtle-result',
  backgroundId: 'apartment',
  dialog: [
    {
      text: 'Alex shrugs.',
    },
    {
      text: '"Cool, cool. I\'m pretty easy-going. Let\'s just make it work as we go."',
      speakerId: 'alex',
      emotion: 'neutral',
    },
    {
      text: 'You were accommodating, but you let them set the terms. The power dynamic is slightly tilted in their favor.',
    },
  ],
  nextSceneId: 'tactic-scene-1c-hallway',
};

const scene1bTrapResult: Scene = {
  id: 'scene-1b-trap-result',
  backgroundId: 'apartment',
  dialog: [
    {
      text: 'Alex\'s face falls.',
    },
    {
      text: '"Oh, come on. I was just joking. But... okay, I\'ll move."',
      speakerId: 'alex',
      emotion: 'sad',
    },
    {
      text: 'They move the desk, but the warmth is gone. You won the desk. You lost a potential ally. Living together is going to be awkward.',
    },
  ],
  nextSceneId: 'tactic-scene-1c-hallway',
};

// Scene 1C: The Hallway
const scene1c: Scene = {
  id: 'scene-1c-hallway',
  backgroundId: 'apartment',
  dialog: [
    {
      text: 'You step into the hallway to explore. Three people are hanging out near the common area.',
    },
    {
      text: 'Riley—attractive, confident, clearly popular (high-status). Casey—quiet, sitting alone, seems shy (underestimated). Sam—friendly, neutral energy, talking to both.',
    },
    {
      speakerId: 'inner-voice',
      text: 'Three targets. One is high-status, one is lonely, one is neutral. Who do you engage?',
      emotion: 'neutral',
    },
  ],
  choices: [
    {
      id: 'choice-1c-optimal',
      text: 'Walk past. Make brief eye contact with all three. Stop to look at a bulletin board nearby.',
      nextSceneId: 'scene-1c-optimal-result',
      isOptimal: true,
      xpBonus: 15,
      feedback: 'OPTIMAL: You didn\'t chase them. Your indifference made you interesting. The high-status one approached you.',
    },
    {
      id: 'choice-1c-close',
      text: 'Approach Casey (who\'s sitting alone). "Hey, I\'m new here. Mind if I sit for a second?"',
      nextSceneId: 'scene-1c-close-result',
      xpBonus: 10,
      feedback: 'CLOSE: You identified the lonely person and engaged with them. Casey is grateful and will likely become an ally. Others notice you\'re friendly but not desperate.',
    },
    {
      id: 'choice-1c-subtle',
      text: '"Hi, I\'m moving in down the hall. Nice to meet you all."',
      nextSceneId: 'scene-1c-subtle-result',
      xpBonus: 5,
      feedback: 'You introduced yourself politely. They acknowledge you but don\'t invite you to join. You\'re on their radar but not in their circle.',
    },
    {
      id: 'choice-1c-trap',
      text: '"Hey everyone! I\'m new here. Can I hang out with you guys?"',
      nextSceneId: 'scene-1c-trap-result',
      xpBonus: 0,
      feedback: 'TRAP: You came across as desperate and needy. They\'ll be polite but won\'t remember you.',
    },
  ],
};

// Scene 1C Results
const scene1cOptimalResult: Scene = {
  id: 'scene-1c-optimal-result',
  backgroundId: 'apartment',
  dialog: [
    {
      text: 'You walk past, relaxed. After a moment, Riley looks over.',
    },
    {
      text: '"Hey, you new here?"',
      speakerId: 'riley',
      emotion: 'neutral',
    },
    {
      text: '"Yeah, just moved in."',
    },
    {
      text: '"Cool. I\'m Riley. Come hang if you want."',
      speakerId: 'riley',
      emotion: 'happy',
    },
    {
      text: 'You didn\'t chase. They approached you. You\'re already establishing high value.',
    },
  ],
  isEnding: true,
  outcomeType: 'good',
  endingTitle: 'The Natural',
  endingSummary: 'You let them come to you. Day one, and the high-status player is already initiating. You\'ve established yourself as someone worth pursuing, not someone who pursues. Mission complete.',
};

const scene1cCloseResult: Scene = {
  id: 'scene-1c-close-result',
  backgroundId: 'apartment',
  dialog: [
    {
      text: 'Casey looks up, surprised. Then their face lights up.',
    },
    {
      text: '"Oh! Yeah, sure. I\'m Casey. Welcome to the floor."',
      speakerId: 'casey',
      emotion: 'happy',
    },
    {
      text: 'You identified the one who needed connection. Casey is grateful. Riley and Sam notice you\'re friendly but not desperate.',
    },
  ],
  isEnding: true,
  outcomeType: 'good',
  endingTitle: 'The Ally Maker',
  endingSummary: 'You invested in someone undervalued. Casey will remember this. People who feel seen become loyal. You\'re building a foundation, not chasing status. Mission complete.',
};

const scene1cSubtleResult: Scene = {
  id: 'scene-1c-subtle-result',
  backgroundId: 'apartment',
  dialog: [
    {
      text: 'Sam nods.',
    },
    {
      text: '"Hey, welcome! I\'m Sam. This is Riley and Casey. We were just hanging out."',
      speakerId: 'sam',
      emotion: 'happy',
    },
    {
      text: 'Polite acknowledgment. You\'re on the map, but you didn\'t make an impression.',
    },
  ],
  isEnding: true,
  outcomeType: 'neutral',
  endingTitle: 'The Introduction',
  endingSummary: 'You introduced yourself like everyone else. Nothing gained, nothing lost. You\'ll need to create opportunities from here. Mission complete.',
};

const scene1cTrapResult: Scene = {
  id: 'scene-1c-trap-result',
  backgroundId: 'apartment',
  dialog: [
    {
      text: 'They exchange a look.',
    },
    {
      text: '"Sure, pull up a chair."',
      speakerId: 'riley',
      emotion: 'neutral',
    },
    {
      text: 'They\'re polite but not engaged. You can feel them mentally filing you as "tries too hard." The conversation stays surface-level.',
    },
  ],
  isEnding: true,
  outcomeType: 'bad',
  endingTitle: 'The Eager Freshman',
  endingSummary: 'You came on too strong. They\'ll be friendly but you\'re already categorized as someone who needs them more than they need you. Uphill climb from here. Mission complete.',
};

// Export all scenes
export const mission1Scenes: Scene[] = [
  scene1a,
  scene1aOptimalResult,
  scene1aCloseResult,
  scene1aSubtleResult,
  scene1aTrapResult,
  scene1b,
  scene1bOptimalResult,
  scene1bCloseResult,
  scene1bSubtleResult,
  scene1bTrapResult,
  scene1c,
  scene1cOptimalResult,
  scene1cCloseResult,
  scene1cSubtleResult,
  scene1cTrapResult,
];

// Export scenario
export const mission1Scenario: DatingScenario = {
  id: MISSION_ID,
  levelId: 'university',
  missionNumber: 1,
  title: missionMetadata.title,
  tagline: 'First impressions are everything.',
  description: missionMetadata.objective,
  objective: missionMetadata.objective,
  tier: missionMetadata.tier,
  estimatedMinutes: missionMetadata.estimatedMinutes,
  difficulty: missionMetadata.difficulty,
  characters,
  scenes: mission1Scenes,
  rewards,
  startSceneId: 'scene-1a-dorm-checkin',
};

// ============================================
// TACTIC VERSION - Uses new 2x2 grid UI
// ============================================

// Mission 1 Complete ending scene (for new extended flow)
const sceneMission1Complete: Scene = {
  id: 'scene-mission-1-complete',
  backgroundId: 'apartment',
  dialog: [
    {
      text: 'Your first day is over. You return to your room, processing everything.',
    },
    {
      text: 'You met the RA, your roommate, the popular crowd, the connected one, the quiet one, and the attractive one. Each interaction shaped how they see you.',
    },
    {
      text: 'Tomorrow, the game continues. But today, you laid the groundwork.',
    },
  ],
  isEnding: true,
  outcomeType: 'good',
  endingTitle: 'Day One Complete',
  endingSummary: 'You navigated your first day on campus. You met key players, established yourself without chasing, and planted seeds for future alliances. The real game starts now.',
};

// Combine tactic scenes with result scenes (results still use old format)
const tacticMission1AllScenes: AnyScene[] = [
  // Scene 1A: Dorm Check-In
  tacticScene1a,
  scene1aOptimalResult,
  scene1aCloseResult,
  scene1aSubtleResult,
  scene1aTrapResult,
  // Scene 1B: The Roommate
  tacticScene1b,
  scene1bOptimalResult,
  scene1bCloseResult,
  scene1bSubtleResult,
  scene1bTrapResult,
  // Scene 1C: The Hallway
  tacticScene1c,
  // Scene 1D: The Common Room (Morgan)
  tacticScene1d,
  // Scene 1E: The Study Lounge (Casey)
  tacticScene1e,
  // Scene 1F: The Night Walk (Taylor)
  tacticScene1f,
  // Mission Complete
  sceneMission1Complete,
];

export const tacticMission1Scenario: TacticDatingScenario = {
  id: 'tactic-mission-1-arrival',
  levelId: 'university',
  missionNumber: 1,
  title: 'The Arrival (Tactic Mode)',
  tagline: 'First impressions are everything.',
  description: missionMetadata.objective,
  objective: missionMetadata.objective,
  tier: missionMetadata.tier,
  estimatedMinutes: missionMetadata.estimatedMinutes,
  difficulty: missionMetadata.difficulty,
  characters,
  scenes: tacticMission1AllScenes,
  rewards,
  startSceneId: 'tactic-scene-1a-dorm-checkin',
  characterProfiles,
  initialControlScore: 0,
};

export default mission1Scenario;
