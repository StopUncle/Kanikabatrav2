/**
 * Dating Line. Mission 14 "The Royal Marsden Week"
 *
 * February 2. Heathrow Terminal 5, 7:14 am London. The protagonist
 * landed at 6:32 on the overnight from Newark. Yasmin is at her flat
 * in Maida Vale. The surgery is Monday February 9. The protagonist
 * will see her for seven days. Noor's father, Reza, flies in Saturday.
 * Layla flies in Sunday. The household is full from Sunday onward.
 *
 * On Wednesday afternoon at the flat after lunch, Yasmin asks the
 * question she has been waiting since July 5 to ask. If the surgery
 * does not go the way the surgeon has said it will go, would the
 * protagonist be the one to carry her ashes from the crematorium.
 * The ask is for him specifically. The discipline is to receive the
 * question with the same not-doing as La Bonne Soupe. Answer it
 * cleanly. Do not perform readiness for something that may not
 * happen. Do not refuse the ask under the framing that the surgery
 * will go well.
 *
 * Handoff out: the surgery Monday + the recovery weeks. d15 opens
 * at the hospital Monday morning.
 *
 * Pilot reference: `reference/d14-pilot.md`.
 */

import type { Scenario, Scene } from "../../types";
import { NOOR, INNER_VOICE_M } from "../../characters-male";
import type { Character } from "../../types";

const YASMIN: Character = {
  id: "yasmin",
  name: "Yasmin Rahimi",
  description:
    "Noor's mother. Three rounds of chemotherapy in, six days before the surgery. Maida Vale flat, third floor walk-up, the building Reza bought in 1993 with the money from selling his late father's bookshop in Cairo. She has prepared the question since July 5.",
  traits: ["precise", "consenting", "long-view"],
  defaultEmotion: "serious",
  gender: "female",
  personalityType: "mentor",
  silhouetteType: "female-elegant",
};

const scenes: Scene[] = [
  {
    id: "cold-open",
    backgroundId: "apartment",
    mood: "cold",
    dialog: [
      {
        speakerId: null,
        text: "Tuesday February 2. Heathrow Terminal 5. 7:14 am London. You landed at 6:32 on the overnight from Newark. The cab driver knows where the Royal Marsden is. He has driven there twice this month. He does not say why.",
      },
      {
        speakerId: null,
        text: "Maida Vale is forty minutes from Heathrow at this hour. The flat is on the third floor of a walk-up that Reza bought in 1993 with the money from selling his late father's bookshop in Cairo. You have been here three times. Once for Yasmin's seventieth, the May before you and Noor moved in together. Twice in the years before the diagnosis.",
      },
      {
        speakerId: "inner-voice",
        tone: "tactical",
        text: "Seven days. The flat from Tuesday morning to Sunday morning. Reza arrives Saturday. Layla arrives Sunday. The room from Sunday onward is the family room. The five days before are yours and Yasmin's.",
      },
      {
        speakerId: "inner-voice",
        tone: "tactical",
        text: "The discipline tonight is the discipline you have been preparing for since La Bonne Soupe. Not different. Not performed. Be the steady person Yasmin asked you to become.",
      },
    ],
    nextSceneId: "the-week-arrives",
  },

  {
    id: "the-week-arrives",
    backgroundId: "apartment",
    mood: "peaceful",
    presentCharacterIds: ["yasmin"],
    dialog: [
      {
        speakerId: null,
        text: "Tuesday 8:42 am. Yasmin opens the door. She is wearing the same grey wool dress from La Bonne Soupe in a lighter weight, the one she had altered for the August heat eight months ago. The dress is now slightly large on her. She has lost six kilos across the chemotherapy.",
      },
      {
        speakerId: "yasmin",
        emotion: "knowing",
        text: "You are early. I am early. We have time. Coffee is ready.",
      },
      {
        speakerId: null,
        text: "She has set two cups at the small kitchen table by the window. The window faces the green of Little Venice. She does not hug you. She kisses you on each cheek the way she has done six times before. She sits.",
      },
      {
        speakerId: "inner-voice",
        tone: "tactical",
        text: "The flat is the flat. The coffee is the coffee. Yasmin is doing the same exercise she has been doing across the four dinners since August. Be the person who is in the room for the same reasons as the eight months prior.",
      },
      {
        speakerId: null,
        text: "Tuesday. Wednesday morning. Wednesday lunch.",
      },
      {
        speakerId: null,
        text: "Lunch is the lunch where she asks. The lunch is at the small table. The food is the food she cooks one bowl of a day during chemotherapy, the lentils with cumin her mother taught her in 1968. She eats half. You finish yours.",
      },
    ],
    nextSceneId: "wednesday-lunch",
  },

  {
    id: "wednesday-lunch",
    backgroundId: "apartment",
    mood: "tense",
    presentCharacterIds: ["yasmin"],
    dialog: [
      {
        speakerId: "yasmin",
        emotion: "serious",
        text: "I have been holding a question since July 5. I have not been able to place it until this lunch because I needed to be in remission to ask it cleanly. I am in remission now. The placement is correct today.",
      },
      {
        speakerId: "yasmin",
        emotion: "serious",
        text: "If it does not go the way the surgeon has said it will go, I would like you to be the one to take me from the crematorium. Not Reza. Reza will not be able to. Not Layla. Layla is family by blood. Not Noor. Noor will need to be my daughter on that day, not my executor.",
      },
      {
        speakerId: "yasmin",
        emotion: "serious",
        text: "I have not asked you for anything except the steadiness. This is the ask the steadiness was for. You do not have to agree. You do not have to agree today. But the asking is the ask.",
      },
      {
        speakerId: "inner-voice",
        tone: "tactical",
        text: "She has placed the question in three paragraphs. She has named the three people she has decided are not the right people. She has named the reason for each. She has said the asking is the ask. The asking is the ask Yasmin has been building toward since the lunch at La Bonne Soupe.",
      },
      {
        speakerId: "inner-voice",
        tone: "tactical",
        text: "Three openings. The next sentence is the answer to a question she has been holding for seven months.",
      },
    ],
    nextSceneId: "the-choice",
  },

  {
    id: "the-choice",
    backgroundId: "apartment",
    mood: "tense",
    presentCharacterIds: ["yasmin"],
    dialog: [],
    choices: [
      {
        id: "cleanest-yes",
        text: "Yes. I will be the one. I will not perform readiness for it. I will be ready. I will not bring it up again unless you do. If the surgery goes the way the surgeon has said it will go, this will be a conversation we will be glad we had.",
        tactic:
          "The cleanest yes. Receive the question with the same not-doing as La Bonne Soupe. Name that you will not perform readiness. Name that you will not bring it up. The yes is the answer she has been holding the question for.",
        isOptimal: true,
        event: "optimal-with-grace",
        nextSceneId: "path-a-the-cleanest-yes",
      },
      {
        id: "it-will-be-fine",
        text: "Yasmin. The surgery is going to go well. The surgeon is the best in London. Let us not talk about the other version.",
        tactic:
          "Deflection under hope. Well-meant. The deflection is also the refusal to receive the ask Yasmin built across seven months to be able to make. The hopefulness is the cover. The refusal is the structure.",
        feedback:
          "Hope is not a substitute for receiving. The ask was not for the hopeful answer.",
        nextSceneId: "path-b-the-it-will-be-fine",
      },
      {
        id: "the-better-person",
        text: "Yasmin, I am honoured that you would ask, but I think Reza is the right person. He is your husband. He should have this. I will support whatever you both decide.",
        tactic:
          "Redirect to Reza. Yasmin explicitly named Reza as too close. The redirect ignores the specificity of her ask. The honour-framing is a polite cover for declining the ask without declining the relationship.",
        event: "failure-rejected",
        nextSceneId: "path-c-the-better-person",
      },
    ],
  },

  {
    id: "path-a-the-cleanest-yes",
    backgroundId: "apartment",
    mood: "peaceful",
    presentCharacterIds: ["yasmin"],
    dialog: [
      {
        speakerId: null,
        text: "You say the four sentences. You do not look at her on the third one. You look at the green of Little Venice through the window. She drinks the last sip of her coffee. She is quiet for a long beat.",
      },
      {
        speakerId: "yasmin",
        emotion: "knowing",
        text: "Thank you. That was the answer I was holding the question for. I will not bring this up again. If the surgery goes the way the surgeon has said, we will be glad we had it. If it does not, the conversation is in the room and it will not need to be had again.",
      },
      {
        speakerId: "yasmin",
        emotion: "knowing",
        text: "We will eat the rest of the week ordinary. I have a list of small things I have been wanting to do, which Reza did not have the strength to do across the chemotherapy and which Layla will not get to do because she will be at the hospital. Tomorrow we will go to the Wallace Collection. Friday we will go to the bookshop in Marylebone that has the section on architecture. Both are small things. Both are the right things.",
      },
      {
        speakerId: "inner-voice",
        tone: "tactical",
        text: "She has named the rest of the week. The rest of the week will be ordinary. The conversation is now in the room and the room is the room. The lentils are finished. The bowl is in the sink. The afternoon sun has moved across the table by twenty minutes.",
      },
      {
        speakerId: null,
        text: "You go to the Wallace Collection Thursday. You spend forty minutes in the room with the Frans Hals laughing cavalier and the Boucher pastoral. Yasmin teaches you what she taught her undergraduates about Hals's brushwork for seven minutes at the bench facing the painting. The bench is yours and hers and no one else is in the room.",
      },
      {
        speakerId: null,
        text: "You go to the bookshop in Marylebone Friday. She buys two books. She gives you one of them on the walk back. It is a Penguin paperback of a Borges essay collection. She has marked one page in pencil. You do not read the page until the night of the surgery.",
      },
      {
        speakerId: "inner-voice",
        tone: "tactical",
        text: "Saturday Reza arrives. Sunday Layla arrives. Sunday evening you have dinner with the four of them. The dinner is the dinner. The conversation does not return to Wednesday. The conversation is in the room without needing to be.",
      },
    ],
    nextSceneId: "ending-the-cleanest-yes",
  },

  {
    id: "path-b-the-it-will-be-fine",
    backgroundId: "apartment",
    mood: "professional",
    presentCharacterIds: ["yasmin"],
    dialog: [
      {
        speakerId: "yasmin",
        emotion: "neutral",
        text: "Okay. We will not talk about the other version.",
      },
      {
        speakerId: null,
        text: "She does not push back. She finishes her coffee. She stands. She moves to the sink and washes the bowl that her lentils were in. She does it slowly, because she is in week three of the chemotherapy cycle and her hands have not fully recovered from the second round.",
      },
      {
        speakerId: "inner-voice",
        tone: "tactical",
        text: "She did not push back. The push-back would have cost her energy she does not have to spend on the conversation that has now ended in a different shape than the shape she had built.",
        event: "tactic-named:hope-as-deflection",
      },
      {
        speakerId: null,
        text: "Wednesday afternoon is quiet. Thursday you go to the Wallace Collection. She teaches you the Hals brushwork. Friday you go to the bookshop in Marylebone. She does not buy you a book.",
      },
      {
        speakerId: "inner-voice",
        tone: "tactical",
        text: "She has not stopped being herself. She has stopped being the version of herself who would have given you the Borges paperback on the walk back. The version of herself she became Wednesday afternoon is the version of herself the deflection produced. The version is the version. It is not the version she had been preparing across the seven months.",
      },
    ],
    nextSceneId: "ending-the-it-will-be-fine",
  },

  {
    id: "path-c-the-better-person",
    backgroundId: "apartment",
    mood: "cold",
    presentCharacterIds: ["yasmin"],
    dialog: [
      {
        speakerId: "yasmin",
        emotion: "serious",
        text: "I named Reza as too close. I named Layla as family by blood. I named Noor as needing to be a daughter. The naming was not decorative. The naming was the picture of why the ask is for you. If your answer is that Reza is the right person, you have heard the naming and decided otherwise.",
      },
      {
        speakerId: "yasmin",
        emotion: "serious",
        text: "I will not press. I will ask Layla. Layla will say yes because Layla will say yes to anything I ask. The choice will be the wrong choice for the day. I will be too tired to fix it. The day will go the way it goes.",
      },
      {
        speakerId: "yasmin",
        emotion: "serious",
        text: "I do not want you to apologise. I want you to know what you have just done. I am asking that you sit with what you have just done for the next forty-eight hours. That is the request that replaces the original request.",
      },
      {
        speakerId: "inner-voice",
        tone: "tactical",
        text: "She has named the cost of the redirect with the precision of someone who has thought about this for seven months. She has not asked you to recover. She has asked you to sit with it. The sitting is the work the original ask was for.",
        event: "tactic-named:redirect-against-specificity",
      },
      {
        speakerId: null,
        text: "Wednesday afternoon is quiet. Thursday you go to the Wallace Collection. She teaches you about Hals's brushwork. The teaching is the teaching she would have given. The teaching is also slightly more about Hals than about you, in a way it would not have been Wednesday morning.",
      },
    ],
    nextSceneId: "ending-the-better-person",
  },

  {
    id: "ending-the-cleanest-yes",
    backgroundId: "apartment",
    mood: "peaceful",
    isEnding: true,
    outcomeType: "good",
    endingTitle: "The Cleanest Yes",
    endingSummary:
      "Four sentences at the small table by the window. Wednesday afternoon at Maida Vale. The Wallace Collection on Thursday. The Marylebone bookshop on Friday and the Borges paperback with one page marked in pencil. The conversation in the room without needing to be returned to. The discipline is the chair you sat in. The chair held.",
    endingLearnPrompt:
      "The cleanest yes is the answer to a question the asker has been holding. Receive it without performing readiness for the version of events you both hope will not happen. The next time someone asks you to be the steady person for the worst outcome, ask whether your yes is to the question or to your own discomfort.",
    dialog: [
      {
        speakerId: null,
        text: "Monday February 9, 5:42 am London. You wait at the flat with Reza and Layla. Noor arrives at 6:08 from Brooklyn on the overnight. The four of you take the cab to the Royal Marsden together.",
      },
      {
        speakerId: "inner-voice",
        tone: "tactical",
        text: "The Borges page Yasmin marked is page 47. The sentence is: 'It is the imminence of a revelation which does not occur.' You read the sentence in the waiting room at 9:14 am. The surgery begins at 9:21 am. d15 opens at 1:32 pm when the surgeon comes out of the operating theatre.",
      },
    ],
  },

  {
    id: "ending-the-it-will-be-fine",
    backgroundId: "apartment",
    mood: "professional",
    isEnding: true,
    outcomeType: "neutral",
    endingTitle: "The Other Version",
    endingSummary:
      "You deflected under hope. Yasmin did not push back. The Wednesday afternoon was quiet. The Wallace Collection was the Wallace Collection. The bookshop was the bookshop. The Borges paperback stayed on the shelf. The version of Yasmin you spent the week with was the version the deflection produced. The conversation she had been preparing for seven months will not have its room until and unless the worst outcome arrives, in which case it will be too late to have it.",
    endingLearnPrompt:
      "Hope is not a substitute for receiving. The next time someone places a question that has been built over months, ask whether the answer you reach for is the answer to the question or the answer that lets you avoid the question.",
    failureBlogSlug: "the-hope-deflection",
    failureBlogTitle: "Why telling someone the surgery will go well is the refusal of the ask they built across seven months",
    dialog: [
      {
        speakerId: null,
        text: "Monday February 9. The four of you go to the Royal Marsden. The morning is the morning. The Borges paperback is still on the shelf at Maida Vale. d15 opens at 1:32 pm.",
      },
    ],
  },

  {
    id: "ending-the-better-person",
    backgroundId: "apartment",
    mood: "cold",
    isEnding: true,
    outcomeType: "bad",
    endingTitle: "The Redirect",
    endingSummary:
      "You redirected to Reza, the person Yasmin explicitly named as too close. The honour-framing was the cover. The decline was the structure. Yasmin asked Layla. Layla said yes. The choice is the wrong choice for the day. Yasmin asked you to sit with the redirect for forty-eight hours. The sitting is the work the original ask was for. The week's remaining days were the days that arrived.",
    endingLearnPrompt:
      "The honour-framing is a polite cover for declining the ask without declining the relationship. The next time you reach to redirect a specifically-placed ask, ask whether the redirect honours the specificity of the placement or ignores it.",
    failureBlogSlug: "the-honour-framing-redirect",
    failureBlogTitle: "Why honouring an ask by redirecting it is declining it under polite cover",
    dialog: [
      {
        speakerId: null,
        text: "Monday February 9. The four of you go to the Royal Marsden. The morning is the morning. Yasmin does not look at you on the way to the cab. She looks at Noor. d15 opens at 1:32 pm.",
      },
    ],
  },
];

const datingMission14: Scenario = {
  id: "d14-the-marsden-week",
  title: "The Royal Marsden Week",
  tagline:
    "Maida Vale, Wednesday lunch. The question Yasmin has been holding since July 5. The yes that is yours.",
  description:
    "February 2 to February 8. Seven days at Yasmin's flat in Maida Vale before the surgery on the 9th. On Wednesday afternoon she asks the question she has been waiting since July 5 to ask: if the surgery does not go as planned, would you be the one to carry her from the crematorium. The discipline is to receive the question with the same not-doing as La Bonne Soupe, answer it cleanly, and not perform readiness for something that may not happen.",
  tier: "vip",
  track: "male-dating",
  level: 14,
  order: 1,
  estimatedMinutes: 12,
  difficulty: "advanced",
  category: "dating",
  xpReward: 520,
  badgeId: "the-ashes-yes",
  startSceneId: "cold-open",
  prerequisites: ["d13-november-call"],
  isNew: true,
  tacticsLearned: [
    "Receiving the question built across seven months without performing readiness",
    "Answering the specifically-placed ask without redirecting to the person named as too close",
    "Naming that you will not bring up the conversation unless the asker does",
    "Letting the rest of the week be ordinary because the conversation is in the room",
  ],
  redFlagsTaught: [
    "Deflection under hope as the refusal disguised as optimism",
    "Redirecting to the person the asker named as too close",
    "Honouring an ask by declining it under polite cover",
    "Treating a specifically-placed worst-outcome question as a hypothetical",
  ],
  reward: {
    id: "the-ashes-yes",
    name: "The Cleanest Yes",
    description:
      "Four sentences at the small table by the window. The Wallace Collection on Thursday. The Borges paperback with page 47 marked in pencil. The chair held.",
  },
  characters: [YASMIN, NOOR, INNER_VOICE_M],
  scenes,
};

export default datingMission14;
