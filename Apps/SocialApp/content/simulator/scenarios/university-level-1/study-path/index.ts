import type { ForkScene } from '../../../types';
import { arrivalScenes } from './arrival';
import { meetingCaseyScenes } from './meeting-casey';
import { rapportScenes } from './rapport';
import { discoveryScenes } from './discovery';
import { caseyTwistScenes } from './casey-twist';
import { theAskScenes } from './the-ask';
import { failureBranchScenes } from './failure-branches';

export const studyPathScenes: ForkScene[] = [
  ...arrivalScenes,
  ...meetingCaseyScenes,
  ...rapportScenes,
  ...discoveryScenes,
  ...caseyTwistScenes,
  ...theAskScenes,
  ...failureBranchScenes,
];

export {
  arrivalScenes,
  meetingCaseyScenes,
  rapportScenes,
  discoveryScenes,
  caseyTwistScenes,
  theAskScenes,
  failureBranchScenes,
};
