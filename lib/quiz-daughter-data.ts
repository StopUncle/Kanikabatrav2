// The Daughter Pattern Assessment, questions, types, and scoring.
//
// A 20-scenario assessment for adult children of (likely) narcissistic mothers,
// scoring on two parallel axes:
//
//   1. Daughter Pattern (primary axis): which trauma response shape did
//      twenty years in the household build into the user's nervous system?
//      Six profiles. Hypervigilant / Fawn / Over-Functioner / Scapegoat /
//      Golden Cage / Sovereign.
//
//   2. Mother NPD Signal (secondary axis): based on the user's recognition
//      of specific NPD-coded behaviours, how strongly does her mother
//      match the clinical pattern? Returns one of four bands —
//      Likely NPD / Trait-Heavy / Difficult-but-not-NPD / Unlikely NPD.
//
// IMPORTANT: This is not a clinical instrument and not a diagnosis.
// See `DAUGHTER_QUIZ_INFO.disclaimer` for the full text. Disclaimers
// must surface on every page, landing, take, results.
//
// Voice locked to reference/KANIKA-VOICE.md throughout: specific brand-
// and-object anchors, named tactics, old-money softeners, scenes ending
// on physical beats. No life-coach voice. No reassurance.

export type DaughterType =
  | "hypervigilant"
  | "fawn"
  | "over-functioner"
  | "scapegoat"
  | "golden-cage"
  | "sovereign";

export type MotherSignalBand =
  | "likely-npd"
  | "trait-heavy"
  | "difficult"
  | "unlikely";

export type RecoveryStage = "early" | "middle" | "late";

export interface DaughterAnswer {
  id: string;
  text: string;
  /** Which daughter-pattern type this answer points to. */
  type: DaughterType;
  /**
   * Mother-NPD signal weight this answer contributes (0-3).
   * 0 = neutral / unrelated to NPD pattern.
   * 1 = mild signal (could be a difficult mother).
   * 2 = moderate signal (matches NPD-trait-heavy pattern).
   * 3 = strong signal (matches diagnostic NPD criteria).
   */
  motherSignal: number;
}

export interface DaughterQuestion {
  id: number;
  title: string;
  scenario: string;
  answers: DaughterAnswer[];
  /**
   * Question category, "self" probes the user's own pattern,
   * "mother" probes the mother's behaviour. Used by scoring to weight
   * the two axes correctly.
   */
  category: "self" | "mother";
}

export interface DaughterScores {
  hypervigilant: number;
  fawn: number;
  "over-functioner": number;
  scapegoat: number;
  "golden-cage": number;
  sovereign: number;
}

export interface DaughterProfile {
  type: DaughterType;
  name: string;
  tagline: string;
  description: string;
  childhoodPattern: string;
  adultPattern: string;
  blindSpots: string[];
  recoveryMove: string;
  /** What the next 12 months of recovery looks like for this type. */
  twelveMonthArc: string;
}

export interface DaughterDiagnosis {
  primaryType: DaughterType;
  primaryScore: number;
  secondaryType: DaughterType;
  secondaryScore: number;
  motherSignal: MotherSignalBand;
  motherSignalScore: number;
  recoveryStage: RecoveryStage;
  /** Headline label combining type + mother signal + stage. */
  compositeLabel: string;
  description: string;
}

// ---------------------------------------------------------------------------
// The six daughter profiles.
//
// Each profile is written for the woman who got it, not for a clinician
// reading over her shoulder. Specific. Recognisable. Kanika voice. The
// blindSpots are written so the woman who got this type sees herself
// in them and feels the recognition land before the recovery move arrives.
// ---------------------------------------------------------------------------

export const DAUGHTER_PROFILES: Record<DaughterType, DaughterProfile> = {
  hypervigilant: {
    type: "hypervigilant",
    name: "The Hypervigilant",
    tagline: "She reads the room before she enters it.",
    description:
      "Your nervous system was trained, from age four, that the parent's mood was the load-bearing fact of the room and that catching it before it broke was your job. You do this in every room you enter now. You read a partner's face the way other people read the weather. You know, with the precision of long training, when something is about to go wrong before the person whose mood is about to go wrong knows it themselves.",
    childhoodPattern:
      "You were the early-warning system. You knew, by the sound of her car in the driveway, what version of her was about to come through the front door. You learned to soften the air before she entered it.",
    adultPattern:
      "You over-text when he's quiet. You re-read his messages three times for tone. You scan group chats for who hasn't replied. You assume the silence means rejection, not because you're paranoid, but because in your house, silence was always pre-attack.",
    blindSpots: [
      "You experience normal-couple silences as emergencies that need fixing",
      "You sometimes choose anxious-attached partners because the calm ones feel suspicious",
      "You confuse 'I am the only one paying attention to this' with 'I am the only one who cares'",
    ],
    recoveryMove:
      "Your single most useful intervention is the eleven-minute outlast, when you feel the urge to text/check/scan, you put the phone face-down and wait eleven minutes, doing literally anything else. The urge will peak at four minutes and resolve at eleven. Your nervous system needs to learn that the catastrophe doesn't arrive when you stop watching for it.",
    twelveMonthArc:
      "Month one: the eleven-minute outlast becomes a tool. Month three: you notice you can sit through a partner's quiet ten-minute drive without inventing a problem. Month six: you make a friend who is calm without it feeling boring. Month twelve: someone else's mood passes through a room you're in and you don't catch it. You watch it pass.",
  },
  fawn: {
    type: "fawn",
    name: "The Fawn",
    tagline: "Apologise first. Sort it out later.",
    description:
      "The fight-flight-freeze trauma response model has a fourth option that most therapy curricula skim past: fawn. You learned, before you could name it, that the safest response to a threat was to please it. Your body deploys this reflex now, under any pressure, in any conflict, with anyone. You apologise in the supermarket queue. You apologise to your boss for the thing your colleague did. You apologise to the man on the train who stepped on your foot.",
    childhoodPattern:
      "The fastest way to make her stop was to agree with her. About everything. Including the things you did not agree about. You learned to apologise for behaviours you did not perform, because the apology stopped the storm. Your sense of what is true got bent around what was safe.",
    adultPattern:
      "You self-erase. In conflict, you cannot locate your own position because you've been finding the other person's position so reflexively for so long. You leave conversations realising you've agreed to things you don't believe. You date men whose preferences you adopt within six weeks.",
    blindSpots: [
      "You think you 'don't care' about most things, you have, in fact, lost track of caring",
      "You confuse self-erasure with being easy-going, and read your partner's frustration with it as them being demanding",
      "You apologise for crying. You apologise for being tired. You apologise for needing food.",
    ],
    recoveryMove:
      "Before any conversation that might involve disagreement, write down, privately, on paper, what *you* think. One sentence. Don't share it. Just have it. The act of locating your own position before entering the room is what re-trains the muscle the household trained out of you. Over months, the position-locating becomes automatic. Over years, you find you have preferences again.",
    twelveMonthArc:
      "Month one: writing down your position before a hard conversation feels strange. Month three: you catch yourself almost-apologising for something that wasn't your fault and stop mid-sentence. Month six: you say 'no' to a request from a friend and don't follow it with three sentences of justification. Month twelve: you eat what you actually want for dinner.",
  },
  "over-functioner": {
    type: "over-functioner",
    name: "The Over-Functioner",
    tagline: "If she doesn't do it, no one will.",
    description:
      "You were the parentified child, promoted, against your will and often before age ten, into the role of household manager. You ran the calendar, the emotional logistics, the explanations to the relatives. You are still doing this. Your friends call you organised. Your colleagues call you reliable. Your partners call you, eventually, exhausting, because nobody can be loved the way you can be relied on, and you've never quite learned the difference.",
    childhoodPattern:
      "You knew her medication schedule, her boss's name, her sister's grievances. You were the one who remembered the bills. You were ten years old, certainly no older, when you started managing an adult woman's life on her behalf because she could not.",
    adultPattern:
      "You manage your friends' moods. You confirm everyone's reservations. You text the morning of to make sure everyone is on time. You are the one who makes the spreadsheet for the holiday. You are also the one who is, somewhat quietly, depleted in a way nobody around you has noticed because they have never seen you not-functioning.",
    blindSpots: [
      "You confuse being needed with being loved",
      "You don't actually know how to receive, you redirect care into a small task you can do for the person caring for you",
      "You hold low-grade contempt for people who let things slip; that contempt is the leak telling you the load is too heavy",
    ],
    recoveryMove:
      "Pick one thing you currently manage that is not, on inspection, yours to manage. Stop doing it. Tell no one. Watch what happens. Most of the time, the system either self-corrects or the person whose responsibility it actually was steps in. The world does not collapse. This is the data your nervous system needs to learn that you are not, in fact, the load-bearing wall of every room you enter.",
    twelveMonthArc:
      "Month one: you let one logistical task slip. The world doesn't end. Month three: you say no to organising the family event. Someone else organises it badly; the relatives still come. Month six: you take a holiday and don't pre-arrange backup cover for everyone else's lives. Month twelve: you have hobbies again. You have time. You have, somewhat to your surprise, a little body fat back on, because you are no longer running on the cortisol of being indispensable.",
  },
  scapegoat: {
    type: "scapegoat",
    name: "The Scapegoat",
    tagline: "She's the one who 'always overreacts.'",
    description:
      "Every NPD household has a designated difficult one. That was you. Your sibling, the golden child, was the mirror that showed her the version of herself she liked. You were the contrast that made the mirror work. You held the family's projected shame and you got blamed for the household's tension because someone had to be blamed and she could not be. You are now an adult who is still, to your faint horror, the one who 'always overreacts' in family group chats about events you remember more accurately than anyone.",
    childhoodPattern:
      "You were 'too sensitive,' 'too dramatic,' 'too much.' Your accurate observation that something was wrong was treated as the wrong itself. You learned, painfully, that being right made things worse, that the family system required your silence as the price of dinner.",
    adultPattern:
      "You apologise for noticing things. You doubt your own memory of events because the household consensus was always against your memory. You stay quiet at work even when you're right, because you've been trained that being right has a price. Sometimes you swing the other way and explode, not because the trigger was big, but because you spent twenty years not exploding at the bigger ones.",
    blindSpots: [
      "You read your accurate emotional read of a situation as 'overreacting' before checking",
      "You sometimes pre-blame yourself in conversations to beat the other person to it",
      "Your siblings, especially the golden one, may not be your allies, however much you want them to be",
    ],
    recoveryMove:
      "Start a single private file, paper or notes app, where you write down events that happen in family interactions, with dates and your own read of them. Not for confrontation. For your own memory. Within three months of doing this, you will have an external record that confirms what you have always remembered, and the gaslit feeling will start lifting. The file is what gives you back your reality.",
    twelveMonthArc:
      "Month one: the file feels weird. Like surveillance. Month three: you check the file and confirm your memory of an event your sibling has 'misremembered.' Something settles. Month six: you stop arguing in the family group chat. The lack of supply visibly destabilises the system. Month twelve: you have, somewhat unexpectedly, become harder to scapegoat, not because you fought back, but because you stopped showing up to the role.",
  },
  "golden-cage": {
    type: "golden-cage",
    name: "The Golden Cage",
    tagline: "Approved of. Trapped.",
    description:
      "You were the golden child and the trap, which most therapy frameworks miss, is that the golden child has the harder recovery, not the easier one. The scapegoat at least knew something was wrong; the golden child got the carrots and the praise and the 'you're so much more mature than your sister,' and was therefore enrolled in the system without ever consciously consenting. You learned that her approval was the air in the room. You optimised for the approval. You won. You are now an adult who has never, internally, been allowed to disappoint her.",
    childhoodPattern:
      "She was proud of you. You knew it. You also knew the conditions under which she was proud of you, and you stayed, with what was almost pathological precision, inside those conditions. You did not become an artist when you wanted to. You did not date the person you wanted. You did the things that kept her proud, and her pride was real, which is the cruellest part.",
    adultPattern:
      "You are high-achieving. You are also vaguely numb. The life you live looks correct on paper and feels, in private, like someone else's. You suspect you have replicated some of her patterns yourself, you can be, in your own friendships, a small version of her. You are the only one of the daughter types who is statistically likely to score elevated on the [Dark Mirror Assessment](/quiz)'s Narcissistic axis, because the household selected for the same trait pattern in you.",
    blindSpots: [
      "You confuse your mother's approval with your own preferences",
      "You may treat your own children, partners, or friends with the same conditional warmth you grew up with, without noticing",
      "You experience genuine disappointment from her as more painful than most people experience genuine emergencies",
    ],
    recoveryMove:
      "The hardest move available to you is also the most diagnostic one: do something this month that you know she will disapprove of. Not as rebellion, as data. Take the holiday she'll dislike. Take the haircut. Take the relationship choice. Notice what your body does when she finds out. The intensity of that body reaction is the measurement of how much of your life has been calibrated to her opinion. The work is to feel that reaction and not undo the choice.",
    twelveMonthArc:
      "Month one: the disapproval-on-purpose move terrifies you in advance and is anti-climactic in execution. Month three: you start noticing how often, in any decision, her opinion arrives in your head before yours does. Month six: you have a preference she doesn't know about. Month twelve: you find out who you would have been at 22 if the household had been different. That woman has been waiting.",
  },
  sovereign: {
    type: "sovereign",
    name: "The Sovereign",
    tagline: "She named it. She left it. She rebuilt.",
    description:
      "You scored as a Sovereign, which means one of two things: either you have done substantial recovery work already and your nervous system has settled into a new baseline, or, less commonly, your mother is genuinely difficult but not NPD, and the patterns the household installed in you were less structural than this assessment is built to detect. Either way, you are not, at this moment, in active dysregulation about her. That is rarer than you think.",
    childhoodPattern:
      "Your childhood may have included some of the patterns this assessment names, but the household had enough other adults, enough other rooms, or enough quiet that your nervous system was not formed in chronic threat detection. Or you have been doing the work, therapy, no-contact, grey rock, community, long enough that the old patterns have lost their grip.",
    adultPattern:
      "You can sit through silence without inventing a problem. You can disagree with someone without erasing yourself. You can be needed without being defined by it. You can be approved-of without bending. The work, if you are in active recovery, is to not get cocky, recovery is a maintenance practice, not an achievement. The next bad week will test the baseline.",
    blindSpots: [
      "You may underestimate how much the work continues, the next big stressor will surface old patterns you thought you'd retired",
      "Your friends who are still in the soup may, occasionally, find your settledness alienating; this is information about them, not you",
      "You may find yourself coaching or rescuing people in earlier stages, which is its own version of over-functioning if you don't watch it",
    ],
    recoveryMove:
      "Your work is now structural maintenance, not crisis intervention. A weekly hour of body work (not therapy, body. Strength training, swimming, dance, walking). A monthly check-in with the file (the dated record of where you came from). A quarterly review of who has access to you and at what levels. The recovered nervous system needs feeding, like any garden. Tend it.",
    twelveMonthArc:
      "Month one: the maintenance practices feel light. Month three: a stressor arrives and you handle it with capacity you did not have two years ago. Month six: someone newer to recovery asks you for advice and you give it briefly, without taking on their work. Month twelve: you have the rare and underrated experience of looking at your own life and recognising it as yours.",
  },
};

// ---------------------------------------------------------------------------
// The 20 questions.
//
// Mix of self-probing (the daughter pattern) and mother-probing (the NPD
// signal). Each answer maps to one DaughterType + a motherSignal weight 0-3.
// Scenarios written as specific, recognisable moments, not abstract
// agree/disagree. Voice locked.
// ---------------------------------------------------------------------------

export const DAUGHTER_QUESTIONS: DaughterQuestion[] = [
  {
    id: 1,
    title: "Sunday, 6:14 p.m.",
    scenario:
      "Your phone screen lights up with her face. It rings four full seconds before you decide what to do. What is your body doing in those four seconds?",
    category: "self",
    answers: [
      {
        id: "1a",
        text: "My stomach drops. I'm already mentally rehearsing an apology for something I haven't been accused of yet.",
        type: "hypervigilant",
        motherSignal: 3,
      },
      {
        id: "1b",
        text: "I pick up because not picking up will create a worse problem than whatever she wants to discuss.",
        type: "fawn",
        motherSignal: 2,
      },
      {
        id: "1c",
        text: "I check whether anyone else in the family needs anything before I answer, in case I have to coordinate something.",
        type: "over-functioner",
        motherSignal: 2,
      },
      {
        id: "1d",
        text: "I let it ring through and I will, somewhat consciously, not check the voicemail until tomorrow.",
        type: "sovereign",
        motherSignal: 2,
      },
    ],
  },
  {
    id: 2,
    title: "The compliment.",
    scenario:
      "You see her at a family event and she takes you in for a moment before speaking. What does her first sentence sound like?",
    category: "mother",
    answers: [
      {
        id: "2a",
        text: '"You look so much better than last time, almost like the old you." Calibration disguised as a compliment.',
        type: "scapegoat",
        motherSignal: 3,
      },
      {
        id: "2b",
        text: '"Look at you. You really are my best." Said within earshot of the sibling she is using me to wound.',
        type: "golden-cage",
        motherSignal: 3,
      },
      {
        id: "2c",
        text: '"Hello, darling." A warm, open greeting. She is genuinely happy to see me.',
        type: "sovereign",
        motherSignal: 0,
      },
      {
        id: "2d",
        text: '"I see you finally got my message." A small jab that lets me know I have already done something wrong.',
        type: "hypervigilant",
        motherSignal: 3,
      },
    ],
  },
  {
    id: 3,
    title: "The sibling rotation.",
    scenario:
      "Growing up, the role of 'favoured child' and the role of 'difficult child' in your household were:",
    category: "mother",
    answers: [
      {
        id: "3a",
        text: "Fixed. I was the favourite (or the scapegoat) for most of my childhood, and the role didn't really change.",
        type: "golden-cage",
        motherSignal: 2,
      },
      {
        id: "3b",
        text: "Rotated. The favourite-and-the-difficult-one swapped depending on which of us was currently mirroring her best.",
        type: "scapegoat",
        motherSignal: 3,
      },
      {
        id: "3c",
        text: "I was the only child, but the dynamic was still the same. I was either approved-of or in trouble, with no third option.",
        type: "fawn",
        motherSignal: 3,
      },
      {
        id: "3d",
        text: "Neither role really applied. We were treated more or less equally. Disagreements came and went.",
        type: "sovereign",
        motherSignal: 0,
      },
    ],
  },
  {
    id: 4,
    title: "Good news week.",
    scenario:
      "You've just told her something genuinely good, a job, an engagement, a flat, a pregnancy. Within ten days, what arrives?",
    category: "mother",
    answers: [
      {
        id: "4a",
        text: "An ailment, a hospital appointment, an emotional crisis. Something that pulls the family's attention back to her with rather impressive speed.",
        type: "scapegoat",
        motherSignal: 3,
      },
      {
        id: "4b",
        text: "A subtle reframing of my news that puts her closer to its centre, she introduced me to the colleague who got me the job, she always knew this would happen, etc.",
        type: "golden-cage",
        motherSignal: 3,
      },
      {
        id: "4c",
        text: "Genuine warm congratulations. She tells everyone she's proud. There is, somewhat to my relief, no other agenda.",
        type: "sovereign",
        motherSignal: 0,
      },
      {
        id: "4d",
        text: "A list of practical concerns about the news, framed as caring. ('But have you thought about…') The concerns multiply until I'm defending the decision.",
        type: "hypervigilant",
        motherSignal: 2,
      },
    ],
  },
  {
    id: 5,
    title: "The conflict reflex.",
    scenario:
      "An ordinary disagreement happens at work, your boss has, in fact, gotten a fact wrong, and the room is looking at you for the correction. What does your body actually do?",
    category: "self",
    answers: [
      {
        id: "5a",
        text: "Apologises first, then corrects gently. The apology arrives before I've even located what I'd be apologising for.",
        type: "fawn",
        motherSignal: 2,
      },
      {
        id: "5b",
        text: "Stays silent. I'd rather let the wrong fact stand than absorb the cost of being the one who corrected it.",
        type: "scapegoat",
        motherSignal: 2,
      },
      {
        id: "5c",
        text: "Corrects clearly, briefly. Adds a graceful softener so the correction lands without anyone losing face.",
        type: "sovereign",
        motherSignal: 0,
      },
      {
        id: "5d",
        text: "Privately notes the correction and finds a backchannel way to flag it later. I don't do public corrections of authority figures.",
        type: "hypervigilant",
        motherSignal: 1,
      },
    ],
  },
  {
    id: 6,
    title: "The ask.",
    scenario:
      "She calls and the first sixty seconds are unusually warm, more than usual. You catch yourself doing what?",
    category: "mother",
    answers: [
      {
        id: "6a",
        text: "Counting. The warmth is the wrap. The ask is coming and I am bracing for it.",
        type: "hypervigilant",
        motherSignal: 3,
      },
      {
        id: "6b",
        text: "Relaxing into it for a moment, then flinching when it lands.",
        type: "fawn",
        motherSignal: 2,
      },
      {
        id: "6c",
        text: "Already mentally rearranging my schedule to accommodate whatever the ask will be.",
        type: "over-functioner",
        motherSignal: 2,
      },
      {
        id: "6d",
        text: "Listening fully. She does not, in my experience, do the warm-up-before-ask move. The warmth is just the warmth.",
        type: "sovereign",
        motherSignal: 0,
      },
    ],
  },
  {
    id: 7,
    title: "The childhood memory.",
    scenario:
      "You and a sibling (or a cousin who lived through the same household) compare a memory of a specific event from your childhood. What happens?",
    category: "mother",
    answers: [
      {
        id: "7a",
        text: "Their version is gentler than mine. They remember her as basically fine. I remember the screaming in the kitchen.",
        type: "scapegoat",
        motherSignal: 3,
      },
      {
        id: "7b",
        text: "We agree on the events but they minimise the impact. 'It wasn't that bad.' I am the one who experienced it as bad.",
        type: "fawn",
        motherSignal: 2,
      },
      {
        id: "7c",
        text: "We agree completely. Both of us know what happened. The household was hard for both of us.",
        type: "hypervigilant",
        motherSignal: 2,
      },
      {
        id: "7d",
        text: "We have a normal disagreement about details. Memories differ. Neither of us is gaslit.",
        type: "sovereign",
        motherSignal: 0,
      },
    ],
  },
  {
    id: 8,
    title: "The free Sunday afternoon.",
    scenario:
      "It is 2 p.m. on a Sunday. You have nothing scheduled. What do you do with the next three hours?",
    category: "self",
    answers: [
      {
        id: "8a",
        text: "I cannot, exactly, sit. I clean something. I text someone. I check on a friend who didn't ask to be checked on. The empty afternoon makes my body uneasy.",
        type: "over-functioner",
        motherSignal: 1,
      },
      {
        id: "8b",
        text: "I find myself drafting a text to her, even though I haven't planned to. The free afternoon produces a low-grade guilt I can only relieve by reaching out.",
        type: "fawn",
        motherSignal: 2,
      },
      {
        id: "8c",
        text: "I sit. I read. I have a coffee. Doing nothing is a thing I can, somewhat reliably, do without my body protesting.",
        type: "sovereign",
        motherSignal: 0,
      },
      {
        id: "8d",
        text: "I scan my phone for the perceived absence of someone, a partner who hasn't texted, a friend whose Stories suggest a dinner I wasn't invited to. The free afternoon goes to surveillance.",
        type: "hypervigilant",
        motherSignal: 1,
      },
    ],
  },
  {
    id: 9,
    title: "The financial entanglement.",
    scenario:
      "Money between you and her, over the course of your adult life, has been:",
    category: "mother",
    answers: [
      {
        id: "9a",
        text: "Used as a marker. She bought me things. None of it was framed as a loan. Two years later, all of it gets weaponised, 'after everything I've done for you.'",
        type: "golden-cage",
        motherSignal: 3,
      },
      {
        id: "9b",
        text: "Withheld as punishment. Promised support that vanished when I made a choice she disapproved of.",
        type: "scapegoat",
        motherSignal: 3,
      },
      {
        id: "9c",
        text: "I have been the one supporting her, financially or logistically, since I was old enough to do it.",
        type: "over-functioner",
        motherSignal: 2,
      },
      {
        id: "9d",
        text: "Boring. Money has been money. Nobody has used it as a relational tool.",
        type: "sovereign",
        motherSignal: 0,
      },
    ],
  },
  {
    id: 10,
    title: "The signature sentence.",
    scenario:
      "She has a sentence she has said your whole life, a specific phrase that, when she deploys it, produces a body reaction in you before your mind has processed it. Which one is closest?",
    category: "mother",
    answers: [
      {
        id: "10a",
        text: '"After everything I\'ve done for you." (The debt-collector register.)',
        type: "golden-cage",
        motherSignal: 3,
      },
      {
        id: "10b",
        text: '"I just worry about you, that\'s all." (The concern-as-surveillance register.)',
        type: "hypervigilant",
        motherSignal: 3,
      },
      {
        id: "10c",
        text: '"You always do this." / "You used to be such a happy child." (The you-have-broken-something register.)',
        type: "scapegoat",
        motherSignal: 3,
      },
      {
        id: "10d",
        text: "There isn't a signature sentence. She speaks like a normal person, not a script.",
        type: "sovereign",
        motherSignal: 0,
      },
    ],
  },
  {
    id: 11,
    title: "Your friend's silence.",
    scenario:
      "A close friend hasn't replied to a message for thirty-six hours. Your previous exchange was warm. What does your nervous system do?",
    category: "self",
    answers: [
      {
        id: "11a",
        text: "Authors a rejection story into the silence. By hour 24 I am, somewhat against my will, certain I have done something to upset her.",
        type: "hypervigilant",
        motherSignal: 1,
      },
      {
        id: "11b",
        text: "Sends a follow-up message that is too long, too apologetic, and explains why I am 'just checking in.'",
        type: "fawn",
        motherSignal: 1,
      },
      {
        id: "11c",
        text: "Notices the silence and then forgets about it. Friend is busy. Friend will reply. The silence is information about her week, not me.",
        type: "sovereign",
        motherSignal: 0,
      },
      {
        id: "11d",
        text: "Mentally adds it to a list of small slights I will, in some future conversation, raise as part of a larger pattern.",
        type: "scapegoat",
        motherSignal: 0,
      },
    ],
  },
  {
    id: 12,
    title: "The triangulation.",
    scenario:
      "She tells you what your father / aunt / sibling said about you. The 'message' is critical. The implicit thesis is that you are the difficult one. What do you do?",
    category: "mother",
    answers: [
      {
        id: "12a",
        text: "Carry the message as if it were true. I cannot fact-check it without sounding paranoid, so I absorb it.",
        type: "hypervigilant",
        motherSignal: 3,
      },
      {
        id: "12b",
        text: "Defend myself to her, explain at length why the criticism is wrong. The defence is its own confession that the criticism landed.",
        type: "fawn",
        motherSignal: 3,
      },
      {
        id: "12c",
        text: "Go and talk to the named third party directly. Discover, with some regularity, that they didn't say it, or said something rather different.",
        type: "sovereign",
        motherSignal: 3,
      },
      {
        id: "12d",
        text: "She doesn't deliver hearsay messages about me. This dynamic doesn't run in our family.",
        type: "sovereign",
        motherSignal: 0,
      },
    ],
  },
  {
    id: 13,
    title: "The over-functioning leak.",
    scenario:
      "Your friend group is planning a trip. Six people. Three weeks out, the plans are vague. Whose phone has the spreadsheet on it?",
    category: "self",
    answers: [
      {
        id: "13a",
        text: "Mine. Always mine. If I don't make the spreadsheet, the trip doesn't happen, and we both know it.",
        type: "over-functioner",
        motherSignal: 0,
      },
      {
        id: "13b",
        text: "Whoever's most organised. Sometimes me, sometimes someone else. We rotate.",
        type: "sovereign",
        motherSignal: 0,
      },
      {
        id: "13c",
        text: "I have, somewhat deliberately, stopped being the spreadsheet person. The trips happen anyway. Sometimes worse, but they happen.",
        type: "sovereign",
        motherSignal: 0,
      },
      {
        id: "13d",
        text: "Mine but I resent it. The contempt for the rest of the group leaks through; they notice; the trip is, by the end, slightly poisoned.",
        type: "over-functioner",
        motherSignal: 1,
      },
    ],
  },
  {
    id: 14,
    title: "The disapproval test.",
    scenario:
      "Imagine you tell her, this month, about a major life choice you know she will disapprove of, a partner, a career, a haircut, a city. What does your body do as you imagine telling her?",
    category: "self",
    answers: [
      {
        id: "14a",
        text: "Tightens. The intensity of my body's reaction is, frankly, more than the choice warrants. Her opinion has more weight in my nervous system than any other person's.",
        type: "golden-cage",
        motherSignal: 3,
      },
      {
        id: "14b",
        text: "Pre-rehearses the conversation forty times. By the time I'd actually have it, I have written and discarded eight versions of the opener.",
        type: "hypervigilant",
        motherSignal: 2,
      },
      {
        id: "14c",
        text: "Considers not telling her. Lying by omission feels safer than the disapproval.",
        type: "fawn",
        motherSignal: 2,
      },
      {
        id: "14d",
        text: "Thinks about it briefly, then tells her. Her disapproval is, certainly, uncomfortable, but it does not run my decisions.",
        type: "sovereign",
        motherSignal: 0,
      },
    ],
  },
  {
    id: 15,
    title: "The illness window.",
    scenario:
      "She is diagnosed with something. You take time off work to fly out. The trip is supposed to be about her care. Within twelve hours, what's it actually about?",
    category: "mother",
    answers: [
      {
        id: "15a",
        text: "Her treatment of the cleaner, the temperature of the room, the hospital pillow. Not the illness. The supply.",
        type: "scapegoat",
        motherSignal: 3,
      },
      {
        id: "15b",
        text: "A loyalty test. My one boundary, a flight back on Sunday, produces a four-paragraph text on Saturday night.",
        type: "fawn",
        motherSignal: 3,
      },
      {
        id: "15c",
        text: "The illness. She is genuinely unwell, genuinely scared, and the trip is, mostly, about helping her recover.",
        type: "sovereign",
        motherSignal: 0,
      },
      {
        id: "15d",
        text: "It hasn't happened. She hasn't been ill in this register, or I haven't been asked to fly out.",
        type: "sovereign",
        motherSignal: 0,
      },
    ],
  },
  {
    id: 16,
    title: "The reconciliation pull.",
    scenario:
      "It has been three months of low contact (or no contact). On a Tuesday morning, you receive a single warm text from her. What is your body's first move?",
    category: "self",
    answers: [
      {
        id: "16a",
        text: "Wants, immediately, to reply. The relief is intense. I am holding my phone before I have decided what to do.",
        type: "fawn",
        motherSignal: 2,
      },
      {
        id: "16b",
        text: "Suspects the warmth is an opener. Counts to three. The ask, I am rather sure, is coming.",
        type: "hypervigilant",
        motherSignal: 3,
      },
      {
        id: "16c",
        text: "Feels grief, briefly, for the mother who could have always sent texts like this. Reads the text twice. Doesn't reply today.",
        type: "sovereign",
        motherSignal: 1,
      },
      {
        id: "16d",
        text: "I have not been in low contact with her. We speak weekly and the rhythm has been, on the whole, all right.",
        type: "sovereign",
        motherSignal: 0,
      },
    ],
  },
  {
    id: 17,
    title: "The dating pattern.",
    scenario:
      "Looking at the men (or women) you have dated seriously, not the one-offs, the actual relationships, what is the through-line?",
    category: "self",
    answers: [
      {
        id: "17a",
        text: "I keep ending up with people whose moods I have to manage. Different faces, same nervous-system load.",
        type: "hypervigilant",
        motherSignal: 2,
      },
      {
        id: "17b",
        text: "I keep losing myself in them. Six weeks in I have adopted their preferences, their schedule, their friends. I cannot find what I want anymore.",
        type: "fawn",
        motherSignal: 2,
      },
      {
        id: "17c",
        text: "I keep being the high-functioning one. They depend on me. The relationships work for as long as I am the engine.",
        type: "over-functioner",
        motherSignal: 1,
      },
      {
        id: "17d",
        text: "The pattern has, somewhat to my surprise, changed in the last few years. My recent relationships are calmer than my earlier ones.",
        type: "sovereign",
        motherSignal: 0,
      },
    ],
  },
  {
    id: 18,
    title: "The field guide question.",
    scenario:
      "If a younger woman, a niece, a junior colleague, a cousin, confided in you that her own mother sounded a lot like yours, what would you, honestly, tell her?",
    category: "self",
    answers: [
      {
        id: "18a",
        text: "I'd downplay it. Tell her she's overreacting. Defend her mother on her behalf because that is what I have been trained to do for mine.",
        type: "fawn",
        motherSignal: 2,
      },
      {
        id: "18b",
        text: "I'd tell her exactly what I wish someone had told me at her age. Specifically. With sources. Without softening the reality.",
        type: "sovereign",
        motherSignal: 0,
      },
      {
        id: "18c",
        text: "I'd offer to manage the situation for her. Take it on. Make calls. Be the over-functioner she shouldn't have to be.",
        type: "over-functioner",
        motherSignal: 0,
      },
      {
        id: "18d",
        text: "I'd recognise her in the way you recognise someone in a hallway from a distance. Same uniform. Same training.",
        type: "scapegoat",
        motherSignal: 1,
      },
    ],
  },
  {
    id: 19,
    title: "The body honest.",
    scenario:
      "Where in your body, physically, anatomically, does the thought of her live?",
    category: "self",
    answers: [
      {
        id: "19a",
        text: "Stomach. The thought of her produces a specific stomach drop that I have had since I was small.",
        type: "hypervigilant",
        motherSignal: 2,
      },
      {
        id: "19b",
        text: "Shoulders and jaw. I notice them clench when her name comes up. Often before I have noticed the name came up.",
        type: "fawn",
        motherSignal: 2,
      },
      {
        id: "19c",
        text: "Chest. A heaviness that I have trained myself to function through.",
        type: "scapegoat",
        motherSignal: 2,
      },
      {
        id: "19d",
        text: "Nowhere in particular. The thought of her is, at this stage, a thought. My body has settled around it.",
        type: "sovereign",
        motherSignal: 0,
      },
    ],
  },
  {
    id: 20,
    title: "The sovereignty test.",
    scenario:
      "What would your life look like, today, if you knew, with complete certainty, that her opinion of your choices was no longer a factor in any decision you made?",
    category: "self",
    answers: [
      {
        id: "20a",
        text: "Significantly different. The career, the partner, the city, the haircut, at least one would change in a major way. I'd have to grieve.",
        type: "golden-cage",
        motherSignal: 3,
      },
      {
        id: "20b",
        text: "I don't even know. I cannot, on reflection, locate what I would want without her opinion in the room. That is the answer.",
        type: "fawn",
        motherSignal: 2,
      },
      {
        id: "20c",
        text: "I'd stop performing for an audience that hasn't approved of me anyway. I'd, somewhat exhaustedly, get my reality back.",
        type: "scapegoat",
        motherSignal: 2,
      },
      {
        id: "20d",
        text: "More or less the same. I have, over time, gotten her opinion out of the room without her consent or notice.",
        type: "sovereign",
        motherSignal: 0,
      },
    ],
  },
];

// ---------------------------------------------------------------------------
// Scoring
// ---------------------------------------------------------------------------

const ZERO_SCORES: DaughterScores = {
  hypervigilant: 0,
  fawn: 0,
  "over-functioner": 0,
  scapegoat: 0,
  "golden-cage": 0,
  sovereign: 0,
};

/**
 * Aggregate per-type counts from a record of answers. Each answer
 * contributes one vote to its declared type. Returns absolute counts;
 * convert to percentages at the call site if needed.
 */
export function calculateDaughterScores(
  answers: Record<number, string>,
): DaughterScores {
  const scores: DaughterScores = { ...ZERO_SCORES };
  for (const question of DAUGHTER_QUESTIONS) {
    const answerId = answers[question.id];
    if (!answerId) continue;
    const answer = question.answers.find((a) => a.id === answerId);
    if (!answer) continue;
    scores[answer.type] += 1;
  }
  return scores;
}

/**
 * Sort the score record and return the top two types. Ties broken by
 * the canonical type order (the order they appear in DaughterType union),
 * which keeps results stable across reloads.
 */
export function getDaughterTypes(scores: DaughterScores): {
  primary: DaughterType;
  secondary: DaughterType;
} {
  const order: DaughterType[] = [
    "hypervigilant",
    "fawn",
    "over-functioner",
    "scapegoat",
    "golden-cage",
    "sovereign",
  ];
  const sorted = order
    .map((t) => ({ type: t, score: scores[t] }))
    .sort((a, b) => b.score - a.score);
  return {
    primary: sorted[0].type,
    secondary: sorted[1].type,
  };
}

/**
 * Sum the motherSignal weights across all answered questions. Returns a
 * number 0-60 (20 questions × max 3 each), normalised to a 0-100 scale
 * at the result step.
 */
export function calculateMotherSignal(
  answers: Record<number, string>,
): number {
  let total = 0;
  for (const question of DAUGHTER_QUESTIONS) {
    const answerId = answers[question.id];
    if (!answerId) continue;
    const answer = question.answers.find((a) => a.id === answerId);
    if (!answer) continue;
    total += answer.motherSignal;
  }
  return total;
}

/**
 * Map raw mother-signal score (0-60) to a band. Cutoffs chosen so the
 * "Likely NPD" band requires sustained recognition across multiple
 * answers, not just one or two strong matches. Tuned so a sovereign-type
 * user with a difficult-but-not-NPD mother lands in "Difficult" or
 * "Unlikely," not in "Likely NPD."
 */
export function bandMotherSignal(rawScore: number): MotherSignalBand {
  if (rawScore >= 36) return "likely-npd";
  if (rawScore >= 22) return "trait-heavy";
  if (rawScore >= 10) return "difficult";
  return "unlikely";
}

/**
 * Heuristic recovery stage. Sovereign-as-primary AND moderate mother-signal
 * → "late." Sovereign-as-primary OR low mother-signal → "middle." Anything
 * else (active dysregulation patterns dominant) → "early." This is a
 * coarse signal for the results-page narrative; not clinical.
 */
function inferRecoveryStage(
  primary: DaughterType,
  motherBand: MotherSignalBand,
): RecoveryStage {
  if (primary === "sovereign" && (motherBand === "trait-heavy" || motherBand === "likely-npd")) {
    return "late";
  }
  if (primary === "sovereign" || motherBand === "unlikely") {
    return "middle";
  }
  return "early";
}

const MOTHER_BAND_LABELS: Record<MotherSignalBand, string> = {
  "likely-npd":
    "Likely NPD-pattern mother",
  "trait-heavy":
    "Trait-heavy / strong NPD signal",
  difficult: "Difficult-but-not-NPD register",
  unlikely: "Unlikely NPD-pattern mother",
};

export function generateDaughterDiagnosis(
  answers: Record<number, string>,
): DaughterDiagnosis {
  const scores = calculateDaughterScores(answers);
  const { primary, secondary } = getDaughterTypes(scores);
  const motherSignalScore = calculateMotherSignal(answers);
  const motherSignal = bandMotherSignal(motherSignalScore);
  const stage = inferRecoveryStage(primary, motherSignal);

  const profile = DAUGHTER_PROFILES[primary];
  const compositeLabel = `${profile.name} · ${MOTHER_BAND_LABELS[motherSignal]}`;

  let description: string;
  if (stage === "late") {
    description = `You are reading as ${profile.name} on the daughter axis, with a clearly elevated mother-NPD signal. The combination, sovereign baseline + recognition of the household pattern, suggests you are deep into recovery, possibly years in. The work for you now is maintenance, not crisis intervention.`;
  } else if (stage === "middle") {
    description = `You are reading as ${profile.name}. The mother-signal sits in the ${MOTHER_BAND_LABELS[motherSignal].toLowerCase()} band, which suggests the household pattern was either lighter than the diagnostic threshold, or you have already done substantial work to settle the worst of it. The next twelve months are about consolidating gains.`;
  } else {
    description = `You are reading as ${profile.name}, with a ${MOTHER_BAND_LABELS[motherSignal].toLowerCase()}. The daughter-pattern is currently active, your nervous system is still doing the things the household trained it to do and the work is, somewhat unavoidably, ahead of you rather than behind. This is, in fact, the right time to start.`;
  }

  return {
    primaryType: primary,
    primaryScore: scores[primary],
    secondaryType: secondary,
    secondaryScore: scores[secondary],
    motherSignal,
    motherSignalScore,
    recoveryStage: stage,
    compositeLabel,
    description,
  };
}

// Mother-signal copy for the results-page band card.
export const MOTHER_BAND_COPY: Record<
  MotherSignalBand,
  { name: string; description: string }
> = {
  "likely-npd": {
    name: "Likely NPD-pattern mother",
    description:
      "Your answers consistently identified behaviours that match the diagnostic profile of Narcissistic Personality Disorder, calibration compliments, story laundering, illness around your good news, surveillance disguised as concern, the signature sentence. This is not a clinical diagnosis (only a licensed clinician can give one), but it is the cluster the assessment is built to detect, and you recognised most of it.",
  },
  "trait-heavy": {
    name: "Trait-heavy / strong NPD signal",
    description:
      "Your answers identified several NPD-coded behaviours but did not saturate every axis. Possible reads: a covert / vulnerable NPD register that surfaces episodically rather than constantly; a mother with strong NPD traits who does not meet the full diagnostic bar; or a household where the pattern was real but episodic rather than continuous. The recovery work is essentially the same as for the Likely-NPD band, scaled to register.",
  },
  difficult: {
    name: "Difficult-but-not-NPD register",
    description:
      "Your answers identified some painful patterns but the cluster of NPD-specific markers didn't saturate. Possible reads: a difficult mother whose difficulty is not personality-disordered (depression, untreated trauma, cultural rigidity, or just a hard temperament); a household with one NPD parent who is not your mother; or a relationship that is genuinely strained but more bidirectional than this assessment is built for. The daughter-pattern findings still apply, the trauma response is real even if the NPD frame doesn't fit.",
  },
  unlikely: {
    name: "Unlikely NPD-pattern mother",
    description:
      "Your answers don't saturate the NPD-mother profile. Your relationship may be hard for other reasons, or it may be largely all right. The daughter-pattern result above is still meaningful, many anxious or fawn-trained nervous systems develop without an NPD mother but the diagnostic frame here may not be the right lens. If the result feels wrong, trust your read of your own life over the assessment.",
  },
};

// Quiz metadata
export const DAUGHTER_QUIZ_INFO = {
  name: "The Daughter Pattern Assessment",
  tagline: "What twenty years of being raised by her built into you.",
  description:
    "A 20-scenario assessment for adult daughters (and sons) of mothers with strong narcissistic patterns. Maps your daughter-of-narcissist trauma profile across six types. Hypervigilant, Fawn, Over-Functioner, Scapegoat, Golden Cage, Sovereign and gives an honest read on whether your mother's behaviour matches the NPD register.",
  price: 9.99,
  currency: "USD",
  questionCount: 20,
  estimatedTime: "5-7 minutes",
  disclaimer:
    "DISCLAIMER: The Daughter Pattern Assessment is for educational and reflective purposes only. It is not medical advice, not a clinical diagnosis, and not a substitute for professional psychological evaluation. This assessment was not created by licensed mental health professionals and cannot diagnose Narcissistic Personality Disorder, Cluster B traits, or any trauma response in either you or your mother. Self-report instruments are inherently limited; only a licensed clinician with a full history can provide a clinical assessment. If you are in active distress, in an unsafe family situation, or considering action based on the result, please consult a licensed mental health professional. The result is one mirror, not a verdict.",
};
