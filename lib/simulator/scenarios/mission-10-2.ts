/**
 * Mission 10-2 — "The Inheritance"
 *
 * Level 10, order 2 — the final scenario.
 * Two years after The Gatekeeper. Maris is retired (or gone), Aria
 * left for another company, Devon is moving fast. A new opening is
 * coming at the highest tier in the industry. Who do you name?
 * Everything you've built rests on this sentence.
 */

import type { Scenario, Scene } from "../types";
import { DEVON, PRIYA, LENNOX, KAYA, INNER_VOICE } from "../characters";

const scenes: Scene[] = [
  {
    id: "the-nomination",
    backgroundId: "restaurant",
    mood: "mysterious",
    presentCharacterIds: ["kaya"],
    dialog: [
      {
        speakerId: null,
        text: "Two years later. Dinner with Kaya. She's retiring in six months. Her role — the one above yours — is coming open.",
      },
      {
        speakerId: "kaya",
        text: '"You\'re the obvious successor. But the board is going to want a second name on the list. Someone you\'d stake your reputation on."',
        emotion: "knowing",
      },
      {
        speakerId: "inner-voice",
        text: "Your vote carries weight now. The name you give will either validate the structure you've built, or confirm you as nepotistic. This is the test of whether your judgment compounds or just becomes your signature.",
        emotion: "serious",
      },
    ],
    choices: [
      {
        id: "devon",
        text: "Devon — the protégé you invested in directly. Proven, loyal.",
        tactic: "Loyalty-weighted pick. Devon is good. 'Loyal' will read as 'nepotism' to people not in your orbit.",
        nextSceneId: "devon-evaluation",
      },
      {
        id: "lennox",
        text: "Lennox — the rival-turned-ally. Stronger record publicly, more independent.",
        tactic: "Strategic pick. Lennox's reputation is now independent of yours.",
        nextSceneId: "lennox-evaluation",
        isOptimal: true,
      },
      {
        id: "outside-candidate",
        text: "An outside candidate — someone you respect who you haven't mentored.",
        tactic: "Broadens your network. Shows you can spot talent you didn't create.",
        nextSceneId: "outside-evaluation",
        isOptimal: true,
      },
      {
        id: "decline",
        text: "\"Let the board decide without me weighing in.\"",
        tactic: "Abdication. You're being asked for judgment, not consent.",
        nextSceneId: "ending-abdicated",
        isOptimal: false,
      },
    ],
  },

  {
    id: "devon-evaluation",
    backgroundId: "restaurant",
    mood: "tense",
    presentCharacterIds: ["kaya"],
    dialog: [
      {
        speakerId: "kaya",
        text: '"Devon is good. Devon is also two years into the industry. If you\'re nominating them, you\'re saying they\'re ready for the top job. Are they?"',
        emotion: "serious",
      },
      {
        speakerId: "inner-voice",
        text: "Honest answer: probably no, and saying yes spends your credibility on loyalty instead of accuracy.",
        emotion: "knowing",
      },
    ],
    choices: [
      {
        id: "revise-devon",
        text: "\"You're right. Not ready. Let me pick again.\"",
        tactic: "Catch your own bias. Kaya just gave you an exit — take it.",
        nextSceneId: "the-nomination",
        isOptimal: true,
      },
      {
        id: "commit-devon",
        text: "\"I still think Devon.\"",
        tactic: "Loyalty over judgment. Kaya will stop trusting your future picks.",
        nextSceneId: "ending-loyalty-over-judgment",
        isOptimal: false,
      },
    ],
  },

  {
    id: "lennox-evaluation",
    backgroundId: "restaurant",
    mood: "tense",
    presentCharacterIds: ["kaya"],
    dialog: [
      {
        speakerId: "kaya",
        text: '"Lennox. The one who tried the Maris playbook on you six years ago. You recruited her instead."',
        emotion: "knowing",
      },
      {
        speakerId: "kaya",
        text: '"She\'s strong. And she\'s going to outperform you publicly within five years. You\'re nominating her knowing that?"',
        emotion: "serious",
      },
      {
        speakerId: "inner-voice",
        text: "The real test: can you elevate someone who'll eclipse you?",
        emotion: "knowing",
      },
    ],
    choices: [
      {
        id: "yes-even-so",
        text: "\"Yes. Especially knowing that.\"",
        tactic: "The endgame move. You're not optimizing for your own relative ranking.",
        nextSceneId: "ending-legacy",
        isOptimal: true,
      },
      {
        id: "hesitate",
        text: "\"Let me think about it.\"",
        tactic: "You're hesitating because of the eclipse prospect. That hesitation IS the answer — and revealing it to Kaya marks you as smaller than the seat.",
        nextSceneId: "ending-small",
      },
      {
        id: "retract",
        text: "\"Actually, let me revise to Devon.\"",
        tactic: "Ego protection. Everyone will see it.",
        nextSceneId: "ending-small",
        isOptimal: false,
      },
    ],
  },

  {
    id: "outside-evaluation",
    backgroundId: "restaurant",
    mood: "tense",
    presentCharacterIds: ["kaya"],
    dialog: [
      {
        speakerId: "kaya",
        text: "\"Interesting. Someone not in your orbit. Who?\"",
        emotion: "curious",
      },
      {
        speakerId: "inner-voice",
        text: "Naming someone outside your mentorship tree shows breadth of judgment. Kaya is testing whether your evaluation is independent of your teaching.",
        emotion: "knowing",
      },
    ],
    choices: [
      {
        id: "specific-name",
        text: "Name someone specific with a concrete reason.",
        tactic: "Prepared, broad, independent. Best signal you can give.",
        nextSceneId: "ending-broad-judgment",
        isOptimal: true,
      },
      {
        id: "fumble",
        text: "\"I — let me come back with a name next week.\"",
        tactic: "You said the option before thinking it through. Weakens the rest of your input.",
        nextSceneId: "ending-unprepared",
      },
    ],
  },

  // ---------------------------------------------------------------------
  // ENDINGS
  // ---------------------------------------------------------------------

  {
    id: "ending-legacy",
    backgroundId: "restaurant",
    mood: "peaceful",
    immersionTrigger: "victory",
    isEnding: true,
    outcomeType: "good",
    endingTitle: "The Legacy Move",
    endingSummary:
      "You named Lennox — knowing she'd outperform you within five years. Kaya looked at you for a long moment and nodded. Eight years ago you were the rival at a rooftop bar; today you're the person who elevated your own replacement. Everything compounds: Devon becomes what you were, Lennox becomes what Kaya was, and you become the person whose judgment the industry trusts — because you never optimized for relative ranking. That's the true endgame. You didn't beat the game. You inherited Kaya's seat at it.",
    dialog: [
      {
        speakerId: "inner-voice",
        text: "The final mastery is elevating the person who'll surpass you. Everything else is ego in a nicer office.",
        emotion: "knowing",
      },
    ],
  },

  {
    id: "ending-broad-judgment",
    backgroundId: "restaurant",
    mood: "peaceful",
    isEnding: true,
    outcomeType: "good",
    endingTitle: "Broad Judgment",
    endingSummary:
      "You named someone you didn't create. Specific reasons, independent evaluation. Kaya respects it — it proves your judgment doesn't only work on people who owe you. In the meeting, that breadth becomes the thing that lands you the role you'd been tracking toward. You didn't win by being loyal. You won by being trusted.",
    dialog: [
      {
        speakerId: "inner-voice",
        text: "Judgment independent of mentorship lineage is the rarest currency at this level.",
        emotion: "knowing",
      },
    ],
  },

  {
    id: "ending-loyalty-over-judgment",
    backgroundId: "restaurant",
    mood: "tense",
    isEnding: true,
    outcomeType: "bad",
    endingTitle: "Loyalty Over Judgment",
    endingSummary:
      "You nominated Devon. Kaya marked it. Three months later, the board interviewed Devon and passed. The story in the quiet rooms: 'they nominated their own protégé — didn't see the weakness.' Your next nomination will carry the discount. The decade you spent building judgment was spent fast on one loyalty pick.",
    dialog: [
      {
        speakerId: "inner-voice",
        text: "Loyalty is a currency. Spent on the wrong thing, it's worth less than the thing it bought.",
        emotion: "sad",
      },
    ],
  },

  {
    id: "ending-small",
    backgroundId: "restaurant",
    mood: "tense",
    isEnding: true,
    outcomeType: "bad",
    endingTitle: "Smaller Than the Seat",
    endingSummary:
      "You hesitated. Kaya saw why. The senior-most role you'd worked toward for a decade now has a question mark next to your name: 'can they elevate?' Power at this level is partly about whose career you can accelerate. You just revealed that yours still contains a calculation about eclipse.",
    dialog: [
      {
        speakerId: "inner-voice",
        text: "The seat evaluates you by whose ascension you make easier. A moment of hesitation is a lifetime of answered questions.",
        emotion: "sad",
      },
    ],
  },

  {
    id: "ending-unprepared",
    backgroundId: "restaurant",
    mood: "tense",
    isEnding: true,
    outcomeType: "neutral",
    endingTitle: "Unprepared",
    endingSummary:
      "You proposed looking outside without a specific name ready. Kaya's follow-up revealed the proposal was directional, not considered. You get a week to come back with one — but the first impression was that you were performing breadth rather than having done the work.",
    dialog: [
      {
        speakerId: "inner-voice",
        text: "At this level, the first answer IS the answer. Come prepared or stay quiet.",
        emotion: "neutral",
      },
    ],
  },

  {
    id: "ending-abdicated",
    backgroundId: "restaurant",
    mood: "danger",
    isEnding: true,
    outcomeType: "bad",
    endingTitle: "Abdication",
    endingSummary:
      "You declined to weigh in. Kaya's face stayed neutral but her assessment landed: 'they'll take the role but they won't lead at it.' The nomination happens without you. The person chosen is competent but not who you would have picked. You'll spend five years working for someone you could have chosen better than.",
    dialog: [
      {
        speakerId: "inner-voice",
        text: "Refusing to use your influence is still using it — as neglect.",
        emotion: "sad",
      },
    ],
  },
];

export const mission102: Scenario = {
  id: "mission-10-2",
  title: "The Inheritance",
  tagline: "Name a successor. Mean it.",
  description:
    "Two years later. Kaya is retiring. Her role — the one above yours — needs a name. She's asking you to propose one. The name you give reveals who you've become. The game that started at a gala eight years ago ends in a single sentence tonight.",
  tier: "vip",
  level: 10,
  order: 2,
  estimatedMinutes: 7,
  difficulty: "advanced",
  category: "professional",
  xpReward: 500,
  badgeId: "final-mastery",
  startSceneId: "the-nomination",
  tacticsLearned: [
    "Elevating someone who will surpass you",
    "Judgment independent of your mentorship tree",
    "Catching your own loyalty bias mid-conversation",
    "Using influence as responsibility, not reward",
  ],
  redFlagsTaught: [
    "Protégé nepotism disguised as loyalty",
    "Hesitation as revealed calculation",
    "Abdication as 'humility'",
    "Broad picks without prepared specifics",
  ],
  reward: {
    id: "final-mastery",
    name: "The Final Mastery",
    description: "The game is finite. The legacy isn't. You built one.",
  },
  prerequisites: ["mission-10-1"],
  characters: [DEVON, LENNOX, KAYA, PRIYA, INNER_VOICE],
  scenes,
};

export default mission102;
