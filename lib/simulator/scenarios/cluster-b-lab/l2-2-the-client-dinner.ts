/**
 * cbl-2-2, "The Client Dinner"
 *
 * Cluster-B Identification Lab, Level 2 (The Professional Register),
 * order 2. Same audit -> diagnose -> prescribe shape as the L2 opener,
 * a different professional relationship (the client, not the boss) and
 * a different register (ASPD instrumental, not covert NPD). The artefact
 * is now a spoken toast at a client dinner rather than a written DM, so
 * the player drills the same instincts on a live-room artefact.
 *
 * The teaching split that matters here: instrumental warmth (ASPD)
 * versus supply-seeking warmth (NPD). Renner flatters YOU, not himself,
 * and does not need to be seen; he needs the free rollout. Praise
 * pointed outward at a target is the antisocial fingerprint. Praise
 * pointed inward at the self is the narcissistic one.
 *
 * Voice: clinical-professional. Drill, not narrative.
 * See reference/KANIKA-VOICE.md and reference/V3-NEW-TRACKS-PLAN.md §6c.
 */

import type { Scenario, Scene } from "../../types";
import { INNER_VOICE } from "../../characters";

const scenes: Scene[] = [
  // ===================================================================
  // OPENING. THE TOAST
  // ===================================================================
  {
    id: "the-toast",
    backgroundId: "restaurant",
    mood: "professional",
    presentCharacterIds: ["inner-voice"],
    dialog: [
      {
        speakerId: null,
        text: "A good dinner with your biggest client. Plates cleared, second bottle nearly gone. Renner, the client, taps his glass and stands. Two of his board members are at the table. He raises the glass and says:",
      },
      {
        speakerId: null,
        text: "'To the team. Best agency I have worked with, and I have worked with a lot of them. You get me. Which is why I already told my board you would have the extra market rollout ready for the March launch, no change order, because that is the kind of partner you are. Family, basically. We look after each other.'",
      },
      {
        speakerId: "inner-voice",
        text: "Warm room. Genuine-sounding compliment. And somewhere in the middle of it, three weeks of unbilled work just got assigned to you in front of his board. The drill applies. Audit the words, diagnose the register, prescribe the response.",
        emotion: "knowing",
        tone: "tactical",
      },
    ],
    choices: [
      {
        id: "to-audit",
        text: "Audit the toast. What is each phrase actually doing?",
        tactic: "Drill. The teaching is in the parsing.",
        nextSceneId: "the-audit",
        isOptimal: true,
      },
    ],
  },

  // ===================================================================
  // THE AUDIT
  // ===================================================================
  {
    id: "the-audit",
    backgroundId: "restaurant",
    mood: "professional",
    presentCharacterIds: ["inner-voice"],
    dialog: [
      {
        speakerId: "inner-voice",
        text: "Six phrases. Six functions.",
        emotion: "knowing",
        tone: "tactical",
      },
      {
        speakerId: null,
        text: "1. 'Best agency I have worked with.' Opener flattery, and note the direction: it points at YOU, not at him. Warmth is the delivery vehicle, not the payload.",
      },
      {
        speakerId: null,
        text: "2. 'You get me.' Intimacy claim. Converts a vendor relationship into a personal understanding. Understanding obligates in a way a contract does not.",
      },
      {
        speakerId: "inner-voice",
        text: "3. 'I already told my board you would have the extra market rollout ready for March.' The fait accompli. The extraction is presented as already decided, so declining now means un-deciding something in front of his board.",
        emotion: "knowing",
        tone: "tactical",
      },
      {
        speakerId: null,
        text: "4. 'no change order.' The actual cost, three words, buried mid-sentence between two warm clauses. Weeks of a team's billable time, given away, stated as if it were a detail.",
      },
      {
        speakerId: null,
        text: "5. 'because that is the kind of partner you are.' The identity-bind. Refusing is pre-redefined as not being that partner. Reciprocity trap: he has named you generous, so generosity is now the only move that keeps the name.",
      },
      {
        speakerId: "inner-voice",
        text: "6. 'Family, basically. We look after each other.' Intimacy-language as a tool. There is no family here; there is a signed statement of work. The word converts an obligation you could decline into one you feel you cannot.",
        emotion: "knowing",
        tone: "tactical",
      },
      {
        speakerId: "inner-voice",
        text: "Cost ratio: he spent one dinner and ninety warm seconds. The extra rollout is roughly three weeks of your team, unbilled. And he did it standing, glass up, in front of witnesses, so the room itself does the pushing. Zero ego about himself in any of it. Every word aimed at moving you, none at admiring him.",
        emotion: "knowing",
        tone: "tactical",
      },
    ],
    choices: [
      {
        id: "to-diagnosis",
        text: "Name the register.",
        tactic: "Drill diagnostic.",
        nextSceneId: "the-diagnosis",
        isOptimal: true,
      },
    ],
  },

  // ===================================================================
  // THE DIAGNOSIS
  // ===================================================================
  {
    id: "the-diagnosis",
    backgroundId: "restaurant",
    mood: "cold",
    presentCharacterIds: ["inner-voice"],
    dialog: [
      {
        speakerId: "inner-voice",
        text: "Pick the register.",
        emotion: "knowing",
        tone: "tactical",
      },
    ],
    choices: [
      {
        id: "antisocial",
        text: "Antisocial (ASPD). Warmth aimed outward as a tool, a fait-accompli extraction, intimacy-language ('family') deployed instrumentally, the public setting chosen for leverage, and zero self-admiration. Pure instrumental use, no ego-feed, no dysregulation.",
        tactic: "Correct. The ASPD-at-work fingerprint is warmth as infrastructure pointed at a target. He does not need to be seen or admired; he needs the rollout. Every clause is engineered to move you, none to reflect glory back onto him.",
        nextSceneId: "diagnosis-correct",
        isOptimal: true,
        event: "tactic-named:antisocial",
      },
      {
        id: "narcissistic",
        text: "Narcissistic. The toast, the standing up, the board watching.",
        tactic: "Close, but wrong. NPD flatters HIMSELF: his vision, his taste in partners, his instinct that picked you. He needs the credit. Renner flatters YOU and does not care about being seen; he cares about the extraction. Praise pointed outward at a target is ASPD instrumentality. Praise pointed inward at the self is NPD supply.",
        nextSceneId: "diagnosis-near-miss",
        isOptimal: false,
      },
      {
        id: "histrionic",
        text: "Histrionic. The theatre of the toast is the tell.",
        tactic: "Miss. HPD performs for the room's attention on himself and enjoys the watching; the performance is the point. Renner's toast is not about being watched, it is about closing a free rollout. The theatre is a means, not the end. HPD wants the room; ASPD wants the deliverable.",
        nextSceneId: "diagnosis-miss",
        isOptimal: false,
      },
      {
        id: "just-a-warm-client",
        text: "Not Cluster B. A warm client who over-promised on your behalf.",
        tactic: "Miss. A non-ASPD client who wanted the extra rollout would: (a) ask privately, (b) raise a change order or budget, (c) not pre-commit your team's labour to his board and then inform you at dinner. The fait-accompli plus public setting plus intimacy-language is the diagnostic shape, not the warmth.",
        nextSceneId: "diagnosis-miss",
        isOptimal: false,
      },
    ],
  },

  // ===================================================================
  // DIAGNOSIS CORRECT
  // ===================================================================
  {
    id: "diagnosis-correct",
    backgroundId: "restaurant",
    mood: "cold",
    presentCharacterIds: ["inner-voice"],
    dialog: [
      {
        speakerId: "inner-voice",
        text: "Register named. The prescription is what you do with the room still watching, and what lands in his inbox tomorrow before the fait accompli hardens into an assumption.",
        emotion: "knowing",
        tone: "tactical",
      },
    ],
    choices: [
      {
        id: "to-prescription",
        text: "What do you do?",
        tactic: "Prescription drill.",
        nextSceneId: "the-prescription",
        isOptimal: true,
      },
    ],
  },

  // ===================================================================
  // THE PRESCRIPTION
  // ===================================================================
  {
    id: "the-prescription",
    backgroundId: "restaurant",
    mood: "peaceful",
    presentCharacterIds: ["inner-voice"],
    dialog: [
      {
        speakerId: "inner-voice",
        text: "Three candidate moves.",
        emotion: "knowing",
        tone: "tactical",
      },
    ],
    choices: [
      {
        id: "scoped-followup",
        text: "In the room: raise your glass, take the compliment warmly, name nothing. Next morning, email: 'Loved last night. The March rollout is exactly the kind of thing we want to build with you. Let me get you a scoped plan and timeline by Thursday so we resource it properly.'",
        tactic: "The structural move does three things: accepts the warmth (so you do not refuse in the room he engineered), converts the fait accompli back into a bounded business transaction, and puts the scope in writing where 'no change order' has to survive contact with a real plan. Neither refusal nor absorption. You moved the decision out of his theatre and onto paper.",
        nextSceneId: "ending-scoped",
        isOptimal: true,
        event: "optimal-with-grace",
      },
      {
        id: "warm-yes",
        text: "In the room: 'Absolutely. We have got you. Consider it done.'",
        tactic: "The warm yes is what the toast was built to extract. It accepts three weeks of unbilled work, skips the change order, and trains the pattern: he learned tonight that the standing-toast-plus-family move converts directly into free scope. The next fait accompli arrives bigger, because this one worked.",
        nextSceneId: "ending-absorbed",
        isOptimal: false,
      },
      {
        id: "public-pushback",
        text: "In the room: 'Well, that would actually be a change order, Renner.'",
        tactic: "Right content, wrong room. You refused in the exact public arena he chose precisely because refusal there is costly. Now you are the one who broke the 'family' warmth in front of his board, and the relationship takes the hit even though your position is correct. Take the position, but take it to writing, privately, tomorrow.",
        nextSceneId: "ending-public-refusal",
        isOptimal: false,
      },
    ],
  },

  // ===================================================================
  // NEAR-MISS / MISS
  // ===================================================================
  {
    id: "diagnosis-near-miss",
    backgroundId: "restaurant",
    mood: "tense",
    presentCharacterIds: ["inner-voice"],
    dialog: [
      {
        speakerId: "inner-voice",
        text: "Close. NPD and ASPD both use people instrumentally, so the surface warmth reads similar. The split is the direction of the praise: NPD flatters himself and needs the credit; ASPD flatters the target and needs the outcome. Re-read the toast. Every compliment points at you, not at him.",
        emotion: "knowing",
        tone: "tactical",
      },
    ],
    choices: [
      {
        id: "retry",
        text: "Continue.",
        tactic: "The teaching has landed; the answer follows.",
        nextSceneId: "diagnosis-correct",
        isOptimal: true,
      },
    ],
  },

  {
    id: "diagnosis-miss",
    backgroundId: "restaurant",
    mood: "tense",
    presentCharacterIds: ["inner-voice"],
    dialog: [
      {
        speakerId: "inner-voice",
        text: "Miss. The diagnostic for ASPD-at-work is instrumental warmth pointed outward at a target, a fait-accompli extraction, and intimacy-language used as a tool, all delivered calm, with no self-admiration and no dysregulation. Re-read the audit columns with that filter.",
        emotion: "knowing",
        tone: "tactical",
      },
    ],
    choices: [
      {
        id: "retry-2",
        text: "Continue.",
        tactic: "The teaching has landed; the answer follows.",
        nextSceneId: "diagnosis-correct",
        isOptimal: true,
      },
    ],
  },

  // ===================================================================
  // ENDINGS
  // ===================================================================
  {
    id: "ending-scoped",
    backgroundId: "restaurant",
    mood: "peaceful",
    isEnding: true,
    outcomeType: "good",
    endingTitle: "The Rollout Scoped",
    endingSummary:
      "You took the compliment and left the extraction behind. The rollout is now a scoped plan with a number attached.",
    endingLearnPrompt:
      "The structural move took the compliment and left the extraction behind. The Thursday scoped plan forces 'no change order' to meet a real timeline and a real cost; either Renner funds the rollout properly or he quietly drops it, and both outcomes are fine. You did not refuse in the room he built for refusing, and you did not absorb three weeks of unbilled work to keep the word 'family' warm. Drill: same six audit columns, same diagnosis, same paper-trail move on the next client who toasts a fait accompli into the room.",
    dialog: [
      {
        speakerId: "inner-voice",
        text: "Glass raised, compliment accepted, nothing conceded. The email goes out at 8:40 the next morning. The rollout is now a scoped plan with a number attached, which is where it always belonged.",
        emotion: "knowing",
        tone: "tactical",
      },
    ],
    choices: [],
  },

  {
    id: "ending-absorbed",
    backgroundId: "restaurant",
    mood: "cold",
    isEnding: true,
    outcomeType: "bad",
    endingTitle: "The Free Rollout",
    endingSummary:
      "The warm yes handed over three weeks of unbilled work and taught the toast-move that it lands.",
    endingLearnPrompt:
      "The warm yes is what most agencies say, and it is exactly what the toast was engineered to produce. Three weeks of unbilled work, no change order, and a pattern reinforced: the standing-glass-plus-family move converts to free scope with you. The next ask comes bigger and framed the same way, because tonight taught him it lands. The drill named the register correctly; the response executed against the wrong move. The fix is not a colder no; it is moving the decision off his theatre and onto paper.",
    dialog: [
      {
        speakerId: "inner-voice",
        text: "Applause at the table. Three weeks of your team, gone, unbilled. The word 'family' did its work, and the next toast is already scheduled somewhere in his head.",
        emotion: "serious",
      },
    ],
    choices: [],
  },

  {
    id: "ending-public-refusal",
    backgroundId: "restaurant",
    mood: "tense",
    isEnding: true,
    outcomeType: "neutral",
    endingTitle: "Right Position, Wrong Room",
    endingSummary:
      "You held the scope but paid for it in the one room the toast was built to charge you in.",
    endingLearnPrompt:
      "Half-correct. Naming the change order protected the scope; naming it in the room he built for refusal cost the relationship. His board watched you break the warmth he had just performed, so the story becomes 'the agency got prickly at dinner,' not 'the client tried to extract three weeks for free.' The scope survives; the goodwill takes a dent it did not need to. The full move keeps the same position and moves it to a private, written, scoped follow-up the next morning. Same content, better room.",
    dialog: [
      {
        speakerId: "inner-voice",
        text: "The table cooled by half a degree. You held the line and the number, and you paid for it in the one currency the setting was designed to charge. Next time: hold the same line, in writing, the next morning.",
        emotion: "knowing",
        tone: "tactical",
      },
    ],
    choices: [],
  },
];

export const clusterBLab22: Scenario = {
  id: "cbl-2-2",
  title: "The Client Dinner",
  tagline: "One toast. One glass. Three unbilled weeks.",
  description:
    "Cluster-B Lab, Level 2 (The Professional Register). The client, not the boss. A standing toast at a client dinner buries an extra market rollout, no change order, inside ninety warm seconds and a room full of witnesses. Six audit columns, four diagnosis options, three prescription moves, only one of which keeps both the scope and the relationship. Drills ASPD instrumental warmth against the NPD supply it is easily mistaken for.",
  tier: "premium",
  track: "cluster-b-lab",
  level: 2,
  order: 2,
  estimatedMinutes: 8,
  difficulty: "intermediate",
  category: "business",
  xpReward: 300,
  badgeId: "the-dinner-scoped",
  startSceneId: "the-toast",
  prerequisites: ["cbl-2-1"],
  isNew: true,
  tacticsLearned: [
    "The six-column toast audit: outward-flattery, intimacy-claim, fait-accompli, buried-cost, identity-bind, intimacy-language",
    "Direction-of-praise as the ASPD-vs-NPD split: outward at a target (ASPD) vs inward at the self (NPD)",
    "The paper-trail move: accept the warmth in the room, convert the fait accompli into a scoped written plan the next morning",
    "Reading the public setting as engineered leverage, refusal is costly there by design, so do not refuse there",
  ],
  redFlagsTaught: [
    "The fait accompli ('I already told my board') that makes declining feel like un-deciding",
    "'No change order' buried mid-sentence between two warm clauses as the buried cost",
    "Intimacy-language ('family, basically') deployed instrumentally to convert a contract into an obligation",
    "The standing public toast as a chosen arena where refusal carries a social price",
  ],
  characters: [INNER_VOICE],
  scenes,
};

export default clusterBLab22;
