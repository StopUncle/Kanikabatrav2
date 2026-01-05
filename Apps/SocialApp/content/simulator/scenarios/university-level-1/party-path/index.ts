import type { ForkScene } from '../../../types';
import { arrivalScenes } from './arrival';
import { firstEncounterScenes } from './first-encounter';
import { calebEncounterScenes } from './caleb-encounter';
import { testScenes } from './the-test';
import { escalationScenes } from './escalation';
import { ticketMomentScenes } from './ticket-moment';
import { failureBranchScenes } from './failure-branches';

export const partyPathScenes: ForkScene[] = [
  ...arrivalScenes,
  ...firstEncounterScenes,
  ...calebEncounterScenes,
  ...testScenes,
  ...escalationScenes,
  ...ticketMomentScenes,
  ...failureBranchScenes,
];

export {
  arrivalScenes,
  firstEncounterScenes,
  calebEncounterScenes,
  testScenes,
  escalationScenes,
  ticketMomentScenes,
  failureBranchScenes,
};
