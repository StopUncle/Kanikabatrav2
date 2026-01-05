// Mission 6: The Club (Apple-Safe Version)
// DEFENSIVE: Recognize social manipulation tactics in nightclub setting
import type { Scene } from '../../../../types';
import type { DatingScenario, MissionRewards } from '../../types';
import { characters } from '../metadata';

export const MISSION_ID = 'mission-6-the-club';

export const missionMetadata = {
  id: MISSION_ID,
  number: 6,
  title: 'The Club',
  objective: 'Recognize social manipulation tactics in nightclub setting.',
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

// Scene 6A: The Approach
const scene6a: Scene = {
  id: 'scene-6a-approach',
  backgroundId: 'bar',
  dialog: [
    {
      text: 'Upscale club. You\'re with Blake. Bass vibrating through your chest.',
    },
    {
      text: 'Someone catches your eye from across the room. Beautiful. They smile and start walking toward you.',
      speakerId: 'skyler',
      emotion: 'seductive',
    },
    {
      speakerId: 'inner-voice',
      text: 'That was fast. They picked you out of this whole crowd? Watch how they open.',
      emotion: 'knowing',
    },
  ],
  choices: [
    {
      id: 'choice-6a-flattered',
      text: 'Feel flattered. Smile back warmly.',
      nextSceneId: 'scene-6a-flattered-result',
      xpBonus: 5,
      feedback: 'Nice that they noticed you. But why you specifically?',
    },
    {
      id: 'choice-6a-observe',
      text: 'Stay neutral. Watch how they approach.',
      nextSceneId: 'scene-6a-observe-result',
      isOptimal: true,
      xpBonus: 15,
      feedback: 'Good. Learn their opening move before you react.',
    },
    {
      id: 'choice-6a-eager',
      text: 'Light up. Move toward them too.',
      nextSceneId: 'scene-6a-eager-result',
      xpBonus: 0,
      feedback: 'You showed all your cards before they even spoke.',
    },
    {
      id: 'choice-6a-suspicious',
      text: 'Immediately distrust them. Turn away.',
      nextSceneId: 'scene-6a-suspicious-result',
      xpBonus: 8,
      feedback: 'Safe. But maybe too quick to judge.',
    },
  ],
};

// Scene 6B: The Charm Offensive
const scene6b: Scene = {
  id: 'scene-6b-charm',
  backgroundId: 'bar',
  dialog: [
    {
      text: 'Skyler reaches you. Big smile. Intense eye contact.',
    },
    {
      text: '"I don\'t usually do this, but something about you... I just had to come over. You have this energy. It\'s magnetic."',
      speakerId: 'skyler',
      emotion: 'seductive',
    },
    {
      speakerId: 'inner-voice',
      text: 'Love bombing. Too much too fast. Real attraction builds—it doesn\'t arrive pre-packaged.',
      emotion: 'concerned',
    },
  ],
  choices: [
    {
      id: 'choice-6b-recognize',
      text: '"That\'s quite an opener. You use it often?"',
      nextSceneId: 'scene-6b-recognize-result',
      isOptimal: true,
      xpBonus: 20,
      feedback: 'Called it out gently. Their mask flickered.',
    },
    {
      id: 'choice-6b-buy-in',
      text: '"Wow, really? That\'s so sweet of you to say."',
      nextSceneId: 'scene-6b-buy-in-result',
      xpBonus: 0,
      feedback: 'You ate it up. They know they have you now.',
    },
    {
      id: 'choice-6b-deflect',
      text: '"Thanks. I\'m here with my friend." Point to Blake.',
      nextSceneId: 'scene-6b-deflect-result',
      xpBonus: 10,
      feedback: 'Boundary set. Let\'s see if they respect it.',
    },
    {
      id: 'choice-6b-match',
      text: 'Match their energy. Compliment them back intensely.',
      nextSceneId: 'scene-6b-match-result',
      xpBonus: 5,
      feedback: 'Now you\'re both playing a game. But who\'s winning?',
    },
  ],
};

// Scene 6C: The Isolation Attempt
const scene6c: Scene = {
  id: 'scene-6c-isolation',
  backgroundId: 'bar',
  dialog: [
    {
      text: 'The conversation continues. Skyler leans closer.',
    },
    {
      text: '"It\'s so loud in here. I know a quieter spot upstairs. VIP section. Just us. What do you say?"',
      speakerId: 'skyler',
      emotion: 'seductive',
    },
    {
      speakerId: 'inner-voice',
      text: 'Isolation attempt. They want you away from witnesses. That\'s a red flag.',
      emotion: 'concerned',
    },
  ],
  choices: [
    {
      id: 'choice-6c-decline',
      text: '"I\'m good here. My friend is waiting."',
      nextSceneId: 'scene-6c-decline-result',
      isOptimal: true,
      xpBonus: 20,
      feedback: 'Boundary held. Their smile didn\'t reach their eyes.',
    },
    {
      id: 'choice-6c-go',
      text: '"Sure, lead the way."',
      nextSceneId: 'scene-6c-go-result',
      xpBonus: 0,
      feedback: 'You just isolated yourself with a stranger. Bad idea.',
    },
    {
      id: 'choice-6c-counter',
      text: '"Why don\'t you join us instead? Blake\'s great."',
      nextSceneId: 'scene-6c-counter-result',
      xpBonus: 15,
      feedback: 'You flipped it. Now they have to operate with witnesses.',
    },
    {
      id: 'choice-6c-later',
      text: '"Maybe later. I just got here."',
      nextSceneId: 'scene-6c-later-result',
      xpBonus: 10,
      feedback: 'Soft no. They might try again.',
    },
  ],
};

// Scene 6A Results
const scene6aFlatteredResult: Scene = {
  id: 'scene-6a-flattered-result',
  backgroundId: 'bar',
  dialog: [
    { text: 'Your smile encourages them. They pick up the pace.' },
    { text: 'They arrive with a hand already reaching for your arm.' },
    { speakerId: 'inner-voice', text: 'Touch escalation before words. Filing that away.', emotion: 'knowing' },
  ],
  nextSceneId: 'scene-6b-charm',
};

const scene6aObserveResult: Scene = {
  id: 'scene-6a-observe-result',
  backgroundId: 'bar',
  dialog: [
    { text: 'You keep your expression neutral. Watching.' },
    { text: 'They slow down slightly. Recalibrating. Your non-reaction threw them off.' },
    { speakerId: 'inner-voice', text: 'Good. They expected immediate warmth. You gave them nothing to work with.', emotion: 'knowing' },
  ],
  nextSceneId: 'scene-6b-charm',
};

// EARLY FAILURE - Too eager
const scene6aEagerResult: Scene = {
  id: 'scene-6a-eager-result',
  backgroundId: 'bar',
  dialog: [
    { text: 'You light up. Start moving toward them. Meeting in the middle.' },
    { text: 'Their smile widens. They\'ve already won.' },
    { text: 'An hour later, you realize you\'ve told them everything about yourself. They\'ve shared almost nothing.' },
    { speakerId: 'inner-voice', text: 'You were so happy to be chosen, you didn\'t ask why.', emotion: 'sad' },
  ],
  isEnding: true,
  outcomeType: 'bad',
  endingTitle: 'The Easy Mark',
  endingSummary: 'You showed too much interest too fast. They knew exactly how to hook you.',
};

const scene6aSuspiciousResult: Scene = {
  id: 'scene-6a-suspicious-result',
  backgroundId: 'bar',
  dialog: [
    { text: 'You turn away. Maybe too quickly.' },
    { text: 'From the corner of your eye, you see them change direction. Smooth pivot. Already scanning for the next target.' },
    { speakerId: 'inner-voice', text: 'Avoided that one. But was everyone really a threat?', emotion: 'neutral' },
  ],
  nextSceneId: 'scene-6b-charm-suspicious',
};

// Alternative Scene 6B for suspicious path - Jamie approaches instead
const scene6bCharmSuspicious: Scene = {
  id: 'scene-6b-charm-suspicious',
  backgroundId: 'bar',
  dialog: [
    { text: 'A different person approaches. Less flashy. Genuine smile.' },
    { text: '"Hey, I saw you shut down that walking red flag. Smart move. I\'m Jamie."', speakerId: 'jamie', emotion: 'happy' },
    { speakerId: 'inner-voice', text: 'Different energy. No agenda in their eyes. Just... conversation.', emotion: 'curious' },
  ],
  choices: [
    {
      id: 'choice-6b-sus-open',
      text: '"Thanks. You noticed that?"',
      nextSceneId: 'scene-6b-sus-open-result',
      isOptimal: true,
      xpBonus: 15,
      feedback: 'Genuine connection. They saw what you saw.',
    },
    {
      id: 'choice-6b-sus-guard',
      text: 'Stay guarded. "What do you want?"',
      nextSceneId: 'scene-6b-sus-guard-result',
      xpBonus: 5,
      feedback: 'Fair. But not everyone is a threat.',
    },
    {
      id: 'choice-6b-sus-deflect',
      text: '"I don\'t know what you\'re talking about."',
      nextSceneId: 'scene-6b-sus-deflect-result',
      xpBonus: 8,
      feedback: 'Playing dumb. They see through it but don\'t push.',
    },
    {
      id: 'choice-6b-sus-leave',
      text: 'Walk away from this one too.',
      nextSceneId: 'scene-6b-sus-leave-result',
      xpBonus: 0,
      feedback: 'Too suspicious of everyone. Some connections are real.',
    },
  ],
};

// Scene 6B Results
const scene6bRecognizeResult: Scene = {
  id: 'scene-6b-recognize-result',
  backgroundId: 'bar',
  dialog: [
    { text: 'Skyler\'s smile freezes for a microsecond. Then recovers.', speakerId: 'skyler', emotion: 'cold' },
    { text: '"Ha, you\'re funny. No, I just—"' },
    { text: 'They\'re recalibrating. You spotted the script.' },
    { speakerId: 'inner-voice', text: 'There. The mask slipped. They didn\'t expect you to question it.', emotion: 'knowing' },
  ],
  nextSceneId: 'scene-6c-isolation',
};

// EARLY FAILURE - Bought the love bombing
const scene6bBuyInResult: Scene = {
  id: 'scene-6b-buy-in-result',
  backgroundId: 'bar',
  dialog: [
    { text: 'Skyler\'s eyes light up. They\'ve found their mark.', speakerId: 'skyler', emotion: 'seductive' },
    { text: '"You\'re different. I can tell. Most people here are so fake, but you..."' },
    { text: 'Thirty minutes later, you\'re isolated in VIP. They\'re asking about your apartment, your schedule, your "connection."' },
    { speakerId: 'inner-voice', text: 'You were so hungry for validation you didn\'t notice the hook.', emotion: 'sad' },
  ],
  isEnding: true,
  outcomeType: 'bad',
  endingTitle: 'The Love Bomb',
  endingSummary: 'You believed the flattery. They told you what you wanted to hear. Now they know exactly how to manipulate you.',
};

const scene6bDeflectResult: Scene = {
  id: 'scene-6b-deflect-result',
  backgroundId: 'bar',
  dialog: [
    { text: 'You gesture toward Blake. Skyler\'s eyes flick over, assessing.', speakerId: 'skyler', emotion: 'neutral' },
    { text: '"Oh, is that your boyfriend?"' },
    { speakerId: 'inner-voice', text: 'Testing if you\'re available. Not respecting the boundary—probing it.', emotion: 'concerned' },
  ],
  nextSceneId: 'scene-6c-isolation',
};

const scene6bMatchResult: Scene = {
  id: 'scene-6b-match-result',
  backgroundId: 'bar',
  dialog: [
    { text: 'You match their intensity. "You have incredible eyes."' },
    { text: 'They smile wider. But it\'s different now. Calculating.', speakerId: 'skyler', emotion: 'smirking' },
    { speakerId: 'inner-voice', text: 'You\'re playing their game. And they\'ve been playing it longer.', emotion: 'concerned' },
  ],
  nextSceneId: 'scene-6c-isolation',
};

// Suspicious path results
const scene6bSusOpenResult: Scene = {
  id: 'scene-6b-sus-open-result',
  backgroundId: 'bar',
  dialog: [
    { text: '"Yeah, I saw the whole thing." Jamie laughs. "They do that move on everyone."', speakerId: 'jamie', emotion: 'happy' },
    { text: '"I come here sometimes. You learn to spot the operators pretty fast."' },
    { speakerId: 'inner-voice', text: 'They\'re not selling you anything. Just talking.', emotion: 'happy' },
  ],
  isEnding: true,
  outcomeType: 'good',
  endingTitle: 'The Real One',
  endingSummary: 'You spotted the manipulation and found a genuine connection instead. Jamie has nothing to gain except conversation.',
};

const scene6bSusGuardResult: Scene = {
  id: 'scene-6b-sus-guard-result',
  backgroundId: 'bar',
  dialog: [
    { text: 'Jamie blinks. Puts their hands up.', speakerId: 'jamie', emotion: 'neutral' },
    { text: '"Whoa, nothing. Just thought you had good instincts. My bad."' },
    { text: 'They back off. Genuine people don\'t push.' },
  ],
  isEnding: true,
  outcomeType: 'neutral',
  endingTitle: 'The Fortress',
  endingSummary: 'You stayed safe but maybe pushed away someone real. Balance is the lesson.',
};

const scene6bSusDeflectResult: Scene = {
  id: 'scene-6b-sus-deflect-result',
  backgroundId: 'bar',
  dialog: [
    { text: 'Jamie grins. "Okay, sure. Well, if you ever want to talk about \'whatever that wasn\'t,\' I\'ll be over there."', speakerId: 'jamie', emotion: 'smirking' },
    { text: 'They walk away. No pressure. No agenda.' },
  ],
  isEnding: true,
  outcomeType: 'neutral',
  endingTitle: 'The Missed Connection',
  endingSummary: 'You played it safe. Maybe too safe. Some people are just friendly.',
};

// EARLY FAILURE - Too paranoid
const scene6bSusLeaveResult: Scene = {
  id: 'scene-6b-sus-leave-result',
  backgroundId: 'bar',
  dialog: [
    { text: 'You walk away without responding.' },
    { text: 'Jamie looks confused. Blake catches up. "That person seemed nice. What happened?"' },
    { text: 'You shrug. "Can\'t trust anyone here."' },
    { speakerId: 'inner-voice', text: 'You protected yourself from everything. Including real connection.', emotion: 'sad' },
  ],
  isEnding: true,
  outcomeType: 'bad',
  endingTitle: 'The Wall',
  endingSummary: 'Seeing threats everywhere means you never see opportunities. Not everyone is running a play.',
};

// Scene 6C Results
const scene6cDeclineResult: Scene = {
  id: 'scene-6c-decline-result',
  backgroundId: 'bar',
  dialog: [
    { text: 'Skyler\'s smile goes cold for a second. Then resets.', speakerId: 'skyler', emotion: 'cold' },
    { text: '"Sure, no problem. Maybe I\'ll find you later."' },
    { text: 'They drift away. Already scanning the room.' },
    { speakerId: 'inner-voice', text: 'They dropped you fast when you wouldn\'t isolate. That tells you everything.', emotion: 'knowing' },
  ],
  isEnding: true,
  outcomeType: 'good',
  endingTitle: 'The Pattern Spotter',
  endingSummary: 'You recognized the isolation attempt and held your boundary. They moved on to easier targets. You won.',
};

// EARLY FAILURE - Isolated yourself
const scene6cGoResult: Scene = {
  id: 'scene-6c-go-result',
  backgroundId: 'bar',
  dialog: [
    { text: 'You follow them upstairs. VIP is quieter. Emptier.' },
    { text: 'Their demeanor shifts. More possessive. Hand on your back.', speakerId: 'skyler', emotion: 'cold' },
    { text: 'Blake is three floors down. You realize how alone you are.' },
    { speakerId: 'inner-voice', text: 'You walked right into it. Predators isolate their prey.', emotion: 'concerned' },
  ],
  isEnding: true,
  outcomeType: 'bad',
  endingTitle: 'The Isolated',
  endingSummary: 'You let a stranger separate you from your friends. A classic warning sign, and you missed it.',
};

const scene6cCounterResult: Scene = {
  id: 'scene-6c-counter-result',
  backgroundId: 'bar',
  dialog: [
    { text: 'Skyler hesitates. Their smile tightens.', speakerId: 'skyler', emotion: 'cold' },
    { text: '"I was hoping for something more... private."' },
    { text: '"We can be private right here. Unless you have something to hide?"' },
    { text: 'Their eyes flash with irritation. Then they excuse themselves.' },
    { speakerId: 'inner-voice', text: 'Witnesses ruin their game. They won\'t play fair if they can\'t play alone.', emotion: 'knowing' },
  ],
  isEnding: true,
  outcomeType: 'good',
  endingTitle: 'The Counter-Move',
  endingSummary: 'You flipped the script. Predators need isolation to operate. You refused to give it to them.',
};

const scene6cLaterResult: Scene = {
  id: 'scene-6c-later-result',
  backgroundId: 'bar',
  dialog: [
    { text: '"Later then." Skyler\'s smile doesn\'t waver.', speakerId: 'skyler', emotion: 'seductive' },
    { text: 'They stay close. Hovering. Waiting.' },
    { text: 'An hour later, they\'re still there. Same request, different words.' },
    { speakerId: 'inner-voice', text: 'Soft no didn\'t work. They\'re persistent. You\'ll need a hard boundary.', emotion: 'concerned' },
  ],
  isEnding: true,
  outcomeType: 'neutral',
  endingTitle: 'The Persistent One',
  endingSummary: 'You delayed but didn\'t refuse. They don\'t take hints. Next time, be clearer.',
};

export const mission6Scenes: Scene[] = [
  scene6a, scene6aFlatteredResult, scene6aObserveResult, scene6aEagerResult, scene6aSuspiciousResult,
  scene6bCharmSuspicious, scene6bSusOpenResult, scene6bSusGuardResult, scene6bSusDeflectResult, scene6bSusLeaveResult,
  scene6b, scene6bRecognizeResult, scene6bBuyInResult, scene6bDeflectResult, scene6bMatchResult,
  scene6c, scene6cDeclineResult, scene6cGoResult, scene6cCounterResult, scene6cLaterResult,
];

export const mission6Scenario: DatingScenario = {
  id: MISSION_ID,
  levelId: 'social-scene',
  missionNumber: 6,
  title: missionMetadata.title,
  tagline: 'Learn to spot the operators.',
  description: missionMetadata.objective,
  objective: missionMetadata.objective,
  tier: missionMetadata.tier,
  estimatedMinutes: missionMetadata.estimatedMinutes,
  difficulty: missionMetadata.difficulty,
  characters,
  scenes: mission6Scenes,
  rewards,
  startSceneId: 'scene-6a-approach',
};

export default mission6Scenario;
