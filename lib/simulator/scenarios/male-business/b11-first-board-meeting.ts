/**
 * Business Line. Mission 11 "The First Board Meeting"
 *
 * Six weeks after b10 closed. The Series B funded. Bridge Carter took
 * the board seat per the term sheet. The first board meeting is
 * Tuesday at 9:00 am. Two existing investors, Bridge, the two
 * independents (Marisa Khoury and one other), the protagonist.
 *
 * The discipline taught: be the founder the term sheet conversation
 * described. Do not over-prepare the deck. Do not perform competence.
 * Bring the work. Three openings reveal three founder failure modes
 * at first board meetings: the overpacked deck, the framing apology,
 * and the soft-yes routine.
 *
 * Handoff out: Bridge's Wednesday morning email with a term sheet for
 * the option pool refresh ahead of the next round. b12 opens on the
 * email.
 *
 * Pilot reference: `reference/b11-pilot.md`.
 */

import type { Scenario, Scene } from "../../types";
import { ANIKA, THEO, INNER_VOICE_M } from "../../characters-male";
import type { Character } from "../../types";

const BRIDGE: Character = {
  id: "bridge",
  name: "Bridge Carter",
  description:
    "Partner at Halberd Capital. The lead from b10. Took the board seat in the closed term sheet. Speaks in two-sentence units. Opens emails with the time he is sending them.",
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
    "Independent director on your board. Mentioned by Theo in b8 as one of the people he respects. Mid-fifties, second-generation Lebanese American, ex-McKinsey then twenty years operating. The independent who reads the room before she reads the deck.",
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
        text: "Tuesday. 8:42 am. Your office. The board meeting is at 9:00. Anika walked in at 8:38 with two coffees and a folder. She is wearing the same charcoal suit she wore on the b9 Anika-flags-the-clause morning. The suit is her board-meeting suit.",
      },
      {
        speakerId: "anika",
        emotion: "knowing",
        text: "Two slides done. Q3 numbers cleanly on slide one. Q4 outlook on slide two with the three sensitivities. Do you want one more slide on the platform partnerships pipeline, or do you want to leave that for the open conversation.",
      },
      {
        speakerId: "inner-voice",
        tone: "tactical",
        text: "Anika has prepared the question. She knows the answer. She is asking because she wants you to say it out loud so the morning has been committed to a posture by 8:43 am.",
      },
    ],
    nextSceneId: "the-arrival",
  },

  {
    id: "the-arrival",
    backgroundId: "office",
    mood: "professional",
    presentCharacterIds: ["bridge", "marisa-khoury"],
    dialog: [
      {
        speakerId: null,
        text: "8:54 am. Bridge arrives first. He is carrying nothing. He shakes your hand at the door and walks to the chair on the right side of the long table, which is the chair he chose at the term sheet meeting in February.",
      },
      {
        speakerId: null,
        text: "Marisa arrives at 8:57 with a leather portfolio that is older than she is. The two existing investors arrive together at 8:59. The second independent dialed in at 8:54 from Singapore. Everyone is in the room by 9:00.",
      },
      {
        speakerId: "bridge",
        emotion: "knowing",
        text: "Sending at 9:01 am that I have the next ninety minutes for you. The agenda I sent Friday had nine items. I want to flag now that item six, the option pool refresh, is going to bleed into the open conversation at item nine. You may want to compress items two through five.",
      },
      {
        speakerId: "inner-voice",
        tone: "tactical",
        text: "He has just done the same move he did at the term sheet meeting. He has signalled the structural shape of the meeting before the meeting has started. Bridge is the kind of person who tells you the shape so the shape is not a surprise. Note that. The signalling is not generosity. It is calibration.",
      },
    ],
    nextSceneId: "the-choice",
  },

  {
    id: "the-choice",
    backgroundId: "office",
    mood: "tense",
    presentCharacterIds: ["bridge", "marisa-khoury"],
    dialog: [
      {
        speakerId: "inner-voice",
        tone: "tactical",
        text: "Three openings. The first sentence of the meeting sets the room. Pick.",
      },
    ],
    choices: [
      {
        id: "lead-with-the-work",
        text: "Two slides. Q3 numbers. Q4 outlook with three sensitivities. That is the deck. We have ninety minutes. I want to use sixty for the conversation that the numbers do not contain.",
        tactic:
          "Lead with the work. The deck is the floor. The conversation is the work. Most first board meetings are over-decked. The hour you reclaim is the asset.",
        isOptimal: true,
        event: "optimal-with-grace",
        nextSceneId: "path-a-the-work",
      },
      {
        id: "overpacked-deck",
        text: "I have prepared the deck. Forty-seven slides. I want to walk through them in the first sixty minutes so the room has full context before we discuss anything.",
        tactic:
          "The overpacked deck. You are about to spend sixty minutes telling the room things they could have read. The forty-seven slides are not for them. They are for you. You needed to prepare them so that you would have something to do at the meeting.",
        feedback:
          "Bridge's read is that you do not yet trust the room.",
        nextSceneId: "path-b-overpacked",
      },
      {
        id: "framing-apology",
        text: "Before we start, I want to acknowledge that the Q3 numbers missed the projection in the term sheet by 3 percent, and I want to walk through why before anyone has the chance to ask.",
        tactic:
          "The framing apology. You have just told the room that the 3 percent miss is the topic. The room would have spent eight minutes on it. They will now spend forty.",
        event: "failure-rejected",
        nextSceneId: "path-c-framing-apology",
      },
    ],
  },

  {
    id: "path-a-the-work",
    backgroundId: "office",
    mood: "professional",
    presentCharacterIds: ["bridge", "marisa-khoury"],
    dialog: [
      {
        speakerId: null,
        text: "You walk through the two slides in fourteen minutes. Anika takes one of them. You take the other. The Q3 numbers came in at 97 percent of the projection. You name the 3 percent miss in two sentences without elaborating on it. Bridge does not ask.",
      },
      {
        speakerId: "bridge",
        emotion: "knowing",
        text: "Helpful. The Q4 sensitivities are the right three. Marisa, you have the operating context here. Do you want to take the next twenty.",
      },
      {
        speakerId: "marisa-khoury",
        emotion: "knowing",
        text: "I will. I want to discuss the platform partnerships pipeline you flagged on slide two. Specifically the Forge relationship. I am hearing things about Forge's Q4 product roadmap that may shape what you ship in Q1.",
      },
      {
        speakerId: "inner-voice",
        tone: "tactical",
        text: "Marisa is doing the work the room is for. She is bringing operating intelligence to the table. She is offering the work the deck could not. The conversation you reclaimed an hour for is now happening.",
      },
      {
        speakerId: null,
        text: "The meeting closes at 10:34 am. Twenty-six minutes ahead of schedule. Bridge stays for an extra eight minutes. He does not have an agenda. He is just there.",
      },
      {
        speakerId: "bridge",
        emotion: "knowing",
        text: "Good first one. I will send the option pool refresh memo tomorrow morning. We will discuss at the next board meeting. Quick read overnight, not a formal review.",
      },
      {
        speakerId: "inner-voice",
        tone: "tactical",
        text: "He stayed eight extra minutes. The eight minutes were the relationship. The board meeting was the work.",
      },
    ],
    nextSceneId: "ending-the-work-led",
  },

  {
    id: "path-b-overpacked",
    backgroundId: "office",
    mood: "professional",
    presentCharacterIds: ["bridge", "marisa-khoury"],
    dialog: [
      {
        speakerId: null,
        text: "You walk through the forty-seven slides. By slide twenty-three Marisa has stopped taking notes. By slide thirty-one Bridge has set down his pen. By slide forty you are running over the sixty-minute mark.",
      },
      {
        speakerId: "bridge",
        emotion: "neutral",
        text: "Let us pause. We have thirty minutes left. The remaining slides we can read offline. The Q4 sensitivities I would like to discuss now.",
      },
      {
        speakerId: "inner-voice",
        tone: "tactical",
        text: "He has put the lid on the deck. He is doing it cleanly. The thirty minutes of open conversation become twenty by the time you reset. Marisa does not get to bring the operating intelligence she came with. She files it for next quarter.",
        event: "tactic-named:overpacked-deck",
      },
      {
        speakerId: null,
        text: "The meeting closes on time. Bridge does not stay extra. He sends a text at 1:14 pm.",
      },
      {
        speakerId: "bridge",
        emotion: "knowing",
        text: "Good first one. The deck was thorough. Next time the deck is the floor and the conversation is the meeting. We will refine.",
      },
    ],
    nextSceneId: "ending-the-overpacked-deck",
  },

  {
    id: "path-c-framing-apology",
    backgroundId: "office",
    mood: "danger",
    presentCharacterIds: ["bridge", "marisa-khoury"],
    dialog: [
      {
        speakerId: "bridge",
        emotion: "neutral",
        text: "I appreciate the proactive framing. Let us spend some time on that. Three percent is small. Three percent against the Operating Plan we just signed is not small.",
      },
      {
        speakerId: "inner-voice",
        tone: "tactical",
        text: "He took the door. The 3 percent miss was not the agenda. You made it the agenda. The room spends the next forty minutes on a topic that did not need forty minutes.",
        event: "tactic-named:framing-apology",
      },
      {
        speakerId: "inner-voice",
        tone: "tactical",
        text: "Marisa watches. She does not bring the Forge intelligence. She files it. She will offer it offline next week. The board meeting becomes the place where the 3 percent miss got discussed, not the place where the platform pipeline got discussed.",
      },
      {
        speakerId: null,
        text: "The meeting closes ten minutes late. Bridge sends the option pool memo Wednesday morning. The memo opens with a paragraph on the Operating Plan and the importance of hitting the Q4 projection.",
      },
    ],
    nextSceneId: "ending-the-framing-apology",
  },

  {
    id: "ending-the-work-led",
    backgroundId: "office",
    mood: "peaceful",
    isEnding: true,
    outcomeType: "good",
    endingTitle: "The Work Led",
    endingSummary:
      "Two slides. Fourteen minutes on the deck. An hour of conversation the deck could not contain. Marisa brought the Forge intelligence. The meeting closed twenty-six minutes ahead of schedule. Bridge stayed eight extra minutes. The eight minutes were the relationship. The board meeting was the work.",
    endingLearnPrompt:
      "The deck is the floor. The conversation is the work. Audit your next board prep cycle. How many of the slides exist to be read by the board, and how many exist to be prepared by you?",
    dialog: [
      {
        speakerId: "theo",
        emotion: "knowing",
        text: "Saw Marisa is on your board. She is the right one. The meeting went the way you wanted? Coffee next week.",
      },
    ],
  },

  {
    id: "ending-the-overpacked-deck",
    backgroundId: "office",
    mood: "professional",
    isEnding: true,
    outcomeType: "neutral",
    endingTitle: "The Overpacked Deck",
    endingSummary:
      "Forty-seven slides. By slide twenty-three Marisa had stopped taking notes. Bridge paused you at slide forty. The platform pipeline conversation did not happen. The relationship is intact. The first meeting was the meeting of the deck, not the meeting of the work.",
    endingLearnPrompt:
      "Over-preparing the deck is performing competence to a room that already chose you. The next time you reach for a forty-seventh slide, ask whether the slide is for the board or for your own nerves.",
    failureBlogSlug: "the-overpacked-deck",
    failureBlogTitle: "Why the forty-seven-slide first board deck is for you, not the board",
    dialog: [
      {
        speakerId: "theo",
        emotion: "knowing",
        text: "Saw it ran long. Coffee next week. We will calibrate.",
      },
    ],
  },

  {
    id: "ending-the-framing-apology",
    backgroundId: "office",
    mood: "cold",
    isEnding: true,
    outcomeType: "bad",
    endingTitle: "The Framing Apology",
    endingSummary:
      "You opened with the 3 percent miss. The room spent forty minutes on a topic that needed eight. Marisa filed the Forge intelligence for offline. Bridge's option-pool memo opens with a paragraph on the Operating Plan. The first board meeting set the pattern. The pattern is that the 3 percent miss is the topic.",
    endingLearnPrompt:
      "The framing apology creates the problem it pre-empts. Naming a small miss in your opening sentence converts it into the meeting. The next time you reach to pre-empt a question that has not been asked, hold the question for the question.",
    failureBlogSlug: "the-framing-apology",
    failureBlogTitle: "Why pre-empting a small miss makes it the meeting",
    dialog: [
      {
        speakerId: "theo",
        emotion: "knowing",
        text: "Saw the memo this morning. Read paragraph one twice. Coffee tomorrow.",
      },
    ],
  },
];

const businessMission11: Scenario = {
  id: "b11-first-board-meeting",
  title: "The First Board Meeting",
  tagline:
    "Two slides or forty-seven. The deck is the floor. The conversation is the work.",
  description:
    "Tuesday 9:00 am. Six weeks after the Series B closed. Bridge Carter took the board seat. Marisa Khoury is independent. The two existing investors are in the room. The discipline is to bring the work, not perform the preparation. Three openings reveal three failure modes: the overpacked deck, the framing apology, the soft-yes routine.",
  tier: "vip",
  track: "male-business",
  level: 11,
  order: 1,
  estimatedMinutes: 11,
  difficulty: "advanced",
  category: "business",
  xpReward: 440,
  badgeId: "work-led",
  startSceneId: "cold-open",
  prerequisites: ["b10-series-b"],
  isNew: true,
  tacticsLearned: [
    "Leading the first board meeting with the conversation, not the deck",
    "Letting the independents bring the operating intelligence",
    "Recognising over-preparation as competence theatre",
    "Holding small misses for the questions that get asked",
  ],
  redFlagsTaught: [
    "The overpacked deck as founder nervousness performed as thoroughness",
    "The framing apology that converts a small miss into the meeting",
    "Talking through forty-seven slides because reading thirty-five would have been ten minutes",
    "Letting the board meeting become the meeting of the deck, not the work",
  ],
  reward: {
    id: "work-led",
    name: "The Work Led",
    description:
      "Fourteen minutes on the deck. An hour of conversation the deck could not contain. The eight extra minutes Bridge stayed were the relationship. The board meeting was the work.",
  },
  characters: [BRIDGE, ANIKA, MARISA, THEO, INNER_VOICE_M],
  scenes,
};

export default businessMission11;
