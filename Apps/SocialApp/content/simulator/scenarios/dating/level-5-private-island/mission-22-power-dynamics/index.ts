// Mission 22: The Power Dynamics - Stub
import type { Scene } from '../../../../types';
import type { DatingScenario, MissionRewards } from '../../types';
import { characters } from '../metadata';

export const MISSION_ID = 'mission-22-power-dynamics';
export const rewards: MissionRewards = { power: 35, mask: 30, vision: 25, unlocks: 'mission-23-betrayal-test' };

const scene22a: Scene = { id: 'scene-22a-alliance', backgroundId: 'park', dialog: [{ text: '[Mission 22A: The Alliance Offer]', speakerId: 'inner-voice', emotion: 'neutral' }], choices: [
  { id: 'choice-22a-1', text: 'Accept alliance', nextSceneId: 'scene-22a-result', xpBonus: 10, feedback: '[Feedback]' },
  { id: 'choice-22a-2', text: 'Decline', nextSceneId: 'scene-22a-result', xpBonus: 5, feedback: '[Feedback]' },
  { id: 'choice-22a-3', text: 'Negotiate terms', nextSceneId: 'scene-22a-result', isOptimal: true, xpBonus: 15, feedback: 'OPTIMAL' },
  { id: 'choice-22a-4', text: 'Investigate first', nextSceneId: 'scene-22a-result', xpBonus: 8, feedback: '[Feedback]' },
]};
const scene22aResult: Scene = { id: 'scene-22a-result', backgroundId: 'park', dialog: [{ text: '[Result]' }], nextSceneId: 'scene-22b-betrayal' };

const scene22b: Scene = { id: 'scene-22b-betrayal', backgroundId: 'park', dialog: [{ text: '[Mission 22B: The Betrayal Attempt]', speakerId: 'inner-voice', emotion: 'neutral' }], choices: [
  { id: 'choice-22b-1', text: 'Expose betrayer', nextSceneId: 'scene-22b-result', xpBonus: 10, feedback: '[Feedback]' },
  { id: 'choice-22b-2', text: 'Protect target', nextSceneId: 'scene-22b-result', xpBonus: 5, feedback: '[Feedback]' },
  { id: 'choice-22b-3', text: 'Exploit situation', nextSceneId: 'scene-22b-result', isOptimal: true, xpBonus: 15, feedback: 'OPTIMAL' },
  { id: 'choice-22b-4', text: 'Ignore', nextSceneId: 'scene-22b-result', xpBonus: 0, feedback: 'TRAP' },
]};
const scene22bResult: Scene = { id: 'scene-22b-result', backgroundId: 'park', dialog: [{ text: '[Result]' }], nextSceneId: 'scene-22c-shift' };

const scene22c: Scene = { id: 'scene-22c-shift', backgroundId: 'park', dialog: [{ text: '[Mission 22C: The Power Shift]', speakerId: 'inner-voice', emotion: 'neutral' }], choices: [
  { id: 'choice-22c-1', text: 'Seize opportunity', nextSceneId: 'scene-22c-ending', isOptimal: true, xpBonus: 15, feedback: 'OPTIMAL' },
  { id: 'choice-22c-2', text: 'Stay neutral', nextSceneId: 'scene-22c-ending', xpBonus: 8, feedback: '[Feedback]' },
  { id: 'choice-22c-3', text: 'Align with winner', nextSceneId: 'scene-22c-ending', xpBonus: 10, feedback: '[Feedback]' },
  { id: 'choice-22c-4', text: 'Back loser', nextSceneId: 'scene-22c-ending', xpBonus: 0, feedback: 'TRAP' },
]};
const scene22cEnding: Scene = { id: 'scene-22c-ending', backgroundId: 'park', dialog: [{ text: '[Ending]' }], isEnding: true, outcomeType: 'good', endingTitle: 'Power Gained', endingSummary: 'You\'ve risen in the hierarchy. Mission complete.' };

export const mission22Scenes: Scene[] = [scene22a, scene22aResult, scene22b, scene22bResult, scene22c, scene22cEnding];
export const mission22Scenario: DatingScenario = { id: MISSION_ID, levelId: 'private-island', missionNumber: 22, title: 'The Power Dynamics', tagline: 'Navigate the web of power.', description: 'Navigate complex power dynamics.', objective: 'Navigate complex power dynamics.', tier: 'vip', estimatedMinutes: 12, difficulty: 'advanced', characters, scenes: mission22Scenes, rewards, startSceneId: 'scene-22a-alliance' };
export default mission22Scenario;
