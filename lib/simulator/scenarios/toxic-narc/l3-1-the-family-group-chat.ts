/**
 * tn-3-1, "The Family Group Chat"
 *
 * Toxic-Narcissist track, Level 3 (The Narc Sibling), order 1. Your
 * grandmother died yesterday. The family group chat has 47 unread
 * messages by the time you look. Ren, the golden sibling, has
 * already offered to "handle everything." Your mother is running
 * the martyr register publicly in the chat. You have said nothing
 * yet, and the silence is, inside the family's performance economy,
 * beginning to be read as evidence of a specific accusation: that
 * you did not love her.
 *
 * The scenario is not about grief. The scenario is about the
 * weaponisation of grief by a narc family system, and the specific
 * move that declines to play without producing fresh ammunition.
 *
 * Teaches:
 *  - The grief-ranking performance economy, how narc families
 *    transform a death into a contest, and how neither winning it
 *    nor refusing to enter it is free
 *  - The written-message advantage over the voice call, a
 *    two-sentence warm note is stronger than a phone sob
 *  - The private-sibling channel as the correct first move when the
 *    golden sibling has already volunteered to "handle it"
 *  - The funeral-week framework: practical work (logistics) beats
 *    feelings-work (performance) as a contribution and is the
 *    only contribution the narc parent cannot re-frame
 *
 * Voice: reference/KANIKA-VOICE.md and reference/TRACK-toxic-narc.md.
 */

import type { Scenario, Scene } from "../../types";
import { INNER_VOICE, THE_MOTHER, GOLDEN_SIBLING, PRIYA } from "../../characters";

const scenes: Scene[] = [
  // ===================================================================
  // OPENING
  // ===================================================================
  {
    id: "the-news",
    backgroundId: "apartment",
    mood: "cold",
    presentCharacterIds: ["inner-voice"],
    dialog: [
      {
        speakerId: null,
        text: "Tuesday, 2:47 p.m. your grandmother died yesterday. Your mother's mother. You were not close; you had not seen her in three years. The last call you had with her, nineteen months ago, she called you by your cousin's name twice and then cried about it.",
      },
      {
        speakerId: null,
        text: "Your phone shows 47 unread messages in the family group chat. You have not opened it.",
      },
      {
        speakerId: "inner-voice",
        text: "The question is not whether you are grieving. The question is what the group chat is doing in your absence.",
        emotion: "knowing",
      },
    ],
    choices: [
      {
        id: "open-chat",
        text: "Open the chat. Read before you type.",
        tactic: "Reading before writing is the whole discipline. Writing first into a thread you have not read is how narc families extract context-blind apologies.",
        nextSceneId: "chat-opened",
        isOptimal: true,
      },
      {
        id: "text-ren-first",
        text: "Text Ren privately first, before opening the chat.",
        tactic: "The private sibling channel is the correct first move. It calibrates what is real vs. what is performance in the public thread.",
        nextSceneId: "ren-private",
        isOptimal: true,
      },
      {
        id: "type-something-warm",
        text: 'Type the warm thing immediately. "Love you all. Thinking of Mum."',
        tactic: "Typing before reading is premature. The chat has already constructed a narrative you have not seen, and your message will be interpreted against it.",
        nextSceneId: "sent-blind",
        isOptimal: false,
      },
      {
        id: "leave-it",
        text: "Leave the phone on the counter. Walk away for an hour.",
        tactic: "Valid for grief. Not valid for this specific chat, where delay is currency, the longer you wait, the more the thread is authoring a read of your silence.",
        nextSceneId: "hour-later",
        isOptimal: false,
      },
    ],
  },

  // ===================================================================
  // BRANCH 1. OPEN THE CHAT FIRST
  // ===================================================================
  {
    id: "chat-opened",
    backgroundId: "apartment",
    mood: "tense",
    presentCharacterIds: ["inner-voice"],
    dialog: [
      {
        speakerId: null,
        text: "You read all 47 messages. The thread is approximately this shape:",
      },
      {
        speakerId: "mother",
        text: '"She was my everything. The light of my life. I do not know how I am going to breathe without her. I am sitting in her chair. Everything smells like her."',
        emotion: "sad",
      },
      {
        speakerId: "sibling",
        text: '"Mum we are here for you. I am taking tomorrow off. I will handle the celebrant, the flowers, and the venue. Please rest. You have done enough already."',
        emotion: "neutral",
      },
      {
        speakerId: "mother",
        text: '"Ren you are such a gift. I don\'t know what I did to deserve a child like you. A mother\'s daughter."',
        emotion: "knowing",
      },
      {
        speakerId: null,
        text: "Your mother has posted fourteen messages. Ren has posted eight. Your father has posted one (a heart). Your Aunt Prue, your grandmother's sister, the one adult who actually knew her as a person, has not posted.",
      },
      {
        speakerId: "inner-voice",
        text: "The shape is clear. A grief-ranking competition is already underway. The winner has been declared. Any late entry will be scored against the existing ranking.",
        emotion: "knowing",
      },
    ],
    choices: [
      {
        id: "warm-brief",
        text: 'Post a two-sentence warm message. "Thinking of you all. Grateful for everything Nan was, tell me how I can help this week."',
        tactic: "Warm, brief, offer-of-practical-help. The offer of practical help is the only contribution that cannot be downgraded in a grief-ranking economy.",
        nextSceneId: "warm-brief-posted",
        isOptimal: true,
      },
      {
        id: "text-ren-private-late",
        text: 'Skip the public reply. Text Ren privately. "I saw the chat. Can I help with anything specific, venue, catering, Nan\'s things?"',
        tactic: "The private channel to the golden sibling is a workaround for the public theatre. Coordination first; public performance second, if at all.",
        nextSceneId: "ren-private",
        isOptimal: true,
      },
      {
        id: "match-the-grief",
        text: 'Match the register. Post a long grief message. "I can\'t stop crying. She was everything to me. I remember when..."',
        tactic: "Entering the grief-ranking economy by trying to out-perform. The problem is not that it is insincere; the problem is that narc mothers read any grief-performance as a competitive bid for the role they have just claimed.",
        nextSceneId: "matched-grief",
        isOptimal: false,
      },
      {
        id: "private-to-prue",
        text: "Text your Aunt Prue privately. She is the one person in this family who actually lost her sister.",
        tactic: "The move that names who actually lost someone here. Not a competitive play; an accurate one. A second-order move, requires the public thread to be handled separately.",
        nextSceneId: "prue-texted",
        isOptimal: true,
      },
    ],
  },

  // ===================================================================
  // WARM BRIEF POSTED
  // ===================================================================
  {
    id: "warm-brief-posted",
    backgroundId: "apartment",
    mood: "peaceful",
    presentCharacterIds: ["inner-voice"],
    dialog: [
      {
        speakerId: null,
        text: "You post the two sentences. You put the phone down. The chat continues.",
      },
      {
        speakerId: "mother",
        text: '"\\"Tell me how I can help.\\" That is what you write. After everything. After she raised you when I was sick. After she paid for your braces. Nothing about her. Nothing about what you lost."',
        emotion: "sad",
      },
      {
        speakerId: "inner-voice",
        text: "The reframe. The warm-brief was just downgraded to a cold-brief, and the grief-ranking is now re-scored with your message as evidence of your failure.",
        emotion: "knowing",
      },
      {
        speakerId: null,
        text: "Ren replies publicly.",
      },
      {
        speakerId: "sibling",
        text: '"Mum. Let\'s all just be gentle with each other right now."',
        emotion: "neutral",
      },
      {
        speakerId: "inner-voice",
        text: "Ren did not defend you. Ren also did not escalate. Ren is, correctly, managing the mother. The move is: do not match.",
        emotion: "knowing",
      },
    ],
    choices: [
      {
        id: "stay-silent",
        text: "Stay silent in the thread. Text Ren privately: 'Thanks. Tell me what I can take off your plate this week.'",
        tactic: "The structural quiet. The mother's reframe only works if you respond to it. Silence plus a private coordination with Ren is the textbook move.",
        nextSceneId: "ren-coordinated",
        isOptimal: true,
      },
      {
        id: "defend-the-message",
        text: 'Reply publicly. "Mum, the offer was genuine. I loved her too. I don\'t know what you\'d like me to say."',
        tactic: "Defending in the public theatre. The problem: defending inside a grief-ranking economy is always scored as further evidence of the deficit.",
        nextSceneId: "defended-and-scored",
        isOptimal: false,
      },
      {
        id: "apologise",
        text: 'Apologise. "I\'m sorry Mum. I didn\'t mean to come across cold. I\'m just processing."',
        tactic: "The apology-extraction landed. The public record now contains your apology, which will be re-cited at every future family event.",
        nextSceneId: "apologised-publicly",
        isOptimal: false,
      },
    ],
  },

  // ===================================================================
  // REN COORDINATED. GOOD ENDING PATH
  // ===================================================================
  {
    id: "ren-coordinated",
    backgroundId: "apartment",
    mood: "peaceful",
    presentCharacterIds: ["inner-voice"],
    dialog: [
      {
        speakerId: "sibling",
        text: '"Thank you. Honestly, the funeral is Thursday at 2. If you can pick up Aunt Prue from the airport Wednesday afternoon that would be the biggest help. She is flying in alone and Mum is not going to be in a state to drive."',
        emotion: "neutral",
      },
      {
        speakerId: "inner-voice",
        text: "Ren has given you the specific task, the one that is actually about your grandmother, not about your mother. Aunt Prue is the person who lost her sister.",
        emotion: "knowing",
      },
      {
        speakerId: null,
        text: "You reply: 'Done. I'll pick her up. Let me know if Mum needs anything else I can do at arm's length.'",
      },
    ],
    choices: [
      {
        id: "to-prue-wednesday",
        text: "Wednesday arrives. Pick up Aunt Prue. Drive her in near-silence. Let her choose when to speak.",
        tactic: "The practical work, the one adult who actually lost someone, and a long quiet drive. This is the real thing.",
        nextSceneId: "wednesday-drive",
        isOptimal: true,
      },
    ],
  },

  {
    id: "wednesday-drive",
    backgroundId: "apartment",
    mood: "peaceful",
    presentCharacterIds: ["inner-voice"],
    dialog: [
      {
        speakerId: null,
        text: "You collect Aunt Prue at the airport. You hug her. You do not say much. In the car she asks about your life. You answer briefly and ask about hers. Twenty minutes in, she says:",
      },
      {
        speakerId: null,
        text: '"I was not ready for this. She was my only sister. I thought we had more time."',
      },
      {
        speakerId: "inner-voice",
        text: "The one sentence about grief that will be spoken in this whole week that is not a performance. You hold it. You do not return it with your own.",
        emotion: "knowing",
      },
      {
        speakerId: null,
        text: 'You say: "Tell me about her. I only knew her as Nan. I want to know who she was."',
      },
      {
        speakerId: null,
        text: "Aunt Prue talks for twenty-three minutes. You drive. You listen. When you arrive at the hotel she holds your hand for a long moment and says: 'You look like her. Around the eyes.'",
      },
    ],
    choices: [
      {
        id: "to-funeral",
        text: "The funeral is tomorrow. Your role is clear: logistics, Aunt Prue, arm's length from the chat.",
        tactic: "The role has been defined not by the thread but by the practical need.",
        nextSceneId: "funeral-next-day",
        isOptimal: true,
      },
    ],
  },

  {
    id: "funeral-next-day",
    backgroundId: "apartment",
    mood: "peaceful",
    presentCharacterIds: ["inner-voice"],
    dialog: [
      {
        speakerId: null,
        text: "Thursday, 2:00 p.m. the funeral holds. Your mother delivers a eulogy that is about herself. Ren manages it. You sit next to Aunt Prue. You hold her hand during the committal.",
      },
      {
        speakerId: null,
        text: "Afterwards at the wake, your mother makes a point of introducing Ren to relatives as 'the daughter who was there for me.' You are, in the same sentence, 'the one who lives in the city now.' You smile. You pour Aunt Prue a tea. You sit down next to her.",
      },
      {
        speakerId: "inner-voice",
        text: "You did not win the grief-ranking. You did not play. The funeral happened. The woman who actually knew your grandmother had a hand to hold. The scoreboard you did not compete on is a scoreboard that does not matter.",
        emotion: "knowing",
      },
      {
        speakerId: null,
        text: "On the train home you draft one message. Not to the family chat. To Aunt Prue directly.",
      },
      {
        speakerId: null,
        text: "'Thank you for telling me about her today. I would like to know more about her when you feel like talking. No rush.' You send it. Prue replies within four minutes: 'I would like that. Come for lunch when I'm back from the Coast.'",
      },
    ],
    choices: [
      {
        id: "finish",
        text: "The week holds.",
        tactic: "The contribution was practical. The relationship that matters was made, not performed.",
        nextSceneId: "ending-funeral-held",
        isOptimal: true,
      },
    ],
  },

  // ===================================================================
  // REN PRIVATE (SECOND-ORDER ROUTE)
  // ===================================================================
  {
    id: "ren-private",
    backgroundId: "apartment",
    mood: "tense",
    presentCharacterIds: ["inner-voice"],
    dialog: [
      {
        speakerId: null,
        text: "You open a private thread with Ren. You do not open the group chat yet. You write:",
      },
      {
        speakerId: null,
        text: "'I just saw the news. Tell me what you need. Happy to handle anything specific, venue, Nan's things, driving someone from the airport.'",
      },
      {
        speakerId: "sibling",
        text: '"Thank you. Mum is already in the deep end publicly, fair warning when you open the chat. Aunt Prue is flying in Wednesday, can you collect her from the airport? That\'s the one thing I genuinely can\'t do."',
        emotion: "neutral",
      },
      {
        speakerId: "inner-voice",
        text: "Ren has, without being asked, (a) briefed you on the public theatre, (b) given you a specific role, (c) positioned you adjacent to Aunt Prue. This is Ren managing up. It is worth noticing.",
        emotion: "knowing",
      },
    ],
    choices: [
      {
        id: "accept-prue-task",
        text: "'Done. Wednesday afternoon, airport, Prue. Anything else?'",
        tactic: "Accept cleanly. The task is concrete; the role is outside the theatre.",
        nextSceneId: "ren-coordinated",
        isOptimal: true,
      },
      {
        id: "ask-about-chat-first",
        text: "'How bad is the chat? Do I need to post something?'",
        tactic: "Reasonable question but a subtle cost, it asks Ren to coach you through the public theatre, which pulls Ren back into managing you instead of managing Mum. The instinct is right; the execution adds weight to Ren's load.",
        nextSceneId: "ren-briefs",
        isOptimal: false,
      },
    ],
  },

  {
    id: "ren-briefs",
    backgroundId: "apartment",
    mood: "tense",
    presentCharacterIds: ["inner-voice"],
    dialog: [
      {
        speakerId: "sibling",
        text: '"Mum is doing the \\"my everything\\" thing. Post a brief warm thing at some point. Don\'t match the register, don\'t go long. Two sentences. Then focus on Prue."',
        emotion: "neutral",
      },
      {
        speakerId: "inner-voice",
        text: "Ren briefed you. The brief is correct. The brief is also the brief you would have produced yourself with ninety seconds of reflection.",
        emotion: "knowing",
      },
    ],
    choices: [
      {
        id: "post-warm-brief-now",
        text: "Post the two-sentence warm message in the group chat. Then confirm the Prue task with Ren privately.",
        tactic: "Follow the brief, clean.",
        nextSceneId: "warm-brief-posted",
        isOptimal: true,
      },
    ],
  },

  // ===================================================================
  // PRUE DIRECT ROUTE. GOOD BUT DIFFERENT ENDING
  // ===================================================================
  {
    id: "prue-texted",
    backgroundId: "apartment",
    mood: "peaceful",
    presentCharacterIds: ["inner-voice"],
    dialog: [
      {
        speakerId: null,
        text: "You text Aunt Prue directly, before posting in the group. The whole family chat was about your mother. The one person it should have been about in this family was Prue.",
      },
      {
        speakerId: null,
        text: "'Aunt Prue. I'm so sorry. I know the chat will be loud. Tell me how I can help when you land this week. I'd like to see you.'",
      },
      {
        speakerId: null,
        text: "Prue replies within six minutes: 'Thank you darling. The chat is the chat. I'd love to see you. Collect me from the airport Wednesday? Ren offered but she's drowning already.'",
      },
      {
        speakerId: "inner-voice",
        text: "Prue has assigned you the role before Ren has. The practical work, outside the theatre. You did not need to ask. You reached for the right person.",
        emotion: "knowing",
      },
    ],
    choices: [
      {
        id: "accept-and-brief-ren",
        text: "'I'll be there. I'll tell Ren now so she can take one thing off her list.'",
        tactic: "Accept. Brief Ren. Post one two-sentence warm message in the group once the scaffolding is built.",
        nextSceneId: "ren-coordinated",
        isOptimal: true,
      },
    ],
  },

  // ===================================================================
  // BAD BRANCHES
  // ===================================================================
  {
    id: "sent-blind",
    backgroundId: "apartment",
    mood: "tense",
    presentCharacterIds: ["inner-voice"],
    dialog: [
      {
        speakerId: null,
        text: "You sent 'Love you all. Thinking of Mum' into the chat without reading it. You open the chat after. You see the fourteen messages from your mother. You see Ren's offer. You see your message sitting at the end of the thread. Your message now reads as: the daughter who could not be bothered to read the thread, posted a five-word dismissal.",
      },
      {
        speakerId: "mother",
        text: '"Thinking of me. Thinking of me. She was your grandmother. She was the one who raised you when I could not."',
        emotion: "sad",
      },
    ],
    choices: [
      {
        id: "apologise-from-blind",
        text: 'Apologise and add context. "Mum, I only just saw the thread. I loved her. I\'m still taking it in."',
        tactic: "The apology is warranted but lands inside a narc's martyr register, which will collect it and use it. Accept the cost and move to the practical work.",
        nextSceneId: "apologised-publicly",
        isOptimal: false,
      },
      {
        id: "private-recovery",
        text: "Text Ren privately. 'I posted before reading. What is the practical thing I can do this week that Mum cannot reframe?'",
        tactic: "The recovery move. Acknowledge the misstep privately with the sibling, redirect to practical work.",
        nextSceneId: "ren-private",
        isOptimal: true,
      },
    ],
  },

  {
    id: "hour-later",
    backgroundId: "apartment",
    mood: "tense",
    presentCharacterIds: ["inner-voice"],
    dialog: [
      {
        speakerId: null,
        text: "You come back after an hour. The chat now has 68 messages. The additional 21 are your mother's escalation at your silence. Several of them name you specifically.",
      },
      {
        speakerId: "mother",
        text: '"Has anyone heard from her? She has not said a single word. Not one. That tells you everything you need to know. I always knew. She was never really one of us."',
        emotion: "sad",
      },
      {
        speakerId: "inner-voice",
        text: "The silence has been authored. The delay was scored. The hour was a tax you did not know you were paying.",
        emotion: "knowing",
      },
    ],
    choices: [
      {
        id: "warm-brief-late",
        text: "Post the two-sentence warm message anyway. The delay is now evidence; a long message is worse than a late-short one.",
        tactic: "Damage control. The delay happened. A short warm post is still the correct shape, and any justification of the delay will be collected as further evidence.",
        nextSceneId: "warm-brief-posted",
        isOptimal: true,
      },
      {
        id: "explain-the-delay",
        text: "Explain the delay. 'I'm sorry I'm late to the chat. I needed a moment. I loved her.'",
        tactic: "The explanation is true. The problem: an explanation of a delay inside a narc thread is treated as a confession, not context.",
        nextSceneId: "explained-the-delay",
        isOptimal: false,
      },
    ],
  },

  {
    id: "matched-grief",
    backgroundId: "apartment",
    mood: "tense",
    presentCharacterIds: ["inner-voice"],
    dialog: [
      {
        speakerId: null,
        text: "You post a long message. Three paragraphs. A memory of Nan teaching you to bake. The smell of her kitchen. The grief you feel sitting in your own kitchen now. You hit send.",
      },
      {
        speakerId: "mother",
        text: '"How lovely. I wish I had been in that kitchen with you. I had to work that summer. Some of us did not get the time with her that you did."',
        emotion: "sad",
      },
      {
        speakerId: "inner-voice",
        text: "The grief message has been received and re-scored as evidence that you had more of her than your mother did and therefore owe her more now. The competition has a new leaderboard, and you are not on top of it.",
        emotion: "knowing",
      },
      {
        speakerId: "sibling",
        text: '"Mum, that is lovely too. Everyone loved her differently. Let\'s not rank it."',
        emotion: "neutral",
      },
    ],
    choices: [
      {
        id: "withdraw-to-ren",
        text: "Withdraw from the thread. Text Ren privately and offer practical help.",
        tactic: "The thread is lost. The practical work is still available. Ren's intervention covered the immediate cost; do not add to the thread.",
        nextSceneId: "ren-private",
        isOptimal: true,
      },
      {
        id: "defend-the-kitchen",
        text: 'Defend the memory. "Mum, it was one summer. I didn\'t mean it as a comparison."',
        tactic: "Defending the memory inside a thread that is already running on ranking. Every word adds to the record.",
        nextSceneId: "ending-over-performed",
        isOptimal: false,
      },
    ],
  },

  {
    id: "defended-and-scored",
    backgroundId: "apartment",
    mood: "tense",
    presentCharacterIds: ["inner-voice"],
    dialog: [
      {
        speakerId: "mother",
        text: '"\\"I loved her too.\\" Of course you did. Everyone loves their grandmother. I am burying my mother. It is not the same thing. But thank you for the offer to help."',
        emotion: "sad",
      },
      {
        speakerId: "inner-voice",
        text: "The 'of course you did' is the downgrade. The 'thank you for the offer' is the dismissal. You defended once; that was one opening too many.",
        emotion: "knowing",
      },
    ],
    choices: [
      {
        id: "stop",
        text: "Stop posting. Withdraw to the private channel with Ren.",
        tactic: "Late but correct. Stop replying in the public theatre. Redirect to practical contribution through Ren.",
        nextSceneId: "ren-private",
        isOptimal: true,
      },
    ],
  },

  {
    id: "apologised-publicly",
    backgroundId: "apartment",
    mood: "cold",
    presentCharacterIds: ["inner-voice"],
    dialog: [
      {
        speakerId: "mother",
        text: '"Thank you for saying that. I know you are processing. I just need to feel that you care. It is a hard time."',
        emotion: "neutral",
      },
      {
        speakerId: "inner-voice",
        text: "The apology landed. The apology is now on the permanent record of this family. It will be re-cited at your next wedding toast, your next Christmas, your next moment of independence: 'Remember when she didn't even post anything when Nan died? I had to tell her.'",
        emotion: "serious",
      },
    ],
    choices: [
      {
        id: "ending-apologised",
        text: "The thread goes quiet. The funeral week continues. The apology is a file now.",
        tactic: "The cost is permanent. The scenario does not unwind it; it only ends.",
        nextSceneId: "ending-apologised",
        isOptimal: false,
      },
    ],
  },

  {
    id: "explained-the-delay",
    backgroundId: "apartment",
    mood: "cold",
    presentCharacterIds: ["inner-voice"],
    dialog: [
      {
        speakerId: "mother",
        text: '"\\"You needed a moment.\\" I have not had a single moment. I have been here all day. Some of us do not get the luxury of needing a moment."',
        emotion: "sad",
      },
      {
        speakerId: "inner-voice",
        text: "Explanation collected and re-framed as selfishness. The thread has done its work. Withdraw.",
        emotion: "knowing",
      },
    ],
    choices: [
      {
        id: "withdraw-late",
        text: "Stop. Text Ren. Offer the practical work.",
        tactic: "The only move left.",
        nextSceneId: "ren-private",
        isOptimal: true,
      },
    ],
  },

  // ===================================================================
  // ENDINGS
  // ===================================================================
  {
    id: "ending-funeral-held",
    backgroundId: "apartment",
    mood: "peaceful",
    isEnding: true,
    outcomeType: "good",
    endingTitle: "The Funeral Held",
    endingLearnPrompt:
      "In a narc family, grief is performance economy. The contribution narc parents cannot re-frame is practical work, executed quietly, outside the thread. The relationship that mattered was the one you made with the person who actually lost someone.",
    dialog: [
      {
        speakerId: "inner-voice",
        text: "The week held. The funeral happened. You did the practical work. You held Aunt Prue's hand during the committal. You made a relationship that will outlast the thread, one that is about the woman who died, not the woman who performed the grief.",
        emotion: "knowing",
      },
      {
        speakerId: null,
        text: "The family group chat is currently on message 212. Your last post in it was the two-sentence warm message on Tuesday afternoon. You did not repost. Your mother has, twice this week, posted variations of 'some of my children showed up, some did not.' You have not responded. The posts, without a reply, are an empty room with no audience.",
      },
      {
        speakerId: null,
        text: "Aunt Prue's text sits on your home screen: 'Come for lunch when I'm back from the Coast.'",
      },
    ],
    choices: [],
  },

  {
    id: "ending-apologised",
    backgroundId: "apartment",
    mood: "cold",
    isEnding: true,
    outcomeType: "bad",
    endingTitle: "The Permanent Record",
    endingLearnPrompt:
      "Inside a narc family's grief-ranking economy, an apology is not absolution, it is a file. It will be re-cited at every future moment your independence needs to be punished. Defence and apology are shapes the thread eats; practical work is the only shape it cannot metabolise.",
    dialog: [
      {
        speakerId: "inner-voice",
        text: "The apology is on the record. It will come back. It will come back in five months, in two years, in a decade. It is the move the thread was engineered to extract.",
        emotion: "serious",
      },
    ],
    choices: [],
  },

  {
    id: "ending-over-performed",
    backgroundId: "apartment",
    mood: "cold",
    isEnding: true,
    outcomeType: "bad",
    endingTitle: "The Grief Competition",
    endingLearnPrompt:
      "You entered the grief-ranking contest. Every move after entering is scored. The correct move is to not enter, the same discipline that applies to covert-narc work emails. Brevity is a move; silence is a move; practical work is a move. Performance is not a move; it is the instrument being used on you.",
    dialog: [
      {
        speakerId: "inner-voice",
        text: "The competition was won by your mother, with Ren in second place. You are third. Your cousin who posted one heart is fourth. This is the leaderboard that will be referenced at Christmas.",
        emotion: "serious",
      },
    ],
    choices: [],
  },
];

export const toxicNarc31: Scenario = {
  id: "tn-3-1",
  title: "The Family Group Chat",
  tagline: "Your grandmother died yesterday. The chat has forty-seven messages. You have said nothing yet.",
  description:
    "A grief-ranking contest has already been scored in your absence. The question is not how you grieve, it is which move declines to play without producing fresh ammunition for the next family event.",
  tier: "premium",
  track: "toxic-narc",
  level: 3,
  order: 1,
  estimatedMinutes: 14,
  difficulty: "advanced",
  category: "narcissist",
  xpReward: 400,
  badgeId: "funeral-held",
  startSceneId: "the-news",
  prerequisites: ["tn-1-1"],
  tacticsLearned: [
    "Read before writing, never post into a narc thread you have not first read in full",
    "The private sibling channel as first move when the golden sibling has volunteered to 'handle it'",
    "The two-sentence warm brief as the only public post worth making",
    "Practical work outside the thread as the only contribution narc parents cannot re-frame",
    "The specific private note to the person who actually lost someone",
  ],
  redFlagsTaught: [
    "The grief-ranking economy: narc families transform a death into a contest",
    "The reframe: a warm-brief message gets downgraded to a cold-brief when the parent wants ammunition",
    "The apology-as-permanent-record: what you write in a narc chat is cited at every future event",
    "The 'my everything' post as a territorial claim on the grief role, any match is read as challenge",
  ],
  characters: [INNER_VOICE, THE_MOTHER, GOLDEN_SIBLING, PRIYA],
  scenes,
};

export default toxicNarc31;
