/**
 * The Path: the chaptered curriculum (plan §5). This registry is the
 * source of truth, seeded in code like the scenario catalog, not a CMS.
 * The DB only stores completions (UserPathProgress rows keyed by the
 * stable step ids below).
 *
 * Shape rules (plan §5.1):
 *  - A chapter is 5-9 steps, each one action on an EXISTING surface.
 *  - Steps unlock sequentially inside a chapter; chapters sequentially,
 *    with Ring requirements at act boundaries.
 *  - Completing a chapter grants STANDING.CHAPTER (the Seal).
 *  - Gender-aware: scenario steps carry a female and a male target; the
 *    step id is the same for both so progress rows never fork by gender.
 *
 * Step ids are STABLE once shipped (progress rows reference them).
 * Add steps, don't rename.
 *
 * Framing lines are drafts in Kanika's voice for her one-evening pass
 * (plan §8 Phase 2 item 2). No em dashes.
 */

export type PathStepKind =
  /** Complete one specific scenario (per-gender target). */
  | { type: "scenario"; female: string; male: string }
  /** Cumulative scored Tell responses reaching `count`. */
  | { type: "tells"; count: number }
  /** Cumulative approved feed comments reaching `count`. */
  | { type: "comments"; count: number }
  /** Cumulative submitted Receipts reaching `count`. */
  | { type: "receipts"; count: number }
  /** Cumulative finished Speed Drill sessions reaching `count`. */
  | { type: "drills"; count: number }
  /** Cumulative ended Lab sessions reaching `count`. */
  | { type: "labs"; count: number }
  /** Taken the full Dark Mirror (a QuizResult exists). */
  | { type: "quiz" }
  /** Asked Kanika one real question. */
  | { type: "question" }
  /**
   * Cumulative completed scenarios OUTSIDE the member's spine reaching
   * `count`. The elective slots: the member picks any unlocked track
   * (usually the check-in recommendation) and finishes one scenario there.
   */
  | { type: "elective"; count: number };

export interface PathStep {
  /** Stable slug, e.g. "ch3-receipt". Referenced by UserPathProgress. */
  id: string;
  /** One line of Kanika-voice framing shown on the step card. */
  framing: string;
  /** Short action label ("Run The Guilt Loop", "Submit one receipt"). */
  label: string;
  kind: PathStepKind;
}

export interface PathChapter {
  /** Stable slug, e.g. "ch3". Used as the Seal grant dedupe key. */
  id: string;
  /** 1-based chapter number. */
  number: number;
  title: string;
  /** One-line chapter blurb for the map page. */
  blurb: string;
  /** Act I / II / III. Display grouping only. */
  act: 1 | 2 | 3;
  /**
   * Minimum rank to ENTER this chapter (inclusive; ranks count down, so
   * ringRequired 3 means ringLevel <= 3, i.e. Analyst or better). Only
   * set at act boundaries.
   */
  ringRequired?: number;
  steps: PathStep[];
}

export const PATH_CHAPTERS: readonly PathChapter[] = [
  // ---------------------------------------------------------------
  // Act I, The Outer Rings: learn to see.
  // ---------------------------------------------------------------
  {
    id: "ch1",
    number: 1,
    title: "Initiation Week",
    blurb: "Seven days that decide whether this place becomes a habit.",
    act: 1,
    steps: [
      {
        id: "ch1-first-scenario",
        label: "Complete your first scenario",
        framing:
          "You already opened the door. Now walk through it a second time and notice what you missed the first time.",
        kind: { type: "scenario", female: "mission-1-1", male: "d1-frame-challenge" },
      },
      {
        id: "ch1-first-tell",
        label: "Answer your first Tell",
        framing:
          "One read a day. Thirty seconds. This is the rep that trains your eye while everything else trains your nerve.",
        kind: { type: "tells", count: 1 },
      },
      {
        id: "ch1-first-comment",
        label: "Say one thing in the feed",
        framing:
          "Lurking is watching other people train. Say one true thing under today's prompt. I read them.",
        kind: { type: "comments", count: 1 },
      },
      {
        id: "ch1-dark-mirror",
        label: "Take the full Dark Mirror",
        framing:
          "The short reading sketched you. The full instrument draws you. You cannot track change without a baseline.",
        kind: { type: "quiz" },
      },
      {
        id: "ch1-second-scenario",
        label: "Complete your second scenario",
        framing:
          "The first one taught you the room. The second one teaches you yourself under pressure.",
        kind: { type: "scenario", female: "mission-1-2", male: "d2-exciting-one" },
      },
    ],
  },
  {
    id: "ch2",
    number: 2,
    title: "Awareness",
    blurb: "See the game before you step into it.",
    act: 1,
    steps: [
      {
        id: "ch2-l1-a",
        label: "Awareness, part one",
        framing:
          "Before you learn to refuse, watch how attention is used as bait.",
        kind: { type: "scenario", female: "mission-1-1", male: "d3-gaslighter" },
      },
      {
        id: "ch2-l1-b",
        label: "Awareness, part two",
        framing:
          "Same tactic, different face. If you can name it twice, you can name it anywhere.",
        kind: { type: "scenario", female: "mission-1-2", male: "d4-hoover" },
      },
      {
        id: "ch2-tells",
        label: "Reach four Tells",
        framing:
          "Reads compound. Four in, you will start seeing the tell before the reveal.",
        kind: { type: "tells", count: 4 },
      },
    ],
  },
  {
    id: "ch3",
    number: 3,
    title: "Information Discipline",
    blurb: "Keep what you know to yourself. Especially in group chats.",
    act: 1,
    steps: [
      {
        id: "ch3-l2-a",
        label: "Information discipline, part one",
        framing:
          "Whatever you say in the next thirty seconds will be repeated louder. Practice pacing your answer.",
        kind: { type: "scenario", female: "mission-2-1", male: "b1-first-win" },
      },
      {
        id: "ch3-l2-b",
        label: "Information discipline, part two",
        framing:
          "The person collecting harmless facts is not collecting them for you.",
        kind: { type: "scenario", female: "mission-2-2", male: "b2-credit-thief" },
      },
      {
        id: "ch3-first-receipt",
        label: "Submit one Receipt",
        framing:
          "Take a message that sat wrong and let the analysis name why. Your gut deserves evidence.",
        kind: { type: "receipts", count: 1 },
      },
      {
        id: "ch3-tells",
        label: "Reach seven Tells",
        framing: "A week of reads. The streak is the skill.",
        kind: { type: "tells", count: 7 },
      },
    ],
  },
  {
    id: "ch4",
    number: 4,
    title: "Boundary Warfare",
    blurb: "No without justification. Grey rock under pressure.",
    act: 1,
    steps: [
      {
        id: "ch4-l3-a",
        label: "Boundary warfare, part one",
        framing:
          "A no that comes with a paragraph is a maybe. Practice the short one.",
        kind: { type: "scenario", female: "mission-3-1", male: "d5-secure-one" },
      },
      {
        id: "ch4-l3-b",
        label: "Boundary warfare, part two",
        framing:
          "Hold the line while someone you like pushes it. That is the whole exercise.",
        kind: { type: "scenario", female: "mission-3-2", male: "b3-covert-peer" },
      },
      {
        id: "ch4-first-drill",
        label: "Run one Speed Drill",
        framing:
          "Speed reveals instinct. The drill shows you what you do before you have time to perform.",
        kind: { type: "drills", count: 1 },
      },
      {
        id: "ch4-first-lab",
        label: "Finish one Lab session",
        framing:
          "The Lab talks back. Say the thing you would actually say and see where it lands.",
        kind: { type: "labs", count: 1 },
      },
    ],
  },

  // ---------------------------------------------------------------
  // Act II: learn to move. Opens at Analyst.
  // ---------------------------------------------------------------
  {
    id: "ch5",
    number: 5,
    title: "Defense",
    blurb: "Smears, DARVO, public ambushes. Staying upright while targeted.",
    act: 2,
    ringRequired: 3,
    steps: [
      {
        id: "ch5-l4-a",
        label: "Defense, part one",
        framing:
          "When the story about you moves faster than you do, your first move is not correction. Watch.",
        kind: { type: "scenario", female: "mission-4-1", male: "b4-charming-cofounder" },
      },
      {
        id: "ch5-l4-b",
        label: "Defense, part two",
        framing:
          "DARVO has a rhythm. Once you have heard it clean, you will hear it everywhere.",
        kind: { type: "scenario", female: "mission-4-2", male: "d6-first-real-fight" },
      },
      {
        id: "ch5-elective",
        label: "Run one scenario from your track",
        framing:
          "Your situation picked a track at the door. Go run one room of it. Need beats sequence.",
        kind: { type: "elective", count: 1 },
      },
      {
        id: "ch5-tells",
        label: "Reach twelve Tells",
        framing: "Twelve reads. The misses teach more than the hits.",
        kind: { type: "tells", count: 12 },
      },
    ],
  },
  {
    id: "ch6",
    number: 6,
    title: "The Power Shift",
    blurb: "The gravity has moved. Use it consciously.",
    act: 2,
    steps: [
      {
        id: "ch6-l5-a",
        label: "The power shift, part one",
        framing:
          "You are no longer the newest person in the room. People are reading you now. Act like you know it.",
        kind: { type: "scenario", female: "mission-5-1", male: "b5-predatory-term-sheet" },
      },
      {
        id: "ch6-l5-b",
        label: "The power shift, part two",
        framing:
          "Endgames are won three moves earlier. Play the earlier move.",
        kind: { type: "scenario", female: "mission-5-2", male: "b6-first-firing" },
      },
      {
        id: "ch6-tells",
        label: "Reach fifteen Tells",
        framing:
          "Fifteen reads deep, you have a rating. Check the leaderboard and see where your eye ranks.",
        kind: { type: "tells", count: 15 },
      },
    ],
  },
  {
    id: "ch7",
    number: 7,
    title: "Career Power",
    blurb: "Credit thieves, hostile negotiations, meeting politics.",
    act: 2,
    steps: [
      {
        id: "ch7-l6-a",
        label: "Career power, part one",
        framing:
          "Work is the one arena where you cannot walk out mid scene. Train it like it matters, because it pays for everything else.",
        kind: { type: "scenario", female: "mission-6-1", male: "b7-board-seat" },
      },
      {
        id: "ch7-l6-b",
        label: "Career power, part two",
        framing:
          "The meeting after the meeting is the real meeting. Be good in that one.",
        kind: { type: "scenario", female: "mission-6-2", male: "d7-work-crisis" },
      },
      {
        id: "ch7-receipts",
        label: "Reach four Receipts",
        framing:
          "Make the analysis a habit, not an emergency. Four receipts in, patterns start repeating.",
        kind: { type: "receipts", count: 4 },
      },
    ],
  },
  {
    id: "ch8",
    number: 8,
    title: "Exits",
    blurb: "Invest proportional to evidence. Leave cleanly when you must.",
    act: 2,
    steps: [
      {
        id: "ch8-l7-a",
        label: "Exits, part one",
        framing:
          "Most people exit loudly to prove they are leaving. The clean exit needs no audience.",
        kind: { type: "scenario", female: "mission-7-1", male: "d8-ex-in-trouble" },
      },
      {
        id: "ch8-l7-b",
        label: "Exits, part two",
        framing:
          "The door you close politely stays closed. The one you slam gets reopened.",
        kind: { type: "scenario", female: "mission-7-2", male: "b8-cofounder-offer" },
      },
      {
        id: "ch8-elective",
        label: "Run a second track scenario",
        framing:
          "Back to your track. One more room. This is the content that matches your actual life.",
        kind: { type: "elective", count: 2 },
      },
    ],
  },
  {
    id: "ch9",
    number: 9,
    title: "Family",
    blurb: "Twenty-nine-year-old scripts. Breaking them or being broken by them.",
    act: 2,
    steps: [
      {
        id: "ch9-l8-a",
        label: "Family, part one",
        framing:
          "Family fights are old scripts performed by heart. You cannot win the script. You can decline the role.",
        kind: { type: "scenario", female: "mission-8-1", male: "d9-the-question" },
      },
      {
        id: "ch9-l8-b",
        label: "Family, part two",
        framing:
          "The hardest grey rock is the one you hold at a dinner table you grew up at.",
        kind: { type: "scenario", female: "mission-8-2", male: "d10-the-mothers-lunch" },
      },
      {
        id: "ch9-ask",
        label: "Ask Kanika one real question",
        framing:
          "You have nine chapters of context now. Ask the question you actually need answered. I answer the good ones out loud.",
        kind: { type: "question" },
      },
    ],
  },

  // ---------------------------------------------------------------
  // Act III: learn to build. Opens at Profiler.
  // ---------------------------------------------------------------
  {
    id: "ch10",
    number: 10,
    title: "The Long Game",
    blurb: "Six months of whispers you never heard. What to do in three weeks.",
    act: 3,
    ringRequired: 2,
    steps: [
      {
        id: "ch10-l9-a",
        label: "The long game, part one",
        framing:
          "Slow campaigns are invisible until they are unbeatable. Learn to see one at month two, not month six.",
        kind: { type: "scenario", female: "mission-9-1", male: "b9-acquisition-lure" },
      },
      {
        id: "ch10-l9-b",
        label: "The long game, part two",
        framing: "Counter slowly. Speed is what they are counting on.",
        kind: { type: "scenario", female: "mission-9-2", male: "b10-series-b" },
      },
      {
        id: "ch10-l10-a",
        label: "Endgame, part one",
        framing:
          "You are the gatekeeper now. Everything you built rests on who you name.",
        kind: { type: "scenario", female: "mission-10-1", male: "d11-noors-birthday" },
      },
      {
        id: "ch10-l10-b",
        label: "Endgame, part two",
        framing:
          "Power you cannot delegate is power you do not actually hold.",
        kind: { type: "scenario", female: "mission-10-2", male: "d12-the-october-telling" },
      },
      {
        id: "ch10-labs",
        label: "Reach three Lab sessions",
        framing:
          "Back to the Lab with everything you know now. The same conversations end differently.",
        kind: { type: "labs", count: 3 },
      },
    ],
  },
  {
    id: "ch11",
    number: 11,
    title: "The Weight",
    blurb: "Reconciliation, the coup, the crisis. The years arrive at once.",
    act: 3,
    steps: [
      {
        id: "ch11-l11",
        label: "The return",
        framing:
          "Five years of silence, then the envelope. The return happens on your curfew, not hers.",
        kind: { type: "scenario", female: "mission-11-1", male: "b11-first-board-meeting" },
      },
      {
        id: "ch11-l12",
        label: "The lateral",
        framing:
          "She could not get the signature, so she is getting the people. The discipline is not defending.",
        kind: { type: "scenario", female: "mission-12-1", male: "b12-option-pool-refresh" },
      },
      {
        id: "ch11-l13",
        label: "The crisis",
        framing:
          "The first hour is the hour the next nine days are built on. Lawyer first, feelings second.",
        kind: { type: "scenario", female: "mission-13-1", male: "d13-november-call" },
      },
    ],
  },
  {
    id: "ch12",
    number: 12,
    title: "The Seat",
    blurb: "The last three rooms. Then the table looks back at you.",
    act: 3,
    steps: [
      {
        id: "ch12-l14",
        label: "The frame",
        framing:
          "The public moment is the easy part. The work is being the person the piece described, on the days no one is filming.",
        kind: { type: "scenario", female: "mission-14-1", male: "b13-series-c" },
      },
      {
        id: "ch12-l15",
        label: "The seat",
        framing:
          "The floor is in the room. The posture is in the room. They are not the same object.",
        kind: { type: "scenario", female: "mission-15-1", male: "b14-post-c-board" },
      },
      {
        id: "ch12-l16",
        label: "The mirror",
        framing:
          "The candidate across the table is the person you were at chapter one. Ask her the questions she will remember.",
        kind: { type: "scenario", female: "mission-16-1", male: "d14-the-marsden-week" },
      },
    ],
  },
];

/** Flat step list in Path order. */
export const ALL_STEPS: readonly (PathStep & { chapterId: string })[] =
  PATH_CHAPTERS.flatMap((c) => c.steps.map((s) => ({ ...s, chapterId: c.id })));

export const CHAPTER_BY_ID: Record<string, PathChapter> = Object.fromEntries(
  PATH_CHAPTERS.map((c) => [c.id, c]),
);

/**
 * Where a step's action lives inside the APP shell. Unported surfaces
 * (Receipts, The Lab) still point at the old skin, which is the honest
 * option until they exist at /app.
 *
 * Split from stepHref rather than replacing it: the legacy Path page and
 * the weekly digest email still address members who live on /consilium,
 * and routing THEM into the app before the cutover would be the same bug
 * this fixes, pointed the other way.
 */
export function appStepHref(
  step: PathStep,
  gender: "MALE" | "FEMALE" | null,
): string {
  const k = step.kind;
  switch (k.type) {
    case "scenario":
      return `/app/train/${gender === "MALE" ? k.male : k.female}`;
    case "tells":
      return "/app/play/tell";
    case "comments":
      return "/app/feed";
    case "receipts":
      return "/consilium/receipts";
    case "drills":
      return "/app/play/drill";
    case "labs":
      return "/consilium/lab";
    case "quiz":
      return "/app/quizzes";
    case "question":
      return "/app/feed";
    case "elective":
      return "/app/train";
  }
}

/** Where a step's action lives, for the "do it" button. */
export function stepHref(
  step: PathStep,
  gender: "MALE" | "FEMALE" | null,
): string {
  const k = step.kind;
  switch (k.type) {
    case "scenario":
      return `/consilium/simulator/${gender === "MALE" ? k.male : k.female}`;
    case "tells":
      return "/consilium/instincts/today";
    case "comments":
      return "/consilium/feed";
    case "receipts":
      return "/consilium/receipts";
    case "drills":
      return "/consilium/games";
    case "labs":
      return "/consilium/lab";
    case "quiz":
      return "/consilium/quiz";
    case "question":
      return "/consilium/feed";
    case "elective":
      return "/consilium/simulator";
  }
}
