// SECRET LEVEL 4: The Infiltration
import type { Scene } from '../../../../types';
import type { DatingScenario, MissionRewards } from '../../types';
import { characters } from '../metadata';

export const MISSION_ID = 'secret-infiltration';
export const rewards: MissionRewards = { power: 80, mask: 60, vision: 55, unlocks: 'level-5-private-island-advantage' };

const sceneS4a: Scene = { id: 'scene-s4a-hidden', backgroundId: 'office', dialog: [{ text: '[Secret 4A: The Hidden Agenda - Island has deeper purpose]', speakerId: 'inner-voice', emotion: 'neutral' }], choices: [
  { id: 'choice-s4a-1', text: 'Investigate', nextSceneId: 'scene-s4a-result', isOptimal: true, xpBonus: 20, feedback: 'OPTIMAL' },
  { id: 'choice-s4a-2', text: 'Stay surface', nextSceneId: 'scene-s4a-result', xpBonus: 10, feedback: '[Feedback]' },
  { id: 'choice-s4a-3', text: 'Play along', nextSceneId: 'scene-s4a-result', xpBonus: 8, feedback: '[Feedback]' },
  { id: 'choice-s4a-4', text: 'Confront', nextSceneId: 'scene-s4a-result', xpBonus: 0, feedback: 'TRAP' },
]};
const sceneS4aResult: Scene = { id: 'scene-s4a-result', backgroundId: 'office', dialog: [{ text: '[Result]' }], nextSceneId: 'scene-s4b-underground' };

const sceneS4b: Scene = { id: 'scene-s4b-underground', backgroundId: 'office', dialog: [{ text: '[Secret 4B: The Underground Network of Global Elites]', speakerId: 'inner-voice', emotion: 'neutral' }], choices: [
  { id: 'choice-s4b-1', text: 'Seek membership', nextSceneId: 'scene-s4b-result', isOptimal: true, xpBonus: 20, feedback: 'OPTIMAL' },
  { id: 'choice-s4b-2', text: 'Observe', nextSceneId: 'scene-s4b-result', xpBonus: 10, feedback: '[Feedback]' },
  { id: 'choice-s4b-3', text: 'Stay distant', nextSceneId: 'scene-s4b-result', xpBonus: 8, feedback: '[Feedback]' },
  { id: 'choice-s4b-4', text: 'Expose', nextSceneId: 'scene-s4b-result', xpBonus: 0, feedback: 'TRAP' },
]};
const sceneS4bResult: Scene = { id: 'scene-s4b-result', backgroundId: 'office', dialog: [{ text: '[Result]' }], nextSceneId: 'scene-s4c-initiation' };

const sceneS4c: Scene = { id: 'scene-s4c-initiation', backgroundId: 'office', dialog: [{ text: '[Secret 4C: The Network Initiation]', speakerId: 'inner-voice', emotion: 'neutral' }], choices: [
  { id: 'choice-s4c-1', text: 'Negotiate entry', nextSceneId: 'scene-s4c-ending', isOptimal: true, xpBonus: 25, feedback: 'OPTIMAL' },
  { id: 'choice-s4c-2', text: 'Accept terms', nextSceneId: 'scene-s4c-ending', xpBonus: 15, feedback: '[Feedback]' },
  { id: 'choice-s4c-3', text: 'Decline', nextSceneId: 'scene-s4c-ending', xpBonus: 10, feedback: '[Feedback]' },
  { id: 'choice-s4c-4', text: 'Demand more', nextSceneId: 'scene-s4c-ending', xpBonus: 0, feedback: 'TRAP' },
]};
const sceneS4cEnding: Scene = { id: 'scene-s4c-ending', backgroundId: 'office', dialog: [{ text: '[Ending]' }], isEnding: true, outcomeType: 'good', endingTitle: 'The Elite Network', endingSummary: 'You\'ve joined the real power structure. +80 Power. Premium Island access unlocked.' };

export const secretScenes: Scene[] = [sceneS4a, sceneS4aResult, sceneS4b, sceneS4bResult, sceneS4c, sceneS4cEnding];
export const secretScenario: DatingScenario = { id: MISSION_ID, levelId: 'escalation', missionNumber: 20, title: 'The Infiltration', tagline: 'Discover the real game.', description: 'Discover the island is a test within a test.', objective: 'Discover the island is a test within a test.', tier: 'vip', estimatedMinutes: 15, difficulty: 'advanced', characters, scenes: secretScenes, rewards, startSceneId: 'scene-s4a-hidden', isSecret: true, secretUnlockCondition: 'OPTIMAL at Mission 19 Scenes 19B + 19C' };
export default secretScenario;
