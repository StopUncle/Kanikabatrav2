/**
 * cbl-1-4, "The Engagement Announcement"
 *
 * Cluster-B Identification Lab, Level 1, order 4. Short-format
 * diagnostic drill. Target register: histrionic (HPD). Specific tells:
 *   - Theatricality calibrated for an audience that is in the room
 *   - The "stealing-the-moment" specific move, life event timed to
 *     overlap a friend's milestone
 *   - Sustained attention-seeking through the night (vs. nPD's quieter
 *     credit-engineering, BPD's dysregulation, ASPD's instrumental cool)
 *   - The diagnostic that splits HPD from BPD: HPD performs for the
 *     room when she's regulated; BPD performs only when dysregulated
 *
 * Voice: drill format, ~8 scenes.
 */

import type { Scenario, Scene } from "../../types";
import { INNER_VOICE } from "../../characters";

const scenes: Scene[] = [
  // ===================================================================
  // OPENING. THE DINNER
  // ===================================================================
  {
    id: "the-dinner",
    backgroundId: "apartment",
    mood: "tense",
    presentCharacterIds: ["inner-voice"],
    dialog: [
      {
        speakerId: null,
        text: "Saturday, 8:47 p.m. six women at a long table, the dinner Saskia booked four weeks ago to celebrate her finishing the doctorate. The wine has been good, the conversation has been about the thesis, the speeches were at 8:30. Saskia's partner toasted her. Everyone clapped. The waiter brought tiramisu.",
      },
      {
        speakerId: null,
        text: "At 8:39, just as the dessert arrived, Marina stood up. She held up her hand. The table went quiet. She said, 'I have to share something. Tom proposed last night and I said yes!' She held up her hand again, this time with the ring on it. The table erupted. Phones came out. The next forty-five minutes have been about the engagement: how he asked, where, the photo carousel, the venue ideas, the dress.",
      },
      {
        speakerId: null,
        text: "Saskia is smiling. She has not been asked another thesis question since 8:40. The tiramisu sits half-eaten in front of her.",
      },
      {
        speakerId: "inner-voice",
        text: "The engagement is real. The timing is the artefact. Tom proposed on Friday night. Marina chose to announce it at Saskia's celebration dinner, after the speeches, eighteen minutes after the toast. The choice of moment is the audit subject, not whether the engagement is real, not whether Marina deserves congratulations.",
        emotion: "knowing",
      },
    ],
    choices: [
      {
        id: "to-audit",
        text: "Run the audit. What specifically did Marina just do?",
        tactic: "Drill format. The artefact is the timing of the announcement, not the announcement itself.",
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
        text: "The choices Marina made:",
        emotion: "knowing",
      },
      {
        speakerId: null,
        text: "1. Did not call/text anyone Friday night or Saturday morning. The engagement is fewer than 24 hours old and has been kept silent until this moment.",
      },
      {
        speakerId: null,
        text: "2. Did not announce it on arrival, when the dinner had not yet pivoted to Saskia.",
      },
      {
        speakerId: null,
        text: "3. Waited specifically until after the speeches, until the public part of Saskia's celebration was complete and the room was warm.",
      },
      {
        speakerId: "inner-voice",
        text: "4. Stood up to deliver. Used the body-language framing of a toast. Held the ring up twice. Once before the announcement, once after, calibrated for the phones to come out.",
        emotion: "knowing",
      },
      {
        speakerId: null,
        text: "5. Has, across the last forty-five minutes, redirected three returns to the doctorate back to the engagement.",
      },
      {
        speakerId: "inner-voice",
        text: "Each move in isolation could be excitement. The combination, the calibrated silence, the after-speeches timing, the standing-up theatre, the redirects, is the pattern. Now name the register.",
        emotion: "knowing",
      },
    ],
    choices: [
      {
        id: "to-diagnosis",
        text: "Name the register.",
        tactic: "Diagnosis next.",
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
      },
    ],
    choices: [
      {
        id: "histrionic",
        text: "Histrionic. The whole sequence is calibrated for the room. The 24-hour silence, the standing-up, the ring-up-twice, the sustained redirects. This is theatre, not impulse. HPD specialises in attention-seeking that is socially-readable enough to be deniable as 'just being excited.'",
        tactic: "Correct. The clinical HPD-at-table tell is the calibrated theatricality, sustained, deliberate, performance-shaped. The specific stealing-the-moment timing (after the speeches, before the desserts settled) is the move.",
        nextSceneId: "diagnosis-correct",
        isOptimal: true,
        event: "tactic-named:histrionic",
      },
      {
        id: "narcissistic",
        text: "Narcissistic. She needed to be the centre of attention.",
        tactic: "Close, but wrong. NPD wants the citation in writing, the credit in the chain, quieter, longer-game. HPD wants the room, in the moment, with phones out. The standing-up + ring-up-twice is a body-language move; NPD wouldn't bother with the theatre.",
        nextSceneId: "diagnosis-near-miss",
        isOptimal: false,
      },
      {
        id: "borderline",
        text: "Borderline. She's dysregulated by the wedding excitement.",
        tactic: "Miss. BPD performs only when dysregulated, the dysregulation is the engine. Marina has been calm, calibrated, and conversational across forty-five minutes of the evening. The theatricality is being deployed by a regulated person; that's the HPD-vs-BPD split.",
        nextSceneId: "diagnosis-miss",
        isOptimal: false,
      },
      {
        id: "just-excited",
        text: "Not cluster B. She's just excited.",
        tactic: "Miss. Genuine excitement-on-the-night calls one or two close friends from the parking lot, posts a story, doesn't sit on the news for 24 hours waiting for someone else's celebration to peak. The 24-hour silence is the diagnostic, calibration was the choice.",
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
        text: "The register is histrionic. The diagnostic: calibrated theatricality, deployed by a regulated person, timed to overlap a friend's milestone. The whole sequence reads excitement; the specific timing reveals the register.",
        emotion: "knowing",
      },
      {
        speakerId: "inner-voice",
        text: "The prescription is the move that returns the room to Saskia without making the pivot the new subject. Confronting Marina in the moment hands her the role of victim of confrontation; ignoring her hands her the rest of the evening. The third move is a specific redirect.",
        emotion: "knowing",
      },
    ],
    choices: [
      {
        id: "to-prescription",
        text: "What is the correct response?",
        tactic: "Prescription next.",
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
        text: "Three candidate responses.",
        emotion: "knowing",
      },
    ],
    choices: [
      {
        id: "redirect-warmly",
        text: 'Wait for the next pause. Turn to Saskia. "Sas. I have been thinking about your last chapter all week, the bit about evidentiary thresholds. Tell me what the viva was actually like." Direct, specific question, addressed by name.',
        tactic: "Correct. The redirect names Saskia, references a specific detail of her work, asks a specific question that requires a substantive answer. Marina cannot reframe this back to the engagement without obviously talking over a direct address. The room follows the named question.",
        nextSceneId: "ending-redirected",
        isOptimal: true,
        event: "optimal-with-grace",
      },
      {
        id: "raise-toast-to-saskia",
        text: "Stand up. Propose a counter-toast: 'To Saskia. Dr Saskia.'",
        tactic: "The counter-toast is structurally correct (returns the room to Saskia) but the standing-up move matches Marina's theatre with more theatre. The room will read the counter as competition, which puts Marina in the position of having to graciously accept being interrupted, which she will do, warmly, while the engagement story remains the through-line. Subtler redirect lands cleaner.",
        nextSceneId: "ending-counter-toast",
        isOptimal: false,
      },
      {
        id: "private-message-saskia",
        text: "Text Saskia from your seat: 'I see you. I'm sorry. We'll do another one with just us.'",
        tactic: "The private message is kind and accurate. It also leaves the room running on Marina's track for the remaining ninety minutes. The redirect can do both, restore Saskia in the room AND validate her privately later. Skip the private-only move.",
        nextSceneId: "ending-private-only",
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
        text: "Close. NPD and HPD overlap on attention-seeking; the diagnostic is the surface. NPD wants the citation that lasts (writing, structure). HPD wants the room that's there (theatre, immediacy, phones up). The standing-up-with-ring is a theatre move, not a citation move.",
        emotion: "knowing",
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
        text: "Miss. The 24-hour silence followed by the calibrated reveal is the tell that splits HPD from genuine excitement. Genuine excitement doesn't sit on news for a day waiting for a venue. The wait is the strategy.",
        emotion: "knowing",
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
    id: "ending-redirected",
    backgroundId: "apartment",
    mood: "peaceful",
    isEnding: true,
    outcomeType: "good",
    endingTitle: "The Room Returned",
    endingLearnPrompt:
      "HPD-at-table operates on the room's attention; the structural counter is to redirect the attention specifically, not generically. Naming Saskia + naming a specific detail of her work + asking a specific question is the move Marina cannot smoothly steal back. The redirect does not punish her or expose her, it simply gives the room a more substantive thread to follow. The remaining ninety minutes of dinner are about the doctorate again, with Marina warmly part of the conversation but not its centre.",
    dialog: [
      {
        speakerId: "inner-voice",
        text: "Saskia answers your question for ten minutes. The table follows her. Marina contributes occasionally, warmly, without re-centring. The dinner ends as it should have started, about Saskia.",
        emotion: "knowing",
      },
    ],
    choices: [],
  },

  {
    id: "ending-counter-toast",
    backgroundId: "apartment",
    mood: "tense",
    isEnding: true,
    outcomeType: "neutral",
    endingTitle: "The Counter-Toast",
    endingLearnPrompt:
      "The counter-toast restored Saskia briefly. Five minutes, applause, a warm round. Then the conversation drifted back to the engagement because the toast didn't give the room a substantive thread to chase, only a moment of acknowledgement. Marina graciously accepted the interruption, which strengthened the read of her as the gracious bride. Theatre answered with theatre is one register too noisy. The named-question redirect is quieter and lands harder.",
    dialog: [
      {
        speakerId: "inner-voice",
        text: "Counter-toast at 9:14. Engagement back as the through-line by 9:23. Saskia's tiramisu is finally finished, but cold.",
        emotion: "knowing",
      },
    ],
    choices: [],
  },

  {
    id: "ending-private-only",
    backgroundId: "apartment",
    mood: "cold",
    isEnding: true,
    outcomeType: "neutral",
    endingTitle: "The Private Validation",
    endingLearnPrompt:
      "The private text is real and matters; Saskia will remember it. The room remained Marina's for the rest of the night, which is the cost. The two moves were not exclusive, name the redirect at the table, validate Saskia privately later. Doing only the private one accepts the steal at face value.",
    dialog: [
      {
        speakerId: "inner-voice",
        text: "Text sent. Room unchanged. Saskia replies at 11:14: 'I love you. It is what it is.' The 'it is what it is' is the cost made visible.",
        emotion: "knowing",
      },
    ],
    choices: [],
  },
];

export const clusterBLab14: Scenario = {
  id: "cbl-1-4",
  title: "The Engagement Announcement",
  tagline: "8:47 p.m. after the speeches. Before the desserts settled.",
  description:
    "Short-format Cluster-B identification drill. Target register: HPD. Saskia's celebration dinner. The engagement is real; the timing is the artefact. 24 hours of silence + after-speeches reveal + standing-up theatre + ring-up-twice + sustained redirects across forty-five minutes. The drill teaches the calibrated-theatricality diagnostic and the named-question redirect as the structural counter.",
  tier: "premium",
  track: "cluster-b-lab",
  level: 1,
  order: 4,
  estimatedMinutes: 7,
  difficulty: "intermediate",
  category: "narcissist",
  xpReward: 260,
  badgeId: "histrionic-spotted",
  startSceneId: "the-dinner",
  prerequisites: ["cbl-1-1"],
  tacticsLearned: [
    "Read the timing of life-event announcements as the HPD-at-table tell",
    "The named-question redirect, name the friend + cite a specific detail of her work + ask a specific question",
    "Match register quietly: theatre answered with substantive thread, not louder theatre",
    "Distinguish HPD from BPD by regulation state. HPD performs while regulated, BPD only when dysregulated",
  ],
  redFlagsTaught: [
    "24-hour silence between an event and its public announcement at someone else's celebration",
    "Standing-up + body-language toast framing for non-toast occasions",
    "Ring-up-twice / phones-out calibration for sustained attention",
    "Three+ redirects of conversation back to the announcer's news across the rest of the evening",
    "Counter-toast as theatre-answering-theatre, works briefly, costs the rest of the night",
  ],
  characters: [INNER_VOICE],
  scenes,
};

export default clusterBLab14;
