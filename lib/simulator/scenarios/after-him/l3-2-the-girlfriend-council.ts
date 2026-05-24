/**
 * after-him-3-2, "The Girlfriend Council"
 *
 * After-Him L3-2. Friday, 9:14 p.m. Three girlfriends, two bottles of
 * wine into a Friday in your living room. The story is being told for
 * the fourth time this month. Each retelling sharpens his villainy and
 * softens your role. The story is becoming a museum exhibit.
 *
 * The friends are not the enemy. They are the friends whose love
 * metabolises into the wrong story. The discipline is noticing the
 * ossification and changing the subject; not lecturing them, not
 * defending him, not the gritty truth. The subject change.
 *
 * Antagonist: NAOMI (composite voice of the council).
 *
 * Teaches:
 *  - The retold story ossifies, and the friends will not stop you.
 *  - You can love your friends and not let them author your version.
 *  - Subject change is the move; the gritty truth is also a tell.
 *  - The story you tell at minute four is the identity you carry at week six.
 */

import type { Scenario, Scene } from "../../types";
import { INNER_VOICE, NAOMI } from "../../characters";

const scenes: Scene[] = [
  {
    id: "the-second-bottle",
    backgroundId: "apartment",
    mood: "tense",
    presentCharacterIds: ["naomi", "inner-voice"],
    dialog: [
      {
        speakerId: null,
        text: "Friday, 9:14 p.m. Your living room. Two empty wine bottles on the coffee table. The third is open. Naomi is on the couch, Talia is on the floor, Iman is in the armchair you bought together at the antique fair.",
      },
      {
        speakerId: "naomi",
        emotion: "concerned",
        text: 'But, OK, the coffee. Tell them the coffee thing again. The way he looked at the table. I cannot get over the table.',
      },
      {
        speakerId: "inner-voice",
        tone: "tactical",
        text: "The coffee story is, by your count, on its fourth telling this month. Last week it was twelve minutes; tonight, with three of them on the couch, it will be twenty if you let it. The story is being requested as content. Each retelling sharpens his villainy. Each retelling softens your role. The story is becoming a museum exhibit, and the museum is the version of him your friends will quote back to you in eight months.",
        emotion: "knowing",
      },
      {
        speakerId: "naomi",
        emotion: "concerned",
        text: 'I just keep thinking. Twelve minutes. The table. He could not even.',
      },
    ],
    choices: [
      {
        id: "change-the-subject",
        text: 'Smile. "Honestly, I am going to talk about literally anything else tonight. Naomi, how is the job thing?"',
        tactic: "The clean subject change. Not lecturing them, not defending him, not the gritty truth, not the corrective. A pivot to her job is a gift Naomi will gratefully take, because Naomi also did not come over to perform an indictment for ninety minutes. The story is paused mid-telling; nothing is salvaged or destroyed.",
        nextSceneId: "naomi-pivots",
        isOptimal: true,
        event: "restraint-shown",
      },
      {
        id: "tell-the-story-again",
        text: 'Pour wine. "OK so the coffee. Twelve minutes. The bar by the canal. He had already eaten."',
        tactic: "The retelling. The story ossifies one further layer. Tomorrow you will not remember saying 'he had already eaten' as the first detail, but you will say it again next week. The story now has a canonical opening. Canonical openings are how identities are built. Be careful what identity you are building.",
        nextSceneId: "the-retelling",
        isOptimal: false,
      },
      {
        id: "correct-them",
        text: 'Sigh. "Actually, can I just. He was not a monster. I do not want to keep doing that thing where I make him a monster, OK?"',
        tactic: "The correction is the gritty-truth move. It is also a tell, because it positions you as the wise one inside a circle of friends performing concern. The wise-one position is its own performance, and your friends are now going to feel scolded, which is a worse outcome than the retelling. Subject change is cleaner than correction.",
        nextSceneId: "the-correction",
        isOptimal: false,
      },
      {
        id: "tell-a-darker-story",
        text: 'Lean in. "I never told you this, but in the second year he."',
        tactic: "The escalation is what your council secretly wants because escalation justifies their concern. You will be saying things tonight you cannot retract. Tomorrow morning you will remember the sentence and the room. The relationship gains a sentence in your friends' canon that did not exist before, and the sentence will be quoted at you for years.",
        nextSceneId: "the-escalation",
        isOptimal: false,
      },
    ],
  },

  {
    id: "naomi-pivots",
    backgroundId: "apartment",
    mood: "peaceful",
    presentCharacterIds: ["naomi", "inner-voice"],
    dialog: [
      {
        speakerId: "naomi",
        emotion: "happy",
        text: 'God, OK, yes. So the interview. So they basically told me last Tuesday.',
      },
      {
        speakerId: "inner-voice",
        tone: "tactical",
        text: "She took it gratefully. The room moves. The next forty minutes are about Naomi's interview, then Iman's mother, then Talia's bike. The story did not die tonight; it just did not get its fourth telling. The fourth-telling slot is the one where the museum exhibit hardens.",
        emotion: "knowing",
      },
    ],
    choices: [
      {
        id: "stay-pivoted",
        text: "Listen. Engage. Refill her glass. Be present to her interview the way you would have been six months ago.",
        tactic: "The follow-through. The pivot only holds if you commit to the new subject. A half-pivot is worse than no pivot because Naomi feels managed.",
        nextSceneId: "ending-subject-changed",
        isOptimal: true,
      },
      {
        id: "pivot-back-yourself",
        text: 'After ten minutes: "Naomi, can I say one more thing about the coffee though?"',
        tactic: "The body wants the retelling. The body got the dopamine of holding the story open six months ago; tonight, holding it open is the slot machine pulling a small lever. Resist your own retell. The subject change was the move; do not undo it after ten minutes.",
        nextSceneId: "the-retelling",
        isOptimal: false,
      },
    ],
  },

  {
    id: "the-retelling",
    backgroundId: "apartment",
    mood: "tense",
    presentCharacterIds: ["naomi", "inner-voice"],
    dialog: [
      {
        speakerId: null,
        text: "Eighteen minutes. The coffee story has now acquired a new detail: he checked his phone twice during the twelve minutes. You are not sure if he actually did, but you have said it now, and Naomi has repeated it back to you, and Iman has said the word despicable.",
      },
      {
        speakerId: "inner-voice",
        tone: "tactical",
        text: "The story now has a canonical detail that may not be true. The detail will be quoted back to you next month. By Christmas it will be a known fact about him in this room. By the time he sends the lowercase text in L5, the council will have built him into a monster he was not, and the monster will be the thing you cannot tell them you considered replying to.",
        emotion: "serious",
      },
    ],
    choices: [
      {
        id: "late-subject-change",
        text: 'Cut yourself off. "OK enough about him. Naomi, the job, tell me everything."',
        tactic: "Late but recoverable. The phone-checking detail is on the record but not yet a fixed feature. The pivot, even at minute eighteen, demotes the story back to one of the things you talk about, instead of the thing you talk about.",
        nextSceneId: "ending-recovered-late",
        isOptimal: true,
      },
      {
        id: "let-the-story-finish",
        text: "Let it run to its end. The girls deserve the whole picture.",
        tactic: "The whole picture is now a museum exhibit in three friends' heads. The version of you in eight months will inherit the version they curated tonight, which is sharper, more righteous, and less true than the one you had at 8:14.",
        nextSceneId: "ending-museum-built",
        isOptimal: false,
      },
    ],
  },

  {
    id: "the-correction",
    backgroundId: "apartment",
    mood: "tense",
    presentCharacterIds: ["naomi", "inner-voice"],
    dialog: [
      {
        speakerId: "naomi",
        emotion: "confused",
        text: 'No, but. I am not making him a monster, I am just. We are just. We are on your side here.',
      },
      {
        speakerId: "inner-voice",
        tone: "tactical",
        text: "Naomi feels scolded. The room cooled by half a degree. The corrective was about him; the reception was that you are not letting your friends love you the way they want to. By next Tuesday the council will not be calling because they are slightly chastened, and the slight chasten will become the reason the support quietly recedes.",
        emotion: "serious",
      },
    ],
    choices: [
      {
        id: "redirect-after-correction",
        text: 'Soften. "I love you for it. I just need a night off from him. Naomi, the job?"',
        tactic: "Late recovery. The correction landed and the redirect lands after it. The room recovers; the friends feel needed; the subject moves to Naomi. Imperfect but functional.",
        nextSceneId: "ending-pivot-after-correction",
        isOptimal: true,
      },
      {
        id: "double-down-correction",
        text: 'Lean in. "I just want to be honest. You know I have always struggled with the way our group does this thing where."',
        tactic: "The doubling-down is the wise-one performance acquiring its second act. The friends now perceive you as lecturing them about how they support you, which is a structural breach of the relationship a council has. By tomorrow Naomi will have called Iman to say she felt weird, and the weird will become the new content.",
        nextSceneId: "ending-council-fracture",
        isOptimal: false,
      },
    ],
  },

  {
    id: "the-escalation",
    backgroundId: "apartment",
    mood: "tense",
    presentCharacterIds: ["naomi", "inner-voice"],
    dialog: [
      {
        speakerId: null,
        text: "You said it. The thing in the second year. The sentence is in the room. Three faces have arranged themselves into the shape of receiving it. Naomi has actually leaned forward.",
      },
      {
        speakerId: "inner-voice",
        tone: "tactical",
        text: "Tomorrow morning you will remember the sentence, and the angle of Naomi's head, and the specific quality of the silence after. The relationship in your friends' canon now has a feature it did not have at 8:14. You cannot take it back, because the only mechanism for taking it back is another sentence about him, which deepens the canon.",
        emotion: "sad",
      },
    ],
    choices: [
      {
        id: "stop-immediately",
        text: 'Catch yourself. "Actually never mind. I am drunk. Please pretend I did not say that. Naomi, the job?"',
        tactic: "The cleanest version of an unrecoverable mistake. The sentence is in the room; the request that they pretend it was not is also in the room. By tomorrow they will respect you for the request more than they will be enthralled by the sentence. Naomi will not call Iman. The escalation is bounded.",
        nextSceneId: "ending-escalation-recovered",
        isOptimal: true,
      },
      {
        id: "continue-escalation",
        text: 'Lean in. "No I want to tell you, because I have never told anyone this."',
        tactic: "The sentence becomes a paragraph. The paragraph becomes the new canonical fact about him in this room. The friends absorb the upgrade gratefully because escalation justifies the concern that has been waiting for a story big enough to need it. The cost is the inheritance: the version of you in eight months is going to know him as the man your friends know him as.",
        nextSceneId: "ending-canon-rewritten",
        isOptimal: false,
      },
    ],
  },

  // Endings
  {
    id: "ending-subject-changed",
    backgroundId: "apartment",
    mood: "peaceful",
    isEnding: true,
    outcomeType: "good",
    endingTitle: "Naomi's Interview",
    endingLearnPrompt:
      "The coffee story did not get told. The room moved to Naomi's interview, then Iman's mother, then Talia's bike. The friends had the night they came over to have, which is a Friday with you, not a Friday at your tribunal for him. The discipline of L3-2 is loving your friends and not letting them author the version of him you will carry. The museum exhibit is not built. Six weeks from now, when the lowercase text arrives in L5, you will own the version of him that the L5 scenario is going to ask you to read accurately.",
    dialog: [
      {
        speakerId: "inner-voice",
        text: "11:48 p.m. Coats. Hugs at the door. Naomi: love you, see Monday. The story did not get told tonight.",
        emotion: "knowing",
      },
      {
        speakerId: "inner-voice",
        tone: "tactical",
        text: "Loved your friends. Did not let them author the version of him.",
        emotion: "knowing",
      },
    ],
    choices: [],
  },

  {
    id: "ending-recovered-late",
    backgroundId: "apartment",
    mood: "cold",
    isEnding: true,
    outcomeType: "neutral",
    endingTitle: "The Pivot, Late",
    endingLearnPrompt:
      "The phone-checking detail is on the record. The pivot at minute eighteen demoted the story but did not erase the detail. Naomi will reference 'the phone thing' in a text on Tuesday; you will know what she means even though it may not have happened. The track records the cost: small canonical drift, recoverable. Next Friday, the pivot at minute one is the move that lands fully.",
    dialog: [
      {
        speakerId: "inner-voice",
        text: "Coats. Hugs. The phone-checking sentence sits in the room like a small permanent fact.",
        emotion: "serious",
      },
    ],
    choices: [],
  },

  {
    id: "ending-museum-built",
    backgroundId: "apartment",
    mood: "tense",
    isEnding: true,
    outcomeType: "bad",
    endingTitle: "The Fourth Telling",
    failureBlogSlug: "get-over-breakup-like-sociopath",
    failureBlogTitle: "How to Get Over a Breakup Like a Sociopath",
    endingLearnPrompt:
      "The story was told fourth, in full, with new details. The council now has a canonical version of him that is sharper, more righteous, and approximately twenty percent untrue. Across the next four months the canon will be referenced, polished, and quoted back to you. By the time the L5 hoover arrives, you will own the museum version of him; the museum version will be the thing the council reminds you of when you consider replying. The cost is not tonight's story. The cost is the version of him you will be unable to read accurately.",
    dialog: [
      {
        speakerId: "inner-voice",
        text: "1:14 a.m. Bottles in the recycling. The coffee story now has six new details and one of them is, technically, an invention.",
        emotion: "sad",
      },
    ],
    choices: [],
  },

  {
    id: "ending-pivot-after-correction",
    backgroundId: "apartment",
    mood: "peaceful",
    isEnding: true,
    outcomeType: "neutral",
    endingTitle: "The Soft Save",
    endingLearnPrompt:
      "The correction landed and the redirect followed it. The room recovered. Naomi felt briefly weird, then felt re-needed, which is the structural shape of being a good council member. The night ended affectionate. The lesson lands at half cost: corrections are expensive; pivots are free.",
    dialog: [
      {
        speakerId: "inner-voice",
        text: "Naomi's hug at the door is the slightly longer one she gives when she is wondering if she did something. You squeeze her arm. She does not.",
        emotion: "serious",
      },
    ],
    choices: [],
  },

  {
    id: "ending-council-fracture",
    backgroundId: "apartment",
    mood: "tense",
    isEnding: true,
    outcomeType: "bad",
    endingTitle: "The Lecture",
    failureBlogSlug: "get-over-breakup-like-sociopath",
    failureBlogTitle: "How to Get Over a Breakup Like a Sociopath",
    endingLearnPrompt:
      "The wise-one performance acquired its second act. Naomi will call Iman in the morning. The weird-feeling will be the content of the call. By next week the council has quietly receded. You will read this as them giving you space; it is closer to them being slightly bruised and waiting for the next move from you. The support network is intact but quiet. The L5 hoover lands into a quieter room than it would have, because tonight you taught the council to be careful.",
    dialog: [
      {
        speakerId: "inner-voice",
        text: "Door closes at midnight. Iman left first. Naomi's text at 1:14 a.m.: love you, sleep well, no kiss.",
        emotion: "sad",
      },
    ],
    choices: [],
  },

  {
    id: "ending-escalation-recovered",
    backgroundId: "apartment",
    mood: "cold",
    isEnding: true,
    outcomeType: "neutral",
    endingTitle: "The Sentence, Withdrawn",
    endingLearnPrompt:
      "The sentence was in the room and then you asked the room to pretend it was not. They will respect you for the request. Tomorrow the sentence will not be quoted. The escalation is bounded. The lesson lands at high cost: the room knows there is a sentence you almost told, which sits behind everything that gets told from here, but the canon was not officially edited.",
    dialog: [
      {
        speakerId: "inner-voice",
        text: "Naomi's eyes: she knows there was a sentence. She also knows you withdrew it. Both facts hold.",
        emotion: "serious",
      },
    ],
    choices: [],
  },

  {
    id: "ending-canon-rewritten",
    backgroundId: "apartment",
    mood: "tense",
    isEnding: true,
    outcomeType: "bad",
    endingTitle: "The New Canon",
    failureBlogSlug: "get-over-breakup-like-sociopath",
    failureBlogTitle: "How to Get Over a Breakup Like a Sociopath",
    endingLearnPrompt:
      "The escalation completed. The relationship in your friends' canon now has a feature it did not have at 8:14. The friends absorbed the upgrade gratefully. By next month the new canon is the only canon. The cost is the inheritance: the version of you in eight months is going to know him as the man your friends know him as, and that man is not the actual man, and the L5 scenario will ask you to read him accurately at the moment he reaches out, and the council's version is what you will hear over the actual signal.",
    dialog: [
      {
        speakerId: "inner-voice",
        text: "2:14 a.m. Alone in the flat. The sentence said. Three friends carrying it home in three different directions.",
        emotion: "sad",
      },
    ],
    choices: [],
  },
];

export const afterHim32: Scenario = {
  id: "after-him-3-2",
  title: "The Girlfriend Council",
  tagline:
    "Friday, 9:14 p.m. Two bottles in. The story is being requested as content. Tell it for the fourth time and the museum hardens.",
  description:
    "After-Him L3-2. The council is not the enemy. They are the friends whose love metabolises into the wrong story. The teaching is the subject change: not lecturing them, not defending him, not the gritty truth, not the corrective. A clean pivot to Naomi's job is the move. The escalation, the correction, and the retelling are all costly in different ways. The friends will not stop you; that is what makes you the one who has to.",
  tier: "premium",
  track: "after-him",
  level: 3,
  order: 2,
  estimatedMinutes: 11,
  difficulty: "advanced",
  category: "social-dynamics",
  xpReward: 420,
  startSceneId: "the-second-bottle",
  prerequisites: ["after-him-3-1"],
  tacticsLearned: [
    "Subject change is the move. Not lecture, not correction, not gritty truth.",
    "The fourth telling hardens the museum. Demote the story to one of the things you talk about.",
    "Correction is expensive; pivot is free.",
    "Escalation is what the council secretly wants because it justifies the concern.",
    "The version of him in your friends' canon is the one you will hear over the L5 signal.",
  ],
  redFlagsTaught: [
    "The retelling as friendship's love metabolising into the wrong story",
    "The phone-checking detail that becomes a canonical fact",
    "The wise-one performance disguised as honesty",
    "The escalation that gives the council the story big enough to justify their concern",
    "The friends who will not stop you, because the story has become theirs too",
  ],
  characters: [INNER_VOICE, NAOMI],
  scenes,
  isNew: true,
};

export default afterHim32;
