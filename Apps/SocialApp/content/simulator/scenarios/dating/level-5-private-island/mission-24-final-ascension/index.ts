// Mission 24: The Final Ascension - THE ENDGAME
import type { Scene } from '../../../../types';
import type { DatingScenario, MissionRewards } from '../../types';
import { characters } from '../metadata';

export const MISSION_ID = 'mission-24-final-ascension';
export const rewards: MissionRewards = { power: 50, mask: 45, vision: 40, unlocks: 'game-complete' };

const scene24a: Scene = { id: 'scene-24a-challenge', backgroundId: 'restaurant', dialog: [{ text: '[Mission 24A: The Final Challenge]', speakerId: 'inner-voice', emotion: 'neutral' }], choices: [
  { id: 'choice-24a-1', text: 'Dominate', nextSceneId: 'scene-24a-result', isOptimal: true, xpBonus: 15, feedback: 'OPTIMAL' },
  { id: 'choice-24a-2', text: 'Play smart', nextSceneId: 'scene-24a-result', xpBonus: 10, feedback: '[Feedback]' },
  { id: 'choice-24a-3', text: 'Collaborate', nextSceneId: 'scene-24a-result', xpBonus: 8, feedback: '[Feedback]' },
  { id: 'choice-24a-4', text: 'Hold back', nextSceneId: 'scene-24a-result', xpBonus: 0, feedback: 'TRAP' },
]};
const scene24aResult: Scene = { id: 'scene-24a-result', backgroundId: 'restaurant', dialog: [{ text: '[Result]' }], nextSceneId: 'scene-24b-crown' };

// KEY SCENE FOR SECRET UNLOCK
const scene24b: Scene = { id: 'scene-24b-crown', backgroundId: 'restaurant', dialog: [{ text: '[Mission 24B: The Crown Offered]', speakerId: 'inner-voice', emotion: 'neutral' }], choices: [
  { id: 'choice-24b-1', text: 'Accept with terms', nextSceneId: 'scene-24b-result', isOptimal: true, xpBonus: 25, feedback: 'OPTIMAL: You\'ve won on your terms. (Unlocks secret path)', tactic: 'negotiation' },
  { id: 'choice-24b-2', text: 'Accept fully', nextSceneId: 'scene-24b-result', xpBonus: 15, feedback: '[Feedback]' },
  { id: 'choice-24b-3', text: 'Demand more', nextSceneId: 'scene-24b-result', xpBonus: 10, feedback: '[Feedback]' },
  { id: 'choice-24b-4', text: 'Decline', nextSceneId: 'scene-24b-result', xpBonus: 5, feedback: '[Feedback]' },
]};
const scene24bResult: Scene = { id: 'scene-24b-result', backgroundId: 'restaurant', dialog: [{ text: '[Result]' }], nextSceneId: 'scene-24c-ascension' };

// KEY SCENE FOR SECRET UNLOCK
const scene24c: Scene = { id: 'scene-24c-ascension', backgroundId: 'restaurant', dialog: [{ text: '[Mission 24C: The Ascension]', speakerId: 'inner-voice', emotion: 'neutral' }], choices: [
  { id: 'choice-24c-1', text: 'Claim the throne', nextSceneId: 'scene-24c-ending-throne', isOptimal: true, xpBonus: 30, feedback: 'OPTIMAL: Ultimate victory. (Unlocks secret path)', tactic: 'ascension' },
  { id: 'choice-24c-2', text: 'Share power', nextSceneId: 'scene-24c-ending-good', xpBonus: 15, feedback: '[Feedback]' },
  { id: 'choice-24c-3', text: 'Rule from shadows', nextSceneId: 'scene-24c-ending-neutral', xpBonus: 10, feedback: '[Feedback]' },
  { id: 'choice-24c-4', text: 'Walk away', nextSceneId: 'scene-24c-ending-walk', xpBonus: 5, feedback: '[Feedback]' },
]};

const scene24cEndingThrone: Scene = { id: 'scene-24c-ending-throne', backgroundId: 'restaurant', dialog: [{ text: '[ULTIMATE ENDING: You\'ve reached the apex of power]' }], isEnding: true, outcomeType: 'good', endingTitle: 'THE THRONE', endingSummary: 'You\'ve won. The game is over. You are the ultimate player. SECRET LEVEL UNLOCKED: The True Ending.' };
const scene24cEndingGood: Scene = { id: 'scene-24c-ending-good', backgroundId: 'restaurant', dialog: [{ text: '[Good Ending]' }], isEnding: true, outcomeType: 'good', endingTitle: 'The Partnership', endingSummary: 'You share power. A different kind of victory. GAME COMPLETE.' };
const scene24cEndingNeutral: Scene = { id: 'scene-24c-ending-neutral', backgroundId: 'restaurant', dialog: [{ text: '[Neutral Ending]' }], isEnding: true, outcomeType: 'neutral', endingTitle: 'The Shadow', endingSummary: 'Power without visibility. GAME COMPLETE.' };
const scene24cEndingWalk: Scene = { id: 'scene-24c-ending-walk', backgroundId: 'restaurant', dialog: [{ text: '[Walk Away Ending]' }], isEnding: true, outcomeType: 'neutral', endingTitle: 'The Freedom', endingSummary: 'You chose freedom over power. GAME COMPLETE.' };

export const mission24Scenes: Scene[] = [scene24a, scene24aResult, scene24b, scene24bResult, scene24c, scene24cEndingThrone, scene24cEndingGood, scene24cEndingNeutral, scene24cEndingWalk];
export const mission24Scenario: DatingScenario = { id: MISSION_ID, levelId: 'private-island', missionNumber: 24, title: 'The Final Ascension', tagline: 'Claim your throne.', description: 'Reach the apex and claim ultimate power.', objective: 'Reach the apex and claim ultimate power.', tier: 'vip', estimatedMinutes: 15, difficulty: 'advanced', characters, scenes: mission24Scenes, rewards, startSceneId: 'scene-24a-challenge' };
export default mission24Scenario;
