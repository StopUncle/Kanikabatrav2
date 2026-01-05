// SECRET LEVEL 3: The Architect's Gambit
import type { Scene } from '../../../../types';
import type { DatingScenario, MissionRewards } from '../../types';
import { characters } from '../metadata';

export const MISSION_ID = 'secret-architects-gambit';
export const rewards: MissionRewards = { power: 70, mask: 50, vision: 45, unlocks: 'level-4-escalation-advantage' };

const sceneS3a: Scene = { id: 'scene-s3a-revelation', backgroundId: 'restaurant', dialog: [{ text: '[Secret 3A: The Revelation - Your mentor reveals the gala was a test]', speakerId: 'inner-voice', emotion: 'neutral' }], choices: [
  { id: 'choice-s3a-1', text: 'I knew', nextSceneId: 'scene-s3a-result', isOptimal: true, xpBonus: 20, feedback: 'OPTIMAL' },
  { id: 'choice-s3a-2', text: 'Tell me more', nextSceneId: 'scene-s3a-result', xpBonus: 10, feedback: '[Feedback]' },
  { id: 'choice-s3a-3', text: 'What\'s next', nextSceneId: 'scene-s3a-result', xpBonus: 8, feedback: '[Feedback]' },
  { id: 'choice-s3a-4', text: 'Confused', nextSceneId: 'scene-s3a-result', xpBonus: 0, feedback: 'TRAP' },
]};
const sceneS3aResult: Scene = { id: 'scene-s3a-result', backgroundId: 'restaurant', dialog: [{ text: '[Result]' }], nextSceneId: 'scene-s3b-inner' };

const sceneS3b: Scene = { id: 'scene-s3b-inner', backgroundId: 'restaurant', dialog: [{ text: '[Secret 3B: The Inner Circle - Meeting the real players]', speakerId: 'inner-voice', emotion: 'neutral' }], choices: [
  { id: 'choice-s3b-1', text: 'Assert value', nextSceneId: 'scene-s3b-result', isOptimal: true, xpBonus: 20, feedback: 'OPTIMAL' },
  { id: 'choice-s3b-2', text: 'Observe first', nextSceneId: 'scene-s3b-result', xpBonus: 10, feedback: '[Feedback]' },
  { id: 'choice-s3b-3', text: 'Be humble', nextSceneId: 'scene-s3b-result', xpBonus: 5, feedback: '[Feedback]' },
  { id: 'choice-s3b-4', text: 'Challenge them', nextSceneId: 'scene-s3b-result', xpBonus: 8, feedback: '[Feedback]' },
]};
const sceneS3bResult: Scene = { id: 'scene-s3b-result', backgroundId: 'restaurant', dialog: [{ text: '[Result]' }], nextSceneId: 'scene-s3c-offer' };

const sceneS3c: Scene = { id: 'scene-s3c-offer', backgroundId: 'restaurant', dialog: [{ text: '[Secret 3C: The Global Network Offer]', speakerId: 'inner-voice', emotion: 'neutral' }], choices: [
  { id: 'choice-s3c-1', text: 'Negotiate terms', nextSceneId: 'scene-s3c-ending', isOptimal: true, xpBonus: 25, feedback: 'OPTIMAL' },
  { id: 'choice-s3c-2', text: 'Accept fully', nextSceneId: 'scene-s3c-ending', xpBonus: 15, feedback: '[Feedback]' },
  { id: 'choice-s3c-3', text: 'Decline', nextSceneId: 'scene-s3c-ending', xpBonus: 10, feedback: '[Feedback]' },
  { id: 'choice-s3c-4', text: 'Hesitate', nextSceneId: 'scene-s3c-ending', xpBonus: 0, feedback: 'TRAP' },
]};
const sceneS3cEnding: Scene = { id: 'scene-s3c-ending', backgroundId: 'restaurant', dialog: [{ text: '[Ending]' }], isEnding: true, outcomeType: 'good', endingTitle: 'The Global Network', endingSummary: 'You\'ve joined the real elite. +70 Power. Level 4 with premium advantages.' };

export const secretScenes: Scene[] = [sceneS3a, sceneS3aResult, sceneS3b, sceneS3bResult, sceneS3c, sceneS3cEnding];
export const secretScenario: DatingScenario = { id: MISSION_ID, levelId: 'gala', missionNumber: 16, title: 'The Architect\'s Gambit', tagline: 'The real game begins.', description: 'Discover the gala was a test for something bigger.', objective: 'Discover the gala was a test for something bigger.', tier: 'vip', estimatedMinutes: 15, difficulty: 'advanced', characters, scenes: secretScenes, rewards, startSceneId: 'scene-s3a-revelation', isSecret: true, secretUnlockCondition: 'OPTIMAL at Mission 15 Scenes 15B + 15C' };
export default secretScenario;
