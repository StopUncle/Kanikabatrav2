/**
 * Mission 6-1 — "The Credit Thief"
 *
 * Level 6, order 1. Workplace political scenario: your director
 * presents your work as a team effort (coded: his), in front of
 * the CEO. You have 10 seconds to decide how to respond.
 */

import type { Scenario, Scene } from "../types";
import { MARCUS, SAGE, KAYA, INNER_VOICE } from "../characters";

const scenes: Scene[] = [
  {
    id: "meeting-opens",
    backgroundId: "office",
    mood: "professional",
    presentCharacterIds: ["marcus", "sage", "kaya"],
    dialog: [
      {
        speakerId: null,
        text: "Quarterly review. Twelve people around the table. The CEO at the head. Marcus opens the slide deck — your slide deck.",
      },
      {
        speakerId: "marcus",
        text: '"So the team built out a new pricing model this quarter. I\'ll walk us through it."',
        emotion: "neutral",
      },
      {
        speakerId: "inner-voice",
        text: '"The team" = him. You know how this ends. He\'ll say "we" through the slides and "I" in the Q&A.',
        emotion: "concerned",
      },
    ],
    choices: [
      {
        id: "interrupt-immediately",
        text: '"Quick note — I actually built that model. Happy to walk through it."',
        tactic: "Correct attribution before the frame sets. Risky but direct.",
        nextSceneId: "marcus-reacts",
        isOptimal: true,
      },
      {
        id: "silent-for-now",
        text: "Let him present. Speak only if a specific technical question comes up.",
        tactic: "Preserve the ambush opportunity. Emerge as the expert when needed.",
        nextSceneId: "technical-question",
        isOptimal: true,
      },
      {
        id: "raise-your-hand",
        text: "Raise a hand. Wait until he finishes. Then clarify ownership.",
        tactic: "Late clarification is a complaint, not a correction.",
        nextSceneId: "marcus-dismisses",
      },
      {
        id: "say-nothing",
        text: "Say nothing. Complain to HR later.",
        tactic: "HR sides with the company, not you. You just lost credit permanently.",
        nextSceneId: "ending-credit-lost",
        isOptimal: false,
      },
    ],
  },

  {
    id: "marcus-reacts",
    backgroundId: "office",
    mood: "tense",
    presentCharacterIds: ["marcus", "kaya"],
    dialog: [
      {
        speakerId: "marcus",
        text: '"Sure — team effort obviously, but yeah, go ahead."',
        emotion: "smirking",
      },
      {
        speakerId: "inner-voice",
        text: "He just subtly re-framed 'you built it' to 'team effort'. Watch how you handle the handoff.",
        emotion: "knowing",
      },
    ],
    choices: [
      {
        id: "accept-team-frame",
        text: "\"Thanks.\" Present the model as a team product.",
        tactic: "You accepted the re-frame. Future reviews attribute this to 'the team' — meaning Marcus.",
        nextSceneId: "ending-team-framed",
        isOptimal: false,
      },
      {
        id: "correct-gently",
        text: "\"To clarify — I led the model. Sage ran the data validation.\"",
        tactic: "Name who did what. Gives Sage credit too; cuts Marcus out entirely.",
        nextSceneId: "model-presented",
        isOptimal: true,
      },
      {
        id: "correct-sharply",
        text: "\"It wasn't a team effort. I built it alone.\"",
        tactic: "True but reads hostile. You win this round, lose the relationship with Sage.",
        nextSceneId: "model-presented-harsh",
      },
    ],
  },

  {
    id: "technical-question",
    backgroundId: "office",
    mood: "tense",
    presentCharacterIds: ["marcus"],
    dialog: [
      {
        speakerId: null,
        text: "Slide 7. The CFO asks about the elasticity calculation.",
      },
      {
        speakerId: "marcus",
        text: '"Yeah, that\'s — uh —"',
        emotion: "confused",
      },
      {
        speakerId: "inner-voice",
        text: "He doesn't know. This is the ambush moment. Choose your frame.",
        emotion: "knowing",
      },
    ],
    choices: [
      {
        id: "rescue-him",
        text: '"I can take that one."',
        tactic: "Neutral rescue. You answer, get credit for the knowledge, don\'t attack him.",
        nextSceneId: "cfo-probes",
        isOptimal: true,
      },
      {
        id: "rescue-with-flag",
        text: "\"Happy to — I modeled that piece specifically.\"",
        tactic: "Answer + subtly plant ownership flag. Best of both.",
        nextSceneId: "cfo-probes-knows",
        isOptimal: true,
      },
      {
        id: "let-him-fail",
        text: "Don't volunteer. Let him fumble.",
        tactic: "Satisfying but reads as disloyalty. CEO sees a team not functioning.",
        nextSceneId: "ending-pyrrhic",
        isOptimal: false,
      },
    ],
  },

  {
    id: "marcus-dismisses",
    backgroundId: "office",
    mood: "tense",
    presentCharacterIds: ["marcus"],
    dialog: [
      {
        speakerId: "marcus",
        text: '"We can go into ownership details offline. Don\'t want to slow this down."',
        emotion: "cold",
      },
      {
        speakerId: "inner-voice",
        text: "He shut you down using 'efficiency' as cover. The slide deck moves on. The credit moves with it.",
        emotion: "concerned",
      },
    ],
    nextSceneId: "ending-credit-lost",
  },

  {
    id: "model-presented",
    backgroundId: "office",
    mood: "professional",
    presentCharacterIds: ["marcus", "kaya"],
    dialog: [
      {
        speakerId: null,
        text: "You walk the room through the model. Kaya nods at specific points — she knows exactly which parts you designed.",
      },
      {
        speakerId: "kaya",
        text: '"Clean work. The assumptions on the curve are aggressive — defensible?"',
        emotion: "knowing",
      },
      {
        speakerId: "inner-voice",
        text: "She's handing you a layup. Kaya doesn't ask questions she doesn't already know the answer to.",
        emotion: "knowing",
      },
    ],
    choices: [
      {
        id: "defend-well",
        text: "Walk through the stress-tests you ran.",
        tactic: "Kaya set you up. You're now the expert in the room.",
        nextSceneId: "ending-attribution-won",
        isOptimal: true,
      },
      {
        id: "defer-to-marcus",
        text: "\"Marcus might have better context on that.\"",
        tactic: "You just handed him the credit you'd just taken back. Why?",
        nextSceneId: "ending-credit-lost",
        isOptimal: false,
      },
    ],
  },

  {
    id: "model-presented-harsh",
    backgroundId: "office",
    mood: "tense",
    presentCharacterIds: ["marcus"],
    dialog: [
      {
        speakerId: null,
        text: "The room reads the tension. Marcus's face stays professional; his eyes log it.",
      },
      {
        speakerId: "inner-voice",
        text: "You won the attribution and made an enemy who controls your salary band. Win-adjacent.",
        emotion: "concerned",
      },
    ],
    nextSceneId: "ending-harsh-victory",
  },

  {
    id: "cfo-probes",
    backgroundId: "office",
    mood: "professional",
    dialog: [
      {
        speakerId: null,
        text: "You answer. Then a follow-up. Then two more. By slide 12 you're presenting, not Marcus.",
      },
      {
        speakerId: "inner-voice",
        text: "The room has quietly reassigned who built the model. Marcus didn't lose it. You took it.",
        emotion: "knowing",
      },
    ],
    nextSceneId: "ending-ambush-won",
  },

  {
    id: "cfo-probes-knows",
    backgroundId: "office",
    mood: "professional",
    dialog: [
      {
        speakerId: null,
        text: "CFO nods. \"Good. Let's dig in.\" The next 15 minutes are between him and you.",
      },
      {
        speakerId: null,
        text: "Marcus stops speaking. He's still in the room. He's no longer in the conversation.",
      },
      {
        speakerId: "inner-voice",
        text: "Clean re-attribution. Credit flagged early, defended with expertise, earned in front of the CEO.",
        emotion: "knowing",
      },
    ],
    nextSceneId: "ending-ambush-won",
  },

  // ---------------------------------------------------------------------
  // ENDINGS
  // ---------------------------------------------------------------------

  {
    id: "ending-attribution-won",
    backgroundId: "office",
    mood: "peaceful",
    isEnding: true,
    outcomeType: "good",
    endingTitle: "Credit Reclaimed",
    endingSummary:
      "You corrected the frame early, named Sage's contribution, defended the model in front of the CEO. Kaya made it easy by asking a question she knew the answer to. Marcus walks out of the room less powerful than he walked in. You didn't fight him — you made him irrelevant.",
    dialog: [
      {
        speakerId: "inner-voice",
        text: "The fastest way to beat a credit thief is to make your expertise undeniable in the same room.",
        emotion: "knowing",
      },
    ],
  },

  {
    id: "ending-ambush-won",
    backgroundId: "office",
    mood: "peaceful",
    isEnding: true,
    outcomeType: "good",
    endingTitle: "The Ambush Paid",
    endingSummary:
      "You let him open, then stepped in at the exact moment his bluff collapsed. By the end of the presentation, the CEO was asking you questions directly. Marcus can't reframe this — the room saw who knew the answers.",
    dialog: [
      {
        speakerId: "inner-voice",
        text: "Patience is a weapon. Let them walk onto the stage unprepared.",
        emotion: "knowing",
      },
    ],
  },

  {
    id: "ending-harsh-victory",
    backgroundId: "office",
    mood: "tense",
    isEnding: true,
    outcomeType: "neutral",
    endingTitle: "Victory With Interest",
    endingSummary:
      "You got the credit. You also painted yourself as hostile to your director. He controls your reviews, your promotion, your bonus. You won today. He has twelve months to retaliate. Whether this was worth it depends on how close you were to leaving anyway.",
    dialog: [
      {
        speakerId: "inner-voice",
        text: "Being right is free. Being right in a way that makes a political enemy isn't.",
        emotion: "neutral",
      },
    ],
  },

  {
    id: "ending-credit-lost",
    backgroundId: "office",
    mood: "danger",
    isEnding: true,
    outcomeType: "bad",
    endingTitle: "It's His Model Now",
    endingSummary:
      "By the end of the quarter, 'Marcus's pricing model' is canonical in every follow-up meeting. You built it. Nobody remembers. Next review cycle, your contribution line reads 'supported the pricing initiative.' You're now competing with your own director for your own work.",
    dialog: [
      {
        speakerId: "inner-voice",
        text: "If you don't attribute your work in the room where credit is assigned, someone else will do it for you.",
        emotion: "sad",
      },
    ],
  },

  {
    id: "ending-team-framed",
    backgroundId: "office",
    mood: "tense",
    isEnding: true,
    outcomeType: "bad",
    endingTitle: "'The Team' Took the Win",
    endingSummary:
      "You presented the model — but accepted 'team effort' as the frame. On the quarterly write-up, 'the team' is shorthand for 'Marcus's group'. On LinkedIn, Marcus mentions 'leading the pricing redesign.' By next quarter he's been promoted for it.",
    dialog: [
      {
        speakerId: "inner-voice",
        text: "'Team effort' is the phrase credit-thieves use to legally steal your work.",
        emotion: "sad",
      },
    ],
  },

  {
    id: "ending-pyrrhic",
    backgroundId: "office",
    mood: "danger",
    isEnding: true,
    outcomeType: "bad",
    endingTitle: "You Won By Disloyalty",
    endingSummary:
      "You let Marcus fumble. The CEO noticed — and saw the whole team look dysfunctional, including you. The CEO's takeaway: 'That group doesn't run cohesively.' Your director will remember your silence as sabotage, even if nobody else does.",
    dialog: [
      {
        speakerId: "inner-voice",
        text: "Loyalty is also leverage. Withholding it strategically only works when nobody notices you withheld.",
        emotion: "sad",
      },
    ],
  },
];

export const mission61: Scenario = {
  id: "mission-6-1",
  title: "The Credit Thief",
  tagline: "He's about to present your work as his.",
  description:
    "Quarterly review. The CEO is watching. Marcus opens the deck you built and says 'the team pulled this together.' You have ten seconds to decide whether to correct him now, ambush him on a technical question, or lose the work permanently.",
  tier: "premium",
  level: 6,
  order: 1,
  estimatedMinutes: 10,
  difficulty: "advanced",
  category: "professional",
  xpReward: 275,
  badgeId: "credit-reclaimed",
  startSceneId: "meeting-opens",
  tacticsLearned: [
    "Early attribution before the frame sets",
    "Technical ambush — let them open, then step in",
    "Naming collaborators to neutralize 'team effort' re-frames",
    "Using senior allies (Kaya) as setup artists",
  ],
  redFlagsTaught: [
    "'Team effort' as attribution-theft vocabulary",
    "Directors who say 'we' for wins and your name for losses",
    "HR as a credit-recovery mechanism (it isn't)",
    "Quiet coworkers who take notes and know whose ideas those notes become",
  ],
  reward: {
    id: "credit-reclaimed",
    name: "Credit Reclaimed",
    description: "You made the room reassign the work to the person who did it.",
    unlocksScenarioId: "mission-6-2",
  },
  prerequisites: ["mission-5-2"],
  characters: [MARCUS, SAGE, KAYA, INNER_VOICE],
  scenes,
};

export default mission61;
