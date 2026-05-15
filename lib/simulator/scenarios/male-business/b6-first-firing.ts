/**
 * Business Line. Mission 6 "The First Firing"
 *
 * Eight months after b5 (seed round closed). The team is forty. The
 * scenario is Cal Renner, fourth hire, senior engineer, the one who
 * signed before the lawyer made you fix the option grant. The team
 * tolerated the technical drift because Cal is well-liked. The
 * protagonist tolerated it because Cal was the first to bet on him.
 * The cost has been three months of velocity.
 *
 * This scenario is not about Cal. It is about whether the protagonist
 * can do the humane procedural thing in nineteen minutes (name the
 * decision in the first ninety seconds, give the specific reason,
 * offer the generous severance, let Cal speak, end with a handshake),
 * instead of any of the four common founder failure modes (the
 * hatchet, the blame-shift, the inflated reference, the
 * mutual-decision lie).
 *
 * Handoff out: an email from Damien Vance at 4:14 pm. "Heard about
 * Cal. Coffee?" Sets up b7.
 *
 * Voice register: male-track narrator. Clipped, imperative, no
 * old-money softeners. Pilot reference: `reference/b6-pilot.md`.
 */

import type { Scenario, Scene } from "../../types";
import { CAL, THEO, DAMIEN, INNER_VOICE_M } from "../../characters-male";

const scenes: Scene[] = [
  // -------------------------------------------------------------------
  // Scene 1, cold open
  // -------------------------------------------------------------------
  {
    id: "cold-open",
    backgroundId: "office",
    mood: "professional",
    dialog: [
      {
        speakerId: null,
        text: "Wednesday. 10:47 am. The conference room you have not used since the all-hands in March. The blinds at forty percent because the morning sun on Cal's screen will be a thing you both notice if you do not handle it now.",
      },
      {
        speakerId: null,
        text: "The folder is on the table to your left. Black. Generic. Two pages of legal, one page of severance, one page Cal will not read until he is home.",
      },
      {
        speakerId: "inner-voice",
        tone: "tactical",
        text: "Theo made you re-read it last night. You will not re-read it now. Reading it now is rehearsal. Rehearsal is for the founder you were eight months ago.",
      },
      {
        speakerId: "inner-voice",
        tone: "tactical",
        text: "The first one is the one that matters. Eight more in the next two years, probably. Do it right once. Pattern sets.",
      },
      {
        speakerId: null,
        text: "Slack muted. Calendar blocked through 1 pm. Theo cleared the meeting room beside this one in case Cal needs to sit with the news for a minute before he leaves the building. You have thought about everything. That is the job.",
      },
      {
        speakerId: "inner-voice",
        tone: "tactical",
        text: "Read the room. Do not bank the relief.",
      },
    ],
    nextSceneId: "theo-checks-in",
  },

  // -------------------------------------------------------------------
  // Scene 2, pre-meeting with Theo
  // -------------------------------------------------------------------
  {
    id: "theo-checks-in",
    backgroundId: "office",
    mood: "professional",
    presentCharacterIds: ["theo"],
    dialog: [
      {
        speakerId: "theo",
        emotion: "knowing",
        text: "Packet. Read.",
      },
      {
        speakerId: null,
        text: "You hand him the folder. He reads four lines, flips to the severance page, runs his thumb down the column.",
      },
      {
        speakerId: "theo",
        emotion: "knowing",
        text: "Twelve weeks. Outplacement covered. COBRA covered. Stock accelerated to next vest. This is the most generous severance you will write for the next five years.",
      },
      {
        speakerId: "theo",
        emotion: "knowing",
        text: "He will not know that today. He will know it in six months when he hears what the second engineer at SeriesB got.",
      },
      {
        speakerId: "inner-voice",
        tone: "tactical",
        text: "Theo is not asking you to feel good about it. He is asking you to notice that the cost decision is made. The question in the next nineteen minutes is procedural, not financial.",
      },
      {
        speakerId: "theo",
        emotion: "knowing",
        text: "One thing. Do not name his wife. Do not name his kid. He will name them. You will hear them. Do not name them first.",
      },
      {
        speakerId: "theo",
        emotion: "knowing",
        text: "It is not your move to acknowledge that you have been thinking about them. You have been. He does not need to know.",
      },
      {
        speakerId: null,
        text: "He hands the folder back. He goes to his desk. You hear him start typing.",
      },
    ],
    nextSceneId: "cal-walks-in",
  },

  // -------------------------------------------------------------------
  // Scene 3, Cal arrives
  // -------------------------------------------------------------------
  {
    id: "cal-walks-in",
    backgroundId: "office",
    mood: "tense",
    presentCharacterIds: ["cal"],
    dialog: [
      {
        speakerId: null,
        text: "11:00 am exactly. Cal is on time. He is on time the way someone is on time when they have known for ten minutes that they should not be early or late for this specific meeting.",
      },
      {
        speakerId: null,
        text: "He sits. Black North Face fleece. The same Allbirds he has worn to the office every Wednesday for eight months.",
      },
      {
        speakerId: "inner-voice",
        tone: "tactical",
        text: "Forty-one. Likable. The kind of engineer who shows up to the offsite and tells you a true thing about himself across a beer because he trusts the room. He is not wrong to trust the room.",
      },
      {
        speakerId: "inner-voice",
        tone: "tactical",
        text: "Do not pretend otherwise to yourself in the next nineteen minutes.",
      },
      {
        speakerId: "cal",
        emotion: "neutral",
        text: "Hey. What's up.",
      },
      {
        speakerId: null,
        text: "His voice is calibrated. Not chirpy. Not flat. Forty-one years old, on time, in a fleece, has done this from the other side of the table maybe twice in his career.",
      },
    ],
    nextSceneId: "the-naming",
  },

  // -------------------------------------------------------------------
  // Scene 4, the opening choice
  // -------------------------------------------------------------------
  {
    id: "the-naming",
    backgroundId: "office",
    mood: "tense",
    presentCharacterIds: ["cal"],
    dialog: [
      {
        speakerId: "inner-voice",
        tone: "tactical",
        text: "Three openings. The next sentence sets the pattern for the next nineteen minutes. There is no fourth opening.",
      },
    ],
    choices: [
      {
        id: "clean-cut",
        text: "Cal. I am ending your role at the company today. I want to give you the reason, the package, and the next steps, in that order. Then you can take the room.",
        tactic:
          "Clean cut. The naming in the first ninety seconds is the only humane move. Everything else is a kindness for you, not for him.",
        isOptimal: true,
        event: "optimal-with-grace",
        nextSceneId: "path-a-clean-cut",
      },
      {
        id: "soft-landing",
        text: "Cal, there is something we need to talk about. The team has been having some conversations about fit, and I think it is time we talk about whether this is still the right role for you.",
        tactic:
          "The mutual-decision lie. You are about to invite him into a discussion whose outcome is not in his hands. The courtesy is for your discomfort, not his.",
        feedback:
          "He will believe there is a conversation to be had. He will respond to it as a conversation. You will eventually have to clarify that it was not one. You will have done the firing twice.",
        nextSceneId: "path-b-soft-landing",
      },
      {
        id: "hatchet",
        text: "Cal. After careful consideration, we have made the difficult decision to eliminate your role due to the evolving technical needs of the business. Your last day will be Friday.",
        tactic:
          "The hatchet. Scripted, brittle, formally complete in eight minutes. Cal will leave the building without having been seen.",
        nextSceneId: "path-c-hatchet",
      },
    ],
  },

  // -------------------------------------------------------------------
  // Path A, the clean cut
  // -------------------------------------------------------------------
  {
    id: "path-a-clean-cut",
    backgroundId: "office",
    mood: "cold",
    presentCharacterIds: ["cal"],
    dialog: [
      {
        speakerId: null,
        text: "You name it. You do not flinch on the word ending. You do not soften it to transition or parting. The word does the work the sentence needs.",
      },
      {
        speakerId: "inner-voice",
        tone: "tactical",
        text: "You give the reason. You do not give a long reason. You give the specific one.",
      },
      {
        speakerId: "inner-voice",
        text: "The stack has gone to Go. You did not pick up Go. The three engineers under you ship four times what you do in half the time.",
      },
      {
        speakerId: "inner-voice",
        text: "We tolerated that for nine months because you are the first hire and because I am still learning how to do this. That tolerance was a mistake on my end. It cost you the chance to learn that this was coming sooner.",
      },
      {
        speakerId: "inner-voice",
        tone: "tactical",
        text: "Notice what you did not do. You did not lie. You did not say the team voted. You did not say the board pushed for this. You did not say you wished you had a different outcome. The decision is yours.",
      },
      {
        speakerId: "inner-voice",
        text: "Twelve weeks severance. Outplacement covered. COBRA covered. Stock accelerated to next vest. Packet in front of you. Final day Friday.",
      },
      {
        speakerId: null,
        text: "You stop. You let the room be quiet.",
      },
    ],
    nextSceneId: "path-a-cal-speaks",
  },

  // -------------------------------------------------------------------
  // Path A continuation, Cal pushes back, you let him
  // -------------------------------------------------------------------
  {
    id: "path-a-cal-speaks",
    backgroundId: "office",
    mood: "cold",
    presentCharacterIds: ["cal"],
    dialog: [
      {
        speakerId: "cal",
        emotion: "serious",
        text: "The Go thing is not fair. I asked to be on the migration team in May. Hale said no.",
      },
      {
        speakerId: "inner-voice",
        tone: "tactical",
        text: "He is right. He is also not wrong about the firing being the right call. Both can be true. The trained move is to hold both. Do not concede the firing because the justification has a hole.",
      },
      {
        speakerId: "inner-voice",
        text: "You did ask. I should have overridden Hale. I did not. The Go gap got bigger because of that decision and I am the person who made it.",
      },
      {
        speakerId: "inner-voice",
        text: "The firing is still the right call today, even with the May mistake on my side. I am telling you because I owe you that piece of the picture. I am not telling you because it changes today.",
      },
      {
        speakerId: "cal",
        emotion: "serious",
        text: "Okay.",
      },
      {
        speakerId: null,
        text: "He is quiet for a long beat. He looks at the folder. He does not open it. He pulls it toward him.",
      },
      {
        speakerId: "cal",
        emotion: "serious",
        text: "My daughter starts first grade in September. I will need COBRA past the standard window. I am going to read this and then I will email you what I need.",
      },
      {
        speakerId: "inner-voice",
        tone: "tactical",
        text: "He named his daughter. You did not name her. Theo was right. Cal has done two passes around this already.",
      },
      {
        speakerId: "inner-voice",
        text: "Email Theo. Cc me. We will say yes to whatever you ask inside the legal envelope. You do not need to negotiate. Ask.",
      },
      {
        speakerId: null,
        text: "He nods. He picks up the folder. He stands.",
      },
    ],
    choices: [
      {
        id: "offer-reference",
        text: "Before you go. When you start interviewing, name me. I will pick up. I will say the true version. I will not name the gap to anyone who does not ask. I will name it to anyone who does.",
        tactic:
          "The honest reference. The most generous thing you can offer someone you have fired is a reference you can defend in writing.",
        isOptimal: true,
        event: "optimal-with-grace",
        nextSceneId: "ending-clean-cut",
      },
      {
        id: "no-reference",
        text: "(say nothing about the reference; let him leave with the packet)",
        tactic:
          "The withheld move. Procedurally clean, leaves Cal to figure out the reference question alone next month. The procedural minimum is not the same as the humane move.",
        nextSceneId: "ending-clean-cut-cold",
      },
    ],
  },

  // -------------------------------------------------------------------
  // Path B, the soft landing
  // -------------------------------------------------------------------
  {
    id: "path-b-soft-landing",
    backgroundId: "office",
    mood: "professional",
    presentCharacterIds: ["cal"],
    dialog: [
      {
        speakerId: null,
        text: "You frame it as a conversation. He responds like it is one. He starts naming things he could change. The Go course he has been meaning to take. The pairing time he could ask for. The ramp-up he never got.",
      },
      {
        speakerId: "cal",
        emotion: "hopeful",
        text: "I think the issue is that I never got the kind of ramp you gave the Series A hires. If I had the same six weeks of pairing, I think the Go thing would not be an issue right now.",
      },
      {
        speakerId: "inner-voice",
        tone: "tactical",
        text: "He is doing what you asked him to do. You opened a conversation. He is in the conversation. The decision is already made. The conversation is the lie.",
        event: "tactic-named:mutual-decision-lie",
      },
      {
        speakerId: null,
        text: "You let it run for nine more minutes because nine more minutes is what your nervous system can negotiate before it asks for the next out. By minute eleven you say it.",
      },
      {
        speakerId: "inner-voice",
        text: "Cal. I should have led with this. We are ending the role today. I was trying to find a way to tell you that did not feel... I am sorry. We are ending it today.",
      },
      {
        speakerId: "cal",
        emotion: "confused",
        text: "Wait, what?",
      },
      {
        speakerId: "inner-voice",
        tone: "tactical",
        text: "You will spend the next seven minutes walking Cal back from the place you invited him to. The damage is done. He will leave believing two things: that you are dishonest in formal conversations, and that you will repeat this behavior at the next firing.",
      },
    ],
    nextSceneId: "ending-soft-landing",
  },

  // -------------------------------------------------------------------
  // Path C, the hatchet
  // -------------------------------------------------------------------
  {
    id: "path-c-hatchet",
    backgroundId: "office",
    mood: "cold",
    presentCharacterIds: ["cal"],
    dialog: [
      {
        speakerId: "cal",
        emotion: "serious",
        text: "Can I ask what the specific reason is?",
      },
      {
        speakerId: "inner-voice",
        text: "The decision reflects the evolving technical needs of the business.",
      },
      {
        speakerId: "cal",
        emotion: "angry",
        text: "I asked what the specific reason is. I have been here twenty-six months. I am asking. Can I have a specific reason.",
      },
      {
        speakerId: "inner-voice",
        tone: "tactical",
        text: "He is asking the question you would ask. He is asking it in the room you put him in. You either give the reason now or you spend the next five years being the founder who fired Cal Renner without telling him why.",
        event: "tactic-named:hatchet",
      },
    ],
    choices: [
      {
        id: "give-reason-now",
        text: "Cal. I owe you the specific reason. The stack went to Go. You did not pick it up. Three engineers under you ship four times what you do in half the time. I should have led with that. I did not. I am leading with it now.",
        tactic:
          "Recovery from script. Once the specific reason is asked for, the only humane move is to provide it.",
        event: "restraint-shown",
        nextSceneId: "ending-clean-cut-cold",
      },
      {
        id: "stay-on-script",
        text: "Cal, I am not going to be able to go into more detail than what is in the packet. Your last day is Friday.",
        tactic:
          "The full hatchet. The script protects the lawyer, not the man. Cal will tell the story of this meeting for ten years.",
        nextSceneId: "ending-hatchet",
      },
    ],
  },

  // -------------------------------------------------------------------
  // ENDING, GOOD
  // -------------------------------------------------------------------
  {
    id: "ending-clean-cut",
    backgroundId: "office",
    mood: "cold",
    presentCharacterIds: ["theo"],
    isEnding: true,
    outcomeType: "good",
    endingTitle: "The Clean Cut",
    endingSummary:
      "Thirty-four minutes. The decision named in the first ninety seconds. The specific reason given. The package generous, the reference honest. Cal left with a story he can tell that is true. The next eight firings will be built on the pattern this one set.",
    endingLearnPrompt:
      "Procedural clarity is the kindness. Audit your next four difficult conversations: do you name the decision in the first ninety seconds, or do you spend the first nine minutes performing the discomfort the conversation already implies?",
    dialog: [
      {
        speakerId: null,
        text: "Cal leaves at 11:34 am. Thirty-four minutes. The folder is in his bag. He shakes your hand at the door, not warmly, but as the man he has decided to be in this moment.",
      },
      {
        speakerId: null,
        text: "The man who is going to read the packet on the train and email Theo from his couch by 3 pm.",
      },
      {
        speakerId: "inner-voice",
        tone: "tactical",
        text: "You did the humane procedural thing. He left without his job, with the packet, with the reference, with the truth. That is what the trained move looks like.",
      },
      {
        speakerId: "inner-voice",
        tone: "tactical",
        text: "The relief you are about to feel is real. Do not bank it. Bank only the pattern.",
      },
      {
        speakerId: "theo",
        emotion: "knowing",
        text: "Done?",
      },
      {
        speakerId: "inner-voice",
        text: "Done.",
      },
      {
        speakerId: "theo",
        emotion: "knowing",
        text: "Good. Tomorrow we will talk about Hale's May call. The thing Cal said about the migration team. That is on the list.",
      },
      {
        speakerId: null,
        text: "4:14 pm. Your inbox. From Damien Vance.",
      },
      {
        speakerId: "damien",
        emotion: "knowing",
        text: "Heard about Cal. Sorry it had to happen. Coffee Thursday? I have something I want to run by you.",
      },
      {
        speakerId: "inner-voice",
        tone: "tactical",
        text: "Damien is two levels above you and runs the power meetings. He heard at 4:14 pm, three hours after the meeting closed. That is fast. Damien does not have coffee with founders who fire engineers unless he wants something from them.",
      },
      {
        speakerId: null,
        text: "You close the email. You will reply tomorrow morning, in your own time, on your own register.",
      },
    ],
  },

  // -------------------------------------------------------------------
  // ENDING, silver (clean cut, no reference)
  // -------------------------------------------------------------------
  {
    id: "ending-clean-cut-cold",
    backgroundId: "office",
    mood: "cold",
    isEnding: true,
    outcomeType: "good",
    endingTitle: "The Clean Cut (Cold)",
    endingSummary:
      "Procedurally right. Generosity withheld. The packet was the package. The man did not get the reference. Cal will figure out the reference question on a job board next month. Most of the procedural work was correct. The last move was the one you did not make.",
    endingLearnPrompt:
      "Procedural minimum is not the same as humane. The reference offered without inflation is the cheapest gift you can give the person you just fired. Audit the last person you let leave without offering.",
    dialog: [
      {
        speakerId: null,
        text: "Cal leaves at 11:31 am. The packet under his arm. You shake hands. The handshake is brief.",
      },
      {
        speakerId: "inner-voice",
        tone: "tactical",
        text: "You did the procedure correctly. The reference question was the last move and you did not make it. Cal will figure it out by himself next month.",
      },
      {
        speakerId: "inner-voice",
        tone: "tactical",
        text: "The procedural minimum is not the same as the humane move. Note the difference. The next firing is in three months.",
      },
      {
        speakerId: null,
        text: "4:14 pm. Damien's email lands. You read it once. You do not reply tonight.",
      },
    ],
  },

  // -------------------------------------------------------------------
  // ENDING, NEUTRAL
  // -------------------------------------------------------------------
  {
    id: "ending-soft-landing",
    backgroundId: "office",
    mood: "professional",
    isEnding: true,
    outcomeType: "neutral",
    endingTitle: "The Mutual Decision Lie",
    endingSummary:
      "Seventy-eight minutes. You did the firing twice. The first version was a conversation about fit. The second version was the decision you had already made. Cal left with the packet and without the story. He will spend the next year telling people you are dishonest in formal conversations.",
    endingLearnPrompt:
      "Mutual-decision framing is the most common founder failure mode. It feels kinder. It is not. Name the next hard call in the first ninety seconds, even if your nervous system wants nine more minutes.",
    failureBlogSlug: "the-mutual-decision-lie",
    failureBlogTitle: "Why 'mutual decision' is the lie founders tell themselves",
    dialog: [
      {
        speakerId: null,
        text: "Cal leaves at 12:18 pm. Seventy-eight minutes. He has the folder. He does not have the story.",
      },
      {
        speakerId: "inner-voice",
        tone: "tactical",
        text: "He has two versions of what happened. He will reconcile them tonight and he will not reconcile them in your favour.",
      },
      {
        speakerId: "inner-voice",
        tone: "tactical",
        text: "The cost of doing it in that order is that Cal will spend the next year telling people you are dishonest in formal conversations. Some of those people are at companies you wanted to partner with.",
      },
      {
        speakerId: null,
        text: "4:14 pm. Damien's email lands. The warmth in the subject line is calibrated.",
      },
      {
        speakerId: "damien",
        emotion: "knowing",
        text: "Heard about Cal. Coffee Thursday?",
      },
      {
        speakerId: "inner-voice",
        tone: "tactical",
        text: "Damien heard because the team is talking about your eleven minutes. He is fast. The information moved through three channels in three hours.",
      },
    ],
  },

  // -------------------------------------------------------------------
  // ENDING, BAD
  // -------------------------------------------------------------------
  {
    id: "ending-hatchet",
    backgroundId: "office",
    mood: "cold",
    isEnding: true,
    outcomeType: "bad",
    endingTitle: "The Hatchet",
    endingSummary:
      "Eight minutes. The script read. The reason withheld even when asked twice. Cal left the building without having been seen, with the packet, without the story, and with a five-year project of telling the version where you fired him on a Wednesday and did not give him a reason.",
    endingLearnPrompt:
      "The script is for the lawyer. The script is not for the man. The first firing you do this way becomes the pattern the next eight are built on. Name it before the next one, not after.",
    failureBlogSlug: "the-hatchet-firing",
    failureBlogTitle: "When the script becomes the violence",
    dialog: [
      {
        speakerId: null,
        text: "Cal leaves at 11:08 am. Eight minutes. He does not shake your hand. He takes the folder. He walks to his desk.",
      },
      {
        speakerId: null,
        text: "Nineteen minutes packing two years of personal items into a Fjällräven backpack. He says goodbye to two engineers under him, briefly. He does not say goodbye to anyone else.",
      },
      {
        speakerId: "inner-voice",
        tone: "tactical",
        text: "You did the procedural minimum. You did not give the reason. You did not let him speak. The packet covers the legal exposure. Nothing covers what Cal is going to say about you for the next five years.",
      },
      {
        speakerId: "inner-voice",
        tone: "tactical",
        text: "The script is for the lawyer. The script is not for the man. You used the script on the man. Note that.",
      },
      {
        speakerId: null,
        text: "4:14 pm. Damien's email lands. The temperature on it is cold by the time you open it.",
      },
      {
        speakerId: "damien",
        emotion: "cold",
        text: "Heard about Cal. Coffee Thursday?",
      },
      {
        speakerId: "inner-voice",
        tone: "tactical",
        text: "Damien heard because Cal is actively building the story. The story arrives in industry rooms by Friday. You will need to figure out how to be in those rooms when it does.",
      },
    ],
  },
];

const businessMission6: Scenario = {
  id: "b6-first-firing",
  title: "The First Firing",
  tagline:
    "Nineteen minutes to do the humane procedural thing, or to do it wrong for five years.",
  description:
    "Eight months after the seed round, the team is forty. Cal Renner is your fourth hire and the technical drift has cost three months of velocity. Today is the Wednesday you have been deferring for ninety days. The scenario is not about Cal. It is about whether you can do this without the hatchet, the mutual-decision lie, or the inflated reference. The first one is the pattern the next eight will be built on.",
  tier: "vip",
  track: "male-business",
  level: 6,
  order: 1,
  estimatedMinutes: 12,
  difficulty: "advanced",
  category: "business",
  xpReward: 280,
  badgeId: "clean-cut",
  startSceneId: "cold-open",
  prerequisites: ["b5-predatory-term-sheet"],
  isNew: true,
  tacticsLearned: [
    "Naming the decision in the first ninety seconds",
    "Giving the specific reason, not the legal one",
    "Letting the fired employee speak without conceding the decision",
    "Offering an honest reference without inflation",
  ],
  redFlagsTaught: [
    "The hatchet: script over substance, eight minutes flat",
    "The mutual-decision lie: framing a decided outcome as a conversation",
    "The inflated reference: the founder's discomfort externalised onto the next CEO",
    "Naming the family before he does, even with kindness",
  ],
  reward: {
    id: "clean-cut",
    name: "The Clean Cut",
    description:
      "Thirty-four minutes. The decision named in the first ninety seconds. The reference offered without inflation. The first one done right.",
  },
  characters: [CAL, THEO, DAMIEN, INNER_VOICE_M],
  scenes,
};

export default businessMission6;
