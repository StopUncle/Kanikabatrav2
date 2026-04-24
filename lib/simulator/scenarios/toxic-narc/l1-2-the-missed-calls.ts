/**
 * tn-1-2 — "The Missed Calls"
 *
 * Toxic-Narc track, Level 1, order 2. Monday morning after a tn-1-1
 * decline. The martyr-register escalation has compounded overnight.
 *
 * Teaches:
 *  - Voicemail triage (listen once, read transcript, categorise)
 *  - The text-to-Ren channel as the low-cost intelligence route
 *  - Ringer-off vs. block-the-number — which move at which escalation
 *  - The 'fake emergency' detection — vague urgency without specifics
 *  - How to restart a day a narc parent has tried to pre-script
 *
 * Voice: reference/KANIKA-VOICE.md and reference/TRACK-toxic-narc.md.
 */

import type { Scenario, Scene } from "../../types";
import {
  INNER_VOICE,
  THE_MOTHER,
  GOLDEN_SIBLING,
  PRIYA,
} from "../../characters";

const scenes: Scene[] = [
  // ===================================================================
  // ACT 1 — waking to the pile
  // ===================================================================
  {
    id: "monday-7am",
    backgroundId: "apartment",
    mood: "tense",
    dialog: [
      {
        speakerId: null,
        text: "Monday, 7:14 a.m. You pick up the phone. The lock screen shows: 14 missed calls, 23 messages, 1 voicemail — the voicemail is labelled, in your own handwriting from years ago because she taught your phone the phrase, 'critical.'",
      },
      {
        speakerId: null,
        text: "All 14 of the missed calls are from her. Six of the 23 messages are also from her, arriving in a cluster between 9:42 p.m. and 11:18 p.m. last night. The last one reads, simply: 'please.'",
      },
      {
        speakerId: "inner-voice",
        text: "Note the shape of the pile. Fourteen calls in a four-hour window is not a woman who needs something; it is a woman running a specific performance. The 'critical' voicemail label is a frame she trained your phone to apply years ago — the label is not a fact, it is a pre-installed frame. And the final 'please' on its own line, at 11:18 p.m., is the dramatic punctuation of a message sequence designed to read as a sequence.",
        emotion: "concerned",
      },
      {
        speakerId: "inner-voice",
        text: "Your mother is not dying. You do not know that for certain at 7:14 a.m. on a Monday — you believe it, with approximately 97% confidence, based on thirty years of data. The other 3% is what she is exploiting. You will resolve the 3% in a single text to Ren within the next two minutes, and the question of the remaining 23 messages will take care of itself.",
        emotion: "knowing",
      },
    ],
    choices: [
      {
        id: "text-ren-first",
        text: "Before listening to any voicemail: text Ren. 'Is mum actually ill?'",
        tactic: "Route the 3% uncertainty through the independent witness. Ren knows the facts. You will know in under three minutes without listening to a voicemail she has engineered for maximum emotional extraction.",
        nextSceneId: "ren-verifies",
        isOptimal: true,
      },
      {
        id: "listen-voicemail",
        text: "Listen to the voicemail first. You need to know what she actually said.",
        tactic: "Voicemails are her format of choice — she can sob, pause, self-correct, whisper. Listening in real-time with her voice in your head at 7 a.m. is exactly what the voicemail was built for. If you must know the content, read the transcript, not the audio.",
        nextSceneId: "voicemail-audio",
      },
      {
        id: "read-transcript",
        text: "Read the voicemail transcript. Do not listen to the audio.",
        tactic: "The information-to-adrenaline ratio of a transcript is dramatically better than the audio. You get the facts of what she said without the performance layer that the audio transmits.",
        nextSceneId: "transcript-read",
        isOptimal: true,
      },
      {
        id: "ringer-off-defer",
        text: "Turn the ringer off. Turn notifications off for her specifically. Do not engage with any of it before coffee.",
        tactic: "Nervous-system protection first, information-gathering second. You cannot make a clean decision at 7:14 with a dry mouth and fourteen missed calls glowing on the screen.",
        nextSceneId: "ringer-off",
        isOptimal: true,
      },
    ],
  },

  // ===================================================================
  // ACT 2A — Ren verifies
  // ===================================================================
  {
    id: "ren-verifies",
    backgroundId: "text-screen",
    mood: "peaceful",
    presentCharacterIds: ["sibling"],
    dialog: [
      {
        speakerId: null,
        text: "You type the question in five words. You send. Ren is awake — Ren is always awake at 7 a.m., which is one of the reasons this channel works.",
      },
      {
        speakerId: "sibling",
        text: '"no. she is fine. she is running the party thing hard because you said no yesterday. she called me at 10:30pm to cry about it. she is not ill. cara is not ill. the house is not on fire."',
        emotion: "knowing",
      },
      {
        speakerId: "sibling",
        text: '"fourteen calls is the most i have ever seen her do. that is a new record. she is specifically trying to break you."',
        emotion: "serious",
      },
      {
        speakerId: "inner-voice",
        text: "Ren just resolved the 3%. The voicemail labelled 'critical' is not critical. The fourteen calls are not an emergency; they are a manufactured pressure campaign that escalated past her usual envelope because your Sunday decline landed harder than she expected. That is, in a sense, evidence that the Sunday decline worked. She would not have fired fourteen calls if she were still in control of the frame.",
        emotion: "knowing",
      },
    ],
    choices: [
      {
        id: "delete-voicemail-unread",
        text: "Delete the voicemail without reading or listening. Text Ren back: 'thank you. going to ignore it today. love you.'",
        tactic: "The cleanest Monday-morning move available to you. The verification via Ren is the substitute for the voicemail. You do not owe the voicemail a listen.",
        nextSceneId: "ending-triaged-clean",
        isOptimal: true,
      },
      {
        id: "read-transcript-for-data",
        text: "Read the transcript anyway — as intel, not as a reply-trigger. Note the register, then move on.",
        tactic: "Reading for data after the 3% is resolved is a different act than reading to know if you should respond. Allowed, if you can read without spiralling.",
        nextSceneId: "transcript-read-cold",
        isOptimal: true,
      },
      {
        id: "send-single-sentence",
        text: "Text your mother: 'I got your messages. I am not ill. I am not coming. I love you. Do not call again today.'",
        tactic: "The warm-no-with-clock-added. Sets today as the no-go window explicitly. Some mothers respect an explicit clock-set and some escalate against it. Know yours.",
        nextSceneId: "mother-tests-clock",
      },
    ],
  },

  // ===================================================================
  // ACT 2B — voicemail audio
  // ===================================================================
  {
    id: "voicemail-audio",
    backgroundId: "apartment",
    mood: "danger",
    immersionTrigger: "manipulation-detected",
    presentCharacterIds: ["mother"],
    dialog: [
      {
        speakerId: null,
        text: "You hit play. Her voice is in your kitchen, through your phone speaker, at 7:16 a.m. on a Monday.",
      },
      {
        speakerId: "mother",
        text: "\"Darling. It is me. I have called — I am calling for — it is just. I do not know what I have done. I do not understand. I am not — I am not well. I am. Please. Please call me.\"",
        emotion: "pleading",
      },
      {
        speakerId: null,
        text: "The voicemail is forty-one seconds long. Twelve of those seconds are crying. The others are incomplete sentences delivered in a register you have heard approximately four hundred times in your life.",
      },
      {
        speakerId: "inner-voice",
        text: "Observe what the voicemail did to your body in forty-one seconds. Your pulse went up. Your breath shortened. The specific sensation of being a child in her kitchen at age eight arrived, un-asked. That is not an accident. Forty-one seconds of crying voicemail is the fastest-acting emotional payload available to a mother with a phone. She has been calibrating this payload for decades.",
        emotion: "concerned",
      },
      {
        speakerId: "inner-voice",
        text: "The information in the voicemail is not new. She said nothing you did not already know. What the voicemail did was install forty-one seconds of hot affect in your nervous system, specifically to raise the cost of holding your Sunday position. That is the whole function. Recognise that it worked — note the pulse, note the breath — and then do not respond while the payload is still active. Reply at hour two, not hour zero.",
        emotion: "knowing",
      },
    ],
    nextSceneId: "post-voicemail-hot",
  },

  {
    id: "post-voicemail-hot",
    backgroundId: "apartment",
    mood: "tense",
    dialog: [
      {
        speakerId: null,
        text: "You are now, at 7:17 a.m., in the specific physiological state the voicemail was engineered to produce. You have a choice about the next two minutes.",
      },
    ],
    choices: [
      {
        id: "call-her-back",
        text: "Call her back now. Whatever is happening, handle it on the phone.",
        tactic: "The payload worked. The voicemail's specific job was to produce this call within ten minutes. She will, within sixty seconds, be in control of the frame, the pace, and the ask. This is the trained response.",
        nextSceneId: "ending-payload-delivered",
        isOptimal: false,
      },
      {
        id: "put-phone-down-ren",
        text: "Put the phone down. Go text Ren on another device if you have one, or wait two hours before touching this one. Reply to nothing until the adrenaline settles.",
        tactic: "Recovery. You heard the audio; the audio cannot be un-heard; you can still refuse to act within the activation window.",
        nextSceneId: "ren-verifies",
        isOptimal: true,
      },
      {
        id: "write-it-out",
        text: "Open a notes app. Write down, verbatim, the exact sentence she said and what it made your body do. Do not send the note. Do not reply to her.",
        tactic: "Somatic logging. Putting the sentence on paper weakens its hold. You will re-read the note next week and the sentence will be smaller.",
        nextSceneId: "wrote-it-out",
        isOptimal: true,
      },
    ],
  },

  {
    id: "wrote-it-out",
    backgroundId: "apartment",
    mood: "peaceful",
    dialog: [
      {
        speakerId: null,
        text: "You open the household log from yesterday. You add a dated entry: 'Monday 7:14 a.m. — 14 missed calls overnight. Voicemail labelled critical, actually forty-one seconds of performed collapse. No new information. Body response: pulse up, breath short, eight-year-old sense-memory of her kitchen. Did not reply. Reply will be at hour two or not at all.'",
      },
      {
        speakerId: "inner-voice",
        text: "The entry does two things. One — it gets the sentence out of your head and into a document. Two — it contextualises the voicemail as part of a pattern rather than as an isolated emergency. The pattern file is the antidote to the episode file. She operates on episodes; you operate on patterns. That is the asymmetry.",
        emotion: "knowing",
      },
    ],
    nextSceneId: "ren-verifies",
  },

  // ===================================================================
  // ACT 2C — transcript read
  // ===================================================================
  {
    id: "transcript-read",
    backgroundId: "apartment",
    mood: "mysterious",
    dialog: [
      {
        speakerId: null,
        text: "You open the transcript. It runs to nine lines of broken syntax. The transcript shows that about 40% of the voicemail was non-verbal sound the transcription engine rendered as '[inaudible].' You read all nine lines in twenty-two seconds.",
      },
      {
        speakerId: "inner-voice",
        text: "The transcript is forty-one seconds of audio compressed into twenty-two seconds of reading. The compression removes the performance register — the crying is now '[inaudible],' the dramatic pauses are just line breaks. Reading the transcript is a different act than listening. Your pulse has not gone up. You have not returned to age eight in your own kitchen. You have the information without the payload.",
        emotion: "knowing",
      },
      {
        speakerId: "inner-voice",
        text: "This is a technique — always read the transcript, never listen to the audio, when the sender is someone who uses voice as an emotional delivery system. Some people do not; for those, audio is fine. For your mother, transcripts only, forever. Add this to your operational rules.",
        emotion: "knowing",
      },
    ],
    nextSceneId: "ren-verifies",
  },

  {
    id: "transcript-read-cold",
    backgroundId: "apartment",
    mood: "peaceful",
    dialog: [
      {
        speakerId: null,
        text: "You re-read the transcript now that Ren has resolved the emergency question. The same nine lines are, on second reading, much smaller. A sentence like 'I do not know what I have done' reads like a theatrical opening rather than a confession. 'Please call me' reads like a line of choreography.",
      },
      {
        speakerId: "inner-voice",
        text: "A sentence read in isolation and a sentence read in its operational context are two different sentences. Context is the difference between being moved and being informed. By reading after Ren's verification, you have read the transcript in its operational context — as the written record of a performance that did not land its intended target.",
        emotion: "knowing",
      },
    ],
    nextSceneId: "ending-triaged-clean",
  },

  // ===================================================================
  // ACT 2D — ringer off
  // ===================================================================
  {
    id: "ringer-off",
    backgroundId: "apartment",
    mood: "peaceful",
    dialog: [
      {
        speakerId: null,
        text: "You open the phone's settings. You go to her contact. You turn on 'Do Not Disturb' for her specifically — calls, messages, voicemail notifications, all silenced. You set the silencing to 'until I turn it off' rather than 'until tomorrow morning,' so the silencing is an active decision to reverse, not a timer that expires.",
      },
      {
        speakerId: "inner-voice",
        text: "You just performed a specific kind of nervous-system hygiene. The phone cannot wake you at 11 p.m. tonight. The lock screen will not show a stack of her messages every time you check the time. Your body, for the period of the silencing, is not on standby for her. That is a week of sleep you just bought yourself, if you hold the silencing.",
        emotion: "knowing",
      },
      {
        speakerId: "inner-voice",
        text: "Critically — the silencing is not a reply to her. You have not told her she is silenced. You have not sent a warning, a boundary email, or an announcement. The silencing is a private operational change. Do not tell her. Announcing a boundary invites a test of the boundary. Enacting a boundary without announcement simply changes the facts of the system.",
        emotion: "knowing",
      },
    ],
    choices: [
      {
        id: "silence-and-coffee",
        text: "Close the phone. Make coffee. Handle the 14 calls at 11 a.m., if at all.",
        tactic: "The 11 a.m. review rule from L1-2 of the anxiety track, applied to a narc-parent context. Same discipline, different target.",
        nextSceneId: "ending-triaged-clean",
        isOptimal: true,
      },
      {
        id: "text-ren-after-silence",
        text: "Text Ren. Verify the 3%. Then coffee.",
        tactic: "Silencing + verification is the fullest version of this branch. Ten minutes of work, and the Monday belongs to you.",
        nextSceneId: "ren-verifies",
        isOptimal: true,
      },
    ],
  },

  // ===================================================================
  // ACT 3 — the clock-set variant
  // ===================================================================
  {
    id: "mother-tests-clock",
    backgroundId: "text-screen",
    mood: "tense",
    presentCharacterIds: ["mother"],
    dialog: [
      {
        speakerId: null,
        text: "You send the five sentences. She reads them in under a minute. Her reply arrives in ninety seconds.",
      },
      {
        speakerId: "mother",
        text: '"Darling — I am terribly sorry to have been a bother. I do understand. I will not trouble you today. Only please — if you would consider — perhaps a phone call tomorrow evening?"',
        emotion: "sad",
      },
      {
        speakerId: "inner-voice",
        text: "Observe the structure of that reply. She accepted the clock — 'I will not trouble you today.' Then, immediately, she inserted a replacement clock — 'perhaps a phone call tomorrow evening.' The first sentence is cover for the second. The operational move is the tomorrow-evening request, which, if you agree to it, has transferred the terms of engagement from her no-rules fourteen-call campaign to a scheduled call on a specific evening. That is a better system for you than fourteen calls, but only if you agreed to it deliberately.",
        emotion: "knowing",
      },
    ],
    choices: [
      {
        id: "accept-scheduled",
        text: '"Tomorrow at 7 p.m. Fifteen minutes. I will call you from a landline; I will end the call at 7:15. Agreed?"',
        tactic: "Counter the replacement clock with a fully-specified one. Your call, not hers. Your duration, not hers. Your endpoint, not hers. This is the adult-to-adult version of the arrangement.",
        nextSceneId: "ending-call-scheduled",
        isOptimal: true,
      },
      {
        id: "decline-scheduled",
        text: '"No. I am not scheduling a call. I will reach out when I reach out. Do not call me again until I do."',
        tactic: "The harder version. Refuses both the fourteen-call campaign AND the replacement scheduled call. Valid when you have the capacity for it; costs you the conversation about Cara which you may or may not want to have.",
        nextSceneId: "ending-triaged-clean",
        isOptimal: true,
      },
      {
        id: "vague-maybe",
        text: '"Maybe — let me see how the week goes, I\'ll let you know."',
        tactic: "The reply that sounds boundaried and is actually open-ended. She will take 'maybe' as 'probably,' and by Wednesday she will be asking about the specifics of the tomorrow-evening call that you never agreed to.",
        nextSceneId: "ending-vague-loss",
      },
    ],
  },

  // ===================================================================
  // ENDINGS
  // ===================================================================
  {
    id: "ending-triaged-clean",
    backgroundId: "apartment",
    mood: "peaceful",
    isEnding: true,
    outcomeType: "good",
    endingTitle: "The Pile Triaged",
    endingSummary:
      "By 7:34 a.m. you had done the four things that matter. You routed the 3% of medical uncertainty through Ren rather than through a forty-one-second voicemail. You either silenced her notifications or, at minimum, deferred reading. You did not reply to anything inside the activation window. You got coffee. The fourteen calls and twenty-three messages have, in a specific sense, not yet landed — they exist on the phone but they have not yet cost you a Monday. That is the entire discipline of this scene.",
    endingLearnReference: "narcissist-playbook-how-they-actually-operate",
    endingLearnPrompt:
      "A narc-parent pressure campaign has a half-life of about 48 hours. If you hold the silencing and do not reply within that window, the campaign runs out of its own fuel — there is nothing more she can add to it that she has not already added. Your job is the 48-hour hold, not the clever reply.",
    dialog: [
      {
        speakerId: "inner-voice",
        text: "Replays are available. The campaign she ran overnight is a finite performance. You have now sat in the audience of it once and declined to give it a review. If you hold through Tuesday, the campaign will be over — she will pivot to a different move, which will arrive in about six to nine days. Note that cadence. It is rather predictable.",
        emotion: "knowing",
      },
      {
        speakerId: null,
        text: "You make the coffee. You open the log. You add today's entry below yesterday's. The Monday is, by 8 a.m., ordinary.",
      },
    ],
  },

  {
    id: "ending-call-scheduled",
    backgroundId: "apartment",
    mood: "peaceful",
    isEnding: true,
    outcomeType: "good",
    endingTitle: "The Fifteen-Minute Window",
    endingSummary:
      "You accepted a scheduled call — on your terms. Tomorrow at 7 p.m., your initiation, fifteen minutes, hard stop. She agreed to the terms because the alternative was no call at all. This is a legitimate negotiated position — it gives her a known channel and it gives you a known endpoint. It is riskier than full decline because narc parents routinely test a clock-set by, for example, producing a 'crisis' at 6:58 p.m. tomorrow to blow the frame. Pre-commit to the endpoint. Set an actual alarm at 7:14.",
    dialog: [
      {
        speakerId: "inner-voice",
        text: "Practise the end of the call tonight, out loud, in your kitchen. The specific sentence is 'Mum, it is 7:15, I am going to hang up now. I love you. We will talk again.' Say it three times before bed. Tomorrow at 7:15 your mouth will know the words even if your nervous system is elsewhere.",
        emotion: "knowing",
      },
      {
        speakerId: null,
        text: "You set the alarm. You make the coffee. The Monday is yours.",
      },
    ],
  },

  {
    id: "ending-payload-delivered",
    backgroundId: "apartment",
    mood: "danger",
    isEnding: true,
    outcomeType: "bad",
    failureBlogSlug: "architecture-of-control-how-emotional-dependency-is-built",
    failureBlogTitle: "Architecture of Control — How Emotional Dependency Is Built",
    endingTitle: "The Call Back",
    endingSummary:
      "You called her back at 7:19 a.m. The call lasted forty-seven minutes. During the call, the Cara party ask returned in a new form ('at least come for the ceremony part, fifteen minutes, it would mean the world'). By 8:07 a.m. you had not agreed to attend the party, but you had agreed to 'look at your calendar,' which she is, as of this sentence, treating as a soft yes. You have not been to work. You have not had coffee. Your Monday has been rewritten by the voicemail's activation payload. The specific lesson of this ending is not that you are weak — it is that the payload was engineered for exactly this response, and recognising the engineering retroactively is the whole point of running this scenario.",
    dialog: [
      {
        speakerId: "inner-voice",
        text: "Next time the fourteen-call overnight stack arrives, the discipline is not 'do not listen to the voicemail.' You are going to want to listen, and that is allowed. The discipline is 'do not call her back inside the activation window.' Set a timer. Two hours. Do anything else for two hours — coffee, shower, the morning protocol. Then decide.",
        emotion: "sad",
      },
      {
        speakerId: null,
        text: "You end the call at 8:07. You sit at the kitchen counter with cold pasta from last night still in the pan, unreheated, because the morning you thought you were going to have is gone.",
      },
    ],
  },

  {
    id: "ending-vague-loss",
    backgroundId: "apartment",
    mood: "mysterious",
    isEnding: true,
    outcomeType: "neutral",
    endingTitle: "The Maybe",
    endingSummary:
      "You replied with a vague 'maybe' and now the rest of the week is scheduled around a call that was never actually agreed to. She will message you Tuesday morning asking 'what time tonight?' You will not have decided. You will decide in a rushed fifteen-second window between two work meetings. You will probably take the call. The call will go as she planned. This is not a catastrophe — it is one vague word at 7:18 a.m. that cost you a specific thirty-minute hole on Tuesday evening — but it is worth writing down the shape of the outcome so that 'maybe' becomes a recognisable move in your lexicon of responses-you-will-not-use-again.",
    dialog: [
      {
        speakerId: "inner-voice",
        text: "'Maybe' is the most expensive word available to you in communication with a narc parent. It is interpreted as a yes, planned against as a yes, and counter-productive to have to retract later. When the correct answer is no, say no. When the correct answer is yes-with-terms, say yes-with-terms. 'Maybe' is a concession disguised as a hedge.",
        emotion: "neutral",
      },
    ],
  },
];

export const toxicNarc12: Scenario = {
  id: "tn-1-2",
  title: "The Missed Calls",
  tagline: "Monday, 7:14 a.m. 14 missed calls. 1 voicemail labelled 'critical.' Your mother is not dying.",
  description:
    "Continuous handoff from tn-1-1. The Sunday-night decline triggered a martyr-register escalation that compounded overnight. The scenario is the specific Monday-morning triage — voicemail transcript vs. audio, Ren as the independent-witness channel, the ringer-off silencing as private operational change, and the detection of the replacement-clock move if you reply at all.",
  tier: "premium",
  track: "toxic-narc",
  level: 1,
  order: 2,
  estimatedMinutes: 11,
  difficulty: "intermediate",
  category: "narcissist",
  xpReward: 220,
  badgeId: "pile-triaged",
  startSceneId: "monday-7am",
  prerequisites: ["tn-1-1"],
  tacticsLearned: [
    "Voicemail transcript over audio for emotional-payload senders",
    "Text-to-Ren as the low-cost 3%-verification channel",
    "Per-contact Do Not Disturb as a private operational change (never announced)",
    "The activation window — no replies inside the first two hours of a pressure campaign",
    "Counter the replacement-clock with a fully-specified clock (time / duration / initiator / endpoint)",
    "Somatic logging — get the sentence out of your head and into a dated log entry",
  ],
  redFlagsTaught: [
    "The 'critical' voicemail label as a pre-installed frame, not a fact",
    "Fourteen calls in a four-hour window as performance, not emergency",
    "A single-word 'please' at 11 p.m. as engineered dramatic punctuation",
    "Replacement-clock moves embedded in an apparent acceptance of your terms",
    "'Maybe' as the most expensive word in narc-parent communication",
  ],
  reward: {
    id: "pile-triaged",
    name: "The Pile Triaged",
    description: "Fourteen calls, twenty-three messages, no Monday lost.",
  },
  characters: [INNER_VOICE, THE_MOTHER, GOLDEN_SIBLING, PRIYA],
  scenes,
};

export default toxicNarc12;
