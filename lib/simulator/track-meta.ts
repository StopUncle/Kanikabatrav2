import type { ScenarioTrack } from "./types";

/**
 * Track metadata for the branch selector UI.
 *
 * Lives apart from the scenario registry so client components can name
 * a track without pulling every scenario's prose into their bundle.
 */
export const TRACK_META: Record<
  ScenarioTrack,
  { label: string; sublabel: string; href: string }
> = {
  female: {
    label: "Feminine",
    sublabel: "The Maris arc · dark-psych at the gala and beyond",
    href: "/app/train/browse?track=female",
  },
  "male-business": {
    label: "Business Line",
    sublabel: "Power · career · capital · dark-psych in rooms that matter",
    href: "/app/train/browse?track=male-business",
  },
  "male-dating": {
    label: "Dating Line",
    sublabel: "Mate selection · BPD/HPD · gaslight · hoover · choose secure",
    href: "/app/train/browse?track=male-dating",
  },
  anxiety: {
    label: "Self-Regulation",
    sublabel: "Interior work · the 3 a.m. text · urge-surfing · ally routing",
    href: "/app/train/browse?track=anxiety",
  },
  "toxic-narc": {
    label: "Toxic Narcissist",
    sublabel: "Narc parent · boss · sibling · spouse · in-law · friend",
    href: "/app/train/browse?track=toxic-narc",
  },
  "pc-child": {
    label: "Psychopath Child",
    sublabel: "Parental POV · conduct disorder · ages 5 to 20",
    href: "/app/train/browse?track=pc-child",
  },
  "cluster-b-lab": {
    label: "Cluster-B Lab",
    sublabel: "Short drills · BPD / NPD / ASPD / HPD · audit, diagnose, prescribe",
    href: "/app/train/browse?track=cluster-b-lab",
  },
  "divorce-arc": {
    label: "Divorce Arc",
    sublabel: "Long-form · the speaking, the lawyer, the kids, the year after",
    href: "/app/train/browse?track=divorce-arc",
  },
  "loving-mira": {
    label: "Loving Mira",
    sublabel:
      "Long-form BPD narrative · the friend you can't save · learn to stay in love without losing yourself",
    href: "/app/train/browse?track=loving-mira",
  },
  "after-him": {
    label: "After Him",
    sublabel:
      "He left. Reclamation, not grief · no contact, costly signal, the hoover refused, the photo with no charge",
    href: "/app/train/browse?track=after-him",
  },
  "after-her": {
    label: "After Her",
    sublabel:
      "She left. Sovereignty, not vengeance · rage is the seductive feeling · become the man, not the message",
    href: "/app/train/browse?track=after-her",
  },
};
