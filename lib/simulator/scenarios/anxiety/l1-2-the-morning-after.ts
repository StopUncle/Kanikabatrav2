/**
 * anx-1-2 — "The Morning After the Draft"
 *
 * Anxiety track, Level 1, order 2. Picks up the morning after
 * anx-1-1. The phone that was face-down on the nightstand is now
 * face-up. The first two minutes of consciousness decide the next
 * three days.
 *
 * Scenario is reachable regardless of the L1-1 ending — the opening
 * is calibrated to what the protagonist did overnight but the
 * teaching works for all four paths.
 *
 * Teaches:
 *  - the motor protocol that anchors an anxious-attached morning
 *  - phone-in-another-room as a specific intervention
 *  - the first ninety minutes of the day as the leverage window
 *  - the 11 a.m. review — not before
 *
 * Voice: reference/KANIKA-VOICE.md and reference/TRACK-anxiety.md.
 */

import type { Scenario, Scene } from "../../types";
import { INNER_VOICE, NOOR, THE_CRITIC } from "../../characters";

const scenes: Scene[] = [
  // ===================================================================
  // ACT 1 — waking
  // ===================================================================
  {
    id: "wake-up",
    backgroundId: "apartment",
    mood: "peaceful",
    dialog: [
      {
        speakerId: null,
        text: "7:14 a.m. Wednesday. The alarm has not gone off. You woke on your own at an hour that is, for you, unusually early. The phone is face-down on the nightstand. You have been awake for about sixty seconds.",
      },
      {
        speakerId: null,
        text: "The first conscious thought is Theo. Not a specific sentence about him — the thought is more like a coordinate on a map. You are not upset. You are alert.",
      },
      {
        speakerId: "the-critic",
        text: "Obviously you should check the phone first. If he replied you want to know. If he did not you also want to know. Either way you can't get on with your day until you've checked. Check it.",
        emotion: "concerned",
      },
      {
        speakerId: "inner-voice",
        text: "Note how quickly the Critic arrives — under ninety seconds of consciousness. Note also what it is asking for. It wants you to look at the phone before you have put any other signal into your nervous system. It wants the phone to be the first input of your day. If it wins this argument, the rest of your morning is a response to whatever the phone shows you.",
        emotion: "knowing",
      },
      {
        speakerId: "inner-voice",
        text: "The rule of this scenario is simple. The first ninety minutes of the day belong to you. Not to Theo, not to the draft you may or may not have sent last night, not to whoever has replied to whoever else. What you do in the next ninety minutes will decide how much of today you keep.",
        emotion: "knowing",
      },
    ],
    choices: [
      {
        id: "check-phone-immediately",
        text: "Pick up the phone. Check it. You will not relax until you do.",
        tactic: "The Critic wins in the first ninety seconds of the day. The checking confirms the checking as a habit; tomorrow morning the urge arrives faster.",
        nextSceneId: "checked-phone-hot",
        isOptimal: false,
      },
      {
        id: "coffee-first",
        text: "Get out of bed. Do not pick up the phone. Start the coffee. Come back for the phone later.",
        tactic: "Classical morning-protocol move. The coffee machine is a motor anchor — it gives your hands something to do that is not checking the phone.",
        nextSceneId: "coffee-made",
        isOptimal: true,
      },
      {
        id: "shower-first",
        text: "Shower. Phone stays on the nightstand. Decide what to do about it after you are dressed.",
        tactic: "Motor sequence. The shower is a thirty-minute buffer between consciousness and the phone. Tomorrow's version of you will thank today's version for this.",
        nextSceneId: "showered",
        isOptimal: true,
      },
      {
        id: "phone-another-room",
        text: "Pick up the phone without looking at the screen. Walk it into the kitchen. Put it face-down on the counter. Leave it there until 11 a.m.",
        tactic: "The nuclear version. Hardest to execute, cleanest outcome. Physically relocates the device so the checking requires a separate motor act.",
        nextSceneId: "phone-relocated",
        isOptimal: true,
      },
    ],
  },

  // ===================================================================
  // ACT 2A — checked phone hot
  // ===================================================================
  {
    id: "checked-phone-hot",
    backgroundId: "apartment",
    mood: "tense",
    dialog: [
      {
        speakerId: null,
        text: "You pick up the phone. You read what is there in roughly eleven seconds. Whatever the screen shows you — reply, no reply, unsent draft still in position — has now rewritten the first four hours of your day.",
      },
      {
        speakerId: "inner-voice",
        text: "The damage is not in the content of what you read. The damage is in the timing. You have, as of about eight seconds ago, trained your nervous system that the first act of consciousness is to audit your romantic standing. Your morning now lives downstream of that audit. Tomorrow's Critic has an easier argument to make because today's Critic won this one.",
        emotion: "concerned",
      },
      {
        speakerId: "inner-voice",
        text: "The recovery move is not to re-litigate the decision. The recovery move is to notice that the check happened, mark it in your head without shame, and execute the rest of the morning protocol anyway — coffee, water, sunlight, a task. The morning is not lost. It is one point down.",
        emotion: "knowing",
      },
    ],
    choices: [
      {
        id: "morning-protocol-anyway",
        text: "Put the phone down face-down. Make coffee. Drink water. Open the blinds. Start the day anyway.",
        tactic: "Late discipline is still discipline. The checking happened; the morning is not conditional on it.",
        nextSceneId: "the-morning-protocol",
        isOptimal: true,
      },
      {
        id: "stay-in-bed-with-phone",
        text: "Stay in bed. Scroll. Re-read. Check Theo's Instagram. Audit from a horizontal position.",
        tactic: "The checking begets the scrolling. By 8:14 you have not moved your body in two hours and Theo's last 47 Instagram stories have been reviewed.",
        nextSceneId: "ending-lost-morning",
        isOptimal: false,
      },
    ],
  },

  // ===================================================================
  // ACT 2B — coffee first
  // ===================================================================
  {
    id: "coffee-made",
    backgroundId: "apartment",
    mood: "peaceful",
    dialog: [
      {
        speakerId: null,
        text: "You get out of bed. You walk past the phone without picking it up. In the kitchen the tiles are cold under your feet. You grind beans. You press the button. The machine does its thing.",
      },
      {
        speakerId: "inner-voice",
        text: "What you have just done is put a motor task between your waking brain and the phone. The motor task cannot be skipped. The machine takes about ninety seconds. In those ninety seconds your nervous system is receiving the input of the kitchen — the light, the cold tile, the grinder noise, the smell — instead of the input of the phone. That is nervous-system engineering, and it works without requiring you to be strong today.",
        emotion: "knowing",
      },
    ],
    nextSceneId: "the-morning-protocol",
  },

  // ===================================================================
  // ACT 2C — shower first
  // ===================================================================
  {
    id: "showered",
    backgroundId: "apartment",
    mood: "peaceful",
    dialog: [
      {
        speakerId: null,
        text: "You shower. The water is hot. You do not think about Theo for the first seven minutes because you are thinking about the water. You do think about him at minute eight, briefly, but the thought is smaller than it was in bed.",
      },
      {
        speakerId: "inner-voice",
        text: "Water-and-body is the oldest nervous-system intervention in the species. Your brain is receiving temperature, pressure, and gravity signals that outrank anything a phone can send. At minute twelve you have actually forgotten, briefly, about the draft entirely. The forgetting is not healing; it is evidence that the draft has the cognitive weight you choose to give it.",
        emotion: "knowing",
      },
    ],
    nextSceneId: "the-morning-protocol",
  },

  // ===================================================================
  // ACT 2D — phone in another room
  // ===================================================================
  {
    id: "phone-relocated",
    backgroundId: "apartment",
    mood: "peaceful",
    dialog: [
      {
        speakerId: null,
        text: "You walk the phone to the kitchen without looking at its face. You set it down, face-down, on the counter by the kettle. You turn around. You walk back to the bedroom. The phone is now twelve steps away and requires a decision to retrieve.",
      },
      {
        speakerId: "the-critic",
        text: "Obviously you can see the phone from the hallway. Obviously one quick look would not undo anything. Obviously —",
        emotion: "concerned",
      },
      {
        speakerId: "inner-voice",
        text: "The Critic is going to run its case for the next two hours. Let it. It cannot actually move your body without your agreement. The phone is in the kitchen; you are in the bedroom; the distance is the discipline. You do not have to win the argument with the Critic. You only have to not agree to fetch the phone.",
        emotion: "knowing",
      },
    ],
    nextSceneId: "the-morning-protocol",
  },

  // ===================================================================
  // ACT 3 — the morning protocol (convergence)
  // ===================================================================
  {
    id: "the-morning-protocol",
    backgroundId: "apartment",
    mood: "peaceful",
    dialog: [
      {
        speakerId: null,
        text: "It is now 7:34 a.m. You have coffee. You are in your kitchen, or your bathroom, or the chair by the window where you read. Different players will have got here by different routes; the position is approximately the same.",
      },
      {
        speakerId: "inner-voice",
        text: "The protocol has four motor habits. None are dramatic. All compound over weeks. One — sunlight on your skin within the first hour of waking, ideally outside, minimum through a window. Two — a full glass of water before any caffeine absorbs. Three — one thing written down that you will do today that has nothing to do with Theo. Four — the phone stays face-down until 11 a.m.",
        emotion: "knowing",
      },
      {
        speakerId: "inner-voice",
        text: "You do not have to execute all four to win the morning. Two of four is already a better morning than the one you were going to have. Three is, rather unambiguously, a reclaimed day. Four is the version of this scene that most readers will not manage on the first attempt. Pick the ones available to you today.",
        emotion: "knowing",
      },
    ],
    choices: [
      {
        id: "all-four",
        text: "Execute all four. Sunlight, water, a written task, phone down until 11.",
        tactic: "The full protocol. Difficult to complete on a hard morning; produces a different Wednesday than you were going to have.",
        nextSceneId: "full-protocol-executed",
        isOptimal: true,
      },
      {
        id: "three-of-four",
        text: "Do three of four. Sunlight, water, written task. Pick up the phone once mid-morning.",
        tactic: "Solid. The written task is doing most of the work — it gives your attention a target that is not Theo.",
        nextSceneId: "three-of-four-done",
        isOptimal: true,
      },
      {
        id: "water-only",
        text: "Drink the water. Skip the rest. You did not sleep enough for this.",
        tactic: "The minimum viable version. One motor habit is still a motor habit. Do not count nothing as nothing — count one as one.",
        nextSceneId: "one-of-four-done",
      },
      {
        id: "give-in",
        text: "Pick up the phone. You got this far. You have earned a look.",
        tactic: "The Critic wins the mid-protocol argument. The rest of the protocol is now optional, which means it will not happen.",
        nextSceneId: "ending-lost-morning",
        isOptimal: false,
      },
    ],
  },

  {
    id: "full-protocol-executed",
    backgroundId: "apartment",
    mood: "peaceful",
    dialog: [
      {
        speakerId: null,
        text: "By 8:02 a.m. you have done the four things. Sunlight through the window while the coffee brewed. A full glass of water before the first sip of caffeine. A sentence written in a notebook that reads: 'Today: finish the draft of the Collins memo and walk to the park at lunch.' The phone is still face-down on the counter.",
      },
      {
        speakerId: "inner-voice",
        text: "You have now configured your nervous system to receive a specific kind of day. The day is not guaranteed — Theo could still text; the Critic could still fire; an actual work crisis could still arrive. But the baseline is higher. You will absorb a disruption from a healthier floor. That is the entire thesis of a morning protocol.",
        emotion: "knowing",
      },
    ],
    nextSceneId: "eleven-am-review",
  },

  {
    id: "three-of-four-done",
    backgroundId: "apartment",
    mood: "peaceful",
    dialog: [
      {
        speakerId: null,
        text: "By 8:14 you have done three of the four. You pick up the phone at 8:36. You read what is there in about twenty seconds. The reading does not destroy the morning, because the morning was already yours by the time you read it.",
      },
      {
        speakerId: "inner-voice",
        text: "Three of four is enough. The written task is, genuinely, doing most of the work — by 8:45 you are at the Collins memo and not at the Theo audit. This is the practical version of the protocol. Most readers will run it at three-of-four four days a week and at two-of-four on the other three. That is fine. The shape is the point.",
        emotion: "knowing",
      },
    ],
    nextSceneId: "eleven-am-review",
  },

  {
    id: "one-of-four-done",
    backgroundId: "apartment",
    mood: "mysterious",
    dialog: [
      {
        speakerId: null,
        text: "You drink the water. You do not do the other three. At 7:58 you pick up the phone. By 9:12 the morning has, in some measurable way, slipped. Not catastrophically — you are not scrolling in bed. But the written task did not get written and the sunlight did not land on your skin and the day is going to need a recovery move at lunch.",
      },
      {
        speakerId: "inner-voice",
        text: "Count the water. Don't count the three you didn't do as failure. Count them as data for tomorrow. The protocol compounds; one morning of one-of-four is not the problem. Ten mornings of one-of-four is. Tomorrow, add the written task. Thursday, add the sunlight. Build it like a muscle.",
        emotion: "knowing",
      },
    ],
    nextSceneId: "ending-partial-recovery",
  },

  {
    id: "eleven-am-review",
    backgroundId: "apartment",
    mood: "peaceful",
    dialog: [
      {
        speakerId: null,
        text: "11:02 a.m. You are at your desk. You have worked on the Collins memo for approximately ninety minutes. The memo is, honestly, decent. You pick up the phone properly for the first time today.",
      },
      {
        speakerId: null,
        text: "Whatever is on the phone — Theo replied, Theo did not reply, Noor checked in, the group chat lit up, nothing at all — you read it from a different position than you would have at 7:15 a.m. Your body has eaten, caffeinated, been looked at by sunlight, and produced ninety minutes of work you are modestly proud of. The phone is reading into a nervous system that is, temporarily, calibrated.",
      },
      {
        speakerId: "inner-voice",
        text: "This is the specific skill — not to avoid the phone forever, but to meet the phone from a position of your own construction rather than at its time of choosing. Practise it on an ordinary Wednesday. It generalises to harder days. The 11 a.m. check is the equivalent of reading mail once a day instead of every ninety seconds. It is a different category of interaction with the same device.",
        emotion: "knowing",
      },
    ],
    choices: [
      {
        id: "respond-if-warranted",
        text: "If there is a message that actually warrants a reply, reply. Briefly. Then put the phone down again.",
        tactic: "Return to the protocol after the review. The phone is a tool you use, not a thread you maintain.",
        nextSceneId: "ending-reclaimed",
        isOptimal: true,
      },
      {
        id: "stay-off",
        text: "Do not reply to anything. The reply, if any, happens at 4 p.m. over a coffee break, from a fully fed and rested version of you.",
        tactic: "The extended version. The 11 a.m. check is read-only; writing back is a separate scheduled act. Not required, but the cleanest version.",
        nextSceneId: "ending-reclaimed",
        isOptimal: true,
      },
      {
        id: "fall-back-in",
        text: "Whatever is on the phone has hooked you. Respond now, at length, from the desk, with the Collins memo still open behind the message thread.",
        tactic: "The protocol worked until 11:04. Twenty-seven minutes of focused work are about to be replaced by ninety minutes of thread management.",
        nextSceneId: "ending-partial-recovery",
      },
    ],
  },

  // ===================================================================
  // ENDINGS
  // ===================================================================
  {
    id: "ending-reclaimed",
    backgroundId: "apartment",
    mood: "peaceful",
    isEnding: true,
    outcomeType: "good",
    endingTitle: "The Day Reclaimed",
    endingSummary:
      "You ran the morning protocol. Sunlight, water, a written task, phone face-down until 11 a.m. You reviewed the phone at a time of your own choosing. The draft is gone — you deleted it unread. Theo has either replied or he has not; you handled it from a nervous-system position you constructed for yourself. By lunch the day belongs to you rather than to the thread. This is what an anxious-attached morning looks like when the protocol holds. It is not dramatic. It is the motor-habit sequence compounding into a different shape of day.",
    endingLearnReference: "beige-protocol-strategic-boredom-weapon",
    endingLearnPrompt:
      "The morning protocol is a boring story on paper. It compounds in a non-boring way over six weeks. Commit to three-of-four on a Wednesday. By the next Wednesday you will notice that the Critic is quieter at 7:14.",
    dialog: [
      {
        speakerId: "inner-voice",
        text: "Keep the notebook. Write tomorrow's one-sentence task tonight. Small things, stacked reliably, are the entire intervention. You will look back in six weeks and not remember how this particular Wednesday went, which is precisely the point — a Wednesday that does not register as a hard day is, quietly, a good day.",
        emotion: "knowing",
      },
      {
        speakerId: null,
        text: "The phone is face-down on the desk at 11:18. The Collins memo is submitted at 12:01. Lunch is a walk.",
      },
    ],
  },

  {
    id: "ending-partial-recovery",
    backgroundId: "apartment",
    mood: "mysterious",
    isEnding: true,
    outcomeType: "neutral",
    endingTitle: "Partial Day",
    endingSummary:
      "The protocol ran partially. Some of the motor habits landed; some did not. The morning was not lost, but it was not fully yours either — there is a stretch of the morning that went to the phone that did not need to. The recovery move is at lunch: a walk, no phone, a decision to treat the afternoon as a second first-half of the day. Do that. Do not count the morning as failure; count it as three of four on a hard week.",
    dialog: [
      {
        speakerId: "inner-voice",
        text: "The protocol is meant to be partial some days. Perfection is not the unit of measurement. Consistency of attempt is. Tomorrow the protocol runs again. The compounding works on the aggregate, not on any individual morning.",
        emotion: "neutral",
      },
    ],
  },

  {
    id: "ending-lost-morning",
    backgroundId: "apartment",
    mood: "danger",
    isEnding: true,
    outcomeType: "bad",
    failureBlogSlug: "architecture-of-control-how-emotional-dependency-is-built",
    failureBlogTitle: "Architecture of Control — How Emotional Dependency Is Built",
    endingTitle: "Lost to the Thread",
    endingSummary:
      "By 9 a.m. you have been in bed for ninety minutes past waking, the phone has been in your hand the entire time, and you have reviewed Theo's Instagram stories, his location-tagged photos, his ex's most recent post, and the specific restaurant he was at on Friday. The draft situation has now gained several additional data points that do not help you. The Collins memo has not been opened. This is not catastrophic — it is one morning — but it is also a specific pattern you have now run, and the pattern compounds at the same rate in either direction. Tomorrow morning, choose the protocol before the phone. The protocol is not hard to execute; it is hard to choose before consciousness is fully online. Set the phone face-down in the kitchen tonight as a pre-commitment.",
    dialog: [
      {
        speakerId: "inner-voice",
        text: "Do not spend today punishing yourself for this morning. The punishment spiral is adjacent to the Theo spiral and, as a nervous-system matter, eats the same calories. Eat lunch. Take a walk. Open the memo at 2 p.m. and do whatever you can do with the afternoon. The morning is not the day. The afternoon is not guaranteed but it is still available.",
        emotion: "sad",
      },
      {
        speakerId: null,
        text: "At 2:14 p.m. you walk to a café four blocks away without the phone. It feels, for the first time today, like a choice you made.",
      },
    ],
  },
];

export const anxiety12: Scenario = {
  id: "anx-1-2",
  title: "The Morning After the Draft",
  tagline: "7:14 a.m. The phone is face-down. The first ninety minutes decide the next three days.",
  description:
    "Continuous handoff from anx-1-1. Whether the draft was sent, not sent, or routed through Noor last night, the morning arrives the same way — the phone on the nightstand, the Critic online within ninety seconds of consciousness, and a choice about what to put into your nervous system before you put the phone into it. Teaches the four-move morning protocol.",
  tier: "free",
  track: "anxiety",
  level: 1,
  order: 2,
  estimatedMinutes: 10,
  difficulty: "beginner",
  category: "self-regulation",
  xpReward: 140,
  badgeId: "morning-protocol",
  startSceneId: "wake-up",
  prerequisites: ["anx-1-1"],
  tacticsLearned: [
    "The four-move morning protocol (sunlight, water, written task, phone-delayed)",
    "Motor anchors between consciousness and the phone (coffee, shower, relocation)",
    "The 11 a.m. review — read once, from a calibrated nervous system",
    "Count motor habits additively, never as pass/fail; three-of-four is the week's target",
  ],
  redFlagsTaught: [
    "The Critic's morning argument — 'one quick check' as the Trojan horse for the lost morning",
    "In-bed scrolling as the specific failure mode that swallows 90 minutes",
    "Replying to threads at 11:04 a.m. from the desk with a memo open — a hidden spiral mode",
  ],
  reward: {
    id: "morning-protocol",
    name: "The Morning Protocol",
    description: "Four motor habits before the phone. The floor under the anxious-attached day.",
    unlocksScenarioId: "anx-1-3",
  },
  characters: [INNER_VOICE, NOOR, THE_CRITIC],
  scenes,
};

export default anxiety12;
