/**
 * Business Line. Mission 9 "The Acquisition Lure"
 *
 * A month after b8. The Saturday email from Tomas's network has been
 * cashed in. The Series-C operator is Renat Ivanov, CEO of Forge Labs.
 * "Strategic relationship" was vague by design. The actual offer is
 * acquihire framing wrapped in acquisition multiple.
 *
 * The discipline taught: read what is actually being offered. There
 * are four distinct things called "acquisition" and they have wildly
 * different math. The CFO and the lawyer produce the comparison table.
 * You decide against evidence, not against charisma.
 *
 * Handoff out: Friday 4:00 pm board call. b10 opens on the call.
 *
 * Pilot reference: `reference/b9-pilot.md`.
 */

import type { Scenario, Scene } from "../../types";
import {
  RENAT,
  ANIKA,
  THEO,
  INNER_VOICE_M,
} from "../../characters-male";

const scenes: Scene[] = [
  {
    id: "cold-open",
    backgroundId: "office",
    mood: "professional",
    dialog: [
      {
        speakerId: null,
        text: "Tuesday. 9:54 am. Hudson Yards. Forge Labs occupies the thirty-fourth floor of a building that did not exist in 2018. The lobby has a Calatrava sculpture you do not recognise and a security desk staffed by two men in suits that fit them.",
      },
      {
        speakerId: null,
        text: "Renat Ivanov is downstairs to meet you. That is its own information. CEOs of $400M ARR companies do not come downstairs unless they have decided in advance that the meeting is more important than the calendar they have left to do it.",
      },
      {
        speakerId: "inner-voice",
        tone: "tactical",
        text: "Read the foyer. Read the welcome. Read the second paragraph of the email Anika forwarded last night, the one Renat's CFO sent her unprompted with three specific revenue questions that were not in the original outreach.",
      },
      {
        speakerId: "inner-voice",
        tone: "tactical",
        text: "They have done the diligence. The meeting is not the diligence.",
      },
      {
        speakerId: "renat",
        emotion: "knowing",
        text: "Tell me where you are.",
      },
    ],
    nextSceneId: "renat-frames",
  },

  {
    id: "renat-frames",
    backgroundId: "office",
    mood: "professional",
    presentCharacterIds: ["renat"],
    dialog: [
      {
        speakerId: null,
        text: "Conference room with a view of the river. One legal pad on the table. No screen. No deck. Renat sits across, not at the head. The signal is that this is not a pitch.",
      },
      {
        speakerId: "renat",
        emotion: "knowing",
        text: "We do not need to talk about Forge. You know what we do. I want to talk about what you do, and what the next two years look like for you, and whether there is a version of the next two years that involves us.",
      },
      {
        speakerId: "renat",
        emotion: "knowing",
        text: "I will tell you what I am thinking. You can tell me what you are thinking. We will know by 11:00 whether we are in the same conversation or two different ones.",
      },
      {
        speakerId: "inner-voice",
        tone: "tactical",
        text: "Note the framing. He has spent thirty-eight seconds making you feel that the room is yours. The room is his. He is the host. The room is structured for him.",
      },
      {
        speakerId: null,
        text: "You give him forty minutes of where you are. He listens. He does not interrupt. He takes one note, which he shows you without you asking.",
      },
      {
        speakerId: "renat",
        emotion: "knowing",
        text: "Two questions. One. What is the smallest amount of time you would need to know you do not want to do this on your own anymore? Two. What is the smallest amount of money you would need to know the answer to question one is now?",
      },
    ],
    nextSceneId: "the-offer",
  },

  {
    id: "the-offer",
    backgroundId: "office",
    mood: "tense",
    presentCharacterIds: ["renat"],
    dialog: [
      {
        speakerId: "renat",
        emotion: "knowing",
        text: "I will tell you the version that exists. Cash plus stock. Multiple of 14 on trailing revenue. 30 percent cash, 70 percent Forge stock at last round's price. Twenty-four month lockup. Founder retention package on top, two-year vest, structured as RSUs.",
      },
      {
        speakerId: "renat",
        emotion: "knowing",
        text: "Your team comes with you. Five immediate hires. Your product becomes a Forge product. We rename. We keep your account list. You become SVP of the combined product organisation. You report to me. Term sheet Friday.",
      },
      {
        speakerId: "inner-voice",
        tone: "tactical",
        text: "He just told you the version. The version is acquihire framing wrapped in acquisition multiple. The lockup is an acquihire structure. The RSU retention package is an acquihire structure. The 'your product becomes a Forge product' sentence is an acquihire sentence.",
        event: "tactic-named:acquihire-dressed-as-acquisition",
      },
      {
        speakerId: "inner-voice",
        tone: "tactical",
        text: "The multiple of 14 is acquisition math. The math is rich. The structure is poor. The structure is what you will live in for two years.",
      },
    ],
    nextSceneId: "the-structure",
  },

  {
    id: "the-structure",
    backgroundId: "office",
    mood: "professional",
    presentCharacterIds: ["anika"],
    dialog: [
      {
        speakerId: null,
        text: "You leave at 11:14. Renat walks you to the lobby. He shakes your hand the way a man shakes the hand of a man he has just signed an LOI with. He has not signed an LOI with you. He is signalling that the meeting went the way he wanted.",
      },
      {
        speakerId: null,
        text: "12:08 pm. Anika texts. Read my email. You read it. Five paragraphs. She has done the work.",
      },
      {
        speakerId: "anika",
        emotion: "knowing",
        text: "Two things to flag before you reply to Renat. The trailing revenue multiple of 14 is calculated against an annualised number that excludes Q4 of last year. Q4 was your strongest. Including it puts the implied multiple at 11.",
      },
      {
        speakerId: "anika",
        emotion: "knowing",
        text: "The founder RSU retention package vests on remaining employed, with cause defined broadly. Standard for acquihire, not standard for the SVP role he is describing. The structure says one thing the math says another.",
      },
      {
        speakerId: "inner-voice",
        tone: "tactical",
        text: "Anika has done in two hours what Theo would have done in three. She is right. The structure is the acquihire. The math is the cover.",
      },
    ],
    nextSceneId: "the-choice",
  },

  {
    id: "the-choice",
    backgroundId: "office",
    mood: "tense",
    dialog: [
      {
        speakerId: "inner-voice",
        tone: "tactical",
        text: "You have until Friday to send a response. Three options.",
      },
    ],
    choices: [
      {
        id: "comparison-table",
        text: "Send Anika and the lawyers everything. Ask them to produce the comparison table: full acquisition, acquihire, strategic partnership. Make the decision against the table, not against Renat's voice in the conference room.",
        tactic:
          "Read what is actually being offered. The CFO and the lawyer produce the comparison. You decide against evidence, not against charisma.",
        isOptimal: true,
        event: "optimal-with-grace",
        nextSceneId: "path-a-anika-reads-it",
      },
      {
        id: "engage-on-q4",
        text: "Send the term sheet to the lawyers. Schedule the next meeting for Monday. Ask for one term tweak, the Q4 inclusion, before you engage on the structural read.",
        tactic:
          "Engage. You are negotiating before you have decided what you are negotiating about. The Q4 tweak is real and small. The structural read is not.",
        feedback:
          "The negotiation about the small term obscures the negotiation about the large structure.",
        nextSceneId: "path-b-engage",
      },
      {
        id: "champions-meeting",
        text: "Reply to Renat tonight with a warm note. Say you are excited. Set up an internal champions meeting with your team for Wednesday so they are bought in by the time the term sheet lands Friday.",
        tactic:
          "The soft yes at scale. You have just told your team the deal is happening. The deal is now happening because you told them. Renat does not need to push. He needs to wait for the inertia you just created.",
        event: "failure-rejected",
        nextSceneId: "path-c-soft-yes",
      },
    ],
  },

  {
    id: "path-a-anika-reads-it",
    backgroundId: "office",
    mood: "professional",
    presentCharacterIds: ["anika"],
    dialog: [
      {
        speakerId: null,
        text: "Wednesday morning. Anika and the lawyers have produced the comparison table. Three columns. Full acquisition. Acquihire. Strategic partnership.",
      },
      {
        speakerId: "anika",
        emotion: "knowing",
        text: "The full-acquisition column is empty. There is no clause in the proposal that matches a full acquisition profile. The acquihire column has every row. The strategic-partnership column is the column you have not been offered.",
      },
      {
        speakerId: "inner-voice",
        tone: "tactical",
        text: "Three columns. One is full. One is empty. One has not been offered. The third column is the column you came here to ask about.",
      },
      {
        speakerId: null,
        text: "You send Renat a Friday note. The note declines the acquihire framing and offers a Q3 conversation about the strategic partnership the original email described.",
      },
      {
        speakerId: null,
        text: "Renat replies within an hour.",
      },
      {
        speakerId: "renat",
        emotion: "knowing",
        text: "Good. The Q3 partnership was the conversation I had been hoping you would ask for. The acquihire was the easier path for my team to put in writing. I am glad you read it. Q3.",
      },
      {
        speakerId: "inner-voice",
        tone: "tactical",
        text: "He has just told you the truth. The acquihire was the default. The partnership was the actual offer he was hoping you would name. You named the meeting. The meeting is three months from now and the term sheet is now your draft.",
      },
    ],
    nextSceneId: "ending-the-comparison-table",
  },

  {
    id: "path-b-engage",
    backgroundId: "office",
    mood: "professional",
    dialog: [
      {
        speakerId: null,
        text: "You negotiate the Q4 inclusion. Renat agrees. The implied multiple moves from 11 to 12. The structure stays the same.",
      },
      {
        speakerId: "inner-voice",
        tone: "tactical",
        text: "You won the small negotiation. The win obscured the structural read. The Q4 tweak is real money on paper. The structure costs you the next two years of your operating life.",
      },
      {
        speakerId: null,
        text: "The lawyers shake hands on Monday morning. You sign in seven weeks. The acquihire happens. Your product is now a feature in Forge's Q2 release. You are SVP of the combined product organisation. The RSU clock starts next week.",
      },
    ],
    nextSceneId: "ending-the-small-negotiation",
  },

  {
    id: "path-c-soft-yes",
    backgroundId: "office",
    mood: "danger",
    dialog: [
      {
        speakerId: null,
        text: "You reply to Renat with a warm note. You schedule the internal champions meeting for Wednesday. You walk through the deal with the team.",
      },
      {
        speakerId: "inner-voice",
        tone: "tactical",
        text: "Your team is bought in by Wednesday. The deal is inevitable by Thursday. The term sheet arrives Friday in the version Renat originally drafted. You signed in five weeks because pulling back would have cost you the team's trust.",
        event: "tactic-named:inertia-at-scale",
      },
      {
        speakerId: "inner-voice",
        tone: "tactical",
        text: "Renat did not need to push. He needed to wait. The acquihire happened. The Q4 inclusion question was never asked.",
      },
    ],
    nextSceneId: "ending-the-champions-meeting",
  },

  {
    id: "ending-the-comparison-table",
    backgroundId: "office",
    mood: "professional",
    isEnding: true,
    outcomeType: "good",
    endingTitle: "The Comparison Table",
    endingSummary:
      "Anika and the lawyers produced the comparison. The full-acquisition column was empty. The acquihire column had every row Renat's term sheet matched. The strategic-partnership column was the column you had not been offered. You named the meeting. The meeting is three months from now and the term sheet is now your draft.",
    endingLearnPrompt:
      "Acquihire, acquisition, and strategic partnership have wildly different math. The next time someone offers a 'strategic combination,' make the comparison table before you decide what you are deciding.",
    dialog: [
      {
        speakerId: null,
        text: "Friday 4:00 pm. Board call. You walk the board through the comparison table. The independent director asks the question Theo would have asked.",
      },
      {
        speakerId: "theo",
        emotion: "knowing",
        text: "Saw Renat is in the news. Don't sign Friday. Whatever it is, don't sign Friday. Call me before the lawyers do.",
      },
      {
        speakerId: "inner-voice",
        tone: "tactical",
        text: "Theo has been gone seven weeks. He still texts when something material is about to land. You did not lose the relationship in b8. You repositioned it.",
      },
    ],
  },

  {
    id: "ending-the-small-negotiation",
    backgroundId: "office",
    mood: "tense",
    isEnding: true,
    outcomeType: "neutral",
    endingTitle: "The Small Term Won",
    endingSummary:
      "You negotiated the Q4 inclusion. Renat agreed. The implied multiple moved from 11 to 12. The structure stayed the same. The lawyers shook hands on Monday morning. You signed in seven weeks. The acquihire happened. Your product is now a feature in Forge's Q2 release. You are SVP of the combined product organisation. The RSU clock starts next week.",
    endingLearnPrompt:
      "Winning the small term while losing the large structure is the most common founder error in M&A. Audit the last negotiation where you celebrated a tweak. Did the tweak compensate for the structure, or did it distract from it?",
    failureBlogSlug: "the-small-negotiation",
    failureBlogTitle: "Why the small term obscures the structural read",
    dialog: [
      {
        speakerId: "theo",
        emotion: "knowing",
        text: "Saw the announcement. Call me after the close.",
      },
    ],
  },

  {
    id: "ending-the-champions-meeting",
    backgroundId: "office",
    mood: "cold",
    isEnding: true,
    outcomeType: "bad",
    endingTitle: "The Inertia You Created",
    endingSummary:
      "Your team was bought in by Wednesday. The deal was inevitable by Thursday. The term sheet arrived Friday in the version Renat originally drafted. You signed in five weeks because pulling back would have cost you the team's trust. Renat did not need to push. He needed to wait. The acquihire happened. The Q4 inclusion question was never asked.",
    endingLearnPrompt:
      "The soft yes at scale is the founder version of the soft yes at coffee. Telling your team a deal is happening makes the deal happen. The inertia is not from the acquirer. It is from you.",
    failureBlogSlug: "the-soft-yes-at-scale",
    failureBlogTitle: "Why telling your team the deal is happening makes the deal happen",
    dialog: [
      {
        speakerId: "theo",
        emotion: "knowing",
        text: "Saw the announcement. The team is excited. The structure is the structure. We will talk in a year when the RSUs vest.",
      },
    ],
  },
];

const businessMission9: Scenario = {
  id: "b9-acquisition-lure",
  title: "The Acquisition Lure",
  tagline:
    "Strategic combination, acquihire, or full acquisition. The math is rich. The structure is poor.",
  description:
    "Tuesday 10:00 am at Forge Labs. Renat Ivanov, CEO of a $400M ARR Series C, pitches a strategic combination at a multiple of 14 on trailing revenue. By 12:08 pm Anika has identified the trailing-revenue math as excluding your strongest quarter. The structure is acquihire dressed in acquisition multiple. The discipline is to read what is actually being offered before you decide what you are deciding.",
  tier: "vip",
  track: "male-business",
  level: 9,
  order: 1,
  estimatedMinutes: 11,
  difficulty: "advanced",
  category: "business",
  xpReward: 380,
  badgeId: "comparison-table",
  startSceneId: "cold-open",
  prerequisites: ["b8-cofounder-offer"],
  isNew: true,
  tacticsLearned: [
    "Producing the comparison table across acquisition shapes",
    "Reading lockup and retention structure as deal-shape signal",
    "Naming the partnership the acquirer hoped you would ask about",
    "Decoupling charisma in the conference room from evidence on paper",
  ],
  redFlagsTaught: [
    "Acquihire framing wrapped in acquisition multiple",
    "Trailing revenue multiple calculated to exclude a strong quarter",
    "The internal champions meeting as inertia-at-scale",
    "Negotiating a small term tweak that obscures the structural read",
  ],
  reward: {
    id: "comparison-table",
    name: "The Comparison Table",
    description:
      "Three columns. Full acquisition (empty), acquihire (full), strategic partnership (the column you had not been offered). You named the meeting that was actually on offer.",
  },
  characters: [RENAT, ANIKA, THEO, INNER_VOICE_M],
  scenes,
};

export default businessMission9;
