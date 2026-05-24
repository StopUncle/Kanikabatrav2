/**
 * after-her-4-2, "The Father"
 *
 * After-Her L4-2. The hardest exterior scene on the male track. Sunday
 * lunch at his father's. The father will not ask about her. The father
 * is, generationally, silent on his son's love life. When asked, he
 * will redirect to work, the truck, the project at the back of the
 * house.
 *
 * The teaching is the read. The not-asking is not coldness; it is
 * the lesson. Showing what to do with the energy without naming it.
 * The discipline is to answer the question the father actually asks
 * (about work) and take the lesson without making him absorb the
 * breakup.
 *
 * Antagonist: JAMES_FATHER. The scene is exterior; the cast is one
 * man, the father, who teaches by redirect.
 *
 * Teaches:
 *  - The father's redirect is the lesson, not the absence.
 *  - Talking about work is engaging the male-track structural anchor.
 *  - Bringing her up is asking him to absorb a feeling he will not.
 *  - The energy goes into the thing that holds its shape under weight.
 */

import type { Scenario, Scene } from "../../types";
import { INNER_VOICE_M, JAMES_FATHER } from "../../characters-male";

const scenes: Scene[] = [
  {
    id: "the-kitchen",
    backgroundId: "apartment",
    mood: "peaceful",
    presentCharacterIds: ["james-father", "inner-voice"],
    dialog: [
      {
        speakerId: null,
        text: "Sunday, 1:14 p.m. Your father's house. The kitchen smells of roast and coffee and the wood stove he installed himself in 2014 and is still proud of. He is at the kitchen table with the newspaper in his lap and a mug in his hand.",
      },
      {
        speakerId: "james-father",
        emotion: "neutral",
        text: 'Came in good. Roads were fine. How is the truck holding.',
      },
      {
        speakerId: "inner-voice",
        tone: "tactical",
        text: "The first sentence is the truck. He saw the truck in the driveway through the kitchen window. The truck is his way of starting. He will not ask about her. He is, in this moment, opening the conversation by pointing at a thing that holds its shape under weight.",
        emotion: "knowing",
      },
    ],
    choices: [
      {
        id: "answer-the-truck",
        text: '"Good. Brake pads will need doing in spring. The slow leak by the rear-left went away on its own, which I do not love."',
        tactic: "Answer the question he actually asked. The truck is the topic; the truck is also the doorway. He will follow it into other things. The lesson is in the doorway, not in the unrelated topic you bring through it.",
        nextSceneId: "the-project",
        isOptimal: true,
      },
      {
        id: "bring-up-her",
        text: '"Dad. She left. I have been trying to."',
        tactic: "He will go quiet. The quiet will not be disappointment; you will read it as disappointment because the absence of a response in a generation that does not perform feelings reads, to you, as an absence of feeling. He has nothing operational to offer in this register, and asking him to offer it is the misread of the scene.",
        nextSceneId: "the-quiet",
        isOptimal: false,
      },
      {
        id: "deflect-emptily",
        text: '"It is fine."',
        tactic: "The empty deflection is a half-refusal of the conversation he is offering. He will read it; he will let it go; the lunch will be quieter than it needed to be. The truck question was the open door; not stepping through it is a small wound the father will not name.",
        nextSceneId: "the-truck-closed",
        isOptimal: false,
      },
    ],
  },

  {
    id: "the-project",
    backgroundId: "apartment",
    mood: "peaceful",
    presentCharacterIds: ["james-father", "inner-voice"],
    dialog: [
      {
        speakerId: "james-father",
        emotion: "neutral",
        text: "Brake pads. Same thing on mine, the rear right, last May. I have the project on the back of the house at week three now. Want to look at it after lunch.",
      },
      {
        speakerId: "inner-voice",
        tone: "tactical",
        text: "The project is the second doorway. He is, structurally, telling you what to do with the energy. The deck extension is the metaphor he will not name as a metaphor. The energy goes into the thing that holds its shape under weight.",
        emotion: "knowing",
      },
    ],
    choices: [
      {
        id: "yes-look-at-deck",
        text: '"Yes. After lunch. I want to see the joist hangers."',
        tactic: "The clean engagement. The deck is the topic; the deck is also the lesson; you do not have to name the lesson for the lesson to land. After lunch, on the back lawn, in the cold, the father will show you the framing, and the conversation, by being about the joists, will be the conversation you both came to have.",
        nextSceneId: "the-deck",
        isOptimal: true,
      },
      {
        id: "tell-him-after-deck",
        text: '"Yes. Also, dad. About the relationship. I just want to."',
        tactic: "The qualifier opens the door you closed in the first scene. The father will receive it; he will not engage with it; the deck conversation that was about to be the lesson will now be the deck conversation that is also a hospital for your feeling, which is not what the deck is for. Keep the deck and the feeling in separate buildings.",
        nextSceneId: "the-quiet",
        isOptimal: false,
      },
    ],
  },

  {
    id: "the-deck",
    backgroundId: "apartment",
    mood: "peaceful",
    presentCharacterIds: ["james-father", "inner-voice"],
    dialog: [
      {
        speakerId: null,
        text: "2:48 p.m. The back lawn. The deck extension is at the stage where the joists are up and the boards are not. He walks you through the framing. He points at the joist hangers. He notes that the rim joist is doubled because of the cantilever.",
      },
      {
        speakerId: "inner-voice",
        tone: "tactical",
        text: "He is, in the language of double rim joists, teaching you something about what to do when a structure has to hold weight at the edges. He is not, in fact, talking about the breakup. He is showing you the deck. The lesson lands in your body, not in your understanding.",
        emotion: "knowing",
      },
    ],
    choices: [
      {
        id: "take-the-lesson",
        text: 'Look at the joists. Ask about the lag bolts. Help him carry the next pile of boards from the side of the house. Do not name the lesson.',
        tactic: "The discipline of L4-2. The lesson lands without being named. You spend forty minutes on the deck with him; you are, structurally, two men in a relationship that is doing the work the relationship does, which is presence around a project. The body remembers the afternoon long after the words are forgotten.",
        nextSceneId: "ending-deck-lesson",
        isOptimal: true,
        event: "optimal-with-grace",
      },
      {
        id: "name-the-metaphor",
        text: '"Dad, the rim joist thing, it is. It is kind of how I feel right now. Doubled up on the edges so the middle does not fall."',
        tactic: "The naming closes the metaphor. The father will smile politely; the smile will be the closing of the door he opened by not naming it. Lessons that land in the body do not require being named; naming them is the cost they cannot survive.",
        nextSceneId: "the-named-metaphor",
        isOptimal: false,
      },
    ],
  },

  {
    id: "the-quiet",
    backgroundId: "apartment",
    mood: "cold",
    presentCharacterIds: ["james-father", "inner-voice"],
    dialog: [
      {
        speakerId: "james-father",
        emotion: "neutral",
        text: "Mm. That is hard.",
      },
      {
        speakerId: null,
        text: "He folds the newspaper. He looks at the table. He gets up and refills his coffee from the pot on the stove. He sits back down.",
      },
      {
        speakerId: "inner-voice",
        tone: "tactical",
        text: "He has done his version of receiving it. The 'mm, that is hard' is the maximum his generation gave their sons on this topic. He is not cold; he is not dismissing; he is showing you, in the way he can, that the conversation has been heard. The quiet will be read, by you, as disappointment. The disappointment is your import. The actual quiet is acknowledgement.",
        emotion: "knowing",
      },
    ],
    choices: [
      {
        id: "redirect-after-disclosure",
        text: '"Anyway. The truck. The leak. Tell me about your spring." Move the conversation back.',
        tactic: "Late recovery. The breakup was raised; the father acknowledged in his register; the conversation returns to the doorways he opened. The lunch is not ruined; the read is corrected; the deck conversation later in the afternoon will be cleaner because the breakup has been formally noted and now off the table.",
        nextSceneId: "the-project",
        isOptimal: true,
      },
      {
        id: "read-it-as-disappointment",
        text: "Read the quiet as disappointment. Carry it for the rest of the day.",
        tactic: "The misread becomes the lunch. The father is, by 3 p.m., quietly wondering why you are quiet, which is the same quiet you are reading as his disappointment. The misread becomes the recursive feedback loop neither of you names. The day ends slightly worse than it was at 1:14, by you, for reasons that are entirely your construction.",
        nextSceneId: "ending-misread",
        isOptimal: false,
      },
    ],
  },

  {
    id: "the-truck-closed",
    backgroundId: "apartment",
    mood: "cold",
    presentCharacterIds: ["james-father", "inner-voice"],
    dialog: [
      {
        speakerId: "james-father",
        emotion: "neutral",
        text: "Mm. Roast is fifteen minutes.",
      },
      {
        speakerId: "inner-voice",
        tone: "tactical",
        text: "The empty deflection closed the truck door. He has moved to the roast as a default. The lunch will happen; the conversation that was on the verge of being a conversation has been postponed. The lunch is a lunch that two men eat in a kitchen, which is one of the structural goods of the male track, even at half temperature.",
        emotion: "serious",
      },
    ],
    choices: [
      {
        id: "open-the-door-again",
        text: '"Actually, the brake pads. Spring. I was meaning to ask you about the calliper sticking on yours."',
        tactic: "Late recovery. The door is reopened. He will step through it; the conversation will land where it would have landed in the first scene; the half-temperature of the kitchen warms by one degree.",
        nextSceneId: "the-project",
        isOptimal: true,
      },
      {
        id: "stay-closed",
        text: 'Eat the lunch quietly. Leave at 3.',
        tactic: "The lunch happens at low temperature. The day produces nothing operationally bad and also produces nothing of the actual L4-2 lesson, which is that male relationships are repaired through the doorways the men in them open. Next Sunday, take the doorway when it is offered.",
        nextSceneId: "ending-low-temp-lunch",
        isOptimal: false,
      },
    ],
  },

  {
    id: "the-named-metaphor",
    backgroundId: "apartment",
    mood: "tense",
    presentCharacterIds: ["james-father", "inner-voice"],
    dialog: [
      {
        speakerId: "james-father",
        emotion: "neutral",
        text: "Mm. Yeah. Pass me that lag bolt, the long one.",
      },
      {
        speakerId: "inner-voice",
        tone: "tactical",
        text: "He closed the metaphor by ignoring it. The naming was the cost; the not-engaging is his refusal, in the only register he has, to convert a deck into a feelings conversation. He likes the deck. He likes the lag bolt. He does not like the way you are using the deck right now.",
        emotion: "serious",
      },
    ],
    choices: [
      {
        id: "pass-the-bolt",
        text: 'Hand him the bolt. Do not say anything else. Watch how he sets it.',
        tactic: "Late recovery. The metaphor is dropped, the work continues, the afternoon is reclaimed. The father will not remember that you tried to name the rim joist; he will remember that you helped with the bolts.",
        nextSceneId: "ending-deck-lesson",
        isOptimal: true,
      },
      {
        id: "explain-further",
        text: '"I just mean, the way you have built this. There is something I can take from."',
        tactic: "The doubling-down forces the father to be, simultaneously, the carpenter and the therapist. He will not be the therapist. The afternoon, which was about to be the lesson, becomes an awkward lecture from son to father about his own deck. The L4-2 lesson is lost specifically in the trying.",
        nextSceneId: "ending-deck-lectured",
        isOptimal: false,
      },
    ],
  },

  // Endings
  {
    id: "ending-deck-lesson",
    backgroundId: "apartment",
    mood: "peaceful",
    isEnding: true,
    outcomeType: "good",
    endingTitle: "The Joists",
    endingLearnPrompt:
      "Three hours on the deck. Lag bolts, joist hangers, the rim joist doubled at the cantilever. The breakup was never mentioned and the breakup was the whole conversation. The father showed you what to do with the energy by not naming what he was showing you. The lesson lands in the body: the energy goes into the thing that holds its shape under weight. The afternoon ends with coffee in the kitchen at 4:48 and the smell of cut pine on your hands. The L4-2 discipline is unnamed; that is why it survives.",
    dialog: [
      {
        speakerId: "inner-voice",
        text: "Truck back at the flat at 6:14. Sawdust still in the cuff of your sleeve. The deck framed up the lesson the way the rim joist frames the deck.",
        emotion: "knowing",
      },
      {
        speakerId: "inner-voice",
        tone: "tactical",
        text: "He showed you, by not naming it, what to do with the energy.",
        emotion: "knowing",
      },
    ],
    choices: [],
  },

  {
    id: "ending-misread",
    backgroundId: "apartment",
    mood: "tense",
    isEnding: true,
    outcomeType: "bad",
    endingTitle: "The Imported Disappointment",
    failureBlogSlug: "get-over-breakup-like-sociopath",
    failureBlogTitle: "How to Get Over a Breakup Like a Sociopath",
    endingLearnPrompt:
      "The father's quiet was acknowledgement; you read it as disappointment. The misread became the lunch, then the afternoon, then the drive home. The father, by 3 p.m., was quietly wondering why you were quiet, which is the recursive misread closing on itself. The L4-2 lesson is structural: the men in your generation will not perform feelings; the absence of performance is not the absence of receiving. Next Sunday, do not import a feeling onto the silence; let the silence be what it is, which is the truck question still on the table.",
    dialog: [
      {
        speakerId: "inner-voice",
        text: "Truck home. Sawdust nowhere on your sleeves. The day was warm enough; you carried the cold of your own construction.",
        emotion: "sad",
      },
    ],
    choices: [],
  },

  {
    id: "ending-low-temp-lunch",
    backgroundId: "apartment",
    mood: "cold",
    isEnding: true,
    outcomeType: "neutral",
    endingTitle: "The Quiet Lunch",
    endingLearnPrompt:
      "The lunch happened at low temperature. The doorways the father opened were not stepped through. Nothing went wrong; nothing of the L4-2 lesson landed. The afternoon ended at 3:14 with a polite hug at the front door and a fifteen-minute drive home in a truck with brake pads that will need doing in spring. Next Sunday, take the truck doorway when it is offered. The father will offer it again, because that is what the doorways are for.",
    dialog: [
      {
        speakerId: "inner-voice",
        text: "Truck. Road. The half-temperature lunch on the inside of your sternum.",
        emotion: "serious",
      },
    ],
    choices: [],
  },

  {
    id: "ending-deck-lectured",
    backgroundId: "apartment",
    mood: "tense",
    isEnding: true,
    outcomeType: "bad",
    endingTitle: "The Deck Lecture",
    failureBlogSlug: "get-over-breakup-like-sociopath",
    failureBlogTitle: "How to Get Over a Breakup Like a Sociopath",
    endingLearnPrompt:
      "The afternoon was a lecture from son to father about his own deck. The father set the lag bolt anyway; the lag bolt was, structurally, his refusal to be the therapist. The L4-2 lesson is that lessons land when they are not named; the doubling-down on the metaphor was the cost the lesson did not survive. Next Sunday, hand him the lag bolt without explaining what the lag bolt means. The deck means the deck. That is the meaning.",
    dialog: [
      {
        speakerId: "inner-voice",
        text: "Truck home. Sawdust on one sleeve. The father, at his kitchen table at 5 p.m., reading the paper again, the deck still partly framed.",
        emotion: "sad",
      },
    ],
    choices: [],
  },
];

export const afterHer42: Scenario = {
  id: "after-her-4-2",
  title: "The Father",
  tagline:
    "Sunday lunch. He will not ask about her. He will ask about the truck. The not-asking is the lesson.",
  description:
    "After-Her L4-2. The hardest exterior scene on the male track. The father, generationally silent on his son's love life, opens the conversation by pointing at the truck. The teaching is to step through the doorway he offers; to engage with the deck project; to take the lesson without naming it. Bringing her up is asking him to absorb a feeling he will not. The lessons that survive on the male track are the ones that land in the body during forty minutes of joist hangers and lag bolts, not the ones that get named in the kitchen over coffee.",
  tier: "premium",
  track: "after-her",
  level: 4,
  order: 2,
  estimatedMinutes: 12,
  difficulty: "advanced",
  category: "social-dynamics",
  xpReward: 460,
  startSceneId: "the-kitchen",
  prerequisites: ["after-her-4-1"],
  tacticsLearned: [
    "Step through the doorway he opens. The truck is the doorway.",
    "Engage with the deck project. The energy goes into the thing that holds its shape.",
    "The not-asking is not coldness. It is the lesson.",
    "Do not name the metaphor. The lesson lands in the body.",
    "The father's quiet is acknowledgement. The disappointment is your import.",
  ],
  redFlagsTaught: [
    "Asking the father to be the therapist for a register he does not have",
    "Reading the quiet as disappointment when it is acknowledgement",
    "Naming the rim joist metaphor and watching the lesson die",
    "The empty deflection that closes the doorway he opened",
    "The imported disappointment that becomes the recursive misread of the afternoon",
  ],
  characters: [INNER_VOICE_M, JAMES_FATHER],
  scenes,
  isNew: true,
};

export default afterHer42;
