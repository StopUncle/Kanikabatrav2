// Mission 7: Dating Apps (Apple-Safe Version)
// DEFENSIVE: Spot red flags in dating app conversations
import type { Scene } from '../../../../types';
import type { DatingScenario, MissionRewards } from '../../types';
import { characters } from '../metadata';

export const MISSION_ID = 'mission-7-dating-apps';

export const missionMetadata = {
  id: MISSION_ID,
  number: 7,
  title: 'Dating Apps',
  objective: 'Spot red flags in dating app conversations. Recognize love bombing and future faking.',
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
      text: 'New match. Quinn. Their profile is perfect. Maybe too perfect.',
    },
    {
      text: 'They messaged first—within seconds: "Finally! I\'ve been waiting for someone like you. You seem so different from everyone else on here."',
      speakerId: 'quinn',
      emotion: 'happy',
    },
    {
      speakerId: 'inner-voice',
      text: 'Immediate intensity. "Different from everyone else." They don\'t know you yet. Why so sure?',
      emotion: 'concerned',
    },
  ],
  choices: [
    {
      id: 'choice-7a-flattered',
      text: '"Thanks! That\'s really sweet of you."',
      nextSceneId: 'scene-7a-flattered-result',
      xpBonus: 0,
      feedback: 'You took the bait. The flattery worked.',
    },
    {
      id: 'choice-7a-question',
      text: '"We just matched. How can you tell I\'m different?"',
      nextSceneId: 'scene-7a-question-result',
      isOptimal: true,
      xpBonus: 15,
      feedback: 'Good. Question the unearned praise.',
    },
    {
      id: 'choice-7a-match-energy',
      text: '"I felt the same thing! There\'s something special here."',
      nextSceneId: 'scene-7a-match-energy-result',
      xpBonus: 5,
      feedback: 'You matched their intensity. Now you\'re both sprinting toward... what?',
    },
    {
      id: 'choice-7a-cautious',
      text: '"Hi! Let\'s chat and find out if that\'s true."',
      nextSceneId: 'scene-7a-cautious-result',
      xpBonus: 10,
      feedback: 'Polite boundary. Reality check without being cold.',
    },
  ],
};

// Scene 7B: The Love Bombing
const scene7b: Scene = {
  id: 'scene-7b-love-bomb',
  backgroundId: 'text-screen',
  dialog: [
    {
      text: 'Twenty minutes in. Quinn is messaging constantly.',
    },
    {
      text: '"I can\'t believe I found you. I was about to give up on this app. You\'re literally everything I\'ve been looking for. It\'s like fate."',
      speakerId: 'quinn',
      emotion: 'seductive',
    },
    {
      speakerId: 'inner-voice',
      text: 'Love bombing. Overwhelming affection before they know you. Red flag.',
      emotion: 'concerned',
    },
  ],
  choices: [
    {
      id: 'choice-7b-recognize',
      text: '"We\'ve been talking for 20 minutes. How can you know all that?"',
      nextSceneId: 'scene-7b-recognize-result',
      isOptimal: true,
      xpBonus: 20,
      feedback: 'You called it out. Let\'s see if they recalibrate or double down.',
    },
    {
      id: 'choice-7b-enjoy',
      text: '"I feel the same way! This is amazing."',
      nextSceneId: 'scene-7b-enjoy-result',
      xpBonus: 0,
      feedback: 'Hook, line, sinker. They\'ve got you.',
    },
    {
      id: 'choice-7b-slow',
      text: '"I appreciate that, but let\'s take it slow. We just met."',
      nextSceneId: 'scene-7b-slow-result',
      xpBonus: 15,
      feedback: 'Boundary set. How they respond will tell you everything.',
    },
    {
      id: 'choice-7b-deflect',
      text: '"Ha, that\'s flattering. What are you watching lately?"',
      nextSceneId: 'scene-7b-deflect-result',
      xpBonus: 8,
      feedback: 'You redirected. Good instinct, but they might circle back.',
    },
  ],
};

// Scene 7C: The Future Faking
const scene7c: Scene = {
  id: 'scene-7c-future-fake',
  backgroundId: 'text-screen',
  dialog: [
    {
      text: 'An hour later. Quinn is still going strong.',
    },
    {
      text: '"I already know we\'re going to be amazing together. I can picture us traveling, meeting each other\'s families... I want to introduce you to my mom."',
      speakerId: 'quinn',
      emotion: 'happy',
    },
    {
      speakerId: 'inner-voice',
      text: 'Future faking. Building castles in the air before you\'ve even met. Massive red flag.',
      emotion: 'concerned',
    },
  ],
  choices: [
    {
      id: 'choice-7c-reality',
      text: '"We haven\'t even had coffee yet. Let\'s start there."',
      nextSceneId: 'scene-7c-reality-result',
      isOptimal: true,
      xpBonus: 20,
      feedback: 'You grounded it. Real connection starts with real moments.',
    },
    {
      id: 'choice-7c-go-along',
      text: '"That sounds incredible! I can\'t wait."',
      nextSceneId: 'scene-7c-go-along-result',
      xpBonus: 0,
      feedback: 'You joined the fantasy. Reality will hit hard later.',
    },
    {
      id: 'choice-7c-redirect',
      text: '"Let\'s meet first. Free Thursday?"',
      nextSceneId: 'scene-7c-redirect-result',
      xpBonus: 15,
      feedback: 'Good. You\'re testing if they actually want to meet or just fantasize.',
    },
    {
      id: 'choice-7c-uncomfortable',
      text: '"That\'s a lot. I\'m going to need some time to think."',
      nextSceneId: 'scene-7c-uncomfortable-result',
      xpBonus: 10,
      feedback: 'Honest discomfort. Let\'s see if they respect it.',
    },
  ],
};

// Scene 7A Results
const scene7aFlatteredResult: Scene = {
  id: 'scene-7a-flattered-result',
  backgroundId: 'text-screen',
  dialog: [
    { text: 'Quinn doubles down immediately.', speakerId: 'quinn', emotion: 'happy' },
    { text: '"I knew it! I could just tell. There\'s a connection here. Don\'t you feel it?"' },
    { speakerId: 'inner-voice', text: 'They\'re pushing you to confirm a "connection" that\'s 30 seconds old.', emotion: 'concerned' },
  ],
  nextSceneId: 'scene-7b-love-bomb',
};

const scene7aQuestionResult: Scene = {
  id: 'scene-7a-question-result',
  backgroundId: 'text-screen',
  dialog: [
    { text: 'Brief pause. Then:', speakerId: 'quinn', emotion: 'neutral' },
    { text: '"I don\'t know, I just... felt something. Call it intuition?"' },
    { speakerId: 'inner-voice', text: 'Vague answer. They\'re reading a script, not you.', emotion: 'knowing' },
  ],
  nextSceneId: 'scene-7b-love-bomb',
};

const scene7aMatchEnergyResult: Scene = {
  id: 'scene-7a-match-energy-result',
  backgroundId: 'text-screen',
  dialog: [
    { text: '"SEE! I knew you\'d get it. We\'re so in sync already."', speakerId: 'quinn', emotion: 'happy' },
    { text: 'Twenty messages in the next five minutes. Each one more intense.' },
    { speakerId: 'inner-voice', text: 'You fed the fire. Now it\'s blazing. Too fast.', emotion: 'concerned' },
  ],
  nextSceneId: 'scene-7b-love-bomb',
};

const scene7aCautiousResult: Scene = {
  id: 'scene-7a-cautious-result',
  backgroundId: 'text-screen',
  dialog: [
    { text: '"Ha, okay cautious one. I respect that. But you\'ll see."', speakerId: 'quinn', emotion: 'smirking' },
    { text: 'They continue messaging. Undeterred by your boundary.' },
    { speakerId: 'inner-voice', text: 'They heard your boundary. They just decided to ignore it.', emotion: 'concerned' },
  ],
  nextSceneId: 'scene-7b-love-bomb',
};

// Scene 7B Results
const scene7bRecognizeResult: Scene = {
  id: 'scene-7b-recognize-result',
  backgroundId: 'text-screen',
  dialog: [
    { text: 'Quinn\'s typing stops. Long pause.', speakerId: 'quinn', emotion: 'neutral' },
    { text: '"Wow okay. I was just being nice. You don\'t have to be so... guarded."' },
    { text: 'Defensive. Blame-shifting. Classic.', speakerId: 'inner-voice', emotion: 'knowing' },
  ],
  nextSceneId: 'scene-7c-future-fake',
};

// EARLY FAILURE - Love bombed successfully
const scene7bEnjoyResult: Scene = {
  id: 'scene-7b-enjoy-result',
  backgroundId: 'text-screen',
  dialog: [
    { text: '"I KNEW it! We\'re soulmates. I\'ve never felt this before."', speakerId: 'quinn', emotion: 'seductive' },
    { text: 'By midnight, you\'ve shared your address, work schedule, and deepest fears.' },
    { text: 'They know everything about you. You know nothing real about them.' },
    { speakerId: 'inner-voice', text: 'Love bombing works. You just experienced why.', emotion: 'sad' },
  ],
  isEnding: true,
  outcomeType: 'bad',
  endingTitle: 'The Swept Away',
  endingSummary: 'You got love bombed and liked it. Now they have all your information and you have... feelings.',
};

const scene7bSlowResult: Scene = {
  id: 'scene-7b-slow-result',
  backgroundId: 'text-screen',
  dialog: [
    { text: '"Take it slow?" Quinn\'s messages speed up, not down.', speakerId: 'quinn', emotion: 'confused' },
    { text: '"But why would you want to slow down something so perfect?"' },
    { speakerId: 'inner-voice', text: 'You asked for slow. They pushed faster. Boundary not respected.', emotion: 'knowing' },
  ],
  nextSceneId: 'scene-7c-future-fake',
};

const scene7bDeflectResult: Scene = {
  id: 'scene-7b-deflect-result',
  backgroundId: 'text-screen',
  dialog: [
    { text: '"Oh I love that question! We can watch something together soon."', speakerId: 'quinn', emotion: 'happy' },
    { text: 'They answered by assuming a future date. Deflection absorbed into the plan.' },
    { speakerId: 'inner-voice', text: 'They turned your redirect into another future they\'re building for you.', emotion: 'concerned' },
  ],
  nextSceneId: 'scene-7c-future-fake',
};

// Scene 7C Results - Endings
const scene7cRealityResult: Scene = {
  id: 'scene-7c-reality-result',
  backgroundId: 'text-screen',
  dialog: [
    { text: 'Quinn goes quiet for a while. Then:', speakerId: 'quinn', emotion: 'cold' },
    { text: '"I thought we had something special. But you\'re just like everyone else."' },
    { text: 'They unmatch.' },
    { speakerId: 'inner-voice', text: 'When you didn\'t join their fantasy, they lost interest. Bullet dodged.', emotion: 'knowing' },
  ],
  isEnding: true,
  outcomeType: 'good',
  endingTitle: 'The Reality Check',
  endingSummary: 'You spotted the love bombing and future faking. When you asked for reality, they vanished. You won.',
};

// EARLY FAILURE - Bought the fantasy
const scene7cGoAlongResult: Scene = {
  id: 'scene-7c-go-along-result',
  backgroundId: 'text-screen',
  dialog: [
    { text: '"I know, right? I\'m looking at apartments near you already. Is that crazy?"', speakerId: 'quinn', emotion: 'seductive' },
    { text: 'It should feel crazy. But it feels... exciting.' },
    { text: 'Six weeks later, you\'re in a relationship with someone you\'ve met twice. Red flags everywhere. You ignored them all.' },
    { speakerId: 'inner-voice', text: 'Fantasy felt better than reality. Until it didn\'t.', emotion: 'sad' },
  ],
  isEnding: true,
  outcomeType: 'bad',
  endingTitle: 'The Fantasy Trap',
  endingSummary: 'You joined their fantasy world. Reality will hit hard when the love bombing stops.',
};

const scene7cRedirectResult: Scene = {
  id: 'scene-7c-redirect-result',
  backgroundId: 'text-screen',
  dialog: [
    { text: '"Thursday? Perfect! I\'ll plan something amazing."', speakerId: 'quinn', emotion: 'happy' },
    { text: 'They actually commit to a date. Good sign.' },
    { text: 'But watch how they act in person. Words are cheap. Behavior is truth.' },
    { speakerId: 'inner-voice', text: 'Date secured. Now see if the intensity was real or performance.', emotion: 'neutral' },
  ],
  isEnding: true,
  outcomeType: 'neutral',
  endingTitle: 'The Test Date',
  endingSummary: 'You moved it to reality. In person, you\'ll see if they\'re genuine or just good at texting.',
};

const scene7cUncomfortableResult: Scene = {
  id: 'scene-7c-uncomfortable-result',
  backgroundId: 'text-screen',
  dialog: [
    { text: '"Time? Time for WHAT? I\'m offering you something beautiful!"', speakerId: 'quinn', emotion: 'angry' },
    { text: 'The mask slips. Frustration when you didn\'t immediately comply.' },
    { speakerId: 'inner-voice', text: 'There it is. Anger when you didn\'t match their pace. Red flag confirmed.', emotion: 'knowing' },
  ],
  isEnding: true,
  outcomeType: 'good',
  endingTitle: 'The Mask Slip',
  endingSummary: 'Your hesitation revealed their true colors. Genuine people don\'t rage when you set boundaries.',
};

export const mission7Scenes: Scene[] = [
  scene7a, scene7aFlatteredResult, scene7aQuestionResult, scene7aMatchEnergyResult, scene7aCautiousResult,
  scene7b, scene7bRecognizeResult, scene7bEnjoyResult, scene7bSlowResult, scene7bDeflectResult,
  scene7c, scene7cRealityResult, scene7cGoAlongResult, scene7cRedirectResult, scene7cUncomfortableResult,
];

export const mission7Scenario: DatingScenario = {
  id: MISSION_ID,
  levelId: 'social-scene',
  missionNumber: 7,
  title: missionMetadata.title,
  tagline: 'Not everyone is who they text.',
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
