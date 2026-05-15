/**
 * Dating Line. Mission 12 "The October Telling"
 *
 * October 11. Yasmin flew in from London on Friday morning. She has
 * completed the first round of chemotherapy and is in remission for
 * three weeks of the cycle. She arrived at the apartment at 11:00 am.
 * Noor has cleared the weekend. The conversation she does not yet
 * know is coming is at 2:00 pm.
 *
 * Yasmin asked the protagonist to be in the next room when she tells
 * Noor. She did not ask him to be in the room. The discipline taught:
 * be exactly what was prepared for. Do not perform. Do not fix. Do
 * not author the next twelve weeks for them.
 *
 * Handoff out: the rest of October, the weeks Noor and Yasmin will
 * spend in the new structure.
 *
 * Pilot reference: `reference/d12-pilot.md`.
 */

import type { Scenario, Scene } from "../../types";
import { NOOR, INNER_VOICE_M } from "../../characters-male";
import type { Character } from "../../types";

const YASMIN: Character = {
  id: "yasmin",
  name: "Yasmin Rahimi",
  description:
    "Noor's mother. Same Yasmin. Six weeks past d10's lunch. Four weeks past d11's birthday. Three weeks into chemotherapy, in the remission window of the cycle. The conversation she has built toward since July is at 2:00 pm.",
  traits: ["precise", "consenting", "long-view"],
  defaultEmotion: "serious",
  gender: "female",
  personalityType: "mentor",
  silhouetteType: "female-elegant",
};

const scenes: Scene[] = [
  {
    id: "cold-open",
    backgroundId: "apartment",
    mood: "tense",
    dialog: [
      {
        speakerId: null,
        text: "Saturday. October 11. 1:54 pm. Your apartment. Yasmin is in the living room with Noor. You are in the next room, the small one Noor uses as an office. The door is open three inches. You are reading the same book you were reading at 6:14 am the morning of d6.",
      },
      {
        speakerId: "inner-voice",
        tone: "tactical",
        text: "Six weeks since La Bonne Soupe. Four weeks since Frankies. Three weeks into chemotherapy. The remission window of the cycle is the reason Yasmin flew this weekend instead of next. The conversation she has built toward since July is at 2:00 pm.",
      },
      {
        speakerId: "inner-voice",
        tone: "tactical",
        text: "She said this morning: I will call you in when it is time to call you in. Or I will not. Both will be the right shape. The discipline is to make that statement structurally true.",
      },
    ],
    nextSceneId: "they-begin",
  },

  {
    id: "they-begin",
    backgroundId: "apartment",
    mood: "cold",
    dialog: [
      {
        speakerId: null,
        text: "2:00 pm exactly. You hear Yasmin's first sentence through the partially open door.",
      },
      {
        speakerId: "yasmin",
        emotion: "serious",
        text: "I want to tell you something. I have been waiting until today to tell you because I wanted to tell you in the version where I have already started the work, not the version where I am just beginning.",
      },
      {
        speakerId: null,
        text: "There is a pause. Then Noor's voice, lower than her ordinary register.",
      },
      {
        speakerId: "noor",
        emotion: "concerned",
        text: "Okay. Tell me.",
      },
      {
        speakerId: "yasmin",
        emotion: "serious",
        text: "Two months before your birthday I was diagnosed with stage three ovarian cancer. I have completed the first cycle of chemotherapy. I am in the remission window now, which is why I flew this weekend. The protocol is six cycles. The surgery is in February.",
      },
      {
        speakerId: null,
        text: "Through the door you hear the sound of Noor putting her cup down on the coffee table. The cup ticks against the wood. The cup is not full enough to make the kind of sound a full cup makes. The cup is the data.",
      },
      {
        speakerId: "inner-voice",
        tone: "tactical",
        text: "You are not in the room. You have been preparing for three months for the room. The discipline of not being in the room when not called is the same discipline as being in the room when called. Yasmin built the line about the cup-tick into the room. You have been hearing what she built.",
      },
    ],
    nextSceneId: "the-choice",
  },

  {
    id: "the-choice",
    backgroundId: "apartment",
    mood: "tense",
    dialog: [
      {
        speakerId: "inner-voice",
        tone: "tactical",
        text: "It is 2:08 pm. Yasmin has not called you in. The conversation in the next room is continuing. You can hear it without making out the words. Three openings.",
      },
    ],
    choices: [
      {
        id: "be-here",
        text: "Sit at the small desk. Keep reading the book. Do not enter unless Yasmin calls you in. If she calls, go.",
        tactic:
          "Be here. Yasmin set the rule this morning: she will call you in or she will not. Both are the right shape. The discipline is to make her rule structurally true by being available without imposing.",
        isOptimal: true,
        event: "optimal-with-grace",
        nextSceneId: "path-a-be-here",
      },
      {
        id: "knock-uncalled",
        text: "At 2:08, knock and ask if there is anything you can do. Be brief. Then return to the next room.",
        tactic:
          "Knock uncalled. The instinct is to demonstrate availability by performing it. Yasmin's rule already made you available. The knock is for you, not for them.",
        feedback:
          "Yasmin will say thank you, please go back. The visible interruption is the bevel.",
        nextSceneId: "path-b-knock-uncalled",
      },
      {
        id: "leave-the-apartment",
        text: "Leave for a walk so they have more privacy than they asked for. Text Yasmin you are around the corner if needed.",
        tactic:
          "Leave the apartment. Under-attention as compensation. The d11 register transposed. Yasmin asked you to be in the next room. She did not ask you to be on the next block.",
        event: "failure-rejected",
        nextSceneId: "path-c-leave-the-apartment",
      },
    ],
  },

  {
    id: "path-a-be-here",
    backgroundId: "apartment",
    mood: "cold",
    dialog: [
      {
        speakerId: null,
        text: "You sit. You read. You keep reading. The book is John Berger. You have been on the same page for twenty-one minutes. You do not turn the page.",
      },
      {
        speakerId: null,
        text: "At 2:14 pm Yasmin calls you in. Her voice is calm. The voice she uses is the voice she used at La Bonne Soupe.",
      },
      {
        speakerId: "yasmin",
        emotion: "serious",
        text: "Come in. We need you.",
      },
      {
        speakerId: null,
        text: "You walk in. Noor is on the couch, crying quietly. She is holding Yasmin's hand. Yasmin looks at you for one second longer than she usually does. Then she nods to the chair across from the couch.",
      },
      {
        speakerId: "yasmin",
        emotion: "knowing",
        text: "I asked her if she wanted you here. She said yes. Sit.",
      },
      {
        speakerId: null,
        text: "You sit. You do not say anything for forty-three seconds.",
      },
      {
        speakerId: "inner-voice",
        tone: "tactical",
        text: "Forty-three seconds is a long time in a room. The work is the silence. Yasmin built the room so that the silence is acceptable. Noor is holding her mother's hand. You are the third person in the room. You are not the work. The work is what is already happening.",
      },
      {
        speakerId: "noor",
        emotion: "sad",
        text: "How long have you known.",
      },
      {
        speakerId: "inner-voice",
        text: "She told me on July 5. The lunch on the 14th was moved up to the 5th. I have known three months and one week. She asked me to be a steady person for the conversation today. That is the only role I have had. I will keep having it for as long as it is useful.",
      },
      {
        speakerId: null,
        text: "Noor nods. She does not say anything for a long beat. Then she nods again.",
      },
      {
        speakerId: "noor",
        emotion: "sad",
        text: "Okay. Thank you for that. Sit. Just sit.",
      },
      {
        speakerId: "inner-voice",
        tone: "tactical",
        text: "The discipline is the not-doing. The room is the room you have been preparing for. The steadiness is not a verb. It is a chair you are sitting in.",
      },
    ],
    nextSceneId: "ending-sat-and-stayed",
  },

  {
    id: "path-b-knock-uncalled",
    backgroundId: "apartment",
    mood: "professional",
    dialog: [
      {
        speakerId: null,
        text: "2:08 pm. You knock once. You wait. Yasmin opens the door three inches. Her face is the face she wears in conversations she has prepared for and is now eight minutes into.",
      },
      {
        speakerId: "yasmin",
        emotion: "serious",
        text: "Thank you. Please go back. I will call you when it is time.",
      },
      {
        speakerId: "inner-voice",
        tone: "tactical",
        text: "She said the same words at the same volume. She closed the door. The interruption took eleven seconds. The interruption was not zero. The interruption signalled to Noor that something was being managed in the next room that she did not yet have the picture of.",
        event: "tactic-named:visible-interruption",
      },
      {
        speakerId: null,
        text: "At 2:16 pm, slightly later than the optimal path's 2:14 because the interruption pushed the conversation's pace by ninety seconds, Yasmin calls you in. You enter. You sit.",
      },
      {
        speakerId: "noor",
        emotion: "sad",
        text: "How long have you known.",
      },
      {
        speakerId: "inner-voice",
        text: "Since July 5. The lunch was the moved-up version.",
      },
      {
        speakerId: "noor",
        emotion: "neutral",
        text: "Okay. Did you knock on the door at 2:08.",
      },
      {
        speakerId: "inner-voice",
        tone: "tactical",
        text: "She noticed. She is naming it without naming it. The bevel is now in the room with the three of you. It is small. It is also there.",
      },
    ],
    nextSceneId: "ending-knocked-uncalled",
  },

  {
    id: "path-c-leave-the-apartment",
    backgroundId: "apartment",
    mood: "cold",
    dialog: [
      {
        speakerId: null,
        text: "2:01 pm. You text Yasmin from the hallway. I am going around the corner. I will be at the cafe on Atlantic. Text me when you need me. You leave the apartment.",
      },
      {
        speakerId: null,
        text: "You sit at the cafe for forty minutes. You order a coffee you do not drink. You watch the door of the apartment building across the street. You are aware that your nervous system is treating the cafe like a panic room.",
      },
      {
        speakerId: "inner-voice",
        tone: "tactical",
        text: "Yasmin texts at 2:38 pm. Come back. The text is one sentence. The not-asking-you-to-come-back-sooner is the data.",
        event: "tactic-named:over-privacy-as-absence",
      },
      {
        speakerId: null,
        text: "You return at 2:47 pm. Noor and Yasmin are on the couch. Noor has stopped crying. The room is quieter than it would have been at 2:14. The moment has passed without you in it.",
      },
      {
        speakerId: "noor",
        emotion: "neutral",
        text: "You left.",
      },
      {
        speakerId: "inner-voice",
        text: "I thought you needed privacy.",
      },
      {
        speakerId: "noor",
        emotion: "neutral",
        text: "She asked you to be in the next room. You were not in the next room. The next room is the structure she built. You decided you knew better than the structure.",
      },
      {
        speakerId: "yasmin",
        emotion: "knowing",
        text: "It is okay. Sit. We are not going to litigate the choice. The work of the next twelve weeks is still the work.",
      },
    ],
    nextSceneId: "ending-walked-away",
  },

  {
    id: "ending-sat-and-stayed",
    backgroundId: "apartment",
    mood: "peaceful",
    isEnding: true,
    outcomeType: "good",
    endingTitle: "Sat And Stayed",
    endingSummary:
      "The 2:14 call-in. Forty-three seconds of silence. Noor's question. The honest one-sentence answer. The chair you sat in for ninety more minutes without making the room about you. The three months of August practice were for these ninety minutes. The discipline was the not-doing. The room held.",
    endingLearnPrompt:
      "Steadiness in a hard room is a chair, not a verb. Audit the last hard room you were in. Did you sit in the chair, or did you author the room into a different shape because the chair felt insufficient?",
    dialog: [
      {
        speakerId: null,
        text: "At 5:00 pm Noor walks her mother back to the hotel. You stay at the apartment. You wash the cups. You replace the John Berger on the shelf. You make dinner for two for the time Noor returns.",
      },
      {
        speakerId: "yasmin",
        emotion: "knowing",
        text: "Text at 6:14 pm: That was the right shape. The next twelve weeks will be the next twelve weeks. Sunday brunch at the hotel before my Tuesday flight. Yasmin.",
      },
    ],
  },

  {
    id: "ending-knocked-uncalled",
    backgroundId: "apartment",
    mood: "professional",
    isEnding: true,
    outcomeType: "neutral",
    endingTitle: "The Knock Uncalled",
    endingSummary:
      "You knocked at 2:08. Yasmin said please go back. Noor noticed. She named the noticing later, gently. The bevel is in the room with the three of you. It is small. The October work begins with a small bevel. The August practice will need to extend by two more dinners to compensate.",
    endingLearnPrompt:
      "Visible interruption to perform availability is the failure mode of trying. The next time you are in the next room waiting to be called in, ask whether the call-in is the goal or whether the not-needing-to-be-called-in is the goal.",
    failureBlogSlug: "the-visible-interruption",
    failureBlogTitle: "Why knocking on the door to demonstrate availability is the interruption that breaks the room",
    dialog: [
      {
        speakerId: "yasmin",
        emotion: "knowing",
        text: "Text at 6:48 pm: The room held. The knock was a small thing. We will keep working. Sunday brunch at the hotel before my Tuesday flight. Yasmin.",
      },
    ],
  },

  {
    id: "ending-walked-away",
    backgroundId: "apartment",
    mood: "cold",
    isEnding: true,
    outcomeType: "bad",
    endingTitle: "The Cafe On Atlantic",
    endingSummary:
      "You left the apartment at 2:01 pm. You sat in a cafe forty minutes. Yasmin texted at 2:38. You returned at 2:47, after the moment that was the meeting of the year. Noor named the leaving as a decision to know better than the structure. Yasmin closed the conversation cleanly. The next twelve weeks of work just got six weeks of recovery added to the front.",
    endingLearnPrompt:
      "Over-privacy is under-attention in a different jacket. The next time you reach to leave the room to give people more space than they asked for, ask whether the leaving is for them or for your own nervous system.",
    failureBlogSlug: "the-cafe-on-atlantic",
    failureBlogTitle: "Why leaving the apartment to give them privacy is under-attention dressed as respect",
    dialog: [
      {
        speakerId: "yasmin",
        emotion: "knowing",
        text: "Text at 9:14 pm: The room held even with the gap. The next twelve weeks of work are now also the work of repairing the gap. Brunch Sunday. We will discuss. Yasmin.",
      },
    ],
  },
];

const datingMission12: Scenario = {
  id: "d12-the-october-telling",
  title: "The October Telling",
  tagline:
    "Yasmin tells Noor at 2:00 pm. You are in the next room. The discipline is the not-doing.",
  description:
    "Saturday October 11. Yasmin flew in from London Friday morning. She is in the remission window of the chemotherapy cycle. She has prepared the conversation for three months. The protagonist has prepared to be in the next room for three months. The discipline at 2:00 pm is to be exactly what was prepared for. Yasmin will call you in when it is time, or she will not.",
  tier: "vip",
  track: "male-dating",
  level: 12,
  order: 1,
  estimatedMinutes: 11,
  difficulty: "advanced",
  category: "dating",
  xpReward: 460,
  badgeId: "sat-and-stayed",
  startSceneId: "cold-open",
  prerequisites: ["d11-noors-birthday"],
  isNew: true,
  tacticsLearned: [
    "Being available without performing availability",
    "Sitting in a hard room without making it about you",
    "Letting the secret-holder set the structural rule and trusting it",
    "Answering an honest question with the honest sentence",
  ],
  redFlagsTaught: [
    "Knocking uncalled as visible interruption",
    "Leaving the apartment as over-privacy that becomes under-attention",
    "Authoring the room into a different shape because the chair feels insufficient",
    "Treating steadiness as a verb instead of a chair",
  ],
  reward: {
    id: "sat-and-stayed",
    name: "Sat And Stayed",
    description:
      "The 2:14 call-in. Forty-three seconds of silence. The chair you sat in for ninety more minutes without making the room about you.",
  },
  characters: [NOOR, YASMIN, INNER_VOICE_M],
  scenes,
};

export default datingMission12;
