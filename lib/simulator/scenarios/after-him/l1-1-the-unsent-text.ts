/**
 * after-him-1-1, "The Unsent Text"
 *
 * After-Him track, Level 1, order 1. Voice-lock for the new track.
 * The night of the breakup. 11:47 p.m. The Notes app is open. Forty-three
 * minutes of typing. The paragraph began as an apology and pivoted to an
 * indictment by sentence three. The cursor is at the end. The send button
 * is one tap away.
 *
 * Register: closer to loving-mira than to divorce-arc, warm prose with
 * sharp teeth. Kanika's voice from her own breakup post, operationalised
 * into one decision. Interior scene only; the ex never appears. The
 * absence is the antagonist.
 *
 * Teaches:
 *  - The unsent text is the floor of every other tactic in the track.
 *    The send resets the silence to zero. The silence is the runway.
 *  - The re-read is the gateway drug. Re-reading the paragraph is the
 *    rehearsal for sending it.
 *  - Saving "for later" is not closure; it is the leash you tie to
 *    your own wrist before sleep.
 *  - The closure she is reaching for is not in the message; it grows
 *    over the wound, by accident, on a Tuesday, eventually.
 *
 * Voice: Kanika in italics between beats. Inner voice tactical.
 * No em dashes (per CLAUDE.md).
 */

import type { Scenario, Scene } from "../../types";
import { INNER_VOICE } from "../../characters";

const scenes: Scene[] = [
  // ===================================================================
  // OPENING
  // ===================================================================
  {
    id: "the-notes-app",
    backgroundId: "apartment",
    mood: "cold",
    presentCharacterIds: ["inner-voice"],
    dialog: [
      {
        speakerId: null,
        text: "11:47 p.m. Your apartment. The kettle clicked off twenty minutes ago and you have not made the tea. Your phone is face-up on the duvet. The Notes app is open. The paragraph is forty-three minutes old.",
      },
      {
        speakerId: null,
        text: "It began as an apology. By sentence three it had pivoted, on its own, to an indictment. You did not plan the pivot. You watched it happen. The cursor is now at the end of a sentence that reads, in your own voice but somehow not in your own voice, you owe me at least the courtesy of a real reason.",
      },
      {
        speakerId: "inner-voice",
        tone: "tactical",
        text: "The paragraph is doing what the conversation could not do. It is asking him to deliver the reason he chose not to deliver. It is also pretending to be calm.",
        emotion: "knowing",
      },
      {
        speakerId: "inner-voice",
        tone: "tactical",
        text: "He will not deliver the reason. He did not deliver it at the coffee. He did not deliver it in the two weeks before the coffee. He is not going to deliver it at 11:47 p.m. on a Tuesday because you typed three paragraphs at him.",
        emotion: "knowing",
      },
      {
        speakerId: null,
        text: "The send button is at the top right of the screen. A blue arrow on a blue background, slightly darker.",
      },
    ],
    choices: [
      {
        id: "delete-without-reread",
        text: "Select all. Delete. Close the app. Put the phone face-down on the bedside table.",
        tactic: "The clean move. The paragraph never gets re-read. The re-read is the rehearsal for the send. Deleting without re-reading is the only version of this choice that does not contain the seed of the next attempt.",
        nextSceneId: "the-floor",
        isOptimal: true,
        event: "optimal-with-grace",
      },
      {
        id: "send-it",
        text: "Tap send. He should know how this lands. If he reads it he reads it.",
        tactic: "The send is the floor giving out. He will read it. He will not respond, or he will respond with three words that confirm exactly what you suspected, which will be worse than the silence. The paragraph will exist on his phone, screenshottable, for the rest of your life.",
        nextSceneId: "the-send",
        isOptimal: false,
      },
      {
        id: "save-as-draft",
        text: 'Save it. Title the note "for him, do not send." Close the app.',
        tactic: "The save is the leash. The note is not closed; it is queued. You will open it at 2:14 a.m. when you cannot sleep. You will edit it. By Thursday it will be four paragraphs. By Saturday you will send a version of it that you have lost the calmness to audit.",
        nextSceneId: "the-saved-draft",
        isOptimal: false,
      },
      {
        id: "read-once-more",
        text: 'Read it one more time. Just to be sure of the tone. Then decide.',
        tactic: "The re-read is the gateway. Reading the paragraph again is rehearsing it in your mouth. The body learns the rhythm. The fingers learn the path to the send button. Each re-read makes the next re-read easier and the send shorter.",
        nextSceneId: "the-reread",
        isOptimal: false,
      },
    ],
  },

  // ===================================================================
  // THE RE-READ DERAIL (recoverable)
  // ===================================================================
  {
    id: "the-reread",
    backgroundId: "apartment",
    mood: "tense",
    presentCharacterIds: ["inner-voice"],
    dialog: [
      {
        speakerId: null,
        text: "You read it. The sentence about the courtesy of a real reason hits harder on the second pass than it did on the first. Sentence five, which you do not remember writing, contains the word always.",
      },
      {
        speakerId: "inner-voice",
        tone: "tactical",
        text: "The paragraph is now in your mouth. Your thumb has moved, without you, half an inch closer to the send button.",
        emotion: "knowing",
      },
      {
        speakerId: "inner-voice",
        tone: "tactical",
        text: "You can still recover. The re-read happened. The send has not. The recovery is to close the app right now, with the paragraph still on the screen, unsent.",
        emotion: "knowing",
      },
    ],
    choices: [
      {
        id: "reread-recover-delete",
        text: "Close the app without saving. The paragraph dies on screen-off.",
        tactic: "Late but clean recovery. The re-read cost you the cleanness of the first move; the deletion-via-screen-off lands the discipline anyway. Notes does not autosave a paragraph you never touched the save button on.",
        nextSceneId: "the-floor",
        isOptimal: true,
        event: "restraint-shown",
      },
      {
        id: "reread-spiral-send",
        text: "Tap send. The re-read sharpened it. He should read the sharpened version.",
        tactic: "The re-read became the rehearsal you predicted. The paragraph that was forty-three minutes old at 11:47 is now fifty-one minutes old, and angrier, and at his phone.",
        nextSceneId: "the-send",
        isOptimal: false,
      },
    ],
  },

  // ===================================================================
  // SAVED-AS-DRAFT (slow-burn failure)
  // ===================================================================
  {
    id: "the-saved-draft",
    backgroundId: "apartment",
    mood: "cold",
    isEnding: true,
    outcomeType: "bad",
    endingTitle: "The Leashed Draft",
    failureBlogSlug: "get-over-breakup-like-sociopath",
    failureBlogTitle: "How to Get Over a Breakup Like a Sociopath",
    endingLearnPrompt:
      "The saved draft is the leash you tie to your own wrist before sleep. You will open it at 2:14 a.m. You will edit it on Thursday. By Saturday it will be a version you cannot audit because you have lost the calmness of 11:47 p.m. on a Tuesday. The send, when it arrives, will arrive in the worst possible version of you. The clean move on the night of the breakup is to delete without re-reading. The note is not closed; it is queued. The track teaches the discipline of not queuing it.",
    dialog: [
      {
        speakerId: "inner-voice",
        text: 'The note is saved. The title is "for him, do not send." Both halves of the title are honest. Only one half is going to hold.',
        emotion: "serious",
      },
    ],
    choices: [],
  },

  // ===================================================================
  // THE SEND (immediate failure)
  // ===================================================================
  {
    id: "the-send",
    backgroundId: "apartment",
    mood: "tense",
    presentCharacterIds: ["inner-voice"],
    dialog: [
      {
        speakerId: null,
        text: "Sent. The blue arrow shrank into a checkmark and the checkmark turned grey and the grey turned to a small, faint, eventually, Read 11:51 p.m.",
      },
      {
        speakerId: null,
        text: "No reply.",
      },
      {
        speakerId: null,
        text: "11:53 p.m. No reply. 11:57 p.m. No reply. 12:04 a.m. Three dots appear. The three dots stay for nine seconds. The three dots disappear. No reply.",
      },
      {
        speakerId: "inner-voice",
        tone: "tactical",
        text: "He read it. He started to type. He stopped. Of the three responses you could have got tonight, that was the worst one. Now you will lie awake imagining the sentence he started and chose not to send.",
        emotion: "serious",
      },
    ],
    choices: [
      {
        id: "accept-send-block",
        text: "Block the thread. Put the phone in the drawer in the kitchen. The send happened. Containing the spiral is the only move left.",
        tactic: "The cleanest version of the bad path. The send is already on his phone; the spiral is what you still control. Block the thread, move the phone, accept the cost, do not refresh.",
        nextSceneId: "ending-sent-contained",
        isOptimal: true,
      },
      {
        id: "double-text",
        text: 'Send a second message. "I should not have sent that. I am sorry. Please ignore it."',
        tactic: "The double-text confirms, in three sentences, exactly the instability the first message was trying to deny. He will read both. He will screenshot both. The version of you he will narrate to his next girlfriend was authored by you, tonight, in two pieces.",
        nextSceneId: "ending-double-text",
        isOptimal: false,
      },
    ],
  },

  // ===================================================================
  // GOOD ENDING (delete or recovered re-read)
  // ===================================================================
  {
    id: "the-floor",
    backgroundId: "apartment",
    mood: "peaceful",
    isEnding: true,
    outcomeType: "good",
    endingTitle: "The Floor Held",
    endingLearnPrompt:
      "Silence is the floor of every other tactic in this track. The unsent text is the first time you choose it. The paragraph dies on screen-off. Tomorrow you will not remember exactly which sentence sentence three was; by Friday you will not remember writing it. The send was the leash and the delete is the cut. There is no closure inside the paragraph. There is no closure inside any message you could have written tonight. Closure is what grows over the wound, by accident, on a Tuesday, eventually. The discipline that lets it grow is the one you just held.",
    dialog: [
      {
        speakerId: "inner-voice",
        text: "Phone face-down. Lamp off. The paragraph is gone. Sleep is twenty minutes away and the twenty minutes are loud, and the twenty minutes are also yours.",
        emotion: "knowing",
      },
      {
        speakerId: "inner-voice",
        tone: "tactical",
        text: "The first night is the floor. The floor held.",
        emotion: "knowing",
      },
    ],
    choices: [],
  },

  // ===================================================================
  // SENT-CONTAINED (neutral)
  // ===================================================================
  {
    id: "ending-sent-contained",
    backgroundId: "apartment",
    mood: "cold",
    isEnding: true,
    outcomeType: "neutral",
    endingTitle: "Sent, Contained",
    endingLearnPrompt:
      "The send happened. The spiral was the part you could still hold. Blocking the thread tonight is not the same as not sending, but it is the only move left that recovers any of the silence the send cost you. Tomorrow you will know exactly what he read, and exactly what he started to type, and exactly that he chose not to finish it. That knowledge is not closure. The track will teach you, over the next five levels, the discipline that makes the send unthinkable. Tonight, the containment was the most you could do.",
    dialog: [
      {
        speakerId: "inner-voice",
        text: "Phone in the kitchen drawer. The send is on his phone. The spiral is contained. The cost is real and the cost is also bounded.",
        emotion: "serious",
      },
    ],
    choices: [],
  },

  // ===================================================================
  // DOUBLE-TEXT (worst ending)
  // ===================================================================
  {
    id: "ending-double-text",
    backgroundId: "apartment",
    mood: "tense",
    isEnding: true,
    outcomeType: "bad",
    endingTitle: "The Double-Text",
    failureBlogSlug: "get-over-breakup-like-sociopath",
    failureBlogTitle: "How to Get Over a Breakup Like a Sociopath",
    endingLearnPrompt:
      "Two messages, six minutes apart, on the night of a breakup, written from inside the spiral the first message confirmed. The version of you he narrates to the next person was authored tonight. Both messages exist now, screenshottable, indefinitely, in the worst possible context. The track does not punish you for this ending. It teaches you the discipline that makes it unthinkable in three months. The first discipline is the delete. The second is the block. The third is the silence, which is not an absence of action. It is the action.",
    dialog: [
      {
        speakerId: "inner-voice",
        text: "Two grey checkmarks. Read 12:08 a.m. No three dots this time. He has put the phone down. You are alone with the spiral and the spiral has now generated artefacts.",
        emotion: "sad",
      },
    ],
    choices: [],
  },
];

export const afterHim11: Scenario = {
  id: "after-him-1-1",
  title: "The Unsent Text",
  tagline:
    "11:47 p.m. Forty-three minutes in the Notes app. The send button is one tap away.",
  description:
    "After-Him voice-lock. The night of the breakup. The paragraph began as an apology and pivoted to an indictment by sentence three. The scenario teaches the floor of every other tactic in the track, the discipline of not sending, of not re-reading, of not saving for later. The unsent text is the first move. Closure is not inside the message. There is no version of this message that delivers what you want.",
  tier: "premium",
  track: "after-him",
  level: 1,
  order: 1,
  estimatedMinutes: 8,
  difficulty: "intermediate",
  category: "self-regulation",
  xpReward: 320,
  startSceneId: "the-notes-app",
  tacticsLearned: [
    "Delete without re-reading. The re-read is the rehearsal for the send.",
    "The saved draft is the leash. A note titled 'do not send' will be sent by Saturday.",
    "The double-text confirms in three sentences what the first message was trying to deny.",
    "Silence is the floor of every other tactic. The send resets it to zero.",
    "Closure does not live inside the message. There is no version of this paragraph that delivers it.",
  ],
  redFlagsTaught: [
    "The paragraph that pivots from apology to indictment without the writer's consent",
    "The re-read as gateway drug to the send",
    "The 'just save it for later' draft that ages into the worst possible version of you",
    "The three-dots-then-nothing reply that is worse than no reply",
    "The double-text as evidence the first message was right about you",
  ],
  characters: [INNER_VOICE],
  scenes,
  isNew: true,
};

export default afterHim11;
