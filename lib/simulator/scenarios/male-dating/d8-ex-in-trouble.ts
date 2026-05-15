/**
 * Dating Line. Mission 8 "The Ex In Trouble"
 *
 * Monday afternoon, four days after Noor's Sunday voice note. 3:14 pm.
 * Your office. Cole calls. Ember was hospitalised over the weekend.
 * Stable now. Her sister is in town. Sister called Cole because his
 * number was still in Ember's phone. Cole is calling you because you
 * are the man who left her cleanly and you are also the man building
 * something with Noor.
 *
 * The scenario teaches the ethics of a no-contact partner in actual
 * crisis. The discipline: tell Noor before you do anything else. The
 * no-contact rule was made out of trust, not silence. The rule
 * includes things that happen to the no-contact person.
 *
 * Handoff out: a text from Ember's sister on Thursday morning. d9
 * opens on the text in the variant the player's d8 choice produced.
 *
 * Pilot reference: `reference/d8-pilot.md`.
 */

import type { Scenario, Scene } from "../../types";
import { NOOR, COLE, INNER_VOICE_M } from "../../characters-male";

const scenes: Scene[] = [
  {
    id: "cold-open",
    backgroundId: "office",
    mood: "cold",
    dialog: [
      {
        speakerId: null,
        text: "Monday. 3:14 pm. Your office on the seventh floor. The window is open two inches. You have a Slack message half-typed from 3:11 you have not sent yet because you forgot what you were typing.",
      },
      {
        speakerId: null,
        text: "Your phone vibrates. Cole. He does not call at 3:14 on a Monday. He calls on Tuesdays at 7:00 pm if you are grabbing dinner. He texts everything else.",
      },
      {
        speakerId: "inner-voice",
        tone: "tactical",
        text: "He called. He chose voice. The thing he is calling about is the kind of thing he will not put in writing. Pick up.",
      },
      {
        speakerId: "inner-voice",
        text: "Hey.",
      },
      {
        speakerId: "cole",
        emotion: "serious",
        text: "You driving.",
      },
      {
        speakerId: "inner-voice",
        text: "No. I am at my desk. Door is closed. What is up.",
      },
    ],
    nextSceneId: "cole-tells-you",
  },

  {
    id: "cole-tells-you",
    backgroundId: "office",
    mood: "cold",
    presentCharacterIds: ["cole"],
    dialog: [
      {
        speakerId: "cole",
        emotion: "serious",
        text: "Heard about Ember. She is in the hospital. She is stable. Her sister is in town. Her sister called me because my number was still in her phone.",
      },
      {
        speakerId: "cole",
        emotion: "serious",
        text: "I am calling you because you are the person who left her cleanly and you are also the person who told me about Noor on Sunday. I want you to hear it from me first.",
      },
      {
        speakerId: "inner-voice",
        tone: "tactical",
        text: "He says the four sentences in the order he has rehearsed them. He does not narrate the rehearsal. The order is the rehearsal.",
      },
      {
        speakerId: "inner-voice",
        tone: "tactical",
        text: "Hospital. Stable. Sister in town. Sister called Cole. He does not need to say what it was. The word he used was hospital and the qualifier was stable and the bridge was the sister.",
      },
      {
        speakerId: "cole",
        emotion: "serious",
        text: "I am going to text you the sister's number after this call. You are going to look at it. You are going to put the phone down. We are going to talk for the next five minutes about what you are going to do.",
      },
      {
        speakerId: "cole",
        emotion: "serious",
        text: "What you are going to do is not call the sister. Three reasons. One. The no-contact rule is yours and Noor's rule, not yours and Ember's. The sister is a back channel.",
      },
      {
        speakerId: "cole",
        emotion: "serious",
        text: "Two. Ember stable in a hospital is not Ember in danger right now. She is in care. Three. You are not the right person to act here. Her sister is. She is here. You being involved adds nothing and costs everything.",
      },
      {
        speakerId: "inner-voice",
        tone: "tactical",
        text: "He has done the work. He has been the friend who knew what to say to the man at this desk at this minute on a Monday. The reasons are not the question. The question is what you do with Noor in the next three hours.",
      },
    ],
    nextSceneId: "the-pause",
  },

  {
    id: "the-pause",
    backgroundId: "office",
    mood: "tense",
    dialog: [
      {
        speakerId: null,
        text: "Cole's text arrives at 3:21. The sister's number. You look at it. You put the phone down.",
      },
      {
        speakerId: "inner-voice",
        tone: "tactical",
        text: "Three options. Pick one before you put the phone down again.",
      },
    ],
    choices: [
      {
        id: "tell-noor",
        text: "Hang up with Cole. Text Noor: When you are out of your 4 pm, I need to tell you something. Not urgent tonight. Not bad about us. Tonight or tomorrow?",
        tactic:
          "Tell Noor. She is the person you built the no-contact rule with. The rule includes things that happen to the no-contact person. Give her the information without authoring her reaction.",
        isOptimal: true,
        event: "optimal-with-grace",
        nextSceneId: "path-a-tell-noor",
      },
      {
        id: "do-nothing",
        text: "Do nothing. Honor the no-contact rule literally. Do not contact Ember. Do not contact the sister. Do not tell Noor because there is nothing for her to act on.",
        tactic:
          "The literal interpretation. The rule was about Ember. It was not about Ember's life. You are deciding for Noor that this is not information she needs.",
        feedback:
          "The omission becomes the foothold when something changes in three days, or three months.",
        nextSceneId: "path-b-do-nothing",
      },
      {
        id: "reach-out",
        text: "Text the sister: This is the man who used to date Ember. I am sorry to hear. Let me know if anything is needed.",
        tactic:
          "The channel opened. You have just told Cole's three reasons you did not hear them. You have opened a back channel through her sister.",
        event: "failure-rejected",
        nextSceneId: "path-c-reach-out",
      },
    ],
  },

  {
    id: "path-a-tell-noor",
    backgroundId: "apartment",
    mood: "peaceful",
    presentCharacterIds: ["noor"],
    dialog: [
      {
        speakerId: null,
        text: "You hang up with Cole. You text Noor. Five sentences. You include the framing because the framing is the point.",
      },
      {
        speakerId: "noor",
        emotion: "neutral",
        text: "Tonight. Home by 6:15.",
      },
      {
        speakerId: null,
        text: "She gets home at 6:18. She sits on the couch. She does not take off her shoes. She is signalling that the conversation goes first.",
      },
      {
        speakerId: "noor",
        emotion: "neutral",
        text: "Tell me.",
      },
      {
        speakerId: null,
        text: "You tell her. The four facts Cole gave you. The three reasons Cole gave you. The fact that he texted the number to you and you have not looked at it. The fact that you wanted her to know before you decided anything.",
      },
      {
        speakerId: "noor",
        emotion: "neutral",
        text: "Okay. Did you want to do something.",
      },
      {
        speakerId: "inner-voice",
        tone: "tactical",
        text: "She is asking the right question. The right answer is the honest one. You did want to do something. You also did not act on it. Both can be true. The discipline is to name both.",
      },
      {
        speakerId: "inner-voice",
        text: "I wanted to. The wanting was an old reflex. I did not act on it. Cole's three reasons were right. The reason I am telling you is not so you can stop me. It is so we know the same things. That is the rule we built.",
      },
      {
        speakerId: "noor",
        emotion: "neutral",
        text: "Thank you. I do not want you to call the sister. I also do not want you to never have heard about it. I am glad Cole called. I am glad you told me. Tell me again next time.",
      },
      {
        speakerId: null,
        text: "She takes off her shoes. The Allbirds, off the same way they were off on Sunday at 12:29. The shape of the evening returns to the shape of an evening.",
      },
    ],
    nextSceneId: "ending-the-rule-held",
  },

  {
    id: "path-b-do-nothing",
    backgroundId: "apartment",
    mood: "cold",
    presentCharacterIds: ["noor"],
    dialog: [
      {
        speakerId: null,
        text: "You hang up with Cole. You do not text the sister. You do not text Noor. You go back to the Slack message you were half-typing at 3:11. You finish it at 3:32.",
      },
      {
        speakerId: "inner-voice",
        tone: "tactical",
        text: "The literal rule is the rule. You followed it. The thing the rule was about was contact. There has been no contact.",
      },
      {
        speakerId: null,
        text: "Wednesday at 7:14 pm Noor mentions she ran into Cole's sister Maya at the gym. Maya mentioned Ember. Noor says it in the kitchen while she is making salad.",
      },
      {
        speakerId: "noor",
        emotion: "concerned",
        text: "Hey. Have you heard about Ember.",
      },
      {
        speakerId: "inner-voice",
        tone: "tactical",
        text: "You have heard. You heard at 3:14 pm Monday. You have not told her. She has just told you that she knows. The omission you held has just become a thing she is noticing.",
      },
      {
        speakerId: "inner-voice",
        tone: "tactical",
        text: "She is not asking for an explanation. She is testing whether one is coming.",
      },
      {
        speakerId: "inner-voice",
        text: "Cole told me on Monday. I should have told you Monday. I am sorry.",
      },
      {
        speakerId: "inner-voice",
        tone: "tactical",
        text: "The recovery is a recovery. It is also two days late. She will accept it. She will also remember it.",
      },
    ],
    nextSceneId: "ending-the-omission",
  },

  {
    id: "path-c-reach-out",
    backgroundId: "office",
    mood: "danger",
    dialog: [
      {
        speakerId: null,
        text: "You text the sister. Two sentences. You do not show Noor. You did not show Cole. You sent it because the sending was what your nervous system needed to do with the thing it had just heard.",
      },
      {
        speakerId: null,
        text: "The sister responds at 3:48: Thank you. She is going to be okay. We are at Mount Sinai. If you want to send flowers or anything, here is the room number. 414.",
      },
      {
        speakerId: "inner-voice",
        tone: "tactical",
        text: "The channel is now open. The sister has been gracious. She has named a place. She has named a room. She has offered you a small action you can take.",
        event: "tactic-named:back-channel",
      },
      {
        speakerId: null,
        text: "You send the flowers. You do not tell Noor about the flowers because the flowers are a small thing. You also do not tell her about the text.",
      },
      {
        speakerId: "inner-voice",
        tone: "tactical",
        text: "The two omissions are now one omission. The one omission has a flower bill on the credit card statement that arrives in fourteen days.",
      },
    ],
    nextSceneId: "ending-the-channel-open",
  },

  {
    id: "ending-the-rule-held",
    backgroundId: "apartment",
    mood: "peaceful",
    isEnding: true,
    outcomeType: "good",
    endingTitle: "The Rule Held",
    endingSummary:
      "You told Noor before you decided anything. The conversation took fourteen minutes. The no-contact rule held because the rule was made out of trust, not silence. Ember's sister handled what was hers to handle. The flat is the flat at 9:42 pm and the Allbirds are on the floor where they belong.",
    endingLearnPrompt:
      "Rules between two people are made out of trust, not silence. The literal rule and the rule are not the same thing. Audit the last rule you followed literally without checking whether you were following its trust.",
    dialog: [
      {
        speakerId: null,
        text: "Thursday morning. A text arrives from a number you do not have saved. Ember's sister.",
      },
      {
        speakerId: null,
        text: "Subject is not subject. Just text: She is being discharged this afternoon. I wanted you to know. I will not text again. Thank you for being part of why she got the year of quiet she needed.",
      },
      {
        speakerId: null,
        text: "You show Noor the text at 7:42 am over coffee. She reads it. She nods.",
      },
      {
        speakerId: "noor",
        emotion: "neutral",
        text: "Good. Save the number. Do not respond. That is the right shape of this.",
      },
    ],
  },

  {
    id: "ending-the-omission",
    backgroundId: "apartment",
    mood: "cold",
    isEnding: true,
    outcomeType: "neutral",
    endingTitle: "The Wednesday Salad",
    endingSummary:
      "You honoured the no-contact rule literally. You did not extend the rule to the partnership. Noor heard about it from Maya at the gym. She brought it up in the kitchen on Wednesday. You recovered cleanly. The recovery is two days late. She will remember the two days.",
    endingLearnPrompt:
      "The literal rule is not the same as the rule. The next time something happens to a no-contact person in your life, ask yourself: would I be okay if my partner heard about this from someone else first?",
    failureBlogSlug: "the-literal-rule-and-the-omission",
    failureBlogTitle: "Why following the no-contact rule literally is not following the rule",
    dialog: [
      {
        speakerId: null,
        text: "Thursday morning. The text from the sister arrives. You show Noor at 7:42. She reads it. She does not respond out loud. She kisses you on the forehead and goes to the bathroom.",
      },
      {
        speakerId: "inner-voice",
        tone: "tactical",
        text: "The recovery is intact. The texture has been adjusted. She is making the adjustment without naming it.",
      },
    ],
  },

  {
    id: "ending-the-channel-open",
    backgroundId: "office",
    mood: "danger",
    isEnding: true,
    outcomeType: "bad",
    endingTitle: "The Channel Open",
    endingSummary:
      "You texted the sister. The sister was gracious. You sent flowers. You did not tell Noor. The channel is now open. The credit card statement arrives in fourteen days. The omission is two omissions. The next thing that happens with Ember happens through a channel you opened, and Noor will not know it is open until something closes it for her.",
    endingLearnPrompt:
      "The back channel does not close after one message. It closes when the partner discovers it. Audit the small kindnesses you have extended to a no-contact person through a third party. Each one is a message your partner has not been allowed to read.",
    failureBlogSlug: "opening-the-back-channel",
    failureBlogTitle: "Why the small text to the sister is a channel, not a courtesy",
    dialog: [
      {
        speakerId: null,
        text: "Thursday morning. The sister texts again. Thank you for the flowers. She woke up and they were the first thing she saw. She asked who they were from. I told her. She said thank you.",
      },
      {
        speakerId: "inner-voice",
        tone: "tactical",
        text: "Ember knows. Ember thanked you. The channel is now warm. You will not tell Noor. The flowers will appear on the credit card statement in eleven days. You have a decision to make about the statement.",
      },
    ],
  },
];

const datingMission8: Scenario = {
  id: "d8-ex-in-trouble",
  title: "The Ex In Trouble",
  tagline: "The ex you left cleanly is in the hospital. The rule includes this.",
  description:
    "Monday 3:14 pm. Cole calls. Ember was hospitalised over the weekend. Stable. Her sister is in town. Cole has the sister's number and is about to text it to you. The discipline is to do nothing about it before you talk to Noor. The no-contact rule was made out of trust, not silence. The rule includes things that happen to the no-contact person.",
  tier: "vip",
  track: "male-dating",
  level: 8,
  order: 1,
  estimatedMinutes: 10,
  difficulty: "advanced",
  category: "dating",
  xpReward: 320,
  badgeId: "rule-held",
  startSceneId: "cold-open",
  prerequisites: ["d7-work-crisis"],
  isNew: true,
  tacticsLearned: [
    "Telling your partner about a no-contact event before you decide anything",
    "Naming the wanting and the not-acting as both true",
    "Distinguishing the literal rule from the rule",
    "Letting the people whose job it is do their job",
  ],
  redFlagsTaught: [
    "The back channel opened through a sibling",
    "The literal interpretation of a rule that defends the omission",
    "The rescue impulse that runs the old protocol on a new partnership",
    "The small kindness that becomes a permanent omission",
  ],
  reward: {
    id: "rule-held",
    name: "The Rule Held",
    description:
      "You told Noor before you decided anything. The conversation took fourteen minutes. The no-contact rule held because the rule was made out of trust, not silence.",
  },
  characters: [NOOR, COLE, INNER_VOICE_M],
  scenes,
};

export default datingMission8;
