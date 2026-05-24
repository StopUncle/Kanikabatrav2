/**
 * after-him-2-2, "The Apartment"
 *
 * After-Him L2-2. Saturday afternoon. The flat audited, object by
 * object. His toothbrush. The hoodie. The book on the bedside. The
 * playlist pinned to the kitchen speaker. The teaching is the asymmetry
 * between sealing and erasing. One sealed box in a closet is sovereignty;
 * a purge into the bin is theatre. The flat becomes neutral, not
 * scrubbed.
 *
 * Exterior in form (the flat is the antagonist), interior in cast.
 * Voice: Kanika's checklist register, with affection for the artefacts
 * that were real. Female protagonist.
 *
 * Teaches:
 *  - One box, sealed, labelled, in a closet. Not the trash.
 *  - The hoodie is the renewed prescription. Do not sleep in it.
 *  - The book goes back to him or to a charity shop. Not the bedside.
 *  - The playlist gets unpinned. The songs stay yours; the surface goes.
 */

import type { Scenario, Scene } from "../../types";
import { INNER_VOICE } from "../../characters";

const scenes: Scene[] = [
  {
    id: "saturday-afternoon",
    backgroundId: "apartment",
    mood: "cold",
    presentCharacterIds: ["inner-voice"],
    dialog: [
      {
        speakerId: null,
        text: "Saturday, 2:14 p.m. Eight days. You have made the bed, watered the plant on the kitchen windowsill, eaten an apple, and now you are standing in the bedroom doorway looking at the flat the way you would look at someone else's flat.",
      },
      {
        speakerId: null,
        text: "His toothbrush is in the cup by the sink. His hoodie is over the back of the kitchen chair. The bedside table has the biography he was a hundred and forty pages into. The kitchen speaker is, at this moment, playing the collaborative playlist on shuffle.",
      },
      {
        speakerId: "inner-voice",
        tone: "tactical",
        text: "One cardboard box from the recycling pile downstairs. One Sharpie. One closet. The discipline is the same on every object: seal, do not erase.",
        emotion: "knowing",
      },
    ],
    choices: [
      {
        id: "get-the-box",
        text: "Go downstairs. Bring up a box. Begin.",
        tactic: "The starting move. The box is the move. Without the box, the audit becomes a tour of grief instead of a logistics task.",
        nextSceneId: "the-toothbrush",
        isOptimal: true,
      },
      {
        id: "purge-bin",
        text: "Skip the box. Bin everything. He is gone; his things follow.",
        tactic: "The purge is theatre. The artefacts were real. The relationship was real. The discipline of L2 is not to pretend it was not; it is to seal what was so you can stop having it open on every surface of your home.",
        nextSceneId: "the-purge",
        isOptimal: false,
      },
      {
        id: "leave-it",
        text: "Leave it. Tomorrow. The flat is fine as it is.",
        tactic: "The flat is not fine. Every object is a small fork in your attention. Cumulatively, they replace the man with a museum of him, which is operationally worse than the man.",
        nextSceneId: "left-as-is",
        isOptimal: false,
      },
    ],
  },

  {
    id: "the-toothbrush",
    backgroundId: "apartment",
    mood: "cold",
    presentCharacterIds: ["inner-voice"],
    dialog: [
      {
        speakerId: null,
        text: "The toothbrush. Blue, the angled head he insisted on. Three weeks of use left in the bristles. It is the smallest item on the list and the one that is, somehow, the worst to look at.",
      },
      {
        speakerId: "inner-voice",
        tone: "tactical",
        text: "Toiletries are not artefacts. They are consumable. He has another one at his sister's by now.",
        emotion: "knowing",
      },
    ],
    choices: [
      {
        id: "bin-toothbrush",
        text: "Bin the toothbrush. The cup goes back to one toothbrush only.",
        tactic: "Correct. The toothbrush is not the relationship; it is the surface symptom of the relationship having been in the bathroom. Consumables go in the bin; the box is for keepsakes.",
        nextSceneId: "the-hoodie",
        isOptimal: true,
      },
      {
        id: "keep-toothbrush",
        text: 'Keep it in the cup. "In case he needs it back."',
        tactic: "He does not need a three-weeks-used toothbrush back. The keep-it rationale is the costume the want-to-keep wears. The toothbrush going is the cheapest item on the list and also the most operationally cleansing.",
        nextSceneId: "the-hoodie",
        isOptimal: false,
      },
    ],
  },

  {
    id: "the-hoodie",
    backgroundId: "apartment",
    mood: "cold",
    presentCharacterIds: ["inner-voice"],
    dialog: [
      {
        speakerId: null,
        text: "The hoodie. Charcoal, the one with the small hole near the cuff. He left it on the kitchen chair Tuesday before last and has not asked for it back. It smells, faintly, of him.",
      },
      {
        speakerId: "inner-voice",
        tone: "tactical",
        text: "The hoodie is the one you will be tempted to keep. Sleeping in it is not honoring the relationship. It is renewing the prescription.",
        emotion: "knowing",
      },
    ],
    choices: [
      {
        id: "box-the-hoodie",
        text: "Fold it. Into the box.",
        tactic: "The clean move. Sealed, not destroyed. He may want it; if not, it goes to a charity shop in six months, after you have not opened the box. The discipline is not to wear it once before sealing.",
        nextSceneId: "the-book",
        isOptimal: true,
      },
      {
        id: "sleep-in-hoodie",
        text: 'Sleep in it tonight. "Just tonight. Then I will box it."',
        tactic: "Just tonight is how every relapse is named. The hoodie is the dosage system the spiral runs on. The smell is the trigger; the trigger is the schedule; the schedule is what L1-2 was trying to revoke. Wearing it tonight is reopening the channel L1-2 audited closed.",
        nextSceneId: "hoodie-trap",
        isOptimal: false,
      },
      {
        id: "trash-hoodie",
        text: "Bin it. Performance over discipline.",
        tactic: "Binning a wearable item is performance. The charity shop is the structural answer; the bin is the gesture. The track does not require gestures; it requires sealing.",
        nextSceneId: "the-book",
        isOptimal: false,
      },
    ],
  },

  {
    id: "hoodie-trap",
    backgroundId: "apartment",
    mood: "tense",
    presentCharacterIds: ["inner-voice"],
    dialog: [
      {
        speakerId: null,
        text: "It is now 11:42 p.m. You are wearing the hoodie. The audit was finished three hours ago. You have been on the couch since the audit ended. You opened his Instagram twice. The second time was three minutes ago.",
      },
      {
        speakerId: "inner-voice",
        tone: "tactical",
        text: "The hoodie was the trigger. The trigger fired the schedule. The schedule routed you to the channel. Take the hoodie off now, while the calmness is back in arm's reach, and seal it in the morning.",
        emotion: "serious",
      },
    ],
    choices: [
      {
        id: "take-it-off-now",
        text: "Take it off. Drop it on the floor of the closet with the box. Tomorrow morning, seal both.",
        tactic: "Late recovery. The trigger is removed in the moment, and the structural fix is sequenced for the calm version of you in the morning. The system relearns the cost.",
        nextSceneId: "ending-late-recovery",
        isOptimal: true,
      },
      {
        id: "keep-it-on",
        text: "Keep it on. It is one night.",
        tactic: "One night becomes a week. A week becomes the smell fading. The smell fading becomes the need to be near something else of his. The whole track unravels into the trail of artefacts you spent Saturday sealing.",
        nextSceneId: "ending-hoodie-defeat",
        isOptimal: false,
      },
    ],
  },

  {
    id: "the-book",
    backgroundId: "apartment",
    mood: "cold",
    presentCharacterIds: ["inner-voice"],
    dialog: [
      {
        speakerId: null,
        text: "The biography on the bedside, his bookmark a hundred and forty pages in. The cover is the colour of dried blood. He was, when he left, three chapters from the end.",
      },
      {
        speakerId: "inner-voice",
        tone: "tactical",
        text: "The book is not yours and was never going to be. The bookmark is operational evidence he intends to finish it, which means he intends, at some point, to ask for it.",
        emotion: "knowing",
      },
    ],
    choices: [
      {
        id: "box-the-book",
        text: "Bookmark left in place. Slide into the box.",
        tactic: "Clean. If he asks, you give it back. If he never asks, the charity shop in six months. The bookmark left in is the courtesy that costs you nothing.",
        nextSceneId: "the-playlist",
        isOptimal: true,
      },
      {
        id: "start-reading-the-book",
        text: 'Start reading where his bookmark is. "I want to know what he was reading."',
        tactic: "Reading his book where he stopped is being him for an hour, in your own bed, by choice. The body learns the shape of being him. The audit is the work of unbecoming the operation of the relationship, not of importing it.",
        nextSceneId: "book-import",
        isOptimal: false,
      },
    ],
  },

  {
    id: "the-playlist",
    backgroundId: "apartment",
    mood: "cold",
    presentCharacterIds: ["inner-voice"],
    dialog: [
      {
        speakerId: null,
        text: "The kitchen speaker. The collaborative playlist is currently five tracks deep into the section he built, three of which were songs you loved before he existed.",
      },
      {
        speakerId: "inner-voice",
        tone: "tactical",
        text: "The songs are yours. The playlist surfacing them at the top of your library is not. Unpin, do not delete.",
        emotion: "knowing",
      },
    ],
    choices: [
      {
        id: "unpin-playlist",
        text: "Open Spotify. Unpin the playlist. Pin one you made before him in its place.",
        tactic: "The asymmetry from L1-2 lands again here: history is preserved, surfacing is changed. The pre-him pinned playlist is the small structural reminder that there was, and will be, taste outside this relationship.",
        nextSceneId: "the-finish-line",
        isOptimal: true,
      },
      {
        id: "delete-playlist",
        text: "Delete the playlist entirely. Both halves.",
        tactic: "Deleting his half deletes your half. The songs you put in are still in the playlist. The purge is theatre; you are erasing your own taste alongside his contribution because it is in the same file. Unpin instead.",
        nextSceneId: "the-finish-line",
        isOptimal: false,
      },
    ],
  },

  {
    id: "the-finish-line",
    backgroundId: "apartment",
    mood: "peaceful",
    presentCharacterIds: ["inner-voice"],
    dialog: [
      {
        speakerId: null,
        text: "The box has six things in it. Sealed with the brown tape. Sharpie on the lid in two words and a date: his name, today's date. You put the box in the closet behind the suitcases.",
      },
      {
        speakerId: null,
        text: "The flat looks like a flat you live in. Not scrubbed. Not haunted. A flat. The kitchen speaker is playing the playlist you made in 2019 about a year you remember liking yourself in.",
      },
    ],
    choices: [
      {
        id: "close-the-audit",
        text: "Done. Make dinner. The audit is closed.",
        tactic: "The work is done. The closure is operational, not emotional, which is the kind of closure the track is building toward.",
        nextSceneId: "ending-flat-neutral",
        isOptimal: true,
      },
    ],
  },

  // Failure / recovery branches
  {
    id: "the-purge",
    backgroundId: "apartment",
    mood: "tense",
    presentCharacterIds: ["inner-voice"],
    dialog: [
      {
        speakerId: null,
        text: "Fifteen minutes in, the bin is full. The hoodie. The book. The toothbrush. The shared coffee mug. A photo in a frame that you forgot was on the bookshelf.",
      },
      {
        speakerId: "inner-voice",
        tone: "tactical",
        text: "The purge feels like power. It is going to feel like regret on Tuesday, when you reach for the coffee mug that was actually yours and remember you binned it. Stop now. Pull what is yours out of the bin. Box the rest.",
        emotion: "serious",
      },
    ],
    choices: [
      {
        id: "recover-from-purge",
        text: "Pull the photo and the coffee mug out of the bin. Box the rest. Tape it.",
        tactic: "Late recovery. The artefacts of yours that wandered into the bin are reclaimed; his go into the box like they should have to begin with.",
        nextSceneId: "the-finish-line",
        isOptimal: true,
      },
      {
        id: "continue-purge",
        text: "Tie the bag. Take it to the bin downstairs.",
        tactic: "The bag is gone. The relationship's artefacts are in a skip on a Saturday afternoon. The pride lasts forty minutes. The audit produced a scrubbed flat, not a sealed one. The difference matters in week six.",
        nextSceneId: "ending-purged",
        isOptimal: false,
      },
    ],
  },

  {
    id: "left-as-is",
    backgroundId: "apartment",
    mood: "cold",
    isEnding: true,
    outcomeType: "neutral",
    endingTitle: "The Museum",
    endingLearnPrompt:
      "The flat is unchanged. Every object he left is where he left it. The hoodie is on the chair, the book is on the bedside, the playlist is on the kitchen speaker. By next Saturday the museum will have grown into a passive shrine, because objects untouched accrue weight. The audit waits until you do it. Schedule it next Saturday at 2 p.m. and honor the booking. The L1-2 audit closed the channels he could reach you through. The L2-2 audit closes the surface area of the flat he still occupies.",
    dialog: [
      {
        speakerId: "inner-voice",
        text: "Bedroom doorway, again. The toothbrush. The hoodie. Tomorrow.",
        emotion: "serious",
      },
    ],
    choices: [],
  },

  {
    id: "book-import",
    backgroundId: "apartment",
    mood: "tense",
    presentCharacterIds: ["inner-voice"],
    dialog: [
      {
        speakerId: "inner-voice",
        tone: "tactical",
        text: "Twenty pages in, you realise you do not actually like this book. You were borrowing his interest in it, as you borrowed enough interests in him to make the relationship feel like compatibility. Close the book. Bookmark in place. Box it.",
        emotion: "knowing",
      },
    ],
    choices: [
      {
        id: "box-it-now",
        text: "Close the book. Slide it into the box. Move on.",
        tactic: "Late recovery. The lesson lands: you do not need to import his interests now that you are not auditioning to be liked by him. Your taste is allowed to be smaller than the union, because the union has ended.",
        nextSceneId: "the-playlist",
        isOptimal: true,
      },
    ],
  },

  // Endings
  {
    id: "ending-flat-neutral",
    backgroundId: "apartment",
    mood: "peaceful",
    isEnding: true,
    outcomeType: "good",
    endingTitle: "The Flat, Neutral",
    endingLearnPrompt:
      "The flat is a flat again. Not scrubbed of him, not haunted by him. Six objects in a sealed box in a closet behind two suitcases. The playlist you made in 2019 is on the speaker. The hoodie smell is faint in the air and will be gone by Wednesday. The discipline of L2-2 is the asymmetry, sealing not erasing, archiving not purging. The funeral has its hours; the flat has its neutrality. Both are the runway L3 runs on.",
    dialog: [
      {
        speakerId: "inner-voice",
        text: "Box in the closet. Speaker on the 2019 playlist. Onion on the cutting board. The flat is a flat.",
        emotion: "knowing",
      },
      {
        speakerId: "inner-voice",
        tone: "tactical",
        text: "The funeral has its hours, and the flat has its neutrality.",
        emotion: "knowing",
      },
    ],
    choices: [],
  },

  {
    id: "ending-late-recovery",
    backgroundId: "apartment",
    mood: "cold",
    isEnding: true,
    outcomeType: "neutral",
    endingTitle: "The Hoodie, Off",
    endingLearnPrompt:
      "The trigger fired and the spiral followed. The recovery, three hours late, was the right move: take the hoodie off, drop it on the floor of the closet with the box, seal both in the morning. The system learned the cost of the trigger and the value of the late stop. Tomorrow's audit closes properly. The discipline of L2-2 was almost lost to the smell of him, and was reclaimed before it cost the night entirely.",
    dialog: [
      {
        speakerId: "inner-voice",
        text: "Hoodie on the closet floor. Box next to it. Tape and Sharpie on the bedside table for morning.",
        emotion: "serious",
      },
    ],
    choices: [],
  },

  {
    id: "ending-hoodie-defeat",
    backgroundId: "apartment",
    mood: "tense",
    isEnding: true,
    outcomeType: "bad",
    endingTitle: "The Hoodie, On",
    failureBlogSlug: "narcissistic-hoovering-explained",
    failureBlogTitle: "Narcissistic Hoovering: When Your Ex Tries to Suck You Back In",
    endingLearnPrompt:
      "The hoodie stayed on. The smell stayed. The audit was technically completed but the structural lesson failed. Every night you sleep in it is a night the dosage system is firing, and the dosage is keeping the channel L1-2 audited closed semi-open through the body. The track's next levels will run heavier on lower credit. Tomorrow morning's first move is to seal the hoodie before coffee.",
    dialog: [
      {
        speakerId: "inner-voice",
        text: "Hoodie on. Phone on his profile. The smell is fading. You move the hoodie closer to your face on the couch.",
        emotion: "sad",
      },
    ],
    choices: [],
  },

  {
    id: "ending-purged",
    backgroundId: "apartment",
    mood: "cold",
    isEnding: true,
    outcomeType: "bad",
    endingTitle: "The Scrubbed Flat",
    failureBlogSlug: "get-over-breakup-like-sociopath",
    failureBlogTitle: "How to Get Over a Breakup Like a Sociopath",
    endingLearnPrompt:
      "Everything is gone. The bin downstairs is the relationship's grave. The flat is technically clean. By Wednesday you will reach for the coffee mug that was yours and remember it went out with his hoodie. By next month you will have replaced four artefacts of your own life because the purge swept them up. The audit produced a scrubbed flat instead of a sealed one. The cost of the difference will show up in small ways over the next ninety days, every time the body reaches for an object that used to be there.",
    dialog: [
      {
        speakerId: "inner-voice",
        text: "Bin emptied into the skip downstairs. Hands cold. The flat is technically clean.",
        emotion: "sad",
      },
    ],
    choices: [],
  },
];

export const afterHim22: Scenario = {
  id: "after-him-2-2",
  title: "The Apartment",
  tagline:
    "Saturday afternoon. The toothbrush. The hoodie. The book. The playlist. One box, sealed, in a closet behind the suitcases.",
  description:
    "After-Him L2-2. The flat audited object by object. The teaching is the asymmetry between sealing and erasing. The hoodie is the renewed prescription; sleeping in it once reopens the channels L1-2 audited closed. The purge is theatre. The unpin is the move. The flat becomes neutral, not scrubbed.",
  tier: "premium",
  track: "after-him",
  level: 2,
  order: 2,
  estimatedMinutes: 11,
  difficulty: "intermediate",
  category: "self-regulation",
  xpReward: 380,
  startSceneId: "saturday-afternoon",
  prerequisites: ["after-him-2-1"],
  tacticsLearned: [
    "One box, sealed, labelled, in a closet behind the suitcases.",
    "Consumables (toothbrush) go in the bin; artefacts (hoodie, book) go in the box.",
    "Do not sleep in the hoodie. The smell is the trigger that fires the schedule.",
    "Unpin the playlist, do not delete it. The songs are yours; the surfacing is not.",
    "The flat becomes neutral. Not scrubbed (purge) and not haunted (museum).",
  ],
  redFlagsTaught: [
    "The hoodie as dosage system for the spiral",
    "The book as importation of his interests under the costume of curiosity",
    "The playlist deletion as theatre that erases your own taste",
    "The purge as performance that scrubs instead of seals",
    "The museum left untouched, accruing weight by the week",
  ],
  characters: [INNER_VOICE],
  scenes,
  isNew: true,
};

export default afterHim22;
