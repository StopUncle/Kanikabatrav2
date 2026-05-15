/**
 * Dating Line. Mission 9 "The Question"
 *
 * Saturday, June 14. Eleven weeks after d6. The ring box has been on
 * the counter for seventeen weeks. Noor's bridge round closed in April.
 * The Ember channel closed cleanly in May. The morning has been chosen
 * by the morning.
 *
 * This scenario teaches the proposal as architecture rather than
 * destination. The work of asking the actual question, not the
 * performance of asking the standard one.
 *
 * Handoff out: Noor's mother's first direct call to the protagonist,
 * three weeks later. d10 opens on the call.
 *
 * Pilot reference: `reference/d9-pilot.md`.
 */

import type { Scenario, Scene } from "../../types";
import { NOOR, INNER_VOICE_M } from "../../characters-male";

const scenes: Scene[] = [
  {
    id: "cold-open",
    backgroundId: "apartment",
    mood: "peaceful",
    dialog: [
      {
        speakerId: null,
        text: "Saturday. June 14. 6:42 am. You have been awake for ninety-eight minutes. The Hudson ferry has run twice.",
      },
      {
        speakerId: null,
        text: "The ring box is on the counter where it has been for seventeen weeks. Tiffany blue. Six weeks during d5. Eleven weeks since d6.",
      },
      {
        speakerId: "inner-voice",
        tone: "tactical",
        text: "The conversation about Christmas got redesigned in March. Noor's bridge round closed in April. Ember left the hospital in May. The ring has waited.",
      },
      {
        speakerId: "inner-voice",
        tone: "tactical",
        text: "You have worn it on a chain under your shirt for eight weeks. Not because you wanted to hide it. Because the box on the counter was a public object that did not match the private question. The chain is the private register. The box is the public one. They are about to be the same object.",
      },
      {
        speakerId: null,
        text: "Noor is asleep. The bedroom door is open three inches. The grey crew-neck from Lisbon is folded on the chair by the bed. She put it there last night, which she does when she wants to be able to find it in the morning without thinking.",
      },
      {
        speakerId: "inner-voice",
        tone: "tactical",
        text: "Today, then. You knew it three weeks ago. You knew it by the Wednesday she came home and said the bridge round closed and you watched her eat the same stew at the same counter and not look at the ring box.",
      },
    ],
    nextSceneId: "the-morning-routine",
  },

  {
    id: "the-morning-routine",
    backgroundId: "apartment",
    mood: "peaceful",
    presentCharacterIds: ["noor"],
    dialog: [
      {
        speakerId: null,
        text: "You make the moka pot the way Noor makes it. Small burner. Two scoops. The water from the filter not the tap. The radio is on Saturday morning jazz at a volume that is below conversation and above silence.",
      },
      {
        speakerId: "inner-voice",
        tone: "tactical",
        text: "The morning has been chosen by the morning. You did not pick the day. The day picked you. Proposals planned eight weeks ahead are proposals about the proposal. Proposals named by a Saturday morning are proposals about the marriage.",
      },
      {
        speakerId: null,
        text: "7:04. Noor pads into the kitchen. She is barefoot. She has slept seven hours. She did not check her phone yet. She did the morning's reading instead, two pages of the book on her bedside table, before she got up.",
      },
      {
        speakerId: "noor",
        emotion: "neutral",
        text: "Hi.",
      },
      {
        speakerId: "inner-voice",
        tone: "tactical",
        text: "One syllable, with breath after it. The hi of a Saturday morning that has not been told yet what today is. Three openings.",
      },
    ],
    nextSceneId: "the-decision-to-ask",
  },

  {
    id: "the-decision-to-ask",
    backgroundId: "apartment",
    mood: "tense",
    presentCharacterIds: ["noor"],
    dialog: [],
    choices: [
      {
        id: "named-the-question",
        text: "I have something I want to ask you. Not now, but today. Coffee first. Then a walk. Then I want to ask you. I am telling you now so you can hold the question for the next hour without me asking it sideways.",
        tactic:
          "Name the question without asking it. Give Noor the same level of preparation you have had. The proposal becomes a structure you are building together rather than a surprise you are deploying.",
        isOptimal: true,
        event: "optimal-with-grace",
        nextSceneId: "path-a-the-named-future",
      },
      {
        id: "standard-proposal",
        text: "Wait until after coffee. Wait until after the walk. Stop the walk at the bench on the Hudson where you first sat in the snow in 2024. Get down on one knee. Open the box. Say the standard sentence.",
        tactic:
          "The standard proposal. Performed, not built. She will say yes. The story of how you asked will be the story of the bench, not the story of the question.",
        feedback:
          "Standard works. Standard is not the same as specific. Noor will know the difference. So will you.",
        nextSceneId: "path-b-the-standard-proposal",
      },
      {
        id: "ambush-proposal",
        text: "Ask now. Right now. Before the coffee. Before the walk. While she is barefoot and still has the breath after the hi.",
        tactic:
          "The ambush proposal. The morning has not made the question. You are making the question because your nervous system is making it. She will say yes. The story will be the story you do not tell at dinner parties.",
        event: "failure-rejected",
        nextSceneId: "path-c-the-wrong-moment",
      },
    ],
  },

  {
    id: "path-a-the-named-future",
    backgroundId: "apartment",
    mood: "peaceful",
    presentCharacterIds: ["noor"],
    dialog: [
      {
        speakerId: "noor",
        emotion: "neutral",
        text: "Okay. I will hold it. Will I know when the question is coming, or do I need to read your face for the next hour.",
      },
      {
        speakerId: "inner-voice",
        tone: "tactical",
        text: "She has accepted the framing and immediately added a Noor-shaped accommodation. The accommodation is the proof that the framing was correct.",
      },
      {
        speakerId: "inner-voice",
        text: "You will know. I will say, okay, this is the question. That is the signal.",
      },
      {
        speakerId: null,
        text: "You drink the coffee. You take the walk. Hudson Yards to the bench at 21st. The bench is empty. It is empty because every other person in this city is asleep at 8:14 on a Saturday in June.",
      },
      {
        speakerId: null,
        text: "You sit. She sits. You take the chain off your neck. You unhook the ring. You put the chain in your pocket. You hold the ring between your thumb and forefinger.",
      },
      {
        speakerId: "inner-voice",
        text: "Okay. This is the question. I want to ask you to make this permanent. The version we have been doing. Not change anything. Just name it. I want to be married to you in the way that we have been not-quite-married for the last eleven months.",
      },
      {
        speakerId: "inner-voice",
        text: "The legal version of what we have already built. Will you do that.",
      },
      {
        speakerId: "inner-voice",
        tone: "tactical",
        text: "Not will-you-marry-me. That sentence asks for a commitment to a future event. The sentence you just said asks for a name on a thing that already exists.",
      },
      {
        speakerId: "noor",
        emotion: "happy",
        text: "Yes. The naming is the right ask. Yes.",
      },
      {
        speakerId: null,
        text: "She holds out her hand. You put the ring on her. The Hudson ferry runs. The bench stays empty around you.",
      },
    ],
    nextSceneId: "ending-the-named-future",
  },

  {
    id: "path-b-the-standard-proposal",
    backgroundId: "apartment",
    mood: "peaceful",
    presentCharacterIds: ["noor"],
    dialog: [
      {
        speakerId: null,
        text: "The walk happens. The bench arrives. You kneel. She recognises the moment one second before it lands. That second is the second the surprise is over.",
      },
      {
        speakerId: "inner-voice",
        text: "Will you marry me.",
      },
      {
        speakerId: "noor",
        emotion: "happy",
        text: "Yes.",
      },
      {
        speakerId: null,
        text: "The yes is real. She hugs you. The ring is on her finger by 8:24. You walk back through the city. You text Cole at 9:00. You text Noor's sister at 9:14. She texts her mother at 9:21.",
      },
      {
        speakerId: "inner-voice",
        tone: "tactical",
        text: "The standard moves did what the standard moves do. The yes is real. The story of how you asked will be the story of the bench, not the story of you. Many marriages run on bench stories. The actual building happens elsewhere.",
      },
      {
        speakerId: "inner-voice",
        tone: "tactical",
        text: "The cost was the missed opportunity to ask the named version. The cost is invisible to her. The cost is legible to you.",
      },
    ],
    nextSceneId: "ending-the-standard-proposal",
  },

  {
    id: "path-c-the-wrong-moment",
    backgroundId: "apartment",
    mood: "tense",
    presentCharacterIds: ["noor"],
    dialog: [
      {
        speakerId: null,
        text: "You ask in the kitchen, before the coffee, while she is barefoot. The ring is in your hand because you took the chain off in the bathroom four minutes ago. You did not plan this. Your nervous system is making the question.",
      },
      {
        speakerId: "noor",
        emotion: "confused",
        text: "Wait.",
      },
      {
        speakerId: "inner-voice",
        tone: "tactical",
        text: "She is not saying no. She is asking for a beat. The beat is the beat she would have taken with anything important. She is taking it now because you skipped the part where the question got prepared.",
      },
      {
        speakerId: "noor",
        emotion: "serious",
        text: "Yes. I want to. Yes. Can we, can I have a minute with this. I want to be sitting down. I want to be wearing something other than your t-shirt. I want to text my sister in fifteen minutes, not in two.",
      },
      {
        speakerId: null,
        text: "You wait. She gets dressed. She comes back. She sits on the couch. She holds out her hand. You put the ring on her.",
      },
      {
        speakerId: "inner-voice",
        tone: "tactical",
        text: "The yes is yes. The story is the story you do not tell at dinner parties. The story is the story you will tell in eight years when you are explaining to someone how to do it differently.",
      },
    ],
    nextSceneId: "ending-the-ambush",
  },

  {
    id: "ending-the-named-future",
    backgroundId: "apartment",
    mood: "peaceful",
    isEnding: true,
    outcomeType: "good",
    endingTitle: "The Naming",
    endingSummary:
      "The bench at 21st. The chain in your pocket. The ring between your fingers. The question named the thing that already existed. Noor said yes to the naming. The story you will tell is the story of the question, not the story of the bench. The bench was the room. The question was the architecture.",
    endingLearnPrompt:
      "The proposal is architecture, not destination. Audit the last big ask you made. Did you name what already existed, or did you ask for a future commitment to something not yet built?",
    dialog: [
      {
        speakerId: null,
        text: "Three weeks later. Saturday afternoon. The phone rings. Noor's mother. The first call she has placed to you directly.",
      },
      {
        speakerId: null,
        text: "She has been keeping the relationship at the level of dinners and texts forwarded through Noor. The call is one specific sentence delivered with a long pause after.",
      },
      {
        speakerId: "noor",
        emotion: "knowing",
        text: "My mother. She wants to take you to lunch on the 14th. She has something to ask you. She says it is not the thing you might be expecting.",
      },
      {
        speakerId: "inner-voice",
        tone: "tactical",
        text: "Note the framing. She has just told you she has been thinking about this. She is being precise about it. The mother is Kanika-voice without ever having read Kanika.",
      },
    ],
  },

  {
    id: "ending-the-standard-proposal",
    backgroundId: "apartment",
    mood: "peaceful",
    isEnding: true,
    outcomeType: "neutral",
    endingTitle: "The Bench Story",
    endingSummary:
      "The standard worked. The yes was real. The story is the story of the bench. The cost is the named version of the question you did not ask. The cost is invisible to her. It is legible to you, in the way costs are legible to the person who chose to pay them.",
    endingLearnPrompt:
      "Standard works because standard is recognisable. Standard is not the same as specific. Audit the last gesture you made because it was the gesture rather than because it was the right gesture for the person.",
    dialog: [
      {
        speakerId: "noor",
        emotion: "happy",
        text: "My mother wants to take you to lunch in three weeks. She has something to ask. She says it is not the thing you might be expecting.",
      },
    ],
  },

  {
    id: "ending-the-ambush",
    backgroundId: "apartment",
    mood: "cold",
    isEnding: true,
    outcomeType: "bad",
    endingTitle: "The Story You Do Not Tell",
    endingSummary:
      "The kitchen. Barefoot. Before the coffee. Yes in the right voice but in the wrong frame. The yes is yes. The story is the one you save for the case study in eight years. The marriage will be fine. The asking will be the asking you did when your nervous system asked for you.",
    endingLearnPrompt:
      "The ambush proposal is the nervous-system version of the proposal. The yes is honest. The frame is not. Note the next big ask you make when the moment has not yet made the question.",
    failureBlogSlug: "the-ambush-proposal",
    failureBlogTitle: "Why proposing in the kitchen barefoot before coffee is the ambush proposal",
    dialog: [
      {
        speakerId: "noor",
        emotion: "neutral",
        text: "My mother wants to take you to lunch in three weeks. She has something to ask.",
      },
      {
        speakerId: "inner-voice",
        tone: "tactical",
        text: "Noor has not told her mother how you asked. She does not need to. The mother is asking the question that will frame the next twenty years anyway.",
      },
    ],
  },
];

const datingMission9: Scenario = {
  id: "d9-the-question",
  title: "The Question",
  tagline:
    "Eleven weeks after the first real fight. Seventeen weeks since the ring box arrived. The proposal as architecture, not destination.",
  description:
    "Saturday June 14. The ring on a chain under your shirt for eight weeks, the box on the counter for seventeen. Noor pads in barefoot at 7:04. The morning has been chosen by the morning. The discipline is to ask the actual question, the named version of the thing you have already built, rather than the standard question that turns the bench into the story.",
  tier: "vip",
  track: "male-dating",
  level: 9,
  order: 1,
  estimatedMinutes: 10,
  difficulty: "advanced",
  category: "dating",
  xpReward: 360,
  badgeId: "the-named-future",
  startSceneId: "cold-open",
  prerequisites: ["d8-ex-in-trouble"],
  isNew: true,
  tacticsLearned: [
    "Naming the question before asking it, so the partner can prepare",
    "Asking for a name on what already exists, not a commitment to a future event",
    "Letting the morning choose the day, not planning the day eight weeks out",
    "The proposal as architecture, the bench as room",
  ],
  redFlagsTaught: [
    "The standard proposal as performance, not built artefact",
    "The ambush proposal made by the nervous system, not by the morning",
    "The bench story as the marriage's substitute for its actual story",
    "Asking for the future when you can ask for the naming",
  ],
  reward: {
    id: "the-named-future",
    name: "The Naming",
    description:
      "You asked for the name on a thing that already existed. Noor said yes to the naming. The story you will tell is the story of the question, not the story of the bench.",
  },
  characters: [NOOR, INNER_VOICE_M],
  scenes,
};

export default datingMission9;
