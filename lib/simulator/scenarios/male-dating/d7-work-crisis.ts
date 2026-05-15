/**
 * Dating Line. Mission 7 "The Test"
 *
 * Same Sunday as d6. Noor walked out at 11:47 am to take a call from
 * her boss Dara on the second floor of the coffee shop on the corner.
 * She has been gone for forty-two minutes. She is walking back across
 * the street now.
 *
 * Dara called because Noor's lead investor pulled their term sheet two
 * hours ago. The bridge round is urgent. She has ninety-one days of
 * cash and two doors: an emergency Series B at terrible terms, or an
 * acquihire that closes her three-year vision.
 *
 * This scenario teaches how to be useful to a partner in crisis without
 * becoming her project manager, without performing strength, and
 * without going small. Three openings, each a different failure mode
 * or the optimal: ask the question that lets her tell you what she
 * needs, refrain from problem-solving until invited, be the steady
 * thing in the room.
 *
 * Handoff out: Noor's voice note to her CFO at 4:18 pm (4:42 in
 * neutral, 5:14 in bad). d8 opens on the voice note.
 *
 * Pilot reference: `reference/d7-pilot.md`.
 */

import type { Scenario, Scene } from "../../types";
import { NOOR, INNER_VOICE_M } from "../../characters-male";

const scenes: Scene[] = [
  // -------------------------------------------------------------------
  // Scene 1, cold open
  // -------------------------------------------------------------------
  {
    id: "cold-open",
    backgroundId: "apartment",
    mood: "cold",
    dialog: [
      {
        speakerId: null,
        text: "12:29 pm. Noor walks back across the street. She is carrying a paper cup that has been empty since 12:11. You can tell from the angle she is holding it.",
      },
      {
        speakerId: null,
        text: "She comes up the stairs. You hear the door. You do not stand up. You hear her shoes go off in the hallway. The shoes are the Allbirds. They go off the same way they go off every day.",
      },
      {
        speakerId: "inner-voice",
        tone: "tactical",
        text: "The body has not been told that today is different. The hallway has not been told.",
      },
      {
        speakerId: "inner-voice",
        tone: "tactical",
        text: "Forty-two minutes ago she walked out of a kitchen where the conversation about Christmas had either been redesigned or had not been. She did not text you while she was gone. That information is not nothing.",
      },
      {
        speakerId: "noor",
        emotion: "neutral",
        text: "Hey.",
      },
      {
        speakerId: "inner-voice",
        tone: "tactical",
        text: "One syllable. Lower in her chest than it was at 6:14 am this morning. Note that. Whatever happened on the call lives below her throat now.",
      },
    ],
    nextSceneId: "the-room-she-walks-into",
  },

  // -------------------------------------------------------------------
  // Scene 2, the room
  // -------------------------------------------------------------------
  {
    id: "the-room-she-walks-into",
    backgroundId: "apartment",
    mood: "cold",
    presentCharacterIds: ["noor"],
    dialog: [
      {
        speakerId: null,
        text: "She comes around the corner. The grey crew-neck still on. She sets the empty cup on the counter next to the ring box. She does not look at the ring box. She looks at the cup.",
      },
      {
        speakerId: "noor",
        emotion: "concerned",
        text: "The Sand round pulled. Two hours ago. Greg sent an email to Dara at 9:14. Dara called me. They will officially announce on Wednesday. I have ninety-one days of cash.",
      },
      {
        speakerId: "inner-voice",
        tone: "tactical",
        text: "She said I. She did not say we. She did not say the company has. The pronoun is the data. Whatever she is doing right now, she is doing it from inside herself, not from inside her cofounder identity.",
      },
      {
        speakerId: "inner-voice",
        tone: "tactical",
        text: "That is the hardest version of this for her. It is also the most honest one.",
      },
      {
        speakerId: "inner-voice",
        tone: "tactical",
        text: "The room has changed shape three times today. At 6:14 the shape was the Christmas sentence. At 8:30 it was either redesigned or not. At 12:29 it is now the size of her company.",
      },
      {
        speakerId: "noor",
        emotion: "concerned",
        text: "I do not need anything yet. I am going to make a list of the next twelve hours. I am going to do the list. I am telling you what is happening because you live here.",
      },
      {
        speakerId: "inner-voice",
        tone: "tactical",
        text: "She just told you the rule for the next forty minutes. Three sentences, three pieces of information, no request for input. She is not asking you. She is informing you.",
      },
    ],
    nextSceneId: "the-question",
  },

  // -------------------------------------------------------------------
  // Scene 3, the choice
  // -------------------------------------------------------------------
  {
    id: "the-question",
    backgroundId: "apartment",
    mood: "tense",
    presentCharacterIds: ["noor"],
    dialog: [
      {
        speakerId: "inner-voice",
        tone: "tactical",
        text: "She gave you the rule. Three openings.",
      },
    ],
    choices: [
      {
        id: "ask-cleanly",
        text: "What do you need from me right now? I am here. Tell me and I will do it. Tell me to be quiet and I will be quiet. Both are fine.",
        tactic:
          "Ask the question that lets her tell you what she needs. Two clean offers (do or be quiet), no third option that assumes a role she has not asked for.",
        isOptimal: true,
        event: "optimal-with-grace",
        nextSceneId: "path-a-asked",
      },
      {
        id: "fix-it",
        text: "Okay. Let us think about this. Who can you call? Have you talked to Cole's old VC contact? Let me open a doc and we can map the bridge round options.",
        tactic:
          "The project-manager reflex. You are about to perform usefulness by importing the role of strategic co-founder into a kitchen at 12:31 pm. She did not ask for it.",
        feedback:
          "She will let you do the doc because she loves you. She will also be managing you while you do it.",
        nextSceneId: "path-b-fixed",
      },
      {
        id: "go-small",
        text: "I am so sorry. That is awful. Let me know if there is anything I can do.",
        tactic:
          "The going-small move. The phrases are correct on a greeting card and wrong in this kitchen. You have just handed her the closing words of the conversation instead of opening one.",
        event: "failure-rejected",
        nextSceneId: "path-c-small",
      },
    ],
  },

  // -------------------------------------------------------------------
  // Path A, the right question
  // -------------------------------------------------------------------
  {
    id: "path-a-asked",
    backgroundId: "apartment",
    mood: "peaceful",
    presentCharacterIds: ["noor"],
    dialog: [
      {
        speakerId: "noor",
        emotion: "serious",
        text: "I do not know yet. I think I need to be at the kitchen table for the next two hours with my laptop and my CFO on Zoom. I do not need you to leave. I do not need you to talk.",
      },
      {
        speakerId: "noor",
        emotion: "serious",
        text: "I might need lunch around 2:00. Can you make the leftover stew and leave it on the counter when it is hot. I will eat it standing.",
      },
      {
        speakerId: "noor",
        emotion: "serious",
        text: "And around 4:00 I am going to ask you something. I do not know what it is yet. I will know by 4:00.",
      },
      {
        speakerId: null,
        text: "She moves to the kitchen table. She opens her laptop. She does not pick the chair facing the window. She picks the one facing the hallway, so that when she looks up she will see you in the next room.",
      },
      {
        speakerId: "inner-voice",
        tone: "tactical",
        text: "That is not nothing. She has named four things. You will make stew at 1:40. You will be in the next room without performing it. You will not check on her. At 4:00 you will be available for the thing she has not named yet.",
      },
      {
        speakerId: "inner-voice",
        tone: "tactical",
        text: "The discipline now is not what you do. It is what you do not do. The list of what you do not do is longer.",
      },
    ],
    nextSceneId: "path-a-the-afternoon",
  },

  // -------------------------------------------------------------------
  // Path A continuation, the afternoon
  // -------------------------------------------------------------------
  {
    id: "path-a-the-afternoon",
    backgroundId: "apartment",
    mood: "peaceful",
    dialog: [
      {
        speakerId: null,
        text: "You make the stew at 1:40. You leave it on the counter at 2:08 in the orange Le Creuset that has been on your stove since you moved in.",
      },
      {
        speakerId: null,
        text: "You do not say it is ready. You do not text her from the next room. You go back to the desk in the next room and you read the book you had been reading at 6:14 this morning before the Sunday started.",
      },
      {
        speakerId: null,
        text: "At 2:14 she stands up. She gets the stew. She eats it standing at the counter. She does not look at you. She does not look at the ring box. She eats five spoonfuls and puts the bowl in the sink and goes back to the table.",
      },
      {
        speakerId: "inner-voice",
        tone: "tactical",
        text: "Three sentences would close this scene wrong. You have given her four hours of room. The room is doing the work.",
      },
      {
        speakerId: null,
        text: "At 4:02 she stands. She walks to the door of the room you are in. She leans on the frame.",
      },
      {
        speakerId: "noor",
        emotion: "serious",
        text: "I know what I am going to ask you. I want to record a voice note for my CFO and I want it to be honest, which means I need to say things out loud before I record. Can I do that to you.",
      },
      {
        speakerId: "noor",
        emotion: "serious",
        text: "You do not need to respond. Just sit. Twenty minutes. If I am wrong about anything you can tell me at the end. Or you can not.",
      },
      {
        speakerId: "inner-voice",
        tone: "tactical",
        text: "The thing she did not know at 12:31 she now knows. She has named the ask. She has framed the ask. She has built the rules of the ask. The discipline of the morning made the discipline of the afternoon available.",
      },
      {
        speakerId: "inner-voice",
        text: "Yes. Twenty minutes. I will just listen.",
      },
    ],
    nextSceneId: "ending-steady-in-the-room",
  },

  // -------------------------------------------------------------------
  // Path B, project manager
  // -------------------------------------------------------------------
  {
    id: "path-b-fixed",
    backgroundId: "apartment",
    mood: "professional",
    presentCharacterIds: ["noor"],
    dialog: [
      {
        speakerId: null,
        text: "You open a doc. You title it Bridge round options. You put four boxes on it. You start filling in the boxes. You do not ask whether the doc is helpful. You do not ask whether she wanted a doc.",
      },
      {
        speakerId: "inner-voice",
        tone: "tactical",
        text: "You make the doc because the making is what your nervous system is doing.",
      },
      {
        speakerId: "noor",
        emotion: "neutral",
        text: "What is the doc.",
      },
      {
        speakerId: null,
        text: "You explain. She nods.",
      },
      {
        speakerId: "noor",
        emotion: "neutral",
        text: "Okay. Send it to me.",
      },
      {
        speakerId: "inner-voice",
        tone: "tactical",
        text: "She did not say thank you. She did not say it is good. She did not say it is wrong. She said send it to me. She is managing the moment with the lowest-overhead sentence available to her, because her overhead is now elsewhere.",
        event: "tactic-named:project-manager-reflex",
      },
      {
        speakerId: "inner-voice",
        tone: "tactical",
        text: "She accepted the doc because she loves you. She did not ask for it. You authored a deliverable into a room where the person in crisis was managing inputs, and the input you added was your usefulness.",
      },
      {
        speakerId: "inner-voice",
        tone: "tactical",
        text: "The doc is on her desktop now. She will not open it for three days. When she opens it on Wednesday she will read it and she will be grateful for the love it contains. That is real.",
      },
      {
        speakerId: "inner-voice",
        tone: "tactical",
        text: "The cost is that for the next three days she has been managing one more thing than she had to manage.",
      },
    ],
    nextSceneId: "ending-project-manager",
  },

  // -------------------------------------------------------------------
  // Path C, going small
  // -------------------------------------------------------------------
  {
    id: "path-c-small",
    backgroundId: "apartment",
    mood: "cold",
    presentCharacterIds: ["noor"],
    dialog: [
      {
        speakerId: "noor",
        emotion: "neutral",
        text: "Thanks. Yeah. Okay.",
      },
      {
        speakerId: null,
        text: "She walks to the kitchen table. She opens her laptop. She picks the chair facing the window. From the chair facing the window she will not see you in the next room. That is the difference.",
      },
      {
        speakerId: "inner-voice",
        tone: "tactical",
        text: "You went small. The phrases were correct. The size was wrong. The room she walked into needed an opener and you handed her the closer.",
        event: "tactic-named:going-small",
      },
      {
        speakerId: "inner-voice",
        tone: "tactical",
        text: "She is now managing the crisis and managing the fact that the person in the next room has handed her the closer.",
      },
      {
        speakerId: null,
        text: "She is at the table for the next three hours. She does not get up.",
      },
      {
        speakerId: null,
        text: "At 3:48 she takes her laptop into the bedroom and shuts the door. She does not slam it. The door closing is the data.",
      },
    ],
    nextSceneId: "ending-went-small",
  },

  // -------------------------------------------------------------------
  // ENDINGS
  // -------------------------------------------------------------------
  {
    id: "ending-steady-in-the-room",
    backgroundId: "apartment",
    mood: "peaceful",
    isEnding: true,
    outcomeType: "good",
    endingTitle: "Steady In The Room",
    endingSummary:
      "Twenty minutes of listening at 4:02. No deck. No fixing. A bowl of stew at 2:08 that was eaten standing. A chair that faced the hallway. The discipline at 12:31 was the smallest one you have ever practiced and the most useful one of the year. She will record the voice note at 4:18 and she will record it cleaner because the afternoon was a room she was alone in without being alone.",
    endingLearnPrompt:
      "When your partner is in crisis, the room you build for her is more useful than the work you do for her. The next time someone you love walks in with bad news, ask the two-offer question and let her decide which one she needs.",
    dialog: [
      {
        speakerId: null,
        text: "4:18 pm. She is at the kitchen table. The laptop is open. She presses record on a voice note.",
      },
      {
        speakerId: null,
        text: "You hear the first ninety seconds of it through the wall. She speaks slowly. She does not perform. The words land in the order she means them.",
      },
      {
        speakerId: "inner-voice",
        tone: "tactical",
        text: "The voice note is not addressed to you. It will not be sent to you. You will not hear it ever. d8 opens on Monday, when the CFO has acted on the note and the consequences land in the flat in a different room.",
      },
    ],
  },

  {
    id: "ending-project-manager",
    backgroundId: "apartment",
    mood: "professional",
    isEnding: true,
    outcomeType: "neutral",
    endingTitle: "The Deck",
    endingSummary:
      "You made a deck she did not ask for. She accepted it because she loves you. The deck will be read on Wednesday in a moment of spare bandwidth. The cost was that for the three days between Sunday and Wednesday she was managing one more thing than she had to manage. The deck contains love. So does the cost.",
    endingLearnPrompt:
      "Usefulness imported into a room of crisis is a kind of overhead. The cost is invisible because the recipient is too kind to name it. Notice the next time you reach for the doc when she asked for the room.",
    failureBlogSlug: "the-project-manager-reflex",
    failureBlogTitle: "Why making the deck your partner did not ask for is the wrong love",
    dialog: [
      {
        speakerId: null,
        text: "4:42 pm. She records the voice note at the kitchen table. You can hear seven minutes of it from the next room. It is not as clean as the version she would have recorded at 4:18.",
      },
      {
        speakerId: "inner-voice",
        tone: "tactical",
        text: "The deck is on her desktop. She will read it on Wednesday. She will be grateful. She will also be tired in a way that includes the deck.",
      },
    ],
  },

  {
    id: "ending-went-small",
    backgroundId: "apartment",
    mood: "cold",
    isEnding: true,
    outcomeType: "bad",
    endingTitle: "The Door Closed Quietly",
    endingSummary:
      "You said the correct words in the wrong size. She walked past you to the table that faces the window. At 3:48 she took her laptop to the bedroom. The door closed quietly. The closing was the message. The afternoon is hers to be alone in now in a way that includes you not being there.",
    endingLearnPrompt:
      "The phrases on a greeting card are designed to close. The room she walked into needed an opener. Audit the last time someone you love walked in with bad news: did you open the conversation or did you hand her the closer?",
    failureBlogSlug: "going-small-in-her-crisis",
    failureBlogTitle: "When the greeting-card sentence is the wrong door",
    dialog: [
      {
        speakerId: null,
        text: "5:14 pm. The bedroom door is closed. You can hear nothing through the wall. She records the voice note in the bedroom.",
      },
      {
        speakerId: "inner-voice",
        tone: "tactical",
        text: "The voice note will be sent to the CFO at 5:38 pm. You will not hear any of it. The door will open at 6:42 pm for dinner. You will eat dinner at the table. The conversation will be polite.",
      },
      {
        speakerId: "inner-voice",
        tone: "tactical",
        text: "The afternoon is now a permanent feature of the flat. You will not be able to take it back. You will need to do the next one differently.",
      },
    ],
  },
];

const datingMission7: Scenario = {
  id: "d7-work-crisis",
  title: "The Test",
  tagline:
    "Her company crisis lands in your kitchen. Be useful without becoming her project manager.",
  description:
    "Noor returns from a forty-two-minute call. Her lead investor pulled. She has ninety-one days of cash. The room she walks into is the room you build for her. The discipline is to ask the question that lets her tell you what she needs instead of authoring the role she has not asked you to play. Be the steady thing in the room. The work is what you do not do.",
  tier: "vip",
  track: "male-dating",
  level: 7,
  order: 1,
  estimatedMinutes: 11,
  difficulty: "advanced",
  category: "dating",
  xpReward: 300,
  badgeId: "steady-in-the-room",
  startSceneId: "cold-open",
  prerequisites: ["d6-first-real-fight"],
  isNew: true,
  tacticsLearned: [
    "Asking the two-offer question that lets the person in crisis name what she needs",
    "Refraining from problem-solving until invited",
    "Being the steady thing in the room when the room has changed shape",
    "Noticing the chair she picks as data",
  ],
  redFlagsTaught: [
    "The project-manager reflex: importing usefulness she did not ask for",
    "Going small: greeting-card phrases that close the conversation instead of opening it",
    "Performed strength as a kind of overhead in a partner's crisis",
    "The deck that contains love and also the cost of love",
  ],
  reward: {
    id: "steady-in-the-room",
    name: "Steady In The Room",
    description:
      "Twenty minutes of listening at 4:02 pm. No deck. No fixing. A bowl of stew eaten standing. The discipline of the afternoon was the room you did not author.",
  },
  characters: [NOOR, INNER_VOICE_M],
  scenes,
};

export default datingMission7;
