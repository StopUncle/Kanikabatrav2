// Mission 15: The Final Choice - KEY MISSION for secret unlock
import type { Scene } from '../../../../types';
import type { DatingScenario, MissionRewards } from '../../types';
import { characters } from '../metadata';

export const MISSION_ID = 'mission-15-final-choice';
export const rewards: MissionRewards = { power: 40, mask: 35, vision: 30, unlocks: 'level-4-escalation' };

const scene15a: Scene = { id: 'scene-15a-offers', backgroundId: 'restaurant', dialog: [{ text: '[Mission 15A: The Offers - to be written]' }], choices: [
  { id: 'choice-15a-1', text: 'Weigh carefully', nextSceneId: 'scene-15a-result', isOptimal: true, xpBonus: 15, feedback: 'OPTIMAL' },
  { id: 'choice-15a-2', text: 'Accept first', nextSceneId: 'scene-15a-result', xpBonus: 5, feedback: '[Feedback]' },
  { id: 'choice-15a-3', text: 'Decline all', nextSceneId: 'scene-15a-result', xpBonus: 8, feedback: '[Feedback]' },
  { id: 'choice-15a-4', text: 'Create bidding war', nextSceneId: 'scene-15a-result', xpBonus: 10, feedback: '[Feedback]' },
]};
const scene15aResult: Scene = { id: 'scene-15a-result', backgroundId: 'restaurant', dialog: [{ text: '[Result]' }], nextSceneId: 'scene-15b-frame' };

// KEY SCENE FOR SECRET UNLOCK
const scene15b: Scene = { id: 'scene-15b-frame', backgroundId: 'restaurant', dialog: [{ text: '[Mission 15B: Frame Creation - to be written]', speakerId: 'inner-voice', emotion: 'neutral' }], choices: [
  { id: 'choice-15b-1', text: 'Make them compete for you', nextSceneId: 'scene-15b-result', isOptimal: true, xpBonus: 20, feedback: 'OPTIMAL: Apex frame established. (Unlocks secret path)', tactic: 'frame_control' },
  { id: 'choice-15b-2', text: 'Choose the safest option', nextSceneId: 'scene-15b-result', xpBonus: 8, feedback: '[Feedback]' },
  { id: 'choice-15b-3', text: 'Play it neutral', nextSceneId: 'scene-15b-result', xpBonus: 10, feedback: '[Feedback]' },
  { id: 'choice-15b-4', text: 'Show your hand', nextSceneId: 'scene-15b-result', xpBonus: 0, feedback: 'TRAP' },
]};
const scene15bResult: Scene = { id: 'scene-15b-result', backgroundId: 'restaurant', dialog: [{ text: '[Result]' }], nextSceneId: 'scene-15c-ascension' };

// KEY SCENE FOR SECRET UNLOCK
const scene15c: Scene = { id: 'scene-15c-ascension', backgroundId: 'restaurant', dialog: [{ text: '[Mission 15C: The Ascension - to be written]', speakerId: 'inner-voice', emotion: 'neutral' }], choices: [
  { id: 'choice-15c-1', text: 'Leave as the highest value person', nextSceneId: 'scene-15c-ending-optimal', isOptimal: true, xpBonus: 25, feedback: 'OPTIMAL: You\'ve transcended. (Unlocks secret path)', tactic: 'ascension' },
  { id: 'choice-15c-2', text: 'Secure specific wins', nextSceneId: 'scene-15c-ending-good', xpBonus: 10, feedback: '[Feedback]' },
  { id: 'choice-15c-3', text: 'Play it safe', nextSceneId: 'scene-15c-ending-neutral', xpBonus: 8, feedback: '[Feedback]' },
  { id: 'choice-15c-4', text: 'Overreach', nextSceneId: 'scene-15c-ending-bad', xpBonus: 0, feedback: 'TRAP' },
]};

const scene15cEndingOptimal: Scene = { id: 'scene-15c-ending-optimal', backgroundId: 'restaurant', dialog: [{ text: '[Ending - Optimal]' }], isEnding: true, outcomeType: 'good', endingTitle: 'The Ascension', endingSummary: 'You\'ve become the prize everyone wants. SECRET LEVEL UNLOCKED: The Architect\'s Gambit.' };
const scene15cEndingGood: Scene = { id: 'scene-15c-ending-good', backgroundId: 'restaurant', dialog: [{ text: '[Ending - Good]' }], isEnding: true, outcomeType: 'good', endingTitle: 'The Winner', endingSummary: 'Solid wins secured. Level 3 complete. Invitation to Escalation.' };
const scene15cEndingNeutral: Scene = { id: 'scene-15c-ending-neutral', backgroundId: 'restaurant', dialog: [{ text: '[Ending - Neutral]' }], isEnding: true, outcomeType: 'neutral', endingTitle: 'The Survivor', endingSummary: 'You made it through. Level 3 complete. Invitation to Escalation.' };
const scene15cEndingBad: Scene = { id: 'scene-15c-ending-bad', backgroundId: 'restaurant', dialog: [{ text: '[Ending - Bad]' }], isEnding: true, outcomeType: 'bad', endingTitle: 'The Overreach', endingSummary: 'Too much too fast. Level 3 complete. Invitation to Escalation (reduced).' };

export const mission15Scenes: Scene[] = [scene15a, scene15aResult, scene15b, scene15bResult, scene15c, scene15cEndingOptimal, scene15cEndingGood, scene15cEndingNeutral, scene15cEndingBad];
export const mission15Scenario: DatingScenario = { id: MISSION_ID, levelId: 'gala', missionNumber: 15, title: 'The Final Choice', tagline: 'Become the prize.', description: 'Make the final decision that shapes your future.', objective: 'Make the final decision that shapes your future.', tier: 'premium', estimatedMinutes: 15, difficulty: 'advanced', characters, scenes: mission15Scenes, rewards, startSceneId: 'scene-15a-offers' };
export default mission15Scenario;
