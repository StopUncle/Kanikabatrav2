// Mission 5: The Love Triangle
// Objective: Manage multiple targets and establish yourself as the apex predator.
import type { Scene } from '../../../../types';
import type { DatingScenario, MissionRewards } from '../../types';
import { characters } from '../metadata';

export const MISSION_ID = 'mission-5-love-triangle';

export const missionMetadata = {
  id: MISSION_ID,
  number: 5,
  title: 'The Love Triangle',
  objective: 'Manage multiple targets and establish yourself as the apex predator in your social circle.',
  tier: 'free' as const,
  estimatedMinutes: 15,
  difficulty: 'intermediate' as const,
};

export const rewards: MissionRewards = {
  power: 35,
  mask: 30,
  vision: 25,
  unlocks: 'level-2-social-scene',
};

// Scene 5A: The Rival Appears
const scene5a: Scene = {
  id: 'scene-5a-rival-appears',
  backgroundId: 'bar',
  dialog: [
    {
      text: 'A few weeks later. You\'re at another party. Morgan is there, but so is someone else who\'s clearly interested in them.',
    },
    {
      text: 'You notice a new person (Sam) talking to Morgan. They\'re charming, attractive, and clearly trying to impress them. Morgan seems interested.',
    },
    {
      text: '"You should come to this exclusive event I\'m throwing next weekend. It\'s going to be amazing."',
      speakerId: 'sam',
      emotion: 'smirking',
    },
    {
      speakerId: 'inner-voice',
      text: 'Competition. This is where you prove you\'re the apex predator.',
      emotion: 'neutral',
    },
  ],
  choices: [
    {
      id: 'choice-5a-optimal',
      text: 'Notice the interaction but don\'t react. Continue talking to other people at the party.',
      nextSceneId: 'scene-5a-optimal-result',
      isOptimal: true,
      xpBonus: 20,
      feedback: 'OPTIMAL: Your indifference made you more valuable. Morgan chose you over Sam.',
    },
    {
      id: 'choice-5a-close',
      text: 'Approach Morgan and Sam casually. "Hey, what\'s going on? Sounds like there\'s an event happening?"',
      nextSceneId: 'scene-5a-close-result',
      xpBonus: 10,
      feedback: 'CLOSE: You joined the conversation without being jealous. You\'re now part of the dynamic.',
    },
    {
      id: 'choice-5a-subtle',
      text: 'Notice the interaction but don\'t do anything. Wait to see what happens.',
      nextSceneId: 'scene-5a-subtle-result',
      xpBonus: 5,
      feedback: 'You didn\'t compete. Morgan is now with Sam. You may have lost them.',
    },
    {
      id: 'choice-5a-trap',
      text: 'Immediately approach Morgan and pull them aside. "Hey, I thought we had plans this weekend?"',
      nextSceneId: 'scene-5a-trap-result',
      xpBonus: 0,
      feedback: 'TRAP: You revealed your jealousy and insecurity. Morgan sees you as possessive and needy.',
    },
  ],
};

// Scene 5A Results
const scene5aOptimalResult: Scene = {
  id: 'scene-5a-optimal-result',
  backgroundId: 'bar',
  dialog: [
    {
      text: 'You notice Sam and Morgan, but you don\'t react. You continue your own conversation, relaxed and engaged.',
    },
    {
      text: 'Later, Morgan approaches you.',
    },
    {
      text: '"Hey, I\'ve been looking for you. That guy was kind of annoying. I\'d rather hang out with you."',
      speakerId: 'morgan',
      emotion: 'happy',
    },
    {
      text: 'Your indifference made you more valuable. Morgan chose you over Sam.',
    },
  ],
  nextSceneId: 'scene-5b-jealousy-play',
};

const scene5aCloseResult: Scene = {
  id: 'scene-5a-close-result',
  backgroundId: 'bar',
  dialog: [
    {
      text: 'You approach casually, joining the conversation.',
    },
    {
      text: '"Yeah, I\'m throwing a party next weekend. You should come too."',
      speakerId: 'sam',
      emotion: 'neutral',
    },
    {
      text: '"Yeah, you should definitely come."',
      speakerId: 'morgan',
      emotion: 'happy',
    },
    {
      text: 'You joined without showing jealousy. You\'re now part of the dynamic.',
    },
  ],
  nextSceneId: 'scene-5b-jealousy-play',
};

const scene5aSubtleResult: Scene = {
  id: 'scene-5a-subtle-result',
  backgroundId: 'bar',
  dialog: [
    {
      text: 'You notice. You wait. You do nothing.',
    },
    {
      text: 'Later, Morgan approaches you.',
    },
    {
      text: '"Hey, I\'m going to that event next weekend. Want to come?"',
      speakerId: 'morgan',
      emotion: 'neutral',
    },
    {
      text: 'You didn\'t compete. Sam made progress. You\'re now playing catch-up.',
    },
  ],
  nextSceneId: 'scene-5b-jealousy-play',
};

const scene5aTrapResult: Scene = {
  id: 'scene-5a-trap-result',
  backgroundId: 'bar',
  dialog: [
    {
      text: 'You immediately approach and pull Morgan aside.',
    },
    {
      text: '"We didn\'t make specific plans. And you\'re being kind of clingy right now."',
      speakerId: 'morgan',
      emotion: 'cold',
    },
    {
      text: 'You revealed your jealousy. Morgan sees you as possessive. Major damage done.',
    },
  ],
  nextSceneId: 'scene-5b-jealousy-play',
};

// Scene 5B: The Jealousy Play (KEY SCENE FOR SECRET UNLOCK)
const scene5b: Scene = {
  id: 'scene-5b-jealousy-play',
  backgroundId: 'bar',
  dialog: [
    {
      text: 'Morgan is now clearly interested in both you and Sam. They\'re testing you to see how you react.',
    },
    {
      text: '"So, Sam invited me to that event, but you\'re also here. I\'m not sure what to do. What do you think?"',
      speakerId: 'morgan',
      emotion: 'neutral',
    },
    {
      speakerId: 'inner-voice',
      text: 'They\'re testing your frame. Don\'t defend—make them choose.',
      emotion: 'neutral',
    },
  ],
  choices: [
    {
      id: 'choice-5b-optimal',
      text: '"You know what? You should do what feels right. But I\'m going to be doing my own thing this weekend. If you want to join me, you know where to find me."',
      nextSceneId: 'scene-5b-optimal-result',
      isOptimal: true,
      xpBonus: 30,
      feedback: 'OPTIMAL: You flipped the frame. Now Morgan is pursuing you. (Unlocks secret path)',
      tactic: 'frame_flip',
    },
    {
      id: 'choice-5b-close',
      text: '"I like you, and I\'d like to spend more time with you. But I\'m not going to compete for your attention. If you want to go with them, that\'s your choice."',
      nextSceneId: 'scene-5b-close-result',
      xpBonus: 15,
      feedback: 'CLOSE: You expressed your interest without being needy or demanding. Morgan chose you.',
    },
    {
      id: 'choice-5b-subtle',
      text: '"I think you should do what makes you happy. If you want to go to that event, go."',
      nextSceneId: 'scene-5b-subtle-result',
      xpBonus: 5,
      feedback: 'You were too passive. Morgan is now uncertain about your feelings.',
    },
    {
      id: 'choice-5b-trap',
      text: '"Please don\'t go with them. I really like you and I want to spend time with you. You mean a lot to me."',
      nextSceneId: 'scene-5b-trap-result',
      xpBonus: 0,
      feedback: 'TRAP: You pleaded for their attention. Morgan sees you as weak and needy.',
    },
  ],
};

// Scene 5B Results
const scene5bOptimalResult: Scene = {
  id: 'scene-5b-optimal-result',
  backgroundId: 'bar',
  dialog: [
    {
      text: 'Morgan\'s eyes widen. Intrigued and impressed.',
    },
    {
      text: '"Wait, what are you doing? I want to come with you."',
      speakerId: 'morgan',
      emotion: 'happy',
    },
    {
      text: '"I\'ll let you know. But first, you need to figure out what you actually want."',
    },
    {
      text: 'You flipped the frame. Now Morgan is pursuing you, and you\'re the one with the power.',
    },
  ],
  nextSceneId: 'scene-5c-final-choice',
};

const scene5bCloseResult: Scene = {
  id: 'scene-5b-close-result',
  backgroundId: 'bar',
  dialog: [
    {
      text: 'Morgan looks at you with appreciation.',
    },
    {
      text: '"I appreciate that. I think I want to spend time with you instead."',
      speakerId: 'morgan',
      emotion: 'happy',
    },
    {
      text: 'You expressed interest without being needy. Morgan chose you.',
    },
  ],
  nextSceneId: 'scene-5c-final-choice',
};

const scene5bSubtleResult: Scene = {
  id: 'scene-5b-subtle-result',
  backgroundId: 'bar',
  dialog: [
    {
      text: 'Morgan looks confused.',
    },
    {
      text: '"But what about us?"',
      speakerId: 'morgan',
      emotion: 'neutral',
    },
    {
      text: '"We can figure it out."',
    },
    {
      text: 'You were too passive. Morgan is uncertain about where they stand with you.',
    },
  ],
  nextSceneId: 'scene-5c-final-choice',
};

const scene5bTrapResult: Scene = {
  id: 'scene-5b-trap-result',
  backgroundId: 'bar',
  dialog: [
    {
      text: 'Morgan takes a step back, uncomfortable.',
    },
    {
      text: '"I... I need some space. This is getting too intense."',
      speakerId: 'morgan',
      emotion: 'neutral',
    },
    {
      text: 'You pleaded. They see you as weak. The power dynamic has shifted against you.',
    },
  ],
  nextSceneId: 'scene-5c-final-choice',
};

// Scene 5C: The Final Choice (KEY SCENE FOR SECRET UNLOCK)
const scene5c: Scene = {
  id: 'scene-5c-final-choice',
  backgroundId: 'bar',
  dialog: [
    {
      text: 'Morgan has decided to pursue you instead of Sam. But now you have a choice: commit to them, play them, or discard them.',
    },
    {
      text: '"I\'ve decided. I want to be with you. I\'m not interested in anyone else."',
      speakerId: 'morgan',
      emotion: 'happy',
    },
    {
      speakerId: 'inner-voice',
      text: 'This is the final test. Do you have the ruthlessness to make the strategic choice?',
      emotion: 'neutral',
    },
  ],
  choices: [
    {
      id: 'choice-5c-optimal',
      text: '"That\'s great. But I want to be honest with you—I\'m not looking for anything serious right now. I like you, but I also like my freedom. Can you handle that?"',
      nextSceneId: 'scene-5c-optimal-result',
      isOptimal: true,
      xpBonus: 35,
      feedback: 'OPTIMAL: You established yourself as the predator. They\'re yours, but uncertain and seeking your validation. (Unlocks SECRET LEVEL)',
      tactic: 'abundance',
    },
    {
      id: 'choice-5c-close',
      text: '"I\'m glad. I like you a lot. I want to keep getting to know you."',
      nextSceneId: 'scene-5c-close-result',
      xpBonus: 20,
      feedback: 'CLOSE: You reciprocated genuinely. They\'re now deeply invested in you.',
    },
    {
      id: 'choice-5c-subtle',
      text: '"That\'s cool. I like you too. Let\'s see where this goes."',
      nextSceneId: 'scene-5c-subtle-result',
      xpBonus: 5,
      feedback: 'You accepted their commitment but didn\'t reciprocate fully. They\'re satisfied but not deeply invested.',
    },
    {
      id: 'choice-5c-trap',
      text: '"Really? Oh my god, I\'m so happy. I want to be with you too. I think I\'m falling in love with you."',
      nextSceneId: 'scene-5c-trap-result',
      xpBonus: 0,
      feedback: 'TRAP: You were too eager and emotional. They\'re now pulling back.',
    },
  ],
};

// Scene 5C Results - Endings
const scene5cOptimalResult: Scene = {
  id: 'scene-5c-optimal-result',
  backgroundId: 'bar',
  dialog: [
    {
      text: 'Morgan\'s face shows conflict—but also intrigue.',
    },
    {
      text: '"I... I think so. Yeah, I can handle that."',
      speakerId: 'morgan',
      emotion: 'neutral',
    },
    {
      text: 'You established yourself as the predator. They\'re yours, but they\'re also uncertain and will work to keep your attention.',
    },
  ],
  isEnding: true,
  outcomeType: 'good',
  endingTitle: 'The Apex Predator',
  endingSummary: 'You kept your freedom while securing their commitment. They\'ll work to prove themselves to you. University level complete. SECRET LEVEL UNLOCKED: The Predator\'s Circle. You\'re operating at a different level now.',
};

const scene5cCloseResult: Scene = {
  id: 'scene-5c-close-result',
  backgroundId: 'bar',
  dialog: [
    {
      text: 'Morgan smiles, genuinely happy.',
    },
    {
      text: '"Me too. I think this is the beginning of something real."',
      speakerId: 'morgan',
      emotion: 'happy',
    },
    {
      text: 'You reciprocated genuinely. They\'re now deeply invested in you.',
    },
  ],
  isEnding: true,
  outcomeType: 'good',
  endingTitle: 'The Real Thing',
  endingSummary: 'You chose genuine connection over games. Morgan is yours, and it\'s mutual. University level complete. Invitation to the next level: The Social Scene.',
};

const scene5cSubtleResult: Scene = {
  id: 'scene-5c-subtle-result',
  backgroundId: 'bar',
  dialog: [
    {
      text: 'Morgan nods, satisfied.',
    },
    {
      text: '"Yeah, I\'d like that."',
      speakerId: 'morgan',
      emotion: 'neutral',
    },
    {
      text: 'You accepted without fully committing. They\'re satisfied, but not deeply invested.',
    },
  ],
  isEnding: true,
  outcomeType: 'neutral',
  endingTitle: 'The Casual Connection',
  endingSummary: 'You kept it casual. Morgan is interested but not locked in. Could go either way from here. University level complete. Invitation to the next level: The Social Scene.',
};

const scene5cTrapResult: Scene = {
  id: 'scene-5c-trap-result',
  backgroundId: 'bar',
  dialog: [
    {
      text: 'Morgan\'s face shifts. Overwhelmed.',
    },
    {
      text: '"Wow, that\'s... a lot. I need to think about this."',
      speakerId: 'morgan',
      emotion: 'neutral',
    },
    {
      text: 'You came on too strong. They\'re now reconsidering everything.',
    },
  ],
  isEnding: true,
  outcomeType: 'bad',
  endingTitle: 'The Overshoot',
  endingSummary: 'You were too eager, too emotional, too fast. Morgan is pulling back. You\'ll need to recover from this. University level complete. Invitation to the next level: The Social Scene.',
};

export const mission5Scenes: Scene[] = [
  scene5a,
  scene5aOptimalResult,
  scene5aCloseResult,
  scene5aSubtleResult,
  scene5aTrapResult,
  scene5b,
  scene5bOptimalResult,
  scene5bCloseResult,
  scene5bSubtleResult,
  scene5bTrapResult,
  scene5c,
  scene5cOptimalResult,
  scene5cCloseResult,
  scene5cSubtleResult,
  scene5cTrapResult,
];

export const mission5Scenario: DatingScenario = {
  id: MISSION_ID,
  levelId: 'university',
  missionNumber: 5,
  title: missionMetadata.title,
  tagline: 'Competition reveals character.',
  description: missionMetadata.objective,
  objective: missionMetadata.objective,
  tier: missionMetadata.tier,
  estimatedMinutes: missionMetadata.estimatedMinutes,
  difficulty: missionMetadata.difficulty,
  characters,
  scenes: mission5Scenes,
  rewards,
  startSceneId: 'scene-5a-rival-appears',
};

export default mission5Scenario;
