/**
 * Cluster-B Identification Lab track. Short-format diagnostic drills
 * that train the player to recognise the four Cluster-B registers
 * (BPD / ASPD / NPD / HPD) from specific real-world artefacts —
 * voicemails, lunches, emails, family moments.
 *
 * Format convention: 6-8 scenes each, ~7-9 minutes, one specific
 * artefact, one diagnostic choice, one prescription. The drill shape
 * is deliberately repetitive across the track — seeing the same
 * audit → diagnose → prescribe pattern many times is how the player
 * internalises the diagnostic instincts.
 *
 * Phase 4: L1-1 (BPD) and L1-2 (ASPD) as voice-locks. L2+ will cover
 * NPD (the workplace subordinate), HPD (the friend's engagement
 * announcement), and comorbid registers (BPD + NPD, ASPD with a
 * functional mask).
 */

import type { Scenario } from "../../types";
import clusterBLab11 from "./l1-1-the-voicemail";
import clusterBLab12 from "./l1-2-the-mentor-lunch";
import clusterBLab13 from "./l1-3-the-meeting-notes";
import clusterBLab14 from "./l1-4-the-engagement-announcement";
import clusterBLab21 from "./l2-1-the-friday-slack";

export const CLUSTER_B_LAB_SCENARIOS: Scenario[] = [
  clusterBLab11,
  clusterBLab12,
  clusterBLab13,
  clusterBLab14,
  clusterBLab21,
];

export const CLUSTER_B_LAB_LEVEL_TITLES: Record<
  number,
  { title: string; blurb: string }
> = {
  1: {
    title: "The Voice in the Room",
    blurb:
      "The four Cluster-B registers, each through one specific artefact. Audit, diagnose, prescribe.",
  },
  2: {
    title: "The Professional Register",
    blurb:
      "Cluster-B at work — the subordinate, the boss, the client, the peer. Same diagnostic instincts, higher professional cost.",
  },
  3: {
    title: "The Family Register",
    blurb:
      "Cluster-B at family tables — the cousin, the aunt, the sibling-in-law. The drill that most readers need twice.",
  },
  4: {
    title: "Comorbidity",
    blurb:
      "Two registers at once. BPD + NPD. ASPD with a functional mask. The diagnostic becomes a Venn diagram.",
  },
};
