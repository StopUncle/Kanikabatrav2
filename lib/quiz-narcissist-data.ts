// The Narcissist Test (NPI-40), items, scoring, and quadrant profiles.
//
// Built on the Narcissistic Personality Inventory (NPI-40), Raskin &
// Terry 1988, J Pers Soc Psychol 54(5), 890-902. The NPI is the
// most widely cited self-report measure of grandiose narcissism in
// the academic literature and the standard benchmark used by IDR
// Labs, Open Psychometrics, and the broader free-quiz space.
//
// Format: forced-choice. For each item the user is shown two
// statements (one narcissistic-keyed, one non-narcissistic-keyed)
// and picks the one that describes them better. Each narcissistic
// choice scores 1 point; total range 0-40.
//
// Subscale structure (Raskin & Terry 1988 7-factor solution):
//
//   Authority         (8 items), leadership, dominance
//   Self-sufficiency  (6 items), independence
//   Superiority       (5 items), feelings of being above others
//   Exhibitionism     (7 items), showing off
//   Exploitativeness  (5 items), manipulation
//   Vanity            (3 items), physical/personal vanity
//   Entitlement       (6 items), expectations of others
//
// Two-subscale presentation in the result page:
//
//   Grandiose Confidence  = Authority + Self-sufficiency + Superiority (19 items)
//   Predatory Pattern     = Exploitativeness + Entitlement + Exhibitionism + Vanity (21 items)
//
// This split mirrors the adaptive/maladaptive distinction in the
// later NPI literature (e.g., Emmons 1987, Watson et al. 1992) but
// uses the Raskin & Terry factor groupings exactly. The combined
// quadrant interpretation reads the two against each other: someone
// can score high on Grandiose Confidence without scoring high on
// Predatory Pattern (the Sovereign), or the reverse (the Charmer),
// or both (the Full Pattern).
//
// IMPORTANT: NPI measures GRANDIOSE narcissism specifically. It does
// not measure vulnerable / covert narcissism, that's a separate
// construct measured by the Hypersensitive Narcissism Scale (HSNS)
// and surfaced via /quiz/covert-narcissist.

import { NARCISSIST_NORMS } from "@/lib/quiz-narcissist-norms";

export type NarcissistSubscale = "grandiose" | "predatory" | "total";
export type NarcissistTier = "low" | "average" | "high" | "very-high";
export type NarcissistFactor =
  | "authority"
  | "self-sufficiency"
  | "superiority"
  | "exhibitionism"
  | "exploitativeness"
  | "vanity"
  | "entitlement";
export type NarcissistQuadrant =
  | "functional-self" //  low both
  | "the-sovereign" //    high grandiose, low predatory
  | "the-charmer" //      low grandiose, high predatory
  | "the-full-pattern"; // both high

export interface NarcissistChoice {
  /** "a" or "b" */
  key: "a" | "b";
  /** Statement text. */
  text: string;
  /** True = narcissistic-keyed (scores 1 point if chosen). */
  narcissistic: boolean;
}

export interface NarcissistItem {
  /** 1-40, matches Raskin & Terry 1988 canonical numbering. */
  id: number;
  /** Two forced-choice statements. */
  choices: [NarcissistChoice, NarcissistChoice];
  /** Which Raskin & Terry factor this item loads on. */
  factor: NarcissistFactor;
}

export interface NarcissistScores {
  /** Total NPI score, 0-40. */
  total: number;
  /** Grandiose Confidence subscale, 0-19. */
  grandiose: number;
  /** Predatory Pattern subscale, 0-21. */
  predatory: number;
  /** Per-factor breakdown for the result page deep-dive. */
  factors: Record<NarcissistFactor, number>;
}

export interface NarcissistSubscaleResult {
  subscale: NarcissistSubscale;
  rawScore: number;
  percentile: number;
  tier: NarcissistTier;
}

export interface NarcissistDiagnosis {
  total: NarcissistSubscaleResult;
  grandiose: NarcissistSubscaleResult;
  predatory: NarcissistSubscaleResult;
  factors: Record<NarcissistFactor, number>;
  quadrant: NarcissistQuadrant;
  headline: string;
  tagline: string;
}

// -----------------------------------------------------------------------
// THE 40 ITEMS
//
// Wording from Raskin & Terry 1988. Choices preserved exactly so the
// scoring keys match the published instrument; the only edits are
// punctuation / capitalisation harmonisation.
// -----------------------------------------------------------------------

export const NARCISSIST_ITEMS: NarcissistItem[] = [
  // 1, Authority
  {
    id: 1,
    factor: "authority",
    choices: [
      { key: "a", text: "I have a natural talent for influencing people.", narcissistic: true },
      { key: "b", text: "I am not good at influencing people.", narcissistic: false },
    ],
  },
  // 2, Exhibitionism
  {
    id: 2,
    factor: "exhibitionism",
    choices: [
      { key: "a", text: "Modesty doesn't become me.", narcissistic: true },
      { key: "b", text: "I am essentially a modest person.", narcissistic: false },
    ],
  },
  // 3, Exhibitionism
  {
    id: 3,
    factor: "exhibitionism",
    choices: [
      { key: "a", text: "I would do almost anything on a dare.", narcissistic: true },
      { key: "b", text: "I tend to be a fairly cautious person.", narcissistic: false },
    ],
  },
  // 4, Superiority
  {
    id: 4,
    factor: "superiority",
    choices: [
      { key: "a", text: "When people compliment me I sometimes get embarrassed.", narcissistic: false },
      { key: "b", text: "I know that I am good because everybody keeps telling me so.", narcissistic: true },
    ],
  },
  // 5, Entitlement
  {
    id: 5,
    factor: "entitlement",
    choices: [
      { key: "a", text: "The thought of ruling the world frightens me.", narcissistic: false },
      { key: "b", text: "If I ruled the world it would be a better place.", narcissistic: true },
    ],
  },
  // 6, Exploitativeness
  {
    id: 6,
    factor: "exploitativeness",
    choices: [
      { key: "a", text: "I can usually talk my way out of anything.", narcissistic: true },
      { key: "b", text: "I try to accept the consequences of my behaviour.", narcissistic: false },
    ],
  },
  // 7, Exhibitionism
  {
    id: 7,
    factor: "exhibitionism",
    choices: [
      { key: "a", text: "I prefer to blend in with the crowd.", narcissistic: false },
      { key: "b", text: "I like to be the centre of attention.", narcissistic: true },
    ],
  },
  // 8, Authority
  {
    id: 8,
    factor: "authority",
    choices: [
      { key: "a", text: "I will be a success.", narcissistic: true },
      { key: "b", text: "I am not too concerned about success.", narcissistic: false },
    ],
  },
  // 9, Superiority
  {
    id: 9,
    factor: "superiority",
    choices: [
      { key: "a", text: "I am no better and no worse than most people.", narcissistic: false },
      { key: "b", text: "I think I am a special person.", narcissistic: true },
    ],
  },
  // 10, Authority
  {
    id: 10,
    factor: "authority",
    choices: [
      { key: "a", text: "I am not sure if I would make a good leader.", narcissistic: false },
      { key: "b", text: "I see myself as a good leader.", narcissistic: true },
    ],
  },
  // 11, Authority
  {
    id: 11,
    factor: "authority",
    choices: [
      { key: "a", text: "I am assertive.", narcissistic: true },
      { key: "b", text: "I wish I were more assertive.", narcissistic: false },
    ],
  },
  // 12, Authority
  {
    id: 12,
    factor: "authority",
    choices: [
      { key: "a", text: "I like to have authority over other people.", narcissistic: true },
      { key: "b", text: "I don't mind following orders.", narcissistic: false },
    ],
  },
  // 13, Exploitativeness
  {
    id: 13,
    factor: "exploitativeness",
    choices: [
      { key: "a", text: "I find it easy to manipulate people.", narcissistic: true },
      { key: "b", text: "I don't like it when I find myself manipulating people.", narcissistic: false },
    ],
  },
  // 14, Entitlement
  {
    id: 14,
    factor: "entitlement",
    choices: [
      { key: "a", text: "I insist upon getting the respect that is due me.", narcissistic: true },
      { key: "b", text: "I usually get the respect that I deserve.", narcissistic: false },
    ],
  },
  // 15, Vanity
  {
    id: 15,
    factor: "vanity",
    choices: [
      { key: "a", text: "I don't particularly like to show off my body.", narcissistic: false },
      { key: "b", text: "I like to show off my body.", narcissistic: true },
    ],
  },
  // 16, Exploitativeness
  {
    id: 16,
    factor: "exploitativeness",
    choices: [
      { key: "a", text: "I can read people like a book.", narcissistic: true },
      { key: "b", text: "People are sometimes hard to understand.", narcissistic: false },
    ],
  },
  // 17, Self-sufficiency
  {
    id: 17,
    factor: "self-sufficiency",
    choices: [
      { key: "a", text: "If I feel competent I am willing to take responsibility for making decisions.", narcissistic: false },
      { key: "b", text: "I like to take responsibility for making decisions.", narcissistic: true },
    ],
  },
  // 18, Entitlement
  {
    id: 18,
    factor: "entitlement",
    choices: [
      { key: "a", text: "I just want to be reasonably happy.", narcissistic: false },
      { key: "b", text: "I want to amount to something in the eyes of the world.", narcissistic: true },
    ],
  },
  // 19, Vanity
  {
    id: 19,
    factor: "vanity",
    choices: [
      { key: "a", text: "My body is nothing special.", narcissistic: false },
      { key: "b", text: "I like to look at my body.", narcissistic: true },
    ],
  },
  // 20, Exhibitionism
  {
    id: 20,
    factor: "exhibitionism",
    choices: [
      { key: "a", text: "I try not to be a show off.", narcissistic: false },
      { key: "b", text: "I will usually show off if I get the chance.", narcissistic: true },
    ],
  },
  // 21, Self-sufficiency
  {
    id: 21,
    factor: "self-sufficiency",
    choices: [
      { key: "a", text: "I always know what I am doing.", narcissistic: true },
      { key: "b", text: "Sometimes I am not sure of what I am doing.", narcissistic: false },
    ],
  },
  // 22, Self-sufficiency
  {
    id: 22,
    factor: "self-sufficiency",
    choices: [
      { key: "a", text: "I sometimes depend on people to get things done.", narcissistic: false },
      { key: "b", text: "I rarely depend on anyone else to get things done.", narcissistic: true },
    ],
  },
  // 23, Exploitativeness
  {
    id: 23,
    factor: "exploitativeness",
    choices: [
      { key: "a", text: "Sometimes I tell good stories.", narcissistic: false },
      { key: "b", text: "Everybody likes to hear my stories.", narcissistic: true },
    ],
  },
  // 24, Entitlement
  {
    id: 24,
    factor: "entitlement",
    choices: [
      { key: "a", text: "I expect a great deal from other people.", narcissistic: true },
      { key: "b", text: "I like to do things for other people.", narcissistic: false },
    ],
  },
  // 25, Entitlement
  {
    id: 25,
    factor: "entitlement",
    choices: [
      { key: "a", text: "I will never be satisfied until I get all that I deserve.", narcissistic: true },
      { key: "b", text: "I take my satisfactions as they come.", narcissistic: false },
    ],
  },
  // 26, Superiority
  {
    id: 26,
    factor: "superiority",
    choices: [
      { key: "a", text: "Compliments embarrass me.", narcissistic: false },
      { key: "b", text: "I like to be complimented.", narcissistic: true },
    ],
  },
  // 27, Entitlement
  {
    id: 27,
    factor: "entitlement",
    choices: [
      { key: "a", text: "I have a strong will to power.", narcissistic: true },
      { key: "b", text: "Power for its own sake doesn't interest me.", narcissistic: false },
    ],
  },
  // 28, Exhibitionism
  {
    id: 28,
    factor: "exhibitionism",
    choices: [
      { key: "a", text: "I don't care about new fads and fashions.", narcissistic: false },
      { key: "b", text: "I like to start new fads and fashions.", narcissistic: true },
    ],
  },
  // 29, Vanity
  {
    id: 29,
    factor: "vanity",
    choices: [
      { key: "a", text: "I like to look at myself in the mirror.", narcissistic: true },
      { key: "b", text: "I am not particularly interested in looking at myself in the mirror.", narcissistic: false },
    ],
  },
  // 30, Exhibitionism
  {
    id: 30,
    factor: "exhibitionism",
    choices: [
      { key: "a", text: "I really like to be the centre of attention.", narcissistic: true },
      { key: "b", text: "It makes me uncomfortable to be the centre of attention.", narcissistic: false },
    ],
  },
  // 31, Self-sufficiency
  {
    id: 31,
    factor: "self-sufficiency",
    choices: [
      { key: "a", text: "I can live my life in any way I want to.", narcissistic: true },
      { key: "b", text: "People can't always live their lives in terms of what they want.", narcissistic: false },
    ],
  },
  // 32, Authority
  {
    id: 32,
    factor: "authority",
    choices: [
      { key: "a", text: "Being an authority doesn't mean that much to me.", narcissistic: false },
      { key: "b", text: "People always seem to recognise my authority.", narcissistic: true },
    ],
  },
  // 33, Authority
  {
    id: 33,
    factor: "authority",
    choices: [
      { key: "a", text: "I would prefer to be a leader.", narcissistic: true },
      { key: "b", text: "It makes little difference to me whether I am a leader or not.", narcissistic: false },
    ],
  },
  // 34, Self-sufficiency
  {
    id: 34,
    factor: "self-sufficiency",
    choices: [
      { key: "a", text: "I am going to be a great person.", narcissistic: true },
      { key: "b", text: "I hope I am going to be successful.", narcissistic: false },
    ],
  },
  // 35, Exploitativeness
  {
    id: 35,
    factor: "exploitativeness",
    choices: [
      { key: "a", text: "People sometimes believe what I tell them.", narcissistic: false },
      { key: "b", text: "I can make anybody believe anything I want them to.", narcissistic: true },
    ],
  },
  // 36, Authority
  {
    id: 36,
    factor: "authority",
    choices: [
      { key: "a", text: "I am a born leader.", narcissistic: true },
      { key: "b", text: "Leadership is a quality that takes a long time to develop.", narcissistic: false },
    ],
  },
  // 37, Superiority
  {
    id: 37,
    factor: "superiority",
    choices: [
      { key: "a", text: "I wish somebody would someday write my biography.", narcissistic: true },
      { key: "b", text: "I don't like people to pry into my life for any reason.", narcissistic: false },
    ],
  },
  // 38, Exhibitionism
  {
    id: 38,
    factor: "exhibitionism",
    choices: [
      { key: "a", text: "I get upset when people don't notice how I look when I go out in public.", narcissistic: true },
      { key: "b", text: "I don't mind blending into the crowd when I go out in public.", narcissistic: false },
    ],
  },
  // 39, Self-sufficiency
  {
    id: 39,
    factor: "self-sufficiency",
    choices: [
      { key: "a", text: "I am more capable than other people.", narcissistic: true },
      { key: "b", text: "There is a lot that I can learn from other people.", narcissistic: false },
    ],
  },
  // 40, Superiority
  {
    id: 40,
    factor: "superiority",
    choices: [
      { key: "a", text: "I am much like everybody else.", narcissistic: false },
      { key: "b", text: "I am an extraordinary person.", narcissistic: true },
    ],
  },
];

// Map factor → which subscale (Grandiose vs Predatory) it loads on.
const FACTOR_TO_SUBSCALE: Record<NarcissistFactor, "grandiose" | "predatory"> = {
  authority: "grandiose",
  "self-sufficiency": "grandiose",
  superiority: "grandiose",
  exhibitionism: "predatory",
  exploitativeness: "predatory",
  vanity: "predatory",
  entitlement: "predatory",
};

// -----------------------------------------------------------------------
// SCORING
// -----------------------------------------------------------------------

/**
 * Score the instrument from a map of itemId → chosen key ("a" | "b").
 * For each item, we look up which choice was narcissistic-keyed and add
 * 1 if the user picked that one. Per-factor and per-subscale tallies
 * are also computed for the result page deep-dive.
 */
export function calculateNarcissistScores(
  answers: Record<number, "a" | "b">,
): NarcissistScores {
  const factors: Record<NarcissistFactor, number> = {
    authority: 0,
    "self-sufficiency": 0,
    superiority: 0,
    exhibitionism: 0,
    exploitativeness: 0,
    vanity: 0,
    entitlement: 0,
  };
  let total = 0;
  let grandiose = 0;
  let predatory = 0;

  for (const item of NARCISSIST_ITEMS) {
    const picked = answers[item.id];
    if (!picked) continue;
    const choice = item.choices.find((c) => c.key === picked);
    if (!choice || !choice.narcissistic) continue;
    total++;
    factors[item.factor]++;
    const sub = FACTOR_TO_SUBSCALE[item.factor];
    if (sub === "grandiose") grandiose++;
    else predatory++;
  }

  return { total, grandiose, predatory, factors };
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
  subscale: NarcissistSubscale,
): number {
  const norms = NARCISSIST_NORMS[subscale];
  const z = (score - norms.mean) / norms.sd;
  return Math.round(Math.max(0, Math.min(100, standardNormalCdf(z) * 100)));
}

export function scoreToTier(
  score: number,
  subscale: NarcissistSubscale,
): NarcissistTier {
  const norms = NARCISSIST_NORMS[subscale];
  if (score < norms.mean - norms.sd) return "low";
  if (score <= norms.mean + norms.sd) return "average";
  if (score <= norms.mean + 2 * norms.sd) return "high";
  return "very-high";
}

export function buildSubscaleResult(
  rawScore: number,
  subscale: NarcissistSubscale,
): NarcissistSubscaleResult {
  return {
    subscale,
    rawScore,
    percentile: scoreToPercentile(rawScore, subscale),
    tier: scoreToTier(rawScore, subscale),
  };
}

export function determineQuadrant(
  grandiose: NarcissistSubscaleResult,
  predatory: NarcissistSubscaleResult,
): NarcissistQuadrant {
  const grHigh = grandiose.tier === "high" || grandiose.tier === "very-high";
  const prHigh = predatory.tier === "high" || predatory.tier === "very-high";
  if (grHigh && prHigh) return "the-full-pattern";
  if (grHigh && !prHigh) return "the-sovereign";
  if (!grHigh && prHigh) return "the-charmer";
  return "functional-self";
}

export function generateNarcissistDiagnosis(
  answers: Record<number, "a" | "b">,
): NarcissistDiagnosis {
  const scores = calculateNarcissistScores(answers);
  const total = buildSubscaleResult(scores.total, "total");
  const grandiose = buildSubscaleResult(scores.grandiose, "grandiose");
  const predatory = buildSubscaleResult(scores.predatory, "predatory");
  const quadrant = determineQuadrant(grandiose, predatory);
  const profile = QUADRANT_PROFILES[quadrant];
  return {
    total,
    grandiose,
    predatory,
    factors: scores.factors,
    quadrant,
    headline: profile.name,
    tagline: profile.tagline,
  };
}

// -----------------------------------------------------------------------
// QUADRANT PROFILES
// -----------------------------------------------------------------------

export interface NarcissistQuadrantProfile {
  quadrant: NarcissistQuadrant;
  name: string;
  tagline: string;
  description: string;
  selfPattern: string;
  externalRead: string;
  blindSpots: string[];
  whatNext: string;
}

export const QUADRANT_PROFILES: Record<
  NarcissistQuadrant,
  NarcissistQuadrantProfile
> = {
  "functional-self": {
    quadrant: "functional-self",
    name: "The Functional Self",
    tagline: "The instrument did not find a narcissistic pattern.",
    description:
      "Both your Grandiose Confidence and your Predatory Pattern subscales sit in the bottom two-thirds of the population. You are not, by any defensible reading of the NPI, exhibiting a narcissistic pattern. You may have arrived here because someone called you self-absorbed in an argument, or because you wanted to know whether the worry you've been carrying about yourself was, in fact, accurate. The result is the result.",
    selfPattern:
      "You have a normal-range relationship with attention. You can take a compliment without inflating; you can give one without resentment. You are capable of leadership when the situation requires it and capable of stepping back when it doesn't. You have, like most people, a private theory about your own gifts; what marks you is that the theory updates when contradicted.",
    externalRead:
      "Friends describe you as confident or capable, rarely as self-centred. The friends who would know would not be surprised by this score. Acquaintances who don't know you well would, if asked, slightly underestimate your darkness because the people who score this low are usually the ones who, in any group, are quietly running the room without needing the credit.",
    blindSpots: [
      "Most people who take this test scoring low were not actually worried about being a narcissist; they were testing the worry, which itself is a tell that the pattern is not present in them. The diagnostic call here is the worry, not the score.",
      "Low NPI scores correlate, in the literature, with somewhat higher self-criticism and lower self-confidence than the Grandiose tier above you. The trade is real and worth being aware of.",
      "If you came here because someone *else* in your life might be the narcissist, the instrument you actually want is not a self-report; it's the partner-detection chapters of the book or the Daughter Pattern Assessment.",
    ],
    whatNext:
      "If you scored low and feel a small disappointment about it, that itself is information. The cultural pull toward wanting to be the dark one in the room is its own pattern, and the people the test is built to detect almost universally believe their score is normal. Wanting to be the predator is a different shape from being one.",
  },
  "the-sovereign": {
    quadrant: "the-sovereign",
    name: "The Sovereign",
    tagline: "High confidence. Low predation. The healthy-ego configuration.",
    description:
      "Your Grandiose Confidence is high or very high; your Predatory Pattern is not. This is the rarest and most interesting result on this instrument. The literature tends to call this 'adaptive narcissism', the leadership, dominance, and self-belief without the entitlement, exploitation, and exhibitionism that produce real-world casualties. You score in the territory the NPI was originally interested in before the field caught the dark side.",
    selfPattern:
      "You take up space without taking from people. You set frames in conversations without stripping the people you're talking to of their own. You enjoy being seen, certainly, but the enjoyment is in the doing of the visible thing rather than the harvesting of the gaze afterwards. When you've been wrong, you can say so without it costing you anything. The cost-free admission is the diagnostic line, the Predatory Pattern people cannot make it.",
    externalRead:
      "People describe you as confident, often as charismatic, sometimes as a lot, but very rarely as draining. The friend who has stuck around longest is the one who clocked early that your confidence does not require their smallness to maintain itself, and they relaxed accordingly. You have noticed this and not commented on it.",
    blindSpots: [
      "You may underestimate how much your Predatory subscale being low is a stable trait of yours rather than a phase. People who configure this way sometimes spend years suspecting the dark version is about to arrive; it usually doesn't. You can take that off the worry list.",
      "The Sovereign is the rarest result on this instrument and the easiest one to lose by environment. Wrong job, wrong partner, wrong decade can drift this configuration toward the Full Pattern through accumulated small entitlements. The drift is worth watching for.",
      "You are likely to find the Predatory Pattern profiles, the Charmer and the Full Pattern, more recognisable in people you've dated than in yourself. That recognition is the data the partner-detection material is built for.",
    ],
    whatNext:
      "Your work is not on the narcissism axis. You're at low risk on the construct most relevant to it. What is more often the actual issue for Sovereigns is that they keep ending up in relationships with the Charmer or Full Pattern configurations, who experience the Sovereign's confidence as the crown they have to take. The Sociopathic Dating Bible's chapters on partner detection are written for exactly this.",
  },
  "the-charmer": {
    quadrant: "the-charmer",
    name: "The Charmer",
    tagline: "Low confidence. High predation. The covert-leaning configuration.",
    description:
      "Your Grandiose Confidence is in the low or average band; your Predatory Pattern is high or very high. This configuration is closer to what the field calls vulnerable or covert narcissism than to classical grandiose narcissism. The exploitative, entitled, exhibitionist, and vain factors are present, but the underlying confidence isn't. The result is a pattern in which the narcissistic supply has to be extracted from other people because the internal supply isn't there.",
    selfPattern:
      "You operate through manipulation more than through dominance. You tell stories that put you at the centre. You expect things from people that you would not articulate as expectations. You are sensitive to slights you can name and to slights you can't. You may have, in conflict, the experience of feeling small and powerful at the same time, the sensation that's actually the diagnostic flicker for this configuration.",
    externalRead:
      "People who get close enough to you eventually clock that the warmth runs out before the night is over. They don't always have language for it; they do have the experience. Your social circles tend to be built of people who are, for various reasons, available for the kind of attention you require, which means the circle is durable but not always ascending. The next layer of friend is hard to recruit because the next layer can read what the current layer has stopped seeing.",
    blindSpots: [
      "You experience your Predatory subscale's behaviour as reactive rather than chosen, and the people on the receiving end experience it as chosen rather than reactive. The gap between the two readings is where most of your relational damage compounds.",
      "Covert narcissism is the configuration most likely to score low on this NPI and high on the companion HSNS (Hypersensitive Narcissism Scale). If your Charmer score feels too low for what you suspect about yourself, take the Covert Narcissist Test next. It's looking for the pattern this instrument can underread.",
      "The Charmer's longest-running relationships are often with people who are themselves on a different axis, high Sociopathy or high BPD profiles. The matching is not random and the chemistry is not fate.",
    ],
    whatNext:
      "Two genuinely different paths. One: take the Covert Narcissist Test next, the construct it measures (vulnerable narcissism, hypersensitivity, shame-based grandiosity) often configures with this exact NPI shape and the second test sharpens the read. Two: a clinician with experience in vulnerable narcissism specifically, not just NPD, and not just anxiety. The right diagnosis matters, the wrong therapy entrenches the pattern.",
  },
  "the-full-pattern": {
    quadrant: "the-full-pattern",
    name: "The Full Pattern",
    tagline: "Both subscales lit. The clinical-grade grandiose configuration.",
    description:
      "Both your Grandiose Confidence and your Predatory Pattern are high or very high. This is the configuration the NPI was built to detect, the same one most people picture when they hear the word 'narcissist'. It places you in roughly the top 5% of the general population on this instrument. The instrument cannot diagnose Narcissistic Personality Disorder; that requires a clinician with a full history. But a high score on both subscales is the right signal for considering a diagnostic assessment with a personality-disorder specialist.",
    selfPattern:
      "You have a long memory of being underestimated and a short memory of being wrong. You have, somewhere along the way, made peace with the fact that the way you read your own importance is not the way other people read theirs and that the asymmetry is durable. You may notice that conversations bend toward you in groups, and you may have stopped wondering why. Your most stable relationships are with people who can be subordinated without resenting it; the ones who couldn't have already left.",
    externalRead:
      "People around you have organised themselves into two groups: the ones who can take the temperature and the ones who pretend they can't. You know which is which. The first group is small, durable, useful. The second group is being managed, and the management is itself a workload that wears on the people doing it without them naming it.",
    blindSpots: [
      "The Full Pattern's biggest practical risk is that the Predatory Pattern subscale produces consequences (relationships ending, careers stalling, lawsuits filing) that the Grandiose Confidence subscale immediately rationalises away. The result is a long pattern in which you accumulate damage you do not metabolise, which compounds across decades.",
      "You almost certainly underestimate how legible the configuration is to outside observers. You experience yourself as variable and contextual; people around you experience you as a pattern. The disagreement is not your fault; it is, however, your liability.",
      "Pride in scoring high here is itself part of the configuration. The honest version of the response is closer to neutrality, which the next clinician you see will be looking for.",
    ],
    whatNext:
      "Honest options. One, see a clinician who specialises in personality disorders, ideally one with experience in NPD specifically, and get a full diagnostic interview. The instrument cannot diagnose; only the clinician can. Two, the Sociopathic Dating Bible's chapters on the predator's interior were written by an author with a different but adjacent diagnosis (ASPD, not NPD) and they will read as either familiar or accusatory depending on where in the configuration you currently are. Three, the Consilium has, by deliberate design, a higher concentration of users with this configuration than the general population; the room is not safer because it's gentler.",
  },
};

// -----------------------------------------------------------------------
// SUBSCALE TIER INTERPRETATIONS, 8 short paragraphs
// -----------------------------------------------------------------------

export interface NarcissistSubscaleTierInterpretation {
  subscale: "grandiose" | "predatory";
  tier: NarcissistTier;
  meaning: string;
  inLife: string;
}

export const NARCISSIST_SUBSCALE_TIER_INTERPRETATIONS: Record<
  string,
  NarcissistSubscaleTierInterpretation
> = {
  "grandiose:low": {
    subscale: "grandiose",
    tier: "low",
    meaning:
      "Your Grandiose Confidence sits in the bottom 16% of the population.",
    inLife:
      "You under-claim. You let credit go to other people for work that was yours. You may experience this as humility and the world may experience it as available bandwidth. The trade is real and worth knowing.",
  },
  "grandiose:average": {
    subscale: "grandiose",
    tier: "average",
    meaning:
      "Your Grandiose Confidence sits in the broad middle of the population.",
    inLife:
      "You take up an average amount of space and update normally on contradiction. The modal configuration. Most adults score here.",
  },
  "grandiose:high": {
    subscale: "grandiose",
    tier: "high",
    meaning:
      "Your Grandiose Confidence sits in roughly the top 16% of the population.",
    inLife:
      "Leadership, dominance, and self-belief register clearly in your behaviour. Whether this reads as charisma or as too-much depends almost entirely on whether your Predatory subscale is keeping pace.",
  },
  "grandiose:very-high": {
    subscale: "grandiose",
    tier: "very-high",
    meaning:
      "Your Grandiose Confidence sits in roughly the top 2-3%.",
    inLife:
      "You walk into rooms expecting them to rearrange. The expectation is usually met, which is itself the data. People around you have stopped commenting on it.",
  },
  "predatory:low": {
    subscale: "predatory",
    tier: "low",
    meaning:
      "Your Predatory Pattern sits in the bottom 16% of the population.",
    inLife:
      "Entitlement, exploitation, exhibitionism, and vanity register as low. People do not, by and large, leave interactions with you feeling smaller than when they entered. This is the protective subscale; whatever else is true of your scores, this is the one that limits damage.",
  },
  "predatory:average": {
    subscale: "predatory",
    tier: "average",
    meaning:
      "Your Predatory Pattern sits in the broad middle.",
    inLife:
      "Normal-range entitlement and exploitation. The modal configuration.",
  },
  "predatory:high": {
    subscale: "predatory",
    tier: "high",
    meaning:
      "Your Predatory Pattern sits in roughly the top 16%.",
    inLife:
      "The exploitative, entitled, and exhibitionist factors are clearly present in your behaviour. People closest to you are paying a tax for the relationship that they are not always articulating.",
  },
  "predatory:very-high": {
    subscale: "predatory",
    tier: "very-high",
    meaning:
      "Your Predatory Pattern sits in roughly the top 2-3%.",
    inLife:
      "The factors that produce real-world relational damage are at clinical-adjacent levels. The instrument cannot diagnose, but it can flag, and this is the flag.",
  },
};

export function getNarcissistTierInterpretation(
  subscale: "grandiose" | "predatory",
  tier: NarcissistTier,
): NarcissistSubscaleTierInterpretation {
  return NARCISSIST_SUBSCALE_TIER_INTERPRETATIONS[`${subscale}:${tier}`]!;
}

// -----------------------------------------------------------------------
// QUIZ INFO + FAQ
// -----------------------------------------------------------------------

export const NARCISSIST_QUIZ_INFO = {
  slug: "narcissist",
  name: "The Narcissist Test",
  fullName: "The Narcissist Test (NPI-40) · Dark Mirror by Kanika Rose",
  shortName: "Narcissist Test",
  tagline: "Calibrated by the NPI-40. Read by a real one.",
  description:
    "A 40-item forced-choice assessment based on the Narcissistic Personality Inventory (NPI-40, Raskin & Terry 1988). Two-subscale presentation: Grandiose Confidence and Predatory Pattern. Calibrated against published population norms (M=15.3, SD=6.8). Educational only, not a diagnosis.",
  itemCount: NARCISSIST_ITEMS.length,
  estimatedMinutes: 7,
  price: 0,
  disclaimer:
    "Educational and reflective use only. The NPI is a research instrument, not a diagnostic one, and measures grandiose narcissism specifically. Vulnerable / covert narcissism is measured by a different scale (HSNS) on /quiz/covert-narcissist. Only a licensed clinician with a full history can diagnose Narcissistic Personality Disorder.",
  basedOn:
    "Raskin, R., & Terry, H. (1988). A principal-components analysis of the Narcissistic Personality Inventory and further evidence of its construct validity. Journal of Personality and Social Psychology, 54(5), 890-902.",
} as const;

export const NARCISSIST_QUIZ_FAQ = [
  {
    question:
      "What is the Narcissist Test and what does it actually measure?",
    answer:
      "The Narcissist Test is a 40-item forced-choice assessment built on the Narcissistic Personality Inventory (NPI-40, Raskin & Terry 1988). It scores you on two subscales: Grandiose Confidence (Authority, Self-sufficiency, Superiority, the leadership and self-belief factors) and Predatory Pattern (Exploitativeness, Entitlement, Exhibitionism, Vanity, the factors that produce real-world relational damage). Your raw score is calibrated against published population norms (n>500, M=15.3, SD=6.8).",
  },
  {
    question: "Is this a diagnosis?",
    answer:
      "No. The NPI is a research instrument, not a diagnostic one. Only a licensed clinician with a full history can diagnose Narcissistic Personality Disorder. What this assessment can do is give you a calibrated read against published norms on the construct of grandiose narcissism, which is genuinely useful for self-recognition or partner-recognition. It is not useful for self-labelling and we won't help you use it that way.",
  },
  {
    question: "What's the difference between this and the Covert Narcissist Test?",
    answer:
      "The NPI-40 measures GRANDIOSE narcissism, confidence, dominance, exhibitionism, the loud version. The Covert Narcissist Test (/quiz/covert-narcissist) measures VULNERABLE narcissism, hypersensitivity, shame-based grandiosity, the quiet version. They sometimes co-occur, often don't, and they look completely different in real life. If you scored high on Predatory Pattern but low on Grandiose Confidence here, the Covert test is the next call.",
  },
  {
    question: "Why forced-choice instead of agree/disagree?",
    answer:
      "Because that's how the NPI was validated. Raskin & Terry built and tested it as forced-choice; subsequent Likert adaptations exist but compromise the calibration to the original norms. Sticking with forced-choice keeps the result interpretable against the published reference data the field uses.",
  },
  {
    question: "Who built this?",
    answer:
      "Kanika Rose, clinically diagnosed with Antisocial Personality Disorder, author of the Sociopathic Dating Bible. The instrument used (NPI-40) is the academic standard; the items are reproduced from Raskin & Terry 1988 with only minor punctuation harmonisation. The scoring follows the published 7-factor solution exactly. The voice of the result-page interpretations is mine; the instrument is the field's.",
  },
  {
    question: "I scored high on Grandiose but low on Predatory. What does that mean?",
    answer:
      "You've configured as 'The Sovereign', high confidence and leadership traits without the exploitative or entitled subscale lit. This is the rarest result on the instrument and the closest the NPI gets to identifying healthy ego rather than narcissistic pattern. The result page lays out what this means and what to watch for.",
  },
  {
    question: "I scored high on Predatory but low on Grandiose. What does that mean?",
    answer:
      "You've configured as 'The Charmer', exploitative and entitled patterns without the underlying confidence that classical grandiose narcissism shows. This configuration overlaps significantly with vulnerable / covert narcissism. The next call is the Covert Narcissist Test, which uses a different instrument (HSNS) calibrated for exactly this pattern.",
  },
  {
    question: "Can the test detect a narcissist I'm dating?",
    answer:
      "Not directly. This is a self-report, your partner has to take it for it to score them. What you CAN do is read the four quadrant profiles on the result page and recognise the configuration in someone you know. The partner-detection chapters of the Sociopathic Dating Bible go further; they are built for that question specifically.",
  },
  {
    question: "Are my answers private?",
    answer:
      "Stored only in your browser session by default. We do not sell or share quiz responses. If you choose to register an account or capture your result via email, the data lives on our servers under the same access controls as any registered-user data and you can request deletion at any time.",
  },
  {
    question: "I'm worried I'm a narcissist. Should I take this?",
    answer:
      "Yes, with one caveat. People who are actively worried they might be narcissists almost universally are not the ones the test is built to detect. The worry itself is the diagnostic line, diagnosable narcissism rarely produces sincere doubt about the diagnosis. But the test will give you a calibrated answer, which is more useful than the worry, and you can take that to a clinician if anything in the result genuinely surprised you.",
  },
] as const;
