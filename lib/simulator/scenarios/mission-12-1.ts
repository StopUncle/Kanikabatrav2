/**
 * Mission 12-1 — "The Whisper Network"
 *
 * Level 12, order 1. Capstone of the Maris-arc family thread.
 *
 * Two weeks after L11-2. The mother could not get the signature direct, so
 * she went lateral. Ren is now holding a re-spun version of Sunday — sold
 * to them on the drive home. Priya's mother got a phone call. The smear is
 * already in motion across two fronts by the time the player learns about
 * it. The scenario is the discipline of NOT defending — because defending
 * is the smear's amplifier — and instead pre-empting with one calibrated
 * sentence per affected party.
 *
 * Closes the structural loop opened in mission-1-1: that scenario taught
 * the player to read three messages on their phone in the morning after a
 * win. This one tests them on three contested fronts in the morning after
 * a no.
 *
 * Voice: reference/KANIKA-VOICE.md. The mother is now off-screen — she is
 * a force the player feels through the third parties she has called. The
 * player never speaks to her in this scenario. That is the win.
 */

import type { Scenario, Scene } from "../types";
import {
  THE_MOTHER,
  GOLDEN_SIBLING,
  PRIYA,
  INNER_VOICE,
} from "../characters";

const scenes: Scene[] = [
  // ---------------------------------------------------------------------
  // PART 1 — The phone hums (Tuesday afternoon)
  // ---------------------------------------------------------------------
  {
    id: "the-text",
    backgroundId: "apartment-kitchen",
    mood: "cold",
    dialog: [
      {
        speakerId: null,
        text: "Tuesday. Two weeks since the dinner. The phone hums against the kitchen counter while you are cutting fennel.",
        emotion: "neutral",
      },
      {
        speakerId: null,
        text: 'REN: "Mom called. She is really hurt about Sunday. Can we talk?"',
        emotion: "neutral",
      },
      {
        speakerId: "inner-voice",
        text: "Ren was there. The version they are holding now was sold to them on the drive home.",
        emotion: "knowing",
      },
    ],
    choices: [
      {
        id: "call-ren-now",
        text: "Call Ren immediately. Get ahead of it.",
        nextSceneId: "ren-call-rushed",
        feedback: "Speed feels like control. It rarely is.",
      },
      {
        id: "wait-think",
        text: "Put the knife down. Wash your hands. Sit on the floor for ten minutes before you reply.",
        nextSceneId: "the-priya-text",
        feedback:
          "Time you spend thinking is time the smear is not traveling further by your hand.",
        isOptimal: true,
        tactic: "Patience as containment",
        event: "12-1-paused-before-replying",
      },
      {
        id: "text-defend",
        text: 'Text back: "That is not what happened."',
        nextSceneId: "defense-trap-1",
        feedback: "You just sent her a written sentence she can quote.",
      },
      {
        id: "ignore-completely",
        text: "Don't reply. Ren can wait.",
        nextSceneId: "silence-cost",
        feedback: "Silence is a choice too. Watch what it says.",
      },
    ],
  },

  // ---------------------------------------------------------------------
  // PART 2 — The second front opens
  // ---------------------------------------------------------------------
  {
    id: "the-priya-text",
    backgroundId: "apartment-living",
    mood: "tense",
    dialog: [
      {
        speakerId: null,
        text: "Ten minutes on the floor. Then twenty. The fennel goes warm on the cutting board. The phone hums again.",
        emotion: "neutral",
      },
      {
        speakerId: null,
        text: 'PRIYA: "Hey. Random — your mom called my mum yesterday. She was asking how I am. Then she said something odd about you. I did not know what to say. Wanted to flag it."',
        emotion: "concerned",
      },
      {
        speakerId: "inner-voice",
        text: "Two fronts now. She did not call Priya — that would have been refused. She called Priya's mother, who would not refuse a call from an old family friend.",
        emotion: "knowing",
      },
      {
        speakerId: "inner-voice",
        text: "Information laundering. That has a name.",
        emotion: "knowing",
      },
    ],
    choices: [
      {
        id: "call-priya-now",
        text: "Call Priya immediately to find out what was said.",
        nextSceneId: "priya-call-rushed",
        feedback:
          "You will get the words. You will also give Priya a frantic version of you to remember.",
      },
      {
        id: "plan-triage",
        text: "Read both texts again. Then plan: who first, what tone.",
        nextSceneId: "triage",
        feedback: "Right. Triage is what you do when there are two wounds.",
        isOptimal: true,
        tactic: "Triage before action",
      },
      {
        id: "text-priya-defend",
        text: 'Text Priya: "She is lying. None of it is true. Do not believe her."',
        nextSceneId: "defense-trap-1",
        feedback:
          "You just made the smear the subject of every conversation you have with Priya for a month.",
      },
      {
        id: "ignore-priya-too",
        text: "Read it. Set the phone face-down. Do nothing today.",
        nextSceneId: "silence-cost",
        feedback:
          "Silence on two fronts is twice the silence. It also doubles the time the rumor has to land.",
      },
    ],
  },

  // ---------------------------------------------------------------------
  // PART 3 — Triage. Who first, and how.
  // ---------------------------------------------------------------------
  {
    id: "triage",
    backgroundId: "apartment-living",
    mood: "cold",
    dialog: [
      {
        speakerId: "inner-voice",
        text: "Ren was there on Sunday. Ren has the data. The contested ground is Ren's own memory.",
        emotion: "knowing",
      },
      {
        speakerId: "inner-voice",
        text: "Priya was not there. The contested ground with Priya is your character. That is a different conversation.",
        emotion: "knowing",
      },
      {
        speakerId: "inner-voice",
        text: "First conversation: the witness. Second conversation: the friend.",
        emotion: "knowing",
      },
    ],
    choices: [
      {
        id: "ren-first-calibrated",
        text: "Call Ren first. Do not refute the mother. Ask what Ren remembers of Sunday.",
        nextSceneId: "the-ren-call",
        feedback:
          "Right. Refuting Mother to Ren makes it your word against hers. Asking Ren what they remember puts Ren back inside their own evening.",
        isOptimal: true,
        tactic: "Witness reconstruction over counter-narrative",
        xpBonus: 5,
      },
      {
        id: "priya-first-short",
        text: "Text Priya first — short frame. Then call Ren.",
        nextSceneId: "the-priya-message-first",
        feedback:
          "Defensible. The cost is that Ren has been stewing for another hour by the time you get there.",
      },
      {
        id: "send-mass-text",
        text: "Send the same group message to Ren and Priya — the whole story, your side.",
        nextSceneId: "defense-trap-2",
        feedback:
          "A group message about a smear is a smear about a smear. You just wrote her marketing copy.",
      },
      {
        id: "do-nothing-yet",
        text: "Sit on it another day. Let the temperature drop.",
        nextSceneId: "silence-cost",
        feedback:
          "Sometimes time is your friend. Two weeks of unanswered story is not one of those times.",
      },
    ],
  },

  // ---------------------------------------------------------------------
  // PART 4 — The Ren call (the set-piece)
  // ---------------------------------------------------------------------
  {
    id: "the-ren-call",
    backgroundId: "apartment-quiet",
    mood: "tense",
    dialog: [
      {
        speakerId: null,
        text: "You sit at the kitchen table. The fennel is in the bin. You take a glass of water before you dial — water gives you something to do with the second sentence if the first sentence lands wrong.",
        emotion: "neutral",
      },
      {
        speakerId: "sibling",
        text: '"Hey." A pause. "She is not okay. She has been crying since Sunday night. She said you would not even hold her hand."',
        emotion: "sad",
      },
      {
        speakerId: "inner-voice",
        text: "Ren is reciting. The cadence is hers, not theirs.",
        emotion: "knowing",
      },
    ],
    choices: [
      {
        id: "ask-what-ren-remembers",
        text: '"Ren — I want to ask you something. What do you remember about Sunday? Just what you saw, in order."',
        nextSceneId: "ren-reconstructs",
        feedback:
          "You did not refute. You invited Ren to walk back into the room. Their version of Sunday is the only one they trust.",
        isOptimal: true,
        tactic: "Witness reconstruction — let them name what they saw",
        xpBonus: 8,
        event: "12-1-asked-ren-to-remember",
      },
      {
        id: "refute-mother",
        text: '"That is not what happened, Ren. She is lying again. You were there."',
        nextSceneId: "ren-defensive",
        feedback:
          "Refuting Mother to Ren makes you the angry one in the conversation. She has been crying since Sunday. You sound furious. Guess who Ren now feels they need to protect.",
      },
      {
        id: "apologize-pre-emptively",
        text: '"I am sorry if she felt that way. I will call her."',
        nextSceneId: "apology-trap",
        feedback:
          "An apology you do not mean for a thing you did not do becomes paperwork she can cite for the next twenty years.",
      },
      {
        id: "name-the-tactic",
        text: '"Ren — what you are saying is the version she gave you on the drive home. I want to ask what you saw, before that version. Not what she said. What you saw."',
        nextSceneId: "ren-recognizes",
        feedback:
          "Naming the move directly is high-risk. With Ren, it can land — they were the witness, and they know how she talks. With anyone else this would be a bridge too far.",
        isOptimal: true,
        tactic: "Name the version vs. the memory",
        xpBonus: 6,
      },
    ],
  },

  // ---------------------------------------------------------------------
  // Ren reconstructs — the optimal path
  // ---------------------------------------------------------------------
  {
    id: "ren-reconstructs",
    backgroundId: "apartment-quiet",
    mood: "peaceful",
    dialog: [
      {
        speakerId: "sibling",
        text: '"What I... saw." A long quiet. "I mean. We got there at four. You said hello at the door. She hugged you. You did not hug back for a second. Then you did."',
        emotion: "neutral",
      },
      {
        speakerId: "sibling",
        text: '"Dinner was fine. The thing in the study — she had three documents out. Not one. She said it was for the cabin but two of them were not. You said no. You said it three times. You said it warm."',
        emotion: "neutral",
      },
      {
        speakerId: "sibling",
        text: '"You did not hold her hand. You also did not yell. You left at 7:30 because you said you would. I drove."',
        emotion: "neutral",
      },
      {
        speakerId: "sibling",
        text: '"... that is what I saw." Another quiet. "She told me on the way back that you broke her heart. I think I let her say it because I was tired."',
        emotion: "knowing",
      },
      {
        speakerId: "inner-voice",
        text: "Ren just walked back into the room and the room was exactly as it had been. She did not get the witness.",
        emotion: "knowing",
      },
    ],
    choices: [
      {
        id: "thank-ren-quietly",
        text: '"Thank you. That is what I remember too. I did not call to argue with you. I called to ask what you saw."',
        nextSceneId: "the-priya-message",
        feedback:
          "Closing the call without asking Ren to take a side. The side they took is going to be their own memory, which is the only side that holds.",
        isOptimal: true,
        tactic: "Exit the call without a recruitment ask",
        xpBonus: 5,
      },
      {
        id: "now-recruit-ren",
        text: '"So you will tell her that, right? That she is wrong?"',
        nextSceneId: "ren-recoils",
        feedback:
          "You had it. You then asked for marketing services. Ren does not want to fight her. They wanted to talk to you.",
      },
    ],
  },

  // Ren recognizes — also-good path
  {
    id: "ren-recognizes",
    backgroundId: "apartment-quiet",
    mood: "peaceful",
    dialog: [
      {
        speakerId: "sibling",
        text: '"... yeah." Long pause. "She does do that thing. Where on the drive home there is a version that was not the version we were in. I did not realize it was happening until you said it."',
        emotion: "knowing",
      },
      {
        speakerId: "sibling",
        text: '"What do you want me to do?"',
        emotion: "neutral",
      },
      {
        speakerId: "inner-voice",
        text: "Now Ren is offering. Take less than what is offered.",
        emotion: "knowing",
      },
    ],
    choices: [
      {
        id: "take-less",
        text: '"Nothing. Just — when she calls you next time, you can listen and not pass it on. That is enough."',
        nextSceneId: "the-priya-message",
        feedback:
          "Asking for nothing is asking for the right thing. Ren is not your soldier; Ren is your sibling.",
        isOptimal: true,
        tactic: "Ask for less than is offered",
        xpBonus: 5,
      },
      {
        id: "ask-ren-to-confront",
        text: '"Push back next time. Tell her she is wrong."',
        nextSceneId: "ren-recoils",
        feedback:
          "You weaponized your sibling against the person who raised them both. That cost is going to surface in three months when Ren needs something from her and cannot ask.",
      },
    ],
  },

  // ---------------------------------------------------------------------
  // PART 5 — The Priya message (the calibrated frame)
  // ---------------------------------------------------------------------
  {
    id: "the-priya-message",
    backgroundId: "phone-screen",
    mood: "cold",
    dialog: [
      {
        speakerId: "inner-voice",
        text: "Priya is not Ren. Priya was not there. The frame Priya needs is shorter, factual, and asks for nothing.",
        emotion: "knowing",
      },
      {
        speakerId: "inner-voice",
        text: "What you do not say is the work. You are not going to ask her to defend you. You are not going to ask her to keep a secret. You are going to name the move and trust her.",
        emotion: "knowing",
      },
    ],
    choices: [
      {
        id: "short-frame",
        text:
          '"Hey — thanks for telling me. Two weeks ago I declined power of attorney over my mother. She has been calling people since. You will probably hear more. Nothing you need to do — wanted you to have the context. See you Tuesday."',
        nextSceneId: "ending-frame-held",
        feedback:
          "Names the move. Names the timeline. Asks for nothing. Closes with a real plan. Priya now has a frame to read everything she hears next month through.",
        isOptimal: true,
        tactic: "The pre-empt — short, factual, no recruitment",
        xpBonus: 10,
        event: "12-1-pre-empted-clean",
      },
      {
        id: "long-explanation",
        text:
          '"It is a long story. My mother has been like this my whole life. She does this thing where if she does not get what she wants she — well, in this case, she wanted me to sign a power of attorney, which would have given her control over half of what I own, and..." [continues for four paragraphs]',
        nextSceneId: "ending-defended",
        feedback:
          "Every sentence after the third one is one Priya did not need. You also just spent your remaining social capital with her on this story instead of on something that mattered to you both.",
      },
      {
        id: "recruit-priya",
        text:
          '"Can you talk to your mum and tell her none of it is true? It would mean a lot."',
        nextSceneId: "defense-trap-2",
        feedback:
          "You enlisted a friend to defend you to a parent of hers. The friend is now in the middle of a problem she did not start. That is the kind of ask that ends a friendship.",
      },
      {
        id: "say-nothing-back",
        text: 'Reply only: "Thanks for letting me know."',
        nextSceneId: "ending-defended",
        feedback:
          "Polite. Defensible. It also does not give Priya any frame to read the next call her mother gets. The smear travels through the silence you left behind.",
      },
    ],
  },

  // ---------------------------------------------------------------------
  // FAILURE & RECOVERY BRANCHES
  // ---------------------------------------------------------------------

  {
    id: "ren-call-rushed",
    backgroundId: "apartment-living",
    mood: "tense",
    dialog: [
      {
        speakerId: null,
        text: "You dial before the kettle has even started. Your voice is pitched a half-tone above where it usually sits.",
        emotion: "neutral",
      },
      {
        speakerId: "sibling",
        text: '"Whoa — okay. Slow down. She just said you were really cold to her."',
        emotion: "neutral",
      },
      {
        speakerId: "inner-voice",
        text: "Ren is not on your side yet. Ren is calming you. That is a worse position than the one you started in twelve minutes ago.",
        emotion: "knowing",
      },
    ],
    choices: [
      {
        id: "slow-down-recover",
        text: "Stop. Take a breath. Ask Ren what they remember of Sunday, in their own words.",
        nextSceneId: "the-ren-call",
        feedback:
          "You just rescued the call. The cost is that Ren now has to switch frames mid-conversation, which they will register.",
      },
      {
        id: "keep-pressing",
        text: 'Talk faster. "She is lying, Ren, she is doing the thing she always does — "',
        nextSceneId: "ren-defensive",
        feedback:
          "The faster you talk the more she sounds like the calm one in the story.",
      },
    ],
  },

  {
    id: "priya-call-rushed",
    backgroundId: "apartment-living",
    mood: "tense",
    dialog: [
      {
        speakerId: null,
        text: "You call. Priya picks up on the second ring with a careful 'hey'. You hear her dog in the background.",
        emotion: "neutral",
      },
      {
        speakerId: "priya",
        text: '"Yeah — she said something about you not visiting much, and that you were difficult about money. Honestly I tuned out."',
        emotion: "knowing",
      },
      {
        speakerId: "inner-voice",
        text: "Priya already filed it correctly. You called her in a panic to get information she had already discarded.",
        emotion: "knowing",
      },
    ],
    choices: [
      {
        id: "thank-priya-recover",
        text: '"Got it. Thank you. I will explain in one short message later — promise."',
        nextSceneId: "triage",
        feedback:
          "Recovered. The temperature on the call drops. You owe Priya the short message you just promised.",
      },
      {
        id: "priya-deep-dive",
        text: 'Tell Priya the whole story now, on the call. "So basically what is happening is — "',
        nextSceneId: "ending-defended",
        feedback:
          "You used a phone call to deliver something that should have been one written paragraph. Priya is now your audience, not your friend.",
      },
    ],
  },

  {
    id: "the-priya-message-first",
    backgroundId: "phone-screen",
    mood: "cold",
    dialog: [
      {
        speakerId: "inner-voice",
        text: "You went to Priya before Ren. The frame to Priya is the same calibrated frame. The cost is that Ren is stewing the whole time you are typing.",
        emotion: "knowing",
      },
    ],
    choices: [
      {
        id: "still-do-it-clean",
        text:
          '"Hey — thanks for the heads-up. Declined POA over my mother two weeks ago; she is calling people. Nothing for you to do. See you Tuesday." — then call Ren.',
        nextSceneId: "the-ren-call",
        feedback:
          "The frame to Priya is right. You can still recover Ren — just be aware Ren has been on the cold version of you for an extra hour.",
      },
      {
        id: "long-priya-then-ren",
        text:
          'Send Priya the long version, then call Ren.',
        nextSceneId: "ending-defended",
        feedback:
          "You spent your patience on the wrong front. By the time you call Ren you are tired, and Ren reads tired as cold.",
      },
    ],
  },

  {
    id: "defense-trap-1",
    backgroundId: "phone-screen",
    mood: "cold",
    dialog: [
      {
        speakerId: null,
        text: "The bubble shows Ren typing. Stops. Starts. Stops.",
        emotion: "neutral",
      },
      {
        speakerId: "sibling",
        text: '"... okay. I will tell her you said that."',
        emotion: "neutral",
      },
      {
        speakerId: "inner-voice",
        text: "The screenshot is already taken. Five words you can be quoted on, forwarded to Mother by 6 pm, paraphrased to two aunts by Friday.",
        emotion: "knowing",
      },
      {
        speakerId: "inner-voice",
        text: "Written sentences are evidence. Spoken sentences are stories. You wrote evidence.",
        emotion: "knowing",
      },
    ],
    choices: [
      {
        id: "follow-up-call",
        text: "Call Ren now to soften it. Verbal cleanup of a written mistake.",
        nextSceneId: "the-ren-call",
        feedback:
          "Damage limited but not undone. The screenshot is still the screenshot. Verbal cannot erase written.",
      },
      {
        id: "double-down-text",
        text: 'Send another text: "I mean it. None of it is true. She is the one who is lying."',
        nextSceneId: "defense-trap-2",
        feedback: "Two screenshots now. You doubled the evidence.",
      },
    ],
  },

  {
    id: "defense-trap-2",
    backgroundId: "phone-screen",
    mood: "cold",
    dialog: [
      {
        speakerId: null,
        text: "The phone goes quiet. Quiet for a full hour. Then a notification you did not expect: an aunt you have not spoken to in two years has shared a long Facebook post about 'family' and 'difficult adult children.'",
        emotion: "neutral",
      },
      {
        speakerId: "inner-voice",
        text: "Your written defense traveled. Faster than you did. The smear now has citations.",
        emotion: "knowing",
      },
    ],
    nextSceneId: "ending-amplified",
  },

  {
    id: "silence-cost",
    backgroundId: "apartment-quiet",
    mood: "cold",
    dialog: [
      {
        speakerId: null,
        text: "Three days pass. Five. The fennel-stained cutting board is back in the drawer. The phone keeps quietly accumulating notifications.",
        emotion: "neutral",
      },
      {
        speakerId: null,
        text: "Ren has not texted again. You can feel the absence of the text more than you would have felt the text. Priya has been a small degree warmer on Tuesday than usual, which is its own data.",
        emotion: "neutral",
      },
      {
        speakerId: "inner-voice",
        text: "A vacuum is also a story. The version someone tells in your silence becomes the version of you that the room remembers.",
        emotion: "knowing",
      },
    ],
    nextSceneId: "ending-amplified",
  },

  {
    id: "ren-defensive",
    backgroundId: "apartment-living",
    mood: "tense",
    dialog: [
      {
        speakerId: "sibling",
        text: '"Look — I cannot do this with you right now. She is crying. You are angry. I am tired. I have to go."',
        emotion: "sad",
      },
      {
        speakerId: "inner-voice",
        text: "You did not lose Ren. You did spend the next month of small talk you would have had with them on this evening of large talk.",
        emotion: "knowing",
      },
    ],
    nextSceneId: "ending-defended",
  },

  {
    id: "apology-trap",
    backgroundId: "apartment-living",
    mood: "cold",
    dialog: [
      {
        speakerId: "sibling",
        text: '"Okay. She would like that. I will tell her you said you would call."',
        emotion: "neutral",
      },
      {
        speakerId: "inner-voice",
        text: "You just wrote her a check on a future you did not authorize. By Sunday, Mother will be telling cousins that you 'apologized for how you treated her.' That sentence is now a load-bearing wall.",
        emotion: "knowing",
      },
    ],
    nextSceneId: "ending-defended",
  },

  {
    id: "ren-recoils",
    backgroundId: "apartment-living",
    mood: "tense",
    dialog: [
      {
        speakerId: "sibling",
        text: '"... I do not want to be in the middle of this. I love both of you. Please do not ask me to pick."',
        emotion: "sad",
      },
      {
        speakerId: "inner-voice",
        text: "You had the witness. You then asked the witness to enlist. The witness is now leaving the courtroom.",
        emotion: "knowing",
      },
    ],
    nextSceneId: "ending-defended",
  },

  // ---------------------------------------------------------------------
  // ENDINGS
  // ---------------------------------------------------------------------

  {
    id: "ending-frame-held",
    backgroundId: "apartment-quiet",
    mood: "peaceful",
    isEnding: true,
    outcomeType: "good",
    endingTitle: "The Frame Held",
    endingSummary:
      "Two weeks. Two fronts. Two short conversations. You did not refute her — you let Ren remember Sunday, and you gave Priya a frame to read every future call through. The smear traveled until it hit context, and then it stopped. The frame held because you did not defend it.",
    failureBlogSlug: undefined,
    dialog: [
      {
        speakerId: "inner-voice",
        text: "She did not get the signature. She did not get the witness. She did not get the friend. She got two weeks of phone calls that came back to her unmoved.",
        emotion: "knowing",
      },
      {
        speakerId: "inner-voice",
        text: "The discipline you just demonstrated — pre-empting instead of defending, naming the move once, asking for less than was offered — is the discipline most people lose at this exact phase. They survive the no. They lose the smear that follows.",
        emotion: "knowing",
      },
      {
        speakerId: null,
        text: "You put the phone face-down on the counter. You go back to the fennel. The kitchen smells faintly of warm aniseed.",
        emotion: "neutral",
      },
    ],
  },

  {
    id: "ending-defended",
    backgroundId: "apartment-quiet",
    mood: "cold",
    isEnding: true,
    outcomeType: "neutral",
    endingTitle: "The Argument Won",
    endingSummary:
      "You corrected the record. People believed you. The cost was visible: too much heat in your voice, too many sentences, a sibling who is now slightly tired of you, a friend who is now slightly informed about a family she did not sign up for. You won the argument. You spent equity to win it. Note that.",
    failureBlogSlug: "smear-by-defense",
    failureBlogTitle: "Why defending a smear amplifies it",
    dialog: [
      {
        speakerId: "inner-voice",
        text: "Defending a smear gives the smear a stage. Even when the defense lands, the topic has been promoted from background to foreground — and the smear's whole strategy was to be the topic.",
        emotion: "knowing",
      },
      {
        speakerId: "inner-voice",
        text: "The replay version of this scenario starts when you can feel that — when the impulse to defend arrives and you can let it pass without writing the sentence.",
        emotion: "knowing",
      },
    ],
  },

  {
    id: "ending-amplified",
    backgroundId: "apartment-quiet",
    mood: "danger",
    isEnding: true,
    outcomeType: "bad",
    endingTitle: "The Smear Traveled",
    endingSummary:
      "Either you wrote sentences she could screenshot, or you did nothing while she wrote them for you. Either way the smear traveled by your hand or by your silence. Two aunts have a version. Priya has a version. Ren has a version, and Ren's version is the one that came in on a drive home in a car that smelled of someone else's perfume. That version is now load-bearing.",
    failureBlogSlug: "smear-by-defense",
    failureBlogTitle: "Why defending a smear amplifies it",
    dialog: [
      {
        speakerId: "inner-voice",
        text: "You can recover this. You cannot recover it this week.",
        emotion: "knowing",
      },
      {
        speakerId: "inner-voice",
        text: "The recovery is one short paragraph, sent to one person at a time, no defense in it — three months from now, when there is something else to be said in the same conversation. Smears decay. Defenses do not.",
        emotion: "knowing",
      },
    ],
  },
];

export const mission121: Scenario = {
  id: "mission-12-1",
  title: "The Whisper Network",
  tagline:
    "She could not get the signature. She is getting the people instead.",
  description:
    "Two weeks after you left her house on your curfew. The lateral attack — phone calls to the witness, calls to the friend's mother, the version of Sunday she sold to Ren on the drive home. The discipline of NOT defending, because defending is the smear's amplifier, and instead pre-empting with one calibrated sentence per affected party. Closes the loop opened in mission 1-1 — that morning you read three messages on your phone. This morning you read three contested fronts.",
  tier: "vip",
  level: 12,
  order: 1,
  estimatedMinutes: 16,
  difficulty: "advanced",
  category: "narcissist",
  xpReward: 1500,
  badgeId: "frame-held",
  startSceneId: "the-text",
  prerequisites: ["mission-11-2"],
  tacticsLearned: [
    "Pre-empting over defending — one calibrated sentence per affected party",
    "Witness reconstruction — let the witness walk back into the room rather than refuting the rewrite",
    "Triage discipline — the witness conversation and the friend conversation are different conversations",
    "Asking for less than is offered — do not enlist allies into wars they did not start",
    "Information laundering recognition — calls to your friend's mother bypass refusal",
  ],
  redFlagsTaught: [
    "The drive-home rewrite — the version sold to a witness in the car after the event",
    "Information laundering — calling someone's parent instead of someone",
    "Defense-as-amplifier — written defenses become quotable evidence",
    "The recruitment ask — turning an ally into a soldier costs the relationship",
    "Smear-by-silence — the version someone tells in your silence becomes the room's version of you",
  ],
  reward: {
    id: "frame-held",
    name: "The Frame Held",
    description:
      "Named the move. Pre-empted instead of defended. Asked for nothing from the people you love. The smear traveled until it hit context, and then it stopped.",
  },
  characters: [THE_MOTHER, GOLDEN_SIBLING, PRIYA, INNER_VOICE],
  scenes,
};

export default mission121;
