import type { ForkScene } from '../../../types';

/**
 * Club Path - Mission Endings
 * Results of the Tyler encounter
 */
export const clubEndingScenes: ForkScene[] = [
  // FAILED
  {
    id: 'club-mission-failed',
    backgroundId: 'bar',
    sceneType: 'dialogue',
    pathId: 'club',
    mood: 'cold',
    dialog: [
      {
        text: 'The night ends. You leave without Tyler\'s number. Without VIP access. Without connections.',
      },
      {
        text: 'Blake pats your shoulder. "It happens. Tyler\'s tough."',
        speakerId: 'blake',
        emotion: 'concerned',
      },
      {
        text: 'Failed. But the lesson? HPD types need to feel central. You didn\'t give that.',
        speakerId: 'inner-voice',
        emotion: 'neutral',
      },
    ],
    nextSceneId: 'app-matches-intro',
    chapter: { name: 'Mission Complete: The Club', index: 1, total: 5 },
  },
  // PARTIAL
  {
    id: 'club-mission-partial',
    backgroundId: 'bar',
    sceneType: 'dialogue',
    pathId: 'club',
    mood: 'party',
    dialog: [
      {
        text: 'The night winds down. You got Tyler\'s number, but no real connection.',
      },
      {
        text: 'He might remember you. Might not. You\'re on the periphery.',
      },
      {
        text: 'Progress. But not breakthrough.',
        speakerId: 'inner-voice',
        emotion: 'neutral',
      },
    ],
    nextSceneId: 'app-matches-intro',
    chapter: { name: 'Mission Complete: The Club', index: 1, total: 5 },
  },
  // SUCCESS - BASIC
  {
    id: 'club-mission-success-basic',
    backgroundId: 'bar',
    sceneType: 'dialogue',
    pathId: 'club',
    mood: 'party',
    dialog: [
      {
        text: 'Tyler\'s number. An invite to "something next week."',
      },
      {
        text: 'You\'re in the network now. Entry level, but in.',
      },
      {
        text: 'Success. Now let\'s see what else the social scene has.',
        speakerId: 'inner-voice',
        emotion: 'happy',
      },
    ],
    nextSceneId: 'app-matches-intro',
    chapter: { name: 'Mission Complete: The Club', index: 1, total: 5 },
  },
  // SUCCESS - GOOD
  {
    id: 'club-mission-success-good',
    backgroundId: 'bar',
    sceneType: 'dialogue',
    pathId: 'club',
    mood: 'party',
    dialog: [
      {
        text: 'Private after-party invitation. Tyler\'s endorsement to his circle.',
      },
      {
        text: 'You learned to speak his language: make him the center, but don\'t beg.',
      },
      {
        text: 'HPD navigation: successful. Next challenge.',
        speakerId: 'inner-voice',
        emotion: 'knowing',
      },
    ],
    nextSceneId: 'app-matches-intro',
    chapter: { name: 'Mission Complete: The Club', index: 1, total: 5 },
  },
  // SUCCESS - STRONG
  {
    id: 'club-mission-success-strong',
    backgroundId: 'bar',
    sceneType: 'dialogue',
    pathId: 'club',
    mood: 'party',
    dialog: [
      {
        text: 'VIP permanent access. Tyler\'s public endorsement. Numbers from everyone who matters.',
      },
      {
        text: '"You\'re different. I want you at everything." - Tyler',
        speakerId: 'tyler',
        emotion: 'happy',
      },
      {
        text: 'You understand the game now. Give validation, but never chase.',
        speakerId: 'inner-voice',
        emotion: 'knowing',
      },
    ],
    nextSceneId: 'app-matches-intro',
    chapter: { name: 'Mission Complete: The Club', index: 1, total: 5 },
  },
  // SUCCESS - EXCELLENT
  {
    id: 'club-mission-success-excellent',
    backgroundId: 'bar',
    sceneType: 'dialogue',
    pathId: 'club',
    mood: 'romantic',
    dialog: [
      {
        text: 'Tyler shares something real. The masks dropped, even briefly.',
      },
      {
        text: '"Most people see the show. You saw... me."',
        speakerId: 'tyler',
        emotion: 'sad',
      },
      {
        text: 'You didn\'t just navigate his HPD. You connected past it.',
        speakerId: 'inner-voice',
        emotion: 'knowing',
      },
      {
        text: 'Ally acquired. The inner circle opens.',
      },
    ],
    nextSceneId: 'app-matches-intro',
    chapter: { name: 'Mission Complete: The Club', index: 1, total: 5 },
  },
  // SUCCESS - PERFECT
  {
    id: 'club-mission-success-perfect',
    backgroundId: 'bar',
    sceneType: 'dialogue',
    pathId: 'club',
    mood: 'romantic',
    dialog: [
      {
        text: 'Tyler saves your number under a nickname. Something only he\'d use.',
      },
      {
        text: '"You know... nobody ever just sits with me. They always want something."',
        speakerId: 'tyler',
        emotion: 'sad',
      },
      {
        text: '"Thanks for just... being here."',
        speakerId: 'tyler',
        emotion: 'happy',
      },
      {
        text: 'The deepest validation you can give HPD: genuine presence.',
        speakerId: 'inner-voice',
        emotion: 'knowing',
      },
      {
        text: 'Secret path unlock: Tyler will vouch for you anywhere now.',
      },
    ],
    nextSceneId: 'app-matches-intro',
    chapter: { name: 'Mission Complete: The Club', index: 1, total: 5 },
  },
];
