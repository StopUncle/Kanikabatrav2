// Mission 14: The Ex-Encounter - Stub file
import type { Scene } from '../../../../types';
import type { DatingScenario, MissionRewards } from '../../types';
import { characters } from '../metadata';

export const MISSION_ID = 'mission-14-ex-encounter';
export const rewards: MissionRewards = { power: 35, mask: 30, vision: 25, unlocks: 'mission-15-final-choice' };

const scene14a: Scene = { id: 'scene-14a-appears', backgroundId: 'restaurant', dialog: [{ text: '[Mission 14A: The Ex Appears - to be written]' }], choices: [
  { id: 'choice-14a-1', text: 'Handle gracefully', nextSceneId: 'scene-14a-result', isOptimal: true, xpBonus: 15, feedback: 'OPTIMAL' },
  { id: 'choice-14a-2', text: 'Ignore completely', nextSceneId: 'scene-14a-result', xpBonus: 10, feedback: '[Feedback]' },
  { id: 'choice-14a-3', text: 'Confront', nextSceneId: 'scene-14a-result', xpBonus: 5, feedback: '[Feedback]' },
  { id: 'choice-14a-4', text: 'Flee', nextSceneId: 'scene-14a-result', xpBonus: 0, feedback: 'TRAP' },
]};
const scene14aResult: Scene = { id: 'scene-14a-result', backgroundId: 'restaurant', dialog: [{ text: '[Result]' }], nextSceneId: 'scene-14b-compare' };

const scene14b: Scene = { id: 'scene-14b-compare', backgroundId: 'restaurant', dialog: [{ text: '[Mission 14B: The Comparison - to be written]' }], choices: [
  { id: 'choice-14b-1', text: 'Rise above', nextSceneId: 'scene-14b-result', isOptimal: true, xpBonus: 15, feedback: 'OPTIMAL' },
  { id: 'choice-14b-2', text: 'Compete', nextSceneId: 'scene-14b-result', xpBonus: 8, feedback: '[Feedback]' },
  { id: 'choice-14b-3', text: 'Dismiss', nextSceneId: 'scene-14b-result', xpBonus: 10, feedback: '[Feedback]' },
  { id: 'choice-14b-4', text: 'Engage', nextSceneId: 'scene-14b-result', xpBonus: 0, feedback: 'TRAP' },
]};
const scene14bResult: Scene = { id: 'scene-14b-result', backgroundId: 'restaurant', dialog: [{ text: '[Result]' }], nextSceneId: 'scene-14c-dismiss' };

const scene14c: Scene = { id: 'scene-14c-dismiss', backgroundId: 'restaurant', dialog: [{ text: '[Mission 14C: The Dismissal - to be written]' }], choices: [
  { id: 'choice-14c-1', text: 'Cold dismissal', nextSceneId: 'scene-14c-ending', isOptimal: true, xpBonus: 15, feedback: 'OPTIMAL' },
  { id: 'choice-14c-2', text: 'Polite exit', nextSceneId: 'scene-14c-ending', xpBonus: 10, feedback: '[Feedback]' },
  { id: 'choice-14c-3', text: 'Warm closure', nextSceneId: 'scene-14c-ending', xpBonus: 5, feedback: '[Feedback]' },
  { id: 'choice-14c-4', text: 'Dramatic exit', nextSceneId: 'scene-14c-ending', xpBonus: 0, feedback: 'TRAP' },
]};
const scene14cEnding: Scene = { id: 'scene-14c-ending', backgroundId: 'restaurant', dialog: [{ text: '[Ending]' }], isEnding: true, outcomeType: 'good', endingTitle: 'The Clean Break', endingSummary: 'Past handled. Future clear. Mission complete.' };

export const mission14Scenes: Scene[] = [scene14a, scene14aResult, scene14b, scene14bResult, scene14c, scene14cEnding];
export const mission14Scenario: DatingScenario = { id: MISSION_ID, levelId: 'gala', missionNumber: 14, title: 'The Ex-Encounter', tagline: 'The past doesn\'t define you.', description: 'Handle triangulation and demonstrate superiority.', objective: 'Handle triangulation and demonstrate superiority.', tier: 'premium', estimatedMinutes: 12, difficulty: 'advanced', characters, scenes: mission14Scenes, rewards, startSceneId: 'scene-14a-appears' };
export default mission14Scenario;
