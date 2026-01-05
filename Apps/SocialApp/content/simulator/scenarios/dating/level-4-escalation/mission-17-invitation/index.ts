// Mission 17: The Invitation - Stub
import type { Scene } from '../../../../types';
import type { DatingScenario, MissionRewards } from '../../types';
import { characters } from '../metadata';

export const MISSION_ID = 'mission-17-invitation';
export const rewards: MissionRewards = { power: 30, mask: 25, vision: 20, unlocks: 'mission-18-preparation' };

const scene17a: Scene = { id: 'scene-17a-call', backgroundId: 'phone-call', dialog: [{ text: '[Mission 17A: The Mysterious Call]', speakerId: 'inner-voice', emotion: 'neutral' }], choices: [
  { id: 'choice-17a-1', text: 'Answer immediately', nextSceneId: 'scene-17a-result', xpBonus: 8, feedback: '[Feedback]' },
  { id: 'choice-17a-2', text: 'Call back later', nextSceneId: 'scene-17a-result', isOptimal: true, xpBonus: 15, feedback: 'OPTIMAL' },
  { id: 'choice-17a-3', text: 'Investigate first', nextSceneId: 'scene-17a-result', xpBonus: 10, feedback: '[Feedback]' },
  { id: 'choice-17a-4', text: 'Ignore', nextSceneId: 'scene-17a-result', xpBonus: 0, feedback: 'TRAP' },
]};
const scene17aResult: Scene = { id: 'scene-17a-result', backgroundId: 'phone-call', dialog: [{ text: '[Result]' }], nextSceneId: 'scene-17b-offer' };

const scene17b: Scene = { id: 'scene-17b-offer', backgroundId: 'phone-call', dialog: [{ text: '[Mission 17B: The Private Island Offer]', speakerId: 'inner-voice', emotion: 'neutral' }], choices: [
  { id: 'choice-17b-1', text: 'Accept immediately', nextSceneId: 'scene-17b-result', xpBonus: 5, feedback: '[Feedback]' },
  { id: 'choice-17b-2', text: 'Ask questions', nextSceneId: 'scene-17b-result', isOptimal: true, xpBonus: 15, feedback: 'OPTIMAL' },
  { id: 'choice-17b-3', text: 'Be cautious', nextSceneId: 'scene-17b-result', xpBonus: 10, feedback: '[Feedback]' },
  { id: 'choice-17b-4', text: 'Decline', nextSceneId: 'scene-17b-result', xpBonus: 0, feedback: 'TRAP' },
]};
const scene17bResult: Scene = { id: 'scene-17b-result', backgroundId: 'phone-call', dialog: [{ text: '[Result]' }], nextSceneId: 'scene-17c-prep' };

const scene17c: Scene = { id: 'scene-17c-prep', backgroundId: 'apartment', dialog: [{ text: '[Mission 17C: The Preparation]', speakerId: 'inner-voice', emotion: 'neutral' }], choices: [
  { id: 'choice-17c-1', text: 'Pack strategically', nextSceneId: 'scene-17c-ending', isOptimal: true, xpBonus: 15, feedback: 'OPTIMAL' },
  { id: 'choice-17c-2', text: 'Pack light', nextSceneId: 'scene-17c-ending', xpBonus: 10, feedback: '[Feedback]' },
  { id: 'choice-17c-3', text: 'Pack luxuriously', nextSceneId: 'scene-17c-ending', xpBonus: 5, feedback: '[Feedback]' },
  { id: 'choice-17c-4', text: 'Don\'t prepare', nextSceneId: 'scene-17c-ending', xpBonus: 0, feedback: 'TRAP' },
]};
const scene17cEnding: Scene = { id: 'scene-17c-ending', backgroundId: 'apartment', dialog: [{ text: '[Ending]' }], isEnding: true, outcomeType: 'good', endingTitle: 'Invitation Secured', endingSummary: 'You\'re going to the island. Mission complete.' };

export const mission17Scenes: Scene[] = [scene17a, scene17aResult, scene17b, scene17bResult, scene17c, scene17cEnding];
export const mission17Scenario: DatingScenario = { id: MISSION_ID, levelId: 'escalation', missionNumber: 17, title: 'The Invitation', tagline: 'The next level calls.', description: 'Receive and accept the private island invitation.', objective: 'Receive and accept the private island invitation.', tier: 'vip', estimatedMinutes: 10, difficulty: 'advanced', characters, scenes: mission17Scenes, rewards, startSceneId: 'scene-17a-call' };
export default mission17Scenario;
