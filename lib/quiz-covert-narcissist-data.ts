// The Covert Narcissist Test (HSNS), items, scoring, and tier profiles.
//
// Built on the Hypersensitive Narcissism Scale (HSNS), Hendin & Cheek
// 1997, J Res Pers 31(4), 588-599. The HSNS is the canonical
// self-report measure of vulnerable / covert narcissism, the quiet
// version that the NPI-40 systematically underreads.
//
// Format: 10 items, 5-point Likert (1 = Very uncharacteristic, 5 =
// Very characteristic). All items are direct-keyed; total range
// 10-50.
//
// This is a single-subscale instrument. Where the Sociopath and
// Narcissist tests offer two-axis quadrant interpretations, this one
// reads as a tier on the construct (Low / Average / High / Very
// High) with a long-form profile per tier.
//
// Pairs deliberately with /quiz/narcissist (NPI-40, grandiose).
// Together they triangulate: high-NPI + low-HSNS reads as classical
// grandiose; low-NPI + high-HSNS reads as classical covert; both
// high reads as the rare "malignant" or "exhibitionistic-vulnerable"
// blend that the more recent narcissism literature (Pincus et al.
// 2009 PNI) identifies as the highest-cost configuration.

import { COVERT_NARCISSIST_NORMS } from "@/lib/quiz-covert-narcissist-norms";

export type CovertNarcissistTier = "low" | "average" | "high" | "very-high";

export interface CovertNarcissistItem {
  id: number;
  /** Likert statement; user rates 1-5 how characteristic of them. */
  statement: string;
}

export interface CovertNarcissistScores {
  total: number; // 10-50
}

export interface CovertNarcissistDiagnosis {
  rawScore: number;
  percentile: number;
  tier: CovertNarcissistTier;
  /** Headline shown on results page. */
  headline: string;
  /** One-line tagline under the headline. */
  tagline: string;
}

// -----------------------------------------------------------------------
// THE 10 ITEMS
//
// Reproduced from Hendin & Cheek 1997 with only punctuation
// harmonisation. Item order matches the published instrument.
// -----------------------------------------------------------------------

export const COVERT_NARCISSIST_ITEMS: CovertNarcissistItem[] = [
  {
    id: 1,
    statement:
      "I can become entirely absorbed in thinking about my personal affairs, my health, my cares, or my relations with others.",
  },
  {
    id: 2,
    statement:
      "My feelings are easily hurt by ridicule or by the slighting remarks of others.",
  },
  {
    id: 3,
    statement:
      "When I enter a room I often become self-conscious and feel that the eyes of others are upon me.",
  },
  {
    id: 4,
    statement: "I dislike sharing the credit of an achievement with others.",
  },
  {
    id: 5,
    statement:
      "I feel that I have enough on my hands without worrying about other people's troubles.",
  },
  {
    id: 6,
    statement: "I feel that I am temperamentally different from most people.",
  },
  {
    id: 7,
    statement: "I often interpret the remarks of others in a personal way.",
  },
  {
    id: 8,
    statement:
      "I easily become wrapped up in my own interests and forget the existence of others.",
  },
  {
    id: 9,
    statement:
      "I dislike being with a group unless I know that I am appreciated by at least one of those present.",
  },
  {
    id: 10,
    statement:
      "I am secretly put out or annoyed when other people come to me with their troubles, asking for my time and sympathy.",
  },
];

export interface LikertOption {
  value: 1 | 2 | 3 | 4 | 5;
  label: string;
  shortLabel: string;
}

export const COVERT_LIKERT_OPTIONS: readonly LikertOption[] = [
  { value: 1, label: "Very uncharacteristic of me", shortLabel: "Very uncharacteristic" },
  { value: 2, label: "Uncharacteristic", shortLabel: "Uncharacteristic" },
  { value: 3, label: "Neutral", shortLabel: "Neutral" },
  { value: 4, label: "Characteristic", shortLabel: "Characteristic" },
  { value: 5, label: "Very characteristic of me", shortLabel: "Very characteristic" },
] as const;

// -----------------------------------------------------------------------
// SCORING
// -----------------------------------------------------------------------

export function calculateCovertNarcissistScores(
  answers: Record<number, 1 | 2 | 3 | 4 | 5>,
): CovertNarcissistScores {
  let total = 0;
  for (const item of COVERT_NARCISSIST_ITEMS) {
    const v = answers[item.id];
    if (v) total += v;
  }
  return { total };
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

export function scoreToPercentile(score: number): number {
  const z =
    (score - COVERT_NARCISSIST_NORMS.mean) / COVERT_NARCISSIST_NORMS.sd;
  return Math.round(Math.max(0, Math.min(100, standardNormalCdf(z) * 100)));
}

export function scoreToTier(score: number): CovertNarcissistTier {
  if (score < COVERT_NARCISSIST_NORMS.mean - COVERT_NARCISSIST_NORMS.sd)
    return "low";
  if (score <= COVERT_NARCISSIST_NORMS.mean + COVERT_NARCISSIST_NORMS.sd)
    return "average";
  if (score <= COVERT_NARCISSIST_NORMS.mean + 2 * COVERT_NARCISSIST_NORMS.sd)
    return "high";
  return "very-high";
}

export function generateCovertNarcissistDiagnosis(
  answers: Record<number, 1 | 2 | 3 | 4 | 5>,
): CovertNarcissistDiagnosis {
  const { total } = calculateCovertNarcissistScores(answers);
  const tier = scoreToTier(total);
  const profile = TIER_PROFILES[tier];
  return {
    rawScore: total,
    percentile: scoreToPercentile(total),
    tier,
    headline: profile.name,
    tagline: profile.tagline,
  };
}

// -----------------------------------------------------------------------
// TIER PROFILES, the four long-form interpretations
// -----------------------------------------------------------------------

export interface CovertNarcissistTierProfile {
  tier: CovertNarcissistTier;
  name: string;
  tagline: string;
  description: string;
  selfPattern: string;
  externalRead: string;
  blindSpots: string[];
  whatNext: string;
}

export const TIER_PROFILES: Record<
  CovertNarcissistTier,
  CovertNarcissistTierProfile
> = {
  low: {
    tier: "low",
    name: "The Functional Self",
    tagline: "Vulnerable narcissism does not register on this instrument.",
    description:
      "Your HSNS score sits in the bottom 16% of the population. The construct of vulnerable / covert narcissism, hypersensitivity to slights, shame-based grandiosity, the secret reservoir of contempt for people who ask for your sympathy, is not registering as your operating system. You may have arrived here because someone called you a covert narcissist in an argument, or because the worry has been quietly chewing through you for months. The result is the result.",
    selfPattern:
      "You take a slight as a slight, not as a referendum on your worth. You can give credit without resenting the giving. You can leave a room of strangers without first auditing whether they noticed you. None of this is virtue, it's the absence of the specific hypersensitivity HSNS is built to detect.",
    externalRead:
      "People around you describe you as steady. The closest people to you, asked privately, would not be surprised by this score. Vulnerable narcissism leaks at scale; people who are around someone with high HSNS for a year already know.",
    blindSpots: [
      "If you came here because you suspect a partner or family member is the covert narcissist, the relevant call is not this score; it's the partner-detection chapters of the Sociopathic Dating Bible plus, for parents specifically, the Daughter Pattern Assessment.",
      "Low HSNS does not mean low NPI. Some people score low here and high on /quiz/narcissist, that's classical grandiose narcissism (loud, confident, unbothered) without the vulnerable shame layer underneath.",
      "The HSNS construct overlaps significantly with social anxiety; if your score came in close to the boundary, the worry that drove you here is more likely about social anxiety than about narcissism, which is genuinely useful information to have.",
    ],
    whatNext:
      "If you're disappointed by a low score, that's its own data, the people who actually configure as covert narcissists almost universally read this score as either accurate or already-too-high. Wanting a darker score than you have is a different pattern from having one.",
  },
  average: {
    tier: "average",
    name: "Average-Range",
    tagline: "Within the broad middle of the population.",
    description:
      "Your HSNS score sits in the broad middle band, ±1 SD from the mean. Some hypersensitivity to ridicule, some self-consciousness in groups, some interpretation of remarks in personal terms, all in the normal range, what the literature describes as the everyday human portion of the construct rather than the pathological one.",
    selfPattern:
      "You sometimes leave a social interaction running it back, sometimes feel the slight cut deeper than it deserved, sometimes notice a small reservoir of envy when a peer succeeds. This is not covert narcissism, it's being a person with a normally-organised ego in a culture that hasn't given any of us a particularly good script for handling threat to it.",
    externalRead:
      "People around you would not describe you as covert anything. The hypersensitivity, when it surfaces, is contextual rather than constitutional, and people who know you read it as a state, not a trait.",
    blindSpots: [
      "Average-range HSNS scores produce more genuine self-reflection than either the low or high tiers. The middle is where the worry lives, and it is, mostly, useful worry.",
      "If your NPI score (on /quiz/narcissist) was also in the middle range, you're statistically the most common configuration on the dark-psychology axis, not narcissistic, capable of healthy ego, capable of normal-range reactivity to slights, and therefore not the protagonist of any of the dramatic profiles. This is a feature.",
      "If your NPI score was high and your HSNS is average, you're probably reading these tier profiles for the high tier and recognising yourself in them. The recognition is the data.",
    ],
    whatNext:
      "Nothing specific to this construct. If you took this test because of a relationship pattern or a worry about yourself, the better next call is probably the Dark Mirror Assessment for the wide map, or the partner-detection chapters of the book if the worry is about someone else.",
  },
  high: {
    tier: "high",
    name: "The Hypersensitive",
    tagline:
      "Vulnerable narcissism is registering. The quiet version of the loud disorder.",
    description:
      "Your HSNS score sits in roughly the top 16% of the population. Vulnerable / covert narcissism is registering. This is the part of narcissism that the NPI-40 systematically underreads, the hypersensitivity, the shame-based grandiosity, the secret contempt for the people whose sympathy you require. The classical descriptions are by Akhtar 1989, Pincus et al. 2009, and (more accessibly) Malkin's 2015 *Rethinking Narcissism*.",
    selfPattern:
      "You replay slights for days. You feel the eyes of strangers when you enter a room you have no specific reason to feel watched in. You experience the success of peers as a small private wound. You give credit grudgingly even when the credit is genuinely owed. You secretly resent the people who come to you with their troubles, while continuing, on the surface, to receive them, because the receiving is part of the script that holds the version of you you can live with in place. Some of these will be familiar, some will be uncomfortably specific. The discomfort is the diagnostic line.",
    externalRead:
      "The people closest to you have, by now, learned the script. They edit. They moderate the directness of feedback. They route around your moods. They do not name what they're doing. The friend group you have at 35 is not the friend group you had at 22, and the gap is not random; the high-HSNS configuration produces a specific attrition pattern in social networks because the maintenance work compounds across years.",
    blindSpots: [
      "Vulnerable narcissism is the pattern most likely to be confused with anxiety, depression, or trauma response, and to be treated as those things, sometimes for years, by therapists who don't have specific covert-narcissism training. The right diagnosis matters; the wrong therapy entrenches.",
      "You are not getting smaller doses of the standard narcissistic pattern; you are getting the same construct organised around shame instead of around grandiosity. This is why the NPI-40 misses it. You are not a 'less successful' grandiose narcissist. You are a different configuration entirely.",
      "The contempt is the hardest part to admit, and the most diagnostic. Most people in the high-HSNS tier will read item 10 (secretly put out when others come with their troubles) and recognise themselves with a small jolt. The jolt is the construct's signature.",
    ],
    whatNext:
      "Two paths that work, one that doesn't. The one that doesn't: any therapy that treats this as anxiety or low self-esteem, those frames protect the construct rather than expose it. The two that do: (1) a clinician with specific training in vulnerable narcissism (ask, by name, before you book), and (2) the long-form reading on covert narcissism, Malkin's *Rethinking Narcissism* and Pincus's PNI papers are the technical entry. The pattern is harder to shift than grandiose narcissism because the surface presents as suffering, but it is genuinely shiftable; the shift starts with the patient naming the contempt without flinching.",
  },
  "very-high": {
    tier: "very-high",
    name: "The Hidden Layer",
    tagline: "Top 2-3%. The fully-organised covert configuration.",
    description:
      "Your HSNS score sits in roughly the top 2-3% of the population. The full vulnerable-narcissistic configuration is registering, hypersensitivity, shame-based grandiosity, contempt-for-the-needy, the secret feeling of temperamental superiority that lives underneath the public posture of being a person who takes things hard. This is the configuration the more recent narcissism literature (Pincus 2009, Krizan & Herlache 2018) takes most seriously and that the NPI-40 most reliably misses.",
    selfPattern:
      "You read these tier profiles and you flinch at the specifics. Item 10 in particular, the secret resentment of people who come to you with their troubles, is a sentence you have never said out loud and have not, until now, seen written down by someone who knew you wouldn't say it. The flinch is the data. People in this tier do not, typically, score this high by accident; the construct is consolidated.",
    externalRead:
      "The people in your life have, mostly, organised themselves into roles relative to you, the audience, the emotional labour, the peer who is allowed to outshine you in narrow domains, the one who is not. They did this without naming it, and you accepted the arrangement without naming it. The arrangement holds because everyone is doing the maintenance work; it does not hold the day someone stops.",
    blindSpots: [
      "Your worst relational damage is done in the gap between how you experience your own behaviour (as reactive, hurt, defending against attack) and how the people around you experience it (as cold, calculating, aimed). You are not lying to either side. The gap is structural to the configuration.",
      "The contempt is real and it is yours. The shame-based ego cannot survive the moment it admits the contempt is contempt rather than self-defence. Most therapy stops short of the moment for that reason. The therapy that doesn't stop short is the one worth finding.",
      "Vulnerable narcissism at this level co-occurs at higher-than-base rates with depression, with eating-disorder histories in women, and with a specific pattern of relational violence in men. The instrument cannot tell you which (if any) is also true of you; a clinician with the right specialty can.",
    ],
    whatNext:
      "Honest options. One: a clinician with specific training in vulnerable narcissism, named explicitly before you book. The wrong clinician will either treat this as depression and entrench the construct, or treat this as classical NPD and miss most of the actual mechanism. Two: the long-form reading, Pincus's PNI papers, Malkin's book, and the *Sociopathic Dating Bible*'s chapter on the covert pattern, which was written by an author with an adjacent diagnosis and reads from the inside. Three: the Consilium has, by deliberate design, threads dedicated to this exact configuration; the room is not safer because it's gentler, it is safer because it has been read.",
  },
};

// -----------------------------------------------------------------------
// QUIZ INFO + FAQ
// -----------------------------------------------------------------------

export const COVERT_NARCISSIST_QUIZ_INFO = {
  slug: "covert-narcissist",
  name: "The Covert Narcissist Test",
  fullName:
    "The Covert Narcissist Test (HSNS) · Dark Mirror by Kanika Rose",
  shortName: "Covert Narcissist Test",
  tagline: "The quiet version of the loud disorder.",
  description:
    "A 10-item Likert assessment based on the Hypersensitive Narcissism Scale (HSNS, Hendin & Cheek 1997). Measures vulnerable / covert narcissism specifically, the pattern the NPI-40 systematically underreads. Calibrated against published norms (M=26.7, SD=6.6).",
  itemCount: COVERT_NARCISSIST_ITEMS.length,
  estimatedMinutes: 3,
  price: 0,
  disclaimer:
    "Educational and reflective use only. The HSNS is a research instrument, not a diagnostic one. Vulnerable narcissism is not a separate DSM diagnosis; it is a construct increasingly recognised in the personality-disorder literature. Only a licensed clinician with a full history can diagnose any personality disorder.",
  basedOn:
    "Hendin, H. M., & Cheek, J. M. (1997). Assessing Hypersensitive Narcissism: A Reexamination of Murray's Narcism Scale. Journal of Research in Personality, 31(4), 588-599.",
} as const;

export const COVERT_NARCISSIST_QUIZ_FAQ = [
  {
    question:
      "What is the Covert Narcissist Test and what does it actually measure?",
    answer:
      "The Covert Narcissist Test is a 10-item Likert assessment based on the Hypersensitive Narcissism Scale (HSNS), Hendin & Cheek 1997, the standard self-report measure of vulnerable / covert narcissism in the academic literature. It measures hypersensitivity to slights, shame-based grandiosity, self-consciousness in groups, and the specific pattern of secret contempt for people who require sympathy. Calibrated against the original n=535 undergraduate norms (M=26.7, SD=6.6).",
  },
  {
    question:
      "What's the difference between covert narcissism and regular (grandiose) narcissism?",
    answer:
      "Different organisations of the same underlying construct. Grandiose narcissism (measured by the NPI-40 on /quiz/narcissist) presents as confident, dominant, exhibitionist, and unbothered, the loud, public version. Covert / vulnerable narcissism (this test) presents as hypersensitive, anxious in groups, secretly contemptuous, shame-based, the quiet version. The same underlying need for narcissistic supply, organised around shame rather than around grandiosity. The two configurations look completely different in real life and respond to different interventions.",
  },
  {
    question:
      "Is covert narcissism a real thing or a TikTok thing?",
    answer:
      "Real. The construct has been in the academic literature since Akhtar 1989 and was systematised by Pincus and colleagues with the Pathological Narcissism Inventory (PNI) in 2009. It is not (yet) a DSM-5 diagnosis; the DSM treats narcissism as a single category (NPD) and does not split grandiose from vulnerable. The clinical literature has moved ahead of the DSM on this. The TikTok flattening of 'covert narcissist' to mean 'anyone passive-aggressive' is unrelated; the construct as the field uses it is more specific.",
  },
  {
    question: "Is this a diagnosis?",
    answer:
      "No. The HSNS is a research instrument, not a diagnostic one. It cannot diagnose narcissistic personality disorder, and 'covert narcissism' is not itself a separate DSM diagnosis. What this assessment can do is give you a calibrated read against published research norms on the vulnerable-narcissism construct, which is genuinely useful for self-recognition or partner-recognition.",
  },
  {
    question: "Should I take both this and the NPI-40?",
    answer:
      "Yes if you want the full picture. The two instruments measure different organisations of narcissism and triangulate well together. Common configurations: high NPI + low HSNS = classical grandiose narcissism, low NPI + high HSNS = classical covert narcissism, both high = the rare but high-cost 'malignant' or 'exhibitionistic-vulnerable' blend (Pincus et al. 2009 PNI work). The two scores together are more informative than either alone.",
  },
  {
    question: "I'm worried I'm a covert narcissist. Should I take this?",
    answer:
      "Yes, with one caveat. Sincere worry that you might be a covert narcissist is, in itself, weak diagnostic evidence against the configuration, the people the test is built to detect rarely worry about it in plain terms; they worry about it as 'people don't appreciate me' or 'I'm too sensitive'. But the test will give you a calibrated answer, which is more useful than the worry, and the result page lays out the four tiers in enough detail that you'll recognise yourself if the configuration is genuinely there.",
  },
  {
    question: "Can the test detect a covert narcissist I'm dating?",
    answer:
      "Not directly. This is a self-report; your partner has to take it for it to score them. What you CAN do is read the High and Very High tier profiles on the result page and recognise the configuration in someone you know. The partner-detection chapters of the Sociopathic Dating Bible go further; they are written for that question specifically and the covert pattern is one of the configurations they cover in detail.",
  },
  {
    question: "Why only 10 items?",
    answer:
      "Because that's the published HSNS. Hendin & Cheek explicitly tested longer and shorter versions; the 10-item form had the cleanest factor structure and best alpha (~0.72-0.75 across replications). Adding items would either pad the construct (lower alpha) or test something different. Sticking with the canonical 10 keeps the calibration valid.",
  },
  {
    question: "Are my answers private?",
    answer:
      "Stored only in your browser session by default. We do not sell or share quiz responses. If you choose to register an account or capture your result via email, the data lives on our servers under the same access controls as any registered-user data and you can request deletion at any time.",
  },
  {
    question: "How is this different from a social anxiety quiz?",
    answer:
      "The two constructs overlap on hypersensitivity-to-others-in-groups, but they diverge on the underlying motivation. Social anxiety is about fear of negative evaluation; vulnerable narcissism is about the hidden grandiosity AND the shame, both at once. Items 4 (sharing credit), 8 (forgetting others' existence), 9 (need-to-be-appreciated), and 10 (secret contempt for askers-of-sympathy) are the discriminators, high social anxiety alone would not produce high scores on those four.",
  },
] as const;
