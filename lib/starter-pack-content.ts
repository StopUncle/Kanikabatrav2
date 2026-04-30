// The Pattern Recognition Starter Pack, content for the second free
// email-capture lead magnet alongside the Mini Dark Mirror. Per the
// roadmap (research/multimillion-roadmap/11-phase-1-detailed.md) the
// goal is owned-email capture, not paid conversion in this surface.
//
// Five named manipulation patterns, each with: definition, 3 concrete
// examples, the "tell" that makes it diagnosable, and a punchline beat
// in Kanika voice. The starter pack lands as a styled HTML email; no
// PDF download required (the email IS the deliverable).
//
// Patterns deliberately mix fresh names (Mirror-Bonding) with widely-
// recognised ones (DARVO, future-faking) so visitors who already know
// some terms still get a name they don't have. This is the broader
// ground where "Mirror-Bonding" eventually saturates per the named-
// framework deployment plan in research/multimillion-roadmap/12-content-
// engine.md.

export interface StarterPattern {
  /** Proper-noun name. */
  name: string;
  /** One-line plain-English definition. */
  definition: string;
  /** 2-3 concrete examples a reader can pattern-match against their
   *  own life. Specific over abstract. Each example a single line. */
  examples: string[];
  /** The tell, a single observable signal that distinguishes this
   *  pattern from generic relationship friction. */
  tell: string;
  /** A short Kanika-voice closer, deadpan and clinical. */
  closer: string;
}

export const STARTER_PATTERNS: StarterPattern[] = [
  {
    name: "Mirror-Bonding",
    definition:
      "When someone reflects your traits, taste, and identity back at you to manufacture a false-twin bond before they isolate you.",
    examples: [
      "Month 2, they have suddenly adopted your music taste, your reading list, and one of your hobbies.",
      "Month 3, they say \"you're the only one who really gets me\" and mean it as proof you're special, not as a confession that they have nobody.",
      "Month 4, friends notice they sound like you. You take it as compatibility. It's not.",
    ],
    tell:
      "The mirroring intensifies on traits THEY didn't have before they met you. Real compatibility shows up in shared values; Mirror-Bonding shows up in adopted preferences.",
    closer:
      "You felt seen. They were watching.",
  },
  {
    name: "The Apology That Isn't One (DARVO)",
    definition:
      "An apology grammatically present and operationally absent. Three moves stacked: Deny what happened, Attack the person describing it, Reverse Victim and Offender.",
    examples: [
      "\"I'm sorry you feel that way.\" The structure is the apology; the content is your perception was wrong.",
      "\"I'm sorry, but you have to admit you were also...\" The pivot mid-sentence is the move.",
      "\"I'm sorry I'm not perfect like you.\" Now the apology is mockery and you're the bad guy for accepting it.",
    ],
    tell:
      "After the apology, you feel worse about yourself than before they apologised. Real apologies leave both people lighter.",
    closer:
      "If you have to defend why their apology hurt you, it wasn't one.",
  },
  {
    name: "Future-Faking",
    definition:
      "Stealing your patience by spending currency they don't have, the future. Promises of tomorrow used to extract behaviour today.",
    examples: [
      "Month 3: the wedding-someday talk. Month 9: the trip-someday talk. Month 18: nothing has happened.",
      "\"When things settle down, we'll move in together.\" Things never settle down. The promise was the move.",
      "The big plans always require you waiting. The small plans always require you delivering.",
    ],
    tell:
      "Promises happen during conflict, not during peace. They future-fake when they sense you're about to leave; they don't follow through when you don't.",
    closer:
      "If their words and their calendar don't agree, believe the calendar.",
  },
  {
    name: "Triangulation",
    definition:
      "Inserting a real or fictional third party into the relationship so you compete for their approval instead of evaluating it.",
    examples: [
      "\"My ex used to do this thing...\" in month 2. The ex is the bar. You start competing.",
      "\"My coworker thinks you're great, by the way.\" The coworker may not exist; the function does.",
      "Suddenly mentioning attractive people they know, then watching your face.",
    ],
    tell:
      "The third party always conveniently confirms the manipulator's framing. Real third parties contradict sometimes; fictional ones never do.",
    closer:
      "The third person in your relationship is also them.",
  },
  {
    name: "Hoovering",
    definition:
      "The \"I miss you\" message six months after the breakup. Not a feeling. A tactic, named after the vacuum brand because it's designed to suck you back in.",
    examples: [
      "It lands when you're NOT in active grief. They wait until you've started rebuilding.",
      "It lands AFTER they've replaced you. They don't reach out alone; they reach out bored.",
      "It lands ONLY after they've burned the replacement. You're not the priority; you're the backup file.",
    ],
    tell:
      "The hoover happens at THEIR convenience, not at the moment of your fragility. Real reconnection requests show up when you're at your worst, not when they're at theirs.",
    closer:
      "Block the number. They're not missing you. They're auditing inventory.",
  },
];

export const STARTER_PACK_INFO = {
  title: "The Pattern Recognition Starter Pack",
  subtitle: "Five named tactics. Specific examples. The tell for each.",
  description:
    "A clinical-direct starter on the most common manipulator patterns, in your inbox in the next 60 seconds. Free. No upsell page first.",
};
