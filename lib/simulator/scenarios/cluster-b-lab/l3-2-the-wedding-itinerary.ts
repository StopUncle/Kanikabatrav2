/**
 * cbl-3-2, "The Wedding Itinerary"
 *
 * Cluster-B Identification Lab, Level 3 (The Family Register), order 2.
 * Same audit -> diagnose -> prescribe shape. Register: histrionic (HPD),
 * the register not drilled since L1-4. Relationship: the aunt (L3-1 took
 * the cousin). The artefact is a self-appointed wedding-weekend itinerary
 * email, a written family artefact not used elsewhere in the track.
 *
 * The teaching splits HPD from the two registers it is most often mistaken
 * for at a family table. HPD vs BPD: the histrionic display seeks the
 * audience's gaze and resolves the moment the room looks; it is not
 * abandonment-panic, which resolves only when the relationship is
 * reassured and secured. HPD vs NPD: histrionic hunger is for being
 * watched, not for being ranked above; the aunt wants the spotlight, not
 * the pedestal, and even (winkingly) defers to the bride.
 *
 * The prescription is the HPD-in-family counter: give scheduled, bounded
 * attention she controls nothing about, never compete with the display,
 * and redirect the other spotlights structurally rather than confronting
 * the grab (confrontation hands HPD the bigger scene it feeds on).
 *
 * Voice: clinical-familial. Drill, not narrative.
 * See reference/KANIKA-VOICE.md and reference/V3-NEW-TRACKS-PLAN.md §6c.
 */

import type { Scenario, Scene } from "../../types";
import { INNER_VOICE } from "../../characters";

const scenes: Scene[] = [
  // ===================================================================
  // OPENING. THE ITINERARY
  // ===================================================================
  {
    id: "the-itinerary",
    backgroundId: "apartment",
    mood: "tense",
    presentCharacterIds: ["inner-voice"],
    dialog: [
      {
        speakerId: null,
        text: "Six weeks before your wedding. Your aunt Delphine, whom nobody asked to coordinate anything, emails the whole family. Subject: 'The OFFICIAL wedding weekend itinerary.' It reads:",
      },
      {
        speakerId: null,
        text: "'Darlings, I have taken the liberty of putting together the official weekend plan. Friday rehearsal dinner: Aunt Delphine's welcome toast (I have been working on it for weeks!). Saturday before the ceremony: I will be doing the readings AND handling the emotional moments, someone has to hold this family together 💕.'",
      },
      {
        speakerId: null,
        text: "'My outfit is sorted, the emerald sequined gown is ready, do not worry, I would never upstage the bride 😉. Reception: a special surprise performance from yours truly right after the first dance 🎤. Cannot WAIT to make this weekend unforgettable for you all!! Love, your favourite aunt ✨.'",
      },
      {
        speakerId: "inner-voice",
        text: "Every single line routes the room's eyes to one place, and it is not the altar. The drill applies. Audit the itinerary, diagnose the register, prescribe the reply.",
        emotion: "knowing",
        tone: "tactical",
      },
    ],
    choices: [
      {
        id: "to-audit",
        text: "Audit the itinerary. What is each line actually doing?",
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
    backgroundId: "apartment",
    mood: "tense",
    presentCharacterIds: ["inner-voice"],
    dialog: [
      {
        speakerId: "inner-voice",
        text: "Six moves. One destination for all of them: the spotlight.",
        emotion: "knowing",
        tone: "tactical",
      },
      {
        speakerId: null,
        text: "1. 'I have taken the liberty... the OFFICIAL plan.' Self-appointment to the coordinator role, the position that faces the room. Nobody gave it to her; she took the one seat that gets watched.",
      },
      {
        speakerId: null,
        text: "2. 'Aunt Delphine's welcome toast (working on it for weeks!).' A spotlight slot inserted into someone else's event, with the effort advertised. Announcing the rehearsal is the performance; the toast is secondary.",
      },
      {
        speakerId: "inner-voice",
        text: "3. 'I will be handling the emotional moments, someone has to hold this family together 💕.' She casts herself as the emotional centre of the day. Note it is not competence she is claiming (that would be one register over), it is being the feeling everyone looks to.",
        emotion: "knowing",
        tone: "tactical",
      },
      {
        speakerId: null,
        text: "4. 'The emerald sequined gown is ready, I would never upstage the bride 😉.' Engineered visibility plus a deniable wink. Naming 'upstage' plants the exact idea she is disclaiming; the statement gown does the work the words deny.",
      },
      {
        speakerId: null,
        text: "5. 'A special surprise performance from yours truly right after the first dance 🎤.' A literal performance slot, scheduled to inherit the room's gaze the instant the couple's spotlight ends. The timing is the tell.",
      },
      {
        speakerId: "inner-voice",
        text: "6. 'Make this weekend unforgettable for you all... your favourite aunt ✨.' Reframes the couple's day as her production, her gift, the thing she makes memorable. Every device points the same way. Not one asks to be reassured, and not one claims to be better than the bride.",
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
    backgroundId: "apartment",
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
        id: "histrionic",
        text: "Histrionic (HPD). Every device (self-appointed emcee role, scheduled surprise performance, statement gown, deniable wink) routes the room's gaze to her. The display hunts the audience and resolves when eyes land; it neither fishes for a secured bond nor claims superiority over the bride.",
        tactic: "Correct. The HPD-at-family fingerprint is the systematic routing of every spotlight to herself, satisfied by being watched. She shows no abandonment fear and no claim to be better than the bride; she winks that she would 'never upstage' her. She wants the eyes, not the pedestal and not the reassurance.",
        nextSceneId: "diagnosis-correct",
        isOptimal: true,
        event: "tactic-named:histrionic",
      },
      {
        id: "borderline",
        text: "Borderline (BPD). The 'someone has to hold this family together,' the emotional neediness, the intensity.",
        tactic: "Close, and this is the split most people miss. BPD neediness is abandonment-driven and resolves only when the relationship is reassured and secured; it reads 'are you upset with me, do you still want me there, are you pushing me out.' Delphine shows zero abandonment fear. Her displays resolve the moment the audience looks, not when a bond is confirmed. Attention satisfied by being seen, not by being reassured, is HPD.",
        nextSceneId: "diagnosis-near-miss",
        isOptimal: false,
      },
      {
        id: "narcissistic",
        text: "Narcissistic (NPD). She is making the whole wedding about herself, that is grandiosity.",
        tactic: "Close, but wrong on the axis. NPD centres itself on superiority: my taste, my judgment, this would be a disaster without me, these people are beneath me. Delphine does not claim to be better than the bride; she winkingly defers ('I would never upstage the bride'). She wants the audience's eyes, not a rank above them. HPD hungers to be watched; NPD hungers to be admired as superior.",
        nextSceneId: "diagnosis-near-miss",
        isOptimal: false,
      },
      {
        id: "just-dramatic",
        text: "Not Cluster B. A dramatic, over-excited aunt.",
        tactic: "Miss. An excited aunt offers to help and asks what the couple actually wants. She does not self-appoint an emcee role, schedule her own performance after the first dance, advertise a statement gown at the altar, and reframe the wedding as the thing she will make unforgettable. The systematic routing of every spotlight to herself is the diagnostic, not the enthusiasm.",
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
    backgroundId: "apartment",
    mood: "cold",
    presentCharacterIds: ["inner-voice"],
    dialog: [
      {
        speakerId: "inner-voice",
        text: "Register named. The counter for HPD is counter-intuitive: you do not fight the display, because a fight is a bigger stage. You give her a scheduled, bounded piece of attention she controls nothing about, and you close the other spotlights structurally so there is nothing left to grab.",
        emotion: "knowing",
        tone: "tactical",
      },
    ],
    choices: [
      {
        id: "to-prescription",
        text: "What do you reply?",
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
    backgroundId: "apartment",
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
        id: "bounded-spotlight",
        text: "Call her, warm: 'Delphine, I would love you to give the welcome toast at the rehearsal dinner, two minutes, you are wonderful at that. The ceremony readings are already assigned and the reception run-of-show is locked with the planner, but the rehearsal toast is all yours.'",
        tactic: "The structural move gives her one real, bounded, scheduled audience moment (which satisfies the histrionic need cheaply and on your terms), and closes every other grab without a fight: 'already assigned,' 'locked with the planner' are structure, not confrontation. She gets a spotlight; you keep the wedding. Never competed, never confronted, redirected.",
        nextSceneId: "ending-bounded",
        isOptimal: true,
        event: "optimal-with-grace",
      },
      {
        id: "confront",
        text: "Reply to the family email: 'Delphine, this is my wedding, not your show. There is no surprise performance, and you are not doing the emotional moments.'",
        tactic: "Right content, catastrophic move. A direct, public confrontation hands HPD the bigger stage it feeds on: now she performs the wounded aunt to the entire family, the drama triples, and you are the villain at your own wedding. You cannot shame a spotlight-hunger out of existence; a confrontation is simply a larger spotlight with you cast as the aggressor.",
        nextSceneId: "ending-confront",
        isOptimal: false,
      },
      {
        id: "capitulate",
        text: "Reply-all: 'Aww, that is so sweet of you, thank you, sounds perfect!' and let the itinerary stand.",
        tactic: "Conflict avoided, wedding colonised. Left unbounded, the surprise performance, the emcee role, and the emerald gown at the altar siphon the day's spotlight in a dozen small moments. Survivable, she is family, but the couple's day is steadily diluted. The bounded-attention move gives her exactly enough to be satisfied without ceding the whole program.",
        nextSceneId: "ending-capitulate",
        isOptimal: false,
      },
    ],
  },

  // ===================================================================
  // NEAR-MISS / MISS
  // ===================================================================
  {
    id: "diagnosis-near-miss",
    backgroundId: "apartment",
    mood: "tense",
    presentCharacterIds: ["inner-voice"],
    dialog: [
      {
        speakerId: "inner-voice",
        text: "Close. You named a register that shares surface features with this one, emotional intensity or self-centring. The HPD test is what the display is hunting: not a secured relationship (that resolves on reassurance, BPD), not a rank above others (that resolves on being admired as superior, NPD), but the audience's gaze, which resolves the instant the room looks. Re-read with that filter.",
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
    backgroundId: "apartment",
    mood: "tense",
    presentCharacterIds: ["inner-voice"],
    dialog: [
      {
        speakerId: "inner-voice",
        text: "Miss. The diagnostic for HPD-at-family is the systematic routing of every spotlight to herself, satisfied by being watched. Re-read the audit: a self-appointed emcee role, a scheduled performance after the first dance, a statement gown, a deniable wink. Enthusiasm does not build a room around itself like this; spotlight-hunger does.",
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
    id: "ending-bounded",
    backgroundId: "apartment",
    mood: "peaceful",
    isEnding: true,
    outcomeType: "good",
    endingTitle: "The Spotlight, Scheduled",
    endingSummary:
      "One bounded toast satisfied the hunger; the other grabs closed on structure, not a fight. The wedding stayed yours.",
    endingLearnPrompt:
      "You solved for the register, not the behaviour. HPD hunger is for the gaze, so you handed her a real one (the rehearsal toast) on your terms, bounded to two minutes, and she took it happily because it is a genuine spotlight. Every other grab closed on structure ('already assigned,' 'locked with the planner'), which is not a fight and gives the display nothing to escalate against. Drill: with HPD, never compete and never confront; schedule a contained spotlight and redirect the rest structurally. Give the gaze, keep the day.",
    dialog: [
      {
        speakerId: "inner-voice",
        text: "Delphine gives a warm, genuinely lovely two-minute toast at the rehearsal, glows all night, and does not miss the readings or the missing performance slot because she already had her moment. The wedding stays the couple's. The register was fed exactly enough.",
        emotion: "knowing",
        tone: "tactical",
      },
    ],
    choices: [],
  },

  {
    id: "ending-confront",
    backgroundId: "apartment",
    mood: "cold",
    isEnding: true,
    outcomeType: "bad",
    endingTitle: "You Built Her A Bigger Stage",
    endingSummary:
      "A public confrontation handed the spotlight-hunger a bigger scene and cast you as the villain at your own wedding.",
    endingLearnPrompt:
      "You cannot shame a spotlight-hunger out of existence; you can only give it a larger spotlight, and a public confrontation is exactly that. Delphine now performs the wounded, unappreciated aunt to the whole family, the drama triples, relatives take sides, and the story becomes 'the bride attacked her aunt over a kind gesture.' The content of your reply was correct; the arena was the one thing you must never give an HPD register, a big audience and a conflict to star in. Redirect structurally; never confront the display.",
    dialog: [
      {
        speakerId: "inner-voice",
        text: "The family thread lights up. Delphine is 'heartbroken' and 'only trying to help,' in three long, public messages. Aunts are calling. You are now managing a scene the size of the wedding, six weeks out, and you are the one who started it.",
        emotion: "serious",
      },
    ],
    choices: [],
  },

  {
    id: "ending-capitulate",
    backgroundId: "apartment",
    mood: "tense",
    isEnding: true,
    outcomeType: "neutral",
    endingTitle: "The Colonised Wedding",
    endingSummary:
      "Avoiding the conflict let the itinerary stand, and the day's spotlight got siphoned in a dozen small moments.",
    endingLearnPrompt:
      "The warm yes kept the peace and lost the day by degrees. Left unbounded, the surprise performance runs, the emcee role sticks, the emerald gown appears at the altar, and each small grab is too minor to object to in the moment, so none of them get stopped. It is survivable (she is family, the marriage is still the point), but the couple's day is quietly diluted. The fix is not confrontation, it is the bounded-attention move: give her one real scheduled spotlight so the hunger is satisfied, and close the rest on structure.",
    dialog: [
      {
        speakerId: "inner-voice",
        text: "The performance happens. So does the emerald gown, three rows from the altar, in every ceremony photo. Delphine has a wonderful weekend. Your wedding was lovely, and a little bit hers.",
        emotion: "knowing",
        tone: "tactical",
      },
    ],
    choices: [],
  },
];

export const clusterBLab32: Scenario = {
  id: "cbl-3-2",
  title: "The Wedding Itinerary",
  tagline: "An official itinerary nobody asked for. Every line points at her.",
  description:
    "Cluster-B Lab, Level 3 (The Family Register). The aunt, not the cousin. A self-appointed wedding-weekend itinerary email routes every spotlight (the welcome toast, the emotional moments, a statement gown, a surprise performance after the first dance) to one place, and it is not the altar. Six audit columns, four diagnosis options, three prescription replies. Drills HPD spotlight-hunger against the BPD abandonment-panic and NPD superiority it is mistaken for, and teaches the give-bounded-attention, never-confront counter.",
  tier: "premium",
  track: "cluster-b-lab",
  level: 3,
  order: 2,
  estimatedMinutes: 8,
  difficulty: "advanced",
  category: "social-dynamics",
  xpReward: 340,
  badgeId: "the-spotlight-bounded",
  startSceneId: "the-itinerary",
  prerequisites: ["cbl-3-1"],
  isNew: true,
  tacticsLearned: [
    "The six-column itinerary audit: self-appointed role, inserted spotlight slot, emotional-centre claim, engineered visibility, scheduled performance, production-reframe",
    "The HPD-vs-BPD split: the display resolves when the audience looks (HPD), not when the relationship is reassured and secured (BPD)",
    "The HPD-vs-NPD split: hunger for the gaze (HPD) versus hunger for a rank above others (NPD); the aunt winkingly defers rather than claiming superiority",
    "The HPD-in-family counter: give scheduled, bounded attention, never compete with the display, redirect the other spotlights structurally rather than confronting the grab",
  ],
  redFlagsTaught: [
    "Self-appointment to the coordinator or emcee role nobody offered",
    "A performance slot scheduled to inherit the room's gaze right after the couple's spotlight moment",
    "The deniable wink ('I would never upstage the bride 😉') that plants the exact idea it disclaims",
    "Reframing someone else's milestone as the production she will make unforgettable",
  ],
  characters: [INNER_VOICE],
  scenes,
};

export default clusterBLab32;
