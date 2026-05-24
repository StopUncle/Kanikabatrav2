/**
 * after-him-3-1, "The Empty Tuesday"
 *
 * After-Him L3-1. Twelve days. Tuesday, 8 p.m. The hour his FaceTime
 * call used to fill. The biochemical drop is not romantic; it is the
 * variable-reward schedule withdrawing from a body that learned the
 * schedule. The teaching: you are not addicted to him, you are in
 * withdrawal from the schedule. The cure is a new schedule.
 *
 * Interior scene. The choice points are the things future-you booked
 * in advance versus the things current-you reaches for.
 *
 * Teaches:
 *  - The 8 p.m. drop is biochemical, not emotional.
 *  - The future-you who booked the class is the only adult in the scene.
 *  - The playlist is not innocent at 8 p.m. on a Tuesday.
 *  - The new schedule replaces the function, not the person.
 */

import type { Scenario, Scene } from "../../types";
import { INNER_VOICE } from "../../characters";

const scenes: Scene[] = [
  {
    id: "the-hour",
    backgroundId: "apartment",
    mood: "cold",
    presentCharacterIds: ["inner-voice"],
    dialog: [
      {
        speakerId: null,
        text: "Tuesday, 7:48 p.m. The flat is warm. You have eaten. The dishes are stacked, not done. You are on the couch with the phone in your lap and the apps unopened.",
      },
      {
        speakerId: null,
        text: "For one hundred and four Tuesdays, 8 p.m. was the FaceTime. Forty-three minutes, give or take. Pasta on the stove on his end, the kitchen counter on yours, the small loud laugh he had when you said something dry.",
      },
      {
        speakerId: "inner-voice",
        tone: "tactical",
        text: "This is biochemistry. The body has scheduled a dopamine event at 8 p.m. and is now waiting for it. The wave that is about to arrive is not about him. It is about the schedule the body learned and is currently withdrawing from.",
        emotion: "knowing",
      },
      {
        speakerId: "inner-voice",
        tone: "tactical",
        text: "Future-you, when you were calm last Saturday, booked a barre class at 8:15. The kit is by the door. The booking is non-refundable. Future-you is the only adult in this scene.",
        emotion: "knowing",
      },
    ],
    choices: [
      {
        id: "go-to-class",
        text: "Get up. Kit by the door. Out by 8:02.",
        tactic: "The clean move. The booked class is the new schedule running on the body's old slot. The body learns the new event by doing it; explanation is not the mechanism. Future-you wins.",
        nextSceneId: "the-class",
        isOptimal: true,
        event: "optimal-with-grace",
      },
      {
        id: "his-playlist",
        text: 'Open Spotify. Play the playlist from the year he made you a curry from scratch. "I can handle hearing the songs."',
        tactic: "The playlist at 8 p.m. on a Tuesday is not the songs. It is the channel the body uses to deliver the dopamine event the schedule is expecting. The trigger fires, the schedule fires, you are inside the relationship operationally for the next ninety minutes. The recovery in L1-2 audited surfaces, not body-channels; this is the body-channel.",
        nextSceneId: "the-playlist",
        isOptimal: false,
      },
      {
        id: "drink-tea-stare",
        text: 'Pour tea. Sit on the couch. "I will just be with the feeling."',
        tactic: "Open-ended sitting at the time of the schedule is open-ended grief without the L2-1 window. The body is not learning a new event; it is waiting for the old one to start. By 9:14 p.m. you will have opened his Instagram. The boredom is real and the answer to the boredom is a new event, not a longer wait.",
        nextSceneId: "the-wait",
        isOptimal: false,
      },
      {
        id: "call-a-friend",
        text: 'Call Priya. "Tell me about your week."',
        tactic: "The call is half the move. A live human voice at the time of the schedule occupies the body's expectation. The half it is not: it is not the booked class, which is what the future-you contract specified. Use the call if the kit-by-the-door step has failed; do not use it instead of the kit-by-the-door step.",
        nextSceneId: "the-call",
        isOptimal: false,
      },
    ],
  },

  {
    id: "the-class",
    backgroundId: "apartment",
    mood: "peaceful",
    presentCharacterIds: ["inner-voice"],
    dialog: [
      {
        speakerId: null,
        text: "8:14 p.m. Studio on the third floor of the building three streets over. The instructor's voice is loud and uncomplicated. The room is full of women who do not know who you are.",
      },
      {
        speakerId: null,
        text: "Forty-five minutes of small specific physical instructions. The biochemistry is still wanting a dopamine event at 8:23 and finds, instead, a sweat that is its own dopamine event.",
      },
      {
        speakerId: "inner-voice",
        tone: "tactical",
        text: "The schedule's wave landed inside a class. The body did not have to decide what to do with it; the class was already deciding. This is the mechanism: a new event in the body's old slot. Repeat until the slot belongs to the new event.",
        emotion: "knowing",
      },
    ],
    choices: [
      {
        id: "close-the-class",
        text: "Class ends. Walk home in the cold air. Shower. Bed at 10:30.",
        tactic: "The new schedule lands. The body learns the new shape of the Tuesday 8 p.m. event over six to eight repetitions. The discipline is repeating, not perfecting.",
        nextSceneId: "ending-class-landed",
        isOptimal: true,
      },
    ],
  },

  {
    id: "the-playlist",
    backgroundId: "apartment",
    mood: "tense",
    presentCharacterIds: ["inner-voice"],
    dialog: [
      {
        speakerId: null,
        text: "Track three is the one from the curry night. Track six is the one he sent you while you were on the train back from your parents'. Track eleven is the one you danced to in the kitchen on a Sunday in February.",
      },
      {
        speakerId: "inner-voice",
        tone: "tactical",
        text: "The body is being delivered the dopamine event by proxy. The playlist is the channel. The next event in the chain will be the Instagram. The chain will produce, by 11 p.m., the unsent text from L1-1 written in a new costume.",
        emotion: "serious",
      },
    ],
    choices: [
      {
        id: "close-the-playlist",
        text: "Close Spotify. Put on the 2019 playlist instead. Kit by the door. Out by 8:34.",
        tactic: "Late recovery. The class booking is still valid; arriving late is allowed. The 2019 playlist is the structural fix that keeps the music on while changing the trigger profile.",
        nextSceneId: "the-class",
        isOptimal: true,
      },
      {
        id: "let-the-playlist-run",
        text: "Let it play. The songs are good. You can handle it.",
        tactic: "By track fourteen you are inside the curry night again. The body is, biochemically, in February of the second year. The cost is the night and the credibility of every future Tuesday.",
        nextSceneId: "ending-playlist-relapse",
        isOptimal: false,
      },
    ],
  },

  {
    id: "the-wait",
    backgroundId: "apartment",
    mood: "tense",
    presentCharacterIds: ["inner-voice"],
    dialog: [
      {
        speakerId: null,
        text: "9:14 p.m. You have been on the couch for one hour and twelve minutes. The tea went cold at 8:32. Your hand has reached for the phone six times. The seventh time, you opened Instagram.",
      },
      {
        speakerId: "inner-voice",
        tone: "tactical",
        text: "The boredom of the empty Tuesday converts to surveillance when not replaced. The new event was the answer; the wait is what the absence of the new event produces.",
        emotion: "serious",
      },
    ],
    choices: [
      {
        id: "close-app-go-class",
        text: "Close the app. Look at the class schedule. There is a 9:30 yoga. Book it. Out the door.",
        tactic: "Late recovery, on the half hour. A different studio's later class is the same mechanism on a different timer. The body learns: at this time of day, on this kind of evening, the body moves.",
        nextSceneId: "the-class",
        isOptimal: true,
      },
      {
        id: "scroll-on",
        text: "Keep scrolling. Just for a minute.",
        tactic: "The minute is not the cost. The pattern is. The pattern is now: Tuesday at 9:14, the surveillance. Repeated for three weeks. The cost is the surveillance becoming the schedule.",
        nextSceneId: "ending-surveillance-replaces-schedule",
        isOptimal: false,
      },
    ],
  },

  {
    id: "the-call",
    backgroundId: "apartment",
    mood: "peaceful",
    presentCharacterIds: ["inner-voice"],
    dialog: [
      {
        speakerId: "inner-voice",
        tone: "tactical",
        text: "Priya picks up. The voice in the room at 8 p.m. is a voice in the room at 8 p.m. The body's slot is occupied; the dopamine event is real; the mechanism is being exercised.",
        emotion: "knowing",
      },
      {
        speakerId: "inner-voice",
        text: "Forty-three minutes. She talks about her week. You make a joke. The body settles.",
        emotion: "knowing",
      },
    ],
    choices: [
      {
        id: "still-go-to-class-tomorrow",
        text: 'End the call. Book the class for tomorrow at 8. "Same time next week, P? Bye." Set an alarm.',
        tactic: "The call worked tonight. The class is the structure that replaces the call from becoming the new dependency. The discipline is rotating: the call once a week, the class once a week, the long walk once a week. No single new event becomes the new dosage.",
        nextSceneId: "ending-call-then-class",
        isOptimal: true,
      },
      {
        id: "call-her-every-tuesday",
        text: 'End the call. "Can we make this a Tuesday thing, P?"',
        tactic: "Making the friend the new dosage system swaps one dependency for another. Priya is generous and will say yes; the structural cost is that the slot now belongs to a new person, which means it still belongs to a person, which means the schedule is still being run by the body. Rotate, do not replace.",
        nextSceneId: "ending-replacement-dependency",
        isOptimal: false,
      },
    ],
  },

  // Endings
  {
    id: "ending-class-landed",
    backgroundId: "apartment",
    mood: "peaceful",
    isEnding: true,
    outcomeType: "good",
    endingTitle: "The New Tuesday",
    endingLearnPrompt:
      "The class ran. The body sweated through the 8:23 wave inside a room of strangers, which is the cleanest possible setting for biochemical detox. Next Tuesday at 8 p.m. the body will reach for the schedule slightly less; six Tuesdays from now the schedule will be the class. You are not addicted to him. You were in withdrawal from a variable-reward schedule. The cure was a new schedule.",
    dialog: [
      {
        speakerId: "inner-voice",
        text: "Shower. 10:24 p.m. Bed. The Tuesday 8 p.m. event was a barre class in a third-floor studio with strangers.",
        emotion: "knowing",
      },
      {
        speakerId: "inner-voice",
        tone: "tactical",
        text: "New schedule, old slot.",
        emotion: "knowing",
      },
    ],
    choices: [],
  },

  {
    id: "ending-playlist-relapse",
    backgroundId: "apartment",
    mood: "tense",
    isEnding: true,
    outcomeType: "bad",
    endingTitle: "The Curry Night, Revisited",
    failureBlogSlug: "get-over-breakup-like-sociopath",
    failureBlogTitle: "How to Get Over a Breakup Like a Sociopath",
    endingLearnPrompt:
      "Three songs deep, you were in the curry night. Track fourteen, the Instagram. Track nineteen, the unsent text from L1-1 in a new costume, currently saved as a draft. The class kit by the door, untouched. The cost was the night and the credibility of every future Tuesday. Tomorrow's first move: delete the draft without reading, unpin the playlist (this is L1-2 work the audit missed), book Wednesday at 8 p.m. on a different platform.",
    dialog: [
      {
        speakerId: "inner-voice",
        text: "Track twenty-one. The flat is February. The phone has a draft titled untitled.",
        emotion: "sad",
      },
    ],
    choices: [],
  },

  {
    id: "ending-surveillance-replaces-schedule",
    backgroundId: "apartment",
    mood: "tense",
    isEnding: true,
    outcomeType: "bad",
    endingTitle: "The Tuesday Surveillance",
    failureBlogSlug: "narcissistic-hoovering-explained",
    failureBlogTitle: "Narcissistic Hoovering: When Your Ex Tries to Suck You Back In",
    endingLearnPrompt:
      "The schedule was not replaced; it was repurposed. The body has now learned, for next Tuesday, that 9:14 p.m. is the surveillance hour. Three Tuesdays of this and the surveillance becomes the schedule. The L1-2 audit closed the channels he could reach you through; this scenario shows the channel you reach him through, which is the harder one to close because the costume is curiosity. Book next Tuesday at 8 p.m. now. Delete the IG app from the phone for two weeks.",
    dialog: [
      {
        speakerId: "inner-voice",
        text: "11:08 p.m. Phone in hand. His profile is the second result.",
        emotion: "sad",
      },
    ],
    choices: [],
  },

  {
    id: "ending-call-then-class",
    backgroundId: "apartment",
    mood: "peaceful",
    isEnding: true,
    outcomeType: "good",
    endingTitle: "The Rotation",
    endingLearnPrompt:
      "The call held the slot tonight. The class is booked for tomorrow at 8. The alarm is set. The rotation is the discipline that prevents any single new event from becoming the new dosage. Priya is a friend, not a replacement schedule. The body learns multiple new events at the old slot; the slot, over time, belongs to the new repertoire instead of to him.",
    dialog: [
      {
        speakerId: "inner-voice",
        text: "Phone down. Alarm set. Kit by the door for tomorrow. The slot now has a rotation.",
        emotion: "knowing",
      },
    ],
    choices: [],
  },

  {
    id: "ending-replacement-dependency",
    backgroundId: "apartment",
    mood: "cold",
    isEnding: true,
    outcomeType: "neutral",
    endingTitle: "The New Dosage",
    endingLearnPrompt:
      "Priya said yes. The Tuesday call is a new ritual. The slot now belongs to a new person; the schedule is still being run by a person. The structural problem of L3-1 is not who the person is; it is whether the slot belongs to a person at all. Rotate instead. The call once a week, the class once a week, a long walk once a week, dinner with the parents once a month. No single new event becomes the new prescription.",
    dialog: [
      {
        speakerId: "inner-voice",
        text: "Call ended. Priya: Tuesday. The slot has a name and the name is not yours.",
        emotion: "serious",
      },
    ],
    choices: [],
  },
];

export const afterHim31: Scenario = {
  id: "after-him-3-1",
  title: "The Empty Tuesday",
  tagline:
    "8 p.m. The hour his call used to fill. The drop is biochemical. The cure is a new schedule, not a new person.",
  description:
    "After-Him L3-1. The first Tuesday at 8 p.m. without him. The teaching: you are not addicted to him, you are in withdrawal from a variable-reward schedule. The class booked in advance by future-you is the only adult in the scene. The playlist at 8 p.m. is not innocent; it is the channel the body uses to deliver the dopamine event the schedule is expecting. Replace the function with rotation, not with a new dosage system.",
  tier: "premium",
  track: "after-him",
  level: 3,
  order: 1,
  estimatedMinutes: 10,
  difficulty: "intermediate",
  category: "self-regulation",
  xpReward: 400,
  startSceneId: "the-hour",
  prerequisites: ["after-him-2-2"],
  tacticsLearned: [
    "The drop is biochemistry. Withdrawal from a schedule, not from a person.",
    "Future-you booked the class. Future-you is the only adult.",
    "The playlist at 8 p.m. is the channel for the dopamine the schedule expects.",
    "Rotate new events; do not replace one dosage with another.",
    "The surveillance is what the absence of a new event produces.",
  ],
  redFlagsTaught: [
    "The playlist as innocent music (it is not at 8 p.m. on a Tuesday)",
    "Open-ended 'sitting with it' that converts to surveillance by 9:14",
    "The friend who becomes the new prescription",
    "The body's expectation of a dopamine event at the schedule's slot",
    "The boredom that the absence of a new event produces, then fills with the channel",
  ],
  characters: [INNER_VOICE],
  scenes,
  isNew: true,
};

export default afterHim31;
