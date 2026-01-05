// Mission 16: The Aftermath - Stub
import type { Scene } from '../../../../types';
import type { DatingScenario, MissionRewards } from '../../types';
import { characters } from '../metadata';

export const MISSION_ID = 'mission-16-aftermath';
export const rewards: MissionRewards = { power: 25, mask: 20, vision: 15, unlocks: 'mission-17-invitation' };

const scene16a: Scene = { id: 'scene-16a-followup', backgroundId: 'apartment', dialog: [{ text: '[Mission 16A: The Follow-Up - Consolidate gala gains]', speakerId: 'inner-voice', emotion: 'neutral' }], choices: [
  { id: 'choice-16a-1', text: 'Strategic follow-up', nextSceneId: 'scene-16a-result', isOptimal: true, xpBonus: 15, feedback: 'OPTIMAL' },
  { id: 'choice-16a-2', text: 'Immediate response', nextSceneId: 'scene-16a-result', xpBonus: 5, feedback: '[Feedback]' },
  { id: 'choice-16a-3', text: 'Delayed response', nextSceneId: 'scene-16a-result', xpBonus: 8, feedback: '[Feedback]' },
  { id: 'choice-16a-4', text: 'No response', nextSceneId: 'scene-16a-result', xpBonus: 0, feedback: 'TRAP' },
]};
const scene16aResult: Scene = { id: 'scene-16a-result', backgroundId: 'apartment', dialog: [{ text: '[Result]' }], nextSceneId: 'scene-16b-complication' };

const scene16b: Scene = { id: 'scene-16b-complication', backgroundId: 'apartment', dialog: [{ text: '[Mission 16B: The Complication]', speakerId: 'inner-voice', emotion: 'neutral' }], choices: [
  { id: 'choice-16b-1', text: 'Address directly', nextSceneId: 'scene-16b-result', xpBonus: 10, feedback: '[Feedback]' },
  { id: 'choice-16b-2', text: 'Manipulate around it', nextSceneId: 'scene-16b-result', isOptimal: true, xpBonus: 15, feedback: 'OPTIMAL' },
  { id: 'choice-16b-3', text: 'Ignore', nextSceneId: 'scene-16b-result', xpBonus: 5, feedback: '[Feedback]' },
  { id: 'choice-16b-4', text: 'Escalate', nextSceneId: 'scene-16b-result', xpBonus: 0, feedback: 'TRAP' },
]};
const scene16bResult: Scene = { id: 'scene-16b-result', backgroundId: 'apartment', dialog: [{ text: '[Result]' }], nextSceneId: 'scene-16c-opportunity' };

const scene16c: Scene = { id: 'scene-16c-opportunity', backgroundId: 'apartment', dialog: [{ text: '[Mission 16C: The Opportunity]', speakerId: 'inner-voice', emotion: 'neutral' }], choices: [
  { id: 'choice-16c-1', text: 'Pursue aggressively', nextSceneId: 'scene-16c-ending', xpBonus: 8, feedback: '[Feedback]' },
  { id: 'choice-16c-2', text: 'Pursue cautiously', nextSceneId: 'scene-16c-ending', isOptimal: true, xpBonus: 15, feedback: 'OPTIMAL' },
  { id: 'choice-16c-3', text: 'Negotiate', nextSceneId: 'scene-16c-ending', xpBonus: 10, feedback: '[Feedback]' },
  { id: 'choice-16c-4', text: 'Ignore', nextSceneId: 'scene-16c-ending', xpBonus: 0, feedback: 'TRAP' },
]};
const scene16cEnding: Scene = { id: 'scene-16c-ending', backgroundId: 'apartment', dialog: [{ text: '[Ending]' }], isEnding: true, outcomeType: 'good', endingTitle: 'Gains Secured', endingSummary: 'Gala momentum maintained. Mission complete.' };

export const mission16Scenes: Scene[] = [scene16a, scene16aResult, scene16b, scene16bResult, scene16c, scene16cEnding];
export const mission16Scenario: DatingScenario = { id: MISSION_ID, levelId: 'escalation', missionNumber: 16, title: 'The Aftermath', tagline: 'Consolidate your gains.', description: 'Navigate the aftermath and consolidate.', objective: 'Navigate the aftermath and consolidate.', tier: 'vip', estimatedMinutes: 10, difficulty: 'advanced', characters, scenes: mission16Scenes, rewards, startSceneId: 'scene-16a-followup' };
export default mission16Scenario;
