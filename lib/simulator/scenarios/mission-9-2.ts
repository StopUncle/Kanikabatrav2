/**
 * Mission 9-2 — "The Counter-Campaign"
 *
 * Level 9, order 2. VIP tier.
 * Aria escalates — a direct public attack after months of covert
 * work. The senior role is three weeks out. This is the endgame of
 * the long game. Every move is visible.
 */

import type { Scenario, Scene } from "../types";
import { ARIA, KAYA, INNER_VOICE } from "../characters";

const scenes: Scene[] = [
  {
    id: "public-attack",
    backgroundId: "office",
    mood: "danger",
    presentCharacterIds: ["aria", "kaya"],
    dialog: [
      {
        speakerId: null,
        text: "Industry panel. 200 people. Aria is on stage. She's pivoted from a question about leadership into specifics.",
      },
      {
        speakerId: "aria",
        text: '"...and I\'ll just say — I\'ve seen what happens when leadership is claimed rather than earned. It looks like confident presentations and quiet damage."',
        emotion: "cold",
      },
      {
        speakerId: "inner-voice",
        text: "She's attacking from the stage by name-implication. Three weeks before the senior role decision. She knows you're in the room.",
        emotion: "concerned",
      },
    ],
    choices: [
      {
        id: "stand-and-respond",
        text: "Stand up. Ask a calm question.",
        tactic: "Engaging on her stage. She'll redirect, audience won't remember specifics.",
        nextSceneId: "stage-engagement",
      },
      {
        id: "stay-seated",
        text: "Stay seated. Take notes. Let it play.",
        tactic: "Discipline. The room will read composure, not capitulation.",
        nextSceneId: "post-panel-moves",
        isOptimal: true,
      },
      {
        id: "walk-out",
        text: "Stand up. Walk out visibly.",
        tactic: "High-drama exit. Memorable, but reads as emotional.",
        nextSceneId: "ending-exit-emotional",
      },
      {
        id: "tweet-real-time",
        text: "Tweet during the panel, subtly.",
        tactic: "Extending the fight to a second theater. Never good.",
        nextSceneId: "ending-second-front",
        isOptimal: false,
      },
    ],
  },

  {
    id: "stage-engagement",
    backgroundId: "office",
    mood: "danger",
    presentCharacterIds: ["aria"],
    dialog: [
      {
        speakerId: null,
        text: "You stand. Mic comes to you. Audience pivots.",
      },
      {
        speakerId: "aria",
        text: '"Oh, hi. Didn\'t see you there."',
        emotion: "smirking",
      },
      {
        speakerId: "inner-voice",
        text: "She just got what she wanted. You're now in a public exchange on her chosen topic. Every option here is her move.",
        emotion: "concerned",
      },
    ],
    nextSceneId: "ending-publicly-drawn",
  },

  {
    id: "post-panel-moves",
    backgroundId: "office",
    mood: "tense",
    presentCharacterIds: ["kaya"],
    dialog: [
      {
        speakerId: null,
        text: "The panel ends. Coffee break. Three people already come up to say 'that was weird, right?' — the audience clocked it.",
      },
      {
        speakerId: "kaya",
        text: '"You passed the first test. What\'s next?"',
        emotion: "knowing",
      },
    ],
    choices: [
      {
        id: "quiet-meeting",
        text: "Quiet meeting with the hiring committee chair. Pre-empt the smear.",
        tactic: "Direct but private. Gives them your side before Aria can reach them again.",
        nextSceneId: "hiring-meeting",
        isOptimal: true,
      },
      {
        id: "public-statement",
        text: "LinkedIn post subtweet about 'classy opponents.'",
        tactic: "Descending to her level. Observers will equate you.",
        nextSceneId: "ending-equated",
        isOptimal: false,
      },
      {
        id: "ask-network",
        text: "Text your network for intel on what Aria said after the panel.",
        tactic: "Intel first. Know what the story is before countering.",
        nextSceneId: "intel-gathered",
        isOptimal: true,
      },
      {
        id: "ignore-and-ship",
        text: "Ignore it entirely. Focus on your current project.",
        tactic: "Underrated. The role decision is three weeks out, not three months. Work is the final argument.",
        nextSceneId: "work-strategy",
      },
    ],
  },

  {
    id: "hiring-meeting",
    backgroundId: "office",
    mood: "tense",
    dialog: [
      {
        speakerId: null,
        text: "Tuesday. Twenty minutes with the committee chair. No ask, no complaint. A specific walk-through of two wins from the last six months.",
      },
      {
        speakerId: "inner-voice",
        text: "Don't mention Aria. The chair knows about the attack. Your absence of reference to it is the statement.",
        emotion: "knowing",
      },
    ],
    choices: [
      {
        id: "never-mention",
        text: "Never mention Aria. Just present the work.",
        tactic: "Elegant. Lets the chair compare 'what they showed me' with 'what she said.'",
        nextSceneId: "ending-chair-convinced",
        isOptimal: true,
      },
      {
        id: "acknowledge-elephant",
        text: '"I know you probably heard the panel. I\'m not going to address it — I just wanted to show you the actual work."',
        tactic: "Addresses and dismisses in one breath. Clean.",
        nextSceneId: "ending-chair-convinced",
        isOptimal: true,
      },
      {
        id: "defend",
        text: "Walk through why Aria's claims are wrong.",
        tactic: "You just made the meeting about her. Worst move.",
        nextSceneId: "ending-meeting-wasted",
        isOptimal: false,
      },
    ],
  },

  {
    id: "intel-gathered",
    backgroundId: "office",
    mood: "tense",
    dialog: [
      {
        speakerId: null,
        text: "By Monday you have specifics. Aria told three people post-panel that 'you should have seen their face.' Two were unimpressed. One laughed awkwardly and changed the subject.",
      },
      {
        speakerId: "inner-voice",
        text: "Her post-game was weaker than her on-stage. The trap she set didn't feed her the reaction she needed.",
        emotion: "knowing",
      },
    ],
    nextSceneId: "hiring-meeting",
  },

  {
    id: "work-strategy",
    backgroundId: "office",
    mood: "mysterious",
    dialog: [
      {
        speakerId: null,
        text: "Three weeks. You ship the biggest deliverable of the year. It goes live the day before the committee meets.",
      },
      {
        speakerId: "inner-voice",
        text: "Result: the committee has a fresh, specific, undeniable datapoint. Aria's 'confident presentations and quiet damage' line now sounds exactly like bitterness.",
        emotion: "knowing",
      },
    ],
    nextSceneId: "ending-work-closed",
  },

  // ---------------------------------------------------------------------
  // ENDINGS
  // ---------------------------------------------------------------------

  {
    id: "ending-chair-convinced",
    backgroundId: "office",
    mood: "peaceful",
    isEnding: true,
    outcomeType: "good",
    endingTitle: "Chair Convinced",
    endingSummary:
      "The twenty-minute meeting did what six months of Aria's whispers couldn't. The chair's mental model of you is now: 'specific, specific, specific.' Aria's mental model is still 'bitter character assassin.' The decision meets in two weeks. The contest was decided in that one meeting.",
    dialog: [
      {
        speakerId: "inner-voice",
        text: "One concrete meeting with the decider beats ten months of rumor mitigation.",
        emotion: "knowing",
      },
    ],
  },

  {
    id: "ending-work-closed",
    backgroundId: "office",
    mood: "peaceful",
    isEnding: true,
    outcomeType: "good",
    endingTitle: "The Work Closed It",
    endingSummary:
      "You shipped the biggest project of the year the day before the committee met. The result was front-page for your industry. Aria's panel line is now a joke in two different group chats. The senior role is yours — not because you defeated her, but because you made her attacks obsolete.",
    dialog: [
      {
        speakerId: "inner-voice",
        text: "The undeniable result is the final argument. Everything else is noise.",
        emotion: "knowing",
      },
    ],
  },

  {
    id: "ending-publicly-drawn",
    backgroundId: "office",
    mood: "danger",
    isEnding: true,
    outcomeType: "bad",
    endingTitle: "Publicly Drawn",
    endingSummary:
      "You stood up, engaged her on stage, tried to respond with dignity. No matter how you performed, the frame was hers. Observers remember 'those two had some kind of public fight at the panel.' The hiring committee now sees two people who couldn't share a room. The senior role goes to a third candidate you'd barely considered.",
    dialog: [
      {
        speakerId: "inner-voice",
        text: "She set the stage. Stepping onto it is the loss, regardless of what you say next.",
        emotion: "sad",
      },
    ],
  },

  {
    id: "ending-exit-emotional",
    backgroundId: "office",
    mood: "danger",
    isEnding: true,
    outcomeType: "bad",
    endingTitle: "Dramatic Exit",
    endingSummary:
      "You walked out visibly. The room talked about it for days — but not the way you hoped. The story became 'they couldn't handle the panel.' Aria's 'confident presentations and quiet damage' now has an opening act.",
    dialog: [
      {
        speakerId: "inner-voice",
        text: "Composed absence is one thing. Visible exit is a second story — hers.",
        emotion: "sad",
      },
    ],
  },

  {
    id: "ending-second-front",
    backgroundId: "office",
    mood: "danger",
    isEnding: true,
    outcomeType: "bad",
    endingTitle: "Opened a Second Front",
    endingSummary:
      "You tweeted during the panel. It got screenshotted. Now the fight lives in two theaters simultaneously. Twitter observers take sides, the hiring committee gets pinged about 'ongoing drama,' and the role decision stalls. Aria didn't beat you. You spread yourself too thin to win.",
    dialog: [
      {
        speakerId: "inner-voice",
        text: "Never open a second front while losing on the first.",
        emotion: "sad",
      },
    ],
  },

  {
    id: "ending-equated",
    backgroundId: "office",
    mood: "danger",
    isEnding: true,
    outcomeType: "bad",
    endingTitle: "Equated",
    endingSummary:
      "Your LinkedIn subtweet about 'classy opponents' landed as passive aggression. The community equated the two of you — 'both of them are petty now.' You lost the one advantage you had: being seen as the one who hadn't descended.",
    dialog: [
      {
        speakerId: "inner-voice",
        text: "Descending to their level costs you the height.",
        emotion: "sad",
      },
    ],
  },

  {
    id: "ending-meeting-wasted",
    backgroundId: "office",
    mood: "danger",
    isEnding: true,
    outcomeType: "bad",
    endingTitle: "Meeting Wasted",
    endingSummary:
      "You used your twenty minutes with the committee chair to defend against Aria's claims. The chair now thinks of you as the defensive one — reinforcing her core accusation that you have 'quiet damage' in the way you respond to pressure. You handed her the meeting.",
    dialog: [
      {
        speakerId: "inner-voice",
        text: "Never use an access meeting to defend. Use it to present.",
        emotion: "sad",
      },
    ],
  },
];

export const mission92: Scenario = {
  id: "mission-9-2",
  title: "The Counter-Campaign",
  tagline: "Three weeks. Public attack. Senior role at stake.",
  description:
    "Industry panel, 200 people. Aria attacks from the stage — implications, not accusations. The senior role decision is three weeks out. Every move is now visible. This is the endgame of the long game.",
  tier: "vip",
  level: 9,
  order: 2,
  estimatedMinutes: 10,
  difficulty: "advanced",
  category: "professional",
  xpReward: 425,
  badgeId: "long-game-won",
  startSceneId: "public-attack",
  tacticsLearned: [
    "Refusing the stage, even when attacked on it",
    "Quiet meetings with deciders > public rebuttal",
    "Intel before response (post-game matters)",
    "Work as the final argument",
  ],
  redFlagsTaught: [
    "Stage ambushes designed to force public exchange",
    "Second-front temptations (LinkedIn, Twitter)",
    "Descending-to-their-level as 'defense'",
    "Defense meetings that become about the attacker",
  ],
  reward: {
    id: "long-game-won",
    name: "The Long Game Won",
    description: "You outmaneuvered a six-month covert campaign without engaging it publicly.",
    unlocksScenarioId: "mission-10-1",
  },
  prerequisites: ["mission-9-1"],
  characters: [ARIA, KAYA, INNER_VOICE],
  scenes,
};

export default mission92;
