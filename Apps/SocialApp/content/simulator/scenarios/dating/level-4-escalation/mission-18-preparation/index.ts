// Mission 18: The Preparation - Stub
import type { Scene } from '../../../../types';
import type { DatingScenario, MissionRewards } from '../../types';
import { characters } from '../metadata';

export const MISSION_ID = 'mission-18-preparation';
export const rewards: MissionRewards = { power: 35, mask: 30, vision: 25, unlocks: 'mission-19-private-jet' };

const scene18a: Scene = { id: 'scene-18a-research', backgroundId: 'apartment', dialog: [{ text: '[Mission 18A: The Research]', speakerId: 'inner-voice', emotion: 'neutral' }], choices: [
  { id: 'choice-18a-1', text: 'Thorough research', nextSceneId: 'scene-18a-result', isOptimal: true, xpBonus: 15, feedback: 'OPTIMAL' },
  { id: 'choice-18a-2', text: 'Minimal research', nextSceneId: 'scene-18a-result', xpBonus: 5, feedback: '[Feedback]' },
  { id: 'choice-18a-3', text: 'Strategic research', nextSceneId: 'scene-18a-result', xpBonus: 10, feedback: '[Feedback]' },
  { id: 'choice-18a-4', text: 'No research', nextSceneId: 'scene-18a-result', xpBonus: 0, feedback: 'TRAP' },
]};
const scene18aResult: Scene = { id: 'scene-18a-result', backgroundId: 'apartment', dialog: [{ text: '[Result]' }], nextSceneId: 'scene-18b-wardrobe' };

const scene18b: Scene = { id: 'scene-18b-wardrobe', backgroundId: 'apartment', dialog: [{ text: '[Mission 18B: The Wardrobe]', speakerId: 'inner-voice', emotion: 'neutral' }], choices: [
  { id: 'choice-18b-1', text: 'Casual elegance', nextSceneId: 'scene-18b-result', xpBonus: 8, feedback: '[Feedback]' },
  { id: 'choice-18b-2', text: 'Strategic mix', nextSceneId: 'scene-18b-result', isOptimal: true, xpBonus: 15, feedback: 'OPTIMAL' },
  { id: 'choice-18b-3', text: 'Luxury statement', nextSceneId: 'scene-18b-result', xpBonus: 10, feedback: '[Feedback]' },
  { id: 'choice-18b-4', text: 'Minimal', nextSceneId: 'scene-18b-result', xpBonus: 5, feedback: '[Feedback]' },
]};
const scene18bResult: Scene = { id: 'scene-18b-result', backgroundId: 'apartment', dialog: [{ text: '[Result]' }], nextSceneId: 'scene-18c-mindset' };

const scene18c: Scene = { id: 'scene-18c-mindset', backgroundId: 'apartment', dialog: [{ text: '[Mission 18C: The Mindset]', speakerId: 'inner-voice', emotion: 'neutral' }], choices: [
  { id: 'choice-18c-1', text: 'Confident', nextSceneId: 'scene-18c-ending', isOptimal: true, xpBonus: 15, feedback: 'OPTIMAL' },
  { id: 'choice-18c-2', text: 'Cautious', nextSceneId: 'scene-18c-ending', xpBonus: 10, feedback: '[Feedback]' },
  { id: 'choice-18c-3', text: 'Ambitious', nextSceneId: 'scene-18c-ending', xpBonus: 8, feedback: '[Feedback]' },
  { id: 'choice-18c-4', text: 'Nervous', nextSceneId: 'scene-18c-ending', xpBonus: 0, feedback: 'TRAP' },
]};
const scene18cEnding: Scene = { id: 'scene-18c-ending', backgroundId: 'apartment', dialog: [{ text: '[Ending]' }], isEnding: true, outcomeType: 'good', endingTitle: 'Ready', endingSummary: 'Fully prepared for the island. Mission complete.' };

export const mission18Scenes: Scene[] = [scene18a, scene18aResult, scene18b, scene18bResult, scene18c, scene18cEnding];
export const mission18Scenario: DatingScenario = { id: MISSION_ID, levelId: 'escalation', missionNumber: 18, title: 'The Preparation', tagline: 'Preparation is power.', description: 'Prepare for the private island.', objective: 'Prepare for the private island.', tier: 'vip', estimatedMinutes: 10, difficulty: 'advanced', characters, scenes: mission18Scenes, rewards, startSceneId: 'scene-18a-research' };
export default mission18Scenario;
