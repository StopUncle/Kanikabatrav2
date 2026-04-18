/**
 * Dating Line — Mission 2 "The Exciting One"
 *
 * Teaches: distinguishing arousal from compatibility. BPD/HPD markers
 * visible by week three. Idealisation/devaluation cycle. Weaponised
 * jealousy. Love-bombing in dating register. The withdrawal period
 * from a cluster-B woman.
 *
 * Why it matters: this scenario destroys more men's lives than bad
 * careers combined. Not the obvious gold-digger — the EXCITING woman.
 * The pull is real. The nervous-system hijack is real. The damage is
 * real. Learning to feel the pull AND not act on it is the hardest
 * discipline in the simulator.
 *
 * Failure routes → "Butterflies Are Warning Not Romance"
 * Secondary      → "Love-Bombing Signs Warning"
 */

import type { Scenario, Scene } from "../../types";
import { LIV, COLE, INNER_VOICE_M } from "../../characters-male";

const scenes: Scene[] = [
  // ---------------------------------------------------------------------
  // PART 1 — week two, the pull
  // ---------------------------------------------------------------------
  {
    id: "week-two",
    backgroundId: "bedroom",
    mood: "romantic",
    presentCharacterIds: ["liv"],
    dialog: [
      {
        speakerId: null,
        text: "Thirteen days. That's all it's been. Thirteen days since the espresso martini, the cab, the hallway where she pulled your shirt open before the door closed.",
      },
      {
        speakerId: null,
        text: "She has already said 'I've never felt this with anyone' — twice. Last night the sex was volcanic. This morning, before you'd made coffee, she'd sent forty-seven texts.",
      },
      {
        speakerId: "liv",
        text: '"I can\'t stop thinking about you. I know it\'s crazy. I don\'t care. I want you so much it scares me."',
        emotion: "seductive",
      },
      {
        speakerId: "inner-voice",
        text: "Feel that in your chest? That's not love. That's intermittent reinforcement. Thirteen days is not long enough to feel what she says she feels. Your body believes her. Your trained eye should be taking notes.",
        emotion: "serious",
      },
    ],
    choices: [
      {
        id: "take-notes",
        text: "Feel it fully — and start a quiet list in your head of what you've actually seen.",
        tactic: "Arousal and assessment can coexist. Intensity is data, not destiny.",
        nextSceneId: "the-list",
        isOptimal: true,
      },
      {
        id: "surrender-to-it",
        text: "Stop thinking. She's telling you she's never felt this. Believe her.",
        tactic: "Love-bombing is a testable claim, not a statement of fact. Surrender before verification is how men disappear.",
        nextSceneId: "lean-in-early",
      },
      {
        id: "cold-retreat",
        text: "Pull back hard. Stop texting. Ghost for a day and see what happens.",
        tactic: "Sudden withdrawal from a dysregulated woman detonates the cycle you're trying to avoid. There's a cleaner move.",
        nextSceneId: "cold-retreat-scene",
      },
    ],
  },

  // ---------------------------------------------------------------------
  // PART 2 — the list your trained eye has made
  // ---------------------------------------------------------------------
  {
    id: "the-list",
    backgroundId: "cafe",
    mood: "tense",
    immersionTrigger: "red-flag-revealed",
    dialog: [
      {
        speakerId: null,
        text: "You sit with a coffee. Thirteen days. What have you actually seen, not what have you felt?",
      },
      {
        speakerId: null,
        text: "Date three: the waiter brought the wrong wine. She went from laughing to cold-eyed in under a second. Voice low, surgical: 'Are you incompetent, or just lazy?' He went white. Three minutes later she was crying — about her mother — and the waiter was apologising to HER.",
      },
      {
        speakerId: null,
        text: "She has no close female friends. 'Women are jealous of me' — said it twice, unprompted.",
      },
      {
        speakerId: null,
        text: "Her ex is 'obsessed with her' — she's mentioned this four separate times in thirteen days. Unprompted each time.",
      },
      {
        speakerId: null,
        text: "Today's texts: 6am 'I miss you'. 9am 'thinking about last night 🥵'. 11am 'are you okay??'. 12:04pm 'why are you ignoring me'. 12:07pm '??'.",
      },
      {
        speakerId: "inner-voice",
        text: "That's not a list of quirks. That's a diagnostic. Devaluation-then-idealisation on a stranger — that's the switch most men never see. No female friends — either every woman is jealous of her, or she triangulates and burns them. 'My ex is obsessed' mentioned four times — transference flag. She's telling you who she is. The text escalation — anxious preoccupied plus jealousy-testing. By noon on day thirteen, she was punishing you for a three-hour silence.",
        emotion: "serious",
      },
      {
        speakerId: "inner-voice",
        text: "Cluster B. BPD markers. HPD markers. Not a diagnosis — a pattern. Your body says stay. Your pattern-matching says this is the woman Cole warned you about.",
        emotion: "knowing",
      },
    ],
    choices: [
      {
        id: "call-cole",
        text: "Call Cole. He was married to this. He'll see clearer than you can.",
        tactic: "When the nervous system is loud, borrow someone else's prefrontal cortex.",
        nextSceneId: "cole-bar",
        isOptimal: true,
      },
      {
        id: "sleep-on-it",
        text: "Don't decide anything yet. Sleep on it. Let the next few days show you more.",
        tactic: "Acceptable — observation without action. But the door is unlocked and she has the key.",
        nextSceneId: "door-uninvited",
      },
      {
        id: "rationalise",
        text: "Every woman has a past. Every text escalation has context. You're overreading this.",
        tactic: "Rationalising the pattern is how you stop seeing the pattern. Intensity is not evidence against cluster-B — it's the most reliable marker of it.",
        nextSceneId: "lean-in-early",
      },
    ],
  },

  // ---------------------------------------------------------------------
  // PART 3 — Cole, at the bar, unvarnished
  // ---------------------------------------------------------------------
  {
    id: "cole-bar",
    backgroundId: "bar",
    mood: "tense",
    presentCharacterIds: ["cole"],
    dialog: [
      {
        speakerId: null,
        text: "Cole orders an old-fashioned and listens to the whole thing without interrupting. When you finish, he puts the glass down carefully.",
      },
      {
        speakerId: "cole",
        text: "\"Brother. You're describing Lena. You're describing the first year of my marriage. The waiter thing — that's the one that did it for me too. I told myself it was stress.\"",
        emotion: "knowing",
      },
      {
        speakerId: "cole",
        text: '"Here\'s what I wish someone had told me at day thirteen. Your body is not lying — the pull is real. But the pull isn\'t love. It\'s your nervous system responding to a slot machine. You never know which text is the warm one and which one is the one that ends you. That uncertainty is what your body is reading as chemistry."',
        emotion: "serious",
      },
      {
        speakerId: "cole",
        text: "\"Intermittent reinforcement. I read it ten years too late. Predictable people feel boring because your system is recalibrated to the slot machine. You have to detox off her before you can feel a secure woman without mistaking her for nothing.\"",
        emotion: "sad",
      },
      {
        speakerId: "inner-voice",
        text: "This is the truth most men never hear in time. The excitement is the damage. The damage is the excitement. What he's calling a slot machine is trauma bonding — your body learning that relief comes right after pain, and coding relief as love.",
        emotion: "knowing",
      },
    ],
    choices: [
      {
        id: "slow-pace",
        text: "Don't break up. Don't lean in. Slow the pace deliberately — reply at a normal cadence, keep your routines, see whether she can self-regulate.",
        tactic: "The two-week test. Not cruel, not cold — just not escalating. You're testing whether she can hold steady without the drug of your hyper-attention.",
        nextSceneId: "the-test",
        isOptimal: true,
      },
      {
        id: "end-it-now",
        text: "End it tonight. Thirteen days is still clean. Walk.",
        tactic: "Defensible. But ending it at peak-idealisation with no conversation will trigger a hoover cycle — and you haven't had the experience of seeing the devaluation yet. You will second-guess yourself for a year.",
        nextSceneId: "ended-clean",
      },
      {
        id: "have-the-talk",
        text: "Go to her tonight and say: 'we need to calm this down, I think you're moving too fast.'",
        tactic: "The intention is right; the execution will detonate her. You are about to tell a woman with abandonment wiring that she's 'too much' — in the idealisation phase. Brace.",
        nextSceneId: "the-talk",
      },
    ],
  },

  // ---------------------------------------------------------------------
  // PART 4 — the test, the normal-pace reply
  // ---------------------------------------------------------------------
  {
    id: "the-test",
    backgroundId: "apartment",
    mood: "tense",
    immersionTrigger: "red-flag-revealed",
    dialog: [
      {
        speakerId: null,
        text: "Friday. She texts at 9:04am: 'morning baby. dreamt about you. what are you doing tonight?'",
      },
      {
        speakerId: null,
        text: "You don't answer for three hours. Not punishment — just your actual day. A meeting, a gym session, lunch with a friend. Normal life. The life that existed before her.",
      },
      {
        speakerId: null,
        text: "12:07pm — your phone: 'hey?'",
      },
      {
        speakerId: null,
        text: "12:41pm — 'I guess you're busy'",
      },
      {
        speakerId: null,
        text: "1:15pm — 'lol okay. Maybe you're not actually what I thought you were.'",
      },
      {
        speakerId: null,
        text: "1:52pm — 'I'm sorry. Please. I'm just crazy about you. I don't know why I said that. I love you.'",
      },
      {
        speakerId: "inner-voice",
        text: "You are watching it happen in real time. Idealisation → devaluation → hoovering. Forty minutes. That's the full cycle in one afternoon. She just said 'I love you' on day fifteen. The 'maybe you're not what I thought' line is the tell — the devaluation is pre-loaded. She kept it in the chamber from the first idealising date.",
        emotion: "serious",
      },
    ],
    choices: [
      {
        id: "reply-calm-boundaried",
        text: "Reply calmly, once: 'Hey — was busy, all good. I need to be honest, that shift in the messages today isn't something I can be in. Want to talk on a call later.'",
        tactic: "Name the behaviour, not the person. Offer the call — you are ending the relationship, but doing it cleanly, eye to eye, voice to voice.",
        nextSceneId: "the-call",
        isOptimal: true,
      },
      {
        id: "forgive-fast",
        text: "Soften. Reply: 'It's okay. I know you didn't mean it. I've been thinking about you all day too.'",
        tactic: "You just taught her that the cycle works. Next time will be faster and the devaluation will be sharper. You reinforced the slot machine.",
        nextSceneId: "reinforced",
      },
      {
        id: "cold-stonewall",
        text: "Don't reply. Let her sit in it. She needs to feel what she did.",
        tactic: "Silence to a dysregulated abandonment-sensitive woman is accelerant. Within hours this escalates to your door, your family, your workplace.",
        nextSceneId: "escalation-spiral",
      },
    ],
  },

  // ---------------------------------------------------------------------
  // PART 5 — the call
  // ---------------------------------------------------------------------
  {
    id: "the-call",
    backgroundId: "apartment",
    mood: "cold",
    presentCharacterIds: ["liv"],
    dialog: [
      {
        speakerId: null,
        text: "You take the call at 7pm. You sit down. You keep your voice low and warm.",
      },
      {
        speakerId: "liv",
        text: "\"I was being insane today. I know. I'm sorry. I just — I've never felt this way about anyone and it scares me. Please don't end this. Please.\"",
        emotion: "pleading",
      },
      {
        speakerId: "inner-voice",
        text: "This is where most men fold. The tears, the apology, the promise. Here is the thing she cannot do: hold the temperature steady when she's not getting a hit. You saw the devaluation line land in four hours. What you're feeling now is relief — and relief after threat is the exact chemical signature you are trying to unhook from.",
        emotion: "knowing",
      },
    ],
    choices: [
      {
        id: "end-with-compassion",
        text: '"I care about you. What I saw today scared me — not the intensity, the switch. I\'m not built for that rhythm. I\'m going to step back. I hope you find someone who can meet you where you are, with the help you deserve."',
        tactic: "Compassionate, final, and without a door. You are naming the pattern kindly and refusing to be the man who tries to fix her. That's respect — of her and of you.",
        nextSceneId: "ending-clear-eyed",
        isOptimal: true,
      },
      {
        id: "stay-with-conditions",
        text: '"Okay — but we need to slow this right down. No texts like that. Weekly, not daily. Let\'s see."',
        tactic: "You just became her therapist. She will agree in this moment and repeat the cycle within ten days. You cannot condition her out of her nervous system, and you are not the right person to try.",
        nextSceneId: "ending-fix-her",
      },
      {
        id: "cruel-exit",
        text: '"This is over. Don\'t contact me. You need help, not a boyfriend."',
        tactic: "You may be right — but the delivery is a gift to her hoover cycle. You just gave her the quote she will replay for a year, and you will wonder if you were the monster.",
        nextSceneId: "ending-cruel-cut",
      },
    ],
  },

  // ---------------------------------------------------------------------
  // PART 2 alt — she's at your door (observation-only path)
  // ---------------------------------------------------------------------
  {
    id: "door-uninvited",
    backgroundId: "apartment",
    mood: "romantic",
    presentCharacterIds: ["liv"],
    immersionTrigger: "intimate-moment",
    dialog: [
      {
        speakerId: null,
        text: "9:47pm. Knock. She's at your door uninvited. Silk under the coat. Bottle of wine. Eyes already wet.",
      },
      {
        speakerId: "liv",
        text: "\"I couldn't stay away. I know I should've texted. I'm bad, I know. Just — let me in for one drink. Please.\"",
        emotion: "seductive",
      },
      {
        speakerId: "inner-voice",
        text: "This is the test. The body is deafening. The trained eye is quiet but it is still open. 'Showing up uninvited with wine and silk' is not romance — it is boundary-testing dressed as desire. Most men fail this test with a smile. Decide now — before she is in your apartment — which man you are going to be tomorrow.",
        emotion: "serious",
      },
    ],
    choices: [
      {
        id: "open-the-door-hold-frame",
        text: '"Come in for a drink — but I\'ve got an early start. One drink, on the couch. Not staying over tonight."',
        tactic: "You hold the frame without humiliating her. Letting her in with a cap is a test she will almost certainly fail — and the failure is your data.",
        nextSceneId: "she-escalates",
        isOptimal: true,
      },
      {
        id: "open-the-door-surrender",
        text: "Open it all the way. One drink becomes three. She stays. By morning she's asking when she can leave her toothbrush.",
        tactic: "You just signed the lease on the slot machine. Every subsequent boundary you try to set now reads as rejection, because you set the precedent on day thirteen.",
        nextSceneId: "lean-in-early",
      },
      {
        id: "dont-open",
        text: '"Hey — I can\'t tonight. Let\'s do dinner Saturday properly." Speak through the door. Don\'t open it.',
        tactic: "Clean, but blind. You miss the live data of how she handles a small 'no'. The pattern will show up later, and you'll have less evidence when it does.",
        nextSceneId: "the-test",
      },
    ],
  },

  {
    id: "she-escalates",
    backgroundId: "apartment",
    mood: "tense",
    presentCharacterIds: ["liv"],
    immersionTrigger: "red-flag-revealed",
    dialog: [
      {
        speakerId: null,
        text: "One drink in. You say, warmly: 'Babe, I meant it — I've got a 7am. Let me walk you to a cab.'",
      },
      {
        speakerId: "liv",
        text: "\"Are you serious? I came all the way here. You want to send me home? What — is there someone else?\"",
        emotion: "angry",
      },
      {
        speakerId: "liv",
        text: "\"Why are you being so cold. I thought this was something. Fine. FINE. I'll go. Don't call me.\"",
        emotion: "angry",
      },
      {
        speakerId: "inner-voice",
        text: "There it is. Jealousy weaponised inside thirty seconds of a soft 'no'. You did not earn that accusation — she loaded it and pulled. This is the devaluation. You now have the data you needed.",
        emotion: "knowing",
      },
    ],
    nextSceneId: "cole-bar",
  },

  // ---------------------------------------------------------------------
  // BAD BRANCH — leaned in on day thirteen
  // ---------------------------------------------------------------------
  {
    id: "lean-in-early",
    backgroundId: "bedroom",
    mood: "romantic",
    presentCharacterIds: ["liv"],
    dialog: [
      {
        speakerId: null,
        text: "Month one. You cancel Thursday drinks with Cole — she was upset about a work thing. Month two. You skip the gym for the third time this week. Month three. She has a drawer. You have stopped posting photos with other women, even colleagues, because of 'the look'.",
      },
      {
        speakerId: null,
        text: "Month four. You are the one sending forty-seven texts by noon when she doesn't reply. Your work has noticed. You are drinking more. The sex is no longer volcanic — it is the weekly ransom for her calm.",
      },
      {
        speakerId: "inner-voice",
        text: "Six months ago you were a man with friends, a gym routine, and a trajectory. Today you are a man who checks his phone every four minutes and whose best friend has stopped calling because you cancel every time. This did not happen to you. You walked into it at 9:47pm on day thirteen, smiling at a bottle of wine.",
        emotion: "sad",
      },
    ],
    nextSceneId: "ending-absorbed",
  },

  // ---------------------------------------------------------------------
  // BAD BRANCH — cold ghost
  // ---------------------------------------------------------------------
  {
    id: "cold-retreat-scene",
    backgroundId: "apartment",
    mood: "danger",
    immersionTrigger: "shock",
    dialog: [
      {
        speakerId: null,
        text: "You go silent for twenty-four hours. No reply. Nothing.",
      },
      {
        speakerId: null,
        text: "Hour six: sixteen texts. Hour twelve: she's called your office. Hour eighteen: a DM from her to your sister, whom she's never met. Hour twenty-two: she's outside your building in the rain, crying, on the phone to her mother.",
      },
      {
        speakerId: "inner-voice",
        text: "Silence to an abandonment-wired nervous system is accelerant. You did not protect yourself — you detonated her. What happens next will colour every woman who enters your apartment building for the next two years. There is always a cleaner exit than ghost.",
        emotion: "sad",
      },
    ],
    nextSceneId: "ending-messy-ghost",
  },

  // ---------------------------------------------------------------------
  // BAD BRANCH — forgave too fast
  // ---------------------------------------------------------------------
  {
    id: "reinforced",
    backgroundId: "apartment",
    mood: "tense",
    dialog: [
      {
        speakerId: "inner-voice",
        text: "You softened. The relief in her text was the reward. The reward taught her that the devaluation works. Next Tuesday the same cycle will run — but sharper, and the recovery will require more from you. You just agreed, silently, to the terms of a contract you did not read.",
        emotion: "sad",
      },
    ],
    nextSceneId: "lean-in-early",
  },

  // ---------------------------------------------------------------------
  // BAD BRANCH — she escalated after silence
  // ---------------------------------------------------------------------
  {
    id: "escalation-spiral",
    backgroundId: "apartment",
    mood: "danger",
    dialog: [
      {
        speakerId: null,
        text: "You don't reply. By 4pm she has emailed you twice. By 6pm she's outside. By 9pm she's drunk-texted your ex, whom she found on Instagram. By 11pm she's apologising, tearful, with a story about her father.",
      },
      {
        speakerId: "inner-voice",
        text: "Stonewalling a dysregulated woman is not strength — it is neglect dressed as strategy. Name the behaviour or end the relationship. Do not disappear from inside it.",
        emotion: "sad",
      },
    ],
    nextSceneId: "ending-messy-ghost",
  },

  // ---------------------------------------------------------------------
  // NEUTRAL BRANCH — the talk that detonates
  // ---------------------------------------------------------------------
  {
    id: "the-talk",
    backgroundId: "apartment",
    mood: "danger",
    presentCharacterIds: ["liv"],
    dialog: [
      {
        speakerId: null,
        text: "You go to her place. You sit her down. You say it kindly — you like her, this is just moving too fast for you, can we slow down.",
      },
      {
        speakerId: "liv",
        text: "\"Too fast? I'm too MUCH for you? Wow. Wow. Everyone I've ever loved has said that. You're just like him.\"",
        emotion: "angry",
      },
      {
        speakerId: "liv",
        text: "\"I gave you everything. I opened up to you. And you're telling me — on a Tuesday — that I'm too much. Get out. GET OUT.\"",
        emotion: "angry",
      },
      {
        speakerId: null,
        text: "Three hours later she texts you a photo of her wrist. Not cut — but you cannot tell for thirty seconds, and that thirty seconds has rewired something in you.",
      },
      {
        speakerId: "inner-voice",
        text: "You were not wrong to want to slow down. You were wrong about the method. 'You're too much' is the exact phrase her nervous system is primed to detonate on. The lesson is not that honesty is bad — it is that pattern-specific delivery matters. With a cluster-B partner, you do not negotiate pace. You hold your own frame and let her self-select in or out.",
        emotion: "sad",
      },
    ],
    nextSceneId: "ending-messy-exit",
  },

  // ---------------------------------------------------------------------
  // NEUTRAL BRANCH — ended it at peak-idealisation
  // ---------------------------------------------------------------------
  {
    id: "ended-clean",
    backgroundId: "apartment",
    mood: "cold",
    dialog: [
      {
        speakerId: null,
        text: "You end it at day thirteen. Text, then a call when she rings. You're kind, brief, final. She cries, pleads, accuses, pleads again. It lasts four days.",
      },
      {
        speakerId: null,
        text: "Six weeks later you are still thinking about her. You never saw the devaluation with your own eyes. You will spend a year wondering if you overreacted to a passionate woman. You did not — but you did not see the evidence either.",
      },
      {
        speakerId: "inner-voice",
        text: "Cleaner than most endings. But you ended it at peak-idealisation, on pattern-match alone. For some men this is discipline. For others it becomes a ghost that haunts the next secure woman — 'she's not as exciting as Liv was'. Noticing that thought, and naming it accurately, is the work of the next three months.",
        emotion: "knowing",
      },
    ],
    nextSceneId: "ending-walked-early",
  },

  // ---------------------------------------------------------------------
  // ENDINGS
  // ---------------------------------------------------------------------
  {
    id: "ending-clear-eyed",
    backgroundId: "apartment",
    mood: "peaceful",
    immersionTrigger: "victory",
    isEnding: true,
    outcomeType: "good",
    endingTitle: "Clear-Eyed, Kindly, Final",
    endingSummary:
      "You ended it the way a man who has done the reading ends it — without cruelty, without a door, without a fix-her fantasy. Three months of recovery follow. The first fortnight is brutal: your body is withdrawing from the intermittent reinforcement and reading every secure woman as flat. You keep showing up — gym, friends, sleep. By month three your nervous system has recalibrated. You meet Noor at a friend's dinner. She is not a firework. She is a sunrise. Six months in, you realise the quiet you feel with her is not boredom — it is the nervous system you lost at nineteen and never thought you'd have back.",
    dialog: [
      {
        speakerId: "inner-voice",
        text: "Butterflies are warning, not romance. The men who learn this are the men who get a life. The men who don't build monuments to the women who burned them.",
        emotion: "knowing",
      },
    ],
  },

  {
    id: "ending-walked-early",
    backgroundId: "apartment",
    mood: "mysterious",
    isEnding: true,
    outcomeType: "neutral",
    endingTitle: "Walked Early, Haunted Softly",
    endingSummary:
      "You got out clean — possibly too clean. You never watched the devaluation crystallise with your own eyes, so a part of you will second-guess the exit for a year. When the next woman is calm and consistent, a quiet voice will say 'she doesn't want you like Liv did'. That voice is the slot machine talking. If you listen to it, you will chase another Liv. If you name it — intermittent reinforcement, trauma bond, nervous system hijack — and wait it out, you get the life you want. The exit was right. The work is internal now.",
    failureBlogSlug: "butterflies-are-warning-not-romance",
    failureBlogTitle: "Butterflies Are Warning Not Romance",
    dialog: [
      {
        speakerId: "inner-voice",
        text: "The body lies when it was trained on a slot machine. Calm is not the absence of chemistry — it is the presence of a regulated nervous system.",
        emotion: "knowing",
      },
    ],
  },

  {
    id: "ending-absorbed",
    backgroundId: "apartment",
    mood: "danger",
    immersionTrigger: "defeat",
    isEnding: true,
    outcomeType: "bad",
    endingTitle: "Six Months In — The Life-Ruining Version",
    endingSummary:
      "You leaned in. At month six you are unrecognisable. Two friendships gone. One stalled promotion. Twelve pounds. A standing argument about the Instagram follow you didn't notice. The sex that was volcanic on day one is now a weekly ransom for her calm. You have started lying about small things to prevent large fights. You haven't seen Cole in eleven weeks. You know — in the 3am way you know things — that the woman you are dating is not the woman you are building a life with. But every time you try to leave, the cycle runs: devaluation, hoover, sex, relief, reset. You are not in a relationship. You are in a nervous-system contract. It will take eighteen months to get out, and another two years after that to feel anything secure without mistaking it for boredom.",
    failureBlogSlug: "butterflies-are-warning-not-romance",
    failureBlogTitle: "Butterflies Are Warning Not Romance",
    dialog: [
      {
        speakerId: "inner-voice",
        text: "The excitement was the damage. The damage was the excitement. Every man who ignored this line paid for the lesson with years he didn't have to give.",
        emotion: "sad",
      },
    ],
  },

  {
    id: "ending-fix-her",
    backgroundId: "apartment",
    mood: "cold",
    isEnding: true,
    outcomeType: "bad",
    endingTitle: "Her Emotional Bodyguard",
    endingSummary:
      "You stayed with conditions. Within ten days the conditions collapsed. Within three months you are not her boyfriend — you are her emotional bodyguard. You schedule your life around her dysregulation. You screen her calls with her mother. You have become the stabiliser for a nervous system that cannot be stabilised by another person. Her pattern has not changed. Yours has — you are quieter, smaller, more cautious. You have stopped initiating. You have stopped joking. The version of you she fell for on night one is the one you've killed to keep her calm. She will leave you, eventually, because the man she is with is no longer the man she could idealise.",
    failureBlogSlug: "love-bombing-signs-warning",
    failureBlogTitle: "Love-Bombing Signs Warning",
    dialog: [
      {
        speakerId: "inner-voice",
        text: "You cannot love someone out of a personality structure. Trying costs you the man you were before you met her.",
        emotion: "sad",
      },
    ],
  },

  {
    id: "ending-cruel-cut",
    backgroundId: "apartment",
    mood: "danger",
    isEnding: true,
    outcomeType: "bad",
    endingTitle: "The Quote She'll Replay For A Year",
    endingSummary:
      "You were not wrong that the relationship needed to end. You were wrong in the delivery. 'You need help, not a boyfriend' is the sentence she will repeat to every friend, therapist, and future partner for eighteen months. The hoover cycle gets rocket fuel from clean villainy. You will get the 2am texts, the holiday texts, the 'I was going to invite you to my wedding' texts. Worse — you will not be sure, in your own head, whether you were cruel or honest. The answer is both. Honesty is not an excuse for a delivery that gave her a story in which you are the monster. A harder, softer goodbye cost the same and bought you a cleaner conscience.",
    failureBlogSlug: "love-bombing-signs-warning",
    failureBlogTitle: "Love-Bombing Signs Warning",
    dialog: [
      {
        speakerId: "inner-voice",
        text: "Right decision, wrong delivery. Compassion at the exit is not weakness — it is a gift to the man you will be next year.",
        emotion: "sad",
      },
    ],
  },

  {
    id: "ending-messy-exit",
    backgroundId: "apartment",
    mood: "tense",
    isEnding: true,
    outcomeType: "neutral",
    endingTitle: "The Exit That Stuck To You",
    endingSummary:
      "You tried to have the talk in the idealisation phase and detonated her. It ends — messily, with two weeks of hoovering, a scare you will not forget, and a friendship that was adjacent to yours quietly dropping you because her version of events reached them first. You got out. But she is still in your head — not because you loved her, but because the last image in your nervous system is her in distress with your name in her mouth. The path forward is the same as the clean exit: grieve the dopamine, not the person. Rebuild the life she ate. Watch, in three months, how different the secure woman feels — and do not flinch from the feeling.",
    failureBlogSlug: "butterflies-are-warning-not-romance",
    failureBlogTitle: "Butterflies Are Warning Not Romance",
    dialog: [
      {
        speakerId: "inner-voice",
        text: "You were right about the problem. You were wrong about the pace of the solution. The talk was the detonator — silence and distance are the tools with this pattern.",
        emotion: "sad",
      },
    ],
  },

  {
    id: "ending-messy-ghost",
    backgroundId: "apartment",
    mood: "danger",
    isEnding: true,
    outcomeType: "bad",
    endingTitle: "Ghost That Didn't Stay Gone",
    endingSummary:
      "You went silent. She did not. For the next nine months she is in your orbit — your DMs, your ex's DMs, your office lobby twice, a mutual friend's party where she cries. You did not leave the relationship; you abandoned it from inside, which is a door she will walk through for a year. You will tell yourself you 'handled it' while continuing to flinch at every unknown number. The lesson: with a dysregulated partner, ending it requires a spoken, specific, final conversation — not absence. Absence is the oxygen her nervous system runs on.",
    failureBlogSlug: "love-bombing-signs-warning",
    failureBlogTitle: "Love-Bombing Signs Warning",
    dialog: [
      {
        speakerId: "inner-voice",
        text: "Silence is not an ending — it is an unanswered question that she will answer herself, in the world, for as long as it takes.",
        emotion: "sad",
      },
    ],
  },
];

export const datingMission2: Scenario = {
  id: "d2-exciting-one",
  title: "The Exciting One",
  tagline: "Red flags that feel like green flags. The body lies under intermittent reinforcement.",
  description:
    "Thirteen days in with Liv. The sex is volcanic. She's said 'I've never felt this' twice. This morning she sent forty-seven texts. Tonight she's at your door uninvited with wine and silk. Your body is deafening — and your trained eye has already made a quiet list: a devaluation switch on a waiter, no female friends, an ex 'obsessed with her', text escalation that reads as jealousy-testing by noon. This is the scenario that destroys more men's lives than bad careers combined — not the obvious gold-digger, the EXCITING woman. Learn to feel the pull AND not act on it. The hardest discipline in the simulator.",
  tier: "premium",
  track: "male-dating",
  level: 2,
  order: 1,
  estimatedMinutes: 10,
  difficulty: "intermediate",
  category: "dating",
  xpReward: 200,
  badgeId: "pattern-recognition",
  startSceneId: "week-two",
  tacticsLearned: [
    "Distinguishing arousal from compatibility",
    "Reading BPD/HPD markers inside the first three weeks",
    "The two-week test — holding a normal cadence without escalating or ghosting",
    "Ending a cluster-B relationship with compassion but no door",
    "Recognising intermittent reinforcement as a nervous-system trap, not chemistry",
  ],
  redFlagsTaught: [
    "Love-bombing: 'I've never felt this' inside two weeks",
    "Idealisation/devaluation on strangers (the waiter switch)",
    "No close female friends + 'women are jealous of me'",
    "Repeated unprompted mentions of an 'obsessed' ex (transference flag)",
    "Text escalation as jealousy-testing within a single day",
    "Devaluation line pre-loaded into the idealisation phase",
    "Showing up uninvited dressed as romance, functioning as boundary-testing",
  ],
  characters: [LIV, COLE, INNER_VOICE_M],
  scenes,
};

export default datingMission2;
