/**
 * after-her-2-1, "The Thirty Minutes"
 *
 * After-Her L2-1. 8 p.m. on the fifth night. The first attempt at
 * boxed grief, with the male-track twist: grief and rage are the same
 * energy at different temperatures, and the rage is the more seductive
 * costume the same self-indulgence wears. Both go in the box. Neither
 * stays on tap.
 *
 * Interior scene only. Voice: terse, tactical. The trap is not the
 * extension; it is the conversion of grief into rage at minute twelve
 * because rage feels like agency. It is not agency. It is the schedule.
 *
 * Teaches:
 *  - Schedule grief and rage. They are one budget.
 *  - Rage is the seductive costume. It feels like winning.
 *  - The extension of either is the slot machine restarting.
 *  - Late recovery preserves the next window at reduced credibility.
 */

import type { Scenario, Scene } from "../../types";
import { INNER_VOICE_M } from "../../characters-male";

const scenes: Scene[] = [
  {
    id: "the-timer",
    backgroundId: "apartment",
    mood: "cold",
    presentCharacterIds: ["inner-voice"],
    dialog: [
      {
        speakerId: null,
        text: "Tuesday, 8:02 p.m. Five days since she left. The flat is dim. The kitchen light is off. You sit on the couch with the phone in your hand, the Clock app open, the timer set for thirty minutes.",
      },
      {
        speakerId: "inner-voice",
        tone: "tactical",
        text: "Inside the window: sadness, rage, both. Outside the window: gym, dinner, the project on the back of the house. The contract is the window.",
        emotion: "knowing",
      },
      {
        speakerId: "inner-voice",
        tone: "tactical",
        text: "Watch what rises first. Sadness will dress as rage by minute twelve because rage feels like agency. It is not agency. It is the schedule.",
        emotion: "knowing",
      },
    ],
    choices: [
      {
        id: "start-the-timer",
        text: "Start the timer. Phone face-down. Begin.",
        tactic: "The contract opens. Honoring the bell is what makes the next contract land.",
        nextSceneId: "inside-the-window",
        isOptimal: true,
      },
      {
        id: "skip-go-to-gym",
        text: 'Skip the window. Go to the gym instead. "I will lift it out."',
        tactic: "Lifting it out is not boxing it. The body will return to a flat without the window, at 10 p.m., with the same feeling untouched and the body's bandwidth spent. The window is what the gym after the window runs on, not a substitute for it.",
        nextSceneId: "no-window",
        isOptimal: false,
      },
      {
        id: "delay-the-window",
        text: 'Not tonight. Whiskey. UFC re-runs. The window can be tomorrow.',
        tactic: "Tomorrow's window does not exist yet because tomorrow-you has not signed the contract. The deferral is the cleanest costume of choosing not to do it.",
        nextSceneId: "deferred",
        isOptimal: false,
      },
    ],
  },

  {
    id: "inside-the-window",
    backgroundId: "apartment",
    mood: "tense",
    presentCharacterIds: ["inner-voice"],
    dialog: [
      {
        speakerId: null,
        text: "Minute four: sadness, clean. Minute eight: sadness with edges. Minute twelve: the edges sharpen. A specific image arrives. Her, last Thursday, picking up the dog's lead from the hook in the kitchen, not looking at you.",
      },
      {
        speakerId: null,
        text: "The image converts. The feeling, on the inside, is no longer the sadness it started as. It is the precise list of things she did not say in the four months. It is the calendar week she was meeting friends and was, you now realise, also meeting a lawyer.",
      },
      {
        speakerId: "inner-voice",
        tone: "tactical",
        text: "The conversion. Sadness to rage at minute twelve. Both are in the window. Both go in the box at the bell. The rage feels more useful because it points outward. It is the same self-indulgence in a louder costume.",
        emotion: "serious",
      },
    ],
    choices: [
      {
        id: "stay-in-the-window",
        text: "Let it run inside the window. Rage at minute twelve, sadness back at minute twenty. The bell decides when it ends.",
        tactic: "The correct move. The window holds both feelings without judgement; what it does not do is let either feeling out of the window. The contract is the window, not the content.",
        nextSceneId: "the-bell",
        isOptimal: true,
      },
      {
        id: "text-the-boys",
        text: 'Open the group chat. Type: "she was planning it for four months. four. fucking. months." Send.',
        tactic: "The rage leaks outward through the group chat. The boys will respond. The response will be confirmation. Confirmation is fuel. By minute twenty, you are not inside the window; you are running a vengeance rally with three other men, none of whom were in the relationship.",
        nextSceneId: "the-rage-leak",
        isOptimal: false,
      },
      {
        id: "write-the-letter-no-send",
        text: 'Open Notes. Start typing: "you had a list."',
        tactic: "Writing inside the window is allowed, the same way crying inside the window is allowed. Writing toward sending is the leak; writing toward yourself is the work. The pen test: if the document would be deleted at the bell, it is inside the window. If you would save it, you are routing toward send.",
        nextSceneId: "the-bell",
        isOptimal: true,
      },
    ],
  },

  {
    id: "the-bell",
    backgroundId: "apartment",
    mood: "cold",
    presentCharacterIds: ["inner-voice"],
    dialog: [
      {
        speakerId: null,
        text: "Minute twenty-nine. The wave receded at twenty-two, came back at twenty-six, is currently flat. The timer is about to go off.",
      },
      {
        speakerId: "inner-voice",
        tone: "tactical",
        text: "The bell is the contract. Honor it. The gym is at 9. The dinner is at 10. The day is yours from here.",
        emotion: "knowing",
      },
    ],
    choices: [
      {
        id: "honor-the-bell",
        text: "Bell rings. Stand up. Delete the Notes draft. Gym bag, door.",
        tactic: "The clean close. The Notes draft was inside the window; it dies at the bell. The body changes state. The brain learns the contract.",
        nextSceneId: "ending-window-held",
        isOptimal: true,
        event: "restraint-shown",
      },
      {
        id: "save-the-notes-draft",
        text: 'Bell rings. Save the Notes draft for later. "I might want to look at it."',
        tactic: "Saving the draft is routing it toward send. The pen test failed. Notes drafts grow on their own; you will open it at 1 a.m. Saturday and edit it, and the edited version is the one you will send by mistake.",
        nextSceneId: "the-saved-draft",
        isOptimal: false,
      },
      {
        id: "five-more",
        text: "Five more. You can feel the wave is almost done.",
        tactic: "Five becomes thirty. The contract is renegotiated, which is the contract being broken. Next Tuesday at 8 p.m. starts at reduced credibility because the brain learned tonight that the bell is decorative.",
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
        text: "Forty-six minutes. The wave is back, bigger than it was at minute twelve. The rage has re-acquired the four-months detail. The room is a smaller room than it was at minute one.",
      },
      {
        speakerId: "inner-voice",
        tone: "tactical",
        text: "The cost of the five-more was not five minutes. It was the credibility of the next bell. Stop now and tomorrow's window opens at reduced credit, not zero.",
        emotion: "serious",
      },
    ],
    choices: [
      {
        id: "stop-late",
        text: "Stop. Stand. Gym bag. Late but the door is the door.",
        tactic: "Late recovery. Tomorrow's bell starts at lower credit but not zero. The gym at 9:48 instead of 9 is still the gym.",
        nextSceneId: "ending-late-recovery",
        isOptimal: true,
      },
      {
        id: "let-it-run",
        text: "Let it run. The rage has a point. You can feel it.",
        tactic: "Rage has the structure of pointing. It does not have a point. Letting it run is producing a 1 a.m. version of you who is writing the text she will read at the gym tomorrow.",
        nextSceneId: "ending-rage-night",
        isOptimal: false,
      },
    ],
  },

  {
    id: "the-rage-leak",
    backgroundId: "apartment",
    mood: "tense",
    presentCharacterIds: ["inner-voice"],
    dialog: [
      {
        speakerId: null,
        text: "Three replies in two minutes. The boys are mobilised. The chat is now eight messages long. The rage has left the window through a side door and is currently running on four engines instead of one.",
      },
      {
        speakerId: "inner-voice",
        tone: "tactical",
        text: "The boys are not the audit. The boys are the gasoline. The window was inside the room. The chat is outside the room. The feeling is not being processed; it is being amplified by an audience that is also angry now.",
        emotion: "serious",
      },
    ],
    choices: [
      {
        id: "mute-the-chat",
        text: 'Type one more: "going off this for the night. talk tomorrow." Mute the chat. Phone face-down. Back to the window.',
        tactic: "Late recovery. The chat is closed in a way that is also a courtesy; the audit returns to its single engine; the window has six minutes left to run, and you sit in them. Imperfect process is process.",
        nextSceneId: "the-bell",
        isOptimal: true,
      },
      {
        id: "ride-the-wave-out",
        text: "Stay in the chat. You needed to vent. They are helping.",
        tactic: "They are not helping. They are confirming. Confirmation is the slot machine paying out small wins on a variable schedule, which is exactly the schedule the breakup is supposed to be detaching you from. Different machine, same architecture.",
        nextSceneId: "ending-chat-vent",
        isOptimal: false,
      },
    ],
  },

  {
    id: "no-window",
    backgroundId: "apartment",
    mood: "cold",
    isEnding: true,
    outcomeType: "neutral",
    endingTitle: "The Gym Instead",
    endingLearnPrompt:
      "You went to the gym. Lifted heavy. Came home. The feeling is still here, at 10:08 p.m., on the couch, with the body tired and the question unprocessed. The gym is part of L4-1, the costly signal, and it is not a substitute for the window. The window processes; the gym builds. Doing the gym without ever doing the window produces a man who looks excellent in three months and is still inside the relationship operationally. Book tomorrow's window at 8 p.m. in the calendar before bed.",
    dialog: [
      {
        speakerId: "inner-voice",
        text: "Shower. Couch. Phone in hand. The feeling hands you back the same question it asked you at 8:02.",
        emotion: "serious",
      },
    ],
    choices: [],
  },

  {
    id: "deferred",
    backgroundId: "apartment",
    mood: "cold",
    isEnding: true,
    outcomeType: "neutral",
    endingTitle: "The Whiskey Night",
    endingLearnPrompt:
      "Whiskey, UFC, the couch. The window did not happen. Tomorrow's window was promised by a version of you that is not the one currently pouring the third one. The track does not punish the night off; it notes that the schedule that makes the rest of the track work has not been entered into yet. The Funeral has not begun.",
    dialog: [
      {
        speakerId: "inner-voice",
        text: "Glass in hand. Two men in a cage on the screen. The window will be tomorrow. Or Thursday.",
        emotion: "serious",
      },
    ],
    choices: [],
  },

  {
    id: "the-saved-draft",
    backgroundId: "apartment",
    mood: "cold",
    isEnding: true,
    outcomeType: "bad",
    endingTitle: "The Notes Draft",
    failureBlogSlug: "get-over-breakup-like-sociopath",
    failureBlogTitle: "How to Get Over a Breakup Like a Sociopath",
    endingLearnPrompt:
      "The draft is saved. It will be edited. The edited version is the one that gets sent, by mistake, by autocorrect, by 1 a.m. on Saturday. The pen test was the discipline of L2-1, and the failure was small (one tap) but structurally complete. Tomorrow's first move: open Notes, delete the draft without re-reading, then book the next window in the calendar.",
    dialog: [
      {
        speakerId: "inner-voice",
        text: "Notes saved. Title: untitled. The draft is now an object that exists outside the window.",
        emotion: "sad",
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
      "Thirty minutes was enough. Sadness and rage both occurred inside the window. The Notes draft died at the bell. The gym bag is at the door. The window held; the contract is real; tomorrow's 8 p.m. lands at full credibility. The Funeral has its hours, and rage is in the same box as grief, which is where it has to be for the rest of the track to work.",
    dialog: [
      {
        speakerId: "inner-voice",
        text: "Notes deleted. Gym bag in hand. The door opens, the cold air, the elevator down. The window held.",
        emotion: "knowing",
      },
      {
        speakerId: "inner-voice",
        tone: "tactical",
        text: "Grief and rage in the same box.",
        emotion: "knowing",
      },
    ],
    choices: [],
  },

  {
    id: "ending-late-recovery",
    backgroundId: "apartment",
    mood: "cold",
    isEnding: true,
    outcomeType: "neutral",
    endingTitle: "Forty-Six Minutes",
    endingLearnPrompt:
      "The window extended sixteen minutes. The late stop is the recovery. Tomorrow's bell starts at reduced credit; the gym at 9:48 is still the gym. The lesson lands at half cost: the extension is the price, not the relief. Imperfect closure is closure, especially on the male track where the easier feeling, rage, is also the louder one.",
    dialog: [
      {
        speakerId: "inner-voice",
        text: "Gym bag, slightly late. Door, slightly late. The body still goes.",
        emotion: "serious",
      },
    ],
    choices: [],
  },

  {
    id: "ending-rage-night",
    backgroundId: "apartment",
    mood: "tense",
    isEnding: true,
    outcomeType: "bad",
    endingTitle: "The Open Engine",
    failureBlogSlug: "get-over-breakup-like-sociopath",
    failureBlogTitle: "How to Get Over a Breakup Like a Sociopath",
    endingLearnPrompt:
      "The rage ran. The room got smaller. The four-months detail bloomed into nine specific resentments. By 1:14 a.m. the body is wrecked, the head is full of arguments she will never hear, and tomorrow's gym is not happening because tonight took the bandwidth. Rage is the seductive costume of the same self-indulgence grief wears. The track will hold; the next window will be harder to honor; the discipline of L2-1 is the discipline of treating rage as grief in a costume, not as a separate, more productive thing.",
    dialog: [
      {
        speakerId: "inner-voice",
        text: "1:14 a.m. The whiskey was at 11. The Notes app has nine paragraphs and they are mostly the same paragraph.",
        emotion: "sad",
      },
    ],
    choices: [],
  },

  {
    id: "ending-chat-vent",
    backgroundId: "apartment",
    mood: "tense",
    isEnding: true,
    outcomeType: "bad",
    endingTitle: "The Group Chat Rally",
    failureBlogSlug: "narcissistic-hoovering-explained",
    failureBlogTitle: "Narcissistic Hoovering: When Your Ex Tries to Suck You Back In",
    endingLearnPrompt:
      "The chat ran for ninety minutes. Forty-three messages. Three of them are screenshots one of the boys took from her Instagram and reposted in the chat with commentary. The audit was outsourced to an audience. The audience confirmed every read, which felt like clarity and was actually a variable-ratio reward schedule, the same architecture the relationship was running on. Different machine, same dependency. Mute the chat before bed. The L3-2 level on this track will revisit the boys, with practice; tonight's lesson is that the chat is not the audit.",
    dialog: [
      {
        speakerId: "inner-voice",
        text: "Phone face-down, finally. Forty-three messages behind you. The room is unchanged. The feeling is unchanged.",
        emotion: "sad",
      },
    ],
    choices: [],
  },
];

export const afterHer21: Scenario = {
  id: "after-her-2-1",
  title: "The Thirty Minutes",
  tagline:
    "8 p.m. The timer. Inside the window: grief and rage in the same box. Outside the window: gym, dinner, the day.",
  description:
    "After-Her L2-1. The first attempt at boxed feeling, with the male-track structural twist: grief and rage are the same energy at different temperatures. Both go in the window. Neither stays on tap. The trap is rage at minute twelve leaking outward through the group chat. The discipline is the pen test: if the artefact would be deleted at the bell, it is inside the window. If it would be saved, it is routing toward send.",
  tier: "premium",
  track: "after-her",
  level: 2,
  order: 1,
  estimatedMinutes: 9,
  difficulty: "intermediate",
  category: "self-regulation",
  xpReward: 360,
  startSceneId: "the-timer",
  prerequisites: ["after-her-1-2"],
  tacticsLearned: [
    "Schedule grief AND rage. Same window. One budget.",
    "Rage at minute twelve is sadness in a louder costume.",
    "The pen test: write inside the window, delete at the bell.",
    "The group chat is not the audit. It is the gasoline.",
    "The gym is part of L4, not a substitute for the window.",
  ],
  redFlagsTaught: [
    "Rage as 'agency' (it is the schedule)",
    "The Notes draft saved 'for later' that gets sent at 1 a.m.",
    "The group chat rally as outsourced audit",
    "The gym as substitute for processing",
    "The five-more-minutes that renegotiates the contract",
  ],
  characters: [INNER_VOICE_M],
  scenes,
  isNew: true,
};

export default afterHer21;
