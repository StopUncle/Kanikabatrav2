/**
 * after-her-5-1, "The Voice Memo"
 *
 * After-Her L5-1. THE BOSS. Shape D, ~22 scenes. 1:14 a.m. on a
 * Tuesday in week eight. New number. A 47-second voice memo. The
 * preview text reads: hey i know this is. The candor is the tactic.
 * Text would not have gotten past the defences. The voice is the
 * delivery system she chose because she knows your defences better
 * than anyone.
 *
 * The bad ending plays the six-week relapse in full. The good ending
 * does not play the memo. Both endings are taught because both are
 * structurally available, and the track refuses to label what it can
 * play out.
 *
 * Teaches:
 *  - The voice is the medium chosen because text would not work.
 *  - Do not press play. The play is a decision.
 *  - Watching the waveform with the sound off is a half-failure.
 *  - The 'please stop' reply gives her a faster, warmer second memo.
 *  - The accepted call is the door to the same bed, six weeks compressed.
 */

import type { Scenario, Scene } from "../../types";
import { INNER_VOICE_M, THE_EX_HER, KAI_FRIEND } from "../../characters-male";

const scenes: Scene[] = [
  {
    id: "the-buzz",
    backgroundId: "apartment",
    mood: "tense",
    presentCharacterIds: ["inner-voice"],
    dialog: [
      {
        speakerId: null,
        text: "Tuesday, 1:14 a.m. Week eight. The flat is dark. You went to bed at 11:48 after the gym at 5:42 a.m. and the lift at 6:08 and the dinner with Marcus at 7. The body, asleep, was the body L4-1 has been building.",
      },
      {
        speakerId: null,
        text: "The phone, face-down on the bedside table, buzzes once. The screen lights the ceiling at the edge of your vision. New iMessage. New number, no contact name.",
      },
      {
        speakerId: "inner-voice",
        tone: "tactical",
        text: "Voice memo. The preview reads: hey i know this is. The audio file is forty-seven seconds long. The screen brightness on the ceiling is the boss arriving.",
        emotion: "knowing",
      },
      {
        speakerId: "inner-voice",
        tone: "tactical",
        text: "She chose voice. Voice because text would not have gotten past the defences. Voice because her voice is the dopamine the body remembers. Voice because the play is a decision and the play once made cannot be unmade.",
        emotion: "serious",
      },
    ],
    choices: [
      {
        id: "block-without-playing",
        text: "Sit up. Long-press the message. Block the number. Delete the thread. Phone back face-down.",
        tactic: "The cleanest possible move. The block happens before the play. The voice never enters the room. The audit at L1-2 closed the old channels; this scenario closes the new channel before the new channel converts to anything. The work of seven scenarios is visible in the speed of one long-press.",
        nextSceneId: "the-clean-close",
        isOptimal: true,
        event: "optimal-with-grace",
      },
      {
        id: "watch-the-waveform",
        text: "Open the thread. Do not press play. Just look at the waveform.",
        tactic: "The waveform is the file made visible. The body, watching it, is already counting seconds. Forty-seven seconds is, on the visual, a long voice memo. The discipline of L5-1 male-track edition is to not open the thread at all; opening it is the half-permission the body uses to talk itself into the play.",
        nextSceneId: "the-waveform",
        isOptimal: false,
      },
      {
        id: "press-play",
        text: "Press play.",
        tactic: "The play is the failure that is also the lesson. Her voice in the room at 1:14 a.m. is the dopamine the body has been on withdrawal from for eight weeks; the body, at three seconds in, knows it; by ten seconds the chest is what the chest was; by forty-seven seconds the conversation she planned has happened on her terms.",
        nextSceneId: "the-play",
        isOptimal: false,
      },
      {
        id: "screenshot-marcus",
        text: "Screenshot the preview. Send to Marcus. 'mate. she sent a voice memo.'",
        tactic: "Marcus is asleep. Marcus will read it at 7:18 a.m. and call you, by which time the audit will have happened or not. The screenshot is the audit shifting outside you again; the difference from the female-track equivalent is that Marcus is not in council mode, he is in friend mode, but the structural problem is the same: the read is supposed to be yours.",
        nextSceneId: "the-screenshot",
        isOptimal: false,
      },
    ],
  },

  {
    id: "the-waveform",
    backgroundId: "apartment",
    mood: "tense",
    presentCharacterIds: ["the-ex-her", "inner-voice"],
    dialog: [
      {
        speakerId: null,
        text: "The waveform is a flat line for the first three seconds, then peaks small, then steady mid-range for thirty-something seconds, then quiet again, then one short peak right at the end. The shape of a memo where she said the thing at the end.",
      },
      {
        speakerId: "inner-voice",
        tone: "tactical",
        text: "The waveform is a transcript made visual. The body is already pre-writing what is at second forty-four. The thing at the end. The body knows the thing.",
        emotion: "serious",
      },
    ],
    choices: [
      {
        id: "close-after-waveform",
        text: "Close the thread. Block the number. Do not play.",
        tactic: "Late but clean. The waveform was looked at; the audio was not heard; the channel closes. The body's pre-writing of second forty-four will fade by morning. The work returns.",
        nextSceneId: "the-clean-close-after-look",
        isOptimal: true,
      },
      {
        id: "play-it-now",
        text: "Press play. The waveform is a tease.",
        tactic: "The waveform was the half-permission. The play is the full permission. The structural cost is the same as pressing play at the first move, except now you also know you considered not playing it, which is the worse residue.",
        nextSceneId: "the-play",
        isOptimal: false,
      },
    ],
  },

  {
    id: "the-play",
    backgroundId: "apartment",
    mood: "tense",
    presentCharacterIds: ["the-ex-her", "inner-voice"],
    dialog: [
      {
        speakerId: null,
        text: "The first three seconds are her breathing. Then her voice.",
      },
      {
        speakerId: "the-ex-her",
        emotion: "serious",
        text: 'hey. i know this is. i know you probably do not want to hear from me. it is one a m and i have been sitting with this for a while. i just. i was reading something today and i thought of you in a way that was not. i do not know. not the way i had been thinking. and i wanted to.',
      },
      {
        speakerId: "the-ex-her",
        emotion: "pleading",
        text: 'i know what i did. i know how i did it. i know about the four months and i know how that landed for you. i have not been letting myself say that. and i wanted to. once. and you can decide what you want to do with it.',
      },
      {
        speakerId: "the-ex-her",
        emotion: "sad",
        text: 'anyway. i miss you. that is the actual thing.',
      },
      {
        speakerId: "inner-voice",
        tone: "tactical",
        text: "Forty-seven seconds. The candor is the tactic. She named the four months. She named that she has not let herself say it. She named the structural injury she caused with the clinical specificity of a person who is, in this moment, also a person you could imagine forgiving. The memo is the most honest version of the message it is possible to send and is, structurally, the worst possible delivery system for that honesty, because the honesty is now in the room at 1:16 a.m.",
        emotion: "serious",
      },
    ],
    choices: [
      {
        id: "block-after-play",
        text: "Block the number. Delete the thread. Lock the phone. Place face-down. Sleep, if sleep happens.",
        tactic: "The hardest block on the male track. The memo was the most honest message you could have received and the block is, structurally, the answer to the question of whether the honesty is a romance. The honesty is real; the romance is the conversion you are refusing. The work returns on lower credit; the work returns.",
        nextSceneId: "ending-block-after-play",
        isOptimal: true,
        event: "restraint-shown",
      },
      {
        id: "type-please-stop",
        text: 'Type: "please do not contact me again." Send.',
        tactic: "Even please-do-not is a confirmation that you heard the memo and that the memo reached you. The next message arrives Thursday with a faster, warmer second memo, calibrated against the please-do-not. The first floor was the silence. This is not the silence.",
        nextSceneId: "the-second-memo",
        isOptimal: false,
      },
      {
        id: "reply-yes-we-should-talk",
        text: 'Type: "we should talk." Send.',
        tactic: "The we-should-talk is the door fully open. She will call within twelve minutes. The call will be the medium because the memo got past the defences and the call gets past the rest of them. The six-week scene is booked the moment the message hits send.",
        nextSceneId: "the-warm-reply",
        isOptimal: false,
      },
      {
        id: "play-it-again",
        text: "Press play again. Listen to seconds twenty-one to twenty-eight one more time.",
        tactic: "The re-play is the body editing the memo into something more like a love letter. By the third play the memo has acquired weight it did not have at second forty-seven. By the fourth play you are typing.",
        nextSceneId: "the-replay-spiral",
        isOptimal: false,
      },
    ],
  },

  {
    id: "the-replay-spiral",
    backgroundId: "apartment",
    mood: "tense",
    presentCharacterIds: ["the-ex-her", "inner-voice"],
    dialog: [
      {
        speakerId: null,
        text: "Play three. Play four. Play five. You have been on the bedside lamp's low setting for eleven minutes. The memo is, by play five, both the memo and your memory of the memo, which is sharper than the memo itself.",
      },
      {
        speakerId: "inner-voice",
        tone: "tactical",
        text: "The re-play is the slot machine of L1-1 in audio form. Each play is a small lever pull; each play returns a slightly different version of her, sharper, more honest, more reachable. The version you are constructing is no longer her; it is the version you are negotiating with yourself to text back.",
        emotion: "sad",
      },
    ],
    choices: [
      {
        id: "stop-the-replay",
        text: "Stop. Lock the phone. Block the number. Sleep, if sleep happens.",
        tactic: "Late but recoverable. The five plays were the cost; the block is the recovery. The memo, by morning, will be a memo you heard once technically and five times operationally; by the second morning, the operational five will compress to one. The runway holds on lower credit.",
        nextSceneId: "ending-late-block-after-replay",
        isOptimal: true,
      },
      {
        id: "type-now",
        text: 'Type: "we should talk."',
        tactic: "The five plays were the runway to the typing. The conversation she scripted is now happening on her terms in the channel she chose at the time she chose. The six weeks are now booked.",
        nextSceneId: "the-warm-reply",
        isOptimal: false,
      },
    ],
  },

  {
    id: "the-second-memo",
    backgroundId: "apartment",
    mood: "tense",
    presentCharacterIds: ["the-ex-her", "inner-voice"],
    dialog: [
      {
        speakerId: null,
        text: "Thursday, 11:42 p.m. The new number, second memo. Twenty-eight seconds.",
      },
      {
        speakerId: "the-ex-her",
        emotion: "pleading",
        text: 'i hear you. i will not. i just wanted you to know i would not have sent the first one if i was not. i would not. i am not going to text you again unless you want me to. and i am sorry. and. yeah.',
      },
      {
        speakerId: "inner-voice",
        tone: "tactical",
        text: "The promise not to text again is the bait. The promise is the structural fact that there is now a door specifically labelled 'open it'. The not-texting is conditional. The condition is your move.",
        emotion: "serious",
      },
    ],
    choices: [
      {
        id: "block-after-second",
        text: "Block the new number. Delete the threads. The two memos were the boss; the boss is closed.",
        tactic: "Late but clean. The audit closes. The conditional door is closed by the block; the conditionality was always the leash. The work returns; the eight weeks of work were paused, not destroyed.",
        nextSceneId: "ending-second-memo-blocked",
        isOptimal: true,
      },
      {
        id: "open-the-door",
        text: 'Type: "ok."',
        tactic: "The ok is the door opening. The next message will arrive within eight minutes, longer, warmer, an apology that has had four weeks to be drafted. The six weeks are now booked.",
        nextSceneId: "the-warm-reply",
        isOptimal: false,
      },
    ],
  },

  {
    id: "the-warm-reply",
    backgroundId: "apartment",
    mood: "tense",
    presentCharacterIds: ["the-ex-her", "inner-voice"],
    dialog: [
      {
        speakerId: null,
        text: "The reply is sent. Inside of one minute she has read it. Inside of two minutes she is calling.",
      },
      {
        speakerId: "the-ex-her",
        emotion: "happy",
        text: 'thank you. i was. thank you. can we get coffee. tomorrow. at the place we used to go.',
      },
      {
        speakerId: "inner-voice",
        tone: "tactical",
        text: "The place we used to go is the place chosen because the place is the dopamine event in geographic form. She is, in real time, sequencing the next twelve hours of your life through specific anchors she knows the body remembers.",
        emotion: "sad",
      },
    ],
    choices: [
      {
        id: "still-block-late",
        text: 'Hang up without speaking. Block the number. The call ends one second after the location was named.',
        tactic: "The latest possible recovery. The coffee was named; the coffee is not happening. The body has heard her voice and her plan; the hanging up is the audit being run in the same call she was running her plan in. Imperfect. Holds.",
        nextSceneId: "ending-late-recovery",
        isOptimal: true,
      },
      {
        id: "accept-coffee",
        text: '"Yes. 3 p.m."',
        tactic: "The coffee is booked. The next six weeks are the next six weeks. The track will play them in full.",
        nextSceneId: "the-six-weeks",
        isOptimal: false,
      },
    ],
  },

  {
    id: "the-six-weeks",
    backgroundId: "apartment",
    mood: "tense",
    presentCharacterIds: ["the-ex-her", "inner-voice"],
    dialog: [
      {
        speakerId: null,
        text: "Wednesday 3 p.m. The cafe. Her hair is different. She is, at fourteen minutes in, naming things she never named during the four months she was planning the leaving. She uses the words intelligence failure about her own actions. The coffee runs ninety-eight minutes.",
      },
      {
        speakerId: null,
        text: "Friday. Her flat. The dog is in the corner and remembers you and is the cleanest version of the welcome you receive. You sleep there at 11:48 p.m. The bed is her new bed in her new flat and the body knows the body it is being held by.",
      },
      {
        speakerId: null,
        text: "Week two: she is at your flat two nights. The shampoo, the brand you replaced at L2-2, is back in the shower because she brought a small bottle. The L2-2 audit is operationally undone.",
      },
      {
        speakerId: null,
        text: "Week four: the first fight. The fight is structurally the fight you did not know was the fight, because she had been having the fight by herself for four months without telling you. She apologises, with new vocabulary. The vocabulary is the same architecture as the old one plus a therapist.",
      },
      {
        speakerId: null,
        text: "Week six: the second list arrives. She does not deliver it across a kitchen table this time. She sends a voice memo, fifty-eight seconds. The waveform shape is identical to the one at 1:14 a.m. eight weeks ago.",
      },
      {
        speakerId: "inner-voice",
        tone: "tactical",
        text: "The six weeks ran the relationship through the cycle in compressed time. The body learned, in the body, that the memo at 1:14 in week eight was always going to land here. The eight weeks of work are not destroyed; they are paused; they return on lower credit because the body now knows the dopamine event will, technically, be available again.",
        emotion: "sad",
      },
    ],
    choices: [
      {
        id: "end-after-six-weeks",
        text: "Block both her numbers. Re-do L1-2 tonight. Re-do L2-2 tomorrow. Re-set the alarm for 5:42.",
        tactic: "The recovery from the six weeks. The relapse was the lesson; the lesson is that the voice memo at 1:14 a.m. is the door to the six weeks; the door, closed once, must be closed for good. The eight weeks of work return on smaller credit; the body knows the cost of the open door; the next L5 boss, if it lands, will close at scene one.",
        nextSceneId: "ending-six-weeks-recovered",
        isOptimal: true,
      },
      {
        id: "stay-in-it",
        text: "Play the second memo. Respond to it.",
        tactic: "The track ends here for this run. The cycle continues. The eight weeks of work were the runway; the L5 boss won this run.",
        nextSceneId: "ending-relapse-compounds",
        isOptimal: false,
      },
    ],
  },

  {
    id: "the-screenshot",
    backgroundId: "apartment",
    mood: "tense",
    presentCharacterIds: ["inner-voice"],
    dialog: [
      {
        speakerId: null,
        text: "Marcus replies at 7:18 a.m. four hours later. The screen lights the kitchen counter while you are making coffee. The reply is short.",
      },
      {
        speakerId: null,
        text: "Marcus: 'block her. immediately. do not play it. love you.'",
      },
      {
        speakerId: "inner-voice",
        tone: "tactical",
        text: "Marcus did what Marcus would do. The audit was held overnight by Marcus's eventual reply; the play did not happen at 1:14; the audit was outsourced and held. The cost is small but real: the read was Marcus's, not yours.",
        emotion: "knowing",
      },
    ],
    choices: [
      {
        id: "follow-marcus",
        text: 'Block the number. Delete the thread. Text Marcus back: "done. thanks."',
        tactic: "Half-recovery. The block happens; the audit was held by Marcus; the runway is intact. The structural cost (the audit was outside) is, on this track, smaller than on the female track because Marcus is not running a council museum.",
        nextSceneId: "ending-marcus-held",
        isOptimal: true,
      },
      {
        id: "play-it-anyway",
        text: "Play it before responding to Marcus.",
        tactic: "Marcus's reply was the wall; you climbed it. The play happens four hours late. The cost is the same as playing it at 1:14, except now you also know you considered Marcus's read and chose against it.",
        nextSceneId: "the-play",
        isOptimal: false,
      },
    ],
  },

  // GOOD ENDINGS
  {
    id: "the-clean-close",
    backgroundId: "apartment",
    mood: "peaceful",
    isEnding: true,
    outcomeType: "good",
    endingTitle: "Blocked, Unheard",
    endingLearnPrompt:
      "The number was blocked at 1:15 a.m. before the voice entered the room. The screen of the phone is dark again. The body returns to the sleep the body was building. The memo, forty-seven seconds of her most honest possible delivery, is, structurally, an event that did not happen to you because you did not let it. The work compounded at the speed of one long-press. The L5 boss landed and did not exist. This is the track's hardest ending to reach and the cheapest one to live. Cost compounds.",
    dialog: [
      {
        speakerId: "inner-voice",
        text: "Phone face-down. Ceiling dark again. The eight weeks of work, slept on.",
        emotion: "knowing",
      },
      {
        speakerId: "inner-voice",
        tone: "tactical",
        text: "Did not hear the memo. Did not need to.",
        emotion: "knowing",
      },
    ],
    choices: [],
  },

  {
    id: "the-clean-close-after-look",
    backgroundId: "apartment",
    mood: "peaceful",
    isEnding: true,
    outcomeType: "good",
    endingTitle: "The Waveform, Closed",
    endingLearnPrompt:
      "The waveform was looked at; the audio was not heard; the channel closes. The pre-writing of second forty-four will fade by morning. The body learned, in the looking, the cost of the half-permission; the body learned, in the closing, that the half-permission can be revoked. The runway holds on full credit. The L5 boss closed at the half-permission, which is the second-cleanest ending available.",
    dialog: [
      {
        speakerId: "inner-voice",
        text: "Phone face-down. The shape of a memo in your head for nineteen more seconds, then less, then gone.",
        emotion: "knowing",
      },
    ],
    choices: [],
  },

  {
    id: "ending-block-after-play",
    backgroundId: "apartment",
    mood: "cold",
    isEnding: true,
    outcomeType: "good",
    endingTitle: "Heard, Blocked, Silent",
    endingLearnPrompt:
      "The memo played. The candor landed. The block followed. The hardest block on the male track. The memo was the most honest message you could have received and the block is, structurally, the answer to the question of whether the honesty is a romance. The honesty is real; the romance is the conversion you refused. The work returns on lower credit; the work returns. The track's L5 boss closed at the post-play, which is the third-cleanest ending available, and is the realistic one for week eight.",
    dialog: [
      {
        speakerId: "inner-voice",
        text: "Thread deleted. Number blocked. The four months named, and the naming sitting on the bedside table without travelling further.",
        emotion: "knowing",
      },
      {
        speakerId: "inner-voice",
        tone: "tactical",
        text: "Honesty is real. Romance is the conversion.",
        emotion: "knowing",
      },
    ],
    choices: [],
  },

  {
    id: "ending-late-block-after-replay",
    backgroundId: "apartment",
    mood: "cold",
    isEnding: true,
    outcomeType: "neutral",
    endingTitle: "Five Plays, Closed",
    endingLearnPrompt:
      "The memo played five times; the block followed; the work returns on lower credit. The lesson lands at half cost: the re-play is the slot machine; each play sharpens the version of her you are constructing; the version is not her; the version is what you are negotiating with to text. The block at play five is the late recovery; the next L5 boss closes at play zero.",
    dialog: [
      {
        speakerId: "inner-voice",
        text: "Phone in the kitchen drawer at 2:08 a.m. The five versions of the memo in your head, compressing back to one by morning.",
        emotion: "serious",
      },
    ],
    choices: [],
  },

  {
    id: "ending-second-memo-blocked",
    backgroundId: "apartment",
    mood: "cold",
    isEnding: true,
    outcomeType: "neutral",
    endingTitle: "The Conditional Door, Closed",
    endingLearnPrompt:
      "The promise not to text again was the bait; the conditional door was the leash; the block closes both. The lesson lands at three-quarter cost. The first memo was played, which is the structural failure; the second memo was blocked, which is the structural recovery. The runway holds on lower credit. The next L5 boss, if it lands, closes at the first memo.",
    dialog: [
      {
        speakerId: "inner-voice",
        text: "Number blocked. The conditional door specifically labelled 'open it' now does not exist.",
        emotion: "knowing",
      },
    ],
    choices: [],
  },

  {
    id: "ending-marcus-held",
    backgroundId: "apartment",
    mood: "cold",
    isEnding: true,
    outcomeType: "neutral",
    endingTitle: "Marcus Held It",
    endingLearnPrompt:
      "The audit was held by Marcus overnight. The block happens; the runway is intact. The structural cost is the read was Marcus's, not yours. The lesson lands at half cost. The next L5 boss is yours to audit at scene one; the male-track L3-2 lesson (joining the friendship without outsourcing the audit) becomes relevant in retrospect. Tomorrow's text to Marcus: thanks, mate. I owed you that one.",
    dialog: [
      {
        speakerId: "inner-voice",
        text: "Coffee at 7:22 a.m. Marcus's reply on the counter, screenshot saved. The number blocked. The morning is the morning.",
        emotion: "knowing",
      },
    ],
    choices: [],
  },

  // RECOVERY ENDINGS
  {
    id: "ending-late-recovery",
    backgroundId: "apartment",
    mood: "cold",
    isEnding: true,
    outcomeType: "neutral",
    endingTitle: "The Call, Ended",
    endingLearnPrompt:
      "The call was accepted; the place was named; the call was ended one second after the location landed; the block followed. The body did the warm reply and the body did the hang-up; the body has, in the same scene, learned the difference between accepting a structure and accepting a person. The runway is not destroyed; the runway is now running on smaller credit. The next eight weeks of work happen on top of the call she remembers as being accepted. That fact is on the record. Expensive but recoverable.",
    dialog: [
      {
        speakerId: "inner-voice",
        text: "Call ended one second after the cafe was named. Number blocked. The runway under smaller credit, still a runway.",
        emotion: "serious",
      },
    ],
    choices: [],
  },

  // BAD ENDINGS
  {
    id: "ending-six-weeks-recovered",
    backgroundId: "apartment",
    mood: "cold",
    isEnding: true,
    outcomeType: "bad",
    endingTitle: "The Six Weeks, Survived",
    failureBlogSlug: "narcissistic-hoovering-explained",
    failureBlogTitle: "Narcissistic Hoovering: When Your Ex Tries to Suck You Back In",
    endingLearnPrompt:
      "The six weeks ran. The coffee, the dog, the new bed, the fight, the second voice memo with the identical waveform. The recovery, after the second memo, is the recovery the track will support. The eight weeks of L1 through L4 work are paused, not destroyed; they return on smaller credit because the body knows the dopamine event will, technically, be available if she sends the next memo. Re-do L1-2 tonight (block both numbers). Re-do L2-2 tomorrow (the shampoo, again). The L3 and L4 disciplines restart at 5:42 a.m. on the body that has lived this twice now and is, in some specific small way, sharper for the second pass.",
    dialog: [
      {
        speakerId: "inner-voice",
        text: "Second memo on the screen. Identical waveform. Not played this time. Phone in the drawer. The flat, the audit ahead.",
        emotion: "sad",
      },
    ],
    choices: [],
  },

  {
    id: "ending-relapse-compounds",
    backgroundId: "apartment",
    mood: "tense",
    isEnding: true,
    outcomeType: "bad",
    endingTitle: "The Cycle, Continued",
    failureBlogSlug: "narcissistic-hoovering-explained",
    failureBlogTitle: "Narcissistic Hoovering: When Your Ex Tries to Suck You Back In",
    endingLearnPrompt:
      "The second memo was played. The reply was sent. The pattern continued. The L5 boss won this run. The runway L1 through L4 built was the time it took for her to draft the calibrated 1:14 a.m. memo; the eight weeks of work were not gone; they are inside you. The work is the only thing that ever was actually yours. Replay L5-1 from the cold-open knowing the body now knows the cost of the play.",
    dialog: [
      {
        speakerId: "inner-voice",
        text: "Memo two played. Reply sent. Her at the door two days later. The dog. The shampoo. The pattern.",
        emotion: "sad",
      },
    ],
    choices: [],
  },
];

export const afterHer51: Scenario = {
  id: "after-her-5-1",
  title: "The Voice Memo",
  tagline:
    "1:14 a.m. New number. Forty-seven seconds. The candor is the tactic. The voice is the medium because text would not work.",
  description:
    "After-Her L5-1. THE BOSS. Shape D, twenty-two scenes. The hoover lands through voice because text would not have gotten past the defences. The candor is the tactic; the memo is the most honest message the structure could deliver and is, structurally, the worst possible delivery system for the honesty. The bad ending plays the six weeks in full so the relapse is taught, not labelled. The good ending blocks the number before the play. The lesson is the read: her return is a measurement (real signal), not a verdict (your conversion).",
  tier: "vip",
  track: "after-her",
  level: 5,
  order: 1,
  estimatedMinutes: 20,
  difficulty: "advanced",
  category: "narcissist",
  xpReward: 660,
  badgeId: "the-voice-memo-refused",
  startSceneId: "the-buzz",
  prerequisites: ["after-her-4-2"],
  tacticsLearned: [
    "Block before play. The play is a decision.",
    "Watching the waveform is a half-permission; close after the look.",
    "Each re-play sharpens a version of her that is not her.",
    "Please-stop is a yes. The next memo arrives faster and warmer.",
    "Accepted call is the door to the cafe is the door to the new bed is the door to the same cycle.",
  ],
  redFlagsTaught: [
    "The voice as medium chosen specifically because text would fail",
    "The four-months named as the cleanest possible re-entry artefact",
    "The 'i will not text again' that creates the conditional door",
    "The place-we-used-to-go as the geographic dopamine anchor",
    "The screenshot to Marcus that outsources the audit overnight",
  ],
  characters: [INNER_VOICE_M, THE_EX_HER, KAI_FRIEND],
  scenes,
  isNew: true,
};

export default afterHer51;
