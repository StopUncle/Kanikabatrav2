// Level 3: The Gala - All missions
import type { Level } from '../types';
import { LEVEL_ID, levelMetadata, characters, levelCompletion } from './metadata';
import { mission11Scenario, mission11Scenes } from './mission-11-entrance';
import { mission12Scenario, mission12Scenes } from './mission-12-first-encounter';
import { mission13Scenario, mission13Scenes } from './mission-13-power-play';
import { mission14Scenario, mission14Scenes } from './mission-14-ex-encounter';
import { mission15Scenario, mission15Scenes } from './mission-15-final-choice';
import { secretScenario, secretScenes } from './secret-architects-gambit';

export const galaScenarios = [mission11Scenario, mission12Scenario, mission13Scenario, mission14Scenario, mission15Scenario];
export const galaSecretScenario = secretScenario;
export const allGalaScenes = [...mission11Scenes, ...mission12Scenes, ...mission13Scenes, ...mission14Scenes, ...mission15Scenes, ...secretScenes];

export const galaLevel: Level = {
  id: LEVEL_ID,
  name: levelMetadata.name,
  description: levelMetadata.description,
  unlockCondition: levelMetadata.unlockCondition,
  missions: [
    { id: mission11Scenario.id, number: 11, title: mission11Scenario.title, objective: mission11Scenario.objective, scenes: mission11Scenes, rewards: mission11Scenario.rewards },
    { id: mission12Scenario.id, number: 12, title: mission12Scenario.title, objective: mission12Scenario.objective, scenes: mission12Scenes, rewards: mission12Scenario.rewards, unlockCondition: 'Complete Mission 11' },
    { id: mission13Scenario.id, number: 13, title: mission13Scenario.title, objective: mission13Scenario.objective, scenes: mission13Scenes, rewards: mission13Scenario.rewards, unlockCondition: 'Complete Mission 12' },
    { id: mission14Scenario.id, number: 14, title: mission14Scenario.title, objective: mission14Scenario.objective, scenes: mission14Scenes, rewards: mission14Scenario.rewards, unlockCondition: 'Complete Mission 13' },
    { id: mission15Scenario.id, number: 15, title: mission15Scenario.title, objective: mission15Scenario.objective, scenes: mission15Scenes, rewards: mission15Scenario.rewards, unlockCondition: 'Complete Mission 14' },
  ],
  secretMission: { id: secretScenario.id, number: 16, title: secretScenario.title, objective: secretScenario.objective, scenes: secretScenes, rewards: secretScenario.rewards, isSecret: true, unlockCondition: 'OPTIMAL at Mission 15 Scenes 15B + 15C' },
};

export { LEVEL_ID, levelMetadata, characters, levelCompletion };
export default galaLevel;
