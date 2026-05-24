/**
 * after-him-6-1, "The Dinner"
 *
 * After-Him L6-1. Six months. A first date with a man the old you
 * would not have noticed. The teaching is the body check at minute
 * fourteen: are you present, or are you comparing. The discipline of
 * L6-1 is presence; not performance, not damage, not healing-as-content.
 * The new man is his own first scene, not the next chapter of a
 * story about the ex.
 *
 * Interior with new man's voice as background; the audit runs in the
 * narrator's head. The new man is not named because he is, structurally,
 * his own first scene, and naming him would code him as the resolution.
 *
 * Teaches:
 *  - Mention the breakup briefly if asked; do not narrate.
 *  - The body check at minute fourteen: present or comparing.
 *  - Do not perform healing. Do not perform damage.
 *  - He is his own first scene, not the next chapter.
 */

import type { Scenario, Scene } from "../../types";
import { INNER_VOICE } from "../../characters";

const scenes: Scene[] = [
  {
    id: "the-restaurant",
    backgroundId: "apartment",
    mood: "peaceful",
    presentCharacterIds: ["inner-voice"],
    dialog: [
      {
        speakerId: null,
        text: "Friday, 7:48 p.m. Six months and one week. The small restaurant on the corner you have walked past for two years and never been in. The wine is the colour of a Sunday. He is across the table, on time, and he laughed at the thing you said about the menu.",
      },
      {
        speakerId: "inner-voice",
        tone: "tactical",
        text: "Minute fourteen. The body check. Are you present, or are you comparing. The honest answer is somewhere on a sliding scale, and the discipline of L6-1 is to answer it honestly to yourself without performing the answer at the table.",
        emotion: "knowing",
      },
      {
        speakerId: null,
        text: "He asks how long you have been single. He asks the way the question is asked by someone who is not auditioning to be the new person; he asks because the next answer is the next thread.",
      },
    ],
    choices: [
      {
        id: "brief-if-asked",
        text: '"A while. I came out of a long-ish one earlier in the year. I am fine." Smile. "What about you?"',
        tactic: "The clean answer. Three sentences. The pivot to him is the courtesy that lets the conversation be his own first scene rather than the inventory of your previous one. The 'I am fine' is the small statement that requires no defence; the pivot is the move that lets him be the topic.",
        nextSceneId: "the-conversation",
        isOptimal: true,
        event: "optimal-with-grace",
      },
      {
        id: "narrate-the-breakup",
        text: '"It was actually really hard. He left me in January and I have been doing this whole thing where I have been running at 5:42 every other morning and I think I am."',
        tactic: "The narration is the leak from L4-2 in date form. The new man, who has been across the table for fourteen minutes, is now being briefed on the eight weeks of work as if he were Naomi. He will be polite, possibly impressed; he will also note that the eight weeks of work has, by minute eighteen, made it to the dinner. The cost is the date is now structurally about the ex.",
        nextSceneId: "the-narration",
        isOptimal: false,
      },
      {
        id: "perform-completely-healed",
        text: '"Oh god, ages ago, completely over it, thrilled to be where I am."',
        tactic: "The performance of completely-healed is a performance, which is the L4-2 deflection in date form. The new man, depending on his calibration, will either believe it and feel something between curiosity and concern, or notice the over-emphasis. The cost is the dinner runs on the energy of having to maintain the performance for the next ninety minutes.",
        nextSceneId: "the-performance",
        isOptimal: false,
      },
      {
        id: "lie-about-it",
        text: '"Oh, I have not really been in a serious one in a while." Smile.',
        tactic: "The lie is the cheapest possible avoidance. The new man, if he is paying attention, will catch the small tonal beat; if he is not, the dinner runs on a small load-bearing untruth. By date four the lie will require correction; the correction will be the conversation that should have been the brief mention at date one.",
        nextSceneId: "the-lie",
        isOptimal: false,
      },
    ],
  },

  {
    id: "the-conversation",
    backgroundId: "apartment",
    mood: "peaceful",
    presentCharacterIds: ["inner-voice"],
    dialog: [
      {
        speakerId: null,
        text: "He talks about his work, which is a thing he is interested in for the right reasons. He asks you about your work, and listens to the answer in a way that makes the answer interesting to you. The two of you discover, around minute thirty-eight, a small specific common reference that produces a particular kind of laugh.",
      },
      {
        speakerId: "inner-voice",
        tone: "tactical",
        text: "The audit at minute fourteen has compressed to a single feedback signal at minute thirty-eight: are you here. The honest answer, currently, is yes. The wonder about the ex did not arrive at the wine glass; the comparison did not arrive at the laugh. The new man is, in this moment, his own first scene.",
        emotion: "knowing",
      },
    ],
    choices: [
      {
        id: "stay-present",
        text: "Stay in the conversation. Let it be the conversation it is being. End the dinner at 10:08 because the dinner ended at 10:08 in the natural way dinners end.",
        tactic: "The clean close. The dinner was the dinner. The man was the man. The night ended at the natural hour. The L6-1 lesson lands: presence is the move, not arrival.",
        nextSceneId: "ending-present",
        isOptimal: true,
      },
      {
        id: "compare-mid-laugh",
        text: 'Mid-laugh, the comparison arrives. The ex laughed differently. Note it. Stay in the laugh anyway.',
        tactic: "The comparison arriving is honest. The discipline is the staying. The body learns: the comparison can arrive and you can also still be at the table. Both pieces of data are useful. The L6-1 lesson is not the absence of comparison; it is the holding of presence through the comparison.",
        nextSceneId: "ending-present-with-comparison",
        isOptimal: true,
      },
      {
        id: "leave-to-process",
        text: 'At 9:18, an early excuse. "Sorry, I should head off. Early start tomorrow."',
        tactic: "The early excuse is the body asking to be alone to process the comparison that arrived at minute thirty-eight. The new man will be gracious; the dinner will be remembered as good but cut short; the next dinner will be harder to schedule because tonight's ended on a note neither of you can quite place.",
        nextSceneId: "ending-early-out",
        isOptimal: false,
      },
    ],
  },

  {
    id: "the-narration",
    backgroundId: "apartment",
    mood: "tense",
    presentCharacterIds: ["inner-voice"],
    dialog: [
      {
        speakerId: null,
        text: "The narration runs eleven minutes. He listens carefully. He says the thing about the running being impressive. He asks one follow-up about therapy, which you have not been doing because the track has been doing it instead, which is not something he needs to know.",
      },
      {
        speakerId: "inner-voice",
        tone: "tactical",
        text: "The narration converted the date into the audit. He is now positioned as the witness to the recovery rather than the next person you are meeting. The L4-2 lesson failed in date form: explain the runs and the runs become the topic, which means the ex becomes the topic, which means the date is, structurally, about the ex.",
        emotion: "serious",
      },
    ],
    choices: [
      {
        id: "redirect-now",
        text: 'Laugh. "OK enough about me. Tell me how you ended up in this neighbourhood."',
        tactic: "Late recovery. The narration happened; the redirect closes it. The remaining ninety minutes are about him, plus a small residue from the narration. The dinner ends at 10:48 instead of 10:08 because the redirect cost twelve minutes, but the dinner happens.",
        nextSceneId: "the-conversation",
        isOptimal: true,
      },
      {
        id: "keep-narrating",
        text: 'Continue. "Yeah, and the thing about week three was."',
        tactic: "The dinner ends at 10:08 as a structurally completed audit performed at someone who was on a date with you. He will be polite; he will not text first; you will text in three days; he will say something kind and busy.",
        nextSceneId: "ending-narrated-dinner",
        isOptimal: false,
      },
    ],
  },

  {
    id: "the-performance",
    backgroundId: "apartment",
    mood: "tense",
    presentCharacterIds: ["inner-voice"],
    dialog: [
      {
        speakerId: null,
        text: "He smiles. He pivots, mostly. The thrilled-to-be-where-I-am hangs in the air at minute twenty for a beat too long, then dissolves into the next topic. The dinner continues on slightly altered chemistry.",
      },
      {
        speakerId: "inner-voice",
        tone: "tactical",
        text: "The performance was noticed at the level of beat-too-long. He will not name it tonight. The dinner runs on the energy of the maintained performance for the next ninety minutes, which is its own small drain. The L6-1 lesson is that performance is the cost; the brief honest answer would have been the cheapest move.",
        emotion: "serious",
      },
    ],
    choices: [
      {
        id: "drop-the-performance",
        text: 'At minute thirty-eight: laugh. "Actually, scratch the thrilled thing. I came out of something earlier in the year. I am OK. I am also still figuring some of it out."',
        tactic: "Late but recoverable. The performance is dropped; the truth lands at a normal volume; the dinner relaxes. The new man will, very probably, also relax. The honest later was always going to be cheaper than the performance now.",
        nextSceneId: "the-conversation",
        isOptimal: true,
      },
      {
        id: "maintain-performance",
        text: "Maintain the performance for the rest of the dinner. End at 10:08 with a polite kiss on the cheek.",
        tactic: "The maintained performance produces a dinner that ends on the surface successfully and on the substance lower than it could have. He will text the next day; the chemistry will be at sixty percent of what the honest version would have built; date two will run on the same sixty percent.",
        nextSceneId: "ending-maintained-performance",
        isOptimal: false,
      },
    ],
  },

  {
    id: "the-lie",
    backgroundId: "apartment",
    mood: "tense",
    presentCharacterIds: ["inner-voice"],
    dialog: [
      {
        speakerId: null,
        text: "He nods. The dinner continues on the smooth surface. He talks about a trip to Lisbon. You realise, at minute fifty-six, that the lie has now precluded any conversation about your January, which means any conversation about your last year, which means a slice of you is sealed off for the rest of this dinner.",
      },
      {
        speakerId: "inner-voice",
        tone: "tactical",
        text: "The lie is a load-bearing untruth. It will require correction by date four; the correction will be its own conversation. The cost is the smooth surface tonight, paid back later, with interest, in awkwardness.",
        emotion: "serious",
      },
    ],
    choices: [
      {
        id: "correct-it-now",
        text: 'Mid-Lisbon: "Actually, I am sorry. I said something off about being single earlier. I came out of something in January, it was longer-ish. I am OK. I just wanted to."',
        tactic: "Late but clean. The correction now is cheaper than the correction at date four. He will, in nine cases out of ten, be glad you said something. The dinner returns to its substance.",
        nextSceneId: "the-conversation",
        isOptimal: true,
      },
      {
        id: "maintain-the-lie",
        text: 'Let it go. Talk about Lisbon.',
        tactic: "The lie is maintained. The cost is structural and deferred. By date three the truth will surface in some accidental way and the surfacing will, retroactively, render tonight slightly worse than it was. The L6-1 lesson is that the cheap honest answer at minute fourteen is the answer that does not require management at any later minute.",
        nextSceneId: "ending-maintained-lie",
        isOptimal: false,
      },
    ],
  },

  // Endings
  {
    id: "ending-present",
    backgroundId: "apartment",
    mood: "peaceful",
    isEnding: true,
    outcomeType: "good",
    endingTitle: "Present",
    endingLearnPrompt:
      "The dinner ended at 10:08 the way dinners end at 10:08. The man was the man. You were you. The audit at minute fourteen compressed to a single yes by minute thirty-eight. The wonder about the ex did not arrive at the wine glass; the comparison did not arrive at the laugh. The L6-1 lesson lands: presence is the move, and the move is cheap because the work was done in the eight weeks. He is his own first scene. The first scene was good. The second scene is yours to schedule.",
    dialog: [
      {
        speakerId: "inner-voice",
        text: "Door of the restaurant. The cold air. Phone in your pocket. His text at 11:14: 'tonight was unexpectedly good. let me know about Thursday.'",
        emotion: "knowing",
      },
      {
        speakerId: "inner-voice",
        tone: "tactical",
        text: "Present is the move.",
        emotion: "knowing",
      },
    ],
    choices: [],
  },

  {
    id: "ending-present-with-comparison",
    backgroundId: "apartment",
    mood: "peaceful",
    isEnding: true,
    outcomeType: "good",
    endingTitle: "Present, With Comparison",
    endingLearnPrompt:
      "The comparison arrived mid-laugh and the body stayed in the laugh anyway. The L6-1 lesson is that the comparison can arrive and the presence holds; the absence of comparison is not the deliverable, the through-line is. The dinner ends at 10:08 with the comparison having occurred once and having not landed beyond the moment. The body has learned: comparison and presence can coexist; the practice is the staying.",
    dialog: [
      {
        speakerId: "inner-voice",
        text: "Door of the restaurant. The cold. His text. The ex laughed differently. The laugh tonight was its own laugh.",
        emotion: "knowing",
      },
    ],
    choices: [],
  },

  {
    id: "ending-early-out",
    backgroundId: "apartment",
    mood: "cold",
    isEnding: true,
    outcomeType: "neutral",
    endingTitle: "Early Out",
    endingLearnPrompt:
      "The dinner ended at 9:18 because the body asked to be alone to process the comparison. The L6-1 lesson lands at half cost: the comparison was honest; the leaving was the move that prevented the staying-through. The new man will be gracious; the next dinner will be harder to schedule; the body has learned that the comparison can be a reason to leave or a reason to stay, and tonight's choice was the reason to leave. Next time, stay in the laugh and audit at the door, not at the table.",
    dialog: [
      {
        speakerId: "inner-voice",
        text: "Walking home at 9:32. The wine still in your blood. The comparison processed alone, which is the way you have done it for eight months.",
        emotion: "serious",
      },
    ],
    choices: [],
  },

  {
    id: "ending-narrated-dinner",
    backgroundId: "apartment",
    mood: "tense",
    isEnding: true,
    outcomeType: "bad",
    endingTitle: "The Audit, Performed",
    failureBlogSlug: "get-over-breakup-like-sociopath",
    failureBlogTitle: "How to Get Over a Breakup Like a Sociopath",
    endingLearnPrompt:
      "The dinner was the audit performed at someone who was on a date with you. He was the witness; you were the patient; the structural shape of a first date does not survive the patient-and-witness arrangement. He will text in three days, kindly, and not press for the second date. The L6-1 lesson failed in date form: explaining the runs is the same as posting them, plus the additional cost of having converted a person into a venue. Next first date, mention briefly if asked, and pivot.",
    dialog: [
      {
        speakerId: "inner-voice",
        text: "Walking home alone at 10:32. His text three days later, kind, busy.",
        emotion: "sad",
      },
    ],
    choices: [],
  },

  {
    id: "ending-maintained-performance",
    backgroundId: "apartment",
    mood: "cold",
    isEnding: true,
    outcomeType: "neutral",
    endingTitle: "The Smooth Surface",
    endingLearnPrompt:
      "The dinner ended at 10:08 with a polite kiss on the cheek. The smooth surface produced a smooth surface. Date two is on the calendar at sixty percent of the chemistry the honest version would have built. The L6-1 lesson lands at half cost: performance is a quiet cost. Drop the thrilled-to-be-where-I-am on date two, ten minutes in, with a small laugh. The honest later is still cheaper than the performed forever.",
    dialog: [
      {
        speakerId: "inner-voice",
        text: "Door of the restaurant. The cheek kiss. The thrilled-to-be sentence hanging in the cold air on the walk home.",
        emotion: "serious",
      },
    ],
    choices: [],
  },

  {
    id: "ending-maintained-lie",
    backgroundId: "apartment",
    mood: "tense",
    isEnding: true,
    outcomeType: "bad",
    endingTitle: "The Load-Bearing Untruth",
    failureBlogSlug: "get-over-breakup-like-sociopath",
    failureBlogTitle: "How to Get Over a Breakup Like a Sociopath",
    endingLearnPrompt:
      "The lie is on the record. The dinner ran smooth. The cost is deferred: by date three or four the truth surfaces accidentally; the surfacing renders tonight retroactively slightly worse than it was. The L6-1 lesson lands at full cost on a delayed timer. The cheap honest answer at minute fourteen would have been the answer that did not require management at any later minute. Next first date, mention briefly if asked. Date two with this man, correct the lie unprompted in the first ten minutes.",
    dialog: [
      {
        speakerId: "inner-voice",
        text: "Walking home at 10:34. The lie sitting in your bag with your keys. Date two on Thursday at 8.",
        emotion: "sad",
      },
    ],
    choices: [],
  },
];

export const afterHim61: Scenario = {
  id: "after-him-6-1",
  title: "The Dinner",
  tagline:
    "Six months on. A first date with a man the old you would not have noticed. Minute fourteen: present, or comparing.",
  description:
    "After-Him L6-1. The first date with the new man at month six. The teaching is presence, not performance. The body check at minute fourteen: are you here, or are you auditing the ex through someone else. Mention the breakup briefly if asked; do not narrate. Do not perform completely-healed. Do not lie. The honest answer at minute fourteen is the answer that does not require management at any later minute. He is his own first scene, not the next chapter of a story about the ex.",
  tier: "premium",
  track: "after-him",
  level: 6,
  order: 1,
  estimatedMinutes: 11,
  difficulty: "intermediate",
  category: "healthy",
  xpReward: 460,
  startSceneId: "the-restaurant",
  prerequisites: ["after-him-5-2"],
  tacticsLearned: [
    "Brief honest answer if asked. Pivot to him.",
    "Body check at minute fourteen, again at thirty-eight.",
    "Comparison can arrive; presence is the staying through.",
    "Do not perform completely-healed. Do not lie about the timeline.",
    "He is his own first scene; the dinner is its own dinner.",
  ],
  redFlagsTaught: [
    "The narration that converts the date into the audit",
    "The thrilled-to-be performance noticed at beat-too-long",
    "The lie-about-being-single as load-bearing untruth on a deferred timer",
    "The early-out that prevents the staying-through of the comparison",
    "The maintained surface that costs sixty percent of the chemistry",
  ],
  characters: [INNER_VOICE],
  scenes,
  isNew: true,
};

export default afterHim61;
