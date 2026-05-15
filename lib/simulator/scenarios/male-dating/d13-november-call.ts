/**
 * Dating Line. Mission 13 "The November Phone Call"
 *
 * November 18. Six weeks after the October telling. Yasmin completed
 * her third round of chemotherapy ten days ago. She is in the
 * remission window of the cycle. She is in London. Noor is in
 * Brooklyn. The protagonist is in the apartment alone Tuesday evening,
 * 7:42 pm, when his phone rings. Yasmin's number.
 *
 * She has called him directly. Not Noor. Not the family group. The
 * specific ask: would the protagonist come to London for the surgery
 * week in February on his own, separate from Noor.
 *
 * The discipline taught: hold the call she did not feel she could
 * place anywhere else. Answer the ask honestly. Do not perform.
 *
 * Handoff out: the February surgery week. d14 opens at Heathrow.
 *
 * Pilot reference: `reference/d13-pilot.md`.
 */

import type { Scenario, Scene } from "../../types";
import { NOOR, INNER_VOICE_M } from "../../characters-male";
import type { Character } from "../../types";

const YASMIN: Character = {
  id: "yasmin",
  name: "Yasmin Rahimi",
  description:
    "Noor's mother. Same Yasmin. Three rounds of chemotherapy in. The Tuesday evening call is the call she has been preparing for nine weeks. She is in London. She called the protagonist directly because the ask is one that can only land if it does not move through Noor first.",
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
        text: "Tuesday. November 18. 7:42 pm. The apartment. Noor is at a work dinner in Williamsburg until 10:30. You are at the kitchen island with the John Berger book and the moka pot still on the small burner from earlier.",
      },
      {
        speakerId: null,
        text: "Your phone rings. Yasmin. The display says London at 7:42 pm New York which is 12:42 am London. She does not call at 12:42 am. She calls on Saturdays at 11:00 am London. She has called you twice in your entire relationship.",
      },
      {
        speakerId: "inner-voice",
        tone: "tactical",
        text: "Three rounds of chemotherapy. Ten days into the remission window of round three. February is the surgery. The call is not the surgery call. The call is the call she could not place anywhere else.",
      },
    ],
    nextSceneId: "she-opens",
  },

  {
    id: "she-opens",
    backgroundId: "apartment",
    mood: "tense",
    presentCharacterIds: ["yasmin"],
    dialog: [
      {
        speakerId: "inner-voice",
        text: "Hi.",
      },
      {
        speakerId: "yasmin",
        emotion: "knowing",
        text: "It is 12:42 in London. I have been awake for an hour. I am calling you because I want to ask you something and I want to ask you first, before Noor, because the question is for you and the question is not the kind of question I can place through her.",
      },
      {
        speakerId: "yasmin",
        emotion: "knowing",
        text: "I will be brief. You can ask me to call back tomorrow. Both are fine.",
      },
      {
        speakerId: "inner-voice",
        tone: "tactical",
        text: "She has placed the entire framing in the first thirty seconds. She is not asking permission to be on the phone. She is naming why this phone call exists and why it exists now and why it exists with you and not with Noor.",
      },
      {
        speakerId: "inner-voice",
        text: "I am here. Tell me. We have time.",
      },
    ],
    nextSceneId: "she-asks",
  },

  {
    id: "she-asks",
    backgroundId: "apartment",
    mood: "tense",
    presentCharacterIds: ["yasmin"],
    dialog: [
      {
        speakerId: "yasmin",
        emotion: "serious",
        text: "The surgery is February 9. I will be in the Royal Marsden the day before. The recovery is six days in hospital, then four weeks at home. Noor will be in London for ten days, from February 7 to February 17.",
      },
      {
        speakerId: "yasmin",
        emotion: "serious",
        text: "Noor's father will be in London the whole time. My sister Layla will be in London for the surgery week. The household will be full. Noor will not be the only one of us in the room.",
      },
      {
        speakerId: "yasmin",
        emotion: "serious",
        text: "I want to ask you to come for the surgery week. Not with Noor. On your own. The week before her. February 1 to February 8. The week where I am not yet in hospital. The week where Layla has not yet arrived. The week that has been the hardest one for me to think about because it is the week between the third round and the surgery, and I have not been able to figure out who that week is for.",
      },
      {
        speakerId: "yasmin",
        emotion: "serious",
        text: "I have decided it is for me, and I have decided I would like you in the room with me for some of it. Not all of it. Some of it. The reasons are not reasons I can articulate cleanly. They are reasons I have been holding for nine weeks. I am asking now because I would like an answer before Sunday so that I can tell Noor on Sunday with the answer in the conversation.",
      },
      {
        speakerId: "inner-voice",
        tone: "tactical",
        text: "She has done the entire ask in three paragraphs. She has named the dates. She has named the household. She has named the specific week. She has named the reason she has not been able to articulate the reasons. She has named the deadline.",
      },
      {
        speakerId: "inner-voice",
        tone: "tactical",
        text: "The framing is the same framing as La Bonne Soupe. The ask is the ask of someone who has been thinking about it for nine weeks. The answer is the same shape the answer should have been on July 5.",
      },
    ],
    nextSceneId: "the-choice",
  },

  {
    id: "the-choice",
    backgroundId: "apartment",
    mood: "tense",
    presentCharacterIds: ["yasmin"],
    dialog: [
      {
        speakerId: "inner-voice",
        tone: "tactical",
        text: "Three openings.",
      },
    ],
    choices: [
      {
        id: "clean-yes",
        text: "Yes. I will be there. I will book the flight tomorrow morning. I will tell Noor when she comes home tonight. The yes does not require her permission. The telling does.",
        tactic:
          "Clean yes. The ask was placed specifically not through Noor. The yes is yours to give. The telling Noor is the obligation, not the ask. Both are clean.",
        isOptimal: true,
        event: "optimal-with-grace",
        nextSceneId: "path-a-clean-yes",
      },
      {
        id: "conditional-yes",
        text: "I want to. Let me talk to Noor first. I will call you back tomorrow.",
        tactic:
          "Move the ask through Noor. Yasmin placed it specifically not through Noor. Routing it through Noor for permission converts the ask into a different ask. Noor will say yes. The yes will be a different yes.",
        feedback:
          "The conditional yes is yes-with-a-different-architecture. Yasmin will accept it. The architecture will sit in the surgery week.",
        nextSceneId: "path-b-conditional",
      },
      {
        id: "defer",
        text: "Yasmin, that means a lot. Let me think about the logistics. Can I get back to you Friday.",
        tactic:
          "Defer. The instinct is to perform consideration by buying time. Yasmin's deadline was Sunday. Friday is two days before. The two days are the gap she did not need to spend.",
        event: "failure-rejected",
        nextSceneId: "path-c-defer",
      },
    ],
  },

  {
    id: "path-a-clean-yes",
    backgroundId: "apartment",
    mood: "peaceful",
    presentCharacterIds: ["yasmin"],
    dialog: [
      {
        speakerId: "yasmin",
        emotion: "knowing",
        text: "Thank you. That was the answer. Tell Noor tonight when she comes home. Tell her I called you. Tell her I asked. Tell her you said yes. Do not edit the order.",
      },
      {
        speakerId: "yasmin",
        emotion: "knowing",
        text: "I will tell her Sunday. The week is February 1 to February 8. We will sort the rest after Sunday.",
      },
      {
        speakerId: "yasmin",
        emotion: "knowing",
        text: "I am going back to sleep now. The chemotherapy makes the sleeping worth more than the conversations. Good night.",
      },
      {
        speakerId: null,
        text: "She hangs up. The call took eight minutes. You sit at the island. You do not pick the book back up. You sit with the call for the rest of the hour Noor is not home.",
      },
      {
        speakerId: "inner-voice",
        tone: "tactical",
        text: "Eight minutes. The ask was placed. The yes was given. The telling Noor is yours to do at 10:38 pm tonight. The week in February is now booked in your head. The flight will be booked tomorrow because Yasmin asked it to be.",
      },
      {
        speakerId: "inner-voice",
        tone: "tactical",
        text: "Noor walks in at 10:42 pm. She takes her shoes off in the hallway the way she takes her shoes off every night. She comes into the kitchen. You tell her about the call. You do not edit the order Yasmin specified. Noor sits at the island. She drinks half your glass of water. She does not say anything for forty seconds.",
      },
      {
        speakerId: "noor",
        emotion: "serious",
        text: "Okay. My mother is the most precise person I know. I have not been precise about this for nine weeks because I have not had the picture. She did this on purpose. The yes was yours to give. Thank you for giving it to her at 7:42 pm and to me at 10:43 pm. Both timings were the right timing.",
      },
    ],
    nextSceneId: "ending-clean-yes",
  },

  {
    id: "path-b-conditional",
    backgroundId: "apartment",
    mood: "professional",
    presentCharacterIds: ["yasmin"],
    dialog: [
      {
        speakerId: "yasmin",
        emotion: "knowing",
        text: "Okay. I understand. I will wait for your call tomorrow.",
      },
      {
        speakerId: null,
        text: "She hangs up. The call took six minutes. You sit at the island. Noor comes home at 10:42. You tell her about the call. She is quiet for a long beat.",
      },
      {
        speakerId: "noor",
        emotion: "concerned",
        text: "She called you directly. She asked you specifically. You came to me anyway. I think the answer is yes. I also think she would have wanted you to say yes on the phone tonight. That was the shape of how she called.",
      },
      {
        speakerId: "inner-voice",
        tone: "tactical",
        text: "Noor read the call the same way Yasmin placed it. She has named what you did. She is not making a problem of it. She is making it visible. The yes you give tomorrow morning will be the same yes structurally and a different yes texturally.",
        event: "tactic-named:routed-through-the-partner",
      },
      {
        speakerId: null,
        text: "You call Yasmin Wednesday morning at 8:00 am London. You say yes. Yasmin accepts the yes. She does not name the architecture. She does not need to.",
      },
    ],
    nextSceneId: "ending-conditional-yes",
  },

  {
    id: "path-c-defer",
    backgroundId: "apartment",
    mood: "cold",
    presentCharacterIds: ["yasmin"],
    dialog: [
      {
        speakerId: "yasmin",
        emotion: "knowing",
        text: "Friday is okay. I would have preferred Wednesday. Friday is still before Sunday. We will sort it Sunday with whatever your answer is.",
      },
      {
        speakerId: null,
        text: "She hangs up. The call took five minutes. The deferral cost forty seconds and a small adjustment in her tone at the end.",
      },
      {
        speakerId: "inner-voice",
        tone: "tactical",
        text: "She did not say no to the deferral. She said the truth, which is that Friday is still before Sunday. The deferral was technically fine. The deferral was structurally not what the call asked for.",
        event: "tactic-named:performed-consideration",
      },
      {
        speakerId: null,
        text: "Thursday night you decide. Friday morning at 7:00 am London you call her. You say yes. She accepts the yes. The two-day gap is the data.",
      },
      {
        speakerId: "inner-voice",
        tone: "tactical",
        text: "The week in February is still the week. The yes is still the yes. The two days you spent thinking is what you spent. Yasmin will not name the two days. They are now in the room with you.",
      },
    ],
    nextSceneId: "ending-deferred",
  },

  {
    id: "ending-clean-yes",
    backgroundId: "apartment",
    mood: "peaceful",
    isEnding: true,
    outcomeType: "good",
    endingTitle: "The Clean Yes",
    endingSummary:
      "Eight minutes on the phone with Yasmin. Six hours later you told Noor in the order Yasmin specified. Noor named what her mother had done with the placement of the call. The yes was given at the timing Yasmin needed it given. The week of February 1 to 8 is now structurally in the calendar of your year.",
    endingLearnPrompt:
      "When someone you love places an ask specifically not through another person, the yes does not require the other person's permission. The telling is the obligation. The next time someone calls you with a specifically-placed ask, ask whether you are giving a yes or routing a yes.",
    dialog: [
      {
        speakerId: "yasmin",
        emotion: "knowing",
        text: "Text Sunday afternoon, 4:14 pm London: I told Noor. She is glad. She asked me to thank you for being the steady person who said yes at 7:42 pm New York and told her at 10:43 pm. That is the shape of the next twelve weeks. Yasmin.",
      },
    ],
  },

  {
    id: "ending-conditional-yes",
    backgroundId: "apartment",
    mood: "professional",
    isEnding: true,
    outcomeType: "neutral",
    endingTitle: "The Routed Yes",
    endingSummary:
      "You moved the ask through Noor. Noor named what you had done. You called Yasmin Wednesday morning. The yes is intact. The architecture is different. The week in February will go ahead. Yasmin will not name the routing. The routing is in the room with the three of you for the rest of the surgery year.",
    endingLearnPrompt:
      "Routing a specifically-placed ask through the person it was placed not-through is half of saying no. The next time someone places an ask to you specifically, recognise the specificity as part of the ask.",
    failureBlogSlug: "the-routed-yes",
    failureBlogTitle: "Why routing a specifically-placed ask through your partner is half-no",
    dialog: [
      {
        speakerId: "yasmin",
        emotion: "knowing",
        text: "Text Sunday: I told Noor. She is glad. We will see you in February. Yasmin.",
      },
    ],
  },

  {
    id: "ending-deferred",
    backgroundId: "apartment",
    mood: "cold",
    isEnding: true,
    outcomeType: "bad",
    endingTitle: "The Friday Yes",
    endingSummary:
      "You deferred. Friday morning London you called and said yes. Yasmin accepted. The two-day gap was the cost. The week in February will happen. The cost will not be named. The cost will sit in the conversation in February when you are alone with Yasmin and she does not need to remember the two days because she has been holding the rest of the year.",
    endingLearnPrompt:
      "Performed consideration is a tax. The next time someone places an ask with a clear deadline and a clear shape, ask whether the time you spend deciding is for the decision or for performing the decision.",
    failureBlogSlug: "the-friday-yes",
    failureBlogTitle: "Why deferring a clear ask by two days is the tax of performed consideration",
    dialog: [
      {
        speakerId: "yasmin",
        emotion: "neutral",
        text: "Text Sunday afternoon: I told Noor. The week is set. February 1 to 8. We will see you then. Yasmin.",
      },
    ],
  },
];

const datingMission13: Scenario = {
  id: "d13-november-call",
  title: "The November Phone Call",
  tagline:
    "Yasmin calls you at 7:42 pm directly. The ask is for the week before the surgery. The yes is yours to give.",
  description:
    "November 18. Six weeks after the October telling. Yasmin completes the third round of chemotherapy. She calls you directly, not Noor. The specific ask is that you come to London for the week before the surgery, on your own, separate from Noor. The discipline is to recognise that an ask placed specifically not through your partner is an ask you answer directly. The yes is yours to give. The telling is the obligation.",
  tier: "vip",
  track: "male-dating",
  level: 13,
  order: 1,
  estimatedMinutes: 11,
  difficulty: "advanced",
  category: "dating",
  xpReward: 480,
  badgeId: "clean-yes",
  startSceneId: "cold-open",
  prerequisites: ["d12-the-october-telling"],
  isNew: true,
  tacticsLearned: [
    "Recognising an ask placed specifically not through the partner as an ask you answer directly",
    "Distinguishing the yes from the routing of the yes",
    "Telling the partner about the ask in the order the asker specified",
    "Treating the asker's deadline as part of the structural ask",
  ],
  redFlagsTaught: [
    "Routing a specifically-placed ask through the person it was placed not-through",
    "Performed consideration as a tax that becomes a small bevel",
    "Deferring a clear ask by two days because the deferral feels respectful",
    "Treating the partner's permission as a precondition when the asker did not place it as one",
  ],
  reward: {
    id: "clean-yes",
    name: "The Clean Yes",
    description:
      "Eight minutes on the phone. Six hours later you told Noor in the order Yasmin specified. The week of February 1 to 8 is now structurally in the calendar of your year.",
  },
  characters: [YASMIN, NOOR, INNER_VOICE_M],
  scenes,
};

export default datingMission13;
