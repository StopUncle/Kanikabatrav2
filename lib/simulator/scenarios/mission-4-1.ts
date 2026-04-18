/**
 * Mission 4-1 — "The Smear"
 *
 * Level 4, order 1. Teaches counter-narrative discipline.
 * A rumor is circulating. People have already heard it. The question
 * is not whether to respond — it's HOW and TO WHOM.
 */

import type { Scenario, Scene } from "../types";
import { PRIYA, AVERY, INNER_VOICE } from "../characters";

const scenes: Scene[] = [
  {
    id: "priya-calls",
    backgroundId: "apartment",
    mood: "danger",
    immersionTrigger: "red-flag-revealed",
    presentCharacterIds: ["priya"],
    dialog: [
      {
        speakerId: "priya",
        text: '"I wouldn\'t normally tell you this. But it\'s spreading and you should know."',
        emotion: "serious",
      },
      {
        speakerId: "priya",
        text: "\"Avery's been saying you... took credit for something that wasn't yours. Specifically the coffee-shop collab thing. She's telling people you pushed her out.\"",
        emotion: "concerned",
      },
      {
        speakerId: "inner-voice",
        text: "Avery: quiet, 'nice', covert narcissist. She plants and waits. The collab story is pure fabrication.",
        emotion: "knowing",
      },
    ],
    choices: [
      {
        id: "post-public-denial",
        text: "Post a public statement on Instagram setting the record straight.",
        tactic: "You amplified the accusation to everyone who hadn't heard it yet.",
        nextSceneId: "ending-amplified",
        isOptimal: false,
      },
      {
        id: "message-avery",
        text: "DM Avery directly. Confront her.",
        tactic: "Gives her a screenshot to distort. She'll weaponize your reply.",
        nextSceneId: "avery-twists-dm",
      },
      {
        id: "ask-priya-for-intel",
        text: "\"Who is she telling? I need the map before I do anything.\"",
        tactic: "Intel first, move second. Veteran move.",
        nextSceneId: "priya-gives-map",
        isOptimal: true,
      },
      {
        id: "say-nothing",
        text: "\"Thanks. Let me sit with it.\"",
        tactic: "Neither panic nor silence forever. Buy time to think.",
        nextSceneId: "priya-offers-help",
        isOptimal: true,
      },
    ],
  },

  {
    id: "priya-gives-map",
    backgroundId: "apartment",
    mood: "tense",
    presentCharacterIds: ["priya"],
    dialog: [
      {
        speakerId: "priya",
        text: '"She\'s told Dana, Morgan, two people in our cohort, and one person from the coffee shop."',
        emotion: "knowing",
      },
      {
        speakerId: "priya",
        text: '"Morgan already believes it. Dana is pretending to. The cohort people are asking each other."',
      },
      {
        speakerId: "inner-voice",
        text: "The believers are a lost cause this week. The askers are who matters — they're checking with each other.",
        emotion: "knowing",
      },
    ],
    choices: [
      {
        id: "address-askers",
        text: "Target one-on-ones with the cohort people who are asking.",
        tactic: "Counter-narrative delivered privately to the people still calibrating.",
        nextSceneId: "counter-narrative-landed",
        isOptimal: true,
      },
      {
        id: "address-believers",
        text: "Go to Morgan and Dana first. Flip them.",
        tactic: "Wasting capital on the unconvincible.",
        nextSceneId: "ending-capital-wasted",
        isOptimal: false,
      },
      {
        id: "address-all",
        text: "Blanket response to everyone.",
        tactic: "Looks defensive, and defensive looks guilty.",
        nextSceneId: "ending-amplified",
        isOptimal: false,
      },
      {
        id: "address-nobody",
        text: "Say nothing. Let the work speak.",
        tactic: "Long-game play. Depends on whether you can afford the short-term hit.",
        nextSceneId: "silence-plays-out",
      },
    ],
  },

  {
    id: "priya-offers-help",
    backgroundId: "apartment",
    mood: "tense",
    presentCharacterIds: ["priya"],
    dialog: [
      {
        speakerId: "priya",
        text: "\"Take the night. I'll send you the list of who's heard it by morning.\"",
        emotion: "serious",
      },
      {
        speakerId: "inner-voice",
        text: "You held composure. Priya respects it. She's volunteering intel unprompted.",
        emotion: "knowing",
      },
    ],
    nextSceneId: "priya-gives-map",
  },

  {
    id: "counter-narrative-landed",
    backgroundId: "coffee-shop",
    mood: "tense",
    dialog: [
      {
        speakerId: null,
        text: "Over the next two days, you meet three cohort people separately for coffee. Not to 'clear your name' — to ask about their work.",
      },
      {
        speakerId: null,
        text: "Each conversation, the collab thing comes up naturally. You address it briefly, specifically, without heat.",
      },
      {
        speakerId: "inner-voice",
        text: "Specifics kill rumors. 'I pushed her out' can't survive 'here's the timeline with dates.'",
        emotion: "knowing",
      },
    ],
    choices: [
      {
        id: "offer-receipts",
        text: "Show one person the actual email thread from the collab.",
        tactic: "One receipt, privately shared, quietly passes through the network.",
        nextSceneId: "ending-narrative-flipped",
        isOptimal: true,
      },
      {
        id: "stay-verbal",
        text: "Stay verbal. Don't pull out phones.",
        tactic: "Works if they already trust you; weaker with the calibrators.",
        nextSceneId: "ending-partial-flip",
      },
      {
        id: "trash-avery",
        text: "Mention Avery's history of this.",
        tactic: "Counter-smear looks like smear. Don't.",
        nextSceneId: "ending-mutual-destruction",
        isOptimal: false,
      },
    ],
  },

  {
    id: "silence-plays-out",
    backgroundId: "apartment",
    mood: "mysterious",
    dialog: [
      {
        speakerId: null,
        text: "Three weeks. You do nothing. You work. You ship. People with eyes see what's being done.",
      },
      {
        speakerId: null,
        text: "Avery keeps telling the story. Each retelling, it sounds more like something she wrote than something that happened.",
      },
      {
        speakerId: "inner-voice",
        text: "Rumors have a half-life. If you don't refresh them with defense, they decay.",
        emotion: "knowing",
      },
    ],
    choices: [
      {
        id: "stay-silent-permanent",
        text: "Continue saying nothing. Ever.",
        tactic: "Slow-burn win. Takes a season; costs some short-term perception.",
        nextSceneId: "ending-silence-wins",
        isOptimal: true,
      },
      {
        id: "break-silence-later",
        text: "After a month, mention the real timeline to one person who asks.",
        tactic: "One crisp fact, late, cleans up the last 10%.",
        nextSceneId: "ending-silence-wins",
        isOptimal: true,
      },
      {
        id: "lose-nerve",
        text: "Actually, panic. Post a public version of events.",
        tactic: "Threw away a month of silence for a moment's relief.",
        nextSceneId: "ending-amplified",
        isOptimal: false,
      },
    ],
  },

  {
    id: "avery-twists-dm",
    backgroundId: "text-screen",
    mood: "danger",
    presentCharacterIds: ["avery"],
    dialog: [
      {
        speakerId: null,
        text: "Two hours after you DM, screenshots of your message appear in a group chat you're not in.",
      },
      {
        speakerId: null,
        text: "AVERY (shared screenshot): \"Look how aggressive they got. I was just trying to tell people what happened.\"",
      },
      {
        speakerId: "inner-voice",
        text: "She baited a reply to weaponize. The reply was the plan.",
        emotion: "concerned",
      },
    ],
    nextSceneId: "ending-baited",
  },

  // ---------------------------------------------------------------------
  // ENDINGS
  // ---------------------------------------------------------------------

  {
    id: "ending-narrative-flipped",
    backgroundId: "coffee-shop",
    mood: "peaceful",
    isEnding: true,
    outcomeType: "good",
    endingTitle: "Receipts, Quietly",
    endingSummary:
      "One email thread, shown to one calibrator, over coffee. That person now has the story and will share it when it's relevant. Avery's version has a mortal injury: a specific, dated contradiction that any curious person can hear if they ask.",
    dialog: [
      {
        speakerId: "inner-voice",
        text: "The counter to a story is not another story. It's a specific, dated fact delivered to the right person once.",
        emotion: "knowing",
      },
    ],
  },

  {
    id: "ending-silence-wins",
    backgroundId: "apartment",
    mood: "peaceful",
    isEnding: true,
    outcomeType: "good",
    endingTitle: "The Long Silence",
    endingSummary:
      "A month without a word of defense. The rumor faded because you starved it of reaction. The people who were going to believe Avery believed her anyway; the people who needed evidence noticed its absence. Your work kept shipping. That's the only argument that lasted.",
    dialog: [
      {
        speakerId: "inner-voice",
        text: "The loudest defense is the work that kept happening.",
        emotion: "knowing",
      },
    ],
  },

  {
    id: "ending-partial-flip",
    backgroundId: "apartment",
    mood: "tense",
    isEnding: true,
    outcomeType: "neutral",
    endingTitle: "Partial Flip",
    endingSummary:
      "You held composure and talked to the right people, but without a specific receipt the rumor has ambiguous legs. Half the cohort trusts you fully; half are 'not sure'. You did everything right except close the deal.",
    dialog: [
      {
        speakerId: "inner-voice",
        text: "Credibility without specifics ages faster than you think.",
        emotion: "neutral",
      },
    ],
  },

  {
    id: "ending-amplified",
    backgroundId: "apartment",
    mood: "danger",
    isEnding: true,
    outcomeType: "bad",
    failureBlogSlug: "ghostlighting-when-they-ghost-then-gaslight",
    failureBlogTitle: "Ghostlighting: When They Ghost Then Gaslight",
    endingTitle: "You Broadcast the Smear",
    endingSummary:
      "A public statement told everyone who HADN'T heard the rumor that there was a rumor to be told. Reach multiplied. 'Why are they so defensive?' is now the follow-up question. You became the best marketing Avery's story ever got.",
    dialog: [
      {
        speakerId: "inner-voice",
        text: "Never answer a whisper with a megaphone.",
        emotion: "sad",
      },
    ],
  },

  {
    id: "ending-capital-wasted",
    backgroundId: "apartment",
    mood: "tense",
    isEnding: true,
    outcomeType: "bad",
    failureBlogSlug: "architecture-of-control-how-emotional-dependency-is-built",
    failureBlogTitle: "Architecture of Control: How Emotional Dependency Is Built",
    endingTitle: "Capital Wasted",
    endingSummary:
      "You spent three conversations trying to flip Morgan and Dana. Neither moved. Both added 'and then they tried to convince me' to the story. You spent your relational capital with the wrong audience.",
    dialog: [
      {
        speakerId: "inner-voice",
        text: "Don't litigate with the converted or the committed. Speak to the calibrating.",
        emotion: "sad",
      },
    ],
  },

  {
    id: "ending-mutual-destruction",
    backgroundId: "coffee-shop",
    mood: "danger",
    isEnding: true,
    outcomeType: "bad",
    failureBlogSlug: "narcissist-playbook-how-they-actually-operate",
    failureBlogTitle: "Narcissist Playbook: How They Actually Operate",
    endingTitle: "Two Smears Now",
    endingSummary:
      "You countered her smear with one about her. Observers now see 'two people trash-talking each other' — and split the difference. Your story is no more credible, and you've become part of the same mess you were trying to rise above.",
    dialog: [
      {
        speakerId: "inner-voice",
        text: "A countersmear is a smear. Nobody distinguishes later.",
        emotion: "sad",
      },
    ],
  },

  {
    id: "ending-baited",
    backgroundId: "text-screen",
    mood: "danger",
    isEnding: true,
    outcomeType: "bad",
    failureBlogSlug: "ghostlighting-when-they-ghost-then-gaslight",
    failureBlogTitle: "Ghostlighting: When They Ghost Then Gaslight",
    endingTitle: "The Reply Was the Bait",
    endingSummary:
      "Your DM to Avery was weaponized in under two hours. The screenshot makes you look aggressive; Avery looks calmly mistreated. You handed her the final piece of the campaign she'd been running for a week.",
    dialog: [
      {
        speakerId: "inner-voice",
        text: "Never write something to a covert narcissist that you'd mind seeing screenshotted.",
        emotion: "sad",
      },
    ],
  },
];

export const mission41: Scenario = {
  id: "mission-4-1",
  title: "The Smear",
  tagline: "Don't answer a whisper with a megaphone.",
  description:
    "Avery has been telling people you pushed her out of a collab. It's false and she knows it. The rumor has a week's head start. Who do you talk to first — and what exactly do you say?",
  tier: "premium",
  level: 4,
  order: 1,
  estimatedMinutes: 10,
  difficulty: "intermediate",
  category: "gaslighter",
  xpReward: 175,
  badgeId: "smear-survived",
  startSceneId: "priya-calls",
  tacticsLearned: [
    "Mapping who's heard it before responding",
    "Targeting calibrators, not believers",
    "One specific receipt beats ten general denials",
    "Silence as a counter-strategy",
  ],
  redFlagsTaught: [
    "Covert narcissists plant and wait",
    "DMs to narcissists become their screenshots",
    "Public denials amplify whispers",
    "Countersmears dissolve your credibility",
  ],
  reward: {
    id: "smear-survived",
    name: "Smear Survived",
    description: "You found the right audience and spoke only to them.",
    unlocksScenarioId: "mission-4-2",
  },
  prerequisites: ["mission-3-2"],
  characters: [PRIYA, AVERY, INNER_VOICE],
  scenes,
};

export default mission41;
