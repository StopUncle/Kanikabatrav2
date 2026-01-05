// Level 2: The Social Scene - Export Hub (Apple-Safe Version)
// DEFENSIVE FRAMING: Learn to RECOGNIZE manipulation tactics, not execute them

// Level metadata and characters
export * from './metadata';

// Mission 6: The Club - Recognize social manipulation tactics
export {
  mission6Scenario,
  mission6Scenes,
  MISSION_ID as MISSION_6_ID,
  missionMetadata as mission6Metadata,
  rewards as mission6Rewards,
} from './mission-6-the-club';

// Mission 7: Dating Apps - Spot digital red flags
export {
  mission7Scenario,
  mission7Scenes,
  MISSION_ID as MISSION_7_ID,
  missionMetadata as mission7Metadata,
  rewards as mission7Rewards,
} from './mission-7-dating-apps';

// Mission 8: The Setup - Recognize triangulation and social pressure
export {
  mission8Scenario,
  mission8Scenes,
  MISSION_ID as MISSION_8_ID,
  missionMetadata as mission8Metadata,
  rewards as mission8Rewards,
} from './mission-8-the-setup';

// Mission 9: The Ex - Recognize NPD hoovering and DARVO patterns
export {
  mission9Scenario,
  mission9Scenes,
  MISSION_ID as MISSION_9_ID,
  missionMetadata as mission9Metadata,
  rewards as mission9Rewards,
} from './mission-9-the-ex';

// Mission 10: Social Proof - Recognize preselection and manufactured scarcity
export {
  mission10Scenario,
  mission10Scenes,
  MISSION_ID as MISSION_10_ID,
  missionMetadata as mission10Metadata,
  rewards as mission10Rewards,
} from './mission-10-social-proof';

// Secret Mission: Recognizing Coercion - Spot coercive group dynamics
export {
  secretScenario,
  secretScenes,
  MISSION_ID as SECRET_MISSION_ID,
  missionMetadata as secretMissionMetadata,
  rewards as secretRewards,
} from './secret-recognizing-coercion';

// Aggregate exports
import { mission6Scenario } from './mission-6-the-club';
import { mission7Scenario } from './mission-7-dating-apps';
import { mission8Scenario } from './mission-8-the-setup';
import { mission9Scenario } from './mission-9-the-ex';
import { mission10Scenario } from './mission-10-social-proof';
import { secretScenario } from './secret-recognizing-coercion';

export const level2Scenarios = [
  mission6Scenario,
  mission7Scenario,
  mission8Scenario,
  mission9Scenario,
  mission10Scenario,
];

export const level2SecretScenario = secretScenario;

export const allLevel2Scenarios = [...level2Scenarios, level2SecretScenario];
