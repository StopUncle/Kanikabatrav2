/**
 * Business Line. Mission 7 "The Board Seat"
 *
 * Thursday morning. Damien Vance's coffee invitation from b6 lands at
 * the table at 7:54 am. The "thing he wants to run by you" arrives at
 * 8:14 in the form of Lawrence Vaughn walking through the door. The
 * Vaughn from b5. Damien is now framing him as the architect of a
 * four-founder cohort with shared observer seats.
 *
 * The scenario is not about Vaughn. It is about whether the protagonist
 * reads the multi-board structure as the product, not the favour. The
 * teaching is that observer rights are a position to extract from, and
 * a cohort of founders sharing observer seats is a distributed
 * intelligence operation dressed in patrician clothing.
 *
 * Handoff out: a term sheet PDF from Vaughn's office at 4:11 pm. b8
 * opens on the PDF.
 *
 * Pilot reference: `reference/b7-pilot.md`.
 */

import type { Scenario, Scene } from "../../types";
import { DAMIEN, VAUGHN, THEO, INNER_VOICE_M } from "../../characters-male";

const scenes: Scene[] = [
  // -------------------------------------------------------------------
  // Scene 1, cold open
  // -------------------------------------------------------------------
  {
    id: "cold-open",
    backgroundId: "office",
    mood: "professional",
    presentCharacterIds: ["damien"],
    dialog: [
      {
        speakerId: null,
        text: "Thursday. 7:54 am. The coffee shop. Mercer and Houston. Two days after Cal Renner walked out of the conference room with the packet in his bag.",
      },
      {
        speakerId: null,
        text: "Damien is in the corner booth. He was here at 7:42. He ordered for both of you. He is reading the FT folded small, the broadsheet trick people do when they want to look like a person reading the FT.",
      },
      {
        speakerId: "inner-voice",
        tone: "tactical",
        text: "He chose the booth. He chose the time. He chose the paper. The thing he wants to run by you is already running. You have walked into a meeting that has been three weeks in setup.",
      },
      {
        speakerId: "damien",
        emotion: "knowing",
        text: "I have you until 9:00. I told the team I would be in by 9:15. I have a third coming at 8:14. He will be on time. He always is.",
      },
      {
        speakerId: "inner-voice",
        tone: "tactical",
        text: "A third coming. A third was not in the email.",
      },
    ],
    nextSceneId: "damien-frame",
  },

  // -------------------------------------------------------------------
  // Scene 2, Damien's pitch frame
  // -------------------------------------------------------------------
  {
    id: "damien-frame",
    backgroundId: "office",
    mood: "professional",
    presentCharacterIds: ["damien"],
    dialog: [
      {
        speakerId: "damien",
        emotion: "knowing",
        text: "Quick framing before he arrives. He has been wanting to meet you for eight months. He has a small cohort, four founders, all at your stage.",
      },
      {
        speakerId: "damien",
        emotion: "knowing",
        text: "They have an arrangement. They sit on each other's boards as observers. Quarterly check-ins. Nothing voting. The value is the distributed intelligence.",
      },
      {
        speakerId: "damien",
        emotion: "knowing",
        text: "You see what is happening at four companies that look like yours without paying for the consultants who would only see three.",
      },
      {
        speakerId: "damien",
        emotion: "knowing",
        text: "He invests, small. Hundred-and-fifty K. Observer rights only. The board seat is the product, not the cheque. The cheque is the membership card.",
      },
      {
        speakerId: "inner-voice",
        tone: "tactical",
        text: "Hear what Damien just said. The board seat is the product. Most pitches make the cheque the product. He inverted that on purpose to flatter the structure. Damien is not stupid. Damien is also not pitching for Damien.",
      },
      {
        speakerId: "damien",
        emotion: "knowing",
        text: "He has done it three times. The other three founders are on each other's boards already. You would be the fourth seat. The math works because the four of you do not compete.",
      },
      {
        speakerId: "damien",
        emotion: "knowing",
        text: "Your stacks are different enough that the information sharing is asymmetric in your favour.",
      },
      {
        speakerId: "inner-voice",
        tone: "tactical",
        text: "Asymmetric in your favour. Note that phrase. It is the phrase a careful operator uses when the asymmetry is the other direction.",
      },
      {
        speakerId: "damien",
        emotion: "knowing",
        text: "He is at the door.",
      },
    ],
    nextSceneId: "vaughn-walks-in",
  },

  // -------------------------------------------------------------------
  // Scene 3, Vaughn arrives
  // -------------------------------------------------------------------
  {
    id: "vaughn-walks-in",
    backgroundId: "office",
    mood: "tense",
    presentCharacterIds: ["damien", "vaughn"],
    dialog: [
      {
        speakerId: null,
        text: "Lawrence Vaughn. The same suit, the same posture, the same handshake as b5. He sits. He orders nothing. He looks at you for two seconds longer than the average handshake glance.",
      },
      {
        speakerId: null,
        text: "The look is calibrated to register the recognition that you walked from his table six months ago.",
      },
      {
        speakerId: "vaughn",
        emotion: "knowing",
        text: "Good to see you again. Damien thought it was time.",
      },
      {
        speakerId: "inner-voice",
        tone: "tactical",
        text: "He has acknowledged the prior round in eight words. He has framed the new round as Damien's idea. He has not apologised for the prior round. He has done the move that costs him the least, which is to acknowledge the room.",
      },
      {
        speakerId: "vaughn",
        emotion: "knowing",
        text: "I want to keep this short. The cohort exists. Three founders. You make it four. I write a small cheque, 150K, common stock, no anti-dilution, no preference, no protective provisions.",
      },
      {
        speakerId: "vaughn",
        emotion: "knowing",
        text: "Observer seat at your board for as long as I hold. Quarterly. You and the other three founders also have observer seats at each other's boards. Everyone sees everyone's deck four times a year.",
      },
      {
        speakerId: "vaughn",
        emotion: "knowing",
        text: "I have done this three times. The math says it works. None of you compete. All of you compound. You read this on paper and you decide. I am happy to leave without an answer today.",
      },
    ],
    nextSceneId: "the-choice",
  },

  // -------------------------------------------------------------------
  // Scene 4, the choice
  // -------------------------------------------------------------------
  {
    id: "the-choice",
    backgroundId: "office",
    mood: "tense",
    presentCharacterIds: ["damien", "vaughn"],
    dialog: [
      {
        speakerId: "inner-voice",
        tone: "tactical",
        text: "Read what he said. Three founders, all on each other's boards. Observer seats. Quarterly cadence. Each founder sees the other three's decks four times a year.",
      },
      {
        speakerId: "inner-voice",
        tone: "tactical",
        text: "The math Vaughn is describing is the math Vaughn benefits from. Each founder sees three companies. Vaughn sees four, plus he sees the inside of every board meeting where those four discuss anything else.",
        event: "tactic-named:cohort-trap",
      },
      {
        speakerId: "inner-voice",
        tone: "tactical",
        text: "The distributed intelligence is Vaughn's. Three openings.",
      },
    ],
    choices: [
      {
        id: "decline-clean",
        text: "I appreciate the offer. The structure does not work for me. The cohort's information advantage is asymmetric to your seat, not to mine. Thank you for thinking of me.",
        tactic:
          "Read the structure as the product. Decline the structure. Keep Damien, keep Vaughn, keep your observer-rights-free board.",
        isOptimal: true,
        event: "optimal-with-grace",
        nextSceneId: "path-a-decline-clean",
      },
      {
        id: "ask-papers",
        text: "Send me the term sheet and the cohort agreement. I will read with my CFO and we will talk Tuesday.",
        tactic:
          "The papers move. You read the structure before you commit. Buys you four days and the legal posture of being a person who reads before he signs.",
        nextSceneId: "path-b-ask-papers",
      },
      {
        id: "soft-yes",
        text: "I am interested. Let's set up a follow-up next week. I will read what you send.",
        tactic:
          "The soft yes. The phrase I am interested is the commitment. The follow-up is the calendar move. The reading is now post-commitment, which is not reading.",
        event: "failure-rejected",
        nextSceneId: "path-c-soft-yes",
      },
    ],
  },

  // -------------------------------------------------------------------
  // Path A, clean decline
  // -------------------------------------------------------------------
  {
    id: "path-a-decline-clean",
    backgroundId: "office",
    mood: "cold",
    presentCharacterIds: ["damien", "vaughn"],
    dialog: [
      {
        speakerId: null,
        text: "You say the four sentences. Vaughn does not flinch. He nods once. He stands.",
      },
      {
        speakerId: "vaughn",
        emotion: "knowing",
        text: "Fair. I asked. Thank you. Damien, your call as ever.",
      },
      {
        speakerId: null,
        text: "He leaves. The door bell rings on his exit. Damien looks at you across the booth for one second longer than the average post-pitch glance.",
      },
      {
        speakerId: "damien",
        emotion: "curious",
        text: "That was fast. Tell me why.",
      },
      {
        speakerId: "inner-voice",
        tone: "tactical",
        text: "Damien is not annoyed. Damien is taking notes. He is the kind of operator who learns the move you just did and uses it on someone else next week.",
      },
      {
        speakerId: "inner-voice",
        text: "The cohort sees more than I do at my seat. I see three decks four times a year. He sees four decks every time anyone on the cohort discusses anything.",
      },
      {
        speakerId: "inner-voice",
        text: "The cheque is 150K. The information he gets is worth eight figures over the holding period. I am the seat that completes the surveillance grid. I'd rather not.",
      },
      {
        speakerId: "damien",
        emotion: "knowing",
        text: "Hm.",
      },
      {
        speakerId: null,
        text: "Damien drinks his coffee. He does not respond for a beat. Then he changes the subject. He asks about Cal. The question is genuine. The information he wanted is no longer on the table because you took it off cleanly.",
      },
    ],
    nextSceneId: "ending-cohort-declined",
  },

  // -------------------------------------------------------------------
  // Path B, papers first
  // -------------------------------------------------------------------
  {
    id: "path-b-ask-papers",
    backgroundId: "office",
    mood: "professional",
    presentCharacterIds: ["vaughn"],
    dialog: [
      {
        speakerId: "vaughn",
        emotion: "knowing",
        text: "I will send the documents this morning. My team will have them to your CFO by 10:30.",
      },
      {
        speakerId: "damien",
        emotion: "knowing",
        text: "Good. Tuesday at 8:00, same booth.",
      },
      {
        speakerId: null,
        text: "You leave at 8:38. Walking back, Theo calls at 9:31.",
      },
      {
        speakerId: "theo",
        emotion: "knowing",
        text: "What did he offer.",
      },
      {
        speakerId: null,
        text: "You give Theo the three-sentence version.",
      },
      {
        speakerId: "theo",
        emotion: "knowing",
        text: "Send me the documents the second they land. I will tell you what you missed by 11:00.",
      },
      {
        speakerId: null,
        text: "The documents land at 10:24. Theo reads them. He calls back at 11:08.",
      },
      {
        speakerId: "theo",
        emotion: "knowing",
        text: "Clauses 14 to 19. Same as last time. The observer right converts to voting rights on a material adverse event that he defines.",
      },
      {
        speakerId: "theo",
        emotion: "knowing",
        text: "The material adverse event includes cohort underperformance which is defined relative to the other three cohort companies. The cohort is the trigger. The seat is the consequence.",
      },
      {
        speakerId: "inner-voice",
        tone: "tactical",
        text: "The documents told you what the pitch did not. Theo's one question was the right question. You will write the polite decline by 4:00.",
      },
    ],
    nextSceneId: "ending-papers-read",
  },

  // -------------------------------------------------------------------
  // Path C, soft yes
  // -------------------------------------------------------------------
  {
    id: "path-c-soft-yes",
    backgroundId: "office",
    mood: "danger",
    presentCharacterIds: ["damien", "vaughn"],
    dialog: [
      {
        speakerId: null,
        text: "You set the follow-up. Tuesday at 8:00. Vaughn nods. He leaves. Damien finishes his coffee.",
      },
      {
        speakerId: "damien",
        emotion: "knowing",
        text: "Good. He likes you. He does not like everyone.",
      },
      {
        speakerId: null,
        text: "At 4:11 pm Vaughn's office sends the documents. The cover email opens with Per Damien's introduction. The documents are eighteen pages.",
      },
      {
        speakerId: "inner-voice",
        tone: "tactical",
        text: "Clauses 14 to 19 are the same clauses as b5 with the word observer pasted in front of rights three times.",
        event: "tactic-named:soft-yes",
      },
      {
        speakerId: "inner-voice",
        tone: "tactical",
        text: "The asymmetric-information cohort is intact. The trigger clauses are intact. The cheque is smaller. The structure is cleaner because it is distributed across four founders, one of whom is starting to be you.",
      },
      {
        speakerId: "inner-voice",
        tone: "tactical",
        text: "You did not read at coffee. You read now. Reading after commitment is not reading.",
      },
      {
        speakerId: "inner-voice",
        tone: "tactical",
        text: "The Tuesday meeting is no longer a decision. It is a negotiation about which clauses to soften. Vaughn will soften two. The two he keeps are the two that matter.",
      },
    ],
    nextSceneId: "ending-cohort-joined",
  },

  // -------------------------------------------------------------------
  // ENDINGS
  // -------------------------------------------------------------------
  {
    id: "ending-cohort-declined",
    backgroundId: "office",
    mood: "cold",
    isEnding: true,
    outcomeType: "good",
    endingTitle: "The Cohort Declined",
    endingSummary:
      "Four sentences at 8:24 am. You named the structure as the product, declined it, and kept Damien, Vaughn, and your observer-rights-free board. Vaughn left without an answer he wanted and without an answer he can use. Damien took notes. The next time he plays this pitch on someone else, he will know the four-sentence decline exists.",
    endingLearnPrompt:
      "Read the structure before you read the cheque. The structure is always the product. The cheque is always the membership card.",
    dialog: [
      {
        speakerId: null,
        text: "8:24 am. You walk out of the coffee shop. Damien stayed for a second cup. He will be in at 9:15 like he said.",
      },
      {
        speakerId: "inner-voice",
        tone: "tactical",
        text: "One week later, on a different Thursday, you hear that one of the other three cohort founders has just been asked to take a CEO mentor. The mentor is Vaughn's preferred operator.",
      },
      {
        speakerId: "inner-voice",
        tone: "tactical",
        text: "The CEO mentor sits in board meetings as a fifth observer. The cohort is now five seats. The structure is doing what structures do.",
      },
    ],
  },

  {
    id: "ending-papers-read",
    backgroundId: "office",
    mood: "professional",
    isEnding: true,
    outcomeType: "neutral",
    endingTitle: "The Papers Read",
    endingSummary:
      "You declined to commit at the table. The documents arrived. Theo read them. The clauses did the talking. You will send the decline by Tuesday. The cost was four days of holding pattern in your head and one CFO afternoon. The legal posture is clean.",
    endingLearnPrompt:
      "Asking for the papers is the second-best move. The best move is the four-sentence decline at the table when you already know the structure. The papers are only required when you do not yet have the read.",
    dialog: [
      {
        speakerId: null,
        text: "Tuesday at 3:48 pm. You send the decline. The email is six sentences. It thanks Damien, names the structural reason, and does not negotiate.",
      },
      {
        speakerId: "inner-voice",
        tone: "tactical",
        text: "Theo did the work. You did the reading. The cohort moves on without you. The next time Vaughn pitches this structure he will not pitch it to you.",
      },
    ],
  },

  {
    id: "ending-cohort-joined",
    backgroundId: "office",
    mood: "danger",
    isEnding: true,
    outcomeType: "bad",
    endingTitle: "The Surveillance Grid",
    endingSummary:
      "You said I am interested inside the first pitch. The follow-up is Tuesday. The papers landed at 4:11 pm with the cohort underperformance trigger intact. The cheque is small. The seat is the product. Vaughn now sees your board four times a year and the three peers' boards four times a year. He completes the grid.",
    endingLearnPrompt:
      "The soft yes is half of saying yes. Audit your last three meetings where you set a follow-up that you described to yourself as no decision. Each of those follow-ups was a partial yes.",
    failureBlogSlug: "the-cohort-trap",
    failureBlogTitle: "Why a distributed-board cohort is one investor's intelligence operation",
    dialog: [
      {
        speakerId: null,
        text: "Tuesday at 8:00 am. The same booth. Vaughn is back. The negotiation is now about which clauses to soften.",
      },
      {
        speakerId: "inner-voice",
        tone: "tactical",
        text: "He softens two. The two he keeps are the two that matter. You sign the following Thursday.",
      },
      {
        speakerId: "inner-voice",
        tone: "tactical",
        text: "Three months later you sit in your first cohort board meeting as the fourth observer. You see the three other founders' decks for the first time. Two of them are doing significantly better than you.",
      },
      {
        speakerId: "inner-voice",
        tone: "tactical",
        text: "Vaughn smiles at you across the table. The smile is not unkind. The smile is the structure noticing you.",
      },
    ],
  },
];

const businessMission7: Scenario = {
  id: "b7-board-seat",
  title: "The Board Seat",
  tagline:
    "A 150K cheque, an observer seat, and a four-founder cohort. The structure is always the product.",
  description:
    "Damien's Thursday coffee. Vaughn arrives at 8:14, the same Vaughn who tried to route your term sheet through clauses 14 to 19 six months ago. He is now offering you a fourth seat in a cohort where four founders observe each other's boards quarterly. The math sounds asymmetric in your favour. The discipline is to read who actually benefits from a distributed-board cohort. Hint: not the four founders.",
  tier: "vip",
  track: "male-business",
  level: 7,
  order: 1,
  estimatedMinutes: 11,
  difficulty: "advanced",
  category: "business",
  xpReward: 320,
  badgeId: "cohort-declined",
  startSceneId: "cold-open",
  prerequisites: ["b6-first-firing"],
  isNew: true,
  tacticsLearned: [
    "Reading the multi-board structure as the product, not the favour",
    "Naming the surveillance grid as a phrase before signing the LLC",
    "The four-sentence decline that keeps the introducer intact",
    "Asking for the papers when you do not yet have the read",
  ],
  redFlagsTaught: [
    "The cohort trap: distributed observer seats as one investor's intelligence operation",
    "The soft yes: I am interested as the commitment, the follow-up as the calendar move",
    "Asymmetric in your favour as a phrase used when the asymmetry is the other way",
    "Per Damien's introduction as a cover email used to wrap the second-attempt term sheet",
  ],
  reward: {
    id: "cohort-declined",
    name: "The Cohort Declined",
    description:
      "Four sentences at 8:24 am. The cohort named, the structure declined, the introducer kept intact.",
  },
  characters: [DAMIEN, VAUGHN, THEO, INNER_VOICE_M],
  scenes,
};

export default businessMission7;
