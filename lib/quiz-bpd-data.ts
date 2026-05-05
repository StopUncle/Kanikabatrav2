// The BPD Test (MSI-BPD), items, scoring, and tier profiles.
//
// Built on the McLean Screening Instrument for Borderline Personality
// Disorder (MSI-BPD), Zanarini, Vujanovic, Parachini, Boulanger, Frankenburg
// & Hennen (2003), J Personal Disord 17(6), 568-573. The MSI-BPD is the
// most widely cited brief screening instrument for BPD in the academic
// literature.
//
// Format: 10 yes/no items, each mapping to one of the 9 DSM-IV/5
// criteria for BPD (item 10 covers the "frantic efforts to avoid
// abandonment" criterion explicitly, item 1 the unstable-relationships
// criterion, etc.). Score = sum of "yes" responses (range 0-10).
//
// Established cutoff: ≥7 yes responses indicates a likely BPD pattern.
// In the validation study (Zanarini 2003) the cutoff produced 81%
// sensitivity and 85% specificity against full clinical interview.
// Replications (Patel 2011, Chanen 2008 in adolescents, Melartin 2009
// in depressed adults) report comparable diagnostic accuracy.
//
// Tier banding (slightly different from the 1-SD convention used in
// the other quizzes here, because the MSI-BPD has an established
// clinical cutoff that's more meaningful than a population SD):
//   Low      0-2  general-population range
//   Average  3-4  some BPD-trait registration, sub-clinical
//   High     5-6  significant trait registration, below Zanarini cutoff
//   Very High 7-10 at or above the Zanarini cutoff for likely BPD
//
// IMPORTANT: BPD is one of the most stigmatised, most often-misdiagnosed
// personality disorders. The Kanika voice on this result page must be
// careful not to lean into the stigmatising clinical history of the
// diagnosis. The construct is real and the suffering is real; the
// shorthand cultural read of "BPD = manipulative woman" is not
// supported by the literature and is not the read this page provides.

export type BPDTier = "low" | "average" | "high" | "very-high";

export interface BPDItem {
  /** 1-10, matches Zanarini 2003 canonical numbering. */
  id: number;
  /** Yes/no question. */
  statement: string;
  /** Which DSM-5 BPD criterion this item maps to. */
  dsmCriterion: string;
}

export interface BPDScores {
  total: number; // 0-10
}

export interface BPDDiagnosis {
  rawScore: number;
  tier: BPDTier;
  /** Above Zanarini's published cutoff of 7 for likely BPD. */
  meetsCutoff: boolean;
  headline: string;
  tagline: string;
}

// -----------------------------------------------------------------------
// THE 10 ITEMS, MSI-BPD canonical wording with light edits
// -----------------------------------------------------------------------

export const BPD_ITEMS: BPDItem[] = [
  {
    id: 1,
    statement:
      "Have any of your closest relationships been troubled by a lot of arguments or repeated breakups?",
    dsmCriterion:
      "Pattern of unstable and intense interpersonal relationships",
  },
  {
    id: 2,
    statement:
      "Have you deliberately hurt yourself physically (for example, by cutting, burning, or punching yourself), or made a suicide attempt?",
    dsmCriterion: "Recurrent self-harm or suicidal behaviour",
  },
  {
    id: 3,
    statement:
      "Have you had at least two other significant problems with impulsivity (for example, binge eating + spending sprees, drinking too much + reckless driving)?",
    dsmCriterion: "Impulsivity in two or more potentially self-damaging areas",
  },
  {
    id: 4,
    statement: "Have you been extremely moody, with rapid mood swings?",
    dsmCriterion: "Affective instability due to marked reactivity of mood",
  },
  {
    id: 5,
    statement:
      "Have you felt very angry a lot of the time, or frequently acted in an angry or sarcastic manner?",
    dsmCriterion: "Inappropriate, intense anger or difficulty controlling anger",
  },
  {
    id: 6,
    statement:
      "Have you often been deeply distrustful of other people, suspecting that they were against you?",
    dsmCriterion:
      "Transient stress-related paranoid ideation",
  },
  {
    id: 7,
    statement:
      "Have you frequently felt unreal, or as if things around you were unreal (dissociation)?",
    dsmCriterion: "Severe dissociative symptoms",
  },
  {
    id: 8,
    statement: "Have you chronically felt empty inside?",
    dsmCriterion: "Chronic feelings of emptiness",
  },
  {
    id: 9,
    statement:
      "Have you often felt that you had no idea of who you are, or that you have no real identity?",
    dsmCriterion: "Markedly and persistently unstable self-image",
  },
  {
    id: 10,
    statement:
      "Have you made desperate efforts to avoid feeling abandoned or being abandoned (for example, repeatedly calling someone to reassure yourself, begging them not to leave, clinging to them physically)?",
    dsmCriterion: "Frantic efforts to avoid real or imagined abandonment",
  },
];

// -----------------------------------------------------------------------
// SCORING
// -----------------------------------------------------------------------

export const ZANARINI_CUTOFF = 7; // ≥7 = likely BPD per Zanarini 2003

export function calculateBPDScores(
  answers: Record<number, "yes" | "no">,
): BPDScores {
  let total = 0;
  for (const item of BPD_ITEMS) {
    if (answers[item.id] === "yes") total++;
  }
  return { total };
}

export function scoreToTier(score: number): BPDTier {
  if (score <= 2) return "low";
  if (score <= 4) return "average";
  if (score <= 6) return "high";
  return "very-high";
}

export function generateBPDDiagnosis(
  answers: Record<number, "yes" | "no">,
): BPDDiagnosis {
  const { total } = calculateBPDScores(answers);
  const tier = scoreToTier(total);
  const profile = TIER_PROFILES[tier];
  return {
    rawScore: total,
    tier,
    meetsCutoff: total >= ZANARINI_CUTOFF,
    headline: profile.name,
    tagline: profile.tagline,
  };
}

// -----------------------------------------------------------------------
// TIER PROFILES
// -----------------------------------------------------------------------

export interface BPDTierProfile {
  tier: BPDTier;
  name: string;
  tagline: string;
  description: string;
  selfPattern: string;
  externalRead: string;
  whatNext: string;
}

export const TIER_PROFILES: Record<BPDTier, BPDTierProfile> = {
  low: {
    tier: "low",
    name: "The Functional Self",
    tagline: "BPD pattern is not registering on this screen.",
    description:
      "Your MSI-BPD score is in the bottom range (0-2 yes responses). Borderline traits are not registering as your operating profile. You may have arrived here because someone, a partner, a sibling, a therapist with a soft definition of the term, applied the BPD label to you in a way that didn't sit right. The instrument did not find it.",
    selfPattern:
      "You experience emotional reactivity within the normal range for your circumstances. You have not, by your own honest report, made repeated suicide attempts or self-harmed. You have an identity you can locate without effort. You are not, on this measure, the person the diagnosis is built to detect.",
    externalRead:
      "The people closest to you, asked privately, would not be surprised by this score. BPD leaks. People around someone with active BPD know within months that something specific is going on; you have not produced that signal in the people who would notice.",
    whatNext:
      "If the worry that drove you here is about a partner, family member, or friend, the relevant tool is not this self-report; it's the partner-detection chapters of the book or, for parents specifically, the Daughter Pattern Assessment. If the worry was about yourself and the result is genuinely surprising, the discrepancy is itself worth taking to a therapist.",
  },
  average: {
    tier: "average",
    name: "Sub-Clinical Range",
    tagline: "Some BPD trait registration, below the threshold the literature treats as clinical.",
    description:
      "Your MSI-BPD score is 3-4 yes responses, which puts you in the sub-clinical band. Some BPD traits are registering, possibly mood reactivity, identity uncertainty, the chronic emptiness, or one or two of the relational items, but not at the level Zanarini's threshold treats as a likely BPD pattern. The literature considers this range non-diagnostic; the suffering, where it's there, is real but does not configure as the disorder.",
    selfPattern:
      "You may experience some of the features of BPD, moodiness, reactive anger, identity confusion, without the full constellation. Many of these features are also present in mood disorders, in PTSD, in adolescents and young adults during normal developmental transitions, and in adults under prolonged acute stress.",
    externalRead:
      "People close to you have probably noticed at least one of the registering items, depending on which ones came back yes. They have not, by and large, organised their relationship with you around the diagnosis, because the configuration is not consistent enough to require that.",
    whatNext:
      "If the items you said yes to are causing real distress, the diagnostic question is not 'do I have BPD'; it's 'what is the most accurate read on what's actually happening to me'. That question is best taken to a clinician with experience in differential diagnosis between BPD, mood disorders, and trauma. The wrong frame entrenches the suffering; the right one points to specific work that helps.",
  },
  high: {
    tier: "high",
    name: "The Threshold",
    tagline:
      "Significant trait registration. Below the Zanarini cutoff, but close enough to take seriously.",
    description:
      "Your MSI-BPD score is 5-6 yes responses, which puts you in the High tier, significant trait registration that sits just below the Zanarini cutoff of 7 for likely BPD. The pattern is real. Whether or not it crosses into a clinical diagnosis depends on the severity of each registering item, on duration, and on the specific configuration of which items came back yes. The MSI-BPD is a screen; it cannot give you the answer that interview-based instruments (DIB-R, SCID-II) can.",
    selfPattern:
      "You experience the BPD-trait configuration in real life. The relational instability, the impulsivity in multiple domains, the chronic emptiness or identity uncertainty, at least five of these registered as yes. The configuration is not subtle, and the people closest to you have noticed pieces of it across years.",
    externalRead:
      "The people in your life have, by now, learned to anticipate your emotional weather. The closest ones can sometimes name the pattern; the next layer adapts without naming. Your friend group at 30 is not the friend group you had at 22, and the gap is not random.",
    whatNext:
      "Two paths. One: a clinician with specific BPD experience (not just 'a therapist', the diagnosis is famously misread by generalists). Ask, by name, if they have DBT or MBT training before booking. Two: the long-form reading on BPD is good and getting better. *I Hate You, Don't Leave Me* (Kreisman & Straus) is the accessible classic; Linehan's *Building a Life Worth Living* is the personal account from the founder of DBT, who has the diagnosis herself. The pattern is one of the most treatable personality disorders when treated properly.",
  },
  "very-high": {
    tier: "very-high",
    name: "The Pattern",
    tagline:
      "At or above the Zanarini cutoff. The instrument is flagging a likely BPD configuration.",
    description:
      "Your MSI-BPD score is 7 or higher, at or above the cutoff Zanarini's research uses to flag a likely BPD pattern. In the validation study, 81% of people with clinically diagnosed BPD scored at this level (sensitivity), and 85% of people without BPD scored below it (specificity). The instrument is a screen, not a diagnosis, but a score in this range is the strongest signal a brief instrument can give for considering a full diagnostic interview.",
    selfPattern:
      "You have likely been carrying this configuration for years, possibly decades. The relational instability, the self-harm or suicide attempts, the impulsivity, the mood reactivity, the dissociation, the emptiness, the identity uncertainty, the desperate moves to avoid abandonment, at least seven of these have been part of your operating system. You have likely been told, formally or informally, that this is BPD before. You may have rejected the label because of how it gets used culturally, which is reasonable; the cultural shorthand is wrong about most of what the diagnosis actually means clinically.",
    externalRead:
      "The people in your life have organised themselves around the configuration. Some have stayed and learned to read your weather. Some have left, sometimes more than once. The people who genuinely know you are aware of the pattern; the people who don't, often experience your reactivity as personal when it is structural.",
    whatNext:
      "Three honest options, in order of importance. One: get a full diagnostic assessment from a clinician with specific BPD expertise. Ask before booking whether they have DBT, MBT, or TFP training. The right diagnosis matters; many people score high here and are actually misdiagnosed (most commonly as bipolar II, complex PTSD, or major depression). Two: read Linehan's *Building a Life Worth Living*, the personal account from the founder of DBT who has BPD herself. Three: the literature consistently shows BPD has the best treatment outcome of the cluster B disorders when treated correctly. This is genuinely good news. The configuration is shiftable, more shiftable than the cultural stigma around the diagnosis suggests, with the right treatment.",
  },
};

// -----------------------------------------------------------------------
// QUIZ INFO + FAQ
// -----------------------------------------------------------------------

export const BPD_QUIZ_INFO = {
  slug: "bpd",
  name: "The BPD Test",
  fullName: "The BPD Test (MSI-BPD) · Dark Mirror by Kanika Rose",
  shortName: "BPD Test",
  tagline: "10 yes/no items. The screen the field actually uses.",
  description:
    "A 10-item Borderline Personality Disorder test built on the McLean Screening Instrument for BPD (MSI-BPD, Zanarini 2003). Items map to the 9 DSM-5 BPD criteria. Established cutoff (≥7) = likely BPD per the validation study (sensitivity 81%, specificity 85%). Educational only, not a diagnosis.",
  itemCount: BPD_ITEMS.length,
  estimatedMinutes: 2,
  price: 0,
  disclaimer:
    "Educational and reflective use only. The MSI-BPD is a screening instrument, not a diagnostic one. Only a licensed clinician with a full history can diagnose Borderline Personality Disorder. BPD is one of the most often-misdiagnosed personality disorders; if your score raised concerns, please see a clinician with specific BPD experience rather than acting on the score alone. If you are in crisis, contact a licensed therapist or, if there is risk to yourself, a crisis line.",
  basedOn:
    "Zanarini, M. C., Vujanovic, A. A., Parachini, E. A., Boulanger, J. L., Frankenburg, F. R., & Hennen, J. (2003). A screening measure for BPD: the McLean Screening Instrument for Borderline Personality Disorder (MSI-BPD). Journal of Personality Disorders, 17(6), 568-573.",
} as const;

export const BPD_QUIZ_FAQ = [
  {
    question: "What is the MSI-BPD and what does this test measure?",
    answer:
      "The McLean Screening Instrument for Borderline Personality Disorder (MSI-BPD) is a 10-item yes/no screen for BPD developed by Mary Zanarini and colleagues at McLean Hospital, published in 2003. Each item maps to one of the DSM criteria for BPD. It is the most widely cited brief screening instrument for BPD in the academic literature. A score of 7 or higher indicates a likely BPD pattern, with 81% sensitivity and 85% specificity in the original validation study.",
  },
  {
    question: "Is this a diagnosis?",
    answer:
      "No. The MSI-BPD is a screening tool, not a diagnostic one. A high score (≥7) is the strongest signal a brief instrument can give for considering a full clinical interview, but only a licensed clinician using interview-based instruments (DIB-R, SCID-II) and a full personal history can actually diagnose BPD. We strongly recommend that anyone scoring at or above the cutoff sees a clinician with specific BPD experience.",
  },
  {
    question:
      "Why is BPD often misdiagnosed?",
    answer:
      "Several reasons. The mood reactivity is sometimes treated as bipolar II. The dissociative and reactivity features overlap with complex PTSD. The chronic emptiness and identity uncertainty look like depression. The cultural stigma around BPD makes some clinicians reluctant to apply the label. The result is that many people with BPD spend years in the wrong frame of treatment. If your score here is high, ask any clinician you see directly whether they have specific BPD training (DBT, MBT, TFP) before committing to treatment.",
  },
  {
    question: "Why are there only 10 items?",
    answer:
      "Because the MSI-BPD was deliberately designed as a brief screen. Each of its 10 items maps directly to one of the 9 DSM-5 BPD criteria (item 10 covers the abandonment-avoidance criterion explicitly). Adding items would either pad the construct or test something different. Longer instruments exist (the PAI-BOR has 24 items, the BPDSI has 40+) but they are interview-paced; the MSI-BPD is the standard brief self-report.",
  },
  {
    question:
      "I scored high. Should I see a clinician?",
    answer:
      "If you scored at or above 7 (the Zanarini cutoff), yes, and specifically a clinician with BPD experience, not just any therapist. The diagnosis is famously hard to read accurately without that experience. If your score was in the 5-6 'High' tier, it's also worth seeing someone, since the configuration is real even if it's below the formal screening cutoff. Crisis resources are linked at the bottom of the result page if needed.",
  },
  {
    question: "Is BPD treatable?",
    answer:
      "Yes, and substantially better than the cultural stigma around the diagnosis suggests. BPD has the best treatment outcome of the Cluster B personality disorders. Specialised therapies (DBT, MBT, TFP, schema therapy) all show strong evidence in controlled trials. Many people with BPD see substantial reduction in symptoms over 5-10 years of treatment, with many no longer meeting diagnostic criteria. The challenge is finding the right clinician, not whether the work is possible.",
  },
  {
    question:
      "I'm dating someone I think has BPD. Can this test detect that?",
    answer:
      "Not directly. This is a self-report; your partner has to take it for it to score them. What the test CAN do is help you recognise the configuration in someone you know by reading the High and Very High tier profiles on the result page. The Sociopathic Dating Bible's chapters on the BPD pattern in relationships are the longer-form companion to that question. Also: BPD in a partner is genuinely difficult, but the cultural shorthand 'dating someone with BPD = abuse' is not supported by the literature; the pattern is more nuanced than that.",
  },
  {
    question: "Are my answers private?",
    answer:
      "Stored only in your browser session by default. We do not sell or share quiz responses. If you choose to register or capture your result via email, the data lives on our servers under standard access controls and you can request deletion at any time.",
  },
  {
    question:
      "I'm in crisis. Should I be taking this?",
    answer:
      "Probably not in this order. If you are in active crisis (suicidal thoughts, self-harm, severe dissociation), please contact a licensed therapist or a crisis line first. Your country's helpline information should be a search away. This screening tool is most useful at the contemplation stage, you suspect a pattern, you want a sharper read, you're stable enough to take in the answer. If that's not where you are right now, bookmark the page and come back when it is.",
  },
  {
    question:
      "Is BPD really 'just trauma' as some recent writing suggests?",
    answer:
      "The relationship between BPD and trauma is real but more complicated than the simplification 'BPD is just complex PTSD with a worse name'. Most people with BPD have trauma histories; not all do. Most people with complex PTSD do not meet BPD criteria. The two diagnoses share features (affective instability, identity issues, dissociation) but differ on others (chronic emptiness, frantic abandonment avoidance, identity diffusion are more central to BPD; intrusion symptoms more central to CPTSD). A clinician with experience in both is best placed to make the differential. Don't assume one or the other from a self-report alone.",
  },
] as const;
