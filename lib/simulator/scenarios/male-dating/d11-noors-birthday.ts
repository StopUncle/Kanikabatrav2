/**
 * Dating Line. Mission 11 "Noor's Birthday"
 *
 * August 28. Frankies 457, Cobble Hill. Noor's birthday dinner. Per
 * Yasmin's L10 handoff: "In August we will see each other twice. Once
 * at the twenty-eighth, for Noor's birthday." Yasmin flies back to
 * London on the thirty-first. This is the first of two August dinners
 * and the only one with Noor at the table.
 *
 * Noor does not know about the diagnosis. The protagonist knows.
 * Yasmin knows. The discipline taught: be exactly the person who was
 * at the bench at d9. Do not telegraph. Do not compensate. Do not
 * over-attend to Yasmin. Do not under-attend.
 *
 * Handoff out: Yasmin's text Friday morning, August 30. d12 opens on
 * the text.
 *
 * Pilot reference: `reference/d11-pilot.md`.
 */

import type { Scenario, Scene } from "../../types";
import { NOOR, INNER_VOICE_M } from "../../characters-male";
import type { Character } from "../../types";

const YASMIN: Character = {
  id: "yasmin",
  name: "Yasmin Rahimi",
  description:
    "Noor's mother. Same Yasmin as d10. The lunch was three weeks ago. The thirty-day frame is now in week four. She is doing what she said she would do, which is be exactly herself in the August dinners.",
  traits: ["precise", "consenting", "long-view"],
  defaultEmotion: "knowing",
  gender: "female",
  personalityType: "mentor",
  silhouetteType: "female-elegant",
};

const scenes: Scene[] = [
  {
    id: "cold-open",
    backgroundId: "restaurant",
    mood: "peaceful",
    dialog: [
      {
        speakerId: null,
        text: "Wednesday. August 28. 6:38 pm. You are walking from the F train to Frankies 457 on Court Street. Noor's birthday. The restaurant has been on your list since 2023. Yasmin chose it on the basis of a New York Times review from 2014.",
      },
      {
        speakerId: null,
        text: "You arrive at 6:48. Yasmin is at the table. She has been here since 6:30, which is twenty-five minutes before the reservation, which is the kind of person Yasmin has been since the lunch on July 5.",
      },
      {
        speakerId: "inner-voice",
        tone: "tactical",
        text: "Eight weeks since the diagnosis. Six weeks since La Bonne Soupe. Three weeks until the September 13 first chemotherapy. Yasmin is in London for the rest of August after Saturday. The August dinners are the practice.",
      },
      {
        speakerId: "inner-voice",
        tone: "tactical",
        text: "The discipline tonight is not what you do. The discipline is what you do not do. Do not over-attend. Do not under-attend. Be the person who was at the bench. Yasmin is doing the same exercise.",
      },
    ],
    nextSceneId: "the-arrival",
  },

  {
    id: "the-arrival",
    backgroundId: "restaurant",
    mood: "peaceful",
    presentCharacterIds: ["yasmin"],
    dialog: [
      {
        speakerId: null,
        text: "Yasmin stands. She kisses you on each cheek. She is wearing the grey wool dress from La Bonne Soupe, in lighter weight, which she had altered in London for the August warmth. The tortoiseshell clip is in her hair.",
      },
      {
        speakerId: "yasmin",
        emotion: "knowing",
        text: "You are twelve minutes early. So am I. Good. Noor will be exactly on time. I ordered the bread and oil to be at the table when she sits.",
      },
      {
        speakerId: null,
        text: "She sits. She does not initiate any topic. She watches the door. She is the kind of person whose preparation includes the bread and oil being at the table when her daughter sits down.",
      },
      {
        speakerId: "inner-voice",
        tone: "tactical",
        text: "She is teaching you the discipline in real time. She booked the table. She arrived early. She ordered the bread. She is wearing the same clothes she wore at the lunch. She has chosen to be exactly herself. The not-different is the work.",
      },
    ],
    nextSceneId: "noor-arrives",
  },

  {
    id: "noor-arrives",
    backgroundId: "restaurant",
    mood: "peaceful",
    presentCharacterIds: ["yasmin", "noor"],
    dialog: [
      {
        speakerId: null,
        text: "Noor arrives at 7:00 pm. Exactly. She is wearing the navy dress you have not seen before, which Yasmin sent her from London in June. Her hair is up.",
      },
      {
        speakerId: "noor",
        emotion: "happy",
        text: "Hi. Hi. You are both early. Why are you both early. I am the birthday person and I am not even on time.",
      },
      {
        speakerId: "yasmin",
        emotion: "knowing",
        text: "We are early because Cobble Hill rewards the early. Sit. The bread is fresh.",
      },
      {
        speakerId: null,
        text: "The waiter takes drink orders. The conversation runs at the level Yasmin set: ordinary, attentive, present. Noor talks about Wednesday's investor meeting and the call her father made from Beirut at 4:00 am to wish her a happy birthday three minutes early because the time zones confused him.",
      },
      {
        speakerId: "inner-voice",
        tone: "tactical",
        text: "Yasmin is doing the work. The work is being the person Noor's mother always was. The accumulating eight weeks of diagnosis are not on her face. They are on her hands, which fold and unfold once at the start of every new topic. Noor will notice this in retrospect, in October. She does not notice it tonight. That is the point.",
      },
    ],
    nextSceneId: "the-toast",
  },

  {
    id: "the-toast",
    backgroundId: "restaurant",
    mood: "tense",
    presentCharacterIds: ["yasmin", "noor"],
    dialog: [
      {
        speakerId: null,
        text: "8:14 pm. The mains have been cleared. The waiter brings the second bottle of wine because Yasmin asked for it before he could ask. Noor lifts her glass.",
      },
      {
        speakerId: "noor",
        emotion: "happy",
        text: "I want to do a toast. Not the cheesy kind. I am not going to make us cry.",
      },
      {
        speakerId: "noor",
        emotion: "happy",
        text: "To my mother, who flew here for ten days, and to my husband, who has been quietly preparing me to be married for the last six months without my having noticed.",
      },
      {
        speakerId: null,
        text: "Yasmin lifts her glass. She does not look at you while she lifts it. She looks at Noor. She says one line back.",
      },
      {
        speakerId: "yasmin",
        emotion: "knowing",
        text: "I have been preparing myself for you also.",
      },
      {
        speakerId: "inner-voice",
        tone: "tactical",
        text: "Yasmin's line is calibrated. It lands as a mother's warmth to Noor. It lands as something else to you. She has just told you, in the same line Noor heard as a maternal toast, that she has been preparing herself for the diagnosis and that she has been preparing you to be the steady one. Two audiences. One sentence. Noor reads warmth. You read instruction.",
      },
      {
        speakerId: "inner-voice",
        tone: "tactical",
        text: "Three openings. The next move sets the table for the second hour.",
      },
    ],
    nextSceneId: "the-choice",
  },

  {
    id: "the-choice",
    backgroundId: "restaurant",
    mood: "tense",
    presentCharacterIds: ["yasmin", "noor"],
    dialog: [],
    choices: [
      {
        id: "be-ordinary",
        text: "Lift your glass. Say to both of you. Smile. Drink. Do not say more.",
        tactic:
          "Be ordinary. Yasmin's line is the line. Adding to it converts the calibration she built. The not-saying is the work.",
        isOptimal: true,
        event: "optimal-with-grace",
        nextSceneId: "path-a-ordinary",
      },
      {
        id: "over-attend",
        text: "Lift your glass. Say to Yasmin, who is the reason this dinner exists tonight, and to Noor, who is the reason all of us are. Add a sentence.",
        tactic:
          "Over-attend. The instinct is to give Yasmin a thank-you that you cannot deliver in plain sight. The thank-you converts the table to a thank-you. Yasmin built the dinner to be a dinner, not a thank-you.",
        feedback:
          "Yasmin will smile graciously. Noor will not notice. The bevel will be on the next two August dinners.",
        nextSceneId: "path-b-overcompensate",
      },
      {
        id: "under-attend",
        text: "Lift your glass. Say to Noor. Drink. Do not include Yasmin in the response.",
        tactic:
          "Under-attend. You compensated for the over-attention instinct by going small. The under-attention is the visible move. Yasmin notices. Noor notices.",
        event: "failure-rejected",
        nextSceneId: "path-c-undertend",
      },
    ],
  },

  {
    id: "path-a-ordinary",
    backgroundId: "restaurant",
    mood: "peaceful",
    presentCharacterIds: ["yasmin", "noor"],
    dialog: [
      {
        speakerId: "inner-voice",
        text: "To both of you.",
      },
      {
        speakerId: null,
        text: "You drink. Yasmin drinks. Noor drinks. The conversation moves to the dessert menu within forty seconds. The toast was thirty seconds long. The toast did not become a thing.",
      },
      {
        speakerId: "inner-voice",
        tone: "tactical",
        text: "You did the discipline. Yasmin's line stayed Yasmin's line. Your line stayed yours. Noor read both as warmth. The two audiences kept their separate readings. The dinner stayed the dinner.",
      },
      {
        speakerId: null,
        text: "The rest of dinner runs ordinary. Yasmin tells a story about a graduate student in 2009 who tried to translate Borges into Hindi without speaking Spanish. Noor laughs at the right place. You laugh at the right place. The waiter brings the cake at 9:18 pm.",
      },
      {
        speakerId: "yasmin",
        emotion: "knowing",
        text: "I am going to walk back to the hotel. The two of you take the F home. I will see both of you on Saturday for coffee before my flight.",
      },
      {
        speakerId: null,
        text: "She kisses Noor. She kisses you. She pays at the bar on the way out. She walks to Court Street alone. She has been here since 6:30 pm and she leaves at 9:34 pm.",
      },
    ],
    nextSceneId: "ending-be-ordinary",
  },

  {
    id: "path-b-overcompensate",
    backgroundId: "restaurant",
    mood: "professional",
    presentCharacterIds: ["yasmin", "noor"],
    dialog: [
      {
        speakerId: "inner-voice",
        text: "To Yasmin, who is the reason this dinner exists tonight, and to Noor, who is the reason all of us are.",
      },
      {
        speakerId: null,
        text: "Yasmin smiles. She lifts her glass. She does not say more. The toast has been converted to a thank-you. The thank-you is for the dinner she organised. The thank-you is technically appropriate. It is also slightly oversized for the moment.",
      },
      {
        speakerId: "inner-voice",
        tone: "tactical",
        text: "You over-attended. Yasmin's line was the line. Yours added a frame. The frame did not break the dinner. The frame added a small bevel to the August dinners.",
        event: "tactic-named:over-attention-as-tell",
      },
      {
        speakerId: null,
        text: "The rest of dinner runs ordinary. The Borges story still gets told. The cake still arrives at 9:18. Yasmin walks to her hotel. She kisses you at the door slightly differently than she kissed Noor.",
      },
      {
        speakerId: "inner-voice",
        tone: "tactical",
        text: "Yasmin is calibrating in real time. She is making sure the next dinner has the same shape. You are now slightly more visible at the family table than you were at 6:38 pm. That visibility is not a credit. It is a bevel.",
      },
    ],
    nextSceneId: "ending-over-attended",
  },

  {
    id: "path-c-undertend",
    backgroundId: "restaurant",
    mood: "cold",
    presentCharacterIds: ["yasmin", "noor"],
    dialog: [
      {
        speakerId: "inner-voice",
        text: "To Noor.",
      },
      {
        speakerId: null,
        text: "You drink. Yasmin drinks. Noor drinks. There is a half-beat between Yasmin lifting her glass and you lifting yours. The half-beat is small. The half-beat is visible.",
      },
      {
        speakerId: "noor",
        emotion: "neutral",
        text: "And to my mother.",
      },
      {
        speakerId: "inner-voice",
        tone: "tactical",
        text: "Noor noticed. She added the line you did not. She did it graciously. She did not name the omission. She filled it. The fill is the data.",
        event: "tactic-named:under-attention-as-compensation",
      },
      {
        speakerId: "inner-voice",
        tone: "tactical",
        text: "Yasmin is watching this in the way she watched her undergraduates compensate for their own missteps. She is doing nothing about it. The not-doing is what makes the failure mode legible to you.",
      },
      {
        speakerId: null,
        text: "The rest of dinner runs slightly tighter than it would have. The Borges story is shorter. The cake arrives at 9:14 pm because the waiter has read the table. Yasmin kisses both of you at the door. She does not say anything to you that she would not have said to Noor.",
      },
    ],
    nextSceneId: "ending-under-attended",
  },

  {
    id: "ending-be-ordinary",
    backgroundId: "restaurant",
    mood: "peaceful",
    isEnding: true,
    outcomeType: "good",
    endingTitle: "The Ordinary Held",
    endingSummary:
      "Thirty seconds of toast. Yasmin's line stayed Yasmin's line. Yours stayed yours. Noor read both as warmth. The two audiences kept their separate readings. The dinner stayed the dinner. The Borges story got told. The cake arrived at 9:18. Yasmin walked to her hotel alone, which she planned to do, which she had planned to do before she walked into the restaurant.",
    endingLearnPrompt:
      "When two people hold a secret at a table where a third does not, the discipline is the ordinary. Audit the next time you are in a room where you know something someone in the room does not. The not-different is the work.",
    dialog: [
      {
        speakerId: "inner-voice",
        tone: "tactical",
        text: "Friday morning, August 30. 6:42 am. Yasmin texts.",
      },
      {
        speakerId: "yasmin",
        emotion: "knowing",
        text: "Coffee tomorrow at 9:00 at the hotel. The two of you. After that the flight. The dinner Wednesday was the dinner. Thank you for that. Yasmin.",
      },
    ],
  },

  {
    id: "ending-over-attended",
    backgroundId: "restaurant",
    mood: "professional",
    isEnding: true,
    outcomeType: "neutral",
    endingTitle: "The Over-Attention",
    endingSummary:
      "You named Yasmin in the toast in a way she did not need. She smiled graciously. The dinner ran ordinary on the surface. The bevel is the small adjustment Yasmin made in real time and will continue making. The August dinners now require slightly more discipline from her than they would have. The October will still be October. The August will be slightly harder for her than necessary.",
    endingLearnPrompt:
      "Over-attention to the person holding the secret is the failure mode of trying. The next time you are at a table with someone whose hard thing you know, ask whether your toast adds something the table needs, or whether it adds something you need to give.",
    failureBlogSlug: "over-attending-the-secret",
    failureBlogTitle: "Why thanking the person too visibly is the over-attention tell",
    dialog: [
      {
        speakerId: "yasmin",
        emotion: "knowing",
        text: "Coffee tomorrow at 9:00. Just the two of you and me will be brief. I will see Noor at the hotel before my flight. Yasmin.",
      },
    ],
  },

  {
    id: "ending-under-attended",
    backgroundId: "restaurant",
    mood: "cold",
    isEnding: true,
    outcomeType: "bad",
    endingTitle: "The Under-Attention",
    endingSummary:
      "You toasted only Noor. Noor filled the gap with a gracious line of her own. Yasmin watched the compensation happen and did nothing about it. The dinner finished tighter than it would have. Yasmin kissed both of you the same way at the door. The August dinner that was meant to be Yasmin's practice for not-different has become a piece of evidence for Yasmin that you may not yet be the steady person she asked you to become.",
    endingLearnPrompt:
      "Under-attention is the compensation move for the over-attention instinct. Both moves are visible. The discipline is the ordinary. Audit the next time you correct an over-attentive instinct by going small. The going-small is the new tell.",
    failureBlogSlug: "the-compensation-tell",
    failureBlogTitle: "Why going small to correct an over-attention instinct is the new tell",
    dialog: [
      {
        speakerId: "yasmin",
        emotion: "knowing",
        text: "Coffee tomorrow 9:00. I will be at the hotel until 11:00. Come if you want. Yasmin.",
      },
      {
        speakerId: "inner-voice",
        tone: "tactical",
        text: "Come if you want. The phrase is the diagnostic. Yasmin has just opened a small space between the August practice and the October work. The space is recoverable. The recovery is the work of the next two months.",
      },
    ],
  },
];

const datingMission11: Scenario = {
  id: "d11-noors-birthday",
  title: "Noor's Birthday",
  tagline:
    "Three people at the table. Two know the diagnosis. The discipline is the ordinary.",
  description:
    "August 28 at Frankies 457. Yasmin is in town for ten days. The thirty-day frame from L10 is now in week four. Noor's birthday dinner is the first table where all three of you sit since the diagnosis was named. Noor does not know. The discipline is to be exactly the person who was at the bench at d9. Do not telegraph. Do not compensate. Yasmin is teaching the same exercise in real time.",
  tier: "vip",
  track: "male-dating",
  level: 11,
  order: 1,
  estimatedMinutes: 11,
  difficulty: "advanced",
  category: "dating",
  xpReward: 400,
  badgeId: "ordinary-held",
  startSceneId: "cold-open",
  prerequisites: ["d10-the-mothers-lunch"],
  isNew: true,
  tacticsLearned: [
    "Holding the ordinary at a table where you know something the room does not",
    "Letting the calibrated line of another person stay calibrated",
    "Distinguishing the toast from the thank-you",
    "Reading the secret-holder's discipline as instruction in real time",
  ],
  redFlagsTaught: [
    "Over-attention as the visible-thank-you that converts the dinner",
    "Under-attention as the compensating move that becomes a new tell",
    "Going small to correct the over-attention instinct",
    "Adding a frame to a line the other person already calibrated",
  ],
  reward: {
    id: "ordinary-held",
    name: "The Ordinary Held",
    description:
      "Thirty seconds of toast. The dinner stayed the dinner. The Borges story got told. Yasmin walked to her hotel at 9:34 pm exactly as she planned to.",
  },
  characters: [NOOR, YASMIN, INNER_VOICE_M],
  scenes,
};

export default datingMission11;
