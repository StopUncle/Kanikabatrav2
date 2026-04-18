/**
 * Mission 9-1 — "The Slow Bleed"
 *
 * Level 9, order 1. VIP tier.
 * Someone has been running a sustained reputation campaign against
 * you for six months, covertly, in rooms you'll never see. You just
 * learned about it. The question is whether to respond — and how.
 */

import type { Scenario, Scene } from "../types";
import { ARIA, KAYA, PRIYA, INNER_VOICE } from "../characters";

const scenes: Scene[] = [
  {
    id: "kaya-reveals",
    backgroundId: "restaurant",
    mood: "tense",
    presentCharacterIds: ["kaya"],
    dialog: [
      {
        speakerId: "kaya",
        text: '"I\'ve been debating whether to tell you for two months. I\'m telling you now."',
        emotion: "serious",
      },
      {
        speakerId: "kaya",
        text: '"Aria Vale has been positioning against you since last summer. Specific stories, specific rooms, specific people."',
        emotion: "knowing",
      },
      {
        speakerId: "inner-voice",
        text: "Six months of sustained covert attack you didn't know existed. Kaya has been watching it compound.",
        emotion: "concerned",
      },
    ],
    choices: [
      {
        id: "demand-details",
        text: '"Tell me everything. Every story, every room, every person."',
        tactic: "Need intel before any response. Foundation move.",
        nextSceneId: "kaya-gives-intel",
        isOptimal: true,
      },
      {
        id: "ask-why",
        text: '"Why me? What\'s her goal?"',
        tactic: "Understanding motive shapes the counter. Slower but deeper.",
        nextSceneId: "kaya-explains-motive",
        isOptimal: true,
      },
      {
        id: "immediate-retaliate",
        text: '"What do I need to do to crush her?"',
        tactic: "Reactive. Aria wants you emotional. Don't oblige.",
        nextSceneId: "kaya-slows-you",
      },
      {
        id: "doubt-it",
        text: '"Are you sure? Maybe it\'s been blown out of proportion."',
        tactic: "Denial is the worst tactic. Six months of damage won't stop because you wish it weren't happening.",
        nextSceneId: "kaya-insists",
        isOptimal: false,
      },
    ],
  },

  {
    id: "kaya-gives-intel",
    backgroundId: "restaurant",
    mood: "tense",
    presentCharacterIds: ["kaya"],
    dialog: [
      {
        speakerId: "kaya",
        text: '"Seven stories total. Three about your \'management style.\' Two about a project you didn\'t actually own. Two about your character."',
        emotion: "serious",
      },
      {
        speakerId: "kaya",
        text: '"She\'s told them at three industry dinners, two conference afterparties, and one closed-door hiring conversation you were considered for."',
        emotion: "serious",
      },
      {
        speakerId: "inner-voice",
        text: "Closed-door hiring = you lost a role you didn't know you were up for. This is no longer just reputation; it's material.",
        emotion: "concerned",
      },
    ],
    nextSceneId: "strategy-decision",
  },

  {
    id: "kaya-explains-motive",
    backgroundId: "restaurant",
    mood: "tense",
    presentCharacterIds: ["kaya"],
    dialog: [
      {
        speakerId: "kaya",
        text: '"She\'s going for the same senior role you\'re tracking toward. Only one opens per year."',
        emotion: "neutral",
      },
      {
        speakerId: "kaya",
        text: '"She can\'t beat you on merit. So she\'s degrading your merit in the rooms where the decision gets made."',
        emotion: "knowing",
      },
      {
        speakerId: "inner-voice",
        text: "Zero-sum competition in an oligarchic hiring pool. She's being rational, from her perspective. That makes her more dangerous than a grudge would.",
        emotion: "knowing",
      },
    ],
    nextSceneId: "kaya-gives-intel",
  },

  {
    id: "kaya-slows-you",
    backgroundId: "restaurant",
    mood: "tense",
    presentCharacterIds: ["kaya"],
    dialog: [
      {
        speakerId: "kaya",
        text: '"You can\'t crush her. She\'s too careful. You need something else."',
        emotion: "serious",
      },
      {
        speakerId: "kaya",
        text: '"Every move you make in anger is a move she anticipated. Go home. Come back Monday."',
        emotion: "knowing",
      },
    ],
    nextSceneId: "kaya-gives-intel",
  },

  {
    id: "kaya-insists",
    backgroundId: "restaurant",
    mood: "danger",
    presentCharacterIds: ["kaya"],
    dialog: [
      {
        speakerId: "kaya",
        text: '"I wouldn\'t have told you if I weren\'t sure. I have two of the stories on paper."',
        emotion: "serious",
      },
      {
        speakerId: "inner-voice",
        text: "Kaya is risking her own relationships to tell you. Don't insult the gift.",
        emotion: "knowing",
      },
    ],
    nextSceneId: "kaya-gives-intel",
  },

  {
    id: "strategy-decision",
    backgroundId: "apartment",
    mood: "mysterious",
    dialog: [
      {
        speakerId: null,
        text: "Monday morning. You spent the weekend mapping what you know. Four strategic options.",
      },
      {
        speakerId: "inner-voice",
        text: "The first move you make publicly is the move Aria's been waiting for. Choose the surprise.",
        emotion: "knowing",
      },
    ],
    choices: [
      {
        id: "direct-confront",
        text: "DM Aria. Tell her you know. Warn her.",
        tactic: "Shows your cards. She'll just move to more covert operations.",
        nextSceneId: "ending-cards-shown",
        isOptimal: false,
      },
      {
        id: "counter-narrative",
        text: "Begin quiet counter-narrative — meet with the same people she's been speaking to.",
        tactic: "Surgical. Specific. The right audience.",
        nextSceneId: "counter-campaign-begins",
        isOptimal: true,
      },
      {
        id: "build-results",
        text: "Ignore her. Double down on shipping undeniable work.",
        tactic: "Slow but durable. Results eventually outweigh rumor.",
        nextSceneId: "results-strategy",
      },
      {
        id: "long-game",
        text: "Set a trap she can't see. Six months out.",
        tactic: "Playing at her level. Requires patience + Kaya's help.",
        nextSceneId: "trap-strategy",
        isOptimal: true,
      },
    ],
  },

  {
    id: "counter-campaign-begins",
    backgroundId: "office",
    mood: "tense",
    presentCharacterIds: ["kaya"],
    dialog: [
      {
        speakerId: null,
        text: "Over three weeks, you have nine one-on-ones. The same people she's been talking to. Not about her. About your work, specifically.",
      },
      {
        speakerId: "kaya",
        text: '"Three of them have mentioned Aria\'s stories to me. Two now have direct, unprompted evidence that contradicts her."',
        emotion: "knowing",
      },
      {
        speakerId: "inner-voice",
        text: "You didn't attack the story. You made each storyteller's listener already have a better one.",
        emotion: "knowing",
      },
    ],
    choices: [
      {
        id: "keep-going",
        text: "Continue for three more weeks. Don't mention Aria.",
        tactic: "Sustain until the rumor becomes the outlier, not the assumption.",
        nextSceneId: "ending-counter-campaign-wins",
        isOptimal: true,
      },
      {
        id: "close-early",
        text: "Stop now. You've done enough.",
        tactic: "You've moved the needle halfway. Stopping early lets her re-establish.",
        nextSceneId: "ending-partial-counter",
      },
      {
        id: "add-direct-mention",
        text: "Start mentioning 'I heard there were some stories — here's my side.'",
        tactic: "You just amplified her stories to people who hadn't heard them.",
        nextSceneId: "ending-amplified-counter",
        isOptimal: false,
      },
    ],
  },

  {
    id: "results-strategy",
    backgroundId: "office",
    mood: "mysterious",
    dialog: [
      {
        speakerId: null,
        text: "Three months. You ship two major projects. They're undeniable.",
      },
      {
        speakerId: null,
        text: "Four months. She's still telling the stories. But people are now awkward about repeating them because the work contradicts the character.",
      },
      {
        speakerId: "inner-voice",
        text: "Slow strategy. Works if you can afford the slow. Expensive if you can't.",
        emotion: "knowing",
      },
    ],
    nextSceneId: "ending-results-eventually",
  },

  {
    id: "trap-strategy",
    backgroundId: "office",
    mood: "mysterious",
    presentCharacterIds: ["kaya"],
    dialog: [
      {
        speakerId: "kaya",
        text: '"Tell me what you\'re thinking."',
        emotion: "knowing",
      },
      {
        speakerId: "inner-voice",
        text: "You explain: a specific project she'll want to claim. You'll be seen leading it. She'll trash it covertly. When it succeeds publicly — her trash talk becomes the evidence she's unreliable.",
        emotion: "knowing",
      },
    ],
    choices: [
      {
        id: "execute-trap",
        text: "Lay the trap. Execute over four months.",
        tactic: "High-level play. Requires discipline to not tip your hand.",
        nextSceneId: "ending-trap-executed",
        isOptimal: true,
      },
      {
        id: "reconsider",
        text: "Decide it's too risky. Pivot to counter-narrative instead.",
        tactic: "Valid choice. Trap requires perfect discipline.",
        nextSceneId: "counter-campaign-begins",
      },
    ],
  },

  // ---------------------------------------------------------------------
  // ENDINGS
  // ---------------------------------------------------------------------

  {
    id: "ending-counter-campaign-wins",
    backgroundId: "office",
    mood: "peaceful",
    isEnding: true,
    outcomeType: "good",
    endingTitle: "The Counter-Campaign",
    endingSummary:
      "Six weeks of surgical one-on-ones with the exact people she's been talking to. You never mentioned her. You never defended yourself. You just made your work legible, specifically and repeatedly, to the rooms that matter. By month four, her stories have become the outlier, not the assumption. She'll hear from Kaya that you know. She'll realize she's been outmaneuvered without being engaged.",
    dialog: [
      {
        speakerId: "inner-voice",
        text: "The best counter-narrative isn't a counter. It's a different story told to the same audience, more often, with better evidence.",
        emotion: "knowing",
      },
    ],
  },

  {
    id: "ending-trap-executed",
    backgroundId: "office",
    mood: "peaceful",
    isEnding: true,
    outcomeType: "good",
    endingTitle: "The Trap",
    endingSummary:
      "Four months of discipline. The project you led succeeded publicly. Aria's covert trash talk, repeated to the same people she'd been poisoning, now reads as 'bitter and out of touch.' You never attacked her — you made her own behavior the argument against her. Her pipeline dried up. Your senior-role candidacy crystallized.",
    dialog: [
      {
        speakerId: "inner-voice",
        text: "Don't fight the rumor. Make the rumor obviously wrong to the same audience that's been hearing it.",
        emotion: "knowing",
      },
    ],
  },

  {
    id: "ending-results-eventually",
    backgroundId: "office",
    mood: "peaceful",
    isEnding: true,
    outcomeType: "good",
    endingTitle: "Results Eventually",
    endingSummary:
      "You bet on the work. It took longer than a counter-campaign. You missed the first senior opening because the hiring conversation still had residual doubt. By the second opening eighteen months out, your results had swamped her stories. You won. You paid a year of invisible tax to do it.",
    dialog: [
      {
        speakerId: "inner-voice",
        text: "Sometimes the right answer is the slow one. Just know what you're paying for patience.",
        emotion: "knowing",
      },
    ],
  },

  {
    id: "ending-partial-counter",
    backgroundId: "office",
    mood: "tense",
    isEnding: true,
    outcomeType: "neutral",
    endingTitle: "Partial Counter",
    endingSummary:
      "Three weeks was enough to move about half the audience. The other half still carry residue of her stories. You'll get the next senior role — but only because Kaya advocated hard in a room you weren't in. Don't stop counter-campaigns halfway.",
    dialog: [
      {
        speakerId: "inner-voice",
        text: "Reputation work is continuous. Stopping halfway is where most people confirm the rumor.",
        emotion: "neutral",
      },
    ],
  },

  {
    id: "ending-cards-shown",
    backgroundId: "apartment",
    mood: "danger",
    isEnding: true,
    outcomeType: "bad",
    failureBlogSlug: "doctrine-of-cold-your-new-dating-operating-system",
    failureBlogTitle: "The Doctrine of Cold",
    endingTitle: "You Showed Your Hand",
    endingSummary:
      "You DM'd Aria. Warned her. Now she knows you know, and she's more careful. She moves to rooms you have no visibility into, adds a third-party intermediary, and ramps up. Worse: she now has a 'paranoid DM' screenshot to share with anyone who'd listen. You lost the element of surprise, which was the only advantage you had.",
    dialog: [
      {
        speakerId: "inner-voice",
        text: "Don't tell a covert operator you see them. Outmaneuver them while they're still comfortable.",
        emotion: "sad",
      },
    ],
  },

  {
    id: "ending-amplified-counter",
    backgroundId: "office",
    mood: "danger",
    isEnding: true,
    outcomeType: "bad",
    failureBlogSlug: "architecture-of-control-how-emotional-dependency-is-built",
    failureBlogTitle: "Architecture of Control: How Emotional Dependency Is Built",
    endingTitle: "You Amplified the Smear",
    endingSummary:
      "You started referencing 'the stories' in meetings. Now everyone has heard about them, including people who hadn't. They don't remember your rebuttal; they remember that stories exist. You did Aria's work for her.",
    dialog: [
      {
        speakerId: "inner-voice",
        text: "Mentioning the accusation is the same as carrying it.",
        emotion: "sad",
      },
    ],
  },
];

export const mission91: Scenario = {
  id: "mission-9-1",
  title: "The Slow Bleed",
  tagline: "Six months of whispers you never heard.",
  description:
    "Kaya tells you, at dinner on a Friday, that someone has been positioning against you in rooms you'll never see, for months. Seven stories, three dinners, one closed-door hiring conversation. You can't crush her. What you do this weekend decides the next six months.",
  tier: "vip",
  level: 9,
  order: 1,
  estimatedMinutes: 11,
  difficulty: "advanced",
  category: "professional",
  xpReward: 400,
  badgeId: "long-game-seen",
  startSceneId: "kaya-reveals",
  tacticsLearned: [
    "Never show a covert operator your hand",
    "Counter-narrative to the same audience, not public",
    "Building results that make rumors obviously wrong",
    "Setting a trap she'll self-execute into",
  ],
  redFlagsTaught: [
    "Zero-sum competitors operating covertly",
    "Stories that specifically target hiring rooms",
    "Allies who see the campaign before you do",
    "Pipeline damage before conscious awareness",
  ],
  reward: {
    id: "long-game-seen",
    name: "The Long Game Seen",
    description: "You found out about the campaign. You didn't react. You responded.",
    unlocksScenarioId: "mission-9-2",
  },
  prerequisites: ["mission-8-2"],
  characters: [ARIA, KAYA, PRIYA, INNER_VOICE],
  scenes,
};

export default mission91;
