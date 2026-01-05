// Mission 21: The Gathering - Stub
import type { Scene } from '../../../../types';
import type { DatingScenario, MissionRewards } from '../../types';
import { characters } from '../metadata';

export const MISSION_ID = 'mission-21-gathering';
export const rewards: MissionRewards = { power: 30, mask: 25, vision: 20, unlocks: 'mission-22-power-dynamics' };

const scene21a: Scene = { id: 'scene-21a-dinner', backgroundId: 'restaurant', dialog: [{ text: '[Mission 21A: The Formal Dinner]', speakerId: 'inner-voice', emotion: 'neutral' }], choices: [
  { id: 'choice-21a-1', text: 'Be impressive', nextSceneId: 'scene-21a-result', xpBonus: 10, feedback: '[Feedback]' },
  { id: 'choice-21a-2', text: 'Be humble', nextSceneId: 'scene-21a-result', xpBonus: 0, feedback: 'TRAP' },
  { id: 'choice-21a-3', text: 'Be mysterious', nextSceneId: 'scene-21a-result', isOptimal: true, xpBonus: 15, feedback: 'OPTIMAL' },
  { id: 'choice-21a-4', text: 'Be dominant', nextSceneId: 'scene-21a-result', xpBonus: 8, feedback: '[Feedback]' },
]};
const scene21aResult: Scene = { id: 'scene-21a-result', backgroundId: 'restaurant', dialog: [{ text: '[Result]' }], nextSceneId: 'scene-21b-conversation' };

const scene21b: Scene = { id: 'scene-21b-conversation', backgroundId: 'restaurant', dialog: [{ text: '[Mission 21B: The Conversations]', speakerId: 'inner-voice', emotion: 'neutral' }], choices: [
  { id: 'choice-21b-1', text: 'Form alliances', nextSceneId: 'scene-21b-result', isOptimal: true, xpBonus: 15, feedback: 'OPTIMAL' },
  { id: 'choice-21b-2', text: 'Stay solo', nextSceneId: 'scene-21b-result', xpBonus: 8, feedback: '[Feedback]' },
  { id: 'choice-21b-3', text: 'Gather intel', nextSceneId: 'scene-21b-result', xpBonus: 10, feedback: '[Feedback]' },
  { id: 'choice-21b-4', text: 'Challenge others', nextSceneId: 'scene-21b-result', xpBonus: 5, feedback: '[Feedback]' },
]};
const scene21bResult: Scene = { id: 'scene-21b-result', backgroundId: 'restaurant', dialog: [{ text: '[Result]' }], nextSceneId: 'scene-21c-private' };

const scene21c: Scene = { id: 'scene-21c-private', backgroundId: 'restaurant', dialog: [{ text: '[Mission 21C: The Host Private Moment]', speakerId: 'inner-voice', emotion: 'neutral' }], choices: [
  { id: 'choice-21c-1', text: 'Align with host', nextSceneId: 'scene-21c-ending', isOptimal: true, xpBonus: 15, feedback: 'OPTIMAL' },
  { id: 'choice-21c-2', text: 'Be cautious', nextSceneId: 'scene-21c-ending', xpBonus: 10, feedback: '[Feedback]' },
  { id: 'choice-21c-3', text: 'Challenge host', nextSceneId: 'scene-21c-ending', xpBonus: 5, feedback: '[Feedback]' },
  { id: 'choice-21c-4', text: 'Avoid host', nextSceneId: 'scene-21c-ending', xpBonus: 0, feedback: 'TRAP' },
]};
const scene21cEnding: Scene = { id: 'scene-21c-ending', backgroundId: 'restaurant', dialog: [{ text: '[Ending]' }], isEnding: true, outcomeType: 'good', endingTitle: 'Connected', endingSummary: 'Key relationships established. Mission complete.' };

export const mission21Scenes: Scene[] = [scene21a, scene21aResult, scene21b, scene21bResult, scene21c, scene21cEnding];
export const mission21Scenario: DatingScenario = { id: MISSION_ID, levelId: 'private-island', missionNumber: 21, title: 'The Gathering', tagline: 'Where allegiances form.', description: 'Navigate the first major gathering.', objective: 'Navigate the first major gathering.', tier: 'vip', estimatedMinutes: 12, difficulty: 'advanced', characters, scenes: mission21Scenes, rewards, startSceneId: 'scene-21a-dinner' };
export default mission21Scenario;
