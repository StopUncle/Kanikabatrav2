// Mission 19: The Private Jet - KEY MISSION for secret unlock
import type { Scene } from '../../../../types';
import type { DatingScenario, MissionRewards } from '../../types';
import { characters } from '../metadata';

export const MISSION_ID = 'mission-19-private-jet';
export const rewards: MissionRewards = { power: 40, mask: 35, vision: 30, unlocks: 'level-5-private-island' };

const scene19a: Scene = { id: 'scene-19a-arrival', backgroundId: 'office', dialog: [{ text: '[Mission 19A: The Jet Arrival]', speakerId: 'inner-voice', emotion: 'neutral' }], choices: [
  { id: 'choice-19a-1', text: 'Be impressed', nextSceneId: 'scene-19a-result', xpBonus: 0, feedback: 'TRAP' },
  { id: 'choice-19a-2', text: 'Be casual', nextSceneId: 'scene-19a-result', isOptimal: true, xpBonus: 15, feedback: 'OPTIMAL' },
  { id: 'choice-19a-3', text: 'Be confident', nextSceneId: 'scene-19a-result', xpBonus: 10, feedback: '[Feedback]' },
  { id: 'choice-19a-4', text: 'Be indifferent', nextSceneId: 'scene-19a-result', xpBonus: 8, feedback: '[Feedback]' },
]};
const scene19aResult: Scene = { id: 'scene-19a-result', backgroundId: 'office', dialog: [{ text: '[Result]' }], nextSceneId: 'scene-19b-guests' };

// KEY SCENE FOR SECRET UNLOCK
const scene19b: Scene = { id: 'scene-19b-guests', backgroundId: 'office', dialog: [{ text: '[Mission 19B: The Other Guests]', speakerId: 'inner-voice', emotion: 'neutral' }], choices: [
  { id: 'choice-19b-1', text: 'Be friendly', nextSceneId: 'scene-19b-result', xpBonus: 5, feedback: '[Feedback]' },
  { id: 'choice-19b-2', text: 'Be mysterious', nextSceneId: 'scene-19b-result', isOptimal: true, xpBonus: 20, feedback: 'OPTIMAL: Strategic ambiguity. (Unlocks secret path)', tactic: 'mystery' },
  { id: 'choice-19b-3', text: 'Be dominant', nextSceneId: 'scene-19b-result', xpBonus: 10, feedback: '[Feedback]' },
  { id: 'choice-19b-4', text: 'Be observant', nextSceneId: 'scene-19b-result', xpBonus: 8, feedback: '[Feedback]' },
]};
const scene19bResult: Scene = { id: 'scene-19b-result', backgroundId: 'office', dialog: [{ text: '[Result]' }], nextSceneId: 'scene-19c-flight' };

// KEY SCENE FOR SECRET UNLOCK
const scene19c: Scene = { id: 'scene-19c-flight', backgroundId: 'office', dialog: [{ text: '[Mission 19C: The Flight]', speakerId: 'inner-voice', emotion: 'neutral' }], choices: [
  { id: 'choice-19c-1', text: 'Form alliances', nextSceneId: 'scene-19c-ending-optimal', isOptimal: true, xpBonus: 25, feedback: 'OPTIMAL: Strategic connections formed. (Unlocks secret path)', tactic: 'alliance' },
  { id: 'choice-19c-2', text: 'Stay solo', nextSceneId: 'scene-19c-ending-good', xpBonus: 10, feedback: '[Feedback]' },
  { id: 'choice-19c-3', text: 'Observe only', nextSceneId: 'scene-19c-ending-neutral', xpBonus: 8, feedback: '[Feedback]' },
  { id: 'choice-19c-4', text: 'Compete', nextSceneId: 'scene-19c-ending-bad', xpBonus: 0, feedback: 'TRAP' },
]};

const scene19cEndingOptimal: Scene = { id: 'scene-19c-ending-optimal', backgroundId: 'office', dialog: [{ text: '[Optimal Ending]' }], isEnding: true, outcomeType: 'good', endingTitle: 'The Network', endingSummary: 'Alliances formed in flight. SECRET LEVEL UNLOCKED: The Infiltration.' };
const scene19cEndingGood: Scene = { id: 'scene-19c-ending-good', backgroundId: 'office', dialog: [{ text: '[Good Ending]' }], isEnding: true, outcomeType: 'good', endingTitle: 'The Arrival', endingSummary: 'Ready for the island. Level 4 complete.' };
const scene19cEndingNeutral: Scene = { id: 'scene-19c-ending-neutral', backgroundId: 'office', dialog: [{ text: '[Neutral Ending]' }], isEnding: true, outcomeType: 'neutral', endingTitle: 'The Observer', endingSummary: 'Intel gathered. Level 4 complete.' };
const scene19cEndingBad: Scene = { id: 'scene-19c-ending-bad', backgroundId: 'office', dialog: [{ text: '[Bad Ending]' }], isEnding: true, outcomeType: 'bad', endingTitle: 'The Competitor', endingSummary: 'Made enemies before arrival. Level 4 complete.' };

export const mission19Scenes: Scene[] = [scene19a, scene19aResult, scene19b, scene19bResult, scene19c, scene19cEndingOptimal, scene19cEndingGood, scene19cEndingNeutral, scene19cEndingBad];
export const mission19Scenario: DatingScenario = { id: MISSION_ID, levelId: 'escalation', missionNumber: 19, title: 'The Private Jet', tagline: 'The journey to power.', description: 'Navigate the private jet and meet other players.', objective: 'Navigate the private jet and meet other players.', tier: 'vip', estimatedMinutes: 12, difficulty: 'advanced', characters, scenes: mission19Scenes, rewards, startSceneId: 'scene-19a-arrival' };
export default mission19Scenario;
