/**
 * cbl-1-1, "The 11:47 p.m. voicemail"
 *
 * Cluster-B Identification Lab, Level 1, order 1. Short-format
 * diagnostic drill. The scenario presents one specific artefact —
 * a four-minute voicemail left at 11:47 p.m. after a dinner that
 * ended, on the surface, fine and asks the player to identify
 * the register.
 *
 * Target register: borderline (BPD). Specific tells the scenario
 * trains the player to see:
 *   - Split in under six sentences ("I love you" → "you never
 *     actually cared about me")
 *   - Abandonment-panic structure: a small ambiguity (you left
 *     early) reframed as a referendum on the relationship
 *   - Idealize-devalue cycling across the same voicemail
 *   - The specific tone-shift: escalation → accusation → flat
 *     resignation → re-escalation
 *
 * Format: short (7 scenes). Opens on the voicemail playback,
 * shifts to the diagnostic choice in scene 3 (what register is
 * this?), feedback in scene 4-5, teaching in scene 6, micro-
 * prescription in scene 7.
 *
 * Voice: reference/KANIKA-VOICE.md. This is a drill, not a
 * narrative, prose compressed, teaching explicit.
 */

import type { Scenario, Scene } from "../../types";
import { INNER_VOICE } from "../../characters";

const scenes: Scene[] = [
  // ===================================================================
  // OPENING. THE VOICEMAIL
  // ===================================================================
  {
    id: "the-voicemail",
    backgroundId: "apartment",
    mood: "tense",
    presentCharacterIds: ["inner-voice"],
    dialog: [
      {
        speakerId: null,
        text: "Wednesday, 7:04 a.m. you wake to one voicemail on your phone. Left at 11:47 p.m. by someone you have been dating for four months. You left dinner at 10:10 last night because you had a 7 a.m. call this morning. She was understanding at the table. The voicemail is four minutes long.",
      },
      {
        speakerId: null,
        text: "You play it on speaker while the kettle boils. The tone shifts seven times across the four minutes, you notice this consciously by minute two. At minute four the voicemail ends with her crying, then steadying, then saying 'call me when you wake up, I love you, sorry for all this.'",
      },
      {
        speakerId: "inner-voice",
        text: "The voicemail is the artefact. The tones, in order, are roughly: warm, apologetic, accusatory, flat, escalated, despairing, recovered. Your job is to name what you are looking at.",
        emotion: "knowing",
      },
    ],
    choices: [
      {
        id: "to-diagnostic",
        text: "Listen to the voicemail again. Count the specific tells.",
        tactic: "The drill format. The teaching is in the specific counted observations, not in the conclusion.",
        nextSceneId: "the-tells",
        isOptimal: true,
      },
    ],
  },

  // ===================================================================
  // THE TELLS
  // ===================================================================
  {
    id: "the-tells",
    backgroundId: "apartment",
    mood: "tense",
    presentCharacterIds: ["inner-voice"],
    dialog: [
      {
        speakerId: null,
        text: "Second playback. You annotate mentally.",
      },
      {
        speakerId: null,
        text: "0:04, 'I just. I really needed to hear your voice before bed.' (warm, specific need named)",
      },
      {
        speakerId: null,
        text: "0:38, 'You left so fast. I know you had to but you left so fast. I keep playing back the way you looked at me when you stood up.' (reframing a normal exit as a wound)",
      },
      {
        speakerId: null,
        text: "1:17, 'Sometimes I think you don't actually, you don't actually love me. I think you are with me because it is easy.' (split from warm to devalued in ninety seconds, no event between)",
      },
      {
        speakerId: null,
        text: "2:04, 'Forget it. Forget everything I just said.' (flat resignation, no recovery offered)",
      },
      {
        speakerId: null,
        text: "2:41, 'Actually, no. I deserve to be heard. I deserve someone who does not just leave at ten o'clock.' (re-escalation, no new information)",
      },
      {
        speakerId: null,
        text: "3:22, crying.",
      },
      {
        speakerId: null,
        text: "3:56, 'Call me when you wake up. I love you. Sorry for all this.' (recovery to idealize)",
      },
      {
        speakerId: "inner-voice",
        text: "Seven tones. Four minutes. No new event in the voicemail, the dinner was fine. The dysregulation is the information. Now name the register.",
        emotion: "knowing",
      },
    ],
    choices: [
      {
        id: "to-diagnosis",
        text: "Identify the register.",
        tactic: "The diagnostic choice is the whole drill.",
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
        text: "Name the cluster-B register, using the tells.",
        emotion: "knowing",
      },
    ],
    choices: [
      {
        id: "borderline",
        text: "Borderline. The split in under six sentences, the idealize-devalue-idealize cycle inside a single artefact, the absent triggering event, 'you left at ten' is not the event, your leaving at all is the abandonment-panic frame.",
        tactic: "Correct. BPD dysregulation runs on the nervous system's sudden swings, not on external events. The clinical tell is the intensity-disproportion: the voicemail is calibrated to a break-up; the event was leaving dinner on time.",
        nextSceneId: "diagnosis-correct",
        isOptimal: true,
        event: "tactic-named:borderline",
      },
      {
        id: "narcissistic",
        text: "Narcissistic. She feels slighted and is making it about her.",
        tactic: "Miss. NPD bait would be colder, sharper, and would frame the voicemail to make you feel small, not to pull you closer. The repeated 'I love you' and the despair are wrong-register for narcissism.",
        nextSceneId: "diagnosis-near-miss",
        isOptimal: false,
      },
      {
        id: "histrionic",
        text: "Histrionic. The theatricality, the crying, the seven tones.",
        tactic: "Closer than NPD. HPD and BPD share the emotional intensity but HPD runs on attention-seeking in the room, not on abandonment-panic after you have left. The voicemail is unwitnessed (she left it to your voicemail, not live); she is dysregulating for herself, not performing for an audience.",
        nextSceneId: "diagnosis-near-miss",
        isOptimal: false,
      },
      {
        id: "not-cluster-b",
        text: "Not cluster B. This is a rough day for someone anxious-attached.",
        tactic: "Miss. Anxious attachment does not split to 'you do not actually love me' without an event. The magnitude of the dysregulation without a magnitude event is the BPD tell. Anxious-attached voicemails are seekings, not splits.",
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
        text: "The register is borderline. The specific diagnostic is: the intensity-to-event ratio. Not every dysregulated person is BPD; not every BPD person dysregulates to clinical extremity. But when you see an artefact this intense with an event this small, the register lives in the cluster-B quadrant, and the specific shape, abandonment-panic with split, is BPD.",
        emotion: "knowing",
      },
      {
        speakerId: "inner-voice",
        text: "The question for the rest of the drill is not whether to return the call. It is what to say when you do.",
        emotion: "knowing",
      },
    ],
    choices: [
      {
        id: "to-prescription",
        text: "What is the correct response?",
        tactic: "The prescription half of the drill.",
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
        text: "Three candidate responses. Only one is the clean move.",
        emotion: "knowing",
      },
    ],
    choices: [
      {
        id: "validate-and-calibrate",
        text: '"I got your message. I am OK. Dinner was fine from my side; I left on time because of the 7 a.m. I will call you tonight at 7. Talk then.", flat, specific, no matching the register.',
        tactic: "Correct. The specific moves: acknowledge receipt, correct the factual frame ('dinner was fine'), schedule the conversation for later (removes the 7 a.m. urgency), do not engage with the content of the split. Flat is the whole move.",
        nextSceneId: "ending-correct",
        isOptimal: true,
        event: "restraint-shown",
      },
      {
        id: "over-reassure",
        text: '"Oh god. I love you, of course I love you, I was just tired, I am so sorry if I seemed cold when I left —"',
        tactic: "Mirroring the intensity rewards the dysregulation. The next voicemail will arrive within three days. The specific failure mode is: your warmth does not calibrate the register down; it calibrates her next escalation up, because she now knows this register produces this warmth.",
        nextSceneId: "ending-over-reassured",
        isOptimal: false,
      },
      {
        id: "match-the-accusation",
        text: '"That was not fair. The dinner was fine. I am not going to respond to a voicemail like that."',
        tactic: "Correct in content, wrong in register, the flat 'I am OK, call you at 7' does the same operational work without engaging the content of the accusation. Engaging the content is what re-escalates. Flat + scheduled is the cleaner move.",
        nextSceneId: "ending-engaged-content",
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
        text: "Close but wrong. NPD and HPD share intensity with BPD but the specific tells differ. The BPD diagnostic is the intensity-disproportion to the event + the split inside the single artefact. Re-read the tells with that filter.",
        emotion: "knowing",
      },
    ],
    choices: [
      {
        id: "retry",
        text: "Try again.",
        tactic: "Drill format, the miss is part of the teaching.",
        nextSceneId: "the-diagnosis",
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
        text: "Miss. Anxious-attached voicemails seek reassurance; they do not split. The tell for BPD here is the 'you do not actually love me' line, that is not a reassurance-seek, it is a devaluation. Anxious-attached would say 'please tell me we are OK.' The difference is the direction.",
        emotion: "knowing",
      },
    ],
    choices: [
      {
        id: "retry-2",
        text: "Try again.",
        tactic: "Drill format.",
        nextSceneId: "the-diagnosis",
        isOptimal: true,
      },
    ],
  },

  // ===================================================================
  // ENDINGS
  // ===================================================================
  {
    id: "ending-correct",
    backgroundId: "apartment",
    mood: "peaceful",
    isEnding: true,
    outcomeType: "good",
    endingTitle: "Register Named, Response Matched",
    endingLearnPrompt:
      "The borderline dysregulation drill: the intensity-to-event ratio is the first diagnostic; the split inside the single artefact is the second. The flat + scheduled response is the shape that does not mirror the register back. You are not 'managing her', you are declining to train her nervous system that this register produces your warmth.",
    dialog: [
      {
        speakerId: "inner-voice",
        text: "Voicemail heard. Register named. Response flat. Scheduled for 7 p.m. the morning continues.",
        emotion: "knowing",
      },
    ],
    choices: [],
  },

  {
    id: "ending-over-reassured",
    backgroundId: "apartment",
    mood: "cold",
    isEnding: true,
    outcomeType: "bad",
    endingTitle: "The Warmth Amplifier",
    failureBlogSlug: "architecture-of-control-how-emotional-dependency-is-built",
    failureBlogTitle: "Architecture of Control. How Emotional Dependency Is Built",
    endingLearnPrompt:
      "Matching intensity with warmth is not kindness; it is reinforcement. The next voicemail of this register will arrive, on average, three to six days from now, and will be slightly more intense, because the nervous system you are in a relationship with just learned that this register works.",
    dialog: [
      {
        speakerId: "inner-voice",
        text: "The warm response sent. The loop trained.",
        emotion: "serious",
      },
    ],
    choices: [],
  },

  {
    id: "ending-engaged-content",
    backgroundId: "apartment",
    mood: "tense",
    isEnding: true,
    outcomeType: "neutral",
    endingTitle: "The Accusation Engaged",
    endingLearnPrompt:
      "Rejecting the accusation on its content is right in substance, wrong in register. The flat-and-scheduled response does the same operational work without giving her material to re-split against. Engaging the content produces a second voicemail tonight; flat-and-scheduled produces a conversation at 7 p.m. on your terms.",
    dialog: [
      {
        speakerId: "inner-voice",
        text: "Content engaged. Expect a second voicemail by noon. Next time: flat-and-scheduled.",
        emotion: "knowing",
      },
    ],
    choices: [],
  },
];

export const clusterBLab11: Scenario = {
  id: "cbl-1-1",
  title: "The 11:47 p.m. voicemail",
  tagline: "Four minutes. Seven tones. No event.",
  description:
    "Short-format Cluster-B identification drill. A four-minute voicemail left at 11:47 p.m. after a dinner that ended, on the surface, fine. The scenario teaches the specific diagnostic for borderline dysregulation: intensity-to-event ratio, the split inside a single artefact, the idealize-devalue-idealize cycle at four-minute scale. Then the prescription, the flat, scheduled response that does not mirror the register back.",
  tier: "premium",
  track: "cluster-b-lab",
  level: 1,
  order: 1,
  estimatedMinutes: 7,
  difficulty: "beginner",
  category: "narcissist",
  xpReward: 240,
  badgeId: "borderline-spotted",
  startSceneId: "the-voicemail",
  tacticsLearned: [
    "The intensity-to-event ratio as the first Cluster-B diagnostic",
    "The split inside a single artefact as the BPD-specific tell",
    "The flat + scheduled response as the register that does not mirror back",
  ],
  redFlagsTaught: [
    "Borderline split in under six sentences without a triggering event",
    "Idealize-devalue cycling inside one voicemail",
    "Abandonment-panic reframing a normal exit as wound",
    "The warm-response reinforcement loop that trains the nervous system",
  ],
  characters: [INNER_VOICE],
  scenes,
};

export default clusterBLab11;
