/**
 * Dating Line. Mission 10 "The Mother's Lunch"
 *
 * Three weeks after d9. Saturday July 5. La Bonne Soupe on West 55th.
 * Yasmin Rahimi, Noor's mother, chose the restaurant. She moved the
 * lunch up nine days without saying why. The thing she has come to
 * say is a stage-three ovarian cancer diagnosis. She has told the
 * protagonist before telling Noor. The diagnosis is the ask.
 *
 * The scenario teaches receiving a piece of trust without performing
 * competence, without immediately offering a plan, and without
 * deciding for the giver what to do with it next.
 *
 * Handoff out: the year of quiet she will ask the protagonist for.
 * d11 opens at Noor's birthday on the twenty-eighth.
 *
 * Pilot reference: `reference/d10-pilot.md`.
 */

import type { Scenario, Scene } from "../../types";
import { NOOR, INNER_VOICE_M } from "../../characters-male";
import type { Character } from "../../types";

const YASMIN: Character = {
  id: "yasmin",
  name: "Yasmin Rahimi",
  description:
    "Noor's mother. Sixty-one. Retired professor of comparative literature at AUC Cairo, moved to London twelve years ago. Sat in a room of undergraduates for thirty-four years. Knows how to open a difficult conversation. Verbal tic: names the topic and then takes a beat before naming the question.",
  traits: ["precise", "consenting", "long-view"],
  defaultEmotion: "knowing",
  gender: "female",
  personalityType: "mentor",
  silhouetteType: "female-elegant",
};

const scenes: Scene[] = [
  {
    id: "cold-open",
    backgroundId: "restaurant",
    mood: "professional",
    dialog: [
      {
        speakerId: null,
        text: "Saturday. July 5. 12:18 pm. You are walking to La Bonne Soupe on West 55th. Yasmin moved the lunch up nine days. She did not say why. You did not ask why.",
      },
      {
        speakerId: "inner-voice",
        tone: "tactical",
        text: "She is sixty-one. She lives in London. She has been in the city six days. She has eaten with Noor twice. She has not eaten with you yet. The lunch is the not-yet. That is not nothing.",
      },
      {
        speakerId: "inner-voice",
        tone: "tactical",
        text: "The original text last Saturday named the day and the question shape. The thing she would like to ask is not the thing you might be expecting. She has been precise about the absence of permission framing and the absence of wedding framing. The question is not in the obvious categories.",
      },
      {
        speakerId: "inner-voice",
        tone: "tactical",
        text: "You are wearing the navy blazer you do not wear often, because Noor said you should. You did not ask Noor what she thought the lunch was for. Noor did not tell you. Either Noor does not know, or Noor knows and has chosen not to brief you.",
      },
    ],
    nextSceneId: "the-table",
  },

  {
    id: "the-table",
    backgroundId: "restaurant",
    mood: "professional",
    presentCharacterIds: ["yasmin"],
    dialog: [
      {
        speakerId: null,
        text: "La Bonne Soupe. The narrow staircase. The wooden tables. Yasmin is at the corner table by the window, facing the door. She stands when she sees you. She does not extend her hand.",
      },
      {
        speakerId: null,
        text: "She kisses you once on each cheek, which she has done four times before, two at each of the holiday dinners Noor invited her to in Brooklyn.",
      },
      {
        speakerId: "yasmin",
        emotion: "knowing",
        text: "Sit. I have ordered the onion soup. They make it well here. Their wine list is reasonable. I ordered a half bottle. We do not need to drink it. The bottle is for the table.",
      },
      {
        speakerId: null,
        text: "She sits. She is wearing a grey wool dress that is heavier than the day deserves. Her hair is pinned back with a tortoiseshell clip you have seen in three of the four prior dinners. Her hands are on the table. They are folded. The folding is deliberate.",
      },
      {
        speakerId: "inner-voice",
        tone: "tactical",
        text: "Sixty-one. Retired professor. Sat in a room of undergraduates for thirty-four years. She knows how to open a difficult conversation. You can read in her hands that she has been thinking about how to open this one for more than an hour.",
      },
    ],
    nextSceneId: "she-names-the-topic",
  },

  {
    id: "she-names-the-topic",
    backgroundId: "restaurant",
    mood: "tense",
    presentCharacterIds: ["yasmin"],
    dialog: [
      {
        speakerId: "yasmin",
        emotion: "knowing",
        text: "Before I tell you what I have come to tell you, I want to tell you what I have not come to tell you. I have not come to ask you about Noor. The proposal was the right shape. The naming was the right ask.",
      },
      {
        speakerId: "yasmin",
        emotion: "knowing",
        text: "I have not come to ask you about money. Noor's father and I are fine. We do not need anything from you. I have not come to ask you about children, religion, or where you intend to live in ten years.",
      },
      {
        speakerId: "yasmin",
        emotion: "knowing",
        text: "I have come for one thing. I will name it. I would like to name it to you before I name it to Noor. That is the structure of the conversation. I am telling you about the structure first so you can decide whether you want me to continue.",
      },
      {
        speakerId: "inner-voice",
        tone: "tactical",
        text: "She has done two things at once. She has cleared the field of the obvious topics. She has named the order of disclosure. The mother is asking permission to do this, not from Noor, but from the protagonist. The mother is being precise about consent in a way most mothers are not.",
      },
      {
        speakerId: "inner-voice",
        text: "Continue. Please.",
      },
    ],
    nextSceneId: "she-names-the-ask",
  },

  {
    id: "she-names-the-ask",
    backgroundId: "restaurant",
    mood: "tense",
    presentCharacterIds: ["yasmin"],
    dialog: [
      {
        speakerId: "yasmin",
        emotion: "serious",
        text: "I was diagnosed two months ago. Stage three ovarian cancer. The treatment plan is twelve weeks of chemotherapy beginning in September, followed by surgery, followed by an unknown amount of further treatment.",
      },
      {
        speakerId: "yasmin",
        emotion: "serious",
        text: "The prognosis at this stage with the treatment plan is a roughly fifty percent five-year survival rate. I have read the literature. The number is the number.",
      },
      {
        speakerId: "yasmin",
        emotion: "serious",
        text: "I have not told Noor. I will tell her in October. I will tell her after the first round of chemotherapy so that the conversation is about facts I have already survived rather than facts I am facing. I have told her father. I have told my sister in Beirut. I have told you.",
      },
      {
        speakerId: "yasmin",
        emotion: "serious",
        text: "The thing I am asking. When I tell Noor in October, she will need a steady person in the room with her in the weeks after. Not someone solving anything. Not someone telling her father what to do. A steady person.",
      },
      {
        speakerId: "yasmin",
        emotion: "serious",
        text: "I am asking you to be that person. I am asking now because the steadiness in October is not built in October. It is built in the three months between now and then. I would like you to have time to build the steadiness without performing it.",
      },
      {
        speakerId: "inner-voice",
        tone: "tactical",
        text: "She has named the diagnosis. She has named the prognosis. She has named the ask. She has named why the ask is being made now and not in October. She has done the entire conversation in ninety seconds, in the right order, without rehearsing, with her hands folded on the table.",
      },
      {
        speakerId: null,
        text: "The room is silent. The waiter has not arrived with the soup.",
      },
    ],
    nextSceneId: "the-choice",
  },

  {
    id: "the-choice",
    backgroundId: "restaurant",
    mood: "tense",
    presentCharacterIds: ["yasmin"],
    dialog: [],
    choices: [
      {
        id: "receive",
        text: "Thank you for telling me. I will be the steady person. I am not going to ask you what you need me to do today. I am going to ask you what you need me to do this month, and you can decide which of those answers I act on.",
        tactic:
          "Receive. Do not perform. Do not immediately propose. Acknowledge the trust. Ask for the next thirty days, not the next twelve weeks.",
        isOptimal: true,
        event: "optimal-with-grace",
        nextSceneId: "path-a-receive",
      },
      {
        id: "question-back",
        text: "Thank you for telling me. Can I ask some questions. What hospital. What protocol. Who is your oncologist. Have you considered a second opinion at Sloan Kettering.",
        tactic:
          "Question back. The instinct is to demonstrate that you are taking it seriously by asking everything the internet says you should ask. The performance of competence is the failure mode.",
        feedback:
          "She will answer the questions because she is gracious. The answers will not change what she needed from you, which was the receiving.",
        nextSceneId: "path-b-question-back",
      },
      {
        id: "make-a-plan",
        text: "Thank you for telling me. We need to talk about how to tell Noor. I think she should know now. Let me think about how to bring it up with her tonight.",
        tactic:
          "Make a plan. You have done the thing she specifically asked you not to do, which is decide for her what comes next. The mother brought the ask to you, not to you-and-Noor.",
        event: "failure-rejected",
        nextSceneId: "path-c-make-a-plan",
      },
    ],
  },

  {
    id: "path-a-receive",
    backgroundId: "restaurant",
    mood: "peaceful",
    presentCharacterIds: ["yasmin"],
    dialog: [
      {
        speakerId: "yasmin",
        emotion: "knowing",
        text: "That is the right answer. Thank you.",
      },
      {
        speakerId: null,
        text: "She does not say more. The waiter arrives with the soup. She moves her hands off the table to let him place the bowl. She watches the bowl arrive. She picks up the spoon.",
      },
      {
        speakerId: "yasmin",
        emotion: "knowing",
        text: "This month. I would like you to do nothing this month that you would not have done anyway. I would like the three months to feel like three months. The thing I cannot give Noor, which is three months of ordinary life, I am asking you to give me at lunches and dinners and the kind of conversation we are having right now.",
      },
      {
        speakerId: "yasmin",
        emotion: "knowing",
        text: "In August we will see each other twice. Once at the twenty-eighth, for Noor's birthday at the restaurant in Cobble Hill. Once on the thirty-first when I fly back to London. After the thirty-first I will not see you in person until October.",
      },
      {
        speakerId: "yasmin",
        emotion: "knowing",
        text: "In October the steadiness will be the work. Between now and October the work is the not-performing. Do you understand.",
      },
      {
        speakerId: "inner-voice",
        tone: "tactical",
        text: "She is teaching you the discipline she is asking you to practice. Not performing is the discipline. The three months of ordinary life are the practice. The October is the meeting the practice has been for.",
      },
      {
        speakerId: "inner-voice",
        text: "Yes. I understand.",
      },
      {
        speakerId: "yasmin",
        emotion: "knowing",
        text: "Good. Now we eat the soup, and you tell me about the company Noor said you started in 2022. Noor explains it the way Noor explains all the things she is too close to. I would like to hear it from you.",
      },
      {
        speakerId: null,
        text: "You eat the soup. You tell her about the company. The lunch lasts ninety minutes. By 2:00 pm you have eaten the soup, finished the half bottle, and learned that Yasmin was the chair of the literature department at AUC in 2002.",
      },
      {
        speakerId: "inner-voice",
        tone: "tactical",
        text: "She has built the lunch you needed to be sitting in. The lunch is the lunch. The diagnosis is the diagnosis. Both are in the same room, at the same table, and the soup was the soup.",
      },
    ],
    nextSceneId: "ending-the-soup-eaten",
  },

  {
    id: "path-b-question-back",
    backgroundId: "restaurant",
    mood: "professional",
    presentCharacterIds: ["yasmin"],
    dialog: [
      {
        speakerId: null,
        text: "You ask the questions. She answers them. She has been to Sloan Kettering for a second opinion. The oncologist is one of the two best in the city for this protocol. The surgery will be open. Noor's father has been to five of the seven appointments so far.",
      },
      {
        speakerId: null,
        text: "By the time the soup arrives you have asked twelve questions. She has answered all of them. The questions are the questions you would have wanted answered. The answers are not what she came to give you.",
      },
      {
        speakerId: "yasmin",
        emotion: "knowing",
        text: "Thank you for the questions. They are good questions. I want you to know that I have not come for this specific conversation. I came because the steadiness in October will need to be built between now and then. Are we still able to build that.",
      },
      {
        speakerId: "inner-voice",
        tone: "tactical",
        text: "She is asking you to redirect. She is doing it the way a teacher asks a student to revise. She is not annoyed. She is taking the long view of the conversation. The failure mode is recoverable.",
        event: "tactic-named:clinical-questions-as-performance",
      },
      {
        speakerId: "inner-voice",
        text: "Yes. I overstepped. We can build the steadiness. Tell me what this month looks like for you.",
      },
      {
        speakerId: "yasmin",
        emotion: "knowing",
        text: "Good. That recovery is the practice. The next twelve weeks are more of that recovery.",
      },
    ],
    nextSceneId: "ending-the-questions-redirected",
  },

  {
    id: "path-c-make-a-plan",
    backgroundId: "restaurant",
    mood: "cold",
    presentCharacterIds: ["yasmin"],
    dialog: [
      {
        speakerId: "yasmin",
        emotion: "serious",
        text: "I have brought this to you. I have not brought this to you-and-Noor. The distinction is important. If we collapse it now, we will collapse it for the next twelve weeks. I am asking you to hold the distinction.",
      },
      {
        speakerId: "yasmin",
        emotion: "serious",
        text: "If you cannot hold it, I would like you to tell me now, so that I can tell Noor myself this afternoon and we restart on different ground.",
      },
      {
        speakerId: "inner-voice",
        tone: "tactical",
        text: "She is offering you the chance to recover. The recovery is to acknowledge that you have overridden the framing she named ninety seconds ago.",
      },
      {
        speakerId: "inner-voice",
        text: "I still think Noor should know. The three months feel like a long time to carry this alone.",
      },
      {
        speakerId: "yasmin",
        emotion: "serious",
        text: "Okay. Thank you for being clear. I will tell her tonight. I will not need you to be present for that conversation. We will see each other in October.",
      },
      {
        speakerId: null,
        text: "She pays for the half bottle. She walks you to the corner. She kisses you once on each cheek. She returns to her hotel. She tells Noor that evening. The conversation does not include you.",
      },
    ],
    nextSceneId: "ending-the-planning-override",
  },

  {
    id: "ending-the-soup-eaten",
    backgroundId: "restaurant",
    mood: "peaceful",
    isEnding: true,
    outcomeType: "good",
    endingTitle: "The Soup Eaten",
    endingSummary:
      "Ninety minutes at La Bonne Soupe. The diagnosis named. The ask received. The thirty-day frame agreed. The Mahmoud Darwish story you did not know about. The half bottle finished. The three months between now and October will be ordinary. The ordinary is the practice.",
    endingLearnPrompt:
      "When someone gives you a piece of trust, the work is the receiving. Audit the last time someone in your life named a hard thing. Did you receive it, or did you immediately start solving it, or did you ask the clinical questions you would have wanted answered?",
    dialog: [
      {
        speakerId: "inner-voice",
        tone: "tactical",
        text: "Three months ahead. The August dinners. The October when she tells Noor. The not-performing now is the steadiness then.",
      },
    ],
  },

  {
    id: "ending-the-questions-redirected",
    backgroundId: "restaurant",
    mood: "professional",
    isEnding: true,
    outcomeType: "neutral",
    endingTitle: "The Questions That Did Not Land",
    endingSummary:
      "You asked twelve clinical questions. She answered them. She asked you to redirect. You redirected with grace. The lunch finished at 2:14 pm. The thirty-day frame is intact. The practice will need to compensate for the first ten minutes.",
    endingLearnPrompt:
      "Clinical questions are the performance of competence. Asking the questions you would have wanted answered is asking your own questions back. Audit the next hard piece of news and notice whether the questions you reach for serve the speaker or yourself.",
    failureBlogSlug: "the-clinical-questions",
    failureBlogTitle: "Why asking the questions you would have wanted answered is the performance of competence",
    dialog: [
      {
        speakerId: "inner-voice",
        tone: "tactical",
        text: "Three months ahead. The August dinners will be slightly heavier than they would have been because the first ten minutes need to be redeemed. The redemption is real. The cost is small. The not-performing remains the discipline.",
      },
    ],
  },

  {
    id: "ending-the-planning-override",
    backgroundId: "restaurant",
    mood: "cold",
    isEnding: true,
    outcomeType: "bad",
    endingTitle: "The Distinction Collapsed",
    endingSummary:
      "You proposed bringing Noor in tonight. Yasmin acknowledged the proposal and asked you to hold the distinction. You insisted Noor should know. Yasmin paid for the half bottle and walked you to the corner. She told Noor herself that evening. The three months you would have spent building steadiness will instead be three months of Noor managing her mother's diagnosis with a partner who could not hold a frame.",
    endingLearnPrompt:
      "Deciding for the giver what to do with what they gave you is the wrong love. The next time someone trusts you with something, ask what they want done with the trust before you decide what to do with it.",
    failureBlogSlug: "the-planning-override",
    failureBlogTitle: "Why deciding for your partner's parent how to tell your partner is the wrong love",
    dialog: [
      {
        speakerId: "inner-voice",
        tone: "tactical",
        text: "Saturday night. Noor knows. The way she knows is not the way she would have known in October. The three months of ordinary that Yasmin asked for are gone. The October will still happen. The August dinners will be different dinners.",
      },
    ],
  },
];

const datingMission10: Scenario = {
  id: "d10-the-mothers-lunch",
  title: "The Mother's Lunch",
  tagline:
    "Three weeks after the proposal. The mother brought a piece of trust to lunch. Receive it.",
  description:
    "Saturday July 5. La Bonne Soupe. Yasmin Rahimi has moved the lunch up nine days. She has been precise about the framing: this is not about Noor, money, religion, or children. She has been diagnosed with stage three ovarian cancer two months ago and is telling you before she tells Noor. The discipline is to receive the trust without performing competence, without immediately proposing a plan, and without deciding for her what comes next.",
  tier: "vip",
  track: "male-dating",
  level: 10,
  order: 1,
  estimatedMinutes: 11,
  difficulty: "advanced",
  category: "dating",
  xpReward: 380,
  badgeId: "soup-eaten",
  startSceneId: "cold-open",
  prerequisites: ["d9-the-question"],
  isNew: true,
  tacticsLearned: [
    "Receiving a piece of trust without immediately proposing a plan",
    "Asking for the thirty-day frame, not the twelve-week one",
    "Holding the distinction between the giver and the giver's family",
    "Letting the lunch be the lunch",
  ],
  redFlagsTaught: [
    "Asking the clinical questions you would have wanted answered",
    "Deciding for the giver who to tell next",
    "Performing competence in the place of receiving",
    "Collapsing the consent distinction that the giver was precise about",
  ],
  reward: {
    id: "soup-eaten",
    name: "The Soup Eaten",
    description:
      "The diagnosis named, the ask received, the thirty-day frame agreed. The lunch was the lunch. The ordinary is the practice the October will need.",
  },
  characters: [YASMIN, NOOR, INNER_VOICE_M],
  scenes,
};

export default datingMission10;
