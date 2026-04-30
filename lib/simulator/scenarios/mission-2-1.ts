/**
 * Mission 2-1, "The Group Chat"
 *
 * Level 2, order 1. Teaches information discipline under peer pressure.
 * The group chat is the primary manipulation surface of adult life —
 * one screenshot and your words live forever, recontextualized.
 */

import type { Scenario, Scene } from "../types";
import { ALEX, PRIYA, MORGAN, INNER_VOICE } from "../characters";

const scenes: Scene[] = [
  {
    id: "chat-lights-up",
    backgroundId: "text-screen",
    mood: "tense",
    dialog: [
      {
        speakerId: null,
        text: "Five days after the rooftop. The card from Maris is still in your coat pocket, still unreturned. You are on your couch, halfway through dinner, when the chat pings.",
      },
      {
        speakerId: null,
        text: "Morgan always pings when you are tired enough to answer. She has learned your schedule better than you have, she does not do it on purpose, but she does do it, and her instinct for when you will say the thing you meant to keep to yourself is almost supernatural.",
      },
      {
        speakerId: null,
        text: 'MORGAN: "okay but WHO is maris actually dating rn"',
      },
      {
        speakerId: null,
        text: 'MORGAN: "you were at the bar right? you must know"',
      },
      {
        speakerId: "inner-voice",
        text: "Note the rhythm of those two messages. She did not ask 'do you know anything,' because that is answerable with 'no.' She asked 'who is', a presupposition question, which only accepts a named answer. The second message removes the option of pleading ignorance. She has engineered a conversation in which the only socially frictionless reply is a name.",
        emotion: "knowing",
      },
      {
        speakerId: "inner-voice",
        text: "This is information warfare at its most pedestrian. Morgan does not care if you know. She cares what you will say in the next ninety seconds because you do not want to look boring.",
        emotion: "knowing",
      },
    ],
    choices: [
      {
        id: "share-guess",
        text: '"Honestly I think she\'s seeing that guy from the gala"',
        tactic: "Feeding speculation. Screenshot lives forever.",
        nextSceneId: "screenshot-spreads",
        isOptimal: false,
      },
      {
        id: "say-dont-know",
        text: '"no idea"',
        tactic: "Plain, flat, correct.",
        nextSceneId: "morgan-pushes",
        isOptimal: true,
      },
      {
        id: "stay-silent",
        text: "Don't reply. Put the phone down.",
        tactic: "Even better. Silence can't be quoted.",
        nextSceneId: "morgan-escalates-solo",
        isOptimal: true,
      },
      {
        id: "redirect",
        text: '"ask her"',
        tactic: "Cheeky. She'll pretend to laugh, remember forever.",
        nextSceneId: "morgan-pushes",
      },
    ],
  },

  {
    id: "screenshot-spreads",
    backgroundId: "text-screen",
    mood: "danger",
    dialog: [
      {
        speakerId: null,
        text: "Within an hour, your message has been screenshotted into three other chats. You're in none of them.",
      },
      {
        speakerId: null,
        text: 'Your phone buzzes. UNKNOWN: "maris is going to want to know why you\'re spreading that"',
      },
      {
        speakerId: "inner-voice",
        text: "Speculation just became a 'source'. Your name is on it.",
        emotion: "concerned",
      },
    ],
    nextSceneId: "ending-speculation-fail",
  },

  {
    id: "morgan-pushes",
    backgroundId: "text-screen",
    mood: "tense",
    dialog: [
      {
        speakerId: null,
        text: 'MORGAN: "ok but you were THERE"',
      },
      {
        speakerId: null,
        text: 'MORGAN: "just between us tell me what you saw 👀"',
      },
      {
        speakerId: "inner-voice",
        text: 'There is no "just between us" in a group chat.',
        emotion: "concerned",
      },
    ],
    choices: [
      {
        id: "give-something-small",
        text: '"she was with her usual group. Nothing weird."',
        tactic: "Even 'nothing' is a datapoint. Morgan will reinterpret.",
        nextSceneId: "morgan-reinterprets",
      },
      {
        id: "deflect-to-food",
        text: '"i was mostly focused on the nachos tbh"',
        tactic: "Humor exit. Signals you won't play and keeps it light.",
        nextSceneId: "morgan-gives-up",
        isOptimal: true,
      },
      {
        id: "call-it-out",
        text: '"why are you asking me this here"',
        tactic: "Surfacing the gossip game. Others in the chat will notice.",
        nextSceneId: "chat-quiets",
        isOptimal: true,
      },
      {
        id: "lie-confidently",
        text: '"i didn\'t even see her"',
        tactic: "Lies that can be disproven cost you more than silence.",
        nextSceneId: "lie-caught",
        isOptimal: false,
      },
    ],
  },

  {
    id: "morgan-escalates-solo",
    backgroundId: "text-screen",
    mood: "tense",
    dialog: [
      {
        speakerId: null,
        text: "Morgan DMs you directly.",
      },
      {
        speakerId: null,
        text: 'MORGAN (DM): "come onnn. Just between us. You saw her with someone right?"',
      },
      {
        speakerId: "inner-voice",
        text: "Moved from public to private. She needs something to bring back.",
        emotion: "knowing",
      },
    ],
    choices: [
      {
        id: "dm-deflect",
        text: '"nothing to report, boss"',
        tactic: "Warm but empty. Nothing to quote.",
        nextSceneId: "morgan-gives-up",
        isOptimal: true,
      },
      {
        id: "dm-honest",
        text: '"i genuinely don\'t know anything interesting"',
        tactic: "True and boring. Good combo.",
        nextSceneId: "morgan-gives-up",
        isOptimal: true,
      },
      {
        id: "dm-inquire",
        text: '"why do you want to know?"',
        tactic: "Reversing the question. She'll reveal the real ask.",
        nextSceneId: "morgan-reveals",
      },
    ],
  },

  {
    id: "morgan-reveals",
    backgroundId: "text-screen",
    mood: "tense",
    dialog: [
      {
        speakerId: null,
        text: 'MORGAN (DM): "lol nothing just curious"',
      },
      {
        speakerId: null,
        text: 'MORGAN (DM): "okay fine. Caleb asked me to find out. I said i\'d ask around"',
      },
      {
        speakerId: "inner-voice",
        text: "Flying monkey, confirmed. She's doing reconnaissance for Maris's shadow.",
        emotion: "knowing",
      },
    ],
    choices: [
      {
        id: "report-to-priya",
        text: "Screenshot to Priya. No reply to Morgan.",
        tactic: "Intel routed to the right person. Morgan never hears again.",
        nextSceneId: "ending-flying-monkey-ID",
        isOptimal: true,
      },
      {
        id: "confront-morgan",
        text: '"tell caleb to ask me himself"',
        tactic: "Satisfying. Also lets Caleb know you know.",
        nextSceneId: "ending-flying-monkey-ID",
      },
      {
        id: "play-along",
        text: '"idk maybe i saw something, what does caleb want to know"',
        tactic: "You just offered to be a source. Worst outcome.",
        nextSceneId: "ending-recruited-as-source",
        isOptimal: false,
      },
    ],
  },

  {
    id: "morgan-reinterprets",
    backgroundId: "text-screen",
    mood: "danger",
    dialog: [
      {
        speakerId: null,
        text: "Two hours later. Screenshot of 'nothing weird' appears in three chats with a new caption.",
      },
      {
        speakerId: null,
        text: '"source says maris was with her usual group, meaning HIM"',
      },
      {
        speakerId: "inner-voice",
        text: "You gave her a blank. She filled it in.",
        emotion: "concerned",
      },
    ],
    nextSceneId: "ending-speculation-fail",
  },

  {
    id: "morgan-gives-up",
    backgroundId: "text-screen",
    mood: "peaceful",
    dialog: [
      {
        speakerId: null,
        text: 'MORGAN: "lol fine ok boring"',
      },
      {
        speakerId: null,
        text: "She moves on to asking Alex in the chat. Alex, who will absolutely feed her something in the next four minutes.",
      },
      {
        speakerId: "inner-voice",
        text: "The word 'boring' in that message is not a judgement. It is a concession. Morgan has just admitted she will not get the story from you. You are a dead well. She will remember this, which is actually useful, collectors prefer to ask productive sources, and you have just removed yourself from that list.",
        emotion: "knowing",
      },
      {
        speakerId: "inner-voice",
        text: "Being boring to the wrong person is, rather often, the entire skill.",
        emotion: "knowing",
      },
    ],
    nextSceneId: "priya-notices",
  },

  {
    id: "chat-quiets",
    backgroundId: "text-screen",
    mood: "tense",
    presentCharacterIds: ["priya"],
    dialog: [
      {
        speakerId: null,
        text: "The chat goes dead for twenty seconds. Nobody wants to be the next person to ask.",
      },
      {
        speakerId: null,
        text: 'PRIYA (DM): "well done"',
      },
    ],
    nextSceneId: "priya-notices",
  },

  {
    id: "lie-caught",
    backgroundId: "text-screen",
    mood: "danger",
    dialog: [
      {
        speakerId: null,
        text: "Alex chimes in.",
      },
      {
        speakerId: "alex",
        text: "\"wait you were literally sitting with her table for an hour i saw the pic\"",
        emotion: "confused",
      },
      {
        speakerId: "inner-voice",
        text: "You lied on a surface someone else had receipts for. Now you look shady.",
        emotion: "concerned",
      },
    ],
    nextSceneId: "ending-lie-caught",
  },

  {
    id: "priya-notices",
    backgroundId: "text-screen",
    mood: "peaceful",
    presentCharacterIds: ["priya"],
    dialog: [
      {
        speakerId: "priya",
        text: '"(DM) that was smooth. Morgan will circle back in a week on something else."',
        emotion: "knowing",
      },
      {
        speakerId: "priya",
        text: '"the game is never about what they ask. It\'s about what you confirm."',
        emotion: "serious",
      },
    ],
    choices: [
      {
        id: "ack-priya",
        text: "\"Copy. What else should I watch for?\"",
        tactic: "Ask the veteran while she's volunteering.",
        nextSceneId: "priya-rules",
        isOptimal: true,
      },
      {
        id: "brush-off",
        text: "\"I was just trying to get her to stop\"",
        tactic: "Downplaying but Priya's gift here was real. Take it.",
        nextSceneId: "ending-info-held",
      },
      {
        id: "return-the-read",
        text: "\"You saw that before I did. Thanks.\"",
        tactic: "Acknowledge the read without fishing for more. She'll give more because you noticed.",
        nextSceneId: "priya-rules",
        isOptimal: true,
      },
      {
        id: "name-the-pattern",
        text: "\"Morgan always does this, doesn't she. For who this time?\"",
        tactic: "Pattern-matching out loud. Shows Priya you're thinking about the network, not just the incident.",
        nextSceneId: "priya-rules",
        isOptimal: true,
      },
    ],
  },

  {
    id: "priya-rules",
    backgroundId: "apartment",
    mood: "peaceful",
    presentCharacterIds: ["priya"],
    dialog: [
      {
        speakerId: "priya",
        text: '"Three rules for chats. Real talk."',
        emotion: "serious",
      },
      {
        speakerId: "priya",
        text: '"One. Anything you type in any chat, including the one you are currently in with me, is a public document. Do not write anything you would not read aloud in a lecture hall with your mother in the back row."',
        emotion: "serious",
      },
      {
        speakerId: "priya",
        text: "\"Two. If someone wants a story out of you, refuse to be the author. Make them find one elsewhere. You do not owe anyone a sentence with a verb in it.\"",
        emotion: "serious",
      },
      {
        speakerId: "priya",
        text: '"Three. \'Just between us\' does not exist. The second it is typed, it is evidence. The phrase itself is the tell, people who mean privacy do not announce it; they simply do it."',
        emotion: "knowing",
      },
      {
        speakerId: "inner-voice",
        text: "Memorise those three. They apply to every group chat, every Slack channel, every text thread, every corporate email you will ever touch. The rules do not change when the stakes go up, which is good news, because the stakes absolutely will.",
        emotion: "knowing",
      },
    ],
    nextSceneId: "ending-rules-learned",
  },

  // ---------------------------------------------------------------------
  // ENDINGS
  // ---------------------------------------------------------------------

  {
    id: "ending-flying-monkey-ID",
    backgroundId: "text-screen",
    isEnding: true,
    outcomeType: "good",
    endingTitle: "Flying Monkey Identified",
    endingSummary:
      "Morgan thought she was reconnaissance. You made her feel watched instead. Caleb will get nothing, and whatever he hears about you from now on will be intercepted before it lands. You just turned a leak into a listening post.",
    dialog: [
      {
        speakerId: "inner-voice",
        text: "The person extracting information is more valuable than the information itself.",
        emotion: "knowing",
      },
    ],
  },

  {
    id: "ending-rules-learned",
    backgroundId: "apartment",
    isEnding: true,
    outcomeType: "good",
    endingTitle: "Three Rules",
    endingSummary:
      "You didn't just survive the group chat, you levelled up. Public documents, no authoring stories for others, no such thing as 'just between us'. Tonight's lesson costs nothing. Tomorrow's tuition would have been far higher.",
    dialog: [
      {
        speakerId: "inner-voice",
        text: "Discipline isn't about not trusting anyone. It's about making them earn it.",
        emotion: "knowing",
      },
    ],
  },

  {
    id: "ending-info-held",
    backgroundId: "text-screen",
    isEnding: true,
    outcomeType: "neutral",
    endingTitle: "Nothing Leaked",
    endingSummary:
      "You kept the information in. Morgan moved on. You didn't learn much about the system but the system also didn't learn anything about you. Call it a wash.",
    dialog: [
      {
        speakerId: "inner-voice",
        text: "Survival is a skill. Mastery is a different one.",
        emotion: "neutral",
      },
    ],
  },

  {
    id: "ending-speculation-fail",
    backgroundId: "text-screen",
    mood: "danger",
    isEnding: true,
    outcomeType: "bad",
    failureBlogSlug: "predators-gaze-how-sociopaths-detect-weakness",
    failureBlogTitle: "Predator's Gaze: How Sociopaths Detect Weakness",
    endingTitle: "You Became the Source",
    endingSummary:
      "You offered speculation. They turned it into a citation. Whatever you said is now attributed to you, shaped into something you didn't mean, and attached to Maris's name. Your next interaction with her begins with her already knowing you talked.",
    dialog: [
      {
        speakerId: "inner-voice",
        text: "Speculation costs you twice. Once for being wrong, again for being the named source.",
        emotion: "sad",
      },
    ],
  },

  {
    id: "ending-lie-caught",
    backgroundId: "text-screen",
    mood: "danger",
    isEnding: true,
    outcomeType: "bad",
    failureBlogSlug: "mask-collection-four-personas-sociopaths-wear",
    failureBlogTitle: "Mask Collection: The Four Personas Sociopaths Wear",
    endingTitle: "Caught in the Lie",
    endingSummary:
      "The lie you told was disproved in the same chat thread, within the hour. Now your name is associated with dishonesty and bad judgment, in a public document. 'Lying about being there' is a smaller story people love to retell.",
    dialog: [
      {
        speakerId: "inner-voice",
        text: "Silence is free. Lies have an interest rate.",
        emotion: "sad",
      },
    ],
  },

  {
    id: "ending-recruited-as-source",
    backgroundId: "text-screen",
    mood: "danger",
    isEnding: true,
    outcomeType: "bad",
    failureBlogSlug: "narcissist-playbook-how-they-actually-operate",
    failureBlogTitle: "Narcissist Playbook: How They Actually Operate",
    endingTitle: "Informant",
    endingSummary:
      "You offered intel to someone working for Caleb. Congratulations, you're now a tool in someone else's campaign, and every word you send forward gets routed back to Maris. She doesn't need to extract anything from you anymore. You'll volunteer.",
    dialog: [
      {
        speakerId: "inner-voice",
        text: "You became the asset. You won't like how they use you.",
        emotion: "sad",
      },
    ],
  },
];

export const mission21: Scenario = {
  id: "mission-2-1",
  title: "The Group Chat",
  tagline: "Every message is a public document.",
  description:
    "A quiet Tuesday night becomes a reconnaissance operation. Morgan wants a story about Maris. Behind her, Caleb wants a source. You have 47 seconds to type something or not.",
  tier: "free",
  level: 2,
  order: 1,
  estimatedMinutes: 8,
  difficulty: "beginner",
  category: "gaslighter",
  xpReward: 110,
  badgeId: "info-discipline",
  startSceneId: "chat-lights-up",
  tacticsLearned: [
    "Refusing to author other people's stories",
    "Humor deflection in group chats",
    "Surfacing gossip publicly to make others retreat",
    "Identifying flying monkeys",
  ],
  redFlagsTaught: [
    "'Just between us' framing in a group chat",
    "DM escalation after public deflection",
    "Friends asking questions FOR someone else",
    "Requests for specific people's private info",
  ],
  reward: {
    id: "info-discipline",
    name: "Information Discipline",
    description: "You typed less than they wanted. You kept more than you lost.",
    unlocksScenarioId: "mission-2-2",
  },
  characters: [MORGAN, ALEX, PRIYA, INNER_VOICE],
  scenes,
};

export default mission21;
