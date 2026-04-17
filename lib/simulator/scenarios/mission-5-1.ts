/**
 * Mission 5-1 — "The Power Shift"
 *
 * Level 5, order 1. The first advanced scenario.
 * A gravitational inversion: people who used to ignore you now send
 * invitations. Recognize the shift and USE it without losing the
 * thing that made it happen.
 */

import type { Scenario, Scene } from "../types";
import { MARIS, PRIYA, INNER_VOICE } from "../characters";

const scenes: Scene[] = [
  {
    id: "the-invitation",
    backgroundId: "text-screen",
    mood: "mysterious",
    dialog: [
      {
        speakerId: null,
        text: "Six months since the gala. A message. You don't recognize the number at first.",
      },
      {
        speakerId: null,
        text: "MARIS: \"I've been watching what you've built. We should talk.\"",
      },
      {
        speakerId: "inner-voice",
        text: "Notice what just happened. Six months ago she chose whether you existed. Now she's opening contact herself.",
        emotion: "knowing",
      },
    ],
    choices: [
      {
        id: "reply-immediately",
        text: '"sure, when"',
        tactic: "You answered in 30 seconds after six months. Response time signals value.",
        nextSceneId: "maris-schedules",
        isOptimal: false,
      },
      {
        id: "delay-reply",
        text: "Don't respond. Leave it a day.",
        tactic: "Your time is now valuable. Prove it.",
        nextSceneId: "maris-follows-up",
        isOptimal: true,
      },
      {
        id: "cold-reply",
        text: '"Noted."',
        tactic: "Acknowledgment without commitment. Forces her to propose specifics.",
        nextSceneId: "maris-proposes",
        isOptimal: true,
      },
      {
        id: "decline",
        text: '"Busy for the foreseeable future."',
        tactic: "Hard reject is a move — but may close a door you want open for leverage.",
        nextSceneId: "maris-circles-back",
      },
    ],
  },

  {
    id: "maris-follows-up",
    backgroundId: "text-screen",
    mood: "tense",
    dialog: [
      {
        speakerId: null,
        text: "28 hours later.",
      },
      {
        speakerId: null,
        text: "MARIS: \"Still there? Proposing dinner. My treat. Pick the place.\"",
      },
      {
        speakerId: "inner-voice",
        text: "She followed up. She's offering to pay. You get to choose the venue. All three are concessions.",
        emotion: "knowing",
      },
    ],
    choices: [
      {
        id: "pick-her-spot",
        text: "Suggest her favorite bar.",
        tactic: "Giving back home-field. Why would you?",
        nextSceneId: "dinner-her-turf",
        isOptimal: false,
      },
      {
        id: "pick-neutral",
        text: "Suggest a third-party restaurant neither of you frequents.",
        tactic: "Neutral ground. Clean frame.",
        nextSceneId: "dinner-neutral",
        isOptimal: true,
      },
      {
        id: "pick-your-spot",
        text: "Suggest the coffee shop you've been anchoring yourself at.",
        tactic: "Home-field advantage. Staff knows you. She's a visitor.",
        nextSceneId: "dinner-your-turf",
        isOptimal: true,
      },
    ],
  },

  {
    id: "maris-proposes",
    backgroundId: "text-screen",
    mood: "tense",
    dialog: [
      {
        speakerId: null,
        text: "MARIS: \"Dinner Thursday. Bavette — 7:30.\"",
      },
      {
        speakerId: "inner-voice",
        text: "She picked the place and time. Don't accept the frame she chose.",
        emotion: "knowing",
      },
    ],
    choices: [
      {
        id: "accept-frame",
        text: '"See you then."',
        tactic: "Showed up on her schedule, at her venue.",
        nextSceneId: "dinner-her-turf",
        isOptimal: false,
      },
      {
        id: "counter-propose",
        text: '"Bavette doesn\'t work. Thursday does. I\'ll send somewhere."',
        tactic: "Accept the date (concession), reject the venue (hold).",
        nextSceneId: "dinner-neutral",
        isOptimal: true,
      },
    ],
  },

  {
    id: "maris-schedules",
    backgroundId: "text-screen",
    mood: "tense",
    dialog: [
      {
        speakerId: null,
        text: "MARIS: \"Perfect. Thursday. Bavette at 7:30.\"",
      },
      {
        speakerId: "inner-voice",
        text: "You got what you asked for — terms on her schedule, her venue, her clock.",
        emotion: "concerned",
      },
    ],
    nextSceneId: "dinner-her-turf",
  },

  {
    id: "maris-circles-back",
    backgroundId: "text-screen",
    mood: "peaceful",
    dialog: [
      {
        speakerId: null,
        text: "She doesn't message again for two weeks. Then —",
      },
      {
        speakerId: null,
        text: "MARIS: \"When you're free.\"",
      },
      {
        speakerId: "inner-voice",
        text: "The hard reject trained her. Now when she comes, she comes as a petitioner.",
        emotion: "knowing",
      },
    ],
    nextSceneId: "ending-she-waits",
  },

  {
    id: "dinner-neutral",
    backgroundId: "restaurant",
    mood: "mysterious",
    presentCharacterIds: ["maris"],
    dialog: [
      {
        speakerId: null,
        text: "Thursday. Neither of your regular spots. She got there first, which means she waited.",
      },
      {
        speakerId: "maris",
        text: '"I\'ll be direct. You built something I underestimated. I\'d like to be involved."',
        emotion: "neutral",
      },
      {
        speakerId: "inner-voice",
        text: "Unusual for her to be direct. It means she wants something more than she usually needs.",
        emotion: "knowing",
      },
    ],
    choices: [
      {
        id: "flatter-back",
        text: "\"I appreciate you saying that.\"",
        tactic: "Reciprocal warmth is still a gift. She'll read it as softening.",
        nextSceneId: "maris-accelerates",
        isOptimal: false,
      },
      {
        id: "ask-specifics",
        text: "\"Involved how?\"",
        tactic: "Make her propose terms. Don't volunteer space.",
        nextSceneId: "maris-proposes-terms",
        isOptimal: true,
      },
      {
        id: "decline-directly",
        text: "\"I don't need you involved.\"",
        tactic: "Clean no. But closes the leverage door.",
        nextSceneId: "ending-clean-refusal",
      },
      {
        id: "observe",
        text: "Don't answer immediately. Take a slow sip. Let her sit in it.",
        tactic: "Pressure the silence. She'll fill it with more than she planned.",
        nextSceneId: "maris-over-reveals",
        isOptimal: true,
      },
    ],
  },

  {
    id: "maris-proposes-terms",
    backgroundId: "restaurant",
    mood: "tense",
    presentCharacterIds: ["maris"],
    dialog: [
      {
        speakerId: "maris",
        text: '"Sponsorship. Introductions. Whatever you need. I have leverage you don\'t, and you have momentum I lost."',
        emotion: "neutral",
      },
      {
        speakerId: "inner-voice",
        text: "She said 'leverage I don't [have]' and 'momentum I lost.' Both admissions. Don't flinch that you heard them.",
        emotion: "knowing",
      },
    ],
    choices: [
      {
        id: "big-yes",
        text: "\"Yes. Let's do it.\"",
        tactic: "You agreed to a vague deal. She'll define the terms later — in her favor.",
        nextSceneId: "ending-absorbed",
        isOptimal: false,
      },
      {
        id: "interest-test",
        text: "\"What specifically would you bring? One name. One intro.\"",
        tactic: "Force her to show a card. If she won't, she's bluffing.",
        nextSceneId: "maris-tests-response",
        isOptimal: true,
      },
      {
        id: "no-thanks",
        text: "\"I'll think about it.\" Finish dinner normally.",
        tactic: "No-decision is a decision. She leaves wondering.",
        nextSceneId: "ending-you-leave-first",
        isOptimal: true,
      },
    ],
  },

  {
    id: "maris-over-reveals",
    backgroundId: "restaurant",
    mood: "tense",
    presentCharacterIds: ["maris"],
    dialog: [
      {
        speakerId: "maris",
        text: '"I don\'t usually do this. I don\'t usually have to."',
        emotion: "neutral",
      },
      {
        speakerId: "maris",
        text: '"But the room has shifted and I\'m not going to pretend it hasn\'t."',
        emotion: "cold",
      },
      {
        speakerId: "inner-voice",
        text: "She just named the power shift. She's trying to pre-empt you noticing it alone. Stay neutral.",
        emotion: "knowing",
      },
    ],
    nextSceneId: "maris-proposes-terms",
  },

  {
    id: "maris-accelerates",
    backgroundId: "restaurant",
    mood: "danger",
    presentCharacterIds: ["maris"],
    dialog: [
      {
        speakerId: "maris",
        text: '"Good. I thought you might be someone who could see the bigger picture."',
        emotion: "seductive",
      },
      {
        speakerId: "inner-voice",
        text: "Love-bombing Level 2, for adults. Same mechanic, different target — what you built instead of what you are.",
        emotion: "concerned",
      },
    ],
    nextSceneId: "ending-absorbed",
  },

  {
    id: "maris-tests-response",
    backgroundId: "restaurant",
    mood: "tense",
    presentCharacterIds: ["maris"],
    dialog: [
      {
        speakerId: "maris",
        text: '"Kaya Brooks. She runs the grant committee. She\'d meet you if I called tonight."',
        emotion: "neutral",
      },
      {
        speakerId: "inner-voice",
        text: "She played a real card. That means she wants this enough to spend. Now you decide whether to take it and how.",
        emotion: "knowing",
      },
    ],
    choices: [
      {
        id: "take-intro",
        text: "\"Make the call. I'll take the intro. That's where we start.\"",
        tactic: "Accept the intro only. Don't concede anything else. Transactional.",
        nextSceneId: "ending-deal-made",
        isOptimal: true,
      },
      {
        id: "take-with-conditions",
        text: "\"Intro, yes. But nothing you introduce me to comes with a cost I don't pre-agree to.\"",
        tactic: "Condition the contract. Sophisticated move.",
        nextSceneId: "ending-clean-contract",
        isOptimal: true,
      },
      {
        id: "punish",
        text: "\"Interesting. No thanks.\"",
        tactic: "Signals you don't need her. May be true. Costs a real opportunity.",
        nextSceneId: "ending-pride-over-growth",
      },
    ],
  },

  {
    id: "dinner-your-turf",
    backgroundId: "coffee-shop",
    mood: "peaceful",
    presentCharacterIds: ["maris"],
    dialog: [
      {
        speakerId: null,
        text: "Your coffee shop. The barista nods at you, ignores her. She notices.",
      },
      {
        speakerId: "maris",
        text: '"Interesting spot. Yours, I take it."',
        emotion: "neutral",
      },
      {
        speakerId: "inner-voice",
        text: "Home field. She's the visitor. Don't explain it.",
        emotion: "knowing",
      },
    ],
    nextSceneId: "dinner-neutral",
  },

  {
    id: "dinner-her-turf",
    backgroundId: "bar",
    mood: "tense",
    presentCharacterIds: ["maris"],
    dialog: [
      {
        speakerId: null,
        text: "Her regular. Three staff know her name. She opens the wine list like she wrote it.",
      },
      {
        speakerId: "maris",
        text: '"Relax. I asked you here because I\'ve been watching what you built. We should talk."',
        emotion: "seductive",
      },
      {
        speakerId: "inner-voice",
        text: "You gave up venue. Now every frame in this dinner is hers.",
        emotion: "concerned",
      },
    ],
    nextSceneId: "maris-proposes-terms",
  },

  // ---------------------------------------------------------------------
  // ENDINGS
  // ---------------------------------------------------------------------

  {
    id: "ending-deal-made",
    backgroundId: "restaurant",
    mood: "peaceful",
    isEnding: true,
    outcomeType: "good",
    endingTitle: "You Took the Intro",
    endingSummary:
      "One specific card, one specific meeting, nothing else conceded. You'll meet Kaya Brooks. If the meeting yields something, great — you took the upside without owing Maris architecture. You used her leverage without accepting her frame.",
    dialog: [
      {
        speakerId: "inner-voice",
        text: "Enemies can be useful. Useful isn't the same as friend.",
        emotion: "knowing",
      },
    ],
  },

  {
    id: "ending-clean-contract",
    backgroundId: "restaurant",
    mood: "peaceful",
    isEnding: true,
    outcomeType: "good",
    endingTitle: "Terms Conditioned",
    endingSummary:
      "You accepted leverage with conditions attached — nothing pre-consented is the deal. Maris now has to introduce without expectations, which limits how much she can shape the introduction. The relationship is commercial, not personal, and commercial is clean.",
    dialog: [
      {
        speakerId: "inner-voice",
        text: "The first contract you write is the one that saves you.",
        emotion: "knowing",
      },
    ],
  },

  {
    id: "ending-you-leave-first",
    backgroundId: "restaurant",
    mood: "peaceful",
    isEnding: true,
    outcomeType: "good",
    endingTitle: "You Left First",
    endingSummary:
      "Dinner ended with 'I'll think about it.' You stood up. Paid half. Walked out. For six months she chose when you existed — tonight you chose when the conversation ended. She'll message again.",
    dialog: [
      {
        speakerId: "inner-voice",
        text: "The person who ends the meeting owns it.",
        emotion: "knowing",
      },
    ],
  },

  {
    id: "ending-she-waits",
    backgroundId: "text-screen",
    mood: "peaceful",
    isEnding: true,
    outcomeType: "good",
    endingTitle: "She Waits Now",
    endingSummary:
      "Two weeks of silence after a hard reject. Now she sends 'when you're free.' The polarity flipped. You'll talk eventually, on terms you set, if you want to. She's no longer the person deciding whether you exist.",
    dialog: [
      {
        speakerId: "inner-voice",
        text: "The only way to be chased is to be chaseable — which means leaving first.",
        emotion: "knowing",
      },
    ],
  },

  {
    id: "ending-clean-refusal",
    backgroundId: "restaurant",
    mood: "peaceful",
    isEnding: true,
    outcomeType: "neutral",
    endingTitle: "Clean No",
    endingSummary:
      "You don't need her. You said so. That's true, and also costs you the leverage her network would have provided. No is a valid answer. It's also a closed door.",
    dialog: [
      {
        speakerId: "inner-voice",
        text: "Principled refusals are real refusals. They still have a price.",
        emotion: "neutral",
      },
    ],
  },

  {
    id: "ending-pride-over-growth",
    backgroundId: "restaurant",
    mood: "tense",
    isEnding: true,
    outcomeType: "neutral",
    endingTitle: "Pride Chose",
    endingSummary:
      "She showed you a real card — a real intro, real value — and you walked. Sometimes that's correct. Sometimes it's pride wearing principle's clothes. Which one this was, only your next six months will answer.",
    dialog: [
      {
        speakerId: "inner-voice",
        text: "Check whether the 'no' serves you or just feels satisfying.",
        emotion: "neutral",
      },
    ],
  },

  {
    id: "ending-absorbed",
    backgroundId: "restaurant",
    mood: "danger",
    immersionTrigger: "defeat",
    isEnding: true,
    outcomeType: "bad",
    endingTitle: "Absorbed",
    endingSummary:
      "You said a big yes to a vague offer. She'll define the terms over the next three months — slowly, in her favor. Within a year, your project is tangled with her network, and extracting will cost more than the whole project was worth. The invitation was annexation.",
    dialog: [
      {
        speakerId: "inner-voice",
        text: "Vague deals are written by the more ruthless party — after the handshake.",
        emotion: "sad",
      },
    ],
  },
];

export const mission51: Scenario = {
  id: "mission-5-1",
  title: "The Power Shift",
  tagline: "She's the one reaching out now.",
  description:
    "Six months since the gala. Six months of work. The first message from Maris in all that time: 'I've been watching what you built. We should talk.' The gravity has shifted. Can you use it without losing the thing that made it shift?",
  tier: "premium",
  level: 5,
  order: 1,
  estimatedMinutes: 14,
  difficulty: "advanced",
  category: "professional",
  xpReward: 225,
  badgeId: "shift-recognized",
  startSceneId: "the-invitation",
  tacticsLearned: [
    "Response-time signaling after power shift",
    "Refusing the frame at the venue level",
    "Forcing them to show a card before you commit",
    "Conditional acceptance of leverage",
    "Silence that leaves them filling space",
  ],
  redFlagsTaught: [
    "Sudden warmth from someone who ignored you",
    "Vague deal terms (sponsorship, involvement, partnership)",
    "Love-bombing aimed at what you built, not who you are",
    "Home-field venue requests disguised as recommendations",
  ],
  reward: {
    id: "shift-recognized",
    name: "The Shift Recognized",
    description: "She reached first. You took the leverage without taking the frame.",
    unlocksScenarioId: "mission-5-2",
  },
  prerequisites: ["mission-4-2"],
  characters: [MARIS, PRIYA, INNER_VOICE],
  scenes,
};

export default mission51;
