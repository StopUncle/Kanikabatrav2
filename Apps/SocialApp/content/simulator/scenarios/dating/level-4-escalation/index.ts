// Level 4: Escalation - All missions
import type { Level } from '../types';
import { LEVEL_ID, levelMetadata, characters, levelCompletion } from './metadata';
import { mission16Scenario, mission16Scenes } from './mission-16-aftermath';
import { mission17Scenario, mission17Scenes } from './mission-17-invitation';
import { mission18Scenario, mission18Scenes } from './mission-18-preparation';
import { mission19Scenario, mission19Scenes } from './mission-19-private-jet';
import { secretScenario, secretScenes } from './secret-infiltration';

export const escalationScenarios = [mission16Scenario, mission17Scenario, mission18Scenario, mission19Scenario];
export const escalationSecretScenario = secretScenario;
export const allEscalationScenes = [...mission16Scenes, ...mission17Scenes, ...mission18Scenes, ...mission19Scenes, ...secretScenes];

export const escalationLevel: Level = {
  id: LEVEL_ID,
  name: levelMetadata.name,
  description: levelMetadata.description,
  unlockCondition: levelMetadata.unlockCondition,
  missions: [
    { id: mission16Scenario.id, number: 16, title: mission16Scenario.title, objective: mission16Scenario.objective, scenes: mission16Scenes, rewards: mission16Scenario.rewards },
    { id: mission17Scenario.id, number: 17, title: mission17Scenario.title, objective: mission17Scenario.objective, scenes: mission17Scenes, rewards: mission17Scenario.rewards, unlockCondition: 'Complete Mission 16' },
    { id: mission18Scenario.id, number: 18, title: mission18Scenario.title, objective: mission18Scenario.objective, scenes: mission18Scenes, rewards: mission18Scenario.rewards, unlockCondition: 'Complete Mission 17' },
    { id: mission19Scenario.id, number: 19, title: mission19Scenario.title, objective: mission19Scenario.objective, scenes: mission19Scenes, rewards: mission19Scenario.rewards, unlockCondition: 'Complete Mission 18' },
  ],
  secretMission: { id: secretScenario.id, number: 20, title: secretScenario.title, objective: secretScenario.objective, scenes: secretScenes, rewards: secretScenario.rewards, isSecret: true, unlockCondition: 'OPTIMAL at Mission 19 Scenes 19B + 19C' },
};

export { LEVEL_ID, levelMetadata, characters, levelCompletion };
export default escalationLevel;
