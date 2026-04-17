/**
 * Mission 8-1 — "The Golden Child"
 *
 * Level 8, order 1. Narcissistic family dynamics. Your mother runs
 * the classic scapegoat-vs-golden-child split. Sunday dinner has
 * been this shape for twenty years. Today it will or won't be again.
 */

import type { Scenario, Scene } from "../types";
import { THE_MOTHER, GOLDEN_SIBLING, INNER_VOICE } from "../characters";

const scenes: Scene[] = [
  {
    id: "sunday-dinner",
    backgroundId: "apartment",
    mood: "tense",
    presentCharacterIds: ["mother", "sibling"],
    dialog: [
      {
        speakerId: null,
        text: "Sunday, 6:03pm. Your mother's dining room. Ren is setting the table — Mom's recipe, Mom's china, Mom's approval in every gesture.",
      },
      {
        speakerId: "mother",
        text: "\"Ren, you outdid yourself. This is why they keep inviting you everywhere.\"",
        emotion: "happy",
      },
      {
        speakerId: "inner-voice",
        text: "You've sat at this table for twenty-nine years. The seating chart is the pattern: gold child, mother, scapegoat.",
        emotion: "knowing",
      },
    ],
    choices: [
      {
        id: "compliment-ren",
        text: "\"This looks great, Ren.\"",
        tactic: "Confirm the golden child sincerely. Refuse triangulation.",
        nextSceneId: "mother-pivots",
        isOptimal: true,
      },
      {
        id: "silent",
        text: "Nod, sit down, wait.",
        tactic: "Neither feed the machine nor start a fight. Neutral.",
        nextSceneId: "mother-pivots",
      },
      {
        id: "match-her-compliment",
        text: "\"And I brought wine.\"",
        tactic: "Make your contribution visible, competing for her attention.",
        nextSceneId: "mother-dismisses-gift",
        isOptimal: false,
      },
      {
        id: "preempt",
        text: '"Mom — before we start. Are we doing the comparison thing today or not?"',
        tactic: "Name the pattern before it runs. High risk, high clarity.",
        nextSceneId: "mother-deflects",
        isOptimal: true,
      },
    ],
  },

  {
    id: "mother-pivots",
    backgroundId: "apartment",
    mood: "tense",
    presentCharacterIds: ["mother", "sibling"],
    dialog: [
      {
        speakerId: "mother",
        text: "\"So. How's work? Still doing... the pricing thing?\"",
        emotion: "neutral",
      },
      {
        speakerId: "inner-voice",
        text: "'The pricing thing.' She knows the actual name. Naming it vaguely is the diminishment.",
        emotion: "knowing",
      },
      {
        speakerId: "mother",
        text: "\"Ren just got promoted again, did you hear? Third time in two years.\"",
        emotion: "happy",
      },
    ],
    choices: [
      {
        id: "compete",
        text: "\"I actually just led a major project that —\"",
        tactic: "Competing for her approval on her terms. She won't award it.",
        nextSceneId: "mother-dismisses-work",
        isOptimal: false,
      },
      {
        id: "congratulate-ren",
        text: "\"That's great, Ren. Tell me about the role.\"",
        tactic: "Redirect to Ren. Don't be triangulated into competition.",
        nextSceneId: "ren-responds",
        isOptimal: true,
      },
      {
        id: "gentle-no",
        text: '"Work\'s good. Let\'s not do the Ren-and-me thing tonight."',
        tactic: "Name the pattern without blowing up the dinner. Middle-ground move.",
        nextSceneId: "mother-wounded",
        isOptimal: true,
      },
      {
        id: "disengage",
        text: "\"Pass the salad.\"",
        tactic: "Grey rock. Refuses both the triangulation and the fight.",
        nextSceneId: "mother-escalates-neutral",
        isOptimal: true,
      },
    ],
  },

  {
    id: "mother-dismisses-gift",
    backgroundId: "apartment",
    mood: "tense",
    presentCharacterIds: ["mother"],
    dialog: [
      {
        speakerId: "mother",
        text: '"Oh, you know I don\'t really drink. Ren, can you put it in the pantry?"',
        emotion: "neutral",
      },
      {
        speakerId: "inner-voice",
        text: "Your gift, deflected to Ren within ten seconds. Classic minimization.",
        emotion: "concerned",
      },
    ],
    nextSceneId: "mother-pivots",
  },

  {
    id: "mother-deflects",
    backgroundId: "apartment",
    mood: "tense",
    presentCharacterIds: ["mother", "sibling"],
    dialog: [
      {
        speakerId: "mother",
        text: '"What comparison thing? I don\'t know what you\'re talking about. Can we just have a nice dinner?"',
        emotion: "confused",
      },
      {
        speakerId: "inner-voice",
        text: "Denial of the pattern while performing it in real time. Ren is watching.",
        emotion: "knowing",
      },
    ],
    choices: [
      {
        id: "drop-it",
        text: "\"Sure.\"",
        tactic: "Tactical retreat after planting the flag. She knows you see it.",
        nextSceneId: "mother-behaves-briefly",
        isOptimal: true,
      },
      {
        id: "push-it",
        text: "\"The 'Ren just got promoted' while asking about 'the pricing thing.' That one.\"",
        tactic: "Specific, undeniable. She'll escalate or retreat.",
        nextSceneId: "mother-escalates-wounded",
      },
    ],
  },

  {
    id: "mother-dismisses-work",
    backgroundId: "apartment",
    mood: "danger",
    presentCharacterIds: ["mother"],
    dialog: [
      {
        speakerId: "mother",
        text: "\"Oh, that's nice. Ren — what was your new title again?\"",
        emotion: "neutral",
      },
      {
        speakerId: "inner-voice",
        text: "She cut you off mid-sentence. You just auditioned for her attention and lost.",
        emotion: "sad",
      },
    ],
    nextSceneId: "ending-audition-lost",
  },

  {
    id: "ren-responds",
    backgroundId: "apartment",
    mood: "tense",
    presentCharacterIds: ["sibling"],
    dialog: [
      {
        speakerId: "sibling",
        text: "\"It's... more of the same. Honestly I don't want to talk about work tonight.\"",
        emotion: "neutral",
      },
      {
        speakerId: "inner-voice",
        text: "Interesting. Ren might be as tired of the setup as you are. They didn't ask for the gold role.",
        emotion: "knowing",
      },
    ],
    nextSceneId: "mother-pushes-ren",
  },

  {
    id: "mother-pushes-ren",
    backgroundId: "apartment",
    mood: "tense",
    presentCharacterIds: ["mother", "sibling"],
    dialog: [
      {
        speakerId: "mother",
        text: "\"Oh nonsense. Tell your sibling about the promotion. You earned it.\"",
        emotion: "happy",
      },
      {
        speakerId: "sibling",
        text: "\"Mom. I said I don't want to.\"",
        emotion: "serious",
      },
      {
        speakerId: "inner-voice",
        text: "Ren just held a boundary. For them, not for you. This is new.",
        emotion: "knowing",
      },
    ],
    choices: [
      {
        id: "back-ren",
        text: "\"Let's talk about something else.\"",
        tactic: "Support your sibling without performing it. Shift the room.",
        nextSceneId: "mother-isolated",
        isOptimal: true,
      },
      {
        id: "private-moment",
        text: "\"Ren, thank you.\" (Quiet, between you.)",
        tactic: "Acknowledge the solidarity without making Mom the antagonist in public.",
        nextSceneId: "mother-isolated",
        isOptimal: true,
      },
      {
        id: "weaponize",
        text: "\"See Mom, even Ren doesn't want to play this game anymore.\"",
        tactic: "You just used your sibling as a club. They'll pull back.",
        nextSceneId: "ending-ren-retreats",
        isOptimal: false,
      },
    ],
  },

  {
    id: "mother-wounded",
    backgroundId: "apartment",
    mood: "danger",
    presentCharacterIds: ["mother"],
    dialog: [
      {
        speakerId: "mother",
        text: "\"The Ren-and-you thing? I have no idea what you mean. I asked you a question about your WORK.\"",
        emotion: "angry",
      },
      {
        speakerId: "mother",
        text: '"I don\'t know why every time you come over it has to be a performance of your grievances."',
        emotion: "sad",
      },
      {
        speakerId: "inner-voice",
        text: "DARVO at the family dinner table. Deny (no pattern), Attack (you're making it a performance), Reverse (she's now the victim of your grievance-airing).",
        emotion: "concerned",
      },
    ],
    choices: [
      {
        id: "stay-calm",
        text: "\"I'll leave it. Sorry I brought it up.\"",
        tactic: "De-escalate to preserve dinner. Note what just happened.",
        nextSceneId: "mother-behaves-briefly",
        isOptimal: true,
      },
      {
        id: "hold-ground",
        text: "\"I said one sentence. Notice how you responded to it.\"",
        tactic: "Mirror the escalation back to her. High risk, high clarity.",
        nextSceneId: "mother-storms",
      },
      {
        id: "apologize",
        text: "\"I'm sorry, I shouldn't have said anything.\"",
        tactic: "Apologizing for naming her pattern reinforces her frame.",
        nextSceneId: "ending-apology-retrained",
        isOptimal: false,
      },
      {
        id: "leave",
        text: "Stand up. \"I'm going to head out. Ren, I'll call you.\"",
        tactic: "End the scene before it metastasizes. Take Ren with you, emotionally.",
        nextSceneId: "ending-left-cleanly",
      },
    ],
  },

  {
    id: "mother-escalates-wounded",
    backgroundId: "apartment",
    mood: "danger",
    presentCharacterIds: ["mother"],
    dialog: [
      {
        speakerId: "mother",
        text: "\"You always do this. Every holiday. You come into MY house and attack me.\"",
        emotion: "angry",
      },
      {
        speakerId: "inner-voice",
        text: "'Always' and 'attack' — both lies, both designed to recruit Ren to her side. The crying comes next.",
        emotion: "concerned",
      },
    ],
    nextSceneId: "mother-storms",
  },

  {
    id: "mother-storms",
    backgroundId: "apartment",
    mood: "danger",
    shakeOnEntry: "shock",
    presentCharacterIds: ["mother", "sibling"],
    dialog: [
      {
        speakerId: null,
        text: "Her eyes are wet. Her voice shakes in a practiced way. She stands up from the table.",
      },
      {
        speakerId: "mother",
        text: '"I don\'t have to take this in my own home."',
        emotion: "sad",
      },
      {
        speakerId: "inner-voice",
        text: "Fleeing the table instead of continuing a conversation she can't win. You've watched this exact exit for twenty years.",
        emotion: "knowing",
      },
    ],
    choices: [
      {
        id: "chase-her",
        text: "Get up. Follow her. Try to fix it.",
        tactic: "You just agreed to carry her emotion. That's the pattern.",
        nextSceneId: "ending-reinstalled",
        isOptimal: false,
      },
      {
        id: "stay-seated",
        text: "Stay at the table with Ren. Don't chase.",
        tactic: "Refuse the role of family rescuer. Let the performance have no audience.",
        nextSceneId: "ending-you-and-ren",
        isOptimal: true,
      },
      {
        id: "leave-too",
        text: "\"Ren, I'm going too. Come if you want.\"",
        tactic: "Clean double-exit. Both of you out of the scene she wrote.",
        nextSceneId: "ending-both-exit",
        isOptimal: true,
      },
    ],
  },

  {
    id: "mother-behaves-briefly",
    backgroundId: "apartment",
    mood: "peaceful",
    presentCharacterIds: ["mother", "sibling"],
    dialog: [
      {
        speakerId: null,
        text: "Dinner resumes. She's briefly normal. Nobody mentions what just happened.",
      },
      {
        speakerId: "inner-voice",
        text: "She noticed you named it. Tonight she'll be better. Next Sunday she'll test whether you still see.",
        emotion: "knowing",
      },
    ],
    nextSceneId: "ending-flag-planted",
  },

  {
    id: "mother-isolated",
    backgroundId: "apartment",
    mood: "peaceful",
    presentCharacterIds: ["mother", "sibling"],
    dialog: [
      {
        speakerId: null,
        text: "The triangulation engine needs two children to run. Tonight, both of her children refused.",
      },
      {
        speakerId: null,
        text: "Mom talks about the neighbor's landscaping for fifteen minutes. Nobody pushes back. Nobody needs to.",
      },
      {
        speakerId: "inner-voice",
        text: "The quietest victory: the machine couldn't find a foothold.",
        emotion: "knowing",
      },
    ],
    nextSceneId: "ending-engine-stalled",
  },

  {
    id: "mother-escalates-neutral",
    backgroundId: "apartment",
    mood: "tense",
    presentCharacterIds: ["mother"],
    dialog: [
      {
        speakerId: "mother",
        text: "\"You're being so quiet tonight. Are you okay? Is something going on at work?\"",
        emotion: "concerned",
      },
      {
        speakerId: "inner-voice",
        text: "Grey-rock neutralized the triangulation. Now she's pivoting to 'concerned' to re-engage. Same game, warmer costume.",
        emotion: "knowing",
      },
    ],
    choices: [
      {
        id: "hold-grey-rock",
        text: "\"Just tired. Dinner's good.\"",
        tactic: "Stay boring. Deny all material.",
        nextSceneId: "ending-grey-rock-held",
        isOptimal: true,
      },
      {
        id: "spill",
        text: "\"Actually, work has been rough. Marcus has been...\"",
        tactic: "You just gave her material. She'll mine it for ammunition.",
        nextSceneId: "ending-gave-material",
        isOptimal: false,
      },
    ],
  },

  // ---------------------------------------------------------------------
  // ENDINGS
  // ---------------------------------------------------------------------

  {
    id: "ending-engine-stalled",
    backgroundId: "apartment",
    mood: "peaceful",
    isEnding: true,
    outcomeType: "good",
    endingTitle: "The Engine Stalled",
    endingSummary:
      "Triangulation needs two participants. Tonight, both children refused. She had no tools — so she talked about landscaping. No fight, no performance, no tears. You and Ren exchanged one look on the way out. That's the start of something you never had.",
    dialog: [
      {
        speakerId: "inner-voice",
        text: "Narcissistic family systems run on your participation. Your withdrawal is the dismantling.",
        emotion: "knowing",
      },
    ],
  },

  {
    id: "ending-flag-planted",
    backgroundId: "apartment",
    mood: "peaceful",
    isEnding: true,
    outcomeType: "good",
    endingTitle: "The Flag Planted",
    endingSummary:
      "You named it. She denied it. Dinner resumed, technically peaceful. But she knows you see. The comparison game won't stop, but it'll become obvious to her when she runs it — and obvious behavior is contestable behavior. You planted a flag. The ground it's planted in is yours now.",
    dialog: [
      {
        speakerId: "inner-voice",
        text: "You don't have to win the fight. You have to make the pattern visible to the person running it.",
        emotion: "knowing",
      },
    ],
  },

  {
    id: "ending-you-and-ren",
    backgroundId: "apartment",
    mood: "peaceful",
    isEnding: true,
    outcomeType: "good",
    endingTitle: "You and Ren",
    endingSummary:
      "Mom stormed out of her own dining room. You stayed at the table with Ren. Dessert, honest conversation, no performance. Your sibling said, quietly: 'she's been doing this to both of us.' That's the sentence that ends the golden-child / scapegoat split, twenty-nine years late.",
    dialog: [
      {
        speakerId: "inner-voice",
        text: "The golden child and the scapegoat have always been on the same side. The system works by keeping them convinced otherwise.",
        emotion: "knowing",
      },
    ],
  },

  {
    id: "ending-both-exit",
    backgroundId: "apartment",
    mood: "peaceful",
    isEnding: true,
    outcomeType: "good",
    endingTitle: "Both Exited",
    endingSummary:
      "You walked out. Ren came with you. You had coffee at a diner for two hours — the first real conversation you've had as siblings without Mom's scripts running in the background. The dinner she created to maintain the family hierarchy ended empty, with her alone with her performance.",
    dialog: [
      {
        speakerId: "inner-voice",
        text: "The audience is the system's power source. Leaving together is a system change.",
        emotion: "knowing",
      },
    ],
  },

  {
    id: "ending-grey-rock-held",
    backgroundId: "apartment",
    mood: "peaceful",
    isEnding: true,
    outcomeType: "good",
    endingTitle: "Grey Rock Held",
    endingSummary:
      "You gave her nothing. No material, no performance, no fight. She tried the 'concerned' version, the 'hurt' version, the 'neighbor's landscaping' version. You ate, you helped clear, you left. She has nothing to work with this week. Next week it'll be harder for her. Then easier for you.",
    dialog: [
      {
        speakerId: "inner-voice",
        text: "Boredom is a boundary.",
        emotion: "knowing",
      },
    ],
  },

  {
    id: "ending-left-cleanly",
    backgroundId: "apartment",
    mood: "peaceful",
    isEnding: true,
    outcomeType: "good",
    endingTitle: "Clean Exit",
    endingSummary:
      "You left after one sentence. She'll tell the extended family you 'attacked her and stormed out.' The story will reach people you love. Some will believe it. The ones who matter will check with you. The cost of leaving is lower than the cost of staying.",
    dialog: [
      {
        speakerId: "inner-voice",
        text: "The smear that follows is part of the price. Pay it.",
        emotion: "knowing",
      },
    ],
  },

  {
    id: "ending-audition-lost",
    backgroundId: "apartment",
    mood: "danger",
    isEnding: true,
    outcomeType: "bad",
    endingTitle: "You Auditioned. You Lost.",
    endingSummary:
      "You competed for her approval on her terms. She cut you off mid-sentence to redirect to Ren. The exact script that's played for twenty-nine years, played again, by you choosing to be in it. The pain isn't new; your willingness to feel it again is.",
    dialog: [
      {
        speakerId: "inner-voice",
        text: "You cannot win an approval contest against someone who rigged the judging.",
        emotion: "sad",
      },
    ],
  },

  {
    id: "ending-apology-retrained",
    backgroundId: "apartment",
    mood: "danger",
    isEnding: true,
    outcomeType: "bad",
    endingTitle: "Retrained",
    endingSummary:
      "You named the pattern and then apologized for naming it. She just taught you — again — that observing her behavior is the crime, not performing it. Next Sunday she'll run the same script, and you'll stay quieter. By next year you'll be apologizing for being present in the room.",
    dialog: [
      {
        speakerId: "inner-voice",
        text: "Apologizing for accurate observation is the reinforcement schedule of narcissistic training.",
        emotion: "sad",
      },
    ],
  },

  {
    id: "ending-reinstalled",
    backgroundId: "apartment",
    mood: "danger",
    isEnding: true,
    outcomeType: "bad",
    endingTitle: "Reinstalled",
    endingSummary:
      "You chased her down the hall. Comforted her. Apologized. She accepted, in a fragile voice, and came back to finish dinner. The pattern is now stronger: next time she feels challenged, she'll storm out faster, because she's seen it works. You're back in your assigned seat.",
    dialog: [
      {
        speakerId: "inner-voice",
        text: "Rescuing the performance is the purchase order for more performances.",
        emotion: "sad",
      },
    ],
  },

  {
    id: "ending-gave-material",
    backgroundId: "apartment",
    mood: "danger",
    isEnding: true,
    outcomeType: "bad",
    endingTitle: "Material Handed Over",
    endingSummary:
      "You gave her the work-stress story. By Wednesday it's 'they're struggling at work' in calls to the extended family. By Friday it's 'they've been so fragile lately.' The sympathy she performs is the cover she uses to reframe you. You handed her the narrative, warm.",
    dialog: [
      {
        speakerId: "inner-voice",
        text: "Family narcissists are biographers you didn't hire. Don't give them new chapters.",
        emotion: "sad",
      },
    ],
  },

  {
    id: "ending-ren-retreats",
    backgroundId: "apartment",
    mood: "danger",
    isEnding: true,
    outcomeType: "bad",
    endingTitle: "You Weaponized Ren",
    endingSummary:
      "Ren held a boundary for themselves. You used it as a club against your mother. Ren pulled back — they don't want to be recruited into your war. Next Sunday they'll side with Mom just to not be your weapon. You isolated yourself by treating an ally as ammunition.",
    dialog: [
      {
        speakerId: "inner-voice",
        text: "Allies are not inventory. Treat them like you want them to stay.",
        emotion: "sad",
      },
    ],
  },
];

export const mission81: Scenario = {
  id: "mission-8-1",
  title: "The Golden Child",
  tagline: "The hierarchy runs on your participation.",
  description:
    "Sunday dinner. Your mother, your sibling Ren, the table you've sat at for twenty-nine years. Golden child. Scapegoat. A comparison rolled in the first two minutes. The machine only works if both children play their parts — tonight, one of you has to refuse.",
  tier: "premium",
  level: 8,
  order: 1,
  estimatedMinutes: 11,
  difficulty: "advanced",
  category: "narcissist",
  xpReward: 325,
  badgeId: "triangulation-refused",
  startSceneId: "sunday-dinner",
  tacticsLearned: [
    "Confirming the golden child sincerely (refuse triangulation)",
    "Grey rock at the family dinner table",
    "Naming the pattern mid-performance",
    "Refusing to rescue the storm-out",
    "Siblings as potential allies, not ammunition",
  ],
  redFlagsTaught: [
    "DARVO at the family level",
    "'Concerned' pivot after grey-rock",
    "Tears as script, not emotion",
    "Golden child as triangulation tool (not antagonist)",
  ],
  reward: {
    id: "triangulation-refused",
    name: "Triangulation Refused",
    description: "Twenty-nine-year-old script, broken in a single dinner.",
    unlocksScenarioId: "mission-8-2",
  },
  prerequisites: ["mission-7-2"],
  characters: [THE_MOTHER, GOLDEN_SIBLING, INNER_VOICE],
  scenes,
};

export default mission81;
