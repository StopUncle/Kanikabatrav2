/**
 * after-him-6-2, "The Photo"
 *
 * After-Him L6-2. Eighteen months on. A photo surfaces from iCloud's
 * "On This Day". The two of you, smiling, at something forgettable.
 * The teaching is the body check: no charge. Not nostalgia, not pain,
 * not the small thrill of having survived. The fact that you can hold
 * the image without a reaction is the closing frame of the track.
 *
 * Interior scene. The closing frame.
 *
 * Teaches:
 *  - The win was the photo with no charge.
 *  - Closure does not arrive; you grow over.
 *  - Replaceability is the end state, not the performance.
 *  - If he comes back you choose; if he does not, you also choose.
 */

import type { Scenario, Scene } from "../../types";
import { INNER_VOICE } from "../../characters";

const scenes: Scene[] = [
  {
    id: "the-on-this-day",
    backgroundId: "apartment",
    mood: "peaceful",
    presentCharacterIds: ["inner-voice"],
    dialog: [
      {
        speakerId: null,
        text: "Tuesday afternoon. Eighteen months. You are at the kitchen counter making tea. The phone vibrates with the kind of notification that is no longer urgent in any direction. iCloud, On This Day.",
      },
      {
        speakerId: null,
        text: "You tap it. The photo opens. The two of you, two years ago today, at the bookshop that has since closed. He has his arm around your shoulder. You are mid-laugh at something the photographer said. The kind of photo that, three years ago, was the cover photo on a Facebook event.",
      },
      {
        speakerId: "inner-voice",
        tone: "tactical",
        text: "The body check. The chest. The throat. The small clench in the stomach that used to arrive at his name. The check runs in two seconds and produces a reading that is, at week one, impossible. At week eight, unstable. At week twenty-six, in flux. At seventy-six weeks, the reading is the reading.",
        emotion: "knowing",
      },
    ],
    choices: [
      {
        id: "keep-look-close",
        text: "Look at the photo for ten seconds. Close the app. Put the kettle on.",
        tactic: "The closing move. The image is held; the body produces no charge; the app closes; the kettle goes on. The photo continues to exist. The body has continued to exist. Neither requires anything from the other.",
        nextSceneId: "the-closing",
        isOptimal: true,
        event: "optimal-with-grace",
      },
      {
        id: "delete-it",
        text: "Delete the photo. He should not be in your camera roll on this day every year.",
        tactic: "The delete is the move you would have made at week three and would have been correct at week three. At week seventy-six the delete is a small performance, because the photo is no longer producing a charge; deleting a charge-free photo is, structurally, the announcement that the photo would have produced one. Keep it. The keeping costs you nothing now.",
        nextSceneId: "the-deletion",
        isOptimal: false,
      },
      {
        id: "send-to-friend",
        text: 'Send the photo to Naomi. "Look at this. Can you believe."',
        tactic: "Sending the photo to the council is the L3-2 reflex in late stage. The council will receive it gratefully because the council has, since L5-1, been waiting for an update. The cost is the photo is now circulating again; the museum acquires a new exhibit; the closure that arrived two seconds ago becomes the closure that requires curating.",
        nextSceneId: "the-share",
        isOptimal: false,
      },
      {
        id: "look-longer",
        text: 'Sit with it. Five minutes. Let it be the photo it is, of the year it was of.',
        tactic: "The longer look is half-credit. The photo continues to produce no charge. The five minutes are, in a sense, the act of confirming the no-charge by holding the image past the duration the body would need to register one. The cost is small but real: by minute four the looking is, slightly, performance. Ten seconds is the read; five minutes is the dwell.",
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
        text: "Five minutes. You held the image for five minutes. The kettle clicked at minute three. The body check produced, across the five minutes, the same no-charge reading it produced at second two.",
      },
      {
        speakerId: "inner-voice",
        tone: "tactical",
        text: "The dwell was a small extension. The no-charge is real; the five minutes were not the test; the second test was the dwell itself, which the body produced without the body asking.",
        emotion: "knowing",
      },
    ],
    choices: [
      {
        id: "close-after-dwell",
        text: "Close the app. The kettle is done. The tea is the next thing.",
        tactic: "The closing arrives. The five minutes were the small overcompensation; the closing is the correction. The L6-2 lesson lands at three-quarter cost: ten seconds is the read.",
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
    endingTitle: "The Council, Updated",
    endingLearnPrompt:
      "The photo went to Naomi. The council received it gratefully. The closure that arrived in the body two seconds before the share is, now, an event that required reporting. The L6-2 lesson lands at half cost: closure that has to be performed to the council is closure that is still slightly outside the body. Next On This Day, look for ten seconds and close the app. The body produces the reading without the council; the council does not need the photo; you do not need the council to confirm the no-charge.",
    dialog: [
      {
        speakerId: "inner-voice",
        text: "Naomi: 'oh god. how are you about it.' The kettle clicks. The tea is being made by you, for you, with the photo now circulating in a chat you did not need to open.",
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
      "The photo is deleted. The On This Day surface will not produce it next year. The L6-2 lesson lands at half cost: the delete was the right move at week three and is, at week seventy-six, the small performance of a charge that no longer exists. The cost is the artefact is gone; the artefact was, in the camera roll, becoming an archive of who you used to be alongside whom. The keeping would have been free; the deletion is the announcement.",
    dialog: [
      {
        speakerId: "inner-voice",
        text: "Trash emptied. Kettle on. The photo, now, does not exist in any roll on any device.",
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
      "Ten seconds. The image. The body check. The closing of the app. The kettle. The kitchen on a Tuesday afternoon in late summer. The photo continues to exist in the camera roll; the body continues to exist in the kitchen; neither requires anything from the other. The win was never the ex coming back. The win was the photo with no charge. The track closes here. The next time the On This Day notification arrives, the body will produce the same reading without the audit running underneath. Closure does not arrive; you grew over.",
    dialog: [
      {
        speakerId: "inner-voice",
        text: "Tea, cup, the window open two inches, the long late-summer light on the wood of the kitchen counter.",
        emotion: "knowing",
      },
      {
        speakerId: "inner-voice",
        tone: "tactical",
        text: "The win was the photo with no charge. If he comes back, you choose. If he does not, you also choose. That is the whole point.",
        emotion: "knowing",
      },
    ],
    choices: [],
  },
];

export const afterHim62: Scenario = {
  id: "after-him-6-2",
  title: "The Photo",
  tagline:
    "Eighteen months. The On This Day notification. The body check. The kettle.",
  description:
    "After-Him L6-2. The closing frame of the track. A photo surfaces from iCloud's On This Day; the body produces the reading; the reading is no charge. The win was never him coming back. The win was the photo with no charge. Replaceability is not a performance; it is the actual end state of having absorbed that any one person is statistically replaceable. If he comes back, you choose; if he does not, you also choose. That is the whole point.",
  tier: "premium",
  track: "after-him",
  level: 6,
  order: 2,
  estimatedMinutes: 6,
  difficulty: "beginner",
  category: "healthy",
  xpReward: 400,
  badgeId: "the-photo-with-no-charge",
  startSceneId: "the-on-this-day",
  prerequisites: ["after-him-6-1"],
  tacticsLearned: [
    "Ten seconds is the read. Five minutes is the dwell.",
    "Closure does not arrive. You grow over.",
    "The keeping of the photo costs nothing at week seventy-six.",
    "Sharing to the council confirms closure has not fully internalised.",
    "Replaceability is the end state, not the performance.",
  ],
  redFlagsTaught: [
    "The deletion at week seventy-six as announcement of a charge no longer present",
    "The share to the council as performance of the closure to the audience",
    "The dwell as small overcompensation for a reading the body already produced",
    "The audit running underneath the next year's notification",
    "The story of having moved on as a story still in need of an audience",
  ],
  characters: [INNER_VOICE],
  scenes,
  isNew: true,
};

export default afterHim62;
