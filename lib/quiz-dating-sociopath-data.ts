// Are You Dating a Sociopath, items, scoring, and quadrant profiles.
//
// Unlike the other six quizzes in this suite, this one is not built
// on a published psychometric instrument. It is a partner-detection
// quiz drawn from the Sociopathic Dating Bible chapters on
// behavioural and internal red flags. The construct it measures
// (the "configuration of dating someone who scores high on the
// LSRP / NPI-40 / SD3") is real; the instrument is original.
//
// Two axes, ten items each:
//
//   Behavioural Red Flags (visible patterns)
//     - Money probe, future-faking, triangulation, lying about
//       trivia, pity story, gaslighting, charm-on-demand, boundary
//       erosion, money sketchiness, isolation pattern.
//
//   Internal Red Flags (the body knows)
//     - Feeling smaller after, walking on eggshells, friends'
//       reaction, sleep change, body drop, defending them,
//       memory mismatch, identity drift, self-blame loop,
//       escape fantasy.
//
// Each item: 3 response options scored 0 ("No, not at all"),
// 1 ("Sort of / sometimes"), 2 ("Yes, clearly"). Per-axis range 0-20.
//
// IMPORTANT: This quiz is high-emotional-load. Some users taking it
// will be in active relationships with abusive partners. The result
// page surfaces crisis resources (DV / IPV helplines) when score is
// high. We are not therapists; the page is explicit about that.
// Voice is Kanika's direct register but the safety logic comes
// first.

export type DatingAxis = "behavioural" | "internal";
export type DatingTier = "low" | "average" | "high" | "very-high";
export type DatingQuadrant =
  | "probably-not" //       low both
  | "visible-unfelt" //     high behavioural, low internal
  | "gut-knows" //          low behavioural, high internal
  | "pattern-confirmed"; // high both

export interface DatingResponseOption {
  value: 0 | 1 | 2;
  label: string;
}

export interface DatingItem {
  id: number;
  /** 1-paragraph scenario. */
  scenario: string;
  /** Which axis the item loads on. */
  axis: DatingAxis;
}

export const DATING_RESPONSE_OPTIONS: readonly DatingResponseOption[] = [
  { value: 0, label: "No, not at all" },
  { value: 1, label: "Sort of, sometimes" },
  { value: 2, label: "Yes, clearly" },
] as const;

// -----------------------------------------------------------------------
// THE 20 ITEMS
// -----------------------------------------------------------------------

export const DATING_ITEMS: DatingItem[] = [
  // -- Behavioural Red Flags (B1-B10) --
  {
    id: 1,
    axis: "behavioural",
    scenario:
      "Within the first five dates, they asked about your salary, savings, family money, or property, directly enough that you remember the question.",
  },
  {
    id: 2,
    axis: "behavioural",
    scenario:
      "Within the first six weeks, they made big promises about a shared future, moving in together, marriage, children, building a life, at a pace that looked, in retrospect, intense.",
  },
  {
    id: 3,
    axis: "behavioural",
    scenario:
      "They mention an ex (or several) with a frequency that makes you feel quietly compared. You can't always articulate the comparison; you can feel it land.",
  },
  {
    id: 4,
    axis: "behavioural",
    scenario:
      "You have caught them lying about something small enough that the lie itself is the strange part, where they were, who they texted, what they ate, who paid.",
  },
  {
    id: 5,
    axis: "behavioural",
    scenario:
      "Their backstory is unusually tragic, and the tragedy recruits your sympathy faster than the rest of the relationship recruits your trust. You have found yourself protecting their version of events to your own friends.",
  },
  {
    id: 6,
    axis: "behavioural",
    scenario:
      "When you raise something they did, the conversation ends with you apologising. You have screenshots or messages of moments they later say did not happen the way you remember.",
  },
  {
    id: 7,
    axis: "behavioural",
    scenario:
      "Their warmth has a switch. It turns on for waiters, your friends, your mother. It turns off when nobody is watching.",
  },
  {
    id: 8,
    axis: "behavioural",
    scenario:
      "Things you told yourself early on you would not do, you have done. They did not ask; they engineered the room until the thing was the only available move.",
  },
  {
    id: 9,
    axis: "behavioural",
    scenario:
      "Their finances do not add up. There are gaps in their employment history they explain only when pushed. They have borrowed money in a relationship-testing way (an emergency that needed your card).",
  },
  {
    id: 10,
    axis: "behavioural",
    scenario:
      "You have seen your closest friends less often since the relationship started. Each individual instance had a reason in the moment. The pattern shows up only when you map it.",
  },

  // -- Internal Red Flags (I1-I10) --
  {
    id: 11,
    axis: "internal",
    scenario:
      "You feel smaller after spending time with them, not bigger. The smallness is not always loud; sometimes it is just a faint contraction in the chest you have learned not to name.",
  },
  {
    id: 12,
    axis: "internal",
    scenario:
      "You edit your texts for tone before you send them. You time your asks for when they are in a good mood. You have built a private weather forecast you do not call a weather forecast.",
  },
  {
    id: 13,
    axis: "internal",
    scenario:
      "Your closest friends do not like them. They cannot quite articulate why, and the failure to articulate has, on at least one occasion, felt like proof that they are wrong.",
  },
  {
    id: 14,
    axis: "internal",
    scenario:
      "Your sleep has been worse since the relationship started. You can attribute it to other things; the timing fits this one.",
  },
  {
    id: 15,
    axis: "internal",
    scenario:
      "When their name appears on your phone, your stomach drops a half-inch before your face does anything. Sometimes the drop is followed by relief that it is them. The drop comes first.",
  },
  {
    id: 16,
    axis: "internal",
    scenario:
      "You have caught yourself explaining their behaviour to people who did not ask for an explanation. You walked home from the conversation noticing you had done it.",
  },
  {
    id: 17,
    axis: "internal",
    scenario:
      "When you try to remember which argument was about what, the timeline blurs. You cannot always tell which version of events is yours and which is theirs.",
  },
  {
    id: 18,
    axis: "internal",
    scenario:
      "Friends from before the relationship have, gently or otherwise, noted you are different. You have agreed with them, sometimes. The agreement did not lead to action.",
  },
  {
    id: 19,
    axis: "internal",
    scenario:
      "When something goes wrong between you, your first move is to ask what you did, before you ask what they did. The honest answer is sometimes that they did most of it. Your instinct still goes to your half first.",
  },
  {
    id: 20,
    axis: "internal",
    scenario:
      "You have, more than once, daydreamed about them being out of your life. The daydream is followed quickly by guilt, which interrupts the daydream before it gets specific.",
  },
];

export interface DatingScores {
  behavioural: number;
  internal: number;
  total: number;
}

export interface DatingAxisResult {
  axis: DatingAxis;
  rawScore: number;
  tier: DatingTier;
}

export interface DatingDiagnosis {
  behavioural: DatingAxisResult;
  internal: DatingAxisResult;
  quadrant: DatingQuadrant;
  headline: string;
  tagline: string;
  /** Set when behavioural score is high or very high, surfaces crisis
   * resources on the result page even if internal score is lower. */
  surfaceSafetyCallout: boolean;
}

// -----------------------------------------------------------------------
// SCORING
// -----------------------------------------------------------------------

export function calculateDatingScores(
  answers: Record<number, 0 | 1 | 2>,
): DatingScores {
  let beh = 0;
  let int = 0;
  for (const item of DATING_ITEMS) {
    const v = answers[item.id];
    if (v === undefined) continue;
    if (item.axis === "behavioural") beh += v;
    else int += v;
  }
  return { behavioural: beh, internal: int, total: beh + int };
}

export function scoreToTier(score: number): DatingTier {
  if (score <= 4) return "low";
  if (score <= 9) return "average";
  if (score <= 14) return "high";
  return "very-high";
}

export function buildAxisResult(
  rawScore: number,
  axis: DatingAxis,
): DatingAxisResult {
  return { axis, rawScore, tier: scoreToTier(rawScore) };
}

export function determineQuadrant(
  beh: DatingAxisResult,
  int: DatingAxisResult,
): DatingQuadrant {
  const behHigh = beh.tier === "high" || beh.tier === "very-high";
  const intHigh = int.tier === "high" || int.tier === "very-high";
  if (behHigh && intHigh) return "pattern-confirmed";
  if (behHigh) return "visible-unfelt";
  if (intHigh) return "gut-knows";
  return "probably-not";
}

export function generateDatingDiagnosis(
  answers: Record<number, 0 | 1 | 2>,
): DatingDiagnosis {
  const scores = calculateDatingScores(answers);
  const beh = buildAxisResult(scores.behavioural, "behavioural");
  const int = buildAxisResult(scores.internal, "internal");
  const quadrant = determineQuadrant(beh, int);
  const profile = QUADRANT_PROFILES[quadrant];
  return {
    behavioural: beh,
    internal: int,
    quadrant,
    headline: profile.name,
    tagline: profile.tagline,
    surfaceSafetyCallout:
      beh.tier === "high" || beh.tier === "very-high" ||
      int.tier === "very-high",
  };
}

// -----------------------------------------------------------------------
// QUADRANT PROFILES
// -----------------------------------------------------------------------

export interface DatingQuadrantProfile {
  quadrant: DatingQuadrant;
  name: string;
  tagline: string;
  description: string;
  whatItMeans: string;
  whatToDo: string;
  /** Bulleted blind spots / clarifications. */
  notes: string[];
}

export const QUADRANT_PROFILES: Record<DatingQuadrant, DatingQuadrantProfile> = {
  "probably-not": {
    quadrant: "probably-not",
    name: "Probably Not the Pattern",
    tagline: "The instrument did not find the configuration.",
    description:
      "Your behavioural score is in the low or average tier, and your internal score is too. The pattern this quiz is built to detect, dating someone who scores high on Cluster B configurations, is not registering as your current situation. Twenty scenarios drawn from the Sociopathic Dating Bible's red-flag chapters did not land for you. That is, by itself, useful information.",
    whatItMeans:
      "Most relationships have friction. Most have a few small lies, a few moments of self-doubt, a friend who didn't love your partner on first meeting. The presence of any single item on this list does not, on its own, mean you are dating someone with a Cluster B configuration. The clinical pattern requires accumulation, and the accumulation is not present in your responses.",
    whatToDo:
      "If you came here because the worry has been chewing on you, the worry is now answered. If you came here because someone in your circle is the relationship in question, sister, friend, mother, the result is about you, not about them. If you came in for partner-detection generally, the Sociopathic Dating Bible's longer-form chapters cover this terrain in more detail than twenty scenarios can.",
    notes: [
      "If your internal score was higher than your behavioural one, the gap is worth noticing, sometimes the body registers something the head has not yet named, sometimes the body is reacting to an old relationship and not the current one. Both happen.",
      "If both scores were in the low tier and you still feel uncertain, the uncertainty is the data. Not every uneasy feeling about a partner has a Cluster B explanation.",
      "Take the Dark Mirror Assessment if you want a wider read on yourself rather than your partner. Many people who arrive at this quiz are actually looking for the self-assessment one.",
    ],
  },
  "visible-unfelt": {
    quadrant: "visible-unfelt",
    name: "Visible But Unfelt",
    tagline:
      "The behaviour is there. Your internal read has not caught up.",
    description:
      "Your behavioural score is high or very high; your internal score is in the low or average tier. The pattern is registering on the visible-evidence axis, the lying, the future-faking, the charm-switch, the boundary erosion, but your internal weather has not yet caught up to what your eyes have seen. This configuration is, in our experience, the most dangerous of the four, because the body's warning system is the thing that usually drives action, and yours has been outpaced by your tolerance for explanation.",
    whatItMeans:
      "There are two common reasons for this asymmetry. The first is that you are early in the relationship and the body has not yet registered as a system what the head has registered as data points. The second is that your tolerance for the behaviour is unusually high, possibly because of family-of-origin patterns that normalised it. The Daughter Pattern Assessment (if you grew up in an NPD-trait-heavy household) maps closely onto the second pattern.",
    whatToDo:
      "Three steps, in order. One: reread the items you scored 2 on. Write them down somewhere external, a notes app you don't share, a paper journal, a friend's email draft. The act of putting them outside your own head defends against the gaslighting they will encounter when raised. Two: tell one person you trust the specific facts (not the interpretation). Notice their face. Three: a therapist with experience in coercive-control relationships, not a couples counsellor; the latter is contraindicated when one party is the configuration this quiz is built to detect.",
    notes: [
      "The fact that your internal score is lower than your behavioural is itself the diagnostic line. People with normal internal-warning systems and the level of behavioural evidence you have reported usually feel worse about the relationship than you do.",
      "Sociopathic configurations specifically train their partners to disregard their own internal signals. The training works through reinforcement, your accurate read gets punished, your doubting read gets rewarded, until the internal signal goes quiet.",
      "If item 6 (the gaslighting / disputed-events item) was a 2, the case for the diagnosis-by-pattern is stronger. Documented contradiction between what was said and what is now said-to-have-been-said is one of the highest-specificity items in the partner-detection literature.",
    ],
  },
  "gut-knows": {
    quadrant: "gut-knows",
    name: "The Gut Knows",
    tagline:
      "The internal weather is high. The visible evidence has not consolidated yet.",
    description:
      "Your internal score is high or very high; your behavioural score is in the low or average tier. Your body is registering something. The visible-evidence pattern that would explain it is not yet present at the same level. Two common reads: either the relationship is in an early phase and the visible patterns have not yet accumulated (your body sometimes catches a configuration before it consolidates), or the relational difficulty is real but is not the Cluster B configuration this quiz is calibrated to detect.",
    whatItMeans:
      "The internal axis is more sensitive than the behavioural one and less specific. High internal score with low behavioural can mean a lot of different things: an avoidant partner, a depressed partner, your own anxiety pattern, a difficult-but-not-disordered phase of a long relationship, or the early phase of the configuration before the surface has lit up. The next move is not 'leave him'; it is 'find out what's actually going on'.",
    whatToDo:
      "Two parallel moves. One: keep a private record for the next four to six weeks. Date, event, your read, the explanation given. Without telling anyone you are doing it. The pattern, if it is the pattern, will show up in writing within that window. Two: in parallel, work on the internal weather directly, therapy, somatic work, sleep, friends. If the internal score reads as 'mostly mine' rather than 'mostly the relationship', the work on you will dampen the signal regardless of what the partner is doing.",
    notes: [
      "Sometimes the gut is reading an old relationship and miscoding the new one. If your internal score has the same shape as the worst weeks of a previous relationship, the read is about your nervous system, not necessarily about your current partner.",
      "Sometimes the gut is reading something the head won't yet, you have noticed pieces of behaviour you have not consciously catalogued. The four-to-six-week notes-app exercise will surface them if they are there.",
      "If the relationship is under six months old and the internal score is in the very-high tier, the most common honest read is: leave. Six months is early enough that the cost of being wrong is small. The risk of ignoring a true positive is much larger than the risk of acting on a false one.",
    ],
  },
  "pattern-confirmed": {
    quadrant: "pattern-confirmed",
    name: "The Pattern Is Confirmed",
    tagline: "Both axes are lit. The visible and the felt are in alignment.",
    description:
      "Both your behavioural and your internal scores are in the high or very-high tier. The pattern this instrument is built to detect is consolidated: the visible evidence is present, the body has registered the configuration, and your two reads are pointing in the same direction. The instrument cannot tell you whether your partner meets a clinical diagnosis. It can tell you that a quiz designed to detect the pattern of dating someone with a Cluster B configuration has detected exactly that.",
    whatItMeans:
      "You have, almost certainly, been carrying the cost of this relationship for a while. The friend network has shrunk, the sleep is bad, the body knows. The reason this quiz exists is that the people who score in this configuration usually already know the answer the quiz returns; they came to the quiz to confirm what they were not yet allowed to say.",
    whatToDo:
      "Three steps, this time in order of safety. One: do not raise this score with your partner. Quizzes are weaponisable inside this configuration; the conversation will not go where you think it will. Two: see a therapist with specific experience in coercive-control and high-conflict relationships; a generalist or couples counsellor is contraindicated. Three: build the exit plan before the conversation, not after, finances separated, important documents copied, somewhere safe to stay. The Sociopathic Dating Bible's chapters on leaving are explicit about why these steps go in this order. If there is any history of physical violence or threat, item 1 of any exit plan is contacting a domestic violence service before talking to anyone else.",
    notes: [
      "You may notice that the result page has gotten quieter and more direct in this quadrant. This is on purpose. The other three quadrants are interpretive; this one is closer to operational.",
      "The instinct to give them one more chance, to explain it to them properly, to have the conversation that finally lands, these are all part of the configuration. They are how the relationship maintains itself. The instinct is real; acting on it usually does not produce the outcome the instinct promises.",
      "If your situation is currently safe (no physical danger, no financial entrapment, no children in the picture), you have time to plan. If any of those is currently false, the planning timeline compresses, and a domestic violence service is the right first call regardless of what else is or is not true.",
    ],
  },
};

// -----------------------------------------------------------------------
// AXIS TIER LABELS (compact summaries shown next to the bars)
// -----------------------------------------------------------------------

export const BEHAVIOURAL_TIER_SUMMARY: Record<DatingTier, string> = {
  low:
    "Few or none of the visible red-flag patterns this quiz looks for are present.",
  average:
    "Some red-flag patterns are present at sub-clinical level. The pattern is not yet consolidated.",
  high:
    "Multiple red-flag patterns present. The behaviour is in the territory the partner-detection literature treats as serious.",
  "very-high":
    "Extensive red-flag pattern. The visible evidence is at the level the literature treats as a likely match.",
};

export const INTERNAL_TIER_SUMMARY: Record<DatingTier, string> = {
  low:
    "Your body is not registering the relationship as threat. Your internal weather is in the normal range.",
  average:
    "Some internal-weather signals registering. Worth watching, but not consolidated.",
  high:
    "Your body is registering significant cost. The pattern of small smaller-after, eggshells, sleep loss is showing up.",
  "very-high":
    "Your body has been carrying the relationship as a load for a while. The internal signal is loud.",
};

// -----------------------------------------------------------------------
// QUIZ INFO + FAQ
// -----------------------------------------------------------------------

export const DATING_QUIZ_INFO = {
  slug: "dating-sociopath",
  name: "Are You Dating a Sociopath?",
  fullName:
    "Are You Dating a Sociopath? · Dark Mirror by Kanika Rose",
  shortName: "Dating a Sociopath",
  tagline: "Twenty scenarios from the Sociopathic Dating Bible.",
  description:
    "A 20-scenario partner-detection assessment drawn from the Sociopathic Dating Bible. Two axes, Behavioural Red Flags (visible patterns) and Internal Red Flags (the body's read). Combined quadrant interpretation. Educational only, not a diagnosis of your partner or you.",
  itemCount: DATING_ITEMS.length,
  estimatedMinutes: 6,
  price: 0,
  disclaimer:
    "Educational and reflective use only. This quiz cannot diagnose anyone, not your partner, not you, not a relationship. Only a licensed clinician with a full history can diagnose any personality disorder, and only you (with help, if needed) can decide what to do about a relationship. If you are in immediate physical danger or being financially entrapped, please contact a domestic violence service in your country. Crisis resources surface on the result page when scores are high.",
  basedOn:
    "Drawn from the Sociopathic Dating Bible (Kanika Rose). Items in the Behavioural Red Flags axis correspond to patterns documented in the partner-detection literature on Cluster B personality disorders (Hare 1993, Brown 2010, Stout 2005, Babiak & Hare 2006). Items in the Internal Red Flags axis correspond to the somatic-marker literature on relational threat detection (Damasio 1996, van der Kolk 2014).",
} as const;

export const DATING_QUIZ_FAQ = [
  {
    question:
      "What does this quiz actually measure?",
    answer:
      "Two axes drawn from the partner-detection literature: Behavioural Red Flags (the visible patterns, lying, future-faking, charm-switching, boundary erosion, financial sketchiness, gaslighting, isolation) and Internal Red Flags (the body's reading, feeling smaller after, walking on eggshells, sleep loss, the stomach drop when their name appears, the daydream of escape). The combination of the two is a more reliable signal than either alone.",
  },
  {
    question:
      "Can a quiz really tell me if I'm dating a sociopath?",
    answer:
      "No. A quiz cannot diagnose your partner, only a licensed clinician with a full history can do that, and they generally need to assess the partner directly, not through your self-report. What this quiz CAN do is help you see whether the configuration of your current relationship matches the pattern documented in the partner-detection literature. The quiz scores the configuration, not the diagnosis.",
  },
  {
    question:
      "I scored high on the Behavioural axis but low on the Internal axis. What does that mean?",
    answer:
      "You're in the 'Visible But Unfelt' quadrant, the visible evidence is there but your internal-warning system has not caught up. This is, in our experience, the most dangerous of the four configurations, because the body's warnings are usually what drives action. The result page covers what to do specifically.",
  },
  {
    question:
      "My partner gets angry when I take quizzes like this. Should I be worried?",
    answer:
      "It depends. If the anger is general (they don't like online quizzes), that's just preference. If the anger is specifically focused on you researching personality disorders or coercive control, the anger is itself a behavioural red-flag item that this quiz does not include explicitly but probably should. Most people in healthy relationships do not police their partner's reading.",
  },
  {
    question:
      "What if I score high but I'm not ready to leave?",
    answer:
      "Many people are not ready when they take this quiz. The result page is written with that in mind. You do not have to act on a score; you do not have to make any decision today. What you can do, regardless of whether you're ready to leave, is start a private record of events (date, what happened, your read), tell one person you trust the specific facts, and see a therapist with coercive-control experience. The decisions that follow are downstream of those steps.",
  },
  {
    question:
      "Is this quiz fair to my partner?",
    answer:
      "The quiz is about your experience of the relationship, not a clinical assessment of your partner. Even if every answer were a 2, that would not, on its own, prove anything about your partner, it would describe a relationship-pattern that warrants attention. The fairer-to-them framing is: the quiz tells you what your relationship is doing to you, and that is information you are entitled to.",
  },
  {
    question:
      "What if I'm wrong and they really are just having a hard year?",
    answer:
      "The cost of acting cautiously on a false positive is, in most cases, much smaller than the cost of ignoring a true positive in this configuration. Cautious action, keeping the record, talking to a therapist, telling one trusted person, separating finances enough that you can leave if you have to, does not require you to be sure. It requires you to be careful. If your partner is actually having a hard year, the cautious moves will not damage the relationship.",
  },
  {
    question: "Are my answers private?",
    answer:
      "Stored only in your browser session by default. We do not sell or share quiz responses. If a partner has access to your device or accounts, please be aware that the result page renders inside your browser, clearing the session is one tap; closing the tab is another. We do not log answers server-side without explicit registration.",
  },
  {
    question:
      "Should I show my partner the results?",
    answer:
      "Generally no, especially in the high-score quadrants. Quizzes are weaponisable inside the configuration this quiz is built to detect; the conversation will not go where you expect. The right people to share the result with are a therapist, one trusted friend or family member, or, if relevant, a domestic violence service. The right person not to share with is the partner whose behaviour is being scored.",
  },
  {
    question:
      "I am in physical danger right now. What should I do?",
    answer:
      "Please contact a domestic violence service in your country before continuing this quiz. In the US: National DV Hotline 1-800-799-7233. UK: National DV Helpline 0808 2000 247. Australia: 1800RESPECT. International directory: hotpeachpages.net. Your safety is more important than this score.",
  },
] as const;
