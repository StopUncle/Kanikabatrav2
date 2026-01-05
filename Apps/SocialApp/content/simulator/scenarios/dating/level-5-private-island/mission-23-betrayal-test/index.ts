// Mission 23: The Betrayal Test - Stub
import type { Scene } from '../../../../types';
import type { DatingScenario, MissionRewards } from '../../types';
import { characters } from '../metadata';

export const MISSION_ID = 'mission-23-betrayal-test';
export const rewards: MissionRewards = { power: 40, mask: 35, vision: 30, unlocks: 'mission-24-final-ascension' };

const scene23a: Scene = { id: 'scene-23a-test', backgroundId: 'restaurant', dialog: [{ text: '[Mission 23A: The Loyalty Test]', speakerId: 'inner-voice', emotion: 'neutral' }], choices: [
  { id: 'choice-23a-1', text: 'Betray target', nextSceneId: 'scene-23a-result', xpBonus: 10, feedback: '[Feedback]' },
  { id: 'choice-23a-2', text: 'Refuse', nextSceneId: 'scene-23a-result', xpBonus: 5, feedback: '[Feedback]' },
  { id: 'choice-23a-3', text: 'Manipulate outcome', nextSceneId: 'scene-23a-result', isOptimal: true, xpBonus: 15, feedback: 'OPTIMAL' },
  { id: 'choice-23a-4', text: 'Expose the test', nextSceneId: 'scene-23a-result', xpBonus: 0, feedback: 'TRAP' },
]};
const scene23aResult: Scene = { id: 'scene-23a-result', backgroundId: 'restaurant', dialog: [{ text: '[Result]' }], nextSceneId: 'scene-23b-consequence' };

const scene23b: Scene = { id: 'scene-23b-consequence', backgroundId: 'restaurant', dialog: [{ text: '[Mission 23B: The Consequence]', speakerId: 'inner-voice', emotion: 'neutral' }], choices: [
  { id: 'choice-23b-1', text: 'Accept outcome', nextSceneId: 'scene-23b-result', xpBonus: 10, feedback: '[Feedback]' },
  { id: 'choice-23b-2', text: 'Flip narrative', nextSceneId: 'scene-23b-result', isOptimal: true, xpBonus: 15, feedback: 'OPTIMAL' },
  { id: 'choice-23b-3', text: 'Damage control', nextSceneId: 'scene-23b-result', xpBonus: 8, feedback: '[Feedback]' },
  { id: 'choice-23b-4', text: 'Deny everything', nextSceneId: 'scene-23b-result', xpBonus: 0, feedback: 'TRAP' },
]};
const scene23bResult: Scene = { id: 'scene-23b-result', backgroundId: 'restaurant', dialog: [{ text: '[Result]' }], nextSceneId: 'scene-23c-acceptance' };

const scene23c: Scene = { id: 'scene-23c-acceptance', backgroundId: 'restaurant', dialog: [{ text: '[Mission 23C: The Acceptance]', speakerId: 'inner-voice', emotion: 'neutral' }], choices: [
  { id: 'choice-23c-1', text: 'Accept position', nextSceneId: 'scene-23c-ending', isOptimal: true, xpBonus: 15, feedback: 'OPTIMAL' },
  { id: 'choice-23c-2', text: 'Demand more', nextSceneId: 'scene-23c-ending', xpBonus: 8, feedback: '[Feedback]' },
  { id: 'choice-23c-3', text: 'Stay humble', nextSceneId: 'scene-23c-ending', xpBonus: 5, feedback: '[Feedback]' },
  { id: 'choice-23c-4', text: 'Reject', nextSceneId: 'scene-23c-ending', xpBonus: 0, feedback: 'TRAP' },
]};
const scene23cEnding: Scene = { id: 'scene-23c-ending', backgroundId: 'restaurant', dialog: [{ text: '[Ending]' }], isEnding: true, outcomeType: 'good', endingTitle: 'Loyalty Proven', endingSummary: 'You passed the test. Final mission unlocked. Mission complete.' };

export const mission23Scenes: Scene[] = [scene23a, scene23aResult, scene23b, scene23bResult, scene23c, scene23cEnding];
export const mission23Scenario: DatingScenario = { id: MISSION_ID, levelId: 'private-island', missionNumber: 23, title: 'The Betrayal Test', tagline: 'Prove your ruthlessness.', description: 'Prove your loyalty and ruthlessness.', objective: 'Prove your loyalty and ruthlessness.', tier: 'vip', estimatedMinutes: 12, difficulty: 'advanced', characters, scenes: mission23Scenes, rewards, startSceneId: 'scene-23a-test' };
export default mission23Scenario;
