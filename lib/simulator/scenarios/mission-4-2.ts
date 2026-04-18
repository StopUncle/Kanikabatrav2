/**
 * Mission 4-2 — "DARVO"
 *
 * Level 4, order 2. Teaches recognition and exit from the
 * Deny-Attack-Reverse-Victim-Offender sequence. Public setting,
 * live audience, real stakes.
 */

import type { Scenario, Scene } from "../types";
import { AVERY, PRIYA, INNER_VOICE } from "../characters";

const scenes: Scene[] = [
  {
    id: "the-confrontation",
    backgroundId: "common-room",
    mood: "danger",
    presentCharacterIds: ["avery", "priya"],
    dialog: [
      {
        speakerId: null,
        text: "Crowded event. Thirty people within earshot. Avery walks up with purpose.",
      },
      {
        speakerId: "avery",
        text: "\"Can we talk? Actually — no. I need to say this out loud so people know.\"",
        emotion: "angry",
      },
      {
        speakerId: "inner-voice",
        text: "Staged confrontation. Her audience is the rest of the room, not you.",
        emotion: "concerned",
      },
    ],
    nextSceneId: "avery-accuses",
  },

  {
    id: "avery-accuses",
    backgroundId: "common-room",
    mood: "danger",
    immersionTrigger: "red-flag-revealed",
    shakeOnEntry: "threat",
    presentCharacterIds: ["avery", "priya"],
    dialog: [
      {
        speakerId: "avery",
        text: "\"You've been spreading lies about me. Telling people I lied about the collab. Do you know how damaging that's been for me?\"",
        emotion: "angry",
      },
      {
        speakerId: "avery",
        text: "\"I'm the victim here and I'm done staying quiet.\"",
        emotion: "sad",
      },
      {
        speakerId: "inner-voice",
        text: "Full DARVO: Deny (she was never lying), Attack (you're spreading things), Reverse Victim/Offender (she's the victim, you're the aggressor). Classic sequence.",
        emotion: "knowing",
      },
    ],
    choices: [
      {
        id: "defend-immediately",
        text: "\"That's not true, I haven't said anything about you!\"",
        tactic: "Defending against the reversal IS the reversal. You lose the frame.",
        nextSceneId: "avery-escalates-publicly",
        isOptimal: false,
      },
      {
        id: "match-volume",
        text: "\"YOU started this with a lie about ME.\"",
        tactic: "Matching volume makes it look like a dispute, not a smear.",
        nextSceneId: "ending-spectacle",
        isOptimal: false,
      },
      {
        id: "quiet-refuse",
        text: "\"I'm not doing this here.\"",
        tactic: "Refuse the stage. Six words.",
        nextSceneId: "avery-tries-drag",
        isOptimal: true,
      },
      {
        id: "call-audience",
        text: "\"Everyone hearing this — she chose this room on purpose. Ask yourselves why.\"",
        tactic: "Name the tactic to the audience. Risky but decisive.",
        nextSceneId: "audience-pivots",
        isOptimal: true,
      },
    ],
  },

  {
    id: "avery-escalates-publicly",
    backgroundId: "common-room",
    mood: "danger",
    presentCharacterIds: ["avery", "priya"],
    dialog: [
      {
        speakerId: "avery",
        text: "\"THAT'S exactly what you always do. Deny, deny, deny. Classic.\"",
        emotion: "angry",
      },
      {
        speakerId: null,
        text: "Heads are turning. Phones are half-up.",
      },
      {
        speakerId: "inner-voice",
        text: "She's using your denial as evidence against you. Every word now digs deeper.",
        emotion: "concerned",
      },
    ],
    choices: [
      {
        id: "explain-facts",
        text: "Launch into a point-by-point rebuttal.",
        tactic: "You're now giving a speech about how innocent you are. Worst optics.",
        nextSceneId: "ending-lost-the-room",
        isOptimal: false,
      },
      {
        id: "exit",
        text: "\"I'm leaving. This isn't a conversation.\"",
        tactic: "Late exit, but better than staying.",
        nextSceneId: "ending-dignified-exit",
      },
      {
        id: "one-sentence",
        text: "\"The timeline is public if anyone wants to look.\" Then walk away.",
        tactic: "One factual line; no engagement. Lets people check for themselves.",
        nextSceneId: "ending-cold-exit",
        isOptimal: true,
      },
    ],
  },

  {
    id: "avery-tries-drag",
    backgroundId: "common-room",
    mood: "danger",
    presentCharacterIds: ["avery", "priya"],
    dialog: [
      {
        speakerId: "avery",
        text: "\"Oh, so you don't want to face me publicly. Interesting.\"",
        emotion: "smirking",
      },
      {
        speakerId: "priya",
        text: "\"Avery. Not here.\"",
        emotion: "serious",
      },
      {
        speakerId: "inner-voice",
        text: "Priya stepped in. Use the window. Don't make it worse.",
        emotion: "knowing",
      },
    ],
    choices: [
      {
        id: "walk-with-priya",
        text: "Turn to Priya. \"Let's go.\" Walk out together.",
        tactic: "Ally-assisted exit. Audience reads it as composure.",
        nextSceneId: "ending-ally-exit",
        isOptimal: true,
      },
      {
        id: "take-bait",
        text: "\"I'm happy to face you, just not in your staged ambush.\"",
        tactic: "You'd rather be clever than exit. The audience didn't need the clever.",
        nextSceneId: "ending-spectacle",
      },
      {
        id: "single-landmine",
        text: "\"Avery — the email thread exists. Walk carefully.\" Exit.",
        tactic: "Implied receipt + exit. She knows you have documentation. Audience notices.",
        nextSceneId: "ending-landmine-planted",
        isOptimal: true,
      },
    ],
  },

  {
    id: "audience-pivots",
    backgroundId: "common-room",
    mood: "tense",
    presentCharacterIds: ["avery", "priya"],
    dialog: [
      {
        speakerId: null,
        text: "A beat. Then a couple near you exchange looks. Someone mutters 'okay, fair.' The performance is losing its audience.",
      },
      {
        speakerId: "avery",
        text: "\"Oh I chose this room? You're gaslighting ME now?\"",
        emotion: "angry",
      },
      {
        speakerId: "inner-voice",
        text: "She's losing the room, so she's reaching for escalation words. Exit before she recovers.",
        emotion: "knowing",
      },
    ],
    choices: [
      {
        id: "exit-on-high",
        text: "Nod. Turn. Leave without another word.",
        tactic: "Peak exit. Let the audience's shift be the last thing said.",
        nextSceneId: "ending-audience-pivoted",
        isOptimal: true,
      },
      {
        id: "one-more",
        text: "\"Gaslighting is a real word. I'd Google it.\"",
        tactic: "Clever but now you look combative. Don't keep swinging after the bell.",
        nextSceneId: "ending-overstep",
      },
    ],
  },

  // ---------------------------------------------------------------------
  // ENDINGS
  // ---------------------------------------------------------------------

  {
    id: "ending-cold-exit",
    backgroundId: "common-room",
    mood: "peaceful",
    isEnding: true,
    outcomeType: "good",
    endingTitle: "Cold Exit",
    endingSummary:
      "One sentence, zero engagement, clean walk. The audience who was there now has one clear datapoint: 'there's a timeline they can look up.' That's a much scarier thing for Avery than any argument would have been.",
    dialog: [
      {
        speakerId: "inner-voice",
        text: "One verifiable fact, delivered calmly, ends the conversation you refused to have.",
        emotion: "knowing",
      },
    ],
  },

  {
    id: "ending-ally-exit",
    backgroundId: "common-room",
    mood: "peaceful",
    isEnding: true,
    outcomeType: "good",
    endingTitle: "Exit With Your Ally",
    endingSummary:
      "Priya created the gap; you used it. Leaving together signals composure, not flight. Avery finishes the speech to a room of people already forming a different opinion than the one she was aiming for.",
    dialog: [
      {
        speakerId: "inner-voice",
        text: "Allies create windows. Good players walk through them.",
        emotion: "knowing",
      },
    ],
  },

  {
    id: "ending-landmine-planted",
    backgroundId: "common-room",
    mood: "peaceful",
    isEnding: true,
    outcomeType: "good",
    endingTitle: "The Landmine",
    endingSummary:
      "'The email thread exists. Walk carefully.' Six words, said calmly, in public. Avery now has to decide whether to keep going against someone with documented receipts. The smart ones de-escalate immediately. The dumb ones push, and find the landmine. Either way, you've stopped volunteering the detonator.",
    dialog: [
      {
        speakerId: "inner-voice",
        text: "Implied documentation is stronger than shown documentation. Mystery is leverage.",
        emotion: "knowing",
      },
    ],
  },

  {
    id: "ending-audience-pivoted",
    backgroundId: "common-room",
    mood: "peaceful",
    isEnding: true,
    outcomeType: "good",
    endingTitle: "The Room Turned",
    endingSummary:
      "You named the staging, got out during the pivot, said nothing more. The audience leaves talking about the staging, not the content. Avery's script is now the thing people remember — not the accusation.",
    dialog: [
      {
        speakerId: "inner-voice",
        text: "Once you name the tactic, the tactic becomes the story.",
        emotion: "knowing",
      },
    ],
  },

  {
    id: "ending-dignified-exit",
    backgroundId: "common-room",
    mood: "tense",
    isEnding: true,
    outcomeType: "neutral",
    endingTitle: "Dignified But Late",
    endingSummary:
      "You left. Good. But you defended first, which now lives as the opening line of the story. Most people will remember composure. Some will remember the defense as proof of guilt. Mixed bag.",
    dialog: [
      {
        speakerId: "inner-voice",
        text: "A late exit is still an exit. Next time, earlier.",
        emotion: "neutral",
      },
    ],
  },

  {
    id: "ending-spectacle",
    backgroundId: "common-room",
    mood: "danger",
    isEnding: true,
    outcomeType: "bad",
    failureBlogSlug: "ghostlighting-when-they-ghost-then-gaslight",
    failureBlogTitle: "Ghostlighting: When They Ghost Then Gaslight",
    endingTitle: "Two Loud People",
    endingSummary:
      "You matched volume and engaged the trap. Observers now have a story: 'those two were yelling at each other.' Your credibility is averaged with hers. You gave her the equivalence she needed.",
    dialog: [
      {
        speakerId: "inner-voice",
        text: "Matching volume is matching level. Stay higher.",
        emotion: "sad",
      },
    ],
  },

  {
    id: "ending-lost-the-room",
    backgroundId: "common-room",
    mood: "danger",
    isEnding: true,
    outcomeType: "bad",
    failureBlogSlug: "architecture-of-control-how-emotional-dependency-is-built",
    failureBlogTitle: "Architecture of Control: How Emotional Dependency Is Built",
    endingTitle: "The Speech Killed You",
    endingSummary:
      "Point-by-point rebuttal to a staged accusation IS the loss. People remember the long explanation, not the facts in it. By the end, half the audience thinks 'why are they trying so hard.'",
    dialog: [
      {
        speakerId: "inner-voice",
        text: "Long explanations are confessions of insecurity. Short facts aren't.",
        emotion: "sad",
      },
    ],
  },

  {
    id: "ending-overstep",
    backgroundId: "common-room",
    mood: "tense",
    isEnding: true,
    outcomeType: "neutral",
    endingTitle: "Won the Room, Lost the Ending",
    endingSummary:
      "You had the audience. Then you took one more shot and muddied the impression. People remember the last line. Not the turn.",
    dialog: [
      {
        speakerId: "inner-voice",
        text: "When the room tips your way, stop talking.",
        emotion: "neutral",
      },
    ],
  },
];

export const mission42: Scenario = {
  id: "mission-4-2",
  title: "DARVO",
  tagline: "Deny, Attack, Reverse Victim and Offender — live audience.",
  description:
    "Avery confronts you in a crowded room, on her chosen ground. She's running the sequence on purpose. The audience is her weapon; your instinct to defend is her goal. The only win is to refuse the stage she built.",
  tier: "premium",
  level: 4,
  order: 2,
  estimatedMinutes: 8,
  difficulty: "advanced",
  category: "gaslighter",
  xpReward: 200,
  badgeId: "darvo-recognized",
  startSceneId: "the-confrontation",
  tacticsLearned: [
    "Refusing a staged confrontation",
    "Naming the tactic to the audience",
    "Implied receipts without displaying them",
    "Exiting at the peak, not after the peak",
  ],
  redFlagsTaught: [
    "Public ambushes on chosen ground",
    "'I'm the victim' framing of the aggressor",
    "Escalation words (gaslighting, aggressive) deployed rhetorically",
    "Your denial being used as 'evidence'",
  ],
  reward: {
    id: "darvo-recognized",
    name: "DARVO Recognized",
    description: "You saw the script, refused the stage, and left the room.",
    unlocksScenarioId: "mission-5-1",
  },
  prerequisites: ["mission-4-1"],
  characters: [AVERY, PRIYA, INNER_VOICE],
  scenes,
};

export default mission42;
