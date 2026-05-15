/**
 * Female Track. Mission 15-1 "The Partners' Table"
 *
 * October 14, 2:00 pm. Halberd Carrey, 14th floor. The first quarterly
 * partners' meeting since the protagonist accepted the senior advisory
 * seat. Lennox named the floor to two partners (Hugh and Sara) by
 * September 30. Adrian Vale has not been told. The other partners
 * have not been told.
 *
 * The scenario teaches holding a floor under pressure when the people
 * at the table do not know the floor exists. The teaching: when the
 * moment lands, you do not change your posture. You do not telegraph.
 * You do not preempt. The floor is the floor. The posture is the
 * posture. The two are not the same object.
 *
 * Handoff out: Adrian Vale's request for a 1:1 the following Tuesday.
 * L15-2 opens on the 1:1.
 *
 * Pilot reference: `reference/L15-1-pilot.md`.
 */

import type { Scenario, Scene } from "../types";
import {
  LENNOX,
  HUGH,
  SARA_MIN,
  ADRIAN_VALE,
  AVERY,
  INNER_VOICE,
} from "../characters";

const scenes: Scene[] = [
  {
    id: "cold-open",
    backgroundId: "office",
    mood: "professional",
    dialog: [
      {
        speakerId: null,
        text: "Tuesday. October 14. 1:42 pm. The elevator at Halberd Carrey, 14th floor. You are eighteen minutes early because you walked from the office across the park and the walk took less time than you had budgeted.",
      },
      {
        speakerId: null,
        text: "You are wearing the dark grey Loro Piana from L14-1. The same suit. Not on purpose. The morning told you which suit and you did not negotiate with the morning.",
      },
      {
        speakerId: "inner-voice",
        tone: "tactical",
        text: "Lennox named the floor to Hugh and Sara on Monday September 30. Two of the eight partners in the room know. The other six do not. Avery is not in this meeting. Adrian Vale is.",
      },
      {
        speakerId: "inner-voice",
        tone: "tactical",
        text: "The discipline is not about disclosure. The floor is disclosed where it needs to be. The discipline is posture. When the moment lands, you do not change your posture. You do not telegraph. You do not preempt.",
      },
    ],
    nextSceneId: "lennox-greets",
  },

  {
    id: "lennox-greets",
    backgroundId: "office",
    mood: "professional",
    presentCharacterIds: ["lennox"],
    dialog: [
      {
        speakerId: null,
        text: "Lennox meets you in the corridor at 1:48 pm. She has been here since 8:00 am. She has the slightly heightened colour of a person who has done six hours of work before lunch and has had a third coffee.",
      },
      {
        speakerId: "lennox",
        emotion: "knowing",
        text: "Hugh opens. Sara takes the agenda from item three. The room runs on time. Nine items. Adrian has the platform-marketing item at six. He will not raise anything I have not warned him about. He will not need to. The room will give him space if he wants it.",
      },
      {
        speakerId: "lennox",
        emotion: "knowing",
        text: "Your role today is to sit. Listen. Take notes if you take notes. Speak on item five when Hugh asks you. Anything else is up to you.",
      },
      {
        speakerId: "inner-voice",
        tone: "tactical",
        text: "She is not telling you what to do if the moment lands. She is telling you what the room looks like before the moment. The moment will land or it will not. The room is the room either way.",
      },
    ],
    nextSceneId: "the-room",
  },

  {
    id: "the-room",
    backgroundId: "office",
    mood: "tense",
    presentCharacterIds: ["hugh", "lennox", "sara-min", "adrian-vale"],
    dialog: [
      {
        speakerId: null,
        text: "2:00 pm. The partners' room. Walnut table, eight chairs around it plus four against the wall. You are at chair nine, on the wall side. Lennox put you there on purpose. The wall chairs are advisor chairs.",
      },
      {
        speakerId: null,
        text: "Eight partners around the table. Hugh at the head. Lennox at his right. Sara two seats down. Adrian Vale across the table from Lennox. He has not yet looked at you.",
      },
      {
        speakerId: "hugh",
        emotion: "knowing",
        text: "We have nine items. We start.",
      },
      {
        speakerId: "inner-voice",
        tone: "tactical",
        text: "Six words. The phrase Lennox said he opens every meeting with. The data is not new. The data is that the meeting is now structurally the meeting it would have been if you had been here for four years already.",
      },
    ],
    nextSceneId: "the-meeting-runs",
  },

  {
    id: "the-meeting-runs",
    backgroundId: "office",
    mood: "professional",
    presentCharacterIds: ["hugh", "lennox", "sara-min", "adrian-vale"],
    dialog: [
      {
        speakerId: null,
        text: "Item one: Q3 numbers. Twelve minutes. Item two: an LP relationship the firm has been managing for nineteen months. Eight minutes. Item three: the new fund timeline. Sara takes the agenda.",
      },
      {
        speakerId: null,
        text: "Item four: a portfolio company exit, executed last week, $340M. The partners discuss the post-close communications. Eleven minutes.",
      },
      {
        speakerId: null,
        text: "Item five. Hugh looks at you.",
      },
      {
        speakerId: "hugh",
        emotion: "knowing",
        text: "Our new advisor. I would like five minutes on the firm's diligence posture, specifically the part where we have been over-indexing on financial diligence and under-indexing on operating-team diligence. You have a view. Take five.",
      },
      {
        speakerId: null,
        text: "You take five. You do not take six. You do not take four. You give the view. Two examples. One specific recommendation. You finish at 2:54 pm. The room nods. Item six.",
      },
      {
        speakerId: "inner-voice",
        tone: "tactical",
        text: "The room received the work. Note that. The first item was not the floor. The first item was the work.",
      },
    ],
    nextSceneId: "the-pivot",
  },

  {
    id: "the-pivot",
    backgroundId: "office",
    mood: "tense",
    presentCharacterIds: ["adrian-vale", "lennox", "hugh"],
    dialog: [
      {
        speakerId: null,
        text: "Item six. Platform marketing. Adrian Vale opens.",
      },
      {
        speakerId: "adrian-vale",
        emotion: "cold",
        text: "Before the marketing piece I want to raise something tangentially related. There has been press coverage this year of senior women in the industry that the platform team should consider when planning the Q4 thought-leadership push.",
      },
      {
        speakerId: "adrian-vale",
        emotion: "cold",
        text: "I do not have a specific recommendation. I am naming the topic because the platform team's outreach in November will pass through environments where some of that coverage may be on people's minds. Whether we engage with it is the question. I am asking the room.",
      },
      {
        speakerId: "inner-voice",
        tone: "tactical",
        text: "He has not named you. He has not named the podcast. He has put a vague envelope on the table. The envelope is the question. The envelope is the moment.",
      },
      {
        speakerId: "inner-voice",
        tone: "tactical",
        text: "Lennox does not move. Hugh does not move. Sara is writing. The room is waiting to see who takes the envelope first.",
      },
    ],
    nextSceneId: "the-choice",
  },

  {
    id: "the-choice",
    backgroundId: "office",
    mood: "tense",
    presentCharacterIds: ["adrian-vale", "lennox", "hugh"],
    dialog: [],
    choices: [
      {
        id: "stay-on-agenda",
        text: "Address only the platform-marketing piece. The decision about which environments to enter is a platform-team decision and the platform team should make it on the data they have. The press coverage Adrian is gesturing at is not a Q4 thought-leadership consideration.",
        tactic:
          "Hold the floor by addressing only the on-topic part of the question. The off-topic part is Adrian's; let him have it without converting your posture to match it.",
        isOptimal: true,
        event: "optimal-with-grace",
        nextSceneId: "path-a-stay",
      },
      {
        id: "preempt",
        text: "Adrian, before we continue: some of the coverage you are referencing may include the piece in The Margin from August about my last six months. I want to name that so that the rest of this conversation has the full context.",
        tactic:
          "Preempt the implied question. You have just told the six partners who did not know the floor that there is a floor. Lennox spent the next eight weeks of capital on this preemption.",
        feedback:
          "The preemption looks brave. The cost is that you converted the floor from a confidential disclosure into a partners'-table topic.",
        nextSceneId: "path-b-preempt",
      },
      {
        id: "defensive",
        text: "Adrian, I want to be clear that the coverage you are referencing does not reflect a substantive issue. It was a podcast episode that closed within a three-day news cycle. If the platform team is hesitant because of it, we should address that directly now.",
        tactic:
          "Defend. The L4 register surfaces. You have turned the off-topic gesture into the on-topic discussion, and you have done it with a defensive frame that gives Adrian everything he was hoping to be given.",
        event: "failure-rejected",
        nextSceneId: "path-c-respond-defensively",
      },
    ],
  },

  {
    id: "path-a-stay",
    backgroundId: "office",
    mood: "professional",
    presentCharacterIds: ["adrian-vale", "lennox", "hugh"],
    dialog: [
      {
        speakerId: null,
        text: "You say the four sentences. You do not look at Adrian when you say the second one. You look at Sara, who has the platform-marketing decision authority. Sara nods once.",
      },
      {
        speakerId: "sara-min",
        emotion: "knowing",
        text: "Agreed. The Q4 push is based on the data we have, not on the environments the team enters. Adrian, if you have a specific environment concern we should look at, send it to me by Friday and I will route it.",
      },
      {
        speakerId: "adrian-vale",
        emotion: "neutral",
        text: "I do not have a specific concern. I was raising the general one.",
      },
      {
        speakerId: "hugh",
        emotion: "knowing",
        text: "Then we move on. Item seven.",
      },
      {
        speakerId: "inner-voice",
        tone: "tactical",
        text: "The room moved. Adrian did not get the conversation he was hoping for. He did not get a confrontation. He did not get an admission. He got a Sara-routed Friday email he is not going to send because the email would require a specific concern he does not have.",
      },
      {
        speakerId: "inner-voice",
        tone: "tactical",
        text: "Lennox does not look at you. She does not need to. The floor is the floor. The posture is the posture. The two are not the same object and the room just learned which one of them you are.",
      },
    ],
    nextSceneId: "ending-the-floor-held",
  },

  {
    id: "path-b-preempt",
    backgroundId: "office",
    mood: "tense",
    presentCharacterIds: ["adrian-vale", "lennox", "hugh"],
    dialog: [
      {
        speakerId: null,
        text: "You name the piece in The Margin. Six of the eight partners in the room learn the floor exists. Lennox stops writing.",
      },
      {
        speakerId: "hugh",
        emotion: "knowing",
        text: "Thank you for naming it. We will continue with the platform-marketing piece. The August coverage is on the record and is not the agenda today.",
      },
      {
        speakerId: "inner-voice",
        tone: "tactical",
        text: "Hugh has just done the move you should have done. He has put the envelope back. The room moves to item seven. Adrian does not return to the topic.",
      },
      {
        speakerId: "inner-voice",
        tone: "tactical",
        text: "The cost is that Lennox now spends the next eight weeks doing the work she did not need to do, which is managing the six partners who learned the floor in the room rather than in private. Each of them has a question. Each question is small. Together they are eight weeks of Lennox's capital.",
        event: "tactic-named:preemptive-disclosure",
      },
    ],
    nextSceneId: "ending-the-preemption",
  },

  {
    id: "path-c-respond-defensively",
    backgroundId: "office",
    mood: "danger",
    presentCharacterIds: ["adrian-vale", "lennox", "hugh"],
    dialog: [
      {
        speakerId: "adrian-vale",
        emotion: "neutral",
        text: "I appreciate the clarity. I think the platform team should have the context. Let us discuss how we communicate to clients in November who may have heard the coverage.",
      },
      {
        speakerId: "inner-voice",
        tone: "tactical",
        text: "He took the door you opened. The platform-marketing item just became a fifteen-minute discussion of you. Lennox is at the table while it happens. Hugh is at the table while it happens. The other five partners are now in the meeting they did not know they were in.",
      },
      {
        speakerId: "inner-voice",
        tone: "tactical",
        text: "The room arrives at item seven nineteen minutes late. The agenda recovers. The floor did not. The L4 register surfaced at the partners' table.",
      },
    ],
    nextSceneId: "ending-the-defense-surfaced",
  },

  {
    id: "ending-the-floor-held",
    backgroundId: "office",
    mood: "professional",
    isEnding: true,
    outcomeType: "good",
    endingTitle: "The Floor Held",
    endingSummary:
      "Four sentences. Sara routed the envelope. Adrian did not have a specific concern. The meeting moved on. Lennox did not look at you. The floor is the floor. The posture is the posture. The two are not the same object and the partners' table now knows which one of them you are.",
    endingLearnPrompt:
      "Holding a floor under pressure is not the same as preempting the question. The posture that does not change is the work. Note the next time a vague gesture is put on a table near you. Whose envelope is it. Yours, or the person who put it there.",
    dialog: [
      {
        speakerId: null,
        text: "The meeting closes at 4:18 pm. Lennox walks you to the elevator. She does not say anything in the corridor.",
      },
      {
        speakerId: "lennox",
        emotion: "knowing",
        text: "Adrian will request a 1:1 by Friday. I will be in the room with you if you want me there. Either is fine. Think on it.",
      },
      {
        speakerId: "inner-voice",
        tone: "tactical",
        text: "He will request a 1:1. He has to. The room did not give him the conversation. He will need to ask for it. L15-2 will be the 1:1.",
      },
    ],
  },

  {
    id: "ending-the-preemption",
    backgroundId: "office",
    mood: "professional",
    isEnding: true,
    outcomeType: "neutral",
    endingTitle: "The Preemption",
    endingSummary:
      "You named the floor. Hugh handled it cleanly in the room. The agenda recovered. The eight weeks Lennox now spends managing the six partners who learned the floor in the room rather than in private are the cost. The relationship is intact. The bevel is not small.",
    endingLearnPrompt:
      "Preemptive disclosure looks brave because it feels brave. The cost is invisible to the discloser. It is paid by the people doing the diligence-on-diligence behind the scenes. Audit the next time you reach for a preemptive disclosure in a room where the floor was already held in private.",
    failureBlogSlug: "the-preemptive-disclosure",
    failureBlogTitle: "Why preempting a vague gesture spends your partner's capital",
    dialog: [
      {
        speakerId: "lennox",
        emotion: "knowing",
        text: "Adrian will request a 1:1 anyway. He has to. The room did not give him what he wanted, even after you tried. Friday.",
      },
    ],
  },

  {
    id: "ending-the-defense-surfaced",
    backgroundId: "office",
    mood: "cold",
    isEnding: true,
    outcomeType: "bad",
    endingTitle: "The Defense Surfaced",
    endingSummary:
      "You took Adrian's envelope and made it the agenda. The platform-marketing item became a fifteen-minute discussion of you. The room arrived at item seven nineteen minutes late. The L4 register surfaced at the partners' table. The floor is no longer the floor. The floor is now the topic.",
    endingLearnPrompt:
      "When a vague gesture is on the table, the defense is the conversion. Naming a substantive issue gives the gesturer the substance they were missing. Note the next time someone gestures vaguely and your nervous system reaches to clarify.",
    failureBlogSlug: "the-defense-at-the-partners-table",
    failureBlogTitle: "Why defending a vague gesture is how you make it specific",
    dialog: [
      {
        speakerId: "lennox",
        emotion: "knowing",
        text: "Adrian will request a 1:1. The 1:1 will be the second meeting today. I will be in the room. Tomorrow.",
      },
    ],
  },
];

const mission15_1: Scenario = {
  id: "mission-15-1",
  title: "The Partners' Table",
  tagline:
    "October 14. The first quarterly partners' meeting. The floor is in the room. The posture is in the room. They are not the same object.",
  description:
    "Halberd Carrey, 14th floor. Hugh opens. Item six is platform marketing. Adrian Vale puts a vague envelope on the table. The discipline is to hold the floor without converting your posture to match the gesture. Lennox named the floor to Hugh and Sara on September 30. The other six partners do not know. The work is what you do not do.",
  tier: "vip",
  track: "female",
  level: 15,
  order: 1,
  estimatedMinutes: 12,
  difficulty: "advanced",
  category: "social-dynamics",
  xpReward: 460,
  badgeId: "floor-held",
  startSceneId: "cold-open",
  prerequisites: ["mission-14-2"],
  isNew: true,
  tacticsLearned: [
    "Holding a floor under pressure without changing posture",
    "Routing a vague gesture back to its rightful agenda owner",
    "Distinguishing the floor from the posture",
    "Letting a confidential disclosure stay confidential in the room",
  ],
  redFlagsTaught: [
    "Preemptive disclosure as the move that spends your partner's capital",
    "Defensive conversion of a vague gesture into a specific topic",
    "Telegraphing the floor by adjusting posture at the partners' table",
    "Treating the room as the right place for a disclosure already done in private",
  ],
  reward: {
    id: "floor-held",
    name: "The Floor Held",
    description:
      "Four sentences. Sara routed the envelope. Adrian did not have a specific concern. The meeting moved on. The room learned which one of you the posture is.",
  },
  characters: [LENNOX, HUGH, SARA_MIN, ADRIAN_VALE, AVERY, INNER_VOICE],
  scenes,
};

export default mission15_1;
