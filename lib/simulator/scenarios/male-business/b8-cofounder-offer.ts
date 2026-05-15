/**
 * Business Line. Mission 8 "The Cofounder Offer"
 *
 * Three weeks after b7. Wednesday, 11:47 am. Theo walks into your
 * office and shuts the door. He has not shut your door in eight
 * months. He has an offer from Tomas Reeves, a former LSE classmate
 * who is now CEO of a Series-C company in an adjacent space. The
 * package is twice his current. The title is validated. The vesting
 * starts at the senior officer band.
 *
 * The scenario is the mirror of b6. b6 taught humane termination.
 * b8 teaches humane retention, including the right answer that
 * might be go. The discipline taught: do not weaponise loyalty.
 * Do not inflate the counter. Offer him the picture, not the pitch.
 *
 * Handoff out: Theo's Friday answer + Saturday morning's email
 * from Tomas's network. b9 opens on the Saturday email.
 *
 * Pilot reference: `reference/b8-pilot.md`.
 */

import type { Scenario, Scene } from "../../types";
import { THEO, INNER_VOICE_M } from "../../characters-male";

const scenes: Scene[] = [
  {
    id: "cold-open",
    backgroundId: "office",
    mood: "professional",
    presentCharacterIds: ["theo"],
    dialog: [
      {
        speakerId: null,
        text: "Wednesday. 11:47 am. Your office. Theo walks in and shuts the door. He has not shut your door in eight months. The last time he shut it was the Vaughn term sheet conversation. You remember the click.",
      },
      {
        speakerId: null,
        text: "He sits in the chair across from your desk, not on the couch. The chair is the meeting chair. The couch is the conversation chair. He chose the chair.",
      },
      {
        speakerId: "inner-voice",
        tone: "tactical",
        text: "The chair is the data. Theo does the registers. He chooses the room he is going to have a conversation in by choosing the furniture he sits on. He is telling you this is going to be a meeting.",
      },
      {
        speakerId: "theo",
        emotion: "knowing",
        text: "I have an offer. I have not accepted. I am going to decide by Friday. I wanted to tell you Wednesday so the decision is made with you, not at you.",
      },
      {
        speakerId: "inner-voice",
        tone: "tactical",
        text: "Made with you, not at you. That is the sentence. Note it. Theo has just told you the entire framing of the next three minutes. He is offering you the room. He is also telling you he is going to decide either way.",
      },
    ],
    nextSceneId: "the-offer",
  },

  {
    id: "the-offer",
    backgroundId: "office",
    mood: "professional",
    presentCharacterIds: ["theo"],
    dialog: [
      {
        speakerId: "theo",
        emotion: "knowing",
        text: "Series C. Adjacent space, not a competitor. CEO is Tomas Reeves. I know him from the LSE days. The cheque is two-point-three times my current package.",
      },
      {
        speakerId: "theo",
        emotion: "knowing",
        text: "The title is validated CFO. The vesting starts at the senior officer band. They have offered the same package they offered the previous CFO. He left after six months for personal reasons. They want stability.",
      },
      {
        speakerId: "inner-voice",
        tone: "tactical",
        text: "Theo just delivered the offer the way he delivers a board presentation. Numbers first, then context, then the structural read. He has rehearsed this on the walk over. He has not rehearsed it twice.",
      },
      {
        speakerId: "theo",
        emotion: "knowing",
        text: "Tomas is not Vaughn-adjacent. I have checked. The cap table is clean. The board is one founder, two investors, one independent. The independent is Marisa Khoury. I respect her work.",
      },
      {
        speakerId: "theo",
        emotion: "knowing",
        text: "If I leave, I leave clean. Ninety-day transition. Two referrals I trust. I do not take any of our people. I have not looked at the offer with our CFO hat on. I have looked at it with the personal-decision hat on.",
      },
      {
        speakerId: "inner-voice",
        tone: "tactical",
        text: "The four sentences after he names the offer are the sentences that tell you who Theo is. He is naming the floor of the goodbye before you have agreed it is a goodbye.",
      },
      {
        speakerId: "inner-voice",
        tone: "tactical",
        text: "He is telling you he will not act in bad faith even in the scenario where you act in bad faith. Note that.",
      },
    ],
    nextSceneId: "the-pause",
  },

  {
    id: "the-pause",
    backgroundId: "office",
    mood: "tense",
    presentCharacterIds: ["theo"],
    dialog: [
      {
        speakerId: "inner-voice",
        tone: "tactical",
        text: "The instinct is to respond now. The instinct is to match, to inflate, to ask him what it would take, to remind him of the equity he has already vested, to point at the runway you have not yet closed.",
      },
      {
        speakerId: "inner-voice",
        tone: "tactical",
        text: "The instinct is the instinct of every founder who has lost their CFO this way.",
      },
      {
        speakerId: "inner-voice",
        tone: "tactical",
        text: "Take the pause. Three seconds. He has just spent six minutes preparing the room. You can spend three seconds sitting in it.",
      },
      {
        speakerId: null,
        text: "You count to three.",
      },
    ],
    nextSceneId: "the-choice",
  },

  {
    id: "the-choice",
    backgroundId: "office",
    mood: "tense",
    presentCharacterIds: ["theo"],
    dialog: [
      {
        speakerId: "inner-voice",
        tone: "tactical",
        text: "Now decide what you are doing in the next two minutes.",
      },
    ],
    choices: [
      {
        id: "honest-conversation",
        text: "Thank you for the way you did this. Tell me what you want from me right now. If you want me to make a case for staying, I will. If you want me to help you think it through honestly, I will. If you want me to just be quiet while you decide on your own, I will.",
        tactic:
          "Three offers, no assumed role. Match his framing. The retention conversation has not started yet. Ask what he is asking for.",
        isOptimal: true,
        event: "optimal-with-grace",
        nextSceneId: "path-a-honest-conversation",
      },
      {
        id: "inflate-counter",
        text: "Okay. I want to make a counter. Same vesting acceleration, higher equity grant on the next round, title bump to President. I can have HR draft something by 4:00. Will you read it tonight.",
        tactic:
          "The inflated counter. You have just performed the retention move every CFO has watched their previous company perform. The counter will read as the price tag on the relationship.",
        feedback:
          "He will take the counter to bed. He will not feel retained. He will feel priced.",
        nextSceneId: "path-b-inflate-and-match",
      },
      {
        id: "loyalty-tax",
        text: "Theo. After everything we have built together. You are telling me this on a Wednesday. The Series A is the most important year of this company. I cannot do it without you.",
        tactic:
          "The loyalty tax. You are about to weaponise the years of trust as currency in the retention. The move destroys the relationship whether he stays or leaves.",
        event: "failure-rejected",
        nextSceneId: "path-c-loyalty-tax",
      },
    ],
  },

  {
    id: "path-a-honest-conversation",
    backgroundId: "office",
    mood: "peaceful",
    presentCharacterIds: ["theo"],
    dialog: [
      {
        speakerId: "theo",
        emotion: "knowing",
        text: "Help me think it through. Honestly. I do not need a case for staying. I need to know what staying actually looks like in your head for the next eighteen months. Not the deck version. The actual version.",
      },
      {
        speakerId: "inner-voice",
        tone: "tactical",
        text: "He gave you the framing again. He does not want the retention pitch. He wants the picture. Most founders deliver the pitch anyway. The discipline is to deliver the picture.",
      },
      {
        speakerId: "inner-voice",
        text: "The actual version. Eighteen months from now I think we are either past Series A at a clean three-something valuation, or we have done a small bridge and stayed heads-down. In both versions you are still our CFO and our COO.",
      },
      {
        speakerId: "inner-voice",
        text: "In neither version is your package what Tomas is offering you today. We get there in three years instead of two.",
      },
      {
        speakerId: "inner-voice",
        text: "The clean version is: the personal calculus is real and Tomas's offer is real. If I were you, I would think about which version of your own life you are building. The bigger validated paycheque now, or the founding-team equity in two years.",
      },
      {
        speakerId: "inner-voice",
        text: "I cannot tell you which one is right. I can tell you that both versions of you exist and I will respect either one.",
      },
      {
        speakerId: "theo",
        emotion: "knowing",
        text: "Okay. Thank you. That was what I needed.",
      },
      {
        speakerId: null,
        text: "He gets up. He does not extend the meeting. He has the data. He leaves. Friday is two days away.",
      },
    ],
    nextSceneId: "ending-clean-conversation",
  },

  {
    id: "path-b-inflate-and-match",
    backgroundId: "office",
    mood: "professional",
    presentCharacterIds: ["theo"],
    dialog: [
      {
        speakerId: null,
        text: "HR drafts the counter by 4:00. The title is President. The grant is 1.5 percent. The acceleration vests on change of control. You email it at 5:47 pm. He reads it at 5:48. He does not respond until 9:14 pm.",
      },
      {
        speakerId: "theo",
        emotion: "neutral",
        text: "Got it. Thank you. I will read tonight. I will tell you Friday.",
      },
      {
        speakerId: null,
        text: "Friday at 10:00 am he is in your office again. He sits on the couch this time. The couch is the conversation chair.",
      },
      {
        speakerId: "theo",
        emotion: "knowing",
        text: "I am going to take Tomas's offer. I want to tell you why. The counter you sent on Wednesday told me you saw this as a negotiation. The thing I needed was to know you saw it as a decision.",
      },
      {
        speakerId: "theo",
        emotion: "knowing",
        text: "I am not certain you would have. I am not certain I would have. We have both been operating fast. I will do the ninety-day transition. I will refer two candidates by Monday.",
      },
      {
        speakerId: "inner-voice",
        tone: "tactical",
        text: "He is sorry. He is not wrong. The counter became the reading. The retention package read as the price tag. He chose the picture over the package because the package told him the picture was not available.",
        event: "tactic-named:inflated-counter",
      },
    ],
    nextSceneId: "ending-matched-and-held",
  },

  {
    id: "path-c-loyalty-tax",
    backgroundId: "office",
    mood: "cold",
    presentCharacterIds: ["theo"],
    dialog: [
      {
        speakerId: null,
        text: "You say the sentence. You say after everything we have built together. You say it in the voice you have used three times in your career for the moments you were trying to win on history.",
      },
      {
        speakerId: "theo",
        emotion: "cold",
        text: "Okay.",
      },
      {
        speakerId: null,
        text: "He does not respond beyond that. He stays in the chair for a beat. He stands. He nods. He leaves. The door does not click. He left it half-open.",
      },
      {
        speakerId: "inner-voice",
        tone: "tactical",
        text: "He did not say anything. He did not match the energy. He did not push back. He took the loyalty-tax sentence and filed it the way Noor filed the Liv reflex in d6.",
        event: "tactic-named:loyalty-tax",
      },
      {
        speakerId: "inner-voice",
        tone: "tactical",
        text: "He will not bring it up. He will not negotiate with it. He will leave Friday clean.",
      },
      {
        speakerId: null,
        text: "Friday at 10:14 am he sends a one-paragraph email. He accepts Tomas's offer. He offers the ninety-day transition. He signs off with his initials, not his name. He does not come to your office.",
      },
    ],
    nextSceneId: "ending-loyalty-tax",
  },

  {
    id: "ending-clean-conversation",
    backgroundId: "office",
    mood: "peaceful",
    isEnding: true,
    outcomeType: "good",
    endingTitle: "The Picture, Not The Pitch",
    endingSummary:
      "On Friday Theo accepted Tomas's offer. The ninety-day transition starts Monday. He referred Anika Patel as the lead candidate. The relationship is clean. The picture you offered on Wednesday matched the picture he built in his own head over the two days. He left because the picture, honestly described, said go. That is the answer the picture was always going to give. You made it available.",
    endingLearnPrompt:
      "Retention is not the same as the retention move. Some of the right retentions are clean goodbyes. The next time someone you care about brings you a real outside offer, ask what they want from the conversation before you decide what to offer.",
    dialog: [
      {
        speakerId: null,
        text: "Friday 10:14 am. Theo brings two referrals. Anika Patel is the lead candidate. The handoff is on a Google Doc you both read together for forty minutes.",
      },
      {
        speakerId: "theo",
        emotion: "knowing",
        text: "I will be in this office through July 31. After that, I will pick up if you call.",
      },
      {
        speakerId: null,
        text: "Saturday morning your inbox has an email from a sender you do not recognise. Subject line: Tomas's friend mentioned you. A Series-C operator wants to talk next month.",
      },
    ],
  },

  {
    id: "ending-matched-and-held",
    backgroundId: "office",
    mood: "professional",
    isEnding: true,
    outcomeType: "neutral",
    endingTitle: "The Counter Read As The Price",
    endingSummary:
      "Your inflated counter became the reading. Theo took the package as a price tag on the relationship. He chose the new picture because the package told him the old picture was not available. The ninety-day transition is clean. The friendship survives. The eight months of shorthand that produced the company are now closed.",
    endingLearnPrompt:
      "The counter is not a love language. The right retention is upstream of the package. Audit the last time you sent a retention counter that arrived faster than the conversation that produced it.",
    failureBlogSlug: "the-inflated-counter",
    failureBlogTitle: "Why the retention counter prices the relationship",
    dialog: [
      {
        speakerId: null,
        text: "Saturday morning. The email arrives. Tomas's friend mentioned you. The Series-C operator wants the meeting.",
      },
      {
        speakerId: "inner-voice",
        tone: "tactical",
        text: "Theo is visible to a network you did not have access to Thursday. The network has updated. You will know him as a different category of person from now on.",
      },
    ],
  },

  {
    id: "ending-loyalty-tax",
    backgroundId: "office",
    mood: "cold",
    isEnding: true,
    outcomeType: "bad",
    endingTitle: "The Loyalty Tax",
    endingSummary:
      "You weaponised eight months of shorthand. Theo filed it. He left Friday clean. He sent a one-paragraph email and did not come to your office. The relationship is intact in form. The texture has been adjusted permanently. The next time you have a hard conversation with someone who has been loyal, you will hear the sentence you said on Wednesday in your own voice and you will know what it cost.",
    endingLearnPrompt:
      "After everything we have built is a sentence that destroys what you have built. The history is not the leverage. The history is the thing being damaged by the sentence.",
    failureBlogSlug: "the-loyalty-tax",
    failureBlogTitle: "Why 'after everything we have built' is the move that ends what you built",
    dialog: [
      {
        speakerId: null,
        text: "Friday 10:14 am. The email arrives with Theo's initials at the bottom, not his name.",
      },
      {
        speakerId: "inner-voice",
        tone: "tactical",
        text: "The loyalty tax cost you the conversation Friday would have been. The relationship is still there. The texture has been adjusted. You will feel it in the meetings he is not in next quarter.",
      },
      {
        speakerId: null,
        text: "Saturday morning. The Tomas-network email arrives. You read it once. The temperature on the inbox today is cold.",
      },
    ],
  },
];

const businessMission8: Scenario = {
  id: "b8-cofounder-offer",
  title: "The Cofounder Offer",
  tagline:
    "Your CFO has a competitor offer. The right retention is upstream of the package.",
  description:
    "Wednesday 11:47 am. Theo shuts your door. He has an offer from Tomas Reeves at a Series-C in an adjacent space. The cheque is twice. The title is validated. The vesting starts at the senior band. He is telling you Wednesday so the decision is made with you, not at you. The discipline is to offer him the picture, not the pitch. Some of the right answers are 'go' said cleanly.",
  tier: "vip",
  track: "male-business",
  level: 8,
  order: 1,
  estimatedMinutes: 11,
  difficulty: "advanced",
  category: "business",
  xpReward: 340,
  badgeId: "picture-not-pitch",
  startSceneId: "cold-open",
  prerequisites: ["b7-board-seat"],
  isNew: true,
  tacticsLearned: [
    "Asking what the conversation is for before deciding what to offer",
    "Offering the picture not the pitch",
    "Naming the floor of the goodbye honestly",
    "Distinguishing retention from the retention move",
  ],
  redFlagsTaught: [
    "The inflated counter as a price tag on the relationship",
    "The loyalty tax: weaponising shorthand as currency",
    "Performing retention to a person who is past the retention conversation",
    "The retention package that arrives faster than the conversation that produced it",
  ],
  reward: {
    id: "picture-not-pitch",
    name: "The Picture, Not The Pitch",
    description:
      "Friday 10:14 am. Theo brought two referrals. The picture you offered Wednesday matched the picture he built over the two days. The relationship is clean.",
  },
  characters: [THEO, INNER_VOICE_M],
  scenes,
};

export default businessMission8;
