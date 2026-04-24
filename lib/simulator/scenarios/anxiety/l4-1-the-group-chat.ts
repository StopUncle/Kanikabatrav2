/**
 * anx-4-1 — "The Group Chat Goes Quiet"
 *
 * Anxiety track, Level 4 (The Group Chat), order 1. The five-person
 * group chat that normally pings twenty times a day has not had a
 * message in thirty-six hours. It is Saturday, 11:47 a.m. You are
 * at your kitchen table with coffee and a pastry and a book you are
 * not reading. The chat is open in your hand. Everyone's 'last
 * active' indicator is green — they are all online, doing other
 * things, and saying nothing to the group.
 *
 * The scenario is not whether they have decided against you. They
 * have not. The scenario is whether you can hold the thirty-six
 * hours without authoring a rejection story into them and without
 * posting a 'why did you all go quiet?' message to make the
 * silence about you instead of letting it be about them.
 *
 * Teaches:
 *  - Group silence as environmental fact, not rejection signal
 *  - The 'why did everyone go quiet' message as the specific
 *    failure shape — it converts environmental silence into a
 *    referendum on you, and the group now has to manage the
 *    referendum instead of just being the group
 *  - The re-entry move when someone finally posts — match the
 *    register, do not over-perform, do not front-load three days
 *    of silence into one message
 *  - The private-DM-to-one-person check as a different, legitimate
 *    move — with the caveat that it carries a cost to the closeness
 *    ratio between that friend and the group
 *
 * Voice: reference/KANIKA-VOICE.md and reference/TRACK-anxiety.md.
 */

import type { Scenario, Scene } from "../../types";
import { INNER_VOICE, THE_CRITIC, NOOR, PRIYA } from "../../characters";

const scenes: Scene[] = [
  // ===================================================================
  // OPENING
  // ===================================================================
  {
    id: "saturday-morning",
    backgroundId: "apartment",
    mood: "peaceful",
    presentCharacterIds: ["inner-voice", "the-critic"],
    dialog: [
      {
        speakerId: null,
        text: "Saturday, 11:47 a.m. You are at the kitchen table. Coffee, a croissant, a novel you are not reading. The group chat is open on your phone. Five people including you. The last message is from Thursday, 11:14 p.m. — Priya shared a photo of a cat, three laugh reactions, nothing else.",
      },
      {
        speakerId: null,
        text: "Thirty-six hours and change. Usually this chat pings twenty times a day. Logistics. Memes. Priya's cat. A casual plan that becomes a real plan by Wednesday. This weekend: silence.",
      },
      {
        speakerId: "the-critic",
        text: "Notice who is online. Noor is active. Priya is active. Jen is active. They are all online, in some other chat, saying things to other people about you.",
        emotion: "cold",
      },
      {
        speakerId: "inner-voice",
        text: "The critic went straight to the rejection story. The facts are: thirty-six hours of group silence, everyone online elsewhere. The story underneath the facts is a fiction the critic has been rehearsing since adolescence.",
        emotion: "knowing",
      },
    ],
    choices: [
      {
        id: "leave-it-be",
        text: "Put the phone down. Read the book. The chat will post or it won't. Either is fine.",
        tactic: "The cleanest move. Group silence is environmental, not relational. Your Saturday does not need to orbit the thread that happens to be on your home screen.",
        nextSceneId: "phone-down",
        isOptimal: true,
        event: "restraint-shown",
      },
      {
        id: "post-something-casual",
        text: "Post a photo of the croissant. 'Worth the walk.' No question. No bid for reply.",
        tactic: "The warm-neutral post. It adds to the chat without asking anything of anyone. If someone replies, the chat rehydrates; if no one replies, your Saturday is no worse than it was.",
        nextSceneId: "posted-neutral",
        isOptimal: true,
        event: "optimal-with-grace",
      },
      {
        id: "why-is-everyone-quiet",
        text: 'Post: "are we mad at each other or is the chat just dead lol?"',
        tactic: "The specific failure shape. It converts environmental silence into a referendum on you. The 'lol' does not soften the ask; it flags the ask. The group now has to manage a question none of them created.",
        nextSceneId: "referendum-posted",
        isOptimal: false,
      },
      {
        id: "dm-noor-privately",
        text: "DM Noor privately: 'is everyone ok? the chat has been quiet.'",
        tactic: "The private-DM move is a different legitimate path, but it carries a subtle cost — it asks Noor to confirm the rest of the group is fine, which puts her one small step closer to you than to the group. Noor is the right person for a real worry; this is not a real worry.",
        nextSceneId: "dm-sent",
        isOptimal: false,
      },
    ],
  },

  // ===================================================================
  // OPTIMAL PATH A — LEAVE IT BE
  // ===================================================================
  {
    id: "phone-down",
    backgroundId: "apartment",
    mood: "peaceful",
    presentCharacterIds: ["inner-voice"],
    dialog: [
      {
        speakerId: null,
        text: "You put the phone face-down. You eat the croissant. You open the novel. The coffee is still warm.",
      },
      {
        speakerId: null,
        text: "At 1:14 p.m. the phone vibrates. Three messages in forty seconds. Jen has sent a voice note. Priya has replied. Noor has sent a laughing-face reaction to whatever Jen said.",
      },
      {
        speakerId: "inner-voice",
        text: "The silence was environmental. It lasted thirty-eight hours and ended without you having authored anything into it. The chat is back on its normal cadence.",
        emotion: "knowing",
      },
    ],
    choices: [
      {
        id: "listen-and-respond-in-kind",
        text: "Listen to Jen's voice note. Respond at the register the chat returned to — a sentence, a reaction, nothing front-loading the silence.",
        tactic: "Re-entry discipline. The chat rehydrated; your job is to not drag the thirty-eight hours back into it. The silence was not an event from the chat's perspective; do not make it one on your return.",
        nextSceneId: "ending-silence-held",
        isOptimal: true,
      },
      {
        id: "front-load-the-silence",
        text: 'Respond with "oh thank god you all posted, I was starting to spiral."',
        tactic: "The front-loaded re-entry. The joke makes the silence about you. The chat will laugh at it because it is friends being kind, but the information — that you spiralled inside the thirty-eight hours — is now in the group.",
        nextSceneId: "ending-front-loaded",
        isOptimal: false,
      },
    ],
  },

  // ===================================================================
  // OPTIMAL PATH B — POSTED NEUTRAL
  // ===================================================================
  {
    id: "posted-neutral",
    backgroundId: "apartment",
    mood: "peaceful",
    presentCharacterIds: ["inner-voice"],
    dialog: [
      {
        speakerId: null,
        text: "You post the photo. 'Worth the walk.' You put the phone down. Two minutes later, Priya reacts with a heart. Four minutes after that, Noor replies: 'which bakery.' Seven minutes after that, Jen sends a voice note about her week.",
      },
      {
        speakerId: "inner-voice",
        text: "Your neutral post rehydrated the chat. You did not ask anyone for anything; you offered a small thing; the rest of the group met it at the same register.",
        emotion: "knowing",
      },
    ],
    choices: [
      {
        id: "reply-simply",
        text: "Reply to Noor with the bakery name. Listen to Jen's voice note. Continue your Saturday.",
        tactic: "The follow-through. The post did its work; the normal register is the normal register; your Saturday continues.",
        nextSceneId: "ending-rehydrated",
        isOptimal: true,
      },
    ],
  },

  // ===================================================================
  // FAILURE PATH A — REFERENDUM POSTED
  // ===================================================================
  {
    id: "referendum-posted",
    backgroundId: "apartment",
    mood: "tense",
    presentCharacterIds: ["inner-voice", "the-critic"],
    dialog: [
      {
        speakerId: null,
        text: `Your message — "are we mad at each other or is the chat just dead lol?" — sits at the bottom of the thread. Four minutes. No reply. Eleven minutes. No reply. The four 'last active' indicators are all still green. They have seen it.`,
      },
      {
        speakerId: "the-critic",
        text: "They are in the other chat right now, discussing how to reply. They are deciding what to do about you.",
        emotion: "cold",
      },
      {
        speakerId: "inner-voice",
        text: "They are not in another chat. They are doing their Saturdays. They are also, now, each composing a reply that absorbs your referendum without making it bigger — which is a job you just gave them.",
        emotion: "knowing",
      },
      {
        speakerId: null,
        text: "At 12:09 p.m. Noor replies: 'all good here! just a quiet week x'. Priya posts a heart. Jen, at 12:11, shares a meme unrelated to the question. The referendum has been absorbed. Everyone was gracious. The cost is subtle.",
      },
    ],
    choices: [
      {
        id: "absorb-the-lesson",
        text: "Do not double down. Do not apologise for asking. React to Jen's meme. Close the thread internally without re-posting.",
        tactic: "Damage control. The ask landed; the group was kind; any further post about the ask amplifies the failure. Let Jen's meme be the re-entry point.",
        nextSceneId: "ending-referendum-absorbed",
        isOptimal: true,
      },
      {
        id: "apologise-for-the-ask",
        text: 'Post: "sorry that was weird, ignore me, mid-caffeine spiral."',
        tactic: "The apology-for-the-ask is the specific second failure. It doubles the cost — now the chat has to manage both the referendum and the apology-for-the-referendum. Jen and Priya will each reply warmly, which is fine, but the signal compounds.",
        nextSceneId: "ending-apologised-for-ask",
        isOptimal: false,
      },
    ],
  },

  // ===================================================================
  // FAILURE PATH B — DM NOOR PRIVATELY
  // ===================================================================
  {
    id: "dm-sent",
    backgroundId: "apartment",
    mood: "tense",
    presentCharacterIds: ["noor", "inner-voice"],
    dialog: [
      {
        speakerId: "noor",
        text: "real talk. the chat is just quiet. nothing happened. go read your book.",
        emotion: "neutral",
      },
      {
        speakerId: "inner-voice",
        text: "Noor called it. The private channel produced the exact right answer in one line. The cost you paid is that Noor now knows you checked, which — across enough Saturdays — shifts the one-to-one with Noor to carry a small surveillance function the group was designed to not have.",
        emotion: "knowing",
      },
    ],
    choices: [
      {
        id: "listen-to-noor",
        text: "Put the phone down. Read the book. Do not DM her again about this for at least six months.",
        tactic: "The recovery discipline. The DM happened; the lesson is to not make Noor your group-weather-check service.",
        nextSceneId: "ending-dm-absorbed",
        isOptimal: true,
        event: "failure-rejected",
      },
      {
        id: "keep-checking-in",
        text: "Reply: 'sorry, I know, anxiety morning. are you free later?'",
        tactic: "The keep-checking-in move converts the DM from a one-shot misstep into an ongoing pattern. Noor will say yes because Noor is kind; you have just booked her Saturday around your weather.",
        nextSceneId: "ending-noor-booked",
        isOptimal: false,
      },
    ],
  },

  // ===================================================================
  // ENDINGS
  // ===================================================================
  {
    id: "ending-silence-held",
    backgroundId: "apartment",
    mood: "peaceful",
    isEnding: true,
    outcomeType: "good",
    endingTitle: "The Silence Held",
    endingLearnPrompt:
      "Group silence is environmental. Thirty-eight hours is not a referendum. The whole discipline was: do not author anything into the silence, and when the silence breaks, re-enter at the register the chat returned to — not the register of your internal weather across the thirty-eight hours.",
    dialog: [
      {
        speakerId: "inner-voice",
        text: "The chat is back. The Saturday is your Saturday. The thirty-eight hours existed only inside your head — a specific piece of data you can keep or discard, and the discipline is to discard it.",
        emotion: "knowing",
      },
    ],
    choices: [],
  },

  {
    id: "ending-rehydrated",
    backgroundId: "apartment",
    mood: "peaceful",
    isEnding: true,
    outcomeType: "good",
    endingTitle: "The Chat Rehydrated",
    endingLearnPrompt:
      "A warm-neutral post that asks nothing of anyone is the lowest-cost way to hydrate a quiet chat. It rewards the chat with a small thing, does not put anyone on the spot, and — importantly — does not make the silence itself the subject. The croissant is the croissant.",
    dialog: [
      {
        speakerId: "inner-voice",
        text: "The photo, the reaction, the three-line exchange. The silence ended without a referendum. The normal cadence has returned.",
        emotion: "knowing",
      },
    ],
    choices: [],
  },

  {
    id: "ending-front-loaded",
    backgroundId: "apartment",
    mood: "tense",
    isEnding: true,
    outcomeType: "neutral",
    endingTitle: "The Front-Loaded Re-Entry",
    endingLearnPrompt:
      "The 'I was starting to spiral' joke is warm and the group will meet it warmly. The information it carries — that your weather for thirty-eight hours was about the chat — is now on the record. Friends are kind; friends are also pattern-readers. Two of these in a season and the chat begins to manage around your weather. One in a year is fine.",
    dialog: [
      {
        speakerId: "inner-voice",
        text: "The chat laughed. The chat moved on. A small piece of information was deposited. Next time, match the register; do not front-load the hours.",
        emotion: "knowing",
      },
    ],
    choices: [],
  },

  {
    id: "ending-referendum-absorbed",
    backgroundId: "apartment",
    mood: "tense",
    isEnding: true,
    outcomeType: "neutral",
    endingTitle: "The Referendum Absorbed",
    endingLearnPrompt:
      "The 'are we mad at each other' post produced exactly the labor it was built to produce — the group managed it, warmly. No friendships ended; no one was cold. The cost is the small adjustment each of them made to their Saturday to produce a reply that absorbed the question. Do not run this twice in a season. The specific move you are interrupting is not the silence; it is the impulse to make the silence about you.",
    dialog: [
      {
        speakerId: "inner-voice",
        text: "Absorbed. Kind. Costed. Jen's meme is the re-entry point. Saturday continues.",
        emotion: "knowing",
      },
    ],
    choices: [],
  },

  {
    id: "ending-apologised-for-ask",
    backgroundId: "apartment",
    mood: "cold",
    isEnding: true,
    outcomeType: "bad",
    endingTitle: "The Apology-for-the-Ask",
    failureBlogSlug: "how-to-leave-without-being-villain",
    failureBlogTitle: "How To Leave Without Being The Villain",
    endingLearnPrompt:
      "Apologising for the referendum converts one chat-managed question into two. The friends will meet it warmly — and each warm reply will be a small confirmation inside you that the register of the chat is now slightly about you in a way it was not on Thursday. This is the specific self-reinforcing loop the track is built to interrupt. The move, next time: one post, then hands off. No apology. No explanation.",
    dialog: [
      {
        speakerId: "inner-voice",
        text: "Two posts. Both about your weather. The chat will hold. The ratio shifted by a specific small amount. Saturday continues, slightly flatter than the croissant deserved.",
        emotion: "serious",
      },
    ],
    choices: [],
  },

  {
    id: "ending-dm-absorbed",
    backgroundId: "apartment",
    mood: "tense",
    isEnding: true,
    outcomeType: "neutral",
    endingTitle: "The DM Absorbed",
    endingLearnPrompt:
      "The private DM to the closest friend produced the correct answer in one line. The cost is the small surveillance load you added to the one-to-one relationship — Noor is now, very slightly, the person you check with about the group's weather. One DM like this per year is free; a pattern of them is the specific friendship-warping shape the track is built to interrupt.",
    dialog: [
      {
        speakerId: "inner-voice",
        text: "Noor called it. The book is open. The Saturday continues. Do not DM her about this again for a long while.",
        emotion: "knowing",
      },
    ],
    choices: [],
  },

  {
    id: "ending-noor-booked",
    backgroundId: "apartment",
    mood: "cold",
    isEnding: true,
    outcomeType: "bad",
    endingTitle: "The Saturday Booked",
    failureBlogSlug: "architecture-of-control-how-emotional-dependency-is-built",
    failureBlogTitle: "Architecture of Control — How Emotional Dependency Is Built",
    endingLearnPrompt:
      "Converting a one-shot DM into 'are you free later' is the specific move that turns the closest friend into the manager of your weather. She will say yes. She will show up. She will also, across six months of this, begin to notice the pattern — which is the friendship cost the track is built to prevent. Next time: one DM max, then hands off.",
    dialog: [
      {
        speakerId: "inner-voice",
        text: "Noor's Saturday is now booked around your Saturday. She was going to read. Instead she is meeting you at three. This is the shape.",
        emotion: "serious",
      },
    ],
    choices: [],
  },
];

export const anx41: Scenario = {
  id: "anx-4-1",
  title: "The Group Chat Goes Quiet",
  tagline: "Saturday, 11:47 a.m. Thirty-six hours of silence in a chat that normally pings twenty times a day.",
  description:
    "Your five-person group chat has not had a message since Thursday night. Everyone is online, doing other things. The critic wants to post 'are we mad at each other or is the chat just dead lol?' which is the specific failure shape the track is built to interrupt. The scenario holds the thirty-six hours and asks what you do with them — a warm-neutral post, a private DM to the closest friend, or simply the book and the croissant.",
  tier: "premium",
  track: "anxiety",
  level: 4,
  order: 1,
  estimatedMinutes: 12,
  difficulty: "intermediate",
  category: "self-regulation",
  xpReward: 360,
  badgeId: "the-silence-held",
  startSceneId: "saturday-morning",
  prerequisites: ["anx-1-3"],
  tacticsLearned: [
    "Group silence is environmental; it is not a referendum on you",
    "The warm-neutral post (a croissant photo, a small thing) rehydrates a quiet chat without asking anything",
    "The re-entry rule: match the register the chat returned to, do not front-load the silence",
    "The private-DM check is a legitimate one-shot move but compounds into surveillance load if repeated",
  ],
  redFlagsTaught: [
    "The 'why is everyone quiet' post as the specific move that converts environmental silence into a referendum on you",
    "The apology-for-the-ask as the specific second failure that doubles the chat-managed load",
    "The front-loaded re-entry ('I was starting to spiral') as the info-deposit the group pattern-reads",
    "The DM-pattern that converts the closest friend into a weather-check service for the group",
  ],
  characters: [INNER_VOICE, THE_CRITIC, NOOR, PRIYA],
  scenes,
};

export default anx41;
