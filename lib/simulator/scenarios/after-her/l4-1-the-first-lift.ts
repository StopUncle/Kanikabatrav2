/**
 * after-her-4-1, "The First Lift"
 *
 * After-Her L4-1. Week three. Tuesday, 5:42 a.m. The first session
 * back at the iron gym after the breakup. The teaching is the same
 * as the female-track first run: costly signal happens whether or
 * not she sees it. The male-track twist is the gym is a place men
 * specifically perform, and the discipline is to perform nothing
 * tonight, not even to yourself.
 *
 * Interior scene. The decision points are the mirror selfie, the
 * caption, the form sacrificed to the angle, the post-workout
 * shirtless photo "for tracking progress."
 *
 * Teaches:
 *  - No mirror selfie. The mirror is the audience.
 *  - No caption marking week three. The week marks the breakup.
 *  - Form before angle. The angle is for the audience.
 *  - The session lives in the body and in the log. Not in a feed.
 */

import type { Scenario, Scene } from "../../types";
import { INNER_VOICE_M } from "../../characters-male";

const scenes: Scene[] = [
  {
    id: "the-alarm",
    backgroundId: "apartment",
    mood: "cold",
    presentCharacterIds: ["inner-voice"],
    dialog: [
      {
        speakerId: null,
        text: "5:42 a.m. The alarm. The flat is dark. The gym bag is by the door, packed last night, the deadlift belt rolled inside the towel.",
      },
      {
        speakerId: "inner-voice",
        tone: "tactical",
        text: "The act gets its weight from being unobserved. The mirror selfie is the leak. The caption is the leak. The shirtless after photo is the leak. The session lives in the body and in the training log. Nowhere else.",
        emotion: "knowing",
      },
    ],
    choices: [
      {
        id: "go-quiet",
        text: "Up. Coffee, half a banana, out the door at 5:54. Phone in the gym bag, face-down, until shower.",
        tactic: "Clean opening. The phone is in the bag. The mirror is the rack. The audience is no one. The form will not be sacrificed because no angle has to look good.",
        nextSceneId: "the-rack",
        isOptimal: true,
      },
      {
        id: "take-phone-for-music",
        text: 'Phone in the pocket. "Music."',
        tactic: "Music is the rational reason; the phone is also the camera. Eight weeks ago the phone in the pocket was just music. Tonight it is structurally the camera in a music costume, because the audit has not yet ended.",
        nextSceneId: "with-phone",
        isOptimal: false,
      },
      {
        id: "snooze",
        text: 'Snooze. "Tomorrow."',
        tactic: "The future-you contract from last night was specific. Snoozing teaches the future-you contracts to be decorative. The bag is by the door because last-night-you knew this-morning-you would want to snooze, and last-night-you was correct.",
        nextSceneId: "ending-snooze",
        isOptimal: false,
      },
    ],
  },

  {
    id: "the-rack",
    backgroundId: "apartment",
    mood: "peaceful",
    presentCharacterIds: ["inner-voice"],
    dialog: [
      {
        speakerId: null,
        text: "The iron gym at 6:08 a.m. has six men in it. The squat rack at the back is yours. The bar is heavy in a familiar way. You warm up. You add weight. You squat.",
      },
      {
        speakerId: null,
        text: "Set one is the set where the body remembers. Set two is the set where the body starts. Set three is the set where the rage from L2-1 metabolises, on rep four, into a lift you finish despite the bar wanting to win.",
      },
      {
        speakerId: "inner-voice",
        tone: "tactical",
        text: "The mechanism: the schedule's energy in the lift instead of in the chat. The cost is the lift; the lift is the signal. No one in this gym has seen the work. The gym does not require anyone to.",
        emotion: "knowing",
      },
    ],
    choices: [
      {
        id: "log-and-leave",
        text: "Log the sets in the notebook in the bag. Shower. Out by 7:42. Tell no one.",
        tactic: "The clean close. The log is private. The shower is private. The walk home is private. The body learns: the lift exists in the lift, then in the log, then nowhere else. Repetition over twelve weeks builds something whose only evidence is itself.",
        nextSceneId: "ending-lift-private",
        isOptimal: true,
      },
      {
        id: "shirtless-mirror-selfie",
        text: 'Before shower: shirtless mirror selfie. "For tracking. Just for me."',
        tactic: "For tracking is the rational frame. For an audience is the operational one. The mirror photo at the iron gym at 7:38 a.m. on a Tuesday in week three is, statistically, on Instagram by Sunday. The body knows. The legs know. The lift was costly; the photo is cheap; the cheap one cancels some of the cost.",
        nextSceneId: "the-mirror",
        isOptimal: false,
      },
      {
        id: "post-the-pr",
        text: 'Story the weight on the bar. Caption: "back. week three."',
        tactic: "The PR post with the week-three caption is the L4-1 leak in the male-track register. The week-three marker names the breakup. The post is, structurally, addressed to her. The story will reach her, through mutuals, by Friday. The L5 hoover is one week closer because of one tap.",
        nextSceneId: "ending-pr-posted",
        isOptimal: false,
      },
    ],
  },

  {
    id: "with-phone",
    backgroundId: "apartment",
    mood: "tense",
    presentCharacterIds: ["inner-voice"],
    dialog: [
      {
        speakerId: null,
        text: "Between sets two and three, the phone is in your hand. You meant to skip the song. The mirror to your left has you in it. The bar in the foreground. The angle is, in fact, good.",
      },
      {
        speakerId: "inner-voice",
        tone: "tactical",
        text: "The phone is out. The next decision is the structural one. The body has the rationale ready: this one will be for the camera roll only. The body has lied to you before.",
        emotion: "serious",
      },
    ],
    choices: [
      {
        id: "phone-away-recover",
        text: "Phone face-down on the bench. Back to set three. No photo.",
        tactic: "Half-recovery. The phone was out; no photo was taken. The discipline of L4-1 is intact at the level of the post. The structural leak (phone in the pocket) is on the record for Thursday's session, when the phone stays in the bag.",
        nextSceneId: "the-rack",
        isOptimal: true,
      },
      {
        id: "camera-roll-photo",
        text: "One photo. Camera roll. Then phone away. Back to set three.",
        tactic: "Half-credit. The photo is for the camera roll only and the body has, technically, kept the discipline at the post-level. Thursday's session, the phone goes in the bag and stays there. The structural shift the camera-roll exception begs is recorded.",
        nextSceneId: "the-rack",
        isOptimal: false,
      },
    ],
  },

  {
    id: "the-mirror",
    backgroundId: "apartment",
    mood: "tense",
    presentCharacterIds: ["inner-voice"],
    dialog: [
      {
        speakerId: null,
        text: "The photo is in your camera roll. The light at the iron gym at 7:38 is not flattering on purpose; the lighting is overhead fluorescent and the man in the mirror looks, depending on the second, hard or tired.",
      },
      {
        speakerId: "inner-voice",
        tone: "tactical",
        text: "The photo is taken. The next decision is whether the photo is, by Sunday, on a feed. The body has the rationale ready: a story does not show in the main grid; a story expires in twenty-four hours; it is barely a post.",
        emotion: "serious",
      },
    ],
    choices: [
      {
        id: "delete-the-mirror",
        text: "Delete the photo. Phone in the bag. Shower.",
        tactic: "Late recovery. The artefact is destroyed before it travels. The body learns: the photo can be taken and also disposed of; the post is the leak, not the photo. Thursday the photo will not be taken at all because the body knows now what happens after.",
        nextSceneId: "ending-mirror-deleted",
        isOptimal: true,
      },
      {
        id: "keep-for-later",
        text: 'Keep it. "For tracking. I will not post it."',
        tactic: "Kept for tracking is the leashed draft from L1-1 in a gym costume. The photo exists. By Sunday the rationale will have grown, by Monday morning's coffee the photo will be the story, by Tuesday's session the body will be performing for the next photo at the bench press. The post-impulse compounds.",
        nextSceneId: "ending-leashed-photo",
        isOptimal: false,
      },
    ],
  },

  // Endings
  {
    id: "ending-lift-private",
    backgroundId: "apartment",
    mood: "peaceful",
    isEnding: true,
    outcomeType: "good",
    endingTitle: "The Lift That Was Yours",
    endingLearnPrompt:
      "5:42 a.m. Six men in the iron gym. The bar heavy. Three sets logged in the notebook. Shower at 7:42, walk home in the cold, breakfast at 8:08. No one knows you lifted except the page in the notebook and the body that is, today, slightly more itself than it was at 5:40. This is the costly signal: the thing you would do whether or not she ever saw it. Over twelve weeks compounded, the body becomes one no one has seen yet, including her; the signal is real because the signal was never about her.",
    dialog: [
      {
        speakerId: "inner-voice",
        text: "Coffee, eggs, toast. The notebook on the kitchen counter open to today's date. The Thursday session at 5:42 already in the calendar.",
        emotion: "knowing",
      },
      {
        speakerId: "inner-voice",
        tone: "tactical",
        text: "The bar moved. No one watched.",
        emotion: "knowing",
      },
    ],
    choices: [],
  },

  {
    id: "ending-pr-posted",
    backgroundId: "apartment",
    mood: "tense",
    isEnding: true,
    outcomeType: "bad",
    endingTitle: "The Bar Post",
    failureBlogSlug: "get-over-breakup-like-sociopath",
    failureBlogTitle: "How to Get Over a Breakup Like a Sociopath",
    endingLearnPrompt:
      "The bar photo is on a story. The caption marks week three. By noon the story has forty views, including five from her circle. By Friday she will know, through one of her three closest friends, that you are back in the gym. The post was, structurally, the message. The L5 boss lands one week closer because the message was sent. The discipline of L4-1 was failed in the male-track register; Thursday's session, the phone goes in the bag and the discipline returns.",
    dialog: [
      {
        speakerId: "inner-voice",
        text: "Story posted. Phone face-down on the shower bench. Forty views in two hours.",
        emotion: "sad",
      },
    ],
    choices: [],
  },

  {
    id: "ending-mirror-deleted",
    backgroundId: "apartment",
    mood: "peaceful",
    isEnding: true,
    outcomeType: "neutral",
    endingTitle: "The Photo, Deleted",
    endingLearnPrompt:
      "The photo was taken and the photo was destroyed before it travelled. The body learned the full sequence: phone, mirror, photo, gone. The leak was identified at the post-level rather than at the phone-level; the discipline is now real but not yet automatic. Thursday's session, the phone goes in the bag and stays there. The lesson lands at three-quarter cost: the artefact existed for ninety seconds, did not survive, did not become a post.",
    dialog: [
      {
        speakerId: "inner-voice",
        text: "Phone face-down. Shower. The photo of a man in a mirror in a gym at 7:38 a.m. on a Tuesday does not now exist in any roll on any device.",
        emotion: "knowing",
      },
    ],
    choices: [],
  },

  {
    id: "ending-leashed-photo",
    backgroundId: "apartment",
    mood: "tense",
    isEnding: true,
    outcomeType: "bad",
    endingTitle: "The Tracking Photo",
    failureBlogSlug: "get-over-breakup-like-sociopath",
    failureBlogTitle: "How to Get Over a Breakup Like a Sociopath",
    endingLearnPrompt:
      "The photo is kept. By Sunday the rationale will have grown. By Monday morning's coffee the photo will be the story, by Tuesday's session the body will be performing for the next photo at the bench press. The post-impulse compounds privately, with no audience, until the audience arrives. The mirror is now an instrument the body uses on itself. Tomorrow's first move is to delete the photo in a calm hour. Thursday's session, the phone in the bag.",
    dialog: [
      {
        speakerId: "inner-voice",
        text: "Photo in the camera roll, hidden album. Phone in the bag. Shower. The body is already calculating what light next Tuesday's photo would need.",
        emotion: "sad",
      },
    ],
    choices: [],
  },

  {
    id: "ending-snooze",
    backgroundId: "apartment",
    mood: "cold",
    isEnding: true,
    outcomeType: "neutral",
    endingTitle: "The Snooze",
    endingLearnPrompt:
      "Alarm silenced at 5:43. The gym bag by the door, untouched. Tomorrow's 5:42 is scheduled against the weight of this morning's snooze. The L4-1 discipline has not started yet. Set the alarm for 5:42 tomorrow, bag by the door tonight, phone in the bag, out by 5:54. The mechanism is repetition; the discipline starts on the first session, not the planned one.",
    dialog: [
      {
        speakerId: "inner-voice",
        text: "Pillow. Eyes. The bag by the door, still packed.",
        emotion: "serious",
      },
    ],
    choices: [],
  },
];

export const afterHer41: Scenario = {
  id: "after-her-4-1",
  title: "The First Lift",
  tagline:
    "5:42 a.m. The iron gym at 6:08. Set three on rep four. No mirror selfie. No caption marking week three.",
  description:
    "After-Her L4-1. The first costly signal in the male-track register. The teaching is the same as the female-track first run, with the male-track twist: the gym is a place men specifically perform, and the discipline is performing nothing tonight, not even to yourself. No mirror, no caption, no shirtless after photo for tracking. The session lives in the body and in the log; the post is the leak; the photo kept 'for tracking' is the leashed draft from L1-1 in a gym costume.",
  tier: "premium",
  track: "after-her",
  level: 4,
  order: 1,
  estimatedMinutes: 9,
  difficulty: "intermediate",
  category: "self-regulation",
  xpReward: 400,
  startSceneId: "the-alarm",
  prerequisites: ["after-her-3-2"],
  tacticsLearned: [
    "Phone in the bag. The mirror is the audience.",
    "Log the sets in the notebook. The session ends in the log.",
    "Form before angle. The angle is for the audience.",
    "The week-three caption marks the breakup; the post is structurally addressed to her.",
    "The for-tracking photo is the leashed draft in a gym costume.",
  ],
  redFlagsTaught: [
    "Music as the rationale for the camera in the pocket",
    "The PR story as message addressed to her by structural design",
    "The shirtless mirror selfie at 7:38 a.m. as for-tracking-only",
    "The camera-roll exception that compounds across sessions",
    "The form sacrificed to the angle the photo would need",
  ],
  characters: [INNER_VOICE_M],
  scenes,
  isNew: true,
};

export default afterHer41;
