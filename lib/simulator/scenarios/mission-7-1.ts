/**
 * Mission 7-1 — "The Rotation"
 *
 * Level 7, order 1. Offensive dating: managing multiple interests
 * without being dishonest — and without becoming what you used to
 * fear. Teaches calibrated vulnerability, non-chasing, and
 * identifying who deserves escalation.
 */

import type { Scenario, Scene } from "../types";
import { ELIAS, NOVA, PRIYA, INNER_VOICE } from "../characters";

const scenes: Scene[] = [
  {
    id: "sunday-phone",
    backgroundId: "apartment",
    mood: "peaceful",
    dialog: [
      {
        speakerId: null,
        text: "Sunday morning. Coffee. Your phone has two messages from people you've been seeing.",
      },
      {
        speakerId: null,
        text: 'ELIAS: "been thinking about you. free tuesday?"',
      },
      {
        speakerId: null,
        text: 'NOVA: "hey — wanted to ask about wednesday without all the ambiguity of \'if you\'re free\'. are you?"',
      },
      {
        speakerId: "inner-voice",
        text: "One avoidant pattern, warm then distant. One secure person asking a clean question. Different energies. Different playbooks.",
        emotion: "knowing",
      },
    ],
    choices: [
      {
        id: "reply-elias-first",
        text: "Reply to Elias first — he messaged first.",
        tactic: "Chronological priority. Not strategic — you're reacting.",
        nextSceneId: "elias-thread",
      },
      {
        id: "reply-nova-first",
        text: "Reply to Nova first — the clearer ask deserves the clearer response.",
        tactic: "Reward direct communication with direct communication.",
        nextSceneId: "nova-thread",
        isOptimal: true,
      },
      {
        id: "both-warm",
        text: "Reply to both, warm, non-committal.",
        tactic: "Keeping the rotation balanced. Neither feels prioritized.",
        nextSceneId: "both-thread-later",
      },
      {
        id: "priya-first",
        text: "Neither. Text Priya — think it through first.",
        tactic: "Consulting a veteran before moving. Good instinct.",
        nextSceneId: "priya-advises",
        isOptimal: true,
      },
    ],
  },

  {
    id: "priya-advises",
    backgroundId: "apartment",
    mood: "peaceful",
    presentCharacterIds: ["priya"],
    dialog: [
      {
        speakerId: "priya",
        text: '"Tell me what each one does when you DON\'T reply for 48 hours."',
        emotion: "knowing",
      },
      {
        speakerId: "inner-voice",
        text: "Sharp diagnostic. Behavior under absence is the truest signal.",
        emotion: "knowing",
      },
    ],
    choices: [
      {
        id: "name-patterns",
        text: '"Elias doubles down or disappears. Nova asks once, moves on if no reply."',
        tactic: "You've observed accurately. Now act on it.",
        nextSceneId: "priya-crystallizes",
        isOptimal: true,
      },
      {
        id: "defend-elias",
        text: '"Elias is just... complicated."',
        tactic: "Defending a pattern is the first sign you're attached to it.",
        nextSceneId: "priya-challenges",
      },
      {
        id: "admit-unsure",
        text: '"Honestly? I haven\'t tested it. I always reply inside an hour."',
        tactic: "Noticing your own pattern first. That's the start of changing it.",
        nextSceneId: "priya-crystallizes",
        isOptimal: true,
      },
      {
        id: "ask-priya-do",
        text: '"What would YOU do — if you were me, with these two?"',
        tactic: "Skip the diagnosis, ask for the decision. Priya's a shortcut you've earned the right to use.",
        nextSceneId: "priya-crystallizes",
      },
    ],
  },

  {
    id: "priya-crystallizes",
    backgroundId: "apartment",
    mood: "peaceful",
    presentCharacterIds: ["priya"],
    dialog: [
      {
        speakerId: "priya",
        text: '"So one is running a pattern on you, and one is treating you like an adult. You don\'t owe them equal time."',
        emotion: "serious",
      },
      {
        speakerId: "priya",
        text: '"The rotation isn\'t balance. It\'s investment proportional to evidence."',
        emotion: "knowing",
      },
    ],
    nextSceneId: "nova-thread",
  },

  {
    id: "priya-challenges",
    backgroundId: "apartment",
    mood: "tense",
    presentCharacterIds: ["priya"],
    dialog: [
      {
        speakerId: "priya",
        text: '"Complicated is vocabulary people use when they don\'t want to name a pattern."',
        emotion: "serious",
      },
      {
        speakerId: "priya",
        text: '"Is he complicated, or is he a person whose behavior you\'re constantly translating for yourself?"',
        emotion: "knowing",
      },
    ],
    nextSceneId: "nova-thread",
  },

  {
    id: "nova-thread",
    backgroundId: "text-screen",
    mood: "peaceful",
    dialog: [
      {
        speakerId: null,
        text: "You draft a reply to Nova first.",
      },
    ],
    choices: [
      {
        id: "nova-direct-yes",
        text: '"Yes, wednesday works. 7pm?"',
        tactic: "Match their directness. Secure meets secure.",
        nextSceneId: "nova-confirms",
        isOptimal: true,
      },
      {
        id: "nova-maybe",
        text: '"maybe. i\'ll let u know closer"',
        tactic: "Playing hard to get with someone who already respects you is pointless.",
        nextSceneId: "nova-clarifies",
        isOptimal: false,
      },
      {
        id: "nova-ask-more",
        text: '"tentative yes — what were you thinking?"',
        tactic: "Warm engagement. Soft but real.",
        nextSceneId: "nova-plans",
      },
    ],
  },

  {
    id: "nova-confirms",
    backgroundId: "text-screen",
    mood: "peaceful",
    dialog: [
      {
        speakerId: null,
        text: 'NOVA: "perfect. that ramen place on 4th, or somewhere new?"',
      },
      {
        speakerId: "inner-voice",
        text: "Plan-focused, low-drama. Not performing scarcity. Not testing you. Just making a plan.",
        emotion: "knowing",
      },
    ],
    nextSceneId: "elias-problem",
  },

  {
    id: "nova-clarifies",
    backgroundId: "text-screen",
    mood: "tense",
    dialog: [
      {
        speakerId: null,
        text: "NOVA: \"okay — let me know by tomorrow so I can plan my week. take care.\"",
      },
      {
        speakerId: "inner-voice",
        text: "Cleanly enforced a deadline. You just met someone who won't wait on your vagueness. Don't fumble it.",
        emotion: "knowing",
      },
    ],
    nextSceneId: "elias-problem",
  },

  {
    id: "nova-plans",
    backgroundId: "text-screen",
    mood: "peaceful",
    dialog: [
      {
        speakerId: null,
        text: 'NOVA: "walk, food, a bar I want to try. in that order. no pressure."',
      },
    ],
    nextSceneId: "elias-problem",
  },

  {
    id: "elias-problem",
    backgroundId: "text-screen",
    mood: "tense",
    dialog: [
      {
        speakerId: null,
        text: 'Back to Elias\'s "free tuesday?" text, sitting unanswered.',
      },
      {
        speakerId: "inner-voice",
        text: "'Been thinking about you' is warmth without weight. 'Free tuesday?' is a question he'll bail on Tuesday morning. History says so.",
        emotion: "knowing",
      },
    ],
    choices: [
      {
        id: "say-yes-again",
        text: '"yeah, tuesday works. 7?"',
        tactic: "You just volunteered to be canceled on again.",
        nextSceneId: "elias-cancels",
        isOptimal: false,
      },
      {
        id: "counter-with-friday",
        text: '"tuesday\'s booked. friday?"',
        tactic: "Move his day. Tests if he wanted YOU or just filled a slot.",
        nextSceneId: "elias-responds",
        isOptimal: true,
      },
      {
        id: "be-direct",
        text: '"the last two plans fell through. i\'d want a plan we\'ll actually keep this time."',
        tactic: "Name the pattern. If he's capable, he'll rise. If not, you find out now.",
        nextSceneId: "elias-responds-to-challenge",
        isOptimal: true,
      },
      {
        id: "ghost-him",
        text: "Don't reply. Let it die.",
        tactic: "Ghosting is what he does to you. Don't become it.",
        nextSceneId: "ending-became-him",
        isOptimal: false,
      },
    ],
  },

  {
    id: "elias-cancels",
    backgroundId: "text-screen",
    mood: "danger",
    dialog: [
      {
        speakerId: null,
        text: "Tuesday 4:17pm. A text.",
      },
      {
        speakerId: null,
        text: 'ELIAS: "hey sorry crazy week, rain check?"',
      },
      {
        speakerId: "inner-voice",
        text: "Third time this pattern. The pattern is not 'crazy week.' The pattern is him.",
        emotion: "concerned",
      },
    ],
    choices: [
      {
        id: "rain-check-okay",
        text: '"no worries, let me know when"',
        tactic: "You reinforced the pattern. Next cancellation comes quicker.",
        nextSceneId: "ending-rotation-failed",
        isOptimal: false,
      },
      {
        id: "close-door",
        text: '"i won\'t be rescheduling. good luck with everything."',
        tactic: "Clean cut. The third cancellation is the sign.",
        nextSceneId: "ending-rotation-clean",
        isOptimal: true,
      },
      {
        id: "honest-truth",
        text: '"this is the third one. i don\'t think we want the same thing. i hope you figure out what you want."',
        tactic: "Naming the pattern on the way out. Graceful.",
        nextSceneId: "ending-rotation-clean",
        isOptimal: true,
      },
    ],
  },

  {
    id: "elias-responds",
    backgroundId: "text-screen",
    mood: "tense",
    dialog: [
      {
        speakerId: null,
        text: '24 hours of silence. Then —',
      },
      {
        speakerId: null,
        text: 'ELIAS: "friday\'s tough. maybe next week?"',
      },
      {
        speakerId: "inner-voice",
        text: "He moved your date instead of committing. This is how avoidants confirm what they are.",
        emotion: "knowing",
      },
    ],
    nextSceneId: "elias-problem-endstate",
  },

  {
    id: "elias-responds-to-challenge",
    backgroundId: "text-screen",
    mood: "tense",
    dialog: [
      {
        speakerId: null,
        text: "He takes 9 hours to respond.",
      },
      {
        speakerId: null,
        text: 'ELIAS: "fair. i\'ve been flaky. can we do wednesday, same place as last time, 8pm?"',
      },
      {
        speakerId: "inner-voice",
        text: "He named it back. Gave a concrete plan. This might be a real rise. Might also be a one-time recovery before reverting. Watch it.",
        emotion: "knowing",
      },
    ],
    choices: [
      {
        id: "accept-with-warmth",
        text: '"wednesday 8 works. see you then."',
        tactic: "Accept the rise, conditional on execution. Fair test.",
        nextSceneId: "ending-calibrated-test",
        isOptimal: true,
      },
      {
        id: "close-anyway",
        text: "\"I appreciate that. Honestly — I'm not in a place to start over. Take care.\"",
        tactic: "Exit even on the rise. Valid if the pattern already cost too much.",
        nextSceneId: "ending-rotation-clean",
      },
      {
        id: "cooler-tone",
        text: '"wednesday 8. confirm the day of."',
        tactic: "Accept, but with a confirmation gate. The confirmation test is the real diagnostic.",
        nextSceneId: "ending-calibrated-test",
        isOptimal: true,
      },
      {
        id: "wait-and-see",
        text: "Wait 4 hours before replying. Then just: \"works.\"",
        tactic: "Match his cadence. You're no longer the reliable one; the pattern is now symmetric.",
        nextSceneId: "ending-calibrated-test",
      },
    ],
  },

  {
    id: "elias-problem-endstate",
    backgroundId: "text-screen",
    mood: "danger",
    dialog: [
      {
        speakerId: "inner-voice",
        text: "Three attempts to plan. Three moves to later. Not scheduling. Drifting.",
        emotion: "concerned",
      },
    ],
    nextSceneId: "ending-rotation-failed",
  },

  {
    id: "both-thread-later",
    backgroundId: "text-screen",
    mood: "peaceful",
    dialog: [
      {
        speakerId: null,
        text: "You reply to both warmly, non-committally. Both respond within an hour.",
      },
      {
        speakerId: null,
        text: "NOVA: \"sounds good. let me know when.\"",
      },
      {
        speakerId: null,
        text: 'ELIAS: "yeah totally whenever 🙏"',
      },
      {
        speakerId: "inner-voice",
        text: "Same text from both, but two very different intentions behind them. Your default non-commit is indistinguishable to you right now.",
        emotion: "knowing",
      },
    ],
    nextSceneId: "nova-thread",
  },

  {
    id: "elias-thread",
    backgroundId: "text-screen",
    mood: "tense",
    dialog: [
      {
        speakerId: null,
        text: "You replied to Elias first. Nova's message sits for three more hours.",
      },
      {
        speakerId: "inner-voice",
        text: "The person running the pattern got your time first. The person doing it right got less.",
        emotion: "concerned",
      },
    ],
    nextSceneId: "nova-thread",
  },

  // ---------------------------------------------------------------------
  // ENDINGS
  // ---------------------------------------------------------------------

  {
    id: "ending-calibrated-test",
    backgroundId: "apartment",
    mood: "peaceful",
    isEnding: true,
    outcomeType: "good",
    endingTitle: "The Calibrated Test",
    endingSummary:
      "You named the pattern. He rose — a concrete plan, specific time, specific place. You accepted conditional on execution. Wednesday either confirms him as capable of rising, or confirms the pattern. Either way you find out. You also locked in dinner Wednesday with Nova. Rotation = investment proportional to evidence.",
    dialog: [
      {
        speakerId: "inner-voice",
        text: "A rotation is not a balancing act. It's an evidence-weighting system.",
        emotion: "knowing",
      },
    ],
  },

  {
    id: "ending-rotation-clean",
    backgroundId: "apartment",
    mood: "peaceful",
    isEnding: true,
    outcomeType: "good",
    endingTitle: "Clean Close",
    endingSummary:
      "You closed the door on the pattern, named it gracefully on the way out. No drama, no hedging, no 'we should still be friends' trap. Now your calendar has room for people who show up. Nova is one. The next one will be more interesting because the first one is gone.",
    dialog: [
      {
        speakerId: "inner-voice",
        text: "Closing a door doesn't make you cold. It makes the open doors more useful.",
        emotion: "knowing",
      },
    ],
  },

  {
    id: "ending-rotation-failed",
    backgroundId: "apartment",
    mood: "danger",
    isEnding: true,
    outcomeType: "bad",
    failureBlogSlug: "avoidant-defence-system-why-they-pull-away",
    failureBlogTitle: "The Avoidant Defence System: Why They Pull Away",
    endingTitle: "You Funded the Pattern",
    endingSummary:
      "He canceled again. You said 'no worries.' The subscription renews monthly — a flurry of warmth, a week of silence, a cancellation, a chapter-break apology, repeat. He'll keep doing this because you keep receiving it. Nova will find someone direct. You'll be waiting for a text that doesn't come.",
    dialog: [
      {
        speakerId: "inner-voice",
        text: "Every 'no worries' is a subscription. Cancel yours.",
        emotion: "sad",
      },
    ],
  },

  {
    id: "ending-became-him",
    backgroundId: "apartment",
    mood: "tense",
    isEnding: true,
    outcomeType: "bad",
    failureBlogSlug: "reading-attachment-style-from-texts",
    failureBlogTitle: "Reading Attachment Style from Texts",
    endingTitle: "You Became the Pattern",
    endingSummary:
      "You ghosted because he ghosts. Now you're his mirror: silent until convenient, running the same avoidance you hated. The rotation isn't about revenge. When you mirror the pattern, you become it.",
    dialog: [
      {
        speakerId: "inner-voice",
        text: "Power is the refusal to become who hurt you. Mirror their behavior and you've lost twice.",
        emotion: "sad",
      },
    ],
  },
];

export const mission71: Scenario = {
  id: "mission-7-1",
  title: "The Rotation",
  tagline: "Investment proportional to evidence.",
  description:
    "Sunday morning. Two messages. One person running an avoidant pattern, one person doing it right. You used to absorb both, equally, and wonder why the clear one felt boring. Today the question is: who gets your week?",
  tier: "premium",
  level: 7,
  order: 1,
  estimatedMinutes: 10,
  difficulty: "advanced",
  category: "dating-tactics",
  xpReward: 300,
  badgeId: "rotation-mastered",
  startSceneId: "sunday-phone",
  tacticsLearned: [
    "Prioritizing responses by evidence, not chronology",
    "Behavior under absence as the truest signal",
    "Moving their day to test if you were the point",
    "Naming patterns on the way out",
  ],
  redFlagsTaught: [
    "Warm-then-distant cycles",
    "'Rain check' as subscription cancellation",
    "'I've been flaky' rises (real or one-time)",
    "Equal time for unequal energy",
  ],
  reward: {
    id: "rotation-mastered",
    name: "Rotation Mastered",
    description: "You stopped balancing attention and started weighting evidence.",
    unlocksScenarioId: "mission-7-2",
  },
  prerequisites: ["mission-6-2"],
  characters: [ELIAS, NOVA, PRIYA, INNER_VOICE],
  scenes,
};

export default mission71;
