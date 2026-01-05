// Level 5: Private Island - All missions
import type { Level } from '../types';
import { LEVEL_ID, levelMetadata, characters, levelCompletion } from './metadata';
import { mission20Scenario, mission20Scenes } from './mission-20-arrival';
import { mission21Scenario, mission21Scenes } from './mission-21-gathering';
import { mission22Scenario, mission22Scenes } from './mission-22-power-dynamics';
import { mission23Scenario, mission23Scenes } from './mission-23-betrayal-test';
import { mission24Scenario, mission24Scenes } from './mission-24-final-ascension';
import { secretScenario, secretScenes } from './secret-throne';

export const privateIslandScenarios = [mission20Scenario, mission21Scenario, mission22Scenario, mission23Scenario, mission24Scenario];
export const privateIslandSecretScenario = secretScenario;
export const allPrivateIslandScenes = [...mission20Scenes, ...mission21Scenes, ...mission22Scenes, ...mission23Scenes, ...mission24Scenes, ...secretScenes];

export const privateIslandLevel: Level = {
  id: LEVEL_ID,
  name: levelMetadata.name,
  description: levelMetadata.description,
  unlockCondition: levelMetadata.unlockCondition,
  missions: [
    { id: mission20Scenario.id, number: 20, title: mission20Scenario.title, objective: mission20Scenario.objective, scenes: mission20Scenes, rewards: mission20Scenario.rewards },
    { id: mission21Scenario.id, number: 21, title: mission21Scenario.title, objective: mission21Scenario.objective, scenes: mission21Scenes, rewards: mission21Scenario.rewards, unlockCondition: 'Complete Mission 20' },
    { id: mission22Scenario.id, number: 22, title: mission22Scenario.title, objective: mission22Scenario.objective, scenes: mission22Scenes, rewards: mission22Scenario.rewards, unlockCondition: 'Complete Mission 21' },
    { id: mission23Scenario.id, number: 23, title: mission23Scenario.title, objective: mission23Scenario.objective, scenes: mission23Scenes, rewards: mission23Scenario.rewards, unlockCondition: 'Complete Mission 22' },
    { id: mission24Scenario.id, number: 24, title: mission24Scenario.title, objective: mission24Scenario.objective, scenes: mission24Scenes, rewards: mission24Scenario.rewards, unlockCondition: 'Complete Mission 23' },
  ],
  secretMission: { id: secretScenario.id, number: 25, title: secretScenario.title, objective: secretScenario.objective, scenes: secretScenes, rewards: secretScenario.rewards, isSecret: true, unlockCondition: 'OPTIMAL at Mission 24 Scenes 24B + 24C' },
};

export { LEVEL_ID, levelMetadata, characters, levelCompletion };
export default privateIslandLevel;
