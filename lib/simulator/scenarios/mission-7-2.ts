/**
 * Mission 7-2 — "The Exit"
 *
 * Level 7, order 2. The harder dating scenario: ending something
 * that was real but wrong, without scorching earth and without
 * leaving ambiguity that pulls them back. The cleanest exit is the
 * one neither of you has to rewrite later.
 */

import type { Scenario, Scene } from "../types";
import { NOVA, PRIYA, INNER_VOICE } from "../characters";

const scenes: Scene[] = [
  {
    id: "the-decision",
    backgroundId: "apartment",
    mood: "mysterious",
    dialog: [
      {
        speakerId: null,
        text: "Three months with Nova. They're good. You're good with them. But something's off — not in them, in the shape of you-together.",
      },
      {
        speakerId: "inner-voice",
        text: "This is harder than leaving someone toxic. Nothing's wrong. It's just not right — and you owe yourself AND them a clean ending before it becomes resentment.",
        emotion: "serious",
      },
    ],
    choices: [
      {
        id: "overthink-indefinitely",
        text: "Give it another month. Maybe it'll shift.",
        tactic: "You already know. Delay = accumulated dishonesty.",
        nextSceneId: "another-month-passes",
        isOptimal: false,
      },
      {
        id: "decide-to-end",
        text: "Decide this week. Plan it.",
        tactic: "Clarity for you first, communication second.",
        nextSceneId: "priya-counsel",
        isOptimal: true,
      },
      {
        id: "fade-out",
        text: "Slowly become less available. Let it fizzle.",
        tactic: "You're about to become the pattern you used to hate.",
        nextSceneId: "ending-fade-shame",
        isOptimal: false,
      },
    ],
  },

  {
    id: "priya-counsel",
    backgroundId: "apartment",
    mood: "peaceful",
    presentCharacterIds: ["priya"],
    dialog: [
      {
        speakerId: "priya",
        text: '"What are you going to say?"',
        emotion: "serious",
      },
      {
        speakerId: "inner-voice",
        text: "She wants you to rehearse before delivery. The script you write now is less cruel than the one you improvise.",
        emotion: "knowing",
      },
    ],
    choices: [
      {
        id: "vague-reasons",
        text: "\"I don't think we're right long-term.\"",
        tactic: "True but provides nothing to process. They'll spend a month decoding 'long-term.'",
        nextSceneId: "priya-refines",
      },
      {
        id: "specific-honest",
        text: "\"We're good together but I'm not in love with our shape. I'd rather end it clean than resent it later.\"",
        tactic: "Specific, kind, unambiguous. The best version of hard.",
        nextSceneId: "priya-approves",
        isOptimal: true,
      },
      {
        id: "blame-yourself",
        text: '"I\'m just not ready for anything serious right now."',
        tactic: "Lie told to seem kind. Leaves them to retry when you're 'ready.'",
        nextSceneId: "priya-challenges",
        isOptimal: false,
      },
      {
        id: "problem-with-them",
        text: '"There are some things about you that don\'t work for me."',
        tactic: "Unnecessarily damaging. Specifics go inside them for years.",
        nextSceneId: "priya-warns",
        isOptimal: false,
      },
    ],
  },

  {
    id: "priya-refines",
    backgroundId: "apartment",
    mood: "peaceful",
    presentCharacterIds: ["priya"],
    dialog: [
      {
        speakerId: "priya",
        text: "\"Long-term is their homework problem, not a conclusion. What's the actual why?\"",
        emotion: "serious",
      },
    ],
    nextSceneId: "priya-approves",
  },

  {
    id: "priya-challenges",
    backgroundId: "apartment",
    mood: "tense",
    presentCharacterIds: ["priya"],
    dialog: [
      {
        speakerId: "priya",
        text: "\"That line is a door. They'll knock again in three months when they think you've 'gotten ready.' Is that what you want?\"",
        emotion: "knowing",
      },
    ],
    nextSceneId: "priya-approves",
  },

  {
    id: "priya-warns",
    backgroundId: "apartment",
    mood: "tense",
    presentCharacterIds: ["priya"],
    dialog: [
      {
        speakerId: "priya",
        text: "\"You're not owed their list of flaws. And they're not owed yours.\"",
        emotion: "serious",
      },
      {
        speakerId: "priya",
        text: "\"End the shape. Don't critique the person.\"",
        emotion: "knowing",
      },
    ],
    nextSceneId: "priya-approves",
  },

  {
    id: "priya-approves",
    backgroundId: "apartment",
    mood: "peaceful",
    presentCharacterIds: ["priya"],
    dialog: [
      {
        speakerId: "priya",
        text: '"One more thing. Do it in person. Don\'t text it. Don\'t call. In person, in daylight, somewhere neutral."',
        emotion: "serious",
      },
    ],
    nextSceneId: "the-conversation",
  },

  {
    id: "another-month-passes",
    backgroundId: "apartment",
    mood: "danger",
    dialog: [
      {
        speakerId: null,
        text: "Four weeks later. You're colder. They've noticed. You're still here.",
      },
      {
        speakerId: "inner-voice",
        text: "Every week you stay after you've decided is a week they'll have to process the dishonesty, not just the ending.",
        emotion: "sad",
      },
    ],
    nextSceneId: "the-conversation",
  },

  {
    id: "the-conversation",
    backgroundId: "park",
    mood: "peaceful",
    presentCharacterIds: ["nova"],
    dialog: [
      {
        speakerId: null,
        text: "Saturday afternoon. A park. You asked them to walk. They knew before you spoke.",
      },
      {
        speakerId: "nova",
        text: '"Okay. You have something. What is it?"',
        emotion: "neutral",
      },
      {
        speakerId: "inner-voice",
        text: "They're making it easy. Don't waste that generosity with throat-clearing.",
        emotion: "knowing",
      },
    ],
    choices: [
      {
        id: "clean-delivery",
        text: "Deliver the rehearsed line. Clean. Short.",
        tactic: "The script you prepared, said the way you prepared it.",
        nextSceneId: "nova-receives",
        isOptimal: true,
      },
      {
        id: "soften",
        text: "Soften it. Lead with how much they mean to you.",
        tactic: "Softening a breakup is called giving hope. Don't.",
        nextSceneId: "nova-confused",
        isOptimal: false,
      },
      {
        id: "delay",
        text: "\"I don't know where to start.\"",
        tactic: "You do. Stalling is cruelty dressed as nerves.",
        nextSceneId: "nova-helps-you",
      },
    ],
  },

  {
    id: "nova-receives",
    backgroundId: "park",
    mood: "mysterious",
    presentCharacterIds: ["nova"],
    dialog: [
      {
        speakerId: null,
        text: "You say it. It lands. They take a long breath.",
      },
      {
        speakerId: "nova",
        text: '"Okay. That\'s fair. I actually appreciate you saying it cleanly."',
        emotion: "neutral",
      },
      {
        speakerId: "nova",
        text: '"Can I ask one thing?"',
        emotion: "curious",
      },
    ],
    choices: [
      {
        id: "say-yes",
        text: "\"Sure.\"",
        tactic: "Closure is theirs to earn if they want it.",
        nextSceneId: "nova-asks-one-thing",
        isOptimal: true,
      },
      {
        id: "limit",
        text: "\"Yes, but I'm not going to re-open the decision.\"",
        tactic: "Pre-emptively defining the conversation. Reasonable but tense.",
        nextSceneId: "nova-asks-one-thing",
      },
      {
        id: "offer-space",
        text: "\"Of course. Take a minute if you need it first.\"",
        tactic: "Give them room. The next sentence matters and should be said when they're ready for it.",
        nextSceneId: "nova-asks-one-thing",
        isOptimal: true,
      },
      {
        id: "sit-with-it",
        text: "Nod. Don't speak. Let them ask.",
        tactic: "Silence respects the weight of the moment. They'll fill it with exactly what they meant.",
        nextSceneId: "nova-asks-one-thing",
        isOptimal: true,
      },
    ],
  },

  {
    id: "nova-asks-one-thing",
    backgroundId: "park",
    mood: "peaceful",
    presentCharacterIds: ["nova"],
    dialog: [
      {
        speakerId: "nova",
        text: '"Is this about me or about you?"',
        emotion: "serious",
      },
      {
        speakerId: "inner-voice",
        text: "Honest question. Deserves an honest answer. No performance of kindness.",
        emotion: "knowing",
      },
    ],
    choices: [
      {
        id: "answer-honestly",
        text: "\"Me. But you'd be someone else's answer. Not mine.\"",
        tactic: "True. Doesn't demean them. Doesn't hand them a puzzle to solve.",
        nextSceneId: "ending-clean-exit",
        isOptimal: true,
      },
      {
        id: "false-kindness",
        text: "\"It's me, definitely me, you're amazing.\"",
        tactic: "Lies about kindness become the thing they chew on for months.",
        nextSceneId: "ending-ambiguous-exit",
        isOptimal: false,
      },
      {
        id: "turn-it-on-them",
        text: "\"A little of both, honestly.\"",
        tactic: "Vagueness disguised as honesty. They'll interrogate the 'little' for months.",
        nextSceneId: "ending-ambiguous-exit",
      },
    ],
  },

  {
    id: "nova-confused",
    backgroundId: "park",
    mood: "tense",
    presentCharacterIds: ["nova"],
    dialog: [
      {
        speakerId: "nova",
        text: '"Wait. You just told me what I mean to you. And now you\'re ending it?"',
        emotion: "confused",
      },
      {
        speakerId: "inner-voice",
        text: "You gave them hope and then took it back. That's the worst order to deliver in.",
        emotion: "concerned",
      },
    ],
    nextSceneId: "ending-messy-exit",
  },

  {
    id: "nova-helps-you",
    backgroundId: "park",
    mood: "tense",
    presentCharacterIds: ["nova"],
    dialog: [
      {
        speakerId: "nova",
        text: '"It\'s okay. Just say it."',
        emotion: "sad",
      },
      {
        speakerId: "inner-voice",
        text: "They're holding your hand through your own breakup delivery. Take the grace and do it.",
        emotion: "knowing",
      },
    ],
    nextSceneId: "nova-receives",
  },

  // ---------------------------------------------------------------------
  // ENDINGS
  // ---------------------------------------------------------------------

  {
    id: "ending-clean-exit",
    backgroundId: "park",
    mood: "peaceful",
    isEnding: true,
    outcomeType: "good",
    endingTitle: "Clean Exit",
    endingSummary:
      "Rehearsed line, delivered in person, specific about the shape not the person. They asked the one honest question; you gave the honest answer. No ambiguity, no 'maybe in six months', no 'still friends' landmine. Two years from now, the memory of how it ended won't be worse than the memory of being together.",
    dialog: [
      {
        speakerId: "inner-voice",
        text: "The cruelest ending is the unclear one. The kindest is the one they don't have to translate later.",
        emotion: "knowing",
      },
    ],
  },

  {
    id: "ending-ambiguous-exit",
    backgroundId: "park",
    mood: "tense",
    isEnding: true,
    outcomeType: "neutral",
    endingTitle: "Ambiguous Close",
    endingSummary:
      "You couldn't quite commit to the reason. Told them it was 'both' or 'definitely you.' They'll spend weeks decoding the phrase. They'll text in a month to 'check in'. You'll have to end it again, worse, because the first ending didn't finish.",
    dialog: [
      {
        speakerId: "inner-voice",
        text: "Ambiguity in a breakup is a second breakup scheduled.",
        emotion: "neutral",
      },
    ],
  },

  {
    id: "ending-fade-shame",
    backgroundId: "apartment",
    mood: "danger",
    isEnding: true,
    outcomeType: "bad",
    failureBlogSlug: "avoidant-defence-system-why-they-pull-away",
    failureBlogTitle: "The Avoidant Defence System: Why They Pull Away",
    endingTitle: "The Fade",
    endingSummary:
      "You got slower to reply. Harder to see. You became the avoidant you spent six months describing to Priya. Nova figured it out before you delivered it, which means they got the breakup without the conversation. You saved yourself the discomfort; they lost the closure.",
    dialog: [
      {
        speakerId: "inner-voice",
        text: "Fading out is the coward's exit. Don't learn tools for strength just to use them as escape hatches.",
        emotion: "sad",
      },
    ],
  },

  {
    id: "ending-messy-exit",
    backgroundId: "park",
    mood: "danger",
    isEnding: true,
    outcomeType: "bad",
    failureBlogSlug: "butterflies-are-warning-not-romance",
    failureBlogTitle: "Butterflies Are Warning, Not Romance",
    endingTitle: "Messy Delivery",
    endingSummary:
      "You softened with flattery, then ended it. They heard warmth, then rejection in the same breath. You gave them a puzzle to solve — 'if I mean so much, why did they leave?' — that they'll chew on for a year. Kinder to have said nothing sweet at all.",
    dialog: [
      {
        speakerId: "inner-voice",
        text: "Flattery before rejection is worse than rejection alone. It's just the rejection plus confusion.",
        emotion: "sad",
      },
    ],
  },
];

export const mission72: Scenario = {
  id: "mission-7-2",
  title: "The Exit",
  tagline: "End the shape. Don't critique the person.",
  description:
    "Three months with Nova. Nothing wrong. Just not right. The hardest exits are the ones where the other person has done everything well. Deliver it cleanly or live with having delivered it badly.",
  tier: "premium",
  level: 7,
  order: 2,
  estimatedMinutes: 9,
  difficulty: "advanced",
  category: "healthy",
  xpReward: 300,
  badgeId: "clean-exit",
  startSceneId: "the-decision",
  tacticsLearned: [
    "Rehearsed delivery before execution",
    "End the shape, not the person",
    "Honest answer to an honest question",
    "In person, in daylight, somewhere neutral",
  ],
  redFlagsTaught: [
    "Softening with flattery before the blow",
    "'It's me, not you' as escape from specificity",
    "Fading out as coward's avoidance",
    "Ambiguous reasons as second breakups in waiting",
  ],
  reward: {
    id: "clean-exit",
    name: "Clean Exit",
    description: "You ended something good without making it ugly.",
    unlocksScenarioId: "mission-8-1",
  },
  prerequisites: ["mission-7-1"],
  characters: [NOVA, PRIYA, INNER_VOICE],
  scenes,
};

export default mission72;
