/**
 * The 12 Week Transformation curriculum.
 *
 * Source of truth for the seed. Editing a week here and re-running
 * `scripts/seed-transformation.ts` updates it in place; the seed never
 * touches `isPublished`, so re-seeding copy can never accidentally open a
 * week Kanika has not filmed.
 *
 * Every one of the book's 15 chapters plus both addendums is assigned
 * exactly once across the twelve weeks, so a member who follows the reading
 * finishes the book by Week 12.
 *
 * The challenge is the product. The videos deliver it; the challenge is what
 * the member actually does in the world, and it is where the transformation
 * stories come from.
 */

export interface CurriculumLesson {
  title: string;
  notes?: string;
}

export interface CurriculumWeek {
  weekNumber: number;
  title: string;
  lede: string;
  challenge: string;
  readingLabel?: string;
  readingWhy?: string;
  lessons: CurriculumLesson[];
}

export const CURRICULUM: CurriculumWeek[] = [
  {
    weekNumber: 1,
    title: "Foundations: Eye Contact and Presence",
    lede: "Stillness is status. Before you read anyone else, you learn to hold your own nerve.",
    challenge:
      "Hold eye contact one beat longer than is comfortable, with five different people, on five different days. Let the jolt hit you and do not look away first. Note what happened in the second after you held it.",
    readingLabel: "Ch. 1, The Doctrine of Cold",
    readingWhy:
      "Self-regulation comes before regulating anyone else. The chapter's claim, that the person who moves least is the one everyone orbits, is the thesis of this whole week.",
    lessons: [
      { title: "Welcome, and how to use this program" },
      { title: "Eye contact: dominance versus seduction" },
      { title: "Reading eyes: discomfort, interest, deception" },
      { title: "Drills: holding gaze without being strange about it" },
    ],
  },
  {
    weekNumber: 2,
    title: "The Physical Layer",
    lede: "How you enter a room is decided before you speak. This week you change the entrance.",
    challenge:
      "Pick one physical change and hold it for the full week: how you stand when waiting, how you walk into a room, or one deliberate upgrade to how you dress. One change, seven days, no exceptions.",
    readingLabel: "Ch. 4, The Transformation Protocol",
    readingWhy:
      "The chapter is this week: how you enter, how you pause before answering, the small behavioural shifts that compound into presence.",
    lessons: [
      { title: "Posture and walk" },
      { title: "Clothing and grooming" },
      { title: "Taking up space: the body language of status" },
      { title: "First impressions: the seven second read" },
    ],
  },
  {
    weekNumber: 3,
    title: "Voice and Confidence",
    lede: "You speak slowly because you are not chasing approval. Confidence is positioning, not performance.",
    challenge:
      "Record yourself answering one question for sixty seconds. Listen back and count the filler words. Re-record it every day this week until the count is zero and you have stopped rushing to fill silence.",
    readingLabel: "Ch. 2, The Holy Grail Doctrine",
    readingWhy:
      "Stop auditioning for the role of good partner and start being the prize. That mindset is underneath every vocal drill this week.",
    lessons: [
      { title: "Speaking with confidence: tone, pace, pausing" },
      { title: "Killing filler words and uptalk" },
      { title: "Charisma: warmth against competence" },
      { title: "Storytelling basics" },
    ],
  },
  {
    weekNumber: 4,
    title: "Dating I: The Approach",
    lede: "Every provocation is a question. This week you learn what is actually being asked.",
    challenge:
      "Next time you are tested, whether on a date or over text, do not defend yourself. Answer with amused disinterest instead and watch what it does to the room. Write down the test, your answer, and what changed.",
    readingLabel: "Ch. 7, The Shit Test Matrix + Ch. 9, Unhinged Texts",
    readingWhy:
      "Ch. 7 is the engine for reading what people actually mean: every provocation asks whether you can be destabilised. Ch. 9 is the texting lesson in written form.",
    lessons: [
      { title: "Men and women in dating: how each actually filters" },
      {
        title: "First dates: structure and frame",
        notes:
          "Taught through the shit-test lens. Provocations are tests; the pass is amused disinterest, not defence.",
      },
      { title: "Green flags against red flags" },
      { title: "Texting and momentum" },
    ],
  },
  {
    weekNumber: 5,
    title: "Dating II: Selection and Leverage",
    lede: "Never let a single source of validation run your nervous system.",
    challenge:
      "Identify one dynamic in your life that is past its expiry date. Do not blow it up. Plan the graceful exit, write down what you keep and what you release, and take the first step this week.",
    readingLabel: "Ch. 3, The Rotation + Ch. 13, The Upgrade Protocol",
    readingWhy:
      "Ch. 3 is the second lesson outright. Ch. 13 is the fourth: recognising the expiry date before it costs you, and leaving without burning what still has value.",
    lessons: [
      { title: "Getting the most attractive partners" },
      { title: "Rotations: managing multiple prospects" },
      { title: "Spotting manipulators before they hook you" },
      {
        title: "When to walk away",
        notes:
          "Not walking away as strength. Every relationship has an expiry date; the skill is seeing it early and transitioning cleanly.",
      },
    ],
  },
  {
    weekNumber: 6,
    title: "Persuasion",
    lede: "The halfway mark. Strategic unavailability preserves the weight of your presence.",
    challenge:
      "Get one thing you want this week without asking for it directly. Then sit down with the first six weeks and write what has actually changed, honestly, including what has not.",
    readingLabel: "Ch. 5, Scarcity Tactics",
    readingWhy:
      "The third lesson names scarcity as a principle; the chapter is the applied version. One chapter only this week, because the milestone review takes the other slot.",
    lessons: [
      { title: "The art of persuasion: core principles" },
      { title: "Getting what you want without asking directly" },
      { title: "Reciprocity, scarcity, commitment" },
      { title: "Six week milestone review and self-assessment" },
    ],
  },
  {
    weekNumber: 7,
    title: "Manipulation Foundations",
    lede: "The insider lens. What it looks like from the other side of the table.",
    challenge:
      "Look back at a relationship where the highs felt unbearable and the distance felt like your fault. Map the pattern: when the warmth arrived, when it was withdrawn, and what you did to try to get it back.",
    readingLabel: "Ch. 6, Love Bombing Mastery",
    readingWhy:
      "Manufactured highs, calculated warmth interrupted by calculated distance, chasing the feeling instead of the person. It is both the playbook and the reason the ethics lesson exists.",
    lessons: [
      { title: "The toolkit, from the inside" },
      { title: "Framing and anchoring" },
      {
        title: "Emotional leverage",
        notes:
          "Taught as love-bomb mechanics: unpredictability, not intensity, is what rewires someone.",
      },
      { title: "The ethics line: influence against abuse, and where it sits" },
    ],
  },
  {
    weekNumber: 8,
    title: "Masks and Authenticity",
    lede: "Different rooms want different versions of you. That is not dishonesty, until it is.",
    challenge:
      "Notice the mask you wear in one room this week and name it precisely. Then find one place where you are wearing a mask you did not choose and take it off.",
    readingLabel: "Ch. 8, Family Colonization",
    readingWhy:
      "The advanced form of the same game: identify the gatekeepers in someone's life and become the version of you that each of them vouches for. Detecting other people's masks is its mirror image.",
    lessons: [
      { title: "Different masks for different rooms" },
      { title: "Feigning authenticity" },
      { title: "Code-switching without losing yourself" },
      { title: "Detecting other people's masks" },
    ],
  },
  {
    weekNumber: 9,
    title: "The Workplace",
    lede: "No drama, no jealousy, no evidence. You never attack a rival; you make comparison embarrassing.",
    challenge:
      "Pick one person at work you have been competing with loudly. Stop. Go quiet, go excellent, and let the comparison do the work. Note what changes in how you are spoken about.",
    readingLabel: "Ch. 10, The Beige Protocol",
    readingWhy:
      "Office politics without getting burned is the Beige Protocol. The promotion and negotiation lessons ride the same quiet-dominance frame.",
    lessons: [
      { title: "The bottom line: getting the promotion" },
      { title: "Managing up: handling difficult bosses" },
      {
        title: "Office politics without getting burned",
        notes:
          "The Beige Protocol applied to colleagues: neutralise competition without them ever knowing it happened.",
      },
      { title: "Leveraging opportunities and negotiation" },
    ],
  },
  {
    weekNumber: 10,
    title: "Advanced Charisma",
    lede: "The story people tell about you is stronger than anything you say in your own defence.",
    challenge:
      "Decide the one sentence you want said about you when you are not in the room. Then spend the week acting only in ways that make someone else say it.",
    readingLabel: "Ch. 11, Reputation Warfare",
    readingWhy:
      "Craft the frame first and let other people repeat it. Commanding a room is reputation warfare performed live.",
    lessons: [
      { title: "Commanding a room" },
      { title: "Charisma under pressure" },
      { title: "Making people feel chosen" },
      { title: "Building a magnetic reputation" },
    ],
  },
  {
    weekNumber: 11,
    title: "Dark Types",
    lede: "The heaviest week, deliberately. Predators running on predictable code, taken apart.",
    challenge:
      "Take the hardest person in your life and identify which pattern they actually run. Then write the exit you would take if you needed it, before you need it.",
    readingLabel:
      "Addendum 1: Neutralizing Narcissists + Addendum 2: Neutralizing Avoidants + Ch. 12, The Nuclear Ghost Protocol",
    readingWhy:
      "Addendum 1 is the first lesson outright. Addendum 2 covers avoidants. Ch. 12 is the fourth: no closure, no farewell speech, because silence is the only exit that leaves no counter-move.",
    lessons: [
      { title: "Breaking narcissists" },
      {
        title: "Avoidants: hacking the flight protocol",
        notes:
          "Replaces the original BPD slot so the video and the reading match. If BPD is wanted, film it as a bonus lesson rather than leaving an unsupported slot.",
      },
      { title: "Handling psychopaths and Machiavellians" },
      { title: "Exit strategies from toxic dynamics" },
    ],
  },
  {
    weekNumber: 12,
    title: "Integration",
    lede: "Self-containment. Worth that does not depend on anyone's approval, and unreachable in the best possible way.",
    challenge:
      "Write your own playbook: the five rules you will actually keep. Then name the one failure pattern most likely to pull you back, and what you will do the moment you catch it.",
    readingLabel:
      "Ch. 14, The Empress Endgame + Ch. 15, The Perks of Dating a Sociopath",
    readingWhy:
      "Ch. 14 is the destination the whole program points at. Ch. 15 is the closing argument: strategic, deliberate, complete.",
    lessons: [
      { title: "Tying it together: your personal playbook" },
      { title: "Common failure patterns" },
      { title: "Maintaining gains long term" },
      { title: "Where this goes next" },
    ],
  },
];

export const TOTAL_WEEKS = CURRICULUM.length;
