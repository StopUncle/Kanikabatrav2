/**
 * after-him-5-2, "The Run-In"
 *
 * After-Him L5-2. Saturday afternoon, week ten. The cafe two streets
 * from your flat. You go in for the same flat white you have been
 * ordering for four years. He is at the corner table by the window.
 *
 * The teaching is the readout. The discipline of L4-1 (the run that
 * no one saw) was the work; this is the scene where the work meets the
 * world and the work is supposed to be cheap to demonstrate because
 * it was done in private. Performing indifference is observable;
 * performing nothing is the move.
 *
 * Teaches:
 *  - The brief nod. Finish your coffee. Do not leave the cafe.
 *  - Performed indifference is the tell. It betrays you noticed.
 *  - The cafe is the readout; the work was done in private.
 *  - The accident is not necessarily an accident.
 */

import type { Scenario, Scene } from "../../types";
import { INNER_VOICE, THE_EX_HIM } from "../../characters";

const scenes: Scene[] = [
  {
    id: "the-doorway",
    backgroundId: "apartment",
    mood: "tense",
    presentCharacterIds: ["the-ex-him", "inner-voice"],
    dialog: [
      {
        speakerId: null,
        text: "Saturday, 11:42 a.m. Week ten. The cafe two streets from your flat, the one with the green awning, the one you have been ordering the flat white at since before he existed.",
      },
      {
        speakerId: null,
        text: "He is at the corner table by the window. He has cut his hair differently. He has not seen you yet. The barista is making someone's drink in the foreground. You have eight seconds before he looks up.",
      },
      {
        speakerId: "inner-voice",
        tone: "tactical",
        text: "Is this an accident, or is this a Wednesday on his calendar. He knows you have been coming here for four years. He could have looked up the rota of your weekend habits in any of a hundred ways. The accident is, structurally, possible and also not necessarily.",
        emotion: "knowing",
      },
      {
        speakerId: "inner-voice",
        tone: "tactical",
        text: "The work of L4-1 was done in private. The work compounds privately. The cafe is the readout. Do nothing observable. Do not flee. Do not perform.",
        emotion: "knowing",
      },
    ],
    choices: [
      {
        id: "order-and-stay",
        text: "Walk to the counter. Order the flat white. Brief nod if he looks up. Sit at the second-favourite table. Finish your coffee.",
        tactic: "The clean move. The cafe was yours before it was the couple's; the cafe is yours after the couple. The brief nod is the courtesy that costs you nothing. The sitting is the readout. The L4-1 work was in private; this scene is the public proof, and the proof costs nothing to demonstrate because the work is already in your body.",
        nextSceneId: "the-corner-table",
        isOptimal: true,
        event: "optimal-with-grace",
      },
      {
        id: "leave-the-cafe",
        text: "Turn. Walk out. The other cafe is three streets the other way.",
        tactic: "The leaving is observable. He saw you. The leaving is performed indifference, which is the same thing as performed presence: it announces that the encounter mattered. The cost is the cafe; you will now spend the next month avoiding it; the cafe was yours and is now operationally his because you ceded the doorway.",
        nextSceneId: "ending-cafe-ceded",
        isOptimal: false,
      },
      {
        id: "approach-directly",
        text: "Walk to his table. 'Hey. Weird seeing you here.'",
        tactic: "The approach is the L1-1 unsent text in conversational form. He will be pleasant. He will be calibrated. The scene is the cafe and the conversation that was always going to be the conversation; the L5-1 boss closed cleanly will mean nothing if L5-2 reopens the channel face-to-face.",
        nextSceneId: "the-approach",
        isOptimal: false,
      },
      {
        id: "perform-indifference",
        text: "Walk to the counter. Order louder than usual. Make a joke with the barista. Do not look at him.",
        tactic: "Performing indifference is observable, which is the tell that the indifference is performed. The barista is now part of the audience. The cost is the small flag in his head that you noticed and decided to demonstrate not-noticing, which is the same as noticing.",
        nextSceneId: "ending-performed",
        isOptimal: false,
      },
    ],
  },

  {
    id: "the-corner-table",
    backgroundId: "apartment",
    mood: "peaceful",
    presentCharacterIds: ["the-ex-him", "inner-voice"],
    dialog: [
      {
        speakerId: null,
        text: "Flat white in hand. Second-favourite table by the window, two tables down from the corner. You take out the book. You open to the page you stopped at on Thursday at the kitchen counter.",
      },
      {
        speakerId: null,
        text: "He looked up when you walked in. You nodded. He nodded. The exchange was sub-second. Neither of you has spoken since. He is back to his laptop. You are back to your book.",
      },
      {
        speakerId: "inner-voice",
        tone: "tactical",
        text: "The L1-2 audit closed his old number. The L5-1 boss closed the new number. This scene is the body in the same room as him, in public, with no further channel available to him. The readout is operational: the body is doing what the body does, which is the book and the coffee.",
        emotion: "knowing",
      },
    ],
    choices: [
      {
        id: "finish-and-leave-natural",
        text: "Finish the coffee at the pace you would have finished it on any Saturday. Leave when you would have left. Brief nod again on the way out.",
        tactic: "The clean close. The cafe was used the way the cafe is used. The scene is over. The L5-2 readout lands: the body did what the body does. The work compounded privately; the public proof was cheap.",
        nextSceneId: "ending-cafe-held",
        isOptimal: true,
      },
      {
        id: "leave-early",
        text: "Drink the coffee faster than usual. Leave in nineteen minutes instead of forty.",
        tactic: "The faster pace is observable. The minute hand on the wall over the counter is a clock he is also reading. Leaving early performs the discomfort the discipline of L4-1 was supposed to make obsolete. Cost: small but real, the proof of work weakens.",
        nextSceneId: "ending-early-exit",
        isOptimal: false,
      },
      {
        id: "stay-too-long",
        text: "Stay until he leaves. Outlast him. You are not the one who leaves.",
        tactic: "Outlasting is also performance. The cafe is now a test instead of a cafe. The performance is the same in either direction; the cost is the cafe converting from a place to a stage.",
        nextSceneId: "ending-outlasted",
        isOptimal: false,
      },
    ],
  },

  {
    id: "the-approach",
    backgroundId: "apartment",
    mood: "tense",
    presentCharacterIds: ["the-ex-him", "inner-voice"],
    dialog: [
      {
        speakerId: "the-ex-him",
        emotion: "neutral",
        text: 'Hey. Yeah, weird. I was just. How are you.',
      },
      {
        speakerId: "inner-voice",
        tone: "tactical",
        text: "The conversation is now happening. He will be pleasant. He will be calibrated. He will, by minute four, ask if you want to get coffee properly soon. The L5-1 boss is reopening through the face-to-face channel.",
        emotion: "serious",
      },
    ],
    choices: [
      {
        id: "close-quickly",
        text: '"Yeah. Doing well. Have a good one." Smile. Walk to the counter to order.',
        tactic: "Late but recoverable. The hello happened; the close is fast; the conversation does not extend. The cost is the four sentences are now on the record between you, but the channel does not open further. Go sit at the second-favourite table after. Finish the coffee.",
        nextSceneId: "the-corner-table",
        isOptimal: true,
      },
      {
        id: "sit-down-with-him",
        text: 'Pull out the chair across from him.',
        tactic: "The sit-down is the L5-1 warm reply in physical form. The eight weeks of work, all of L1 through L4, are being tested at the chair. The next forty minutes are the cafe version of the call from L5-1. The track will play the six weeks from L5-1.",
        nextSceneId: "ending-sat-down",
        isOptimal: false,
      },
    ],
  },

  // Endings
  {
    id: "ending-cafe-held",
    backgroundId: "apartment",
    mood: "peaceful",
    isEnding: true,
    outcomeType: "good",
    endingTitle: "The Flat White, Held",
    endingLearnPrompt:
      "The cafe was used the way the cafe is used. Forty minutes, a book, the flat white, the second-favourite table. The brief nod on the way in and on the way out. The body did what the body does because the work was already in the body. The L5-2 readout lands: the public proof of L4-1 cost you nothing because L4-1 was done in private. The cafe remains yours. The scene closes with the door of the cafe behind you and the Saturday continuing as a Saturday.",
    dialog: [
      {
        speakerId: "inner-voice",
        text: "Door of the cafe at 12:24. Cold air. The Saturday returns. The cafe is still the cafe.",
        emotion: "knowing",
      },
      {
        speakerId: "inner-voice",
        tone: "tactical",
        text: "Work in private; readout in public; cost nothing.",
        emotion: "knowing",
      },
    ],
    choices: [],
  },

  {
    id: "ending-cafe-ceded",
    backgroundId: "apartment",
    mood: "tense",
    isEnding: true,
    outcomeType: "bad",
    endingTitle: "The Cafe, Ceded",
    failureBlogSlug: "get-over-breakup-like-sociopath",
    failureBlogTitle: "How to Get Over a Breakup Like a Sociopath",
    endingLearnPrompt:
      "The cafe was yours before the couple and is now operationally his. The leaving was the observable performance of the encounter mattering. The cost is the next month of routing around the cafe, which is a small permanent rerouting of your Saturday morning. The L4-1 work was done in private and was, in this scene, refused at the doorway. Tomorrow's first move: go back to the cafe at a different hour and reclaim it. The cafe is yours.",
    dialog: [
      {
        speakerId: "inner-voice",
        text: "Walking the other way. The other cafe is three streets the other way and the flat white is, technically, the same flat white. Technically.",
        emotion: "sad",
      },
    ],
    choices: [],
  },

  {
    id: "ending-performed",
    backgroundId: "apartment",
    mood: "tense",
    isEnding: true,
    outcomeType: "bad",
    endingTitle: "The Loud Order",
    failureBlogSlug: "get-over-breakup-like-sociopath",
    failureBlogTitle: "How to Get Over a Breakup Like a Sociopath",
    endingLearnPrompt:
      "The performance was visible. The barista noticed. He noticed. The performance announced that the encounter mattered. The cost is small but real; the cafe is still yours but the scene's readout was the opposite of L4-1's private work, which is that the work needs to be performed in public. The next encounter, if there is one, the readout is doing nothing. Doing nothing is the move. The barista will, by next week, not remember the joke.",
    dialog: [
      {
        speakerId: "inner-voice",
        text: "Counter. Coffee. Joke. The minute hand on the wall is a clock he is also reading.",
        emotion: "sad",
      },
    ],
    choices: [],
  },

  {
    id: "ending-early-exit",
    backgroundId: "apartment",
    mood: "cold",
    isEnding: true,
    outcomeType: "neutral",
    endingTitle: "The Faster Coffee",
    endingLearnPrompt:
      "The coffee was finished in nineteen minutes instead of forty. The pace was observable. The book stayed open at the same page for fifteen of those nineteen. The scene's readout is, partially, that the encounter cost you something; the L4-1 work survives but is, in this specific scene, lightly disturbed. Next Saturday's coffee is at the same cafe at the same table for forty minutes. The discipline returns at the next opportunity.",
    dialog: [
      {
        speakerId: "inner-voice",
        text: "Door of the cafe at 12:03. The pace was observable. The cafe is still yours.",
        emotion: "serious",
      },
    ],
    choices: [],
  },

  {
    id: "ending-outlasted",
    backgroundId: "apartment",
    mood: "cold",
    isEnding: true,
    outcomeType: "neutral",
    endingTitle: "The Outlasting",
    endingLearnPrompt:
      "You stayed until he left. The cafe was a test that you, technically, won. The cost is the cafe converted, for the duration of the test, from a place to a stage. The L4-1 work survives but the readout was, in this scene, the wrong shape: the body was performing, in stillness, the same thing the loud order would have performed in motion. Next Saturday: the pace is the pace you would have used on any Saturday.",
    dialog: [
      {
        speakerId: "inner-voice",
        text: "Door at 1:14. He left at 1:08. The cafe is, again, just a cafe.",
        emotion: "serious",
      },
    ],
    choices: [],
  },

  {
    id: "ending-sat-down",
    backgroundId: "apartment",
    mood: "tense",
    isEnding: true,
    outcomeType: "bad",
    endingTitle: "The Chair",
    failureBlogSlug: "narcissistic-hoovering-explained",
    failureBlogTitle: "Narcissistic Hoovering: When Your Ex Tries to Suck You Back In",
    endingLearnPrompt:
      "The chair was pulled out. The conversation happened. By minute four he asked about coffee properly soon. By minute seven you said maybe. The L5-1 boss has reopened through the face-to-face channel. The next six weeks are now likely. The L4-1 and L4-2 work survives in the body; the scene's choice has overridden the structural protections the scenes were building. Tomorrow's first move is to text him 'sorry, no, please leave me alone' and block the original number; if a new number arrives, the L5-1 boss runs again, with the body knowing this time what is at the corner table by the window.",
    dialog: [
      {
        speakerId: "inner-voice",
        text: "Coffee in hand at the same table. His cut hair. His laptop closed. The chair, pulled out.",
        emotion: "sad",
      },
    ],
    choices: [],
  },
];

export const afterHim52: Scenario = {
  id: "after-him-5-2",
  title: "The Run-In",
  tagline:
    "Saturday, the cafe with the green awning. He is at the corner table. The work was done in private; this is the public proof.",
  description:
    "After-Him L5-2. The second hoover landing, in physical space. The teaching is that the L4-1 work was the substance; this scene is the readout, and the readout is cheap to deliver because the work is already in the body. Performed indifference is observable; performing nothing is the move. The cafe was yours before the couple; ceding the doorway is the loss. Sitting down at his table is the L5-1 warm reply in three dimensions.",
  tier: "vip",
  track: "after-him",
  level: 5,
  order: 2,
  estimatedMinutes: 10,
  difficulty: "advanced",
  category: "narcissist",
  xpReward: 460,
  startSceneId: "the-doorway",
  prerequisites: ["after-him-5-1"],
  tacticsLearned: [
    "Brief nod. Finish the coffee. Leave at the natural pace.",
    "The cafe was yours before the couple. The cafe is yours after.",
    "Performed indifference is observable. Performing nothing is the move.",
    "The fast exit and the outlasting are the same performance in different directions.",
    "The chair pulled out is the L5-1 warm reply in three dimensions.",
  ],
  redFlagsTaught: [
    "The 'accident' that is, structurally, a Wednesday on his calendar",
    "The loud order with the barista as audience for the performed indifference",
    "The cafe ceded as small permanent rerouting of your Saturday",
    "The outlasting as the same performance in stillness",
    "The 'maybe' to coffee properly soon as the door opening four sentences late",
  ],
  characters: [INNER_VOICE, THE_EX_HIM],
  scenes,
  isNew: true,
};

export default afterHim52;
