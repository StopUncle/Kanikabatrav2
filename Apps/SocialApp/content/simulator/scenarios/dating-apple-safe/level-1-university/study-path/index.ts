/**
 * Study Path - Complete Export
 * All scenes for the study path in University Level 1 (Apple-Safe Version)
 *
 * This path teaches pattern recognition through the Casey encounter:
 * - Recognizing anxious attachment patterns
 * - Understanding over-giving as a warning sign
 * - Learning to set healthy boundaries
 * - Modeling genuine connection vs. transactional relationships
 */

import { arrivalScenes } from './arrival';
import { meetingCaseyScenes } from './meeting-casey';
import { theRevealScenes } from './the-reveal';
import { studyEndingScenes } from './endings';

export const studyPathScenes = [
  ...arrivalScenes,
  ...meetingCaseyScenes,
  ...theRevealScenes,
  ...studyEndingScenes,
];

export {
  arrivalScenes,
  meetingCaseyScenes,
  theRevealScenes,
  studyEndingScenes,
};
