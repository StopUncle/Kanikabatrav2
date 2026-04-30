/**
 * Dating Line. Mission 5 "The Secure One" (ENDGAME)
 *
 * Teaches: re-wiring attraction from chaos to health. The difference
 * between "boring" and "peaceful". Why trauma-bonded men misread
 * security as absence of chemistry. Patience with a regulated partner.
 * The skill of staying engaged with a woman who is not performing for
 * your nervous system. Why ecstatic-start relationships burn out and
 * warm-start relationships compound.
 *
 * Why it matters: men trained on chaos can't recognise safety. Calm
 * reads as cold. Direct reads as "not into me". Low-drama reads as
 * "no spark". The man who can choose the secure woman AND stay
 * engaged wins every decade that follows. This is the hardest test
 * because the villain is the player's own nervous system.
 *
 * Failure routes → "Reading Attachment Style from Texts"
 * Secondary → "Butterflies Are Warning Not Romance"
 */

import type { Scenario, Scene } from "../../types";
import { NOOR, COLE, LIV, INNER_VOICE_M } from "../../characters-male";

const scenes: Scene[] = [
  // ---------------------------------------------------------------------
  // PART 1, the date that didn't feel like a date
  // ---------------------------------------------------------------------
  {
    id: "after-date-four",
    backgroundId: "apartment",
    mood: "peaceful",
    dialog: [
      {
        speakerId: null,
        text: "Thursday, 10:22pm. You just got home from date four with Noor. Your jacket is still on. You're standing in the kitchen with a glass of water you haven't drunk.",
      },
      {
        speakerId: null,
        text: "She was warm. She asked real questions and waited for real answers. She didn't check her phone once. She said, like it was the most normal sentence in the world, 'I had a good time. I'd like to see you again. Thursday?'",
      },
      {
        speakerId: null,
        text: "No strategic silence. No seventeen-hour reply delays. No test. Just a sentence.",
      },
      {
        speakerId: "inner-voice",
        text: "And a part of you, the part you don't talk about, is saying: that's it?",
        emotion: "knowing",
      },
      {
        speakerId: "inner-voice",
        text: "Your nervous system is calibrated to chaos. Noor is peace. Peace, to a chaos-trained body, reads as absence. That's not information about her. That's information about you.",
        emotion: "serious",
      },
    ],
    choices: [
      {
        id: "sit-with-it",
        text: "Sit with the discomfort. Name what's happening. Don't do anything yet.",
        tactic: "Attraction recalibration starts with noticing the misread, not acting on it.",
        nextSceneId: "the-text-at-1147",
        isOptimal: true,
      },
      {
        id: "scroll-feed",
        text: "Open Instagram. Scroll until the feeling goes away.",
        tactic: "Numbing the discomfort is how you avoid the lesson the discomfort is teaching.",
        nextSceneId: "the-text-at-1147",
      },
      {
        id: "text-cole-now",
        text: "Text Cole. 'Date was nice. Feels flat.'",
        tactic: "Going to your wise friend early, before the chaos pull hits, is a legitimate move.",
        nextSceneId: "cole-first-reply",
      },
    ],
  },

  // ---------------------------------------------------------------------
  // PART 2, the 11:47 text (the trauma-bonded wiring activates)
  // ---------------------------------------------------------------------
  {
    id: "the-text-at-1147",
    backgroundId: "apartment",
    mood: "tense",
    immersionTrigger: "intimate-moment",
    presentCharacterIds: ["liv"],
    dialog: [
      {
        speakerId: null,
        text: "11:47pm. The phone lights up.",
      },
      {
        speakerId: "liv",
        text: '"Still thinking about you."',
        emotion: "seductive",
      },
      {
        speakerId: null,
        text: "Four words. Liv. The one you left three months ago, the one your nervous system has been in withdrawal from ever since.",
      },
      {
        speakerId: null,
        text: "Something goes warm in you. Not in your chest, lower. A heat Noor did not produce in three hours of good conversation.",
      },
      {
        speakerId: "inner-voice",
        text: "Look at what just happened. One text. Four words. And your body responded with more signal than an entire evening with a woman who listened to you.",
        emotion: "serious",
      },
      {
        speakerId: "inner-voice",
        text: "That heat is not chemistry. That's intermittent reinforcement dependency. The same chemistry a slot machine builds in a gambler. Liv's texts hit harder BECAUSE they're unreliable, not despite it.",
        emotion: "knowing",
      },
      {
        speakerId: "inner-voice",
        text: "Noor does not give you withdrawal. Liv does. Your body is confusing withdrawal for desire. Most men never learn the difference. They marry the withdrawal.",
        emotion: "serious",
      },
    ],
    choices: [
      {
        id: "delete-and-sleep",
        text: "Delete the text. Phone on the counter. Go to bed.",
        tactic: "The strongest move is the one your body hates. Deletion without reply starves the loop.",
        nextSceneId: "cole-next-morning",
        isOptimal: true,
      },
      {
        id: "reply-to-liv",
        text: 'Reply. "Yeah?"',
        tactic: "One word back and the loop re-engages. Your next four months are already written.",
        nextSceneId: "liv-spiral",
      },
      {
        id: "read-and-wait",
        text: "Read it. Don't reply. Leave it sitting there.",
        tactic: "Half-measure. The text is still a live wire on your nightstand. You'll reply at 2am.",
        nextSceneId: "the-2am-reply",
      },
      {
        id: "cancel-noor",
        text: "Cancel Thursday with Noor. 'Not feeling it, sorry.'",
        tactic: "You just called peace 'not feeling it'. That's the chaos-addicted voice running the show.",
        nextSceneId: "cancelled-noor",
      },
      {
        id: "text-cole-urgent",
        text: "Screenshot the text. Send it to Cole. 'Help.'",
        tactic: "Outsourcing the decision to a wise friend before your nervous system wins. Highest-integrity move a recovering man makes.",
        nextSceneId: "cole-intervention",
        isOptimal: true,
      },
    ],
  },

  // ---------------------------------------------------------------------
  // PART 3A. Cole intervention (optimal path)
  // ---------------------------------------------------------------------
  {
    id: "cole-intervention",
    backgroundId: "apartment",
    mood: "tense",
    presentCharacterIds: ["cole"],
    dialog: [
      {
        speakerId: null,
        text: "Cole replies in ninety seconds. He's been waiting for this text. He knew it was coming.",
      },
      {
        speakerId: "cole",
        text: '"Delete it. Right now. Don\'t reply, don\'t screenshot-reply-in-your-head, don\'t draft-and-not-send. Delete."',
        emotion: "serious",
      },
      {
        speakerId: "cole",
        text: '"And then listen to me. The fact that four words from Liv did more to your body than three hours with Noor is not a Noor problem. It\'s your problem. It\'s the problem I had for two years after my marriage ended."',
        emotion: "knowing",
      },
      {
        speakerId: "cole",
        text: '"You are not healed yet. Noor is the test you are trying to pass. If you fail it, you will be me at 38, paying child support to a woman who is still in your head."',
        emotion: "serious",
      },
      {
        speakerId: "inner-voice",
        text: "He is giving you the one sentence you needed to hear. Write it down. 'Noor is the test I am trying to pass.' That sentence is the next ten years of your life.",
        emotion: "knowing",
      },
    ],
    choices: [
      {
        id: "delete-and-commit",
        text: "Delete the text. Say it out loud: 'Noor is the test I'm trying to pass.'",
        tactic: "Naming the wiring to yourself, out loud, breaks the trance. This is the work.",
        nextSceneId: "the-weeks-compress",
        isOptimal: true,
      },
      {
        id: "delete-silently",
        text: "Delete the text. Don't say anything. Go to bed.",
        tactic: "Deletion without naming is a 70% move. The loop will be back tomorrow night.",
        nextSceneId: "the-weeks-compress",
      },
      {
        id: "call-cole",
        text: "Call Cole. Talk until the urge passes.",
        tactic: "Hand the rope to someone who knows the knot. Cole's voice is the circuit-breaker tonight.",
        nextSceneId: "the-weeks-compress",
        isOptimal: true,
      },
      {
        id: "block-liv",
        text: "Block Liv. Screenshot the block for yourself. Delete.",
        tactic: "Remove the channel entirely. You don\'t negotiate with a voice you can\'t hear.",
        nextSceneId: "the-weeks-compress",
        isOptimal: true,
      },
    ],
  },

  {
    id: "cole-first-reply",
    backgroundId: "apartment",
    mood: "peaceful",
    presentCharacterIds: ["cole"],
    dialog: [
      {
        speakerId: "cole",
        text: '"Flat meaning what. Flat meaning she\'s boring, or flat meaning your body isn\'t doing fireworks? Because those are completely different problems."',
        emotion: "knowing",
      },
      {
        speakerId: "cole",
        text: '"If she\'s boring, her conversation, her mind, her values, run. If your body isn\'t doing fireworks with a regulated woman who listens, congratulations, your nervous system works exactly the way a traumatised man\'s nervous system works. That\'s the one you stay for."',
        emotion: "serious",
      },
      {
        speakerId: "inner-voice",
        text: "He just separated the two things your body was conflating. 'Boring' and 'peaceful' are not the same. Ninety percent of men who leave a Noor leave because they collapsed these two words into one.",
        emotion: "knowing",
      },
    ],
    nextSceneId: "the-text-at-1147",
  },

  {
    id: "cole-next-morning",
    backgroundId: "apartment",
    mood: "peaceful",
    presentCharacterIds: ["cole"],
    dialog: [
      {
        speakerId: null,
        text: "You slept on it. Morning. You tell Cole over coffee.",
      },
      {
        speakerId: "cole",
        text: '"Deleting without replying is the hardest rep in the gym. You just did it. Don\'t spike the ball, the test isn\'t over, it\'s starting."',
        emotion: "knowing",
      },
      {
        speakerId: "cole",
        text: '"The next test is Thursday. You show up to Noor. You stay. You don\'t unconsciously sabotage because peace is foreign to you. Watch your own hands."',
        emotion: "serious",
      },
    ],
    nextSceneId: "the-weeks-compress",
  },

  // ---------------------------------------------------------------------
  // PART 4, the weeks compress (date 6, 8, 10)
  // ---------------------------------------------------------------------
  {
    id: "the-weeks-compress",
    backgroundId: "apartment",
    mood: "peaceful",
    presentCharacterIds: ["noor"],
    dialog: [
      {
        speakerId: null,
        text: "Date six. She cooks at her place. Tells you her mother had her at nineteen. Doesn't perform the story. Doesn't make you rescue her from it.",
      },
      {
        speakerId: null,
        text: "Date eight. You disagree about something small, a film. She says, calmly, 'I don't think that's what the film was about.' She doesn't sulk. She doesn't apologise for disagreeing. You have no script for this.",
      },
      {
        speakerId: null,
        text: "Date ten. She's there when she said she'd be there. Her phone stays in her bag. She asks about your ex. You tell her more than you meant to.",
      },
      {
        speakerId: "noor",
        text: '"That sounds like it cost you."',
        emotion: "neutral",
      },
      {
        speakerId: null,
        text: "She doesn't centre herself in your pain. She doesn't tell you her worse story. She doesn't promise she's different. She just registers what happened to you.",
      },
      {
        speakerId: "inner-voice",
        text: "This is what secure attachment looks like up close. No performance. No tests. No withdrawal-bait to hook you. And the entire time, feel it, your nervous system is scanning for the drop.",
        emotion: "knowing",
      },
      {
        speakerId: "inner-voice",
        text: "The devaluation scene. The cold text. The sudden flip. You keep waiting for it because that's the shape every previous relationship had. With Noor, the drop never comes. And a part of you is uncomfortable that it isn't coming.",
        emotion: "serious",
      },
    ],
    choices: [
      {
        id: "let-it-in",
        text: "Let it land. She listened. Don't pivot, don't deflect, just let yourself receive it.",
        tactic: "Receiving being seen by a secure woman is a skill. Most men deflect because the receiving itself feels unsafe.",
        nextSceneId: "the-promotion-scene",
        isOptimal: true,
      },
      {
        id: "make-a-joke",
        text: "Make a joke. Deflect. Change the subject.",
        tactic: "Deflection is how the trauma-trained man refuses intimacy without noticing he's refusing it.",
        nextSceneId: "the-promotion-scene",
      },
      {
        id: "trauma-dump",
        text: "Keep talking. Download the whole ex-story. Let her hold it.",
        tactic: "Weaponised vulnerability. You're not sharing, you're outsourcing regulation to her. A secure woman notices.",
        nextSceneId: "the-promotion-scene",
      },
    ],
  },

  // ---------------------------------------------------------------------
  // PART 5, the crisis (the flare inside you)
  // ---------------------------------------------------------------------
  {
    id: "the-promotion-scene",
    backgroundId: "restaurant",
    mood: "tense",
    presentCharacterIds: ["noor"],
    dialog: [
      {
        speakerId: null,
        text: "Month three. Dinner. She puts her wine down and says it like someone who trusts you with her news.",
      },
      {
        speakerId: "noor",
        text: '"I took the promotion. It\'s a long day once a week for the next six months. Thursdays will be late. I wanted to tell you in person."',
        emotion: "happy",
      },
      {
        speakerId: null,
        text: "She's looking at you calmly. Waiting for your actual response, not managing a reaction she's pre-scripted.",
      },
      {
        speakerId: null,
        text: "And inside you, fast, almost subliminal, something flares. A tiny flash of heat behind your sternum. The voice in your head, moving too fast to catch: she's pulling back. This is where it starts.",
      },
      {
        speakerId: "inner-voice",
        text: "Stop. Freeze-frame what just happened inside you. She told you she got a promotion. A neutral, good piece of news. And your nervous system fired the abandonment alarm.",
        emotion: "serious",
      },
      {
        speakerId: "inner-voice",
        text: "That flare is not information. It is trauma-bonded wiring misfiring in the presence of a regulated partner. It is the same circuit that made you addicted to Liv's silences. It is firing because there is no drama to feed on.",
        emotion: "knowing",
      },
      {
        speakerId: "inner-voice",
        text: "What you do in the next ten seconds decides whether you get this woman or lose her slowly over six months of preemptive withdrawal.",
        emotion: "serious",
      },
    ],
    choices: [
      {
        id: "name-it-internally",
        text: "Say it to yourself silently: 'That flare is wiring, not information.' Smile at her. 'Congratulations. That's big.'",
        tactic: "Notice the flare, don't act on it, don't make her manage it. This is the whole skill.",
        nextSceneId: "the-reassurance-beat",
        isOptimal: true,
      },
      {
        id: "preemptive-withdrawal",
        text: "Go cold. 'Oh. Okay. Cool.' Check your phone. Be short for the rest of dinner.",
        tactic: "Preemptive withdrawal, punish her for the abandonment she didn't commit. Classic anxious-avoidant move.",
        nextSceneId: "noor-reassesses",
      },
      {
        id: "test-her",
        text: 'Test her. "So Thursdays are gone. Just like that, no conversation."',
        tactic: "Picking a fight to force reassurance. She won't take the bait but she'll log it.",
        nextSceneId: "noor-reassesses",
      },
      {
        id: "ask-for-reassurance",
        text: '"Does this mean we see each other less. Are we okay."',
        tactic: "Asking her to manage your nervous system. Once is fine. A pattern trains her to parent you.",
        nextSceneId: "reassurance-pattern",
      },
      {
        id: "talk-it-through",
        text: 'Open it without making her manage it. "That\'s great news. I noticed something flared in me when you said it, not about you. Something I\'m working on. Tell me about the role."',
        tactic: "Naming your own process without dumping it on her. Highest-skill move for a recovering man.",
        nextSceneId: "the-softening",
        isOptimal: true,
      },
    ],
  },

  {
    id: "the-reassurance-beat",
    backgroundId: "restaurant",
    mood: "peaceful",
    presentCharacterIds: ["noor"],
    dialog: [
      {
        speakerId: null,
        text: "She lights up. Tells you about the role for ten minutes. You stay present. The flare passes, and it is smaller every time you don't feed it.",
      },
      {
        speakerId: "inner-voice",
        text: "This is attraction recalibration. You just did a rep. The flare will fire again next week and the week after. Each time you don't act on it, the circuit weakens. This is how a nervous system heals, in ten-second increments, not breakthroughs.",
        emotion: "knowing",
      },
    ],
    nextSceneId: "the-softening",
  },

  // ---------------------------------------------------------------------
  // PART 6, the softening (one month later)
  // ---------------------------------------------------------------------
  {
    id: "the-softening",
    backgroundId: "apartment",
    mood: "peaceful",
    presentCharacterIds: ["noor"],
    dialog: [
      {
        speakerId: null,
        text: "One month later. Saturday morning. Her kitchen. She's making coffee. Neither of you has said anything for maybe four minutes, and it isn't the kind of silence you're scanning.",
      },
      {
        speakerId: null,
        text: "You realise, not as a thought, as a physical observation, that you stopped scanning for the drop sometime in the last week.",
      },
      {
        speakerId: "noor",
        text: '"You seem calmer lately. It\'s nice."',
        emotion: "neutral",
      },
      {
        speakerId: null,
        text: "She says it like an observation, not a hook. No follow-up question. No please-validate-me-for-noticing. Just a sentence.",
      },
      {
        speakerId: "inner-voice",
        text: "Your nervous system just finished a re-wire it has been trying to do for years. Not because of her, because you let her be regulated without punishing her for it. This is how men who were trained on chaos learn to live in peace.",
        emotion: "knowing",
      },
    ],
    choices: [
      {
        id: "tell-cole",
        text: "Text Cole later: 'I think I stopped scanning.'",
        tactic: "Naming progress to a witness makes it real. Cole has been waiting to hear this for a year.",
        nextSceneId: "ending-secure",
        isOptimal: true,
      },
      {
        id: "stay-quiet",
        text: "Don't say anything. Just drink the coffee.",
        tactic: "Silent progress is still progress. The next decade was decided in this kitchen.",
        nextSceneId: "ending-secure",
        isOptimal: true,
      },
      {
        id: "tell-noor",
        text: '"You\'re right. I am calmer. Thank you for noticing without making it a thing."',
        tactic: "Give her back the observation without the performance. She gets the credit for the steadiness her steadiness made possible.",
        nextSceneId: "ending-secure",
        isOptimal: true,
      },
      {
        id: "ask-about-her",
        text: '"How are YOU doing this morning?"',
        tactic: "Return the attention to her. The re-wire completes when giving calm becomes as automatic as receiving it.",
        nextSceneId: "ending-secure",
        isOptimal: true,
      },
    ],
  },

  {
    id: "reassurance-pattern",
    backgroundId: "restaurant",
    mood: "tense",
    presentCharacterIds: ["noor"],
    dialog: [
      {
        speakerId: null,
        text: "She reassures you. Warmly. Completely. She means it.",
      },
      {
        speakerId: null,
        text: "And then, over the next six weeks, you ask her to reassure you five more times. Eight. Twelve. Every time you feel the flare, you route it through her mouth.",
      },
      {
        speakerId: "inner-voice",
        text: "You have trained a secure woman to be your regulation. She is doing it, for now, because she loves you. But you are not a partner to her, you are a patient. And the person doing the parenting burns out.",
        emotion: "serious",
      },
    ],
    nextSceneId: "ending-parentified",
  },

  // ---------------------------------------------------------------------
  // BAD BRANCHES
  // ---------------------------------------------------------------------
  {
    id: "liv-spiral",
    backgroundId: "apartment",
    mood: "danger",
    presentCharacterIds: ["liv"],
    immersionTrigger: "red-flag-revealed",
    dialog: [
      {
        speakerId: null,
        text: "You replied. One word. 'Yeah?'",
      },
      {
        speakerId: null,
        text: "She responded in twenty seconds. By 12:40am you are on the phone. By 1:15am she is in an Uber. By 2:30am your body is doing the thing it has missed for three months.",
      },
      {
        speakerId: null,
        text: "By morning Noor is a ghost. By Thursday you cancel. By week two you are back inside the loop, the good days, the vicious days, the devaluation, the love-bomb, the silence, the eruption.",
      },
      {
        speakerId: "inner-voice",
        text: "You misread withdrawal as desire. You chose the slot machine over the woman. Six months from now, when she destroys you again, you will remember Noor and the memory will be the price.",
        emotion: "sad",
      },
    ],
    nextSceneId: "ending-back-in-hell",
  },

  {
    id: "the-2am-reply",
    backgroundId: "apartment",
    mood: "danger",
    dialog: [
      {
        speakerId: null,
        text: "You left the text sitting. You went to bed. At 2:04am you woke up, reached for the phone without thinking, and replied before your prefrontal cortex was online.",
      },
      {
        speakerId: "inner-voice",
        text: "This is why deletion is the rule, not 'self-control'. Self-control at 2am loses to a nervous system that has been training for this relapse for three months. You do not rely on willpower against your own wiring. You remove the wire.",
        emotion: "sad",
      },
    ],
    nextSceneId: "liv-spiral",
  },

  {
    id: "cancelled-noor",
    backgroundId: "apartment",
    mood: "cold",
    presentCharacterIds: ["noor"],
    dialog: [
      {
        speakerId: null,
        text: "You cancel Thursday. 'Just not feeling it. I'm sorry.' She replies, calmly, 'Thanks for telling me directly. I wish you well.' No guilt trip. No begging. No Act Three.",
      },
      {
        speakerId: null,
        text: "The absence of her fight is louder than a fight would have been.",
      },
      {
        speakerId: "inner-voice",
        text: "You just confused 'peaceful' with 'boring' and acted on it. That is the single most common way men trained on chaos lose the woman who would have been their life. It does not feel like a mistake for months. By the time it does, she is gone.",
        emotion: "sad",
      },
    ],
    nextSceneId: "ending-no-spark",
  },

  {
    id: "noor-reassesses",
    backgroundId: "restaurant",
    mood: "cold",
    presentCharacterIds: ["noor"],
    dialog: [
      {
        speakerId: null,
        text: "She doesn't take the bait. Doesn't escalate. Doesn't get small. She just watches you, once, steadily, the way a regulated adult watches a man revealing his wiring.",
      },
      {
        speakerId: "noor",
        text: '"I\'m just going to eat. We can talk about this when you\'re ready to talk and not to pick."',
        emotion: "neutral",
      },
      {
        speakerId: "inner-voice",
        text: "You tested a secure woman. She did not fail the test, she logged it. She will not leave tonight. She will leave in two months, kindly, after watching you fail the test three more times.",
        emotion: "sad",
      },
    ],
    nextSceneId: "ending-noor-leaves",
  },

  // ---------------------------------------------------------------------
  // ENDINGS
  // ---------------------------------------------------------------------
  {
    id: "ending-secure",
    backgroundId: "apartment",
    mood: "peaceful",
    immersionTrigger: "victory",
    isEnding: true,
    outcomeType: "good",
    endingTitle: "The Scan Stopped",
    endingSummary:
      "You chose Noor and then, harder, you stayed. You deleted the text. You named the flare. You did not make her manage your nervous system. You sat through the discomfort of peace until your body stopped misreading it as absence. A year from now you move in together. Three years from now she is the mother of your son. Twenty years from now, when your friends are on their second divorces, you will remember the night you stood in your kitchen with a glass of water and chose the woman who did not give you withdrawal. Cole tells you, plainly: 'Dude. That's a marriage.' You laugh for the first time in a year. The warm-start relationship compounds, quietly, without fireworks, into a life.",
    dialog: [
      {
        speakerId: "inner-voice",
        text: "Men trained on chaos cannot recognise safety until they have sat through it without running. You just did. The rest of your life is the dividend.",
        emotion: "knowing",
      },
    ],
  },

  {
    id: "ending-back-in-hell",
    backgroundId: "apartment",
    mood: "danger",
    isEnding: true,
    outcomeType: "bad",
    endingTitle: "Back in the Loop",
    endingSummary:
      "You answered the text. Three months later you are back where you swore you would never be, inside Liv's cycle, exhausted, unable to sleep, checking her location, defending her to your friends for the fourth time. Noor moved on without performance. You heard, through a mutual, that she is seeing someone who does not scan her for the drop. That sentence will find you in the middle of a bad night a year from now and it will be the worst sentence of your twenties. The chaos addiction won this round. The lesson was available. You declined it.",
    failureBlogSlug: "reading-attachment-style-from-texts",
    failureBlogTitle: "Reading Attachment Style from Texts",
    dialog: [
      {
        speakerId: "inner-voice",
        text: "Intermittent reinforcement dependency is not a metaphor. It is a trained circuit. Circuits do not break by being ignored, they break by being starved. You fed it.",
        emotion: "sad",
      },
    ],
  },

  {
    id: "ending-no-spark",
    backgroundId: "apartment",
    mood: "cold",
    isEnding: true,
    outcomeType: "bad",
    endingTitle: "No Spark",
    endingSummary:
      "You told yourself, and then your friends, that there was 'no spark'. You meant it. You felt it. And what you actually felt was your nervous system failing to recognise a woman who was not performing for it. Three months later you are on an app again, swiping toward the next Liv, telling yourself you're 'looking for chemistry'. You will find it. It will cost you another two years. Somewhere in your thirties you will understand, possibly over a drink with Cole, possibly too late, that 'butterflies' were never romance. They were warning. And the quiet woman who said 'Thursday?' was the life you walked past.",
    failureBlogSlug: "butterflies-are-warning-not-romance",
    failureBlogTitle: "Butterflies Are Warning Not Romance",
    dialog: [
      {
        speakerId: "inner-voice",
        text: "The man who cannot distinguish 'peaceful' from 'boring' will spend his life mistaking the wound for the woman.",
        emotion: "sad",
      },
    ],
  },

  {
    id: "ending-noor-leaves",
    backgroundId: "apartment",
    mood: "cold",
    isEnding: true,
    outcomeType: "bad",
    endingTitle: "She Saw You Couldn't Stop Scanning",
    endingSummary:
      "Two months later, on a Sunday afternoon, Noor sits across from you and says, calmly, without drama, without cruelty, that she does not think you are available yet. She does not weaponise it. She does not list grievances. She just tells you the truth: 'I can feel you waiting for me to become someone I'm not. I don't want to be the woman you finally trust after a year of auditions.' She wishes you well. She means it. You walk home and you understand, for the first time, that you lost her to a part of yourself that was not ready. The blog in the ending page is called Reading Attachment Style from Texts. She read yours. It was the tell.",
    failureBlogSlug: "reading-attachment-style-from-texts",
    failureBlogTitle: "Reading Attachment Style from Texts",
    dialog: [
      {
        speakerId: "inner-voice",
        text: "A regulated adult does not fight you for the right to be in your life. She observes, and at some point she decides. You were observed. You were decided.",
        emotion: "sad",
      },
    ],
  },

  {
    id: "ending-parentified",
    backgroundId: "apartment",
    mood: "cold",
    isEnding: true,
    outcomeType: "bad",
    endingTitle: "You Trained Her to Parent You",
    endingSummary:
      "She reassured you every time you asked, until one morning she didn't. Not dramatically, quietly. A softness went out of her voice that you only noticed in retrospect. The dynamic had flipped: you were the patient, she was the caretaker, and somewhere around month six the caretaker burned out. She ended it gently. You told your friends she 'pulled back', which was true, and which was also the wrong frame. She did not pull back. She left a role you had written for her, a role she had never auditioned for. The chance to be her partner was real. You made her your therapist, and therapists do not marry their clients.",
    failureBlogSlug: "butterflies-are-warning-not-romance",
    failureBlogTitle: "Butterflies Are Warning Not Romance",
    dialog: [
      {
        speakerId: "inner-voice",
        text: "Anxious attachment feels like love to the man who has it. To the woman on the receiving end it feels like being drafted into unpaid labour.",
        emotion: "sad",
      },
    ],
  },

  {
    id: "ending-half-lit",
    backgroundId: "apartment",
    mood: "cold",
    isEnding: true,
    outcomeType: "neutral",
    endingTitle: "A Half-Lit Life",
    endingSummary:
      "You stayed with Noor. Outwardly, to friends, to family, in photographs, the relationship was healthy, stable, enviable. Inwardly, you never fully stopped scanning. You never let her fully in. You kept a small room in you where the chaos-version of love lived, and you visited it when she was asleep. Years passed. You had a home, a life, a good partner who deserved more than you were ever quite willing to give. The version of you that was fully there for her stayed theoretical. Not a disaster. Not a life either.",
    dialog: [
      {
        speakerId: "inner-voice",
        text: "The failure mode most men never name: not leaving the good woman, but never fully arriving. A half-lit relationship is the quietest loss a life can hold.",
        emotion: "sad",
      },
    ],
  },
];

export const datingMission5: Scenario = {
  id: "d5-secure-one",
  title: "The Secure One",
  tagline:
    "She's calm, direct, no games. A quiet voice in you asks if she's boring. That voice is the thing deciding your next decade.",
  description:
    "Date four with Noor went well. She was warm, direct, no phone games, no mixed signals. You walked home calm and a part of you, the part trained on chaos, said 'that's it?'. Then at 11:47pm Liv texts. Your body answers in a way Noor didn't make it answer. This is the endgame of the Dating Line: the test of whether you can recognise a regulated partner, sit through the discomfort of peace without sabotaging it, and stay engaged with a woman who is not performing for your nervous system. The villain in this scenario is your own wiring. The prize is the next decade.",
  tier: "vip",
  track: "male-dating",
  level: 5,
  order: 1,
  estimatedMinutes: 14,
  difficulty: "advanced",
  category: "healthy",
  xpReward: 300,
  badgeId: "secure-attachment",
  startSceneId: "after-date-four",
  tacticsLearned: [
    "Distinguishing 'peaceful' from 'boring' in your own body",
    "Deleting without replying to a hoover text, the hardest rep",
    "Naming a trauma-bonded flare internally instead of acting on it",
    "Sharing your process with a secure partner without making her manage it",
    "Receiving being seen without deflecting, joking, or trauma-dumping",
    "Using a wise friend as an external circuit-breaker before relapse",
  ],
  redFlagsTaught: [
    "Misreading intermittent reinforcement dependency as chemistry",
    "Confusing withdrawal for desire",
    "Preemptive withdrawal when a secure partner shares neutral news",
    "Asking for reassurance as a pattern (parentifying the partner)",
    "Calling peace 'no spark' and leaving",
    "The nervous system scan for drop in a healthy relationship",
  ],
  characters: [NOOR, COLE, LIV, INNER_VOICE_M],
  scenes,
};

export default datingMission5;
