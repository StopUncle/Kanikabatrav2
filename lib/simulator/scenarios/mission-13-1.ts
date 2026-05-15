/**
 * Female Track. Mission 13-1 "The Allegation"
 *
 * Monday morning, 8:14 am. The day after Priya's screenshot from
 * mission-12-2. Overnight the podcast posted a 47-second teaser clip.
 * Three industry-adjacent people have texted "Hey" by 7:11 am. Priya
 * texted at 7:02 am with one instruction: call Elanor before you call
 * anyone else.
 *
 * The scenario is not about whether the allegations are true. It is
 * about whether the protagonist, in the seventy minutes between 8:14
 * and her first meeting at 9:24, makes the lawyer call or one of three
 * failure-mode calls.
 *
 * Handoff out: Elanor Webb's intake memo. L13-2 opens at her firm.
 *
 * Pilot reference: `reference/L13-1-pilot.md`.
 */

import type { Scenario, Scene } from "../types";
import { PRIYA, INNER_VOICE, ELANOR } from "../characters";

const scenes: Scene[] = [
  // -------------------------------------------------------------------
  // Scene 1, cold open
  // -------------------------------------------------------------------
  {
    id: "cold-open",
    backgroundId: "kitchen",
    mood: "cold",
    dialog: [
      {
        speakerId: null,
        text: "Monday. 8:14 am. Your kitchen. The kettle has been on for six minutes. You forgot it. The water is cold again.",
      },
      {
        speakerId: null,
        text: "You slept four hours. You went to bed at 11:14 last night with the screen face-down. You woke at 4:38. You did not check your phone until 7:02.",
      },
      {
        speakerId: null,
        text: "By 7:02 you had eleven notifications and three texts that opened with the word Hey.",
      },
      {
        speakerId: "inner-voice",
        tone: "tactical",
        text: "Hey at 6:38 am is its own register. Two of the three Hey texts are from people who would not have started Monday that way before Sunday night. The third is Priya.",
      },
      {
        speakerId: "priya",
        emotion: "serious",
        text: "Call Elanor before you call anyone else. I told her you would call. She is at her desk. 212-555-0190. Tomorrow, not the friends. Tomorrow, not the firm. Lawyer first. I love you.",
      },
      {
        speakerId: "inner-voice",
        tone: "tactical",
        text: "Three sentences and a number. The thing you most want to do right now, which is to text the eleven people back with a calibrated paragraph that explains, is the move Priya stopped you from making by texting at 7:02.",
      },
    ],
    nextSceneId: "the-clip",
  },

  // -------------------------------------------------------------------
  // Scene 2, the 47 seconds
  // -------------------------------------------------------------------
  {
    id: "the-clip",
    backgroundId: "kitchen",
    mood: "cold",
    dialog: [
      {
        speakerId: null,
        text: "You play the clip once. Forty-seven seconds. A man's voice over a stock-music bed. He says your first name twice. He does not name your firm. He does not name a year. He does not name a room.",
      },
      {
        speakerId: null,
        text: 'He says, "let us just say the rooms she has walked into in the last six years did not always close cleanly behind her." Then a beat for a sponsor read. Then the clip ends.',
      },
      {
        speakerId: "inner-voice",
        tone: "tactical",
        text: "Notice what is not in the clip. There is no specific accusation. There is no name of an event. There is no timestamp. The clip has been engineered to be unactionable by design.",
      },
      {
        speakerId: "inner-voice",
        tone: "tactical",
        text: "Naming nothing means defending nothing, which means the listener supplies the content with whatever they are already carrying about you.",
      },
      {
        speakerId: "inner-voice",
        tone: "tactical",
        text: "The 47 seconds is the warm-up. The episode in nine days is the swing.",
      },
    ],
    nextSceneId: "the-phone-lights",
  },

  // -------------------------------------------------------------------
  // Scene 3, the phone lights
  // -------------------------------------------------------------------
  {
    id: "the-phone-lights",
    backgroundId: "kitchen",
    mood: "danger",
    dialog: [
      {
        speakerId: null,
        text: "The texts. In order of arrival.",
      },
      {
        speakerId: null,
        text: "6:38 am, an industry peer you had drinks with twice in 2021: Hey, just saw this. You good? Call me when you can.",
      },
      {
        speakerId: null,
        text: "6:51 am, a board member from a non-profit you sit on: Hey. Saw the podcast post. What is going on?",
      },
      {
        speakerId: null,
        text: "7:11 am, the journalist who wrote the profile of you in 2023: Hey. Have a sec? Want to make sure I am reading this right.",
      },
      {
        speakerId: "inner-voice",
        tone: "tactical",
        text: "Three Hey openings in seventy-three minutes from people who would have led with anything else twenty-four hours ago. The journalist's text is the most dangerous because the journalist is the most informed.",
      },
      {
        speakerId: "inner-voice",
        tone: "tactical",
        text: "The non-profit board member's is the most urgent because boards move fast and a board can ask you to step back inside a week.",
      },
      {
        speakerId: "inner-voice",
        tone: "tactical",
        text: "Every one of these wants a paragraph from you. Every paragraph you send before 9:00 am is on the record.",
      },
    ],
    nextSceneId: "the-choice",
  },

  // -------------------------------------------------------------------
  // Scene 4, the choice
  // -------------------------------------------------------------------
  {
    id: "the-choice",
    backgroundId: "kitchen",
    mood: "danger",
    dialog: [
      {
        speakerId: "inner-voice",
        tone: "tactical",
        text: "Three calls. Pick the first one.",
      },
    ],
    choices: [
      {
        id: "dial-elanor",
        text: "Dial Elanor's number.",
        tactic:
          "Lawyer first. Priya routed you correctly. Elanor will ask you for facts before she asks you for context.",
        isOptimal: true,
        event: "optimal-with-grace",
        nextSceneId: "path-a-elanor",
      },
      {
        id: "call-journalist",
        text: "Call the journalist back first. She knows the most.",
        tactic:
          "The friends-first triage error. A journalist on Monday morning is a journalist. Anything you say is quotable. The instinct to give information to the most informed person is the wrong instinct in the first hour.",
        feedback:
          "She will be useful in 72 hours. Not 72 minutes.",
        nextSceneId: "path-b-friends",
      },
      {
        id: "open-doc",
        text: "Open a doc. Draft a statement. I want to address what you may have seen this morning.",
        tactic:
          "The public statement reflex. Writing the statement is your nervous system performing competence to an audience that has not been named yet. The statement will be quoted before it is published.",
        event: "failure-rejected",
        nextSceneId: "path-c-statement",
      },
    ],
  },

  // -------------------------------------------------------------------
  // Path A, the lawyer
  // -------------------------------------------------------------------
  {
    id: "path-a-elanor",
    backgroundId: "kitchen",
    mood: "professional",
    presentCharacterIds: ["elanor"],
    dialog: [
      {
        speakerId: null,
        text: "You dial. She picks up on the second ring.",
      },
      {
        speakerId: "elanor",
        emotion: "knowing",
        text: "It is 8:31 here. I have you until 9:15. Tell me what you played and what you read. Do not tell me what you think it means.",
      },
      {
        speakerId: "inner-voice",
        tone: "tactical",
        text: "She is taking facts. Not story. Note the discipline.",
      },
      {
        speakerId: null,
        text: "You give her the 47 seconds verbatim. You give her the four texts in order of arrival. You give her the screenshot Priya sent on Sunday. You do not give her your reading of who is behind the podcast.",
      },
      {
        speakerId: "elanor",
        emotion: "knowing",
        text: "Three things this morning. One. I am sending a preservation letter to the podcast's parent company at 10:00 am. It will not say what they think it says. It will say we are documenting their content. That alone slows them down for ninety-six hours.",
      },
      {
        speakerId: "elanor",
        emotion: "knowing",
        text: "Two. You do not reply to any of the four texts before I have read the texts. I will read them now. You send me the screenshots in the next four minutes.",
      },
      {
        speakerId: "elanor",
        emotion: "knowing",
        text: "Three. The journalist is Margaret Lin. I have worked with her. She is a careful person. She is also writing something this week. If you call her back today, you are quoted in the piece. If you call her on Thursday after we have a fact pattern, you are sourced.",
      },
      {
        speakerId: "inner-voice",
        tone: "tactical",
        text: "The move has a name. Quiet documentation before public response. Kanika has written about it in three places. You are now doing it.",
      },
    ],
    nextSceneId: "ending-lawyer-first",
  },

  // -------------------------------------------------------------------
  // Path B, the journalist
  // -------------------------------------------------------------------
  {
    id: "path-b-friends",
    backgroundId: "kitchen",
    mood: "tense",
    dialog: [
      {
        speakerId: null,
        text: "You call Margaret. She picks up on the first ring, which is its own information.",
      },
      {
        speakerId: null,
        text: "Margaret says: Hey. Thanks for calling back. Listen, I am not running anything yet. I just want to know what you know about this. Off the record.",
      },
      {
        speakerId: "inner-voice",
        tone: "tactical",
        text: "Off the record is a register. It is not a fact. Margaret is a careful person who is also writing something this week. Off the record is something you grant when you have a relationship and a fact pattern.",
      },
      {
        speakerId: "inner-voice",
        tone: "tactical",
        text: "You give her the version of what you know that you have already constructed at the kitchen table. You speak for seven minutes. You think you are being measured. By minute four you have said three things you did not plan to say.",
      },
      {
        speakerId: "inner-voice",
        tone: "tactical",
        text: "Margaret does not write a piece this week. She does write one in three weeks that quotes an industry source familiar with the matter twice. Both quotes are yours.",
      },
    ],
    nextSceneId: "ending-allies-first",
  },

  // -------------------------------------------------------------------
  // Path C, the statement
  // -------------------------------------------------------------------
  {
    id: "path-c-statement",
    backgroundId: "kitchen",
    mood: "danger",
    dialog: [
      {
        speakerId: null,
        text: "You open a doc. You write the first sentence.",
      },
      {
        speakerId: "inner-voice",
        text: "I want to address what you may have seen this morning. I do not know the source of the allegations being implied in the podcast clip, but I want to state clearly that...",
      },
      {
        speakerId: "inner-voice",
        tone: "tactical",
        text: "Stop. Look at what you just wrote. Allegations being implied has done the podcast's work for them. They did not name an allegation. You just named one for them.",
        event: "tactic-named:public-statement-reflex",
      },
      {
        speakerId: "inner-voice",
        tone: "tactical",
        text: "Source of the allegations frames the existence of allegations as fact. The statement you have not finished drafting has already moved the podcast forward by a week.",
      },
      {
        speakerId: null,
        text: "You do not send the draft. You also do not delete it. You leave it open on the screen. At 8:51 you call Elanor. She picks up on the second ring.",
      },
      {
        speakerId: "elanor",
        emotion: "knowing",
        text: "Read me what you wrote.",
      },
      {
        speakerId: "inner-voice",
        tone: "tactical",
        text: "You read it. Then you stop using your own words for a while.",
      },
    ],
    nextSceneId: "ending-the-statement",
  },

  // -------------------------------------------------------------------
  // ENDING, GOOD
  // -------------------------------------------------------------------
  {
    id: "ending-lawyer-first",
    backgroundId: "kitchen",
    mood: "professional",
    isEnding: true,
    outcomeType: "good",
    endingTitle: "Lawyer First",
    endingSummary:
      "The 47-second teaser tried to bait you into a paragraph by 9:00 am. You declined the bait. The preservation letter goes out at 10:00. The four industry texts wait. The journalist is now a Thursday call, not a Monday one. The first move is the move the next nine days are built on.",
    endingLearnPrompt:
      "Lawyer first. Friends second. Public never. Audit the last three crisis moments in your life: did you reach for the lawyer-equivalent first, or did you reach for the friend-equivalent because the friend felt warmer at the kitchen table?",
    dialog: [
      {
        speakerId: null,
        text: "9:14 am. You have not replied to any of the four texts. Elanor's preservation letter is going out at 10:00 am. You have a 1:00 pm meeting with her firm.",
      },
      {
        speakerId: null,
        text: "You eat the piece of toast that has been on the counter since 8:00.",
      },
      {
        speakerId: "inner-voice",
        tone: "tactical",
        text: "Lawyer first. Friends second. Public never. The first hour was the hour the next nine days will be built on. Most people in your position spend the first hour in drafts. You spent it in facts.",
      },
      {
        speakerId: null,
        text: "9:36 am. Priya texts.",
      },
      {
        speakerId: "priya",
        emotion: "knowing",
        text: "I am with you. Whatever you need today, ask. I am holding three hours this afternoon for you. You can use them. You can also not use them. Both are fine.",
      },
      {
        speakerId: "inner-voice",
        tone: "tactical",
        text: "She has done this before. Not for herself. For others. She never names which others. She does not need to.",
      },
    ],
  },

  // -------------------------------------------------------------------
  // ENDING, NEUTRAL
  // -------------------------------------------------------------------
  {
    id: "ending-allies-first",
    backgroundId: "kitchen",
    mood: "tense",
    isEnding: true,
    outcomeType: "neutral",
    endingTitle: "The Wrong Order",
    endingSummary:
      "You called the journalist before you called the lawyer. You called the lawyer second. Elanor will recover what she can. The piece will run in three weeks with two sourced quotes from you that you did not know you were giving. The legal posture is recoverable. The journalist relationship is recategorised.",
    endingLearnPrompt:
      "The most informed friend is the wrong first call when the information is the asset. Note who you called first the last time something broke. Was it the person with the highest information density, or the person with the cleanest professional posture?",
    failureBlogSlug: "the-friends-first-triage-error",
    failureBlogTitle: "Why your most informed friend is the wrong first call",
    dialog: [
      {
        speakerId: null,
        text: "9:14 am. You have spoken to Margaret for seven minutes. You then called Elanor at 8:47. Elanor read you the rule. Margaret is now a different relationship than she was at 6:38 am.",
      },
      {
        speakerId: "inner-voice",
        tone: "tactical",
        text: "You did the moves in the wrong order. The lawyer call closed the loop on the friends call. The preservation letter will still go out at 10:00. The piece will still run in three weeks with quotes from you that you no longer control.",
      },
      {
        speakerId: "priya",
        emotion: "knowing",
        text: "I am with you. I am holding three hours this afternoon for you. Both are fine.",
      },
    ],
  },

  // -------------------------------------------------------------------
  // ENDING, BAD
  // -------------------------------------------------------------------
  {
    id: "ending-the-statement",
    backgroundId: "kitchen",
    mood: "danger",
    isEnding: true,
    outcomeType: "bad",
    endingTitle: "The Quoted Statement",
    endingSummary:
      "You drafted the statement before the lawyer call. You sent it before the legal frame existed. The podcast quoted three sentences inside ninety minutes. The episode in nine days now has your voice in its bed. Elanor will spend the next fourteen days un-doing the first hour.",
    endingLearnPrompt:
      "The public statement reflex is your nervous system performing competence to an audience that has not been named yet. The audience that gets named will be the one quoting you. Hold the words for the lawyer call.",
    failureBlogSlug: "the-public-statement-reflex",
    failureBlogTitle: "Why the statement you draft before the lawyer call writes the next chapter for them",
    dialog: [
      {
        speakerId: null,
        text: "9:14 am. The statement went out at 8:52 to the four texts plus your firm's PR contact. By 9:00 am it had been forwarded out of two of those threads.",
      },
      {
        speakerId: null,
        text: "By 11:00 am the podcast had quoted three sentences from it in a follow-up tweet. Each sentence was calibrated. Together they read like an admission.",
      },
      {
        speakerId: "inner-voice",
        tone: "tactical",
        text: "The statement worked the way Kanika has written about statements working. It was your nervous system performing competence to an audience that had not been named yet. The podcast named the audience by quoting you.",
      },
      {
        speakerId: "inner-voice",
        tone: "tactical",
        text: "You wrote the podcast's second draft for them. Elanor will spend the next fourteen days un-doing the first hour.",
      },
      {
        speakerId: "priya",
        emotion: "concerned",
        text: "I am with you. Whatever you need today, ask.",
      },
    ],
  },
];

const mission13_1: Scenario = {
  id: "mission-13-1",
  title: "The Allegation",
  tagline:
    "A 47-second clip on a Monday morning. The first hour is the hour the next nine days will be built on.",
  description:
    "Overnight, an industry-adjacent podcast posted a 47-second teaser. Three industry-adjacent people have texted Hey by 7:11 am. Priya has already routed you to Elanor. The scenario is not about whether the allegations are true. It is about whether you make the lawyer call or one of three failure-mode calls before 9:00 am. Lawyer first. Friends second. Public never.",
  tier: "vip",
  track: "female",
  level: 13,
  order: 1,
  estimatedMinutes: 13,
  difficulty: "advanced",
  category: "social-dynamics",
  xpReward: 360,
  badgeId: "lawyer-first",
  startSceneId: "cold-open",
  prerequisites: ["mission-12-2"],
  isNew: true,
  tacticsLearned: [
    "Routing a public crisis through legal counsel before friends",
    "Quiet documentation as the first response",
    "Naming what is missing from a vague accusation",
    "Holding off on the public statement",
  ],
  redFlagsTaught: [
    "The unactionable-by-design clip that fills with whatever the listener carries",
    "The friends-first triage error: giving information to the most informed friend first",
    "The public statement reflex: performing competence to an audience not yet named",
    "Off the record as a register, not a fact",
  ],
  reward: {
    id: "lawyer-first",
    name: "Lawyer First",
    description:
      "The first move when a public allegation lands is the lawyer call. The friends wait. The statement waits. The audience that has not been named yet is the audience that will quote you.",
  },
  characters: [PRIYA, ELANOR, INNER_VOICE],
  scenes,
};

export default mission13_1;
