// The Sociopath Test, items, scoring, profiles, and norms.
//
// Built on the Levenson Self-Report Psychopathy Scale (LSRP), Levenson,
// Kiehl & Fitzpatrick 1995, J Pers Soc Psychol 68(1), 151-158. The LSRP
// is a 26-item self-report instrument with two subscales:
//
//   • Primary psychopathy (16 items): callousness, manipulativeness,
//     selfishness, lack of empathy or remorse. The cold, calculated core.
//   • Secondary psychopathy (10 items): impulsivity, frustration-prone,
//     antisocial reactivity, poor planning. The hot, reactive shell.
//
// Items are scored 1-4 on a Likert (Disagree strongly → Agree strongly).
// Seven items are reverse-scored (5, 12, 14, 15, 16 in Primary; 19, 23
// in Secondary, using the canonical numbering). Subscale scores are
// summed; total psychopathy is the sum of both.
//
// Calibration uses Levenson 1995 college-sample norms (n=487):
//   Primary: M = 31.0, SD = 6.7,   range 16-64
//   Secondary: M = 20.2, SD = 4.6,  range 10-40
//
// Tier bands:
//   Low      < M - 1 SD  (~16th percentile)
//   Average  M ± 1 SD    (~middle two-thirds)
//   High     M + 1 SD … M + 2 SD (~84th-98th percentile)
//   Very High > M + 2 SD (~top 2-3%)
//
// IMPORTANT: This is not a clinical diagnosis. The LSRP is a research
// instrument, not a diagnostic one. Surface this everywhere.
//
// Voice locked to reference/KANIKA-VOICE.md. Items kept close to the
// canonical LSRP wording so the construct measurement stays valid;
// landing-page and result-page prose is full Kanika register, second-
// person, no reassurance, no life-coach language.

import { SOCIOPATH_NORMS } from "@/lib/quiz-sociopath-norms";

export type SociopathSubscale = "primary" | "secondary";
export type SociopathTier = "low" | "average" | "high" | "very-high";
export type SociopathQuadrant =
  | "functional-self" //  Low Primary, Low Secondary — no pattern
  | "the-calculator" //   High Primary, Low Secondary — cold-core, controlled
  | "the-hot-wire" //     Low Primary, High Secondary — reactive, no cold core
  | "the-full-pattern"; // High Primary, High Secondary — both subscales lit

export interface SociopathItem {
  /** 1-26, matches Levenson 1995 canonical numbering. */
  id: number;
  /** Likert statement the user agrees/disagrees with. */
  statement: string;
  /** Which subscale the item loads on. */
  subscale: SociopathSubscale;
  /** True for items where Agree = lower psychopathy score (5 - raw). */
  reverseScored: boolean;
}

export interface SociopathScores {
  /** Sum of Primary items, 16-64. */
  primary: number;
  /** Sum of Secondary items, 10-40. */
  secondary: number;
  /** Sum of both, 26-104. */
  total: number;
}

export interface SociopathSubscaleResult {
  subscale: SociopathSubscale;
  rawScore: number;
  /** 0-100 percentile relative to Levenson 1995 college sample norms. */
  percentile: number;
  tier: SociopathTier;
}

export interface SociopathDiagnosis {
  primary: SociopathSubscaleResult;
  secondary: SociopathSubscaleResult;
  /** Combined quadrant interpretation. */
  quadrant: SociopathQuadrant;
  /** Headline shown on results page. */
  headline: string;
  /** One-line tagline under the headline. */
  tagline: string;
}

// -----------------------------------------------------------------------
// THE 26 ITEMS
// -----------------------------------------------------------------------
//
// Items 1-16 → Primary psychopathy. 5, 12, 14, 15, 16 are reverse-scored
// (i.e. items where agreeing means lower psychopathy on the construct).
// Items 17-26 → Secondary psychopathy. 19 and 23 are reverse-scored.
//
// Wording stays close to Levenson 1995. Light edits where the original
// phrasing was awkward enough to compromise comprehension or sounded
// dated (1995 idiom). The construct each item measures is preserved
// exactly. If you reword these, recheck against the source paper.

export const SOCIOPATH_ITEMS: SociopathItem[] = [
  // -- Primary, direct-keyed --
  {
    id: 1,
    statement: "Success is survival of the fittest. The people who lose were never going to win.",
    subscale: "primary",
    reverseScored: false,
  },
  {
    id: 2,
    statement: "What's right is whatever I can get away with.",
    subscale: "primary",
    reverseScored: false,
  },
  {
    id: 3,
    statement: "In a world like this one, I'm entitled to do anything I can get away with to succeed.",
    subscale: "primary",
    reverseScored: false,
  },
  {
    id: 4,
    statement: "My main purpose in life is acquiring as much as I can while I can.",
    subscale: "primary",
    reverseScored: false,
  },
  // Note: item 5 in Levenson's original numbering is "Making a lot of
  // money is my most important goal" — direct-keyed, NOT reverse. The
  // reverse-keyed items in Primary are the ones below (10, 12, 14, 15,
  // 16). Several public reproductions of LSRP misstate which items
  // reverse; this list follows Levenson 1995 Table 1.
  {
    id: 5,
    statement: "Making serious money is my most important goal.",
    subscale: "primary",
    reverseScored: false,
  },
  {
    id: 6,
    statement: "I let other people worry about higher values. I focus on the result.",
    subscale: "primary",
    reverseScored: false,
  },
  {
    id: 7,
    statement: "People who are stupid enough to get ripped off usually deserved it.",
    subscale: "primary",
    reverseScored: false,
  },
  {
    id: 8,
    statement: "Looking out for myself is my top priority.",
    subscale: "primary",
    reverseScored: false,
  },
  {
    id: 9,
    statement: "I tell people what they want to hear so they will do what I want.",
    subscale: "primary",
    reverseScored: false,
  },
  // -- Primary, reverse-keyed (Agree = lower psychopathy) --
  {
    id: 10,
    statement: "I would be upset if my success came at someone else's expense.",
    subscale: "primary",
    reverseScored: true,
  },
  {
    id: 11,
    statement: "I admire a really clever scam.",
    subscale: "primary",
    reverseScored: false,
  },
  {
    id: 12,
    statement: "I make a point of trying not to hurt people in pursuit of my goals.",
    subscale: "primary",
    reverseScored: true,
  },
  {
    id: 13,
    statement: "Reading and steering other people's feelings is one of my pleasures.",
    subscale: "primary",
    reverseScored: false,
  },
  {
    id: 14,
    statement:
      "When something I say or do causes someone real emotional pain, it stays with me.",
    subscale: "primary",
    reverseScored: true,
  },
  {
    id: 15,
    statement: "Even when I really need someone to say yes, I won't lie to get there.",
    subscale: "primary",
    reverseScored: true,
  },
  {
    id: 16,
    statement: "Cheating is wrong because it's unfair to other people.",
    subscale: "primary",
    reverseScored: true,
  },

  // -- Secondary, direct-keyed --
  {
    id: 17,
    statement: "The same kinds of trouble keep finding me.",
    subscale: "secondary",
    reverseScored: false,
  },
  {
    id: 18,
    statement: "I'm bored often.",
    subscale: "secondary",
    reverseScored: false,
  },
  // -- Secondary, reverse-keyed --
  {
    id: 19,
    statement: "I can stay locked onto one goal for a long stretch of time.",
    subscale: "secondary",
    reverseScored: true,
  },
  {
    id: 20,
    statement: "I don't plan things very far in advance.",
    subscale: "secondary",
    reverseScored: false,
  },
  {
    id: 21,
    statement: "I quickly lose interest in tasks I start.",
    subscale: "secondary",
    reverseScored: false,
  },
  {
    id: 22,
    statement: "Most of my problems trace back to other people not understanding me.",
    subscale: "secondary",
    reverseScored: false,
  },
  {
    id: 23,
    statement: "Before I do anything, I carefully think through the possible consequences.",
    subscale: "secondary",
    reverseScored: true,
  },
  {
    id: 24,
    statement: "I've been in a lot of shouting matches with other people.",
    subscale: "secondary",
    reverseScored: false,
  },
  {
    id: 25,
    statement: "When I get frustrated, I let off steam by blowing up.",
    subscale: "secondary",
    reverseScored: false,
  },
  {
    id: 26,
    statement: "Love is overrated.",
    subscale: "secondary",
    reverseScored: false,
  },
];

// -----------------------------------------------------------------------
// LIKERT OPTIONS
// -----------------------------------------------------------------------

export interface LikertOption {
  value: 1 | 2 | 3 | 4;
  label: string;
  /** Short label for compact mobile rendering. */
  shortLabel: string;
}

export const LIKERT_OPTIONS: readonly LikertOption[] = [
  { value: 1, label: "Disagree strongly", shortLabel: "Strongly disagree" },
  { value: 2, label: "Disagree", shortLabel: "Disagree" },
  { value: 3, label: "Agree", shortLabel: "Agree" },
  { value: 4, label: "Agree strongly", shortLabel: "Strongly agree" },
] as const;

// -----------------------------------------------------------------------
// SCORING
// -----------------------------------------------------------------------

/**
 * Convert a raw Likert response (1-4) to its scored value, handling the
 * reverse-keyed items by inverting (5 - raw). For direct items the raw
 * value is the scored value.
 */
export function scoreItem(item: SociopathItem, rawValue: 1 | 2 | 3 | 4): number {
  return item.reverseScored ? 5 - rawValue : rawValue;
}

/**
 * Score the full instrument from a map of itemId → Likert raw value.
 * Items missing from the answer map are treated as midpoint (2.5),
 * which produces a defensible interpolation if a question was skipped.
 * In practice the take flow blocks submission until all 26 are answered;
 * this fallback is for robustness only.
 */
export function calculateSociopathScores(
  answers: Record<number, 1 | 2 | 3 | 4>,
): SociopathScores {
  let primary = 0;
  let secondary = 0;
  for (const item of SOCIOPATH_ITEMS) {
    const raw = answers[item.id];
    const scored =
      raw === undefined ? 2.5 : scoreItem(item, raw); // midpoint fallback
    if (item.subscale === "primary") primary += scored;
    else secondary += scored;
  }
  return {
    primary: Math.round(primary * 10) / 10,
    secondary: Math.round(secondary * 10) / 10,
    total: Math.round((primary + secondary) * 10) / 10,
  };
}

/**
 * Convert a raw subscale score to a percentile (0-100) using a normal
 * distribution approximation around Levenson 1995 college-sample norms.
 * The approximation uses the standard normal CDF on a z-score, which
 * is accurate to within a percentile or two for any score within ±3 SD.
 */
export function scoreToPercentile(
  score: number,
  subscale: SociopathSubscale,
): number {
  const norms = SOCIOPATH_NORMS[subscale];
  const z = (score - norms.mean) / norms.sd;
  // Abramowitz & Stegun 26.2.17 polynomial approximation of the
  // standard normal CDF, accurate to ~1.5e-7. Used everywhere from
  // Excel's NORMSDIST to research stats packages.
  const p = standardNormalCdf(z);
  return Math.round(Math.max(0, Math.min(100, p * 100)));
}

/**
 * Standard normal CDF via the A&S 26.2.17 polynomial approximation. Pure
 * function so it's trivially testable; identical to the formula every
 * stats library uses under the hood.
 */
function standardNormalCdf(z: number): number {
  const sign = z < 0 ? -1 : 1;
  const x = Math.abs(z) / Math.SQRT2;
  // erf approximation
  const t = 1 / (1 + 0.3275911 * x);
  const y =
    1 -
    ((((1.061405429 * t - 1.453152027) * t + 1.421413741) * t - 0.284496736) *
      t +
      0.254829592) *
      t *
      Math.exp(-x * x);
  return 0.5 * (1 + sign * y);
}

/**
 * Bucket a score into a tier given the subscale's mean + SD norms.
 * Uses 1-SD bands: <M-1SD = low, ±1SD = average, +1 to +2SD = high,
 * >+2SD = very high.
 */
export function scoreToTier(
  score: number,
  subscale: SociopathSubscale,
): SociopathTier {
  const norms = SOCIOPATH_NORMS[subscale];
  if (score < norms.mean - norms.sd) return "low";
  if (score <= norms.mean + norms.sd) return "average";
  if (score <= norms.mean + 2 * norms.sd) return "high";
  return "very-high";
}

/**
 * Build a full subscale result row (raw + percentile + tier) from a score.
 */
export function buildSubscaleResult(
  rawScore: number,
  subscale: SociopathSubscale,
): SociopathSubscaleResult {
  return {
    subscale,
    rawScore,
    percentile: scoreToPercentile(rawScore, subscale),
    tier: scoreToTier(rawScore, subscale),
  };
}

/**
 * Determine the combined quadrant from the two subscale tiers.
 * "High" here means tier of "high" or "very-high" (>+1SD).
 */
export function determineQuadrant(
  primary: SociopathSubscaleResult,
  secondary: SociopathSubscaleResult,
): SociopathQuadrant {
  const primaryHigh = primary.tier === "high" || primary.tier === "very-high";
  const secondaryHigh =
    secondary.tier === "high" || secondary.tier === "very-high";
  if (primaryHigh && secondaryHigh) return "the-full-pattern";
  if (primaryHigh && !secondaryHigh) return "the-calculator";
  if (!primaryHigh && secondaryHigh) return "the-hot-wire";
  return "functional-self";
}

/**
 * Build the complete diagnosis from raw answers. Single entry point
 * called by the take flow after the final question.
 */
export function generateSociopathDiagnosis(
  answers: Record<number, 1 | 2 | 3 | 4>,
): SociopathDiagnosis {
  const scores = calculateSociopathScores(answers);
  const primary = buildSubscaleResult(scores.primary, "primary");
  const secondary = buildSubscaleResult(scores.secondary, "secondary");
  const quadrant = determineQuadrant(primary, secondary);
  const profile = QUADRANT_PROFILES[quadrant];
  return {
    primary,
    secondary,
    quadrant,
    headline: profile.name,
    tagline: profile.tagline,
  };
}

// -----------------------------------------------------------------------
// QUADRANT PROFILES — the four combined-result interpretations
// -----------------------------------------------------------------------
//
// Each profile is written for the person who got it. Specific.
// Recognisable. Voice signatures from KANIKA-VOICE.md throughout:
// brand/object anchors where they fit, the grade, soft-old-money
// register, scenes ending on physical beats, no reassurance.

export interface QuadrantProfile {
  quadrant: SociopathQuadrant;
  name: string;
  tagline: string;
  /** What this combined result actually means for the person. */
  description: string;
  /** What this person looks like in their own life. */
  selfPattern: string;
  /** What this person looks like to other people. */
  externalRead: string;
  /** Three places this pattern shows up the person may not have noticed. */
  blindSpots: string[];
  /** What to do with this score. Not therapy. Direct. */
  whatNext: string;
}

export const QUADRANT_PROFILES: Record<SociopathQuadrant, QuadrantProfile> = {
  "functional-self": {
    quadrant: "functional-self",
    name: "The Functional Self",
    tagline: "Whatever you came here looking for, the data did not find it.",
    description:
      "Both your Primary and Secondary subscales sit in the bottom two-thirds of the population. You are not, by any defensible reading of this instrument, exhibiting psychopathic patterns. You may have arrived here because someone called you cold, or because a relationship ended badly and you wanted to know whether the diagnosis was yours, or because the curiosity bit you on a Tuesday and you took the test. The result is the result.",
    selfPattern:
      "You feel guilt at roughly the rate the population does. You plan ahead. You hold grudges, certainly, but they cost you something to hold. When you've hurt someone, the memory has weight. None of this is virtue, it's the baseline. You are reading these sentences and noticing they describe you. The people the test is built to detect would be reading them and noticing they don't.",
    externalRead:
      "People around you describe you as reasonable, occasionally as guarded, rarely as cold. The friends who know you well would not be surprised by this score. The friends who don't would, if asked, slightly overestimate your darkness because you have learned that being underestimated is useful.",
    blindSpots: [
      "If you scored close to the population mean, you are statistically average, which most people experience as a small disappointment when they were hoping to be exceptional.",
      "Low scores on both subscales correlate with anxiety about whether one is, in fact, capable of the behaviours the test names. Most people who worry are not the ones the test catches.",
      "If you came here because someone *else* might be the sociopath, the relevant test is the Daughter Pattern Assessment or the partner-detection chapters of the book. Not this one.",
    ],
    whatNext:
      "If you're reading this score and feeling vaguely unsatisfied, that itself is the data. The cultural pull toward wanting a darker score than you have is its own fascinating tell, the people the test is built to detect almost universally believe their score is normal. Wanting to be the predator is a different pattern from being one.",
  },
  "the-calculator": {
    quadrant: "the-calculator",
    name: "The Calculator",
    tagline: "Cold core. Controlled exterior. The boardroom version.",
    description:
      "Your Primary score is high or very high; your Secondary score is not. This is the rarest and most strategically dangerous of the four configurations. The lights of psychopathy are on, the callous, the manipulative, the unbothered, but the impulsivity that gets most clinical psychopaths in trouble is absent. You plan. You wait. You know exactly what you're doing while you're doing it. This is the configuration psychiatry calls the 'successful psychopath' and the literature calls the corner office.",
    selfPattern:
      "You don't lose your temper. You don't blow up relationships. You don't crash cars or get fired. You walk through your life with a calm pulse and a clear plan and you notice, dispassionately, that the people around you do not. You enjoy reading them. You enjoy steering them. When something you've done causes pain, you do not feel the thing other people are feeling, and you have, by now, stopped expecting to.",
    externalRead:
      "People describe you as composed, often as charming, sometimes as cold. The closest people to you, the ones who got close enough to notice the temperature drop, have a private theory about you they don't share at parties. You have noticed this and elected not to address it. There is no upside.",
    blindSpots: [
      "Your impulse control is your best feature and your single biggest blind spot. The thing that protects you from consequences also keeps you from being noticed early enough to be helped, which is fine if you don't want help and a quiet liability if you do.",
      "You read other people's emotional states with high fidelity but do not register them as binding. The result is a friendship pattern in which you know more about your friends than they know about you, and they accept this asymmetry because they cannot name it.",
      "The people who get genuinely close to you are either reading the same way you are, in which case there's a short courtship and a long mutual respect, or they are the rare person you cannot read, in which case you over-invest, briefly and unwisely.",
    ],
    whatNext:
      "Two paths. The first is the one most people in this configuration take, you learn the social cost of being read clearly and you hire the next layer of cover. Better suit. Better wife. Better story. The second is the one almost nobody takes, you stop performing warmth you do not feel and find the small number of people who can stand the actual room temperature. The Consilium is built for the second path. There is no judgement in the first; it pays.",
  },
  "the-hot-wire": {
    quadrant: "the-hot-wire",
    name: "The Hot Wire",
    tagline: "Reactive. Frustration-prone. The cold core isn't there.",
    description:
      "Your Secondary score is high or very high; your Primary score is not. This is the inverse of the Calculator and a much more common pattern. The Secondary subscale measures impulsivity, frustration tolerance, and antisocial reactivity, the surface symptoms of psychopathy without the cold predatory core underneath. People with this profile do, in fact, get into trouble; they shout, they leave jobs, they crash relationships. They also feel guilt about it after, which is the diagnostic line.",
    selfPattern:
      "You blow up. You sometimes regret it within the hour. You start things and abandon them. You have a relationship with consequences in which the consequences arrive about three days after the action and surprise you each time. You are not callous. You are reactive. The two get conflated, by you and by the people in your life, and the conflation is doing you damage.",
    externalRead:
      "People who like you describe you as passionate or intense; people who don't describe you as exhausting. Both are reading the same data. The friend who has stuck around the longest is the one who learned to wait out the surge and not take the surge personally, this is rarer than you think and worth keeping.",
    blindSpots: [
      "You read your impulsivity as authenticity. It is, in fact, dysregulation, and authenticity is what's underneath it once the surge passes. The two are different and worth distinguishing.",
      "The trouble you find yourself in repeatedly, your Secondary subscale's signature, is overwhelmingly self-generated. The instrument is asking you to notice the pattern; the test result is the noticing.",
      "Your frustration response is mostly trainable. The cold-core pattern of the Primary subscale is not. You happen to have the version that responds to the work. Most people don't realise this distinction is good news.",
    ],
    whatNext:
      "The single most useful intervention for this profile is the consequence-delay protocol, when you feel the urge to send the message, blow up the relationship, quit the job, you write the action down and wait twenty-four hours before performing it. The urge passes in nine out of ten cases. The one in ten is data about which urges are actually load-bearing for you. Therapy that names the regulation gap (DBT, somatic work) helps; therapy that processes the feelings without addressing the regulation gap will frustrate you, which is itself diagnostic.",
  },
  "the-full-pattern": {
    quadrant: "the-full-pattern",
    name: "The Full Pattern",
    tagline: "Both subscales lit. The clinical-grade configuration.",
    description:
      "Both your Primary and Secondary scores are high or very high. This is the configuration the LSRP was built to detect, and you have, in your own self-report, told it the thing it was listening for. The cold core is present; the impulsive shell is present; the regulation gap that produces real-world consequences is present. This places you in roughly the top 5% of the general population on this instrument. The instrument cannot tell you whether you meet ASPD criteria, that requires a clinician with a full history. It can tell you that the pattern is not subtle.",
    selfPattern:
      "You have a long memory of trouble. You have a short memory of guilt. You have, somewhere on the way through your twenties or thirties, made peace with the fact that the way you read people is not the way they read each other and that this asymmetry is durable. You are reading these sentences and not feeling defensive about them. The lack of defensiveness is itself part of the pattern.",
    externalRead:
      "The people in your life have organised themselves into two groups: the ones who can take the temperature and the ones who pretend they can't. You know which is which. The first group is small, durable, and useful. The second group is being managed.",
    blindSpots: [
      "The Secondary subscale is the part of you that ends up in the police report, the divorce court, or the HR meeting. The Primary subscale is the part that decides not to. The two are at war inside you and most of your bad outcomes are losses by Primary to Secondary, the impulse winning over the plan.",
      "You almost certainly underestimate how hard it is for the people around you to read what you are doing. You experience yourself as transparent because your interior is loud to you; they experience you as opaque because the surface gives nothing.",
      "You may have arrived at this score with a flicker of recognition, or with a flicker of pride. The pride one is its own warning. People who score this high and feel proud of it are typically in the early phase of the configuration, the consequences haven't compounded yet.",
    ],
    whatNext:
      "Honest options. One: see a clinician who specialises in personality disorders, ideally one with experience in ASPD specifically, and get a full diagnostic interview. The instrument cannot do this; only the clinician can. Two: read the full Sociopathic Dating Bible, the chapters on the predator's interior were written by someone who configured similarly to you and they will read as either familiar or accusatory depending on where in the pattern you currently are. Three: the Consilium has, by deliberate design, a higher concentration of people with this configuration than you would find in the general population; the room is not safer because it's gentler, it's safer because it's read.",
  },
};

// -----------------------------------------------------------------------
// SUBSCALE TIER INTERPRETATIONS — 8 short paragraphs, one per
// subscale × tier, surfaced next to the bar chart on the results page.
// -----------------------------------------------------------------------

export interface SubscaleTierInterpretation {
  subscale: SociopathSubscale;
  tier: SociopathTier;
  /** One sentence, what this score means in plain terms. */
  meaning: string;
  /** A second sentence, what this looks like in life. */
  inLife: string;
}

export const SUBSCALE_TIER_INTERPRETATIONS: Record<
  string,
  SubscaleTierInterpretation
> = {
  "primary:low": {
    subscale: "primary",
    tier: "low",
    meaning:
      "Your callous-and-manipulative score sits in the bottom 16% of the population.",
    inLife:
      "You feel guilt when you've hurt someone, you feel reluctance about exploitative shortcuts, and you hold higher values that override the bottom line in real-time decisions. This is the population baseline; if you scored lower than expected, the gap between expectation and result is its own data.",
  },
  "primary:average": {
    subscale: "primary",
    tier: "average",
    meaning:
      "Your callous-and-manipulative score sits in the broad middle of the population.",
    inLife:
      "You're capable of strategic self-interest when stakes are high and capable of empathic restraint when they aren't. This is the modal configuration. Most adults reading this scored here.",
  },
  "primary:high": {
    subscale: "primary",
    tier: "high",
    meaning:
      "Your callous-and-manipulative score sits in roughly the top 16% of the population.",
    inLife:
      "Strategic exploitation comes naturally; empathic restraint requires conscious effort and is sometimes overridden by goal pursuit. People around you have noticed at least once. The pattern is real but not yet clinical.",
  },
  "primary:very-high": {
    subscale: "primary",
    tier: "very-high",
    meaning:
      "Your callous-and-manipulative score sits in roughly the top 2-3% of the population.",
    inLife:
      "The cold-core construct of psychopathy is registering at clinical-adjacent levels. The instrument cannot diagnose, but it does flag. A clinician with personality-disorder expertise is the next call if you want to know what this means medically.",
  },
  "secondary:low": {
    subscale: "secondary",
    tier: "low",
    meaning:
      "Your impulsivity-and-reactivity score sits in the bottom 16% of the population.",
    inLife:
      "You plan, you delay, you don't blow up, you stay locked on long-term goals. This is the regulation profile, not a personality trait, and it's protective regardless of how the Primary subscale scored.",
  },
  "secondary:average": {
    subscale: "secondary",
    tier: "average",
    meaning:
      "Your impulsivity-and-reactivity score sits in the broad middle.",
    inLife:
      "You react when stakes spike, plan when they don't, lose your temper occasionally, and recover normally. The modal configuration. Most adults score here.",
  },
  "secondary:high": {
    subscale: "secondary",
    tier: "high",
    meaning:
      "Your impulsivity-and-reactivity score sits in roughly the top 16% of the population.",
    inLife:
      "You generate trouble at a higher-than-typical rate through reactive decisions. The pattern is recognisable, the regulation gap is real, and the work that addresses it is well-mapped.",
  },
  "secondary:very-high": {
    subscale: "secondary",
    tier: "very-high",
    meaning:
      "Your impulsivity-and-reactivity score sits in roughly the top 2-3% of the population.",
    inLife:
      "Severe regulation gap. Most of your worst outcomes are self-generated. The good news is that this subscale, unlike the Primary one, responds well to the right work (DBT, somatic regulation, structured consequence-delay). Therapy choice matters; pick someone who treats the gap, not just the feelings underneath it.",
  },
};

export function getTierInterpretation(
  subscale: SociopathSubscale,
  tier: SociopathTier,
): SubscaleTierInterpretation {
  const key = `${subscale}:${tier}`;
  return SUBSCALE_TIER_INTERPRETATIONS[key]!;
}

// -----------------------------------------------------------------------
// QUIZ INFO
// -----------------------------------------------------------------------

export const SOCIOPATH_QUIZ_INFO = {
  slug: "sociopath",
  name: "The Sociopath Test",
  fullName: "The Sociopath Test · Dark Mirror by Kanika Rose",
  shortName: "Sociopath Test",
  tagline: "Calibrated by the LSRP. Written by a real one.",
  description:
    "A 26-item self-report assessment based on the Levenson Self-Report Psychopathy Scale. Two subscales, Primary (callous, manipulative) and Secondary (impulsive, reactive), scored against published research norms. Educational and reflective use only, not a clinical diagnosis.",
  itemCount: SOCIOPATH_ITEMS.length,
  estimatedMinutes: 5,
  price: 0, // free assessment
  disclaimer:
    "Educational and reflective use only. The LSRP is a research instrument, not a diagnostic one. Only a licensed clinician with a full history can diagnose Antisocial Personality Disorder or any other personality disorder. If you are in active distress, contact a licensed therapist or, if there is risk to yourself or others, a crisis line.",
  basedOn:
    "Levenson, M. R., Kiehl, K. A., & Fitzpatrick, C. M. (1995). Assessing psychopathic attributes in a noninstitutionalized population. Journal of Personality and Social Psychology, 68(1), 151-158.",
} as const;

// -----------------------------------------------------------------------
// FAQ ITEMS — keyed to real searcher queries, designed for FAQ rich
// results and SEO topical authority. Disclaimer language repeats here
// because Google's FAQ rich result is one of the few places we can
// guarantee disclaimer visibility in the SERP itself.
// -----------------------------------------------------------------------

export const SOCIOPATH_QUIZ_FAQ = [
  {
    question:
      "What is the Sociopath Test and what does it actually measure?",
    answer:
      "The Sociopath Test is a 26-item self-report assessment built on the Levenson Self-Report Psychopathy Scale (LSRP), Levenson, Kiehl & Fitzpatrick 1995. It scores you on two parallel subscales: Primary psychopathy (callousness, manipulativeness, lack of remorse, the cold-core construct) and Secondary psychopathy (impulsivity, frustration-prone reactivity, the regulation gap that produces real-world trouble). Your raw score on each subscale is converted to a percentile against the original college-sample norms (n=487).",
  },
  {
    question:
      "Is this a diagnosis? Can a quiz tell me if I'm a sociopath?",
    answer:
      "No. The LSRP is a research instrument, not a diagnostic one. Only a licensed clinician with a full history can diagnose Antisocial Personality Disorder, the closest thing to a clinical 'sociopath' label in the DSM-5. What this assessment can do is give you a calibrated read of two specific psychopathy constructs (Primary and Secondary) against published research norms, which is genuinely useful for self-recognition. It is not useful for self-labelling and we won't help you use it that way.",
  },
  {
    question: "Who built this and why should I trust the result?",
    answer:
      "Kanika Rose, clinically diagnosed with Antisocial Personality Disorder, author of the Sociopathic Dating Bible. The instrument used (LSRP) is the standard non-institutional psychopathy self-report in the academic literature; the items track the source paper closely with light wording adjustments for clarity, and the scoring follows Levenson 1995 exactly. The voice of the landing page and result interpretations is mine; the instrument is the field's. Both have their place.",
  },
  {
    question:
      "What's the difference between Primary and Secondary psychopathy?",
    answer:
      "Primary psychopathy is the cold-core construct, callousness, lack of empathy, manipulativeness, the absence of guilt. Secondary psychopathy is the impulsive shell, frustration intolerance, poor planning, reactive antisocial behaviour. They sometimes co-occur (the full pattern) and sometimes don't (the Calculator, high Primary low Secondary; the Hot Wire, low Primary high Secondary). The two configurations look different in real life and have different recovery trajectories.",
  },
  {
    question:
      "I scored high on both subscales. Should I be worried?",
    answer:
      "The honest answer is: depending on your context, possibly. The 'Full Pattern' configuration, both subscales high or very high, places you in roughly the top 5% of the population on this instrument and is the configuration the LSRP was built to detect. The instrument cannot diagnose you, only a clinician can, but a high score on both subscales is the right signal for considering a diagnostic assessment with a personality-disorder specialist. Your result page lays out the specific options.",
  },
  {
    question:
      "I scored high on Secondary but low on Primary. What does that mean?",
    answer:
      "It means you have the regulation gap (impulsivity, reactivity, frustration intolerance) without the cold-core empathy deficit. This is not psychopathy in the clinical sense, it's a regulation pattern that responds well to the right work (DBT, somatic regulation, consequence-delay protocols). It's also more common than the full pattern. The result page covers what to do with this configuration specifically.",
  },
  {
    question: "Is this different from the Dark Mirror Assessment?",
    answer:
      "Yes. The Dark Mirror profiles you across six Cluster B types using scenario-based items written from scratch, the Sociopath Test uses one validated psychometric instrument (LSRP) to score one specific construct (psychopathy) on two subscales. They serve different purposes. Many users take both, the Dark Mirror gives the wide map, the Sociopath Test gives the calibrated read on the specific axis the wide map flagged.",
  },
  {
    question: "Are my answers private? Are they stored anywhere?",
    answer:
      "Your answers are stored only in your browser session by default. We do not sell or share quiz responses. If you choose to register an account or capture your result via email, the data lives on our servers under the same access controls as any registered-user data and you can request deletion at any time. The full privacy policy is linked in the footer.",
  },
  {
    question:
      "I'm in active distress about whether I'm a sociopath. Should I take this?",
    answer:
      "If the question is causing you serious anxiety, sleep loss, or self-harm thoughts, please prioritise a licensed therapist over a self-assessment. This instrument is most useful at the contemplation stage, you suspect a pattern, you want a sharper read, you're stable enough to take in the answer. If that's not where you are right now, bookmark the page and come back when it is. Crisis resources are linked at the bottom of the page.",
  },
  {
    question: "Can I share my result?",
    answer:
      "Your result is yours. We do not auto-publish anything. There's a share button on the result page if you want it; it copies a link to a publicly viewable page that shows only your scores and tier, no identifying information unless you explicitly add it. Most people who score high on this instrument do not share their results, which is itself information about how the population reads its own scores.",
  },
] as const;
