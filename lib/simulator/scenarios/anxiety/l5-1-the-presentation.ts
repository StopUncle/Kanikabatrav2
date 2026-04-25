/**
 * anx-5-1 — "The Presentation"
 *
 * Anxiety track, Level 5 (The Presentation), order 1. Sunday night.
 * The presentation is Tuesday at 10 a.m. You have rewritten the slide
 * deck eleven times across the weekend; the eleventh version is, by
 * any honest read, slightly worse than the eighth. Your laptop is on
 * the kitchen table at 11:47 p.m. and you have just typed the
 * subject line of the email that begins "I am so sorry, I am going
 * to need to step down from delivering Tuesday's session, I just
 * cannot in good conscience —"
 *
 * The scenario is the eleven minutes between writing that subject
 * line and either (a) sending it, (b) deleting it, or (c) routing
 * the spiral somewhere the email does not need to be sent FROM.
 *
 * Teaches:
 *  - The eleventh-revision tell — when each new revision is worse
 *    than the seventh, the work is done and the nervous system is
 *    rehearsing its own withdrawal
 *  - The "withdraw the night before" pattern as a specific
 *    professional anxiety failure mode (distinct from imposter
 *    syndrome — this is sleep-deprived rehearsal, not skill doubt)
 *  - The structural intervention: phone in another room, deck
 *    closed, alarm set for 6:30 with a thirty-minute morning-only
 *    revision window
 *  - The "sleep is the work" realization — the next eight hours
 *    of recovery have higher marginal value to Tuesday's
 *    performance than the next eight hours of revision
 *
 * Voice: reference/KANIKA-VOICE.md and reference/TRACK-anxiety.md.
 */

import type { Scenario, Scene } from "../../types";
import { INNER_VOICE, THE_CRITIC, NOOR } from "../../characters";

const scenes: Scene[] = [
  // ===================================================================
  // OPENING — THE EMAIL
  // ===================================================================
  {
    id: "sunday-1147pm",
    backgroundId: "apartment",
    mood: "tense",
    presentCharacterIds: ["the-critic", "inner-voice"],
    dialog: [
      {
        speakerId: null,
        text: "Sunday, 11:47 p.m. The kitchen table. Cold tea. Laptop open. The slide deck is on its eleventh revision since Friday evening. The eleventh is, you can feel without quite letting yourself name it, slightly worse than the eighth. You are tired the way only sleep-deprived rewriting makes you tired.",
      },
      {
        speakerId: null,
        text: "You opened a new email at 11:43. The subject line, which you have just typed, reads: 'Tuesday — quick re-think on session lead.' The body begins: 'Hi Anya, I am so sorry, I am going to need to step down from delivering Tuesday's session, I just cannot in good conscience —'",
      },
      {
        speakerId: "the-critic",
        text: "Send it. The deck is bad. You will embarrass the team. Anya will respect honesty. She will respect this more than the alternative which is you delivering this badly.",
        emotion: "cold",
      },
      {
        speakerId: "inner-voice",
        text: "The critic is offering a specific lie: that withdrawing tonight is the warmer move for Anya than delivering Tuesday. The truth: withdrawal at 11:47 on a Sunday night is a four-day operational disruption for Anya, the slide deck, the panel, and the seventeen people on the invite list. The critic is not optimising for Anya. The critic is optimising for the next forty-eight hours of your nervous system.",
        emotion: "knowing",
      },
    ],
    choices: [
      {
        id: "close-the-email",
        text: "Save the email as a draft. Do not delete it. Close the laptop.",
        tactic: "Saving-as-draft is the right move. Delete-immediately is the over-correction (the critic uses 'I deleted it' as evidence of 'I was being dramatic'). Saving acknowledges the spiral existed without acting on it; closing the laptop removes the surface the spiral was running on.",
        nextSceneId: "laptop-closed",
        isOptimal: true,
        event: "restraint-shown",
      },
      {
        id: "send-the-email",
        text: "Send. Get it over with. Anya needs the warning tonight.",
        tactic: "The critic's specific outcome. The 11:47 withdrawal becomes the four-day cleanup; Anya finds the email at 6:14 a.m. Monday and your Tuesday is now a different week's problem at every level. The pattern is the specific professional failure mode the scenario is built to interrupt.",
        nextSceneId: "email-sent",
        isOptimal: false,
      },
      {
        id: "do-twelfth-revision",
        text: "Don't send. Don't close the laptop. The deck has one more pass in it — the section on the third slide is wrong.",
        tactic: "The twelfth revision will, by the eighth-vs-eleventh data already in your hands, be slightly worse than the eleventh. Working past the inflection point is rehearsing the failure-of-the-talk in advance.",
        nextSceneId: "twelfth-revision",
        isOptimal: false,
      },
      {
        id: "text-noor-now",
        text: 'Text Noor: "talk me out of sending an email."',
        tactic: "Routing the spiral to Noor is valid as a 11:47 p.m. fallback when the close-laptop instinct is failing. She will say one thing and it will be the right thing. The cost is Noor at 11:47 p.m. on a Sunday — fine for a real reach, expensive if it becomes the only move in the toolkit.",
        nextSceneId: "noor-routed",
        isOptimal: false,
      },
    ],
  },

  // ===================================================================
  // LAPTOP CLOSED — OPTIMAL PATH
  // ===================================================================
  {
    id: "laptop-closed",
    backgroundId: "apartment",
    mood: "peaceful",
    presentCharacterIds: ["inner-voice"],
    dialog: [
      {
        speakerId: null,
        text: "11:54 p.m. Email saved as draft. Laptop closed. The kitchen is quiet. The cold tea is still cold.",
      },
      {
        speakerId: "inner-voice",
        text: "The deck is done — has been since the eighth revision. The remaining work is not the deck. The remaining work is the next seven hours of sleep you are now in a position to actually have, plus a thirty-minute morning-only revision window that will catch any single thing the eighth-version still misses.",
        emotion: "knowing",
      },
    ],
    choices: [
      {
        id: "phone-bedroom",
        text: "Take the phone to the bedroom. Plug it in across the room from the bed. Set an alarm for 6:30.",
        tactic: "Phone across the room (not on the nightstand) is the structural move. The Sunday-night anxiety reaches for the phone at 2:14 a.m. when sleep cracks; phone-across-room means the reach has to become a walk, which the nervous system declines.",
        nextSceneId: "phone-staged",
        isOptimal: true,
      },
      {
        id: "phone-nightstand",
        text: "Phone on the nightstand. Alarm for 6:30. Sleep.",
        tactic: "The nightstand phone is the standard pattern; tonight is not a standard night. The deck-anxiety will produce one phone-check at 2:14 a.m. and the check will produce four more. Cost: an hour or more of fragmented sleep that compounds into Tuesday's performance.",
        nextSceneId: "phone-near",
        isOptimal: false,
      },
    ],
  },

  // ===================================================================
  // PHONE STAGED — INTO THE NIGHT
  // ===================================================================
  {
    id: "phone-staged",
    backgroundId: "apartment",
    mood: "peaceful",
    presentCharacterIds: ["inner-voice"],
    dialog: [
      {
        speakerId: null,
        text: "12:11 a.m. Phone on the desk across the room. Alarm 6:30. You are in bed with the lamp off. Your nervous system is still elevated — the eleventh-revision energy has not yet metabolised — but the surface for it to act on is now structurally absent.",
      },
      {
        speakerId: "inner-voice",
        text: "The body settles in approximately fourteen minutes when the room is dark and the phone is across the room and the laptop is closed in another room. The fourteen-minute window is the only work remaining tonight. The rest of the talk's performance is set.",
        emotion: "knowing",
      },
    ],
    choices: [
      {
        id: "to-monday-morning",
        text: "Wait. Sleep arrives.",
        tactic: "The whole technique is the absence of the next bad move. Lying still in a dark room with the phone across it is the work; the work is small and structural.",
        nextSceneId: "monday-morning",
        isOptimal: true,
      },
    ],
  },

  // ===================================================================
  // MONDAY MORNING — REVISION WINDOW
  // ===================================================================
  {
    id: "monday-morning",
    backgroundId: "apartment",
    mood: "peaceful",
    presentCharacterIds: ["inner-voice"],
    dialog: [
      {
        speakerId: null,
        text: "Monday, 6:31 a.m. Alarm. You slept 6 hours 14 minutes. You walk to the desk, retrieve the phone, do not open Slack. You make coffee. You open the laptop at 7:02 a.m. with the rule already named: thirty minutes of revision, then close.",
      },
      {
        speakerId: null,
        text: "The third slide, the one you were going to fix at 11:54 last night, is fine. There is a clarity-of-language issue on slide six that the fresh-eye morning catches in eleven minutes. You fix it. You close the laptop at 7:23 — seven minutes ahead of schedule. The deck is, structurally, ready.",
      },
      {
        speakerId: "inner-voice",
        text: "The Sunday-night spiral did not produce the deck. The Sunday-night sleep produced the deck. The 11:54 close-the-laptop move was the move; everything since was execution.",
        emotion: "knowing",
      },
    ],
    choices: [
      {
        id: "tuesday-arrives",
        text: "Tuesday, 9:58 a.m. The room is filling. The deck is loaded.",
        tactic: "The scenario's structural work was done by midnight Sunday. The talk on Tuesday is the talk you would have given anyway, delivered by a version of you who slept.",
        nextSceneId: "ending-the-talk-held",
        isOptimal: true,
        event: "optimal-with-grace",
      },
    ],
  },

  // ===================================================================
  // FAILURE BRANCHES
  // ===================================================================
  {
    id: "email-sent",
    backgroundId: "apartment",
    mood: "cold",
    presentCharacterIds: ["inner-voice"],
    dialog: [
      {
        speakerId: null,
        text: "Sent. 11:51 p.m. The email is in Anya's inbox. Your laptop's confirmation banner pulses once. The kitchen is quiet in a different way now.",
      },
      {
        speakerId: "inner-voice",
        text: "Anya will read it at 6:14 Monday morning. She will, professionally, accept the withdrawal and route the session to Lina, who has not prepared for it. Lina will deliver Tuesday at 60% of where you would have been. The seventeen people on the invite list will ask quietly what happened to you. By Friday this is a small file at the back of Anya's notion of you that will not be retrievable.",
        emotion: "serious",
      },
    ],
    choices: [
      {
        id: "to-bad-ending",
        text: "Close the laptop. The cleanup is Monday's problem.",
        tactic: "The scenario does not unwind the send. It records the cost.",
        nextSceneId: "ending-withdrew-the-night-before",
        isOptimal: false,
      },
      {
        id: "send-recall",
        text: "Send a follow-up: 'IGNORE PREVIOUS — I will deliver Tuesday, sorry, late-night spiral.'",
        tactic: "Damage control. The recall is messy but recoverable; Anya will read both emails together at 6:14 a.m. and read the second as the truer one. Cost: a small operational record of the spiral. Better than the silent withdrawal.",
        nextSceneId: "recall-sent",
        isOptimal: true,
      },
    ],
  },

  {
    id: "recall-sent",
    backgroundId: "apartment",
    mood: "tense",
    presentCharacterIds: ["inner-voice"],
    dialog: [
      {
        speakerId: "inner-voice",
        text: "The second email is in. Anya will read both at 6:14 and read the second as the recovery. The cost is the small file: she now knows you almost withdrew the night before. Not catastrophic; not invisible. Now do the structural work the first email was a substitute for.",
        emotion: "knowing",
      },
    ],
    choices: [
      {
        id: "close-laptop-late",
        text: "Save any further drafts. Close the laptop. Phone to the bedroom desk.",
        tactic: "Same structural move, late. The deck is still the eighth-revision deck; the night is still recoverable.",
        nextSceneId: "laptop-closed",
        isOptimal: true,
      },
    ],
  },

  {
    id: "twelfth-revision",
    backgroundId: "apartment",
    mood: "tense",
    presentCharacterIds: ["the-critic", "inner-voice"],
    dialog: [
      {
        speakerId: null,
        text: "12:38 a.m. The twelfth revision is on the screen. Slide three is now, by your own quiet estimate, slightly worse than slide three was at 11:47. Your eyes are sore. The thirteenth pass has just announced itself.",
      },
      {
        speakerId: "inner-voice",
        text: "The eleventh-vs-eighth data is now extending into eleventh-vs-twelfth. Each pass is producing slightly worse work because the underlying instrument — your sleep-deprived attention — is producing the worsening. Stop.",
        emotion: "serious",
      },
    ],
    choices: [
      {
        id: "stop-now",
        text: "Stop. Save the version, revert to slide-three-from-the-eighth-revision, close the laptop.",
        tactic: "Recovery. Reverting one slide back to the eighth-version known-good is the surgical move; rolling the whole deck back loses the morning-window value. Save and close.",
        nextSceneId: "laptop-closed",
        isOptimal: true,
      },
      {
        id: "thirteenth-pass",
        text: "One more pass. The slide-three issue is real.",
        tactic: "It isn't. The pattern continues to worsening. The scenario does not stop you, but the deck does not get better between here and 2 a.m.",
        nextSceneId: "ending-talk-on-no-sleep",
        isOptimal: false,
      },
    ],
  },

  {
    id: "noor-routed",
    backgroundId: "apartment",
    mood: "tense",
    presentCharacterIds: ["noor", "inner-voice"],
    dialog: [
      {
        speakerId: "noor",
        text: "do not send the email. close the laptop. phone in the other room. sleep is the work tonight. talk tomorrow.",
        emotion: "neutral",
      },
      {
        speakerId: "inner-voice",
        text: "Noor produced the right four sentences in five seconds. The cost was Noor at 11:47 p.m. on a Sunday — small, real, and one you will balance by being the same friend back when she needs it.",
        emotion: "knowing",
      },
    ],
    choices: [
      {
        id: "obey-noor",
        text: "Email saved as draft. Laptop closed. Phone to the bedroom desk.",
        tactic: "Honour the ally's call.",
        nextSceneId: "laptop-closed",
        isOptimal: true,
      },
    ],
  },

  {
    id: "phone-near",
    backgroundId: "apartment",
    mood: "tense",
    presentCharacterIds: ["inner-voice"],
    dialog: [
      {
        speakerId: null,
        text: "2:14 a.m. The phone is on the nightstand. You are awake. You check it; nothing has changed. You check it at 2:38. You check it at 3:11. Sleep, when it returns, returns shallow.",
      },
      {
        speakerId: "inner-voice",
        text: "The nightstand-phone made the close-laptop move only half-effective. Tuesday will be delivered on five hours of fragmented sleep instead of seven of consolidated. The talk will hold; the cost is in the margins of how it lands, and in the next forty-eight hours of recovery.",
        emotion: "knowing",
      },
    ],
    choices: [
      {
        id: "to-half-slept-monday",
        text: "Monday alarm. The talk is still Tuesday.",
        tactic: "The half-slept Monday is recoverable but not free.",
        nextSceneId: "ending-half-slept",
        isOptimal: false,
      },
    ],
  },

  // ===================================================================
  // ENDINGS
  // ===================================================================
  {
    id: "ending-the-talk-held",
    backgroundId: "apartment",
    mood: "peaceful",
    isEnding: true,
    outcomeType: "good",
    endingTitle: "The Talk Held",
    endingLearnPrompt:
      "The Sunday-night withdraw-the-night-before spiral has a specific structural intervention: stop revising, close the laptop, phone across the room, alarm at 6:30, thirty-minute morning revision window. Sleep is the work; the deck has been ready since the eighth revision. The spiral wants you to optimise the next forty-eight hours of your nervous system; the move is to optimise Tuesday's seventeen-person room instead. The two are opposite outcomes.",
    dialog: [
      {
        speakerId: "inner-voice",
        text: "Tuesday 10:00 a.m. The room is full. The deck is loaded. The talk is given by a version of you that slept. The whole scenario was the eleven minutes between 11:47 and 11:58 on Sunday night.",
        emotion: "knowing",
      },
    ],
    choices: [],
  },

  {
    id: "ending-withdrew-the-night-before",
    backgroundId: "apartment",
    mood: "cold",
    isEnding: true,
    outcomeType: "bad",
    endingTitle: "Withdrew the Night Before",
    failureBlogSlug: "architecture-of-control-how-emotional-dependency-is-built",
    failureBlogTitle: "Architecture of Control — How Emotional Dependency Is Built",
    endingLearnPrompt:
      "The 11:47 withdrawal protected the next forty-eight hours of your nervous system at the cost of: Anya's Monday morning, Lina's Tuesday delivery, the seventeen-person room, and a small permanent file in Anya's read of you. The withdrawal felt like 'doing the right thing for the team' — that was the critic's specific lie. The right thing for the team was the eighth-revision deck delivered by a slept-on version of you. Both options were available at 11:47.",
    dialog: [
      {
        speakerId: "inner-voice",
        text: "Email sent. The cleanup is Anya's. The cost is precise and asymmetric: a small file at the back of her read of you that will not be retrievable.",
        emotion: "serious",
      },
    ],
    choices: [],
  },

  {
    id: "ending-talk-on-no-sleep",
    backgroundId: "apartment",
    mood: "cold",
    isEnding: true,
    outcomeType: "neutral",
    endingTitle: "The Talk on Three Hours",
    endingLearnPrompt:
      "The thirteenth pass produced no useful work. Tuesday is delivered on three hours of sleep, in the version of you that has been awake since 5 a.m. Sunday. The talk holds — the eighth-revision deck is genuinely solid — but the delivery is at 70% of where it would have been with sleep. The seventeen people in the room read the talk as 'fine' rather than 'memorable.' The cost is precise: a presentation that does not become the one Anya invites you back for.",
    dialog: [
      {
        speakerId: "inner-voice",
        text: "Three hours of sleep. The talk holds. The version of you that delivered it was not the version Tuesday deserved.",
        emotion: "knowing",
      },
    ],
    choices: [],
  },

  {
    id: "ending-half-slept",
    backgroundId: "apartment",
    mood: "tense",
    isEnding: true,
    outcomeType: "neutral",
    endingTitle: "The Half-Slept Monday",
    endingLearnPrompt:
      "The structural close-laptop move was half-done because the phone stayed on the nightstand. Monday is functional but heavy. Tuesday is delivered on a body that has been catching up since 5:30 a.m. Monday. The talk holds; the recovery extends through Wednesday afternoon. Next time: phone across the room. The structural separation matters.",
    dialog: [
      {
        speakerId: "inner-voice",
        text: "Half-slept Monday. The talk is delivered Tuesday. The recovery is real and longer than it had to be.",
        emotion: "knowing",
      },
    ],
    choices: [],
  },
];

export const anx51: Scenario = {
  id: "anx-5-1",
  title: "The Presentation",
  tagline: "Sunday, 11:47 p.m. The deck has eleven revisions. The withdrawal email has a subject line.",
  description:
    "Anxiety track, Level 5. The presentation is Tuesday. The deck has been ready since the eighth revision; the eleventh is, by your own quiet read, slightly worse. You have just typed the subject line of the withdrawal email. The scenario is the eleven minutes between 11:47 and 11:58 — close the laptop, save the email as a draft, phone across the room, alarm 6:30, thirty-minute morning revision window. Sleep is the work tonight, not the deck.",
  tier: "premium",
  track: "anxiety",
  level: 5,
  order: 1,
  estimatedMinutes: 11,
  difficulty: "intermediate",
  category: "self-regulation",
  xpReward: 380,
  badgeId: "the-talk-held",
  startSceneId: "sunday-1147pm",
  prerequisites: ["anx-1-1"],
  tacticsLearned: [
    "The eleventh-revision tell — when each new pass is worse than the seventh, the deck is done and the body is rehearsing withdrawal",
    "Phone across the room (not on the nightstand) — structural separation that survives the 2:14 a.m. wake",
    "The thirty-minute morning-only revision window — fresh-eye work catches what eleven sleep-deprived passes miss",
    "Saving-as-draft instead of deleting — acknowledges the spiral existed without acting on it or pretending it was nothing",
  ],
  redFlagsTaught: [
    "The withdraw-the-night-before pattern as a specific professional anxiety failure mode",
    "The critic framing the withdrawal as 'doing the right thing for the team' — the precise lie",
    "Each new revision being slightly worse than the seventh, in a body too tired to read its own output",
    "Phone on the nightstand making the close-laptop move only half-effective",
  ],
  characters: [INNER_VOICE, THE_CRITIC, NOOR],
  scenes,
};

export default anx51;
