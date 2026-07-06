/**
 * cbl-3-1, "The Group Chat"
 *
 * Cluster-B Identification Lab, Level 3 (The Family Register), order 1.
 * The first family drill. Same audit -> diagnose -> prescribe shape,
 * now applied to a family artefact: a holiday-planning thread in the
 * family group chat. Register: borderline (BPD), the cousin. Relationship
 * is family, so the cost is not billable hours, it is the family system
 * itself.
 *
 * This is the drill the level blurb calls "the one most readers need
 * twice." The BPD-at-family tell is the same intensity-to-event ratio
 * from L1, but the split now runs through a whole family system rather
 * than a single partner: the family becomes all-bad, one member is
 * idealised against the others, and the thread self-soothes back to
 * warmth inside ninety minutes with no acknowledgement of the swing.
 *
 * The teaching split that matters here: dysregulation that returns to
 * warmth on its own (BPD) versus a cold, consistent grievance that does
 * not self-soothe (NPD) versus a performance enjoyed by a regulated
 * person (HPD).
 *
 * Voice: clinical-familial. Drill, not narrative.
 * See reference/KANIKA-VOICE.md and reference/V3-NEW-TRACKS-PLAN.md §6c.
 */

import type { Scenario, Scene } from "../../types";
import { INNER_VOICE } from "../../characters";

const scenes: Scene[] = [
  // ===================================================================
  // OPENING. THE THREAD
  // ===================================================================
  {
    id: "the-thread",
    backgroundId: "apartment",
    mood: "tense",
    presentCharacterIds: ["inner-voice"],
    dialog: [
      {
        speakerId: null,
        text: "The family group chat. Someone floated doing the holiday at Aunt Ruth's again. Your cousin Tamsin starts typing. Over the next ninety minutes the thread reads:",
      },
      {
        speakerId: null,
        text: "2:14 pm: 'So are we doing Christmas at Aunt Ruth's again or is someone finally going to include me in the planning this year 🙃'",
      },
      {
        speakerId: null,
        text: "2:15 pm: 'Because last year I found out the date from Instagram. Cool cool cool.'",
      },
      {
        speakerId: null,
        text: "2:31 pm: 'Honestly forget it. You all clearly have your little group and I am not in it. I will just do my own thing, do not worry about me.'",
      },
      {
        speakerId: null,
        text: "2:32 pm: '@Mum can you call me'",
      },
      {
        speakerId: null,
        text: "3:48 pm, after your aunt replies warmly: 'no you know what, you have always been the one who actually gets me, not like the others 💛 sorry I love you all, I am just tired.'",
      },
      {
        speakerId: "inner-voice",
        text: "The event: not being cc'd on holiday logistics. The response: a full devalue, withdraw, summon, idealise cycle in ninety-four minutes. The drill applies. Audit the messages, diagnose the register, prescribe the reply.",
        emotion: "knowing",
        tone: "tactical",
      },
    ],
    choices: [
      {
        id: "to-audit",
        text: "Audit the thread. What is each message actually doing?",
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
        text: "Six messages. Six functions.",
        emotion: "knowing",
        tone: "tactical",
      },
      {
        speakerId: null,
        text: "1. 'is someone finally going to include me 🙃', the grievance opener. A logistics oversight is framed as exclusion. The intensity already exceeds the event, and the upside-down smiley pre-loads deniability.",
      },
      {
        speakerId: null,
        text: "2. 'found out the date from Instagram. Cool cool cool.', the escalation. Past evidence marshalled to support the exclusion narrative. The flat sarcasm is the tell that the nervous system is climbing, not settling.",
      },
      {
        speakerId: "inner-voice",
        text: "3. 'you all clearly have your little group and I am not in it.', the split, part one. The whole family becomes all-bad in a single sentence, a closed group she is outside of. Note it is the family, plural, not one person who slighted her.",
        emotion: "knowing",
        tone: "tactical",
      },
      {
        speakerId: null,
        text: "4. 'I will just do my own thing, do not worry about me.', the withdrawal threat plus martyrdom. Engineered to make someone rush in to reassure. The exit is an invitation, not a decision.",
      },
      {
        speakerId: null,
        text: "5. '@Mum can you call me', the private summons. Pulls one member out of the group to be the rescuer, off the record, where the swing can run without witnesses.",
      },
      {
        speakerId: "inner-voice",
        text: "6. 'you have always been the one who actually gets me, not like the others 💛 ... I love you all, I am just tired.', the split, part two, plus the return swing. One member is idealised against 'the others,' then the whole thing self-soothes back to warmth with zero acknowledgement of the ninety minutes before it.",
        emotion: "knowing",
        tone: "tactical",
      },
      {
        speakerId: "inner-voice",
        text: "Ratio: the event was a missed cc. The response was a devalue of the entire family, a withdrawal threat, a private summons, an idealisation of one member against the rest, and a return to warmth, all inside ninety-four minutes. Intensity-to-event, plus the split inside a single thread, plus the swing that resolves itself.",
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
        id: "borderline",
        text: "Borderline (BPD). Intensity disproportionate to a missed cc, the split running through the whole family system (all-bad family, one idealised rescuer), the withdraw-then-summon cycle, and the return swing to warmth that resolves on its own. Family-system splitting.",
        tactic: "Correct. The BPD-at-family fingerprint is the intensity-to-event ratio plus the split inside one thread plus the self-resolving return. The nervous system, not the missed cc, wrote all six messages. The idealisation of one member against 'the others' is the split doing its work on the whole family.",
        nextSceneId: "diagnosis-correct",
        isOptimal: true,
        event: "tactic-named:borderline",
      },
      {
        id: "narcissistic",
        text: "Narcissistic. The 'include me,' the grievance, the martyrdom.",
        tactic: "Close, but wrong. NPD grievance is about status and stays cold and consistent: 'you disrespected me,' held, chilly, no self-soothing. It does not swing to 'you get me, I love you all, I am just tired' ninety minutes later. Narcissistic injury does not talk itself back to warmth on its own; borderline dysregulation does. The return swing is the split.",
        nextSceneId: "diagnosis-near-miss",
        isOptimal: false,
      },
      {
        id: "histrionic",
        text: "Histrionic. The 🙃, the drama staged for the group.",
        tactic: "Miss. HPD drama is performed for the room's attention and the person stays regulated while performing. This reads as genuine dysregulation: the withdrawal, the private @Mum summons off the group, the exhausted return. She is not performing for the group; she is being run by the swing. HPD performs while regulated; BPD is driven while dysregulated.",
        nextSceneId: "diagnosis-miss",
        isOptimal: false,
      },
      {
        id: "just-family-drama",
        text: "Not Cluster B. Someone felt left out and said so.",
        tactic: "Miss. Ordinary hurt feelings say 'hey, I felt left out last year, can we loop me in?' and stay there. They do not devalue the whole family, threaten withdrawal, summon one member privately, idealise that member against the rest, and return to warmth inside ninety-four minutes. The shape (disproportion plus split plus self-resolving cycle) is the diagnostic, not the initial hurt.",
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
        text: "Register named. The prescription is your reply, and the first decision is which channel you answer in, the group or the private DM she just opened by idealising your aunt.",
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
        text: "Three candidate replies.",
        emotion: "knowing",
        tone: "tactical",
      },
    ],
    choices: [
      {
        id: "flat-reinclude",
        text: "In the group, flat and warm and concrete: 'You are in it, Tamsin. Aunt Ruth's on the 25th, 1 pm. Can you bring the pavlova you did last year? It is not the same without it.'",
        tactic: "The structural reply reincludes her concretely (a date, a time, a defined role), answers in the group rather than the private idealising DM, and engages none of the grievance content. Flat plus specific plus a real job does not mirror the intensity and does not recruit you into the split. It keeps the family system whole.",
        nextSceneId: "ending-reincluded",
        isOptimal: true,
        event: "optimal-with-grace",
      },
      {
        id: "private-rescue",
        text: "DM her privately: 'Oh no, you ARE included, you know you are my favourite, ignore them, they did not mean it.'",
        tactic: "The private rescue accepts the idealisation and joins the split: 'you and me against them.' It rewards the withdrawal threat with private supply, so the next thread's swing arrives faster because this register just produced this rescue. It also quietly poisons the system: you now hold a secret alliance against the rest of the family.",
        nextSceneId: "ending-private-rescue",
        isOptimal: false,
      },
      {
        id: "litigate-inclusion",
        text: "In the group, defending everyone: 'That is not fair, we literally always include you, last year was one mistake and you know it.'",
        tactic: "Half-correct in setting, wrong in move. Answering in the group is right; litigating the grievance is not. You engaged the accusation on its own terms, which mirrors the intensity and validates the frame that this is a debate about inclusion. Now the thread has sides. Flat plus concrete-reinclusion beats being factually correct about the cc.",
        nextSceneId: "ending-litigated",
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
        text: "Close. NPD and BPD both open with grievance and martyrdom, so the first two messages read similar. The split is the ending: narcissistic injury stays cold and holds; borderline dysregulation swings back to 'I love you all, I am just tired' on its own. Re-read message six. The self-soothing return is the borderline tell.",
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
        text: "Miss. The diagnostic for BPD-at-family is the intensity-to-event ratio, the split running through the whole family system, and the swing that self-resolves inside the thread. Re-read the audit columns with that filter: a missed cc did not write six messages, a dysregulated nervous system did.",
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
    id: "ending-reincluded",
    backgroundId: "apartment",
    mood: "peaceful",
    isEnding: true,
    outcomeType: "good",
    endingTitle: "The System Held",
    endingSummary:
      "A concrete place in the plan reincluded her without feeding the split. The family system stayed whole.",
    endingLearnPrompt:
      "The flat reinclusion gave the nervous system what it actually needed, a concrete place in the plan, without giving the split what it wanted, a private alliance and a fight. You answered in the group, not the idealising DM, so no one got recruited against anyone. You gave her a job (the pavlova), which is inclusion she can hold onto. You engaged none of the grievance, so there was nothing to escalate. Drill: same six audit columns, same diagnosis, same flat-plus-concrete reply on the next thread that swings this way, and there will be a next thread.",
    dialog: [
      {
        speakerId: "inner-voice",
        text: "She reacts with a heart to the message and asks whether people still like the passionfruit one. The thread moves on to logistics. The family system is intact, and no one spent the evening managing a crisis.",
        emotion: "knowing",
        tone: "tactical",
      },
    ],
    choices: [],
  },

  {
    id: "ending-private-rescue",
    backgroundId: "apartment",
    mood: "cold",
    isEnding: true,
    outcomeType: "bad",
    endingTitle: "Recruited Into The Split",
    endingSummary:
      "The private rescue made you the favourite tonight and set you up to be the villain of the next thread.",
    endingLearnPrompt:
      "The private rescue felt kind and was the exact move the thread was built to produce. You accepted the idealisation, so you are now the 'one who gets me,' which is a role with a shelf life: the same split that made you all-good tonight will make you all-bad the first time you do not rescue on cue. You joined the 'us against them' frame, so you now hold a secret alliance that quietly corrodes the family. And you rewarded the withdrawal threat with private supply, so the next swing comes sooner. The fix is not a colder message; it is answering in the group, flat, with a concrete role.",
    dialog: [
      {
        speakerId: "inner-voice",
        text: "She feels held, for tonight. You are the favourite, for tonight. The next thread arrives in nine days, and this time the one who does not understand her is someone else at the table.",
        emotion: "serious",
      },
    ],
    choices: [],
  },

  {
    id: "ending-litigated",
    backgroundId: "apartment",
    mood: "tense",
    isEnding: true,
    outcomeType: "neutral",
    endingTitle: "The Thread Took Sides",
    endingSummary:
      "Correcting the record on the missed cc turned the thread into a courtroom with sides.",
    endingLearnPrompt:
      "Half-correct. Answering in the group was right; litigating the grievance was not. By defending everyone and correcting the record, you engaged the accusation on its own terms, which validates the frame that this is a debate about whether she is included. Now the thread has sides: relatives reply agreeing with you, one agrees with her, and the logistics vanish under a fight nobody wanted. Being factually right about the cc did not help. The full move gives her a concrete place in the plan and engages none of the grievance content.",
    dialog: [
      {
        speakerId: "inner-voice",
        text: "Three relatives pile in agreeing with you. One quietly sides with Tamsin. The date for Aunt Ruth's is still not confirmed, and the group chat is now a courtroom.",
        emotion: "knowing",
        tone: "tactical",
      },
    ],
    choices: [],
  },
];

export const clusterBLab31: Scenario = {
  id: "cbl-3-1",
  title: "The Group Chat",
  tagline: "One missed cc. Ninety-four minutes. The whole family split.",
  description:
    "Cluster-B Lab, Level 3 (The Family Register). The first family drill, and the one most readers need twice. A holiday-planning thread in the family group chat runs a full devalue-withdraw-summon-idealise cycle in ninety-four minutes over a missed cc. Six audit columns, four diagnosis options, three prescription replies, only one of which keeps the family system whole. Drills BPD family-system splitting against the NPD grievance and HPD performance it is mistaken for.",
  tier: "premium",
  track: "cluster-b-lab",
  level: 3,
  order: 1,
  estimatedMinutes: 8,
  difficulty: "advanced",
  category: "social-dynamics",
  xpReward: 340,
  badgeId: "the-thread-held",
  startSceneId: "the-thread",
  prerequisites: ["cbl-2-2"],
  isNew: true,
  tacticsLearned: [
    "The six-column thread audit: grievance-opener, escalation, split-part-one, withdrawal-martyrdom, private-summons, idealise-and-return",
    "The self-resolving return swing as the BPD-vs-NPD split: dysregulation talks itself back to warmth, narcissistic injury holds cold",
    "Answering in the group, not the idealising DM, to avoid being recruited into the split",
    "Flat plus concrete-reinclusion (a date, a time, a real role) as the reply that reincludes without mirroring the intensity",
  ],
  redFlagsTaught: [
    "Intensity disproportionate to the event (a missed cc) as the first family-register tell",
    "The split running through the whole family system: all-bad family, one idealised rescuer",
    "The private summons ('@Mum can you call me') that pulls a rescuer off the group and off the record",
    "The idealisation ('you get me, not like the others') as a recruitment offer, not a compliment",
  ],
  characters: [INNER_VOICE],
  scenes,
};

export default clusterBLab31;
