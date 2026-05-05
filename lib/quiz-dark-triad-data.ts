// The Dark Triad Test (SD3), items, scoring, and configuration profiles.
//
// Built on the Short Dark Triad (Jones & Paulhus 2014, Assessment 21(1),
// 28-41). 27 items, 9 each on Machiavellianism, Narcissism, and
// Psychopathy. 5-point Likert (1=Disagree strongly, 5=Agree strongly).
// Five reverse-scored items (11, 15, 17, 20, 25 in canonical
// numbering).
//
// The SD3 is open-source and freely usable for non-commercial
// research and educational purposes. It is used by IDR Labs, Open
// Psychometrics, Arthur C. Brooks's quiz, and most other
// dark-triad assessments online.
//
// Result-page configuration logic:
//   - Three subscale bars (Mach / Narc / Psych) with raw + percentile + tier
//   - Configuration archetype based on which axes are high:
//       Functional Self      (no axis above +1 SD)
//       Single-Axis dominant (one axis above +1 SD; profile names which)
//       Dual-Axis dominant   (two axes above +1 SD; profile names which)
//       Full Triad           (all three above +1 SD)

import { DARK_TRIAD_NORMS } from "@/lib/quiz-dark-triad-norms";

export type DarkTriadAxis = "machiavellianism" | "narcissism" | "psychopathy";
export type DarkTriadTier = "low" | "average" | "high" | "very-high";
export type DarkTriadArchetype =
  | "functional-self"
  | "single-axis"
  | "dual-axis"
  | "full-triad";

export interface DarkTriadItem {
  /** 1-27, matches Jones & Paulhus 2014 canonical numbering. */
  id: number;
  statement: string;
  axis: DarkTriadAxis;
  reverseScored: boolean;
}

export interface DarkTriadScores {
  machiavellianism: number;
  narcissism: number;
  psychopathy: number;
  total: number;
}

export interface DarkTriadAxisResult {
  axis: DarkTriadAxis;
  rawScore: number;
  percentile: number;
  tier: DarkTriadTier;
}

export interface DarkTriadDiagnosis {
  machiavellianism: DarkTriadAxisResult;
  narcissism: DarkTriadAxisResult;
  psychopathy: DarkTriadAxisResult;
  /** Which configuration archetype the score profile maps to. */
  archetype: DarkTriadArchetype;
  /** Which axes are "high" (tier high or very-high). */
  highAxes: DarkTriadAxis[];
  /** Headline shown on results page (computed dynamically). */
  headline: string;
  /** One-line tagline. */
  tagline: string;
}

// -----------------------------------------------------------------------
// THE 27 ITEMS, reproduced from Jones & Paulhus 2014, with light
// punctuation harmonisation. Item order matches the published SD3.
// -----------------------------------------------------------------------

export const DARK_TRIAD_ITEMS: DarkTriadItem[] = [
  // -- Machiavellianism (items 1-9) --
  { id: 1, axis: "machiavellianism", reverseScored: false, statement: "It's not wise to tell your secrets." },
  { id: 2, axis: "machiavellianism", reverseScored: false, statement: "I like to use clever manipulation to get my way." },
  { id: 3, axis: "machiavellianism", reverseScored: false, statement: "Whatever it takes, you must get the important people on your side." },
  { id: 4, axis: "machiavellianism", reverseScored: false, statement: "Avoid direct conflict with others because they may be useful in the future." },
  { id: 5, axis: "machiavellianism", reverseScored: false, statement: "It's wise to keep track of information that you can use against people later." },
  { id: 6, axis: "machiavellianism", reverseScored: false, statement: "You should wait for the right time to get back at people." },
  { id: 7, axis: "machiavellianism", reverseScored: false, statement: "There are things you should hide from other people because they don't need to know." },
  { id: 8, axis: "machiavellianism", reverseScored: false, statement: "Make sure your plans benefit you, not others." },
  { id: 9, axis: "machiavellianism", reverseScored: false, statement: "Most people can be manipulated." },

  // -- Narcissism (items 10-18) --
  { id: 10, axis: "narcissism", reverseScored: false, statement: "People see me as a natural leader." },
  { id: 11, axis: "narcissism", reverseScored: true, statement: "I hate being the centre of attention." },
  { id: 12, axis: "narcissism", reverseScored: false, statement: "Many group activities tend to be dull without me." },
  { id: 13, axis: "narcissism", reverseScored: false, statement: "I know that I am special because everyone keeps telling me so." },
  { id: 14, axis: "narcissism", reverseScored: false, statement: "I like to get acquainted with important people." },
  { id: 15, axis: "narcissism", reverseScored: true, statement: "I feel embarrassed if someone compliments me." },
  { id: 16, axis: "narcissism", reverseScored: false, statement: "I have been compared to famous people." },
  { id: 17, axis: "narcissism", reverseScored: true, statement: "I am an average person." },
  { id: 18, axis: "narcissism", reverseScored: false, statement: "I insist on getting the respect I deserve." },

  // -- Psychopathy (items 19-27) --
  { id: 19, axis: "psychopathy", reverseScored: false, statement: "I like to get revenge on authorities." },
  { id: 20, axis: "psychopathy", reverseScored: true, statement: "I avoid dangerous situations." },
  { id: 21, axis: "psychopathy", reverseScored: false, statement: "Payback needs to be quick and nasty." },
  { id: 22, axis: "psychopathy", reverseScored: false, statement: "People often say I'm out of control." },
  { id: 23, axis: "psychopathy", reverseScored: false, statement: "It's true that I can be mean to others." },
  { id: 24, axis: "psychopathy", reverseScored: false, statement: "People who mess with me always regret it." },
  { id: 25, axis: "psychopathy", reverseScored: true, statement: "I have never gotten into trouble with the law." },
  { id: 26, axis: "psychopathy", reverseScored: false, statement: "I enjoy having sex with people I hardly know." },
  { id: 27, axis: "psychopathy", reverseScored: false, statement: "I'll say anything to get what I want." },
];

export interface LikertOption {
  value: 1 | 2 | 3 | 4 | 5;
  label: string;
}

export const SD3_LIKERT_OPTIONS: readonly LikertOption[] = [
  { value: 1, label: "Disagree strongly" },
  { value: 2, label: "Disagree" },
  { value: 3, label: "Neutral" },
  { value: 4, label: "Agree" },
  { value: 5, label: "Agree strongly" },
] as const;

// -----------------------------------------------------------------------
// SCORING
// -----------------------------------------------------------------------

export function scoreItem(
  item: DarkTriadItem,
  rawValue: 1 | 2 | 3 | 4 | 5,
): number {
  return item.reverseScored ? 6 - rawValue : rawValue;
}

export function calculateDarkTriadScores(
  answers: Record<number, 1 | 2 | 3 | 4 | 5>,
): DarkTriadScores {
  let mach = 0;
  let narc = 0;
  let psych = 0;
  for (const item of DARK_TRIAD_ITEMS) {
    const v = answers[item.id];
    if (!v) continue;
    const scored = scoreItem(item, v);
    if (item.axis === "machiavellianism") mach += scored;
    else if (item.axis === "narcissism") narc += scored;
    else psych += scored;
  }
  return {
    machiavellianism: mach,
    narcissism: narc,
    psychopathy: psych,
    total: mach + narc + psych,
  };
}

function standardNormalCdf(z: number): number {
  const sign = z < 0 ? -1 : 1;
  const x = Math.abs(z) / Math.SQRT2;
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

export function scoreToPercentile(
  score: number,
  axis: DarkTriadAxis,
): number {
  const norms = DARK_TRIAD_NORMS[axis];
  const z = (score - norms.mean) / norms.sd;
  return Math.round(Math.max(0, Math.min(100, standardNormalCdf(z) * 100)));
}

export function scoreToTier(score: number, axis: DarkTriadAxis): DarkTriadTier {
  const norms = DARK_TRIAD_NORMS[axis];
  if (score < norms.mean - norms.sd) return "low";
  if (score <= norms.mean + norms.sd) return "average";
  if (score <= norms.mean + 2 * norms.sd) return "high";
  return "very-high";
}

export function buildAxisResult(
  rawScore: number,
  axis: DarkTriadAxis,
): DarkTriadAxisResult {
  return {
    axis,
    rawScore,
    percentile: scoreToPercentile(rawScore, axis),
    tier: scoreToTier(rawScore, axis),
  };
}

const AXIS_LABELS: Record<DarkTriadAxis, string> = {
  machiavellianism: "Machiavellianism",
  narcissism: "Narcissism",
  psychopathy: "Psychopathy",
};

export function determineArchetype(
  high: DarkTriadAxis[],
): DarkTriadArchetype {
  if (high.length === 0) return "functional-self";
  if (high.length === 1) return "single-axis";
  if (high.length === 2) return "dual-axis";
  return "full-triad";
}

export function generateDarkTriadDiagnosis(
  answers: Record<number, 1 | 2 | 3 | 4 | 5>,
): DarkTriadDiagnosis {
  const scores = calculateDarkTriadScores(answers);
  const mach = buildAxisResult(scores.machiavellianism, "machiavellianism");
  const narc = buildAxisResult(scores.narcissism, "narcissism");
  const psych = buildAxisResult(scores.psychopathy, "psychopathy");

  const highAxes: DarkTriadAxis[] = [];
  for (const r of [mach, narc, psych]) {
    if (r.tier === "high" || r.tier === "very-high") highAxes.push(r.axis);
  }

  const archetype = determineArchetype(highAxes);
  const { headline, tagline } = computeHeadline(archetype, highAxes);

  return {
    machiavellianism: mach,
    narcissism: narc,
    psychopathy: psych,
    archetype,
    highAxes,
    headline,
    tagline,
  };
}

function computeHeadline(
  archetype: DarkTriadArchetype,
  highAxes: DarkTriadAxis[],
): { headline: string; tagline: string } {
  if (archetype === "functional-self") {
    return {
      headline: "The Functional Self",
      tagline: "No dark-triad axis is registering above the population mean.",
    };
  }
  if (archetype === "full-triad") {
    return {
      headline: "The Full Triad",
      tagline: "All three axes lit. The clinical-grade configuration.",
    };
  }
  if (archetype === "single-axis") {
    const axis = highAxes[0]!;
    if (axis === "machiavellianism")
      return {
        headline: "The Strategist",
        tagline: "Machiavellianism dominant. Long game, no warmth required.",
      };
    if (axis === "narcissism")
      return {
        headline: "The Performer",
        tagline: "Narcissism dominant. The room is for you. Often.",
      };
    return {
      headline: "The Predator",
      tagline: "Psychopathy dominant. Cold core, low restraint.",
    };
  }
  // dual-axis
  const set = new Set(highAxes);
  if (set.has("machiavellianism") && set.has("narcissism")) {
    return {
      headline: "The Operator",
      tagline: "Machiavellian + narcissistic. Plans the room and stars in it.",
    };
  }
  if (set.has("machiavellianism") && set.has("psychopathy")) {
    return {
      headline: "The Manipulator",
      tagline: "Machiavellian + psychopathic. The strategist with no brake.",
    };
  }
  return {
    headline: "The Showman",
    tagline: "Narcissistic + psychopathic. Stage presence with a knife backstage.",
  };
}

// -----------------------------------------------------------------------
// AXIS TIER INTERPRETATIONS
// -----------------------------------------------------------------------

export interface AxisTierInterpretation {
  axis: DarkTriadAxis;
  tier: DarkTriadTier;
  meaning: string;
  inLife: string;
}

export const AXIS_TIER_INTERPRETATIONS: Record<string, AxisTierInterpretation> = {
  // Machiavellianism
  "machiavellianism:low": {
    axis: "machiavellianism",
    tier: "low",
    meaning:
      "Machiavellianism in the bottom 16%.",
    inLife:
      "You don't strategise people. You don't keep mental files of useful information for later. You take social interactions at face value, which, on the upside, makes you trustable; on the downside, it sometimes leaves you at a strategic disadvantage in environments where everyone else is keeping a file.",
  },
  "machiavellianism:average": {
    axis: "machiavellianism",
    tier: "average",
    meaning: "Machiavellianism in the broad middle.",
    inLife:
      "Normal-range strategic awareness. You read situations, you protect yourself, you don't lose much sleep doing it. Modal configuration.",
  },
  "machiavellianism:high": {
    axis: "machiavellianism",
    tier: "high",
    meaning: "Machiavellianism in the top 16%.",
    inLife:
      "You strategise people deliberately and often. You keep mental files of who is useful and how. The pattern is conscious; you may experience it as competence rather than as machiavellianism, but the construct is what it is.",
  },
  "machiavellianism:very-high": {
    axis: "machiavellianism",
    tier: "very-high",
    meaning: "Machiavellianism in the top 2-3%.",
    inLife:
      "You operate the social field consciously, continuously, and at a level of detail most people would find exhausting if they could see it. The work is invisible to people on the receiving end. This is the construct's signature.",
  },
  // Narcissism
  "narcissism:low": {
    axis: "narcissism",
    tier: "low",
    meaning: "Narcissism in the bottom 16%.",
    inLife:
      "You don't require the room. You can take a compliment without inflating; you can give one without resenting. The risk is the inverse, low-narcissism people sometimes under-claim and let credit go to the louder voice in the meeting.",
  },
  "narcissism:average": {
    axis: "narcissism",
    tier: "average",
    meaning: "Narcissism in the broad middle.",
    inLife:
      "You take up an average amount of space and update normally on contradiction. Modal configuration.",
  },
  "narcissism:high": {
    axis: "narcissism",
    tier: "high",
    meaning: "Narcissism in the top 16%.",
    inLife:
      "Leadership orientation, comfort with attention, and self-belief register clearly. Whether this reads as charisma or as too-much depends on whether the other two axes are keeping pace.",
  },
  "narcissism:very-high": {
    axis: "narcissism",
    tier: "very-high",
    meaning: "Narcissism in the top 2-3%.",
    inLife:
      "You walk into rooms expecting them to rearrange. The expectation is usually met, which is itself the data. Take the NPI-40 (/quiz/narcissist) for the deeper read on the narcissism construct.",
  },
  // Psychopathy
  "psychopathy:low": {
    axis: "psychopathy",
    tier: "low",
    meaning: "Psychopathy in the bottom 16%.",
    inLife:
      "You hold guilt at the rate the population does. You have brakes on impulse and an aversion to risk that is, on average, protective. The dark-triad axis where the absence reads cleanest in everyday life.",
  },
  "psychopathy:average": {
    axis: "psychopathy",
    tier: "average",
    meaning: "Psychopathy in the broad middle.",
    inLife:
      "Normal-range impulsivity and antisocial reactivity. Modal configuration.",
  },
  "psychopathy:high": {
    axis: "psychopathy",
    tier: "high",
    meaning: "Psychopathy in the top 16%.",
    inLife:
      "Cold-core and impulsive features both registering. Take the LSRP-based Sociopath Test (/quiz/sociopath) for the deeper read; it splits Primary (callous) from Secondary (impulsive) and the configuration matters.",
  },
  "psychopathy:very-high": {
    axis: "psychopathy",
    tier: "very-high",
    meaning: "Psychopathy in the top 2-3%.",
    inLife:
      "Clinical-adjacent levels of the psychopathy construct. The Sociopath Test will give you a more detailed read; if both subscales there are also high or very high, the result is the LSRP 'Full Pattern' configuration.",
  },
};

export function getAxisTierInterpretation(
  axis: DarkTriadAxis,
  tier: DarkTriadTier,
): AxisTierInterpretation {
  return AXIS_TIER_INTERPRETATIONS[`${axis}:${tier}`]!;
}

// -----------------------------------------------------------------------
// ARCHETYPE PROFILES, long-form interpretation for each
// -----------------------------------------------------------------------

export interface ArchetypeProfile {
  archetype: DarkTriadArchetype;
  /** Some archetypes are dynamic (single-axis, dual-axis); their copy
   * uses placeholder tokens that the result page resolves. */
  description: string;
  selfPattern: string;
  externalRead: string;
  blindSpots: string[];
  whatNext: string;
}

export const ARCHETYPE_PROFILES: Record<DarkTriadArchetype, ArchetypeProfile> = {
  "functional-self": {
    archetype: "functional-self",
    description:
      "All three SD3 axes sit in or below the broad middle of the population. The dark-triad construct is not registering as your operating profile. You may have arrived here because the term &lsquo;dark triad&rsquo; surfaced in something you read or in an argument, or because you wanted to know whether your suspicion of yourself was, in fact, accurate.",
    selfPattern:
      "You don't keep mental files on the people in your life for later strategic use. You don't require the room. You hold normal-range guilt and have brakes on impulse. None of this is virtue, it's the absence of the specific construct the SD3 measures.",
    externalRead:
      "People around you describe you as steady. The closest people to you, asked privately, would not be surprised by this profile.",
    blindSpots: [
      "If you came here because you suspected someone else in your life is high on the triad, the SD3 is a self-report; you can't score them. The partner-detection chapters of the Sociopathic Dating Bible go further on that question.",
      "Low SD3 across all three axes correlates with somewhat higher victimisation rates in the literature, the inverse risk: people without the construct sometimes underestimate how much of it is operating around them.",
      "If the worry that drove you here was about being a narcissist or sociopath specifically, the deeper-read companion tests (NPI-40, LSRP) will give you a sharper answer than the SD3.",
    ],
    whatNext:
      "Nothing specific to act on from this score. The deeper-read companion tests are linked below if any single axis came in close to the boundary, and the Dark Mirror Assessment is the wider personality map if the question is broader than the dark triad.",
  },
  "single-axis": {
    archetype: "single-axis",
    // Dynamic copy uses {axis} token resolved at render
    description:
      "One of the three SD3 axes is registering as elevated; the other two are within or below the population mean. The interpretation depends entirely on which axis it is. Single-axis dominant configurations are common, most people who score high on the dark triad are high on one axis, not all three. Your specific axis profile is below.",
    selfPattern:
      "The single-axis pattern is genuinely different from the multi-axis ones. It is not 'the full triad in early stages'; it is its own configuration. The literature treats it as such, and the lived experience of the people who configure this way reflects that.",
    externalRead:
      "People around you have noticed the dominant axis (either as charisma, or as strategic competence, or as something they don't have a clean word for). They have not necessarily generalised it to a triad-wide read of you, because the other two axes are not lit.",
    blindSpots: [
      "Single-axis dominant configurations are stable across decades in the longitudinal data. This will not, unaided, drift toward the Full Triad. The drift, when it happens, is environment-driven.",
      "The deeper-read companion test for your dominant axis (linked in the result page) will give you a substantially more nuanced read on the specific pattern; the SD3 is brief by design.",
      "Low scores on the other two axes are a feature of this configuration, not noise. They are protective.",
    ],
    whatNext:
      "Take the deeper-read test for your dominant axis (linked below). The SD3 is the wide map; the dedicated instrument is the close read.",
  },
  "dual-axis": {
    archetype: "dual-axis",
    description:
      "Two of the three SD3 axes are registering as elevated; the third is within or below the population mean. Dual-axis configurations are rarer than single-axis ones and meaningfully more clinically interesting; the interaction between the two specific axes produces patterns that are not just 'the sum of the two'. Your specific dual-axis profile is below.",
    selfPattern:
      "Dual-axis configurations produce real-world consequences (relational, professional, sometimes legal) at a higher rate than either single-axis configuration alone. The third axis being low is not, by itself, sufficient protection; the two that are lit are doing the work.",
    externalRead:
      "People close to you have, by now, organised themselves around the configuration. The closest ones can articulate at least a piece of the pattern; the next-closest layer has noticed but not named it.",
    blindSpots: [
      "Dual-axis configurations are the ones most likely to be misdiagnosed in therapy because each individual axis presents with its own surface features that can be treated as a singular issue (anxiety, anger, grandiosity) without the clinician seeing the full picture.",
      "The third axis being low is meaningful information about how the configuration shows up, e.g. high Mach + high Narc with low Psych is the corner-office configuration, where high Mach + high Psych with low Narc is the cold-strategist configuration. Read the headline, then the per-axis interpretations.",
      "If the third axis is close to the threshold (i.e. high-end of average), the clinical implication is closer to a Full Triad than the score suggests. Watch for drift.",
    ],
    whatNext:
      "Take the deeper-read companion tests for both your elevated axes. The combination of NPI-40 and LSRP results, alongside this SD3 read, is the sharpest non-clinical map available.",
  },
  "full-triad": {
    archetype: "full-triad",
    description:
      "All three SD3 axes are registering as elevated. This places you in roughly the top 1-2% of the general population on the dark-triad construct as a whole. The literature (Paulhus & Williams 2002, Furnham et al. 2013) treats this configuration as functionally distinct from the partial-triad ones; the three together produce patterns that are not predicted by any single axis or pair.",
    selfPattern:
      "You strategise people consciously (Mach), require the room when you enter it (Narc), and operate without the standard internal brakes (Psych). The combination is rare, durable, and self-stable; people in this configuration almost universally read these sentences without defensiveness, and the lack of defensiveness is itself part of the pattern.",
    externalRead:
      "The people in your life who are still in your life have, by now, learned the configuration well enough to operate around it. The ones who couldn't are gone, and you have not, on the whole, missed them. You have a long memory of being right about things other people were slow to see, and you have, on average, been right.",
    blindSpots: [
      "The Full Triad's biggest practical risk is that the three axes individually rationalise the consequences each one produces. Mach explains the manipulations as strategy, Narc explains the disregard for others as self-investment, Psych explains the impulse-driven losses as authenticity. The result is a long pattern in which damage accumulates without being metabolised.",
      "The instrument cannot diagnose; the relevant DSM construct here is most likely ASPD, or NPD, or both. A clinician with personality-disorder expertise is the next call if you want to know what this means medically.",
      "Pride in scoring this high is itself part of the pattern. The honest version of the response is closer to neutrality, which the clinician you might consult will be looking for.",
    ],
    whatNext:
      "Honest options. Take the LSRP-based Sociopath Test next; if both subscales there also score high or very high, the configuration is the LSRP Full Pattern, which is the same configuration the SD3 is flagging here. Then read the Sociopathic Dating Bible's chapters on the predator's interior; they were written by an author with an ASPD diagnosis and read from the inside on this exact territory. The Consilium has, by deliberate design, a higher concentration of users with this configuration than the general population.",
  },
};

// Display label helpers
export const AXIS_DISPLAY_LABELS: Record<DarkTriadAxis, string> = AXIS_LABELS;

// -----------------------------------------------------------------------
// QUIZ INFO + FAQ
// -----------------------------------------------------------------------

export const DARK_TRIAD_QUIZ_INFO = {
  slug: "dark-triad",
  name: "The Dark Triad Test",
  fullName: "The Dark Triad Test (SD3) · Dark Mirror by Kanika Rose",
  shortName: "Dark Triad Test",
  tagline: "Calibrated by the SD3. Read by a real one.",
  description:
    "A 27-item self-report assessment based on the Short Dark Triad (Jones & Paulhus 2014). Three axes, Machiavellianism, Narcissism, Psychopathy, scored against published norms (n=2929). Configuration archetype interpretation. Educational only, not a diagnosis.",
  itemCount: DARK_TRIAD_ITEMS.length,
  estimatedMinutes: 5,
  price: 0,
  disclaimer:
    "Educational and reflective use only. The SD3 is a research instrument, not a diagnostic one. The 'dark triad' is a construct in personality psychology, not a DSM diagnosis. Only a licensed clinician with a full history can diagnose any personality disorder.",
  basedOn:
    "Jones, D. N., & Paulhus, D. L. (2014). Introducing the Short Dark Triad (SD3): A Brief Measure of Dark Personality Traits. Assessment, 21(1), 28-41.",
} as const;

export const DARK_TRIAD_QUIZ_FAQ = [
  {
    question: "What is the Dark Triad and what does this test measure?",
    answer:
      "The 'dark triad' refers to three socially aversive personality traits, Machiavellianism (strategic manipulation), Narcissism (grandiosity, attention-seeking), and Psychopathy (callousness, impulsivity). The construct was named by Paulhus & Williams in 2002 and has since become one of the most-studied frameworks in personality psychology. This test uses the Short Dark Triad (SD3, Jones & Paulhus 2014), the canonical brief measure: 27 items, 9 per axis.",
  },
  {
    question: "Is this a diagnosis?",
    answer:
      "No. The SD3 is a research instrument, and the dark triad is a personality-psychology construct, not a DSM diagnosis. None of 'Machiavellianism', 'Narcissism (in this trait sense)', or 'Psychopathy (in this trait sense)' are clinical categories on their own. They map roughly to the DSM categories of ASPD and NPD plus a non-clinical Mach trait. Only a licensed clinician with a full history can diagnose a personality disorder.",
  },
  {
    question:
      "Why is this only 27 items when other dark-triad tests have more?",
    answer:
      "Because the SD3 was deliberately designed as a brief measure, 9 items per axis is the minimum for adequate factor reliability. Longer instruments exist (Dirty Dozen at 12, Mach-IV + NPI + SRP-III at ~70 combined) but the SD3 has comparable psychometric properties to the long combinations and is the standard brief instrument used by the field. If you want deeper reads on a specific axis, the dedicated tests are linked in the result page.",
  },
  {
    question:
      "How is this different from the individual narcissism / sociopathy tests?",
    answer:
      "The dedicated tests (NPI-40 for grandiose narcissism, HSNS for vulnerable narcissism, LSRP for psychopathy) are deeper reads on a single construct. The SD3 is the wide map across all three. Most users take the SD3 first, then take the dedicated test for whichever axis came in elevated. The two together, wide map + close read, produce a substantially better picture than either alone.",
  },
  {
    question:
      "I scored high on all three axes. Should I be worried?",
    answer:
      "The Full Triad configuration places you in roughly the top 1-2% of the general population on the dark-triad construct as a whole. The instrument cannot diagnose; it can flag. A high score on all three axes is the right signal for considering a diagnostic interview with a personality-disorder specialist, particularly one with experience in ASPD and NPD. The result page lays out the specific options.",
  },
  {
    question:
      "I scored high on Machiavellianism but low on the other two.",
    answer:
      "You've configured as 'The Strategist'. High Mach without elevated Narc or Psych is the configuration the literature describes as the most cognitively-driven of the dark-triad subset, strategic, deliberate, low-warmth without being low-control or low-empathy at the impulsive level. The result page profile and the deeper-read companion tests (linked from there) cover what this means.",
  },
  {
    question:
      "Why is the SD3 used by IDR Labs, Open Psychometrics, etc?",
    answer:
      "Because it's the standard. Jones & Paulhus 2014 is among the most-cited papers in trait personality research; the SD3 is short, free, well-validated, and translates cleanly across languages. Almost every free dark-triad quiz on the internet uses some form of it.",
  },
  {
    question: "Are my answers private?",
    answer:
      "Stored only in your browser session by default. We do not sell or share quiz responses. If you choose to register or capture your result via email, the data lives on our servers under standard access controls and you can request deletion at any time.",
  },
  {
    question:
      "Is being high on the dark triad always bad?",
    answer:
      "More complicated than 'always bad'. The dark-triad traits correlate negatively with most prosocial outcomes (relationship stability, mental health of partners, ethical decision-making) and positively with a narrower set (short-term mating success, certain forms of leadership effectiveness, resilience under specific stressors). The literature on 'adaptive' dark-triad outcomes is contested. The honest summary: the costs land on people around you and the benefits, where they exist, accrue mostly to you.",
  },
  {
    question: "Can I share my result?",
    answer:
      "We do not auto-publish anything. There's no share button on the result page by default, this kind of result is rarely something users want to broadcast and we have not built infrastructure to encourage that. The result page is yours alone unless you choose to copy and share.",
  },
] as const;
