/**
 * Business Line. Mission 10 "The Series B Round"
 *
 * Three months after b9. The Renat acquisition was declined cleanly
 * and turned into a strategic partnership that closed in October. Q4
 * closed at 4.2x year-on-year. By late January three Series B funds
 * have sent indicative term sheets.
 *
 * Halberd Capital is the lead. Bridge Carter is running the round.
 * The term sheet is clean on the headline. The protective provisions
 * at page eleven contain the cage: a 51 percent class-vote threshold
 * on Liquidation Events, triggered by missing the Operating Plan that
 * Halberd will help write.
 *
 * The discipline taught: read the protective provisions clause-by-
 * clause. The headline numbers are the door. The protective provisions
 * are the cage.
 *
 * Handoff out: the closed term sheet, with a board seat appointment
 * that begins immediately. b11 opens on the first post-close board
 * meeting six weeks later.
 *
 * Pilot reference: `reference/b10-pilot.md`.
 */

import type { Scenario, Scene } from "../../types";
import { ANIKA, THEO, INNER_VOICE_M } from "../../characters-male";
import type { Character } from "../../types";

const BRIDGE: Character = {
  id: "bridge",
  name: "Bridge Carter",
  description:
    "Partner at Halberd Capital. British, low-volume, ex-Cambridge MBA, twelve years at Halberd. Less charismatic than Renat and therefore more dangerous, because the charisma is in the math. Verbal tic: opens emails with the time he is sending them.",
  traits: ["patient", "structural", "low-volume"],
  defaultEmotion: "knowing",
  gender: "male",
  personalityType: "predator-capital",
  silhouetteType: "male-lean",
};

const scenes: Scene[] = [
  {
    id: "cold-open",
    backgroundId: "office",
    mood: "professional",
    dialog: [
      {
        speakerId: null,
        text: "Tuesday. 7:42 am. The term sheet arrived Friday at 6:11 pm. Bridge Carter sent it with a one-line note: Sending this at 6:11 pm on Friday so your weekend has the data. Call Monday or this week. Whichever is right. The signature was B.",
      },
      {
        speakerId: null,
        text: "You read it Friday. You read it again Saturday morning. You read it Sunday on the train back from Connecticut. The headline numbers are clean. $42M at $180M pre. 20 percent option pool top-up. Standard weighted-average anti-dilution. Founder vesting preserved.",
      },
      {
        speakerId: "inner-voice",
        tone: "tactical",
        text: "The headline numbers are clean. The headline numbers are what every founder reads. The protective provisions are at page eleven. You have not read past page nine.",
      },
      {
        speakerId: null,
        text: "Anika scheduled a 7:30 am session with the lawyers for Tuesday morning. She has been reading.",
      },
    ],
    nextSceneId: "anika-flags-the-clause",
  },

  {
    id: "anika-flags-the-clause",
    backgroundId: "office",
    mood: "tense",
    presentCharacterIds: ["anika"],
    dialog: [
      {
        speakerId: "anika",
        emotion: "knowing",
        text: "Page eleven, clause 4.7. Protective provisions. Read it once first. Do not look at me while you read.",
      },
      {
        speakerId: null,
        text: "Section 4.7. The Company shall not, without the prior written consent of the holders of at least 51 percent of the then-outstanding Series B Preferred, taken as a separate class, effect any Liquidation Event with cumulative consideration greater than $200M, where the Company's revenue at the time of such transaction is less than 80 percent of the Company's projected revenue as set forth in the Operating Plan most recently approved by the Board.",
      },
      {
        speakerId: "anika",
        emotion: "knowing",
        text: "The 51 percent threshold is the Series B class voting on its own. We close at $42M from three funds; Halberd takes $30M, the other two split $12M. Halberd alone is the 51 percent.",
      },
      {
        speakerId: "anika",
        emotion: "knowing",
        text: "The Liquidation Event clause includes a sale we initiate. If we are at 80 percent of plan in eighteen months and we get a $250M offer, Halberd alone votes on whether we can accept it. The trigger is missing the plan we agreed to with them.",
      },
      {
        speakerId: "anika",
        emotion: "knowing",
        text: "Plan misses are not unusual. Plan misses against the plan Halberd approves are also not unusual. The clause is structured so that Halberd has unilateral veto on our optionality when we need it most. The clause is the cage. The rest of the term sheet is the door.",
      },
      {
        speakerId: "inner-voice",
        tone: "tactical",
        text: "Anika has done the work in five paragraphs. The headline numbers are the door. The protective provisions are the cage. The cage is at page eleven.",
        event: "tactic-named:protective-provisions-cage",
      },
    ],
    nextSceneId: "the-bridge-call",
  },

  {
    id: "the-bridge-call",
    backgroundId: "office",
    mood: "tense",
    presentCharacterIds: ["bridge"],
    dialog: [
      {
        speakerId: null,
        text: "10:00 am. Bridge on the phone.",
      },
      {
        speakerId: "bridge",
        emotion: "knowing",
        text: "Sent this at 10:00 am Tuesday so you have your day. I have you until 10:30. The 4.2x year-on-year is a number we like. The Q3 number was a number we liked. We are looking to close the round by mid-March.",
      },
      {
        speakerId: "bridge",
        emotion: "knowing",
        text: "Tell me where you are on the term sheet. I will tell you which clauses are mine to move and which are written by the IC.",
      },
      {
        speakerId: "inner-voice",
        tone: "tactical",
        text: "He has just told you that the partners will not move some clauses. He did not say everything is negotiable. He did not say everything is final. He said tell me where you are. He is taking facts before he takes positions.",
      },
    ],
    nextSceneId: "the-choice",
  },

  {
    id: "the-choice",
    backgroundId: "office",
    mood: "tense",
    dialog: [],
    choices: [
      {
        id: "clause-out",
        text: "Page eleven, 4.7. The Liquidation Event threshold needs to be a board-level vote, not a class vote, or the plan-miss trigger needs to be removed. Either move solves it. I will not sign the clause as drafted.",
        tactic:
          "Name the specific clause and the two specific moves. Bridge will either say yes to one, yes to both, or no to both.",
        isOptimal: true,
        event: "optimal-with-grace",
        nextSceneId: "path-a-the-clause-out",
      },
      {
        id: "the-cap",
        text: "Page eleven, 4.7. Can we increase the threshold from 51 to 60 percent. That would require Halberd plus one of the other funds to agree.",
        tactic:
          "The cap on the cage. You have moved from removing the cage to slightly enlarging it. The other two funds writing $6M each are not in a position to disagree with Halberd in the moment when the trigger fires.",
        feedback: "The threshold negotiation is the wrong negotiation.",
        nextSceneId: "path-b-the-cap",
      },
      {
        id: "accept-the-clause",
        text: "The clause looks broadly standard for Series B at our stage. I think it is workable. Where else should we be focused.",
        tactic:
          "Optimistic acceptance. You have just told Bridge that 4.7 is not the negotiation. He will be relieved. He will redirect to a different clause that has been built to be redirected to.",
        event: "failure-rejected",
        nextSceneId: "path-c-accept-the-clause",
      },
    ],
  },

  {
    id: "path-a-the-clause-out",
    backgroundId: "office",
    mood: "professional",
    presentCharacterIds: ["bridge"],
    dialog: [
      {
        speakerId: "bridge",
        emotion: "knowing",
        text: "The board-level vote is mine to move. I will move it. The plan-miss trigger is the IC's. I will not move that. The board-vote change is the one that solves it for you, because at a board level you have founder representation, two independents, and us.",
      },
      {
        speakerId: "bridge",
        emotion: "knowing",
        text: "Revised term sheet by Thursday. We close in six weeks. The IC will sign by Friday next.",
      },
      {
        speakerId: "inner-voice",
        tone: "tactical",
        text: "He moved it. He moved it cleanly, with a structural reason that is also the structural reason you need. The board-vote framing means the trigger requires a coalition that includes someone other than Halberd. The cage is gone. The door is at the door.",
      },
    ],
    nextSceneId: "ending-the-clause-out",
  },

  {
    id: "path-b-the-cap",
    backgroundId: "office",
    mood: "professional",
    presentCharacterIds: ["bridge"],
    dialog: [
      {
        speakerId: "bridge",
        emotion: "knowing",
        text: "60 percent is workable. I will take it to the IC. They will agree. Revised term sheet Thursday.",
      },
      {
        speakerId: "inner-voice",
        tone: "tactical",
        text: "He moved it because the move costs Halberd almost nothing. The other two funds writing $6M each are not going to oppose Halberd in the moment of the trigger. The threshold negotiation is the wrong negotiation. You won the wrong negotiation.",
      },
      {
        speakerId: null,
        text: "The lawyers shake hands. You close in six weeks. The cage is slightly enlarged. The door is at the same place.",
      },
    ],
    nextSceneId: "ending-the-cap",
  },

  {
    id: "path-c-accept-the-clause",
    backgroundId: "office",
    mood: "danger",
    presentCharacterIds: ["bridge"],
    dialog: [
      {
        speakerId: "bridge",
        emotion: "knowing",
        text: "Good. Let me redirect us to a clause that I think is the right negotiation. Section 6.3, the anti-dilution provisions. There is a tweak I can propose that would give your team a small additional grant in the event of a down round.",
      },
      {
        speakerId: "inner-voice",
        tone: "tactical",
        text: "He redirected. The 6.3 tweak is real. It is also written to be the redirect. You will sign 4.7 as drafted. You won the 6.3 negotiation. The cage is on the wall.",
      },
      {
        speakerId: null,
        text: "Term sheet closed in five weeks. The board seat begins immediately. You will recognise the cage the first time you bring an offer to the board that they veto on math instead of vision.",
      },
    ],
    nextSceneId: "ending-the-cage-accepted",
  },

  {
    id: "ending-the-clause-out",
    backgroundId: "office",
    mood: "peaceful",
    isEnding: true,
    outcomeType: "good",
    endingTitle: "The Cage Removed",
    endingSummary:
      "Bridge moved the clause to a board-level vote. The 51 percent class threshold is gone. The plan-miss trigger is gone. The protective provisions in the signed term sheet read like standard Series B terms instead of standard Series B terms with a hidden veto. You close in six weeks. You start with optionality intact.",
    endingLearnPrompt:
      "Read the protective provisions clause-by-clause before you read the headline numbers. The headline numbers are the door. The provisions are the cage. The door is the trap if the cage is the wall.",
    dialog: [
      {
        speakerId: "theo",
        emotion: "knowing",
        text: "Saw the announcement. The headlines looked clean. The protective provisions also clean? Coffee next week.",
      },
    ],
  },

  {
    id: "ending-the-cap",
    backgroundId: "office",
    mood: "professional",
    isEnding: true,
    outcomeType: "neutral",
    endingTitle: "The Higher Threshold",
    endingSummary:
      "Bridge agreed to 60 percent. The clause is now slightly harder to trigger. Halberd plus one of the two smaller funds. The smaller funds will not push back when the trigger fires. The cage is slightly enlarged. The door is at the same place.",
    endingLearnPrompt:
      "The threshold negotiation is the wrong negotiation when the structural lock is the clause itself. Audit the last term you negotiated up. Did the negotiation change the structure or did it widen the same cage?",
    failureBlogSlug: "the-threshold-negotiation",
    failureBlogTitle: "Why negotiating the threshold is the wrong negotiation",
    dialog: [
      {
        speakerId: "theo",
        emotion: "knowing",
        text: "Saw the announcement. 60 percent threshold? You should have removed the clause. Coffee next week.",
      },
    ],
  },

  {
    id: "ending-the-cage-accepted",
    backgroundId: "office",
    mood: "cold",
    isEnding: true,
    outcomeType: "bad",
    endingTitle: "The Cage Accepted",
    endingSummary:
      "You signed 4.7 as drafted. Halberd has unilateral veto on any change-of-control transaction if your trailing revenue is below 80 percent of the Operating Plan you both agreed to. The cage closes in eighteen to thirty months. You will recognise it the first time you bring an offer to the board that they veto on math instead of vision.",
    endingLearnPrompt:
      "Optimistic acceptance of protective provisions is the most common founder error at Series B. The cage hides where you do not look. The provision that looks standard is the provision built to look standard.",
    failureBlogSlug: "the-protective-provisions-cage",
    failureBlogTitle: "Why the protective provisions are where the cage hides",
    dialog: [
      {
        speakerId: "theo",
        emotion: "knowing",
        text: "Saw the announcement. Read 4.7 once more this weekend. Call me Monday.",
      },
    ],
  },
];

const businessMission10: Scenario = {
  id: "b10-series-b",
  title: "The Series B Round",
  tagline:
    "$42M at $180M pre. The headline is the door. The protective provisions at page eleven are the cage.",
  description:
    "Tuesday morning, Halberd's term sheet on the table. Bridge Carter is running the round. Anika has read page eleven. Clause 4.7 contains a 51 percent class-vote threshold on Liquidation Events triggered by missing the Operating Plan Halberd will help you write. The discipline is to read the provisions clause-by-clause and name the specific structural move, not the threshold negotiation that obscures it.",
  tier: "vip",
  track: "male-business",
  level: 10,
  order: 1,
  estimatedMinutes: 11,
  difficulty: "advanced",
  category: "business",
  xpReward: 420,
  badgeId: "cage-removed",
  startSceneId: "cold-open",
  prerequisites: ["b9-acquisition-lure"],
  isNew: true,
  tacticsLearned: [
    "Reading protective provisions before headline numbers",
    "Distinguishing class-vote thresholds from board-level votes",
    "Naming the specific structural move, not the threshold negotiation",
    "Identifying redirect clauses written to be redirected to",
  ],
  redFlagsTaught: [
    "The 51 percent class-vote threshold as a unilateral lead-investor veto",
    "The plan-miss trigger that activates on the plan the investor approves",
    "Optimistic acceptance of standard-looking provisions",
    "The 6.3 tweak that distracts from the 4.7 cage",
  ],
  reward: {
    id: "cage-removed",
    name: "The Cage Removed",
    description:
      "The board-level vote replaced the class vote. The cage is gone. The door is at the door. You start the Series B with optionality intact.",
  },
  characters: [BRIDGE, ANIKA, THEO, INNER_VOICE_M],
  scenes,
};

export default businessMission10;
