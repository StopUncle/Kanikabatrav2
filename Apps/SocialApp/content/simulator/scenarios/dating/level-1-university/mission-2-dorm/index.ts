// Mission 2: The Dorm
// Objective: Establish dominance in your immediate social circle and identify high-value targets.
import type { Scene } from '../../../../types';
import type { DatingScenario, MissionRewards } from '../../types';
import { characters } from '../metadata';

export const MISSION_ID = 'mission-2-dorm';

export const missionMetadata = {
  id: MISSION_ID,
  number: 2,
  title: 'The Dorm',
  objective: 'Establish dominance in your immediate social circle and identify high-value targets.',
  tier: 'free' as const,
  estimatedMinutes: 10,
  difficulty: 'beginner' as const,
};

export const rewards: MissionRewards = {
  power: 12,
  mask: 15,
  vision: 10,
  unlocks: 'mission-3-first-party',
};

// Scene 2A: The Floor Party
const scene2a: Scene = {
  id: 'scene-2a-floor-party',
  backgroundId: 'bar',
  dialog: [
    {
      text: 'Thursday night. An informal gathering on your floor in the common area. About 15 people, music, snacks, casual vibe.',
    },
    {
      text: 'You observe the room. Sam is the center of attention (high-status). Casey is making people laugh (social connector). Jordan is on the periphery. Alex is being friendly but not leading.',
    },
    {
      speakerId: 'inner-voice',
      text: 'This is where reputations are made. Watch who has power. Watch who follows.',
      emotion: 'neutral',
    },
  ],
  choices: [
    {
      id: 'choice-2a-optimal',
      text: 'Grab food, talk briefly with Alex and Jordan, then move to observe the room. Relaxed and present, not seeking attention.',
      nextSceneId: 'scene-2a-optimal-result',
      isOptimal: true,
      xpBonus: 15,
      feedback: 'OPTIMAL: You established yourself as comfortable and grounded. Sam approached you—high value established.',
    },
    {
      id: 'choice-2a-close',
      text: 'Approach Casey (the social connector) and engage in genuine conversation. Ask questions and listen.',
      nextSceneId: 'scene-2a-close-result',
      xpBonus: 10,
      feedback: 'CLOSE: You identified the connector and engaged authentically. Casey now sees you as someone worth knowing. You\'re invited to the next level.',
    },
    {
      id: 'choice-2a-subtle',
      text: 'Grab some snacks and stand on the side, observing. Be friendly if someone talks to you, but don\'t initiate.',
      nextSceneId: 'scene-2a-subtle-result',
      xpBonus: 5,
      feedback: 'You were safe but passive. Casey noticed you because you were quiet. You\'re on their radar but didn\'t establish real presence.',
    },
    {
      id: 'choice-2a-trap',
      text: 'Approach Sam and try to join their conversation. Laugh at their jokes and agree with everything they say.',
      nextSceneId: 'scene-2a-trap-result',
      xpBonus: 0,
      feedback: 'TRAP: You were trying to impress Sam and it was obvious. They lost interest. You\'re now seen as a try-hard.',
    },
  ],
};

// Scene 2A Results
const scene2aOptimalResult: Scene = {
  id: 'scene-2a-optimal-result',
  backgroundId: 'bar',
  dialog: [
    {
      text: 'You grab food, exchange a few words with Alex and Jordan, then settle into an easy observation position. Relaxed. Present. Not trying.',
    },
    {
      text: 'Later in the evening, Sam drifts over.',
    },
    {
      text: '"Hey, you\'re Alex\'s roommate, right? You seem cool. Want to grab food with us tomorrow?"',
      speakerId: 'sam',
      emotion: 'happy',
    },
    {
      text: 'You didn\'t chase. They came to you. High value established.',
    },
  ],
  nextSceneId: 'scene-2b-roommate-conflict',
};

const scene2aCloseResult: Scene = {
  id: 'scene-2a-close-result',
  backgroundId: 'bar',
  dialog: [
    {
      text: 'You approach Casey and have a genuine conversation. You ask questions. You listen.',
    },
    {
      text: 'After talking for a while, Casey leans in.',
    },
    {
      text: '"You know what? You\'re cool. Come to the party at Sam\'s place this weekend. I\'ll text you the details."',
      speakerId: 'casey',
      emotion: 'happy',
    },
    {
      text: 'You identified the social connector. Casey is now investing in you.',
    },
  ],
  nextSceneId: 'scene-2b-roommate-conflict',
};

const scene2aSubtleResult: Scene = {
  id: 'scene-2a-subtle-result',
  backgroundId: 'bar',
  dialog: [
    {
      text: 'You grab some snacks and find a spot on the periphery. Watching. Waiting.',
    },
    {
      text: 'Casey notices you after a while and approaches.',
    },
    {
      text: '"Hey, you\'re new, right? I\'m Casey. What\'s your name?"',
      speakerId: 'casey',
      emotion: 'neutral',
    },
    {
      text: 'You were safe but passive. You\'re on the radar, but you didn\'t establish any real presence.',
    },
  ],
  nextSceneId: 'scene-2b-roommate-conflict',
};

const scene2aTrapResult: Scene = {
  id: 'scene-2a-trap-result',
  backgroundId: 'bar',
  dialog: [
    {
      text: 'You approach Sam and try to join their conversation. You laugh a little too loudly at their jokes. You agree with everything.',
    },
    {
      text: 'After a few minutes, Sam looks away.',
    },
    {
      text: '"Cool, well, I\'m gonna grab some food. See you around."',
      speakerId: 'sam',
      emotion: 'neutral',
    },
    {
      text: 'You were trying to impress them and it was obvious. They lost interest. You\'ve been mentally filed as a try-hard.',
    },
  ],
  nextSceneId: 'scene-2b-roommate-conflict',
};

// Scene 2B: The Roommate Conflict
const scene2b: Scene = {
  id: 'scene-2b-roommate-conflict',
  backgroundId: 'apartment',
  dialog: [
    {
      text: 'Late at night. You and Alex are in your room. Alex looks up from their phone, nervous.',
    },
    {
      text: '"Hey, I have this huge project due tomorrow and my laptop is acting up. Can I borrow yours for a few hours? I promise I\'ll take good care of it."',
      speakerId: 'alex',
      emotion: 'neutral',
    },
    {
      speakerId: 'inner-voice',
      text: 'This is a power test. How you handle this sets the tone for the entire year.',
      emotion: 'neutral',
    },
  ],
  choices: [
    {
      id: 'choice-2b-optimal',
      text: '"Yeah, no problem. Just bring it back whenever. I\'m going to bed anyway."',
      nextSceneId: 'scene-2b-optimal-result',
      isOptimal: true,
      xpBonus: 15,
      feedback: 'OPTIMAL: You helped without making a big deal about it. Alex now sees you as generous and secure. They\'re in your debt.',
    },
    {
      id: 'choice-2b-close',
      text: '"Sure, but let\'s set a time limit. You can use it until 11pm, and I need it back by then. Deal?"',
      nextSceneId: 'scene-2b-close-result',
      xpBonus: 10,
      feedback: 'CLOSE: You helped but set clear boundaries. Alex is grateful and respects your limits.',
    },
    {
      id: 'choice-2b-subtle',
      text: '"I guess so, but I need it back by morning. And be really careful with it."',
      nextSceneId: 'scene-2b-subtle-result',
      xpBonus: 5,
      feedback: 'You helped but without grace. Alex is grateful but sensed your reluctance. Neutral dynamic.',
    },
    {
      id: 'choice-2b-trap',
      text: '"No. That\'s my laptop. Get yours fixed or use the library computers."',
      nextSceneId: 'scene-2b-trap-result',
      xpBonus: 0,
      feedback: 'TRAP: You refused harshly. Alex now sees you as selfish. They\'ll be distant and won\'t help you in the future.',
    },
  ],
};

// Scene 2B Results
const scene2bOptimalResult: Scene = {
  id: 'scene-2b-optimal-result',
  backgroundId: 'apartment',
  dialog: [
    {
      text: 'Alex\'s eyes widen with gratitude.',
    },
    {
      text: '"Seriously? Thanks so much. I really appreciate this. I owe you one."',
      speakerId: 'alex',
      emotion: 'happy',
    },
    {
      text: 'You helped without making a big deal. Alex now sees you as generous and secure. They\'re in your debt—and they\'ll help you when you need it.',
    },
  ],
  nextSceneId: 'scene-2c-ra-attention',
};

const scene2bCloseResult: Scene = {
  id: 'scene-2b-close-result',
  backgroundId: 'apartment',
  dialog: [
    {
      text: 'Alex nods quickly.',
    },
    {
      text: '"Perfect, thank you so much. You\'re a lifesaver."',
      speakerId: 'alex',
      emotion: 'happy',
    },
    {
      text: 'You helped but set clear boundaries. Alex is grateful and respects your limits.',
    },
  ],
  nextSceneId: 'scene-2c-ra-attention',
};

const scene2bSubtleResult: Scene = {
  id: 'scene-2b-subtle-result',
  backgroundId: 'apartment',
  dialog: [
    {
      text: 'Alex takes the laptop, sensing your reluctance.',
    },
    {
      text: '"Thanks, I will."',
      speakerId: 'alex',
      emotion: 'neutral',
    },
    {
      text: 'You helped, but you didn\'t do it gracefully. Alex is grateful but also aware you weren\'t happy about it.',
    },
  ],
  nextSceneId: 'scene-2c-ra-attention',
};

const scene2bTrapResult: Scene = {
  id: 'scene-2b-trap-result',
  backgroundId: 'apartment',
  dialog: [
    {
      text: 'Alex\'s face hardens.',
    },
    {
      text: '"Wow, okay. I guess I\'ll figure it out."',
      speakerId: 'alex',
      emotion: 'sad',
    },
    {
      text: 'They turn away. The warmth in the room is gone. You refused to help when it cost you nothing. Alex now sees you as selfish.',
    },
  ],
  nextSceneId: 'scene-2c-ra-attention',
};

// Scene 2C: The RA's Attention
const scene2c: Scene = {
  id: 'scene-2c-ra-attention',
  backgroundId: 'apartment',
  dialog: [
    {
      text: 'A few days later. Jordan stops you in the hallway.',
    },
    {
      text: '"Hey, I\'ve been hearing good things about you. Alex says you\'re cool, and Casey mentioned you\'re coming to the party this weekend. How are you settling in?"',
      speakerId: 'jordan',
      emotion: 'happy',
    },
    {
      speakerId: 'inner-voice',
      text: 'The RA is noticing you. Are you a problem or an asset?',
      emotion: 'neutral',
    },
  ],
  choices: [
    {
      id: 'choice-2c-optimal',
      text: '"Thanks for checking in. I\'m settling in well. I appreciate you creating a good environment here."',
      nextSceneId: 'scene-2c-optimal-result',
      isOptimal: true,
      xpBonus: 15,
      feedback: 'OPTIMAL: You acknowledged their work without flattering them. Jordan sees you as someone with perspective and maturity. They\'re now invested in your success.',
    },
    {
      id: 'choice-2c-close',
      text: '"Thanks for checking in. It\'s been great. I\'m impressed by how well you manage the floor. Everyone seems to respect you."',
      nextSceneId: 'scene-2c-close-result',
      xpBonus: 10,
      feedback: 'CLOSE: You complimented them genuinely and engaged. Jordan now sees you as someone worth investing in.',
    },
    {
      id: 'choice-2c-subtle',
      text: '"It\'s going well. Everyone\'s been friendly. I\'m excited for the semester."',
      nextSceneId: 'scene-2c-subtle-result',
      xpBonus: 5,
      feedback: 'You were polite and positive but didn\'t reveal anything. Jordan sees you as fine but forgettable.',
    },
    {
      id: 'choice-2c-trap',
      text: '"Oh, it\'s been great! I\'m so happy here. I was really worried about fitting in, but everyone\'s been so nice. I\'m still getting used to being away from home though..."',
      nextSceneId: 'scene-2c-trap-result',
      xpBonus: 0,
      feedback: 'TRAP: You over-shared and came across as insecure. Jordan will be friendly but won\'t go out of their way for you.',
    },
  ],
};

// Scene 2C Results - Endings
const scene2cOptimalResult: Scene = {
  id: 'scene-2c-optimal-result',
  backgroundId: 'apartment',
  dialog: [
    {
      text: 'Jordan looks genuinely impressed.',
    },
    {
      text: '"That\'s mature of you to notice. Honestly, you\'re one of the few people who gets that. If you ever want to get involved with floor activities or need advice, come find me."',
      speakerId: 'jordan',
      emotion: 'happy',
    },
    {
      text: 'You acknowledged their work without being a sycophant. Jordan now sees you as someone with perspective. They\'re genuinely invested in your success.',
    },
  ],
  isEnding: true,
  outcomeType: 'good',
  endingTitle: 'The Strategic Ally',
  endingSummary: 'The RA respects you and will advocate for you. An authority figure on your side is a strategic asset. You\'ve established yourself in the dorm hierarchy. Mission complete.',
};

const scene2cCloseResult: Scene = {
  id: 'scene-2c-close-result',
  backgroundId: 'apartment',
  dialog: [
    {
      text: 'Jordan smiles.',
    },
    {
      text: '"I appreciate that. You\'re doing great too. If you ever want to grab coffee and talk about anything, let me know."',
      speakerId: 'jordan',
      emotion: 'happy',
    },
    {
      text: 'You complimented them genuinely. Jordan now sees you as someone worth investing in.',
    },
  ],
  isEnding: true,
  outcomeType: 'good',
  endingTitle: 'The Charmer',
  endingSummary: 'Jordan likes you. Your genuine engagement paid off. You\'re establishing a reputation as someone worth knowing. Mission complete.',
};

const scene2cSubtleResult: Scene = {
  id: 'scene-2c-subtle-result',
  backgroundId: 'apartment',
  dialog: [
    {
      text: 'Jordan nods.',
    },
    {
      text: '"Great, that\'s what I like to hear. Keep up the good vibes."',
      speakerId: 'jordan',
      emotion: 'neutral',
    },
    {
      text: 'Polite but forgettable. You\'re fine in their eyes, but not memorable.',
    },
  ],
  isEnding: true,
  outcomeType: 'neutral',
  endingTitle: 'Under the Radar',
  endingSummary: 'You\'ve established yourself as pleasant and unremarkable. Not a problem, but not a priority either. The dorm is your base, but you\'ll need to create opportunities. Mission complete.',
};

const scene2cTrapResult: Scene = {
  id: 'scene-2c-trap-result',
  backgroundId: 'apartment',
  dialog: [
    {
      text: 'Jordan\'s smile becomes slightly polite.',
    },
    {
      text: '"That\'s good. Well, let me know if you need anything."',
      speakerId: 'jordan',
      emotion: 'neutral',
    },
    {
      text: 'You over-shared. Jordan filed you as "needs support" rather than "potential ally." They\'ll be friendly, but they see you as someone who needs them more than they need you.',
    },
  ],
  isEnding: true,
  outcomeType: 'bad',
  endingTitle: 'The Needy One',
  endingSummary: 'You showed too much insecurity. Jordan sees you as someone to manage, not someone to respect. Uphill climb from here. Mission complete.',
};

export const mission2Scenes: Scene[] = [
  scene2a,
  scene2aOptimalResult,
  scene2aCloseResult,
  scene2aSubtleResult,
  scene2aTrapResult,
  scene2b,
  scene2bOptimalResult,
  scene2bCloseResult,
  scene2bSubtleResult,
  scene2bTrapResult,
  scene2c,
  scene2cOptimalResult,
  scene2cCloseResult,
  scene2cSubtleResult,
  scene2cTrapResult,
];

export const mission2Scenario: DatingScenario = {
  id: MISSION_ID,
  levelId: 'university',
  missionNumber: 2,
  title: missionMetadata.title,
  tagline: 'Your home base. Your first power plays.',
  description: missionMetadata.objective,
  objective: missionMetadata.objective,
  tier: missionMetadata.tier,
  estimatedMinutes: missionMetadata.estimatedMinutes,
  difficulty: missionMetadata.difficulty,
  characters,
  scenes: mission2Scenes,
  rewards,
  startSceneId: 'scene-2a-floor-party',
};

export default mission2Scenario;
