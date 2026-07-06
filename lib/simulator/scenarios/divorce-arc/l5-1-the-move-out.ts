/**
 * divorce-5-1, "The Move-Out"
 *
 * Divorce-Arc, Level 5, order 1. The physical leaving. The decision
 * was spoken (divorce-1-1), the lawyer engaged, the kids told, the
 * family disclosed to (divorce-4-1). Now boxes actually leave the
 * house. The register is logistics over emotion: timing, a support
 * person, documentation, what you take versus what you fight for
 * later, and the locksmith call from the car.
 *
 * The spouse (THE_SPOUSE, the covert narcissist from tn-4-1 and the
 * earlier levels) is off-screen for most of this: away with the kids
 * for the weekend, which is precisely why the window is now. His
 * presence in the scenario is the anticipation of how he will later
 * narrate whatever you do today. That anticipation is the whole
 * discipline.
 *
 * Teaches:
 *  - Timing and safety: move in a planned window when he is away, with
 *    a support person, and with your sister holding the timeline; you
 *    are engineering the absence of a confrontation, not avoiding one.
 *  - Documentation: photograph every room before a box moves, so
 *    'she took it' and 'she trashed the place' have a dated answer.
 *  - What you take versus what you fight for later: clearly-yours plus
 *    documents plus the kids' essentials; you leave the contested
 *    high-value items for the process rather than seizing them.
 *  - The locksmith and legal sequencing: secure the place you are
 *    lawfully entitled to, on advice; you do not unilaterally lock a
 *    co-owner out of the marital home.
 *
 * Register: quiet, procedural, low affect. The quiet is the point;
 * the loudest version of this day is the worst one.
 * Voice ref: KANIKA-VOICE.md.
 */

import type { Character, Scenario, Scene } from "../../types";
import { INNER_VOICE, THE_SPOUSE } from "../../characters";

const THE_SISTER: Character = {
  id: "the-sister",
  name: "Your sister",
  description:
    "Two years older. The name on the account you opened during the infrastructure window. Today she is the support person: her car in the drive, the timeline on her phone, a witness who is not you. Steady, undramatic, does exactly what is asked.",
  traits: ["anchor", "discreet", "witness"],
  defaultEmotion: "knowing",
  gender: "female",
  personalityType: "secure-ally",
  silhouetteType: "female-athletic",
};

const THE_LOCKSMITH: Character = {
  id: "the-locksmith",
  name: "The locksmith",
  description:
    "A voice on the phone from the car. Books jobs, asks the one question that matters (whose name is on the property), and does not want to be in the middle of anything. Reasonable, incurious, quietly the person who keeps you legal.",
  traits: ["procedural", "incurious", "by-the-book"],
  defaultEmotion: "neutral",
  gender: "male",
  personalityType: "professional",
  silhouetteType: "male-average",
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
        text: "Content note. This scenario is the physical move-out. The decision has been spoken (divorce-1-1), the lawyer engaged, the kids told, the family disclosed to (divorce-4-1). Today, boxes actually leave. The register is deliberately unemotional: it teaches the operational discipline of leaving well, which is timing, documentation, restraint about what you take, and the legal sequencing of securing a home. It does not dramatise the leaving; the day is quieter than films make it, and the quiet is part of the lesson.",
      },
      {
        speakerId: null,
        text: "If today is the wrong day to rehearse this, exit. If it is the right one, continue.",
      },
    ],
    choices: [
      {
        id: "continue",
        text: "Continue.",
        tactic: "Friday, 9:00 a.m. He has the kids at his mother's until Sunday evening; it is in the calendar you both keep. Your sister arrives at eleven with her car. The removals van is booked for one. You have the house to yourself and a plan on the counter.",
        nextSceneId: "the-window",
      },
      {
        id: "exit-gate",
        text: "Exit. Return when the conditions are right.",
        tactic: "The move-out will hold. It runs on a chosen window and a clear head, not on a Friday you were talked into.",
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
    endingTitle: "Not This Window",
    endingLearnPrompt:
      "The opt-out is a complete move. A move-out done well needs a clear window and your own bandwidth, and choosing not to spend it today is legitimate. The one thing to hold in view: the good windows (him away, kids elsewhere, a support person free, the van bookable) do not arrive often, and the plan on the counter is only useful while all of those line up. Come back when they next do.",
    dialog: [
      {
        speakerId: "inner-voice",
        text: "Closed the gate. The plan folds back into the drawer. Another Friday will line up the same way, eventually.",
        emotion: "knowing",
      },
    ],
    choices: [],
  },

  // ===================================================================
  // THE WINDOW
  // ===================================================================
  {
    id: "the-window",
    backgroundId: "apartment",
    mood: "cold",
    presentCharacterIds: ["inner-voice"],
    dialog: [
      {
        speakerId: null,
        text: "The house is quiet in the specific way a house is quiet when the people who make it loud are forty miles away. On the counter: the plan, the van company's confirmation text, your sister's ETA, and a short list of what actually goes today. Not everything. What goes today.",
      },
      {
        speakerId: "inner-voice",
        text: "The whole architecture of a clean move-out is that there is no scene, because there is no audience. He is away, the kids are away, your sister is coming to be the second adult and the witness who is not you. You are not avoiding a confrontation out of fear; you are engineering its absence out of strategy. A move-out with no confrontation is one he cannot later describe as one, and a witness in the room is one he cannot later invent a version of.",
        emotion: "knowing",
        tone: "tactical",
      },
    ],
    choices: [
      {
        id: "move-in-window",
        text: "Work the window as planned. Sister at eleven as your second adult and witness, van at one, out before dark, timeline shared with her and no one else.",
        tactic: "The engineered-quiet move. Him away, a support person present, a booked van, a fixed cut-off. Every element is there to remove drama, not to hide anything: no confrontation to escalate, a witness to what actually happened, and a hard stop so the day does not sprawl into the night. Quiet is not weakness here; it is the strongest possible version of the day.",
        nextSceneId: "the-documentation",
        isOptimal: true,
        event: "optimal-with-grace",
      },
      {
        id: "move-while-home",
        text: "Wait until Sunday and do it while he is home, so it is honest and to his face rather than behind his back.",
        tactic: "Moving out in front of him is not more honest; it is more dangerous and more useful to him. It manufactures the confrontation you engineered the window to avoid, it puts you alone in a charged room, and it hands him the exact scene ('she did it in front of the kids, it was awful') he will narrate for months. The decision was already delivered to his face at the kitchen table. The logistics do not need an audience.",
        nextSceneId: "home-move-derail",
        isOptimal: false,
      },
      {
        id: "grab-contested-fast",
        text: "Forget the short list. Move fast and take everything of value while you can, the art, the good furniture, before he can stop you.",
        tactic: "Speed-and-seize turns a lawful move-out into what he will accurately call stripping the house. Taking contested, jointly-owned property before it has been divided is the one thing that converts your calm exit into his evidence, and it can put you on the wrong side of the very process you are trusting to be fair. The window is for leaving, not for winning the settlement by hand.",
        nextSceneId: "overtake-derail",
        isOptimal: false,
      },
      {
        id: "wait-right-moment",
        text: "It does not feel right today. Wait for a moment when you are calmer and more certain.",
        tactic: "There is no calmer, more certain morning coming; there is only this window, or the next time all of these pieces happen to align. 'When it feels right' is how a fully-built plan sits in a drawer for another season while you keep living inside the thing you have already decided to leave.",
        nextSceneId: "ending-deferred",
        isOptimal: false,
      },
    ],
  },

  {
    id: "home-move-derail",
    backgroundId: "apartment",
    mood: "tense",
    presentCharacterIds: ["inner-voice"],
    dialog: [
      {
        speakerId: "inner-voice",
        text: "Picture Sunday: him in the doorway, kids on the stairs, boxes half-carried, and you trying to stay calm inside the exact scene you had the power to prevent. There is nothing braver about it. The bravery was the decision, and that is already spoken. The move is logistics, and logistics do best with no one to perform to. Take the quiet window.",
        emotion: "serious",
        tone: "tactical",
      },
    ],
    choices: [
      {
        id: "back-to-window",
        text: "Keep the window. Sister at eleven, van at one, out before he and the kids are back.",
        tactic: "Recovery. The confrontation was never owed. Work the quiet window.",
        nextSceneId: "the-documentation",
        isOptimal: true,
      },
    ],
  },

  {
    id: "overtake-derail",
    backgroundId: "apartment",
    mood: "tense",
    presentCharacterIds: ["inner-voice"],
    dialog: [
      {
        speakerId: "inner-voice",
        text: "You are standing in front of the good sideboard doing sums. Stop. The day you take the contested things is the day his account of you stops being a lie. 'She waited until I was gone and emptied the house' is a story you would be handing him true, and a court does not love the spouse who divided the assets herself with a van. Leave the disputed pieces where they are. They get decided on paper, not today.",
        emotion: "knowing",
        tone: "tactical",
      },
    ],
    choices: [
      {
        id: "back-to-short-list",
        text: "Put the sideboard down. Work the short list: what is clearly yours, the documents, the kids' essentials.",
        tactic: "Recovery. The window is for leaving cleanly, not for seizing the settlement. Take what is yours and let the process hold the rest.",
        nextSceneId: "the-documentation",
        isOptimal: true,
      },
    ],
  },

  {
    id: "ending-deferred",
    backgroundId: "apartment",
    mood: "cold",
    isEnding: true,
    outcomeType: "neutral",
    endingTitle: "The Window That Passed",
    endingLearnPrompt:
      "The plan was real and the window was open, and 'not today' closed it. The scenario does not punish the deferral; it only notes the shape of what you keep paying. All the pieces that had to align (him away, kids elsewhere, your sister free, the van booked, the daylight) are now scattered again, and the plan goes back in the drawer until the next time they happen to line up, which is rarely and never on demand. The cost is another stretch of living inside the thing you have decided to leave. The window will come again. So will the pull to wait for a better-feeling one, which does not exist.",
    dialog: [
      {
        speakerId: "inner-voice",
        text: "You text your sister: not today. She replies with one word, 'okay,' and no push, which is somehow worse. The van company charges the deposit either way. The house is quiet and you are still in it.",
        emotion: "serious",
      },
    ],
    choices: [],
  },

  // ===================================================================
  // THE DOCUMENTATION
  // ===================================================================
  {
    id: "the-documentation",
    backgroundId: "apartment",
    mood: "cold",
    presentCharacterIds: ["the-sister", "inner-voice"],
    dialog: [
      {
        speakerId: "the-sister",
        text: '"I am here. Car is in the drive. Where do you want to start? Do we just, load?"',
        emotion: "concerned",
      },
      {
        speakerId: "inner-voice",
        text: "Not yet. Before a single box moves, the house gets photographed, room by room, in the state you found it this morning. It feels excessive with your sister standing there holding a roll of tape. It is the cheapest insurance you will ever buy. In three months, 'she took the good watch' and 'she left the place trashed' both need a dated, timestamped answer, and the only time to create that answer is now, while nothing has moved.",
        emotion: "knowing",
        tone: "tactical",
      },
    ],
    choices: [
      {
        id: "photograph-and-take-clearly-yours",
        text: "Photograph every room first, timestamped, including the things you are leaving. Then load only the short list: clearly yours, your documents, the kids' essentials.",
        tactic: "Document, then take-what-is-yours. The photos fix the condition and contents of the house at the moment you left, which pre-empts both accusations he has available (theft and damage). Taking only the clearly-yours items, your papers, and the kids' essentials keeps the move lawful and un-narratable. The contested valuables stay, on camera, exactly where they were.",
        nextSceneId: "the-locksmith",
        isOptimal: true,
        event: "restraint-shown",
      },
      {
        id: "take-contested-now",
        text: "Photograph nothing, but do take the jewellery and the two good pieces now, quietly, to secure them before he can move them.",
        tactic: "Securing the contested items yourself is the move that undoes the whole day. Without documentation you have no answer to 'the place was stripped,' and by taking the disputed valuables you have made the accusation partly true. 'Securing' assets before they are divided is not protection; it is the thing your solicitor spends the next month un-doing.",
        nextSceneId: "contested-items-derail",
        isOptimal: false,
      },
      {
        id: "skip-documentation",
        text: "Skip the photos, it feels paranoid with your sister watching. Just load the boxes and get out before you lose your nerve.",
        tactic: "Skipping documentation to save fifteen minutes and some awkwardness is a false economy. The one artefact that answers every later claim about the house is the set of photos you did not take. Nerve is not the risk today; an undocumented exit is.",
        nextSceneId: "no-record-derail",
        isOptimal: false,
      },
    ],
  },

  {
    id: "contested-items-derail",
    backgroundId: "apartment",
    mood: "tense",
    presentCharacterIds: ["the-sister", "inner-voice"],
    dialog: [
      {
        speakerId: "the-sister",
        text: '"Are you sure about the jewellery? I mean, some of that is his mother\'s, is it not? I do not want you holding something that turns into a whole thing later."',
        emotion: "concerned",
      },
      {
        speakerId: "inner-voice",
        text: "She is right, and she has said it plainly enough to stop you. The disputed pieces are leverage against you the moment they are in your car and off the process. Put them back exactly where they were, and photograph the room they are in, so the record shows you left them.",
        emotion: "knowing",
        tone: "tactical",
      },
    ],
    choices: [
      {
        id: "return-and-document",
        text: "Put the contested pieces back where they were. Photograph every room, timestamped. Then load only what is clearly yours.",
        tactic: "Recovery. Un-take the disputed items, create the record, and leave the settlement to the settlement.",
        nextSceneId: "the-locksmith",
        isOptimal: true,
      },
    ],
  },

  {
    id: "no-record-derail",
    backgroundId: "apartment",
    mood: "tense",
    presentCharacterIds: ["the-sister", "inner-voice"],
    dialog: [
      {
        speakerId: "inner-voice",
        text: "You have a box in your arms and the first photo untaken. Set it down. The photos are not paranoia; they are the only version of today that will still exist in three months, when memory has been replaced by whichever account is louder. Your sister will hold the tape for four more minutes. Walk the rooms with your phone first.",
        emotion: "serious",
        tone: "tactical",
      },
    ],
    choices: [
      {
        id: "document-first",
        text: "Set the box down. Walk every room, photograph it timestamped, then load.",
        tactic: "Recovery. Four minutes of documentation now answers three months of claims later.",
        nextSceneId: "the-locksmith",
        isOptimal: true,
      },
    ],
  },

  // ===================================================================
  // THE LOCKSMITH
  // ===================================================================
  {
    id: "the-locksmith",
    backgroundId: "apartment",
    mood: "cold",
    presentCharacterIds: ["the-locksmith", "inner-voice"],
    dialog: [
      {
        speakerId: null,
        text: "One-forty. The van is loaded, the house is photographed, the short list is in the car. You are in the passenger seat with the engine off and the locksmith's number up. Two places have locks that matter today: the flat you are moving into, which is yours on a signed tenancy, and the marital home behind you, which is on the mortgage in both names.",
      },
      {
        speakerId: "inner-voice",
        text: "The instinct, sitting here with the house in the mirror, is to secure everything, including that house, so he cannot get to the things you left. Hold it. You secure what you are lawfully entitled to secure. The new flat is unambiguously that. The marital home, jointly owned, is not; changing its locks to keep a co-owner out is not a boundary, it is a legal exposure, and your solicitor's exact words this week were 'do not touch the locks on the family home.' The locksmith is for the flat you are driving to.",
        emotion: "knowing",
        tone: "tactical",
      },
    ],
    choices: [
      {
        id: "lawful-locksmith-from-car",
        text: 'Call the locksmith for the new flat only. When he asks, "and whose name is the property in?" you say yours, on your tenancy. Leave the marital-home keys accounted for per your solicitor. Then drive.',
        tactic: "The lawful sequence. You secure the home you are entitled to secure, you answer the one question that keeps the job clean (whose name is on it), and you leave the jointly-owned house untouched for the process to divide. Same practical safety, none of the exposure. The locksmith's question is not an obstacle; it is the line you want to stay on the right side of.",
        nextSceneId: "ending-clean-exit",
        isOptimal: true,
        event: "restraint-shown",
      },
      {
        id: "unilateral-lockout",
        text: "Have him do both: the new flat, and swing by the marital home first and change those locks too, so he comes back Sunday to a house he cannot enter.",
        tactic: "Locking a co-owner out of a jointly-owned home is not leverage; it is often unlawful, and it is exactly the incident he needs. He comes back to a changed lock, calls the police or his solicitor, and overnight the calm, documented person who left cleanly becomes the one who barricaded him out of his own house. You would be trading a strong legal position for one dramatic, losable evening.",
        nextSceneId: "ending-lockout",
        isOptimal: false,
      },
      {
        id: "change-nothing",
        text: "You are exhausted. Skip the locksmith entirely for now, deal with keys and locks some other week.",
        tactic: "Doing nothing is safer than the unlawful lockout, but it leaves your new flat un-secured with your address now known, and the key situation between the two homes fuzzy and undocumented. Securing your own place is not the aggressive move; it is the basic one. The thing to skip was never the flat's locks, only the marital home's.",
        nextSceneId: "ending-porous",
        isOptimal: false,
      },
    ],
  },

  // ===================================================================
  // ENDINGS
  // ===================================================================
  {
    id: "ending-clean-exit",
    backgroundId: "apartment",
    mood: "peaceful",
    isEnding: true,
    outcomeType: "good",
    endingTitle: "The Quiet Exit",
    endingLearnPrompt:
      "The move-out has a specific, unglamorous shape: a window engineered so there is no confrontation to escalate; a support person who is also a witness; the whole house photographed before anything moved; only the clearly-yours items, the documents, and the kids' essentials taken; the contested valuables left on camera for the process; and locks changed only on the home you are lawfully entitled to secure. None of it is dramatic, and that is the achievement. There is no scene for him to narrate, no seized asset to point at, no unlawful lockout to report. Just a documented, lawful, quiet departure that leaves your legal position as strong tonight as it was this morning. The loudest version of this day was always the worst one; you chose the quiet one on purpose.",
    dialog: [
      {
        speakerId: "inner-voice",
        text: "New flat, 4:00 p.m. Boxes in the hall, a new key that is only yours, the photos backed up twice. Your sister makes tea in a kitchen you have never stood in before. Nothing happened today, which is precisely what you spent weeks arranging. The quiet is not emptiness. It is the sound of a plan that held.",
        emotion: "knowing",
      },
    ],
    choices: [],
  },

  {
    id: "ending-lockout",
    backgroundId: "apartment",
    mood: "danger",
    isEnding: true,
    outcomeType: "bad",
    endingTitle: "The Locked Door",
    failureBlogSlug: "architecture-of-control-how-emotional-dependency-is-built",
    failureBlogTitle: "Architecture of Control. How Emotional Dependency Is Built",
    endingLearnPrompt:
      "Sunday evening he comes back to the family home, in both your names, and his key does not turn. Within the hour there is a phone call you do not want, from a solicitor or an officer, and the single most useful sentence he now owns: 'she locked me out of my own house.' Everything you did right this morning (the engineered window, the witness, the photographs, the restraint about the valuables) is now standing behind one unlawful act that a covert narcissist could not have manufactured on his own and that you handed him for the price of one locksmith call. Securing a home you are legally entitled to secure is protection. Locking a co-owner out of a jointly-owned one is the trade of a strong position for a losable night.",
    dialog: [
      {
        speakerId: "inner-voice",
        text: "The locksmith did both, and it felt, for about an hour, like taking the house back. Then Sunday, then the phone, then the word 'unlawful' in a stranger's calm voice. The strong clean day you built is now the thing your solicitor has to explain.",
        emotion: "serious",
      },
    ],
    choices: [],
  },

  {
    id: "ending-porous",
    backgroundId: "apartment",
    mood: "cold",
    isEnding: true,
    outcomeType: "neutral",
    endingTitle: "The Unlocked Flat",
    endingLearnPrompt:
      "You avoided the unlawful move, which matters, but you also skipped the basic one. Your new flat is un-secured with an address he can find, and the key arrangement between the two homes is undocumented and fuzzy, the kind of loose end that turns into a 3 a.m. worry the first week you live alone. Securing the place you are lawfully entitled to secure was never the aggressive act; it was the floor. The recovery is a single call on Monday. But the first nights in a new place are the ones where the loose end costs the most sleep, and the whole point of the day was to reduce, not defer, exactly that.",
    dialog: [
      {
        speakerId: "inner-voice",
        text: "New flat, 4:00 p.m. Boxes in the hall, the old landlord's lock still on the door, your address now on three forms he can see. You will call the locksmith Monday. Tonight you check the door twice and still do not quite believe it.",
        emotion: "serious",
      },
    ],
    choices: [],
  },
];

export const divorce51: Scenario = {
  id: "divorce-5-1",
  title: "The Move-Out",
  tagline: "Friday, 9 a.m. Boxes, a witness, the photographs, the locksmith call from the car.",
  description:
    "Divorce-Arc, Level 5. The physical leaving, in a register of logistics over emotion. He is away with the kids for the weekend, which is why the window is now. The scenario teaches operational move-out strategy: timing and a support person, documenting the whole house before anything moves, taking only what is clearly yours while leaving contested valuables for the process, and the legal sequencing of the locksmith (securing the home you are lawfully entitled to, never unilaterally locking a co-owner out). The quiet, documented exit is the strong one.",
  tier: "vip",
  track: "divorce-arc",
  level: 5,
  order: 1,
  estimatedMinutes: 15,
  difficulty: "advanced",
  category: "narcissist",
  xpReward: 500,
  badgeId: "the-move-out",
  startSceneId: "content-gate",
  prerequisites: ["divorce-4-1"],
  tacticsLearned: [
    "Engineer the window: move while he is away, with a support person who is also a witness, and a fixed cut-off",
    "Document before you touch anything: photograph every room timestamped to pre-empt both theft and damage claims",
    "Take only the clearly-yours items, your documents, and the kids' essentials; leave contested valuables for the process",
    "Secure the home you are lawfully entitled to (the new flat); never change the locks on a jointly-owned marital home",
    "Quiet over dramatic: a move-out with no confrontation is one he cannot narrate as one",
  ],
  redFlagsTaught: [
    "The false honesty of moving out in front of him, which manufactures the confrontation the window was built to avoid",
    "Speed-and-seize, where taking contested assets turns a lawful exit into the stripping-the-house accusation, made true",
    "Skipping documentation, which leaves every later claim about the house unanswerable",
    "The unilateral lockout of a co-owner, an often-unlawful act that hands a covert narcissist his best sentence",
    "Deferring for a calmer, more certain morning that does not exist, while the aligned window closes",
  ],
  characters: [INNER_VOICE, THE_SPOUSE, THE_SISTER, THE_LOCKSMITH],
  scenes,
};

export default divorce51;
