// SECRET LEVEL 5: The Throne - THE TRUE ENDING
import type { Scene } from '../../../../types';
import type { DatingScenario, MissionRewards } from '../../types';
import { characters } from '../metadata';

export const MISSION_ID = 'secret-throne';
export const rewards: MissionRewards = { power: 100, mask: 80, vision: 70, unlocks: 'ultimate-ending' };

const sceneS5a: Scene = { id: 'scene-s5a-revelation', backgroundId: 'restaurant', dialog: [{ text: '[Secret 5A: The Revelation - The entire game was a test]', speakerId: 'inner-voice', emotion: 'neutral' }], choices: [
  { id: 'choice-s5a-1', text: '"I knew."', nextSceneId: 'scene-s5a-result', isOptimal: true, xpBonus: 25, feedback: 'OPTIMAL' },
  { id: 'choice-s5a-2', text: '"Tell me everything."', nextSceneId: 'scene-s5a-result', xpBonus: 15, feedback: '[Feedback]' },
  { id: 'choice-s5a-3', text: '"What now?"', nextSceneId: 'scene-s5a-result', xpBonus: 10, feedback: '[Feedback]' },
  { id: 'choice-s5a-4', text: 'Shocked', nextSceneId: 'scene-s5a-result', xpBonus: 0, feedback: 'TRAP' },
]};
const sceneS5aResult: Scene = { id: 'scene-s5a-result', backgroundId: 'restaurant', dialog: [{ text: '[Result]' }], nextSceneId: 'scene-s5b-ultimate' };

const sceneS5b: Scene = { id: 'scene-s5b-ultimate', backgroundId: 'restaurant', dialog: [{ text: '[Secret 5B: The Ultimate Position Offered]', speakerId: 'inner-voice', emotion: 'neutral' }], choices: [
  { id: 'choice-s5b-1', text: 'Accept the throne', nextSceneId: 'scene-s5b-result', isOptimal: true, xpBonus: 30, feedback: 'OPTIMAL' },
  { id: 'choice-s5b-2', text: 'Negotiate', nextSceneId: 'scene-s5b-result', xpBonus: 20, feedback: '[Feedback]' },
  { id: 'choice-s5b-3', text: 'Question it', nextSceneId: 'scene-s5b-result', xpBonus: 10, feedback: '[Feedback]' },
  { id: 'choice-s5b-4', text: 'Decline', nextSceneId: 'scene-s5b-result', xpBonus: 5, feedback: '[Feedback]' },
]};
const sceneS5bResult: Scene = { id: 'scene-s5b-result', backgroundId: 'restaurant', dialog: [{ text: '[Result]' }], nextSceneId: 'scene-s5c-ascend' };

const sceneS5c: Scene = { id: 'scene-s5c-ascend', backgroundId: 'restaurant', dialog: [{ text: '[Secret 5C: The Final Ascension - What did you become?]', speakerId: 'inner-voice', emotion: 'neutral' }], choices: [
  { id: 'choice-s5c-1', text: '"Everything I needed to be."', nextSceneId: 'scene-s5c-ultimate', isOptimal: true, xpBonus: 50, feedback: 'OPTIMAL: You\'ve achieved mastery.' },
  { id: 'choice-s5c-2', text: '"A winner."', nextSceneId: 'scene-s5c-ultimate', xpBonus: 30, feedback: '[Feedback]' },
  { id: 'choice-s5c-3', text: '"I don\'t know yet."', nextSceneId: 'scene-s5c-ultimate', xpBonus: 20, feedback: '[Feedback]' },
  { id: 'choice-s5c-4', text: '"A monster."', nextSceneId: 'scene-s5c-ultimate', xpBonus: 10, feedback: '[Feedback]' },
]};

const sceneS5cUltimate: Scene = {
  id: 'scene-s5c-ultimate',
  backgroundId: 'restaurant',
  dialog: [{ text: '[THE ULTIMATE ENDING: You\'ve mastered the game. You\'ve become what you set out to be. The world is yours.]' }],
  isEnding: true,
  outcomeType: 'good',
  endingTitle: 'THE THRONE - ULTIMATE ENDING',
  endingSummary: 'You\'ve won everything. Power, status, control. You started with nothing on a university campus. Now the world bends to your will. The game is complete. You are the apex predator. +100 Power. ULTIMATE VICTORY.',
};

export const secretScenes: Scene[] = [sceneS5a, sceneS5aResult, sceneS5b, sceneS5bResult, sceneS5c, sceneS5cUltimate];
export const secretScenario: DatingScenario = {
  id: MISSION_ID,
  levelId: 'private-island',
  missionNumber: 25,
  title: 'The Throne',
  tagline: 'The ultimate ending.',
  description: 'Discover the truth and claim ultimate power.',
  objective: 'Discover the truth and claim ultimate power.',
  tier: 'vip',
  estimatedMinutes: 15,
  difficulty: 'advanced',
  characters,
  scenes: secretScenes,
  rewards,
  startSceneId: 'scene-s5a-revelation',
  isSecret: true,
  secretUnlockCondition: 'OPTIMAL at Mission 24 Scenes 24B + 24C',
};
export default secretScenario;
