/**
 * after-him-5-1, "The Vague Text"
 *
 * After-Him L5-1. THE BOSS. Shape D, ~22 scenes, every tactic of the
 * track in sequence. Tuesday, 4:13 p.m. New number. The lowercase
 * message with deniability built in: "hey. been thinking about you.
 * hope you're doing well x". The teaching is the read: his return is
 * a measurement, not a verdict. The signal about your mate value is
 * real. The signal about his character is also real. Only one of
 * those signals is romantic.
 *
 * The bad ending plays the six-week relapse in full so the relapse is
 * taught, not labelled. The good ending blocks the new number cleanly,
 * the work compounded since L1 visible in the speed of the close.
 *
 * Teaches:
 *  - The lowercase + the kiss is the deniability. He chose both.
 *  - Reading the text is a permission; the screenshot to friends is a tell.
 *  - The block of the new number is the answer to the question the message asked.
 *  - The warm reply is the door to a six-week scene played in full.
 *  - The signal about your value is real; do not confuse it with romance.
 */

import type { Scenario, Scene } from "../../types";
import { INNER_VOICE, THE_EX_HIM, NAOMI } from "../../characters";

const scenes: Scene[] = [
  {
    id: "the-buzz",
    backgroundId: "apartment",
    mood: "tense",
    presentCharacterIds: ["inner-voice"],
    dialog: [
      {
        speakerId: null,
        text: "Tuesday, 4:13 p.m. Week eight, day five. You are at the kitchen counter with a tea in your hand and a book open. The flat is the operationally neutral flat L2-2 produced; the kettle just clicked off; the playlist from 2019 is on.",
      },
      {
        speakerId: null,
        text: "The phone, face-down beside the book, buzzes. iMessage notification, the preview readable from the angle of the phone face on the surface of the counter. A new number. The preview: hey. been thinking about.",
      },
      {
        speakerId: "inner-voice",
        tone: "tactical",
        text: "The audit at L1-2 closed his old number. This is a new number. He chose a new number because he knows the old one is blocked, which means he has, at minimum, tested the block. The new number is the L1-2 leak written in someone else's hand.",
        emotion: "knowing",
      },
      {
        speakerId: "inner-voice",
        tone: "tactical",
        text: "The full preview, if you turn the phone over, will be the lowercase opening, the kiss at the end, the strategic vagueness. The deniability is built in so that, whichever way you respond, he can read it as either a warm reach or a polite check-in.",
        emotion: "knowing",
      },
    ],
    choices: [
      {
        id: "block-without-reading",
        text: "Pick up the phone. Do not turn it over. Long-press the notification. Block the number. Delete the thread.",
        tactic: "The cleanest possible move. The work of the previous four levels is visible in the speed of the close. The number is blocked before the message is read. The text becomes an event that did not happen to you because you did not let it.",
        nextSceneId: "the-clean-close",
        isOptimal: true,
        event: "optimal-with-grace",
      },
      {
        id: "read-it",
        text: "Turn the phone over. Read the whole message.",
        tactic: "Reading the message is a permission. The message is now in your head; the message is also designed to be re-read; the re-read is the trigger the message was engineered to fire. The structural cost of the read is the conversion of the message from an event in the inbox to an event in your body.",
        nextSceneId: "the-full-text",
        isOptimal: false,
      },
      {
        id: "screenshot-to-friends",
        text: "Screenshot the preview. Send to Naomi without reading the rest.",
        tactic: "The screenshot is a tell on yourself before it is a message about him. The audience is the audit shifting from inside you to outside you, which converts the boss into a council scene. The council, briefed by L3-2, will sharpen the museum tonight; the museum will inform how he is read for the next six weeks. The screenshot is not free.",
        nextSceneId: "the-screenshot",
        isOptimal: false,
      },
    ],
  },

  {
    id: "the-full-text",
    backgroundId: "apartment",
    mood: "tense",
    presentCharacterIds: ["the-ex-him", "inner-voice"],
    dialog: [
      {
        speakerId: "the-ex-him",
        emotion: "neutral",
        text: 'hey. been thinking about you. hope you\'re doing well x',
      },
      {
        speakerId: "inner-voice",
        tone: "tactical",
        text: "Three lines. Lowercase, no capitals. A kiss at the end without elaboration. The vagueness is the message. There is no specific event he is reaching about; there is no specific feeling he is naming; there is the structural fact of the reach, which is the message addressed to the question of whether you are reachable.",
        emotion: "knowing",
      },
      {
        speakerId: "inner-voice",
        tone: "tactical",
        text: "The body is doing the body thing. The chest is warmer than it was at 4:12. The eight weeks of work are, in this exact moment, being tested by a single dopamine event delivered through the channel L1-2 missed. This is the boss.",
        emotion: "serious",
      },
    ],
    choices: [
      {
        id: "block-after-reading",
        text: "Read it. Block the number. Delete the thread. Do not respond.",
        tactic: "The cleanest version of the read-then-decline path. The message is in your head; the channel is closed; the response (silence) is the response that lands because it is the response the message was structurally addressed to. The L1-1 floor holds.",
        nextSceneId: "the-clean-close-after-read",
        isOptimal: true,
        event: "restraint-shown",
      },
      {
        id: "read-and-leave",
        text: "Read it. Lock the phone. Place face-down. Do nothing.",
        tactic: "Half-credit. The channel remains open; the response is silence; the silence is the right response, but the open channel means the message is repeatable. The L5 boss returns in eleven days with a slightly warmer second message, and the first one is now precedent.",
        nextSceneId: "the-second-message-arrives",
        isOptimal: false,
      },
      {
        id: "type-please-stop",
        text: 'Type: "please stop. do not contact me again." Send.',
        tactic: "Even 'please stop' is a yes. The response confirms reach. The next message arrives faster, possibly warmer, possibly defensive. The L1-1 floor was the silence. This is not the silence.",
        nextSceneId: "the-please-stop",
        isOptimal: false,
      },
      {
        id: "type-warm-reply",
        text: 'Type: "hey. i\'ve been thinking about you too." Send.',
        tactic: "The warm reply is the door to the six-week scene. The body is being delivered the dopamine event; the dopamine event was the eight weeks of withdrawal converging on this exact tap. The next six weeks will be the same bedroom, the same coffee table, the same silence. The track will play the six weeks out in full.",
        nextSceneId: "the-warm-reply",
        isOptimal: false,
      },
    ],
  },

  {
    id: "the-second-message-arrives",
    backgroundId: "apartment",
    mood: "tense",
    presentCharacterIds: ["the-ex-him", "inner-voice"],
    dialog: [
      {
        speakerId: null,
        text: "Thursday, 9:47 p.m. The new number again. The phone buzzes on the counter.",
      },
      {
        speakerId: "the-ex-him",
        emotion: "neutral",
        text: 'sorry. i know that was probably weird. i just genuinely hope you\'re doing well. miss talking to you x',
      },
      {
        speakerId: "inner-voice",
        tone: "tactical",
        text: "The escalation. The 'miss talking to you' specifies the function. The function is the talking. The function is what he is reaching for; not you, not the relationship, not the apology, the talking. The L1-1 floor must be re-established or the third message arrives Sunday at 2 p.m.",
        emotion: "knowing",
      },
    ],
    choices: [
      {
        id: "block-now",
        text: "Block the number now. Delete both threads. The eleven days of pause were enough.",
        tactic: "Late but clean recovery. The channel is closed at the second message. The third message does not arrive. The audit returns to its work; the body experiences the channel closing as a small relief, not a small loss, which is the signal that the eight weeks of work are integrating.",
        nextSceneId: "the-clean-close-after-second",
        isOptimal: true,
      },
      {
        id: "engage-curious",
        text: 'Type: "i\'m doing well. what made you reach out?" Send.',
        tactic: "Curiosity is the warm reply with a question mark. He will answer; the answer will be calibrated to be the right answer; the next message will be the photo of the dog he never had, or the song, or the memory specifically chosen to be the door. Curiosity is a yes pretending to be neutral.",
        nextSceneId: "the-curious-exchange",
        isOptimal: false,
      },
      {
        id: "stay-silent-again",
        text: "Lock the phone. Place face-down. Do nothing again.",
        tactic: "The second silence is heavier than the first. The third message arrives Sunday. The pattern is now: he sends, you do not respond, the channel is open. The structural problem is the open channel. The body has spent two messages of bandwidth declining; the discipline of L5-1 is to close the channel once, not to decline twice.",
        nextSceneId: "the-third-message-arrives",
        isOptimal: false,
      },
    ],
  },

  {
    id: "the-third-message-arrives",
    backgroundId: "apartment",
    mood: "tense",
    presentCharacterIds: ["the-ex-him", "inner-voice"],
    dialog: [
      {
        speakerId: null,
        text: "Sunday, 2:14 p.m. Sunday afternoon, week nine. The new number, third message.",
      },
      {
        speakerId: "the-ex-him",
        emotion: "pleading",
        text: 'i know you\'re not responding and i get it. i\'ve been doing a lot of thinking. about that conversation at the coffee. i was so wrong about how i ended it. can i just say it once and then i\'ll stop x',
      },
      {
        speakerId: "inner-voice",
        tone: "tactical",
        text: "The third message is the apology. The apology is the hardest one to refuse because it is offering exactly the thing L1-1 was about, which is the reason. He is, now, providing the apology you wrote and did not send. The structure of the offer is the offer.",
        emotion: "serious",
      },
    ],
    choices: [
      {
        id: "block-now-finally",
        text: "Block the number. Delete the threads. The apology was the bait the silence was supposed to fish for.",
        tactic: "The hardest block on the track. The apology is, on the surface, the closure you were never given. The structural fact: closure does not arrive at 2:14 on a Sunday afternoon via a third message after two ignored ones. Closure was always going to arrive by accident on a Tuesday afternoon, by you, on your own. The third message is a transaction, not a closure.",
        nextSceneId: "the-clean-close-after-apology",
        isOptimal: true,
      },
      {
        id: "let-him-say-it",
        text: 'Type: "say it." Send.',
        tactic: "The 'say it' is the door fully open. He will say it. The saying will be precise, well-rehearsed, calibrated to land exactly. By Monday morning you will be in iMessage with him for ninety minutes. By the following Sunday you will have had coffee. The six-week scene is being booked, message by message.",
        nextSceneId: "the-warm-reply",
        isOptimal: false,
      },
    ],
  },

  {
    id: "the-curious-exchange",
    backgroundId: "apartment",
    mood: "tense",
    presentCharacterIds: ["the-ex-him", "inner-voice"],
    dialog: [
      {
        speakerId: null,
        text: "Thursday, 9:53 p.m. Six minutes later.",
      },
      {
        speakerId: "the-ex-him",
        emotion: "neutral",
        text: 'genuinely just. i saw the bookshop you and i went to in september has closed. and i thought of you. didn\'t want it to feel like a thing i was carrying without telling you.',
      },
      {
        speakerId: "inner-voice",
        tone: "tactical",
        text: "The bookshop is a specific true memory. The specificity is the tactic. He chose a memory that does not have edges, that is not painful, that is, structurally, the cleanest possible re-entry artefact. The curiosity invited the artefact. The artefact, in your head, is now both the memory and the message.",
        emotion: "serious",
      },
    ],
    choices: [
      {
        id: "block-mid-exchange",
        text: 'Type nothing. Block the number. Close the thread.',
        tactic: "Late but clean. The exchange started; the exchange ends; the bookshop memory is, by next Tuesday, just a bookshop memory again, not a tactic. The structural lesson lands: curiosity is the door, not the audit.",
        nextSceneId: "the-clean-close-after-curiosity",
        isOptimal: true,
      },
      {
        id: "respond-to-bookshop",
        text: 'Type: "oh. that\'s sad. i didn\'t know."',
        tactic: "The response is now a conversation. The conversation will be about the bookshop, then about September, then about the year, then about the relationship. The lowercase has become a thread. The L5 boss has succeeded.",
        nextSceneId: "the-warm-reply",
        isOptimal: false,
      },
    ],
  },

  {
    id: "the-please-stop",
    backgroundId: "apartment",
    mood: "tense",
    presentCharacterIds: ["the-ex-him", "inner-voice"],
    dialog: [
      {
        speakerId: null,
        text: "He read it at 4:18 p.m. The three dots appeared. They stayed for nine seconds.",
      },
      {
        speakerId: "the-ex-him",
        emotion: "neutral",
        text: 'of course. i\'m sorry. i shouldn\'t have. take care x',
      },
      {
        speakerId: "inner-voice",
        tone: "tactical",
        text: "The polite reply is the third lowercase kiss in three messages now. The polite reply is also, structurally, the receipt that you read the message and chose to engage at the level of asking him to stop, which is engagement. The next message will arrive in eleven days with a different opener.",
        emotion: "serious",
      },
    ],
    choices: [
      {
        id: "block-after-please-stop",
        text: "Block the number. Delete the thread. The please-stop is its own door; close it.",
        tactic: "Late but clean. The please-stop was a yes; the block is the no. The next message does not arrive because the channel is closed. The eleven-day next message is the cost of the please-stop having existed; the closing is the cost not being paid further.",
        nextSceneId: "the-clean-close-after-please-stop",
        isOptimal: true,
      },
      {
        id: "leave-it-open",
        text: "Leave it. He apologised. He will not write again.",
        tactic: "He will write again. The eleven days are the cadence the structure runs on. The channel is open, and the next message will be calibrated against tonight's please-stop, which provided him the information that you read.",
        nextSceneId: "the-second-message-arrives",
        isOptimal: false,
      },
    ],
  },

  {
    id: "the-warm-reply",
    backgroundId: "apartment",
    mood: "tense",
    presentCharacterIds: ["the-ex-him", "inner-voice"],
    dialog: [
      {
        speakerId: null,
        text: "Tuesday, 4:42 p.m. Twenty-nine minutes after his first message. You typed the warm reply. He read it inside of a minute. The conversation is now live.",
      },
      {
        speakerId: "the-ex-him",
        emotion: "happy",
        text: 'really? god i hoped. i\'ve been working on so much. i think i finally understand what i did. can i call?',
      },
      {
        speakerId: "inner-voice",
        tone: "tactical",
        text: "He has been working on so much. He has been working on the call he is now requesting. The call will be calibrated; the call will be the medium because text gave you too much control of pace. The voice is the medium of the dopamine. The body, in voice, is harder to keep separate from the body in person.",
        emotion: "sad",
      },
    ],
    choices: [
      {
        id: "still-block-late",
        text: 'Type nothing. Block the number. Close everything.',
        tactic: "The latest possible recovery. The thread is on the record; the call did not happen; the next move is yours and the next move is silence. The body did the warm reply and learned, in the body, the difference between the warm reply landing and the call being declined. Both pieces of data are useful.",
        nextSceneId: "ending-late-recovery",
        isOptimal: true,
      },
      {
        id: "accept-call",
        text: 'Type: "yes. call me in ten minutes."',
        tactic: "The call is booked. The next six weeks are now being played out in real time. The track will play the six weeks in full as a single long scene so the relapse is taught, not labelled.",
        nextSceneId: "the-six-weeks",
        isOptimal: false,
      },
    ],
  },

  {
    id: "the-six-weeks",
    backgroundId: "apartment",
    mood: "tense",
    presentCharacterIds: ["the-ex-him", "inner-voice"],
    dialog: [
      {
        speakerId: null,
        text: "The call happens at 4:54 p.m. Forty-seven minutes. He is, at twelve minutes, kinder than he was in the year. He is, at twenty-six minutes, naming things he never named while you were dating. He is, at thirty-eight minutes, asking if he can come over.",
      },
      {
        speakerId: null,
        text: "Friday: dinner at yours. He brings a bottle of the orange wine. He uses the phrase emotional unavailability about himself, accurately, for the first time in your relationship's history. You sleep together at 11:48 p.m. and the sleep is the same sleep you remember.",
      },
      {
        speakerId: null,
        text: "Week two: he is at the flat three nights. The toothbrush is back in the cup. The hoodie is on the chair. The playlist is, again, pinned to the kitchen speaker. The L2-2 audit is operationally undone.",
      },
      {
        speakerId: null,
        text: "Week four: the first fight. The fight is the same fight as the one in February of the second year. He apologises, with the new vocabulary, and the new vocabulary is the same architecture as the old vocabulary plus four months of having read books about emotional unavailability.",
      },
      {
        speakerId: null,
        text: "Week six: the second silence begins. The pattern is recognisable. The silence is, this time, fourteen days. At day fifteen he sends a text from his actual number, not the new one. Two lines, lowercase, a kiss.",
      },
      {
        speakerId: "inner-voice",
        tone: "tactical",
        text: "The six weeks ran the relationship through the entire cycle in compressed time. You learned, in the body, that the lowercase opener at 4:13 on a Tuesday in week eight was always going to lead here. The eight weeks of work are not destroyed; they are paused. The L1-2 audit will have to be redone. The L2-2 audit will have to be redone. The L3 and L4 disciplines will have to start over, on lower credit, because the body now knows the dopamine event will, technically, be available again if you tap once.",
        emotion: "sad",
      },
    ],
    choices: [
      {
        id: "end-after-six-weeks",
        text: "Block the new number, block the old number, re-do L1-2 tonight, re-set the alarm for 5:42 tomorrow.",
        tactic: "The recovery from the six weeks is the recovery the track will support. The relapse is the lesson; the lesson is that the lowercase opener is the door to the six weeks; the door, closed once, must be closed for good. The eight weeks of work return; they return with the body knowing the cost of the open door.",
        nextSceneId: "ending-six-weeks-recovered",
        isOptimal: true,
      },
      {
        id: "stay-in-it",
        text: "Reply to the day-fifteen text. The pattern continues.",
        tactic: "The track ends here for this run. The relapse compounds. The eight weeks of work were the runway; the lowercase opener at 4:13 in week eight was the boss; the boss won this run.",
        nextSceneId: "ending-relapse-compounds",
        isOptimal: false,
      },
    ],
  },

  {
    id: "the-screenshot",
    backgroundId: "apartment",
    mood: "tense",
    presentCharacterIds: ["naomi", "inner-voice"],
    dialog: [
      {
        speakerId: null,
        text: "Naomi reads it inside of two minutes. Three texts back, in sequence.",
      },
      {
        speakerId: "naomi",
        emotion: "angry",
        text: 'NO. absolutely not. this is. tell me you are blocking.',
      },
      {
        speakerId: "naomi",
        emotion: "angry",
        text: 'wait actually send me the full text. i need to see the whole thing.',
      },
      {
        speakerId: "naomi",
        emotion: "concerned",
        text: 'are you OK? do you want me to come over.',
      },
      {
        speakerId: "inner-voice",
        tone: "tactical",
        text: "The audit is now happening in Naomi's living room. Naomi, briefed by L3-2, is in council mode. Her concern is real and her concern is, in this moment, doing the audit you needed to do alone. The screenshot is the council assuming responsibility for the read; the read is supposed to be yours.",
        emotion: "serious",
      },
    ],
    choices: [
      {
        id: "do-the-block-anyway",
        text: 'Reply to Naomi: "I am blocking now." Do it. Send her the block screenshot. Then leave the phone for two hours.',
        tactic: "Half-recovery. The council got briefed; the block happened anyway; the audit is partly outsourced and partly held. The block screenshot to Naomi is, structurally, asking her to grade the move, which is the audit still outside you. Imperfect. Holds.",
        nextSceneId: "the-clean-close-after-screenshot",
        isOptimal: true,
      },
      {
        id: "send-her-full-text",
        text: "Turn the phone over. Read the message. Send Naomi the full screenshot.",
        tactic: "The full read happens for an audience. The message that was supposed to be processed by you is, now, processed by Naomi. The council will, by tomorrow, have a canonical interpretation of this message. The interpretation will be sharper than the message; the sharper interpretation will displace your own read; by the time the second message arrives, you will be auditing it through Naomi's eyes, which is not the audit the track has been building.",
        nextSceneId: "the-second-message-arrives",
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
    endingTitle: "Blocked, Unread",
    endingLearnPrompt:
      "The number was blocked before the message was read. Four levels of work were visible in the speed of one long-press. The text is, now, an event that did not happen to you. The book is open at the same page; the tea is still warm; the playlist from 2019 is on the next track. The L5 boss landed and was closed inside of nine seconds because the channel L1-2 missed was closed before the new channel could open. This is the track's hardest possible ending, and it is the cheapest one. Cost compounds.",
    dialog: [
      {
        speakerId: "inner-voice",
        text: "Phone face-down again. Tea sip. The flat is the flat it was at 4:12. The boss did not exist for you.",
        emotion: "knowing",
      },
      {
        speakerId: "inner-voice",
        tone: "tactical",
        text: "Closure does not arrive. It grows over. You just grew over.",
        emotion: "knowing",
      },
    ],
    choices: [],
  },

  {
    id: "the-clean-close-after-read",
    backgroundId: "apartment",
    mood: "peaceful",
    isEnding: true,
    outcomeType: "good",
    endingTitle: "Read, Blocked, Silent",
    endingLearnPrompt:
      "The message was read; the number was blocked; the silence held. The structural lesson of L5-1 landed: reading is a permission, but reading is not engagement, and the close after the read can be as clean as the close before the read if the close is decisive. The body felt the warmth at the chest at 4:13 and the warmth at the chest at 4:18; the second one was the data point. The eight weeks of work absorbed the message without converting it into a response. This is the read of a person who owns their value because the work has been done in the body, not announced to him.",
    dialog: [
      {
        speakerId: "inner-voice",
        text: "Tea still warm. Page held. The book is the book and the phone is on the counter. He sent a message. You read it. You closed the door.",
        emotion: "knowing",
      },
      {
        speakerId: "inner-voice",
        tone: "tactical",
        text: "Reading is permission. The silence is the verdict.",
        emotion: "knowing",
      },
    ],
    choices: [],
  },

  {
    id: "the-clean-close-after-second",
    backgroundId: "apartment",
    mood: "peaceful",
    isEnding: true,
    outcomeType: "good",
    endingTitle: "The Second Message, Closed",
    endingLearnPrompt:
      "The first message was read and left; the second message was the cost of leaving the channel open; the second message produced the block that should have followed the first. Eleven days of half-discipline ended cleanly. The L1-1 floor returned. The L5 boss is closed; the third message does not arrive; the audit returns to its work. The lesson lands at three-quarter cost: close the channel on the first message next time. The body learned, in the eleven days between messages, what an open channel costs.",
    dialog: [
      {
        speakerId: "inner-voice",
        text: "Phone in the kitchen drawer. Eleven days of partial open. Closed now. The audit returns.",
        emotion: "knowing",
      },
    ],
    choices: [],
  },

  {
    id: "the-clean-close-after-apology",
    backgroundId: "apartment",
    mood: "peaceful",
    isEnding: true,
    outcomeType: "good",
    endingTitle: "The Apology, Refused",
    endingLearnPrompt:
      "The third message offered the apology you wrote and never sent. The block was the answer. Closure does not arrive at 2:14 on a Sunday afternoon via a third message after two ignored ones; closure grows over a wound that was never reopened. The apology refused is the hardest block on the track and the one that confirms the work has integrated. The body let the offer pass without converting it into the door it was engineered to be. The audit is complete; the runway L1 through L4 built has held under the boss's full weight.",
    dialog: [
      {
        speakerId: "inner-voice",
        text: "Sunday afternoon. Sunlight on the kitchen floor. The new number blocked. The audit, complete.",
        emotion: "knowing",
      },
      {
        speakerId: "inner-voice",
        tone: "tactical",
        text: "Closure grew over. You grew over.",
        emotion: "knowing",
      },
    ],
    choices: [],
  },

  {
    id: "the-clean-close-after-curiosity",
    backgroundId: "apartment",
    mood: "peaceful",
    isEnding: true,
    outcomeType: "neutral",
    endingTitle: "The Bookshop, Blocked",
    endingLearnPrompt:
      "The curiosity opened the door briefly; the bookshop memory was on the table for six minutes; the block closed the door before the memory became a thread. The lesson lands at three-quarter cost: curiosity is the door, not the audit, and the door, once cracked, costs you the data point of having considered the artefact. By next Tuesday the bookshop will be just a bookshop again. The audit returns; the runway holds; the L5 boss did not win.",
    dialog: [
      {
        speakerId: "inner-voice",
        text: "Phone face-down. The bookshop in your head for nine more minutes, then less, then a memory the size of any other.",
        emotion: "knowing",
      },
    ],
    choices: [],
  },

  {
    id: "the-clean-close-after-please-stop",
    backgroundId: "apartment",
    mood: "peaceful",
    isEnding: true,
    outcomeType: "neutral",
    endingTitle: "The Please-Stop, Then Block",
    endingLearnPrompt:
      "The please-stop was the engagement; the block was the recovery. The cost of the please-stop is the small confirmation he received that he had reach. The block prevented the eleven-day next message. The lesson lands at half cost: silence first, block second, please-stop never. The L5 boss closed at the second move instead of the first, which is the second-best outcome the track allows.",
    dialog: [
      {
        speakerId: "inner-voice",
        text: "Thread deleted. Number blocked. The please-stop sentence on the screen for nineteen seconds, then gone.",
        emotion: "knowing",
      },
    ],
    choices: [],
  },

  {
    id: "the-clean-close-after-screenshot",
    backgroundId: "apartment",
    mood: "cold",
    isEnding: true,
    outcomeType: "neutral",
    endingTitle: "The Council, Briefed",
    endingLearnPrompt:
      "The screenshot went to Naomi; the block happened anyway; the audit was partly outsourced and partly held. The cost is the council, briefed without your audit having happened first, will now hold the canonical interpretation of this message for you. The lesson lands at half cost: the move was correct; the routing was outside-in instead of inside-out. The next channel-event, if there is one, gets audited by you, not by the council; the council can be told after.",
    dialog: [
      {
        speakerId: "inner-voice",
        text: "Naomi: 'proud of you.' Phone in the drawer. The audit you did not do alone has been done by you and Naomi together, in the chat.",
        emotion: "serious",
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
    endingTitle: "The Reply, Withdrawn",
    endingLearnPrompt:
      "The warm reply went; the call was declined; the block followed. The body did the warm reply and learned in the body the difference between the warm reply landing and the call being refused. The runway is not destroyed; it is now running on smaller credit. The next eight weeks of work happen on top of the message in his inbox that says i've been thinking about you too. That sentence is on the record. The track holds; the L5 boss landed and was closed before the six-week scene began. The lesson is, expensive but recoverable.",
    dialog: [
      {
        speakerId: "inner-voice",
        text: "The thread closed. The reply, the second one, never sent. The runway under smaller credit, still a runway.",
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
      "The six weeks ran. The relationship cycled through the entire architecture in compressed time: the call, the dinner, the toothbrush, the fight, the second silence. The recovery, after the second silence, is the recovery the track will support; the eight weeks of L1 through L4 work are not destroyed, they are paused; they return on smaller credit because the body now knows the dopamine event will, technically, be available if you tap once. Re-do L1-2 tonight (block both numbers). Re-do L2-2 tomorrow (the flat is operationally compromised). The L3 and L4 disciplines restart at 5:42 a.m. Thursday, on the body that has lived this twice now.",
    dialog: [
      {
        speakerId: "inner-voice",
        text: "Day fifteen text on the screen. Read. Not responded to. Phone in the drawer. The flat, again, the audit ahead.",
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
    endingTitle: "The Pattern, Continued",
    failureBlogSlug: "narcissistic-hoovering-explained",
    failureBlogTitle: "Narcissistic Hoovering: When Your Ex Tries to Suck You Back In",
    endingLearnPrompt:
      "The day-fifteen text was replied to. The pattern continued. The L5 boss won this run; the runway L1 through L4 built was the time it took for the boss to develop the calibrated lowercase opener. The relationship returns in the same architecture, with new vocabulary. The track is not lost; the run is. Replay L5-1 from the cold-open knowing the body now knows the cost of the warm reply. The eight weeks of work are not gone; they are inside you. The work is the only thing that ever was actually yours.",
    dialog: [
      {
        speakerId: "inner-voice",
        text: "Reply sent. His face in the doorway again two days later. The toothbrush again. The hoodie again. The 2019 playlist no longer pinned.",
        emotion: "sad",
      },
    ],
    choices: [],
  },
];

export const afterHim51: Scenario = {
  id: "after-him-5-1",
  title: "The Vague Text",
  tagline:
    "Tuesday, 4:13 p.m. New number. Lowercase. A kiss. The deniability is the message. His return is a measurement, not a verdict.",
  description:
    "After-Him L5-1. THE BOSS. Shape D, twenty-two scenes, every tactic of the track in sequence. The hoover lands through the channel L1-2 missed and tests, in one tap, the eight weeks of work the runway built. The teaching is the read: his return is a measurement of your mate value (real signal), a measurement of his character (real signal), and a romantic event only if you choose to convert it. The bad ending plays the six weeks in full so the relapse is taught, not labelled. The good ending closes the channel before the message is read because the work has integrated faster than the message can land.",
  tier: "vip",
  track: "after-him",
  level: 5,
  order: 1,
  estimatedMinutes: 18,
  difficulty: "advanced",
  category: "narcissist",
  xpReward: 620,
  badgeId: "the-vague-text-refused",
  startSceneId: "the-buzz",
  prerequisites: ["after-him-4-2"],
  tacticsLearned: [
    "Block before reading. The work compounds at the speed of the close.",
    "Reading is permission; silence is the verdict.",
    "Please-stop is a yes. Silence first, block second, please-stop never.",
    "The third-message apology offers what L1-1 was about. Closure does not arrive by transaction.",
    "The warm reply is the door to a six-week scene that runs the whole cycle compressed.",
  ],
  redFlagsTaught: [
    "The lowercase + kiss as built-in deniability",
    "The strategic specificity (the bookshop) as the cleanest re-entry artefact",
    "The 'miss talking to you' that specifies the function being reached for",
    "The escalation cadence of eleven days between messages",
    "The screenshot to friends that outsources the audit to the council",
  ],
  characters: [INNER_VOICE, THE_EX_HIM, NAOMI],
  scenes,
  isNew: true,
};

export default afterHim51;
