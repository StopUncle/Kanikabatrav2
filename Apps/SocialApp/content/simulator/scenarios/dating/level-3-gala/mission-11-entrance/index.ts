// Mission 11: The Entrance
// Objective: Navigate the gala and establish yourself as a high-value target.
import type { Scene } from '../../../../types';
import type { DatingScenario, MissionRewards } from '../../types';
import { characters } from '../metadata';

export const MISSION_ID = 'mission-11-entrance';

export const rewards: MissionRewards = {
  power: 20,
  mask: 15,
  vision: 10,
  unlocks: 'mission-12-first-encounter',
};

// Scene 11A: The Arrival
const scene11a: Scene = {
  id: 'scene-11a-arrival',
  backgroundId: 'restaurant',
  dialog: [
    { text: 'The gala. Chandeliers, champagne, calculated smiles.' },
    { text: 'Your mentor brought you. Now you\'re on your own.', speakerId: 'mentor', emotion: 'neutral' },
    { speakerId: 'inner-voice', text: 'First impressions in this room can make or break you.', emotion: 'neutral' },
  ],
  choices: [
    { id: 'choice-11a-mentor', text: 'Stick with your mentor. Let them introduce you.', nextSceneId: 'scene-11a-mentor-result', xpBonus: 8, feedback: 'Close. Safe, but dependent.' },
    { id: 'choice-11a-separate', text: 'Thank them and separate. Time to work alone.', nextSceneId: 'scene-11a-separate-result', isOptimal: true, xpBonus: 15, feedback: 'OPTIMAL: Independence. You\'re not anyone\'s plus one.' },
    { id: 'choice-11a-observe', text: 'Find a quiet spot. Observe first.', nextSceneId: 'scene-11a-observe-result', xpBonus: 10, feedback: 'Close. Intel gathering, but wallflowers blend in.' },
    { id: 'choice-11a-bar', text: 'Head straight to the bar. Liquid courage.', nextSceneId: 'scene-11a-bar-result', xpBonus: 5, feedback: 'Crutch behavior. They notice.' },
  ],
};

// Scene 11B: The Opening Move
const scene11b: Scene = {
  id: 'scene-11b-opening',
  backgroundId: 'restaurant',
  dialog: [
    { text: 'The room has three distinct zones. Art display with cultured crowd. Main floor with movers and shakers. Terrace with intimate conversations.' },
    { speakerId: 'inner-voice', text: 'Where you start determines who you meet.', emotion: 'neutral' },
  ],
  choices: [
    { id: 'choice-11b-art', text: 'Art display. Seem cultured, attract conversation.', nextSceneId: 'scene-11b-art-result', isOptimal: true, xpBonus: 15, feedback: 'OPTIMAL: Natural conversation starter. Not trying too hard.' },
    { id: 'choice-11b-floor', text: 'Main floor. Where the action is.', nextSceneId: 'scene-11b-floor-result', xpBonus: 10, feedback: 'Close. Direct approach, high competition.' },
    { id: 'choice-11b-terrace', text: 'Terrace. More intimate.', nextSceneId: 'scene-11b-terrace-result', xpBonus: 8, feedback: 'Close. Fewer people, but more committed conversations.' },
    { id: 'choice-11b-circulate', text: 'Circulate everywhere. Be seen.', nextSceneId: 'scene-11b-circulate-result', xpBonus: 5, feedback: 'Scattered. No deep connections.' },
  ],
};

// Scene 11C: First Impression
const scene11c: Scene = {
  id: 'scene-11c-impression',
  backgroundId: 'restaurant',
  dialog: [
    { text: 'Someone important approaches. They\'ve been watching you.' },
    { text: '"You\'re new here. Tell me something interesting."', speakerId: 'jordan-gala', emotion: 'neutral' },
    { speakerId: 'inner-voice', text: 'Test one. What do you reveal?', emotion: 'neutral' },
  ],
  choices: [
    { id: 'choice-11c-impressive', text: 'Drop a subtle accomplishment. Demonstrate value.', nextSceneId: 'scene-11c-impressive-result', xpBonus: 10, feedback: 'Close. Shows value but might seem try-hard.' },
    { id: 'choice-11c-flip', text: '"What makes something interesting to you?"', nextSceneId: 'scene-11c-flip-result', isOptimal: true, xpBonus: 15, feedback: 'OPTIMAL: Frame flip. Now they\'re answering to you.' },
    { id: 'choice-11c-humble', text: 'Be modest. "Just here to learn."', nextSceneId: 'scene-11c-humble-result', xpBonus: 0, feedback: 'TRAP: Weak positioning in a power room.' },
    { id: 'choice-11c-mysterious', text: 'Smile. "I suppose you\'ll have to find out."', nextSceneId: 'scene-11c-mysterious-result', xpBonus: 8, feedback: 'Close. Intriguing but might frustrate.' },
  ],
};

// Placeholder result scenes
const scene11aMentorResult: Scene = { id: 'scene-11a-mentor-result', backgroundId: 'restaurant', dialog: [{ text: '[To be written]' }], nextSceneId: 'scene-11b-opening' };
const scene11aSeparateResult: Scene = { id: 'scene-11a-separate-result', backgroundId: 'restaurant', dialog: [{ text: '[To be written]' }], nextSceneId: 'scene-11b-opening' };
const scene11aObserveResult: Scene = { id: 'scene-11a-observe-result', backgroundId: 'restaurant', dialog: [{ text: '[To be written]' }], nextSceneId: 'scene-11b-opening' };
const scene11aBarResult: Scene = { id: 'scene-11a-bar-result', backgroundId: 'restaurant', dialog: [{ text: '[To be written]' }], nextSceneId: 'scene-11b-opening' };

const scene11bArtResult: Scene = { id: 'scene-11b-art-result', backgroundId: 'restaurant', dialog: [{ text: '[To be written]' }], nextSceneId: 'scene-11c-impression' };
const scene11bFloorResult: Scene = { id: 'scene-11b-floor-result', backgroundId: 'restaurant', dialog: [{ text: '[To be written]' }], nextSceneId: 'scene-11c-impression' };
const scene11bTerraceResult: Scene = { id: 'scene-11b-terrace-result', backgroundId: 'restaurant', dialog: [{ text: '[To be written]' }], nextSceneId: 'scene-11c-impression' };
const scene11bCirculateResult: Scene = { id: 'scene-11b-circulate-result', backgroundId: 'restaurant', dialog: [{ text: '[To be written]' }], nextSceneId: 'scene-11c-impression' };

// Endings
const scene11cImpressiveResult: Scene = { id: 'scene-11c-impressive-result', backgroundId: 'restaurant', dialog: [{ text: '[To be written]' }], isEnding: true, outcomeType: 'neutral', endingTitle: 'The Impression', endingSummary: 'You showed value. They\'re interested. Mission complete.' };
const scene11cFlipResult: Scene = { id: 'scene-11c-flip-result', backgroundId: 'restaurant', dialog: [{ text: '[To be written]' }], isEnding: true, outcomeType: 'good', endingTitle: 'The Frame Master', endingSummary: 'You controlled the interaction from the start. Mission complete.' };
const scene11cHumbleResult: Scene = { id: 'scene-11c-humble-result', backgroundId: 'restaurant', dialog: [{ text: '[To be written]' }], isEnding: true, outcomeType: 'bad', endingTitle: 'The Wallflower', endingSummary: 'Weak first impression. Uphill battle ahead. Mission complete.' };
const scene11cMysteriousResult: Scene = { id: 'scene-11c-mysterious-result', backgroundId: 'restaurant', dialog: [{ text: '[To be written]' }], isEnding: true, outcomeType: 'neutral', endingTitle: 'The Enigma', endingSummary: 'You created intrigue. Now maintain it. Mission complete.' };

export const mission11Scenes: Scene[] = [
  scene11a, scene11aMentorResult, scene11aSeparateResult, scene11aObserveResult, scene11aBarResult,
  scene11b, scene11bArtResult, scene11bFloorResult, scene11bTerraceResult, scene11bCirculateResult,
  scene11c, scene11cImpressiveResult, scene11cFlipResult, scene11cHumbleResult, scene11cMysteriousResult,
];

export const mission11Scenario: DatingScenario = {
  id: MISSION_ID,
  levelId: 'gala',
  missionNumber: 11,
  title: 'The Entrance',
  tagline: 'Where futures are made.',
  description: 'Navigate the gala and establish yourself as a high-value target.',
  objective: 'Navigate the gala and establish yourself as a high-value target.',
  tier: 'premium',
  estimatedMinutes: 10,
  difficulty: 'intermediate',
  characters,
  scenes: mission11Scenes,
  rewards,
  startSceneId: 'scene-11a-arrival',
};

export default mission11Scenario;
