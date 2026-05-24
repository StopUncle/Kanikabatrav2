/**
 * after-him-4-1, "The First Run"
 *
 * After-Him L4-1. Week three. 5:42 a.m. The first run. No photo,
 * no story, no caption. The teaching is the difference between costly
 * and cheap signals: a real glow-up would happen whether he ever saw
 * it; a performative one leaks the truth, which is that you are still
 * calibrating to be seen by him.
 *
 * Interior scene. Decisions are small: take a picture, post nothing,
 * tell one friend, tell no one. The audit is private.
 *
 * Teaches:
 *  - The signal is costly only if it would happen without an audience.
 *  - Posting at the trailhead is the leak the body knows about.
 *  - Telling no one is the cleanest costly signal in week three.
 *  - The legs know who you are running for.
 */

import type { Scenario, Scene } from "../../types";
import { INNER_VOICE } from "../../characters";

const scenes: Scene[] = [
  {
    id: "the-alarm",
    backgroundId: "apartment",
    mood: "cold",
    presentCharacterIds: ["inner-voice"],
    dialog: [
      {
        speakerId: null,
        text: "5:42 a.m. The alarm. The flat is dark. You set the kit out last night, the running shoes by the door, the long-sleeve on the chair, the keys in the bowl. You did not have to think this morning, which was the point of last night.",
      },
      {
        speakerId: "inner-voice",
        tone: "tactical",
        text: "The act gets its weight from being unobserved. Posting it is the leak. Telling a friend is half-leak. Telling no one is the structural answer to the question of who this is for.",
        emotion: "knowing",
      },
    ],
    choices: [
      {
        id: "go-quiet",
        text: "Out the door at 5:48. Phone left on the kitchen counter face-down.",
        tactic: "The clean opening. The phone is left behind because the phone is the surface area for the leak. The run starts now, in the cold, with no audience and no record.",
        nextSceneId: "the-route",
        isOptimal: true,
      },
      {
        id: "take-the-phone",
        text: 'Take the phone. "For Strava."',
        tactic: "Strava is the surface; Instagram is one tap away. The body's argument for the phone is reasonable; the body knows the phone is also the camera. The discipline of L4-1 is to remove the surface, not to trust yourself to ignore it.",
        nextSceneId: "with-phone",
        isOptimal: false,
      },
      {
        id: "snooze-back-to-bed",
        text: 'Snooze. Roll back over. "I will go tomorrow."',
        tactic: "Tomorrow's 5:42 a.m. version of you is the same as this morning's, except disappointed in the version of you that did not get up. The boots-by-the-door system was the future-you contract. Honoring it is the move; deferring it is teaching the future-you contracts to be fiction.",
        nextSceneId: "ending-snooze",
        isOptimal: false,
      },
    ],
  },

  {
    id: "the-route",
    backgroundId: "apartment",
    mood: "peaceful",
    presentCharacterIds: ["inner-voice"],
    dialog: [
      {
        speakerId: null,
        text: "The cold is colder than you remember. The first kilometre is bad because the first kilometre is always bad. Kilometre two the breath finds itself; the legs find themselves; the eastern sky is starting to do the thing it does at 6:14 a.m. in late March.",
      },
      {
        speakerId: null,
        text: "There is a moment, around the bend by the park entrance, where the body wants to take out the phone. There is, in this moment, an angle of the sky and an angle of the path. The phone is on the kitchen counter, two miles back.",
      },
      {
        speakerId: "inner-voice",
        tone: "tactical",
        text: "The moment is the moment. The body wanted to leak because the body learned that all good moments are content. The sky still happens whether or not it is photographed.",
        emotion: "knowing",
      },
    ],
    choices: [
      {
        id: "let-the-moment-pass",
        text: "Run through it. The sky does what the sky does. The lungs do what the lungs do.",
        tactic: "The discipline holds. The moment is real because it was unrecorded. The body learns: the good thing happens whether or not the good thing is seen. This is the actual costly signal: you ran the run that no one saw.",
        nextSceneId: "the-finish",
        isOptimal: true,
      },
      {
        id: "regret-no-phone",
        text: 'Stop briefly. "I should have brought it. That was such a moment."',
        tactic: "The regret is the leak in a costume. The moment was the moment; the regret is the body asking permission to bring the phone tomorrow. Note the body's argument; do not give it the phone next time.",
        nextSceneId: "the-finish-with-regret",
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
        text: "Kilometre three. The path bends. The sky does the thing. The phone is in your hand before you have decided.",
      },
      {
        speakerId: "inner-voice",
        tone: "tactical",
        text: "The phone is out. The next decision is whether the photo is for you, the camera roll, or for an audience, the post. The phone in the hand at kilometre three of run one of week three is, statistically, taking a photo for the audience. Decide before the hand decides.",
        emotion: "serious",
      },
    ],
    choices: [
      {
        id: "photo-camera-roll-only",
        text: "One photo. Camera roll. Phone back in the pocket. Run on.",
        tactic: "Half-recovery. The photo is for you, not for the post. The discipline of L4-1 is intact at the level of the post. The structural leak (the phone being out) is on the record for next time. Run two next Tuesday, the phone stays on the counter.",
        nextSceneId: "the-finish",
        isOptimal: true,
      },
      {
        id: "post-instantly",
        text: "Story it. No caption, just the photo and the time stamp.",
        tactic: "The post is the leak. The story is published. He may or may not see it; the question of whether he sees it is structurally the same question as whether you posted it for him. The body has the answer. The legs know.",
        nextSceneId: "ending-posted",
        isOptimal: false,
      },
    ],
  },

  {
    id: "the-finish",
    backgroundId: "apartment",
    mood: "peaceful",
    presentCharacterIds: ["inner-voice"],
    dialog: [
      {
        speakerId: null,
        text: "Back at the flat at 6:48 a.m. The phone is on the kitchen counter where you left it. Three notifications on the lock screen: Strava (yours, automated), email from work, a friend's birthday reminder from Facebook. None about him. None about anyone.",
      },
      {
        speakerId: null,
        text: "You make coffee. Stretch on the kitchen floor. The flat is brighter than it was at 5:40.",
      },
      {
        speakerId: "inner-voice",
        tone: "tactical",
        text: "The run is done. The audience is you. The signal was costly because it cost the post, which was the cheap thing.",
        emotion: "knowing",
      },
    ],
    choices: [
      {
        id: "tell-no-one",
        text: "Make breakfast. Tell no one. Plan the next run for Thursday at 5:42.",
        tactic: "The clean close. The run lives in your body and in your Strava and in nothing else. The audience is you. The mechanism compounds privately over six to twelve weeks. By week eight, the run is the thing you do because the body has rebuilt around the doing of it, not because the world saw the doing of it.",
        nextSceneId: "ending-run-private",
        isOptimal: true,
      },
      {
        id: "text-one-friend",
        text: 'Text Priya. "Did the 5:42 run. Cold."',
        tactic: "Telling one friend is the half-cost version of the post. Priya is safe; the body is still reaching for the small audience. The text is not the failure; the impulse behind it is the leak the audit is supposed to catch. Note the impulse. Do not text the next one.",
        nextSceneId: "ending-told-priya",
        isOptimal: false,
      },
      {
        id: "post-after-run",
        text: 'Post the Strava map to Instagram with a small caption. "5:42, week three."',
        tactic: "The post after the run is the post after the run; the run is real, the post is the leak. The map is for an audience. The caption is the giveaway: 'week three' marks the breakup, which means the post is structurally about him even though it appears to be about the run.",
        nextSceneId: "ending-posted",
        isOptimal: false,
      },
    ],
  },

  {
    id: "the-finish-with-regret",
    backgroundId: "apartment",
    mood: "cold",
    isEnding: true,
    outcomeType: "neutral",
    endingTitle: "The Moment You Did Not Photograph",
    endingLearnPrompt:
      "The moment was the moment. The regret was the leak in a costume. The body wanted the phone for the audience that was waiting at home; the body did not have the phone, so the regret arrived instead. The discipline of L4-1 lands at three-quarter cost: the moment was real and unrecorded; the regret tells you the audience is still inside your head; the next run on Thursday at 5:42, the phone stays on the counter without the regret showing up because the body will have learned by then that the moment happens whether or not the phone is there.",
    dialog: [
      {
        speakerId: "inner-voice",
        text: "Stretch on the kitchen floor. The sky outside is the same sky as the one on the bend. The moment ran in the body, not on a feed.",
        emotion: "knowing",
      },
    ],
    choices: [],
  },

  // Endings
  {
    id: "ending-run-private",
    backgroundId: "apartment",
    mood: "peaceful",
    isEnding: true,
    outcomeType: "good",
    endingTitle: "The Run That Was Yours",
    endingLearnPrompt:
      "5:42 a.m. The cold. The bend at kilometre three. The phone on the kitchen counter the whole time. The breakfast at 7:08 with coffee that tastes like coffee. No one knows you ran except the Strava you check at lunch and the body that is, now, slightly more itself than it was at 5:40. This is the costly signal: the thing you would do whether or not he ever saw it. Compounded over twelve weeks, the body becomes one no one has seen yet, including him; the signal is real because the signal was never about him.",
    dialog: [
      {
        speakerId: "inner-voice",
        text: "Coffee, oatmeal, the window open two inches. Thursday at 5:42. The signal lives in the legs.",
        emotion: "knowing",
      },
      {
        speakerId: "inner-voice",
        tone: "tactical",
        text: "Cost is what makes the signal.",
        emotion: "knowing",
      },
    ],
    choices: [],
  },

  {
    id: "ending-told-priya",
    backgroundId: "apartment",
    mood: "cold",
    isEnding: true,
    outcomeType: "neutral",
    endingTitle: "Priya's Heart Reaction",
    endingLearnPrompt:
      "The text went to Priya. The audience was small and safe. The body still reached for the small audience. The lesson lands at half cost: the post-impulse exists; the post was sublimated to a private DM; the structural leak (the reach for an audience at all) is on the record. By Thursday's run the impulse will be lower; by Tuesday's run after that, lower still. Telling Priya is not the failure; not noticing the impulse is.",
    dialog: [
      {
        speakerId: "inner-voice",
        text: "Priya: 'proud of you, you sicko, in this cold' with a heart. The audience was tiny. The audience was real.",
        emotion: "knowing",
      },
    ],
    choices: [],
  },

  {
    id: "ending-posted",
    backgroundId: "apartment",
    mood: "tense",
    isEnding: true,
    outcomeType: "bad",
    endingTitle: "The Story, Posted",
    failureBlogSlug: "get-over-breakup-like-sociopath",
    failureBlogTitle: "How to Get Over a Breakup Like a Sociopath",
    endingLearnPrompt:
      "The story is up. By 9 a.m. it has thirty-eight views. You have checked the viewer list four times. The list contains his name. You have not screenshotted; you have, however, looked. The signal was cheap because it cost the audience; it announced itself; it confirmed, to you and to anyone watching, that the run was not for the body but for the audit. Tomorrow the run will be harder to do quietly because the body learned that posting is the dopamine event at the end of the run. Re-do the discipline at Thursday's run: phone on the counter, no post, no story, no map. The lesson lands at full cost: posting once is the slot machine paying out; the body now wants the slot machine.",
    dialog: [
      {
        speakerId: "inner-voice",
        text: "Story posted. The number on the viewer list ticks up. His name was the fourth.",
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
      "The alarm was silenced at 5:43. The boots are by the door, untouched. Tomorrow's 5:42 is now scheduled against the weight of this morning's snooze. The L4-1 discipline has not started yet because L4-1 cannot start until the first run happens. The track holds. Set the alarm for 5:42 tomorrow, kit out tonight, phone on the counter, out by 5:48. The mechanism is repetition.",
    dialog: [
      {
        speakerId: "inner-voice",
        text: "Pillow. Eyes. The boots by the door at the level of the floor.",
        emotion: "serious",
      },
    ],
    choices: [],
  },
];

export const afterHim41: Scenario = {
  id: "after-him-4-1",
  title: "The First Run",
  tagline:
    "5:42 a.m. The cold. The sky at the bend at kilometre three. Phone on the kitchen counter. The signal is costly because it cost the post.",
  description:
    "After-Him L4-1. The first costly signal. The teaching is the difference between costly and cheap: a real glow-up would happen whether he ever saw it; a performative one leaks the truth. The phone left on the counter is the structural answer to the question of who this is for. The story posted is the slot machine; the camera-roll-only photo is half-recovery; telling Priya is the impulse before the post. The signal compounds privately over twelve weeks.",
  tier: "premium",
  track: "after-him",
  level: 4,
  order: 1,
  estimatedMinutes: 8,
  difficulty: "intermediate",
  category: "self-regulation",
  xpReward: 400,
  startSceneId: "the-alarm",
  prerequisites: ["after-him-3-2"],
  tacticsLearned: [
    "Phone on the kitchen counter. The phone is the surface for the leak.",
    "The moment is real whether or not the moment is photographed.",
    "Posting once trains the slot machine; the body now wants the slot machine.",
    "The 'week three' caption marks the breakup; the post is structurally about him.",
    "Telling Priya is the post-impulse in a private costume; note it.",
  ],
  redFlagsTaught: [
    "The phone-for-Strava rationale that is the camera one tap away",
    "The trailhead photo as the leak the body knows about",
    "The vague caption that names the breakup by accident",
    "The viewer-list check that confirms the post was for one viewer",
    "The post that becomes the dopamine event the body learns to expect",
  ],
  characters: [INNER_VOICE],
  scenes,
  isNew: true,
};

export default afterHim41;
