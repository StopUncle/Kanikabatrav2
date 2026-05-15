/**
 * Dating Line. Mission 6 "The First Real Fight"
 *
 * A year and three months after d1 (the rooftop bar, Liv's coaster).
 * Eleven months with Noor. Six weeks since the ring box appeared on
 * the counter in d5. The box is still there. Not the subject of this
 * scenario. On the counter the way the radio is on in the background
 * of a Hemingway short story.
 *
 * Last night Noor said she wants to spend Christmas with her mother
 * in Karachi. The protagonist said "I thought we were going to my
 * sister's wedding." Nine words. The conversation did not continue.
 *
 * This scenario is about whether the protagonist can do conflict
 * without drama, the thing he has never done with a woman, because
 * the woman who trained his nervous system for two years (Liv) made
 * every conflict a thermonuclear event. Noor is not Liv. The
 * discipline is to notice that, and to not run the Liv playbook on
 * a woman who is not running the Liv playbook back.
 *
 * Handoff out: Noor's phone, 11:47 am, a Sunday call from her boss.
 * Sets up d7.
 *
 * Voice register: male-track narrator. Clipped, body-focused. No
 * old-money softeners. Pilot reference: `reference/d6-pilot.md`.
 */

import type { Scenario, Scene } from "../../types";
import { NOOR, INNER_VOICE_M } from "../../characters-male";

const scenes: Scene[] = [
  // -------------------------------------------------------------------
  // Scene 1, cold open at 6:14 am
  // -------------------------------------------------------------------
  {
    id: "cold-open",
    backgroundId: "apartment",
    mood: "cold",
    dialog: [
      {
        speakerId: null,
        text: "Sunday. 6:14 am. The flat. You have been awake for forty-three minutes. The window is open three inches. A Citi Bike rack at the corner is empty. You can hear the Hudson ferry's first horn.",
      },
      {
        speakerId: null,
        text: "On the kitchen counter, where you put it six weeks ago: the ring box. Tiffany blue. Closed. The light catches it once a morning, around 7:30, for about forty seconds.",
      },
      {
        speakerId: null,
        text: "You have noticed this every morning since you put it there. You have not mentioned it. She has not mentioned it. It is on the counter.",
      },
      {
        speakerId: "inner-voice",
        tone: "tactical",
        text: "Last night at 11:02 pm she said she wants to spend Christmas with her mother in Karachi. You said 'I thought we were going to my sister's wedding.' Nine words.",
      },
      {
        speakerId: "inner-voice",
        tone: "tactical",
        text: "You both said good night at 11:08. You are six hours and forty-four minutes into the longest silence between the two of you since you started living together.",
      },
      {
        speakerId: "inner-voice",
        tone: "tactical",
        text: "Read the room. Your shoulders have not come down from where they went at 11:02 pm. The body is running a Liv protocol. The woman in the next room is not Liv. The body has not been told.",
        event: "tactic-named:liv-reflex",
      },
    ],
    nextSceneId: "kitchen-her",
  },

  // -------------------------------------------------------------------
  // Scene 2, kitchen
  // -------------------------------------------------------------------
  {
    id: "kitchen-her",
    backgroundId: "apartment",
    mood: "cold",
    presentCharacterIds: ["noor"],
    dialog: [
      {
        speakerId: null,
        text: "You walk into the kitchen. Noor is at the counter. The moka pot is on the small burner, not the big one, the way she always uses it.",
      },
      {
        speakerId: null,
        text: "She is in the grey crew-neck she got in Lisbon two springs ago, before she met you, when she went alone. The Aesop hand cream is uncapped next to the sink.",
      },
      {
        speakerId: "inner-voice",
        tone: "tactical",
        text: "None of these are signals. They are how she lives every Sunday morning. The fight has not made her stop being herself. That is the first piece of information available to you.",
      },
      {
        speakerId: "noor",
        emotion: "neutral",
        text: "Coffee in two minutes.",
      },
      {
        speakerId: null,
        text: "She does not look up. She is grinding a second batch because she has not yet decided how many cups this morning needs.",
      },
      {
        speakerId: "inner-voice",
        tone: "tactical",
        text: "She named when the coffee is ready and she did not name the fight. She did not ice you. She did not perform warmth. She is treating this morning the way she treats every morning.",
      },
      {
        speakerId: "inner-voice",
        tone: "tactical",
        text: "You sit at the island. The ring box is in your peripheral vision to your left. You do not look at it. It does not help to look at it.",
      },
      {
        speakerId: "inner-voice",
        tone: "tactical",
        text: "Almost texted Cole at 6:31. Did not. He would have told you to lead with the apology. He is not wrong, exactly, but Cole's marriage ended because his ex-wife taught him that conflict was a fire to put out fast.",
      },
      {
        speakerId: "inner-voice",
        tone: "tactical",
        text: "You are not putting out a fire this morning. You are doing the harder thing.",
      },
    ],
    nextSceneId: "the-opening",
  },

  // -------------------------------------------------------------------
  // Scene 3, the opening choice
  // -------------------------------------------------------------------
  {
    id: "the-opening",
    backgroundId: "apartment",
    mood: "tense",
    presentCharacterIds: ["noor"],
    dialog: [
      {
        speakerId: "noor",
        emotion: "neutral",
        text: "Here.",
      },
      {
        speakerId: null,
        text: "She sets the cup down, slides it across. She does not sit. She stands across from you with her own cup. She is going to wait for you to start.",
      },
      {
        speakerId: "inner-voice",
        tone: "tactical",
        text: "The person who said the nine words last night is the person who has to open this morning. Three openings. Pick.",
      },
    ],
    choices: [
      {
        id: "name-the-gap",
        text: "I want to say what I meant last night, then I want to ask what you heard. I made an assumption about Christmas. Tell me what you heard.",
        tactic:
          "The naming. You distinguish what you said from what she heard. You do not apologise for the hearing yet. You ask what it was. The repair starts after the diagnosis.",
        isOptimal: true,
        event: "optimal-with-grace",
        nextSceneId: "path-a-naming",
      },
      {
        id: "broad-apology",
        text: "I am really sorry about last night. I should not have said what I said. I want you to know that whatever you want for Christmas is what we will do.",
        tactic:
          "The over-apology. You are about to apologise for the hearing without diagnosing the assumption that produced the saying. Calibrated for the immediate room, not for the next one.",
        feedback:
          "The muscle you do not build today gets tested in eight weeks and you will be back at this counter with no new equipment.",
        nextSceneId: "path-b-over-apology",
      },
      {
        id: "defend-assumption",
        text: "I think it is fair that I assumed you would come to my sister's. I told you about it three months ago. I am not sure why that was a thing last night.",
        tactic:
          "The Liv reflex. The body is running the protocol it learned in the two years with the cluster-B partner. Defend the position, reframe the disagreement as a miscommunication on her side. You are not in that relationship anymore.",
        nextSceneId: "path-c-liv-reflex",
      },
    ],
  },

  // -------------------------------------------------------------------
  // Path A, the naming
  // -------------------------------------------------------------------
  {
    id: "path-a-naming",
    backgroundId: "apartment",
    mood: "cold",
    presentCharacterIds: ["noor"],
    dialog: [
      {
        speakerId: null,
        text: "She takes the question. She drinks half her cup before she answers. You wait. The kitchen is quiet enough that you can hear the moka pot ticking on the burner.",
      },
      {
        speakerId: "noor",
        emotion: "serious",
        text: "What I heard. You said 'I thought we were going to my sister's' the way someone says it when the plan has already been decided and somebody is breaking it.",
      },
      {
        speakerId: "noor",
        emotion: "serious",
        text: "The way you said it made me feel like the version of Christmas where I am with my mother is the version that breaks something. I am the one breaking it. That is what I heard.",
      },
      {
        speakerId: null,
        text: "She is still standing. She is not raising her voice. She is naming what she heard the way she names what recipe she is making this week.",
      },
      {
        speakerId: "inner-voice",
        tone: "tactical",
        text: "She gave you the data. The trained move is to take the data without arguing with it. She is not telling you what you said. She is telling you what she heard. Both are true. They are not the same fact.",
      },
      {
        speakerId: "inner-voice",
        text: "Okay. That is fair. The version of what I meant: I assumed December was you and me at Colorado. I did the assuming three months ago when my sister sent the save-the-date. I never checked with you.",
      },
      {
        speakerId: "inner-voice",
        text: "The sentence last night was the assumption getting touched. It came out as an accusation. It was not one. It was a defence of a plan I never told you existed.",
      },
      {
        speakerId: "noor",
        emotion: "neutral",
        text: "Thank you.",
      },
      {
        speakerId: null,
        text: "She sits. The kitchen has moved.",
      },
    ],
    choices: [
      {
        id: "the-redesign",
        text: "What if we did both. You go to Karachi the week before. You meet me in Colorado on the 23rd. I move my flight to come back the 27th. Three weeks, three places. Can we look at the calendar.",
        tactic:
          "Repair after the diagnosis. You did not apologise for the assumption. You redesigned around it. Apology is procedural in a partnership that is working.",
        isOptimal: true,
        event: "optimal-with-grace",
        nextSceneId: "ending-conflict-built",
      },
      {
        id: "verbal-only",
        text: "I am sorry I made that assumption. I will respect whatever you decide about Christmas. Tell me what you want.",
        tactic:
          "The withheld move. You diagnosed cleanly and then handed the work to her. The diagnosis was the move. The redesign is the work. You stopped one move short.",
        nextSceneId: "ending-conflict-half-built",
      },
    ],
  },

  // -------------------------------------------------------------------
  // Path B, the over-apology
  // -------------------------------------------------------------------
  {
    id: "path-b-over-apology",
    backgroundId: "apartment",
    mood: "peaceful",
    presentCharacterIds: ["noor"],
    dialog: [
      {
        speakerId: null,
        text: "You apologise. She accepts. You both move on. The coffee cools. She makes a second moka. You eat eggs at 8:14.",
      },
      {
        speakerId: null,
        text: "The Sunday goes back to being a Sunday. The ring box is still on the counter at 9:46 when you both leave for the park.",
      },
      {
        speakerId: "inner-voice",
        tone: "tactical",
        text: "The relief is real on both sides. It is also a kind of sedation. You did not build the muscle this morning.",
        event: "tactic-named:over-apology",
      },
      {
        speakerId: "inner-voice",
        tone: "tactical",
        text: "You paid for the immediate calm out of an account that will be touched again in eight weeks when the next small assumption gets named. You will be back at this counter, or one like it. You will not know more then than you know now.",
      },
    ],
    nextSceneId: "ending-conflict-soothed",
  },

  // -------------------------------------------------------------------
  // Path C, the Liv reflex
  // -------------------------------------------------------------------
  {
    id: "path-c-liv-reflex",
    backgroundId: "apartment",
    mood: "cold",
    presentCharacterIds: ["noor"],
    dialog: [
      {
        speakerId: "noor",
        emotion: "neutral",
        text: "Okay.",
      },
      {
        speakerId: null,
        text: "She does not push back. She does not name the reframe. She just says okay. That is the harder version.",
      },
      {
        speakerId: "inner-voice",
        tone: "tactical",
        text: "The woman who runs the Liv playbook back would have escalated. Noor does not. She drinks her coffee. She gets her phone. She moves to the couch.",
      },
      {
        speakerId: "inner-voice",
        tone: "tactical",
        text: "Your body just got the thing it asked for, the conflict closed without your having to feel anything. The body reads this as a win. The body is wrong.",
      },
      {
        speakerId: "inner-voice",
        tone: "tactical",
        text: "The signal you just sent across the table is that a real concern of hers will be reframed as a miscommunication. She is going to file that signal whether you want her to or not.",
      },
      {
        speakerId: null,
        text: "You go for a bike ride. Williamsburg Bridge, Domino Park, back along the water. Two hours and eleven minutes.",
      },
      {
        speakerId: null,
        text: "You come back at 11:47 am. The flat is quiet. The cup she made you at 6:14 is in the sink, rinsed. Hers is beside it. The moka pot is on the drying rack.",
      },
      {
        speakerId: null,
        text: "She is on the couch reading a paperback you have not seen before. She looks up. She does not look angry. She looks like a person who has spent two hours deciding something small about the rest of her year.",
      },
      {
        speakerId: "inner-voice",
        tone: "tactical",
        text: "The ring box is still on the counter. You have noticed it three times in the last forty seconds. It is going to be heavier to look at this Wednesday than it was yesterday.",
      },
    ],
    nextSceneId: "ending-conflict-avoided",
  },

  // -------------------------------------------------------------------
  // ENDING, GOOD
  // -------------------------------------------------------------------
  {
    id: "ending-conflict-built",
    backgroundId: "apartment",
    mood: "peaceful",
    presentCharacterIds: ["noor"],
    isEnding: true,
    outcomeType: "good",
    endingTitle: "The Naming",
    endingSummary:
      "Sunday morning, sixty-eight minutes at the counter. You distinguished what you said from what she heard. You redesigned around the assumption you had been carrying for three months. The apology was procedural, not verbal. The muscle is now built. Most men in their first secure relationship do not build this one before the second crisis.",
    endingLearnPrompt:
      "Apology is a procedural move in a healthy partnership, not a verbal performance. Audit the last conflict you closed: did you redesign around the assumption, or did you apologise for the hearing and leave the assumption in place?",
    dialog: [
      {
        speakerId: null,
        text: "You finish redesigning Christmas at 8:34 am. Karachi the week of the 15th. Colorado on the 23rd. New Year in the flat.",
      },
      {
        speakerId: "noor",
        emotion: "neutral",
        text: "Next time, ask me before the save-the-date goes on the fridge. That is the part.",
      },
      {
        speakerId: "inner-voice",
        text: "Yes. That is the part.",
      },
      {
        speakerId: null,
        text: "She comes around the island. She does not hug you. She puts her hand on your shoulder for three seconds and then she gets a second cup.",
      },
      {
        speakerId: "inner-voice",
        tone: "tactical",
        text: "Not a celebration, not a forgiveness. An acknowledgement that the thing that just happened was a thing two adults did together.",
      },
      {
        speakerId: "inner-voice",
        tone: "tactical",
        text: "The conflict is now a piece of infrastructure between you. The muscle is built.",
      },
      {
        speakerId: null,
        text: "11:47 am. Noor's phone rings on the counter beside the ring box. She walks over to look at the screen.",
      },
      {
        speakerId: "noor",
        emotion: "concerned",
        text: "Dara. Sunday. That is, okay.",
      },
      {
        speakerId: null,
        text: "She picks up. She takes the call to the coffee shop on the corner. She is gone for forty-two minutes.",
      },
      {
        speakerId: "inner-voice",
        tone: "tactical",
        text: "Dara only calls on Sundays for one of two reasons. The reason she is on the second-floor coffee shop right now is the kind of thing that will reshape the next six months of her life.",
      },
    ],
  },

  // -------------------------------------------------------------------
  // ENDING, silver
  // -------------------------------------------------------------------
  {
    id: "ending-conflict-half-built",
    backgroundId: "apartment",
    mood: "peaceful",
    presentCharacterIds: ["noor"],
    isEnding: true,
    outcomeType: "good",
    endingTitle: "The Half-Build",
    endingSummary:
      "Diagnosis clean. Repair handed to her. The work was the redesign you stopped one move short of doing. You gave her the data and you left the calendar on her side of the table. The muscle is half-built. The next assumption is the test.",
    endingLearnPrompt:
      "Diagnosing the gap is the move. Redesigning around it is the work. The diagnosis without the redesign is a kindness for your nervous system, not for hers.",
    dialog: [
      {
        speakerId: "noor",
        emotion: "neutral",
        text: "Okay. Let me think about it.",
      },
      {
        speakerId: null,
        text: "She drinks her coffee. She does not look unhappy. She also does not look like a person who is going to bring this up again unprompted.",
      },
      {
        speakerId: "inner-voice",
        tone: "tactical",
        text: "You diagnosed cleanly. You stopped one move short of the redesign. She will figure out Christmas on her own time. She did not ask to.",
      },
      {
        speakerId: null,
        text: "11:47 am. Noor's phone rings. Dara. Sunday call.",
      },
      {
        speakerId: null,
        text: "She takes it to the corner coffee shop. She is gone for forty-two minutes.",
      },
    ],
  },

  // -------------------------------------------------------------------
  // ENDING, NEUTRAL
  // -------------------------------------------------------------------
  {
    id: "ending-conflict-soothed",
    backgroundId: "apartment",
    mood: "peaceful",
    presentCharacterIds: ["noor"],
    isEnding: true,
    outcomeType: "neutral",
    endingTitle: "The Apology Worked",
    endingSummary:
      "You apologised. She accepted. The morning was saved. The muscle was not built. The next assumption is two months away and you will arrive at it with the same equipment you had this morning. The relationship is healthy. The repair muscle is not yet.",
    endingLearnPrompt:
      "Apology without diagnosis is sedation. It closes the room and leaves the pattern in place. Audit your last three apologies: did any of them name the specific assumption you were correcting?",
    failureBlogSlug: "the-over-apology",
    failureBlogTitle: "Why apologising for everything closes the room",
    dialog: [
      {
        speakerId: null,
        text: "You go to the park together at 9:46. The fight is gone from the surface. Underneath, the assumption is intact. The eight-week clock has started without you knowing.",
      },
      {
        speakerId: "inner-voice",
        tone: "tactical",
        text: "The relationship is healthy. The repair muscle is not yet. The next call from Dara is in three weeks. The muscle will be tested.",
      },
      {
        speakerId: null,
        text: "11:47 am. Noor's phone rings. Dara. She walks the call to the corner coffee shop.",
      },
    ],
  },

  // -------------------------------------------------------------------
  // ENDING, BAD
  // -------------------------------------------------------------------
  {
    id: "ending-conflict-avoided",
    backgroundId: "apartment",
    mood: "cold",
    presentCharacterIds: ["noor"],
    isEnding: true,
    outcomeType: "bad",
    endingTitle: "The Liv Reflex",
    endingSummary:
      "You defended the assumption. You went for a bike ride. You came back to a flat that has been quiet for two hours and eleven minutes. Noor did not match your protocol. She filed it. The relationship is not over. The data is now sitting between you, and the ring box has become a heavier object than it was at 6:14 am.",
    endingLearnPrompt:
      "The body runs the protocol it was trained on. Notice when the protocol does not match the partner. The first time a secure partner does not run the matching protocol back is the morning the work begins.",
    failureBlogSlug: "the-liv-reflex",
    failureBlogTitle: "When the old nervous system runs on a new partner",
    dialog: [
      {
        speakerId: "inner-voice",
        tone: "tactical",
        text: "You did the body's old protocol on a woman who did not ask for it. She did not run the matching protocol back. That is the worst kind of conflict.",
      },
      {
        speakerId: "inner-voice",
        tone: "tactical",
        text: "The kind where one person de-escalates and the other does not respond, and the room stays the same shape it was at 6:14 am, only with more data in it. She has filed the data. You do not have access to the file.",
      },
      {
        speakerId: null,
        text: "11:47 am. Noor's phone rings on the counter beside the ring box.",
      },
      {
        speakerId: "noor",
        emotion: "concerned",
        text: "Dara. Okay.",
      },
      {
        speakerId: null,
        text: "She takes the call to the corner coffee shop. She does not stop to tell you who Dara is. She is gone for forty-two minutes.",
      },
    ],
  },
];

const datingMission6: Scenario = {
  id: "d6-first-real-fight",
  title: "The First Real Fight",
  tagline: "Conflict without drama is the muscle you have never built.",
  description:
    "Eleven months with the secure one. Six weeks since the ring box appeared on the counter. Last night you said nine words you both heard. Sunday morning, the coffee is in two minutes, and the body is running a Liv protocol on a woman who is not Liv. The discipline is to notice that, and to do the harder thing instead.",
  tier: "vip",
  track: "male-dating",
  level: 6,
  order: 1,
  estimatedMinutes: 11,
  difficulty: "advanced",
  category: "dating",
  xpReward: 260,
  badgeId: "the-naming",
  startSceneId: "cold-open",
  prerequisites: ["d5-secure-one"],
  isNew: true,
  tacticsLearned: [
    "Distinguishing what was said from what was heard",
    "Procedural apology in a working partnership",
    "Redesigning around the assumption, not the conflict",
    "Noticing when the body is running an old protocol",
  ],
  redFlagsTaught: [
    "The Liv reflex: defending an assumption you never named",
    "The over-apology: closing the room without diagnosing the cause",
    "Defensive flooding: a long ride that the partner reads as withdrawal",
    "The half-build: diagnosis clean, repair handed off",
  ],
  reward: {
    id: "the-naming",
    name: "The Naming",
    description:
      "Sixty-eight minutes at the counter. What was said vs what was heard, distinguished. The repair muscle built before the second crisis.",
  },
  characters: [NOOR, INNER_VOICE_M],
  scenes,
};

export default datingMission6;
