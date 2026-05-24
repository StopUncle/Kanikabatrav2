/**
 * after-her-5-2, "The Sister"
 *
 * After-Her L5-2. Thursday, 4:18 p.m. Week ten. Her sister Kai DMs
 * you. The message is careful, well-phrased. The carefulness is the
 * tell.
 *
 * The L1-2 audit pre-wrote the response if you took the optimal path
 * at L1-2. The discipline of L5-2 is to use the pre-written response
 * if you have one, or to write it now if you do not. Engagement
 * beyond the three-sentence reply opens the channel.
 *
 * Antagonist: KAI_FRIEND. The sister channel is the one you cannot
 * block; the move is the pre-commitment, not the closure.
 *
 * Teaches:
 *  - The sister is the channel that cannot be blocked.
 *  - Use the pre-written response from L1-2 if you wrote one.
 *  - Three sentences. No follow-up. The conversation is closed.
 *  - Engaging beyond the three sentences opens the wedge.
 */

import type { Scenario, Scene } from "../../types";
import { INNER_VOICE_M, KAI_FRIEND } from "../../characters-male";

const scenes: Scene[] = [
  {
    id: "the-dm",
    backgroundId: "apartment",
    mood: "tense",
    presentCharacterIds: ["kai-friend", "inner-voice"],
    dialog: [
      {
        speakerId: null,
        text: "Thursday, 4:18 p.m. Week ten. You are at the desk in the flat. The L5-1 boss closed two days ago with the block of the new number. The work is integrating. The phone, face-down beside the laptop, lights up with an Instagram DM.",
      },
      {
        speakerId: "kai-friend",
        emotion: "knowing",
        text: 'hey. i hope this is ok. i just wanted to say i always liked you and i think she\'s been struggling. i know it\'s not my place. just. that\'s what i wanted to say.',
      },
      {
        speakerId: "inner-voice",
        tone: "tactical",
        text: "The sister channel. Kai is not lying; she did like you; she does think the ex is struggling. Kai is also a vehicle. The carefulness of the phrasing is the tell. The L1-2 audit pre-committed a response to this exact message. The pre-written version, if you wrote one, is in the notes app.",
        emotion: "knowing",
      },
    ],
    choices: [
      {
        id: "use-pre-written-response",
        text: 'Open the Notes app. Find the L1-2 pre-write. Copy-paste. Send. Close the thread.',
        tactic: "The cleanest possible move. The pre-write was authored by Saturday-morning-you with the calmness intact. Future-you, in November, in the spiral, is not qualified to write this response from scratch. The pre-write is the only qualified author. The send happens; the thread closes; the channel does not open further.",
        nextSceneId: "ending-pre-write-used",
        isOptimal: true,
        event: "optimal-with-grace",
      },
      {
        id: "write-it-now-clean",
        text: 'Write the response now. Three sentences: "Appreciate you saying that, Kai. Take care. I am not going to ask after her." Send.',
        tactic: "The structural answer, written in the moment, if no L1-2 pre-write exists. Three sentences. The 'I am not going to ask after her' is the line that closes the wedge in advance; without that line Kai's follow-up has a place to land.",
        nextSceneId: "ending-written-now-clean",
        isOptimal: true,
      },
      {
        id: "ask-after-her",
        text: 'Reply: "Thanks Kai. Yeah, I have been worried about her. Is she."',
        tactic: "The 'is she' is the wedge landing exactly where Kai's carefulness invited it to land. Kai will respond with the specific information designed to land. The conversation is now Kai's wedge plus your asking; the L1-2 pre-commitment failed at this message because the line about not asking was not held.",
        nextSceneId: "the-wedge",
        isOptimal: false,
      },
      {
        id: "screenshot-marcus",
        text: 'Screenshot the message. Send to Marcus.',
        tactic: "Marcus is asleep / at work / not relevant to a Kai DM at 4:18 p.m. The screenshot is the audit outsourced; the structural problem is that the audit of a Kai DM has to happen inside you because Kai is not someone Marcus knows. The screenshot delays the response; the delay teaches Kai that the message landed without an audit.",
        nextSceneId: "the-screenshot",
        isOptimal: false,
      },
    ],
  },

  {
    id: "the-wedge",
    backgroundId: "apartment",
    mood: "tense",
    presentCharacterIds: ["kai-friend", "inner-voice"],
    dialog: [
      {
        speakerId: "kai-friend",
        emotion: "knowing",
        text: 'i mean. she has not been sleeping well. she has been talking about you a lot. honestly i did not know if you knew or if you wanted to know. but yeah.',
      },
      {
        speakerId: "inner-voice",
        tone: "tactical",
        text: "The wedge landed. The information is specific and was prepared in advance. Kai is not necessarily knowingly being a vehicle; the message has been workshopped, between Kai and her sister, possibly across multiple conversations, into the form that arrived in your DMs at 4:18 p.m. The carefulness of the original message was the tell; the wedge is the design.",
        emotion: "serious",
      },
    ],
    choices: [
      {
        id: "close-after-wedge",
        text: 'Reply: "Appreciate you, Kai. I am going to leave it there for now. Take care." Close the thread.',
        tactic: "Late but recoverable. The wedge landed; the closing arrives one message late. Kai will not respond to this; the channel is, structurally, closed by the 'I am going to leave it there' which is the clean refusal of the next message. The cost is the wedge information is now in your head; the recovery is the channel does not open further.",
        nextSceneId: "ending-late-close",
        isOptimal: true,
      },
      {
        id: "ask-more",
        text: 'Reply: "What has she been saying."',
        tactic: "The what-has-she-been-saying is the cafe in textual form. The L5-1 boss is reopening through Kai. The next message will contain the specific sentences from the ex that are designed to be the door. By Saturday you have texted the ex directly from her new new number that Kai is, structurally, about to give you.",
        nextSceneId: "the-quotes",
        isOptimal: false,
      },
    ],
  },

  {
    id: "the-quotes",
    backgroundId: "apartment",
    mood: "tense",
    presentCharacterIds: ["kai-friend", "inner-voice"],
    dialog: [
      {
        speakerId: "kai-friend",
        emotion: "knowing",
        text: 'she said she did the thing the wrong way. she said she has been working with a therapist for six weeks and she has been wanting to reach out and she does not know how. she said she is at our parents on saturday if you wanted to. yeah. anyway. that is what she said.',
      },
      {
        speakerId: "inner-voice",
        tone: "tactical",
        text: "The quotes are the artefacts. They are calibrated. The 'at our parents on Saturday' is the location anchor in the same architecture as the cafe from the L5-1 boss. The L5-2 channel has, through Kai, successfully delivered the structural offer to meet at a third location, which Kai is not going to be the messenger for the rejection of, which means the L5-2 boss has succeeded at the channel level even if you decline the location.",
        emotion: "sad",
      },
    ],
    choices: [
      {
        id: "decline-saturday-clean",
        text: 'Reply: "I am not coming on Saturday, Kai. Please do not pass any further messages between us. I love you both." Close.',
        tactic: "Latest possible recovery. The decline is clean; the request that Kai stop being the vehicle is named explicitly; the love-you-both is the courtesy that holds the relationship with Kai while closing the channel. The cost is the quotes are now in your head, and the quotes will work on you for the next week. The L5-2 boss is closed at the latest possible scene.",
        nextSceneId: "ending-saturday-declined",
        isOptimal: true,
      },
      {
        id: "go-to-saturday",
        text: '"What time will she be there."',
        tactic: "The asking-of-time is the acceptance. Saturday is now booked through her sister, in a location chosen by the ex, with the dog and her parents as the social anchor designed to convert the meeting into a not-a-meeting. The six weeks from L5-1 are now booked through a different door.",
        nextSceneId: "ending-saturday-accepted",
        isOptimal: false,
      },
    ],
  },

  {
    id: "the-screenshot",
    backgroundId: "apartment",
    mood: "cold",
    presentCharacterIds: ["inner-voice"],
    dialog: [
      {
        speakerId: null,
        text: "Marcus reads it at 7:42 p.m. three hours later. The reply is short.",
      },
      {
        speakerId: null,
        text: "Marcus: 'three sentences, mate. appreciate it, take care, you are not going to ask after her. send.'",
      },
      {
        speakerId: "inner-voice",
        tone: "tactical",
        text: "Marcus reproduced the L1-2 pre-write almost verbatim, because Marcus is, on this point, paying attention. The structural lesson is that the answer was always going to be the same three sentences, with or without the screenshot. The cost of the screenshot is the three hours Kai did not get an answer.",
        emotion: "knowing",
      },
    ],
    choices: [
      {
        id: "send-marcus-version",
        text: "Send Kai the three sentences Marcus wrote. Then close the thread.",
        tactic: "Half-recovery. The right response arrives three hours late. Kai will not have read into the delay; she may have, depending on her cycle of the day. The cost is the small confirmation to Kai that the audit happened outside you, which is structurally the same problem as the L5-1 male-track screenshot to Marcus.",
        nextSceneId: "ending-marcus-helped",
        isOptimal: true,
      },
      {
        id: "wait-for-more-marcus-advice",
        text: "Wait. Maybe call Marcus. Get the full read first.",
        tactic: "The full read is, by 9 p.m., a forty-minute call where Marcus walks you through what your three sentences should be, which produces the same three sentences, six hours late. By the time the response is sent, Kai has assumed you are not responding, which is its own message, sent by silence.",
        nextSceneId: "ending-silence-by-delay",
        isOptimal: false,
      },
    ],
  },

  // Endings
  {
    id: "ending-pre-write-used",
    backgroundId: "apartment",
    mood: "peaceful",
    isEnding: true,
    outcomeType: "good",
    endingTitle: "The Pre-Write, Used",
    endingLearnPrompt:
      "The Saturday-morning-you who wrote the response at L1-2 just sent it for you. The structural lesson lands: the pre-commitment device worked. The reply went inside of ninety seconds of the DM arriving; Kai received the clean answer; the channel does not open further. The L5-2 boss closed at the speed of a copy-paste because the work of L1-2 was done. This is the cleanest ending L5-2 can produce and it is the cheapest one to live because the work was front-loaded.",
    dialog: [
      {
        speakerId: "inner-voice",
        text: "Reply sent. Phone face-down. The desk is the desk. The L1-2 pre-write closed the L5-2 boss inside of two minutes.",
        emotion: "knowing",
      },
      {
        speakerId: "inner-voice",
        tone: "tactical",
        text: "Saturday-you wrote the answer for you.",
        emotion: "knowing",
      },
    ],
    choices: [],
  },

  {
    id: "ending-written-now-clean",
    backgroundId: "apartment",
    mood: "peaceful",
    isEnding: true,
    outcomeType: "good",
    endingTitle: "Three Sentences",
    endingLearnPrompt:
      "Three sentences, written in the moment, with the line about not asking after her holding the door closed. Kai received the clean answer; she will not pass further messages. The L1-2 pre-commitment was not written, but the structural answer was reconstructed in the moment because the eight weeks of work made the structural answer obvious. The L5-2 boss closed cleanly. The lesson lands at full credit because the response held the line; next L5-2-equivalent, write the pre-write at L1-2 and save yourself the minute.",
    dialog: [
      {
        speakerId: "inner-voice",
        text: "Three sentences. Sent. Phone face-down. The desk returns to the work it was doing at 4:17.",
        emotion: "knowing",
      },
    ],
    choices: [],
  },

  {
    id: "ending-late-close",
    backgroundId: "apartment",
    mood: "cold",
    isEnding: true,
    outcomeType: "neutral",
    endingTitle: "The Wedge, Heard, Closed",
    endingLearnPrompt:
      "The wedge information landed; the closing arrived one message late. The cost is that the wedge is now in your head and the wedge will work on you for a week. The L5-2 boss closed at the second move instead of the first. The lesson lands at half cost: the line about not asking is the line that has to be in the first reply, not the second. Next L5-2-equivalent, hold the line at the first message.",
    dialog: [
      {
        speakerId: "inner-voice",
        text: "Phone face-down. The wedge information sitting on the desk like a piece of mail you have read.",
        emotion: "serious",
      },
    ],
    choices: [],
  },

  {
    id: "ending-saturday-declined",
    backgroundId: "apartment",
    mood: "cold",
    isEnding: true,
    outcomeType: "neutral",
    endingTitle: "Saturday, Declined",
    endingLearnPrompt:
      "Saturday was the location anchor and Saturday was refused. Kai received the named request to stop being the vehicle, which is the cleanest possible exit from the sister channel that the sister channel allows. The cost is the quotes are now in your head and the quotes will work on you for the next week, the way the wedge does, except sharper because the quotes are calibrated. The L5-2 boss closed at the latest scene; the runway holds; the cost is the most you have paid on this level and is recoverable.",
    dialog: [
      {
        speakerId: "inner-voice",
        text: "Reply sent. Phone face-down. Saturday on the calendar is still Saturday and is also, now, the day you will spend not going somewhere.",
        emotion: "serious",
      },
    ],
    choices: [],
  },

  {
    id: "ending-saturday-accepted",
    backgroundId: "apartment",
    mood: "tense",
    isEnding: true,
    outcomeType: "bad",
    endingTitle: "Saturday, At Her Parents'",
    failureBlogSlug: "narcissistic-hoovering-explained",
    failureBlogTitle: "Narcissistic Hoovering: When Your Ex Tries to Suck You Back In",
    endingLearnPrompt:
      "Saturday is booked through her sister, in a location chosen by the ex, with the dog and her parents as the structural anchors. The six weeks from L5-1 are now booked through the sister channel. The L4-1 and L4-2 work survives in the body; the choice has overridden the L1-2 and L5-1 protections. Tomorrow's first move: text Kai 'i should not have asked the time, i am not coming, please do not pass any further messages.' If you go on Saturday, the L5-1 six-week scene runs from here with her parents at the cold open.",
    dialog: [
      {
        speakerId: "inner-voice",
        text: "Kai: 'she is there from 2.' The time on the calendar at 2 p.m. Saturday looking like a meeting it is not labelled as.",
        emotion: "sad",
      },
    ],
    choices: [],
  },

  {
    id: "ending-marcus-helped",
    backgroundId: "apartment",
    mood: "cold",
    isEnding: true,
    outcomeType: "neutral",
    endingTitle: "Three Sentences, Three Hours Late",
    endingLearnPrompt:
      "Marcus reproduced the L1-2 pre-write that you did not write. The three sentences went to Kai three hours late. The cost is the small delay Kai may read into; the recovery is the response was correct and clean. The lesson lands at three-quarter cost: the answer was always the same three sentences; the screenshot to Marcus was the audit outsourced; next L5-2-equivalent, write the pre-write at L1-2 and the response is yours, on time.",
    dialog: [
      {
        speakerId: "inner-voice",
        text: "Marcus's three sentences in Kai's DMs at 7:48. Phone face-down. The audit was Marcus's; the answer was always the same.",
        emotion: "knowing",
      },
    ],
    choices: [],
  },

  {
    id: "ending-silence-by-delay",
    backgroundId: "apartment",
    mood: "cold",
    isEnding: true,
    outcomeType: "bad",
    endingTitle: "The Silence That Was Not Silence",
    failureBlogSlug: "narcissistic-hoovering-explained",
    failureBlogTitle: "Narcissistic Hoovering: When Your Ex Tries to Suck You Back In",
    endingLearnPrompt:
      "Six hours of waiting for Marcus to walk you through three sentences. By the time the answer is sent, Kai has assumed you are not responding; the assumption is its own message; the ex will be told. The L5-2 boss is structurally closed by the same three sentences but the delay produces a different signal: that you were considering, which is interpreted as engagement. Re-do L1-2's pre-commitment step tonight. The pre-write must exist before the next L5-2-equivalent.",
    dialog: [
      {
        speakerId: "inner-voice",
        text: "Marcus's call ended at 9:48. Reply sent at 10:02. Kai's read receipt at 10:08. No reply from Kai.",
        emotion: "sad",
      },
    ],
    choices: [],
  },
];

export const afterHer52: Scenario = {
  id: "after-her-5-2",
  title: "The Sister",
  tagline:
    "Thursday, 4:18 p.m. Kai DMs. The carefulness of the phrasing is the tell. The L1-2 pre-write was authored exactly for this.",
  description:
    "After-Her L5-2. The laundered channel. Her sister cannot be blocked; the move is the pre-commitment, not the closure. The teaching is that L1-2's optional pre-write step is the artefact that closes L5-2 at copy-paste speed. The L1-2 audit either pre-committed the three-sentence response, or it did not; if it did, this scenario is the cheapest possible boss-half on the track; if it did not, the response must be reconstructed in the moment, including the line about not asking after her, which is the line that closes the wedge in advance.",
  tier: "vip",
  track: "after-her",
  level: 5,
  order: 2,
  estimatedMinutes: 11,
  difficulty: "advanced",
  category: "narcissist",
  xpReward: 480,
  startSceneId: "the-dm",
  prerequisites: ["after-her-5-1"],
  tacticsLearned: [
    "Use the L1-2 pre-write. Saturday-morning-you wrote the answer.",
    "If no pre-write exists, reconstruct three sentences with the not-asking line.",
    "Engage beyond the three sentences and the wedge lands.",
    "The 'what has she been saying' is the cafe in textual form.",
    "Screenshotting to Marcus delays the answer to the answer you would have written.",
  ],
  redFlagsTaught: [
    "The carefulness of Kai's phrasing as the workshopped tell",
    "The wedge with specific information designed in advance",
    "The Saturday at the parents as the location anchor for the not-a-meeting",
    "The quotes from the ex calibrated to be the door",
    "The 'is she' question that gives Kai the wedge's landing spot",
  ],
  characters: [INNER_VOICE_M, KAI_FRIEND],
  scenes,
  isNew: true,
};

export default afterHer52;
