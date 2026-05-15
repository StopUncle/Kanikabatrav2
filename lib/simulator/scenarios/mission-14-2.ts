/**
 * Female Track. Mission 14-2 "The Partnership"
 *
 * Six weeks after L14-1's episode. The news cycle closed. The Margaret
 * Lin piece is on the protagonist's professional record. Lennox emails
 * Tuesday 8:14 am with a partnership offer at Halberd Carrey, where
 * Adrian Vale (Aria's husband) sits as a partner and Avery from L4
 * runs a separate portfolio.
 *
 * The scenario teaches due diligence on yourself before due diligence
 * on the partner. The booth is the room you practice in. The partners'
 * table is the room you bring the work to once it has been practiced.
 *
 * Handoff out: the October partner-meeting invitation. L15-1 opens
 * on the first quarterly meeting.
 *
 * Pilot reference: `reference/L14-2-pilot.md`.
 */

import type { Scenario, Scene } from "../types";
import { PRIYA, INNER_VOICE, LENNOX } from "../characters";

const scenes: Scene[] = [
  {
    id: "cold-open",
    backgroundId: "kitchen",
    mood: "professional",
    dialog: [
      {
        speakerId: null,
        text: "Tuesday. 8:14 am. Your inbox. The subject line is sixteen words. The sender is L. Halberd Carrey. You have not had a thread with this address in five years. The last thread was a holiday card in 2024.",
      },
      {
        speakerId: "lennox",
        emotion: "knowing",
        text: "It is probably time we sat down. Coffee Thursday? Buvette, 10:00 am. They open at 10:00. I have you until 11:30. There is a thing I want to ask you about that is not the obvious thing. L.",
      },
      {
        speakerId: "inner-voice",
        tone: "tactical",
        text: "The signature is one letter. Lennox has been operating at the level where she does not need to add the city to a New York address.",
      },
      {
        speakerId: "inner-voice",
        tone: "tactical",
        text: "Not the obvious thing. The obvious thing is the senior advisory partner role at Halberd Carrey. They announced her promotion to partner ten months ago. The obvious thing is what you would expect her to write to you about.",
      },
      {
        speakerId: null,
        text: "You do not reply for forty-three minutes. You reply at 8:57. Five words plus the timestamp. The reply is calibrated to land as the same register as her email.",
      },
      {
        speakerId: "inner-voice",
        tone: "tactical",
        text: "The reply is the easy part. The forty-three minutes is the part you should look at later.",
      },
    ],
    nextSceneId: "priya-wednesday-night",
  },

  {
    id: "priya-wednesday-night",
    backgroundId: "apartment",
    mood: "peaceful",
    presentCharacterIds: ["priya"],
    dialog: [
      {
        speakerId: null,
        text: "Wednesday. 9:14 pm. Priya's couch. The daughter has been asleep for forty-eight minutes. The Mariage Frères is on its second pour.",
      },
      {
        speakerId: "priya",
        emotion: "knowing",
        text: "I assume you are seeing Lennox tomorrow.",
      },
      {
        speakerId: "inner-voice",
        tone: "tactical",
        text: "She knows. She has not asked you. She is naming it the way she names things, which is to put them on the table in three syllables and wait.",
      },
      {
        speakerId: "inner-voice",
        text: "Yes.",
      },
      {
        speakerId: "priya",
        emotion: "knowing",
        text: "Two things. One. Whatever she is offering, it is real. Lennox does not do exploratory. She did her exploratory in 2020. The offer on Thursday is the offer.",
      },
      {
        speakerId: "priya",
        emotion: "knowing",
        text: "Two. The thing the crisis taught you was honest accounting. Take that to Thursday. Lennox is the person you have known longest who is operating at her current level. She is the room you can practice it in.",
      },
      {
        speakerId: null,
        text: "She does not say a third thing. She finishes her tea. She picks up the book on the table beside her and opens it to the page she marked.",
      },
      {
        speakerId: "inner-voice",
        tone: "tactical",
        text: "Two sentences and a closing. Priya has just told you the entire framing of tomorrow. She has also told you that she thinks you can do this. The second is implied by the absence of a third sentence that would have qualified it.",
      },
    ],
    nextSceneId: "the-coffee",
  },

  {
    id: "the-coffee",
    backgroundId: "office",
    mood: "professional",
    presentCharacterIds: ["lennox"],
    dialog: [
      {
        speakerId: null,
        text: "Thursday. 9:54 am. Buvette. Grove Street. Lennox is in the back booth. Black turtleneck. No coat in sight, which means she walked here from Halberd's offices on Greenwich.",
      },
      {
        speakerId: null,
        text: "She stands. She does not hug. She extends her hand the way she extended her hand the first time you met her at the gala in 2018. The handshake is the bridge across the six years.",
      },
      {
        speakerId: "lennox",
        emotion: "knowing",
        text: "Two coffees, both flat whites. I ordered. Sit. We have ninety minutes. I want to use forty. You can use the other fifty for anything you want, including thinking in silence at the table after I leave.",
      },
      {
        speakerId: "inner-voice",
        tone: "tactical",
        text: "She has structured the time. She has structured the coffee. She has structured the silence that will exist after she leaves. This is a meeting she has been preparing for since Monday at the latest.",
      },
      {
        speakerId: "inner-voice",
        tone: "tactical",
        text: "She has acknowledged that you may need to think after she leaves. She has cleared the booth for you. She is treating the booth as a resource you can use. The discipline of treating a room as a resource is the discipline she has been doing for nine months as a partner.",
      },
    ],
    nextSceneId: "lennox-frames-the-role",
  },

  {
    id: "lennox-frames-the-role",
    backgroundId: "office",
    mood: "professional",
    presentCharacterIds: ["lennox"],
    dialog: [
      {
        speakerId: "lennox",
        emotion: "knowing",
        text: "Halberd is opening one senior advisory partner seat this fall. I want you in it. Not the partner track. The advisor seat, which sits in our quarterly partners' meetings, votes on direction, does not run a portfolio.",
      },
      {
        speakerId: "lennox",
        emotion: "knowing",
        text: "Paid as a fixed annual fee plus a profit share on the firm's results. The seat exists because we need an outside read in the room. I have proposed two candidates. You are one. The other is a former Forge Labs operator. I want the one who would push us.",
      },
      {
        speakerId: "lennox",
        emotion: "knowing",
        text: "The structural read: the seat is real, it is funded, it pays at the level of a Series B operator role, and it is a four-year commitment with a one-year out.",
      },
      {
        speakerId: "lennox",
        emotion: "knowing",
        text: "The personal read: it is also the room. Halberd's partners include Adrian Vale, two of his peers from McKinsey, and a fourth partner who used to write for the magazine that hired Davis Karim.",
      },
      {
        speakerId: "inner-voice",
        tone: "tactical",
        text: "She has named the room. She has named Adrian Vale specifically. She has done in three sentences what would have taken a recruiter forty minutes of triangulation.",
      },
      {
        speakerId: "lennox",
        emotion: "knowing",
        text: "Avery is also at the firm. She has been here two years. She runs a separate portfolio. You would be in two meetings a quarter with her. None of them would be hostile. I am naming her because you would prefer to hear her name from me, today, than in a press release in October.",
      },
      {
        speakerId: "inner-voice",
        tone: "tactical",
        text: "Avery from L4. The DARVO antagonist. The L4 register. Lennox has told you that the firm contains the people from your last six years of conflict and she has done it cleanly. The question is whether you are in a state to be in the room with them.",
      },
    ],
    nextSceneId: "the-question",
  },

  {
    id: "the-question",
    backgroundId: "office",
    mood: "tense",
    presentCharacterIds: ["lennox"],
    dialog: [
      {
        speakerId: "inner-voice",
        tone: "tactical",
        text: "She has given you the room. She has given you the offer. She has given you the names. The next sentence is yours.",
      },
    ],
    choices: [
      {
        id: "honest-disclosure",
        text: "Let me tell you what is true about my last six months, in the version Elanor knows, before you decide whether you still want me. The Margaret Lin piece is not the full picture. The 2022 sentence is the floor. There is a board meeting in 2022 I would like you to know about before Adrian Vale's wife tries again next year.",
        tactic:
          "Honest accounting with the new partner. Lennox is the person you have known longest at this level. Practice the discipline you learned at L13-2 here.",
        isOptimal: true,
        event: "optimal-with-grace",
        nextSceneId: "path-a-the-disclosure",
      },
      {
        id: "take-a-week",
        text: "I would like a week to think. Can I come back to you next Thursday with my answer.",
        tactic:
          "Accept first, disclose later. You are buying time before the diligence-on-yourself conversation. The conversation will happen anyway, in a less ideal room.",
        feedback:
          "The disclosure made later is the disclosure made under more pressure.",
        nextSceneId: "path-b-accept-first",
      },
      {
        id: "accept-now",
        text: "Yes. I would love to. When does the seat start.",
        tactic:
          "Accept without disclosure. The crisis floor is not on the table because you decided it does not need to be. It will be on the table the first time the episode comes up in a partners' meeting.",
        event: "failure-rejected",
        nextSceneId: "path-c-accept-no-disclosure",
      },
    ],
  },

  {
    id: "path-a-the-disclosure",
    backgroundId: "office",
    mood: "professional",
    presentCharacterIds: ["lennox"],
    dialog: [
      {
        speakerId: null,
        text: "You tell her. You tell her the 2022 board meeting. You tell her what was said. You tell her what Elanor knew by 1:14 pm Tuesday. You tell her Margaret Lin had it in the piece by paragraph seven and the audience read it as context, not as accusation.",
      },
      {
        speakerId: null,
        text: "You speak for nine minutes. Lennox does not write anything down. She drinks her coffee. She finishes the cup. She does not interrupt.",
      },
      {
        speakerId: "lennox",
        emotion: "knowing",
        text: "Thank you. That was the conversation I was hoping you would do at the booth and not at the partners' table in October. I knew most of it. I knew the floor was lower than Margaret's piece. I did not know the specific sentence. I would have found out by spring.",
      },
      {
        speakerId: "lennox",
        emotion: "knowing",
        text: "Two things. One. The offer stands. The seat is mine to fill within the firm's policy. I will name the floor to two partners privately by Monday. The four partners' meetings a year will not contain a moment where the floor surprises anyone in the room.",
      },
      {
        speakerId: "lennox",
        emotion: "knowing",
        text: "Two. The booth was the right room. We will do this kind of conversation in this kind of booth as long as we are in business together. The four years we are about to spend together are not built on a single partners' meeting. They are built on the booth.",
      },
      {
        speakerId: "inner-voice",
        tone: "tactical",
        text: "She has just given you the framing for the next four years. The booth is the room you can practice in. The partners' table is the room you bring the work to once it has been practiced. The two are not the same room.",
      },
    ],
    nextSceneId: "ending-the-booth-as-room",
  },

  {
    id: "path-b-accept-first",
    backgroundId: "office",
    mood: "professional",
    presentCharacterIds: ["lennox"],
    dialog: [
      {
        speakerId: "lennox",
        emotion: "knowing",
        text: "Take the week. Thursday next at 10:00. Same booth.",
      },
      {
        speakerId: null,
        text: "You walk home. The week happens. You re-read the L13-2 material in your own head three times. You consider calling Elanor; you do not because Elanor would say the same thing Priya said, which is that the disclosure is overdue.",
      },
      {
        speakerId: null,
        text: "The following Thursday you sit at the same booth. You tell Lennox the 2022 floor. The conversation takes seven minutes instead of nine.",
      },
      {
        speakerId: "lennox",
        emotion: "knowing",
        text: "Okay. The offer stands. You were going to do this today either way. It would have been better last week. The booth would have been the same. We start in October.",
      },
      {
        speakerId: "inner-voice",
        tone: "tactical",
        text: "The relationship is intact. The first six minutes of it took ten days instead of zero. You will not feel the cost. Lennox will not name it. The cost is the small bevel on every interaction between you for the first six months.",
      },
    ],
    nextSceneId: "ending-the-week-later",
  },

  {
    id: "path-c-accept-no-disclosure",
    backgroundId: "office",
    mood: "tense",
    presentCharacterIds: ["lennox"],
    dialog: [
      {
        speakerId: "lennox",
        emotion: "knowing",
        text: "Good. We start in October.",
      },
      {
        speakerId: null,
        text: "You walk home. You do not call Elanor. You do not text Priya. October arrives. The first quarterly partners' meeting is the second Wednesday.",
      },
      {
        speakerId: null,
        text: "Adrian Vale is across the table. Mid-meeting, an unrelated topic touches on press coverage of senior women. Adrian uses the phrase the patterns we have all seen this year. He does not look at you. He looks at his notes. Lennox sees it.",
      },
      {
        speakerId: "inner-voice",
        tone: "tactical",
        text: "Lennox sees that Adrian sees something you have not named to her. The partners' meeting continues. Two minutes after the meeting, in the hallway, Lennox does not say anything. She nods once. The nod is the data.",
      },
      {
        speakerId: null,
        text: "By Friday Lennox has texted you. Booth Saturday. 10:00.",
      },
      {
        speakerId: "inner-voice",
        tone: "tactical",
        text: "The Saturday booth conversation is the conversation you would have had at the original Thursday booth in September. It is now happening eight weeks later under the structural weight of one partners' meeting.",
      },
    ],
    nextSceneId: "ending-the-october-meeting",
  },

  {
    id: "ending-the-booth-as-room",
    backgroundId: "office",
    mood: "peaceful",
    isEnding: true,
    outcomeType: "good",
    endingTitle: "The Booth As Room",
    endingSummary:
      "Thursday's nine minutes were the right nine minutes. Lennox named the floor to two partners by Monday. The four-year seat starts October. The booth is the room. The partners' table is the room you bring the work to once it has been practiced. You will spend the next four years learning the difference.",
    endingLearnPrompt:
      "Practice rooms and performance rooms are not the same room. Audit your last three professional relationships. Which were practice rooms and which were performance rooms? Did you bring the right work to the right room?",
    dialog: [
      {
        speakerId: "lennox",
        emotion: "knowing",
        text: "October 14, 2:00 pm. Halberd Carrey, 14th floor. Bring nothing. We start. L.",
      },
    ],
  },

  {
    id: "ending-the-week-later",
    backgroundId: "office",
    mood: "professional",
    isEnding: true,
    outcomeType: "neutral",
    endingTitle: "The Disclosure Made Late",
    endingSummary:
      "You took the week. The conversation that should have happened on the first Thursday happened on the second. Lennox stayed. The relationship is intact. The cost is invisible; it is the small bevel on the first six months of working together. You will recognise it in March.",
    endingLearnPrompt:
      "Disclosure delayed is disclosure under pressure. The next time you reach for the week to think, ask whether the thinking will produce new information or just rehearsal of the same disclosure.",
    failureBlogSlug: "the-week-later-disclosure",
    failureBlogTitle: "Why the disclosure you make a week later is the disclosure that costs more",
    dialog: [
      {
        speakerId: "lennox",
        emotion: "knowing",
        text: "October 14, 2:00 pm. Halberd Carrey, 14th floor. The first meeting is short. We will be in the booth on the 21st. L.",
      },
    ],
  },

  {
    id: "ending-the-october-meeting",
    backgroundId: "office",
    mood: "cold",
    isEnding: true,
    outcomeType: "bad",
    endingTitle: "The October Meeting",
    endingSummary:
      "You accepted without disclosure. Adrian Vale saw it from across a partners' table eight weeks later. Lennox saw Adrian see it. The booth conversation happened on a Saturday in November instead of a Thursday in September. The offer still stands. The bevel is now a step.",
    endingLearnPrompt:
      "Accepting a partnership without naming the floor is signing a contract you have not finished reading. The partner is the contract.",
    failureBlogSlug: "accepting-the-partnership-without-the-floor",
    failureBlogTitle: "Why accepting a partnership without the floor is signing a contract you have not finished reading",
    dialog: [
      {
        speakerId: "lennox",
        emotion: "knowing",
        text: "October 14, 2:00 pm. Halberd Carrey, 14th floor. We will do the booth on Saturday the 17th. Bring the Elanor file. L.",
      },
    ],
  },
];

const mission14_2: Scenario = {
  id: "mission-14-2",
  title: "The Partnership",
  tagline:
    "Lennox returns six years after L5-2 with a senior advisor seat. Due diligence on yourself before due diligence on the partner.",
  description:
    "Six weeks after the episode dropped. Lennox emails Tuesday with a coffee invitation at Buvette. The offer is a senior advisory partner seat at Halberd Carrey, where Adrian Vale (Aria's husband) sits as a partner and Avery runs a separate portfolio. The discipline is the booth as the room you practice in and the partners' table as the room you bring the work to once it has been practiced. The two are not the same room.",
  tier: "vip",
  track: "female",
  level: 14,
  order: 2,
  estimatedMinutes: 12,
  difficulty: "advanced",
  category: "social-dynamics",
  xpReward: 420,
  badgeId: "booth-as-room",
  startSceneId: "cold-open",
  prerequisites: ["mission-14-1"],
  isNew: true,
  tacticsLearned: [
    "Disclosing the crisis floor to a new partner before accepting",
    "Treating the early booth as the practice room",
    "Naming the people in the room before signing the contract",
    "Acknowledging the silence after a partnership conversation as a resource",
  ],
  redFlagsTaught: [
    "Accepting first and disclosing later as a structural failure mode",
    "Taking a week to think when the thinking only rehearses disclosure",
    "Letting Adrian Vale find out from a third party in a partners' meeting",
    "Confusing the partners' table for the practice booth",
  ],
  reward: {
    id: "booth-as-room",
    name: "The Booth As Room",
    description:
      "Thursday's nine minutes were the right nine minutes. The booth is the room you practice in. The partners' table is the room you bring the work to once it has been practiced.",
  },
  characters: [LENNOX, PRIYA, INNER_VOICE],
  scenes,
};

export default mission14_2;
