/**
 * after-her-1-2, "The Audit"
 *
 * After-Her track, Level 1, order 2. Saturday morning. Three days after
 * she left. The first sober pass at every channel through which she
 * can still reach you, every channel through which you can still reach
 * her, and the small set of structural artefacts (joint accounts, the
 * dog's vet portal, the gym app her sessions are visible on) that the
 * male audit specifically has to handle. The teaching is the same as
 * the female track, the asymmetry between reach and history, with one
 * additional discipline: not-weirdness is not a reason to leave a
 * channel open. Not-weirdness is the leash.
 *
 * Register: matches male-dating. Tactical inner voice, terse, procedural.
 * She never appears.
 *
 * Teaches:
 *  - Find My is the surveillance you stop feeding, not the surveillance
 *    you keep to know where she is. Two-way revoke.
 *  - "It would be weird to turn it off" is not a reason. The weirdness
 *    is what keeps men chained to a channel three years past its date.
 *  - Take your name off the joint accounts now. Logistics decay into
 *    leverage when left alone.
 *  - The dog is yours or hers. The dog cannot be both. The vet portal
 *    is the proxy for that decision.
 *
 * Voice: clinical, frame-aware. No em dashes (per CLAUDE.md).
 */

import type { Scenario, Scene } from "../../types";
import { INNER_VOICE_M } from "../../characters-male";

const scenes: Scene[] = [
  // ===================================================================
  // OPENING
  // ===================================================================
  {
    id: "the-saturday-morning",
    backgroundId: "apartment",
    mood: "cold",
    presentCharacterIds: ["inner-voice"],
    dialog: [
      {
        speakerId: null,
        text: "Saturday, 8:42 a.m. Three days after she left with the dog. The kitchen is silent in a way it has not been silent in two years. You make a coffee. You sit at the counter. You open the laptop.",
      },
      {
        speakerId: null,
        text: "New document. Title it channels. Two columns. Reach: how she gets to you. History: how you got to her. Plus a third short column for the structural artefacts that are neither reach nor history, the joint accounts, the dog's vet portal, the gym app her sessions are visible on, the Airbnb wishlist you both edited.",
      },
      {
        speakerId: "inner-voice",
        tone: "tactical",
        text: "The audit runs on Saturday-morning calmness. Wednesday-evening calmness is a different resource and a different audit, the one called I am going to text her.",
        emotion: "knowing",
      },
      {
        speakerId: "inner-voice",
        tone: "tactical",
        text: "Three rules. Block on reach. Archive on history. Take your name off the structural lines now, while you do not need them, because if you wait until you need them you will negotiate from inside the spiral instead of from this counter.",
        emotion: "knowing",
      },
    ],
    choices: [
      {
        id: "start-the-audit",
        text: "Start the audit. Begin with Find My.",
        tactic: "Find My is the channel men leave open the longest under the deepest rationalisations. Closing it first is the audit's voice-check.",
        nextSceneId: "find-my",
        isOptimal: true,
      },
      {
        id: "defer-the-audit",
        text: "Close the laptop. There is a game on at 11. You can do the list later this week.",
        tactic: "The deferred audit is the open channel. The version of you at 9 p.m. on a Wednesday is not doing this list. The version of you at 8:42 a.m. on a Saturday is the only version that does, and you are him right now.",
        nextSceneId: "deferred",
        isOptimal: false,
      },
    ],
  },

  // ===================================================================
  // FIND MY
  // ===================================================================
  {
    id: "find-my",
    backgroundId: "apartment",
    mood: "cold",
    presentCharacterIds: ["inner-voice"],
    dialog: [
      {
        speakerId: null,
        text: "Find My. She is a small blue circle at her mother's house in Chiswick. She has been there since Thursday afternoon. The dog is presumably with her, but the dog does not have its own circle.",
      },
      {
        speakerId: "inner-voice",
        tone: "tactical",
        text: "Find My is the channel where the rationalisation runs the longest. You will tell yourself it stays on because of the dog. Because of an emergency. Because it would be weird to turn it off and that weirdness is its own message. None of those are reasons. They are aliases for I want to know where she is.",
        emotion: "knowing",
      },
    ],
    choices: [
      {
        id: "revoke-both-ways",
        text: "Stop sharing. Remove her from your circle. Close the app.",
        tactic: "The two-way revoke. The blue circle disappears. The temptation to check her location on a Sunday afternoon disappears in the same tap. Find My is the surveillance you stop feeding before the surveillance you stop receiving; both lines go quiet in one move.",
        nextSceneId: "imessage",
        isOptimal: true,
      },
      {
        id: "leave-find-my-on-because-weird",
        text: "Leave it. Turning it off feels passive-aggressive. It would be weird.",
        tactic: "Weirdness is not a reason. It is the leash. Men keep Find My active for years past the relationship under the rationalisation that turning it off sends a message. The message Find My being on sends, to you, every day at 9 a.m., is that the relationship has not ended operationally. The weirdness of the off is the cost the audit pays once. The weirdness of the on is the cost the audit refuses to stop paying.",
        nextSceneId: "loose-end-find-my",
        isOptimal: false,
      },
      {
        id: "leave-find-my-on-because-dog",
        text: "Leave it. The dog. If anything happens to the dog you need to know.",
        tactic: "The dog has not been a sufficient rationalisation for the location-share since the dog was three months old. The dog is with her. If anything happens to the dog she will tell you, because the dog is structural to both of you. The dog rationale is the most respectable costume the want-to-know is wearing this morning.",
        nextSceneId: "loose-end-find-my",
        isOptimal: false,
      },
    ],
  },

  // ===================================================================
  // IMESSAGE / WHATSAPP
  // ===================================================================
  {
    id: "imessage",
    backgroundId: "apartment",
    mood: "cold",
    presentCharacterIds: ["inner-voice"],
    dialog: [
      {
        speakerId: null,
        text: "iMessage. The thread is at the top of your chats. The last message is yours, sent Thursday at 7:08 p.m., a thumbs-up on her you can keep the cast iron pan when you come for the rest of the boxes.",
      },
      {
        speakerId: "inner-voice",
        tone: "tactical",
        text: "Reach goes first. Archive the thread. Block the number. The block is the move that closes the lowercase 2 a.m. message four months from now, which she is more direct than the female-track ex but no less likely to send.",
        emotion: "knowing",
      },
    ],
    choices: [
      {
        id: "archive-and-block-imessage",
        text: "Archive the thread. Block the number. Do not delete the thread.",
        tactic: "Clean two-step. Archive moves the thread off your main surface. Block closes the reach. Not deleting is the discipline of not pretending the two years did not exist; you are sealing the channel, not erasing the history.",
        nextSceneId: "joint-accounts",
        isOptimal: true,
      },
      {
        id: "leave-imessage-open",
        text: "Archive but do not block. She might need to coordinate the rest of the boxes. Blocking now is premature.",
        tactic: "The coordination channel routes through email or through her sister, both of which are more bounded than iMessage. iMessage left open is the channel the voice memo at 1:14 a.m. lands through, the one the L5 boss of this track opens on. The boxes are not a sufficient reason to keep the channel that the hoover prefers.",
        nextSceneId: "loose-end-imessage",
        isOptimal: false,
      },
      {
        id: "delete-the-thread",
        text: "Delete the thread. The years of messages disappear.",
        tactic: "The delete is the purge, which feels decisive on a Saturday morning. The thread is evidence of the relationship as it actually was, not as you are about to re-narrate it. Deleting the thread is paying tomorrow's revisionism in advance and removing the only artefact that can defend you against your own future version of the story.",
        nextSceneId: "joint-accounts",
        isOptimal: false,
      },
    ],
  },

  // ===================================================================
  // JOINT ACCOUNTS (the structural column)
  // ===================================================================
  {
    id: "joint-accounts",
    backgroundId: "apartment",
    mood: "cold",
    presentCharacterIds: ["inner-voice"],
    dialog: [
      {
        speakerId: null,
        text: "The joint structural lines. The Amazon account with the saved card. The Spotify family plan. The Netflix profile in her name. The Airbnb wishlist of trips you did not take. The gym membership at the place where her schedule is visible to logged-in members.",
      },
      {
        speakerId: "inner-voice",
        tone: "tactical",
        text: "Joint accounts are the slow-burn leash. They are the reason men end up texting her, six months later, about a Netflix renewal. Close them on the Saturday they cost ten minutes; do not close them on the Wednesday they cost an hour and a conversation.",
        emotion: "knowing",
      },
    ],
    choices: [
      {
        id: "separate-everything",
        text: "Cancel the Spotify family plan, leave the Netflix, leave Amazon. Cancel the gym membership and rejoin a different one Monday. Delete the Airbnb wishlist.",
        tactic: "The clean structural pass. The gym membership is the leak that matters: men do not realise they have been checking her class schedule until they are caught doing it on a Tuesday at 6:14 p.m. Rejoining a different one Monday is a thirty-pound move that buys a hundred Sundays of not being tempted.",
        nextSceneId: "the-dog",
        isOptimal: true,
      },
      {
        id: "leave-the-gym",
        text: "Cancel the music and streaming, leave the gym. The gym is your gym. She is the one who joined.",
        tactic: "The gym she joined is technically your gym. The membership UI showing her class bookings is operationally a surveillance feed. The fact that you joined first is the rationale men use to keep the feed for three years. Rejoin the other one Monday. The thirty pounds is not the point.",
        nextSceneId: "loose-end-gym",
        isOptimal: false,
      },
      {
        id: "leave-everything",
        text: "Leave the joint accounts. It is logistics. You can sort it later.",
        tactic: "Logistics decay into leverage when left alone. By month two, every joint account is a reason to text her. By month four, one of those reasons becomes the reason you text her. The audit closes the channels before they are needed, not after.",
        nextSceneId: "loose-end-joint",
        isOptimal: false,
      },
    ],
  },

  // ===================================================================
  // THE DOG
  // ===================================================================
  {
    id: "the-dog",
    backgroundId: "apartment",
    mood: "cold",
    presentCharacterIds: ["inner-voice"],
    dialog: [
      {
        speakerId: null,
        text: "The dog. The vet portal has both your names on it. The pet insurance is on your card. The dog is at her mother's. The dog has been hers in every way that matters since the six-week mark, but the paperwork has both of you.",
      },
      {
        speakerId: "inner-voice",
        tone: "tactical",
        text: "The dog cannot be a structural ambiguity. Either the dog is yours and lives with you, or the dog is hers and you take your name off the paperwork. Ambiguous custody is the longest-lived hoover channel of all. The vet calls. Insurance renews. You and she negotiate, on a Tuesday, the cost of the dental work. Six months later you are sitting in a car park.",
        emotion: "knowing",
      },
    ],
    choices: [
      {
        id: "transfer-the-dog-cleanly",
        text: "Transfer the vet portal to her. Move the insurance to her card. The dog is hers; you forfeit the surface. You can see the dog once if she wants, then not.",
        tactic: "The structural decision. The dog has been hers in practice. Making it hers in paperwork closes the longest-lived channel any breakup generates. The single visit is a kindness to yourself, not to her or the dog. After that you do not exist on the vet portal.",
        nextSceneId: "the-loose-end",
        isOptimal: true,
      },
      {
        id: "keep-dog-paperwork-shared",
        text: "Leave the paperwork. The dog is structurally both of yours. Co-vet, co-insurance.",
        tactic: "Shared paperwork is the rope. Every vet call, every renewal, every dental appointment is a coordination message you will read at 4 p.m. on a Tuesday and respond to without thinking. The dog deserves a single household, structurally. So do you.",
        nextSceneId: "the-loose-end",
        isOptimal: false,
      },
    ],
  },

  // ===================================================================
  // THE LOOSE END
  // ===================================================================
  {
    id: "the-loose-end",
    backgroundId: "apartment",
    mood: "cold",
    presentCharacterIds: ["inner-voice"],
    dialog: [
      {
        speakerId: null,
        text: "One row left on the list. Her sister.",
      },
      {
        speakerId: "inner-voice",
        tone: "tactical",
        text: "Her sister is not a channel you can block. The L5 hoover on this track lands specifically through her, eight weeks from now, via a careful, well-phrased message about how she has been struggling. The audit cannot close the sister; the audit can only decide, now, what the response will be when it arrives.",
        emotion: "knowing",
      },
    ],
    choices: [
      {
        id: "pre-commit-sister-response",
        text: 'Write the response now, in the document, while she is not yet the messenger. Three sentences: "Appreciate you saying that. Take care. I am not going to ask after her." Save it. Trust your future self to copy-paste.',
        tactic: "The pre-commitment device. The version of you at 8:42 a.m. on a Saturday with the calmness intact is the only version qualified to write the response. Future-you, reading the sister's message at 9:14 p.m. on a Wednesday in November, will not be qualified. Saving the response now is leaving a note for the version of you who is going to need it.",
        nextSceneId: "ending-audit-closed",
        isOptimal: true,
        event: "optimal-with-grace",
      },
      {
        id: "trust-future-self",
        text: 'Leave it. You will know what to say when the time comes. You can handle her sister.',
        tactic: "Future-you, in November, in the spiral, will know what to say less well than present-you, on Saturday morning, with the document open. The pre-commitment is the move that saves a Tuesday-afternoon eight weeks from now from the version of you who is no longer doing audits.",
        nextSceneId: "ending-no-precommit",
        isOptimal: false,
      },
    ],
  },

  // ===================================================================
  // RECOVERY BRANCHES
  // ===================================================================
  {
    id: "loose-end-find-my",
    backgroundId: "apartment",
    mood: "tense",
    presentCharacterIds: ["inner-voice"],
    dialog: [
      {
        speakerId: "inner-voice",
        tone: "tactical",
        text: "The rationale is not the reason. Whether you called it weirdness or called it the dog, the want-to-know is the engine. Revoke it now in the same tap that you would have revoked it on the day she moved out, which was yesterday.",
        emotion: "knowing",
      },
    ],
    choices: [
      {
        id: "go-back-revoke-location",
        text: "Stop sharing. Remove her from your circle.",
        tactic: "Late recovery. The blue circle disappears regardless of which rationale you almost protected it with.",
        nextSceneId: "imessage",
        isOptimal: true,
      },
    ],
  },

  {
    id: "loose-end-imessage",
    backgroundId: "apartment",
    mood: "tense",
    presentCharacterIds: ["inner-voice"],
    dialog: [
      {
        speakerId: "inner-voice",
        tone: "tactical",
        text: "Coordination is not a reason to leave the hoover's preferred channel open. The boxes route through email. The voice memo lands through iMessage. Close the channel that costs you nothing to close and everything to leave open.",
        emotion: "knowing",
      },
    ],
    choices: [
      {
        id: "go-back-block-imessage",
        text: "Block the number.",
        tactic: "Late recovery. The L5 voice memo cannot land on a blocked thread.",
        nextSceneId: "joint-accounts",
        isOptimal: true,
      },
    ],
  },

  {
    id: "loose-end-gym",
    backgroundId: "apartment",
    mood: "tense",
    presentCharacterIds: ["inner-voice"],
    dialog: [
      {
        speakerId: "inner-voice",
        tone: "tactical",
        text: "The gym membership UI is not a feed you can choose not to look at. It is a feed you check on a Tuesday at 6:14 p.m. without remembering you decided to look. The thirty pounds is the cheapest move on this entire list.",
        emotion: "knowing",
      },
    ],
    choices: [
      {
        id: "go-back-switch-gym",
        text: "Cancel the membership. Walk past the other gym on Monday.",
        tactic: "Late recovery. The Tuesday-6:14 relapse is closed before it has a chance to begin.",
        nextSceneId: "the-dog",
        isOptimal: true,
      },
    ],
  },

  {
    id: "loose-end-joint",
    backgroundId: "apartment",
    mood: "tense",
    presentCharacterIds: ["inner-voice"],
    dialog: [
      {
        speakerId: "inner-voice",
        tone: "tactical",
        text: "Logistics decay into leverage. Every joint account is a deferred message you have already agreed in advance to send. Close them on the morning they cost ten minutes.",
        emotion: "knowing",
      },
    ],
    choices: [
      {
        id: "go-back-close-joint",
        text: "Cancel the family plan. Cancel the gym. Delete the wishlist.",
        tactic: "Late recovery on the structural column. The audit is now operationally complete on the joint accounts.",
        nextSceneId: "the-dog",
        isOptimal: true,
      },
    ],
  },

  // ===================================================================
  // DEFERRED (neutral ending)
  // ===================================================================
  {
    id: "deferred",
    backgroundId: "apartment",
    mood: "cold",
    isEnding: true,
    outcomeType: "neutral",
    endingTitle: "The Audit, Postponed",
    endingLearnPrompt:
      "Saturday-morning calmness is the resource. Wednesday-evening calmness is a different resource, and a different list, the one you do not actually write. The audit does not happen unless it happens now. The scenario does not punish the postponement; it records it. The cost is whatever each channel does, on its own, in the days between Saturday and the next Saturday calm enough to try again. The track will hold. The list will be here.",
    dialog: [
      {
        speakerId: "inner-voice",
        text: "Laptop closed. Coffee cold. The game starts in two hours. The list is still on the counter, in your head, waiting.",
        emotion: "serious",
      },
    ],
    choices: [],
  },

  // ===================================================================
  // ENDINGS
  // ===================================================================
  {
    id: "ending-audit-closed",
    backgroundId: "apartment",
    mood: "peaceful",
    isEnding: true,
    outcomeType: "good",
    endingTitle: "The List Closed",
    endingLearnPrompt:
      "Every reach channel is closed. Every history channel is archived. The joint structural lines are separated, including the gym, including the dog. The sister's response is pre-written and saved against the day she sends the message you both know is coming. The runway is built. What you are calling silence is not absence; it is the action. The first 72 hours close here. Level 2 is The Funeral, the schedule of grief and rage as one budget, the apartment audited object by object. The first night was the floor. The audit was the runway. Every level after this runs on what you built this morning.",
    dialog: [
      {
        speakerId: "inner-voice",
        text: "Document closed. The list is done. The kitchen is quieter than it was at 8:42 because the quiet has shape to it now, instead of being absence.",
        emotion: "knowing",
      },
      {
        speakerId: "inner-voice",
        tone: "tactical",
        text: "The runway is built.",
        emotion: "knowing",
      },
    ],
    choices: [],
  },

  {
    id: "ending-no-precommit",
    backgroundId: "apartment",
    mood: "cold",
    isEnding: true,
    outcomeType: "neutral",
    endingTitle: "Trusting Future-You",
    failureBlogSlug: "narcissistic-hoovering-explained",
    failureBlogTitle: "Narcissistic Hoovering: When Your Ex Tries to Suck You Back In",
    endingLearnPrompt:
      "The structural columns are closed cleanly. The sister-message is not. Future-you, in November, in the spiral, will not write the three-sentence response Saturday-you would have written. The audit recorded the gap. The track records it. The L5 boss lands through the sister; the response you needed pre-committed was the cheapest line item on the list. The scenario does not punish; it notes the shape of the missing artefact. The audit is now operationally complete on every channel that has paperwork. The one channel that has only people is the one Saturday-you declined to write the response for. The runway is built with one small, named hole.",
    dialog: [
      {
        speakerId: "inner-voice",
        text: "Document closed. One column is struck through. One row, the last one, has a single typed character: a dash, then nothing.",
        emotion: "serious",
      },
    ],
    choices: [],
  },
];

export const afterHer12: Scenario = {
  id: "after-her-1-2",
  title: "The Audit",
  tagline:
    "Saturday morning. Find My, iMessage, joint accounts, the dog, her sister. Block on reach, archive on history, separate the structural lines while you do not need them.",
  description:
    "After-Her L1-2. Three days after she left. The audit teaches the male-specific structural column the female track does not need: joint accounts, the gym membership where her sessions are visible, the dog's vet portal, the sister you cannot block. The trap is the rationalisation, leaving Find My on because it would be weird to turn it off, keeping the gym because it is technically your gym, leaving the dog paperwork shared because the dog is structurally both of yours. Not-weirdness is not a reason. Not-weirdness is the leash.",
  tier: "premium",
  track: "after-her",
  level: 1,
  order: 2,
  estimatedMinutes: 12,
  difficulty: "intermediate",
  category: "self-regulation",
  xpReward: 380,
  startSceneId: "the-saturday-morning",
  prerequisites: ["after-her-1-1"],
  tacticsLearned: [
    "Find My is closed first. Weirdness is not a reason. The dog is not a reason.",
    "Block iMessage. Coordination routes through email or her sister, not the hoover's preferred channel.",
    "Cancel the gym her sessions are visible on. Rejoin somewhere else Monday. Thirty pounds buys a hundred Sundays.",
    "Transfer the dog paperwork cleanly. Ambiguous custody is the longest-lived hoover channel any breakup generates.",
    "Pre-write the response to her sister now, on Saturday morning, while you are the version of you qualified to write it.",
  ],
  redFlagsTaught: [
    "The 'it would be weird to turn off Find My' rationale that keeps men leashed for years",
    "The 'because of the dog' rationale that is the most respectable costume of want-to-know",
    "The unblocked iMessage as the channel the voice memo at 1:14 a.m. lands through",
    "The gym membership UI as a surveillance feed in a fitness costume",
    "The shared dog paperwork as the longest-running coordination-message generator",
  ],
  characters: [INNER_VOICE_M],
  scenes,
  isNew: true,
};

export default afterHer12;
