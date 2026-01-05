// Mission 13: The Power Play - Stub file
import type { Scene } from '../../../../types';
import type { DatingScenario, MissionRewards } from '../../types';
import { characters } from '../metadata';

export const MISSION_ID = 'mission-13-power-play';
export const rewards: MissionRewards = { power: 30, mask: 25, vision: 20, unlocks: 'mission-14-ex-encounter' };

const scene13a: Scene = { id: 'scene-13a-rival', backgroundId: 'restaurant', dialog: [{ text: '[Mission 13A: The Rival Appears - to be written]' }], choices: [
  { id: 'choice-13a-1', text: 'Ignore', nextSceneId: 'scene-13a-result', isOptimal: true, xpBonus: 15, feedback: 'OPTIMAL' },
  { id: 'choice-13a-2', text: 'Compete', nextSceneId: 'scene-13a-result', xpBonus: 8, feedback: '[Feedback]' },
  { id: 'choice-13a-3', text: 'Cooperate', nextSceneId: 'scene-13a-result', xpBonus: 10, feedback: '[Feedback]' },
  { id: 'choice-13a-4', text: 'Discard', nextSceneId: 'scene-13a-result', xpBonus: 5, feedback: '[Feedback]' },
]};
const scene13aResult: Scene = { id: 'scene-13a-result', backgroundId: 'restaurant', dialog: [{ text: '[Result]' }], nextSceneId: 'scene-13b-triangle' };

const scene13b: Scene = { id: 'scene-13b-triangle', backgroundId: 'restaurant', dialog: [{ text: '[Mission 13B: Triangulation - to be written]' }], choices: [
  { id: 'choice-13b-1', text: 'Reassure', nextSceneId: 'scene-13b-result', xpBonus: 0, feedback: 'TRAP' },
  { id: 'choice-13b-2', text: 'Deny', nextSceneId: 'scene-13b-result', xpBonus: 8, feedback: '[Feedback]' },
  { id: 'choice-13b-3', text: 'Create competition', nextSceneId: 'scene-13b-result', isOptimal: true, xpBonus: 15, feedback: 'OPTIMAL' },
  { id: 'choice-13b-4', text: 'Be indifferent', nextSceneId: 'scene-13b-result', xpBonus: 10, feedback: '[Feedback]' },
]};
const scene13bResult: Scene = { id: 'scene-13b-result', backgroundId: 'restaurant', dialog: [{ text: '[Result]' }], nextSceneId: 'scene-13c-shift' };

const scene13c: Scene = { id: 'scene-13c-shift', backgroundId: 'restaurant', dialog: [{ text: '[Mission 13C: Power Shift - to be written]' }], choices: [
  { id: 'choice-13c-1', text: 'Seize control', nextSceneId: 'scene-13c-ending', isOptimal: true, xpBonus: 15, feedback: 'OPTIMAL' },
  { id: 'choice-13c-2', text: 'Share control', nextSceneId: 'scene-13c-ending', xpBonus: 8, feedback: '[Feedback]' },
  { id: 'choice-13c-3', text: 'Yield control', nextSceneId: 'scene-13c-ending', xpBonus: 0, feedback: 'TRAP' },
  { id: 'choice-13c-4', text: 'Exit', nextSceneId: 'scene-13c-ending', xpBonus: 5, feedback: '[Feedback]' },
]};
const scene13cEnding: Scene = { id: 'scene-13c-ending', backgroundId: 'restaurant', dialog: [{ text: '[Ending]' }], isEnding: true, outcomeType: 'good', endingTitle: 'Power Established', endingSummary: 'You\'ve become the apex. Mission complete.' };

export const mission13Scenes: Scene[] = [scene13a, scene13aResult, scene13b, scene13bResult, scene13c, scene13cEnding];
export const mission13Scenario: DatingScenario = { id: MISSION_ID, levelId: 'gala', missionNumber: 13, title: 'The Power Play', tagline: 'Become the apex predator.', description: 'Create competition and establish yourself.', objective: 'Create competition and establish yourself.', tier: 'premium', estimatedMinutes: 12, difficulty: 'advanced', characters, scenes: mission13Scenes, rewards, startSceneId: 'scene-13a-rival' };
export default mission13Scenario;
