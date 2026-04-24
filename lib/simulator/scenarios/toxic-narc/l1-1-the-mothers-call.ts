/**
 * tn-1-1 — "The Mother's Call"
 *
 * Toxic Narcissist track, Level 1, order 1. Voice-lock scenario for
 * the whole track. Everyday-life narcissism — not Maris's cold
 * professional register, but the louder, messier, more familial one
 * every Kanika reader has at least one of.
 *
 * The Mother is canon — same character as in the Maris-arc L8 and
 * L11 scenarios. This scenario is set BEFORE those events, when the
 * protagonist is still actively pulled by the calls. Long-time
 * players will recognise her voice; new players meet her here and
 * carry the recognition into L11 later.
 *
 * Teaches:
 *  - The three performance registers of an everyday narc (cryer /
 *    rager / martyr) and how to identify each in under 30 seconds
 *  - Voice calls are the narc's home field; text is yours
 *  - The 48-hour rule — never decide anything in the first 48 hours
 *    of a contact attempt
 *  - The specific grief of declining your own mother
 *
 * Voice: reference/KANIKA-VOICE.md and reference/TRACK-toxic-narc.md.
 */

import type { Scenario, Scene } from "../../types";
import {
  INNER_VOICE,
  THE_MOTHER,
  PRIYA,
  GOLDEN_SIBLING,
} from "../../characters";

const scenes: Scene[] = [
  // ===================================================================
  // ACT 1 — the ring
  // ===================================================================
  {
    id: "dinner-interrupted",
    backgroundId: "apartment",
    mood: "peaceful",
    dialog: [
      {
        speakerId: null,
        text: "Sunday, 7:42 p.m. You are at your kitchen counter eating dinner standing up — a habit you have been meaning to address for about a year. The pasta is, in fact, acceptable. The wine is acceptable. The kitchen is warm. The eleven days since you last picked up have been, by a certain measure, rather good for you.",
      },
      {
        speakerId: null,
        text: "Your phone rings. You do not need to look at the screen. You know the ringtone because you gave her a different one from everyone else specifically so you would always know.",
      },
      {
        speakerId: "inner-voice",
        text: "Note the physiological shift in your body before you have made any decision. Shoulders tightened half an inch. The fork paused. A specific thought arrived — 'something must be wrong,' which is the thought she has trained you to have about her calls for approximately thirty years. Nothing is wrong. She wants something.",
        emotion: "knowing",
      },
      {
        speakerId: "inner-voice",
        text: "You have four options in front of you, and only one of them involves hearing her voice. Pick the option that serves the version of you who will still be in this kitchen when the call is over — not the version of you who needs the call to be over in the fastest available way.",
        emotion: "knowing",
      },
    ],
    choices: [
      {
        id: "answer-it",
        text: "Answer it. Eleven days is long enough. If it's bad news, you want to hear it directly.",
        tactic: "Voice is her home field. Whatever she has prepared, she has prepared for a phone call — register, cadence, the specific pauses. Answer only if you have prepared back.",
        nextSceneId: "answered-cold",
      },
      {
        id: "decline-silent",
        text: "Press decline. Do not text. Keep eating.",
        tactic: "The cleanest decline. No explanation, no justification, no door left open. She will re-attempt; the point is not to win forever but to win tonight.",
        nextSceneId: "declined-silent",
        isOptimal: true,
      },
      {
        id: "decline-with-text",
        text: "Decline and send a text: 'Can't right now — everything okay?'",
        tactic: "Opens a channel you just closed. The question at the end invites the martyr register in writing. She will compose a response that is engineered to make you call back.",
        nextSceneId: "declined-with-text",
      },
      {
        id: "let-it-go-to-voicemail",
        text: "Do nothing. Let the phone ring out. Keep eating.",
        tactic: "Passive decline is still decline. The voicemail she leaves will be part of the data; you can read it at 10 p.m. instead of 7:43.",
        nextSceneId: "voicemail-left",
        isOptimal: true,
      },
    ],
  },

  // ===================================================================
  // ACT 2A — answered
  // ===================================================================
  {
    id: "answered-cold",
    backgroundId: "apartment",
    mood: "tense",
    presentCharacterIds: ["mother"],
    immersionTrigger: "manipulation-detected",
    dialog: [
      {
        speakerId: null,
        text: "You pick up. You do not say hello first. You wait for her to speak.",
      },
      {
        speakerId: "mother",
        text: "\"Oh. Oh, darling. You picked up. I'm — thank goodness. I've been quite worried.\"",
        emotion: "pleading",
      },
      {
        speakerId: "mother",
        text: "\"I'm sure you've been terribly busy. I do not mean to impose. I only wanted to hear your voice. I was beginning to think perhaps something had happened to you.\"",
        emotion: "pleading",
      },
      {
        speakerId: "inner-voice",
        text: "Name the move. That was the martyr register — self-deprecation as the opening lever ('I do not mean to impose'), coupled with a manufactured worry frame ('I was beginning to think perhaps something had happened to you') that retroactively recasts your eleven-day silence as a thing she suffered through. Everything she has said so far is engineered to make the next thing she asks for land as compensation rather than as a request.",
        emotion: "concerned",
      },
      {
        speakerId: "inner-voice",
        text: "You have approximately forty seconds before the actual ask arrives. Whatever it is, it will be framed as small. It will not be small.",
        emotion: "knowing",
      },
    ],
    choices: [
      {
        id: "match-coldness",
        text: '"I\'ve been fine. What do you need?"',
        tactic: "Skip the performance. Drive her to the ask in one sentence. Respects your own time; cheats her of the martyr runway.",
        nextSceneId: "mother-the-ask",
        isOptimal: true,
      },
      {
        id: "validate-her-worry",
        text: '"I\'m sorry if I worried you. I\'ve just been busy. Everything\'s fine."',
        tactic: "You apologised for her feeling. The channel is now wide open. She will spend the next twenty minutes in the worry frame before producing the ask.",
        nextSceneId: "mother-expands-worry",
      },
      {
        id: "name-the-frame",
        text: '"You weren\'t worried. What do you actually want?"',
        tactic: "Direct. Loud. Satisfying but costly — the frame-naming triggers the rager register in some mothers. Know your mother before picking this.",
        nextSceneId: "mother-pivots-rager",
      },
    ],
  },

  {
    id: "mother-the-ask",
    backgroundId: "apartment",
    mood: "tense",
    presentCharacterIds: ["mother"],
    dialog: [
      {
        speakerId: "mother",
        text: '"Well — I. Yes. Very well. Your cousin Cara is having her engagement party on the twenty-first, at the old house. I am hosting it, which is, frankly, far more work than I should be taking on at my age."',
        emotion: "serious",
      },
      {
        speakerId: "mother",
        text: '"I was rather hoping — and there is absolutely no obligation — that you would come, just for an hour or two. Cara would be so terribly pleased."',
        emotion: "pleading",
      },
      {
        speakerId: "inner-voice",
        text: "The ask arrived in the third sentence of the call. Clock the construction of it. One — 'far more work than I should be taking on at my age' plants the martyr framing so your decline costs you the guilt of having refused an aging mother. Two — 'there is absolutely no obligation' is the line you are meant to hear and then disregard. Three — 'Cara would be so terribly pleased' outsources the pressure to a cousin who, almost certainly, has no idea your mother is making this call.",
        emotion: "concerned",
      },
      {
        speakerId: "inner-voice",
        text: "Three manipulations in two sentences. Not hostile — this is how she always talks. She does not know she is doing it. That does not make the manipulations less effective.",
        emotion: "knowing",
      },
    ],
    choices: [
      {
        id: "warm-no",
        text: '"Thank you for thinking of me. I won\'t be able to make the twenty-first. I\'ll send Cara a card directly."',
        tactic: "The canonical response. Warm, bounded, closed. Re-routes the relationship with Cara through Cara, not through mother. Does not offer a reason. Does not open negotiation.",
        nextSceneId: "mother-tests-warm-no",
        isOptimal: true,
      },
      {
        id: "negotiate",
        text: '"Maybe for an hour. What time?"',
        tactic: "You opened the door. She will widen the scope — 'an hour' becomes 'dinner afterwards,' becomes 'staying the night because the drive is long,' becomes a weekend.",
        nextSceneId: "mother-widens-scope",
      },
      {
        id: "defer",
        text: '"Let me look at my calendar and get back to you within 48 hours."',
        tactic: "The 48-hour rule. Buys you the time she did not want you to have. She will not like it; that is data, not a reason to change the move.",
        nextSceneId: "mother-deferred",
        isOptimal: true,
      },
      {
        id: "accept",
        text: '"Of course I\'ll be there. I\'ll let you know what time I\'m arriving."',
        tactic: "Accepted under martyr-frame pressure. You will spend the next three weeks regretting it and the twenty-first itself wanting to leave early.",
        nextSceneId: "ending-booked-in",
        isOptimal: false,
      },
    ],
  },

  {
    id: "mother-tests-warm-no",
    backgroundId: "apartment",
    mood: "tense",
    presentCharacterIds: ["mother"],
    dialog: [
      {
        speakerId: "mother",
        text: '"Oh. Well — of course. If that is what you — I only. I had thought, perhaps, given that it has been so long, that —"',
        emotion: "sad",
      },
      {
        speakerId: "mother",
        text: '"No, no. I understand. I will tell Cara. I am sure she will be terribly disappointed, but I will tell her."',
        emotion: "sad",
      },
      {
        speakerId: "inner-voice",
        text: "The trailing dashes and the manufactured incompletions are the martyr register's second act — she is giving you the opportunity to rescue her from the disappointment by reversing. The sentence 'I am sure Cara will be terribly disappointed' is the frame she is installing for you to replay at 2 a.m. on Tuesday.",
        emotion: "knowing",
      },
      {
        speakerId: "inner-voice",
        text: "Your canonical move here is to close the channel in one more sentence and get off the phone. Do not apologise. Do not explain. Do not accept the transferred guilt.",
        emotion: "knowing",
      },
    ],
    choices: [
      {
        id: "close-channel",
        text: '"Thanks for calling. I\'ll talk to Cara directly. Have a good night."',
        tactic: "Close. No justification. She does not get to keep the phone.",
        nextSceneId: "ending-warm-no",
        isOptimal: true,
      },
      {
        id: "rescue-her",
        text: '"Mum — don\'t tell Cara that. Okay, I\'ll come. Just for an hour."',
        tactic: "The reversal. The martyr register worked; you paid for it; the twenty-first is now in your calendar.",
        nextSceneId: "ending-lured-back",
        isOptimal: false,
      },
      {
        id: "one-sentence-close",
        text: '"I love you. I\'m going to go. We can talk another time."',
        tactic: "Warmer close. Includes a sentence of real affection. Still closes. Use when you have the capacity for it; not a requirement.",
        nextSceneId: "ending-warm-no",
        isOptimal: true,
      },
    ],
  },

  {
    id: "mother-widens-scope",
    backgroundId: "apartment",
    mood: "danger",
    presentCharacterIds: ["mother"],
    immersionTrigger: "manipulation-detected",
    dialog: [
      {
        speakerId: "mother",
        text: '"Oh, wonderful. Starts at four. And, darling, could you perhaps come a bit earlier — I do need help with the flowers, and you know Ren has never had any sense for arrangement."',
        emotion: "hopeful",
      },
      {
        speakerId: "mother",
        text: '"And of course you must stay for dinner. The drive home that late is quite unsafe and the spare room is made up. Stay over. I insist."',
        emotion: "happy",
      },
      {
        speakerId: "inner-voice",
        text: "Twenty seconds. An hour became the full afternoon + dinner + a night in the spare room. This is not unusual — it is the standard scope-widening after any conditional acceptance. You said 'maybe an hour.' She heard 'yes, all in.' The widening arrives in small, reasonable-sounding increments. Each increment on its own sounds trivial; together they are the weekend.",
        emotion: "concerned",
      },
    ],
    choices: [
      {
        id: "retract-scope",
        text: '"Actually — I\'m going to come for exactly an hour. Four to five. I\'m not helping with flowers, I\'m not staying for dinner, and I\'m not sleeping over."',
        tactic: "Hold the line, explicitly, in the specific terms she tried to widen. She will not like it. The clarity is the protection.",
        nextSceneId: "ending-warm-no",
        isOptimal: true,
      },
      {
        id: "accept-all",
        text: '"Fine. I\'ll come early and stay over. Easier than arguing."',
        tactic: "You capitulated to avoid the confrontation. The weekend is now hers. You will leave feeling you did not, in fact, attend the party you agreed to attend.",
        nextSceneId: "ending-booked-in",
        isOptimal: false,
      },
    ],
  },

  {
    id: "mother-deferred",
    backgroundId: "apartment",
    mood: "tense",
    presentCharacterIds: ["mother"],
    dialog: [
      {
        speakerId: "mother",
        text: '"Forty-eight hours? For a family engagement? Darling, that is — I mean, I understand you are a modern woman, but this is your cousin, it is the old house, it is —"',
        emotion: "confused",
      },
      {
        speakerId: "mother",
        text: '"Well. I suppose. Of course. Do take your time."',
        emotion: "sad",
      },
      {
        speakerId: "inner-voice",
        text: "She ran the rager-adjacent register briefly ('modern woman' is a class-inflected jab, not a compliment), failed to get traction, and pivoted to a softer martyr closing. Both happened in the same breath. That is the range she operates in when she does not get what she asked for. Neither one obligates you to change your answer.",
        emotion: "knowing",
      },
      {
        speakerId: "inner-voice",
        text: "Hold the 48-hour window. Do not use it to 'think about the party.' Use it to do the thing you were doing before the phone rang. Decide at hour 47 whether to go, not at hour 2. Your answer will be better.",
        emotion: "knowing",
      },
    ],
    nextSceneId: "ending-deferred",
  },

  {
    id: "mother-expands-worry",
    backgroundId: "apartment",
    mood: "tense",
    presentCharacterIds: ["mother"],
    dialog: [
      {
        speakerId: "mother",
        text: "\"Oh, thank goodness you are fine. I had, honestly, begun to make arrangements for coming up to check on you myself. You know how I worry. After everything that happened with your uncle, one cannot be too careful.\"",
        emotion: "pleading",
      },
      {
        speakerId: "mother",
        text: '"I know you are busy. I am not asking for anything. I only — well. Cara is having her engagement party on the twenty-first..."',
        emotion: "pleading",
      },
      {
        speakerId: "inner-voice",
        text: "She just ran twelve minutes of worry-performance in forty seconds. 'Coming up to check on you myself' is a threat dressed as concern. 'After everything that happened with your uncle' is an invocation of family mortality to establish urgency. Then the pivot — 'I know you are busy, I am not asking for anything' — directly followed by the ask.",
        emotion: "concerned",
      },
      {
        speakerId: "inner-voice",
        text: "The worry frame did the labour. The ask arrived with a pre-built deflection against any decline ('I only').",
        emotion: "knowing",
      },
    ],
    nextSceneId: "mother-the-ask",
  },

  {
    id: "mother-pivots-rager",
    backgroundId: "apartment",
    mood: "danger",
    presentCharacterIds: ["mother"],
    immersionTrigger: "red-flag-revealed",
    dialog: [
      {
        speakerId: "mother",
        text: "\"How DARE you speak to me that way. I am your mother. Do you have any idea the sacrifices — thirty years, darling, THIRTY YEARS — and you have the nerve to —\"",
        emotion: "angry",
      },
      {
        speakerId: "inner-voice",
        text: "You named the frame. She pivoted from martyr to rager in one sentence. Both are available to her; she deploys whichever serves. Note the speed — under two seconds between 'oh darling' and 'HOW DARE YOU.' That is not an emotional woman losing control. That is a speaker switching registers.",
        emotion: "knowing",
      },
      {
        speakerId: "inner-voice",
        text: "The rager register does not actually require your response. She will talk herself down in approximately four minutes if you say nothing. You can also simply end the call — that is also allowed.",
        emotion: "knowing",
      },
    ],
    choices: [
      {
        id: "end-call",
        text: "\"I'm going to hang up. We can talk when you are calmer.\" Hang up.",
        tactic: "End the call. Do not apologise. Do not justify. The rager register has no runway without an audience.",
        nextSceneId: "ending-warm-no",
        isOptimal: true,
      },
      {
        id: "stay-silent",
        text: "Say nothing. Let her talk. Count how long it takes for her to downshift.",
        tactic: "Diagnostic silence. Some ragers exhaust in 90 seconds without input; some escalate. Know which yours is before picking this.",
        nextSceneId: "mother-downshifts",
      },
      {
        id: "apologise",
        text: '"I\'m sorry, I didn\'t mean to sound harsh. That came out wrong."',
        tactic: "The apology is what the rager register was extracting. You just paid for your own frame-naming.",
        nextSceneId: "mother-the-ask",
        isOptimal: false,
      },
    ],
  },

  {
    id: "mother-downshifts",
    backgroundId: "apartment",
    mood: "tense",
    presentCharacterIds: ["mother"],
    dialog: [
      {
        speakerId: null,
        text: "The rage lasts, you note carefully, exactly seventy-three seconds. She runs out of it like a kettle going off the boil. Then, in a completely different voice —",
      },
      {
        speakerId: "mother",
        text: '"Anyway. Cara\'s party is on the twenty-first. At the old house. I wanted to invite you."',
        emotion: "neutral",
      },
      {
        speakerId: "inner-voice",
        text: "The seventy-three seconds are a data point worth filing. You now know, for future contact attempts, approximately how long her rager register lasts without fuel. That is useful. Next time you can time your response to the downshift.",
        emotion: "knowing",
      },
    ],
    nextSceneId: "mother-the-ask",
  },

  // ===================================================================
  // ACT 2B — silent decline
  // ===================================================================
  {
    id: "declined-silent",
    backgroundId: "apartment",
    mood: "peaceful",
    dialog: [
      {
        speakerId: null,
        text: "You press decline. The ring stops. The kitchen is quiet again. Your pasta is still acceptable. You take another bite.",
      },
      {
        speakerId: "inner-voice",
        text: "The purest version of this scene. No text. No explanation. No justification. You declined a call. People decline calls from unknown numbers constantly and do not apologise to them. A mother's call is still a call. The silence of the decline is the point.",
        emotion: "knowing",
      },
      {
        speakerId: null,
        text: "Seventeen seconds later the phone rings again. She is calling a second time.",
      },
    ],
    choices: [
      {
        id: "decline-again",
        text: "Decline again. Do not answer the redial.",
        tactic: "The redial is a test. Answering it would reward the escalation and train her that two-calls-in-a-row is a working pattern.",
        nextSceneId: "voicemail-left",
        isOptimal: true,
      },
      {
        id: "answer-now",
        text: "Answer. The redial means it is actually important.",
        tactic: "The redial almost never means it is important. It means the first call did not produce the outcome she wanted.",
        nextSceneId: "answered-cold",
      },
      {
        id: "silence-phone",
        text: "Turn the phone to Do Not Disturb. Finish dinner in quiet.",
        tactic: "Protect the evening. Check voicemail later, at a time of your choosing, not at the time of hers.",
        nextSceneId: "ending-declined-clean",
        isOptimal: true,
      },
    ],
  },

  {
    id: "voicemail-left",
    backgroundId: "apartment",
    mood: "mysterious",
    dialog: [
      {
        speakerId: null,
        text: "At 8:07 p.m. the phone stops attempting. A voicemail notification arrives. The transcript begins: 'Darling, it is me. I do hope you are well. I was calling because —'",
      },
      {
        speakerId: "inner-voice",
        text: "You have a choice about when to read this. The voicemail is not going anywhere. Your nervous system is better-regulated at 10 p.m. than at 8 p.m. after a call attempt. Read it later. If you read it now, you will read it with the adrenaline of the interruption and that is not a reading, that is a reflex.",
        emotion: "knowing",
      },
    ],
    choices: [
      {
        id: "read-later",
        text: "Leave the notification. Finish dinner. Read it at 10 p.m.",
        tactic: "Time-shift your own reading to a nervous-system state of your choosing.",
        nextSceneId: "ending-declined-clean",
        isOptimal: true,
      },
      {
        id: "read-now",
        text: "Read the transcript now. You will not sleep otherwise.",
        tactic: "Self-fulfilling. The reading now is what produces the sleeplessness; not-reading would produce sleep.",
        nextSceneId: "voicemail-read-hot",
      },
      {
        id: "delete-unread",
        text: "Delete the voicemail without reading. Block the number for the night.",
        tactic: "The nuclear move. Looks decisive; costs you nothing that is worth anything; works if you actually execute and do not reverse it at 11 p.m.",
        nextSceneId: "ending-one-week-quiet",
        isOptimal: true,
      },
    ],
  },

  {
    id: "voicemail-read-hot",
    backgroundId: "apartment",
    mood: "tense",
    dialog: [
      {
        speakerId: null,
        text: "You read the transcript. It is the party ask, framed in the martyr register, specifically engineered to make non-attendance feel like an abandonment. You have finished reading it within forty seconds. You have now been thinking about it for fourteen minutes.",
      },
      {
        speakerId: "inner-voice",
        text: "Confirmed — the reading became the spiral. That was predictable. Do not respond tonight. The 48-hour rule applies to voicemails just as it applies to calls. Let the party live in your head for one sleep before you type anything.",
        emotion: "knowing",
      },
    ],
    nextSceneId: "ending-deferred",
  },

  // ===================================================================
  // ACT 2C — declined with text
  // ===================================================================
  {
    id: "declined-with-text",
    backgroundId: "text-screen",
    mood: "tense",
    presentCharacterIds: ["mother"],
    dialog: [
      {
        speakerId: null,
        text: "You press decline. You type: 'Can't right now — everything okay?'",
      },
      {
        speakerId: null,
        text: "She replies in under a minute.",
      },
      {
        speakerId: "mother",
        text: '"Oh darling, not especially. I did not want to say on a text. I have been rather unwell, and Cara\'s party is on the twenty-first, and I was hoping — well, if you cannot, you cannot."',
        emotion: "sad",
      },
      {
        speakerId: "inner-voice",
        text: "Observe the construction. The phrase 'rather unwell' is vague enough to invite you to ask what is wrong. The sentence 'if you cannot, you cannot' is the martyr-frame pre-installed so that any non-attendance reads as you having been told she is ill and declining anyway. You opened a channel with 'everything okay' and she filled it with exactly the payload that channel was built to receive.",
        emotion: "concerned",
      },
    ],
    choices: [
      {
        id: "ask-about-health",
        text: '"What do you mean unwell? Is it serious?"',
        tactic: "You took the bait. The vagueness was the hook; now the conversation is about her health, which will loop back to her needing you at the party.",
        nextSceneId: "mother-the-ask",
      },
      {
        id: "warm-close",
        text: '"I hope you feel better. I\'ll check in later this week. I can\'t make the party."',
        tactic: "Acknowledge, close. Do not investigate the health claim over text; if it is real, it survives three days. If it is not, declining to ask about it denies it fuel.",
        nextSceneId: "ending-warm-no",
        isOptimal: true,
      },
      {
        id: "route-through-ren",
        text: "Do not reply. Text your sibling Ren: 'mum says she\'s unwell — is she?'",
        tactic: "Verify through the independent witness. Ren will give you the actual health picture in one sentence. Do not let vague illness claims travel through her directly.",
        nextSceneId: "ren-verifies",
        isOptimal: true,
      },
    ],
  },

  {
    id: "ren-verifies",
    backgroundId: "text-screen",
    mood: "peaceful",
    presentCharacterIds: ["sibling"],
    dialog: [
      {
        speakerId: "sibling",
        text: '"she has a cold. she had it last week too. she is not dying. she wants you at the party and she is running the illness line because the guilt line did not land eleven days ago."',
        emotion: "knowing",
      },
      {
        speakerId: "sibling",
        text: '"do whatever you want. i will tell her whatever you decide. love you."',
        emotion: "knowing",
      },
      {
        speakerId: "inner-voice",
        text: "Ren just handed you the real picture in two messages. Note it. A sibling who has sobered up about the parent is the single most valuable intelligence asset available to you in this kind of family system. Protect that relationship. Reciprocate it. When Ren needs the same favour from you in two years, give it in the same unadorned register.",
        emotion: "knowing",
      },
    ],
    nextSceneId: "ending-deferred",
  },

  // ===================================================================
  // ENDINGS
  // ===================================================================
  {
    id: "ending-warm-no",
    backgroundId: "apartment",
    mood: "peaceful",
    isEnding: true,
    outcomeType: "good",
    endingTitle: "The Warm No",
    endingSummary:
      "You answered the call. You heard the ask — Cara's engagement party on the twenty-first, at the old house, framed in the martyr register with a side of worry-performance. You declined warmly, without justification, without leaving the door open for a counter-offer. You did not apologise for declining. You did not accept the transferred guilt of Cara's 'disappointment.' You routed your relationship with Cara back through Cara directly — a card, a text, a separate phone call on your timing. The channel between you and your mother is closed on the question of the party. That is the whole discipline of this scene: a boundary delivered at normal volume, in a warm register, without negotiation.",
    endingLearnReference: "how-to-leave-without-being-villain",
    endingLearnPrompt:
      "A boundary with your mother does not require a loud scene, a letter, or a therapist-witnessed sentence. It requires one clear sentence, one closed channel, and the discipline to not reopen it at 11 p.m. when the guilt arrives.",
    dialog: [
      {
        speakerId: "inner-voice",
        text: "The twenty-first will pass. You will not be at the old house. Cara will receive a card. Your mother will perform disappointment to whoever is in the room with her on the day. None of that is your responsibility, and your absence from it is not a failure of love — it is the cleaning up of a role you were drafted into at age seven and have not yet formally declined.",
        emotion: "knowing",
      },
      {
        speakerId: null,
        text: "You finish the pasta. The kitchen is quiet again. The phone is face-down on the counter. You are still eleven days into something.",
      },
    ],
  },

  {
    id: "ending-declined-clean",
    backgroundId: "apartment",
    mood: "peaceful",
    isEnding: true,
    outcomeType: "good",
    endingTitle: "The Silent Decline",
    endingSummary:
      "You declined the call without explanation. You did not text afterwards. You finished dinner. You will read the voicemail at a time of your choosing, not at the time of hers. The eleven-day streak you have been running is now a twelve-day streak. No grief will be more bearable because you decided to handle it on her schedule. You are permitted to eat dinner standing up in peace.",
    dialog: [
      {
        speakerId: "inner-voice",
        text: "A call declined without a follow-up text is the cleanest move available to you. It is also the one that produces the most guilt in the first forty-eight hours because it feels colder than it is. Sit with the guilt. The guilt is not evidence you did something wrong; the guilt is evidence that you trained, for thirty years, on a system where refusing her produced her distress. Refusing her will always feel like this, forever. That is the cost. It does not invalidate the move.",
        emotion: "knowing",
      },
      {
        speakerId: null,
        text: "10 p.m. You read the voicemail. You decide, rested and fed, that the party ask does not change your answer. You put the phone away. You sleep.",
      },
    ],
  },

  {
    id: "ending-deferred",
    backgroundId: "apartment",
    mood: "peaceful",
    isEnding: true,
    outcomeType: "good",
    endingTitle: "Forty-Eight Hours Held",
    endingSummary:
      "You invoked the 48-hour rule. She did not like it. You held it anyway. For forty-eight hours you deliberately did not think about the twenty-first — you did the work you were doing, you slept two nights, and you woke rested on hour forty-seven to the same decision you would have made at hour two if you had not been adrenalized. The discipline is not the answer; the discipline is the conditions under which you made the answer. That is the skill this scenario teaches.",
    dialog: [
      {
        speakerId: "inner-voice",
        text: "Most answers to most questions are better at hour forty-seven than at hour two. Narc parents know this, which is why they optimise for hour two — the phone call, the urgent voicemail, the manufactured crisis. The 48-hour rule is not about cruelty; it is about giving the version of you who can see clearly the chance to be the one who decides.",
        emotion: "knowing",
      },
      {
        speakerId: null,
        text: "On hour forty-seven you write back a single sentence. It is clear. It is warm. It does not invite a reply.",
      },
    ],
  },

  {
    id: "ending-one-week-quiet",
    backgroundId: "apartment",
    mood: "peaceful",
    isEnding: true,
    outcomeType: "good",
    endingTitle: "One Week Quiet",
    endingSummary:
      "You declined the call. You deleted the voicemail unread. You blocked the number for the night. In the morning you did not unblock it. You extended the block to a week. For seven days she did not have a channel into your week. Ren stayed in the picture as a buffer; Cara received a card; nothing burned down. At the end of the week you lifted the block calmly, on your schedule, having proved to yourself that a seven-day quiet is survivable — by both of you. This is the rarest version of the scene. Obsidian rarity. Most players who run this line reverse the block in the first thirty-six hours. You did not.",
    endingLearnReference: "beige-protocol-strategic-boredom-weapon",
    endingLearnPrompt:
      "A week of quiet is not cruelty. It is the proof that the relationship can survive a structural pause. Every narc-parent dynamic is built on the assumption that contact will re-initiate within seventy-two hours. Shifting that assumption permanently is a multi-year project. The first seven days is the foundation.",
    dialog: [
      {
        speakerId: "inner-voice",
        text: "You just modelled for yourself what a baseline of quiet can look like. The dynamic between you and your mother has, for the first time in your adult life, included a full week that was not on her calendar. Remember the physical sensation of Wednesday. Remember that you slept on Thursday. These are the artefacts that the Critic will try to un-write later. Write them down.",
        emotion: "knowing",
      },
      {
        speakerId: null,
        text: "You lift the block on the eighth day, at 10 a.m., over coffee, with a friend on speaker. It feels, rather unambiguously, like a choice.",
      },
    ],
  },

  {
    id: "ending-lured-back",
    backgroundId: "apartment",
    mood: "danger",
    isEnding: true,
    outcomeType: "bad",
    failureBlogSlug: "architecture-of-control-how-emotional-dependency-is-built",
    failureBlogTitle: "Architecture of Control — How Emotional Dependency Is Built",
    endingTitle: "The Reversal",
    endingSummary:
      "She ran the martyr register. You declined. She executed the second-act disappointment line. You reversed. The party is now in your calendar on the twenty-first. You will spend the next three weeks pre-regretting it and the day itself wanting to leave early. None of this is catastrophic — it is one lost Sunday and one training rep in the wrong direction. What matters is the pattern: the reversal this scene ended on is the exact shape of every reversal you have made with her for thirty years. She knows the shape. She deploys it because it works.",
    dialog: [
      {
        speakerId: "inner-voice",
        text: "Write down what the reversal felt like. Not the guilt; the specific micro-sensation in the first three seconds after you said 'okay, I will come.' A relief, narrower than it should have been, followed almost immediately by a weight. That is the signature of a martyr-frame capitulation. Learn the signature. Next time, the three-second window is where you refuse.",
        emotion: "sad",
      },
      {
        speakerId: null,
        text: "You hang up at 8:14 p.m. The kitchen is quiet again. The pasta is cold. The twenty-first is eleven days away.",
      },
    ],
  },

  {
    id: "ending-booked-in",
    backgroundId: "apartment",
    mood: "danger",
    isEnding: true,
    outcomeType: "bad",
    failureBlogSlug: "narcissist-playbook-how-they-actually-operate",
    failureBlogTitle: "Narcissist Playbook — How They Actually Operate",
    endingTitle: "The Weekend",
    endingSummary:
      "You accepted. An hour became an afternoon. The afternoon became a dinner. The dinner became a night in the spare room. You agreed to the whole shape because it was easier than negotiating each increment. On the twenty-first you will spend six hours doing something you did not want to do, surrounded by people whose relationship with your mother is different from yours, pretending to be a version of yourself who has not done the last three years of work. You will drive home at 11 a.m. on the twenty-second with a specific hollow feeling that you will, predictably, need three days to recover from. This is the cost of scope-widening. It compounds.",
    dialog: [
      {
        speakerId: "inner-voice",
        text: "The weekend is not a punishment you cannot survive. You will survive it. The lesson of this ending is not that you failed — it is that the failure had a specific shape: a conditional yes, followed by a series of small widenings that each sounded reasonable, followed by a total capitulation because retracting any single widening felt more expensive than accepting the next. Map the widenings. Next time the first 'could you come a bit earlier' is the line you hold.",
        emotion: "sad",
      },
      {
        speakerId: null,
        text: "You end the call at 8:22 p.m. The spare room is made up.",
      },
    ],
  },
];

export const toxicNarc11: Scenario = {
  id: "tn-1-1",
  title: "The Mother's Call",
  tagline: "Sunday, 7:42 p.m. Eleven days of silence. Her ringtone you specifically set.",
  description:
    "Everyday narcissism, in the register every reader has at least one of. The antagonist is your mother — and she is the same woman from the Maris-arc L11. This scenario is the earlier version of the relationship, when you were still actively pulled by the calls. Voice-lock scenario for the toxic-narc track.",
  tier: "premium",
  track: "toxic-narc",
  level: 1,
  order: 1,
  estimatedMinutes: 13,
  difficulty: "intermediate",
  category: "narcissist",
  xpReward: 260,
  badgeId: "warm-no-mother",
  startSceneId: "dinner-interrupted",
  tacticsLearned: [
    "Identify the three performance registers of an everyday narc (cryer / rager / martyr) in under 30 seconds",
    "Voice is her home field; text is yours; written answers are yours by a wide margin",
    "The 48-hour rule — decisions at hour 47 beat decisions at hour 2",
    "Route family intel through the independent-witness sibling, not through the parent",
    "The warm no — one sentence, closed channel, no justification, no negotiation",
  ],
  redFlagsTaught: [
    "'There is absolutely no obligation' — the line meant to be disregarded",
    "Self-deprecation as the opening martyr lever ('at my age,' 'more work than I should be taking on')",
    "Outsourcing pressure to a third party ('Cara would be so pleased')",
    "Vague illness claims delivered by text as pressure payloads",
    "Scope-widening after a conditional yes (an hour → afternoon → dinner → overnight)",
  ],
  reward: {
    id: "warm-no-mother",
    name: "The Warm No",
    description: "A boundary with your mother delivered at normal volume, in a warm register, without negotiation.",
  },
  characters: [INNER_VOICE, THE_MOTHER, GOLDEN_SIBLING, PRIYA],
  scenes,
};

export default toxicNarc11;
