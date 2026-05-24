/**
 * after-her-6-1, "The Dinner"
 *
 * After-Her L6-1. Six months on. A first date with a woman the old
 * you would not have noticed, because she does not need anything from
 * you to be impressive. The teaching is the same as the female-track
 * dinner: presence, not performance. The male-track twist is that the
 * man who has been through the work is, at this dinner, qualified by
 * the work, and the qualification does not need narration.
 *
 * Interior scene. The new woman is not named; she is her own first
 * scene.
 *
 * Teaches:
 *  - Be present. Do not run the script.
 *  - Do not tell the story of the breakup unprompted.
 *  - Do not perform monk-mode. Do not perform healing.
 *  - The work is the qualification. The work does not need narration.
 */

import type { Scenario, Scene } from "../../types";
import { INNER_VOICE_M } from "../../characters-male";

const scenes: Scene[] = [
  {
    id: "the-restaurant",
    backgroundId: "apartment",
    mood: "peaceful",
    presentCharacterIds: ["inner-voice"],
    dialog: [
      {
        speakerId: null,
        text: "Friday, 7:48 p.m. Six months and a week. A small restaurant in a part of town you have not been to. She picked the place. She is on time. She did not look at the menu before sitting down; she said hello and then sat.",
      },
      {
        speakerId: "inner-voice",
        tone: "tactical",
        text: "Minute fourteen body check. Are you here. The honest answer, currently, is yes. Watch what the body does when the wine arrives, when she laughs, when the comparison shows up if it does.",
        emotion: "knowing",
      },
      {
        speakerId: null,
        text: "She asks where you have been the last year. The way it is asked is the way someone asks who is interested in the answer being interesting, not the answer being a category.",
      },
    ],
    choices: [
      {
        id: "answer-the-year",
        text: '"Quiet year. Worked on a few specific things. I am in a better shape than I was twelve months ago." Pause. "What about you?"',
        tactic: "The clean answer. Three sentences. The work is named in shape, not in detail. The pivot to her is the move; the dinner is her dinner as much as it is yours. The work qualifies you to the conversation without requiring inventory.",
        nextSceneId: "the-conversation",
        isOptimal: true,
        event: "optimal-with-grace",
      },
      {
        id: "tell-the-whole-thing",
        text: '"I came out of a relationship in January, took it pretty hard, did a lot of work on myself, the running, the reading."',
        tactic: "The whole-thing is the L4-2 narration in date form. She will be polite. She will note that twelve minutes into the dinner you led with the breakup, which is structurally the same as saying that the breakup is still the answer to where-you-have-been. The work is, in this register, displayed. Displayed work is also slightly leaked work.",
        nextSceneId: "the-narration",
        isOptimal: false,
      },
      {
        id: "perform-monk-mode",
        text: '"Honestly, I have been working on myself. I do not really do this much anymore. I am being intentional with my time."',
        tactic: "Monk-mode is the male-track performance equivalent of the completely-healed-thrilled-to-be performance on the female track. The being-intentional language is the tell. She will note it. The cost is the dinner runs on the language of self-discipline as a brand, which is its own slight cost.",
        nextSceneId: "the-monk-mode",
        isOptimal: false,
      },
      {
        id: "deflect-completely",
        text: '"Just work. Same as before."',
        tactic: "The deflection is the male-track equivalent of the lie about being single. The deflection is on the record; the deflection precludes any natural way to mention the year over the next two dates; the cost is deferred to date three or four when the truth surfaces accidentally.",
        nextSceneId: "the-deflection",
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
        text: "She talks about a project she has been working on the way someone talks about a project that is technically about other people. The conversation runs through architecture, the city, a small specific argument you both have about a film you have both seen.",
      },
      {
        speakerId: null,
        text: "At minute thirty-six she laughs. The laugh is its own laugh. The comparison about the ex does not arrive at the laugh. The wine glass is the wine glass. The audit underneath is producing a reading that is, currently, present.",
      },
      {
        speakerId: "inner-voice",
        tone: "tactical",
        text: "The qualification is the work. The work is in the body. The work does not need to be on the table.",
        emotion: "knowing",
      },
    ],
    choices: [
      {
        id: "stay-in-it",
        text: "Stay in it. End the dinner at the natural hour. Walk her to her bike.",
        tactic: "The clean close. The dinner ended; the night ended; the next date is hers or yours to schedule. The L6-1 lesson lands: presence is the move, the male-track version of which is being qualified by the work without naming the work.",
        nextSceneId: "ending-present",
        isOptimal: true,
      },
      {
        id: "comparison-arrives-stay",
        text: 'Mid-laugh: the ex laughed differently. Note it. Stay in the laugh anyway.',
        tactic: "The comparison arriving is honest; the staying is the discipline. The L6-1 lesson is not the absence of comparison; it is the through-line of presence.",
        nextSceneId: "ending-present-with-comparison",
        isOptimal: true,
      },
      {
        id: "leave-early",
        text: 'At 9:18: "I should head off. Early start tomorrow."',
        tactic: "The early excuse is the body asking to be alone to audit. The audit at the door is the move; the audit at the table is the cost.",
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
        text: "Nine minutes of running, weights, the L4-1 register translated for a stranger. She listens. She asks about the gym, the way a person asks about a gym they may or may not also belong to. The dinner has, by minute twenty-three, become the dinner about the year of work.",
      },
      {
        speakerId: "inner-voice",
        tone: "tactical",
        text: "The work was the qualification. The work is now displayed. Displayed work is, structurally, slightly less qualifying than worked work, because the display is the request that the work be noticed, and the request signals that the noticing has not yet been internalised.",
        emotion: "serious",
      },
    ],
    choices: [
      {
        id: "redirect-now",
        text: 'Laugh. "Anyway. Enough about my year. Tell me about the project."',
        tactic: "Late recovery. The narration happened; the redirect closes it. The remaining ninety minutes are about her, plus a residue. The dinner happens.",
        nextSceneId: "the-conversation",
        isOptimal: true,
      },
      {
        id: "keep-narrating",
        text: 'Continue. "The thing about that was."',
        tactic: "The dinner becomes the inventory. She will be polite; she will not press for date two; you will text in three days; she will say something kind and busy.",
        nextSceneId: "ending-narrated-dinner",
        isOptimal: false,
      },
    ],
  },

  {
    id: "the-monk-mode",
    backgroundId: "apartment",
    mood: "tense",
    presentCharacterIds: ["inner-voice"],
    dialog: [
      {
        speakerId: null,
        text: "She smiles. The being-intentional language landed somewhere between curiosity and a small flag. The dinner continues. At minute thirty she lightly pokes at it, with kindness, the way a person who is paying attention will poke at a brand performance.",
      },
      {
        speakerId: "inner-voice",
        tone: "tactical",
        text: "She is, in real time, calling the bluff. The monk-mode is a costume; she has noticed; she is giving you the chance to step out of it.",
        emotion: "serious",
      },
    ],
    choices: [
      {
        id: "drop-the-monk-mode",
        text: 'Laugh. "OK, I sound like a brand. I came out of something earlier in the year. I am in a better shape. I am here because I am here, not because I am being intentional about it."',
        tactic: "The drop is the recovery. The honest version lands. She will, very probably, laugh back. The dinner relaxes.",
        nextSceneId: "the-conversation",
        isOptimal: true,
      },
      {
        id: "double-down-monk",
        text: 'Lean in. "No, genuinely, I have made a lot of changes in how I approach things."',
        tactic: "The doubling-down is the male wise-one performance from L3-2 in date form. The dinner ends polite and over. Date two does not happen.",
        nextSceneId: "ending-monk-mode-maintained",
        isOptimal: false,
      },
    ],
  },

  {
    id: "the-deflection",
    backgroundId: "apartment",
    mood: "tense",
    presentCharacterIds: ["inner-voice"],
    dialog: [
      {
        speakerId: null,
        text: "The dinner proceeds on the surface. By minute fifty-six the year of work is sealed off and the year of work is also visible in your face. She notices. She does not press. The dinner is good and is also operating with a slice of you missing.",
      },
      {
        speakerId: "inner-voice",
        tone: "tactical",
        text: "The deflection is load-bearing. The slice of you that is missing is visible to her even if she does not name it. By date four the truth surfaces; the surfacing is the small correction the dinner did not require if the brief version had been told at minute fourteen.",
        emotion: "serious",
      },
    ],
    choices: [
      {
        id: "correct-it-now",
        text: 'Mid-dinner: "Actually, scratch the just-work answer. I came out of something. I am OK. I just wanted to say it because the deflection was off."',
        tactic: "Late but cheap. The correction now is much cheaper than the correction at date four. She will, in nine cases out of ten, be glad you said something.",
        nextSceneId: "the-conversation",
        isOptimal: true,
      },
      {
        id: "maintain-deflection",
        text: 'Let it go. Talk about her project.',
        tactic: "The deflection is maintained. The cost is deferred. By date three the truth surfaces accidentally; tonight retroactively becomes the night the deflection was a deflection.",
        nextSceneId: "ending-maintained-deflection",
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
      "The dinner ended at the natural hour. The bike rack outside. The cold air. Her text at 11:42: 'tonight was actually nice. let me know about Wednesday.' The work was the qualification. The qualification did not require narration. The body did not compare at the laugh; the wine was the wine; the audit produced a single yes by minute thirty-six. The L6-1 lesson lands: the man who has done the work is qualified by the work. The work does not need to be on the table to be in the body.",
    dialog: [
      {
        speakerId: "inner-voice",
        text: "Walk home in the cold. The flat warm by 11:14. Phone on the counter. Wednesday on the calendar.",
        emotion: "knowing",
      },
      {
        speakerId: "inner-voice",
        tone: "tactical",
        text: "Work is the qualification.",
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
      "The comparison arrived once at the laugh; the body stayed in the laugh. The L6-1 lesson holds: presence is the through-line, not the absence of comparison. The dinner ended with her text at 11:42 and a date for Wednesday. The body has learned that the comparison can arrive and the dinner can continue, on the same wine, in the same restaurant, in the same body. Both are real.",
    dialog: [
      {
        speakerId: "inner-voice",
        text: "Walk home. The ex laughed differently. Her laugh tonight was her laugh. Both true. The flat is warm.",
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
      "The dinner ended at 9:18. The body asked to be alone to audit. The L6-1 lesson lands at half cost: the audit at the door was the move, the audit at the table was the cost. She will be gracious; the next date will be harder to schedule. Next time, stay in the laugh.",
    dialog: [
      {
        speakerId: "inner-voice",
        text: "Walking home at 9:32. The audit processed alone in the cold. The dinner ended on a half-beat.",
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
    endingTitle: "The Inventory",
    failureBlogSlug: "get-over-breakup-like-sociopath",
    failureBlogTitle: "How to Get Over a Breakup Like a Sociopath",
    endingLearnPrompt:
      "The dinner became the inventory. The work was displayed; displayed work is slightly less qualifying than worked work. She texted three days later, kindly, busy. The L6-1 lesson lands at full cost: the work is the qualification, the qualification does not require narration, the request to be noticed signals that the noticing has not yet been internalised. Next first date, mention briefly, pivot.",
    dialog: [
      {
        speakerId: "inner-voice",
        text: "Walk home alone at 10:34. Her text three days later, three sentences, polite.",
        emotion: "sad",
      },
    ],
    choices: [],
  },

  {
    id: "ending-monk-mode-maintained",
    backgroundId: "apartment",
    mood: "tense",
    isEnding: true,
    outcomeType: "bad",
    endingTitle: "The Brand",
    failureBlogSlug: "get-over-breakup-like-sociopath",
    failureBlogTitle: "How to Get Over a Breakup Like a Sociopath",
    endingLearnPrompt:
      "The brand was maintained. The dinner ended polite and over. Date two will not happen. The L6-1 lesson lands at full cost: the male wise-one performance is the L3-2 lecture in a first-date register, and is also a costume. The work is qualified by the work; the brand is qualified by the brand; the two are not the same thing. Next first date, drop the being-intentional vocabulary in the first ten minutes if it comes out.",
    dialog: [
      {
        speakerId: "inner-voice",
        text: "Walk home at 10:42. No text. Her bike is gone. The cold is the cold.",
        emotion: "sad",
      },
    ],
    choices: [],
  },

  {
    id: "ending-maintained-deflection",
    backgroundId: "apartment",
    mood: "tense",
    isEnding: true,
    outcomeType: "bad",
    endingTitle: "The Slice Missing",
    failureBlogSlug: "get-over-breakup-like-sociopath",
    failureBlogTitle: "How to Get Over a Breakup Like a Sociopath",
    endingLearnPrompt:
      "The deflection held. The dinner was good and was also operating with a slice of you missing. The cost is deferred. By date three the truth surfaces; tonight retroactively becomes the deflection night. The L6-1 lesson lands at full cost on a delayed timer. Next first date, mention briefly if asked. Date two with this woman, correct the just-work answer unprompted in the first ten minutes.",
    dialog: [
      {
        speakerId: "inner-voice",
        text: "Walk home at 10:38. Date two on Wednesday at 8. The deflection in your bag with your keys.",
        emotion: "sad",
      },
    ],
    choices: [],
  },
];

export const afterHer61: Scenario = {
  id: "after-her-6-1",
  title: "The Dinner",
  tagline:
    "Six months on. A first date with a woman the old you would not have noticed. The work is the qualification.",
  description:
    "After-Her L6-1. The first date at month six. The male-track teaching: the work is the qualification; the qualification does not require narration. Mention the year briefly if asked. Do not run the inventory. Do not perform monk-mode. Do not deflect with just-work. The being-intentional vocabulary is a brand; the brand is qualified by the brand; the work is qualified by the work. She is her own first scene.",
  tier: "premium",
  track: "after-her",
  level: 6,
  order: 1,
  estimatedMinutes: 11,
  difficulty: "intermediate",
  category: "healthy",
  xpReward: 460,
  startSceneId: "the-restaurant",
  prerequisites: ["after-her-5-2"],
  tacticsLearned: [
    "Brief honest answer in shape, not detail. Pivot to her.",
    "Body check at minute fourteen, again at minute thirty-six.",
    "Comparison can arrive; staying through is the discipline.",
    "Do not perform monk-mode. Do not deflect with just-work.",
    "The work is the qualification. The work is in the body, not on the table.",
  ],
  redFlagsTaught: [
    "The narration that displays the work and slightly cheapens it",
    "The being-intentional vocabulary as brand performance",
    "The just-work deflection as load-bearing untruth on a deferred timer",
    "The early-out as audit-at-the-table instead of audit-at-the-door",
    "The doubled-down monk-mode that closes the dinner polite and over",
  ],
  characters: [INNER_VOICE_M],
  scenes,
  isNew: true,
};

export default afterHer61;
