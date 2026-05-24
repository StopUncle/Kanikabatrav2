/**
 * after-him-1-2, "The Audit"
 *
 * After-Him track, Level 1, order 2. Sunday morning. Three days after
 * the breakup. The first sober pass at every channel through which he
 * can still reach you, and every channel through which you can still
 * reach him. The teaching is the asymmetry: block on reach (DMs, calls,
 * location), archive on history (photos, playlists), revoke nothing
 * that belongs to you alone. The trap is the channel left open "just
 * in case." That channel is the channel the L5 hoover arrives through.
 *
 * Register: procedural. The audit is a list. The list is the move.
 * Inner voice tactical, scene narration spare. He never appears.
 *
 * Teaches:
 *  - Block on reach. Archive on history. The asymmetry matters.
 *  - "Just in case of emergency" is the leash. Real emergencies route
 *    through mutuals or police, not through your DMs.
 *  - Revoke location immediately. Find My is the surveillance you stop
 *    feeding before the surveillance you stop receiving.
 *  - Do not delete your own data. The photo album was your camera roll
 *    before it was a couple's record; the playlist was your taste first.
 *
 * Voice: Kanika's checklist register, italics on the punchlines. No
 * em dashes (per CLAUDE.md).
 */

import type { Scenario, Scene } from "../../types";
import { INNER_VOICE } from "../../characters";

const scenes: Scene[] = [
  // ===================================================================
  // OPENING
  // ===================================================================
  {
    id: "the-sunday-morning",
    backgroundId: "apartment",
    mood: "cold",
    presentCharacterIds: ["inner-voice"],
    dialog: [
      {
        speakerId: null,
        text: "Sunday, 9:14 a.m. Three days after the coffee. The light is the colour of unbleached linen. You made one coffee, drank half of it, made another one because the first one had gone cold while you were sitting on the floor of the bedroom looking at your phone.",
      },
      {
        speakerId: null,
        text: "Open a fresh document. Title it, in plain text, channels. Make a list of every place his name still exists in your phone or on your account.",
      },
      {
        speakerId: "inner-voice",
        tone: "tactical",
        text: "The audit is a list, and the list is the move. The work is doing it in order, on a Sunday morning, while the calmness is available. Doing it on a Wednesday night after wine is doing a different audit, the one called I miss him.",
        emotion: "knowing",
      },
      {
        speakerId: "inner-voice",
        tone: "tactical",
        text: "There are two columns. Reach: how he gets to you. History: how you got to him. The discipline is different on each side.",
        emotion: "knowing",
      },
    ],
    choices: [
      {
        id: "start-the-audit",
        text: "Start the audit. Begin with Instagram.",
        tactic: "Begin where the noise is loudest. The major surface is the one whose discipline sets the tone for the rest.",
        nextSceneId: "instagram",
        isOptimal: true,
      },
      {
        id: "defer-the-audit",
        text: "Close the laptop. Audit feels like overkill on a Sunday morning. You can do it Wednesday.",
        tactic: "The deferred audit is the open channel. The Wednesday version of you will not do this list, because by Wednesday the calmness is gone and the discipline is a memory.",
        nextSceneId: "deferred",
        isOptimal: false,
      },
    ],
  },

  // ===================================================================
  // INSTAGRAM
  // ===================================================================
  {
    id: "instagram",
    backgroundId: "apartment",
    mood: "cold",
    presentCharacterIds: ["inner-voice"],
    dialog: [
      {
        speakerId: null,
        text: "Instagram first. His profile is the second result when you type the letter h. The little circle at the top of your feed with his face on it. The thirty-two posts in the archive that you appear in.",
      },
      {
        speakerId: "inner-voice",
        tone: "tactical",
        text: "Three moves available. Two are clean. One is the one you will be talked out of in a group chat by Tuesday.",
        emotion: "knowing",
      },
    ],
    choices: [
      {
        id: "block-instagram",
        text: "Block. He cannot see your profile. You cannot see his. The DMs are closed.",
        tactic: "The clean move. Block is reciprocal. He cannot DM you, cannot view your story, cannot tag you in archive cleanouts six months from now. You cannot check his profile. The reciprocity is the kindness, you have removed the temptation as well as the access.",
        nextSceneId: "whatsapp",
        isOptimal: true,
      },
      {
        id: "mute-instagram",
        text: "Mute. You still appear in his world but you do not see him in yours.",
        tactic: "The mute is a half-measure. He can still DM, still view your story, still tag you. You have removed the symptom (seeing him) without removing the surface (being seeable by him). The L5 hoover will route through this exact gap.",
        nextSceneId: "whatsapp",
        isOptimal: false,
      },
      {
        id: "leave-instagram-open",
        text: "Leave it. Blocking feels childish. You are an adult who can simply not look.",
        tactic: "The you who is going to not look has not been auditioned for the role. The you who exists at 1 a.m. on a Friday in eight weeks is the one who will be doing the looking, and that you has not committed to anything. The block is for her, not for him.",
        nextSceneId: "left-open-instagram",
        isOptimal: false,
      },
    ],
  },

  // ===================================================================
  // WHATSAPP
  // ===================================================================
  {
    id: "whatsapp",
    backgroundId: "apartment",
    mood: "cold",
    presentCharacterIds: ["inner-voice"],
    dialog: [
      {
        speakerId: null,
        text: "WhatsApp. The thread is at the top of your chats. His name is in cursive script because you let him title himself on his last birthday. The last message is from him, sent Thursday at 4:18 p.m., five words long, including the comma.",
      },
      {
        speakerId: "inner-voice",
        tone: "tactical",
        text: "WhatsApp is reach. Reach is what gets closed first. The thread itself is history, and history you do not delete.",
        emotion: "knowing",
      },
    ],
    choices: [
      {
        id: "archive-and-block-whatsapp",
        text: "Archive the thread. Block the number. Do not delete the thread.",
        tactic: "The clean two-step. Archive removes the thread from your at-the-top-of-the-chat-list surface. Block removes his ability to reach the archive. Not deleting is the discipline of not pretending the relationship never happened; what you are doing is sealing it, not erasing it.",
        nextSceneId: "find-my",
        isOptimal: true,
      },
      {
        id: "delete-the-thread",
        text: "Delete the thread. The years of messages disappear with one swipe.",
        tactic: "The delete is the purge, which is its own kind of performance. The thread was evidence of the relationship as it actually was, not as you are about to start re-narrating it. Deleting the thread is paying tomorrow's revisionism in advance.",
        nextSceneId: "find-my",
        isOptimal: false,
      },
      {
        id: "leave-whatsapp-unblocked",
        text: "Archive the thread but do not block the number. You can always block him later if he writes.",
        tactic: "The unblocked number is the channel the lowercase hoover comes through. He will write at a Tuesday at 4:13 p.m. The message will be three words and a kiss. You will read it before you have decided not to. The L5 boss of this track is specifically this gap.",
        nextSceneId: "loose-end-whatsapp",
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
        text: "Find My. He is currently a small blue circle at his sister's flat in Crouch End. He has been there for forty-one minutes. You did not need to know this. You knew it anyway.",
      },
      {
        speakerId: "inner-voice",
        tone: "tactical",
        text: "Find My is the surveillance you are doing as much as the surveillance he could do. Revoking it is two-way silence. The kindness to yourself is the kindness to him.",
        emotion: "knowing",
      },
    ],
    choices: [
      {
        id: "revoke-both-ways",
        text: "Stop sharing. Remove him from your circle. Close the app.",
        tactic: "The two-way revoke. The blue circle disappears. The temptation to track his Tuesdays disappears with it. Find My is the surveillance you stop feeding before the surveillance you stop receiving; both lines go quiet in the same tap.",
        nextSceneId: "spotify-and-photos",
        isOptimal: true,
      },
      {
        id: "leave-find-my-on",
        text: "Leave it. Knowing where he is, is not the same as contacting him. You can handle the information.",
        tactic: "The Find My left on is the daily relapse. Three taps, fourteen seconds, every morning. The information is not for nothing. The information is a way of staying in the relationship operationally after it has ended emotionally. By week six you will know his Tuesday schedule better than you knew it while you were dating.",
        nextSceneId: "loose-end-find-my",
        isOptimal: false,
      },
    ],
  },

  // ===================================================================
  // SPOTIFY + PHOTOS (history, not reach)
  // ===================================================================
  {
    id: "spotify-and-photos",
    backgroundId: "apartment",
    mood: "cold",
    presentCharacterIds: ["inner-voice"],
    dialog: [
      {
        speakerId: null,
        text: "Spotify, the four collaborative playlists. Photos, the shared album titled with a heart and the year you met. The Notes list of restaurants. The Strava follow.",
      },
      {
        speakerId: "inner-voice",
        tone: "tactical",
        text: "This is the history column. The discipline here is different. You do not delete history. You stop publishing it.",
        emotion: "knowing",
      },
    ],
    choices: [
      {
        id: "archive-history",
        text: "Unfollow on Strava. Leave the collaborative playlists in place but unpin them. Move the shared photo album to archived. Keep the Notes list.",
        tactic: "The history move. The artefacts continue to exist, off your main surfaces, accessible only when you choose them. The playlists were your taste before they were a couple's playlist; the photos were your camera roll. You are not erasing yourself in the name of erasing him.",
        nextSceneId: "the-loose-end",
        isOptimal: true,
      },
      {
        id: "purge-everything",
        text: "Delete the playlists. Delete the shared album. Unfollow everyone he introduced you to.",
        tactic: "The purge is the loud-burn version of the audit. It feels decisive on Sunday morning. By month three you will have deleted, along with him, the eighteen months of your taste, your friends, and your camera roll. The relationship had real artefacts; revisionism that erases them erases you too.",
        nextSceneId: "the-loose-end",
        isOptimal: false,
      },
      {
        id: "keep-the-playlists-pinned",
        text: "Leave everything where it is. The playlists are good. The album is full of you, not just of him.",
        tactic: "The leave-it move is half-right. The artefacts are yours; the surfacing of them daily is the relapse. The playlists do not need to be pinned at the top of your library for the songs to remain yours. Unpinning is not deletion; it is moving the wound off the wallpaper.",
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
        text: "Almost done. The list has one row left. Email.",
      },
      {
        speakerId: "inner-voice",
        tone: "tactical",
        text: "Email is the channel everyone forgets. He has yours. Yours is on the dentist's emergency-contact form. Yours is on the joint shipping address from the desk you ordered. Yours is on the Airbnb account he booked the Lisbon trip on.",
        emotion: "knowing",
      },
      {
        speakerId: "inner-voice",
        tone: "tactical",
        text: "Every email channel is a backdoor. The hoover lands at 4:13 p.m. on a Tuesday in eight weeks through whichever email he still has. The audit closes here or it does not close.",
        emotion: "knowing",
      },
    ],
    choices: [
      {
        id: "close-the-email",
        text: 'Block his email address in your client. Update the dentist. Remove him from the Airbnb account. Change the joint shipping address.',
        tactic: "The full closure. Email is the slow channel, the one the hoover prefers because text feels too aggressive and DM feels too immediate. Closing email closes the patient channel, which is the one that wins against a calm version of you on a Tuesday afternoon.",
        nextSceneId: "ending-audit-closed",
        isOptimal: true,
        event: "optimal-with-grace",
      },
      {
        id: "leave-email-just-in-case",
        text: 'Leave it. "Just in case there is an emergency." You can change the dentist next month.',
        tactic: "The just-in-case is the leash. Real emergencies route through mutuals, through hospitals, through police. They do not route through your inbox at 4:13 p.m. on a Tuesday eight weeks from now. The just-in-case is the door you leave open to the version of him you have not yet refused.",
        nextSceneId: "ending-leashed-channel",
        isOptimal: false,
      },
    ],
  },

  // ===================================================================
  // RECOVERY: LOOSE-END BRANCHES (one tap back to the optimal path)
  // ===================================================================
  {
    id: "left-open-instagram",
    backgroundId: "apartment",
    mood: "tense",
    presentCharacterIds: ["inner-voice"],
    dialog: [
      {
        speakerId: "inner-voice",
        tone: "tactical",
        text: "The you you are leaving Instagram open for is not the you on the floor of the bedroom right now. The you who is going to look at his profile on a Friday at 1 a.m. is a different you, who needs the block more than this you needs the dignity of not blocking him.",
        emotion: "knowing",
      },
    ],
    choices: [
      {
        id: "go-back-block-instagram",
        text: "Go back. Block.",
        tactic: "Late but clean. The block at 9:31 a.m. on Sunday is the block, regardless of the eleven-minute detour.",
        nextSceneId: "whatsapp",
        isOptimal: true,
      },
    ],
  },

  {
    id: "loose-end-whatsapp",
    backgroundId: "apartment",
    mood: "tense",
    presentCharacterIds: ["inner-voice"],
    dialog: [
      {
        speakerId: "inner-voice",
        tone: "tactical",
        text: "Archived but unblocked is the gap. The hoover comes through the gap. The L5 boss of this track is specifically this gap. Closing it now costs you nothing; closing it in eight weeks will cost you a Tuesday afternoon.",
        emotion: "knowing",
      },
    ],
    choices: [
      {
        id: "go-back-block-whatsapp",
        text: "Block the number.",
        tactic: "Late recovery. The gap is closed before the hoover arrives.",
        nextSceneId: "find-my",
        isOptimal: true,
      },
    ],
  },

  {
    id: "loose-end-find-my",
    backgroundId: "apartment",
    mood: "tense",
    presentCharacterIds: ["inner-voice"],
    dialog: [
      {
        speakerId: "inner-voice",
        tone: "tactical",
        text: "Find My left on is the daily relapse, and it is the one no audit will catch later because it does not feel like an audit failure. It feels like information. Revoke it now, in the same tap, while the calmness is here.",
        emotion: "knowing",
      },
    ],
    choices: [
      {
        id: "go-back-revoke-location",
        text: "Stop sharing. Remove him from your circle. Close the app.",
        tactic: "Late recovery on the line you almost left open. The blue circle disappears.",
        nextSceneId: "spotify-and-photos",
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
      "The Sunday-morning calmness is the resource the audit runs on. Wednesday evening is a different version of you, who will not pick up the list at all. The audit will not happen unless you do it now. The scenario does not punish you for postponing; it notes the cost. The cost is whatever the channels do, on their own, in the eleven days until you next try. The track will hold. The next time the Sunday-morning calmness arrives, the list is still here.",
    dialog: [
      {
        speakerId: "inner-voice",
        text: "Laptop closed. Phone face-down on the duvet. The list will be here. The Wednesday version of you will not be.",
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
      "Every channel through which he can reach you is closed. Every channel through which you can reach him is closed. The artefacts you wanted to keep are kept, off the main surfaces, accessible when you choose them, invisible when you do not. The just-in-case email did not survive the audit, because the just-in-case email is the channel the hoover books in advance. What you are calling silence is not absence of action. It is the action. The first 72 hours close here. Level 2 is The Funeral, the schedule of grief, the apartment audited object by object. The runway you just built is what every other tactic in the track runs on.",
    dialog: [
      {
        speakerId: "inner-voice",
        text: "Document closed. Coffee cold again, third cup. The list is done. The silence has surface area now.",
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
    id: "ending-leashed-channel",
    backgroundId: "apartment",
    mood: "cold",
    isEnding: true,
    outcomeType: "neutral",
    endingTitle: "The Just-In-Case Channel",
    failureBlogSlug: "narcissistic-hoovering-explained",
    failureBlogTitle: "Narcissistic Hoovering: When Your Ex Tries to Suck You Back In",
    endingLearnPrompt:
      "Five of six channels are closed cleanly. One is left open under the rationale of just in case. The L5 boss of this track lands through this exact channel, at 4:13 p.m. on a Tuesday in eight weeks, in a three-line message with a lowercase kiss. The scenario records the choice without punishing it; the track does. The runway is built with one observable hole. The hole is the one you will be glad you can close in eight weeks, if you remember why you left it open today.",
    dialog: [
      {
        speakerId: "inner-voice",
        text: "Document closed. One row in the list is greyed out instead of struck through. You know which one it is. He does not, yet.",
        emotion: "serious",
      },
    ],
    choices: [],
  },
];

export const afterHim12: Scenario = {
  id: "after-him-1-2",
  title: "The Audit",
  tagline:
    "Sunday morning. Every channel he can reach you through. Every channel you can reach him through. The asymmetry between them is the move.",
  description:
    "After-Him L1-2. Three days after the breakup, on the Sunday-morning calmness that is the resource the audit runs on. The scenario teaches the two-column structure: block on reach (DMs, calls, location), archive on history (photos, playlists), revoke nothing that belongs to you alone. The trap is the channel left open just in case. That channel is the one the L5 hoover lands through.",
  tier: "premium",
  track: "after-him",
  level: 1,
  order: 2,
  estimatedMinutes: 11,
  difficulty: "intermediate",
  category: "self-regulation",
  xpReward: 380,
  startSceneId: "the-sunday-morning",
  prerequisites: ["after-him-1-1"],
  tacticsLearned: [
    "Block on reach, archive on history. The asymmetry is the discipline.",
    "Revoke Find My in the same tap that closes WhatsApp. Surveillance is two-way.",
    "Do not delete your own data. The playlists were your taste first.",
    "The just-in-case email is the channel the hoover books in advance.",
    "Real emergencies route through mutuals, hospitals, police, not your inbox.",
  ],
  redFlagsTaught: [
    "The muted-but-not-blocked Instagram as the hoover's preferred channel",
    "The unblocked WhatsApp number left 'in case he writes'",
    "The Find My circle left on as the daily three-tap relapse",
    "The deletion-as-purge that erases your taste alongside the relationship",
    "The just-in-case email as the patient backdoor",
  ],
  characters: [INNER_VOICE],
  scenes,
  isNew: true,
};

export default afterHim12;
