/**
 * cbl-1-2, "The Mentor's Lunch"
 *
 * Cluster-B Identification Lab, Level 1, order 2. Short-format
 * diagnostic drill. Target register: antisocial / psychopathy
 * (ASPD). The scenario presents one ninety-minute lunch with a
 * well-placed senior mentor who has. Across six months, been
 * warm, attentive, and generous with introductions. The drill
 * teaches the specific ASPD tell: the one ask, delivered late
 * in the lunch, that is instrumental, cost-asymmetric, and
 * framed as harmless.
 *
 * Contrast with cbl-1-1: where BPD shows its register in four
 * minutes of dysregulation, ASPD shows its register in six months
 * of warmth followed by one specific extraction. Different drill
 * shape: here the diagnostic is historical (the six months) as
 * much as immediate (the ask).
 *
 * Format: 7 scenes. Opens on the lunch going well, shifts to the
 * ask at scene 3, diagnostic at scene 4, feedback + teaching at
 * scenes 5-6, micro-prescription at scene 7.
 *
 * Voice: reference/KANIKA-VOICE.md. Drill, not narrative.
 */

import type { Scenario, Scene } from "../../types";
import { INNER_VOICE } from "../../characters";

const scenes: Scene[] = [
  // ===================================================================
  // OPENING. THE LUNCH
  // ===================================================================
  {
    id: "the-lunch",
    backgroundId: "apartment",
    mood: "peaceful",
    presentCharacterIds: ["inner-voice"],
    dialog: [
      {
        speakerId: null,
        text: "Thursday, 1:14 p.m. a restaurant in the city, his choice, his booking, his account. He is in his late fifties; you are in your early thirties. Six months ago he appeared at an industry event, introduced himself, and said three specific things about your work that showed he had read it. Since then: two other lunches, three warm introductions to people above him in his field (all of whom followed up), one genuinely useful book recommendation.",
      },
      {
        speakerId: null,
        text: "Today's lunch is going well. He is funny. He asks good questions. He listens to the answers. At minute seventy-two he orders another coffee and says:",
      },
      {
        speakerId: null,
        text: "'Small thing, you know the piece you did in March about the institutional frame of dependency? I am writing something adjacent, and I would love to just, borrow the central two paragraphs, with credit, obviously, as a jumping-off point for a chapter. Would that be alright?'",
      },
      {
        speakerId: "inner-voice",
        text: "The ask. Sit with it for a moment before you answer. Do not answer inside the ninety-second window the request was designed to land in.",
        emotion: "knowing",
      },
    ],
    choices: [
      {
        id: "to-audit",
        text: "Audit the ask. What is actually being asked, and what is the cost ratio?",
        tactic: "Drill format, the teaching is in the specific audit, not the instinct.",
        nextSceneId: "the-audit",
        isOptimal: true,
      },
    ],
  },

  // ===================================================================
  // THE AUDIT
  // ===================================================================
  {
    id: "the-audit",
    backgroundId: "apartment",
    mood: "tense",
    presentCharacterIds: ["inner-voice"],
    dialog: [
      {
        speakerId: "inner-voice",
        text: "The request, decomposed:",
        emotion: "knowing",
      },
      {
        speakerId: null,
        text: "1. 'The central two paragraphs', not one-line quotes, not the framing. The load-bearing paragraphs. The specific work that makes the piece the piece.",
      },
      {
        speakerId: null,
        text: "2. 'Borrow', softening vocabulary for 'reproduce in his book,' which is a book from a bigger publisher than yours. His use will reach more readers than your original did.",
      },
      {
        speakerId: null,
        text: "3. 'With credit, obviously', the 'obviously' is doing a lot of work. Credit in an adjacent book is flattering in the six months afterwards; in the ten-year citation record, the paragraphs will be associated with his book, not yours.",
      },
      {
        speakerId: null,
        text: "4. 'Jumping-off point for a chapter', meaning the chapter's core framing rests on your paragraphs. The chapter is, structurally, yours.",
      },
      {
        speakerId: null,
        text: "5. The timing: the ask is at minute seventy-two of a ninety-minute lunch that his attention and warmth have filled. The social cost of saying no is calibrated to be maximum.",
      },
      {
        speakerId: "inner-voice",
        text: "Cost ratio: near-zero to him (a sentence of request, a credit line). High to you (the work becomes associated with his book, your piece becomes a footnote to his chapter). The six months of warmth was not fake. It was the setup.",
        emotion: "knowing",
      },
    ],
    choices: [
      {
        id: "to-diagnosis",
        text: "Name the register.",
        tactic: "The diagnostic choice.",
        nextSceneId: "the-diagnosis",
        isOptimal: true,
      },
    ],
  },

  // ===================================================================
  // THE DIAGNOSIS
  // ===================================================================
  {
    id: "the-diagnosis",
    backgroundId: "apartment",
    mood: "cold",
    presentCharacterIds: ["inner-voice"],
    dialog: [
      {
        speakerId: "inner-voice",
        text: "Pick the register.",
        emotion: "knowing",
      },
    ],
    choices: [
      {
        id: "antisocial",
        text: "Antisocial / psychopathy. The warmth was not the point; the warmth was the infrastructure. The ask is instrumental, cost-asymmetric, and timed to the social-pressure maximum. This is not a friend who made a request; this is an operator who invested six months in the request.",
        tactic: "Correct. The clinical tell is the charm-to-extraction ratio: high charm, frictionless access, followed by one specific instrumental ask that benefits him at minimal cost. The absence of anger, the absence of hurt, the absence of anything personal, the ask is not emotional; it is operational.",
        nextSceneId: "diagnosis-correct",
        isOptimal: true,
        event: "tactic-named:antisocial",
      },
      {
        id: "narcissistic",
        text: "Narcissistic. He is using you to make his book better.",
        tactic: "Close, but wrong. NPD would show in the register of the ask, it would be about him, about his importance, about needing the paragraphs to complete his work. This ask is frictionless and warm; it is not ego-forward. The lack of ego in the request is itself the tell for ASPD, not NPD.",
        nextSceneId: "diagnosis-near-miss",
        isOptimal: false,
      },
      {
        id: "just-a-favour",
        text: "Not cluster B. He genuinely admires the work and is asking a normal professional favour.",
        tactic: "Miss. A normal professional favour would be 'can I cite your paper, expand in one paragraph of mine.' The ask for the load-bearing paragraphs as the jumping-off point of a chapter is the tell. The six months of preparation was calibrated; a genuine admirer does not need to be warm for six months before asking to quote two paragraphs.",
        nextSceneId: "diagnosis-miss",
        isOptimal: false,
      },
      {
        id: "borderline",
        text: "Borderline. The warmth is real; he is emotionally enmeshed.",
        tactic: "Miss. BPD would show in the register, dysregulation, intensity-disproportion, attachment-seeking. This register is calm. The calm is the tell; BPD is never calm about what it wants.",
        nextSceneId: "diagnosis-miss",
        isOptimal: false,
      },
    ],
  },

  // ===================================================================
  // DIAGNOSIS CORRECT
  // ===================================================================
  {
    id: "diagnosis-correct",
    backgroundId: "apartment",
    mood: "cold",
    presentCharacterIds: ["inner-voice"],
    dialog: [
      {
        speakerId: "inner-voice",
        text: "The register is antisocial. The diagnostic is: warmth with no ego-load, friction with no anger, cost-asymmetric ask at maximum-social-pressure timing. The six months were the instrument; the lunch is the cut.",
        emotion: "knowing",
      },
      {
        speakerId: "inner-voice",
        text: "The prescription is not whether to refuse, it is how to refuse without ending the relationship, because his response to your refusal will be the confirmation of the diagnosis.",
        emotion: "knowing",
      },
    ],
    choices: [
      {
        id: "to-prescription",
        text: "How do you answer?",
        tactic: "The prescription half of the drill.",
        nextSceneId: "the-prescription",
        isOptimal: true,
      },
    ],
  },

  // ===================================================================
  // THE PRESCRIPTION
  // ===================================================================
  {
    id: "the-prescription",
    backgroundId: "apartment",
    mood: "peaceful",
    presentCharacterIds: ["inner-voice"],
    dialog: [
      {
        speakerId: "inner-voice",
        text: "Three candidate responses.",
        emotion: "knowing",
      },
    ],
    choices: [
      {
        id: "refuse-counter",
        text: "'I would rather not do the two paragraphs, the framing is the piece's spine and I want to reuse it myself next year. Happy for you to cite in the normal way, or I can send a short original quote for your chapter.', refuse the ask, offer a smaller substitute, watch the next minute.",
        tactic: "Correct. The counter-offer is the diagnostic test: a genuine admirer accepts the normal-citation version and moves on warmly; an operator either re-negotiates immediately, becomes subtly cooler across the next 90 seconds, or pivots to a different ask. Whichever he does is data.",
        nextSceneId: "ending-correct",
        isOptimal: true,
        event: "optimal-with-grace",
      },
      {
        id: "soft-yes",
        text: "'Of course, take whatever you need.'",
        tactic: "The soft-yes is the anxious-appeasement response to a calibrated pressure request. It trades the paragraphs for the continuation of the warmth; the warmth will continue, and the next ask will arrive in about four months.",
        nextSceneId: "ending-soft-yes",
        isOptimal: false,
      },
      {
        id: "flat-no",
        text: "'No.'",
        tactic: "A flat no is technically correct but ends the relationship instantly, which, if the diagnosis is ASPD and you cannot afford the professional cost, may not be the right move. The counter-offer gives you both a test and a face-saving off-ramp.",
        nextSceneId: "ending-flat-no",
        isOptimal: false,
      },
    ],
  },

  // ===================================================================
  // NEAR-MISS / MISS
  // ===================================================================
  {
    id: "diagnosis-near-miss",
    backgroundId: "apartment",
    mood: "tense",
    presentCharacterIds: ["inner-voice"],
    dialog: [
      {
        speakerId: "inner-voice",
        text: "Close. NPD and ASPD overlap around instrumental use of others; the diagnostic that splits them is the ego-load. NPD needs the request to feed an ego; ASPD does not care about the ego, only about the outcome. Re-read the ask: is there any ego-load in it?",
        emotion: "knowing",
      },
    ],
    choices: [
      {
        id: "retry",
        text: "Continue.",
        tactic: "The teaching has landed; the answer follows.",
        nextSceneId: "diagnosis-correct",
        isOptimal: true,
      },
    ],
  },

  {
    id: "diagnosis-miss",
    backgroundId: "apartment",
    mood: "tense",
    presentCharacterIds: ["inner-voice"],
    dialog: [
      {
        speakerId: "inner-voice",
        text: "Miss. The specific ASPD tell is the six-month infrastructure preceding a cost-asymmetric ask. Re-read the audit: what is the cost to him, what is the cost to you, and how long was the setup?",
        emotion: "knowing",
      },
    ],
    choices: [
      {
        id: "retry-2",
        text: "Continue.",
        tactic: "The teaching has landed; the answer follows.",
        nextSceneId: "diagnosis-correct",
        isOptimal: true,
      },
    ],
  },

  // ===================================================================
  // ENDINGS
  // ===================================================================
  {
    id: "ending-correct",
    backgroundId: "apartment",
    mood: "peaceful",
    isEnding: true,
    outcomeType: "good",
    endingTitle: "Refuse, Offer, Watch",
    endingLearnPrompt:
      "The ASPD drill: warmth is not always the content; sometimes warmth is the infrastructure for an ask. The diagnostic is the cost-asymmetry and the timing; the prescription is the counter-offer that refuses the load-bearing ask, offers a smaller substitute, and uses his next ninety seconds as data. A genuine admirer accepts and moves on warmly. An operator does not.",
    dialog: [
      {
        speakerId: "inner-voice",
        text: "Counter-offer made. Watch his face. The next minute tells you everything.",
        emotion: "knowing",
      },
    ],
    choices: [],
  },

  {
    id: "ending-soft-yes",
    backgroundId: "apartment",
    mood: "cold",
    isEnding: true,
    outcomeType: "bad",
    endingTitle: "The Soft Yes",
    failureBlogSlug: "architecture-of-control-how-emotional-dependency-is-built",
    failureBlogTitle: "Architecture of Control. How Emotional Dependency Is Built",
    endingLearnPrompt:
      "The soft yes to a calibrated pressure request trades your work for the continuation of a warmth you have (correctly) enjoyed. The warmth will continue. The next ask will arrive in approximately four months and will be slightly larger. The six-month infrastructure is now confirmed as working.",
    dialog: [
      {
        speakerId: "inner-voice",
        text: "The yes given. The next ask calibrated.",
        emotion: "serious",
      },
    ],
    choices: [],
  },

  {
    id: "ending-flat-no",
    backgroundId: "apartment",
    mood: "tense",
    isEnding: true,
    outcomeType: "neutral",
    endingTitle: "The Flat No",
    endingLearnPrompt:
      "The flat no is substantively correct but operationally expensive, it ends the relationship in one sentence, and the professional value of the six months of warmth (real introductions, real recommendations) evaporates without a diagnostic return. The counter-offer does the same refusal at lower cost and produces the same confirmation.",
    dialog: [
      {
        speakerId: "inner-voice",
        text: "No said. Lunch ends politely. The introductions will stop in about three weeks.",
        emotion: "knowing",
      },
    ],
    choices: [],
  },
];

export const clusterBLab12: Scenario = {
  id: "cbl-1-2",
  title: "The Mentor's Lunch",
  tagline: "Six months of warmth. Ninety minutes of lunch. One ask at minute seventy-two.",
  description:
    "Short-format Cluster-B identification drill. A senior mentor has spent six months being warm, useful, and generous with introductions. Today's lunch is going well. At minute seventy-two he asks for the load-bearing two paragraphs of your best piece as 'a jumping-off point' for his chapter. The scenario teaches the ASPD diagnostic, warmth as infrastructure, cost-asymmetric ask at maximum social pressure, the absence of ego-load and the prescription counter-offer that produces a diagnostic test of the diagnosis itself.",
  tier: "premium",
  track: "cluster-b-lab",
  level: 1,
  order: 2,
  estimatedMinutes: 8,
  difficulty: "intermediate",
  category: "narcissist",
  xpReward: 260,
  badgeId: "antisocial-spotted",
  startSceneId: "the-lunch",
  prerequisites: ["cbl-1-1"],
  tacticsLearned: [
    "The six-month-infrastructure diagnostic for ASPD (warmth as instrument, not content)",
    "The cost-asymmetry audit: his cost vs. your cost",
    "The counter-offer as a diagnostic test, his next ninety seconds are data",
    "The absence of ego-load as the tell that splits ASPD from NPD",
  ],
  redFlagsTaught: [
    "Load-bearing work requested as a 'jumping-off point' framing",
    "The 'with credit, obviously' as softening vocabulary for a larger extraction",
    "Timing the ask at minute 72 of a 90-minute lunch, maximum social pressure",
    "The soft-yes loop that calibrates the next larger ask at four months",
  ],
  characters: [INNER_VOICE],
  scenes,
};

export default clusterBLab12;
