/**
 * Mission 6-2 — "The Raise"
 *
 * Level 6, order 2. Salary negotiation against a director running
 * classic suppression tactics: anchoring low, citing "the team," and
 * invoking budget as immovable. Teaches leverage-first negotiation.
 */

import type { Scenario, Scene } from "../types";
import { MARCUS, KAYA, INNER_VOICE } from "../characters";

const scenes: Scene[] = [
  {
    id: "before-meeting",
    backgroundId: "office",
    mood: "professional",
    presentCharacterIds: ["kaya"],
    dialog: [
      {
        speakerId: null,
        text: "Friday morning. 9:55am. Your raise review at 10. Kaya catches you by the coffee machine.",
      },
      {
        speakerId: "kaya",
        text: '"One piece of advice. Don\'t let him anchor first. And don\'t accept \'budget\' as an answer — budget is always a choice, not a constraint."',
        emotion: "knowing",
      },
      {
        speakerId: "inner-voice",
        text: "Veteran intel delivered in under 15 seconds. Use it.",
        emotion: "knowing",
      },
    ],
    choices: [
      {
        id: "thank-kaya",
        text: "\"Copy. Thanks.\"",
        tactic: "Take the gift. Move on.",
        nextSceneId: "enter-meeting",
        isOptimal: true,
      },
      {
        id: "ask-for-more",
        text: "\"What number should I open with?\"",
        tactic: "Deference. You're still looking for permission to want what you want.",
        nextSceneId: "kaya-deflects",
      },
      {
        id: "name-the-walkaway",
        text: '"If I open at 130 and he holds at 110, I walk. Is that the right line?"',
        tactic: "Test the walk-away number with your mentor in fifteen seconds. Kaya either confirms or upgrades you.",
        nextSceneId: "kaya-deflects",
        isOptimal: true,
      },
      {
        id: "thank-and-deepen",
        text: "\"Noted. One more — what does the bad version of me look like in there?\"",
        tactic: "Ask for the anti-pattern, not the play. Kaya's answer tells you what NOT to do in the next six minutes.",
        nextSceneId: "kaya-deflects",
        isOptimal: true,
      },
    ],
  },

  {
    id: "kaya-deflects",
    backgroundId: "office",
    mood: "professional",
    presentCharacterIds: ["kaya"],
    dialog: [
      {
        speakerId: "kaya",
        text: '"That\'s the job the market does. You know what you\'d leave for. Open above it."',
        emotion: "knowing",
      },
    ],
    nextSceneId: "enter-meeting",
  },

  {
    id: "enter-meeting",
    backgroundId: "office",
    mood: "tense",
    presentCharacterIds: ["marcus"],
    dialog: [
      {
        speakerId: null,
        text: "Marcus's office. He gestures to the chair. Already warming up a smile. Two sheets of paper on the desk — one face down.",
      },
      {
        speakerId: "marcus",
        text: '"I wanted to get ahead of the salary conversation. I\'m going to advocate for you — but I want to align first."',
        emotion: "neutral",
      },
      {
        speakerId: "inner-voice",
        text: "'Align first' = extract your number before naming his.",
        emotion: "knowing",
      },
    ],
    choices: [
      {
        id: "give-your-number",
        text: "Name your target — say $20k above what you'd actually accept.",
        tactic: "You anchored first. He'll walk it back to half your ask.",
        nextSceneId: "marcus-halves",
        isOptimal: false,
      },
      {
        id: "redirect-to-his",
        text: "\"Happy to align. What does the band look like for this role?\"",
        tactic: "Make him show a number first. Standard negotiation move.",
        nextSceneId: "marcus-shows-band",
        isOptimal: true,
      },
      {
        id: "leverage-first",
        text: "\"Before we do salary — what does career progression look like for me here over the next 12 months?\"",
        tactic: "Shift to the bigger frame. Money conversations are easier after clarity on promotion.",
        nextSceneId: "marcus-evasive",
        isOptimal: true,
      },
      {
        id: "silent-wait",
        text: "Let the silence sit. Wait for him to name a number.",
        tactic: "Patience move. Most managers will break and name a number.",
        nextSceneId: "marcus-breaks-first",
        isOptimal: true,
      },
    ],
  },

  {
    id: "marcus-shows-band",
    backgroundId: "office",
    mood: "tense",
    presentCharacterIds: ["marcus"],
    dialog: [
      {
        speakerId: "marcus",
        text: '"The band for your role tops out around 115."',
        emotion: "neutral",
      },
      {
        speakerId: "inner-voice",
        text: "He named a ceiling, not a midpoint. 'Tops out' is his anchor. The real band probably goes higher.",
        emotion: "knowing",
      },
    ],
    choices: [
      {
        id: "accept-band",
        text: "\"So 115 is what I should target.\"",
        tactic: "You accepted his ceiling as your aspiration. He just capped you.",
        nextSceneId: "ending-capped",
        isOptimal: false,
      },
      {
        id: "challenge-band",
        text: "\"That feels like a mid-band number. Where's the top?\"",
        tactic: "Reject his anchor. Push for the actual ceiling.",
        nextSceneId: "marcus-reveals",
        isOptimal: true,
      },
      {
        id: "cite-market",
        text: "\"Market for this role at my tenure is 130-150. Let's start there.\"",
        tactic: "Counter-anchor with external data. If you have the data, this is the best move.",
        nextSceneId: "marcus-pushes-back",
        isOptimal: true,
      },
    ],
  },

  {
    id: "marcus-reveals",
    backgroundId: "office",
    mood: "tense",
    presentCharacterIds: ["marcus"],
    dialog: [
      {
        speakerId: "marcus",
        text: '"Top of band is 135. But — you\'re not at top of band performance-wise."',
        emotion: "neutral",
      },
      {
        speakerId: "inner-voice",
        text: "He moved 20k up with one sentence. 'Performance' is the lever he'll use to keep you below it.",
        emotion: "knowing",
      },
    ],
    choices: [
      {
        id: "accept-performance-frame",
        text: "\"What would I need to hit to get to top of band?\"",
        tactic: "Playing his game. The goalposts will move.",
        nextSceneId: "ending-goalposts-moved",
      },
      {
        id: "reframe-performance",
        text: "\"I led the pricing model. That's a top-of-band project.\"",
        tactic: "Cite a specific high-impact project. Makes it hard to argue.",
        nextSceneId: "marcus-concedes",
        isOptimal: true,
      },
      {
        id: "name-leverage",
        text: "\"I've had interest from two other companies this month.\"",
        tactic: "External leverage — real or implied. Changes the risk calculus.",
        nextSceneId: "marcus-takes-seriously",
        isOptimal: true,
      },
    ],
  },

  {
    id: "marcus-pushes-back",
    backgroundId: "office",
    mood: "danger",
    presentCharacterIds: ["marcus"],
    dialog: [
      {
        speakerId: "marcus",
        text: '"130-150 is not realistic. Where are you getting that?"',
        emotion: "cold",
      },
      {
        speakerId: "inner-voice",
        text: "He's testing whether your number is bluff or sourced. Source it.",
        emotion: "knowing",
      },
    ],
    choices: [
      {
        id: "cite-source",
        text: "\"Levels.fyi, Glassdoor, two specific offers from competitors I've turned down this quarter.\"",
        tactic: "Data + external leverage. Unassailable.",
        nextSceneId: "marcus-concedes-high",
        isOptimal: true,
      },
      {
        id: "back-off",
        text: "\"Maybe I misread the market.\"",
        tactic: "You folded at the first pushback. He'll now offer 3%.",
        nextSceneId: "ending-folded",
        isOptimal: false,
      },
      {
        id: "pause-in-silence",
        text: "(Don't answer for five seconds. Let him sit with the question.)",
        tactic: "Silence shifts the pressure. Most managers fill the silence with a concession before you do.",
        nextSceneId: "marcus-concedes-high",
        isOptimal: true,
      },
      {
        id: "turn-question-around",
        text: "\"What would make 130 realistic in your head? What would I need to have done?\"",
        tactic: "Force him to define the bar. Now the rest of the year is building toward his own stated criteria.",
        nextSceneId: "marcus-concedes-high",
        isOptimal: true,
      },
    ],
  },

  {
    id: "marcus-evasive",
    backgroundId: "office",
    mood: "tense",
    presentCharacterIds: ["marcus"],
    dialog: [
      {
        speakerId: "marcus",
        text: '"Let\'s not get ahead of ourselves on title. Let\'s lock salary first, revisit title at the next review."',
        emotion: "neutral",
      },
      {
        speakerId: "inner-voice",
        text: "Classic separation move. Decouple the conversations so you can't bundle them into leverage.",
        emotion: "knowing",
      },
    ],
    choices: [
      {
        id: "accept-separation",
        text: "\"Okay, salary now, title later.\"",
        tactic: "You let him split the negotiation. Power asymmetry locked in.",
        nextSceneId: "marcus-shows-band",
        isOptimal: false,
      },
      {
        id: "bundle",
        text: "\"They're one conversation for me. Salary alone without a progression path isn't the deal.\"",
        tactic: "Force the bundle. If he breaks them apart, you walk.",
        nextSceneId: "marcus-reassesses",
        isOptimal: true,
      },
      {
        id: "date-the-revisit",
        text: "\"Happy to separate — if you put 'title reviewed at Q3 review' in writing today.\"",
        tactic: "Agree on the separation but make 'later' a specific, dated commitment. Vague later is never.",
        nextSceneId: "marcus-reassesses",
        isOptimal: true,
      },
      {
        id: "flip-the-frame",
        text: "\"Got it. I'll revisit title at my next review — with a different manager.\"",
        tactic: "Name the unspoken alternative. Either he puts title on the table today or he watches you put yourself on the market.",
        nextSceneId: "marcus-reassesses",
      },
    ],
  },

  {
    id: "marcus-breaks-first",
    backgroundId: "office",
    mood: "tense",
    presentCharacterIds: ["marcus"],
    dialog: [
      {
        speakerId: null,
        text: "Seven seconds of silence. He shifts in the chair. Speaks first.",
      },
      {
        speakerId: "marcus",
        text: '"I was thinking a 4% bump. Standard cycle."',
        emotion: "neutral",
      },
      {
        speakerId: "inner-voice",
        text: "You made him anchor. 4% is the floor of what he can get away with. Everything from here is negotiation up.",
        emotion: "knowing",
      },
    ],
    nextSceneId: "marcus-shows-band",
  },

  {
    id: "marcus-halves",
    backgroundId: "office",
    mood: "danger",
    presentCharacterIds: ["marcus"],
    dialog: [
      {
        speakerId: "marcus",
        text: '"That\'s aggressive. The team\'s budget won\'t allow it. Let\'s meet in the middle — I can advocate for half."',
        emotion: "neutral",
      },
      {
        speakerId: "inner-voice",
        text: "He halved you. Meeting in the middle means you get 50% of your ask, he cites 'budget' as neutral arbiter. Textbook.",
        emotion: "concerned",
      },
    ],
    nextSceneId: "ending-halved",
  },

  {
    id: "marcus-concedes",
    backgroundId: "office",
    mood: "tense",
    presentCharacterIds: ["marcus"],
    dialog: [
      {
        speakerId: "marcus",
        text: '"Alright. Let me see what I can do. I\'ll come back with a number."',
        emotion: "neutral",
      },
      {
        speakerId: "inner-voice",
        text: "He'll come back with something above his initial offer. You've already won the hardest part.",
        emotion: "knowing",
      },
    ],
    nextSceneId: "ending-negotiated-well",
  },

  {
    id: "marcus-concedes-high",
    backgroundId: "office",
    mood: "tense",
    presentCharacterIds: ["marcus"],
    dialog: [
      {
        speakerId: "marcus",
        text: "\"Give me the weekend. I'll work with finance.\"",
        emotion: "neutral",
      },
      {
        speakerId: "inner-voice",
        text: "When he says 'work with finance,' he's signaling it's real. You anchored high with data, he conceded the floor of negotiation.",
        emotion: "knowing",
      },
    ],
    nextSceneId: "ending-best-outcome",
  },

  {
    id: "marcus-takes-seriously",
    backgroundId: "office",
    mood: "tense",
    presentCharacterIds: ["marcus"],
    dialog: [
      {
        speakerId: "marcus",
        text: '"That changes the conversation. Can we discuss what those offers look like?"',
        emotion: "neutral",
      },
      {
        speakerId: "inner-voice",
        text: "External leverage landed. He has to calibrate against real market, not internal fiction.",
        emotion: "knowing",
      },
    ],
    nextSceneId: "ending-best-outcome",
  },

  {
    id: "marcus-reassesses",
    backgroundId: "office",
    mood: "tense",
    presentCharacterIds: ["marcus"],
    dialog: [
      {
        speakerId: "marcus",
        text: '"Okay. You want to talk about progression as part of this, let\'s do it. What\'s your target?"',
        emotion: "neutral",
      },
      {
        speakerId: "inner-voice",
        text: "He yielded the bundle. Now you control the agenda.",
        emotion: "knowing",
      },
    ],
    nextSceneId: "ending-negotiated-well",
  },

  // ---------------------------------------------------------------------
  // ENDINGS
  // ---------------------------------------------------------------------

  {
    id: "ending-best-outcome",
    backgroundId: "office",
    mood: "peaceful",
    isEnding: true,
    outcomeType: "good",
    endingTitle: "You Priced Yourself Correctly",
    endingSummary:
      "You anchored high with data, held leverage (real or implied), refused to accept 'budget' as a shield. Tuesday's email: 22% bump, title adjustment, clear promotion criteria for next review. The work didn't change. Your pricing of the work did.",
    dialog: [
      {
        speakerId: "inner-voice",
        text: "Your salary is a price. Prices are negotiated, not disclosed.",
        emotion: "knowing",
      },
    ],
  },

  {
    id: "ending-negotiated-well",
    backgroundId: "office",
    mood: "peaceful",
    isEnding: true,
    outcomeType: "good",
    endingTitle: "Solid Raise",
    endingSummary:
      "You refused his anchors, cited specific high-impact work, didn't fold at pushback. Final: 12-15% bump, written promotion criteria. Not the maximum outcome but well above the 4% 'standard cycle' he opened with.",
    dialog: [
      {
        speakerId: "inner-voice",
        text: "You negotiated like a peer. He'll remember that in the next round.",
        emotion: "knowing",
      },
    ],
  },

  {
    id: "ending-capped",
    backgroundId: "office",
    mood: "tense",
    isEnding: true,
    outcomeType: "neutral",
    endingTitle: "You Accepted the Ceiling",
    endingSummary:
      "115 was his anchor; you made it your aspiration. The actual top of band was 135. You're getting a raise, but you're anchored 20k below where you should be — and that anchor carries into every future review.",
    dialog: [
      {
        speakerId: "inner-voice",
        text: "Never accept their first number as the highest number.",
        emotion: "neutral",
      },
    ],
  },

  {
    id: "ending-goalposts-moved",
    backgroundId: "office",
    mood: "danger",
    isEnding: true,
    outcomeType: "bad",
    failureBlogSlug: "architecture-of-control-how-emotional-dependency-is-built",
    failureBlogTitle: "Architecture of Control: How Emotional Dependency Is Built",
    endingTitle: "The Goalposts",
    endingSummary:
      "He named 'performance' as the gap. You asked what to hit. The criteria will move every time you hit one. In six months, 'you need to show more leadership'. In twelve, 'cross-functional impact'. Goalposts designed to move are goalposts designed to never be reached.",
    dialog: [
      {
        speakerId: "inner-voice",
        text: "When performance is vague, the performance gap is permanent.",
        emotion: "sad",
      },
    ],
  },

  {
    id: "ending-halved",
    backgroundId: "office",
    mood: "danger",
    isEnding: true,
    outcomeType: "bad",
    failureBlogSlug: "narcissist-playbook-how-they-actually-operate",
    failureBlogTitle: "Narcissist Playbook: How They Actually Operate",
    endingTitle: "Split the Difference",
    endingSummary:
      "You anchored first. He halved you. The 'budget' he cited was whatever number he wanted it to be. You got 50% of what you wanted, which was 120% of what you needed — so you accepted. He'll anchor harder next year because he knows your ceiling now.",
    dialog: [
      {
        speakerId: "inner-voice",
        text: "Anchor first, lose first. Every time.",
        emotion: "sad",
      },
    ],
  },

  {
    id: "ending-folded",
    backgroundId: "office",
    mood: "danger",
    isEnding: true,
    outcomeType: "bad",
    failureBlogSlug: "dark-triad-personality-types",
    failureBlogTitle: "Dark Triad Personality Types",
    endingTitle: "You Folded",
    endingSummary:
      "One pushback and you recanted. He's now seen how much pressure it takes to collapse you. Your offer will reflect what he thinks he can get away with — which is always less than what you could have negotiated.",
    dialog: [
      {
        speakerId: "inner-voice",
        text: "Citing data and then abandoning it tells them the data was a bluff.",
        emotion: "sad",
      },
    ],
  },
];

export const mission62: Scenario = {
  id: "mission-6-2",
  title: "The Raise",
  tagline: "Budget is always a choice, not a constraint.",
  description:
    "Friday 10am. Marcus's office. He wants to 'align first'. You want 22%. The negotiation will take 14 minutes. The first 90 seconds decide the rest.",
  tier: "premium",
  level: 6,
  order: 2,
  estimatedMinutes: 10,
  difficulty: "advanced",
  category: "professional",
  xpReward: 300,
  badgeId: "raise-won",
  startSceneId: "before-meeting",
  tacticsLearned: [
    "Refusing to anchor first",
    "Counter-anchoring with external data",
    "Real or implied external leverage",
    "Bundling salary with progression (anti-separation)",
    "Using silence to extract the first number",
  ],
  redFlagsTaught: [
    "'Align first' = extract your number",
    "'Budget' as immovable arbiter",
    "'Tops out at X' (a ceiling, not a band midpoint)",
    "Moving performance criteria",
    "Splitting title and salary into separate conversations",
  ],
  reward: {
    id: "raise-won",
    name: "Raise Won",
    description: "You didn't accept his anchor. You set one of your own.",
    unlocksScenarioId: "mission-7-1",
  },
  prerequisites: ["mission-6-1"],
  characters: [MARCUS, KAYA, INNER_VOICE],
  scenes,
};

export default mission62;
