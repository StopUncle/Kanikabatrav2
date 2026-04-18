/**
 * Dating Line — Mission 3 "The Gaslighter"
 *
 * Teaches: gaslighting, DARVO (Deny, Attack, Reverse Victim and Offender),
 * reality inversion, historical revisionism. The single skill that
 * neutralises it: calm labeling mid-conversation. Pre-emptive
 * documentation. The cost of "winning" the argument vs. winning your
 * reality back.
 *
 * Why it matters: most manipulation works because the target can't
 * name the pattern while it's happening. The moment you label DARVO
 * out loud — flat, unemotional, specific — it loses 80% of its power.
 * Men especially are conditioned to assume their own perception is
 * right and to be destabilised when a calm woman is certain it isn't.
 * Calm certainty is the weapon. The counter is named pattern.
 *
 * Failure routes → "Ghostlighting: When They Ghost Then Gaslight"
 */

import type { Scenario, Scene } from "../../types";
import { SCARLETT, COLE, INNER_VOICE_M } from "../../characters-male";

const scenes: Scene[] = [
  // ---------------------------------------------------------------------
  // PART 1 — the opening argument
  // ---------------------------------------------------------------------
  {
    id: "sunday-morning",
    backgroundId: "apartment",
    mood: "tense",
    presentCharacterIds: ["scarlett"],
    dialog: [
      {
        speakerId: null,
        text: "Sunday, 10:14am. Three months in. You made her coffee and brought it to the couch. She takes it without looking at you.",
      },
      {
        speakerId: "scarlett",
        text: '"I want to talk about last night."',
        emotion: "cold",
      },
      {
        speakerId: null,
        text: "You were home at 11:20. You'd said 11. You apologised for the twenty minutes when you walked in. She was still out herself — got home at 12:40 — but that's apparently not the thread she wants to pull.",
      },
      {
        speakerId: "scarlett",
        text: "\"You told me 9:30. I asked you twice. I remember it clearly — I even moved dinner with Maya because you said 9:30.\"",
        emotion: "cold",
      },
      {
        speakerId: "inner-voice",
        text: "You said 11. You are sure you said 11. The text is in your phone. But she's calm and she's certain and there is a one-second flicker in your chest that wonders if you're misremembering. That flicker is the entire game.",
        emotion: "serious",
      },
    ],
    choices: [
      {
        id: "open-the-text",
        text: "Stay calm. Open the text thread. Read the original message out loud.",
        tactic: "Evidence first. Don't argue memory against memory — she'll always be more certain than you.",
        nextSceneId: "the-text",
        isOptimal: true,
      },
      {
        id: "defend-memory",
        text: '"No, I definitely said 11. I remember saying it."',
        tactic: "Defending your memory against her certainty is how you lose. You need data, not conviction.",
        nextSceneId: "memory-war",
      },
      {
        id: "preempt-apology",
        text: '"If I said 9:30, I\'m really sorry — I must have got confused."',
        tactic: "Pre-apologising for something you didn't do. The pattern learns you'll fold on facts to keep peace.",
        nextSceneId: "fold-early",
      },
    ],
  },

  // ---------------------------------------------------------------------
  // PART 2 — the evidence reveals itself
  // ---------------------------------------------------------------------
  {
    id: "the-text",
    backgroundId: "apartment",
    mood: "tense",
    presentCharacterIds: ["scarlett"],
    dialog: [
      {
        speakerId: null,
        text: "You scroll back. 9:47am yesterday. Your message, in blue, exactly as you sent it: 'home by 11 tonight'.",
      },
      {
        speakerId: null,
        text: "You turn the phone to her. You don't say anything. You let the screen speak.",
      },
      {
        speakerId: "scarlett",
        text: "She looks at the phone for five full seconds. Her face doesn't change.",
        emotion: "cold",
      },
      {
        speakerId: "inner-voice",
        text: "This is the moment. A normal person says 'Oh — I misremembered, I'm sorry.' Watch what she does instead. The next sentence is the whole diagnosis.",
        emotion: "knowing",
      },
    ],
    nextSceneId: "darvo-in-real-time",
  },

  // ---------------------------------------------------------------------
  // PART 3 — DARVO live
  // ---------------------------------------------------------------------
  {
    id: "darvo-in-real-time",
    backgroundId: "apartment",
    mood: "danger",
    presentCharacterIds: ["scarlett"],
    immersionTrigger: "manipulation-detected",
    dialog: [
      {
        speakerId: "scarlett",
        text: "\"That's what I meant. I thought you'd come home earlier, and I can see now you changed it to 11 at the last minute.\"",
        emotion: "cold",
      },
      {
        speakerId: "scarlett",
        text: "\"The point is you're the one who can't remember how our conversation went this morning. I asked twice and you said 9:30. You're making this about a text to avoid the actual issue.\"",
        emotion: "concerned",
      },
      {
        speakerId: "inner-voice",
        text: "DARVO. In real time. Deny: 'that's what I meant'. Attack: 'you're the one who can't remember'. Reverse Victim and Offender: she's now the wronged party you're evading. The text was the evidence. She just reframed the evidence as your failure.",
        emotion: "serious",
      },
      {
        speakerId: "inner-voice",
        text: "Three doors. You can keep arguing the facts — and lose even when you win, because she'll pivot to 'why are you always so hostile'. You can apologise to end it — and teach the pattern it works. Or you can name the pattern out loud. The third one is the only one that saves you.",
        emotion: "knowing",
      },
    ],
    choices: [
      {
        id: "name-the-pattern",
        text: '"Scarlett, I want to name what just happened." Calm. Flat. No heat.',
        tactic: "Calm labeling. You describe the move in real time — not accusing, just naming. This is the single skill that neutralises gaslighting.",
        nextSceneId: "calm-labeling",
        isOptimal: true,
      },
      {
        id: "argue-facts",
        text: '"The text literally says 11. You can read it. I don\'t know what else to tell you."',
        tactic: "Litigating the facts. She'll pivot to your tone — and the pivot works because you didn't see it coming.",
        nextSceneId: "facts-pivot",
      },
      {
        id: "apologise-to-end",
        text: '"You know what, I don\'t want to fight on a Sunday. I\'m sorry. Let\'s move on."',
        tactic: "Peace-keeping apology. The pattern just got positive reinforcement. Inside six months you'll be apologising for things you didn't do on a schedule.",
        nextSceneId: "fold-now",
      },
      {
        id: "walk-away",
        text: "Put the phone down. Get your jacket. Walk out without speaking.",
        tactic: "Silent exit leaves the narrative open — and she writes it first, to everyone. You become the 'unstable' ex in her social network.",
        nextSceneId: "silent-exit",
      },
      {
        id: "start-documenting",
        text: "Say nothing. Quietly open your notes app under the table and start logging the exchange.",
        tactic: "Documentation is good — but silent documentation without naming the pattern means you're building a case to leave, not a chance to stay. Useful, insufficient.",
        nextSceneId: "silent-documentation",
      },
    ],
  },

  // ---------------------------------------------------------------------
  // PART 4 — the optimal path: calm labeling
  // ---------------------------------------------------------------------
  {
    id: "calm-labeling",
    backgroundId: "apartment",
    mood: "cold",
    presentCharacterIds: ["scarlett"],
    dialog: [
      {
        speakerId: null,
        text: "You sit back. Voice even. No rise in it. You are not defending — you are describing.",
      },
      {
        speakerId: null,
        text: "\"You claimed I said a time I didn't say. I showed you the text. You then said that's what you meant, and that the real issue is that I can't remember the conversation. That's a specific pattern. It has a name. I'm not trying to win the argument about Saturday — I'm acknowledging the pattern.\"",
      },
      {
        speakerId: "inner-voice",
        text: "You just did the one thing they can't work around: you described the move out loud while it was still warm. Gaslighting runs on the target not having language. The moment you have language, the move is visible — and the visible move can't be landed the same way again.",
        emotion: "knowing",
      },
      {
        speakerId: "scarlett",
        text: '"I can\'t believe you\'re psychoanalysing me right now. I\'m not a case study. This is how you talk to someone you love?"',
        emotion: "sad",
      },
      {
        speakerId: null,
        text: "Her eyes fill. The tears are real in the sense that they arrive — but the timing is surgical. They arrive exactly at the point where most men fold.",
      },
      {
        speakerId: "inner-voice",
        text: "Weaponised tears. Not fake — but deployed. The cry is a feature of the system. Ninety per cent of men comfort her here, apologise for 'going too far', and the pattern is back in charge inside two minutes. You do not comfort. You do not retract. You repeat, quieter.",
        emotion: "serious",
      },
    ],
    choices: [
      {
        id: "hold-the-line",
        text: '"I\'m not psychoanalysing you. I\'m naming a specific thing I saw you do. I\'m not willing to not name it."',
        tactic: "Hold the label. The tears are real; the pattern is also real; both things are allowed to be true.",
        nextSceneId: "the-break",
        isOptimal: true,
      },
      {
        id: "comfort-her",
        text: 'Soften. Put a hand on her knee. "Hey. I didn\'t mean it like that."',
        tactic: "You just rewarded the tears. The pattern files it: tears reset the conversation. You'll see them again next week.",
        nextSceneId: "fold-now",
      },
      {
        id: "escalate-heat",
        text: '"Oh, of course. The second I name it, you cry. That\'s textbook."',
        tactic: "True, but contemptuous. You just handed her 'you're the one being cruel' — and that frame is the one she wins.",
        nextSceneId: "facts-pivot",
      },
    ],
  },

  // ---------------------------------------------------------------------
  // PART 5 — the break
  // ---------------------------------------------------------------------
  {
    id: "the-break",
    backgroundId: "apartment",
    mood: "cold",
    presentCharacterIds: ["scarlett"],
    dialog: [
      {
        speakerId: null,
        text: "Silence for eleven seconds. You count them. She wipes her eyes once. Her face resets — composure first, then something colder behind it.",
      },
      {
        speakerId: "scarlett",
        text: '"Fine. Maybe I misremembered the time. But you\'re being really clinical about this and it\'s scary. This isn\'t the person I thought you were."',
        emotion: "cold",
      },
      {
        speakerId: "inner-voice",
        text: "Partial concession plus a new frame: you're 'scary' now. A softer DARVO. But the first concession — 'maybe I misremembered' — is the first one in three months. The label worked. She just doesn't know what to do with the new version of you yet.",
        emotion: "knowing",
      },
      {
        speakerId: null,
        text: "You don't argue 'scary'. You don't apologise for being calm. You note it, internally, and let it sit.",
      },
    ],
    nextSceneId: "cole-confirms",
  },

  // ---------------------------------------------------------------------
  // PART 6 — the outside view
  // ---------------------------------------------------------------------
  {
    id: "cole-confirms",
    backgroundId: "bar",
    mood: "tense",
    presentCharacterIds: ["cole"],
    dialog: [
      {
        speakerId: null,
        text: "Tuesday. 7pm. Cole across from you with a beer he's barely touched. You've told him about Saturday and Sunday — the text, the reframe, the tears, the 'scary'.",
      },
      {
        speakerId: "cole",
        text: '"Man. You know she did this to Will."',
        emotion: "knowing",
      },
      {
        speakerId: "cole",
        text: '"I heard it from Jamie last month and didn\'t want to say anything because you were happy. The crying thing — Jamie said Will called it \'the shut-it-down cry\'. Same pattern. Word for word."',
        emotion: "knowing",
      },
      {
        speakerId: "inner-voice",
        text: "Historical revisionism is never a one-off. If she did it to Will — same move, same register — this is a stable behaviour, not a bad Sunday. You now have external corroboration. Start the documentation trail formally, not in a shaky notes app — timestamped, in a separate account, with texts screenshotted.",
        emotion: "serious",
      },
    ],
    choices: [
      {
        id: "document-and-observe",
        text: "Thank Cole. Go home. Start the documentation trail — timestamped, backed up, offsite. Observe for three more weeks before deciding.",
        tactic: "Observation plus evidence. You named the pattern once and it worked partially. Now you need data, not a verdict yet.",
        nextSceneId: "ending-reality-reclaimed",
        isOptimal: true,
      },
      {
        id: "confront-tonight",
        text: "Drive home and tell her what Cole said — cite Will, cite Jamie, end it tonight.",
        tactic: "You just handed her a specific accusation to disprove and two named sources to isolate. She'll work on both. Use the intelligence; don't spend it.",
        nextSceneId: "ending-burned-intel",
      },
      {
        id: "dismiss-cole",
        text: '"Cole, I appreciate it, but that\'s hearsay. She\'s different with me."',
        tactic: "'She's different with me' is the last sentence every man says before he spends three more years learning otherwise.",
        nextSceneId: "ending-different-with-me",
      },
    ],
  },

  // ---------------------------------------------------------------------
  // PART 7 — bad branches
  // ---------------------------------------------------------------------
  {
    id: "memory-war",
    backgroundId: "apartment",
    mood: "tense",
    presentCharacterIds: ["scarlett"],
    dialog: [
      {
        speakerId: "scarlett",
        text: "\"I remember clearly. I'm not arguing with you about what I heard with my own ears. You're making me feel like I'm the crazy one right now.\"",
        emotion: "cold",
      },
      {
        speakerId: "inner-voice",
        text: "You entered a memory war. Her certainty is infinite; yours is a normal human 95%. She will always seem more sure than you. That's the mechanism — calm certainty beats uncertain truth in a two-person room with no evidence. Open the phone. Always open the phone.",
        emotion: "sad",
      },
    ],
    nextSceneId: "the-text",
  },

  {
    id: "fold-early",
    backgroundId: "apartment",
    mood: "cold",
    presentCharacterIds: ["scarlett"],
    dialog: [
      {
        speakerId: "scarlett",
        text: '"Thank you. That\'s all I needed. I don\'t want to fight, I just needed you to hear me."',
        emotion: "concerned",
      },
      {
        speakerId: "inner-voice",
        text: "You apologised for a thing you didn't do. She didn't even need to produce evidence — she just needed the confidence to make the claim. The pattern just learned: he folds on facts to keep the peace. Every week from here, the reality being rewritten gets slightly more consequential.",
        emotion: "sad",
      },
    ],
    nextSceneId: "ending-six-months-broken",
  },

  {
    id: "facts-pivot",
    backgroundId: "apartment",
    mood: "danger",
    presentCharacterIds: ["scarlett"],
    dialog: [
      {
        speakerId: "scarlett",
        text: "\"Why are you being so hostile? I'm trying to talk about how I feel and you're throwing evidence at me like I'm on trial. This is who you are now?\"",
        emotion: "angry",
      },
      {
        speakerId: "inner-voice",
        text: "The pivot. You 'won' the facts. She moved the floor under you to tone. Every reply from here either concedes on tone — which is a soft concession on facts — or escalates, at which point you're the aggressor in her telling. The only exit was the one you didn't take: naming the move when you had the chance.",
        emotion: "sad",
      },
    ],
    nextSceneId: "ending-three-year-war",
  },

  {
    id: "fold-now",
    backgroundId: "apartment",
    mood: "cold",
    presentCharacterIds: ["scarlett"],
    dialog: [
      {
        speakerId: "scarlett",
        text: '"Thank you. I just want us to be okay."',
        emotion: "sad",
      },
      {
        speakerId: "inner-voice",
        text: "You folded. The tears did the job they were deployed to do. Inside six months you'll be checking your own texts to see if you said what you remember saying. Inside a year, you won't trust your memory on anything that matters.",
        emotion: "sad",
      },
    ],
    nextSceneId: "ending-six-months-broken",
  },

  {
    id: "silent-exit",
    backgroundId: "apartment",
    mood: "cold",
    dialog: [
      {
        speakerId: null,
        text: "You walk out. Don't come back for three days. When you do, she's already told four mutual friends you 'had a breakdown' and left her crying on the couch over nothing.",
      },
      {
        speakerId: "inner-voice",
        text: "Silent exit is narrative surrender. You didn't say what happened, so she did. In any contested story, whoever tells it first — calmly, to a big enough audience — wins the frame. You left your reality on the table and she took it with her.",
        emotion: "sad",
      },
    ],
    nextSceneId: "ending-narrative-lost",
  },

  {
    id: "silent-documentation",
    backgroundId: "apartment",
    mood: "tense",
    presentCharacterIds: ["scarlett"],
    dialog: [
      {
        speakerId: null,
        text: "You say nothing. You open the notes app. You type quietly while she waits for your answer. She notices.",
      },
      {
        speakerId: "scarlett",
        text: '"Are you writing about me right now? Seriously?"',
        emotion: "angry",
      },
      {
        speakerId: "inner-voice",
        text: "Documentation without labeling is a case file for leaving — not a chance to stay and see what she does when named. You skipped the diagnostic step. You'll leave with evidence and no skill learned. Next time, same pattern, different woman — you'll still be the one who doesn't know how to neutralise it live.",
        emotion: "serious",
      },
    ],
    nextSceneId: "ending-clean-but-unlearned",
  },

  // ---------------------------------------------------------------------
  // ENDINGS
  // ---------------------------------------------------------------------
  {
    id: "ending-reality-reclaimed",
    backgroundId: "apartment",
    mood: "peaceful",
    immersionTrigger: "victory",
    isEnding: true,
    outcomeType: "good",
    endingTitle: "You Named It",
    endingSummary:
      "You labeled DARVO in real time and held the line through weaponised tears. Over the next three weeks you documented three more smaller incidents — each one she attempted, each one you named flat and quiet. Two of them she disarmed. The third she escalated on, and you left with your reality, your friends, and a clean narrative you told first. Whichever path the relationship takes from here, you learned the single skill that protects every relationship you'll ever have after this one: you can name a pattern inside the room it's happening in. Most men never learn this. You did, at 26.",
    dialog: [
      {
        speakerId: "inner-voice",
        text: "Gaslighting dies in the sunlight of a named pattern. Calm, specific, unapologetic — and repeated the second time they try.",
        emotion: "knowing",
      },
    ],
  },

  {
    id: "ending-burned-intel",
    backgroundId: "apartment",
    mood: "tense",
    isEnding: true,
    outcomeType: "bad",
    endingTitle: "You Spent the Intelligence",
    endingSummary:
      "You confronted her with Will and Jamie by name. She cried, denied, and then — within 48 hours — contacted Jamie with a careful, tearful version of events that recast Will as abusive and you as paranoid. Jamie half-believed it. Your external corroboration is now contaminated. You left the relationship two months later, but the social narrative around you is tangled for a year. Intelligence is valuable because it's unspent. You spent it on one argument you were going to win anyway.",
    failureBlogSlug: "ghostlighting-when-they-ghost-then-gaslight",
    failureBlogTitle: "Ghostlighting: When They Ghost Then Gaslight",
    dialog: [
      {
        speakerId: "inner-voice",
        text: "Evidence you cite is evidence you burn. The move was to keep it, watch for more, and leave with the file intact.",
        emotion: "sad",
      },
    ],
  },

  {
    id: "ending-different-with-me",
    backgroundId: "apartment",
    mood: "tense",
    isEnding: true,
    outcomeType: "bad",
    endingTitle: "She's Different With Me",
    endingSummary:
      "You dismissed Cole's account. Two years later, you've said the same sentence to a new friend about the fourth incident this month. You don't remember who suggested what restaurant, who said what about your mother, whether you were late or early to the thing last Tuesday. You check your texts three times before replying to anything. A covert narcissist isn't 'different with you' — they're calibrated to you. The calibration is the intimacy you keep mistaking for love.",
    failureBlogSlug: "cluster-b-personality-disorders-overview",
    failureBlogTitle: "Cluster B Personality Disorders: Overview",
    dialog: [
      {
        speakerId: "inner-voice",
        text: "'She's different with me' is pattern denial dressed as love. Every man in her past said the same sentence in the same voice.",
        emotion: "sad",
      },
    ],
  },

  {
    id: "ending-six-months-broken",
    backgroundId: "apartment",
    mood: "tense",
    isEnding: true,
    outcomeType: "bad",
    endingTitle: "Six Months In, You're Checking Your Own Texts",
    endingSummary:
      "You apologised for things you didn't do. Each time the pattern ran, it got easier for her and harder for you. Six months in you screenshot your own messages before sending them, so you can prove what you said if it gets rewritten later. You've lost four kilos. Two friends have asked if you're okay. You can't remember whether last Thursday's fight was about dinner plans or about whether you've 'always been like this'. The cost of winning the argument-to-end-arguments was your trust in your own mind.",
    failureBlogSlug: "ghostlighting-when-they-ghost-then-gaslight",
    failureBlogTitle: "Ghostlighting: When They Ghost Then Gaslight",
    dialog: [
      {
        speakerId: "inner-voice",
        text: "Peace-keeping with a gaslighter is not peace. It's a slow transfer of your reality into her custody.",
        emotion: "sad",
      },
    ],
  },

  {
    id: "ending-three-year-war",
    backgroundId: "apartment",
    mood: "danger",
    isEnding: true,
    outcomeType: "bad",
    endingTitle: "The Three-Year War",
    endingSummary:
      "You won every argument on facts. You lost every argument on tone. Three years in, you've rehearsed the phrase 'I'm not being hostile, I'm just being clear' so many times it sounds hostile even to you. The relationship ends when you can no longer remember what you sound like when you're relaxed. Her friends still believe you were the unstable one. You were right about the text. Being right wasn't the skill you needed — naming the move was.",
    failureBlogSlug: "cluster-b-personality-disorders-overview",
    failureBlogTitle: "Cluster B Personality Disorders: Overview",
    dialog: [
      {
        speakerId: "inner-voice",
        text: "Being right on facts and wrong on frame is a losing three-year trade. Learn the frame skill, or don't bring facts to the table.",
        emotion: "sad",
      },
    ],
  },

  {
    id: "ending-narrative-lost",
    backgroundId: "apartment",
    mood: "tense",
    isEnding: true,
    outcomeType: "bad",
    endingTitle: "She Told It First",
    endingSummary:
      "You walked out. She wrote the first draft to everyone you share. By the time you speak to the same friends, you're defending yourself against specifics you didn't know were being levelled. You become 'the one who had the breakdown'. Two of your friendships don't recover. The break-up you wanted to make clean becomes the reputation you have to rebuild quietly over the next eighteen months. Silence is not neutrality in a contested story. Whoever speaks first, calmly, to the biggest audience, owns the frame.",
    failureBlogSlug: "ghostlighting-when-they-ghost-then-gaslight",
    failureBlogTitle: "Ghostlighting: When They Ghost Then Gaslight",
    dialog: [
      {
        speakerId: "inner-voice",
        text: "Silent exits lose the narrative war you didn't know you were in. Name the pattern before you leave, even if only to one trusted friend.",
        emotion: "sad",
      },
    ],
  },

  {
    id: "ending-clean-but-unlearned",
    backgroundId: "apartment",
    mood: "cold",
    isEnding: true,
    outcomeType: "neutral",
    endingTitle: "Out Clean, Skill Unlearned",
    endingSummary:
      "You built the file quietly and left a month later with evidence, dignity, and no shouting match. Clean exit — better than most. But you never tested the one skill that would have saved the next relationship: naming the pattern inside the room. In eleven months you meet someone similar, subtler, and you find yourself in the same test. You'll have to take it again without the practice. The file kept you safe. The lesson didn't land.",
    dialog: [
      {
        speakerId: "inner-voice",
        text: "Leaving cleanly without the skill is a one-time save. The skill is a lifetime shield. Next time, name it out loud.",
        emotion: "serious",
      },
    ],
  },
];

export const datingMission3: Scenario = {
  id: "d3-gaslighter",
  title: "The Gaslighter",
  tagline:
    "She's certain. You're sure. Only one of you can be right — and she's counting on your doubt.",
  description:
    "Three months in. A text message says 11pm. She is calmly, absolutely certain you said 9:30. You'll watch DARVO run live in your living room: the evidence reframed as your failure, the tears deployed exactly where most men fold, the 'scary' label swapped in the moment calm logic starts to work. The skill this scenario teaches is the one most men never learn: how to name the pattern out loud, mid-conversation, without heat. Named patterns can't be relanded the same way. Unnamed ones become the atmosphere you live in for three years.",
  tier: "premium",
  track: "male-dating",
  level: 3,
  order: 1,
  estimatedMinutes: 9,
  difficulty: "intermediate",
  category: "gaslighter",
  xpReward: 200,
  badgeId: "pattern-named",
  startSceneId: "sunday-morning",
  tacticsLearned: [
    "Calm labeling: naming DARVO in real time without heat",
    "Evidence-first — open the text before arguing memory",
    "Holding the line through weaponised tears",
    "Documentation trail: timestamped, offsite, backed up",
    "Telling the narrative first to trusted people before a silent exit",
  ],
  redFlagsTaught: [
    "DARVO: Deny, Attack, Reverse Victim and Offender",
    "Reality inversion — reframing evidence as the target's failure",
    "Historical revisionism — calm certainty about events that didn't happen",
    "Weaponised tears timed precisely where most men fold",
    "The tone pivot — 'why are you so hostile' after losing on facts",
    "The 'scary / clinical' reframe when named calmly",
  ],
  characters: [SCARLETT, COLE, INNER_VOICE_M],
  scenes,
};

export default datingMission3;
