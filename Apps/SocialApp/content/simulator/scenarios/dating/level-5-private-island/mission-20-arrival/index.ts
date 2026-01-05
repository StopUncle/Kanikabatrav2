// Mission 20: The Arrival - Stub
import type { Scene } from '../../../../types';
import type { DatingScenario, MissionRewards } from '../../types';
import { characters } from '../metadata';

export const MISSION_ID = 'mission-20-arrival';
export const rewards: MissionRewards = { power: 25, mask: 20, vision: 15, unlocks: 'mission-21-gathering' };

const scene20a: Scene = { id: 'scene-20a-welcome', backgroundId: 'park', dialog: [{ text: '[Mission 20A: The Island Welcome]', speakerId: 'inner-voice', emotion: 'neutral' }], choices: [
  { id: 'choice-20a-1', text: 'Be impressive', nextSceneId: 'scene-20a-result', xpBonus: 5, feedback: '[Feedback]' },
  { id: 'choice-20a-2', text: 'Be confident', nextSceneId: 'scene-20a-result', isOptimal: true, xpBonus: 15, feedback: 'OPTIMAL' },
  { id: 'choice-20a-3', text: 'Be mysterious', nextSceneId: 'scene-20a-result', xpBonus: 10, feedback: '[Feedback]' },
  { id: 'choice-20a-4', text: 'Be dominant', nextSceneId: 'scene-20a-result', xpBonus: 8, feedback: '[Feedback]' },
]};
const scene20aResult: Scene = { id: 'scene-20a-result', backgroundId: 'park', dialog: [{ text: '[Result]' }], nextSceneId: 'scene-20b-tour' };

const scene20b: Scene = { id: 'scene-20b-tour', backgroundId: 'park', dialog: [{ text: '[Mission 20B: The Island Tour]', speakerId: 'inner-voice', emotion: 'neutral' }], choices: [
  { id: 'choice-20b-1', text: 'Be engaged', nextSceneId: 'scene-20b-result', xpBonus: 10, feedback: '[Feedback]' },
  { id: 'choice-20b-2', text: 'Be strategic', nextSceneId: 'scene-20b-result', isOptimal: true, xpBonus: 15, feedback: 'OPTIMAL' },
  { id: 'choice-20b-3', text: 'Be dismissive', nextSceneId: 'scene-20b-result', xpBonus: 5, feedback: '[Feedback]' },
  { id: 'choice-20b-4', text: 'Be curious', nextSceneId: 'scene-20b-result', xpBonus: 8, feedback: '[Feedback]' },
]};
const scene20bResult: Scene = { id: 'scene-20b-result', backgroundId: 'park', dialog: [{ text: '[Result]' }], nextSceneId: 'scene-20c-guests' };

const scene20c: Scene = { id: 'scene-20c-guests', backgroundId: 'park', dialog: [{ text: '[Mission 20C: The Other Guests]', speakerId: 'inner-voice', emotion: 'neutral' }], choices: [
  { id: 'choice-20c-1', text: 'Be friendly', nextSceneId: 'scene-20c-ending', xpBonus: 8, feedback: '[Feedback]' },
  { id: 'choice-20c-2', text: 'Be mysterious', nextSceneId: 'scene-20c-ending', isOptimal: true, xpBonus: 15, feedback: 'OPTIMAL' },
  { id: 'choice-20c-3', text: 'Be dominant', nextSceneId: 'scene-20c-ending', xpBonus: 10, feedback: '[Feedback]' },
  { id: 'choice-20c-4', text: 'Be observant', nextSceneId: 'scene-20c-ending', xpBonus: 5, feedback: '[Feedback]' },
]};
const scene20cEnding: Scene = { id: 'scene-20c-ending', backgroundId: 'park', dialog: [{ text: '[Ending]' }], isEnding: true, outcomeType: 'good', endingTitle: 'Established', endingSummary: 'Position established on the island. Mission complete.' };

export const mission20Scenes: Scene[] = [scene20a, scene20aResult, scene20b, scene20bResult, scene20c, scene20cEnding];
export const mission20Scenario: DatingScenario = { id: MISSION_ID, levelId: 'private-island', missionNumber: 20, title: 'The Arrival', tagline: 'The final arena awaits.', description: 'Arrive and establish your position.', objective: 'Arrive and establish your position.', tier: 'vip', estimatedMinutes: 10, difficulty: 'advanced', characters, scenes: mission20Scenes, rewards, startSceneId: 'scene-20a-welcome' };
export default mission20Scenario;
