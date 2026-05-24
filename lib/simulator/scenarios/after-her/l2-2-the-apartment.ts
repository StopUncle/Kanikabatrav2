/**
 * after-her-2-2, "The Apartment"
 *
 * After-Her L2-2. Saturday morning. Her sweater on the chair. Her
 * shampoo in the shower. The wedding invite on the fridge addressed
 * to both of you. The teaching is the same as the female track,
 * sealing not erasing, with the male-track addition that the
 * outgoing wedding invite is a structural artefact that requires a
 * response, not just storage.
 *
 * Voice: terse, male register. The flat is the antagonist.
 *
 * Teaches:
 *  - One box, sealed, labelled, in the spare room.
 *  - The shampoo: bin it. Consumable, not artefact.
 *  - The wedding invite: a one-line note, declining, returned.
 *  - Do not throw the sweater in the bin with theatre.
 *  - Buy a different brand of shampoo. The smell is the trigger.
 */

import type { Scenario, Scene } from "../../types";
import { INNER_VOICE_M } from "../../characters-male";

const scenes: Scene[] = [
  {
    id: "saturday-morning",
    backgroundId: "apartment",
    mood: "cold",
    presentCharacterIds: ["inner-voice"],
    dialog: [
      {
        speakerId: null,
        text: "Saturday, 10:14 a.m. Eight days. Coffee on the counter. The flat is the kind of clean that means nothing has been moved in a week.",
      },
      {
        speakerId: null,
        text: "Her sweater is over the back of the kitchen chair. Her shampoo is on the shower shelf next to yours. The wedding invite for her cousin Mara is on the fridge under a magnet, addressed to both of you, RSVP by next Friday. Her hairband is on the coffee table.",
      },
      {
        speakerId: "inner-voice",
        tone: "tactical",
        text: "Box. Sharpie. Spare room. The structural artefact, the wedding invite, gets a one-line note, not a box.",
        emotion: "knowing",
      },
    ],
    choices: [
      {
        id: "start-the-audit",
        text: "Get the box from downstairs. Sharpie from the kitchen drawer. Begin.",
        tactic: "The starting move.",
        nextSceneId: "the-sweater",
        isOptimal: true,
      },
      {
        id: "bin-everything",
        text: "Skip the box. Black bin liner. Everything in. Take it to the skip.",
        tactic: "The purge is theatre. The two years were real. The artefacts get sealed, not destroyed, because the discipline is sovereignty, not erasure. The bin is a gesture; the box is the structure.",
        nextSceneId: "the-purge",
        isOptimal: false,
      },
      {
        id: "leave-it",
        text: "Leave it. The flat is fine. You can do this another day.",
        tactic: "The flat is not fine. By next Saturday her sweater on the chair will weigh ten pounds. The audit waits until you do it, and the cost of the waiting is the accumulated weight of every object you walked past.",
        nextSceneId: "left-as-is",
        isOptimal: false,
      },
    ],
  },

  {
    id: "the-sweater",
    backgroundId: "apartment",
    mood: "cold",
    presentCharacterIds: ["inner-voice"],
    dialog: [
      {
        speakerId: null,
        text: "The sweater. Oatmeal, oversized, the one she stole off you in year one and kept. It is technically yours. It is operationally hers.",
      },
      {
        speakerId: "inner-voice",
        tone: "tactical",
        text: "Sealed in the box. Hers, not yours. Wearing it is the male-track equivalent of the female-track hoodie: dosage system for the spiral.",
        emotion: "knowing",
      },
    ],
    choices: [
      {
        id: "box-sweater",
        text: "Fold the sweater. Into the box.",
        tactic: "Clean. The dosage system is closed before it fires.",
        nextSceneId: "the-shampoo",
        isOptimal: true,
      },
      {
        id: "wear-the-sweater",
        text: 'Put it on. "It is technically mine. I am cold."',
        tactic: "Technically yours is the legal frame for an operational mistake. The smell will fire the schedule. By 11 p.m. you will be on her Instagram. Take it off now, before the body learns the shape of being held by it.",
        nextSceneId: "sweater-trap",
        isOptimal: false,
      },
      {
        id: "throw-sweater-bin",
        text: "Bin it. With theatre. Slam the lid.",
        tactic: "Theatre. The dosage system is denied at the cost of dignity. The sweater would have been useful sealed; it is now a story about the night you binned her sweater, which is a different story to the one the audit is trying to write.",
        nextSceneId: "the-shampoo",
        isOptimal: false,
      },
    ],
  },

  {
    id: "sweater-trap",
    backgroundId: "apartment",
    mood: "tense",
    presentCharacterIds: ["inner-voice"],
    dialog: [
      {
        speakerId: null,
        text: "11:08 p.m. The sweater is on. The phone is on her Instagram. You have scrolled to a photo from August.",
      },
      {
        speakerId: "inner-voice",
        tone: "tactical",
        text: "Trigger fired the schedule. The schedule routed to the channel L1-2 was supposed to close. Take the sweater off. Seal it in the morning.",
        emotion: "serious",
      },
    ],
    choices: [
      {
        id: "take-it-off",
        text: "Sweater off. Floor of the closet. Phone down. Morning will be the seal.",
        tactic: "Late recovery. The trigger is removed; the structural fix is sequenced for the calm version of you tomorrow.",
        nextSceneId: "ending-sweater-late",
        isOptimal: true,
      },
      {
        id: "keep-it-on",
        text: "Keep it on. One night.",
        tactic: "One night becomes the smell fading becomes needing another artefact. The audit unravels backwards.",
        nextSceneId: "ending-sweater-defeat",
        isOptimal: false,
      },
    ],
  },

  {
    id: "the-shampoo",
    backgroundId: "apartment",
    mood: "cold",
    presentCharacterIds: ["inner-voice"],
    dialog: [
      {
        speakerId: null,
        text: "The shampoo. The orange bottle. Half-full. The smell is the smell of her hair, which is the smell of forty minutes of mornings, two years' worth.",
      },
      {
        speakerId: "inner-voice",
        tone: "tactical",
        text: "Consumable. Bin. Replace with a different brand by Monday. The smell is the trigger; the trigger is the schedule; the new brand is the cheapest move on this entire list.",
        emotion: "knowing",
      },
    ],
    choices: [
      {
        id: "bin-shampoo",
        text: "Bin the bottle. Add a note in your phone: new shampoo, Monday.",
        tactic: "Clean. The structural answer plus the pre-commitment to a different brand. The smell channel closes properly.",
        nextSceneId: "the-invite",
        isOptimal: true,
      },
      {
        id: "keep-shampoo",
        text: 'Keep it. "It is just shampoo. I can use it."',
        tactic: "It is not just shampoo. You will smell it in the shower every morning. The body will respond before the brain has had its coffee. The trigger fires daily, on schedule, for the next six weeks, until the bottle is gone.",
        nextSceneId: "the-invite",
        isOptimal: false,
      },
    ],
  },

  {
    id: "the-invite",
    backgroundId: "apartment",
    mood: "cold",
    presentCharacterIds: ["inner-voice"],
    dialog: [
      {
        speakerId: null,
        text: "The wedding invite on the fridge. Mara, her cousin, March. RSVP by next Friday. Addressed to you both.",
      },
      {
        speakerId: "inner-voice",
        tone: "tactical",
        text: "Structural artefact. Not box material. A one-line note, declining, congratulations, in the return envelope, in the post Monday. No story. No 'we have broken up'; Mara either knows or does not need to know from you.",
        emotion: "knowing",
      },
    ],
    choices: [
      {
        id: "decline-cleanly",
        text: 'Write the note: "Thank you for the invitation, declining with regrets. Wishing you both every good thing." Sign. Seal. Mark Monday in the calendar to post.',
        tactic: "The clean structural answer. No explanation, no story, no asymmetry of information. The invite is closed as a logistical loop without becoming an emotional one.",
        nextSceneId: "the-finish",
        isOptimal: true,
      },
      {
        id: "explain-the-breakup",
        text: 'Write a longer note: "We have separated, I think it is better if I do not come, please give Mara my warmest..."',
        tactic: "The explanation is the leak. Mara's wedding does not need your status update; her cousin is the audience the message is actually addressed to. The decline-cleanly version achieves the same logistical outcome without routing emotional information through the wedding stationery.",
        nextSceneId: "the-finish",
        isOptimal: false,
      },
      {
        id: "ignore-the-invite",
        text: 'Take the invite off the fridge. Leave it on the counter. RSVP can be next week.',
        tactic: "The not-responding becomes its own message: a couple who did not bother. Mara's calendar requires the answer Friday. Late is the same as no. The Monday post is the cheapest, kindest version of the answer.",
        nextSceneId: "invite-deferred",
        isOptimal: false,
      },
    ],
  },

  {
    id: "the-finish",
    backgroundId: "apartment",
    mood: "peaceful",
    presentCharacterIds: ["inner-voice"],
    dialog: [
      {
        speakerId: null,
        text: "Box: sweater, hairband, the spare phone charger she bought, a small earring you found behind the kettle, the postcard from Lisbon. Sealed. Sharpie on the lid: HER + the date. Spare room, behind the suitcase.",
      },
      {
        speakerId: null,
        text: "Envelope to Mara on the kitchen counter, addressed, stamp on, ready for Monday. New shampoo on the shopping list. The kitchen chair is empty for the first time in two years.",
      },
    ],
    choices: [
      {
        id: "close-audit",
        text: "Done. Lift session at 1. The flat is a flat.",
        tactic: "The work is done. The flat is operationally neutral. The body goes to the gym; the gym is L4, not a substitute for L2.",
        nextSceneId: "ending-flat-neutral",
        isOptimal: true,
      },
    ],
  },

  // Failure paths
  {
    id: "the-purge",
    backgroundId: "apartment",
    mood: "tense",
    presentCharacterIds: ["inner-voice"],
    dialog: [
      {
        speakerId: null,
        text: "Eighteen minutes in, the black bag is heavy. Sweater. Shampoo. Hairband. The earring. Two pairs of socks of hers. The wedding invite. The Lisbon postcard.",
      },
      {
        speakerId: "inner-voice",
        tone: "tactical",
        text: "The invite is in the bag. By Friday Mara has not heard back and concludes you do not respect her enough to decline. The postcard is in the bag, and the postcard was yours, sent to you by you on a holiday. Pull both out. Box the rest.",
        emotion: "serious",
      },
    ],
    choices: [
      {
        id: "recover-purge",
        text: "Pull the invite and the postcard from the bag. Decline Mara properly. Box the rest.",
        tactic: "Late recovery. Structural artefact restored to its proper destination; your own postcard reclaimed; the rest go in the box like they should have.",
        nextSceneId: "the-finish",
        isOptimal: true,
      },
      {
        id: "continue-purge",
        text: "Tie the bag. Skip downstairs. Done.",
        tactic: "Mara does not get an RSVP. Your postcard is gone. The scrubbed flat is the result; the cost will show up across the next ninety days in small, specific ways.",
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
      "Nothing moved. The sweater on the chair, the shampoo in the shower, the invite on the fridge with the RSVP deadline ticking down. By next Saturday the museum will have grown into a passive shrine. The audit waits until you do it. Friday is Mara's RSVP deadline; do not let her cousin's wedding be the artefact this audit ruins. Book next Saturday in the calendar and honor it.",
    dialog: [
      {
        speakerId: "inner-voice",
        text: "Coffee finished. Phone in hand. The chair, the shelf, the fridge. Tomorrow.",
        emotion: "serious",
      },
    ],
    choices: [],
  },

  {
    id: "invite-deferred",
    backgroundId: "apartment",
    mood: "cold",
    isEnding: true,
    outcomeType: "neutral",
    endingTitle: "Mara, On Friday",
    endingLearnPrompt:
      "The flat is mostly audited. The invite is on the counter, unanswered. Friday will arrive. The not-responding becomes its own message. Mara's wedding is not the place to leak the breakup, and the cleanest answer is the one that does not signal anything beyond a polite decline. Tomorrow's first move: write the one-line note, post it Monday. The structural loop closes properly only when it is closed.",
    dialog: [
      {
        speakerId: "inner-voice",
        text: "Box sealed. Shampoo binned. Invite on the counter, blank, waiting.",
        emotion: "serious",
      },
    ],
    choices: [],
  },

  {
    id: "ending-flat-neutral",
    backgroundId: "apartment",
    mood: "peaceful",
    isEnding: true,
    outcomeType: "good",
    endingTitle: "The Flat, Neutral",
    endingLearnPrompt:
      "Six artefacts in a sealed box behind the suitcase. Shampoo binned, new brand on the list. Mara's invite declined cleanly. The chair is empty for the first time in two years and the emptiness is not loud; it is the floor of the room being what the floor of the room is. The flat is operationally neutral. The Funeral has its hours, the flat has its neutrality. L3 begins from here.",
    dialog: [
      {
        speakerId: "inner-voice",
        text: "Spare room closed. Envelope on the counter. Kettle on. The flat is a flat.",
        emotion: "knowing",
      },
      {
        speakerId: "inner-voice",
        tone: "tactical",
        text: "The flat is operationally neutral.",
        emotion: "knowing",
      },
    ],
    choices: [],
  },

  {
    id: "ending-sweater-late",
    backgroundId: "apartment",
    mood: "cold",
    isEnding: true,
    outcomeType: "neutral",
    endingTitle: "The Sweater, Off",
    endingLearnPrompt:
      "The trigger fired and the spiral followed. The recovery, three hours late, was the right move: sweater off, closet, morning. Tomorrow's audit closes properly. The lesson lands at half cost. The discipline of L2-2 was almost lost to the smell of her, and was reclaimed before it cost the night entirely.",
    dialog: [
      {
        speakerId: "inner-voice",
        text: "Sweater on the closet floor. Phone face-down. Tomorrow at 9 a.m., box and tape.",
        emotion: "serious",
      },
    ],
    choices: [],
  },

  {
    id: "ending-sweater-defeat",
    backgroundId: "apartment",
    mood: "tense",
    isEnding: true,
    outcomeType: "bad",
    endingTitle: "The Sweater, On",
    failureBlogSlug: "narcissistic-hoovering-explained",
    failureBlogTitle: "Narcissistic Hoovering: When Your Ex Tries to Suck You Back In",
    endingLearnPrompt:
      "The sweater stayed on. The smell stayed. The audit was technically completed but the structural lesson failed. Every night you sleep in it is a night the dosage system is firing. The next levels run heavier on lower credit. Tomorrow morning's first move is to seal the sweater before coffee.",
    dialog: [
      {
        speakerId: "inner-voice",
        text: "Sweater on. Phone on her profile. The smell is fading.",
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
      "The bag is in the skip. The flat is technically clean. Mara has no RSVP, which by Friday is its own message. Your Lisbon postcard is in landfill. The audit produced a scrubbed flat instead of a sealed one. The cost will show up across the next ninety days in small ways, including the Mara message that will route through her sister in eight weeks asking what happened.",
    dialog: [
      {
        speakerId: "inner-voice",
        text: "Bag in the skip. Hands cold. Flat empty. Mara, somewhere, expecting an answer.",
        emotion: "sad",
      },
    ],
    choices: [],
  },
];

export const afterHer22: Scenario = {
  id: "after-her-2-2",
  title: "The Apartment",
  tagline:
    "Saturday morning. Her sweater. Her shampoo. Mara's wedding invite addressed to both of you. One box, one envelope, one new brand of shampoo.",
  description:
    "After-Her L2-2. The flat audited object by object, plus the male-track structural addition: the wedding invite that requires a response, not just storage. The teaching is the asymmetry between sealing and erasing. The sweater is the dosage system; the shampoo is the daily trigger; Mara's RSVP is the loop that closes only when closed. The flat becomes operationally neutral.",
  tier: "premium",
  track: "after-her",
  level: 2,
  order: 2,
  estimatedMinutes: 11,
  difficulty: "intermediate",
  category: "self-regulation",
  xpReward: 380,
  startSceneId: "saturday-morning",
  prerequisites: ["after-her-2-1"],
  tacticsLearned: [
    "One box, sealed, in the spare room behind the suitcase.",
    "Shampoo binned, new brand by Monday. The smell is the daily trigger.",
    "Wedding invite: one-line decline, no story, posted Monday.",
    "Do not wear the sweater. Dosage system for the spiral.",
    "Theatre purges scrub instead of seal; the cost is your own artefacts.",
  ],
  redFlagsTaught: [
    "The sweater as dosage system, technically yours, operationally hers",
    "The shampoo as daily smell trigger that fires before coffee",
    "The wedding invite as structural loop that becomes its own message if ignored",
    "The explanation in the RSVP that leaks the breakup through wedding stationery",
    "The bin liner purge that takes your Lisbon postcard with it",
  ],
  characters: [INNER_VOICE_M],
  scenes,
  isNew: true,
};

export default afterHer22;
