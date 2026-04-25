/**
 * cbl-2-1 — "The 4:47 p.m. Slack"
 *
 * Cluster-B Identification Lab, Level 2 (The Professional Register),
 * order 1. Drill format proven at L1 scales into the workplace.
 * Same audit → diagnose → prescribe shape; the artefact is now a
 * Slack DM at 4:47 on a Friday, the stakes are professional rather
 * than relational, and the register being identified is covert-NPD
 * boss rather than the four cluster-B types from L1.
 *
 * The whole point of the L2 opener: drill discipline transfers from
 * personal life to professional life without the player needing to
 * be retrained on the format. Same six scenes; same audit columns;
 * same diagnostic-vs-prescription split. Different stakes.
 *
 * Voice: clinical-professional. Drill, not narrative.
 * See reference/KANIKA-VOICE.md and reference/V3-NEW-TRACKS-PLAN.md §6c.
 */

import type { Scenario, Scene } from "../../types";
import { INNER_VOICE } from "../../characters";

const scenes: Scene[] = [
  // ===================================================================
  // OPENING — THE MESSAGE
  // ===================================================================
  {
    id: "the-message",
    backgroundId: "apartment",
    mood: "tense",
    presentCharacterIds: ["inner-voice"],
    dialog: [
      {
        speakerId: null,
        text: "Friday, 4:47 p.m. You have been ten minutes from logging off. Slack pings. The DM is from your director. The screen reads:",
      },
      {
        speakerId: null,
        text: "'Hey — when you have a sec, I have been thinking about the Q4 deliverables and would love to brainstorm some adjustments. Let me know when you are free 🙂'",
      },
      {
        speakerId: "inner-voice",
        text: "Twenty-six words. One emoji. The drill applies: audit the words, diagnose the register, prescribe the response. Drill format does not change because the stakes are professional.",
        emotion: "knowing",
      },
    ],
    choices: [
      {
        id: "to-audit",
        text: "Audit the message. What is each phrase actually doing?",
        tactic: "Drill — the teaching is in the parsing.",
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
        text: "Six phrases. Six functions.",
        emotion: "knowing",
      },
      {
        speakerId: null,
        text: "1. 'Hey —' — softener. Reads as casual; sets up plausible deniability that this is a low-stakes ask.",
      },
      {
        speakerId: null,
        text: "2. 'when you have a sec' — fake-flexibility. Implies the request is small. The actual request will not be small.",
      },
      {
        speakerId: "inner-voice",
        text: "3. 'I have been thinking' — pre-positions the conversation as already-formed in his head. You are joining a conversation he has been having alone.",
        emotion: "knowing",
      },
      {
        speakerId: null,
        text: "4. 'would love to brainstorm' — packages a directive as collaboration. 'Brainstorm' implies open-ended; the verdict is already written.",
      },
      {
        speakerId: null,
        text: "5. 'some adjustments' — load-bearing vagueness. Forces YOU to do the diagnostic work of figuring out what he actually wants. The vagueness is the move.",
      },
      {
        speakerId: null,
        text: "6. 'let me know when you are free 🙂' — passes the calendar burden to you. The smiley is the specific covert softener; it lets him deny coercion if you ever name it.",
      },
      {
        speakerId: "inner-voice",
        text: "Cost ratio: he wrote twenty-six words in eleven seconds. The vagueness will produce two-to-six hours of weekend prep on your side, plus the Monday meeting itself. One-to-one ratio of his effort to your downstream load: roughly 1:200.",
        emotion: "knowing",
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
      },
    ],
    choices: [
      {
        id: "covert-npd",
        text: "Covert NPD. Vague directive packaged as collaboration, smiley as plausible-deniability softener, calendar burden flipped to me, ego-load implicit ('I have been thinking' = my conclusions matter, your timing accommodates them). Specific cost-asymmetry pattern.",
        tactic: "Correct. Covert NPD's professional fingerprint: warmth as infrastructure, vagueness as work-shifting, and the specific Friday-late timing that taxes your weekend at zero cost to his.",
        nextSceneId: "diagnosis-correct",
        isOptimal: true,
        event: "tactic-named:narcissistic",
      },
      {
        id: "antisocial",
        text: "Antisocial. The cost-asymmetry is the tell.",
        tactic: "Close — ASPD and NPD overlap on instrumental use of others — but ASPD wouldn't bother with the smiley or the 'I have been thinking' ego-load. ASPD's professional ask is colder, more direct. The specific warmth-veneer here is NPD.",
        nextSceneId: "diagnosis-near-miss",
        isOptimal: false,
      },
      {
        id: "borderline",
        text: "Borderline. The vagueness is dysregulation.",
        tactic: "Miss. BPD vagueness reads urgent-emotional ('I am freaking out about Q4'); this is calm vagueness. Calm vagueness is the NPD professional fingerprint.",
        nextSceneId: "diagnosis-miss",
        isOptimal: false,
      },
      {
        id: "just-a-busy-boss",
        text: "Not Cluster B. Just a busy boss.",
        tactic: "Miss. A non-NPD boss who needed to discuss Q4 adjustments would: (a) name the deliverables, (b) propose a Monday slot, (c) not deploy a smiley. The specific shape of vague + warm + Friday-late + your-calendar is the diagnostic.",
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
        text: "Register named. The prescription is the response, sent now, before 5 p.m., before the Friday-evening shape locks in.",
        emotion: "knowing",
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
        text: "Three candidate replies.",
        emotion: "knowing",
      },
    ],
    choices: [
      {
        id: "structural-reply",
        text: '"Happy to. Could you share which deliverables and the specific concerns? I will prep responses and we can run through them in 30 minutes Monday morning."',
        tactic: "The structural reply does three things at once: forces him to specify (which kills the load-bearing vagueness), bounds the meeting at 30 minutes, and pushes the conversation to Monday so your weekend is not consumed. The 'happy to' opens; the structure does the work.",
        nextSceneId: "ending-structural",
        isOptimal: true,
        event: "optimal-with-grace",
      },
      {
        id: "warm-flexible-reply",
        text: '"Of course! Free anytime — Monday works, or I can hop on a quick call now if easier."',
        tactic: "The warm-flexible reply is what most professionals send. It hands him the calendar, declines to demand specificity, and offers the now-call which converts your Friday evening into his agenda. Lands the job; costs the weekend; trains the pattern.",
        nextSceneId: "ending-warm-flexible",
        isOptimal: false,
      },
      {
        id: "monday-only-but-vague",
        text: '"Sure — let us catch up Monday. What time works?"',
        tactic: "Half-correct. The Monday-only protects the weekend. The missing half: no specificity request, no time-bound. The Monday meeting will run an hour, cover unwritten territory, and produce a 'send me your plan by Tuesday' wrap-up. Better than warm-flexible; below the structural.",
        nextSceneId: "ending-monday-vague",
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
        text: "Close. ASPD and NPD overlap on cost-asymmetric requests. The split: NPD has ego-load (the 'I have been thinking' = his analysis matters, you accommodate his timing). ASPD wouldn't bother. Re-read the warmth and the smiley.",
        emotion: "knowing",
      },
    ],
    choices: [
      {
        id: "retry",
        text: "Try again.",
        tactic: "Drill.",
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
        text: "Miss. The diagnostic for covert NPD is the calm vagueness — paired with warmth, plausible deniability, and your-calendar burden. Re-read the audit columns with that filter.",
        emotion: "knowing",
      },
    ],
    choices: [
      {
        id: "retry-2",
        text: "Try again.",
        tactic: "Drill.",
        nextSceneId: "the-diagnosis",
        isOptimal: true,
      },
    ],
  },

  // ===================================================================
  // ENDINGS
  // ===================================================================
  {
    id: "ending-structural",
    backgroundId: "apartment",
    mood: "peaceful",
    isEnding: true,
    outcomeType: "good",
    endingTitle: "The Friday Held",
    endingLearnPrompt:
      "The structural reply did the three operational things at once: forced specificity, bounded the meeting, pushed to Monday. Most likely outcome: he sends specifics by Sunday evening (because the alternative is the meeting running on his vague terms, which he does not want either). You arrive Monday with thirty minutes of prepared responses to known questions. The Friday-late move is calibrated against next time. Drill: same six audit columns, same diagnosis, same structural reply on the next message that fits the pattern.",
    dialog: [
      {
        speakerId: "inner-voice",
        text: "Reply sent at 4:53. Phone face-down. Weekend yours. Monday morning will be thirty minutes of bounded conversation about specific deliverables.",
        emotion: "knowing",
      },
    ],
    choices: [],
  },

  {
    id: "ending-warm-flexible",
    backgroundId: "apartment",
    mood: "cold",
    isEnding: true,
    outcomeType: "bad",
    endingTitle: "The Weekend Consumed",
    failureBlogSlug: "architecture-of-control-how-emotional-dependency-is-built",
    failureBlogTitle: "Architecture of Control — How Emotional Dependency Is Built",
    endingLearnPrompt:
      "The warm-flexible reply is what most professionals send. It hands him the calendar, declines to demand specificity, and either pulls you into a Friday-evening call or signs you up for a vague Monday meeting. Either way the weekend is rumination. The pattern trains: he learned today that the Friday-late move works on you; the next message comes in three weeks. The drill identified the register correctly and the reply executed against the wrong move.",
    dialog: [
      {
        speakerId: "inner-voice",
        text: "Friday evening on the call. Saturday's prep document. Sunday's anxiety. Monday's meeting at his rhythm. The weekend is gone; the pattern is reinforced.",
        emotion: "serious",
      },
    ],
    choices: [],
  },

  {
    id: "ending-monday-vague",
    backgroundId: "apartment",
    mood: "tense",
    isEnding: true,
    outcomeType: "neutral",
    endingTitle: "The Half-Bounded Monday",
    endingLearnPrompt:
      "Half-correct. The Monday-only protected the weekend; the absence of specificity and time-bound left the Monday meeting unbounded. Likely outcome: a one-hour call ranging across the entire Q4 plan, ending with 'send me your revised plan by Tuesday EOD.' The full-structural reply prevents this; the half-structural mitigates it. Next time on the same pattern: specifics + time-bound, not just timing.",
    dialog: [
      {
        speakerId: "inner-voice",
        text: "Weekend protected. Monday partially bounded. Tuesday rewrite cued up. The drill almost held; the prescription was the half that gets calibrated next time.",
        emotion: "knowing",
      },
    ],
    choices: [],
  },
];

export const clusterBLab21: Scenario = {
  id: "cbl-2-1",
  title: "The 4:47 p.m. Slack",
  tagline: "Twenty-six words. One emoji. Your weekend.",
  description:
    "Cluster-B Lab, Level 2 (The Professional Register). Drill format proven at L1 scales into the workplace. Same audit-diagnose-prescribe shape on a Friday-late Slack DM from a covert-NPD boss. Six audit columns, four diagnosis options, three prescription replies — only one of which protects the weekend.",
  tier: "premium",
  track: "cluster-b-lab",
  level: 2,
  order: 1,
  estimatedMinutes: 7,
  difficulty: "intermediate",
  category: "narcissist",
  xpReward: 280,
  badgeId: "the-friday-held",
  startSceneId: "the-message",
  prerequisites: ["cbl-1-1"],
  tacticsLearned: [
    "The six-column message audit: softener, fake-flexibility, ego-load, packaged-directive, load-bearing-vagueness, calendar-burden",
    "Calm vagueness + warmth as the covert-NPD professional fingerprint (vs ASPD coldness, BPD urgency)",
    "The structural reply: force specificity, bound the meeting, push to Monday — three moves in one message",
    "The cost-ratio frame: his eleven seconds vs your weekend (roughly 1:200) makes the asymmetry visible",
  ],
  redFlagsTaught: [
    "The Friday-late timing as the specific weekend-tax move",
    "'Some adjustments' as load-bearing vagueness that flips diagnostic work to you",
    "The smiley as plausible-deniability softener that lets him deny coercion if named",
    "'I have been thinking' as ego-load priming the conversation to his pre-formed conclusions",
  ],
  characters: [INNER_VOICE],
  scenes,
};

export default clusterBLab21;
