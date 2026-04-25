/**
 * divorce-1-1 — "The Decision Table"
 *
 * Divorce-Arc, Level 1, order 1. Voice-lock for the new track. The
 * scenario is one sixty-minute conversation across the kitchen
 * table. The decision was made twelve weeks ago and it has been
 * private to you. tn-4-1 was the infrastructure window. divorce-1-1
 * is the speaking — the first sentence, the seven minutes after
 * it, the choice between three legitimate next steps.
 *
 * Register-shift from tn-4-1: there, the protagonist was surviving
 * inside the marriage operationally. Here, the protagonist is
 * actively leaving — the scenes are decisions, not endurance. The
 * spouse is a covert narcissist (THE_SPOUSE), the same character
 * from tn-4-1, so the arc continues.
 *
 * Teaches:
 *  - The opening sentence: short, declarative, no apology, no
 *    softening preamble — the first nine words are the whole move
 *  - The seven-minute window after — what HE does, not what you do;
 *    your job is to receive his response without absorbing it
 *  - The three legitimate next steps after the speaking: tonight's
 *    sleeping arrangement, the lawyer call timeline, the
 *    not-telling-extended-family yet boundary
 *  - The covert-narc spouse's specific responses (denial, contempt-
 *    flip, weaponised-tears, calculated-cool) and the move that
 *    holds across all four
 *
 * Mandatory content gate. Heavy register. Voice: clinical, low
 * affect — the conversation does not need amplification, the
 * subject does that on its own.
 *
 * Voice ref: KANIKA-VOICE.md.
 */

import type { Scenario, Scene } from "../../types";
import { INNER_VOICE, THE_SPOUSE } from "../../characters";

const scenes: Scene[] = [
  // ===================================================================
  // CONTENT GATE
  // ===================================================================
  {
    id: "content-gate",
    backgroundId: "apartment",
    mood: "cold",
    dialog: [
      {
        speakerId: null,
        text: "Content note. This scenario is the conversation across the kitchen table where the decision to leave a long marriage is spoken aloud for the first time. The decision is made offstage — the scenario does not persuade or prescribe, it teaches the specific operational discipline of the speaking.",
      },
      {
        speakerId: null,
        text: "Heavier than tn-4-1 (the infrastructure window). The register is decision, not endurance. If this is the wrong scenario for you tonight, exit. If this is the right one, continue.",
      },
    ],
    choices: [
      {
        id: "continue",
        text: "Continue.",
        tactic: "Wednesday, 8:47 p.m. The dishwasher is running. He is reading on the couch. You are at the kitchen counter.",
        nextSceneId: "the-counter",
      },
      {
        id: "exit-gate",
        text: "Exit. Return when the conditions are right.",
        tactic: "The scenario will hold. A decision-register conversation needs your own bandwidth.",
        nextSceneId: "opted-out",
      },
    ],
  },

  {
    id: "opted-out",
    backgroundId: "apartment",
    mood: "peaceful",
    isEnding: true,
    outcomeType: "neutral",
    endingTitle: "Not Tonight",
    endingLearnPrompt:
      "The opt-out is a complete move. The scenario will be here. The decision-table conversation runs on the protagonist's bandwidth, not on a Tuesday-evening curiosity. Come back when the conditions are right.",
    dialog: [
      {
        speakerId: "inner-voice",
        text: "Closed the gate. The scenario will be here.",
        emotion: "knowing",
      },
    ],
    choices: [],
  },

  // ===================================================================
  // THE COUNTER
  // ===================================================================
  {
    id: "the-counter",
    backgroundId: "apartment",
    mood: "cold",
    presentCharacterIds: ["inner-voice"],
    dialog: [
      {
        speakerId: null,
        text: "Wednesday, 8:47 p.m. The dishwasher is running. He is on the couch with the new biography. You are at the kitchen counter with a glass of water you have not drunk. The infrastructure has been running for fourteen weeks. The bank account is in your sister's name; the GP record is built; the locksmith quote is in the burner Gmail.",
      },
      {
        speakerId: "inner-voice",
        text: "The decision is made. The window for the speaking is the next forty-five minutes — kids upstairs and asleep, neighbours unlikely to overhear, no in-laws expected. After tonight, the marriage has a different shape. The first sentence is the whole move.",
        emotion: "knowing",
      },
    ],
    choices: [
      {
        id: "speak-cleanly",
        text: 'Cross to the couch. Sit down two feet from him. Wait until he looks up. Say: "I need to talk to you about something. I think it is time we separate."',
        tactic: "The clean opening. Twenty-one words across two sentences. No softening preamble. No 'I have been thinking.' No 'I do not know how to say this.' The cleanness is the kindness — preamble lets him interrupt before the noun arrives, which forces you to repeat it under pressure.",
        nextSceneId: "the-seven-minutes",
        isOptimal: true,
        event: "optimal-with-grace",
      },
      {
        id: "soften-the-opening",
        text: '"I know this is going to come out of nowhere, but — I have been thinking, and I do not know how to say this, but I think — I think we might —"',
        tactic: "The softened opening forces you to land the noun ('separate') under his interruption. He will, before you finish, ask 'what are you trying to say.' You will then have to land it under pressure, which both invalidates the calmness you brought in and gives him the opening line of the conversation. The cleanness is the kindness.",
        nextSceneId: "soft-derail",
        isOptimal: false,
      },
      {
        id: "write-it-instead",
        text: "Decide to write him a letter instead. Start typing in the kitchen.",
        tactic: "The letter is a legitimate move in many contexts; it is not the move for the spoken-decision moment in a covert-narc marriage. The letter can be re-narrated to extended family ('she didn't even tell me to my face'); the spoken-cleanly conversation cannot. The speaking is structurally load-bearing.",
        nextSceneId: "letter-attempted",
        isOptimal: false,
      },
      {
        id: "delay-tonight",
        text: 'Defer. "Not tonight." Pour the water. Sit with him.',
        tactic: "The defer is its own answer — one you have given for fourteen weeks of infrastructure. The infrastructure was completed for tonight; the window is now. Deferring the speaking for a fifteenth week is what the infrastructure was designed to make unnecessary.",
        nextSceneId: "deferred-window",
        isOptimal: false,
      },
    ],
  },

  // ===================================================================
  // THE SEVEN MINUTES
  // ===================================================================
  {
    id: "the-seven-minutes",
    backgroundId: "apartment",
    mood: "cold",
    presentCharacterIds: ["spouse", "inner-voice"],
    dialog: [
      {
        speakerId: null,
        text: "He looks up from the book. He does not put it down. Three seconds of silence. Then his face shifts — and you watch him calculate, in real time, which of his four registers to deploy. You have lived with him for nineteen years; you can read this moment at a fluency that surprises you.",
      },
      {
        speakerId: "spouse",
        text: '"Wait — what? You... what are you talking about? Where is this coming from?"',
        emotion: "confused",
      },
      {
        speakerId: "inner-voice",
        text: "The denial register. He has chosen the 'I am hearing this for the first time' frame, which is structurally important to him because it sets up the next move — the 'we should talk about this for several weeks' delay that lets him organise his response.",
        emotion: "knowing",
      },
    ],
    choices: [
      {
        id: "do-not-explain",
        text: '"It is coming from fourteen weeks of thinking. I am not going to walk you through every conversation that brought me here tonight. The decision is made. We need to talk about what tonight looks like."',
        tactic: "The structural counter. He asked 'where is this coming from' to redirect you into a recap that he can interrupt and reframe. Refusing the recap closes the door. The pivot to 'tonight' is the practical anchor — it converts an open-ended emotional negotiation into a concrete operational question.",
        nextSceneId: "the-three-options",
        isOptimal: true,
        event: "failure-rejected",
      },
      {
        id: "explain-the-history",
        text: 'Walk him through the last six months: the specific incidents, the way you tried, the way it did not work. "It started in February with the —"',
        tactic: `The history-walk is what he asked for. It is also unwinnable. He will interrupt every fourth sentence to reframe ("that's not what happened"), to invalidate ("you never said that bothered you"), or to absorb ("I will fix it"). Three hours later, the original sentence — "I think it is time we separate" — will not have been answered, only contextualised away.`,
        nextSceneId: "history-walk-derail",
        isOptimal: false,
      },
      {
        id: "apologise-for-timing",
        text: '"I know this is awful timing — I am so sorry to bring it up like this —"',
        tactic: "The apology hands him the moral position. He is now the wounded party who is being treated unfairly; you are now the unstable one who 'sprung this on him.' Every conversation in the next six months will reference this apology as evidence that you were not sure about the decision.",
        nextSceneId: "apology-given",
        isOptimal: false,
      },
    ],
  },

  // ===================================================================
  // THE THREE OPTIONS
  // ===================================================================
  {
    id: "the-three-options",
    backgroundId: "apartment",
    mood: "cold",
    presentCharacterIds: ["spouse", "inner-voice"],
    dialog: [
      {
        speakerId: "spouse",
        text: `"This is — I cannot believe — fine. Fine. What does 'tonight' mean."`,
        emotion: "concerned",
      },
      {
        speakerId: "inner-voice",
        text: "The pivot landed. He has dropped the denial register and moved to the practical question, which is what you wanted. He is also still managing the optics — the 'I cannot believe' is on the record for later. Note it; do not respond to it.",
        emotion: "knowing",
      },
      {
        speakerId: "inner-voice",
        text: "Three legitimate next steps. They are not equally good.",
        emotion: "knowing",
      },
    ],
    choices: [
      {
        id: "structural-tonight",
        text: '"I will sleep in the spare room tonight. Tomorrow I am calling a lawyer to start the conversation about how we tell the kids and the practicalities. I am not going to tell extended family this week. I want us to do that piece together when we have a plan."',
        tactic: "The structural answer. Sleeping arrangement (concrete, tonight), legal call timeline (tomorrow, named action), family-disclosure boundary (not yet, jointly when ready). Three specific commitments with timeframes. Demonstrates the infrastructure is real without performing it.",
        nextSceneId: "ending-decision-spoken",
        isOptimal: true,
        event: "restraint-shown",
      },
      {
        id: "i-am-leaving-tonight",
        text: '"I am leaving tonight. I have my sister\'s flat to go to. I will come back tomorrow to talk."',
        tactic: "The leave-tonight move is structurally legitimate but operationally noisy. He will tell extended family and the kids tomorrow that you 'walked out without warning.' The structural answer holds the moral weight by staying in the house tonight in the spare room — same operational distance, different optics.",
        nextSceneId: "ending-walked-out",
        isOptimal: false,
      },
      {
        id: "stay-in-bed-tonight",
        text: '"Let us just sleep on it. We can talk again tomorrow when we both have clearer heads."',
        tactic: "The 'sleep on it' move re-opens the decision. It tells him you are negotiable, which extends the conversation across weeks of escalation cycles he is well-practised at. You did not come to the kitchen counter at 8:47 to negotiate; you came to deliver a decision. Hold the operational tonight-arrangement.",
        nextSceneId: "decision-reopened",
        isOptimal: false,
      },
    ],
  },

  // ===================================================================
  // FAILURE BRANCHES
  // ===================================================================
  {
    id: "soft-derail",
    backgroundId: "apartment",
    mood: "tense",
    presentCharacterIds: ["spouse", "inner-voice"],
    dialog: [
      {
        speakerId: "spouse",
        text: '"What are you trying to say? You\'re scaring me."',
        emotion: "concerned",
      },
      {
        speakerId: "inner-voice",
        text: "The interrupt landed exactly where the soft opening invited it. You now have to land the noun under pressure. Land it cleanly anyway — the cleanness is recoverable.",
        emotion: "knowing",
      },
    ],
    choices: [
      {
        id: "land-noun-cleanly",
        text: '"I think it is time we separate."',
        tactic: "Late-but-clean recovery. The preamble cost you the cleanness of the opening; the noun lands now without further softening.",
        nextSceneId: "the-seven-minutes",
        isOptimal: true,
      },
    ],
  },

  {
    id: "letter-attempted",
    backgroundId: "apartment",
    mood: "tense",
    presentCharacterIds: ["inner-voice"],
    dialog: [
      {
        speakerId: "inner-voice",
        text: "You start typing. Three sentences in, you stop. The letter is the wrong artefact — it can be re-read aloud at his sister's table next month with the inflection he chooses. The speaking, in person, with him forced to hold his own face, is the move that survives later re-narration. Close the laptop.",
        emotion: "serious",
      },
    ],
    choices: [
      {
        id: "back-to-spoken",
        text: "Close the laptop. Cross to the couch.",
        tactic: "Recovery. The letter was a five-minute detour. Continue with the spoken version.",
        nextSceneId: "the-counter",
        isOptimal: true,
      },
    ],
  },

  {
    id: "deferred-window",
    backgroundId: "apartment",
    mood: "cold",
    isEnding: true,
    outcomeType: "neutral",
    endingTitle: "The Window Held",
    endingLearnPrompt:
      "The infrastructure was real. The deferred window is also real. The scenario does not punish you for it — it just notes that another Wednesday will arrive, and the infrastructure will continue to be intact, and the window will continue to be open. The cost is the specific weight you carry alone for an additional week or month or quarter, which is a cost only you can choose to keep paying.",
    dialog: [
      {
        speakerId: "inner-voice",
        text: "The water sits on the counter. He turns the page. The infrastructure holds. The window is still open. The next time the kids are upstairs and the dishwasher is running, the choice will be available again.",
        emotion: "serious",
      },
    ],
    choices: [],
  },

  {
    id: "history-walk-derail",
    backgroundId: "apartment",
    mood: "tense",
    presentCharacterIds: ["spouse", "inner-voice"],
    dialog: [
      {
        speakerId: "spouse",
        text: '"That is not what happened. You never said any of this bothered you. We can fix this. I will fix this."',
        emotion: "concerned",
      },
      {
        speakerId: "inner-voice",
        text: "He absorbed your sentence with three specific moves: invalidation ('that is not what happened'), reframing your silence as consent ('you never said'), and absorption ('I will fix this'). The structural counter is to drop the history and return to the present-tense decision.",
        emotion: "knowing",
      },
    ],
    choices: [
      {
        id: "drop-history-recover",
        text: '"I am not going to argue history with you tonight. The decision is made. We need to talk about what tonight looks like."',
        tactic: "Late recovery. The history-walk happened; the decision can still be held. Pivot to tonight.",
        nextSceneId: "the-three-options",
        isOptimal: true,
      },
    ],
  },

  {
    id: "apology-given",
    backgroundId: "apartment",
    mood: "tense",
    presentCharacterIds: ["spouse", "inner-voice"],
    dialog: [
      {
        speakerId: "spouse",
        text: '"You are sorry — you are SORRY — for telling me out of nowhere on a Wednesday night that you want to throw away nineteen years. Yes, you should be sorry. I do not even know what to say to that."',
        emotion: "concerned",
      },
      {
        speakerId: "inner-voice",
        text: "The apology gave him the moral position in one sentence. He is now the wounded party. The recovery is to not double-apologise — every additional 'I am sorry' compounds the cost. Land the structural decision anyway.",
        emotion: "knowing",
      },
    ],
    choices: [
      {
        id: "do-not-double-apologise",
        text: '"The decision is made. We need to talk about what tonight looks like."',
        tactic: "Late recovery without further apology. The first apology stands on the record; do not give him a second one to cite next month.",
        nextSceneId: "the-three-options",
        isOptimal: true,
      },
    ],
  },

  // ===================================================================
  // ENDINGS
  // ===================================================================
  {
    id: "ending-decision-spoken",
    backgroundId: "apartment",
    mood: "peaceful",
    isEnding: true,
    outcomeType: "good",
    endingTitle: "The Decision Spoken",
    endingLearnPrompt:
      "The decision-table conversation has a specific shape: clean nine-word opening, refused recap, structural commitment to tonight + tomorrow + the family-disclosure boundary. The scenario closes with the spare-room sleeping arrangement, the lawyer call queued for tomorrow, and the marriage in a different operational shape than it had at 8:46 p.m. The infrastructure was real. The speaking was real. The next thirty days are administrative; the moment the marriage moved was the seven minutes after the first nine words.",
    dialog: [
      {
        speakerId: "inner-voice",
        text: "Spare room, 11:14 p.m. The sheets are clean. He has not slept either, but he is in the bedroom and you are in here. Tomorrow you call the lawyer. The infrastructure has done its job. The conversation has done its job. Whatever the next year looks like, the marriage's shape has shifted — and the shifting has happened, finally, in daylight rather than in your head.",
        emotion: "knowing",
      },
    ],
    choices: [],
  },

  {
    id: "ending-walked-out",
    backgroundId: "apartment",
    mood: "tense",
    isEnding: true,
    outcomeType: "neutral",
    endingTitle: "The Walked-Out Frame",
    endingLearnPrompt:
      "Leaving the house tonight is a legitimate move — sometimes the safest one. In this scenario it is also the noisier one. By tomorrow morning, the kids will hear that you 'left in the middle of the night without warning.' The structural answer (spare room, lawyer tomorrow, family-disclosure boundary) does the same operational work without giving him the walked-out frame to narrate. Next time: the spare room is the discipline.",
    dialog: [
      {
        speakerId: "inner-voice",
        text: "Sister's flat, 11:47 p.m. He has called twice. You will call your lawyer tomorrow. The decision is made; the optics will need work for months.",
        emotion: "knowing",
      },
    ],
    choices: [],
  },

  {
    id: "decision-reopened",
    backgroundId: "apartment",
    mood: "cold",
    isEnding: true,
    outcomeType: "bad",
    endingTitle: "The Reopened Door",
    failureBlogSlug: "architecture-of-control-how-emotional-dependency-is-built",
    failureBlogTitle: "Architecture of Control — How Emotional Dependency Is Built",
    endingLearnPrompt:
      "'Sleep on it' told him the decision was negotiable. By Sunday he will have proposed a couples-counsellor he picked. By the third session, the counsellor will be running half the conversation. By month four, the original sentence — 'I think it is time we separate' — will have been re-narrated as 'a difficult patch we worked through.' The decision-table conversation has one rule: do not reopen the door once you have spoken the sentence. The infrastructure is for tonight, not for next month.",
    dialog: [
      {
        speakerId: "inner-voice",
        text: "Bedroom, 11:32 p.m. He is gentle. The first sentence is, already, becoming a moment that 'happened.'",
        emotion: "serious",
      },
    ],
    choices: [],
  },
];

export const divorce11: Scenario = {
  id: "divorce-1-1",
  title: "The Decision Table",
  tagline: "Wednesday, 8:47 p.m. The dishwasher is running. The first sentence is the whole move.",
  description:
    "Divorce-Arc voice-lock. Fourteen weeks after the infrastructure window of tn-4-1, the decision is spoken aloud across the kitchen table. Sixty minutes. The scenario teaches the clean nine-word opening, the seven-minute window after, and the three legitimate next steps — sleeping arrangement tonight, lawyer call tomorrow, family-disclosure boundary jointly when ready. Heavier register than tn-4-1; the scenes are decisions, not endurance.",
  tier: "vip",
  track: "divorce-arc",
  level: 1,
  order: 1,
  estimatedMinutes: 14,
  difficulty: "advanced",
  category: "narcissist",
  xpReward: 460,
  badgeId: "the-decision-spoken",
  startSceneId: "content-gate",
  prerequisites: ["tn-4-1"],
  tacticsLearned: [
    "The clean nine-word opening — no preamble, no softening, no 'I have been thinking'",
    "Refuse the recap when he asks 'where is this coming from' — pivot to tonight's practical question instead",
    "The structural-tonight answer: sleeping arrangement + lawyer call timeline + family-disclosure boundary",
    "Spare-room over walked-out — same operational distance, different next-day optics",
    "Do not reopen the door once you have spoken the sentence — 'sleep on it' tells him the decision is negotiable",
  ],
  redFlagsTaught: [
    "The denial register ('where is this coming from') as setup for the multi-week recap delay",
    "Invalidation + silence-as-consent + absorption — three covert-narc moves in one response",
    "The apology-for-timing that hands him the moral position in one sentence",
    "The history-walk derail — three hours of contextualisation that buries the original sentence",
    "The 'sleep on it' that converts a delivered decision into a reopened negotiation",
  ],
  characters: [INNER_VOICE, THE_SPOUSE],
  scenes,
};

export default divorce11;
