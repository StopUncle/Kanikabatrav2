// Level 1: University - All missions
import type { Level } from '../types';
import type { DatingScenario } from '../types';
import { LEVEL_ID, levelMetadata, characters, levelCompletion } from './metadata';
// Mission 1: Now uses the new fork-based scenario (The Caldwell Gala)
import { universityLevel1 } from '../../university-level-1';
import { mission2Scenario, mission2Scenes } from './mission-2-dorm';
import { mission3Scenario, mission3Scenes } from './mission-3-first-party';
import { mission4Scenario, mission4Scenes } from './mission-4-study-group';
import { mission5Scenario, mission5Scenes } from './mission-5-love-triangle';
import { secretScenario, secretScenes } from './secret-predators-circle';

// Convert fork scenario to dating scenario format for compatibility
const mission1FromFork: DatingScenario = {
  id: universityLevel1.id,
  levelId: 'university',
  missionNumber: 1,
  title: universityLevel1.title,
  tagline: universityLevel1.tagline,
  description: universityLevel1.description,
  objective: 'Get a ticket to the Caldwell Gala by any means necessary.',
  tier: universityLevel1.tier,
  estimatedMinutes: universityLevel1.estimatedMinutes,
  difficulty: universityLevel1.difficulty,
  characters: universityLevel1.characters,
  scenes: universityLevel1.scenes.map(scene => ({
    ...scene,
    // Convert dialogueChoices/actionChoices to choices
    choices: scene.dialogueChoices?.map(dc => ({
      id: dc.id,
      text: dc.text,
      nextSceneId: dc.nextSceneId,
      isOptimal: dc.isOptimal,
      tactic: dc.tactic,
      feedback: dc.reaction?.bodyLanguage || dc.reaction?.text,
      xpBonus: dc.reaction?.scoreImpact > 0 ? dc.reaction.scoreImpact : undefined,
    })) || scene.actionChoices?.map(ac => ({
      id: ac.id,
      text: ac.text,
      nextSceneId: ac.nextSceneId,
      feedback: ac.subtext,
    })) || scene.choices,
  })),
  rewards: { power: 50, mask: 50, vision: 50 },
  startSceneId: universityLevel1.startSceneId,
};

// Use fork-based Mission 1 (The Caldwell Gala), standard for others
export const universityScenarios = [
  mission1FromFork,
  mission2Scenario,
  mission3Scenario,
  mission4Scenario,
  mission5Scenario,
];

export const universitySecretScenario = secretScenario;

// Export mission 1 scenes from fork scenario
const mission1Scenes = universityLevel1.scenes;

// Export all scenes (for combined scene graph if needed)
export const allUniversityScenes = [
  ...mission1Scenes,
  ...mission2Scenes,
  ...mission3Scenes,
  ...mission4Scenes,
  ...mission5Scenes,
  ...secretScenes,
];

// Level summary
export const universityLevel: Level = {
  id: LEVEL_ID,
  name: levelMetadata.name,
  description: levelMetadata.description,
  unlockCondition: levelMetadata.unlockCondition,
  missions: [
    {
      id: mission1FromFork.id,
      number: 1,
      title: mission1FromFork.title,
      objective: mission1FromFork.objective,
      scenes: mission1Scenes as any,
      rewards: mission1FromFork.rewards,
    },
    {
      id: mission2Scenario.id,
      number: 2,
      title: mission2Scenario.title,
      objective: mission2Scenario.objective,
      scenes: mission2Scenes,
      rewards: mission2Scenario.rewards,
      unlockCondition: 'Complete Mission 1',
    },
    {
      id: mission3Scenario.id,
      number: 3,
      title: mission3Scenario.title,
      objective: mission3Scenario.objective,
      scenes: mission3Scenes,
      rewards: mission3Scenario.rewards,
      unlockCondition: 'Complete Mission 2',
    },
    {
      id: mission4Scenario.id,
      number: 4,
      title: mission4Scenario.title,
      objective: mission4Scenario.objective,
      scenes: mission4Scenes,
      rewards: mission4Scenario.rewards,
      unlockCondition: 'Complete Mission 3',
    },
    {
      id: mission5Scenario.id,
      number: 5,
      title: mission5Scenario.title,
      objective: mission5Scenario.objective,
      scenes: mission5Scenes,
      rewards: mission5Scenario.rewards,
      unlockCondition: 'Complete Mission 4',
    },
  ],
  secretMission: {
    id: secretScenario.id,
    number: 6,
    title: secretScenario.title,
    objective: secretScenario.objective,
    scenes: secretScenes,
    rewards: secretScenario.rewards,
    isSecret: true,
    unlockCondition: 'OPTIMAL at Mission 5 Scenes 5B + 5C',
  },
};

// Re-export metadata
export { LEVEL_ID, levelMetadata, characters, levelCompletion };

export default universityLevel;
