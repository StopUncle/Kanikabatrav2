/**
 * Female Track. Mission 13-2 "The Thing You Did Not Want To Name"
 *
 * Tuesday 1:00 pm. Elanor Webb's office. Two days after Sunday's
 * screenshot. The podcast's parent company has responded to the
 * preservation letter through their own counsel. Elanor has done
 * forty-eight hours of background. She has identified the likely
 * source as Aria Vale, the L9 antagonist, through her husband Adrian.
 *
 * The scenario is the seventy minutes at Elanor's conference table.
 * The discipline taught: honest accounting with your own lawyer.
 * Including the thing you have not told anyone. The lawyer who knows
 * the worst thing is the lawyer who can build a defense around it.
 *
 * Handoff out: the defense plan + the preemptive Margaret Lin piece
 * Friday at 6:00 pm. L14 opens on the second podcast episode.
 *
 * Pilot reference: `reference/L13-2-pilot.md`.
 */

import type { Scenario, Scene } from "../types";
import { PRIYA, INNER_VOICE, ELANOR, ARIA } from "../characters";

const scenes: Scene[] = [
  {
    id: "arrival",
    backgroundId: "office",
    mood: "professional",
    dialog: [
      {
        speakerId: null,
        text: "Tuesday. 12:54 pm. Madison and 47th. The building is limestone. The directory in the lobby lists Webb and Pratt on the eighth floor in cream Crane card stock.",
      },
      {
        speakerId: null,
        text: "The same stock Maris's first business card was on. The world of Webb and Pratt rhymes with the world that produced you, and Elanor knows it.",
      },
      {
        speakerId: null,
        text: "The receptionist looks up. She has been told you would arrive at 12:54. She does not ask your name. She says only: Ms. Webb is in three. Go in.",
      },
      {
        speakerId: "inner-voice",
        tone: "tactical",
        text: "Elanor has cleared the calendar from one to two-thirty. She charges by the hour for the hour. Today she has decided the case requires ninety minutes of focus. Note that.",
      },
    ],
    nextSceneId: "the-conference-room",
  },

  {
    id: "the-conference-room",
    backgroundId: "office",
    mood: "professional",
    presentCharacterIds: ["elanor"],
    dialog: [
      {
        speakerId: null,
        text: "Conference room three. A long walnut table. One legal pad. One Montblanc. One coffee on a coaster. No laptop. No screen.",
      },
      {
        speakerId: "elanor",
        emotion: "knowing",
        text: "Sit. I have read the documents. Forty-eight hours of background. I want to tell you what I know, ask you one question, then tell you what we are doing for the rest of the week.",
      },
      {
        speakerId: "inner-voice",
        tone: "tactical",
        text: "The order is the discipline. Information first, question second, plan third. Most lawyers ask the question first. She is giving you the information so the question lands on a person who has the same facts she does.",
      },
      {
        speakerId: "elanor",
        emotion: "knowing",
        text: "The podcast is owned by a small studio with three properties. The host is Davis Karim. He has been working in industry-adjacent commentary for six years. He has a quiet relationship with a former McKinsey partner named Adrian Vale.",
      },
      {
        speakerId: null,
        text: "Adrian Vale. You do not say anything.",
      },
      {
        speakerId: "elanor",
        emotion: "knowing",
        text: "Adrian Vale is Aria Vale's husband. Aria was the covert peer who lost the senior role to you in the summer of 2023. She has been at a different firm for fourteen months. Publicly quiet. Privately, she has had ample time to be not quiet.",
      },
      {
        speakerId: "inner-voice",
        tone: "tactical",
        text: "Elanor has done forty-eight hours of work that would cost a regular firm three weeks. She has done it because ninety days of cash and a nine-day window earn you that when you call the right person on Monday morning.",
      },
    ],
    nextSceneId: "elanor-asks",
  },

  {
    id: "elanor-asks",
    backgroundId: "office",
    mood: "tense",
    presentCharacterIds: ["elanor"],
    dialog: [
      {
        speakerId: "elanor",
        emotion: "knowing",
        text: "One question. I am going to ask it once. The answer you give me here is the floor under which we will not go this week. If the truth is below the floor, you need to lower the floor before you answer. Do you understand.",
      },
      {
        speakerId: "inner-voice",
        tone: "tactical",
        text: "The move has a name. Honest accounting. Elanor is the audience the inner voice has been writing for since L1. She is asking you for the same level of access to the facts that the inner voice has had on Sunday mornings for years.",
      },
      {
        speakerId: "elanor",
        emotion: "knowing",
        text: "Is there anything in the last six years, any conversation, any room, any deal, any choice, that you would not want Davis Karim to have a recording of?",
      },
      {
        speakerId: null,
        text: "She does not look at you while she asks. She looks at the Montblanc. She is uncapping it now. She is going to write down what you say.",
      },
    ],
    choices: [
      {
        id: "tell-her-everything",
        text: "Tell her the full answer. Including the thing you have not told anyone.",
        tactic:
          "Honest accounting. The lawyer who knows your worst thing is the lawyer who can build a defense around it.",
        isOptimal: true,
        event: "optimal-with-grace",
        nextSceneId: "path-a-honest",
      },
      {
        id: "curated-version",
        text: "Tell her most of it. Hold one piece back, the one that does not feel directly relevant.",
        tactic:
          "The curated truth. You are about to give Elanor ninety percent of the data and decide for her which ten percent does not matter. She is the person who decides what matters.",
        feedback: "The omission you choose will be the foothold.",
        nextSceneId: "path-b-curated",
      },
      {
        id: "defensive-version",
        text: "Tell her there is nothing material she does not know.",
        tactic:
          "Defended the version. You are about to tell your lawyer you are uncoachable. She will defend you anyway. The defense will be the defense of a person she cannot fully see.",
        event: "failure-rejected",
        nextSceneId: "path-c-defensive",
      },
    ],
  },

  {
    id: "path-a-honest",
    backgroundId: "office",
    mood: "cold",
    presentCharacterIds: ["elanor"],
    dialog: [
      {
        speakerId: null,
        text: "You tell her the thing. You tell her the year, the room, the people, the conversation. You tell her what you said. You tell her what you wish you had said. You do not rehearse before you speak.",
      },
      {
        speakerId: null,
        text: "You speak for nine minutes. Elanor writes. She does not interrupt. When you stop, she finishes the line she is writing. She caps the pen.",
      },
      {
        speakerId: "elanor",
        emotion: "knowing",
        text: "Thank you. That was the thing. Aria has it, or some version of it. Davis Karim does not have it yet. He has the gesture toward it, which is the rooms-did-not-close-cleanly line.",
      },
      {
        speakerId: "elanor",
        emotion: "knowing",
        text: "If we run the right preemptive piece in the right outlet by Thursday, the thing you just told me becomes a piece of context the audience already has when the episode drops. That changes the swing from a hit to a clarification.",
      },
      {
        speakerId: "inner-voice",
        tone: "tactical",
        text: "The thing she just described is the work the L9 protagonist did in absentia. The work was making the result undeniable before the campaign could finish. Elanor is doing the legal version of the same move.",
      },
      {
        speakerId: "elanor",
        emotion: "knowing",
        text: "I draft the preemptive piece tonight. You review at 9:00 tomorrow. Margaret Lin is the right outlet. We give it to her Thursday with twenty-four hours before publication. By Friday at 6:00 pm the thing is on the record in the version we choose.",
      },
    ],
    nextSceneId: "ending-honest-accounting",
  },

  {
    id: "path-b-curated",
    backgroundId: "office",
    mood: "professional",
    presentCharacterIds: ["elanor"],
    dialog: [
      {
        speakerId: null,
        text: "You tell her ninety percent. You hold back one piece. The piece is from a board meeting in 2022. You said one sentence. The sentence was about a person who was in the room. The person is no longer in the industry.",
      },
      {
        speakerId: null,
        text: "You speak for seven minutes. Elanor writes. She caps the pen. She looks at you for the first time since the question.",
      },
      {
        speakerId: "elanor",
        emotion: "knowing",
        text: "I am going to ask you one more time. Is there anything you have not told me.",
      },
      {
        speakerId: "inner-voice",
        tone: "tactical",
        text: "She knows. Not the thing. The fact that there is a thing. Lawyers who have done crisis work for twenty years recognise the texture of an answer that has been cleaned up.",
        event: "tactic-named:curated-truth",
      },
      {
        speakerId: "inner-voice",
        text: "No. That is everything.",
      },
      {
        speakerId: "elanor",
        emotion: "knowing",
        text: "Okay. We will work with what we have.",
      },
      {
        speakerId: "inner-voice",
        tone: "tactical",
        text: "She wrote down okay. She did not write down yes. She is now defending a version. The version is yours. She does not yet know what the version is missing.",
      },
    ],
    nextSceneId: "ending-the-curated-truth",
  },

  {
    id: "path-c-defensive",
    backgroundId: "office",
    mood: "tense",
    presentCharacterIds: ["elanor"],
    dialog: [
      {
        speakerId: null,
        text: "You give her the version. The version is that there is nothing in the last six years you would not be comfortable having recorded. You speak for three minutes. You finish faster than the question deserved.",
      },
      {
        speakerId: "elanor",
        emotion: "knowing",
        text: "Three minutes is fast. Most of my clients take eleven. I am going to write down three minutes on this page. That is for me, not for you. We will continue.",
      },
      {
        speakerId: null,
        text: "She uncaps the pen. She writes. She does not look up.",
      },
      {
        speakerId: "inner-voice",
        tone: "tactical",
        text: "She is treating you the way a doctor treats a patient who is lying about how much they drink. The doctor still gives the diagnosis. The doctor cannot give the best diagnosis.",
      },
      {
        speakerId: "inner-voice",
        tone: "tactical",
        text: "The velocity of the answer is the data. The content of the answer is the cover.",
      },
    ],
    nextSceneId: "ending-defended-the-version",
  },

  {
    id: "ending-honest-accounting",
    backgroundId: "office",
    mood: "professional",
    isEnding: true,
    outcomeType: "good",
    endingTitle: "Honest Accounting",
    endingSummary:
      "You lowered the floor. Elanor knew the worst thing by 1:14 pm Tuesday. By Friday at 6:00 pm the preemptive piece was on the record in Margaret Lin's outlet. Davis Karim's episode dropped on Wednesday into a piece of pre-existing context. The hit became a clarification. The L9 antagonist's campaign closed the same way her panel attack closed: with the work as the final argument.",
    endingLearnPrompt:
      "Audit the last three professional crises you handled. In each one, did you give your strongest advocate the worst version of the facts, or the version you would prefer? The version you would prefer is the version that loses you the case.",
    dialog: [
      {
        speakerId: null,
        text: "6:14 pm Friday. The Margaret Lin piece is up. Elanor texts at 6:21.",
      },
      {
        speakerId: "elanor",
        emotion: "knowing",
        text: "Posture good. Drop expected Wednesday at 6:00 am. I will be in by 5:30. You sleep.",
      },
      {
        speakerId: "priya",
        emotion: "knowing",
        text: "Saw Margaret's piece. Reads clean. I am proud of how you did this week. The Sunday tea is on me. 2 pm.",
      },
    ],
  },

  {
    id: "ending-the-curated-truth",
    backgroundId: "office",
    mood: "professional",
    isEnding: true,
    outcomeType: "neutral",
    endingTitle: "The Curated Truth",
    endingSummary:
      "You told her ninety percent. The ten percent you held back became the foothold. Davis Karim's episode dropped on schedule with one specific claim Elanor could not pre-empt. The claim was true. The defense recovered. The cost was four weeks of news cycle and two of the four texts from Monday morning becoming people you no longer hear from.",
    endingLearnPrompt:
      "The omission you choose is always the foothold. The next time you decide for your lawyer what matters, you have made a decision about the case you are not qualified to make.",
    failureBlogSlug: "the-curated-truth-with-your-lawyer",
    failureBlogTitle: "Why the omission you choose is always the foothold",
    dialog: [
      {
        speakerId: null,
        text: "Three weeks later. The episode dropped. The board meeting sentence was in the episode. Elanor recovered the rest. Two contacts from Monday morning have stopped replying.",
      },
      {
        speakerId: "inner-voice",
        tone: "tactical",
        text: "The defense held. It held smaller than it would have held with the full data. The version you protected was the version you spent the next four weeks managing.",
      },
    ],
  },

  {
    id: "ending-defended-the-version",
    backgroundId: "office",
    mood: "danger",
    isEnding: true,
    outcomeType: "bad",
    endingTitle: "Defended The Version",
    endingSummary:
      "You told Elanor the version you would prefer. She wrote down three minutes for herself. Two weeks later the episode dropped with forty-one seconds of audio from a 2022 board meeting. The audio was your voice saying a sentence you did not tell Elanor existed. She defended the episode anyway. Her defense is good. It is not as good as her defense would have been on Tuesday.",
    endingLearnPrompt:
      "Telling your lawyer the curated version is building on sand. The next time you are asked the worst-thing question by an advocate you are paying, answer the question. The answer is what they are buying.",
    failureBlogSlug: "defending-the-version",
    failureBlogTitle: "Why telling your lawyer the curated version is building on sand",
    dialog: [
      {
        speakerId: null,
        text: "Two weeks later. The episode is live. Forty-one seconds of audio you do not remember being recorded. You hear your own voice saying a sentence you have spent fourteen days hoping no one knew.",
      },
      {
        speakerId: "inner-voice",
        tone: "tactical",
        text: "Elanor calls at 6:14 am Wednesday. Her voice is the same as Tuesday. She does not say I told you so. She does not need to. She wrote three minutes on her pad and she has been doing the work of building around that number for fourteen days.",
      },
    ],
  },
];

const mission13_2: Scenario = {
  id: "mission-13-2",
  title: "The Thing You Did Not Want To Name",
  tagline:
    "Honest accounting with your own lawyer. The floor under which the defense will not go.",
  description:
    "Tuesday at 1:00 pm, Elanor Webb's conference table. She has identified the likely source as Aria Vale from L9, through her husband. She asks one question. The discipline is to answer it honestly, including the thing you have not told anyone. The lawyer who knows your worst thing is the lawyer who can build a defense around it. The version you would prefer is the version that loses the case.",
  tier: "vip",
  track: "female",
  level: 13,
  order: 2,
  estimatedMinutes: 13,
  difficulty: "advanced",
  category: "social-dynamics",
  xpReward: 380,
  badgeId: "honest-accounting",
  startSceneId: "arrival",
  prerequisites: ["mission-13-1"],
  isNew: true,
  tacticsLearned: [
    "Honest accounting with your own advocate",
    "Lowering the floor before the question is asked",
    "Naming the source attribution behind a covert campaign",
    "Preemptive context as defense, not response",
  ],
  redFlagsTaught: [
    "The curated truth as omission, not protection",
    "Defending the version your nervous system prefers",
    "The velocity of an answer as data, not cover",
    "Building defense on sand by withholding from counsel",
  ],
  reward: {
    id: "honest-accounting",
    name: "Honest Accounting",
    description:
      "You lowered the floor under which the defense would not go. The hit became a clarification because the work, this time, was the legal posture.",
  },
  characters: [PRIYA, ELANOR, ARIA, INNER_VOICE],
  scenes,
};

export default mission13_2;
