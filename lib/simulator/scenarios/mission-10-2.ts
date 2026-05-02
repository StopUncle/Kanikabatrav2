/**
 * Mission 10-2, "The Inheritance"
 *
 * Level 10, order 2, the final scenario in the female track.
 * Two years after The Gatekeeper. Maris is retired (or gone), Aria
 * left for another company, Devon is moving fast. A new opening is
 * coming at the highest tier in the industry. Who do you name?
 * Everything you've built rests on this sentence.
 *
 * v2 (2026-04-19): expanded the dinner-with-Kaya scene, added a
 * weighing beat where the player visualises each candidate before
 * Kaya pushes back, added an immediate-aftermath beat between each
 * sub-choice and its ending so the consequence lands. Six endings
 * unchanged.
 *
 * Total scenes: 10 → 19
 * Avg dialog lines per playthrough: ~6 → ~22
 */

import type { Scenario, Scene } from "../types";
import { DEVON, PRIYA, LENNOX, KAYA, INNER_VOICE } from "../characters";

const scenes: Scene[] = [
  // ===================================================================
  // ACT 1, dinner with Kaya, the eight-year arc closing
  // ===================================================================

  {
    id: "the-nomination",
    backgroundId: "restaurant",
    mood: "mysterious",
    presentCharacterIds: ["kaya"],
    dialog: [
      {
        speakerId: null,
        text: "Two years later. The corner table at the restaurant Kaya picks for serious conversations. Low light, white tablecloth, the wine she ordered without asking what you wanted because she already knew.",
      },
      {
        speakerId: null,
        text: "She looks older in this light. Retirement in six months. The role above yours coming open. Eight years since the rooftop bar, the gala, the version of you who didn't know what she was sitting across from.",
      },
      {
        speakerId: "kaya",
        text: '"You\'re the obvious successor. The board already has your file. That part isn\'t the conversation."',
        emotion: "knowing",
      },
      {
        speakerId: "kaya",
        text: '"They\'ll want a second name on the list. Someone you\'d stake your reputation on. That\'s why I\'m asking you over dinner instead of in the hallway. I want to see who you say first."',
        emotion: "serious",
      },
      {
        speakerId: "inner-voice",
        text: "She's not asking for a name. She's asking what kind of person you've become. The answer reveals whose careers you can accelerate, which is half of what this role is.",
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
        text: "Devon, the protégé you invested in directly. Proven, loyal.",
        tactic:
          "Loyalty-weighted pick. Devon is good. 'Loyal' will read as 'nepotism' to people not in your orbit.",
        nextSceneId: "devon-evaluation",
      },
      {
        id: "lennox",
        text: "Lennox, the rival-turned-ally. Stronger record publicly, more independent.",
        tactic: "Strategic pick. Lennox's reputation is now independent of yours.",
        nextSceneId: "lennox-evaluation",
        isOptimal: true,
      },
      {
        id: "outside-candidate",
        text: "An outside candidate, someone you respect who you haven't mentored.",
        tactic:
          "Broadens your network. Shows you can spot talent you didn't create.",
        nextSceneId: "outside-evaluation",
        isOptimal: true,
      },
      {
        id: "decline",
        text: '"Let the board decide without me weighing in."',
        tactic: "Abdication. You're being asked for judgment, not consent.",
        nextSceneId: "kaya-receives-abdication",
        isOptimal: false,
      },
    ],
  },

  // ===================================================================
  // ACT 2A. DEVON
  // ===================================================================

  {
    id: "devon-evaluation",
    backgroundId: "restaurant",
    mood: "tense",
    presentCharacterIds: ["kaya"],
    dialog: [
      {
        speakerId: null,
        text: "You name Devon. Kaya nods once, neutral, not approving. She lets the silence go five seconds longer than it needs to.",
      },
      {
        speakerId: "inner-voice",
        text: "Devon at their desk this morning. Hard problem in front of them, working it. You felt proud watching. The pride is real. The pride is also doing some of the work the judgment should be doing.",
        emotion: "knowing",
      },
      {
        speakerId: "kaya",
        text: '"Devon is good. Devon is also two years into the industry. If you\'re nominating them, you\'re saying they\'re ready for the top job. Are they?"',
        emotion: "serious",
      },
      {
        speakerId: "kaya",
        text: '"And, important, if I take this back to the board, my name goes on the recommendation under yours. So before you commit, ask yourself if you\'re willing to put my last six months of credibility next to that pick."',
        emotion: "serious",
      },
      {
        speakerId: "inner-voice",
        text: "Honest answer: probably no. Saying yes spends your credibility AND hers on loyalty instead of accuracy. She just gave you an exit. Take it or commit fully, there's no third version.",
        emotion: "knowing",
      },
    ],
    choices: [
      {
        id: "revise-devon",
        text: '"You\'re right. Not ready. Let me pick again."',
        tactic: "Catch your own bias. Kaya just gave you an exit, take it.",
        nextSceneId: "the-nomination-redo",
        isOptimal: true,
      },
      {
        id: "commit-devon",
        text: '"I still think Devon."',
        tactic: "Loyalty over judgment. Kaya will stop trusting your future picks.",
        nextSceneId: "kaya-marks-it",
        isOptimal: false,
      },
      {
        id: "devon-plus-timing",
        text: '"Devon, in eighteen months. If the board can wait, I\'d wait."',
        tactic: "Right person, wrong clock. Nominating with a timeline is a different answer than nominating for now.",
        nextSceneId: "the-nomination-redo",
        isOptimal: true,
      },
      {
        id: "name-two-options",
        text: '"Devon is my heart answer. My head answer is different. Which do you want?"',
        tactic: "Show Kaya you know the difference. She'll make you say the head answer out loud; the exercise is the point.",
        nextSceneId: "the-nomination-redo",
        isOptimal: true,
      },
    ],
  },

  // ===================================================================
  // THE NOMINATION, REDO. After catching the Devon bias, Kaya waits.
  // No Devon option this time, the head answer has to land.
  // ===================================================================

  {
    id: "the-nomination-redo",
    backgroundId: "restaurant",
    mood: "tense",
    presentCharacterIds: ["kaya"],
    dialog: [
      {
        speakerId: "kaya",
        text: '"Good. So. Without Devon on the list. The head answer."',
        emotion: "knowing",
      },
      {
        speakerId: "inner-voice",
        text: "She moved past it without ceremony. The exit you took was a real exit, not a punishment, but the next sentence has to be the answer you would have given if loyalty weren't quietly steering.",
        emotion: "knowing",
      },
    ],
    choices: [
      {
        id: "lennox",
        text: "Lennox, the rival-turned-ally. Stronger record publicly, more independent.",
        tactic: "Strategic pick. Lennox's reputation is now independent of yours.",
        nextSceneId: "lennox-evaluation",
        isOptimal: true,
      },
      {
        id: "outside-candidate",
        text: "An outside candidate, someone you respect who you haven't mentored.",
        tactic: "Broadens your network. Shows you can spot talent you didn't create.",
        nextSceneId: "outside-evaluation",
        isOptimal: true,
      },
      {
        id: "decline",
        text: '"Let the board decide without me weighing in."',
        tactic: "Abdication after a recovery. The exit becomes the answer, which costs more here than the first time.",
        nextSceneId: "kaya-receives-abdication",
        isOptimal: false,
      },
    ],
  },

  {
    id: "kaya-marks-it",
    backgroundId: "restaurant",
    mood: "danger",
    presentCharacterIds: ["kaya"],
    dialog: [
      {
        speakerId: null,
        text: "Kaya holds eye contact for three seconds. She doesn't argue. She picks up her wine instead.",
      },
      {
        speakerId: "kaya",
        text: '"Okay. I\'ll bring it forward."',
        emotion: "neutral",
      },
      {
        speakerId: null,
        text: "Her tone hasn't changed. Her eyes have. The quiet calibration of someone updating a model in real time. The dinner moves on. The decision is made. The price will arrive in three months.",
      },
      {
        speakerId: "inner-voice",
        text: "She didn't fight you because she didn't need to. The fight is in the next time she's asked about your judgment and what she'll say about this dinner.",
        emotion: "sad",
      },
    ],
    nextSceneId: "ending-loyalty-over-judgment",
  },

  // ===================================================================
  // ACT 2B. LENNOX (the optimal path)
  // ===================================================================

  {
    id: "lennox-evaluation",
    backgroundId: "restaurant",
    mood: "tense",
    presentCharacterIds: ["kaya"],
    dialog: [
      {
        speakerId: null,
        text: "You name Lennox. Kaya's mouth moves. Almost a smile, suppressed.",
      },
      {
        speakerId: "kaya",
        text: '"Lennox. The one who tried the Maris playbook on you six years ago. You recruited her instead. I remember the lunch you took her to."',
        emotion: "knowing",
      },
      {
        speakerId: "kaya",
        text: '"She\'s strong. She has her own following now. Her quarterly numbers beat yours twice in the last eighteen months. And, she\'s going to outperform you publicly within five years. You\'re nominating her knowing all of that?"',
        emotion: "serious",
      },
      {
        speakerId: "inner-voice",
        text: "Lennox in five years. Her name in the press where yours used to be. The version of you who started this game would have flinched. The version sitting at this table tonight has to decide which version is in the chair.",
        emotion: "knowing",
      },
      {
        speakerId: "inner-voice",
        text: "The real test: can you elevate someone who'll eclipse you? The answer to that question is what this entire role is. Anything less and the seat fits worse than it looks.",
        emotion: "serious",
      },
    ],
    choices: [
      {
        id: "yes-even-so",
        text: '"Yes. Especially knowing that."',
        tactic:
          "The endgame move. You're not optimizing for your own relative ranking.",
        nextSceneId: "kaya-recognises",
        isOptimal: true,
      },
      {
        id: "hesitate",
        text: '"Let me think about it."',
        tactic:
          "You're hesitating because of the eclipse prospect. That hesitation IS the answer and revealing it to Kaya marks you as smaller than the seat.",
        nextSceneId: "kaya-saw-it",
      },
      {
        id: "retract",
        text: '"Actually, let me revise to Devon."',
        tactic: "Ego protection. Everyone will see it.",
        nextSceneId: "kaya-saw-it",
        isOptimal: false,
      },
    ],
  },
  {
    id: "kaya-recognises",
    backgroundId: "restaurant",
    mood: "peaceful",
    presentCharacterIds: ["kaya"],
    immersionTrigger: "victory",
    dialog: [
      {
        speakerId: null,
        text: "Kaya looks at you for a long moment. Long enough that you wonder if you said it wrong.",
      },
      {
        speakerId: "kaya",
        text: '"Good answer."',
        emotion: "knowing",
      },
      {
        speakerId: null,
        text: "Two words. The pause before them was the whole sentence. She raises her glass, not a toast, just a small lift, the kind people do when something has been settled without needing language.",
      },
      {
        speakerId: "inner-voice",
        text: "Eight years ago you were the rival at a rooftop bar. Tonight you're the person who elevated their own replacement. The arc closes here, in a sentence and a quarter-inch of glass lifted three inches off a tablecloth.",
        emotion: "knowing",
      },
    ],
    nextSceneId: "ending-legacy",
  },
  {
    id: "kaya-saw-it",
    backgroundId: "restaurant",
    mood: "tense",
    presentCharacterIds: ["kaya"],
    dialog: [
      {
        speakerId: null,
        text: "Kaya's expression doesn't change. She nods slowly. She finishes the conversation politely, asks about your next quarter, signs the bill.",
      },
      {
        speakerId: null,
        text: "What you don't see: the next morning, in her notes, she writes one line about you and underlines it. The board will read those notes. The notes will follow you for a decade.",
      },
      {
        speakerId: "inner-voice",
        text: "She didn't need you to commit to Lennox. She needed to see whether the eclipse calculation was in you. It is. She just confirmed it. That's the whole answer.",
        emotion: "sad",
      },
    ],
    nextSceneId: "ending-small",
  },

  // ===================================================================
  // ACT 2C. OUTSIDE CANDIDATE
  // ===================================================================

  {
    id: "outside-evaluation",
    backgroundId: "restaurant",
    mood: "tense",
    presentCharacterIds: ["kaya"],
    dialog: [
      {
        speakerId: "kaya",
        text: '"Interesting. Someone not in your orbit. Who?"',
        emotion: "curious",
      },
      {
        speakerId: null,
        text: "Three names move through your head in two seconds. Two have a flaw you can name. One has the case you'd actually defend in a board meeting tomorrow.",
      },
      {
        speakerId: "inner-voice",
        text: "Naming someone outside your mentorship tree shows breadth of judgment. Kaya is testing whether your evaluation is independent of your teaching. She'll know the difference between a name you've been holding and one you're inventing on the spot.",
        emotion: "knowing",
      },
    ],
    choices: [
      {
        id: "specific-name",
        text: "Name someone specific with a concrete reason.",
        tactic: "Prepared, broad, independent. Best signal you can give.",
        nextSceneId: "kaya-engages-name",
        isOptimal: true,
      },
      {
        id: "fumble",
        text: '"I, let me come back with a name next week."',
        tactic:
          "You said the option before thinking it through. Weakens the rest of your input.",
        nextSceneId: "kaya-notes-fumble",
      },
      {
        id: "name-two-with-one-flaw",
        text: 'Name two. "Both serious. Here\'s the flaw in each."',
        tactic: "Show the breadth AND the discernment. Kaya learns more from your framing of weaknesses than from the names themselves.",
        nextSceneId: "kaya-engages-name",
        isOptimal: true,
      },
      {
        id: "ask-her-shortlist",
        text: '"Before I say, who\'s on YOUR shortlist? I\'d like to calibrate."',
        tactic: "Request her read first. Risky, reads as deferential but Kaya respects peers who want to compare models.",
        nextSceneId: "kaya-engages-name",
      },
    ],
  },
  {
    id: "kaya-engages-name",
    backgroundId: "restaurant",
    mood: "professional",
    presentCharacterIds: ["kaya"],
    dialog: [
      {
        speakerId: null,
        text: "You give the name. You give the case in three sentences. You name the one weakness and how it gets covered by the role's existing structure.",
      },
      {
        speakerId: "kaya",
        text: '"Yeah. I see them. I hadn\'t thought of them. Tell me more."',
        emotion: "knowing",
      },
      {
        speakerId: null,
        text: "She actually pulls out a notebook. Hers, leather-bound, half-full. She writes the name down. The dinner shifts, you're no longer the protégé being tested; you're the colleague she's drafting alongside.",
      },
      {
        speakerId: "inner-voice",
        text: "Naming someone she hadn't thought of, with a defensible case, just elevated you in real time. The role is partly already yours from this answer.",
        emotion: "knowing",
      },
    ],
    nextSceneId: "ending-broad-judgment",
  },
  {
    id: "kaya-notes-fumble",
    backgroundId: "restaurant",
    mood: "tense",
    presentCharacterIds: ["kaya"],
    dialog: [
      {
        speakerId: "kaya",
        text: '"Sure. Send it Monday."',
        emotion: "neutral",
      },
      {
        speakerId: null,
        text: "She doesn't push. She doesn't probe. The conversation moves to other things. The 'I'll come back' lands as: didn't have one ready, was performing the option, hadn't done the work.",
      },
      {
        speakerId: "inner-voice",
        text: "At this level the first answer IS the answer. The Monday name will get read against tonight's hesitation, not against the case it actually makes.",
        emotion: "neutral",
      },
    ],
    nextSceneId: "ending-unprepared",
  },

  // ===================================================================
  // ACT 2D. DECLINE
  // ===================================================================

  {
    id: "kaya-receives-abdication",
    backgroundId: "restaurant",
    mood: "danger",
    presentCharacterIds: ["kaya"],
    dialog: [
      {
        speakerId: null,
        text: "Kaya's face stays neutral. She sets her wine down without taking a sip.",
      },
      {
        speakerId: "kaya",
        text: '"Okay."',
        emotion: "neutral",
      },
      {
        speakerId: null,
        text: "One word. The dinner ends ten minutes faster than it should have. She walks you to the door. The hug is a half-second shorter than the one you got six months ago.",
      },
      {
        speakerId: "inner-voice",
        text: "You were asked for judgment, not consent. Refusing to use your influence is still using it, as neglect. Kaya just learned what kind of senior you're going to be. She'll spend the next six months adjusting around the answer.",
        emotion: "sad",
      },
    ],
    nextSceneId: "ending-abdicated",
  },

  // ===================================================================
  // ENDINGS (unchanged from v1)
  // ===================================================================

  {
    id: "ending-legacy",
    backgroundId: "restaurant",
    mood: "peaceful",
    immersionTrigger: "victory",
    isEnding: true,
    outcomeType: "good",
    endingTitle: "The Legacy Move",
    endingSummary:
      "You named Lennox, knowing she'd outperform you within five years. Kaya looked at you for a long moment and nodded. Eight years ago you were the rival at a rooftop bar; today you're the person who elevated your own replacement. Everything compounds: Devon becomes what you were, Lennox becomes what Kaya was, and you become the person whose judgment the industry trusts, because you never optimized for relative ranking. That's the true endgame. You didn't beat the game. You inherited Kaya's seat at it.",
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
      "You named someone you didn't create. Specific reasons, independent evaluation. Kaya respects it, it proves your judgment doesn't only work on people who owe you. In the meeting, that breadth becomes the thing that lands you the role you'd been tracking toward. You didn't win by being loyal. You won by being trusted.",
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
    failureBlogSlug: "empress-endgame-from-victim-to-sovereign",
    failureBlogTitle: "The Empress Endgame: From Victim to Sovereign",
    endingTitle: "Loyalty Over Judgment",
    endingSummary:
      "You nominated Devon. Kaya marked it. Three months later, the board interviewed Devon and passed. The story in the quiet rooms: 'they nominated their own protégé, didn't see the weakness.' Your next nomination will carry the discount. The decade you spent building judgment was spent fast on one loyalty pick.",
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
    failureBlogSlug: "mask-collection-four-personas-sociopaths-wear",
    failureBlogTitle: "Mask Collection: The Four Personas Sociopaths Wear",
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
      "You proposed looking outside without a specific name ready. Kaya's follow-up revealed the proposal was directional, not considered. You get a week to come back with one but the first impression was that you were performing breadth rather than having done the work.",
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
    failureBlogSlug: "dark-triad-personality-types",
    failureBlogTitle: "Dark Triad Personality Types",
    endingTitle: "Abdication",
    endingSummary:
      "You declined to weigh in. Kaya's face stayed neutral but her assessment landed: 'they'll take the role but they won't lead at it.' The nomination happens without you. The person chosen is competent but not who you would have picked. You'll spend five years working for someone you could have chosen better than.",
    dialog: [
      {
        speakerId: "inner-voice",
        text: "Refusing to use your influence is still using it, as neglect.",
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
    "Two years later. Kaya is retiring. Her role, the one above yours, needs a name. She's asking you to propose one over dinner. The name you give reveals who you've become. The game that started at a gala eight years ago ends in a single sentence tonight.",
  tier: "vip",
  level: 10,
  order: 2,
  estimatedMinutes: 9,
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
    "Reading the silence after your answer as the real evaluation",
  ],
  redFlagsTaught: [
    "Protégé nepotism disguised as loyalty",
    "Hesitation as revealed calculation",
    "Abdication as 'humility'",
    "Broad picks without prepared specifics",
    "Optimising for your own relative ranking at the senior tier",
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
