/**
 * after-her-3-2, "The Boys"
 *
 * After-Her L3-2. Friday, 8:48 p.m. The bar two streets over. Three
 * men who have been your friends for a decade. They have a plan for
 * you. The plan involves three drinks and a stranger. They mean well.
 * They are wrong.
 *
 * The discipline is declining the plan without lecturing them, and
 * staying for the one drink without performing monk-mode. Both
 * performances (the rebound, the lecture) are tells that the audit
 * has not landed yet. The clean move is one drink, present, then
 * home to the booked thing tomorrow.
 *
 * Antagonist: MARCUS_BOY (voice of the boys).
 *
 * Teaches:
 *  - The boys are not the enemy. They are wrong about the solution.
 *  - The rebound is the worst version of the gym-as-substitute.
 *  - Lecturing them is the wise-one performance, which is also the spiral.
 *  - One drink, present, then home. The clean Friday.
 */

import type { Scenario, Scene } from "../../types";
import { INNER_VOICE_M, MARCUS_BOY } from "../../characters-male";

const scenes: Scene[] = [
  {
    id: "the-bar",
    backgroundId: "apartment",
    mood: "tense",
    presentCharacterIds: ["marcus-boy", "inner-voice"],
    dialog: [
      {
        speakerId: null,
        text: "Friday, 8:48 p.m. The bar two streets over. The kind of bar with an outdoor pen and a heat lamp and a happy hour that ends at nine. Marcus has bought you a drink before you have taken your coat off. Dev and Sam are at the back of the pen.",
      },
      {
        speakerId: "marcus-boy",
        emotion: "happy",
        text: 'Drink. Look around. There is a woman by the bar who has looked at you twice. I have been counting.',
      },
      {
        speakerId: "inner-voice",
        tone: "tactical",
        text: "Marcus has a plan. The plan is the plan he has had for every bad breakup any of the boys has ever had, which is three drinks and a stranger. He is right that the body wants a hit. He is wrong about which hit.",
        emotion: "knowing",
      },
    ],
    choices: [
      {
        id: "one-drink-stay-present",
        text: 'Sip the drink. "Mate, I am one and out. Tell me about the new job."',
        tactic: "The clean move. One drink, present, redirect to him. The boys are not refused, they are not lectured, they are not denied; they are joined for the part of the night that is friendship, not the part that is plan. The redirect to the job is the same move as the female-track Naomi-pivot.",
        nextSceneId: "marcus-pivots",
        isOptimal: true,
        event: "restraint-shown",
      },
      {
        id: "approach-the-stranger",
        text: 'Look over. She is looking back. Marcus claps you on the shoulder. "Go on, man."',
        tactic: "The approach is the rebound in real time. Tomorrow morning is worse than any morning since she left. You learn nothing new about yourself; you confirm the structural belief the boys have, which is that the answer to a woman is another woman. The body's schedule is filled by a stranger; the schedule has not ended, it has expanded.",
        nextSceneId: "the-stranger",
        isOptimal: false,
      },
      {
        id: "lecture-the-boys",
        text: 'Put the drink down. "Lads, I am working on something. I do not need a stranger. I need to actually sit with what is going on."',
        tactic: "The lecture is the wise-one performance, male edition. The boys feel scolded. The night becomes about your healing, which is structurally the same as the night being about her. You came to see them, not to perform your process at them. Decline the plan, do not narrate the alternative.",
        nextSceneId: "the-lecture",
        isOptimal: false,
      },
      {
        id: "down-the-drink",
        text: 'Down the drink. "Another. And another. Tonight we get it out of the system."',
        tactic: "The boys' plan, accepted in full. Three drinks become five. The stranger may or may not happen; the night either way ends with you at 3 a.m. typing things into Notes. The schedule's slot is filled by alcohol and rage, which is the worst combination the male track produces.",
        nextSceneId: "the-three-drinks",
        isOptimal: false,
      },
    ],
  },

  {
    id: "marcus-pivots",
    backgroundId: "apartment",
    mood: "peaceful",
    presentCharacterIds: ["marcus-boy", "inner-voice"],
    dialog: [
      {
        speakerId: "marcus-boy",
        emotion: "happy",
        text: 'Right. So, the job. It is a lot, mate. So they offered me the role on Tuesday but they want me in Berlin twice a month, so I am trying to figure out.',
      },
      {
        speakerId: "inner-voice",
        tone: "tactical",
        text: "He took the pivot gratefully. Marcus also did not come to the bar to spend two hours pointing at strangers; he came to drink with his friends. Dev and Sam join. The conversation becomes the conversation. The plan was the opening; the night is the rest.",
        emotion: "knowing",
      },
    ],
    choices: [
      {
        id: "stay-an-hour",
        text: 'Stay an hour. One drink. Walk home in the cold. Bed by 11.',
        tactic: "The follow-through. One drink, the conversation, the walk home. The body's slot is filled by friendship, not by the schedule, not by a stranger, not by rage. The Friday is what a Friday should be at week two: small, social, ending early.",
        nextSceneId: "ending-clean-friday",
        isOptimal: true,
      },
      {
        id: "second-drink",
        text: 'Marcus orders a second round. "One more. It is Friday."',
        tactic: "The second drink is fine. The third is where the body's reasoning becomes the boys' reasoning. The discipline of L3-2 is one drink because the male track is, at this point, made of small disciplines that compound. The second drink is not the failure; it is the door the failure walks through.",
        nextSceneId: "the-second-drink",
        isOptimal: false,
      },
    ],
  },

  {
    id: "the-second-drink",
    backgroundId: "apartment",
    mood: "tense",
    presentCharacterIds: ["marcus-boy", "inner-voice"],
    dialog: [
      {
        speakerId: "marcus-boy",
        emotion: "happy",
        text: 'OK but actually, the woman is still there. She has looked at you four times now. I have, again, been counting. Just go say hi.',
      },
      {
        speakerId: "inner-voice",
        tone: "tactical",
        text: "Marcus's plan returns at drink two because the plan is what Marcus is for. The redirect held for an hour. The body has the warmth of the second drink and the social proof of the table, which is the chemistry the stranger was always going to use.",
        emotion: "serious",
      },
    ],
    choices: [
      {
        id: "one-more-redirect",
        text: 'Smile. "Marcus, no. Tell me what you decided about Berlin."',
        tactic: "Late recovery. The redirect at drink two is harder than it was at drink one; Marcus is, by drink two, halfway through his own narrative; the pivot to Berlin re-engages him on the topic he actually came to discuss. The Friday is salvaged.",
        nextSceneId: "ending-clean-friday",
        isOptimal: true,
      },
      {
        id: "approach-late",
        text: 'Stand. Look at her. Walk to the bar.',
        tactic: "The approach at drink two is the same approach as drink one in lower lighting. The chemistry is the same. The cost is the same. Drink-two is not a permission; it is a longer runway to the same outcome.",
        nextSceneId: "the-stranger",
        isOptimal: false,
      },
    ],
  },

  {
    id: "the-stranger",
    backgroundId: "apartment",
    mood: "tense",
    presentCharacterIds: ["inner-voice"],
    dialog: [
      {
        speakerId: null,
        text: "Her name is Anna. She is a graphic designer. She laughs at the thing you say about the cocktail name. She gives you her number. You leave the bar with her at 11:38. You wake up at her flat at 7:14 a.m. wearing a t-shirt that smells of her cat.",
      },
      {
        speakerId: "inner-voice",
        tone: "tactical",
        text: "Anna did not do anything wrong. The schedule's slot was filled tonight by a stranger. The body learned that on Friday at 11 p.m., the dopamine event arrives in the form of a graphic designer named Anna. Next Friday the body will be looking for the same delivery system.",
        emotion: "serious",
      },
    ],
    choices: [
      {
        id: "be-honest-with-anna",
        text: 'Coffee at her place. "Anna, I broke up two weeks ago. This was not fair to you. I should not have done this tonight."',
        tactic: "Late recovery for Anna. Honest, late, the right thing said to the right person at the right time. The cost is not zero: the schedule's slot still got filled tonight, the chemistry still landed, the body still learned a delivery system. But Anna is not used; the integrity is kept.",
        nextSceneId: "ending-anna-honesty",
        isOptimal: true,
      },
      {
        id: "ghost-anna",
        text: 'Leave. Do not text. Block the number in three days when she chases.',
        tactic: "Anna becomes one of the small invisible costs of the audit not landing in time. She did nothing wrong. The schedule fills its slot. Tomorrow's first move: re-do L2-1, and book Friday night next week for a non-bar context that does not have a happy hour ending at nine.",
        nextSceneId: "ending-anna-ghost",
        isOptimal: false,
      },
    ],
  },

  {
    id: "the-lecture",
    backgroundId: "apartment",
    mood: "tense",
    presentCharacterIds: ["marcus-boy", "inner-voice"],
    dialog: [
      {
        speakerId: "marcus-boy",
        emotion: "confused",
        text: 'OK, mate. Whatever you need. Dev, you wanted to tell me about the.',
      },
      {
        speakerId: "inner-voice",
        tone: "tactical",
        text: "The room cooled half a degree. Marcus turned away faster than he would have. The lecture put a thin wall between you and the boys at exactly the time of week the male track requires the boys to be there. Dev is now looking at his pint. Sam has not said anything for four minutes.",
        emotion: "serious",
      },
    ],
    choices: [
      {
        id: "soften-after-lecture",
        text: 'Soften. "Sorry, lads. I love you for it. Marcus, the job?"',
        tactic: "Late recovery. The lecture is on the record; the redirect lands after it. The night recovers, partly. The wall is half-removed. Tomorrow you will not feel scolded by your own performance, which would have been the worse residue.",
        nextSceneId: "marcus-pivots",
        isOptimal: true,
      },
      {
        id: "leave-the-bar-righteously",
        text: 'Stand. "I should head off, lads. I will be in touch."',
        tactic: "Leaving the bar twenty minutes in is the wise-one performance closing on its own applause. The boys will let you go; they will also notice; by next week the call from Marcus is the call you do not get. The L5 hoover lands into a quieter male room than it would have. The male track requires Marcus and Dev in week six. Tonight you taught them you do not.",
        nextSceneId: "ending-righteous-exit",
        isOptimal: false,
      },
    ],
  },

  {
    id: "the-three-drinks",
    backgroundId: "apartment",
    mood: "tense",
    isEnding: true,
    outcomeType: "bad",
    endingTitle: "The Boys' Plan, Executed",
    failureBlogSlug: "get-over-breakup-like-sociopath",
    failureBlogTitle: "How to Get Over a Breakup Like a Sociopath",
    endingLearnPrompt:
      "Three drinks became five. The stranger happened, or did not, and the night either way ended at 2:48 a.m. with you typing a paragraph into Notes that has her name in it nine times. You learned nothing new about yourself. You confirmed what Marcus believes, which is that the answer to a woman is another woman or another bottle, and which is incorrect by every available metric of the next two weeks. Tomorrow's first move: water, ibuprofen, walk, re-do L2-1, book a non-bar Friday plan for next week.",
    dialog: [
      {
        speakerId: "inner-voice",
        text: "Bottle five. Notes app open. Her name underlined for some reason. The bar is closing in twelve minutes.",
        emotion: "sad",
      },
    ],
    choices: [],
  },

  // Endings
  {
    id: "ending-clean-friday",
    backgroundId: "apartment",
    mood: "peaceful",
    isEnding: true,
    outcomeType: "good",
    endingTitle: "One Drink, Present",
    endingLearnPrompt:
      "One drink. The Berlin conversation. The walk home in the cold. Bed by 11:18. The boys were not refused; they were joined for the friendship and declined for the plan. Marcus will not remember that he tried the woman thing; he will remember the laugh about Dev's bike. Next Friday is booked at someone's flat for dinner instead of a bar with a happy hour. The schedule's Friday slot belongs, tonight, to friendship.",
    dialog: [
      {
        speakerId: "inner-voice",
        text: "Door of the flat at 11:18. Phone in the drawer. Tomorrow: climb at 11, lunch with the parents at 2. The Friday slot was friendship.",
        emotion: "knowing",
      },
      {
        speakerId: "inner-voice",
        tone: "tactical",
        text: "Joined the friendship, declined the plan.",
        emotion: "knowing",
      },
    ],
    choices: [],
  },

  {
    id: "ending-anna-honesty",
    backgroundId: "apartment",
    mood: "cold",
    isEnding: true,
    outcomeType: "neutral",
    endingTitle: "The Anna Honesty",
    endingLearnPrompt:
      "Anna got the honesty on a Saturday morning. The right thing was said to the right person at the right time. The cost is not zero: the schedule's slot got filled, the body learned that Friday at 11 p.m. is a stranger event, next Friday will be harder to honor. The integrity is kept; the structural failure of L3-2 is recorded. The lesson lands at three-quarter cost. Re-do L2-1 on the Saturday afternoon, book the Friday after next at a non-bar venue.",
    dialog: [
      {
        speakerId: "inner-voice",
        text: "Anna's door at 8:14. Walk home in the daylight. The kettle on. The flat colder than it was two weeks ago somehow.",
        emotion: "serious",
      },
    ],
    choices: [],
  },

  {
    id: "ending-anna-ghost",
    backgroundId: "apartment",
    mood: "tense",
    isEnding: true,
    outcomeType: "bad",
    endingTitle: "The Ghost",
    failureBlogSlug: "get-over-breakup-like-sociopath",
    failureBlogTitle: "How to Get Over a Breakup Like a Sociopath",
    endingLearnPrompt:
      "Anna chased on Sunday. You did not answer. You blocked the number Tuesday. Anna did nothing wrong. The schedule's slot was filled by a stranger and the stranger was treated as a slot. The man your friends know and the man Anna will tell her friends about are different men, and the difference is the cost. The track does not punish you; it records that the male-track L3-2 was failed in a way that produced a person, not a song or a feeling. Re-do L2-1. Book non-bar Fridays. Re-read L1-1; the unsent text Anna would have written would have been short.",
    dialog: [
      {
        speakerId: "inner-voice",
        text: "Anna's number blocked. The flat. The Friday slot belongs, now, to the shape of a graphic designer named Anna whose name you will mostly not remember.",
        emotion: "sad",
      },
    ],
    choices: [],
  },

  {
    id: "ending-righteous-exit",
    backgroundId: "apartment",
    mood: "cold",
    isEnding: true,
    outcomeType: "bad",
    endingTitle: "The Righteous Exit",
    failureBlogSlug: "get-over-breakup-like-sociopath",
    failureBlogTitle: "How to Get Over a Breakup Like a Sociopath",
    endingLearnPrompt:
      "The bar was left at 9:12 p.m. by a man who had to perform his own healing at three other men. By next week the male track has lost the boys as anchor; by L5 the hoover will land into a male room with fewer voices in it. The lecture is the wise-one performance, male edition; the cost is the social anchor the rest of the track was relying on. Tomorrow's first move: text Marcus, apologise without theatre, book dinner with him for Tuesday. The anchor is repaired in the same register the breach was, which is direct.",
    dialog: [
      {
        speakerId: "inner-voice",
        text: "Flat at 9:48. Television off. The exit was elegant and the room you left got smaller in your absence. Marcus did not text.",
        emotion: "sad",
      },
    ],
    choices: [],
  },
];

export const afterHer32: Scenario = {
  id: "after-her-3-2",
  title: "The Boys",
  tagline:
    "Friday, 8:48 p.m. Marcus has a plan. The plan involves three drinks and a stranger. One drink, present, then home.",
  description:
    "After-Her L3-2. The boys are not the enemy. They are wrong about the solution. The teaching is declining the plan without lecturing, and staying for the friendship without performing monk-mode. Both performances (the rebound, the lecture) are the same self-indulgence in different costumes. The clean Friday is one drink, the Berlin conversation, the walk home in the cold. The male track requires the boys present; this is the level where you teach yourself that joining the friendship is not the same as accepting the plan.",
  tier: "premium",
  track: "after-her",
  level: 3,
  order: 2,
  estimatedMinutes: 12,
  difficulty: "advanced",
  category: "social-dynamics",
  xpReward: 440,
  startSceneId: "the-bar",
  prerequisites: ["after-her-3-1"],
  tacticsLearned: [
    "Decline the plan, join the friendship. They are different things.",
    "The redirect to his job is the same Naomi-pivot from the female track.",
    "Lecturing the boys is the male wise-one performance.",
    "The second drink is the door, not the failure.",
    "If Anna happens, give her honesty in the morning, not a ghost.",
  ],
  redFlagsTaught: [
    "The boys' plan as the rebound in friendship's costume",
    "The lecture that puts a wall between you and the only social anchor of week three",
    "The second drink as runway to the same first-drink choice",
    "The stranger as schedule-slot filler, not as repair",
    "The righteous exit that leaves the male track without its anchors",
  ],
  characters: [INNER_VOICE_M, MARCUS_BOY],
  scenes,
  isNew: true,
};

export default afterHer32;
