/**
 * Mission 9-2 — "The Counter-Campaign"
 *
 * Level 9, order 2. VIP tier.
 * Aria escalates — a direct public attack after months of covert
 * work. The senior role is three weeks out. This is the endgame of
 * the long game. Every move is visible.
 *
 * v2 (2026-04-19): expanded the middle. Added Act-1 panel
 * establishing (the room, the moment Aria pivots, your phone going
 * still), middle beats for each path (the awkward laughs after
 * stage engagement, the screenshot landing 8 minutes later, the
 * weeks-pass discipline montage). Seven endings unchanged.
 *
 * Total scenes: 13 → 22
 * Avg dialog lines per playthrough: ~8 → ~22
 */

import type { Scenario, Scene } from "../types";
import { ARIA, KAYA, INNER_VOICE } from "../characters";

const scenes: Scene[] = [
  // ===================================================================
  // ACT 1 — the panel, the pivot, the moment your phone goes still
  // ===================================================================

  {
    id: "public-attack",
    backgroundId: "office",
    mood: "danger",
    presentCharacterIds: ["aria", "kaya"],
    dialog: [
      {
        speakerId: null,
        text: "Industry panel. Five hundred-seat hall, two hundred actually full. You're in row eleven, aisle seat, half-listening with your phone face-down on your thigh.",
      },
      {
        speakerId: null,
        text: "Aria is on stage in the third chair. The moderator just asked a generic question about leadership. Aria pauses three beats too long before answering — the kind of pause that means the answer was prepared and the question was the door.",
      },
      {
        speakerId: "aria",
        text: '"...and I\'ll just say — I\'ve seen what happens when leadership is claimed rather than earned. It looks like confident presentations and quiet damage."',
        emotion: "cold",
      },
      {
        speakerId: null,
        text: "She doesn't look at row eleven. She doesn't have to. The phrasing is precise enough that anyone who knows the politics of the room can map it in six seconds.",
      },
      {
        speakerId: null,
        text: "Your phone, face-down on your thigh, vibrates twice in quick succession. Then a third time. Two people in your network just saw what you saw and started typing.",
      },
      {
        speakerId: "inner-voice",
        text: "She's attacking from the stage by name-implication. Three weeks before the senior role decision. She knows you're in the room. She knows you can't respond from the floor without making it a fight.",
        emotion: "concerned",
      },
      {
        speakerId: "inner-voice",
        text: "The whole panel just became a test of what you do in the next ninety seconds. Whatever it is will be told back to people who weren't here, accurately or otherwise.",
        emotion: "knowing",
      },
    ],
    choices: [
      {
        id: "stand-and-respond",
        text: "Stand up. Ask a calm question.",
        tactic:
          "Engaging on her stage. She'll redirect, audience won't remember specifics.",
        nextSceneId: "stage-engagement",
      },
      {
        id: "stay-seated",
        text: "Stay seated. Take notes. Let it play.",
        tactic:
          "Discipline. The room will read composure, not capitulation.",
        nextSceneId: "panel-finishes",
        isOptimal: true,
      },
      {
        id: "walk-out",
        text: "Stand up. Walk out visibly.",
        tactic: "High-drama exit. Memorable, but reads as emotional.",
        nextSceneId: "walk-out-corridor",
      },
      {
        id: "tweet-real-time",
        text: "Tweet during the panel, subtly.",
        tactic: "Extending the fight to a second theater. Never good.",
        nextSceneId: "tweet-screenshots",
        isOptimal: false,
      },
    ],
  },

  // ===================================================================
  // ACT 2A — STAND AND RESPOND (the trap path)
  // ===================================================================

  {
    id: "stage-engagement",
    backgroundId: "office",
    mood: "danger",
    presentCharacterIds: ["aria"],
    dialog: [
      {
        speakerId: null,
        text: "You stand. The mic runner sees you, jogs over. Two hundred heads pivot in the same beat. You feel the room re-orient around the question of who you are and why you're standing.",
      },
      {
        speakerId: "aria",
        text: '"Oh, hi. Didn\'t see you there."',
        emotion: "smirking",
      },
      {
        speakerId: null,
        text: "The line lands. Two scattered laughs from the back rows. Even the moderator's smile is tight — she's calculating whether to intervene or let it run, and she lets it run.",
      },
      {
        speakerId: null,
        text: "You ask your calm question. Aria gives a calm answer that wraps neatly back to her implication. The audience hears a polite exchange. The implication becomes the takeaway by virtue of having been confirmed-on-record by your standing up.",
      },
      {
        speakerId: "inner-voice",
        text: "She just got what she wanted. You're now in a public exchange on her chosen topic. The polite frame is the worst frame — it lets the implication travel freely under the cover of professionalism.",
        emotion: "concerned",
      },
    ],
    nextSceneId: "ending-publicly-drawn",
  },

  // ===================================================================
  // ACT 2B — STAY SEATED (optimal path)
  // ===================================================================

  {
    id: "panel-finishes",
    backgroundId: "office",
    mood: "tense",
    dialog: [
      {
        speakerId: null,
        text: "You don't move. You write something in your notebook — anything, your own to-do list, doesn't matter — so the body language reads 'taking notes' instead of 'frozen'.",
      },
      {
        speakerId: null,
        text: "The panel runs another twenty-eight minutes. You sit through every one of them with the same expression. Aria glances at row eleven once. You don't look up.",
      },
      {
        speakerId: "inner-voice",
        text: "The discipline is the message. Anyone watching for your reaction is now writing a different story than the one she planted.",
        emotion: "knowing",
      },
    ],
    nextSceneId: "post-panel-moves",
  },
  {
    id: "post-panel-moves",
    backgroundId: "office",
    mood: "tense",
    presentCharacterIds: ["kaya"],
    dialog: [
      {
        speakerId: null,
        text: "Coffee break. The hall empties into the foyer. Three people come up to you in five minutes — different people, same opening sentence: 'that was weird, right?' The audience clocked the pivot.",
      },
      {
        speakerId: null,
        text: "Kaya finds you near the espresso machine. She doesn't ask if you're okay. She asks something better.",
      },
      {
        speakerId: "kaya",
        text: '"You passed the first test. What\'s next?"',
        emotion: "knowing",
      },
      {
        speakerId: "inner-voice",
        text: "She's saying the test is the response, not the attack. The role is three weeks out. You have one major move and a handful of small ones available — pick which is the major.",
        emotion: "knowing",
      },
    ],
    choices: [
      {
        id: "quiet-meeting",
        text:
          "Quiet meeting with the hiring committee chair. Pre-empt the smear.",
        tactic:
          "Direct but private. Gives them your side before Aria can reach them again.",
        nextSceneId: "hiring-meeting",
        isOptimal: true,
      },
      {
        id: "public-statement",
        text: "LinkedIn post subtweet about 'classy opponents.'",
        tactic:
          "Descending to her level. Observers will equate you.",
        nextSceneId: "linkedin-comments-arrive",
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
        tactic:
          "Underrated. The role decision is three weeks out, not three months. Work is the final argument.",
        nextSceneId: "work-strategy",
      },
    ],
  },

  // --- stay-seated → quiet-meeting middle (already deep) ---
  {
    id: "hiring-meeting",
    backgroundId: "office",
    mood: "tense",
    dialog: [
      {
        speakerId: null,
        text: "Tuesday. Twenty minutes with the committee chair. No ask, no complaint. A specific walk-through of two wins from the last six months — the names of the clients, the numbers, the one decision in each that wasn't obvious.",
      },
      {
        speakerId: null,
        text: "She listens, asks two questions, takes one note. The note isn't about the wins. You see her write 'composure' and underline it.",
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
        tactic:
          "Elegant. Lets the chair compare 'what they showed me' with 'what she said.'",
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

  // --- stay-seated → ask-network middle ---
  {
    id: "intel-gathered",
    backgroundId: "office",
    mood: "tense",
    dialog: [
      {
        speakerId: null,
        text: "By Monday you have specifics. Aria stayed at the venue for an extra forty minutes after the panel, working three different conversation circles. She used the line three times.",
      },
      {
        speakerId: null,
        text: "Two of the three responses were unimpressed — one of them politely asked if she was talking about you and changed the subject when she wouldn't say. The third laughed awkwardly and left the conversation a minute later.",
      },
      {
        speakerId: "inner-voice",
        text: "Her post-game was weaker than her on-stage. The trap she set didn't feed her the reaction she needed. The audience filled in the gap with their own read — and it wasn't the read she wanted.",
        emotion: "knowing",
      },
      {
        speakerId: "inner-voice",
        text: "Now you know what story is actually circulating. The hiring meeting can be calibrated against that — you're not preempting a smear, you're confirming a pattern the chair has probably already noticed.",
        emotion: "knowing",
      },
    ],
    nextSceneId: "hiring-meeting",
  },

  // --- stay-seated → ignore-and-ship middle (the discipline montage) ---
  {
    id: "work-strategy",
    backgroundId: "office",
    mood: "mysterious",
    dialog: [
      {
        speakerId: null,
        text: "Three weeks. You don't tweet. You don't text the network. You don't ask Kaya for advice. You ship.",
      },
      {
        speakerId: null,
        text: "Week one: the spec lands. Week two: two of your team push back on the central decision; you hold. Week three: the deliverable goes live the day before the committee meets. Industry press picks it up the morning of.",
      },
      {
        speakerId: "inner-voice",
        text: "Result: the committee has a fresh, specific, undeniable datapoint sitting in their inbox the morning they read your file. Aria's 'confident presentations and quiet damage' line now sounds exactly like bitterness — because the alternative explanation is sitting in front of them with a date stamp.",
        emotion: "knowing",
      },
    ],
    nextSceneId: "ending-work-closed",
  },

  // --- stay-seated → public-statement middle ---
  {
    id: "linkedin-comments-arrive",
    backgroundId: "apartment",
    mood: "danger",
    dialog: [
      {
        speakerId: null,
        text: "You hit post. The 'classy opponents' line lands as passive aggression in the first comment within nine minutes.",
      },
      {
        speakerId: null,
        text: "By the next morning the post has 47 reactions and 12 comments. The comments are split — some agree, some are 'who is this about', two are people who used to be in your camp politely asking you to delete it.",
      },
      {
        speakerId: null,
        text: "The colleague whose opinion you actually trust unfollows you that afternoon. Doesn't message. Just unfollows.",
      },
      {
        speakerId: "inner-voice",
        text: "Descending to her level cost you the height. The advantage you spent six months building — being the one who hadn't engaged — was spent on a single post in nine minutes.",
        emotion: "sad",
      },
    ],
    nextSceneId: "ending-equated",
  },

  // ===================================================================
  // ACT 2C — WALK OUT
  // ===================================================================

  {
    id: "walk-out-corridor",
    backgroundId: "office",
    mood: "danger",
    dialog: [
      {
        speakerId: null,
        text: "You stand. Two hundred heads register the movement before they register what it means. You walk down the row, up the aisle, out the back doors. Your shoes are loud on the wood floor; the doors thunk shut behind you.",
      },
      {
        speakerId: null,
        text: "By the time you're in the foyer, the moderator is moving on. By the time you're in the lobby, your phone has eleven notifications. By the time you're in the parking structure, a tweet about 'someone walking out of the panel' has 800 likes.",
      },
      {
        speakerId: "inner-voice",
        text: "You wanted to read as composed absence. The room read it as 'they couldn't take it.' Your exit became the second act of her line — the visible damage, on schedule.",
        emotion: "sad",
      },
    ],
    nextSceneId: "ending-exit-emotional",
  },

  // ===================================================================
  // ACT 2D — TWEET REAL TIME
  // ===================================================================

  {
    id: "tweet-screenshots",
    backgroundId: "office",
    mood: "danger",
    dialog: [
      {
        speakerId: null,
        text: "You tap it out under the seat in front of you. Subtle, you think. Plausibly about something else, you think. Hit post.",
      },
      {
        speakerId: null,
        text: "Eight minutes later, while the panel is still running, the screenshot appears in two industry group chats. By the time the panel ends, it's on the timeline of a journalist who covers your space.",
      },
      {
        speakerId: null,
        text: "The journalist's quote-tweet doesn't take a side. It just frames it as 'panel drama' and links to Aria's earlier comments about the senior-role process. The two stories are now stapled together.",
      },
      {
        speakerId: "inner-voice",
        text: "You opened a second front while losing on the first. The fight now lives in two theaters; your side has half the attention in each. Aria didn't beat you. You spread yourself too thin to win.",
        emotion: "sad",
      },
    ],
    nextSceneId: "ending-second-front",
  },

  // ===================================================================
  // ENDINGS (unchanged from v1)
  // ===================================================================

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
    failureBlogSlug: "doctrine-of-cold-your-new-dating-operating-system",
    failureBlogTitle: "The Doctrine of Cold",
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
    failureBlogSlug: "permanent-ghost-protocol-how-to-disappear-and-haunt-him-forever",
    failureBlogTitle: "The Permanent Ghost Protocol",
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
    failureBlogSlug: "apex-predator-loyalty-what-sociopathic-love-looks-like",
    failureBlogTitle: "Apex Predator Loyalty: What Sociopathic Love Looks Like",
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
    failureBlogSlug: "architecture-of-control-how-emotional-dependency-is-built",
    failureBlogTitle: "Architecture of Control: How Emotional Dependency Is Built",
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
    failureBlogSlug: "permanent-ghost-protocol-how-to-disappear-and-haunt-him-forever",
    failureBlogTitle: "The Permanent Ghost Protocol",
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
  estimatedMinutes: 12,
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
    "Discipline through three weeks of not-engaging",
  ],
  redFlagsTaught: [
    "Stage ambushes designed to force public exchange",
    "Second-front temptations (LinkedIn, Twitter)",
    "Descending-to-their-level as 'defense'",
    "Defense meetings that become about the attacker",
    "Visible exit as a second-act gift to the attacker",
  ],
  reward: {
    id: "long-game-won",
    name: "The Long Game Won",
    description:
      "You outmaneuvered a six-month covert campaign without engaging it publicly.",
    unlocksScenarioId: "mission-10-1",
  },
  prerequisites: ["mission-9-1"],
  characters: [ARIA, KAYA, INNER_VOICE],
  scenes,
};

export default mission92;
