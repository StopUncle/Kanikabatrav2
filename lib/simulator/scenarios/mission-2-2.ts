/**
 * Mission 2-2 — "The Proxy"
 *
 * Level 2, order 2. Teaches triangulation via a narcissist's proxy.
 * Dana is back — this time on a targeted approach, with a specific
 * information goal. She's doing a job for Maris.
 */

import type { Scenario, Scene } from "../types";
import { DANA, PRIYA, INNER_VOICE } from "../characters";

const scenes: Scene[] = [
  {
    id: "library-bump",
    backgroundId: "common-room",
    mood: "tense",
    presentCharacterIds: ["dana"],
    dialog: [
      {
        speakerId: null,
        text: "Common room. Thursday afternoon. You're reading. Dana materializes in the chair across from you. Uninvited but smiling.",
      },
      {
        speakerId: "dana",
        text: '"Hi! Sorry to interrupt. Are you okay?"',
        emotion: "happy",
      },
      {
        speakerId: "inner-voice",
        text: "'Are you okay' is not a greeting. It's a lead question.",
        emotion: "knowing",
      },
    ],
    choices: [
      {
        id: "reassure-her",
        text: "\"Yeah, I'm fine, why?\"",
        tactic: "She just got you to ask. Now she'll answer — with bait.",
        nextSceneId: "dana-drops-bait",
      },
      {
        id: "flat-yes",
        text: "\"Fine.\" Return to your book.",
        tactic: "One word. No hook.",
        nextSceneId: "dana-persists",
        isOptimal: true,
      },
      {
        id: "mirror-concern",
        text: "\"Are YOU okay?\"",
        tactic: "Flipping it back. She'll have to explain herself.",
        nextSceneId: "dana-slips",
        isOptimal: true,
      },
      {
        id: "confused",
        text: "\"Uhh... why are you asking?\"",
        tactic: "You just asked her for the bait.",
        nextSceneId: "dana-drops-bait",
      },
    ],
  },

  {
    id: "dana-drops-bait",
    backgroundId: "common-room",
    mood: "danger",
    immersionTrigger: "manipulation-detected",
    presentCharacterIds: ["dana"],
    dialog: [
      {
        speakerId: "dana",
        text: '"Okay, don\'t freak out, but Maris has been saying some... interesting things about you."',
        emotion: "concerned",
      },
      {
        speakerId: "dana",
        text: '"I thought you should hear it from a friend."',
        emotion: "pleading",
      },
      {
        speakerId: "inner-voice",
        text: "Triangulation attempt. 'Heard it from a friend' is how they get you to ask what was said.",
        emotion: "knowing",
      },
    ],
    choices: [
      {
        id: "demand-what",
        text: "\"What did she say?\"",
        tactic: "Took the bait. Now you're on her hook and she's the authority on Maris's opinion of you.",
        nextSceneId: "dana-gives-fake-quote",
        isOptimal: false,
      },
      {
        id: "skeptical",
        text: "\"Cool. Thanks for the PSA.\" Go back to reading.",
        tactic: "Refuse the hook. She didn't come here to be dismissed — she'll escalate or leave.",
        nextSceneId: "dana-escalates",
        isOptimal: true,
      },
      {
        id: "call-it-out",
        text: "\"Did Maris send you?\"",
        tactic: "Direct naming. Covert ops don't survive being named.",
        nextSceneId: "dana-denies",
        isOptimal: true,
      },
      {
        id: "concern-back",
        text: "\"That sounds stressful for you to carry. I'm good, though.\"",
        tactic: "Reframe her as the one with the problem. Elegant.",
        nextSceneId: "dana-retreats",
        isOptimal: true,
      },
    ],
  },

  {
    id: "dana-persists",
    backgroundId: "common-room",
    mood: "tense",
    presentCharacterIds: ["dana"],
    dialog: [
      {
        speakerId: "dana",
        text: '"Oh, okay. I just heard some stuff and I was worried about you."',
        emotion: "concerned",
      },
      {
        speakerId: "inner-voice",
        text: "Same bait, gentler wrapping. Still bait.",
        emotion: "knowing",
      },
    ],
    choices: [
      {
        id: "bite",
        text: "\"What stuff?\"",
        tactic: "She won.",
        nextSceneId: "dana-gives-fake-quote",
        isOptimal: false,
      },
      {
        id: "thank-and-dismiss",
        text: "\"Appreciated. I'm good.\"",
        tactic: "Polite but sealed. She has nowhere to go.",
        nextSceneId: "dana-retreats",
        isOptimal: true,
      },
      {
        id: "meta",
        text: "\"You say that every time you want to tell me something.\"",
        tactic: "Call the pattern. She'll flinch.",
        nextSceneId: "dana-exposed",
        isOptimal: true,
      },
    ],
  },

  {
    id: "dana-slips",
    backgroundId: "common-room",
    mood: "tense",
    presentCharacterIds: ["dana"],
    dialog: [
      {
        speakerId: "dana",
        text: '"Oh! I\'m fine. I just — I mean I was talking to someone, and your name came up, and..."',
        emotion: "concerned",
      },
      {
        speakerId: null,
        text: "She's stalling. Usually she's smoother than this.",
      },
      {
        speakerId: "inner-voice",
        text: "She came prepared to deliver. Not to be questioned.",
        emotion: "knowing",
      },
    ],
    choices: [
      {
        id: "let-her-find-words",
        text: "Wait. Don't help her finish the sentence.",
        tactic: "Silence forces her to reveal more than she meant to.",
        nextSceneId: "dana-over-explains",
        isOptimal: true,
      },
      {
        id: "rescue-her",
        text: "\"It's fine, tell me what came up.\"",
        tactic: "You just rescued her from her own mistake. Worst instinct.",
        nextSceneId: "dana-gives-fake-quote",
        isOptimal: false,
      },
      {
        id: "exit",
        text: "\"Sounds like you should finish that thought with someone else.\" Stand up.",
        tactic: "Leave before the operation completes.",
        nextSceneId: "ending-exit-clean",
        isOptimal: true,
      },
    ],
  },

  {
    id: "dana-over-explains",
    backgroundId: "common-room",
    mood: "tense",
    presentCharacterIds: ["dana"],
    dialog: [
      {
        speakerId: "dana",
        text: '"Um, Maris mentioned you at brunch. Like in passing. It was probably nothing."',
        emotion: "concerned",
      },
      {
        speakerId: "dana",
        text: '"She just wondered if you were maybe talking to certain people lately."',
        emotion: "pleading",
      },
      {
        speakerId: "inner-voice",
        text: "There it is. The real question. Maris wants a map of your alliances.",
        emotion: "concerned",
      },
    ],
    choices: [
      {
        id: "name-alliances",
        text: "\"Tell her I'm not talking to anyone in particular.\"",
        tactic: "You just volunteered information about your network through her.",
        nextSceneId: "ending-map-leaked",
        isOptimal: false,
      },
      {
        id: "refuse-message",
        text: "\"If Maris wants to know, Maris can ask me.\"",
        tactic: "Kill the proxy channel. She's forced to deliver only 'they said ask you yourself.'",
        nextSceneId: "ending-channel-closed",
        isOptimal: true,
      },
      {
        id: "send-false-signal",
        text: "\"Tell her I've been hanging out with Priya a lot.\"",
        tactic: "Gave Maris exactly the intel she wanted. Costs Priya too.",
        nextSceneId: "ending-ally-burned",
        isOptimal: false,
      },
      {
        id: "ask-what-else",
        text: "\"What else did she say?\"",
        tactic: "Chasing. The more you ask, the more fake quotes she'll invent.",
        nextSceneId: "dana-gives-fake-quote",
      },
    ],
  },

  {
    id: "dana-gives-fake-quote",
    backgroundId: "common-room",
    mood: "danger",
    presentCharacterIds: ["dana"],
    dialog: [
      {
        speakerId: "dana",
        text: '"Okay well... she said you\'ve been kind of \'performing\' lately. Like trying too hard to be mysterious?"',
        emotion: "sad",
      },
      {
        speakerId: "inner-voice",
        text: "Probably half-invented. Designed to sting. Designed to make you defend yourself.",
        emotion: "concerned",
      },
    ],
    choices: [
      {
        id: "defend",
        text: "\"That's not fair. I'm not performing anything.\"",
        tactic: "Defending against a rumor makes the rumor real.",
        nextSceneId: "ending-baited-defense",
        isOptimal: false,
      },
      {
        id: "agree-ironically",
        text: "\"Sure. Mysterious is a good look.\"",
        tactic: "Robs the comment of its sting. She has nothing to bring back.",
        nextSceneId: "ending-deflected-gracefully",
        isOptimal: true,
      },
      {
        id: "test-the-source",
        text: "\"Did she say it exactly like that?\"",
        tactic: "Force her to admit she paraphrased. Shrinks the quote.",
        nextSceneId: "ending-source-exposed",
        isOptimal: true,
      },
    ],
  },

  {
    id: "dana-denies",
    backgroundId: "common-room",
    mood: "tense",
    presentCharacterIds: ["dana"],
    dialog: [
      {
        speakerId: "dana",
        text: '"WHAT? No, of course not. Why would you even ask that?"',
        emotion: "confused",
      },
      {
        speakerId: null,
        text: "The overreaction is the confirmation.",
      },
    ],
    nextSceneId: "ending-channel-closed",
  },

  {
    id: "dana-exposed",
    backgroundId: "common-room",
    mood: "danger",
    presentCharacterIds: ["dana"],
    dialog: [
      {
        speakerId: "dana",
        text: '"Wow. That\'s really hurtful. I was just trying to be nice."',
        emotion: "sad",
      },
      {
        speakerId: null,
        text: "She packs up and leaves. You just cost her a run.",
      },
    ],
    nextSceneId: "ending-channel-closed",
  },

  {
    id: "dana-escalates",
    backgroundId: "common-room",
    mood: "tense",
    presentCharacterIds: ["dana"],
    dialog: [
      {
        speakerId: "dana",
        text: '"Wait, really? You don\'t even want to know what she\'s saying about you?"',
        emotion: "confused",
      },
      {
        speakerId: "inner-voice",
        text: "She'll keep dangling it. Yours is to keep not reaching.",
        emotion: "knowing",
      },
    ],
    choices: [
      {
        id: "repeat",
        text: "\"I'm good.\"",
        tactic: "Broken-record move. Works.",
        nextSceneId: "ending-channel-closed",
        isOptimal: true,
      },
      {
        id: "finally-bite",
        text: "\"Okay fine, what?\"",
        tactic: "You held for thirty seconds and gave in. She already won.",
        nextSceneId: "dana-gives-fake-quote",
      },
      {
        id: "deadpan",
        text: "\"Nope.\" Go back to your book.",
        tactic: "One syllable. Zero handle. She has nothing to pull on.",
        nextSceneId: "ending-channel-closed",
        isOptimal: true,
      },
      {
        id: "smile-and-leave",
        text: "Smile politely. Stand up. Walk out.",
        tactic: "Leaving mid-offer tells her the dangle is boring. Nothing hurts a covert op like being uninteresting.",
        nextSceneId: "ending-exit-clean",
        isOptimal: true,
      },
    ],
  },

  {
    id: "dana-retreats",
    backgroundId: "common-room",
    mood: "peaceful",
    presentCharacterIds: ["dana"],
    dialog: [
      {
        speakerId: "dana",
        text: '"Well. If you change your mind, you know where to find me."',
        emotion: "neutral",
      },
      {
        speakerId: null,
        text: "She stands up. Less smoothly than she arrived.",
      },
      {
        speakerId: "inner-voice",
        text: "She didn't extract anything. She'll be back with a better opener.",
        emotion: "knowing",
      },
    ],
    nextSceneId: "priya-debrief",
  },

  {
    id: "priya-debrief",
    backgroundId: "apartment",
    mood: "peaceful",
    presentCharacterIds: ["priya"],
    dialog: [
      {
        speakerId: "priya",
        text: '"Dana ran the triangulation play."',
        emotion: "knowing",
      },
      {
        speakerId: "priya",
        text: '"Whatever Maris wanted to know, she knows less now than she did this morning. That\'s a loss for her."',
        emotion: "knowing",
      },
      {
        speakerId: "priya",
        text: '"Bonus: Dana reports back with \'nothing\' — and Maris starts wondering if Dana is actually useful."',
        emotion: "smirking",
      },
    ],
    nextSceneId: "ending-proxy-neutralized",
  },

  // ---------------------------------------------------------------------
  // ENDINGS
  // ---------------------------------------------------------------------

  {
    id: "ending-proxy-neutralized",
    backgroundId: "apartment",
    isEnding: true,
    outcomeType: "good",
    endingTitle: "The Proxy Was Wasted",
    endingSummary:
      "Dana arrived with a mission. She leaves without a single usable sentence. Maris now has two problems: you didn't crack, and her proxy came back empty. Proxies that return empty get replaced — you may have just broken Maris's delivery system.",
    dialog: [
      {
        speakerId: "inner-voice",
        text: "Intelligence operations have budgets. Make them unprofitable.",
        emotion: "knowing",
      },
    ],
  },

  {
    id: "ending-channel-closed",
    backgroundId: "common-room",
    isEnding: true,
    outcomeType: "good",
    endingTitle: "Channel Closed",
    endingSummary:
      "You made it explicit — if Maris wants something, she can come ask herself. Dana has no legitimate reason to run messages anymore. The triangulation attempt is over. Maris's next move has to be direct, which means she'll have to commit to it.",
    dialog: [
      {
        speakerId: "inner-voice",
        text: "Covert ops die when named.",
        emotion: "knowing",
      },
    ],
  },

  {
    id: "ending-source-exposed",
    backgroundId: "common-room",
    isEnding: true,
    outcomeType: "good",
    endingTitle: "Source Exposed",
    endingSummary:
      "You tested the quote. Dana had to admit it was paraphrased. What started as 'Maris said' ended as 'I got the vibe.' You didn't defend anything — and the attack shrank to nothing.",
    dialog: [
      {
        speakerId: "inner-voice",
        text: "Always ask for the exact words. Most of the time they don't exist.",
        emotion: "knowing",
      },
    ],
  },

  {
    id: "ending-exit-clean",
    backgroundId: "common-room",
    isEnding: true,
    outcomeType: "good",
    endingTitle: "Walk, Don't Run",
    endingSummary:
      "You left before she finished the setup. She can't report back what you said if you didn't say anything. Sometimes the exit is the answer.",
    dialog: [
      {
        speakerId: "inner-voice",
        text: "You don't owe anyone the conversation they showed up for.",
        emotion: "knowing",
      },
    ],
  },

  {
    id: "ending-deflected-gracefully",
    backgroundId: "common-room",
    isEnding: true,
    outcomeType: "good",
    endingTitle: "Turned It Into a Shrug",
    endingSummary:
      "She handed you an insult and you agreed with it, cheerfully. Whatever Dana brings back to Maris now sounds like 'they laughed.' That's not ammunition — that's the opposite.",
    dialog: [
      {
        speakerId: "inner-voice",
        text: "The only thing worse than an insult ignored is one adopted.",
        emotion: "knowing",
      },
    ],
  },

  {
    id: "ending-baited-defense",
    backgroundId: "common-room",
    mood: "danger",
    isEnding: true,
    outcomeType: "bad",
    failureBlogSlug: "narcissist-playbook-how-they-actually-operate",
    failureBlogTitle: "Narcissist Playbook: How They Actually Operate",
    endingTitle: "Defended Into the Frame",
    endingSummary:
      "'I'm not performing anything' is now a quote. Dana carries it back. Maris retells it to a half-dozen people. By next week, 'they were really defensive when I brought it up' is the story. Defense always makes the accusation louder.",
    dialog: [
      {
        speakerId: "inner-voice",
        text: "Never defend against a charge you don't actually need to answer. The defense IS the confirmation.",
        emotion: "sad",
      },
    ],
  },

  {
    id: "ending-map-leaked",
    backgroundId: "common-room",
    mood: "danger",
    isEnding: true,
    outcomeType: "bad",
    failureBlogSlug: "predators-gaze-how-sociopaths-detect-weakness",
    failureBlogTitle: "Predator's Gaze: How Sociopaths Detect Weakness",
    endingTitle: "Network Mapped",
    endingSummary:
      "You told Dana about your alliances — 'not really talking to anyone' is still a data point. Maris now knows who you AREN'T connected to, which tells her who's safe to weaponize against you. You handed over the map.",
    dialog: [
      {
        speakerId: "inner-voice",
        text: "Even 'nothing' is intel if it answers the question accurately.",
        emotion: "sad",
      },
    ],
  },

  {
    id: "ending-ally-burned",
    backgroundId: "common-room",
    mood: "danger",
    isEnding: true,
    outcomeType: "bad",
    failureBlogSlug: "mask-collection-four-personas-sociopaths-wear",
    failureBlogTitle: "Mask Collection: The Four Personas Sociopaths Wear",
    endingTitle: "You Named Priya",
    endingSummary:
      "You told Dana — so you told Maris — that you and Priya have been close. Priya is Maris's old target. She just became Maris's current one again, and you're the reason. The person who's been protecting you through every level is about to find out you put her name in a proxy's mouth.",
    dialog: [
      {
        speakerId: "inner-voice",
        text: "Never name allies to operatives. The list you give is the target list they use.",
        emotion: "sad",
      },
    ],
  },
];

export const mission22: Scenario = {
  id: "mission-2-2",
  title: "The Proxy",
  tagline: "Dana isn't visiting. She's on assignment.",
  description:
    "Dana finds you in the common room with a 'you should hear this from a friend.' She's running reconnaissance for Maris. The only way through is to make her come back empty — and to see the triangulation while it's happening.",
  tier: "free",
  level: 2,
  order: 2,
  estimatedMinutes: 10,
  difficulty: "beginner",
  category: "narcissist",
  xpReward: 125,
  badgeId: "proxy-neutralized",
  startSceneId: "library-bump",
  tacticsLearned: [
    "Refusing to take the bait dangled by a proxy",
    "Naming covert operations out loud",
    "Testing quotes for the exact words",
    "Keeping alliances off the map",
  ],
  redFlagsTaught: [
    "'I heard it from a friend' as a setup line",
    "Unsolicited 'concern' opening a conversation",
    "Paraphrased quotes presented as verbatim",
    "Questions about your alliances and schedules",
  ],
  reward: {
    id: "proxy-neutralized",
    name: "Proxy Neutralized",
    description: "The messenger arrived full and left empty.",
    unlocksScenarioId: "mission-3-1",
  },
  prerequisites: ["mission-2-1"],
  characters: [DANA, PRIYA, INNER_VOICE],
  scenes,
};

export default mission22;
