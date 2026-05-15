/**
 * Female Track. Mission 15-2 "The 1:1 With Adrian"
 *
 * Tuesday following L15-1's partners' meeting. Adrian requested the
 * 1:1 by Wednesday morning. Lennox suggested she be in the room.
 * Adrian agreed without comment. The Halberd library is the
 * structural room: not a partners' meeting, not coffee.
 *
 * Adrian's specific ask is a voluntary step-back from Q4 platform-
 * facing events, framed as a favour to the firm and to the
 * protagonist. The ask is structurally a coup attempt. The discipline
 * is to refuse cleanly, with Lennox watching, naming the structural
 * reason without escalating.
 *
 * Handoff out: Hugh's Friday morning text closing the L15 arc.
 *
 * Pilot reference: `reference/L15-2-pilot.md`.
 */

import type { Scenario, Scene } from "../types";
import { LENNOX, ADRIAN_VALE, INNER_VOICE, HUGH } from "../characters";

const scenes: Scene[] = [
  {
    id: "cold-open",
    backgroundId: "office",
    mood: "professional",
    dialog: [
      {
        speakerId: null,
        text: "Tuesday. 1:54 pm. The corridor at Halberd Carrey leading to the library. The library is fourteen feet long with two leather chairs and a small table. The room exists for conversations that are not partners' meeting conversations and not coffee.",
      },
      {
        speakerId: null,
        text: "Lennox is already inside. She arrived at 1:50 because she does not want Adrian to be in a room alone before you arrive. That is the kind of detail Lennox handles without naming.",
      },
      {
        speakerId: "inner-voice",
        tone: "tactical",
        text: "Adrian's email was eight sentences. Five of them were calendar. Three of them were framing. The framing was: this is about the firm, not about you. The framing is the move.",
      },
    ],
    nextSceneId: "the-library",
  },

  {
    id: "the-library",
    backgroundId: "office",
    mood: "tense",
    presentCharacterIds: ["lennox", "adrian-vale"],
    dialog: [
      {
        speakerId: null,
        text: "Adrian arrives at 1:58. He sits. He has not brought anything. He nods to Lennox. He nods to you.",
      },
      {
        speakerId: "adrian-vale",
        emotion: "cold",
        text: "Thank you both for the time. I will be direct. The platform-marketing item last Tuesday raised a question I would like to put to you specifically. I am not raising it on behalf of any other partner. I am raising it because the Q4 calendar is now firm and I want to address it before the team prints the invitations.",
      },
      {
        speakerId: "adrian-vale",
        emotion: "cold",
        text: "I think the firm benefits from your advisory presence in the partners' room. I think the firm does not benefit, in Q4 specifically, from your being on stage at the three Q4 platform-facing events. I am proposing a voluntary step-back from those three events. Quarter one, you return. The advisory seat is unchanged.",
      },
      {
        speakerId: "inner-voice",
        tone: "tactical",
        text: "He has put the ask cleanly. He has named the three events. He has named Q1 as the return point. He has named the seat as unchanged. He has framed it as voluntary. He has framed it as a favour to the firm. He has framed it as a favour to you.",
      },
      {
        speakerId: "inner-voice",
        tone: "tactical",
        text: "He has not named the reason. He has not needed to. He is asking you to absorb the cost of his ask without making him pay for it.",
      },
    ],
    nextSceneId: "the-choice",
  },

  {
    id: "the-choice",
    backgroundId: "office",
    mood: "tense",
    presentCharacterIds: ["lennox", "adrian-vale"],
    dialog: [
      {
        speakerId: "inner-voice",
        tone: "tactical",
        text: "Three openings. Lennox is in the room. She will not speak first. She will support whatever you say in the structural way that supports things.",
      },
    ],
    choices: [
      {
        id: "refuse-cleanly",
        text: "Thank you for the directness. The answer is no. The seat includes the Q4 platform events because the seat is an advisory seat and the platform events are the firm's outward-facing position in Q4. If the firm's outward-facing position is not the firm I joined, that is a conversation Lennox and Hugh and I will have together, not a step-back I take quietly. I will be at the three events. I will speak about the platform-marketing decisions the firm has made. The L13 coverage is on the record and will not be the agenda at those events.",
        tactic:
          "Refuse cleanly. Name the structural reason. The seat is the seat. The events are the events. Do not litigate the L13 coverage; name it as resolved. Do not escalate.",
        isOptimal: true,
        event: "optimal-with-grace",
        nextSceneId: "path-a-refuse-cleanly",
      },
      {
        id: "counter-propose",
        text: "I will take the third event off the calendar. The first two are commitments I have already made to the platform team and the moderator. I will not retract those. The third event has flexibility. Will that work.",
        tactic:
          "Counter-propose. You give Adrian one small win. He takes it. The next ask he makes will reference this one as precedent.",
        feedback:
          "The accommodation looks like compromise. It is precedent.",
        nextSceneId: "path-b-counter-propose",
      },
      {
        id: "think-about-it",
        text: "Let me think about it. I want to talk to Lennox about the calendar implications. I will come back to you Thursday.",
        tactic:
          "Agree to think about it. The accept-now-disclose-later move in a different shape. By Thursday you will agree to part of it because the alternative will feel like escalation. By Thursday Adrian will know the room can be moved.",
        event: "failure-rejected",
        nextSceneId: "path-c-think-about-it",
      },
    ],
  },

  {
    id: "path-a-refuse-cleanly",
    backgroundId: "office",
    mood: "professional",
    presentCharacterIds: ["lennox", "adrian-vale"],
    dialog: [
      {
        speakerId: null,
        text: "You say the four sentences. You do not look at Adrian on the second one. You look at the bookshelf behind him. Lennox is reading the binding of a book that has been on the third shelf for nine years.",
      },
      {
        speakerId: "adrian-vale",
        emotion: "cold",
        text: "Understood. Thank you for the clarity. I do not have a follow-up.",
      },
      {
        speakerId: null,
        text: "He stands. He shakes your hand. He shakes Lennox's hand. He leaves the library at 2:11 pm. The conversation took thirteen minutes.",
      },
      {
        speakerId: "lennox",
        emotion: "knowing",
        text: "That was the right answer. He will not raise it again. He may raise something else in Q1. That is fine.",
      },
      {
        speakerId: "inner-voice",
        tone: "tactical",
        text: "The library is empty. The two chairs are still facing each other. The book Lennox was reading is on the third shelf. The L15 arc is now structurally over. The seat is the seat. The events are the events. The Q4 calendar is firm.",
      },
    ],
    nextSceneId: "ending-the-clean-refusal",
  },

  {
    id: "path-b-counter-propose",
    backgroundId: "office",
    mood: "tense",
    presentCharacterIds: ["lennox", "adrian-vale"],
    dialog: [
      {
        speakerId: "adrian-vale",
        emotion: "cold",
        text: "I appreciate that. The third event is the one I had in mind specifically. Thank you.",
      },
      {
        speakerId: "inner-voice",
        tone: "tactical",
        text: "He took the win. The third event was the one he wanted. Adrian named the three together to make the third feel like a third instead of a one. You negotiated against the framing he wrote.",
        event: "tactic-named:counter-propose-trap",
      },
      {
        speakerId: null,
        text: "He stands. He thanks you both. He leaves at 2:09 pm. The conversation took eleven minutes.",
      },
      {
        speakerId: "lennox",
        emotion: "knowing",
        text: "You did not have to. He will be back in Q1 with the same proposal framed against the precedent. We will hold the line then. We could have held it now.",
      },
    ],
    nextSceneId: "ending-the-small-accommodation",
  },

  {
    id: "path-c-think-about-it",
    backgroundId: "office",
    mood: "danger",
    presentCharacterIds: ["lennox", "adrian-vale"],
    dialog: [
      {
        speakerId: "adrian-vale",
        emotion: "neutral",
        text: "Of course. Thursday works. I will hold the calendar flexible until then.",
      },
      {
        speakerId: null,
        text: "He stands. He leaves at 2:08 pm. Lennox does not stand. She is still in the chair when the door closes.",
      },
      {
        speakerId: "lennox",
        emotion: "knowing",
        text: "He has the room he wanted. The Thursday conversation will be him asking the same question with the calendar pressure as the new framing. You will accept the second event off. You will accept the third event off. The first event is the one that matters. He will save it for the December.",
      },
      {
        speakerId: "inner-voice",
        tone: "tactical",
        text: "Lennox has just laid out the next three months. She is correct about all of it. The accept-now-disclose-later move in a different shape is the move Adrian was hoping for. He got it.",
      },
    ],
    nextSceneId: "ending-the-consideration",
  },

  {
    id: "ending-the-clean-refusal",
    backgroundId: "office",
    mood: "peaceful",
    isEnding: true,
    outcomeType: "good",
    endingTitle: "The Clean Refusal",
    endingSummary:
      "Thirteen minutes in the Halberd library. Adrian asked for the voluntary step-back. You named the seat as the seat and the events as the events. Lennox did not need to speak. Adrian did not raise it again. The Q4 calendar is firm. The L15 arc closes with the seat intact and the floor intact.",
    endingLearnPrompt:
      "Refusal that does not escalate is the discipline of the seat. Naming the structural reason without litigating the underlying issue keeps the floor a floor. Audit the next time you reach to explain a refusal.",
    dialog: [
      {
        speakerId: null,
        text: "Friday morning. 9:14 am. Hugh texts.",
      },
      {
        speakerId: "hugh",
        emotion: "knowing",
        text: "Heard Tuesday went the way it should have. The Q4 calendar is at the platform team for printing this afternoon. Welcome to the seat.",
      },
    ],
  },

  {
    id: "ending-the-small-accommodation",
    backgroundId: "office",
    mood: "professional",
    isEnding: true,
    outcomeType: "neutral",
    endingTitle: "The Small Accommodation",
    endingSummary:
      "You gave Adrian the third event. He took it. The calendar will print with two events instead of three. He will be back in Q1 with the same proposal framed against the precedent the third event created. Lennox will hold the line then. The seat is intact. The floor is intact. The precedent is also intact.",
    endingLearnPrompt:
      "Compromise that creates precedent is not compromise. The next time someone asks for three things and you offer to give one, ask whether the three were framed together to make the one feel small.",
    failureBlogSlug: "the-counter-propose-trap",
    failureBlogTitle: "Why offering one of three is the trap the asker set",
    dialog: [
      {
        speakerId: "hugh",
        emotion: "knowing",
        text: "Heard Tuesday closed quickly. The Q4 calendar has two events from you instead of three. We will discuss the third when Adrian raises it in Q1. Welcome to the seat.",
      },
    ],
  },

  {
    id: "ending-the-consideration",
    backgroundId: "office",
    mood: "cold",
    isEnding: true,
    outcomeType: "bad",
    endingTitle: "The Consideration",
    endingSummary:
      "You agreed to think about it. Thursday you will negotiate against the calendar pressure he created. You will give him the second and third events. The first event is the one he will save for December. The seat is intact. The floor is intact. The room is now a room Adrian knows can be moved.",
    endingLearnPrompt:
      "Agreeing to consider a coup proposal converts the coup from an attempt to a negotiation. The next time someone asks you to think about a step-back, hold whether the step-back is real or whether it is precedent.",
    failureBlogSlug: "the-step-back-consideration",
    failureBlogTitle: "Why agreeing to think about a voluntary step-back is half the step-back",
    dialog: [
      {
        speakerId: "hugh",
        emotion: "knowing",
        text: "Heard Thursday went a particular way. The Q4 calendar has one event from you. We will discuss the rest at the November partners' meeting. The seat is unchanged. The room is the room we are now in.",
      },
    ],
  },
];

const mission15_2: Scenario = {
  id: "mission-15-2",
  title: "The 1:1 With Adrian",
  tagline:
    "The library. Lennox in the room. A voluntary step-back framed as a favour to the firm.",
  description:
    "The Tuesday following the partners' meeting. Adrian Vale requested the 1:1 by Wednesday morning. Lennox is in the room. Adrian proposes a voluntary step-back from Q4 platform events, framed as a favour to the firm and to the protagonist. The ask is structurally a coup. The discipline is to refuse cleanly, naming the structural reason without escalating.",
  tier: "vip",
  track: "female",
  level: 15,
  order: 2,
  estimatedMinutes: 11,
  difficulty: "advanced",
  category: "social-dynamics",
  xpReward: 480,
  badgeId: "clean-refusal",
  startSceneId: "cold-open",
  prerequisites: ["mission-15-1"],
  isNew: true,
  tacticsLearned: [
    "Refusing a coup proposal without escalation",
    "Naming the structural reason without litigating the underlying issue",
    "Recognising the three-events-framing as a single-event ask",
    "Letting your structural ally not need to speak",
  ],
  redFlagsTaught: [
    "The voluntary step-back as a coup attempt",
    "The counter-propose trap that converts a refusal into precedent",
    "Agreeing to think about a coup as half the coup",
    "The favour-to-the-firm framing that asks you to absorb the cost",
  ],
  reward: {
    id: "clean-refusal",
    name: "The Clean Refusal",
    description:
      "Thirteen minutes in the Halberd library. The seat is the seat. The events are the events. Adrian did not raise it again. The Q4 calendar is firm.",
  },
  characters: [LENNOX, ADRIAN_VALE, HUGH, INNER_VOICE],
  scenes,
};

export default mission15_2;
