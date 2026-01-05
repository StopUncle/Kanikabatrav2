// Level 2: The Social Scene - All missions
import type { Level } from '../types';
import { LEVEL_ID, levelMetadata, characters, levelCompletion } from './metadata';
import { mission6Scenario, mission6Scenes } from './mission-6-the-club';
import { mission7Scenario, mission7Scenes } from './mission-7-dating-apps';
import { mission8Scenario, mission8Scenes } from './mission-8-the-setup';
import { mission9Scenario, mission9Scenes } from './mission-9-the-ex';
import { mission10Scenario, mission10Scenes } from './mission-10-social-proof';
import { secretScenario, secretScenes } from './secret-inner-circle';

export const socialSceneScenarios = [
  mission6Scenario,
  mission7Scenario,
  mission8Scenario,
  mission9Scenario,
  mission10Scenario,
];

export const socialSceneSecretScenario = secretScenario;

export const allSocialSceneScenes = [
  ...mission6Scenes,
  ...mission7Scenes,
  ...mission8Scenes,
  ...mission9Scenes,
  ...mission10Scenes,
  ...secretScenes,
];

export const socialSceneLevel: Level = {
  id: LEVEL_ID,
  name: levelMetadata.name,
  description: levelMetadata.description,
  unlockCondition: levelMetadata.unlockCondition,
  missions: [
    {
      id: mission6Scenario.id,
      number: 6,
      title: mission6Scenario.title,
      objective: mission6Scenario.objective,
      scenes: mission6Scenes,
      rewards: mission6Scenario.rewards,
    },
    {
      id: mission7Scenario.id,
      number: 7,
      title: mission7Scenario.title,
      objective: mission7Scenario.objective,
      scenes: mission7Scenes,
      rewards: mission7Scenario.rewards,
      unlockCondition: 'Complete Mission 6',
    },
    {
      id: mission8Scenario.id,
      number: 8,
      title: mission8Scenario.title,
      objective: mission8Scenario.objective,
      scenes: mission8Scenes,
      rewards: mission8Scenario.rewards,
      unlockCondition: 'Complete Mission 7',
    },
    {
      id: mission9Scenario.id,
      number: 9,
      title: mission9Scenario.title,
      objective: mission9Scenario.objective,
      scenes: mission9Scenes,
      rewards: mission9Scenario.rewards,
      unlockCondition: 'Complete Mission 8',
    },
    {
      id: mission10Scenario.id,
      number: 10,
      title: mission10Scenario.title,
      objective: mission10Scenario.objective,
      scenes: mission10Scenes,
      rewards: mission10Scenario.rewards,
      unlockCondition: 'Complete Mission 9',
    },
  ],
  secretMission: {
    id: secretScenario.id,
    number: 11,
    title: secretScenario.title,
    objective: secretScenario.objective,
    scenes: secretScenes,
    rewards: secretScenario.rewards,
    isSecret: true,
    unlockCondition: 'OPTIMAL at Mission 10 Scenes 10B + 10C',
  },
};

export { LEVEL_ID, levelMetadata, characters, levelCompletion };

export default socialSceneLevel;
