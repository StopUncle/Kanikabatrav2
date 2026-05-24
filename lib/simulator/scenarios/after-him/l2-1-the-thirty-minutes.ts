/**
 * after-him-2-1, "The Thirty Minutes"
 *
 * After-Him L2-1. The first attempt at boxed grief. 8 p.m. on the
 * fifth night. A timer set for thirty minutes. The teaching is the
 * window itself: feelings get a defined slot, and outside the slot you
 * redirect. The discipline is not suppression. It is sovereignty over
 * the schedule.
 *
 * Interior scene only. Voice: closer to Kanika's normal register,
 * warm-cold. The trap is the extension. The five-more-minutes is
 * how the brain learns the timer is negotiable. Negotiable timers
 * are not timers; they are background music.
 *
 * Teaches:
 *  - Schedule grief. Box it. Honor the timer when it goes off.
 *  - The five-more-minutes is the slot machine restarting.
 *  - Extending once teaches the brain the window is fiction.
 *  - The redirect is the move that makes the next box land.
 */

import type { Scenario, Scene } from "../../types";
import { INNER_VOICE } from "../../characters";

const scenes: Scene[] = [
  {
    id: "the-timer",
    backgroundId: "apartment",
    mood: "cold",
    presentCharacterIds: ["inner-voice"],
    dialog: [
      {
        speakerId: null,
        text: "Thursday, 8:02 p.m. Five days. The flat is dim on purpose; you turned the kitchen light off on the way past. You sit on the floor of the living room, knees up, back against the couch. The candle is the kind that smells like something you would not pick if he were here.",
      },
      {
        speakerId: null,
        text: "Phone in your hand. The Clock app open. The timer set for thirty minutes. You have not started it yet.",
      },
      {
        speakerId: "inner-voice",
        tone: "tactical",
        text: "The window is the move. Inside the window, all feelings are legal. Cry, type a letter you do not send, look at the one photo you have decided is permitted, write his name on the paper next to you and then cross it out. When the timer goes off, the window closes. Get up. Make tea. Do the thing on the other side of the timer that does not include him.",
        emotion: "knowing",
      },
    ],
    choices: [
      {
        id: "start-the-timer",
        text: "Start the timer. Set the phone face-down beside you. Begin.",
        tactic: "The clean opening. The timer is not negotiable; it is the contract you signed with yourself ten minutes ago when you were calmer than you are now. Honoring it is what makes it real.",
        nextSceneId: "inside-the-window",
        isOptimal: true,
      },
      {
        id: "skip-the-timer",
        text: 'Skip the timer. "I will just sit with it as long as I need." No need for a stopwatch.',
        tactic: "Open-ended grief is the spiral with a poetic name. The timer is the floor under what is otherwise an unlimited fall. Skipping it is preferring the fall.",
        nextSceneId: "no-timer",
        isOptimal: false,
      },
      {
        id: "delay-the-timer",
        text: 'Not tonight. Pour wine. Watch something. You can do the window thing tomorrow.',
        tactic: "Tomorrow's window does not exist because tomorrow's calmness has not been built yet. The deferral is the most honest version of choosing not to do it, dressed as scheduling.",
        nextSceneId: "deferred",
        isOptimal: false,
      },
    ],
  },

  {
    id: "inside-the-window",
    backgroundId: "apartment",
    mood: "peaceful",
    presentCharacterIds: ["inner-voice"],
    dialog: [
      {
        speakerId: null,
        text: "Eight minutes in, the timer counts down quietly. You cry. You stop crying. You start again. You write three sentences on the paper next to you and then cross out the second one because it was not true. At minute twenty-two the body settles, not the way the body settles when grief ends, the way the body settles when a wave passes.",
      },
      {
        speakerId: null,
        text: "Minute twenty-nine. The timer is about to go off. You feel it like the end of a song you can hear without looking.",
      },
      {
        speakerId: "inner-voice",
        tone: "tactical",
        text: "Three minutes ago you thought you would need fifteen more. One minute ago you noticed you would not. The wave handled itself, inside the window. That is what windows are for.",
        emotion: "knowing",
      },
    ],
    choices: [
      {
        id: "honor-the-timer",
        text: "Stand up at the buzzer. Go to the kitchen. Make tea. The window closes.",
        tactic: "The discipline that makes the next window land. Honoring it once is the proof your brain needs that the next one will be honored too. The redirect (kitchen, tea, hands busy) is the cleaner-than-emotional change of state.",
        nextSceneId: "ending-window-held",
        isOptimal: true,
        event: "restraint-shown",
      },
      {
        id: "five-more-minutes",
        text: 'Just five more minutes. The wave is almost done. You can feel it. Five.',
        tactic: "The five-more is the slot machine restarting. Five becomes fifteen becomes the rest of the night. The timer was the contract; the extension is the renegotiation that confirms the contract was never real.",
        nextSceneId: "the-extension",
        isOptimal: false,
      },
      {
        id: "reset-timer",
        text: "Reset the timer for another thirty. Tonight is allowed to be the heavy one.",
        tactic: "Resetting tells you the timer is decorative. Tonight may genuinely be the heavy one, and the way you honor that is not by reopening tonight's window; it is by booking tomorrow's at the same time and making it. Twice is not two windows. Twice is no window.",
        nextSceneId: "the-extension",
        isOptimal: false,
      },
    ],
  },

  {
    id: "the-extension",
    backgroundId: "apartment",
    mood: "tense",
    presentCharacterIds: ["inner-voice"],
    dialog: [
      {
        speakerId: null,
        text: "Forty-eight minutes in now. The wave that was passing at minute twenty-two is back. The five minutes did not extend the closure; they extended the spiral, which had been quietly receding and is now back to its full height because you re-opened the door.",
      },
      {
        speakerId: "inner-voice",
        tone: "tactical",
        text: "The next window will be harder to honor because tonight's was not. The cost of the five-more was not five minutes; it was the credibility of every future timer.",
        emotion: "serious",
      },
    ],
    choices: [
      {
        id: "stop-now-late",
        text: "Stop now. Late but stop. Get up. The window was open; it is closed now.",
        tactic: "Late recovery. Imperfect closure is closure. Tomorrow's window starts at credibility level one out of three, not zero. The recovery is what salvages it.",
        nextSceneId: "ending-window-extended",
        isOptimal: true,
      },
      {
        id: "let-it-run",
        text: "Let it run. The wave has its own clock. You will know when to stop.",
        tactic: "The wave does not have a clock. That is what makes a clock necessary. Letting it run is what produces a Wednesday evening of grief next month with no boundary at all, because tonight you taught the system there is none.",
        nextSceneId: "ending-let-run",
        isOptimal: false,
      },
    ],
  },

  {
    id: "no-timer",
    backgroundId: "apartment",
    mood: "tense",
    presentCharacterIds: ["inner-voice"],
    dialog: [
      {
        speakerId: null,
        text: "11:14 p.m. You have been on the floor for three hours and seven minutes. The candle is half gone. The paper on the floor has nine sentences on it and seven of them are crossed out.",
      },
      {
        speakerId: "inner-voice",
        tone: "tactical",
        text: "The open-ended grief did what open-ended grief does. It used the bandwidth you needed for tomorrow morning. The timer was not preventing the feeling; it was preventing the colonisation.",
        emotion: "serious",
      },
    ],
    choices: [
      {
        id: "stop-now-too-late",
        text: "Stop. Make tea. Book tomorrow's window at 8 p.m. now in the calendar.",
        tactic: "Late recovery that books the next attempt with structure. The pre-commitment in the calendar is the artefact future-you will obey because present-you wrote it.",
        nextSceneId: "ending-no-timer-recovered",
        isOptimal: true,
      },
      {
        id: "open-his-instagram",
        text: "Open his Instagram. Just once. Just to see.",
        tactic: "The audit you did at L1-2 will have closed this off. If it did, this option is not available. If it did not, this is the channel the open-ended grief routes to at hour three because the spiral needs new fuel and you put one in the room.",
        nextSceneId: "ending-relapsed",
        isOptimal: false,
      },
    ],
  },

  {
    id: "deferred",
    backgroundId: "apartment",
    mood: "cold",
    isEnding: true,
    outcomeType: "neutral",
    endingTitle: "The Wine Night",
    endingLearnPrompt:
      "Tonight is a wine and television night. Tomorrow's 8 p.m. window does not exist; it was a promise made by the version of you who is not the one currently pouring the second glass. The track does not punish the night off; it notes that the window practice has not yet started. The next attempt is when the next attempt is. The schedule that makes the rest of the track work has not been entered into yet.",
    dialog: [
      {
        speakerId: "inner-voice",
        text: "Glass in hand. Something British on the screen. The window will be tomorrow. Or Saturday. Or.",
        emotion: "serious",
      },
    ],
    choices: [],
  },

  {
    id: "ending-window-held",
    backgroundId: "apartment",
    mood: "peaceful",
    isEnding: true,
    outcomeType: "good",
    endingTitle: "The Window Held",
    endingLearnPrompt:
      "Thirty minutes is enough. The wave passed inside the window because the window held. The kettle whistles. The tea is made. The paper is folded and placed in the drawer with the lid. Tomorrow's window is at 8 p.m. and it will land, because tonight's did, and the brain has learned the contract. The funeral has its hours. Outside the hours, the day is yours.",
    dialog: [
      {
        speakerId: "inner-voice",
        text: "Kettle on. Tea steeping. The paper folded into the drawer. The window closed cleanly.",
        emotion: "knowing",
      },
      {
        speakerId: "inner-voice",
        tone: "tactical",
        text: "The funeral has its hours.",
        emotion: "knowing",
      },
    ],
    choices: [],
  },

  {
    id: "ending-window-extended",
    backgroundId: "apartment",
    mood: "cold",
    isEnding: true,
    outcomeType: "neutral",
    endingTitle: "The Extension, Recovered",
    endingLearnPrompt:
      "The window extended once. Late recovery is recovery. Tomorrow's window starts at reduced credibility but not zero; the discipline of stopping at minute forty-eight is what salvages the next attempt. The lesson lands: the extension is the cost, not the relief. The next 8 p.m. will be harder to honor than tonight's was, and the discipline is honoring it anyway, on slightly worse credit.",
    dialog: [
      {
        speakerId: "inner-voice",
        text: "Forty-eight minutes. Tea, late. Window closed, eventually. Tomorrow at 8 p.m., on time.",
        emotion: "serious",
      },
    ],
    choices: [],
  },

  {
    id: "ending-let-run",
    backgroundId: "apartment",
    mood: "tense",
    isEnding: true,
    outcomeType: "bad",
    endingTitle: "The Open-Ended Window",
    failureBlogSlug: "get-over-breakup-like-sociopath",
    failureBlogTitle: "How to Get Over a Breakup Like a Sociopath",
    endingLearnPrompt:
      "The wave did not have a clock. The window expanded until the night did. By tomorrow morning the body will be a body that did not sleep, and the day will be a day that runs on borrowed bandwidth. The cost was not the time. The cost was the credibility of every future window. The next 8 p.m. will look at you with one less reason to believe you. The funeral is supposed to have hours so the rest of the day, and the rest of the life, can have them too. Tonight, the funeral took all the hours.",
    dialog: [
      {
        speakerId: "inner-voice",
        text: "12:47 a.m. The candle is out. The paper on the floor is dense. Tomorrow has fewer hours now.",
        emotion: "sad",
      },
    ],
    choices: [],
  },

  {
    id: "ending-no-timer-recovered",
    backgroundId: "apartment",
    mood: "cold",
    isEnding: true,
    outcomeType: "neutral",
    endingTitle: "The Calendar Block",
    endingLearnPrompt:
      "Three hours of open grief, then the recovery: tomorrow's 8 p.m. window in the calendar with the title 'window'. The recovery does not erase tonight; it bounds the cost. The brain has not yet been taught the contract because tonight did not have one. Tomorrow's attempt has a name in the calendar, which is the cheapest pre-commitment device any boundary ever runs on. Honor it tomorrow and the contract starts. Skip it and tonight repeats.",
    dialog: [
      {
        speakerId: "inner-voice",
        text: "11:18 p.m. Calendar opened. Block created. Tomorrow at 8. The candle blown out properly this time.",
        emotion: "knowing",
      },
    ],
    choices: [],
  },

  {
    id: "ending-relapsed",
    backgroundId: "apartment",
    mood: "tense",
    isEnding: true,
    outcomeType: "bad",
    endingTitle: "The Profile, Opened",
    failureBlogSlug: "narcissistic-hoovering-explained",
    failureBlogTitle: "Narcissistic Hoovering: When Your Ex Tries to Suck You Back In",
    endingLearnPrompt:
      "The open-ended grief metabolised, three hours in, into the channel that was supposed to be closed. Whether you found a workaround or had left the channel open at L1-2 audit, the result is the same: the spiral found new fuel at hour three because there was no window telling it to stop at minute thirty. Re-do the L1-2 audit tonight, before bed, if any version of his profile is still reachable. Re-set the window. Tomorrow at 8 p.m. The cost was the night. The structural lesson is that open-ended grief seeks open channels, which is why both have to be closed at the same time, not one at a time.",
    dialog: [
      {
        speakerId: "inner-voice",
        text: "His face on the screen. A scroll. Another scroll. The candle has gone out without you noticing.",
        emotion: "sad",
      },
    ],
    choices: [],
  },
];

export const afterHim21: Scenario = {
  id: "after-him-2-1",
  title: "The Thirty Minutes",
  tagline:
    "8 p.m. The timer. Inside the window all feelings are legal. Outside the window the day is yours.",
  description:
    "After-Him L2-1. The first attempt at boxed grief. The teaching is the window itself: a defined slot, honored on the bell. The trap is the five-more-minutes that renegotiates the contract and trains the brain that timers are decorative. Imperfect closure is closure. Open-ended grief is the spiral with a poetic name.",
  tier: "premium",
  track: "after-him",
  level: 2,
  order: 1,
  estimatedMinutes: 8,
  difficulty: "intermediate",
  category: "self-regulation",
  xpReward: 340,
  startSceneId: "the-timer",
  prerequisites: ["after-him-1-2"],
  tacticsLearned: [
    "Schedule grief. Box it. Honor the bell.",
    "The five-more-minutes is the slot machine restarting.",
    "Extending once costs the credibility of every future window.",
    "Late recovery is recovery. Imperfect closure is closure.",
    "Pre-commit the next window in the calendar before bed.",
  ],
  redFlagsTaught: [
    "Open-ended grief as 'sitting with it' in a poetic costume",
    "The extension that renegotiates the contract the timer was",
    "The wave that 'has its own clock' (it does not)",
    "The relapse channel that the absence of a window steers the spiral toward",
    "The deferred window that tomorrow-you will not honor either",
  ],
  characters: [INNER_VOICE],
  scenes,
  isNew: true,
};

export default afterHim21;
