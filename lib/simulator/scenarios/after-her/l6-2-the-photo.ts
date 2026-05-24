/**
 * after-her-6-2, "The Photo"
 *
 * After-Her L6-2. Eighteen months on. The photo surfaces. The body
 * check: no charge. The closing frame of the male track. The win
 * was never her coming back. The win was being the man you wish you
 * had been the day she left. That man is, today, the man holding
 * this photo at the kitchen counter and producing no charge.
 *
 * Interior scene. The closing frame.
 *
 * Teaches:
 *  - Ten seconds is the read.
 *  - The keeping of the photo costs nothing now.
 *  - You did not get over her. You became the man.
 *  - If she comes back you choose; if she does not, you also choose.
 */

import type { Scenario, Scene } from "../../types";
import { INNER_VOICE_M } from "../../characters-male";

const scenes: Scene[] = [
  {
    id: "the-on-this-day",
    backgroundId: "apartment",
    mood: "peaceful",
    presentCharacterIds: ["inner-voice"],
    dialog: [
      {
        speakerId: null,
        text: "Tuesday afternoon. Eighteen months. You are at the kitchen counter making coffee. The phone vibrates. Google Photos memories. Two years ago today.",
      },
      {
        speakerId: null,
        text: "You tap it. The photo opens. The two of you at the lake on a weekend you took her to your parents'. She is on the dock; you are behind her; the dog is in the foreground in the half-blur of a dog turning toward the camera.",
      },
      {
        speakerId: "inner-voice",
        tone: "tactical",
        text: "Body check. Chest, throat, the small clench. The reading at week one was impossible. The reading at week eight was unstable. The reading at week twenty-six was in flux. The reading at seventy-six weeks is the reading.",
        emotion: "knowing",
      },
    ],
    choices: [
      {
        id: "keep-look-close",
        text: "Look at the photo for ten seconds. Close the app. Coffee.",
        tactic: "The closing move. The image is held; the body produces no charge; the app closes; the coffee continues. The photo continues to exist. The body has continued to exist. Neither requires anything from the other.",
        nextSceneId: "the-closing",
        isOptimal: true,
        event: "optimal-with-grace",
      },
      {
        id: "delete-it",
        text: "Delete the photo. She should not be in your camera roll on this day every year.",
        tactic: "The delete is the move you would have made at week three. At week seventy-six the delete is the announcement of a charge that no longer exists. Keep it.",
        nextSceneId: "the-deletion",
        isOptimal: false,
      },
      {
        id: "send-to-marcus",
        text: 'Send the photo to Marcus. "mate. on this day."',
        tactic: "Marcus does not need this. Marcus will reply something kind; the kind reply will be the small confirmation that the closure has been performed for an audience. The L6-2 lesson is that the audit at week seventy-six runs in the body, not in the chat.",
        nextSceneId: "the-share",
        isOptimal: false,
      },
      {
        id: "look-longer",
        text: 'Sit with it. Five minutes. Let it be the photo it is.',
        tactic: "The long look is half-credit. The body produces the same reading at minute five it produced at second two. The five minutes are, by minute three, slightly performance. Ten seconds is the read; five minutes is the dwell.",
        nextSceneId: "the-dwell",
        isOptimal: false,
      },
    ],
  },

  {
    id: "the-dwell",
    backgroundId: "apartment",
    mood: "peaceful",
    presentCharacterIds: ["inner-voice"],
    dialog: [
      {
        speakerId: null,
        text: "Five minutes. The coffee is, by minute three, drinkable temperature. The reading at minute five is the reading at second two. The dog in the foreground is still in the half-blur of turning.",
      },
      {
        speakerId: "inner-voice",
        tone: "tactical",
        text: "The dwell was the small overcompensation. The no-charge is real. Ten seconds is the read.",
        emotion: "knowing",
      },
    ],
    choices: [
      {
        id: "close-after-dwell",
        text: "Close the app. The coffee is ready.",
        tactic: "The closing arrives. The five minutes were the small overcompensation; the closing is the correction. The L6-2 lesson lands at three-quarter cost.",
        nextSceneId: "the-closing",
        isOptimal: true,
      },
    ],
  },

  {
    id: "the-share",
    backgroundId: "apartment",
    mood: "cold",
    isEnding: true,
    outcomeType: "neutral",
    endingTitle: "The Mate, Updated",
    endingLearnPrompt:
      "Marcus replied something kind. The kind reply was the confirmation. The L6-2 lesson lands at half cost: closure that requires a confirmation from a mate is closure that is still slightly outside the body. Next On This Day, hold for ten seconds and close the app. The body produces the reading. The mate does not need to confirm. You do not need the mate to confirm the no-charge.",
    dialog: [
      {
        speakerId: "inner-voice",
        text: "Marcus: 'big man. you good.' The coffee in the cup at the counter. The photo, now, also in the chat.",
        emotion: "serious",
      },
    ],
    choices: [],
  },

  {
    id: "the-deletion",
    backgroundId: "apartment",
    mood: "cold",
    isEnding: true,
    outcomeType: "neutral",
    endingTitle: "Deleted",
    endingLearnPrompt:
      "The photo is gone. The On This Day surface will not produce it next year. The L6-2 lesson lands at half cost: the delete was the right move at week three and is, at week seventy-six, the announcement of a charge no longer present. The artefact is also gone; the artefact was, in the roll, the archive of who you used to be alongside whom.",
    dialog: [
      {
        speakerId: "inner-voice",
        text: "Trash emptied. Coffee. The photo, now, does not exist in any roll on any device.",
        emotion: "serious",
      },
    ],
    choices: [],
  },

  {
    id: "the-closing",
    backgroundId: "apartment",
    mood: "peaceful",
    isEnding: true,
    outcomeType: "good",
    endingTitle: "The Photo, Held",
    endingLearnPrompt:
      "Ten seconds. The image. The body check. The closing of the app. The coffee at the kitchen counter on a Tuesday afternoon in late summer. The photo continues to exist in the camera roll; the body continues to exist in the kitchen; neither requires anything from the other. The win was never her coming back. The win was becoming the man you wish you had been the day she left. That man is the man holding this photo at the counter and producing no charge. If she comes back, you choose. If she does not, you also choose. That is the whole point.",
    dialog: [
      {
        speakerId: "inner-voice",
        text: "Coffee. The window open two inches. The late-summer light on the wood of the counter. The dog, somewhere, with someone else.",
        emotion: "knowing",
      },
      {
        speakerId: "inner-voice",
        tone: "tactical",
        text: "You did not get over her. You became the man.",
        emotion: "knowing",
      },
    ],
    choices: [],
  },
];

export const afterHer62: Scenario = {
  id: "after-her-6-2",
  title: "The Photo",
  tagline:
    "Eighteen months. On This Day. The body check. The coffee.",
  description:
    "After-Her L6-2. The closing frame of the male track. A photo surfaces; the body produces no charge; the coffee is the coffee. The win was never her coming back. The win was being the man you wish you had been the day she left. Replaceability is not a performance; it is the actual end state of having become the kind of man who does not require her return to prove the work is done.",
  tier: "premium",
  track: "after-her",
  level: 6,
  order: 2,
  estimatedMinutes: 6,
  difficulty: "beginner",
  category: "healthy",
  xpReward: 400,
  badgeId: "the-photo-with-no-charge",
  startSceneId: "the-on-this-day",
  prerequisites: ["after-her-6-1"],
  tacticsLearned: [
    "Ten seconds is the read.",
    "Closure does not arrive. You became the man.",
    "The keeping of the photo costs nothing at week seventy-six.",
    "Sharing to a mate confirms the closure has not fully internalised.",
    "Replaceability is the end state, not the performance.",
  ],
  redFlagsTaught: [
    "The deletion at week seventy-six as announcement of a charge no longer present",
    "The share to Marcus as performance of the closure for an audience",
    "The dwell as small overcompensation for a reading the body already produced",
    "The audit running underneath next year's notification",
    "The story of having become the man as a story still in need of confirmation",
  ],
  characters: [INNER_VOICE_M],
  scenes,
  isNew: true,
};

export default afterHer62;
