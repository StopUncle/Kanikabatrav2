/**
 * pc-4-1 — "The Marriage Question"
 *
 * PC-Child track, Level 4, order 1. Finn is eighteen. Lily is
 * sixteen. The household log is open on the table between you. It
 * is 6:47 a.m. on a Sunday. You have both been awake since 5:30.
 * Something happened last night — the scenario does not make the
 * reader live through the specific incident; what matters is that
 * your partner is about to say the sentence neither of you has let
 * yourselves say in thirteen years of shared parenting.
 *
 * The scenario is not about the child. The child is off-screen the
 * entire time. The scenario is about the marriage, and the
 * specific question of whether a decade of parenting a pc-child
 * has had a cost on the alliance that you have not properly
 * acknowledged.
 *
 * This is the heaviest register in the catalogue. Content gate is
 * mandatory. Voice is clinical-restraint at its tightest; the
 * scenario does not provide emotional resolution, only structural
 * honesty. The obsidian ending is a quiet one.
 *
 * Teaches:
 *  - Receiving the sentence without defending — the partner is not
 *    accusing you, the partner is naming a cost
 *  - Naming the specific cost back (not a generic "this has been
 *    hard on both of us") — the specifics are the repair
 *  - The structural commitment — one concrete thing you will do
 *    differently, not a promise to be a better partner in general
 *  - The refusal to deflect to the child — the child is the
 *    environment, not the subject; the subject is the two of you
 *
 * Voice: reference/KANIKA-VOICE.md and reference/TRACK-pc-child.md.
 */

import type { Scenario, Scene } from "../../types";
import { INNER_VOICE, THE_PARTNER } from "../../characters";

const scenes: Scene[] = [
  // ===================================================================
  // CONTENT GATE
  // ===================================================================
  {
    id: "content-gate",
    backgroundId: "apartment",
    mood: "cold",
    dialog: [
      {
        speakerId: null,
        text: "Content note. This is the heaviest scenario in the pc-child track. It takes place between you and your co-parent, eighteen years into a shared parenting project. The child is off-screen — the scenario is not about him. The scenario is about a sentence your partner is about to say and whether the marriage on the other side of it is still the same marriage.",
      },
      {
        speakerId: null,
        text: "The scenario does not depict conflict. It depicts quiet. The risk is not to the relationship existing; it is to the shape of it. The obsidian ending is a quiet one, reached by refusing the easier moves.",
      },
      {
        speakerId: null,
        text: "If this is the wrong scenario for you tonight, exit. If this is the right one, continue.",
      },
    ],
    choices: [
      {
        id: "continue",
        text: "Continue.",
        tactic: "Sunday, 6:47 a.m. The kitchen. The log on the table.",
        nextSceneId: "sunday-morning",
      },
      {
        id: "exit",
        text: "Exit. Return when the conditions are right.",
        tactic: "The scenario will hold. Respecting your bandwidth is the whole first move.",
        nextSceneId: "opted-out",
      },
    ],
  },

  {
    id: "opted-out",
    backgroundId: "apartment",
    mood: "peaceful",
    isEnding: true,
    outcomeType: "neutral",
    endingTitle: "Not Tonight",
    endingLearnPrompt:
      "The opt-out is a complete move. The scenario will be available when the conditions are right. A marriage-register scenario is not something to run through exhausted — you are the co-parent in it, and you need your own bandwidth.",
    dialog: [
      {
        speakerId: "inner-voice",
        text: "You closed the gate. The scenario will be here. Respecting your own bandwidth is the opening move of every scenario in this track, including the ones you do choose to run.",
        emotion: "knowing",
      },
    ],
    choices: [],
  },

  // ===================================================================
  // SUNDAY MORNING
  // ===================================================================
  {
    id: "sunday-morning",
    backgroundId: "apartment",
    mood: "peaceful",
    presentCharacterIds: ["the-partner", "inner-voice"],
    dialog: [
      {
        speakerId: null,
        text: "6:47 a.m. Sunday. The kitchen. You are sitting across from each other at the round table. Two mugs of coffee. The household log is open between you — thirteen years of dated entries, the document Ren would have said, if Ren lived in this house, was the operational infrastructure.",
      },
      {
        speakerId: null,
        text: "Neither of you has spoken in twelve minutes. The quiet is not hostile. It is the quiet of two people who have been awake too long, together, for too many years.",
      },
      {
        speakerId: "the-partner",
        text: '"I have been trying to write this sentence in my head since Thursday. I do not think I will say it well. But I need to say it."',
        emotion: "serious",
      },
      {
        speakerId: "inner-voice",
        text: "The sentence is coming. The first move is: do not fill the silence before it arrives. Do not pre-empt. Do not coach. Wait.",
        emotion: "knowing",
      },
    ],
    choices: [
      {
        id: "wait-in-silence",
        text: "Say nothing. Hold eye contact. Let the sentence come.",
        tactic: "The correct opening. Filling the silence before the sentence lands is a small refusal of the conversation — and the partner has earned, across thirteen years, the right to say it cleanly.",
        nextSceneId: "the-sentence",
        isOptimal: true,
      },
      {
        id: "pre-empt",
        text: '"Whatever it is, I am here. Just say it."',
        tactic: "Warm, but the 'just say it' is a subtle pressure. It narrows the window the partner has been building. Let them use the window.",
        nextSceneId: "sentence-pre-empted",
        isOptimal: false,
      },
      {
        id: "reach-across",
        text: "Reach across the table. Put your hand on theirs.",
        tactic: "The physical move is a decision about register. It can be warm, but in this moment it asks the partner to soften the sentence on your behalf. Your body is not the missing variable; the sentence is.",
        nextSceneId: "hand-across-table",
        isOptimal: false,
      },
    ],
  },

  // ===================================================================
  // THE SENTENCE
  // ===================================================================
  {
    id: "the-sentence",
    backgroundId: "apartment",
    mood: "peaceful",
    presentCharacterIds: ["the-partner"],
    dialog: [
      {
        speakerId: "the-partner",
        text: '"I do not know if we have been in the same marriage for the last five years. I think — I think we have been in the same operation. I think the operation is the thing that has survived, and the marriage has been the thing that, quietly, has not."',
        emotion: "serious",
      },
      {
        speakerId: "the-partner",
        text: '"I am not asking for a separation. I am not threatening one. I am naming something I have been avoiding naming because I was afraid that naming it would make it more real. I am more afraid, now, of not naming it."',
        emotion: "serious",
      },
      {
        speakerId: "inner-voice",
        text: "The sentence has landed. The inside of your chest has contracted. The next thing out of your mouth decides the direction of the next decade of the marriage.",
        emotion: "serious",
      },
    ],
    choices: [
      {
        id: "receive-cleanly",
        text: 'Receive it. "I hear you. I have felt the same thing and did not know how to name it. Thank you for saying it."',
        tactic: "The clean receive. Thanking the partner for the naming is not performative — the naming itself is a gift inside a thirteen-year operation. Do not defend; do not deflect; acknowledge the thing that has been said.",
        nextSceneId: "received-cleanly",
        isOptimal: true,
      },
      {
        id: "name-specific-cost",
        text: '"You are right. I think we last had a conversation that was about us, not about Finn, on our anniversary last June. I have missed that. I have missed you."',
        tactic: "Name the specific — not the generic 'we have been distant' but a datable specific. The specifics are the repair. The partner is not asking for reassurance; they are asking to be specifically seen.",
        nextSceneId: "named-specific",
        isOptimal: true,
      },
      {
        id: "defend-the-operation",
        text: '"I don\'t agree — I think we have held the marriage. I think the operation is the marriage. The parenting is not something separate we did."',
        tactic: "Defending is a refusal of the naming. The partner may or may not be right in the abstract — but in the moment of naming, defence is a door closing.",
        nextSceneId: "defended",
        isOptimal: false,
      },
      {
        id: "deflect-to-finn",
        text: '"Is this about what happened last night? Because I can talk to Finn today if that is what this is."',
        tactic: "Redirecting to the child is the easiest deflection and the most damaging one. The partner is asking about the two of you, and the child is the environment, not the subject.",
        nextSceneId: "deflected-to-finn",
        isOptimal: false,
      },
    ],
  },

  // ===================================================================
  // RECEIVED CLEANLY → STRUCTURAL COMMITMENT
  // ===================================================================
  {
    id: "received-cleanly",
    backgroundId: "apartment",
    mood: "peaceful",
    presentCharacterIds: ["the-partner", "inner-voice"],
    dialog: [
      {
        speakerId: null,
        text: "Your partner's shoulders drop an inch. Not from relief; from the very small release of having been heard the first time they said it. They nod once. They take a small sip of coffee. They put the mug down.",
      },
      {
        speakerId: "the-partner",
        text: '"Thank you. I did not know which version of this conversation we were going to have. I am — I am glad it is this one."',
        emotion: "knowing",
      },
      {
        speakerId: "inner-voice",
        text: "The conversation has landed in the register it needed to land in. The remaining work is structural — not a promise to be a better partner in general, which is vapour, but one specific thing you will do differently.",
        emotion: "knowing",
      },
    ],
    choices: [
      {
        id: "structural-sunday-hour",
        text: '"I want to propose something specific. One hour, every Sunday, that is about us — not about Finn, not about the log, not about the week ahead. Just us. Not every Sunday forever. Just — until we notice we are not needing the hour anymore."',
        tactic: "The structural commitment. Dated, bounded, specific, testable. The hour itself is almost incidental — what matters is that a specific new shape has been proposed for the week.",
        nextSceneId: "structural-proposed",
        isOptimal: true,
      },
      {
        id: "better-partner-vow",
        text: '"I will try to be more present. I will try to notice when we are not connecting."',
        tactic: "The vague vow. The partner has named a specific thing; a vague vow in response is the genre-confusion that will not, in practice, produce a different week.",
        nextSceneId: "vowed-vaguely",
        isOptimal: false,
      },
      {
        id: "offer-respite",
        text: '"I want you to take Tuesday to Thursday next week to yourself. No Finn-talk, no log-work, no messages from me unless Finn is in the hospital. I will hold everything for three days. You have not had three days in eight years."',
        tactic: "The respite offer — specific, costly to you, generous to the partner. This is the version of the commitment that acknowledges that the cost has not been symmetric.",
        nextSceneId: "respite-offered",
        isOptimal: true,
      },
    ],
  },

  // ===================================================================
  // STRUCTURAL PROPOSED
  // ===================================================================
  {
    id: "structural-proposed",
    backgroundId: "apartment",
    mood: "peaceful",
    presentCharacterIds: ["the-partner", "inner-voice"],
    dialog: [
      {
        speakerId: "the-partner",
        text: '"Yes. Yes. Let us do that. Not Sunday mornings — we are too tired on Sunday mornings. Saturday afternoons. Three to four. We will find one thing we used to do, before, and we will do one of those things."',
        emotion: "knowing",
      },
      {
        speakerId: null,
        text: "You both sit with that for a minute. The coffee is going cold. Neither of you refills it. Then your partner says one more thing.",
      },
      {
        speakerId: "the-partner",
        text: '"Can I name one thing you did over the last ten years that I do not think you know I noticed?"',
        emotion: "knowing",
      },
    ],
    choices: [
      {
        id: "yes-please",
        text: '"Yes. Please."',
        tactic: "Accept the gift the partner is about to give. The offer is the obsidian path of this scenario — a specific, seen thing, named in daylight, across thirteen years of operation.",
        nextSceneId: "the-thing-seen",
        isOptimal: true,
      },
      {
        id: "deflect-the-gift",
        text: '"You don\'t have to — honestly I know you notice. It is okay."',
        tactic: "Deflecting the named-seeing is a specific kind of refusal. The partner is offering a sentence you have been waiting thirteen years for and does not know that. Let them give it.",
        nextSceneId: "gift-deflected",
        isOptimal: false,
      },
    ],
  },

  // ===================================================================
  // THE-THING-SEEN — OBSIDIAN PATH
  // ===================================================================
  {
    id: "the-thing-seen",
    backgroundId: "apartment",
    mood: "peaceful",
    presentCharacterIds: ["the-partner", "inner-voice"],
    dialog: [
      {
        speakerId: "the-partner",
        text: '"The week after Finn was excluded in Grade 9. You slept on the couch outside his room for eight nights so he could not leave the house at three a.m. without you knowing. You never told me. I found out because I went for water at 4:30 one morning. You moved to the couch at ten every night and moved back to our bed at six so I would not see."',
        emotion: "knowing",
      },
      {
        speakerId: "the-partner",
        text: '"You were protecting him. And you were protecting me from knowing how bad it was. I have thought about those eight nights, at some level, every week since. I do not think you have any idea how much I love you for that week."',
        emotion: "knowing",
      },
      {
        speakerId: "inner-voice",
        text: "The naming of the thing you did not know anyone saw. The partner has been carrying it, quietly, for five years. The marriage has been held together by a sentence neither of you had said out loud.",
        emotion: "serious",
      },
    ],
    choices: [
      {
        id: "name-one-back",
        text: 'Name one back. "The month after Finn set the shed fire, you took three weeks off work without telling me why. I knew. I knew and I did not make you name it. I thought — if you needed it to be your own thing, it would be your own thing."',
        tactic: "The symmetric naming. The obsidian move. Both of you have been carrying a specific unnamed act across the decade, and the scenario makes them named across the kitchen table.",
        nextSceneId: "ending-fifteen-year-thank-you",
        isOptimal: true,
      },
      {
        id: "accept-without-matching",
        text: 'Say: "Thank you. That is a lot to hear." Leave it there.',
        tactic: "A clean accept without the matching naming. Correct, warm, but the scenario does not land on the obsidian path — it lands on the high silver. The gift has been received but not returned.",
        nextSceneId: "ending-the-marriage-named",
        isOptimal: false,
      },
    ],
  },

  // ===================================================================
  // RESPITE OFFERED
  // ===================================================================
  {
    id: "respite-offered",
    backgroundId: "apartment",
    mood: "peaceful",
    presentCharacterIds: ["the-partner", "inner-voice"],
    dialog: [
      {
        speakerId: "the-partner",
        text: '"I — I cannot accept that. Not because I do not need it. Because I would come back and feel guilty for the three days. And because the cost has not been asymmetric; you have been carrying it, in your own way, that I have not seen either."',
        emotion: "knowing",
      },
      {
        speakerId: "the-partner",
        text: '"Let us do the Saturday hour. Both of us. Not three days for one of us. An hour, every week, for both of us."',
        emotion: "knowing",
      },
      {
        speakerId: "inner-voice",
        text: "The partner corrected your proposal. The correction was generous — they named that the cost has not been as one-sided as you had assumed. This is itself a datum about the marriage that the decade of operation had obscured.",
        emotion: "knowing",
      },
    ],
    choices: [
      {
        id: "accept-correction",
        text: '"Alright. Saturday three to four. Starting this week."',
        tactic: "Accept the correction cleanly. The partner has named the cost as shared; do not insist on your proposed version when theirs is better.",
        nextSceneId: "structural-proposed",
        isOptimal: true,
      },
    ],
  },

  // ===================================================================
  // FAILURE BRANCHES — SHORTER
  // ===================================================================
  {
    id: "sentence-pre-empted",
    backgroundId: "apartment",
    mood: "tense",
    presentCharacterIds: ["the-partner", "inner-voice"],
    dialog: [
      {
        speakerId: "the-partner",
        text: '"... Okay. I — forget the way I was going to say it. I just — I think we have been more the operation than the marriage for a long time. I do not know what to do with that."',
        emotion: "serious",
      },
      {
        speakerId: "inner-voice",
        text: "The sentence arrived in a shorter form than it was going to. You pre-empted and, in doing so, made the sentence about your bandwidth rather than the partner's. Recoverable. The sentence still says the thing.",
        emotion: "knowing",
      },
    ],
    choices: [
      {
        id: "receive-anyway",
        text: 'Receive what was said. "I hear you. I have felt the same thing."',
        tactic: "The recovery. Receive the sentence even though you compressed the window it was meant to live in.",
        nextSceneId: "received-cleanly",
        isOptimal: true,
      },
    ],
  },

  {
    id: "hand-across-table",
    backgroundId: "apartment",
    mood: "tense",
    presentCharacterIds: ["the-partner", "inner-voice"],
    dialog: [
      {
        speakerId: null,
        text: "Your partner's hand is warm. They do not move it. After a beat, they look up.",
      },
      {
        speakerId: "the-partner",
        text: '"Do not — do not soften it for me. Let me say it. Give me the hand back in a minute."',
        emotion: "knowing",
      },
      {
        speakerId: "inner-voice",
        text: "Named correctly by the partner. The physical move, in this specific instant, was a softening. They want the words to do the work first.",
        emotion: "knowing",
      },
    ],
    choices: [
      {
        id: "retract-hand",
        text: "Move the hand back. Fold both into your lap. Wait.",
        tactic: "The partner has asked for the specific shape of the conversation. Comply without apologising or making a production of it.",
        nextSceneId: "the-sentence",
        isOptimal: true,
      },
    ],
  },

  {
    id: "named-specific",
    backgroundId: "apartment",
    mood: "peaceful",
    presentCharacterIds: ["the-partner"],
    dialog: [
      {
        speakerId: "the-partner",
        text: '"Our anniversary last June. Yes. I remember that conversation. I remember that it was the first time in two years we did not talk about him for an hour. I missed you too."',
        emotion: "knowing",
      },
      {
        speakerId: null,
        text: "Your partner is quiet for a beat. Then nods, small. Moves their hand across the table. You meet it halfway.",
      },
    ],
    choices: [
      {
        id: "into-structural",
        text: "The air in the kitchen has changed. The structural conversation is next.",
        tactic: "The specific naming landed. Move into the structural commitment.",
        nextSceneId: "received-cleanly",
        isOptimal: true,
      },
    ],
  },

  {
    id: "defended",
    backgroundId: "apartment",
    mood: "tense",
    presentCharacterIds: ["the-partner", "inner-voice"],
    dialog: [
      {
        speakerId: "the-partner",
        text: '"... Okay. Okay. I — I am not going to fight this with you at 6:47 a.m. on a Sunday. I am not going to argue about whether the operation is the marriage. I will try this conversation again some other time."',
        emotion: "sad",
      },
      {
        speakerId: "inner-voice",
        text: "The door closed. The partner did not escalate; they withdrew. The damage is specific: they will not try this conversation again for months, if at all. The defence was a refusal.",
        emotion: "serious",
      },
    ],
    choices: [
      {
        id: "recover-late",
        text: "Reach across the table. Name the mistake. 'I heard that wrong. Say it again. I will not defend this time.'",
        tactic: "The late repair. It may or may not reopen the window; the attempt is mandatory.",
        nextSceneId: "late-reopening",
        isOptimal: true,
      },
      {
        id: "let-it-go",
        text: "Let it go. Drink the coffee. Let the conversation die.",
        tactic: "The refusal to recover is its own ending. The scenario does not punish this with a bad-ending badge; it simply records it.",
        nextSceneId: "ending-door-closed",
        isOptimal: false,
      },
    ],
  },

  {
    id: "late-reopening",
    backgroundId: "apartment",
    mood: "tense",
    presentCharacterIds: ["the-partner", "inner-voice"],
    dialog: [
      {
        speakerId: "the-partner",
        text: '"... Okay. I will try. But I want you to just receive it this time. Do not argue the terms."',
        emotion: "serious",
      },
      {
        speakerId: "inner-voice",
        text: "The window reopened. The grace extended is not guaranteed the next time. Receive what comes.",
        emotion: "knowing",
      },
    ],
    choices: [
      {
        id: "receive-without-defence",
        text: 'Receive. "I hear you. Say it again."',
        tactic: "The late but complete receive.",
        nextSceneId: "received-cleanly",
        isOptimal: true,
      },
    ],
  },

  {
    id: "deflected-to-finn",
    backgroundId: "apartment",
    mood: "cold",
    presentCharacterIds: ["the-partner", "inner-voice"],
    dialog: [
      {
        speakerId: "the-partner",
        text: '"... No. This is not about last night. This is about us. I am trying to have a conversation about us, and you have made the third sentence of it about him."',
        emotion: "sad",
      },
      {
        speakerId: "inner-voice",
        text: "The deflection named back. The partner is correct. The entire scenario turns on whether the marriage has become a subsidiary of the parenting project, and the deflection just answered that question for them.",
        emotion: "serious",
      },
    ],
    choices: [
      {
        id: "apologise-redirect",
        text: '"You are right. I am sorry. Start again — this is about us."',
        tactic: "The specific apology + redirect. The partner has asked a specific thing; ask them to restart, on the shape they wanted.",
        nextSceneId: "late-reopening",
        isOptimal: true,
      },
    ],
  },

  {
    id: "gift-deflected",
    backgroundId: "apartment",
    mood: "tense",
    presentCharacterIds: ["the-partner", "inner-voice"],
    dialog: [
      {
        speakerId: "the-partner",
        text: '"... Alright. Maybe another time."',
        emotion: "sad",
      },
      {
        speakerId: "inner-voice",
        text: "The partner retracted the offer. The gift will not be re-offered tonight. This is a smaller version of the defence-move — a reflex deflection of the specific-seeing.",
        emotion: "knowing",
      },
    ],
    choices: [
      {
        id: "into-silver-ending",
        text: "The structural commitment is still in place. The scenario lands on the silver, not the obsidian.",
        tactic: "The scenario is not a failure, but the specific-seeing was refused. The next time the partner offers, accept.",
        nextSceneId: "ending-the-marriage-named",
        isOptimal: false,
      },
    ],
  },

  {
    id: "vowed-vaguely",
    backgroundId: "apartment",
    mood: "tense",
    presentCharacterIds: ["the-partner", "inner-voice"],
    dialog: [
      {
        speakerId: "the-partner",
        text: '"... Okay. I would prefer something specific. A vow to be more present is — you have made that vow to me before. What will be different this time?"',
        emotion: "serious",
      },
      {
        speakerId: "inner-voice",
        text: "The partner named the vapour. The correction is fair. Offer a specific structural commitment.",
        emotion: "knowing",
      },
    ],
    choices: [
      {
        id: "propose-sunday-hour",
        text: "Propose the specific — Saturday afternoons, three to four, just the two of us.",
        tactic: "The structural specific. A time, a shape, a bound.",
        nextSceneId: "structural-proposed",
        isOptimal: true,
      },
    ],
  },

  // ===================================================================
  // ENDINGS
  // ===================================================================
  {
    id: "ending-fifteen-year-thank-you",
    backgroundId: "apartment",
    mood: "peaceful",
    isEnding: true,
    outcomeType: "good",
    endingTitle: "The Fifteen-Year Thank You",
    endingLearnPrompt:
      "Both of you, across thirteen years of operation, were carrying specific unnamed acts of the other. The obsidian move is the symmetric naming in daylight. The marriage was not actually less intact than you feared — it was carrying two specific thank-yous that neither of you had said. The conversation at 6:47 a.m. said them.",
    dialog: [
      {
        speakerId: null,
        text: "The coffee is cold. Neither of you has moved. The kitchen is quiet in a way that is, specifically, different from the way it was quiet at 6:47 — not the quiet of two exhausted people, but the quiet of two people who have just said a sentence each across the table.",
      },
      {
        speakerId: "inner-voice",
        text: "The marriage held. The operation held the marriage. The specific seeing, named aloud, will be — across the next decade — the thing either of you will remember. Not the child. Not the log. The sentence about the couch. The sentence about the three weeks off.",
        emotion: "knowing",
      },
      {
        speakerId: null,
        text: "Saturday, three to four. Starting this week.",
      },
    ],
    choices: [],
  },

  {
    id: "ending-the-marriage-named",
    backgroundId: "apartment",
    mood: "peaceful",
    isEnding: true,
    outcomeType: "good",
    endingTitle: "The Marriage Named",
    endingLearnPrompt:
      "The sentence was said, received, and met with a specific structural commitment. Saturday three to four. An hour, every week, for both of you. The marriage has been named — not saved, because it was not dying, but named, which was the specific thing that had been missing. The obsidian path of the symmetric naming is still available; it will take another conversation.",
    dialog: [
      {
        speakerId: "inner-voice",
        text: "The conversation held. The commitment is structural. The marriage is in a different register than it was at 6:47 a.m. — quieter, more seen, more specific.",
        emotion: "knowing",
      },
    ],
    choices: [],
  },

  {
    id: "ending-door-closed",
    backgroundId: "apartment",
    mood: "cold",
    isEnding: true,
    outcomeType: "bad",
    endingTitle: "The Door Closed",
    failureBlogSlug: "architecture-of-control-how-emotional-dependency-is-built",
    failureBlogTitle: "The Architecture of Silence In Long Marriages",
    endingLearnPrompt:
      "The defence closed the door. The partner will not try the conversation again for months, possibly longer. The scenario does not declare the marriage over — it names the specific cost: a window of repair that existed at 6:47 a.m. and closed by 7:02. The window will, almost certainly, reopen. The cost of the close is that the next one is harder.",
    dialog: [
      {
        speakerId: "inner-voice",
        text: "The coffee is cold. The log is still open. Neither of you will bring this up again this week. You will both return to the operation. The operation will, as ever, hold. The marriage will be, as it was, quieter than it should be.",
        emotion: "serious",
      },
    ],
    choices: [],
  },
];

export const pcChild41: Scenario = {
  id: "pc-4-1",
  title: "The Marriage Question",
  tagline: "6:47 a.m. Sunday. The household log is open on the table. Your partner has been writing a sentence in their head since Thursday.",
  description:
    "Finn is eighteen. Lily is sixteen. The marriage has, across thirteen years of shared parenting, become the thing the operation is made of — or it has become something less than that, quietly. The scenario is not about the child. The scenario is the conversation across the kitchen table about what the marriage has become, and whether the specific naming of it can repair the shape of the next decade.",
  tier: "vip",
  track: "pc-child",
  level: 4,
  order: 1,
  estimatedMinutes: 15,
  difficulty: "advanced",
  category: "narcissist",
  xpReward: 500,
  badgeId: "the-marriage-named",
  startSceneId: "content-gate",
  prerequisites: ["pc-3-1"],
  tacticsLearned: [
    "Receive the sentence without pre-empting, defending, or deflecting",
    "Name the specific cost back — dated, concrete, not generic",
    "Propose a structural commitment (a time, a shape, a bound), not a vague vow",
    "Refuse to deflect to the child mid-marriage-conversation; the child is the environment, not the subject",
    "Accept the correction when the partner rebalances your proposal",
  ],
  redFlagsTaught: [
    "The operation-as-marriage substitution: when the shared project has replaced the alliance",
    "The physical softening move (reaching across the table) as a subtle refusal of the words",
    "The vague vow as vapour — a promise to 'be more present' is the genre the scenario refuses",
    "Deflection to the child as the easiest and most damaging move in a marriage-register conversation",
  ],
  characters: [INNER_VOICE, THE_PARTNER],
  scenes,
};

export default pcChild41;
