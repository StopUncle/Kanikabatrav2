/**
 * pc-5-1 — "The Legal Adult"
 *
 * PC-Child track, Level 5, order 1. Finn is twenty. He has been
 * out of the house for fourteen months. The specific incident
 * that prompted the nineteen-year boundary — a threat against his
 * sister, made in daylight, refused-to-take-back when asked — is
 * in the household log in your handwriting. Four months ago the
 * structural silence began: no contact, financial support
 * arranged through the trust so there is no gift-giving
 * dependency, a single specific condition named in writing for
 * any re-engagement.
 *
 * Tuesday night, 11:12 p.m. The phone rings. Finn.
 *
 * The scenario is not a reunion. It is a triage of three
 * sentences. The call has approximately one of four shapes. The
 * tell lands inside the first three sentences. The discipline
 * is: do not soften the named condition, do not reflex-refuse,
 * read the register, respond in the register the call is
 * actually in.
 *
 * Teaches:
 *  - The first-three-sentences rule — a pc-adult's approach-call
 *    shape is legible inside the opening move if you listen for
 *    the specific tells
 *  - The named-condition discipline: the condition for
 *    re-engagement was written down months ago; the condition
 *    holds regardless of the register of the call
 *  - The money-ask and the crisis-ask as the two specific
 *    manipulation shapes the pc-adult has most-practised
 *  - The rare genuine approach and what it looks like — the
 *    scenario takes this possibility seriously
 *  - The proportionate response — neither the wide-open reunion
 *    nor the reflex-refusal, but the specific in-person
 *    daylight meeting with the co-parent present
 *
 * Mandatory content gate. Voice: clinical restraint. The scenario
 * does not pretend this is easy. It also does not resolve into
 * healing; it resolves into accuracy.
 *
 * Voice: reference/KANIKA-VOICE.md and reference/TRACK-pc-child.md.
 */

import type { Scenario, Scene } from "../../types";
import { INNER_VOICE, THE_PARTNER, CHILD_5 } from "../../characters";

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
        text: "Content note. This scenario takes place fourteen months after a structural boundary with your twenty-year-old son. The scenario is not a reconciliation. It is one phone call, at 11:12 p.m. on a Tuesday, and the discipline of reading what the call actually is.",
      },
      {
        speakerId: null,
        text: "The register is clinical-parental: not cold, not warm, accurate. The scenario holds the possibility that the call is a genuine approach, and the possibility that it is a practised manipulation shape. Both are live. The move is not to pre-decide.",
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
        tactic: "Tuesday, 11:12 p.m. The phone rings on the nightstand. The name on the screen is Finn.",
        nextSceneId: "the-ring",
      },
      {
        id: "exit-gate",
        text: "Exit. Return when the conditions are right.",
        tactic: "The scenario will hold. A 11 p.m. triage-call is not something to run through unsettled.",
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
      "The opt-out is a complete move. The scenario will be here. The conditions you bring into a call with a twenty-year-old pc-adult after fourteen months of structural silence need your own bandwidth — the scenario is not one to half-run.",
    dialog: [
      {
        speakerId: "inner-voice",
        text: "Closed the gate. The scenario will be here.",
        emotion: "knowing",
      },
    ],
    choices: [],
  },

  // ===================================================================
  // THE RING
  // ===================================================================
  {
    id: "the-ring",
    backgroundId: "apartment",
    mood: "cold",
    presentCharacterIds: ["inner-voice"],
    dialog: [
      {
        speakerId: null,
        text: "Tuesday, 11:12 p.m. You and your partner are in bed, reading. The bedside light on your side is a single warm bulb. The partner's light is already off; they are halfway asleep. Your phone, on the nightstand, rings. The screen shows: FINN — mobile.",
      },
      {
        speakerId: null,
        text: "Fourteen months since the last contact. Four of those months structural: no text, no email, the specific condition for re-engagement named in writing and sent by recorded delivery three months ago. Acknowledged receipt. No reply.",
      },
      {
        speakerId: "inner-voice",
        text: "The phone rings. The question is not whether to answer; the question is what shape to answer in. The named condition for re-engagement was: a daytime in-person meeting, with your co-parent present, booked at least seven days in advance. An 11 p.m. phone call is not that condition being met.",
        emotion: "serious",
      },
    ],
    choices: [
      {
        id: "answer-in-register",
        text: "Answer. Listen to the first three sentences. Say nothing yourself until you have heard them.",
        tactic: "The triage move. The call's register will be legible inside the opening move. Answering does not collapse the condition; it reads the request. The move that would collapse the condition is agreeing to the meeting this call asks for.",
        nextSceneId: "first-three-sentences",
        isOptimal: true,
      },
      {
        id: "decline-then-text",
        text: "Decline the call. Text him: 'The channel is the in-person meeting with your mother and me. Email to book.'",
        tactic: "Structural. The decline plus the one-line text repeats the condition in writing. This is the textbook move when the 11 p.m. phone call is not itself the condition being met.",
        nextSceneId: "declined-structural",
        isOptimal: true,
        event: "restraint-shown",
      },
      {
        id: "let-voicemail",
        text: "Let it go to voicemail. Listen in the morning.",
        tactic: "Valid as a regulation move — you are not obliged to answer at 11 p.m. But the morning listen is its own decision-point, and delaying does not change the shape of the call or the correct response.",
        nextSceneId: "voicemail-morning",
        isOptimal: false,
      },
      {
        id: "wake-partner",
        text: "Wake your partner. Decide together before answering.",
        tactic: "The co-parent consultation is the right instinct. The execution is off: a sleeping partner at 11 p.m. cannot calibrate in thirty seconds. Decline the call, text the condition, brief the partner in the morning.",
        nextSceneId: "woke-partner",
        isOptimal: false,
      },
    ],
  },

  // ===================================================================
  // FIRST THREE SENTENCES
  // ===================================================================
  {
    id: "first-three-sentences",
    backgroundId: "apartment",
    mood: "cold",
    presentCharacterIds: ["child-5", "inner-voice"],
    dialog: [
      {
        speakerId: null,
        text: "You answer. You say nothing. There is a two-second pause at the other end, then:",
      },
      {
        speakerId: "child-5",
        text: '"Hey. Look — sorry about the hour. I am in a bit of a situation and I did not know who else to call. I am in Manchester and I need fifteen hundred by tomorrow morning or it gets — it gets bigger."',
        emotion: "concerned",
      },
      {
        speakerId: "inner-voice",
        text: "The three sentences are the tell. The shape: an apology for the timing, a claim of nowhere-else-to-turn, a specific money amount with a specific deadline and a vague escalation. This is the crisis-ask register. You have seen the specific shape before — once at seventeen in a taxi at 3 a.m., and once at eighteen in a campus phone booth. The amounts were different; the shape is the same.",
        emotion: "knowing",
      },
    ],
    choices: [
      {
        id: "name-the-shape",
        text: '"I hear you. I am not transferring money on this call. The channel is the daytime meeting — tell me what the situation actually is, in one sentence, and I will decide from there."',
        tactic: "Name the money-ask refusal inside the first response. Then redirect to the condition. The 'what is the situation actually' question gives him one attempt to either provide a real specific or to re-run the vague escalation; both produce information.",
        nextSceneId: "asked-the-specific",
        isOptimal: true,
      },
      {
        id: "transfer-the-money",
        text: '"How do I send it — bank app or card?"',
        tactic: "The transfer is the specific manipulation shape's designed outcome. The fifteen hundred will not be what stops the situation from 'getting bigger'; it will be the funding of the next call. The boundary just collapsed.",
        nextSceneId: "money-sent",
        isOptimal: false,
      },
      {
        id: "ask-is-this-real",
        text: '"Is this real, Finn? Is this actually a situation, or are you running the same shape as the taxi?"',
        tactic: "The naming of the pattern is on-register. The risk: it can be heard as gatekeeping-grief when the call is genuine. Better to name the refusal first, then ask the question. The order matters.",
        nextSceneId: "named-the-pattern",
        isOptimal: false,
      },
      {
        id: "transfer-smaller",
        text: '"I can send you two hundred tonight to tide you over, we can talk properly tomorrow."',
        tactic: "The compromise-transfer is the worst of both worlds. It trains the pattern that the number is negotiable and that a phone call at 11 p.m. produces money. The smaller figure is not a moderate response; it is the designed outcome at a slight discount.",
        nextSceneId: "compromised-transfer",
        isOptimal: false,
      },
    ],
  },

  // ===================================================================
  // ASKED THE SPECIFIC — KEY TRIAGE
  // ===================================================================
  {
    id: "asked-the-specific",
    backgroundId: "apartment",
    mood: "cold",
    presentCharacterIds: ["child-5", "inner-voice"],
    dialog: [
      {
        speakerId: null,
        text: "A pause. Four seconds. Longer than the first pause. Then:",
      },
      {
        speakerId: "child-5",
        text: '"It is — someone I owe money to is going to come to my flat tomorrow morning if I do not pay. I do not want to say who. It is not drugs. I just need — I need this to go away."',
        emotion: "concerned",
      },
      {
        speakerId: "inner-voice",
        text: "The answer is a slight upgrade on the initial vague — 'someone' and a location and a morning deadline. It is still structurally vague. A real emergency, in most cases, has specifics; it has a name, a number, a text you could screenshot. The refusal to specify is itself the second tell.",
        emotion: "knowing",
      },
    ],
    choices: [
      {
        id: "hold-condition",
        text: '"The channel is the daytime meeting. If this is real, it can be discussed with your mother and me in person at a time we book. No money is going out tonight."',
        tactic: "The held condition. The scenario's primary discipline: the condition you named three months ago does not adjust to the register of the call. Whether this is a manipulation or a genuine crisis does not change the channel.",
        nextSceneId: "condition-held",
        isOptimal: true,
        event: "failure-rejected",
      },
      {
        id: "propose-alternative-route",
        text: '"If this is genuine, call the police — they handle extortion. If it is not extortion, tell me what it actually is."',
        tactic: "The police suggestion is correct in spirit but will end the call within one minute. The scenario's question is about the channel, not the outside referral. Closer to the structural answer — hold the condition — than the hand-off, but not as tight.",
        nextSceneId: "police-suggested",
        isOptimal: false,
      },
    ],
  },

  // ===================================================================
  // CONDITION HELD
  // ===================================================================
  {
    id: "condition-held",
    backgroundId: "apartment",
    mood: "cold",
    presentCharacterIds: ["child-5", "inner-voice"],
    dialog: [
      {
        speakerId: null,
        text: "Another pause. Longer. Then:",
      },
      {
        speakerId: "child-5",
        text: '"... Alright. I thought you would say that. I — OK. Can we actually do the meeting. The one in the letter."',
        emotion: "neutral",
      },
      {
        speakerId: "inner-voice",
        text: "The register just shifted. 'I thought you would say that' is the specific giveaway — he had rehearsed the scenario both ways, and is now pivoting to the other path. The question is whether the pivot is performance (he will cancel the meeting when no money comes), or whether the structural refusal, held clean, just opened the actual channel.",
        emotion: "knowing",
      },
      {
        speakerId: "inner-voice",
        text: "You will not know which until the meeting happens or does not. The move is the same either way: book the meeting inside the named conditions and let the follow-through be the actual signal.",
        emotion: "knowing",
      },
    ],
    choices: [
      {
        id: "book-specific-meeting",
        text: '"Good. Saturday at 11 a.m., the cafe on George Street — your mother and me, forty-five minutes. Confirm by email in the next forty-eight hours or the slot releases."',
        tactic: "The structural proposal. Specific time, specific place, specific window for confirmation, specific consequence if unconfirmed. The consequences are not punitive; they are operational. This is the whole skill.",
        nextSceneId: "meeting-proposed",
        isOptimal: true,
      },
      {
        id: "offer-vague-next-week",
        text: '"Yes — let us do it next week, I will find a time."',
        tactic: "The vague offer. The vagueness is indulgent and sets up the same 11 p.m. call again to 'confirm the time.' Book the specific slot now.",
        nextSceneId: "vague-meeting-offered",
        isOptimal: false,
      },
    ],
  },

  // ===================================================================
  // MEETING PROPOSED
  // ===================================================================
  {
    id: "meeting-proposed",
    backgroundId: "apartment",
    mood: "cold",
    presentCharacterIds: ["child-5", "inner-voice"],
    dialog: [
      {
        speakerId: "child-5",
        text: '"Saturday 11 works. I will email to confirm."',
        emotion: "neutral",
      },
      {
        speakerId: null,
        text: "The call ends at 11:19 p.m. Seven minutes. You put the phone face-down on the nightstand. Your partner, who has been awake since the second sentence of the call, looks at you.",
      },
      {
        speakerId: "the-partner",
        text: '"Held. Well held. Email or not?"',
        emotion: "knowing",
      },
    ],
    choices: [
      {
        id: "wait-on-email",
        text: '"We will see. If the email comes, Saturday happens. If it does not, the slot releases and we do not re-raise it. I am going to log the call now."',
        tactic: "The structural close. The follow-through is the signal; the log is the record. Both live in your operational surface, not in rumination.",
        nextSceneId: "log-and-close",
        isOptimal: true,
      },
      {
        id: "assume-he-will",
        text: '"He will. The pivot was real."',
        tactic: "Pre-deciding is optimistic and cheap. The signal is in the email arriving, not in your read of his voice. Hold the wait.",
        nextSceneId: "pre-decided-positive",
        isOptimal: false,
      },
      {
        id: "assume-he-wont",
        text: '"He will not. He never does. I will not be disappointed."',
        tactic: "Pre-deciding cynical has the same problem as pre-deciding optimistic. Let the signal be the signal.",
        nextSceneId: "pre-decided-negative",
        isOptimal: false,
      },
    ],
  },

  // ===================================================================
  // LOG AND CLOSE — BEST-PATH ENDING
  // ===================================================================
  {
    id: "log-and-close",
    backgroundId: "apartment",
    mood: "peaceful",
    presentCharacterIds: ["inner-voice"],
    dialog: [
      {
        speakerId: null,
        text: "11:26 p.m. You open the shared log on the laptop. You date the entry. You write: 'Finn called from Manchester, 11:12 p.m. Requested fifteen hundred citing non-specific extortion. Refused money; held named condition; proposed Saturday 11 a.m. cafe-on-George-Street with co-parent present, 45 min, 48h confirm window. Call ended 11:19 p.m. Confirm-email pending.' You save. You close the laptop.",
      },
      {
        speakerId: null,
        text: "Your partner turns their light off. You turn yours off. The room is dark. Neither of you says anything for a minute. Then your partner, across the pillow:",
      },
      {
        speakerId: "the-partner",
        text: '"If he emails, we will go. If he does not, we will not chase. Goodnight."',
        emotion: "knowing",
      },
    ],
    choices: [
      {
        id: "the-twenty-year-door-close",
        text: "Goodnight.",
        tactic: "The whole discipline was seven minutes of phone, one log entry, and the agreement with your partner not to chase. The scenario closes on the nightstand and the held position.",
        nextSceneId: "ending-twenty-year-door",
        isOptimal: true,
      },
    ],
  },

  // ===================================================================
  // DECLINED-STRUCTURAL PATH (OTHER BEST ENDING)
  // ===================================================================
  {
    id: "declined-structural",
    backgroundId: "apartment",
    mood: "peaceful",
    presentCharacterIds: ["inner-voice"],
    dialog: [
      {
        speakerId: null,
        text: "You decline the call. You send the text. 11:13 p.m. The phone shows 'Delivered' and then 'Read' at 11:13. No reply.",
      },
      {
        speakerId: "inner-voice",
        text: "The read-receipt is itself a piece of information. He saw the text. He did not reply. The condition stands. The next move belongs to him — email to book the meeting, or silence.",
        emotion: "knowing",
      },
      {
        speakerId: null,
        text: "You wake your partner briefly to brief them. Two sentences. They nod and roll back into sleep.",
      },
    ],
    choices: [
      {
        id: "log-the-call",
        text: "Log the missed call + text response in the shared log. Light off. Sleep.",
        tactic: "Log, close, hold. The structural decline is the cleanest version of this call and the log closes the loop.",
        nextSceneId: "ending-specific-boundary-held",
        isOptimal: true,
      },
    ],
  },

  // ===================================================================
  // FAILURE BRANCHES
  // ===================================================================
  {
    id: "money-sent",
    backgroundId: "apartment",
    mood: "cold",
    presentCharacterIds: ["inner-voice"],
    dialog: [
      {
        speakerId: null,
        text: "You send the fifteen hundred. Bank app, instant. Finn thanks you in two short sentences, says he will call tomorrow, ends the call at 11:16.",
      },
      {
        speakerId: "inner-voice",
        text: "Tomorrow will not produce a call. If a call does come, it will be in approximately four weeks. The amount will be slightly larger. The deadline slightly tighter. The vague escalation slightly more elaborate. You have just funded the next iteration.",
        emotion: "serious",
      },
      {
        speakerId: null,
        text: "Your partner has been awake since sentence two. Their silence is the information you need.",
      },
    ],
    choices: [
      {
        id: "log-the-miss",
        text: "Log the money sent, the amount, the reason given, the predicted next call date. The recovery starts with the record.",
        tactic: "A logged failure is countable; an unlogged one becomes a pattern. The money is gone. The record makes the next decision more available.",
        nextSceneId: "ending-money-sent",
        isOptimal: true,
      },
      {
        id: "tell-partner-later",
        text: "Do not tell your partner tonight. Handle it internally.",
        tactic: "The specific failure-compounder. The partner was a partner on this exact condition; withholding converts one failure into two.",
        nextSceneId: "ending-withheld-from-partner",
        isOptimal: false,
      },
    ],
  },

  {
    id: "named-the-pattern",
    backgroundId: "apartment",
    mood: "tense",
    presentCharacterIds: ["child-5", "inner-voice"],
    dialog: [
      {
        speakerId: "child-5",
        text: '"... Wow. OK. So I finally call for actual help and you are reading me the pattern. Good to know where I stand."',
        emotion: "sad",
      },
      {
        speakerId: "inner-voice",
        text: "The shape of the response is itself a tell — the injured-retreat move is well-practised. But — importantly — it is also how a genuine call could be received here. The naming was on-register; the timing was before the refusal, which inverted the order.",
        emotion: "knowing",
      },
    ],
    choices: [
      {
        id: "recover-hold-condition",
        text: '"The refusal on money stands. If this is real, come to the Saturday meeting — the one in the letter. We will talk about whatever it is then."',
        tactic: "The recovery move: hold the condition, do not defend the naming, open the correct channel.",
        nextSceneId: "condition-held",
        isOptimal: true,
      },
    ],
  },

  {
    id: "compromised-transfer",
    backgroundId: "apartment",
    mood: "cold",
    presentCharacterIds: ["inner-voice"],
    dialog: [
      {
        speakerId: null,
        text: "You transfer the two hundred. Finn thanks you, says the full amount can wait if you can send the rest on Friday, ends the call at 11:15 p.m.",
      },
      {
        speakerId: "inner-voice",
        text: "The two hundred will not stop the situation from 'getting bigger' — the situation was not real in those specifics. The two hundred did produce the Friday follow-up call. The compromise you offered is the shape the next three conversations will take.",
        emotion: "serious",
      },
    ],
    choices: [
      {
        id: "log-and-hold-next",
        text: "Log tonight. Friday: do not answer a non-booked call. The recovery is disciplined on the next contact, not in retroactive regret.",
        tactic: "The recovery discipline. You cannot recall the two hundred; you can not-answer Friday's unbooked call.",
        nextSceneId: "ending-compromised",
        isOptimal: true,
      },
    ],
  },

  {
    id: "police-suggested",
    backgroundId: "apartment",
    mood: "tense",
    presentCharacterIds: ["child-5", "inner-voice"],
    dialog: [
      {
        speakerId: "child-5",
        text: '"... Right. OK. I am not calling the police. Forget it."',
        emotion: "sad",
      },
      {
        speakerId: null,
        text: "He ends the call at 11:15 p.m.",
      },
      {
        speakerId: "inner-voice",
        text: "The hand-off closed the call without closing the loop. If this was the crisis-ask shape, you refused cleanly. If it was something in between, you missed the channel. The named condition was not named inside the call. Add it in a follow-up text.",
        emotion: "knowing",
      },
    ],
    choices: [
      {
        id: "follow-up-text",
        text: "Text in one line: 'If you want to talk about any of this, the channel is the Saturday meeting in the letter. Email to book.'",
        tactic: "Restore the channel in writing. The police suggestion was a legitimate move; the follow-up text makes the structural channel explicit.",
        nextSceneId: "ending-hand-off-recovered",
        isOptimal: true,
      },
    ],
  },

  {
    id: "voicemail-morning",
    backgroundId: "apartment",
    mood: "cold",
    presentCharacterIds: ["inner-voice"],
    dialog: [
      {
        speakerId: null,
        text: "Wednesday, 7:14 a.m. You listen to the voicemail with your partner present. It is four minutes long. The first three sentences are the same crisis-ask shape as the live call would have been. The next three minutes are progressively more elaborate — a detail about a flatmate, a specific street name in Manchester, a vague reference to 'something worse if I cannot sort this.'",
      },
      {
        speakerId: "inner-voice",
        text: "The voicemail lets you triage with your partner in daylight and without the 11 p.m. adrenaline. This was an advantage of waiting. The disadvantage is that the named condition was not stated inside the call, and eight hours of silence has passed.",
        emotion: "knowing",
      },
    ],
    choices: [
      {
        id: "text-the-condition-now",
        text: "Text the condition now, from the daylight, briefly. 'Heard the message. Channel is the Saturday meeting in the letter. Email to book.'",
        tactic: "The structural condition in writing. Short. Specific. Does not engage the content of the voicemail.",
        nextSceneId: "ending-voicemail-structural",
        isOptimal: true,
      },
      {
        id: "call-him-back-empathic",
        text: "Call him back. Lead with empathy. Ask if he is safe.",
        tactic: "The empathy-lead is warm but converts the channel. The voicemail was a pressure move; returning the call from a position of concern re-opens the register the structural boundary was built to close.",
        nextSceneId: "empathy-led",
        isOptimal: false,
      },
    ],
  },

  {
    id: "empathy-led",
    backgroundId: "apartment",
    mood: "tense",
    presentCharacterIds: ["inner-voice"],
    dialog: [
      {
        speakerId: "inner-voice",
        text: "The call returns. Finn is warm. He is grateful. He asks about the money again inside the first ninety seconds. The empathy-lead did not produce a re-frame; it produced an easier run at the ask.",
        emotion: "serious",
      },
    ],
    choices: [
      {
        id: "recover-to-condition",
        text: '"I hear you. The channel is the Saturday meeting. No money on this call. Email to book."',
        tactic: "Late-but-not-too-late recovery. The empathy-lead slipped the register; the condition re-asserted in the third minute brings it back.",
        nextSceneId: "condition-held",
        isOptimal: true,
      },
    ],
  },

  {
    id: "woke-partner",
    backgroundId: "apartment",
    mood: "tense",
    presentCharacterIds: ["the-partner", "inner-voice"],
    dialog: [
      {
        speakerId: "the-partner",
        text: '"Decline. Text the condition. We will talk in the morning. Nothing good will come from a 11 p.m. decision."',
        emotion: "knowing",
      },
      {
        speakerId: "inner-voice",
        text: "The partner, half-asleep, produced the correct answer in one sentence. The move is to trust it.",
        emotion: "knowing",
      },
    ],
    choices: [
      {
        id: "do-as-partner-said",
        text: "Decline the call. Text the condition. Light off.",
        tactic: "Execute the co-parent's clear answer.",
        nextSceneId: "declined-structural",
        isOptimal: true,
      },
    ],
  },

  {
    id: "vague-meeting-offered",
    backgroundId: "apartment",
    mood: "tense",
    presentCharacterIds: ["child-5", "inner-voice"],
    dialog: [
      {
        speakerId: "child-5",
        text: '"Cool, cool. I will text you to sort the time."',
        emotion: "neutral",
      },
      {
        speakerId: "inner-voice",
        text: "The vague will produce the follow-up call to 'sort the time.' The slot not being specific is the specific failure. Firm it up inside this call.",
        emotion: "knowing",
      },
    ],
    choices: [
      {
        id: "firm-up-now",
        text: '"Actually — Saturday 11 a.m., cafe on George Street, your mother and me, forty-five minutes. Confirm in 48h or the slot releases."',
        tactic: "Firm up on the first correction, not via the follow-up call.",
        nextSceneId: "meeting-proposed",
        isOptimal: true,
      },
    ],
  },

  {
    id: "pre-decided-positive",
    backgroundId: "apartment",
    mood: "cold",
    presentCharacterIds: ["inner-voice"],
    dialog: [
      {
        speakerId: "inner-voice",
        text: "The optimistic pre-decide set you up to read every hour without the email as evidence that something has gone wrong. The email either comes or does not. Your internal weather across the 48 hours does not change that.",
        emotion: "knowing",
      },
    ],
    choices: [
      {
        id: "drop-the-pre-decide",
        text: "Drop the pre-decide. Log the call, light off, carry on with the week.",
        tactic: "Correction: return to operational neutrality.",
        nextSceneId: "ending-twenty-year-door",
        isOptimal: true,
      },
    ],
  },

  {
    id: "pre-decided-negative",
    backgroundId: "apartment",
    mood: "cold",
    presentCharacterIds: ["inner-voice"],
    dialog: [
      {
        speakerId: "inner-voice",
        text: "The cynical pre-decide is protective but it is also pre-authoring. If he emails and the meeting happens, you will have walked into Saturday braced for a collapse that does not arrive — and that bracing will be visible at the cafe.",
        emotion: "knowing",
      },
    ],
    choices: [
      {
        id: "drop-the-pre-decide-negative",
        text: "Drop the pre-decide. Hold operational neutrality.",
        tactic: "Correction: return to operational neutrality.",
        nextSceneId: "ending-twenty-year-door",
        isOptimal: true,
      },
    ],
  },

  // ===================================================================
  // ENDINGS
  // ===================================================================
  {
    id: "ending-twenty-year-door",
    backgroundId: "apartment",
    mood: "peaceful",
    isEnding: true,
    outcomeType: "good",
    endingTitle: "The Door Named, Not Opened",
    endingLearnPrompt:
      "The twenty-year conversation does not happen on a 11 p.m. phone call. It happens — if it happens — in a daytime meeting you named three months ago in writing. The discipline is to hold the named condition regardless of the register of the call: whether the call is a manipulation shape or a rare genuine approach, the channel is the same. The rare genuine approach will walk through the named channel. The manipulation shape will not. Either way, the answer is the named channel.",
    dialog: [
      {
        speakerId: "inner-voice",
        text: "The Saturday will happen or it will not. The email will come or it will not. The log is written. The partner is briefed. The lights are off. The twenty-year door was named, not opened, tonight — which is the only version of opening it that is not a collapse of the next twenty years.",
        emotion: "knowing",
      },
    ],
    choices: [],
  },

  {
    id: "ending-specific-boundary-held",
    backgroundId: "apartment",
    mood: "peaceful",
    isEnding: true,
    outcomeType: "good",
    endingTitle: "The Structural Decline",
    endingLearnPrompt:
      "Declining the call and restoring the channel in a one-line text is the cleanest version of the Tuesday-night triage. The signal lives entirely in your next forty-eight hours: email arrives, meeting happens; no email, no meeting, no chase. The structural decline is the textbook move when the call at 11 p.m. is not itself the named condition being met.",
    dialog: [
      {
        speakerId: "inner-voice",
        text: "Logged, lights off, conditions intact. The Saturday exists in the calendar only if the email arrives. The nineteen-year boundary was load-bearing because you held it — on an 11 p.m. call, at a forty-nine-year-old's bedtime, with your partner breathing quietly across the pillow.",
        emotion: "knowing",
      },
    ],
    choices: [],
  },

  {
    id: "ending-money-sent",
    backgroundId: "apartment",
    mood: "cold",
    isEnding: true,
    outcomeType: "bad",
    endingTitle: "The Funded Iteration",
    failureBlogSlug: "architecture-of-control-how-emotional-dependency-is-built",
    failureBlogTitle: "Architecture of Control — How Emotional Dependency Is Built",
    endingLearnPrompt:
      "The fifteen hundred does not resolve the situation the call described. It funds the next iteration of the call — approximately four weeks out, with a slightly larger number and a tighter deadline. The nineteen-year boundary is not broken by the money; it is broken by the precedent the money set. The recovery is the log tonight and the held-position on the next call.",
    dialog: [
      {
        speakerId: "inner-voice",
        text: "The money is gone. The next call is in the calendar in approximately four weeks. The log is the record. The partner is briefed. The recovery begins on the next contact, which will test whether the log made the next decision more available.",
        emotion: "serious",
      },
    ],
    choices: [],
  },

  {
    id: "ending-withheld-from-partner",
    backgroundId: "apartment",
    mood: "cold",
    isEnding: true,
    outcomeType: "bad",
    endingTitle: "Withheld From The Co-Parent",
    endingLearnPrompt:
      "Withholding the money-send from your partner is the specific move that converts one operational failure into two. The co-parent was the co-parent on this exact condition. The withholding is itself the pc-adult's triangulation shape being executed through you — separating you from the one person whose presence made the boundary load-bearing.",
    dialog: [
      {
        speakerId: "inner-voice",
        text: "Two failures. The money, and the withholding. The triangulation is running now with the parent as vector, not as target. The recovery is a conversation with your partner tomorrow morning — a specific one, named as 'I need to tell you what I did last night and why it was a mistake.'",
        emotion: "serious",
        event: "tactic-named:triangulation",
      },
    ],
    choices: [],
  },

  {
    id: "ending-compromised",
    backgroundId: "apartment",
    mood: "cold",
    isEnding: true,
    outcomeType: "neutral",
    endingTitle: "The Two Hundred",
    endingLearnPrompt:
      "Two hundred is not a moderate position between zero and fifteen hundred; it is the designed outcome at a slight discount. The Friday call will happen. The recovery is not-answering the unbooked Friday call and restoring the channel in writing. The boundary can be held-forward from here; it cannot be un-compromised for tonight.",
    dialog: [
      {
        speakerId: "inner-voice",
        text: "Two hundred sent. Friday in the calendar as a test. The log carries both the send and the commitment to not-answer. The pattern is legible; the correction is available.",
        emotion: "knowing",
      },
    ],
    choices: [],
  },

  {
    id: "ending-hand-off-recovered",
    backgroundId: "apartment",
    mood: "cold",
    isEnding: true,
    outcomeType: "neutral",
    endingTitle: "The Channel Re-stated",
    endingLearnPrompt:
      "The police suggestion ended the call without naming the channel. The follow-up text restores the structural condition in writing within ten minutes, which is the window in which the re-statement reads as intentional rather than apologetic. The scenario resolves similarly to the held-condition path, with slightly less operational cleanliness.",
    dialog: [
      {
        speakerId: "inner-voice",
        text: "Channel re-stated. Log written. Saturday exists in the calendar only if the email arrives. The hand-off was a slightly clunkier version of the structural decline; the ending is similar.",
        emotion: "knowing",
      },
    ],
    choices: [],
  },

  {
    id: "ending-voicemail-structural",
    backgroundId: "apartment",
    mood: "peaceful",
    isEnding: true,
    outcomeType: "good",
    endingTitle: "The Morning Channel",
    endingLearnPrompt:
      "The wait-on-voicemail trade-off: you lose the live-register read; you gain the daylight-plus-partner triage. The morning text restoring the channel in writing is operationally equivalent to the live-decline path, with the quieter cost that eight hours of silence has passed. Not a failure; a different version of the correct shape.",
    dialog: [
      {
        speakerId: "inner-voice",
        text: "Text out. Channel re-stated in daylight. Partner briefed in full. The Saturday lives in the calendar only if the email comes. The next twenty years of the door hinge on the same answer.",
        emotion: "knowing",
      },
    ],
    choices: [],
  },
];

export const pcChild51: Scenario = {
  id: "pc-5-1",
  title: "The Legal Adult",
  tagline: "Tuesday, 11:12 p.m. The phone rings. The name on the screen is Finn.",
  description:
    "Finn is twenty. Fourteen months since the last contact, four of them structural. A named condition for re-engagement was sent in writing three months ago. Tonight the phone rings at 11:12 p.m. The scenario is not a reunion. It is seven minutes of triage — read the first three sentences, hold the named condition regardless of the call's register, close the loop with a log entry, and leave the Saturday meeting to be the meeting it was always going to be, or the one it was never going to be.",
  tier: "vip",
  track: "pc-child",
  level: 5,
  order: 1,
  estimatedMinutes: 16,
  difficulty: "advanced",
  category: "narcissist",
  xpReward: 500,
  badgeId: "the-twenty-year-door",
  startSceneId: "content-gate",
  prerequisites: ["pc-4-1"],
  tacticsLearned: [
    "The first-three-sentences triage — a pc-adult's call shape is legible in the opening move",
    "Hold the named condition regardless of the call's register — the condition was named in writing months ago, it does not adjust tonight",
    "The specific-slot meeting proposal: time, place, window-to-confirm, consequence-if-unconfirmed",
    "Log the call in the shared document with the specific prediction (next-call date, amount, shape) so the next decision is pre-available",
    "Brief the co-parent inside the same night — withholding converts one failure into two",
  ],
  redFlagsTaught: [
    "The crisis-ask shape: apology for the hour, claim of nowhere-else, specific amount + vague escalation",
    "The compromise-transfer as the designed outcome at a slight discount",
    "The empathy-lead return call that re-opens the register the boundary was built to close",
    "The vague meeting offer that produces the follow-up 11 p.m. call to 'sort the time'",
    "Pre-deciding (optimistic or cynical) the outcome of the confirmation window — both forms of pre-authoring",
  ],
  characters: [INNER_VOICE, THE_PARTNER, CHILD_5],
  scenes,
};

export default pcChild51;
