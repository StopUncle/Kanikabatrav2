/**
 * after-her-1-1, "The Unsent Text"
 *
 * After-Her track, Level 1, order 1. Voice-lock for the new track.
 * 11:47 p.m. The night she ended it. The text has two paragraphs.
 * The first is anger. The second is collapse. The order is the tell.
 * Neither will land the way he wants it to.
 *
 * Register: matches the male-dating track. Tactical inner voice, terse,
 * frame-aware. Interior scene only; she never appears. The absence is
 * the antagonist. The discipline of L1 on this track is admitting,
 * before the first move, that she did not blindside him. He stopped
 * looking. The first sentence aloud, or unsent, is the consequence of
 * that admission.
 *
 * Teaches:
 *  - The two-paragraph structure (rage, then collapse) confirms the
 *    intelligence failure rather than disguising it. He does not get
 *    to send a version of himself that retains its frame tonight.
 *  - The anger paragraph, sent, becomes a screenshot in a group chat
 *    he cannot see. The collapse paragraph, sent, becomes a story
 *    her sister will retell with the wrong inflection.
 *  - There is no version of this message that does not lower his
 *    frame further than the breakup already did.
 *  - The discipline of not sending is the first costly signal of the
 *    track, and the only one in his control tonight.
 *
 * Voice: terse, decision-led, low affect. Kanika at the level break.
 * No em dashes (per CLAUDE.md).
 */

import type { Scenario, Scene } from "../../types";
import { INNER_VOICE_M } from "../../characters-male";

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
        text: "11:47 p.m. Your apartment. She left at 6:14 with the dog and the suitcase she had apparently packed sometime between Monday and now. The kettle has not been used. The lights are still on the bright setting from when she came to talk.",
      },
      {
        speakerId: null,
        text: "The text is open. Two paragraphs. The first paragraph is anger. The second paragraph, four lines of white space below it, is collapse. You wrote them in that order. You did not plan to write the second one. You watched yourself type it.",
      },
      {
        speakerId: "inner-voice",
        tone: "tactical",
        text: "The order is the tell. Anger, then collapse, in the same draft, on the same screen. Either one alone would be a man losing his frame. Both, together, is a man admitting he never had it tonight.",
        emotion: "knowing",
      },
      {
        speakerId: "inner-voice",
        tone: "tactical",
        text: "She did not blindside you. She had a list. She had been planning it for four months. The first discipline is admitting that. The second discipline is putting the phone down.",
        emotion: "serious",
      },
    ],
    choices: [
      {
        id: "delete-both",
        text: "Select all. Delete both paragraphs. Close the app. Phone face-down on the counter.",
        tactic: "The clean move. The text never gets sent in either register. The send was always the worse option than the silence; you do not need to choose between rage and collapse if you choose neither. The frame you recover by not sending is the only frame you control tonight.",
        nextSceneId: "the-floor",
        isOptimal: true,
        event: "optimal-with-grace",
      },
      {
        id: "send-the-anger",
        text: "Delete the collapse paragraph. Send the anger paragraph. She should know what she did.",
        tactic: "The anger paragraph is a screenshot in her group chat by morning. Three women will read it before she has finished her coffee. The version of you she will narrate at brunches for the next year was authored tonight, by you, in one paragraph, sent at 11:51 p.m.",
        nextSceneId: "the-anger-sent",
        isOptimal: false,
      },
      {
        id: "send-the-collapse",
        text: "Delete the anger paragraph. Send the collapse paragraph. She should know it landed.",
        tactic: "The collapse paragraph is the one that gets retold with the wrong inflection. Her sister will read it. Her sister will phrase it kindly, which is worse than phrasing it cruelly. The collapse, sent, will become a story about how she had to leave because you could not hold yourself together.",
        nextSceneId: "the-collapse-sent",
        isOptimal: false,
      },
      {
        id: "send-both",
        text: "Send both. Let her read them in the order you wrote them. She gets the whole picture.",
        tactic: "Sending both is delivering, in one notification, the precise intelligence failure she ended the relationship over. The text confirms, in two paragraphs, exactly what she suspected, that the man she lived with cannot read the room he is sitting in. There is no version of this send that does not validate her list.",
        nextSceneId: "the-double-send",
        isOptimal: false,
      },
    ],
  },

  // ===================================================================
  // THE ANGER SENT (failure branch)
  // ===================================================================
  {
    id: "the-anger-sent",
    backgroundId: "apartment",
    mood: "tense",
    presentCharacterIds: ["inner-voice"],
    dialog: [
      {
        speakerId: null,
        text: "Sent. The blue arrow. The checkmark. The grey. The Read 11:52 p.m.",
      },
      {
        speakerId: null,
        text: "No three dots. No reply. The phone sits on the duvet with the conversation thread still open.",
      },
      {
        speakerId: "inner-voice",
        tone: "tactical",
        text: "She read it. She did not respond. She is not going to. The next person who reads it is one of her three closest friends, on a screenshot, before 8 a.m.",
        emotion: "serious",
      },
    ],
    choices: [
      {
        id: "accept-anger-block",
        text: "Block the thread. Phone in the kitchen drawer. Accept that the send happened. Do not chase it.",
        tactic: "The cleanest version of the bad path. The anger is on her phone; the spiral is what you still hold. Block, move the phone, accept the cost, do not refresh, do not double-text.",
        nextSceneId: "ending-anger-contained",
        isOptimal: true,
      },
      {
        id: "double-text-apology",
        text: 'Send a follow-up. "I should not have sent that. I am sorry. That is not who I am."',
        tactic: "The apology is the collapse paragraph in a different costume. She now has both registers anyway, in two messages, six minutes apart, the second one written from the spiral the first one confirmed. The screenshot her friend takes tomorrow is now two messages tall.",
        nextSceneId: "ending-anger-then-apology",
        isOptimal: false,
      },
    ],
  },

  // ===================================================================
  // THE COLLAPSE SENT (failure branch)
  // ===================================================================
  {
    id: "the-collapse-sent",
    backgroundId: "apartment",
    mood: "tense",
    presentCharacterIds: ["inner-voice"],
    dialog: [
      {
        speakerId: null,
        text: "Sent. Read 11:53 p.m. Three dots, for four seconds. Then nothing.",
      },
      {
        speakerId: "inner-voice",
        tone: "tactical",
        text: "She typed something. She deleted it. Of the three things she could have done with the collapse, that was the worst one. Now you will spend the next four nights imagining the sentence she chose not to send.",
        emotion: "serious",
      },
      {
        speakerId: "inner-voice",
        tone: "tactical",
        text: "Her sister will read this one. The kindness in her sister's retelling is the cost. Cruelty would be easier to throw away.",
        emotion: "knowing",
      },
    ],
    choices: [
      {
        id: "accept-collapse-block",
        text: "Block the thread. Phone in the drawer. The collapse is on her phone. Containment is the only move left.",
        tactic: "The cleanest version of this bad path. The collapse exists; the spiral is the part you still hold. Block, move the phone, sit with it, sleep when you can.",
        nextSceneId: "ending-collapse-contained",
        isOptimal: true,
      },
      {
        id: "collapse-followup-please",
        text: 'Send a follow-up. "I just need to know it mattered. Can you say something."',
        tactic: "The follow-up is begging for a reply she has already decided not to give. The next message you send tonight will be the third. By 1 a.m. there will be six. By morning there will be a thread she can show her sister without commentary.",
        nextSceneId: "ending-collapse-then-please",
        isOptimal: false,
      },
    ],
  },

  // ===================================================================
  // BOTH SENT (worst branch)
  // ===================================================================
  {
    id: "the-double-send",
    backgroundId: "apartment",
    mood: "tense",
    isEnding: true,
    outcomeType: "bad",
    endingTitle: "Both Paragraphs",
    failureBlogSlug: "get-over-breakup-like-sociopath",
    failureBlogTitle: "How to Get Over a Breakup Like a Sociopath",
    endingLearnPrompt:
      "Both paragraphs, in the order written, in one send, at 11:51 p.m., on the night she left. The text confirms, in two registers, exactly what her four-month list was about. Tomorrow it is a screenshot. By next weekend it is the story she tells the new person at the party. The send was not the failure; the failure was the four months of not noticing she was leaving. The send was the final readout of that failure, delivered to her phone, time-stamped. The track teaches the discipline that makes this send unthinkable in three months. Tonight, you wrote the artefact she will use to tell the story she was already telling.",
    dialog: [
      {
        speakerId: "inner-voice",
        text: "Read 11:51 p.m. No three dots. The phone goes dark on the duvet on its own.",
        emotion: "sad",
      },
    ],
    choices: [],
  },

  // ===================================================================
  // GOOD ENDING
  // ===================================================================
  {
    id: "the-floor",
    backgroundId: "apartment",
    mood: "peaceful",
    isEnding: true,
    outcomeType: "good",
    endingTitle: "The Floor Held",
    endingLearnPrompt:
      "Silence is the floor of every other tactic in this track. The unsent text is the first time you choose it. Both paragraphs are gone. Tomorrow you will not remember which sentence came second in the anger draft; by Friday you will not remember writing it. The send was the leash, and the delete is the cut. There is no closure inside the message. There is no version of this paragraph, in either register, that delivers what you are reaching for. Closure is what grows over the wound, by accident, on a Tuesday afternoon, eventually. The discipline that lets it grow is the one you just held. She did not blindside you. You stopped looking. The looking starts again now, and the first thing to look at is the kitchen, the lights still on bright, the kettle that never boiled.",
    dialog: [
      {
        speakerId: "inner-voice",
        text: "Phone face-down on the counter. Lights to dim. Kettle on. The text is gone. The next two hours are loud and the next two hours are also yours.",
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
  // ANGER-CONTAINED (neutral)
  // ===================================================================
  {
    id: "ending-anger-contained",
    backgroundId: "apartment",
    mood: "cold",
    isEnding: true,
    outcomeType: "neutral",
    endingTitle: "Anger, Contained",
    endingLearnPrompt:
      "The anger paragraph is on her phone. The screenshot is a question of when, not if. Blocking the thread tonight is not the same as not sending; it is the move that recovers the silence the send cost you, the silence that will become the runway for everything the track teaches next. The track does not punish this ending. It records it. The discipline that makes the send unthinkable is the discipline of the next five levels. Tonight, the containment was the most you could do.",
    dialog: [
      {
        speakerId: "inner-voice",
        text: "Phone in the kitchen drawer. The anger is on her phone. The spiral is contained. The cost is bounded.",
        emotion: "serious",
      },
    ],
    choices: [],
  },

  // ===================================================================
  // ANGER + APOLOGY (worse than anger alone)
  // ===================================================================
  {
    id: "ending-anger-then-apology",
    backgroundId: "apartment",
    mood: "tense",
    isEnding: true,
    outcomeType: "bad",
    endingTitle: "Anger, then Apology",
    failureBlogSlug: "get-over-breakup-like-sociopath",
    failureBlogTitle: "How to Get Over a Breakup Like a Sociopath",
    endingLearnPrompt:
      "The apology that follows the anger is the collapse paragraph in a different costume. She now has both registers anyway, sent six minutes apart, the second one written from inside the spiral the first one created. The screenshot tomorrow is two messages tall. The first message says you cannot hold your frame. The second message says you cannot hold your frame and also know that you cannot. Sending one message you regret is a bad night. Sending two is a story she tells her friends with no commentary needed.",
    dialog: [
      {
        speakerId: "inner-voice",
        text: "Two read receipts. Two grey timestamps. The thread is closed on her end and open on yours.",
        emotion: "sad",
      },
    ],
    choices: [],
  },

  // ===================================================================
  // COLLAPSE-CONTAINED (neutral)
  // ===================================================================
  {
    id: "ending-collapse-contained",
    backgroundId: "apartment",
    mood: "cold",
    isEnding: true,
    outcomeType: "neutral",
    endingTitle: "Collapse, Contained",
    endingLearnPrompt:
      "The collapse paragraph is on her phone. Her sister will read it. The kindness in the retelling will be the part that lingers; cruelty would have been easier to throw away. Blocking the thread tonight is the move that bounds the cost. The track does not punish this ending; it records it. The next five levels are the discipline that makes the collapse paragraph an artefact you would not have generated in the first place. Tonight, the containment was the most you could do.",
    dialog: [
      {
        speakerId: "inner-voice",
        text: "Phone in the drawer. The collapse is on her phone. The cost is real and the cost is also bounded.",
        emotion: "serious",
      },
    ],
    choices: [],
  },

  // ===================================================================
  // COLLAPSE + PLEASE (worst single-register failure)
  // ===================================================================
  {
    id: "ending-collapse-then-please",
    backgroundId: "apartment",
    mood: "tense",
    isEnding: true,
    outcomeType: "bad",
    endingTitle: "The Reply She Will Not Give",
    failureBlogSlug: "narcissistic-hoovering-explained",
    failureBlogTitle: "Narcissistic Hoovering: When Your Ex Tries to Suck You Back In",
    endingLearnPrompt:
      "Begging for a reply she has already decided not to give is the slot machine starting up. Each unanswered message increases the probability you send the next one, because variable-ratio reinforcement is at its strongest when the reward is uncertain. By 1 a.m. the thread is six messages long. By morning it is a document. The track teaches the discipline that interrupts the schedule before it begins. Tonight, the schedule began. The recovery is to delete the app from the phone tomorrow, and to start L1-2, the audit, before noon.",
    dialog: [
      {
        speakerId: "inner-voice",
        text: "Three messages now. The fourth one is half-typed. The half-typed one is the one you will remember as the moment it tipped.",
        emotion: "sad",
      },
    ],
    choices: [],
  },
];

export const afterHer11: Scenario = {
  id: "after-her-1-1",
  title: "The Unsent Text",
  tagline:
    "11:47 p.m. Two paragraphs. The first is anger. The second is collapse. The order is the tell.",
  description:
    "After-Her voice-lock. The night she left. The text has two paragraphs, anger then collapse, written in that order. Either alone is a man losing his frame; both together is a man admitting he never had it tonight. The scenario teaches the first discipline of the track: there is no version of this message, in either register, that does not validate the four-month list she ended the relationship over. Silence is the floor. The send resets it to zero.",
  tier: "premium",
  track: "after-her",
  level: 1,
  order: 1,
  estimatedMinutes: 9,
  difficulty: "intermediate",
  category: "self-regulation",
  xpReward: 320,
  startSceneId: "the-notes-app",
  tacticsLearned: [
    "Delete both paragraphs. Either register sent alone is a screenshot tomorrow.",
    "The follow-up apology after the anger is the collapse paragraph in a different costume.",
    "Begging for a reply after the collapse paragraph starts the variable-ratio schedule the rest of the track has to interrupt.",
    "She did not blindside you. The first discipline is admitting that, not the send.",
    "The frame recovered by not sending is the only frame you control tonight.",
  ],
  redFlagsTaught: [
    "The two-paragraph draft (rage, then collapse) as the intelligence failure rendered in text",
    "The anger paragraph as a future screenshot in her group chat",
    "The collapse paragraph as a story her sister will retell kindly, which is the cost",
    "The double-text apology as the second message that confirms the first",
    "The 'just say something' follow-up as the slot machine starting",
  ],
  characters: [INNER_VOICE_M],
  scenes,
  isNew: true,
};

export default afterHer11;
