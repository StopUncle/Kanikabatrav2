/**
 * Mission 10-1 — "The Gatekeeper"
 *
 * Level 10, order 1. VIP tier.
 * You won the senior role. You're now the gatekeeper. Someone brings
 * you a request that would have saved you three years ago — and
 * there's a reason to say no. Who do you let through the door that
 * once wasn't opened for you?
 */

import type { Scenario, Scene } from "../types";
import { DEVON, PRIYA, INNER_VOICE } from "../characters";

const scenes: Scene[] = [
  {
    id: "the-request",
    backgroundId: "office",
    mood: "professional",
    presentCharacterIds: ["devon"],
    dialog: [
      {
        speakerId: null,
        text: "Three months into the senior role. Devon sits across from you — 24, nervous, holding a folder they printed because they think that's what you do.",
      },
      {
        speakerId: "devon",
        text: '"I know I don\'t have a track record yet. But I\'ve been working on something I think matters. I need the grant committee intro."',
        emotion: "hopeful",
      },
      {
        speakerId: "inner-voice",
        text: "You know exactly who they are. You were them. And you remember who didn't open a door for you.",
        emotion: "knowing",
      },
    ],
    choices: [
      {
        id: "open-door-fully",
        text: "\"I'll make the intro this week.\"",
        tactic: "Generous. Fast. Also: you don't know what Devon will do with access. Risky at scale.",
        nextSceneId: "intro-made",
      },
      {
        id: "conditional-open",
        text: "\"Show me the work. If it holds up, I make the call Friday.\"",
        tactic: "Gatekeep on quality, not gatekeeping. Ethical version.",
        nextSceneId: "review-work",
        isOptimal: true,
      },
      {
        id: "teach-first",
        text: "\"You're not ready for the committee yet. Let me tell you what they're looking for, then come back in six weeks.\"",
        tactic: "Delay + mentor. Protects the committee's respect for you, doesn't abandon Devon.",
        nextSceneId: "mentor-path",
        isOptimal: true,
      },
      {
        id: "no-flat",
        text: "\"Not yet. Earn the rounds first.\"",
        tactic: "What someone said to you once, and what you resented. You're about to be them.",
        nextSceneId: "ending-you-became-them",
        isOptimal: false,
      },
    ],
  },

  {
    id: "review-work",
    backgroundId: "office",
    mood: "tense",
    presentCharacterIds: ["devon"],
    dialog: [
      {
        speakerId: null,
        text: "Friday afternoon. You read the work over coffee. It's not great. Some of it is clever, some is confused. One part is surprising.",
      },
      {
        speakerId: "inner-voice",
        text: "Three years ago, yours would have looked about the same. The committee would have rejected it. Someone would have been right to send you home. Also — someone could have told you what to fix.",
        emotion: "knowing",
      },
    ],
    choices: [
      {
        id: "honest-feedback",
        text: "\"It's not there yet. Here are four specific things to fix. Come back in six weeks.\"",
        tactic: "Be the voice you needed at 24.",
        nextSceneId: "devon-receives-feedback",
        isOptimal: true,
      },
      {
        id: "polite-no",
        text: "\"It's interesting but not ready. I can't make the intro yet.\"",
        tactic: "Soft 'no' without specifics = same outcome as flat no, slower.",
        nextSceneId: "ending-polite-no-same",
      },
      {
        id: "still-intro",
        text: "Intro anyway. Let the committee decide.",
        tactic: "You're burning your credibility on someone who isn't ready. Costs your own standing.",
        nextSceneId: "ending-credibility-cost",
        isOptimal: false,
      },
      {
        id: "co-develop",
        text: "\"I'll work on the surprising part with you for three weeks. Then we decide.\"",
        tactic: "Deep investment. If they're worth it, they'll earn it. If not, you learn fast.",
        nextSceneId: "co-develop-path",
        isOptimal: true,
      },
    ],
  },

  {
    id: "mentor-path",
    backgroundId: "office",
    mood: "peaceful",
    presentCharacterIds: ["devon"],
    dialog: [
      {
        speakerId: "devon",
        text: '"Okay. Can we — can I write notes while you talk?"',
        emotion: "hopeful",
      },
      {
        speakerId: null,
        text: "You spend 45 minutes. Specific. Everything you wish someone had told you.",
      },
      {
        speakerId: "inner-voice",
        text: "This is the door opening, slower. Devon will either show up in six weeks with better work, or they won't.",
        emotion: "knowing",
      },
    ],
    nextSceneId: "six-weeks-later",
  },

  {
    id: "six-weeks-later",
    backgroundId: "office",
    mood: "professional",
    presentCharacterIds: ["devon"],
    dialog: [
      {
        speakerId: null,
        text: "Six weeks. Devon emails Friday morning. Attachment: the rewrite.",
      },
      {
        speakerId: null,
        text: "It's different. Three of your four fixes are in. The fourth they disagreed with in writing — with a reason.",
      },
      {
        speakerId: "inner-voice",
        text: "They pushed back on one of your notes with justification. That's the signal. They're not copying you — they're thinking.",
        emotion: "knowing",
      },
    ],
    nextSceneId: "ending-mentor-worked",
  },

  {
    id: "devon-receives-feedback",
    backgroundId: "office",
    mood: "tense",
    presentCharacterIds: ["devon"],
    dialog: [
      {
        speakerId: "devon",
        text: '"Okay. Four fixes. Six weeks. I\'ll come back."',
        emotion: "serious",
      },
      {
        speakerId: null,
        text: "They don't argue. They don't overreact. They ask you one clarifying question and leave.",
      },
    ],
    nextSceneId: "six-weeks-later",
  },

  {
    id: "intro-made",
    backgroundId: "office",
    mood: "tense",
    dialog: [
      {
        speakerId: null,
        text: "You make the intro. Two weeks later, Devon meets the grant committee. They're unimpressed.",
      },
      {
        speakerId: null,
        text: "A committee member pulls you aside afterward: 'I trusted your recommendation. Don't send me anyone like that again.'",
      },
      {
        speakerId: "inner-voice",
        text: "You spent your credibility to be generous. Next time you recommend someone, the committee will apply a discount.",
        emotion: "concerned",
      },
    ],
    nextSceneId: "ending-credibility-cost",
  },

  {
    id: "co-develop-path",
    backgroundId: "office",
    mood: "mysterious",
    presentCharacterIds: ["devon"],
    dialog: [
      {
        speakerId: null,
        text: "Three weeks. You meet twice a week. You watch Devon absorb feedback, argue back on two points, ship two refinements.",
      },
      {
        speakerId: "inner-voice",
        text: "You're building the kind of protégé Kaya built in you. Expensive. Probably worth it.",
        emotion: "knowing",
      },
    ],
    nextSceneId: "ending-protege-built",
  },

  // ---------------------------------------------------------------------
  // ENDINGS
  // ---------------------------------------------------------------------

  {
    id: "ending-mentor-worked",
    backgroundId: "office",
    mood: "peaceful",
    isEnding: true,
    outcomeType: "good",
    endingTitle: "The Voice You Needed",
    endingSummary:
      "You were the 45-minute mentor instead of the flat no. Devon came back in six weeks with better work, pushed back on one of your notes with a good reason, and earned the intro. The grant committee meets them next month. Whatever happens there, you didn't gatekeep for its own sake — and you didn't spend your credibility cheaply.",
    dialog: [
      {
        speakerId: "inner-voice",
        text: "The door someone opened for you is the one you owe back. Not the one someone slammed on you.",
        emotion: "knowing",
      },
    ],
  },

  {
    id: "ending-protege-built",
    backgroundId: "office",
    mood: "peaceful",
    isEnding: true,
    outcomeType: "good",
    endingTitle: "Protégé Built",
    endingSummary:
      "Three weeks of co-development. You invested Kaya-level time. In two years, Devon will be sending you their first hire for you to evaluate — the chain continues. You didn't just let them through the door. You helped them build the kind of work that makes the door obvious.",
    dialog: [
      {
        speakerId: "inner-voice",
        text: "You can build the next generation or worry about becoming obsolete. Only one is a good use of the next decade.",
        emotion: "knowing",
      },
    ],
  },

  {
    id: "ending-you-became-them",
    backgroundId: "office",
    mood: "danger",
    isEnding: true,
    outcomeType: "bad",
    endingTitle: "You Became the Door",
    endingSummary:
      "\"Not yet. Earn the rounds first.\" The exact sentence that was said to you, which you resented, which delayed you by two years. You just said it. Devon leaves. In three years they'll be the ones with your role, and they'll remember the 'no' — not the reason for it.",
    dialog: [
      {
        speakerId: "inner-voice",
        text: "The doors you don't open become the walls you live with.",
        emotion: "sad",
      },
    ],
  },

  {
    id: "ending-polite-no-same",
    backgroundId: "office",
    mood: "tense",
    isEnding: true,
    outcomeType: "neutral",
    endingTitle: "Polite No",
    endingSummary:
      "\"It's interesting but not ready.\" No specifics. Devon leaves with nothing actionable, just a smaller, prettier version of the rejection. You didn't use your access to help; you didn't abuse it either. Neutral, but wasted.",
    dialog: [
      {
        speakerId: "inner-voice",
        text: "'Not ready' without specifics is lazy gatekeeping.",
        emotion: "neutral",
      },
    ],
  },

  {
    id: "ending-credibility-cost",
    backgroundId: "office",
    mood: "danger",
    isEnding: true,
    outcomeType: "bad",
    endingTitle: "Credibility Spent",
    endingSummary:
      "You opened the door to be generous. The committee met Devon, was unimpressed, and now applies a discount to your future recommendations. Your generosity to one person cost you leverage for the next five. Gatekeeping IS caring, when the gate is downstream from your name.",
    dialog: [
      {
        speakerId: "inner-voice",
        text: "Your recommendation is a currency. Spend it on people who improve its value.",
        emotion: "sad",
      },
    ],
  },
];

export const mission101: Scenario = {
  id: "mission-10-1",
  title: "The Gatekeeper",
  tagline: "You're the door now.",
  description:
    "Three months into the senior role. Devon wants the intro you needed three years ago. You can be the mentor you wish you'd had — or the flat 'no' you resented. The complication: your credibility with the committee is finite, and Devon's work isn't there yet.",
  tier: "vip",
  level: 10,
  order: 1,
  estimatedMinutes: 8,
  difficulty: "advanced",
  category: "professional",
  xpReward: 450,
  badgeId: "gate-held-fairly",
  startSceneId: "the-request",
  tacticsLearned: [
    "Conditional access over flat rejection",
    "Specific feedback as true generosity",
    "Co-development as the highest form of mentorship",
    "Protecting your own credibility with downstream parties",
  ],
  redFlagsTaught: [
    "Repeating the rejection you resented",
    "Generosity that costs your leverage",
    "'Polite no' without actionable reason",
    "Making gatekeeping the point instead of the outcome",
  ],
  reward: {
    id: "gate-held-fairly",
    name: "Gate Held Fairly",
    description: "You held the gate without closing it. You opened it without spending yourself.",
    unlocksScenarioId: "mission-10-2",
  },
  prerequisites: ["mission-9-2"],
  characters: [DEVON, PRIYA, INNER_VOICE],
  scenes,
};

export default mission101;
