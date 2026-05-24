/**
 * after-her-3-1, "The Empty Sunday"
 *
 * After-Her L3-1. The hardest level on this track. Twelve days. Sunday,
 * 3:14 p.m. The hour her Sunday used to fill. The biochemical drop is
 * not romantic; it is the schedule withdrawing. The male-track twist:
 * the phone wants to open the toxic-coach channel because rage feels
 * like winning at exactly the moment grief is loudest.
 *
 * Interior scene. The decision points are the rotation booked by
 * future-you, the toxic coach selling you the same schedule in a male
 * costume, and the gym used as a substitute for processing.
 *
 * Teaches:
 *  - The drop at her Sunday slot is biochemistry, not romance.
 *  - The toxic coach is the same variable-reward schedule in a costume.
 *  - The gym is L4 work; not a substitute for L3 processing.
 *  - Rotate new events; do not import a new dependency.
 */

import type { Scenario, Scene } from "../../types";
import { INNER_VOICE_M } from "../../characters-male";

const scenes: Scene[] = [
  {
    id: "the-hour",
    backgroundId: "apartment",
    mood: "cold",
    presentCharacterIds: ["inner-voice"],
    dialog: [
      {
        speakerId: null,
        text: "Sunday, 2:58 p.m. The flat is bright in the wrong way; Sunday light hits the couch at this angle for forty minutes and then it does not. The TV is off. The kettle clicked twenty minutes ago.",
      },
      {
        speakerId: null,
        text: "Sunday at 3 p.m. for the last two years was the long lunch, then the walk, then the bookshop, then her parents' for dinner, sometimes. The shape of the Sunday is what the body remembers, not any specific event.",
      },
      {
        speakerId: "inner-voice",
        tone: "tactical",
        text: "The body is biochemistry. Two years of Sundays trained a schedule. At 3:14 the schedule will fire. The body will reach for the dopamine event it learned to expect. The form of the reach is not predictable; the timing is.",
        emotion: "knowing",
      },
      {
        speakerId: "inner-voice",
        tone: "tactical",
        text: "Future-you, last Tuesday when you were calm, booked a 4 p.m. climbing session with Marcus and Dev. The kit is by the door. Future-you is the only adult in this scene.",
        emotion: "knowing",
      },
    ],
    choices: [
      {
        id: "go-climb",
        text: "Get up. Kit by the door. Walk to the wall. Be there by 3:48.",
        tactic: "The clean move. The booking is the new event. The friends are not the dosage system; the activity is. The wall does not require you to talk; the body learns the new shape of the Sunday afternoon over five repetitions.",
        nextSceneId: "the-wall",
        isOptimal: true,
        event: "optimal-with-grace",
      },
      {
        id: "open-coach-channel",
        text: 'Open YouTube. The coach. He has a video posted yesterday: "Why high-value men do not chase women."',
        tactic: "The coach is selling you the same variable-reward schedule in a male costume. The video is dopamine; the rage is dopamine; the certainty is dopamine. The schedule has not been replaced; it has been re-housed. Three weeks of this and you are inside a parasocial relationship with a man whose business model is your unprocessed feeling.",
        nextSceneId: "the-coach",
        isOptimal: false,
      },
      {
        id: "go-gym-instead",
        text: 'Skip the climb. Hit the iron gym for two hours. Heavy lifts. "I will sweat it out."',
        tactic: "The iron gym is L4 work. Going hard at the gym at the time of the schedule is using the new event correctly; going hard at the gym instead of the booked thing with friends is preferring the solo dosage system. The climb has the texture of a social anchor, which is exactly what the male track needs at L3. The gym is for L4-1; not the substitute for L3-1.",
        nextSceneId: "the-iron-gym",
        isOptimal: false,
      },
      {
        id: "drink-and-wait",
        text: 'Pour a whiskey. Sit. "I will see what comes up."',
        tactic: "What comes up at 3:14 on a Sunday with no event is the schedule. Open-ended Sunday afternoon is the slot machine waiting for the lever. By 4:48 the whiskey is two; by 5:14 you are on her sister's Instagram; by 6 you are texting the wrong number.",
        nextSceneId: "the-drift",
        isOptimal: false,
      },
    ],
  },

  {
    id: "the-wall",
    backgroundId: "apartment",
    mood: "peaceful",
    presentCharacterIds: ["inner-voice"],
    dialog: [
      {
        speakerId: null,
        text: "Climbing wall, 3:51. Marcus is already on a route. Dev hands you chalk. No one mentions her. No one is going to mention her. The route is overhanging and your forearms remember the project from three months ago.",
      },
      {
        speakerId: null,
        text: "Two hours. Three projects. Falls. Sends. The body does what the body does when it is held by gravity and a wall and friends who hand you chalk.",
      },
      {
        speakerId: "inner-voice",
        tone: "tactical",
        text: "The schedule's wave landed at 4:14 inside a problem on the wall. The body did not have to decide what to do with it. The wall decided. This is the mechanism: a new event in the body's old slot, held by people who are not the dosage system.",
        emotion: "knowing",
      },
    ],
    choices: [
      {
        id: "close-the-wall",
        text: "Beer at the cafe at the wall after, one only. Walk home. Shower. Bed by 10:30.",
        tactic: "The new schedule lands. Five Sundays of this and the slot belongs to the wall. The discipline is repeating, not perfecting.",
        nextSceneId: "ending-wall-landed",
        isOptimal: true,
      },
    ],
  },

  {
    id: "the-coach",
    backgroundId: "apartment",
    mood: "tense",
    presentCharacterIds: ["inner-voice"],
    dialog: [
      {
        speakerId: null,
        text: "Forty-eight minutes in. Three videos. The coach has a particular voice, low and certain, and he uses the phrase frame discipline twice per minute. The algorithm has now served you the next video before the current one ends.",
      },
      {
        speakerId: "inner-voice",
        tone: "tactical",
        text: "The dopamine event is being delivered by a man who has a subscription product. The certainty is the hit. The rage at her is the hit. The validation that you were the better person is the hit. None of these are processing. They are the schedule rehoused in a male voice.",
        emotion: "serious",
      },
    ],
    choices: [
      {
        id: "close-the-coach",
        text: "Close YouTube. Delete the app for two weeks. Kit by the door. Walk to the wall. Late, but go.",
        tactic: "Late recovery. The coach channel is closed. The wall is the structural answer at the right time of day with the right social anchor. Five-minutes-late is fine; the move is the move.",
        nextSceneId: "the-wall",
        isOptimal: true,
      },
      {
        id: "subscribe",
        text: 'Subscribe. "He is actually saying useful stuff."',
        tactic: "Subscribe is the moment the dependency hardens. You will be receiving notifications at 8 p.m. on weekday evenings, which is what L2-1 was protecting. The relationship has changed therapists, from her, to him. Same architecture. Different gender of the dosage figure.",
        nextSceneId: "ending-subscribed",
        isOptimal: false,
      },
    ],
  },

  {
    id: "the-iron-gym",
    backgroundId: "apartment",
    mood: "cold",
    presentCharacterIds: ["inner-voice"],
    dialog: [
      {
        speakerId: null,
        text: "Iron gym. 4:14. You are alone in the squat rack. The Sunday afternoon crowd is small. Headphones in. Heavy weight on the bar.",
      },
      {
        speakerId: null,
        text: "Three sets in, the schedule's wave arrives. The body, under the bar, has only one thing to do, and so the wave is metabolised into rep four of set three at one hundred and forty kilos. The lift goes up. The wave goes down.",
      },
      {
        speakerId: "inner-voice",
        tone: "tactical",
        text: "The mechanism works. The wave landed inside the lift. The iron gym solved the body half. Note what it did not solve: Marcus and Dev are not standing next to a wall waiting for you, and the male track's hardest level is the one where you do not have social anchors in your week. The body half is necessary; not sufficient.",
        emotion: "knowing",
      },
    ],
    choices: [
      {
        id: "text-marcus-after",
        text: 'After the workout: text Marcus and Dev. "Climb next Sunday? Same time?"',
        tactic: "Late half-recovery. The iron gym worked tonight; the social anchor is booked for next Sunday. The pattern, over the next six Sundays, is to rotate iron / climb / long walk / parents' dinner / one with the boys / one solo. No single dosage. No single dependency.",
        nextSceneId: "ending-iron-then-book",
        isOptimal: true,
      },
      {
        id: "iron-every-sunday-alone",
        text: 'Plan to make this the new ritual. Iron gym, Sunday, alone, every week.',
        tactic: "The solo iron ritual is a new ritual that is also a new isolation. The body is built. The social anchors are not. By month three the body is impressive and the loneliness is unprocessed because the ritual is, structurally, a place to not need anyone. Mix the ritual with social anchors; do not make it the new wall around you.",
        nextSceneId: "ending-iron-alone",
        isOptimal: false,
      },
    ],
  },

  {
    id: "the-drift",
    backgroundId: "apartment",
    mood: "tense",
    presentCharacterIds: ["inner-voice"],
    dialog: [
      {
        speakerId: null,
        text: "5:18 p.m. Two whiskies in. Her sister's Instagram. A photo from yesterday: the dog, in a park, on a lead held by someone whose hand you do not recognise.",
      },
      {
        speakerId: "inner-voice",
        tone: "tactical",
        text: "The open-ended Sunday found the channel L1-2 audited closed, or did not audit at all. The hand on the lead is doing what hands on leads do in Instagram photos; the brain is now constructing a story that may or may not be true and is producing chemistry either way.",
        emotion: "serious",
      },
    ],
    choices: [
      {
        id: "close-and-go-wall",
        text: "Close the app. Climbing wall, late. Walk in the cold. Marcus will be on his second route by the time you get there.",
        tactic: "Late but recoverable. The wall, even arrived at 5:48 with one route left in the day, is the move. The friends are the anchor. The drift is interrupted.",
        nextSceneId: "the-wall",
        isOptimal: true,
      },
      {
        id: "text-wrong-number",
        text: 'Type to a number you should not have. "saw the dog. is that her brothers friend or."',
        tactic: "The drift produced the artefact L1-1 was about. The Sunday became the channel. The L1-2 audit was the structural defence; the drift bypassed it through the body. Tomorrow's first move is to re-audit, in a calmer hour, every channel still open, and to book next Sunday at 3 p.m. now.",
        nextSceneId: "ending-wrong-number",
        isOptimal: false,
      },
    ],
  },

  // Endings
  {
    id: "ending-wall-landed",
    backgroundId: "apartment",
    mood: "peaceful",
    isEnding: true,
    outcomeType: "good",
    endingTitle: "The New Sunday",
    endingLearnPrompt:
      "The climb ran. The body sweated through the 4:14 wave on an overhanging route. Marcus and Dev did not mention her; you did not mention her; the friends did not become a tribunal. The Sunday afternoon slot now has a new event with a social anchor that does not require you to talk about the breakup. Five Sundays of this and the slot belongs to the wall, not to her. The hardest level on this track is held when the rage is replaced by a rope, the certainty is replaced by a hold, and the absence is replaced by people who hand you chalk.",
    dialog: [
      {
        speakerId: "inner-voice",
        text: "Shower. 9:48 p.m. Bed by 10:30. Marcus's text: route felt good today, you crushed it. The Sunday slot belongs, for now, to the wall.",
        emotion: "knowing",
      },
      {
        speakerId: "inner-voice",
        tone: "tactical",
        text: "Replaced the rage with a rope.",
        emotion: "knowing",
      },
    ],
    choices: [],
  },

  {
    id: "ending-subscribed",
    backgroundId: "apartment",
    mood: "tense",
    isEnding: true,
    outcomeType: "bad",
    endingTitle: "The Subscription",
    failureBlogSlug: "get-over-breakup-like-sociopath",
    failureBlogTitle: "How to Get Over a Breakup Like a Sociopath",
    endingLearnPrompt:
      "The coach has your email and your card. Notifications fire at 8 p.m. on weekday evenings, which is what L2-1 was protecting. The frame-discipline vocabulary infects the rest of the track. By month three you are quoting him in conversations with women, which is the moment the parasocial dependency becomes visible to others before it is visible to you. The structural lesson: the dependency moved gender, did not end. Cancel the subscription on Monday. Re-do L2-1 next Tuesday with the toxic-coach channel explicitly closed.",
    dialog: [
      {
        speakerId: "inner-voice",
        text: "Subscribed. Welcome email. The first PDF is titled THE FRAME PROTOCOL. The Sunday afternoon is, technically, full.",
        emotion: "sad",
      },
    ],
    choices: [],
  },

  {
    id: "ending-iron-then-book",
    backgroundId: "apartment",
    mood: "peaceful",
    isEnding: true,
    outcomeType: "neutral",
    endingTitle: "The Iron Then The Booking",
    endingLearnPrompt:
      "The iron solved the body half of the schedule. The post-lift text booked next Sunday with friends, which is the social anchor the male track requires at L3. The rotation has its first two events. The lesson lands at three-quarter cost: the iron worked tonight; do not make iron the only ritual. The version of you in three months that is muscular and lonely is the version of you the male track's L5 boss is going to be hardest on.",
    dialog: [
      {
        speakerId: "inner-voice",
        text: "Shower. Marcus: yeah man, climb at 3. Sunday is on the calendar. The body is done; the week has shape.",
        emotion: "knowing",
      },
    ],
    choices: [],
  },

  {
    id: "ending-iron-alone",
    backgroundId: "apartment",
    mood: "cold",
    isEnding: true,
    outcomeType: "bad",
    endingTitle: "The Solo Ritual",
    failureBlogSlug: "get-over-breakup-like-sociopath",
    failureBlogTitle: "How to Get Over a Breakup Like a Sociopath",
    endingLearnPrompt:
      "Iron, Sunday, alone, every week. The body builds. The social anchors do not. By month three the body is impressive in photos you do not take and the flat is quiet on the Saturdays when there is no schedule slot. The discipline of L3-1 is rotation, not replacement of one solo dependency with another. Book the climb with Marcus next Sunday, on a different time of day if needed, but book it. The ritual cannot be the new wall.",
    dialog: [
      {
        speakerId: "inner-voice",
        text: "Iron gym, 6:42. Shower. Couch. The phone in your hand has Marcus's number on the screen and you have not pressed call.",
        emotion: "sad",
      },
    ],
    choices: [],
  },

  {
    id: "ending-wrong-number",
    backgroundId: "apartment",
    mood: "tense",
    isEnding: true,
    outcomeType: "bad",
    endingTitle: "The Sister's Friend's Hand",
    failureBlogSlug: "narcissistic-hoovering-explained",
    failureBlogTitle: "Narcissistic Hoovering: When Your Ex Tries to Suck You Back In",
    endingLearnPrompt:
      "The drift produced the artefact L1-1 was about. The message is sent. The number does not respond; the number tells her sister, who tells her, who has now received a tell that you are still constructing stories from photographs of her dog. The L1-2 audit failed in the channel only the body could find. Tomorrow's first move: re-audit every channel still open in a calm hour, book next Sunday's climb with Marcus now, delete Instagram from the phone for two weeks. The lesson is structural, not punitive: open-ended time finds the channel the body still wants.",
    dialog: [
      {
        speakerId: "inner-voice",
        text: "Sent at 5:38. Read at 5:39. No reply. Whiskey, third one. The dog, in the photo, looked happy.",
        emotion: "sad",
      },
    ],
    choices: [],
  },
];

export const afterHer31: Scenario = {
  id: "after-her-3-1",
  title: "The Empty Sunday",
  tagline:
    "3 p.m. The hour her Sunday used to fill. The drop is biochemical. The coach is selling the same schedule in a male costume.",
  description:
    "After-Her L3-1. The hardest level on the male track. The Sunday slot the body learned over two years now sits empty, and the body is in withdrawal from the schedule. The teaching: the coach is the dopamine in a male voice; the iron gym solo is L4 work used as L3 substitute; the climb with Marcus and Dev is the actual move because the male track requires social anchors. Rotate, do not replace one dosage system with another, do not make iron the new wall around you.",
  tier: "premium",
  track: "after-her",
  level: 3,
  order: 1,
  estimatedMinutes: 11,
  difficulty: "advanced",
  category: "self-regulation",
  xpReward: 420,
  startSceneId: "the-hour",
  prerequisites: ["after-her-2-2"],
  tacticsLearned: [
    "The Sunday drop is biochemistry. The schedule withdrawing from a body that learned it.",
    "The toxic coach is the same variable-reward schedule in a male voice.",
    "The iron gym is L4. Not a substitute for L3 processing.",
    "The climb with friends is the move: new event, old slot, social anchor.",
    "Rotation, not replacement. No single new ritual becomes the new dosage.",
  ],
  redFlagsTaught: [
    "The coach's frame-discipline vocabulary as parasocial dependency",
    "The iron gym solo as preferred isolation in a useful costume",
    "Open-ended Sunday afternoon as the channel the body finds when the schedule is empty",
    "The sister's friend's hand in a photo as the artefact the drift produces",
    "The new ritual that is also the new wall around the man",
  ],
  characters: [INNER_VOICE_M],
  scenes,
  isNew: true,
};

export default afterHer31;
