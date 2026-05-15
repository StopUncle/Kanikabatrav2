/**
 * Business Line. Mission 12 "The Option Pool Refresh"
 *
 * Wednesday 7:14 am. Bridge's option pool refresh memo arrives per
 * his end-of-meeting text from b11. Eight percent refresh proposed,
 * framed as "quick read overnight, not a formal review."
 *
 * The discipline taught: read this term sheet too. The eight percent
 * is large. The math is that the eight percent comes from founder +
 * employee equity, not from preferred. The week-six timing means
 * the lawyers did not catch the structural change in the closed
 * Series B term sheet.
 *
 * Handoff out: Bridge's revised memo + the next board meeting agenda.
 * b13 opens on the next board meeting agenda.
 *
 * Pilot reference: `reference/b12-pilot.md`.
 */

import type { Scenario, Scene } from "../../types";
import { ANIKA, INNER_VOICE_M } from "../../characters-male";
import type { Character } from "../../types";

const BRIDGE: Character = {
  id: "bridge",
  name: "Bridge Carter",
  description:
    "Halberd partner. On the board. Same Bridge as b10 and b11. Opens emails with the time he is sending them. The Wednesday memo is the move.",
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
    dialog: [
      {
        speakerId: null,
        text: "Wednesday. 7:14 am. Bridge's memo arrives in your inbox. Subject: Option pool refresh, week 6.",
      },
      {
        speakerId: "bridge",
        emotion: "knowing",
        text: "Sending at 7:14 am Wednesday. Eight percent refresh proposed against the founder and employee equity pool, sourced from the existing common stock allocation. Quick read overnight, not a formal review. Will discuss at next month's board. B.",
      },
      {
        speakerId: "inner-voice",
        tone: "tactical",
        text: "He has framed three things in five lines. The size. The source. The cadence. The framing is the move. Quick read overnight is the move that does not feel like a move.",
      },
      {
        speakerId: null,
        text: "You forward to Anika at 7:21 am with one sentence: read this before 9:30. She replies at 7:24: already opened, will text by 9:00.",
      },
    ],
    nextSceneId: "anika-reads-it",
  },

  {
    id: "anika-reads-it",
    backgroundId: "office",
    mood: "tense",
    presentCharacterIds: ["anika"],
    dialog: [
      {
        speakerId: null,
        text: "9:14 am. Anika is in your office. She has printed the memo. She has highlighted three lines in green and one line in yellow.",
      },
      {
        speakerId: "anika",
        emotion: "knowing",
        text: "Eight percent is large. Twice what is standard for a week-six refresh at our stage. The standard is three to four. He is not asking you to negotiate down to four. He is asking you to anchor at eight.",
      },
      {
        speakerId: "anika",
        emotion: "knowing",
        text: "The source allocation is the yellow line. Sourced from the existing common stock allocation means the eight percent is your dilution, the team's dilution, no preferred dilution. The closed Series B term sheet did not commit to where future option pool refreshes would source from.",
      },
      {
        speakerId: "anika",
        emotion: "knowing",
        text: "The clean structural ask is: half the pool from common, half held in reserve and requiring board approval to deploy. That gives Bridge the room he wants without giving him the dilution he wants.",
      },
      {
        speakerId: "inner-voice",
        tone: "tactical",
        text: "Anika has read the same term sheet Bridge wrote. She has produced the structural move in nine minutes. The structural move is not the percent. The structural move is the source.",
      },
    ],
    nextSceneId: "the-bridge-meeting",
  },

  {
    id: "the-bridge-meeting",
    backgroundId: "office",
    mood: "tense",
    presentCharacterIds: ["bridge"],
    dialog: [
      {
        speakerId: null,
        text: "Thursday 4:00 pm. Bridge stops by. He sits in the conversation chair, not the meeting chair. The conversation chair is the one Theo used to sit in.",
      },
      {
        speakerId: "bridge",
        emotion: "knowing",
        text: "Sending the in-person at 4:00 pm Thursday. The memo. Where are you.",
      },
      {
        speakerId: "inner-voice",
        tone: "tactical",
        text: "Two-sentence units. The framing question is the same framing question he used at b10. Tell me where you are. He is taking facts before he takes positions.",
      },
    ],
    nextSceneId: "the-choice",
  },

  {
    id: "the-choice",
    backgroundId: "office",
    mood: "tense",
    presentCharacterIds: ["bridge"],
    dialog: [],
    choices: [
      {
        id: "name-the-source",
        text: "Eight percent is large but the size is not the move. The source is the move. The proposal sources entirely from common. I will agree to a four percent refresh from common and a four percent reservation requiring board approval to deploy. That gives the team the runway and keeps the dilution math symmetric.",
        tactic:
          "Name the source as the structural ask. The percent is the door. The source is the cage. Anika's move is the right move.",
        isOptimal: true,
        event: "optimal-with-grace",
        nextSceneId: "path-a-name-the-source",
      },
      {
        id: "counter-the-percent",
        text: "Eight is too high for week six. Six percent, same source allocation you proposed.",
        tactic:
          "Counter the percent. You won the wrong negotiation. Bridge anchored at eight to land at six. The source stays as proposed. You will be diluted by the six percent.",
        feedback:
          "Bridge will agree to six within ninety seconds. The agreement will feel like a win. It was the win Bridge optimised for.",
        nextSceneId: "path-b-counter-the-percent",
      },
      {
        id: "accept-the-pool",
        text: "Eight is broadly standard. Approved. Quick read, not formal.",
        tactic:
          "Accept the framing. You have signed the eight percent and signed the source. The board's quick-read posture means the documentation closes by Tuesday.",
        event: "failure-rejected",
        nextSceneId: "path-c-accept-the-pool",
      },
    ],
  },

  {
    id: "path-a-name-the-source",
    backgroundId: "office",
    mood: "professional",
    presentCharacterIds: ["bridge"],
    dialog: [
      {
        speakerId: "bridge",
        emotion: "knowing",
        text: "The structural ask is reasonable. The framing was not. I take the framing back. Four plus four reserved is a yes. I will draft the revised memo by Friday. Quick read still applies. The reserved four requires a four-fifths board vote to deploy, which gives the founder and Marisa a structural hold.",
      },
      {
        speakerId: "inner-voice",
        tone: "tactical",
        text: "He took the framing back. He did it cleanly. The four-fifths vote on the reserved four is more conservative than you would have asked for. He is being precise about giving you back the trust he was about to spend.",
        event: "tactic-named:source-as-the-move",
      },
      {
        speakerId: "bridge",
        emotion: "knowing",
        text: "Anika read the memo before you did. Tell her the four-fifths language was hers, conceptually. The next time I send a quick read, I will send it knowing she is reading first.",
      },
      {
        speakerId: "inner-voice",
        tone: "tactical",
        text: "He has just acknowledged who is doing the diligence on his memos. The next memo will be cleaner because he knows. The board relationship just calibrated up.",
      },
    ],
    nextSceneId: "ending-source-split",
  },

  {
    id: "path-b-counter-the-percent",
    backgroundId: "office",
    mood: "professional",
    presentCharacterIds: ["bridge"],
    dialog: [
      {
        speakerId: "bridge",
        emotion: "knowing",
        text: "Six works. I will revise the memo by Friday. Sourced from common as proposed. Quick read.",
      },
      {
        speakerId: "inner-voice",
        tone: "tactical",
        text: "He agreed in ninety seconds. That is the data. The six percent was the floor he was willing to land at. The eight was the anchor. The source was the move. You negotiated the anchor and gave him the move.",
        event: "tactic-named:anchor-and-source",
      },
      {
        speakerId: null,
        text: "He stays for another four minutes. He asks about the platform partnerships pipeline. He leaves at 4:18. The memo arrives revised on Friday morning at 8:14.",
      },
      {
        speakerId: "inner-voice",
        tone: "tactical",
        text: "The dilution math is six percent against common. The team will absorb it across the next eighteen months of hires. You will absorb it directly. Bridge will appreciate the meeting.",
      },
    ],
    nextSceneId: "ending-percent-cut",
  },

  {
    id: "path-c-accept-the-pool",
    backgroundId: "office",
    mood: "danger",
    presentCharacterIds: ["bridge"],
    dialog: [
      {
        speakerId: "bridge",
        emotion: "knowing",
        text: "Good. Documentation by Tuesday. Quick read holds. Thanks.",
      },
      {
        speakerId: "inner-voice",
        tone: "tactical",
        text: "Three sentences. He has the eight percent. He has the source. He has the quick-read posture as precedent for the next refresh. The board will not return to this for at least eighteen months because the documentation will close before the next board meeting.",
      },
      {
        speakerId: null,
        text: "He leaves at 4:06 pm. The whole conversation took six minutes. He did not stay extra. He did not ask about the platform pipeline. The Friday memo arrives at 8:14 am with the same numbers and the same source.",
      },
      {
        speakerId: "inner-voice",
        tone: "tactical",
        text: "Anika reads the closed documentation Tuesday at 9:00 am. She does not say anything. She does not text Theo. She files the documentation. The data is the not-saying.",
      },
    ],
    nextSceneId: "ending-pool-accepted",
  },

  {
    id: "ending-source-split",
    backgroundId: "office",
    mood: "peaceful",
    isEnding: true,
    outcomeType: "good",
    endingTitle: "The Source Split",
    endingSummary:
      "Four percent from common, four percent reserved with a four-fifths board-vote requirement. Bridge took the framing back cleanly. The dilution math is symmetric. The trust calibrated up. Anika is now visible to Bridge as the person reading first.",
    endingLearnPrompt:
      "The percent is the door. The source is the cage. Audit the next memo a board member sends with a quick-read framing. What is the size and what is the source. The structural ask is rarely the size.",
    dialog: [
      {
        speakerId: "anika",
        emotion: "knowing",
        text: "Bridge sent the revised memo. Four plus four reserved with four-fifths board approval. Cleanest version of the document I have read this year. We will discuss the deployment of the reserved four at the next board meeting. b13 is on the calendar.",
      },
    ],
  },

  {
    id: "ending-percent-cut",
    backgroundId: "office",
    mood: "professional",
    isEnding: true,
    outcomeType: "neutral",
    endingTitle: "The Percent Cut",
    endingSummary:
      "Six percent from common. Bridge agreed in ninety seconds because six was the floor he was prepared to land at. The dilution math is asymmetric. The team will absorb it. You will absorb it. The board will return to this in eighteen months, with the source allocation as precedent.",
    endingLearnPrompt:
      "Negotiating the anchor is the wrong negotiation when the anchor is not the move. The next time you celebrate moving a number down, ask whether the number was the move or the framing was.",
    failureBlogSlug: "the-anchor-and-source",
    failureBlogTitle: "Why moving the percent is the win the asker optimised for",
    dialog: [
      {
        speakerId: "anika",
        emotion: "neutral",
        text: "Memo revised. Six percent from common. We will deploy across the eighteen-month plan. The dilution will be visible in the Series C waterfall. Note that for the b13 board meeting.",
      },
    ],
  },

  {
    id: "ending-pool-accepted",
    backgroundId: "office",
    mood: "cold",
    isEnding: true,
    outcomeType: "bad",
    endingTitle: "The Pool Accepted",
    endingSummary:
      "Eight percent from common. Quick-read documentation closed by Tuesday. The board will not return to this for eighteen months. Anika filed the documentation without commentary. The dilution math is at the limit of what Bridge could have asked for. The pattern is now the quick-read pattern.",
    endingLearnPrompt:
      "Accepting the quick-read framing is the founder version of accepting the cohort framing. The next time a memo arrives with quick read overnight as the framing, treat it as the formal review the framing is trying to bypass.",
    failureBlogSlug: "the-quick-read-pattern",
    failureBlogTitle: "Why quick read overnight is the move that becomes the pattern",
    dialog: [
      {
        speakerId: "anika",
        emotion: "neutral",
        text: "Documentation filed. The eight percent is on the cap table. We will discuss deployment at b13.",
      },
    ],
  },
];

const businessMission12: Scenario = {
  id: "b12-option-pool-refresh",
  title: "The Option Pool Refresh",
  tagline:
    "Eight percent overnight. The size is the door. The source is the cage.",
  description:
    "Wednesday morning. Bridge's memo arrives framed as a quick read. Eight percent refresh sourced entirely from common. Anika reads it in nine minutes and produces the structural move: split the pool, source half from common, hold half in reserve. The discipline is to name the source as the move, not the percent.",
  tier: "vip",
  track: "male-business",
  level: 12,
  order: 1,
  estimatedMinutes: 10,
  difficulty: "advanced",
  category: "business",
  xpReward: 460,
  badgeId: "source-split",
  startSceneId: "cold-open",
  prerequisites: ["b11-first-board-meeting"],
  isNew: true,
  tacticsLearned: [
    "Reading the source allocation as the structural move",
    "Splitting a refresh into pool plus reserved with board-vote gating",
    "Treating quick-read framing as formal-review-by-different-name",
    "Letting the CFO be visibly the diligence layer",
  ],
  redFlagsTaught: [
    "Quick read overnight as the framing that becomes the pattern",
    "The eight-percent anchor sized to land at six",
    "Source-from-common framing as asymmetric dilution",
    "The week-six timing that bypasses the closed term sheet's silence",
  ],
  reward: {
    id: "source-split",
    name: "The Source Split",
    description:
      "Four plus four reserved with a four-fifths board vote. The dilution math is symmetric. The trust calibrated up.",
  },
  characters: [BRIDGE, ANIKA, INNER_VOICE_M],
  scenes,
};

export default businessMission12;
