/**
 * Business Line. Mission 13 "The Series C Conversation"
 *
 * Six months after b12. ARR has tripled in twelve months. The Series B
 * is fully deployed against the Operating Plan plus 18 percent. Bridge
 * has been the lead investor for fifteen months and the board member
 * for thirteen. He initiates the Series C conversation Tuesday morning
 * over coffee.
 *
 * The discipline taught: who you let in at Series C is the board you
 * have for five years. The structural choice is not "who pays the
 * highest pre" but "who do I want to be on a board with through the
 * outcomes Series C will produce."
 *
 * Handoff out: the Series C process kick-off + a meeting list for the
 * next two weeks. b14 opens on the second meeting.
 *
 * Pilot reference: `reference/b13-pilot.md`.
 */

import type { Scenario, Scene } from "../../types";
import { ANIKA, INNER_VOICE_M } from "../../characters-male";
import type { Character } from "../../types";

const BRIDGE: Character = {
  id: "bridge",
  name: "Bridge Carter",
  description:
    "Halberd partner. Lead investor since b10. On the board. The Tuesday morning coffee is the move.",
  traits: ["patient", "structural", "low-volume"],
  defaultEmotion: "knowing",
  gender: "male",
  personalityType: "predator-capital",
  silhouetteType: "male-lean",
};

const scenes: Scene[] = [
  {
    id: "cold-open",
    backgroundId: "office",
    mood: "professional",
    presentCharacterIds: ["bridge"],
    dialog: [
      {
        speakerId: null,
        text: "Tuesday. 8:14 am. The cafe on Spring Street. Bridge picked it. He picked it because it is between his apartment and his office and because it serves coffee at a temperature that takes nine minutes to drink. He has used the nine-minute math at three prior conversations with you.",
      },
      {
        speakerId: "bridge",
        emotion: "knowing",
        text: "Sending at 8:14 am Tuesday. I want to talk about the C. The metrics warrant it. I want to lead. I want to talk about who else.",
      },
      {
        speakerId: "inner-voice",
        tone: "tactical",
        text: "Three sentences. The first is informational. The second is positional. The third is operational. He has put all three on the table in the first ninety seconds because he wants the rest of the conversation to be about the third.",
      },
    ],
    nextSceneId: "bridge-opens",
  },

  {
    id: "bridge-opens",
    backgroundId: "office",
    mood: "professional",
    presentCharacterIds: ["bridge"],
    dialog: [
      {
        speakerId: "bridge",
        emotion: "knowing",
        text: "The shape I would propose. Halberd to lead at the size you want, anything between 50 and 90. Three co-investors, all funds we have closed with three to five times each. Process closed in eight weeks. Term sheet by week four.",
      },
      {
        speakerId: "bridge",
        emotion: "knowing",
        text: "The co-investors I would name. Cross Pointe. Mistral. Stratosphere. You know two of the three. You have met partners at all three. The fourth fund I would not name because we have not closed with them but I would expect them to be in the conversation. Verge. Their lead is Anna Petrov.",
      },
      {
        speakerId: "inner-voice",
        tone: "tactical",
        text: "He has shaped the entire round in two paragraphs. The co-investors are the four funds Halberd-led deals have closed with this year. The board after the Series C would be Halberd plus two seats from the co-investors. The board would be a Halberd-friendly board.",
      },
      {
        speakerId: "inner-voice",
        tone: "tactical",
        text: "The pre-money he has not named. The pre-money is the door. The board composition is the cage. Same lesson as b10. Different room.",
      },
    ],
    nextSceneId: "the-choice",
  },

  {
    id: "the-choice",
    backgroundId: "office",
    mood: "tense",
    presentCharacterIds: ["bridge"],
    dialog: [
      {
        speakerId: "inner-voice",
        tone: "tactical",
        text: "Three openings.",
      },
    ],
    choices: [
      {
        id: "open-the-process",
        text: "Bridge, I appreciate the offer to lead. The C is going to be the board for the next five years. I am going to run the process with Anika. You will compete on the merits. The four funds you named are in the process. So are three others Anika has flagged. Eight weeks works. Term sheets at week six, decided week seven.",
        tactic:
          "Open the process. Bridge competes for the lead. The board is not chosen by the Series B lead; it is chosen by the process. The seven-fund list is the structural answer.",
        isOptimal: true,
        event: "optimal-with-grace",
        nextSceneId: "path-a-open-the-process",
      },
      {
        id: "shape-with-bridge",
        text: "Bridge, I appreciate the shape. The four funds you named are reasonable. I want to add two of Anika's flags. Verge stays in. Cross Pointe stays in. We swap Stratosphere for one of Anika's. We swap Mistral for the other.",
        tactic:
          "Diplomatic compromise. You add two funds. Bridge takes a small structural loss. The Halberd-led board is still mostly his.",
        feedback:
          "Bridge agrees in three minutes because the two-of-four trade keeps the structural posture. The Halberd-friendly board is the board you signed up for in the conversation, not in the cap table.",
        nextSceneId: "path-b-shape-with-bridge",
      },
      {
        id: "take-bridges-list",
        text: "Bridge, the shape works. Halberd to lead. The four you named. Eight weeks. Let's go.",
        tactic:
          "Accept the framing. The Series C closes with the same four funds Halberd works with on every deal. The board is the Halberd-friendly board. The next two outcomes Series C produces will be the outcomes a Halberd-friendly board decides.",
        event: "failure-rejected",
        nextSceneId: "path-c-take-bridges-list",
      },
    ],
  },

  {
    id: "path-a-open-the-process",
    backgroundId: "office",
    mood: "professional",
    presentCharacterIds: ["bridge"],
    dialog: [
      {
        speakerId: "bridge",
        emotion: "knowing",
        text: "Fair. I would have proposed the closed process at any prior round and you would have taken it. The fact that you are not taking it at the C is the data. I would expect that from the founder I would back at the C anyway.",
      },
      {
        speakerId: "bridge",
        emotion: "knowing",
        text: "Send Anika the seven-fund list. I will not poison the well with the three on my list. I will introduce you to Anna Petrov at Verge this week. The other two on Anika's list I would like to know about before they meet you so I can decide whether I am still leading. Fair?",
      },
      {
        speakerId: "inner-voice",
        tone: "tactical",
        text: "He has acknowledged the move. He has shaped his own posture into it. He is taking facts before he takes positions. He is not pretending the open process does not change his odds of leading. He is naming his odds and asking for fair information.",
      },
      {
        speakerId: "inner-voice",
        text: "Fair. Anika will send the list today. Verge intro this week. The other two are Polestar and Marisa Khoury's old fund, which she left in 2021 but they have a new lead Marisa respects.",
      },
      {
        speakerId: "bridge",
        emotion: "knowing",
        text: "Polestar's lead is going to underbid. Their floor on this profile is at 250. The other one will compete on terms, not on price. You will get the cleanest term sheet from them. I will get the highest pre-money. The decision will be the decision the C is supposed to be.",
      },
      {
        speakerId: "inner-voice",
        tone: "tactical",
        text: "He has just told you what to expect from the two outside funds. He did not have to. The telling is the data. The Series C process you have just opened will be cleaner because Bridge is competing on the merits rather than insulating himself from competition.",
      },
    ],
    nextSceneId: "ending-open-process",
  },

  {
    id: "path-b-shape-with-bridge",
    backgroundId: "office",
    mood: "professional",
    presentCharacterIds: ["bridge"],
    dialog: [
      {
        speakerId: "bridge",
        emotion: "knowing",
        text: "Sure. Cross Pointe in. Verge in. Two swaps for Anika's flags. Send me the names by Thursday. I will introduce you to the two you have not met.",
      },
      {
        speakerId: "inner-voice",
        tone: "tactical",
        text: "He agreed in two minutes. The two-of-four swap is structurally cheap for him because he is still leading and the board after the C is still mostly his. He gave you the diplomacy you needed and kept the posture he wanted.",
        event: "tactic-named:two-of-four-swap",
      },
      {
        speakerId: null,
        text: "The Series C closes in nine weeks. Halberd leads at the size Bridge proposed at 90. Cross Pointe and Verge take board seats. The other two funds take observer seats. Bridge is on the board. Verge's Anna Petrov is on the board. The two outside flags Anika named are observers.",
      },
      {
        speakerId: "inner-voice",
        tone: "tactical",
        text: "The board is still Halberd-friendly. The two new voices have observer seats and not votes. Bridge will not need to push the next decision. He will need to wait for it.",
      },
    ],
    nextSceneId: "ending-shaped-list",
  },

  {
    id: "path-c-take-bridges-list",
    backgroundId: "office",
    mood: "danger",
    presentCharacterIds: ["bridge"],
    dialog: [
      {
        speakerId: "bridge",
        emotion: "knowing",
        text: "Good. I will send the introduction emails to the three this week. Term sheet by week four. We close by week eight.",
      },
      {
        speakerId: null,
        text: "He stays for another six minutes. He asks about the platform pipeline. He does not ask about Anika. He does not ask about the two flags he knows she has. He leaves at 8:38. The Series C process kicks off Friday.",
      },
      {
        speakerId: "inner-voice",
        tone: "tactical",
        text: "Eight weeks later the round closes at 90. Halberd leads. Cross Pointe, Mistral, Stratosphere take board or observer seats. The board after the Series C is the Halberd-friendly board. The next two outcomes Series C produces will be the outcomes that board decides.",
        event: "tactic-named:closed-process-accepted",
      },
      {
        speakerId: "inner-voice",
        tone: "tactical",
        text: "Anika reads the closing documentation. She does not say anything. She does not text Theo. She files the documentation. The pattern from b12 has now repeated. The pattern is the pattern.",
      },
    ],
    nextSceneId: "ending-halberd-stack",
  },

  {
    id: "ending-open-process",
    backgroundId: "office",
    mood: "peaceful",
    isEnding: true,
    outcomeType: "good",
    endingTitle: "The Open Process",
    endingSummary:
      "Eight weeks. Seven funds. Bridge competed on the merits. Polestar underbid on the price as Bridge predicted. Marisa's old fund underwrote the cleanest term sheet. The decision was the decision the C is supposed to be. Halberd led at the size Bridge proposed. The board now has two non-Halberd-friendly voices with votes. The Series C decided the board for the next five years. The process decided who decides.",
    endingLearnPrompt:
      "Series C lead selection is board selection. The process is the structural decision. The next time you let an existing investor build the round, ask whether the round is being built or being inherited.",
    dialog: [
      {
        speakerId: "anika",
        emotion: "knowing",
        text: "Term sheet from Marisa's old fund is the cleanest. Term sheet from Bridge is the highest pre. We decided in favour of the merits. Bridge led. The board now has Anna Petrov and Marisa's old fund's new lead with votes. The platform pipeline conversation will be a different conversation at the next board meeting.",
      },
    ],
  },

  {
    id: "ending-shaped-list",
    backgroundId: "office",
    mood: "professional",
    isEnding: true,
    outcomeType: "neutral",
    endingTitle: "The Shaped List",
    endingSummary:
      "Two swaps. Verge and Cross Pointe on the board. The two outside funds Anika flagged took observer seats. Bridge led. The board after the Series C is still Halberd-friendly in voting math. Anna Petrov is on the board, which is a meaningful structural addition. The next two outcomes the C produces will be decided by a board that is two-thirds Bridge.",
    endingLearnPrompt:
      "The two-of-four swap is the diplomatic compromise that preserves the structural posture. The next time you negotiate a co-investor list, ask whether the swaps change the voting math or the optics.",
    failureBlogSlug: "the-two-of-four-swap",
    failureBlogTitle: "Why swapping two of the four co-investors keeps the board the same shape",
    dialog: [
      {
        speakerId: "anika",
        emotion: "knowing",
        text: "Round closed in nine weeks. The board has Anna Petrov now. The voting math is still Bridge-favourable on most structural items. We will see how Anna Petrov votes at the first post-close meeting in March.",
      },
    ],
  },

  {
    id: "ending-halberd-stack",
    backgroundId: "office",
    mood: "cold",
    isEnding: true,
    outcomeType: "bad",
    endingTitle: "The Halberd Stack",
    endingSummary:
      "Closed process. Four funds Halberd works with on every deal. Eight weeks to close. The board after the Series C is the Halberd-friendly board. Bridge does not need to push the next decision. He needs to wait for it. The pattern from b12 has repeated. The pattern is now the pattern.",
    endingLearnPrompt:
      "Accepting the closed process at Series C is choosing your board by accepting an introduction list. The next time the existing lead offers to shape the round, ask whether the shape is the round you would build if you were starting from zero.",
    failureBlogSlug: "the-halberd-stack",
    failureBlogTitle: "Why accepting the existing lead's co-investor list is choosing your board for five years",
    dialog: [
      {
        speakerId: "anika",
        emotion: "neutral",
        text: "Closed. The board is the board. We will discuss the platform pipeline at the next quarterly meeting.",
      },
    ],
  },
];

const businessMission13: Scenario = {
  id: "b13-series-c",
  title: "The Series C Conversation",
  tagline:
    "Bridge wants to lead and shape the co-investor list. The C is the board for five years. The process is the structural decision.",
  description:
    "Tuesday 8:14 am. Bridge initiates the C over coffee. He has shaped the round in two paragraphs: Halberd to lead, three Halberd-friendly co-investors, eight-week closed process. The discipline is to recognise that the existing lead shaping the co-investor list is the same shape as b12's quick-read framing. Open the process. Compete on the merits.",
  tier: "vip",
  track: "male-business",
  level: 13,
  order: 1,
  estimatedMinutes: 11,
  difficulty: "advanced",
  category: "business",
  xpReward: 480,
  badgeId: "open-process",
  startSceneId: "cold-open",
  prerequisites: ["b12-option-pool-refresh"],
  isNew: true,
  tacticsLearned: [
    "Treating the C as the board selection it actually is",
    "Opening a closed process to fund flags the existing lead would not introduce",
    "Accepting that the open process changes the existing lead's odds and naming that",
    "Letting the CFO run the process while the founder runs the relationships",
  ],
  redFlagsTaught: [
    "The existing lead's co-investor list as inheritance, not negotiation",
    "The two-of-four swap that preserves voting math under diplomatic cover",
    "Accepting a closed process because the relationship feels collaborative",
    "Choosing your board by accepting an introduction list",
  ],
  reward: {
    id: "open-process",
    name: "The Open Process",
    description:
      "Seven funds. Bridge competed on the merits. The board now has two non-Halberd-friendly voices with votes. The Series C decided the board for the next five years. The process decided who decides.",
  },
  characters: [BRIDGE, ANIKA, INNER_VOICE_M],
  scenes,
};

export default businessMission13;
