/**
 * divorce-4-1, "The Family Disclosure"
 *
 * Divorce-Arc, Level 4, order 1. The first time the separation is
 * said outside the house. The decision was spoken across the kitchen
 * table (divorce-1-1), the lawyer is engaged, the kids have been told
 * jointly. Now the extended family learns, and the covert-narc spouse
 * (THE_SPOUSE, the same character from tn-4-1 and divorce-1-1) is
 * already moving to seed his version first.
 *
 * Register: information discipline, low affect. This is not the scene
 * where the protagonist finally makes her case to people who will
 * understand; that scene does not exist. The whole move is sequence
 * and restraint.
 *
 * Teaches:
 *  - Who to tell first: your anchor people, directly, before his
 *    version can reach them. Sequence is the shape of the story.
 *  - The two-sentence version: two sentences of fact plus one
 *    boundary. No case. The brevity is the credibility.
 *  - Not litigating the marriage: the urge to prove he was the
 *    problem reads as instability and invites a debate you cannot win.
 *  - Letting his version discredit itself: when the smear reaches you
 *    secondhand, you hold the line rather than countering point by
 *    point; the contrast between your consistency and his campaign
 *    does the work over a year, not an afternoon.
 *
 * Voice: clinical, low affect, the subject supplies its own weight.
 * Voice ref: KANIKA-VOICE.md.
 */

import type { Character, Scenario, Scene } from "../../types";
import { INNER_VOICE, THE_SPOUSE } from "../../characters";

const THE_SISTER: Character = {
  id: "the-sister",
  name: "Your sister",
  description:
    "Two years older. The name on the account you opened during the infrastructure window. The one person who has known some of this in real time. Steady, undramatic, will do exactly what you ask and nothing you did not.",
  traits: ["anchor", "discreet", "loyal"],
  defaultEmotion: "knowing",
  gender: "female",
  personalityType: "secure-ally",
  silhouetteType: "female-athletic",
};

const HER_MOTHER: Character = {
  id: "her-mother",
  name: "Your mother",
  description:
    "Decent, anxious, conflict-averse. Not an antagonist. Wants everyone to be all right and will unconsciously carry whichever version arrives first because carrying it feels like keeping the peace. The conduit, not the enemy.",
  traits: ["well-meaning", "peace-keeping", "porous"],
  defaultEmotion: "concerned",
  gender: "female",
  personalityType: "secure-ally",
  silhouetteType: "female-elegant",
};

const scenes: Scene[] = [
  // ===================================================================
  // CONTENT GATE
  // ===================================================================
  {
    id: "content-gate",
    backgroundId: "apartment",
    mood: "cold",
    dialog: [
      {
        speakerId: null,
        text: "Content note. This scenario is the first disclosure of the separation outside the house. The decision has already been spoken across the kitchen table (divorce-1-1), the lawyer is engaged, and the kids have been told jointly. What happens now is that the extended family learns, and he starts seeding his version. The scenario teaches the operational discipline of the telling: sequence, script, and what you do when his account of events reaches your people before yours does.",
      },
      {
        speakerId: null,
        text: "Register: information discipline, low affect. This is not the scene where you finally make your case to people who will understand. That scene does not exist. If this is the wrong one for you tonight, exit. If it is the right one, continue.",
      },
    ],
    choices: [
      {
        id: "continue",
        text: "Continue.",
        tactic: "Saturday, 10:00 a.m. He has taken the kids to his mother's for the afternoon. You have four clear hours and a phone that has not rung yet.",
        nextSceneId: "the-list",
      },
      {
        id: "exit-gate",
        text: "Exit. Return when the conditions are right.",
        tactic: "The disclosure will hold. It runs better on a morning you chose than on a phone call you did not.",
        nextSceneId: "opted-out",
      },
    ],
  },

  {
    id: "opted-out",
    backgroundId: "apartment",
    mood: "peaceful",
    isEnding: true,
    outcomeType: "neutral",
    endingTitle: "Not This Morning",
    endingLearnPrompt:
      "The opt-out is a complete move. The disclosure has a right shape and it is worth doing on a morning you have bandwidth for, not on a call that catches you flat. The one thing the vacuum costs you: while nobody is told, the first version anyone hears is whichever one arrives first, and you are not the only person who can start that clock. Come back before someone else does.",
    dialog: [
      {
        speakerId: "inner-voice",
        text: "Closed the gate. Four hours of quiet. The list is still on the counter.",
        emotion: "knowing",
      },
    ],
    choices: [],
  },

  // ===================================================================
  // THE LIST
  // ===================================================================
  {
    id: "the-list",
    backgroundId: "apartment",
    mood: "cold",
    presentCharacterIds: ["inner-voice"],
    dialog: [
      {
        speakerId: null,
        text: "You have written names on the back of an envelope. Your sister. Your mother. His mother. The two couples you both call friends. The wider family group chat that fires on birthdays. The order you tell them in is not admin. By Monday there will be one dominant version of this in circulation, and the order you tell people in is most of what decides which version that is.",
      },
      {
        speakerId: "inner-voice",
        text: "He has a head start on exactly one thing: he is with his mother right now, and he is better than you at sympathy on demand. His advantage is speed and a warm audience. The counter is not to be faster at the same game. It is to reach your anchor people first, directly, in your own plain voice, so that whatever he says later is measured against a version they already trust.",
        emotion: "knowing",
        tone: "tactical",
      },
    ],
    choices: [
      {
        id: "tell-sister-first",
        text: "Call your sister first. Direct, plain, no performance. She already holds the account; she can hold the fixed point of the story.",
        tactic: "The anchor-first move. Your sister becomes the calm, consistent version every later account gets compared against. You are not building an army; you are setting one true north that does not move, so his moving versions look like what they are.",
        nextSceneId: "the-sister-call",
        isOptimal: true,
        event: "optimal-with-grace",
      },
      {
        id: "broadcast-everyone",
        text: "Write one long, careful message and send it to the whole family group at once, so nobody can say they heard it from the wrong person.",
        tactic: "The broadcast feels fair and efficient. It is neither. A written statement to a group reads as a press release, invites a thread of replies you cannot steer, and hands him a document to re-read aloud with the inflection he chooses. The anchor people needed a call, not a bulletin.",
        nextSceneId: "broadcast-derail",
        isOptimal: false,
      },
      {
        id: "his-mother-first",
        text: "Call his mother first, out of decency. She raised him; she should not hear it thirdhand.",
        tactic: "The courtesy call to his mother reads, to her, as guilt, and puts his frame in the room before yours. She will relay his version because it is the one already sitting in her kitchen this morning. Decency is not the same as sequence; you can be decent and still not go first to the house that is already holding his side.",
        nextSceneId: "mil-first-derail",
        isOptimal: false,
      },
      {
        id: "say-nothing",
        text: "Tell no one yet. Let it come out naturally over the next few weeks so it does not look staged.",
        tactic: "The vacuum is not neutral. Whoever speaks first sets the default frame, and he is sitting in a sympathetic kitchen with nothing else to do this afternoon. 'Naturally' means 'his version, first, unopposed.'",
        nextSceneId: "ending-leaked",
        isOptimal: false,
      },
    ],
  },

  {
    id: "broadcast-derail",
    backgroundId: "apartment",
    mood: "tense",
    presentCharacterIds: ["inner-voice"],
    dialog: [
      {
        speakerId: "inner-voice",
        text: "Your thumb is over send. Stop. A group message is an artefact he can screenshot, forward, and read back in his own tone at his mother's table. The anchor people are not an audience to be addressed; they are individuals to be called. Delete the draft. Start with the one call that matters most.",
        emotion: "serious",
        tone: "tactical",
      },
    ],
    choices: [
      {
        id: "back-to-sister",
        text: "Delete the draft. Call your sister first, plainly, one human being to another.",
        tactic: "Recovery. The broadcast was a two-minute detour. The disclosure travels through calls, not bulletins.",
        nextSceneId: "the-sister-call",
        isOptimal: true,
      },
    ],
  },

  {
    id: "mil-first-derail",
    backgroundId: "apartment",
    mood: "tense",
    presentCharacterIds: ["inner-voice"],
    dialog: [
      {
        speakerId: "inner-voice",
        text: "You have his mother's number up. Consider where he is standing as it rings: in her kitchen, mid-morning, already halfway through his account. Calling into that room first does not read as grace to her. It reads as the guilty party checking in. You can call her, and you will, but not before your own people have the true version in hand.",
        emotion: "knowing",
        tone: "tactical",
      },
    ],
    choices: [
      {
        id: "reorder-sister-first",
        text: "Put his mother back down the list. Call your sister first.",
        tactic: "Recovery. Sequence corrected. Your anchor people go before the house that already holds his side.",
        nextSceneId: "the-sister-call",
        isOptimal: true,
      },
    ],
  },

  {
    id: "ending-leaked",
    backgroundId: "apartment",
    mood: "cold",
    isEnding: true,
    outcomeType: "neutral",
    endingTitle: "His Version, First",
    endingLearnPrompt:
      "By Tuesday your mother rings, careful and sad, having 'heard.' What she heard was assembled in his mother's kitchen on Saturday afternoon: blindsided, heartbroken, possibly someone else. You are now explaining into a frame you did not set, which is the hardest position from which to sound calm. The vacuum was never neutral. The recovery is real but slower: the two-sentence version, held consistently from here, will still out-last his account over a year. It just has to climb out of a hole first. Next time, you make the first call.",
    dialog: [
      {
        speakerId: "inner-voice",
        text: "Three days of quiet, and then the phone. Not you telling. You answering. The frame is already built and it is not yours.",
        emotion: "serious",
      },
    ],
    choices: [],
  },

  // ===================================================================
  // THE SISTER CALL
  // ===================================================================
  {
    id: "the-sister-call",
    backgroundId: "apartment",
    mood: "cold",
    presentCharacterIds: ["the-sister", "inner-voice"],
    dialog: [
      {
        speakerId: "the-sister",
        text: '"Hey. Everything okay? You never call on a Saturday."',
        emotion: "concerned",
      },
      {
        speakerId: "inner-voice",
        text: "She already knows some of it; she has held the account for months. But there is a difference between suspecting and being told, and how you say it now becomes the template she uses when someone asks her what happened. Give her something short enough to repeat without editing.",
        emotion: "knowing",
        tone: "tactical",
      },
    ],
    choices: [
      {
        id: "two-sentence-version",
        text: '"[Him] and I are separating. It is decided, it is being handled properly, and I am okay. I am not going to get into the details, and I would ask you not to pass them around either. I wanted you to hear it from me first, before anyone else says anything."',
        tactic: "The two-sentence version. Two sentences of fact, one boundary, one reason for calling. No case, no incident list, no diagnosis of him. The brevity is the credibility: people trust the account that is not trying to win them. It is also the exact thing she can repeat verbatim, which means your version travels intact instead of degrading through paraphrase.",
        nextSceneId: "the-smear-returns",
        isOptimal: true,
        event: "restraint-shown",
      },
      {
        id: "full-case",
        text: "Tell her the whole of it. Nineteen years, the specific incidents, the slow way it worked, so that at least one person understands why.",
        tactic: "The full case is the thing you most want to give, and the one that costs the most. It turns your sister into a witness for a prosecution, invites her to weigh evidence and therefore to doubt it, and produces a version too long and too heated to repeat cleanly. The people who love you do not need the case to believe you. The people who do not will not be moved by it.",
        nextSceneId: "litigate-derail",
        isOptimal: false,
      },
      {
        id: "recruit-army",
        text: '"Can you call the aunts today? I need people to know the truth before he gets to them and spins it."',
        tactic: "Recruiting her into a counter-campaign matches his move exactly and forfeits your one structural advantage: being the person who is not running a campaign. The moment there are two operations phoning relatives, the family sees symmetry, a messy couple slinging versions, and the calm-versus-frantic contrast that was doing your work quietly is gone.",
        nextSceneId: "recruit-derail",
        isOptimal: false,
      },
    ],
  },

  {
    id: "litigate-derail",
    backgroundId: "apartment",
    mood: "tense",
    presentCharacterIds: ["the-sister", "inner-voice"],
    dialog: [
      {
        speakerId: "the-sister",
        text: '"Okay. Okay, slow down. I believe you, I do. It is just a lot, all at once, and I do not know what to do with all of it."',
        emotion: "concerned",
      },
      {
        speakerId: "inner-voice",
        text: "There it is. Even from someone on your side, the long case produces the same response: overwhelm, then a step back to sort it out. You did not need to prove it to her. Give her the short version she can actually carry, and let the detail go.",
        emotion: "knowing",
        tone: "tactical",
      },
    ],
    choices: [
      {
        id: "compress-to-two-sentence",
        text: '"You are right. Here is the whole of what you need: we are separating, it is being handled properly, and I am okay. That is it. You do not have to do anything with the rest."',
        tactic: "Late recovery. The case was said and cannot be unsaid, but the two-sentence version can still become the thing she repeats. Compress, and stop.",
        nextSceneId: "the-smear-returns",
        isOptimal: true,
      },
    ],
  },

  {
    id: "recruit-derail",
    backgroundId: "apartment",
    mood: "tense",
    presentCharacterIds: ["the-sister", "inner-voice"],
    dialog: [
      {
        speakerId: "the-sister",
        text: '"I mean, I can, if you want. But it is going to look like we are ganging up, is it not? People talk about who called them first."',
        emotion: "concerned",
      },
      {
        speakerId: "inner-voice",
        text: "She is right, and she has just handed you the correction for free. A phone tree reads as a phone tree. The advantage you are about to spend is the only one he cannot copy: you are the one who did not organise a campaign. Do not spend it.",
        emotion: "knowing",
        tone: "tactical",
      },
    ],
    choices: [
      {
        id: "stand-down-the-army",
        text: '"No. You are right, forget that. Just, if anyone asks you, keep it to: we are separating, it is being handled, I am okay. Nothing else. Let him be the one who is phoning everyone."',
        tactic: "Recovery. Stand down the campaign. One consistent line held by your anchor beats a dozen calls, and it leaves the frantic role open for him to fill.",
        nextSceneId: "the-smear-returns",
        isOptimal: true,
      },
    ],
  },

  // ===================================================================
  // THE SMEAR RETURNS
  // ===================================================================
  {
    id: "the-smear-returns",
    backgroundId: "apartment",
    mood: "tense",
    presentCharacterIds: ["her-mother", "inner-voice"],
    dialog: [
      {
        speakerId: null,
        text: "Monday evening. Your mother calls, and her voice is doing the careful thing it does when she has been told something and does not know where to put it.",
      },
      {
        speakerId: "her-mother",
        text: '"Darling, I spoke to his mother today. He is in a terrible state, apparently. He says he had no idea, that you have been distant for years, that he thinks there might be someone else. I said I was sure that was not it, but. He sounded so blindsided, love. Is there something you are not telling me?"',
        emotion: "concerned",
      },
      {
        speakerId: "inner-voice",
        text: "There is the version, back to you inside forty-eight hours, wearing his mother's sympathy and your mother's worry. Every instinct says refute it, line by line: there is no one else, he is the one who checked out, here is what actually happened. Do not. The refutation is the trap. The moment you argue his case against him, you become the second claimant in a he-said-she-said, and symmetry is the whole thing he needs. His version does not survive a year of being measured against how you actually behave. It only survives if you agree to litigate it.",
        emotion: "knowing",
        tone: "tactical",
      },
    ],
    choices: [
      {
        id: "hold-the-line",
        text: '"I am not going to get into what he is saying, Mum. Here is the whole of it from me: we are separating, it is being handled properly, and I am okay. I am not going to argue a case about it, not with you and not with anyone. Watch how each of us behaves over the next year. That will tell you more than anything either of us says this week."',
        tactic: "Hold the line. You decline the point-by-point, restate the two-sentence version unchanged, and hand her the one instruction that actually protects you: judge by conduct over time, not by claims this week. It refuses symmetry, it stays calm against his frantic, and it lets his account do the slow work of discrediting itself.",
        nextSceneId: "ending-disclosure-held",
        isOptimal: true,
        event: "restraint-shown",
      },
      {
        id: "counter-point-by-point",
        text: '"There is no one else, Mum, that is a lie. He is the one who checked out years ago. He knew exactly how bad it was, I told him a hundred times. Let me tell you what actually happened."',
        tactic: "Each individual point is true, and refuting them is still a mistake. You have just accepted his framing (that this is a dispute of fact to be settled by whoever argues best) and joined it as the opposing counsel. Your mother now holds two competing versions and the job of choosing, which is the exact position that lets relatives take sides.",
        nextSceneId: "ending-defensive-frame",
        isOptimal: false,
      },
      {
        id: "go-on-offensive",
        text: '"You want the truth? Let me tell you who he really is. Write this down, and make sure the aunts hear it too, because I am done letting him play the victim."',
        tactic: "Going on the offensive converts a private separation into a public war fought through relatives. It hands him the 'she is out of control, see what I have been living with' narrative for free, it drags the aunts into camps, and the people who lose most are the kids, who now have two families briefing against each other over their heads.",
        nextSceneId: "ending-smear-war",
        isOptimal: false,
      },
    ],
  },

  // ===================================================================
  // ENDINGS
  // ===================================================================
  {
    id: "ending-disclosure-held",
    backgroundId: "apartment",
    mood: "peaceful",
    isEnding: true,
    outcomeType: "good",
    endingTitle: "The Version That Held",
    endingLearnPrompt:
      "The disclosure has a specific shape: anchor people first and directly, a two-sentence version that is fact plus boundary and nothing more, a flat refusal to litigate the marriage, and the patience to let his account discredit itself against a year of your actual conduct. You did not win an argument on Monday. You declined to have one, which is the only way to win this particular kind. His mother will keep his version warm for a while. Your mother, and then the aunts, will watch two people over twelve months, one calm and consistent, one campaigning, and they will draw the obvious conclusion without you ever having to make the case. The restraint was the strategy.",
    dialog: [
      {
        speakerId: "inner-voice",
        text: "She was quiet for a moment, then said, 'All right, love. All right.' Not convinced, not yet. But she has the short version, and she has the instruction to watch rather than choose. That is all Monday needed to do.",
        emotion: "knowing",
      },
    ],
    choices: [],
  },

  {
    id: "ending-defensive-frame",
    backgroundId: "apartment",
    mood: "cold",
    isEnding: true,
    outcomeType: "neutral",
    endingTitle: "The Case You Won",
    endingLearnPrompt:
      "You refuted every point, and every point was true, and it still cost you. By agreeing to argue the facts, you accepted his framing: that this is a contest of accounts to be settled by whoever makes the better case. Your mother now holds two versions and the burden of choosing between them, and choosing is exactly what invites the family to split into camps. The recovery is available: stop arguing it from here, return to the two-sentence version, and let conduct over time re-open the gap. But you spent an afternoon proving a case you never needed to prove, and the proving is what let the symmetry in.",
    dialog: [
      {
        speakerId: "inner-voice",
        text: "You were right about all of it and you can feel the win curdling as you say it. She is not comforted; she is refereeing now. Two versions on her kitchen table, and a decision she did not want.",
        emotion: "serious",
      },
    ],
    choices: [],
  },

  {
    id: "ending-smear-war",
    backgroundId: "apartment",
    mood: "danger",
    isEnding: true,
    outcomeType: "bad",
    endingTitle: "The War Through the Family",
    failureBlogSlug: "architecture-of-control-how-emotional-dependency-is-built",
    failureBlogTitle: "Architecture of Control. How Emotional Dependency Is Built",
    endingLearnPrompt:
      "By the weekend there are two camps. His mother's kitchen against your mother's; aunts who have picked a side and stopped speaking to the ones who picked the other. He now has, for free, the narrative he could never have manufactured alone: 'look at the state of her, this is what I have been living with.' And the two people the whole disclosure was supposed to protect, the kids, are inside a house where both extended families are briefing against each other about their parents. The offensive felt like justice. It was the one move that hands a covert narcissist a war he wins by simply staying calmer than you in public. The discipline of the disclosure is that you never give him the symmetry, and above all you never give him the war.",
    dialog: [
      {
        speakerId: "inner-voice",
        text: "It felt like finally telling the truth. By Sunday it is trench lines, group chats gone silent, an aunt who will not come to the birthday. And him, at the centre of it, calm as anything, saying, 'See?'",
        emotion: "serious",
      },
    ],
    choices: [],
  },
];

export const divorce41: Scenario = {
  id: "divorce-4-1",
  title: "The Family Disclosure",
  tagline: "Saturday, 10 a.m. The order you tell people in is the shape of the story by Monday.",
  description:
    "Divorce-Arc, Level 4. The first time the separation is said outside the house. The lawyer is engaged, the kids have been told, and the covert-narc spouse is already seeding his version in a sympathetic kitchen. The scenario teaches information discipline: telling your anchor people first and directly, the two-sentence version (fact plus boundary, no case), the refusal to litigate the marriage, and holding the line when the smear returns secondhand so his account discredits itself against a year of your conduct.",
  tier: "vip",
  track: "divorce-arc",
  level: 4,
  order: 1,
  estimatedMinutes: 15,
  difficulty: "advanced",
  category: "narcissist",
  xpReward: 480,
  badgeId: "the-family-disclosure",
  startSceneId: "content-gate",
  prerequisites: ["divorce-3-1"],
  tacticsLearned: [
    "Sequence is the story: tell your anchor people first, directly, before his version reaches them",
    "The two-sentence version: two sentences of fact plus one boundary, no incident list, no diagnosis of him",
    "Do not litigate the marriage; the full case reads as instability and invites a debate you cannot win",
    "Refuse the counter-campaign; being the one who is not phoning relatives is your only uncopyable advantage",
    "When the smear returns, hold the line and let conduct over a year discredit his version for you",
  ],
  redFlagsTaught: [
    "The sympathy head start: he reaches a warm audience first and farms the blindsided-victim frame",
    "The vacuum that is not neutral, where 'let it come out naturally' means his version, first, unopposed",
    "The secondhand smear (distant for years, possibly someone else) arriving through a well-meaning conduit",
    "The refutation trap, where arguing his case point by point makes you the second claimant he needs",
    "The offensive that converts a private separation into a war a covert narcissist wins by staying publicly calm",
  ],
  characters: [INNER_VOICE, THE_SPOUSE, THE_SISTER, HER_MOTHER],
  scenes,
};

export default divorce41;
