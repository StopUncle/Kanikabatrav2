/**
 * Business Line — Mission 1 "The First Win"
 *
 * Teaches: reading the three reactions to your success (sincere,
 * performed, corrosive). Information discipline in the hour after a
 * public win. Not reacting to false praise with warmth. Not
 * retaliating against envy publicly.
 *
 * Why it matters: the moment you win is when your real enemies reveal
 * themselves. Most men miss it because they're drunk on the win —
 * which costs them six months later when the quiet ones have organised.
 *
 * Failure routes → "Predator's Gaze: How Sociopaths Detect Weakness"
 */

import type { Scenario, Scene } from "../../types";
import { DAMIEN, HALE, SAGE, THEO, INNER_VOICE_M } from "../../characters-male";

const scenes: Scene[] = [
  // ---------------------------------------------------------------------
  // PART 1 — the win
  // ---------------------------------------------------------------------
  {
    id: "the-announcement",
    backgroundId: "office",
    mood: "professional",
    dialog: [
      {
        speakerId: null,
        text: "Tuesday, 4:47pm. The all-hands just ended. The CEO named you — promoted, with the account nobody could close. Your name is the last thing in the company Slack for fifteen seconds.",
      },
      {
        speakerId: null,
        text: "Then the reactions start. Three kinds of messages, two kinds of faces at your doorway.",
      },
      {
        speakerId: "inner-voice",
        text: "The hour after a public win is the most information-rich hour of your career. Every man in this building just revealed what he actually thinks of you. Don't be drunk on it — read the room.",
        emotion: "serious",
      },
    ],
    choices: [
      {
        id: "read-the-room",
        text: "Stay still. Read who reaches out, in what order, with what tone.",
        tactic: "Intelligence posture. Reactions are data — collect before you respond.",
        nextSceneId: "inbox-scan",
        isOptimal: true,
      },
      {
        id: "thank-everyone",
        text: "Reply warmly to everyone. Gratitude is good leadership.",
        tactic: "Reflexive warmth at your peak is how predators mark you as soft.",
        nextSceneId: "warm-reply-trap",
      },
      {
        id: "celebrate-publicly",
        text: "Post about it. Tag the team. Ride the wave.",
        tactic: "Publicly celebrating at your peak broadcasts where to aim.",
        nextSceneId: "public-celebration",
      },
    ],
  },

  // ---------------------------------------------------------------------
  // PART 2 — the inbox
  // ---------------------------------------------------------------------
  {
    id: "inbox-scan",
    backgroundId: "office",
    mood: "mysterious",
    presentCharacterIds: ["theo"],
    dialog: [
      {
        speakerId: null,
        text: "You don't reply yet. You read.",
      },
      {
        speakerId: null,
        text: "Theo — short, specific: 'Well earned. Drinks Thursday, I'll buy.'",
      },
      {
        speakerId: null,
        text: "Hale — long, generous, 'team effort', 'couldn't be prouder', three emojis.",
      },
      {
        speakerId: null,
        text: "Sage — warmest of all. 'Soooo happy for you. Can I grab 20 minutes this week to hear how you landed it? Writing a deck for my review.'",
      },
      {
        speakerId: null,
        text: "Damien — nothing. Then, twelve minutes later, a single word from an internal channel you're not on: 'Interesting.'",
      },
      {
        speakerId: "inner-voice",
        text: "Four men. Four patterns. Theo is a friend. Hale is performing — 'team effort' is pre-positioning to claim the win later. Sage wants your playbook under the cover of a compliment. Damien just marked you a threat.",
        emotion: "knowing",
      },
    ],
    choices: [
      {
        id: "reply-theo-first",
        text: "Reply to Theo. Nothing else. Go to drinks Thursday.",
        tactic: "Invest in your actual allies first. The rest can wait.",
        nextSceneId: "sage-approach",
        isOptimal: true,
      },
      {
        id: "reply-hale-warmly",
        text: "Thank Hale effusively. Public 'couldn't have done it without you' reply in the thread.",
        tactic: "You just gave Hale the language he'll use to claim the win in front of the board.",
        nextSceneId: "hale-claims",
      },
      {
        id: "share-with-sage",
        text: "Book the 20 with Sage. Help a peer grow.",
        tactic: "You're about to hand Sage the playbook he'll use to position against you at review.",
        nextSceneId: "sage-extracts",
      },
    ],
  },

  // ---------------------------------------------------------------------
  // PART 3A — optimal branch: sage approaches
  // ---------------------------------------------------------------------
  {
    id: "sage-approach",
    backgroundId: "office",
    mood: "tense",
    presentCharacterIds: ["sage-m"],
    dialog: [
      {
        speakerId: null,
        text: "Wednesday morning. Sage is at your door with coffee. Already brought two.",
      },
      {
        speakerId: "sage-m",
        text: '"Hey — just wanted to say again, massive congrats. I was wondering, could I pick your brain? Just 15 minutes. I want to learn from the best."',
        emotion: "happy",
      },
      {
        speakerId: "inner-voice",
        text: "'Pick your brain' is the corporate version of love-bombing. The flattery, the small gift, the vague ask. Covert narcissists extract. Give him 15 minutes and he walks out with the diagram of how you closed the deal — which becomes the diagram of how he replicates you and then differentiates himself from you.",
        emotion: "serious",
      },
    ],
    choices: [
      {
        id: "deflect-warmly",
        text: '"I\'m honestly figuring it out myself. Ask me again in a month." Hand coffee back with a smile.',
        tactic: "Warm deflection. You don't owe him your process. Stay collegial, stay opaque.",
        nextSceneId: "damien-move",
        isOptimal: true,
      },
      {
        id: "share-selectively",
        text: '"Happy to talk about the industry angle. The client specifics I can\'t get into."',
        tactic: "Partial share — acceptable. You control what he extracts.",
        nextSceneId: "damien-move",
      },
      {
        id: "full-share",
        text: "Sit down. Walk him through the whole playbook.",
        tactic: "You just gave him a weapon. He'll use it in the next review cycle.",
        nextSceneId: "sage-extracts",
      },
    ],
  },

  // ---------------------------------------------------------------------
  // PART 4 — Damien's move
  // ---------------------------------------------------------------------
  {
    id: "damien-move",
    backgroundId: "office",
    mood: "danger",
    presentCharacterIds: ["damien"],
    immersionTrigger: "manipulation-detected",
    dialog: [
      {
        speakerId: null,
        text: "Thursday, 11am. Damien appears at your office. You've exchanged maybe forty words in two years. He sits without being invited.",
      },
      {
        speakerId: "damien",
        text: '"Congratulations on the account. Genuinely impressive work. I\'m glad you\'re on the radar now."',
        emotion: "cold",
      },
      {
        speakerId: "damien",
        text: '"We should have lunch. I have some context on Hale you\'d probably find useful."',
        emotion: "smirking",
      },
      {
        speakerId: "inner-voice",
        text: "Triangulation. He's offering intel on your boss as a friendship token. If you accept, you're in his web — he'll ask for things later, and 'I told you about Hale' becomes the leash. The power move is not declining rudely. It's staying warm and uninvolved.",
        emotion: "knowing",
      },
    ],
    choices: [
      {
        id: "warm-uninvolved",
        text: '"Appreciate that. I\'m heads down on the new account for a few weeks — let me circle back."',
        tactic: "Grey-rock with warmth. No information in, no information out. Deferred indefinitely.",
        nextSceneId: "ending-read",
        isOptimal: true,
      },
      {
        id: "accept-lunch",
        text: '"Yes — let\'s do it." Put it on the calendar.',
        tactic: "You just joined his web. He'll collect the favour later.",
        nextSceneId: "ending-webbed",
      },
      {
        id: "decline-hard",
        text: '"I\'m not really into the politics thing."',
        tactic: "Declining rudely marks you as naive AND hostile. He'll remember.",
        nextSceneId: "ending-naive",
      },
    ],
  },

  // ---------------------------------------------------------------------
  // PART 3B — bad branches
  // ---------------------------------------------------------------------
  {
    id: "warm-reply-trap",
    backgroundId: "office",
    mood: "tense",
    presentCharacterIds: ["hale"],
    dialog: [
      {
        speakerId: null,
        text: "You reply warmly to everyone. Thirty minutes of gratitude messages. It feels good.",
      },
      {
        speakerId: "hale",
        text: '"So grateful for the leadership you provided — really a team win."',
        emotion: "happy",
      },
      {
        speakerId: "inner-voice",
        text: "Hale just publicly re-framed your solo close as a team effort he led. Your warmth gave him the opening. This language will be in his self-review next quarter. You can't unring this bell.",
        emotion: "sad",
      },
    ],
    nextSceneId: "ending-overshared",
  },

  {
    id: "public-celebration",
    backgroundId: "office",
    mood: "danger",
    dialog: [
      {
        speakerId: null,
        text: "You post a triumphant LinkedIn update. 847 reactions inside the hour. You screenshot it.",
      },
      {
        speakerId: "inner-voice",
        text: "Every enemy you have at every competitor firm just got the same notification. Headhunters are circling your team. And Damien just forwarded the post to someone with the word 'broadcasting' in the subject.",
        emotion: "sad",
      },
    ],
    nextSceneId: "ending-broadcaster",
  },

  {
    id: "hale-claims",
    backgroundId: "office",
    mood: "tense",
    presentCharacterIds: ["hale"],
    dialog: [
      {
        speakerId: "hale",
        text: '"Really moved by your note. I\'ve been telling the exec team — this is exactly the kind of team execution we need to highlight upstairs."',
        emotion: "happy",
      },
      {
        speakerId: "inner-voice",
        text: "Within a week, your solo close will be 'our team closed it, under Hale's direction'. The language you gave him in your warm reply is now a sentence in his narrative. You taught him to steal from you.",
        emotion: "sad",
      },
    ],
    nextSceneId: "ending-overshared",
  },

  {
    id: "sage-extracts",
    backgroundId: "office",
    mood: "tense",
    presentCharacterIds: ["sage-m"],
    dialog: [
      {
        speakerId: null,
        text: "You share the playbook. The real diligence, the relationship map, the price signalling sequence. Sage takes careful notes.",
      },
      {
        speakerId: "sage-m",
        text: '"This is gold. You should present this to leadership."',
        emotion: "happy",
      },
      {
        speakerId: "inner-voice",
        text: "He will present it. Eight weeks from now, a reframed version of your playbook lands in a Sage-authored deck on the CEO's desk. Your name appears in the bibliography slide only.",
        emotion: "sad",
      },
    ],
    nextSceneId: "ending-extracted",
  },

  // ---------------------------------------------------------------------
  // ENDINGS
  // ---------------------------------------------------------------------
  {
    id: "ending-read",
    backgroundId: "office",
    mood: "peaceful",
    immersionTrigger: "victory",
    isEnding: true,
    outcomeType: "good",
    endingTitle: "You Read the Room",
    endingSummary:
      "You stayed still in the hour when everyone else moved. Theo became a closer ally. Sage extracted nothing and adjusted. Damien marked you as someone who can't be easily webbed. Hale got no language to steal. In three months you get the second big win — and this time, the reactions teach you who has already calibrated to you. The men you can't read are the men who run you. The ones you read early are the ones you outlast.",
    dialog: [
      {
        speakerId: "inner-voice",
        text: "Power is information asymmetry. You just maintained yours at the moment most men leak theirs.",
        emotion: "knowing",
      },
    ],
  },

  {
    id: "ending-webbed",
    backgroundId: "office",
    mood: "tense",
    isEnding: true,
    outcomeType: "bad",
    endingTitle: "Webbed",
    endingSummary:
      "Lunch with Damien happens. He gives you information about Hale that turns out to be three-quarters true. A month later he asks you to 'keep him in the loop' on your account. Three months later he asks you to hold back a piece of analysis from Hale. You realise you are no longer your own man — you're a source in his network. Untangling this takes eighteen months and costs you the promotion after the next one.",
    failureBlogSlug: "predators-gaze-how-sociopaths-detect-weakness",
    failureBlogTitle: "Predator's Gaze: How Sociopaths Detect Weakness",
    dialog: [
      {
        speakerId: "inner-voice",
        text: "Accepting intel is accepting obligation. You signed a contract you weren't offered.",
        emotion: "sad",
      },
    ],
  },

  {
    id: "ending-naive",
    backgroundId: "office",
    mood: "tense",
    isEnding: true,
    outcomeType: "bad",
    endingTitle: "Marked Naive",
    endingSummary:
      "Declining rudely read as both naive and hostile. Damien logged it. Over the next year, every room he's in quietly gets the assessment: 'Good operator — doesn't know how the building works.' You're tolerated, not promoted. Power skills are not separate from work skills above a certain level. The technicals got you here; refusing to learn the game keeps you here.",
    failureBlogSlug: "predators-gaze-how-sociopaths-detect-weakness",
    failureBlogTitle: "Predator's Gaze: How Sociopaths Detect Weakness",
    dialog: [
      {
        speakerId: "inner-voice",
        text: "The moralist who refuses to read rooms gets outmanoeuvred by men who do. Integrity is not the same as naiveté.",
        emotion: "sad",
      },
    ],
  },

  {
    id: "ending-overshared",
    backgroundId: "office",
    mood: "tense",
    isEnding: true,
    outcomeType: "bad",
    endingTitle: "You Gave Him the Language",
    endingSummary:
      "Within a quarter, Hale's narrative of 'the team execution I led' has landed upstairs. The close you authored is now co-authored in every room that matters. You didn't lose it — you handed it over, gift-wrapped in your own warmth. Your next big win will be quietly harder to claim, because the pattern 'Hale's team does good work' is now the frame. You'll spend two years clawing ownership back.",
    failureBlogSlug: "narcissist-playbook-how-they-actually-operate",
    failureBlogTitle: "Narcissist Playbook: How They Actually Operate",
    dialog: [
      {
        speakerId: "inner-voice",
        text: "Gratitude is the right instinct. Broadcasting it up a credit-thief's chain is the wrong execution.",
        emotion: "sad",
      },
    ],
  },

  {
    id: "ending-broadcaster",
    backgroundId: "office",
    mood: "danger",
    isEnding: true,
    outcomeType: "bad",
    endingTitle: "Broadcaster",
    endingSummary:
      "The post went viral internally. Every competitor now knows who closed the account; every recruiter is DMing your key people; every enemy inside the building just got a free target map. Within six weeks you lose your second-best analyst to a rival. Damien forwards the post to the board with the word 'branding' in the subject — as a compliment, then later, as a critique. You learn, expensively, that the men who run things don't post.",
    failureBlogSlug: "predators-gaze-how-sociopaths-detect-weakness",
    failureBlogTitle: "Predator's Gaze: How Sociopaths Detect Weakness",
    dialog: [
      {
        speakerId: "inner-voice",
        text: "The win was the information. Broadcasting it spends the information for applause.",
        emotion: "sad",
      },
    ],
  },

  {
    id: "ending-extracted",
    backgroundId: "office",
    mood: "tense",
    isEnding: true,
    outcomeType: "bad",
    endingTitle: "Extracted",
    endingSummary:
      "Eight weeks later, Sage's deck lands on the CEO's desk. The framework is your framework. The examples are your examples. The name is his. You spend the next review cycle explaining why 'Sage's methodology' isn't actually Sage's — which is a losing argument in any room that hasn't seen the timestamp of your whiteboard. You taught a covert narcissist to be you, and now you're competing against a copy with a clean attribution record.",
    failureBlogSlug: "narcissist-playbook-how-they-actually-operate",
    failureBlogTitle: "Narcissist Playbook: How They Actually Operate",
    dialog: [
      {
        speakerId: "inner-voice",
        text: "'Pick your brain' is extraction. Generosity is good; generosity with your playbook is career negligence.",
        emotion: "sad",
      },
    ],
  },
];

export const businessMission1: Scenario = {
  id: "b1-first-win",
  title: "The First Win",
  tagline: "The hour after you win is the most information-rich hour of your career.",
  description:
    "You just got promoted. The all-hands ended six minutes ago. Within an hour, four different men will reveal who they are to you through how they react — the friend, the credit thief, the covert extractor, and the political operator. Read them correctly and you've built a map of the next five years. Read them wrong and you've already started losing ground you won't know you lost.",
  tier: "free",
  track: "male-business",
  level: 1,
  order: 1,
  estimatedMinutes: 7,
  difficulty: "beginner",
  category: "business",
  xpReward: 100,
  badgeId: "first-read",
  startSceneId: "the-announcement",
  tacticsLearned: [
    "Reading reactions to your success as intelligence",
    "Warm deflection without offending",
    "Recognising 'pick your brain' as extraction",
    "Information discipline at your peak moment",
  ],
  redFlagsTaught: [
    "Performative warmth from a credit thief ('team effort')",
    "Love-bombing in professional register ('learn from the best')",
    "Triangulation as friendship token ('context on Hale')",
    "Flattery-as-gift preceding an extraction request",
  ],
  characters: [DAMIEN, HALE, SAGE, THEO, INNER_VOICE_M],
  scenes,
};

export default businessMission1;
