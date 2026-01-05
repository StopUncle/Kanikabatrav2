// SECRET LEVEL 2: Recognizing Coercion (Apple-Safe Version)
// Unlock: Complete Mission 10 with OPTIMAL choices at Scene 10B and 10C
// DEFENSIVE: Recognize coercive group dynamics and escape
import type { Scene } from '../../../../types';
import type { DatingScenario, MissionRewards } from '../../types';
import { characters as baseCharacters } from '../metadata';
import type { Character } from '../../../../types';

export const MISSION_ID = 'secret-recognizing-coercion';

const secretCharacters: Character[] = [
  {
    id: 'aristocrat',
    name: 'The Aristocrat',
    description: 'Gatekeeper. Has conditional acceptance. Uses tests.',
    traits: ['refined', 'discerning', 'controlling'],
    defaultEmotion: 'neutral',
    personalityType: 'narcissist',
    silhouetteType: 'male-imposing',
  },
  {
    id: 'connector',
    name: 'The Connector',
    description: 'Recruiter. Makes you feel special. Builds obligation.',
    traits: ['social', 'strategic', 'manipulative'],
    defaultEmotion: 'happy',
    personalityType: 'psychopath',
    silhouetteType: 'female-elegant',
  },
];

const characters = [...baseCharacters, ...secretCharacters];

export const missionMetadata = {
  id: MISSION_ID,
  number: 11,
  title: 'Recognizing Coercion',
  objective: 'Recognize coercive group dynamics. Spot love bombing, elitism as control, and obligation traps.',
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
  backgroundId: 'text-screen',
  dialog: [
    {
      text: 'A week after the networking event. Private message from Skyler.',
    },
    {
      text: '"There\'s a private gathering this weekend. Very select. You impressed some people. They want to meet you."',
      speakerId: 'skyler',
      emotion: 'smirking',
    },
    {
      speakerId: 'inner-voice',
      text: '"Very select." "Impressed people." Love bombing through exclusivity. Classic recruitment tactic.',
      emotion: 'concerned',
    },
  ],
  choices: [
    {
      id: 'choice-s2a-question',
      text: '"Who wants to meet me? And why?"',
      nextSceneId: 'scene-s2a-question-result',
      isOptimal: true,
      xpBonus: 20,
      feedback: 'Good. Get specifics before committing.',
    },
    {
      id: 'choice-s2a-flattered',
      text: '"Really? That\'s amazing. I\'d love to come."',
      nextSceneId: 'scene-s2a-flattered-result',
      xpBonus: 0,
      feedback: 'The exclusivity worked. You didn\'t ask a single question.',
    },
    {
      id: 'choice-s2a-cautious',
      text: '"What kind of gathering? I don\'t do anything sketchy."',
      nextSceneId: 'scene-s2a-cautious-result',
      xpBonus: 10,
      feedback: 'Boundary stated. Let\'s see if they respect it.',
    },
    {
      id: 'choice-s2a-decline',
      text: '"I don\'t do private gatherings with people I don\'t know."',
      nextSceneId: 'scene-s2a-decline-result',
      xpBonus: 15,
      feedback: 'Clear boundary. They won\'t like it.',
    },
  ],
};

// Scene S2B: The Gathering
const sceneS2b: Scene = {
  id: 'scene-s2b-gathering',
  backgroundId: 'restaurant',
  dialog: [
    {
      text: 'Private residence. Wealth on display. Conversations in hushed, important tones.',
    },
    {
      text: 'The Aristocrat approaches. Assessing you like livestock.',
    },
    {
      text: '"Skyler speaks highly of you. That\'s rare. But words mean nothing. What do you bring to our circle?"',
      speakerId: 'aristocrat',
      emotion: 'cold',
    },
    {
      speakerId: 'inner-voice',
      text: 'Gatekeeper test. They want you to prove your worth. Classic coercive control setup.',
      emotion: 'knowing',
    },
  ],
  choices: [
    {
      id: 'choice-s2b-question',
      text: '"What is this circle, exactly? And what do members owe?"',
      nextSceneId: 'scene-s2b-question-result',
      isOptimal: true,
      xpBonus: 25,
      feedback: 'You asked about obligations. That question makes them uncomfortable.',
    },
    {
      id: 'choice-s2b-perform',
      text: 'List your accomplishments. Try to impress.',
      nextSceneId: 'scene-s2b-perform-result',
      xpBonus: 0,
      feedback: 'You auditioned. They have power over you now.',
    },
    {
      id: 'choice-s2b-deflect',
      text: '"I don\'t usually pitch myself. Why don\'t you tell me what you\'re looking for?"',
      nextSceneId: 'scene-s2b-deflect-result',
      xpBonus: 10,
      feedback: 'Flip the frame. Make them explain themselves.',
    },
    {
      id: 'choice-s2b-leave',
      text: '"Actually, I think I\'m going to head out."',
      nextSceneId: 'scene-s2b-leave-result',
      xpBonus: 15,
      feedback: 'Your gut said leave. Trust that.',
    },
  ],
};

// Scene S2C: The Offer
const sceneS2c: Scene = {
  id: 'scene-s2c-offer',
  backgroundId: 'restaurant',
  dialog: [
    {
      text: 'The Connector pulls you aside. Warm smile. Too warm.',
    },
    {
      text: '"You passed the test. They want you at the Gala. Not as a guest. As one of us. We take care of our own."',
      speakerId: 'connector',
      emotion: 'seductive',
    },
    {
      speakerId: 'inner-voice',
      text: '"One of us." "We take care of our own." Reciprocity trap. They\'re offering belonging with strings attached.',
      emotion: 'concerned',
    },
  ],
  choices: [
    {
      id: 'choice-s2c-clarify',
      text: '"What exactly does \'one of us\' mean? What are the expectations?"',
      nextSceneId: 'scene-s2c-clarify-result',
      isOptimal: true,
      xpBonus: 25,
      feedback: 'Get the terms in writing before you sign anything.',
    },
    {
      id: 'choice-s2c-accept',
      text: '"I\'m honored. Count me in."',
      nextSceneId: 'scene-s2c-accept-result',
      xpBonus: 0,
      feedback: 'You joined without knowing the cost. That\'s the trap.',
    },
    {
      id: 'choice-s2c-think',
      text: '"I need time to think about this."',
      nextSceneId: 'scene-s2c-think-result',
      xpBonus: 15,
      feedback: 'Space to process. Watch how they handle delay.',
    },
    {
      id: 'choice-s2c-decline',
      text: '"I appreciate the offer, but groups with \'tests\' aren\'t for me."',
      nextSceneId: 'scene-s2c-decline-result',
      xpBonus: 20,
      feedback: 'You named the pattern. They won\'t forget that.',
    },
  ],
};

// Scene S2A Results
const sceneS2aQuestionResult: Scene = {
  id: 'scene-s2a-question-result',
  backgroundId: 'text-screen',
  dialog: [
    { text: 'Skyler pauses before responding.', speakerId: 'skyler', emotion: 'neutral' },
    { text: '"Some connected people. They like to meet interesting newcomers. It\'s not a big deal."' },
    { speakerId: 'inner-voice', text: 'Vague. "Connected people" who recruit through DMs. Note the evasion.', emotion: 'knowing' },
  ],
  nextSceneId: 'scene-s2b-gathering',
};

// EARLY FAILURE - Flattered into compliance
const sceneS2aFlatteredResult: Scene = {
  id: 'scene-s2a-flattered-result',
  backgroundId: 'text-screen',
  dialog: [
    { text: '"Perfect! I\'ll send you the address. Dress well."', speakerId: 'skyler', emotion: 'happy' },
    { text: 'You show up not knowing what you walked into.' },
    { text: 'Six months later, you\'re doing "favors" you never agreed to. Trapped by obligation.' },
    { speakerId: 'inner-voice', text: 'The love bombing worked. You signed up before asking what you were signing.', emotion: 'sad' },
  ],
  isEnding: true,
  outcomeType: 'bad',
  endingTitle: 'The Recruit',
  endingSummary: 'You joined without questions. Now you owe people things you never agreed to. Classic coercive recruitment.',
};

const sceneS2aCautiousResult: Scene = {
  id: 'scene-s2a-cautious-result',
  backgroundId: 'text-screen',
  dialog: [
    { text: '"Nothing sketchy. Just successful people who like to network privately."', speakerId: 'skyler', emotion: 'smirking' },
    { text: 'Private networking. That could mean anything.' },
    { speakerId: 'inner-voice', text: 'Still vague. They didn\'t actually answer your question.', emotion: 'concerned' },
  ],
  nextSceneId: 'scene-s2b-gathering',
};

const sceneS2aDeclineResult: Scene = {
  id: 'scene-s2a-decline-result',
  backgroundId: 'text-screen',
  dialog: [
    { text: 'Skyler\'s tone shifts. Cooler.', speakerId: 'skyler', emotion: 'cold' },
    { text: '"Your loss. Opportunities like this don\'t come around twice."' },
    { text: 'Pressure through scarcity. They really want you there. Why?' },
    { speakerId: 'inner-voice', text: 'When you say no, they push harder. That\'s the tell.', emotion: 'knowing' },
  ],
  isEnding: true,
  outcomeType: 'good',
  endingTitle: 'The Early Exit',
  endingSummary: 'You declined the "exclusive" invitation. Their pressure when you said no confirmed your instincts.',
};

// Scene S2B Results
const sceneS2bQuestionResult: Scene = {
  id: 'scene-s2b-question-result',
  backgroundId: 'restaurant',
  dialog: [
    { text: 'The Aristocrat\'s eyes narrow. Nobody asks about obligations.', speakerId: 'aristocrat', emotion: 'cold' },
    { text: '"We support each other. Help each other\'s businesses. Make introductions. Nothing onerous."' },
    { text: '"How binding is \'support\'? What happens if someone says no?"' },
    { text: 'Long pause. "No one says no. Not if they want to stay connected."' },
    { speakerId: 'inner-voice', text: 'There it is. Implied threat. Obligation enforced by exclusion.', emotion: 'knowing' },
  ],
  nextSceneId: 'scene-s2c-offer',
};

// EARLY FAILURE - Performed for approval
const sceneS2bPerformResult: Scene = {
  id: 'scene-s2b-perform-result',
  backgroundId: 'restaurant',
  dialog: [
    { text: 'You list your achievements. Your connections. Your potential.' },
    { text: 'The Aristocrat nods slowly. Approving. You passed the test.', speakerId: 'aristocrat', emotion: 'smirking' },
    { text: 'But you also showed them exactly what you want: their approval.' },
    { speakerId: 'inner-voice', text: 'You auditioned. Now they know you need their validation to feel worthy.', emotion: 'sad' },
  ],
  nextSceneId: 'scene-s2c-offer',
};

const sceneS2bDeflectResult: Scene = {
  id: 'scene-s2b-deflect-result',
  backgroundId: 'restaurant',
  dialog: [
    { text: 'The Aristocrat pauses. Not used to being asked to explain.', speakerId: 'aristocrat', emotion: 'neutral' },
    { text: '"Fair enough. We\'re looking for people who add value without needing to be managed."' },
    { speakerId: 'inner-voice', text: '"Without needing to be managed" = people who comply without questions. Noted.', emotion: 'knowing' },
  ],
  nextSceneId: 'scene-s2c-offer',
};

const sceneS2bLeaveResult: Scene = {
  id: 'scene-s2b-leave-result',
  backgroundId: 'restaurant',
  dialog: [
    { text: 'The Aristocrat\'s face hardens.', speakerId: 'aristocrat', emotion: 'cold' },
    { text: '"Leaving already? Skyler made a mistake bringing you."' },
    { text: 'You walk out. The Connector tries to stop you at the door. You keep walking.' },
    { speakerId: 'inner-voice', text: 'When leaving is treated as betrayal, that confirms it\'s a trap.', emotion: 'knowing' },
  ],
  isEnding: true,
  outcomeType: 'good',
  endingTitle: 'The Walk Out',
  endingSummary: 'You trusted your gut and left. Their anger at your departure proved they wanted to control you.',
};

// Scene S2C Results - Endings
const sceneS2cClarifyResult: Scene = {
  id: 'scene-s2c-clarify-result',
  backgroundId: 'restaurant',
  dialog: [
    { text: 'The Connector\'s smile flickers.', speakerId: 'connector', emotion: 'cold' },
    { text: '"Expectations? We just... help each other. Make introductions. Return favors."' },
    { text: '"What kind of favors? Can I see this in writing?"' },
    { text: 'Silence. Nobody asks for things in writing.' },
    { speakerId: 'inner-voice', text: 'They can\'t put it in writing because the obligations are vague and endless. Classic trap.', emotion: 'knowing' },
  ],
  isEnding: true,
  outcomeType: 'good',
  endingTitle: 'The Due Diligence',
  endingSummary: 'You asked for specifics. They couldn\'t provide them. Legitimate groups can explain their terms. This couldn\'t.',
};

// WORST FAILURE - Joined without knowing the cost
const sceneS2cAcceptResult: Scene = {
  id: 'scene-s2c-accept-result',
  backgroundId: 'restaurant',
  dialog: [
    { text: 'The Connector beams. "Welcome to the family."', speakerId: 'connector', emotion: 'happy' },
    { text: 'Handshakes all around. You\'re in.' },
    { text: 'Six months later: favors requested that feel wrong. But leaving means losing everything.' },
    { speakerId: 'inner-voice', text: 'You joined to belong. Now you belong to them.', emotion: 'sad' },
  ],
  isEnding: true,
  outcomeType: 'bad',
  endingTitle: 'The Trapped',
  endingSummary: 'You joined without terms. Now you owe undefined obligations to people who keep score. Good luck leaving.',
};

const sceneS2cThinkResult: Scene = {
  id: 'scene-s2c-think-result',
  backgroundId: 'restaurant',
  dialog: [
    { text: 'The Connector\'s warmth cools noticeably.', speakerId: 'connector', emotion: 'cold' },
    { text: '"Of course. Take your time. But opportunities like this don\'t wait forever."' },
    { text: 'Pressure disguised as patience. They\'ll keep following up.' },
    { speakerId: 'inner-voice', text: 'You bought time. Use it to think clearly about what they\'re really offering.', emotion: 'neutral' },
  ],
  isEnding: true,
  outcomeType: 'neutral',
  endingTitle: 'The Pause',
  endingSummary: 'You didn\'t say yes. They\'ll keep recruiting. Stay aware of the pressure tactics ahead.',
};

const sceneS2cDeclineResult: Scene = {
  id: 'scene-s2c-decline-result',
  backgroundId: 'restaurant',
  dialog: [
    { text: 'The Connector\'s face goes flat. Cold.', speakerId: 'connector', emotion: 'cold' },
    { text: '"Tests? You have it all wrong. We were offering you something special."' },
    { text: '"Special things don\'t require gatekeepers and approval tests. Take care."' },
    { text: 'You leave. They watch you go. Not used to rejection.' },
    { speakerId: 'inner-voice', text: 'You named the coercion. They couldn\'t argue back. You\'re free.', emotion: 'happy' },
  ],
  isEnding: true,
  outcomeType: 'good',
  endingTitle: 'The Pattern Namer',
  endingSummary: 'You called out the coercive tactics directly. They had no defense. You walked out with your freedom.',
};

export const secretScenes: Scene[] = [
  sceneS2a, sceneS2aQuestionResult, sceneS2aFlatteredResult, sceneS2aCautiousResult, sceneS2aDeclineResult,
  sceneS2b, sceneS2bQuestionResult, sceneS2bPerformResult, sceneS2bDeflectResult, sceneS2bLeaveResult,
  sceneS2c, sceneS2cClarifyResult, sceneS2cAcceptResult, sceneS2cThinkResult, sceneS2cDeclineResult,
];

export const secretScenario: DatingScenario = {
  id: MISSION_ID,
  levelId: 'social-scene',
  missionNumber: 11,
  title: missionMetadata.title,
  tagline: 'Exclusive invitations always have hidden costs.',
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
