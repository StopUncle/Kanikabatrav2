// Mission 12: The First Encounter - Stub file
import type { Scene } from '../../../../types';
import type { DatingScenario, MissionRewards } from '../../types';
import { characters } from '../metadata';

export const MISSION_ID = 'mission-12-first-encounter';
export const rewards: MissionRewards = { power: 25, mask: 20, vision: 15, unlocks: 'mission-13-power-play' };

// Stub scenes - to be filled with full content
const scene12a: Scene = { id: 'scene-12a-approach', backgroundId: 'restaurant', dialog: [{ text: '[Mission 12A: Target Approach - to be written]' }], choices: [
  { id: 'choice-12a-direct', text: 'Direct approach', nextSceneId: 'scene-12a-result', xpBonus: 8, feedback: '[Feedback]' },
  { id: 'choice-12a-indirect', text: 'Indirect approach', nextSceneId: 'scene-12a-result', isOptimal: true, xpBonus: 15, feedback: 'OPTIMAL' },
  { id: 'choice-12a-wait', text: 'Wait for them', nextSceneId: 'scene-12a-result', xpBonus: 10, feedback: '[Feedback]' },
  { id: 'choice-12a-ignore', text: 'Ignore them', nextSceneId: 'scene-12a-result', xpBonus: 5, feedback: '[Feedback]' },
]};
const scene12aResult: Scene = { id: 'scene-12a-result', backgroundId: 'restaurant', dialog: [{ text: '[Result]' }], nextSceneId: 'scene-12b-frame' };

const scene12b: Scene = { id: 'scene-12b-frame', backgroundId: 'restaurant', dialog: [{ text: '[Mission 12B: Frame Test - to be written]' }], choices: [
  { id: 'choice-12b-hold', text: 'Hold frame', nextSceneId: 'scene-12b-result', isOptimal: true, xpBonus: 15, feedback: 'OPTIMAL' },
  { id: 'choice-12b-fold', text: 'Fold', nextSceneId: 'scene-12b-result', xpBonus: 0, feedback: 'TRAP' },
  { id: 'choice-12b-flip', text: 'Flip the frame', nextSceneId: 'scene-12b-result', xpBonus: 10, feedback: '[Feedback]' },
  { id: 'choice-12b-neutral', text: 'Stay neutral', nextSceneId: 'scene-12b-result', xpBonus: 8, feedback: '[Feedback]' },
]};
const scene12bResult: Scene = { id: 'scene-12b-result', backgroundId: 'restaurant', dialog: [{ text: '[Result]' }], nextSceneId: 'scene-12c-escalation' };

const scene12c: Scene = { id: 'scene-12c-escalation', backgroundId: 'restaurant', dialog: [{ text: '[Mission 12C: Escalation - to be written]' }], choices: [
  { id: 'choice-12c-push', text: 'Push forward', nextSceneId: 'scene-12c-ending', xpBonus: 10, feedback: '[Feedback]' },
  { id: 'choice-12c-pull', text: 'Pull back', nextSceneId: 'scene-12c-ending', isOptimal: true, xpBonus: 15, feedback: 'OPTIMAL' },
  { id: 'choice-12c-maintain', text: 'Maintain', nextSceneId: 'scene-12c-ending', xpBonus: 8, feedback: '[Feedback]' },
  { id: 'choice-12c-exit', text: 'Exit gracefully', nextSceneId: 'scene-12c-ending', xpBonus: 5, feedback: '[Feedback]' },
]};
const scene12cEnding: Scene = { id: 'scene-12c-ending', backgroundId: 'restaurant', dialog: [{ text: '[Ending]' }], isEnding: true, outcomeType: 'good', endingTitle: 'First Contact', endingSummary: 'Connection established. Mission complete.' };

export const mission12Scenes: Scene[] = [scene12a, scene12aResult, scene12b, scene12bResult, scene12c, scene12cEnding];
export const mission12Scenario: DatingScenario = { id: MISSION_ID, levelId: 'gala', missionNumber: 12, title: 'The First Encounter', tagline: 'Frame control is everything.', description: 'Navigate your first major NPC interaction.', objective: 'Navigate your first major NPC interaction.', tier: 'premium', estimatedMinutes: 12, difficulty: 'intermediate', characters, scenes: mission12Scenes, rewards, startSceneId: 'scene-12a-approach' };
export default mission12Scenario;
