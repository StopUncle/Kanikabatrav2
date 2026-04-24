/**
 * anx-2-2 — "The Reply"
 *
 * Anxiety track, Level 2 (The Waiting), order 2. Handoff from
 * anx-2-1. You sat with forty-eight hours of silence across
 * Saturday and most of Sunday. You did not over-author his
 * absence. The scenario opens at 2:47 p.m. on Sunday when the
 * phone vibrates on the kitchen counter with his name on the
 * preview.
 *
 * The scenario is not about whether he texted. He texted. The
 * scenario is about whether the reply you send is a live one —
 * responding to the message that actually arrived — or a pre-
 * authored one, carrying two days of accumulated rumination into
 * a message that does not deserve to receive it.
 *
 * Teaches:
 *  - The pre-authored reply as the specific anxious-attached tell
 *    — replying to a fictional message across the two-day window
 *  - The length-match rule — reply at roughly his length in early
 *    exchanges; a two-line text does not deserve a paragraph
 *  - The tone-match rule — register is a signal you send as much
 *    as one you read
 *  - Not weaponising the wait back at him — the false "oh sorry
 *    just seeing this" is visible to everyone, including him
 *  - The post-send discipline — phone face-down, do not watch for
 *    "Read," do not compose a follow-up, do not screenshot to
 *    Noor. The whole move is the sent text and the put-down phone.
 *
 * Voice: reference/KANIKA-VOICE.md and reference/TRACK-anxiety.md.
 */

import type { Scenario, Scene } from "../../types";
import { INNER_VOICE, THE_CRITIC, RHYS, NOOR } from "../../characters";

const scenes: Scene[] = [
  // ===================================================================
  // OPENING — THE NOTIFICATION
  // ===================================================================
  {
    id: "sunday-afternoon",
    backgroundId: "apartment",
    mood: "peaceful",
    presentCharacterIds: ["inner-voice"],
    dialog: [
      {
        speakerId: null,
        text: "Sunday, 2:47 p.m. You are at the kitchen counter, slicing a pear. The radio is on, quietly, playing something from the 1970s that your mother would know the name of and you do not. The knife is the small Japanese one, the one you bought with your first bonus. The pear is ripe on the edge of overripe.",
      },
      {
        speakerId: null,
        text: "The phone vibrates once against the marble. You do not look at it. You finish the slice you were making. You move the slice onto the board. You put the knife down. Then you look.",
      },
      {
        speakerId: null,
        text: "RHYS — 2:47 p.m.",
      },
      {
        speakerId: "inner-voice",
        text: "Fifty hours. He is at the upper end of the window. The silence the scenario ran on is over. A new scenario has just opened on a different register — the register of how you reply.",
        emotion: "knowing",
      },
    ],
    choices: [
      {
        id: "read-now",
        text: "Pick up the phone. Read the text. Do nothing else for sixty seconds.",
        tactic: "Read before deciding. The reply is not the read; the reply is a decision that comes after. Coupling them is the anxious-attached reflex the scenario is built to interrupt.",
        nextSceneId: "reading-the-text",
        isOptimal: true,
      },
      {
        id: "screenshot-to-noor-first",
        text: "Screenshot the notification to Noor before opening. Have her call the tone with you.",
        tactic: "The ally-check is valid as a Tuesday-week-three move; it is premature on a Sunday-afternoon first reply. You have not read the text yet. Consulting about a message you have not read is authoring the conversation before it has arrived.",
        nextSceneId: "screenshot-first",
        isOptimal: false,
      },
      {
        id: "check-his-instagram",
        text: "Check his Instagram before opening. See what he has been doing with the 48 hours.",
        tactic: "The surveillance reflex. You will see a story from last night and the read of his text will be pre-coloured by it — whichever way the colour goes. Open his message in the register he sent it, not the register you imagine he lives in.",
        nextSceneId: "instagram-first",
        isOptimal: false,
      },
      {
        id: "wait-strategic-hour",
        text: "Do not read it yet. Wait an hour. Let him wait the way you just waited.",
        tactic: "The wait-back move. It looks structural; it is actually punitive. You waited forty-eight hours by accident of his life; waiting an hour back is an intentional signal. The signal is visible and costs the exchange more than it gains you.",
        nextSceneId: "strategic-wait",
        isOptimal: false,
      },
    ],
  },

  // ===================================================================
  // READING THE TEXT
  // ===================================================================
  {
    id: "reading-the-text",
    backgroundId: "apartment",
    mood: "peaceful",
    presentCharacterIds: ["inner-voice"],
    dialog: [
      {
        speakerId: null,
        text: "You open the thread. The text is three lines.",
      },
      {
        speakerId: "rhys",
        text: '"Friday was lovely. Sorry for the slow reply — my nephew was in town and I made the mistake of agreeing to \\"one full day of boy stuff.\\" I would like to do something next Saturday — dinner, somewhere of your choice. Let me know."',
        emotion: "neutral",
      },
      {
        speakerId: "inner-voice",
        text: "Three lines. A specific reason for the delay that names itself. A next move, with the choice handed to you. No winking emoji. No 'how was your weekend.' No question about the wine bar. The register is warm and specific. Read the text that actually arrived, not the one you rehearsed a reply to.",
        emotion: "knowing",
      },
    ],
    choices: [
      {
        id: "note-the-register",
        text: "Put the phone down. Finish the pear. Let the text breathe for ninety seconds before composing anything.",
        tactic: "The ninety-second pause is not playing it cool; it is a regulation move. The reply you compose at second fifteen will be the three-day draft; the reply you compose at second ninety will be the actual one.",
        nextSceneId: "ninety-second-pause",
        isOptimal: true,
      },
      {
        id: "reply-at-second-ten",
        text: "Reply now, immediately. Type the message you have been drafting since Saturday morning.",
        tactic: "The three-day draft is the specific artefact the scenario is built to interrupt. It is a reply to a message he did not send. You will be composing against the forty-eight hours, not against the three lines in front of you.",
        nextSceneId: "the-rehearsed-reply",
        isOptimal: false,
      },
      {
        id: "call-noor-now",
        text: "Call Noor. Read her the text. Ask her what to send.",
        tactic: "The delegation move. Noor will give you a fine answer, because it is not her nervous system on the hook — but the cost is: you have outsourced the specific moment the anxious-attached reader most needs to sit inside. Thank her in two days, after you have done it yourself.",
        nextSceneId: "noor-consulted",
        isOptimal: false,
      },
    ],
  },

  // ===================================================================
  // NINETY-SECOND PAUSE → THE LIVE REPLY
  // ===================================================================
  {
    id: "ninety-second-pause",
    backgroundId: "apartment",
    mood: "peaceful",
    presentCharacterIds: ["inner-voice", "the-critic"],
    dialog: [
      {
        speakerId: null,
        text: "You put the phone face-down. You finish slicing the pear. You eat two slices standing at the counter. The radio moves from a Simon and Garfunkel song into something slower that you do not know. Ninety seconds pass.",
      },
      {
        speakerId: "the-critic",
        text: "He waited forty-eight hours. Make him wait six. Make the reply short and uninterested so he knows you are not one of those women.",
        emotion: "cold",
      },
      {
        speakerId: "inner-voice",
        text: "The critic wants to convert a warm text into a power play. The live reply ignores the critic and matches the text. Three lines in, three lines back. Warm, specific, choose a restaurant.",
        emotion: "knowing",
      },
    ],
    choices: [
      {
        id: "match-length-and-register",
        text: 'Compose three lines at his length. "Friday was lovely on my end too. Next Saturday works — let\'s do the small Portuguese place on Clifton St, they take 7 or 7:30. I will book if you send me the time."',
        tactic: "The length-match is the cleanest signal you can send. You are not rewarding his lateness; you are not punishing it; you are writing at the register the exchange is actually in. Booking the restaurant is the specific move — it is not deference, it is competence.",
        nextSceneId: "the-live-reply-sent",
        isOptimal: true,
      },
      {
        id: "short-and-cold",
        text: '"Sounds good. Let me know the time."',
        tactic: "Matching length but not register. The text was warm; the reply is clipped. It will read as either cool or cold, and he will spend the next day grading which. Register is the thing the pause was meant to protect.",
        nextSceneId: "short-reply-sent",
        isOptimal: false,
      },
      {
        id: "seven-lines-warmer",
        text: 'Write seven lines. Ask about the nephew. Propose three restaurants. Mention the wine you had on Friday. Close with "x."',
        tactic: "Over-matching the warmth. A paragraph in response to three lines is the specific over-extension the anxious-attached pattern uses to compensate for the wait. He will read the length as a tell. Trim to three.",
        nextSceneId: "paragraph-composed",
        isOptimal: false,
      },
    ],
  },

  // ===================================================================
  // THE LIVE REPLY — SENT
  // ===================================================================
  {
    id: "the-live-reply-sent",
    backgroundId: "apartment",
    mood: "peaceful",
    presentCharacterIds: ["inner-voice"],
    dialog: [
      {
        speakerId: null,
        text: "You type the three lines. You do not pre-read them twice. You hit send. 2:49 p.m. The reply is out. You put the phone face-down on the counter.",
      },
      {
        speakerId: "inner-voice",
        text: "The next ninety seconds will be the hardest. The impulse to turn the phone over to watch for 'Read' will arrive. Then it will arrive again, smaller. Then it will leave.",
        emotion: "knowing",
      },
    ],
    choices: [
      {
        id: "phone-stays-down",
        text: "Phone stays face-down. Finish the pear. Put the radio on the kitchen playlist your father made. Start the Sunday you were going to have anyway.",
        tactic: "The post-send discipline. The reply ended when you hit send; the scenario ends when you return to your Sunday. Watching for 'Read' or composing a follow-up is re-opening the ending the live reply closed.",
        nextSceneId: "ending-live-reply",
        isOptimal: true,
      },
      {
        id: "check-read-once",
        text: "Flip the phone. Check if it says 'Read' yet. Just once.",
        tactic: "The just-once is a lie your nervous system tells you. The first check will produce the second check, which will produce the third. The discipline is: do not start the loop.",
        nextSceneId: "read-loop-started",
        isOptimal: false,
      },
      {
        id: "screenshot-debrief-to-noor",
        text: "Screenshot the sent reply to Noor. 'Did I get it right?'",
        tactic: "The post-send consultation is a softer version of the pre-send one. It converts a clean send into a graded one. Let Noor read the debrief on Tuesday over coffee; do not outsource the 2:51 p.m. moment.",
        nextSceneId: "post-send-consultation",
        isOptimal: false,
      },
    ],
  },

  // ===================================================================
  // ENDING — THE LIVE REPLY (OPTIMAL)
  // ===================================================================
  {
    id: "ending-live-reply",
    backgroundId: "apartment",
    mood: "peaceful",
    isEnding: true,
    outcomeType: "good",
    endingTitle: "The Live Reply",
    endingSummary:
      "You read the text that actually arrived, not the one you had rehearsed a reply to. You paused ninety seconds. You wrote three lines at his length in his register, booked the restaurant, and put the phone face-down on the marble. The Sunday continued without the text attached to it. Somewhere around four p.m. his reply came through — you will have glanced at it when you went to the kitchen for water — and the exchange moved into the next register cleanly.",
    endingLearnPrompt:
      "The specific discipline is: the reply is not the read. The read is the read; the reply is a decision that comes after a pause. The length-match and the register-match are the cleanest two signals you can send in an early exchange. The post-send is the whole skill — the ninety seconds you do not watch for 'Read.' The anxious-attached pattern is not interrupted by the reply itself; it is interrupted by the phone going face-down after.",
    dialog: [
      {
        speakerId: "inner-voice",
        text: "The pear is finished. The radio is on the kitchen playlist. Saturday is booked. The phone is face-down on the marble. The next scenario, whenever it opens, will open on a Thursday when the week has to fit a date into it.",
        emotion: "knowing",
      },
    ],
    choices: [],
  },

  // ===================================================================
  // REHEARSED REPLY BRANCH
  // ===================================================================
  {
    id: "the-rehearsed-reply",
    backgroundId: "apartment",
    mood: "tense",
    presentCharacterIds: ["inner-voice"],
    dialog: [
      {
        speakerId: null,
        text: "You type the paragraph you have been drafting since Saturday morning. It runs to nine lines. It contains the phrase 'no stress at all' twice and the phrase 'totally understand' once. It proposes four restaurants. It references a podcast you mentioned on Friday. It closes with a question you do not actually want the answer to.",
      },
      {
        speakerId: "inner-voice",
        text: "This is a reply to a message he did not send. The three lines he actually sent did not ask for this. You are replying to the ghost of the rejection you had been rehearsing, not the warm text in front of you.",
        emotion: "serious",
      },
    ],
    choices: [
      {
        id: "delete-and-start-again",
        text: "Delete the paragraph. Write three lines. Do the thing the scenario is built around.",
        tactic: "The late-but-complete correction. The paragraph being in the compose box is not yet a sent paragraph; the cost of deleting it is exactly zero and the cost of sending it is several days of awkward recovery.",
        nextSceneId: "ninety-second-pause",
        isOptimal: true,
      },
      {
        id: "send-the-paragraph",
        text: "Hit send anyway. You wrote it. Send it.",
        tactic: "The anxious-attached pattern in its most specific form. You are sending a three-day draft to a person who has been off-stage for forty-eight hours and has not earned a paragraph.",
        nextSceneId: "paragraph-sent",
        isOptimal: false,
      },
    ],
  },

  {
    id: "paragraph-sent",
    backgroundId: "apartment",
    mood: "cold",
    presentCharacterIds: ["inner-voice"],
    dialog: [
      {
        speakerId: null,
        text: "You hit send. The nine-line message is out. The three blue bubbles sit in the thread and look, from the outside, like what they are: a woman who wrote a paragraph at 2:51 p.m. on a Sunday in response to three warm lines.",
      },
      {
        speakerId: "inner-voice",
        text: "He will reply. The reply will be kind. The reply will also be slightly shorter than the one the live-reply version of this Sunday would have produced — because the paragraph tilted the register, and register tilts compound.",
        emotion: "serious",
      },
    ],
    choices: [
      {
        id: "phone-down-after-all",
        text: "Put the phone down. The paragraph is out. The discipline is now to not send a follow-up apologising for its length.",
        tactic: "The damage-control move. The paragraph will recover — if and only if you do not chase it. Chasing it is how a paragraph becomes a collapse.",
        nextSceneId: "ending-paragraph-sent",
        isOptimal: true,
      },
      {
        id: "follow-up-apology",
        text: 'Follow up. "Sorry that was a lot — I was caffeinated."',
        tactic: "The follow-up apology is the specific move that converts a slightly-long reply into a visible anxious pattern. The first paragraph was recoverable; the apology for it is not.",
        nextSceneId: "ending-chased-the-paragraph",
        isOptimal: false,
      },
    ],
  },

  // ===================================================================
  // WEAPONISED-THE-WAIT BRANCH
  // ===================================================================
  {
    id: "strategic-wait",
    backgroundId: "apartment",
    mood: "tense",
    presentCharacterIds: ["inner-voice", "the-critic"],
    dialog: [
      {
        speakerId: null,
        text: "You leave the phone face-down on the counter without reading it. You go to the bedroom. You fold laundry. You come back at 3:46 p.m. An hour has, approximately, passed. You pick the phone up.",
      },
      {
        speakerId: "the-critic",
        text: "Now reply with 'oh sorry just seeing this' — make him think his text did not land as an event.",
        emotion: "cold",
      },
      {
        speakerId: "inner-voice",
        text: "The hour was not structural. You knew he had texted the whole time. Pretending you did not will be read — because the read-receipt or the online indicator or the one-sentence tell in the reply will give it away.",
        emotion: "knowing",
      },
    ],
    choices: [
      {
        id: "read-normally-now",
        text: "Read the text. Do not pretend the hour did not happen internally. Compose the live reply normally.",
        tactic: "The salvage. The hour is spent; you cannot un-spend it. The move is to not also weaponise it.",
        nextSceneId: "reading-the-text",
        isOptimal: true,
      },
      {
        id: "weaponise-the-wait",
        text: 'Reply: "oh sorry just seeing this!! Saturday works, send me the time x"',
        tactic: "The weaponised-wait move. Three specific tells: the false surprise, the exclamation marks, the closing x. He will read all three. You have converted a live conversation into a small performance.",
        nextSceneId: "ending-weaponised-wait",
        isOptimal: false,
      },
    ],
  },

  // ===================================================================
  // SCREENSHOT-FIRST BRANCH
  // ===================================================================
  {
    id: "screenshot-first",
    backgroundId: "apartment",
    mood: "tense",
    presentCharacterIds: ["inner-voice", "noor"],
    dialog: [
      {
        speakerId: null,
        text: "You screenshot the notification — not the opened text, the notification preview — and send it to Noor. 'He texted. What does the preview say to you.'",
      },
      {
        speakerId: "noor",
        text: 'real talk. open the text. log off.',
        emotion: "neutral",
      },
      {
        speakerId: "inner-voice",
        text: "Noor is correct. She has named the move before it happened — the consultation about a message you have not read is a rehearsal of the consultation about the reply you have not composed. Do the thing.",
        emotion: "knowing",
      },
    ],
    choices: [
      {
        id: "listen-to-noor",
        text: "Open the text. Read it. Stop consulting.",
        tactic: "The ally called the move. Honour it.",
        nextSceneId: "reading-the-text",
        isOptimal: true,
      },
    ],
  },

  // ===================================================================
  // INSTAGRAM-FIRST BRANCH
  // ===================================================================
  {
    id: "instagram-first",
    backgroundId: "apartment",
    mood: "tense",
    presentCharacterIds: ["inner-voice", "the-critic"],
    dialog: [
      {
        speakerId: null,
        text: "You open his Instagram. Last night, 9:17 p.m., he posted a story — a photo of a kid on a climbing frame, caption 'my nephew is more determined than anyone I currently line manage.'",
      },
      {
        speakerId: "the-critic",
        text: "So the nephew is real. Which means the delay was real. Which means you have spent forty-eight hours authoring a rejection that did not exist. Which means the three drafts were all for nothing.",
        emotion: "cold",
      },
      {
        speakerId: "inner-voice",
        text: "The critic has pivoted from 'he is ignoring you' to 'you are ridiculous for worrying.' The pivot is itself a tell. The information did not change; the surveillance produced a specific shame that will now colour the reply you write.",
        emotion: "knowing",
      },
    ],
    choices: [
      {
        id: "close-the-app",
        text: "Close Instagram. Open the thread. Read the text without the story in your head.",
        tactic: "The surveillance is done. You cannot un-see the nephew photo. The move is to not let it author the reply — read the text on its own terms, regardless of what you now know about the last 48 hours.",
        nextSceneId: "reading-the-text",
        isOptimal: true,
      },
      {
        id: "reply-with-nephew-reference",
        text: 'Reply referencing the story. "Saw the climbing frame photo — hope the day was survived."',
        tactic: "Referencing a story he did not know you watched is the specific surveillance-tell. He will know. He will not say anything. You have just handed him the read.",
        nextSceneId: "ending-surveillance-reveal",
        isOptimal: false,
      },
    ],
  },

  // ===================================================================
  // NOOR-CONSULTED BRANCH
  // ===================================================================
  {
    id: "noor-consulted",
    backgroundId: "apartment",
    mood: "peaceful",
    presentCharacterIds: ["noor", "inner-voice"],
    dialog: [
      {
        speakerId: null,
        text: "You call Noor. You read her the text. You ask what to send.",
      },
      {
        speakerId: "noor",
        text: "what do you actually want to send.",
        emotion: "neutral",
      },
      {
        speakerId: "inner-voice",
        text: "Noor redirected. The call was meant to delegate; she has handed the question back. The answer to her question is the live reply.",
        emotion: "knowing",
      },
    ],
    choices: [
      {
        id: "answer-noor-and-do-it",
        text: "'I want to say yes, propose a restaurant, and put the phone down.' Do that.",
        tactic: "The correct answer. Noor will confirm by saying 'then do that.' The call was the rehearsal of the correct reply. Send it.",
        nextSceneId: "ninety-second-pause",
        isOptimal: true,
      },
    ],
  },

  // ===================================================================
  // SHORT-REPLY BRANCH
  // ===================================================================
  {
    id: "short-reply-sent",
    backgroundId: "apartment",
    mood: "tense",
    presentCharacterIds: ["inner-voice"],
    dialog: [
      {
        speakerId: null,
        text: "You hit send. 'Sounds good. Let me know the time.' Two sentences. No warmth. He will read it as punitive or as disinterested, and he will spend Monday calibrating which.",
      },
      {
        speakerId: "inner-voice",
        text: "Length was matched; register was not. You sent a signal that was colder than the text deserved. He will probably still propose the time. The exchange will hold. But the temperature of Saturday will be lower than Friday was, and the reason will be these two sentences.",
        emotion: "serious",
      },
    ],
    choices: [
      {
        id: "leave-it-be",
        text: "The reply is out. The discipline now is to not send a follow-up correcting the tone.",
        tactic: "The damage-control move. A corrective second text makes the first one more visible. Let the short reply be what it is.",
        nextSceneId: "ending-short-reply",
        isOptimal: true,
      },
      {
        id: "warm-correction",
        text: 'Send a follow-up. "(sorry that was curt — I was mid-cooking. excited for Saturday x)"',
        tactic: "The correction makes the coldness specific. He now knows the first message was not the true register; he also knows you were thinking about whether the first message read as cold. That is two pieces of information you did not want him to have.",
        nextSceneId: "ending-short-reply-corrected",
        isOptimal: false,
      },
    ],
  },

  // ===================================================================
  // PARAGRAPH-COMPOSED BRANCH
  // ===================================================================
  {
    id: "paragraph-composed",
    backgroundId: "apartment",
    mood: "tense",
    presentCharacterIds: ["inner-voice"],
    dialog: [
      {
        speakerId: null,
        text: "The paragraph sits in the compose box. Seven lines. It is not a bad paragraph — the wine reference is good; the restaurant shortlist is reasonable; the nephew question is warm. But it is seven lines where three would do.",
      },
      {
        speakerId: "inner-voice",
        text: "The paragraph is the compensation for the wait. You are topping up the warmth he did not fail to send. The trim is the move — cut to three lines, keep the restaurant, lose the shortlist, lose the nephew question (you will ask in person next Saturday).",
        emotion: "knowing",
      },
    ],
    choices: [
      {
        id: "trim-to-three",
        text: "Trim. Three lines at his length. Send.",
        tactic: "The save. A paragraph that becomes three lines is a live reply the compose-box captured a rough draft of. He will never know the paragraph existed.",
        nextSceneId: "the-live-reply-sent",
        isOptimal: true,
      },
      {
        id: "send-all-seven",
        text: "Send the seven lines. You wrote them. They are warm. Send.",
        tactic: "The over-extension. The seven lines are warm, but they are also seven — and the length is the tell. He will reply warmly; he will also reply slightly shorter than he would have.",
        nextSceneId: "paragraph-sent",
        isOptimal: false,
      },
    ],
  },

  // ===================================================================
  // READ-LOOP BRANCH
  // ===================================================================
  {
    id: "read-loop-started",
    backgroundId: "apartment",
    mood: "tense",
    presentCharacterIds: ["inner-voice", "the-critic"],
    dialog: [
      {
        speakerId: null,
        text: "You flip the phone over. It does not yet say 'Read.' It is 2:50 p.m. You put it back down. You look at the pear. You flip the phone over again. Not 'Read.' 2:51 p.m. You flip the phone over again. 2:52 p.m.",
      },
      {
        speakerId: "the-critic",
        text: "Why has he not read it? He must be with someone. He must be with her.",
        emotion: "cold",
      },
      {
        speakerId: "inner-voice",
        text: "The loop is open. Every flip produces the next. The Sunday you were going to have has been replaced by a Sunday about a phone.",
        emotion: "serious",
      },
    ],
    choices: [
      {
        id: "break-the-loop",
        text: "Put the phone in the bedroom. Shut the door. Finish the Sunday you were going to have.",
        tactic: "The structural break. The phone in a different room removes the flip from the available move-set. This is the specific technique the track has built toward across L1 and L2.",
        nextSceneId: "ending-loop-broken",
        isOptimal: true,
      },
      {
        id: "keep-flipping",
        text: "Keep the phone where it is. Keep flipping. He will read eventually.",
        tactic: "The loop continues. The scenario does not punish you with a sudden bad event — the punishment is the hour and a half of your Sunday the loop eats.",
        nextSceneId: "ending-loop-continued",
        isOptimal: false,
      },
    ],
  },

  // ===================================================================
  // POST-SEND CONSULTATION BRANCH
  // ===================================================================
  {
    id: "post-send-consultation",
    backgroundId: "apartment",
    mood: "tense",
    presentCharacterIds: ["noor", "inner-voice"],
    dialog: [
      {
        speakerId: "noor",
        text: "you sent a good reply. stop sending me screenshots. go outside.",
        emotion: "neutral",
      },
      {
        speakerId: "inner-voice",
        text: "Noor has, correctly, named the post-send consultation as the new form of the pattern. The live reply was live; the consultation afterwards is the quieter version of the same problem.",
        emotion: "knowing",
      },
    ],
    choices: [
      {
        id: "go-outside",
        text: "Put the phone down. Go outside. The consultation was the last form the Sunday took before the Sunday started.",
        tactic: "The correction.",
        nextSceneId: "ending-live-reply",
        isOptimal: true,
      },
    ],
  },

  // ===================================================================
  // ENDINGS
  // ===================================================================
  {
    id: "ending-weaponised-wait",
    backgroundId: "apartment",
    mood: "cold",
    isEnding: true,
    outcomeType: "bad",
    endingTitle: "The 'Just Seeing This'",
    failureBlogSlug: "how-to-leave-without-being-villain",
    failureBlogTitle: "How To Leave Without Being The Villain",
    endingLearnPrompt:
      "The false 'just seeing this' is the specific weaponised-wait move. He will read it — through the read-receipt, through the typing indicator, through the fact that you called the wait an event in the first place. The anxious-attached pattern dressed up as a power play is still the anxious-attached pattern, and it is visible to the other reader of the thread.",
    dialog: [
      {
        speakerId: "inner-voice",
        text: "The reply is out with its three tells. He will propose the time tomorrow. The Saturday will happen. The temperature of the Saturday will be what the temperature of the Sunday reply was. The scenario is built to interrupt this; this run did not interrupt it.",
        emotion: "serious",
      },
    ],
    choices: [],
  },

  {
    id: "ending-paragraph-sent",
    backgroundId: "apartment",
    mood: "tense",
    isEnding: true,
    outcomeType: "neutral",
    endingTitle: "The Paragraph Sent",
    endingLearnPrompt:
      "The paragraph is a recoverable misstep when it is not chased. You wrote more than the text deserved; you did not then follow up apologising for it. The exchange continues; the temperature is slightly lower than the live-reply version; the Saturday will hold. Next time: three lines. The draft the compose-box caught was the three-day draft, and the correction is to not let the next one reach compose-box at all.",
    dialog: [
      {
        speakerId: "inner-voice",
        text: "The paragraph is out. The phone is face-down. The Sunday continues.",
        emotion: "knowing",
      },
    ],
    choices: [],
  },

  {
    id: "ending-chased-the-paragraph",
    backgroundId: "apartment",
    mood: "cold",
    isEnding: true,
    outcomeType: "bad",
    endingTitle: "Chased The Paragraph",
    failureBlogSlug: "architecture-of-control-how-emotional-dependency-is-built",
    failureBlogTitle: "Architecture of Control — How Emotional Dependency Is Built",
    endingLearnPrompt:
      "The paragraph was a slightly-long reply. The apology for the paragraph is what made it visible as a pattern. The specific move the anxious-attached reader most wants to do in the minute after a send — send another — is the move the whole track is built to interrupt. The reply was not the problem; the chase was.",
    dialog: [
      {
        speakerId: "inner-voice",
        text: "Two texts out. The second one specifically about the length of the first. He will read the pattern. The pattern is not the end of the exchange, but it is a data point now on the record.",
        emotion: "serious",
      },
    ],
    choices: [],
  },

  {
    id: "ending-short-reply",
    backgroundId: "apartment",
    mood: "tense",
    isEnding: true,
    outcomeType: "neutral",
    endingTitle: "The Clipped Reply",
    endingLearnPrompt:
      "You matched his length but not his register. The cold-short reply is the opposite failure mode to the warm-long one — both are over-authored against the actual text. The correction is to match both: three lines, his register, warm. Next time.",
    dialog: [
      {
        speakerId: "inner-voice",
        text: "The clipped reply is out. The Saturday will still happen. The temperature will be one degree cooler than it would have been. That is the cost; it is specific and it is recoverable.",
        emotion: "knowing",
      },
    ],
    choices: [],
  },

  {
    id: "ending-short-reply-corrected",
    backgroundId: "apartment",
    mood: "cold",
    isEnding: true,
    outcomeType: "bad",
    endingTitle: "The Correction Sent",
    endingLearnPrompt:
      "The clipped reply was salvageable. The correction for the clipped reply is what made both texts into a visible pattern. The second text told him that you had been thinking about whether the first text read as cold — which is a piece of information a live-reply version of you would not have given away.",
    dialog: [
      {
        speakerId: "inner-voice",
        text: "Two texts out. The second specifically about the register of the first. The pattern is visible. Next time: send the live reply and do not correct it.",
        emotion: "serious",
      },
    ],
    choices: [],
  },

  {
    id: "ending-surveillance-reveal",
    backgroundId: "apartment",
    mood: "cold",
    isEnding: true,
    outcomeType: "bad",
    endingTitle: "The Story Noticed",
    endingLearnPrompt:
      "Referencing a story he did not know you watched is the specific surveillance-tell. It is one of the three or four pieces of text-data that an anxious-attached reader produces that a secure person reads instantly. The move is: whatever you learn from the Instagram scroll, you carry internally; you do not ever put it in the text.",
    dialog: [
      {
        speakerId: "inner-voice",
        text: "He will smile and reply warmly and will never mention the reference. He will also file it. The scenario does not end the relationship; it adds a specific data point that a next scenario will reference.",
        emotion: "serious",
      },
    ],
    choices: [],
  },

  {
    id: "ending-loop-broken",
    backgroundId: "apartment",
    mood: "peaceful",
    isEnding: true,
    outcomeType: "good",
    endingTitle: "The Loop Broken",
    endingLearnPrompt:
      "The read-receipt loop is the specific post-send failure mode. The structural break — phone in a different room, door closed — is the technique. It is not more discipline; it is less available move-set. Every anxiety-track scenario converges on the same quiet technique: change the environment, reduce the available bad moves, return to the Sunday.",
    dialog: [
      {
        speakerId: "inner-voice",
        text: "The phone is in the bedroom. The Sunday has started. The reply is out; the ending is no longer the send; the ending is the phone in the other room.",
        emotion: "knowing",
      },
    ],
    choices: [],
  },

  {
    id: "ending-loop-continued",
    backgroundId: "apartment",
    mood: "tense",
    isEnding: true,
    outcomeType: "neutral",
    endingTitle: "The Loop Held",
    endingLearnPrompt:
      "The scenario did not produce a catastrophe. It produced ninety minutes of Sunday lost to a flipped phone. The quieter cost is the specific nervous-system training: you just told your body that the way to manage post-send discomfort is to check the phone, which is the training you are trying to uninstall. The next scenario will open on a phone you flip more, not less.",
    dialog: [
      {
        speakerId: "inner-voice",
        text: "Ninety minutes. No catastrophe. One specific habit reinforced. That is the quiet cost.",
        emotion: "serious",
      },
    ],
    choices: [],
  },
];

export const anx22: Scenario = {
  id: "anx-2-2",
  title: "The Reply",
  tagline: "Sunday, 2:47 p.m. The phone vibrates against the marble. RHYS. Fifty hours.",
  description:
    "Handoff from anx-2-1. You sat with forty-eight hours of silence without over-authoring his absence. The scenario is not about whether he texted. He texted. The scenario is whether the reply you send is a live one — responding to the actual three lines he sent — or a pre-authored one carrying two days of accumulated rumination into a message that does not deserve to receive it.",
  tier: "premium",
  track: "anxiety",
  level: 2,
  order: 2,
  estimatedMinutes: 14,
  difficulty: "intermediate",
  category: "self-regulation",
  xpReward: 360,
  badgeId: "the-live-reply",
  startSceneId: "sunday-afternoon",
  prerequisites: ["anx-2-1"],
  tacticsLearned: [
    "The read is the read; the reply is a decision that comes after a ninety-second pause",
    "Length-match in early exchanges — three lines answer three lines",
    "Register-match — warm text deserves warm reply; clipping is a signal",
    "Post-send discipline — phone face-down, no follow-up, no consultation",
    "The structural environment-break — phone in a different room when the read-loop opens",
  ],
  redFlagsTaught: [
    "The pre-authored paragraph — a reply to a message he did not send",
    "The weaponised wait ('oh sorry just seeing this') and its three specific tells",
    "The Instagram surveillance before reading — pre-colouring the read",
    "The follow-up apology that converts a slightly-long reply into a visible pattern",
    "The story-reference text as the surveillance-tell a secure reader reads instantly",
  ],
  characters: [INNER_VOICE, THE_CRITIC, RHYS, NOOR],
  scenes,
};

export default anx22;
