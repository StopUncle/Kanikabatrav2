/**
 * Mission 11-1 — "The Letter"
 *
 * Level 11, order 1. Act 2 opener — "The Weight".
 * Five years after the no-contact decision at L8-2. A letter arrives by
 * physical mail in the protagonist's mother's handwriting. The scenario
 * is the gut decision about what to do with it — open, refuse, return to
 * sender, delegate to Ren, throw it away. No dialog with the mother; she
 * is not on-screen. The scenario is the interior of a decision.
 *
 * Canon hand-off: closes on a specific artefact sitting on the kitchen
 * counter (cream envelope — deliberate echo of the L1-2 card and L3
 * envelope) and an invitation Ren passes along. L11-2 opens on the
 * dinner that invitation leads to, or on the decision not to go.
 *
 * Voice: reference/KANIKA-VOICE.md. Priya register unchanged from v1.
 * Inner voice carries the weight — she's the narrator of this film
 * more than at any prior point.
 */

import type { Scenario, Scene } from "../types";
import {
  THE_MOTHER,
  GOLDEN_SIBLING,
  PRIYA,
  INNER_VOICE,
} from "../characters";

const scenes: Scene[] = [
  // ===================================================================
  // ACT 1 — the arrival
  // ===================================================================
  {
    id: "the-arrival",
    backgroundId: "apartment",
    mood: "peaceful",
    dialog: [
      {
        speakerId: null,
        text: "Five years since the text. Five years since you wrote 'I am not going to be available to you' and meant it.",
      },
      {
        speakerId: null,
        text: "Tuesday, 6:47 pm. You come home from the office. On the mat inside your door: a cream envelope, hand-addressed, your name in a script you know better than your own.",
      },
      {
        speakerId: null,
        text: "No return address. She didn't write one. She never does.",
      },
      {
        speakerId: "inner-voice",
        text: "Your body knew before your eyes did. Your hand was already at the edge of the counter before your mind caught up with the handwriting. That is what five years of discipline looks like — the body recognises the threat a half-second before it can be articulated. Note that. You have become someone who reads a room through skin.",
        emotion: "knowing",
      },
      {
        speakerId: null,
        text: "You pick it up. The paper is heavy. Rag stock. She bought it somewhere specific.",
      },
    ],
    choices: [
      {
        id: "take-to-counter",
        text: "Take it to the kitchen counter. Set it down. Don't open it yet.",
        tactic: "Distance before decision. The envelope does not get to choose when you read it.",
        nextSceneId: "counter-pause",
        isOptimal: true,
      },
      {
        id: "open-immediately",
        text: "Open it now. Rip it. You can't un-know what it says.",
        tactic: "Curiosity under pressure. Most decisions made at the door turn out to be decisions her hand guided, not yours.",
        nextSceneId: "open-at-door",
      },
      {
        id: "bin-it",
        text: "Put it in the recycling. Walk away. Make dinner.",
        tactic: "Clean refusal. Requires real discipline — most people bin an envelope and fish it out at 2 am.",
        nextSceneId: "binned-midnight",
      },
      {
        id: "text-priya-first",
        text: "Text Priya a photo of the envelope before you do anything.",
        tactic: "Route through an ally. Priya has watched this kind of mail arrive for other women before.",
        nextSceneId: "priya-replies",
        isOptimal: true,
      },
    ],
  },

  // ===================================================================
  // ACT 2A — the counter pause (optimal path)
  // ===================================================================
  {
    id: "counter-pause",
    backgroundId: "apartment",
    mood: "mysterious",
    dialog: [
      {
        speakerId: null,
        text: "You set the envelope on the counter, face-up. You do not put it down next to the kettle — that is where your life's objects live, and she does not get that real estate.",
      },
      {
        speakerId: null,
        text: "You put it on the counter's far end, where you keep nothing.",
      },
      {
        speakerId: "inner-voice",
        text: "Placement is a decision. You are telling yourself, before you have opened anything, that this letter is a visitor and not a resident. Most people do not get to make this distinction in their own kitchens. You earned the right to.",
        emotion: "knowing",
      },
      {
        speakerId: null,
        text: "You change out of your work clothes. You drink a glass of water. You sit down at the counter, on the stool, at an angle where the envelope is in your peripheral vision but not in front of you.",
      },
      {
        speakerId: "inner-voice",
        text: "The discipline is not 'do I open it'. The discipline is 'do I let it own the next hour'. It has already cost you about four minutes. That is the tax. Anything more is overpayment.",
        emotion: "knowing",
      },
    ],
    choices: [
      {
        id: "read-tonight",
        text: "Open it. Read it. Now. With Priya on speaker.",
        tactic: "Read with a witness. The letter exists; refusing to read it doesn't make it not exist. A witness changes what the reading costs.",
        nextSceneId: "read-with-priya",
        isOptimal: true,
      },
      {
        id: "sleep-on-it",
        text: "Don't open tonight. Sleep first. Decide in the morning.",
        tactic: "Delay once, intentionally. Sleep clarifies what adrenaline confuses.",
        nextSceneId: "morning-after",
        isOptimal: true,
      },
      {
        id: "ask-ren",
        text: "Call Ren. Ask them if they knew this was coming.",
        tactic: "Triangulate the intel. Ren might know the ask behind the letter before you open it.",
        nextSceneId: "ren-knew",
      },
      {
        id: "open-alone",
        text: "Open it alone. Don't involve anyone else.",
        tactic: "Solo reading is brave but thin — if it lands hard, you have no one in the room to check your read.",
        nextSceneId: "opened-alone",
      },
    ],
  },

  // ===================================================================
  // ACT 2B — Priya thread (optimal path)
  // ===================================================================
  {
    id: "priya-replies",
    backgroundId: "text-screen",
    mood: "peaceful",
    presentCharacterIds: ["priya"],
    dialog: [
      {
        speakerId: null,
        text: "Priya replies in ninety seconds. She is cooking; you can hear the kitchen in the pauses between her texts.",
      },
      {
        speakerId: "priya",
        text: '"Okay. Three things."',
        emotion: "knowing",
      },
      {
        speakerId: "priya",
        text: '"One — you are not alone right now. I am here. The envelope is not alone with you."',
        emotion: "serious",
      },
      {
        speakerId: "priya",
        text: '"Two — you do not have to open it tonight. It is not a subpoena. The envelope does not expire."',
        emotion: "serious",
      },
      {
        speakerId: "priya",
        text: '"Three — if you open it, do it on speaker with me. If you do not, put it somewhere that is not your kitchen. Those are the only two plans. Either is fine."',
        emotion: "serious",
      },
      {
        speakerId: "inner-voice",
        text: "A coach, in four paragraphs, delivered inside two minutes of a trigger. This is what having an ally looks like in adult life. It is not dramatic. It is logistical, warm, and specific.",
        emotion: "knowing",
      },
    ],
    choices: [
      {
        id: "open-on-call",
        text: '"Calling you. Going to open it with you on the line."',
        tactic: "Witness accepted. The emotional math is cleaner with a second pair of ears.",
        nextSceneId: "read-with-priya",
        isOptimal: true,
      },
      {
        id: "hold-the-line",
        text: '"Not tonight. Putting it in the drawer. Thanks."',
        tactic: "Delay with an ally's blessing is different from delay in isolation. You are not avoiding — you are triaging.",
        nextSceneId: "drawer-the-letter",
        isOptimal: true,
      },
      {
        id: "send-to-ren",
        text: '"Actually — I\'m going to ask Ren to read it first and tell me if I need to."',
        tactic: "Delegate the reading. Ren is the only other person in the world with standing to filter this for you.",
        nextSceneId: "ren-reads-it-first",
        isOptimal: true,
      },
    ],
  },

  // ===================================================================
  // ACT 3A — reading with Priya (canonical path)
  // ===================================================================
  {
    id: "read-with-priya",
    backgroundId: "apartment",
    mood: "mysterious",
    presentCharacterIds: ["priya"],
    immersionTrigger: "cold-moment",
    dialog: [
      {
        speakerId: null,
        text: "You put Priya on speaker. You set the phone on the counter next to the envelope so her voice is closer to it than yours is.",
      },
      {
        speakerId: "priya",
        text: '"Open it. Read it once all the way through. Do not stop to react. I will be here."',
        emotion: "serious",
      },
      {
        speakerId: null,
        text: "The envelope opens cleanly. One page, heavy stock, handwritten on both sides.",
      },
      {
        speakerId: null,
        text: "The letter is shorter than you expected. Four paragraphs. She has been saving a list of things to say and chose these.",
      },
      {
        speakerId: null,
        text: "She does not apologise. She does not explain. She says she has been ill for about a year. She says Ren would not want to tell you. She says she is having dinner at the old house on the twenty-second and she would like you to be there. She says she will not write again.",
      },
      {
        speakerId: "inner-voice",
        text: "Four moves in one page. The illness establishes urgency. 'Ren would not want to tell you' pre-blames Ren for the surprise. 'Dinner at the old house on the twenty-second' sets a specific appointment. 'I will not write again' is the close — either you show up or you are the one who refused. She engineered the letter so that you are the actor, not her.",
        emotion: "concerned",
      },
    ],
    nextSceneId: "priya-reads-the-letter",
  },

  {
    id: "priya-reads-the-letter",
    backgroundId: "apartment",
    mood: "tense",
    presentCharacterIds: ["priya"],
    dialog: [
      {
        speakerId: "priya",
        text: '"Read me the exact sentence about being ill."',
        emotion: "knowing",
      },
      {
        speakerId: null,
        text: "You read it. Priya is quiet for a few seconds.",
      },
      {
        speakerId: "priya",
        text: '"That is deliberately vague. \'Been ill for about a year.\' Not a diagnosis, not a treatment, not a doctor\'s name. If it were a terminal thing, she would say so — there is a playbook for that, and it is much more specific than this. If it were a chronic manageable thing, she would not be writing a letter. This sentence is engineered to produce urgency without accepting the cost of being examined."',
        emotion: "serious",
      },
      {
        speakerId: "priya",
        text: '"That does not mean she is not sick. Some version of sick is probably true. But the sickness is in the letter the way a prop is in a scene."',
        emotion: "knowing",
      },
      {
        speakerId: "inner-voice",
        text: "Priya has just done, in fifty words, the work you would have spent three days not-doing alone. The ally is not a luxury; the ally is the difference between reading and being-read.",
        emotion: "knowing",
      },
    ],
    choices: [
      {
        id: "call-ren-now",
        text: '"I am going to call Ren and ask them what they actually know."',
        tactic: "Verify the factual claim before deciding on the structural one. Ren is the only independent witness.",
        nextSceneId: "ren-confirms",
        isOptimal: true,
      },
      {
        id: "decide-now",
        text: '"I know what I am going to do. I am going to go."',
        tactic: "Deciding from adrenaline. You have not slept on it and you have not talked to Ren. It can wait a night.",
        nextSceneId: "going-anyway",
      },
      {
        id: "decide-not-to-go",
        text: '"I am not going. I am writing back once and that is it."',
        tactic: "Refusal is valid. Write the single-response letter that does not re-open the channel.",
        nextSceneId: "write-single-reply",
        isOptimal: true,
      },
      {
        id: "ask-priya-what-she-would-do",
        text: '"What would you do, if you were me?"',
        tactic: "Ask for the direct answer. Priya has earned the right to give one.",
        nextSceneId: "priya-direct-answer",
      },
    ],
  },

  // ===================================================================
  // ACT 3B — Ren channel
  // ===================================================================
  {
    id: "ren-confirms",
    backgroundId: "text-screen",
    mood: "tense",
    presentCharacterIds: ["sibling"],
    dialog: [
      {
        speakerId: null,
        text: "Ren picks up on the second ring. They have been waiting for this call; you can hear it in the first syllable.",
      },
      {
        speakerId: "sibling",
        text: '"She told me she was going to write. I told her not to. She did anyway."',
        emotion: "concerned",
      },
      {
        speakerId: "sibling",
        text: '"The illness — it is real. Heart. Not critical. She has three follow-ups, she is taking the medication, she is fine for now. She is not dying. I am telling you this because she did not and I am not going to let that word hang over you for a week."',
        emotion: "serious",
      },
      {
        speakerId: "sibling",
        text: '"The dinner on the twenty-second is the first Sunday of the month, which is the one she has been doing on a loop since 1998. This is not a special dinner. It is the usual dinner with you invited."',
        emotion: "knowing",
      },
      {
        speakerId: "inner-voice",
        text: "Ren has just handed you two facts the letter omitted. The illness is real but not critical. The dinner is routine but was framed as an event. Note the gap between the two accounts. That gap is the whole story.",
        emotion: "knowing",
      },
    ],
    choices: [
      {
        id: "thank-ren",
        text: '"Thank you for telling me. I mean that. I know it is not nothing."',
        tactic: "Recognise the cost of the intel. Ren has been carrying this between you for years.",
        nextSceneId: "ren-offers-company",
        isOptimal: true,
      },
      {
        id: "ask-ren-for-advice",
        text: '"Do you want me to come?"',
        tactic: "Asking Ren what serves them. Family is a two-person system; your decision affects them too.",
        nextSceneId: "ren-tells-truth",
        isOptimal: true,
      },
      {
        id: "decide-solo",
        text: '"I\'ll let you know what I decide."',
        tactic: "Keep the decision yours. Fine, but colder than Ren deserved after that gift of information.",
        nextSceneId: "ending-undecided",
      },
    ],
  },

  {
    id: "ren-offers-company",
    backgroundId: "text-screen",
    mood: "peaceful",
    presentCharacterIds: ["sibling"],
    dialog: [
      {
        speakerId: "sibling",
        text: '"If you come, I will be there the whole time. If you do not, I will explain to her in a way that does not frame you as the villain. Either works. I mean that."',
        emotion: "serious",
      },
      {
        speakerId: "sibling",
        text: '"I am not saying you should come. I am telling you what you have in either direction so the decision is yours, not hers."',
        emotion: "knowing",
      },
      {
        speakerId: "inner-voice",
        text: "Ren has grown. Five years ago Ren would have pushed for reconciliation. Five years ago Ren would have explained how to make it easier for the mother. Tonight Ren is handing you a clean frame. That is the change you have been watching happen in them at holidays.",
        emotion: "knowing",
      },
    ],
    nextSceneId: "the-decision",
  },

  {
    id: "ren-tells-truth",
    backgroundId: "text-screen",
    mood: "peaceful",
    presentCharacterIds: ["sibling"],
    dialog: [
      {
        speakerId: "sibling",
        text: '"Honestly? I would like you to come. I would also be okay if you did not."',
        emotion: "knowing",
      },
      {
        speakerId: "sibling",
        text: '"If you come, I get to be a sibling for an afternoon instead of a middle. If you do not come, I carry the dinner. I have carried a lot of dinners. I am not asking for this one specifically."',
        emotion: "serious",
      },
      {
        speakerId: "sibling",
        text: '"You get the decision. I get to accept it. We are doing it that way now and it is working better than the other way."',
        emotion: "knowing",
      },
    ],
    nextSceneId: "the-decision",
  },

  // ===================================================================
  // ACT 3C — Priya's direct answer
  // ===================================================================
  {
    id: "priya-direct-answer",
    backgroundId: "apartment",
    mood: "mysterious",
    presentCharacterIds: ["priya"],
    dialog: [
      {
        speakerId: "priya",
        text: '"If I were you. With what you have now. I would call Ren first. I would find out whether the illness claim is true and whether this dinner is engineered or routine. Then I would decide."',
        emotion: "serious",
      },
      {
        speakerId: "priya",
        text: '"I would not decide in the kitchen tonight at 7 pm with an opened letter in front of me. I would make myself dinner. I would read a book for an hour. I would sleep. I would call Ren in the morning."',
        emotion: "knowing",
      },
      {
        speakerId: "priya",
        text: '"The envelope is a clock she wound. You get to unwind it by taking your time."',
        emotion: "serious",
      },
      {
        speakerId: "inner-voice",
        text: "The coaching arrived in three paragraphs. Priya has, again, turned a heart-rate spike into a procedure. You will remember this next time someone you do not trust writes you a letter.",
        emotion: "knowing",
      },
    ],
    nextSceneId: "morning-after",
  },

  // ===================================================================
  // ACT 3D — the decision (convergence point)
  // ===================================================================
  {
    id: "the-decision",
    backgroundId: "apartment",
    mood: "tense",
    dialog: [
      {
        speakerId: null,
        text: "You end the call with Ren. You stand at the counter. The envelope is open, the single page folded neatly beside it. The envelope is empty now; it is just paper.",
      },
      {
        speakerId: "inner-voice",
        text: "The letter has been read. The illness has been triangulated. Ren has offered both directions. There is no more information to collect. Anything beyond here is the decision itself, not the preparation for it.",
        emotion: "knowing",
      },
    ],
    choices: [
      {
        id: "go-to-dinner",
        text: "Go. The twenty-second. With Ren as witness. One evening, with an exit plan.",
        tactic: "The measured re-entry. Not reconciliation — reconnaissance, with an ally in the room and a curfew in your pocket.",
        nextSceneId: "ending-going",
        isOptimal: true,
      },
      {
        id: "go-alone",
        text: "Go. Without Ren. You want to see her by yourself.",
        tactic: "Higher risk. No witness means no calibration afterward. Do not do this version unless you have specifically prepared for it.",
        nextSceneId: "ending-going-solo",
      },
      {
        id: "write-single-reply",
        text: "Write back once. One page. Wish her well. Decline. Do not leave the door open.",
        tactic: "The clean refusal. Acknowledges the letter without re-opening the channel. Requires the discipline to not be drawn into a second exchange.",
        nextSceneId: "write-single-reply",
        isOptimal: true,
      },
      {
        id: "burn-the-letter",
        text: "Burn the letter. Tell Ren you are not going. Move on.",
        tactic: "The absolute refusal. Valid if you have already processed the underlying grief. Unsustainable if you are using it to avoid the grief.",
        nextSceneId: "ending-burned",
      },
    ],
  },

  // ===================================================================
  // SECONDARY PATHS
  // ===================================================================
  {
    id: "open-at-door",
    backgroundId: "apartment",
    mood: "danger",
    dialog: [
      {
        speakerId: null,
        text: "You rip it open in the hallway, coat still on. You read it standing up. The words land in your chest before your body has caught up with the words.",
      },
      {
        speakerId: "inner-voice",
        text: "You read a predator's letter standing in the doorway of your own apartment in your work coat. The physiological cost of that placement will outlast the content of the letter. She chose a delivery medium that made most readers read it exactly the way you just did. Next time, sit down first. Next time, drink water first. Next time, take the coat off before you accept the envelope.",
        emotion: "concerned",
      },
      {
        speakerId: null,
        text: "You take your coat off slowly. You walk to the counter. You put the letter face-down. You go to the bathroom. You splash water on your face. You come back. The letter is still there.",
      },
    ],
    nextSceneId: "counter-pause",
  },

  {
    id: "binned-midnight",
    backgroundId: "apartment",
    mood: "mysterious",
    immersionTrigger: "cold-moment",
    dialog: [
      {
        speakerId: null,
        text: "You put the envelope in the recycling. You eat dinner. You do dishes. You watch a show.",
      },
      {
        speakerId: null,
        text: "At 11:47 pm you go to the kitchen for water. You do not look at the recycling bin. Your body knows where it is.",
      },
      {
        speakerId: null,
        text: "At 1:22 am you fish it out. The envelope is still sealed. You take it to the counter.",
      },
      {
        speakerId: "inner-voice",
        text: "Binning and fishing is the most common version of this scene. It is not a failure. It is data. Your body has told you something about how much this envelope weighs. Next time, either be the person who actually bins it without fishing it back — or be the person who doesn't bin it in the first place. The middle is the expensive version.",
        emotion: "knowing",
      },
    ],
    nextSceneId: "counter-pause",
  },

  {
    id: "drawer-the-letter",
    backgroundId: "apartment",
    mood: "peaceful",
    dialog: [
      {
        speakerId: null,
        text: "You put the envelope in the drawer under the microwave — the one with old takeout menus and a phone charger you don't use. It goes under the menus, not on top of them.",
      },
      {
        speakerId: "inner-voice",
        text: "Drawer is a valid holding pattern. Not open, not discarded. A week from now either you will have decided, or you will not; either outcome is fine. The decision to not decide tonight is itself a decision.",
        emotion: "knowing",
      },
      {
        speakerId: null,
        text: "Three days later, you take it out. You open it. You read it. With the week of distance, the letter reads smaller than it did Tuesday night. The sentences are the same; your relationship to them is not.",
      },
    ],
    nextSceneId: "ending-drawer-decision",
  },

  {
    id: "ren-reads-it-first",
    backgroundId: "text-screen",
    mood: "mysterious",
    presentCharacterIds: ["sibling"],
    dialog: [
      {
        speakerId: null,
        text: "You courier the sealed envelope to Ren's apartment in the morning with a note: 'Read it. Tell me if I need to.'",
      },
      {
        speakerId: null,
        text: "Ren calls you at 6 pm.",
      },
      {
        speakerId: "sibling",
        text: '"You don\'t need to read it. There\'s nothing in it that isn\'t what you\'d expect. I\'ll summarise and you can decide from the summary."',
        emotion: "serious",
      },
      {
        speakerId: "sibling",
        text: "\"She's asking you to dinner on the twenty-second. She's framing it with a health thing that's real but not critical. She's not apologising. She's not offering anything you haven't been offered before. Those are the facts.\"",
        emotion: "knowing",
      },
      {
        speakerId: "inner-voice",
        text: "Ren has taken the hit so you did not have to. This is an enormous thing they did. You will want to acknowledge it not tonight — tonight would be a performance — but next month, in a way that lands.",
        emotion: "knowing",
      },
    ],
    nextSceneId: "the-decision",
  },

  {
    id: "ren-knew",
    backgroundId: "text-screen",
    mood: "tense",
    presentCharacterIds: ["sibling"],
    dialog: [
      {
        speakerId: "sibling",
        text: '"I knew she was going to write. I told her not to. She did anyway. I\'m sorry."',
        emotion: "sad",
      },
      {
        speakerId: "sibling",
        text: "\"I was going to tell you if she sent it. I didn't want to tell you in case she chickened out.\"",
        emotion: "concerned",
      },
      {
        speakerId: "inner-voice",
        text: "Ren is in a hard position. They did not betray you; they did not perfectly protect you either. The ethics of being between two people who cannot talk to each other directly are not clean. Tonight, thank them for calling back quickly. Later, make the 'you do not have to carry messages between us' conversation explicit.",
        emotion: "knowing",
      },
    ],
    nextSceneId: "ren-confirms",
  },

  {
    id: "opened-alone",
    backgroundId: "apartment",
    mood: "tense",
    immersionTrigger: "cold-moment",
    dialog: [
      {
        speakerId: null,
        text: "You open it alone at the counter. You read it twice. The second reading lands worse than the first.",
      },
      {
        speakerId: null,
        text: "At 10 pm you text Priya a photo. She calls immediately.",
      },
      {
        speakerId: "priya",
        text: '"You should have called me first. I\'m not scolding. I\'m noting."',
        emotion: "knowing",
      },
      {
        speakerId: "priya",
        text: '"Read me the sentence about being ill."',
        emotion: "serious",
      },
    ],
    nextSceneId: "priya-reads-the-letter",
  },

  {
    id: "morning-after",
    backgroundId: "apartment",
    mood: "peaceful",
    dialog: [
      {
        speakerId: null,
        text: "Morning. 7:14 am. Kitchen. You made coffee before you looked at the envelope. That is the first win of the day.",
      },
      {
        speakerId: null,
        text: "You open it now. You read it once. You set it down. You drink the coffee.",
      },
      {
        speakerId: "inner-voice",
        text: "Rested reading is a different reading. You are noticing the engineered pressure sentences because your nervous system is not in them. Call Ren. Verify the health claim. Decide without the envelope in your hand.",
        emotion: "knowing",
      },
    ],
    nextSceneId: "ren-confirms",
  },

  {
    id: "going-anyway",
    backgroundId: "apartment",
    mood: "tense",
    dialog: [
      {
        speakerId: null,
        text: "You decide from the kitchen. You text Ren: 'I'll be there.' Then you stand at the counter for ten more minutes feeling the decision settle in or not.",
      },
      {
        speakerId: "inner-voice",
        text: "Decisions made while adrenalized are not worse than other decisions — they are just less stress-tested. You will find out in the next eleven days whether this one holds. If it does, fine. If it starts to wobble, you are allowed to re-decide. A text the day of is not a contract.",
        emotion: "neutral",
      },
    ],
    nextSceneId: "ending-going-unrefined",
  },

  // ===================================================================
  // ENDINGS
  // ===================================================================
  {
    id: "ending-going",
    backgroundId: "apartment",
    mood: "peaceful",
    isEnding: true,
    outcomeType: "good",
    endingTitle: "The Considered Return",
    endingSummary:
      "You have decided to go. With Ren as witness. On the twenty-second. You will arrive at 4 pm and leave by 7:30. You wrote the curfew down. You told Priya. You told Ren. Three people now know your plan for an evening no one has officially planned anything for. That is how you re-enter a house you left five years ago: with documentation, with witnesses, and with a specific departure time. The envelope is on the counter. The decision is made. L11-2 begins on the twenty-second.",
    endingLearnReference: "beige-protocol-strategic-boredom-weapon",
    endingLearnPrompt:
      "Re-entry without a plan is not re-entry, it is relapse. The curfew is the plan.",
    dialog: [
      {
        speakerId: "inner-voice",
        text: "You went from 'the envelope arrived' to 'a complete plan with three witnesses and a departure time' in approximately four hours. That is a skill you did not have five years ago. You also did not need this skill five years ago. Both are true.",
        emotion: "knowing",
      },
      {
        speakerId: null,
        text: "The twenty-second is eleven days away. You sleep.",
      },
    ],
  },

  {
    id: "ending-going-solo",
    backgroundId: "apartment",
    mood: "mysterious",
    isEnding: true,
    outcomeType: "neutral",
    endingTitle: "The Solo Return",
    endingSummary:
      "You decided to go alone. No Ren. No witness in the room. Your reasoning — you wanted to see her without refraction — is honest. The cost is that afterward, you will not have anyone to check your read against. Plan the check-in for the drive home: call Priya before you leave the parking space. Whatever happened inside the house needs to be spoken aloud to someone who was not in it, within twenty minutes of leaving. Otherwise the scene rewrites itself inside you.",
    dialog: [
      {
        speakerId: "inner-voice",
        text: "Solo re-entry is braver than witnessed re-entry. It is also riskier. Both are legitimate. You have chosen the version where the debrief has to happen outside the walls.",
        emotion: "knowing",
      },
    ],
  },

  {
    id: "ending-going-unrefined",
    backgroundId: "apartment",
    mood: "tense",
    isEnding: true,
    outcomeType: "neutral",
    endingTitle: "Decided Tonight",
    endingSummary:
      "You made the decision in the kitchen, at 7 pm, Tuesday, with the letter still open. The decision may still be correct. The method was not optimal. In the next eleven days, re-test it at least once while rested, with Priya, with a specific curfew named out loud. If after that second test it holds, you are fine. If it wobbles, the door back out is open — a message to Ren saying 'something changed, I'm not coming' is a legitimate move up to the morning of.",
    dialog: [
      {
        speakerId: "inner-voice",
        text: "Adrenalized decisions are not wrong; they are unchecked. Check them afterward.",
        emotion: "neutral",
      },
    ],
  },

  {
    id: "write-single-reply",
    backgroundId: "apartment",
    mood: "peaceful",
    isEnding: true,
    outcomeType: "good",
    endingTitle: "The Single Reply",
    endingSummary:
      "You wrote one page. You wished her well. You declined. You did not explain. You did not leave the door open for a sequel. You mailed it the next morning. You told Ren what you wrote — not what she asked, what you wrote — so Ren has a copy of your exact words and the mother can't mis-paraphrase them. The envelope on the counter stays there for one more day while the reply is in transit; then you put both in a drawer and close it. This is the cleanest refusal available.",
    endingLearnReference: "how-to-leave-without-being-villain",
    endingLearnPrompt:
      "One reply, specific, warm, closed. Don't let a second letter reopen what the first was supposed to end.",
    dialog: [
      {
        speakerId: "inner-voice",
        text: "A single reply is not re-engagement if it does not invite a sequel. You have done the adult version of closing a chapter you had already closed — and now the closure is documented in your handwriting, not just your silence.",
        emotion: "knowing",
      },
    ],
  },

  {
    id: "ending-burned",
    backgroundId: "apartment",
    mood: "cold",
    isEnding: true,
    outcomeType: "neutral",
    endingTitle: "The Absolute Refusal",
    endingSummary:
      "You burned the letter in the sink. You told Ren you were not going. You did not elaborate. The refusal is valid. It is only a bad version of this ending if you used the fire to skip a conversation with yourself about the grief underneath the anger — the fire can serve either function, and only you know which one it served tonight. If it was closure, you sleep well. If it was avoidance, the envelope will show up again in a different form in a different year, and you will recognise it then.",
    dialog: [
      {
        speakerId: "inner-voice",
        text: "Absolute refusal is a full sentence. Make sure it is the one you meant.",
        emotion: "neutral",
      },
    ],
  },

  {
    id: "ending-drawer-decision",
    backgroundId: "apartment",
    mood: "peaceful",
    isEnding: true,
    outcomeType: "good",
    endingTitle: "The Week of Distance",
    endingSummary:
      "You put the envelope in a drawer for three days. Then you opened it. Then you made the decision rested, fed, and calm. Whatever you decided, you decided as the adult version of yourself, not as the adrenalized version in a work coat at 6:47 pm. That is the only difference that matters. The content of the decision is less important than the conditions under which you made it.",
    dialog: [
      {
        speakerId: "inner-voice",
        text: "The envelope was a clock she wound. You ignored the clock for three days and then read the letter on your own schedule. That sentence is the entire lesson of this scenario.",
        emotion: "knowing",
      },
    ],
  },

  {
    id: "ending-undecided",
    backgroundId: "apartment",
    mood: "mysterious",
    isEnding: true,
    outcomeType: "neutral",
    endingTitle: "Deferred",
    endingSummary:
      "You did not decide tonight. You told Ren you would let them know. The dinner is eleven days away; you have time. The cost of deferral is lower than the cost of deciding wrong — but only if you actually use the deferred time to think, not to avoid. Put a specific day on your calendar (day 5, 7 pm, with Priya) as the deciding conversation. The decision without a calendar slot is the decision you are still making at 11 pm on the twenty-first.",
    dialog: [
      {
        speakerId: "inner-voice",
        text: "Deferral is a strategy if it has a deadline. Without one, it is drift.",
        emotion: "neutral",
      },
    ],
  },
];

export const mission111: Scenario = {
  id: "mission-11-1",
  title: "The Letter",
  tagline: "Five years of silence. One envelope in your handwriting-mother's script.",
  description:
    "A letter arrives in the physical mail. Your mother's handwriting. Five years after you went no-contact. The scenario is the interior of a decision: open, defer, delegate, reply once, or burn. She isn't on-screen; the scenario is about what you do with her envelope in your kitchen.",
  tier: "vip",
  level: 11,
  order: 1,
  estimatedMinutes: 14,
  difficulty: "advanced",
  category: "narcissist",
  xpReward: 1100,
  badgeId: "envelope-weighed",
  startSceneId: "the-arrival",
  prerequisites: ["mission-8-2"],
  tacticsLearned: [
    "Delayed reading under engineered urgency",
    "Triangulating a health claim through an independent witness",
    "The single-reply close (reply once, do not invite a sequel)",
    "Reading a letter with an ally on speaker",
    "Detecting engineered-pressure sentences (vague illness, specific date, pre-blame of the middle sibling)",
  ],
  redFlagsTaught: [
    "Vague illness + specific date = manufactured urgency",
    "Pre-blaming a family intermediary before the conversation even happens",
    "Refusing to leave a return address — forces the receiver to engage to respond",
    "\"I will not write again\" as a close (makes you the actor if you don't show up)",
  ],
  reward: {
    id: "envelope-weighed",
    name: "The Envelope Weighed",
    description: "Rested reading. Triangulated the illness claim. Decided with witnesses and a curfew.",
    unlocksScenarioId: "mission-11-2",
  },
  characters: [THE_MOTHER, GOLDEN_SIBLING, PRIYA, INNER_VOICE],
  scenes,
};

export default mission111;
