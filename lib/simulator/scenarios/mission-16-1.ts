/**
 * Female Track. Mission 16-1 "The Interview"
 *
 * Three years after L15-2. The senior advisory seat became a
 * partner-track conversation in year two. The protagonist is now a
 * partner at Halberd Carrey. Adrian Vale left fourteen months after
 * L15-2 for an operating role at a portfolio company he no longer is
 * at.
 *
 * Elena Vasquez is the candidate sitting across the table this
 * morning. Twenty-seven, two years post-MBA, came in through the
 * inbound list. The resume Kaya would have flagged a decade ago. The
 * discipline taught: ask the questions Kaya would have asked, not the
 * questions Maris would have asked.
 *
 * Handoff out: Elena's note Friday morning. L16-2 opens on the second
 * interview at Halberd's quarterly all-hands.
 *
 * Pilot reference: `reference/L16-1-pilot.md`.
 */

import type { Scenario, Scene } from "../types";
import { ELENA, LENNOX, INNER_VOICE } from "../characters";

const scenes: Scene[] = [
  {
    id: "cold-open",
    backgroundId: "office",
    mood: "professional",
    dialog: [
      {
        speakerId: null,
        text: "Tuesday. 9:54 am. Your office on the 14th floor at Halberd Carrey. The chair you sit in is the chair Lennox used to sit in for the partners' meetings. You moved into the partner office in March, fifteen months ago.",
      },
      {
        speakerId: null,
        text: "Elena Vasquez has been in the lobby since 9:48 am, which is six minutes early. She is wearing a charcoal suit you would have read as too formal at her age. The assistant just walked her down. She is the L1 you would have been if you had submitted a resume to Halberd at twenty-seven instead of meeting Maris at the rooftop.",
      },
      {
        speakerId: "inner-voice",
        tone: "tactical",
        text: "Three years since Adrian. Two years since Kaya's last text. The chair you sit in now has structural weight. Elena does not know which chair was Kaya's and which is the partner's. To Elena they are the same chair. To you they are not.",
      },
      {
        speakerId: "inner-voice",
        tone: "tactical",
        text: "Kaya asked three questions at her interview. Maris would have asked three different ones. The questions you ask today are the questions the protagonist Elena will be in eight years will remember asking.",
      },
    ],
    nextSceneId: "she-walks-in",
  },

  {
    id: "she-walks-in",
    backgroundId: "office",
    mood: "professional",
    presentCharacterIds: ["elena"],
    dialog: [
      {
        speakerId: null,
        text: "Elena walks in. She shakes your hand with the right pressure. She does not look at the bookshelf. She does not look at the view. She sits in the chair across from you and crosses her ankles and waits.",
      },
      {
        speakerId: "elena",
        emotion: "hopeful",
        text: "Thank you for the time. I have been at Veridian for two years. I came in through the inbound. I want to talk about the work I have been doing on retention modelling at the cohort level. The numbers are in the deck I sent Friday.",
      },
      {
        speakerId: null,
        text: "She pauses for one second before saying the word numbers. The pause is the pause of someone who has been told her numbers should sound careful.",
      },
      {
        speakerId: "inner-voice",
        tone: "tactical",
        text: "The pause is the tell. She has been coached. She is doing the calibration the coaching asked for. The coaching is correct. The interview is a different room than the one the coaching prepared her for.",
      },
      {
        speakerId: "inner-voice",
        tone: "tactical",
        text: "You did not see her deck. You read the bio. The bio is fine. The bio is what Kaya would have read in 2018 about you. You have three questions to ask.",
      },
    ],
    nextSceneId: "the-three-questions",
  },

  {
    id: "the-three-questions",
    backgroundId: "office",
    mood: "tense",
    presentCharacterIds: ["elena"],
    dialog: [
      {
        speakerId: "inner-voice",
        tone: "tactical",
        text: "Two interview-question registers exist. The Kaya register and the Maris register. Both are in the bookshelf behind you. Both have shaped people you have become. The question is which one you carry across.",
      },
      {
        speakerId: "inner-voice",
        tone: "tactical",
        text: "Kaya asked: where is the operating clarity that this work has earned you. What conflict has the work survived. What have you refused that the room expected you to accept.",
      },
      {
        speakerId: "inner-voice",
        tone: "tactical",
        text: "Maris would ask: what status proxies are you carrying. How do you respond when the frame is challenged. What will you tolerate to get where you said you want to be.",
      },
      {
        speakerId: "inner-voice",
        tone: "tactical",
        text: "The questions are not equivalent. They produce different rooms.",
      },
    ],
    choices: [
      {
        id: "kaya-questions",
        text: "Ask the three Kaya asked. Operating clarity. Conflict survived. What has been refused.",
        tactic:
          "Be the door. Kaya's three questions are the questions that built you. They are the questions that produce the operator a partnership wants to back. Use them.",
        isOptimal: true,
        event: "optimal-with-grace",
        nextSceneId: "path-a-kaya-questions",
      },
      {
        id: "mixed-three",
        text: "Ask two from Kaya, one from Maris. Operating clarity and conflict survived from Kaya. The frame-challenge question from Maris.",
        tactic:
          "Mixed three. You noticed the Maris temptation and split it. The frame-challenge question is the Maris one that feels most defensible. It is still a Maris question.",
        feedback:
          "Elena will answer well. The room will tilt slightly. The tilt will be the part you regret in eight years.",
        nextSceneId: "path-b-mixed",
      },
      {
        id: "maris-questions",
        text: "Ask the three Maris would have asked. Status proxies. Frame challenge. Tolerance for what is required.",
        tactic:
          "Ask Maris's three. You have become the door you wanted to refuse to be. Elena will answer them. The answers will tell you who she will become. The answers will tell you what you have become.",
        event: "failure-rejected",
        nextSceneId: "path-c-maris-questions",
      },
    ],
  },

  {
    id: "path-a-kaya-questions",
    backgroundId: "office",
    mood: "peaceful",
    presentCharacterIds: ["elena"],
    dialog: [
      {
        speakerId: "inner-voice",
        text: "Elena. Three questions. Take your time on each. Tell me about a piece of work where you knew, the day you started it, what the operating outcome was going to look like, and you were right.",
      },
      {
        speakerId: null,
        text: "Elena answers. She takes seven minutes. The example is the kind of example a person who has done the work gives. She names a specific cohort. She names the number she was wrong by. She names what she changed because of the gap.",
      },
      {
        speakerId: "inner-voice",
        text: "Second question. Tell me about a conflict at work where you and the other side both still respect each other afterward.",
      },
      {
        speakerId: "elena",
        emotion: "serious",
        text: "Last year, head of growth. We disagreed about whether to spend the Q3 budget on paid acquisition or on the cohort onboarding rebuild. I was wrong about the math. He was wrong about the timing. We split the budget. I learned the math piece. He learned the timing piece. We are still on a Slack channel together and we will be when I leave Veridian.",
      },
      {
        speakerId: "inner-voice",
        text: "Third. Tell me about something you were offered, in the last two years, that you refused, that you knew at the moment of refusing was going to cost you something specific.",
      },
      {
        speakerId: "elena",
        emotion: "serious",
        text: "I was offered a VP title at Veridian last December. I would have been the youngest VP in the company. I would have reported to the same person who is now my closest collaborator. I refused because the work I wanted to do for the next eighteen months is operator work, not management work, and the title would have pulled me out of the operator work three months in. I have not regretted the refusal. The person who offered it has not forgiven me. I do not expect him to.",
      },
      {
        speakerId: "inner-voice",
        tone: "tactical",
        text: "Three answers. Each one named a specific. Each one named the cost. None of them tried to make her sound impressive. The trying is what coaching produces. The not-trying is what the work produces.",
      },
      {
        speakerId: "inner-voice",
        text: "Thank you. I have what I need. The next interview is at the quarterly all-hands on Friday. You will meet four more partners. I will be the one who walks you in. We will not test you again. We will introduce you.",
      },
    ],
    nextSceneId: "ending-the-door-built",
  },

  {
    id: "path-b-mixed",
    backgroundId: "office",
    mood: "professional",
    presentCharacterIds: ["elena"],
    dialog: [
      {
        speakerId: null,
        text: "You ask Kaya's first two questions. Elena answers them the way she answered them in path A. The room is the same. Then you ask the Maris question.",
      },
      {
        speakerId: "inner-voice",
        text: "Last question. Tell me about a time when your framing of a situation was directly challenged, and how you held it.",
      },
      {
        speakerId: null,
        text: "Elena pauses. The pause is longer than her usual pause. She answers. The example is a board meeting at Veridian where the CEO publicly disagreed with her growth forecast. She held the forecast. The CEO conceded three weeks later when the numbers came in.",
      },
      {
        speakerId: "inner-voice",
        tone: "tactical",
        text: "Her answer is good. Her answer is the answer Maris would have wanted to hear. The Maris question pulled the conversation into a frame-defending register. You watched her shift into it. She did not notice the shift. You did.",
        event: "tactic-named:the-maris-question-tilt",
      },
      {
        speakerId: "inner-voice",
        text: "Thank you. I have what I need. Quarterly all-hands on Friday.",
      },
      {
        speakerId: "inner-voice",
        tone: "tactical",
        text: "You did not need the third question. The first two were enough. The third one created a small adjustment in the air. Elena will not remember it as an adjustment. She will remember the interview as a good interview. You will know that the third question was the part that was for you, not for the work.",
      },
    ],
    nextSceneId: "ending-the-mixed-three",
  },

  {
    id: "path-c-maris-questions",
    backgroundId: "office",
    mood: "cold",
    presentCharacterIds: ["elena"],
    dialog: [
      {
        speakerId: "inner-voice",
        text: "Elena. Three questions. Status: who in your industry knows you. Frame: how do you respond when someone openly disagrees with you. Tolerance: what are you willing to put up with to get the seat you want.",
      },
      {
        speakerId: null,
        text: "Elena answers all three. The answers are calibrated. The answers are the answers the coaching prepared her for. She does not visibly shift. The room shifts.",
      },
      {
        speakerId: "inner-voice",
        tone: "tactical",
        text: "You asked Maris's three. The interview has been the interview Maris would have run. Elena has done well in it. You have done badly in it. The work that produced you was Kaya. You have just used Maris.",
        event: "tactic-named:the-mirror-failure",
      },
      {
        speakerId: "inner-voice",
        text: "Thank you. We will be in touch.",
      },
      {
        speakerId: null,
        text: "Elena leaves at 10:31 am. She closes the door behind her. You sit in your chair for a long beat. You look at the bookshelf. The third shelf has a copy of a book Kaya gave you in 2024 with a note in the inside cover that you have not opened in eighteen months.",
      },
      {
        speakerId: "inner-voice",
        tone: "tactical",
        text: "Elena will not get the role. The role is not the issue. The issue is that the room you ran today was a room you would have refused to be in at twenty-seven. You have become the door you swore you would not be.",
      },
    ],
    nextSceneId: "ending-the-mirror-failed",
  },

  {
    id: "ending-the-door-built",
    backgroundId: "office",
    mood: "peaceful",
    isEnding: true,
    outcomeType: "good",
    endingTitle: "The Door Built",
    endingSummary:
      "Three Kaya questions. Three Elena answers, each naming a specific and a cost. The all-hands on Friday will be the introduction, not the second test. Elena will join the firm in January. In eight years she will run her own interview using Kaya's three questions. The door is the door you wanted to have at twenty-seven.",
    endingLearnPrompt:
      "Becoming the door is a choice you make in specific rooms, not a posture you hold across all rooms. Audit the next interview you run. Whose three questions are you asking. Are they the questions that produced you, or the questions that tested you.",
    dialog: [
      {
        speakerId: null,
        text: "Friday morning. Elena's note arrives. Two sentences.",
      },
      {
        speakerId: "elena",
        emotion: "knowing",
        text: "Thank you for Tuesday. The third question was the question I have been waiting for someone to ask me. I will be at the all-hands.",
      },
      {
        speakerId: "lennox",
        emotion: "knowing",
        text: "Saw the interview notes. Three questions, three answers. The right shape. We will discuss Friday after the all-hands. Lennox.",
      },
    ],
  },

  {
    id: "ending-the-mixed-three",
    backgroundId: "office",
    mood: "professional",
    isEnding: true,
    outcomeType: "neutral",
    endingTitle: "The Mixed Three",
    endingSummary:
      "Two Kaya questions, one Maris. The interview was good. The room shifted by a quarter-degree on the third question. Elena did not notice. You did. She will join the firm. The note she writes Friday will not name the third question. The third question will stay in the room with you.",
    endingLearnPrompt:
      "The Maris question that feels most defensible is the Maris question. Audit the next time you reach for the frame-challenge question in an interview. Is it for the work or is it for you.",
    failureBlogSlug: "the-maris-question-tilt",
    failureBlogTitle: "Why the frame-challenge question tilts the room a quarter-degree",
    dialog: [
      {
        speakerId: "elena",
        emotion: "neutral",
        text: "Thank you for Tuesday. I look forward to Friday.",
      },
    ],
  },

  {
    id: "ending-the-mirror-failed",
    backgroundId: "office",
    mood: "cold",
    isEnding: true,
    outcomeType: "bad",
    endingTitle: "The Mirror Failed",
    endingSummary:
      "Three Maris questions. Elena performed well. The room was the room Maris would have run. The role will go to someone else for reasons you will not articulate publicly. The interview will stay with you as a small thing you wish you had done differently. The shelf has a book you have not opened in eighteen months. The book is the next conversation you owe yourself.",
    endingLearnPrompt:
      "The mirror failure is the failure of becoming the door you swore you would not be. The next time you sit across from a twenty-seven-year-old, ask whether you are asking the questions that produced you or the questions that tested you.",
    failureBlogSlug: "the-mirror-failure",
    failureBlogTitle: "Why running a Maris interview makes you the door you swore you would not be",
    dialog: [
      {
        speakerId: null,
        text: "Friday morning. Elena's note arrives. One sentence.",
      },
      {
        speakerId: "elena",
        emotion: "neutral",
        text: "Thank you for the time on Tuesday. I have accepted an offer at another firm.",
      },
    ],
  },
];

const mission16_1: Scenario = {
  id: "mission-16-1",
  title: "The Interview",
  tagline:
    "Elena across the table. Kaya's three questions or Maris's three. The door you are choosing to be.",
  description:
    "Three years after L15-2. The protagonist is now a partner at Halberd Carrey. Elena Vasquez sits across the table this morning. Twenty-seven, two years post-MBA, came in through the inbound list. The discipline is to ask the questions Kaya asked, not the questions Maris would have. Be the door you wanted to have at L1.",
  tier: "vip",
  track: "female",
  level: 16,
  order: 1,
  estimatedMinutes: 11,
  difficulty: "advanced",
  category: "social-dynamics",
  xpReward: 500,
  badgeId: "door-built",
  startSceneId: "cold-open",
  prerequisites: ["mission-15-2"],
  isNew: true,
  tacticsLearned: [
    "Asking the operating-clarity question instead of the status-proxy question",
    "Asking the conflict-survived question instead of the frame-challenge question",
    "Asking the refusal-cost question instead of the tolerance question",
    "Becoming the door you wanted to have at the same age",
  ],
  redFlagsTaught: [
    "The Maris question that feels defensible because it is calibrated",
    "The frame-challenge question that tilts the room a quarter-degree",
    "Mixing two Kaya questions with one Maris question and calling it balance",
    "Running the room you swore you would not be the door of",
  ],
  reward: {
    id: "door-built",
    name: "The Door Built",
    description:
      "Three Kaya questions. Three Elena answers, each naming a specific and a cost. In eight years Elena will run her own interview using these three. The door is the door you wanted to have at twenty-seven.",
  },
  characters: [ELENA, LENNOX, INNER_VOICE],
  scenes,
};

export default mission16_1;
