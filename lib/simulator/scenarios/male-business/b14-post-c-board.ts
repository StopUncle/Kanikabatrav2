/**
 * Business Line. Mission 14 "The First Post-C Board"
 *
 * Nine weeks after b13's Series C close. The first post-close board
 * meeting. The new directors sit for the first time: Anna Petrov from
 * Verge and Iris Donaldson from Marisa's old fund. Bridge no longer
 * has structural majority. The agenda has nine items. Item four is
 * the platform pipeline conversation deferred since b11.
 *
 * The discipline taught: a new board composition does not automatically
 * produce a new board operating mode. The first meeting establishes
 * the operating pattern. The protagonist sets the pattern by which
 * conversations he routes through which directors.
 *
 * Handoff out: an introduction request from Anna's network landing
 * Friday. b15 opens on the introduction.
 *
 * Pilot reference: `reference/b14-pilot.md`.
 */

import type { Scenario, Scene } from "../../types";
import {
  ANIKA,
  ANNA_PETROV,
  IRIS_DONALDSON,
  INNER_VOICE_M,
} from "../../characters-male";
import type { Character } from "../../types";

const BRIDGE: Character = {
  id: "bridge",
  name: "Bridge Carter",
  description:
    "Halberd partner. On the board since b10. No longer structural majority. Two-sentence units.",
  traits: ["patient", "structural", "low-volume"],
  defaultEmotion: "knowing",
  gender: "male",
  personalityType: "predator-capital",
  silhouetteType: "male-lean",
};

const MARISA: Character = {
  id: "marisa-khoury",
  name: "Marisa Khoury",
  description:
    "Independent director since b11. The first one in the room each meeting.",
  traits: ["operating-experience", "structural", "warm-by-evidence"],
  defaultEmotion: "knowing",
  gender: "female",
  personalityType: "mentor",
  silhouetteType: "female-elegant",
};

const scenes: Scene[] = [
  {
    id: "cold-open",
    backgroundId: "office",
    mood: "professional",
    presentCharacterIds: ["anika"],
    dialog: [
      {
        speakerId: null,
        text: "Thursday. 8:42 am. Your office. Nine weeks after the Series C closed at 90 with Halberd leading, Verge and Marisa's old fund taking board seats with votes, and the other two co-investors taking observer seats. The first post-close board meeting is at 9:00 am.",
      },
      {
        speakerId: "anika",
        emotion: "knowing",
        text: "Three slides. Q4 numbers, platform pipeline shape, the Forge partnership Q1 plan. Item four is the platform pipeline. We have deferred it for two meetings. Anna and Iris have never sat at our table. Today is the day the platform conversation is the test of who routes what.",
      },
      {
        speakerId: "inner-voice",
        tone: "tactical",
        text: "The Series C decided the board. The first board meeting decides the operating mode. Bridge has run the platform conversations for fifteen months. The platform conversation is now also a conversation Anna and Iris are qualified to lead.",
      },
    ],
    nextSceneId: "anna-arrives",
  },

  {
    id: "anna-arrives",
    backgroundId: "office",
    mood: "professional",
    presentCharacterIds: ["anna-petrov", "iris-donaldson", "marisa-khoury", "bridge"],
    dialog: [
      {
        speakerId: null,
        text: "Marisa arrives first at 8:51, as she has at every meeting since b11. Bridge at 8:56. Iris at 8:58. Anna at 8:59 exactly. Anna is carrying a fountain pen and a leather notebook the size of her palm.",
      },
      {
        speakerId: null,
        text: "9:00 am. Everyone seated. You open by introducing Anna and Iris to the room. Both nod to Marisa, who they have not met. Marisa nods back at her own pace. The room takes ninety seconds to settle.",
      },
      {
        speakerId: "inner-voice",
        tone: "tactical",
        text: "Anna's pen is uncapped before the agenda is read. She is going to take notes. Iris is not going to take notes. Bridge is going to take notes the way he always has, which is to write down only the conclusions.",
      },
    ],
    nextSceneId: "items-one-through-three",
  },

  {
    id: "items-one-through-three",
    backgroundId: "office",
    mood: "professional",
    presentCharacterIds: ["anna-petrov", "iris-donaldson", "marisa-khoury", "bridge"],
    dialog: [
      {
        speakerId: null,
        text: "Item one: Q4 numbers. Anika presents the slide. Nine minutes. Bridge asks the financial question. Iris asks the technical-stack-cost question. Anna writes for thirty seconds and then says one sentence.",
      },
      {
        speakerId: "anna-petrov",
        emotion: "knowing",
        text: "The customer-acquisition cost line for the second-half cohort. The trend is structural or seasonal. I would like to know which by the next meeting.",
      },
      {
        speakerId: "inner-voice",
        tone: "tactical",
        text: "Anna asks operating questions. She writes them down first, then says them. She is the operating voice the board did not have before b13. She has now asked it once. The board has the question on the record.",
      },
      {
        speakerId: null,
        text: "Item two: the Forge partnership Q1 plan. Twelve minutes. Item three: the next senior hire. Eight minutes.",
      },
      {
        speakerId: null,
        text: "Item four. The platform pipeline. The conversation that has been deferred from b11 onward. The room is now eighty-three minutes in. You have twenty-eight minutes to use.",
      },
    ],
    nextSceneId: "the-choice",
  },

  {
    id: "the-choice",
    backgroundId: "office",
    mood: "tense",
    presentCharacterIds: ["anna-petrov", "iris-donaldson", "marisa-khoury", "bridge"],
    dialog: [
      {
        speakerId: "inner-voice",
        tone: "tactical",
        text: "How you open item four sets the pattern of the next two years. Three openings.",
      },
    ],
    choices: [
      {
        id: "the-whole-board",
        text: "Open the platform pipeline as a structural conversation. Anika presents the shape. Then ask the table: Anna, the operating question. Iris, the technical question. Bridge, the financial question. Marisa, the integration question. Each director gets their question.",
        tactic:
          "Open the conversation to the whole board. Each director's expertise becomes the lane they speak from. The decision converges in twenty-eight minutes because the conversation is structurally distributed.",
        isOptimal: true,
        event: "optimal-with-grace",
        nextSceneId: "path-a-the-whole-board",
      },
      {
        id: "route-through-anna",
        text: "Open the platform pipeline by addressing Anna directly. She is the strategic voice. Let her lead. The other directors comment.",
        tactic:
          "Route through Anna. She is qualified. She becomes the platform director by default. The pattern is set: Anna leads platform, Bridge defers, Iris speaks once. Good for this meeting. Sets a pattern that may not be the pattern.",
        feedback:
          "Anna is the strategic voice. She is not the only strategic voice. Routing through her on day one names her as the lane in a way the board has not yet voted on.",
        nextSceneId: "path-b-route-through-anna",
      },
      {
        id: "route-through-bridge",
        text: "Open the platform pipeline by addressing Bridge. He has run these conversations for fifteen months. Let him continue.",
        tactic:
          "Default routing. Bridge has continuity. The pattern is set: Bridge stays the platform director. Anna and Iris are now structural attendees rather than structural directors. The Series C decided who decides only nominally.",
        event: "failure-rejected",
        nextSceneId: "path-c-route-through-bridge",
      },
    ],
  },

  {
    id: "path-a-the-whole-board",
    backgroundId: "office",
    mood: "professional",
    presentCharacterIds: ["anna-petrov", "iris-donaldson", "marisa-khoury", "bridge"],
    dialog: [
      {
        speakerId: "inner-voice",
        text: "Item four. Platform pipeline. Anika has the shape. Then I want each of you to bring your question to the same conversation. Anna, the operating question. Iris, the technical question. Bridge, the financial. Marisa, the integration.",
      },
      {
        speakerId: null,
        text: "Anika presents in seven minutes. The shape is clean. The four directors each take three to five minutes. Anna's operating question is sharp: she points out that one partner in the pipeline is asking for a level of integration the team is not yet sized to deliver.",
      },
      {
        speakerId: null,
        text: "Iris speaks once. Her technical question is whether the integration partner Anna just named would compromise the security boundary you committed to in the Series C disclosure. Bridge's financial question is the rate of return on the integration build versus the same engineering time on existing customers.",
      },
      {
        speakerId: "marisa-khoury",
        emotion: "knowing",
        text: "The integration question is the load-bearing one. If we build it for this partner, we build it for the four that come after. The board should authorise the build only if we are willing to support the four. I am willing to vote yes if Anna and Iris are. Bridge has the right to vote no.",
      },
      {
        speakerId: "inner-voice",
        tone: "tactical",
        text: "Marisa has just structured the vote. Anna and Iris are now the swing. Bridge is the dissenting voice if he wants to be. The conversation has gone from the platform pipeline to the structural vote in nineteen minutes. The board has converged.",
      },
      {
        speakerId: "anna-petrov",
        emotion: "knowing",
        text: "Yes. With the constraint that the integration team has six months to hire the missing two engineers before we commit to partner two.",
      },
      {
        speakerId: "iris-donaldson",
        emotion: "knowing",
        text: "Yes, if the security boundary review happens before commitment, not after.",
      },
      {
        speakerId: "bridge",
        emotion: "knowing",
        text: "Yes. With the conditions Anna and Iris named.",
      },
      {
        speakerId: "inner-voice",
        tone: "tactical",
        text: "The board converged. Each director had their lane. Each lane mattered. The pattern is set: the board operates as a board, not as the existing-lead-plus-supporting-cast. Iris spoke once, which is her usual. Anna spoke three times. Bridge spoke once after the others. Marisa structured the vote.",
      },
    ],
    nextSceneId: "ending-the-board-converged",
  },

  {
    id: "path-b-route-through-anna",
    backgroundId: "office",
    mood: "professional",
    presentCharacterIds: ["anna-petrov", "iris-donaldson", "marisa-khoury", "bridge"],
    dialog: [
      {
        speakerId: "inner-voice",
        text: "Item four. Platform pipeline. Anna, you have the operating context across more verticals than the rest of us. Lead.",
      },
      {
        speakerId: null,
        text: "Anna leads. She is competent. She presents her read of the pipeline in twelve minutes. Bridge comments briefly. Iris asks her one technical question. Marisa asks the integration question and notes its load-bearing weight.",
      },
      {
        speakerId: null,
        text: "The board converges on the same vote in twenty-two minutes. The decision is the same decision. The pattern is now that Anna is the platform director.",
      },
      {
        speakerId: "inner-voice",
        tone: "tactical",
        text: "The decision is good. The pattern is the pattern. Anna will continue to be the platform director until something specific shifts. Bridge will not contest the lane because the lane was assigned at the first meeting. Iris will continue to speak once per item.",
        event: "tactic-named:lane-assignment-by-default",
      },
      {
        speakerId: "inner-voice",
        tone: "tactical",
        text: "The path A version of this conversation would have produced the same decision and a different operating mode. The operating mode is what compounds.",
      },
    ],
    nextSceneId: "ending-anna-as-platform-director",
  },

  {
    id: "path-c-route-through-bridge",
    backgroundId: "office",
    mood: "cold",
    presentCharacterIds: ["anna-petrov", "iris-donaldson", "marisa-khoury", "bridge"],
    dialog: [
      {
        speakerId: "inner-voice",
        text: "Item four. Platform pipeline. Bridge, you have run these conversations for fifteen months. Continue.",
      },
      {
        speakerId: null,
        text: "Bridge takes the conversation. He presents his read in nine minutes. He has not seen Anna's deeper expertise on the operating side and does not invite it. Anna does not push for the lane uninvited. She makes one note in her fountain pen. Iris does not speak. Marisa asks the integration question. The decision converges in nineteen minutes.",
      },
      {
        speakerId: "inner-voice",
        tone: "tactical",
        text: "The decision is good. The pattern is that Bridge still runs the platform conversations. The Series C decided who decides only nominally. The board is operating in the mode it was operating in before the Series C closed.",
        event: "tactic-named:nominal-board-change",
      },
      {
        speakerId: "inner-voice",
        tone: "tactical",
        text: "Anna does not raise the lane in the post-meeting hallway. She has a pen, a notebook, and a working hypothesis about which conversations she will be invited to lead. The hypothesis will be tested at the next meeting.",
      },
    ],
    nextSceneId: "ending-bridge-as-platform-director",
  },

  {
    id: "ending-the-board-converged",
    backgroundId: "office",
    mood: "peaceful",
    isEnding: true,
    outcomeType: "good",
    endingTitle: "The Board Converged",
    endingSummary:
      "Each director had their lane. Each lane mattered. Marisa structured the vote. The decision was made in nineteen minutes through four distinct voices. The pattern is set: the board operates as a board, not as the existing-lead-plus-supporting-cast. The Series C decided who decides, and the first board meeting confirmed it.",
    endingLearnPrompt:
      "A new board composition produces a new operating mode only if the first meeting establishes the pattern. The next time you sit in a first meeting after a structural change, ask whether you are routing the conversations to make the change real or to keep the pattern unchanged.",
    dialog: [
      {
        speakerId: null,
        text: "Friday morning. Email from Anna's office.",
      },
      {
        speakerId: "anna-petrov",
        emotion: "knowing",
        text: "Two introductions for you. One on the platform-pipeline integration partner you committed to yesterday. One on a Series C company in an adjacent vertical that may be interested in your work. The second is the more interesting one. Let me know which week. Anna.",
      },
    ],
  },

  {
    id: "ending-anna-as-platform-director",
    backgroundId: "office",
    mood: "professional",
    isEnding: true,
    outcomeType: "neutral",
    endingTitle: "Anna As Platform Director",
    endingSummary:
      "You routed through Anna. She led. The decision is good. The pattern is that Anna is now the platform director by default. Bridge defers. Iris speaks once. The board converges through Anna rather than through structural distribution. The pattern is good. It is also a pattern, not a default.",
    endingLearnPrompt:
      "Routing through the most qualified voice is a faster meeting. It is also a lane assignment. The next time you reach to address one director by name, ask whether you are inviting the lane or assigning it.",
    failureBlogSlug: "the-lane-assignment-by-default",
    failureBlogTitle: "Why routing through the most qualified director on day one assigns the lane",
    dialog: [
      {
        speakerId: "anna-petrov",
        emotion: "knowing",
        text: "Friday morning email: I have two introductions for you. Platform pipeline integration partner, plus an adjacent-vertical Series C. Send a week. Anna.",
      },
    ],
  },

  {
    id: "ending-bridge-as-platform-director",
    backgroundId: "office",
    mood: "cold",
    isEnding: true,
    outcomeType: "bad",
    endingTitle: "The Nominal Board",
    endingSummary:
      "Bridge ran the platform conversation. Anna made one note. Iris did not speak. The decision is good. The board is operating in the mode it was operating in before the Series C closed. The Series C decided who decides only nominally. Anna will test the hypothesis at the next meeting. The hypothesis will either confirm or correct.",
    endingLearnPrompt:
      "Default routing after a structural change is the way a new board operates like the old board. The next time you reach to address the existing lead by habit, ask whether the habit is what the new composition was built to change.",
    failureBlogSlug: "the-nominal-board-change",
    failureBlogTitle: "Why routing through the existing lead on day one makes the structural change nominal",
    dialog: [
      {
        speakerId: "anna-petrov",
        emotion: "neutral",
        text: "Friday morning email: Let me know when you would like to discuss the operating-question I raised on the second-half cohort CAC. I have a few thoughts that I did not raise yesterday. Anna.",
      },
    ],
  },
];

const businessMission14: Scenario = {
  id: "b14-post-c-board",
  title: "The First Post-C Board",
  tagline:
    "Anna and Iris in the room for the first time. The agenda is the agenda. The operating mode is the meeting.",
  description:
    "Thursday 9:00 am. Nine weeks after the Series C closed. The new directors sit for the first time. Item four is the platform pipeline conversation deferred since b11. The discipline is to recognise that a new board composition only produces a new operating mode if the first meeting establishes the pattern. Distribute the conversation. Each director's lane is the lane the board hired them for.",
  tier: "vip",
  track: "male-business",
  level: 14,
  order: 1,
  estimatedMinutes: 11,
  difficulty: "advanced",
  category: "business",
  xpReward: 500,
  badgeId: "board-converged",
  startSceneId: "cold-open",
  prerequisites: ["b13-series-c"],
  isNew: true,
  tacticsLearned: [
    "Distributing the first post-structural-change meeting across each director's lane",
    "Letting Marisa structure the vote when Marisa has the integration context",
    "Inviting the lane rather than assigning it by default",
    "Recognising that the operating mode is what compounds, not the decision",
  ],
  redFlagsTaught: [
    "Routing through the most qualified director on day one as lane assignment by default",
    "Routing through the existing lead as nominal board change",
    "Treating the new directors as structural attendees rather than directors",
    "Letting Iris speak once as the limit instead of the floor",
  ],
  reward: {
    id: "board-converged",
    name: "The Board Converged",
    description:
      "Four directors, four lanes, nineteen minutes to a structured vote. The Series C decided who decides, and the first board meeting confirmed it.",
  },
  characters: [BRIDGE, ANIKA, MARISA, ANNA_PETROV, IRIS_DONALDSON, INNER_VOICE_M],
  scenes,
};

export default businessMission14;
