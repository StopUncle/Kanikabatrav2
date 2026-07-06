/**
 * cbl-4-1, "The Resignation Letter"
 *
 * Cluster-B Identification Lab, Level 4 (Comorbidity), order 1. The
 * first drill where the answer is two registers at once. Same
 * audit -> diagnose -> prescribe shape, but the diagnosis is now a Venn
 * diagram: the correct answer is BPD + NPD comorbid in one person, and
 * each single-register answer is a plausible wrong answer that captures
 * one half of the picture and misses the other.
 *
 * The artefact is a resignation email sent to the whole team, and it
 * runs on two engines at once. The grandiosity engine (NPD): "I built
 * everything, less talented people were promoted over me, this team
 * collapses without me." The abandonment engine (BPD): "you were the
 * one person who understood me, I gave everything and got silence, and
 * this is devastating." The comorbid signature is the co-presence of a
 * rock-stable grandiose self-concept AND an abandonment collapse in the
 * same document. Pure NPD injury stays contemptuous and does not
 * collapse; pure BPD self-image wavers into self-devaluation and does
 * not hold a stable grandiose line.
 *
 * The prescription teaches order: address the DOMINANT register (NPD
 * supply-fishing) first with a clean, non-dramatic acceptance, because
 * feeding the BPD wound first supplies the NPD and rewards the exit as
 * a bid, which guarantees escalation. Then give the wound a single
 * factual acknowledgement so it does not detonate into a splitting exit.
 *
 * Voice: clinical-professional. Drill, not narrative.
 * See reference/KANIKA-VOICE.md and reference/V3-NEW-TRACKS-PLAN.md §6c.
 */

import type { Scenario, Scene } from "../../types";
import { INNER_VOICE } from "../../characters";

const scenes: Scene[] = [
  // ===================================================================
  // OPENING. THE LETTER
  // ===================================================================
  {
    id: "the-letter",
    backgroundId: "apartment",
    mood: "tense",
    presentCharacterIds: ["inner-voice"],
    dialog: [
      {
        speakerId: null,
        text: "8:10 pm. An email lands from Corin, a senior member of your team, sent to the whole department. Subject line: 'Resignation, effective immediately.' It reads:",
      },
      {
        speakerId: null,
        text: "'After three years of carrying this department on my back, I am resigning, effective immediately. I built the entire brand system this company now takes for granted, and I have watched less talented people get promoted over me while my work went uncredited.'",
      },
      {
        speakerId: null,
        text: "'You, of everyone, were the one person here I thought understood what I was building, which is what makes this so devastating. I gave this place everything and it gave me nothing back but silence. This team will not survive six months without me, and when it falls apart, remember that I warned you. I am not angry. I just needed to be somewhere I am actually valued.'",
      },
      {
        speakerId: "inner-voice",
        text: "Read it twice. The first read feels like one person melting down. The second read shows two separate engines running at once, and the whole L4 skill is learning to see both without collapsing them into one. Audit the letter, diagnose the register, prescribe the reply.",
        emotion: "knowing",
        tone: "tactical",
      },
    ],
    choices: [
      {
        id: "to-audit",
        text: "Audit the letter. What is each line actually doing?",
        tactic: "Drill. At L4 the parsing has to separate two registers, not name one.",
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
        text: "Six lines. Two engines. Watch which engine each line belongs to.",
        emotion: "knowing",
        tone: "tactical",
      },
      {
        speakerId: null,
        text: "1. 'carrying this department on my back... effective immediately.' Grandiose self-as-load-bearing (NPD engine) welded to an impulsive same-day exit (BPD engine). The two are already fused in the first sentence.",
      },
      {
        speakerId: null,
        text: "2. 'I built the entire brand system this company now takes for granted.' Pure grandiosity engine: a stable, unwavering claim to specialness and entitlement to credit. Note there is zero self-doubt here.",
      },
      {
        speakerId: "inner-voice",
        text: "3. 'less talented people got promoted over me while my work went uncredited.' Grandiosity engine again: devaluation of colleagues plus narcissistic injury (underappreciation). Still no wavering of the self-image.",
        emotion: "knowing",
        tone: "tactical",
      },
      {
        speakerId: null,
        text: "4. 'You, of everyone, were the one person who understood me... which makes this so devastating.' The engine switches. Abandonment engine: idealisation of one person, splitting the room into the one-who-understood versus everyone else, and a genuine wound. NPD does not say 'devastating.'",
      },
      {
        speakerId: null,
        text: "5. 'I gave everything and it gave me nothing back but silence.' Abandonment engine: the emptiness, the all-or-nothing 'everything for nothing,' the abandonment framing of a job as a relationship that withheld love.",
      },
      {
        speakerId: "inner-voice",
        text: "6. 'This team will not survive without me... I am not angry. I just needed to be valued.' Both engines in one breath: grandiose indispensability and a collapse prophecy (NPD), plus the affective giveaway of 'I am not angry' written inside a letter that is nothing but anger (BPD instability).",
        emotion: "knowing",
        tone: "tactical",
      },
      {
        speakerId: "inner-voice",
        text: "The signature: a rock-stable grandiose self-concept AND an abandonment collapse, co-present in a single artefact. One register cannot produce both. That co-presence is the whole diagnosis.",
        emotion: "knowing",
        tone: "tactical",
      },
    ],
    choices: [
      {
        id: "to-diagnosis",
        text: "Name the register.",
        tactic: "Drill diagnostic. At L4, the answer may be two.",
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
        text: "Pick the register. Remember the level: the answer can be a pairing.",
        emotion: "knowing",
        tone: "tactical",
      },
    ],
    choices: [
      {
        id: "comorbid-bpd-npd",
        text: "Comorbid: BPD + NPD in one person. Stable grandiosity, entitlement to credit, and colleague-devaluation (NPD) fused with abandonment collapse, splitting one person off as the one-who-understood, and affective instability (BPD). Both engines, co-present.",
        tactic: "Correct. The comorbid signature is exactly this co-presence: a self-concept that never wavers from 'I am the most talented and indispensable' (NPD) sitting inside a wound that collapses into 'you were the only one, this is devastating' (BPD). Neither register alone produces both halves. You held the Venn diagram instead of forcing one circle.",
        nextSceneId: "diagnosis-correct",
        isOptimal: true,
        event: "tactic-named:comorbid",
      },
      {
        id: "pure-npd",
        text: "Narcissistic (NPD). The grandiosity, the entitlement, the devaluation of colleagues, the indispensability.",
        tactic: "Half right, and the more common miss. You captured the grandiosity engine perfectly: the stable specialness, the credit-entitlement, the 'they collapse without me.' What you missed is the abandonment engine. NPD injury stays contemptuous and superior ('this place was always beneath me'); it does not idealise one person as the-only-one-who-understood and then collapse into 'devastating.' That vulnerable collapse is BPD. You have one circle of a two-circle answer.",
        nextSceneId: "diagnosis-near-miss",
        isOptimal: false,
      },
      {
        id: "pure-bpd",
        text: "Borderline (BPD). The abandonment wound, the splitting of one person off, the 'everything for nothing,' the volatility.",
        tactic: "Half right. You captured the abandonment engine cleanly: the idealise-then-abandon of the one who understood, the emptiness, the affective instability. What you missed is the grandiosity engine. BPD self-image wavers into self-devaluation under stress ('maybe I am not good enough, maybe I deserve this'); this letter holds a rock-stable 'I built everything, I am the most talented, they collapse without me' line with zero self-doubt. That stable grandiosity is NPD. You have the other circle, not both.",
        nextSceneId: "diagnosis-near-miss",
        isOptimal: false,
      },
      {
        id: "just-burnout",
        text: "Not Cluster B. A burned-out senior employee quitting badly.",
        tactic: "Miss. Ordinary burnout says 'I am exhausted and I am moving on.' It does not braid grandiose indispensability, devaluation of colleagues, idealisation-then-abandonment of one specific person, a collapse prophecy, and 'I am not angry' written in a letter made of anger. The two-engine structure, not the exit itself, is the diagnostic.",
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
        text: "Two registers named. Now the prescription has a new rule the single-register drills did not: order. You cannot address both engines at once, so you address the dominant one first. Here the dominant, load-bearing register is the NPD grandiosity, because the letter is partly a bid, a public exit fishing for a counter-offer of admiration and status. Deny that supply first; the wound gets one clean line after.",
        emotion: "knowing",
        tone: "tactical",
      },
    ],
    choices: [
      {
        id: "to-prescription",
        text: "What do you reply?",
        tactic: "Prescription drill. Dominant register first.",
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
        text: "Three candidate replies. Watch which register each one addresses first.",
        emotion: "knowing",
        tone: "tactical",
      },
    ],
    choices: [
      {
        id: "clean-plus-line",
        text: "Reply to Corin only (not reply-all), brief and level: 'Understood, and I accept your resignation. The brand system work was genuinely strong and I will say so on the record in your reference. HR will handle offboarding; happy to do a proper handover this week.' Then nothing further.",
        tactic: "Correct order. It denies the NPD supply first: no begging, no counter-offer, no drama, so the public exit does not get the admiration-fight it was fishing for. Then it gives the BPD wound exactly one factual, specific acknowledgement (the reference line), which defuses the abandonment collapse without inflating the grandiosity. Reply-to-one, not reply-all, so the splitting has no audience. Dominant register neutralised, secondary register acknowledged, in that order.",
        nextSceneId: "ending-clean",
        isOptimal: true,
        event: "optimal-with-grace",
      },
      {
        id: "warm-rescue",
        text: "Reply-all, warm and pleading: 'Please do not leave. You mean so much to this team, you are so valued, let us talk tonight, I will get you that promotion.'",
        tactic: "Wrong order, and the trap the letter was built for. You addressed the BPD abandonment wound first with reassurance, which feeds the NPD supply directly: the public exit just won the admiration and the counter-offer it fished for. You also validated the splitting in front of the whole team. Either Corin returns on inflated terms with the pattern fully intact, or the same scene runs again, bigger, in six months. Soothing the wound before denying the supply always escalates.",
        nextSceneId: "ending-warm-rescue",
        isOptimal: false,
      },
      {
        id: "cold-brush",
        text: "Reply, one line, flat: 'Resignation accepted. Please return your laptop and badge to HR by Friday.'",
        tactic: "Right order, wrong dose. You correctly denied the NPD supply (no drama, no counter-offer), which is the dominant-register move. But you gave the BPD abandonment wound nothing at all, and a raw abandonment wound met with total coldness tends to detonate: the public LinkedIn post, the client-poaching, the bridge burned on the way out. The fix is not warmth, it is one factual line of genuine acknowledgement. You handled the dominant register and left the secondary one live.",
        nextSceneId: "ending-cold-brush",
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
        text: "One circle, not two. You named a real register that is genuinely in the letter, but this is the comorbidity level: there is a second engine running underneath the one you saw. Re-read for the half you skipped. A stable grandiose self-concept and an abandonment collapse cannot come from a single register, so the answer is the pairing.",
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
        text: "Miss. The diagnostic at L4 is the two-engine structure: a rock-stable grandiose self-concept (NPD) co-present with an abandonment collapse and splitting (BPD) in one artefact. Re-read the audit with that filter. This is not a bad exit; it is two registers braided into one letter.",
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
    id: "ending-clean",
    backgroundId: "apartment",
    mood: "peaceful",
    isEnding: true,
    outcomeType: "good",
    endingTitle: "Both Engines Handled",
    endingSummary:
      "You denied the grandiose supply first, then gave the wound one factual line. The exit stayed clean and private.",
    endingLearnPrompt:
      "Order was the whole test. Denying the NPD supply first (no begging, no counter-offer, reply-to-one not reply-all) meant the public exit never got the admiration-fight it was fishing for, so there was nothing to escalate. The single specific acknowledgement (the reference line) then defused the BPD abandonment wound without feeding the grandiosity. Both engines handled, in sequence, not at once. Drill: at L4, name both registers, decide which is dominant, deny its supply first, and dose the secondary register with exactly enough acknowledgement to stop it detonating.",
    dialog: [
      {
        speakerId: "inner-voice",
        text: "Corin replies once, briefly, and does the handover. No public post, no scene, no counter-offer war. The exit is clean because you answered the dominant engine first and the wound second, and gave neither of them a stage.",
        emotion: "knowing",
        tone: "tactical",
      },
    ],
    choices: [],
  },

  {
    id: "ending-warm-rescue",
    backgroundId: "apartment",
    mood: "cold",
    isEnding: true,
    outcomeType: "bad",
    endingTitle: "You Fed The Supply",
    endingSummary:
      "Reassuring the wound first handed the public exit the admiration and counter-offer it fished for. The pattern is intact.",
    endingLearnPrompt:
      "This is the trap, and it is the instinctive move: someone is in pain, so you soothe the pain. But addressing the BPD abandonment wound first, in public, fed the NPD supply directly. The exit was partly a bid, and you paid it: admiration, a promotion offer, and validation of the splitting, all in front of the team. Corin either returns on inflated terms with the pattern fully preserved, or runs the same scene bigger in six months, because it worked. With comorbid BPD + NPD, soothing the wound before denying the supply always escalates. Deny the supply first; dose the wound second.",
    dialog: [
      {
        speakerId: "inner-voice",
        text: "The team watched you plead. The promotion is on the table. Corin might even stay, on new terms, with the same pattern loaded and the next exit already forming. You treated the pain and fed the engine underneath it.",
        emotion: "serious",
      },
    ],
    choices: [],
  },

  {
    id: "ending-cold-brush",
    backgroundId: "apartment",
    mood: "tense",
    isEnding: true,
    outcomeType: "neutral",
    endingTitle: "Right Order, Wrong Dose",
    endingSummary:
      "You correctly denied the supply, then gave the abandonment wound nothing, and total coldness made it detonate.",
    endingLearnPrompt:
      "Half correct, and the more sophisticated half. You got the order right: you denied the NPD supply with a flat, dramaless acceptance, which is the dominant-register move and the hardest instinct to hold. What you missed was dosage. A raw abandonment wound met with pure coldness tends to detonate into a splitting exit: the public post, the poached client, the burned bridge. The dominant register does not need warmth, but the secondary register needs one factual line of genuine acknowledgement to keep it from blowing up. Order right, dose wrong. Next time: deny the supply and hand the wound a single true sentence.",
    dialog: [
      {
        speakerId: "inner-voice",
        text: "The laptop comes back Friday. So does the public post about how this place chews people up, tagged where the clients will see it. You held the line and skipped the one sentence that would have kept the wound from going off.",
        emotion: "knowing",
        tone: "tactical",
      },
    ],
    choices: [],
  },
];

export const clusterBLab41: Scenario = {
  id: "cbl-4-1",
  title: "The Resignation Letter",
  tagline: "Two engines. One letter. The diagnostic becomes a Venn diagram.",
  description:
    "Cluster-B Lab, Level 4 (Comorbidity). The first drill where the answer is two registers at once. A resignation email to the whole team runs a stable grandiose self-concept (NPD) and an abandonment collapse with splitting (BPD) in the same document. Six audit columns, four diagnosis options with each single-register answer capturing one half of the picture, three prescription replies. Teaches the comorbid signature (co-presence of grandiosity and collapse) and why you address the dominant register first.",
  tier: "premium",
  track: "cluster-b-lab",
  level: 4,
  order: 1,
  estimatedMinutes: 8,
  difficulty: "advanced",
  category: "narcissist",
  xpReward: 360,
  badgeId: "the-comorbid-read",
  startSceneId: "the-letter",
  prerequisites: ["cbl-3-1"],
  isNew: true,
  tacticsLearned: [
    "The two-engine audit: separating the grandiosity engine (NPD) from the abandonment engine (BPD) line by line in one artefact",
    "The comorbid signature: a rock-stable grandiose self-concept co-present with an abandonment collapse, which no single register produces",
    "The single-register misses: pure NPD stays contemptuous and never collapses; pure BPD self-image wavers into self-devaluation and never holds stable grandiosity",
    "Prescription order: name both registers, deny the dominant register's supply first, then dose the secondary register with one factual acknowledgement",
  ],
  redFlagsTaught: [
    "Grandiose indispensability ('this team collapses without me') welded to impulsive same-day exit",
    "Idealisation-then-abandonment of one specific person ('you were the one who understood me... devastating') inside a grandiose letter",
    "'I am not angry' written inside a letter made entirely of anger, as the affective-instability tell",
    "The public reply-all exit as a bid fishing for a counter-offer of admiration and status",
  ],
  characters: [INNER_VOICE],
  scenes,
};

export default clusterBLab41;
