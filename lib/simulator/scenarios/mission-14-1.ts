/**
 * Female Track. Mission 14-1 "The Episode"
 *
 * Wednesday 6:00 am. Eight days after the screenshot. Davis Karim's
 * episode drops on schedule. The Margaret Lin preemptive piece went
 * up Friday 6:14 pm at The Margin. The defense plan from L13-2 is
 * either holding or being recovered, depending on the player's earlier
 * choices. This scenario assumes the structural posture from L13-2's
 * GOOD path (the floor was lowered, the piece is up).
 *
 * The discipline taught: the work after the public moment is not
 * damage control. It is the work of being the person the preemptive
 * piece described.
 *
 * Handoff out: Kaya's check-in text Wednesday 11:14 am + a partnership
 * inquiry six weeks later. L14-2 opens on the inquiry.
 *
 * Pilot reference: `reference/L14-1-pilot.md`.
 */

import type { Scenario, Scene } from "../types";
import { PRIYA, INNER_VOICE, ELANOR, KAYA } from "../characters";

const scenes: Scene[] = [
  {
    id: "cold-open",
    backgroundId: "kitchen",
    mood: "cold",
    dialog: [
      {
        speakerId: null,
        text: "Wednesday. 5:58 am. Your kitchen. The lights are at twenty percent because you have been awake for forty-three minutes and any brighter would feel like agreement with the day before it has started.",
      },
      {
        speakerId: null,
        text: "The Margaret Lin piece went live Friday at 6:14 pm at The Margin. Title: On The Quiet Pattern Of Senior Women Naming Their Mistakes Cleanly. Two thousand three hundred words. Your name in the second paragraph. Your specific 2022 sentence in the seventh.",
      },
      {
        speakerId: "inner-voice",
        tone: "tactical",
        text: "Four days of context have now had the chance to land before the episode drops. The audience for the episode is a Venn. Some have read the piece. Some are about to hear your voice for the first time in this register.",
      },
      {
        speakerId: null,
        text: "Your phone is on Do Not Disturb. Three people are exempted: Elanor, Priya, your sister.",
      },
      {
        speakerId: "inner-voice",
        tone: "tactical",
        text: "Six o'clock. Two minutes.",
      },
    ],
    nextSceneId: "episode-drops",
  },

  {
    id: "episode-drops",
    backgroundId: "kitchen",
    mood: "tense",
    dialog: [
      {
        speakerId: null,
        text: "6:00 am. The episode goes up. You do not refresh. You do not check. You sit at the table and you drink the cold tea you forgot to drink hot.",
      },
      {
        speakerId: null,
        text: "6:02. The notification you cannot suppress fires once. Elanor.",
      },
      {
        speakerId: "elanor",
        emotion: "knowing",
        text: "I have heard the first eleven minutes. The 2022 sentence is in there. It lands inside the context Margaret built.",
      },
      {
        speakerId: "elanor",
        emotion: "knowing",
        text: "Davis Karim sounds careful about it. He does not sound vindicated. He sounds like a man who has been told by his lawyer that the piece in The Margin happened.",
      },
      {
        speakerId: "elanor",
        emotion: "knowing",
        text: "Continue your morning. I will call at 9:00 with the structural read.",
      },
      {
        speakerId: "inner-voice",
        tone: "tactical",
        text: "Three sentences. She has just told you what she thinks while sounding like she is naming facts. The piece landed.",
      },
      {
        speakerId: null,
        text: "You put the phone face-down on the table again. The tea is now two cups in. You drink the second cup warm.",
      },
      {
        speakerId: "inner-voice",
        tone: "tactical",
        text: "The work is the work. Read the room before you respond.",
      },
    ],
    nextSceneId: "the-choice",
  },

  {
    id: "the-choice",
    backgroundId: "kitchen",
    mood: "tense",
    dialog: [
      {
        speakerId: "inner-voice",
        tone: "tactical",
        text: "Three openings at 6:18.",
      },
    ],
    choices: [
      {
        id: "lean-into-work",
        text: "Open the slide deck for the 10:00 am client meeting. Make the two small edits you have been meaning to make. Eat the toast. Get ready as if it is a Wednesday.",
        tactic:
          "Lean into the work. The preemptive piece described a person. Be the person it described for the next seventy-two hours. The picture fills the frame through routine.",
        isOptimal: true,
        event: "optimal-with-grace",
        nextSceneId: "path-a-the-work",
      },
      {
        id: "draft-response",
        text: "Open a doc. Draft a response post. The version of what you would say if you were going to say something.",
        tactic:
          "The response that does not need to be written. The drafting is the cost. You will end up re-reading the episode in your own voice whether you publish or not.",
        nextSceneId: "path-b-respond-publicly",
      },
      {
        id: "read-comments",
        text: "Open Twitter. Read the comments under the episode post. See what people are saying.",
        tactic:
          "Reading the timeline. The aggregate of opinion is not information. It is weather. You are about to spend the morning under weather.",
        event: "failure-rejected",
        nextSceneId: "path-c-read-the-comments",
      },
    ],
  },

  {
    id: "path-a-the-work",
    backgroundId: "kitchen",
    mood: "professional",
    dialog: [
      {
        speakerId: null,
        text: "6:18 am. You open the deck. The client meeting is at 10:00. The agenda has nine slides. You add a tenth at slide three, a line about the methodology question the client asked on Tuesday.",
      },
      {
        speakerId: null,
        text: "7:14 am. You get dressed. The dark grey Loro Piana you bought three years ago because Kaya said it was the only suit you owned that made you look like the senior person in the room.",
      },
      {
        speakerId: "inner-voice",
        tone: "tactical",
        text: "The deck is the work. The suit is the work. The 10:00 is the work. The 10:00 was on your calendar before the screenshot. It will be on your calendar after the news cycle.",
      },
      {
        speakerId: null,
        text: "9:00 am. Elanor calls.",
      },
      {
        speakerId: "elanor",
        emotion: "knowing",
        text: "I have heard the full episode. The 2022 sentence is the only specific claim. Margaret's piece already contextualised it. Davis Karim does not name a new allegation. He spends the second half on industry commentary that does not include you.",
      },
      {
        speakerId: "elanor",
        emotion: "knowing",
        text: "Three days of news cycle. Two outlets will pick it up. Neither will lead with the audio. You will not need a public response. You will need to be in the meetings you were going to be in.",
      },
      {
        speakerId: "elanor",
        emotion: "knowing",
        text: "The answer to the question what are you doing about this is the meetings you were going to be in.",
      },
      {
        speakerId: null,
        text: "10:00 am. The client meeting. You present the deck. You give the methodology answer cleanly. The client does not mention the podcast. Neither do you. The meeting ends at 10:47. The deck is approved at 10:52 via email.",
      },
      {
        speakerId: "inner-voice",
        tone: "tactical",
        text: "The work is the work. The work is the answer.",
      },
    ],
    nextSceneId: "ending-the-frame-filled",
  },

  {
    id: "path-b-respond-publicly",
    backgroundId: "kitchen",
    mood: "professional",
    dialog: [
      {
        speakerId: null,
        text: "You open a Notes file. You title it Response. You write two paragraphs. They are good paragraphs. The voice is yours. The facts are correct.",
      },
      {
        speakerId: "inner-voice",
        tone: "tactical",
        text: "You re-read what you wrote. The re-reading takes thirteen minutes. By minute eight you have re-read the episode in your own head twice in order to know what you are responding to.",
      },
      {
        speakerId: null,
        text: "You do not publish. You save the file. You close the laptop. The morning is now thirty-eight minutes older than it was at 6:18.",
      },
      {
        speakerId: "elanor",
        emotion: "knowing",
        text: "I have heard the full episode. Do not respond publicly. The piece in The Margin already did the work. You did not need a draft for that.",
      },
      {
        speakerId: "inner-voice",
        tone: "tactical",
        text: "The cost was thirty-eight minutes plus the two re-reads of the episode. The cost is recoverable. It is not zero.",
      },
      {
        speakerId: null,
        text: "10:00 am client meeting. You give the methodology answer a half-beat slower than you would have given it without the morning you just had.",
      },
    ],
    nextSceneId: "ending-the-response",
  },

  {
    id: "path-c-read-the-comments",
    backgroundId: "kitchen",
    mood: "danger",
    dialog: [
      {
        speakerId: null,
        text: "You open Twitter. You read the replies. Forty-one of them at 6:32 am. Most are neutral. Some are supportive in a register you did not ask for. Four are hostile.",
      },
      {
        speakerId: "inner-voice",
        tone: "tactical",
        text: "The four hostile replies are the only ones your nervous system has retained at 6:48 am. You did not ask your nervous system which replies to retain. It chose for you.",
      },
      {
        speakerId: null,
        text: "You read for forty-three minutes. You scroll to a quoted retweet by an account with forty-eight followers. The quote says this is the kind of woman who. You stop reading at the kind of woman who. You close the app.",
      },
      {
        speakerId: null,
        text: "The 9:00 call from Elanor finds you eleven minutes late to your own morning. You are in the same chair you have been in since 5:58 am. You have not eaten. You have not put on the Loro Piana.",
      },
      {
        speakerId: "elanor",
        emotion: "knowing",
        text: "Did you sleep.",
      },
      {
        speakerId: "inner-voice",
        text: "I slept.",
      },
      {
        speakerId: "elanor",
        emotion: "knowing",
        text: "Were you on Twitter this morning.",
      },
      {
        speakerId: "inner-voice",
        tone: "tactical",
        text: "Elanor knows. She has done this for twenty years.",
      },
      {
        speakerId: "elanor",
        emotion: "knowing",
        text: "Stop. Get dressed. Eat. Go to the meeting. The commentary is weather. You do not navigate weather by staring at it.",
      },
    ],
    nextSceneId: "ending-the-comments",
  },

  {
    id: "ending-the-frame-filled",
    backgroundId: "office",
    mood: "professional",
    isEnding: true,
    outcomeType: "good",
    endingTitle: "The Frame Filled",
    endingSummary:
      "The episode dropped. The frame Margaret built held. The 2022 sentence landed inside context. You went to the 10:00 meeting in the Loro Piana and the client did not mention the podcast. The deck was approved at 10:52. The news cycle ran for three days. Two outlets covered it. Neither led with the audio. The picture filled the frame through routine, not through commentary.",
    endingLearnPrompt:
      "After a public moment, the question is not what to say. It is which version of yourself to be visible as. The version is built through the next seventy-two hours of routine, not through a paragraph.",
    dialog: [
      {
        speakerId: null,
        text: "11:14 am. Kaya texts.",
      },
      {
        speakerId: "kaya",
        emotion: "knowing",
        text: "I watched the deck approval land at 10:52. The Margin piece was the right move. Quiet dinner Friday. 8:00. The usual.",
      },
      {
        speakerId: "priya",
        emotion: "knowing",
        text: "Saw your week. Proud. Sunday tea is on me. 2 pm. Bring the daughter the pain au choco from Maison Kayser if you are passing.",
      },
      {
        speakerId: "inner-voice",
        tone: "tactical",
        text: "Three days of news cycle. Six weeks of quiet. Six weeks from now, a partnership inquiry will land in your inbox from someone whose name will be familiar.",
      },
    ],
  },

  {
    id: "ending-the-response",
    backgroundId: "kitchen",
    mood: "professional",
    isEnding: true,
    outcomeType: "neutral",
    endingTitle: "The Response That Stayed Drafted",
    endingSummary:
      "You wrote two paragraphs. You did not publish. The morning cost you thirty-eight minutes and two extra re-reads of the episode in your own head. The 10:00 went fine. The methodology answer was a half-beat slow. No one but you noticed. The cost is recoverable. It is not zero.",
    endingLearnPrompt:
      "Drafting a response is also reading the thing you are responding to. The reading is the cost. Note the next time you draft a paragraph that will not be sent.",
    dialog: [
      {
        speakerId: null,
        text: "11:14 am Kaya texts.",
      },
      {
        speakerId: "kaya",
        emotion: "knowing",
        text: "Saw the deck approval. Friday dinner if you can. 8:00.",
      },
    ],
  },

  {
    id: "ending-the-comments",
    backgroundId: "office",
    mood: "cold",
    isEnding: true,
    outcomeType: "bad",
    endingTitle: "The Weather",
    endingSummary:
      "Forty-three minutes on Twitter. Four hostile replies retained. One quoted retweet you stopped reading partway through. The 9:00 call with Elanor was your first sentence of the day. The 10:00 meeting happened in the suit you grabbed on the way out. The deck was approved at 11:14. The day got through. You will not remember it well.",
    endingLearnPrompt:
      "Reading the comments section is the worst thing you can do in the first six hours after a public moment. The aggregate of opinion is weather. Note the next time you reach for the timeline as if it were information.",
    failureBlogSlug: "the-comments-section-after-a-public-moment",
    failureBlogTitle: "Why reading the timeline after a public moment is the worst thing you can do",
    dialog: [
      {
        speakerId: "kaya",
        emotion: "knowing",
        text: "Sleep tonight. Friday dinner is at 8:00 if you can. Or 8:30. Both fine.",
      },
      {
        speakerId: "inner-voice",
        tone: "tactical",
        text: "Kaya knows. She does not say it. The 8:00 or 8:30 is the only sentence on Wednesday that holds any room for you.",
      },
    ],
  },
];

const mission14_1: Scenario = {
  id: "mission-14-1",
  title: "The Episode",
  tagline:
    "Wednesday 6:00 am. The episode drops. The picture fills the frame through routine.",
  description:
    "Eight days after Sunday's screenshot. Davis Karim's episode goes live at 6:00 am. The Margaret Lin preemptive piece has been up since Friday at 6:14 pm. The defense plan is built. The scenario teaches the work after the public moment, which is not damage control. It is the work of being the person the preemptive piece described.",
  tier: "vip",
  track: "female",
  level: 14,
  order: 1,
  estimatedMinutes: 11,
  difficulty: "advanced",
  category: "social-dynamics",
  xpReward: 400,
  badgeId: "frame-filled",
  startSceneId: "cold-open",
  prerequisites: ["mission-13-2"],
  isNew: true,
  tacticsLearned: [
    "Filling the frame through routine, not through commentary",
    "Treating the meetings on your calendar as the answer",
    "Naming the aggregate of opinion as weather, not information",
    "Letting the preemptive piece do its work",
  ],
  redFlagsTaught: [
    "Drafting a response that does not need to be sent",
    "Reading the timeline as if it were information",
    "Retaining the hostile replies without naming the retention",
    "Spending the morning under weather instead of in routine",
  ],
  reward: {
    id: "frame-filled",
    name: "The Frame Filled",
    description:
      "Three days of news cycle. Two outlets. Neither led with the audio. The deck was approved at 10:52. The picture filled the frame through routine.",
  },
  characters: [PRIYA, ELANOR, KAYA, INNER_VOICE],
  scenes,
};

export default mission14_1;
