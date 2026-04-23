/**
 * Mission 5-2 — "The Throne"
 *
 * Level 5, order 2. Endgame. A younger player (Lennox) tries the Maris
 * playbook on you. The test is whether you can recognize yourself in
 * the target seat — and respond as the senior player you've become.
 * Mercy or takedown, but never unconscious.
 */

import type { Scenario, Scene } from "../types";
import { LENNOX, PRIYA, MARIS, INNER_VOICE } from "../characters";

const scenes: Scene[] = [
  {
    id: "the-approach",
    backgroundId: "bar",
    mood: "mysterious",
    presentCharacterIds: ["lennox"],
    dialog: [
      {
        speakerId: null,
        text: "The same rooftop bar, a year later. You are at the booth you always take now — the one with the view of the door, though you do not consciously sit where you can see the door. It has become habitual. A new face has been watching you for twenty minutes. Early twenties, a good dress that she bought for tonight, a cocktail she has barely drunk. She is about to cross the room and she knows it.",
      },
      {
        speakerId: "lennox",
        text: '"Hi. I know we have not met. I have heard, rather a lot, about you. I do not usually do this."',
      },
      {
        speakerId: "inner-voice",
        text: "Read the architecture of that opening. One — 'we have not met' establishes distance she will then pretend to bridge. Two — 'I have heard a lot' is the prize-framing move, the same one Maris ran on you at this bar twelve months ago, identical to the syllable. Three — 'I do not usually do this' is the fake-reluctance close, a planted receipt she can point to later: I told you I do not normally do this.",
        emotion: "knowing",
      },
      {
        speakerId: "inner-voice",
        text: "This is the Maris opening bid. It is so similar to the opening you received a year ago that it is almost a compliment to her — Lennox has certainly studied someone, and the shape of what she studied is recognisable. You are now sitting in the Maris seat. The person approaching you is doing to you what Maris did to you, and she has no idea you know the playbook by name.",
        emotion: "knowing",
      },
      {
        speakerId: "inner-voice",
        text: "How you handle the next four minutes is, rather unambiguously, the graduation exam for this entire chapter of your life.",
        emotion: "knowing",
      },
    ],
    choices: [
      {
        id: "be-kind",
        text: "Nod. \"What can I do for you?\" Neutral, warm.",
        tactic: "Senior move: don't match her energy. Let her propose.",
        nextSceneId: "lennox-opens",
        isOptimal: true,
      },
      {
        id: "mirror-her",
        text: '"Oh, hi — sure, sit down."',
        tactic: "You just gave away the frame she was asking for.",
        nextSceneId: "lennox-runs-play",
        isOptimal: false,
      },
      {
        id: "cut-it-off",
        text: '"I know the opening. Skip to what you actually want."',
        tactic: "Naming the play. Respectful, but shuts down the approach entirely.",
        nextSceneId: "lennox-confesses",
        isOptimal: true,
      },
      {
        id: "stone-face",
        text: "Don't speak. Wait.",
        tactic: "Silence forces her to commit to the move or retreat.",
        nextSceneId: "lennox-falters",
        isOptimal: true,
      },
    ],
  },

  {
    id: "lennox-opens",
    backgroundId: "bar",
    mood: "tense",
    presentCharacterIds: ["lennox"],
    dialog: [
      {
        speakerId: "lennox",
        text: '"I have been trying to figure out what makes you different. You have something none of the obvious people have."',
      },
      {
        speakerId: "lennox",
        text: '"I am hoping we could, as one might put it, share notes."',
      },
      {
        speakerId: "inner-voice",
        text: "'Share notes' translates to 'mine yours.' It is the same ask Maris ran on you at this same bar, cleaner. Lennox has studied. The softeners — 'rather,' 'as one might put it' — are a tell that she has read old-money interviews and picked up the register. The register is correct; the delivery is slightly too deliberate, the way a person with a new accent over-pronounces the vowels.",
        emotion: "knowing",
      },
      {
        speakerId: "inner-voice",
        text: "You now have a decision that the Maris in front of you a year ago did not afford you: whether to be merciful or whether to teach. Both are legitimate. Neither is wrong. But both are conscious, and the only bad version of this scene is the version where you answer Lennox without having made the choice.",
        emotion: "knowing",
      },
    ],
    choices: [
      {
        id: "feed-ego",
        text: '"That\'s generous of you to say."',
        tactic: "Flattery accepted = contract implied. She has you.",
        nextSceneId: "lennox-accelerates",
        isOptimal: false,
      },
      {
        id: "probe-back",
        text: '"What are you trying to build? Be specific."',
        tactic: "Make her show a roadmap. Most aspirants can't.",
        nextSceneId: "lennox-reveals-plan",
        isOptimal: true,
      },
      {
        id: "mentor-mode",
        text: "\"I'll tell you one thing. After that, you tell me why you chose this bar and this week.\"",
        tactic: "Offer a trade, then read her answer. Pure senior move.",
        nextSceneId: "lennox-negotiates",
        isOptimal: true,
      },
      {
        id: "walk-away",
        text: "\"Good luck with whatever you're building.\" Stand up.",
        tactic: "Refuse even the mentor frame. She learns from the refusal alone.",
        nextSceneId: "ending-mercy-refused",
      },
    ],
  },

  {
    id: "lennox-runs-play",
    backgroundId: "bar",
    mood: "danger",
    presentCharacterIds: ["lennox"],
    dialog: [
      {
        speakerId: "lennox",
        text: '"Thank you. Genuinely. So I\'ve been watching your work and — you have to tell me, how did you actually pull off the coffee-shop thing?"',
        emotion: "curious",
      },
      {
        speakerId: "inner-voice",
        text: "She wants specifics on your past win. Because if she has specifics, she can replicate — or counter.",
        emotion: "concerned",
      },
    ],
    choices: [
      {
        id: "explain-everything",
        text: "Walk through the whole strategy.",
        tactic: "You just gave your playbook to someone studying you.",
        nextSceneId: "ending-gave-the-map",
        isOptimal: false,
      },
      {
        id: "vague-platitudes",
        text: '"Honestly? Just timing and a lot of work."',
        tactic: "Classic deflection. Boring = safe.",
        nextSceneId: "lennox-pushes",
        isOptimal: true,
      },
      {
        id: "spot-the-game",
        text: '"You\'re not asking how I did it. You\'re asking what can be copied."',
        tactic: "Name the real question. Senior move.",
        nextSceneId: "lennox-confesses",
        isOptimal: true,
      },
    ],
  },

  {
    id: "lennox-confesses",
    backgroundId: "bar",
    mood: "mysterious",
    presentCharacterIds: ["lennox"],
    dialog: [
      {
        speakerId: "lennox",
        text: '"Okay. I studied you. I studied Maris before that. I\'m trying to figure out which of you to model."',
        emotion: "neutral",
      },
      {
        speakerId: "inner-voice",
        text: "Honesty. Rare and strategic — she's betting that directness earns credibility. It's not unreasonable.",
        emotion: "knowing",
      },
    ],
    choices: [
      {
        id: "offer-mentorship",
        text: "\"Sit down. I'll give you forty-five minutes. After that, we'll see.\"",
        tactic: "Controlled mentorship. Ally-making at low cost.",
        nextSceneId: "ending-ally-made",
        isOptimal: true,
      },
      {
        id: "redirect-to-maris",
        text: "\"Maris is still in this town. If you want Maris's playbook, go get it from her.\"",
        tactic: "Send her to the person whose model is actually empty. Elegant.",
        nextSceneId: "ending-mercy-granted",
        isOptimal: true,
      },
      {
        id: "take-her-down",
        text: "\"I'll give you a warning. If you run the playbook on me again, I'll make sure people know about it.\"",
        tactic: "Preemptive reputation strike. Effective but harsh.",
        nextSceneId: "ending-deterred",
      },
      {
        id: "recruit-her",
        text: "\"Don't model either of us. Work for me for three months. I'll teach you more than copying ever would.\"",
        tactic: "Coalition-building. Convert potential rival into subordinate.",
        nextSceneId: "ending-recruited-her",
        isOptimal: true,
      },
    ],
  },

  {
    id: "lennox-falters",
    backgroundId: "bar",
    mood: "tense",
    presentCharacterIds: ["lennox"],
    dialog: [
      {
        speakerId: null,
        text: "Four seconds of silence. She blinks. The script broke.",
      },
      {
        speakerId: "lennox",
        text: '"Um. Okay. Clearly you\'re not going to do this the easy way."',
        emotion: "confused",
      },
      {
        speakerId: "inner-voice",
        text: "She dropped character. That's the crack. What you do with the crack defines the interaction.",
        emotion: "knowing",
      },
    ],
    nextSceneId: "lennox-confesses",
  },

  {
    id: "lennox-reveals-plan",
    backgroundId: "bar",
    mood: "tense",
    presentCharacterIds: ["lennox"],
    dialog: [
      {
        speakerId: "lennox",
        text: '"I\'m trying to break into the events scene. The gatekeepers are calcified. I need an in."',
        emotion: "serious",
      },
      {
        speakerId: "inner-voice",
        text: "Specific, actually. She has a real goal. The question is whether she's dangerous long-term or useful now.",
        emotion: "knowing",
      },
    ],
    nextSceneId: "lennox-confesses",
  },

  {
    id: "lennox-accelerates",
    backgroundId: "bar",
    mood: "danger",
    presentCharacterIds: ["lennox"],
    dialog: [
      {
        speakerId: "lennox",
        text: '"I had this feeling you\'d get it. Most people don\'t. Tell me how you did the coffee-shop collab. I\'m dying to know."',
        emotion: "seductive",
      },
      {
        speakerId: "inner-voice",
        text: "She pivoted from flattery to extraction in one move. Textbook. She'll own any information you hand over.",
        emotion: "concerned",
      },
    ],
    nextSceneId: "ending-gave-the-map",
  },

  {
    id: "lennox-pushes",
    backgroundId: "bar",
    mood: "tense",
    presentCharacterIds: ["lennox"],
    dialog: [
      {
        speakerId: "lennox",
        text: '"Come on. Timing and work is what people say to make themselves mysterious. What\'s the actual move?"',
        emotion: "smirking",
      },
      {
        speakerId: "inner-voice",
        text: "She called your deflection. She's sharp. Decide now whether sharp is useful to you or dangerous.",
        emotion: "knowing",
      },
    ],
    nextSceneId: "lennox-confesses",
  },

  {
    id: "lennox-negotiates",
    backgroundId: "bar",
    mood: "mysterious",
    presentCharacterIds: ["lennox"],
    dialog: [
      {
        speakerId: "lennox",
        text: '"Fair. I picked this bar because three of Maris\'s people come here on Thursdays and I wanted them to see me talking to you."',
        emotion: "neutral",
      },
      {
        speakerId: "inner-voice",
        text: "She just admitted the operation. Either she's testing whether honesty works on you, or she's playing five levels up. Either is possible.",
        emotion: "knowing",
      },
    ],
    nextSceneId: "lennox-confesses",
  },

  // ---------------------------------------------------------------------
  // ENDINGS
  // ---------------------------------------------------------------------

  {
    id: "ending-ally-made",
    backgroundId: "bar",
    mood: "peaceful",
    isEnding: true,
    outcomeType: "good",
    endingTitle: "Forty-Five Minutes",
    endingSummary:
      "You gave her controlled access. Taught one specific lesson. Watched what she did with it. In three months, she's either useful in your orbit or has proven herself dangerous and exited the story. Either way, you chose the terms.",
    dialog: [
      {
        speakerId: "inner-voice",
        text: "Mentorship is a leash with a benefit. Hold both ends.",
        emotion: "knowing",
      },
    ],
  },

  {
    id: "ending-mercy-granted",
    backgroundId: "bar",
    mood: "peaceful",
    isEnding: true,
    outcomeType: "good",
    endingTitle: "Redirected to the Empty Well",
    endingSummary:
      "You sent her to Maris. Beautiful, because the person she's trying to model has less to teach than the bar makes it look. Lennox will figure out the emptiness on her own — and in figuring it out, she'll respect that you didn't waste her time pretending otherwise.",
    dialog: [
      {
        speakerId: "inner-voice",
        text: "The cleanest mercy is letting people learn from their own curiosity.",
        emotion: "knowing",
      },
    ],
  },

  {
    id: "ending-recruited-her",
    backgroundId: "bar",
    mood: "peaceful",
    isEnding: true,
    outcomeType: "good",
    endingTitle: "Coalition",
    endingSummary:
      "You offered her something copying couldn't: real training, in your orbit, at your pace. She accepted. In six months she's your #2. In two years she's the person Maris's kids try to model. You didn't kill the threat — you inherited it.",
    dialog: [
      {
        speakerId: "inner-voice",
        text: "A potential rival absorbed early is a lieutenant. Absorbed late, a competitor. Absorbed never, a problem.",
        emotion: "knowing",
      },
    ],
  },

  {
    id: "ending-deterred",
    backgroundId: "bar",
    mood: "tense",
    isEnding: true,
    outcomeType: "good",
    endingTitle: "Preemptive Deterrent",
    endingSummary:
      "You drew a line in public. She'll back off. Effective. But you also signaled that you're willing to burn capital on preemptive strikes — some observers will remember that as ruthless. The cost/benefit tilted your way. Just know you spent something.",
    dialog: [
      {
        speakerId: "inner-voice",
        text: "Every deterrent is also a message to the people watching. Choose your audience before you draw.",
        emotion: "knowing",
      },
    ],
  },

  {
    id: "ending-mercy-refused",
    backgroundId: "bar",
    mood: "peaceful",
    isEnding: true,
    outcomeType: "neutral",
    endingTitle: "You Walked",
    endingSummary:
      "Didn't engage. Fine, clean, but blind — you don't know what she'll do now. Maybe nothing. Maybe she learns from watching you refuse her, and the next attempt is sharper. Either way, you bought nothing and owed nothing.",
    dialog: [
      {
        speakerId: "inner-voice",
        text: "Refusal is always an option. Just know you're also refusing intelligence.",
        emotion: "neutral",
      },
    ],
  },

  {
    id: "ending-gave-the-map",
    backgroundId: "bar",
    mood: "danger",
    isEnding: true,
    outcomeType: "bad",
    failureBlogSlug: "mask-collection-four-personas-sociopaths-wear",
    failureBlogTitle: "Mask Collection: The Four Personas Sociopaths Wear",
    endingTitle: "You Handed Over the Playbook",
    endingSummary:
      "She asked how you did the coffee-shop collab. You told her. In three months she's running your plays in a parallel vertical; in six, she's working the same gatekeepers. The person studying you now has your schematic. You made a replica.",
    dialog: [
      {
        speakerId: "inner-voice",
        text: "Flattery is a purchase order for information. Read the total before you sign.",
        emotion: "sad",
      },
    ],
  },
];

export const mission52: Scenario = {
  id: "mission-5-2",
  title: "The Throne",
  tagline: "Someone is doing to you what you did to her.",
  description:
    "Same rooftop bar, six months later. A new face. She's studied you the way you once studied Maris. The scripts you've learned are now being aimed at you. This is the final exam: do you recognize yourself in the target seat fast enough to choose what happens next — consciously?",
  tier: "premium",
  level: 5,
  order: 2,
  estimatedMinutes: 12,
  difficulty: "advanced",
  category: "narcissist",
  xpReward: 250,
  badgeId: "throne-held",
  startSceneId: "the-approach",
  tacticsLearned: [
    "Recognizing yourself in the target seat",
    "Controlled mentorship vs. extraction",
    "Coalition-building with potential rivals",
    "Preemptive deterrence (and its cost)",
    "Redirecting to the empty well",
  ],
  redFlagsTaught: [
    "'I don't usually do this' as scripted flattery",
    "Extraction disguised as asking for advice",
    "Specific questions about past wins (they want the schematic)",
    "Approach timed when Maris's people are watching",
  ],
  reward: {
    id: "throne-held",
    name: "The Throne Held",
    description: "You recognized the seat you were in and chose consciously from it.",
  },
  prerequisites: ["mission-5-1"],
  characters: [LENNOX, PRIYA, MARIS, INNER_VOICE],
  scenes,
};

export default mission52;
