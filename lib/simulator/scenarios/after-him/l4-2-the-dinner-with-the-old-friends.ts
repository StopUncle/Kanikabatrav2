/**
 * after-him-4-2, "The Dinner With The Old Friends"
 *
 * After-Him L4-2. Week eight. Dinner at Iman's flat with the three
 * friends from L3-2. One of them, at the end of the night, says: you
 * look different.
 *
 * The teaching is the response. Take it without elaboration. Do not
 * deflect, do not explain, do not make it about him. The audit is
 * private: would I want to date me now. If the answer is yes, the
 * signal is real. If you wonder whether he would notice, you are
 * still inside the experiment.
 *
 * Uses NAOMI again for continuity from L3-2. The scene is exterior,
 * the cast is the friends, the teaching is about how to receive a
 * costly signal in public without making it cheap.
 *
 * Teaches:
 *  - Take the compliment without elaboration.
 *  - Do not explain the run, the work, the change.
 *  - Do not make it about him.
 *  - The private audit: would I want to date me now.
 */

import type { Scenario, Scene } from "../../types";
import { INNER_VOICE, NAOMI } from "../../characters";

const scenes: Scene[] = [
  {
    id: "the-dinner",
    backgroundId: "apartment",
    mood: "peaceful",
    presentCharacterIds: ["naomi", "inner-voice"],
    dialog: [
      {
        speakerId: null,
        text: "Saturday, 10:38 p.m. Iman's flat in De Beauvoir. The table has been cleared, the second bottle of wine is two glasses in, the candle on the windowsill is doing the thing candles do at the end of the night. You have not mentioned him once in three hours.",
      },
      {
        speakerId: "naomi",
        emotion: "knowing",
        text: 'You look different. I have been trying to figure out what it is all night. Your face is, like. Calmer.',
      },
      {
        speakerId: "inner-voice",
        tone: "tactical",
        text: "The compliment is the readout. The eight weeks of private work are visible on the body. The decision is what to do with the visibility.",
        emotion: "knowing",
      },
    ],
    choices: [
      {
        id: "take-it-clean",
        text: 'Smile. "Thanks."',
        tactic: "The clean move. One word. The visibility is acknowledged and not narrated. Naomi does not need the inventory of what produced it; the body produced it, and the body is its own evidence. The compliment lands, the scene moves on, the conversation finds the next topic on its own.",
        nextSceneId: "the-scene-moves",
        isOptimal: true,
        event: "restraint-shown",
      },
      {
        id: "explain-the-runs",
        text: 'Lean in. "I have been running, actually, at 5:42 every other morning, the cold has been good, I think it is."',
        tactic: "The explanation is the leak. Naomi did not ask for the inventory; the inventory is being volunteered because the audit is reaching for an audience. The 5:42 a.m. specificity is, structurally, the same as the trailhead photo from L4-1: it documents the costly signal for the room. The signal becomes cheap in the explanation.",
        nextSceneId: "the-explanation",
        isOptimal: false,
      },
      {
        id: "make-it-about-him",
        text: 'Sigh. "It is just being out of the relationship. Honestly, you have no idea what."',
        tactic: "Making it about him gives him credit for the visible change. The body did the work; the framing gives him the credit. By tomorrow morning the council remembers the breakup as the cause, not the body's eight weeks as the cause. The version of you the council carries is now framed by him, again.",
        nextSceneId: "the-attribution",
        isOptimal: false,
      },
      {
        id: "deflect",
        text: 'Wave it off. "Oh, I look like a mess. I have not slept properly in weeks."',
        tactic: "The deflection is the small refusal of the eight weeks of work. Naomi is being told her observation is wrong. The body is being told its visibility is invisible. The deflection is its own performance; it asks the room to argue you back into accepting the compliment, which is the audit being run on Naomi instead of yourself.",
        nextSceneId: "the-deflection",
        isOptimal: false,
      },
    ],
  },

  {
    id: "the-scene-moves",
    backgroundId: "apartment",
    mood: "peaceful",
    presentCharacterIds: ["naomi", "inner-voice"],
    dialog: [
      {
        speakerId: "naomi",
        emotion: "happy",
        text: 'Anyway. Are we doing the thing next weekend at the bookshop? Iman, you said?',
      },
      {
        speakerId: "inner-voice",
        tone: "tactical",
        text: "The compliment landed and the scene moved. The room is talking about a bookshop event. The audit, the private one, runs underneath the conversation. The question is whether you would want to date you now.",
        emotion: "knowing",
      },
      {
        speakerId: "inner-voice",
        tone: "tactical",
        text: "The honest answer is something you produce while looking at the candle on the windowsill, half-listening to Iman, half not. The wonder whether he would notice does not arrive. The body is producing the answer from inside itself.",
        emotion: "knowing",
      },
    ],
    choices: [
      {
        id: "the-honest-yes",
        text: "Yes. The honest yes. The eight weeks built someone you would, currently, want to date. The wonder about him is, tonight, absent.",
        tactic: "The audit lands. The yes is private, not announced. The signal is real because the answer was produced by you for you. The body has rebuilt around the doing of the work, not around the seeing of the work. The next scene of the track is built on this.",
        nextSceneId: "ending-honest-yes",
        isOptimal: true,
      },
      {
        id: "the-honest-no",
        text: "Honest no. The eight weeks did the visible work; the audit at week eight says the man inside you who is doing the seeing is not yet someone you would date.",
        tactic: "Also a valid landing, also honest. The signal is real (Naomi saw it); the integration is partial. The next month is the month the audit becomes a yes. The body is ahead of the mind; the mind catches up by week twelve. The track records the honest no; the track holds.",
        nextSceneId: "ending-honest-no",
        isOptimal: true,
      },
      {
        id: "wonder-would-he-notice",
        text: "Honest, but the wonder arrives: would he notice. Would he, if he saw, notice.",
        tactic: "The wonder arriving at week eight is normal; the wonder being the dominant frequency is the tell that the audit is still happening with him in the room. The signal is real for him, not for you, which means it is cheap from inside even if it is costly from outside. The L5 boss will land harder. Note the wonder; do not act on it tonight.",
        nextSceneId: "ending-wonder-arrived",
        isOptimal: false,
      },
    ],
  },

  {
    id: "the-explanation",
    backgroundId: "apartment",
    mood: "tense",
    presentCharacterIds: ["naomi", "inner-voice"],
    dialog: [
      {
        speakerId: "naomi",
        emotion: "concerned",
        text: 'Oh wow, 5:42, that is intense. Like, every other morning? Are you doing OK actually, that is.',
      },
      {
        speakerId: "inner-voice",
        tone: "tactical",
        text: "The explanation read, to Naomi, as a symptom rather than a sign. She is asking if you are OK now. The signal you intended (look at the work) became, to her, a question (is she coping). The leak produced the opposite of what the eight weeks built.",
        emotion: "serious",
      },
    ],
    choices: [
      {
        id: "soften-recovery",
        text: 'Laugh. "I am fine, Nay. I just like it. Can we please talk about Iman\'s wallpaper for thirty seconds."',
        tactic: "Late recovery. The leak is closed with a redirect. Naomi will, on the way home, decide you are doing well, but the explanation has put a small worry-tag on the run regime that did not exist three minutes ago.",
        nextSceneId: "the-scene-moves",
        isOptimal: true,
      },
      {
        id: "double-down-self-narration",
        text: 'Lean in further. "No it is genuinely been transformative, the cold air, the discipline, the."',
        tactic: "The self-narration ossifies. The signal becomes a presentation. Naomi nods politely. Iman shifts in her chair. The eight weeks of unobserved work were just edited, in this conversation, into a TED talk in front of three friends. The performance is the leak.",
        nextSceneId: "ending-ted-talk",
        isOptimal: false,
      },
    ],
  },

  {
    id: "the-attribution",
    backgroundId: "apartment",
    mood: "tense",
    presentCharacterIds: ["naomi", "inner-voice"],
    dialog: [
      {
        speakerId: "naomi",
        emotion: "concerned",
        text: 'God, yeah. He was. I mean we have always said. The whole thing was.',
      },
      {
        speakerId: "inner-voice",
        tone: "tactical",
        text: "The attribution invited the council back into the L3-2 mode. Naomi has now started the museum sentence. The visible change, two seconds ago a costly signal, is now framed as a function of having left him. He has been put back at the centre of the change, by you, in front of the council.",
        emotion: "serious",
      },
    ],
    choices: [
      {
        id: "redirect-from-attribution",
        text: 'Cut it. "Anyway. Iman, the wallpaper. Talk to me. Why."',
        tactic: "Late recovery. The redirect closes the L3-2 reopening before the council can sharpen the museum further. Imperfect, partial; the moment is salvaged.",
        nextSceneId: "the-scene-moves",
        isOptimal: true,
      },
      {
        id: "let-council-rebuild",
        text: 'Nod. "Yeah. It is just. Such a relief, honestly."',
        tactic: "The council picks up where they left off in L3-2. The museum is added to. The version of him in their canon, which was paused in L3-2, is now updated with the visible-change-thanks-to-his-absence frame. The L5 boss lands into a council that has, since L3-2, only sharpened.",
        nextSceneId: "ending-museum-extended",
        isOptimal: false,
      },
    ],
  },

  {
    id: "the-deflection",
    backgroundId: "apartment",
    mood: "tense",
    presentCharacterIds: ["naomi", "inner-voice"],
    dialog: [
      {
        speakerId: "naomi",
        emotion: "concerned",
        text: 'No, listen, you do. You look really, actually, properly well. I am not just saying it.',
      },
      {
        speakerId: "inner-voice",
        tone: "tactical",
        text: "The deflection was refused. Naomi is now performing the work of arguing you back into accepting your own visible change. This is the audit running on her, not on you. She is the wrong addressee.",
        emotion: "knowing",
      },
    ],
    choices: [
      {
        id: "take-it-now",
        text: 'Smile. "OK. Thanks. I will take it."',
        tactic: "Late acceptance. The compliment lands, second attempt. Naomi did the heavy lifting; you allowed yourself to receive the readout. The signal is acknowledged. The lesson lands at three-quarter cost: next time, take it the first time.",
        nextSceneId: "the-scene-moves",
        isOptimal: true,
      },
      {
        id: "double-deflection",
        text: 'Wave again. "Nay, stop. I have not done anything special. It is the lighting in here."',
        tactic: "The second deflection is the closing of the door on the compliment. Naomi will not try a third time. The visible change exists; it has, tonight, been told it does not. The body learns that being seen produces refusal, which structurally feeds back to L4-1: the next run will have less weight, because the readout was refused.",
        nextSceneId: "ending-double-deflect",
        isOptimal: false,
      },
    ],
  },

  // Endings
  {
    id: "ending-honest-yes",
    backgroundId: "apartment",
    mood: "peaceful",
    isEnding: true,
    outcomeType: "good",
    endingTitle: "Yes",
    endingLearnPrompt:
      "The compliment was taken in one word. The conversation moved. The private audit produced an honest yes: at week eight, the version of you that the work built is someone the rest of you would, currently, want to date. The wonder whether he would notice did not arrive at the candle on the windowsill; the answer arrived without him in the frame. The signal is real, the costly signal is costly because it cost the post, and the audit is integrating with the body. L5 lands into a self that is not asking for confirmation from outside.",
    dialog: [
      {
        speakerId: "inner-voice",
        text: "12:18 a.m. Walk home in the cold. The yes runs in the body the way the run runs in the body. Quietly. Privately. With you.",
        emotion: "knowing",
      },
      {
        speakerId: "inner-voice",
        tone: "tactical",
        text: "The audit ran on you, not on the room.",
        emotion: "knowing",
      },
    ],
    choices: [],
  },

  {
    id: "ending-honest-no",
    backgroundId: "apartment",
    mood: "cold",
    isEnding: true,
    outcomeType: "good",
    endingTitle: "Not Yet",
    endingLearnPrompt:
      "The compliment was taken. The audit ran honestly: at week eight, the body has visibly rebuilt, the mind has not yet caught up to the body. The honest no is not a failure of the track; it is the structural lag between visible work and integrated identity. The next month is the month the audit becomes a yes. The body is leading; the mind is following. Both are doing the work at their own pace, which is the only honest version of week eight.",
    dialog: [
      {
        speakerId: "inner-voice",
        text: "Coat in the hall. Walk home in the cold. The not-yet is in the body too, like the yes would have been. The body knows the difference.",
        emotion: "knowing",
      },
    ],
    choices: [],
  },

  {
    id: "ending-wonder-arrived",
    backgroundId: "apartment",
    mood: "cold",
    isEnding: true,
    outcomeType: "neutral",
    endingTitle: "Would He Notice",
    endingLearnPrompt:
      "The compliment was taken in one word, the scene moved, the audit ran, and the dominant frequency was the wonder about him. The signal is real in the world (Naomi saw it) and partially cheap in the head (the wonder is the audience). The lesson lands at half cost. The L5 boss will land into a self that is still asking him to grade the work. Note the wonder, do not act on it tonight; Thursday's 5:42 run is a chance to teach the body that the run runs without the wonder, on a body that is the body, on a cold morning that is itself.",
    dialog: [
      {
        speakerId: "inner-voice",
        text: "Walk home in the cold. The wonder is in the head; the cold is in the lungs. The cold wins by morning.",
        emotion: "serious",
      },
    ],
    choices: [],
  },

  {
    id: "ending-ted-talk",
    backgroundId: "apartment",
    mood: "tense",
    isEnding: true,
    outcomeType: "bad",
    endingTitle: "The TED Talk",
    failureBlogSlug: "get-over-breakup-like-sociopath",
    failureBlogTitle: "How to Get Over a Breakup Like a Sociopath",
    endingLearnPrompt:
      "The eight weeks of unobserved work were edited, in real time, into a presentation for three friends. Naomi nodded politely. Iman shifted. The performance is the leak. The L5 boss will land into a body whose costly signals have been retroactively cheapened, because the council now associates the runs with a self-narration register. Tomorrow's 5:42, the discipline is to not tell anyone you ran, and to not mentally rehearse telling anyone you ran. The signal returns to costly only when the body stops performing.",
    dialog: [
      {
        speakerId: "inner-voice",
        text: "Walk home in the cold. The candle was blown out at 12:48. Naomi's hug at the door was the hug she gives when she is doing the math of how to bring something up later.",
        emotion: "sad",
      },
    ],
    choices: [],
  },

  {
    id: "ending-museum-extended",
    backgroundId: "apartment",
    mood: "tense",
    isEnding: true,
    outcomeType: "bad",
    endingTitle: "The Council, Updated",
    failureBlogSlug: "get-over-breakup-like-sociopath",
    failureBlogTitle: "How to Get Over a Breakup Like a Sociopath",
    endingLearnPrompt:
      "The museum in the council's heads was paused at L3-2 and updated tonight at L4-2 with the visible-change-thanks-to-his-absence frame. He is now, in their canon, both the villain and the cause of the recovery, which structurally means he is still the centre of the story. The eight weeks of work were attributed, by you, to him. The L5 boss will land into a council that is, simultaneously, sharper about him and quietly worried about you, because attribution that gives him credit for the visible change reads, structurally, as still being run by him. Tomorrow morning, write three sentences in your own notes about what the runs are actually for. Read them before the next run.",
    dialog: [
      {
        speakerId: "inner-voice",
        text: "12:34 a.m. Iman's door. Cold air. The museum is one exhibit deeper than it was at 9 p.m.",
        emotion: "sad",
      },
    ],
    choices: [],
  },

  {
    id: "ending-double-deflect",
    backgroundId: "apartment",
    mood: "cold",
    isEnding: true,
    outcomeType: "bad",
    endingTitle: "The Door, Closed",
    failureBlogSlug: "get-over-breakup-like-sociopath",
    failureBlogTitle: "How to Get Over a Breakup Like a Sociopath",
    endingLearnPrompt:
      "Naomi was told twice that the visible change was not real. She will not try a third time tonight; she may not try again at all. The body has learned, tonight, that being seen produces refusal. The next run loses some of its weight because the readout was structurally refused. The discipline of L4-2 is taking the compliment, not arguing with it. Tomorrow morning's first move is a small text to Naomi: thanks for what you said last night, sorry I was weird about it, you were right. The repair is in the same register the breach was.",
    dialog: [
      {
        speakerId: "inner-voice",
        text: "Walk home. The compliment in the air behind you, declined. The body in the cold, not knowing what to make of the refusal.",
        emotion: "sad",
      },
    ],
    choices: [],
  },
];

export const afterHim42: Scenario = {
  id: "after-him-4-2",
  title: "The Dinner With The Old Friends",
  tagline:
    "Iman's flat. Two bottles in. Naomi: you look different. The audit runs underneath the conversation.",
  description:
    "After-Him L4-2. Week eight. The compliment is the readout of the eight weeks of unobserved work. The teaching is taking it in one word: thanks. Not explaining the runs, not deflecting them, not making it about him, not letting the council rebuild the museum with him as the cause. The private audit underneath the conversation: would I want to date me now. If the answer is yes (or honest not-yet), the signal is real. If the dominant frequency is whether he would notice, the audit is still happening with him in the room.",
  tier: "premium",
  track: "after-him",
  level: 4,
  order: 2,
  estimatedMinutes: 10,
  difficulty: "advanced",
  category: "social-dynamics",
  xpReward: 420,
  startSceneId: "the-dinner",
  prerequisites: ["after-him-4-1"],
  tacticsLearned: [
    "Take the compliment in one word. Thanks.",
    "Do not explain the runs. Do not narrate the work.",
    "Do not attribute the visible change to him.",
    "The private audit: would I want to date me now.",
    "If the wonder 'would he notice' is dominant, he is still in the room.",
  ],
  redFlagsTaught: [
    "The explanation as the leak that converts cost to cheap",
    "The attribution that returns him to the centre of the change",
    "The deflection that asks the council to argue you into your own visibility",
    "The TED talk version of the eight weeks at a dinner table",
    "The double deflection that closes the door on the readout",
  ],
  characters: [INNER_VOICE, NAOMI],
  scenes,
  isNew: true,
};

export default afterHim42;
