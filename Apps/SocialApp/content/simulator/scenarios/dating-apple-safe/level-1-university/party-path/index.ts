/**
 * Party Path - Complete Export
 * All scenes for the party path in University Level 1 (Apple-Safe Version)
 *
 * This path teaches pattern recognition through the Maris encounter:
 * - Recognizing love-bombing and instant intensity
 * - Observing how narcissists treat "supply"
 * - Setting boundaries and maintaining them
 * - The cautionary tale of Caleb (what happens to supply)
 */

import { arrivalScenes } from './arrival';
import { firstEncounterScenes } from './first-encounter';
import { calebEncounterScenes } from './caleb-encounter';
import { theTestScenes } from './the-test';
import { partyEndingScenes } from './endings';

export const partyPathScenes = [
  ...arrivalScenes,
  ...firstEncounterScenes,
  ...calebEncounterScenes,
  ...theTestScenes,
  ...partyEndingScenes,
];

export {
  arrivalScenes,
  firstEncounterScenes,
  calebEncounterScenes,
  theTestScenes,
  partyEndingScenes,
};
