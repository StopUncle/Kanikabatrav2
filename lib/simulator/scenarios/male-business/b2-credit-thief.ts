/**
 * Business Line — Mission 2 "The Credit Thief"
 *
 * Teaches: building a documentation trail. When to confront in private
 * vs. let it happen one more time and set a trap. The political cost
 * of "being right". Calibrating patience vs. preparation.
 *
 * Why it matters: credit theft is the #1 career-killer for high
 * performers. Most handle it emotionally and look small. A few handle
 * it strategically and become partners. The difference is whether you
 * collect receipts before you move.
 *
 * Failure routes → "Narcissist Playbook: How They Actually Operate"
 * One route → "Architecture of Control: How Emotional Dependency Is Built"
 */

import type { Scenario, Scene } from "../../types";
import { DAMIEN, HALE, SAGE, THEO, INNER_VOICE_M } from "../../characters-male";

const scenes: Scene[] = [
  // ---------------------------------------------------------------------
  // PART 1 — the theft, live, in the room that matters
  // ---------------------------------------------------------------------
  {
    id: "q3-review",
    backgroundId: "office",
    mood: "professional",
    presentCharacterIds: ["hale", "damien", "theo"],
    immersionTrigger: "red-flag-revealed",
    dialog: [
      {
        speakerId: null,
        text: "Q3 review. The big boardroom. Fourteen executives, two board members dialled in. The slide behind Hale reads 'Strategic Wins — Q3'.",
      },
      {
        speakerId: "hale",
        text: '"I want to open with our team\'s breakthrough account — Meridian. This is the kind of cross-functional execution I\'ve been pushing the group toward all year."',
        emotion: "happy",
      },
      {
        speakerId: null,
        text: "Meridian. The account you closed alone. Seven weekends, one redeye, a renegotiation Hale wasn't even cc'd on.",
      },
      {
        speakerId: "hale",
        text: '"My team drove it. I want to highlight the methodology — we\'ll be rolling it out across the portfolio in Q4."',
        emotion: "happy",
      },
      {
        speakerId: "inner-voice",
        text: "Credit theft, live, in the room that shapes your next five years. You have about ninety seconds while he's still talking. Three wrong moves and one right one.",
        emotion: "serious",
      },
      {
        speakerId: "inner-voice",
        text: "The wrong moves are emotional: interrupt him, correct him gently, or freeze and swallow it. The right move is not to fight for this quarter — it's to make sure you own the next one before he opens his mouth.",
        emotion: "knowing",
      },
    ],
    choices: [
      {
        id: "interrupt-publicly",
        text: '"Sorry to cut in — just to clarify, I actually closed Meridian solo. Happy to walk through the timeline."',
        tactic: "Public correction. You are right, and you will look small. The room will remember the interruption, not the theft.",
        nextSceneId: "public-correction-fallout",
      },
      {
        id: "quiet-note",
        text: "Say nothing in the room. Open your laptop under the table. Start a dated file of what was said, by whom, on which slide.",
        tactic: "Documentation posture. You just stopped reacting and started building the case.",
        nextSceneId: "after-the-meeting",
        isOptimal: true,
      },
      {
        id: "gentle-add",
        text: '"Glad to share the Meridian playbook — I ran point on that one end-to-end, happy to field questions."',
        tactic: "Gentle contradiction reads as insecurity to the room. Hale will reframe you as 'territorial' in the hallway afterwards.",
        nextSceneId: "gentle-add-fallout",
      },
      {
        id: "swallow-it",
        text: "Do nothing. Don't write anything down. Let it go — it's not worth the politics.",
        tactic: "Silent resentment. The pattern compounds. Your next win is already pre-claimed.",
        nextSceneId: "ending-plateau",
      },
    ],
  },

  // ---------------------------------------------------------------------
  // PART 2 — optimal branch: after the meeting, build the trail
  // ---------------------------------------------------------------------
  {
    id: "after-the-meeting",
    backgroundId: "office",
    mood: "tense",
    presentCharacterIds: ["theo"],
    dialog: [
      {
        speakerId: null,
        text: "4:12pm. Meeting over. You're back at your desk. Adrenaline wants you to type a furious email. You don't.",
      },
      {
        speakerId: null,
        text: "Instead you open a clean doc. Date. Time. Slide number. Exact quote: 'My team drove it.' Attendee list. Where Meridian lived in the CRM — assigned to you, closed by you, no co-contact on file.",
      },
      {
        speakerId: "inner-voice",
        text: "Paper trail before narrative. Every credit thief needs witnesses to be countered, and witnesses without documentation are memory, which is unreliable. Your job for the next seventy-two hours is not to be right — it's to be documented.",
        emotion: "knowing",
      },
      {
        speakerId: null,
        text: "A quiet knock. Theo. He closes the door behind him without being asked.",
      },
      {
        speakerId: "theo",
        text: '"I watched that. You closed Meridian alone. Everyone in finance knows that. What are you going to do?"',
        emotion: "knowing",
      },
    ],
    choices: [
      {
        id: "loop-theo-in",
        text: '"Not much, yet. I\'m documenting. If he does it again, I want the second instance on record. Can I send you the file so there\'s a time-stamped witness?"',
        tactic: "Witnessed documentation. A third-party timestamp on your file turns 'your word vs. his' into 'record vs. claim'.",
        nextSceneId: "hr-temptation",
        isOptimal: true,
      },
      {
        id: "vent-to-theo",
        text: '"I\'m furious. He does this every time. I\'m going to HR tomorrow morning."',
        tactic: "Emotional escalation before evidence. HR without documentation becomes 'two people disagreeing' — and Hale has more relationships than you.",
        nextSceneId: "hr-too-early",
      },
      {
        id: "brush-off-theo",
        text: '"Honestly, not worth it. I\'ll just close the next one louder."',
        tactic: "Silent-grinder strategy. It feels noble and it loses. Hale will pre-claim the next one too.",
        nextSceneId: "ending-plateau",
      },
    ],
  },

  // ---------------------------------------------------------------------
  // PART 3 — HR temptation, redirect to strategy
  // ---------------------------------------------------------------------
  {
    id: "hr-temptation",
    backgroundId: "office",
    mood: "mysterious",
    presentCharacterIds: ["theo"],
    dialog: [
      {
        speakerId: null,
        text: "Thursday morning. Your file is eleven pages now. CRM exports, Slack threads where clients addressed you by name, the original NDA with your signature as lead.",
      },
      {
        speakerId: null,
        text: "You draft an email to HR. Your finger hovers over send.",
      },
      {
        speakerId: "inner-voice",
        text: "HR is not a justice system. HR is a risk-management function that protects the company from you, not Hale from himself. Going early, with one instance, positions you as the problem — 'difficult', 'political', 'territorial'. Hale has three years of relationships inside HR. You have one grievance.",
        emotion: "serious",
      },
      {
        speakerId: "theo",
        text: '"Don\'t send it. Let him do it one more time. Then it\'s a pattern, not an incident. Patterns survive HR. Incidents don\'t."',
        emotion: "knowing",
      },
    ],
    choices: [
      {
        id: "wait-and-bait",
        text: "Close the draft. Save the file to a shared, timestamped location. Start quietly making sure your next win is even more obviously yours — CRM-tagged, client-verified, board-visible.",
        tactic: "Patience with preparation. You are not waiting — you are setting the next trap by controlling attribution upstream.",
        nextSceneId: "the-second-theft",
        isOptimal: true,
      },
      {
        id: "send-hr-anyway",
        text: "Send the HR email. You have the evidence. Why wait?",
        tactic: "Evidence for one instance reads as grievance. Hale outmanoeuvres via his HR relationships. You become 'the one with the problem'.",
        nextSceneId: "ending-hr-loss",
      },
      {
        id: "confront-hale-direct",
        text: "Book a 1:1 with Hale. Show him the file. Tell him you know.",
        tactic: "You just handed a narcissist your entire evidence map. He now knows exactly what to avoid next time.",
        nextSceneId: "hale-adapts",
      },
    ],
  },

  // ---------------------------------------------------------------------
  // PART 4 — the second theft, with infrastructure
  // ---------------------------------------------------------------------
  {
    id: "the-second-theft",
    backgroundId: "office",
    mood: "tense",
    presentCharacterIds: ["hale", "damien"],
    dialog: [
      {
        speakerId: null,
        text: "Three weeks later. You've closed Aldergrove. Before the internal announcement, you made sure of three things: the CRM named you as sole lead, the client sent a thank-you addressed to you personally (which you forwarded to the exec distribution list, no commentary), and the board deck's appendix carried the raw timeline with dates.",
      },
      {
        speakerId: null,
        text: "Monday exec sync. Hale opens his laptop.",
      },
      {
        speakerId: "hale",
        text: '"Great momentum from my group — Aldergrove closed last week. Really proud of how the team rallied under the playbook we\'ve been iterating on."',
        emotion: "happy",
      },
      {
        speakerId: "inner-voice",
        text: "He did it again. And this time, three things are different — the CRM record, the client's own words, and Theo's timestamped witness file. The pattern is now a pattern. You have the second instance. This is the move.",
        emotion: "knowing",
      },
      {
        speakerId: "damien",
        text: '"Interesting. The client emailed me directly last Thursday thanking you personally — not the team. Am I reading something wrong?"',
        emotion: "cold",
      },
      {
        speakerId: "inner-voice",
        text: "Damien just handed you a gift — not out of friendship, but because credit-theft patterns are a currency he tracks. Do NOT thank him publicly. Do NOT weaponise the moment. Stay flat.",
        emotion: "serious",
      },
    ],
    choices: [
      {
        id: "stay-flat",
        text: '"Happy to walk the group through the Aldergrove timeline offline — there\'s a CRM record and a client email thread if anyone wants the detail."',
        tactic: "Neutral, factual, offline. You're not accusing — you're offering receipts. The room can draw its own line.",
        nextSceneId: "board-escalation",
        isOptimal: true,
      },
      {
        id: "attack-hale",
        text: '"To be clear — I closed Aldergrove solo. Hale, that\'s the second time in a month you\'ve claimed my work."',
        tactic: "Public attack. Even with receipts, the room remembers the confrontation. You become 'aggressive' in the hallway story.",
        nextSceneId: "aggressive-label",
      },
      {
        id: "thank-damien",
        text: '"Thanks, Damien — appreciate you catching that."',
        tactic: "You just signalled you're now in Damien\'s faction. He collects the favour later.",
        nextSceneId: "ending-webbed-lite",
      },
    ],
  },

  // ---------------------------------------------------------------------
  // PART 5 — board escalation via receipts, not grievance
  // ---------------------------------------------------------------------
  {
    id: "board-escalation",
    backgroundId: "office",
    mood: "mysterious",
    presentCharacterIds: ["theo"],
    dialog: [
      {
        speakerId: null,
        text: "Tuesday. You send one email to your skip-level — Hale's boss. Subject: 'Aldergrove deal — timeline and attribution for the Q4 board deck'.",
      },
      {
        speakerId: null,
        text: "Body: four sentences. The client's direct email, pasted. The CRM record, screenshotted. The request: 'Want to make sure the board appendix reflects the actual timeline. Happy to walk through if useful.' No mention of Hale. No emotion. No accusation.",
      },
      {
        speakerId: "inner-voice",
        text: "This is the move that separates strategic operators from political amateurs. You didn't accuse — you asked a procedural question with the evidence attached. The skip-level now has to either correct the record or explain why he isn't. Hale has no counter-move, because there is no attack to defend against.",
        emotion: "knowing",
      },
      {
        speakerId: "theo",
        text: '"Skip-level just replied to me separately. He asked whether the Meridian attribution was also off. I sent him the Q3 file."',
        emotion: "knowing",
      },
      {
        speakerId: "inner-voice",
        text: "Two data points. Two independent witnesses. A pattern, not an incident. Hale is now in a room you're not in, explaining himself.",
        emotion: "knowing",
      },
    ],
    nextSceneId: "ending-vindicated",
  },

  // ---------------------------------------------------------------------
  // BAD BRANCH — public correction in the Q3 room
  // ---------------------------------------------------------------------
  {
    id: "public-correction-fallout",
    backgroundId: "office",
    mood: "danger",
    presentCharacterIds: ["hale", "damien"],
    immersionTrigger: "manipulation-detected",
    dialog: [
      {
        speakerId: null,
        text: "The room goes quiet. Hale smiles.",
      },
      {
        speakerId: "hale",
        text: '"Of course you closed it — nobody\'s taking that from you. I meant the broader team effort. Let\'s not derail the review over attribution."',
        emotion: "happy",
      },
      {
        speakerId: "inner-voice",
        text: "DARVO in real time — Deny, Attack, Reverse Victim and Offender. He just reframed his theft as your derailment, made you the political one, and painted himself as the magnanimous adult. The room now remembers 'that time in the Q3 review when he interrupted Hale'.",
        emotion: "sad",
      },
      {
        speakerId: "damien",
        text: '"Moving on."',
        emotion: "cold",
      },
    ],
    nextSceneId: "ending-difficult",
  },

  // ---------------------------------------------------------------------
  // BAD BRANCH — gentle addition
  // ---------------------------------------------------------------------
  {
    id: "gentle-add-fallout",
    backgroundId: "office",
    mood: "tense",
    presentCharacterIds: ["hale"],
    dialog: [
      {
        speakerId: "hale",
        text: '"Right — end-to-end under the playbook, exactly. Great — moving on to the pipeline slide."',
        emotion: "happy",
      },
      {
        speakerId: "inner-voice",
        text: "Gaslighting via reframing. He absorbed your correction into his narrative without yielding anything — 'end-to-end under the playbook' makes your solo close a subset of his methodology. You look like you confirmed him. The room codes you as 'on-message', which is the most expensive-sounding win you can lose.",
        emotion: "sad",
      },
    ],
    nextSceneId: "ending-absorbed",
  },

  // ---------------------------------------------------------------------
  // BAD BRANCH — HR too early
  // ---------------------------------------------------------------------
  {
    id: "hr-too-early",
    backgroundId: "office",
    mood: "danger",
    immersionTrigger: "manipulation-detected",
    dialog: [
      {
        speakerId: null,
        text: "You send the email. HR responds within two hours, invitingly warm.",
      },
      {
        speakerId: null,
        text: "By the end of the week you're in a mediation. Hale is calm, disappointed, concerned for your development. He brings up a comment you made in a one-on-one six months ago — out of context, but plausible.",
      },
      {
        speakerId: "inner-voice",
        text: "He spent three years building relationships with the HR partner across yoga classes and offsite dinners. You brought him one instance. He brought her the 'concerning pattern of defensiveness' he's been 'worried about for a while'. You just got outmanoeuvred via the relationship layer — which is the only layer HR actually runs on.",
        emotion: "sad",
      },
    ],
    nextSceneId: "ending-hr-loss",
  },

  // ---------------------------------------------------------------------
  // BAD BRANCH — confronting Hale directly
  // ---------------------------------------------------------------------
  {
    id: "hale-adapts",
    backgroundId: "office",
    mood: "tense",
    presentCharacterIds: ["hale"],
    dialog: [
      {
        speakerId: null,
        text: "You sit across from Hale. You open the file. He reads for a full minute without speaking.",
      },
      {
        speakerId: "hale",
        text: '"I am genuinely sorry you feel this way. I had no idea the Meridian language landed like that. Let\'s make sure Aldergrove is attributed crystal-clearly — I\'ll personally make sure the deck names you as lead."',
        emotion: "concerned",
      },
      {
        speakerId: "inner-voice",
        text: "He played you. Future-fake repair. He just bought himself one public attribution on Aldergrove in exchange for studying your entire evidence map. Next quarter he'll claim something you haven't thought to document yet — a process, a hire, a pivot — because you just taught him which lanes you watch and which you don't.",
        emotion: "sad",
      },
    ],
    nextSceneId: "ending-evidence-leaked",
  },

  // ---------------------------------------------------------------------
  // BAD BRANCH — public attack in second meeting
  // ---------------------------------------------------------------------
  {
    id: "aggressive-label",
    backgroundId: "office",
    mood: "danger",
    presentCharacterIds: ["hale", "damien"],
    dialog: [
      {
        speakerId: "hale",
        text: '"I think we\'re going to need to have a separate conversation about tone — this isn\'t the forum."',
        emotion: "concerned",
      },
      {
        speakerId: "inner-voice",
        text: "Tone-policing as deflection. He didn't engage the substance — he re-categorised the event as a behavioural issue on your part. By Friday, two directors will have heard that you 'lost it' in the exec sync. Being right in public is not the same as winning in public.",
        emotion: "sad",
      },
    ],
    nextSceneId: "ending-aggressive",
  },

  // ---------------------------------------------------------------------
  // ENDINGS
  // ---------------------------------------------------------------------
  {
    id: "ending-vindicated",
    backgroundId: "office",
    mood: "peaceful",
    immersionTrigger: "victory",
    isEnding: true,
    outcomeType: "good",
    endingTitle: "Receipts Over Grievance",
    endingSummary:
      "Six weeks later, Hale is quietly moved to a 'strategic initiatives' role with no direct reports. No announcement, no scandal — just the silent rearrangement that happens when a pattern becomes visible to people who can act on it. You never accused him. You never raised your voice. You built a paper trail, waited for the second instance, and routed the facts to the one person structurally motivated to act. The board now has you on a short list. The lesson is the discipline, not the outcome: strategic operators do not fight for credit — they control attribution upstream and let evidence do the talking.",
    dialog: [
      {
        speakerId: "inner-voice",
        text: "Being right is a feeling. Being documented is a position. The difference decides careers.",
        emotion: "knowing",
      },
    ],
  },

  {
    id: "ending-plateau",
    backgroundId: "office",
    mood: "tense",
    isEnding: true,
    outcomeType: "bad",
    endingTitle: "The Silent Grinder",
    endingSummary:
      "You close the next one. And the one after. Hale claims them all under 'the playbook'. Three years later you are the highest-producing individual contributor in the group and you have been passed over for promotion twice. The story in every calibration room is that you 'lack executive presence' — which is the polite phrase for 'can't get credit to stick'. You mistook silence for dignity. Silence without receipts is just compounded theft.",
    failureBlogSlug: "narcissist-playbook-how-they-actually-operate",
    failureBlogTitle: "Narcissist Playbook: How They Actually Operate",
    dialog: [
      {
        speakerId: "inner-voice",
        text: "Working harder is not a counter-move to a credit thief. It is a subsidy.",
        emotion: "sad",
      },
    ],
  },

  {
    id: "ending-difficult",
    backgroundId: "office",
    mood: "tense",
    isEnding: true,
    outcomeType: "bad",
    endingTitle: "Branded Difficult",
    endingSummary:
      "You were right, in the room, in front of fourteen executives. And the room remembers the interruption, not the theft. Within two weeks, 'difficult' is attached to your file in three separate calibration conversations. Hale plays wounded for a month and earns sympathy capital. You spend the next year explaining yourself in rooms where the original facts have long since dissolved into 'a personality thing between the two of them'. Being right publicly, without infrastructure, is the most expensive form of correctness there is.",
    failureBlogSlug: "narcissist-playbook-how-they-actually-operate",
    failureBlogTitle: "Narcissist Playbook: How They Actually Operate",
    dialog: [
      {
        speakerId: "inner-voice",
        text: "The room does not reward truth. It rewards composure plus evidence. One without the other is theatre.",
        emotion: "sad",
      },
    ],
  },

  {
    id: "ending-absorbed",
    backgroundId: "office",
    mood: "tense",
    isEnding: true,
    outcomeType: "bad",
    endingTitle: "Absorbed Into His Narrative",
    endingSummary:
      "Your gentle addition became his supporting quote. 'End-to-end under the playbook' is now in the Q4 deck, verbatim, attributed to the methodology he invented. You did not correct him — you ratified him with softer words. Over the next year the pattern repeats at finer resolution: every time you speak up gently, he reframes you into alignment. You cannot gaslight-proof yourself by being polite at a narcissist. Politeness is the surface he slides on.",
    failureBlogSlug: "narcissist-playbook-how-they-actually-operate",
    failureBlogTitle: "Narcissist Playbook: How They Actually Operate",
    dialog: [
      {
        speakerId: "inner-voice",
        text: "Softness against a reframer is raw material. He will use it.",
        emotion: "sad",
      },
    ],
  },

  {
    id: "ending-hr-loss",
    backgroundId: "office",
    mood: "danger",
    isEnding: true,
    outcomeType: "bad",
    endingTitle: "Outmanoeuvred in HR",
    endingSummary:
      "Six weeks of meetings. A performance plan, framed as 'developmental'. A calm, concerned Hale, offering to mentor you through it. You walk out with a 'coaching relationship' you didn't ask for and a written record that you 'struggle with team attribution'. You brought a receipt to a relationship fight. HR runs on who has been having coffee with the partner for three years — not on who is right this week. You were right this week, and you lost.",
    failureBlogSlug: "narcissist-playbook-how-they-actually-operate",
    failureBlogTitle: "Narcissist Playbook: How They Actually Operate",
    dialog: [
      {
        speakerId: "inner-voice",
        text: "HR is not a court. It is a risk buffer for the company against you. Treat it accordingly.",
        emotion: "sad",
      },
    ],
  },

  {
    id: "ending-evidence-leaked",
    backgroundId: "office",
    mood: "tense",
    isEnding: true,
    outcomeType: "bad",
    endingTitle: "You Gave Him the Map",
    endingSummary:
      "He said sorry. He named you on the Aldergrove deck. And the next quarter he pre-claimed a process improvement you'd been running silently in the background — something you never thought to document, because you trusted that work would speak for itself. You handed a narcissist your entire evidence map in a private meeting and he studied it. He now knows every lane you watch and every lane you don't. The architecture of control he's building around you now runs on the information you volunteered in the name of 'handling it like an adult'.",
    failureBlogSlug: "architecture-of-control-how-emotional-dependency-is-built",
    failureBlogTitle: "Architecture of Control: How Emotional Dependency Is Built",
    dialog: [
      {
        speakerId: "inner-voice",
        text: "You do not warn a credit thief. You let him act and you capture the act.",
        emotion: "sad",
      },
    ],
  },

  {
    id: "ending-aggressive",
    backgroundId: "office",
    mood: "danger",
    isEnding: true,
    outcomeType: "bad",
    endingTitle: "Right in Public, Wrong in Narrative",
    endingSummary:
      "You had the receipts. And you spent them on a spectacle. Hale's 'tone' pivot landed. The hallway story is no longer 'Hale stole credit twice' — it's 'the Aldergrove blow-up'. The facts are still on your side and the narrative is no longer on your side, and at this altitude narrative is the currency. Next quarter you will be stable, productive, and quietly un-promoted. You were right. It did not save you.",
    failureBlogSlug: "narcissist-playbook-how-they-actually-operate",
    failureBlogTitle: "Narcissist Playbook: How They Actually Operate",
    dialog: [
      {
        speakerId: "inner-voice",
        text: "Volume is not evidence. A flat voice with a paper trail outranks a loud voice with the same paper trail, every time.",
        emotion: "sad",
      },
    ],
  },

  {
    id: "ending-webbed-lite",
    backgroundId: "office",
    mood: "tense",
    isEnding: true,
    outcomeType: "neutral",
    endingTitle: "Managed — But Webbed",
    endingSummary:
      "Aldergrove gets re-attributed. Hale is privately spoken to. On the surface, you won. But the public thank-you to Damien in that meeting was a signal flare. Within a month he's asking for small favours — a data point here, a read on a colleague there. You traded one narcissist's theft for another operator's leash. The account is yours again; your autonomy is partially mortgaged. Adequate is not optimal. Solving a credit problem by joining someone else's faction just changes which man runs you.",
    dialog: [
      {
        speakerId: "inner-voice",
        text: "Help that arrives unasked is never free. Thank it quietly, or thank it offline — never thank it in the room.",
        emotion: "knowing",
      },
    ],
  },
];

export const businessMission2: Scenario = {
  id: "b2-credit-thief",
  title: "The Credit Thief",
  tagline:
    "He'll claim your work in the room that matters. What you do in the next 90 seconds shapes the next five years.",
  description:
    "Q3 review. Fourteen executives. Your director opens by claiming the account you closed alone. You have ninety seconds while he's still talking — and the move you make decides whether you spend the next five years as the highest-producing IC in the group or the partner he answers to. Most men handle credit theft emotionally and look small. A few handle it strategically and become unassailable. The difference is whether you collect receipts before you move.",
  tier: "free",
  track: "male-business",
  level: 2,
  order: 1,
  estimatedMinutes: 8,
  difficulty: "beginner",
  category: "business",
  xpReward: 125,
  badgeId: "receipts-over-grievance",
  startSceneId: "q3-review",
  tacticsLearned: [
    "Building a timestamped documentation trail",
    "Distinguishing incident from pattern before escalating",
    "Routing evidence via procedural questions, not grievance",
    "Controlling attribution upstream — CRM, client email, board appendix",
    "Witnessed documentation via a trusted third party",
    "Calibrating patience vs. preparation (wait for the second instance)",
  ],
  redFlagsTaught: [
    "DARVO in a boardroom — 'nobody's taking that from you'",
    "Gaslighting via reframing — absorbing your correction into his narrative",
    "Future-fake repair — performative apology that extracts your evidence map",
    "Tone-policing as deflection from substance",
    "'Team effort' language as pre-positioning for credit theft",
    "Triangulation disguised as a public rescue",
  ],
  characters: [HALE, THEO, DAMIEN, SAGE, INNER_VOICE_M],
  scenes,
};

export default businessMission2;
