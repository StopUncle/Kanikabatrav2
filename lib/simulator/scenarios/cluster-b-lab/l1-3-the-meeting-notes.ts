/**
 * cbl-1-3, "The Meeting Notes"
 *
 * Cluster-B Identification Lab, Level 1, order 3. Short-format
 * diagnostic drill. Target register: narcissistic (NPD). Specific
 * tells the scenario trains the player to see:
 *   - Public crediting that uses passive-voice for your work, active-
 *     voice for theirs
 *   - The "this whole team" frame that absorbs your contribution into
 *     a generic group while highlighting their specific input
 *   - Thank-you note structure: warm to the boss, grateful to "the
 *     team," silent on the named contributor
 *   - The ego-load that splits NPD from ASPD (cbl-1-2): NPD needs the
 *     reframe to feed the self-image; ASPD doesn't care about the
 *     self-image, only the outcome
 *
 * Voice: drill format. Same audit → diagnose → prescribe shape as
 * cbl-1-1 and cbl-1-2. ~8 scenes.
 */

import type { Scenario, Scene } from "../../types";
import { INNER_VOICE } from "../../characters";

const scenes: Scene[] = [
  // ===================================================================
  // OPENING. THE MEETING NOTES
  // ===================================================================
  {
    id: "the-meeting-notes",
    backgroundId: "apartment",
    mood: "tense",
    presentCharacterIds: ["inner-voice"],
    dialog: [
      {
        speakerId: null,
        text: "Tuesday, 5:42 p.m. the Q3 review wrapped at 4:15. The leadership team thanked you specifically in the room, the strategy you wrote was the strategy presented and adopted. The director was explicit: 'this is your work, you should be proud of this.'",
      },
      {
        speakerId: null,
        text: "5:41 p.m. the meeting notes hit your inbox. Sent by a peer. Owen, who attended but did not contribute to the document. The notes summarise the meeting. The summary contains this sentence:",
      },
      {
        speakerId: null,
        text: "'The team's strategic positioning was strongly endorsed, with particularly positive feedback on the framing, much of which Owen has been driving since the Q2 sync.'",
      },
      {
        speakerId: "inner-voice",
        text: "The reframe is in writing. The notes are CC'd to twelve people, including the director who explicitly named you in the room ninety minutes ago. The artefact is the artefact.",
        emotion: "knowing",
      },
    ],
    choices: [
      {
        id: "to-audit",
        text: "Read the notes line-by-line. Annotate the moves.",
        tactic: "The drill format. The audit comes before the diagnosis.",
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
        text: "Three specific moves in one sentence:",
        emotion: "knowing",
      },
      {
        speakerId: null,
        text: "1. 'The team's strategic positioning was strongly endorsed', passive voice on the work itself. The author of the work is absorbed into 'the team.' Your name is not in the sentence.",
      },
      {
        speakerId: null,
        text: "2. 'particularly positive feedback on the framing', the praise is real (the director did say it) but disconnected from the named contributor.",
      },
      {
        speakerId: null,
        text: "3. 'much of which Owen has been driving since the Q2 sync', active voice. Specific name. Specific timeline (deliberately vague, 'much of which,' 'since' implies continuity). The reader without context will conclude Owen has been the prime mover since June.",
      },
      {
        speakerId: "inner-voice",
        text: "The notes are not a lie. Each sentence is technically defensible. The reframe is in the structure: passive when describing your contribution, active when describing his. This is the specific NPD-at-work move, the meeting notes as a credit-laundering instrument.",
        emotion: "knowing",
      },
    ],
    choices: [
      {
        id: "to-diagnosis",
        text: "Name the register.",
        tactic: "Audit complete; diagnosis next.",
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
        id: "narcissistic",
        text: "Narcissistic. The reframe is structural and ego-fed. Owen needs the meeting notes to insert him into the credit chain because the credit going to you reflects badly on his standing. The asymmetry of voice (passive for yours, active for his) is the giveaway.",
        tactic: "Correct. The clinical NPD-at-work tell is the specific need to be in the citation, not the outcome. Owen does not need the strategy to fail; he needs the credit to be ambiguous. The grammar of the meeting notes does both.",
        nextSceneId: "diagnosis-correct",
        isOptimal: true,
        event: "tactic-named:narcissistic",
      },
      {
        id: "antisocial",
        text: "Antisocial. He's instrumentally extracting credit.",
        tactic: "Close, but wrong. ASPD wouldn't bother with the citation. ASPD takes the outcome and moves on. The whole structure of the meeting notes is calibrated to make Owen visible in the credit chain, which is an ego-load move. Re-read: is the move about getting something done, or about being SEEN to be the one doing it?",
        nextSceneId: "diagnosis-near-miss",
        isOptimal: false,
      },
      {
        id: "just-political",
        text: "Not cluster B. He's just being political, credit-grabbing happens at every job.",
        tactic: "Miss. Garden-variety credit-grabbing is direct: 'I led that.' What you have here is grammatically engineered ambiguity, passive for one party, active for another, vague timeline that implies continuity. The construction is too specific to be casual office politics.",
        nextSceneId: "diagnosis-miss",
        isOptimal: false,
      },
      {
        id: "histrionic",
        text: "Histrionic. He needs the attention.",
        tactic: "Miss. HPD attention-seeking is theatrical and immediate, interrupting in meetings, dramatic stories at lunch. This is the opposite register: cool, written, deniable. HPD wants the room; NPD wants the citation.",
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
        text: "The register is narcissistic. The diagnostic: ego-fed reframe, asymmetric voice (passive vs active), vague-continuity language inserting his name into a story he was not the lead author of.",
        emotion: "knowing",
      },
      {
        speakerId: "inner-voice",
        text: "The prescription is the response and it is not a confrontation. NPD-at-work feeds on confrontations because they generate visible drama; the structural counter is a quiet, written, dated, specific record that ends up in the same email chain.",
        emotion: "knowing",
      },
    ],
    choices: [
      {
        id: "to-prescription",
        text: "What is the correct response?",
        tactic: "Prescription half of the drill.",
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
        id: "reply-all-with-correction",
        text: "Reply-all to the meeting notes thread. 'Thanks Owen, small correction for the record: the strategy document was authored end-to-end by me; commit history and Q2 sync notes confirm. Happy to share both with anyone who wants them.' Send.",
        tactic: "Correct. Reply-all puts the correction in the same surface as the reframe. Same recipients, same thread, same searchability. 'Commit history and Q2 sync notes confirm' is the specific move: you are not asserting, you are pointing to dated written evidence. Closed sentence, no attack, no need for him to defend.",
        nextSceneId: "ending-correct",
        isOptimal: true,
        event: "optimal-with-grace",
      },
      {
        id: "private-message",
        text: "DM Owen privately. 'Hey, just saw the notes, I think there might be some confusion about authorship, can we chat?'",
        tactic: "The private channel is the move he wants you to take. The reframe is public; the correction is private; the public record stays as he wrote it. Twelve people now think Owen has been driving the framing since Q2; your private chat does not reach them.",
        nextSceneId: "ending-private-channel",
        isOptimal: false,
      },
      {
        id: "let-it-go",
        text: "Let it go. The director knows. Make the next strategy doc more obviously yours.",
        tactic: "The let-it-go move is a third version of the private-channel one. The director does know and the director is one of twelve recipients. The other eleven, who include people you will need backing from on the next round, have just been seeded with a different version of the credit chain. The cost compounds.",
        nextSceneId: "ending-let-it-stand",
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
        text: "Close. The diagnostic that splits NPD from ASPD here is the ego-load. ASPD would not have written the meeting notes at all, would have taken the outcome and moved on. The fact that someone wrote the notes specifically to insert his name into the credit chain is the NPD signature. Re-read.",
        emotion: "knowing",
      },
    ],
    choices: [
      {
        id: "retry",
        text: "Try again.",
        tactic: "Drill format.",
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
        text: "Miss. Re-read the sentence: passive voice for the work, active voice for the name, vague-continuity timeline inserting him into a history he wasn't lead on. The grammatical asymmetry is the tell. NPD-at-work specialises in language that is technically defensible but structurally engineered.",
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
    endingTitle: "The Record Corrected",
    endingLearnPrompt:
      "NPD-at-work's preferred surface is the written reframe, meeting notes, summary emails, project recaps. The structural counter is the same surface, used immediately, citing dated evidence rather than asserting feeling. Reply-all in eleven minutes; correction in two sentences; evidence offered, not attacked. Owen will not run this play on you again. He will run it on someone else; the someone-else's recovery move is, hopefully, the one you just modelled.",
    dialog: [
      {
        speakerId: "inner-voice",
        text: "Sent at 5:53. Two replies before midnight: the director ('thanks for clarifying'), and a peer who has watched Owen do this twice before ('appreciated, this needed saying'). The record is corrected. The eleven other recipients have an updated version of the citation chain.",
        emotion: "knowing",
      },
    ],
    choices: [],
  },

  {
    id: "ending-private-channel",
    backgroundId: "apartment",
    mood: "tense",
    isEnding: true,
    outcomeType: "neutral",
    endingTitle: "The Private Chat",
    endingLearnPrompt:
      "Private chat with Owen will produce a profuse apology, a 'didn't mean it that way,' an offer to send a 'small correction' tomorrow that arrives next week and is buried in a different thread. The public record stays as he wrote it. The next reframe is in approximately six weeks, and you will have given him the read that you handle this through DM. The structural counter is same-surface, same-thread, same-recipients.",
    dialog: [
      {
        speakerId: "inner-voice",
        text: "DM sent. Apology received. Public record unchanged.",
        emotion: "knowing",
      },
    ],
    choices: [],
  },

  {
    id: "ending-let-it-stand",
    backgroundId: "apartment",
    mood: "cold",
    isEnding: true,
    outcomeType: "bad",
    endingTitle: "The Compounding Reframe",
    failureBlogSlug: "narcissist-playbook-how-they-actually-operate",
    failureBlogTitle: "Narcissist Playbook. How They Actually Operate",
    endingLearnPrompt:
      "The let-it-go move is what NPD-at-work is calibrated to produce. The first reframe lands; you decline to correct; the second reframe arrives in a status update three weeks later, slightly more confident; by Q4 review the citation chain has rewritten itself in writing across six months of meeting notes. Each instance is small enough to feel un-confrontable. The aggregate is unrecoverable. Next time: same-day reply-all, evidence-cited, two sentences.",
    dialog: [
      {
        speakerId: "inner-voice",
        text: "The notes go uncorrected. The Q4 review will surface the cost.",
        emotion: "serious",
      },
    ],
    choices: [],
  },
];

export const clusterBLab13: Scenario = {
  id: "cbl-1-3",
  title: "The Meeting Notes",
  tagline: "5:42 p.m. the notes drop. Your name is in the passive voice. His is in the active.",
  description:
    "Short-format Cluster-B identification drill. Target register: NPD-at-work. The meeting notes from a strategy review you authored end-to-end have just been sent by a peer who didn't contribute. One sentence does three specific things: passive voice for your contribution, active voice for his, vague-continuity timeline inserting his name into a Q2 history he wasn't lead on. The drill teaches the grammatical-asymmetry diagnostic and the same-surface, evidence-cited reply-all as the structural counter.",
  tier: "premium",
  track: "cluster-b-lab",
  level: 1,
  order: 3,
  estimatedMinutes: 7,
  difficulty: "intermediate",
  category: "narcissist",
  xpReward: 260,
  badgeId: "narcissistic-spotted",
  startSceneId: "the-meeting-notes",
  prerequisites: ["cbl-1-1"],
  tacticsLearned: [
    "Read meeting notes / summary emails for grammatical asymmetry as the NPD-at-work tell",
    "Reply-all in the same surface as the reframe, in the same hour",
    "Cite dated written evidence ('commit history,' 'Q2 sync notes') rather than assert feeling",
    "The two-sentence correction with no attack, no defence-bait",
  ],
  redFlagsTaught: [
    "Passive voice on your contribution + active voice on theirs in the same sentence",
    "The 'this whole team' absorbing frame that hides specific authorship",
    "Vague-continuity language ('much of which,' 'since the Q2 sync') that implies a history that does not exist",
    "Private-channel apologies that leave the public record unchanged",
    "The let-it-go move that lets compounding reframes rewrite the citation chain across a quarter",
  ],
  characters: [INNER_VOICE],
  scenes,
};

export default clusterBLab13;
