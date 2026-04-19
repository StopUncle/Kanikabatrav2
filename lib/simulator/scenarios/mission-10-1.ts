/**
 * Mission 10-1 — "The Gatekeeper"
 *
 * Level 10, order 1. VIP tier.
 * You won the senior role. You're now the gatekeeper. Someone brings
 * you a request that would have saved you three years ago — and
 * there's a reason to say no. Who do you let through the door that
 * once wasn't opened for you?
 *
 * v2 (2026-04-19): expanded the middle. Added an Act-1 context scene
 * (three-months-in office establishing), middle beats for each Act-2
 * path (committee aftermath for the open-door route, evening
 * reflection on the mentor-path, Devon's reaction beats on the flat
 * no), and texture inside the work-review branch. Six endings unchanged.
 *
 * Total scenes: 12 → 24
 * Avg dialog lines per playthrough: ~7 → ~22
 */

import type { Scenario, Scene } from "../types";
import { DEVON, PRIYA, INNER_VOICE } from "../characters";

const scenes: Scene[] = [
  // ===================================================================
  // ACT 1 — the office, the weight of the new role, the ask
  // ===================================================================

  {
    id: "the-request",
    backgroundId: "office",
    mood: "professional",
    presentCharacterIds: ["devon"],
    dialog: [
      {
        speakerId: null,
        text: "Three months into the senior role. The view from this side of the desk is different. The window light hits your floor at a different angle. Your calendar is fuller. Your inbox is people asking for things you can give.",
      },
      {
        speakerId: null,
        text: "11:14am. Devon walks in — 24, nervous, holding a folder they printed because they think that's what you do. They sit before you say sit.",
      },
      {
        speakerId: "devon",
        text: '"I know I don\'t have a track record yet. But I\'ve been working on something I think matters. I need the grant committee intro."',
        emotion: "hopeful",
      },
      {
        speakerId: null,
        text: "Their hands haven't moved off the folder. They've rehearsed this sentence at least four times.",
      },
      {
        speakerId: "inner-voice",
        text: "You know exactly who they are. You were them. Three years ago. And you remember who didn't open a door for you, and what that no cost you.",
        emotion: "knowing",
      },
      {
        speakerId: "inner-voice",
        text: "The committee runs on your name. Whatever you do here is on your reputation. Three months in is when you set the precedent for what you sponsor.",
        emotion: "serious",
      },
    ],
    choices: [
      {
        id: "open-door-fully",
        text: "\"I'll make the intro this week.\"",
        tactic:
          "Generous. Fast. Also: you don't know what Devon will do with access. Risky at scale.",
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
        tactic:
          "Delay + mentor. Protects the committee's respect for you, doesn't abandon Devon.",
        nextSceneId: "mentor-path",
        isOptimal: true,
      },
      {
        id: "no-flat",
        text: "\"Not yet. Earn the rounds first.\"",
        tactic:
          "What someone said to you once, and what you resented. You're about to be them.",
        nextSceneId: "devon-walks-out",
        isOptimal: false,
      },
    ],
  },

  // ===================================================================
  // ACT 2A — OPEN DOOR FULLY
  // ===================================================================

  {
    id: "intro-made",
    backgroundId: "office",
    mood: "professional",
    dialog: [
      {
        speakerId: null,
        text: "You make the intro that afternoon. Two-paragraph email, warm, your full reputation underneath it. Devon writes back twice in five hours thanking you.",
      },
      {
        speakerId: "inner-voice",
        text: "Generosity feels good in the moment. The weight of what you just lent isn't visible yet.",
        emotion: "neutral",
      },
    ],
    nextSceneId: "committee-meets-devon",
  },
  {
    id: "committee-meets-devon",
    backgroundId: "office",
    mood: "tense",
    dialog: [
      {
        speakerId: null,
        text: "Two weeks later. The committee meets Devon in the small conference room. You sit in the back row.",
      },
      {
        speakerId: null,
        text: "Slide three. A committee member's eyebrows pull together a quarter-inch. Slide six. Two of them look at each other. Slide eight, Devon stalls on a question about methodology.",
      },
      {
        speakerId: "inner-voice",
        text: "You're watching your name being calculated against the work in front of them. The arithmetic is not in your favour.",
        emotion: "concerned",
      },
    ],
    nextSceneId: "after-committee",
  },
  {
    id: "after-committee",
    backgroundId: "office",
    mood: "danger",
    dialog: [
      {
        speakerId: null,
        text: "Hallway after. A senior committee member catches your elbow — friendly grip, the kind that's about to deliver something not friendly.",
      },
      {
        speakerId: null,
        text: '"I trusted your recommendation. Don\'t send me anyone like that again."',
      },
      {
        speakerId: null,
        text: "She smiles when she says it. The smile is the part that lasts. The next time you put a name in front of her, it will pass through that smile first.",
      },
      {
        speakerId: "inner-voice",
        text: "You spent your credibility to be generous. Next five names you send will be discounted before they're read.",
        emotion: "concerned",
      },
    ],
    nextSceneId: "ending-credibility-cost",
  },

  // ===================================================================
  // ACT 2B — CONDITIONAL OPEN (the long path)
  // ===================================================================

  {
    id: "review-work",
    backgroundId: "office",
    mood: "tense",
    presentCharacterIds: ["devon"],
    dialog: [
      {
        speakerId: null,
        text: "Friday afternoon. You read the work over coffee, alone. Forty minutes, undistracted. The folder is thicker than it needed to be.",
      },
      {
        speakerId: null,
        text: "Some of it is clever. Some is confused — the kind of confusion that comes from working too long without anyone to push back. One section in the middle is genuinely surprising. You read it twice.",
      },
      {
        speakerId: "inner-voice",
        text: "Three years ago, yours would have looked about the same. The committee would have rejected it. Someone would have been right to send you home. Also — someone could have told you what to fix, and didn't.",
        emotion: "knowing",
      },
      {
        speakerId: "inner-voice",
        text: "The surprising section is the signal. Devon is thinking. The rest is craft, which is teachable. The question is whether you have the bandwidth to teach it, or whether they need to find that bandwidth themselves.",
        emotion: "knowing",
      },
    ],
    choices: [
      {
        id: "honest-feedback",
        text: '"It\'s not there yet. Here are four specific things to fix. Come back in six weeks."',
        tactic: "Be the voice you needed at 24.",
        nextSceneId: "devon-receives-feedback",
        isOptimal: true,
      },
      {
        id: "polite-no",
        text: '"It\'s interesting but not ready. I can\'t make the intro yet."',
        tactic:
          "Soft 'no' without specifics = same outcome as flat no, slower.",
        nextSceneId: "devon-emails-asking",
      },
      {
        id: "still-intro",
        text: "Intro anyway. Let the committee decide.",
        tactic:
          "You're burning your credibility on someone who isn't ready. Costs your own standing.",
        nextSceneId: "intro-made",
        isOptimal: false,
      },
      {
        id: "co-develop",
        text: '"I\'ll work on the surprising part with you for three weeks. Then we decide."',
        tactic:
          "Deep investment. If they're worth it, they'll earn it. If not, you learn fast.",
        nextSceneId: "co-develop-path",
        isOptimal: true,
      },
    ],
  },

  // --- conditional → honest-feedback middle ---
  {
    id: "devon-receives-feedback",
    backgroundId: "office",
    mood: "tense",
    presentCharacterIds: ["devon"],
    dialog: [
      {
        speakerId: null,
        text: "You walk through the four fixes. Specific. The kind of feedback you wished for at 24 and never got.",
      },
      {
        speakerId: "devon",
        text: '"Okay. Four fixes. Six weeks. I\'ll come back."',
        emotion: "serious",
      },
      {
        speakerId: null,
        text: "They don't argue. They don't overreact. They ask you one clarifying question — about the third fix, the hardest one — and leave.",
      },
      {
        speakerId: "inner-voice",
        text: "The clarifying question was the right one. You can tell when someone's listening from which question they ask.",
        emotion: "knowing",
      },
    ],
    nextSceneId: "six-weeks-later",
  },

  // --- conditional → polite-no middle ---
  {
    id: "devon-emails-asking",
    backgroundId: "office",
    mood: "tense",
    dialog: [
      {
        speakerId: null,
        text: "Wednesday morning. Email from Devon: 'Hi — wanted to ask if you could share what specifically you'd want to see different. Happy to revise.'",
      },
      {
        speakerId: null,
        text: "It sits in your inbox for two days. You draft a reply twice and don't send either. The third time you flag it for next week. The week after, you archive it.",
      },
      {
        speakerId: "inner-voice",
        text: "The polite no without specifics has a shelf life. Not replying makes it permanent. Devon will tell two other people what you're like.",
        emotion: "neutral",
      },
    ],
    nextSceneId: "ending-polite-no-same",
  },

  // --- conditional → co-develop middle ---
  {
    id: "co-develop-path",
    backgroundId: "office",
    mood: "mysterious",
    presentCharacterIds: ["devon"],
    dialog: [
      {
        speakerId: null,
        text: "Three weeks. Twice a week, an hour each. You watch Devon absorb feedback, argue back on two points, ship two refinements between sessions.",
      },
      {
        speakerId: null,
        text: "Week two, they send you a one-pager at midnight that reframes the entire surprising section into something you didn't see coming. You read it on your phone. You stop scrolling.",
      },
      {
        speakerId: "inner-voice",
        text: "You're building the kind of protégé Kaya built in you. Expensive. Probably worth it. The signal: they're starting to teach you something.",
        emotion: "knowing",
      },
    ],
    nextSceneId: "ending-protege-built",
  },

  // ===================================================================
  // ACT 2C — TEACH FIRST (mentor path)
  // ===================================================================

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
        text: "You spend 45 minutes. Specific. The committee's three signals. The two failure modes their work usually has. The one phrase that lands and the one that gets you flagged as junior.",
      },
      {
        speakerId: null,
        text: "Devon writes the whole time. They don't interrupt. They ask one clarifying question at minute 30 that tells you they're already thinking about the rewrite.",
      },
      {
        speakerId: "inner-voice",
        text: "This is the door opening, slower. Devon will either show up in six weeks with better work, or they won't. You won't chase them. The next move is theirs.",
        emotion: "knowing",
      },
    ],
    nextSceneId: "evening-after-mentor",
  },
  {
    id: "evening-after-mentor",
    backgroundId: "apartment",
    mood: "peaceful",
    dialog: [
      {
        speakerId: null,
        text: "9pm at home. You're cooking. The 45 minutes with Devon plays back without you trying.",
      },
      {
        speakerId: "inner-voice",
        text: "You spent forty-five minutes of senior-role time on someone who hasn't earned anything yet. The math says it's a bad bet. The pattern says it's exactly the bet that made you.",
        emotion: "knowing",
      },
      {
        speakerId: null,
        text: "You think about Kaya and the equivalent forty-five minutes she gave you in 2019. You wonder if she felt this same uncertainty about whether you'd come back. You decide it doesn't matter — the uncertainty is the cost of the move.",
      },
    ],
    nextSceneId: "six-weeks-later",
  },

  // --- shared "did they come back" beat ---
  {
    id: "six-weeks-later",
    backgroundId: "office",
    mood: "professional",
    presentCharacterIds: ["devon"],
    dialog: [
      {
        speakerId: null,
        text: "Six weeks. Devon emails Friday morning. Subject line is just the project name, no excess. Attachment: the rewrite.",
      },
      {
        speakerId: null,
        text: "You open it before your second coffee. It's different. Three of your four fixes are in. The fourth they disagreed with — in writing, with a paragraph of reasoning.",
      },
      {
        speakerId: "inner-voice",
        text: "They pushed back on one of your notes with justification. That's the signal. They're not copying you — they're thinking.",
        emotion: "knowing",
      },
    ],
    nextSceneId: "ending-mentor-worked",
  },

  // ===================================================================
  // ACT 2D — FLAT NO (the resented sentence)
  // ===================================================================

  {
    id: "devon-walks-out",
    backgroundId: "office",
    mood: "danger",
    presentCharacterIds: ["devon"],
    dialog: [
      {
        speakerId: null,
        text: "You said it before you'd thought about whether you wanted to. \"Not yet. Earn the rounds first.\"",
      },
      {
        speakerId: null,
        text: "Devon's expression doesn't change for a full second. Then it does — small, controlled. They thank you for your time. They stand, pick up the folder, and leave.",
      },
      {
        speakerId: null,
        text: "You hear them walk down the hall. They don't take the lift; they take the stairs. You don't know why that detail registers, but it does.",
      },
      {
        speakerId: "inner-voice",
        text: "The exact sentence that was said to you in 2019. Which you resented. Which delayed you by two years. The voice you used was the voice you were spoken to with.",
        emotion: "sad",
      },
      {
        speakerId: "inner-voice",
        text: "You didn't open the door. You also didn't hold it shut on craft — you held it shut on a person, the same way it was held shut on you. Devon will remember the no, not the reason.",
        emotion: "sad",
      },
    ],
    nextSceneId: "ending-you-became-them",
  },

  // ===================================================================
  // ENDINGS (unchanged from v1)
  // ===================================================================

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
    failureBlogSlug: "empress-endgame-from-victim-to-sovereign",
    failureBlogTitle: "The Empress Endgame: From Victim to Sovereign",
    endingTitle: "You Became the Door",
    endingSummary:
      '"Not yet. Earn the rounds first." The exact sentence that was said to you, which you resented, which delayed you by two years. You just said it. Devon leaves. In three years they\'ll be the ones with your role, and they\'ll remember the "no" — not the reason for it.',
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
      '"It\'s interesting but not ready." No specifics. Devon leaves with nothing actionable, just a smaller, prettier version of the rejection. You didn\'t use your access to help; you didn\'t abuse it either. Neutral, but wasted — and the unanswered follow-up email made it worse.',
    dialog: [
      {
        speakerId: "inner-voice",
        text: "'Not ready' without specifics is lazy gatekeeping. Not replying to the follow-up turns lazy into cowardly.",
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
    failureBlogSlug: "mask-collection-four-personas-sociopaths-wear",
    failureBlogTitle: "Mask Collection: The Four Personas Sociopaths Wear",
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
  estimatedMinutes: 10,
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
    "Reading the clarifying question someone asks as a signal of how they listen",
  ],
  redFlagsTaught: [
    "Repeating the rejection you resented",
    "Generosity that costs your leverage",
    "'Polite no' without actionable reason",
    "Making gatekeeping the point instead of the outcome",
    "Letting the follow-up email rot in your inbox",
  ],
  reward: {
    id: "gate-held-fairly",
    name: "Gate Held Fairly",
    description:
      "You held the gate without closing it. You opened it without spending yourself.",
    unlocksScenarioId: "mission-10-2",
  },
  prerequisites: ["mission-9-2"],
  characters: [DEVON, PRIYA, INNER_VOICE],
  scenes,
};

export default mission101;
