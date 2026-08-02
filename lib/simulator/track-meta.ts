import type { ScenarioTrack } from "./types";

/**
 * Track metadata for the branch selector UI.
 *
 * Lives apart from the scenario registry so client components can name
 * a track without pulling every scenario's prose into their bundle.
 */
export const TRACK_META: Record<
  ScenarioTrack,
  { label: string; sublabel: string }
> = {
  female: {
    label: "Feminine",
    sublabel: "The Maris arc · dark-psych at the gala and beyond",
  },
  "male-business": {
    label: "Business Line",
    sublabel: "Power · career · capital · dark-psych in rooms that matter",
  },
  "male-dating": {
    label: "Dating Line",
    sublabel: "Mate selection · BPD/HPD · gaslight · hoover · choose secure",
  },
  anxiety: {
    label: "Self-Regulation",
    sublabel: "Interior work · the 3 a.m. text · urge-surfing · ally routing",
  },
  "toxic-narc": {
    label: "Toxic Narcissist",
    sublabel: "Narc parent · boss · sibling · spouse · in-law · friend",
  },
  "pc-child": {
    label: "Psychopath Child",
    sublabel: "Parental POV · conduct disorder · ages 5 to 20",
  },
  "cluster-b-lab": {
    label: "Cluster-B Lab",
    sublabel: "Short drills · BPD / NPD / ASPD / HPD · audit, diagnose, prescribe",
  },
  "divorce-arc": {
    label: "Divorce Arc",
    sublabel: "Long-form · the speaking, the lawyer, the kids, the year after",
  },
  "loving-mira": {
    label: "Loving Mira",
    sublabel:
      "Long-form BPD narrative · the friend you can't save · learn to stay in love without losing yourself",
  },
  "after-him": {
    label: "After Him",
    sublabel:
      "He left. Reclamation, not grief · no contact, costly signal, the hoover refused, the photo with no charge",
  },
  "after-her": {
    label: "After Her",
    sublabel:
      "She left. Sovereignty, not vengeance · rage is the seductive feeling · become the man, not the message",
  },
};
